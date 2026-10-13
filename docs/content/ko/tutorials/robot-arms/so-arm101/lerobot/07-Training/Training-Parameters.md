---
title: "7단계: 학습 파라미터 권장 사항"
description: "lerobot-train 파라미터 실전 팁: save_freq를 줄이면 중간 모델을 더 일찍 얻을 수 있고, 집기·악수·놓기 같은 단순 작업은 2만 스텝이면 충분합니다."
---

# 7단계: 학습 파라미터 권장 사항

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

`save_freq` 파라미터를 조금 낮추면 학습 후 모델이 더 일찍 나타납니다

단순한 작업(집기, 악수, 놓기)에는 20K step의 학습이면 충분합니다

<RelatedProducts slugs="so-arm101" />
