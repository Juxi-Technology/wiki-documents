---
title: Lerobot 로봇 암 조립 가이드
description: "Pro 버전: 리더 암은 5V6A, 팔로워 암은 12V5A 전원 어댑터 사용"
---

# Lerobot 로봇 암 조립 가이드

주의: 완성품 로봇암은 이 튜토리얼을 건너뛰세요

## 팔로워 암의 3D 프린팅 부품

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## 리더 암의 3D 프린팅 부품

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

리더 암과 팔로워 암은 매우 유사하며, 말단만 다릅니다

리더 암은 손잡이와 트리거이고, 팔로워 암은 그리퍼입니다

## 3D 프린팅 부품에 남은 서포트 제거

모든 구멍, 홈, 슬롯, 격자를 확인하고, 특히 마작 "오통"처럼 생긴 다섯 개의 구멍을 확인합니다

이 단계는 매우 중요합니다. 그렇지 않으면 나중에 나사를 조여 넣을 수 없습니다

## 네 가지 서보 구분

|대형 모델|소형 모델|전압(V)|감속비|로봇암 관절|수량|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|리더 암 2|1|
||C044|7.4|1:191|리더 암 1, 3|2|
||C046|7.4|1:147|리더 암 4, 5, 6|3|
||C047|12|1:345|팔로워 암 모든 관절|6|

> 감속비는 "모터 회전수: 서보 출력축 회전수"의 비율로, 예를 들어 1:345는 모터가 345바퀴 돌아야 서보 출력축이 1바퀴 돈다는 의미입니다.
> 
> 감속비가 크면 기어 세트를 통해 토크가 증폭되므로 더 무거운 부하(예: 팔로워 암)를 구동할 수 있습니다
> 
> 하지만 동시에 출력축의 회전 속도는 더 느려집니다("감속"되었기 때문입니다)
> 
> 관절을 드래그할 때 더 힘이 듭니다
> 
> 

아래는 본 프로젝트의 모든 서보 모델과 감속비이며, 밑줄은 해당 서보의 번호입니다

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## 두 가지 전압의 전원 어댑터 구분

7.4V 서보에 전원을 공급하는 5V 6A 30W 전원 어댑터(리더 암) 검정색

12V 서보에 전원을 공급하는 12V 5A 60W 전원 어댑터(팔로워 암) 흰색

## Feetech 서보 디버깅 도구 다운로드

### Windows 컴퓨터

https://gitee.com/ftservo/fddebug

[`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z)를 다운로드하여 압축을 풀고, 그 안의 exe 프로그램을 실행합니다

### Ubuntu 컴퓨터와 Mac 컴퓨터(압축 파일에 튜토리얼 포함)

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**Pro 버전 리더 암은 5V6A 전원 어댑터를, 팔로워 암은 12V5A 전원 어댑터를 사용합니다**

서보 ID 설정과 서보 각도 캘리브레이션 및 조립은 미리 완료해야 하며, [공식 조립 튜토리얼](https://huggingface.co/docs/lerobot/so101)을 참고할 수 있습니다

## 1단계: 서보 ID 설정, 서보 혼 설치(5번 서보 제외)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Feetech 호스트 프로그램 디버깅 도구를 열고 COM 포트 번호를 선택한 뒤, 보드레이트를 100만으로 설정하고 "열기"를 클릭합니다

2. "검색"을 클릭하고 "STS3215"가 나타나면 "중지"를 클릭한 후 "STS3215"를 클릭합니다

3. 상단의 "디버그"를 선택하면 슬라이더를 드래그하여 서보를 회전시킬 수 있고, "스캔"을 클릭하여 서보를 왕복 운동시킬 수도 있습니다. 서보가 정상적으로 동작하는지 확인합니다

4. 상단의 "프로그래밍"을 선택합니다

5. "중심 위치 캘리브레이션"을 클릭하여 이때의 서보 회전축 위치를 중심 위치(0-4095)로 설정합니다

6. "ID"를 클릭하고 오른쪽 아래에서 해당 서보의 ID 번호를 설정한 뒤 "저장"을 클릭합니다. 번호는 순수 아라비아 숫자이며 문자를 붙이지 않습니다.

7. 서보와 컨트롤 보드를 연결하는 선을 뽑습니다

8. 서보에 서보 케이블을 꽂습니다

1번 서보는 두 개의 선을 꽂고, 나머지 서보는 우선 한 개의 선만 꽂습니다

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

다시 한번 알려드립니다. 서보 관절 ID와 기어비가 **SO-ARM101**과 엄격하게 대응하는지 확인하세요.

버스 위의 모든 모터는 고유한 ID를 하나씩 가집니다. 새 모터는 일반적으로 기본 ID `1`을 가지고 있습니다. 모터와 컨트롤러 간 통신이 정상적으로 이루어지도록 하려면, 먼저 각 모터에 고유한 ID를 설정해야 합니다. 또한 버스 위의 데이터 전송 속도는 보드레이트로 결정됩니다. 서로 통신하려면 컨트롤러와 모든 모터에 동일한 보드레이트를 설정해야 하며, 본 로봇암 서보의 보드레이트는 100000입니다.

이를 위해 먼저 컨트롤러를 각 모터에 하나씩 연결하여 설정을 진행해야 합니다. 이 매개변수들은 모터 내부 저장소(EEPROM)의 비휘발성 영역에 기록되므로 한 번만 작업하면 됩니다.

다른 로봇에서 사용하던 모터를 재활용하는 경우, ID와 보드레이트가 일치하지 않을 수 있으므로 이 단계를 수행해야 할 수도 있습니다.

아래 영상은 모터 ID 설정 단계의 순서를 보여줍니다.

### Windows 시스템

[飞特舵机上位机.zip](/downloads/飞特舵机上位机.zip)

Feetech 서보 호스트 프로그램으로 서보 ID를 설정하고 중심 위치를 캘리브레이션합니다. ID 설정은 1부터 6까지입니다!

**机械臂舵机设置ID-Windows系统.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Linux/ubuntu 시스템과 Mac 컴퓨터

Feetech 서보 호스트 프로그램이 필요하면 위의 [Feetech 서보 디버깅 도구](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb)를 참고하세요

먼저 [공식 Lerobot 환경 설치](https://huggingface.co/docs/lerobot/installation) 페이지에 따라 환경 배포를 완료하세요

가상 환경을 활성화하고 해당 src/lerobot 디렉터리로 이동하는 것에 유의하세요

conda activate lerobot

cd lerobot/src/lerobot

1、로봇암에 해당하는 USB 포트 찾기  각 로봇암의 올바른 포트를 찾으려면 유틸리티 스크립트를 두 번 실행하세요::

```Plain Text
lerobot-find-port
```

리더 로봇암 포트를 식별할 때의 예시 출력(예: Mac에서는 `/dev/tty.usbmodem575E0031751`, 또는 Linux에서는 `/dev/ttyACM0`일 수 있음):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

팔로워 로봇암 포트를 식별할 때의 예시 출력(예: `/dev/tty.usbmodem575E0032081`, 또는 Linux에서는 `/dev/ttyACM1`일 수 있음):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

USB 커넥터를 반드시 뽑아야 합니다. 그렇지 않으면 인터페이스를 감지할 수 없습니다.

2、USB 데이터 케이블로 컴퓨터에서 팔로워 암의 서보 드라이버 보드에 연결하고 전원을 켭니다. 그런 다음 아래 명령을 실행합니다. 명령 안의--robot.port=/dev/ttyACM0 을 찾은 포트 번호로 수정하세요. 찾은 포트가 /dev/ttyACM1이라면--robot.port=/dev/ttyACM1 로 수정합니다

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

다음과 같은 출력이 표시됩니다.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

지시에 따라 그리퍼의 서보를 연결합니다. 이것이 서보 드라이버 보드에 연결된 유일한 서보이고, 해당 서보가 아직 다른 어떤 서보와도 연결되지 않았는지 확인하세요. **[Enter]** 키를 누르면 스크립트가 자동으로 해당 서보의 ID와 보드레이트를 설정하며, ID 설정은 6부터 1까지입니다!

이후 다음과 같은 정보가 표시됩니다:

```Python
'gripper' motor id set to 6
```

이어서 다음 출력은 다음과 같습니다:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**주의 **지시에 따라 각 서보마다 위 작업을 반복합니다.

이전 서보와 마찬가지로, 이것이 드라이버 보드에 연결된 유일한 서보이고 서보 자체가 다른 어떤 서보에도 연결되지 않았는지 확인하세요.

매번 **Enter** 키를 누르기 전에 반드시 케이블 연결을 확인하세요. 예를 들어 회로 기판을 다루는 과정에서 전원선이 분리될 수 있습니다.

모든 단계를 완료하면 스크립트가 자동으로 종료되고, 이때 서보를 사용할 수 있게 됩니다. 이제 각 서보의 3핀 커넥터를 차례로 연결하고, 첫 번째 서보(ID가 1인 "shoulder pan" 서보)의 케이블을 드라이버 보드에 연결합니다. 이제 드라이버 보드를 로봇암의 베이스에 설치할 수 있습니다.

리더 암에 대해서도 동일한 단계를 반복합니다.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**机械臂舵机设置ID-Linux系统.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## 2단계: 조립

- 팔로워 암의 조립 단계는 리더 암과 기본적으로 동일합니다. 유일한 차이는 12단계 이후 말단 이펙터(그리퍼와 핸들)의 설치 방식이 다르다는 점입니다.

**SO-ARM101机械臂组装教程.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

서보 드라이버 보드 설치: 먼저 4개의 구리 기둥을 설치한 다음, 네 개의 M2.5*8 나사로 드라이버 보드를 고정합니다

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**Pro 버전 검정색 리더 암은 5V6A 전원 어댑터를, 흰색 팔로워 암은 12V5A 전원 어댑터를 사용합니다**

## 웹 페이지에서 서보 ID 설정 및 중심 위치 캘리브레이션

https://bambot.org/feetech.js?lang=zh

1、서보 모델에 따라 0 또는 1을 입력하고 "연결"을 클릭합니다

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2、ID 1~6 서보를 스캔하고, 스캔 결과의 FOUND로 해당 ID 서보를 확인할 수 있습니다. 예를 들어 그림에서는 서보 ID 1이 스캔되었습니다

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3、ID 설정과 중심 위치 캘리브레이션

① 현재 서보 ID 입력란에 스캔된 서보 ID를 입력합니다

② "ID 관리"에서 숫자를 입력하고 "ID 변경"을 클릭하면 ID가 설정됩니다

③ 중심 위치 캘리브레이션(STS3215 서보의 중심 위치는 2047, SCS0009 서보의 중심 위치는 511)

STS 서보: "위치 제어"에 2047을 입력하고 "Set"을 클릭합니다

SCS 서보: "위치 제어"에 511을 입력하고 "Set"을 클릭합니다

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
