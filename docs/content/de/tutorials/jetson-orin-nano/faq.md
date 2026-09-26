---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Häufig gestellte Fragen zum NVIDIA Jetson Orin Nano Super Developer Kit
  (8GB) — Speicher, erste Einrichtung, Firmware, Leistungsmodi, KI-Workloads
  und Support.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# FAQ

## Bevor Sie beginnen

**Was ist im Lieferumfang enthalten?**
Das Jetson Orin Nano Developer Kit, ein 19-V-Netzteil sowie eine Schnellstart-
und Support-Karte. **Im NVIDIA-Karton ist kein Speicher enthalten**: Die
microSD-Karte bzw. NVMe-SSD, den USB-Stick für den Installer sowie Monitor und
Tastatur stellen Sie selbst bereit — das Juxi-Shop-Bundle für dieses Kit enthält
jedoch zusätzlich eine 64-GB-microSD-Karte (laut Shop-Eintrag). Siehe
[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start).

**Muss ich Speicher kaufen?**
Ja — es sei denn, Sie haben das Juxi-Shop-Bundle gekauft, das bereits eine
64-GB-microSD-Karte enthält; sie deckt den Bedarf an Zielspeicher ab, kaufen
Sie also nur dann eine NVMe-SSD, wenn Sie mehr Kapazität möchten. (Die
mitgelieferte Karte wird leer geliefert, nicht vorab bespielt — Sie
installieren das System mit dem Jetson ISO darauf.) NVIDIA schreibt:
„Das Jetson Orin Nano Developer Kit enthält keinen Wechselspeicher im Karton;
wählen Sie daher vor Beginn der Einrichtung entweder eine microSD-Karte oder
eine NVMe-SSD.“ Kaufen Sie eine microSD-Karte mit 64GB UHS-1 oder größer
(NVIDIAs Empfehlung), wenn Sie den nackten NVIDIA-Karton erhalten haben, oder
eine PCIe-NVMe-SSD für einen der M.2-Key-M-Slots der Trägerplatine. Das Kit
hat kein eMMC: Ihre Karte bzw. SSD wird zum Hauptspeicher des Systems. Siehe
[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start) und
[Schnittstellen & Hardware-Layout](/de/tutorials/jetson-orin-nano/interfaces).

**Kann ich weiterhin ein SD-Karten-Image flashen, wie bei früheren JetPack-Releases?**
Nein. Ab JetPack 7.2 werden SD-Karten-Images nicht mehr unterstützt. NVIDIAs
Anweisung: „Flashen Sie das Jetson ISO nicht auf eine microSD-Karte —
schreiben Sie es auf einen USB-Stick und installieren Sie damit Jetson Linux
auf Ihre microSD-Karte oder NVMe-SSD.“ Die microSD-Karte ist weiterhin ein
gültiges Installationsziel; sie ist nur nicht mehr das Medium, auf das Sie das
Image schreiben. Der ISO-USB-Stick ist ein Installer, kein Live-USB — er kann
keinen Desktop ausführen, sondern nur das System installieren. Siehe
[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates) und
[Migration von JetPack 6.x](/de/tutorials/jetson-orin-nano/jetpack-6-to-7).

**Was genau brauche ich vor dem Start?**
Sie benötigen:

- Das Kit und das mitgelieferte 19-V-Netzteil.
- Einen Laptop oder PC (Windows, Mac oder Linux) mit mindestens 25 GB freiem
  Speicher.
- Einen USB-Stick mit 16 GB oder mehr für das Installer-Image.
- Zielspeicher: eine microSD-Karte (64 GB UHS-1 oder größer empfohlen)
  und/oder eine NVMe-SSD — das Juxi-Shop-Bundle enthält die 64-GB-microSD-Karte
  bereits.
- Einen DisplayPort-Monitor sowie USB-Tastatur und -Maus oder ein
  USB-auf-TTL-Serialkabel für eine Headless-Einrichtung.

NVIDIAs Anleitung verwendet Balena Etcher, um das ISO auf den USB-Stick zu
schreiben — die Datei einfach auf den Stick zu kopieren reicht nicht. Schritt
für Schritt: [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start).

**Brauche ich einen Ubuntu-PC?**
Nein, nicht für den empfohlenen Weg. Die Jetson-ISO-Installation läuft auf dem
Kit selbst; Ihr PC schreibt das ISO nur auf einen USB-Stick, und dafür
funktionieren Windows, Mac und Linux gleichermaßen. Ein Ubuntu-x86_64-Host-PC
ist nur für die alternativen Methoden nötig — SDK Manager oder das
Flash-Skript —, zum Beispiel wenn Sie ein Kit mit der Super-Konfiguration neu
flashen möchten. Hinweis: Die SDK-Manager-Seite dokumentiert
Ubuntu-20.04/22.04-x86_64-Hosts, während NVIDIA-Mitarbeiter auch vom
erfolgreichen Flashen unter Windows berichten. Siehe
[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates).

**Wo befindet sich der microSD-Slot?**
Er befindet sich auf der Unterseite des Jetson-Orin-Nano-Moduls, nicht an der
Kante der Trägerplatine. Legen Sie die Karte ein, bevor Sie den ISO-Installer
booten; der Installer bietet nur bereits installierte Speichermedien an. Um
die Karte später zu wechseln: Schalten Sie das Kit aus, legen Sie die neue
Karte ein und führen Sie den JetPack-7.2.1-ISO-Installer mit eingelegter Karte
erneut aus — JetPack 7.2 und später haben kein Karten-Image zum Schreiben
mehr. Siehe [Schnittstellen & Hardware-Layout](/de/tutorials/jetson-orin-nano/interfaces)
und [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start).

## Einrichtung

**Mein Kit ist neu — warum sagt die Anleitung, ich soll zuerst die Firmware aktualisieren?**
JetPack 7.2 und spätere Installationen erfordern UEFI/QSPI-Firmware der
JetPack-6.x-Generation auf dem Kit — Version 36.x oder neuer. Kits, die mit
älterer Werksfirmware ausgeliefert wurden, müssen NVIDIAs „JetPack 6.x Update
Path“ abschließen, bevor das JetPack-7.2.1-ISO booten kann. So prüfen Sie die
Version: Schalten Sie das Kit mit angeschlossenem Monitor ein und drücken Sie
beim Boot-Splash wiederholt Esc; das UEFI-Menü zeigt die Firmware-Version oben
an. Zeigt sie 36.x oder neuer, fahren Sie fort; ist sie älter als 36.0, führen
Sie zuerst den Update-Pfad aus. Siehe
[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start),
[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates) und
das [Glossar](/de/tutorials/jetson-orin-nano/glossary) für Begriffe wie QSPI
und Capsule-Update.

**Wie lange dauert die Einrichtung?**
NVIDIA veröffentlicht keine Gesamtdauer für die Einrichtung. Die offiziellen
Anweisungen sagen, dass mehrere Minuten lang weißer Text über den Bildschirm
scrollen kann und Sie warten sollten, bis der Installer fertig ist und wie
aufgefordert neu startet. Nutzerberichte reichen von etwa 15 Minuten bis etwa
zwei Stunden für eine microSD-Karten-Installation (Nutzerberichte,
unbestätigt); der erste Start fügt dann die Ubuntu-Einrichtungsbildschirme
hinzu (Sprache, Netzwerk, Benutzername). Siehe
[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start).

**Was, wenn der Installer die Benutzername-/Passwort-Bildschirme überspringt?**
Das entspricht einem bekannten Bericht: Die QSPI-Capsule-Aufforderung ist
abgelaufen. Der Installer fordert Sie auf, ein Firmware-Update (QSPI) zu
bestätigen, und wartet nur 30 Sekunden — wird die Aufforderung verpasst,
können spätere Schritte fehlschlagen, und die Sprach-, Netzwerk- und
Benutzername-Bildschirme erscheinen möglicherweise nie; der nächste Start kann
dann bei einem schwarzen Bildschirm mit Cursor hängen bleiben. Die Lösung aus
der offiziellen Anleitung: Starten Sie die Installation neu und drücken Sie Y,
wenn die Capsule-Aufforderung erscheint. Manche Nutzer haben vor dem erneuten
Versuch auch übrig gebliebene Partitionen bereinigt oder stattdessen mit dem
SDK Manager installiert (Nutzerberichte; NVIDIA-Mitarbeiter haben den Thread
zur Kenntnis genommen). Siehe
[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

> **Wichtig** Wenn der Installer die QSPI-Capsule-Aufforderung anzeigt, drücken
> Sie **Y** innerhalb von 30 Sekunden. NVIDIA nennt dies „den am häufigsten
> übersehenen Schritt“.

**Wie bekomme ich eine serielle Konsole?**
Verbinden Sie ein USB-auf-TTL-Serialkabel mit dem Button-Header: RXD-Pin 3
verbindet sich mit der TX-Ader des Adapters, TXD-Pin 4 mit der RX-Ader und
GND-Pin 7 mit der Masseader des Adapters. Öffnen Sie dann eine serielle
Konsole auf Ihrem PC, schalten Sie das Kit ein und drücken Sie während des
Pre-Boot-Bildschirms Esc, um UEFI / Boot Manager zu erreichen — so können Sie
die gesamte ISO-Installation durchführen. Eine ehrliche Lücke: NVIDIAs Seiten
sagen „open a serial console on your PC“, nennen aber keine Baudrate und kein
Terminalprogramm. Wenn das Kit im Gerätemodus über USB-C mit einem PC
verbunden ist, erscheint außerdem ein „USB Serial device for serial terminal
access“. Siehe [Schnittstellen & Hardware-Layout](/de/tutorials/jetson-orin-nano/interfaces)
und [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

## Leistungsaufnahme und Leistung

**Warum gibt es keine 25W-/MAXN-SUPER-Option?**
Ihr Kit wurde mit der Nicht-Super-Boot-Konfiguration geflasht, daher erscheinen
nur die Modi 7W und 15W. Dies wurde als JetPack-7.2-ISO-Problem 6279443
dokumentiert: ISO-Installationen behielten das Vor-Update-Profil, statt auf
„Super“ umzuschalten. JetPack 7.2.1 behebt dies für neue Installationen — das
ISO „flasht das Jetson Orin Nano Developer Kit jetzt standardmäßig mit der
Flash-Konfiguration für den Super-Modus“; NVIDIA sagt nicht, ob eine
7.2.1-Neuinstallation ein Kit mit 7.2.0-ISO umstellt. Prüfen Sie
`/etc/nv_boot_control.conf`: Eine Super-Konfiguration zeigt ein Suffix
`-super`. Um eine bestehende 7.2-Installation zu reparieren, flashen Sie von
einem Ubuntu-Host aus (SDK Manager oder das Flash-Skript) mit der
Super-Konfiguration neu; das Menü **Power Mode** bietet dann 15W, 25W
(Standard) und MAXN SUPER. Siehe
[System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system),
[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting) und
[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates).

> **Juxi-Hinweis:** Es gibt eine In-Place-Lösung aus der Community (bearbeiten
> Sie `/etc/nv_boot_control.conf`, konfigurieren Sie den Bootloader neu,
> entfernen Sie `/etc/nvpmodel.conf`, starten Sie neu). Mehrere Nutzer
> berichten von Erfolg, doch NVIDIA hat sie nicht befürwortet, und ein Nutzer
> berichtete von einer Boot-Schleife.

## KI-Workloads

**Wie große Modelle laufen auf 8 GB?**
Die 8 GB LPDDR5 sind Unified Memory, den sich CPU, GPU und Betriebssystem
teilen — etwa 7,6 GB sind nach Firmware- und Kernel-Reservierungen nutzbar.
NVIDIAs veröffentlichte Empfehlung: Mit 4-Bit-Quantisierung und
speichereffizienten Runtimes passen LLMs bis etwa 10B Parameter und VLMs bis
etwa 4B Parameter. Die offiziellen Orin-Nano-8GB-Benchmarks von TensorRT
Edge-LLM decken Modelle bis 2B ab, und das ist die größte Modellklasse, die
NVIDIA auf diesem Kit benchmarkt. Ein Modell kann beim Laden fehlschlagen,
selbst wenn die Datei zu passen scheint, weil auch der KV-Cache Speicher
benötigt; auf einem 8GB-Kit ließen sich GGUF-Dateien mit 7,4 GB und 16 GB nicht
laden (Nutzerberichte). Siehe
[Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm) und
[Speichereffizienz](/de/tutorials/jetson-orin-nano/memory-efficiency).

## Support und Service

**Welche Support-Wege gibt es?**
Beginnen Sie mit NVIDIAs offizieller [Troubleshooting-Seite](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html),
die die fünf häufigen Einrichtungsprobleme abdeckt: Das ISO bootet nicht,
keine Bildausgabe, der Installer zeigt keinen Zielspeicher an, ein
Firmware-Update ist erforderlich und ein Docker-Berechtigungsfehler. Für
Plattformfragen nutzen Sie die NVIDIA-Jetson-Entwicklerforen, aufgeführt auf
der offiziellen Seite [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html);
suchen Sie vor dem Posten und geben Sie die Ausgabe von
`cat /etc/nv_tegra_release` mit an. Kontakte von Juxi Technology:

- Technischer Support: **support@juxitech.com**
- Bestellung, Garantie und RMA: **support@juxitech.com** (Bestellnummer angeben)
- Vertrieb und Angebote: **sales@juxitech.com**
- Produktfragen (Auswahl, Kompatibilität): **pe@juxitech.com**

Offizielle Downloads und Referenzlinks:
[Downloads](/de/tutorials/jetson-orin-nano/downloads).

> **Juxi-Hinweis:** Einige als NVIDIA-Mitarbeiter gekennzeichnete
> Forenantworten sind automatisch generierte KI-Antworten (sie beginnen mit
> „This is an automated AI response“). Behandeln Sie diese als nicht
> maßgeblich und bevorzugen Sie die offizielle Dokumentation.

## Quellen

- Jetson Orin Nano Developer Kit User Guide — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (geprüft am 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- Jetson Linux Release Notes — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (geprüft am 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (geprüft am 2026-09-26)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (geprüft am 2026-09-26)
- NVIDIA developer forums — [Thread: Boot-Hänger / übersprungenes Benutzername-Setup](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [Thread: 25W / MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (geprüft am 2026-09-26)
- [Shop-Eintrag von Juxi Technology — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (geprüft am 2026-09-26)

*Status: Entwurf, Überprüfung durch cheny ausstehend.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird
von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
