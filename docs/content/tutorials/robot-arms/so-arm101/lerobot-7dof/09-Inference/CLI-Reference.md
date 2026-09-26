---
title: "Command Line Reference"
description: "Reference for the LeRobot rollout deployment command, covering working modes, key parameters, camera matching and episode recording."
---

# Command Line Reference

## Version notes (important, please read first)

Starting from LeRobot **0.6.0**, a trained model must be deployed with `lerobot-rollout`. The old `lerobot-record --policy.path=...` syntax was already removed in version **0.5.2**.

In step 1 of this tutorial, LeRobot was installed with `git clone`, which gives you the current latest version, so please use the `lerobot-rollout` command line below. If you insist on using `lerobot-record`, the program will directly raise an error and prompt you to switch to `lerobot-rollout`.

The division of labor between the two commands is as follows:

- `lerobot-record`: only responsible for **collecting demonstration data** (it is what step 7 uses), and it now rejects dataset names starting with `eval_`
- `lerobot-rollout`: responsible for **deploying a trained model**, using `--strategy.type` to choose the working mode

## rollout command line parameters

| Parameter | Description |
|---|---|
| `--strategy.type` | The working mode. `base` only runs the model without recording data, for checking the results on site; `episodic` records by episode with a reset phase, behaving close to the old `lerobot-record` |
| `--policy.path` | The model path, pointing to `checkpoints/last/pretrained_model` in the training output |
| `--task` | The task description, used together with `--strategy.type=base` |
| `--duration` | The number of seconds to run; `0` means no time limit |
| `--interactive` | Add this when you need to take over midway; you can use commands such as `/stop` and `/reset` in the terminal |
| `--display_data` | Whether to start the rerun.io visualization interface |
| `--policy.device` | The compute device, such as `cuda`, `cpu` |

## Command Line Reference

With real-time visualization: \-\-display\_data=true

Without real-time visualization: \-\-display\_data=false

When `--display_data=true`, the cool rerun\.io visualization interface starts, but every frame is saved as an image under the `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` directory, which takes up a lot of space. Later you can set it to `--display_data=false`



Inference with a model on a HuggingFace model Repo: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Taking the grab-oranges task as an example

- Inference with a local model (with real-time visualization)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inference with a local model (without real-time visualization)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inference with a model on a HuggingFace model Repo

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

The model will be downloaded after running

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









