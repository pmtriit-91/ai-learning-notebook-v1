# Session Metrics — V6

V6 có telemetry script thật:

```bash
python .agents/_tools/telemetry_collector.py record --mode FAST --capability fast_ui_fix --files 3 --event complete
python .agents/_tools/telemetry_collector.py summary
```

## Metrics tracked

- mode usage
- capability usage
- file count per task
- escalation events
- repeated failure events
- average files touched/read

## Goal

Telemetry không dùng để làm agent nói nhiều hơn.
Telemetry dùng để tối ưu system sau nhiều session thực chiến.

Không ghi log dài trong chat.
Ghi log vào `_telemetry/session-log.jsonl`.
