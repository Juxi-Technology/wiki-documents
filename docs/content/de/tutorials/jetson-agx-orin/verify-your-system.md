---
title: System überprüfen — Versions- und Komponenten-Checkliste
sidebar_label: System überprüfen
slug: /getting-started/verify-your-system
description: >-
  Bestätigen Sie, dass Ihr Jetson AGX Orin Developer Kit mit JetPack 7.2.1 und
  dem vollständigen Komponenten-Stack läuft — Versionsbefehle und die erwartete
  Komponentenliste.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
review_owner: cheny
---

# System überprüfen

Nachdem Sie Ihr Kit eingerichtet oder aktualisiert haben, bestätigen Sie zwei Dinge: die **BSP-Version**
und den **installierten JetPack-Komponenten-Stack**. Beide Prüfungen dauern weniger als eine Minute.

## Schritt 1 — L4T-Version (BSP) prüfen

```bash
cat /etc/nv_tegra_release
```

Ein System mit **JetPack 7.2.1** meldet:

```
# R39 (release), REVISION: 2.1, ...
```

Wenn die Ausgabe eine ältere Version zeigt (zum Beispiel R35), aktualisieren Sie zuerst das BSP —
siehe **[Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates)**.

## Schritt 2 — JetPack-Komponenten prüfen

Die JetPack-Komponenten (CUDA, cuDNN, TensorRT, ...) werden als Debian-Pakete installiert. Prüfen Sie,
ob das Metapaket vorhanden ist:

```bash
dpkg -l | grep -i nvidia-jetpack
```

Und bestätigen Sie, dass das CUDA-Toolkit verfügbar ist:

```bash
nvcc --version
```

Erwartete Ausgabe für diese Version: **CUDA 13.2**. Wenn `nvcc` fehlt oder das Metapaket nicht
vorhanden ist, installieren Sie die Komponenten mit:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(Dies dauert je nach Verbindungsgeschwindigkeit etwa eine Stunde — siehe
[Schnellstart → Schritt 3](/de/tutorials/jetson-agx-orin/quick-start).)

## Schritt 3 — Erwartete Versionen für JetPack 7.2.1

Die folgende Tabelle ist die offizielle Komponentenliste von NVIDIA für **JetPack 7.2.1 /
Jetson Linux 39.2.1** (geprüft am 2026-09-23 auf der JetPack-Downloadseite von NVIDIA):

| Komponente | Version |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Betriebssystem | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.1 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (Computer Vision) | 4.1.3 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (mit ISO-Image) |
| Isaac ROS | **Noch nicht für JetPack 7 verfügbar** (laut NVIDIA „in Kürze verfügbar") |

> **Juxi-Hinweis:** `dpkg` zeigt Paketversionen möglicherweise mit Build-Suffixen an (zum Beispiel
> `13.2.1-b48`); das ist normal — vergleichen Sie die Versionsnummer, nicht den Suffix. Für Robotik-
> Nutzer: Prüfen Sie die Isaac ROS-Zeile, bevor Sie Arbeiten planen, die davon abhängen.

## Optional — ein kurzer Blick auf die Systemaktivität

`tegrastats` (in Jetson Linux enthalten) zeigt die aktuelle CPU-/GPU-/Speicherauslastung in Echtzeit an:

```bash
tegrastats
```

Zum Beenden `Ctrl`+`C` drücken.

## Wenn etwas fehlt

1. Führen Sie `sudo apt update && sudo apt install nvidia-jetpack` erneut aus.
2. Stellen Sie sicher, dass das `apt dist-upgrade` + Neustart aus dem Einrichtungsablauf abgeschlossen ist (siehe [Schnellstart → Schritt 3](/de/tutorials/jetson-agx-orin/quick-start)).
3. Prüfen Sie den Speicherplatz (`df -h`) und die Internetverbindung.
4. Kommen Sie nicht weiter? Siehe **[Fehlerbehebung](/de/tutorials/jetson-agx-orin/troubleshooting)**.

## Quellen

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (geprüft am 2026-09-23)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-23)

*Status: Entwurf, Überprüfung durch cheny ausstehend. Basiert auf der offiziellen NVIDIA-Dokumentation
zum angegebenen Datum; noch nicht von Juxi Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
