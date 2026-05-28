"""V7 note: for wrapper-ready plan validation, prefer v7_preflight.py when checking explicit file plans."""
#!/usr/bin/env python3
"""
V6.1 Agent Mode Check

Lightweight helper to validate a proposed MODE/LOAD plan.
This does not enforce IDE runtime behavior, but it gives agents and humans
a concrete check before executing expensive workflows.

Usage:
  python .agents/_tools/agent_mode_check.py --mode FAST --load AGENTS.md core/bootstrap.md src/App.tsx
"""
import argparse
import sys
import json
from pathlib import Path

MODE_RULES = {
    "FAST": {
        "max_files": 6,
        "forbidden_prefixes": ["_vendor/", "optional/", "reviewers/creative", "creative/interactive", "creative/motion", "routers/advanced", "workflows/advanced"],
        "forbidden_files": ["optional-skill-registry.json"],
    },
    "STANDARD": {
        "max_files": 14,
        "forbidden_prefixes": ["_vendor/", "optional/"],
        "forbidden_files": [],
    },
    "DEEP": {
        "max_files": 40,
        "forbidden_prefixes": [],
        "forbidden_files": [],
    },
}

# Load dynamic limits from core/capability-map.json if available
try:
    ROOT = Path(__file__).resolve().parents[1]
    MAP_PATH = ROOT / "core" / "capability-map.json"
    if MAP_PATH.exists():
        with MAP_PATH.open("r", encoding="utf-8") as f:
            data = json.load(f)
            limits = data.get("global_limits", {})
            if "fast_max_files" in limits:
                MODE_RULES["FAST"]["max_files"] = limits["fast_max_files"]
            if "standard_max_files" in limits:
                MODE_RULES["STANDARD"]["max_files"] = limits["standard_max_files"]
            if "deep_max_files" in limits:
                MODE_RULES["DEEP"]["max_files"] = limits["deep_max_files"]
except Exception:
    pass

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", required=True, choices=["FAST", "STANDARD", "DEEP"])
    parser.add_argument("--load", nargs="*", default=[])
    args = parser.parse_args()

    rules = MODE_RULES[args.mode]
    problems = []

    if len(args.load) > rules["max_files"]:
        problems.append(f"too many files for {args.mode}: {len(args.load)} > {rules['max_files']}")

    for f in args.load:
        normalized = f.replace("\\", "/").lstrip("./")
        for pref in rules["forbidden_prefixes"]:
            if normalized.startswith(pref):
                problems.append(f"{args.mode} should not load prefix: {normalized}")
        if normalized in rules["forbidden_files"]:
            problems.append(f"{args.mode} should not load file: {normalized}")

    if problems:
        print("MODE CHECK: FAIL")
        for p in problems:
            print("-", p)
        return 1

    print("MODE CHECK: PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
