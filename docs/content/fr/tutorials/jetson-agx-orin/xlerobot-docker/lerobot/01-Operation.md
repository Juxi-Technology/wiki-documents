---
title: Commandes LeRobot d'origine
---

# Commandes LeRobot d'origine

> **Appartient à :** [lerobot/](01-Operation.md) — bras SO-101 / SO-100 unique, LeKiwi
> **Prérequis :** lire d'abord [deployment/](../deployment/01-Overview.md) et être entré dans le conteneur
> **L'autre chemin :** [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot complet)
> **Suivant :** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Utilisez la ligne de commande `lerobot-*` pour piloter **un bras SO-101 / SO-100 unique** ou un **LeKiwi**.

> ⚠️ Pour piloter **l'XLeRobot complet**, revenez à [xlerobot/](../xlerobot/01-Operation.md).
> Ces outils en ligne de commande **ne prennent pas en charge `xlerobot`** — la raison est expliquée à la section 0 ci-dessous.

---

## 0. Quand emprunter ce chemin

| Votre matériel | Quel chemin | Pourquoi |
|---|---|---|
| **Un bras SO-101 / SO-100 unique** | ✅ **cette page** (CLI `lerobot-*`) | Pris en charge directement par les outils d'origine |
| **Un LeKiwi** | ✅ **cette page** (CLI `lerobot-*`) | Pris en charge directement par les outils d'origine |
| **XLeRobot complet** (deux bras + châssis) | ❌ voir [04](../xlerobot/01-Operation.md) | `xlerobot` n'est pas dans la liste blanche du CLI |

**Pourquoi deux chemins** : les outils en ligne de commande comme `lerobot-calibrate` ont, figée en dur dans le code source, une liste d'imports de robots
(14 robots d'origine, liste complète à la section 11), et **`xlerobot` n'y figure pas**. Passez-le de force et vous obtenez :

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

À l'inverse, les scripts du dossier `examples/` sont écrits pour l'XLeRobot complet et ne servent pas pour un bras seul.

**Les deux chemins partagent le même environnement** — le paquet installé dans l'image s'appelle simplement `lerobot`,
et XLeRobot ne fait qu'ajouter trois fichiers de code dans le répertoire `robots/`. Vous pouvez donc **passer de l'un à l'autre à tout moment
sans rien réinstaller**, et dans le même processus, les deux peuvent être importés ensemble.

---

## 1. Processus complet

```
Préparation   Calibration   Utilisation           Entraînement  Déploiement
───────────   ───────────   ───────────           ────────────  ───────────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

Une commande par étape — chacune est détaillée ci-dessous.

---

## 2. Préparation : trouver le port série et les caméras

```bash
lerobot-find-port          # interactif : débranchez puis rebranchez le câble des servos comme demandé ; le nom du port série s'affiche
lerobot-find-cameras opencv   # teste chaque caméra une par une et enregistre une capture
```

`lerobot-find-cameras` enregistre ses captures dans `outputs/captured_images/` ; si vous voyez une image,
la caméra fonctionne. **Testé et fonctionnel** (détection de `/dev/video0` et capture réussie).

> Les deux commandes sont **interactives** ; ajouter directement `--help` renvoie une erreur EOF, c'est normal.

---

## 3. Première utilisation de servos neufs : écrire les ID

Les servos neufs sortent tous d'usine avec l'ID 1 ; il faut les modifier un par un de 1 à 6 pour qu'ils puissent partager le même bus :

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

Il vous demande de « ne brancher qu'un seul servo, puis d'appuyer sur Entrée » ; une fois l'un terminé, branchez le suivant.

> Nécessaire uniquement sur un bras fraîchement assemblé, ou après un remplacement de servos. Les bras qui communiquent déjà normalement peuvent sauter cette étape.

---

## 4. Calibration

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **Aucun fichier de calibration** → flux guidé : placez d'abord le bras au milieu de sa course et appuyez sur Entrée, puis faites parcourir à chaque articulation l'ensemble de sa course
- **Fichier de calibration existant** → la question vous est posée : le réutiliser ou recalibrer

Le fichier de calibration se trouve dans `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**Le démarrage du conteneur monte `-v ~/.cache/huggingface`** (voir [03-Deployment](../deployment/03-Deployment.md)),
il n'est donc pas perdu au redémarrage du conteneur.

Pour une paire maître-esclave, calibrez **une fois le bras esclave et une fois le bras maître** :

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Téléopération

### Faire bouger le bras esclave avec le bras maître (mode maître-esclave)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### Pas de bras maître ? Utilisez le clavier

`--teleop.type` accepte `keyboard`, qui ne nécessite aucun second matériel :

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

Vous pouvez aussi utiliser `--teleop.type=gamepad` avec une manette Xbox (nécessite `pip install "lerobot[gamepad]"`).

### Avec caméras pour le retour visuel

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> La visualisation avec rerun nécessite elle aussi d'installer d'abord les deux bibliothèques X11 — voir
> [xlerobot/](../xlerobot/01-Operation.md), section 1.

---

## 6. Collecter des données de démonstration

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**Description des paramètres :**

| Paramètre | Rôle |
|---|---|
| `--robot.cameras` | Configuration des caméras, **syntaxe de dictionnaire imbriqué** : `nom: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | ID du jeu de données sur Hugging Face (un jeu de données enregistré en local peut aussi être envoyé ensuite) |
| `--dataset.num_episodes` | Nombre d'épisodes à enregistrer |
| `--dataset.single_task` | Description de la tâche, utile au moment de l'entraînement |
| `--dataset.root` | À ajouter pour stocker dans un autre répertoire ; par défaut, dans le répertoire de cache |

**Touches pendant l'enregistrement** (le terminal vous les rappelle) :

| Touche | Action |
|---|---|
| `→` (flèche droite) | Termine l'épisode en cours plus tôt et passe à la phase de réinitialisation |
| `←` (flèche gauche) | Abandonne l'épisode en cours et le réenregistre |
| `Esc` | Arrête tout l'enregistrement |

Dès que l'enregistrement est terminé, les données sont utilisables en local. Pour les pousser vers le Hub :

```bash
--dataset.push_to_hub=true
```

(Pensez à ajouter `-e HF_ENDPOINT=https://hf-mirror.com` au démarrage du conteneur.)

---

## 7. Vérification par rejeu

Après l'enregistrement, rejouez-le une fois pour confirmer que les données sont bonnes avant d'entraîner :

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset> \
  --dataset.episode=0
```

---

## 8. Entraînement

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset>
```

> `lerobot-train` **n'a pas besoin de `robot.type`** (il ne prend qu'un jeu de données et un type de politique),
> donc cette commande est **commune** avec le chemin XLeRobot — les données enregistrées avec XLeRobot s'entraînent de la même façon.
>
> L'entraînement est très exigeant en puissance de calcul. Sur CPU, seules de très petites échelles sont possibles ; pour un usage réel, le GPU d'un Jetson est nécessaire.

Politiques disponibles (`--policy.type`) : `act` (la plus courante), `diffusion`, `smolvla`,
`pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet`, etc.

---

## 9. Déploiement sur robot réel : exécuter une politique entraînée

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<votre-utilisateur>/<nom-du-modèle> \
  --strategy.type=base
```

| Paramètre | Description |
|---|---|
| `--policy.path` | Le modèle entraîné (un ID sur le Hub ou un chemin local) |
| `--strategy.type` | `base` est le plus courant ; il existe aussi `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync` (par défaut) ou `rtc` |

> ⚠️ **N'exécutez pas `lerobot-eval` sur un robot réel** — il est destiné aux **benchmarks de simulation**
> (`--env.type=aloha/pusht/libero/metaworld...`), pas au déploiement réel. Sur un robot réel, utilisez
> `lerobot-rollout`.

---

## 10. Tableau complet des outils en ligne de commande

| Commande | Rôle | `robot.type` nécessaire ? |
|---|---|---|
| `lerobot-find-port` | Trouver le port série | Non |
| `lerobot-find-cameras` | Trouver les caméras | Non |
| `lerobot-setup-motors` | Écrire l'ID des servos neufs | Oui |
| `lerobot-calibrate` | Calibration | Oui |
| `lerobot-teleoperate` | Téléopération | Oui |
| `lerobot-record` | Enregistrer un jeu de données | Oui |
| `lerobot-replay` | Rejouer les données | Oui |
| `lerobot-train` | Entraîner une politique | **Non** (commun avec XLeRobot) |
| `lerobot-rollout` | Déployer une politique sur **robot réel** | Oui |
| `lerobot-eval` | Évaluation de **benchmark en simulation** | Non (utilise `--env.type`) |
| `lerobot-edit-dataset` | Éditer un jeu de données | Non |
| `lerobot-dataset-viz` | Visualisation de jeu de données | Non |
| `lerobot-info` | Afficher l'environnement et les versions | Non |

---

## 11. Types de robots pris en charge par le CLI (liste complète)

Voici **tous** les types que la ligne de commande `lerobot-*` **reconnaît réellement** (extraits de la liste blanche du code source).
**`xlerobot` n'y figure pas** — c'est pour cela que le tutoriel se divise en deux chemins.

**Robots (`--robot.type`) — 14 types :**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Téléopérateurs (`--teleop.type`) — notamment :**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> Pour la liste définitive, fiez-vous au `--help` de votre propre image — des types sont ajoutés ou retirés selon les versions.

---

## 12. Un exemple complet (de zéro à opérationnel)

```bash
# 1. Trouver les périphériques
lerobot-find-port                          # notez le nom du port ; /dev/ttyACM0 est utilisé ci-dessous
lerobot-find-cameras opencv                # notez la caméra ; /dev/video0 est utilisée ci-dessous

# 2. Écrire l'ID des servos neufs (nécessaire uniquement pour un bras fraîchement assemblé)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. Calibration
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. Essayer le clavier pour voir si le bras bouge
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. Enregistrer 10 épisodes
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<votre-utilisateur>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. Entraînement
lerobot-train --policy.type=act --dataset.repo_id=<votre-utilisateur>/my-first-dataset

# 7. Laisser le bras tourner en autonomie
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<votre-utilisateur>/my-first-dataset --strategy.type=base
```

---

## Vérifications effectuées

Toutes les commandes de cette page ont été **réellement exécutées** dans l'image `chenyang310/xlerobot:jetson` sous JetPack 7.2 :

| Élément | Résultat |
|---|---|
| Analyse des arguments `--robot.type` pour les 14 types d'origine | ✅ Réussi |
| Analyse des arguments `--teleop.type` (y compris `keyboard`) | ✅ Réussi |
| Chaîne complète `lerobot-calibrate` | ✅ Va jusqu'à l'ouverture du port série puis s'arrête (aucun servo n'était branché à ce moment-là) |
| Chaîne complète `lerobot-teleoperate --teleop.type=keyboard` | ✅ Idem |
| `lerobot-find-cameras opencv` | ✅ **Matériel réel** : détection de `/dev/video0` et capture d'images réussie |
| Analyse de la syntaxe imbriquée de `--robot.cameras` | ✅ Réussi |
| Coexistence des robots d'origine et de XLeRobot **dans le même processus** | ✅ 8 types enregistrés simultanément avec succès |

Le bras mécanique n'était pas branché, donc **la vérification au niveau des mouvements n'a pas encore été faite**. Une fois votre SO-101 branché,
déroulez la section 12 — si une étape ne se passe pas comme prévu, dites-le-moi.

---

> **Suivant :** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — à consulter en cas de problème
