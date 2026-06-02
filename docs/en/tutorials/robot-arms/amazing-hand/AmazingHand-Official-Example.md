# Running Tutorial for AmazingHand Official Example

## 1\. Code Download

It is recommended to download the Compressed Packet of the code under this usage tutorial for Demo example demonstration, or clone the official open source code repository  https://github\.com/pollen\-robotics/AmazingHand\.git \. Please note that there may be errors or omissions in the official open source code\. 

[Running Tutorial for AmazingHand Official Example](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Windows Code Compressed Packet

\[AmazingHand\-main\.zip\]

Linux Code Compressed Packet

\[AmazingHand\-main\.zip\]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2\. Environment Installation

Install Rust, uv, and dora\-rs according to the system's self\-installation process 

**1\. Install Rust:** [https://www\.rust\-lang\.org/tools/install](https://www.rust-lang.org/tools/install)

Reference for Rust Environment Variable Setup on Windows \(Important\!\) https://zhuanlan\.zhihu\.com/p/1958936613276087180

Linux Environment Variable Settings:

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGE0ODQ5ZTVlOTA5ZTllNzY1NTEzYWFjODU0MDU2MjJfYTJkYzJjY2IyOTZkNDNjNWJlZTM5OThkZGI4MzQzOTlfSUQ6NzY0MDA3ODYzOTkwODA0ODA2NV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGI3NmQyOWMyZDcxYzAxMzlkYzgxODI4NjEwZjFmYzNfYjU5N2E2ZGI4OTQ2ZmMwOGIwOTM4MmI3NjRmNTljNTVfSUQ6NzY0MDA3ODYzODMxODYwMzQ0M18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

Visual Studio Installer may be required for the first installation

**Configure Cargo mirroring source**

Create the `config.toml` configuration file in the `.cargo` folder, and configure the Tsinghua `crates.io-index` mirroring so that Cargo will use Tsinghua University's mirror source to download crates\.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2\. Install uv:** [https://docs\.astral\.sh/uv/getting\-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWI3MjMwYTgyNDJjMzNhNTUyNjUwNTJlNjU3ZWMwYzZfMWI2OGY1OTI4Nzg0NmYwMzE1MDliZDUxYmU0ZGVmOWZfSUQ6NzY0MDA3ODYzNzg1MzE2NjgwMV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

Open thePowershellterminal on the Windows side, copy and then enter this command to install

**Linux Environment Variable Settings:**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzI5OGMyZGU0ZjI1N2RlMjc4ZTMwZWRhYWZhOTA1ZjVfY2E2YmI4ZGMzMjhjN2FhOTFkZmFmMDQ4YjA0NWQyM2VfSUQ6NzY0MDA3ODYzODQ4MjE2NDk1MV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

**3\. Install dora\-rs:**Please refer to [https://dora\-rs\.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing) for download and installation

Linux Environment Variable Settings:

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGI0ZmUwOGZlNDlkODlmZjI4OTIzODFjMzFhZGFjMDFfNTZjZWU5MTM1YWY5N2Q0ZDhkYjc2NjhlNWQ0Nzg0MmRfSUQ6NzY0MDA3ODY0MDcyMTU3OTE5N18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

## 3\. Wiring Method

The power supply requires at least 5V3A, is externally connected to a servo driver board, and is connected to the computer via USB 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGIzNWE0ZmI2MzRkZGMyODRiOTk4YWIwMTRiZTljNzJfOWVkNDMwOGVlMzIyYmE3ODM4ZWRiOTdiZWIwNjYzZDZfSUQ6NzY0MDA3ODYzOTM5NjM0Mjk4Ml8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

## 4\. Example Demonstration

### **1\. Check the Port Number of the Servo Driver Board**

- The Windows system is generally COM11, and the Port Number of the servo driver board can be found through Device Manager or Feite Servo Host Computer 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTA1Njc5YjBmYTE5OGFmNTVmNWIyYzg4Nzc3OTFjNjVfNTUyZDQ2YmY3ZDU3Yjg3OGJmY2NlYTIyNWVjOGZhNzlfSUQ6NzY0MDA3ODY0MDQ5MDkyNTI1MV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

- Ubuntu and Linux systems are generally /dev/ttyACM0

Check the port number of the servo driver board via the command line: 

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

If the command "ls /dev/ttyUSB\* /dev/ttyACM\*" fails to find the directory in the virtual machine, please check if the dexterous hand is connected to the computer in the lower right corner of the virtual machine\. If so, please choose to disconnect it and connect it to the virtual machine\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdhNjBiNDIwNzI4YTQ4ODk1MWRkMmFjZGFiODRjNWFfYWQxNjc2Nzc1YWVhYzI5YmFjMTYwYzRiNDljZDAzNTRfSUQ6NzY0MDA3ODY0MTE5MTI5MjEyOF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

### **2\. Modify the Port Number in the code**

① Locate the main\.rs code file under the AmazingHand\-main\\Demo\\AHControl\\src directory, open it in a text editor, and modify it to the port number found on your own host \(COM\* for Windows, and generally /dev/ttyACM\* for Ubuntu and Linux systems\)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGZiNWY1MWI0ZTEyMDM0MDE0MmU3MDQ5NzIzZjNmYjRfYmMyNWRhZWU2MmYwZGQzZTI1MTcyOWUyZTZlNDU2ZTBfSUQ6NzY0MDA3ODYzNzgxNjk3NDUyNV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

② Locate the corresponding instance file 

**Right Dexterous Hand** Find dataflow\_tracking\_real\_right\.yml under the AmazingHand\-main\\Demo directory

**Left Dexterous Hand** Find dataflow\_tracking\_real\_left\.yml under the AmazingHand\-main\\Demo directory

**Dual Dexterous Hands ** Find dataflow\_tracking\_real\_2hands\.yml under the AmazingHand\-main\\Demo directory 

Open in text format and modify it to the port number found on your own host \(COM\* for Windows, and generally /dev/ttyACM\* for Ubuntu and Linux systems\) 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjkwZmRmYWE4ZWE2ZjcxODc0ZGI4ZjRkMWY1YjQ0ZTRfZWFkNmI5OGVmZjgwNmY0NzQ4YmUwZjljOGQ1MDRjNmRfSUQ6NzY0MDA3ODYzNzY3NzAzODgwN18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTkxMzk0MjE1MDVmNzY0NzRkZDY2YjM4NTYwNWRjNjZfMDNlNzBhYzg2NDMzOWE0OTljNGU0OWFiN2EwNGMzYzFfSUQ6NzY0MDA3ODYzOTA5NDMwMzk0MF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTNiZjU4NTdhMTEwYjM0ZWRhNTkwNjlmMWNkNjBkODVfOTkyYmNlM2Y5MzU2Mjc5N2Q4OGVmOTg3ZGFjMDhkYWNfSUQ6NzY0MDA3ODY0MTIyNDg2Mjg5OV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

### **3\. Code Deployment**

- Open the Demo folder

On the Windows system, in the directory, enter Powershell and press Enter to open it, then start the daemon process \(each time\):

For Linux systems, directly open via the Console and start the daemon process \(each time\): 

```Plain Text
dora up
```

- Then run from this directory in the Console \(when setting up the environment, you can run it once\!\! Running it again will overwrite the virtual environment\!\! \) Create a virtual environment:

```Plain Text
uv venv --python 3.12
```

- Activate the virtual environment \(every time\) by entering and running the following according to the system: 

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDdhMjBlNTFkOGExNmMwY2IzNTZkOWU2NGUzMzM3OThfNjA2ZjE1M2FmZDc0NzM0ZTFiMTU5YWQ2ZDBiMzVhODBfSUQ6NzY0MDA3ODY0MDMwNjMyNjcyNV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

Ensure that the Console has activated the virtual environment\!

- Execute dependency synchronization and enter the AHControl folder

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Then enter ` cd.. ` and press Enter  to return to the Demo directory\!  Enter the AHSimulation folder 

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Then enter`cd..`and press Enter to returnto the Demo directory\!Enter the HandTracking folder

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4\. Running Results

- Openthe Demofolder\! Enter Powershell in the directory and press Enter to open it, then start the daemon process \(every time\):

```Plain Text
dora up
```

- Activate the virtual environment \(every time\) Please input and run according to the system: 

Command to activate a virtual environment on the Windows platform:

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Command to activate a virtual environment on the Linux platform:

```Plain Text
source .venv/bin/activate
```

### Simulation Environment

- Run the webcam hand tracking demo only in the simulation environment:

```Plain Text
dora build dataflow_tracking_simu.yml --uv   *#(Execute only once)*
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGJhMTM1NTFmYzMzMjI1NTczZDNjYjMwMTAwOWJkZjFfNzFhMGNmYWUyMWNmNmMwZjZkOWYyZDUyZjBkYTA4OWRfSUQ6NzY0MDA3ODYzOTQ1MDkwMTY5M18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2FiYzhjZGI0OGE3NDBjMjJkMDVhZDgyOTBhY2I3NmJfODZhOGNmZTNjNGQzMDY3MmQyNjk3NjBkYzRiMjE1N2ZfSUQ6NzY0MDA3ODY0MTE5MTI3NTc0NF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

### Real hardware operation \(hand tracking\)

- Run the webcam hand tracking demo using real hardware:

    #### Right Dexterous Hand

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Left Dexterous Hand

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Dual dexterous hands \(note that both are connected to a servo driver board\) 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjkzMGEwYWUzNTZmYWY1MTM0NmMwMGM2NTNhOWZjNGZfMTMyY2JlYTg3NDA4MDY2NjBkZDBkOTMxNDU4ZDM0MjZfSUQ6NzY0MDA3ODYzOTg1MzQ0MDIwOV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjY4NTYwZTUzZWUwNzhjZDZmMWU1NzYzOTc5ZDEzMWVfYTg3MDUyMWNhZjZmZTdkODIwMGI5MmUzNzBjZTkyNGFfSUQ6NzY0MDA3ODY0MDkxMDMwNjQ5OV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmY2NzdkYWVjNmY2YjVmZWJlOWFiZmUxM2FkZmYyNmNfZjU1MjU3Mjc2ZmEyOTkzNzc0MmI5NTE4N2ZjNzFmMjFfSUQ6NzY0MDA3ODYzOTE1MzAyNDIwNF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

### Simple example to control the angle of the simulated finger

- Run a simple example to control the finger angle in the simulation:

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDY4ZjVkOTFkYWEwOWNjYzMyMjJhNzFjZDZhMDgyM2VfZmFhYjcwYTQ5N2Q1MzhiYTY2NTM2ZGQ1Y2M0MWRiMjRfSUQ6NzY0MDA3ODYzODY2MjUwMzY0NF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjNjYzhmOTQ4M2RlN2RhZGFmNzdiNjlhNmE2NmY0ZDFfZWM3MDQ3YTgxYzY3MDgxYTMzY2IzMTc2MDY5NDg4NzRfSUQ6NzY0MDA3ODY0MTAzMTkyNDk1N18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

Description

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) includes a dora\-rs node to control the motor, as well as some utilities for configuring the motor\.

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) includes a dora\-rs node for simulating hand motion and obtaining inverse kinematics\.

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) includes a dora\-rs node that tracks hands from a webcam and uses them as targets to control AH\!



## Precautions 

### 1\. mediapipe version issue

In pyproject\.toml, mediapipe\>=0\.10\.14 is configured, but the installed mediapipe package is missing the solutions submodule\. Most likely, the mediapipe version is incompatible with Python 3\.12 \(higher versions of mediapipe have issues with Python 3\.12 support\), or the package files were corrupted during installation\. 

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2\. Dora version incompatibility, message format \(v0\.7\.0 vs v0\.8\.0\)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGU0ZTEyNDcwN2JhZjQyYjU4NmNiMjYyODQzZWViMTlfYzdiZTdiNTY4OGJhZGE0MGJjMTVhNzM2NDQzYWUwZDZfSUQ6NzY0MDA3ODYzOTA5NDMyMDMyNF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

Answer: ① First, under the\.cargo/registry/src/github\.xxxxxxxx/ directory in the C drive user directorydelete onlythe corresponding dependency package\!

**`dora-message-0.7.0`** \(Core\! This is the folder for the old message format and must be deleted\)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16` \(Dora's dependent auxiliary library, to be deleted along with the old version\)

② Open the Demo/AHControl folder and modify dora\-node\-api="0\.5\.0" and dora\-message="0\.8\.0" in Cargo\.toml 

③ In the Console, navigate to the AHControl directory and re\-run cargo build \-\-release

④ Re\-follow the " [real hardware operation ](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug)" to rebuild

Modify the corresponding version according to the actual error reporting situation\. For example, if dora\-message requires version 0\.6\.0, change it to dora\-node\-api="0\.4\.0" dora\-message="0\.6\.0"\.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjM3MWVhNTZkNzBmMjFlYTE2YjNhNTljMzg3ZmQ5MjlfZTZiYTFhNzI2Y2Y3YmJlYWY3YTg1YTY3MTE2ZTcyM2JfSUQ6NzY0MDA3ODYzOTU4MDkwODc0Nl8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDk0OGMxYTZkODJmZTU4MWNhZmI2Yjc4MDFkNjY5ZmZfZTU1M2VkYzZlNTAxZWEyMWU5NTg2ZjM4Njk5YzMxMTJfSUQ6NzY0MDA3ODY0MTExNTc5NDYyOF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

### 3\. No openCV dependency library

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDJiNTYzNWQ3ZDBkNDk4MzNmYjI0YmNjYzA5ZTUwYmFfZTE2NjkyMTkyZjE3ZDc5ZTJlN2IwY2MxNjdhNTNmNTJfSUQ6NzY0MDA3ODYzOTAzMTQ4NzY3OF8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

Enter the following command in the HandTracking directory 

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4\.  Camera Permission Enabled  \(Computer\) 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzFhNjJlZDZhOGRjNjg1NjIyYjQ2MjNiZDBiYTUyNTlfZmExNWNhOWY2YWM2ODQzODhmMDlmMjk2YWNiMzBlMDNfSUQ6NzY0MDA3ODYzNzQ3MTUwMTUxNV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjJiNzNkMzFkMTRiNmQ5MTg4NzEwMWYwYzU0NjgxZjVfMDZiNGMwNjIyMTIxODk1ZGZhYjEyYzliZTgwNzhkZGFfSUQ6NzY0MDA3ODYzODEzNDA4Njg2NV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTkxMjVhYWFkNWQwMjIwZjU0ZWYyMzE4NDhiYzgyZmZfYWE1MzViZjI0ZTMxZDI5OTNkZDFhZmM5MjE3NWYyNGVfSUQ6NzY0MDA3ODYzOTg1MzQyMzgyNV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

### 5\. Virtual Machine 22\.04 calls the camera

Reference https://blog\.csdn\.net/qq\_19731521/article/details/124954288

### 6\. Desktop Camera Installation

#### Installation Steps for Environmental Camera Kit Bracket

1\. First, fix the fine\-tuning angle bracket

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDQ0NjI3MjcxNzUwY2Y3MjlhOWRkMDFhYWU1NDBhMzVfYjk3NWUxODE5NDMzOGZiYTY2MzA1NjRlNDJhYzllNGRfSUQ6NzY0MDA3ODYzOTQxNzQ5NDczM18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

2\. Side View Environment Camera Kit

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGY2NWViZjAxYmIxMGMwYjFlYzMzNmE2NzA5OWRhMWZfMmFhNWNhNWZiMTI4MDc0MWUxMzk0MWY1YWFlZjA3NTdfSUQ6NzY0MDA3ODY0MDQyNzg5NTk4Nl8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)





## Virtual Machine 22\.04 directly runs hand tracking 

Download these four files and place them in the same English directory, then use virtual machine software to directly open the\.ovf file to enter the system

Password ubuntu

\[ubuntu22\.04\_amazinghand\.ovf\]

\[ubuntu22\.04\_amazinghand\-disk1\.vmdk\]

\[ubuntu22\.04\_amazinghand\.mf\]

\[ubuntu22\.04\_amazinghand\-file1\.iso\]

**1\. Open the Console under the Demo directory:**

```Plain Text
dora up
```

**And activate the virtual environment: **

```Plain Text
source .venv/bin/activate
```

**2\. Virtual Machine Camera Permission Call**

Reference for Virtual Machine 22\.04 to Call Camera https://blog\.csdn\.net/qq\_19731521/article/details/124954288

**3\. Check the port of the servo driver board via the command line:**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4\. Modify the Port Number in the code file**

① Locate the main\.rs code file under the AmazingHand\-main\\Demo\\AHControl\\src directory, open it in text mode, and modify it to the port number found on your own host \(COM\* for Windows, and generally /dev/ttyACM\* for Ubuntu and Linux systems\)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTg2OTc1NzgzYTUxOTFiMzIyZjVlOTYxZGEzNTNhZTVfNmEwMmU4YzY3NTlhOTk4NGMyY2E0NGEyZTVjMGFkMWJfSUQ6NzY0MDA4Mzk0NjM0NDMyMDE5N18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

② Find the corresponding instance file 

**Right Dexterous Hand** Find dataflow\_tracking\_real\_right\.yml under the AmazingHand\-main\\Demo directory

**Left Dexterous Hand** Find dataflow\_tracking\_real\_left\.yml under the AmazingHand\-main\\Demo directory

**Dual Dexterous Hands ** Find the dataflow\_tracking\_real\_2hands\.yml file under the AmazingHand\-main\\Demo directory 

Open in text format and modify it to the port number found on your own host \(COM\* for Windows, and generally /dev/ttyACM\* for Ubuntu and Linux systems\) 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2Q0NGU2OTMxMDIxMjJlYjJkNGU5ZmQyZDkyOTFkMzVfMzNmZWYwOTI4YjlhZTk3NTAwZGE5YmU5NjczOWU5NjFfSUQ6NzY0MDA4Mzk0NzI5NjUwODg5MV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmFmZDI3NDhiZWI5N2RkNjE4ZGVlNjBiMjc0MDE2YjdfMjk5NWFiZjg2ZTdkZjEwYTE2ZjAwZjcwMTY5M2IxMzJfSUQ6NzY0MDA4Mzk1MDU5Mjk2OTY1OV8xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQzODY4NThhZTZiY2E2YWM3NGM0ZWE2MTUzZThkNjFfOTI3YzBiYTc1MjM4OTIxNzU2MjRiYzhmYzU4MDhlNzBfSUQ6NzY0MDA4Mzk0OTQ1NjQxMTgyN18xNzgwMzE3MjU0OjE3ODA0MDM2NTRfVjM)

**5\. Run right hand tracking**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```





