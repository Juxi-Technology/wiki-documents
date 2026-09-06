---
title: 2자유도 카메라 짐벌
description: "Juxi Technology 2-DOF 카메라 짐벌: 컬러 추적, 얼굴 감지, 자동 추적 지원"
---

# 2자유도 카메라 짐벌

> **[스토어에서 구매](https://www.juxitech.com/ko/products/2-dof-servo-pan-tilt-unit)**


## 제품 개요

Juxi Technology의 2-DOF 카메라 짐벌은 오픈소스 2자유도 카메라 안정 플랫폼입니다. Python 제어, 컬러 추적, 얼굴 감지, 자동 목표 추적 지원. 로봇 비전, 감시, 자동화 응용에 적합합니다.

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

## 빠른 시작

### 하드웨어 연결

1. 서보를 직렬 버스 인터페이스에 연결합니다
2. USB-직렬 모듈을 컴퓨터/Jetson/Raspberry Pi에 연결합니다
3. 카메라를 짐벌 브래킷에 장착합니다
4. USB 카메라를 연결합니다

### 의존성 설치

```bash
pip install -r requirements.txt
# 또는 수동 설치
pip install opencv-python pyserial numpy
```

### 기본 제어 코드

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# 서보 컨트롤러 초기화
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
if servo.connect():
    print("✓ 직렬 연결 성공")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # 각도 설정 (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # 중앙으로 복귀
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### 컬러 추적 예제

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# 카메라와 짐벌 초기화
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 컬러 감지를 위해 HSV로 변환
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # 빨간색 범위
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # 가장 큰 외곽선 찾기
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # 픽셀 좌표를 서보 각도로 변환
        frame_h, frame_w = frame.shape[:2]
        yaw = int((center_x / frame_w - 0.5) * 180)
        pitch = int((0.5 - center_y / frame_h) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

gimbal.disable_all()
cap.release()
cv2.destroyAllWindows()
```

## 고급 기능

### 얼굴 감지 추적

저장소의 `src/detectors/face_detector.py`는 OpenCV DNN 기반 얼굴 감지기를 제공하며, 자동 얼굴 추적에 사용할 수 있습니다.

### 자동 추적

저장소의 `examples/auto_tracking_demo.py`는 대상 선택, PID 제어, 부드러운 추적을 포함한 완전한 자동 추적 워크플로를 구현합니다.

## FAQ

**Q: 직렬 연결 실패?**

**A:** 포트 번호 확인. Windows `COMx`, Linux `/dev/ttyUSBx`. `python examples/list_ports.py`를 실행해 사용 가능한 포트를 나열하세요.

**Q: 서보 반응 없음?**

**A:** 서보 전원 확인(SCS는 6-8.4V 외부 전원).

**Q: 추적 불안정?**

**A:** PID 조정 및 추적 빈도. 해상도 낮춰 실시간성 향상.

## 기술 지원

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)
- 💻 오픈소스 저장소: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
