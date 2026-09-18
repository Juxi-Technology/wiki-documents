---
title: "第七步:训练模型——上传模型到 Hugging Face(可选)"
description: "把训练好的模型上传到 Hugging Face:介绍训练时自动上传与训练后手动上传两种做法,并说明如何加载云端模型。"
---

# 第七步:训练模型——上传模型到 Hugging Face(可选)

> 这一步是可选的。模型训练完就存在你的电脑或云GPU实例上，直接拿去推理完全没问题。只有当你需要**备份模型、换一台机器推理、或者把模型分享给别人**时，才需要把它上传到 HuggingFace。

## 命令中的占位符

本篇沿用了前面章节的占位符写法，请替换成你自己的信息，替换时**连尖括号一起去掉**：

- `<用户名>`：你的 HuggingFace 账号名
- `<你的用户名>`：你电脑的系统用户名，终端里输入 `whoami` 可以查看

## 方法一：训练时自动上传

在训练命令里加上两行参数，训练结束时会自动把模型传上去：

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
```

**这两行必须成对出现，只写 `push_to_hub=true` 会报错。** `repo_id` 就是你给这个模型起的仓库名，形如 `账号名/模型名`，仓库不存在的话 LeRobot 会自动创建。

比如 ACT 的完整命令就变成：

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

按上一节的说明，这一版训练跑完，模型就会出现在 `https://huggingface.co/<用户名>/shake_act_a`。

### 想连中间的检查点一起上传

训练过程中每隔 `save_freq`（默认 20000 步）会存一个检查点。如果你想把这些中间检查点也传上去（比如训练要跑很久，想随时取用中途的模型），再加上这一行：

```Shell
  --policy.save_checkpoint_to_hub=true \
```

上传时每个检查点会被打上和步数同名的标签（比如 `010000`），后面加载模型时指定这个标签就能取到对应步数的版本，具体见下面的"加载上传的模型"。

### 几个可选参数

按需添加：

| 参数 | 说明 |
|---|---|
| `--policy.private=true` | 仓库设为私有，别人看不到 |
| `--policy.tags=act,so101` | 给模型加标签，便于检索 |
| `--policy.license=mit` | 指定开源协议 |

## 方法二：训练完成后手动上传

这是更常用的做法：训练时照常写 `--policy.push_to_hub=false`，等训练结束、确认效果满意了，再手动把模型传上去。

### 1. 登录

绑定过 Token 就可以跳过，没绑定过见[注册Hugging Face账号（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)。

```Shell
hf auth login
hf auth whoami
```

### 2. 上传

假设 ACT 训练的输出目录是 `~/output_lerobot_train/shake/act/`：

```Shell
export HF_USER=<用户名>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

模型仓库不需要提前创建，`hf upload` 发现仓库不存在会自动建一个。

### 3. 上传指定步数的检查点

如果只想传某个中间检查点，而不是最后一个：

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. 在网页上传

如果模型不大、又不想敲命令，也可以直接在 HuggingFace 网页上操作：新建一个 Model 仓库，把 `pretrained_model` 目录里的文件拖进去即可。

## 加载上传的模型

模型上传后，部署时把 `--policy.path` 指向它就行，不需要先下载到本地：

```Shell
  --policy.path=<用户名>/shake_act_a \
```

这比指向本地路径更方便，换电脑、或者别人拿到你的账号名就能直接用。注意从 HuggingFace 拉取模型需要能连上它的服务器，国内网络环境下建议先按[注册Hugging Face账号（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)设置好镜像。

如果上传了多个检查点，想指定用哪一个，加上版本号：

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` 就是你上传时的那个检查点步数。

## 说明

- 模型的仓库名（`repo_id`）和训练命令里的 `--output_dir`、`--job_name` 没有关系，是独立的，取个好认的名字即可
- 教程里所有训练命令写的都是 `--policy.push_to_hub=false`，想用自动上传的话，把这一行改成 `true` 并补上 `--policy.repo_id`，两者缺一不可

<RelatedProducts slugs="so-arm101" />
