---
title: "5 · Enregistrer un jeu de données"
description: "Enregistrer un jeu de données dans LeLab : définissez le repo_id, la description de la tâche, le nombre d'épisodes et les caméras sur la page Recording, puis capturez les démonstrations en LeRobotDataset."
---

# 5 · Enregistrer un jeu de données

> **Précédent :** [04 Téléopération](04-Teleoperation.md)
> **Suivant :** [06 Entraîner et exécuter l'inférence](06-Train-and-Inference.md)

Un jeu de données est un ensemble d'**épisodes**, chacun étant une démonstration unique de la tâche du début à la fin. L'enregistrement, c'est la téléopération plus une commande d'enregistrement.

## Configuration

Ouvrez l'onglet **Recording** et renseignez :

| Champ | Ce qu'il faut y mettre |
|---|---|
| **Nom du jeu de données** (`repo_id`) | `your-name/task-name`, par ex. `juxi/pick-up-the-cube`. La partie `name/` doit être votre nom d'utilisateur Hugging Face si vous prévoyez de le téléverser |
| **Description de la tâche** | Une phrase, par ex. `pick up the cube and drop it in the box`. C'est le texte sur lequel la policy est conditionnée |
| **Épisodes** | Combien de démonstrations — voir ci-dessous |
| **Caméras** | Quelles caméras configurées inclure, et à quelle résolution et fréquence d'images |

### Combien d'épisodes

**30 à 50** pour un simple pick-and-place. Une tâche très répétitive en demande moins ; une tâche très variée en demande plus.

La cohérence compte plus que le nombre : la même position de départ, le même cadrage de caméra et la même description de tâche pour chaque épisode. Cinquante démonstrations quasi identiques valent mieux que cent démonstrations variées. Ne faites varier que ce à quoi vous voulez que la policy soit robuste — si chaque épisode commence avec le cube au même endroit, la policy apprend cet endroit.

## Pendant l'enregistrement

| Touche | Action |
|---|---|
| `SPACE` ou `→` | Termine l'épisode en cours, démarre le suivant |
| `DEL` ou `←` | Abandonne l'épisode qui vient d'être enregistré et le refait |

L'onglet affiche un compteur d'épisodes et un compteur de sessions.

Terminez l'épisode lorsque la tâche est accomplie — pas après que le bras est revenu au départ. Le retour concerne l'épisode suivant.

Refaites un épisode quand vous avez mal manipulé le bras, déplacé l'objet par accident ou pas terminé la tâche. La policy apprend de tout ce qui se trouve dans le jeu de données, y compris des erreurs.

## Arrêter

Arrêtez la session une fois que vous avez assez d'épisodes. **L'enregistrement est finalisé quand vous arrêtez** — c'est à ce moment que l'index du jeu de données est écrit. Une session tuée en plein épisode peut laisser un jeu de données qui se lit comme incomplet.

## Où vont les données

Par défaut sous `~/.cache/huggingface/lerobot/`, indexé par le `repo_id` que vous avez choisi. Rien n'est téléversé avant que vous ne le poussiez depuis l'onglet **Upload**.

## Vérifier l'enregistrement

Ouvrez l'onglet **Datasets** et sélectionnez le jeu de données. Vous pouvez parcourir les épisodes image par image, une caméra à la fois, avec une courbe de mouvement des articulations.

Faites-le avant l'entraînement. Cela révèle ce qui est invisible quand vous tenez le bras :

- Une caméra mal orientée — les images sont sur le côté
- Un épisode avec un temps mort au début
- Une caméra de poignet sortie du cadre en cours de route

Un nouvel enregistrement coûte quelques minutes ; le découvrir après l'entraînement coûte la session d'entraînement.

---

> **Suivant :** [06 Entraîner et exécuter l'inférence](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
