---
title: Schnellstart — Vom Auspacken bis zum lauffähigen JetPack-7.2.1-System
sidebar_label: Schnellstart
slug: /getting-started/quick-start
description: >-
  Ersteinrichtung für das NVIDIA Jetson Orin Nano Super Developer Kit (8GB):
  die Firmware-Prüfung, das Schreiben des Jetson-7.2.1-ISO auf einen USB-Stick
  und die Installation von JetPack 7.2.1 (L4T r39.2.1) auf eine microSD-Karte
  oder NVMe-SSD.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Schnellstart

Diese Seite führt Ihr NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) vom Karton bis zu einem lauffähigen **JetPack 7.2.1**-System (Jetson Linux / L4T r39.2.1). Sie folgt NVIDIAs empfohlenem Weg für die Ersteinrichtung: der **Jetson-ISO**-Methode, installiert von einem USB-Stick. Ein Ubuntu-Host-PC ist nicht erforderlich.

**Der Weg in drei Phasen:**

1. **Die Firmware-Hürde nehmen.** Ältere Werks-Firmware muss aktualisiert werden, bevor JetPack 7.2 installiert werden kann (Schritt 1).
2. **Den Installations-USB-Stick erstellen.** Laden Sie das Jetson-ISO herunter und schreiben Sie es mit Balena Etcher auf einen USB-Stick (Schritte 2–3).
3. **Installieren und einrichten.** Installieren Sie auf eine microSD-Karte oder eine NVMe-SSD, schließen Sie die Ubuntu-Ersteinrichtung ab und fügen Sie dann die JetPack-Komponenten hinzu (Schritte 4–7).

> **Wichtig**
> Ab JetPack 7.2 veröffentlicht NVIDIA keine microSD-Karten-Images mehr für
> dieses Kit. Es gibt **kein SD-Karten-Image zum Flashen**. Das
> Installationsmedium ist ein USB-Stick. Die microSD-Karte (oder NVMe-SSD) ist
> nur das **Installationsziel**. Ältere Tutorials, die mit „Schreiben Sie das
> Image auf eine microSD-Karte“ beginnen, gelten nicht mehr.

## Lieferumfang

- Das Jetson Orin Nano 8-GB-Modul mit Kühlkörper, montiert auf der Referenz-Trägerplatine
- Ein 19-V-Netzteil
- Ein WLAN-Netzwerkcontroller 802.11ac/ab/gn (im M.2-Key-E-Steckplatz installiert)
- Eine Schnellstart- und Support-Karte

**Es ist kein Speichermedium enthalten.** Der Karton enthält weder eine microSD-Karte noch eine NVMe-SSD, und das Modul hat keinen integrierten eMMC-Speicher. Der gesamte Speicher kommt von der Karte oder dem Laufwerk, das Sie installieren.

## Was Sie selbst bereitstellen müssen

- **Speicher — eines der Folgenden:**
  - Eine **microSD-Karte, 64 GB UHS-1 oder größer** (empfohlen). Sie kommt in den Steckplatz auf der **Unterseite des Moduls**. Legen Sie sie ein, bevor Sie den Installer booten.
  - Eine **NVMe-SSD** für einen der M.2-Key-M-Steckplätze auf der Trägerplatine. Optional, aber empfohlen für mehr Kapazität und bessere Speicherleistung.
- Ein **USB-Stick, 16 GB oder größer** — dieser wird zum Installer.
- Ein **Laptop oder PC** (Windows, Mac oder Linux) mit mindestens **25 GB freiem Speicherplatz** — zum Herunterladen des ISO und Schreiben des USB-Sticks.
- Ein **DisplayPort-Monitor** sowie USB-Tastatur und -Maus. DisplayPort ist die einzige Bildausgabe dieses Kits; HDMI-Ausgabe und DisplayPort über USB-C werden nicht unterstützt. Ein aktiver DisplayPort-auf-HDMI-Adapter funktioniert mit einem HDMI-Monitor.
- Ohne Monitor: ein **USB-TTL-Seriellkabel** für eine serielle Headless-Konsole (siehe Schritt 1).

![microSD-Karte](/images/jetson-orin-nano/microsd_64gb.png)
*Option 1 für den Zielspeicher: eine 64-GB-UHS-1-microSD-Karte.*

![NVMe-SSD](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*Option 2 für den Zielspeicher: eine NVMe-SSD im M.2-Key-M-Steckplatz.*

> **Juxi-Hinweis:** Das Juxi-Shop-Bundle für dieses Kit enthält zusätzlich eine
> 64-GB-microSD-Karte und ein M.2-WLAN-Modul. Die Karte wird **nicht vorab mit
> einem Image bespielt** (leer) ausgeliefert; folgen Sie daher dem ISO-Verfahren
> auf dieser Seite, um das System darauf zu installieren.

## Schritt 1 — Die Firmware-Hürde prüfen

Installationen von JetPack 7.2 und später **erfordern UEFI/QSPI-Firmware der JetPack-6.x-Generation** auf dem Developer Kit. Wenn Ihr Kit noch ältere Werks-Firmware hat, schließen Sie zuerst den **JetPack-6.x-Update-Pfad** ab.

Mit angeschlossenem Monitor:

1. Schließen Sie den DisplayPort-Monitor und eine USB-Tastatur an. Schließen Sie das 19-V-Netzteil an — das Kit schaltet sich automatisch ein, und eine grüne LED neben dem USB-C-Anschluss leuchtet auf.
2. **Drücken Sie wiederholt `Esc`, sobald der NVIDIA-Boot-Splash erscheint.** Damit öffnen Sie das UEFI-Setup-Menü.
3. Prüfen Sie die Zeile mit der **Firmware-Version** oben auf dem Bildschirm:

| Firmware-Version | Was zu tun ist |
|---|---|
| 36.x oder neuer | Mit Schritt 2 fortfahren |
| Älter als 36.0 | Zuerst den JetPack-6.x-Update-Pfad abschließen (siehe unten) |

![UEFI-Menü mit der Firmware-Version](/images/jetson-orin-nano/firmware-version-check.png)
*Die Firmware-Version wird oben im UEFI-Setup-Menü angezeigt.*

Headless-Alternative: Schließen Sie ein USB-TTL-Seriellkabel an den Button-Header an (TX-Leitung des Adapters an Pin 3 / RXD, RX-Leitung an Pin 4 / TXD, Masseleitung an Pin 7 / GND), öffnen Sie eine serielle Konsole auf Ihrem PC und drücken Sie `Esc` in der Konsole, während die Pre-Boot-Optionen angezeigt werden.

![USB-TTL-Seriellkabel am Button-Header](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*Headless-Weg: ein USB-TTL-Seriellkabel am Button-Header.*

### Wenn die Firmware zu alt ist

Der **JetPack-6.x-Update-Pfad** bringt die Firmware auf den aktuellen Stand. Kurz gefasst (vollständige Schritte unter [Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)):

1. Booten Sie das **JetPack-5.1.3-Bridge-Image** (Dateiname `JP513-orin-nano-sd-card-image_b29.zip`) von einer microSD-Karte.
2. Ein Hintergrunddienst plant ein Bootloader-Update (prüfen mit `sudo systemctl status nv-l4t-bootloader-config`).
3. Starten Sie neu. Das Firmware-Update läuft während dieses Bootvorgangs (prüfen mit `sudo nvbootctrl dump-slots-info`).
4. Installieren Sie den QSPI-Updater: `sudo apt update`, dann `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`, dann neu starten.
5. Schalten Sie das Kit aus, entfernen Sie die Bridge-Karte, setzen Sie Ihren Zielspeicher ein und fahren Sie mit Schritt 2 fort.

Dieser Pfad benötigt eine microSD-Karte und einen Kartenleser. Ohne diese ist der SDK Manager auf einem Ubuntu-Host die Alternative (siehe [Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)). Ein weiterer Fall: Stammt die Firmware von BSP 36.2 (JetPack 5.0 DP), unterstützt das Capsule-Update im Installer sie nicht — bringen Sie das Kit zuerst auf ein beliebiges späteres Release, bevor Sie die JetPack-7.2.1-ISO-Installation ausführen.

Wenn Sie den Installer trotzdem booten und der Bildschirm schwarz bleibt oder in eine UEFI-Shell wechselt, ist die Firmware wahrscheinlich zu alt. Wiederholen Sie den Bootversuch nicht mehrfach. Schalten Sie das Kit aus, schließen Sie den Update-Pfad ab und versuchen Sie es erneut.

![UEFI-Shell](/images/jetson-orin-nano/uefi_interactive_shell.png)
*Eine UEFI-Shell (oder ein schwarzer Bildschirm) statt des Installers bedeutet meist, dass die Firmware für das Ziel-JetPack-Release zu alt ist.*

## Schritt 2 — Das Jetson-ISO herunterladen

Laden Sie das Installations-ISO von JetPack 7.2.1 (Bezeichnung: **Jetson ISO (r39.2.1)**) von der
[JetPack-Downloadseite](https://developer.nvidia.com/embedded/jetpack/downloads) herunter, oder verwenden Sie diesen direkten Link:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

ISO-Dateinamen folgen dem Muster `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` (für dieses Release: `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). NVIDIAs Downloadseiten geben weder die Dateigröße des ISO noch Prüfsummen an.

## Schritt 3 — Das ISO auf einen USB-Stick schreiben

1. Installieren Sie **Balena Etcher** von <https://etcher.balena.io/#download-etcher> (Windows, Mac oder Linux).
2. Stecken Sie den USB-Stick in Ihren PC.
3. Wählen Sie in Etcher die ISO-Datei, wählen Sie das USB-Laufwerk und starten Sie den Schreibvorgang.

![Schreiben des Jetson-ISO auf einen USB-Stick mit Balena Etcher](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Schreiben des Jetson-ISO auf den USB-Stick mit Balena Etcher.*

> **Achtung**
> **Schreiben Sie das ISO nicht auf eine microSD-Karte.** Ab JetPack 7.2
> werden SD-Karten-Images nicht mehr unterstützt. Schreiben Sie das ISO auf
> einen USB-Stick und installieren Sie damit Jetson Linux auf Ihre microSD-Karte
> oder NVMe-SSD.

Das Kopieren der ISO-Datei mit einem Dateimanager auf den Stick funktioniert nicht — sie muss als Datenträgerabbild geschrieben werden. Der fertige Stick ist nur ein Installer; er kann nicht in einen nutzbaren Desktop booten.

## Schritt 4 — Den Installer booten und installieren

1. Schalten Sie das Kit aus und installieren Sie dann den **Zielspeicher**:
   - microSD-Karte: Setzen Sie sie in den Steckplatz auf der **Unterseite des Moduls** ein.
   - NVMe-SSD: Installieren Sie sie im M.2-Key-M-Steckplatz auf der Trägerplatine.
   Installieren Sie den Zielspeicher, bevor Sie den Installer booten.
2. Stecken Sie den Installations-USB-Stick ein. Schließen Sie Monitor, Tastatur und Maus an und verbinden Sie dann das Netzteil. Stecken Sie das Installationslaufwerk **direkt** in das Kit und nicht über einen Hub: NVIDIA dokumentiert einen USB-3.0-Hub (Modell UH400), der die ISO-Installation scheitern lässt, und einen USB-auf-Ethernet-Adapter (TRENDnet TU2-ET100), der das Flashen fehlschlagen lassen kann. Siehe **[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**.
3. **Drücken Sie `Esc`, wenn der NVIDIA-Logo-Boot-Splash erscheint.** Wählen Sie **Boot Manager**, wählen Sie Ihr USB-Laufwerk und drücken Sie Enter, um davon zu booten. NVIDIA empfiehlt, das USB-Laufwerk ausdrücklich auszuwählen, damit Sie wissen, dass der richtige Installer läuft.
4. **Wenn die Aufforderung zum QSPI-Capsule-Update erscheint, drücken Sie `Y` innerhalb von 30 Sekunden.** Dies ist der am häufigsten verpasste Schritt. Die Aufforderung ist in Echtzeit leicht zu übersehen. Läuft sie ab und die Installation fährt ohne das Update fort, schlägt die Installation später fehl — starten Sie die Installation neu und drücken Sie `Y`, wenn die Aufforderung erscheint. Das Capsule-Update läuft in **zwei Durchgängen**, und das Kit startet möglicherweise dazwischen oder danach neu. Das ist zu erwarten; warten Sie, bis beide Durchgänge abgeschlossen sind. Kits, deren aktuelle QSPI-Firmware r38.2.0/r38.2.1 ist, müssen das Firmware-Update nach Abschluss des ersten Durchgangs ein zweites Mal bestätigen (r39.2.1-Release-Notes, Issue 6480645) — drücken Sie erneut `Y`, wenn Sie dazu aufgefordert werden.
5. Wählen Sie im **GRUB-Menü der Jetson-BSP-Installation** den Eintrag **Install Jetson ISO r39.2.1**. Wählen Sie das Zielspeichergerät (die microSD-Karte oder die NVMe-SSD) und bestätigen Sie. **Die Installation löscht das ausgewählte Gerät** — prüfen Sie die Auswahl, bevor Sie bestätigen.
6. Warten Sie, bis die Installation abgeschlossen ist. NVIDIAs Anleitung beschreibt, dass mehrere Minuten lang weißer Text über den Bildschirm läuft; starten Sie neu, wenn Sie dazu aufgefordert werden. Community-Berichte zur Installationsdauer schwanken stark — von etwa 15 Minuten bis deutlich länger (unbestätigt, Forenberichte).
7. **Entfernen Sie den Installations-USB-Stick**, damit das Kit das neue System vom Zielspeicher bootet und nicht erneut den Installer.

NVIDIA-Mitarbeiter im Forum empfehlen außerdem, während der ISO-Installation einen Bildschirm angeschlossen zu lassen.

## Schritt 5 — Erster Start und Ubuntu-Ersteinrichtung

Nach dem Neustart des Installers startet das Kit die Ubuntu-Ersteinrichtung (`oem-config`):

1. Prüfen und akzeptieren Sie die NVIDIA-Jetson-Software-EULA.
2. Wählen Sie Systemsprache, Tastaturlayout und Zeitzone.
3. Verbinden Sie sich mit einem Netzwerk.
4. Legen Sie Benutzername, Passwort und Computernamen an.
5. Melden Sie sich am Ubuntu-Desktop an.

## Schritt 6 — Die JetPack-Komponenten installieren

Das ISO installiert das Basissystem (Jetson Linux). CUDA, cuDNN, TensorRT und der übrige JetPack-Stack werden nach dem ersten Start hinzugefügt. Öffnen Sie auf dem Desktop des Kits ein Terminal und führen Sie aus:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

Starten Sie nach der Installation neu, wenn Sie dazu aufgefordert werden.

Ergebnis prüfen:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` sollte ein R39-Release mit Revision 2.1 melden. Die vollständige Checkliste finden Sie unter [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system).

## Schritt 7 — Den Leistungsmodus prüfen

Der Standard-Leistungsmodus ist typischerweise **25W**. Klicken Sie für maximale Leistung in der oberen Leiste des Ubuntu-Desktops auf den aktuellen Leistungsmodus, wählen Sie **Power Mode** und dann **MAXN SUPER**; auf der Kommandozeile zeigt `sudo /usr/sbin/nvpmodel -q` den aktuellen Modus an. ISO-Installationen von JetPack 7.2.1 verwenden standardmäßig die Flash-Konfiguration des Super-Modus, daher sollten 25W und MAXN SUPER verfügbar sein — wenn sie fehlen, siehe [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

![Auswahl von MAXN SUPER im Leistungsmodus-Menü](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*Wählen Sie Power Mode → MAXN SUPER für maximale Leistung.*

## Schnelle Fehlersuche

| Symptom | Erste Prüfung |
|---|---|
| Das Kit lässt sich nicht einschalten | Das 19-V-Netzteil muss an der DC-Buchse angeschlossen sein. Das Kit schaltet sich automatisch ein; die grüne LED neben dem USB-C-Anschluss sollte leuchten. |
| Der USB-Installer bootet nicht | Wählen Sie das USB-Laufwerk im UEFI-Boot-Manager ausdrücklich aus (`Esc` beim Splash). Prüfen Sie, ob die Firmware 36.x oder neuer ist. |
| Schwarzer Bildschirm oder UEFI-Shell statt des Installers | Die Firmware ist möglicherweise zu alt. Schließen Sie zuerst den JetPack-6.x-Update-Pfad ab. |
| Der Installer überspringt Sprache/Netzwerk/Benutzername; der erste Start hängt bei einem schwarzen Bildschirm | Die QSPI-Capsule-Aufforderung wurde verpasst. Starten Sie die Installation neu und drücken Sie `Y` innerhalb von 30 Sekunden. |
| Der Installer zeigt den Zielspeicher nicht an | microSD: Prüfen Sie, ob sie vollständig im Steckplatz auf der Unterseite des Moduls sitzt. NVMe: Setzen Sie das Laufwerk neu ein und starten Sie den Installer neu. |
| Nur die Leistungsmodi 7W/15W; 25W und MAXN SUPER fehlen | Siehe [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting). |

## Quellen

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (geprüft am 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (geprüft am 2026-09-26)

*Status: Entwurf, ausstehende Prüfung durch cheny. Basiert auf NVIDIAs offizieller Dokumentation mit Stand der oben genannten Daten; noch nicht von Juxi Technology auf physischer Hardware verifiziert.*

**Bildnachweis:** Die Bilder auf dieser Seite stammen aus NVIDIAs offiziellem *Jetson Orin Nano Developer Kit User Guide* (heruntergeladen am 2026-09-26) und bleiben © NVIDIA Corporation. Sie sind hier wiedergegeben, um den offiziellen Einrichtungsablauf zu veranschaulichen.

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
