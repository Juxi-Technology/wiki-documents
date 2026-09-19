---
title: "Schritt 7: Cloud-GPU-Trainingsumgebung einrichten"
description: "Zeigt die Einrichtung einer Cloud-GPU-Instanz bei Featurize: LeRobot, ffmpeg und wandb installieren sowie den Datensatz hochladen und einbinden."
---

# Schritt 7: Cloud-GPU-Trainingsumgebung einrichten

## Vor dem Training zunächst hier lesen

Der Datensatz wurde bereits in Schritt 6 erfasst; als Nächstes folgt das Training des Modells. Dieser Schritt umfasst drei Dinge, dieser Beitrag behandelt die ersten beiden:

1. **Trainingsumgebung vorbereiten**: Auf der Cloud-GPU-Plattform eine Instanz anlegen und LeRobot, ffmpeg, wandb usw. installieren (dieser Beitrag)
2. **Den Datensatz auf die Cloud-GPU übertragen**: Die in Schritt 6 erfassten Daten liegen noch auf Ihrem eigenen Computer (Abschnitt „Datensatz einbinden" in diesem Beitrag)
3. **Den Trainingsbefehl ausführen**: Zur Auswahl des Algorithmus und zum Einstellen der Parameter siehe die folgenden Beiträge

## Im Tutorial verwendeter Datensatz

In den Trainings- und Inferenzbefehlen wird der **Datensatz für die Handschlag-Aufgabe `lerobot_my_dataset_shake_hands`** verwendet (der dritte Beitrag in Schritt 6 demonstriert genau diesen); der lokale Pfad ist `~/lerobot_my_dataset_shake_hands`. Vergewissern Sie sich vor dem Ausführen des Trainingsbefehls, dass dieses Verzeichnis tatsächlich existiert und der Name vollständig übereinstimmt.

Wenn Sie eine selbst erfasste Aufgabe trainieren möchten, ersetzen Sie einfach alle Vorkommen von `lerobot_my_dataset_shake_hands` im Befehl durch Ihren eigenen Datensatznamen.

## Wie der Trainingsalgorithmus gewählt wird

| Algorithmus | Dokumentation | Merkmale |
|---|---|---|
| ACT | [Trainingsbefehl-ACT](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | Empfohlen für den Einstieg, kleines Modell, schnelles Training; auf einer einzelnen GPU sind Ergebnisse nach einer Stunde sichtbar |
| SmolVLA | [Trainingsbefehl-smolvla](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | Empfohlen für Fortgeschrittene, Feintuning auf Basis eines vortrainierten Modells möglich |
| pi0 | [Trainingsbefehl-pi0](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | Beste Ergebnisse, aber hoher VRAM-Verbrauch und langsames Training |
| pi0.5 | [Trainingsbefehl-pi0.5](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | Verbesserte Version von pi0 |
| pi0fast | [Trainingsbefehl-pi0fast](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | Schnellere Inferenz |

Es wird empfohlen, zunächst mit ACT einen vollständigen Durchlauf durchzuführen und erst nach Vertrautheit auf andere Algorithmen zu wechseln.

## Nach dem Training

- Wenn Sie das trainierte Modell zu Hugging Face hochladen möchten (Sicherung, Rechnerwechsel, Weitergabe an andere), siehe [Modell zu HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- Wenn Sie das Modell auf den lokalen Computer herunterladen möchten, siehe [Modelldateien abrufen](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## Training auf dem eigenen Rechner

Wenn Ihr Computer selbst über eine NVIDIA-Grafikkarte verfügt, können Sie auf die Cloud-GPU verzichten und direkt lokal trainieren, siehe [Lokales Ubuntu-Training](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu).

## Netzwerk-Proxy des eigenen Computers deaktivieren

Andernfalls lässt sich die Jupyter-Kommandozeile möglicherweise nicht öffnen

## Bei der Cloud-GPU-Plattform Featurize anmelden

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## Eine Cloud-GPU-Instanz starten

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> Klicken Sie unten auf „JupyterLab", oben links befindet sich eine Upload-Schaltfläche, hier können Sie Code und Datensatz hochladen
> 
> 

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

# Falls Sie nicht zu Huggingface hochladen und wandb nicht benötigen, ist keine Installation erforderlich
```

> Falls bei der Installation des Modells training fehlt, muss es zusätzlich installiert werden
> 
> `pip install -e ".[training]"`
> 
> 

## Bei wandb anmelden

```Shell
wandb login
API Key kopieren und einfügen, Enter drücken
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Datensatz einbinden

Schritt 1: Komprimieren Sie den in Schritt 6 erfassten Datensatz zu einer Zip-Datei und laden Sie sie in den Bereich „Datensatz" der Cloud-GPU-Plattform hoch (oben links in JupyterLab befindet sich eine Upload-Schaltfläche). Nach der Verarbeitung durch die Plattform erhalten Sie einen Download-Befehl.

Schritt 2: Führen Sie diesen Download-Befehl in der Kommandozeile der Instanz aus und entpacken Sie das Archiv:

```Shell
Download-Befehl der Instanz kopieren, z. B.:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

Der Datensatz erscheint im Verzeichnis `~`.

Nach dem Entpacken können Sie ihn mit `ls ~` überprüfen; der Verzeichnisname muss mit `--dataset.root` im Trainingsbefehl vollständig übereinstimmen (in diesem und den folgenden Beiträgen wird durchgehend `~/lerobot_my_dataset_shake_hands` verwendet). Falls beim Entpacken eine zusätzliche gleichnamige Verzeichnisebene entstanden ist, z. B. `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`, verschieben Sie den Inhalt der inneren Ebene nach außen oder richten Sie `--dataset.root` direkt auf die tatsächliche Ebene.

## Häufigkeit des Speicherns der Gewichte ändern (optional)

`lerobot/src/lerobot/configs/train.py` öffnen

Ändern Sie save_freq von 20_000 auf 5_000

So erhalten Sie die Modelldateien schon in einer früheren Trainingsphase

<RelatedProducts slugs="so-arm101" />
