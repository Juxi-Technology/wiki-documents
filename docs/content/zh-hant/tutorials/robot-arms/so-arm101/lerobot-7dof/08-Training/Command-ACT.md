---
title: "訓練命令行-ACT（推薦入門）"
description: "本頁提供 ACT 演算法的完整訓練命令列，說明為何推薦從 ACT 入門，以及訓練前的設定重點。"
---

# 訓練命令行\-ACT（推薦入門）

## 參考文檔

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act\.mdx

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

## 為什麼從ACT算法開始

ACT是玩LeRobot最推薦訓練的第一個模型，它的好處如下：

- 模型非常輕量，只有八千萬個可學習參數

- 訓練收斂速度很快，推理速度也很快

- 在單卡GPU上訓練一個小時就能看到效果

- ACT模型下載壓縮包大概200MB左右，非常便於存儲和傳輸

- 數據集採集30輪數據基本就夠用了

- 可以部署在Ubuntu主機、Mac電腦、Windows電腦，甚至樹莓派上推理

- 真實機器人推理效果還很不錯，對於夾取、握手、放筆這類簡單任務足夠了

- LeRobot庫的基礎環境中已經自帶了ACT算法，無需安裝其它庫

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

## 命令行說明

換行符`\`前面只能有一個空格，後面不能有空格

紅色為每次運行之前都要檢查或者修改的參數

|命令行參數|說明|
|---|---|
|\-\-dataset\.repo\_id|HuggingFace數據集的Repo\_ID|
|\-\-dataset\.root|數據集本地路徑|
|\-\-dataset\.revision|數據集版本，在上傳數據集到HuggingFace的時候指定過的|
|\-\-dataset\.streaming|數據集在本地，必須為`false`，因為數據集已經在本地，無需流式讀取|
|\-\-dataset\.split|默認為`train`，也就是用全量數據作為訓練集|
|\-\-policy\.type|要訓練的算法，比如act、smolvla、diffusion、pi0、wallx|
|\-\-output\_dir|輸出結構保存的目錄|
|\-\-job\_name|本次訓練任務的名字|
|\-\-policy\.device|計算設備|
|\-\-wandb\.enable|開啟wandb可視化|
|\-\-wandb\.project|wandb項目名稱|
|\-\-policy\.push\_to\_hub|將訓練好的模型發到HuggingFace雲端|
|\-\-steps|訓練步數|
|\-\-batch\_size|一步輸入的數據量，如果顯存不夠，應該調小|
|||

## 訓練過程

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

模型壓縮包大概300MB

