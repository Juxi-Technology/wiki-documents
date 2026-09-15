---
title: "STM32"
description: "Cet exemple utilise le STM32F103C8T6, un PC Windows, plusieurs câbles de liaison et le capteur d'attitude IMU."
---

# STM32

Cet exemple utilise le STM32F103C8T6, un PC Windows, plusieurs câbles de liaison et le capteur d'attitude IMU.

[STM32.zip]

Ouvrir I2C.uvprojx avec keil5 et flasher le programme sur la carte cœur STM32F103C8T6

## 1. Connecter le périphérique

![1. Connecter le périphérique – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDBhYjMxNjllNDYyZDNkNWIzMWRhZjNmNTJiYjg5YjNfNWFiNDE1MjM4NWZlMjk2YWJkMjQ1YWVjMzI3NzkzODdfSUQ6NzYxMTg4NzEyMzkzMDk3NTQyOF8xNzgwMDUyNzI4OjE3ODAxMzkxMjhfVjM)

## 2. Explication du code clé

Le code concret se trouve dans le code source des documents.

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

read_sensor_data() : fonction auxiliaire générique de lecture de données capteur

IMU_I2C_ReadAccelerometer() : lire les données d'accélération (unité g)

IMU_I2C_ReadGyroscope() : lire la vitesse angulaire (unité rad/s)

IMU_I2C_ReadQuaternion() : lire le quaternion

IMU_I2C_ReadEuler() : lire les angles d'Euler (radians)

IMU_I2C_ReadBarometer() : lire les données barométriques : altitude, température, pression, écart de pression

## 3. Lire les données IMU

Après avoir téléchargé le programme sur l'Arduino, ouvrir l'assistant série (paramètres comme ci-dessous) : les données du module IMU sont imprimées en continu. En changeant l'orientation du module IMU, les données changent.

![3. Lire les données IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTVkMTQ0YWRiMWEzODc3ZDcxM2FhNjY2ZjdhZDlmZGJfMzE1YWM3MzYxYTQzMzlkZjU3MTkzNmE0Nzk2OTBiN2RfSUQ6NzYxMTEzNzIyNzkxODg4Nzg5NV8xNzgwMDUyNzI4OjE3ODAxMzkxMjhfVjM)

Remarque : ce qui précède concerne un IMU 10 axes ; les 6 axes n'ont pas de magnétomètre ni de baromètre, les 9 axes pas de baromètre.
