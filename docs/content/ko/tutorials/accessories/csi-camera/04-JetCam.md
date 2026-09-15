---
title: "JetCam 사용"
description: "JetCam 사용"
---

# JetCam 사용

JetCam 사용

1, JetCam 설치

2, JetCam 사용

2.1, CSI 카메라

주요 코드 설명

카메라 호출

카메라 화면 가져오기

2.1.1, 단일 카메라

2.1.2, 다중 카메라

2.2, USB 카메라

참고 자료



JetCam는 NVIDIA가 Jetson 플랫폼을 위해 개발한 사용하기 쉬운 Python 라이브러리로, USB 카메라 또는 CSI 카메라를 통합하고 조작하는 데 사용됩니다

## 1, JetCam 설치

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2, JetCam 사용

JetCam는 사용자에게 CSI 및 USB 카메라 호출을 시연하기 위한 대표적인 예제 프로그램을 제공합니다.

예제는 Jupyter Lab에서 실행해야 하며, 당사 출하 이미지 시스템을 사용하면 메인보드 IP:8888을 통해 직접 접속할 수 있습니다!

### 2.1, CSI 카메라

Jupyter Lab 웹 화면에서 CSI 카메라가 있는 폴더로 이동하여 해당 폴더를 엽니다:

`/home/jetson/jetcam/notebooks/csi_camera`

**주의: Jupyter Lab에 익숙하지 않은 분은 Jupyter Lab 사용 튜토리얼을 참고하여 기본 조작을 익힐 수 있습니다!**

#### 주요 코드 설명

##### 카메라 호출

width: 이미지 출력 너비

height: 이미지 출력 높이

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### 카메라 화면 가져오기

`image = camera.read()`

#### 2.1.1, 단일 카메라

> **소스 코드 경로**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **실행 결과**
> 
> 

프로그램 파일을 연 후 개별 셀 블록을 위에서 아래로 순서대로 실행합니다:

![그림 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2, 다중 카메라

> **소스 코드 경로**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **실행 결과**
> 
> 

프로그램 파일을 연 후 개별 셀 블록을 위에서 아래로 순서대로 실행합니다:

![그림 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2, USB 카메라

Jupyter Lab에서 USB 카메라가 있는 폴더로 이동하여 파일을 엽니다. 출하 이미지 시스템 폴더 경로:

`/home/jetson/jetcam/notebooks/usb_camera`

![그림 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## 참고 자료

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
