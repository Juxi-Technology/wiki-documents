---
title: "Recommandations sur les paramètres d'entraînement"
description: "Conseils pratiques sur les paramètres clés de lerobot-train (save_freq, batch_size, steps) et le compromis entre temps d'entraînement et résultats."
---

# Recommandations sur les paramètres d'entraînement



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

Vous pouvez réduire un peu le paramètre `save_freq` pour voir le modèle plus tôt après l'entraînement



Pour les tâches simples (saisir, serrer la main, poser), 20K steps d'entraînement suffisent amplement



