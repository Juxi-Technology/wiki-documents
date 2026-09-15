---
title: "02, 자동 초점 카메라 사용"
description: "그림의 결과는 CSI 카메라 2개, USB 카메라 1개를 연결한 결과입니다: 일반적으로 CSI 카메라 1개당 video 장치 1개가 표시되고, USB 카메라 1개당 video 장치 2개가 표시됩니…"
---

# 02, 자동 초점 카메라 사용

## 1, video 장치 확인

```Plain Text
ls /dev/video*
```

그림의 결과는 CSI 카메라 2개, USB 카메라 1개를 연결한 결과입니다: 일반적으로 CSI 카메라 1개당 `video` 장치 1개가 표시되고, USB 카메라 1개당 `video` 장치 2개가 표시됩니다. USB 카메라는 새로 추가된 번호가 작은 `/dev/video2`를 선택하여 호출합니다 (USB 카메라를 연결하면 시스템에 `/dev/video2`, `/dev/video3` 장치 번호가 새로 추가됩니다)

![그림 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2, GUVCView

GUVCView는 Linux 시스템용 오픈 소스 소프트웨어로, 비디오와 이미지의 캡처 및 녹화에 사용되며 주로 Webcam 카메라에 사용됩니다.

### 2.1, GUVCView 설치

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![그림 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2, GUVCView 사용

애플리케이션 메뉴 모음에서 `guvcview` 아이콘을 클릭하거나 터미널에 시작 명령어를 입력합니다: USB 카메라를 선택합니다. CSI 카메라는 미리보기 화면이 없습니다

```Plain Text
guvcview
```

![그림 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![그림 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3, VLC

VLC media player는 자유롭고 오픈 소스인 멀티미디어 플레이어로, 다양한 오디오 및 비디오 형식과 DVD, 오디오 CD, VCD 및 각종 스트리밍 프로토콜을 지원합니다.

### 3.1, VLC 설치

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![그림 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2, VLC 사용

애플리케이션 메뉴 모음에서 `VLC media player` 아이콘을 클릭하거나 터미널에 시작 명령어를 입력합니다: USB 카메라를 선택합니다. CSI 카메라는 미리보기 화면이 없습니다

```Plain Text
vlc
```

![그림 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![그림 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

USB 카메라에 해당하는 장치 번호를 선택합니다:

![그림 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![그림 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)



