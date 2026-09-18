---
title: "Schritt 7: Trainingsbefehl für ACT"
description: "Stellt den ACT-Trainingsbefehl vor: warum ACT für den Einstieg empfohlen ist, der vollständige Befehl mit dem Handschlag-Datensatz und alle Parameter."
---

# Schritt 7: Trainingsbefehl für ACT

## Vor der Ausführung

- **Umgebung**: Installieren Sie zunächst gemäß [Konfiguration der Cloud-GPU-Trainingsumgebung](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) die Umgebung und übertragen Sie den Datensatz auf die Cloud-GPU. ACT ist in der LeRobot-Basisumgebung enthalten und muss nicht zusätzlich installiert werden
- **Datensatz**: `--dataset.root=~/lerobot_my_dataset_shake_hands` im Befehl verweist auf den in Schritt 6 erfassten Handschlag-Datensatz. Wenn Sie Ihre eigene Aufgabe trainieren, ersetzen Sie ihn durch Ihren eigenen Datensatznamen
- **Ausgabeverzeichnis**: Falls `--output_dir` bereits existiert, wird direkt `FileExistsError` gemeldet; wählen Sie einen neuen Verzeichnisnamen oder fügen Sie `--resume=true` hinzu, um das Training fortzusetzen
- **Während des Trainings können Sie die Kurven jederzeit in wandb ansehen**, siehe [Trainingskurven in Echtzeit mit wandb anzeigen](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Referenzdokumentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## Warum mit dem ACT-Algorithmus beginnen

ACT ist das am meisten empfohlene erste Modell zum Trainieren mit LeRobot; seine Vorteile sind folgende:

- Das Modell ist sehr leichtgewichtig und hat nur achtzig Millionen lernbare Parameter

- Die Trainingskonvergenz ist sehr schnell, auch die Inferenzgeschwindigkeit ist sehr schnell

- Auf einer einzelnen GPU sind Ergebnisse nach einer Stunde Training sichtbar

- Das ACT-Modell selbst ist klein, das Archiv umfasst etwa 200MB, sehr praktisch für Speicherung und Übertragung. Das durch das Training erzeugte Modellarchiv ist etwa 300MB groß (siehe Ende dieses Beitrags)

- Eine Datenerfassung von 30 Runden reicht in der Regel aus

- Kann auf Ubuntu-Hosts, Mac-Computern, Windows-Computern und sogar Raspberry Pi inferiert werden

- Die Inferenzergebnisse am echten Roboter sind recht gut und für einfache Aufgaben wie Greifen, Händeschütteln und Stiftablegen ausreichend

- Der ACT-Algorithmus ist bereits in der Basisumgebung der LeRobot-Bibliothek enthalten, es müssen keine weiteren Bibliotheken installiert werden

## Befehl

```Shell
lerobot-train \
  --dataset.repo_id=<Benutzername>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## Erläuterung des Befehls

Vor dem Zeilenumbruchzeichen `` darf nur ein Leerzeichen stehen, danach darf kein Leerzeichen folgen

|Befehlsparameter|Beschreibung|
|---|---|
|--dataset.repo_id|Repo_ID des HuggingFace-Datensatzes, in der Form `Benutzername/Datensatzname`|
|--dataset.root|Lokaler Pfad des Datensatzes. Wenn der Datensatz bereits lokal heruntergeladen wurde, muss er auf das tatsächliche Verzeichnis verweisen|
|--dataset.revision|Datensatzversion, wurde beim Hochladen des Datensatzes zu HuggingFace angegeben|
|--dataset.streaming|Ob Stream-Reading verwendet wird. Wenn der Datensatz lokal vorliegt, auf `false` setzen, kein Stream-Reading erforderlich|
|--policy.type|Der zu trainierende Algorithmus, z. B. act, smolvla, diffusion, pi0, pi05, pi0_fast, wall_x|
|--output_dir|Verzeichnis, in dem die Trainingsausgabe gespeichert wird|
|--job_name|Name dieses Trainingsauftrags|
|--policy.device|Rechengerät|
|--wandb.enable|wandb-Visualisierung aktivieren|
|--wandb.project|wandb-Projektname|
|--policy.push_to_hub|Das trainierte Modell in die HuggingFace-Cloud hochladen|
|--steps|Trainingsschritte|
|--batch_size|Datenmenge pro Schritt; bei unzureichendem VRAM sollte sie verkleinert werden|

## Trainingsverlauf

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

Das Modellarchiv ist etwa 300MB groß

<RelatedProducts slugs="so-arm101" />
