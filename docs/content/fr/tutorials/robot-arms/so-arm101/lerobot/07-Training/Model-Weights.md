---
title: "Étape 7 : Obtenir les fichiers de poids du modèle"
description: "Empaquetez et téléchargez les fichiers de poids du modèle depuis le cloud GPU vers votre ordinateur local afin de préparer l'étape d'inférence."
---

# Étape 7 : Obtenir les fichiers de poids du modèle

Après l'entraînement sur un cloud GPU, vous pouvez empaqueter le modèle et le télécharger en local :

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Un fichier de poids du modèle est enregistré tous les 20K steps

Faites un clic droit pour télécharger l'archive `ckpt.zip`, puis décompressez-la sur votre ordinateur local

> Si le modèle doit aussi être transmis à quelqu'un d'autre, ou si vous envisagez de changer d'ordinateur pour l'inférence, le téléverser directement sur Hugging Face sera plus simple que de l'empaqueter et le télécharger ; voir [Téléverser le modèle sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload).

## Poignée de main

```Shell
# Modèle enregistré pour un nombre de steps d'entraînement donné
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# Le modèle le plus récent
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
