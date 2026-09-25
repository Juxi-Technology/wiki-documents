---
title: "Tutoriel du bras SO-ARM101 à 7 axes"
description: "Avant le cours 7-DOF : vérifiez vos servos et articulations, les différences avec le bras 6 servos, puis choisissez la méthode de remplacement des fichiers."
---

# Tutoriel du bras SO\-ARM101 à 7 axes

# SO\-ARM101 7\-DOF · Préparation avant exécution

> Ce document s'adresse à ceux qui, après avoir transformé le **SO\-ARM101 de 6 servos en 7 servos**, exécutent tout le flux avec LeRobot (calibration → enregistrement → entraînement → déploiement).
> Code correspondant : ce dépôt (`lerobot-7dof`), un fork du lerobot officiel qui ne modifie que la configuration des moteurs SO.
> 
> 

---

## 0\. Vérifiez d'abord votre bras

7 servos (tous des STS3215), correspondance entre les ID de servo et les articulations :

|**ID de servo**|**Nom d'articulation**|**Remarque**|
|---|---|---|
|1|`shoulder_pan`|Rotation horizontale de l'épaule|
|2|`shoulder_lift`|Levée de l'épaule|
|3|`elbow_flex`|Flexion du coude|
|4|`wrist_flex`|Inclinaison du poignet (flexion haut/bas)|
|5|`wrist_yaw`|Lacet du poignet (rotation gauche/droite d'environ 90°) · **le servo ajouté cette fois** (inséré entre les anciens n° 4 et 5)|
|6|`wrist_roll`|Roulis du poignet · ancien moteur de roulis n° 5, ID 5→6, pièce imprimée inchangée, nom inchangé|
|7|`gripper`|Pince · ancien ID=6, décalé à 7 après la modification|

Ordre des données articulaires (ordre des dimensions articulaires de `action` / `observation.state` dans le Parquet après l'enregistrement) :
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Attention : **les données, fichiers de calibration et modèles déjà entraînés de la version 6 servos sont incompatibles avec ce dépôt** ; il faut tout refaire en suivant les étapes ci-dessous.

---

## 1\. Quels fichiers remplacer/modifier si vous partez d'un clone du dépôt officiel

### Option A : utiliser directement le code de ce dépôt (recommandé)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Option B : remplacer manuellement après un git clone officiel de lerobot

Écraser **3 fichiers** du clone officiel avec ceux de ce dépôt :

|Fichier de ce dépôt (source)|À écraser (destination)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|Fichier du même nom dans le clone officiel|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|Fichier du même nom dans le clone officiel|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|Fichier du même nom dans le clone officiel (**correction de commentaire uniquement**, sans impact fonctionnel, remplacement facultatif)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <clone officiel>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clone officiel>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Condition préalable : votre clone officiel doit avoir la même structure que la base de ce dépôt (version lerobot 2026\-08). Si l'écart de version est important, **n'écrasez pas les fichiers entiers** et appliquez plutôt les deux « modifications manuelles » ci-dessous.
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

`bi_so_follower / bi_so_leader (src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/) ne font qu'envelopper le bras simple avec un préfixe left_/right_,`**`sans définition de moteurs`**`. Il suffit que `**`les fichiers du bras simple ci-dessus`**` soient correctement modifiés pour que les commandes bi-bras (--robot.type=bi_so_follower) passent automatiquement en 7-DOF.`

## 1. Installer LeRobot

- [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Remplacer les fichiers (adaptation 7DOF)

- [Remplacer les fichiers (adaptation 7DOF)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Port série

- [Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Calibration

- [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Téléopération

- [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Téléop. caméra

- [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Collecte données

- [Revisionner et rejouer le dataset](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Points d'attention pour la collecte de dataset](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Créer un compte Hugging Face (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Téléverser le dataset sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Collecte du dataset par démonstration - Poignée de main 200](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Collecte du dataset par démonstration](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Entraînement

- [Configuration de l'environnement d'entraînement sur cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Commande d'entraînement - ACT (recommandé pour débuter)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Commande d'entraînement - Diffusion](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Commande d'entraînement - pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Commande d'entraînement - pi0 (meilleurs résultats)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Commande d'entraînement - pi0fast](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Commande d'entraînement - smolvla (recommandé pour progresser)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Téléverser le modèle sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Algorithmes d'apprentissage par imitation pris en charge par LeRobot](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Entraînement local sur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Obtenir les fichiers de poids du modèle](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Recommandations sur les paramètres d'entraînement](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [Consulter les courbes d'entraînement en temps réel avec wandb](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Inférence

- [Description de la ligne de commande](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Commande d'inférence - ACT](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Commande d'inférence - Diffusion](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Commande d'inférence - pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Commande d'inférence - pi0](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Commande d'inférence - smolvla](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Bugs courants et solutions](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [Inférence sur NVIDIA DGX Spark](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [Inférence sur D-Robotics RDK S100](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
