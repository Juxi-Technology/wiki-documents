---
title: "Schritt 7: Modelldateien abrufen"
description: "Zeigt, wie Sie nach dem Training auf der Cloud-GPU die Modelldateien paketieren, als Archiv herunterladen und lokal entpacken, mit dem Handschlag-Beispiel."
---

# Schritt 7: Modelldateien abrufen

Nach dem Training auf der Cloud-GPU können Sie das Modell paketieren und lokal herunterladen:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Alle 20K step wird eine Modelldatei gespeichert

Rechtsklick zum Herunterladen des Archivs `ckpt.zip`, dann auf dem lokalen Computer entpacken

> Wenn das Modell an andere weitergegeben werden soll oder Sie auf einem anderen Computer inferieren möchten, ist das direkte Hochladen zu Hugging Face einfacher als das Paketieren und Herunterladen, siehe [Modell zu HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload).

## Handschlag

```Shell
# Modell, das mit der angegebenen Trainingsschrittnummer gespeichert wurde
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# Das neueste Modell
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
