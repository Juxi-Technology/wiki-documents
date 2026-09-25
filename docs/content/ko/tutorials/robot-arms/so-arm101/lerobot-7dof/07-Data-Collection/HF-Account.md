---
title: "Hugging Face 계정 등록(선택 사항)"
description: "HuggingFace 국내 미러 설정과 토큰 생성 및 연동, 데이터셋 리포지터리 생성 절차를 정리한 선택 사항 페이지입니다."
---

# Hugging Face 계정 등록(선택 사항)

## HuggingFace 국내 미러 설정

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 파일 끝에 추가
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 출력
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 파일 끝에 추가
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 출력
# https://hf-mirror.com
```



## Token 생성

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Token 기록

예를 들어, 제 것은 다음과 같습니다:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Token 연동

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Dataset Repo 생성

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









