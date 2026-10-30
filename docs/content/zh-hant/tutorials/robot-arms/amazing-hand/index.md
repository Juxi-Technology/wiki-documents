---

title: "AmazingHand 靈巧手使用教程"

description: "AmazingHand 開源靈巧手完整教程：產品資料、相機套件、網頁端手勢識別、MuJoCo 手勢追蹤、界面控制、Arduino Nano、TTL 與 PWM 調試。"

---



# AmazingHand 靈巧手使用教程



AmazingHand 是一個成本不到 250 美元的開源仿人手項目，面向機器人愛好者、研究人員與開發者。



## 項目簡介



- **機械設計**：8 自由度、4 根手指，每指 2 節指關節聯動；手指採用並聯機構驅動，無外部線纜，所有驅動器內置於手部；3D 打印零件，重量約 400g，成本低於 200 歐元。

- **控制方案**：Python 串口總線驅動（支援 Waveshare 等硬件）；Arduino + Feetech TTL Linker 雙方案任選；提供 Python 與 Arduino 示例代碼；支援舵機扭矩開關、位置傳感、溫度監控等反饋。

- **資源齊全**：完整 BOM 物料清單、CAD 文件及 Onshape 線上文件、組裝教程與校準腳本、基礎與高級演示示例，支援逆向/正向運動學。

- **項目亮點**：適配 Reachy2 等機器人腕部；開放設計、社區驅動；後續規劃包括觸覺傳感、彈性關節、多指長度及 5 指方案。



## 教程目錄



| 內容 | 說明 |
|---|---|
| [產品資料](./product-info.md) | 產品參數、BOM、結構與資料下載 |
| [環境相機套件安裝](./Camera-Kit-Installation.md) | 相機套件支架安裝步驟 |
| [網頁端-手勢識別](./AmazingHand-Web-Control.md) | 線上網頁控制與本地部署 |
| [手勢追蹤（MuJoCo 仿真）](./gesture-tracking/02-Windows.md) | Windows / Linux / Mac 一鍵部署執行 |
| [界面控制教程](./AmazingHand-Interface-Control.md) | Python GUI / 命令行控制、左右手標定與協議 |
| [Arduino Nano 使用教程](./Arduino-Nano-Tutorial.md) | Nano 板接線、庫安裝與演示程序 |
| [TTL 串口舵機調試-組裝](./AmazingHand-TTL-Debugging.md) | TTL 串口舵機組裝與調試 |
| [PWM 舵機調試](./pwm-debugging/01-GUI-Visual-Control.md) | GUI 可視化、手勢追蹤與使用手冊 |



## 資源下載



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — 手勢追蹤一鍵部署（Windows / Linux / Mac）

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — 飛特 SCS0009 舵機校準工具

- [AmazingHand 官方倉庫](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — PWM 版交付包（GUI / 手勢追蹤 / 韌體 / 文件）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — 本地部署包
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — 舵機調試工具


### 全部頁面

- [AmazingHand靈巧手產品資料](./product-info.md)
- [環境相機套件安裝](./Camera-Kit-Installation.md)
- [AmazingHand 網頁控制](./AmazingHand-Web-Control.md)
- [Windows一鍵部署執行](./gesture-tracking/02-Windows.md)
- [Linux（Ubuntu）一鍵部署執行](./gesture-tracking/01-Ubuntu.md)
- [Mac一鍵部署執行](./gesture-tracking/03-macOS.md)
- [官方示例運行教程](./AmazingHand-Official-Example.md)
- [界面控制教程](./AmazingHand-Interface-Control.md)
- [Arduino Nano 使用教程](./Arduino-Nano-Tutorial.md)
- [TTL 調試教程](./AmazingHand-TTL-Debugging.md)
- [01-GUI可視化控制](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-手勢追蹤教程](./pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM舵機版本-使用手冊](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-串口舵機版本-使用說明](./pwm-debugging/04-Serial-Servo-Guide.md)
- [全流程使用教程](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

