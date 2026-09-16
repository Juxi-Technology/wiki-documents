---
title: "Potentiometer-SCSCL-Servo – Speichertabelle"
description: "Der Servo verwendet das FT-SCS-Eigenprotokoll. Serielle Standardkonfiguration ab Werk: Standard-Baudrate 1M oder 500k, TTL-Einzelbus-Kommunikation."
---

# Potentiometer-SCSCL-Servo – Speichertabelle

> **[Im Shop kaufen](https://www.juxitech.com/de/products/feetech-scs0009-serial-bus-servo)**


## 1 Servo-Kommunikationsprotokoll

Der Servo verwendet das FT-SCS-Eigenprotokoll. Standard-Baudrate 1M oder 500k, TTL-Einzelbus-Kommunikation, 8 Datenbits, keine Parität, 1 Stoppbit; Baudrate konfigurierbar 38400–1 Mbit/s (500k), Standard-Adresse (Stationsnummer) 1.
[FT-SCS-Eigenprotokoll](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg)

## 2 Definition der Servo-Speichertabelle

Wenn eine Funktionsadresse mit zwei Bytes Daten arbeitet, steht das höherwertige Byte an der vorderen Adresse, das niederwertige Byte an der hinteren Adresse

### 2.1 Versionsinformation

### 2.2 EPROM-Konfiguration

### 2.3 SRAM-Steuerung

### 2.4 SRAM-Feedback

### 2.5 Werksparameter

## 3 Erläuterung spezieller Bytes

### 3.1 Servo-Phase

- Bits/Gewichtung: Beschreibung

- BIT0(1): Antriebsrichtungs-Phase;(0)vorwärts,(1)rückwärts

- BIT1(2): ----

- BIT2(4): ----

- BIT3(8): Geschwindigkeitsmodus;(0)Geschwindigkeit 0 = Stopp,(1)Geschwindigkeit 0 = Höchstgeschwindigkeit

- BIT4(16): ----

- BIT5(32): PWM-Phase,(0)gleichphasig,(1)gegenphasig

- BIT6(64): Spannungsmodus,(0)1.5K-Niederspannungsabtastung,(1)1K-Hochspannungsabtastung

- BIT7(128): ----

Bei gleichzeitiger Setzung mehrerer Bits ist der Phasenwert des Servos die Summe der Bitwerte.

### 3.2 Servo-Status

Servo-Status: 0 = normal, 1 = Fehler

- Bits/Gewichtung: Beschreibung

- BIT0(1): Spannungsstatus

- BIT1(2): ----

- BIT2(4): Temperaturstatus

- BIT3(8): ----

- BIT4(16): ----

- BIT5(32): Laststatus

- BIT6(64): ----

- BIT7(128): ----

Bei mehreren gleichzeitig auftretenden Statuswerten ist der Servo-Statuswert die Summe der Bitwerte. Beispiel: Überspannung/Unterspannung und Überhitzung des Servos, Statuswert = 4+1=5;

### 3.3 Entlastungsbedingungen

Entlastungsbedingungen: 0 = aus, 1 = ein

- Bits/Gewichtung: Beschreibung

- BIT0(1): Spannungsschutz

- BIT1(2): ----

- BIT2(4): Überhitzungsschutz

- BIT3(8): ----

- BIT4(16): ----

- BIT5(32): Lastüberlast

- BIT6(64): ----

- BIT7(128): ----

Bei gleichzeitiger Setzung mehrerer Bits ist der Entlastungswert des Servos die Summe der Bitwerte. Beispiel: Spannungsschutz und Überhitzungsschutz gleichzeitig aktiv, Entlastungswert = 4+1=5;

### 3.4 LED-Alarmbedingungen

LED-Alarmbedingungen: 0 = aus, 1 = ein

- Bits/Gewichtung: Beschreibung

- BIT0(1): Spannungsalarm

- BIT1(2): ----

- BIT2(4): Überhitzungsalarm

- BIT3(8): ----

- BIT4(16): ----

- BIT5(32): Lastüberlast-Alarm

- BIT6(64): ----

- BIT7(128): ----

Bei gleichzeitiger Setzung mehrerer Bits ist der LED-Alarmwert des Servos die Summe der Bitwerte. Beispiel: Spannungsalarm und Überhitzungsalarm gleichzeitig aktiv, Alarmwert = 4+1=5;
