---
title: SO-ARM101 7-DOF-Umbau und LeRobot-Nutzung
description: "SO-ARM101 von 6 auf 7 Freiheitsgrade umbauen und mit LeRobot nutzen: Gelenkreihenfolge, Codeänderungen, Kalibrierung und Deployment."
---

# SO-ARM101 7-DOF-Umbau und LeRobot-Nutzung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

Dieses Tutorial richtet sich an Anwender, die den **SO-ARM101 von 6 Servos auf 7 Servos umgebaut** haben und anschließend mit LeRobot den kompletten Ablauf (Kalibrierung → Aufzeichnung → Training → Deployment) durchlaufen möchten. Der zugehörige Umbau-Code basiert auf einer Kopie und Anpassung des offiziellen LeRobot-Quellcodes und ist auf den **SO-ARM101 mit 7 Freiheitsgraden** (7 STS3215-Servos) abgestimmt.

**Kernunterschiede zum offiziellen SO-101 (6 Servos):**

| Servo-ID | Gelenkname | Offizieller SO-101 (6-DOF) | Beschreibung |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Horizontale Schulterdrehung |
| 2 | `shoulder_lift` | shoulder_lift | Schulterhebung |
| 3 | `elbow_flex` | elbow_flex | Ellenbogenbeugung |
| 4 | `wrist_flex` | wrist_flex | Handgelenk-Neigung (Auf- und Abbewegung) |
| 5 | `wrist_yaw` | — (neu) | Handgelenk-Gierung (Links-/Rechtsdrehung ca. 90°), **das in diesem Umbau neu hinzugefügte Servo** (eingefügt zwischen den bisherigen Nummern 4 und 5) |
| 6 | `wrist_roll` | wrist_roll (ID 5→6) | Handgelenk-Rollen, der bisherige Rollmotor Nr. 5, Druckteile unverändert, Name unverändert |
| 7 | `gripper` | gripper (ID 6→7) | Greifer, bisher ID=6, nach dem Umbau auf 7 nachgerückt |

> ⚠️ Achtung: **Datensätze, Kalibrierdateien und bereits trainierte Modelle der 6-Servo-Version sind mit dem 7-DOF-Umbau nicht kompatibel** und müssen gemäß diesem Tutorial komplett neu erstellt werden.

## Reihenfolge der Gelenkdaten

Nach der Aufzeichnung lautet die Reihenfolge der Gelenkdimensionen von `action` / `observation.state` in der Parquet-Datei:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Änderungen am mechanischen Aufbau

Zwischen dem bisherigen Servo Nr. 4 (`wrist_flex`) und Nr. 5 (`wrist_roll`) wird das neue `wrist_yaw`-Servo samt einem Druckteil eingefügt; danach rücken alle folgenden Motoren um eine Position nach hinten: der bisherige Rollmotor Nr. 5 → Position 6, der Greifer → Position 7 (die Druckteile dieser beiden alten Motoren bleiben unverändert).

## Kernänderungen im Code

1. **Motordefinition auf 7 Motoren erweitert**: neues `wrist_yaw(5)` (Links-/Rechtsdrehung); der bisherige `wrist_roll`-Motor wandert auf **ID 6** (weiterhin Rollen, Name unverändert); Greifer `gripper(6)` → `gripper(7)`. Der Greifer verwendet weiterhin `RANGE_0_100` (0~100 Öffnungsgrad), die übrigen Gelenke verwenden `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **Keine „Vollumdrehungs-Gelenke" mehr bei der Kalibrierung**: Der Originalcode hat `wrist_roll` als Vollumdrehungs-Gelenk (0~4095) fest verdrahtet; nach dem 7-DOF-Umbau sind Handgelenk-Yaw und -Roll mechanisch begrenzt und können keine volle Umdrehung ausführen. Bei der Kalibrierung wird daher mit `record_ranges_of_motion()` der **tatsächliche** Bewegungsbereich **aller** Gelenke erfasst.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Umbau-Repository verwenden oder Dateien manuell ersetzen

Wenn Sie vom offiziellen Repository geklont haben, müssen Sie die folgenden Dateien ersetzen bzw. ändern.

### Variante A: Umbau-Repository direkt verwenden (empfohlen)

Verwenden Sie direkt das Repository, in dem die 7-DOF-Anpassung bereits abgeschlossen ist — keinerlei manuelle Änderungen erforderlich.

### Variante B: Nach offiziellem lerobot-git-clone manuell ersetzen

Kopieren Sie aus dem Umbau-Repository **3 Dateien** über den offiziellen Clone:

| Datei im Umbau-Repository (Quelle) | Überschreiben nach (Ziel) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | gleichnamige Datei im offiziellen Clone |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | gleichnamige Datei im offiziellen Clone |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | gleichnamige Datei im offiziellen Clone (**nur Kommentar-Korrektur**, ohne Funktionsauswirkung, muss nicht ersetzt werden) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Voraussetzung: Ihr offizieller Clone entspricht in der Struktur der Baseline des Umbau-Repositories (lerobot-Version 2026-08). Bei großer Versionsabweichung **nicht die gesamten Dateien überschreiben**, sondern nur die beiden Stellen gemäß der folgenden „Manuellen Änderung" anpassen.

### Manuelle Änderung bei abweichender Version (nur zwei Stellen)

**① Motor-Dictionary** (je eine Kopie in `so_follower.py` und `so_leader.py`, inhaltlich identisch) — ändern Sie das ursprüngliche

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

in

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵机,左右旋转
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 号滚动电机,ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Kalibrierlogik** (die jeweilige `calibrate()` in beiden Dateien) — entfernen Sie die Sonderbehandlung für das „Vollumdrehungs-Gelenk" und ersetzen Sie

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

durch eine einzige Zeile, die die tatsächlichen Bereiche aller Gelenke erfasst:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

Gründe und Risiken der Änderung siehe den folgenden Abschnitt „Hinweise zur Kalibrierung".

## Hinweise zur Kalibrierung

- **Keine „Vollumdrehungs-Gelenke" mehr**: Der offizielle Originalcode behandelt `wrist_roll` (Rollen um die Unterarmachse) als Gelenk, das eine volle Umdrehung (0~4095) ausführen kann, und verdrahtet den vollen Bereich fest. Nach dem 7-DOF-Umbau sind die Handgelenke Nr. 5/6 (`wrist_yaw` / `wrist_roll`) mechanisch begrenzt und können keine volle Umdrehung ausführen.
- **Risikohinweis**: Würde man die offizielle Vollumdrehungs-Festverdrahtung beibehalten, sendet der Code Gelenkbefehle auf Winkel, die mechanisch nicht erreichbar sind — es besteht Beschädigungsgefahr. Bei der Kalibrierung wird daher für jeden Motor der tatsächliche min/max-Bereich manuell erfasst (entspricht der Codeänderung ② oben).
- **Kalibrierdateien der 6-Servo-Version sind mit 7-DOF nicht kompatibel** — nach dem Umbau muss neu kalibriert werden.
- Kalibrierung und Nutzung des Zweiarm-Systems (zwei Folgearme) siehe [SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)](./SO-ARM101-Bi-Arm-Tutorial.md).

## Hinweis zu Zweiarm (bi_so_follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) wickeln einen einzelnen Arm nur mit `left_`/`right_`-Präfix ein und **enthalten keine Motordefinitionen**. Sobald die obigen Einzelarm-Dateien angepasst sind, sind die Zweiarm-Befehle (`--robot.type=bi_so_follower`) automatisch 7-DOF. Der vollständige Zweiarm-Ablauf (Kalibrierung, Teleoperation, Datensatzaufzeichnung, Training, Deployment) steht im [SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
