---
title: "03 · Verbindung zum realen Roboter und Kalibrierung"
description: "Nach dem Anschließen des Treiberboards mit CH343-Chip erscheint ein COM-Port; die Nummer ändert sich beim Ein-/Ausstecken oder Wechsel des USB-Ports, daher v…"
---

# 03 · Verbindung zum realen Roboter und Kalibrierung

> Voraussetzung: [01 Umgebung einrichten](/de/tutorials/robot-arms/so-arm101/mujoco/01-Environment) abgeschlossen (das `feetech`-Extra stellt die serielle Kommunikation bereit).
> Beispielports in diesem Kapitel: Follower `COM172`, Leader `COM124` (der Leader-Port ist der gemessene Wert des aktuell verwendeten Leader-Arms auf diesem Rechner) – **die Nummer kann sich bei jedem Ein-/Ausstecken ändern;
> maßgeblich ist immer der in Schritt eins ermittelte tatsächliche Port**. In den folgenden Befehlen muss nur die Portnummer ersetzt werden.

## Serielle Schnittstelle identifizieren

Nach dem Anschließen des Treiberboards mit CH343-Chip erscheint ein COM-Port; die Nummer ändert sich beim Ein-/Ausstecken oder Wechsel des USB-Ports, daher vor jeder Verbindung prüfen:

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

In der Ausgabe ist die Zeile mit `CH343` (oder einem ähnlichen USB-Seriellgerät) das Treiberboard; die `COM`-Nummer notieren.

## Erster Schritt: schreibgeschützte Erstprüfung (Verkabelung/Stromversorgung/Servo-Check)

**Es wird nichts geschrieben**: Zuerst werden alle sechs Servos einzeln angepingt, dann Spannung und Temperatur gelesen (der Drehmomentstatus bleibt unverändert):

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` ist die in Schritt eins ermittelte Nummer; für welchen Arm geprüft wird, entscheidet der Port (Follower und Leader können mit demselben Skript geprüft werden).

Eine normale Ausgabe sieht so aus: sechs Gelenkzeilen, Temperatur 20–30 °C, Drehmoment 0 (Arm frei). **Die Spannung hängt von der Stromversorgung ab**: Bei externer Versorgung des Followers etwa 11 V,
bei Versorgung des Leaders nur über das Treiberboard etwa 5 V – wenn alle sechs Servos ausgelesen werden können, ist die Verkabelung in Ordnung. Fehlende Servos oder ein falsches Modell führen zu einem direkten Fehler.

## Zweiter Schritt: Kalibrierung

Die Kalibrierung schreibt „Stellwegbereich jedes Gelenks + Mittelstellungsreferenz“ ins Servo-EEPROM und speichert sie in einer lokalen Datei; **Follower und Leader müssen jeweils einmal kalibriert werden**.
Die Kalibrierungsdateien beider Arme werden getrennt abgelegt und beeinflussen sich nicht:

| Gerät | Befehl | Ablageort der Kalibrierungsdatei |
| --- | --- | --- |
| Follower | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| Leader | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

Bedeutung der Parameter im Befehl:

| Parameter | Beschreibung |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | Rolle des Kalibrierungsobjekts: Follower / Leader (Rollen nicht vertauschen; die Kalibrierungsdateien werden nach Rolle in getrennten Verzeichnissen abgelegt) |
| `--robot.port` / `--teleop.port` | die in Schritt eins ermittelte serielle Portnummer |
| `--robot.id` / `--teleop.id` | Name für diesen Arm (in diesem Beispiel `juxi_so101` / `juxi_leader`); **bei späterer Teleoperation/Aufzeichnung muss dieselbe id verwendet werden**, sonst wird erneut zur Kalibrierung aufgefordert |

`id` kann beliebig benannt werden, aber die Kalibrierungen beider Arme sind unabhängig und überschreiben sich nicht.

### Physische Schritte (das Terminal druckt eine schematische Darstellung)

1. **In die Mittelstellung bringen und Enter drücken**: Basis flach an die Tischkante stellen, Oberarm senkrecht nach oben, Unterarm waagerecht nach vorn, Schulterrotation und Handgelenk zentriert
   (der „Greifer“ des Leaders ist der Griff/Trigger). Die Position in diesem Moment wird als „Mittelstellungsreferenz“ des Arms gespeichert.
2. Nach dem Enter **jedes Gelenk langsam über den gesamten Bewegungsbereich führen** (`wrist_roll` muss nicht durchfahren werden, wird automatisch als volle Umdrehung behandelt), dann Enter zum Speichern.

Hinweise:

- Während der Follower-Kalibrierung ist das Drehmoment 0 (der Arm ist weich), mit der Hand führen; der Leader hat ohnehin kein Drehmoment.
- Der Kalibrierungsvorgang schreibt ins Servo-EEPROM (das gehört zur Kalibrierung und ist normal).
- Ergebnisse dieser Messung (zum Vergleich): Follower-Gelenkstellwege etwa 1474–2688 Counts, Handgelenkrotation (`wrist_roll`) 4095 Counts;
  Leader etwa 2208–2681 Counts. Deutlich asymmetrische Stellwege sind normal (Ursache und Kompensation siehe
  [05 Nullpunkt-Feintuning](/de/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)).

<RelatedProducts slugs="so-arm101" />
