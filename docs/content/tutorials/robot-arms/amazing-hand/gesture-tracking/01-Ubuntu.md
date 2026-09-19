---
title: "Linux (Ubuntu) One-Click Deployment and Run"
description: "AmazingHand gesture-tracking one-click deployment on Ubuntu: run the scripts in the terminal, then control the simulated or real hand with camera gestures."
---

# Linux (Ubuntu) One-Click Deployment and Run

AmazingHand-main.zip

This tutorial is based on the official AmazingHand (Pollen Robotics dexterous hand) Demo, with the one-click deployment scripts already prepared.
Just run them in numerical order. **All scripts are located in the ****`Demo/Linux(Ubuntu)一键部署脚本/`**** folder; run them in the terminal with ****`./script-name`****.**

---

## Hardware Preparation

> The model files can be viewed or downloaded from [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (URDF included).
> 
> 

---

## Granting Script Execute Permission (Important)

**After the scripts are copied from Windows / an archive to Linux, the execute permission (****`+x`****) is lost**, and running them directly reports
`Permission denied`. **You must run the following before using them for the first time:**

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
chmod +x *.sh
```

After that, each script can be run with `./script-name`. You can also combine the two steps into one:

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本" && chmod +x *.sh && ./1-安装环境.sh
```

> Tip: when copying `AmazingHand-main` to Linux, using **tar** preserves permissions most reliably:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main` (pack on either the Windows or Linux side, unpack on the Linux side),
> or after extracting, simply run `chmod +x *.sh` once on all of them.
> 
> 

---

## Environment Installation (Script 1)

In the terminal, enter the script directory and run (make sure you have already done the `chmod +x` from step 2 above):

```Bash
cd "Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
./1-安装环境.sh
```

It automatically performs:

1. **Install Rust** (rustup + stable toolchain)

2. **Configure the Tsinghua cargo mirror** (`~/.cargo/config.toml`) to speed up crate downloads

3. **Install uv** (Python package manager)

4. **Install dora-cli 0.5.0** (`cargo install`; the first build takes about 10~20 minutes, so please be patient)

5. **Install the dora-rs pip package** (optional)

> **Important**: after the script finishes, **close and reopen the terminal** so the environment variables take effect. If the version number shows as empty, add the following path to `~/.bashrc`:
> 
> export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
> 
> 

### Manual Installation Alternative (When the Scripts Are Unavailable)

- **Rust**:

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **uv**:

```Bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- **dora-cli**:

```Bash
cargo install dora-cli --version 0.5.0
```

### cargo Tsinghua Mirror Configuration (~/.cargo/config.toml)

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

> Use the **sparse index** (as shown above), not a git repository mirror — the git approach has to download about 1 GB of index the first time, and it easily gets stuck at `Updating 'tuna' index`.
> 
> 

---

## Wiring

- Connect the servo driver board to the computer via USB, with an **external 5V4A power supply**

- Check the port number:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

- Usually `/dev/ttyACM0`

---

## Configure the Serial Port (Script 2)

**Run ****`./2-配置串口.sh`**:

1. It prompts "Please connect the servo driver board to the computer" → press Enter to start detection

2. It automatically lists the detected serial ports (`/dev/ttyACM*` / `/dev/ttyUSB*`)

3. With a single port, press Enter to confirm; with multiple ports, type the number

4. It automatically writes `--serialport` into the 3 dataflow yml files and the default port in `AHControl/src/main.rs`

5. **Automatically configures serial port permissions**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

6. It is recommended to add the current user to the dialout group (no need to type the password every time; requires logging out and back in):

```Bash
sudo usermod -aG dialout $USER
```

> If `ls /dev/ttyUSB* /dev/ttyACM*` returns nothing inside a virtual machine, connect the USB device to the virtual machine in the virtual machine settings.
> 
> 

---

## Code Deployment (Script 3)

**Run ****`./3-部署代码.sh`**, which automatically performs:

1. Start the dora daemon (`dora up`)

2. Create a Python 3.12 virtual environment (`uv venv --python 3.12`)

3. Activate the virtual environment

4. Compile the AHControl Rust node (`cargo build --release`, about 10 minutes the first time)

5. Sync the AHSimulation and HandTracking dependencies (`uv sync`)

6. Force-install mediapipe==0.10.14 (a known pitfall in this tutorial; a fallback)

> Deployment only needs to be done once. Running it again afterwards will prompt whether to rebuild the virtual environment.
> 
> 

---

## Run the Code (Script 4)

**Run ****`./4-运行代码.sh`**, and an interactive menu appears:

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

- Choose **1**: simulation environment, where camera gestures drive the two simulated hands

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

After selecting, `dora build` + `dora run` run automatically. The camera window pops up; make gestures toward the camera and the dexterous hand follows in real time. **Press Ctrl+C to stop**; after the dataflow ends, press Enter to return to the main menu, where you can choose another mode or press `q` to quit.

> The Linux desktop requires camera permission (such as Ubuntu's Privacy settings → Camera), and confirm that the camera is not occupied by another application.
> If the camera will not open inside a virtual machine, see  9.6 Camera permission / camera will not open in a virtual machine.
> 
> 

---

## Project Cleanup (Script 0)

**Run ****`./0-清理项目.sh`**; after typing `Y` to confirm, it automatically cleans up:

1. Stop the dora daemon

2. Delete the 3 virtual environments (`.venv`)

3. Delete the Rust build artifacts (`Demo/target`)

4. Delete `__pycache__`, `.bak` backups, logs, and `Demo/out` (the dora log directory)

5. **Restore the default port** (`--serialport /dev/ttyACM0`), removing the local serial port leftovers

> After cleanup, the whole `AmazingHand-main` folder can be copied to others, clean with no leftovers. On a new machine, just run 1 → 2 → 3 → 4 in order.
> 
> 

---

## Common Issues and Notes

### 9.1 `Permission denied` (the script has no execute permission)

- Symptom: running `./1-安装环境.sh` reports `bash: ./1-安装环境.sh: Permission denied`

- Cause: after the scripts are copied from Windows / an archive to Linux, the **execute bit is lost**

- Solution: grant execute permission to all scripts

```Bash
chmod +x *.sh
```

- Then run them with `./script-name` (do not use `bash script-name`, which skips the interactive prompt in step 2 of this tutorial)

### 9.2 cargo stuck at `Updating 'tuna' index`

- Cause: the mirror configuration uses the **git repository approach** (`.../git/crates.io-index.git`), which has to download a 1GB+ index the first time

- Solution: change `~/.cargo/config.toml` to the **sparse index** (see section 3.2), or simply re-run `1-安装环境.sh`

### 9.3 mediapipe missing the solutions submodule / broken installation

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Must be run with the virtual environment activated (in the `Demo` directory)

- `3-部署代码.sh` already performs this step automatically as a fallback

### 9.4 dora version incompatibility (message v0.8.0 vs v0.7.0)

- Symptom: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Cause: the dora-cli version does not match dora-node-api. **They must both be 0.5.0**

    - Check: `dora --version` should output `dora-cli 0.5.0` and `dora-message: 0.8.0`

    - `1-安装环境.sh` now **detects the version automatically**: if it is not 0.5.0, it cleans up and force-reinstalls

**If an old version of dora remains on the system (such as 0.4.1), clean it up manually first and then reinstall:**

```Bash
# 1. Locate where the old version of dora is
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Delete the old versions found (delete by actual path; there may be more than one)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Force-install 0.5.0 (into ~/.cargo/bin)
cargo install dora-cli --version 0.5.0 --force

# 4. Verify the version (should output dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> If `dora --version` still shows the old version, another location in PATH is hiding an old dora; use `which dora` to check and delete them one by one, and make sure `~/.cargo/bin` comes early in PATH.
> 
> 

### 9.5 No serial port permission (Permission denied)

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

- Permissions may reset each time the device is unplugged and plugged back in

- Permanent fix: `sudo usermod -aG dialout $USER`, then log out and back in

### 9.6 Camera permission / camera will not open in a virtual machine

**Physical host**:

- Ubuntu: Settings → Privacy → Camera → Allow applications to access

- Confirm that the camera is not occupied by another application (the Camera app, Zoom, etc.)

**Camera will not open in a virtual machine (VMware)**:

Symptom: `open VIDEOIO(V4L2:/dev/video0): can't open camera by index` or `select() timeout`,
while `ls /dev/video0` exists and `v4l2-ctl` can capture frames, but OpenCV `cap.read()` always returns `ret = False`.

Troubleshooting and solution (in order):

1. **Forward the camera into the virtual machine**: menu → Virtual Machine → Removable Devices → Camera → Connect

2. **Switch the USB controller version (a common VMware fix, the most effective)**:

    - Virtual Machine → Settings → **USB Controller** → switch `USB 2.0` / `USB 3.1`

    - After switching, **restart the virtual machine** and try again

3. Verify that the device exists:

```Plain Text
ls -l /dev/video0
sudo usermod -aG video $USER   # Add to the video group, then log out and back in
```

4. Use v4l2 to verify whether the camera can really output frames (frames = the driver is fine, and the problem is OpenCV compatibility):

```Bash
v4l2-ctl --device=/dev/video0 --set-fmt-video=width=640,height=480,pixelformat=MJPG --stream-mmap --stream-count=1 --stream-to=/tmp/frame.jpg
ls -l /tmp/frame.jpg   # Tens to hundreds of KB = stream is working
```

### 9.7 The port number changes every time

- The device number may change after unplugging and replugging the USB; re-run `2-配置串口.sh`

### 9.8 Missing openCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(run in the `HandTracking` directory with the virtual environment activated)

---

## Code Structure Overview

### Demo Directory

### Correspondence Between the dataflows

### Dataflow Principle

```Plain Text
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Port Configuration Locations

- The `args:` line of the three `dataflow_tracking_real_*.yml` files: `--serialport /dev/ttyACMx`

- `default_value = "/dev/ttyACM0"` in `AHControl/src/main.rs` (the default value of the serial port argument)

- `AHControl/config/*.toml`: servo model, ID, offset (usually no need to change)

