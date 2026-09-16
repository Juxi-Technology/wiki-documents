---
title: "Teleoperation-Fehlerbehebung"
description: "Die häufigsten Fehler bei der drahtlosen Teleoperation des SO-ARM101 (ESP32-NanoCam-Version): Symptome."
---

# Teleoperation-Fehlerbehebung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

Diese Seite fasst die gängigen Fehlerbehebungen für die drahtlose Teleoperation des SO-ARM101 mit ESP32-NanoCam zusammen. Der vollständige Ablauf steht unter [SO-ARM101 Drahtlose Teleoperation (ESP32-NanoCam-Version)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## Allgemeine Schnellübersicht zur Fehlersuche

| Symptom | Prüfung |
|---|---|
| Keine Verbindung beim Flashen | Manuell in den Download-Modus gehen (BOOT+Reset); in `platformio.ini` `upload_port` ergänzen |
| Keine serielle Ausgabe nach dem Flashen | USB-Kabel und CH340-Treiber prüfen; unter Windows den COM-Anschluss im Geräte-Manager kontrollieren |
| Bleibt bei `Waiting for micro-ROS Agent...` hängen | AGENT_IP / UDP 8888 / Client-Isolation prüfen |
| Servo-Bus reagiert nicht (`servo_mask≠0x3f`) | Sicherstellen, dass der Anschluss über die UART der Servo-Treiberplatine an P2-7/P2-8 erfolgt; Folgearm über externes 12V-5A-Netzteil versorgen |
| Mikrofonpegel konstant 0 | Log `audio: ES8311 ready` prüfen; Pull-up auf I2C 41/42; zur Kontrolle ins Mikrofon pusten |
| Lautsprecher ohne Ton | Lautsprecheranschluss prüfen; Lautstärkeregister `R_DAC32` des ES8311 (in der aktuellen Firmware bereits auf Maximum 0xFF gesetzt) |
| WiFi bricht häufig ab | Antenne und Abstand prüfen; rotes RGB bedeutet WiFi-Verlust, nach 10 s automatischer Neustart |

## Probleme beim Flashen und mit der seriellen Schnittstelle

- **Keine Verbindung beim Flashen**: BOOT-Taste (GPIO0) gedrückt halten → USB einstecken (oder Reset drücken) → BOOT loslassen, dann sofort upload erneut ausführen. Wird der Anschluss unter Windows nicht automatisch erkannt, in `platformio.ini` unter `[env:nano_cam]` die Zeile `upload_port = COM3` ergänzen (durch die tatsächliche COM-Nummer des CH340 aus dem Geräte-Manager ersetzen).
- **Keine serielle Ausgabe nach dem Flashen**: Der USB-Anschluss der NanoCam ist ein CH340K → UART0, unter Linux lautet der Gerätename `/dev/ttyUSB0`; falls beim Einstecken nichts erkannt wird, USB-Kabel und CH340-Treiber prüfen (im Kernel enthalten).
- **Servo-Bus reagiert nicht (`servo_mask≠0x3f`)**: Sicherstellen, dass der Servo-Bus über die UART der Servo-Treiberplatine an **P2-7/P2-8** (GPIO19/20) angeschlossen ist und nicht an den UART0-Pins 43/44; der Folgearm muss über ein externes 12V-5A-Netzteil versorgt werden (USB reicht für 6 Servos nicht).
- **Verwechslung von Servo-Bus und Debug-Serielle**: Die Debug-Serielle ist USB-C (CH340K → UART0) und vom Servo-Bus vollständig unabhängig; beide können gleichzeitig genutzt werden.

## Probleme beim Kompilieren und mit der Toolchain

- **Erster `pio run` lädt langsam / hängt** (beim ersten Mal werden nacheinander die espressif32-Plattform, die Toolchain `toolchain-xtensa-esp32s3` mit ca. 100 MB und das Arduino-Framework mit ca. 200 MB geladen): Die Restzeit-Schätzung von PlatformIO ist ungenau, häufig hängt es eine Weile und springt dann plötzlich durch — 5 Minuten beobachten, ob der Prozentsatz voranschreitet; optional Proxy/VPN aktivieren (Systemproxy wird verwendet);
- **Toolchain manuell herunterladen**: Im Browser `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` herunterladen (unter Linux entsprechend `-linux-amd64.tar.gz`), entpacken, das Verzeichnis in `toolchain-xtensa-esp32s3` umbenennen und nach `C:\Users\<Benutzername>\.platformio\packages\` legen, dann `pio run` erneut ausführen; ein Abbruch mit Ctrl+C beschädigt die Umgebung nicht, ein erneuter Lauf setzt fort;
- **`pio`-Befehl wird unter Windows in Git Bash nicht gefunden**: PowerShell/CMD-Terminal verwenden oder `C:\Users\<Benutzername>\.platformio\penv\Scripts` zum PATH hinzufügen.

## Kamera-spezifische Fehlersuche

| Symptom | Ursache | Behebung |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **I2C-Konflikt**: ES8311 belegt mit `Wire1` die Pins GPIO41/42, der Kamera-SCCB-Treiber wird bei der I2C-Installation abgelehnt | Am Ende von `init()` in `audio_es8311.cpp` `Wire1.end()` ergänzen, um I2C für die Kamera freizugeben |
| `JPEG format is not supported on this sensor` (0x106) | **GC2145 hat keinen Hardware-JPEG-Encoder** (nur OV2640/OV5640) | Aufnahme auf `PIXFORMAT_RGB565` umstellen, `/stream` und `/jpg` mit `frame2jpg` in Software zu JPEG kodieren |
| `/jpg`, `/stream` ohne Antwort, Browser lädt endlos | **httpd-Stack-Überlauf**: Der Standard-Stack von 8 KB reicht für die `frame2jpg`-Softwarekodierung nicht aus | In `start_server()` `config.stack_size = 16384` setzen |
| `/stream` öffnet, aber das Bild ist schwarz | **Fehlende Multipart-Boundary**: Zwischen den Frames wird kein `STREAM_BOUNDARY` gesendet, der Browser kann nicht parsen | Vor jedem Frame `STREAM_BOUNDARY` nachsenden |
| curl-Test von `/jpg` liefert `HTTP:000`, im Browser erscheint aber ein Bild | esp_http_server arbeitet **single-tasking**: Solange `/stream` den httpd-Task belegt, kommt `/jpg` nicht an die Reihe; oder das curl-Timeout ist zu kurz | `/stream` schließen und `/jpg` separat testen; zur Kontrolle den Browser statt curl verwenden |
| Kamera initialisiert erfolgreich, Bild aber komplett schwarz / keine Frames | Meist **Hardware**: AVDD/DOVDD-Versorgung, PWDN-Pegel, Flachkabelkontakt | Zuerst im Browser `/jpg` als Schnappschuss testen (Bild erscheint = Link in Ordnung); 2,8V-Versorgung der Kamera und Flachkabel prüfen |
| VGA-Bild in etwa den unteren 2/3 verrauscht | **DVP-Datenrate zu hoch**: VGA RGB565 überschreitet die Timing-Reserve des DVP auf diesem Board (bei 24/20/16 MHz × Einzel-/Doppelpuffer reproduzierbar); QVGA normal | Für die offizielle Konfiguration **QVGA 320×240** verwenden (für FPV ausreichend) oder einen stabileren XCLK wählen / die DVP-Hardwareverdrahtung ändern |

> Hinweis: Die ersten vier Punkte in der Tabelle sind in der mitgelieferten Firmware bereits behoben — es genügt, die neueste Firmware zu flashen, manuelle Codeänderungen sind nicht nötig.

**Achtung**: esp_http_server arbeitet single-tasking, `/stream` und `/jpg` können nicht gleichzeitig verwendet werden — während `/stream` läuft, bleibt `/jpg` hängen. Vor dem Abgreifen eines Einzelbildes die Stream-Seite schließen.

## Audio-spezifische Fehlersuche

| Symptom | Ursache | Behebung |
|---|---|---|
| Lautsprecher **komplett stumm** + Mikrofonpegel ≈ 0 (z. B. `0.0009`) | **Kein MCLK-Ausgang**: Der Legacy-I2S-Treiber erzeugt auf dem ESP32-S3 kein MCLK, der interne DAC/ADC des ES8311 erhält keinen Takt | **MCLK mit LEDC an GPIO39 mit 6,15 MHz erzeugen** (`start_ledc_mclk()` in `audio_es8311.cpp`) |
| Signaltöne **zu leise** (nur mit dem Ohr am Lautsprecher hörbar) | Geringe digitale Amplitude + niedrige ES8311-Hauptlautstärke | `play_tone`-Amplitude 12000→30000, `R_DAC32` 0x30→0xFF (ca. +29 dB) |
| Nach dem Einschalten nur das Start-„Bip", keine weiteren Signaltöne | **Normales Verhalten**: Bereitschafts- und Entsperr-Signaltöne sind ereignisgesteuert und werden erst bei laufender Teleoperation ausgelöst | Startton = sofort beim Einschalten; Bereitschaftston = Agent-Kommunikation aufgebaut; Entsperrton = Steuerbefehl empfangen |

> Hinweis: Die ersten beiden Punkte sind in der mitgelieferten Firmware behoben; der dritte Punkt ist normales Verhalten und erfordert keine Maßnahme.

## Hardware-Prüfung von Mikrofon, Lautsprecher und RGB

- **Mikrofonpegel dauerhaft 0**: Log `audio: ES8311 ready` prüfen; sicherstellen, dass MCLK ausgegeben wird (an GPIO39 sollten ~1,65 V anliegen, LEDC-erzeugt); Pull-up am I2C-Bus 41/42 (auf dem Board sind 10K vorhanden); ins Mikrofon pusten und prüfen, ob `/follower_audio/level` ausschlägt.
- **Kein Ton vom Lautsprecher**: Sicherstellen, dass der NS4150B-Lautsprecher am Lautsprecheranschluss sitzt; prüfen, ob GPIO39 MCLK ausgibt (LEDC, `start_ledc_mclk()`); Lautstärkeregister `R_DAC32` (aktuell 0xFF); ist der ES8311 nicht initialisiert, gibt das Log die Fehlerursache aus.
- **RGB-LED leuchtet nicht**: Der Datenpin des WS2812 ist GPIO18; im Startlog prüfen, ob vor `camera_stream` ein RMT-Initialisierungsfehler erscheint (normalerweise nicht).

## Netzwerk- und micro-ROS-Probleme

- **Bleibt bei `Waiting for micro-ROS Agent...` hängen**: Nacheinander prüfen, ob `AGENT_IP` die LAN-IP des Ubuntu-Rechners enthält, ob UDP 8888 freigegeben ist und ob Router/Hotspot die Client-Isolation aktiviert haben (muss deaktiviert werden). Die Antenne der NanoCam ist die U.FL-Antenne auf dem Modul; bei schlechtem RSSI zuerst Antenne und Aufstellung prüfen und am besten eine Messreihe über 5/10/20/30 Meter durchführen.
- **WiFi bricht häufig ab**: Antenne und Abstand prüfen; wird das RGB rot, ist das WiFi verloren, die Firmware startet nach 10 s Timeout automatisch neu.
- **Bei fehlender Verbindung zuerst die Umgebung prüfen**: NanoCam und Ubuntu-Rechner müssen im selben 2,4-GHz-LAN sein (Smartphone-Hotspot genügt); nach einem Netzwerkwechsel daran denken, `AGENT_IP` und WiFi-Konfiguration anzupassen (siehe Abschnitt „WiFi konfigurieren" im Tutorial zur drahtlosen Teleoperation).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
