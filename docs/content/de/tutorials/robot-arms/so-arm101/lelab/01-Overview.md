---
title: "1 · Überblick"
description: "LeLab bringt den LeRobot-Workflow – Kalibrieren, Teleoperieren, Aufzeichnen, Trainieren, Wiedergeben – in ein Browserfenster: Funktionen, Voraussetzungen und Speicherorte."
---

# 1 · Überblick

> **Weiter:** [02 Installation und Start](02-Install.md)

LeLab ist eine Web-App, die den LeRobot-Workflow — kalibrieren, teleoperieren, aufzeichnen, trainieren, wiedergeben — in ein einziges Browserfenster bringt.

## Was Sie tun können

| Seite | Funktion |
|---|---|
| **Calibration** | Geführte Kalibrierung beider Arme |
| **Teleoperation** | Bewegen Sie den leader-Arm; der follower spiegelt ihn, mit Live-Streaming der Gelenke |
| **Recording** | Episoden mit Kameras in ein LeRobotDataset aufzeichnen |
| **Datasets** | Episoden auf der Festplatte durchblättern, Bild für Bild, mit einer Gelenkbewegungskurve |
| **Training** | Einen LeRobot-Trainingsjob starten und die Logs verfolgen |
| **Inference** | Eine trainierte Policy auf dem follower-Arm ausführen |
| **Upload** | Ihr Dataset auf den Hugging Face Hub hochladen |

## LeLab und LeRobot

LeRobot ist die Bibliothek — Robotertreiber, Dataset-Format, Trainingscode. LeLab ist ein FastAPI-Server, der sie aufruft, plus ein React-Frontend, das über HTTP und WebSocket mit diesem Server kommuniziert.

- Alles, was LeLab nicht bereitstellt, ist weiterhin über die `lerobot-*`-Kommandozeile erreichbar.
- LeLab bündelt LeRobot nicht. Wer LeLab installiert, installiert LeRobot mit.

## Voraussetzungen

| | |
|---|---|
| Roboter | **SO-101 leader- + follower-Arme** — die einzige unterstützte Konfiguration |
| Computer | Linux, macOS oder Windows |
| Python | **3.12 oder neuer** |
| Node.js | 22 — nur für `lelab --dev` |
| USB | Zwei freie Anschlüsse, einer pro Arm |

Kalibrierung, Teleoperation und Aufzeichnung laufen auf einem Laptop. Das Training ist der schwere Schritt, und LeLab kann ihn stattdessen auf dem Hugging Face Hub ausführen — siehe [Seite 6](06-Train-and-Inference.md).

## Wohin die Dateien gehen

Unter `~/.cache/huggingface/lerobot/`:

| Pfad | Inhalt |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | Kalibrierungsdateien des leader |
| `calibration/robots/so101_follower/*.json` | Kalibrierungsdateien des follower |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Zuletzt verwendete serielle Ports |
| `saved_configs/*.txt` | Zuletzt gewähltes Kalibrierungsprofil |

Datasets landen dort, wo LeRobot sie ablegt — standardmäßig im selben Verzeichnisbaum.

Wenn Sie diesen Cache leeren oder neu installieren, müssen beide Arme neu kalibriert werden. Siehe [Fehlerbehebung](07-Troubleshooting.md).

## Begriffe

LeRobot benennt die Arme nach ihrer Rolle; die LeLab-API verwendet für dieselben zwei Arme einen zweiten Satz Namen:

| Sie sagen | LeRobot / LeLab sagen |
|---|---|
| Der Arm, den Sie von Hand bewegen | **leader** · **teleop** |
| Der Arm, der folgt | **follower** · **robot** |

---

> **Weiter:** [02 Installation und Start](02-Install.md)

<RelatedProducts slugs="so-arm101" />
