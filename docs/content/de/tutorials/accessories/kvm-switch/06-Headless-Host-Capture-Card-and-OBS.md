---
title: "06 · Host ohne Monitor (Capture-Card + OBS)"
description: "Einem „Monitor-losen Entwicklungsboard / Mainboard\" eine Tastatur und Maus geben — ohne einen eigenen Monitor bereitzustellen: Das Bild läuft über eine Captu…"
---

# 06 · Host ohne Monitor (Capture-Card + OBS)

> [← Zurück zur Übersicht](/de/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Gilt für: JUXI Technology KVM&HUB&TTL

Einem „Monitor-losen Entwicklungsboard / Mainboard" eine Tastatur und Maus geben — **ohne einen eigenen Monitor bereitzustellen**: Das Bild läuft über eine Capture-Card in den Computer, Tastatur/Maus laufen über den KVM-Umschalter.

## Funktionsweise

```
Entwicklungsboard (ohne Monitor) ──Video──→ Capture-Card ──USB──→ Ihr Computer (Bild im OBS-Fenster)
Entwicklungsboard (ohne Monitor) ──Tastatur/Maus──→ ←── KVM-Umschalter ──→ Ihr Computer (dieselbe Tastatur/Maus)
```

## Schritte

**① Video anschließen** (Videoausgang des Hosts in eine **4K-HDMI-Capture-Card** führen, deren USB-Seite an Ihren Computer):

| Host-Ausgang | Verkabelung |
|---|---|
| HDMI | HDMI-Kabel → Capture-Card |
| Micro HDMI (Raspberry Pi usw.) | Micro-HDMI-Adapter → HDMI-Kabel → Capture-Card |
| DP | DP-HDMI-Adapter → HDMI-Kabel → Capture-Card |

**② Tastatur/Maus anschließen**: Tastatur/Maus (oder Funkempfänger) an den USB-A-Anschluss dieses Produkts stecken, dann die Taste drücken, um **auf das Entwicklungsboard umzuschalten**;

**③ Bild ansehen und bedienen**: Am Computer in **OBS** oder **PotPlayer** ein „Videoaufnahmegerät" hinzufügen — Bild des Entwicklungsboards ansehen und mit der Tastatur bedienen.

(Abbildung: Tutorial-Material 06 – Entwicklungsboard + Capture-Card, 07 – Verkabelung der Capture-Card, 08 – OBS-Anleitung, 09 – PotPlayer-Anleitung)

## Tipps

- Die Capture-Card möglichst **direkt am Computer** anschließen (nicht über die USB-Anschlüsse des KVM), um ein stabiles Bild zu gewährleisten;
- Nach dem Wegschalten von Tastatur/Maus reagiert das Entwicklungsboard nicht mehr darauf — ein Tastendruck schaltet zurück.

<RelatedProducts slugs="kvm-switch" />
