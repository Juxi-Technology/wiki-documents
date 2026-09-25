---
title: "Schritt 2: Dateien ersetzen (Anpassung an 7-DOF)"
description: "Welche Dateien Sie im offiziellen lerobot-Clone für die 7-DOF-Version ersetzen oder ändern müssen – Code dieses Repositories nutzen oder manuell austauschen."
---

# Schritt 2: Dateien ersetzen (Anpassung an 7\-DOF)

## 1\. Welche Dateien ersetzt/geändert werden müssen, wenn Sie vom offiziellen Code\-Repository geklont haben

### Variante A: Code dieses Repositories direkt verwenden (empfohlen)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Variante B: Nach dem git clone des offiziellen lerobot manuell ersetzen

Kopieren Sie aus diesem Repository **3 Dateien** über den offiziellen Clone:

|Datei in diesem Repository (Quelle)|Überschreiben nach (Ziel)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|gleichnamige Datei im offiziellen Clone|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|gleichnamige Datei im offiziellen Clone|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Voraussetzung: Ihr offizieller Clone entspricht in der Struktur der Baseline dieses Repositories (lerobot\-Version 2026\-09).
> 
> Bei großer Versionsabweichung **nicht die gesamten Dateien überschreiben**, sondern nur die beiden Stellen gemäß der folgenden „manuellen Änderung" anpassen.
> 
> 

### Manuelle Änderung bei abweichender Version (nur zwei Stellen)

**① Motor\-Dictionary** (je eine Kopie in `so_follower.py` und `so_leader.py`, inhaltlich identisch) — ändern Sie das ursprüngliche

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

in

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # Neues Servo, Links-/Rechtsdrehung
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # Bisheriger Rollmotor Nr. 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Kalibrierlogik** (die jeweilige `calibrate()` in beiden Dateien) — entfernen Sie die Sonderbehandlung für das „Vollumdrehungs\-Gelenk" und ersetzen Sie das

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

durch eine einzige Zeile, die die tatsächlichen Bereiche aller Gelenke erfasst:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Warum: Der Originalcode behandelt `wrist_roll` (Rollen um die Unterarmachse) als Gelenk, das eine volle Umdrehung (0\~4095) ausführen kann, und verdrahtet den vollen Bereich fest. Nach dem 7\-DOF\-Umbau sind die Handgelenke Nr. 5/6 (yaw / roll) **mechanisch begrenzt und können keine volle Umdrehung ausführen**; eine feste Vollumdrehungs\-Vorgabe führt dazu, dass der Code Gelenkbefehle auf Winkel sendet, die mechanisch nicht erreichbar sind — es besteht Beschädigungsgefahr. Bei der Kalibrierung wird nun für jeden Motor der tatsächliche min/max\-Bereich manuell erfasst.
> 
> 

### Hinweise zu zwei Folgearmen

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) wickeln einen einzelnen Arm nur mit dem Präfix `left_`/`right_` ein und **enthalten keine Motordefinitionen**. Sobald **die obigen Einzelarm\-Dateien** angepasst sind, sind die Zweiarm\-Befehle (`--robot.type=bi_so_follower`) automatisch 7\-DOF.

