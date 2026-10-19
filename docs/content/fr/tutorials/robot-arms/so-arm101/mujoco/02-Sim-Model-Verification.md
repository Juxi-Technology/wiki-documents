---
title: "02 · Vérification du modèle de simulation (chargement et pilotage MJCF)"
description: "Les trois modèles MJCF publics du SO-ARM101 ont tous été vérifiés comme utilisables dans ce projet :"
---

# 02 · Vérification du modèle de simulation (chargement et pilotage MJCF)

> Prérequis : avoir terminé [01 Préparation de l'environnement](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment). Ce chapitre ne concerne que la simulation et ne nécessite aucun matériel.

## Sources des modèles

Les trois modèles MJCF publics du SO-ARM101 ont tous été vérifiés comme utilisables dans ce projet :

| Désignation | Fichier | Source |
| --- | --- | --- |
| Officiel – nouveau calibrage | `SO101/so101_new_calib.xml` | dépôt officiel TheRobotStudio/SO-ARM100 (la vérification comparative de ce tutoriel provient de là ; ce dépôt ne fournit pas le zip d'origine) |
| Officiel – ancien calibrage | `SO101/so101_old_calib.xml` | même dépôt (absent du zip, téléchargement nécessaire) |
| Paquet de description ROS2 | `so_arm101_description/mjcf/so_arm101.xml` | pièce jointe du tutoriel dans ce dépôt, `SO-ARM101_ROS2.zip` |

Remarque : la procédure d'extraction du zip était fournie par une ancienne version de `so101_assets.py`, conservée à titre de référence ; depuis le 2026-10-16, le robot simulé a migré vers
**le modèle SO-ARM100 de mujoco_menagerie** (copie locale dans `assets/menagerie_so_arm100/`, raisons et points clés de la migration dans la note de conception de [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Vérification du pilotage et du rendu

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| Paramètre | Description |
| --- | --- |
| `--model` | chemin du modèle MJCF. Le modèle directement utilisable fourni avec le dépôt est `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (pour revérifier les trois modèles historiques du tableau ci-dessus, récupérez-les d'abord dans le dépôt indiqué dans la colonne « Source », puis remplacez le chemin) |
| `--out-dir` | répertoire des artefacts : la vidéo de vérification, les images fixes et le résumé structurel txt y sont écrits (par défaut `out`) |
| `--tag` | préfixe des noms de fichiers d'artefacts, par défaut le nom du fichier de modèle |
| `--settle` / `--fps` / `--width` / `--height` | durée de stabilisation par pose (secondes), fréquence d'images de la vidéo, résolution de rendu ; par défaut 25 fps, 960×720, généralement à ne pas modifier |

Le script produit un résumé structurel (articulations/actionneurs/gains/plages), une vidéo de vérification « balayage des six articulations une par une + sinus coordonné » et des images fixes.
Un exemple de résumé structurel est disponible dans `reports/` (fourni avec le dépôt) ; les vidéos de référence (`media/`) sont volumineuses et ne sont pas distribuées avec le dépôt — la commande ci-dessus permet de les régénérer à tout moment.

## Différences clés entre les trois modèles (mesurées)

| Élément | Officiel – nouveau calibrage | Officiel – ancien calibrage | Paquet de description ROS2 |
| --- | --- | --- | --- |
| Sémantique du zéro | **milieu de course** de l'articulation | position **complètement tendue** à l'horizontale | milieu de course |
| Nom des articulations | `shoulder_pan` | idem | `shoulder_pan_joint` (suffixe) |
| Gain de position | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Unité de la pince | radian, hinge | radian, hinge | **normalisée 0–1** |
| Exclusion d'autocollision | aucune | aucune | oui (6 paires) |

**Erreur de suivi mesurée** : l'erreur de maintien au repos est de 0,0005 rad pour le nouveau calibrage et le paquet de description, contre 0,03 rad pour l'ancien calibrage (affaissement d'environ 1,7°, kp 56 fois plus faible).
Évaluer une même politique en simulation avec un autre modèle donne une dynamique différente ; notez bien quel modèle a été utilisé.

## Comportements du modèle à retenir

1. **La direction positive de `shoulder_lift` pointe vers le bas** : dans les couples moteur, « descendre » correspond à un angle positif ; vérifiez le signe avant toute mise en correspondance de téléopération ou conversion de données.
2. **Le contact avec le sol bloque le mouvement** : à la limite de descente, le bout du doigt touche le sol et est arrêté (le script intègre une protection de 8 cm par rapport au sol qui réduit automatiquement l'amplitude).
3. Le modèle officiel n'a ni caméra ni keyframe ; une variante avec caméra, `so101_new_calib_camera.xml`, existe et pourra servir pour l'enregistrement ultérieur de données visuelles.

<RelatedProducts slugs="so-arm101" />
