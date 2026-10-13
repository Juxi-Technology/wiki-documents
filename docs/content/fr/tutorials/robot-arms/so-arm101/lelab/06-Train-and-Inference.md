---
title: "6 · Entraîner et exécuter l'inférence"
description: "Entraîner et exécuter l'inférence avec LeLab : choisissez le jeu de données et le type de politique (ACT en premier), entraînez en local ou via un job cloud Hugging Face, puis déployez sur le bras suiveur."
---

# 6 · Entraîner et exécuter l'inférence

> **Précédent :** [05 Enregistrer un jeu de données](05-Record-Dataset.md)
> **Suivant :** [07 Dépannage](07-Troubleshooting.md)

L'entraînement transforme le jeu de données en une **policy** — un modèle qui associe les images de caméra aux positions d'articulations. L'inférence exécute cette policy sur le bras follower.

## Entraîner

Ouvrez l'onglet **Training** et choisissez :

| Choix | Remarques |
|---|---|
| **Jeu de données** | Un jeu de données local, ou un provenant du Hub |
| **Type de policy** | **ACT** est le premier choix habituel pour un seul bras. Diffusion Policy, SmolVLA et la famille π₀ sont également disponibles |
| **Où exécuter** | Cette machine, ou une tâche cloud Hugging Face |
| **Durée d'entraînement** | Nombre de pas. Surveillez la loss plutôt que de supposer que plus vaut mieux |

L'onglet diffuse le journal d'entraînement et affiche les checkpoints au fur et à mesure de leur écriture.

### Local ou cloud

| | Local | Tâche cloud Hugging Face |
|---|---|---|
| Nécessite | Un GPU sur cette machine | Un compte Hugging Face avec accès |
| Vitesse | Dépend de votre GPU | Machine fixe, choisie par tâche |
| Idéal pour | Petits jeux de données, expérimentations | Exécutions plus longues |

L'option cloud est ce qui permet à un ordinateur portable de suffire pour le reste du flux de travail : enregistrer en local, entraîner à distance.

### Extras de policy

Certains types de policy nécessitent des dépendances que LeLab n'installe pas par défaut. En sélectionner un vous invite à les installer — acceptez et attendez la fin de l'installation en arrière-plan avant de lancer la tâche. Le même mécanisme couvre les extras d'entraînement facultatifs.

## Checkpoints

L'entraînement écrit des checkpoints périodiquement, pas seulement à la fin, si bien qu'une exécution interrompue laisse tout de même un modèle utilisable. Le nom de chaque checkpoint porte son numéro de pas. Essayez-en un plus ancien si la loss s'est mise à grimper.

## Inférence

Ouvrez l'onglet **Inference** :

1. Confirmez que les deux bras sont connectés et calibrés.
2. Sélectionnez la **policy** — un checkpoint local, ou un modèle du Hub.
3. Confirmez les **caméras** et leur **rotation**.
4. Lancez l'inférence, et dégagez l'espace de travail.

### Rotation et association des caméras

**Utilisez la même rotation que pendant l'enregistrement.** C'est la raison la plus fréquente pour laquelle une policy bien entraînée ne fait rien d'utile sur le robot réel, et rien ne vous avertit : 0° et 180° produisent des dimensions d'image identiques.

Il en va de même pour l'**association** des caméras. Si la caméra appelée `wrist` pendant l'enregistrement est désormais une autre caméra physique, la policy voit la mauvaise image.

Si tout cela est correct et que le bras échoue encore, regardez de nouveau le jeu de données — voir [page 5](05-Record-Dataset.md).

### Intervenir

Arrêtez l'inférence avant de tendre la main vers le bras. Une correction que vous faites à la main n'est pas un signal d'entraînement, sauf si vous enregistrez un nouvel épisode et réentraînez.

## Rejeu

Le rejeu réexécute un épisode enregistré sur le bras follower. Il rejoue les positions d'articulations enregistrées, si bien qu'il semble correct même si la policy est mauvaise — il vérifie le matériel et le jeu de données, pas la policy. Utilisez l'inférence pour voir ce que fait la policy.

---

> **Suivant :** [07 Dépannage](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
