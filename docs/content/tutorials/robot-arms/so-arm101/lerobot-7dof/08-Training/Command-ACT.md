---
title: "Training Command Line - ACT (Recommended for Beginners)"
description: "The complete ACT training command for the SO-ARM101 handshake task, with a parameter reference and notes on the training process."
---

# Training Command Line \- ACT (Recommended for Beginners)

## Reference documentation

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act\.mdx

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

## Why start with the ACT algorithm

ACT is the first model most recommended for training when playing with LeRobot. Its advantages are as follows:

- The model is very lightweight, with only eighty million learnable parameters

- Training converges very quickly, and inference is also very fast

- You can see results after training for one hour on a single GPU

- The ACT model download archive is about 200MB, which makes it very easy to store and transfer

- Collecting about 30 episodes of data for the dataset is basically enough

- It can be deployed for inference on an Ubuntu host, a Mac computer, a Windows computer, or even a Raspberry Pi

- The inference results on a real robot are still quite good, which is enough for simple tasks like grabbing, shaking hands, and placing a pen

- The ACT algorithm is already included in the basic environment of the LeRobot library, so no other libraries need to be installed

## Command line

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
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

The line-continuation character `\` can only have one space before it and no space after it

The parameters shown in red must be checked or modified before each run

|Command line parameter|Description|
|---|---|
|\-\-dataset\.repo\_id|The Repo\_ID of the HuggingFace dataset|
|\-\-dataset\.root|The local path of the dataset|
|\-\-dataset\.revision|The dataset version, which was specified when uploading the dataset to HuggingFace|
|\-\-dataset\.streaming|The dataset is local, so it must be `false`, because the dataset is already local and does not need streaming reads|
|\-\-dataset\.split|Defaults to `train`, i.e. use all the data as the training set|
|\-\-policy\.type|The algorithm to train, such as act, smolvla, diffusion, pi0, wallx|
|\-\-output\_dir|The directory where the training output is saved|
|\-\-job\_name|The name of this training job|
|\-\-policy\.device|The compute device|
|\-\-wandb\.enable|Enable wandb visualization|
|\-\-wandb\.project|The wandb project name|
|\-\-policy\.push\_to\_hub|Upload the trained model to the HuggingFace cloud|
|\-\-steps|The number of training steps|
|\-\-batch\_size|The amount of data fed in per step; if VRAM is insufficient, it should be reduced|
|||

## Training process

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

The model archive is about 300MB

