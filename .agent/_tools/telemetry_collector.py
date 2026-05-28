#!/usr/bin/env python3
"""
Telemetry Collector — V6.1 Runtime Kernel Final

Records mode/capability/tool usage without requiring the agent to write verbose logs in chat.

Usage:
  python _tools/telemetry_collector.py record --mode FAST --capability fast_ui_fix --files 3 --event complete
  python _tools/telemetry_collector.py summary
  python _tools/telemetry_collector.py reset
"""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
LOG_DIR = ROOT / "_telemetry"
LOG_PATH = LOG_DIR / "session-log.jsonl"

def record(args):
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    event = {
        "ts": time.time(),
        "mode": args.mode,
        "capability": args.capability,
        "files": args.files,
        "event": args.event,
        "notes": args.notes or "",
    }
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(event, ensure_ascii=False) + "\n")
    print(f"Recorded telemetry event: {event['mode']} / {event['capability']} / {event['event']}")

def load_events():
    if not LOG_PATH.exists():
        return []
    events = []
    for line in LOG_PATH.read_text(encoding="utf-8").splitlines():
        try:
            events.append(json.loads(line))
        except Exception:
            pass
    return events

def summary(_args):
    events = load_events()
    if not events:
        print("No telemetry events recorded.")
        return
    modes = Counter(e.get("mode") for e in events)
    caps = Counter(e.get("capability") for e in events)
    avg_files = sum(e.get("files") or 0 for e in events) / max(len(events), 1)
    print(json.dumps({
        "events": len(events),
        "mode_counts": dict(modes),
        "capability_counts": dict(caps),
        "avg_files": round(avg_files, 2),
        "log_path": str(LOG_PATH)
    }, indent=2, ensure_ascii=False))

def reset(_args):
    if LOG_PATH.exists():
        LOG_PATH.unlink()
    print("Telemetry reset.")

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    r = sub.add_parser("record")
    r.add_argument("--mode", required=True, choices=["FAST", "STANDARD", "DEEP"])
    r.add_argument("--capability", required=True)
    r.add_argument("--files", type=int, default=0)
    r.add_argument("--event", default="complete")
    r.add_argument("--notes", default="")

    sub.add_parser("summary")
    sub.add_parser("reset")

    args = ap.parse_args()
    if args.cmd == "record":
        record(args)
    elif args.cmd == "summary":
        summary(args)
    elif args.cmd == "reset":
        reset(args)

if __name__ == "__main__":
    main()
