---
title: "第七步:ACT 訓練命令列"
description: "本頁提供 ACT 演算法的完整訓練命令列，說明為何推薦從 ACT 入門，以及訓練前的設定重點。"
---

# 第七步:ACT 訓練命令列

## 執行之前

- **環境**：需要先按[雲GPU訓練環境配置](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)裝好環境、把數據集傳到雲GPU上。ACT 是 LeRobot 基礎環境自帶的，不用額外安裝
- **數據集**：命令裡的 `--dataset.root=~/lerobot_my_dataset_shake_hands` 指向第六步採集的握手數據集。如果你訓練的是自己的任務，把它換成你自己的數據集名
- **輸出目錄**：`--output_dir` 如果已經存在，會直接報 `FileExistsError`，換個新目錄名，或者加 `--resume=true` 接著訓練
- **訓練中隨時可以在 wandb 上看曲線**，見 [wandb查看實時訓練曲線](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 參考文檔

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## 為什麼從ACT算法開始

ACT是玩LeRobot最推薦訓練的第一個模型，它的好處如下：

- 模型非常輕量，只有八千萬個可學習參數

- 訓練收斂速度很快，推理速度也很快

- 在單卡GPU上訓練一個小時就能看到效果

- ACT模型本身很小，壓縮包大概200MB左右，非常便於儲存和傳輸。訓練產出的模型壓縮包約300MB（見本篇末尾）

- 數據集採集30輪數據基本就夠用了

- 可以部署在Ubuntu主機、Mac電腦、Windows電腦，甚至樹莓派上推理

- 真實機器人推理效果還很不錯，對於夾取、握手、放筆這類簡單任務足夠了

- LeRobot庫的基礎環境中已經自帶了ACT算法，無需安裝其它庫

## 命令行

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
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## 命令行說明

換行符``前面只能有一個空格，後面不能有空格

|命令行參數|說明|
|---|---|
|--dataset.repo_id|HuggingFace數據集的Repo_ID，形如`使用者名/數據集名`|
|--dataset.root|數據集本地路徑。數據集已經下載到本地時，要指向實際目錄|
|--dataset.revision|數據集版本，在上傳數據集到HuggingFace的時候指定過的|
|--dataset.streaming|是否流式讀取。數據集在本地時設為`false`，無需流式讀取|
|--policy.type|要訓練的算法，比如act、smolvla、diffusion、pi0、pi05、pi0_fast、wall_x|
|--output_dir|訓練輸出儲存的目錄|
|--job_name|本次訓練任務的名字|
|--policy.device|計算裝置|
|--wandb.enable|開啟wandb可視化|
|--wandb.project|wandb項目名稱|
|--policy.push_to_hub|將訓練好的模型發到HuggingFace雲端|
|--steps|訓練步數|
|--batch_size|一步輸入的數據量，如果顯存不夠，應該調小|

## 訓練過程

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

模型壓縮包大概300MB

<RelatedProducts slugs="so-arm101" />
