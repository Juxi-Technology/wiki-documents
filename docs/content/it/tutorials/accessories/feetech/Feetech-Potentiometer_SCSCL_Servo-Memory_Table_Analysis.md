---
title: "Tabella di memoria del servo SCSCL a potenziometro"
description: "Il servo utilizza il protocollo personalizzato FT-SCS. Configurazione seriale predefinita di fabbrica: baudrate predefinito 1M o 500k, comunicazione TTL a bus singolo, 8 bit di dati, nessuna parità, 1 bit di stop; baudrate configurabile 38400~1Mbps (500k), indirizzo di comunicazione predefinito (n. stazione) 1."
---

# Tabella di memoria del servo SCSCL a potenziometro

> **[Acquista nel negozio](https://www.juxitech.com/it/products/feetech-scs0009-serial-bus-servo)**


# 1 Protocollo di comunicazione del servo

Il servo utilizza il protocollo personalizzato FT-SCS. Baudrate predefinito 1M o 500k, comunicazione TTL a bus singolo, 8 bit di dati, nessuna parità, 1 bit di stop; baudrate configurabile 38400~1Mbps (500k), indirizzo di comunicazione predefinito (n. stazione) 1.
[Protocollo personalizzato FT-SCS](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg)

# 2 Definizione della tabella di memoria del servo

Se un indirizzo di funzione usa dati a due byte, il byte alto si trova all'indirizzo anteriore, il byte basso all'indirizzo posteriore

## 2.1 Informazioni sulla versione

## 2.2 Configurazione EPROM

## 2.3 Controllo SRAM

## 2.4 Feedback SRAM

## 2.5 Parametri di fabbrica

# 3 Spiegazione dei byte speciali

## 3.1 Fase del servo

- Bit / peso: descrizione

- BIT0(1): fase della direzione di comando; (0) diretta, (1) inversa

- BIT1(2): ----

- BIT2(4): ----

- BIT3(8): modalità di velocità; (0) velocità 0 = arresto, (1) velocità 0 = velocità massima

- BIT4(16): ----

- BIT5(32): fase PWM; (0) in fase, (1) in controfase

- BIT6(64): modalità di tensione; (0) campionamento 1.5K bassa tensione, (1) campionamento 1K alta tensione

- BIT7(128): ----

Se si impostano più bit contemporaneamente, il valore di fase del servo è la somma dei valori dei bit.

## 3.2 Stato del servo

Stato del servo: 0 = normale, 1 = anomalo

- Bit / peso: descrizione

- BIT0(1): stato della tensione

- BIT1(2): ----

- BIT2(4): stato della temperatura

- BIT3(8): ----

- BIT4(16): ----

- BIT5(32): stato del carico

- BIT6(64): ----

- BIT7(128): ----

Se coesistono più stati, il valore di stato del servo è la somma dei valori dei bit. Esempio: sovratensione/sottotensione e surriscaldamento del servo, stato = 4+1=5;

## 3.3 Condizioni di rilascio

Condizioni di rilascio: 0 = disattivato, 1 = attivato

- Bit / peso: descrizione

- BIT0(1): protezione della tensione

- BIT1(2): ----

- BIT2(4): protezione dal surriscaldamento

- BIT3(8): ----

- BIT4(16): ----

- BIT5(32): sovraccarico

- BIT6(64): ----

- BIT7(128): ----

Se si impostano più bit contemporaneamente, il valore di rilascio è la somma dei valori dei bit. Esempio: protezione della tensione e protezione dal surriscaldamento attive, rilascio = 4+1=5;

## 3.4 Condizioni di allarme LED

Condizioni di allarme LED: 0 = disattivato, 1 = attivato

- Bit / peso: descrizione

- BIT0(1): allarme di tensione

- BIT1(2): ----

- BIT2(4): allarme di surriscaldamento

- BIT3(8): ----

- BIT4(16): ----

- BIT5(32): allarme di sovraccarico

- BIT6(64): ----

- BIT7(128): ----

Se si impostano più bit contemporaneamente, il valore di allarme LED è la somma dei valori dei bit. Esempio: allarme di tensione e allarme di surriscaldamento attivi, allarme = 4+1=5;
