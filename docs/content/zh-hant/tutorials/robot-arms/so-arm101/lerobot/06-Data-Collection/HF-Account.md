---
title: "第六步:註冊 Hugging Face 帳號(可選)"
description: "本頁說明如何註冊 Hugging Face 帳號，包含設定鏡像端點、建立與綁定 Token，以及建立數據集儲存庫。"
---

# 第六步:註冊 Hugging Face 帳號(可選)

## 設定HuggingFace國內鏡像

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在檔案末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 輸出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 在檔案末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 輸出
# https://hf-mirror.com
```

## 建立Token

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## 記錄下你自己的 Token

建立完成後，頁面上會顯示一串以 `hf_` 開頭的密鑰，把它複製下來儲存好，後面綁定賬號時要用。樣式如下（這只是一串佔位符，請以你自己頁面上的為準）：

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 綁定Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> 用上下鍵控制，選擇粘貼密鑰
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> 成功介面
> 
> 

## 建立Dataset Repo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
