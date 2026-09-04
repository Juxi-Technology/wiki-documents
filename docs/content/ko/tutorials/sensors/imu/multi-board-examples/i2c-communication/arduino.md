---
title: Arduino
description: "본 예제는 Arduino Nano 개발 보드, Windows PC 1대, 점퍼 와이어 여러 개, IMU 자세 센서를 사용합니다."
---

# Arduino

본 예제는 Arduino Nano 개발 보드, Windows PC 1대, 점퍼 와이어 여러 개, IMU 자세 센서를 사용합니다.

[Arduino.rar]



## 1. 장치 연결

![1. 장치 연결 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzJmMjA5YmRhYTNmNjEwNmRhOWI2Zjg4NTE5YjFhMzBfYThkNjJlNmM0ZDE0NDdkNWMxZTI0NmVlYmU3OGM2NTZfSUQ6NzYxMTEzNDc0NDcyNTYyMTk0OV8xNzgwMDUyNzM5OjE3ODAxMzkxMzlfVjM)

## 2. 핵심 코드 해설

구체적인 코드는 자료의 소스 코드를 참조하세요.

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

read_sensor_data(): 범용 센서 데이터 읽기 보조 함수

IMU_I2C_ReadAccelerometer(): 가속도 데이터 읽기(단위 g)

IMU_I2C_ReadGyroscope(): 각속도 읽기(단위 rad/s)

IMU_I2C_ReadQuaternion(): 쿼터니언 읽기

IMU_I2C_ReadEuler(): 오일러 각 읽기(라디안)

IMU_I2C_ReadBarometer(): 기압 관련 데이터 읽기: 고도, 온도, 기압, 기압차

## 3. imu 데이터 읽기

프로그램이 Arduino에 다운로드된 후 시리얼 어시스턴트를 열면(설정 파라미터는 아래 그림 참조) IMU 모듈의 데이터가 계속 출력되는 것을 볼 수 있습니다. IMU 모듈의 자세를 바꾸면 데이터가 변화합니다.

![3. imu 데이터 읽기 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDFiOGRhNjI5YzZiOTU5NTY3Mjk4MWFlZjVlNjc3NGNfZTIxMjNkYzA5ODNhMGRkNDAyMzU2MDczNWM5Yjg3ZTFfSUQ6NzYxMTEzNDk4MzEwNDg1OTA5Ml8xNzgwMDUyNzM5OjE3ODAxMzkxMzlfVjM)

주의: 위는 10축 IMU 데이터 읽기입니다. 6축은 자기력계(Magnetometer)와 기압계(Barometer) 데이터가 없고, 9축은 기압계(Barometer) 데이터가 없습니다.
