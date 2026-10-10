---
title: Fehlerbehebung
sidebar_label: Fehlerbehebung
slug: /support/troubleshooting
description: >-
  Symptomorientierte Fehlerbehebung für das Jetson AGX Orin Developer Kit —
  Start und Display, Stromversorgung, Flashen und bekannte Probleme, basierend
  auf NVIDIAs offizieller Dokumentation.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Fehlerbehebung

Probleme sind nach Symptom gruppiert — finden Sie Ihr Symptom und arbeiten Sie
dann die Prüfungen der Reihe nach durch. Alles hier basiert auf NVIDIAs
offizieller Dokumentation (Quellen unten). Für alles, was hier nicht behandelt
wird, siehe *Hilfe erhalten* am Ende.

## Das Kit lässt sich nicht einschalten

1. Das mitgelieferte USB-C-Netzteil muss an den **USB-C-Anschluss über der DC-Buchse** (J24) angeschlossen werden — nicht an den Anschluss neben dem 40-Pin-Header.
2. Das Kit schaltet sich automatisch ein, sobald die Stromversorgung angeschlossen ist; andernfalls drücken Sie den **Einschaltknopf**.
3. Wenn Sie ein eigenes Netzteil über die Hohlbuchse (J41) verwenden: 5,5 mm Außendurchmesser, 2,5 mm Innendurchmesser, **Pluspol innen**.

## Keine Bildausgabe / Bildschirm bleibt schwarz

- **DisplayPort ist die einzige Bildausgabe.** Es gibt keinen HDMI-Anschluss und kein DisplayPort über USB-C. Für einen HDMI-Monitor verwenden Sie einen **aktiven** DP→HDMI-Adapter oder ein entsprechendes Kabel.
- Der erste Start kann **bis zu einer Minute** dauern, bevor der Bildschirm erscheint.
- Wenn Sie einen **KVM-Switch** verwenden, schließen Sie den Monitor stattdessen direkt an das Kit an — KVM-Geräte sind eine bekannte Ursache für Probleme mit schwarzem Bildschirm, sowohl beim normalen Start als auch bei der ISO-Installation (NVIDIA führt dies im Setup-Leitfaden auf).
- Start mit einer problematischen Leistungsmodus-Einstellung? Siehe *Systemabsturz beim Neustart mit angeschlossenem Display* unten — versuchen Sie einen Start **ohne** angeschlossenen Monitor und schließen Sie ihn nach dem Start wieder an.

## Nach der ISO-Installation startet das Kit das alte System

Entfernen Sie den Installations-USB-Stick nach der Installation. Wenn der Stick
eingesteckt bleibt, bootet das Kit möglicherweise erneut von ihm statt vom frisch
installierten System. (Offizielle Empfehlung.)

## Flashen — Probleme mit dem Jetson-ISO

- **Das Kit bootet nicht vom USB-Stick:** Öffnen Sie während des Starts den **UEFI-Boot-Manager** und wählen Sie das USB-Laufwerk aus.
- **Eine QSPI-Firmware-Aufforderung erscheint:** Drücken Sie **`Y`**. Dieses Capsule-Update ist für die Kompatibilität erforderlich und läuft zweimal. Wenn Sie die Aufforderung verpassen oder unsicher sind, ob sie abgeschlossen wurde, **starten Sie die Installation neu** und bestätigen Sie sie. Das Überspringen dieses Schritts führt zu Installationsproblemen (bekanntes Problem 6266271 aus den NVIDIA-Release-Notes).
- **Mein Kit ist älter als L4T r35.5:** Der ISO-Weg erfordert ein installiertes BSP ab r35.5. Bringen Sie das Kit zuerst mit den Host-PC-Methoden (SDK Manager oder `flash.sh`) auf r35.5+ — siehe [Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates).

## Flashen — Probleme mit dem SDK Manager

- **Gerät wird nicht erkannt:** Prüfen Sie in dieser Reihenfolge —
  1. Das Kabel ist in den **USB-C-Anschluss neben dem 40-Pin-Header** (Port 10 / J40) eingesteckt, nicht in den USB-C-Anschluss für die Stromversorgung;
  2. Das Kit wurde in den **Force-Recovery-Modus** versetzt: Halten Sie die **mittlere Force-Recovery-Taste** gedrückt, während Sie den Netzstecker einstecken;
  3. Der Host erfüllt die Anforderungen: Ubuntu Desktop 20.04/22.04 (x86_64), 8 GB RAM, 25 GB freier Speicherplatz, angemeldetes NVIDIA Developer Program-Konto. (Die Release Notes zu L4T 39.2 nennen für das Flashen die Host-Distributionen 24.04/22.04 — prüfen Sie die Seite mit den Systemanforderungen des SDK Manager für die aktuelle Liste.)
- **Ich möchte auf NVMe / microSD / USB-Laufwerk flashen:** Der ISO-Installer deckt eMMC und NVMe ab; andere Ziele erfordern den SDK Manager oder das Flash-Skript (Host-PC).

## Systemabsturz beim Neustart mit angeschlossenem Display (AGX Orin 64GB, 15W-Modus)

Bekanntes Problem **6236259** aus den NVIDIA-Release-Notes: Auf AGX-Orin-Plattformen
kann das Absenken der EMC-Frequenz unter das Maximum (was in Modi mit niedriger
Leistungsaufnahme wie 15W geschieht) während der systemd-Initialisierung das
System beim Neustart zum Absturz bringen — besonders mit angeschlossenem Display.
Problemumgehung laut NVIDIA:

1. Wechseln Sie vor dem Neustart in den **MAXN**-Leistungsmodus (stellt EMC auf Fmax zurück).
2. Stellen Sie nach dem Neustart des Systems den gewünschten Leistungsmodus ein.
3. Falls das System im problematischen Modus neu gestartet wurde: Trennen Sie das Display, starten Sie das System und schließen Sie das Display nach der Initialisierung wieder an.

## Netzwerk & Wi-Fi (Hinweise nach dem Flashen)

- **Keine Verbindung zu 6 GHz / WPA3 direkt nach dem Flashen:** Setzen Sie das Gerät zurück und versuchen Sie es erneut (in L4T 39.2.0 als behoben aufgeführt; der Hinweis zum Zurücksetzen gilt weiterhin für Einheiten, die mit älteren Images geflasht wurden).
- **Einige Wi-Fi-Zugangspunkte fehlen beim Scan (Umgebungen mit vielen Wi-Fi-Netzen):** Vergrößern Sie den Scan-Puffer — `wpa_cli set bss_max_count 500` (aus dem Abschnitt zu behobenen Problemen der Release Notes).

## Weitere bekannte Probleme

Bevor Sie tief in die Fehlersuche einsteigen, prüfen Sie den Abschnitt
**Known Issues** der aktuellen Release Notes — er behandelt allgemeine
System-, Kamera-, Multimedia-, Grafik-, Konnektivitäts-, Display- und
Compute-Stack-Themen:

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Hilfe erhalten

- **[NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — offizielle Community; suchen Sie vor dem Posten und geben Sie die Ausgabe von `cat /etc/nv_tegra_release` mit an.
- **Juxi Technology Support** — **support@juxitech.com** für technischen Support sowie für Bestell-, Garantie- und RMA-Angelegenheiten. Um den Vorgang zu beschleunigen, geben Sie Ihre Bestellnummer und die Ausgabe von `cat /etc/nv_tegra_release` an. (Vertrieb: sales@juxitech.com · Produktfragen: pe@juxitech.com)

## Quellen

- [Schnellstart](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP-Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Hardware-Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit User Guide (geprüft am 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (geprüft am 2026-09-23)

*Status: geprüft am 2026-10-11. Von Kunden gemeldetes
hardwarespezifisches Verhalten kann abweichen; diese Seite wird aktualisiert,
sobald Rückmeldungen aus der Praxis eingehen.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
