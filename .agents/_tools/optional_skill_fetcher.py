#!/usr/bin/env python3
"""
Optional Skill Fetcher — V6.1 Runtime Kernel Final

Fetches a single optional skill from the disabled vendor zip without extracting the full pack.

Usage:
  python _tools/optional_skill_fetcher.py list
  python _tools/optional_skill_fetcher.py search security
  python _tools/optional_skill_fetcher.py fetch security-review
  python _tools/optional_skill_fetcher.py show security-review
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
VENDOR_DIR = ROOT / "_vendor"
CACHE_DIR = ROOT / "_runtime" / "optional_skill_cache"
REGISTRY_PATH = ROOT / "optional-skill-registry.json"
PROJECT_CONFIG = ROOT / "project" / "skill-config.json"

ZIP_CANDIDATES = [
    VENDOR_DIR / "claude-code-ai-os-pack.optional-disabled.zip",
    VENDOR_DIR / "claude-code-ai-os-pack.zip",
]

def load_json(path: Path, default):
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default

def load_registry():
    raw = load_json(REGISTRY_PATH, {})
    if isinstance(raw, list):
        return {item.get("name") or item.get("id"): item for item in raw if isinstance(item, dict)}
    if isinstance(raw, dict):
        if "skills" in raw and isinstance(raw["skills"], list):
            return {item.get("name") or item.get("id"): item for item in raw["skills"] if isinstance(item, dict)}
        return raw
    return {}

def allowed_skills():
    cfg = load_json(PROJECT_CONFIG, {})
    allowed = cfg.get("allowed_optional_skills", [])
    allow_pack = cfg.get("allow_optional_pack", False)
    return allow_pack, set(allowed)

def find_zip():
    for p in ZIP_CANDIDATES:
        if p.exists():
            return p
    for p in VENDOR_DIR.glob("*.zip"):
        return p
    raise FileNotFoundError("No optional vendor zip found in _vendor/.")

def list_skills():
    reg = load_registry()
    for name in sorted(reg.keys()):
        print(name)

def search_skills(query: str):
    query = query.lower()
    reg = load_registry()
    for name, meta in sorted(reg.items()):
        text = json.dumps(meta, ensure_ascii=False).lower()
        if query in name.lower() or query in text:
            print(name)

def find_skill_entries(z: ZipFile, skill_name: str):
    names = z.namelist()
    candidates = []
    for n in names:
        low = n.lower().replace("\\", "/")
        if f"/{skill_name.lower()}/" in low or low.endswith(f"/{skill_name.lower()}/skill.md"):
            candidates.append(n)
    if not candidates:
        # fallback: any path segment equals skill name
        for n in names:
            parts = [p.lower() for p in n.replace("\\", "/").split("/")]
            if skill_name.lower() in parts:
                candidates.append(n)
    return candidates

def fetch_skill(skill_name: str, show_only=False):
    allow_pack, allowed = allowed_skills()
    if not allow_pack and skill_name not in allowed:
        raise PermissionError(
            f"Skill '{skill_name}' is not allowed by project/skill-config.json. "
            "Add it to allowed_optional_skills or set allow_optional_pack=true."
        )

    zip_path = find_zip()
    with ZipFile(zip_path) as z:
        entries = find_skill_entries(z, skill_name)
        if not entries:
            raise FileNotFoundError(f"Skill '{skill_name}' not found in {zip_path.name}")

        if show_only:
            for e in entries:
                if e.lower().endswith((".md", ".txt", ".yaml", ".yml", ".json")):
                    data = z.read(e).decode("utf-8", errors="ignore")
                    print(f"\n--- {e} ---\n")
                    print(data[:12000])
            return

        target_root = CACHE_DIR / skill_name
        target_root.mkdir(parents=True, exist_ok=True)

        common_prefix = os.path.commonprefix(entries)
        for e in entries:
            if e.endswith("/"):
                continue
            rel = e[len(common_prefix):].lstrip("/\\") or Path(e).name
            out = target_root / rel
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(z.read(e))

        print(f"Fetched optional skill '{skill_name}' to: {target_root}")

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("list")
    s = sub.add_parser("search")
    s.add_argument("query")
    f = sub.add_parser("fetch")
    f.add_argument("skill")
    sh = sub.add_parser("show")
    sh.add_argument("skill")

    args = ap.parse_args()

    if args.cmd == "list":
        list_skills()
    elif args.cmd == "search":
        search_skills(args.query)
    elif args.cmd == "fetch":
        fetch_skill(args.skill)
    elif args.cmd == "show":
        fetch_skill(args.skill, show_only=True)

if __name__ == "__main__":
    main()
