---
title: "Step 6: Hugging Face Account (Optional)"
description: "Register a Hugging Face account, set the China mirror endpoint, create and bind an access token and create a dataset repository."
---

# Step 6: Hugging Face Account (Optional)

## Set a HuggingFace China mirror

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Add the following at the end of the file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Output
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Add the following at the end of the file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Output
# https://hf-mirror.com
```

## Create a Token

https://huggingface.co/settings/tokens

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Save your own Token

After creation, the page will show a key starting with `hf_`. Copy and save it; you will need it later when binding your account. The format is as follows (this is just a placeholder; please refer to the one on your own page):

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Bind the Token

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Use the up/down keys to select and paste the key
> 
> 

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Success screen
> 
> 

## Create a Dataset Repo

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
