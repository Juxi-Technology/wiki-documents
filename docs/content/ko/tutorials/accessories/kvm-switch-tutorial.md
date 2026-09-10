---
title: KVM 스위치 사용법
description: "KVM 스위치: HUB 기능, TTL 직렬, Bluetooth 모듈 탑재"
---

# KVM 스위치 사용법

> **[스토어에서 구매](https://www.juxitech.com/ko/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station)**


KVM 스위치에는 HUB 기능, TTL 직렬, Bluetooth 모듈이 탑재되어 있습니다.

![image – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWRkMTk2MGI5MDFiZjA1MzRkZjk3YmU2ZTQyMTQxZTZfN2U5YTg0ODY4OGMwOWY3NGJlYjYyN2RhN2EyZTgwZTZfSUQ6NzYzODkzMTc5Mjc2NjY1MTMyMF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

## 각 모듈 기능

### 1. HUB 기능

USB-TypeC 케이블 1개로 USB 1포트를 3포트로 확장.

![1. HUB Function – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODc2MDdiYTM3MzVmZGM1NDM0OTQ1NGFhNzdjMjgwMTNfYzY1ODI1ZDM5MTYzMzU1Nzg2NDcxOTU3MzEwZTQxYjRfSUQ6NzYzODkzMTc5NTI0MTE1OTY0MF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

### 2. TTL 직렬

핀(왼쪽부터): GND RXD TXD TNOW 3V3 5V

![2. TTL Serial Port – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDc4MWRkYzM0NTYxNDMyNzgzNDZkZDk1MzZlNDQwZjVfODAxYjI4MmViOTI5NGQ3OGFiZjE4NjY1MjhmOGVhYzJfSUQ6NzYzODkzMTc5Mzc4NTc4NTI4N18xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

### 3. Bluetooth

AT 명령으로 연결, 또는 슬레이브 모드로 전환(휴대폰은 4.2 프로토콜 연결).

![3. Bluetooth Module – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWUxNDY1MGFkMzU0MzUyYjQ4NTIwN2I4N2FiMmVhMzZfMDgxN2YzMmRjZmJjN2Q4NWNhYjQ2YjY2ZTIwZmUwNDJfSUQ6NzYzODkzMTc5NTU1OTYzMTgzMl8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

## 이중 전환

### 1. 디바이스 A + 디바이스 B(둘 다 디스플레이)

버튼 전환 & 적외선 리모컨 전환.

![1. Device A + Device B both ends have monitors – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2M3ZTE2NTcxMDI1ZDg5MjI1NmI3NjMyNTA0MjAxMjdfY2FhNmMzNDllNThjMGY5ZmQ5N2IzODlhNGM0M2FmZDlfSUQ6NzYzODkzMTc5Mjc2NjY2NzcwNF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

### 2. 메인보드(디스플레이 없음)+ 호스트(디스플레이 있음)

호스트에 4K HD HDMI 캡처 장치를 추가로 연결하고, **호스트에서 OBS, Potplay 같은 소프트웨어로 화면을 캡처**하면 됩니다.

![2. Motherboard without monitor + Host with monitor – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmRjYWRkNDVmMGZkMDU4YTMxNzIzYWNjZDlkNTc0ZDZfZTNmYTlmYjM2MjY2YWM3ZjM1MmZlM2I1MTg2MGMzMjhfSUQ6NzYzODkzMTc5MzU5Mjg4MDA3Nl8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

**4K HD HDMI 캡처 장치 배선 방법**

메인보드 인터페이스에 따라 다음 3가지 배선 방법이 있습니다.

**HDMI 인터페이스** ——> HDMI 케이블 ——> 캡처 장치의 HDMI 인터페이스 ——> USB/Type-C ——> 노트북, 컴퓨터, 올인원, 휴대폰/태블릿 등 디스플레이

**Micro HDMI 인터페이스** ——> Micro to HDMI 어댑터 ——> HDMI 케이블 ——> 캡처 장치의 HDMI 인터페이스 ——> USB/Type-C ——> 노트북, 컴퓨터, 올인원, 휴대폰/태블릿 등 디스플레이

**DP 인터페이스** ——> DP to HDMI 어댑터 ——> HDMI 케이블 ——> 캡처 장치의 HDMI 인터페이스 ——> USB/Type-C ——> 노트북, 컴퓨터, 올인원, 휴대폰/태블릿 등 디스플레이

![2. Motherboard without monitor + Host with monitor – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjgxYmM4NGUyZWZjNTVkOTdiNGNkMDI1MjExYTE0ZDZfMWY1YmMyYmZkN2U5ZmQ4NDBkNjQxYzE0NjU1YmVkNWJfSUQ6NzYzODkzMTc5NTE4ODEwODIxOV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

**OBS 사용 가이드**

![2. Motherboard without monitor + Host with monitor – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2FlNWFlZjBkNjFlYzFiMTc4ODk2NTViYmQwZjJjYTBfNjRiZjk5ZDJjNTgwZjY1MjdhNWJkYmFmNjNjYTVkZjNfSUQ6NzYzODkzMTc5MjcyMDgyNTI3NF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

**Potplayer 사용 가이드**

![2. Motherboard without monitor + Host with monitor – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM1N2UzYTQ1ZTMxNjg2ZjJiNTZiNmZlYWE4MjlhYThfZTMwODY2ZDNmNmRiMDNjMTBkN2M0ZDUxYzFiMjczNDZfSUQ6NzYzODkzMTc5MzUxMzEzOTEyOF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

핀 다이어그램 예시

![2. Motherboard without monitor + Host with monitor – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBlNTQ4ZjAyYzQzYTUyMjE4ZDE1NmU1OTYwZmUwNTJfMjhkMjFhYjljYTFjMzhlZjcyNmVlNjU4N2I1YTQ5ZWVfSUQ6NzYzODkzMTc5MjU4MjM4MDUyMV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

![2. Motherboard without monitor + Host with monitor – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDg4OTViOTZjMzNhOTY2ZmY2NWIzNjg0MTIxM2E5YjJfYTJmNmRhZDE0NWMzMzQ1NGRiZmM2NTU1NzdiZjZiMDhfSUQ6NzYzODkzMTc5MzE5NDUwMzEyNV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

![2. Motherboard without monitor + Host with monitor – 7](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzBlZjI0NzY4ZWMyMWFjN2NkZDgxN2EyMTM0OTBiZmZfODJkYTE2MTliMTQ5ZWFlMjVjZjg5Yzg1MzUwNjA3ZmJfSUQ6NzYzODkzMTc5NTAxMDI3NjMyMV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

## 기술 지원

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)
