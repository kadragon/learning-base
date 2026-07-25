#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "$0")/.." && pwd)"
presentations_dir="$project_dir/presentations"
shared_fonts_dir="$project_dir/assets/fonts"
shared_fonts_css="$shared_fonts_dir/fonts.css"
failures=0
deck_count=0

report_failure() {
  printf 'ERROR: %s\n  FIX: %s\n  REF: %s\n' "$1" "$2" "$3" >&2
  failures=$((failures + 1))
}

[[ -f "$shared_fonts_css" ]] ||
  report_failure "$shared_fonts_css is missing" \
    "Add the shared @font-face registry." \
    "docs/architecture.md"

if [[ -f "$shared_fonts_css" ]]; then
  while IFS= read -r font_asset; do
    [[ -f "$shared_fonts_dir/$font_asset" ]] ||
      report_failure "$shared_fonts_css references missing $font_asset" \
        "Add the versioned font asset or correct its relative URL." \
        "docs/architecture.md"
  done < <(
    rg -o '\./[^"]+\.woff2' "$shared_fonts_css" |
      sed 's#^\./##'
  )
fi

while IFS= read -r duplicated_font; do
  report_failure "$duplicated_font duplicates a shared font inside a deck" \
    "Move reusable font binaries below assets/fonts/<family>/<version>/." \
    "docs/architecture.md"
done < <(find "$presentations_dir" -type f -name '*.woff2' -print)

while IFS= read -r -d '' deck; do
  deck_count=$((deck_count + 1))
  deck_dir="$(dirname "$deck")"

  [[ -f "$deck_dir/sources.md" ]] ||
    report_failure "$deck_dir/sources.md is missing" \
      "Add sources and verification notes for material claims." \
      "docs/conventions.md"

  rg -q '<html[^>]+lang=' "$deck" ||
    report_failure "$deck lacks an html lang attribute" \
      "Add a valid lang attribute to the html element." \
      "docs/conventions.md"

  rg -q '<main([[:space:]>])' "$deck" ||
    report_failure "$deck lacks a main element" \
      "Wrap slide content in one main element." \
      "docs/conventions.md"

  rg -q 'data-slide' "$deck" ||
    report_failure "$deck has no data-slide marker" \
      "Mark each slide section with data-slide." \
      "docs/conventions.md"

  rg -q '(keydown|keyup)' "$deck" ||
    report_failure "$deck has no keyboard navigation handler" \
      "Handle keyboard navigation for forward and backward movement." \
      "docs/conventions.md"

  if rg -n -i '<script[^>]+src=["'\'']https?://|<link[^>]+href=["'\'']https?://|<(img|video|audio|source)[^>]+src=["'\'']https?://' "$deck"; then
    report_failure "$deck loads a remote runtime asset" \
      "Store the asset in the repository and use a relative path." \
      "docs/architecture.md"
  fi
done < <(find "$presentations_dir" -mindepth 2 -maxdepth 2 -name index.html -print0)

if (( failures > 0 )); then
  printf 'Presentation validation failed: %d issue(s)\n' "$failures" >&2
  exit 1
fi

printf 'Presentation validation passed: %d deck(s)\n' "$deck_count"
