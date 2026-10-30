---
title: "AmazingHand PWM-Fingerhand — Tutorial für den gesamten Workflow"
description: "Vollständiges Tutorial der AmazingHand PWM-Version: von der ESP32-S3-PWM-Firmware über Gestenbefehle des Host-Programms bis zum Gesten-Tracking mit GUI / dora."
---

# AmazingHand PWM-Fingerhand — Tutorial für den gesamten Workflow

> **Zugehöriges Lieferpaket:** [delivery_package.zip](/downloads/delivery_package.zip)


> Von den **Gestenbefehlen des Host-Programms** bis zum **Gesten-Tracking** — eine durchgängige Anleitung.
> Geeignete Hardware: ESP32-S3 + 8-Kanal-PWM-Servos (Differenzialantrieb).
>
> Version: 2026-08-20 · Zugehörige Firmware: ESP-IDF-Komponentenversion (`AmazingHand_Serial`)

---

## Kapitel 0 Tutorial-Navigation

Dieses Tutorial ist **in chronologischer Reihenfolge** aufgebaut. Klären Sie zuerst, welchen Weg Sie nehmen möchten, und springen Sie dann zum entsprechenden Kapitel.

| Route | Zweck | Voraussetzungen | Kapitel |
|------|------|----------|------|
| **A. Gestenbefehle des Host-Programms** | Gesten per Button-Klick/Befehlseingabe an der Fingerhand ausführen (Stein/Schere/Papier/Daumen hoch…) | Python + geflashte Firmware | Kapitel 1-4 |
| **B. In der GUI integriertes Gesten-Tracking** | Die Kamera folgt den Handbewegungen, die Fingerhand reproduziert sie in Echtzeit (vereinfachte Version, ohne IK) | A + 64-Bit-Python + mediapipe | Kapitel 1-4 + 5.1 |
| **C. Offizielles IK-Tracking mit dora** | Offizielle vollständige Kette: Kamera→IK→8 Gelenkwinkel→Servos (Vollversion) | A + Rust + uv + dora | Kapitel 1-4 + 5.2 |

**Empfohlene Route**:
- Erste Nutzung → **A** wählen; zuerst prüfen, ob Firmware und Verkabelung in Ordnung sind.
- Für eine schnelle Kameranachführung → **B** wählen (leichtgewichtig, in wenigen Minuten installiert).
- Für formelles, vollständiges Tracking → **C** wählen (offizielle Kette, höchste Genauigkeit).

Die Hardware ist bei allen drei Routen dieselbe; nur für **Route C** müssen zusätzlich Rust/uv/dora installiert werden.

---

## Kapitel 1 Umgebungsvorbereitung

Installieren Sie in der angegebenen Reihenfolge. **Route A/B benötigt nur Abschnitt 1.1; Route C zusätzlich Abschnitt 1.2.**

### 1.1 Host-Umgebung (erforderlich für Route A/B)

#### ① 64-Bit-Python 3.12

> **64-Bit ist zwingend erforderlich**. mediapipe 0.10.14 bietet nur 64-Bit-Windows-Wheels; eine Installation unter 32-Bit ist nicht möglich.
> Dies ist auch eine häufige Ursache dafür, dass die GUI beim Doppelklick sofort abstürzt.

- Empfohlene Installation nach `D:\Python312-64bit` (dieser Pfad existiert bereits auf diesem Rechner).
- Bei der Installation **Add to PATH** ankreuzen.
- Überprüfen (64-Bit):

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② Host-Abhängigkeiten installieren

Projektstammverzeichnis (das Verzeichnis mit `hand_gui.py`):

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ Zusätzliche Tracking-Abhängigkeiten (für Route B)

Im Projektstammverzeichnis ausführen:

```bash
setup_tracking.bat
```

Das Skript erledigt automatisch: 64-Bit-Python finden → virtuelle Umgebung `tracking_env` erstellen → `requirements-tracking.txt` installieren
(mediapipe==0.10.14, numpy<2, scipy, opencv, Pillow, pyserial) → mediapipe überprüfen.

> Oder manuell installieren:
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 Offizielle dora-IK-Umgebung (erforderlich für Route C)

**Kundeninstallation**: Doppelklick auf `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat` (englische Version: `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`); alle Abhängigkeiten werden automatisch installiert:
Rust-Toolchain, uv (Python-Paketverwaltung), dora-cli.

> Nach der Installation **das Terminal schließen und einmal neu öffnen**, damit PATH wirksam wird.
> Details zu den Abhängigkeiten (Versionen, manuelle Installation) finden Sie in der Wartungsdokumentation; für den Kunden ist nichts weiter zu tun.

---

## Kapitel 2 Hardware-Verkabelung

### 2.1 Hardware-Liste

| Hardware | Beschreibung |
|------|------|
| ESP32-S3-Entwicklungsboard | YX-ESP32-S3 oder gleichwertig |
| 8-Kanal-PWM-Servos | Analogservos, Differenzialantrieb |
| Servo-Adapterplatine | Servos → 8-Kanal-PWM-Ausgang |
| Separates 5V-Netzteil | **mindestens 5V 3A**; Servos haben hohe Einschaltströme |
| USB-Datenkabel | ESP32-S3 Type-C → PC |
| Kamera | Integrierte oder USB-Kamera (für Tracking) |

### 2.2 GPIO-Zuordnung

Adapterplatine PWM1-8 → ESP32-S3 GPIO:

| Adapterplatine | GPIO | Finger |
|--------|------|------|
| PWM1 | 4 | Zeigefinger Gelenk 1 |
| PWM2 | 5 | Zeigefinger Gelenk 2 |
| PWM3 | 6 | Mittelfinger Gelenk 1 |
| PWM4 | 7 | Mittelfinger Gelenk 2 |
| PWM5 | 15 | Ringfinger Gelenk 1 |
| PWM6 | 16 | Ringfinger Gelenk 2 |
| PWM7 | 17 | Daumen Gelenk 1 |
| PWM8 | 18 | Daumen Gelenk 2 |

> **Linke und rechte Hand verwenden dieselbe GPIO-Zuordnung**. Die linke/rechte Hand wird per Software umgeschaltet (Kapitel 4); die Verkabelung muss nicht geändert werden.

### 2.3 Anforderungen an die Stromversorgung

- Verwenden Sie für die Servos ein **separates 5V-Netzteil** (mindestens 3A); versorgen Sie sie nicht nur über USB.
- Stromstöße der Servos können den ESP32 zurücksetzen (Symptom: Der ESP32 startet wiederholt neu). Trennen Sie in diesem Fall **die Stromversorgung und starten Sie** den ESP32 neu.

### 2.4 Verkabelungsschritte

1. 8 Servos → Adapterplatine PWM1-8
2. Adapterplatine → entsprechende GPIO des ESP32-S3 (siehe Tabelle oben)
3. ESP32-S3 Type-C → PC
4. Kamera an den PC anschließen (für Tracking)

> Ausführliche Verkabelung/Schaltpläne finden Sie im Verzeichnis `ESP32开发板电路图/`.

---

## Kapitel 3 Voraussetzung: Firmware flashen

> Damit die Servos reagieren, muss zuerst die Firmware geflasht werden. Die Firmware befindet sich in `esp-idf\AmazingHand_Serial\`.

### 3.1 ESP-IDF-Version kompilieren (empfohlen)

Öffnen Sie das Projekt `AmazingHand_Serial` in der Espressif IDE:

1. Zielchip festlegen (beim ersten Mal):
   ```
   idf.py set-target esp32s3
   ```
2. Kompilieren:
   ```
   idf.py build
   ```
3. Flashen (unter Windows den COM-Port verwenden, z. B. COM3):
   ```
   idf.py -p COM3 flash
   ```

### 3.2 Überprüfung nach dem Flashen

Serielle Überwachung (Baudrate **115200**):

```
idf.py -p COM3 monitor
```

Sie sollten das Startprotokoll sehen:

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> Die Baudrate ist bereits einheitlich durch Firmware/Skripte konfiguriert (115200); eine manuelle Einstellung ist nicht erforderlich.

> Hinweis: Bei der Gerätelieferung ist die Firmware in der Regel bereits geflasht; dieser Schritt ist nur bei neuer Firmware/erneutem Flashen erforderlich.

---

## Kapitel 4 Erste Inbetriebnahme: Gestenbefehle vom Host-Programm

> Voraussetzung: Firmware geflasht (Kapitel 3), ESP32 mit Strom versorgt, serielles Kabel angeschlossen. Prüfen Sie zuerst im Geräte-Manager den COM-Port.

### 4.1 GUI-Visualisierung (empfohlen)

#### Methode A: gepackte exe ausführen

Doppelklick auf `dist/AmazingHand控制台.exe` (**ohne Tracking**; für Tracking ist die Ausführung aus dem Quellcode erforderlich).

#### Methode B: aus dem Quellcode ausführen

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### Schritte zur GUI-Verwendung

1. **Seriellen Port wählen**: Im Dropdown-Menü oben den COM-Port des ESP32 auswählen.
2. **Auf „Verbinden" klicken**: Die Statusanzeige wird grün, das Log zeigt „Verbunden", automatisch wird ein NOP-Linktest gesendet.
3. **Gestenbefehle**: Auf „Stein", „Schere", „Papier", „Daumen hoch", „OK", „Kneifen", „Zeigen" usw. klicken; die Fingerhand führt die Geste aus.
4. **Linke/rechte Hand**: „Rechte Hand"/„Linke Hand" ankreuzen, um die Spiegelrichtung des Daumens umzuschalten.
5. **Servo-Direktantrieb**: Die 8 Schieberegler ziehen, um den Winkel eines einzelnen Servos in Echtzeit zu steuern (0-180°).
6. **Differenzialsteuerung der Finger** (empfohlen): Zwei Fortschrittsbalken pro Finger — „Beugen◀▶Strecken" gegenläufig differenziell, „Rechts schwenken◀▶Links schwenken" gleichsinnig schwenkend. Zwei unabhängige Freiheitsgrade, synchron angesteuert.
7. **Wiederholen/Stopp**: Letzte Geste wiederholen / sofort abbrechen.
8. **Kommunikationslog**: Zeigt unten in Echtzeit die gesendeten/empfangenen Frames und Antworten an.

### 4.2 Kommandozeilentest (serial_test.py)

Projektstammverzeichnis:

```bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

### 4.3 Überprüfung

- Nach dem Klicken einer Geste sollten die Servos die entsprechende Bewegung ausführen; das serielle Log gibt `ACK` und `DONE` zurück.
- Antwortcodes: `0x00=OK`, `0x01=ungültiger Befehl`, `0x02=Parameterfehler`, `0x03=belegt`, `0x10=abgeschlossen`.
- Wenn sich die Servos überhaupt nicht bewegen: siehe Kapitel 6, Häufige Fragen (zuerst Stromversorgung/seriellen Port prüfen).

> Eine vollständige Schnellreferenz der Gestenbefehle und des seriellen Protokolls finden Sie in Kapitel 7.

---

## Kapitel 5 Fortgeschrittenes Tutorial: Gesten-Tracking

> Voraussetzung: Kapitel 1-4 abgeschlossen (Firmware geflasht, Steuerung über den seriellen Port funktioniert, Kamera bereit).
> Dieses Kapitel bietet zwei Wege; wählen Sie einen davon.

### 5.1 In der GUI integriertes Tracking (Light-Version)

**Geeignet für**: schnelle Demonstrationen ohne dora-Installation. Kamera → direkte Zuordnung zu den Differenzialservos, ohne IK.

#### Voraussetzungen

- 64-Bit-Python + `setup_tracking.bat` (Abschnitt 1.1).
- Kamera verfügbar.

#### Ausführen

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. Seriellen Port wählen → „Verbinden".
2. Zum Panel „Gesten-Tracking (MediaPipe-Kamera)" scrollen.
3. Kameranummer wählen (Standard 0) → auf „Tracking starten" klicken.
4. Die Hand ins Bild halten; die Fingerhand folgt dem Beugen/Strecken der Hand.

#### Funktionsprinzip

- mediapipe 0.10.14 extrahiert 3D-Vektoren der Fingerspitzen von 4 Fingern (im Handkoordinatensystem).
- `tips_to_angles()` in `hand_tracking.py` ordnet jedem Finger einen Differenzialwinkel zu:
  - flex (Beugen/Strecken): Für die drei Finger wird die z-Komponente verwendet, für den Daumen die y-Komponente;
  - base (Links/Rechts-Schwenken): fest 90 (Links/Rechts-Schwenken derzeit nicht implementiert).
- In der GUI integrierte EMA-Glättung (alpha=0.4) + 60-ms-Drosselung, um Zittern zu vermeiden.

#### Einschränkungen

- **Kein IK**: Die Fingerspitzen werden direkt auf Winkel abgebildet; die Genauigkeit ist geringer als bei der offiziellen Kette.
- **Links/Rechts-Schwenken vorerst zurückgestellt**: base ist fest 90, es wird nicht nach links/rechts geschwenkt.
- Geeignet für Demonstrationen/Prototypen; für den regulären Einsatz wird 5.2 empfohlen.

### 5.2 Offizielles IK-Tracking mit dora (Vollversion)

**Geeignet für**: den regulären Einsatz. Offizielle Kette: Kamera → mediapipe → MuJoCo+mink IK → 8 Gelenkwinkel → AHControl (Rust) → ESP32 → PWM-Servos.

#### Voraussetzungen

- Vollständige Umgebung (Rust + uv + dora, Abschnitt 1.2).
- Firmware geflasht (Kapitel 3).
- In der Datenfluss-YML ist die PWM-Baudrate (115200) bereits eingetragen; manuelle Änderungen sind nicht erforderlich.

#### Schritt 1: Deployment (Ein-Klick-Skript empfohlen)

Doppelklick auf `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat` (englische Version: `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`); dies erledigt automatisch:
Python-Umgebung erstellen, AHControl (Rust) kompilieren, AHSimulation/HandTracking (mediapipe) installieren.

> Das erste Deployment dauert einige Minuten. Das Skript behandelt die Umgebungsvariablen bereits intern; manuelle Einstellungen sind nicht erforderlich.

#### Schritt 2: Ausführen

Doppelklick auf `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat` (englische Version: `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`), dann im Menü wählen:

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

Wählen Sie dann den Handtyp: `1 右手` / `2 左手`. Das Skript führt automatisch `dora build` + `dora run` aus.

- Das Kamerafenster öffnet sich; die Hand ins Bild halten → die 3D-Simulationsfinger folgen → die Fingerhand folgt.
- Stoppen: Ctrl+C (oder Fenster schließen).

#### Umschalten zwischen linker und rechter Hand

Wählen Sie einfach den Handtyp im Ausführungsmenü (Schritt 2 von Abschnitt 5.2): `1 右手` oder `2 左手`.

> Nach dem Umschalten baut das Skript automatisch den entsprechenden Datenfluss neu; warten Sie den Abschluss des Builds ab, bevor Sie vor der Kamera weiterarbeiten.

#### Lesen der Ausführungslogs

Im Ausführungsfenster gibt der AHControl-Knoten kontinuierlich Logs aus. Achten Sie besonders auf diese Zeile:

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (z. B. `sent 300 frames, ESP32 acked 300 frames`) → **normal**, der ESP32 empfängt jeden Frame.
- `M = 0` → Der ESP32 empfängt keine Daten; prüfen Sie den seriellen Port/die Stromversorgung (siehe Kapitel 6).

Solange diese Zeile normal wächst, ist die Servo-Kette in Ordnung; es bleibt nur die Frage, ob die Kamera mithalten kann.

---

## Kapitel 6 Häufige Fragen (im Betrieb)

> Dieser Abschnitt listet nur die Probleme auf, die im Betrieb am häufigsten auftreten und sich selbst lösen lassen. Lokalisieren Sie die Ursache schnell anhand des Symptoms.

### 6.1 Servos bewegen sich überhaupt nicht

Prüfen Sie in dieser Reihenfolge:

1. **Stromversorgung**: Ist an den Servos ein separates Netzteil (5V 3A oder mehr) angeschlossen? Bei reiner USB-Versorgung bewegen sich die Servos möglicherweise nicht oder der ESP32 startet wiederholt neu. → Stromversorgung trennen und ESP32 neu starten.
2. **Serieller Port**: Ist der richtige COM-Port gewählt? Im Geräte-Manager unter Anschlüsse (COM und LPT) prüfen, welcher Port dem ESP32 entspricht. Wird er von einem anderen Programm (z. B. einem seriellen Terminal) belegt? → Beenden Sie das belegende Programm.
3. **Verkabelung**: Sind PWM1-8 der Adapterplatine an den richtigen GPIO-Pins angeschlossen? Sitzen die Servo-Signalleitungen fest?

### 6.2 Kamera zeigt kein Bild

- Beim ersten Start unter Windows erscheint eine Kamera-Berechtigungsabfrage → auf „Zulassen" klicken.
- Falls zuvor „Nein" gewählt wurde: Einstellungen → Datenschutz und Sicherheit → Kamera → Desktop-Apps den Zugriff auf die Kamera erlauben, dann erneut ausführen.

### 6.3 Kamera zeigt ein Bild, aber die Hand folgt nicht / folgt träge

- Vergewissern Sie sich, dass die Kamera **direkt auf** die Hand gerichtet ist, ausreichend Licht vorhanden ist und die Hand vollständig im Bild sichtbar ist.
- Bewegen Sie sich langsamer und mit größerer Amplitude. Bei zu schnellen oder zu kleinen Bewegungen kann das Tracking nicht mithalten.
- Bewegen sich die Finger im 3D-Simulationsfenster?
  - **Ja**: Die Tracking-Kette ist in Ordnung; das Problem liegt bei den Servos/am seriellen Port, siehe 6.1.
  - **Nein**: Der Tracking-Knoten erkennt die Hand nicht; passen Sie Pose/Beleuchtung an und versuchen Sie es erneut.

### 6.4 Handtyp vertauscht / Daumenrichtung vertauscht

- Ist die linke/rechte Hand falsch gewählt? Wählen Sie im Ausführungsmenü den entsprechenden Handtyp.
- In der Host-GUI „Rechte Hand"/„Linke Hand" ankreuzen, um umzuschalten.

### 6.5 Umschalten der linken/rechten Hand zeigt keine Wirkung

- Nach dem Umschalten des Handtyps muss `dora` den Datenfluss neu bauen: Nach der Handtypauswahl im Ausführungsmenü wird automatisch `dora build` ausgeführt; warten Sie einfach, bis es abgeschlossen ist.

### 6.6 Bild friert während der Ausführung ein / Log bleibt stehen

- Möglicherweise wird die Kamera von einer anderen Anwendung belegt (Videokonferenz, ein weiteres Skript); schließen Sie diese und versuchen Sie es erneut.
- Oder mit `Ctrl+C` stoppen und erneut ausführen.

### 6.7 Nach Wechsel des USB-Ports / Neustart des Computers wird der serielle Port nicht gefunden

- Die COM-Portnummer hat sich möglicherweise geändert. Bestätigen Sie im Geräte-Manager die neue COM-Nummer, führen Sie `2-配置串口.bat` (oder `2-Setup_Serial.bat`) erneut aus und wählen Sie einmal den Port, dann erneut starten.

### 6.8 Immer noch nicht gelöst?

- Senden Sie einen Screenshot der Logs des Ausführungsterminals an den Wartungspartner und geben Sie an: bei welchem Schritt, bei welcher Aktion und welches beobachtete Symptom.
- Wichtige Logs: die `[CONFIG]`-Zeile beim Start, die `[ACK-STATS]`-Zeile im Betrieb (ob M in `ESP32 acked M frames` nahe bei N liegt).

---

## Kapitel 7 Befehlsreferenz (Anhang)

> Die vollständige Protokollbeschreibung finden Sie in `用户手册.md` im selben Verzeichnis. Hier folgt eine Schnellreferenztabelle.

### 7.1 Gestenbefehle

| Geste | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| Stein | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| Schere | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| Papier | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| Daumen hoch | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| Spott1 (Zeigefinger schütteln) | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| Spott2 (Ringfinger) | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| Öffnen | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| Faust | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| Kneifen | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| Zeigen | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 Steuerbefehle

| Befehl | HEX | Beschreibung |
|------|-----|------|
| Wiederholen | `AA FE 00 FE` | Letzte Geste wiederholen |
| Stopp | `AA FF 00 FF` | Sofort abbrechen |
| Rechte Hand setzen | `AA F1 01 01 F1` | — |
| Linke Hand setzen | `AA F1 01 02 F2` | — |
| Direktantrieb | `AA F0 08 [8×角度] CKSUM` | Winkel als 8 Byte |

### 7.3 Frame-Format

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 Host-Werkzeuge

| Werkzeug | Befehl | Zweck |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | Visuelle Gesten + Direktantrieb + Differenzial + Tracking |
| Gepackte exe | `dist/AmazingHand控制台.exe` | Visualisierung ohne Python-Installation (ohne Tracking) |
| Kommandozeile | `python serial_test.py COMx <cmd>` | Automatisierte Tests |

### 7.5 Tracking-Datenflussdateien (PWM-Version)

| Zweck | Datei |
|------|------|
| Linke Hand PWM-Tracking | `dataflow_tracking_real_left_pwm.yml` |
| Rechte Hand PWM-Tracking | `dataflow_tracking_real_right_pwm.yml` |
| Linke Hand PWM-Konfiguration | `AHControl/config/l_hand_pwm.toml` |
| Rechte Hand PWM-Konfiguration | `AHControl/config/r_hand_pwm.toml` |
