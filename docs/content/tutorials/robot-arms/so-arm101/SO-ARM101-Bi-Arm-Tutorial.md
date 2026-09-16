---
title: SO-ARM101 Bi-Arm (Dual Follower) Tutorial
description: "Introduces the complete workflow of the SO-ARM101 bi-arm (dual follower) system: hardware wiring and calibration, bi-arm teleoperation."
---

# SO-ARM101 Bi-Arm (Dual Follower) Tutorial

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**

This guide introduces the complete workflow for training a bi-arm SO-ARM robot system with LeRobot, including hardware connection, bi-arm calibration, bi-arm teleoperation, dataset recording and management, ACT policy training, and real-robot deployment. Following this guide, you can use two leader arms and two follower arms to collect demonstration data, train an imitation-learning policy, and run it on real robotic arms.

First, connect the cables as follows:

| Role | Port |
| --- | --- |
| Left follower arm | `/dev/ttyACM0` |
| Right follower arm | `/dev/ttyACM1` |
| Left leader arm | `/dev/ttyACM2` |
| Right leader arm | `/dev/ttyACM3` |

The follower-arm type is `so101_follower`, and the leader-arm type is `so101_leader` (in LeRobot, `so100_leader` and `so101_leader` share the same implementation).

## Prerequisites

### Install Dependencies

For environment setup, see the [SO-ARM101 Tutorial](./SO-ARM101-Tutorial.md).

### USB Permissions

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Calibration (Critical Step)

### 1.1 Calibrate the Left Follower Arm

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 Calibrate the Right Follower Arm

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 Calibrate the Left Leader Arm

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 Calibrate the Right Leader Arm

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

After calibration, the files are saved to:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Directory naming: `so101_follower` and `so100_follower`, `so101_leader` and `so100_leader` share the same implementation, so the directories are uniformly `so_follower` / `so_leader`; the leader arm is a teleoperator, so its calibration files go under `teleoperators/` rather than `robots/`.

### (Optional) If You Previously Calibrated with Other IDs

For example, if you previously used `my_awesome_follower_arm1`, `my_awesome_follower_arm2`, etc., you can copy the calibration files:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. Bi-Arm Teleoperation

### 2.1 Without Cameras

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 With Cameras

Use `lerobot-find-cameras opencv` to list camera indices; you can also add or remove cameras as needed.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### Safety Note

- Be aware of the surroundings and avoid follower-arm collisions.

## 3. Record a Dataset

### 3.1 Save Locally (No Hub Upload)

Add `--dataset.root` (data goes to that directory) and `--dataset.push_to_hub=false`, plus `--dataset.no_stamp=true` to keep the dataset name stable (otherwise a timestamp is automatically appended to `repo_id`, and later resume recording / replay / training will not find it).

> Note: `repo_id` should contain a `/` (in the form `username/dataset_name`); local datasets are not actually uploaded.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> Video encoding already defaults to `libsvtav1`, so there is no need to specify it; to customize, use nested parameters like `--dataset.rgb_encoder.vcodec=h264`.

The data is saved under `./datasets/bi_so101_task/`, with this structure:

```text
├── meta/
│   ├── info.json         # dataset info (fps, feature shapes, etc.)
│   ├── episodes/         # per-episode metadata (chunk-000/...)
│   ├── stats.json        # per-feature normalization statistics
│   └── tasks.parquet     # task text → task_index
├── data/                 # per-frame feature data (chunk-*.parquet)
└── videos/               # one subdirectory per camera (chunk-*.mp4)
```

### 3.2 Upload to Hugging Face Hub

If you want automatic upload, keep `HF_USER` and drop `root` and `push_to_hub=false` (upload is the default). Make sure the ports and camera indices match the wiring table:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> The uploaded Hub repository name will be `${HF_USER}/bi_so101_task`, matching the `repo_id` used for training from the Hub in 4.2 below. A local copy is first saved to `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`.

### 3.3 Continue Recording (Resume)

If recording exits unexpectedly (for example, you quit with the right-click while in the reset phase), or you want to complete the collection in several sessions, you can use `--resume` to keep appending episodes to the same dataset.

**Note**:

- You must add `--resume=true`, otherwise `LeRobotDataset.create()` errors out because the directory already exists.
- The resume command's `--dataset.root` and `--dataset.repo_id` must exactly match the first recording (3.1) (`resume` requires an explicit `root`).
- `--dataset.num_episodes` is **how many episodes to record this time**, not the total goal. For example, if you have recorded 15 and want 50 in total, write `35`.
- When quitting, try to do so during episode recording or right after it ends naturally; avoid quitting during the "Reset the environment" phase (it makes saving an empty episode fail).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 Replay and Delete Episodes

#### Replay a Specific Episode

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` is a 0-based index; `24` means the 25th episode.

#### Delete a Specific Episode

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

The deletion rewrites the dataset in place, and the original data is backed up to `./datasets/bi_so101_task_old/`. Once you have confirmed the new dataset is correct, you can delete the backup manually:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Delete the Entire Dataset

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. ACT Training

### 4.1 Train from a Local Dataset

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` points to the dataset directory recorded in 3.1 (`repo_id` must match the recording). If the `--output_dir` directory already exists, it raises `FileExistsError`; use a new output directory or add `--resume=true` to continue training.

### 4.2 Train from Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> The command above uses ACT's default parameters (`chunk_size=100`, `dim_model=512`, etc.).

> `repo_id` must match the repository name used in the 3.2 upload (3.2 already added `--dataset.no_stamp=true`, so the repository name is fixed as `${HF_USER}/bi_so101_task`). No `--dataset.root` is needed for training — it downloads from the Hub automatically.

## 5. Real-Robot Deployment

> Note: `lerobot-record` is only for collecting demonstration data. To deploy a trained policy, use `lerobot-rollout` — the current version of `lerobot-record` no longer accepts `--policy.path` and also rejects dataset names with the `eval_` prefix.

### 5.1 Live Evaluation (No Data Recording)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` is the run time in seconds; `0` means no time limit.
- To take over/stop mid-run, add `--interactive=true` and control it in the terminal with commands like `/stop` and `/reset`.

### 5.2 Evaluate and Record Data (Local)

Use the `episodic` strategy (behavior similar to the old `lerobot-record`: records episode by episode with a reset phase):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> Deployment dataset names must start with `rollout_` (an enforced convention in the current version). When recording locally, adding `--dataset.root` and `--dataset.no_stamp=true` is recommended to keep a timestamp from being appended to the directory name.

### 5.3 Upload Evaluation Data to Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. FAQ

| Problem | Cause | Solution |
| --- | --- | --- |
| Teleoperation prompts for re-calibration | `bi_so_follower` cannot find calibration files with the `_left` / `_right` suffix | Re-calibrate with IDs containing `_left` / `_right`, or copy the existing calibration files |
| Leader arm cannot be moved | Leader torque not disabled | Re-calibrate or check the motor |
| Resume recording reports the directory already exists | `--resume=true` was not added | Add `--resume=true` to the `lerobot-record` command |
| `--resume=true` errors and demands `root` | Resume must specify the dataset directory explicitly | Add `--dataset.root=./datasets/bi_so101_task` to the resume command, matching the first recording |
| Dataset directory name has an extra timestamp, and replay/training cannot find it | `no_stamp` was not set during recording, so a timestamp was automatically appended to `repo_id` | Add `--dataset.no_stamp=true` when recording/resuming |
| `--dataset.vcodec=...` reports the parameter does not exist | Legacy parameter; video encoding parameters are now nested | Use `--dataset.rgb_encoder.vcodec=h264` instead (the default is already `libsvtav1`) |
| During deployment, `lerobot-record` reports `--policy.path` / `eval_` errors | The current version of `lerobot-record` no longer has policy deployment capability | Use `lerobot-rollout --strategy.type=episodic` for deployment, with dataset names starting with `rollout_` |
| Left and right arms are swapped | Wrong port configuration | Swap `left_arm_config.port` and `right_arm_config.port` |
| Training cannot find the dataset | The local dataset's `root` was not specified | Add `--dataset.root=./datasets/xxx` when training |
| The dataset gets uploaded automatically | `push_to_hub=false` was not set | Add `--dataset.push_to_hub=false` when recording |
| On exit it reports `You must add one or several frames before calling add_episode` | Exited during the reset phase; the current episode has no frames | Does not affect already-recorded data; continue recording with `--resume=true` |

<RelatedProducts slugs="so-arm101" />
