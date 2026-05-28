
暫時無法在飛書文件外展示此內容

本教學已更新至12月15日，可選擇跟隨最新版[官方文件進行操作](https://github.com/huggingface/lerobot/tree/main)，官方文件具體教學可以參考[本連結](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c)。若需要URDF等檔案請參考[本連結](https://github.com/TheRobotStudio/SO-ARM100)。9月15日舊版本請參考該[連結](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink)。SO-ARM101與SO-ARM100執行程式碼相互相容。

## A. 教學說明

**Pro版 黑色主動臂使用5V6A電源****轉接器****，白色從動臂使用12V5A電源轉接器！**

伺服馬達安裝和伺服馬達角度校準要提前做好，可參考[官方組裝教學](https://huggingface.co/docs/lerobot/so101)，本教學不涉及這些內容！

組裝教學可參考 [Lerobot機械臂組裝教學](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

若未配置好伺服馬達或未組裝機械臂，請先按照這個[README](https://github.com/TheRobotStudio/SO-ARM100)中的內容操作。它包含了材料清單，以及取得零件的連結，還包括3D列印零件的說明，以及如果您是第一次列印或者沒有3D印表機時的建議。

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

[RealSense深度攝像機D400系列安裝建構指南](https://dev.realsenseai.com/docs/installation)

[RealSense深度攝像機D400系列資料手冊](https://realsenseai.com/wp-content/uploads/2025/08/Intel-RealSense-D400-Series-Datasheet-August-2025.pdf)

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

#### 2. 在想要部署的 目錄（建立例如：lerobot） 下為 lerobot 建立並啟用一個新的 conda 環境：

&gt; 請不要在 ~/miniconda3目錄下建立或者匯入lerobot專案

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. 然後啟用您的 `conda` 環境（每次開啟終端機使用 lerobot 時都需要執行此操作！）：

```PowerShell
conda activate lerobot
```

#### 4. 複製 LeRobot：

```PowerShell
 git clone https://github.com/Juxi-Technology/lerobot.git
```

可選擇跟隨最新版：https://github.com/huggingface/lerobot.git  

註：最新版本的命令程式碼可能不一致！

#### 5. 在您的環境中安裝 ffmpeg：

使用 `miniconda` 時，在您的環境中安裝 `ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

這通常會為你的平台安裝使用 libsvtav1 編碼器編譯的 ffmpeg 7.X。如果不支援 libsvtav1（可以透過 `ffmpeg -encoders` 查看支援的編碼器），你可以：

【適用於所有平台】顯式安裝 ffmpeg 7.X：

```
conda install ffmpeg=7.1.1 -c conda-forge
```

無圖形相依（gdk-pixbuf、librsvg）用此命令安裝：

```
conda install ffmpeg=7.1.1 -c conda-forge --no-deps
```

【僅限 Linux】安裝 ffmpeg 的建構相依並從原始碼編譯支援 libsvtav1 的 ffmpeg，並確保使用的 ffmpeg 可執行檔是正確的，可以透過 `which ffmpeg` 確認。

如果你遇到以下報錯，也可以使用上述命令解決。

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YmI0OGYxMDE0ZjBkN2IwOTk2NGIwYjFhOTc1ZGYxMDFfdDJUSEx6cWhmdExObjJybmxPYjBsVE1VVWtDT1psUXhfVG9rZW46VEN2YWJRb2U1b1F1QTJ4WVhvemM2emJxbllmXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

#### 6. 進入lerobot目錄下，安裝帶有 feetech 馬達相依的 LeRobot：

```PowerShell
cd ~/lerobot &amp;&amp; pip install -e ".[feetech]"
```

對於 Jetson Jetpack 6.0+ 設備（請確保在執行此步驟前按照[此連結教學](https://pytorch.org/get-started/locally/)安裝了 Pytorch-gpu 和 Torchvision）：

```Plain
conda install -y -c conda-forge "opencv&gt;=4.10.0.84"  # 透過 conda 安裝 OpenCV 和其他相依，僅適用於 Jetson Jetpack 6.0+
conda remove opencv   # 解除安裝 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安裝指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 該版本需與 torchvision 相容
```

#### 7. 檢查 Pytorch 和 Torchvision

由於透過 pip 安裝 lerobot 環境時會解除安裝原有的 Pytorch 和 Torchvision 並安裝 CPU 版本，因此需要在 Python 中進行檢查。

```Plain
import torch
print(torch.cuda.is_available())
```

如果輸出結果為 False，需要根據[官網教學](https://pytorch.org/)重新安裝 Pytorch 和 Torchvision。

[Jetson Orin上Pytorch不相容問題](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8.  intelRealSense深度相機SDK相依環境安裝（若有intelRealSense深度相機）

若需使用RealSense深度攝像機，在`lerobot/src/lerobot/`下安裝pyrealsense2：

```Plain
pip install pyrealsense2
```

## C. 機械臂控制

### 連接埠授權

連接好電源線，黑色主動臂使用5V6A電源轉接器，白色從動臂使用12V5A電源轉接器，伺服馬達驅動板透過資料線連接到主機端

首先進入到`lerobot/src/lerobot/`目錄下

```Plain
cd ~/lerobot/src/lerobot/
```

然後啟用您的 `conda` 環境（每次開啟終端機使用 lerobot 時都需要執行此操作！）：

```Plain
conda activate lerobot
```

#### 1. 執行腳本以找尋連接埠

找尋機械臂對應的 USB 連接埠 為了找到每個機械臂正確的連接埠，請執行實用腳本兩次：：

```Plain
lerobot-find-port
```

#### 2. 範例輸出

識別Leader機械臂連接埠時的範例輸出（例如，Mac 上為 `/dev/tty.usbmodem575E0031751`，或 Linux 上可能為 `/dev/ttyACM0`）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

識別Follower機械臂連接埠時的範例輸出（例如，`/dev/tty.usbmodem575E0032081`，或在 Linux 上可能為 `/dev/ttyACM1`）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

請記住要拔出 USB 接頭，否則將無法偵測到介面。

#### 3. 疑難排解

在 Linux 上，您需要透過執行以下命令來授予對 USB 連接埠的存取權限：

```PowerShell
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### 校準機械臂

接下來，你需要對你的 SO-10x 機器人接上電源和資料線進行校準，以確保在相同的實體位置時，Leader機械臂和 Follower機械臂的位置資訊一致。這個校準過程至關重要，因為它可以讓在一個 SO-10x 機器人上訓練的類神經網路在另一個機器人上也能正常工作。如果需要重新校準機械臂，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或者`~/.cache/huggingface/lerobot/calibration/teleoperators`下的檔案並重新校準機械臂，否則會出現報錯提示，校準的機械臂資訊會儲存該目錄下的json檔案中。

#### 1. Follower機械臂的手動校準

請透過 3 針介面連接 6 個機器人伺服馬達的介面，並將底盤伺服馬達連接到伺服馬達驅動板，然後執行以下命令或 API 範例來校準機械臂：

以PC(linux)和jetson板卡為例，`第一個`插入usb介面會映射為`ttyACM0`，`第二個`插入usb介面會映射為`ttyACM1`。

在執行程式碼前請注意leader和follower的映射介面。

#### 2. 介面授權

首先，您需要授予介面權限，執行以下命令：

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. 然後校準Follower機械臂

接下來，透過執行以下 Python 命令來校準從動臂：

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

首先，您需要將機器人移動到所有關節都位於其 可活動範圍中間 的位置 並 保持機械臂不動。然後，按下Enter鍵後，您必須將每個關節在其完整的運動範圍內移動，校準檔案會記錄下可活動範圍的中位、最大值和最小值,並儲存在`~/.cache/huggingface/lerobot/calibration/robots`或者`~/.cache/huggingface/lerobot/calibration/teleoperators` 目錄下json檔案中。

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YzZkODRmYTQ2ZWIwMDQwMDFhN2MwZTM2NzQxMWNiNjdfUHF2MWp3ZTY2bU01NDVPVHNRUDZ3dTFtY3Vxajlkc3VfVG9rZW46SXEwRmJ3SHE2b25DTVJ4MVdOcGNxZ1hSbk43XzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YTYyYzU4ZGM5MjE4NWY3YTgwMjk3ZTE1NjdmMTY5ZDZfVGk1NkxhRGJwemRydzlMYmVCNnpNZmNsUFNJOHhVNGFfVG9rZW46V01ZYWJKR3E4bzV5WWl4Q3c0bmNUc1NnbmdlXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

#### **4. 校準Leader機械臂**

對主機械臂進行校準的步驟與上述相同，請執行以下命令或 API 範例：

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

&lt;video data-lark-video-uri="drivetoken://Ia3ObKlVKojzfCxK20Oc0JmQnqg" data-lark-video-mime="video/mp4" data-lark-video-size="48987663" data-lark-video-duration="0" data-lark-video-name="機械臂中位校準影片.mp4" data-lark-video-width="1220" data-lark-video-height="1080"&gt;&lt;/video&gt;

### 遙控操作

#### **1.** **簡單****遙控****操作**

然後，您就可以準備遙控您的機器人了！執行這個簡單的腳本（它不會連接和顯示攝像機）：

請注意，與機器人關聯的 **ID** 用於儲存校準檔案。在使用相同設定進行遙控操作、錄製和評估時，使用相同的 **ID** 至關重要。

先對序列阜給予權限：

```Bash
sudo chmod 666 /dev/ttyACM*
```

執行遙控操作：

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

1. 識別任何遺失的校準檔案並啟動校準程序。
2. 連接機器人和遙控設備，並開始遙控操作。

#### 2. 帶攝像機顯示的遠端操作

為了實例化攝像機，您需要一個攝像機識別碼。這個識別碼可能會在您重啟電腦或重新插拔攝像機時發生變化，這主要取決於您的作業系統。

要找尋連接到您系統的攝像機的**攝像機索引**，請執行以下腳本：

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

終端機會列印相關攝像機資訊。

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MDNhNjIzNDk0NWNlYjk5ZmI1OTZlMzI3YTJkNWE2YzNfalo5cnQwQzJiOFVXQ3NhR3VHOFpTRWZCMEdsOUYyM3NfVG9rZW46RjBNZGJKbEhZb09QVll4bDdtOWNOd0F4bkJmXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

您可以在 `~/lerobot/outputs/captured_images` 目錄中找到每台攝像機拍攝的圖片。

在 **macOS** 中使用 Intel RealSense 攝像機時，您可能會遇到 **“Error finding RealSense cameras: failed to set power state”** 的錯誤。這可以透過使用 `sudo` 權限執行相同的命令來解決。請注意，在 **macOS** 中使用 RealSense 攝像機是不穩定的。

之後，您就可以在遙控操作時在電腦上顯示攝像機畫面了，只需執行以下程式碼即可。這對於在錄製第一個資料集之前準備您的設定非常有用。

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

`fourcc: "MJPG"`格式圖像是經過壓縮後的圖像，你可以嘗試更高解析度，當然你可以嘗試`YUYV`格式圖像，但是這會導致圖像的解析度和FPS降低導致機械臂執行卡頓。目前`MJPG`格式下可支援`3`個攝像機`1920*1080`解析度並且保持`30FPS`, 但是依然不推薦2個攝像機透過同一個USB HUB接入主機

如果您有更多攝像機，可以透過變更 `--robot.cameras` 參數來新增。您應該注意`index_or_path` 的格式，它由 `python -m lerobot.find_cameras opencv` 命令輸出的攝像機 ID 的最後一位數字決定。

例如，如果你想新增攝像機:

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

如果你想新增RealSense深度相機，先執行`python -m lerobot.find_cameras realsense` 取得Id，並將此命令中robot.cameras參數的serial_number_or_name: "323622271780" 替換為自己的深度相機Id，`use_depth: true` 啟用深度串流：

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWUwNmY2NmNmMjM0NGExMjBmMTQ4Y2I3OTYxNTM5MjZfNXNCdlE3d1NUbWNNajBvTXI4OHN0OW11VUpoUlk3TWtfVG9rZW46VEI5emJiQjdxb1EwSEd4b2doaWM0Y3NhbkxiXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

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

## D. 資料採集

### 記錄一個資料集

- 如果你想資料集儲存在本地，可以直接執行：

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

其中`dateset.repo_id`和`dataset.single_task`可以自訂修改，`push_to_hub=false`，最後資料集會儲存在主目錄的`~/.cache/huggingface/lerobot`下會建立上述`juxi/test`資料夾，[若使用RealSense深度相機，可自行修改執行命令](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- 如果您想使用 Hugging Face Hub 的功能來上傳您的資料集，並且您之前尚未這樣做，請確保您已使用具有寫入權限的權杖登入，該權杖可以從 [Hugging Face 設定](https://huggingface.co/settings/tokens) 中產生：

```Bash
hf auth login
```

將您的 Hugging Face 儲存庫名稱儲存在一個變數中，以執行以下命令：

```Bash
hf auth whoami
```

記錄 5 個回合並將您的資料集上傳到 Hub：

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

你會看到類似如下資料:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**參數說明**

- episode_time_s: 表示每次收集資料的時間。
- reset_time_s: 是每次資料收集之間的準備時間。
- num_episodes: 表示預期收集多少組資料。
- push_to_hub: 決定是否將資料上傳到 HuggingFace Hub。

| 按鍵     | 動作                                   |
| -------- | -------------------------------------- |
| 右箭頭 → | 提前終止目前劇集/重置；進入下一個。    |
| 左箭頭 ← | 取消目前劇集；重新錄製。               |
| ESC      | 立即停止會話，編碼影片，並上傳資料集。 |

**資料收集技巧**

- **任務建議**：在不同位置抓取物體並將其放入箱子中。
- **規模**：記錄 ≥50 個劇集（每個位置 10 個劇集）。
- **一致性**：
  - 保持攝像機固定。
  - 保持相同的抓取行為。
  - 確保操作的物體在攝像機畫面中可見。
- **逐步推進**：
  - 先從可靠的抓取開始，然後再增加變化（新位置、抓取技巧、攝像機調整）。
  - 避免複雜性急劇增加，以防止失敗。

💡 **經驗法則**：僅使用攝像機畫面作為指導，只根據螢幕回饋的視訊圖像，來控制機械臂完成任務。

如果你想要深入了解這個重要主題，可以查看我們撰寫的關於什麼是好的資料集的[部落格文章](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)。

- 在接下來的章節中，你將訓練你的類神經網路。在實現可靠的抓取效能後，你可以在資料收集過程中引入更多變化，例如增加抓取位置、不同的抓取技巧以及改變相機位置。
- 避免快速新增過多變化，因為這可能會阻礙您的結果。

- "如果你希望將資料儲存在本地 (`--dataset.push_to_hub=false`)，請將 `--dataset.repo_id=${HF_USER}/so101_test` 替換為一個自訂的本地資料夾名稱，例如 `--dataset.repo_id=juxi/so101_test`。資料將儲存在系統主目錄下的 `~/.cache/huggingface/lerobot`"
- 如果你透過 `--dataset.push_to_hub=true` 將資料集上傳到了 Hugging Face Hub，可以透過 [線上視覺化你的資料集](https://huggingface.co/spaces/lerobot/visualize_dataset)，只需複製貼上你的 repo id。
- 在回合記錄過程中任何時候按下右箭頭 → 可提前停止並進入重置狀態。重置過程中同樣，可提前停止並進入下一個回合記錄。
- 在錄製或重置到早期階段時，隨時按左箭頭 ← 可提前停止目前劇集，並重新錄製。
- 在錄製過程中隨時按 ESCAPE ESC 可提前結束會話，直接進入視訊編碼和資料集上傳。
- 可以透過重新執行相同的命令並新增 `--resume=true` 來恢復錄製。⚠️ **重要提示**：在恢復時，需將 `--dataset.num_episodes` 設定為要額外記錄的劇集數量（而不是資料集中目標的總劇集數量）。如果要從頭開始錄製，請手動刪除資料集目錄。
- 在 Linux 上，如果在資料記錄期間左右箭頭鍵和 Esc 鍵沒有效果，請確保您已設定 $DISPLAY 環境變數。參見 [pynput 限制](https://pynput.readthedocs.io/en/latest/limitations.html#linux)。

如果你的鍵盤按下後沒有反應，可能你需要降低你pynput的版本，例如安裝個1.6.8版本的。

```
pip install `*`pynput`*`==1.6.8
```

### 視覺化一個資料集（可跳過，可嘗試）

```Python
echo ${HF_USER}/so101_test  
```

如果您沒有使用 `--dataset.push_to_hub=false` ，並上傳了資料，您也可以在本地透過以下命令進行視覺化：

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test \
```

如果您使用了 `--dataset.push_to_hub=false` ，沒有上傳資料，您也可以透過以下命令在本地進行視覺化：

```Python
lerobot-dataset-viz \
  --repo-id juxi/test \
```

這裡，`juxi` 是資料收集時自訂的 `repo_id` 名稱。

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YTdkNGMzYTM2MGNmNDg2NGZiMTEzNDBlZmFjZTUyYTZfQnA2cTJYVUxERlMwNVFqTWFXcWpENTlvY2VocFU0SXJfVG9rZW46UGNyQWJmY3Rtb3NrOTV4UXZid2NiVVpxbk5pXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

### 回放一個片段（可跳過，可嘗試）

現在，嘗試在您的機器人上重播第一個資料集：

```Python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

此時，機械臂應該做出與你遙控記錄時一樣的動作。

## E. 資料集訓練及評估

### ACT

參考官方教學[ACT](https://huggingface.co/docs/lerobot/act)

**訓練**

要訓練一個控制您機器人策略，使用 `python -m lerobot.scripts.train` 腳本。需要一些參數。以下是一個範例命令：

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

**如果您想在本地資料集上進行訓練，請確保** **`repo_id`** **與資料收集時使用的名稱匹配，並新增** **`--policy.push_to_hub=false`****。**

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

命令解釋

- **資料集指定**：我們透過 `--dataset.repo_id=${HF_USER}/so101_test` 參數提供了資料集。
- **訓練步數**：我們透過 `--steps=300000` 修改訓練步數，演算法預設為800000，根據自己的任務難易程度，觀察訓練時候的loss來進行調整。
- **策略類型**：我們使用 `policy.type=act` 提供了策略，同樣你可以更換[act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla]等策略，這將從 `configuration_act.py` 載入設定。重要的是，這個策略會自動適應您機器人（例如 `laptop` 和 `phone`）的馬達狀態、馬達動作和攝像機數量，這些資訊已儲存在您的資料集中。
- **裝置選擇**：我們提供了 `policy.device=cuda`，因為我們正在 Nvidia GPU 上進行訓練，但您可以使用 `policy.device=mps` 在 Apple Silicon 上進行訓練。
- **視覺化工具**：我們提供了 `wandb.enable=true` 來使用 [Weights and Biases](https://docs.wandb.ai/quickstart) 視覺化訓練圖表。這是選擇性的，但如果您使用它，請確保您已透過執行 `wandb login` 登入。

如果你遇到了以下報錯：

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=ODVhNDVmNzU4YjhmNDkwMjgzZTEyNzhjNGQ2NDZhZTVfam1pUWphV0hWamEzRjlHdlRRbmxodmNMODJORmdGbGFfVG9rZW46TVZEMGJER05HbzVubzV4UnNaNWNnblFnbkllXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

嘗試執行以下命令來解決:

```Bash
pip install datasets==2.19
```

訓練可能需要幾個小時。您將在 `outputs/train/act_so101_test/checkpoints` 目錄中找到訓練結果權重檔案。

要從某個訓練結果權重檔案恢復訓練，下面是一個從 `act_so101_test` 策略的最後一個訓練結果權重檔案恢復訓練的範例命令：

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**評估**

您可以使用 `lerobot/record.py` 中的 `record` 功能，但需要將策略訓練結果訓練結果權重檔案作為輸入。例如，執行以下命令記錄 10 個評估回合：

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

1. `--policy.path` 參數，指示您的策略訓練結果權重檔案的路徑（例如 `outputs/train/act_so101_test/checkpoints/last/pretrained_model`）。如果您將模型訓練結果權重檔案上傳到 Hub，也可以使用模型儲存庫（例如 `${HF_USER}/act_so101_test`）。
2. 資料集的名稱`dataset.repo_id`以 `eval_` 開頭，這個操作會在你評估的時候為你單獨錄製評估時候的影片和資料，將儲存在eval_開頭的資料夾下，例如`juxi/eval_test123`。
3. 如果評估階段遇到`File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`請先刪除`eval_`開頭的這個資料夾再次執行程式。
4. 當遇到`mean is infinity. You should either initialize with stats as an argument or use a pretrained model`請注意`--robot.cameras`這個參數中的front和side等關鍵字必須和採集資料集的時候保持嚴格一致。

### Smolvla

參考官方教學[SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

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
  --robot.id=my_awesome_follower_arm \ # &lt;- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
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

參考官方教學[Pi0](https://huggingface.co/docs/lerobot/pi0)

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

參考官方教學[Pi0.5](https://huggingface.co/docs/lerobot/pi05)

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

請參考官方教學[GR00T N1.5](https://huggingface.co/docs/lerobot/groot)

## F. 常見問題

如果使用本文件教學，請git clone本文件推薦的github儲存庫https://github.com/JuxiTechnology/lerobot.git

本文件推薦的儲存庫是驗證過後的穩定版本，Lerobot官方儲存庫是即時更新的最新版本，會出現一些無法預知的問題，例如資料集版本不同，指令不同等。

- [若使用RealSense深度相機，可自行參考並修改執行命令](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- 在Jetson設備中，執行評估命令後未設定回合數和回合時間只能透過ctrl+z中斷程序會導致機械臂和相機斷連，重連後所有連接埠都改變

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

- 如果校準伺服馬達ID時候遇到

```Bash
`Motor ‘gripper’ was not found, Make sure it is connected`
```

請仔細檢查通訊線是否與伺服馬達連接正常，電源是否正確電壓供電。”

- 如果遇到

```Bash
Could not connect on port "/dev/ttyACM0"
```

並且透過`ls /dev/ttyACM*`看到是有ACM0存在的，則是忘記給序列阜權限了，終端機輸入`sudo chmod 666 /dev/ttyACM*` 即可

- 如果遇到

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

請安裝ffmpeg7.1.1,`conda install ffmpeg=7.1.1 -c conda-forge`。

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQwMTg2YjUwY2FmODY0NWZmMWNhMTkyY2E4YWY5ODBfeWhtTXBIVlBUZ28zTTk3UktoTUg1MmVIUUQ4VXNJODRfVG9rZW46WXhUcGJweDdVb2lFUGJ4V0txZmN2YmJCbmFoXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

- 如果遇到

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

需要檢查對應連接埠號的機械臂是否接通電源，總線伺服馬達是否出現資料線鬆動或者脫落,哪個伺服馬達燈不亮就是前面那個伺服馬達的線鬆了。

- 如果校準機械臂的時候遇到

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

對機械臂進行重新斷電和上電，再次嘗試校準機械臂加準，如果在校準過程中遇到MAX角度達到上萬的值也可以使用這個方法，如果不行則需要對相應伺服馬達進行重新伺服馬達校準，即中位校準和ID寫入。

- 如果評估階段遇到

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

請先刪除`eval_`開頭的這個資料夾再次執行程式。

- 如果評估階段遇到

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

請注意--robot.cameras這個參數中的front和side等關鍵字必須和採集資料集的時候保持嚴格一致。

- 如果你維修或者更換過機械臂零件，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或者`~/.cache/huggingface/lerobot/calibration/teleoperators`下的檔案並重新校準機械臂，否則會出現報錯提示，校準的機械臂資訊會儲存該目錄下的json檔案中。
- 在3060的8G筆記型電腦上訓練ACT的50組資料的時間大概為6小時，在4090和A100的電腦上訓練50組資料時間大概為2~3小時。
- 資料採集過程中要確保攝像機位置和角度和環境光線的穩定，並且減少攝像機採集到過多的不穩定背景和行人，否則部署的環境變化過大會導致機械臂無法正常抓取。
- 資料採集命令的num-episodes要確保採集資料足夠，不可中途手動暫停，因為在資料採集結束後才會計算資料的均值和變異數，這在訓練中是必要的資料。
- 如果程式提示無法讀取USB攝像機圖像資料，請確保USB攝像機不是接在Hub上的，USB攝像機必須直接接入設備，確保圖像傳輸速率快。

如果你遇到無法解決的軟體問題或環境相依問題，除了查看本教學末尾的常見問題 部分外，請及時在 [LeRobot 平台](https://github.com/huggingface/lerobot) 或 [LeRobot Discord 頻道](https://discord.gg/8TnwDdjFGU) 回饋問題。

## Windows找尋伺服馬達（飛特伺服馬達上位機除錯軟體）

為了進行除錯，任何 Windows PC 都可以透過 USB 連接來對伺服馬達進行程式設計、除錯或測試。為此，請下載[Feetech 軟體](https://www.feetechrc.com/software.html)。對於 Ubuntu 系統，您可以使用[FT_SCServo_Debug_Qt 工具](https://github.com/Kotakku/FT_SCServo_Debug_Qt)。

暫時無法在飛書文件外展示此內容

選擇連接埠號，波特率選1000000，開啟，並點擊“搜尋”

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MmRlMzRmN2ViODY4ZjBlOTRhZmYzNWViNzU3ZmZjMjhfNDJRdVdLWWFES2VXQ1NRcGZmMElnb1N6SkUxR0xwaExfVG9rZW46SndRa2JCSDFkb240NXR4SXN6TGNNdkhIblFmXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

## ROS2 模擬控制（可自行實現）

https://github.com/holmsslk/so-arm-moveit-hardware

## 網頁端設定伺服馬達ID和中位校準

https://bambot.org/feetech.js?lang=zh

1、根據伺服馬達型號輸入0或1，點擊“連接”

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MGIxMDRiMjM3NTExODhlMzRlZTc4Zjc0MTY1NDI0YzVfd21xcW9wMDNxcDh2MVhycmduVWZSYkhhb2xDRUpQU3dfVG9rZW46VmtnQWJ3Zk0wb1Qyb0J4OGw3WGNlOXhqbmFlXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

2、掃描ID 1~6 的伺服馬達，可以根據掃描結果裡的FOUND確認對應ID伺服馬達。例如圖片裡伺服馬達 ID 1 被掃描到了

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MDg4ODI3OTRjNmYwZjhhNWUzOWI0YjhjOTk0MzM2ZDFfVlBwQkdqREFtUHNiMUR6dENQdkxpazdRaW9TcDluMnVfVG9rZW46T0F1UGJjVWFub3EzWEt4d3UxY2NOSWRQbjZjXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

3、ID設定和中位校準

①目前伺服馬達ID輸入為被掃描到的伺服馬達ID

②在“ID管理”中輸入數字，點擊“變更ID”即可設定ID

③中位校準（STS3215伺服馬達中位是2047，SCS0009伺服馬達中位是511）

STS伺服馬達：在“位置控制”輸入2047，並點擊“Set”

SCS伺服馬達：在“位置控制”輸入511，並點擊“Set”

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=NjllZjcyMmFkMzVjMmU1ZjFmMWMzNGU2MjFlMWExMzhfODB3UENIRXdDbXdYWW9QWXJQYVBRRkZvMlMzandHYVNfVG9rZW46QURISGI5RGxCb2V3V3R4amUxRmNVRXpXbnNoXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)
