---
title: USB 자동 초점 카메라
category: compute-vision
description: "USB 자동 초점 카메라: 86° 광각 1080P 30FPS, UVC 드라이버 불필요 플러그 앤 플레이, Windows·Linux·Jetson 지원 제품 페이지."
keywords: [usb 카메라, 자동 초점, 1080p, uvc, 드라이버 불필요, 로봇 비전, jetson, 라즈베리파이]
---

# USB 자동 초점 카메라

> **[타오바오에서 구매](https://item.taobao.com/item.htm?id=912105917442)**

## 제품 개요

USB 자동 초점 카메라는 플러그 앤 플레이 방식의 고화질 카메라 모듈로, 로봇 비전, AI 추론, 컴퓨터 비전 애플리케이션에 적합합니다. **86° 광각 시야**, 자동 초점, **1080P 30FPS** 영상 출력을 지원하며, UVC 표준 프로토콜을 채택해 드라이버 설치가 필요 없습니다.

**주요 특징**:

- USB 드라이버 불필요, UVC 표준 프로토콜 플러그 앤 플레이
- Windows / Linux / macOS / Jetson / Raspberry Pi 호환
- 86° 광각 렌즈로 더 넓은 시야 확보
- 자동 초점(AF), 수동 조정 불필요
- 1080P 30FPS 고화질 영상 스트림

---

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

---

## 빠른 시작

### 1. 기기 연결

카메라 USB 플러그를 기기의 USB 포트에 꽂기만 하면 됩니다. 추가 드라이버 설치가 필요 없습니다.

### 2. 장치 인식 확인

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

USB 카메라는 일반적으로 두 개의 `video` 장치(예: 새로 추가된 `/dev/video2`, `/dev/video3`)로 표시되며, 호출할 때는 숫자가 더 작은 장치를 선택하세요.

### 3. Python으로 화면 읽기

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## 전체 튜토리얼

- [USB 자동 초점 카메라 사용 튜토리얼 — 장치 인식, 여러 카메라 선택 및 Python 예제](/ko/tutorials/accessories/usb-auto-focus-camera)
- [Jetson 자동 초점 카메라 사용(video 장치 및 GUVCView)](/ko/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## 응용 시나리오

- 로봇 비전 및 원격 조작 영상 전송
- AI 추론 및 컴퓨터 비전 프로젝트
- Jetson / 라즈베리파이 다중 카메라 솔루션(CSI 카메라와 조합)
- 라이브 방송, 화면 녹화 및 영상 캡처

---

## 자주 묻는 질문

**Q: 카메라가 인식되지 않나요?**

**A:** USB 케이블이 단단히 연결되었는지 확인하세요. 다른 USB 포트를 시도해 보세요. `lsusb`로 USB 장치 목록을 확인합니다.

**Q: 화면이 흐릿한가요?**

**A:** 카메라는 자동 초점 기능이 있으며, 처음 연결 후 2~3초 뒤 자동으로 초점이 맞춰집니다. 여전히 흐리면 렌즈 표면이 깨끗한지 확인하세요.

**Q: 해상도를 어떻게 변경하나요?**

**A:** `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)`와 `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`를 사용합니다.

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
