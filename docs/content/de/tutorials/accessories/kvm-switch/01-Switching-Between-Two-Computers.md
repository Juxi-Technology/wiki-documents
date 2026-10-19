---
title: "01 · Umschalten zwischen zwei Computern (Taste & IR-Fernbedienung)"
description: "Eine Tastatur und Maus (sowie Peripherie an den USB-A-Anschlüssen) wechseln zwischen zwei Computern; es ist immer nur ein Computer verbunden."
---

# 01 · Umschalten zwischen zwei Computern (Taste & IR-Fernbedienung)

> [← Zurück zur Übersicht](/de/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Gilt für: JUXI Technology KVM&HUB&TTL

Eine Tastatur und Maus (sowie Peripherie an den USB-A-Anschlüssen) wechseln zwischen **zwei Computern**; es ist immer nur ein Computer verbunden.

## Umschaltmethoden

### ① Taste
Drücken Sie die **Umschalttaste** in der Gerätemitte, um PC1 ⇄ PC2 zu tauschen. Die **PC1/PC2-LED** auf der jeweiligen Seite leuchtet und zeigt den aktuell verbundenen Computer.

### ② IR-Fernbedienung
Richten Sie die **Infrarot-Fernbedienung** auf den IR-Empfänger (oben links) und drücken Sie die Umschalttaste der Fernbedienung.
(Ob eine Fernbedienung enthalten ist, hängt vom gekauften Paket ab.)

(Abbildung: Tutorial-Material 05 – Umschalten per Taste und Infrarot)

## Zwei Betriebsformen

| Form | Verkabelung | Hinweis |
|---|---|---|
| Beide Computer haben einen Monitor | Jeder an seinen eigenen Monitor | Tastatur/Maus nach dem Umschalten direkt nutzbar (siehe Schnellstart in 00) |
| Ein Computer ohne Monitor (Entwicklungsboard usw.) | Der andere mit Monitor + Capture-Card-Lösung | Siehe [06 - Host ohne Monitor (Capture-Card + OBS)](/de/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Normales Verhalten beim Umschalten

- Geräte an den USB-A-Anschlüssen verschwinden kurz vom „aktuellen" Computer und erscheinen am anderen (Dongles/Drucker benötigen ggf. einige Sekunden zur Neu-Erkennung);
- **Der drahtlose Bluetooth-Kanal ist vom Umschalten nicht betroffen** (Verbindung bleibt bestehen). Der serielle Anschluss am PC trennt beim Umschalten kurz und verbindet sich nach dem Zurückschalten automatisch wieder (siehe [03](/de/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/de/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Fehlersuche

**Keine Reaktion beim Drücken?** Prüfen Sie die PC1/PC2-LED für den aktuellen Kanal; stellen Sie sicher, dass der Zielcomputer per Type-C verbunden und eingeschaltet ist; drücken Sie erneut, um zum ursprünglichen Computer zurückzukehren.

<RelatedProducts slugs="kvm-switch" />
