---
title: "STM32"
description: "Este ejemplo usa la placa núcleo STM32F103C8T6, un PC Windows, varios cables de puente y el sensor de actitud IMU."
---

# STM32

Este ejemplo usa la placa núcleo STM32F103C8T6, un PC Windows, varios cables de puente y el sensor de actitud IMU.

[STM32.zip](/downloads/STM32.zip)

Abrir USART.uvprojx con keil5 y grabar el programa en la placa núcleo STM32F103C8T6

## 1. Conectar el dispositivo

![1. Conectar el dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32/1.png)

## 2. Explicación del código clave


![Imagen 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32/2.png)
El código concreto está en el código fuente de los materiales.

```c++
//Analizar los datos del búfer circular, extraer las tramas completas y actualizar la caché
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
    static uint8_t  frame_buffer[64]; //Sección de datos + suma de verificación / data section + checksum
    static uint16_t frame_index = 0;

    uint8_t current_byte = 0;

    //Procesar todos los datos del búfer circular
    while (_rxbuf_pop(&current_byte) == 0) {
        switch (rx_state) {
        case RX_STATE_EXPECT_HEAD1:
            //Buscar la cabecera de trama 1
            if (current_byte == FRAME_HEAD1) {
                rx_state = RX_STATE_EXPECT_HEAD2;
            }
            //De lo contrario, mantener el estado actual
            break;

        case RX_STATE_EXPECT_HEAD2:
            //Buscar la cabecera de trama 2
            if (current_byte == FRAME_HEAD2) {
                rx_state = RX_STATE_EXPECT_LENGTH;
            } else {
                //La cabecera de trama no coincide: reiniciar la búsqueda
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
            break;

        case RX_STATE_EXPECT_LENGTH:
            //Guardar la longitud de la trama
            frame_length = current_byte;
            rx_state = RX_STATE_EXPECT_FUNCTION;
            break;

        case RX_STATE_EXPECT_FUNCTION:
            //Guardar el código de función
            frame_function = current_byte;
            frame_index = 0;
            rx_state = RX_STATE_COLLECT_DATA;
            break;

        case RX_STATE_COLLECT_DATA: {
            //Calcular la longitud de datos (longitud de trama - 2 bytes de cabecera - 1 byte de longitud - 1 byte de código de función)
            uint16_t data_length = (frame_length >= 4) ? (uint16_t)(frame_length - 4) : 0;
            
            //Comprobar si la longitud de datos es válida
            if (data_length == 0 || data_length > sizeof(frame_buffer)) {
                rx_state = RX_STATE_EXPECT_HEAD1;
                break;
            }

            //Almacenar el byte actual
            frame_buffer[frame_index++] = current_byte;
            
            //Comprobar si se han recopilado todos los datos
            if (frame_index >= data_length) {
                //Calcular la suma de verificación
                uint8_t calculated_checksum = (uint8_t)(FRAME_HEAD1 + FRAME_HEAD2 + frame_length + frame_function);
                for (uint16_t i = 0; i < data_length - 1; ++i) {
                    calculated_checksum += frame_buffer[i];
                }

                //Verificar la suma de verificación
                uint8_t received_checksum = frame_buffer[data_length - 1];
                if (calculated_checksum == received_checksum) {
                    //Verificación correcta: analizar los datos
                    _parse_frame_data(frame_function, frame_buffer);
                }
                
                //Restablecer el estado, preparado para recibir la siguiente trama
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
        } break;

        default:
            //Estado desconocido, restablecer
            rx_state = RX_STATE_EXPECT_HEAD1;
            break;
        }
    }
}

//Analizar la trama de datos
static void _parse_frame_data(uint8_t frame_function, const uint8_t *frame_data)
{
    switch (frame_function) {
        case IMU_FUNC_RAW_ACCEL: {
            //Definir las constantes del factor de escala
            const float ACCEL_RATIO = 16.0f / 32767.0f;
            const float DEG2RAD = 3.14159265358979323846f / 180.0f;
            const float GYRO_RATIO = (2000.0f / 32767.0f) * DEG2RAD;
            const float MAG_RATIO = 800.0f / 32767.0f;
            
            //Analizar los datos del acelerómetro
            s_ax = to_int16(&frame_data[0]) * ACCEL_RATIO;
            s_ay = to_int16(&frame_data[2]) * ACCEL_RATIO;
            s_az = to_int16(&frame_data[4]) * ACCEL_RATIO;

            //Analizar los datos del giroscopio
            s_gx = to_int16(&frame_data[6]) * GYRO_RATIO;
            s_gy = to_int16(&frame_data[8]) * GYRO_RATIO;
            s_gz = to_int16(&frame_data[10]) * GYRO_RATIO;

            //Analizar los datos del magnetómetro
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
            //Tipo de trama desconocido; se puede añadir gestión de errores
            break;
    }
}
```

IMU_UART_Process(): lee los datos de la caché y llama a _parse_frame_data para analizar los datos que cumplen el protocolo.

_parse_frame_data(): analiza la trama de datos.

## 3. Leer datos IMU

Tras descargar el programa en el Arduino, abrir el asistente serie (parámetros como se muestra abajo): los datos del módulo IMU se imprimen continuamente. Al cambiar la orientación del módulo IMU, los datos cambian.

![3. Leer datos IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32/3.png)

Nota: lo anterior son datos de un IMU de 10 ejes; los de 6 ejes no tienen magnetómetro ni barómetro, los de 9 ejes no tienen barómetro.
