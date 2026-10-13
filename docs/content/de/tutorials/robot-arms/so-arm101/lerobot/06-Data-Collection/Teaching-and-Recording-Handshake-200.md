---
title: "Schritt 6: Datensatz durch Vorführen aufnehmen – Handshake 200"
description: "Vollständiges Aufnahmebeispiel: zuerst ein Dataset-Repository auf Hugging Face anlegen, dann mit lerobot-record 200 Handshake-Episoden mit einer Kamera aufnehmen, inklusive Tastatursteuerung und Speicherort."
---

# Schritt 6: Datensatz durch Vorführen aufnehmen – Handshake 200

## Ein Dataset-Repo auf HuggingFace erstellen

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## Einen vorhandenen Datensatz mit demselben Namen löschen (falls vorhanden)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Datensatzaufnahme Shake200

Eine Kamera: einen Datensatz aufnehmen - Mac-Rechner

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake200 \
    --dataset.num_episodes=200 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

## Während der Aufnahme

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

Tastatursteuerung über die Pfeiltasten:
→ (Pfeil nach rechts) Die aktuelle Episode vorzeitig beenden; zur nächsten Episode übergehen.
← (Pfeil nach links) Die aktuelle Episode verwerfen; erneut aufnehmen.
ESC: sofort stoppen, das Video codieren und den Datensatz hochladen.

## Aufnahme abgeschlossen — Speicherverzeichnis des Datensatzes

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
