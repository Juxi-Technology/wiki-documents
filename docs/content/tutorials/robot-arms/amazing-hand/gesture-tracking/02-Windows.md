---
title: "Windows One-Click Deployment and Run"
description: "AmazingHand gesture-tracking one-click deployment on Windows: double-click the numbered scripts, then control the simulated or real hand with camera gestures."
---

# Windows One-Click Deployment and Run

[AmazingHand-main.zip](/downloads/AmazingHand-main.zip)

This tutorial is based on the official AmazingHand (Pollen Robotics dexterous hand) Demo, with one-click deployment scripts already prepared.
Just execute them in numerical order. **All scripts are located in the ****`Demo\Windows一键部署脚本\`**** folder — simply double-click to run them.**

---

## Hardware Preparation

> The model files can be viewed or downloaded yourself on [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (URDF included).
> 
> 

---

## Environment Setup (Script 1)

**Double-click ****`1-安装环境.bat`**, which automatically performs:

1. **Checks the MSVC build tools** (cl.exe) — required for Rust compilation. When missing, it prompts you to install
Visual Studio 2022 Build Tools, check "Desktop development with C++", and reopen the terminal after installation.

2. **Installs Rust** (rustup + stable-msvc toolchain)

3. **Configures the Tsinghua cargo mirror** (`C:\Users\your-username.cargo\config.toml`) to speed up crate downloads

4. **Installs uv** (Python package manager)

5. **Installs dora-cli 0.5.0** (`cargo install`; the first compilation takes about 10~20 minutes, so please be patient)

6. **Installs the dora-rs pip package** (optional; it will be installed into the virtual environment)

> **Important**: after the script finishes, **close and reopen the terminal** so the environment variables take effect. The installation may be slow due to the network — please be patient and do not close it midway.
> 
> 

### Manual Installation Alternative (When the Script Is Unavailable)

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - On Windows, use rustup-init.exe and select the default MSVC toolchain

    - Environment variable: add `%USERPROFILE%.cargo\bin` to PATH

- **uv**: run `irm ``https://astral.sh/uv/install.ps1`` | iex` in PowerShell

    - Environment variable: add `%USERPROFILE%.local\bin` to PATH

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Tsinghua cargo Mirror Settings (~/.cargo/config.toml)

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

> Use the **sparse index** (as shown above), not a git repository mirror — the git method has to download about 1GB of index on first use and can easily hang at `Updating 'tuna' index`.
> 
> 

---

## Wiring

- Connect the servo driver board to the computer via USB, with an **external 5V4A power supply**

- Find the port number on the computer: **Device Manager → Ports (COM & LPT)**, such as `COM11`

---

## Configure the Serial Port (Script 2)

**Double-click ****`2-配置串口.bat`** (the actual logic is in `2-配置串口.ps1`):

1. Prompts "please connect the servo driver board to the computer" → press Enter to start detection

2. Automatically lists the detected COM ports (with device names)

3. Press Enter to confirm when there is a single port; enter the number when there are multiple ports

4. Automatically writes the default port into the `--serialport` of the 3 dataflow yml files and into `AHControl\src\main.rs`

5. The original files are automatically backed up as `.bak`

> If you replug the USB cable, the port number may change, and you need to run this script again.
> 
> 

---

## Code Deployment (Script 3)

**Double-click ****`3-部署代码.bat`**, which automatically performs:

1. Starts the dora daemon (`dora up`)

2. Creates a Python 3.12 virtual environment (`uv venv --python 3.12`)

3. Activates the virtual environment

4. Compiles the AHControl Rust node (`cargo build --release`, about 10 minutes the first time)

5. Syncs the AHSimulation and HandTracking dependencies (`uv sync`)

6. Force-installs mediapipe==0.10.14

> Deployment only needs to be run once. Running it again afterwards will prompt whether to rebuild the virtual environment.
> 
> 

---

## Run the Code (Script 4)

**Double-click ****`4-运行代码.bat`**, and an interactive menu appears:

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

- Choose **1**: simulation environment, where camera gestures drive two simulated hands

- Choose **2**: enter the submenu and select right hand / left hand / both hands

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

After selecting, `dora build` + `dora run` are executed automatically. A camera window pops up — make gestures toward the camera and the dexterous hand follows in real time. **Press Ctrl+C to stop**; after the dataflow ends, press Enter to return to the main menu, where you can choose another mode or press `q` to exit.

> On the first run, Windows may block camera permission; just click "Allow".
> 
> 

---

## Project Cleanup (Script 0)

**Double-click ****`0-清理项目.bat`**; after entering `Y` to confirm, it automatically cleans up:

1. Stops the dora daemon

2. Deletes the 3 virtual environments (`.venv`)

3. Deletes the Rust build artifacts (`Demo\target`)

4. Deletes `pycache`, `.bak` backups, logs, and `Demo\out` (the dora log directory)

5. **Restores the default port** (`--serialport /dev/ttyACM0`), removing the local serial port leftovers

> After cleanup, the entire `AmazingHand-main` folder can be copied to others, clean and free of leftovers. On a new machine, just run 1 → 2 → 3 → 4 in order.
> 
> 

---

## FAQ and Notes

### 8.1 cargo hangs at `Updating 'tuna' index`

- Cause: the mirror configuration uses the **git repository method** (`.../git/crates.io-index.git`), which requires downloading a 1GB+ index on first use

- Solution: change `C:\Users\your-username.cargo\config.toml` to the **sparse index** (see section 2.2), or simply re-run `1-安装环境.bat`

### 8.2 mediapipe missing the solutions submodule / corrupted installation

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Must be run with the virtual environment activated (in the `Demo` directory)

- `3-部署代码.bat` already does this step automatically as a fallback

### 8.3 Incompatible dora versions (message v0.8.0 vs v0.7.0)

- Symptom: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Cause: the dora-cli version does not match dora-node-api. **Both must be unified to 0.5.0**

    - Check: `dora --version` should output `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - Fix: `cargo install dora-cli --version 0.5.0 --force`

    - If there are multiple dora entries in PATH (such as an old version in `C:\Users\xxx.dora\bin`), make sure `.cargo\bin` comes first, or delete the old version

### 8.4 MuJoCo / mediapipe fails to load the model (Chinese path)

- Symptom: `ParseXML: Error opening file '...\scene.xml'` or `Can't find file: ....tflite`

- Cause: the MuJoCo 3.x / mediapipe C++ loader on Windows **cannot open absolute paths containing Chinese characters** (such as `D:\Claude工作区...`)

- This project already includes built-in fixes:

    - `AHSimulation\AHSimulation\mj_mink_*.py` switches the working directory before loading the model

    - `HandTracking\mediapipe_patch.py` bypasses it using 8.3 short paths + relative paths

- Do not delete these fix code sections

### 8.5 Camera permission

- Select "Allow" in the pop-up on the first run

- Settings → Privacy → Camera → allow desktop apps to access

### 8.6 The port number changes every time

- The COM number may change after replugging the USB cable; re-run `2-配置串口.bat`

### 8.7 Missing openCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(run in the `HandTracking` directory with the virtual environment activated)

---

## Code Structure

### Demo Directory

### Correspondence of Each dataflow

### How the Dataflow Works

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Where the Port Is Configured

- The `args:` line of the three `dataflow_tracking_real_*.yml` files: `--serialport COMxx`

- The `default_value = "COMxx"` in `AHControl\src\main.rs` (the default value of the serial port parameter)

- `AHControl\config\*.toml`: servo model, ID, offset (generally no need to change)

