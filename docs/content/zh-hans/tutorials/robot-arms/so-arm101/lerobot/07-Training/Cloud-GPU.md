---
title: "第七步:训练模型——云 GPU 训练环境配置"
description: "配置云 GPU 训练环境:开通 Featurize 实例、装好 LeRobot 与 ffmpeg、登录 wandb、挂载数据集,并给出训练算法的选择建议。"
---

# 第七步:训练模型——云 GPU 训练环境配置

## 训练之前，先看这里

数据集已经在第六步采集好了，接下来就是训练模型。这一步包含三件事，本篇负责前两件：

1. **准备训练环境**：在云GPU平台开通实例，装好 LeRobot、ffmpeg、wandb 等（本篇）
2. **把数据集传到云GPU上**：第六步采的数据还在你自己的电脑里（本篇的"挂载数据集"一节）
3. **运行训练命令**：算法怎么选、参数怎么调，见下面各篇

## 教程用到的数据集

训练和推理的命令里，数据集用的是**握手任务 `lerobot_my_dataset_shake_hands`**（第六步的第三篇演示的就是它），本地路径是 `~/lerobot_my_dataset_shake_hands`。运行训练命令前，请确认这个目录确实存在、名字完全一致。

如果你想训练的是自己采的任务，把命令里所有 `lerobot_my_dataset_shake_hands` 替换成你自己的数据集名即可。

## 训练算法怎么选

| 算法 | 文档 | 特点 |
|---|---|---|
| ACT | [训练命令行-ACT](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | 推荐入门，模型小、训练快，单卡一小时能看到效果 |
| SmolVLA | [训练命令行-smolvla](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | 推荐进阶，可基于预训练模型微调 |
| pi0 | [训练命令行-pi0](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | 效果最好，但显存占用大、训练慢 |
| pi0.5 | [训练命令行-pi0.5](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | pi0 的改进版 |
| pi0fast | [训练命令行-pi0fast](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | 推理速度更快 |

建议先从 ACT 跑通一遍完整流程，熟悉之后再换其它算法。

## 训练之后

- 想把训练好的模型传到 Hugging Face（备份、换机器、分享给别人），见[上传模型到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- 想把模型下载回本地电脑，见[获得模型权重文件](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## 本机训练

如果你的电脑本身就有英伟达显卡，也可以不用云GPU，直接在本机训练，见[本地Ubuntu训练](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)。

## 关闭自己电脑的网络代理

不然可能打不开Jupyter的命令行

## 登录云GPU平台Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## 开启一个云GPU实例

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> 点击下方的“JupyterLab”，左上角有个上传按钮，可以在这里上传代码和数据集
> 
> 

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

# 不上传到Huggingface和不需要wandb则不用安装
```

> 如果在模型安装的时候缺少了training，需要额外安装一下
> 
> `pip install -e ".[training]"`
> 
> 

## 登录wandb

```Shell
wandb login
复制粘贴API Key，回车
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## 挂载数据集

第一步，把第六步采集好的数据集压缩成 zip，上传到云GPU平台的"数据集"里（JupyterLab 左上角有上传按钮）。平台处理完之后，会给你一条下载命令。

第二步，在实例的命令行里运行这条下载命令并解压：

```Shell
复制实例下载命令，类似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

数据集出现在`~`目录下。

解压后可以用 `ls ~` 确认一下，目录名要和训练命令里的 `--dataset.root` 完全一致（本篇和后面各篇用的都是 `~/lerobot_my_dataset_shake_hands`）。如果解压出来多了一层同名目录，比如 `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`，就把里面那层的内容移到外层，或者直接把 `--dataset.root` 指向实际的层级。

## 修改权重保存频率（选做）

打开`lerobot/src/lerobot/configs/train.py`

将save_freq，从20_000修改为5_000

这样能在训练更早期获得模型权重文件

<RelatedProducts slugs="so-arm101" />
