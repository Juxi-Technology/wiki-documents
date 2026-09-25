---
title: "云GPU训练环境配置"
description: "配置云 GPU 训练环境:开通 Featurize 实例、装好 LeRobot 与 ffmpeg、登录 wandb、挂载数据集,并给出训练算法的选择建议。"
---

# 云GPU训练环境配置

## 关闭自己电脑的网络代理

不然可能打不开Jupyter的命令行

## 登录云GPU平台Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

加用户群，跟客服说是同济子豪兄粉丝，领取代金券

## 开启一个云GPU实例

## 安装配置环境

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## 登录wandb

```Shell
wandb login
复制粘贴API Key，回车
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## 挂载数据集

```Shell
复制实例下载命令，类似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

数据集出现在`~`目录下

## 修改权重保存频率（选做）

打开`lerobot/src/lerobot/configs/train.py`

将save\_freq，从20\_000修改为5\_000

这样能在训练更早期获得模型权重文件



