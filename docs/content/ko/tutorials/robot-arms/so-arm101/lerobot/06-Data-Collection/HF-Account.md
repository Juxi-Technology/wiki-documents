---
title: "6단계: Hugging Face 계정 등록(선택 사항)"
description: "HuggingFace 국내 미러 설정과 토큰 생성 및 연동, 데이터셋 리포지터리 생성 절차를 정리한 선택 사항 페이지입니다."
---

# 6단계: Hugging Face 계정 등록(선택 사항)

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

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## 자신의 Token 기록

생성이 완료되면 페이지에 `hf_`로 시작하는 키가 표시됩니다. 이를 복사해 잘 보관하세요. 나중에 계정을 연동할 때 필요합니다. 형식은 다음과 같습니다(이는 자리 표시자일 뿐이므로, 자신의 페이지에 표시된 것을 기준으로 하세요):

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Token 연동

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> 위/아래 키로 조작하여, 키 붙여넣기를 선택
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> 성공 화면
> 
> 

## Dataset Repo 생성

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
