---
title: "01 · Umgebung einrichten"
description: "Einmalige Aktion."
---

# 01 · Umgebung einrichten

Einmalige Aktion. Dieses Repository verwendet **eine projektintern isolierte `.venv` unter uv-Verwaltung** – `uv run` nutzt ausschließlich die Umgebung in diesem Verzeichnis
und rührt dein conda nicht an (dieses Design ist Absicht, siehe [07 Häufige Probleme](/de/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Installation

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

Zweck der vier Extras:

| extra | Bereitgestellt | Benötigt von |
| --- | --- | --- |
| `core_scripts` | Offizielle record-/teleoperate-/calibrate-/replay-Einstiegspunkte + Dataset- und Visualisierungsabhängigkeiten | Alle |
| `feetech` | `scservo_sdk` (serielles Protokoll für STS3215-Servos) | Arbeiten mit dem realen Roboter |
| `pynput-dep` | Globale Tastaturüberwachung | Tastatur-Teleoperation, Tasten zur Episodensteuerung bei der Aufzeichnung |
| `training` | `accelerate` / `wandb` usw. | `lerobot-train`-Training, Policy-Deployment (`lerobot-rollout`) |

MuJoCo bei Bedarf temporär ergänzen (nicht in der Lock-Datei, wird bei Bedarf geladen):

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

So sind die drei Teile zu lesen: `uv run` führt Befehle mit der `.venv` dieses Repositories aus; `--frozen` verwendet strikt die in `uv.lock` gesperrten
Versionen und löst Abhängigkeiten nicht neu auf; `--with mujoco` ergänzt das MuJoCo-Paket **nur für diesen einen Befehl** – beim nächsten Befehl ohne diesen Zusatz ist es in der Umgebung nicht vorhanden, deshalb tragen die Simulationsbefehle in 02–09 alle dieses Präfix.

Nach diesem Kapitel können alle Befehle aus 02–09 direkt ausgeführt werden: Das `training`-Extra (für Training/Deployment erforderlich) ist im obigen
`uv sync` bereits enthalten; **es müssen keine zusätzlichen Abhängigkeiten nachinstalliert werden**.

**Lieber eine conda-Umgebung verwenden**? Dann benötigen die Ausführungsbefehle kein `uv run`-Präfix – die drei Befehle zum Erstellen der Umgebung und die Hinweise stehen in
[09 Vollständiges Nutzungstutorial · Anhang A](/de/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial).

## Überprüfung

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## Häufige Probleme

- **`uv sync` meldet `failed to persist temporary file ... os error 17`**: Sonderfall des uv-Cache-Verzeichnisses über Laufwerksgrenzen auf diesem Rechner;
  das obige `UV_CACHE_DIR`-Präfix verwenden, Details siehe [07](/de/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).
- **Kein Python aus dem Microsoft Store verwenden**: Das von uv automatisch verwaltete Python 3.12 wählen.
- Der erste `uv run --with mujoco` lädt ein etwa 5,6 MB großes mujoco-Wheel herunter, danach wird der Cache genutzt.

<RelatedProducts slugs="so-arm101" />
