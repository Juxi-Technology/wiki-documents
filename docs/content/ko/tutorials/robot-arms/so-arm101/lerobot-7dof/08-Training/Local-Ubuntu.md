---
title: "로컬 Ubuntu 학습"
description: "NVIDIA 그래픽 카드가 있는 로컬 Ubuntu 컴퓨터에서 클라우드 GPU 없이 6단계 데이터셋으로 모델 학습을 실행하는 방법을 안내합니다."
---

# 로컬 Ubuntu 학습

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- 주의

`\` 앞에는 공백이 하나만 있어야 하고, 뒤에는 공백이 없어야 합니다

`--dataset.split`의 기본값은 `train`이며, 즉 전체 데이터를 학습 세트로 사용합니다

데이터셋이 로컬에 있을 때는 `--dataset.streaming`이 반드시 `false`여야 합니다. 데이터셋이 이미 로컬에 있어 스트리밍 읽기가 필요 없기 때문입니다

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
  --dataset.root=/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)



