---
title: Robotics on JetPack 7.2 — What Works on the Orin Nano
sidebar_label: Robotics (State of Play)
slug: /tutorials/robotics
description: >-
  An honest status page for robotics on the Jetson Orin Nano Super Developer
  Kit (8GB) under JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac Sim, LeRobot-style
  stacks, and what to avoid planning around yet.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# Robotics on JetPack 7.2 — What Works on the Orin Nano

JetPack 7.2 moved this kit to a new platform generation: Ubuntu 24.04, CUDA 13,
and the 8 GB memory ceiling that shapes every AI workload. The robotics
ecosystem is still catching up to that move. Some pieces work today. Some do
not. Some cannot be verified from any official page yet.

This page is a status page, not a tutorial. Everything here is
document-verified only — Juxi has not tested these stacks on hardware. Check
the date on any robotics page you read: several parts of this ecosystem
changed in August and September 2026. In the diagram below, the large
right-hand block runs on the kit; Isaac Sim and Isaac Lab sit in the Omniverse
block on the left, which is a separate host.

![NVIDIA Jetson software stack, with the DGX and Omniverse hosts on the left](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Status table (checked 2026-09-26)

| What you need | Status on JetPack 7.2.1 / Orin Nano (8GB) | Notes |
|---|---|---|
| **ROS 2 (core)** | ✅ Works | JetPack does not install or require any ROS distribution. ROS 2 **Jazzy** has official Ubuntu 24.04 arm64 packages. An NVIDIA employee forum answer (2026-09-07) calls Jazzy "the recommended ROS distribution for JetPack 7.2.1". Forum answers are not official documentation. Install steps below. |
| **Isaac ROS** (hardware-accelerated ROS 2) | ⚠️ Shipped August 2026 — with real gaps | Isaac ROS 4.6.0 release notes: "Added support for Jetson Orin" and "Added support for JetPack 7.2". Orin Nano Super 8GB appears in NVIDIA's official benchmark table. But the walkthroughs have no Orin Nano section, the support table expects an NVMe SSD, and NVIDIA's JetPack page still says "Coming soon". Details below. |
| **Isaac Sim / Isaac Lab** (simulation) | ⛔ Does not run on this kit | Needs an x86_64 host with an RTX GPU (minimum GeForce RTX 4080, 16 GB VRAM, 32 GB RAM). GPUs without RT cores are not supported. aarch64 builds exist only for DGX Spark. In simulation workflows the simulator runs on the x86_64 machine, not the Jetson. |
| **GR00T (humanoid foundation models)** | ⛔ Not on this kit | GR00T 1.7 post-training needs a GPU with at least 48 GB VRAM. NVIDIA's reference workflow uses a Jetson AGX Thor as the real-robot edge computer. The same workflow converts demonstration data to LeRobot format — the software direction matches, but the compute does not live here. |
| **LeRobot-style Python stacks** (SO-ARM101, LeKiwi, vision kit) | ⚠️ Needs verification | The Python version floor is met (Ubuntu 24.04 ships Python 3.12.3; LeRobot requires 3.12 or newer). But upstream has no official JetPack 7.2 path, and the documented Jetson route is community-maintained for JetPack 6.2. Test your exact stack before committing. |
| **DeepStream** | — Not verified in this review | Covered by its own page — see [DeepStream Video Analytics](/tutorials/jetson-orin-nano/deepstream). This robotics review did not re-check the DeepStream support matrix. |
| **TensorRT Edge-LLM** | — Not verified in this review | Covered by its own page — see [Local LLM Inference](/tutorials/jetson-orin-nano/local-llm). Relevant to robotics mainly through VLA-style models. |
| **NemoClaw (agentic stack)** | ⚠️ Works, de-facto support | The installer auto-detects Jetson (Orin and Thor), and NVIDIA's site markets "Install OpenClaw on Your NVIDIA Jetson Orin Nano™". But the official platform matrix has no Jetson row, and the project is alpha / "Early preview". 8 GB is the stated minimum RAM (16 GB recommended) with a documented out-of-memory risk. See [Agentic AI](/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS on JetPack 7.2 — what the official pages say today

**The NVIDIA pages disagree with each other.** The JetPack 7.2.1 downloads
page still lists "NVIDIA Isaac™ ROS — Coming soon". The Isaac ROS project
pages say support has shipped. For Isaac ROS itself, the project pages are the
more specific source, and they are newer:

- **Isaac ROS 4.6.0 (2026-08-18)** — release notes: "Added support for Jetson
  Orin" and "Added support for JetPack 7.2". First 4.x release with that
  combination.
- **Supported platforms:** "The platforms defined in this table are the only
  hardware and software combinations that Isaac ROS tests and officially
  supports." The Jetson row: "Jetson Thor (T5000 and T4000) and Jetson Orin",
  JetPack 7.2, storage "128+ GB NVMe SSD". The table says "Jetson Orin" (the
  family), not "Orin Nano".
- **Benchmarks:** the performance table has a dedicated "Orin Nano Super 8GB"
  column with real entries — for example AprilTag Node at 720p, 104 fps, and
  Mobile SAM graph at 720p, 4.80 fps. These are NVIDIA's published figures for
  this device, not Juxi measurements. Heavier workloads show a dash ("–"):
  FoundationPose, Grounding DINO, and full SAM are not listed as runnable.
- **Isaac ROS 5.0.0 (2026-09-21)** moved to ROS 2 Lyrical Luth. The public
  ROS 2 apt repository does not provide ROS 2 Lyrical packages for Ubuntu
  24.04; NVIDIA publishes them on its own Isaac ROS Buildfarm CDN. Isaac ROS
  4.6 stays on ROS 2 Jazzy. Pick 4.6 for the mainstream Jazzy stack.

**Gaps to know before you commit:**

- **No Orin Nano setup section.** The Jetson walkthroughs cover only Jetson
  AGX Thor and Jetson AGX Orin; the only Orin-Nano-relevant link is the
  power-settings guide.
- **An NVMe SSD is expected.** The storage column says "128+ GB NVMe SSD".
  This kit ships with no storage at all, so a microSD-only setup sits outside
  the stated expectation (see [Quick Start](/tutorials/jetson-orin-nano/quick-start)).
- **Version skew.** The 4.6 setup pages ask you to confirm "R39 (release),
  REVISION: 2.0" (L4T r39.2.0) from `cat /etc/nv_tegra_release`; this kit
  ships JetPack 7.2.1 = L4T r39.2.1. Validate in Docker before migrating a
  production robot.
- **Cameras and OpenCV.** Intel RealSense cameras are "supported only in
  Docker mode. Virtual Environment and Bare Metal modes are not supported."
  JetPack 7.2 also installs OpenCV 4.8.0 while Isaac ROS is tested with
  4.6.0 — the fix is in the install steps below.
- **A 5.0 regression.** In Isaac ROS 5.0, the DNN image encoder may have
  lower throughput than in 4.6. If that node matters, consider 4.6.

> **Important**: If Isaac ROS is on your critical path, weigh the timing.
> Support on JetPack 7.2 is real but new (August 2026), and the Orin Nano
> documentation is thin. This kit was already a supported Isaac ROS target in
> the JetPack 6.2 era (Isaac ROS 3.2 Update 1, January 2025). A team that
> needs the longest-established combination, and cannot absorb first-release
> churn, has a defensible case for staying on a JetPack 6.2-era setup.
> Everyone else: move to 7.2.1, but validate your exact pipeline in Docker on
> this kit before you commit.

## Simulation and training — a different machine

Isaac Sim 6.0 cannot run on this kit. Published minimums for the Linux x86_64
path: GeForce RTX 4080, 16 GB VRAM, 32 GB RAM, 50 GB SSD. "GPUs without RT
Cores (A100, H100) are not supported." The aarch64 build "is currently only
supported on DGX Spark system." In Isaac ROS simulation workflows, "Isaac Sim
runs on a x86_64 machine providing sensor data and world information" — the
Jetson is the deployment target.

At the heavy end of robot learning the split is the same: GR00T 1.7
post-training needs at least 48 GB of VRAM, and NVIDIA's reference workflow
uses a Jetson AGX Thor as the real-robot edge computer. The rule: simulate and
train on a PC, deploy and run inference on the kit. If Isaac Sim was your
reason to consider an Orin Nano, it is the wrong machine for that job.

## LeRobot and Python robot stacks — the compatibility question

1. **The Python version question has a clear answer: 3.12 is fine.** Ubuntu
   24.04's system Python is 3.12.3, and LeRobot (0.6.2) requires Python 3.12
   or newer. The upgrade does not block LeRobot on Python-version grounds.
2. **But upstream has no JetPack 7.2 path.** LeRobot's official installation
   page states that on Jetson there is no GPU-accelerated video decode by
   default (the library falls back to pyav), that aarch64 torchcodec wheels
   need PyTorch 2.11 or newer, and that its Jetson Docker build targets
   **JetPack 6.2** and is community-maintained. No official statement says
   current LeRobot has ready aarch64 CUDA wheels for JetPack 7.2's CUDA 13.
3. **So: "needs verification" — not "supported", not "broken".** Before
   designing around LeRobot on this kit, test your exact stack: install it,
   run a small policy, and confirm that inference uses the GPU.

> **Juxi note:** Our robot kits (SO-ARM101, LeKiwi, vision kit) are built on
> LeRobot. On this kit under JetPack 7.2.1, no tested path exists yet from
> either upstream or Juxi. JetPack 6.2 is the reference platform for the
> community-maintained route. Check with Juxi support (see
> [Downloads](/tutorials/jetson-orin-nano/downloads)) before you commit a project schedule to
> LeRobot on this kit.

## What runs today

### ROS 2 Jazzy — the foundation

JetPack does not include ROS. The working path is the official ROS 2 Jazzy
deb install for Ubuntu 24.04 (arm64), summarized from the ROS 2 documentation:

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — when you need accelerated perception

Install from NVIDIA's apt repository (the official page lists the exact
keyring commands): repository
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, channel
`noble-jetpack`; China mirror `isaac.download.nvidia.cn`. Then:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Remove the preinstalled OpenCV 4.8.0 once (see the gap list above); Isaac ROS
then installs its pinned OpenCV 4.6.0 automatically:

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA recommends Docker: "Docker is the recommended option for most users.
It provides the highest level of isolation from your host system." This also
matches the RealSense camera requirement (Docker only).

### NemoClaw and the agentic stack

The installer auto-detects NVIDIA Jetson devices (Orin and Thor) and applies
the JetPack-specific host configuration. Two caveats: the project is alpha
("Early preview"), and its official platform matrix has no Jetson row, so
support is de-facto, not an official claim. 8 GB is the stated minimum RAM
(16 GB recommended), with a documented out-of-memory risk around the roughly
2.4 GB sandbox image. See [Agentic AI](/tutorials/jetson-orin-nano/agentic-ai).

## Recommendation

- **ROS 2 only:** build on JetPack 7.2.1 with ROS 2 Jazzy today. This works.
- **Critical on Isaac ROS:** supported since August 2026, but new, with thin
  Orin Nano documentation. Validate in Docker; plan an NVMe. If you need the
  longest-established combination, a JetPack 6.2-era setup stays defensible —
  see the [migration guide](/tutorials/jetson-orin-nano/jetpack-6-to-7) for the rebuild
  costs either way.
- **Needs simulation or training:** budget a separate RTX PC (Isaac Sim) and
  a Thor-class device for GR00T-class work. This kit cannot do either job.
- **Built on LeRobot:** needs verification. Test first; JetPack 6.2 is the
  reference for the documented route.
- **Do not buy this kit for:** Isaac Sim, GR00T post-training, or real-time
  full SAM / Grounding DINO / FoundationPose-class workloads — the last three
  are not listed as runnable in NVIDIA's benchmark table for this device.

## Still unclear

- **micro-ROS:** no official Jetson-specific page found (two official
  micro.ros.org URLs return 404 today). Treat the pairing as unverified.
- **ROS distribution after Isaac ROS 5.0:** the forum answer recommending
  Jazzy predates 5.0 (2026-09-21); no post-5.0 statement found.
- **LeRobot on JetPack 7.2:** no official statement; check PyTorch aarch64
  wheel availability for CUDA 13 before committing.
- **microSD-only setups with Isaac ROS:** the support table says NVMe, but
  this is not restated for Orin Nano specifically.
- **"Jetson Orin" vs "Orin Nano":** the platform table uses the family name;
  "Orin Nano Super 8GB" appears only in the benchmark table. Not resolved
  whether NVIDIA treats these as separate support claims.
- **DeepStream and TensorRT Edge-LLM:** not re-verified in this robotics
  review — see their own pages.

## Sources

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (supported platforms, Docker, ROS 2 Lyrical; checked 2026-09-26)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (Jazzy pairing, apt install, OpenCV note; checked 2026-09-26)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim on x86_64; checked 2026-09-26)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (4.6.0 and 5.0.0 notes; RealSense and DNN-encoder limitations; checked 2026-09-26)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (Orin Nano Super 8GB benchmark column; checked 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (ROS 2 Lyrical packages for Ubuntu 24.04; checked 2026-09-26)
- [Isaac Sim 6.0 installation requirements](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (checked 2026-09-26)
- [GR00T end-to-end workflow — prerequisites](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (checked 2026-09-26)
- [NVIDIA developer forum — "Is ROS2 Jazzy the correct version..." (employee answer; forum, not official docs)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (checked 2026-09-26)
- [ROS 2 Jazzy installation — deb packages (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (checked 2026-09-26)
- [ROS 2 Jazzy installation — apt repositories (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (checked 2026-09-26)
- [LeRobot installation guide (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (checked 2026-09-26)
- [LeRobot pyproject.toml (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (Python and torchcodec pins; checked 2026-09-26)
- [Ubuntu Noble — python3 package](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; checked 2026-09-26)
- [NemoClaw — prerequisites](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (checked 2026-09-26)
- [NemoClaw — platform support matrix](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (alpha stage; no Jetson row; checked 2026-09-26)
- [NemoClaw — installer troubleshooting (Jetson auto-detect)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (checked 2026-09-26)
- [NVIDIA — Build a Claw ("Install OpenClaw on Your NVIDIA Jetson Orin Nano™")](https://www.nvidia.com/en-us/ai/build-a-claw/) (checked 2026-09-26)
- [JetPack 7.2.1 downloads page (component matrix lists Isaac ROS as "Coming soon")](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-26)

*Status: reviewed on 2026-10-11. Ecosystem availability changes
quickly — re-check the linked NVIDIA and upstream pages before relying on
this table. Not yet verified on physical hardware by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
