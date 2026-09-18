---
title: "Schritt 7: Trainingsbefehl für pi0fast"
description: "Beschreibt den Trainingsbefehl für pi0fast mit schnellerer Inferenz: nötige Zusatzinstallation, Training direkt vom Hugging-Face-Hub und wichtige Parameter."
---

# Schritt 7: Trainingsbefehl für pi0fast

## Vor der Ausführung

- **Umgebung**: Legen Sie zunächst gemäß [Konfiguration der Cloud-GPU-Trainingsumgebung](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) eine Instanz an und laden Sie den Datensatz hoch; kehren Sie dann zu diesem Beitrag zurück und führen Sie die Abschnitte „Umgebung installieren" und „Befehl" aus
- **Datensatz**: Der folgende Trainingsbefehl enthält kein `--dataset.root`; er ruft den Datensatz vom HuggingFace Hub ab, daher muss der Datensatz bereits auf den Hub hochgeladen worden sein. Wenn der Datensatz nur lokal vorliegt, ergänzen Sie gemäß dem Abschnitt „Vorherige Inhalte" am Ende dieses Beitrags `--dataset.root=~/lerobot_my_dataset_shake_hands`
- **Ausgabeverzeichnis**: Falls `--output_dir` bereits existiert, löschen Sie es zuerst mit dem obigen Befehl `sudo rm -rf` oder wählen Sie einen neuen Namen
- **Während des Trainings können Sie die Kurven jederzeit in wandb ansehen**, siehe [Trainingskurven in Echtzeit mit wandb anzeigen](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Referenzdokumentation

https://huggingface.co/docs/lerobot/pi0fast

## Issue

https://github.com/huggingface/lerobot/pull/2203

## Empfohlene Cloud-GPU-Instanz

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Umgebung installieren

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Befehl

- Dateien unter output löschen, die durch einen zuvor unterbrochenen Trainingslauf entstanden sind

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Training

```Shell
lerobot-train \
    --dataset.repo_id=<Benutzername>/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi0_fast \
    --output_dir=output_lerobot_train/shake/pi0_fast_A \
    --job_name=shake_pi0_fast_A \
    --policy.pretrained_path=lerobot/pi0_fast_base \
    --policy.dtype=bfloat16 \
    --policy.gradient_checkpointing=true \
    --policy.chunk_size=10 \
    --policy.n_action_steps=10 \
    --policy.max_action_tokens=256 \
    --steps=50000 \
    --batch_size=8 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project
```

## Vorherige Inhalte

```Shell
lerobot-train \
  --dataset.repo_id=<Benutzername>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0_fast \
  --output_dir=output_lerobot_train/shake/pi0_fast_A \
  --job_name=shake_pi0_fast_A \
  --policy.pretrained_path=lerobot/pi0_fast_base \
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

Etwa 10 Minuten nach dem Start beginnt das Training wirklich

Das Modellarchiv umfasst etwa 5G, nach dem Entpacken 7G

<RelatedProducts slugs="so-arm101" />
