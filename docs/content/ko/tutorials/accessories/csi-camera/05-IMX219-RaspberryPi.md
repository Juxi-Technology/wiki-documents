---
title: "05, IMX219-CSI 카메라 (Raspberry Pi) 튜토리얼"
description: "없는 경우 커널 또는 장치 하드웨어에 문제가 있을 수 있으므로 시스템을 다시 설치하거나 하드웨어를 교체해 보세요."
---

# 05, IMX219-CSI 카메라 (Raspberry Pi) 튜토리얼

##### 1, 먼저 "ls" 명령어를 사용하여 vchiq 장치 노드가 존재하는지 확인합니다: ls /dev 입력

![그림 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

없는 경우 커널 또는 장치 하드웨어에 문제가 있을 수 있으므로 시스템을 다시 설치하거나 하드웨어를 교체해 보세요.

##### 2, "sudo raspi-config" 명령어를 실행하여 Raspberry Pi CSI 카메라를 활성화합니다

![그림 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![그림 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![그림 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![그림 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

그런 다음 종료하고 sudo reboot 명령어를 입력하여 Raspberry Pi를 재시작합니다

##### 3, "vcgencmd get_camera"를 입력하여 현재 카메라와 활성화가 사용 가능한지 확인합니다

![그림 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

detected=0이면 카메라 모듈이 제대로 연결되지 않은 것이므로 하드웨어를 다시 점검하세요. detected=1이면 CSI 카메라 연결이 정상임을 의미합니다. supported=1은 카메라가 활성화되어 카메라를 사용할 수 있음을 의미합니다. supported=0이면 CSI 카메라가 활성화되지 않은 것이므로 카메라 모듈을 활성화해야 합니다.

## **3.rapistill 명령어로 사진 촬영**

**"raspistill -o image.jpg"**를 입력하면 사진 촬영과 저장에 성공하며, 이때 카메라의 빨간 램프가 켜집니다. 더 많은 매개변수는 raspistill --help를 사용하세요

![그림 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

image.jpg 이미지를 Windows 데스크톱으로 전송하여 열면, 촬영된 결과를 확인할 수 있습니다



