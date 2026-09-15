---
title: "03, Jupyter Lab 사용"
description: "아래 명령어로 Jupyter Lab을 설치합니다: Jupyter Lab 설치 시 다운로드 속도가 느린 경우 지정 소스를 사용하여 설치할 수 있습니다"
---

# 03, Jupyter Lab 사용

## 1, Jupyter Lab 설치

### 1.1, Jupyter Lab

아래 명령어로 Jupyter Lab을 설치합니다: Jupyter Lab 설치 시 다운로드 속도가 느린 경우 지정 소스를 사용하여 설치할 수 있습니다

```Plain Text
sudo apt update
sudo apt install python3-pip -y
sudo pip3 install --upgrade pip
```

```Plain Text
sudo pip3 install jupyterlab
# 칭화 미러: pip3 install jupyterlab -i https://pypi.tuna.tsinghua.edu.cn/simple
# 알리바바 클라우드 미러: sudo pip3 install jupyterlab -i https://mirrors.aliyun.com/pypi/simple/
```

![그림 1](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/1.png)

![그림 2](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/2.png)

![그림 3](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/3.png)

![그림 4](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/4.png)

### 1.2, Node.js

아래 명령어로 최신 Node.js를 설치합니다:

```Plain Text
sudo apt install curl -y
sudo curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y
```

![그림 5](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/5.png)

버전을 확인합니다:

```Plain Text
node -v && npm -v
```

![그림 6](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/6.png)

## 2, Jupyter Lab 시작

Jupyter Lab을 시작하기 전에 시스템 기본 브라우저를 설정해야 합니다. 그렇지 않으면 터미널을 시작할 때 몇 가지 메시지가 나타납니다.

### 2.1, 기본 브라우저 설정

시스템의 Chromium 브라우저를 열고 기본 브라우저 설정을 선택합니다:

![그림 7](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/7.png)

![그림 8](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/8.png)

### 2.2, Jupyter Lab 시작

```Plain Text
jupyter lab
# 브라우저 없이 시작 jupyter lab --no-browser
# 관리자 권한으로 시작 sudo jupyter lab --allow-root
```

![그림 9](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/9.png)

![그림 10](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/10.png)

### 2.3, 호스트 머신 접속

호스트 머신은 Jetson 메인보드 시스템에서의 접속을 의미하며, [http://localhost:8888/](http://localhost:8888/)를 통해 직접 접속합니다:

`http://localhost:8888/`

![그림 11](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/11.png)

## 3, Jupyter Lab 설정

Jupyter Lab에 대해 LAN 접속, 접속 비밀번호, 부팅 시 자동 시작 등의 설정을 수행합니다.

### 3.1, LAN 접속

같은 LAN에 있는 장치가 브라우저에서 IP:8888을 입력하여 접속할 수 있도록 설정합니다!

**주의: 캠퍼스 네트워크의 LAN에서는 일반적으로 접속할 수 없습니다. 노트북/휴대폰 핫스팟으로 변경하여 테스트할 수 있습니다**

예를 들어 메인보드 IP: 192.168.0.105; 같은 LAN의 브라우저에서 192.168.0.105:8888을 입력하면 메인보드의 Jupyter Lab에 접속할 수 있습니다

#### 3.1.1, 설정 파일 생성

```Plain Text
sudo jupyter lab --generate-config
```

자동 생성되는 설정 파일 위치: Writing default config to: /root/.jupyter/jupyter_lab_config.py

#### 3.1.2, 설정 파일 수정

```Plain Text
sudo gedit /root/.jupyter/jupyter_lab_config.py
```

수정 내용: 수정 후 저장을 클릭하고 파일을 닫습니다.

코드 앞에 \# 기호가 있는지 확인하여 설정이 적용되도록 하세요

```Plain Text
# 모든 출처의 요청이 Jupyter Lab 서버에 접속하는 것을 허용
c.ServerApp.allow_origin = '*'
# 0.0.0.0은 사용 가능한 모든 네트워크 인터페이스에 바인딩하여 모든 주소에서 접속을 허용함을 의미합니다
c.ServerApp.ip = '0.0.0.0'
# root 사용자로 Jupyter Lab 서버를 시작하는 것을 허용
c.ServerApp.allow_root = True
# 기본 포트를 변경하여 충돌 방지
c.ServerApp.port = 8888
```

![그림 12](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/12.png)

### 3.2, 접속 비밀번호 설정

터미널에 비밀번호 설정 명령어를 입력합니다. 두 번 입력해야 하며, 비밀번호 입력 시 입력 내용이 표시되지 않습니다\!

```Plain Text
sudo jupyter lab password
```

자동 생성되는 설정 파일 위치: [JupyterPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_server_config.json

![그림 13](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/13.png)

### 3.3, 부팅 시 자동 시작 서비스

#### 3.3.1, 서비스 파일 편집

```Plain Text
sudo gedit /etc/systemd/system/jupyterlab.service
```

추가 내용: 추가 후 저장을 클릭하고 파일을 닫습니다

```Plain Text
[Unit]
Description=jupyterlab
After=network.target
[Service]
Type=simple
ExecStart=/usr/local/bin/jupyter-lab
config=/root/.jupyter/jupyter_lab_config.py --no-browser
User=root
Group=root
WorkingDirectory=/home/jetson/
Restart=always
RestartSec=10
[Install]
WantedBy=multi-user.target
```

root: 시스템의 사용자 이름

ExecStart: Jupyter Lab을 시작하는 명령어로, JupyterLab의 설치 경로로 변경합니다

config: JupyterLab의 설정 파일 경로로 변경합니다

WorkingDirectory: Jupyter-lab을 시작하여 여는 작업 디렉터리로, 임의로 변경할 수 있습니다 (사용자 디렉터리로 변경하는 것을 권장합니다)

`Jupyter-lab 설치 경로 확인: which jupyter-lab`

`설정 파일 경로: 위에서 생성된 설정 파일의 경로를 참고`

![그림 14](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/14.png)

#### 3.3.2, 자동 시작 서비스 설정

##### 부팅 시 자동 시작 서비스

```Plain Text
sudo systemctl enable jupyterlab
# 부팅 시 자동 시작 해제 systemctl disable jupyterlab
```

##### **서비스 시작**

```Plain Text
sudo systemctl start jupyterlab
# 서비스 중지 sudo systemctl stop jupyterlab
```

##### **서비스 상태 확인**

```Plain Text
systemctl status jupyterlab
```

![그림 15](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/15.png)

##### 부팅 시 자동 시작 검증

시스템을 재시작한 후 시스템 IP에 따라 같은 LAN의 장치로 메인보드 IP:8888에 접속합니다.

> 최초 접속 시 비밀번호를 입력해야 하며, 비밀번호는 앞 단계에서 설정한 정보입니다;
> 
> 스크린샷 당시 메인보드의 IP는 192.168.0.105이므로, 같은 LAN의 장치로 192.168.0.105:8888에 접속할 수 있습니다
> 
> 

![그림 16](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/16.png)

## 4, Jupyter Lab 사용

### 4.1, 커널

프로그램을 실행할 때마다 또는 프로그램에 이상이 발생했을 때 커널을 재시작하고 모든 셀 블록의 출력 정보를 지우는 것을 권장합니다:

![그림 17](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/17.png)

### 4.2, 프로그램 실행

Jupyter Lab에서 실행할 프로그램 파일을 열고, 위에서 아래로 순서대로 셀 블록을 실행합니다:

#### 4.2.1, 실행 중

셀 블록 왼쪽 위에 [\*]가 표시되면 실행 중을 의미합니다:

![그림 18](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/18.png)

#### 4.2.2, 실행 완료

셀 블록 왼쪽 위에 [숫자]가 표시되면 실행 순서 횟수를 의미합니다: 예를 들어 [1] → 프로그램이 처음으로 해당 셀 블록 코드를 실행했습니다

![그림 19](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/19.png)



