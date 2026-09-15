---
title: "FAQ"
description: "Juxi Technology 제품 FAQ — SO-ARM101 로봇 암과 IMU 센서, KWS 음성 인식 등 카테고리별 자주 묻는 질문 모음."
keywords: [faq, 문제해결]
---

# FAQ

제품 카테고리별 고빈도 질문을 모았습니다.

---

## 로봇 암 · SO-ARM101

**Q: 포트가 인식되지 않나요?**

**A:** `lerobot-find-port`로 포트를 확인. USB 연결 확인, Linux에선 `sudo chmod 666 /dev/ttyACM*` 실행.

**Q: `Could not connect on port "/dev/ttyACM0"` 오류?**

**A:** `/dev/ttyACM*` 존재 및 권한 확인 후 재시도.

**Q: 캘리브레이션 시 `Magnitude 30841 exceeds 2047`?**

**A:** 로봇 암 전원을 껐다 켠 후 다시 캘리브레이션하세요.

**Q: 서보 오류 `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** 해당 포트의 암에 전원이 공급되고 버스 서보가 올바르게 연결되었는지 확인하세요.

**Q: `Motor 'gripper' was not found`?**

**A:** 서보 통신 케이블과 공급 전압을 확인하세요.

**Q: PyTorch에서 GPU를 사용할 수 없나요?**

**A:** [Jetson Orin에서 PyTorch 비호환 문제](/ko/tutorials/learning-resources/jetson-orin-pytorch-compatibility)를 참고하세요.

---

## 센서 · IMU

**Q: IMU 데이터가 드리프트하나요?**

**A:** [캘리브레이션](/ko/tutorials/sensors/imu/calibration) 실행. 모듈 고정 확인. 온도 변화가 크면 온도 캘리브레이션을 추가하세요.

**Q: 자기 센서 값이 이상한가요?**

**A:** 자기 센서 캘리브레이션을 실행하세요 — 모터나 자석에서 떨어진 곳에서 모든 방향으로 천천히 회전시키며 진행합니다.

**Q: ROS 토픽에 데이터가 없나요?**

**A:** 시리얼 권한(`sudo chmod 666 /dev/ttyUSB*`)과 launch 파일의 포트 설정을 확인하세요.

---

## 액세서리 · KWS 음성 인식

**Q: 음성 모듈이 반응하지 않나요?**

**A:** 출하 펌웨어 플래시 확인. [펌웨어 다운로드](/ko/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words) 참조.

**Q: 시리얼 통신 데이터가 없나요?**

**A:** 보드레이트가 튜토리얼과 일치하는지, 배선(RX/TX 교차)이 올바른지 확인하세요.

---

## 액세서리 · 심박·혈중 산소 센서

**Q: 초기화 실패(init fail)?**

**A:** 배선 확인: I2C 주소 기본값 0x57, UART 보드레이트 9600.

**Q: 측정값이 불안정한가요?**

**A:** 센서와 피부의 밀착을 확보하고 손가락을 움직이지 마세요.

---

## 액세서리 · USB / CSI 카메라

**Q: 카메라가 인식되지 않나요?**

**A:** USB 케이블과 포트를 확인하고 `ls /dev/video*`, `v4l2-ctl --list-devices`를 실행하세요.

**Q: CSI 카메라가 인식되지 않나요?**

**A:** 리본 케이블 방향(금속 접점이 보드 쪽)을 확인하고 **전원을 끈 상태에서** 연결하세요. JetPack 5.0 이상인지도 확인하세요.

**Q: GStreamer 파이프라인 오류?**

**A:** JetPack 5.0 이상 확인, `apt list --installed | grep nvarguscamerasrc`로 확인하세요.

---

## 액세서리 · 기타

**Q: 4K HDMI 캡처가 검은 화면인가요?**

**A:** HDMI 인터페이스 종류(HDMI/Micro HDMI/DP 어댑터)를 확인하고 올바른 변환 케이블을 사용하세요.

**Q: OLED 화면이 켜지지 않나요?**

**A:** I2C 배선(SCL/SDA) 확인. 핀 쇼트는 호스트 보드를 손상시킬 수 있습니다.

**Q: USB 사운드 카드가 인식되지 않나요?**

**A:** 플러그 앤 플레이 장치입니다. USB 전원을 확인하고 기본 오디오 출력 장치를 전환하세요.

**Q: 2자유도 짐벌 서보가 반응하지 않나요?**

**A:** 서보 전원을 확인하세요(SCS 서보는 외부 6-8.4V 필요).

---

## 일반

**Q: 튜토리얼의 페이수 링크가 열리지 않나요?**

**A:** 페이수 문서는 내부/협업자 전용입니다. 본 Wiki를 이용하거나 support@juxitech.com으로 문의하세요.

**Q: 지원 플랫폼은 무엇인가요?**

**A:** PC(Linux/Windows), Jetson, Raspberry Pi — 각 튜토리얼의 "시스템 요구 사항"을 참조하세요.

**Q: 지원을 받으려면?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## 관련 링크

- [로봇 암 선택 가이드](/ko/tutorials/robot-arms/select-guide)
- [다운로드 센터](/ko/downloads/)
- [사용자 성공 사례](/ko/cases/)
