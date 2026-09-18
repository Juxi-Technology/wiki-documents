---
title: "Schritt 7: Trainingsbefehl für pi0"
description: "Beschreibt den Trainingsbefehl für pi0, den stärksten aber speicherhungrigsten Algorithmus: Umgebung, vortrainiertes Basismodell, Befehl und Trainingsverlauf."
---

# Schritt 7: Trainingsbefehl für pi0

## Vor der Ausführung

- **Umgebung**: Legen Sie zunächst gemäß [Konfiguration der Cloud-GPU-Trainingsumgebung](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) eine Instanz an und laden Sie den Datensatz hoch; kehren Sie dann zu diesem Beitrag zurück und führen Sie die Abschnitte „Umgebung installieren" und „Befehl" aus
- **Datensatz**: `--dataset.root=~/lerobot_my_dataset_shake_hands` im Befehl verweist auf den in Schritt 6 erfassten Handschlag-Datensatz. Wenn Sie Ihre eigene Aufgabe trainieren, ersetzen Sie ihn durch Ihren eigenen Datensatznamen
- **Ausgabeverzeichnis**: Falls `--output_dir` bereits existiert, löschen Sie es zuerst mit dem obigen Befehl `sudo rm -rf` oder wählen Sie einen neuen Namen
- **Während des Trainings können Sie die Kurven jederzeit in wandb ansehen**, siehe [Trainingskurven in Echtzeit mit wandb anzeigen](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Referenzdokumentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## Empfohlene Cloud-GPU-Instanz

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## Umgebung installieren

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Befehl

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

Nach dem Ausführen des Befehls startet das Training erst nach 20 Minuten wirklich

Das Modellarchiv umfasst etwa 5G, nach dem Entpacken 7G

<RelatedProducts slugs="so-arm101" />
