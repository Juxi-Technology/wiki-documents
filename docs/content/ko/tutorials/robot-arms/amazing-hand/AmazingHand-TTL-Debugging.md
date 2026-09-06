---
title: 로봇핸드(TTL 직렬 서보) 디버깅 튜토리얼
description: "먼저 「灵巧手调试.zip」 압축 패키지를 다운로드하고, 압축 해제 후 「使用arduio程序调试灵巧手过程(TTL舵机)」 문서로 서보 ID 설정, 캘리브레이션, 중앙 교정, 데모 프로그램 실행을 하거나, 공식 오픈소스 코드를 참조하세요."
---

# 로봇핸드(TTL 직렬 서보) 디버깅 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/amazinghand)**


먼저 「[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)」 압축 패키지를 다운로드하고, 압축 해제 후 「使用arduio程序调试灵巧手过程(TTL舵机)」 문서로 서보 ID 설정, 캘리브레이션, 중앙 교정, 데모 프로그램 실행을 하거나, [공식 오픈소스 코드](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)를 참조하세요.

**완성품을 분해하지 않을 경우**(출고 시 서보 ID 설정·캘리브레이션·중앙 교정 완료) 바로 **[6번 항목 「02 演示程序」 실행](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** 과 7번 항목 **[손 추적](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)** 으로 이동할 수 있습니다.

![이미지 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. 로봇핸드 디버깅 배선 방법

하나는 PC에서 python 등 상위 프로그램 소프트웨어(Feetech 서보 상위 프로그램 또는 python 코드)를 실행하는 방법
다른 하나는 MEGA328P 등 마이크로컨트롤러 또는 직접 구매한 개발 보드나 주 컨트롤러를 사용하는 방법

배선 방법은 다음과 같습니다:
(1) python 방식 디버깅 시 배선(서보 드라이버 보드만 연결):

![1. 로봇핸드 디버깅 배선 방법 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) MEGA328P 개발 보드 디버깅 시 배선(서보 드라이버 보드+328P 개발 보드):

**MEGA328P 개발 보드의 핀 위치를 잘 확인하세요!**

![1. 로봇핸드 디버깅 배선 방법 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. 로봇핸드 디버깅 배선 방법 – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. 로봇핸드 디버깅 배선 방법 – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. 로봇핸드 디버깅 배선 방법 – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

아래는 마이크로컨트롤러를 사용한 디버깅 과정입니다. 마이크로컨트롤러는 데모 프로그램을 반복 실행하므로, 데이터 케이블을 분리하면 바로 멈춥니다.

## 2. 서보 ID 설정

로봇핸드 한 개에 8개의 서보를 사용합니다. 오른손 ID는 1~8, 왼손 ID는 11~18로 설정합니다

중앙 교정 완성품 기본값 오른손 [451,571,451,571,451,571,451,571] 왼손 [571,451,571,451,571,451,571,451]

1. 배선: **개별** 서보, 서보 드라이버 보드를 순서대로 연결합니다.

![2. 서보 ID 설정 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. 서보 제조사 제공 상위 프로그램 FD1.9.8.2로 설정합니다
[FD.rar]

![2. 서보 ID 설정 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. 서보 ID 설정 – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. 서보 ID 설정 – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3.**서보 혼 고정**

1. 코드 「安装白色伺服喇叭时使用」를 개발 보드에 업로드합니다

이 프로그램의 역할: 서보 기어 위치를 대략 중앙으로 만들고, 이후의 동작 각도는 이 중앙 위치를 기준으로 합니다.

(1) arduino 소프트웨어를 직접 설치하고, OS에 따라 [설치 튜토리얼](https://blog.csdn.net/weixin_35509395/article/details/156188274)을 참조. arduino 프로그램을 컴파일·다운로드하기 전에 라이브러리 관리자에서 FTServo 라이브러리, SCServo 라이브러리를 설치하세요

![3. 서보 혼 고정 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) 개발 보드 종류: 「Arduino Nano」 선택

![3. 서보 혼 고정 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. 서보 1, 2 디버깅
(1) 편집: 디버깅할 서보 ID에 따라 아래를 수정. 예: 검지를 디버깅하면 ID 값을 1, 2로 설정

![3. 서보 혼 고정 – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) 프로그램을 개발 보드에 업로드
(3) 배선: 개발 보드를 서보 드라이버 보드, **1, 2**번 서보와 연결하면 서보 기어가 일정 각도 회전 후 멈추는 소리가 들립니다.

![3. 서보 혼 고정 – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) 서보 혼을 기어에 설치, 위치는 최대한 평행하게

![3. 서보 혼 고정 – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. 서보 3, 4 디버깅
(1) **328P 개발 보드와 서보 드라이버 보드 사이 배선 분리(업로드 불가)**
(2) 편집: ID 값을 3, 4로 설정

![3. 서보 혼 고정 – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) 프로그램 업로드
(4) 배선: 개발 보드를 서보 드라이버 보드, **3, 4**번 서보와 연결
(5) 서보 혼을 기어에 설치, 최대한 평행하게

4. 서보 5, 6 디버깅
절차 동일

5. 서보 7, 8 디버깅
절차 동일

## 4.**중간 값 미세 조정**

1. 코드 「01 微调MiddlePos值时使用」를 개발 보드에 업로드합니다

2. 손가락이 닫힌 위치에서 프로그램을 즉시 중지(데이터 케이블 분리)하고, 서보 혼이 올바르게 정렬되었는지 확인합니다(아래 그림). 정렬되지 않았으면 프로그램의 MiddlePos_1, MiddlePos_2 값을 조정해 정렬될 때까지 반복합니다. 해당 값을 기록합니다(8개 서보에 8개 값). 최종 프로그램에서 사용합니다.

![4. 중간 값 미세 조정 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4. 중간 값 미세 조정 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5.**테스트 프로그램 실행**

1. 위에서 저장한 MiddlePos_1, MiddlePos_2 값을 아래 배열에 입력하고 프로그램을 다운로드합니다.

![5. 테스트 프로그램 실행 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6.**「02 演示程序」 실행**

(1) arduino 소프트웨어를 직접 설치하고, OS에 따라 [설치 튜토리얼](https://blog.csdn.net/weixin_35509395/article/details/156188274)을 참조
(2) `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序` 디렉터리에서 왼손/오른손에 따라 해당 ino 파일을 엽니다

![6. 「02 演示程序」 실행 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) 컴파일·업로드 전에 라이브러리 관리자에서 FTServo 라이브러리, SCServo 라이브러리 설치

![6. 「02 演示程序」 실행 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) 개발 보드 종류: 「Arduino Nano」 선택

![6. 「02 演示程序」 실행 – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(5) 컴파일 후 업로드

주의 이때 PC는 개발 보드에만 연결하고, 개발 보드는 서보 드라이버 보드에 연결하지 않습니다(즉 로봇핸드에 연결하지 않음)

업로드 성공 후 개발 보드를 3개의 점퍼 케이블로 서보 드라이버 보드에 연결하고, 서보를 서보 드라이버 보드에 연결합니다. [MEGA328P 개발 보드 디버깅 시 배선 방식](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)을 참조.

로봇핸드는 **「02 演示程序」** 을 반복 실행합니다

실행 결과는 다음과 같습니다:

![6. 「02 演示程序」 실행 – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. 손 추적](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
