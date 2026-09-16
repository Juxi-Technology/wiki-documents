---
title: "04-Serienservo-Version - Benutzungshinweise"
description: "SCS0009 offizielle Busservo-Version — Benutzungshinweise"
---

# 04-Serienservo-Version - Benutzungshinweise

SCS0009 offizielle Busservo-Version — Benutzungshinweise

> **Falls Sie die PWM-Servo-Version (ESP32-S3 + 8-Kanal-PWM) erworben haben, ignorieren Sie bitte dieses Verzeichnis**,
verwenden Sie einfach `..\01_gui_control` oder `..\02_hand_tracking`.

Dieses Verzeichnis beschreibt die Unterstützung des AmazingHand **offiziellen Original-Busservos SCS0009**.

## Aktueller Status

Das `..\02_hand_tracking\Demo` dieses delivery_package unterstützt gleichzeitig zwei Servo-Backends, die per Konfiguration nahtlos umgeschaltet werden können:

|Version|Servo-Typ|Baudrate|Konfigurationsdatei|
|---|---|---|---|
|**PWM** (Hauptlieferumfang dieses Pakets)|ESP32-S3 Direktantrieb PWM|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009** (offizielles Original)|Offizieller Busservo|1,000,000|`{l,r}_hand.toml`|

- **PWM-Version**: Im Menü `3 - PWM 舵机(ESP32 直驱)` auswählen, das Tutorial dieses Pakets verwenden.

- **SCS0009-Version**: Im Menü `2 - 真实硬件(SCS0009 总线舵机)` auswählen.

## Verwendung der SCS0009-Version

1. Hardware: Offizieller Busservo + Seriell-Adapter (Baudrate 1M).

2. Deployment: `Demo\Windows_Scripts_CN\3-部署代码.bat` (oder das entsprechende Linux-Skript).

3. Ausführung: 4-运行代码.bat → `2 - 真实硬件(SCS0009 总线舵机)` auswählen → Handtyp auswählen.

4. Ausführliche Beschreibung siehe `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
sowie `Demo\Windows_Scripts_CN\Windows使用教程.md` (offizielles Tutorial).

## Hinweise

- SCS0009 erfordert die offizielle Servo-ID-Konfiguration (bereits in `{l,r}_hand.toml` integriert), die PWM-Version betrifft dies nicht.

- Von beiden Servo-Typen darf **jeweils nur ein Satz gleichzeitig angeschlossen** werden; zum Umschalten einfach Hardware + Menüoption wechseln.

- Dieses Paket liefert hauptsächlich die PWM-Version; für das offizielle SCS0009-Tutorial gilt das offizielle Demo.

