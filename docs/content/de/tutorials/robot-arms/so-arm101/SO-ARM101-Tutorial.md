---
title: LeRobot-Roboterarm-Tutorial
description: "Dieses Tutorial wurde bis 15. Dezember aktualisiert. Sie können der neuesten offiziellen Dokumentation folgen. Links siehe unten."
---

# LeRobot-Roboterarm-Tutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**


Dieses Tutorial wurde bis 15. Dezember aktualisiert. Sie können der [neuesten offiziellen Dokumentation](https://github.com/huggingface/lerobot/tree/main) folgen. Das konkrete Tutorial siehe [diesen Link](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c). Für URDF-Dateien siehe [diesen Link](https://github.com/TheRobotStudio/SO-ARM100). Für die alte Version vom 15. September siehe [diesen Link](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink). SO-ARM101 und SO-ARM100 sind im ausgeführten Code kompatibel.

## A. Hinweise zum Tutorial

**Pro-Version: schwarzer Führungsarm mit 5V/6A-Netzteil, weißer Folgearm mit 12V/5A-Netzteil!**

Servomontage und Winkeleichung müssen vorab erledigt sein – siehe [offizielles Montage-Tutorial](https://huggingface.co/docs/lerobot/so101); darauf geht dieses Tutorial nicht ein!

Montage-Tutorial: [Lerobot-Roboterarm-Montage](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

Falls Servos nicht konfiguriert oder der Arm nicht montiert ist, folgen Sie bitte zunächst dieser [README](https://github.com/TheRobotStudio/SO-ARM100). Sie enthält die Stückliste, Links zu Teilen, 3D-Druck-Anleitung und Ratschläge für Erstdrucker.

Beginnen wir mit der Installation der LeRobot-Umgebung.

## B. Umgebungsvorbereitung

Für Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

Für Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

### LeRobot-Umgebung installieren

#### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

Je nach CUDA-Version müssen pytorch und torchvision installiert werden.

1. Für Jetson:

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

Oder für X86 Ubuntu 22.04:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. Im gewünschten Verzeichnis (z. B. lerobot anlegen) eine neue conda-Umgebung für lerobot erstellen und aktivieren:

> Bitte kein lerobot-Projekt unter ~/miniconda3 anlegen oder importieren

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. Danach die `conda`-Umgebung aktivieren (bei jedem Öffnen des Terminals mit lerobot nötig!):

```PowerShell
conda activate lerobot
```

#### 4. LeRobot klonen:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Alternativ der neuesten Version folgen: https://github.com/huggingface/lerobot.git
Hinweis: Die Befehle der neuesten Version können abweichen!

#### 5. ffmpeg in der Umgebung installieren:

Bei `miniconda` in der Umgebung `ffmpeg` installieren:

```PowerShell
conda install ffmpeg -c conda-forge
```

Dies installiert i. d. R. ffmpeg 7.X mit libsvtav1-Encoder. Falls nicht unterstützt (prüfbar mit `ffmpeg -encoders`):

【Alle Plattformen】ffmpeg 7.X explizit installieren:
`conda install ffmpeg=7.1.1 -c conda-forge`

Ohne Grafikabhängigkeiten (gdk-pixbuf, librsvg) diesen Befehl nutzen:
`conda install ffmpeg=7.1.1 -c conda-forge --no-deps`

【Nur Linux】Build-Abhängigkeiten installieren und ffmpeg mit libsvtav1 aus dem Quellcode kompilieren; mit `which ffmpeg` den richtigen ausführbaren Pfad prüfen.

Bei folgendem Fehler hilft der obige Befehl ebenfalls.
![5. ffmpeg in der Umgebung installieren: – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)




#### 6. Ins lerobot-Verzeichnis wechseln und LeRobot mit feetech-Motor-Abhängigkeiten installieren:

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

Für Jetson Jetpack 6.0+ Geräte (vorher gemäß [diesem Tutorial](https://pytorch.org/get-started/locally/) Pytorch-gpu und Torchvision installieren):

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7. Pytorch und Torchvision prüfen

Da pip beim Installieren der lerobot-Umgebung das vorhandene Pytorch/Torchvision entfernt und CPU-Versionen installiert, muss in Python geprüft werden:

```Plain Text
import torch
print(torch.cuda.is_available())
```

Bei False: Pytorch und Torchvision gemäß [offiziellem Tutorial](https://pytorch.org/) neu installieren.

[Jetson-Orin-Pytorch-Inkompatibilität](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. Intel-RealSense-Tiefenkamera-SDK installieren (falls vorhanden)

Für die RealSense-Kamera unter `lerobot/src/lerobot/` pyrealsense2 installieren:

```Plain Text
pip install pyrealsense2
```

## C. Roboterarm-Steuerung

### Port-Berechtigung

Stromkabel anschließen: schwarzer Führungsarm mit 5V/6A-Netzteil, weißer Folgearm mit 12V/5A; Servo-Treiberplatine per Datenkabel mit dem Host verbinden.

Zuerst in das Verzeichnis `lerobot/src/lerobot/` wechseln:

```Plain Text
cd ~/lerobot/src/lerobot/
```

Dann die `conda`-Umgebung aktivieren (bei jedem Terminar nötig!):

```PowerShell
conda activate lerobot
```

#### 1. Skript zum Finden des Ports ausführen

Um den richtigen USB-Port jedes Armes zu finden, das Utility-Skript zweimal ausführen:

```Plain Text
lerobot-find-port
```

#### 2. Beispielausgabe

Beim Erkennen des Leader-Arms (z. B. `/dev/tty.usbmodem575E0031751` auf dem Mac bzw. `/dev/ttyACM0` unter Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Beim Erkennen des Follower-Arms (z. B. `/dev/tty.usbmodem575E0032081` bzw. `/dev/ttyACM1` unter Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Denken Sie daran, den USB-Stecker zu ziehen, sonst wird der Anschluss nicht erkannt.

#### 3. Fehlerbehebung

Unter Linux Zugriff auf den USB-Port gewähren:

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### Roboterarm kalibrieren

Schließen Sie nun Strom und Datenkabel an und kalibrieren Sie, damit Leader- und Follower-Arm bei gleicher physischer Position übereinstimmen. Diese Kalibrierung ist entscheidend, damit ein auf einem SO-10x trainiertes neuronales Netz auch auf einem anderen funktioniert. Bei erneuter Kalibrierung die Dateien unter `~/.cache/huggingface/lerobot/calibration/robots` bzw. `~/.cache/huggingface/lerobot/calibration/teleoperators` vollständig löschen, sonst kommt es zu Fehlern. Die kalibrierten Daten liegen als json in diesem Verzeichnis.

#### 1. Manuelle Kalibrierung des Follower-Arms

Die 6 Roboterservos über 3-Pin-Anschlüsse verbinden, Chassis-Servos an die Treiberplatine anschließen und zur Kalibrierung folgenden Befehl bzw. das API-Beispiel ausführen:

Bei PC (Linux) und Jetson: das `erste` USB-Gerät wird zu `ttyACM0`, das `zweite` zu `ttyACM1`.

Vor der Ausführung auf die Leader-/Follower-Zuordnung achten.

#### 2. Schnittstellen-Berechtigung

Zuerst die Schnittstelle freigeben:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. Dann den Follower-Arm kalibrieren

Folgenden Python-Befehl ausführen:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

Zuerst den Roboter so positionieren, dass alle Gelenke in der Mitte des Bewegungsbereichs stehen, und stillhalten. Nach dem Drücken von Enter jeden Gelenkwinkel über den gesamten Bereich bewegen. Die Kalibrierdatei speichert Mittel-, Max- und Min-Werte im json unter `~/.cache/huggingface/lerobot/calibration/robots` oder `~/.cache/huggingface/lerobot/calibration/teleoperators`.
![3. Dann den Follower-Arm kalibrieren – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)



![3. Dann den Follower-Arm kalibrieren – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)




#### **4. Leader-Arm kalibrieren**

Wie oben – folgenden Befehl ausführen:

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

Roboterarm-Mittenkalibrierung.mp4

### Teleoperation

#### **1. Einfache Teleoperation

Jetzt können Sie fernsteuern! Dieses einfache Skript ausführen (ohne Kamerabild):

Die mit dem Roboter verknüpfte **ID dient zum Speichern der Kalibrierdatei. Bei Teleoperation, Aufnahme und Evaluation mit derselben Konfiguration unbedingt dieselbe ** verwenden.

Zuerst Serienport freigeben:

```Bash
sudo chmod 666 /dev/ttyACM*
```

Teleoperation starten:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

Der Befehl führt automatisch aus:
1. Fehlende Kalibrierdateien erkennen und Kalibrierung starten.
2. Roboter und Fernbedienung verbinden und Teleoperation starten.

#### 2. Teleoperation mit Kamerabild

Für die Kamera wird ein Kamera-Identifier benötigt; dieser kann je nach OS bei Neustart oder Neuanschluss wechseln.

Den **Kamera-Index** der angeschlossenen Kamera finden:

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

Das Terminal zeigt die Kamerainformationen.
![2. Teleoperation mit Kamerabild – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)




Unter `~/lerobot/outputs/captured_images` liegen die Bilder jeder Kamera.

Auf **macOS** mit Intel-RealSense kann **"Error finding RealSense cameras: failed to set power state"** auftreten – durch `sudo` beheben. RealSense auf macOS ist instabil.

So zeigen Sie das Kamerabild während der Teleoperation an – nützlich zur Vorbereitung vor der ersten Aufnahme:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` liefert komprimierte Bilder; höhere Auflösung ist möglich. `YUYV` ist auch möglich, senkt aber Auflösung/FPS und lässt den Arm ruckeln. Aktuell unterstützt `MJPG` `3` Kameras mit `1920*1080` bei `30FPS`; trotzdem: 2 Kameras desselben USB-HUBs nicht empfohlen.

Weitere Kameras über `--robot.cameras` hinzufügen. `index_or_path` richtet sich nach der letzten Ziffer der ID aus `python -m lerobot.find_cameras opencv`.

Beispiel für eine zusätzliche Kamera:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

Für die RealSense-Tiefenkamera zuerst `python -m lerobot.find_cameras realsense` ausführen, `serial_number_or_name: "323622271780"` durch die eigene ID ersetzen und `use_depth: true` setzen:

![2. Teleoperation mit Kamerabild – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. Datenerfassung

### Datensatz aufnehmen

- Für lokale Speicherung direkt ausführen:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

`dateset.repo_id` und `dataset.single_task` sind frei wählbar. Bei `push_to_hub=false` wird unter `~/.cache/huggingface/lerobot` der Ordner `juxi/test` angelegt. [Bei RealSense-Tiefenkamera den Befehl anpassen](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- Für den Upload über den Hugging-Face-Hub ggf. mit Schreibrechte-Token anmelden (Erstellung unter [Hugging Face Settings](https://huggingface.co/settings/tokens)):

```Bash
hf auth login
```

Repositoriennamen in einer Variable speichern:

```Bash
hf auth whoami
```

5 Episoden aufzeichnen und zum Hub hochladen:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

Ausgabe sieht etwa so aus:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**Parameter-Erklärung**
- episode_time_s: Aufnahmedauer pro Episode.
- reset_time_s: Vorbereitungszeit zwischen den Episoden.
- num_episodes: Anzahl der Datensätze.
- push_to_hub: ob zum HuggingFace-Hub hochgeladen wird.

|Taste|Aktion|
|---|---|
|Pfeil rechts →|aktuelle Episode beenden/zurücksetzen; zur nächsten.|
|Pfeil links ←|aktuelle Episode abbrechen; neu aufnehmen.|
|ESC|Session sofort beenden, Video kodieren und Datensatz hochladen.|

**Techniken der Datenerfassung**
- **Aufgabenvorschlag**: Objekte an verschiedenen Positionen greifen und in die Box legen.
- **Umfang**: Mindestens 50 Episoden aufnehmen (10 Episoden pro Position).
- **Konsistenz**:
    - Die Kamera fest positioniert lassen.
    - Immer dasselbe Greifverhalten beibehalten.
    - Sicherstellen, dass das manipulierte Objekt im Kamerabild sichtbar ist.
- **Schrittweise steigern**:
    - Mit zuverlässigen Griffen beginnen, dann Variationen ergänzen (neue Positionen, Greiftechniken, Kameraanpassungen).
    - Komplexität nicht abrupt erhöhen, um Fehlschläge zu vermeiden.

💡 **Faustregel**: Nur das Kamerabild als Orientierung nutzen und den Roboterarm ausschließlich anhand der auf dem Bildschirm zurückgemeldeten Videobilder steuern, um die Aufgaben zu erledigen.

Wenn Sie tiefer in dieses wichtige Thema eintauchen möchten, lesen Sie unseren [Blogbeitrag](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset) darüber, was einen guten Datensatz ausmacht.

- In den folgenden Kapiteln trainieren Sie Ihr neuronales Netz. Nachdem Sie zuverlässige Greifleistungen erreicht haben, können Sie während der Datenerfassung weitere Variationen einführen, z. B. zusätzliche Greifpositionen, andere Greiftechniken und veränderte Kamerapositionen.
- Vermeiden Sie zu viele Änderungen zu schnell, da dies Ihre Ergebnisse beeinträchtigen kann.
- Während der Aufzeichnung einer Episode kann jederzeit mit der rechten Pfeiltaste → vorzeitig gestoppt und in den Reset-Zustand gewechselt werden. Ebenso kann der Reset-Prozess vorzeitig beendet und mit der nächsten Aufzeichnung begonnen werden.
- Beim Aufnehmen oder Zurücksetzen kann jederzeit die linke Pfeiltaste ← gedrückt werden, um die aktuelle Episode vorzeitig zu beenden und neu aufzunehmen.
- Während der Aufzeichnung kann jederzeit ESCAPE (ESC) gedrückt werden, um die Session vorzeitig zu beenden und direkt zur Videokodierung und zum Hochladen des Datensatzes überzugehen.
- Die Aufzeichnung kann fortgesetzt werden, indem derselbe Befehl erneut ausgeführt und `--resume=true` hinzugefügt wird. ⚠️ **Wichtiger Hinweis**: Beim Fortsetzen `--dataset.num_episodes` auf die Anzahl der zusätzlich aufzuzeichnenden Episoden setzen (nicht auf die Gesamtzahl der Ziel-Episoden im Datensatz). Wenn die Aufzeichnung von Grund auf neu gestartet werden soll, das Datensatzverzeichnis manuell löschen.
- Falls die Pfeiltasten und die Esc-Taste unter Linux während der Datenaufzeichnung keine Wirkung zeigen, stellen Sie sicher, dass die Umgebungsvariable $DISPLAY gesetzt ist. Siehe [pynput-Einschränkungen](https://pynput.readthedocs.io/en/latest/limitations.html#linux).

Falls Ihre Tastatur nach einem Tastendruck nicht reagiert, müssen Sie möglicherweise die pynput-Version herunterstufen, z. B. Version 1.6.8 installieren.

`pip install pynput==1.6.8`

### Datensatz visualisieren

Hochgeladene Datensätze [online visualisieren](https://huggingface.co/spaces/lerobot/visualize_dataset) – die mit folgendem Befehl erzeugte Repo-ID kopieren und einfügen:

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/so101_test \
  --local-files-only 1
```

Ohne Upload auch lokal:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test
```

`juxi` ist der bei der Erfassung verwendete eigene `repo_id`.
![Datensatz visualisieren – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)


### Episode abspielen (überspringbar, optional)

Eine Episode aus dem Datensatz abspielen:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
  --dataset.repo_id=${HF_USER}/so101_test \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.num_episodes=1 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.push_to_hub=true \
  --replay=true
```

## E. Training und Evaluation des Datensatzes

### ACT

Offizielles Tutorial [ACT](https://huggingface.co/docs/lerobot/training#act)

**Training**

```Bash
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000
```

**Für lokale Datensätze: **`repo_id`** muss mit der Aufnahme übereinstimmen; zusätzlich **`--policy.push_to_hub=false`** setzen.**

```Python
lerobot-train \
  --dataset.repo_id=juxi/test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --policy.push_to_hub=false\
  --steps=300000
```

Erklärung
- **Datensatz**: über `--dataset.repo_id=${HF_USER}/so101_test`.
- **Schritte**: `--steps=300000`; Standard 800000 – je nach Aufgabe über die Loss-Kurve anpassen.
- **Politik**: `policy.type=act`; auch [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla] möglich (lädt aus `configuration_act.py`). Wichtig: passt sich automatisch an Motoren, Aktionen und Kameraanzahl Ihres Roboters an – alles im Datensatz gespeichert.
- **Gerät**: `policy.device=cuda` für Nvidia; `policy.device=mps` für Apple Silicon.
- **Visualisierung**: `wandb.enable=true` nutzt [Weights and Biases](https://docs.wandb.ai/quickstart); optional, aber dann `wandb login` nicht vergessen.

Bei folgendem Fehler:
![ACT – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)




Diesen Befehl ausführen:

```Bash
pip install datasets==2.19
```

Das Training kann Stunden dauern. Die Gewichte liegen unter `outputs/train/act_so101_test/checkpoints`.

Training fortsetzen – Beispiel mit dem letzten Checkpoint:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**Evaluation**

Die `record`-Funktion aus [`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) mit der Policy als Eingabe nutzen – z. B. 10 Evaluations-Episoden:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `--policy.path` zeigt auf die Gewichtedatei (z. B. `outputs/train/act_so101_test/checkpoints/last/pretrained_model`); auch Modell-Repo möglich (z. B. `$\{HF_USER\}/act_so101_test`).
2. Beginnt `dataset.repo_id` mit `eval_`, werden Video und Daten separat unter dem `eval_`-Ordner aufgenommen (z. B. `juxi/eval_test123`).
3. Bei `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'` zuerst den `eval_`-Ordner löschen.
4. Bei `mean is infinity. ...` müssen die Schlüssel in `--robot.cameras` (front, side ...) exakt mit der Aufnahme übereinstimmen.

### Smolvla

Offizielles Tutorial [SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**Training**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**Evaluation**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

Offizielles Tutorial [Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**Training**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false
```

**Evaluation**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

Offizielles Tutorial [Pi0.5](https://huggingface.co/docs/lerobot/pi05)

```Bash
pip install -e ".[pi]"
```

**Training**

```Bash
lerobot-train \
    --dataset.repo_id=juxi/eval_test123 \
    --policy.type=pi05 \
    --output_dir=outputs/pi05_training \
    --job_name=pi05_training \
    --policy.pretrained_path=lerobot/pi05_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch_size=32
```

**Evaluation**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi05_training/checkpoints/last/pretrained_model
```

### GR00T N1.5

Offizielles Tutorial [GR00T](https://huggingface.co/docs/lerobot/gr00t)

Training wie Pi0, Politiktyp `gr00t`.

## F. Cloud-Training, Deployment und Modellexport

#### **1. Auf „Rechenmarkt" klicken, passende GPU wählen – möglichst viele Kerne**
![1. Auf „Rechenmarkt" klicken, passende GPU wählen – möglichst viele Kerne – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)


#### **2. „Abrechnung nach Nutzung" wählen, Basis-Image „Miniconda/conda3/3.8(ubuntu20.04)/11.8", dann „Sofort erstellen"**
![2. „Abrechnung nach Nutzung" wählen, Basis-Image „Miniconda/conda3/3.8ubuntu20.04/11.8", dann „Sofort erstellen" – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)


#### **3. Auf „JupyterLab" klicken, Terminal öffnen**
![3. Auf „JupyterLab" klicken, Terminal öffnen – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)


#### **4. conda-Umgebung initialisieren**

```Plain Text
conda env list
```

```Plain Text
conda activate base
```

```Plain Text
conda init
```
![4. conda-Umgebung initialisieren – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)


#### **5. Dieses Terminal schließen, neues öffnen**

Siehe https://www.autodl.com/docs/network_turbo/

```Plain Text
source /etc/network_turbo
```
![5. Dieses Terminal schließen, neues öffnen – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)




#### **6. lerobot-Umgebung erstellen**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Alternativ: https://github.com/huggingface/lerobot.git – Befehle der neuesten Version können abweichen!

```PowerShell
conda install ffmpeg -c conda-forge
```
![6. lerobot-Umgebung erstellen – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)


#### **7. Ins lerobot-Verzeichnis wechseln, LeRobot mit feetech installieren:**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8. Datensatz auf den Cloud-Server importieren**

Zwei Fälle: **Datensatz wurde bei der Erfassung bereits in die Huggingface-Datenbank hochgeladen** bzw. nicht.

**① Bereits hochgeladen: über den per Huggingface-Key erhaltenen Zugriff**



```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```
![8. Datensatz auf den Cloud-Server importieren – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)




```Plain Text
export HYDRA_FULL_ERROR=1
```

**② Lokalen Datensatz per FileZilla hochladen:** siehe https://www.autodl.com/docs/filezilla/

Einfachste Installation unter Linux:

```Python
sudo apt install filezilla
```

```Python
filezilla
```

FileZilla öffnen, „Datei" → „Standortmanager", „Neuer Standort", „SFTP-Protokoll" wählen
![8. Datensatz auf den Cloud-Server importieren – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)



![8. Datensatz auf den Cloud-Server importieren – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)




Zurück zu AutoDL: „Anmeldebefehl" kopieren, Informationen einfügen und „Verbinden" klicken
![8. Datensatz auf den Cloud-Server importieren – 4](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)



![8. Datensatz auf den Cloud-Server importieren – 5](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)



![8. Datensatz auf den Cloud-Server importieren – 6](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)



![8. Datensatz auf den Cloud-Server importieren – 7](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)



![8. Datensatz auf den Cloud-Server importieren – 8](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)




Im lerobot-Verzeichnis des Servers den Ordner `data` anlegen
![8. Datensatz auf den Cloud-Server importieren – 9](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)




Datensatz-Ordner nach rechts ziehen und auf Übertragung warten
![8. Datensatz auf den Cloud-Server importieren – 10](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)




#### 9. Datensatz-Training

Siehe [E. Datensatz-Training und -Evaluation] dieses Tutorials, Trainingsbefehl im Cloud-Server ausführen

#### 10. Modellexport

Nach dem Training das trainierte Modell im entsprechenden train-Verzeichnis exportieren
![10. Modellexport – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)




## G. Häufige Fragen

Bei diesem Tutorial bitte das empfohlene Repository https://github.com/Juxi-Technology/lerobot.git klonen.

Das empfohlene Repository ist die geprüfte stabile Version; das offizielle Lerobot-Repo wird laufend aktualisiert und kann unerwartete Probleme verursachen (andersartige Dataset-Versionen, andere Befehle).

- [Bei RealSense-Tiefenkamera die Befehle entsprechend anpassen](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- Auf Jetson: läuft die Evaluation ohne Episoden-/Zeitangabe und wird mit ctrl+z abgebrochen, verlieren Arm und Kamera die Verbindung; nach dem Neuverbinden ändern sich alle Ports.

Episodenzahl und -dauer im Befehl angeben, z. B.:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- Bei der Servo-ID-Kalibrierung:

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

Kabelverbindung zum Servo und Versorgungsspannung sorgfältig prüfen.

- Bei:

```Bash
Could not connect on port "/dev/ttyACM0"
```

Existiert `/dev/ttyACM0` (`ls /dev/ttyACM*`), aber keine Verbindung, fehlt die Port-Freigabe: `sudo chmod 666 /dev/ttyACM*`.

- Bei:

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

ffmpeg 7.1.1 installieren: `conda install ffmpeg=7.1.1 -c conda-forge`.
![G. Häufige Fragen – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)




- Bei:

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

Prüfen, ob der Arm am angegebenen Port mit Strom versorgt wird und ob ein Bus-Servo-Kabel locker ist. Das Servo mit dunkler LED zeigt das lockere Kabel davor.

- Bei der Kalibrierung:

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

Arm aus- und wieder einschalten, erneut kalibrieren. Hilft auch bei MAX-Winkel im Zehntausender-Bereich. Sonst Servo neu kalibrieren (Mittenkalibrierung + ID schreiben).

- Bei der Evaluation:

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

Den `eval_`-Ordner löschen und erneut starten.

- Bei der Evaluation:

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

Die Schlüssel (front, side ...) in `--robot.cameras` müssen exakt mit der Aufnahme übereinstimmen.

## Servo unter Windows finden (Feetech-Servo-Hostsoftware)

Zum Debuggen kann jeder Windows-PC den Servo per USB programmieren, debuggen oder testen. Dazu die [Feetech-Software](https://www.feetechrc.com/software.html) herunterladen. Für Ubuntu-Systeme kann das [FT_SCServo_Debug_Qt-Tool](https://github.com/Kotakku/FT_SCServo_Debug_Qt) verwendet werden.

fddebug-master.zip

Portnummer auswählen, Baudrate auf 1000000 setzen, öffnen und „Search" klicken

![Servo unter Windows finden Feetech-Servo-Hostsoftware – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)

## ROS2-Simulationssteuerung (kann unabhängig umgesetzt werden)

https://github.com/holmsslk/so-arm-moveit-hardware

## Servo-ID und Mittelkalibrierung im Web einstellen

https://bambot.org/feetech.js?lang=zh

1. Je nach Servomodell 0 oder 1 eingeben, dann „Connect" klicken.

![Servo-ID und Mittelkalibrierung im Web einstellen – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2. Die Servos mit den IDs 1 bis 6 scannen; die zugehörige ID lässt sich anhand von FOUND im Scanergebnis bestätigen. Beispiel: Servo-ID 1 im Bild wurde gescannt.

![Servo-ID und Mittelkalibrierung im Web einstellen – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3. ID-Einstellung und Mittelkalibrierung

① Die aktuelle Servo-ID-Eingabe ist die ID des gescannten Servos

② In „ID-Verwaltung" eine Zahl eingeben und „Change ID" klicken, um die ID zu setzen

③ Mittelkalibrierung (Mittelwert des STS3215-Servos ist 2047, der des SCS0009-Servos ist 511)

STS-Servo: 2047 in „Position Control" eingeben und „Set" klicken

SCS-Servo: 511 in „Position Control" eingeben und „Set" klicken.

![Servo-ID und Mittelkalibrierung im Web einstellen – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)

<RelatedProducts slugs="so-arm101,robot-vision-kit,tpu-flexible-gripper" />
