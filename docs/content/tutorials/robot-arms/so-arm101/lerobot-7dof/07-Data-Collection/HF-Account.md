---
title: "Register a Hugging Face Account (Optional)"
description: "Register a Hugging Face account, set the China mirror endpoint, create and bind an access token and create a dataset repository."
---

# Register a Hugging Face Account (Optional)

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

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Save your own Token

For example, mine is:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Bind the Token

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Create a Dataset Repo

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









