---
title: System überprüfen — Version, Super-Modus und Leistungsmodi-Checkliste
sidebar_label: System überprüfen
slug: /getting-started/verify-your-system
description: >-
  Prüfen Sie, dass Ihr Jetson Orin Nano Super Developer Kit mit JetPack 7.2.1,
  dem vollständigen Komponenten-Stack, der Super-Modus-Board-Konfiguration und
  den korrekten Leistungsmodi läuft.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# System überprüfen

Führen Sie diese Checkliste nach dem ersten Start Ihres JetPack-7.2.1-Systems aus. Sie bestätigt das
**L4T-Release**, die **installierten JetPack-Komponenten**, die **Board-Konfiguration des Super-Modus**
und die **Leistungsmodi**. Wenn das System noch nicht eingerichtet ist, beginnen Sie mit dem **[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)**.

## Schritt 1 — L4T-Release (BSP) prüfen

```bash
cat /etc/nv_tegra_release
```

Ein **JetPack 7.2.1**-System meldet **R39** mit **REVISION: 2.1**:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Juxi-Hinweis:** NVIDIA veröffentlicht keine Beispielausgabe für diese Datei. Der obige Block ist
> eine in der Community beobachtete r39.2.1-Ausgabe von einem Orin-Gerät; Ihre Werte für `GCID` und `DATE`
> werden abweichen. Entscheidend ist `REVISION: 2.1`.

Zeigt die Ausgabe ein älteres Release (zum Beispiel R36 aus JetPack 6.x), läuft Ihr System nicht
mit JetPack 7.2.1 — siehe **[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)** und die
**[JetPack-6-zu-7-Migration](/de/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Schritt 2 — JetPack-Komponenten und -Versionen prüfen

JetPack-Komponenten wie CUDA, cuDNN und TensorRT werden als Debian-Pakete installiert.
NVIDIAs offizieller Auflistungsbefehl ist:

```bash
apt list --installed | grep nvidia-jetpack
```

Das Metapaket `nvidia-jetpack` muss in der Ausgabe erscheinen. Für eine Stichprobe bei einer
einzelnen Komponente fragen Sie `dpkg` direkt ab — zum Beispiel cuDNN mit `dpkg -l | grep cudnn`. Fehlt das Metapaket,
führen Sie `sudo apt update` und dann `sudo apt install nvidia-jetpack` aus und starten Sie neu, wenn Sie dazu aufgefordert werden.

Die folgende Tabelle listet NVIDIAs offizielle Komponentenversionen für **JetPack 7.2.1 / Jetson
Linux 39.2.1** (geprüft am 2026-09-26 auf der JetPack-Downloadseite):

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
| Isaac ROS | **Veröffentlicht** — Isaac ROS 4.6.0 (August 2026) fügte Unterstützung für Jetson Orin und JetPack 7.2 hinzu; NVIDIAs Komponententabelle nennt weiterhin „coming soon“ |

> **Juxi-Hinweis:** NVIDIAs 7.2.1-Seite führt eine einzige Matrix für die gesamte JetPack-7-
> Reihe (Thor und Orin zusammen), nicht pro Plattform. `dpkg` zeigt Versionen möglicherweise mit
> Build-Suffix — vergleichen Sie die Versionsnummer, nicht die vollständige Zeichenkette. NVIDIAs
> Tabelle listet keine OpenCV-, DLA- oder Python-Versionen, daher diese Seite auch nicht.

> **Zur VPI-Version:** NVIDIAs Downloadseite wurde für 7.2.1 nicht vollständig aktualisiert — ihre
> VPI-Zeile führt weiterhin den JetPack-7.2-Wert (4.1.3). JetPack 7.2.1 liefert tatsächlich **VPI
> 4.1.4**, bestätigt durch NVIDIAs eigenes Paket-Repository: `nvidia-jetpack-runtime (= 7.2.1-b49)`
> hängt von `nvidia-vpi (= 7.2.1-b49)` ab, das wiederum `libnvvpi4 (= 4.1.4)` festlegt. Sowohl 4.1.3
> als auch 4.1.4 liegen im Paketpool vor, daher ist allein der Abhängigkeits-Lock entscheidend. (geprüft am 2026-09-26)

## Schritt 3 — jtop installieren und die Systemaktivität ablesen (optional)

`jtop` ist Teil von **jetson-stats**, einem Community-Projekt — kein NVIDIA-Produkt. NVIDIA
dokumentiert es für dieses Release nicht, und die Kompatibilität mit L4T r39 ist von NVIDIA nicht verifiziert.

Installieren Sie es nach den Community-Anweisungen auf der
[jetson-stats-Projektseite](https://pypi.org/project/jetson-stats/).

Führen Sie dann `jtop` aus — einen interaktiven Systemmonitor und Prozessbetrachter. Behalten Sie
die gemeinsamen 8 GB Unified Memory im Blick, bevor Sie eine große KI-Workload starten. Eine offizielle
Alternative ist `sudo tegrastats` (Live-Aktivität von CPU, GPU, Speicher, Temperatur und
Leistungsaufnahme; `Ctrl`+`C` beendet es). NVIDIAs How-To-Seite empfiehlt `tegrastats` statt
`nvidia-smi` für die Überwachung auf Jetson.

## Schritt 4 — Die Board-Konfiguration des Super-Modus prüfen (TNSPEC)

ISO-Installationen von JetPack 7.2.1 flashen standardmäßig die **Super-Modus**-Konfiguration. Bestätigen Sie sie auf dem Gerät:

```bash
cat /etc/nv_boot_control.conf
```

Bei einem Super-konfigurierten Kit trägt die `TNSPEC`-Zeile das Suffix `-super`. NVIDIA-Mitarbeiter haben
dieses Beispiel veröffentlicht:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

Bei einem Nicht-Super-Kit endet dieselbe Zeile ohne `-super` — zum Beispiel aus dem Bericht eines Nutzers
über ein betroffenes System: `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Juxi-Hinweis:** Die Zeichen in der Mitte der TNSPEC-Zeichenkette variieren je nach Einheit und Firmware-
> Zustand. Entscheidend ist das Suffix `-super` am Ende der TNSPEC-Zeile.

Issue **6480645** aus den Release Notes: Nach einer ISO-Installation spiegelt die UEFI-Variable `TegraPlatformSpec`
die Board-Spezifikation möglicherweise nicht korrekt wider. NVIDIA empfiehlt, für die korrekten
Board-Informationen den `TNSPEC`-Eintrag in `/etc/nv_boot_control.conf` zu lesen.

## Schritt 5 — Die Leistungsmodi prüfen

Der Standard-Leistungsmodus ist typischerweise **25W**. Vom Desktop aus: Klicken Sie in der oberen Leiste
von Ubuntu auf den Leistungsmodus, wählen Sie **Power Mode** und dann **MAXN SUPER**. Auf der Kommandozeile
zeigen Sie den aktiven Modus und seine Modus-ID an:

```bash
sudo /usr/sbin/nvpmodel -q
```

Um den Modus zu wechseln, verwenden Sie die von der Abfrage angezeigte ID (`sudo /usr/sbin/nvpmodel -m <mode_id>`).
So unterscheiden Sie Super von Nicht-Super:

| | Super-Konfiguration | Nicht-Super-Konfiguration |
|---|---|---|
| Verfügbare Modi | 15W, 25W, **MAXN SUPER** | nur 7W, 15W |
| Modus-IDs (in der Community beobachtet) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; Standard 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | wählt MAXN SUPER | schlägt fehl: `NVPM ERROR: request for bad power mode 2` |

> **Juxi-Tipp:** Die Modus-IDs stammen aus einem Community-Bericht über die Profildateien auf einem
> 7.2-System; das Leistungsmodus-Menü des Desktops listet die verfügbaren Modi direkt auf. Nachdem die GPU
> verwendet wurde, kann ein Leistungsmodus-Wechsel einen Neustart verlangen — NVIDIA-Mitarbeiter sagen, diese
> Aufforderung sei zu erwarten.

## Wenn nur 7W und 15W erscheinen

Dies ist ein bekanntes Problem von JetPack 7.2, das in 7.2.1 konstruktiv behoben wurde.

- Unter **JetPack 7.2 (L4T 39.2)** besagt das bekannte Problem **6279443**, dass Einheiten, die über den ISO-Installer
  aktualisiert wurden, „nicht standardmäßig den ‚Super'-Modus verwenden“; NVIDIAs Empfehlung war, das Ziel
  mit einem Linux-Host oder dem SDK Manager zu flashen.
- **JetPack 7.2.1** ändert dies: „Das ISO flasht das Jetson Orin Nano Developer Kit jetzt
  standardmäßig mit der Super-Modus-Flash-Konfiguration.“ Issue 6279443 steht nicht auf der Liste der bekannten
  Probleme von 7.2.1, und NVIDIA-Mitarbeiter erklärten: „Das wird in jp7.2.1 behoben“

Eine frische 7.2.1-ISO-Installation sollte 25W und MAXN SUPER anzeigen. Falls Ihr Kit das nicht tut:

1. Bei einem mit dem 7.2-ISO installierten System flashen Sie die Super-Konfiguration von einem
   Linux-Host oder mit dem SDK Manager neu — siehe **[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. NVIDIA gibt nicht an, ob eine 7.2.1-ISO-Neuinstallation ein Board umwandelt, das mit dem 7.2-ISO installiert
   wurde. Fehlen die Super-Modi weiterhin, nutzen Sie die Neuflash-Optionen in der
   **[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**.

Dieselbe Frage ist auch in den **[FAQ](/de/tutorials/jetson-orin-nano/faq)** zu finden.

## So sieht ein korrektes System aus

| Prüfung | Befehl | Was ein korrektes System anzeigt |
|---|---|---|
| L4T-Release | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| JetPack-Pakete | `apt list --installed \| grep nvidia-jetpack` | Installierte JetPack-Pakete, einschließlich des Metapakets `nvidia-jetpack` |
| cuDNN-Stichprobe | `dpkg -l \| grep cudnn` | Version 9.20.0 |
| Board-Konfiguration | `cat /etc/nv_boot_control.conf` | Die `TNSPEC`-Zeile endet mit `jetson-orin-nano-devkit-super-` |
| Leistungsmodi | `sudo /usr/sbin/nvpmodel -q` | Aktiver Modus ist standardmäßig 25W; 15W, 25W und MAXN SUPER sind auswählbar |

## Wenn noch etwas nicht stimmt

Fehlende Komponenten: Führen Sie die beiden Befehle aus Schritt 2 erneut aus. Bei Problemen mit der Super-Konfiguration
oder den Leistungsmodi siehe **[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)** und **[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**.
Bevor Sie um Hilfe bitten, sammeln Sie `cat /etc/nv_tegra_release` und `cat /etc/nv_boot_control.conf`
— NVIDIA-Mitarbeiter fordern diesen Zustand (plus `sudo /usr/sbin/nvpmodel -q --verbose`) vor jeglichen
Workarounds an Konfigurationsdateien an. Juxi-Support: **support@juxitech.com** mit Ihrer Bestellnummer.

## Quellen

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (geprüft am 2026-09-26)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (geprüft am 2026-09-26)
- [NVIDIA-Forum — 25W und MAXN SUPER nicht sichtbar in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [anhaltende Leistungsmodus-Probleme](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super-Modus wird nicht freigeschaltet](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (geprüft am 2026-09-26; einschließlich Antworten von NVIDIA-Mitarbeitern)
- [jetson-stats (jtop) auf PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (geprüft am 2026-09-26; Community-Quellen für die jtop-Installation)

*Status: geprüft am 2026-10-11. Basiert auf NVIDIAs offizieller Dokumentation und NVIDIA-
Forenquellen mit Stand der oben genannten Daten; noch nicht von Juxi Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird
von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
