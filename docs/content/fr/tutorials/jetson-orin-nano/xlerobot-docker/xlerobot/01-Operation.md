---
title: Commandes XLeRobot
---

# Commandes XLeRobot

> **Appartient à :** [xlerobot/](01-Operation.md) — XLeRobot complet (deux bras + châssis)
> **Prérequis :** lire d'abord [deployment/](../deployment/01-Overview.md) et être entré dans le conteneur
> **L'autre chemin :** [lerobot/](../lerobot/01-Operation.md) (bras SO-101 unique / LeKiwi)
> **Suivant :** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **Cette page ne traite que de l'XLeRobot complet** (deux bras + châssis) : comment le faire tourner.

Pour piloter **un bras SO-101 unique** ou un **LeKiwi** avec la ligne de commande `lerobot-*`, allez à
[lerobot/](../lerobot/01-Operation.md) — les deux chemins sont différents.

Contenu de cette page : calibration, téléopération, tableau des touches, enregistrement de données, entraînement, inférence.

---

## 0. Choisissez d'abord votre chemin ⚠️

L'image contient **deux projets** dont les modes de lancement diffèrent. **Consultez d'abord ce tableau pour déterminer votre chemin** :

| Votre matériel | Quel chemin | Entrée |
|---|---|---|
| **XLeRobot complet** (deux bras + châssis) | ✅ **cette page** | Scripts d'exemple du dossier `examples/` |
| **Un bras SO-101 / SO-100 unique** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Ligne de commande `lerobot-*` |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Ligne de commande `lerobot-*` |

**Pourquoi deux chemins** : les outils en ligne de commande `lerobot-calibrate`, `lerobot-record` et `lerobot-teleoperate`
**ne reconnaissent que les types de robots qu'ils importent explicitement** (14 robots d'origine, **sans `xlerobot`**).
En le passant de force, l'erreur suivante s'affiche :

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**L'entrée pour XLeRobot, ce sont les scripts d'exemple du dossier `examples/`** (ils importent directement `XLerobot`).

Les deux chemins **partagent le même environnement** — vous pouvez passer de l'un à l'autre à tout moment, sans rien réinstaller.

> Les fichiers d'exemple mentionnent bien l'usage à deux processus host/client, mais **cette partie est commentée** ;
> en pratique, c'est le **mode direct** qui s'exécute — un seul terminal suffit, inutile de lancer un host séparé.

---

## 1. Avant la première téléopération : installer les deux bibliothèques X11 ⚠️

Deux bibliothèques X11 manquent dans l'image ; **sans elles, la fenêtre de visualisation rerun plante** :

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**Le robot lui-même n'est pas affecté** (la téléopération se poursuit normalement, les touches répondent) : vous ne voyez simplement pas la fenêtre de visualisation,
et le canal de données de rerun sature en émettant des WARN en continu, ce qui ralentit la téléopération.

**Ouvrez un autre terminal** et installez-les dans le conteneur :

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root` ne peut pas être omis** — l'image s'exécute par défaut avec l'utilisateur `jetson`, et `docker exec` vous y connecte
avec cette même identité, alors que l'installation de paquets apt exige les droits root. Sans ce paramètre, l'erreur suivante apparaît :

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

En prime, **les paquets échouent silencieusement à s'installer** et rerun plante tout autant ; il est facile de croire que « l'installation n'a servi à rien ».

Après l'installation, **redémarrez le script de téléopération** (`Ctrl+C` pour quitter, puis relancez-le).

> ⚠️ Cette modification **n'est valable que pour la session en cours** — le conteneur est lancé avec `--rm`, tout disparaît à la sortie ;
> il faut donc réinstaller à chaque redémarrage du conteneur.

---

## 2. Trouver le port série

```bash
lerobot-find-port
```

Il vous demandera de débrancher puis rebrancher le câble des servos, puis affichera le nom du port série (par exemple `/dev/ttyACM0`).

> Cette commande est **interactive** ; un `--help` direct renvoie une erreur EOF, c'est normal.

**XLeRobot utilise deux ports série** (correspondant à `port1` et `port2` dans la configuration) :

| Paramètre | Valeur par défaut | Rôle |
|---|---|---|
| `port1` | `/dev/ttyACM0` | Les deux bras SO-101 + la caméra de tête |
| `port2` | `/dev/ttyACM1` | Servos du châssis (roues) |

Il faut trouver les deux. Les valeurs par défaut sont `/dev/ttyACM0` et `/dev/ttyACM1` ; **si ce n'est pas le cas chez vous,
chaque commande suivante devra préciser `--robot.port1=` / `--robot.port2=`** (voir la section 6).

---

## 3. Calibration : déclenchée automatiquement au lancement des exemples, aucune commande séparée

⚠️ **N'utilisez pas `lerobot-calibrate --robot.type=xlerobot`**. Cet outil en ligne de commande ne reconnaît que
la liste de robots qu'il importe explicitement (so100/so101/lekiwi, etc.) ; la configuration d'XLeRobot **n'y figure pas**,
et l'erreur `invalid choice: 'xlerobot'` s'affiche.

La calibration d'XLeRobot est **intégrée à `XLerobot.connect()`** : lancez n'importe quel exemple et elle démarre automatiquement :

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Ce qu'elle fait :**

- **Aucun fichier de calibration** → la calibration guidée démarre automatiquement :
  1. Il vous est demandé de « placer les servos du bras gauche et de la tête au milieu de leur course, puis d'appuyer sur Entrée »
  2. Puis de « faire parcourir à chaque articulation l'ensemble de sa course, puis d'appuyer sur Entrée pour arrêter »
  3. Idem pour le bras droit et le châssis
- **Fichier de calibration existant** → la question vous est posée : appuyez sur Entrée pour restaurer la calibration, ou saisissez `c` pour recalibrer

Les fichiers de calibration sont stockés dans :

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**Ce répertoire doit être monté depuis la machine hôte**, sinon il faut recalibrer à chaque redémarrage du conteneur :

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> Si vous voulez calibrer uniquement un bras SO-101 seul (et non l'XLeRobot complet), vous pouvez utiliser la commande d'origine :
> le type `so101_follower` figure bien dans la liste blanche du CLI :
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Certains exemples (comme `examples/0_so100_keyboard_joint_control.py`) utilisent des
> **coefficients de calibration écrits en dur dans le code**, plutôt que le processus ci-dessus. Le choix dépend de la variante
> de votre robot et de l'exemple utilisé — jetez d'abord un œil aux commentaires en tête du fichier d'exemple concerné.

---

## 4. Téléopération

**Un seul terminal suffit** (les exemples utilisent le mode direct, pas besoin de lancer un host séparé) :

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Au premier lancement, la calibration guidée démarre automatiquement** (aucune commande de calibration séparée) :

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → Placez les servos du bras gauche et de la tête au milieu de leur course, puis **appuyez sur Entrée**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → Faites parcourir à chaque articulation toute sa course, de bout en bout, puis **appuyez sur Entrée** pour terminer
3. Idem pour le bras droit et le châssis

Ensuite, lorsqu'un fichier de calibration existe, la question vous est posée : appuyez sur Entrée pour restaurer, ou saisissez `c` pour recalibrer.

### Mappage des touches

**Châssis**

| Touche | Action |
|---|---|
| `i` / `k` | Avancer / reculer |
| `j` / `l` | Se déplacer à gauche / à droite |
| `u` / `o` | Pivoter à gauche / à droite |
| `n` / `m` | Accélérer / ralentir (trois niveaux) |
| `b` | Quitter le programme |

**Bras gauche**

| Touche | Articulation |
|---|---|
| `q` / `e` | shoulder_pan (rotation de la base) ± |
| `w` / `s` | x (avant/arrière) ± |
| `a` / `d` | y (gauche/droite) ± |
| `z` / `x` | pitch (inclinaison) ± |
| `r` / `f` | wrist_roll (rotation du poignet) ± |
| `t` / `g` | gripper (pince) ouvrir / fermer |
| `c` | Retour à la position zéro |
| `y` | Parcours rectangulaire (démo/test) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Bras droit**

| Touche | Articulation |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (avant/arrière) ± |
| `4` / `6` | y (gauche/droite) ± |
| `1` / `3` | pitch (inclinaison) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper ouvrir / fermer |
| `0` | Retour à la position zéro |
| `Y` (**majuscule**) | Parcours rectangulaire |

**Autres** : `?` → retour à zéro des servos de la tête

> Les deux bras sont **en miroir** : le gauche utilise la zone alphabétique (`q/e`, `w/a/s/d`), le droit le pavé numérique / la zone des chiffres
> (`7/9`, `4/6`, `8/2`, `1/3`). La touche `reset` diffère aussi — bras gauche `c`, bras droit `0`.
> Attention : la touche du parcours rectangulaire est le `y` minuscule pour le bras gauche, et le `Y` **majuscule** pour le bras droit.

### Autres exemples

| Exemple | Description | Installation supplémentaire ? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | Version à châssis deux roues | Non (mais installez d'abord les deux bibliothèques) |
| `5_xlerobot_teleop_xbox.py` | Manette Xbox | Oui, `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | Module `joyconrobotics` manquant, inutilisable |
| `8_xlerobot_teleop_vr.py` | VR | Nécessite de monter en plus le répertoire XLeVR |

---

## 5. Collecter des données de démonstration

⚠️ `lerobot-record --robot.type=xlerobot` **ne fonctionne pas** (même raison qu'à la section 0).

XLeRobot ne dispose que du chemin d'enregistrement via VR, et celui-ci dépend du module `XLeVR`, absent de l'image.

**Pour l'utiliser, il faut écrire votre propre script**, avec l'API LeRobotDataset (la bibliothèque est dans l'image) :

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<votre-utilisateur>/<nom-du-dataset>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# Dans la boucle de téléopération :
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # obligatoire, sinon les métadonnées ne sont pas écrites sur disque
```

Vous pouvez vous inspirer de `examples/8_vr_teleop_with_dataset_recording.py` dans l'image,
en remplaçant la partie VR par de la téléopération au clavier.

**Pensez à ajouter `-e HF_ENDPOINT=https://hf-mirror.com`**, sinon l'envoi du jeu de données vers le Hub échouera.

> Un piège lors de l'écriture d'un jeu de données : après `save_episode()`, **il faut impérativement appeler `ds.finalize()`**,
> sinon les métadonnées des épisodes ne sont pas écrites sur disque et ne peuvent plus être relues par la suite (erreur
> `Provided directory does not contain any parquet file`).

---

## 6. Que faire si les ports série ne sont pas ACM0/ACM1

Les exemples **n'ont pas d'argparse** : les ports série proviennent des valeurs par défaut de `XLerobotConfig()` :

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Pour spécifier les ports explicitement :

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Après modification, relancez directement (les sources sont montées : modifier les fichiers sur la machine hôte prend effet immédiatement).

---

## 7. Déployer un modèle entraîné

La politique ACT **ne nécessite aucune dépendance supplémentaire** et fonctionne directement dans l'image :

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<votre-utilisateur>/<nom-du-modèle>")
policy.eval()

# Boucle d'inférence une fois le robot connecté
# action = policy.select_action(batch)
```

Politiques déjà préinstallées dans l'image :

| Politique | Dépendances | Remarques |
|---|---|---|
| **ACT** | Aucune | La plus courante, testée et fonctionnelle |
| **Diffusion** | `diffusers` | Nécessite l'image complète |
| SmolVLA / pi0 / groot | transformers | **Non préinstallées** : paquets très volumineux, et inexécutables sur CPU |

> **Impossible d'importer deux variantes de robot dans le même processus** — `xlerobot_mecanum`
> enregistre sa configuration sous le nom `"xlerobot"`, qui entre en collision avec la version de base, d'où l'erreur
> `Cannot register ... already registered`. Un robot n'utilise qu'une seule variante ;
> en séparant les processus, aucun problème.

---

## 8. Entraînement

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset>
```

> `lerobot-train` **n'a pas besoin de `robot.type`** (il ne consomme que le jeu de données et le type de politique),
> donc cette commande fonctionne, sans la restriction de la section 0.
>
> L'entraînement est très exigeant en puissance de calcul. Sur CPU, seules de très petites échelles sont possibles ; pour un usage réel, le GPU d'un Jetson est nécessaire.

---

> **Suivant :** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — à consulter en cas de problème
> **L'autre chemin :** [lerobot/](../lerobot/01-Operation.md) — piloter un bras unique / LeKiwi avec la ligne de commande `lerobot-*`
