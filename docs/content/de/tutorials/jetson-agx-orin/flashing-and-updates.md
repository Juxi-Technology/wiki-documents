---
title: Flashen & Updates — BSP-Installationsoptionen
sidebar_label: Flashen & Updates
slug: /getting-started/flashing-and-updates
description: >-
  Die drei offiziellen Wege, das BSP auf dem Jetson AGX Orin
  Developer Kit zu installieren oder zu aktualisieren — Jetson ISO (empfohlen),
  NVIDIA SDK Manager und das Linux_for_Tegra Flash-Skript — plus wie Sie in den
  Force-Recovery-Modus gelangen.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Flashen & Updates — BSP-Installationsoptionen

NVIDIA unterstützt drei offizielle Wege, das BSP auf dem
Developer Kit zu installieren oder zu aktualisieren. Entscheiden Sie je nach
Situation:

| | 💾 Mit eMMC starten | 🛠️ SDK Manager | 📜 Flash-Skript |
|---|---|---|---|
| Kurzbeschreibung | Vom vorab geflashten eMMC booten, mit Jetson ISO aktualisieren | GUI-Tool auf einem Host-PC; flasht das BSP und kann JetPack-Pakete installieren | `flash.sh`-Skript auf einem Host-PC |
| Ubuntu-Host-PC | **Nicht erforderlich** | Erforderlich | Erforderlich |
| Typische Dauer | Sofortiger erster Boot; ISO-Update dauert ca. 15 min | Flashen dauert ca. 30 min | Hängt vom Setup ab |
| Für wen | Alle (empfohlene Standardmethode) | Alle mit einem Ubuntu-PC; erforderlich zum Flashen von NVMe/microSD/USB oder wenn das Kit kein Internet hat | Produktentwickler, fortgeschrittene Anwender |

> **Juxi-Hinweis:** Das aktuelle Release ist **JetPack 7.2.1 (L4T r39.2.1)**. Wenn Ihr
> Kit neu ist, beginnen Sie mit dem **[Schnellstart](/de/tutorials/jetson-agx-orin/quick-start)** — er beschreibt den
> empfohlenen Weg von Anfang bis Ende.

## Option 1 — Mit eMMC starten, mit Jetson ISO aktualisieren (empfohlen)

Ihr Developer Kit wird mit einem vorab auf dem eMMC geflashten L4T-BSP
ausgeliefert und startet ab Werk direkt in den Ubuntu-Desktop. Der empfohlene
Aktualisierungsweg ist das **Jetson ISO** — ein bootfähiger USB-Stick, der das
Kit **ohne Ubuntu-Host-PC** aktualisiert.

**Voraussetzung:** Das installierte BSP muss **L4T r35.5 oder neuer** sein (prüfen mit
`cat /etc/nv_tegra_release`). Ältere Kits benötigen zuerst eine Host-PC-Methode (Option 2
oder 3 unten).

Die vollständige Schritt-für-Schritt-Anleitung (USB-Stick mit Balena Etcher erstellen,
UEFI-Boot, die QSPI-Capsule-Abfrage, GRUB-Menü, Auswahl des Speichermediums, erster Boot)
finden Sie in **[Schnellstart → Schritt 2](/de/tutorials/jetson-agx-orin/quick-start)**.

Die wichtigsten Punkte aus NVIDIAs Dokumentation:

- Im GRUB-Menü wählen Sie das Installationsziel: **eMMC** oder **NVMe** (empfohlen, wenn Sie eine SSD installiert haben).
- Falls Sie dazu aufgefordert werden, bestätigen Sie das **QSPI-Capsule-Update** mit `Y` — es ist für die Kompatibilität erforderlich und läuft zweimal. Wird es übersprungen, kommt es zu Installationsproblemen (dies ist auch in den L4T-Release-Notes als Known Issue 6266271 aufgeführt).
- Eine Neuinstallation auf einem System, auf dem bereits JetPack 7.2.1 läuft, wird unterstützt — folgen Sie der offiziellen Anleitung sorgfältig.

## Option 2 — NVIDIA SDK Manager (Host-PC)

Wählen Sie den SDK Manager, wenn Sie:

- das Basis-L4T-BSP auf ein **anderes Speichermedium** als eMMC flashen möchten (NVMe-SSD, USB-Laufwerk oder microSD-Karte), oder
- ein Kit flashen möchten, das **nicht direkt mit dem Internet verbunden werden kann**.

**Anforderungen an den Host-PC** (laut NVIDIAs SDK-Manager-Dokumentation): Ubuntu
Desktop **20.04 oder 22.04** auf x86_64, 8 GB Arbeitsspeicher, 25 GB freier
Festplattenplatz und eine **NVIDIA Developer Program-Mitgliedschaft** (kostenlos),
um das Tool herunterzuladen und sich anzumelden. Hinweis: Die Release Notes zu
L4T 39.2 nennen als Host-Linux-Distribution zum Flashen Ubuntu **24.04 und 22.04** —
prüfen Sie die Seite mit den Systemanforderungen des NVIDIA SDK Manager für die
aktuelle Liste, da sich dieser Bereich ändert.

**Installation und Anmeldung:**

1. Laden Sie das `.deb`-Paket des SDK Manager von NVIDIA herunter und installieren Sie es:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Starten Sie ihn mit `sdkmanager`, klicken Sie auf den Tab **NVIDIA DEVELOPER** und melden Sie sich an.

**Hardware-Einrichtung und Force-Recovery-Modus:**

1. Verbinden Sie das Kit mit dem im Lieferumfang enthaltenen USB-A↔USB-C-Kabel mit dem Host-PC, gesteckt in den **USB-C-Anschluss neben dem 40-Pin-Header** (als Port 10 / J40 beschriftet).
2. **Halten Sie die mittlere Force-Recovery-Taste gedrückt** (Taste 2, zwischen Power und Reset), und stecken Sie das USB-C-Netzteil in den USB-C-Anschluss oberhalb der DC-Buchse. Das Kit startet im **Force-Recovery-Modus**.
3. Auf dem Host sollte der SDK Manager das Kit erkennen. *(Falls nicht, siehe [Fehlerbehebung](/de/tutorials/jetson-agx-orin/troubleshooting).)*

**Flashing-Schritte im SDK Manager** (Zusammenfassung — folgen Sie den Anweisungen auf dem Bildschirm):

1. **Schritt 01:** Wählen Sie **Jetson** als Produktkategorie, deaktivieren Sie „Host Machine“, wählen Sie das Modul **Jetson AGX Orin** und fahren Sie fort.
2. **Schritt 02:** Wählen Sie für ein Basis-BSP nur **Jetson OS** (deaktivieren Sie „Jetson SDK Components“). Akzeptieren Sie die Lizenz.
3. **Schritt 03:** Geben Sie Ihr sudo-Passwort ein; warten Sie den Download ab. Wählen Sie im Flash-Dialog **„Manual Setup – Jetson AGX Orin“**, ignorieren Sie die OEM-Konfiguration, wählen Sie das **Speichergerät** als Ziel und klicken Sie auf **Flash**.
4. Wenn das Flashen abgeschlossen ist, startet das Kit mit dem neuen BSP neu. Schließen Sie das Ubuntu-`oem-config` ab und installieren Sie anschließend die JetPack-Komponenten (siehe [Schnellstart → Schritt 3](/de/tutorials/jetson-agx-orin/quick-start)).

## Option 3 — Linux_for_Tegra Flash-Skript

Für fortgeschrittene Anwender und Produktentwickler: Die Skripte `flash.sh` (oder
Initrd-Flash) aus dem Jetson Linux-Paket flashen ein Jetson-Gerät von einem Host-PC
aus. Siehe den Abschnitt **Flashing Support** im [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Fakten zu Host und Toolchain aus den Release Notes zu L4T 39.2: Host-Linux-
Distribution zum Flashen — Ubuntu 24.04 / 22.04; Cross-Compilation-Toolchain —
GCC 13.2; Source-Release-Tag — `jetson_39.2_GA`.

## Force-Recovery-Modus — so wird er erreicht

Dasselbe Verfahren wie oben; ein Host ist dafür nicht erforderlich:

1. Schalten Sie das Kit aus und verbinden Sie das USB-C-Datenkabel mit einem Host (falls Sie einen benötigen),
2. **Halten Sie die mittlere Force-Recovery-Taste gedrückt**, und schließen Sie dann das USB-C-Netzteil an — das Kit startet im Force-Recovery-Modus.

Um den Recovery-Modus zu verlassen, schalten Sie das Kit aus und wieder ein oder
setzen Sie es zurück. Auf dem Host ist der Recovery-Modus typischerweise als
NVIDIA-USB-Gerät sichtbar (`lsusb`).

## Nach dem Flashen

Überprüfen Sie das Ergebnis: **[System überprüfen](/de/tutorials/jetson-agx-orin/verify-your-system)** — Versions-
prüfungen für L4T, CUDA und den gesamten JetPack-Komponenten-Stack.

## Quellen

- [BSP-Installation — Jetson AGX Orin Developer Kit Benutzerhandbuch](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (geprüft 2026-09-23)
- [Schnellstart — derselbe Leitfaden](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (geprüft 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (geprüft 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Status: Entwurf, ausstehende Prüfung durch cheny. Basiert auf NVIDIAs offizieller
Dokumentation zum angegebenen Datum; noch nicht von Juxi Technology auf physischer
Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird
von Juxi Technology veröffentlicht und ist keine NVIDIA-Publikation.
