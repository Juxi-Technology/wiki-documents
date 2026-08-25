---
title: 常見問題 FAQ
description: 鉅犀科技產品常見問題合集——機械臂、傳感器、配件安裝與調試高頻問題匯總
keywords: [faq, 常見問題, 故障排除, troubleshooting]
---

# 常見問題 FAQ

匯總鉅犀科技各產品的高頻問題與解決方案。按產品分類,快速定位你的問題。

---

## 機械臂 · SO-ARM101

**Q: 機械臂無法識別端口?**
運行 `lerobot-find-port` 查找端口。確認 USB 連接牢固,主動臂/從動臂分別插在 leader/follower 對應接口。Linux 下需要授權串口:`sudo chmod 666 /dev/ttyACM*`。

**Q: 出現 `Could not connect on port "/dev/ttyACM0"` 報錯?**
確認 `/dev/ttyACM*` 存在且已授權串口權限,然後重試。

**Q: 校準時報 `Magnitude 30841 exceeds 2047`?**
對機械臂重新斷電再上電,再次嘗試校準。

**Q: 舵機報 `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**
檢查對應端口號的機械臂是否接通電源,總線舵機是否連接正常。

**Q: 出現 `Motor 'gripper' was not found`?**
檢查通訊線是否與舵機連接正常,電源電壓是否正確。

**Q: 需要更高版本的 PyTorch 但 GPU 不可用?**
參考 [Jetson Orin 上 PyTorch 不相容問題](/zh-hant/tutorials/learning-resources/jetson-orin-pytorch-compatibility)。

---

## 傳感器 · IMU 慣導模組

**Q: IMU 數據漂移嚴重?**
先執行[整體校準](/zh-hant/tutorials/sensors/imu/calibration);確認模組固定牢固;環境溫度變化大時補充溫度校準。

**Q: 磁力計數據不準?**
執行磁力計校準,校準過程中水平緩慢旋轉覆蓋所有朝向,遠離電機等強磁場源。

**Q: ROS 話題收不到數據?**
確認串口權限(`sudo chmod 666 /dev/ttyUSB*`),檢查 launch 文件中的端口參數。

---

## 配件 · KWS 語音識別模組

**Q: 語音模組沒有響應?**
確認已燒錄出廠固件。未燒錄固件的芯片到手後需要先燒錄,參考[固件下載與燒錄](/zh-hant/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)。

**Q: 串口通信無數據返回?**
確認波特率與教程一致,接線無誤(RX/TX 交叉)。

---

## 配件 · 心率血氧傳感器

**Q: 初始化失敗(init fail)?**
確認接線正確:IIC 模式下設備地址默認 0x57,UART 模式波特率 9600。

**Q: 數據讀數不穩定?**
確保傳感器與皮膚接觸良好,手指平穩放置避免移動。

---

## 配件 · USB / CSI 攝像頭

**Q: 攝像頭無法識別?**
確認 USB 線纜連接牢固,換 USB 端口;運行 `ls /dev/video*` 與 `v4l2-ctl --list-devices` 查看設備。

**Q: CSI 攝像頭未被識別?**
確認排線連接正確且方向無誤(金屬觸點朝向主板),並在**斷電狀態**下連接;檢查 JetPack 版本 ≥ 5.0。

**Q: GStreamer 管道報錯?**
確認 JetPack 版本 ≥ 5.0,運行 `apt list --installed | grep nvarguscamerasrc` 確認 GStreamer 插件已安裝。

---

## 配件 · 其他

**Q: 4K HDMI 採集卡畫面黑屏?**
確認 HDMI 接口類型(HDMI/Micro HDMI/DP 轉 HDMI),使用對應轉接頭。

**Q: OLED 屏幕不亮?**
檢查 I2C 接線(SCL/SDA)是否正確,確認引腳無短路——接錯可能導致主板硬件損壞。

**Q: USB 免驅聲卡無法識別?**
即插即用設備,確認 USB 口供電正常,系統音頻輸出設備中切換默認設備。

**Q: 2 自由度雲台舵機不響應?**
檢查舵機電源供電是否充足(SCS 舵機需外部供電 6-8.4V)。

---

## 通用問題

**Q: 教程裡的飛書鏈接打不開?**
飛書文檔僅對內部/協作者可見。公開文檔請優先使用本 wiki 頁面,或聯繫 support@juxitech.com。

**Q: 需要在哪個平台上運行?**
產品均支持 PC(Linux/Windows)、Jetson、樹莓派等主流平台,詳見各教程「系統要求」。

**Q: 如何獲得技術支援?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
- 📺 [B站](https://space.bilibili.com/3546906737248821) 評論區

---

## 相關鏈接

- [機械臂選型指南](/zh-hant/tutorials/robot-arms/select-guide)
- [下載中心](/zh-hant/downloads/)
- [成功案例](/zh-hant/cases/)
