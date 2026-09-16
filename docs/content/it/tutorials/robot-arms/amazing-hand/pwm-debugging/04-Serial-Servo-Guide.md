---
title: "04-Versione con servomotori seriali-Istruzioni per l'uso"
description: "Versione con servomotori bus SCS0009 ufficiali — Istruzioni per l'uso"
---

# 04-Versione con servomotori seriali-Istruzioni per l'uso

Versione con servomotori bus SCS0009 ufficiali — Istruzioni per l'uso

> **Se hai acquistato la versione con servomotori PWM (ESP32-S3 + 8 canali PWM), ignora questa cartella**,
è sufficiente usare `..\01_gui_control` o `..\02_hand_tracking`.

Questa cartella descrive il supporto per i **servomotori bus SCS0009 originali ufficiali** di AmazingHand.

## Stato attuale

Il `..\02_hand_tracking\Demo` di questo delivery_package supporta contemporaneamente due backend per i servomotori, commutabili senza soluzione di continuità tramite configurazione:

|Versione|Tipo di servomotore|Baud rate|File di configurazione|
|---|---|---|---|
|**PWM** (consegna principale di questo pacchetto)|PWM ad azionamento diretto ESP32-S3|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009** (originale ufficiale)|Servomotori bus ufficiali|1,000,000|`{l,r}_hand.toml`|

- **Versione PWM**: nel menu selezionare `3 - Servomotori PWM (azionamento diretto ESP32)`; usare i tutorial di questo pacchetto。

- **Versione SCS0009**: nel menu selezionare `2 - Hardware reale (servomotori bus SCS0009)`。

## Modalità d'uso della versione SCS0009

1. Hardware: servomotori bus ufficiali + adattatore seriale (baud rate 1M)。

2. Distribuzione: `Demo\Windows_Scripts_CN\3-部署代码.bat` (o lo script Linux corrispondente)。

3. Esecuzione: 4-运行代码.bat → selezionare `2 - Hardware reale (servomotori bus SCS0009)` → selezionare il tipo di mano。

4. Per istruzioni dettagliate vedere `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
e `Demo\Windows_Scripts_CN\Windows使用教程.md` (tutorial ufficiale)。

## Avvertenze

- SCS0009 richiede la configurazione dell'id dei servomotori ufficiali (già integrata in `{l,r}_hand.toml`); la versione PWM non ne è interessata。

- I due tipi di servomotore **possono essere collegati solo uno alla volta**; è sufficiente cambiare l'hardware + l'opzione nel menu。

- Questo pacchetto ha come consegna principale la versione PWM; per i tutorial ufficiali SCS0009 fa fede la Demo ufficiale。

