---
title: Arduino
description: "本例はArduino Nano開発ボード、Windows PC 1台、ジャンパワイヤ数本、IMU姿勢センサー、USB-TTL変換モジュールを使用します。"
---

# Arduino

本例はArduino Nano開発ボード、Windows PC 1台、ジャンパワイヤ数本、IMU姿勢センサー、USB-TTL変換モジュールを使用します。

[Arduino.rar](/downloads/Arduino.rar)



## 1. デバイスの接続


![図 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/1.png)
![1. デバイスの接続 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/2.png)


![図 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/3.jpg)
## 2. キーコードの解説

具体的なコードは資料のソースコードを参照してください。

```C++
//リングバッファ内のデータを解析し、完全なフレームを抽出してキャッシュを更新
//Process RX ring buffer, parse frames and update internal cache
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
    static uint8_t  frame_buffer[64]; //データ部 + チェックサム / data section + checksum
    static uint16_t frame_index = 0;

    uint8_t current_byte = 0;

    //リングバッファ内のすべてのデータを処理
    while (_rxbuf_pop(&current_byte) == 0) {
        switch (rx_state) {
        case RX_STATE_EXPECT_HEAD1:
            //フレームヘッダー1 を探索
            if (current_byte == FRAME_HEAD1) {
                rx_state = RX_STATE_EXPECT_HEAD2;
            }
            //それ以外の場合は現在の状態を維持
            break;

        case RX_STATE_EXPECT_HEAD2:
            //フレームヘッダー2 を探索
            if (current_byte == FRAME_HEAD2) {
                rx_state = RX_STATE_EXPECT_LENGTH;
            } else {
                //フレームヘッダーが一致しないため、探索を最初からやり直す
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
            break;

        case RX_STATE_EXPECT_LENGTH:
            //フレーム長を保存
            frame_length = current_byte;
            rx_state = RX_STATE_EXPECT_FUNCTION;
            break;

        case RX_STATE_EXPECT_FUNCTION:
            //機能コードを保存
            frame_function = current_byte;
            frame_index = 0;
            rx_state = RX_STATE_COLLECT_DATA;
            break;

        case RX_STATE_COLLECT_DATA: {
            //データ長を計算（フレーム長 - フレームヘッダー2バイト - 長さ1バイト - 機能コード1バイト）
            uint16_t data_length = (frame_length >= 4) ? (uint16_t)(frame_length - 4) : 0;
            
            //データ長が有効か確認
            if (data_length == 0 || data_length > sizeof(frame_buffer)) {
                rx_state = RX_STATE_EXPECT_HEAD1;
                break;
            }

            //現在のバイトを保存
            frame_buffer[frame_index++] = current_byte;
            
            //すべてのデータを収集済みか確認
            if (frame_index >= data_length) {
                //チェックサムを計算
                uint8_t calculated_checksum = (uint8_t)(FRAME_HEAD1 + FRAME_HEAD2 + frame_length + frame_function);
                for (uint16_t i = 0; i < data_length - 1; ++i) {
                    calculated_checksum += frame_buffer[i];
                }

                //チェックサムを検証
                uint8_t received_checksum = frame_buffer[data_length - 1];
                if (calculated_checksum == received_checksum) {
                    //検証成功、データを解析
                    _parse_frame_data(frame_function, frame_buffer);
                }
                
                //状態をリセットし、次のフレームの受信に備える
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
        } break;

        default:
            //不明な状態のためリセット
            rx_state = RX_STATE_EXPECT_HEAD1;
            break;
        }
    }
}

//データフレームを解析
static void _parse_frame_data(uint8_t frame_function, const uint8_t *frame_data)
{
    switch (frame_function) {
        case IMU_FUNC_RAW_ACCEL: {
            //定数のスケールファクターを定義
            const float ACCEL_RATIO = 16.0f / 32767.0f;
            const float DEG2RAD = 3.14159265358979323846f / 180.0f;
            const float GYRO_RATIO = (2000.0f / 32767.0f) * DEG2RAD;
            const float MAG_RATIO = 800.0f / 32767.0f;
            
            //加速度データを解析
            s_ax = to_int16(&frame_data[0]) * ACCEL_RATIO;
            s_ay = to_int16(&frame_data[2]) * ACCEL_RATIO;
            s_az = to_int16(&frame_data[4]) * ACCEL_RATIO;

            //ジャイロデータを解析
            s_gx = to_int16(&frame_data[6]) * GYRO_RATIO;
            s_gy = to_int16(&frame_data[8]) * GYRO_RATIO;
            s_gz = to_int16(&frame_data[10]) * GYRO_RATIO;

            //磁力計データを解析
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
            //不明なフレームタイプ、エラー処理を追加可能
            break;
    }
}
```

IMU_UART_Process(): キャッシュのデータを読み取り、通信プロトコルに適合するデータを _parse_frame_data で解析します。

_parse_frame_data(): データフレームを解析します。

## 3. imuデータの読み取り

プログラムをArduinoにダウンロードした後、シリアルアシスタントを開くと（設定パラメータは下図の通り）、IMUモジュールのデータが継続的に印刷されているのがわかります。IMUモジュールの姿勢を変えるとデータが変化します。

![3. imuデータの読み取り – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/4.png)

注意：上記は10軸IMUのデータ読み取りです。6軸は磁力計（Magnetometer）と気圧計（Barometer）データがなく、9軸は気圧計（Barometer）データがありません。
