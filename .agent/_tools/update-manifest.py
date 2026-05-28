#!/usr/bin/env python3
"""Update SHA-256 manifest for .agents files."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_manifest" / "current-files-sha256.json"

IGNORE_PARTS = {"__MACOSX", ".DS_Store"}

def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def should_include(path: Path) -> bool:
    if path.name == ".DS_Store":
        return False
    return not any(part in IGNORE_PARTS for part in path.parts)

def main() -> None:
    files = {}
    for path in sorted(ROOT.rglob("*")):
        if path.is_file() and should_include(path):
            rel = path.relative_to(ROOT).as_posix()
            if rel == OUT.relative_to(ROOT).as_posix():
                continue
            files[rel] = sha256_file(path)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(files, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {OUT} with {len(files)} files.")

if __name__ == "__main__":
    main()
