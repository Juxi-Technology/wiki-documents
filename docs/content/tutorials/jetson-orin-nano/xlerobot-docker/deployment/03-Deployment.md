---
title: 03 · Deployment
---

# 03 · Deployment

> **Previous:** [02-Environment-Setup](02-Environment-Setup.md)
> **Next, pick a path:** [xlerobot/](../xlerobot/01-Operation.md) (whole XLeRobot)
> or [lerobot/](../lerobot/01-Operation.md) (single arm / LeKiwi)

Pull the image onto your machine and start the container. Once you've finished this page, you'll be inside a shell with the whole environment ready.

---

## 1. Get the image

### Option A: Pull directly (recommended)

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

`cpu-slim` is the slim edition (roughly 660 MB to download) and contains everything needed for teleoperation, calibration, and data recording.

Want the full edition (with visualization, training, and Diffusion policies):

```bash
docker pull chenyang310/xlerobot:cpu
```

### Option B: Build it yourself

For when you need to make changes, or want to build from the latest source.

```bash
git clone <repository-url> xlerobot-docker
cd xlerobot-docker

# Generic CPU version
bash scripts/build.sh cpu

# Jetson GPU version (run on the Jetson)
bash scripts/build.sh jetson
```

The build script already points at China-region sources (Aliyun PyPI, Aliyun Ubuntu mirrors), so
**you can build on a mainland-China network with no extra configuration**.

> The first build downloads about 2 GB of dependencies — one to two hours on a slow connection.
> Use `scripts/sync.sh` plus the `wheels/` cache on the board to reuse already-downloaded packages.

---

## 2. Differences between the images

| Image | Size | Includes | Best for |
|---|---|---|---|
| `cpu-slim` | ~660 MB | Teleoperation, calibration, ACT policy inference | Just running the robot |
| `cpu` | ~1 GB | The above + visualization, data recording, training, Diffusion | Running the full workflow |
| `jetson` | ~3.6 GB | CPU edition + **CUDA acceleration** | Jetson, with GPU inference |

---

## 3. Start the container

### 3.1 Start with the script (recommended)

If you cloned the repository:

```bash
# Generic version
bash scripts/run.sh cpu

# Jetson version (adds the GPU flags automatically)
bash scripts/run.sh jetson
```

The script already configures:

- **Device passthrough** — serial ports, cameras, USB
- **Networking** — `--network host`, needed for VR teleoperation and web control
- **Source mount** — edit code without rebuilding the image
- **Cache mount** — calibration files and model downloads are kept

### 3.2 Start manually

If you're not using the script, the minimal working command:

```bash
docker run -it --rm \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:cpu-slim
```

**What each flag does:**

| Flag | Why it's needed |
|---|---|
| `--privileged` + `-v /dev:/dev` | Serial ports (SO-101 servos), cameras, USB passthrough |
| `--network host` | host/client two-process communication (ZMQ), plus VR control |
| `-v ~/.cache/huggingface` | **Calibration files** and model cache. Without it, you recalibrate every time the container restarts |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | For running visualization (opening the rerun window) |
| `-e HF_ENDPOINT` | `huggingface.co` is completely unreachable from mainland China — the mirror is mandatory |

Inside you get a bash shell with the working directory `/opt/xlerobot`.

---

## 4. Jetson GPU flags ⚠️ Different from other platforms

The Jetson image **must** be given the GPU via CDI — **`--runtime nvidia` can't be used**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Before first use, generate the CDI spec on the **host**:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Pitfall we hit**: on JetPack 7.2, the `enable-cuda-compat` hook in
> `nvidia-container-toolkit 1.19.1` crashes (`slice bounds out of range`),
> so the container won't start at all. Disable it by adding a flag:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> When the container's CUDA version matches the host's, you don't need this hook.

### Verify the GPU works

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Platform-specific notes

### Jetson Orin series — ✅ Currently officially supported

| Model | Requires | Notes |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | The board we tested on (teleoperation runs even on 3.4 GB of memory) |
| **Orin NX** | JetPack **7.2** | Same as above |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **don't support** AGX Orin 64GB — 7.2 is required |

**The only hard requirement is the JetPack version**: the torch in the image is compiled for CUDA 13.0,
and CUDA 13.x requires a driver **≥ 580**.

| JetPack | L4T | CUDA | Driver | Usable? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ Driver too old |
| **7.2** | 39.2 | 13.2 | 595 series | ✅ |

Check your version:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Upgrading from JetPack 6.x to 7.x **can't be done via `apt upgrade` / OTA** (OTA only works
> within the same major L4T version) — a full reflash is required.

### Jetson Nano (2019 original) — ❌ Never supported

Three independent reasons, all dead ends:

1. **CUDA 13 removed the Maxwell architecture entirely**. Driver R580 is the last branch to support
   Maxwell / Pascal / Volta, and CUDA 13 requires exactly 580+. The Jetson Nano can't get past
   JetPack 4.6.6 / CUDA 10.2 at best.
2. **Compute capability 5.3 is below torch's supported floor**. The architectures torch is compiled
   for in this image are `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` — sm_80 is the lowest —
   while the Jetson Nano is sm_53, so there's no native kernel for it and PTX JIT can't reach it either.
3. **The platform is EOL** (JetPack 4 stopped receiving maintenance in November 2024).

### Raspberry Pi / regular Ubuntu / x86 PC — ⏳ Not supported yet

The image **does** support these by design — the generic CPU edition is based on `python:3.12-slim`,
and upstream publishes that base image for both amd64 and arm64.

But **the published CPU edition isn't multi-arch yet** (the build script is a plain
`docker build`, so it only produces the build machine's architecture). So what you pull now may be
amd64-only or arm64-only, and the other platform can't use it.

This opens up once the multi-arch build (`docker buildx build --platform linux/amd64,linux/arm64`)
is done — until then, **use Jetson Orin only**.

> Not sure whether your image will work: <code v-pre>docker image inspect &lt;image&gt; --format '{{.Architecture}}'</code>,
> and compare it with `uname -m`.

---

## After entering the container

Run a self-check first:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Expected output:

```
torch 2.11.0+cu130     ← Jetson version; CPU version shows +cpu
lerobot 0.6.2
```

> ⚠️ **`xlerobot` and `xlerobot_mecanum` can't go in the same process** — both register as `"xlerobot"`
> in the source (the mecanum config was copied and its registration name was never changed). This is an upstream XLeRobot bug,
> and it reports `Cannot register ... as xlerobot because ... already registered`.
>
> Every other combination is fine: **original LeRobot robots and XLeRobot can coexist in the same process**
> (8 types registered together successfully in testing), and `xlerobot_2wheels` doesn't collide either.
> One robot only ever uses one variant, so normal use is unaffected.

---

> **Next, pick a path:** [xlerobot/](../xlerobot/01-Operation.md) whole XLeRobot ·
> [lerobot/](../lerobot/01-Operation.md) single arm / LeKiwi
