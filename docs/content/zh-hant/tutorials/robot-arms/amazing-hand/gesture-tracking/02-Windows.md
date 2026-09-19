---
title: "Windows一鍵部署執行"
description: "AmazingHand 手勢追蹤一鍵部署（Windows）：雙擊編號腳本完成環境與連接埠設定，再以手勢即時驅動仿真或實體靈巧手。"
---

# Windows一鍵部署執行

**AmazingHand-main.zip**（AmazingHand-main.zip, 體積超過站點單文件上限,可向 support@juxitech.com 索取）

本教程基於 AmazingHand（Pollen Robotics 靈巧手）官方 Demo，已配好一鍵部署腳本。
按編號順序執行即可。**所有腳本都位於 ****`Demo\Windows一键部署脚本\`**** 資料夾下，直接雙擊執行。**

---

## 硬件準備

> 模型檔案可在 [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) 查看或自行下載（含 URDF）。
> 
> 

---

## 環境安裝（腳本 1）

**雙擊 ****`1-安装环境.bat`**，自動完成：

1. **檢查 MSVC 構建工具**（cl.exe）——Rust 編譯必需。缺失時會提示安裝
Visual Studio 2022 Build Tools，勾選"使用 C++ 的桌面開發"，裝完重開終端。

2. **安裝 Rust**（rustup + stable-msvc 工具鏈）

3. **配置 cargo 清華鏡像源**（`C:\Users\<使用者名稱>\.cargo\config.toml`），加速 crate 下載

4. **安裝 uv**（Python 包管理器）

5. **安裝 dora-cli 0.5.0**（`cargo install`，首次編譯約 10~20 分鐘，耐心等待）

6. **安裝 dora-rs pip 包**（可選，會裝進虛擬環境）

> **重要**：腳本結束後**關閉並重新打開終端**，讓環境變量生效。安裝過程可能因網絡較慢，請耐心等待，不要中途關閉。
> 
> 

### 手動安裝備選（腳本不可用時）

- **Rust**：[https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - Windows 用 rustup-init.exe，選預設 MSVC 工具鏈

    - 環境變量：`%USERPROFILE%.cargo\bin` 加入 PATH

- **uv**：PowerShell 執行 `irm ``https://astral.sh/uv/install.ps1`` | iex`

    - 環境變量：`%USERPROFILE%.local\bin` 加入 PATH

- **dora-cli**：`cargo install dora-cli --version 0.5.0`

### cargo 清華鏡像設定（~/.cargo/config.toml）

```Bash
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

- 電腦端找到連接埠號：**裝置管理器 → 連接埠(COM和LPT)**，如 `COM11`

---

## 配置串口（腳本 2）

**雙擊 ****`2-配置串口.bat`**（實際邏輯在 `2-配置串口.ps1`）：

1. 提示"請將舵機驅動板連接到電腦"→ 回車開始檢測

2. 自動列出檢測到的 COM 連接埠（帶裝置名）

3. 單個連接埠時回車確認，多個連接埠時輸入編號

4. 自動寫入 3 個 dataflow yml 的 `--serialport` 和 `AHControl\src\main.rs` 的預設連接埠

5. 原檔案自動備份為 `.bak`

> 如果重新插拔 USB，連接埠號可能變化，需重新執行本腳本。
> 
> 

---

## 代碼部署（腳本 3）

**雙擊 ****`3-部署代码.bat`**，自動完成：

1. 啟動 dora 守護進程（`dora up`）

2. 建立 Python 3.12 虛擬環境（`uv venv --python 3.12`）

3. 激活虛擬環境

4. 編譯 AHControl Rust 節點（`cargo build --release`，首次約 10 分鐘）

5. 同步 AHSimulation、HandTracking 依賴（`uv sync`）

6. 強制安裝 mediapipe==0.10.14

> 部署只需執行一次。之後重複執行會提示是否重建虛擬環境。
> 
> 

---

## 執行代碼（腳本 4）

**雙擊 ****`4-运行代码.bat`**，出現交互選單：

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

選好後自動執行 `dora build` + `dora run`。攝像頭視窗彈出，對着攝像頭做手勢，靈巧手實時跟隨。**Ctrl+C 停止**，數據流結束後按回車返回主選單，可再選其它模式或 `q` 退出。

> 首次執行時 Windows 可能攔截攝像頭權限，點擊"允許"即可。
> 
> 

---

## 項目清理（腳本 0）

**雙擊 ****`0-清理项目.bat`**，輸入 `Y` 確認後自動清理：

1. 停止 dora 守護進程

2. 刪除 3 個虛擬環境（`.venv`）

3. 刪除 Rust 編譯產物（`Demo\target`）

4. 刪除 `pycache`、`.bak` 備份、日誌、`Demo\out`（dora 日誌目錄）

5. **恢復預設連接埠**（`--serialport /dev/ttyACM0`），去掉本機串口殘留

> 清理後可把整個 `AmazingHand-main` 資料夾拷給他人，乾淨無殘留。新機器上按 1 → 2 → 3 → 4 順序執行即可。
> 
> 

---

## 常見問題與注意事項

### 8.1 cargo 卡在 `Updating 'tuna' index`

- 原因：鏡像配置用了 **git 倉庫方式**（`.../git/crates.io-index.git`），首次要下載 1GB+ 索引

- 解決：`C:\Users\<使用者名稱>\.cargo\config.toml` 改為 **sparse 稀疏索引**（見 2.2 節），或直接重跑 `1-安装环境.bat`

### 8.2 mediapipe 缺 solutions 子模組 / 安裝損壞

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- 必須在虛擬環境激活狀態下執行（在 `Demo` 目錄）

- `3-部署代码.bat` 已自動做這一步兜底

### 8.3 dora 版本不兼容（message v0.8.0 vs v0.7.0）

- 症狀：`version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 原因：dora-cli 版本與 dora-node-api 不匹配。**必須統一為 0.5.0**

    - 檢查：`dora --version` 應輸出 `dora-cli 0.5.0`、`dora-message: 0.8.0`

    - 修復：`cargo install dora-cli --version 0.5.0 --force`

    - 若 PATH 裡有多個 dora（如 `C:\Users\xxx\.dora\bin` 的舊版），確保 `.cargo\bin` 排在前面，或刪除舊版

### 8.4 MuJoCo / mediapipe 載入模型失敗（中文路徑）

- 症狀：`ParseXML: Error opening file '...\scene.xml'` 或 `Can't find file: ....tflite`

- 原因：MuJoCo 3.x / mediapipe 的 C++ 載入器在 Windows 上**打不開含中文的絕對路徑**（如 `D:\Claude工作区...`）

- 本項目已內置修復：

    - `AHSimulation\AHSimulation\mj_mink_*.py` 載入模型前切換工作目錄

    - `HandTracking\mediapipe_patch.py` 用 8.3 短路徑 + 相對路徑繞過

- 不要刪除這些修復代碼

### 8.5 攝像頭權限

- 首次執行彈窗選擇"允許"

- 設定 → 隱私 → 相機 → 允許桌面應用存取

### 8.6 連接埠號每次變化

- 重新插拔 USB 後 COM 號可能變，重跑 `2-配置串口.bat`

### 8.7 缺少 openCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（在 `HandTracking` 目錄、激活虛擬環境後執行）

---

## 代碼結構說明

### Demo 目錄

### 各 dataflow 對應關係

### 數據流原理

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### 連接埠配置位置

- 三個 `dataflow_tracking_real_*.yml` 的 `args:` 行：`--serialport COMxx`

- `AHControl\src\main.rs` 的 `default_value = "COMxx"`（串口參數預設值）

- `AHControl\config\*.toml`：舵機型號、ID、偏移量（一般不用改）

