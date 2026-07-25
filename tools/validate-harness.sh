#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "$0")/.." && pwd)"
cd "$project_dir"

required=(
  AGENTS.md
  CLAUDE.md
  backlog.md
  docs/architecture.md
  docs/conventions.md
  docs/workflows.md
  docs/delegation.md
  docs/eval-criteria.md
  docs/runbook.md
)

failures=0
for path in "${required[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "ERROR: Required harness file missing: $path" >&2
    failures=$((failures + 1))
  fi
done

if [[ "$(tr -d '[:space:]' < CLAUDE.md)" != "@AGENTS.md" ]]; then
  echo "ERROR: CLAUDE.md must contain only @AGENTS.md" >&2
  failures=$((failures + 1))
fi

agents_lines="$(wc -l < AGENTS.md | tr -d ' ')"
if (( agents_lines > 100 )); then
  echo "ERROR: AGENTS.md has $agents_lines lines; target is at most 100" >&2
  failures=$((failures + 1))
fi

if [[ ! -L .agents/skills ]] || [[ "$(readlink .agents/skills)" != "../.claude/skills" ]]; then
  echo "ERROR: .agents/skills must link to ../.claude/skills" >&2
  failures=$((failures + 1))
fi

while IFS= read -r doc; do
  [[ -f "$doc" ]] || {
    echo "ERROR: AGENTS.md references missing file: $doc" >&2
    failures=$((failures + 1))
  }
done < <(rg -o 'docs/[A-Za-z0-9_./-]+\.md' AGENTS.md | sort -u)

if (( failures > 0 )); then
  echo "Harness validation failed: $failures issue(s)" >&2
  exit 1
fi

echo "Harness validation passed"
