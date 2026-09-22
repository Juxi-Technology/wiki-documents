---
title: 중문/영문 인식어 펌웨어 다운로드 및 굽기
description: "중문·영문 인식어 펌웨어 다운로드 및 굽기 가이드: 출고 펌웨어 소개와 启英泰伦 음성 AI 플랫폼에서 펌웨어를 새로 제작하는 절차를 안내합니다."
---

# 중문/영문 인식어 펌웨어 다운로드 및 굽기

> **[스토어에서 구매](https://www.juxitech.com/ko/products/ai-voice-recognition-module)**


> 모듈은 출고 시 음성 인식 기능 펌웨어가 이미 구워져 있으며, 자료 첨부 파일에도 출고 펌웨어가 제공됩니다. 펌웨어를 다시 만들 필요가 있으면 아래 단계로 제작할 수 있습니다.
>

## [启英泰伦 음성 AI 플랫폼](https://aiplatform.chipintelli.com/home/index.html) 진입

#### 启英泰伦 공식 사이트 계정 등록

#### 상단 메뉴 "平台功能" 클릭, "产品固件及SDK深度开发" 선택

![상단 메뉴 "平台功能" 클릭, "产品固件及SDK深度开发" 선택 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### "离线语音识别大模型应用" 클릭

![상단 메뉴 "平台功能" 클릭, "产品固件及SDK深度开发" 선택 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### "语音识别固件及SDK开发" 클릭

!["语音识别固件及SDK开发" 클릭 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

---

#### 새 프로젝트 생성

!["语音识别固件及SDK开发" 클릭 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

#### 제품 정보 입력

1. **제품 이름:** 자신의 이름 규칙대로 하면 됩니다

2. **응용 방식:** "单麦语音识别" 선택

3. **제품 유형:** "通用-&gt;智能中控"

4. **칩 모델:** Cl1302

5. **sdk 이름:** Cl13XX_SDK_ASR_Offline

6. **sdk 버전:** 1.12.16

7. **설명:** 자신의 설명 규칙대로 하면 됩니다

![제품 정보 입력 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

---

#### 펌웨어 정보 선택

> 여기서 중국어 또는 영어를 선택할 수 있습니다
>

1. **버전 이름:** 자신의 버전 규칙대로 하면 됩니다

2. **언어 유형:** 자신의 필요에 따라 선택

3. **음향 유형 선택:**

    1. **중국어 선택:** VO0681_中文_ASR_通用_0.9M

    2. **영어 선택:** VO0916_英文_ASR_通用_1.1M

4. **모듈 보드 선택:** CI-D02GS02S

![제품 정보 입력 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

---

#### 펌웨어 구성

![펌웨어 구성 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

---

#### 웨이크워드 펌웨어 다운로드

1. 업로드 - 해당 언어의 웨이크워드 표 선택

2. "立即提交" 클릭

3. 몇 분 기다리면 펌웨어를 다운로드할 수 있습니다

4. 여기에 命令詞播報詞協議列表 2부가 제공됩니다. 필요에 따라 이 표를 기준으로 변경할 수 있습니다

    命令詞播報詞協議列表V3_中文模板.xlsx

    命令詞播報詞協議列表V3_英文模板.xlsx

![펌웨어 구성 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)

![펌웨어 구성 – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

---

## 음성 모듈 펌웨어 굽기

#### 음성 모듈 굽기 소프트웨어 압축 패키지 다운로드

음성 모듈 펌웨어 굽기 소프트웨어.7z

1. 압축 해제 후 소프트웨어 열기

> 펌웨어 "CI1302" 선택, "固件升级" 클릭
>

![음성 모듈 굽기 소프트웨어 압축 패키지 다운로드 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

2. 사운드 카드를 PC에 꽂고 장치 관리자 열기

![음성 모듈 굽기 소프트웨어 압축 패키지 다운로드 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

![음성 모듈 굽기 소프트웨어 압축 패키지 다운로드 – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

3. 펌웨어 굽기 소프트웨어 페이지로 이동

> 사운드 카드 버튼 위치
>
> ![음성 모듈 굽기 소프트웨어 압축 패키지 다운로드 – 4](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)
>

![음성 모듈 굽기 소프트웨어 압축 패키지 다운로드 – 5](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

#### 완료 후 왼쪽의 다른 튜토리얼로 이동할 수 있습니다

#### 여기에 준비된 펌웨어 자료가 있어 바로 굽기 가능합니다

CI1302_中文_单麦_V00681_UART0_115200_2M.bin

CI1302_英文_单麦_V00916_UART0_115200_2M.bin




## 주의사항

1. CH341 드라이버 설치 (관리자 권한으로 설치)

https://www.wch.cn/downloads/CH341SER_EXE.html

장치 관리자에서 알 수 없는 장치 usb single serial 또는 usb serial로 인식되면 먼저 마우스 오른쪽 클릭으로 제거한 후 드라이버를 설치하세요!
