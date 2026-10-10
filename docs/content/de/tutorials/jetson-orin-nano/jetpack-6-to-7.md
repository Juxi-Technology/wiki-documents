---
title: Migration von JetPack 6.x auf JetPack 7.2.1
sidebar_label: Migration von JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Was sich auf dem Jetson Orin Nano Super Developer Kit (8GB) zwischen
  JetPack 6.x und JetPack 7.2.1 ändert: die Firmware-Voraussetzung, die
  Super-Modus-Falle, die Migrations-Checkliste und der Rollback.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Migration von JetPack 6.x auf JetPack 7.2.1

Diese Seite richtet sich an Besitzer eines Jetson Orin Nano (Super) Developer
Kit, die von JetPack 6.x auf JetPack 7.2.1 umsteigen. Neue Kits: Beginnen Sie
stattdessen mit dem [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start).

JetPack 7.2.1 ist ein großer Sprung: Planen Sie einen vollständigen Neu-Flash,
eine Firmware-Voraussetzung und einige Software-Neuaufbauten ein.

## Was sich ändert

| Ebene | JetPack-6.x-Ära | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| Betriebssystem / Root-Dateisystem | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux-Kernel | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Juxi-Hinweis:** Die 6.x-Spalte verwendet JetPack 6.2.3, das letzte
> Produktions-Release von JetPack 6. Prüfen Sie Ihre eigenen Versionen mit
> `cat /etc/nv_tegra_release`. Der 7.2.1-VPI-Wert stammt aus NVIDIAs
> Paket-Repository und nicht von dessen Downloadseite, die weiterhin den
> JetPack-7.2-Wert zeigt — siehe den Hinweis unter
> [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system).

- **Keine SD-Karten-Images mehr.** „Ab JetPack 7.2 werden SD-Karten-Images
  nicht mehr unterstützt.“ Der Installer ist ein ISO für einen USB-Stick; eine
  microSD-Karte ist weiterhin ein gültiges Installationsziel.
- **Eine Firmware-Voraussetzung.** JetPack 7.2 und spätere Installationen
  erfordern Jetson-UEFI/QSPI-Firmware der JetPack-6.x-Generation; Kits mit
  älterer Werksfirmware müssen zuerst den JetPack-6.x-Update-Pfad
  abschließen. JetPack 7.0 und 7.1 listen keine Orin-Hardware, daher ist 7.2
  das erste 7.x-Release für die Familie.
- **Ein anderer Installationsablauf.** Das ISO installiert von einem USB-Stick
  auf microSD oder NVMe auf dem Gerät. Es dient nur der Installation, es ist
  kein „Live-USB“.

## Noch nicht aktualisieren, wenn ...

- **Ihr Roboter von Isaac ROS abhängt.** Die 7.2.1-Komponentenmatrix führt
  Isaac ROS als „Coming soon“, aber NVIDIA-Mitarbeiter geben an, dass Isaac
  ROS 4.6 JetPack 7.2 unterstützt — die Quellen widersprechen sich. Siehe
  [Robotik](/de/tutorials/jetson-orin-nano/robotics).
- **Ihr Kameracode an die ältere SIPL-API gebunden ist.** SIPL API v2.0.0 in
  Jetson Linux 39.2.1 enthält „Breaking Changes, die API, ABI, JSON-Schema,
  Paket-Layout und das Laden von Treibern betreffen“. Ein Community-Bericht
  (nicht von NVIDIA bestätigt) besagt, dass die NITO-Kamerakonfiguration nun
  der Standard ist und der Legacy-Modus `NVCAMERA_NITO_PATH=CONFIG` nicht mehr
  funktioniert.
- **Sie Ihren Stack nicht erneut validieren können.** CUDA-13-Wheels,
  Python-Pakete und Drittanbieter-Bibliotheken müssen für Ubuntu 24.04 und
  CUDA 13.2 existieren. NVIDIAs 7.2.1-Seiten nennen keine Python- oder
  OpenCV-Versionen; für CUDA-13.2-Wheels verweisen NVIDIA-Mitarbeiter auf den
  SBSA-Index von Jetson AI Lab — siehe
  [Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm).

## Was nicht übernommen werden kann — Neuaufbau einplanen

- **TensorRT-Engines.** TensorRT wechselt von 10.3.0 auf 10.16.2.
  Serialisierte Engines sind an die TensorRT-Version gebunden. Bauen Sie sie
  auf dem Zielgerät neu.
- **CUDA-Binärdateien.** CUDA wechselt von 12.6 auf 13.2.2, ein großer
  Sprung. Erwarten Sie nicht, dass CUDA-12.x-Binärdateien übernommen werden
  können; bauen Sie sie mit dem neuen Toolkit neu.
- **Out-of-Tree-Kernelmodule.** Der Kernel wechselt von 5.15 auf 6.8. Bauen
  Sie Module gegen die neuen Kernel-Header neu.
- **Kameratreiber und Device Tree.** Es gelten die SIPL-2.0-API- und
  -ABI-Änderungen (siehe oben).
- **Container.** Für JetPack 6 / L4T r36 gebaute Images bleiben auf dem alten
  Stack; das ISO enthält NVIDIA Container Toolkit 1.19. NVIDIA-Mitarbeiter
  geben an, dass Orin Nano jetzt gängige Arm64-„arm64-SBSA“-Container
  ausführen kann.
- **Python-Umgebungen.** Ubuntu 24.04 verwendet ein neueres Python als 22.04.
  Erstellen Sie virtuelle Umgebungen neu; prüfen Sie `python3 --version`.

## Migrations-Checkliste

1. **Zuerst sichern.** Die Installation löscht den von Ihnen gewählten
   Zielspeicher. Kopieren Sie vom Kit herunter: Anwendungsdaten,
   Konfigurationsdateien, Kamerakalibrierung, Container-Volumes,
   TensorRT-Build-Skripte und ONNX-Modelle sowie Quellen für eigene Treiber
   oder Device Trees. Halten Sie die Versionen mit
   `cat /etc/nv_tegra_release` und `apt list --installed | grep nvidia-jetpack`
   fest.
2. **Die Firmware-Hürde nehmen.** Schalten Sie ein, drücken Sie beim
   NVIDIA-Splash wiederholt Esc und lesen Sie die Firmware-Version im
   UEFI-Menü. Firmware 36.x oder neuer ist bereit für 7.2.1. Ist sie älter
   als 36.0, absolvieren Sie zuerst den „JetPack 6.x Update Path“: Booten Sie
   das aktualisierte JetPack-5.1.3-SD-Karten-Image
   (`JP513-orin-nano-sd-card-image_b29.zip`) als Brücke, lassen Sie es das
   Bootloader-Update einplanen, starten Sie neu, installieren Sie den
   QSPI-Updater (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`),
   starten Sie erneut neu. Rechnen Sie mit mehreren Neustarts; JetPack 6.2.x
   plant möglicherweise nach dem ersten Start ein weiteres Update ein. Geräte
   auf BSP 36.2 / JetPack 5.0 DP müssen zuerst auf ein späteres Release
   aktualisieren. Prüfen Sie die Einplanung mit
   `sudo systemctl status nv-l4t-bootloader-config` und die Firmware mit
   `sudo nvbootctrl dump-slots-info`.
3. **Den Installer-USB-Stick erstellen.** Schreiben Sie das r39.2.1-Jetson-ISO
   mit Balena Etcher auf einen USB-Stick (16 GB oder mehr). Schreiben Sie das
   ISO nicht auf eine microSD-Karte. Legen Sie den Zielspeicher (microSD oder
   NVMe) vor dem Booten ein — der Installer bietet nur installierte Geräte an.
4. **JetPack 7.2.1 installieren.** Booten Sie über den UEFI-Boot-Manager:
   Drücken Sie Esc beim Splash, wählen Sie Boot Manager, wählen Sie das
   USB-Laufwerk (NVIDIA empfiehlt diese ausdrückliche Auswahl).

   > **Wichtig** — Drücken Sie bei der QSPI-Capsule-Update-Aufforderung
   > innerhalb von 30 Sekunden **Y** („der am häufigsten übersehene Schritt“).
   > Läuft sie ab, schlägt die Installation später fehl. Das Capsule-Update
   > läuft in zwei Durchgängen und kann das Kit neu starten — das ist zu
   > erwarten.

   Wählen Sie im GRUB-Menü Install Jetson ISO r39.2.1, wählen Sie den
   Zielspeicher und bestätigen Sie (die Installation löscht den gewählten
   Speicher). Entfernen Sie den USB-Stick nach der Installation wie
   aufgefordert, schließen Sie dann die Ubuntu-Ersteinrichtung ab (Lizenz,
   Sprache, Netzwerk, Benutzer) und führen Sie `sudo apt update` und
   `sudo apt install nvidia-jetpack` aus.
5. **Das Super-Profil bestätigen.** `sudo /usr/sbin/nvpmodel -q` listet die
   Leistungsmodi; verwenden Sie auf dem Desktop die obere Leiste:
   **Power Mode**, **MAXN SUPER**. Bei aktiviertem Super-Modus zeigt
   `cat /etc/nv_boot_control.conf` ein Suffix `-super` in der TNSPEC-Zeile.
   Fehlen sie, lesen Sie den nächsten Abschnitt.
6. **Ihre Workloads neu validieren.** Bauen Sie TensorRT-Engines und
   CUDA-Anwendungen auf dem Zielgerät neu. Erstellen Sie Python-Umgebungen
   neu, aktualisieren Sie Container, testen Sie Kameras erneut. Führen Sie die
   Prüfungen unter [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system)
   aus — für r39.2.1 sollte `cat /etc/nv_tegra_release` R39, Revision 2.1
   zeigen.

## Die Super-Modus-Falle (in 7.2.1 behoben)

Bei einer 7.2.0-ISO-Installation behielt das Gerät seine bestehende
Board-Konfiguration: Die Leistungsmodi 25W und MAXN SUPER fehlten, und
`sudo nvpmodel -m 2` schlug mit „bad power mode 2“ fehl. NVIDIA dokumentierte
dies in den Release Notes zu r39.2 als Problem 6279443: „Geräte wechseln nach
dem Update nicht standardmäßig in den 'Super'-Modus. Um den 'Super'-Modus zu
nutzen, müssen Sie das Ziel über einen Linux-Host oder SDKM flashen.“
NVIDIA-Mitarbeiter bezeichneten es später als ISO-Bug, behoben in 7.2.1.

JetPack 7.2.1 flasht standardmäßig die Super-Konfiguration: „Das ISO flasht
das Jetson Orin Nano Developer Kit jetzt standardmäßig mit der
Flash-Konfiguration für den Super-Modus.“ Problem 6279443 fehlt in der Liste
der bekannten Probleme von r39.2.1.

Zwei Einschränkungen bleiben:

- **Wählen Sie beim Flashen von einem Host das richtige Ziel.** Im SDK Manager
  lautet das Ziel „Jetson Orin Nano [8GB developer kit version]“. Verwenden
  Sie mit dem Flash-Skript das Ziel `jetson-orin-nano-devkit-super`, nicht das
  einfache Ziel, um die Super-Modi zu aktivieren. Beispiel (Developer Guide,
  NVMe): `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **7.2.1 über ein bestehendes System neu installieren.** NVIDIA: „Wenn Sie
  JetPack 7.2.1 per ISO auf einem bereits installierten System neu
  installieren, folgen Sie bitte sorgfältig den Anweisungen im Getting Started
  Guide.“ NVIDIA sagt nicht, ob eine 7.2.1-Neuinstallation den Super-Modus auf
  einem Gerät wiederherstellt, das ein 7.2.0-ISO im Nicht-Super-Zustand
  hinterlassen hat; der dokumentierte Weg ist ein Host-Flash mit der
  Super-Konfiguration. In-Place-Lösungen aus der Community (Bearbeiten von
  `/etc/nv_boot_control.conf`) sind von NVIDIA nicht befürwortet; ein Nutzer
  berichtete von einer Boot-Schleife. Siehe
  [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

## Rollback

NVIDIA-Mitarbeiter sagen: „Downgrade: Ja, Sie können bei Bedarf über den
SDK Manager zu JP 6.2.2 zurückflashen.“ Ein Nutzer bestätigte den Weg hin und
zurück (Neu-Flash auf 6.2.2, dann erneutes Upgrade auf 7.2). Die Kosten,
ehrlich benannt:

- **Kein In-Place-Downgrade.** Es ist ein vollständiger Neu-Flash von einem
  x86-Ubuntu-Host (offizielle Seiten nennen Ubuntu-Hosts; NVIDIA-Mitarbeiter
  berichten zudem, dass der Windows-SDK-Manager funktioniert).
- **Der Zielspeicher wird gelöscht.** Ihr Backup ist die einzige Kopie.
- **Mehr ist nicht garantiert.** NVIDIA veröffentlicht kein
  Downgrade-Verfahren, und kein Dokument sagt, dass JetPack-6.x-Bootmedien mit
  r39.2.x-QSPI-Firmware garantiert funktionieren. Behandeln Sie ein Downgrade
  als Neuinstallation des alten Stacks, plus dieselbe Neuaufbau-Arbeit.

Wenn nur die Super-Leistungsmodi fehlen, ist die engere Lösung ein Host-Flash
mit der Super-Konfiguration — das behält 7.x. Siehe
[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates).

## Quellen

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — Komponentenmatrix, Entfernung der SD-Karten-Images, Super-Modus als Standard, Hinweis zur Neuinstallation (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — ISO-Installationsablauf, Firmware-Hürde, Capsule-Aufforderung, MAXN SUPER (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — Firmware-Brücke, Versionsprüfungen (geprüft am 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — GA-Status, Breaking Changes in SIPL 2.0 (geprüft am 2026-09-26)
- [Jetson Linux 39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — Problem 6279443, die Super-Modus-Falle (geprüft am 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — Basisversionen der JetPack-6.x-Linie (geprüft am 2026-09-26)
- [NVIDIA developer forum — JetPack 7.2 GPU acceleration issue](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — NVIDIA-Mitarbeiter: Downgrade-Weg und CUDA-13.2-Wheel-Index (geprüft am 2026-09-26)
- [NVIDIA developer forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — NVIDIA-Mitarbeiter und Nutzer: TNSPEC-Prüfung auf `-super`, Host-Neu-Flash (geprüft am 2026-09-26)

*Status: geprüft am 2026-10-11. Basiert auf NVIDIAs
offizieller Dokumentation und Aussagen im Entwicklerforum zum angegebenen
Datum; noch nicht von Juxi Technology auf physischer Hardware verifiziert. Die
Liste der Neuaufbauten beschreibt Standardfolgen der Plattform — validieren
Sie sie gegen Ihren eigenen Stack.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
