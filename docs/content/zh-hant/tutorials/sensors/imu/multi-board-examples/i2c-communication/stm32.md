---
title: "STM32"
description: "本次例程使用的是STM32F103C8T6，一臺windows電腦、杜邦線若干、IMU姿態傳感器。"
---

# STM32

本次例程使用的是STM32F103C8T6，一臺windows電腦、杜邦線若干、IMU姿態傳感器。

[STM32.zip]

使用keil5軟件打開I2C.uvprojx，燒錄程序到STM32F103C8T6核心板中

## 1.連接設備

![1.連接設備 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2Q0Mjk2NGViMmQ1OWZkNzgyNTg5MmNjYTlmNDFmYmJfODkyNjBjYzY2YWQyMjYwMTNlOTVmYjg5ZGZmMThjMjhfSUQ6NzYzODk2NjM4NjgxNTE1OTI1M18xNzgwNDA0MzA1OjE3ODA0OTA3MDVfVjM)

![1.連接設備 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWQwMzQwOWFiMThiZjdjMzg5ZjY4N2VhZjY3NGM1NzJfN2Y1ZTQ4ZTQ2OTgwNzE2YzgwOTk3NWRiOTRkOTg2ODRfSUQ6NzYzODk2NjM4NjA3Mjg0OTM1MV8xNzgwNDA0MzA1OjE3ODA0OTA3MDVfVjM)

## 2.關鍵代碼解析

具體代碼請看資料中的源碼。

```C++
/**
 * @brief 通用读取传感器数据的辅助函数
 *        Generic helper function to read sensor data
 */
static int read_sensor_data(uint8_t reg, uint8_t *buffer, uint16_t length, float out[], uint8_t out_size, float scale_factor, bool is_float)
{
    if (read_register(reg, buffer, length) != 0) {
        return -1;
    }
    
    if (out != NULL) {
        if (is_float) {
            // 处理浮点数数据
            for (uint8_t i = 0; i < out_size; i++) {
                out[i] = to_float(&buffer[i * 4]);
            }
        } else {
            // 处理整数数据并应用缩放因子
            for (uint8_t i = 0; i < out_size; i++) {
                out[i] = to_int16(&buffer[i * 2]) * scale_factor;
            }
        }
    }
    return 0;
}

/**
 * @brief 读取加速度数据（单位 g）
 *        Read acceleration in g.
 */
int IMU_I2C_ReadAccelerometer(float out[3])
{
    uint8_t register_data[6];
    return read_sensor_data(IMU_FUNC_RAW_ACCEL, register_data, 6, out, 3, ACCEL_SCALE_FACTOR, false);
}

/**
 * @brief 读取角速度（单位 rad/s）
 *        Read angular velocity in rad/s.
 */
int IMU_I2C_ReadGyroscope(float out[3])
{
    uint8_t register_data[6];
    return read_sensor_data(IMU_FUNC_RAW_GYRO, register_data, 6, out, 3, GYRO_SCALE_FACTOR, false);
}

/**
 * @brief 读取磁场强度（单位 uT）
 *        Read magnetic field strength in micro tesla.
 */
int IMU_I2C_ReadMagnetometer(float out[3])
{
    uint8_t register_data[6];
    return read_sensor_data(IMU_FUNC_RAW_MAG, register_data, 6, out, 3, MAG_SCALE_FACTOR, false);
}

/**
 * @brief 读取四元数
 *        Read quaternion (w, x, y, z).
 */
int IMU_I2C_ReadQuaternion(float out[4])
{
    uint8_t register_data[16];
    return read_sensor_data(IMU_FUNC_QUAT, register_data, 16, out, 4, 1.0f, true);
}

/**
 * @brief 读取欧拉角（弧度）
 *        Read Euler angles (rad).
 */
int IMU_I2C_ReadEuler(float out[3])
{
    uint8_t register_data[12];
    int result = read_sensor_data(IMU_FUNC_EULER, register_data, 12, out, 3, 1.0f, true);
    
    // 转换为度数
    if (result == 0 && out != NULL) {
        out[0] *= RAD2DEG;
        out[1] *= RAD2DEG;
        out[2] *= RAD2DEG;
    }
    
    return result;
}
/**
 * @brief 读取气压相关数据：高度、温度、气压、气压差
 *        Read barometric data: height, temperature, pressure, delta.
 */
int IMU_I2C_ReadBarometer(float out[4])
{
    uint8_t register_data[16];
    if (read_register(IMU_FUNC_BARO, register_data, 16) != 0) {
        return -1;
    }
    if (out != NULL) {
        out[0] = to_float(&register_data[0]);
        out[1] = to_float(&register_data[4]);
        out[2] = to_float(&register_data[8]);
        out[3] = to_float(&register_data[12]);
    }
    return 0;
}

```

read_sensor_data():通用讀取傳感器數據的輔助函數

IMU_I2C_ReadAccelerometer():讀取加速度數據（單位 g）

IMU_I2C_ReadGyroscope():讀取角速度（單位 rad/s）

IMU_I2C_ReadQuaternion():讀取四元數

IMU_I2C_ReadEuler(): 讀取歐拉角（弧度）

IMU_I2C_ReadBarometer():讀取氣壓相關數據：高度、溫度、氣壓、氣壓差

## 3.讀取imu數據

程序下載進入STM32後，打開串口助手（配置參數如下圖所示），可以看到一直打印IMU模塊的數據，當我們改變IMU模塊的姿態，數據會發生變化。

![3.讀取imu數據 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjA1ZmMyNDNjODU2ZTBhZDAyNTg2ZWQ0YzBjZmY2NTdfMTE0ZmI5ODVkMjg4OGFhMzRlOGIyMTc4Mzk3OTA2ZWZfSUQ6NzYzODk2NjM4NTk3MjIwMjQyN18xNzgwNDA0MzA1OjE3ODA0OTA3MDVfVjM)

注意：以上爲10軸IMU的數據讀取，6軸無磁力計（Magnetometer）與氣壓計（Barometer）數據，9軸無氣壓計（Barometer）數據。

