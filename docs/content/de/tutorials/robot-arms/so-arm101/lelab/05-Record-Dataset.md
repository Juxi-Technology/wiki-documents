---
title: "5 · Ein Dataset aufzeichnen"
description: "Datensatz in LeLab aufzeichnen: Auf der Recording-Seite repo_id, Aufgabenbeschreibung, Episodenzahl und Kameras festlegen und die Demonstrationen als LeRobotDataset aufnehmen."
---

# 5 · Ein Dataset aufzeichnen

> **Zurück:** [04 Teleoperation](04-Teleoperation.md)
> **Weiter:** [06 Trainieren und Inferenz ausführen](06-Train-and-Inference.md)

Ein Dataset ist eine Sammlung von **Episoden**, jede eine einzelne Demonstration der Aufgabe von Anfang bis Ende. Aufzeichnen ist Teleoperation plus eine Aufnahmesteuerung.

## Einrichten

Öffnen Sie den Tab **Recording** und füllen Sie aus:

| Feld | Was dort hinein gehört |
|---|---|
| **Dataset-Name** (`repo_id`) | `your-name/task-name`, z. B. `juxi/pick-up-the-cube`. Der Teil `name/` muss Ihr Hugging-Face-Benutzername sein, wenn Sie hochladen wollen |
| **Task-Beschreibung** | Ein Satz, z. B. `pick up the cube and drop it in the box`. Das ist der Text, auf den die Policy konditioniert wird |
| **Episoden** | Wie viele Demonstrationen — siehe unten |
| **Kameras** | Welche konfigurierten Kameras enthalten sein sollen, und mit welcher Auflösung und Bildrate |

### Wie viele Episoden

**30 bis 50** für ein einfaches Pick-and-Place. Eine sehr repetitive Aufgabe braucht weniger; eine Aufgabe mit viel Variation braucht mehr.

Konsistenz zählt mehr als die Anzahl: dieselbe Startposition, derselbe Kamerabildausschnitt und dieselbe Aufgabenbeschreibung in jeder Episode. Fünfzig nahezu identische Demonstrationen schlagen hundert variierende. Variieren Sie nur das, wogegen die Policy robust sein soll — wenn jede Episode mit dem Würfel an derselben Stelle beginnt, lernt die Policy diese Stelle.

## Während der Aufzeichnung

| Taste | Aktion |
|---|---|
| `SPACE` oder `→` | Die aktuelle Episode beenden, die nächste starten |
| `DEL` oder `←` | Die gerade aufgezeichnete Episode verwerfen und wiederholen |

Der Tab zeigt einen Episodenzähler und einen Sitzungszähler.

Beenden Sie die Episode, wenn die Aufgabe abgeschlossen ist — nicht erst, nachdem der Arm zur Startposition zurückgekehrt ist. Das Zurückkehren ist Sache der nächsten Episode.

Wiederholen Sie eine Episode, wenn Ihnen der Arm verrutscht ist, Sie das Objekt aus der Position gestoßen haben oder Sie die Aufgabe nicht abgeschlossen haben. Die Policy lernt aus allem im Dataset, auch aus Fehlern.

## Beenden

Stoppen Sie die Sitzung, sobald Sie genug Episoden haben. **Die Aufzeichnung wird beim Stoppen abgeschlossen** — dann wird der Dataset-Index geschrieben. Eine mittendrin beendete Sitzung kann ein Dataset hinterlassen, das als unvollständig gelesen wird.

## Wohin die Daten gehen

Standardmäßig unter `~/.cache/huggingface/lerobot/`, benannt nach der von Ihnen gewählten `repo_id`. Nichts wird hochgeladen, bis Sie es im Tab **Upload** hochladen.

## Die Aufzeichnung prüfen

Öffnen Sie den Tab **Datasets** und wählen Sie das Dataset aus. Sie können Episoden Bild für Bild durchgehen, jeweils eine Kamera, mit einer Gelenkbewegungskurve.

Tun Sie das vor dem Training. Es fängt ab, was unsichtbar ist, während Sie den Arm halten:

- Eine falsch gedrehte Kamera — die Frames sind seitlich
- Eine Episode mit einem Abschnitt toter Zeit am Anfang
- Eine Handgelenkkamera, die im Verlauf aus dem Bild driftete

Eine erneute Aufnahme kostet Minuten; sie erst nach dem Training zu entdecken kostet den Trainingslauf.

---

> **Weiter:** [06 Trainieren und Inferenz ausführen](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
