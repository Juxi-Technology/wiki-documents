---
title: "Obtenir les fichiers de poids du modèle"
description: "Empaquetez et téléchargez les fichiers de poids du modèle depuis le cloud GPU vers votre ordinateur local afin de préparer l'étape d'inférence."
---

# Obtenir les fichiers de poids du modèle



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Un fichier de poids du modèle est enregistré tous les 20K steps



Faites un clic droit pour télécharger l'archive `ckpt.zip`, puis décompressez-la sur votre ordinateur local















## Poignée de main

```Shell
# Modèle enregistré pour un nombre de steps d'entraînement donné
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# Le modèle le plus récent
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



