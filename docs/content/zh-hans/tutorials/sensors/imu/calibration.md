---
title: "IMU 校准"
description: 钜犀科技高精度 IMU 模块校准指南——整体校准、磁力计校准、温度校准,支持串口与 I2C 双模式
keywords: [imu, calibration, 校准, 磁力计, 温度校准]
---

# IMU 校准

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**


> 在正式使用 IMU 模块前,建议先完成校准,以获得最佳的姿态解算精度。本文档基于官方 `IMU_Library` 的 `imu_calibration_tool.py`。

## 校准类型

IMU 校准工具支持三种校准,可单独执行或一次完成:

| 校准类型 | 说明 | 适用场景 |
|---------|------|---------|
| **整体校准** (`imu`) | 加速度计 + 陀螺仪 + 磁力计综合校准 | 首次安装、更换安装位置后 |
| **磁力计校准** (`mag`) | 消除环境磁场干扰 | 环境磁场变化(靠近电机/金属后) |
| **温度校准** (`temp`) | 补偿温度漂移 | 工作环境温度变化大 |

---

## 准备工作

1. 克隆官方代码仓库(内含校准工具):

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. 确认 IMU 与主控连接正常(串口或 I2C)

3. **校准姿势**:将 IMU 水平静止放置,周围远离强磁场源(电机、磁铁、金属支架)

---

## 串口通信校准

```bash
cd ~/IMU_Library/IMU_Library

# 执行所有校准(整体、磁力计、温度)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 仅整体校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 仅磁力计校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 仅温度校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C 通信校准

```bash
# 执行所有校准(整体、磁力计、温度)
python3 imu_calibration_tool.py --mode i2c --port 1

# 仅整体校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port` 参数:I2C 模式下为主控 I2C 总线号(如树莓派/STM32 为 1);串口模式下为设备路径(如 `/dev/ttyUSB0`、`/dev/imu-serial`)。

---

## 校准技巧

| 技巧 | 说明 |
|------|------|
| **磁力计校准** | 水平缓慢旋转 IMU(8 字或画圈),覆盖所有朝向 |
| **静止放置** | 整体校准时 IMU 必须静止,移动会导致校准失败 |
| **远离磁场** | 校准环境远离电机、变压器、金属台面 |
| **多轴旋转** | 磁力计校准需要覆盖 X/Y/Z 三个轴的旋转 |

---

## 常见问题

**Q: 校准后姿态仍然漂移?**

**A:** 确认整体校准(imu)是否执行;检查 IMU 是否固定牢固(震动会引入噪声);环境温度变化大时补充温度校准。

**Q: 磁力计校准失败?**

**A:** 校准环境有强磁场干扰;确认 `--calibrate mag` 参数正确;校准过程中是否充分旋转覆盖所有朝向。

**Q: I2C 模式下 port 参数填什么?**

**A:** 填写主控的 I2C 总线号。树莓派默认 1,STM32 按引脚映射的硬件 I2C 编号,可在 `i2cdetect -l` 中确认。

---

## 相关链接

- [IMU 模块介绍(产品信息)](/zh-hans/tutorials/sensors/imu/product-info)
- [IMU ROS1 应用](/zh-hans/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2 应用](/zh-hans/tutorials/sensors/imu/ros-examples/ros2)
- [官方仓库](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
