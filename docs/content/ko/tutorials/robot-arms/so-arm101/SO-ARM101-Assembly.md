---
title: Lerobot 로봇 암 조립 가이드
description: "Pro 버전: 리더 암은 5V6A, 팔로워 암은 12V5A 전원 어댑터 사용"
---

# Lerobot 로봇 암 조립 가이드

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**


![image – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**Pro 버전의 액티브 암은 5V6A 전원 어댑터를, 패시브 암은 12V5A 전원 어댑터를 사용합니다**

서보 ID 설정·서보 각도 캘리브레이션·조립은 사전에 완료해야 하며, [공식 조립 튜토리얼](https://huggingface.co/docs/lerobot/so101)을 참고할 수 있습니다.

# 1단계: 서보 ID 설정 및 서보 혼 장착(5번 서보 제외)

![image – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

다시 한번, 서보 관절 ID와 기어비가 **SO-ARM101**과 엄밀히 일치하는지 확인해 주세요.

버스에 연결된 각 모터에는 고유한 ID가 있습니다. 새 모터는 보통 기본 ID `1`로 제공됩니다. 모터와 컨트롤러 간 정상적인 통신을 위해 먼저 각 모터에 고유한 ID를 설정해야 합니다. 또한 버스의 데이터 전송 속도는 보레이트(baud rate)로 결정됩니다. 서로 통신할 수 있으려면 컨트롤러와 모든 모터가 동일한 보레이트로 구성되어야 하며, 이 로봇 암 서보의 보레이트는 100000입니다.

이를 위해 먼저 컨트롤러를 각 모터에 개별적으로 연결하여 설정해야 합니다. 이 파라미터들은 모터 내부 메모리의 비휘발성 영역(EEPROM)에 기록되므로 한 번만 수행하면 됩니다.

다른 로봇의 모터를 재사용할 계획이라면, ID와 보레이트가 일치하지 않을 수 있으므로 이 단계를 수행해야 할 수도 있습니다.

다음 영상은 모터 ID를 설정하는 순서를 보여줍니다.

## Windows 시스템

[飞特舵机上位机.zip]

Feite 서보 컨트롤러를 사용하여 서보 ID를 설정하고 미드포인트를 캘리브레이션합니다. ID 설정 범위는 1~6입니다!

[机械臂舵机设置ID-Windows系统.mp4]

## Linux/Ubuntu 시스템

FTServo 상위 프로그램은 https://gitee.com/ftservo/FTServo_Linux 를 참고하세요.

먼저 [LeRobot 매니퓰레이터 튜토리얼](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc)을 **포트 권한(Port Authorization)** 아래의 **포트 찾기 스크립트 실행(Run Script to Find Port)** 까지, 즉 **C. 매니퓰레이터 제어**까지 따라 하세요.

USB 데이터 케이블로 팔로워 암의 서보 드라이버 보드를 컴퓨터에 연결하고 전원을 켭니다. 그다음 다음 명령을 실행하세요. 명령의 --robot.port=/dev/ttyACM0 을 찾은 포트 번호로 수정하세요. 찾은 포트가 /dev/ttyACM1 이라면 --robot.port=/dev/ttyACM1 로 수정하면 됩니다.

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

다음과 같은 출력이 표시됩니다.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

지시에 따라 gripper 서보를 연결하세요. 서보 드라이버 보드에 연결된 서보가 이것 하나뿐인지, 그리고 이 서보에 다른 서보가 연결되어 있지 않은지 확인해 주세요. **[Enter]** 키를 누르면 스크립트가 이 서보의 ID와 보레이트를 자동으로 설정하며, ID는 6부터 1까지 설정됩니다!

그다음 다음과 같은 메시지가 표시되어야 합니다.

```Python
'gripper' motor id set to 6
```

다음 항목의 출력은 다음과 같습니다.

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**참고**: 지시에 따라 위 작업을 각 서보에 대해 반복하세요.

이전 서보와 마찬가지로, 드라이버 보드에 연결된 서보가 이것 하나뿐인지, 그리고 서보 자체에 다른 서보가 연결되어 있지 않은지 확인해 주세요.

**Enter** 키를 누를 때마다 케이블 연결을 확인해 주세요. 예를 들어 보드를 조작할 때 전원 케이블이 빠질 수 있습니다.

모든 단계를 완료하면 스크립트가 자동으로 종료되며, 이때 서보들이 사용 준비 완료됩니다. 이제 각 서보의 3핀 인터페이스를 순서대로 연결하고, 첫 번째 서보(ID 1인 "shoulder pan" 서보)의 케이블을 드라이버 보드에 연결하세요. 이제 드라이버 보드를 로봇 암의 베이스에 설치할 수 있습니다.

액티브 암에도 동일한 절차를 반복하세요.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

[机械臂舵机设置ID-Linux系统.mp4]

# 2단계: 조립

- 팔로워 암의 조립 절차는 액티브 암과 기본적으로 동일합니다. 유일한 차이는 12단계 이후 엔드이펙터(gripper와 핸들)의 설치 방식입니다.

[SO-ARM101机械臂组装教程.mp4]

서보 드라이버 보드 설치: 먼저 구리 기둥 4개를 설치한 후, M2.5*8 나사 4개로 드라이버 보드를 고정합니다.

![Linux/Ubuntu 시스템 – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Linux/Ubuntu 시스템 – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Linux/Ubuntu 시스템 – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**Pro 버전의 검은색 액티브 암은 5V6A 전원 어댑터를, 흰색 패시브 암은 12V5A 전원 어댑터를 사용합니다**

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
