---
title: "MAX30102 심박·혈중 산소 센서 모듈 사용 튜토리얼"
description: "MAX30102 심박·혈중 산소 센서 모듈 완전 튜토리얼: 제품 자료, 웹 버전, Arduino, 라즈베리파이, PC 측 호스트 콘솔."
---

# MAX30102 심박·혈중 산소 센서 모듈 사용 튜토리얼

본 튜토리얼에서는 Juxi Technology의 MAX30102 심박·혈중 산소 센서 모듈 사용 방법을 소개합니다. 이 모듈은 Maxim의 MAX30102 전용 심박·혈중 산소 검출 칩을 탑재하고 자체 개발한 심박·혈중 산소 알고리즘을 내장하여 심박수, 혈중 산소 포화도, 기판 온도를 직접 출력할 수 있으며 I2C와 UART 두 가지 통신 방식을 지원합니다.

## 튜토리얼 목차

| 내용 | 설명 |
|---|---|
| [제품 자료](./product-info.md) | 제품 개요, 검출 원리, 기술 사양, 핀 정의, 대표적인 응용 시나리오 |
| [웹 버전 사용 튜토리얼](./web-console.md) | 브라우저 Web Serial로 직접 연결, 소프트웨어 설치 불필요 |
| [Arduino 사용 튜토리얼](./arduino.md) | 배선, 라이브러리 설치, 예제 코드, API 및 자주 묻는 질문 |
| [라즈베리파이 사용 튜토리얼](./raspberry-pi.md) | I2C / UART 배선, 환경 설정, 예제 코드 및 API |
| [PC 측 · Python 실행](./pc/python.md) | USB-TTL 변환 + Python 스크립트로 데이터 읽기 |
| [PC 측 호스트 콘솔](./pc/upper-computer.md) | GUI 호스트 콘솔: 시리얼 설정, 수집 및 실시간 모니터링 |

## 빠른 시작

1. 먼저 [제품 자료](./product-info.md)를 읽고 전원(3.3–5V)과 핀 정의를 확인하십시오.
2. 데이터를 빠르게 확인하려면: [웹 버전 사용 튜토리얼](./web-console.md)을 사용하여 Chrome / Edge로 웹 페이지를 열면 됩니다.
3. MCU에 연결: [Arduino 사용 튜토리얼](./arduino.md)을 참조하십시오.
4. 라즈베리파이에 연결: [라즈베리파이 사용 튜토리얼](./raspberry-pi.md)을 참조하십시오.
5. PC에 연결: [PC 측 · Python 실행](./pc/python.md) 또는 [PC 측 호스트 콘솔](./pc/upper-computer.md)을 참조하십시오.

> 본 제품은 소비자용 전자 검출 모듈이며 전문 의료기기가 아닙니다. 검출 데이터는 일상 건강 참고용으로만 사용하십시오.

<RelatedProducts slugs="heart-rate-spo2" />
