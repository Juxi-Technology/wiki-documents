# Lekiwi Mobile Robot User Guide 

The black active arm uses a 5V 6A power adapter, while the white passive arm uses a 12V 5A power adapter 

\[lerobot\-Lekiwi\.zip\]

The code in this tutorial repository is maintained at the stable version of Lerobot tested before March 1, 2026\. Currently, Huggingface has made a very substantial upgrade to Lerobot, adding a large number of new features\. If you need to experience the latest tutorial, please follow [ the official documentation for operation ](https://huggingface.co/docs/lerobot/lekiwi)\. 



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) is a fully open\-source robot car project initiated by [SIGRobotics\-UIUC](https://github.com/SIGRobotics-UIUC)\. It includes detailed 3D printing files and operation guides, and is designed to be compatible with the [LeRobot](https://github.com/huggingface/lerobot/tree/main) imitation learning framework\. It supports the SO101 robotic arm, thereby enabling a complete imitation learning process\.

[*Precise component positions can be visualized in Fusion360 Online CAD*](https://a360.co/4k1P8yO)*\.*

[URDF File](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Online URDF Preview https://urdf\.d\-robotics\.cc/

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWE4ZTE4ZDM2MzNiMGQ0ZDE1NTJhZGZlYTc2NDkxZjNfNGFjMGQ1YmFlYjFjN2VlN2JmNjU2MTY5NmMxNDg5YTNfSUQ6NzY0MTIwOTAxNDIzNzE3MDYzNV8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

## Main Features

1. **Open source and low cost**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) provides an open source, low cost robot car solution\.

2. **Integration with LeRobot**: Specifically designed for integration with the [LeRobot platform](https://github.com/huggingface/lerobot)\.

3. **Abundant Learning Resources**: Provide comprehensive open\-source learning resources, including assembly and calibration guides, as well as tutorials on testing, data collection, training, and deployment, to help users quickly get started and develop robot applications\.

4. **Compatible with Nvidia **: Can be used in conjunction with reComputer Mini J4012 Orin NX 16 GB\. 

5. **Multi\-scenario Application**: Suitable for education, scientific research, automated production, and robotics fields, helping users achieve efficient and precise robot operations in various complex tasks\.

JUXI is only responsible for the quality of the hardware itself\. Tutorials are strictly updated in accordance with official documentation\. If you encounter software issues or environment dependency issues that you are truly unable to resolve, please promptly report the issues to [LeRobot Platform](https://github.com/huggingface/lerobot) or [LeRobot Discord Channel](https://discord.gg/8TnwDdjFGU)\.

**Attention**

- All servos in the Lekiwi chassis require a 12V power supply\. For users who use a 5V robotic arm, we provide a 12V to 5V step\-down conversion module\. Please note that you need to modify the circuit yourself\.

- 12V Power Supply \- If needed, you can select this option at checkout\. If you already have a 12V power supply, simply convert the power output interface to a 5521 DC plug\.

- Raspberry Pi controller and camera \- these need to be purchased separately through the order interface\. 

## Bill of Material \(BOM\)

## Initial system environment

**For Ubuntu x86: **

- Ubuntu 22\.04

- CUDA 12\+

- Python 3\.10

- Torch 2\.6

**For Jetson Orin:**

- Jetson JetPack 6\.0

- Python 3\.10

- Torch 2\.3\+

**For Raspberry Pi: **

- Raspberry Pi 5 4G\~16G 

### Set up SSH

After setting up the Raspberry Pi, you should enable and configure [ SSH ](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) \(Secure Shell Protocol\), so that you can log in to the Raspberry Pi from your laptop without connecting a screen, keyboard, and mouse to the Raspberry Pi\. You can [ find a great tutorial here ](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)\. You can log in to the Raspberry Pi via the command prompt \(cmd\), or if you use VSCode, you can use [ this ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension\. 

## 3D Printing Guide

### Component

We provide printable STL files for the following 3D printed parts\. These parts can be printed on consumer\-grade FDM printers using generic PLA filaments\. We tested them on the Bambu Lab P1S printer\. For all components, we simply loaded them into bambuslicer, automatically rotated and arranged them, enabled any recommended supports, and then printed\. 

### Print Parameters

The provided STL files can be directly printed on many FDM printers\. The following are the tested and recommended settings; other settings may also work\. 

- Material: PLA\+

- Nozzle diameter and accuracy: 0\.2mm nozzle diameter, layer height 0\.2mm 

- Fill density: 15%

- Printing speed: 150 mm/s

- If necessary, upload the G\-code \(sliced file\) to the printer and print 

# Install LeRobot 

On your Raspberry Pi: 

### 1\. [Install Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install): 

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2\. Restart Shell

Copy and paste the following command in your Shell:`source ~/.bashrc` or for Mac users:`source ~/.bash_profile` or `source ~/.zshrc` \(if you are using zshell\)

### 3\. Create and activate a new Conda environment for LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Then activate your Conda environment \(you need to do this every time you open the Shell to use LeRobot\!\): 

```Bash
conda activate lerobot
```

### 4\. Clone LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5\. Install ffmpeg in your environment:

When using `miniconda`, install `ffmpeg` in your environment:

```PowerShell
conda install ffmpeg -c conda-forge
```

This usually installs ffmpeg 7\.X compiled with the libsvtav1 encoder for your platform\. If libsvtav1 is not supported \(you can check the supported encoders via `ffmpeg -encoders`\), you can: 

【For all platforms】Explicitly install ffmpeg 7\.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

\[Linux only\] Install the build dependencies for ffmpeg and compile ffmpeg with libsvtav1 support from source, and ensure that the ffmpeg executable used is correct, which can be confirmed via `which ffmpeg`\.

If you encounter the following error, you can also use the above command to resolve it\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTVjZjUzNWIwNTU2MGFhZTk5MjE3NjZjM2QyYjA0ODVfZmRjZTU3NjhjMTA2ZjI3NmVkNDY1ZTJkMzE1ZTU5ODFfSUQ6NzY0MTIwOTAxMjY5MzgxNDIxMl8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

### 6\. Install LeRobot with feetech motor dependencies:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

## C\. Install LeRobot on a laptop

If you have already installed LeRobot on your laptop, you can skip this step; otherwise, please follow the same steps as we did on the Raspberry Pi ** to proceed **\. 

> \[\!Tip\] We will frequently use the Command Prompt \(cmd\)\. If you are unfamiliar with using cmd or would like to review the use of the command line, you can refer to this:[Command Line Crash Course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 
> 

On your computer:

### 1\. [Install Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install): 

### 2\. Restart the Shell

Copy and paste the following command in your shell:`source ~/.bashrc` or for Mac users:`source ~/.bash_profile` or `source ~/.zshrc` \(if you are using zshell\)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTc5NmM3ZDA4YWU3OTg5NzI2MDliMGU2YTJhN2RjMGJfOTZmOGRlMDgwZmE5MzQxZjc5MTI5N2E2ZTRmZDdmY2ZfSUQ6NzY0MTIwOTAxNDQ2MjAyNDY1NF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

### 3\. Create and activate a new Conda environment for LeRobot

```Bash
conda create *-y* *-n* lerobot *python*=3.10
```

Then activate your Conda environment \(you need to do this every time you open the Shell to use LeRobot\!\): 

```Bash
conda activate lerobot
```

### 4\.  Clone LeRobot  : 

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5\. Install ffmpeg in your environment:

When using `miniconda`, install `ffmpeg` in your environment:

```PowerShell
conda install ffmpeg -c conda-forge
```

This usually installs ffmpeg 7\.X compiled with the libsvtav1 encoder for your platform\. If libsvtav1 is not supported \(you can check the supported encoders via `ffmpeg -encoders`\), you can: 

【For all platforms】Explicitly install ffmpeg 7\.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

\[Linux only\] Install the build dependencies for ffmpeg and compile ffmpeg with libsvtav1 support from source, and ensure that the ffmpeg executable used is correct, which can be confirmed via `which ffmpeg`\.

If you encounter the following error, you can also use the above command to resolve it\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjdhMGY3MzYyMzRmOWUzMGZjMjY0ODg1NGJhNzhlYjhfNDI4MmRjMDgwY2JlNjBhNWVkNDA5NTlmYjc4YTQwNzlfSUQ6NzY0MTIwOTAxNjQwNzkzNTk2Nl8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

### 6\. Install LeRobot with feetech motor dependencies:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# Configure Motor 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTgxM2NjYjJlMzk1ZWFlMWIzNWRmOGVlNWEzNjY5NGNfYzg4NjYwMDQ1ZThlZGY0NjJmZGM0ZGJjMmZkZjMzYThfSUQ6NzY0MTIwOTAxMzc5MDg3MDQ4Ml8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2UzYmVkMmVkYTlhMjk3MjQ3ZjYwMGZmMzJjODI3ZDhfMzg3MmMyYWJlZmYzMDY2NWI4Y2YzNzM4MTM5NjZhMTNfSUQ6NzY0MTIwOTAxMzA2NTU4MzU1Ml8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

### **1\. Find the USB port associated with the robotic arm**

To find the correct port for a single motor, run the following utility script twice:

```Bash
lerobot-find-port
```

Example output \(e\.g\., `/dev/tty.usbmodem575E0031751` on Mac, or `/dev/ttyACM0` on Linux\):

Example output \(e\.g\., `/dev/tty.usbmodem575E0032081` on Mac, or `/dev/ttyACM1` on Linux\):

Troubleshooting: On Linux, you may need to grant USB port access via the following command:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2\. Configure your motor \(finished products can skip this step\)**

Insert each motor of your chassis in sequence and run the following script\. It will first initialize the servos of the robotic arm \(ID 6\.\.1\), then initialize the chassis servos, setting their IDs to \(ID 9\.\.7\)\. If you have already calibrated the robotic arm, you can continuously press Enter to overwrite and skip:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjUwMzU5MjE4ZTZiZGU4NjVlMzQ4ZGFmMzdhYWQwZjhfNzUxYzE5YjJmMzgzMjgzM2QzZTZjYzQzYTJkZGNmZDJfSUQ6NzY0MTIwOTAxNTE5NTk2MjMwMF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

### 3\. Set up the domestic mirroring of HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 输出
# https://hf-mirror.com
```

#### ① Create Token 

https://huggingface\.co/settings/tokens

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTA0OWQxOGQxMzZiYTU4MTFhZmVjNzEyZDhmMDI5MGJfYTRiOWI5M2EyODVlM2IwOGU1MmFjZDE0OTIxZGJhNzZfSUQ6NzY0MTIwOTAxNDM4MTQxNTM3NF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmMxNGIzNTc0OTZjZTViMDEyMTUzMGQ0NmQ3YzMxZGVfOTc1MWQ0MjFmYzBkZDNiYjQ5YmUxZWU5NzBkNmE3ZWFfSUQ6NzY0MTIwOTAxNTI3MTQ1OTc5Nl8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjFjOTU1NDNjYWQwNzBjMGI1OWExY2EyMTJhYjkwOTVfMjUyNGRiNmY0OWVlZWY1MzFlZmU1NWEyY2VlNTc4ZTVfSUQ6NzY0MTIwOTAxNjI1MjY2NDc3Ml8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

#### ② Record Token

For example, mine is:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③ Bind Token

```Shell
hf auth login

hf auth whoami
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGExMmEwMWVlMGQ5ODAxMzAyNTZhODZmZmIzZDdkOGNfOTFhNzA2MTVkZTJiMmJkOGI2OTY2MDVkYWVkMjQ5NjdfSUQ6NzY0MTIwOTAxNDEzMDYwOTA4M18xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

#### ④Create Dataset Repo

**Record the Owner and Dateset name, which are the \<hf\_username\> and \<dateset\_repo\_id\> required later **

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2JhYzRjNWFhOTQ5NDczMDcwYzc4ZjFhZjVmNjMwZjdfZTUzYTliZmYxMjI1YzhiNzUyNjJhMjcyNmVjY2RiMjZfSUQ6NzY0MTIwOTAxMjM2NTExODQyOF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjU3MGMwOWEwYmU1NzcwMjc0MzRkNjM3ZmVhM2NkNWJfZTZhNzVmOTFhYmE5Y2ZhNmE2OWY4OGVhNjY3MjExOTdfSUQ6NzY0MTIwOTAxNDA4NjMwNjc4Nl8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjY5YTI4ZDU4ZDkxZWQyYzU5MTMwZTJhNGZhYzQ3MzZfYzkxYjliMDQyOWVhY2UyMzc0MmEyYzQ1YmFmZWE3ODZfSUQ6NzY0MTIwOTAxNjM5MTA2MDQyOF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

### 4\. Update the configuration\!\!\!

The configuration files on LeKiwi LeRobot and the laptop should be consistent\. First, we need to find the **IP address** of the Raspberry Pi for the mobile robotic arm\. This is the same IP address used for SSH\. We also need to find the **USB port** of the active arm servo driver board on the laptop and the **port of the servo driver board on LeKiwi**\. These ports can be found through the following script\.

On Linux, you may need to grant access to the USB port by running the following command:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Important Note: Now that you have obtained the port number of the active arm and the IP address of the Lekiwi robotic arm, please update **ip** in the network configuration, update **port** in the active arm configuration, and update **port, remote\_ip** in the LeKiwi configuration\.

Modify these four files under the example\\lekiwi directory

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjRiZTA1ZDFjNTQ3ZTc5NjU1ZWU3ZGJkMDFiMDA3MmZfODZhNWQzNTVjNzc5ZGJjOGFkZDAyZjE1OGVlYjVkNjZfSUQ6NzY0MTIwOTAxNDAwMDY4Mzk4MV8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

#### ①修改teleoperate\.py

remote\_ip: IP address of Raspberry Pi

port: Port Number when the active arm is connected to a computer or Linux

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjQ5ZTkyZTcxMWVhY2EwM2IwNTZmNjMyNWFmNzI4MThfZDRhMTliZjk4NjBhNTI3YTQyZDhlY2Y5ZjY4NzExMThfSUQ6NzY0MTIwOTAxMzU3NzE5MDMzNl8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

#### ②Modify record\.py

HF\_REPO\_ID:[Username and Dataset Name on Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote\_ip: IP address of Raspberry Pi

port: Port Number when the active arm is connected to a computer or Linux

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODU2YTY2MjZkZWUzZjcxOWQ4YjU0Y2YxYzlkOTk5NmNfNDNmNTMwNjYyYTk1NTlmMTRhMTdhNmJjOGM4NDg0YjlfSUQ6NzY0MTIwOTAxNDgwNzQ0ODUyOV8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

#### ③Modify replay\.py

remote\_ip: IP address of Raspberry Pi

\<hf\_username\>/\<dataset\_repo\_id\>, i\.e\., [the Hugging Face username and dataset name](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWRjNzcxYTEzZDViZDg4OTVkNjI4ZDgyNDQ1MWZkN2NfNDVkYzVjNDVjZmNjNTIxMjkxZmM4YTUzYjBjNTU1MDhfSUQ6NzY0MTIwOTAxNDg5NTQ0NzAwOV8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

## Calibration

Now we need to calibrate the active arm and the passive arm\. The steering gear of the omnidirectional wheel does not need calibration\.

### Calibrate the follower arm \(mounted on the Lekiwi base\)

Run the following command on your computer to calibrate the active arm\. Note: The image shown here is an example for the SO101 model\.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

Now run the following command on your Raspberry Pi to calibrate the slave arm on LeKiwi\. Ignore its current position on the table \- normal calibration should be performed when installed on the Lekiwi chassis\. 

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

We unified the calibration methods for most robots\. First, we need to move the robot to a position where each joint is at its ** midpoint of the movable range **, and then press the button\. Second, we move all joints through their ** full movable range **\. You can [ find here ](https://huggingface.co/docs/lerobot/en/so101#calibration-video)` Enter ` a video of the same calibration process for SO101 as a reference\. 

# F\. Remote Operation

Open a new Anaconda Prompt

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDhkYjA2NGJlNDdhZDlhM2E0NDVlMGNiYzU0ODEwZjRfNjgwOTIwNmRhZjllNTg0MzMzYzM3OTZlNDQzNDE1N2VfSUQ6NzY0MTIwOTAxNTY4NjY2MzExMF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

> If you are using a Mac, you may need to grant "Terminal" permission to access the keyboard for remote operations\. Please go to "System Preferences" \> "Security \& Privacy" \> "Input Monitoring", and then check the "Terminal" checkbox\. 
> 
> 

To perform remote operations, log in to your Raspberry Pi via SSH and run the following command to activate the environment`conda activate lerobot`, then run the following script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzllYjM0MDA0NjU2YTZkZDc3YWI3YmI2MGI4YjE0ZGVfYzY1MDRiZTNiZmZiZjY0NWM2N2Y5YzM3MWMxYmZkMjBfSUQ6NzY0MTIwOTAxMzIwNzk5MzMwMF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

Next, on your laptop, also run the following command to activate the environment `conda activate lerobot`, and then run the following script:

```Bash
python examples/lekiwi/teleoperate.py
```

Your laptop screen should display an interface similar to this:`[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Now you can move the control arm and use the \(W, A, S, D\) keys on the keyboard to control the robot to move forward, turn left, move backward, and turn right\.Use the \(Z, X\) keys to control the robot to turn left or right\. Use the \(R, F\) keys to increase or decrease the speed of the mobile robot\. There are three speed modes in total, please refer to the following table: 

If you use a different keyboard, you can change the key settings for each command [` in LeKiwiClientConfig `](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) \. 

## Communication Fault Troubleshooting 

If you encounter problems when connecting to the mobile robot SO101, please follow the steps below to diagnose and resolve the issue\. 

### 1\. Verify IP address configuration

Ensure that the correct Raspberry Pi IP address is set in the configuration file\. To check the IP address of the Raspberry Pi, run the following command \(in the Pi's command line\):

```Bash
hostname *-I*
```

### 2\. Check if the laptop/PC can access Pi

Try to ping Raspberry Pi from the laptop: 

```Bash
ping <your_pi_ip_address>
```

If ping fails: 

- Ensure that Pi is powered on and connected to the same network\. 

- Check if SSH is enabled on Pi\. 

### 3\. Try SSH connection

If you cannot log in to Pi via SSH, it may be due to an incorrect connection\. Please use the following command: 

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

For example ` ssh pi@192.168.0.106 `

If a connection error occurs: 

- To ensure that SSH is enabled on Pi, you can run the following command: 

```Bash
sudo raspi-config
```

- Then navigate to:**Interfacing Options \-\> SSH** and enable it\.

### 4\. Configuration file consistency\!\!\!

Ensure that the configuration files on the laptop/PC and Raspberry Pi are exactly the same\. 

# G\. Record Dataset 

After getting familiar with remote operation, you can use LeKiwi to record your first dataset\. 

To start the program on LeKiwi, connect to your Raspberry Pi via SSH and run the following commands to activate the environment and start the script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

If you wish to use the Hugging Face hub feature to upload a dataset and have not logged in previously, please ensure you log in with a token that has write permissions, which can be generated from [ Hugging Face settings ](https://huggingface.co/settings/tokens): 

```Bash
hf auth login
```

Store your Hugging Face repository name in a variable to run the following command: 

```Bash
*hf auth whoami*
```

Then run the following command on your laptop to record 2 rounds and upload the dataset to the hub: 

```Bash
python examples/lekiwi/record.py
```

# H\. Visualize the dataset

If you have uploaded a dataset, you can [ visualize your dataset online ](https://huggingface.co/spaces/lerobot/visualize_dataset) and copy and paste the repository ID generated by the following command: 

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

If you have not uploaded a dataset, you can also perform visualization locally \(the browser window can open the visualization tool via `http://127.0.0.1:9090`\): 

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### Visualize a dataset \(optional, can be attempted\) 

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

If you have uploaded a dataset, you can also visualize it locally using the following command: 

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

If you haven't uploaded a dataset, you can also visualize it locally using the following command: 

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Here, ` juxi ` is the custom ` repo_id ` name during data collection\. 



#### Data collection techniques

Once you are familiar with data recording, you can create larger datasets for training\. A good starting task is to grasp objects from different positions and place them into containers\. We recommend recording at least 50 segments, with 10 segments for each position\. Keep the camera position fixed and maintain consistent grasping actions throughout the recording\. Additionally, ensure that the objects you are manipulating are clearly visible in the camera frame\. A simple criterion is that you should be able to complete this task just by observing the camera feed\. 

In the following chapters, you will train your neural network\. After achieving reliable grasping performance, you can start introducing more variations during the Data Acquisition process, such as increasing grasping positions, adopting different grasping techniques, and changing camera positions\. 

Avoid adding too many changes too quickly, as this may affect your results\. 

If you want to dive deeper into this important topic, check out our blog post on what makes a great dataset [\.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Troubleshooting:

In Linux systems, if the left and right arrow keys and the Esc key do not work during data acquisition, ensure that the `$DISPLAY` environment variable is set\. See [ Limitations of pynput ](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

# I\. Playback a Round

Now try to replay the first round on your robot:

```Bash
python examples/lekiwi/replay.py
```

Congratulations 🎉, your robot is ready for autonomous learning tasks\. Please follow the training section of this tutorial to start training it: [ Introduction to Real\-World Robots ](https://huggingface.co/docs/lerobot/il_robots)

## K\. Evaluate Your Strategy

Ensure to change remote\_ip, port, and HF\_MODEL\_ID

#### Modify evaluate\.py

HF\_MODEL\_ID="\<hf\_username\>/\<model\_repo\_id\>" should be modified to the name of the dataset uploaded to Hugging Face after training \(if uploaded to Hugging Face\) or the directory where the model is exported locally after training

HF\_DATASET\_ID = "\< hf\_username \>/\< eval\_dataset\_id \>" Change the username and eval\_ dataset name you created

remote\_ip: Raspberry Pi IP address

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjliNjkzYmM3NWE1MmVlNDEyMTIzNDk1ODM2YWU1YWJfMGQzMmQ2NzU5MTVkMzBkMGJmNzc2NDUxMzY5ZTVmZjVfSUQ6NzY0MTIwOTAxNTIwNDk4OTkwNF8xNzgwNjYxOTk4OjE3ODA3NDgzOThfVjM)

Then run the following command: 

```Bash
python examples/lekiwi/evaluate.py
```

1. The name of the dataset starts with `eval` to reflect that you are running inference \(e\.g\., `${HF_USER}/eval_act_lekiwi_test`\)\. 

2. If the evaluation phase encounters ` File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx' ` please first delete ` the folder starting with eval_ ` and then run the program again\. 



Simulation training can refer to

https://github\.com/Ekumen\-OS/lekiwi/tree/main

https://github\.com/SIGRobotics\-UIUC/LeKiwi\-sim



## Help 🙋 

For hardware issues, please contact customer service\. For usage issues, please join Discord\.

[LeRobot Platform](https://github.com/huggingface/lerobot)

[LeRobot Discord Channel](https://discord.gg/8TnwDdjFGU)



