# LeRobot Robot Arm Tutorial

This tutorial has been updated to December 15th, and you can choose to follow the latest version [ of the official documentation for operation ](https://github.com/huggingface/lerobot/tree/main)\. For the specific tutorial in the official documentation, please refer to [ this link ](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c)\. If you need files such as URDF, please refer to [ this link ](https://github.com/TheRobotStudio/SO-ARM100)\. For the old version of September 15th, please refer to this [ link ](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink)\. The running codes of SO\-ARM101 and SO\-ARM100 are mutually compatible\. 

## A\. Tutorial Instructions

**The Pro version\&\#39;s black active arm uses a 5V6A power adapter, while the white passive arm uses a 12V5A power adapter\! **

Servo installation and servo angle calibration should be completed in advance, and you can refer to [ the official assembly tutorial ](https://huggingface.co/docs/lerobot/so101), which is not covered in this tutorial\! 

Refer to the assembly tutorial for details [Lerobot SO\-ARM101 Assembly Tutorial](https://juxitech.feishu.cn/wiki/L3oEwxXQqiLWIfkPu4BcWbxlnKg)

If the servo is not configured or the robotic arm is not assembled,  please  first  follow the instructions in this [ README ](https://github.com/TheRobotStudio/SO-ARM100)\. It includes a bill of materials, links to obtain parts, instructions for 3D printing parts, and suggestions if you are printing for the first time or do not have a 3D printer\. 

Let\&\#39;s first start from installing the LeRobot environment\.

## B\. Environment Preparation

For Ubuntu X86:

- Ubuntu 22\.04

- CUDA 12\+

- Python 3\.10

- Torch 2\.6\+

For Jetson Orin:

- Jetson Jetpack 6\.0\+

- Python 3\.10

- Torch 2\.5\.0a0\+872d972e41

[Installation and Construction Guide for RealSense Depth Camera D400 Series](https://dev.realsenseai.com/docs/installation)

[RealSense Depth Camera D400 Series Data Sheet](https://realsenseai.com/wp-content/uploads/2025/08/Intel-RealSense-D400-Series-Datasheet-August-2025.pdf)

### Install LeRobot  Environment 

#### 1\. [Install the Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) environment:

You need to install environments such as pytorch and torchvision according to your CUDA version\. 

1. For Jetson: 

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

Alternatively, for X86 Ubuntu 22\.04:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2\. Under the directory where you want to deploy \(create, for example: lerobot\), create and activate a new conda environment for lerobot: 

> Please do not create or import the lerobot project under the \~/miniconda3 directory
> 
> 

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3\. Then activate your `conda` environment \(you need to do this every time you open the terminal to use lerobot\!\):

```PowerShell
conda activate lerobot
```

#### 4\. Clone LeRobot:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

You can choose to follow the latest version: https://github\.com/huggingface/lerobot\.git  

Note: The command codes in the latest version may vary\!

#### 5\. Install ffmpeg in your environment:

When using `miniconda`, install `ffmpeg` in your environment:

```PowerShell
conda install ffmpeg -c conda-forge
```

This usually installs ffmpeg 7\.X compiled with the libsvtav1 encoder for your platform\. If libsvtav1 is not supported \(you can check the supported encoders via `ffmpeg \-encoders`\), you can: 

【For all platforms】Explicitly install ffmpeg 7\.X:

`conda install ffmpeg=7\.1\.1 \-c conda\-forge`

Without graphical dependencies \(gdk\-pixbuf, librsvg\), use this command to install:

`conda install ffmpeg=7\.1\.1 \-c conda\-forge \-\-no\-deps`

\[Linux only\] Install the build dependencies for ffmpeg and compile ffmpeg with libsvtav1 support from source, and ensure that the ffmpeg executable used is correct, which can be confirmed via `which ffmpeg`\.

If you encounter the following error, you can also use the above command to resolve it\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGRkNWUwNjBlZjhkODRlMzgzNjg3NzZkOGFkMjM4YjNfMDBjZmMyZDZmYmI3MzE2MGYyN2MyY2VkOGEyYThjZDRfSUQ6NzYzODkxNTY4MDg0MzQ2Nzc0NF8xNzgwMDQ4MTk2OjE3ODAxMzQ1OTZfVjM)

#### 6\. Enter the lerobot directory and install LeRobot with feetech motor dependencies: 

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

For Jetson Jetpack 6\.0\+ devices \(please ensure that Pytorch\-gpu and Torchvision have been installed according to Step 5 of [this link tutorial](https://github.com/Seeed-Projects/reComputer-Jetson-for-Beginners/tree/main/3-Basic-Tools-and-Getting-Started) before performing this step\):

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # Install OpenCV and other dependencies via conda, only applicable to Jetson Jetpack 6.0 and above
conda remove opencv   # Uninstall OpenCV
pip3 install opencv-python==4.10.0.84  # Install the specified version of OpenCV using pip3
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # This version needs to be compatible with torchvision
```

#### 7\. Check Pytorch and Torchvision

Since installing the lerobot environment via pip will uninstall the original Pytorch and Torchvision and install the CPU version, it is necessary to perform a check in Python\.

```Plain Text
import torch
print(torch.cuda.is_available())
```

If the output result is False, you need to reinstall Pytorch and Torchvision according to [ the official website tutorial ](https://pytorch.org/)\. 

If you are using a Jetson device, please follow [ this tutorial ](https://github.com/Seeed-Projects/reComputer-Jetson-for-Beginners/tree/main/3-Basic-Tools-and-Getting-Started) to install Pytorch and Torchvision\. 

[Pytorch Incompatibility Issue on Jetson Orin ](https://juxitech.feishu.cn/wiki/ZwArw2EFhiEktlk4ipscl69WnCc)

#### 8\.  Installation of the dependent environment for the intelRealSense Depth Camera SDK \(if an intelRealSense Depth Camera is available\)

If you need to use the RealSense depth camera, install pyrealsense2 under ` lerobot/src/lerobot/ `: 

```Plain Text
pip install pyrealsense2
```

## C\. Manipulator Control

### Port Authorization

Connect the power cord,  the black active arm uses a 5V6A power adapter, and the white passive arm uses a 12V5A power adapter , the servo driver board is connected to the host end via a data cable 

First, enter the`lerobot/src/lerobot/`directory

```Plain Text
cd ~/lerobot/src/lerobot/
```

Then activate your ` conda ` environment \(you need to do this every time you open the terminal to use lerobot\!\): 

```Plain Text
conda activate lerobot
```

#### 1\. Run the script to find the port

Find the USB port corresponding to the robotic arm\. To find the correct port for each robotic arm, please run the utility script twice: 

```Plain Text
lerobot-find-port
```

#### 2\. Example Output

Example output when identifying the Leader robot arm port \(e\.g\., `/dev/tty\.usbmodem575E0031751 `on Mac, or `/dev/ttyACM0 `on Linux\): 

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Example output when identifyingthe Follower mechanicalarm port \(e\.g\.,`/dev/tty\.usbmodem575E0032081`, or on Linux it might be`/dev/ttyACM1`\):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Please remember to unplug the USB connector; otherwise, the interface will not be detected\.

#### 3\. Troubleshooting

On Linux, you need to grant access to the USB port by running the following command:

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### CalibrateRobot Arm

Next, you need to connect the power supply and data cable to your SO\-10x robot for calibration to ensure that the position information of the Leader robotic arm and the Follower robotic arm is consistent when they are at the same physical location\. This calibration process is crucial because it enables the neural network trained on one SO\-10x robot to work properly on another robot\.If you need to recalibrate the robotic arm, please completely delete the files under `\~/\.cache/huggingface/lerobot/calibration/robots` or `\~/\.cache/huggingface/lerobot/calibration/teleoperators` and then recalibrate the robotic arm\. Otherwise, an error message will appear\. The calibrated robotic arm information will be stored in the JSON file under this directory\. 

#### 1\. Manual calibration of the Follower mechanical arm

Please connect the interfaces of 6 robot servos through the 3\-pin interface, connect the chassis servo to the servo driver board, and then run the following commands or API examples to calibrate the robotic arm:

Taking PC \(Linux\) and Jetson boards as examples,`the first`device inserted into the USB interface will be mapped to`ttyACM0`,`and the second`device inserted into the USB interface will be mapped to`ttyACM1`\.

Before running the code, please note the mapping interface between the leader and the follower\. 

#### 2\. Interface Authorization

First, you need to grant interface permissions and run the following command:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3\. Then calibrate the Follower robotic arm

Next, calibrate the slave arm by running the following Python command:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

First, you need to move the robot to a position where all joints are located at the  middle of their movable range  and keep the robotic arm still\. Then, after pressing the Enter key, you must move each joint through its full range of motion, and the calibration file will record the  median ,  maximum , and  minimum  values of the range of motion, and save them in the ` \~/\.cache/huggingface/lerobot/calibration/robots ` or ` \~/\.cache/huggingface/lerobot/calibration/teleoperators ` directory in a JSON file\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzExMmM4YWMyNWJmYzk5ODgxNzgwYzI2Mjc4MTU3MDhfNmYxMTlmYWVkZmQ2OWZiMDQxZjUyM2YyZWE4NDFhNmJfSUQ6NzYzODkxNTY4MzUwMzQyNjQ4OF8xNzgwMDQ4MTk3OjE3ODAxMzQ1OTdfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTM3OGNjMjc2YTY1MTc2Yjc5OWRkMGNmMzEwZWQxZWNfNzRjMGU4MjM0ZWYyODc0NWE3YTJlM2FhMjJhMWM0YjZfSUQ6NzYzODkxNTY4MTgzMjIwOTM1NV8xNzgwMDQ4MTk2OjE3ODAxMzQ1OTZfVjM)

#### **4\. Calibrate the Leader robotic arm**

The steps for calibrating the main robotic arm are the same as those described above\. Please run the following commands or API examples: 

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

\[机械臂中位校准视频\.mp4\]

### Remote Sensing Operation 

#### **1\. ****Simple****Remote Sensing****Operation**

Then, you can get ready to teleoperate your robot\! Run this simple script \(it won\&\#39;t connect to or display the camera\): 

Please note that the **ID** associated with the robot is used to store calibration files\. When performing remote operations, recordings, and evaluations using the same settings, it is crucial to use the same **ID**\.

First, grant permissions to the serial port: 

```Bash
sudo chmod 666 /dev/ttyACM*
```

Run teleoperation:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

The remote control command will automatically execute the following steps: 

1. Identify any missing calibration files and initiate the calibration procedure\. 

2. Connect the robot and the remote control device, and start remote control operation\. 

#### 2\. Remote operation with camera display

To instantiate the camera, you need a camera identifier\. This identifier may change when you restart your computer or re\-plug the camera, which mainly depends on your operating system\.

To find the**camera index**of the camera connected to your system, run the following script:

```Python

lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

The terminal will print relevant camera information\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjQyZTY4NzA5MDdhZjlmNWZkNTIyNWExZDYyZTk0Y2FfOWJkNzQyNTFlZDA0NTgyYTllMjM1NDRhYmU5MDBlY2RfSUQ6NzYzODkxNTY4MjEzMDc5MTM2OV8xNzgwMDQ4MTk3OjE3ODAxMzQ1OTdfVjM)

You can find the images captured by each camera in the `\~/lerobot/outputs/captured\_images` directory\.

When using an Intel RealSense camera in **macOS**, you may encounter the error ** \&\#34;Error finding RealSense cameras: failed to set power state\&\#34; **\. This can be resolved by running the same command with `sudo` privileges\. Please note that using a RealSense camera in **macOS** is unstable\. 

After that, you can display the camera feed on your computer during remote operation by simply running the following code\. This is very useful for preparing your setup before recording the first dataset\. 

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

`fourcc: \&\#34;MJPG\&\#34;` format images are compressed images\. You can try a higher resolution, and of course you can try `YUYV` format images, but this will cause the image resolution and FPS to decrease, leading to the robotic arm running laggy\. Currently, `MJPG` format can support `3` cameras `1920\*1080` resolution and maintain `30FPS`, but it is still not recommended to connect 2 cameras to the host through the same USB HUB 

If you have more cameras, you can add them by changing the ` \-\-robot\.cameras ` parameter\. You should pay attention to the format of ` index\_or\_path `, which is determined by the last digit of the camera ID output by the ` python \-m lerobot\.find\_cameras opencv ` command\. 

For example, if you want to add a camera:

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

If you want to add a RealSense depth camera, first run `python \-m lerobot\.find\_cameras realsense` to get the ID, and replace the serial\_number\_or\_name: \&\#34;323622271780\&\#34; parameter of robot\.cameras in this command with the ID of your own depth camera, `use\_depth: true` to enable the depth stream: 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmFjY2JjOTgwZGY2OTE2OWMxY2IwOWQ0Yjc0MTY2ODdfODAzZmZlZTRiZTZmYTI1MGUwYjYwYTIyNzg5ZGE3OWNfSUQ6NzYzODkxNTY4MDk2NTIwMDg0OF8xNzgwMDQ4MTk3OjE3ODAxMzQ1OTdfVjM)



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

## D\. Data Acquisition

### Record a dataset 

- If you want to save the dataset locally, you can directly run: 

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

Among them,`dateset\.repo\_id`and`dataset\.single\_task`can be customized and modified,`push\_to\_hub=false`, and finally the dataset will be saved in the`\~/\.cache/huggingface/lerobot`directory under the home directory, where the above`juxi/test`folder will be created\.[If a RealSense depth camera is used, the running command can be modified by yourself\.](https://juxitech.feishu.cn/docx/PsgFdioh2olGRmxgAqCcQM9znCc#doxcneJ9aHVAmVZh4YzfvrAktEb)

- If you want to use the functionality of the Hugging Face Hub to upload your dataset and you haven\&\#39;t done so before, please ensure you are logged in with a token that has write permissions, which can be generated from [ Hugging Face Settings ](https://huggingface.co/settings/tokens): 

```Bash
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

Store the name of your Hugging Face repository in a variable to run the following command: 

```Bash
HF_USER=$(huggingface-cli whoami | head -n 1)
echo $HF_USER
```

Record 5 rounds and upload your dataset to the Hub: 

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

You will see data similar to the following:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**Parameter Description**

- episode\_time\_s: represents the time for each data collection\.

- reset\_time\_s: is the preparation time between each data collection\.

- num\_episodes: Indicates how many sets of data are expected to be collected\.

- push\_to\_hub: Determines whether to upload data to the HuggingFace Hub\.

|button |Action|
|---|---|
|Right arrow →|Prematurely terminate the current episode/reset; proceed to the next one\. |
|Left arrow ←|Cancel the current episode; re\-record\. |
|ESC|Immediately stop the session, encode the video, and upload the dataset\. |



**Data collection techniques**

- **Task Suggestion**: Grasp objects at different positions and place them into the box\.

- **Scale **: Records ≥ 50 episodes \(10 episodes per location\)\. 

- **Consistency**: 

    - Keep the camera fixed\. 

    - Maintain the same grasping behavior\.

    - Ensure that the object being manipulated is visible in the camera frame\. 

- **Gradually advance**: 

    - Start with reliable grabs, then add variations \(new positions, grab techniques, camera adjustments\)\. 

    - Avoid a sharp increase in complexity to prevent failure\. 

💡 **Rule of Thumb**: Use only the camera feed as a guide, and control the robotic arm to complete tasks solely based on the video images fed back from the screen\.

If you want to delve deeper into this important topic, you can check out our [ blog post ](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset) on what makes a good dataset\. 

- In the following chapters, you will train your neural network\. After achieving reliable grasping performance, you can introduce more variations during the data collection process, such as adding grasping positions, different grasping techniques, and changing camera positions\. 

- Avoid adding too many changes too quickly, as this may impede your results\. 

- If you wish to save the data locally \(`\-\-dataset\.push\_to\_hub=false`\), please replace `\-\-dataset\.repo\_id=$\{HF\_USER\}/so101\_test` with a custom local folder name, for example `\-\-dataset\.repo\_id=juxi/so101\_test`\. The data will be stored in `\~/\.cache/huggingface/lerobot` under the system home directory\.

- If you uploaded your dataset to the Hugging Face Hub via ` \-\-dataset\.push\_to\_hub=true `, you can visualize your dataset [ online ](https://huggingface.co/spaces/lerobot/visualize_dataset) by simply copying and pasting your repo id\. 

- At any time during the round recording process, pressing the right arrow → can stop it early and enter the reset state\. Similarly, during the reset process, it can be stopped early and enter the next round of recording\. 

- When recording or resetting to an earlier stage, press the left arrow ← at any time to stop the current episode early and re\-record\. 

- During the recording process, press ESCAPE ESC at any time to end the session early and directly proceed to video encoding and dataset uploading\. 

- Recording can be resumed by rerunning the same command and adding `\-\-resume=true`\. ⚠️ **Important Note**: When resuming, set `\-\-dataset\.num\_episodes` to the number of additional episodes to record \(not the total number of target episodes in the dataset\)\. If you want to start recording from scratch, manually delete the dataset directory\.

- On Linux, if the left and right arrow keys and the Esc key have no effect during data recording, please ensure that you have set the $DISPLAY environment variable\. See [pynput limitations](https://pynput.readthedocs.io/en/latest/limitations.html#linux)\.

If your keyboard does not respond after a key press, you may need to downgrade your pynput version, for example, install version 1\.6\.8\. 

`pip install `*`pynput`*`==1\.6\.8`

### Visualize a dataset  \(optional, can be attempted\) 

```Python
echo ${HF_USER}/so101_test  
```

If you did not use ` \-\-dataset\.push\_to\_hub=false ` and uploaded the data, you can also visualize it locally using the following command: 

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test \
```

If you used ` \-\-dataset\.push\_to\_hub=false ` and did not upload the data, you can also visualize it locally using the following command: 

```Python
lerobot-dataset-viz \
  --repo-id juxi/test \
```

Here, `juxi` is the custom `repo\_id` name during data collection\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzE3NzQ3ZmU5ZmRiYzczMjA5ZWNkZThjMjdlYjhkNTBfMmY5OTA4ZTk0YTRkMTVkNWI2NDkxNjA3YzJlNmYwM2JfSUQ6NzYzODkxNTY4MTgzMjE5Mjk3MV8xNzgwMDQ4MTk3OjE3ODAxMzQ1OTdfVjM)

### Playback a clip\(skippable, tryable\)

Now, try replaying the first dataset on your robot: 

```Python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

At this time, the robot should perform the same actions as when you remotely operated and recorded\.

## E\. Dataset Training and Evaluation

### ACT

Refer to the official tutorial[ACT](https://huggingface.co/docs/lerobot/act)

**Training**

To train a strategy for controlling your robot, use the `python \-m lerobot\.scripts\.train` script\. Some parameters are required\. Here is an example command:

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

**If you want to train on a local dataset, please ensure that ****`repo\_id`**** matches the name used during data collection, and add ****`\-\-policy\.push\_to\_hub=false`****\. **

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

Command Explanation

- **Dataset Specification**: We provided the dataset via the `\-\-dataset\.repo\_id=$\{HF\_USER\}/so101\_test` parameter\.

- **Training Steps**: We modify the training steps through `\-\-steps=300000`\. The default value of the algorithm is 800000\. Adjust it by observing the loss during training according to the difficulty of your own task\.

- **Policy Type**: We use `policy\.type=act` to provide the policy\. Similarly, you can change to other policies such as \[act, diffusion, pi0, pi0fast, pi0\.5, sac, smolvla\], which will load the configuration from `configuration\_act\.py`\. Importantly, this policy will automatically adapt to the motor state, motor action, and number of cameras of your robot \(e\.g\., `laptop` and `phone`\), which have been saved in your dataset\.

- **Device Selection**: We provide `policy\.device=cuda` because we are training on an Nvidia GPU, but you can use `policy\.device=mps` to train on Apple Silicon\.

- **Visualization Tool**: We provide `wandb\.enable=true` to use [Weights and Biases](https://docs.wandb.ai/quickstart) for visualizing training charts\. This is optional, but if you use it, please ensure you have logged in by running `wandb login`\.

If you encounter the following error: 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjBmNDA4NjAyOTczYWY3ZGRmNzZjOWFkZjQ3YWI1MzdfNzNkMzdlZjcxZGU1YmMxMjZkZDg4YjIzNzgxMmFkMjhfSUQ6NzYzODkxNTY4MzM2MzU1NjMyMl8xNzgwMDQ4MTk3OjE3ODAxMzQ1OTdfVjM)

Try running the following command to resolve: 

```Bash
pip install datasets==2.19
```

Training may take several hours\. You will find the trained result weight files in the `outputs/train/act\_so101\_test/checkpoints` directory\.

To resume training from a certain training result weight file, the following is an example command to resume training from the last training result weight file of the `act\_so101\_test` strategy:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**Evaluation**

You can use the [`record`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) function in `lerobot/record\.py`, but you need to use the weights file of the strategy training results as input\. For example, run the following command to record 10 evaluation rounds:

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

1. `\-\-policy\.path` parameter, which indicates the path to your policy Model Training result weight file \(e\.g\., `outputs/train/act\_so101\_test/checkpoints/last/pretrained\_model`\)\. If you have uploaded your Model Training result weight file to Hub, you can also use the model repository \(e\.g\., `$\{HF\_USER\}/act\_so101\_test`\)\. 

2. The name of the dataset ` dataset\.repo\_id ` starts with ` eval\_ `, this operation will separately record the video and data during evaluation for you when you evaluate, which will be saved in a folder starting with eval\_, for example ` juxi/eval\_test123 `\. 

3. If the evaluation phase encounters ` File exists: \&\#39;home/xxxx/\.cache/huggingface/lerobot/xxxxx/juxi/eval\_xxxx\&\#39; ` please first delete ` the folder starting with eval\_ ` and then run the program again\. 

4. When encountering ` mean is infinity\. You should either initialize with stats as an argument or use a pretrained model ` Please note that keywords such as front and side in the \-\-robot\.cameras parameter must be strictly consistent with those used when collecting the dataset\. 

### Smolvla

Refer to the official tutorial[SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**Training**

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

**Verify**

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

Refer to the official tutorial[Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**Training**

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

**Verify**

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

Refer to the official tutorial[Pi0\.5](https://huggingface.co/docs/lerobot/pi05)

```Bash
pip install -e ".[pi]"
```

**Training**

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

**Verify**

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

Please refer to the official tutorial[GR00T N1\.5](https://huggingface.co/docs/lerobot/groot)

## F \.  Frequently Asked Questions 

If  you  use this document tutorial, please git clone the github repository recommended in this document  https://github\.com/JuxiTechnology/lerobot\.git

The repository recommended in this document is a verified stable version, while the official Lerobot repository is the latest version updated in real\-time, which may present some unpredictable issues, such as different dataset versions, different instructions, etc\. 

- [If using a RealSense depth camera, you can refer to and modify the running commands on your own ](https://juxitech.feishu.cn/docx/PsgFdioh2olGRmxgAqCcQM9znCc#doxcneJ9aHVAmVZh4YzfvrAktEb)

- In Jetson devices, if the number of rounds and round time are not set after running the evaluation command, the process can only be interrupted by ctrl\+z, which will cause the disconnection of the robotic arm and camera, and all ports will change after reconnection 

Add parameters for the number of evaluation rounds and round duration to the command 

For example: 

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

- If you encounter issues when calibrating the servo ID 

```Bash
`Motor ‘gripper’ was not found, Make sure it is connected`
```

Please carefully check whether the communication cable is properly connected to the servo motor and whether the power supply is providing the correct voltage\.

- If you encounter 

```Bash
Could not connect on port "/dev/ttyACM0"
```

And if you see that ACM0 exists through`ls /dev/ttyACM\*`, it means you forgot to grant serial port permissions\. Simply enter`sudo chmod 666 /dev/ttyACM\*` in the terminal\.

- If you encounter 

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

Please install ffmpeg7\.1\.1,`conda install ffmpeg=7\.1\.1 \-c conda\-forge`。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzUwZDVlNDExY2FjNThlNTNlYThhNTUwNTFiMWZlZGJfNjMwNTJhN2U2NTgxY2RlYzQxMDAwMjg1MGUyMTQ3MWZfSUQ6NzYzODkxNTY4MTQ5MDc1MDQyMF8xNzgwMDQ4MTk3OjE3ODAxMzQ1OTdfVjM)

- If you encounter 

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

It is necessary to check whether the robotic arm corresponding to the port number is powered on, whether the data cable of the bus servo is loose or detached, and if a servo light is not on, it means the cable of the previous servo is loose\. 

- If you encounter issues when calibrating the robotic arm 

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

Power cycle the robotic arm, and then attempt to calibrate the robotic arm again\. If the MAX angle reaches values in the tens of thousands during the calibration process, this method can also be used\. If it doesn\&\#39;t work, the corresponding servo motors need to be recalibrated, including midpoint calibration and ID writing\. 

- If encountered during the evaluation phase 

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

Please first delete`the folder starting with eval\_`and then run the program again\.

- If encountered during the evaluation phase 

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

Please note that keywords such as \&\#34;front\&\#34; and \&\#34;side\&\#34; in the parameter \&\#34;robot\.cameras\&\#34; must be strictly consistent with those used during Data Acquisition\. 

- If you have repaired or replaced parts of the robotic arm, please completely delete the files under `\~/\.cache/huggingface/lerobot/calibration/robots ` or `\~/\.cache/huggingface/lerobot/calibration/teleoperators ` and recalibrate the robotic arm\. Otherwise, an error message will appear\. The calibrated robotic arm information will be stored in the JSON file under this directory\. 

- The time required to train 50 sets of ACT data on an 8GB 3060 laptop is approximately 6 hours, while on a 4090 or A100 computer, it takes about 2 to 3 hours\. 

- During Data Acquisition, it is necessary to  ensure the stability of the camera position, angle, and ambient light , and reduce the camera\&\#39;s capture of excessive unstable backgrounds and pedestrians\. Otherwise, excessive changes in the deployed environment will cause the robotic arm to fail to grasp properly\. 

- The num\-episodes of the Data Acquisition command must ensure sufficient data collection and should not be manually paused midway, as the mean and variance of the data will only be calculated after Data Acquisition is completed, which are necessary data for training\. 

- If the program prompts that it cannot read the image data from the USB camera, please ensure that the USB camera is not connected to a Hub\. The USB camera must be directly connected to the device to ensure a fast image transmission rate\. 

If you encounter software issues or environment dependency issues that cannot be resolved, in addition to checking the Frequently Asked Questions section at the end of this tutorial, please promptly report the issues on [ the LeRobot Platform ](https://github.com/huggingface/lerobot) or [ the LeRobot Discord Channel ](https://discord.gg/8TnwDdjFGU)\. 

## Windows Find Servo \(Feite Servo Host Debugging Software\)

For debugging, any Windows PC can program, debug, or test the servo via USB connection\. To do this, please download [ Feetech Software ](https://www.feetechrc.com/software.html)\. For Ubuntu systems, you can use [ FT\_SCServo\_Debug\_Qt Tool ](https://github.com/Kotakku/FT_SCServo_Debug_Qt)\. 

\[fddebug\-master\.zip\]

Select the Port Number, set the Baud Rate to1000000, open it, and click \&\#34;Search\&\#34;

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmY3OTlkZTYwNjFkMDliNzlmMDQyZTRmNzZjM2ZhODZfODFmMWM3M2ZjOTVlY2ZhZjdiM2U0MzczZTE4YmI3MTRfSUQ6NzYzODkxNTY4MzU3NzEyMTczNV8xNzgwMDQ4MTk2OjE3ODAxMzQ1OTZfVjM)





## ROS2 Simulation Control \(can be implemented independently\)

https://github\.com/holmsslk/so\-arm\-moveit\-hardware



## Set Servo ID and Median Calibration on the Web 

https://bambot\.org/feetech\.js?lang=zh

1\. Enter 0 or 1 based on the servo model, then click \&\#34;Connect\&\#34;\.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTkyM2MwN2Q1ZTRlMDRkZDE0ZmU5NTAxNmJkNDNiNjRfNWFiM2U5YWI0ZjNiYzAyNGFmYjJhYzgzMDlmODgzNTVfSUQ6NzYzODkxNTY4MTIyMzkwNDIwNl8xNzgwMDQ4MTk2OjE3ODAxMzQ1OTZfVjM)

2\. Scan the servos with IDs 1 to 6, and the corresponding ID servo can be confirmed based on the FOUND in the scan results\. For example, servo ID 1 in the picture has been scanned\.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzBhZjlkNDNlMjE3MmNhNzU4MGMxYzVkYmM5N2FjYjZfNGY1ZGU0M2NjZmFjOWJiZjY1MDJmMjFjZDQ4NjA3YTlfSUQ6NzYzODkxNTY4Mzk2MzE2MTUzMF8xNzgwMDQ4MTk2OjE3ODAxMzQ1OTZfVjM)

3\. ID Setting and Median Calibration

① The current servo ID input is the ID of the servo that has been scanned 

② Enter a number in \&\#34;ID Management\&\#34;, click \&\#34;Change ID\&\#34; to set the ID 

③ Median calibration \(the median value of the STS3215 servo is 2047, and that of the SCS0009 servo is 511\)

STS Servo: Enter 2047 in \&\#34;Position Control\&\#34; and click \&\#34;Set\&\#34;

SCS Servo: Enter 511 in \&\#34;Position Control\&\#34; and click \&\#34;Set\&\#34;\. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDE5YjljZWZkYzcyNTk0OWViYzdjODg4OGRjMDRmZDVfYmQxMGNhZDNmOWI2ZWQ5NmVhNzlhYTVhZTQxNzE3NjFfSUQ6NzYzODkxNTY4MDk2NTE4NDQ2NF8xNzgwMDQ4MTk2OjE3ODAxMzQ1OTZfVjM)



