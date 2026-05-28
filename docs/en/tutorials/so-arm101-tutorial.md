# LeRobot SO-ARM101 Tutorial

This tutorial is updated as of December 15th, you can choose to follow the latest [official documentation](https://github.com/huggingface/lerobot/tree/main), and refer to [this link](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c) for specific tutorials in official documentation. If you need URDF and other files please refer to [this link](https://github.com/TheRobotStudio/SO-ARM100). For the September 15th old version please refer to [this link](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink). SO-ARM101 and SO-ARM100 running code are compatible with each other.

## A. Tutorial Explanation

**The Pro version black active arm uses a 5V6A power adapter, while the white follower arm uses a 12V5A power adapter!**

Servo installation and servo angle calibration need to be done in advance, you can refer to [official assembly tutorial](https://huggingface.co/docs/lerobot/so101), this tutorial does not cover these contents!

Assembly tutorial can refer to [Lerobot Robot Arm Assembly Tutorial](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

If you haven't configured the servos or assembled the robotic arm, please first follow the instructions in this [README](https://github.com/TheRobotStudio/SO-ARM100). It includes a material list and links to obtain parts, as well as instructions for 3D printed parts, and suggestions if you are printing for the first time or don't have a 3D printer.

Let's start by installing the LeRobot environment.

## B. Environment Preparation

For Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

For Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

[RealSense Depth Camera D400 Series Installation and Construction Guide](https://dev.realsenseai.com/docs/installation)

[RealSense Depth Camera D400 Series Data Manual](https://realsenseai.com/wp-content/uploads/2025/08/Intel-RealSense-D400-Series-Datasheet-August-2025.pdf)

### Installing LeRobot Environment

#### 1. [Install Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) Environment:

Need to install pytorch, torchvision, and other environments according to your CUDA version.

1. For Jetson:

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

Or for X86 Ubuntu 22.04:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. Create and activate a new conda environment for lerobot in the directory where you want to deploy (create for example: lerobot):

&gt; Please don't create or import the lerobot project in ~/miniconda3 directory

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. Then activate your `conda` environment (you need to do this every time you open a terminal to use lerobot!):

```PowerShell
conda activate lerobot
```

#### 4. Clone LeRobot:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

You can choose to follow the latest version: https://github.com/huggingface/lerobot.git

Note: The command code of the latest version may not match!

#### 5. Install ffmpeg in your environment:

When using `miniconda`, install `ffmpeg` in your environment:

```PowerShell
conda install ffmpeg -c conda-forge
```

This typically installs ffmpeg 7.X compiled with the libsvtav1 encoder for your platform. If libsvtav1 isn't supported (check supported encoders via `ffmpeg -encoders`), you can:

[Applicable to all platforms] Explicitly install ffmpeg 7.X:

```
conda install ffmpeg=7.1.1 -c conda-forge
```

Install without graphics dependencies (gdk-pixbuf, librsvg) with this command:

```
conda install ffmpeg=7.1.1 -c conda-forge --no-deps
```

[Linux only] Install build dependencies for ffmpeg and compile ffmpeg with libsvtav1 support from source, making sure the correct ffmpeg executable is used, verify with `which ffmpeg`.

If you encounter the following error, you can also use the above commands to solve it.

[Image placeholder - ffmpeg error screenshot]

#### 6. Go to the lerobot directory and install LeRobot with feetech motor dependencies:

```PowerShell
cd ~/lerobot &amp;&amp; pip install -e ".[feetech]"
```

For Jetson Jetpack 6.0+ devices (make sure you install Pytorch-gpu and Torchvision according to [this link tutorial](https://pytorch.org/get-started/locally/) before executing this step):

```Plain
conda install -y -c conda-forge "opencv&gt;=4.10.0.84"  # Install OpenCV and other dependencies via conda, only applicable to Jetson Jetpack 6.0+
conda remove opencv   # Uninstall OpenCV
pip3 install opencv-python==4.10.0.84  # Install specified version OpenCV using pip3
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # This version needs to be compatible with torchvision
```

#### 7. Check Pytorch and Torchvision

Since installing lerobot environment via pip uninstalls your existing Pytorch and Torchvision and installs the CPU version, you need to check in Python.

```Plain
import torch
print(torch.cuda.is_available())
```

If the output is False, you need to reinstall Pytorch and Torchvision according to [the official tutorial](https://pytorch.org/).

[Pytorch incompatibility issue on Jetson Orin](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. Install intelRealSense Depth Camera SDK dependency environment (if you have intelRealSense depth camera)

If you need to use RealSense depth camera, install pyrealsense2 under `lerobot/src/lerobot/`:

```Plain
pip install pyrealsense2
```

## C. Robot Arm Control

### Port Authorization

Connect the power cables, the black active arm uses a 5V6A power adapter, the white follower arm uses a 12V5A power adapter, and the servo driver board connects to the host via the data cable

First go to the `lerobot/src/lerobot/` directory

```Plain
cd ~/lerobot/src/lerobot/
```

Then activate your `conda` environment (you need to do this every time you open a terminal to use lerobot!):

```Plain
conda activate lerobot
```

#### 1. Run script to find ports

Find the correct USB ports for each robotic arm. To find the correct port for each robotic arm, run the utility script twice:

```Plain
lerobot-find-port
```

#### 2. Example Output

Example output when identifying the Leader robotic arm port (for example, `/dev/tty.usbmodem575E0031751` on Mac, or probably `/dev/ttyACM0` on Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Example output when identifying the Follower robotic arm port (for example, `/dev/tty.usbmodem575E0032081`, or probably `/dev/ttyACM1` on Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Please remember to unplug the USB connector, otherwise it won't detect the port.

#### 3. Troubleshooting

On Linux, you need to grant access to the USB port by running the following commands:

```PowerShell
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### Calibrate Robot Arm

Next, you need to calibrate your SO-10x robot with power and data cables connected to ensure that when at the same physical position, the position information of the Leader robot and Follower robot are consistent. This calibration process is crucial because it allows neural networks trained on one SO-10x robot to work on another. If you need to recalibrate the robotic arm, completely delete the files under `~/.cache/huggingface/lerobot/calibration/robots` or `~/.cache/huggingface/lerobot/calibration/teleoperators` and recalibrate the robotic arm, otherwise an error message will appear. Calibrated robotic arm information will be stored in a json file in that directory.

#### 1. Manual Calibration of Follower Robotic Arm

Please connect the 6 robot servo motors via the 3-pin interface and connect the base servo to the servo driver board, then run the following commands or API examples to calibrate the robotic arm:

Take PC (linux) and Jetson boards as examples, the `first` one inserted into the USB interface will be mapped to `ttyACM0`, the `second` one inserted into the USB interface will be mapped to `ttyACM1`.

Please pay attention to the mapping interfaces of leader and follower before running the code.

#### 2. Port Authorization

First, you need to grant port permissions, run the following commands:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. Then Calibrate Follower Robotic Arm

Next, calibrate the follower arm by running the following Python command:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

First, you need to move the robot to the middle of its range of motion for all joints and keep the robotic arm still. Then, after pressing Enter, you must move each joint through its full range of motion. The calibration file records the median, maximum, and minimum values and saves them in a json file under `~/.cache/huggingface/lerobot/calibration/robots` or `~/.cache/huggingface/lerobot/calibration/teleoperators`.

[Image placeholders - calibration photos]

#### 4. Calibrate Leader Robotic Arm

The steps for calibrating the main robotic arm are the same as above, please run the following commands or API examples:

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

[Video placeholder - robot arm median calibration video]

### Teleoperation

#### 1. Simple Teleoperation

Then you are ready to teleoperate your robot! Run this simple script (it won't connect and display the camera):

Please note that the **ID** associated with the robot is used to store calibration files. It is crucial to use the same **ID** when using the same setup for teleoperation, recording, and evaluation.

First give permissions to the serial port:

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

The teleoperation command automatically performs the following steps:

1. Identify any missing calibration files and launch the calibration procedure.
2. Connect the robot and teleoperation device and start teleoperation.

#### 2. Teleoperation with Camera Display

To instantiate cameras, you need a camera identifier. This identifier may change when you restart your computer or re-plug the camera, depending mainly on your operating system.

To find the **camera index** of cameras connected to your system, run the following script:

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

The terminal will print the relevant camera information.

[Image placeholder - camera find output]

You can find pictures taken by each camera in the `~/lerobot/outputs/captured_images` directory.

When using Intel RealSense cameras in **macOS**, you may encounter the **"Error finding RealSense cameras: failed to set power state"** error. This can be solved by running the same command with `sudo` privileges. Please note that using RealSense cameras in **macOS** is unstable.

After that, you can display the camera feed on your computer during teleoperation by simply running the following code. This is very useful for preparing your setup before recording your first dataset.

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` format images are compressed. You can try higher resolutions. You can also try `YUYV` format images, but this will reduce image resolution and FPS, causing robot arm operation lag. Currently `MJPG` format supports up to `3` cameras at `1920*1080` resolution and maintains `30FPS`, but it is still not recommended to connect 2 cameras through the same USB hub.

If you have more cameras, you can add them by changing the `--robot.cameras` parameter. You should pay attention to the format of `index_or_path`, which is determined by the last digit of the camera ID output by the `python -m lerobot.find_cameras opencv` command.

For example, if you want to add a camera:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

If you want to add a RealSense depth camera, first run `python -m lerobot.find_cameras realsense` to get the Id, and replace `serial_number_or_name: "323622271780"` in the robot.cameras parameter of this command with your own depth camera Id, and `use_depth: true` to enable depth streaming:

[Image placeholder - realsense example]

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: intelrealsense, serial_number_or_name: \"323622271780\", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. Data Collection

### Record a Dataset

- If you want to save the dataset locally, just run:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
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

Where `dateset.repo_id` and `dataset.single_task` can be customized. With `push_to_hub=false`, the dataset will eventually be saved in `~/.cache/huggingface/lerobot` and create the `juxi/test` folder. [If using RealSense depth camera, you can modify the running command yourself](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- If you want to use Hugging Face Hub functionality to upload your dataset and haven't done so before, make sure you have logged in with a write permission token, which can be generated from [Hugging Face Settings](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Store your Hugging Face repository name in a variable to run the following commands:

```Bash
hf auth whoami
```

Record 5 episodes and upload your dataset to the Hub:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id my_awesome_leader_arm \
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

- episode_time_s: Indicates the time to collect data each time.
- reset_time_s: Is the preparation time between data collections.
- num_episodes: Indicates how many groups of data are expected to be collected.
- push_to_hub: Decides whether to upload data to HuggingFace Hub.

| Key Press | Action |
| --------- | ------ |
| Right Arrow → | Early termination of current episode/reset; proceed to the next one. |
| Left Arrow ← | Cancel current episode; re-record. |
| ESC | Immediately stop the session, encode video, and upload the dataset. |

**Data Collection Tips**

- **Task Suggestions**: Grasp objects in different positions and place them in boxes.
- **Scale**: Record ≥50 episodes (10 episodes per position).
- **Consistency**:
  - Keep cameras fixed.
  - Maintain the same grasping behavior.
  - Ensure manipulated objects are visible in the camera feed.
- **Progress Gradually**:
  - Start with reliable grasps, then add variations (new positions, grasping techniques, camera adjustments).
  - Avoid sudden complexity increases to prevent failure.

💡 **Rule of Thumb**: Only use the camera feed as guidance, controlling the robotic arm to complete tasks only based on the video image feedback from the screen.

If you want to dive deeper into this important topic, check out our blog article about [what makes a good dataset](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

- In the next chapters, you will train your neural network. After achieving reliable grasping performance, you can introduce more variations during data collection, such as increasing grasping positions, different grasping techniques, and changing camera positions.
- Avoid adding too many variations quickly, as this may hinder your results.

- "If you want to save data locally (`--dataset.push_to_hub=false`), replace `--dataset.repo_id=${HF_USER}/so101_test` with a custom local folder name, for example `--dataset.repo_id=juxi/so101_test`. Data will be stored in `~/.cache/huggingface/lerobot`"
- If you upload the dataset to Hugging Face Hub via `--dataset.push_to_hub=true`, you can visualize your dataset [online](https://huggingface.co/spaces/lerobot/visualize_dataset) by simply copy-pasting your repo id.
- Press the right arrow → at any time during episode recording to stop early and enter reset status. Similarly during reset, you can stop early and proceed to record the next episode.
- Press the left arrow ← at any time during recording or reset to an earlier stage to early stop current episode and re-record.
- Press ESCAPE ESC at any time during recording to end the session early, directly enter video encoding and dataset upload.
- You can resume recording by re-running the same command and adding `--resume=true`. ⚠️ **Important**: When resuming, set `--dataset.num_episodes` to the number of additional episodes to record (not the total number of targeted episodes in the dataset). If you want to start recording from scratch, manually delete the dataset directory.
- On Linux, if left and right arrow keys and the Esc key have no effect during data recording, make sure you have set the $DISPLAY environment variable. See [pynput limitations](https://pynput.readthedocs.io/en/latest/limitations.html#linux).

If your keyboard has no response after pressing, you may need to lower your pynput version, for example install version 1.6.8.

```
pip install pynput==1.6.8
```

### Visualize a Dataset (Can Skip, Try)

```Python
echo ${HF_USER}/so101_test  
```

If you didn't use `--dataset.push_to_hub=false` and uploaded data, you can also visualize locally through the following command:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test \
```

If you used `--dataset.push_to_hub=false` and didn't upload data, you can also visualize locally through the following command:

```Python
lerobot-dataset-viz \
  --repo-id juxi/test \
```

Here, `juxi` is the custom `repo_id` name during data collection.

[Image placeholder - dataset visualization]

### Replay a Clip (Can Skip, Try)

Now try replaying the first dataset on your robot:

```Python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

At this point, the robotic arm should perform the same actions as when you teleoperated and recorded.

## E. Dataset Training and Evaluation

### ACT

Refer to official tutorial [ACT](https://huggingface.co/docs/lerobot/act)

**Training**

To train a strategy for controlling your robot, use the `python -m lerobot.scripts.train` script. Several parameters are required. The following is an example command:

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

**If you want to train on a local dataset, make sure `repo_id` matches the name used during data collection and add `--policy.push_to_hub=false`.**

```Python
lerobot-train \
  --dataset.repo_id=juxi/test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --policy.push_to_hub=false\
  --steps=300000 
```

Command Explanation

- **Dataset Specification**: We provided the dataset via `--dataset.repo_id=${HF_USER}/so101_test`.
- **Training Steps**: We modified the training steps via `--steps=300000`. The algorithm defaults to 800,000. Adjust according to the difficulty of your own task, observing loss during training.
- **Strategy Type**: We provided the strategy using `policy.type=act`. Similarly, you can replace strategies such as [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla], which will load configurations from `configuration_act.py`. Importantly, this strategy automatically adapts to the motor states, motor actions, and number of cameras of your robot (such as `laptop` and `phone`), which information is already saved in your dataset.
- **Device Selection**: We provided `policy.device=cuda` because we are training on an Nvidia GPU, but you can use `policy.device=mps` for training on Apple Silicon.
- **Visualization Tool**: We provided `wandb.enable=true` to visualize training charts using [Weights and Biases](https://docs.wandb.ai/quickstart). This is optional, but if you use it, make sure you have logged in by running `wandb login`.

If you encounter the following error:

[Image placeholder - datasets error]

Try running the following command to solve it:

```Bash
pip install datasets==2.19
```

Training may take a few hours. You will find training result weight files in the `outputs/train/act_so101_test/checkpoints` directory.

To resume training from a training result weight file, here's an example command to resume training from the last training result weight file of the `act_so101_test` strategy:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**Evaluation**

You can use the `record` functionality in `lerobot/record.py`, but you need to use the strategy training result weight file as input. For example, run the following command to record 10 evaluation episodes:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: \"MJPG\"}}" \
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

1. `--policy.path` parameter, indicates the path of your strategy training result weight file (for example `outputs/train/act_so101_test/checkpoints/last/pretrained_model`). If you upload the model training result weight file to Hub, you can also use the model repository (for example `${HF_USER}/act_so101_test`).
2. Dataset name `dataset.repo_id` starts with `eval_`, this will record evaluation videos and data separately when you evaluate, saved in folders starting with `eval_`, for example `juxi/eval_test123`.
3. If you encounter `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'` in the evaluation phase, please delete the folder starting with `eval_` first and run the program again.
4. When encountering `mean is infinity. You should either initialize with stats as an argument or use a pretrained model` please note that keywords such as front and side in `--robot.cameras` must be strictly consistent with dataset collection.

### Smolvla

Refer to official tutorial [SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

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

**Verification**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # &lt;- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: \"MJPG\"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \ 
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # &lt;- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # &lt;- Use your fine-tuned model
```

### Pi0

Refer to official tutorial [Pi0](https://huggingface.co/docs/lerobot/pi0)

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

**Verification**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: \"MJPG\"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

Refer to official tutorial [Pi0.5](https://huggingface.co/docs/lerobot/pi05)

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

**Verification**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: \"MJPG\"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi05_training/checkpoints/last/pretrained_model
```

### GR00T N1.5

Please refer to the official tutorial [GR00T N1.5](https://huggingface.co/docs/lerobot/groot)

## F. Frequently Asked Questions

If you use this documentation tutorial, please git clone the github repository recommended by this documentation https://github.com/JuxiTechnology/lerobot.git

The repository recommended by this documentation is a verified stable version, while the official LeRobot repository is a real-time updated latest version, which may have some unpredictable problems, such as different dataset versions, different commands, etc.

- [If using RealSense depth camera, you can refer to and modify the running command yourself](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- On Jetson devices, after running the evaluation command without setting the number of episodes and episode time, you can only interrupt the process with ctrl+z, which will cause the robotic arm and camera to disconnect, and all ports change after reconnecting

Add parameters for evaluation episode count and episode duration in the command

For example:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: \"MJPG\"}}" \
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

- If you encounter when calibrating servo ID

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

Please carefully check whether the communication cable is properly connected to the servo, and whether the power supply is at the correct voltage."

- If encountering

```Bash
Could not connect on port "/dev/ttyACM0"
```

And you can see ACM0 exists via `ls /dev/ttyACM*`, it means you forgot to give the serial port permissions. Just enter `sudo chmod 666 /dev/ttyACM*` in terminal.

- If encountering

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

Please install ffmpeg7.1.1, `conda install ffmpeg=7.1.1 -c conda-forge`.

[Image placeholder - ffmpeg error]

- If encountering

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

Need to check whether the robotic arm of the corresponding port number is powered on, and whether the data cable of the bus servo is loose or disconnected. Whichever servo light is not on means the cable of the servo before it is loose.

- If encountering during robot arm calibration

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

Power off and re-power the robotic arm, and try to calibrate the robotic arm again. If the MAX angle reaches tens of thousands during calibration, you can also use this method. If this doesn't work, you need to re-calibrate the corresponding servo, i.e., median calibration and ID writing.

- If encountering during evaluation phase

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

Please delete the folder starting with `eval_` first and run the program again.

- If encountering during evaluation phase

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

Please note that keywords such as front and side in `--robot.cameras` must be strictly consistent with dataset collection.

- If you repair or replace robotic arm parts, completely delete the files under `~/.cache/huggingface/lerobot/calibration/robots` or `~/.cache/huggingface/lerobot/calibration/teleoperators` and recalibrate the robotic arm, otherwise an error message will appear. Calibrated robotic arm information will be stored in json files in that directory.
- Training 50 sets of ACT data takes approximately 6 hours on a 3060 8G laptop, and about 2-3 hours on a 4090 and A100 computer.
- During data collection, make sure the camera position and angle and ambient light are stable, and reduce excessive unstable backgrounds and pedestrians collected by the camera. Otherwise, excessive changes in deployment environment will cause the robotic arm to fail to grasp normally.
- Ensure data is adequately collected with num-episodes in data collection command. Do not manually pause halfway, since data mean and variance calculation happens only after data collection ends, which is necessary during training.
- If the program prompts that USB camera image data can't be read, please ensure the USB camera isn't connected via a hub. USB cameras must be directly connected to the device to ensure fast image transmission rates.

If you encounter software issues or environmental dependency problems that cannot be solved, in addition to checking the FAQs section at the end of this tutorial, please timely feedback issues in [LeRobot Platform](https://github.com/huggingface/lerobot) or [LeRobot Discord Channel](https://discord.gg/8TnwDdjFGU).

## Windows Servo Find (Feetech Servo Debug Software)

For debugging purposes, any Windows PC can program, debug, or test servos via USB connection. To do this, please download [Feetech software](https://www.feetechrc.com/software.html). For Ubuntu systems, you can use the [FT_SCServo_Debug_Qt tool](https://github.com/Kotakku/FT_SCServo_Debug_Qt).

Select the port number, set the baud rate to 1000000, open, and click "Search"

[Image placeholder - feetech software screenshot 1]

## ROS2 Simulation Control (Can be Implemented by Yourself)

https://github.com/holmsslk/so-arm-moveit-hardware

## Webpage Servo ID and Median Calibration

https://bambot.org/feetech.js?lang=en

1. According to the servo model enter 0 or 1, click "Connect"

[Image placeholder - web calibration screenshot 1]

2. Scan ID servos from 1~6, you can confirm the corresponding ID servo based on the FOUND in the scan results. For example, servo ID 1 was scanned in the picture

[Image placeholder - web calibration screenshot 2]

3. ID settings and median calibration

① Current servo ID input is the ID of the scanned servo

② Enter the number in "ID Management", click "Change ID" to set the ID

③ Median calibration (STS3215 servo median is 2047, SCS0009 servo median is 511)

STS servo: Enter 2047 in "Position Control", and click "Set"

SCS servo: Enter 511 in "Position Control", and click "Set"

[Image placeholder - web calibration screenshot 3]

