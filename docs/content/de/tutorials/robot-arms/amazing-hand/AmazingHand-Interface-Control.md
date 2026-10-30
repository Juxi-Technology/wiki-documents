---
title: "Tutorial zur Interface-Steuerung"
description: "AmazingHand Python-GUI- und Kommandozeilen-Steuerwerkzeug: Auswahl von linker und rechter Hand, Installation, Kalibrierung, Protokoll und häufige Fragen."
---

# Tutorial zur Interface-Steuerung

## AmazingHand Python-Steuerwerkzeug (für linke und rechte Hand)

Ein in Python geschriebenes GUI- und Kommandozeilenwerkzeug, das über die Servo-Treiberplatine mit seriellem Bus 8 Feetech SCS0009 Servos ansteuert und damit die Dexterous Hand [AmazingHand von Pollen Robotics](https://github.com/pollen-robotics/AmazingHand) bewegt.

> **Beide Hände werden unterstützt.** Beim Start die rechte Hand (Servo-IDs 1-8) oder die linke Hand (Servo-IDs 11-18) wählen; mit --hand lässt sich die Abfrage überspringen. Die Posensammlung ist für beide Hände gemeinsam; jede Hand pflegt in data/config.yaml ihre eigene Servo-Zuordnung, ihren Montage-Offset und ihre Rohwert-Ziele. Details finden Sie unter „Auswahl von linker und rechter Hand“.

![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## Projektstruktur

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## Systemanforderungen

- Python 3.10 oder höher (die GUI benötigt Tkinter)
- Eine separate externe 5-V-Stromversorgung für die 8 Servos
- Ein USB-Seriell-Busadapter mit installiertem Treiber

## Installation

Installation mit pip empfohlen (liest pyproject.toml):

```bash
pip install -e .
```

Oder die Abhängigkeiten direkt installieren:

```bash
pip install -r requirements.txt
```

Entwicklungs- und Testumgebung:

```bash
pip install -r requirements-dev.txt
```

---

## Kalibrierung

Das Winkelbezugssystem der Servos, die Gesten-Presets und die Mittelstellung hängen vom jeweiligen mechanischen Handaufbau ab. Alle diese Parameter sind zentral in data/config.yaml gesammelt.

### Auswahl von linker und rechter Hand

Da sich Servos und Mechanik der beiden Hände unterscheiden, erfolgt die Auswahl vor dem Öffnen der Oberfläche:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

Abfrage überspringen:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

Ohne --hand wird der Wert von hand: aus data/config.yaml verwendet.

**Warum eine Hand nicht nur ein anderer ID-Satz ist.** Neben der Servonummerierung (rechts 1-8, links 11-18, wobei die Finger der linken Hand spiegelverkehrt nummeriert sind – Ringfinger zuerst) gibt es bei der linken Hand zwei weitere mechanische Unterschiede, die das Programm automatisch berücksichtigt:

|  | Rechte Hand | Linke Hand |
|---|---|---|
| Servo-ID | 1-8 | 11-18 |
| Finger → ID | Zeigefinger 1,2 / Mittelfinger 3,4 / Ringfinger 5,6 / Daumen 7,8 | Ringfinger 11,12 / Mittelfinger 13,14 / Zeigefinger 15,16 / Daumen 17,18 |
| Hersteller-MiddlePos | [451, 571, …] | [571, 451, …] |
| Montage-Offset | 0° | **−35.16°** (hands.left.angle_offset) |
| Servos desselben Fingers | (a, b) | **(b, a)** (hands.left.mirror_pose) |

Wenn eine der beiden letzten Einstellungen fehlt, verliert jede Geste ihre Form: Der Montage-Offset verschiebt jeden Finger um 35°, und ohne die Vertauschung der Servos desselben Fingers kehrt sich die Spreizrichtung vollständig um (bei der V-Geste liegen zwei Finger aneinander, während die drei Finger, die sich eigentlich schließen sollten, sich spreizen).

data/hand_config.yaml wird **von beiden Händen gemeinsam genutzt** und speichert immer die Reihenfolge der rechten Hand; bei der linken Hand wird beim Lesen konvertiert und beim Speichern zurückkonvertiert.

**Eine neue Hand kalibrieren.** Verwenden Sie die Werte in hands.left als Vorlage und prüfen Sie dann in dieser Reihenfolge:

1. **Middle position** drücken und prüfen, ob die Zeile Current (0-1023) die erwarteten Rohwerte anzeigt
1. **Open All** / **Close All** drücken – der Weg sollte bis zum mechanischen Anschlag reichen, ohne zu blockieren
1. Eine Spreizgeste testen (victory öffnet sich zum V, greeting legt drei Finger zusammen)

Welcher Parameter ist zu ändern, wenn etwas nicht stimmt:

| Symptom | Zu ändern |
|---|---|
| Middle-position-Anzeige falsch | `hands.<Name>.raw_positions.middle` |
| Spreizrichtung vertauscht | `hands.<Name>.mirror_pose` |
| Weg zu kurz oder zu weit | `hands.<Name>.raw_positions.open / close` |

### Winkelbezugssystem

GUI und CLI verwenden beide **Winkelwerte**, die der rustypot-Treiber in die internen Rohwerte der Servos umrechnet:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| Winkel | Bedeutung |
|---|---|
| **−35°** | Vollständig geöffnet (gestreckt) |
| **0°** | Mittelstellung, Finger natürlicherweise leicht gebeugt |
| **+75°** | Vollständig geschlossen (Faust) |

Servos mit gerader ID sind gegenüber denen mit ungerader ID **invertiert**, sodass ein einziger Posenwert die beiden Servos desselben Fingers in entgegengesetzte Richtungen bewegt. Das Programm übernimmt dies automatisch; eine manuelle Umrechnung ist nicht erforderlich.

### Grenzwerte

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max steuern das **seitliche Spreizen**. Da das Programm normalisiert (u = |side_offset| / |side_min|), **ändert eine Änderung dieses Bereichs allein nicht die tatsächliche Spreizamplitude**; sie staucht nur die Slider-Skala. Um den Spreizwinkel der Finger wirklich zu ändern, muss gleichzeitig auto_extremes angepasst werden.

### Rohwert-Ziele

Die drei globalen Positionsbuttons fahren die Servos auf **exakte Rohwerte**, ohne das Winkelmodell zu durchlaufen:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close – die beiden Enden des mechanischen Wegs. Mit dem Feetech-Debugwerkzeug des Herstellers durch einzelnes Ansteuern der Servos ermittelt.
- middle – die **kalibrierte mechanische Mittelstellung** (also MiddlePos im Arduino-Demo-Programm des Herstellers). Beachten Sie, dass sie **nicht** die Mitte zwischen open und close ist, sondern um etwa **±60 raw (±17,6°)** von raw 511 abweicht.

> Dies sind **Kalibrierwerte je Hand**. Der Hersteller sagt wörtlich: *„replace values by your calibration results“*.

**So prüfen Sie:** Das Panel Servo Feedback enthält eine Zeile Current (0-1023), die die Rohposition in Echtzeit anzeigt. Nach Drücken der Taste **Middle position** sollte diese Zeile 451, 571, 451, 571, … anzeigen.

### Übersicht der Steuerelement-Bereiche

| Steuerelement | Bereich |
|---|---|
| Öffnungs-Slider (vertikal) | −75 … +75 |
| Seitlicher Slider (horizontal) | −35 … +35 |
| Geschwindigkeit | 1 (langsam) … 6 (schnell) |

Der Geschwindigkeitswert wird vom Treiber als rad/s an die Servos übergeben; 1–6 entspricht daher grob **57–344 °/s**. Unter Last liegt die tatsächliche Geschwindigkeit bei etwa **70 %** dieses Werts – das muss beim Festlegen der Sequenzverzögerungen berücksichtigt werden.

---

## GUI ausführen (amazing_hand_gui.py)

Nach der Installation mit pip direkt aufrufbar:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

Oder direkt ausführen:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

Die Port-Auswahlliste zeigt die auf dem Rechner **tatsächlich vorhandenen** seriellen Schnittstellen (bevorzugt über pyserial, andernfalls über die Windows-Registrierung), sodass auch Adapter mit höherer Nummer erscheinen. Der Port kann direkt in die Auswahlliste eingetippt werden. Ist der Standardport aus der Konfiguration nicht angeschlossen, startet die GUI automatisch mit dem ersten realen Port; für einen festen Port --port explizit übergeben.

### Funktionen

- Fingerweise Slider-Steuerung für Öffnen/Schließen und Seitwärtsbewegung, mit zwei Modi: **Auto** (Öffnen/Schließen + Seitwärts) und **Raw** (direkte Steuerung der beiden Servowinkel)
- Schnellbuttons Open / Close / Center pro Finger
- Geschwindigkeitsauswahl pro Finger (1–6), zusätzlich eine globale Geschwindigkeits-Synchronisationsliste
- Tastaturkürzel für präzise Feinjustierung
- **Globale Positionsbuttons**: Open All, Close All, Center All, Middle position
- Gesten- und Sequenzverwaltung auf Basis von data/hand_config.yaml
- Gespeicherte Gesten lassen sich direkt in der Oberfläche löschen (🗑 Delete-Button)
- Echtzeit-Servotelemetriekurven (Position, Last, Temperatur, Spannung)
- Servo-Feedback-Tabelle mit Echtzeit-**Rohposition** (0–1023) zur Kalibrierprüfung

### Tastaturbedienung

- **1-4**: Finger auswählen (Ring = Ringfinger, Middle = Mittelfinger, Pointer = Zeigefinger, Thumb = Daumen)
- **Pfeiltasten**: den ausgewählten Finger bewegen
  - Oben/unten: schließen / öffnen
  - Links/rechts: seitlich bewegen
- **Modifikatortasten**:
  - Keine: je 1° (Feinabstimmung)
  - Shift: je 5° (normal)
  - Ctrl: je 10° (schnell)
- **Schnellaktionen**:
  - Q: ausgewählten Finger vollständig schließen
  - E: ausgewählten Finger vollständig öffnen
  - C: seitliche Position zentrieren

### Globale Buttons

| Button | Öffnen/Schließen | Seitlich |
|---|---|---|
| ✋ **Open All** | Alle Finger auf Rohwert open | Zentrieren |
| ✊ **Close All** | Alle Finger auf Rohwert close | Zentrieren |
| ⊙ **Center All** | **Unverändert** | Zentrieren |
| ⊙ **Middle position** | Alle Finger auf Rohwert middle | Zentrieren |

Die Auswahlliste **Global Speed** (1–6) wendet die gewählte Geschwindigkeit sofort auf alle Fingersteuerelemente an und synchronisiert die Slider-Anzeige aller Finger.

Die drei Rohwert-Buttons (Open All, Close All, Middle position) umgehen das Winkelmodell; **nach der Ausführung zeigen die Slider daher den nächstliegenden darstellbaren Wert, nicht den exakten Wert**. Wird danach ein Slider bewegt, weicht die Hand um bis zu etwa 0,3° vom Rohwertziel ab – eine bewusste Abwägung, um die kalibrierten Positionen exakt zu treffen.

> Bekanntes Problem: Center All **überspringt keine** Finger im **Raw**-Modus und überschreibt die manuell eingestellten Rohwinkel. Der ⊙ Center-Button eines einzelnen Fingers tut dies nicht.

---

## CLI ausführen (amazing_hand_cmd.py)

Ein eigenständiges Kommandozeilenwerkzeug, das Gesten anwendet und Sequenzen abspielt, ohne die GUI zu starten. Es liest dieselbe data/hand_config.yaml wie die GUI und sendet die gespeicherten Posenwerte **wörtlich** – exakt identisch mit dem, was die GUI sendet.

### Linux: Berechtigungen für serielle Ports

USB-Seriell-Adapter erscheinen üblicherweise als /dev/ttyACM0 (Waveshare / CDC-ACM) oder /dev/ttyUSB0 (FTDI / CH340).

So finden Sie sie:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

Bei **Permission denied** den aktuellen Benutzer zur Gruppe dialout hinzufügen und neu anmelden:

```bash
sudo usermod -aG dialout $USER
```

### Nach der pip-Installation

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### Direkt ausführen

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### Parameter

| Parameter | Standardwert | Beschreibung |
|---|---|---|
| --pose NAME | – | Wendet die Pose mit dem angegebenen Namen an |
| --sequence NAME | – | Spielt die Sequenz mit dem angegebenen Namen ab |
| --list | – | Listet alle Posen und Sequenzen auf |
| --loop | Aus | Sequenz in Schleife abspielen bis Ctrl+C |
| --speed N | 3 | Servogeschwindigkeit 1 (langsam) … 6 (schnell) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | Portnummer der seriellen Schnittstelle |
| --baudrate N | 1000000 | Baudrate |
| --config PATH | data/hand_config.yaml | Gibt eine andere Konfigurationsdatei an |
| --hand {right,left} | hand aus config.yaml | Legt fest, welche Hand verwendet wird (rechts 1-8, links 11-18) |

Beim Beenden des Skripts (auch bei Ctrl+C) wird das Drehmoment aller Servos automatisch abgeschaltet.

> Das CLI besitzt keinen --config-Parameter für data/config.yaml; diese Datei wird immer aus dem Projektverzeichnis geladen.

---

## Konfigurationsdateien

### data/config.yaml

| Abschnitt | Zweck |
|---|---|
| serial | Standard-Seriellport je Plattform, Baudrate, Liste wählbarer Baudraten |
| servos | Servo-IDs für jeden Finger |
| limits | Winkelbereiche der Servos und der beiden Slider |
| speeds | Standard-/Minimal-/Maximalwerte der Geschwindigkeitsskala 1–6 |
| auto_extremes | Servopositionen bei Vollausschlag des seitlichen Sliders |
| raw_positions | Exakte Rohwertziele der globalen Positionsbuttons |
| paths | Speicherort der Posen-/Sequenzdateien |

### Zuordnung von Servos und Fingern

| Finger | Servo-ID | Index im Posen-Array |
|---|---|---|
| Pointer (Zeigefinger) | 1, 2 | 4, 5 |
| Middle (Mittelfinger) | 3, 4 | 2, 3 |
| Ring (Ringfinger) | 5, 6 | 0, 1 |
| Thumb (Daumen) | 7, 8 | 6, 7 |

**Die Reihenfolge im Posen-Array ist Ringfinger, Mittelfinger, Zeigefinger, Daumen – nicht nach Servo-ID.** Beim manuellen Bearbeiten von hand_config.yaml ist dies der häufigste Fehler.

> Der Kommentar am Anfang von amazing_hand_cmd.py besagt „index 0→servo1 … 7→servo8“; **dieser Kommentar ist falsch** – das tatsächliche Verhalten des Codes entspricht der obigen Tabelle.

---

## Posen und Sequenzen

Alle Posen und Sequenzen werden in data/hand_config.yaml gespeichert. Existiert die Datei nicht, legt die GUI sie automatisch an.

### Pose speichern

1. Die Hand mit den Slidern oder der Tastatur in die Zielpose bringen
1. Im Feld „Name:“ einen Namen eingeben
1. Im Bereich Pose Management auf „➕ Add New“ klicken

Die Geschwindigkeit beeinflusst nur, wie schnell sich die Slider bewegen; eine gespeicherte Pose zeichnet lediglich die 8 Servopositionen auf.

### Pose laden / löschen

- In der Auswahlliste eine Pose wählen und **✓ Apply** anklicken, damit die Hand in diese Pose fährt
- Rechts neben Apply auf **🗑 Delete** klicken und nach Bestätigung endgültig löschen

### Sequenzverwaltung

1. Im Sequence Player auf „🔧 Manage“ klicken, um den Sequenzmanager zu öffnen
1. **Saved Sequences** (linke Spalte)
  - Vorhandene Sequenzen ansehen, ausführen, bearbeiten oder löschen
  - Per Doppelklick oder „▶ Execute“ einmal ausführen

1. **Sequence Builder** (rechte Spalte)
  - Per Doppelklick auf eine Pose unter „Available Poses“ diese als Schritt hinzufügen
  - Für jeden Schritt lassen sich Geschwindigkeit und Verzögerung der 8 Servos einzeln einstellen; Schritte werden im Format „pose:s1,s2,...,s8|delay“ gespeichert
  - Mit ↑/↓ die Reihenfolge ändern oder über den Button „⏱ Delay“ eine eigenständige Pause einfügen
  - Nach Eingabe des Namens auf „💾 Save Sequence“ klicken zum Speichern; mit „▶ Execute“ lässt sich vorab ein Testlauf ohne Speichern starten

1. Zurück im Hauptfenster im Sequence Player das Kontrollkästchen **Loop** aktivieren, wenn die Sequenz fortlaufend abgespielt werden soll

### Schrittformat

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 – die 8 Servogeschwindigkeiten (1–6) in der Reihenfolge der Pose
- delay – Wartezeit bis zum nächsten Schritt, z. B. 0.6s. **Optional**; ohne Angabe fällt die GUI auf eine feste automatische Wartezeit zurück
- Eine eigenständige Pause wird als SLEEP:1.0s geschrieben (ohne kommagetrennte Geschwindigkeitsliste)

**Wahl der Verzögerung.** Der Treiber selbst kann erkennen, ob die Servos zum Stillstand gekommen sind, aber die Sequenzwiedergabe verwendet feste Verzögerungen. Als Faustregel gilt: Wegwinkel / (Geschwindigkeit × 57,3 × 0,7) Sekunden, plus Reserve – bei einer Hand unter Last braucht eine Bewegung über etwa 130° bei Geschwindigkeit 3 mehr als 1,0 Sekunden.

### YAML-Formatbeispiel

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

Die Schleifenwiedergabe wird zur Laufzeit gesteuert (Kontrollkästchen in der GUI) und nicht mehr in YAML geschrieben.

---

## Tests

Das Projekt enthält 284 Unit-/Integrations-/Systemtests sowie 54 Hardwaretests.

### Alle Tests ausführen (ohne Hardware)

```text
pytest
```

### GUI- und CLI-Hardwaretests ausführen (Servos müssen angeschlossen sein)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py prüft Verbindung, Anwenden von Posen, Auslesen der Telemetrie, Öffnen/Schließen einzelner Finger/Winken, Geschwindigkeitssteuerung, Sequenzausführung und Bewegungserkennung.

test_cmd_hardware.py prüft die CLI-Ebene Ende-zu-Ende: Posenpositionen, Geschwindigkeitsparameter, Sequenzschritte, wait_for_motion, die Ausgabe von --list sowie das Abschalten des Drehmoments beim Beenden.

Die vollständigen Abnahmekriterien stehen in docs/REQUIREMENTS.md.

> Hinweis: Die Nicht-Hardware-Tests prüfen die **Fallback-Standardwerte** in hand_logic.py, die noch auf der Skala −40…110 der Originalversion basieren. Zur Laufzeit überschreibt data/config.yaml diese Werte, sodass die Tests unabhängig von Ihrer Kalibrierung bestehen – was aber auch bedeutet, dass **die Tests Ihre aktuellen Kalibrierparameter nicht validieren**.

---

## Servo-ID-Konfiguration

Tutorial zur Servo-ID-Konfiguration mit der offiziellen Feetech-Software und der Treiberplatine mit seriellem Bus: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Feetech-Software herunterladen: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## Danksagung

Ursprüngliches Projekt: [Betatester777](https://github.com/Betatester777/AmazingHandControl) Hardware und Referenz-Firmware: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
