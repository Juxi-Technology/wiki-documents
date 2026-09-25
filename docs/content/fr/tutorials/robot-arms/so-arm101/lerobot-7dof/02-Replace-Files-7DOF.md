---
title: "Étape 2 : Remplacer les fichiers (adaptation 7DOF)"
description: "Adaptez un clone officiel de lerobot en 7-DOF : code du dépôt (option A) ou remplacement manuel des fichiers (option B), plus deux retouches selon la version."
---

# Étape 2 : Remplacer les fichiers (adaptation 7DOF)

## 1\. Quels fichiers remplacer/modifier si vous partez d'un clone du dépôt officiel

### Option A : utiliser directement le code de ce dépôt (recommandé)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Option B : remplacer manuellement après un git clone officiel de lerobot

Écraser **3 fichiers** du clone officiel avec ceux de ce dépôt :

|Fichier de ce dépôt (source)|À écraser (destination)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|Fichier du même nom dans le clone officiel|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|Fichier du même nom dans le clone officiel|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Condition préalable : votre clone officiel doit avoir la même structure que la base de ce dépôt (version lerobot 2026\-09).
> 
> Si l'écart de version est important, **n'écrasez pas le fichier entier**, appliquez plutôt les deux « modifications manuelles » ci-dessous.
> 
> 

### Modifications manuelles en cas de version différente (deux emplacements seulement)

**① Dictionnaire des moteurs** (un exemplaire dans `so_follower.py` et un dans `so_leader.py`, contenu identique) — remplacer le code d'origine

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

par

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # Nouveau servo, rotation gauche/droite
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # Ancien moteur de roulis n° 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Logique de calibration** (la fonction `calibrate()` de chacun des deux fichiers) — supprimer le cas particulier de l'« articulation à tour complet » : remplacer

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

par une seule ligne, afin d'enregistrer la plage réelle de toutes les articulations :

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Pourquoi : la version d'origine codait en dur `wrist_roll` (roulis autour de l'axe de l'avant-bras) comme une articulation pouvant tourner sur un tour complet (0\~4095) sur toute la plage. Après la modification 7\-DOF, les articulations de poignet n° 5/6 (yaw / roll) **sont toutes deux limitées mécaniquement et ne peuvent pas faire un tour complet** ; imposer un tour complet ferait envoyer par le code des commandes vers des angles mécaniquement inatteignables, avec un risque de casse. Désormais, la calibration enregistre manuellement le min/max réel de chaque moteur.
> 
> 

### Note sur le bi-bras

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) ne font qu'envelopper le bras simple avec un préfixe `left_`/`right_`, **sans définition de moteurs**. Il suffit que **les fichiers du bras simple ci-dessus** soient correctement modifiés pour que les commandes bi-bras (`--robot.type=bi_so_follower`) passent automatiquement en 7\-DOF.

