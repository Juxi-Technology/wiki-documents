---
title: 2자유도 카메라 짐벌
description: "Juxi Technology 2-DOF 카메라 짐벌: 컬러 추적, 얼굴 감지, 자동 추적 지원"
---

# 2자유도 카메라 짐벌

> **[스토어에서 구매](https://www.juxitech.com/ko/products/2-dof-servo-pan-tilt-unit)**


## 제품 개요

Juxi Technology의 2-DOF 카메라 짐벌은 오픈소스 2자유도 카메라 안정 플랫폼입니다. Python 제어, 컬러 추적, 얼굴 감지, 자동 목표 추적 지원.

**특징**
- 2자유도(Pitch/Yaw) 서보 제어
- 컬러 추적, 얼굴 감지, QR코드 감지
- 순수 Python 구현, 2차 개발 용이
- USB 카메라 및 직렬 서보 지원
- 오픈소스: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## 제품 사양

| 파라미터 | 사양 |
|---------|------|
| 자유도 | 2축(Pitch + Yaw) |
| 서보 | 직렬 버스 서보(SCS) |
| 제어 IF | USB 직렬 |
| 카메라 | USB UVC |
| 추적 | 컬러/얼굴/QR코드 |
| 언어 | Python 3 |

## 기본 제어

```python
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)   # yaw
time.sleep(1)
gimbal.set_angle(1, -20)  # pitch
```

## 컬러 추적 예제

```python
import cv2, sys
sys.path.append('../src')
from sc_servo import SCServo, Gimbal

cap = cv2.VideoCapture(0)
servo = SCServo("COM3"); servo.connect()
gimbal = Gimbal(servo); gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret: break
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (0,100,100), (10,255,255))
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x,y,w,h = cv2.boundingRect(largest)
        cx, cy = x+w//2, y+h//2
        fh, fw = frame.shape[:2]
        yaw = int((cx/fw - 0.5) * 180)
        pitch = int((0.5 - cy/fh) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))
    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
```

## FAQ

**Q: 직렬 연결 실패?**

포트 번호 확인. Windows `COMx`, Linux `/dev/ttyUSBx`.

**Q: 서보 반응 없음?**

서보 전원 확인(SCS는 6-8.4V 외부 전원).

**Q: 추적 불안정?**

PID 조정 및 추적 빈도. 해상도 낮춰 실시간성 향상.

## 기술 지원

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)