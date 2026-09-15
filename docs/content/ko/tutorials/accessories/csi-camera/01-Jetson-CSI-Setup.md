---
title: "01, CSI 카메라 사용"
description: "방향키 아래로 Configure Jetson 24pin CSI Connector를 선택합니다. 그런 다음 Enter를 눌러 다음 옵션으로 이동합니다"
---

# 01, CSI 카메라 사용

## 1, CSI 카메라 핀 설정

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![그림 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

방향키 아래로 **Configure Jetson 24pin CSI Connector**를 선택합니다. 그런 다음 Enter를 눌러 다음 옵션으로 이동합니다

![그림 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

**Configure for compatible hardware** 를 선택한 후 Enter를 누릅니다.

![그림 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

방향키 아래로 **Camera IMX219 Dual**를 선택한 후 Enter를 누릅니다.

나중에 재부팅한 후 카메라 미리보기 화면을 실행했을 때 오류가 발생하거나 검은 화면이 나오면 여기서 Camera IMX219-C로 변경합니다

![그림 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

**Save pin changes** 를 선택한 후 Enter를 누릅니다.

![그림 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

방향키 아래로 **Save and reboot to reconfigure pins**를 선택한 후 Enter를 누릅니다.

![그림 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

다음 화면이 나타나면 바로 Enter 키를 누르면 메인보드가 재시작됩니다.

![그림 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2, video 장치 확인

```Plain Text
ls /dev/video*
```

그림의 결과는 CSI 카메라 2개를 연결한 결과입니다: 일반적으로 CSI 카메라 1개당 `video` 장치 1개가 표시됩니다

![그림 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3, 카메라 화면 미리보기

터미널에 아래 명령어를 입력하면 시스템이 자동으로 카메라 화면 창을 띄웁니다: 기본적으로 `/dev/video0` 장치를 엽니다

```Plain Text
nvgstcapture-1.0
```

![그림 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1, 카메라 지정

카메라가 여러 개인 경우 카메라 ID를 지정할 수 있습니다:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![그림 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2, 미리보기 해상도 지정

CSI 카메라가 하나뿐인 경우 `--sensor-id=1`을 `--sensor-id=0`으로 변경할 수 있습니다:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![그림 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)



