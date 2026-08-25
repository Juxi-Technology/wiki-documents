---
title: 자주 묻는 질문 (FAQ)
description: Juxi Technology 제품 FAQ — 로봇 암, 센서, 액세서리
keywords: [faq, 문제해결]
---

# 자주 묻는 질문 (FAQ)

제품 카테고리별 고빈도 질문을 모았습니다.

## 로봇 암 · SO-ARM101

**Q: 포트가 인식되지 않나요?**
`lerobot-find-port`로 포트를 확인. USB 연결 확인, Linux에선 `sudo chmod 666 /dev/ttyACM*` 실행.

**Q: `Could not connect on port "/dev/ttyACM0"` 오류?**
`/dev/ttyACM*` 존재 및 권한 확인 후 재시도.

## 센서 · IMU

**Q: IMU 데이터가 드리프트하나요?**
[캘리브레이션](/ko/tutorials/sensors/imu/calibration) 실행. 모듈 고정 확인.

## 액세서리 · KWS

**Q: 음성 모듈이 반응하지 않나요?**
출하 펌웨어 플래시 확인. [펌웨어 다운로드](/ko/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words) 참조.

## 일반

**Q: 지원을 받으려면?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)