---
title: "01 · Environment Setup"
description: "One-time setup."
---

# 01 · Environment Setup

One-time setup. This repository uses **uv to manage a project-isolated `.venv`**—`uv run` only uses the environment in that directory and
does not touch your conda (this design is deliberate; see [07 Troubleshooting](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Installation

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

What the four extras provide:

| extra | What it provides | Who needs it |
| --- | --- | --- |
| `core_scripts` | Official record / teleoperate / calibrate / replay entry points + dataset + visualization dependencies | Everyone |
| `feetech` | `scservo_sdk` (STS3215 servo serial protocol) | Real-robot operations |
| `pynput-dep` | Global keyboard listener | Keyboard teleoperation, recording episode-control keys |
| `training` | `accelerate` / `wandb`, etc. | `lerobot-train` training, policy deployment (`lerobot-rollout`) |

Add MuJoCo temporarily when needed (it is not in the lock file; it is loaded on demand):

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

How to read the three parts: `uv run` runs commands using this repository's `.venv`; `--frozen` strictly uses the versions pinned in
`uv.lock` and does not re-resolve dependencies; `--with mujoco` temporarily adds the MuJoCo package **for this command only**—the next
command does not include it, so it does not exist in the environment, which is why all simulation commands in 02–09 carry this prefix.

After completing this chapter, all commands in 02–09 can be run directly: the `training` extra (required for training/deployment) is already included in the
`uv sync` above, so **no further dependencies need to be installed later**.

**Want to switch to a conda environment**? Then run commands without the `uv run` prefix—see
[09 Complete Usage Tutorial · Appendix A](/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) for the three environment-creation commands and caveats.

## Verification

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## Common Issues

- **`uv sync` reports `failed to persist temporary file ... os error 17`**: a special case on this machine where the uv cache directory spans
  drives; use the `UV_CACHE_DIR` prefix above, see [07](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) for details.
- **Do not use the Microsoft Store version of Python**: just use the Python 3.12 managed automatically by uv.
- The first `uv run --with mujoco` downloads a mujoco wheel of about 5.6MB; subsequent runs use the cache.

<RelatedProducts slugs="so-arm101" />
