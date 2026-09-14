---
title: Mise à niveau 7-DOF du SO-ARM101 et utilisation avec LeRobot
description: "Après transformation du SO-ARM101 de 6 servos en 7 degrés de liberté (ajout d'un wrist_yaw) : correspondance des ID de servos, modifications du code et méthode de remplacement, précautions de calibration, et utilisation avec LeRobot."
---

# Mise à niveau 7-DOF du SO-ARM101 et utilisation avec LeRobot

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

Ce tutoriel s'adresse aux utilisateurs qui, après avoir transformé le **SO-ARM101 de 6 servos en 7 servos**, veulent exécuter tout le flux avec LeRobot (calibration → enregistrement → entraînement → déploiement). Le code de la version modifiée correspondante est basé sur une copie adaptée du code source officiel LeRobot, pour le **bras SO-ARM101 à 7 degrés de liberté** (7 servos STS3215).

**Principales différences avec le SO-101 officiel (6 servos) :**

| ID servo | Nom d'articulation | SO-101 officiel (6-DOF) | Remarque |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Rotation horizontale de l'épaule |
| 2 | `shoulder_lift` | shoulder_lift | Levée de l'épaule |
| 3 | `elbow_flex` | elbow_flex | Flexion du coude |
| 4 | `wrist_flex` | wrist_flex | Inclinaison du poignet (flexion haut/bas) |
| 5 | `wrist_yaw` | —(nouveau) | Lacet du poignet (rotation gauche/droite d'environ 90°), **le servo ajouté cette fois** (inséré entre les anciens n° 4 et 5) |
| 6 | `wrist_roll` | wrist_roll(ID 5→6) | Roulis du poignet, ancien moteur de roulis n° 5, pièce imprimée inchangée, nom inchangé |
| 7 | `gripper` | gripper(ID 6→7) | Pince, ancien ID=6, décalé à 7 après la modification |

> ⚠️ Attention : **les données, fichiers de calibration et modèles déjà entraînés de la version 6 servos sont incompatibles avec la modification 7-DOF** ; il faut tout refaire en suivant ce tutoriel.

## Ordre des données articulaires

Après l'enregistrement, l'ordre des dimensions articulaires de `action` / `observation.state` dans le Parquet est :

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Modifications du montage mécanique

Insérer le nouveau servo `wrist_yaw` et une pièce imprimée entre les anciens n° 4 (`wrist_flex`) et n° 5 (`wrist_roll`) ; les moteurs suivants sont décalés d'une position : ancien moteur de roulis n° 5 → position 6, pince → position 7 (les pièces imprimées de ces deux anciens moteurs restent inchangées).

## Modifications principales du code

1. **Définition des moteurs passée à 7** : ajout de `wrist_yaw(5)` (rotation gauche/droite) ; l'ancien moteur `wrist_roll` passe à l'**ID 6** (toujours le roulis, nom inchangé) ; pince `gripper(6)` → `gripper(7)`. La pince utilise toujours `RANGE_0_100` (degré d'ouverture 0~100), les autres articulations utilisent `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **Plus d'« articulation à tour complet » à la calibration** : le code d'origine codait en dur `wrist_roll` comme articulation à tour complet (0~4095) ; après la modification 7-DOF, les articulations de poignet yaw/roll ont toutes deux des butées mécaniques et ne peuvent pas faire un tour complet — à la calibration, on utilise donc `record_ranges_of_motion()` pour enregistrer la plage de mouvement réelle de **toutes** les articulations.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Utiliser le dépôt modifié ou remplacer les fichiers manuellement

Si vous avez cloné le dépôt de code officiel, remplacez/modifiez les fichiers suivants.

### Option A : utiliser directement le dépôt modifié (recommandé)

Utilisez directement le dépôt de code déjà adapté au 7-DOF, aucune modification manuelle n'est nécessaire.

### Option B : remplacer manuellement après un git clone officiel de lerobot

Écraser **3 fichiers** du clone officiel par ceux du dépôt modifié :

| Fichier du dépôt modifié (source) | À écraser (destination) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | Fichier du même nom dans le clone officiel |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | Fichier du même nom dans le clone officiel |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | Fichier du même nom dans le clone officiel (**correction de commentaire uniquement**, sans impact fonctionnel, remplacement facultatif) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Condition préalable : votre clone officiel doit avoir la même structure que la base du dépôt modifié (version lerobot 2026-08). Si l'écart de version est important, **ne pas écraser les fichiers entiers** : appliquez plutôt les deux modifications manuelles de la section « Modifications manuelles » ci-dessous.

### Modifications manuelles en cas de version différente (deux emplacements seulement)

**① Dictionnaire des moteurs** (un exemplaire dans `so_follower.py` et un dans `so_leader.py`, contenu identique) — remplacer

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

par

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵机,左右旋转
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 号滚动电机,ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Logique de calibration** (la fonction `calibrate()` de chacun des deux fichiers) — supprimer le cas particulier « articulation à tour complet » : remplacer

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

par une seule ligne, pour enregistrer la plage réelle de toutes les articulations :

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

Les raisons de ces modifications et les risques associés sont détaillés dans la section « Précautions de calibration » ci-dessous.

## Précautions de calibration

- **Plus d'« articulation à tour complet »** : le code officiel d'origine codait en dur `wrist_roll` (roulis autour de l'axe de l'avant-bras) comme articulation pouvant tourner sur un tour complet (0~4095) avec plage complète. Après la modification 7-DOF, les articulations de poignet n° 5/6 (`wrist_yaw` / `wrist_roll`) sont toutes deux limitées mécaniquement et ne peuvent pas faire un tour complet.
- **Risque** : si vous conservez le codage en dur officiel du tour complet, le code enverra aux articulations des commandes vers des angles mécaniquement inatteignables, avec un risque de casse ; c'est pourquoi la calibration enregistre désormais manuellement le min/max réel de chaque moteur (correspond à la modification de code ② ci-dessus).
- **Les fichiers de calibration de la version 6 servos sont incompatibles avec le 7-DOF** ; une recalibration complète est obligatoire après la modification.
- Pour le flux de calibration et d'utilisation du bi-bras (double bras follower), voir [Tutoriel SO-ARM101 bi-bras (double suiveur)](./SO-ARM101-Bi-Arm-Tutorial.md).

## Note sur le bi-bras (bi_so_follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/` et `src/lerobot/teleoperators/bi_so_leader/`) ne font qu'envelopper le bras simple avec un préfixe `left_`/`right_`, **sans définition de moteurs**. Tant que les fichiers du bras simple ci-dessus sont correctement modifiés, les commandes bi-bras (`--robot.type=bi_so_follower`) seront automatiquement en 7-DOF. Pour le flux bi-bras complet (calibration, téléopération, enregistrement du dataset, entraînement, déploiement), voir [Tutoriel SO-ARM101 bi-bras (double suiveur)](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
