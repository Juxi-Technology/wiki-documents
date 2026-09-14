---
title: "1장: 환경 구축"
description: "ESP32-NanoCam 튜토리얼 1장: CH340K 시리얼 드라이버를 설치하고, esptool-js 웹 플래싱, esptool 명령줄, ESP-IDF, ESP-EIM-GUI 네 가지 펌웨어 플래싱 환경 구축 방법을 익히며, xiaozhi.me 서버 계정 등록을 완료합니다."
---

# 1장: 환경 구축

> **[스토어에서 구매](https://www.juxitech.com/ko/products/esp32-s3-wifi-video-module)**

**이번 장의 목표**: 펌웨어 플래싱 환경과 서버 환경을 구축하여 이후 모든 실습 장을 준비합니다.

## 1.1 펌웨어 플래싱 환경

### 방법 A: 개발 환경 불필요(초보자 추천)

1. [CH340K 시리얼 드라이버](https://www.wch.cn/download/CH341SER_EXE.html) 설치

2. 브라우저 열기 → [esptool-js](https://espressif.github.io/esptool-js/)

3. NanoCam 연결, 시리얼 포트 선택, 펌웨어 .bin 파일 선택

4. Program 클릭하여 플래싱

### 방법 B: 명령줄

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM_x write_flash 0x0 nanocam_xxx.bin
```

### 방법 C: ESP-IDF 개발 환경(고급)

1. VSCode + ESP-IDF 플러그인 설치

2. F1 → `ESP-IDF: Configure ESP-IDF Extension`

3. ESP-IDF v5.4+ 선택 또는 설치

4. 컴파일: `idf.py build flash monitor`

### 방법 D: ESP-EIM-GUI 설치 방법

1. 공식 사이트에서 다운로드 [https://dl.espressif.cn/dl/eim/](https://dl.espressif.cn/dl/eim/)

2. 다운로드 후 더블클릭하여 EIM 페이지에 진입하면 오른쪽 상단에서 중국어 버전으로 전환할 수 있습니다

3. 설치 시작을 클릭

4. 다음 단계에서 사용자 정의 설치 선택

5. 사전에 `git`과 `python3.12.x`가 설치되어 있어야 합니다(git 중국 내 다운로드 소스: [CNPM Binaries Mirror](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.55.0.windows.3/))

6. 대상 기기를 esp32s3로 선택

7. ESP-IDF 버전 선택에서 "이전 안정 버전 표시"를 체크한 뒤 아래로 스크롤하여 v5.4.1 버전을 선택

8. 다운로드 미러 선택은 그대로 두고 다음 단계로

9. ESP-IDF 기능 선택은 모두 선택을 권장하며, 계속 다음 단계로

10. 도구 선택에서 다음 단계로 진행한 뒤 원하는 설치 위치를 선택하여 설치하고, 설치가 완료될 때까지 기다립니다
설치 완료 후 이 버전은 압축 해제 문제가 있을 수 있습니다. C:\Espressif\dist\xtensa-esp-elf-14.2.0_20241119-x86_64-w64-mingw32.zip 경로에서 압축 파일을 찾아 C:\Espressif\tools\xtensa-esp-elf로 복사하고, 압축을 푼 뒤 xtensa-esp-elf 폴더를 찾아 C:\Espressif\tools\xtensa-esp-elf\esp-14.2.0_20241119 디렉터리 아래의 폴더를 교체하면 컴파일에 성공합니다

## 1.2 서버 환경

### xiaozhi.me 공식 서비스(무료)

1. [xiaozhi.me](https://xiaozhi.me)에 접속하여 계정 등록

2. 콘솔에 진입

3. 모듈이 네트워크에 연결되면 6자리 숫자 인증 코드를 음성으로 알려줍니다

4. "에이전트" 영역 오른쪽의 기기 추가 클릭

5. 음성으로 알려준 6자리 숫자 인증 코드 입력

6. 기기 바인딩 후 대화를 시작할 수 있습니다

다음 장: [2장: 퀵 스타트](./Ch02-Quick-Start.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
