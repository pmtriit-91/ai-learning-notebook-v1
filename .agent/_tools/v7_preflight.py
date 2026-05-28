#!/usr/bin/env python3
"""
V7 Preflight

Purpose:
- reduce agent self-monitoring cost
- validate proposed mode/file plan
- provide wrapper-ready policy checks

Usage:
  python .agents/_tools/v7_preflight.py --mode FAST --files src/App.tsx src/App.css
  python .agents/_tools/v7_preflight.py --mode STANDARD --files src/pages/Home.tsx src/components/Hero.tsx
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POLICY = ROOT / "_ide" / "ide-policy.json"
CAPABILITY_MAP = ROOT / "core" / "capability-map.json"

def load_json(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", required=True, choices=["FAST", "STANDARD", "DEEP"])
    parser.add_argument("--files", nargs="*", default=[])
    parser.add_argument("--capability", default="")
    args = parser.parse_args()

    policy = load_json(POLICY, {})
    capmap = load_json(CAPABILITY_MAP, {})

    mode_policy = (policy.get("modes") or {}).get(args.mode, {})
    cap_modes = (capmap.get("modes") or {}).get(args.mode, {})

    max_files = mode_policy.get("max_files") or cap_modes.get("max_files")
    blocked = mode_policy.get("blocked_paths", [])

    errors = []
    warnings = []

    if max_files is not None and len(args.files) > int(max_files):
        errors.append(f"{args.mode} allows max {max_files} files, got {len(args.files)}.")

    for f in args.files:
        normalized = f.replace("\\", "/").lstrip("./")
        for prefix in blocked:
            if normalized.startswith(prefix):
                errors.append(f"Blocked path for {args.mode}: {f}")

    if args.mode == "FAST" and not args.files:
        warnings.append("FAST with no files listed. Make sure task is truly trivial.")

    result = {
        "ok": not errors,
        "mode": args.mode,
        "capability": args.capability,
        "file_count": len(args.files),
        "max_files": max_files,
        "errors": errors,
        "warnings": warnings,
    }

    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(0 if result["ok"] else 2)

if __name__ == "__main__":
    main()
