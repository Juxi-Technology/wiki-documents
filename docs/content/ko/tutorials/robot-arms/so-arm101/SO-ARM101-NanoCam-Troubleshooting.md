---
title: SO-ARM101 무선 텔레오퍼레이션 문제 해결 가이드(NanoCam 버전)
description: "SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)의 흔한 고장을 정리했습니다: 플래싱과 시리얼, 카메라, 오디오, 네트워크와 micro-ROS 문제의 증상, 원인과 해결 방법."
---

# SO-ARM101 무선 텔레오퍼레이션 문제 해결 가이드(NanoCam 버전)

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

본 페이지는 ESP32-NanoCam 버전 SO-ARM101 무선 텔레오퍼레이션의 흔한 고장 문제 해결을 정리한 것입니다. 전체 조작 흐름은 [SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)](./SO-ARM101-NanoCam-Wireless-Teleop.md)을 참조하세요.

## 일반 문제 해결 빠른 참조

| 증상 | 점검 |
|---|---|
| 플래싱 연결 안 됨 | 수동으로 다운로드 모드 진입(BOOT+리셋); `platformio.ini`에 `upload_port` 추가 |
| 플래싱 후 시리얼 출력 없음 | USB 케이블과 CH340 드라이버 확인; Windows는 장치 관리자에서 COM 포트 확인 |
| `Waiting for micro-ROS Agent...`에서 멈춤 | AGENT_IP / UDP 8888 / 클라이언트 격리 확인 |
| 서보 버스 무응답(`servo_mask≠0x3f`) | 서보 드라이버 보드 UART로 P2-7/P2-8에 연결되었는지 확인; 팔로워 암 12V 5A 외부 전원 |
| 마이크 레벨이 계속 0 | `audio: ES8311 ready` 로그 확인; I2C 41/42 풀업; 마이크에 바람을 불어 검증 |
| 스피커 무음 | 스피커 연결 확인; ES8311 음량 레지스터 `R_DAC32`(현재 펌웨어에서 최대 0xFF로 설정됨) |
| WiFi가 자주 끊김 | 안테나, 거리 확인; RGB가 빨강이면 WiFi 끊김이며 10s 후 자동 재시작 |

## 플래싱과 시리얼 문제

- **플래싱 연결 안 됨**: BOOT 키(GPIO0)를 누른 상태에서 USB를 꽂고(또는 리셋 누름) → BOOT를 놓은 뒤, 즉시 upload를 다시 실행하세요. Windows에서 시리얼 포트가 자동 인식되지 않으면 `platformio.ini`의 `[env:nano_cam]`에 `upload_port = COM3` 한 줄을 추가하세요(장치 관리자에서 CH340의 실제 COM 번호로 교체).
- **플래싱 후 시리얼 출력 없음**: NanoCam의 USB는 CH340K → UART0이며, Linux에서 장치 이름은 `/dev/ttyUSB0`입니다; 꽂았는데 인식되지 않으면 USB 케이블과 CH340 드라이버(커널 내장)를 확인하세요.
- **서보 버스 무응답(`servo_mask≠0x3f`)**: 서보 버스가 서보 드라이버 보드 UART를 통해 **P2-7/P2-8**(GPIO19/20)에 연결되어 있는지, UART0의 43/44가 아닌지 확인하세요; 팔로워 암은 반드시 12V 5A 외부 전원을 사용해야 합니다(USB로는 서보 6개를 구동할 수 없음).
- **서보 버스와 디버그 시리얼 혼동**: 디버그 시리얼은 USB-C(CH340K → UART0)이며 서보 버스와 완전히 독립적이라 동시에 사용할 수 있습니다.

## 컴파일과 툴체인 문제

- **최초 `pio run` 다운로드가 느리거나 멈춤**(최초 실행 시 espressif32 플랫폼, `toolchain-xtensa-esp32s3` 툴체인 약 100 MB, Arduino 프레임워크 약 200 MB를 순서대로 다운로드): PlatformIO의 남은 시간 추정은 부정확하여 한동안 멈춘 듯하다가 갑자기 완료되는 경우가 많으니 5분 동안 퍼센트가 진행되는지 관찰하세요; 프록시/VPN을 켤 수 있습니다(시스템 프록시 경유);
- **툴체인 수동 다운로드**: 브라우저에서 `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip`(Linux는 `-linux-amd64.tar.gz`)을 다운로드하고, 압축 해제 후 디렉터리 이름을 `toolchain-xtensa-esp32s3`로 바꿔 `C:\Users\<사용자 이름>\.platformio\packages\`에 넣은 뒤 `pio run`을 다시 실행하세요; 중간에 Ctrl+C로 중단해도 환경이 손상되지 않으며, 재실행하면 이어받습니다;
- **Windows에서 Git Bash 안에서 `pio` 명령을 찾을 수 없음**: PowerShell/CMD 터미널로 바꾸거나 `C:\Users\<사용자 이름>\.platformio\penv\Scripts`를 PATH에 추가하세요.

## 카메라 전용 문제 해결

| 증상 | 근본 원인 | 해결 |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **I2C 충돌**: ES8311이 `Wire1`로 GPIO41/42를 점유하고, 카메라 SCCB가 I2C 드라이버를 다시 설치하려다 거부됨 | `audio_es8311.cpp`의 `init()` 끝에 `Wire1.end()`를 추가해 I2C를 카메라에 양보 |
| `JPEG format is not supported on this sensor`(0x106) | **GC2145에는 하드웨어 JPEG 인코더가 없음**(OV2640/OV5640에만 있음) | 캡처를 `PIXFORMAT_RGB565`로 변경, `/stream`과 `/jpg`는 `frame2jpg`로 소프트웨어 인코딩하여 JPEG 생성 |
| `/jpg`, `/stream` 무응답, 브라우저가 계속 로딩 | **httpd 스택 오버플로**: 기본 스택 8KB로는 `frame2jpg` 소프트웨어 인코딩을 수용할 수 없음 | `start_server()`에서 `config.stack_size = 16384` |
| `/stream`이 열리지만 화면이 검정 | **multipart 경계 누락**: 프레임 사이에 `STREAM_BOUNDARY`를 보내지 않아 브라우저가 파싱할 수 없음 | 매 프레임 전송 전에 `STREAM_BOUNDARY`를 보충 전송 |
| curl로 `/jpg` 테스트 시 `HTTP:000` 반환, 하지만 브라우저에서는 이미지가 나옴 | esp_http_server **단일 태스크**: `/stream`이 httpd 태스크를 점유하면 `/jpg`가 순서를 잡지 못함; 또는 curl 타임아웃이 너무 짧음 | `/stream`을 끄고 `/jpg`만 따로 테스트; curl 대신 브라우저로 검증 |
| 카메라 초기화는 성공했지만 완전 검정/프레임 없음 | 대부분 **하드웨어** 문제: AVDD/DOVDD 전원, PWDN 레벨, 케이블 접촉 | 먼저 브라우저 `/jpg`로 스냅샷 테스트(이미지가 나오면 링크 정상); 카메라 2.8V 전원과 케이블 확인 |
| VGA 화면 하단 약 2/3 깨짐 | **DVP 데이터 레이트 과다**: VGA RGB565가 이 보드 DVP 샘플링 타이밍 여유를 초과(24/20/16MHz × 단일/더블 버퍼 모두 재현); QVGA는 정상 | 정식 구성은 **QVGA 320×240**(FPV에 충분) 사용, 또는 더 안정적인 XCLK로 변경/DVP 하드웨어 배선 수정 |

> 비고: 표의 처음 네 항목은 모두 동봉 펌웨어에서 이미 수정되었으므로, 최신 펌웨어를 플래싱하면 되고 코드를 수동으로 고칠 필요가 없습니다.

**주의**: esp_http_server는 단일 태스크이므로 `/stream`과 `/jpg`를 동시에 접근할 수 없습니다——`/stream`이 켜져 있으면 `/jpg`가 계속 멈춥니다. 단일 프레임을 캡처하기 전에 스트림 페이지를 먼저 닫으세요.

## 오디오 전용 문제 해결

| 증상 | 근본 원인 | 해결 |
|---|---|---|
| 스피커 **완전 무음** + 마이크 레벨 ≈ 0(예: `0.0009`) | **MCLK 미출력**: legacy I2S 드라이버가 ESP32-S3에서 MCLK를 생성하지 않아 ES8311 내부 DAC/ADC에 클럭이 없음 | **LEDC로 GPIO39에서 6.15MHz MCLK 생성**(`audio_es8311.cpp`의 `start_ledc_mclk()`) |
| 알림음이 **너무 작음**(귀를 대야 들림) | 디지털 진폭이 낮고 ES8311 메인 음량이 작음 | `play_tone` 진폭 12000→30000, `R_DAC32` 0x30→0xFF(약 +29dB) |
| 전원 투입 시 시작 "삐삐"만 있고 다른 알림음 없음 | **정상 현상**: 준비/잠금 해제 알림음은 이벤트 구동이라 텔레오퍼레이션을 실행해야 트리거됨 | 시작음=전원 투입 즉시 재생; 준비음=Agent 통신 수립; 잠금 해제음=제어 명령 수신 |

> 비고: 앞의 두 항목은 동봉 펌웨어에서 이미 수정되었고, 세 번째 항목은 정상 현상이므로 처리할 필요가 없습니다.

## 마이크, 스피커와 RGB 하드웨어 점검

- **마이크 레벨이 계속 0**: `audio: ES8311 ready` 로그 확인; MCLK 출력 여부 확인(GPIO39에 ~1.65V가 있어야 함, LEDC 생성); I2C 버스 41/42 풀업(보드에 10K 있음); 마이크에 바람을 불어 `/follower_audio/level`이 요동치는지 확인.
- **스피커 무음**: NS4150B 스피커가 스피커 커넥터에 연결되어 있는지 확인; GPIO39 MCLK 출력 확인(LEDC, `start_ledc_mclk()`); 음량 레지스터 `R_DAC32`(현재 0xFF); ES8311이 초기화되지 않으면 로그에 실패 원인이 출력됨.
- **RGB 등이 켜지지 않음**: WS2812 데이터 핀은 GPIO18이며, 펌웨어 시작 로그에서 `camera_stream` 이전에 RMT 초기화 오류가 나타나는지 확인하세요(일반적으로 없음).

## 네트워크와 micro-ROS 문제

- **`Waiting for micro-ROS Agent...`에서 멈춤**: `AGENT_IP`가 Ubuntu 컴퓨터 LAN IP로 입력되었는지, UDP 8888이 허용되었는지, 공유기/핫스팟의 클라이언트 격리가 켜져 있는지(꺼야 함)를 차례로 확인하세요. NanoCam의 안테나는 모듈 위의 U.FL 안테나이므로 RSSI가 나쁘면 먼저 안테나와 배치를 확인하고, 5/10/20/30 미터 거리 실측을 권장합니다.
- **WiFi가 자주 끊김**: 안테나와 거리를 확인하세요; RGB가 빨강이면 WiFi 끊김이며, 펌웨어는 10s 타임아웃 후 자동 재시작합니다.
- **연결이 안 될 때 먼저 환경 확인**: NanoCam과 Ubuntu 컴퓨터는 반드시 같은 2.4GHz LAN(휴대폰 핫스팟 가능)이어야 합니다; 네트워크를 바꿨다면 `AGENT_IP`와 WiFi 구성도 함께 갱신하는 것을 잊지 마세요(무선 텔레오퍼레이션 튜토리얼의 "WiFi 구성" 절 참조).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
