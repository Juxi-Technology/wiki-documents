# Arduino

本次例程使用的是Arduino Nano开发板，一台windows电脑、杜邦线若干、IMU姿态传感器。

[Arduino.rar]

## 1. 连接设备

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzJmMjA5YmRhYTNmNjEwNmRhOWI2Zjg4NTE5YjFhMzBfYThkNjJlNmM0ZDE0NDdkNWMxZTI0NmVlYmU3OGM2NTZfSUQ6NzYxMTEzNDc0NDcyNTYyMTk0OV8xNzgwMDUyNzM5OjE3ODAxMzkxMzlfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDFiOGRhNjI5YzZiOTU5NTY3Mjk4MWFlZjVlNjc3NGNfZTIxMjNkYzA5ODNhMGRkNDAyMzU2MDczNWM5Yjg3ZTFfSUQ6NzYxMTEzNDk4MzEwNDg1OTA5Ml8xNzgwMDUyNzM5OjE3ODAxMzkxMzlfVjM)

## 2. 关键代码解析

具体代码请看资料中的源码。

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

read_sensor_data(): 通用读取传感器数据的辅助函数

IMU_I2C_ReadAccelerometer(): 读取加速度数据（单位 g）

IMU_I2C_ReadGyroscope(): 读取角速度（单位 rad/s）

IMU_I2C_ReadQuaternion(): 读取四元数

IMU_I2C_ReadEuler(): 读取欧拉角（弧度）

IMU_I2C_ReadBarometer(): 读取气压相关数据：高度、温度、气压、气压差

## 3. 读取imu数据

程序下载进入Arduino后，打开串口助手（配置参数如下图所示），可以看到一直打印IMU模块的数据，当我们改变IMU模块的姿态，数据会发生变化。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY4M2VlMGViYjk1ZGIxOTk4NzlmYmY5N2RkODA5NzRfMDU4MDA5YTIwZDYyYjQ4N2I0MWRmYTEzNWViZTdhYzlfSUQ6NzYxMTEzOTAzMDE2NzYwNDQ0M18xNzgwMDUyNzM5OjE3ODAxMzkxMzlfVjM)

注意：以上为10轴IMU的数据读取，6轴无磁力计（Magnetometer）与气压计（Barometer）数据，9轴无气压计（Barometer）数据。

