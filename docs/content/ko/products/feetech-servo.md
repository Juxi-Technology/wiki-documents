---
title: Feetech 버스 서보(SCS0009 / STS3215)
category: accessory
description: "Feetech 직렬 버스 서보 SCS0009·STS3215: SCS 프로토콜, 자기 엔코더·전위차계 버전, 메모리 테이블과 FD 디버깅 자료 제공."
keywords: [feetech, 서보, scs, sts, 직렬 버스]
---

# Feetech 버스 서보(SCS0009 / STS3215)

> **[스토어에서 구매](https://www.juxitech.com/ko/products/feetech-scs0009-serial-bus-servo)**

## 제품 개요

Feetech(피트크)직렬 버스 서보는 SO-ARM101 등 로봇 팔의 구동 코어입니다. **SCS 통신 프로토콜**을 지원하며 단일 버스에 다중 서보를 연결합니다. 자기 엔코더(STS)와 전위차계(SCSCL) 두 버전을 제공하며, Windows 상위 프로그램 FD 소프트웨어로 디버깅합니다.

**주요 특징**:

- 직렬 버스 통신, 단일 버스 다중 서보
- 자기 엔코더(STS)/ 전위차계(SCSCL) 두 버전
- 위치/속도/토크 실시간 피드백
- 메모리 테이블 분석 문서 완비
- 이중 통신 방식: TTL(고속)/ RS485(강한 노이즈 내성)
- 단일 버스 최대 254개 서보(ID 0-253, 브로드캐스트 ID 254)
- 기본 1M 보레이트, 8데이터 비트, 1스톱 비트
- 과열/과전압/과전류/과부하 다중 보호
- FD 상위 프로그램 디버깅(Windows)

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 프로토콜 | SCS 직렬 버스 |
| 버전 | STS3215(자기 엔코더)/ SCS0009(전위차계) |
| 디버깅 | FD 상위 프로그램(Windows) |
| 보레이트 | 1,000,000(상위 프로그램 기본) |

## 빠른 시작

```bash
# 上位机调试(Windows):下载 feetechrc.com/software.html
# 选择端口,波特率 1000000,点击搜索
```
## 관련 튜토리얼

- [Feetech STS3215 & SCS0009 디버깅 튜토리얼](/ko/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [SCS 통신 프로토콜](/ko/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [자기 엔코더 STS 서보 메모리 테이블 분석](/ko/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [전위차계 SCSCL 서보 메모리 테이블 분석](/ko/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
