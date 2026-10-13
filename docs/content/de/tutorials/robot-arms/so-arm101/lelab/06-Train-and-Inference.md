---
title: "6 · Trainieren und Inferenz ausführen"
description: "Training und Inferenz mit LeLab: Datensatz und Policy-Typ wählen (zuerst ACT), lokal oder als Hugging-Face-Cloud-Job trainieren und anschließend auf dem Follower-Arm ausführen."
---

# 6 · Trainieren und Inferenz ausführen

> **Zurück:** [05 Ein Dataset aufzeichnen](05-Record-Dataset.md)
> **Weiter:** [07 Fehlerbehebung](07-Troubleshooting.md)

Das Training verwandelt das Dataset in eine **Policy** — ein Modell, das Kamerabilder auf Gelenkpositionen abbildet. Die Inferenz führt diese Policy auf dem follower-Arm aus.

## Trainieren

Öffnen Sie den Tab **Training** und wählen Sie:

| Auswahl | Hinweise |
|---|---|
| **Dataset** | Ein lokales Dataset oder eines vom Hub |
| **Policy-Typ** | **ACT** ist die übliche erste Wahl für einen einzelnen Arm. Diffusion Policy, SmolVLA und die π₀-Familie sind ebenfalls verfügbar |
| **Ausführungsort** | Dieser Rechner oder ein Hugging-Face-Cloud-Job |
| **Trainingsdauer** | Anzahl der Schritte. Beobachten Sie den Loss, statt anzunehmen, mehr sei besser |

Der Tab streamt das Trainingslog und zeigt Checkpoints, während sie geschrieben werden.

### Lokal oder Cloud

| | Lokal | Hugging-Face-Cloud-Job |
|---|---|---|
| Benötigt | Eine GPU auf diesem Rechner | Ein Hugging-Face-Konto mit Zugriff |
| Geschwindigkeit | Hängt von Ihrer GPU ab | Feste Maschine, je Job gewählt |
| Am besten für | Kleine Datasets, Experimentieren | Längere Läufe |

Die Cloud-Option ist der Grund, warum ein Laptop für den Rest des Workflows ausreicht: lokal aufzeichnen, remote trainieren.

### Policy-Extras

Manche Policy-Typen benötigen Abhängigkeiten, die LeLab nicht standardmäßig installiert. Wählen Sie einen aus, werden Sie aufgefordert, sie zu installieren — bestätigen Sie und warten Sie, bis die Installation im Hintergrund abgeschlossen ist, bevor Sie den Job starten. Derselbe Mechanismus deckt optionale Trainings-Extras ab.

## Checkpoints

Das Training schreibt regelmäßig Checkpoints, nicht nur am Ende, sodass ein unterbrochener Lauf trotzdem ein brauchbares Modell hinterlässt. Jeder Checkpoint-Name trägt seine Schrittnummer. Probieren Sie einen früheren, wenn der Loss zu steigen begann.

## Inferenz

Öffnen Sie den Tab **Inference**:

1. Bestätigen Sie, dass beide Arme verbunden und kalibriert sind.
2. Wählen Sie die **Policy** — einen lokalen Checkpoint oder ein Modell vom Hub.
3. Bestätigen Sie die **Kameras** und ihre **Rotation**.
4. Starten Sie die Inferenz und räumen Sie den Arbeitsbereich.

### Kamerarotation und Zuordnung

**Verwenden Sie dieselbe Rotation wie bei der Aufzeichnung.** Das ist der häufigste Grund, warum eine gut trainierte Policy auf dem echten Roboter nichts Nützliches tut, und nichts warnt Sie: 0° und 180° erzeugen identische Bildmaße.

Dasselbe gilt für die **Zuordnung** der Kamera. Wenn die Kamera, die bei der Aufzeichnung `wrist` hieß, jetzt eine andere physische Kamera ist, sieht die Policy das falsche Bild.

Wenn all das stimmt und der Arm trotzdem versagt, sehen Sie sich das Dataset erneut an — siehe [Seite 5](05-Record-Dataset.md).

### Eingreifen

Stoppen Sie die Inferenz, bevor Sie zum Arm greifen. Eine Korrektur, die Sie von Hand vornehmen, ist kein Trainingssignal, es sei denn, Sie zeichnen eine neue Episode auf und trainieren erneut.

## Replay

Replay führt eine aufgezeichnete Episode erneut auf dem follower-Arm aus. Es spielt die aufgezeichneten Gelenkpositionen ab, daher sieht es korrekt aus, selbst wenn die Policy schlecht ist — es prüft die Hardware und das Dataset, nicht die Policy. Verwenden Sie die Inferenz, um zu sehen, was die Policy tut.

---

> **Weiter:** [07 Fehlerbehebung](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
