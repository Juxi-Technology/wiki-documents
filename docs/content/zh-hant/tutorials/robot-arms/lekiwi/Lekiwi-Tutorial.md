---
title: "Lekiwi 使用教程"
description: "Lekiwi 使用教程：物料清單、3D 列印、LeRobot 環境安裝與遙操作等完整使用說明與注意事項。"
---

# Lekiwi 使用教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

本教學倉庫程式碼保持為2026年10月1日之前的Lerobot經過測試的穩定版本，目前Huggingface對Lerobot進行了非常龐大的升級，增加了非常多的新功能，如果需要體驗最新的教學請跟隨[官方文件進行操作](https://huggingface.co/docs/lerobot/lekiwi)。



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) 是由 [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC) 發起的一個完全開源的機器人小車專案。它包含詳細的 3D 列印檔案和操作指南，設計上與 [LeRobot](https://github.com/huggingface/lerobot/tree/main) 模仿學習框架相容。它支援 SO101 機器人手臂，從而實現完整的模仿學習流程。

[*在Fusion360 線上 CAD*](https://a360.co/4k1P8yO)*中可以視覺化精確的元件位置。*

[URDF檔案](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

線上URDF預覽https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## 主要特點

1. **開源且低成本**： [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) 提供了一種開源、低成本的機器人小車解決方案。
2. **與 LeRobot 整合**： 專為與 [LeRobot 平台](https://github.com/huggingface/lerobot) 整合而設計。
3. **豐富的學習資源**： 提供全面的開源學習資源，包括組裝和校準指南，以及測試、資料收集、訓練和部署的教學，幫助使用者快速入門並開發機器人應用。
4. **相容 Nvidia**： 可與 reComputer Mini J4012 Orin NX 16 GB 搭配使用。
5. **多場景應用**： 適用於教育、科學研究、自動化生產和機器人領域，幫助使用者在各種複雜任務中實現高效且精準的機器人操作。

JUXI 僅對硬體本身的品質負責。教學嚴格按照官方文件更新。如果您遇到實在無法解決的軟體問題或環境依賴問題，請及時向 [LeRobot 平台](https://github.com/huggingface/lerobot) 或 [LeRobot Discord 頻道](https://discord.gg/8TnwDdjFGU) 回報問題。

**注意**
- Lekiwi 底盤中的所有伺服馬達需要 12V 電源供電。對於使用 5V 機器人手臂的使用者，我們提供了 12V 轉 5V 降壓轉換模組。請注意，您需要自行進行電路修改。
- 12V 電源 - 如果需要，您可以在結帳時選擇此選項。如果您已經擁有 12V 電源，只需將電源輸出接口轉換為 5521 DC 插頭即可。
- 樹莓派控制器和攝影機 - 這些需要透過訂單介面單獨購買。

## 物料清單 (BOM)


## 初始系統環境

**對於 Ubuntu x86:**

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**對於 Jetson Orin:**

- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**對於樹莓派:**

- 樹莓派5 4G\~16G

### 設定 SSH

設定好樹莓派後，您應該啟用並設定[SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/)（安全外殼協定），這樣您就可以從筆記型電腦登入到樹莓派，而無需在樹莓派上連接螢幕、鍵盤和滑鼠。您可以[在這裡](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)找到一個很棒的教學。您可以透過命令提示字元 (cmd) 登入到樹莓派，或者如果您使用 VSCode，則可以使用[此](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)擴充功能。

## 3D列印指南

### 部件

我們提供以下3D列印部件的可列印STL檔案。這些部件可以使用通用PLA耗材在消費級FDM印表機上列印。我們在Bambu Lab P1S印表機上進行了測試。對於所有元件，我們只需載入到bambuslicer中，自動旋轉和排列，啟用任何推薦的支撐，然後列印。


### 列印參數

提供的STL檔案可以在許多FDM印表機上直接列印。以下是測試和建議的設定，其他設定也可能有效。

- 材料：PLA+
- 噴嘴直徑和精度：0.2mm噴嘴直徑，層高0.2mm
- 填充密度：15%
- 列印速度：150 mm/s
- 如果需要，將G程式碼（切片檔案）上傳到印表機並列印

## A. 在樹莓派上安裝 LeRobot

在您的 Raspberry Pi 上：

### 1. [安裝 Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. 重新啟動 Shell

在您的 Shell 中複製貼上以下命令：`source ~/.bashrc` 或對於 Mac 使用者：`source ~/.bash_profile` 或 `source ~/.zshrc`（如果您使用的是 zshell）

### 3. 為 LeRobot 建立並啟用一個新的 Conda 環境

```Python
conda create -y -n lerobot python=3.10
```

然後啟用您的 Conda 環境（每次開啟 Shell 使用 LeRobot 時都需要執行此操作！）：

```Bash
conda activate lerobot
```

### 4. 複製 LeRobot：

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 在您的環境中安裝 ffmpeg：

使用 `miniconda` 時，在您的環境中安裝 `ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

這通常會為你的平台安裝使用 libsvtav1 編碼器編譯的 ffmpeg 7.X。如果不支援 libsvtav1（可以透過 `ffmpeg -encoders` 查看支援的編碼器），你可以：
【適用於所有平台】顯式安裝 ffmpeg 7.X：
`conda install ffmpeg=7.1.1 -c conda-forge`
【僅限 Linux】安裝 ffmpeg 的建置依賴並從原始碼編譯支援 libsvtav1 的 ffmpeg，並確保使用的 ffmpeg 執行檔是正確的，可以透過 `which ffmpeg` 確認。
如果你遇到以下報錯，也可以使用上述命令解決。

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. 安裝帶有 feetech 馬達依賴的 LeRobot：

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. 設定連接時間

`lerobot\src\lerobot\robots\lekiwi`目錄下找到config_lekiwi.py

 connection_time_s: int = 7200 # 也就是2小时

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. 在筆記型電腦上安裝 LeRobot

如果您已經在筆記型電腦上安裝了 LeRobot，可以跳過此步驟，否則請按照我們在 Raspberry Pi 上的**相同步驟**進行操作。

> [!提示] 我們會頻繁使用命令提示字元 (cmd)。如果您對使用 cmd 不熟悉，或者想複習命令列的使用，可以參考這裡：[命令列速成課程](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

在您的電腦上：

### 1. [安裝 Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

或者直接點這個連結下載安裝包

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## conda換源

```Shell
# 先清空原有源配置（避免冲突）
conda config --remove-key channels

# 将 conda 的默认源和常用第三方源替换为清华镜像
# 添加默认包源（main/r/msys2）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 添加常用第三方源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 开启显示下载源，安装包时会显示具体的下载地址
conda config --set show_channel_urls yes

# 清除索引缓存，使新源生效
conda clean -i

# 查看当前配置（验证源是否添加成功）
conda config --show-sources
```

### 2. 重新啟動 Shell

在您的 Shell 中複製貼上以下命令：`source ~/.bashrc` 或對於 Mac 使用者：`source ~/.bash_profile` 或 `source ~/.zshrc`（如果您使用的是 zshell）

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. 為 LeRobot 建立並啟用一個新的 Conda 環境

```Bash
conda create -y -n lerobot python=3.10
```

然後啟用您的 Conda 環境（每次開啟 Shell 使用 LeRobot 時都需要執行此操作！）：

```Bash
conda activate lerobot
```

### 4. 複製 LeRobot：

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 在您的環境中安裝 ffmpeg：

使用 `miniconda` 時，在您的環境中安裝 `ffmpeg`：

```PowerShell
conda install ffmpeg -c conda-forge
```

這通常會為你的平台安裝使用 libsvtav1 編碼器編譯的 ffmpeg 7.X。如果不支援 libsvtav1（可以透過 `ffmpeg -encoders` 查看支援的編碼器），你可以：
【適用於所有平台】顯式安裝 ffmpeg 7.X：
`conda install ffmpeg=7.1.1 -c conda-forge`
【僅限 Linux】安裝 ffmpeg 的建置依賴並從原始碼編譯支援 libsvtav1 的 ffmpeg，並確保使用的 ffmpeg 執行檔是正確的，可以透過 `which ffmpeg` 確認。
如果你遇到以下報錯，也可以使用上述命令解決。

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. 安裝帶有 feetech 馬達依賴的 LeRobot：

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. 設定馬達

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1.尋找與機械手臂相關聯的 USB 連接埠**

要找到單個馬達的正確連接埠，請執行以下實用指令碼兩次：

```Bash
lerobot-find-port
```

範例輸出（例如，在 Mac 上為 `/dev/tty.usbmodem575E0031751`，或在 Linux 上可能為 `/dev/ttyACM0`）：

範例輸出（例如，在 Mac 上為 `/dev/tty.usbmodem575E0032081`，或在 Linux 上可能為 `/dev/ttyACM1`）：

疑難排解：在 Linux 上，您可能需要透過以下命令授予 USB 連接埠存取權限：

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2.設定您的馬達（成品可跳過該步驟）**

依次插入您的底盤的每一個馬達並執行以下指令碼，他會先初始化機械手臂（ID 6..1）的伺服馬達，然後再初始化底盤伺服馬達，將其 ID 設定為（ID 9..7）的伺服馬達，如果你已經校準過機械手臂，可以連續按 Enter 不斷覆寫和跳過：

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3.設定HuggingFace國內鏡像

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

#### ①建立Token

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ②記錄Token

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③綁定Token

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④建立Dataset Repo

**記下Owner和Dateset name，即後續需要的<hf_username>和<dateset_repo_id>**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4.更新設定！！！

LeKiwi LeRobot 和筆記型電腦上的設定檔應保持一致。首先，我們需要找到移動機械手臂的樹莓派的 **IP 位址**。這與用於 SSH 的 IP 位址相同。我們還需要找到筆記型電腦上主動臂伺服馬達驅動板的 **USB 連接埠**以及 **LeKiWi 上伺服馬達驅動板的連接埠**。可以透過以下指令碼找到這些連接埠。

在 Linux 上，您可能需要透過執行以下命令來授予 USB 連接埠的存取權限：

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

重要提示：現在您已經獲得了主動臂的連接埠以及Lekiwi的機械手臂的 IP 位址，請在網路設定中更新 **ip**，在主動臂設定中更新 **port**，並在 LeKiWi 設定中更新 **port，remote_ip**。

在example\lekiwi目錄下修改這四個檔案

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ①修改teleoperate.py

remote_ip:樹莓派的ip位址

port:主動臂連接到電腦或者linux時的連接埠號

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ②修改record.py

HF_REPO_ID：[huggingface的使用者名稱和資料集名稱](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip:樹莓派的ip位址

port:主動臂連接到電腦或者linux時的連接埠號

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③修改replay.py

remote_ip:樹莓派的ip位址

<hf_username>/<dataset_repo_id>，即[huggingface的使用者名稱和資料集名稱](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D.校準

現在我們需要校準主動臂和從動臂。全向輪的伺服馬達無需校準。

### 校準從動臂（安裝在Lekiwi底座上）

在您的電腦上執行以下命令以校準主動臂。注意：這裡顯示的圖片是 SO101 型號的範例。

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

現在在您的 Raspberry Pi 上執行以下命令以校準 LeKiwi 上的從動臂。忽略它當前在桌上的位置——正常校準應在安裝到Lekiwi底盤上時進行。

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

我們統一了大多數機器人的標定方法。首先，我們需要將機器人移動到每個關節都處於其**可活動範圍中間**的位置，然後按下按鈕。其次，我們將所有關節在其**完整的可活動範圍內**移動一遍。您可以[在這裡](https://huggingface.co/docs/lerobot/en/so101#calibration-video)`Enter`找到SO101的相同標定過程影片作為參考。

## E. 遠端操作

開啟新的Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> 如果您使用的是 Mac，可能需要授予「終端機」存取鍵盤進行遠端操作的權限。請前往「系統偏好設定」>「安全性與隱私」>「輸入監視」，然後勾選「終端機」核取方塊。

要進行遠端操作，請透過 SSH 登入到您的 Raspberry Pi，並執行以下命令啟用環境 `conda activate lerobot`，然後執行以下指令碼：

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

接著，在您的筆記型電腦上，也執行以下命令啟用環境 `conda activate lerobot`，然後執行以下指令碼：

```Bash
python examples/lekiwi/teleoperate.py
```

你的筆記型電腦螢幕上應該會顯示類似這樣的介面：`[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`現在你可以移動控制臂，並使用鍵盤上的 (W, A, S, D) 鍵控制機器人前進、左轉、後退、右轉。使用 (Z, X) 鍵控制機器人左轉或右轉。使用 (R, F) 鍵可以增加或減少移動機器人的速度。共有三種速度模式，請參見下表：



如果您使用不同的鍵盤，您可以在[`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py)中更改每個命令的按鍵設定。

## 通訊疑難排解

如果您在連接移動機器人 SO101 時遇到問題，請按照以下步驟診斷並解決問題。

### 1.驗證 IP 位址設定

確保設定檔中設定了正確的 Raspberry Pi IP 位址。要檢查 Raspberry Pi 的 IP 位址，請執行以下命令（在 Pi 的命令列中）：

```Bash
hostname -I
```

### 2.檢查筆記型電腦/PC 是否能存取 Pi

嘗試從筆記型電腦 ping Raspberry Pi：

```Bash
ping <your_pi_ip_address>
```

如果 ping 失敗：

- 確保 Pi 已開機並連接到同一網路。
- 檢查 Pi 上是否啟用了 SSH。

### 3.嘗試 SSH 連接

如果無法透過 SSH 登入到 Pi，可能是連接不正確。請使用以下命令：

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

例如`ssh pi@192.168.0.106`

如果出現連接錯誤：

- 確保 Pi 上啟用了 SSH，可以執行以下命令：

```Bash
sudo raspi-config
```

- 然後導覽到：**Interfacing Options -> SSH** 並啟用它。

### 4.設定檔一致性！！！

確保筆記型電腦/PC 和 Raspberry Pi 上的設定檔完全一致。

## F. 記錄資料集

在熟悉遠端操作後，您可以使用 LeKiwi 記錄您的第一個資料集。

要在 LeKiwi 上啟動程式，請透過 SSH 連接到您的 Raspberry Pi，並執行以下命令以啟用環境並啟動指令碼：

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

如果您希望使用 Hugging Face hub 功能上傳資料集，並且之前尚未登入，請確保使用寫入權限的權杖登入，該權杖可以從 [Hugging Face 設定](https://huggingface.co/settings/tokens) 中產生：

```Bash
hf auth login
```

將您的 Hugging Face 倉庫名稱儲存在變數中以執行以下命令：

```Bash
hf auth whoami
```

然後在您的筆記型電腦上執行以下命令以記錄 2 個回合並將資料集上傳到 hub：

```Bash
python examples/lekiwi/record.py
```

## G. 視覺化資料集

如果您上傳了資料集，可以透過 [線上視覺化您的資料集](https://huggingface.co/spaces/lerobot/visualize_dataset)，複製並貼上以下命令產生的倉庫 ID：

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

如果您沒有上傳資料集，也可以在本地進行視覺化（瀏覽器視窗可以透過 `http://127.0.0.1:9090` 開啟視覺化工具）：

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### 視覺化一個資料集（可跳過，可嘗試）

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

如果您上傳了資料集，您也可以在本地透過以下命令進行視覺化：

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

如果您沒有上傳資料集，您也可以透過以下命令在本地進行視覺化：

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

這裡，`juxi` 是資料收集時自訂的 `repo_id` 名稱。



#### 資料收集技巧

一旦您熟悉了資料記錄，就可以建立更大的資料集用於訓練。一個不錯的入門任務是抓取不同位置的物體並將其放入容器中。我們建議至少錄製 50 個片段，每個位置 10 個片段。保持攝影機位置固定，並在整個錄製過程中保持一致的抓取動作。同時，確保您操作的物體在攝影機畫面中清晰可見。一個簡單的判斷標準是，您應該能夠僅透過觀察攝影機畫面就完成這項任務。

在接下來的章節中，您將訓練您的神經網路。在獲得可靠的抓取效能後，您可以開始在資料採集過程中引入更多變化，例如增加抓取位置、採用不同的抓取技術以及改變相機位置。

避免過快地增加過多的變化，因為這可能會影響你的結果。

如果您想深入瞭解這個重要話題，可以查看我們撰寫的關於優秀資料集構成要素的[部落格文章。](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### 疑難排解：

在 Linux 系統中，如果在資料記錄過程中左右箭頭鍵和 Esc 鍵不起作用，請確保已設定`$DISPLAY`環境變數。請參閱[pynput 的限制](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. 回放一個回合

現在嘗試在您的機器人上回放第一個回合：

```Bash
python examples/lekiwi/replay.py
```

恭喜🎉，你的機器人已經準備好自主學習任務了。請按照本教學的訓練部分開始訓練它：[真實世界機器人入門](https://huggingface.co/docs/lerobot/il_robots)

## I. 評估你的策略

確保更改remote_ip, port, HF_MODEL_ID

### 修改evaluate.py

HF_MODEL_ID="<hf_username>/<model_repo_id>" 修改為訓練上傳到huggingface上的資料集名稱（如果上傳到huggingface的話）或 訓練後將模型匯出到本地的目錄

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" 改為自己建立的使用者名稱和 eval_資料集名稱

remote_ip：樹莓派ip位址

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

然後執行以下命令：

```Bash
python examples/lekiwi/evaluate.py
```

1. 資料集的名稱以 `eval` 開頭，以反映你正在執行推論（例如 `${HF_USER}/eval_act_lekiwi_test`）。
2. 如果評估階段遇到`File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`請先刪除`eval_`開頭的這個資料夾再次執行程式。



模擬訓練可參考

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## 協助 🙋‍

對於硬體問題，請聯絡客戶服務。對於使用問題，請加入 Discord。

[LeRobot 平台](https://github.com/huggingface/lerobot)

[LeRobot Discord 頻道](https://discord.gg/8TnwDdjFGU)

##   
  
MAC電腦安裝Miniconda

## 加權限

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## 安裝Miniconda

https://www.anaconda.com/download

## pip換源

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda換源

```Shell
# 清空原有 .condarc 配置（可选，避免冲突）
echo "" > ~/.condarc

# 写入清华源配置
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# 清除缓存使配置生效
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

