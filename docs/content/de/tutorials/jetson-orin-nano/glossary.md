---
title: Glossar
sidebar_label: Glossar
slug: /appendix/glossary
description: >-
  Zentrale Begriffe zum NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) —
  von der JetPack- und L4T-Versionierung über das Flashen und die
  Leistungsmodi bis zum KI-Stack.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Glossar

Die Begriffe, auf die ein neuer Jetson-Nutzer zuerst stößt, in alphabetischer
Reihenfolge. Die Versionsnummern beziehen sich auf das aktuelle Release für
dieses Kit (**JetPack 7.2.1 / L4T r39.2.1**, geprüft am 2026-09-26).

## Begriffe

| Begriff | Bedeutung |
|---|---|
| **BSP** | Board Support Package: die Software-Schicht, die die Platine bootet — Bootloader, Kernel, Treiber und das Root-Dateisystem. In JetPack ist das BSP Jetson Linux (L4T). Während einer Jetson-ISO-Installation schreibt der Installer das BSP auf das von Ihnen gewählte Speichergerät. |
| **Capsule-Update** | Ein Update der QSPI-Boot-Firmware. Während einer Jetson-ISO-Installation auf einem Kit mit älterer QSPI-Firmware fordert der Installer Sie auf, ein Capsule-Update auszuführen: Drücken Sie `Y` innerhalb von 30 Sekunden, sonst schlägt die Installation später fehl. Das Update läuft in zwei Durchgängen, und das Kit startet möglicherweise dazwischen neu — das ist zu erwarten. |
| **Carveout** | Ein Speicherbereich, den die Boot-Firmware für einen bestimmten Hardware-Block reserviert, etwa die Display- oder Kamera-Pipeline. Das Betriebssystem kann ihn nicht nutzen. Auf Orin Nano sind diese Reservierungen dokumentiert, und Sie können sie reduzieren, indem Sie das BSP bearbeiten und das Kit neu flashen (siehe [Speichereffizienz](/de/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | NVIDIAs Parallel-Computing-Plattform und Toolkit zum Ausführen von Code auf der GPU. JetPack 7.2.1 liefert CUDA 13.2.2. Die Compute-Capability der Orin-GPU ist 8.7 (`sm_87`); GPU-Binärdateien ohne `sm_87` fallen auf CPU-Ausführung zurück (siehe [Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | NVIDIAs Bibliothek optimierter Deep-Learning-Primitive wie Faltung und Aktivierungsfunktionen. Deep-Learning-Frameworks und TensorRT nutzen sie für ihre Kernoperationen. JetPack 7.2.1 liefert cuDNN 9.20.0. |
| **DeepStream** | NVIDIAs SDK für Multi-Stream-Videoanalyse: Es dekodiert Video, führt Inferenz aus, verfolgt Objekte und gibt Ergebnisse aus. DeepStream 9.1 unterstützt die Jetson-Orin-Familie auf JetPack 7.2. NVIDIA empfiehlt den Docker-Container als schnellsten Installationsweg für neue Nutzer (siehe [DeepStream](/de/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator: eine fest verdrahtete Inferenz-Engine, die in manchen Jetson-Modulen integriert ist. Das Orin-Nano-Modul hat keinen DLA, daher läuft die Inferenz auf diesem Kit auf der GPU. |
| **Edge-LLM** | TensorRT Edge-LLM: NVIDIAs On-Device-Runtime für große Sprachmodelle (LLMs) und Vision-Language-Modelle (VLMs). Auf Orin unterstützt sie nur FP16-, INT8- und INT4-Engines — FP8- und FP4-Engines laufen nicht —, und die Engines werden auf dem Gerät selbst gebaut (siehe [Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Eingebetteter Flash-Speicher, der auf manchen Jetson-Modulen als Systemlaufwerk dient. Das Developer Kit wird ohne Speicher geliefert: Legen Sie vor dem Start eine microSD-Karte oder eine NVMe-SSD bereit (siehe [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)). |
| **Force-Recovery-Modus** | Ein spezieller Boot-Modus, um das Kit von einem Host-PC zu flashen. Wechseln Sie aus dem laufenden System mit `sudo reboot --force forced-recovery` hinein, oder überbrücken Sie bei ausgeschaltetem Kit die Pins 9 und 10 des Button-Headers und schließen Sie dann die Stromversorgung an. In diesem Modus trägt der USB-C-Anschluss die Flash-Verbindung zum Host-PC. |
| **JetPack** | NVIDIAs SDK-Bundle für Jetson: Betriebssystem, Treiber, CUDA-Stack und Bibliotheken. Das aktuelle Release für dieses Kit ist JetPack 7.2.1, das Jetson Linux (L4T) r39.2.1 enthält. |
| **Jetson 6.x Update Path** | Das Firmware-Brückenverfahren für Kits, deren Werks-UEFI/QSPI-Firmware älter als 36.0 ist. Es bootet ein JetPack-5.1.3-microSD-Brücken-Image und plant ein Bootloader-(Firmware-)Update ein; danach kann das Kit JetPack 6.x oder das JetPack-7.2.1-Jetson-ISO booten. Kits mit älterer Firmware müssen diesen Pfad vor einer ISO-Installation abschließen (siehe [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | Das vereinheitlichte USB-Installer-Image für JetPack 7.2 und später. Schreiben Sie es mit einem Werkzeug wie Balena Etcher auf einen USB-Stick — schreiben Sie es nicht auf eine microSD-Karte — und beachten Sie: Es dient nur der Installation, es ist kein Live-USB. Während der Installation wählen Sie das Ziel: die microSD-Karte oder die NVMe-SSD. |
| **L4T** | Jetson Linux: das Board-Support-Paket unterhalb von JetPack — UEFI-Bootloader, Kernel, Treiber und das Ubuntu-Root-Dateisystem. Für JetPack 7.2.1 ist es r39.2.1, mit Linux-Kernel 6.8 und einem Ubuntu-24.04-Root-Dateisystem. |
| **MAXN SUPER** | Der höchste Leistungsmodus des Kits (Modus 2): CPU 1.728 MHz, GPU 1.020 MHz, Speicher 3.199 MHz. Es ist ein experimenteller Modus und existiert nur, wenn das Kit mit der Super-Konfiguration geflasht wurde. Wählen Sie ihn im **Power Mode**-Menü des Desktops oder führen Sie `sudo /usr/sbin/nvpmodel -m 2` aus. |
| **microSD (UHS-1)** | Das Kartenformat, das als standardmäßiger Systemspeicher des Kits dient. UHS-1 ist eine SD-Geschwindigkeitsklasse; NVIDIA empfiehlt eine UHS-1-microSD-Karte mit 64 GB oder mehr. Der Slot liegt auf der Unterseite des Moduls, legen Sie die Karte daher vor dem Booten des Installers ein. |
| **nv_boot_control.conf / TNSPEC** | Die Datei `/etc/nv_boot_control.conf` auf dem Gerät, die die Board-Konfiguration als TNSPEC-Zeichenkette festhält. NVIDIA-Mitarbeiter weisen darauf hin, dass eine Super-Konfiguration ein Suffix `-super` zeigt, zum Beispiel `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; fehlt das Suffix, sind die höheren Leistungsmodi nicht verfügbar. Nach einer ISO-Installation verweist NVIDIA auf diesen TNSPEC-Eintrag als Referenz für die korrekten Board-Informationen. |
| **NVMe** | Eine SSD am PCIe-Bus, installiert in einem der M.2-Key-M-Slots der Trägerplatine: 2280-Größe (PCIe 3.0 x4) oder 2230-Größe (PCIe 3.0 x2). Eine NVMe-SSD kann das System beherbergen und wird empfohlen, wenn Sie mehr Kapazität und bessere Speicherleistung benötigen. |
| **nvpmodel** | Das Werkzeug für die Leistungsmodi auf dem Kit. Führen Sie `sudo /usr/sbin/nvpmodel -q` aus, um die auf Ihrem System verfügbaren Modi anzuzeigen, und `sudo /usr/sbin/nvpmodel -m <mode_id>`, um den Modus zu wechseln. Dieselben Modi finden Sie im **Power Mode**-Menü des Desktops. |
| **oem-config** | Der Einrichtungsassistent beim ersten Start: Lizenzvereinbarung, Sprache und Tastatur, Netzwerk sowie erster Benutzername und Passwort. Er läuft einmal, nach dem ersten Start des installierten Systems. |
| **QSPI** | Der kleine NOR-Flash-Speicher auf dem Kit, der die UEFI-Boot-Firmware enthält. JetPack 7.2 und später erfordern QSPI-Firmware der JetPack-6.x-Generation (neuer als Version 36.0); mit älterer Firmware kann der Installer fehlschlagen oder das Kit mit einem schwarzen Bildschirm booten. Siehe [Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | NVIDIAs Host-PC-Tool zum Flashen des BSP und Installieren der JetPack-Komponenten über USB. Der dokumentierte Host ist ein x86-PC mit Ubuntu. Es ist die Alternative zur On-Device-Methode mit dem Jetson ISO. |
| **SO-DIMM** | Der Steckverbinder-Formfaktor des Moduls: ein 260-Pin-SO-DIMM, 69,6 mm × 45 mm. Das Modul steckt im SO-DIMM-Sockel der Trägerplatine, und derselbe Sockel nimmt auch ein Jetson-Orin-NX-Modul auf. |
| **Super-Modus** | NVIDIAs Software-Konfiguration für Leistung und Taktraten des Orin Nano — keine andere Hardware. Bestehende Kits erhalten den „Super“-Schub über ein JetPack-Software-Upgrade, und auf diesem Kit erscheinen die höheren Leistungsmodi nur, wenn es mit der Super-Konfiguration geflasht wurde. |
| **TensorRT** | NVIDIAs Inferenz-Optimierer und Laufzeitumgebung. Er kompiliert ein trainiertes Modell zu einer TensorRT-Engine — einer gerätespezifischen Datei für die Ziel-GPU — und führt diese Engine effizient aus. JetPack 7.2.1 liefert TensorRT 10.16.2. |
| **TOPS** | Billionen (Tera) Operationen pro Sekunde, die übliche Einheit für KI-Durchsatz. Dieses Kit ist mit bis zu 67 sparse INT8 TOPS (33 dense INT8) angegeben. NVIDIA veröffentlicht für dasselbe Modul sowohl einen Sparse- als auch einen Dense-Wert. |
| **UEFI** | Die Boot-Firmware des Kits und ihr Setup-Menü. Drücken Sie Esc, während der NVIDIA-Boot-Splash angezeigt wird, um das Setup zu öffnen; im Menü wählen Sie im Boot Manager das USB-Installer-Gerät als Boot-Gerät. Dort wird auch die Firmware-Version angezeigt, und JetPack 7.2 und später benötigen eine Version neuer als 36.0. |
| **Unified Memory** | Der eine 8-GB-LPDDR5-Speicherpool, den sich CPU und GPU teilen — das Kit hat keinen separaten Videospeicher. Etwa 7,6 GB sind nach Firmware- und Kernel-Reservierungen nutzbar, und das Betriebssystem, Ihre Modelle und deren KV-Caches zehren alle aus diesem einen Pool. Siehe [Speichereffizienz](/de/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface: NVIDIAs Bibliothek für hardwarebeschleunigte Bildverarbeitung auf Jetson. JetPack 7.2.1 liefert VPI 4.1.4. |

## Versionszuordnung

Die nützlichste Versionszuordnung zum Einprägen:

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (aktuell) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (letztes JetPack-6-Release) | r36.5.2 | 22.04 | 5.15 | 12.6 |

Um zu prüfen, was ein konkretes System tatsächlich ausführt:
`cat /etc/nv_tegra_release`
(siehe [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system)).

## Quellen

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (geprüft am 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ ihre Komponententabelle hinkt Zeile für Zeile hinterher (die VPI- und PVA-Zeilen führen weiterhin JetPack-7.2-Werte); verwenden Sie für Komponentenversionen stattdessen [NVIDIAs Paket-Repository](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (geprüft am 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (geprüft am 2026-09-26)
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (geprüft am 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (geprüft am 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (geprüft am 2026-09-26)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (geprüft am 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (geprüft am 2026-09-26)
- [NVIDIA forum — „25W and MAXN_SUPER not seen in JetPack 7.2“ (NVIDIA staff answer)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (geprüft am 2026-09-26)

*Status: Entwurf, ausstehende Prüfung durch cheny. Definitionen zusammengestellt
aus der NVIDIA-Dokumentation und üblicher Branchenpraxis; Versionsnummern an
den angegebenen Daten geprüft. Nicht von Juxi Technology auf physischer
Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine NVIDIA-Publikation.
