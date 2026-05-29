# LeRobot SO-ARM101機械臂教程

本教學已更新至12月15日，可選擇跟隨最新版官方文檔進行操作，官方文檔具體教學可以參考本鏈接。若需要URDF等文件請參考本鏈接。9月15日舊版本請參考該鏈接。SO-ARM101與SO-ARM100運行代碼相互兼容。

## A. 教學說明

Pro版黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器！

舵機安裝和舵機角度校準要提前做好，可參考官方組裝教程，本教程不涉及這些內容！

組裝教程可參考 [Lerobot機械臂組裝教程](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKuned)

若未配置好舵機或未組裝機械臂，請先按照這個README中的內容操作。它包含了材料清單，以及獲取零件的鏈接，還包括3D打印零件的說明，以及如果您是第一次打印或者沒有3D打印機時的建議。

讓我們先從安裝LeRobot環境開始。

## B. 環境準備

對於Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

對於Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

[RealSense深度攝像機D400系列安裝建構指南](https://dev.realsenseai.com/docs/installation)

[RealSense深度攝像機D400系列資料手冊](https://realsenseai.com/wp-content/uploads/2025/08/Intel-RealSense-D400-Series-Datasheet-August-2025.pdf)

### 安裝 LeRobot 環境

#### 1. [安裝 Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install)環境：

需要根據您的CUDA版本安裝pytorch和torchvision等環境。

1. 對於 Jetson:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

或者，對於X86 Ubuntu 22.04:

```bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. 在想要部署的目錄下為lerobot創建並啟用一個新的conda環境：

> 請不要在~/miniconda3目錄下創建或匯入lerobot項目

```bash
conda create -y -n lerobot python=3.10
```

#### 3. 然後啟用您的conda環境（每次打開終端使用lerobot時都需要執行此操作！）：

```bash
conda activate lerobot
```

#### 4. 複製 LeRobot:

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
```

可以選擇跟隨最新版本：https://github.com/huggingface/lerobot.git

注意：最新版本的命令程式碼可能不一致！

#### 5. 在您的環境中安裝ffmpeg:

使用miniconda時，在您的環境中安裝ffmpeg:

```bash
conda install ffmpeg -c conda-forge
```

這通常會為您的平台安裝使用libsvtav1編碼器編譯的ffmpeg 7.X。如果不支持libsvtav1（可以通過ffmpeg -encoders查看支持的編碼器），您可以：

[適用於所有平台]顯式安裝ffmpeg 7.X：

```bash
conda install ffmpeg=7.1.1 -c conda-forge
```

安裝無圖形依賴（gdk-pixbuf、librsvg）的版本：

```bash
conda install ffmpeg=7.1.1 -c conda-forge --no-deps
```

[僅限Linux]安裝ffmpeg的建構依賴並從原始碼編譯支持libsvtav1的ffmpeg，並確保使用的ffmpeg可執行檔是正確的，可以通過which ffmpeg確認。

如果您遇到以下錯誤，也可以使用上述命令解決它。

#### 6. 進入lerobot目錄並安裝帶有feetech馬達依賴的LeRobot:

```bash
cd ~/lerobot &amp;&amp; pip install -e ".[feetech]"
```

對於Jetson Jetpack 6.0+設備（請確保在執行此步驟之前根據此鏈接教程安裝了Pytorch-gpu和Torchvision）：

```bash
conda install -y -c conda-forge "opencv&gt;=4.10.0.84"  # 透過conda安裝OpenCV和其他依賴，僅適用於Jetson Jetpack 6.0+
conda remove opencv   # 解除安裝OpenCV
pip3 install opencv-python==4.10.0.84  # 使用pip3安裝指定版本OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 該版本需要與torchvision相容
```

#### 7. 檢查Pytorch和Torchvision

由於透過pip安裝lerobot環境時會解除安裝原有的Pytorch和Torchvision並安裝CPU版本，因此您需要在Python中進行檢查。

```python
import torch
print(torch.cuda.is_available())
```

如果輸出為False，您需要根據官方教程重新安裝Pytorch和Torchvision。

[Jetson Orin上Pytorch不相容問題](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. 安裝intelRealSense深度相機SDK依賴環境（如果您有intelRealSense深度相機）

如果您需要使用RealSense深度攝像機，在`lerobot/src/lerobot/`下安裝pyrealsense2：

```bash
pip install pyrealsense2
```

## C. 機械臂控制

### 端口授權

連接好電源線，黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器，舵機驅動板透過資料線連接到主機端。

首先進入到`lerobot/src/lerobot/`目錄：

```bash
cd ~/lerobot/src/lerobot/
```

然後啟用您的conda環境（每次打開終端使用lerobot時都需要執行此操作！）：

```bash
conda activate lerobot
```

#### 1. 執行腳本以查找端口

為了找到每個機械臂正確的端口，請執行實用腳本兩次：

```bash
lerobot-find-port
```

#### 2. 範例輸出

識別Leader機械臂端口時的範例輸出（例如，Mac上為`/dev/tty.usbmodem575E0031751`，或Linux上可能為`/dev/ttyACM0`）：

```bash
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

識別Follower機械臂端口時的範例輸出（例如，`/dev/tty.usbmodem575E0032081`，或Linux上可能為`/dev/ttyACM1`）：

```bash
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

請記得拔出USB接頭，否則它不會檢測到端口。

#### 3. 疑難排解

在Linux上，您需要透過執行以下命令授予對USB端口的訪問權限：

```bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### 校準機械臂

接下來，您需要為您的SO-10x機器人接通電源和資料線進行校準，以確保當在相同的實體位置時，Leader和Follower機械臂的位置資訊一致。這個校準過程至關重要，因為它允許在一個SO-10x機器人上訓練的類神經網路在另一個機器人上工作。如果需要重新校準機械臂，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或`~/.cache/huggingface/lerobot/calibration/teleoperators`下的檔案並重新校準機械臂，否則會出現錯誤提示。校準的機械臂資訊將儲存到該目錄下的json檔案中。

#### 1. Follower機械臂的手動校準

請透過3針介面連接6個機器人舵機的介面，並將底盤舵機連接到舵機驅動板，然後執行以下命令或API範例來校準機械臂：

以PC（Linux）和Jetson板卡為例，第一個插入USB介面的將映射為`ttyACM0`，第二個插入USB介面的將映射為`ttyACM1`。

請注意Leader和Follower的映射介面，然後再執行程式碼。

#### 2. 端口授權

首先，您需要授予端口權限，執行以下命令：

```bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. 然後校準Follower機械臂

接下來，透過執行以下Python命令來校準從動臂：

```python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

首先，您需要將機器人移動到所有關節都在其可移動範圍中間的位置，並保持機械臂不動。然後，在按Enter鍵後，您必須將每個關節在其完整可移動範圍內移動，校準檔案會記錄可移動範圍的中值、最大值和最小值，並儲存到`~/.cache/huggingface/lerobot/calibration/robots`或`~/.cache/huggingface/lerobot/calibration/teleoperators`目錄下的json檔案中。

#### 4. 校準Leader機械臂

校準主機械臂的步驟與上述相同，請執行以下命令或API範例：

```python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

### 遙控操作

#### 1. 簡單遙控操作

然後，您可以準備好遙控您的機器人了！執行這個簡單的腳本（它不會連接和顯示攝像頭）：

請注意，與機器人關聯的ID用於儲存校準檔案。使用相同設定進行遙控操作、記錄和評估時，使用相同的ID至關重要。

首先為序列埠授權：

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

遙控操作命令會自動執行以下步驟：

1. 識別任何缺失的校準檔案並啟動校準過程
2. 連接機器人和遙控設備並開始遙控操作

#### 2. 帶攝像頭顯示的遙控操作

為了實例化攝像頭，您需要一個攝像頭識別碼。這個識別碼可能會在您重啟電腦或重新插拔攝像頭時發生變化，主要取決於您的作業系統。

要查找連接到您系統的攝像頭的攝像頭索引，請執行以下腳本：

```python
lerobot-find-cameras opencv  # 或者realsense用於Intel RealSense攝像頭
```

終端會打印相關攝像頭資訊。

您可以在`~/lerobot/outputs/captured_images`目錄中找到每個攝像頭拍攝的圖片。

在macOS上使用Intel RealSense攝像頭時，您可能會遇到錯誤「Error finding RealSense cameras: failed to set power state」。這可以透過使用sudo特權執行相同命令來解決。請注意，在macOS上使用RealSense攝像頭是不穩定的。

之後，您可以在遙控操作時在電腦上顯示攝像頭畫面，只需執行以下程式碼即可。這對於在錄製第一個資料集之前準備您的設定非常有用。

```python
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

「fourcc: "MJPG"」格式的圖像是經過壓縮的，您可以嘗試更高的解析度，當然您也可以嘗試「YUYV」格式的圖像，但這會導致圖像解析度和FPS下降，導致機械臂運行卡頓。目前「MJPG」格式支持3個攝像頭在「1920*1080」解析度下運行並保持「30FPS」，但仍然不建議2個攝像頭透過同一個USB集線器連接到主機。

如果您有更多攝像頭，可以透過更改--robot.cameras參數來新增它們。您應該注意index_or_path的格式，這是由python -m lerobot.find_cameras opencv命令輸出的攝像頭ID的最後一位數字確定的。

例如，如果您想新增一個攝像頭：

```python
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

如果您想新增RealSense深度攝像頭，先執行python -m lerobot.find_cameras realsense來獲取ID，並將此命令中robot.cameras參數的serial_number_or_name: "323622271780"替換為您自己的深度攝像頭ID，以及use_depth: true以啟用深度串流：

```python
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

## D. 資料收集

### 記錄一個資料集

- 如果您想將資料集儲存到本地，您可以直接執行：

```python
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

其中，「dataset.repo_id」和「dataset.single_task」可以自訂，「push_to_hub=false」，最後資料集將會儲存在「~/.cache/huggingface/lerobot」並建立上述「juxi/test」資料夾，[如果使用RealSense深度攝像頭，您可以自行參考並修改執行命令](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- 如果您想使用Hugging Face Hub功能來上傳您的資料集，並且您之前尚未這樣做，請確保使用具有寫入權限的權杖登入，該權杖可以從[Hugging Face設定](https://huggingface.co/settings/tokens)中產生：

```bash
hf auth login
```

將您的Hugging Face儲存庫名稱儲存在一個變數中以執行以下命令：

```bash
hf auth whoami
```

記錄5個情節並將您的資料集上傳到Hub：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
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

您會看到類似如下的資訊：

```bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead:5.06 (197.5hz) dtWfoll:0.25 (3963.7hz) dtRfoll:6.22 (160.7hz) dtRlaptop:32.57 (30.7hz) dtRphone:33.84 (29.5hz)
```

**參數說明**

- episode_time_s: 表示每次收集資料的時間
- reset_time_s: 是每次資料收集之間的準備時間
- num_episodes: 表示預期收集多少組資料
- push_to_hub: 決定是否將資料上傳到HuggingFace Hub

| 按鍵     | 動作                                   |
| -------- | -------------------------------------- |
| 右箭頭 → | 提前終止目前情節/重置，進入下一個 |
| 左箭頭 ← | 取消目前情節，重新錄製 |
| ESC | 立即停止會話，編碼視頻，並上傳資料集 |

**資料收集技巧**

- **任務建議**: 在不同位置抓取物體並將它們放進箱子中
- **規模**: 記錄≥50個情節（每個位置10個情節）
- **一致性**:
  - 保持攝像頭固定
  - 保持相同的抓取行為
  - 確保操作的物體在攝像頭畫面中可見
- **逐步推進**:
  - 先從可靠的抓取開始，然後再新增變化（新位置、抓取技巧、攝像頭調整）
  - 避免複雜性急劇增加，以防止失敗

💡 **經驗法則**: 只使用攝像頭畫面作為指導，僅根據螢幕反饋的視頻圖像來控制機械臂完成任務。

如果您想深入了解這個重要主題，請查看我們撰寫的關於什麼是好的資料集的[部落格文章](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)。

- 在以下章節中，您將訓練您的類神經網路。在實現可靠的抓取效能後，您可以在資料收集過程中引入更多變化，例如增加抓取位置、不同的抓取技巧以及改變相機位置。
- 避免快速新增過多變化，因為這可能會阻礙您的結果。

- 「如果您希望將資料儲存到本地（--dataset.push_to_hub=false），請將--dataset.repo_id替換為自訂的本地資料夾名稱，例如juxi/so101_test。資料將會儲存在系統主目錄下的~/.cache/huggingface/lerobot。」
- 如果您透過--dataset.push_to_hub=true將資料集上傳到Hugging Face Hub，您可以透過線上視覺化您的資料集，只需複製貼上您的repo id即可。
- 在情節記錄過程中任何時候按右箭頭→可以提前停止並進入重置狀態。重置過程中同樣可以提前停止並進入記錄下一個情節。
- 在錄製或重置到早期階段隨時按左箭頭←可以提前停止目前情節並重新錄製。
- 在錄製過程中隨時按ESC可以提前結束會話，直接進入視頻編碼和資料集上傳。
- 您可以透過重新執行相同命令並新增--resume=true來恢復錄製。⚠️ **重要**: 在恢復時，需要將--dataset.num_episodes設定為要額外記錄的情節數量（而不是資料集中目標的總情節數量）。如果您想從頭開始錄製，請手動刪除資料集目錄。
- 在Linux上，如果左右箭頭鍵和Esc鍵在資料記錄期間沒有反應，請確保您已設定$DISPLAY環境變數。參見[pynput限制](https://pynput.readthedocs.io/en/latest/limitations.html#linux)。

如果您的鍵盤按下後沒有反應，可能需要降低pynput版本，例如安裝1.6.8版本：

```bash
pip install pynput==1.6.8
```

### 視覺化一個資料集（可以跳過，也可以嘗試）

```bash
echo ${HF_USER}/so101_test
```

如果您沒有使用--dataset.push_to_hub=false並上傳了資料，您也可以透過以下命令在本地進行視覺化：

```python
lerobot-dataset-viz \
    --repo-id ${HF_USER}/so101_test
```

如果您使用了--dataset.push_to_hub=false並且沒有上傳資料，您也可以透過以下命令在本地進行視覺化：

```python
lerobot-dataset-viz \
    --repo-id juxi/test
```

這裡的「juxi」是資料收集時自訂的repo id名稱。

### 回放一個片段（可以跳過，也可以嘗試）

現在，嘗試在您的機器人上回放第一個資料集：

```python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

此時，機械臂應該會做出與您遙控錄製時相同的動作。

## E. 資料集訓練和評估

### ACT

參考官方教程[ACT](https://huggingface.co/docs/lerobot/act)

**訓練**

要訓練一個控制您機器人的策略，請使用`python -m lerobot.scripts.train`腳本。需要幾個參數。以下是一個範例命令：

```python
lerobot-train \
    --dataset.repo_id=${HF_USER}/so101_test \
    --policy.type=act \
    --output_dir=outputs/train/act_so101_test \
    --job_name=act_so101_test \
    --policy.device=cuda \
    --wandb.enable=false \
    --steps=300000
```

**如果您想在本地資料集上進行訓練，請確保repo_id與資料收集時使用的名稱匹配，並新增--policy.push_to_hub=false。**

```python
lerobot-train \
    --dataset.repo_id=juxi/test \
    --policy.type=act \
    --output_dir=outputs/train/act_so101_test \
    --job_name=act_so101_test \
    --policy.device=cuda \
    --wandb.enable=false \
    --policy.push_to_hub=false \
    --steps=300000
```

**命令說明**

- **資料集指定**: 我們透過--dataset.repo_id=${HF_USER}/so101_test參數提供了資料集
- **訓練步數**: 我們透過--steps=300000修改了訓練步數。演算法預設值為800000，根據您自己任務的難易度，觀察訓練期間的損失來進行調整
- **策略類型**: 我們使用policy.type=act提供了策略，同樣您可以替換為[act, diffusion, pi0, pi0fast, pi0.5, sac, smolvla]和其他策略，這將從configuration_act.py載入設定。重要的是，這個策略會自動適應您機器人（例如laptop和phone）的馬達狀態、馬達動作和攝像頭數量，這些資訊已經儲存在您的資料集中
- **設備選擇**: 我們提供了policy.device=cuda，因為我們正在Nvidia GPU上進行訓練，但您可以使用policy.device=mps在Apple Silicon上進行訓練
- **視覺化工具**: 我們提供了wandb.enable=true來使用[Weights and Biases](https://docs.wandb.ai/quickstart)可視化訓練圖表。這是選擇性的，但如果您使用它，請確保已透過執行wandb login登入

如果您遇到以下錯誤：

嘗試執行以下命令來解決它：

```bash
pip install datasets==2.19
```

訓練可能需要幾個小時。您將會在outputs/train/act_so101_test/checkpoints目錄中找到訓練結果權重檔案。

要從某個訓練結果權重檔案恢復訓練，以下是一個從act_so101_test策略的最後一個訓練結果權重檔案恢復訓練的範例命令：

```bash
lerobot-train \
    --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
    --resume=true
```

**評估**

您可以使用lerobot/record.py中的record功能，但需要將策略訓練結果權重檔案作為輸入。例如，執行以下命令記錄10個評估情節：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
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
    --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model \
    --dataset.push_to_hub=false
```

1. `--policy.path`參數指示您策略訓練結果權重檔案的路徑（例如outputs/train/act_so101_test/checkpoints/last/pretrained_model）。如果您將模型訓練結果權重檔案上傳到Hub，您也可以使用模型儲存庫（例如${HF_USER}/act_so101_test）
2. 資料集名稱dataset.repo_id以eval_開頭，這會在您評估時為您單獨錄製評估時的視頻和資料，儲存到以eval_開頭的資料夾中，例如juxi/eval_test123
3. 如果在評估階段遇到File exists: home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx，請先刪除以eval_開頭的資料夾，然後再次執行程式
4. 當遇到mean is infinity. You should either initialize with stats as an argument or use a pretrained model時，請注意--robot.cameras參數中的front和side等關鍵字必須與資料收集時嚴格一致

### Smolvla

參考官方教程[SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```bash
pip install -e ".[smolvla]"
```

**訓練**

```bash
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

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.repo_id=juxi/eval_test123 \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30 \
    --dataset.num_episodes=5 \
    --policy.path=${HF_USER}/FINETUNE_MODEL_NAME
```

### Pi0

參考官方教程[Pi0](https://huggingface.co/docs/lerobot/pi0)

```bash
pip install -e ".[pi]"
```

**訓練**

```bash
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

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --robot.id=my_awesome_follower_arm \
    --display_data=false \
    --dataset.repo_id=juxi/eval_test123 \
    --dataset.single_task="Put the blue cube on the black box" \
    --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

參考官方教程[Pi0.5](https://huggingface.co/docs/lerobot/pi0.5)

```bash
pip install -e ".[pi]"
```

**訓練**

```bash
lerobot-train \
    --dataset.repo_id=juxi/eval_test123 \
    --policy.type=pi0.5 \
    --output_dir=outputs/pi0.5_training \
    --job_name=pi0.5_training \
    --policy.pretrained_path=lerobot/pi0.5_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch_size=32
```

**驗證**

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
    --robot.id=my_awesome_follower_arm \
    --display_data=false \
    --dataset.repo_id=juxi/eval_test123 \
    --dataset.single_task="Put the blue cube on the black box" \
    --policy.path=outputs/pi0.5_training/checkpoints/last/pretrained_model
```

### GR00T N1.5

請參考官方教程[GR00T N1.5](https://huggingface.co/docs/lerobot/groot)

## F. 常見問題

如果您使用本文件教程，請git clone本文件推薦的GitHub儲存庫https://github.com/Juxi-Technology/lerobot.git。

本文件推薦的儲存庫是經過驗證的穩定版本，而LeRobot官方儲存庫是即時更新的最新版本，這可能會有一些無法預測的問題，例如不同的資料集版本、不同的命令等。

- [如果使用RealSense深度攝像頭，您可以自行參考並修改執行命令](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- 在Jetson設備上，執行評估命令後未設定情節數量和情節時間，您只能透過ctrl+z中斷程序，這會導致機械臂和攝像頭斷線，重新連線後所有端口都會改變

在命令中新增評估情節數量和情節時間的參數，例如：

```python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: \"MJPG\"}}" \
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
    --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model \
    --dataset.push_to_hub=false
```

- 如果在校準舵機ID時遇到

```bash
Motor 'gripper' was not found, Make sure it is connected
```

請仔細檢查通訊線是否與舵機正常連接，電源是否以正確電壓供電。

- 如果遇到

```bash
Could not connect on port "/dev/ttyACM0"
```

並且透過`ls /dev/ttyACM*`可以看到ACM0存在，這表示您忘記給序列埠權限了。只需在終端中輸入`sudo chmod 666 /dev/ttyACM*`即可。

- 如果遇到

```bash
No valid stream found in input file. Is -1 of the desired media type?
```

請安裝ffmpeg 7.1.1，`conda install ffmpeg=7.1.1 -c conda-forge`。

- 如果遇到

```bash
ConnectionError: Failed to sync read 'Present Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

需要檢查對應端口號的機械臂是否接通電源，總線舵機的資料線是否鬆動或脫落，哪個舵機燈不亮就表示前面那個舵機的線鬆了。

- 如果在機械臂校準期間遇到

```bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

給機械臂重新斷電和通電，並再次嘗試校準機械臂。如果在校準期間MAX角度達到數萬，您也可以使用這個方法。如果這不行，您需要對相應的舵機進行重新舵機校準，即中位校準和ID寫入。

- 如果在評估階段遇到

```bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

請先刪除以eval_開頭的資料夾，然後再次執行程式。

- 如果在評估階段遇到

```bash
'mean' is infinity. You should either initialize with stats as an argument or use a pretrained model
```

請注意--robot.cameras參數中的front和side等關鍵字必須與資料收集時嚴格一致。

- 如果您維修或更換過機械臂零件，請完全刪除`~/.cache/huggingface/lerobot/calibration/robots`或`~/.cache/huggingface/lerobot/calibration/teleoperators`下的檔案並重新校準機械臂，否則會出現錯誤提示。校準的機械臂資訊將會儲存在該目錄下的json檔案中。
- 在3060的8G筆記型電腦上訓練ACT的50組資料大約需要6小時，在4090和A100的電腦上訓練50組資料大約需要2-3小時。
- 在資料收集過程中，請確保攝像頭位置和角度以及環境光線穩定，並減少攝像頭收集到過多不穩定的背景和行人。否則，部署環境的過度變化會導致機械臂無法正常抓取。
- 請確保使用資料收集命令中的num_episodes收集足夠的資料。請勿中途手動暫停，因為資料均值和變異數計算只會在資料收集結束後進行，這在訓練期間是必需的。
- 如果程式提示無法讀取USB攝像頭圖像資料，請確保USB攝像頭不是連接到集線器上的。USB攝像頭必須直接連接到設備，以確保快速的圖像傳輸速率。

如果您遇到無法解決的軟體問題或環境依賴問題，除了查看本教程末尾的常見問題部分，請及時在[LeRobot平台](https://github.com/huggingface/lerobot)或[LeRobot Discord頻道](https://discord.gg/8TnwDdjFGU)回報問題。

## Windows查找舵機（飛特舵機上位機除錯軟體）

為了進行除錯，任何Windows PC都可以透過USB連接來對舵機進行程式設計、除錯或測試。為此，請下載[Feetech軟體](https://www.feetechrc.com/software.html)。對於Ubuntu系統，您可以使用[FT_SCServo_Debug_Qt工具](https://github.com/Kotakku/FT_SCServo_Debug_Qt)。

選擇端口號，將波特率設定為1000000，打開，並點擊「Search」。

## ROS2模擬控制（可以自行實現）

https://github.com/holmesslk/so-arm-moveit-hardware

## 網頁端設定舵機ID和中位校準

https://bambot.org/feetech.js?lang=zh

1. 根據舵機型號輸入0或1，點擊「Connect」
2. 掃描ID 1-6的舵機，可以根據掃描結果中的FOUND確認對應ID的舵機。例如，圖片中掃描到了舵機ID 1
3. ID設定和中位校準
   - 當前舵機ID輸入是被掃描到的舵機ID
   - 在ID管理中輸入數字，點擊「Change ID」來設定ID
   - 中位校準（STS3215舵機中位是2047，SCS0009舵機中位是511）
   - STS舵機：在位置控制中輸入2047，並點擊「Set」
   - SCS舵機：在位置控制中輸入511，並點擊「Set」
