---
title: "獲得模型權重文件"
description: "本頁說明如何在雲端 GPU 打包模型權重並下載回本機，以及模型每兩萬個訓練步儲存一次權重的規則。"
---

# 獲得模型權重文件



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

每20K個step，保存一次模型權重文件



右鍵下載`ckpt.zip`壓縮包，解壓到本地電腦















## 握手

```Shell
# 指定訓練步數保存的模型
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 最新的模型
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



