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
    note: still lists Isaac ROS as "coming soon"; see the note under Step 3
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
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

Die folgende Tabelle listet auf, was **JetPack 7.2.1 / Jetson Linux 39.2.1** tatsächlich
installiert — verifiziert am 2026-09-26 über die Abhängigkeitskette von `nvidia-jetpack` 7.2.1
im [Jetson-apt-Repository von NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages):

| Komponente | Version |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Betriebssystem | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (Computer Vision) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (mit ISO-Image) |
| Isaac ROS | *„in Kürze verfügbar“ auf der JetPack-Seite* — separat veröffentlicht; siehe Hinweis unten |

> **Juxi-Hinweis:** `dpkg` zeigt Paketversionen möglicherweise mit Build- oder Revisions-Suffixen an
> (zum Beispiel `13.2.2-1` oder `7.2.1-b49` für L4T-Pakete); das ist normal — vergleichen Sie die
> Versionsnummer, nicht den Suffix.
>
> **Wo die JetPack-Downloadseite hinterherhinkt (geprüft am 2026-09-26):** Die Übersichtstabelle dort
> zeigt weiterhin CUDA **13.2.1** und VPI **4.1.3** — das sind die Werte von JetPack **7.2**.
> `nvidia-jetpack` 7.2.1 installiert CUDA **13.2.2** (Build 13.2.86) und VPI **4.1.4**. Maßgeblich
> ist das oben genannte apt-Repository.
>
> **Isaac ROS (erneut geprüft am 2026-09-26):** Die JetPack-Downloadseite zeigt weiterhin
> „in Kürze verfügbar“, aber Isaac ROS unterstützt Jetson Orin + JetPack 7.2 seit Release **4.6.0**
> (2026-08-18). Isaac ROS wird unabhängig von JetPack veröffentlicht, daher sind die eigenen
> Release Notes die ausschlaggebende Quelle. Für Robotik-Nutzer: Lesen Sie
> [Robotik unter JetPack 7.2](/de/tutorials/jetson-agx-orin/robotics), bevor Sie Arbeiten planen, die
> davon abhängen.

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
