---
title: "Informazioni prodotto"
description: "Sensore di assetto IMU ad alta precisione: processore 72MHz 32 bit, calcolo in tempo reale, fino a 100Hz"
---

# Informazioni prodotto

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


Sensore di assetto IMU ad alta precisione con **processore 32 bit ad alte prestazioni da 72MHz**, in grado di calcolare l'assetto in tempo reale e di effettuare la compensazione dinamica, con frequenza di aggiornamento dei dati fino a **100Hz**, che unisce i vantaggi di una risposta rapida e di un'uscita stabile. Supporta sia la modalità di comunicazione IIC che quella seriale, è compatibile con microcontrollori e host Linux e si integra senza soluzione di continuità con il sistema ROS; ampiamente applicabile a scenari ad alte prestazioni come il controllo del movimento dei robot, la stabilizzazione dell'assetto dei droni e la navigazione e il posizionamento intelligenti.

# 1. Panoramica delle versioni

| Confronto delle prestazioni |                                                      |                                                              |                                                              |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                             | 6 assi                                               | 9 assi                                                       | 10 assi                                                      |
| Processore 32 bit ad alte prestazioni | √                                         | √                                                            | √                                                            |
| Giroscopio 3 assi           | √                                                    | √                                                            | √                                                            |
| Accelerometro 3 assi        | √                                                    | √                                                            | √                                                            |
| Magnetometro 3 assi         | -                                                    | √                                                            | √                                                            |
| Barometro                   | -                                                    | -                                                            | √                                                            |
| Algoritmo di fusione dei dati di assetto AHRS | -                                        | √                                                            | √                                                            |
| Algoritmo del filtro di Mahony | √                                                 | √                                                            | √                                                            |
| Interfaccia di comunicazione | Type-C (richiede la scheda base) / header pin IIC |                                                              |                                                              |
| Metodo di comunicazione     | IIC / seriale                                        |                                                              |                                                              |
| Posizionamento / scenari applicativi | Progettato per applicazioni sensibili ai costi, conforme agli standard delle applicazioni ad alta risposta dinamica | Basato sull'architettura hardware a 6 assi con modulo magnetometro a 3 assi integrato, calibrato con l'algoritmo di fusione dei dati di assetto AHRS, migliora notevolmente la stabilità e la precisione di misura dei dati in uscita | Aggiunge un barometro all'architettura di rilevamento a 9 assi, in grado di fornire informazioni precise sull'altitudine, adatto a scenari applicativi con requisiti più elevati di percezione dell'assetto e della posizione nello spazio tridimensionale |

## Descrizione delle funzioni dei pin

| SDA  | Linea dati seriale I2C               |
| ---- | ------------------------------------ |
| SCL  | Linea clock seriale I2C              |
| GND  | Massa                                |
| 3V3  | 3V3                                  |
| RX   | Pin di ricezione dei dati seriali    |
| TX   | Pin di trasmissione dei dati seriali |
| GND  | Massa                                |
| 5V   | 5V                                   |

# 2. Parametri del prodotto

| Parametri del prodotto |                                                              |
| ---------------------- | ------------------------------------------------------------ |
|                        | Note                                                         |
| Baudrate seriale       | 115200bps                                                    |
| Frequenza di uscita seriale | 25Hz di default, regolabile da 10Hz a 100Hz              |
| Velocità clock IIC     | 100KHz                                                       |
| Dati di uscita         | Accelerazione 3 assi, velocità angolare 3 assi, giroscopio 3 assi, angoli di Eulero 3 assi, magnetometro 3 assi, pressione barometrica, altitudine, temperatura, quaternione (*testo rosso: solo versioni 9 assi/10 assi; testo blu: solo versione 10 assi) |
| Tempo di avvio         | 5000ms                                                       |
| Temperatura di esercizio | -40°C~+85°C                                                |
| Temperatura di stoccaggio | -40°C~+100°C                                               |
| Resistenza agli urti   | 20kg (scheda nuda)                                           |
| Dispositivi supportati | Host Linux: PC, Raspberry Pi, serie Jetson, serie RDK; host MCU: STM32, MSPM0, ESP32, Pico, Arduino |
| Tensione di esercizio  | 5V o 3.3V                                                    |
| Corrente di esercizio  | 11mA                                                         |
| Dimensioni del prodotto | 27.4mm*22.6mm*12mm                                          |
| Peso del prodotto      | 3.8g                                                         |
| Supporto ROS           | ROS1/ROS2                                                    |

# 3. Parametri prestazionali dei sensori

Parametri prestazionali dei dati IMU

| IMU                  | Accelerometro    | Giroscopio       | Magnetometro      |
| -------------------- | ---------------- | ---------------- | ----------------- |
| Portata              | ±16g             | ±2000°/s         | ±8Gauss           |
| Risoluzione          | 0.0005(g/LSB)    | 0.061(°/s)/(LSB) | 0.244mGauss/LSB   |
| Rumore RMS (larghezza di banda 100Hz) | 1.0mg-RMS | 0.07°/S-RMS | /                  |
| Deriva termica       | ±0.15mg/C        | 0.015°/s/°C      | /                 |
| Larghezza di banda   | 12.5~1600Hz      | 12.5~1600Hz      | /                 |

Parametri prestazionali dei dati di navigazione

| Parametro                        | Valore tipico |                 |
| -------------------------------- | ------------- | --------------- |
| Angolo di beccheggio/rollio (posizionamento orizzontale) | Portata | X:±180°, Y:±90° |
| Precisione                       | 0.0055°       |                 |
| Angolo di rotta (posizionamento orizzontale) | Portata | Z:±180°         |
| Precisione                       | 0.0055°       |                 |

Parametri prestazionali del barometro

| Parametro           | Condizione       | Valore tipico |
| ------------------- | ---------------- | ------------- |
| Portata             |                  | 300~2000hPa   |
| Rumore RMS          | Modalità standard | 1Pa-RMS       |
| Precisione relativa |                  | ±0.12hPa      |

# 4. Parametri dimensionali

![Descrizione delle funzioni dei pin – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjA3NmQ5NzIzMzdkYWZlMzZkYzcwOGIyOGRmMmYxYWJfNTAxNTBiYzRjZTk4MzJiY2YzMWZhMWY4NDI5ZTFjYTZfSUQ6NzYzODkyMjc2MDI5MDcxNjYwMl8xNzgwMzE3OTcyOjE3ODA0MDQzNzJfVjM)
