---
title: "모델 가중치 파일 얻기"
description: "클라우드 GPU에서 학습을 마친 모델 가중치를 압축해 로컬로 내려받는 방법과 체크포인트가 저장되는 위치를 설명합니다."
---

# 모델 가중치 파일 얻기



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

20K step마다 모델 가중치 파일이 한 번 저장됩니다



`ckpt.zip` 압축 파일을 마우스 오른쪽 버튼으로 클릭해 다운로드하고, 로컬 컴퓨터에 압축을 풀어 주세요















## 악수

```Shell
# 지정한 학습 step에서 저장된 모델
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 최신 모델
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



