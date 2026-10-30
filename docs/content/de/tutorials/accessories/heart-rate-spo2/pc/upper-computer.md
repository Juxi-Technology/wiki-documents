---
title: "PC-Hostsoftware"
description: "Grafische PC-Hostsoftware für das MAX30102-Herzfrequenz-/SpO2-Modul: serielle Einstellungen, Erfassung, Überwachung, Dateninterpretation und häufige Fragen."
---

# PC-Hostsoftware

## 📋 Funktionsübersicht

Dies ist ein grafisches PC-Programm zur Herzfrequenz- und SpO2-Überwachung mit den folgenden Funktionen:

1. ✅ **Serielle Portauswahl** - automatische Suche nach verfügbaren seriellen Ports
1. ✅ **Baudratenauswahl** - unterstützt 9600/19200/38400/57600/115200
1. ✅ **Verbinden/Trennen** - Modul mit einem Klick verbinden/trennen
1. ✅ **Erfassung starten/beenden** - steuert die Sensor-LED
1. ✅ **Überwachung starten/stoppen** - Echtzeitanzeige der Daten
1. ✅ **Echtzeitanzeige** - Blutsauerstoff, Herzfrequenz, Temperatur

---

## 🔌 Hardwareverbindung

| Herzfrequenz-/SpO2-Modul | USB-zu-TTL-Modul |
|---|---|
| VCC | 5V (wichtig! nicht 3.3V anschließen) |
| GND | GND |
| TX | RX (gekreuzt verbinden) |
| RX | TX (gekreuzt verbinden) |

![Abbildung](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-upper-computer/01.png)

⚠️ **Achtung: Den Schiebeschalter des Moduls auf UART stellen, TX und RX müssen gekreuzt verbunden werden!**

---

## 🚀 Programm ausführen

### Methode 1: Python-Skript direkt ausführen

1. Abhängigkeiten installieren:

```bash
pip install pyserial
```

1. Programm ausführen:

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python HeartRateOximeter.py
```

---

## 📖 Bedienung

### Schritt 1: Hardware verbinden

1. Sensor und USB-zu-TTL gemäß der obigen Verkabelungstabelle verbinden

```text
VCC->VCC
GND->GND
RX->TX
TX->RX
```

1. USB-zu-TTL in einen USB-Anschluss des Computers stecken

### Schritt 2: Programm öffnen

Führen Sie `HeartRateOximeter.exe` aus.

### Schritt 3: Serielle Einstellungen

1. Den richtigen COM-Port auswählen (z. B. COM3)
1. Baudrate **9600** wählen (Standard)
1. Auf die Schaltfläche [Verbinden] klicken

### Schritt 4: Erfassung starten

1. Nach erfolgreicher Verbindung auf [Erfassung starten] klicken
1. ✅ Die Sensor-LED leuchtet

### Schritt 5: Überwachung starten

1. Den Finger auf den Sensor legen
1. Auf [Überwachung starten] klicken
1. Die Echtzeitdaten anzeigen

---

## 📊 Oberfläche

```text
┌─────────────────────────────────────────┐
│           串口设置                       │
│  串口:  [COM3  ↓]  [刷新]               │
│  波特率:[9600  ↓]  [连接]               │
├─────────────────────────────────────────┤
│           模块控制                       │
│  [启动采集]  [开始监测]                 │
├─────────────────────────────────────────┤
│           实时数据                       │
│  血氧 (SPO2):       98 %                │
│  心率 (Heart Rate): 75 Times/min        │
│  温度 (Temperature): 36.6 °C            │
│  状态:  正在监测...                     │
├─────────────────────────────────────────┤
│           使用提示                       │
│  1. 接线：VCC->5V, GND->GND, RX->TX, TX->RX          │
│  2. 点击连接后再启动采集                               │
│  3. 启动采集后传感器LED会亮起                           │
└─────────────────────────────────────────┘
```
---
## 📋 Dateninterpretation

| Daten | Normalbereich | Beschreibung |
|---|---|---|
| Blutsauerstoff (SPO2) | 95% - 100% | unter 90 %: Arztbesuch empfohlen |
| Herzfrequenz | 60 - 100 Schläge/min | Ruhebereich bei Erwachsenen |
| Temperatur | 25 - 35 °C | Boardtemperatur des Moduls, nicht die Körpertemperatur |

**Hinweis**: Direkt nach dem Start oder bei nicht richtig aufgelegtem Finger können die Daten `-1` anzeigen; das ist normal.

---

## ❓ Häufige Fragen

### F1: Was tun, wenn kein serieller Port gefunden wird?

**A:**

1. Prüfen Sie, ob der USB-zu-TTL-Treiber korrekt installiert ist
1. Stecken Sie das USB-Kabel erneut ein
1. Klicken Sie auf [Aktualisieren], um erneut zu suchen

### F2: Was tun, wenn die Verbindung fehlschlägt?

**A:**

1. Prüfen Sie, ob der richtige serielle Port gewählt ist
1. Prüfen Sie, ob der serielle Port von anderen Programmen belegt ist (z. B. Seriell-Assistent, Arduino IDE)
1. Prüfen Sie, ob der USB-zu-TTL-Adapter ordnungsgemäß funktioniert

### F3: LED leuchtet nach dem Klick auf „Erfassung starten“ nicht?

**A:**

1. Prüfen Sie, ob VCC an 5V (nicht 3.3V) angeschlossen ist
1. Prüfen Sie, ob TX/RX gekreuzt verbunden sind
1. Prüfen Sie, ob das Sensormodul selbst beschädigt ist

### F4: Daten zeigen dauerhaft -1?

**A:**

1. Prüfen Sie, ob [Erfassung starten] geklickt wurde
1. Legen Sie den Finger richtig auf den Sensor und bedecken Sie den LED-Bereich vollständig
1. Halten Sie den Finger ruhig und warten Sie einige Sekunden
1. Prüfen Sie, ob die Verkabelung locker ist

### F5: Programm reagiert nicht?

**A:**

1. Zuerst auf [Überwachung stoppen] klicken
1. Dann auf [Erfassung beenden] klicken
1. Zuletzt auf [Trennen] klicken
1. Programm neu starten

---

## ⚠️ Hinweise

1. **Anschlussreihenfolge**: Zuerst den Sensor anschließen, dann USB einstecken
1. **Trennreihenfolge**: Zuerst die Überwachung stoppen, dann die Erfassung beenden, zuletzt die Verbindung trennen
1. **Stromversorgung**: Der Sensor muss mit 5V versorgt werden; 3.3V reichen möglicherweise nicht aus
1. **Fingerplatzierung**: Während der Messung muss der Finger den optischen Bereich vollständig bedecken, nicht fest drücken
1. **Umgebung**: Direktes starkes Licht auf den Sensor vermeiden

---

## 📞 Technischer Support

Bei Problemen prüfen Sie bitte:

1. Ob die Hardwareverkabelung korrekt ist (insbesondere TX/RX gekreuzt)
1. Ob die Stromversorgung 5V beträgt
1. Ob der USB-zu-TTL-Treiber ordnungsgemäß funktioniert
1. Ob der serielle Port von anderen Programmen belegt ist
