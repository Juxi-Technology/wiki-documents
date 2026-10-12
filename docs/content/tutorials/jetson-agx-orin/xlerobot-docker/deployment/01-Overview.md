---
title: 01 · Overview
---

# 01 · Overview

> **Previous:** None — this is the first page
> **Next:** [02-Environment-Setup](02-Environment-Setup.md)

This page spells it out: **what the complete XLeRobot workflow is, what hardware you need, and whether your machine is supported.**

---

## Workflow

The complete XLeRobot process has four steps:

```
① Calibrate robot  →  ② Teleoperate and record  →  ③ Train model  →  ④ Deploy for autonomy
   calibrate            record                       train             eval / rollout
```

The Docker image has the **software environment** for all four steps already set up — Python, PyTorch,
LeRobot, the XLeRobot robot code, and the servo and camera drivers. You no longer have to fight version conflicts.

**The only things you need to provide yourself**: a robot (or get the software working first), a computer, and one USB cable.

---

## Hardware support

| Platform | Support |
|---|---|
| **Jetson Orin series** (JetPack 7.2) | ✅ **Currently the officially supported platform**, with GPU acceleration |
| Jetson Nano (2019 original) | ❌ Not supported — too little compute; see below |
| Raspberry Pi / regular Ubuntu / x86 PC | ⏳ **Not supported yet** — see below |
| Windows / macOS | ❌ Not supported (serial and camera passthrough only works smoothly on Linux) |

> 💡 **This image currently targets Jetson Orin devices only.**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: requires **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). AGX Orin 64GB is only fully supported on 7.2 as well.
> - **Jetson Nano (2019 original)**: ❌ never. It's Maxwell architecture (compute capability 5.3),
>   and CUDA 13 dropped Maxwell support entirely, while torch requires at least sm_80.
> - **Raspberry Pi / x86 PC**: supported by the image's design (the generic CPU edition is based on
>   `python:3.12-slim`, which upstream ships in both amd64 and arm64 versions),
>   but **the published CPU edition isn't multi-arch yet** —
>   a pull may get you amd64-only or arm64-only. That opens up once the multi-arch build is done.
>
> 4 GB of memory or more is recommended. The Jetson Orin Nano's 3.4 GB can run teleoperation,
> but training will struggle.

### System requirements

- Ubuntu 20.04 / 22.04 / 24.04, or Debian 12+
- Raspberry Pi: requires a 64-bit OS (`uname -m` shows `aarch64`)
- Kernel support for USB serial (present on virtually all systems)

### Check your architecture

```bash
uname -m
```

- `aarch64` → Raspberry Pi, Jetson (use the arm64 image)
- `x86_64` → regular PC (use the amd64 image)

---

## The folders you need to read

| # | Folder | Contents | When to read it |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (right here) | **Pull the image, run the image** | First time — read `01` → `02` → `03` in order |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Running the whole XLeRobot** | When you have the whole robot (dual arms + base) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Running the original LeRobot** | When you only have a single SO-101 / SO-100 arm or a LeKiwi |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Common problems and quick reference | When something goes wrong |

> ⚠️ **Folders 2 and 3 are alternatives — pick one** based on your hardware:
> - **Whole XLeRobot** (dual arms + base) → go to `xlerobot/`
> - **A single SO-101 / SO-100 arm**, **LeKiwi** → go to `lerobot/`
>
> The image is one shared environment — you can switch between the two paths at any time without reinstalling anything.

---

## Shortest path (just get it running)

**On a Jetson (JetPack 7.2)**, a few commands to see the robot move first — then come back for the details:

```bash
# 1. Install Docker (skip if it's already installed)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. Give the container GPU access (Jetson-specific, only needs doing once)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Pull the image (~3.6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Start the container
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Run teleoperation in the container (the first run enters the calibration guide automatically)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ The quick path skips two things you'll **have to do sooner or later**. If you get stuck, go back to the matching section:
> - **Registry mirrors for mainland China** (step 3 may hang) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` can't be omitted** (the hook is
>   buggy on JetPack 7.2 and stops the container from starting) → [03-Deployment §4](03-Deployment.md)
>
> Step 5 above runs the **whole XLeRobot** example. If you only have a single SO-101 arm,
> use the `lerobot-*` command line instead — see [lerobot/](../lerobot/01-Operation.md).

---

> **Next:** [02-Environment-Setup](02-Environment-Setup.md) — install Docker, set up China-region mirrors, connect the hardware
