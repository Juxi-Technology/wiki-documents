---
title: "로봇 암 캘리브레이션"
description: "XLeRobot 양팔과 헤드 캘리브레이션: Windows / macOS / Linux용 lerobot-calibrate 명령, 중간 자세, 리밋 확인 및 좌우 암 검증."
---

# 로봇 암 캘리브레이션

![양팔과 헤드 캘리브레이션 절차](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## 양팔과 헤드 캘리브레이션 절차

> 사용하는 운영체제의 명령을 하나 복사해 실행하십시오. `port1`은 왼팔 제어 보드, `port2`는 오른팔 제어 보드입니다. 실제 포트 번호는 먼저 `lerobot-find-port`로 확인하십시오.
>
> Linux에서는 `ls /dev/ttyACM*`로 포트를 빠르게 확인할 수 있습니다.

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

캘리브레이션 명령을 실행하면 터미널이 먼저 Middle Position을 요청합니다. 양팔을 중간 자세(가동 조 상단, 고정 조 하단)로 두고 Enter를 누르십시오. 그런 다음 각 관절을 최대·최소 리밋까지 움직입니다.

::: warning 캘리브레이션 주의

Enter 키로 캘리브레이션을 시작하기 전에 로봇 암을 중간 위치(모든 관절이 가동 범위의 중앙)에 두십시오.

각 관절의 최솟값과 최댓값을 확인하십시오. 최솟값이 0을 넘어 갑자기 4095에서 감소하거나, 최댓값이 4095를 넘어 0에서 증가하는 경우 Feetech 상위 소프트웨어로 중간 위치 캘리브레이션을 수행한 뒤 로봇 암 캘리브레이션을 다시 진행하십시오.

:::

카메라 타워의 서보 2개도 같은 방식으로 각각 최대·최소 리밋까지 한 번씩 움직이면 됩니다.

터미널에 다음 줄이 나타나면 왼팔과 헤드 캘리브레이션이 시작됩니다:

![양팔과 헤드 캘리브레이션 절차](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![양팔과 헤드 캘리브레이션 절차](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

터미널에 다음 줄이 나타나면 오른팔 캘리브레이션이 시작됩니다. 베이스 바퀴는 캘리브레이션이 필요 없습니다.

![양팔과 헤드 캘리브레이션 절차](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![양팔과 헤드 캘리브레이션 절차](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
