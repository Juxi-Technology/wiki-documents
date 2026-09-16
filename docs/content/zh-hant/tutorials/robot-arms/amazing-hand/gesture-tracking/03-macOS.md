---
title: "Mac一鍵部署執行"
description: "本教程基於 AmazingHand（Pollen Robotics 靈巧手）官方 Demo，已配好一鍵部署腳本。 按編號順序執行即可。所有腳本都位於 Demo/Mac一鍵部署腳本/ 資料夾下，在終端中執行 ./腳本名。"
---

# Mac一鍵部署執行

[AmazingHand-main.zip]

本教程基於 AmazingHand（Pollen Robotics 靈巧手）官方 Demo，已配好一鍵部署腳本。 按編號順序執行即可。**所有腳本都位於 Demo/Mac一鍵部署腳本/ 資料夾下，在終端中執行 ./腳本名。**

---

## 硬件準備

|硬件|要求|
|---|---|
|靈巧手本體|右手 / 左手 / 雙手|
|舵機驅動板|外接，USB 連電腦|
|電源|**至少 5V 4A**（USB 供電不足，必須外接電源）|
|攝像頭|Mac 自帶攝像頭或 USB 攝像頭|

> 模型檔案可在 [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) 查看或下載（含 URDF）。
> 
> 

---

## 獲取腳本執行權限（重要）

**腳本從 Windows / 壓縮包拷貝到 Mac 後，執行權限（****`+x`****）會丟失，直接執行會報
****`Permission denied`****。第一次使用前必須先執行：**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

之後每個腳本就可以用 `./腳本名` 執行了。

> 提示：把 `AmazingHand-main` 拷到 Mac 時，用 **tar** 保留權限最穩：
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`，或解壓後統一執行一次 `chmod +x *.sh`。
> 
> 

---

## 環境安裝（腳本 1）

在終端進入腳本目錄，執行（確保已做過上面第 2 步的 `chmod +x`）：

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

自動完成：

1. **檢查 Xcode 命令列工具**（Rust 編譯必需）。缺失時提示 `xcode-select --install`

2. **安裝 Rust**（rustup + stable 工具鏈）

3. **配置 cargo 清華鏡像源**（`~/.cargo/config.toml`），加速 crate 下載

4. **安裝 uv**（Python 包管理器）

5. **安裝 dora-cli 0.5.0**（`cargo install`，首次編譯約 10~20 分鐘，耐心等待）。自動清理舊版 dora

6. **安裝 dora-rs pip 包**（可選）

> **重要**：腳本結束後**關閉並重新打開終端**，讓環境變量生效。若版本號顯示為空， 將以下路徑加入 `~/.zshrc`：
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### 手動安裝備選（腳本不可用時）

- **Xcode 命令列工具**：`xcode-select --install`

- **Rust**：`curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**：`curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**：`cargo install dora-cli --version 0.5.0`

### cargo 清華鏡像（~/.cargo/config.toml）

```Plain Text
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> 用 **sparse 稀疏索引**（如上），不要用 git 倉庫鏡像——git 方式首次要下載約 1GB 索引，容易卡死在 `Updating 'tuna' index`。
> 
> 

---

## 接線方式

- 舵機驅動板 USB 連電腦，**外接 5V4A 電源**

- macOS 的 USB 串口裝置名是 **/dev/tty.usbmodem\*** 或 **/dev/cu.usbmodem\***（不是 Linux 的 `/dev/ttyACM*`）

- 查看連接埠：

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## 配置串口（腳本 2）

**執行 ****`./2-配置串口.sh`**：

1. 提示"請將舵機驅動板連接到電腦"→ 回車開始檢測

2. 自動列出檢測到的串口（`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`）

3. 單個連接埠時回車確認，多個連接埠時輸入編號

4. 自動寫入 3 個 dataflow yml 的 `--serialport` 和 `AHControl/src/main.rs` 的預設連接埠

5. macOS 的 USB 串口通常對使用者可讀寫；若提示無權限，手動執行：

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

或到 **系統設定 → 隱私與安全性 → 輸入監控**，允許終端存取。

> 若在虛擬機中，請把 USB 裝置連接到虛擬機。
> 
> 

---

## 代碼部署（腳本 3）

**執行 ****`./3-部署代码.sh`**，自動完成：

1. 啟動 dora 守護進程（`dora up`）

2. 建立 Python 3.12 虛擬環境（`uv venv --python 3.12`）

3. 激活虛擬環境

4. 編譯 AHControl Rust 節點（`cargo build --release`，首次約 10 分鐘）

5. 同步 AHSimulation、HandTracking 依賴（`uv sync`）

6. 強制安裝 mediapipe==0.10.14（教程已知坑，兜底）

> 部署只需執行一次。之後重複執行會提示是否重建虛擬環境。
> 
> 

---

## 執行代碼（腳本 4）

**執行 ****`./4-运行代码.sh`**，出現交互選單：

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- 選 **1**：模擬環境，攝像頭手勢驅動兩隻仿真手

- 選 **2**：進入子選單，選右手 / 左手 / 雙手

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

選好後自動執行 `dora build` + `dora run`。攝像頭視窗彈出，對着攝像頭做手勢，靈巧手實時跟隨。**Ctrl+C 停止**，數據流結束後按回車返回主選單，可再選其它模式或 q 退出。

> **首次執行 macOS 會彈攝像頭授權**：系統設定 → 隱私與安全性 → 相機，允許終端使用攝像頭。
> 
> 

---

## 項目清理（腳本 0）

**執行 ****`./0-清理项目.sh`**，輸入 Y 確認後自動清理：

1. 停止 dora 守護進程

2. 刪除 3 個虛擬環境（`.venv`）

3. 刪除 Rust 編譯產物（`Demo/target`）

4. 刪除 `__pycache__`、`.bak` 備份、日誌、`Demo/out`（dora 日誌目錄）

5. **恢復預設連接埠**（`--serialport /dev/ttyACM0`），去掉本機串口殘留

> 清理後可把整個 `AmazingHand-main` 資料夾拷給他人，乾淨無殘留。新機器上按 1 → 2 → 3 → 4 順序執行即可。
> 
> 

---

## 常見問題與注意事項

### 9.1 `Permission denied`（腳本沒有執行權限）

- 症狀：執行 `./1-安装环境.sh` 時報 `bash: ./1-安装环境.sh: Permission denied`

- 原因：腳本從 Windows / 壓縮包拷到 Mac 後**執行位丟失**

- 解決：

```Plain Text
chmod +x *.sh
```

### 9.2 cargo 卡在 `Updating 'tuna' index`

- 原因：鏡像配置用了 **git 倉庫方式**（`.../git/crates.io-index.git`），首次要下載 1GB+ 索引

- 解決：`~/.cargo/config.toml` 改為 **sparse 稀疏索引**（見 3.2 節），或直接重跑 `1-安装环境.sh`

### 9.3 mediapipe 缺 solutions 子模組 / 安裝損壞

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- 必須在虛擬環境激活狀態下執行（在 Demo 目錄）

- `3-部署代码.sh` 已自動做這一步兜底

### 9.4 dora 版本不兼容（message v0.8.0 vs v0.7.0）

- 症狀：`version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 原因：dora-cli 版本與 dora-node-api 不匹配。**必須統一為 0.5.0**

    - 檢查：`dora --version` 應輸出 `dora-cli 0.5.0`、`dora-message: 0.8.0`

    - `1-安装环境.sh` 會自動檢測舊版並強制重裝

**若系統殘留舊版 dora（如 0.4.1），先手動清理：**

```Bash
# 1. 定位舊版 dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. 刪除找到的舊版（按實際路徑）
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. 強制安裝 0.5.0
cargo install dora-cli --version 0.5.0 --force

# 4. 確認版本（應輸出 dora-cli 0.5.0 / dora-message: 0.8.0）
dora --version
```

> 若 `dora --version` 仍顯示舊版，說明 PATH 裡還有其它舊 dora，用 which dora 逐個排查刪除。
> 
> 

### 9.5 串口無權限

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- 或 **系統設定 → 隱私與安全性 → 輸入監控** → 允許終端

- 若用的是 `tty.*` 裝置讀不了，改用對應的 `cu.*` 裝置（cu 裝置只讀連接埠，更適合直接控制）

### 9.6 攝像頭權限

- **首次執行彈窗選"允許"**，或到 **系統設定 → 隱私與安全性 → 相機**，允許終端使用攝像頭

- 確認攝像頭未被其它應用（FaceTime、會議軟件）佔用

### 9.7 連接埠號每次變化

- 重新插拔 USB 後裝置名可能變，重跑 `2-配置串口.sh`

### 9.8 缺少 openCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（在 `HandTracking` 目錄、激活虛擬環境後執行）

### 9.9 Apple Silicon 編譯較慢 / 首次執行被 Gatekeeper 攔截

- Apple Silicon 首次 `cargo build` 編譯 dora 依賴較慢屬正常，耐心等待

- 若提示"無法驗證開發者"：系統設定 → 隱私與安全性 → 仍要打開

---

## 代碼結構說明

### Demo 目錄

|目錄/檔案|說明|
|---|---|
|AHControl|Rust 節點，控制舵機電機。src/main.rs 是入口|
|AHSimulation|Python 節點，MuJoCo 仿真 + 逆運動學（mink）|
|HandTracking|Python 節點，MediaPipe 手部追蹤|
|dataflow_\*.yml|dora 數據流定義（節點連接圖）|
|Mac一鍵部署腳本|本套一鍵腳本|

### 各 dataflow 對應關係

|檔案|用途|
|---|---|
|dataflow_tracking_simu.yml|模擬環境，攝像頭手勢 → 仿真雙手|
|dataflow_tracking_real_right.yml|真機右手|
|dataflow_tracking_real_left.yml|真機左手|
|dataflow_tracking_real_2hands.yml|真機雙手（連同一驅動板）|

### 數據流原理

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### 連接埠配置位置

- 三個 `dataflow_tracking_real_*.yml` 的 `args:` 行：`--serialport /dev/cu.usbmodem...`

- `AHControl/src/main.rs` 的 `default_value`（串口參數預設值）

- `AHControl/config/*.toml`：舵機型號、ID、偏移量（一般不用改）



