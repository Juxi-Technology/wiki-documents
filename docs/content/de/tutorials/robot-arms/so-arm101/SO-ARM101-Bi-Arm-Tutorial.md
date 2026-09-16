---
title: SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)
description: "Der vollständige Ablauf für das SO-ARM101-Zweiarmsystem (zwei Folgearme): Hardware-Verkabelung und Kalibrierung, Zweiarm-Teleoperation."
---

# SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

Dieser Leitfaden beschreibt den vollständigen Ablauf zum Training eines Zweiarm-SO-ARM-Robotersystems mit LeRobot: Hardware-Anschluss, Zweiarm-Kalibrierung, Zweiarm-Teleoperation, Datensatzaufzeichnung und -verwaltung, ACT-Policy-Training sowie Deployment auf dem realen Roboter. Wenn Sie dieser Anleitung folgen, können Sie mit zwei Führungsarmen und zwei Folgearmen Demonstrationsdaten sammeln, eine Imitationslern-Policy trainieren und auf dem realen Roboterarm ausführen.

Verkabeln Sie zunächst wie folgt:

| Rolle | Port |
| --- | --- |
| Linker Folgearm | `/dev/ttyACM0` |
| Rechter Folgearm | `/dev/ttyACM1` |
| Linker Führungsarm | `/dev/ttyACM2` |
| Rechter Führungsarm | `/dev/ttyACM3` |

Der Folgearm-Typ ist `so101_follower`, der Führungsarm-Typ ist `so101_leader` (in LeRobot teilen sich `so100_leader` und `so101_leader` dieselbe Implementierung).

## Vorbereitung

### Abhängigkeiten installieren

Zur Installation der Umgebung siehe [SO-ARM101-Tutorial](./SO-ARM101-Tutorial.md).

### USB-Berechtigungen

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Kalibrierung (kritischer Schritt)

### 1.1 Linken Folgearm kalibrieren

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 Rechten Folgearm kalibrieren

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 Linken Führungsarm kalibrieren

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 Rechten Führungsarm kalibrieren

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

Nach Abschluss der Kalibrierung werden die Dateien gespeichert unter:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Hinweis zu den Verzeichnisnamen: `so101_follower` und `so100_follower` sowie `so101_leader` und `so100_leader` teilen sich dieselbe Implementierung, daher lauten die Verzeichnisse einheitlich `so_follower` / `so_leader`; der Führungsarm ist ein Teleoperator, seine Kalibrierdateien liegen daher unter `teleoperators/` und nicht unter `robots/`.

### (Optional) Falls zuvor bereits mit anderen IDs kalibriert wurde

Wenn Sie zuvor beispielsweise `my_awesome_follower_arm1`, `my_awesome_follower_arm2` usw. verwendet haben, können Sie die Kalibrierdateien kopieren:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. Zweiarm-Teleoperation

### 2.1 Ohne Kameras

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 Mit Kameras

Mit `lerobot-find-cameras opencv` lassen sich die Kamera-Indizes anzeigen; Kameras können auch selbst hinzugefügt oder entfernt werden.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### Sicherheitshinweis

- Auf die Umgebung achten, um Kollisionen der Folgearme zu vermeiden.

## 3. Datensatz aufzeichnen

### 3.1 Lokal speichern (kein Upload zum Hub)

Ergänzen Sie `--dataset.root` (die Daten werden in dieses Verzeichnis geschrieben) und `--dataset.push_to_hub=false`; zusätzlich `--dataset.no_stamp=true`, damit der Datensatzname stabil bleibt (sonst wird an die `repo_id` automatisch ein Zeitstempel angehängt, und spätere Fortsetzungs-/Wiedergabe-/Trainingsläufe finden den Datensatz nicht mehr).

> Hinweis: Die `repo_id` sollte ein `/` enthalten (Form `Benutzername/Datensatzname`); lokale Datensätze werden nicht wirklich hochgeladen.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> Die Video-Kodierung ist standardmäßig bereits `libsvtav1` und muss nicht angegeben werden; für Anpassungen verwenden Sie verschachtelte Parameter wie `--dataset.rgb_encoder.vcodec=h264`.

Die Daten werden unter `./datasets/bi_so101_task/` gespeichert, die Struktur ist:

```text
├── meta/
│   ├── info.json         # 数据集信息(fps、特征形状等)
│   ├── episodes/         # 每集的元数据(chunk-000/...)
│   ├── stats.json        # 各特征归一化统计
│   └── tasks.parquet     # 任务文本 → task_index
├── data/                 # 每帧特征数据(chunk-*.parquet)
└── videos/               # 每个摄像头一个子目录(chunk-*.mp4)
```

### 3.2 Upload zum Hugging Face Hub

Wenn Sie den automatischen Upload wünschen, behalten Sie `HF_USER` bei und entfernen Sie `root` und `push_to_hub=false` (standardmäßig wird hochgeladen). Ports und Kamera-Indizes müssen mit der Verkabelungstabelle übereinstimmen:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> Der Name des Hub-Repositories nach dem Upload lautet `${HF_USER}/bi_so101_task` und stimmt mit der `repo_id` überein, die unten in 4.2 für das Training vom Hub verwendet wird. Die lokale Kopie wird zunächst unter `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/` abgelegt.

### 3.3 Weiter aufzeichnen (Fortsetzen nach Unterbrechung)

Wenn die Aufzeichnung unbeabsichtigt beendet wurde (z. B. Abbruch mit der rechten Pfeiltaste während der Reset-Phase) oder Sie die Datenerfassung in mehreren Durchgängen abschließen möchten, können Sie mit `--resume` weitere Episoden an denselben Datensatz anhängen.

**Beachten Sie**:

- `--resume=true` ist zwingend erforderlich, sonst meldet `LeRobotDataset.create()` einen Fehler, weil das Verzeichnis bereits existiert.
- `--dataset.root` und `--dataset.repo_id` des Fortsetzungsbefehls müssen exakt mit der ersten Aufzeichnung (3.1) übereinstimmen (`resume` erfordert zwingend ein explizites `root`).
- `--dataset.num_episodes` gibt an, **wie viele Episoden in diesem Durchgang aufgezeichnet werden**, nicht das Gesamtziel. Beispiel: Bereits 15 Episoden aufgezeichnet, insgesamt sollen es 50 sein — dann `35` eintragen.
- Beenden Sie den Lauf möglichst während einer laufenden Episodenaufzeichnung oder nach deren natürlichem Ende; vermeiden Sie einen Abbruch in der Phase „Reset the environment" (führt zu fehlgeschlagenem Speichern leerer Episoden).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 Episoden wiedergeben und löschen

#### Eine bestimmte Episode wiedergeben

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` ist ein 0-basierter Index; `24` bezeichnet die 25. Episode.

#### Eine bestimmte Episode löschen

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

Nach dem Löschen wird der Datensatz an Ort und Stelle neu geschrieben; die Originaldaten werden nach `./datasets/bi_so101_task_old/` gesichert. Sobald der neue Datensatz geprüft ist, kann die Sicherung manuell gelöscht werden:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Den gesamten Datensatz löschen

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. ACT-Training

### 4.1 Training mit lokalem Datensatz

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` verweist auf das in 3.1 aufgezeichnete Datensatzverzeichnis (die `repo_id` muss mit der Aufzeichnung übereinstimmen). Existiert das `--output_dir`-Verzeichnis bereits, wird direkt ein `FileExistsError` gemeldet; wählen Sie ein neues Ausgabeverzeichnis oder ergänzen Sie `--resume=true`, um das Training fortzusetzen.

### 4.2 Training vom Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> Oben werden die ACT-Standardparameter verwendet (`chunk_size=100`, `dim_model=512` usw.).

> Die `repo_id` muss mit dem Repository-Namen aus dem Upload in 3.2 übereinstimmen (3.2 enthielt bereits `--dataset.no_stamp=true`, der Repository-Name ist fest `${HF_USER}/bi_so101_task`). Beim Training ist kein `--dataset.root` nötig, der Datensatz wird automatisch vom Hub heruntergeladen.

## 5. Deployment auf dem realen Roboter

> Hinweis: `lerobot-record` dient ausschließlich der Erfassung von Demonstrationsdaten. Für das Deployment einer trainierten Policy verwenden Sie `lerobot-rollout` — die aktuelle Version von `lerobot-record` akzeptiert `--policy.path` nicht mehr und lehnt auch Datensatznamen mit dem Präfix `eval_` ab.

### 5.1 Vor-Ort-Evaluation (ohne Datenaufzeichnung)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` gibt die Laufzeit in Sekunden an; `0` bedeutet keine Zeitbegrenzung.
- Für zwischenzeitliche Übernahme/Stopp ergänzen Sie `--interactive=true` und steuern im Terminal über Befehle wie `/stop`, `/reset`.

### 5.2 Evaluieren und Daten aufzeichnen (lokal)

Verwenden Sie die `episodic`-Strategie (Verhalten ähnlich dem älteren `lerobot-record`: Aufzeichnung episodeweise mit Reset-Phase):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> Der Datensatzname beim Deployment muss mit `rollout_` beginnen (verbindliche Konvention der aktuellen Version). Bei lokaler Aufzeichnung empfiehlt es sich, `--dataset.root` und `--dataset.no_stamp=true` anzugeben, damit dem Verzeichnisnamen kein Zeitstempel angehängt wird.

### 5.3 Evaluationsdaten zum Hugging Face Hub hochladen

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. Häufige Fragen

| Problem | Ursache | Lösung |
| --- | --- | --- |
| Bei der Teleoperation wird eine erneute Kalibrierung verlangt | `bi_so_follower` findet keine Kalibrierdateien mit dem Suffix `_left` / `_right` | Mit IDs inklusive `_left` / `_right` neu kalibrieren oder vorhandene Kalibrierdateien kopieren |
| Führungsarm lässt sich nicht ziehen | Leader-Drehmoment nicht deaktiviert | Neu kalibrieren oder Motoren prüfen |
| Beim Fortsetzen der Aufzeichnung wird ein bereits existierendes Verzeichnis gemeldet | `--resume=true` fehlt | `--resume=true` zum `lerobot-record`-Befehl hinzufügen |
| `--resume=true` meldet einen Fehler und verlangt `root` | Beim Fortsetzen muss das Datensatzverzeichnis explizit angegeben werden | `--dataset.root=./datasets/bi_so101_task` zum Fortsetzungsbefehl hinzufügen, identisch mit der ersten Aufzeichnung |
| Der Datensatzverzeichnisname enthält einen zusätzlichen Zeitstempel; Abspielen/Training findet den Datensatz nicht | Bei der Aufzeichnung wurde `no_stamp` nicht gesetzt, an die `repo_id` wurde automatisch ein Zeitstempel angehängt | Bei Aufzeichnung/Fortsetzen `--dataset.no_stamp=true` hinzufügen |
| `--dataset.vcodec=...` meldet einen nicht existierenden Parameter | Alter Parameter; die Video-Kodierungsparameter sind jetzt verschachtelt | Stattdessen `--dataset.rgb_encoder.vcodec=h264` verwenden (Standard ist bereits `libsvtav1`) |
| Beim Deployment meldet `lerobot-record` Fehler zu `--policy.path` / `eval_` | Die aktuelle Version von `lerobot-record` enthält keine Policy-Deployment-Funktion mehr | Für das Deployment `lerobot-rollout --strategy.type=episodic` verwenden, Datensatzname beginnt mit `rollout_` |
| Linker und rechter Arm vertauscht | Falsche Port-Konfiguration | `left_arm_config.port` und `right_arm_config.port` vertauschen |
| Das Training findet den Datensatz nicht | Für den lokalen Datensatz wurde kein `root` angegeben | Beim Training `--dataset.root=./datasets/xxx` hinzufügen |
| Der Datensatz wird automatisch hochgeladen | `push_to_hub=false` wurde nicht gesetzt | Bei der Aufzeichnung `--dataset.push_to_hub=false` hinzufügen |
| Beim Beenden erscheint `You must add one or several frames before calling add_episode` | Abbruch in der Reset-Phase; die aktuelle Episode enthält keine Frames | Beeinträchtigt die bereits aufgezeichneten Daten nicht; mit `--resume=true` die Aufzeichnung fortsetzen |

<RelatedProducts slugs="so-arm101" />
