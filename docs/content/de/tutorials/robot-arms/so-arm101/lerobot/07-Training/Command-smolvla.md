---
title: "Schritt 7: Trainingsbefehl für SmolVLA"
description: "Beschreibt den Trainingsbefehl für SmolVLA: Zusatzabhängigkeiten, Feintuning auf Basis eines vortrainierten Modells oder Training von Grund auf."
---

# Schritt 7: Trainingsbefehl für SmolVLA

## Vor der Ausführung

- **Umgebung**: Legen Sie zunächst gemäß [Konfiguration der Cloud-GPU-Trainingsumgebung](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) eine Instanz an und laden Sie den Datensatz hoch; beachten Sie, dass smolvla zusätzliche Abhängigkeiten benötigt, siehe unten „Umgebung installieren"
- **Datensatz**: `--dataset.root=~/lerobot_my_dataset_shake_hands` im Befehl verweist auf den in Schritt 6 erfassten Handschlag-Datensatz. Wenn Sie Ihre eigene Aufgabe trainieren, ersetzen Sie ihn durch Ihren eigenen Datensatznamen
- **Zwei Trainingsarten**: Feintuning auf Basis eines vortrainierten Modells liefert in der Regel bessere Ergebnisse und konvergiert schneller; beim Training von Grund auf muss kein vortrainiertes Gewicht heruntergeladen werden – wählen Sie nach Bedarf
- **Während des Trainings können Sie die Kurven jederzeit in wandb ansehen**, siehe [Trainingskurven in Echtzeit mit wandb anzeigen](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Referenzdokumentation

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Umgebung installieren

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Feintuning auf Basis eines vortrainierten Modells (empfohlen)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<Benutzername>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Training von Grund auf

```Shell
lerobot-train \
  --dataset.repo_id=<Benutzername>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Modell herunterladen

Das smolvla-Modellarchiv umfasst etwa 1G

<RelatedProducts slugs="so-arm101" />
