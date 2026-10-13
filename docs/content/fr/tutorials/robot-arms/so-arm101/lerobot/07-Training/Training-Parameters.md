---
title: "Étape 7 : Recommandations sur les paramètres d'entraînement"
description: "Conseils pratiques pour les paramètres lerobot-train : réduire save_freq permet d'obtenir plus tôt un modèle intermédiaire ; pour des tâches simples (saisir, serrer la main, poser), 20 000 pas suffisent amplement."
---

# Étape 7 : Recommandations sur les paramètres d'entraînement

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

Vous pouvez réduire un peu le paramètre `save_freq` afin que le modèle apparaisse plus tôt après l'entraînement

Pour les tâches simples (saisir, serrer la main, poser), 20K steps d'entraînement suffisent amplement

<RelatedProducts slugs="so-arm101" />
