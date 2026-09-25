---
title: "註冊Hugging Face賬號（可選）"
description: "本頁說明如何註冊 Hugging Face 帳號，包含設定鏡像端點、建立與綁定 Token，以及建立數據集儲存庫。"
---

# 註冊Hugging Face賬號（可選）

## 設置HuggingFace國內鏡像

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在文件末尾加入
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

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 輸出
# https://hf-mirror.com
```



## 創建Token

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## 記錄Token

例如，我的是：

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 綁定Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## 創建Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









