# STM32 F103C8T6

本次例程使用的是STM32F103C8T6核心板，一臺windows電腦、杜邦線若干、IMU姿態傳感器。

\[STM32\.zip\]

使用keil5軟件打開USART\.uvprojx，燒錄程序到STM32F103C8T6核心板中

## 1\.連接設備

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzRhZDRjNDJmNDc4MmNlYjYwMmQwZWY3NzZjOWQyMmNfNjU1OWIyMTgwNzg3NTQ4NGUzN2ZhNjNlZGNhM2MxNjlfSUQ6NzYzODk2NTcxMjI3MDk1MzQwMF8xNzgwNDA0NDI4OjE3ODA0OTA4MjhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjU0ZWRkODdkMGM0NjY3MTlhZjkyOTc0Yjk3ZjI5ZWZfNTdmN2ZkNTgwYTYzZDM4YWNkODNkOGI5MTA0NDI1YmRfSUQ6NzYzODk2NTcxMjUwMTU0MTgzN18xNzgwNDA0NDI4OjE3ODA0OTA4MjhfVjM)

## 2\.關鍵代碼解析

具體代碼請看資料中的源碼。

```Python
//解析环形缓冲中的数据，提取完整帧并更新缓存
​
//Process RX ring buffer, parse frames and update internal cache
​
void IMU_UART_Process(void)
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
    static uint8_t  frame_buffer[64]; /* 数据区 + 校验 / data section + checksum */
    static uint16_t frame_index = 0;

    uint8_t current_byte = 0;

    // 处理环形缓冲区中的所有数据
    while (_rxbuf_pop(&current_byte) == 0) {
        switch (rx_state) {
        case RX_STATE_EXPECT_HEAD1:
            // 寻找帧头1
            if (current_byte == FRAME_HEAD1) {
                rx_state = RX_STATE_EXPECT_HEAD2;
            }
            // 否则保持在当前状态
            break;

        case RX_STATE_EXPECT_HEAD2:
            // 寻找帧头2
            if (current_byte == FRAME_HEAD2) {
                rx_state = RX_STATE_EXPECT_LENGTH;
            } else {
                // 帧头不匹配，重新开始寻找
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
            break;

        case RX_STATE_EXPECT_LENGTH:
            // 保存帧长度
            frame_length = current_byte;
            rx_state = RX_STATE_EXPECT_FUNCTION;
            break;

        case RX_STATE_EXPECT_FUNCTION:
            // 保存功能码
            frame_function = current_byte;
            frame_index = 0;
            rx_state = RX_STATE_COLLECT_DATA;
            break;

        case RX_STATE_COLLECT_DATA: {
            // 计算数据长度（帧长度 - 帧头2字节 - 长度1字节 - 功能码1字节）
            uint16_t data_length = (frame_length >= 4) ? (uint16_t)(frame_length - 4) : 0;
            
            // 检查数据长度是否有效
            if (data_length == 0 || data_length > sizeof(frame_buffer)) {
                rx_state = RX_STATE_EXPECT_HEAD1;
                break;
            }

            // 存储当前字节
            frame_buffer[frame_index++] = current_byte;
            
            // 检查是否收集完所有数据
            if (frame_index >= data_length) {
                // 计算校验和
                uint8_t calculated_checksum = (uint8_t)(FRAME_HEAD1 + FRAME_HEAD2 + frame_length + frame_function);
                for (uint16_t i = 0; i < data_length - 1; ++i) {
                    calculated_checksum += frame_buffer[i];
                }

                // 验证校验和
                uint8_t received_checksum = frame_buffer[data_length - 1];
                if (calculated_checksum == received_checksum) {
                    // 校验通过，解析数据
                    _parse_frame_data(frame_function, frame_buffer);
                }
                
                // 重置状态，准备接收下一帧
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
        } break;

        default:
            // 未知状态，重置
            rx_state = RX_STATE_EXPECT_HEAD1;
            break;
        }
    }
}
​
​
/* ---------- 解析数据帧 / Parse one complete frame ---------- */
static void _parse_frame_data(uint8_t frame_function, const uint8_t *frame_data)
{
    switch (frame_function) {
        case IMU_FUNC_RAW_ACCEL: {
            // 定义常量比例因子
            const float ACCEL_RATIO = 16.0f / 32767.0f;
            const float DEG2RAD = 3.14159265358979323846f / 180.0f;
            const float GYRO_RATIO = (2000.0f / 32767.0f) * DEG2RAD;
            const float MAG_RATIO = 800.0f / 32767.0f;
            
            // 解析加速度数据
            s_ax = to_int16(&frame_data[0])  * ACCEL_RATIO;
            s_ay = to_int16(&frame_data[2])  * ACCEL_RATIO;
            s_az = to_int16(&frame_data[4])  * ACCEL_RATIO;

            // 解析陀螺仪数据
            s_gx = to_int16(&frame_data[6])  * GYRO_RATIO;
            s_gy = to_int16(&frame_data[8])  * GYRO_RATIO;
            s_gz = to_int16(&frame_data[10]) * GYRO_RATIO;

            // 解析磁力计数据
            s_mx = to_int16(&frame_data[12]) * MAG_RATIO;
            s_my = to_int16(&frame_data[14]) * MAG_RATIO;
            s_mz = to_int16(&frame_data[16]) * MAG_RATIO;
            break;
        }
        case IMU_FUNC_EULER:
            s_roll  = to_float(&frame_data[0]);
            s_pitch = to_float(&frame_data[4]);
            s_yaw   = to_float(&frame_data[8]);
            break;
        case IMU_FUNC_QUAT:
            s_q0 = to_float(&frame_data[0]);
            s_q1 = to_float(&frame_data[4]);
            s_q2 = to_float(&frame_data[8]);
            s_q3 = to_float(&frame_data[12]);
            break;
        case IMU_FUNC_BARO:
            s_height            = to_float(&frame_data[0]);
            s_temperature       = to_float(&frame_data[4]);
            s_pressure          = to_float(&frame_data[8]);
            s_pressure_contrast = to_float(&frame_data[12]);
            break;
        case IMU_FUNC_VERSION:
            s_version_high = frame_data[0];
            s_version_mid  = frame_data[1];
            s_version_low  = frame_data[2];
            break;
        case IMU_FUNC_RETURN_STATE:
            s_last_rx_function = frame_data[0];
            s_last_rx_state    = (int16_t)frame_data[1];
            break;
        default:
            // 未知帧类型，可添加错误处理
            break;
    }
}
```

IMU\_UART\_Process\(\): 讀取緩存的數據，並調用\_parse\_frame\_data解析符合通信協議的數據。

\_parse\_frame\_data\(\)：解析數據。

## 3\.讀取imu數據

程序下載進入STM32後，打開串口助手（配置參數如下圖所示），可以看到一直打印IMU模塊的數據，當我們改變IMU模塊的姿態，數據會發生變化。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmEwZGQ2YTczYTgyM2NjYmUxMGE0YTU2ZTBkODk5ODhfOWI4OWE5OTJiMWI3MzY5OTQwZDE3ZmI4NjNhMDM1NjFfSUQ6NzYzODk2NTcxNDQxOTY5ODY2NV8xNzgwNDA0NDI4OjE3ODA0OTA4MjhfVjM)

注意：以上爲10軸IMU的數據讀取，6軸無磁力計（Magnetometer）與氣壓計（Barometer）數據，9軸無氣壓計（Barometer）數據。



