#!/usr/bin/env bash

set -euo pipefail

tools_dir="$(cd "$(dirname "$0")" && pwd)"
project_dir="$(cd "$tools_dir/.." && pwd)"
cd "$project_dir"

echo "[1/5] Presentation validation"
bash tools/validate-presentations.sh

[[ "${1:-}" == "--quick" ]] && exit 0

echo "[2/5] Documentation references"
missing=0
while IFS= read -r doc; do
  [[ -z "$doc" ]] && continue
  if [[ ! -f "$doc" ]]; then
    echo "ERROR: AGENTS.md references missing file: $doc" >&2
    missing=$((missing + 1))
  fi
done < <(rg -o 'docs/[A-Za-z0-9_./-]+\.md' AGENTS.md | sort -u)

echo "[3/5] Harness validation"
bash tools/validate-harness.sh

echo "[4/5] Repository drift"
git diff --check

echo "[5/5] Load-bearing review reminder"
echo "Quarterly or after a model upgrade: test each harness rule; keep, simplify, or remove using observed evidence."

(( missing == 0 )) || exit 1
echo "Sweep clean"
