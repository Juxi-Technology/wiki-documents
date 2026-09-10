---
title: LeRobot機械臂教程
description: "本教程已更新至12月15日，可選擇跟隨最新版官方文檔進行操作，官方文檔具體教程可以參考本鏈接。若需要URDF等文件請參考本鏈接。9月15日舊版本請參考該鏈接。SO-ARM101與SO-ARM100運行代碼相互兼容。"
---

# LeRobot機械臂教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


本教程已更新至12月15日，可選擇跟隨最新版[官方文檔進行操作](https://github.com/huggingface/lerobot/tree/main)，官方文檔具體教程可以參考[本鏈接](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c)。若需要URDF等文件請參考[本鏈接](https://github.com/TheRobotStudio/SO-ARM100)。9月15日舊版本請參考該[鏈接](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink)。SO-ARM101與SO-ARM100運行代碼相互兼容。

## A. 教程說明

**Pro版 黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器！**

舵機安裝和舵機角度校準要提前做好，可參考[官方組裝教程](https://huggingface.co/docs/lerobot/so101)，本教程不涉及這些內容！

組裝教程可參考 [Lerobot机械臂组装教程](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

若未配置好舵機或未組裝機械臂，請先按照這個[README](https://github.com/TheRobotStudio/SO-ARM100)中的內容操作。它包含了材料清單，以及獲取零件的鏈接，還包括3D打印零件的說明，以及如果您是第一次打印或者沒有3D打印機時的建議。

讓我們先從安裝 LeRobot 環境開始。

## B. 環境準備

For Ubuntu X86:

- Ubuntu 22.04

- CUDA 12+

- Python 3.10

- Torch 2.6+

For Jetson Orin:

- Jetson Jetpack 6.0+

- Python 3.10

- Torch 2.5.0a0+872d972e41

[RealSense深度攝像頭D400系列安裝構建指南](https://dev.realsenseai.com/docs/installation)

[RealSense深度攝像頭D400系列數據手冊](https://realsenseai.com/wp-content/uploads/2025/08/Intel-RealSense-D400-Series-Datasheet-August-2025.pdf)

### 安裝 LeRobot 環境

#### 1. [安裝 Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install)環境:

需要根據你的 CUDA 版本安裝 pytorch 和 torchvision 等環境。

1. 對於 Jetson：

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

或者，對於 X86 Ubuntu 22.04：

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. 在想要部署的 目錄（創建例如：lerobot） 下爲 lerobot 創建並激活一個新的 conda 環境：

> 請不要在 ~/miniconda3目錄下創建或者導入lerobot項目
> 
> 

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. 然後激活您的 `conda` 環境（每次打開終端使用 lerobot 時都需要執行此操作！）：

```PowerShell
conda activate lerobot
```

#### 4. 克隆 LeRobot：

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

可選擇跟隨最新版： https://github.com/huggingface/lerobot.git  

注：最新版本的命令代碼可能不一致！

#### 5. 在您的環境中安裝 ffmpeg：

使用 `miniconda` 時，在您的環境中安裝 `ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

這通常會爲你的平臺安裝使用 libsvtav1 編碼器編譯的 ffmpeg 7.X。如果不支持 libsvtav1（可以通過 `ffmpeg -encoders` 查看支持的編碼器），你可以：

【適用於所有平臺】顯式安裝 ffmpeg 7.X：

`安裝ffmpeg=7.1.1-c conda-forge`

無圖形依賴（gdk-pixbuf、librsvg）用此命令安裝：

`安裝ffmpeg=7.1.1-c conda-forge--no-deps`

【僅限 Linux】安裝 ffmpeg 的構建依賴並從源碼編譯支持 libsvtav1 的 ffmpeg，並確保使用的 ffmpeg 可執行文件是正確的，可以通過 `which ffmpeg` 確認。

如果你遇到以下報錯，也可以使用上述命令解決。

![5. 在您的環境中安裝 ffmpeg： – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)

#### 6. 進入lerobot目錄下，安裝帶有 feetech 電機依賴的 LeRobot：

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

對於 Jetson Jetpack 6.0+ 設備（請確保在執行此步驟前按照[此鏈接教程](https://github.com/Seeed-Projects/reComputer-Jetson-for-Beginners/tree/main/3-Basic-Tools-and-Getting-Started)第 5 步安裝了 Pytorch-gpu 和 Torchvision）：

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7. 檢查 Pytorch 和 Torchvision

由於通過 pip 安裝 lerobot 環境時會卸載原有的 Pytorch 和 Torchvision 並安裝 CPU 版本，因此需要在 Python 中進行檢查。

```Plain Text
import torch
print(torch.cuda.is_available())
```

如果輸出結果爲 False，需要根據[官網教程](https://pytorch.org/)重新安裝 Pytorch 和 Torchvision。

如果你使用的是 Jetson 設備，請根據[此教程](https://github.com/Seeed-Projects/reComputer-Jetson-for-Beginners/tree/main/3-Basic-Tools-and-Getting-Started)安裝 Pytorch 和 Torchvision。

[Jetson Orin上Pytorch不兼容](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8.  intelRealSense深度相機SDK依賴環境安裝（若有intelRealSense深度相機）

若需使用RealSense深度攝像頭，在`lerobot/src/lerobot/`下安裝pyrealsense2：

```Plain Text
pip install pyrealsense2
```

## C. 機械臂控制

### 端口授權

連接好電源線，黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器，舵機驅動板通過數據線連接到主機端

首先進入到`lerobot/src/lerobot/`目錄下

```Plain Text
cd ~/lerobot/src/lerobot/
```

然後激活您的 `conda` 環境（每次打開終端使用 lerobot 時都需要執行此操作！）：

```Plain Text
conda activate lerobot
```

#### 1. 運行腳本以查找端口

查找機械臂對應的 USB 端口 爲了找到每個機械臂正確的端口，請運行實用腳本兩次：：

```Plain Text
lerobot-find-port
```

#### 2. 示例輸出

識別Leader機械臂端口時的示例輸出（例如，Mac 上爲 `/dev/tty.usbmodem575E0031751`，或 Linux 上可能爲 `/dev/ttyACM0`）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

識別Follower機械臂端口時的示例輸出（例如，`/dev/tty.usbmodem575E0032081`，或在 Linux 上可能爲 `/dev/ttyACM1`）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

請記住要拔出 USB 接頭，否則將無法檢測到接口。

#### 3. 疑難解答

在 Linux 上，您需要通過運行以下命令來授予對 USB 端口的訪問權限：

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### 校準機械臂

接下來，你需要對你的 SO-10x 機器人接上電源和數據線進行校準，以確保在相同的物理位置時，Leader機械臂和 Follower機械臂的位置信息一致。這個校準過程至關重要，因爲它可以讓在一個 SO-10x 機器人上訓練的神經網絡在另一個機器人上也能正常工作。如果需要重新校準機械臂，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或者`~/.cache/huggingface/lerobot/calibration/teleoperators`下的文件並重新校準機械臂，否者會出現報錯提示，校準的機械臂信息會存儲該目錄下的json文件中。

#### 1. Follower機械臂的手動校準

請通過 3 針接口連接 6 個機器人舵機的接口，並將底盤舵機連接到舵機驅動板，然後運行以下命令或 API 示例來校準機械臂：

以PC(linux)和jetson板卡爲例，`第一個`插入usb接口會映射爲`ttyACM0`，`第二個`插入usb接口會映射爲`ttyACM1`。

在運行代碼前請注意leader和follower的映射接口。

#### 2. 接口授權

首先，您需要授予接口權限，運行以下命令：

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. 然後校準Follower機械臂

接下來，通過運行以下 Python 命令來校準從動臂：

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

首先，您需要將機器人移動到所有關節都位於其 可活動範圍中間 的位置 並 保持機械臂不動。然後，按下回車鍵後，您必須將每個關節在其完整的運動範圍內移動，校準文件會記錄下可活動範圍的中位、最大值和最小值,並保存在`~/.cache/huggingface/lerobot/calibration/robots`或者`~/.cache/huggingface/lerobot/calibration/teleoperators` 目錄下json文件中。

![3. 然後校準Follower機械臂 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)

![3. 然後校準Follower機械臂 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)

#### **4. 校準Leader機械臂**

對主機械臂進行校準的步驟與上述相同，請運行以下命令或 API 示例：

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

[机械臂中位校准视频.mp4]

### 遙感操作

#### **1. **簡單**遙感**操作**

然後，您就可以準備遙操作您的機器人了！運行這個簡單的腳本（它不會連接和顯示攝像頭）：

請注意，與機器人關聯的 **ID 用於存儲校準文件。在使用相同設置進行遙控操作、錄製和評估時，使用相同的 ** 至關重要。

先對串口給予權限：

```Bash
sudo chmod 666 /dev/ttyACM*
```

運行遙操作：

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

遙控操作命令將自動執行以下步驟：

1. 識別任何缺失的校準文件並啓動校準程序。

2. 連接機器人和遙控設備，並開始遙控操作。

#### 2. 帶攝像頭顯示的遠程操作

爲了實例化攝像頭，您需要一個攝像頭標識符。這個標識符可能會在您重啓電腦或重新插拔攝像頭時發生變化，這主要取決於您的操作系統。

要查找連接到您系統的攝像頭的**攝像頭索引**，請運行以下腳本：

```Python

lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

終端會打印相關攝像頭信息。

![2. 帶攝像頭顯示的遠程操作 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)

您可以在 `~/lerobot/outputs/captured_images` 目錄中找到每臺攝像頭拍攝的圖片。

在 **macOS** 中使用 Intel RealSense 攝像頭時，您可能會遇到 **“Error finding RealSense cameras: failed to set power state”** 的錯誤。這可以通過使用 `sudo` 權限運行相同的命令來解決。請注意，在 **macOS** 中使用 RealSense 攝像頭是不穩定的。

之後，您就可以在遙控操作時在電腦上顯示攝像頭畫面了，只需運行以下代碼即可。這對於在錄製第一個數據集之前準備您的設置非常有用。

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

`fourcc: "MJPG"`格式圖像是經過壓縮後的圖像，你可以嘗試更高分辨率，當然你可以嘗試`YUYV`格式圖像，但是這會導致圖像的分辨率和FPS降低導致機械臂運行卡頓。目前`MJPG`格式下可支持`3`個攝像頭`1920*1080`分辨率並且保持`30FPS`, 但是依然不推薦2個攝像頭通過同一個USB HUB接入主機

如果您有更多攝像頭，可以通過更改 `--robot.cameras` 參數來添加。您應該注意`index_or_path` 的格式，它由 `python -m lerobot.find_cameras opencv` 命令輸出的攝像頭 ID 的最後一位數字決定。

例如，如果你想添加攝像頭:

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

如果你想添加RealSense深度相機，先運行`python -m lerobot.find_cameras realsense` 獲取Id，並將此命令中robot.cameras參數的serial_number_or_name: "323622271780" 替換爲自己的深度相機Id，`use_depth: true` 啓用深度流：

![2. 帶攝像頭顯示的遠程操作 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



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

## D. 數據採集

### 記錄一個數據集

- 如果你想數據集保存在本地，可以直接運行：

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

其中`dateset.repo_id`和`dataset.single_task`可以自定義修改，`push_to_hub=false`，最後數據集會保存在主目錄的`~/.cache/huggingface/lerobot`下會創建上述`juxi/test`文件夾，[若使用RealSense深度相機，可自行修改運行命令](https://juxitech.feishu.cn/docx/QdDydq66zoqeHWxRSk8cAKHynue#doxcnICJPiA21VEwYP58k5CjB5b)

- 如果您想使用 Hugging Face Hub 的功能來上傳您的數據集，並且您之前尚未這樣做，請確保您已使用具有寫入權限的令牌登錄，該令牌可以從 [Hugging Face 設置](https://huggingface.co/settings/tokens) 中生成：

```Bash
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

將您的 Hugging Face 倉庫名稱存儲在一個變量中，以運行以下命令：

```Bash
HF_USER=$(huggingface-cli whoami | head -n 1)
echo $HF_USER
```

記錄 5 個回合並將您的數據集上傳到 Hub：

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

你會看到類似如下數據:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**參數說明**

- episode_time_s: 表示每次收集數據的時間。

- reset_time_s: 是每次數據收集之間的準備時間。

- num_episodes: 表示預期收集多少組數據。

- push_to_hub: 決定是否將數據上傳到 HuggingFace Hub。

|按鍵|動作|
|---|---|
|右箭頭 →|提前終止當前劇集/重置；進入下一個。|
|左箭頭 ←|取消當前劇集；重新錄製。|
|ESC|立即停止會話，編碼視頻，並上傳數據集。|



**數據收集技巧**

- **任務建議**：在不同位置抓取物體並將其放入箱子中。

- **規模**：記錄 ≥50 個劇集（每個位置 10 個劇集）。

- **一致性**：

    - 保持攝像頭固定。

    - 保持相同的抓取行爲。

    - 確保操作的物體在攝像頭畫面中可見。

- **逐步推進**：

    - 先從可靠的抓取開始，然後再增加變化（新位置、抓取技巧、攝像頭調整）。

    - 避免複雜性急劇增加，以防止失敗。

💡 **經驗法則**：僅使用攝像頭畫面作爲指導，只根據屏幕反饋的視頻圖像，來控制機械臂完成任務。

如果你想要深入瞭解這個重要主題，可以查看我們撰寫的關於什麼是好的數據集的[博客文章](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)。

- 在接下來的章節中，你將訓練你的神經網絡。在實現可靠的抓取性能後，你可以在數據收集過程中引入更多變化，例如增加抓取位置、不同的抓取技巧以及改變相機位置。

- 避免快速添加過多變化，因爲這可能會阻礙您的結果。

- "如果你希望將數據保存在本地 (`--dataset.push_to_hub=false`)，請將 `--dataset.repo_id=${HF_USER}/so101_test` 替換爲一個自定義的本地文件夾名稱，例如 `--dataset.repo_id=juxi/so101_test`。數據將存儲在系統主目錄下的 `~/.cache/huggingface/lerobot`."

- 如果你通過 `--dataset.push_to_hub=true` 將數據集上傳到了 Hugging Face Hub，可以通過 [在線可視化你的數據集](https://huggingface.co/spaces/lerobot/visualize_dataset)，只需複製粘貼你的 repo id。

- 在回合記錄過程中任何時候按下右箭頭 → 可提前停止並進入重置狀態。重置過程中同樣，可提前停止並進入下一個回合記錄。

- 在錄製或重置到早期階段時，隨時按左箭頭 ← 可提前停止當前劇集，並重新錄製。

- 在錄製過程中隨時按 ESCAPE ESC 可提前結束會話，直接進入視頻編碼和數據集上傳。

- 可以通過重新運行相同的命令並添加 `--resume=true` 來恢復錄製。⚠️ **重要提示**：在恢復時，需將 `--dataset.num_episodes` 設置爲要額外記錄的劇集數量（而不是數據集中目標的總劇集數量）。如果要從頭開始錄製，請手動刪除數據集目錄。

- 在 Linux 上，如果在數據記錄期間左右箭頭鍵和 Esc 鍵沒有效果，請確保您已設置 $DISPLAY 環境變量。參見 [pynput 限制](https://pynput.readthedocs.io/en/latest/limitations.html#linux)。

如果你的鍵盤按下後沒有反應，可能你需要降低你pynput的版本，例如安裝個1.6.8版本的。

`安裝`*`pynput`*`==1.6.8`

### 可視化一個數據集（可跳過，可嘗試）

```Python
echo ${HF_USER}/so101_test  
```

如果您沒有使用 `--dataset.push_to_hub=false` ，並上傳了數據，您也可以在本地通過以下命令進行可視化：

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test \
```

如果您使用了 `--dataset.push_to_hub=false` ，沒有上傳數據，您也可以通過以下命令在本地進行可視化：

```Python
lerobot-dataset-viz \
  --repo-id juxi/test \
```

這裏，`juxi` 是數據收集時自定義的 `repo_id` 名稱。

![可視化一個數據集（可跳過，可嘗試） – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)

### 回放一個片段（可跳過，可嘗試）

現在，嘗試在您的機器人上重播第一個數據集：

```Python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

此時，機器人應該做出與你遙操記錄時一樣的動作。

## E. 數據集訓練及評估

### ACT

參考官方教程[ACT](https://huggingface.co/docs/lerobot/act)

**訓練**

要訓練一個控制您機器人策略，使用 `python -m lerobot.scripts.train` 腳本。需要一些參數。以下是一個示例命令：

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

**如果您想在本地數據集上進行訓練，請確保 **`repo_id`** 與數據收集時使用的名稱匹配，並添加 **`--policy.push_to_hub=false`**。**

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

命令解釋

- **數據集指定**：我們通過 `--dataset.repo_id=${HF_USER}/so101_test` 參數提供了數據集。

- **訓練步數**：我們通過 `--steps=300000` 修改訓練步數，算法默認爲800000，根據自己的任務難易程度，觀察訓練時候的loss來進行調整。

- **策略類型**：我們使用 `policy.type=act` 提供了策略，同樣你可以更換[act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla]等策略，這將從 `configuration_act.py` 加載配置。重要的是，這個策略會自動適應您機器人（例如 `laptop` 和 `phone`）的電機狀態、電機動作和攝像頭數量，這些信息已保存在您的數據集中。

- **設備選擇**：我們提供了 `policy.device=cuda`，因爲我們正在 Nvidia GPU 上進行訓練，但您可以使用 `policy.device=mps` 在 Apple Silicon 上進行訓練。

- **可視化工具**：我們提供了 `wandb.enable=true` 來使用 [Weights and Biases](https://docs.wandb.ai/quickstart) 可視化訓練圖表。這是可選的，但如果您使用它，請確保您已通過運行 `wandb login` 登錄。

如果你遇到了以下報錯：

![ACT – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)

嘗試運行以下命令來解決:

```Bash
pip install datasets==2.19
```

訓練可能需要幾個小時。您將在 `outputs/train/act_so101_test/checkpoints` 目錄中找到訓練結果權重文件。

要從某個訓練結果權重文件恢復訓練，下面是一個從 `act_so101_test` 策略的最後一個訓練結果權重文件恢復訓練的示例命令：

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**評估**

您可以使用 [`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) 中的 `record` 功能，但需要將策略訓練結果訓練結果權重文件作爲輸入。例如，運行以下命令記錄 10 個評估回合：

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

1. `--policy.path` 參數，指示您的策略訓練結果權重文件的路徑（例如 `outputs/train/act_so101_test/checkpoints/last/pretrained_model`）。如果您將模型訓練結果權重文件上傳到 Hub，也可以使用模型倉庫（例如 `${HF_USER}/act_so101_test`）。

2. 數據集的名稱`dataset.repo_id`以 `eval_` 開頭，這個操作會在你評估的時候爲你單獨錄製評估時候的視頻和數據，將保存在eval_開頭的文件夾下，例如`juxi/eval_test123`。

3. 如果評估階段遇到`File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`請先刪除`eval_`開頭的這個文件夾再次運行程序。

4. 當遇到`mean is infinity. You should either initialize with stats as an argument or use a pretrained model`請注意--robot.cameras這個參數中的front和side等關鍵詞必須和採集數據集的時候保持嚴格一致。

### 斯莫夫拉

參考官方教程[SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**訓練**

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

**驗證**

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

參考官方教程[Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**訓練**

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

**驗證**

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

### Pi0.5

參考官方教程[Pi0.5](https://huggingface.co/docs/lerobot/pi05)

```Bash
pip install -e ".[pi]"
```

**訓練**

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

**驗證**

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

### GR00T N1.5

請參考官方教程[GR00T N1.5](https://huggingface.co/docs/lerobot/groot)

## F.雲服務器訓練部署及模型導出

以 AutoDL算力雲 爲例， www.autodl.com ，註冊登錄充值餘額

#### **1.點擊“算力市場”，選擇需要的顯卡，儘量選多核心**

![1.點擊“算力市場”，選擇需要的顯卡，儘量選多核心 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)

#### **2.選擇“按量計費”，基礎鏡像選擇“Miniconda/conda3/3.8(ubuntu20.04)/11.8”，點擊“立即創建”**

![2.選擇“按量計費”，基礎鏡像選擇“Miniconda/conda3/3.8ubuntu20.04/11.8”，點擊“立即創建” – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)

#### **3.點擊“JupyterLab”進入控制界面，打開終端**

![3.點擊“JupyterLab”進入控制界面，打開終端 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)

#### **4.初始化conda環境**

```Plain Text
conda env list
```

```Plain Text
conda activate base
```

```Plain Text
conda init
```

![4.初始化conda環境 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)

#### **5.關閉此終端，打開新的終端**

參考 https://www.autodl.com/docs/network_turbo/

```Plain Text
source /etc/network_turbo
```

![5.關閉此終端，打開新的終端 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)

#### **6.創建lerobot環境**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

可選擇跟隨最新版： https://github.com/huggingface/lerobot.git  

注：最新版本的命令代碼可能不一致！

```PowerShell
conda install ffmpeg -c conda-forge
```

#### **7.進入src目錄下的lerobot，安裝帶有 feetech 電機依賴的 LeRobot：**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8.數據集導入到雲服務器裏**

分爲兩種情況，一種是**數據採集 時已上傳數據集到huggingface數據庫裏，一種是**

**①若 數據採集 時已上傳數據集到huggingface數據庫裏，可通過配置huggingface數據庫得到的key獲取**

![8.數據集導入到雲服務器裏 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)

```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```

![8.數據集導入到雲服務器裏 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)

```Plain Text
export HYDRA_FULL_ERROR=1
```

**②通過FileZilla上傳本地數據集，參考** https://www.autodl.com/docs/filezilla/

Linux最簡單的安裝方式：

```Python
sudo apt install filezilla
```

```Python
filezilla
```

打開filezilla，點擊“文件”選擇“站點管理器”，創建“新站點”，選擇“SFTP協議”

![8.數據集導入到雲服務器裏 – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)

![8.數據集導入到雲服務器裏 – 4](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)

返回AutoDL算力雲複製“登錄指令”並粘貼到方便查看的地方，將對應信息複製粘貼進去，點擊“連接”

![8.數據集導入到雲服務器裏 – 5](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)

![8.數據集導入到雲服務器裏 – 6](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)

![8.數據集導入到雲服務器裏 – 7](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)

![8.數據集導入到雲服務器裏 – 8](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)

![8.數據集導入到雲服務器裏 – 9](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)

在雲服務器的lerobot目錄下 創建 data 文件夾

![8.數據集導入到雲服務器裏 – 10](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)

將數據集文件夾 拉到 右邊 進行傳輸，等待傳輸完成

![8.數據集導入到雲服務器裏 – 11](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)

#### 9.數據集訓練

參考本教程的 [E.數據集訓練及評估](https://juxitech.feishu.cn/docx/QdDydq66zoqeHWxRSk8cAKHynue#doxcnxPAaGMZNAXH0fIR5OFkgRf)，在雲服務器中運行訓練命令

#### 10.模型文件導出

訓練完成後，將對應train目錄下的訓練模型導出

![10.模型文件導出 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)

## G. 常見問題

如果使用本文檔教程，請git clone本文檔推薦的github倉庫 https://github.com/Juxi-Technology/lerobot.git

本文檔推薦的倉庫是驗證過後的穩定版本，Lerobot官方倉庫是實時更新的最新版本，會出現一些無法預知的問題，例如數據集版本不同，指令不同等。

- [若使用RealSense深度相機，可自行參考並修改運行命令](https://juxitech.feishu.cn/docx/QdDydq66zoqeHWxRSk8cAKHynue#doxcnICJPiA21VEwYP58k5CjB5b)

- 在Jetson設備中，運行評估命令後未設置回合數和回合時間只能通過ctrl+z中斷進程會導致機械臂和相機斷連，重連後所有端口都改變

在命令中加入評估的回合數和回合時長的參數

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

- 如果校準舵機ID時候遇到

```Bash
`Motor ‘gripper’ was not found, Make sure it is connected`
```

請仔細檢查通訊線是否與舵機連接正常，電源是否正確電壓供電。”

- 如果遇到

```Bash
Could not connect on port "/dev/ttyACM0"
```

並且通過`ls /dev/ttyACM*`看到是有ACM0存在的，則是忘記給串口權限了，終端輸入`sudo chmod 666 /dev/ttyACM*` 即可`

- 如果遇到

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

請安裝ffmpeg7.1.1，`conda install ffmpeg=7.1.1-c conda-forge`。

![G. 常見問題 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)

- 如果遇到

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

需要檢查對應端口號的機械臂是否接通電源，總線舵機是否出現數據線鬆動或者脫落,哪個舵機燈不亮就是前面那個舵機的線鬆了。

- 如果校準機械臂的時候遇到

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

對機械臂進行重新斷電和上電，再次嘗試校準機械臂加準，如果在校準過程中遇到MAX角度達到上萬的值也可以使用這個方法，如果不行則需要對相應舵機進行重新舵機校準，即中位校準和ID寫入。

- 如果評估階段遇到

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

請先刪除`eval_`開頭的這個文件夾再次運行程序。

- 如果評估階段遇到

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

請注意--robot.cameras這個參數中的front和side等關鍵詞必須和採集數據集的時候保持嚴格一致。

- 如果你維修或者更換過機械臂零件，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或者`~/.cache/huggingface/lerobot/calibration/teleoperators`下的文件並重新校準機械臂，否者會出現報錯提示，校準的機械臂信息會存儲該目錄下的json文件中。

- 在3060的8G筆記本上訓練ACT的50組數據的時間大概爲6小時，在4090和A100的電腦上訓練50組數據時間大概爲2~3小時。

- 數據採集過程中要確保攝像頭位置和角度和環境光線的穩定，並且減少攝像頭採集到過多的不穩定背景和行人，否則部署的環境變化過大會導致機械臂無法正常抓取。

- 數據採集命令的num-episodes要確保採集數據足夠，不可中途手動暫停，因爲在數據採集結束後纔會計算數據的均值和方差，這在訓練中是必要的數據。

- 如果程序提示無法讀取USB攝像頭圖像數據，請確保USB攝像頭不是接在Hub上的，USB攝像頭必須直接接入設備，確保圖像傳輸速率快。

如果你遇到無法解決的軟件問題或環境依賴問題，除了查看本教程末尾的常見問題 部分外，請及時在 [LeRobot 平臺](https://github.com/huggingface/lerobot) 或 [LeRobot Discord 頻道](https://discord.gg/8TnwDdjFGU) 反饋問題。

## Windows查找舵機（飛特舵機上位機調試軟件）

爲了進行調試，任何 Windows PC 都可以通過 USB 連接來對舵機進行編程、調試或測試。爲此，請下載[Feetech 軟件](https://www.feetechrc.com/software.html)。對於 Ubuntu 系統，您可以使用[FT_SCServo_Debug_Qt 工具](https://github.com/Kotakku/FT_SCServo_Debug_Qt)。

[fddebug-master.zip]

選擇端口號，波特率選1000000，打開，並點擊“搜索”

![Windows查找舵機（飛特舵機上位機調試軟件） – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)





## ROS2 仿真控制（可自行實現）

https://github.com/holmsslk/so-arm-moveit-hardware



## 網頁端設置舵機ID和中位校準

https://bambot.org/feetech.js?lang=zh

1、根據舵機型號輸入0或1，點擊“連接”

![網頁端設置舵機ID和中位校準 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2、掃描ID 1~6 的舵機，可以根據掃描結果裏的FOUND確認對應ID舵機。例如圖片裏舵機 ID 1 被掃描到了

![網頁端設置舵機ID和中位校準 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3、ID設置和中位校準

①當前舵機ID輸入爲被掃描到的舵機ID

②在“ID管理”中輸入數字，點擊“更改ID”即可設置ID

③中位校準（STS3215舵機中位是2047，SCS0009舵機中位是511）

STS舵機：在“位置控制”輸入2047，並點擊“Set”

SCS舵機：在“位置控制”輸入511，並點擊“Set”

![網頁端設置舵機ID和中位校準 – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)

<RelatedProducts slugs="so-arm101,robot-vision-kit,tpu-flexible-gripper" />
