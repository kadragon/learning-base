#!/usr/bin/env python3
"""Check that every slide code block declares where it came from, and that the
file-backed ones still match the file.

Five review rounds on the vue-basics deck each caught a code block that had
drifted from the source it claimed to quote — a stripped attribute, a narrowed
import, a renamed callback parameter, an invented `app.use(pinia)`, an added
trailing comma. Every one reached a reviewer; none was caught by reading. This
turns "the slide quotes the file" from a convention into an assertion.

Contract
--------
Every `<pre><code>` in a deck's index.html carries `data-source`, one of:

    fixture:<path>   text must be in presentations/<slug>/fixtures/<path>
    capture:<name>   recorded command output; the name must appear in sources.md
    uniweb:<path>    excerpt of the read-only uniweb checkout, named in sources.md
    illustration     invented for teaching; nothing to match

For `fixture:` blocks the comparison ignores whitespace entirely, so folding a
long line for projector width passes, while removing, renaming, or adding a
token fails. A block may elide with `...`, `…`, or a comment containing 생략 /
발췌; each remaining segment must then appear contiguously in the fixture.

Slides must also carry a unique `id`, and every `#id` cited in sources.md must
exist — ordinals silently rot when a slide is inserted, which has happened.

Usage: python3 tools/validate-slide-evidence.py [deck-slug ...]
Exits 0 when clean, 1 with one line per problem otherwise.
"""

from __future__ import annotations

import html
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
DECKS = REPO / "presentations"

VALID_KINDS = ("fixture", "capture", "uniweb")
ELISION = re.compile(r"\.\.\.|…|생략|발췌")
# A line that is nothing but a comment is commentary, not code. Slides use such
# lines to splice a template fragment under a script one, or to point at another
# slide. Treat them as segment boundaries so the checker compares code to code.
COMMENT_ONLY = re.compile(r"^\s*(//|/\*|\*|#|<!--)")


def strip_markup(fragment: str) -> str:
    """Highlight spans out, entities decoded — the text a reader actually sees."""
    return html.unescape(re.sub(r"<[^>]+>", "", fragment))


INLINE_COMMENT = re.compile(r"\s*(//|<!--).*$")


def squeeze(text: str) -> str:
    """Drop whitespace and trailing commentary.

    A fold cannot change the result, and neither can a comment a slide appends
    to a real line to point at something. Code is what is being compared.
    """
    stripped = "\n".join(INLINE_COMMENT.sub("", line) for line in text.splitlines())
    return re.sub(r"\s+", "", stripped)


def segments(block: str) -> list[str]:
    """Split a block at its elision markers; each piece must match contiguously."""
    pieces = [
        line for line in block.splitlines() if line.strip()
    ]
    out: list[list[str]] = [[]]
    for line in pieces:
        if ELISION.search(line) or COMMENT_ONLY.match(line):
            out.append([])
        else:
            out[-1].append(line)
    return [squeeze("\n".join(seg)) for seg in out if squeeze("\n".join(seg))]


def chunks(block: str) -> list[tuple[str, str]]:
    """Split an excerpt into the contiguous runs it actually shows.

    Blank lines, comment-only lines, elision markers, and inline block comments
    all end a run — those are exactly where a slide skips or annotates.
    Returns (squeezed text, first source line) so a failure can be reported
    against something a reader can find.
    """
    runs: list[list[str]] = [[]]
    for line in block.splitlines():
        boundary = (
            not line.strip()
            or ELISION.search(line)
            or COMMENT_ONLY.match(line)
            or "/*" in line
        )
        if boundary:
            runs.append([])
        else:
            runs[-1].append(line)
    out = []
    for run in runs:
        if not run:
            continue
        squeezed = squeeze("\n".join(run))
        if squeezed:
            out.append((squeezed, run[0].strip()))
    return out


def check_deck(slug: str) -> list[str]:
    deck = DECKS / slug
    index = deck / "index.html"
    if not index.is_file():
        return [f"{slug}: no index.html"]

    problems: list[str] = []
    markup = index.read_text(encoding="utf-8")

    # --- slide ids -------------------------------------------------------
    sections = re.findall(r"<section\b[^>]*\bdata-slide\b[^>]*>", markup)
    ids: list[str] = []
    for i, tag in enumerate(sections, 1):
        found = re.search(r'\bid="([^"]+)"', tag)
        if not found:
            problems.append(f"{slug}: slide {i} has no id")
        else:
            ids.append(found.group(1))
    duplicates = {i for i in ids if ids.count(i) > 1}
    for dup in sorted(duplicates):
        problems.append(f"{slug}: duplicate slide id '{dup}'")

    sources_path = deck / "sources.md"
    sources = sources_path.read_text(encoding="utf-8") if sources_path.is_file() else ""
    # Only `(#slide-id)` written as a link-style anchor counts as a citation; a
    # bare `(#id)` in prose about the convention itself does not.
    for cited in sorted(set(re.findall(r"\(#([a-z0-9][a-z0-9-]{2,})\)", sources))):
        if cited not in ids:
            problems.append(f"{slug}: sources.md cites #{cited}, which is not a slide id")

    # --- code blocks -----------------------------------------------------
    blocks = re.findall(r"<pre>\s*<code([^>]*)>(.*?)</code>\s*</pre>", markup, re.S)
    for n, (attrs, body) in enumerate(blocks, 1):
        declared = re.search(r'data-source="([^"]+)"', attrs)
        if not declared:
            problems.append(f"{slug}: code block {n} has no data-source")
            continue

        value = declared.group(1)
        if value == "illustration":
            continue

        kind, _, target = value.partition(":")
        if kind not in VALID_KINDS:
            problems.append(f"{slug}: code block {n} has unknown data-source '{value}'")
            continue
        if not target:
            problems.append(f"{slug}: code block {n} data-source '{value}' names nothing")
            continue

        if kind in ("capture", "uniweb"):
            # Not machine-checkable here; require it to be accounted for in sources.md.
            if target not in sources:
                problems.append(
                    f"{slug}: code block {n} claims {kind} '{target}', "
                    "which sources.md never mentions"
                )
            continue

        fixture = deck / "fixtures" / target
        if not fixture.is_file():
            problems.append(f"{slug}: code block {n} names missing fixture '{target}'")
            continue

        raw = fixture.read_text(encoding="utf-8")
        haystack = squeeze(raw)
        text = strip_markup(body)

        if "data-excerpt" in attrs:
            # The block deliberately skips parts of the file. Each contiguous
            # chunk it does show must still appear in the file, in order — that
            # catches a stripped attribute, a renamed identifier, or an added
            # token inside a chunk, while allowing the gaps an excerpt exists
            # for. Blocks opt in, so the strict whole-block check stays the
            # default for anything written later.
            cursor = 0
            failed = None
            for chunk, first_line in chunks(text):
                at = haystack.find(chunk, cursor)
                if at < 0:
                    failed = first_line
                    break
                cursor = at + len(chunk)
            if failed is not None:
                problems.append(
                    f"{slug}: code block {n} is an excerpt of '{target}' but the chunk "
                    f"starting '{failed[:60]}' is not in the file (or is out of order)"
                )
            continue

        for seg in segments(text):
            if seg not in haystack:
                excerpt = seg[:60]
                problems.append(
                    f"{slug}: code block {n} does not match fixture '{target}' — "
                    f"segment starting '{excerpt}' is not in the file"
                )
                break

    return problems


def main(argv: list[str]) -> int:
    requested = argv[1:]
    all_decks = sorted(p.name for p in DECKS.iterdir() if (p / "index.html").is_file())
    slugs = requested or all_decks

    # A deck opts in by having a fixtures/ directory. Naming one explicitly on the
    # command line checks it regardless, so adoption can be driven from a failing run.
    covered = [s for s in slugs if requested or (DECKS / s / "fixtures").is_dir()]
    skipped = [s for s in slugs if s not in covered]

    problems: list[str] = []
    for slug in covered:
        problems.extend(check_deck(slug))

    for slug in skipped:
        print(f"Slide evidence: {slug} has no fixtures/ — not covered yet")

    if problems:
        for line in problems:
            print(line, file=sys.stderr)
        print(f"\nSlide evidence check failed: {len(problems)} problem(s)", file=sys.stderr)
        return 1

    print(f"Slide evidence check passed: {len(covered)} deck(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
