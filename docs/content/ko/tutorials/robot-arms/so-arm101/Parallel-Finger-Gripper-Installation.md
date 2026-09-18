---
title: "평행 핑거 그리퍼 설치 튜토리얼"
description: "Onshape 모델과 설치 영상, Feetech 디버깅 도구를 사용해 SO-ARM101에 평행 핑거 그리퍼를 조립하고 캘리브레이션하는 절차를 설명합니다."
---

# 평행 핑거 그리퍼 설치 튜토리얼

[Onshape](https://cad.onshape.com/documents/96518c699fd03eea508b06d3/w/d5f95a6266b027d84ae48634/e/317bed52afdde5ea3dcfc236)에서 모델 파일 확인

[PincOpen 어셈블리.step](/downloads/PincOpen装配体.step)

**평행 핑거 그리퍼 설치 단계.mp4**（平行指夹爪安装步骤.mp4, 사이트 단일 파일 용량 한도를 초과하여 support@juxitech.com 으로 요청해 주세요）

![8.png](../../../../../public/images/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation/1.jpg)

## 1. 나사 4개를 풀고 후면 커버를 분리합니다

## 2. 나사 5개를 사용해 6번 서보모터를 커플링에 장착합니다

## 3. Feetech 상위 제어 프로그램을 사용해 중립 위치 캘리브레이션을 클릭합니다(그리퍼를 닫은 상태 유지!)

**Feetech 서보모터 디버깅 도구 다운로드**

- Windows 컴퓨터

https://gitee.com/ftservo/fddebug

[`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z)를 다운로드하고, 압축을 푼 뒤 그 안의 exe 프로그램을 실행합니다

- Ubuntu 컴퓨터

https://github.com/Kotakku/FT_SCServo_Debug_Qt

1. Feetech 상위 제어 디버깅 도구를 열고, COM 포트 번호를 선택하며, 보드레이트는 100만이고, “열기”를 클릭합니다

2. “검색”을 클릭하고, “STS3215”가 나타나면 “정지”를 클릭한 뒤 “STS3215”를 클릭합니다

3. 상단의 “프로그래밍”을 선택합니다

4. “중립 위치 캘리브레이션”을 클릭합니다

## 4. 원통을 정렬하고 후면 커버를 장착합니다

## 5. 나사 4개를 다시 조입니다

## 6. 나사 4개로 서보모터 고정 브래킷을 설치합니다

## 7. 나사 6개로 카메라 브래킷을 장착할 수 있는 서보모터 고정 브래킷을 설치합니다

## 8. 와셔 나사 4개로 카메라를 브래킷에 장착합니다

## 9. 나사 2개로 카메라 브래킷을 서보모터 고정 브래킷에 연결합니다

## 10. 어댑터를 5번 서보모터의 서보 혼에 장착합니다

## 11. 어댑터를 평행 핑거 그리퍼에 연결합니다

<RelatedProducts slugs="so-arm101" />
