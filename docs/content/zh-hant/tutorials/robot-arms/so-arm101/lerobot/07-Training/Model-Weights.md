---
title: "第七步:取得模型權重檔案"
description: "本頁說明如何在雲端 GPU 打包模型權重並下載回本機，以及模型每兩萬個訓練步儲存一次權重的規則。"
---

# 第七步:取得模型權重檔案

在雲GPU上訓練完後，可以把模型打包下載到本地：

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

每20K個step，儲存一次模型權重檔案

右鍵下載`ckpt.zip`壓縮包，解壓到本地電腦

> 如果模型還要傳給其他人、或者你打算換一台電腦推理，把它直接傳到 Hugging Face 會比打包下載更省事，見[上傳模型到HuggingFace（可選）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)。

## 握手

```Shell
# 指定訓練步數儲存的模型
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 最新的模型
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
