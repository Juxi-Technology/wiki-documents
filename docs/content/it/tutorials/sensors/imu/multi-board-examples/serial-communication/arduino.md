---
title: Arduino
description: "Questo esempio usa la scheda di sviluppo Arduino Nano, un PC Windows, diversi cavi jumper, il sensore di assetto IMU e un modulo USB-TTL."
---

# Arduino

Questo esempio usa la scheda di sviluppo Arduino Nano, un PC Windows, diversi cavi jumper, il sensore di assetto IMU e un modulo USB-TTL.

[Arduino.rar](/downloads/Arduino.rar)



## 1. Collegare il dispositivo


![Immagine 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/1.png)
![1. Collegare il dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/1.png)


![Immagine 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/3.jpg)
## 2. Spiegazione del codice chiave

Il codice concreto si trova nel codice sorgente dei materiali.

```C++
//Analizza i dati nel ring buffer, estrai i frame completi e aggiorna la cache
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
    static uint8_t  frame_buffer[64]; //Sezione dati + checksum
    static uint16_t frame_index = 0;

    uint8_t current_byte = 0;

    //Elabora tutti i dati nel ring buffer
    while (_rxbuf_pop(&current_byte) == 0) {
        switch (rx_state) {
        case RX_STATE_EXPECT_HEAD1:
            //Cerca l'intestazione di frame 1
            if (current_byte == FRAME_HEAD1) {
                rx_state = RX_STATE_EXPECT_HEAD2;
            }
            //Altrimenti resta nello stato corrente
            break;

        case RX_STATE_EXPECT_HEAD2:
            //Cerca l'intestazione di frame 2
            if (current_byte == FRAME_HEAD2) {
                rx_state = RX_STATE_EXPECT_LENGTH;
            } else {
                //Intestazione di frame non corrispondente, riavvia la ricerca
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
            break;

        case RX_STATE_EXPECT_LENGTH:
            //Salva la lunghezza del frame
            frame_length = current_byte;
            rx_state = RX_STATE_EXPECT_FUNCTION;
            break;

        case RX_STATE_EXPECT_FUNCTION:
            //Salva il codice funzione
            frame_function = current_byte;
            frame_index = 0;
            rx_state = RX_STATE_COLLECT_DATA;
            break;

        case RX_STATE_COLLECT_DATA: {
            //Calcola la lunghezza dei dati (lunghezza frame - 2 byte di intestazione - 1 byte di lunghezza - 1 byte di codice funzione)
            uint16_t data_length = (frame_length >= 4) ? (uint16_t)(frame_length - 4) : 0;
            
            //Verifica se la lunghezza dei dati è valida
            if (data_length == 0 || data_length > sizeof(frame_buffer)) {
                rx_state = RX_STATE_EXPECT_HEAD1;
                break;
            }

            //Memorizza il byte corrente
            frame_buffer[frame_index++] = current_byte;
            
            //Verifica se tutti i dati sono stati raccolti
            if (frame_index >= data_length) {
                //Calcola il checksum
                uint8_t calculated_checksum = (uint8_t)(FRAME_HEAD1 + FRAME_HEAD2 + frame_length + frame_function);
                for (uint16_t i = 0; i < data_length - 1; ++i) {
                    calculated_checksum += frame_buffer[i];
                }

                //Verifica il checksum
                uint8_t received_checksum = frame_buffer[data_length - 1];
                if (calculated_checksum == received_checksum) {
                    //Checksum corretto, analizza i dati
                    _parse_frame_data(frame_function, frame_buffer);
                }
                
                //Reimposta lo stato, pronto a ricevere il frame successivo
                rx_state = RX_STATE_EXPECT_HEAD1;
            }
        } break;

        default:
            //Stato sconosciuto, reimposta
            rx_state = RX_STATE_EXPECT_HEAD1;
            break;
        }
    }
}

//Analizza il frame di dati
static void _parse_frame_data(uint8_t frame_function, const uint8_t *frame_data)
{
    switch (frame_function) {
        case IMU_FUNC_RAW_ACCEL: {
            //Definisci i fattori di scala costanti
            const float ACCEL_RATIO = 16.0f / 32767.0f;
            const float DEG2RAD = 3.14159265358979323846f / 180.0f;
            const float GYRO_RATIO = (2000.0f / 32767.0f) * DEG2RAD;
            const float MAG_RATIO = 800.0f / 32767.0f;
            
            //Analizza i dati di accelerazione
            s_ax = to_int16(&frame_data[0]) * ACCEL_RATIO;
            s_ay = to_int16(&frame_data[2]) * ACCEL_RATIO;
            s_az = to_int16(&frame_data[4]) * ACCEL_RATIO;

            //Analizza i dati del giroscopio
            s_gx = to_int16(&frame_data[6]) * GYRO_RATIO;
            s_gy = to_int16(&frame_data[8]) * GYRO_RATIO;
            s_gz = to_int16(&frame_data[10]) * GYRO_RATIO;

            //Analizza i dati del magnetometro
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
            //Tipo di frame sconosciuto, è possibile aggiungere la gestione degli errori
            break;
    }
}
```

IMU_UART_Process(): legge i dati dalla cache e chiama _parse_frame_data per analizzare i dati conformi al protocollo.

_parse_frame_data(): analizza la trama dati.

## 3. Leggere i dati IMU

Dopo il download del programma sull'Arduino, aprire l'assistente seriale (parametri come mostrato sotto): i dati del modulo IMU vengono stampati in continuo. Cambiando l'orientamento del modulo IMU, i dati cambiano.

![3. Leggere i dati IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino/4.png)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.
