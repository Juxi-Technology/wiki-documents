---
title: "第六步:采集数据集(真机)——示教采集"
description: "在真机上示教采集数据集:替换命令中的占位符,用一个或两个摄像头分别录制抓橘子与握手任务,并说明键盘操作与保存目录。"
---

# 第六步:采集数据集(真机)——示教采集

## 命令中的占位符，请先替换成你自己的信息

教程写的是通用的操作步骤，所以从这一步开始，命令里会用到两个占位符，代表只有你才有的信息。请根据下面的说明替换，替换时**连尖括号一起去掉**：

| 占位符 | 它代表什么 | 怎么替换 |
|---|---|---|
| `<你的用户名>` | 你电脑的系统用户名，也就是家目录的名称 | 在终端里输入 `whoami` 就能看到 |
| `<你的用户名>` | 你的 HuggingFace 账号名 | 登录 HuggingFace 后，看右上角头像旁的账号名 |

举个例子。假设终端的 `whoami` 输出是 `zhangsan`，你的 HuggingFace 账号名也是 `zhangsan`，那么

- `/Users/<你的用户名>/.cache/huggingface/lerobot/<你的用户名>/` 就应该写成 `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/`
- `<你的用户名>/lerobot_my_dataset_a` 就应该写成 `zhangsan/lerobot_my_dataset_a`

> 后面所有命令里的这两个占位符，也按同样的方式替换。

> **注意**：下面第一条命令是 `sudo rm -rf`，作用是删除目录。请务必确认路径已经替换成你自己的，再按回车。

## 删除之前已经有的同名数据集（如果有）

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<你的用户名>/lerobot_my_dataset_a
```

## 一个摄像头，采集数据集-Mac电脑

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<你的用户名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 两个摄像头，采集数据集-Mac电脑

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<你的用户名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 采集中

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

键盘方向键操作：
→（右箭头）提前终止当前episode；进入下一个episode。
←（左箭头）取消当前episode；重新录制。
ESC，立即停止，编码视频，并上传数据集。

## 采集完毕，数据集保存目录

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<你的用户名>/lerobot_my_dataset_a
```

## 握手

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<你的用户名>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

采集完毕后，握手数据集会保存在：

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<你的用户名>/lerobot_my_dataset_shake_hands
```

## 关于教程里用到的两个数据集

本篇示范了两个任务，各自的用途不同：

- **抓橘子 `lerobot_my_dataset_a`**：对应前面"一个摄像头""两个摄像头"两条采集命令，也是[本地Ubuntu训练](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)那篇用的例子
- **握手 `lerobot_my_dataset_shake_hands`**：对应上面的"握手"命令。从第七步训练到第八步部署，教程统一以它为例子，所以你会看到训练命令里的 `--dataset.repo_id` 和 `--dataset.root` 都指向它

也就是说，**握手这份数据集才是后半段教程的主线示例**，请按它去采集。至于命令里的 `--dataset.num_episodes=30`、`--dataset.episode_time_s=12` 这些参数，按你自己的任务调整即可。

## 采集时需要注意的几点

- 主动臂不要出现在画面里，否则模型会把主动臂也当成特征学进去，具体可参考[采集数据集注意事项](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- 每一轮采集结束后都要把物体摆回起点，动作尽量保持一致，数据集的一致性比数量更重要
- **采集和推理时的相机参数（分辨率、fps、宽高比）必须完全一致**。分辨率会被写进数据集的元数据，训练和推理时会做校验，不一致会直接报错；就算不报错，分辨率不同也意味着视野（取景范围）不同，模型看到的世界和你示教时的对不上。本教程统一使用 `1280×720@30`，想改成别的值的话，采集、遥操、部署三处命令要一起改
- 中途退出不要停在 reset 阶段，否则这一轮会因为没有任何帧而保存失败（不影响已采集的数据）
- 如果中途退出想接着采，用 `--resume=true`，并且 `--dataset.root` 和 `--dataset.repo_id` 要和第一次完全一致

## 采集完成后

数据默认保存在 `~/.cache/huggingface/lerobot/<你的用户名>/` 下。接下来：

1. 想把数据集备份到云端，见[上传数据集到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. 准备开始训练，请接着看[第七步：训练模型](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)，那篇会先带你在云GPU平台上把数据传上去、把环境装好

<RelatedProducts slugs="so-arm101" />
