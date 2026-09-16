---
title: SCS0009-Servo-Debug-Tool – Anleitung
description: "FTServo-Debug-Tool speziell für den Feetech SCS0009 (Potentiometer-Rückmeldung, 10-Bit-Auflösung 0–1023), unterstützt serielle Verbindung, Servo-Scan."
---

# SCS0009-Servo-Debug-Tool – Anleitung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/feetech-scs0009-serial-bus-servo)**


Das **SCS0009-Servo-Debug-Tool** ist ein FTServo-Debug-Tool, das speziell für den SCS0009 aus den [Feetech-Bus-Servos](/de/products/feetech-servo) entwickelt wurde (Potentiometer-Rückmeldung, 10-Bit-Auflösung 0–1023). Über die grafische Oberfläche lassen sich serielle Verbindung, Servo-Scan, Parameter-Lesen/-Schreiben, Positionssteuerung, Baudrate ändern, Werkseinstellungen wiederherstellen sowie xdat-Parameter-Backup/-Wiederherstellung durchführen.

Dieses Tool wird von JUXI_Technology entwickelt und gepflegt und unter MIT-Lizenz veröffentlicht. FT-Debugger, xdat-Parameter-Backup/-Wiederherstellung, plattformübergreifende Unterstützung und weitere Funktionen sind Eigenentwicklungen.

## Kompatibilitätshinweis

> ⚠️ **Dieses Tool unterstützt derzeit nur den Feetech SCS0009 (SCS-Serie, Potentiometer-Positionsrückmeldung, 10-Bit-Auflösung 0–1023)**. Registertabelle, xdat-Parameterformat und Baudratentabelle sind auf den Feetech SCS0009 ausgelegt; für Servos anderer Marken/Modelle wird keine Kompatibilität garantiert.

## Funktionen

| Funktion | Beschreibung |
| ---- | ---- |
| Automatische Port-Erkennung | Intelligente Erkennung von USB-Seriell-Ports, automatisches Herausfiltern virtueller Geräte |
| Plattformübergreifend | Kompatibel mit Windows / Ubuntu / macOS |
| Umschaltung Chinesisch/Englisch | Ein-Klick-Umschaltung zwischen Chinesisch/Englisch in der Oberfläche, Auswahl wird automatisch gespeichert |
| Serielle Verbindung | Manuelle/automatische Portwahl, 8 Baudratenstufen (38400~1M) |
| Servo-Scan | Automatische Erkennung online befindlicher Servos (ID 1–254), Echtzeitanzeige |
| Parameter lesen | Liest alle 44 Register (EEPROM + SRAM) |
| Parametertabelle | 5 Spalten (Adresse/Register/Wert/Speicherbereich/Lesen-Schreiben), klickbare Verknüpfung |
| Positionssteuerung | Zielposition-/Geschwindigkeitssteuerung; nach Bewegungsende Hinweis zum Abschalten des Drehmoments |
| Baudrate ändern | Servo-Baudrate ändern, bei Fehlschlag automatischer Rollback |
| Werkseinstellungen | Werkseinstellungen mit einem Klick wiederherstellen |
| xdat-Parameter | Aktuelle EEPROM-Parameter des Servos speichern / Backup zum Wiederherstellen öffnen |

## Oberflächenübersicht

Das Hauptprogramm hat ein Einzelpanel-Layout (FT-Debugger); bei zu geringer Fensterhöhe erscheint automatisch eine Bildlaufleiste, beim Maximieren passt es sich elastisch an:

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **Obere Leiste**: App-Titel, Sprachumschaltfläche.
- **🔌 Serielle Verbindung**: Port und Baudrate wählen, Verbinden/Trennen.
- **🎯 Servo**: Scannen, Servo auswählen, Parameter/Status lesen.
- **📋 Parametertabelle**: 44 Register in 5 Spalten (Adresse/Register/Wert/Speicherbereich/Lesen-Schreiben); die Auswahl übernimmt automatisch die Schreibadresse.
- **🎯 Positionssteuerung**: Zielposition/Geschwindigkeit; nach Bewegungsende weist die Statusleiste auf das Abschalten des Drehmoments hin.
- **🔧 Baudrate/Werksreset**: Baudrate ändern (Rollback bei Fehlschlag), Werkseinstellungen wiederherstellen.
- **📁 xdat-Parameter (nur EEPROM)**: Parameter des aktuellen Servos speichern, Backup öffnen, wiederherstellen.

## Installation und Start

Systemvoraussetzungen:

| Abhängigkeit | Version | Beschreibung |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ empfohlen, Download von [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | GUI-Framework |
| pyserial | >= 3.5 | Serielle Kommunikation |
| System | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ unterstützt Apple Silicon / Intel |

Hardware-Anschluss: Servo-Steuerplatine über einen USB-zu-Seriell-Adapter (z. B. CH340 / CP2102) verbinden und die Servos mit Strom versorgen (Standardversion empfohlen DC 5V 5A, Pro-Version empfohlen DC 12V 5A).

### Windows

1. [Python 3.10+](https://www.python.org/downloads/) installieren (bei der Installation unbedingt **Add Python to PATH** ankreuzen, sonst findet die Kommandozeile `python` nicht). Installation prüfen:

```bash
python --version
```

2. Virtuelle Umgebung erstellen und Abhängigkeiten installieren:

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **Die virtuelle Umgebung muss nur einmal erstellt werden**. Ein erneutes Ausführen von `python -m venv .venv` setzt die vorhandene Umgebung zurück bzw. überschreibt sie (die installierten Abhängigkeiten werden gelöscht); danach genügt jeweils die Aktivierung mit `activate`.

> Hinweis: Nach der Aktivierung erscheint `(.venv)` als Präfix vor der Eingabeaufforderung.

3. Umgebung prüfen und starten:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Wenn `[OK] 环境检查通过，可以运行项目` angezeigt wird, ist die Umgebung korrekt eingerichtet.

4. Im Geräte-Manager (`Win+X` → Geräte-Manager) unter „Anschlüsse (COM und LPT)" die COM-Nummer prüfen:

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Notieren Sie die COM-Nummer** und wählen Sie sie nach dem Start aus; alternativ können Sie den Port manuell angeben (wenn der Port belegt ist):

```bash
python -m src.gui.factory_calibration_tool --port COM3
```

Verfügbare Ports anzeigen:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Chinesische Schriftarten und Abhängigkeiten installieren (die chinesischen Schriftarten sind für die Anzeige der chinesischen Oberfläche erforderlich, die Emoji-Schriftart für Symbole wie ✅⚠️ im Log):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Port-Berechtigung hinzufügen (Gruppe dialout)【erforderlich】** (unter Linux können normale Benutzer standardmäßig nicht auf `/dev/ttyUSB*` / `/dev/ttyACM*` zugreifen):

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

Prüfen (die Ausgabe sollte `dialout` enthalten):

```bash
groups
```

> Falls dies nicht wirkt: Computer neu starten; bei manchen Distributionen heißt die Gruppe `uucp` (Arch) oder `tty`.

3. Virtuelle Umgebung erstellen, Abhängigkeiten installieren und starten:

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **Die virtuelle Umgebung muss nur einmal erstellt werden**. Ein erneutes Ausführen von `python3 -m venv .venv` überschreibt die vorhandene Umgebung (die installierten Abhängigkeiten werden gelöscht); danach genügt jeweils `source .venv/bin/activate`.

> Meldet pip den Fehler „externally managed environment", verwenden Sie alternativ `pip install --break-system-packages -r requirements.txt` oder eine virtuelle Umgebung.

4. USB-zu-Seriell-Gerät erkennen (nach dem Einstecken des Adapters):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Typische Ausgabe:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Detaillierte Herstellerinformationen anzeigen:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Bei mehreren Geräten werden `ttyUSB0` / `ttyUSB1` in der Reihenfolge des An-/Absteckens zugewiesen und können dadurch instabil sein. Empfohlen: `/dev/ttyACM*` verwenden oder die Namen anhand des Herstellers fixieren (siehe udev-Abschnitt unten).

Port manuell angeben:

```bash
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

5. Optional: Gerätenamen per udev fixieren (verhindert Nummerndrift nach dem An-/Abstecken). Erstellen Sie `/etc/udev/rules.d/99-servo.rules` und fixieren Sie die Namen anhand der USB-ID:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Danach ist der Zugriff über den festen Namen mit `ls -l /dev/ttyServo` möglich; die Hersteller-ID ermitteln Sie mit `lsusb`.

### macOS

1. Python über Homebrew installieren (vermeidet die veraltete systemeigene Python-Version):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Prüfen:

```bash
python3 --version
```

2. Virtuelle Umgebung erstellen, Abhängigkeiten installieren und starten (mit `source` aktivieren, nicht mit `.bat`):

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **Die virtuelle Umgebung muss nur einmal erstellt werden**. Ein erneutes Ausführen von `python3 -m venv .venv` überschreibt die vorhandene Umgebung (die installierten Abhängigkeiten werden gelöscht); danach genügt jeweils `source .venv/bin/activate`.

3. **⚠️ Serielle Portnamen**: macOS legt USB-Seriell-Geräte unter `/dev` ab; es gibt **zwei Namensschemata**:

| Präfix | Bedeutung | Geeignet |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Modem-Stil (blockierend) | kann hängen bleiben, nicht empfohlen |
| `/dev/cu.usbserial-*` | Callout-/Terminal-Stil (**nicht blockierend**) | ✅ empfohlen |

Portnamen anzeigen:

```bash
ls /dev/cu.*
```

Typische Ausgabe:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> Das Programm bevorzugt automatisch `cu.*`-Geräte; bei manueller Portangabe verwenden Sie `cu.` statt `tty.`.

Port manuell angeben:

```bash
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. USB-Treiber: Für die meisten gängigen Chips (CH340, CP2102, FTDI) bringt macOS die Treiber bereits mit – Plug-and-Play. Falls das Gerät nicht erkannt wird:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: Bei älteren Chargen muss der offizielle WCH-Treiber installiert werden;
- Im Allgemeinen genügt es, wenn `ls /dev/cu.*` das Gerät anzeigt.

5. Nutzungshinweise:
   - **Der Portname kann sich ändern**: Nach dem Umstecken an einen anderen USB-Port kann sich der `cu.*`-Name ändern; wählen Sie ihn bei jedem Start im Bereich „🔌 Serielle Verbindung" aus.
   - **Energiesparen**: Der Ruhezustand von macOS kann den seriellen Port trennen; halten Sie das System während der Bedienung wach oder erhöhen Sie die Ruhezustandszeit.
   - **Datenschutzberechtigung**: Erscheint beim ersten Start die Abfrage „Zugriff auf Wechseldatenträger", klicken Sie auf „Erlauben".

## Bedienung

### 1. Servos verbinden und erkennen

1. Servo-Steuerplatine über den USB-zu-Seriell-Adapter anschließen und die Servos mit Strom versorgen.
2. GUI öffnen, im Bereich „🔌 Serielle Verbindung" den Port wählen (oder `🔄` zum Aktualisieren anklicken) und die Baudrate einstellen (Standard 1M).
3. Auf **Verbinden** klicken; der Status zeigt `🟢 Verbunden`.

> Erscheint die Meldung, dass der Port belegt ist, stellen Sie sicher, dass kein anderes Programm (serieller Monitor, ein zuvor nicht beendetes Tool) den Port belegt.

> Ist nur ein serieller Anschluss vorhanden, setzt das Tool den zweiten Port automatisch auf „Deaktiviert".

### 2. Servos scannen

1. Auf **🔍 Servos scannen** klicken, um online befindliche Servos im ID-Bereich 1–254 zu erkennen.
2. Die Scan-Ergebnisse werden in Echtzeit in der Servoliste angezeigt (mit Modellbezeichnung).
3. Klicken Sie in der Servoliste auf eine Zeile, um sie automatisch in das Dropdown „Servo" zu übernehmen.

### 3. Parameter lesen

1. Nach Auswahl des Servos auf **📖 Parameter lesen** klicken, um alle 44 Register einzeln zu lesen.
2. Die Parametertabelle zeigt 5 Spalten (Adresse/Register/Wert/Speicherbereich/Lesen-Schreiben); EPROM / SRAM / DEFAULT sind farblich unterschieden.
3. Der Log-Bereich zeigt das Leseergebnis jedes Registers und die Fehlerursache an.

Die Bedeutung der einzelnen Register ist unter [Potentiometer-SCSCL-Servo – Analyse der Speichertabelle](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md) beschrieben.

### 4. Parameter ändern / Schreiben

1. In der Parametertabelle auf die zu ändernde Registerzeile klicken → „Schreibadresse", „Länge" und „Wert" werden automatisch übernommen.
2. Im Eingabefeld „Wert" den neuen Wert eintragen und auf **✏️ Schreiben** klicken.
3. Das Programm führt aus: EEPROM entsperren → schreiben → wieder sperren.
4. Ergebnisdialog: Bei Erfolg erscheint ein grüner Hinweis „✅ Erfolgreich geschrieben", bei Fehlschlag ein roter Hinweis „❌ Schreiben fehlgeschlagen" (mit Ursache).

### 5. Servo-ID ändern

1. In der Parametertabelle die Zeile „Servo-ID" (Adresse 0x05) suchen und anklicken.
2. Im Feld „Wert" die neue ID eintragen und auf **✏️ Schreiben** klicken.
3. Das Programm führt aus: Entsperren → Schreiben an Adresse 5 → wieder sperren.

> ⚠️ Stellen Sie vor dem Ändern der ID sicher, dass nur dieser eine Servo am Bus hängt, um ID-Konflikte zu vermeiden.

### 6. Positionssteuerung

1. Im Bereich „🎯 Positionssteuerung" **den Schieberegler ziehen**, um die Zielposition anzupassen (0–1023, 10-Bit-Auflösung des Potentiometers); das Zahlenfeld zeigt den Wert synchron an; alternativ können Sie direkt in das Zahlenfeld eingeben, der Schieberegler folgt synchron.
2. Auf **▶ Bewegen** klicken; der Servo beginnt zu fahren, die Statusleiste zeigt „Bewegung läuft..." an.
3. Nach Abschluss der Bewegung erscheint „✅ Bewegung abgeschlossen, bitte Drehmoment abschalten"; klicken Sie auf **⏹ Drehmoment aus**.

### 7. Baudrate ändern / Werkseinstellungen wiederherstellen

- **Baudrate ändern**: Im Bereich „🔧 Baudrate/Werksreset" die neue Baudrate wählen (38400 – 1000000 bps) und auf **🔧 Baudrate ändern** klicken. Nach dem Schreiben wird die Baudrate des seriellen Ports automatisch umgestellt und per Ping verifiziert; bei Fehlschlag erfolgt ein automatischer Rollback.
- **Werkseinstellungen wiederherstellen**: Auf **🔄 Werksreset** klicken; der Servo wird auf die Werkseinstellungen zurückgesetzt (ID=1, Baudrate=1000000); danach muss erneut gescannt werden.

### 8. xdat-Parameter-Backup und -Wiederherstellung

Im Bereich „📁 xdat-Parameter (nur EEPROM)":

1. **💾 Aktuellen Servo speichern**: Die EEPROM-Parameter des aktuell ausgewählten Servos als xdat-Datei speichern (Backup).
2. Nach beliebigen Änderungen an den Servoparametern können Sie wie folgt wiederherstellen:
3. **📂 xdat öffnen**: Die Backup-Datei laden.
4. **📤 Parameter auf Servo zurückschreiben**: Das Backup zurück in das EEPROM des aktuellen Servos schreiben.

## Hinweise

1. **Sicherheit geht vor**: Das Schreiben von Parametern wird dauerhaft im EEPROM gespeichert. Stellen Sie vor dem Schreiben eine stabile Stromversorgung sicher und prüfen Sie, dass der Roboterarm weder Personen noch Gegenstände treffen kann.
2. **Stromversorgung**: SoARM 101 Standardversion empfohlen DC 5V 5A, Pro-Version empfohlen DC 12V 5A. Unzureichende Stromversorgung führt zu Schrittverlusten oder Kommunikationsfehlern.
3. **Exklusiver Zugriff auf den Port**: Unter Windows wird der serielle Port vom Programm exklusiv belegt; derselbe Port kann nicht gleichzeitig von zwei Programmen verwendet werden. Verwenden Sie dieses Tool nicht, während ein anderes Programm (serieller Monitor) denselben Port geöffnet hat.
4. **Linux-Port-Berechtigung**: Für den Zugriff auf `/dev/ttyUSB*` / `/dev/ttyACM*` muss der Benutzer zur Gruppe `dialout` hinzugefügt werden (siehe Abschnitt „Linux" oben).
5. **macOS-Portnamen**: Verwenden Sie `/dev/cu.*` (nicht blockierend) statt `/dev/tty.*` (blockierend, kann hängen bleiben), siehe Abschnitt „macOS" oben.
6. **Hot-Plug**: Nach dem Abziehen des USB-Kabels versucht das Programm automatisch, die Verbindung wiederherzustellen; nach dem erneuten Einstecken `🔄` anklicken, um die Portliste zu aktualisieren.
7. **Übertemperatur-/Überspannungsschutz**: Das Programm überwacht Spannung und Temperatur (Warnung bei Temperatur > 60°C). Bei anhaltend hoher Servotemperatur das System stoppen und abkühlen lassen.
8. **Parameter-Write ist irreversibel**: Nach dem Schreiben ins EEPROM wird der ursprüngliche Wert überschrieben und kann nicht rückgängig gemacht werden. Empfehlung: Zuerst mit „xdat – Aktuellen Servo speichern" ein Backup anlegen, dann ändern.
9. **Risiko bei ID-Änderung**: Bei Schreib- oder Verifizierungsfehlern meldet das Programm einen Fehler, in Extremfällen kann der Servo jedoch „den Kontakt verlieren". Bei Kontaktverlust können Sie „Werksreset" versuchen (nach dem Reset ist die ID wieder 1).
10. **Kodierungsprobleme**: Bei Emoji-Zeichensalat in der Windows-Konsole setzen Sie `PYTHONIOENCODING=utf-8` und führen Sie das Kommandozeilen-Tool anschließend erneut aus. Unter Linux / macOS mit nativem UTF-8 tritt dieses Problem normalerweise nicht auf.

## Fehlerbehebung

| Symptom | Mögliche Ursache | Lösung |
| ---- | -------- | -------- |
| Serieller Port lässt sich nicht öffnen / Port belegt | Anderes Programm belegt den Port | Programme wie serielle Monitore schließen oder den Port wechseln und das Tool neu starten |
| Windows: PermissionError beim Öffnen des Ports | Anderer Prozess belegt den COM-Port | Sicherstellen, dass kein anderer Prozess diesen COM-Port belegt |
| Keine Servos gefunden | Unzureichende Stromversorgung / falsche Verkabelung / falsche Baudrate | Stromversorgung und Verkabelung prüfen; sicherstellen, dass der Servo mit 1M Baudrate läuft |
| Parameterlesen schlägt fehl | Port belegt / Servo antwortet nicht | Andere Programme schließen; Verbindung neu aufbauen; prüfen, ob die Adresse korrekt ist |
| Schreiben schlägt fehl | Unzureichende Servoversorgung oder Zielregister nicht schreibbar | Stromversorgung und Verbindung des Servos prüfen; sicherstellen, dass das Zielregister schreibbar ist |
| Temperaturanstieg zu schnell | Überlast oder Blockade | Mechanik auf Blockaden prüfen, Geschwindigkeit/Beschleunigung reduzieren |
| Servo nach ID-Änderung nicht auffindbar | ID-Konflikt oder Schreiben fehlgeschlagen | Werkseinstellungen wiederherstellen, erneut scannen |
| Windows: Port nicht gefunden | Treiber fehlt | Im Geräte-Manager den Treiber prüfen; anderen USB-Port verwenden; CH340-Treiber installieren |
| Linux: Port nicht gefunden | Gerät nicht erkannt | `ls /dev/ttyUSB* /dev/ttyACM*`; Gerät mit `lsusb` prüfen |
| Permission denied: /dev/ttyUSB0 | Benutzer nicht in der Gruppe dialout | `sudo usermod -a -G dialout $USER` ausführen und neu anmelden; oder `sudo chmod 666 /dev/ttyUSB0` (temporär) |
| Linux: Gerätename ändert sich | An-/Absteckreihenfolge beeinflusst die ttyUSB-Nummerierung | Namen per udev-Regel fixieren (siehe Abschnitt „Linux" oben) oder bei jedem Start auswählen |
| macOS: Portname mit `tty.` bleibt hängen | Blockierender Gerätename verwendet | Geräte mit `cu.`-Präfix verwenden |
| macOS: Gerät nicht gefunden | Gerät nicht erkannt | `ls /dev/cu.*`; aus- und wieder einstecken; mit `system_profiler SPUSBDataType` prüfen |
| macOS: Berechtigungsproblem | Systemzugriffskontrolle | Normalerweise keine zusätzlichen Berechtigungen nötig; bei Zugriffskontrollabfrage dem Terminal den Zugriff erlauben |
| Chinesische Oberfläche leer | Chinesische Schriftarten fehlen | Unter Windows standardmäßig Microsoft YaHei (bei Problemen chinesische Schriftart installieren); unter Linux `fonts-noto-cjk` installieren; unter macOS standardmäßig PingFang (bei Problemen Noto Sans CJK installieren) |
| Emojis werden als Kästchen angezeigt | Emoji-Schriftart fehlt | `fonts-noto-color-emoji` installieren |
| pip-Installation schlägt fehl | System-Python geschützt (externally managed environment) | Virtuelle Umgebung verwenden; oder `pip install --break-system-packages -r requirements.txt` |
| Programm startet nicht | Abhängigkeiten fehlen oder Version passt nicht | Version mit `python3 --version` prüfen; Abhängigkeiten mit `pip list` prüfen |
| macOS: Aktivierung der virtuellen Umgebung schlägt fehl | Falsches Aktivierungsskript | `source .venv/bin/activate` verwenden (nicht `.bat`) |
| macOS Apple Silicon: Kompilierungsfehler | Altes Python unter Rosetta | Python 3.10+ verwenden (native Apple-Silicon-Unterstützung) |

## Verzeichnisstruktur

```
SCS0009_ServoController/
├── docs/                    # 分系统教程（中英文）
│   ├── zh/                  # 中文教程
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # 英文教程
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主窗口（FT 调试器 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器面板（参数读写 / xdat 备份）
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   └── port_utils.py         # 串口检测
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

Das Tool-Repository besteht aus den Modulen `src/gui` (PySide6-GUI mit FT-Debugger), `scservo_sdk` (FTServo-Servo-Kommunikations-SDK) und `setup.py` (Skript zur Umgebungsprüfung).

<RelatedProducts slugs="feetech-servo" />
