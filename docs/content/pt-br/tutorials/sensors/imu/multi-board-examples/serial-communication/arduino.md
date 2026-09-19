---
title: Arduino
description: "Este exemplo usa uma placa de desenvolvimento Arduino Nano, um computador Windows, alguns fios Dupont, um sensor de atitude IMU e um módulo USB para TTL."
---

# Arduino

Este exemplo usa uma placa de desenvolvimento Arduino Nano, um computador Windows, alguns fios Dupont, um sensor de atitude IMU e um módulo USB para TTL. 

[Arduino.rar](/downloads/Arduino.rar)

## 1. Conectar o dispositivo

![1. Connect the device – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/1.png)

![1. Connect the device – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/2.png)

![1. Connect the device – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/3.jpg)

## 2. Análise do Código Principal

Consulte o código-fonte nos materiais para ver o código específico.

```C++
//Analisar os dados do buffer circular, extrair quadros completos e atualizar o cache

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
    static uint8_t  frame_buffer[64]; /* 数据区 + 校验 / data section + checksum */
    static uint16_t frame_index = 0;

    uint8_t current_byte = 0;

    // Processar todos os dados do buffer circular
    while (_rxbuf_pop(&current_byte) == 0) {
        switch (rx_state) {
        case RX_STATE_EXPECT_HEAD1:
            // Procurar o cabeçalho 1 do quadro
            if (current_byte == FRAME_HEAD1) {
                rx_state = RX_STATE_EXPECT_HEAD2;
            }
            // Caso contrário, permanecer no estado atual
            break;

        case RX_STATE_EXPECT_HEAD2:
            // Procurar o cabeçalho 2 do quadro
            if (current_byte == FRAME_HEAD2) {
                rx_state = RX_STATE_EXPECT_LENGTH;
            } else {
                // Cabeçalho do quadro não corresponde; recomeçar a busca
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
            break;

        case RX_STATE_EXPECT_LENGTH:
            // Salvar o comprimento do quadro
            frame_length = current_byte;
            rx_state = RX_STATE_EXPECT_FUNCTION;
            break;

        case RX_STATE_EXPECT_FUNCTION:
            // Salvar o código de função
            frame_function = current_byte;
            frame_index = 0;
            rx_state = RX_STATE_COLLECT_DATA;
            break;

        case RX_STATE_COLLECT_DATA: {
            // Calcular o comprimento dos dados (comprimento do quadro - 2 bytes do cabeçalho - 1 byte de comprimento - 1 byte do código de função)
            uint16_t data_length = (frame_length >= 4) ? (uint16_t)(frame_length - 4) : 0;
            
            // Verificar se o comprimento dos dados é válido
            if (data_length == 0 || data_length > sizeof(frame_buffer)) {
                rx_state = RX_STATE_EXPECT_HEAD1;
                break;
            }

            // Armazenar o byte atual
            frame_buffer[frame_index++] = current_byte;
            
            // Verificar se todos os dados foram coletados
            if (frame_index >= data_length) {
                // Calcular o checksum
                uint8_t calculated_checksum = (uint8_t)(FRAME_HEAD1 + FRAME_HEAD2 + frame_length + frame_function);
                for (uint16_t i = 0; i < data_length - 1; ++i) {
                    calculated_checksum += frame_buffer[i];
                }

                // Validar o checksum
                uint8_t received_checksum = frame_buffer[data_length - 1];
                if (calculated_checksum == received_checksum) {
                    // Checksum validado; analisar os dados
                    _parse_frame_data(frame_function, frame_buffer);
                }
                
                // Redefinir o estado e preparar-se para receber o próximo quadro
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
        } break;

        default:
            // Estado desconhecido; redefinir
            rx_state = RX_STATE_EXPECT_HEAD1;
            break;
        }
    }
}


/* ---------- 解析数据帧 / Parse one complete frame ---------- */
static void _parse_frame_data(uint8_t frame_function, const uint8_t *frame_data)
{
    switch (frame_function) {
        case IMU_FUNC_RAW_ACCEL: {
            // Definir o fator de escala constante
            const float ACCEL_RATIO = 16.0f / 32767.0f;
            const float DEG2RAD = 3.14159265358979323846f / 180.0f;
            const float GYRO_RATIO = (2000.0f / 32767.0f) * DEG2RAD;
            const float MAG_RATIO = 800.0f / 32767.0f;
            
            // Analisar os dados do acelerômetro
            s_ax = to_int16(&frame_data[0])  * ACCEL_RATIO;
            s_ay = to_int16(&frame_data[2])  * ACCEL_RATIO;
            s_az = to_int16(&frame_data[4])  * ACCEL_RATIO;

            // Analisar os dados do giroscópio
            s_gx = to_int16(&frame_data[6])  * GYRO_RATIO;
            s_gy = to_int16(&frame_data[8])  * GYRO_RATIO;
            s_gz = to_int16(&frame_data[10]) * GYRO_RATIO;

            // Analisar os dados do magnetômetro
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
            // Tipo de quadro desconhecido; pode-se adicionar tratamento de erros
            break;
    }
}
```

IMU_UART_Process(): Lê os dados do buffer e chama _parse_frame_data para analisar os dados que estão em conformidade com o Protocolo de Comunicação. 

_parse_frame_data(): Analisa o quadro de dados.

## 3. Ler os dados do IMU

Depois que o programa é gravado no Arduino, abra o assistente de porta serial (configure os parâmetros conforme mostrado na figura abaixo) e você verá que os dados do módulo IMU são impressos continuamente. Quando mudamos a atitude do módulo IMU, os dados mudam. 

![3. Read IMU data – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/4.png)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.



