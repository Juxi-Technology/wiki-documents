---
title: "ステップ6:HuggingFaceアカウントの登録（任意）"
description: "HuggingFaceのミラー設定、アクセストークンの作成と連携、データセットリポジトリの作成までを扱う任意の手順です。"
---

# ステップ6:HuggingFaceアカウントの登録（任意）

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

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## 自分のTokenを記録する

作成が完了すると、ページに `hf_` で始まるキー文字列が表示されるので、それをコピーして保存しておいてください。後でアカウントを連携する際に必要になります。形式は以下のとおりです（これは単なるプレースホルダーであり、ご自身のページに表示されたものを基準にしてください）：

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Tokenを連携する

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> 上下キーで操作し、貼り付けるキーを選択します
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> 成功画面
> 
> 

## Dataset Repoを作成する

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
