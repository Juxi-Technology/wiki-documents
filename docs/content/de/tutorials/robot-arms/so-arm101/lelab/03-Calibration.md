---
title: "3 · Verbinden und kalibrieren"
description: "Beide Arme in LeLab verbinden und kalibrieren: USB-Verkabelung, serielle Berechtigungen unter Linux und die geführte Kalibrierung, die Nullpunkt und Bereich jedes Gelenks aufzeichnet."
---

# 3 · Verbinden und kalibrieren

> **Zurück:** [02 Installation und Start](02-Install.md)
> **Weiter:** [04 Teleoperation](04-Teleoperation.md)

Die Kalibrierung erfasst den Nullpunkt und den Fahrbereich jedes Gelenks. Führen Sie sie einmal pro Arm durch; wiederholen Sie sie nach einem Zerlegen oder wenn die Kalibrierungsdatei verloren geht.

## Bevor Sie beginnen

- Beide Arme zusammengebaut, Servos mit ihren IDs versehen.
- Beide Arme mit Strom versorgt.
- Ein USB-Kabel pro Arm, in **zwei getrennte USB-Anschlüsse** — ein gemeinsamer Hub zählt sie manchmal unzuverlässig auf.

### Linux: serielle Berechtigungen

```bash
sudo usermod -aG dialout $USER
```

Dann **melden Sie sich ab und wieder an**. Ohne dies findet LeLab den Arm, aber jeder Lesevorgang schlägt mit einem Berechtigungsfehler fehl. Windows und macOS benötigen nichts.

## Welcher Arm welcher ist

| Arm | LeRobot-Name | LeLab nennt ihn |
|---|---|---|
| Der, den Sie von Hand bewegen | `so101_leader` | **teleop** |
| Der, der folgt | `so101_follower` | **robot** |

Kalibrieren Sie zuerst den leader. Die beiden zu verwechseln ist der übliche Grund, warum ein frisch kalibrierter Arm sich seltsam verhält.

## Der Ablauf

Öffnen Sie den Tab **Calibration** und arbeiten Sie einen Arm nach dem anderen ab:

1. **Gerät wählen** — leader (teleop) oder follower (robot).
2. **Den seriellen Port wählen.** LeLab listet die USB-Seriell-Geräte auf, die es sieht. Um sie auseinanderzuhalten, ziehen Sie einen Arm ab und beobachten, welcher Eintrag verschwindet. Die Wahl wird gemerkt.
3. **Ein Kalibrierungsprofil wählen** — ein vorhandenes oder ein neues. Das Profil enthält die gespeicherten Nullpositionen; wenn dieser Arm zuvor kalibriert wurde, verwenden Sie sein Profil erneut.
4. **Folgen Sie den geführten Schritten.** LeLab führt der Reihe nach durch jedes Gelenk; bewegen Sie das Gelenk in die verlangte Position und bestätigen Sie. Keine Tastaturabfragen.
5. **Für den anderen Arm wiederholen** — mit eigenem Profil und Port.

> Jedes Profil gehört zu einem physischen Arm. Die beiden Arme zu vertauschen bedeutet neu zu kalibrieren.

## Kameras

Kameras werden auf demselben Tab konfiguriert. Der Name jeder Kamera (`front`, `wrist`, …) ist der Schlüssel, den die Policy sieht, also verwenden Sie Namen, die Sie in einem Trainingslog wiedererkennen.

Kameras können vor oder nach der Kalibrierung montiert werden; die Kalibrierung hängt nicht von ihnen ab. Halten Sie die Zuordnung stabil — wenn Sie zwischen Aufzeichnung und Inferenz vertauschen, welche physische Kamera `wrist` heißt, verhält sich eine trainierte Policy unsinnig.

### Rotation

Wenn eine Kamera kopfüber oder seitlich montiert ist, stellen Sie ihre **Rotation** ein: 0°, 90°, 180° oder 270° im Uhrzeigersinn. Eine kopfüber montierte Handgelenkkamera ist 180°.

Die Rotation wird pro Kamera gespeichert und auf die Setup-Vorschau, die Teleoperations-Vorschau, aufgezeichnete Frames und die Inferenz angewendet. Profile ohne Rotationseinstellung werden als 0° behandelt.

- **90° und 270° vertauschen die Ausgabemaße.** Eine 640 × 480-Aufnahme wird zu 480 × 640.
- **Die Bildmaße eines Checkpoints verraten die Ausrichtung nicht.** 0° und 180° erzeugen identische Maße, aber gegensätzliche Bilder. Stellen Sie vor der Inferenz die bei der Aufzeichnung verwendete Rotation ein — siehe [Seite 6](06-Train-and-Inference.md).

## Was gespeichert wird

| Datei | Inhalt |
|---|---|
| `~/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/*.json` | leader-Profile |
| `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/*.json` | follower-Profile |
| `~/.cache/huggingface/lerobot/ports/leader_port.txt` | Serieller Port des leader |
| `~/.cache/huggingface/lerobot/ports/follower_port.txt` | Serieller Port des follower |

Diese liegen unter `~/.cache/`, daher können Cache-Bereinigungswerkzeuge sie löschen. Wenn ein kalibrierter Arm erneut kalibriert werden möchte, prüfen Sie hier — siehe [Fehlerbehebung](07-Troubleshooting.md).

---

> **Weiter:** [04 Teleoperation](04-Teleoperation.md)

<RelatedProducts slugs="so-arm101" />
