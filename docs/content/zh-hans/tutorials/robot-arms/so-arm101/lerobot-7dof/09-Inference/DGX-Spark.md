---
title: "英伟达DGX Spark推理"
description: "在 DGX Spark 上跑推理：安装 cu130 版 PyTorch 并调整依赖，清理旧 eval 数据集后，给出 ACT、SmolVLA、pi0 等策略的推理命令。"
---

# 英伟达DGX Spark推理

> **提示:** 较新的 LeRobot 版本已将策略推理移至专用的 `lerobot-rollout` 命令;`lerobot-record` 现仅用于数据采集。下方的 `lerobot-record --policy.path` 命令适用于较早版本。

## 安装环境

- Pytorch

pytorch单独从官网安装cuda13\.0版本的

```Shell
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

- 然后在pyproject\.toml文件里把torch单独注释掉

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

再pip install \-e \.

- 注意推理命令行里的policy\.path的路径，换成spark里面实际的模型路径

## 删除原有的eval开头的数据集（如有）

```Shell
sudo chmod 666 /dev/ttyACM*
```



```Shell
sudo rm -rf /home/apx103/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

## ACT

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/ACT/5K/pretrained_model
```

## SmolVLA

- 安装环境

```Shell
conda activate base
conda create -y -n lerobot-smolvla python=3.10 -y
conda activate lerobot-smolvla
conda install ffmpeg=7.1.1 -c conda-forge -y

pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130

cd lerobot
pip install -e ".[feetech,smolvla]"
```

- 推理

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model
```

## WALL\-OSS

- 安装环境

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

- 添加代码

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/2.png)

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/wallx/30K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=1000
```

## pi0

- 安装环境

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y

cd lerobot
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130
pip install -e ".[feetech,pi]"
```

- 推理

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.path=/home/apx103/Downloads/lerobot_output/shake/pi0/50K/pretrained_model
```



