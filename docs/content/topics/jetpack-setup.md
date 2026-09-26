---
title: "JetPack Flashing & Setup"
description: "NVIDIA Jetson JetPack flashing guide — SDK Manager & official image methods, troubleshooting, system basics"
keywords: [jetson, jetpack, flashing, system setup, nvidia]
---

# JetPack Flashing & Setup

> 📌 Using the Jetson AGX Orin Developer Kit (JetPack 7.2)? See the dedicated series: [Jetson AGX Orin](/tutorials/jetson-agx-orin/quick-start).

> 📌 Using the NVIDIA Jetson Orin Nano Super Developer Kit (JetPack 7.2.1)? See the dedicated series: [Jetson Orin Nano](/tutorials/jetson-orin-nano/quick-start).

> For developers new to NVIDIA Jetson. Juxi Technology Jetson dev kits ship with Ubuntu 22.04 preinstalled — this guide is for reflashing or changing JetPack versions.

## 1. What is JetPack?

JetPack is NVIDIA's SDK bundle for Jetson platforms, including:

- Ubuntu system image
- CUDA / cuDNN / TensorRT
- Multimedia APIs (L4T)

**Version mapping**:

| Board | Recommended JetPack | OS |
|-------|--------------------|----|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |
| Orin Nano Super (NVIDIA official kit) | JetPack 7.2.1 | Ubuntu 24.04 |

> Juxi Technology [Jetson Orin NX Super Dev Kit](/products/jetson-orin-nx-super-kit) ships with Ubuntu 22.04 (JetPack 6.x ecosystem).

> The [NVIDIA Jetson Orin Nano Super Developer Kit](/products/jetson-orin-nano-devkit) — the official NVIDIA kit, sold by Juxi — ships **without storage and without a preinstalled system** (the bundled microSD card is blank). Install JetPack 7.2.1 with the Jetson ISO method: see the [Jetson Orin Nano series](/tutorials/jetson-orin-nano/quick-start).

## 2. Flashing Methods

### Method 1: Official Image (Ubuntu Host)

```bash
# 1. Download the driver package for your board from NVIDIA
# 2. Extract and enter Linux_for_Tegra
cd Linux_for_Tegra
sudo ./apply_binaries.sh

# 3. Put Jetson into Recovery mode (hold REC + power)
# 4. Flash
sudo ./flash.sh <board-name> mmcblk0p1
```

### Method 2: SDK Manager (recommended for beginners)

1. Install [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. Connect Jetson to PC (Recovery mode)
3. Select board → JetPack version → components (keep CUDA/TensorRT)
4. Wait for flashing + first boot

> ⚠️ Flashing takes 20-60 minutes. Do NOT unplug during the process.

## 3. Troubleshooting

| Symptom | Check |
|---------|-------|
| Can't enter Recovery mode | Hold REC while powering on; verify with `lsusb` that an NVIDIA device appears |
| Flashing fails mid-way | Try a **different data cable** first; disable PC power saving; retry |
| Black screen after flash | Check display port (DP on Orin); re-enter Recovery and reflash |
| Version mismatch | Confirm board model matches JetPack version (silk-screen on board) |

## 4. Basic System Setup

### 4.1 Network & Repos

```bash
# Optional: mirror for faster apt
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 Verify GPU Environment

```bash
cat /etc/nv_tegra_release
nvcc --version

python3 -c "import torch; print(torch.cuda.is_available())"
```

> If PyTorch is unavailable, see [PyTorch Compatibility on Jetson Orin](/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

### 4.3 Max Performance Mode (Orin)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

### 4.4 Expand Root Partition

```bash
sudo systemctl enable --now nvresize
# or manually:
sudo resize2fs /dev/nvme0n1p1
```

## 5. FAQ

**Q: No WiFi after flashing?**

**A:** Orin core boards need an external M.2 WiFi module; check the dual-band antenna connection.

**Q: How to enter Recovery mode?**

**A:** Power off → hold REC (or BOOT) → power on / connect Type-C → verify `lsusb` shows `NVIDIA Corp.`.

**Q: Storage requirement?**

**A:** ≥128GB SSD recommended (SD cards are a bottleneck). 256GB is the kit standard.

---

## Related Links

- [Jetson Orin NX Super Dev Kit](/products/jetson-orin-nx-super-kit)
- [Edge AI Deployment Intro](/topics/edge-ai-intro)
- [ROS Intro Tutorial](/tutorials/ros-intro)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
