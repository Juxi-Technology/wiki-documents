---
title: "Schritt 7: Modell zu HuggingFace hochladen (optional)"
description: "Beschreibt beide Wege, ein trainiertes Modell zu Hugging Face hochzuladen: automatisch während des Trainings oder manuell danach, samt einzelner Checkpoints."
---

# Schritt 7: Modell zu HuggingFace hochladen (optional)

> Dieser Schritt ist optional. Das trainierte Modell liegt auf Ihrem Computer oder Ihrer Cloud-GPU-Instanz und kann direkt für die Inferenz verwendet werden. Nur wenn Sie **das Modell sichern, auf einem anderen Rechner inferieren oder es mit anderen teilen möchten**, müssen Sie es zu HuggingFace hochladen.

## Platzhalter in den Befehlen

Dieser Beitrag verwendet die Platzhalter-Schreibweise aus den vorherigen Kapiteln. Bitte ersetzen Sie sie durch Ihre eigenen Angaben und **entfernen Sie dabei auch die spitzen Klammern**:

- `<Benutzername>`: Ihr HuggingFace-Kontoname
- `<Benutzername>`: der Systembenutzername Ihres Computers; mit `whoami` im Terminal können Sie ihn anzeigen

## Methode 1: Automatisches Hochladen während des Trainings

Fügen Sie dem Trainingsbefehl zwei Parameterzeilen hinzu, dann wird das Modell nach Trainingsende automatisch hochgeladen:

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<Benutzername>/shake_act_a \
```

**Diese beiden Zeilen müssen paarweise auftreten; wenn Sie nur `push_to_hub=true` angeben, tritt ein Fehler auf.** `repo_id` ist der Repository-Name, den Sie diesem Modell geben, in der Form `Kontoname/Modellname`. Existiert das Repository nicht, legt LeRobot es automatisch an.

Zum Beispiel sieht der vollständige Befehl für ACT dann so aus:

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
  --policy.push_to_hub=true \
  --policy.repo_id=<Benutzername>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

Wie im vorherigen Abschnitt beschrieben, erscheint das Modell nach Abschluss dieses Trainingslaufs unter `https://huggingface.co/<Benutzername>/shake_act_a`.

### Auch die Zwischen-Checkpoints mit hochladen

Während des Trainings wird alle `save_freq` Schritte (Standard: 20000) ein Checkpoint gespeichert. Wenn Sie auch diese Zwischen-Checkpoints hochladen möchten (z. B. wenn das Training sehr lange dauert und Sie jederzeit auf ein Zwischenmodell zugreifen wollen), fügen Sie noch diese Zeile hinzu:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

Beim Hochladen erhält jeder Checkpoint ein Tag, das nach der Schrittnummer benannt ist (z. B. `010000`). Wenn Sie später beim Laden des Modells dieses Tag angeben, erhalten Sie die Version mit der entsprechenden Schrittnummer; Details siehe unten unter „Hochgeladenes Modell laden".

### Einige optionale Parameter

Nach Bedarf hinzufügen:

| Parameter | Beschreibung |
|---|---|
| `--policy.private=true` | Repository auf privat setzen, andere können es nicht sehen |
| `--policy.tags=act,so101` | Tags zum Modell hinzufügen, erleichtert die Suche |
| `--policy.license=mit` | Open-Source-Lizenz festlegen |

## Methode 2: Manuelles Hochladen nach Abschluss des Trainings

Dies ist die gebräuchlichere Vorgehensweise: Schreiben Sie beim Training wie gewohnt `--policy.push_to_hub=false`, und laden Sie das Modell erst dann manuell hoch, wenn das Training beendet und das Ergebnis zufriedenstellend ist.

### 1. Anmelden

Wenn Sie bereits ein Token gebunden haben, können Sie diesen Schritt überspringen; andernfalls siehe [Hugging Face-Konto registrieren (optional)](/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

```Shell
hf auth login
hf auth whoami
```

### 2. Hochladen

Angenommen, das Ausgabeverzeichnis des ACT-Trainings ist `~/output_lerobot_train/shake/act/`:

```Shell
export HF_USER=<Benutzername>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

Das Modell-Repository muss nicht vorab erstellt werden; wenn `hf upload` feststellt, dass das Repository nicht existiert, legt es automatisch eines an.

### 3. Checkpoint mit bestimmter Schrittnummer hochladen

Wenn Sie nur einen bestimmten Zwischen-Checkpoint und nicht den letzten hochladen möchten:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Im Web hochladen

Wenn das Modell nicht groß ist und Sie keine Befehle eingeben möchten, können Sie dies auch direkt auf der HuggingFace-Webseite erledigen: Erstellen Sie ein neues Model-Repository und ziehen Sie die Dateien aus dem Verzeichnis `pretrained_model` hinein.

## Hochgeladenes Modell laden

Nach dem Hochladen des Modells genügt es, beim Deployment `--policy.path` darauf zu richten; ein vorheriges Herunterladen auf den lokalen Rechner ist nicht erforderlich:

```Shell
  --policy.path=<Benutzername>/shake_act_a \
```

Dies ist bequemer als ein lokaler Pfad; bei einem Rechnerwechsel oder wenn jemand Ihren Kontonamen erhält, kann das Modell direkt verwendet werden. Beachten Sie, dass zum Abrufen des Modells von HuggingFace eine Verbindung zu dessen Server erforderlich ist; in einer chinesischen Netzwerkumgebung sollte zuerst gemäß [Hugging Face-Konto registrieren (optional)](/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account) ein Mirror eingerichtet werden.

Wenn Sie mehrere Checkpoints hochgeladen haben und angeben möchten, welcher verwendet werden soll, fügen Sie die Versionsnummer hinzu:

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` ist die Schrittnummer des Checkpoints, den Sie hochgeladen haben.

## Hinweise

- Der Repository-Name des Modells (`repo_id`) steht in keinem Zusammenhang mit `--output_dir` und `--job_name` im Trainingsbefehl; er ist unabhängig, wählen Sie einfach einen gut erkennbaren Namen
- In allen Trainingsbefehlen dieses Tutorials steht `--policy.push_to_hub=false`; wenn Sie das automatische Hochladen nutzen möchten, ändern Sie diese Zeile in `true` und ergänzen Sie `--policy.repo_id` – beides ist unverzichtbar

<RelatedProducts slugs="so-arm101" />
