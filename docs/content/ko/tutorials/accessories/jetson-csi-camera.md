---
title: Jetson CSI 카메라
description: "NVIDIA Jetson Orin CSI 카메라 모듈 사용 방법"
---

# Jetson CSI 카메라

> **[스토어에서 구매](https://www.juxitech.com/ko/products/79-imx219-csi-camera)**


## 제품 개요

JUXI CSI 카메라 모듈은 NVIDIA Jetson Orin 개발자 키트용으로 설계되었으며, CSI(Camera Serial Interface)를 통해 저지연·고대역폭 영상 전송을 제공합니다. AI 비전 추론, 로봇 인지, 엣지 컴퓨팅 시나리오에 적합합니다.

**특징**:
- CSI-2 인터페이스, Jetson Orin 개발 보드에 직접 연결
- OpenCV / GStreamer 기반 즉시 사용 가능한 예제
- 저지연 영상 전송
- UVC 프로토콜 호환

## 제품 사양

| 항목 | 사양 |
|------|------|
| 인터페이스 | CSI-2 (MIPI) |
| 호환 플랫폼 | NVIDIA Jetson Orin 시리즈 |
| 영상 형식 | RAW / YUV |
| SDK 지원 | JetPack 5.0+ |
| 소프트웨어 프레임워크 | GStreamer / OpenCV |

## 빠른 시작

### 하드웨어 연결

1. Jetson Orin 전원 끄기
2. CSI 플랫 케이블 한쪽을 카메라 모듈에 연결
3. 케이블 반대쪽을 Jetson Orin 개발 보드의 CSI 커넥터에 삽입
4. 케이블 방향 확인(금속 접점이 보드 방향)

> ⚠️ **주의**: CSI 플랫 케이블은 반드시 전원을 끈 상태에서 연결하세요. 하드웨어가 손상될 수 있습니다.

### 장치 인식 확인

```bash
# Check CSI camera devices
ls /dev/video*

# View detailed info with v4l2
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Python 코드 예제

의존성 설치:

```bash
sudo apt install -y python3-opencv
```

GStreamer + OpenCV로 CSI 카메라 캡처:

```python
import cv2

# GStreamer pipeline for the CSI camera
def gstreamer_pipeline(
    sensor_id=0,
    capture_width=1920,
    capture_height=1080,
    display_width=960,
    display_height=540,
    framerate=30,
    flip_method=0,
):
    return (
        "nvarguscamerasrc sensor-id=%d ! "
        "video/x-raw(memory:NVMM), "
        "width=(int)%d, height=(int)%d, "
        "format=(string)NV12, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id,
            capture_width,
            capture_height,
            framerate,
            flip_method,
            display_width,
            display_height,
        )
    )

cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)

if not cap.isOpened():
    print("Failed to open CSI camera")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('CSI Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

기본 캡처(UVC 모드로 동작하는 경우):

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## 자주 묻는 질문

**Q: 카메라가 인식되지 않나요?**

먼저 플랫 케이블 연결과 방향을 확인하세요. `ls /dev/video*`로 디바이스 노드를 확인합니다. 그래도 인식되지 않으면 JetPack을 재설치해 보세요.

**Q: GStreamer 파이프라인 오류가 발생하나요?**

JetPack 버전이 5.0 이상인지 확인하세요. `apt list --installed | grep nvarguscamerasrc`로 관련 GStreamer 플러그인이 설치되었는지 확인합니다.

**Q: 카메라를 전환하려면?**

`sensor-id` 매개변수를 변경하세요: `sensor_id=0`은 첫 번째 카메라, `sensor_id=1`은 두 번째입니다.

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[문제 제보](https://github.com/Juxi-Technology/wiki-documents/issues)
