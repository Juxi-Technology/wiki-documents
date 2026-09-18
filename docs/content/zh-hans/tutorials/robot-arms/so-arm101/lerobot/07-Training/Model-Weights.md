---
title: "第七步:训练模型——获得模型权重文件"
description: "获得模型权重文件:训练完成后把模型打包下载到本地,并了解每两万个 step 保存一次检查点的机制。"
---

# 第七步:训练模型——获得模型权重文件

在云GPU上训练完后，可以把模型打包下载到本地：

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

每20K个step，保存一次模型权重文件

右键下载`ckpt.zip`压缩包，解压到本地电脑

> 如果模型还要传给其他人、或者你打算换一台电脑推理，把它直接传到 Hugging Face 会比打包下载更省事，见[上传模型到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)。

## 握手

```Shell
# 指定训练步数保存的模型
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 最新的模型
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
