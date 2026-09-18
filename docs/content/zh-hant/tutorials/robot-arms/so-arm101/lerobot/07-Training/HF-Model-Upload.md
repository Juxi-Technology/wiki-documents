---
title: "第七步:上傳模型到 Hugging Face(可選)"
description: "本頁說明如何把訓練好的模型上傳到 Hugging Face，包含訓練時自動上傳與訓練後手動上傳兩種方式。"
---

# 第七步:上傳模型到 Hugging Face(可選)

> 這一步是可選的。模型訓練完就存在你的電腦或雲GPU實例上，直接拿去推理完全沒問題。只有當你需要**備份模型、換一台機器推理、或者把模型分享給別人**時，才需要把它上傳到 HuggingFace。

## 命令中的佔位符

本篇沿用了前面章節的佔位符寫法，請替換成你自己的資訊，替換時**連尖括號一起去掉**：

- `<用户名>`：你的 HuggingFace 帳號名
- `<你的用户名>`：你電腦的系統使用者名，終端裡輸入 `whoami` 可以查看

## 方法一：訓練時自動上傳

在訓練命令裡加上兩行參數，訓練結束時會自動把模型傳上去：

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
```

**這兩行必須成對出現，只寫 `push_to_hub=true` 會報錯。** `repo_id` 就是你給這個模型起的倉庫名，形如 `帳號名/模型名`，倉庫不存在的話 LeRobot 會自動建立。

比如 ACT 的完整命令就變成：

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

按上一節的說明，這一版訓練跑完，模型就會出現在 `https://huggingface.co/<用户名>/shake_act_a`。

### 想連中間的檢查點一起上傳

訓練過程中每隔 `save_freq`（預設 20000 步）會存一個檢查點。如果你想把這些中間檢查點也傳上去（比如訓練要跑很久，想隨時取用中途的模型），再加上這一行：

```Shell
  --policy.save_checkpoint_to_hub=true \
```

上傳時每個檢查點會被打上和步數同名的標籤（比如 `010000`），後面載入模型時指定這個標籤就能取到對應步數的版本，具體見下面的"載入上傳的模型"。

### 幾個可選參數

按需添加：

| 參數 | 說明 |
|---|---|
| `--policy.private=true` | 倉庫設為私有，別人看不到 |
| `--policy.tags=act,so101` | 給模型加標籤，便於檢索 |
| `--policy.license=mit` | 指定開源協議 |

## 方法二：訓練完成後手動上傳

這是更常用的做法：訓練時照常寫 `--policy.push_to_hub=false`，等訓練結束、確認效果滿意了，再手動把模型傳上去。

### 1. 登錄

綁定過 Token 就可以跳過，沒綁定過見[註冊Hugging Face帳號（可選）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)。

```Shell
hf auth login
hf auth whoami
```

### 2. 上傳

假設 ACT 訓練的輸出目錄是 `~/output_lerobot_train/shake/act/`：

```Shell
export HF_USER=<用户名>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

模型倉庫不需要提前建立，`hf upload` 發現倉庫不存在會自動建一個。

### 3. 上傳指定步數的檢查點

如果只想傳某個中間檢查點，而不是最後一個：

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. 在網頁上傳

如果模型不大、又不想敲命令，也可以直接在 HuggingFace 網頁上操作：新建一個 Model 倉庫，把 `pretrained_model` 目錄裡的檔案拖進去即可。

## 載入上傳的模型

模型上傳後，部署時把 `--policy.path` 指向它就行，不需要先下載到本地：

```Shell
  --policy.path=<用户名>/shake_act_a \
```

這比指向本地路徑更方便，換電腦、或者別人拿到你的帳號名就能直接用。注意從 HuggingFace 拉取模型需要能連上它的伺服器，國內網絡環境下建議先按[註冊Hugging Face帳號（可選）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)設定好鏡像。

如果上傳了多個檢查點，想指定用哪一個，加上版本號：

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` 就是你上傳時的那個檢查點步數。

## 說明

- 模型的倉庫名（`repo_id`）和訓練命令裡的 `--output_dir`、`--job_name` 沒有關係，是獨立的，取個好認的名字即可
- 教程裡所有訓練命令寫的都是 `--policy.push_to_hub=false`，想用自動上傳的話，把這一行改成 `true` 並補上 `--policy.repo_id`，兩者缺一不可

<RelatedProducts slugs="so-arm101" />
