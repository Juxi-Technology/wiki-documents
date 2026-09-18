---
title: "8단계: 자주 발생하는 Bug 및 해결"
description: "모델 배포 중 만날 수 있는 카메라 획득 실패와 연결 끊김, 서보모터 통신 오류의 원인과 해결 방법을 정리한 페이지입니다."
---

# 8단계: 자주 발생하는 Bug 및 해결

## 카메라 획득 실패

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

손목 카메라의 배선이 헐거운지 확인해 보세요. 특히 카메라에 가까운 쪽의 배선은 접촉 불량이 매우 잘 생깁니다

## 카메라 연결 끊김

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

커맨드라인을 다시 시작해 보세요

## 서보모터 통신 문제 1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

해결 방법: `lerobot/src/lerobot/motors/motors_bus.py` 코드 안의 모든 `num_retry`를 99로 바꿉니다. 특히 오류가 난 줄에 해당하는 것을 바꿉니다

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## 서보모터 통신 문제 2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

해결 방법: 로봇팔을 다시 캘리브레이션합니다

<RelatedProducts slugs="so-arm101" />
