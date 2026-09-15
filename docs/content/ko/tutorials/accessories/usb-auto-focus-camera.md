---
title: USB 자동 초점 카메라
description: "JUXI USB 드라이버 불필요 86° 광각 자동 초점 1080P 카메라 사용 방법"
---

# USB 자동 초점 카메라

## 제품 개요

JUXI USB 자동 초점 카메라는 플러그 앤 플레이 방식의 고화질 카메라 모듈로, 로봇 비전, AI 추론, 컴퓨터 비전 용도에 적합합니다. 86° 광각 시야, 자동 초점, 1080P 30FPS 영상 출력을 지원합니다.

**특징**:
- USB 드라이버 불필요, Windows / Linux / macOS / Jetson / Raspberry Pi 호환
- 86° 광각 렌즈로 더 넓은 시야 확보
- 자동 초점(AF), 수동 조정 불필요
- 1080P 30FPS 고화질 영상 스트림
- UVC 표준 프로토콜, 플러그 앤 플레이

## 제품 사양

| 항목 | 사양 |
|------|------|
| 해상도 | 1920 × 1080 (1080P) |
| 프레임 레이트 | 30 FPS |
| 화각 | 86° 광각 |
| 초점 방식 | 자동 초점 (AF) |
| 인터페이스 | USB 2.0 |
| 프로토콜 | UVC (USB Video Class) |
| 지원 OS | Windows / Linux / macOS / Jetson / Raspberry Pi |

## 빠른 시작

### 기기 연결

카메라 USB 플러그를 기기의 USB 포트에 꽂기만 하면 됩니다. 추가 드라이버 설치가 필요 없습니다.

### 장치 인식 확인

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# Should see /dev/video0 or /dev/video1

# View detailed information
v4l2-ctl --list-devices
```

### Python 코드 예제

OpenCV 설치:

```bash
pip install opencv-python
```

기본 이미지 캡처:

```python
import cv2

# Open the camera
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Failed to open camera")
    exit()

print(f"Resolution: {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}×{cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

여러 카메라 선택:

```python
import cv2

def list_cameras(max_devices=5):
    available = []
    for i in range(max_devices):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            available.append(i)
            cap.release()
    return available

print(f"Available cameras: {list_cameras()}")

# Select a specific camera
camera_index = 1  # second camera
cap = cv2.VideoCapture(camera_index)
```

## Jetson에서 사용하기

```bash
# Check the camera
v4l2-ctl --list-devices

# Use a GStreamer pipeline for better performance
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## 자주 묻는 질문

**Q: 카메라가 인식되지 않나요?**

**A:** USB 케이블이 단단히 연결되었는지 확인하세요. 다른 USB 포트를 시도해 보세요. `lsusb`로 USB 장치 목록을 확인합니다.

**Q: 화면이 흐릿한가요?**

**A:** 카메라는 자동 초점 기능이 있으며, 처음 연결 후 2~3초 뒤 자동으로 초점이 맞춰집니다. 여전히 흐리면 렌즈 표면이 깨끗한지 확인하세요.

**Q: 해상도를 어떻게 변경하나요?**

**A:** `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)`와 `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`를 사용합니다.

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[문제 제보](https://github.com/Juxi-Technology/wiki-documents/issues)

<RelatedProducts slugs="usb-auto-focus-camera" />
