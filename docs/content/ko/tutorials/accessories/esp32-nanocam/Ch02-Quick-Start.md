---
title: "2장: 빠른 시작"
description: "NanoCam 튜토리얼 2장: 펌웨어 플래싱과 WiFi 연결 설정을 마친 뒤 브라우저에서 첫 실시간 화면과 HTTP 엔드포인트를 확인합니다."
---

# 2장: 빠른 시작

> **[스토어에서 구매](https://www.juxitech.com/ko/products/esp32-s3-wifi-video-module)**

**이번 장의 목표**: 펌웨어를 플래싱하고 WiFi 연결 설정을 완료한 뒤, 브라우저에서 NanoCam의 첫 실시간 화면을 확인합니다.

## 2.1 펌웨어 플래싱

### 단계

1. 압축 폴더 해제 → `nanocam_xxx.bin`
2. [esptool-js](https://espressif.github.io/esptool-js/) 열기
3. Type-C로 NanoCam 연결
4. Connect 클릭 → 시리얼 포트 선택
5. 펌웨어 파일 선택, 주소에 `0x0` 입력
6. START 클릭 → 완료 대기

### 검증

시리얼 도구(115200 8N1)로 NanoCam에 연결하면 다음이 표시되어야 합니다:

```Plain
NanoCam Board Ver:0.3.0
```

---

## 2.2 WiFi 연결 설정

> 산출물: **NanoCam이 WiFi에 연결되어 IP 획득**

### 방법 A: 시리얼 연결 설정(가장 일반적)

```Plain
sta_ssid:WiFi이름
sta_pd:WiFi비밀번호
```

`OK` 수신 → 설정 성공. 비밀번호 수정 후 자동으로 재부팅됩니다.

> 전체 시리얼 명령은 [시리얼 프로토콜 매뉴얼](./ESP32-NanoCam-Serial-Protocol.md)을 참조하세요.

### 방법 B: AP 핫스팟 직접 연결

NanoCam 자체 핫스팟: `NanoCam-AP`, 비밀번호 `12345678`
스마트폰으로 연결한 뒤 브라우저에서 `http://192.168.4.1`

### 검증

```Plain
sta_ip
```

반환: `sta_ip:192.168.x.x` ✅

---

## 2.3 첫 화면

> 산출물: **브라우저에서 NanoCam 실시간 화면 확인**
1. 브라우저에 `http://<IP주소>` 입력
2. 실시간 MJPEG 화면 확인
3. 시리얼로 `ai_mode:1` 전송 → 고양이 얼굴 검출로 전환 → 화면에 검출 상자 표시

### 엔드포인트 설명

|URL|용도|
|---|---|
|`http://<IP>/`|실시간 화면(HTML)|
|`http://<IP>/stream`|순수 MJPEG 스트림(OpenCV/VLC에서 읽기 가능)|
|`http://<IP>/status`|기기 상태 JSON|
|`http://<IP>/admin`|웹 관리자 페이지|

다음 장: [3장: 카메라 기초](./Ch03-Camera-Basics.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
