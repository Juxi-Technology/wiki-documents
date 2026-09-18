---
title: "Schritt 7: Lokales Training unter Ubuntu"
description: "Erklärt das lokale Training mit eigener NVIDIA-Grafikkarte unter Ubuntu: Voraussetzungen, der Trainingsbefehl mit dem ACT-Algorithmus und der Ausgabepfad."
---

# Schritt 7: Lokales Training unter Ubuntu

Dieser Beitrag gilt für den Fall, dass Ihr eigener Computer über eine NVIDIA-Grafikkarte verfügt und keine Cloud-GPU benötigt wird.

## Vor der Ausführung

- **Umgebung**: Installieren Sie diese gemäß [Schritt 1: LeRobot-Umgebung installieren](/de/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu); beim lokalen Training muss der Datensatz nicht an einen anderen Ort übertragen werden
- **Datensatz**: Im folgenden Beispiel wird der in Schritt 6, erster Beitrag, erfasste Datensatz zum Greifen von Orangen `lerobot_my_dataset_a` verwendet; der Pfad ist als absoluter Pfad angegeben, bitte ersetzen Sie ihn durch Ihren eigenen Benutzernamen
- **Training auf dem Mac**: Ersetzen Sie `/home/<你的用户名>/` im Befehl durch `/Users/<你的用户名>/`
- **Ausgabeverzeichnis**: Falls `--output_dir` bereits existiert, wird direkt `FileExistsError` gemeldet; wählen Sie einen neuen Verzeichnisnamen oder fügen Sie `--resume=true` hinzu, um das Training fortzusetzen

## Referenzdokumentation

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Hinweis

Vor dem `` darf nur ein Leerzeichen stehen, danach darf kein Leerzeichen folgen

Wenn der Datensatz lokal vorliegt, muss `--dataset.streaming` auf `false` gesetzt sein, da kein Stream-Reading erforderlich ist

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
