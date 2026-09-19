---
title: "Mac 원클릭 배포 실행"
description: "AmazingHand 제스처 추적 원클릭 배포(macOS). 터미널에서 실행 권한을 준 뒤 스크립트를 실행하고, 카메라 제스처로 로봇 손을 구동합니다."
---

# Mac 원클릭 배포 실행

AmazingHand-main.zip

본 튜토리얼은 AmazingHand(Pollen Robotics 로봇 손) 공식 Demo를 기반으로 하며, 원클릭 배포 스크립트가 이미 준비되어 있습니다. 번호 순서대로 실행하면 됩니다. **모든 스크립트는 Demo/Mac一键部署脚本/ 폴더에 있으며, 터미널에서 ./스크립트이름으로 실행합니다.**

---

## 하드웨어 준비

|하드웨어|요구 사항|
|---|---|
|로봇 손 본체|오른손 / 왼손 / 양손|
|서보 드라이버 보드|외부 연결, USB로 컴퓨터에 연결|
|전원|**최소 5V 4A**(USB 전원은 부족, 반드시 외부 전원 필요)|
|카메라|Mac 내장 카메라 또는 USB 카메라|

> 모델 파일은 [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e)에서 보거나 다운로드할 수 있습니다(URDF 포함).
> 
> 

---

## 스크립트 실행 권한 얻기(중요)

**스크립트를 Windows / 압축 파일에서 Mac으로 복사하면 실행 권한(****`+x`****)이 사라지고, 그대로 실행하면
****`Permission denied`****가 발생합니다. 처음 사용하기 전에 반드시 먼저 실행해야 합니다:**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

이후 각 스크립트를 `./스크립트이름`으로 실행할 수 있습니다.

> 팁: `AmazingHand-main`을 Mac으로 복사할 때는 **tar**를 사용하면 권한을 가장 안정적으로 보존할 수 있습니다:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, 또는 압축 해제 후 `chmod +x *.sh`를 한 번 일괄 실행하세요.
> 
> 

---

## 환경 설치(스크립트 1)

터미널에서 스크립트 디렉터리로 이동하여 실행합니다(위 2단계의 `chmod +x`를 이미 수행했는지 확인):

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

자동으로 완료됩니다:

1. **Xcode 명령줄 도구 확인**(Rust 컴파일 필수). 없으면 `xcode-select --install`을 안내

2. **Rust 설치**(rustup + stable 툴체인)

3. **cargo 칭화 미러 소스 설정**(`~/.cargo/config.toml`), crate 다운로드 가속

4. **uv 설치**(Python 패키지 관리자)

5. **dora-cli 0.5.0 설치**(`cargo install`, 최초 컴파일 약 10~20분, 인내심을 가지고 기다리세요). 구버전 dora 자동 정리

6. **dora-rs pip 패키지 설치**(선택 사항)

> **중요**: 스크립트 종료 후 **터미널을 닫고 다시 열어** 환경 변수를 적용하세요. 버전 번호가 비어 있으면 다음 경로를 `~/.zshrc`에 추가하세요:
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### 수동 설치 대안(스크립트를 사용할 수 없을 때)

- **Xcode 명령줄 도구**: `xcode-select --install`

- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**: `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### cargo 칭화 미러（~/.cargo/config.toml）

```Plain Text
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

- macOS의 USB 시리얼 장치 이름은 **/dev/tty.usbmodem\*** 또는 **/dev/cu.usbmodem\***(Linux의 `/dev/ttyACM*`가 아님)

- 포트 확인:

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## 시리얼 포트 설정(스크립트 2)

**`./2-配置串口.sh` 실행**:

1. "서보 드라이버 보드를 컴퓨터에 연결하세요"라고 표시 → Enter를 누르면 감지 시작

2. 감지된 시리얼 포트를 자동으로 나열(`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`)

3. 포트가 하나면 Enter로 확인, 여러 개면 번호를 입력

4. dataflow yml 3개의 `--serialport`와 `AHControl/src/main.rs`의 기본 포트를 자동으로 기록

5. macOS의 USB 시리얼은 일반적으로 사용자가 읽기/쓰기 가능; 권한이 없다고 표시되면 수동으로 실행:

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

또는 **시스템 설정 → 개인 정보 보호 및 보안 → 입력 모니터링**에서 터미널 접근을 허용하세요.

> 가상 머신에 있는 경우 USB 장치를 가상 머신에 연결하세요.
> 
> 

---

## 코드 배포(스크립트 3)

**`./3-部署代码.sh` 실행**, 자동으로 완료됩니다:

1. dora 데몬 시작(`dora up`)

2. Python 3.12 가상환경 생성(`uv venv --python 3.12`)

3. 가상환경 활성화

4. AHControl Rust 노드 컴파일(`cargo build --release`, 최초 약 10분)

5. AHSimulation, HandTracking 의존성 동기화(`uv sync`)

6. mediapipe==0.10.14 강제 설치(튜토리얼에서 알려진 문제, 안전장치)

> 배포는 한 번만 실행하면 됩니다. 이후 다시 실행하면 가상환경을 재구성할지 묻습니다.
> 
> 

---

## 코드 실행(스크립트 4)

**`./4-运行代码.sh` 실행**, 대화형 메뉴가 나타납니다:

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

선택 후 자동으로 `dora build` + `dora run`을 실행합니다. 카메라 창이 뜨면 카메라를 향해 제스처를 취하고, 로봇 손이 실시간으로 추종합니다. **Ctrl+C 정지**, 데이터플로우 종료 후 Enter를 누르면 메인 메뉴로 돌아가며, 다른 모드를 다시 선택하거나 q로 종료할 수 있습니다.

> **최초 실행 시 macOS가 카메라 권한을 요청하는 팝업을 표시합니다**: 시스템 설정 → 개인 정보 보호 및 보안 → 카메라, 터미널의 카메라 사용을 허용하세요.
> 
> 

---

## 프로젝트 정리(스크립트 0)

**`./0-清理项目.sh` 실행**, Y를 입력하여 확인하면 자동으로 정리됩니다:

1. dora 데몬 정지

2. 가상환경 3개 삭제(`.venv`)

3. Rust 컴파일 산출물 삭제(`Demo/target`)

4. `__pycache__`, `.bak` 백업, 로그, `Demo/out`(dora 로그 디렉터리) 삭제

5. **기본 포트 복원**(`--serialport /dev/ttyACM0`), 로컬 시리얼 포트 잔여 정보 제거

> 정리 후에는 전체 `AmazingHand-main` 폴더를 다른 사람에게 복사해 줄 수 있으며, 잔여물 없이 깨끗합니다. 새 컴퓨터에서는 1 → 2 → 3 → 4 순서대로 실행하면 됩니다.
> 
> 

---

## 자주 묻는 질문과 주의 사항

### 9.1 `Permission denied`(스크립트에 실행 권한이 없음)

- 증상: `./1-安装环境.sh` 실행 시 `bash: ./1-安装环境.sh: Permission denied` 발생

- 원인: 스크립트를 Windows / 압축 파일에서 Mac으로 복사한 후 **실행 비트 손실**

- 해결:

```Plain Text
chmod +x *.sh
```

### 9.2 cargo가 `Updating 'tuna' index`에서 멈춤

- 원인: 미러 설정이 **git 저장소 방식**(`.../git/crates.io-index.git`)을 사용하여 최초에 1GB+ 인덱스를 다운로드해야 함

- 해결: `~/.cargo/config.toml`을 **sparse 희소 인덱스**로 변경(3.2절 참조), 또는 `1-安装环境.sh`를 다시 실행

### 9.3 mediapipe에 solutions 하위 모듈 누락 / 설치 손상

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- 반드시 가상환경이 활성화된 상태에서 실행(Demo 디렉터리에서)

- `3-部署代码.sh`가 이미 이 단계를 자동으로 처리(안전장치)

### 9.4 dora 버전 비호환(message v0.8.0 vs v0.7.0)

- 증상: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 원인: dora-cli 버전이 dora-node-api와 일치하지 않음. **반드시 0.5.0으로 통일**

    - 확인: `dora --version`은 `dora-cli 0.5.0`, `dora-message: 0.8.0`을 출력해야 함

    - `1-安装环境.sh`는 구버전을 자동 감지하여 강제 재설치

**시스템에 구버전 dora(예: 0.4.1)가 남아 있으면 먼저 수동으로 정리하세요:**

```Bash
# 1. 구버전 dora 찾기
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. 찾은 구버전 삭제 (실제 경로대로)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. 0.5.0 강제 설치
cargo install dora-cli --version 0.5.0 --force

# 4. 버전 확인 (dora-cli 0.5.0 / dora-message: 0.8.0이 출력되어야 함)
dora --version
```

> `dora --version`이 여전히 구버전을 표시하면 PATH에 다른 구버전 dora가 있다는 뜻이므로, which dora로 하나씩 찾아 삭제하세요.
> 
> 

### 9.5 시리얼 포트 권한 없음

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- 또는 **시스템 설정 → 개인 정보 보호 및 보안 → 입력 모니터링** → 터미널 허용

- `tty.*` 장치를 사용하는 경우 읽을 수 없으면 해당하는 `cu.*` 장치로 변경하세요(cu 장치는 읽기 전용 포트로 직접 제어에 더 적합)

### 9.6 카메라 권한

- **최초 실행 시 팝업에서 "허용"을 선택**하거나, **시스템 설정 → 개인 정보 보호 및 보안 → 카메라**에서 터미널의 카메라 사용을 허용하세요

- 카메라가 다른 앱(FaceTime, 회의 소프트웨어)에 의해 점유되지 않았는지 확인

### 9.7 포트 번호가 매번 변경됨

- USB를 다시 꽂으면 장치 이름이 바뀔 수 있으므로 `2-配置串口.sh`를 다시 실행

### 9.8 openCV 누락

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（`HandTracking` 디렉터리에서, 가상환경 활성화 후 실행）

### 9.9 Apple Silicon 컴파일이 느림 / 최초 실행 시 Gatekeeper 차단

- Apple Silicon에서 최초 `cargo build`로 dora 의존성을 컴파일하는 것이 느린 것은 정상이므로 인내심을 가지고 기다리세요

- "개발자를 확인할 수 없음"이 표시되면: 시스템 설정 → 개인 정보 보호 및 보안 → 그래도 열기

---

## 코드 구조 설명

### Demo 디렉터리

|디렉터리/파일|설명|
|---|---|
|AHControl|Rust 노드, 서보 모터 제어. src/main.rs가 진입점|
|AHSimulation|Python 노드, MuJoCo 시뮬레이션 + 역기구학(mink)|
|HandTracking|Python 노드, MediaPipe 손 추적|
|dataflow_\*.yml|dora 데이터플로우 정의(노드 연결 그래프)|
|Mac一键部署脚本|본 원클릭 스크립트 세트|

### 각 dataflow 대응 관계

|파일|용도|
|---|---|
|dataflow_tracking_simu.yml|시뮬레이션 환경, 카메라 제스처 → 시뮬레이션 양손|
|dataflow_tracking_real_right.yml|실제 하드웨어 오른손|
|dataflow_tracking_real_left.yml|실제 하드웨어 왼손|
|dataflow_tracking_real_2hands.yml|실제 하드웨어 양손(동일 드라이버 보드에 연결)|

### 데이터플로우 원리

```Bash
카메라 → HandTracking(MediaPipe 제스처 인식)
              ↓ 손 키포인트 좌표
         AHSimulation(MuJoCo 시뮬레이션 + 역기구학)
              ↓ 관절 목표 각도
         AHControl(시리얼 → 서보 드라이버 보드 → 로봇 손)
```

### 포트 설정 위치

- `dataflow_tracking_real_*.yml` 3개의 `args:` 행: `--serialport /dev/cu.usbmodem...`

- `AHControl/src/main.rs`의 `default_value`(시리얼 파라미터 기본값)

- `AHControl/config/*.toml`: 서보 모델, ID, 오프셋(일반적으로 수정 불필요)



