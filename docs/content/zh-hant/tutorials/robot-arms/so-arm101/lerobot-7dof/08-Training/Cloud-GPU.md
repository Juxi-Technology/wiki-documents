---
title: "雲GPU訓練環境配置"
description: "本頁說明雲端 GPU 訓練環境的設定流程，包含開通執行個體、安裝 LeRobot 與 wandb、掛載數據集與演算法選擇。"
---

# 雲GPU訓練環境配置

## 關閉自己電腦的網絡代理

不然可能打不開Jupyter的命令行

## 登錄雲GPU平台Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

加用戶群，跟客服說是同濟子豪兄粉絲，領取代金券

## 開啟一個雲GPU實例

## 安裝配置環境

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

## 登錄wandb

```Shell
wandb login
複製粘貼API Key，回車
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## 掛載數據集

```Shell
複製實例下載命令，類似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

數據集出現在`~`目錄下

## 修改權重保存頻率（選做）

打開`lerobot/src/lerobot/configs/train.py`

將save\_freq，從20\_000修改為5\_000

這樣能在訓練更早期獲得模型權重文件



