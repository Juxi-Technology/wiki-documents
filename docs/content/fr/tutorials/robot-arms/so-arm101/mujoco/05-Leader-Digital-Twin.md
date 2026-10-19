---
title: "05 · Jumeau numérique du bras meneur (le bras physique pilote le bras simulé)"
description: "Déplacez à la main le bras meneur physique pour que le bras suiveur simulé dans la fenêtre MuJoCo le suive en miroir en temps réel — la bonne façon de faire …"
---

# 05 · Jumeau numérique du bras meneur (le bras physique pilote le bras simulé)

Déplacez à la main le **bras meneur physique** pour que le **bras suiveur simulé dans la fenêtre MuJoCo** le suive en miroir en temps réel — la bonne façon de faire une démonstration de jumeau numérique
et de collecter des données en simulation.

## Prérequis

Le bras meneur est calibré (voir [03](/fr/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)) ; le port d'exemple est `COM124` (valeur mesurée sur le bras meneur actuellement utilisé sur cette machine,
il peut changer à chaque branchement, remplacez-le après vérification au chapitre 03).

## Commande

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

- `--robot.type=so101_mujoco` : l'objet piloté est le bras simulé, la fenêtre s'ouvre automatiquement ;
- `--teleop.*` : le dispositif de commande est le bras meneur physique (lecture seule, aucun couple n'est jamais appliqué, risque nul pour le bras meneur) ;
- `--teleop.use_degrees=false` : **obligatoire**. Aligne les unités émises par le bras meneur (proportion de course) sur celles du bras simulé.

Remplacez `--robot.type` par `so101_follower --robot.port=COM172 --robot.id=juxi_so101 --robot.max_relative_target=5`
pour passer à la configuration classique du kit « bras meneur physique → bras suiveur réel » ; la même calibration du bras meneur s'applique.

## Que faire si le zéro est décalé : ajustement automatique du centre (`so101_leader_trim`)

**Symptôme** : le bras meneur est placé à une position « visuellement médiane », mais le bras simulé est décalé de quelques degrés.

**Principe** : le zéro normalisé de lerobot = **le milieu de la plage enregistrée lors du balayage de calibration**, `(min+max)/2` ; or la « pose médiane » au moment de l'appui sur Entrée pendant la calibration
est enregistrée comme valeur brute 2048. Dès qu'une articulation a une course mécanique asymétrique, les deux « milieux » diffèrent toujours d'une quantité fixe
(mesure sur le servomoteur n° 1 : plage enregistrée 776–3457, milieu 2116, soit 68 counts d'écart avec 2048 ≈ **5,6°**).
**Cet écart ne disparaît pas avec une nouvelle calibration** (l'asymétrie de course est déterminée par la structure mécanique) ; il doit être compensé logiciellement.

**Solution** : le plugin `so101_leader_trim` calcule automatiquement la compensation de chaque articulation à partir du fichier de calibration selon la formule, puis la soustrait en temps réel ;
après une nouvelle calibration, il s'adapte automatiquement, sans réglage manuel :

```
补偿ᵢ = (2048 − minᵢ) / (maxᵢ − minᵢ) × 200 − 100
```

Valeurs effectives mesurées sur cette machine (affichées dans le journal de démarrage) :

| Articulation | Compensation (unités) |
| --- | --- |
| shoulder_pan | −5.11 |
| shoulder_lift | −0.92 |
| elbow_flex | +2.54 |
| wrist_flex | +0.69 |

Les autres articulations ont un écart <0.05 et ne nécessitent aucune compensation ; la pince (0 à 100) et le mode en degrés ne participent pas à l'ajustement.

> Note pour les développeurs : le `name` de ce plugin doit rester `"so_leader"` — `name` est la clé de recherche du répertoire des fichiers de calibration ;
> un nom de type personnalisé empêcherait de trouver le fichier de calibration et déclencherait à tort une nouvelle procédure de calibration.

<RelatedProducts slugs="so-arm101" />
