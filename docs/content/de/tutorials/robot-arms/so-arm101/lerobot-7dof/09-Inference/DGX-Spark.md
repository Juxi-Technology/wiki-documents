---
title: "Inferenz mit dem NVIDIA DGX Spark"
description: "Richten Sie die PyTorch-Umgebung auf dem NVIDIA DGX Spark ein und führen Sie dort die Policy-Inferenz für den 7-DOF-SO-ARM101 aus."
---

# Inferenz mit dem NVIDIA DGX Spark

> **Hinweis:** Neuere LeRobot-Versionen haben die Policy-Inferenz in den eigenen Befehl `lerobot-rollout` verlagert; `lerobot-record` dient jetzt nur noch der Datenerfassung. Der unten stehende Befehl `lerobot-record --policy.path` gilt für ältere Versionen.

## Umgebung installieren

- Pytorch

pytorch separat von der offiziellen Website in der cuda13\.0\-Version installieren

```Shell
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

- Dann in der Datei pyproject\.toml torch separat auskommentieren

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

Danach pip install \-e \.

- Achten Sie auf den Pfad von policy\.path im Inferenzbefehl und ersetzen Sie ihn durch den tatsächlichen Modellpfad im Spark

## Vorhandenen Datensatz, dessen Name mit eval beginnt, löschen (falls vorhanden)

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

- Umgebung installieren

```Shell
conda activate base
conda create -y -n lerobot-smolvla python=3.10 -y
conda activate lerobot-smolvla
conda install ffmpeg=7.1.1 -c conda-forge -y

pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130

cd lerobot
pip install -e ".[feetech,smolvla]"
```

- Inferenz

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

- Umgebung installieren

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

- Code hinzufügen

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

- Umgebung installieren

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y

cd lerobot
pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130
pip install -e ".[feetech,pi]"
```

- Inferenz

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



