---
title: "Schritt 8: Erläuterung der Befehle"
description: "Erläutert den Deployment-Befehl der neuen LeRobot-Version, die Arbeitsweisen base und episodic, die wichtigsten Parameter und die Kameraparameter-Regel."
---

# Schritt 8: Erläuterung der Befehle

## Versionshinweise (wichtig, bitte zuerst lesen)

Ab LeRobot **0.6.0** werden trainierte Modelle mit `lerobot-rollout` deployt. Die frühere Schreibweise `lerobot-record --policy.path=...` wurde bereits in Version **0.5.2** entfernt.

Dieses Tutorial installiert LeRobot im ersten Schritt mit `git clone` und erhält damit die aktuelle neueste Version; verwenden Sie daher bitte die unten stehende Kommandozeile von `lerobot-rollout`. Wenn Sie auf `lerobot-record` bestehen, meldet das Programm direkt einen Fehler und weist Sie darauf hin, auf `lerobot-rollout` umzusteigen.

Die Aufgabenteilung der beiden Befehle ist folgende:

- `lerobot-record`: ist nur für das **Erfassen von Demonstrationsdaten** zuständig (in Schritt 6 wird genau dieses verwendet); es lehnt jetzt Datensatznamen ab, die mit `eval_` beginnen
- `lerobot-rollout`: ist für das **Deployment trainierter Modelle** zuständig und wählt mit `--strategy.type` die Arbeitsweise

## rollout-Befehlsparameter

| Parameter | Beschreibung |
|---|---|
| `--strategy.type` | Arbeitsweise. `base` führt nur das Modell aus und zeichnet keine Daten auf, dient zur Begutachtung vor Ort; `episodic` zeichnet pro episode auf und enthält eine reset-Phase, das Verhalten ähnelt dem alten `lerobot-record` |
| `--policy.path` | Modellpfad, verweist auf `checkpoints/last/pretrained_model` in der Trainingsausgabe |
| `--task` | Aufgabenbeschreibung, wird zusammen mit `--strategy.type=base` verwendet |
| `--duration` | Laufzeit in Sekunden, `0` bedeutet unbegrenzt |
| `--interactive` | Hinzufügen, wenn während des Laufs eingegriffen werden soll; im Terminal kann mit Befehlen wie `/stop`, `/reset` gesteuert werden |
| `--display_data` | Ob die Visualisierungsoberfläche von rerun.io gestartet wird |
| `--policy.device` | Rechengerät, z. B. `cuda`, `cpu` |

## Kameraparameter müssen mit denen bei der Erfassung identisch sein

Alle Befehle unten verwenden für `--robot.cameras` `1280×720@30`; dies ist der mit [Demonstrationsdatensatz erfassen](/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording) abgestimmte Wert. Beim Deployment müssen Auflösung, fps und Seitenverhältnis der Erfassung beibehalten werden: Die Auflösung wird in die Metadaten des Datensatzes geschrieben und fließt in die Validierung ein, bei Abweichung wird direkt ein Fehler gemeldet; selbst wenn es zufällig durchgeht, führt ein unterschiedliches Sichtfeld dazu, dass die vom Modell „gesehene Welt" anders ist als bei Ihrer Demonstration, und die Ergebnisse werden deutlich schlechter.

## Zur Visualisierung

`--display_data=true` startet die Visualisierungsoberfläche von rerun.io und speichert zugleich im Verzeichnis `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` das Bild jedes Frames; dies belegt relativ viel Speicherplatz, bei der regulären Nutzung kann `--display_data=false` gesetzt werden.

## Am Beispiel der Orangen-Greifaufgabe

- Bewertung vor Ort (mit Echtzeit-Visualisierung)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- Bewertung vor Ort (ohne Echtzeit-Visualisierung)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- Inferenz eines Modells im HuggingFace-Modell-Repo

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

Nach dem Ausführen wird das Modell heruntergeladen

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- Evaluieren und Daten aufzeichnen (`--strategy.type=episodic`)

Wenn Sie den Vorgang während des Laufs als Datensatz aufzeichnen möchten, ersetzen Sie `base` durch `episodic`. In diesem Modus wird `--task` nicht geschrieben; stattdessen wird `--dataset.single_task` verwendet, und `--dataset.repo_id` muss angegeben werden:

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
