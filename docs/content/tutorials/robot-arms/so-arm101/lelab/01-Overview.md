---
title: "1 · Overview"
description: "LeLab brings the LeRobot workflow — calibrate, teleoperate, record, train, replay — into one browser window: what it does, requirements and where files go."
---

# 1 · Overview

> **Next:** [02 Install and run](02-Install.md)

LeLab is a web app that puts the LeRobot workflow — calibrate, teleoperate, record, train, replay — into one browser window.

## What you can do

| Page | What it does |
|---|---|
| **Calibration** | Guided calibration of both arms |
| **Teleoperation** | Move the leader arm; the follower mirrors it, with live joint streaming |
| **Recording** | Capture episodes into a LeRobotDataset, with cameras |
| **Datasets** | Browse episodes on disk, frame by frame, with a joint-motion trace |
| **Training** | Start a LeRobot training job and watch the logs |
| **Inference** | Run a trained policy on the follower arm |
| **Upload** | Push your dataset to the Hugging Face Hub |

## LeLab and LeRobot

LeRobot is the library — robot drivers, dataset format, training code. LeLab is a FastAPI server that calls into it, plus a React front end that talks to that server over HTTP and WebSocket.

- Anything LeLab does not expose is still reachable through the `lerobot-*` command line.
- LeLab does not bundle LeRobot. Installing LeLab installs LeRobot.

## Requirements

| | |
|---|---|
| Robot | **SO-101 leader + follower arms** — the only supported configuration |
| Computer | Linux, macOS or Windows |
| Python | **3.12 or newer** |
| Node.js | 22 — only for `lelab --dev` |
| USB | Two free ports, one per arm |

Calibration, teleoperation and recording run on a laptop. Training is the heavy step, and LeLab can run it on the Hugging Face Hub instead — see [page 6](06-Train-and-Inference.md).

## Where files go

Under `~/.cache/huggingface/lerobot/`:

| Path | Contents |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | Leader calibration files |
| `calibration/robots/so101_follower/*.json` | Follower calibration files |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Last-used serial ports |
| `saved_configs/*.txt` | Last-selected calibration profile |

Datasets go where LeRobot puts them — by default the same tree.

Clearing that cache, or reinstalling, means recalibrating both arms. See [Troubleshooting](07-Troubleshooting.md).

## Vocabulary

LeRobot names the arms by role; LeLab's API uses a second set of names for the same two arms:

| You say | LeRobot / LeLab say |
|---|---|
| The arm you move by hand | **leader** · **teleop** |
| The arm that follows | **follower** · **robot** |

---

> **Next:** [02 Install and run](02-Install.md)

<RelatedProducts slugs="so-arm101" />
