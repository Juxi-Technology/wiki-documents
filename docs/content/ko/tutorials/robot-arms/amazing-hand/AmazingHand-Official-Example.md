---
title: 로봇핸드 공식 예제 실행 튜토리얼
description: "본 튜토리얼에 첨부된 코드 압축 패키지를 다운로드하여 데모를 진행하거나, 공식 오픈소스 코드 저장소 https://github.com/pollen-robotics/AmazingHand.git 를 클론하세요. 공식 코드에는 오류가 있을 수 있으니 주의하세요."
---

# 로봇핸드 공식 예제 실행 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/amazinghand)**


## 1. 코드 다운로드

데모 예제 실행을 위해 본 튜토리얼에 첨부된 코드 압축 패키지를 다운로드하거나, 공식 오픈소스 코드 저장소 https://github.com/pollen-robotics/AmazingHand.git 를 클론하는 것을 권장합니다. 공식 오픈소스 코드에는 오류나 누락이 있을 수 있습니다.

[AmazingHand 공식 예제 실행 튜토리얼](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Windows 코드 압축 패키지

[AmazingHand-main.zip]

Linux 코드 압축 패키지

[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. 환경 설치

시스템의 자체 설치 절차에 따라 Rust, uv, dora-rs를 설치합니다

**1. Rust 설치:** [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

Windows에서의 Rust 환경 변수 설정 참고(중요!) https://zhuanlan.zhihu.com/p/1958936613276087180

Linux 환경 변수 설정:

![2. 환경 설치 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![2. 환경 설치 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

최초 설치 시 Visual Studio Installer가 필요할 수 있습니다

**Cargo 미러 소스 구성**

`.cargo` 폴더에 `config.toml` 구성 파일을 만들고, 칭화대학교(Tsinghua) `crates.io-index` 미러를 구성하여 Cargo가 칭화대학교의 미러 소스를 사용해 크레이트를 다운로드하도록 합니다.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. uv 설치:** [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![2. 환경 설치 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

Windows에서는 Powershell 터미널을 열고, 이 명령을 복사한 뒤 입력하여 설치합니다

**Linux 환경 변수 설정:**

![2. 환경 설치 – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3. dora-rs 설치:** 다운로드 및 설치는 [https://dora-rs.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing)을 참고하세요

Linux 환경 변수 설정:

![2. 환경 설치 – 5](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3. 배선 방법

전원은 최소 5V3A가 필요하며, 외부 서보 드라이버 보드에 연결하고 USB로 컴퓨터에 연결합니다

![3. 배선 방법 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4. 예제 데모

### **1. 서보 드라이버 보드의 포트 번호 확인**

- Windows 시스템은 보통 COM11이며, 서보 드라이버 보드의 포트 번호는 장치 관리자 또는 Feite 서보 상위 프로그램에서 찾을 수 있습니다

![1. 서보 드라이버 보드의 포트 번호 확인 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- Ubuntu 및 Linux 시스템은 보통 /dev/ttyACM0 입니다

명령줄로 서보 드라이버 보드의 포트 번호를 확인합니다:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

가상 머신에서 "ls /dev/ttyUSB* /dev/ttyACM*" 명령이 디렉터리를 찾지 못하면, 가상 머신 오른쪽 아래에 로봇핸드가 컴퓨터에 연결되어 있는지 확인하세요. 연결되어 있다면 해당 연결을 해제하고 가상 머신에 연결하세요.

![1. 서보 드라이버 보드의 포트 번호 확인 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2. 코드의 포트 번호 수정**

① AmazingHand-main\\Demo\\AHControl\\src 디렉터리 아래의 main.rs 코드 파일을 찾아 텍스트 편집기로 열고, 자신의 호스트에서 찾은 포트 번호로 수정합니다(Windows는 COM*, Ubuntu 및 Linux 시스템은 보통 /dev/ttyACM*)

![2. 코드의 포트 번호 수정 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

② 해당 인스턴스 파일 찾기

**오른손 로봇핸드** AmazingHand-main\\Demo 디렉터리 아래의 dataflow_tracking_real_right.yml

**왼손 로봇핸드** AmazingHand-main\\Demo 디렉터리 아래의 dataflow_tracking_real_left.yml

**양손 로봇핸드** AmazingHand-main\\Demo 디렉터리 아래의 dataflow_tracking_real_2hands.yml

텍스트 형식으로 열고 자신의 호스트에서 찾은 포트 번호로 수정합니다(Windows는 COM*, Ubuntu 및 Linux 시스템은 보통 /dev/ttyACM*)

![2. 코드의 포트 번호 수정 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![2. 코드의 포트 번호 수정 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![2. 코드의 포트 번호 수정 – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

### **3. 코드 배포**

- Demo 폴더 열기

Windows 시스템에서는 디렉터리에서 Powershell을 입력하고 Enter를 눌러 연 후, 데몬 프로세스를 시작합니다(매번):

Linux 시스템에서는 콘솔에서 바로 열고 데몬 프로세스를 시작합니다(매번):

```Plain Text
dora up
```

- 그다음 이 디렉터리에서 콘솔로 실행합니다(환경 구축 시 한 번 실행하면 됩니다!! 다시 실행하면 가상 환경이 덮어써집니다!!) 가상 환경 생성:

```Plain Text
uv venv --python 3.12
```

- 가상 환경 활성화(매번) 시스템에 따라 다음을 입력하여 실행합니다:

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![3. 코드 배포 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

콘솔이 가상 환경을 활성화했는지 확인하세요!

- 의존성 동기화를 실행하고 AHControl 폴더로 이동

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- 그다음 `cd ..` 를 입력하고 Enter를 눌러 Demo 디렉터리로 돌아갑니다! AHSimulation 폴더로 이동

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- 그다음 `cd ..` 를 입력하고 Enter를 눌러 Demo 디렉터리로 돌아갑니다! HandTracking 폴더로 이동

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. 실행 결과

- Demo 폴더를 엽니다! 디렉터리에서 Powershell을 입력하고 Enter를 눌러 연 후, 데몬 프로세스를 시작합니다(매번):

```Plain Text
dora up
```

- 가상 환경 활성화(매번) 시스템에 따라 입력하고 실행합니다:

Windows 플랫폼에서 가상 환경을 활성화하는 명령:

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux 플랫폼에서 가상 환경을 활성화하는 명령:

```Plain Text
source .venv/bin/activate
```

### 시뮬레이션 환경

- 시뮬레이션 환경에서만 웹캠 핸드 트래킹 데모를 실행합니다:

```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(Execute only once)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![시뮬레이션 환경 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![시뮬레이션 환경 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### 실제 하드웨어 실행(핸드 트래킹)

- 실제 하드웨어를 사용하여 웹캠 핸드 트래킹 데모를 실행합니다:

    #### 오른손 로봇핸드

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### 왼손 로봇핸드

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### 양손 로봇핸드(둘 다 하나의 서보 드라이버 보드에 연결되어 있음에 주의)

![실제 하드웨어 실행핸드 트래킹 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![실제 하드웨어 실행핸드 트래킹 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![실제 하드웨어 실행핸드 트래킹 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### 시뮬레이션 손가락 각도 제어 간단 예제

- 시뮬레이션에서 손가락 각도를 제어하는 간단한 예제를 실행합니다:

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![시뮬레이션 손가락 각도 제어 간단 예제 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![시뮬레이션 손가락 각도 제어 간단 예제 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

설명

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl)에는 모터를 제어하는 dora-rs 노드와 모터 구성용 유틸리티가 포함되어 있습니다.

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation)에는 손 동작을 시뮬레이션하고 역기구학을 구하는 dora-rs 노드가 포함되어 있습니다.

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking)에는 웹캠에서 손을 추적하고 이를 목표로 사용하여 AH를 제어하는 dora-rs 노드가 포함되어 있습니다!



## 주의사항

### 1. mediapipe 버전 문제

pyproject.toml에서 mediapipe>=0.10.14가 구성되어 있지만, 설치된 mediapipe 패키지에 solutions 서브모듈이 누락되어 있습니다. 대부분 mediapipe 버전이 Python 3.12과 호환되지 않거나(더 높은 버전의 mediapipe는 Python 3.12 지원에 문제가 있음), 설치 중 패키지 파일이 손상되었을 가능성이 있습니다.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Dora 버전 비호환, 메시지 형식(v0.7.0 vs v0.8.0)

![2. Dora 버전 비호환, 메시지 형식v0.7.0 vs v0.8.0 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

답: ① 먼저 C 드라이브 사용자 디렉터리의 .cargo/registry/src/github.xxxxxxxx/ 디렉터리에서 해당 의존성 패키지만 삭제하세요!

**`dora-message-0.7.0`**(핵심! 구버전 메시지 형식 폴더로 반드시 삭제해야 함)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16`(Dora의 의존 보조 라이브러리, 구버전과 함께 삭제)

② Demo/AHControl 폴더를 열고 Cargo.toml에서 dora-node-api="0.5.0" 와 dora-message="0.8.0" 을 수정합니다

③ 콘솔에서 AHControl 디렉터리로 이동하여 cargo build --release 를 다시 실행합니다

④ "[실제 하드웨어 실행](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug)"을 다시 따라 빌드합니다

실제 오류 보고 상황에 따라 해당 버전을 수정하세요. 예를 들어 dora-message가 0.6.0 버전을 요구하면 dora-node-api="0.4.0" dora-message="0.6.0" 으로 변경합니다.

![2. Dora 버전 비호환, 메시지 형식v0.7.0 vs v0.8.0 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![2. Dora 버전 비호환, 메시지 형식v0.7.0 vs v0.8.0 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3. openCV 의존 라이브러리 없음

![3. openCV 의존 라이브러리 없음 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

HandTracking 디렉터리에서 다음 명령을 입력합니다

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. 카메라 권한 켜기(컴퓨터)

![4. 카메라 권한 켜기컴퓨터 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![4. 카메라 권한 켜기컴퓨터 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![4. 카메라 권한 켜기컴퓨터 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5. 가상 머신 22.04에서 카메라 호출

https://blog.csdn.net/qq_19731521/article/details/124954288 참고

### 6. 데스크톱 카메라 설치

#### 환경 카메라 키트 브래킷 설치 단계

1. 먼저 미세 조정 각도 브래킷을 고정합니다

![환경 카메라 키트 브래킷 설치 단계 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2. 측면 보기 환경 카메라 키트

![환경 카메라 키트 브래킷 설치 단계 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)




## 가상 머신 22.04에서 핸드 트래킹 직접 실행

다음 네 파일을 다운로드하여 동일한 영문 디렉터리에 배치한 후, 가상 머신 소프트웨어로 .ovf 파일을 직접 열어 시스템에 진입합니다

비밀번호 ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1. Demo 디렉터리에서 콘솔 열기:**

```Plain Text
dora up
```

**가상 환경 활성화:**

```Plain Text
source .venv/bin/activate
```

**2. 가상 머신 카메라 권한 호출**

가상 머신 22.04에서 카메라 호출 참고 https://blog.csdn.net/qq_19731521/article/details/124954288

**3. 명령줄로 서보 드라이버 보드의 포트 확인:**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. 코드 파일의 포트 번호 수정**

① AmazingHand-main\\Demo\\AHControl\\src 디렉터리 아래의 main.rs 코드 파일을 찾아 텍스트 형식으로 열고, 자신의 호스트에서 찾은 포트 번호로 수정합니다(Windows는 COM*, Ubuntu 및 Linux 시스템은 보통 /dev/ttyACM*)

![가상 머신 22.04에서 핸드 트래킹 직접 실행 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

② 해당 인스턴스 파일 찾기

**오른손 로봇핸드** AmazingHand-main\\Demo 디렉터리 아래의 dataflow_tracking_real_right.yml

**왼손 로봇핸드** AmazingHand-main\\Demo 디렉터리 아래의 dataflow_tracking_real_left.yml

**양손 로봇핸드** AmazingHand-main\\Demo 디렉터리 아래의 dataflow_tracking_real_2hands.yml 파일

텍스트 형식으로 열고 자신의 호스트에서 찾은 포트 번호로 수정합니다(Windows는 COM*, Ubuntu 및 Linux 시스템은 보통 /dev/ttyACM*)

![가상 머신 22.04에서 핸드 트래킹 직접 실행 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![가상 머신 22.04에서 핸드 트래킹 직접 실행 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![가상 머신 22.04에서 핸드 트래킹 직접 실행 – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5. 오른손 핸드 트래킹 실행**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```

<RelatedProducts slugs="amazinghand,servo-driver-board" />
