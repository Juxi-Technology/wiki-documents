---
title: 靈巧手官方示例運行教程
description: "建議下載本使用教程下的代碼壓縮包進行Demo示例演示，或克隆 官方開源代碼倉庫 https://github.com/pollen-robotics/AmazingHand.git ，官方開源代碼或有錯漏請務必注意。"
---

# 靈巧手官方示例運行教程

## 1.代碼下載

建議下載本使用教程下的代碼壓縮包進行Demo示例演示，或克隆 官方開源代碼倉庫 https://github.com/pollen-robotics/AmazingHand.git ，官方開源代碼或有錯漏請務必注意。

Windows 代碼壓縮包

[AmazingHand-main.zip]

Linux 代碼壓縮包

[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2.環境安裝

根據系統自行安裝Rust、uv、dora-rs

**1、安裝 Rust：** [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

windows端 Rust環境變量設置（重點！） 參考 https://zhuanlan.zhihu.com/p/1958936613276087180

Linux端環境變量設置：

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

首次安裝可能需要Visual Studio Installer

**配置 Cargo 鏡像源**

在 `.cargo` 文件夾中創建 `config.toml` 配置文件, 配置清華 `crates.io-index` 鏡像，這樣Cargo 將會使用清華大學的鏡像源來下載 crate。

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2、安裝 uv：** [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

windows端打開Powershell終端，複製後輸入此命令進行安裝

**Linux端**環境變量設置：

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3、安裝 dora-rs：**請參考 [https://dora-rs.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing) 下載安裝

linux端環境變量設置：

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3.接線方式

電源要求至少5V3A，外接 舵機驅動板，通過USB連接到電腦端

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4.示例演示

### **1、查看舵機驅動板端口號**

- windows系統一般爲COM11，可通過 設備管理器 或者 飛特舵機上位機 找到 舵機驅動板 的端口號

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- Ubuntu、Linux系統一般爲/dev/ttyACM0

通過命令行查看舵機驅動板的端口：

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

若是在虛擬機裏 ls /dev/ttyUSB\* /dev/ttyACM\* 找不到目錄，請檢查虛擬機右下角是否將靈巧手連接到電腦，若是，請選擇斷開，並連接到虛擬機裏

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2、修改代碼中的端口號**

①找到AmazingHand-main\\Demo\\AHControl\\src目錄下的main.rs代碼文件，文本打開，修改爲自身主機查找到的端口號（windows爲COM\*，ubuntu、linux系統一般爲/dev/ttyACM\*）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

②找到對應的實例文件

**右靈巧手** 找到AmazingHand-main\\Demo目錄下的 dataflow_tracking_real_right.yml

**左靈巧手** 找到AmazingHand-main\\Demo目錄下的 dataflow_tracking_real_left.yml

**雙靈巧手** 找到AmazingHand-main\\Demo目錄下的 dataflow_tracking_real_2hands.yml

文本格式打開，修改爲自身主機查找到的端口號（windows爲COM\*，ubuntu、linux系統一般爲/dev/ttyACM\*）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

### **3、代碼部署**

- 打開Demo文件夾

Windows系統 在目錄中輸入Powershell 回車打開，啓動守護進程（每次都要）：

Linux系統 直接使用控制檯打開，啓動守護進程（每次都要）：

```Plain Text
dora up
```

- 然後在控制檯中從該目錄運行（搭建環境時曾經運行過一次即可！！再此運行會覆蓋掉虛擬環境！！）創建虛擬環境：

```Plain Text
uv venv --python 3.12
```

- 激活虛擬環境（每次都要）請根據 系統 輸入並運行：

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

確保控制檯已經激活虛擬環境！

- 執行依賴同步，進入到AHControl文件夾

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- 然後 輸入`cd ..`並回車 返回Demo目錄下！進入到AHSimulation文件夾

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- 然後輸入`cd ..`並回車 返回Demo目錄下！進入到HandTracking文件夾

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4、運行結果

- 打開Demo文件夾！在目錄中輸入Powershell 回車打開，啓動守護進程（每次都要）：

```Plain Text
dora up
```

- 激活虛擬環境（每次都要）請根據 系統 輸入並運行：

Windows端激活虛擬環境的命令：

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux端激活虛擬環境的命令：

```Plain Text
source .venv/bin/activate
```

### 模擬環境

- 僅在模擬環境下運行網絡攝像頭手部追蹤演示：

```Plain Text
dora build dataflow_tracking_simu.yml --uv   *#（只需执行一次）*
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### 真實硬件運行（手部追蹤）

- 使用真實硬件運行網絡攝像頭手部追蹤演示：

    #### 右靈巧手

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   *#（只需执行一次）*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### 左靈巧手

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   *#（只需执行一次）*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### 雙靈巧手（注意都連接到一個舵機驅動板上）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   *#（只需执行一次）*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### 簡單示例控制仿真手指角度

- 運行一個簡單的示例來控制仿真中的手指角度：

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   *#（只需执行一次）*
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

描述說明

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl)包含一個 dora-rs 節點來控制電機，以及一些用於配置電機的實用工具。

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation)包含一個 dora-rs 節點，用於模擬手部運動並獲得逆運動學。

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking)包含一個 dora-rs 節點，用於從網絡攝像頭跟蹤手部並將其用作控制 AH! 的目標。



## 注意事項

### 1、mediapipe版本問題

pyproject.toml 中配置 mediapipe\>=0.10.14，但安裝後的 mediapipe 包缺少 solutions 子模塊，大概率是mediapipe 版本與 Python 3.12 不兼容（高版本 mediapipe 對 Python 3.12 的支持存在問題），或安裝過程中包文件損壞。

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2、Dora 版本不兼容，消息格式（v0.7.0 vs v0.8.0）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

答：①先在C盤用戶目錄下的.cargo/registry/src/github.xxxxxxxx/ 下只刪除對應的依賴包!

**`dora-message-0.7.0`**（核心！這是舊版消息格式文件夾，必須刪）

`多拉-核心-0.4.1`

`節點api0.4.1`

`多拉-箭頭-轉換-0.4.1`

`多拉-指標-0.4.1`

`Dora-追蹤-0.4.1`

`const-random-macro-0.1.16`（Dora 依賴的輔助庫，隨舊版一起刪）

②打開Demo/AHControl文件夾修改Cargo.toml裏的dora-node-api="0.5.0" dora-message="0.8.0"

③控制檯進入到AHControl目錄下重新運行cargo build --release

④在重新跟着“[真實硬件運行](https://juxitech.feishu.cn/docx/NF4ndlQswoYbRQxNbg5cR4IOnEc#doxcnhAOlJGD8dKFyx70JSJ012b)”重新進行build

根據實際報錯情況修改對應的版本，例如dora-message需要0.6.0的，修改成dora-node-api="0.4.0" dora-message="0.6.0"

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3、沒有openCV依賴庫

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

在HandTracking目錄下輸入以下命令

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4、相機權限開啓（電腦端）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5、虛擬機22.04調用攝像頭

參考 https://blog.csdn.net/qq_19731521/article/details/124954288

### 6、桌面攝像頭安裝

#### 環境相機套件支架安裝步驟

1.先固定微調角度支架

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2.側視環境相機套件

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)



## 虛擬機22.04 直接運行手部追蹤

將這四個文件下載並放在同一個英文目錄下，用虛擬機軟件直接打開.ovf文件進入系統

密碼ubuntu

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand-file1.iso]

**1.在Demo目錄下打開控制檯：**

```Plain Text
dora up
```

**並激活虛擬環境：**

```Plain Text
source .venv/bin/activate
```

**2.虛擬機調用攝像頭權限**

虛擬機22.04調用攝像頭參考 https://blog.csdn.net/qq_19731521/article/details/124954288

**3.通過命令行查看舵機驅動板的端口：**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4.修改代碼文件裏的端口號**

①找到AmazingHand-main\\Demo\\AHControl\\src目錄下的main.rs代碼文件，文本打開，修改爲自身主機查找到的端口號（windows爲COM\*，ubuntu、linux系統一般爲/dev/ttyACM\*）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

②找到對應的實例文件

**右靈巧手** 找到AmazingHand-main\\Demo目錄下的 dataflow_tracking_real_right.yml

**左靈巧手** 找到AmazingHand-main\\Demo目錄下的 dataflow_tracking_real_left.yml

**雙靈巧手** 找到AmazingHand-main\\Demo目錄下的 dataflow_tracking_real_2hands.yml

文本格式打開，修改爲自身主機查找到的端口號（windows爲COM\*，ubuntu、linux系統一般爲/dev/ttyACM\*）

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5.運行 右手 手部追蹤**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```



