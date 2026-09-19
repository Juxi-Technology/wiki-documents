---
title: "Mac One-Click Deployment and Run"
description: "AmazingHand gesture-tracking one-click deployment on Mac: grant execute permission, run the scripts in the terminal, then drive the hand with camera gestures."
---

# Mac One-Click Deployment and Run

AmazingHand-main.zip

This tutorial is based on the official AmazingHand (Pollen Robotics dexterous hand) Demo, with one-click deployment scripts already prepared. Just execute them in numerical order. **All scripts are located in the Demo/Mac一键部署脚本/ folder — run ./script-name in the terminal.**

---

## Hardware Preparation

|Hardware|Requirement|
|---|---|
|Dexterous hand unit|Right hand / Left hand / Both hands|
|Servo driver board|External, connected to the computer via USB|
|Power supply|**At least 5V 4A** (USB power is insufficient; an external power supply is required)|
|Camera|Mac built-in camera or a USB camera|

> The model files can be viewed or downloaded on [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (URDF included).
> 
> 

---

## Granting Script Execute Permission (Important)

**After the scripts are copied from Windows / an archive to Mac, the execute permission (****`+x`****) is lost, and running them directly reports
****`Permission denied`****. You must run the following before the first use:**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

After that, each script can be run with `./script-name`.

> Tip: when copying `AmazingHand-main` to a Mac, using **tar** preserves permissions most reliably:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, or run `chmod +x *.sh` once for all scripts after extracting.
> 
> 

---

## Environment Setup (Script 1)

In the terminal, enter the script directory and run the following (make sure you have already done the `chmod +x` in step 2 above):

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

This automatically performs:

1. **Checks the Xcode command line tools** (required for Rust compilation). Prompts with `xcode-select --install` when missing

2. **Installs Rust** (rustup + stable toolchain)

3. **Configures the Tsinghua cargo mirror** (`~/.cargo/config.toml`) to speed up crate downloads

4. **Installs uv** (Python package manager)

5. **Installs dora-cli 0.5.0** (`cargo install`; the first compilation takes about 10~20 minutes, so please be patient). Automatically cleans up older dora versions

6. **Installs the dora-rs pip package** (optional)

> **Important**: after the script finishes, **close and reopen the terminal** so the environment variables take effect. If the version number shows as empty, add the following path to `~/.zshrc`:
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### Manual Installation Alternative (When the Script Is Unavailable)

- **Xcode command line tools**: `xcode-select --install`

- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**: `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Tsinghua cargo Mirror (~/.cargo/config.toml)

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

> Use the **sparse index** (as shown above), not a git repository mirror — the git method has to download about 1GB of index on first use and can easily hang at `Updating 'tuna' index`.
> 
> 

---

## Wiring

- Connect the servo driver board to the computer via USB, with an **external 5V4A power supply**

- The USB serial device name on macOS is **/dev/tty.usbmodem\*** or **/dev/cu.usbmodem\*** (not Linux's `/dev/ttyACM*`)

- To view the ports:

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## Configure the Serial Port (Script 2)

**Run ****`./2-配置串口.sh`**:

1. Prompts "please connect the servo driver board to the computer" → press Enter to start detection

2. Automatically lists the detected serial ports (`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`)

3. Press Enter to confirm when there is a single port; enter the number when there are multiple ports

4. Automatically writes the default port into the `--serialport` of the 3 dataflow yml files and into `AHControl/src/main.rs`

5. USB serial ports on macOS are usually readable and writable by the user; if it reports no permission, run this manually:

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

Or go to **System Settings → Privacy & Security → Input Monitoring** and allow terminal access.

> If you are in a virtual machine, connect the USB device to the virtual machine.
> 
> 

---

## Code Deployment (Script 3)

**Run ****`./3-部署代码.sh`**, which automatically performs:

1. Starts the dora daemon (`dora up`)

2. Creates a Python 3.12 virtual environment (`uv venv --python 3.12`)

3. Activates the virtual environment

4. Compiles the AHControl Rust node (`cargo build --release`, about 10 minutes the first time)

5. Syncs the AHSimulation and HandTracking dependencies (`uv sync`)

6. Force-installs mediapipe==0.10.14 (a known pitfall of this tutorial, as a fallback)

> Deployment only needs to be run once. Running it again afterwards will prompt whether to rebuild the virtual environment.
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

After selecting, `dora build` + `dora run` are executed automatically. A camera window pops up — make gestures toward the camera and the dexterous hand follows in real time. **Press Ctrl+C to stop**; after the dataflow ends, press Enter to return to the main menu, where you can choose another mode or press q to exit.

> **On the first run, macOS will prompt for camera authorization**: System Settings → Privacy & Security → Camera, and allow the terminal to use the camera.
> 
> 

---

## Project Cleanup (Script 0)

**Run ****`./0-清理项目.sh`**; after entering Y to confirm, it automatically cleans up:

1. Stops the dora daemon

2. Deletes the 3 virtual environments (`.venv`)

3. Deletes the Rust build artifacts (`Demo/target`)

4. Deletes `__pycache__`, `.bak` backups, logs, and `Demo/out` (the dora log directory)

5. **Restores the default port** (`--serialport /dev/ttyACM0`), removing the local serial port leftovers

> After cleanup, the entire `AmazingHand-main` folder can be copied to others, clean and free of leftovers. On a new machine, just run 1 → 2 → 3 → 4 in order.
> 
> 

---

## FAQ and Notes

### 9.1 `Permission denied` (the script has no execute permission)

- Symptom: running `./1-安装环境.sh` reports `bash: ./1-安装环境.sh: Permission denied`

- Cause: after the script is copied from Windows / an archive to Mac, the **execute bit is lost**

- Solution:

```Plain Text
chmod +x *.sh
```

### 9.2 cargo hangs at `Updating 'tuna' index`

- Cause: the mirror configuration uses the **git repository method** (`.../git/crates.io-index.git`), which requires downloading a 1GB+ index on first use

- Solution: change `~/.cargo/config.toml` to the **sparse index** (see section 3.2), or simply re-run `1-安装环境.sh`

### 9.3 mediapipe missing the solutions submodule / corrupted installation

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- Must be run with the virtual environment activated (in the Demo directory)

- `3-部署代码.sh` already does this step automatically as a fallback

### 9.4 Incompatible dora versions (message v0.8.0 vs v0.7.0)

- Symptom: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Cause: the dora-cli version does not match dora-node-api. **Both must be unified to 0.5.0**

    - Check: `dora --version` should output `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - `1-安装环境.sh` automatically detects older versions and force-reinstalls

**If an older dora version (such as 0.4.1) remains on the system, clean it up manually first:**

```Bash
# 1. Locate the old version of dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Delete the old versions found (by actual path)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Force-install 0.5.0
cargo install dora-cli --version 0.5.0 --force

# 4. Verify the version (should output dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> If `dora --version` still shows an old version, there is another old dora in PATH; use which dora to find and delete them one by one.
> 
> 

### 9.5 No permission for the serial port

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- Or **System Settings → Privacy & Security → Input Monitoring** → allow the terminal

- If the `tty.*` device cannot be read, use the corresponding `cu.*` device instead (cu devices are read-only ports and more suitable for direct control)

### 9.6 Camera permission

- **Select "Allow" in the pop-up on the first run**, or go to **System Settings → Privacy & Security → Camera** to allow the terminal to use the camera

- Make sure the camera is not occupied by another application (FaceTime, conferencing software)

### 9.7 The port number changes every time

- The device name may change after replugging the USB cable; re-run `2-配置串口.sh`

### 9.8 Missing openCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(run in the `HandTracking` directory with the virtual environment activated)

### 9.9 Slow compilation on Apple Silicon / blocked by Gatekeeper on the first run

- It is normal for the first `cargo build` on Apple Silicon to compile the dora dependencies slowly; please be patient

- If it reports "cannot verify the developer": System Settings → Privacy & Security → Open Anyway

---

## Code Structure

### Demo Directory

|Directory/File|Description|
|---|---|
|AHControl|Rust node that controls the servo motors. src/main.rs is the entry point|
|AHSimulation|Python node, MuJoCo simulation + inverse kinematics (mink)|
|HandTracking|Python node, MediaPipe hand tracking|
|dataflow_\*.yml|dora dataflow definition (node connection graph)|
|Mac一键部署脚本|This set of one-click scripts|

### Correspondence of Each dataflow

|File|Purpose|
|---|---|
|dataflow_tracking_simu.yml|Simulation environment, camera gestures → simulated both hands|
|dataflow_tracking_real_right.yml|Real robot right hand|
|dataflow_tracking_real_left.yml|Real robot left hand|
|dataflow_tracking_real_2hands.yml|Real robot both hands (connected to the same driver board)|

### How the Dataflow Works

```Bash
Camera → HandTracking (MediaPipe gesture recognition)
              ↓ Hand keypoint coordinates
         AHSimulation (MuJoCo simulation + inverse kinematics)
              ↓ Joint target angles
         AHControl (serial port → servo driver board → dexterous hand)
```

### Where the Port Is Configured

- The `args:` line of the three `dataflow_tracking_real_*.yml` files: `--serialport /dev/cu.usbmodem...`

- The `default_value` in `AHControl/src/main.rs` (the default value of the serial port parameter)

- `AHControl/config/*.toml`: servo model, ID, offset (generally no need to change)



