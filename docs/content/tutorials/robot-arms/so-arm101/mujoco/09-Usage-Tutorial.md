---
title: "09 · Complete Usage Tutorial (Arm Bring-Up → Dataset → Watching Videos → Training → Deployment)"
---

# 09 · Complete Usage Tutorial (Arm Bring-Up → Dataset → Watching Videos → Training → Deployment)

> An all-in-one operations manual: follow it through once and you can go from "plugging in the leader arm" all the way to "a trained policy doing the work on its own in simulation".
> Just execute this document in chapter order—all dependencies (including the `training` extra for training) are installed in one go in [01](/tutorials/robot-arms/so-arm101/mujoco/01-Environment),
> with nothing to install midway.
> Prerequisites: the environment is set up per [01](/tutorials/robot-arms/so-arm101/mujoco/01-Environment), and the leader arm is calibrated per [03](/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)
> (on this machine, `juxi_leader` / COM124). All recording-related pitfalls are collected in [07](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

## 0 · One-Time Preparation

```bash
# 本机所有 uv 命令都要先设（跨盘缓存特例，见 07）
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
```

Plug in the leader arm and confirm the serial port (**the number may change on every replug**):

```bash
uv run --frozen python -c "from serial.tools import list_ports; print([p.device for p in list_ports.comports()])"
```

Leave space on the desktop: recording opens **3 windows** (main view + `wrist camera - live` + `top camera - live`).

## 1 · Teleoperation Warm-Up (Recommended)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

Move the leader arm around and confirm the simulated arm follows; before exiting (Ctrl-C), park the leader arm **near the mid-position pose**, so there is no large convergence segment at the instant recording starts.

## 2 · Recording (Core Command)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="put the cube in the box" \
    --dataset.video=true --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true
```

Key points (for the remaining parameters, see the parameter table in [06](/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay)):

| Item | Description |
| --- | --- |
| `--dataset.root` | **root is the dataset directory itself**; use a new directory for each session (startup is refused if a directory with the same name exists) |
| Auto-injected defaults | Video codec `h264`, encoder threads `2`—`record.py` prints two hint lines at startup; passing `--dataset.rgb_encoder.vcodec=...` / `--dataset.encoder_threads=...` explicitly overrides them (reason in 07) |
| Preview windows | On by default (15Hz; disable with `--robot.preview_cameras=false`; adjustable with `--robot.preview_fps`) |
| `--dataset.video=true` | Both camera streams are stored (`observation.images.wrist / top`); drop `top_camera` if you only want the wrist camera |

## 3 · Operating During Recording

| Key | Action |
| --- | --- |
| `→` or `n` | End the current episode and save |
| `←` or `r` | Discard the current episode and re-record in place |
| `q` | End the whole session and save the dataset |

- After an episode ends, the **cubes return to their positions automatically**; you only need to pull the leader arm back to the starting pose; wait until you see `Recording episode N` before starting the next episode's motion.
- During the save phase (tens of seconds) the console prints `[record.py] reset done; saving the episode + encoding videos now`—
  during this time **key presses are safely ignored** (accidental presses cannot damage any episode); wait for the next `Recording episode` line before operating.
- Encoding failures have an **automatic retry fallback** (after printing `video encode failed ... retrying once`, it retries automatically 3 seconds later); saved episodes are never lost.

## 4 · Inspection

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

How to read the output:

- **Episodes with all-zero action span or a zero gripper** are empty/invalid recordings; delete and re-record;
- **A large `max |act-obs|` at the start of each episode** is the convergence segment and is normal; later in the episode it should be below about 10 units.

## 5 · Watching Videos

```bash
uv run --frozen python examples/so101_mujoco/export_videos.py \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Outputs:

- `examples/so101_mujoco/outputs/videos/so101_sim_vision/epN_top.mp4`, `epN_wrist.mp4` — **one double-clickable video per camera per episode**;
- `examples/so101_mujoco/outputs/renders/so101_sim_vision_epN_dual.png` — one contact sheet per episode (top view on the top row, wrist on the bottom row, 6 evenly sampled frames), for quick visual inspection (`--no-strips` skips it).

The dataset also contains the original packed videos (multiple episodes concatenated in order into the same file):
`outputs/datasets/so101_sim_vision/videos/observation.images.{top,wrist}/chunk-000/file-000.mp4`.

## 6 · Replay (Optional)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0
```

## 7 · Training

```bash
uv run --frozen lerobot-train \
    --policy.type=act \
    --policy.push_to_hub=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --output_dir=examples/so101_mujoco/outputs/train/act_so101_sim_vision \
    --steps=100000 --batch_size=8 --save_freq=20000 --log_freq=200 \
    --num_workers=4 --wandb.enable=false --policy.device=cpu
```

| Key point | Description |
| --- | --- |
| `--policy.type` | Policy type; **start with `act`** (the best match for this data scale/task); `ls src/lerobot/policies/` shows other options (diffusion / smolvla / pi0, etc.) |
| `--policy.push_to_hub=false` | **Required**—by default it wants to push to HuggingFace Hub, and without a configured `repo_id` it exits with an error; to push, change it to `--policy.repo_id=你的用户名/模型名` (requires `hf auth login` first) |
| `--policy.device=cpu` | Use `cpu` on this machine since it has no discrete GPU; on machines with an NVIDIA card, drop this parameter (cuda is used automatically) |
| Artifacts | The training directory will contain `checkpoints/last/pretrained_model/` (latest, **point deployment at it**) and historical snapshots named by save step (e.g. `checkpoints/000012/`); the `train_config.json` used for resuming training is inside `pretrained_model/` |
| Resuming | After an interruption, add to the original command: `--resume=true --config_path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model/train_config.json` (the path is the location under the `--output_dir` of the command above) |

**Expected speed on this machine**: about **2 seconds/step** on pure CPU (batch 2, 480p dual camera; the 12-step smoke test measured loss dropping from 70 to 22, a normal direction).
So this machine is suitable for small-step pipeline validation—the tutorial's bundled `outputs/train/smoke_act` is the 12-step product;
**for full training, switch to a machine with a GPU** (ACT is typically on the order of 100k steps; the command is exactly the same).

> Dependency note: the `training` extra required for training (accelerate, etc.) is already included in the one-time
> installation in [01](/tutorials/robot-arms/so-arm101/mujoco/01-Environment); this chapter needs no additional installation steps.

## 8 · Deployment (Let the Policy Work on Its Own in Simulation)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/rollout.py \
    --policy.path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model \
    --strategy.type=base \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --task="put the cube in the box" --duration=30
```

| Key point | Description |
| --- | --- |
| Camera parameters | `--robot.image_camera/--robot.top_camera` **must match those used when recording the dataset** (sim_cam + top_cam), otherwise the policy will not get the images it was trained on |
| `--task` | Must match `--dataset.single_task` used during recording |
| `--duration` | Automatically finishes after this many seconds (before finishing, it sends the arm back to the initial pose and then disconnects); `Ctrl-C` can also stop it midway |
| To try out the pipeline first | Use the tutorial's bundled demo model: `--policy.path=examples/so101_mujoco/outputs/train/smoke_act/checkpoints/last/pretrained_model` (trained for 12 steps; the motions are close to random—only for validating the pipeline) |
| CPU-only deployment | Policy inference occasionally has 0.5s spikes and prints `Control loop is running slower ... than the target FPS`—it runs in simulation but stutters; no such problem on GPU (measured: the 20s smoke run ran throughout and finished normally) |
| Real-robot deployment | Replace `--robot.*` with the real robot: `--robot.type=so101_follower --robot.port=COMxx --robot.id=juxi_so101 --robot.use_degrees=false` (remember to leave space on the desktop) |
| Other modes | `--strategy.type=sentry / highlight / dagger / episodic`: record while running / ring-buffer save on keypress / human-in-the-loop correction / episodic recording, see `lerobot-rollout --help` |

## Appendix A · Switching to a conda Environment (Optional)

This repository uses a **uv-managed project-local `.venv`** by default (see [01](/tutorials/robot-arms/so-arm101/mujoco/01-Environment)), and run commands need the
`uv run --frozen --with mujoco` prefix. If you prefer conda, **replace the "create environment" step with the three commands below**,
and afterwards **drop the uv prefix from all commands** (run `python examples/...` directly); `UV_CACHE_DIR` is no longer needed either
(that is uv's cross-drive cache special case and has nothing to do with conda):

```bash
# 一次性：在仓库根目录建好环境（python 版本对齐 01 的 3.12）
conda create -n lerobot-sim python=3.12 -y
conda activate lerobot-sim
pip install -e .            # 安装本仓库 lerobot 及其依赖（含 torch，Windows 上 pip 默认就是 CPU 版）
pip install "mujoco==3.16"  # uv 路线用 --with mujoco 临时提供，conda 路线装成常驻依赖
```

After that, for example, recording becomes:

```bash
python examples/so101_mujoco/record.py --robot.image_camera=sim_cam ...
```

Two caveats:

1. **Version alignment**: `pip install -e .` lets pip resolve versions itself, which may not exactly match `uv.lock`;
   for a combination identical to the currently verified environment, use uv to install into the conda environment from the lock file:

   ```bash
   uv pip sync uv.lock --python "$(conda run -n lerobot-sim python -c 'import sys; print(sys.executable)')"
   pip install "mujoco==3.16"
   ```

2. The leader arm's calibration cache is stored in `~/.cache/huggingface/lerobot/calibration/` and is independent of which environment is used; switching environments does not require recalibration.

## Appendix B · Common Pitfalls Quick Reference

| Symptom | In one sentence |
| --- | --- |
| Serial port will not open | List the ports first; the number may have changed (step 0) |
| The console is quiet for tens of seconds while saving | It is encoding, which is normal; once you see the `saving the episode...` hint, do not press keys |
| Video occasionally stutters during recording | Encoding resource contention during the save window; the control loop itself is unaffected (trust the cadence numbers); see 07 for details |
| Can it be recovered after a crash? | Saved episodes are never lost; continue with `record.py --resume=true ... --dataset.num_episodes=N` |
| `lerobot-train` reports `'repo_id' argument missing` | It wants to push to the Hub by default: add `--policy.push_to_hub=false` (to push, configure `--policy.repo_id` and run `hf auth login` first) |
| The policy does not move or moves erratically during deployment | First check whether `--robot.image_camera/--robot.top_camera` and `--task` match the recording; then check whether it was trained for only very few steps |

All pitfalls and solutions (including memory pressure, encoding OOM, empty episodes, etc.) are in [07 · Troubleshooting](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

<RelatedProducts slugs="so-arm101" />
