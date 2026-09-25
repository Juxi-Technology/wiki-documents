---
title: "Datensatz durch Demonstration erfassen-Handschlag 200"
description: "Ein durchgerechnetes Beispiel: ein Datensatz-Repository auf Hugging Face anlegen und 200 Handschlag-Episoden mit lerobot-record auf dem 7-DOF-Arm aufzeichnen."
---

# Datensatz durch Demonstration erfassen\-Handschlag 200

## Dataset\-Repo auf HuggingFace erstellen

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Vorhandenen gleichnamigen Datensatz löschen (falls vorhanden)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Erfassung des Datensatzes Shake200

Eine Kamera, Datensatz erfassen\-Mac\-Computer

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

## Bei der Erfassung

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

Bedienung über die Pfeiltasten der Tastatur:
→ (Pfeil rechts) Bricht das aktuelle episode vorzeitig ab; weiter zum nächsten episode.
← (Pfeil links) Verwirft das aktuelle episode; nimmt neu auf.
ESC: sofortiger Stopp, Videos werden kodiert und der Datensatz wird hochgeladen.

## Erfassung abgeschlossen, Speicherverzeichnis des Datensatzes

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



