# LeRobot机械臂教程

本教程已更新至12月15日，可选择跟随最新版[官方文档进行操作](https://github.com/huggingface/lerobot/tree/main)，官方文档具体教程可以参考[本链接](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c)。若需要URDF等文件请参考[本链接](https://github.com/TheRobotStudio/SO-ARM100)。9月15日旧版本请参考该[链接](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink)。SO\-ARM101与SO\-ARM100运行代码相互兼容。

## A\. 教程说明

**Pro版 黑色主动臂使用5V6A电源适配器，白色从动臂使用12V5A电源适配器！**

舵机安装和舵机角度校准要提前做好，可参考[官方组装教程](https://huggingface.co/docs/lerobot/so101)，本教程不涉及这些内容！

组装教程可参考 [Lerobot机械臂组装教程](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

若未配置好舵机或未组装机械臂，请先按照这个[README](https://github.com/TheRobotStudio/SO-ARM100)中的内容操作。它包含了材料清单，以及获取零件的链接，还包括3D打印零件的说明，以及如果您是第一次打印或者没有3D打印机时的建议。

让我们先从安装 LeRobot 环境开始。

## B\. 环境准备

For Ubuntu X86:

- Ubuntu 22\.04

- CUDA 12\+

- Python 3\.10

- Torch 2\.6\+

For Jetson Orin:

- Jetson Jetpack 6\.0\+

- Python 3\.10

- Torch 2\.5\.0a0\+872d972e41

[RealSense深度摄像头D400系列安装构建指南](https://dev.realsenseai.com/docs/installation)

[RealSense深度摄像头D400系列数据手册](https://realsenseai.com/wp-content/uploads/2025/08/Intel-RealSense-D400-Series-Datasheet-August-2025.pdf)

### 安装 LeRobot 环境

#### 1\. [安装 Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install)环境:

需要根据你的 CUDA 版本安装 pytorch 和 torchvision 等环境。

1. 对于 Jetson：

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

或者，对于 X86 Ubuntu 22\.04：

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2\. 在想要部署的 目录（创建例如：lerobot） 下为 lerobot 创建并激活一个新的 conda 环境：

> 请不要在 \~/miniconda3目录下创建或者导入lerobot项目
> 
> 

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3\. 然后激活您的 `conda` 环境（每次打开终端使用 lerobot 时都需要执行此操作！）：

```PowerShell
conda activate lerobot
```

#### 4\. 克隆 LeRobot：

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

可选择跟随最新版：https://github\.com/huggingface/lerobot\.git  

注：最新版本的命令代码可能不一致！

#### 5\. 在您的环境中安装 ffmpeg：

使用 `miniconda` 时，在您的环境中安装 `ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

这通常会为你的平台安装使用 libsvtav1 编码器编译的 ffmpeg 7\.X。如果不支持 libsvtav1（可以通过 `ffmpeg \-encoders` 查看支持的编码器），你可以：

【适用于所有平台】显式安装 ffmpeg 7\.X：

`conda install ffmpeg=7\.1\.1 \-c conda\-forge`

无图形依赖（gdk\-pixbuf、librsvg）用此命令安装：

`conda install ffmpeg=7\.1\.1 \-c conda\-forge \-\-no\-deps`

【仅限 Linux】安装 ffmpeg 的构建依赖并从源码编译支持 libsvtav1 的 ffmpeg，并确保使用的 ffmpeg 可执行文件是正确的，可以通过 `which ffmpeg` 确认。

如果你遇到以下报错，也可以使用上述命令解决。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzYxYWQ4N2E1MTllZDE1YzBiOTFjNDAzNGQyM2YwNjJfMGUyNmE5ODgzMTMxYzhjZjFmYWUzNWZjMDJkYTc4NTlfSUQ6NzU1MjgwMjM3MDkxMjE5MDQ2OF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### 6\. 进入lerobot目录下，安装带有 feetech 电机依赖的 LeRobot：

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

对于 Jetson Jetpack 6\.0\+ 设备（请确保在执行此步骤前按照[此链接教程](https://pytorch.org/get-started/locally/)安装了 Pytorch\-gpu 和 Torchvision）：

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7\. 检查 Pytorch 和 Torchvision

由于通过 pip 安装 lerobot 环境时会卸载原有的 Pytorch 和 Torchvision 并安装 CPU 版本，因此需要在 Python 中进行检查。

```Plain Text
import torch
print(torch.cuda.is_available())
```

如果输出结果为 False，需要根据[官网教程](https://pytorch.org/)重新安装 Pytorch 和 Torchvision。

[Jetson Orin上Pytorch不兼容](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8\.  intelRealSense深度相机SDK依赖环境安装（若有intelRealSense深度相机）

若需使用RealSense深度摄像头，在`lerobot/src/lerobot/`下安装pyrealsense2：

```Plain Text
pip install pyrealsense2
```

## C\. 机械臂控制

### 端口授权

连接好电源线，黑色主动臂使用5V6A电源适配器，白色从动臂使用12V5A电源适配器，舵机驱动板通过数据线连接到主机端

首先进入到`lerobot/src/lerobot/`目录下

```Plain Text
cd ~/lerobot/src/lerobot/
```

然后激活您的 `conda` 环境（每次打开终端使用 lerobot 时都需要执行此操作！）：

```Plain Text
conda activate lerobot
```

#### 1\. 运行脚本以查找端口

查找机械臂对应的 USB 端口 为了找到每个机械臂正确的端口，请运行实用脚本两次：：

```Plain Text
lerobot-find-port
```

#### 2\. 示例输出

识别Leader机械臂端口时的示例输出（例如，Mac 上为 `/dev/tty\.usbmodem575E0031751`，或 Linux 上可能为 `/dev/ttyACM0`）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

识别Follower机械臂端口时的示例输出（例如，`/dev/tty\.usbmodem575E0032081`，或在 Linux 上可能为 `/dev/ttyACM1`）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

请记住要拔出 USB 接头，否则将无法检测到接口。

#### 3\. 疑难解答

在 Linux 上，您需要通过运行以下命令来授予对 USB 端口的访问权限：

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### 校准机械臂

接下来，你需要对你的 SO\-10x 机器人接上电源和数据线进行校准，以确保在相同的物理位置时，Leader机械臂和 Follower机械臂的位置信息一致。这个校准过程至关重要，因为它可以让在一个 SO\-10x 机器人上训练的神经网络在另一个机器人上也能正常工作。如果需要重新校准机械臂，请完全删除`\~/\.cache/huggingface/lerobot/calibration/robots`或者`\~/\.cache/huggingface/lerobot/calibration/teleoperators`下的文件并重新校准机械臂，否者会出现报错提示，校准的机械臂信息会存储该目录下的json文件中。

#### 1\. Follower机械臂的手动校准

请通过 3 针接口连接 6 个机器人舵机的接口，并将底盘舵机连接到舵机驱动板，然后运行以下命令或 API 示例来校准机械臂：

以PC\(linux\)和jetson板卡为例，`第一个`插入usb接口会映射为`ttyACM0`，`第二个`插入usb接口会映射为`ttyACM1`。

在运行代码前请注意leader和follower的映射接口。

#### 2\. 接口授权

首先，您需要授予接口权限，运行以下命令：

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3\. 然后校准Follower机械臂

接下来，通过运行以下 Python 命令来校准从动臂：

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

首先，您需要将机器人移动到所有关节都位于其 可活动范围中间 的位置 并 保持机械臂不动。然后，按下回车键后，您必须将每个关节在其完整的运动范围内移动，校准文件会记录下可活动范围的中位、最大值和最小值,并保存在`\~/\.cache/huggingface/lerobot/calibration/robots`或者`\~/\.cache/huggingface/lerobot/calibration/teleoperators` 目录下json文件中。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmEzZGFjNzU2NjgyMTM4ODI4NTdiY2FmZTYwYTMwY2RfZGU3ODY1YmYwMzM3OTgwZjYxOWZlNWMzMTBhYzE4MDRfSUQ6NzU5NTE2NjYxNjExNjE2OTY4OF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDMxNWE2ODI1MGIyMTAzMjk0NDg1YTg2ZDVjNWY2OGZfNThmMTNlMWU3YjUzYzMyYWRhYjE5NzEwOTE5NDEyY2NfSUQ6NzU5NTE2NjY3MjY4MDgzMjIyNV8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### **4\. 校准Leader机械臂**

对主机械臂进行校准的步骤与上述相同，请运行以下命令或 API 示例：

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

\[机械臂中位校准视频\.mp4\]

### 遥感操作

#### **1\. ****简单****遥感****操作**

然后，您就可以准备遥操作您的机器人了！运行这个简单的脚本（它不会连接和显示摄像头）：

请注意，与机器人关联的 **ID** 用于存储校准文件。在使用相同设置进行遥控操作、录制和评估时，使用相同的 **ID** 至关重要。

先对串口给予权限：

```Bash
sudo chmod 666 /dev/ttyACM*
```

运行遥操作：

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

遥控操作命令将自动执行以下步骤：

1. 识别任何缺失的校准文件并启动校准程序。

2. 连接机器人和遥控设备，并开始遥控操作。

#### 2\. 带摄像头显示的远程操作

为了实例化摄像头，您需要一个摄像头标识符。这个标识符可能会在您重启电脑或重新插拔摄像头时发生变化，这主要取决于您的操作系统。

要查找连接到您系统的摄像头的**摄像头索引**，请运行以下脚本：

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

终端会打印相关摄像头信息。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzViYjM5OTFkMzU4MmEzNDhkODRiNTdiZWJhODUzNzlfZGQyN2E3NTRlY2RmZDZiODlkNzgwNTc2MDY5NzQ4N2ZfSUQ6NzU1MjgzMTE4NzE1MzUxODYxMV8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

您可以在 `\~/lerobot/outputs/captured\_images` 目录中找到每台摄像头拍摄的图片。

在 **macOS** 中使用 Intel RealSense 摄像头时，您可能会遇到 **“Error finding RealSense cameras: failed to set power state”** 的错误。这可以通过使用 `sudo` 权限运行相同的命令来解决。请注意，在 **macOS** 中使用 RealSense 摄像头是不稳定的。

之后，您就可以在遥控操作时在电脑上显示摄像头画面了，只需运行以下代码即可。这对于在录制第一个数据集之前准备您的设置非常有用。

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: \&\#34;MJPG\&\#34;`格式图像是经过压缩后的图像，你可以尝试更高分辨率，当然你可以尝试`YUYV`格式图像，但是这会导致图像的分辨率和FPS降低导致机械臂运行卡顿。目前`MJPG`格式下可支持`3`个摄像头`1920\*1080`分辨率并且保持`30FPS`, 但是依然不推荐2个摄像头通过同一个USB HUB接入主机

如果您有更多摄像头，可以通过更改 `\-\-robot\.cameras` 参数来添加。您应该注意`index\_or\_path` 的格式，它由 `python \-m lerobot\.find\_cameras opencv` 命令输出的摄像头 ID 的最后一位数字决定。

例如，如果你想添加摄像头:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

如果你想添加RealSense深度相机，先运行`python \-m lerobot\.find\_cameras realsense` 获取Id，并将此命令中robot\.cameras参数的serial\_number\_or\_name: \&\#34;323622271780\&\#34; 替换为自己的深度相机Id，`use\_depth: true` 启用深度流：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzAzOWI1ZmE0OWZlM2UxMGE5NzQ5NTE4NjBhNTVmNmJfMGE3NzVlMmZlYTQ3ZmQ1NzM3YjllNGE3ZmU1YzFmZGNfSUQ6NzU1OTA2MjA1NjQ2NjkyMzU0OF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D\. 数据采集

### 记录一个数据集

- 如果你想数据集保存在本地，可以直接运行：

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30 
```

其中`dateset\.repo\_id`和`dataset\.single\_task`可以自定义修改，`push\_to\_hub=false`，最后数据集会保存在主目录的`\~/\.cache/huggingface/lerobot`下会创建上述`juxi/test`文件夹，[若使用RealSense深度相机，可自行修改运行命令](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- 如果您想使用 Hugging Face Hub 的功能来上传您的数据集，并且您之前尚未这样做，请确保您已使用具有写入权限的令牌登录，该令牌可以从 [Hugging Face 设置](https://huggingface.co/settings/tokens) 中生成：

```Bash
hf auth login
```

将您的 Hugging Face 仓库名称存储在一个变量中，以运行以下命令：

```Bash
hf auth whoami
```

记录 5 个回合并将您的数据集上传到 Hub：

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30 
```

你会看到类似如下数据:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**参数说明**

- episode\_time\_s: 表示每次收集数据的时间。

- reset\_time\_s: 是每次数据收集之间的准备时间。

- num\_episodes: 表示预期收集多少组数据。

- push\_to\_hub: 决定是否将数据上传到 HuggingFace Hub。

|按键|动作|
|---|---|
|右箭头 →|提前终止当前剧集/重置；进入下一个。|
|左箭头 ←|取消当前剧集；重新录制。|
|ESC|立即停止会话，编码视频，并上传数据集。|



**数据收集技巧**

- **任务建议**：在不同位置抓取物体并将其放入箱子中。

- **规模**：记录 ≥50 个剧集（每个位置 10 个剧集）。

- **一致性**：

    - 保持摄像头固定。

    - 保持相同的抓取行为。

    - 确保操作的物体在摄像头画面中可见。

- **逐步推进**：

    - 先从可靠的抓取开始，然后再增加变化（新位置、抓取技巧、摄像头调整）。

    - 避免复杂性急剧增加，以防止失败。

💡 **经验法则**：仅使用摄像头画面作为指导，只根据屏幕反馈的视频图像，来控制机械臂完成任务。

如果你想要深入了解这个重要主题，可以查看我们撰写的关于什么是好的数据集的[博客文章](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)。

- 在接下来的章节中，你将训练你的神经网络。在实现可靠的抓取性能后，你可以在数据收集过程中引入更多变化，例如增加抓取位置、不同的抓取技巧以及改变相机位置。

- 避免快速添加过多变化，因为这可能会阻碍您的结果。

- \&\#34;如果你希望将数据保存在本地 \(`\-\-dataset\.push\_to\_hub=false`\)，请将 `\-\-dataset\.repo\_id=$\{HF\_USER\}/so101\_test` 替换为一个自定义的本地文件夹名称，例如 `\-\-dataset\.repo\_id=juxi/so101\_test`。数据将存储在系统主目录下的 `\~/\.cache/huggingface/lerobot`\&\#34;

- 如果你通过 `\-\-dataset\.push\_to\_hub=true` 将数据集上传到了 Hugging Face Hub，可以通过 [在线可视化你的数据集](https://huggingface.co/spaces/lerobot/visualize_dataset)，只需复制粘贴你的 repo id。

- 在回合记录过程中任何时候按下右箭头 → 可提前停止并进入重置状态。重置过程中同样，可提前停止并进入下一个回合记录。

- 在录制或重置到早期阶段时，随时按左箭头 ← 可提前停止当前剧集，并重新录制。

- 在录制过程中随时按 ESCAPE ESC 可提前结束会话，直接进入视频编码和数据集上传。

- 可以通过重新运行相同的命令并添加 `\-\-resume=true` 来恢复录制。⚠️ **重要提示**：在恢复时，需将 `\-\-dataset\.num\_episodes` 设置为要额外记录的剧集数量（而不是数据集中目标的总剧集数量）。如果要从头开始录制，请手动删除数据集目录。

- 在 Linux 上，如果在数据记录期间左右箭头键和 Esc 键没有效果，请确保您已设置 $DISPLAY 环境变量。参见 [pynput 限制](https://pynput.readthedocs.io/en/latest/limitations.html#linux)。

如果你的键盘按下后没有反应，可能你需要降低你pynput的版本，例如安装个1\.6\.8版本的。

`pip install `*`pynput`*`==1\.6\.8`

### 可视化一个数据集（可跳过，可尝试）

```Python
echo ${HF_USER}/so101_test  
```

如果您没有使用 `\-\-dataset\.push\_to\_hub=false` ，并上传了数据，您也可以在本地通过以下命令进行可视化：

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test \
```

如果您使用了 `\-\-dataset\.push\_to\_hub=false` ，没有上传数据，您也可以通过以下命令在本地进行可视化：

```Python
lerobot-dataset-viz \
  --repo-id juxi/test \
```

这里，`juxi` 是数据收集时自定义的 `repo\_id` 名称。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjBjNjkzN2EyMjU4ZjY2YTUyMGY2ZDJlMjdmMGNmNTNfOGUzOTA4NTNiNGEwYWQxMjRlZDkxODgzNDE4ZTJiMTJfSUQ6NzU1MjgxNDgxMzQyODQ0OTI5OV8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

### 回放一个片段（可跳过，可尝试）

现在，尝试在您的机器人上重播第一个数据集：

```Python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

此时，机械臂应该做出与你遥操记录时一样的动作。

## E\. 数据集训练及评估

### ACT

参考官方教程[ACT](https://huggingface.co/docs/lerobot/act)

**训练**

要训练一个控制您机器人策略，使用 `python \-m lerobot\.scripts\.train` 脚本。需要一些参数。以下是一个示例命令：

```Python
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000 
```

**如果您想在本地数据集上进行训练，请确保 ****`repo\_id`**** 与数据收集时使用的名称匹配，并添加 ****`\-\-policy\.push\_to\_hub=false`****。**

```Python
lerobot-train \
  *--dataset.repo_id*=juxi/test \
  *--policy.type*=act \
  *--output_dir*=outputs/train/act_so101_test \
  *--job_name*=act_so101_test \
  *--policy.device*=cuda \
  *--wandb.enable*=false \
  *--policy.push_to_hub*=false\
  *--steps*=300000 
```

命令解释

- **数据集指定**：我们通过 `\-\-dataset\.repo\_id=$\{HF\_USER\}/so101\_test` 参数提供了数据集。

- **训练步数**：我们通过 `\-\-steps=300000` 修改训练步数，算法默认为800000，根据自己的任务难易程度，观察训练时候的loss来进行调整。

- **策略类型**：我们使用 `policy\.type=act` 提供了策略，同样你可以更换\[act,diffusion,pi0,pi0fast,pi0\.5,sac,smolvla\]等策略，这将从 `configuration\_act\.py` 加载配置。重要的是，这个策略会自动适应您机器人（例如 `laptop` 和 `phone`）的电机状态、电机动作和摄像头数量，这些信息已保存在您的数据集中。

- **设备选择**：我们提供了 `policy\.device=cuda`，因为我们正在 Nvidia GPU 上进行训练，但您可以使用 `policy\.device=mps` 在 Apple Silicon 上进行训练。

- **可视化工具**：我们提供了 `wandb\.enable=true` 来使用 [Weights and Biases](https://docs.wandb.ai/quickstart) 可视化训练图表。这是可选的，但如果您使用它，请确保您已通过运行 `wandb login` 登录。

如果你遇到了以下报错：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWIwY2U4ODI3MzJkZjJkN2VjNjZiOThjNGRiNmZkOTFfYmU4NDRkZGJmNTE1YWMzMDExMDAzMzFjYWI4OGQ1Y2NfSUQ6NzU1MjgxNTExMzI2MzcxMDIxMF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

尝试运行以下命令来解决:

```Bash
pip install datasets==2.19
```

训练可能需要几个小时。您将在 `outputs/train/act\_so101\_test/checkpoints` 目录中找到训练结果权重文件。

要从某个训练结果权重文件恢复训练，下面是一个从 `act\_so101\_test` 策略的最后一个训练结果权重文件恢复训练的示例命令：

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**评估**

您可以使用 [`lerobot/record\.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) 中的 `record` 功能，但需要将策略训练结果训练结果权重文件作为输入。例如，运行以下命令记录 10 个评估回合：

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `\-\-policy\.path` 参数，指示您的策略训练结果权重文件的路径（例如 `outputs/train/act\_so101\_test/checkpoints/last/pretrained\_model`）。如果您将模型训练结果权重文件上传到 Hub，也可以使用模型仓库（例如 `$\{HF\_USER\}/act\_so101\_test`）。

2. 数据集的名称`dataset\.repo\_id`以 `eval\_` 开头，这个操作会在你评估的时候为你单独录制评估时候的视频和数据，将保存在eval\_开头的文件夹下，例如`juxi/eval\_test123`。

3. 如果评估阶段遇到`File exists: \&\#39;home/xxxx/\.cache/huggingface/lerobot/xxxxx/juxi/eval\_xxxx\&\#39;`请先删除`eval\_`开头的这个文件夹再次运行程序。

4. 当遇到`mean is infinity\. You should either initialize with stats as an argument or use a pretrained model`请注意`\-\-robot\.cameras`这个参数中的front和side等关键词必须和采集数据集的时候保持严格一致。

### Smolvla

参考官方教程[SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**训练**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**验证**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \ 
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

参考官方教程[Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**训练**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false 
```

**验证**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0\.5

参考官方教程[Pi0\.5](https://huggingface.co/docs/lerobot/pi05)

```Bash
pip install -e ".[pi]"
```

**训练**

```Bash
lerobot-train \
    --dataset.repo_id=juxi/eval_test123 \
    --policy.type=pi05 \
    --output_dir=outputs/pi05_training \
    --job_name=pi05_training \
    --policy.pretrained_path=lerobot/pi05_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch_size=32
```

**验证**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi05_training/checkpoints/last/pretrained_model
```

### GR00T N1\.5

请参考官方教程[GR00T N1\.5](https://huggingface.co/docs/lerobot/groot)

## F\.云服务器训练部署及模型导出

以 AutoDL算力云 为例，www\.autodl\.com，注册登录充值余额

#### **1\.点击“算力市场”，选择需要的显卡，尽量选多核心**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmFhODM0Njc0ZTNjZjNkMTIwNzQ4ZTdhNDhkOTU2OTZfMWYxMWU1ZWJlZmEyYjNkOTdiNmRjZmE1OWY0Mzk5NzBfSUQ6NzU4NzU5OTAzMzEzNzY2MjkyM18xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### **2\.选择“按量计费”，基础镜像选择“Miniconda/conda3/3\.8\(ubuntu20\.04\)/11\.8”，点击“立即创建”**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWEwODUzZTgxNWYxZGM2NTFhYzAwNjkyMDIwYzZjMmNfZTIwMjFlNmIyZDU4ODFmZDliZTYxY2I2YTU5MTNmOWZfSUQ6NzU4NzYwMDcxMzA2NjU2NDU2Nl8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### **3\.点击“JupyterLab”进入控制界面，打开终端**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGYwYzFiMTgxNzdhOTE4Y2Y4OWZiY2YyMjk5ZTlhODRfNTM5MWVlYmI1NTFiMDM3ZTY0NTY0OGQzYTFkY2FmYzBfSUQ6NzU4NzYwMTMwNTE3NTE4MjI2N18xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### **4\.初始化conda环境**

```Plain Text
conda env list
```

```Plain Text
conda activate base
```

```Plain Text
conda init
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWMyMzRmZDgzMzExMmRhMTJkM2NlNDA0ZGI5OWVmMGVfODkxMDkyZjQ1ZTU5NzQ4NTc5ZDhkMjQ5N2IyNzlkNmVfSUQ6NzU4NzYwMTg3MDc2NDc1NjE2OF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### **5\.关闭此终端，打开****新的终端****，配置学术资源加速**

参考https://www\.autodl\.com/docs/network\_turbo/

```Plain Text
source /etc/network_turbo
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWRiMjg3YTlkNzI3ZWNlOTNmMjgxNjE5NmIzNWVhY2NfNDk4NWU4MzUwNDU3MjM4MDE5MGE4YzIxYjliNjI2YjZfSUQ6NzU4NzYwMzM5NDU1NTM5OTM1N18xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### **6\.创建lerobot环境**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/JuxiTechnology/lerobot.git
```

可选择跟随最新版：https://github\.com/huggingface/lerobot\.git  

注：最新版本的命令代码可能不一致！

```PowerShell
conda install ffmpeg -c conda-forge
```

#### **7\.进入src目录下的lerobot，安装带有 feetech 电机依赖的 LeRobot：**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8\.数据集导入到云服务器里**

分为两种情况，一种是**数据采集 时已上传数据集到huggingface数据库里，**一种是**未上传数据集到huggingface数据库里，通过FileZilla上传本地数据集到云服务器里。**

**①若 数据采集 时已上传数据集到huggingface数据库里，可通过配置huggingface数据库得到的key获取**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWYwNTQ0OGNjYTQyZTY0NDJhYWI2YTI0ODYxMGJhNGNfN2Q5MGYyNjY1YjZkY2QxODc0MTE2MDViZDJlOWE3OTZfSUQ6NzU4NzYwNzkxNTUwMzY2ODQ0N18xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODFjNjY1ZWExNDg3MDU3NTRkY2E4MGI4ZWNjOGM3YjRfYTk5MmIyNzczMTEwM2IzNDA5NDQ1MWU1NDk1NjJjZDJfSUQ6NzU4NzYwNjk0NzQxNTkwMzQyOV8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

```Plain Text
export HYDRA_FULL_ERROR=1
```

**②通过FileZilla上传本地数据集，参考**https://www\.autodl\.com/docs/filezilla/

Linux最简单的安装方式：

```Python
sudo apt install filezilla
```

```Python
filezilla
```

打开filezilla，点击“文件”选择“站点管理器”，创建“新站点”，选择“SFTP协议”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmUxN2NlY2UxMjAxNmQ2ZmViYmNhZDU4MzM4MDNjNWJfZDhiMTVhMTg2OTU2YjI0MDgxZTBjNDg2YmQ4MWM3MmJfSUQ6NzU4NzYxMDE1MjI5NjY0NzY0OF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDg2MjdkMTk4ZTk3NTJkMGViZWZlZDA4NmQwMWY3ZWRfMWUyNmE3MmI3YTVjNzJiNDM3NzcxODIzM2I2MTM0NzNfSUQ6NzU4NzYxMTAyMzg5NDA1NjEzMF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

返回AutoDL算力云复制“登录指令”并粘贴到方便查看的地方，将对应信息复制粘贴进去，点击“连接”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI3ZDRlYjk2ZmI5NDhlMjAyNTIwMDcyNWZkNzRhZjdfM2YxYzQwZTNjMjcxNGVkOTIwMTU2Mzg4YzQ0NDA1MThfSUQ6NzU4NzYxMjMwMjQwNjAyODUxNF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUwM2VlOTBjODg3ZmUzNzE4OTYyZjg5ZThjZTUxM2FfMDQ4OTgzNDU5NWJhZDBiMDEwMTljNmRiMTA1ZGQ4YTdfSUQ6NzU4NzYxMjgxNzQ0OTc2NjA3NF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTlkNjcyNDhhNWI3ODUxYTY2NjlkYTRkMjVkNWIxNTFfOGU4NTNhNjBhOTg3OGY5NmE5MDE4YTc1MTFmZjFjMmFfSUQ6NzU4NzYxMzExNDYzNzA5MzgzOV8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmRmM2YxNjRkOWY0OGE4NWNmMGI2MjdjNTVhYWJiZWVfOWFjYzM5NzFmNDZkZDkzYjMxYmZmMDkwNDM4NDhhMWVfSUQ6NzU4NzYxMzc1MzUxMzM5NzQ3NF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDdkN2I1OTMwZjAwYTk5MjZhYWFlZTA3NGUxMzBlNjJfMTk0MGZlYWYwMmZlODhhMzA1MGUxZTIwMTYxZGM5YWVfSUQ6NzU4NzYxMzg5NjMyNTE4ODU0OF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

在云服务器的lerobot目录下 创建 data 文件夹

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODg0MzU3ZTJiZmY0ZWM3N2ZjZDgxYjMxYjU3YTE1M2RfMGM1ZDk1MjY0NTYzOGQ4NTcwY2EwNDA5ZGJlNDAwOWFfSUQ6NzU4NzYxNTY5OTA3MTIyNTA1MV8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

将数据集文件夹 拉到 右边 进行传输，等待传输完成

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWY1NGYwNWIyZjE2OGMwN2Y2NDNkMzhlM2I4NGMzYmVfYmE2NzE4NTk4ZDQyOGJlYmI5ODhjOWE4YzU1OGMyMDlfSUQ6NzU4NzYxNjM2MTA0MTA3MTA3MF8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

#### 9\.数据集训练

参考本教程的 [E\.数据集训练及评估](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-Rpd1dD4H6ovlDexOxJVcBMSxnFb)，在云服务器中运行训练命令

#### 10\.模型文件导出

训练完成后，将对应train目录下的训练模型导出

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDA5YjdhYTU0YTE0NzZkN2VjMzQ5YzMyZmI0ZjAwZGNfOWY4ZWE2ZmE5NmY1ZGNkMzM1MmI4ZmYzZTAzMDRiOGJfSUQ6NzU4NzYxODM0MDQyMDU3MDMzNl8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

## G\. 常见问题

如果使用本文档教程，请git clone本文档推荐的github仓库https://github\.com/JuxiTechnology/lerobot\.git

本文档推荐的仓库是验证过后的稳定版本，Lerobot官方仓库是实时更新的最新版本，会出现一些无法预知的问题，例如数据集版本不同，指令不同等。

- [若使用RealSense深度相机，可自行参考并修改运行命令](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- 在Jetson设备中，运行评估命令后未设置回合数和回合时间只能通过ctrl\+z中断进程会导致机械臂和相机断连，重连后所有端口都改变

在命令中加入评估的回合数和回合时长的参数

如：

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- 如果校准舵机ID时候遇到

```Bash
`Motor ‘gripper’ was not found, Make sure it is connected`
```

请仔细检查通讯线是否与舵机连接正常，电源是否正确电压供电。”

- 如果遇到

```Bash
Could not connect on port "/dev/ttyACM0"
```

并且通过`ls /dev/ttyACM\*`看到是有ACM0存在的，则是忘记给串口权限了，终端输入`sudo chmod 666 /dev/ttyACM\*` 即可

- 如果遇到

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

请安装ffmpeg7\.1\.1,`conda install ffmpeg=7\.1\.1 \-c conda\-forge`。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTA0NDQ5ZTQ0YjAzZDY5YjFlNGQ3MTg3YTliMjE2M2ZfNDI1NmNjZTBmZjgxY2Y0NTg2ZDRkZmM2NWE3NDA4M2JfSUQ6NzU1MjgxNTcyNDMxOTI3NzA1N18xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

- 如果遇到

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

需要检查对应端口号的机械臂是否接通电源，总线舵机是否出现数据线松动或者脱落,哪个舵机灯不亮就是前面那个舵机的线松了。

- 如果校准机械臂的时候遇到

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

对机械臂进行重新断电和上电，再次尝试校准机械臂加准，如果在校准过程中遇到MAX角度达到上万的值也可以使用这个方法，如果不行则需要对相应舵机进行重新舵机校准，即中位校准和ID写入。

- 如果评估阶段遇到

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

请先删除`eval\_`开头的这个文件夹再次运行程序。

- 如果评估阶段遇到

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

请注意\-\-robot\.cameras这个参数中的front和side等关键词必须和采集数据集的时候保持严格一致。

- 如果你维修或者更换过机械臂零件，请完全删除`\~/\.cache/huggingface/lerobot/calibration/robots`或者`\~/\.cache/huggingface/lerobot/calibration/teleoperators`下的文件并重新校准机械臂，否者会出现报错提示，校准的机械臂信息会存储该目录下的json文件中。

- 在3060的8G笔记本上训练ACT的50组数据的时间大概为6小时，在4090和A100的电脑上训练50组数据时间大概为2\~3小时。

- 数据采集过程中要确保摄像头位置和角度和环境光线的稳定，并且减少摄像头采集到过多的不稳定背景和行人，否则部署的环境变化过大会导致机械臂无法正常抓取。

- 数据采集命令的num\-episodes要确保采集数据足够，不可中途手动暂停，因为在数据采集结束后才会计算数据的均值和方差，这在训练中是必要的数据。

- 如果程序提示无法读取USB摄像头图像数据，请确保USB摄像头不是接在Hub上的，USB摄像头必须直接接入设备，确保图像传输速率快。

如果你遇到无法解决的软件问题或环境依赖问题，除了查看本教程末尾的常见问题 部分外，请及时在 [LeRobot 平台](https://github.com/huggingface/lerobot) 或 [LeRobot Discord 频道](https://discord.gg/8TnwDdjFGU) 反馈问题。

## Windows查找舵机（飞特舵机上位机调试软件）

为了进行调试，任何 Windows PC 都可以通过 USB 连接来对舵机进行编程、调试或测试。为此，请下载[Feetech 软件](https://www.feetechrc.com/software.html)。对于 Ubuntu 系统，您可以使用[FT\_SCServo\_Debug\_Qt 工具](https://github.com/Kotakku/FT_SCServo_Debug_Qt)。

\[fddebug\-master\.zip\]

选择端口号，波特率选1000000，打开，并点击“搜索”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzY2ZDU0ZjBiNjE5YWNlODEwMWEyMjVhYzkwOGM4NWVfMWJmZTg3YWVkMzk2YjgzZDcxZTIzOTBhNmNiZTI2NjNfSUQ6NzU5OTYwNjI2ODAwMTA3ODIzNl8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)





## ROS2 仿真控制（可自行实现）

https://github\.com/holmsslk/so\-arm\-moveit\-hardware



## 网页端设置舵机ID和中位校准

https://bambot\.org/feetech\.js?lang=zh

1、根据舵机型号输入0或1，点击“连接”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWRlZWVhNmVkZWEyMjQyYjZlN2M1YjA0NTEyZjU4MTlfYmE4OWMyZjM4OTM3NGVlODc3NmE0ZmU3MzhlNTdjZmVfSUQ6NzYyODEwMzIyMDk2NzUyNTU4Nl8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

2、扫描ID 1\~6 的舵机，可以根据扫描结果里的FOUND确认对应ID舵机。例如图片里舵机 ID 1 被扫描到了

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDFkMjYyMWI3MDI3OWEzMTIwMzEzNzk5Y2M5NGM2NGZfOTQyY2U3YWZlMDdmODA1NmMwMDc5YjViZjc5ZDc5NTRfSUQ6NzYyODEwMzQyNzc0MjM1NDM5Ml8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)

3、ID设置和中位校准

①当前舵机ID输入为被扫描到的舵机ID

②在“ID管理”中输入数字，点击“更改ID”即可设置ID

③中位校准（STS3215舵机中位是2047，SCS0009舵机中位是511）

STS舵机：在“位置控制”输入2047，并点击“Set”

SCS舵机：在“位置控制”输入511，并点击“Set”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGRhNTBjMGY0YmQ4YjgzZTEwNzQ4MGQ5NjAxNTYxMzhfZGY1MTIyYWY3MjNmMjU1YjQyYjY4YzI1ODAxNWZjZGJfSUQ6NzYyODEwMzU3OTc2OTExMzUzMl8xNzgwMDQ4MDYzOjE3ODAxMzQ0NjNfVjM)



