---
title: "SO-ARM101 Roboterarm 7-Achsen Tutorial"
description: "Vor dem Start des 7-DOF-Kurses: Servo- und Gelenkzuordnung prüfen, Unterschiede zum 6-Servo-Arm verstehen und die passende Methode zum Dateiaustausch wählen."
---

# SO\-ARM101 Roboterarm 7\-Achsen Tutorial

# SO\-ARM101 7\-DOF · Vorbereitung vor der Inbetriebnahme

> Diese Anleitung richtet sich an Anwender, die den **SO\-ARM101 von 6 Servos auf 7 Servos umgebaut** haben und anschließend mit LeRobot den kompletten Ablauf (Kalibrierung → Aufzeichnung → Training → Deployment) durchlaufen möchten.
> Zugehöriger Code: dieses Repository (`lerobot-7dof`), ein Fork des offiziellen lerobot, bei dem nur die SO\-relevanten Motorkonfigurationen geändert wurden.
> 
> 

---

## 0\. Prüfen Sie zuerst Ihren Roboterarm

7 Servos (alle STS3215), Zuordnung von Servo\-ID zu Gelenkname:

|**Servo\-ID**|**Gelenkname**|**Beschreibung**|
|---|---|---|
|1|`shoulder_pan`|Horizontale Schulterdrehung|
|2|`shoulder_lift`|Schulterhebung|
|3|`elbow_flex`|Ellenbogenbeugung|
|4|`wrist_flex`|Handgelenk\-Neigung (Auf\- und Abbewegung)|
|5|`wrist_yaw`|Handgelenk\-Gierung (Links\-/Rechtsdrehung ca. 90°) · **das in diesem Umbau neu hinzugefügte Servo** (eingefügt zwischen den bisherigen Nummern 4 und 5)|
|6|`wrist_roll`|Handgelenk\-Rollen · der bisherige Rollmotor Nr. 5, ID 5→6, Druckteile unverändert, Name unverändert|
|7|`gripper`|Greifer · bisher ID=6, nach dem Umbau auf 7 nachgerückt|

Reihenfolge der Gelenkdaten (die Reihenfolge der Gelenkdimensionen von `action` / `observation.state` in der Parquet\-Datei nach der Aufzeichnung):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Achtung: **Datensätze, Kalibrierdateien und bereits trainierte Modelle der 6\-Servo\-Version sind mit diesem Repository nicht kompatibel** und müssen gemäß den folgenden Schritten komplett neu erstellt werden.

---

## 1\. Welche Dateien ersetzt/geändert werden müssen, wenn Sie vom offiziellen Code\-Repository geklont haben

### Variante A: Code dieses Repositories direkt verwenden (empfohlen)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Variante B: Nach dem git clone des offiziellen lerobot manuell ersetzen

Kopieren Sie aus diesem Repository **3 Dateien** über den offiziellen Clone:

|Datei in diesem Repository (Quelle)|Überschreiben nach (Ziel)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|gleichnamige Datei im offiziellen Clone|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|gleichnamige Datei im offiziellen Clone|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|gleichnamige Datei im offiziellen Clone (**nur Kommentar\-Korrektur**, ohne Funktionsauswirkung, muss nicht ersetzt werden)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <offizieller Clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <offizieller Clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Voraussetzung: Ihr offizieller Clone entspricht in der Struktur der Baseline dieses Repositories (lerobot\-Version 2026\-08). Bei großer Versionsabweichung **nicht die gesamten Dateien überschreiben**, sondern nur die beiden Stellen gemäß der folgenden „manuellen Änderung" anpassen.
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

`bi_so_follower / bi_so_leader (src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/) wickeln einen einzelnen Arm nur mit left_/right_\-Präfix ein,`**`enthalten keine Motordefinitionen`**`. Sobald`**`die obigen Einzelarm\-Dateien`**`angepasst sind, sind die Zweiarm\-Befehle (--robot.type=bi_so_follower) automatisch 7\-DOF.`

## 1. LeRobot-Umgebung

- [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Dateien ersetzen (Anpassung an 7-DOF)

- [Dateien ersetzen (Anpassung an 7-DOF)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Serielle Ports

- [Ubuntu](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Kalibrierung

- [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Teleoperation

- [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Teleop mit Kamera

- [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Datenerfassung

- [Datensatz ansehen und wiedergeben](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Hinweise zum Erfassen von Datensätzen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Hugging Face-Konto registrieren (optional)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Datensatz auf HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Datensatz durch Demonstration erfassen-Handschlag 200](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Datensatz durch Demonstration erfassen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Modelltraining

- [Cloud-GPU-Trainingsumgebung einrichten](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Trainingsbefehl-ACT (empfohlen für den Einstieg)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Trainingsbefehl-Diffusion](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Trainingsbefehl-pi0.5](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Trainingsbefehl-pi0 (beste Ergebnisse)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Trainingsbefehl-pi0fast](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Trainingsbefehl-smolvla (empfohlen für Fortgeschrittene)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Modell zu HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Von LeRobot unterstützte Imitation-Learning-Algorithmen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Lokales Training unter Ubuntu](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Modelldateien abrufen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Empfehlungen für Trainingsparameter](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [Trainingskurven in Echtzeit mit wandb anzeigen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Modell-Inferenz

- [Erläuterung der Befehle](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Inferenzbefehl-ACT](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Inferenzbefehl-Diffusion](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Inferenzbefehl-pi0.5](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Inferenzbefehl-pi0](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Inferenzbefehl-smolvla](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Häufige Bugs und Lösungen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [Inferenz mit dem NVIDIA DGX Spark](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [Inferenz mit dem D-Robotics RDK S100](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
