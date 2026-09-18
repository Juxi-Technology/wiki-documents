---
title: "6단계: 시연 데이터셋 수집"
description: "시연 데이터셋 수집 페이지로, 자리 표시자 교체와 카메라 설정, 녹화 절차, 저장 디렉터리와 악수 작업 예시까지 차례로 안내합니다."
---

# 6단계: 시연 데이터셋 수집

## 명령의 자리 표시자를 먼저 자신의 정보로 교체하세요

튜토리얼은 일반적인 작업 절차를 설명하므로, 이 단계부터 명령에 두 개의 자리 표시자가 사용되며, 이는 자신만 가진 정보를 나타냅니다. 아래 설명에 따라 교체하고, 교체할 때는 **꺾쇠괄호까지 함께 제거**하세요:

| 자리 표시자 | 나타내는 것 | 교체 방법 |
|---|---|---|
| `<사용자명>` | 컴퓨터의 시스템 사용자 이름, 즉 홈 디렉터리 이름 | 터미널에 `whoami`를 입력하면 확인할 수 있습니다 |
| `<사용자명>` | HuggingFace 계정 이름 | HuggingFace 로그인 후, 오른쪽 상단 프로필 옆의 계정 이름을 확인 |

예를 들어 봅시다. 터미널의 `whoami` 출력이 `zhangsan`이고, HuggingFace 계정 이름도 `zhangsan`이라면,

- `/Users/<사용자명>/.cache/huggingface/lerobot/<사용자명>/` 은 `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/` 로 써야 합니다
- `<사용자명>/lerobot_my_dataset_a` 는 `zhangsan/lerobot_my_dataset_a` 로 써야 합니다

> 이후 모든 명령에 나오는 이 두 자리 표시자도 같은 방식으로 교체합니다.

> **주의**: 아래 첫 번째 명령은 `sudo rm -rf`이며, 디렉터리를 삭제하는 역할을 합니다. 경로가 자신의 것으로 교체되었는지 반드시 확인한 후 엔터를 누르세요.

## 이전에 이미 있던 같은 이름의 데이터셋 삭제(있는 경우)

```Shell
sudo rm -rf /Users/<사용자명>/.cache/huggingface/lerobot/<사용자명>/lerobot_my_dataset_a
```

## 카메라 1대, 데이터셋 수집-Mac 컴퓨터

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<사용자명>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 카메라 2대, 데이터셋 수집-Mac 컴퓨터

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<사용자명>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 수집 중

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

키보드 방향키 조작:
→(오른쪽 화살표) 현재 episode를 미리 종료하고, 다음 episode로 넘어갑니다.
←(왼쪽 화살표) 현재 episode를 취소하고, 다시 녹화합니다.
ESC, 즉시 중지하고, 영상을 인코딩한 뒤 데이터셋을 업로드합니다.

## 수집 완료, 데이터셋 저장 디렉터리

```Shell
/Users/<사용자명>/.cache/huggingface/lerobot/<사용자명>/lerobot_my_dataset_a
```

## 악수

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<사용자명>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

수집이 완료되면, 악수 데이터셋은 다음 위치에 저장됩니다:

```Shell
/Users/<사용자명>/.cache/huggingface/lerobot/<사용자명>/lerobot_my_dataset_shake_hands
```

## 튜토리얼에서 사용하는 두 개의 데이터셋에 대하여

이 글에서는 두 가지 작업을 시연하며, 각각의 용도가 다릅니다:

- **오렌지 집기 `lerobot_my_dataset_a`**: 앞의 “카메라 1대” “카메라 2대” 두 수집 명령에 해당하며, [로컬 Ubuntu 학습](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu) 글에서 사용한 예시이기도 합니다
- **악수 `lerobot_my_dataset_shake_hands`**: 위의 “악수” 명령에 해당합니다. 7단계 학습부터 8단계 배포까지 튜토리얼은 통일하여 이를 예시로 사용하므로, 학습 명령의 `--dataset.repo_id`와 `--dataset.root`가 모두 이를 가리키는 것을 볼 수 있습니다

즉, **악수 이 데이터셋이 후반부 튜토리얼의 메인 예시**이므로, 이에 맞춰 수집하세요. 명령의 `--dataset.num_episodes=30`, `--dataset.episode_time_s=12` 같은 파라미터는 자신의 작업에 맞게 조정하면 됩니다.

## 수집 시 주의해야 할 몇 가지

- 리더 암이 화면에 나타나지 않도록 하세요. 그렇지 않으면 모델이 리더 암도 특징으로 학습하게 됩니다. 자세한 내용은 [데이터셋 수집 주의 사항](/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)을 참고하세요
- 매 라운드 수집이 끝나면 물체를 시작 위치로 되돌리고, 동작을 최대한 일관되게 유지하세요. 데이터셋의 일관성이 수량보다 중요합니다
- **수집과 추론 시의 카메라 파라미터(해상도, fps, 화면 비율)는 반드시 완전히 일치해야 합니다**. 해상도는 데이터셋의 메타데이터에 기록되며, 학습과 추론 시 검증을 거치므로 일치하지 않으면 바로 오류가 발생합니다. 오류가 나지 않더라도 해상도가 다르다는 것은 시야(화각 범위)가 다르다는 뜻이며, 모델이 보는 세계가 시연할 때와 맞지 않습니다. 본 튜토리얼은 통일하여 `1280×720@30`을 사용하며, 다른 값으로 바꾸려면 수집, 원격조작, 배포 세 곳의 명령을 함께 바꿔야 합니다
- 중간에 종료할 때 reset 단계에서 멈추지 마세요. 그렇지 않으면 이번 라운드는 프레임이 하나도 없어 저장에 실패합니다(이미 수집된 데이터에는 영향이 없습니다)
- 중간에 종료한 후 이어서 수집하려면 `--resume=true`를 사용하고, `--dataset.root`와 `--dataset.repo_id`가 처음과 완전히 동일해야 합니다

## 수집 완료 후

데이터는 기본적으로 `~/.cache/huggingface/lerobot/<사용자명>/` 아래에 저장됩니다. 다음으로:

1. 데이터셋을 클라우드에 백업하려면, [HuggingFace에 데이터셋 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)를 참고하세요
2. 학습을 시작할 준비가 되면, [7단계: 모델 학습](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)을 이어서 보세요. 그 글에서는 먼저 클라우드 GPU 플랫폼에 데이터를 올리고 환경을 설치하는 방법을 안내합니다

<RelatedProducts slugs="so-arm101" />
