---
title: "训练命令行-ACT（推荐入门）"
description: "ACT 训练命令:讲解为什么推荐从 ACT 入门,给出完整训练命令与参数说明,模型轻量,单卡一小时即可看到效果。"
---

# 训练命令行\-ACT（推荐入门）

## 参考文档

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act\.mdx

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

## 为什么从ACT算法开始

ACT是玩LeRobot最推荐训练的第一个模型，它的好处如下：

- 模型非常轻量，只有八千万个可学习参数

- 训练收敛速度很快，推理速度也很快

- 在单卡GPU上训练一个小时就能看到效果

- ACT模型下载压缩包大概200MB左右，非常便于存储和传输

- 数据集采集30轮数据基本就够用了

- 可以部署在Ubuntu主机、Mac电脑、Windows电脑，甚至树莓派上推理

- 真实机器人推理效果还很不错，对于夹取、握手、放笔这类简单任务足够了

- LeRobot库的基础环境中已经自带了ACT算法，无需安装其它库

## 命令行

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

## 命令行说明

换行符`\`前面只能有一个空格，后面不能有空格

红色为每次运行之前都要检查或者修改的参数

|命令行参数|说明|
|---|---|
|\-\-dataset\.repo\_id|HuggingFace数据集的Repo\_ID|
|\-\-dataset\.root|数据集本地路径|
|\-\-dataset\.revision|数据集版本，在上传数据集到HuggingFace的时候指定过的|
|\-\-dataset\.streaming|数据集在本地，必须为`false`，因为数据集已经在本地，无需流式读取|
|\-\-dataset\.split|默认为`train`，也就是用全量数据作为训练集|
|\-\-policy\.type|要训练的算法，比如act、smolvla、diffusion、pi0、wallx|
|\-\-output\_dir|输出结构保存的目录|
|\-\-job\_name|本次训练任务的名字|
|\-\-policy\.device|计算设备|
|\-\-wandb\.enable|开启wandb可视化|
|\-\-wandb\.project|wandb项目名称|
|\-\-policy\.push\_to\_hub|将训练好的模型发到HuggingFace云端|
|\-\-steps|训练步数|
|\-\-batch\_size|一步输入的数据量，如果显存不够，应该调小|
|||

## 训练过程

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

模型压缩包大概300MB

