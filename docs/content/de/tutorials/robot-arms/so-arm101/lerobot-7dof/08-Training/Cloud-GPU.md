---
title: "Cloud-GPU-Trainingsumgebung einrichten"
description: "Zeigt die Einrichtung einer Cloud-GPU-Instanz bei Featurize: LeRobot, ffmpeg und wandb installieren sowie den Datensatz hochladen und einbinden."
---

# Cloud\-GPU\-Trainingsumgebung einrichten

## Netzwerk\-Proxy des eigenen Computers deaktivieren

Andernfalls lässt sich die Jupyter\-Kommandozeile möglicherweise nicht öffnen

## Bei der Cloud\-GPU\-Plattform Featurize anmelden

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Treten Sie der Nutzergruppe bei und sagen Sie dem Kundenservice, dass Sie ein Fan von Tongji Zihaoxiong sind, um einen Gutschein zu erhalten

## Eine Cloud\-GPU\-Instanz starten

## Umgebung installieren und konfigurieren

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## Bei wandb anmelden

```Shell
wandb login
API Key kopieren und einfügen, Enter drücken
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Datensatz einbinden

```Shell
Download-Befehl der Instanz kopieren, z. B.:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

Der Datensatz erscheint im Verzeichnis `~`

## Häufigkeit des Speicherns der Gewichte ändern (optional)

`lerobot/src/lerobot/configs/train.py` öffnen

Ändern Sie save\_freq von 20\_000 auf 5\_000

So erhalten Sie die Modelldateien schon in einer früheren Trainingsphase



