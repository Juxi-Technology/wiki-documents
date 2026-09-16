---
title: "Windows 원클릭 배포 실행"
description: "본 튜토리얼은 AmazingHand(Pollen Robotics 로봇 손) 공식 Demo를 기반으로 하며, 원클릭 배포 스크립트가 이미 준비되어 있습니다."
---

# Windows 원클릭 배포 실행

[AmazingHand-main.zip](/downloads/AmazingHand-main.zip)

본 튜토리얼은 AmazingHand(Pollen Robotics 로봇 손) 공식 Demo를 기반으로 하며, 원클릭 배포 스크립트가 이미 준비되어 있습니다.
번호 순서대로 실행하면 됩니다. **모든 스크립트는 ****`Demo\Windows一键部署脚本\`**** 폴더에 있으며, 바로 두 번 클릭하여 실행합니다.**

---

## 하드웨어 준비

> 모델 파일은 [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e)에서 보거나 직접 다운로드할 수 있습니다(URDF 포함).
> 
> 

---

## 환경 설치(스크립트 1)

**`1-安装环境.bat`를 두 번 클릭**하면 자동으로 완료됩니다:

1. **MSVC 빌드 도구 확인**(cl.exe) —— Rust 컴파일에 필수. 없으면 설치를 안내합니다
Visual Studio 2022 Build Tools, "C++를 사용한 데스크톱 개발"을 체크하고, 설치 후 터미널을 다시 엽니다.

2. **Rust 설치**(rustup + stable-msvc 툴체인)

3. **cargo 칭화 미러 소스 설정**(`C:\Users\你的用户名.cargo\config.toml`), crate 다운로드 가속

4. **uv 설치**(Python 패키지 관리자)

5. **dora-cli 0.5.0 설치**(`cargo install`, 최초 컴파일 약 10~20분, 인내심을 가지고 기다리세요)

6. **dora-rs pip 패키지 설치**(선택 사항, 가상환경에 설치됨)

> **중요**: 스크립트 종료 후 **터미널을 닫고 다시 열어** 환경 변수를 적용하세요. 설치 과정은 네트워크 상태에 따라 느릴 수 있으니 인내심을 가지고 기다리고, 중간에 닫지 마세요.
> 
> 

### 수동 설치 대안(스크립트를 사용할 수 없을 때)

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - Windows는 rustup-init.exe 사용, 기본 MSVC 툴체인 선택

    - 환경 변수: `%USERPROFILE%.cargo\bin`을 PATH에 추가

- **uv**: PowerShell에서 `irm ``https://astral.sh/uv/install.ps1`` | iex` 실행

    - 환경 변수: `%USERPROFILE%.local\bin`을 PATH에 추가

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### cargo 칭화 미러 설정（~/.cargo/config.toml）

```Bash
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> **sparse 희소 인덱스**를 사용하고(위와 같이), git 저장소 미러는 사용하지 마세요——git 방식은 최초에 약 1GB 인덱스를 다운로드해야 하므로 `Updating 'tuna' index`에서 멈추기 쉽습니다.
> 
> 

---

## 배선 방식

- 서보 드라이버 보드 USB를 컴퓨터에 연결, **외부 5V4A 전원**

- 컴퓨터에서 포트 번호 확인: **장치 관리자 → 포트(COM 및 LPT)**, 예: `COM11`

---

## 시리얼 포트 설정(스크립트 2)

**`2-配置串口.bat`를 두 번 클릭**(실제 로직은 `2-配置串口.ps1`):

1. "서보 드라이버 보드를 컴퓨터에 연결하세요"라고 표시 → Enter를 누르면 감지 시작

2. 감지된 COM 포트를 자동으로 나열(장치 이름 포함)

3. 포트가 하나면 Enter로 확인, 여러 개면 번호를 입력

4. dataflow yml 3개의 `--serialport`와 `AHControl\src\main.rs`의 기본 포트를 자동으로 기록

5. 원본 파일은 자동으로 `.bak`으로 백업

> USB를 다시 꽂으면 포트 번호가 바뀔 수 있으므로 이 스크립트를 다시 실행해야 합니다.
> 
> 

---

## 코드 배포(스크립트 3)

**`3-部署代码.bat`를 두 번 클릭**하면 자동으로 완료됩니다:

1. dora 데몬 시작(`dora up`)

2. Python 3.12 가상환경 생성(`uv venv --python 3.12`)

3. 가상환경 활성화

4. AHControl Rust 노드 컴파일(`cargo build --release`, 최초 약 10분)

5. AHSimulation, HandTracking 의존성 동기화(`uv sync`)

6. mediapipe==0.10.14 강제 설치

> 배포는 한 번만 실행하면 됩니다. 이후 다시 실행하면 가상환경을 재구성할지 묻습니다.
> 
> 

---

## 코드 실행(스크립트 4)

**`4-运行代码.bat`를 두 번 클릭**하면 대화형 메뉴가 나타납니다:

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- **1** 선택: 시뮬레이션 환경, 카메라 제스처로 두 개의 시뮬레이션 손 구동

- **2** 선택: 하위 메뉴로 진입, 오른손 / 왼손 / 양손 선택

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

선택 후 자동으로 `dora build` + `dora run`을 실행합니다. 카메라 창이 뜨면 카메라를 향해 제스처를 취하고, 로봇 손이 실시간으로 추종합니다. **Ctrl+C 정지**, 데이터플로우 종료 후 Enter를 누르면 메인 메뉴로 돌아가며, 다른 모드를 다시 선택하거나 `q`로 종료할 수 있습니다.

> 최초 실행 시 Windows가 카메라 권한을 차단할 수 있으니 "허용"을 클릭하면 됩니다.
> 
> 

---

## 프로젝트 정리(스크립트 0)

**`0-清理项目.bat`를 두 번 클릭**하고 `Y`를 입력하여 확인하면 자동으로 정리됩니다:

1. dora 데몬 정지

2. 가상환경 3개 삭제(`.venv`)

3. Rust 컴파일 산출물 삭제(`Demo\target`)

4. `pycache`, `.bak` 백업, 로그, `Demo\out`(dora 로그 디렉터리) 삭제

5. **기본 포트 복원**(`--serialport /dev/ttyACM0`), 로컬 시리얼 포트 잔여 정보 제거

> 정리 후에는 전체 `AmazingHand-main` 폴더를 다른 사람에게 복사해 줄 수 있으며, 잔여물 없이 깨끗합니다. 새 컴퓨터에서는 1 → 2 → 3 → 4 순서대로 실행하면 됩니다.
> 
> 

---

## 자주 묻는 질문과 주의 사항

### 8.1 cargo가 `Updating 'tuna' index`에서 멈춤

- 원인: 미러 설정이 **git 저장소 방식**(`.../git/crates.io-index.git`)을 사용하여 최초에 1GB+ 인덱스를 다운로드해야 함

- 해결: `C:\Users\你的用户名.cargo\config.toml`을 **sparse 희소 인덱스**로 변경(2.2절 참조), 또는 `1-安装环境.bat`를 다시 실행

### 8.2 mediapipe에 solutions 하위 모듈 누락 / 설치 손상

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- 반드시 가상환경이 활성화된 상태에서 실행(`Demo` 디렉터리에서)

- `3-部署代码.bat`가 이미 이 단계를 자동으로 처리(안전장치)

### 8.3 dora 버전 비호환(message v0.8.0 vs v0.7.0)

- 증상: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 원인: dora-cli 버전이 dora-node-api와 일치하지 않음. **반드시 0.5.0으로 통일**

    - 확인: `dora --version`은 `dora-cli 0.5.0`, `dora-message: 0.8.0`을 출력해야 함

    - 수정: `cargo install dora-cli --version 0.5.0 --force`

    - PATH에 여러 dora가 있는 경우(예: `C:\Users\xxx.dora\bin`의 구버전), `.cargo\bin`이 앞에 오도록 하거나 구버전을 삭제

### 8.4 MuJoCo / mediapipe 모델 로드 실패(중국어 경로)

- 증상: `ParseXML: Error opening file '...\scene.xml'` 또는 `Can't find file: ....tflite`

- 원인: MuJoCo 3.x / mediapipe의 C++ 로더가 Windows에서 **중국어가 포함된 절대 경로를 열 수 없음**(예: `D:\Claude工作区...`)

- 본 프로젝트에는 이미 수정 사항이 내장되어 있음:

    - `AHSimulation\AHSimulation\mj_mink_*.py`는 모델 로드 전에 작업 디렉터리를 전환

    - `HandTracking\mediapipe_patch.py`는 8.3 단축 경로 + 상대 경로로 우회

- 이 수정 코드를 삭제하지 마세요

### 8.5 카메라 권한

- 최초 실행 시 팝업에서 "허용" 선택

- 설정 → 개인 정보 → 카메라 → 데스크톱 앱 액세스 허용

### 8.6 포트 번호가 매번 변경됨

- USB를 다시 꽂으면 COM 번호가 바뀔 수 있으므로 `2-配置串口.bat`를 다시 실행

### 8.7 openCV 누락

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（`HandTracking` 디렉터리에서, 가상환경 활성화 후 실행）

---

## 코드 구조 설명

### Demo 디렉터리

### 각 dataflow 대응 관계

### 데이터플로우 원리

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### 포트 설정 위치

- `dataflow_tracking_real_*.yml` 3개의 `args:` 행: `--serialport COMxx`

- `AHControl\src\main.rs`의 `default_value = "COMxx"`(시리얼 파라미터 기본값)

- `AHControl\config\*.toml`: 서보 모델, ID, 오프셋(일반적으로 수정 불필요)

