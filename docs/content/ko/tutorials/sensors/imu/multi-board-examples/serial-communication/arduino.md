---
title: Arduino
description: "본 예제는 Arduino Nano 개발 보드, Windows PC 1대, 점퍼 와이어 여러 개, IMU 자세 센서, USB-TTL 변환 모듈을 사용합니다."
---

# Arduino

본 예제는 Arduino Nano 개발 보드, Windows PC 1대, 점퍼 와이어 여러 개, IMU 자세 센서, USB-TTL 변환 모듈을 사용합니다.

Arduino.rar



## 1. 장치 연결

![1. 장치 연결 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDZkYTc3ZWEyODIzYjQzMDBjYzcwODY5MmM2OWQ2MWZfOTQ3MjMyNWZjMTlmNGM1ZDdkMTg2MWU3ZDQxMjEyNzVfSUQ6NzYxMTEzNTIxMjUzMzQ1MTk5MF8xNzgwMDUyNTU0OjE3ODAxMzg5NTRfVjM)

## 2. 핵심 코드 해설

구체적인 코드는 자료의 소스 코드를 참조하세요.

```C++
//解析环形缓冲中的数据，提取完整帧并更新缓存
//Process RX ring buffer, parse frames and update internal cache
void IMU_UART_Process()
{
    enum {
        RX_STATE_EXPECT_HEAD1 = 0,
        RX_STATE_EXPECT_HEAD2,
        RX_STATE_EXPECT_LENGTH,
        RX_STATE_EXPECT_FUNCTION,
        RX_STATE_COLLECT_DATA
    };

    static uint8_t  rx_state = RX_STATE_EXPECT_HEAD1;
    static uint8_t  frame_length = 0;
    static uint8_t  frame_function = 0;
    static uint8_t  frame_buffer[64]; //数据区 + 校验 / data section + checksum
    static uint16_t frame_index = 0;

    uint8_t current_byte = 0;

    //处理环形缓冲区中的所有数据
    while (_rxbuf_pop(&current_byte) == 0) {
        switch (rx_state) {
        case RX_STATE_EXPECT_HEAD1:
            //寻找帧头1
            if (current_byte == FRAME_HEAD1) {
                rx_state = RX_STATE_EXPECT_HEAD2;
            }
            //否则保持在当前状态
            break;

        case RX_STATE_EXPECT_HEAD2:
            //寻找帧头2
            if (current_byte == FRAME_HEAD2) {
                rx_state = RX_STATE_EXPECT_LENGTH;
            } else {
                //帧头不匹配，重新开始寻找
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
            break;

        case RX_STATE_EXPECT_LENGTH:
            //保存帧长度
            frame_length = current_byte;
            rx_state = RX_STATE_EXPECT_FUNCTION;
            break;

        case RX_STATE_EXPECT_FUNCTION:
            //保存功能码
            frame_function = current_byte;
            frame_index = 0;
            rx_state = RX_STATE_COLLECT_DATA;
            break;

        case RX_STATE_COLLECT_DATA: {
            //计算数据长度（帧长度 - 帧头2字节 - 长度1字节 - 功能码1字节）
            uint16_t data_length = (frame_length >= 4) ? (uint16_t)(frame_length - 4) : 0;
            
            //检查数据长度是否有效
            if (data_length == 0 || data_length > sizeof(frame_buffer)) {
                rx_state = RX_STATE_EXPECT_HEAD1;
                break;
            }

            //存储当前字节
            frame_buffer[frame_index++] = current_byte;
            
            //检查是否收集完所有数据
            if (frame_index >= data_length) {
                //计算校验和
                uint8_t calculated_checksum = (uint8_t)(FRAME_HEAD1 + FRAME_HEAD2 + frame_length + frame_function);
                for (uint16_t i = 0; i < data_length - 1; ++i) {
                    calculated_checksum += frame_buffer[i];
                }

                //验证校验和
                uint8_t received_checksum = frame_buffer[data_length - 1];
                if (calculated_checksum == received_checksum) {
                    //校验通过，解析数据
                    _parse_frame_data(frame_function, frame_buffer);
                }
                
                //重置状态，准备接收下一帧
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
        } break;

        default:
            //未知状态，重置
            rx_state = RX_STATE_EXPECT_HEAD1;
            break;
        }
    }
}

//解析数据帧
static void _parse_frame_data(uint8_t frame_function, const uint8_t *frame_data)
{
    switch (frame_function) {
        case IMU_FUNC_RAW_ACCEL: {
            //定义常量比例因子
            const float ACCEL_RATIO = 16.0f / 32767.0f;
            const float DEG2RAD = 3.14159265358979323846f / 180.0f;
            const float GYRO_RATIO = (2000.0f / 32767.0f) * DEG2RAD;
            const float MAG_RATIO = 800.0f / 32767.0f;
            
            //解析加速度数据
            s_ax = to_int16(&frame_data[0]) * ACCEL_RATIO;
            s_ay = to_int16(&frame_data[2]) * ACCEL_RATIO;
            s_az = to_int16(&frame_data[4]) * ACCEL_RATIO;

            //解析陀螺仪数据
            s_gx = to_int16(&frame_data[6]) * GYRO_RATIO;
            s_gy = to_int16(&frame_data[8]) * GYRO_RATIO;
            s_gz = to_int16(&frame_data[10]) * GYRO_RATIO;

            //解析磁力计数据
            s_mx = to_int16(&frame_data[12]) * MAG_RATIO;
            s_my = to_int16(&frame_data[14]) * MAG_RATIO;
            s_mz = to_int16(&frame_data[16]) * MAG_RATIO;
            break;
        }
        case IMU_FUNC_EULER:
            s_roll = to_float(&frame_data[0]);
            s_pitch = to_float(&frame_data[4]);
            s_yaw = to_float(&frame_data[8]);
            break;
        case IMU_FUNC_QUAT:
            s_q0 = to_float(&frame_data[0]);
            s_q1 = to_float(&frame_data[4]);
            s_q2 = to_float(&frame_data[8]);
            s_q3 = to_float(&frame_data[12]);
            break;
        case IMU_FUNC_BARO:
            s_height = to_float(&frame_data[0]);
            s_temperature = to_float(&frame_data[4]);
            s_pressure = to_float(&frame_data[8]);
            s_pressure_contrast = to_float(&frame_data[12]);
            break;
        case IMU_FUNC_VERSION:
            s_version_high = frame_data[0];
            s_version_mid = frame_data[1];
            s_version_low = frame_data[2];
            break;
        case IMU_FUNC_RETURN_STATE:
            s_last_rx_function = frame_data[0];
            s_last_rx_state = (int16_t)frame_data[1];
            break;
        default:
            //未知帧类型，可添加错误处理
            break;
    }
}
```

IMU_UART_Process(): 캐시된 데이터를 읽고, 통신 프로토콜에 맞는 데이터를 _parse_frame_data로 파싱합니다.

_parse_frame_data(): 데이터 프레임을 파싱합니다.

## 3. imu 데이터 읽기

프로그램이 Arduino에 다운로드된 후 시리얼 어시스턴트를 열면(설정 파라미터는 아래 그림 참조) IMU 모듈의 데이터가 계속 출력되는 것을 볼 수 있습니다. IMU 모듈의 자세를 바꾸면 데이터가 변화합니다.

![3. imu 데이터 읽기 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDRjOWI4OGZhZWY0MTVjMTkwNzM5NzY3MzNmYjcwYmFfNDJmMjYwZGU4MjkwMTJjNjEzZDQ5OWQ0NTFiMmQ3ZmZfSUQ6NzYxMTEzNTIyOTg2NDA3MDM2OF8xNzgwMDUyNTU0OjE3ODAxMzg5NTRfVjM)

주의: 위는 10축 IMU 데이터 읽기입니다. 6축은 자기력계(Magnetometer)와 기압계(Barometer) 데이터가 없고, 9축은 기압계(Barometer) 데이터가 없습니다.
