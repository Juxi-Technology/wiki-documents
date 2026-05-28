# LeRobot SO-ARM101機械臂教程

本教學已更新至12月15日，可選擇跟隨最新版官方文檔進行操作，官方文檔具體教學可以參考本鏈接。若需要URDF等文件請參考本鏈接。9月15日舊版本請參考該鏈接。SO-ARM101與SO-ARM100運行代碼相互兼容。

## A. 教學說明

Pro版 黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器！

伺服馬達安裝和伺服馬達角度校準要提前做好，可參考官方組裝教程，本教程不涉及這些內容。

組裝教程可參考 [Lerobot機械臂組裝教程](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

若未配置好伺服馬達或未組裝機械臂，請先按照這個README中的內容操作。它包含了材料清單，以及獲取零件的鏈接，還包括3D列印零件的說明，以及如果您是第一次列印或者沒有3D印表機時的建議。

讓我們先從安裝LeRobot環境開始。

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

1. [安裝 Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install)環境：

需要根據你的 CUDA 版本安裝 pytorch 和 torchvision 等環境。

1. 對於 Jetson：

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

或者，對於 X86 Ubuntu 22.04：

```bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

2. 在想要部署的目錄（建立例如：lerobot）下為 lerobot 建立並啟用一個新的 conda 環境：

請不要在 ~/miniconda3目錄下建立或匯入lerobot專案

```bash
conda create -y -n lerobot python=3.10
```

3. 然後啟用您的 `conda` 環境（每次開啟終端使用 lerobot 時都需要執行此操作！）：

```bash
conda activate lerobot
```

4. 複製 LeRobot：

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
```

可選擇跟隨最新版：https://github.com/huggingface/lerobot.git

註：最新版本的命令程式碼可能不一致！

5. 在您的環境中安裝 ffmpeg：

使用 `miniconda` 時，在您的環境中安裝 `ffmpeg`：

```bash
conda install ffmpeg -c conda-forge
```

這通常會為您的平台安裝使用 libsvtav1 編碼器編譯的 ffmpeg 7.X。如果不支援 libsvtav1（可以透過 `ffmpeg -encoders` 查看支援的編碼器），您可以：

適用於所有平台：顯式安裝 ffmpeg 7.X：

```
conda install ffmpeg=7.1.1 -c conda-forge
```

無圖形相依（gdk-pixbuf、librsvg）用此命令安裝：

```
conda install ffmpeg=7.1.1 -c conda-forge --no-deps
```

僅限 Linux：安裝 ffmpeg 的建構相依並從原始碼編譯支援 libsvtav1 的 ffmpeg，並確保使用的 ffmpeg 可執行檔是正確的，可以透過 `which ffmpeg` 確認。

如果遇到以下報錯，也可以使用上述命令解決：

[錯誤截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YmI0OGYxMDE0ZjBkN2IwOTk2NGIwYjFhOTc1ZGYxMDFfdDJUSEx6cWhmdExObjJybmxPYbBsVE1VVWtDT1psUXhfVG9rZW46VEN2YWJRb2U1b1Q2QTJ4WVhvemM2emJxbllmXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

6. 進入lerobot目錄下，安裝帶有 feetech 馬達相依的 LeRobot：

```bash
cd ~/lerobot && pip install -e ".[feetech]"
```

對於 Jetson Jetpack 6.0+ 設備（請確保在執行此步驟前按照[此鏈接教學](https://pytorch.org/get-started/locally/)安裝了 Pytorch-gpu 和 Torchvision）：

```
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 透過 conda 安裝 OpenCV 和其他相依，僅適用於 Jetson Jetpack 6.0+
conda remove opencv   # 解除安裝 OpenCV
pip install opencv-python==4.10.0.84  # 使用 pip 安裝指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip install numpy==1.26.0  # 該版本需與 torchvision 相容
```

7. 檢查 Pytorch 和 Torchvision：

由於透過 pip 安裝 lerobot 環境時會解除安裝原有的 Pytorch 和 Torchvision 並安裝 CPU 版本，因此需要在 Python 中進行檢查。

```python
import torch
print(torch.cuda.is_available())
```

如果輸出結果為 False，需要根據官方教程重新安裝 Pytorch 和 Torchvision。

[Jetson Orin上Pytorch不相容問題](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

8. intelRealSense深度相機SDK相依環境安裝（若有intelRealSense深度相機）：

若需要使用RealSense深度攝像機，在`lerobot/src/lerobot/`下安裝pyrealsense2：

```
pip install pyrealsense2
```

## C. 機械臂控制

### 端口授權

連接好電源線，黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器，伺服馬達驅動板透過資料線連接到主機端。

首先進入到`lerobot/src/lerobot/`目錄下：

```
cd ~/lerobot/src/lerobot/
```

然後啟用您的 `conda` 環境（每次開啟終端使用 lerobot 時都需要執行此操作！）：

```
conda activate lerobot
```

1. 執行腳本以找尋連接端口：

找尋機械臂對應的 USB 端口，為了找到每個機械臂正確的端口，請執行實用腳本兩次：

```
lerobot-find-port
```

2. 範例輸出：

識別Leader機械臂端口時的範例輸出（例如，Mac 上為 `/dev/tty.usbmodem575E0031751`，或 Linux 上可能為 `/dev/ttyACM0`）：

```
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[中斷對應 leader 或 follower 臂並按 Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

識別Follower機械臂端口時的範例輸出（例如，`/dev/tty.usbmodem575E0032081`，或在 Linux 上可能為 `/dev/ttyACM1`）：

```
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[中斷對應 leader 或 follower 臂並按 Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

請記住要拔出 USB 接頭，否則將無法識別端口。

3. 疑難排解：

在 Linux 上，您需要透過執行以下命令來授予對 USB 端口的存取權限：

```
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### 校準機械臂

接下來，您需要對您的 SO-10x 機器人接上電源和資料線進行校準，以確保在相同的實體位置時，Leader機械臂和 Follower機械臂的位置資訊一致。這個校準過程至關重要，因為它可以讓在一個 SO-10x 機器人上訓練的類神經網路在另一個機器人上也能正常工作。如果需要重新校準機械臂，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或`~/.cache/huggingface/lerobot/calibration/teleoperators`下的檔案並重新校準機械臂，否則會出現報錯提示，校準的機械臂資訊會儲存該目錄下的json檔案中。

1. Follower機械臂的手動校準：

請透過 3 針介面連接 6 個機器人伺服馬達的介面，並將底盤伺服馬達連接到伺服馬達驅動板，然後執行以下命令或 API 範例來校準機械臂：

以PC(linux)和jetson板卡為例，第一個插入usb介面會映射為ttyACM0，第二個插入usb介面會映射為ttyACM1。

在執行程式碼前請注意leader和follower的映射介面。

2. 端口授權：

首先，您需要授予端口權限，執行以下命令：

```bash
sudo chmod 666 /dev/ttyACM*
```

3. 然後校準Follower機械臂：

接下來，透過執行以下 Python 命令來校準從動臂：

```python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

首先，您需要將機器人移動到所有關節都位於其活動範圍中間的位置並保持機械臂不動。然後，按下Enter按鈕後，您必須將每個關節在其完整的運動範圍內移動，校準檔案會記錄下活動範圍的中位、最大值和最小值，並儲存在`~/.cache/huggingface/lerobot/calibration/robots`或`~/.cache/huggingface/lerobot/calibration/teleoperators`目錄下的json檔案中。

[截圖1](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YzZkODRmYTQ2ZWIwMDQwMDFhN2MwYjFhOTc1ZGYxMDFfd21xcW9wMDNxcDh2MVhycmduVWZSYkhhb2xDRUpQU3dfVG9rZW46T0F1UGJjVWFub3EzWEt4d3UxY2NOSWRQbjZjXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)
[截圖2](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MDg4ODI3OTRjNmYwZjhhNWUzOWI0YjhjOTk0MzM2ZDFfVlBwQkdqREFtUHNiMUR6dENQdkxpazdRaW9TcDluMnVfVG9rZW46T0F1UGJjVWFub3EzWEt4d3UxY2NOSWRQbjZjXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

4. 校準Leader機械臂：

對主動臂進行校準的步驟與上述相同，請執行以下命令或 API 範例：

```python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

[機械臂中位校準影片](https://bambot.org/feetech.js?lang=zh)

### 遙控操作

1. 簡單遙控操作：

然後，您就可以準備遙控您的機器人了！執行這個簡單的腳本（它不會連接和顯示攝像頭）：

請注意，與機器人關聯的 ID 用於儲存校準檔案。在使用相同設定進行遙控操作、錄製和評估時，使用相同的 ID 至關重要。

先對序列阜給予權限：

```bash
sudo chmod 666 /dev/ttyACM*
```

執行遙控操作：

```python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

遙控操作命令將自動執行以下步驟：

1. 識別任何遺失的校準檔案並啟動校準程序
2. 連接機器人和遙控設備，並開始遙控操作

2. 帶攝像頭顯示的遠端操作：

為了實例化攝像頭，您需要一個攝像頭識別碼。這個識別碼可能會在您重新啟動電腦或重新插拔攝像頭時發生變化，主要取決於您的作業系統。

要找尋連接到您系統的攝像頭的攝像頭索引，請執行以下腳本：

```python
lerobot-find-cameras realsense  # 或者是 realsense 用於 Intel RealSense 攝像頭
```

終端將列出相關攝像頭資訊。

[截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MDNhNjIzNDk0NWNlYjk5ZmI1OTZlMzI3YTJkNWE2YzNfalo5cnQwQzJiOFVXQ3NhR3VHOFpTRWZCMEdsOUYyM3NfVG9rZW46RjBNZGJKbEhZb09QVll4bDdtOWNOd0F4bkJmXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

您可以在 `~/lerobot/outputs/captured_images` 目錄中找到每個攝像頭拍攝的圖像。

在 macOS 上使用 Intel RealSense 攝像頭時，您可能會遇到錯誤 "Error finding RealSense cameras: failed to set power state"。這可以透過使用 `sudo` 權限執行相同的命令來解決。請注意，在 macOS 上使用 RealSense 攝像頭是不穩定的。

之後，您就可以在遙控操作時在電腦上顯示攝像頭畫面了，只需執行以下程式碼即可。這對於在錄製第一個資料集之前準備您的設定非常有用：

```python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=true
```

fourcc: "MJPG" 格式圖像會經過壓縮，您可以嘗試更高的解析度，當然您也可以嘗試 YUYV 格式圖像，但是這會導致圖像的解析度和 FPS 下降，導致機械臂執行卡頓。目前 MJPG 格式下可支援 3 個攝像頭 1920*1080 解析度並保持 30 FPS，但是依然不建議 2 個攝像頭透過同一個 USB HUB 接入主機。

如果您有更多的攝像頭，可以透過變更 `--robot.cameras` 參數來新增。您應該注意 index_or_path 的格式，它由 `python -m lerobot.find_cameras opencv` 命令輸出的攝像頭 ID 的最後一位數字決定。

例如，若您想新增攝像頭：

```python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=true
```

如果您想新增RealSense深度相機，先執行`python -m lerobot.find_cameras realsense` 取得Id，並將此命令中robot.cameras參數的serial_number_or_name: "323622271780" 替換為自己的深度相機Id，use_depth: true 啟用深度串流：

[截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWUwNmY2NmNmMjM0NGExMjBmMTQ4YjFhOTc1ZGYxMDFfNXNCdlE3d1NUbWNNajBvTXI4OHN0OW11VUpoUlk3TWtfVG9rZW46VEI5emJiQjdxb1UwSEd4b2doaWM0Y3NhbkJiXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

```python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: intelrealsense, serial_number_or_name: \"323622271780\", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=true
```

## D. 資料採集

### 錄製一個資料集

如果您想把資料集儲存到本地，可以直接執行：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode-time-s=30 \
    --dataset.reset-time-s=30 
```

其中 dateset.repo_id 和 dataset.single_task 可以自訂修改，push_to_hub=false，最後資料集會儲存在主目錄的 `~/.cache/huggingface/lerobot` 下會建立上述 juxi/test 資料夾，若使用 RealSense 深度相機，可自行修改執行命令，參見此[鏈接](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)。

如果您想使用 Hugging Face Hub 的功能來上傳您的資料集，並且您之前尚未這樣做，請確保您已使用具有寫入權限的權杖登入，該權杖可以從 Hugging Face 設定中產生：

```bash
huggingface-cli login
```

將您的 Hugging Face 儲存庫名稱儲存在一個變數中，以執行以下命令：

```bash
huggingface-cli whoami
```

錄製 5 個回合並將您的資料集上傳到 Hub：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode-time-s=30 \
    --dataset.reset-time-s=30 
```

您會看到類似如下的資訊：

```
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

參數說明：

- episode-time-s：每次收集資料的時間
- reset-time-s：每次資料收集之間的準備時間
- num_episodes：預期收集多少組資料
- push_to_hub：決定是否將資料上傳到 HuggingFace Hub

按鍵說明：

| 按鍵     | 動作                           |
| -------- | ------------------------------ |
| 右箭頭 → | 提前終止目前劇集/重置，進入下一個 |
| 左箭頭 ← | 取消目前劇集，重新錄製          |
| ESC      | 立即停止會話，編碼影片，並上傳資料集 |

資料收集技巧：

- 任務建議：在不同位置抓取物體並將其放入箱子中
- 規模：記錄 ≥50 個劇集（每個位置 10 個劇集）
- 一致性：
  - 保持攝像頭固定
  - 保持相同的抓取行為
  - 確保操作的物體在攝像頭畫面中可見
- 逐步推進：
  - 先從可靠的抓取開始，然後再增加變化（新位置、抓取技巧、攝像頭調整）
  - 避免複雜性急劇增加，以防止失敗

經驗法則：僅使用攝像頭畫面作為指導，只根據螢幕回饋的視訊圖像來控制機械臂完成任務。

如果您想深入了解這個重要主題，可以查看我們撰寫的關於什麼是好的資料集的[部落格文章](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)。

在接下來的章節中，您將訓練您的類神經網路。在實現可靠的抓取效能後，您可以在資料收集過程中引入更多變化，例如增加抓取位置、不同的抓取技巧以及改變相機位置。

避免快速新增過多變化，因為這可能會阻礙您的結果。

如果您希望將資料儲存到本地 (--dataset.push_to_hub=false)，請將 --dataset.repo_id 替換為自訂的本地資料夾名稱，例如 juxi/so101_test。資料將儲存在系統主目錄下的 ~/.cache/huggingface/lerobot。

如果您透過 --dataset.push_to_hub=true 將資料集上傳到 Hugging Face Hub，可以透過線上視覺化您的資料集，只需複製貼上您的 repo id。

在回合錄製過程中任何時候按下右箭頭 → 可提前停止並進入重置狀態。重置過程中同樣可提前停止並進入下一個回合錄製。

在錄製或重置的早期階段隨時按左箭頭 ← 可提前停止目前劇集並重新錄製。

在錄製過程中隨時按 ESC 可提前結束會話，直接進入視訊編碼和資料集上傳。

可以透過重新執行相同的命令並新增 --resume=true 來恢復錄製。重要提示：在恢復時需要將 --dataset.num_episodes 設定為要額外記錄的劇集數量（而不是資料集中目標的總劇集數量）。如果要從頭開始錄製，請手動刪除資料集目錄。

在 Linux 上，如果在資料記錄期間左右箭頭鍵和 Esc 鍵沒有效果，請確保您已設定 $DISPLAY 環境變數。參見 pynput 限制。

如果您的鍵盤按壓後沒有反應，可能您需要降低 pynput 的版本，例如安裝 1.6.8 版本：

```
pip install pynput==1.6.8
```

### 視覺化一個資料集（可跳過，可嘗試）

```python
echo ${HF_USER}/so101_test
```

如果您沒有使用 --dataset.push_to_hub=false 並上傳了資料，也可以在本地透過以下命令進行視覺化：

```python
lerobot-dataset-viz \
    --repo-id ${HF_USER}/so101_test
```

如果您使用了 --dataset.push_to_hub=false 沒有上傳資料，也可以透過以下命令在本地進行視覺化：

```python
lerobot-dataset-viz \
    --repo-id juxi/test
```

這裡 juxi 是資料收集時自訂的 repo id 名稱。

[截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=YTdkNGMzYTQ2MGNmNDg2NGZiMTEzNDBlZmFjZTUyYTZfQnA2cTJYVUxERlMwNVFqTWFXcWpENTlvY2VocFU0SXJfVG9rZW46UGNPRmJqY3Rmb3NrOTV4UXZid2NiVVpxbk5pXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

### 回放一個片段（可跳過，可嘗試）

現在，嘗試在您的機器人上重播第一個資料集：

```python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo-id=${HF_USER}/record-test \
    --dataset.episode=0
```

此時，機械臂應該會做出與您遙控錄製時一樣的動作。

## E. 資料集訓練及評估

### ACT

參考官方教程[ACT](https://huggingface.co/docs/lerobot/act)

訓練：

要訓練一個控制您機器人的策略，使用 `python -m lerobot.scripts.train` 腳本。需要一些參數。以下是一個範例命令：

```python
lerobot-train \
    --dataset.repo-id=${HF_USER}/so101_test \
    --policy.type=act \
    --output_dir=outputs/train/act_so101_test \
    --job-name=act_so101_test \
    --policy.device=cuda \
    --wandb.enable=false \
    --steps=300000 
```

如果您想在本地資料集上進行訓練，請確保 repo_id 與資料收集時使用的名稱匹配，並新增 --policy.push_to_hub=false：

```python
lerobot-train \
    --dataset.repo-id=juxi/test \
    --policy.type=act \
    --output_dir=outputs/train/act_so101_test \
    --job-name=act_so101_test \
    --policy.device=cuda \
    --wandb.enable=false \
    --policy.push-to-hub=false \
    --steps=300000 
```

命令說明：

- dataset.repo-id：透過這個參數提供資料集
- steps：透過這個參數修改訓練步數，演算法預設為 800000，根據自己的任務難易程度，觀察訓練時的 loss 來進行調整
- policy.type：透過這個參數提供策略，同樣您可以更換為 act、diffusion、pi0、pi0fast、pi0.5、sac、smolvla 等策略，這將從 configuration_act.py 載入設定。重要的是，這個策略會自動適應您的機器人（例如 laptop 和 phone）的馬達狀態、馬達動作和攝像頭數量，這些資訊已儲存在您的資料集中
- policy.device：提供這個參數，因為我們正在 Nvidia GPU 上進行訓練，但您可以使用 policy.device=mps 在 Apple Silicon 上進行訓練
- wandb.enable：提供這個參數來使用 Weights and Biases 可視化訓練圖表。這是選擇性的，但如果您使用它，請確保您已透過執行 wandb login 登入

如果您遇到以下報錯：

[錯誤截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=ODVhNDVmNzU4YjhmNDkwMjgzZTEyNzhjNGQ2NDZhZTVfam1pUWphV0hWamEzRjlHdlRRbmxodmNMODJORmdGbGFfVG9rZW46TVZEMGJER05HbzVubzV4UnNaNWNnblFnbkllXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

嘗試執行以下命令來解決：

```bash
pip install datasets==2.19
```

訓練可能需要幾個小時。您將在 outputs/train/act_so101_test/checkpoints 目錄中找到訓練結果權重檔案。

要從某個訓練結果權重檔案恢復訓練，以下是一個從 act_so101_test 策略的最後一個訓練結果權重檔案恢復訓練的範例命令：

```bash
lerobot-train \
    --config-path=outputs/train/act_so101_test/checkpoints/last/pretrained-model/train-config.json \
    --resume=true
```

評估：

您可以使用 lerobot/record.py 中的 record 功能，但需要將策略訓練結果權重檔案作為輸入。例如，執行以下命令記錄 10 個評估回合：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=false \
    --dataset.repo-id=juxi/eval-test123 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.episode-time-s=30 \
    --dataset.reset-time-s=30 \
    --dataset.num_episodes=5 \
    --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained-model \
    --dataset.push-to-hub=false
```

1. policy.path 參數指示您的策略訓練結果權重檔案的路徑（例如 outputs/train/act_so101_test/checkpoints/last/pretrained-model）。如果您將模型訓練結果權重檔案上傳到 Hub，也可以使用模型儲存庫（例如 ${HF_USER}/act_so101_test）。
2. 資料集的名稱 dataset.repo_id 以 eval_ 開頭，這個操作會在您評估時為您單獨錄製評估時的影片和資料，將儲存在 eval_ 開頭的資料夾下，例如 juxi/eval-test123。
3. 如果評估階段遇到 File exists: home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval-test123 請先刪除 eval_ 開頭的這個資料夾再次執行程式。
4. 當遇到 mean is infinity. You should either initialize with stats as an argument or use a pretrained model 請注意 --robot.cameras 這個參數中的 front 和 side 等關鍵字必須與採集資料集時保持嚴格一致。

### Smolvla

參考官方教程[SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```bash
pip install -e ".[smolvla]"
```

訓練：

```bash
lerobot-train \
    --policy.path=lerobot/smolvla-base \
    --dataset.repo-id=${HF_USER}/mydataset \
    --batch-size=64 \
    --steps=20000 \
    --output_dir=outputs/train/my-smolvla \
    --job-name=my-smolvla-training \
    --policy.device=cuda \
    --wandb.enable=true
```

驗證：

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.repo-id=juxi/eval-test123 \
    --dataset.episode-time-s=30 \
    --dataset.reset-time-s=30 \
    --dataset.num_episodes=5 \
    --policy.path=${HF_USER}/FINETUNE_MODEL_NAME
```

### Pi0

參考官方教程[Pi0](https://huggingface.co/docs/lerobot/pi0)

```bash
pip install -e ".[pi]"
```

訓練：

```bash
lerobot-train \
    --policy.type=pi0 \
    --dataset.repo-id=juxi/eval-test123 \
    --job-name=pi0-training \
    --output_dir=outputs/pi0-training \
    --policy.pretrained-path=lerobot/pi0-base \
    --policy.compile-model=true \
    --policy.gradient-checkpointing=true \
    --policy.dtype=bfloat16 \
    --steps=20000 \
    --policy.device=cuda \
    --batch-size=32 \
    --wandb.enable=false 
```

驗證：

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --robot.id=my_awesome_follower_arm \
    --display-data=false \
    --dataset.repo-id=juxi/eval-test123 \
    --dataset.single_task="Put the blue cube on the black box" \
    --policy.path=outputs/pi0-training/checkpoints/last/pretrained-model
```

### Pi0.5

參考官方教程[Pi0.5](https://huggingface.co/docs/lerobot/pi0.5)

```bash
pip install -e ".[pi]"
```

訓練：

```bash
lerobot-train \
    --dataset.repo-id=juxi/eval-test123 \
    --policy.type=pi0.5 \
    --output_dir=outputs/pi0.5-training \
    --job-name=pi0.5-training \
    --policy.pretrained-path=lerobot/pi0.5-base \
    --policy.compile-model=true \
    --policy.gradient-checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch-size=32
```

驗證：

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --robot.id=my_awesome_follower_arm \
    --display-data=false \
    --dataset.repo-id=juxi/eval-test123 \
    --dataset.single_task="Put the blue cube on the black box" \
    --policy.path=outputs/pi0.5-training/checkpoints/last/pretrained-model
```

## F. 常見問題

如果使用本文件教學，請 git clone 本文件推薦的 GitHub 倉庫 https://github.com/Juxi-Technology/lerobot.git。

本文件推薦的倉庫是經過驗證的穩定版本，Lerobot 官方倉庫是及時更新的最新版本，會出現一些無法預測的問題，例如資料集版本不同、命令不同等。

若使用 RealSense 深度相機，可自行參考並修改執行命令，參見此[鏈接](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)。

在 Jetson 設備中，執行評估命令後未設定回合數和回合時間只能透過 ctrl+z 中斷程序會導致機械臂和相機斷連，重連後所有端口都會改變。

在命令中加入評估的回合數和回合時間的參數，例如：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display-data=false \
    --dataset.repo-id=juxi/eval-test123 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.episode-time-s=30 \
    --dataset.reset-time-s=30 \
    --dataset.num_episodes=5 \
    --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained-model \
    --dataset.push-to-hub=false
```

如果校準伺服馬達 ID 時遇到 Motor 'gripper' was not found, Make sure it is connected：

請仔細檢查通訊線是否與伺服馬達連接正常，電源是否正確電壓供電。

如果遇到 Could not connect on port "/dev/ttyACM0" 並且透過 ls /dev/ttyACM* 看到是有 ACM0 存在的，則是忘記給序列阜權限了，終端輸入 sudo chmod 666 /dev/ttyACM* 即可。

如果遇到 No valid stream found in input file. Is -1 of the desired media type?：

請安裝 ffmpeg 7.1.1，conda install ffmpeg=7.1.1 -c conda-forge。

[截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQwMTg2YjUwY2FmODY4NWZmMWNhMTkyY2E4YWY5ODBfeWhtTXBIVlBUZ283TTk3UktoTUg1MmVIUUQ4VXNJODRfVG9rZW46WXhUcGJweDdVb2lFUGJ4W0txZmN2YmJCbmFoXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

如果遇到 ConnectionError: Failed to sync read 'Present Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!：

需要檢查對應端口的機械臂是否接通電源，總線伺服馬達是否出現資料線鬆動或脫落，哪個伺服馬達燈不亮就是前面那個伺服馬達的線鬆了。

如果校準機械臂時遇到 Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)：

對機械臂進行重新斷電和上電，再次嘗試校準機械臂加準。如果在校準過程中遇到 MAX 角度達到上萬的值也可以使用這個方法。如果不行則需要對相應伺服馬達進行重新伺服馬達校準，即中位校準和 ID 寫入。

如果評估階段遇到 File exists: home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval-test123：

請先刪除 eval_ 開頭的這個資料夾再次執行程式。

如果評估階段遇到 mean is infinity. You should either initialize with stats as an argument or use a pretrained model：

請注意 --robot.cameras 這個參數中的 front 和 side 等關鍵字必須與採集資料集時保持嚴格一致。

如果維修或更換過機械臂零件，請完全刪除 ~/.cache/huggingface/lerobot/calibration/robots 或 ~/.cache/huggingface/lerobot/calibration/teleoperators 下的檔案並重新校準機械臂，否則會出現報錯提示。校準的機械臂資訊會儲存該目錄下的 json 檔案中。

在 3060 的 8G 筆記型電腦上訓練 ACT 的 50 組資料的時間大概為 6 小時，在 4090 和 A100 的電腦上訓練 50 組資料時間大概為 2-3 小時。

資料採集過程中要確保攝像頭位置和角度和環境光線的穩定，並且減少攝像頭採集到過多的不穩定背景和行人，否則部署的環境變化過大會導致機械臂無法正常抓取。

資料採集命令的 num_episodes 要確保採集資料足夠，不可中途手動暫停，因為在資料採集結束後才會計算資料的均值和變異數，這在訓練中是必要的資料。

如果程式提示無法讀取 USB 攝像頭圖像資料，請確保 USB 攝像頭不是接在 Hub 上的，USB 攝像頭必須直接接入設備，確保圖像傳輸速率快。

如果遇到無法解決的軟體問題或環境相依問題，除了查看本教程末尾的常見問題部分外，請及時在 [LeRobot 平台](https://github.com/huggingface/lerobot)或 [LeRobot Discord 頻道](https://discord.gg/8TnwDdjFGU)回報問題。

## Windows 找尋伺服馬達（飛特伺服馬達上位機除錯軟體）

為了進行除錯，任何 Windows PC 都可以透過 USB 連接來對伺服馬達進行程式設計、除錯或測試。為此，請下載 [Feetech 軟體](https://www.feetechrc.com/software.html)。對於 Ubuntu 系統，您可以使用 [FT_SCServo_Debug_Qt 工具](https://github.com/Kotakku/FT_SCServo_Debug_Qt)。

暫時無法在飛書文件外展示此內容

選擇端口號，波特率選 1000000，打開，並點擊搜尋。

[截圖](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MmRlMzRmN2ViODY4ZjBlOTRhZmYzNWViNzU3ZmZjMjhfNDJRdVdLWWFES2VXQ1NRcGZmMElnb1N6SkUxR0xwaExfVG9rZW46SndRa2JCSDFkb240NXR4SXN6TGNNdkhIblFmXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

## ROS2 模擬控制（可自行實現）

https://github.com/holmesslk/so-arm-moveit-hardware

## 網頁端設定伺服馬達 ID 和中位校準

https://bambot.org/feetech.js?lang=zh

1. 根據伺服馬達型號輸入 0 或 1，點擊連接。

[截圖1](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MGIxMDRiMjM3NTExODhlMzRlZTc4Zjc0MTY1NDI0YzVfd21xcW9wMDNxcDh2MVhycmduVWZSYkhhb2xDRUpQU3dfVG9rZW46VmtnQWJ3Zk0wb1Q2b0J4OGw3WGNlOXhqbmFlXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

2. 掃描 ID 1-6 的伺服馬達，可以根據掃描結果中的 FOUND 確認對應 ID 伺服馬達。例如截圖中伺服馬達 ID 1 被掃描到了。

[截圖2](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=MDg4ODI3OTRjNmYwZjhhNWUzOWI0YjhjOTk0MzM2ZDFfVlBwQkdqREFtUHNiMUR6dENQdkxpazdRaW9TcDluMnVfVG9rZW46T0F1UGJjVWFub3EzWEt4d3UxY2NOSWRQbjZjXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)

3. ID 設定和中位校準：

   1. 目前伺服馬達 ID 輸入為被掃描到的伺服馬達 ID
   2. 在 ID 管理中輸入數字，點擊變更 ID 即可設定 ID
   3. 中位校準（STS3215 伺服馬達中位是 2047，SCS0009 伺服馬達中位是 511）
   4. STS 伺服馬達：在位置控制輸入 2047，並點擊 Set
   5. SCS 伺服馬達：在位置控制輸入 511，並點擊 Set

[截圖3](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=NjllZjcyMmFkMzVjMmU1ZjFmMWMzNGU2MjFlMWExMzhfODB3UENIRXdDbXdYWW9PXJQYVBRRkZvMlMzandHYVNfVG9rZW46QURISGI5RGxCb2V3V3R4amUxRmNVRXpWbnNoXzE3Nzk3Nzk2NDY6MTc3OTc4MzI0Nl9WNA)
