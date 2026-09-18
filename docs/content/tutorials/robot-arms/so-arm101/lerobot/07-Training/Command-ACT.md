---
title: "Step 7: Training — ACT Command"
description: "The complete ACT training command for the SO-ARM101 handshake task, with a parameter reference and notes on the training process."
---

# Step 7: Training — ACT Command

## Before running

- **Environment**: you need to first set up the environment and upload the dataset to the cloud GPU as described in [Cloud GPU training environment setup](/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU). ACT comes with the basic LeRobot environment, so no extra installation is needed
- **Dataset**: `--dataset.root=~/lerobot_my_dataset_shake_hands` in the command points to the handshake dataset collected in step 6. If you are training your own task, replace it with your own dataset name
- **Output directory**: if `--output_dir` already exists, it will directly raise `FileExistsError`; use a new directory name, or add `--resume=true` to continue training
- **You can check the curves on wandb at any time during training**, see [View real-time training curves on wandb](/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Reference documentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## Why start with the ACT algorithm

ACT is the first model most recommended for training when playing with LeRobot. Its advantages are as follows:

- The model is very lightweight, with only eighty million learnable parameters

- Training converges very quickly, and inference is also very fast

- You can see results after training for one hour on a single GPU

- The ACT model itself is very small; the archive is about 200MB, which makes it very easy to store and transfer. The model archive produced by training is about 300MB (see the end of this page)

- Collecting about 30 episodes of data for the dataset is basically enough

- It can be deployed for inference on an Ubuntu host, a Mac computer, a Windows computer, or even a Raspberry Pi

- The inference results on a real robot are still quite good, which is enough for simple tasks like grabbing, shaking hands, and placing a pen

- The ACT algorithm is already included in the basic environment of the LeRobot library, so no other libraries need to be installed

## Command line

```Shell
lerobot-train \
  --dataset.repo_id=<username>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## Command line reference

The line-continuation character `` can only have one space before it and no space after it

|Command line parameter|Description|
|---|---|
|--dataset.repo_id|The Repo_ID of the HuggingFace dataset, in the form `用户名/数据集名`|
|--dataset.root|The local path of the dataset. When the dataset has already been downloaded locally, it should point to the actual directory|
|--dataset.revision|The dataset version, which was specified when uploading the dataset to HuggingFace|
|--dataset.streaming|Whether to read in a streaming manner. When the dataset is local, set this to `false`, as streaming reads are not needed|
|--policy.type|The algorithm to train, such as act, smolvla, diffusion, pi0, pi05, pi0_fast, wall_x|
|--output_dir|The directory where the training output is saved|
|--job_name|The name of this training job|
|--policy.device|The compute device|
|--wandb.enable|Enable wandb visualization|
|--wandb.project|The wandb project name|
|--policy.push_to_hub|Upload the trained model to the HuggingFace cloud|
|--steps|The number of training steps|
|--batch_size|The amount of data fed in per step; if VRAM is insufficient, it should be reduced|

## Training process

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

The model archive is about 300MB

<RelatedProducts slugs="so-arm101" />
