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
Every `<pre><code>` in an adopted deck's index.html carries `data-source`:

    fixture:<path>   text must be in presentations/<slug>/fixtures/<path>
    capture:<name>   recorded command output, listed under `### Recorded captures`
    uniweb:<path>    excerpt of the read-only uniweb checkout, listed under
                     `### Quoted uniweb paths`
    illustration     invented for teaching; nothing to match

For `fixture:` blocks the comparison ignores whitespace, so folding a long line
for projector width passes while removing, renaming, or adding a token fails.

A block that skips part of its file must say so with `data-excerpt`; each
contiguous run it then shows is checked in order. Without the marker a block must
match as one unbroken run, so a comment line does not buy a free gap — and the
marker must be *necessary*, so it cannot be used to opt out of the strict check.

Slides carry a unique `id`. Every `(#id)` cited in sources.md must exist, no
section may name a slide by number without an anchor, and where a heading gives
both, the number must agree with that slide's own index.

Known limits, so a green run is not read as more than it is:
  * Deleting a line that sits beside an elision marker passes — the marker
    already declares an omission there, and the two are indistinguishable.
  * `capture:` and `uniweb:` text is not compared to anything; neither source is
    committed. Only the declaration is checked.
  * Naming the wrong chapter's fixture passes when the quoted lines exist in
    both. Where that is possible the run prints a note.

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

# Decks that have adopted the contract. A deck is added here when it adopts and
# is never dropped by deleting a directory, which would turn the guard off
# silently. A new deck that grows a fixtures/ directory is picked up too.
ADOPTED = {"vue-basics"}

VALID_KINDS = ("fixture", "capture", "uniweb")

# A boundary is a line the slide added to say "something is skipped here". The
# deck marks its own annotations with `<span class="c">`; take that at face value
# rather than guessing from text, because a line like
# `<p v-if="isLoading">불러오는 중…</p>` contains an ellipsis but is content, and
# `[...ids.value, id]` contains `...` but is spread syntax.
COMMENT_SPAN = re.compile(r'<span class="c">.*?</span>', re.S)
ELISION_ONLY = re.compile(r"^[\s.…]*(\.\.\.|…)[\s.…]*$")
COMMENT_ONLY = re.compile(r"^\s*(//|/\*|\*|#|<!--)")
# A run this short matches almost anywhere, so it is evidence of nothing.
MIN_CHUNK = 8


def strip_markup(fragment: str) -> str:
    """Highlight spans out, entities decoded — the text a reader actually sees."""
    return html.unescape(re.sub(r"<[^>]+>", "", fragment))


def drop_trailing_comment(line: str) -> str:
    """Cut a trailing `//` or `<!--` comment, but only outside a string.

    `baseURL: 'https://api.example/v1'` must keep its URL — stripping from the
    first `//` would make every URL in a fixture interchangeable.
    """
    quote = None
    i = 0
    while i < len(line):
        ch = line[i]
        if quote:
            if ch == "\\":
                i += 2
                continue
            if ch == quote:
                quote = None
        elif ch in "'\"`":
            quote = ch
        elif line.startswith("//", i) or line.startswith("<!--", i):
            return line[:i]
        i += 1
    return line


def squeeze(text: str) -> str:
    """Drop whitespace and trailing commentary, so a fold cannot change the result."""
    stripped = "\n".join(drop_trailing_comment(line) for line in text.splitlines())
    return re.sub(r"\s+", "", stripped)


def is_boundary(line: str) -> bool:
    """True when the slide put this line there to mark an omission."""
    if not strip_markup(COMMENT_SPAN.sub("", line)).strip():
        return True
    plain = strip_markup(line)
    return bool(ELISION_ONLY.match(plain) or COMMENT_ONLY.match(plain))


def runs(block: str, split_blank: bool) -> list[tuple[str, str]]:
    """Split raw block markup into the contiguous pieces it shows.

    Boundary detection reads the deck's annotation spans, so it runs before the
    markup is stripped. Returns (squeezed text, first source line) so a failure
    can name something a reader can find.
    """
    groups: list[list[str]] = [[]]
    for line in block.splitlines():
        blank = not line.strip()
        if blank and not split_blank:
            continue
        if blank or is_boundary(line) or "/*" in line:
            groups.append([])
        else:
            groups[-1].append(strip_markup(line))
    out = []
    for group in groups:
        if not group:
            continue
        squeezed = squeeze("\n".join(group))
        if squeezed:
            out.append((squeezed, group[0].strip()))
    return out


def declared_names(sources: str, heading: str) -> set[str]:
    """Names listed as backticked bullets under a `### <heading>` in sources.md."""
    match = re.search(
        rf"^### {re.escape(heading)}\s*$(.*?)(?=^#{{2,3}} |\Z)", sources, re.M | re.S
    )
    if not match:
        return set()
    return set(re.findall(r"^\s*-\s+`([^`]+)`", match.group(1), re.M))


def check_ids(slug: str, markup: str, sources: str) -> tuple[list[str], list[str]]:
    problems: list[str] = []
    tags = re.findall(r"<section\b[^>]*\bdata-slide\b[^>]*>", markup)
    ids: list[str] = []
    for i, tag in enumerate(tags, 1):
        found = re.search(r'\bid="([^"]+)"', tag)
        if not found:
            problems.append(f"{slug}: slide {i} has no id")
        else:
            ids.append(found.group(1))
    for dup in sorted({i for i in ids if ids.count(i) > 1}):
        problems.append(f"{slug}: duplicate slide id '{dup}'")

    index_of = {
        m.group(1): m.group(2)
        for m in re.finditer(
            r'<section\b[^>]*\bid="([^"]+)"[^>]*>\s*<div class="slide-index">(\d+)<',
            markup,
        )
    }

    for cited in sorted(set(re.findall(r"\(#([A-Za-z0-9][\w-]{2,})\)", sources))):
        if cited not in ids:
            problems.append(f"{slug}: sources.md cites #{cited}, which is not a slide id")

    for section in re.split(r"^(?=#{2,3} )", sources, flags=re.M):
        if not section.strip():
            continue
        heading = section.splitlines()[0].strip()
        if re.search(r"슬라이드\s*\d|slides?\s+\d", section) and "(#" not in section:
            problems.append(
                f"{slug}: sources.md section '{heading[:60]}' names a slide by number "
                "with no (#slide-id) anchor"
            )
            continue
        # A verified id must not lend credit to a rotted ordinal beside it.
        for num, anchor in re.findall(r"slides?\s+(\d{1,2})[^\n(]*\(#([\w-]+)\)", heading):
            actual = index_of.get(anchor)
            if actual and actual.lstrip("0") != num.lstrip("0"):
                problems.append(
                    f"{slug}: sources.md section '{heading[:50]}' says slide {num} "
                    f"but #{anchor} is slide {actual}"
                )
    return problems, ids


def check_deck(slug: str) -> list[str]:
    deck = DECKS / slug
    index = deck / "index.html"
    if not index.is_file():
        return [f"{slug}: no index.html"]
    if slug in ADOPTED and not (deck / "fixtures").is_dir():
        return [
            f"{slug}: adopted the evidence contract but has no fixtures/ directory — "
            "restore it rather than dropping the check"
        ]

    markup = index.read_text(encoding="utf-8")
    sources_path = deck / "sources.md"
    sources = sources_path.read_text(encoding="utf-8") if sources_path.is_file() else ""

    problems, _ = check_ids(slug, markup, sources)

    blocks = re.findall(
        r"<pre\b[^>]*>\s*<code\b([^>]*)>(.*?)</code>\s*</pre>", markup, re.S
    )
    written = markup.count("<pre")
    if len(blocks) != written:
        problems.append(
            f"{slug}: matched {len(blocks)} code blocks but the file has {written} "
            "<pre> elements — an unmatched block would be skipped silently"
        )

    capture_names = declared_names(sources, "Recorded captures")
    uniweb_paths = declared_names(sources, "Quoted uniweb paths")
    fixtures_dir = deck / "fixtures"

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

        if kind == "capture":
            if target not in capture_names:
                problems.append(
                    f"{slug}: code block {n} claims capture '{target}', which is not "
                    "listed under '### Recorded captures' in sources.md"
                )
            continue

        if kind == "uniweb":
            if target not in uniweb_paths:
                problems.append(
                    f"{slug}: code block {n} claims uniweb path '{target}', which is not "
                    "listed under '### Quoted uniweb paths' in sources.md"
                )
            continue

        if target.startswith("/") or ".." in pathlib.PurePosixPath(target).parts:
            problems.append(
                f"{slug}: code block {n} names a fixture outside the deck: '{target}'"
            )
            continue

        fixture = fixtures_dir / target
        if not fixture.is_file():
            problems.append(f"{slug}: code block {n} names missing fixture '{target}'")
            continue

        haystack = squeeze(fixture.read_text(encoding="utf-8"))
        is_excerpt = "data-excerpt" in attrs
        pieces = runs(body, split_blank=is_excerpt)

        if not is_excerpt and len(pieces) > 1:
            problems.append(
                f"{slug}: code block {n} skips part of '{target}' but is not marked "
                "data-excerpt — add it, or show the block unbroken"
            )
            continue

        if is_excerpt and len(runs(body, split_blank=False)) == 1:
            # The relaxation must be necessary, or it is just a way to opt out of
            # the strict check. If the block matches unbroken, drop the marker.
            whole = runs(body, split_blank=False)[0][0]
            if whole in haystack:
                problems.append(
                    f"{slug}: code block {n} is marked data-excerpt but matches "
                    f"'{target}' unbroken — remove data-excerpt"
                )

        cursor = 0
        matched = True
        for chunk, first_line in pieces:
            if len(chunk) < MIN_CHUNK:
                continue  # too short to be evidence of anything
            at = haystack.find(chunk, cursor)
            if at < 0:
                problems.append(
                    f"{slug}: code block {n} does not match '{target}' — the run "
                    f"starting '{first_line[:60]}' is not in the file (or is out of order)"
                )
                matched = False
                break
            cursor = at + len(chunk)

        if matched:
            # Naming the wrong chapter state passes when the lines are shared.
            # Say so rather than implying the path itself was verified.
            substantial = [c for c, _ in pieces if len(c) >= MIN_CHUNK]
            if substantial:
                others = []
                for other in sorted(fixtures_dir.rglob("*")):
                    if not other.is_file() or other == fixture:
                        continue
                    text = squeeze(other.read_text(encoding="utf-8"))
                    if all(c in text for c in substantial):
                        others.append(other.relative_to(fixtures_dir).as_posix())
                if others:
                    print(
                        f"note: {slug} code block {n} also matches "
                        f"{', '.join(others)} — '{target}' is not the only fixture "
                        "it could name"
                    )

    return problems


def main(argv: list[str]) -> int:
    requested = argv[1:]
    all_decks = sorted(p.name for p in DECKS.iterdir() if (p / "index.html").is_file())
    slugs = requested or all_decks

    covered = [
        s for s in slugs
        if requested or s in ADOPTED or (DECKS / s / "fixtures").is_dir()
    ]
    skipped = [s for s in slugs if s not in covered]

    problems: list[str] = []
    for slug in covered:
        problems.extend(check_deck(slug))

    for slug in skipped:
        print(f"Slide evidence: {slug} has not adopted the contract — not covered yet")

    if problems:
        for line in problems:
            print(line, file=sys.stderr)
        print(f"\nSlide evidence check failed: {len(problems)} problem(s)", file=sys.stderr)
        return 1

    print(f"Slide evidence check passed: {len(covered)} deck(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
