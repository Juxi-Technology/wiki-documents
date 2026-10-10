---
title: Fehlerbehebung
sidebar_label: Fehlerbehebung
slug: /support/troubleshooting
description: >-
  Symptomgesteuerte Fehlerbehebung für das NVIDIA Jetson Orin Nano Super Developer Kit (8GB) — Installationsfallen, Leistungsmodi, NVMe-Speicher, GPU-Beschleunigung und bekannte Probleme, mit klaren Quellen-Einstufungen.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# Fehlerbehebung

Finden Sie Ihr Symptom im unten stehenden Index und lesen Sie dann den
passenden Abschnitt. Einstufungen: **A** = offizielle NVIDIA-Dokumentation;
**B** = NVIDIA-Entwicklerforum (Mitarbeiter- oder Community-Berichte). Nur auf
die Community zurückgehende Punkte sind als *unbestätigt* markiert. Juxi hat
für diese Serie kein Gerät vorliegen — diese Seite ist ausschließlich anhand
der Dokumentation geprüft, nicht auf Hardware getestet.

## Beginnen Sie mit NVIDIAs offiziellem Troubleshooting Guide

NVIDIAs erste Anlaufstelle für dieses Kit: der [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html). Er deckt genau fünf Einrichtungsprobleme ab: (1) Das Jetson ISO bootet nicht, (2) keine Bildausgabe, (3) der Installer zeigt keinen Zielspeicher an, (4) Firmware-Update erforderlich, (5) Docker-Berechtigungsfehler. Verwandte offizielle Seiten: Die Seite [Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) enthält derzeit keine Problemumgehungen (sie verweist auf den JetPack 6.x Update Path), und die Seite [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) listet NVIDIAs Eskalationskanäle. (Einstufung A)

## Symptomindex

| Symptom | Abschnitt |
| --- | --- |
| Installer überspringt Sprach-/Netzwerk-/Benutzerbildschirme, danach hängt das System bei einem schwarzen Bildschirm mit Cursor; kein Passwort funktioniert | Verpasste QSPI-Capsule-Aufforderung |
| Installation sah in Ordnung aus, schlägt aber später fehl | Verpasste QSPI-Capsule-Aufforderung |
| Installation oder Flashen schlägt mit angeschlossenem USB-Hub oder -Dongle fehl | USB-Peripheriegeräte |
| Nur 7W und 15W im Leistungsmodus-Menü; `nvpmodel -m 2` meldet einen Fehler | 25W / MAXN SUPER fehlen |
| GPU hängt selbst in MAXN SUPER bei 624,75 MHz fest | GPU hängt bei 624,75 MHz fest |
| Leistungsmodus-Wechsel verlangt einen Neustart; der Neustart kann bei schwarzem Bildschirm hängen bleiben | Leistungsmodus-Wechsel und der Neustart mit schwarzem Bildschirm |
| Installer bietet das NVMe-Laufwerk nicht an; Installation hängt nach 100 % | NVMe-Speicherprobleme |
| NVMe ist in der UEFI-Phase nicht sichtbar | NVMe-Speicherprobleme |
| Installation bricht bei „Step 9/13 Updating boot firmware“ ab | Board-Namenskonflikt bei Schritt 9/13 |
| `jetson-io.py` schlägt auf einem ISO-geflashten Super-Gerät fehl | Jetson-IO-DTB-Konflikt |
| Ollama läuft auf der CPU; Warnung „Unsupported JetPack version“ | Ollama und GPU-Beschleunigung |
| Python-Wheels für JetPack 7.2 benötigt | Python-Wheels |
| Wi-Fi findet das Netzwerk nicht; 6-GHz-MBSSID-Router nicht unterstützt | Wi-Fi findet das Netzwerk nicht |
| Keine Bildausgabe; der Installer bootet nicht | Offizieller Troubleshooting Guide (oben) |
| Docker-Socket-Berechtigungsfehler | Docker-Berechtigungsfehler |
| Boot-Logs ohne Display benötigt | Serielle Konsole |

## Verpasste QSPI-Capsule-Aufforderung (die häufigste Installationsfalle)

Während der ISO-Installation fordert das Kit Sie auf, ein QSPI-Firmware-Capsule-Update zu bestätigen. NVIDIA nennt dies „den am häufigsten übersehenen Schritt“: Die Aufforderung wartet nur 30 Sekunden. **Drücken Sie Y.**

- Läuft sie ab, „schlägt die Installation später fehl“. NVIDIAs Anweisung lautet, die Installation neu zu starten und Y zu drücken. (Einstufung A; [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) Abschnitt 5.1; Release-Notes-Problem 6266271, in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) und [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf): „Das Überspringen dieses Schritts verursacht Installationsprobleme aufgrund der Inkompatibilität neuer ISO-Images mit älteren QSPI-Images.“)
- Das Update läuft in zwei Durchgängen, und das Kit startet möglicherweise dazwischen neu. Das ist zu erwarten. NVIDIA empfiehlt außerdem, den USB-Installer im UEFI-Boot-Manager ausdrücklich auszuwählen, statt sich auf den Auto-Boot zu verlassen. (Einstufung A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html); Mitarbeiter bestätigten, dass der Leitfaden um die Problemumgehung eines Nutzers ergänzt wurde — Einstufung B, [Thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Fehlersignatur (Einstufung B, Nutzerbericht plus Bestätigung durch Mitarbeiter, [Thread 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)): Der Installer überspringt die Sprach-, Netzwerk- und Benutzername-Bildschirme, springt zu „Finished installation and reboot“, und das System bleibt dann bei einem schwarzen oder grauen Bildschirm mit Cursor hängen. Keine Standard-Anmeldedaten funktionieren (nvidia/nvidia, ubuntu/ubuntu, root/leer). Ursache: Die Capsule-Aufforderung wurde nie bestätigt. Nach Drücken von Y erschienen die Einrichtungsbildschirme und die Installation wurde abgeschlossen. Andere Nutzer im selben Thread lösten das Problem, indem sie mit dem SDK Manager flashten. (Einstufung B)
- Wenn das Kit den Installer nie erreicht (schwarzer Bildschirm oder es landet in einer UEFI-Shell), ist die QSPI-Firmware wahrscheinlich zu alt: JetPack 7.2/7.2.1 erfordern UEFI/QSPI-Firmware der JetPack-6.x-Generation. Siehe [Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates) und [Migration von JetPack 6.x](/de/tutorials/jetson-orin-nano/jetpack-6-to-7). (Einstufung A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## Installation oder Flashen schlägt mit bestimmten USB-Peripheriegeräten fehl

Offizielle Probleme **5424568** und **5460707** (in den Notes zu [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) und [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) enthalten): Die ISO-Installation schlägt fehl, wenn der Installer-USB-Stick an einem **„USB3.0 4-port Portable Hub Model UH400“**-Hub angeschlossen ist — „andere USB-Sticks oder Hubs funktionieren wie erwartet“ —, und das Flashen schlägt manchmal fehl, wenn ein **TRENDnet TU2-ET100**-USB-auf-Ethernet-Adapter angeschlossen ist. Verwenden Sie vor einem erneuten Versuch einen anderen Stick/Hub bzw. einen direkten USB-Port und entfernen Sie den Adapter. (Einstufung A)

## 25W und MAXN SUPER fehlen

Symptome: Es erscheinen nur 7W und 15W, oder `nvpmodel -m 2` liefert einen Fehler wegen ungültigem Leistungsmodus. Ursache — offizielles bekanntes Problem **6279443** ([Notes zu r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)): Per ISO aktualisierte Geräte „wechseln nach dem Update nicht standardmäßig in den 'Super'-Modus. Um den 'Super'-Modus zu nutzen, müssen Sie das Ziel über einen Linux-Host oder SDKM flashen.“ (Einstufung A)

Signatur — das Suffix `-super` fehlt in `/etc/nv_boot_control.conf`. Mitarbeiter: „Wenn der Super-Modus aktiviert ist, sollte die Konfiguration das Suffix -super enthalten … Derzeit kann das ISO-Image ein Gerät nicht vom Nicht-Super-Modus in den Super-Modus überführen. Bitte verwenden Sie einen x86-Host, um das Gerät mit der Super-Modus-Konfiguration neu zu flashen.“ (Einstufung B, [Thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

In 7.2.1 konstruktiv behoben — Mitarbeiter: „Das wird in jp7.2.1 behoben“; die [Notes zu r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) sagen: „Das ISO flasht das Jetson Orin Nano Developer Kit jetzt standardmäßig mit der Flash-Konfiguration für den Super-Modus“, und Problem 6279443 fehlt in der Liste der bekannten Probleme. (Einstufung A)

Lösungsoptionen:

1. Neu flashen von einem Linux-Host oder mit dem SDK Manager. (Einstufung A, Problem 6279443, [Notes zu r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. QSPI-only-Flash durch Mitarbeiter — flasht nur den QSPI-Bootloader, kein System-Image (Einstufung B, [Thread 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)). Der erste Befehl ist der Mitarbeiter-Befehl; der zweite ergänzt das erfolgreiche Super-Ziel und die EEPROM-Overrides des Berichtenden:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. In-Place-Lösung aus der Community — *unbestätigt*, nicht von NVIDIA befürwortet (Einstufung B, [Thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [Thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)). NVIDIA-Mitarbeiter baten Nutzer, den Zustand **vor** der Bearbeitung dieser Datei zu erfassen (`cat /etc/nv_tegra_release`, `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) — die Bearbeitung „würde den fehlerhaften Zustand entfernen, den wir untersuchen müssen“. Gemeldete Abfolge: `sudo -i`; `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`; `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`; `reboot`; danach `sudo nvpmodel -m 2 --verbose --force`. Mehrere Nutzer bestätigten, dass 25W und MAXN SUPER danach erschienen; ein Nutzer mit einer SD-Karten-Installation bekam eine Boot-Schleife und installierte neu.

Kontext: Bei einer 7.2-Nicht-Super-Installation existiert `/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER), aber `/etc/nvpmodel.conf` verweist auf die Nicht-Super-Datei mit nur 15W und 7W. (Einstufung B, Community, [Thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)). Befehle zur Leistungsmodus-Prüfung: [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system).

## GPU hängt bei 624,75 MHz fest

Selbst mit aktivem MAXN_SUPER kann die GPU bei 624.750.000 Hz (`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000) festhängen — im berichteten Fall half das alleinige Flashen der Super-Capsule nicht: Die Super-Firmware wurde nicht angewendet. Mitarbeiter: Flashen Sie mit dem SDK Manager oder manuell von einem Ubuntu-Host aus; laut Aussage in 7.2.1 behoben. (Einstufung B, [Thread 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)) Community-Hinweis: In L4T 39.2 gibt es keine `nvpmodel_p3767_0005.conf`; das Modul P3767-0005 verwendet die 0003-Konfiguration (von Mitarbeitern nicht bestätigt). (Einstufung B, Community, derselbe Thread wie oben)

## Leistungsmodus-Wechsel und der Neustart mit schwarzem Bildschirm

- Die Neustart-Aufforderung nach einem Leistungsmodus-Wechsel ist zu erwarten, sobald die GPU genutzt wurde („golden image context“). (Einstufung B, Mitarbeiter, [Thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Wenn der Neustart mit schwarzem Bildschirm hängen bleibt, entspricht das Problem **6236259** ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf); in [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) als behoben aufgeführt): Das Absenken der EMC-Frequenz unter Fmax während der systemd-Initialisierung kann das System beim Neustart zum Absturz bringen, besonders mit angeschlossenem Display. (Einstufung A)
- Problemumgehung: Starten Sie mit getrenntem Monitor neu und schließen Sie ihn nach dem Boot wieder an — ein Nutzer bestätigte, dass dies die Leistungsmodus-Probleme behob. (Einstufung B, Mitarbeiter plus Nutzer, [Thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- NVIDIAs Abhilfe: Wechseln Sie vor dem Neustart in den MAXN-Modus (setzt EMC auf Fmax zurück); befinden Sie sich bereits im problematischen Modus, booten Sie einmal ohne Display. (Einstufung A, Problem 6236259, [Notes zu r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## NVMe-Speicherprobleme

**Installer bietet das Laufwerk nicht an / Partitionsschritt schlägt fehl** — *unbestätigt*: Der Installer unterstützt möglicherweise keine NVMe-Laufwerke, die mit 4K-Sektoren formatiert sind; er benötigt 512n/512e. Prüfen Sie mit `nvme id-ns -H /dev/nvme0n1`; ändern Sie es mit `nvme format --lbaf=ID /dev/nvme0n1` — **destruktiv**; der Beitrag behandelt keine Datenerhaltung. NVIDIA hat dies nicht offiziell bestätigt. (Einstufung B, unbestätigt, [Thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**Boot hängt nach scheinbar erfolgreicher Installation** — *unbestätigt*: Mehrere Berichte über einen schwarzen Bildschirm oder blinkenden Cursor, nachdem der Installer 100 % erreicht. Ein Nutzer behob es nur über einen direkten Flash im Recovery-Modus; ein anderer führte es auf das obige 4K-Sektoren-Problem zurück. Keine bestätigte Grundursache. (Einstufung B, unbestätigt, [Thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe wird in der UEFI-Phase nicht erkannt (r39.2)** — Ein Laufwerk an PCIe C7 war in der UEFI-Boot-Phase unsichtbar, obwohl es unter R36.4 funktionierte; der Berichtende löste es, indem er die Standardkonfigurationen wiederherstellte und neu flashte. Mitarbeiter: „Beim NV-Devkit ist im Standard-BSP bereits alles korrekt konfiguriert. Je mehr Elemente Sie zu konfigurieren versuchen, desto wahrscheinlicher machen Sie etwas kaputt.“ (Einstufung B, [Thread 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)). Hinweis: Ab JetPack 7.2 gibt es keine SD-Karten-Images mehr — schreiben Sie das ISO auf einen USB-Stick und installieren Sie dann auf microSD oder NVMe. (Einstufung A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## Installer bricht bei „Step 9/13 Updating boot firmware“ ab (Board-Namenskonflikt)

*Unbestätigt.* Die Installation kann abbrechen mit:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Ursache: `/etc/nv_boot_control.conf` enthält eine veraltete COMPATIBLE_SPEC, die die Board-Liste des Bootloader-Pakets nicht abgleichen kann; der oem-config-/Benutzererstellungs-Schritt läuft dann nie — der „übersprungene Benutzername/Passwort“-Mechanismus in diesem Fall. Reproduktion auf einem gebooteten r39.2-System: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. NVIDIA hat dies nicht bestätigt. Auch auf einem Orin NX 16GB reproduziert und von einem Dritten am 2026-09-18 (subiquity `command_34 … returned non-zero exit status 100`); eine Variante wurde für SDK Manager 7.2.x beim Scheitern bei „Step 9“ berichtet. (Einstufung B, unbestätigt, [Thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Community-Problemumgehung, *unbestätigt*: chrooten Sie nach `/target`, erweitern Sie den Board-Glob-Zweig in `select_3767_payload` in `/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, führen Sie dann `rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall` aus, danach `dpkg --configure -a` und `apt-mark hold nvidia-l4t-bootloader`. NVIDIA hat keinen Fix für dieses Problem veröffentlicht; die obige Community-Problemumgehung bleibt unbestätigt. (Einstufung B)

## Jetson-IO-DTB-Konflikt bei ISO-geflashten Super-Geräten

Offizielles Problem **6236205** (in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) und [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) enthalten): `jetson-io.py` schlägt auf einem mit dem ISO geflashten Orin Nano Super fehl. Offizielle Problemumgehung: Finden Sie das passende DTB unter `/boot` mit einer `fdtget`-Schleife, die `/compatible` und `/model` vergleicht; kopieren Sie es als `kernel_<name>.dtb` nach `/boot/dtb/`; führen Sie dann `sudo /opt/nvidia/jetson-io/jetson-io.py` erneut aus. Mit anderen Methoden geflashte Geräte sind nicht betroffen. (Einstufung A)

## Ollama und GPU-Beschleunigung

Verlauf: Frühe Ollama-Builds fielen unter JetPack 7.2 auf die CPU zurück, weil Ollamas vorgebaute CUDA-Bibliotheken kein sm_87 enthielten (Compute-Capability der Orin-GPU: 8.7). Mitarbeiter zitierten das Log „skipping CUDA device — compute capability not in compiled architectures … device=Orin cc=870“ und sagten: „Das ist ein bekanntes Problem … Wir arbeiten direkt mit dem Ollama-Team zusammen, um nativen JP-7.2-Support hinzuzufügen.“ (Einstufung B, Mitarbeiter, [Thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Aktueller Stand: Das aktuelle Upstream-Ollama funktioniert. Mitarbeiter verifizierten auf JetPack 7.2.1 (2026-09-21): Installieren Sie mit `curl -fsSL https://ollama.com/install.sh | sh`, führen Sie ein Modell aus und prüfen Sie dann `ollama ps` — es sollte `100% GPU` anzeigen. Die Zeile „WARNING: Unsupported JetPack version detected“ ist eine harmlose Meldung; die ältere `override.conf`-Problemumgehung „wird nicht mehr benötigt“. (Einstufung B, Mitarbeiter, [Thread 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Fix für veraltete Builds: Wenn `find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` sowohl `cuda_v12`- als auch `cuda_v13`-Bäume zeigt, löschen Sie den alten — `sudo rm -rf /usr/local/lib/ollama/cuda_v12`. Das Log zeigte danach „load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7“. (Einstufung B, Mitarbeiter plus Nutzer, [Thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Hinweis zu 8 GB: Größere Modelle können weiterhin mit `cudaMalloc failed: out of memory … failed to allocate buffer for kv cache` fehlschlagen, selbst wenn `free -h` freien Speicher anzeigt — der GPU-Speicher wird geteilt. Verwenden Sie kleinere oder quantisierte Modelle. (Einstufung B, Community, [Thread 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)). Mehr dazu: [Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm).

## Python-Wheels für JetPack 7.2

Die Antwort der Mitarbeiter für JP 7.2 / CUDA 13.2: Verwenden Sie `https://pypi.jetson-ai-lab.io/sbsa/cu130`. (Einstufung B, Mitarbeiter, [Thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)). Einschränkung: Bei der Prüfung des Index-Stamms (2026-09-26) listete er `jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130` und `sbsa/dev` — kein sichtbarer `jp7`-Eintrag; Community-Threads nennen außerdem `https://pypi.jetson-ai-lab.io/jp7/cu132`, das in dieser Auflistung nicht sichtbar war. (Einstufung C). Mitarbeiter: „Downgrade: Ja, Sie können bei Bedarf über den SDK Manager zu JP 6.2.2 zurückflashen.“ (Einstufung B)

## Wi-Fi findet das Netzwerk nicht

Offizielle bekannte Wi-Fi-Probleme (in den [Notes zu r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): **Wi-Fi-6-GHz-Router mit MBSSID werden nicht unterstützt** (Problem **5226667**), und **der Wi-Fi-Scan kann in belebten Umgebungen APs verpassen** — führen Sie zur Puffer-Problemumgehung `wpa_cli set bss_max_count 500` aus (Problem **5426982**). (Einstufung A)

## Serielle Konsole (Headless-Debugging)

Verkabelung (Einstufung A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)): USB-auf-TTL-Serialkabel am Button-Header — RXD-Pin 3 zur TX-Ader des Adapters, TXD-Pin 4 zur RX-Ader, GND-Pin 7 zur Masseader. Öffnen Sie dann „Open a serial console on your PC“. Drücken Sie während des Boots wiederholt **Esc**, um ins UEFI zu gelangen. Für eine Headless-ISO-Installation drücken Sie Esc bei den Pre-Boot-Optionen, wählen **Boot Manager** und dann das USB-Laufwerk.

- NVIDIAs Seiten nennen keine Baudrate und kein Terminalprogramm — nur „Open a serial console on your PC“. (siehe *Was wir nicht bestätigen konnten*)
- Ohne DisplayPort-Display oder Debug-UART ist eine Headless-ISO-Installation nicht praktikabel — Mitarbeiter: „Sie müssten entweder den DP-Display-Ausgang oder das Debug-UART verwenden … wenn Sie also keins von beidem haben, ist es praktisch unmöglich.“ (Einstufung B, Mitarbeiter, [Thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Bei Headless-ISO-Installationen ist die UEFI-Konsole `/dev/ttyACM1` und wird mit Ausgabe überschwemmt, bis QSPI auf GA (38.2) aktualisiert ist; mit angeschlossenem Display wurde dies nicht beobachtet ([Problem 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)). (Einstufung A)
- Nach dem erneuten Einstecken des Debug-Kabels kann minicom unzugänglich werden — starten Sie minicom neu ([Problem 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf), in beiden Releases). (Einstufung A)

## Docker-Berechtigungsfehler

Offizieller Fix (Einstufung A, [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — starten Sie das Terminal neu, falls die Gruppenänderung nicht wirksam wird:

```
sudo usermod -aG docker $USER
newgrp docker
```

## Hilfe erhalten

- **NVIDIA Jetson Developer Forums** (forums.developer.nvidia.com) — offizielle Community, aufgeführt auf NVIDIAs Seite „Additional Docs“. Suchen Sie zuerst und posten Sie dann mit Ihrer Ausgabe von `cat /etc/nv_tegra_release`; bei Leistungs- oder Firmware-Problemen geben Sie zusätzlich `/etc/nv_boot_control.conf` und `sudo /usr/sbin/nvpmodel -q --verbose` an. (Einstufung A für die Auflistung)
- **Achtung:** Einige mit „NVIDIA-STAFF“ gekennzeichnete Antworten sind automatisch generierte LLM-Antworten — sie beginnen mit einer Kennzeichnung wie „— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —“ oder „*** Please note that this reply is generated by LLM automatically ***“. Behandeln Sie sie als nicht maßgeblich. (Einstufung B, [Thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [Thread 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com für technischen Support sowie für Bestell-, Garantie- und RMA-Angelegenheiten (geben Sie Ihre Bestellnummer an). Vertrieb: sales@juxitech.com · Produktfragen: pe@juxitech.com.

## Noch offen bei NVIDIA

NVIDIAs Release Notes listen ein offenes Problem für dieses Kit, das einen unerwarteten Reset verursachen kann: **DCE-Abbrüche während SC7-Suspend/Resume lösen einen Watchdog-Reset aus** (Problem 6235055, offen in r39.2 und r39.2.1). Wenn Sie das Kit nie in den Suspend versetzen, betrifft Sie das nicht; falls doch, verfolgen Sie es upstream, statt nach einer Konfigurationslösung zu suchen. (Einstufung A, [Release Notes zu r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## Was wir nicht bestätigen konnten

Offene Fragen in unseren Quellen:

- Die Baudrate und das Terminalprogramm der seriellen Konsole — NVIDIA sagt nur „Open a serial console on your PC“.
- Ob der Board-Namenskonflikt (`command_34` Exit 100) in r39.2.1 behoben ist; keine NVIDIA-Antwort in den Threads; letzte Community-Reproduktion am 2026-09-18.
- Ob eine 7.2.1-ISO-Installation die Super-Modi auf einem Gerät wiederherstellt, das ursprünglich mit dem 7.2-ISO geflasht wurde — die Notes sagen nur, dass 7.2.1 standardmäßig die Super-Konfiguration flasht.
- Ob die 4K-Sektoren-NVMe-Einschränkung real und offiziell dokumentiert ist — nur ein Community-Bericht, nicht in den Release Notes oder im Benutzerhandbuch.
- Kein offizielles Verfahren zum Neu-Stempeln einer veralteten COMPATIBLE_SPEC/TNSPEC; eine Forenfrage an NVIDIA blieb unbeantwortet.
- Welcher Wheel-Index für JP 7.2 kanonisch ist: `/sbsa/cu130` (Mitarbeiter) oder `/jp7/cu132` (Community-Zitat).
- Die Anforderungen an den Flash-Host widersprechen sich über die offiziellen Quellen hinweg: Die Release Notes nennen „Ubuntu 24.04 und 22.04“ (ohne Architektur); die BSP-Seite nennt x86_64 für den SDK Manager; Nutzer berichten zudem, dass der Windows-SDK-Manager 7.2.1 erfolgreich flasht.
- Ob die Community-Bearbeitung von `nv_boot_control.conf` sicher ist — NVIDIA hat den In-Place-Weg weder befürwortet noch einen Fix dafür geliefert.
- Ob `sudo nvpmodel -m 2` auf einer Nicht-Super-Installation Neustarts überdauern kann (Community-Berichte sagen nein).
- EXT4-/NVMe-Korruptionsberichte (Journal-Wiederherstellung fehlgeschlagen, I/O-Tag-Timeout, „Attempting recovery boot“) — ungelöst; der Thread wurde unbeantwortet geschlossen.
- Ollama über Build aus dem Quellcode oder Container — keiner der Wege ist maßgeblich; nur der aktuelle Upstream-Installer hat eine NVIDIA-Mitarbeiter-Bestätigung auf 7.2.1.
- Die Behauptung zu den Builds „7.2.1-b49 vs b184“ und fehlende „Agent Skills“ — unverifiziert, plausibel verwechselt; das What's New von r39.2.1 listet tatsächlich „Agent skills for video pipelines“.

## Quellen

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — geprüft am 2026-09-26
- Release Notes: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — geprüft am 2026-09-26
- NVIDIA-Entwicklerforum-Threads (geprüft am 2026-09-26): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Status: geprüft am 2026-10-11. Als unbestätigt gekennzeichnete
Punkte stammen aus Community-Forum-Berichten und können sich ändern. Diese Seite ist
ausschließlich dokumentationsgeprüft — Juxi hat dieses Kit nicht auf Hardware getestet.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
