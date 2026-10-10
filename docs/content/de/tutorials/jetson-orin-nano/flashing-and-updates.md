---
title: Flashen & Updates — BSP-Installationsoptionen
sidebar_label: Flashen & Updates
slug: /getting-started/flashing-and-updates
description: >-
  Die drei offiziellen Wege, das BSP auf dem Jetson Orin Nano Super
  Developer Kit zu installieren oder zu aktualisieren — Jetson ISO (empfohlen),
  NVIDIA SDK Manager und das Linux_for_Tegra Flash-Skript — plus die
  Speicherentscheidung, der JetPack-6.x-Firmware-Update-Pfad für ältere Kits
  und der Force-Recovery-Modus.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# Flashen & Updates — BSP-Installationsoptionen

NVIDIA unterstützt drei offizielle Wege, das BSP (Jetson Linux) auf dem Jetson
Orin Nano Super Developer Kit zu installieren oder zu aktualisieren. Zwei Hardware-Tatsachen
prägen alle drei: Es ist **kein Speicher im Lieferumfang** (kein eMMC, keine microSD-Karte,
keine SSD), und JetPack 7.2 hat die **SD-Karten-Images entfernt** — das
vereinheitlichte ISO auf einem USB-Stick ersetzt sie, während die microSD-Karte selbst ein
gültiges Installationsziel bleibt.

| | Jetson ISO (empfohlen) | NVIDIA SDK Manager | Linux_for_Tegra Flash-Skript |
|---|---|---|---|
| Kurzbeschreibung | Das Kit von einem auf einem beliebigen PC erstellten USB-Installer booten; den Zielspeicher am Kit auswählen | GUI-Tool auf einem Host-PC; flasht das BSP über USB-C auf den gewählten Speicher | Kommandozeilen-Flash-Werkzeuge auf einem Host-PC; direkte Kontrolle über das Ziel |
| Ubuntu-Host-PC | Nicht erforderlich | Erforderlich (x86_64) | Erforderlich (x86_64) |
| Typische Dauer | Nicht veröffentlicht; der Installer zeigt „mehrere Minuten“ lang Ausgabe | Nicht veröffentlicht; der Host lädt zuerst das BSP und das Root-Dateisystem herunter | Hängt von Ihrem Setup ab |
| Für wen | Ersteinrichtung eines neuen Kits; die meisten Nutzer | Nutzer mit einem Ubuntu-PC; NVIDIAs bevorzugter Weg zum direkten Flashen einer NVMe-SSD; wird auch für Firmware-Updates verwendet | Fortgeschrittene Anwender und Produktentwickler |

NVIDIA veröffentlicht keine Installationszeiten; Forenberichte reichen von etwa 15 Minuten
bis zu zwei Stunden (unbestätigt).

> **Juxi-Hinweis:** Das aktuelle Release ist **JetPack 7.2.1 (L4T r39.2.1)**. Beginnen Sie
> bei einem neuen Kit mit dem **[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)** — er führt den empfohlenen
> ISO-Weg von Anfang bis Ende. Kehren Sie hierher zurück, um Wege zu vergleichen, den
> Speicher zu wählen oder ein älteres Kit zu aktualisieren.

## Option 1 — Jetson ISO (empfohlen)

Das Jetson ISO ist NVIDIAs empfohlener Weg für die Ersteinrichtung und die einzige Route,
die keinen Ubuntu-Host-PC benötigt: Schreiben Sie eine ISO-Datei auf einem beliebigen
Computer auf einen USB-Stick, booten Sie das Kit vom Stick und installieren Sie auf den
vorbereiteten Speicher. Bereiten Sie Folgendes vor:

- **Zielspeicher** (das Kit hat keinen; siehe den Speicher-Abschnitt unten): eine **microSD-Karte, 64 GB
  UHS-1 oder größer (empfohlen)**, vor dem Booten des Installers in den Steckplatz auf der **Unterseite des Moduls**
  eingesetzt, oder eine **NVMe-SSD** (optional; empfohlen für mehr Kapazität und
  bessere Speicherleistung).
- **Ein USB-Stick, 16 GB oder größer** — dieser wird zum Installer.
- **Ein Laptop oder PC (Windows, Mac oder Linux) mit mindestens 25 GB freiem Speicherplatz**, um das ISO zu schreiben.
- **Ein DisplayPort-Monitor und eine USB-Tastatur** (oder ein USB-TTL-Seriellkabel für die
  Headless-Einrichtung; HDMI wird nicht unterstützt) sowie das mitgelieferte 19-V-Netzteil.

Zwei Warnhinweise entscheiden über den Erfolg: Die Firmware muss aus der
JetPack-6.x-Generation stammen — bleibt der Bildschirm schwarz oder erscheint eine UEFI-Shell,
führen Sie zuerst den unten beschriebenen JetPack-6.x-Update-Pfad aus — und drücken Sie bei der QSPI-
Capsule-Aufforderung `Y` innerhalb von 30 Sekunden; eine abgelaufene Aufforderung lässt die Installation
später fehlschlagen, also starten Sie die Installation neu und drücken Sie `Y`.

> **Wichtig** — schreiben Sie das ISO auf den **USB-Stick, nicht auf eine microSD-Karte**
> („Flashen Sie das Jetson-ISO nicht auf eine microSD-Karte“). Die Installation **löscht
> außerdem den ausgewählten Zielspeicher**; prüfen Sie vor dem Start, welches Gerät Sie
> ausgewählt haben.

Die vollständige Schritt-für-Schritt-Anleitung — ISO-Download, Balena Etcher, UEFI-Boot-Manager, das GRUB-Menü,
Speicherauswahl, Ubuntu-Ersteinrichtung beim ersten Start — finden Sie im **[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)**. Der
Installer-USB-Stick ist **kein „Live USB“** (er installiert nur); entfernen Sie ihn daher nach der Installation, wenn Sie
dazu aufgefordert werden.

## Option 2 — NVIDIA SDK Manager (Host-PC)

Der SDK Manager ist der Host-PC-Weg: Er flasht das BSP über USB-C und kann auch die Firmware
des Kits aktualisieren (siehe den Update-Pfad-Abschnitt unten).

**Anforderungen an den Host-PC** (laut der BSP-Setup-Seite des Kits): ein **x86-PC mit Ubuntu 22.04 oder
Ubuntu 20.04**; **Internetzugang und ein kostenloses NVIDIA Developer Program-Konto**; ein **USB-Kabel**
für den USB-C-Anschluss des Kits sowie „ein Jumper-Pin oder eine Metall-Büroklammer“; und ein Bildschirm oder
USB-TTL-Seriellkabel für das Kit.

> **Juxi-Hinweis:** NVIDIAs Quellen widersprechen sich hier. Die Setup-Seite des Kits nennt Ubuntu 22.04 oder 20.04;
> die Release Notes zu L4T r39.2.1 nennen „Ubuntu 24.04 und 22.04“ als Host-Distribution zum
> Flashen. Prüfen Sie NVIDIAs SDK-Manager-Anforderungen, bevor Sie einen Host-PC vorbereiten.

**Installieren Sie den SDK Manager auf dem Host.** NVIDIAs Setup-Seite enthält die genauen Befehle für Ubuntu
22.04 und 20.04; starten Sie ihn mit `sdkmanager` und melden Sie sich mit Ihren NVIDIA-Developer-Zugangsdaten an
(ein Browserfenster öffnet sich; eventuell erscheint eine Zwei-Faktor-Authentifizierung).

**Das BSP flashen** (Zusammenfassung; folgen Sie den Anweisungen auf dem Bildschirm). Der SDK Manager flasht über USB;
versetzen Sie das Kit daher zuerst in den Force-Recovery-Modus (siehe unten):

1. Wählen Sie **Jetson Orin Nano [8GB developer kit version]** und klicken Sie auf **OK**; entfernen Sie das Häkchen
   bei **Host Machine**, sodass nur das Jetson-Ziel ausgewählt bleibt; klicken Sie auf **Continue**; behalten Sie
   im nächsten Schritt nur **Jetson Linux** ausgewählt; akzeptieren Sie die Lizenz und geben Sie das sudo-Passwort des Hosts ein.
2. Wählen Sie in der Flash-Aufforderung (der SDK Manager lädt zuerst die Pakete herunter): **Runtime for OEM
   Configuration**; wählen Sie **NVMe** oder **SD Card** als Speicher; klicken Sie auf **Flash**.
3. Wenn das Flashen abgeschlossen ist, entfernen Sie den Jumper vom J14-Header, schalten Sie das Kit aus und wieder ein und
   schließen Sie die Ubuntu-Ersteinrichtung (oem-config) ab.

> **Juxi-Hinweis — das Modul-SKU:** Dieses Kit enthält das Modul **P3767-0005**, das NVIDIA
> als „Jetson Orin Nano 8GB (P3767-0005, nur für Entwicklungszwecke)“ dokumentiert. Das kommerzielle 8-GB-
> Orin-Nano-Modul ist **P3767-0003** — ein separates SKU, nicht Teil dieses Kits. Verwenden Sie den Ziel-Eintrag,
> den NVIDIA für dieses Kit nennt: **Jetson Orin Nano [8GB developer kit version]**.

## Option 3 — Linux_for_Tegra Flash-Skript

Für fortgeschrittene Anwender und Produktentwickler: Flashen über die Kommandozeile mit dem Jetson Linux Driver
Package. Laut NVIDIAs Setup-Seite: Laden Sie das Driver Package und das Beispiel-Root-Dateisystem
für Ihr JetPack-Release herunter; entpacken Sie das Driver Package auf einem Ubuntu-x86_64-Host; entpacken Sie das
Beispiel-Root-Dateisystem nach `Linux_for_Tegra/rootfs` und führen Sie `apply_binaries.sh` aus
`Linux_for_Tegra` aus; versetzen Sie das Kit in den Force-Recovery-Modus (unten); führen Sie dann den passenden Flash-
Befehl für das Ziel Jetson Orin Nano Developer Kit aus. Zielnamen und detaillierte Befehle stehen im
Jetson Linux Developer Guide.

- Die Zielnamen des Kits sind `jetson-orin-nano-devkit` und `jetson-orin-nano-devkit-super`;
  NVIDIA merkt an, dass die Super-Konfiguration „ein höheres Leistungsbudget und erweiterte Taktfrequenz-
  Stufen“ hat.
- Das Beispiel im Developer Guide für dieses Kit — NVMe mit der Super-Konfiguration:
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`
  (die Option `--erase-all` löscht Daten auf dem Zielspeicher).
- Aus den Release Notes zu L4T r39.2.1: Flash-Host — Ubuntu 24.04 / 22.04; Toolchain —
  GCC 13.2; Source-Tag — `jetson_39.2.1_GA`. Von der JetPack-Downloadseite: BSP-Paket —
  `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## Wahl des Zielspeichers: microSD vs. NVMe-SSD

Der Installer bietet nur Speicher an, der beim Booten **bereits angeschlossen** ist. Entscheiden Sie zuerst,
installieren Sie den Speicher und starten Sie dann den Installer.

| | microSD-Karte | NVMe-SSD |
|---|---|---|
| Spezifikation | 64 GB UHS-1 oder größer, empfohlen | Ein PCIe-NVMe-Laufwerk in einem M.2-Key-M-Steckplatz |
| Einsatzort | Steckplatz auf der **Unterseite des Moduls** | M.2-Key-M-Steckplatz 2280 (PCIe 3.0 x4) oder 2230 (PCIe 3.0 x2) |
| Warum wählen | Der Standard-Speicher des Moduls; die einfachste und günstigste Option | Mehr Kapazität und bessere Speicherleistung; empfohlen für KI-Modelle, Container, Datensätze und Projektdateien |

**microSD bleibt ein gültiges Installationsziel.** JetPack 7.2 hat die SD-Karten-*Imagedatei* entfernt — nicht
das microSD-*Ziel*: Booten Sie beim ISO-Ablauf den USB-Installer mit eingelegter Karte und
wählen Sie sie aus (der SDK Manager kann eine microSD-Karte auch vom Host aus flashen). Der microSD-Steckplatz befindet sich auf
der **Unterseite des Moduls**. Jeder Installationsweg **löscht den ausgewählten Zielspeicher**;
wählen Sie daher kein Laufwerk, das benötigte Daten enthält. Wenn der Installer Ihr NVMe-Laufwerk nicht
anbietet, siehe **[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**; Kaufberatung finden Sie in den
**[FAQ](/de/tutorials/jetson-orin-nano/faq)**.

## Ältere Kits: der JetPack-6.x-Update-Pfad

**Wann dies nötig ist:** JetPack 7.2 und später erfordern UEFI/QSPI-Firmware der JetPack-6.x-Generation.
NVIDIAs Regel: Firmware **36.x oder neuer** — das Kit ist bereit; **älter als 36.0** — schließen Sie
zuerst diesen Pfad ab (Version im UEFI-Menü prüfen; Schritte im [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)). Zwei
offizielle Wege: Der **microSD-Bridge-Ablauf** (unten) benötigt eine microSD-Karte, aber keinen Ubuntu-Host-PC;
der **SDK Manager** (Option 2) benötigt einen Ubuntu-Host-PC und ist NVIDIAs benannte Alternative für das
Firmware-/QSPI-Update.

Der Bridge-Ablauf, in NVIDIAs dokumentierter Reihenfolge:

1. Schreiben Sie das **JetPack-5.1.3-Bridge-Image** (`JP513-orin-nano-sd-card-image_b29.zip` — verwenden Sie
   das aktualisierte Image) auf eine microSD-Karte, booten Sie das Kit davon, schließen Sie die Ubuntu-Ersteinrichtung
   ab und verbinden Sie das Kit mit dem Internet.
2. Ein Hintergrunddienst plant dann ein Bootloader-Update (möglicherweise erscheint eine
   Desktop-Benachrichtigung). Prüfen Sie mit `sudo systemctl status nv-l4t-bootloader-config` — „Ein
   abgeschlossener Planungslauf zeigt den Dienst als inaktiv mit erfolgreichem Exit-Status.“

   ![Bootloader-Update-Benachrichtigung auf dem Jetson-Linux-Desktop](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. Starten Sie neu; das Firmware-Update läuft während des Bootens. Prüfen Sie den Zustand danach mit
   `sudo nvbootctrl dump-slots-info` — NVIDIAs Beispielausgabe ist zu diesem Zeitpunkt „Current
   version: 35.5.0“.

   ![Firmware-Update-Fortschritt von JetPack-6.x-Firmware](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. Installieren Sie den QSPI-Updater: `sudo apt update`, dann
   `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`; starten Sie neu und lassen Sie das Update
   abschließen.
5. Die Firmware ist jetzt für die JetPack-6.x-Generation bereit, und die 5.1.3-Karte ist nicht mehr das
   Ziel-Bootmedium. Schalten Sie das Kit aus und führen Sie dann die JetPack-7.2.1-Installation vom USB-Installer aus (siehe
   [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)).

Zusätzliche Hinweise: Der Durchlauf über JetPack 6.2.x kann nach dem ersten Start **ein weiteres** UEFI-Firmware-Update
planen — starten Sie erneut neu, wenn Sie dazu aufgefordert werden. Aus den Release Notes zu r39.2.1 (bekanntes Problem
6379600): Das Capsule-Update während einer ISO-Installation unterstützt keine Einheiten aus dem Release **BSP 36.2 /
JetPack 5.0 DP** — aktualisieren Sie solche Einheiten zuerst auf ein späteres Release.

## Force-Recovery-Modus — so wird er erreicht

Der Force-Recovery-Modus (RCM) ist der Zustand, den ein Host-PC zum Flashen benötigt. NVIDIA dokumentiert drei
Wege:

1. **Von einem Terminal auf einem laufenden System:** `sudo reboot --force forced-recovery`.
2. **Kit ausgeschaltet:** Verbinden Sie Pin 9 und Pin 10 des Button-Headers (die Setup-Seite nennt ihn
   den J14-Header) und stecken Sie dann das DC-Netzteil ein, um einzuschalten.
3. **Kit bereits eingeschaltet:** Verbinden Sie Pin 9 und Pin 10 und schließen Sie dann kurzzeitig Pin 7 und 8 an,
   um das System zurückzusetzen.

Entfernen Sie nach dem Eintritt in den RCM den/die Jumper, sobald der Host das Gerät erkennt. Der **USB-C-Anschluss**
stellt die Flash-Verbindung her (er arbeitet als USB-Recovery-Modus); auf dem Host sollte `lsusb`
ein NVIDIA-USB-Gerät anzeigen, bevor Sie mit dem Flashen beginnen.

## Neuinstallation und Upgrade

**JetPack-Komponenten auf dem laufenden Kit aktualisieren** mit `sudo apt update`, dann
`sudo apt install nvidia-jetpack` — siehe [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start).

**BSP neu installieren (gleiches oder neueres JetPack).** Führen Sie einen der drei Wege erneut aus; der ISO-Ablauf
ist die geräteseitige Option. NVIDIAs Hinweis für ISO-Neuinstallationen: „Wenn Sie JetPack
7.2.1 per ISO auf einem bereits installierten System neu installieren, folgen Sie bitte sorgfältig den Anweisungen im
Getting Started Guide.“ Eine Neuinstallation **löscht den Zielspeicher** (vorher sichern), und wenn die
QSPI-Capsule-Aufforderung erscheint, drücken Sie `Y` innerhalb von 30 Sekunden. Entfernen Sie anschließend den USB-Installer, damit
das Kit das neue System bootet.

**Super-Modus nach einer Neuinstallation.** Das 7.2.1-ISO „flasht das Jetson Orin Nano Developer Kit
standardmäßig mit der Super-Modus-Flash-Konfiguration“. Beim früheren 7.2-Release behielt ein per ISO aktualisiertes
Kit sein vorheriges Profil und konnte ohne die Modi 25 W / MAXN SUPER dastehen (bekanntes Problem 6279443
in r39.2; NVIDIAs Empfehlung war, von einem Linux-Host oder mit dem SDK Manager zu flashen). NVIDIA hat nicht
dokumentiert, ob ein erneuter Lauf des 7.2.1-ISO eine bestehende Nicht-Super-Installation in eine Super-Installation
umwandelt. Wenn bei Ihrem Kit die Modi 25 W / MAXN SUPER fehlen, siehe
**[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**.

**Wechsel zwischen JetPack-Hauptversionen.** Die Änderungsliste und Rollback-Hinweise für JetPack 6.x → 7.2.1
finden Sie unter **[JetPack 6.x → 7.2.1](/de/tutorials/jetson-orin-nano/jetpack-6-to-7)**. Prüfen Sie nach jeder Installation oder
Aktualisierung das Ergebnis: **[System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system)**.

## Quellen

- [BSP-Installation — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (geprüft am 2026-09-26)
- [Schnellstart — derselbe Leitfaden](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-26)
- [JetPack-6.x-Update-Pfad — derselbe Leitfaden](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (geprüft am 2026-09-26)
- [How-To — derselbe Leitfaden](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (geprüft am 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (geprüft am 2026-09-26)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (geprüft am 2026-09-26)
- [JetPack-Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- [SDK Manager — Anweisungen zur Installation mit angeschlossenem Monitor](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (geprüft am 2026-09-26)

*Status: geprüft am 2026-10-11. Basiert auf NVIDIAs offizieller Dokumentation mit Stand der
oben genannten Daten; noch nicht von Juxi Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi
Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
