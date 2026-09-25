---
title: "학습 파라미터 제안"
description: "lerobot-train의 주요 파라미터 save_freq·batch_size·steps 조정 요령과 학습 시간과 결과 사이의 균형을 잡는 팁을 정리합니다."
---

# 학습 파라미터 제안



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

`save_freq` 파라미터를 적절히 작게 조정하면, 학습 후 더 이른 시점에 모델을 볼 수 있습니다



간단한 작업(집기, 악수, 놓기)의 경우 20K step 학습이면 충분합니다



