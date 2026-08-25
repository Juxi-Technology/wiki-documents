---
title: 로봇핸드 공식 예제 실행 튜토리얼
description: "본 튜토리얼에 첨부된 코드 압축 패키지를 다운로드하여 데모를 진행하거나, 공식 오픈소스 코드 저장소 https://github.com/pollen-robotics/AmazingHand.git 를 클론하세요. 공식 코드에는 오류가 있을 수 있으니 주의하세요."
---

# 로봇핸드 공식 예제 실행 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/amazinghand)**


## 1.코드 다운로드

본 튜토리얼에 첨부된 코드 압축 패키지를 다운로드하여 데모를 진행하거나, 공식 오픈소스 코드 저장소 https://github.com/pollen-robotics/AmazingHand.git 를 클론하세요. 공식 코드에는 오류가 있을 수 있으니 주의하세요.

Windows 코드 압축 패키지
[AmazingHand-main.zip]

Linux 코드 압축 패키지
[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2.환경 설치

시스템에 따라 Rust, uv, dora-rs 설치

**1, Rust 설치:** https://www.rust-lang.org/tools/install
Windows Rust 환경변수 설정(중요!) 참고 https://zhuanlan.zhihu.com/p/1933164131969659101
Linux 환경변수 설정:





최초 설치 시 Visual Studio Installer가 필요할 수 있습니다

**Cargo 미러 소스 설정**

`.cargo` 폴더에 `config.toml` 설정 파일을 만들고, 칭화(Tsinghua) `crates.io-index` 미러를 설정합니다. Cargo가 칭화 미러 소스로 크레이트를 다운로드합니다.

```Bash
[source.crates-io]
replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2, uv 설치:** https://docs.astral.sh/uv/getting-started/installation/
Windows에서는 Powershell 터미널을 열고 복사 후 이 명령을 입력하여 설치합니다
**Linux 환경변수 설정:**



**3, dora-rs 설치:** https://dora-rs.ai/docs/guides/Installation/installing 참고하여 다운로드·설치
Linux 환경변수 설정:



## 3.배선 방법

전원은 최소 5V3A 필요. 외장 서보 드라이버 보드를 연결하고 USB로 PC에 연결



## 4.예제 데모

### **1, 서보 드라이버 보드 포트 번호 확인**

- windows 시스템은 보통 COM11. 장치 관리자 또는 Feetech 서보 상위 프로그램에서 서보 드라이버 보드 포트 번호 확인



- Ubuntu, Linux 시스템은 보통 /dev/ttyACM0
명령줄로 서보 드라이버 보드 포트 확인:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

가상 머신에서 ls /dev/ttyUSB* /dev/ttyACM*로 디렉터리를 찾지 못하면, 가상 머신 오른쪽 아래 아이콘으로 로봇핸드가 PC에 연결되어 있는지 확인하세요. 연결되어 있다면 해제하고 가상 머신에 연결하세요



### **2, 코드의 포트 번호 수정**

①AmazingHand-main\Demo\AHControl\src 디렉터리의 main.rs 코드 파일을 텍스트로 열어, 자신의 호스트에서 찾은 포트 번호로 수정(windows는 COM*, ubuntu, linux 시스템은 보통 /dev/ttyACM*)



②해당 인스턴스 파일 찾기
**오른손** AmazingHand-main\Demo 디렉터리의 dataflow_tracking_real_right.yml
**왼손** AmazingHand-main\Demo 디렉터리의 dataflow_tracking_real_left.yml
**양손** AmazingHand-main\Demo 디렉터리의 dataflow_tracking_real_2hands.yml

텍스트로 열어, 자신의 호스트에서 찾은 포트 번호로 수정(windows는 COM*, ubuntu, linux 시스템은 보통 /dev/ttyACM*)







### **3, 코드 배포**

- Demo 폴더 열기



- Windows 시스템은 디렉터리에서 Powershell 입력 후 Enter로 열기



- 데몬 프로세스 시작(매번 필요):
Linux 시스템은 콘솔에서 바로 열어 데몬 프로세스 시작(매번 필요):
```Plain Text
dora up
```

- 그다음 콘솔에서 이 디렉터리에서 실행(환경 구축 시 한 번 실행했다면 불필요!! 다시 실행하면 가상 환경이 덮어써집니다!!) 가상 환경 생성:
```Plain Text
uv venv --python 3.12
```

- 가상 환경 활성화(매번 필요) 시스템에 따라 입력·실행:
```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```



콘솔이 가상 환경을 활성화했는지 확인하세요!

- 의존성 동기화 실행, AHControl 폴더로 이동
```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- 그다음 `cd ..` 입력 후 Enter로 Demo 디렉터리로 복귀! AHSimulation 폴더로 이동
```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- 그다음 `cd ..` 입력 후 Enter로 Demo 디렉터리로 복귀! HandTracking 폴더로 이동
```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4, 실행 결과

- Demo 폴더 열기! 디렉터리에서 Powershell 입력 후 Enter로 열고 데몬 프로세스 시작(매번 필요):
```Plain Text
dora up
```

- 가상 환경 활성화(매번 필요) 시스템에 따라 입력·실행:
Windows 가상 환경 활성화 명령:
```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux 가상 환경 활성화 명령:
```Plain Text
source .venv/bin/activate
```

### 시뮬레이션 환경

- 시뮬레이션 환경에서만 네트워크 카메라 핸드 트래킹 데모 실행:
```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(한 번만 실행)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```





### 실제 하드웨어 실행(핸드 트래킹)

- 실제 하드웨어에서 네트워크 카메라 핸드 트래킹 데모 실행:
    #### 오른손
    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(한 번만 실행)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### 왼손
    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(한 번만 실행)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### 양손(둘 다 하나의 서보 드라이버 보드에 연결하는 것에 주의)



    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(한 번만 실행)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```





### 간단한 예제로 시뮬레이션 손가락 각도 제어

- 시뮬레이션의 손가락 각도를 제어하는 간단한 예제 실행:
    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(한 번만 실행)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```





설명
- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl)에는 모터를 제어하는 dora-rs 노드와 모터 설정용 유틸리티 도구가 포함되어 있습니다.
- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation)에는 손의 움직임을 시뮬레이션하고 역운동학을 구하는 dora-rs 노드가 포함되어 있습니다.
- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking)에는 네트워크 카메라에서 손을 추적하여 AH!의 제어 대상으로 사용하는 dora-rs 노드가 포함되어 있습니다.

## 주의사항

### 1, mediapipe 버전 문제

pyproject.toml에서 mediapipe>=0.10.14를 설정했지만 설치된 mediapipe 패키지에 solutions 서브모듈이 없다면, mediapipe 버전과 Python 3.12의 비호환(높은 버전의 mediapipe는 Python 3.12 지원에 문제가 있음) 또는 설치 중 패키지 파일 손상일 가능성이 높습니다.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2, Dora 버전 비호환, 메시지 형식(v0.7.0 vs v0.8.0)



답: ①먼저 C 드라이브 사용자 디렉터리의 .cargo/registry/src/github.xxxxxxxx/ 에서 해당 의존 패키지만 삭제하세요!
**`dora-message-0.7.0`**(가장 중요! 구버전 메시지 형식 폴더, 반드시 삭제)
`dora-core-0.4.1`
`dora-node-api-0.4.1`
`dora-arrow-convert-0.4.1`
`dora-metrics-0.4.1`
`dora-tracing-0.4.1`
`const-random-macro-0.1.16`(Dora 의존 보조 라이브러리, 구버전과 함께 삭제)

②Demo/AHControl 폴더를 열어 Cargo.toml의 dora-node-api="0.5.0" dora-message="0.8.0" 변경
③콘솔에서 AHControl 디렉터리로 이동해 cargo build --release 재실행
④[실제 하드웨어 실행](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg?node-id=1759567650651511609&from=from_node_link)에 따라 다시 build
실제 오류 내용에 따라 버전을 수정합니다. 예: dora-message가 0.6.0 필요하면 dora-node-api="0.4.0" dora-message="0.6.0"로 변경





### 3, openCV 의존 라이브러리 없음



HandTracking 디렉터리에서 다음 명령 입력
```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4, 카메라 권한 켜기(PC 쪽)







### 5, 가상 머신22.04에서 카메라 호출

https://blog.csdn.net/qq_19731521/article/details/124954288 참고

### 6, 데스크톱 카메라 설치

#### 환경 카메라 키트 브래킷 설치 단계

1.먼저 미세 조정 각도 브래킷 고정



2.측면 환경 카메라 키트



## 가상 머신22.04에서 직접 핸드 트래킹 실행

아래 네 파일을 다운로드하여 같은 영문 디렉터리에 두고, 가상 머신 소프트웨어로 .ovf 파일을 직접 열어 시스템에 진입
비밀번호 ubuntu
[ubuntu22.04_amazinghand.ovf]
[ubuntu22.04_amazinghand-disk1.vmdk]
[ubuntu22.04_amazinghand.mf]
[ubuntu22.04_amazinghand-file1.iso]

**1.Demo 디렉터리에서 콘솔 열기:**
```Plain Text
dora up
```

**가상 환경 활성화:**
```Plain Text
source .venv/bin/activate
```

**2.가상 머신 카메라 호출 권한**
가상 머신22.04에서 카메라 호출은 https://blog.csdn.net/qq_19731521/article/details/124954288 참고

**3.명령줄로 서보 드라이버 보드 포트 확인:**
```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4.코드 파일 포트 번호 수정**
①AmazingHand-main\Demo\AHControl\src 디렉터리의 main.rs 코드 파일을 텍스트로 열어, 자신의 호스트에서 찾은 포트 번호로 수정(windows는 COM*, ubuntu, linux 시스템은 보통 /dev/ttyACM*)



②해당 인스턴스 파일 찾기
**오른손** AmazingHand-main\Demo 디렉터리의 dataflow_tracking_real_right.yml
**왼손** AmazingHand-main\Demo 디렉터리의 dataflow_tracking_real_left.yml
**양손** AmazingHand-main\Demo 디렉터리의 dataflow_tracking_real_2hands.yml

텍스트로 열어, 자신의 호스트에서 찾은 포트 번호로 수정(windows는 COM*, ubuntu, linux 시스템은 보통 /dev/ttyACM*)







**5.오른손 핸드 트래킹 실행**
```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
