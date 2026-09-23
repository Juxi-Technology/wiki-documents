---
title: Schnellstart — Vom Auspacken bis zum lauffähigen JetPack-7.2.1-System
sidebar_label: Schnellstart
slug: /getting-started/quick-start
description: >-
  Durchführung für das NVIDIA Jetson AGX Orin Developer Kit (64GB): erster Start,
  Aktualisierung des BSP auf JetPack 7.2.1 (L4T r39.2.1) mit der Jetson-ISO-Methode
  und Installation der JetPack-Komponenten.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# Schnellstart

Diese Seite führt Ihr Jetson AGX Orin Developer Kit (64GB) vom Karton bis zu
einem vollständig aktualisierten **JetPack 7.2.1**-System. Der folgende Weg folgt
dem von NVIDIA aktuell empfohlenen Einrichtungsablauf; jeder Schritt wurde an dem
unten auf dieser Seite genannten Datum gegen die offizielle Developer-Kit-Dokumentation
von NVIDIA geprüft.

**Der Weg in drei Schritten:**

1. **Auspacken und booten** und anschließend die Ubuntu-Ersteinrichtung (`oem-config`) abschließen.
2. **Das BSP aktualisieren** auf L4T r39.2.1 (JetPack 7.2.1) mit der **Jetson-ISO**-Methode — ein bootfähiger USB-Stick, kein Ubuntu-Host-PC erforderlich.
3. **Die JetPack-Komponenten installieren** (CUDA, cuDNN, TensorRT, ...) mit einem einzigen `apt`-Befehl.

> **Warum ein USB-ISO-Update statt SDK Manager?**
> NVIDIA empfiehlt für das Developer Kit inzwischen die Jetson-ISO-Methode: Sie
> aktualisiert das Board direkt von einem USB-Stick und erfordert **keinen**
> separaten Ubuntu-Host-Rechner. SDK Manager bleibt als Alternative verfügbar
> (siehe Schritt 3b).

## Was Sie benötigen

Im Lieferumfang:

- Jetson-AGX-Orin-Modul und Referenz-Trägerplatine
- Wi-Fi-Modul
- USB-Typ-C-Netzteil
- USB-Typ-C-auf-USB-Typ-A-Kabel

Selbst bereitzustellen:

- Ein Monitor mit DisplayPort-Eingang und ein DisplayPort-Kabel sowie USB-Tastatur und -Maus — **oder** ein zweiter Computer (Windows/Mac/Linux), falls Sie eine Headless-Einrichtung bevorzugen
- Internetverbindung (Ethernet-Kabel oder während der Einrichtung konfiguriertes Wi-Fi)
- Ein USB-Stick, der groß genug für das ISO-Abbild ist (prüfen Sie die auf der Downloadseite angezeigte Größe, sobald Sie dort sind) — erforderlich für das ISO-Update in Schritt 2
- Einen PC zum Schreiben des Installations-USB-Sticks (Balena Etcher läuft unter Windows/Mac/Linux)

## Schritt 1 — Erster Start und Ubuntu-Ersteinrichtung

Ihr Developer Kit wird mit einem vorab auf eMMC geflashten L4T-BSP-Abbild
ausgeliefert und bootet ab Werk in den Ubuntu-Desktop. Neu ausgelieferte Einheiten
können eine **ältere** L4T-Version tragen (zum Beispiel r35.x / JetPack 5.x);
Schritt 2 bringt jede Einheit auf die aktuelle Version.

Mit angeschlossenem Display:

1. Schließen Sie einen DisplayPort-Monitor, eine USB-Tastatur und -Maus sowie (optional) ein Ethernet-Kabel an.
2. Schließen Sie das mitgelieferte Netzteil an den **USB-Typ-C-Anschluss über der DC-Buchse** an. Das Kit schaltet sich automatisch ein — die weiße LED neben dem Einschaltknopf leuchtet auf. Andernfalls drücken Sie den Einschaltknopf.
3. Nach etwa einer Minute erscheint der Ubuntu-Bildschirm. Der erste Start führt Sie durch `oem-config`: Annahme der NVIDIA-Software-EULA, Auswahl von Sprache/Tastatur/Zeitzone, Anlegen Ihres Benutzerkontos und Konfigurieren der Netzwerkverbindung.
4. Nach Abschluss von `oem-config` startet das Kit neu in den Ubuntu-Desktop.

![Ubuntu-Desktop nach der Ersteinrichtung](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

Eine Headless-Einrichtung von einem anderen Computer ist ebenfalls möglich — die
genaue Verkabelung finden Sie in NVIDIAs Quick Start Guide (Link unten).

> **Juxi-Hinweis:** Wenn Sie das System von einer NVMe-SSD aus betreiben möchten,
> denken Sie in Schritt 2 daran — der ISO-Installer kann direkt auf das
> NVMe-Laufwerk installieren.

## Schritt 2 — BSP mit dem Jetson ISO aktualisieren (empfohlen)

**Voraussetzung:** Das installierte BSP muss **L4T r35.5 oder neuer** sein, damit
die ISO-Methode funktioniert. Prüfen Sie zuerst:

```bash
cat /etc/nv_tegra_release
```

Ein JetPack-7.2.1-System meldet `# R39 (release), REVISION: 2.1`. Zeigt die
Ausgabe eine ältere Version, aktualisieren Sie zuerst auf L4T r35.5 oder neuer
(siehe *Einschränkungen* unten).

1. **Laden Sie das Jetson-ISO herunter** für JetPack 7.2.1 / L4T r39.2.1:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **Erstellen Sie den Installations-USB-Stick.** Schreiben Sie das ISO mit
   [Balena Etcher](https://etcher.balena.io) auf einen USB-Stick („Flash from file" → ISO
   auswählen → USB-Laufwerk auswählen).
   > **Nicht** einfach die ISO-Datei mit einem Dateimanager auf das Laufwerk
   > kopieren — sie muss als Datenträgerabbild geschrieben werden, sonst bootet
   > sie nicht.
3. **Stecken Sie den USB-Stick** in das Developer Kit und schalten Sie es ein.
   Wenn es nicht automatisch vom USB-Stick bootet, öffnen Sie während des Starts
   den UEFI-Boot-Manager und wählen Sie das USB-Laufwerk aus.
4. **Booten und installieren:**
   - Wenn Sie aufgefordert werden, ein **QSPI-Capsule-Update** zu bestätigen, drücken Sie `Y`. Dieses Firmware-Update läuft *vor* der ISO-Installation und läuft **zweimal**. Überspringen Sie es nicht — es ist für die Kompatibilität erforderlich. Wenn Sie die Aufforderung verpassen, starten Sie die Installation neu und bestätigen Sie sie, wenn Sie dazu aufgefordert werden.
   - Wählen Sie im GRUB-Menü **Install Jetson ISO r39.2.1** und drücken Sie Enter.
   - Wählen Sie das Speicherziel mit den Pfeiltasten: **eMMC** (standardmäßiger interner Speicher) oder **NVMe** (empfohlen, wenn Sie eine SSD installiert haben).
   - Die Installation dauert rund 15 Minuten, mit fortlaufender Textausgabe auf dem Bildschirm.
5. **Entfernen Sie den USB-Stick**, sobald die Installation abgeschlossen ist und das System neu startet — andernfalls bootet das Kit möglicherweise erneut vom Stick statt vom neuen System.
6. Das aktualisierte System startet sein erstes `oem-config` — schließen Sie die Ubuntu-Einrichtung erneut ab, um das Benutzerkonto für die neue Installation anzulegen.

### Was Sie sehen werden (in dieser Reihenfolge)

![Schreiben des ISO mit Balena Etcher auf einen USB-Stick](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Schreiben des Jetson-ISO auf einen USB-Stick mit Balena Etcher.*

![UEFI-Boot-Manager mit ausgewähltem USB-Laufwerk](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*Wenn das Kit nicht automatisch vom USB-Stick bootet, wählen Sie ihn im UEFI-Boot-Manager aus.*

![Aufforderung zur Bestätigung des QSPI-Capsule-Updates](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*Die QSPI-Capsule-Update-Aufforderung — drücken Sie `Y`. Sie ist für die Kompatibilität erforderlich und läuft zweimal.*

![GRUB-Menü des Jetson-ISO](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*Wählen Sie „Install Jetson ISO r39.2.1".*

![Optionen für das Speicherziel im GRUB-Menü](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*Wählen Sie eMMC oder NVMe als Installationsziel.*

![Fortschrittsbildschirm des Installers](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*Der Installer läuft rund 15 Minuten.*

![oem-config-Willkommensbildschirm nach dem Update](/images/jetson-agx-orin/oem-config_welcome.png)
*Nach dem Update läuft `oem-config` erneut, um das neue System einzurichten.*

### Einschränkungen und bekannte Probleme

- **Ältere Einheiten (< L4T r35.5):** Der Jetson-ISO-Weg erfordert ein installiertes BSP ab r35.5. Um ein älteres Kit zuerst auf den aktuellen Stand zu bringen, verwenden Sie eine der Host-PC-Methoden (SDK Manager oder das Skript `flash.sh`) — siehe [Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates).
- **QSPI-Aufforderung verpasst?** Starten Sie die ISO-Installation neu und drücken Sie `Y`.
- **Schwarzer Bildschirm während der Installation:** Manche KVM-Switches gehen mit der Videoausgabe des AGX Orin während der ISO-Installation schlecht um. Schließen Sie den Monitor direkt an das Developer Kit an und versuchen Sie es erneut.

## Schritt 3 — Die JetPack-Komponenten installieren

### 3a. Über `apt` (am einfachsten — kein Host-PC nötig)

Öffnen Sie auf dem Desktop des Kits ein Terminal (`Ctrl`+`Alt`+`T`) und führen Sie aus:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

Damit werden CUDA, cuDNN, TensorRT und der übrige JetPack-Stack installiert.
Rechnen Sie je nach Verbindungsgeschwindigkeit mit **etwa einer Stunde**.

Ergebnis prüfen: `cat /etc/nv_tegra_release` sollte R39 / REVISION 2.1 melden, und
das CUDA-Toolkit wird verfügbar (`nvcc --version`). Die vollständige Checkliste
finden Sie unter [System verifizieren](/de/tutorials/jetson-agx-orin/verify-your-system).

### 3b. Über SDK Manager (Alternative)

SDK Manager installiert die JetPack-Komponenten von einem Host-PC über USB:

1. Verbinden Sie das eingeschaltete Kit über das mitgelieferte USB-Typ-C-auf-Typ-A-Kabel mit dem Host-PC; stecken Sie das Kabel am Kit in den **USB-Typ-C-Anschluss neben dem 40-Pin-Steckverbinder**.
2. Wählen Sie in SDK Manager das Ziel Jetson AGX Orin und markieren Sie **Jetson SDK Components** (statt erneut „Jetson OS" zu flashen), und folgen Sie dann den Schritten auf dem Bildschirm (USB-Verbindung, Adresse `192.168.55.1`).

Vollständige SDK-Manager-Anleitungen werden von NVIDIA gepflegt (siehe Links
unten) und in unserem Flashing-Leitfaden ausführlich behandelt.

## Schnelle Fehlersuche

| Symptom | Erste Prüfung |
|---|---|
| Kit lässt sich nicht einschalten | Netzteil am USB-C-Anschluss **über der DC-Buchse** angeschlossen; Einschaltknopf drücken |
| Keine Bildausgabe | DisplayPort-Kabel (für HDMI-Monitore einen aktiven DP→HDMI-Adapter verwenden); Boot ohne eingelegten ISO-USB-Stick versuchen |
| ISO-Installer startet nicht | USB mit Etcher geschrieben (nicht per Dateikopie); den USB-Stick im UEFI-Boot-Manager auswählen |
| QSPI-Aufforderung erschienen | `Y` drücken — erforderlich; das Update läuft zweimal |
| Bildschirm wird mitten in der Installation schwarz | KVM-Switch-Störung — Monitor direkt anschließen |

## Quellen und Verifizierung

Diese Seite wurde von Juxi Technology anhand von NVIDIAs offizieller
Dokumentation erstellt und geprüft:

- [Jetson AGX Orin Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-23)
- [Jetson AGX Orin Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (geprüft am 2026-09-23)
- [BSP Installation (SDK Manager / flash script)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*Status: Entwurf. Die Schritte wurden von Juxi Technology noch nicht auf physischer
Hardware verifiziert; sie stützen sich auf NVIDIAs offizielle Dokumentation mit
Stand der oben genannten Daten.*

**Bildnachweis:** Alle Screenshots auf dieser Seite stammen aus NVIDIAs offiziellem
*Jetson AGX Orin Developer Kit User Guide* (heruntergeladen am 2026-09-23) und
bleiben © NVIDIA Corporation. Sie sind hier wiedergegeben, um den offiziellen
Einrichtungsablauf zu veranschaulichen.

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Dieser Leitfaden wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
