---
title: 02 · Environment Setup
---

# 02 · Environment Setup

> **Previous:** [01-Overview](01-Overview.md)
> **Next:** [03-Deployment](03-Deployment.md)

Install Docker, set up networking for mainland China, connect the hardware. **If you don't finish this page, the next one won't run.**

---

## 1. Install Docker

Skip this if it's already installed, but check first:

```bash
docker --version
```

If it isn't installed:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**You must log out and back in after the last command** (log out and log in again, or reboot), otherwise the `docker` command reports
a permission error. To verify:

```bash
docker run --rm hello-world
```

---

## 2. Configure China-region registry mirrors ⚠️ Required if you're in mainland China

**Direct connections to Docker Hub from mainland China time out** — without a mirror configured, you can't pull any image.

Edit `/etc/docker/daemon.json` (create it if it doesn't exist):

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Restart Docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Verify the mirrors are in effect:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Many mirror addresses floating around online have stopped working (USTC, NetEase, and `dockerproxy.com`
> have all shut down) — don't copy from old articles. The three above were measured working as of September 2026.

---

## 3. Prepare the hardware

### 3.1 Wiring the robot

1. Connect the SO-101 arm's servos to the computer through the USB adapter board
2. Plug in the camera over USB (if using a RealSense, use a USB 3.0 port)

### 3.2 Serial port permissions ⚠️ Important

Without this, **the container can't see the devices**:

```bash
sudo usermod -aG dialout $USER
```

**This also requires a re-login to take effect.**

### 3.3 Confirm the devices are detected

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # servo serial ports
ls /dev/video*                   # camera
```

If you can see the device nodes, the system has recognized them.

---

## 4. Configure the Hugging Face mirror ⚠️ Required in mainland China

**`huggingface.co` is completely unreachable from mainland China**, yet loading pretrained models requires it.

Add this environment variable when starting the container:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh` already sets it by default. If you're fully offline, also add `-e HF_HUB_OFFLINE=1`.

---

## Checklist

Before moving on to the next page, confirm these all pass:

```bash
docker --version                       # Docker installed
docker info | grep -A4 "Registry Mirrors"   # mirrors active
groups | grep dialout                  # serial permissions configured (after re-login)
ls /dev/ttyACM*                        # device detected
```

---

> **Next:** [03-Deployment](03-Deployment.md) — pull the image, start the container
