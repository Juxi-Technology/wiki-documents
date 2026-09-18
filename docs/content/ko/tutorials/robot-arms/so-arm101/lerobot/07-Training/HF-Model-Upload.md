---
title: "7단계: HuggingFace에 모델 업로드(선택 사항)"
description: "학습이 끝난 모델을 HuggingFace에 업로드하는 선택 사항 안내로, 학습 중 자동 업로드와 수동 업로드 두 가지 방법을 설명합니다."
---

# 7단계: HuggingFace에 모델 업로드(선택 사항)

> 이 단계는 선택 사항입니다. 모델은 학습이 끝나면 사용자의 컴퓨터나 클라우드 GPU 인스턴스에 저장되며, 그대로 추론에 사용해도 전혀 문제가 없습니다. **모델을 백업하거나, 다른 머신에서 추론하거나, 모델을 다른 사람과 공유**하려 할 때만 HuggingFace에 업로드하면 됩니다.

## 커맨드의 자리표시자

이 문서는 앞선 장의 자리표시자 표기를 그대로 따릅니다. 자신의 정보로 바꿔 주세요. 바꿀 때는 **꺾쇠괄호까지 함께 지웁니다**:

- `<사용자명>`: HuggingFace 계정 이름
- `<사용자명>`: 컴퓨터의 시스템 사용자 이름이며, 터미널에서 `whoami`를 입력하면 확인할 수 있습니다

## 방법 1: 학습 중 자동 업로드

학습 커맨드에 두 줄의 파라미터를 추가하면, 학습이 끝날 때 모델이 자동으로 업로드됩니다:

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<사용자명>/shake_act_a \
```

**이 두 줄은 반드시 한 쌍으로 함께 있어야 하며, `push_to_hub=true`만 쓰면 오류가 납니다.** `repo_id`는 이 모델에 붙인 리포지터리 이름으로, `계정 이름/모델 이름` 형태입니다. 리포지터리가 없으면 LeRobot이 자동으로 생성합니다.

예를 들어 ACT의 전체 커맨드는 다음과 같이 됩니다:

```Shell
lerobot-train \
  --dataset.repo_id=<사용자명>/lerobot_my_dataset_shake_hands \
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
  --policy.repo_id=<사용자명>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

앞 절의 설명대로, 이 버전으로 학습을 마치면 모델이 `https://huggingface.co/<사용자명>/shake_act_a`에 나타납니다.

### 중간 checkpoint도 함께 업로드하려면

학습 중에는 매 `save_freq`(기본 20000 step)마다 checkpoint가 저장됩니다. 이 중간 checkpoint까지 함께 업로드하려면(예: 학습이 오래 걸려서 중간 모델을 수시로 사용하고 싶을 때), 다음 한 줄을 추가합니다:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

업로드할 때 각 checkpoint에는 step 수와 같은 이름의 태그가 붙습니다(예: `010000`). 나중에 모델을 로드할 때 이 태그를 지정하면 해당 step의 버전을 가져올 수 있습니다. 자세한 내용은 아래 "업로드한 모델 로드"를 참고하세요.

### 몇 가지 선택 파라미터

필요에 따라 추가합니다:

| 파라미터 | 설명 |
|---|---|
| `--policy.private=true` | 리포지터리를 비공개로 설정하며, 다른 사람이 볼 수 없습니다 |
| `--policy.tags=act,so101` | 모델에 태그를 추가하여 검색하기 쉽게 합니다 |
| `--policy.license=mit` | 오픈소스 라이선스를 지정합니다 |

## 방법 2: 학습 완료 후 수동 업로드

이것은 더 자주 쓰는 방법입니다: 학습할 때는 평소처럼 `--policy.push_to_hub=false`로 쓰고, 학습이 끝나고 효과가 만족스러운 것을 확인한 뒤 모델을 수동으로 업로드합니다.

### 1. 로그인

Token을 연동해 두었다면 건너뛰어도 됩니다. 연동한 적이 없다면 [Hugging Face 계정 등록(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)을 참고하세요.

```Shell
hf auth login
hf auth whoami
```

### 2. 업로드

ACT 학습의 출력 디렉터리가 `~/output_lerobot_train/shake/act/`라고 가정합니다:

```Shell
export HF_USER=<사용자명>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

모델 리포지터리는 미리 만들 필요가 없습니다. `hf upload`는 리포지터리가 없으면 자동으로 하나 만듭니다.

### 3. 지정한 step의 checkpoint 업로드

마지막 checkpoint가 아니라 특정 중간 checkpoint만 업로드하고 싶다면:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. 웹 페이지에서 업로드

모델이 크지 않고 커맨드를 입력하고 싶지 않다면, HuggingFace 웹 페이지에서 직접 작업할 수도 있습니다: 새 Model 리포지터리를 만들고 `pretrained_model` 디렉터리 안의 파일을 끌어다 놓으면 됩니다.

## 업로드한 모델 로드

모델을 업로드한 뒤에는 배포할 때 `--policy.path`를 그것에 지정하면 되며, 먼저 로컬로 다운로드할 필요가 없습니다:

```Shell
  --policy.path=<사용자명>/shake_act_a \
```

이것은 로컬 경로를 가리키는 것보다 더 편리하며, 컴퓨터를 바꾸거나 다른 사람이 계정 이름만 알면 바로 사용할 수 있습니다. HuggingFace에서 모델을 가져오려면 그 서버에 연결할 수 있어야 하므로, 국내 네트워크 환경에서는 먼저 [Hugging Face 계정 등록(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)에 따라 미러를 설정해 두는 것을 권장합니다.

checkpoint를 여러 개 업로드했고 어느 것을 쓸지 지정하고 싶다면, 버전 번호를 추가합니다:

```Shell
  --policy.pretrained_revision=005000 \
```

`005000`은 업로드할 때의 그 checkpoint step 수입니다.

## 설명

- 모델의 리포지터리 이름(`repo_id`)은 학습 커맨드의 `--output_dir`, `--job_name`과 관계가 없으며 독립적이므로, 알아보기 쉬운 이름을 붙이면 됩니다
- 튜토리얼의 모든 학습 커맨드에는 `--policy.push_to_hub=false`라고 적혀 있습니다. 자동 업로드를 사용하려면 이 줄을 `true`로 바꾸고 `--policy.repo_id`를 보충해야 하며, 둘 중 하나도 빠져서는 안 됩니다

<RelatedProducts slugs="so-arm101" />
