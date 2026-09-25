---
title: "Hugging Faceアカウントの登録（任意）"
description: "HuggingFaceのミラー設定、アクセストークンの作成と連携、データセットリポジトリの作成までを扱う任意の手順です。"
---

# Hugging Faceアカウントの登録（任意）

## HuggingFaceの中国国内ミラーを設定する

- Ubuntu

```Shell
sudo nano ~/.bashrc

# ファイルの末尾に追加
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 出力
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# ファイルの末尾に追加
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 出力
# https://hf-mirror.com
```



## Tokenを作成する

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Tokenを記録する

例えば、私のものは次のとおりです：

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Tokenを連携する

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Dataset Repoを作成する

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









