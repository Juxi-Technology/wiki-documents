# Lekiwi移動機器人用戶指南

黑色主動臂使用5V 6A電源適配器，白色被動臂使用12V 5A電源適配器

[lerobot-Lekiwi.zip]

本教程庫中的代碼保持在2026年3月1日之前測試的Lerobot穩定版，目前Huggingface對Lerobot進行了非常大幅度的升級，增加了大量新功能，如需體驗最新教程，請跟隨[官方留檔進行操作](https://huggingface.co/docs/lerobot/lekiwi)。



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)是由[SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC)發起的完全開源的機器人汽車項目，包含詳細的3D打印文件和操作指南，旨在兼容[LeRobot](https://github.com/huggingface/lerobot/tree/main)模仿學習框架，支持SO101機械臂，從而實現完整的模仿學習過程。

[*在Fusion360 在線 CAD*](https://a360.co/4k1P8yO)*中可以可視化精確的組件位置。*

[URDF文件](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

在線URDF預覽 https://urdf.d-robotics.cc/

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

## 主要特點

1. **開源和低成本**：[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)提供了一個開源、低成本的機器人汽車解決方案。

2. **與LeRobot集成**：專爲與[LeRobot平臺](https://github.com/huggingface/lerobot)集成而設計。

3. **豐富學習資源**：提供全面的開源學習資源，包括組裝和校準指南，以及測試、數據採集、培訓、部署教程，幫助用戶快速上手開發機器人應用。

4. **與Nvidia兼容**：可與reComputer Mini J4012 Orin NX 16 GB結合使用。

5. **多場景應用**：適用於教育、科研、自動化生產、機器人領域，幫助用戶在各種複雜任務中實現高效精準的機器人操作。

JUXI僅對硬件本身質量負責，教程嚴格按照官方留檔更新，如遇到軟件問題或環境依賴問題確實無法解決，請及時向[樂機器人平臺](https://github.com/huggingface/lerobot)或[樂機器人不和頻道](https://discord.gg/8TnwDdjFGU)反映問題。

**注意**

- Lekiwi機箱中的所有伺服都需要12V電源。對於使用5V機械臂的用戶，我們提供12V至5V降壓轉換模塊。請注意，您需要自己修改電路。

- 12V電源-如果需要，您可以在結賬時選擇此選項。如果您已經有12V電源，只需將電源輸出接口轉換爲5521 DC插頭即可。

- Raspberry Pi控制器和攝像頭——這些需要通過訂單界面單獨購買。

## 物料清單（BOM）

## 初始系統環境

**對於Ubuntu x86：**

- Ubuntu 22.04

- CUDA 12+

- Python 3.10

- Torch 2.6

**對於Jetson Orin：**

- Jetson JetPack 6.0

- Python 3.10

- Torch 2.3+

**對於樹莓派：**

- 樹莓派5 4G~16G

### 設置SSH

設置樹莓派後，您應該啓用並配置[SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/)（安全外殼協議），這樣您就可以從筆記本電腦登錄樹莓派，而無需將屏幕、鍵盤和鼠標連接到樹莓派。您可以在[這裏找到一個很棒的教程](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)。您可以通過命令提示符（cmd）登錄樹莓派，或者如果您使用VSCode，則可以使用[此](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)擴展。

## 3D打印指南

### 組件

我們爲以下3D打印零件提供可打印的STL文件。這些零件可以使用通用PLA燈絲在消費級FDM打印機上打印。我們在Bambu Lab P1S打印機上對它們進行了測試。對於所有組件，我們只需將它們加載到Bambuslicer中，自動旋轉和排列它們，啓用任何推薦的支撐，然後進行打印。

### 打印參數

提供的STL文件可以直接打印在許多FDM打印機上。以下是經過測試和推薦的設置；其他設置也可能有效。

- 材質：PLA+

- 噴嘴直徑及精度：噴嘴直徑0.2mm，層高0.2mm

- 填充密度：15%

- 打印速度：150毫米/秒

- 如有必要，將G代碼（切片文件）上傳到打印機並打印

# 安裝LeRobot

在您的樹莓派上：

### 1.[安裝Minicon da](https://docs.anaconda.com/miniconda/install/#quick-command-line-install)：

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2.重啓Shell

在Shell中複製並粘貼以下命令：`source~/. bashrc`或Mac用戶：`source~/.bash_profile`或`source~/.zshrc`（如果您使用的是zshell）

### 3.爲LeRobot創建和激活一個新的Conda環境

```Python
conda create -y -n lerobot python=3.10
```

然後激活您的Conda環境（每次打開Shell以使用LeRobot時都需要這樣做！）：

```Bash
conda activate lerobot
```

### 4.克隆LeRobot：

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5.在您的環境中安裝ffmpeg：

使用`minicon da`時，在您的環境中安裝`ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

這通常會爲您的平臺安裝使用libsvtav1編碼器編譯的ffmpeg 7. X。如果不支持libsvtav1（您可以通過`ffmpeg-編碼器`檢查支持的編碼器），您可以：

[適用於所有平臺]顯式安裝ffmpeg 7. X：

`安裝ffmpeg=7.1.1-c conda-forge`

[僅Linux]安裝ffmpeg的構建依賴項並從源代碼編譯支持libsvtav1的ffmpeg，並確保使用的ffmpeg可執行文件是正確的，這可以通過`哪個ffmpeg`來確認。

如果遇到以下錯誤，也可以使用上述命令解決。

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

### 6.安裝具有feetech電機依賴項的LeRobot：

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

## C.在筆記本電腦上安裝LeRobot

如果您已經在筆記本電腦上安裝了LeRobot，則可以跳過此步驟；否則，請按照我們在Raspberry Pi上所做的相同步驟**進行操作**。

> [！提示]我們會經常使用命令提示符（cmd），如果你對使用cmd不熟悉或者想複習一下命令行的使用方法，可以參考這個：[命令行速成教程](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 
> 

在您的計算機上：

### 1.[安裝Minicon da](https://docs.anaconda.com/miniconda/install/#quick-command-line-install)：

### 2.重啓Shell

在shell中複製並粘貼以下命令：`source~/. bashrc`或Mac用戶：`source~/.bash_profile`或`source~/.zshrc`（如果您使用的是zshell）

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

### 3.爲LeRobot創建和激活一個新的Conda環境

```Bash
conda create *-y* *-n* lerobot *python*=3.10
```

然後激活您的Conda環境（每次打開Shell以使用LeRobot時都需要這樣做！）：

```Bash
conda activate lerobot
```

### 4.克隆LeRobot：

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5.在您的環境中安裝ffmpeg：

使用`minicon da`時，在您的環境中安裝`ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

這通常會爲您的平臺安裝使用libsvtav1編碼器編譯的ffmpeg 7. X。如果不支持libsvtav1（您可以通過`ffmpeg-編碼器`檢查支持的編碼器），您可以：

[適用於所有平臺]顯式安裝ffmpeg 7. X：

`安裝ffmpeg=7.1.1-c conda-forge`

[僅Linux]安裝ffmpeg的構建依賴項並從源代碼編譯支持libsvtav1的ffmpeg，並確保使用的ffmpeg可執行文件是正確的，這可以通過`哪個ffmpeg`來確認。

如果遇到以下錯誤，也可以使用上述命令解決。

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### 6.安裝具有feetech電機依賴項的LeRobot：

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# 配置電機

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

### **1.找到與機械臂關聯的USB端口**

要爲單個電機找到正確的端口，請運行以下實用程序腳本兩次：

```Bash
lerobot-find-port
```

示例輸出（例如，Mac上的`/dev/tty.usbmodem575E0031751`或Linux上的`/dev/ttyACM0`）：

示例輸出（例如，Mac上的`/dev/tty.usbmodem575E0032081`或Linux上的`/dev/ttyACM1`）：

故障排除：在Linux，您可能需要通過以下命令授予USB端口訪問權限：

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2.配置您的電機（成品可以跳過此步驟）**

按順序插入機箱的每個電機並運行以下腳本。它將首先初始化機械臂的伺服系統（ID 6…1），然後初始化機箱伺服系統，將它們的ID設置爲（ID 9…7）。如果您已經校準了機械臂，您可以連續按Enter覆蓋並跳過：

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 3.設置HuggingFace國內鏡像

- 烏班圖

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

- 麥克

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

#### ①創建代幣

https://huggingface.co/settings/tokens

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ②記錄令牌

例如，我的是：

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③綁定Token

```Shell
hf auth login

hf auth whoami
```

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### 創建數據集回購

**記錄Owner和Dateset名稱，這是後面需要的\<hf_username\>和\<dateset_repo_id\>**

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 4.更新配置！！！

LeKiwi LeRobot和筆記本電腦上的配置文件應該是一致的。首先，我們需要找到移動機械臂的樹莓派的**IP地址**。這是用於SSH的相同IP地址。我們還需要找到筆記本電腦上有源臂伺服驅動板的**USB端口**和**LeKiwi上伺服驅動板的端口**。這些端口可以通過以下腳本找到。

在Linux，您可能需要通過運行以下命令來授予對USB端口的訪問權限：

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

重要提示：現在您已經獲得了活動臂的端口號和Lekiwi機械臂的IP地址，請在網絡配置中更新**ip**，在活動臂配置中更新**端口**，在LeKiwi配置中更新**端口，remote_ip**。

修改example\\lekiwi目錄下的這四個文件

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

#### ①修改teleoperate.py

remote_ip：樹莓派的IP地址

端口：活動臂連接到計算機或Linux時的端口號

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### 修改record.py

[HF_REPO_ID：擁抱臉上的用戶名和數據集名稱](https://juxitech.feishu.cn/docx/ML3KdzbJAogL4UxJnbXcThVkngg?fromScene=spaceOverview#doxcnbVewyqzNCN91akCqNmlwld)

remote_ip：樹莓派的IP地址

端口：活動臂連接到計算機或Linux時的端口號

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### 修改replay.py

remote_ip：樹莓派的IP地址

\<hf_username\>/\<dataset_repo_id\>，即[擁抱臉的用戶名和數據集名稱](https://juxitech.feishu.cn/docx/ML3KdzbJAogL4UxJnbXcThVkngg?fromScene=spaceOverview#doxcnbVewyqzNCN91akCqNmlwld)

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

## 校準

現在我們需要校準主動臂和被動臂。全向輪的舵機不需要校準。

### 校準從動臂（安裝在Lekiwi底座上）

在您的計算機上運行以下命令以校準活動臂。注意：此處顯示的圖像是SO101模型的示例。

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

現在在Raspberry Pi上運行以下命令來校準LeKiwi上的從屬臂。忽略它在桌子上的當前位置-安裝在Lekiwi機箱上時應執行正常校準。

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

我們統一了大多數機器人的校準方法。首先，我們需要將機器人移動到每個關節都在其**可移動範圍的中點的位置，然後按下按鈕。其次，我們移動所有關節通過其**。您可以[在此處找到](https://huggingface.co/docs/lerobot/en/so101#calibration-video)`輸入`SO101相同校準過程的視頻作爲參考。

# F.遠程操作

打開新的蟒蛇提示

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> 如果您使用的是Mac，您可能需要授予“終端”權限才能訪問鍵盤進行遠程操作。請轉到“系統偏好設置”\>“安全和隱私”\>“輸入監控”，然後選中“終端”複選框。
> 
> 

要執行遠程操作，請通過SSH登錄您的Raspberry Pi並運行以下命令來激活`環境conda激活lerobot`，然後運行以下腳本：

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

接下來，在您的筆記本電腦上，也運行以下命令來激活環境`conda激活lerobot`，然後運行以下腳本：

```Bash
python examples/lekiwi/teleoperate.py
```

您的筆記本電腦屏幕應該顯示類似於這樣的界面：`[INFO]在tcp://172.17.133.91:5555連接到遠程機器人，在tcp://172.17.133.91:5556連接到視頻流。`現在您可以移動控制臂，使用鍵盤上的（W、A、S、D）鍵控制機器人前進、左轉、後退和右轉。使用（Z、X）鍵控制機器人左轉或右轉。使用（R、F）鍵增加或降低移動機器人的速度。一共有三種速度模式，請參考下表：

如果您使用不同的鍵盤，您可以更改[`LeKiwiClientConfig中`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) 每個命令的鍵設置。

## 通信故障排除

如果您在連接移動機器人SO101時遇到問題，請按照以下步驟診斷和解決問題。

### 1.驗證IP地址配置

確保在配置文件中設置了正確的Raspberry Pi IP地址。要檢查Raspberry Pi的IP地址，請運行以下命令（在Pi的命令行中）：

```Bash
hostname *-I*
```

### 2.檢查筆記本電腦/PC是否可以訪問Pi

嘗試從筆記本電腦ping Raspberry Pi：

```Bash
ping <your_pi_ip_address>
```

如果ping失敗：

- 確保Pi已通電並連接到同一網絡。

- 檢查SSH是否在Pi上啓用。

### 3.嘗試SSH連接

如果您無法通過SSH登錄Pi，可能是由於連接不正確。請使用以下命令：

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

例如`sshpi@192.168.0.106`

如果發生連接錯誤：

- 要確保在Pi上啓用SSH，可以運行以下命令：

```Bash
sudo raspi-config
```

- 然後導航到：**接口選項-\>SSH**並啓用它。

### 4.配置文件一致性！！！

確保筆記本電腦/PC和Raspberry Pi上的配置文件完全相同。

# G.記錄數據集

熟悉遠程操作後，您可以使用LeKiwi記錄您的第一個數據集。

要在LeKiwi上啓動程序，請通過SSH連接到Raspberry Pi並運行以下命令來激活環境並啓動腳本：

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

如果您希望使用擁抱臉集線器功能上傳數據集，但之前沒有登錄，請確保您使用具有寫入權限的令牌登錄，該令牌可以從[擁抱臉設置](https://huggingface.co/settings/tokens)中生成：

```Bash
hf auth login
```

將您的擁抱臉存儲庫名稱存儲在一個變量中以運行以下命令：

```Bash
*hf auth whoami*
```

然後在您的筆記本電腦上運行以下命令以記錄2輪並將數據集上傳到集線器：

```Bash
python examples/lekiwi/record.py
```

# H.可視化數據集

如果您已經上傳了數據集，您可以[在線可視化您的數據集](https://huggingface.co/spaces/lerobot/visualize_dataset)，並複製和粘貼由以下命令生成的存儲庫ID：

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

如果您沒有上傳數據集，您也可以在本地執行可視化（瀏覽器窗口可以通過`http://127.0.0.1:9090` 打開可視化工具）：

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### 可視化數據集（可選，可以嘗試）

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

如果您已經上傳了數據集，您還可以使用以下命令在本地可視化它：

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

如果您尚未上傳數據集，您還可以使用以下命令在本地可視化它：

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

在這裏，`聚喜`是數據採集時的自定義`repo_id`名稱。



#### 數據收集技術

一旦你熟悉了數據記錄，你就可以創建更大的數據集進行訓練。一個好的開始任務是從不同的位置抓取物體並將其放入容器中。我們建議至少錄製50個片段，每個位置有10個片段。保持攝像機位置固定，並在整個錄製過程中保持一致的抓取動作。此外，確保您正在操縱的對象在攝像機框架中清晰可見。一個簡單的標準是，您應該能夠通過觀察攝像機饋送來完成此任務。

在接下來的章節中，您將訓練您的神經網絡。在獲得可靠的抓取性能後，您可以在數據採集過程中開始引入更多變化，例如增加抓取位置、採用不同的抓取技術以及改變相機位置。

避免太快添加太多更改，因爲這可能會影響您的結果。

如果你想更深入地研究這個重要的話題，請查看我們關於什麼是偉大的數據集的博客文章[。](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### 故障排除：

在Linux系統中，如果左右箭頭鍵和Esc鍵在數據採集過程中不起作用，請確保設置了`$DISPLAY`環境變量。請參閱[pynput的限制](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

# 一、回放一輪

現在嘗試在您的機器人上重播第一輪：

```Bash
python examples/lekiwi/replay.py
```

恭喜🎉，您的機器人已準備好進行自主學習任務。請按照本教程的訓練部分開始訓練它：[真實世界機器人簡介](https://huggingface.co/docs/lerobot/il_robots)

## K.評估您的策略

確保更改remote_ip、端口和HF_MODEL_ID

#### 修改evaluate.py

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>"應該修改爲訓練後上傳到HugingFace的數據集的名稱（如果上傳到HugingFace）或者訓練後在本地導出模型的目錄

HF_DATASET_ID="\<hf_username\>/\<eval_dataset_id\>"更改您創建的用戶名和eval_數據集名稱

remote_ip：樹莓派IP地址

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

然後運行以下命令：

```Bash
python examples/lekiwi/evaluate.py
```

1. 數據集的名稱以`eval`開頭，以反映您正在運行推理（例如，`${HF_USER}/eval_act_lekiwi_test`）。

2. 如果評估階段遇到`文件存在：'home/xxxx/. cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`請先刪除`以eval_開頭的文件夾`，然後再次運行程序。



模擬訓練可以參考

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## 幫助🙋

硬件問題，請聯繫客服。使用問題，請加入不和諧。

[LeRobot平臺](https://github.com/huggingface/lerobot)

[LeRobot不和頻道](https://discord.gg/8TnwDdjFGU)



