---
title: "Modelldateien abrufen"
description: "Zeigt, wie Sie nach dem Training auf der Cloud-GPU die Modelldateien paketieren, als Archiv herunterladen und lokal entpacken, mit dem Handschlag-Beispiel."
---

# Modelldateien abrufen



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Alle 20K step wird eine Modelldatei gespeichert



Rechtsklick zum Herunterladen des Archivs `ckpt.zip`, dann auf dem lokalen Computer entpacken















## Handschlag

```Shell
# Modell, das mit der angegebenen Trainingsschrittnummer gespeichert wurde
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# Das neueste Modell
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



