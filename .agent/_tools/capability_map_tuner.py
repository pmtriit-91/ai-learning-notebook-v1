#!/usr/bin/env python3
"""
Capability Map Tuner — V6

Lightweight project-size aware helper.
It does not rewrite rules automatically unless --apply is passed.

Usage:
  python _tools/capability_map_tuner.py scan
  python _tools/capability_map_tuner.py suggest
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAP_PATH = ROOT / "core" / "capability-map.json"
IGNORE = {".git", "node_modules", "dist", "build", ".next", "_vendor", "_runtime", "__pycache__"}

CODE_EXTS = {".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".md", ".json", ".py", ".go", ".rs"}

def scan_project():
    files = []
    for p in ROOT.rglob("*"):
        if any(part in IGNORE for part in p.parts):
            continue
        if p.is_file() and p.suffix.lower() in CODE_EXTS:
            files.append(p)
    return {
        "code_files": len(files),
        "large_project": len(files) > 500,
        "medium_project": 120 < len(files) <= 500,
        "small_project": len(files) <= 120,
    }

def suggest(_args=None):
    stats = scan_project()
    if stats["large_project"]:
        suggestion = {"FAST": 8, "STANDARD": 18, "DEEP": 60}
    elif stats["medium_project"]:
        suggestion = {"FAST": 6, "STANDARD": 14, "DEEP": 40}
    else:
        suggestion = {"FAST": 5, "STANDARD": 10, "DEEP": 25}
    print(json.dumps({"project": stats, "suggested_max_files": suggestion}, indent=2))

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("scan")
    sub.add_parser("suggest")
    args = ap.parse_args()
    if args.cmd == "scan":
        print(json.dumps(scan_project(), indent=2))
    elif args.cmd == "suggest":
        suggest(args)

if __name__ == "__main__":
    main()
