---
title: "IMU 校準"
description: 鉅犀科技高精度 IMU 模組校準指南——整體校準、磁力計校準、溫度校準,支持串口與 I2C 雙模式
keywords: [imu, calibration, 校準, 磁力計, 溫度校準]
---

# IMU 校準

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


> 在正式使用 IMU 模組前,建議先完成校準,以獲得最佳姿態解算精度。本文檔基於官方 `IMU_Library` 的 `imu_calibration_tool.py`。

## 校準類型

IMU 校準工具支持三種校準,可單獨執行或一次完成:

| 校準類型 | 說明 | 適用場景 |
|---------|------|---------|
| **整體校準** (`imu`) | 加速度計 + 陀螺儀 + 磁力計綜合校準 | 首次安裝、更換安裝位置後 |
| **磁力計校準** (`mag`) | 消除環境磁場干擾 | 環境磁場變化(靠近電機/金屬後) |
| **溫度校準** (`temp`) | 補償溫度漂移 | 工作環境溫度變化大 |

---

## 準備工作

1. 克隆官方代碼倉庫(內含校準工具):

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. 確認 IMU 與主控連接正常(串口或 I2C)

3. **校準姿勢**:將 IMU 水平靜止放置,周圍遠離強磁場源(電機、磁鐵、金屬支架)

---

## 串口通信校準

```bash
cd ~/IMU_Library/IMU_Library

# 執行所有校準(整體、磁力計、溫度)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 僅整體校準
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 僅磁力計校準
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 僅溫度校準
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C 通信校準

```bash
# 執行所有校準(整體、磁力計、溫度)
python3 imu_calibration_tool.py --mode i2c --port 1

# 僅整體校準
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 僅磁力計校準
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 僅溫度校準
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port` 參數:I2C 模式下為主控 I2C 總線號(如樹莓派/STM32 為 1);串口模式下為設備路徑(如 `/dev/ttyUSB0`、`/dev/imu-serial`)。

---

## 校準技巧

| 技巧 | 說明 |
|------|------|
| **磁力計校準** | 水平緩慢旋轉 IMU(8 字或畫圈),覆蓋所有朝向 |
| **靜止放置** | 整體校準時 IMU 必須靜止,移動會導致校準失敗 |
| **遠離磁場** | 校準環境遠離電機、變壓器、金屬檯面 |
| **多軸旋轉** | 磁力計校準需要覆蓋 X/Y/Z 三個軸的旋轉 |

---

## 常見問題

**Q: 校準後姿態仍然漂移?**

**A:** 確認整體校準(imu)是否執行;檢查 IMU 是否固定牢固(震動會引入噪聲);環境溫度變化大時補充溫度校準。

**Q: 磁力計校準失敗?**

**A:** 校準環境有強磁場干擾;確認 `--calibrate mag` 參數正確;校準過程中是否充分旋轉覆蓋所有朝向。

**Q: I2C 模式下 port 參數填什麼?**

**A:** 填寫主控的 I2C 總線號。樹莓派默認 1,STM32 按引腳映射的硬件 I2C 編號,可在 `i2cdetect -l` 中確認。

---

## 相關鏈接

- [IMU 模組介紹(產品資料)](/zh-hant/tutorials/sensors/imu/product-info)
- [IMU ROS1 應用](/zh-hant/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2 應用](/zh-hant/tutorials/sensors/imu/ros-examples/ros2)
- [官方倉庫](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
