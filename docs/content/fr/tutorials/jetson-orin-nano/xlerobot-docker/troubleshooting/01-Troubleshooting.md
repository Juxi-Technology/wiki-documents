---
title: Dépannage et aide-mémoire
---

# Dépannage et aide-mémoire

> **Appartient à :** [troubleshooting/](01-Troubleshooting.md)
> **Voir aussi :** [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Problèmes fréquents

### Le port série du robot n'apparaît pas dans le conteneur

```bash
# Vérifier sur la machine hôte que le périphérique existe
ls /dev/ttyACM*
# Vérifier que l'utilisateur est dans le groupe dialout
groups | grep dialout
```

Si vous n'êtes pas dans le groupe, exécutez `sudo usermod -aG dialout $USER` puis **reconnectez-vous**.

### Le téléchargement de l'image se bloque / expire

Le miroir de registre n'est pas configuré. Voir [02-Environment-Setup](../deployment/02-Environment-Setup.md), section 2.

### Le téléchargement des modèles échoue / impossible de joindre huggingface

Configurez `-e HF_ENDPOINT=https://hf-mirror.com`.
Voir [02-Environment-Setup](../deployment/02-Environment-Setup.md), section 4.

### La fenêtre de visualisation rerun plante

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Bibliothèques X11 manquantes. **Le robot lui-même n'est pas affecté**, vous ne voyez simplement pas la fenêtre.
La commande d'installation et les points d'attention figurent en [xlerobot/](../xlerobot/01-Operation.md), section 1 —
le point clé : `docker exec` **doit inclure `-u root`**.

### Dans le conteneur, `torch.cuda.is_available()` renvoie False

Le GPU est obligatoire, il s'agit donc toujours d'un problème de configuration — vérifiez les deux points :

- Vous avez démarré le conteneur avec `--device nvidia.com/gpu=all` — **et non `--runtime nvidia`**,
  qui n'injecte pas les nœuds de périphériques
- La spécification CDI existe sur la machine hôte (`/etc/cdi/nvidia.yaml`) — voir
  [03-Deployment §4](../deployment/03-Deployment.md)

### Le conteneur ne démarre pas, erreur CDI

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

Le service d'actualisation automatique de la machine hôte a généré une spécification référençant un `card0` inexistant. Pour corriger :

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(Ce problème se reproduit à chaque redémarrage.)

### La calibration doit être refaite à chaque fois

Les fichiers de calibration sont stockés dans le conteneur et disparaissent dès que celui-ci est supprimé. Montez le répertoire de cache au démarrage :

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` le fait déjà.

### La commande de calibration renvoie `invalid choice: 'xlerobot'`

Ce n'est pas une panne, c'est voulu. L'outil en ligne de commande `lerobot-calibrate` ne prend pas en charge XLeRobot ;
la calibration se déclenche automatiquement dans les scripts d'exemple. Voir [xlerobot/](../xlerobot/01-Operation.md), sections 0 et 3.

### Une longue série d'erreurs torchcodec lors des opérations sur les jeux de données

Si vous utilisez un environnement **installé par vous-même** plutôt que l'image, vous pouvez voir apparaître
`libnvrtc.so.13: cannot open shared object file`. C'est torchcodec qui ne parvient pas à se charger dans un
environnement purement CPU ; lerobot bascule automatiquement sur pyav, sans impact sur les fonctionnalités.
Dans l'image, torchcodec a déjà été désinstallé, donc cette erreur ne s'y produit pas.

### Erreur lors de l'`import` de deux variantes de robot dans le conteneur

```
Cannot register ... as xlerobot because ... is already registered
```

Cela ne se produit qu'entre **la paire `xlerobot` et `xlerobot_mecanum`** — les deux s'enregistrent sous `"xlerobot"` dans le
code source (la config de mecanum a été copiée et son nom d'enregistrement n'a jamais été modifié). C'est un bug en amont d'XLeRobot.

**Toutes les autres combinaisons fonctionnent** : tous les robots du LeRobot d'origine + XLeRobot peuvent **coexister dans le même processus**
(8 types enregistrés simultanément avec succès en test), et `xlerobot_2wheels` n'entre pas en conflit non plus.

Un robot n'utilise jamais qu'une seule variante, donc l'usage réel n'est pas affecté. Si vous avez vraiment besoin des deux en même temps
(par exemple pour écrire un script de comparaison), exécutez-les dans des processus séparés.

---

## Problèmes avec les commandes `lerobot-*` d'origine

### `lerobot-record` renvoie une erreur liée aux caméras / les données enregistrées ne contiennent pas d'images

Les caméras doivent être passées via `--robot.cameras` en **dictionnaire imbriqué**, et non en paramètres de premier niveau séparés :

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Notez qu'il s'agit de `index_or_path` (et non `index`) ; `front` est le nom de la caméra, et vous pouvez en définir plusieurs.
Pour un exemple complet, voir [lerobot/](../lerobot/01-Operation.md), section 6.

### `lerobot-eval` ne fonctionne pas sur un robot réel

`lerobot-eval` est destiné aux **benchmarks de simulation** (`--env.type=aloha/pusht/libero/metaworld...`) ;
ce n'est **pas un outil de déploiement sur robot réel**.

Pour exécuter une politique entraînée sur un robot réel, utilisez **`lerobot-rollout`** :

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<votre-utilisateur>/<nom-du-modèle> --strategy.type=base
```

### Impossible de choisir entre `examples/` et `lerobot-*`

| Votre matériel | Quoi utiliser |
|---|---|
| XLeRobot complet (deux bras + châssis) | Scripts `examples/` → [xlerobot/](../xlerobot/01-Operation.md) |
| Un bras SO-101 / SO-100 unique, LeKiwi | Ligne de commande `lerobot-*` → [lerobot/](../lerobot/01-Operation.md) |

Le critère est simple : la liste blanche de robots de `lerobot-*` **ne contient pas `xlerobot`** (liste complète dans
[lerobot/](../lerobot/01-Operation.md), section 11).

### `--robot.type` est passé mais renvoie `invalid choice`

Comparez avec la liste complète de la section 11 de [lerobot/](../lerobot/01-Operation.md) —
seuls ces 14 types d'origine sont acceptés. `xlerobot` n'en fait pas partie ; utilisez les scripts du dossier `examples/`.

---

## Référence rapide

### Général (les deux chemins)

```bash
# Télécharger l'image
docker pull chenyang310/xlerobot:jetson

# Démarrage
bash scripts/run.sh jetson

# Après être entré dans le conteneur — première configuration
lerobot-find-port                     # trouver le port série (interactif ; débrancher/rebrancher le câble des servos comme demandé)

# Installer les deux bibliothèques X11 nécessaires à rerun (dans un autre terminal ; -u root obligatoire)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# Entraînement (commun aux deux chemins : robot.type n'est pas nécessaire)
lerobot-train --policy.type=act --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset>

# Autotest
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot complet (deux bras + châssis)

```bash
# Téléopération : un seul terminal suffit, la calibration guidée démarre automatiquement au premier lancement
python examples/4_xlerobot_teleop_keyboard.py

# Version châssis deux roues
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ N'utilisez pas lerobot-calibrate / lerobot-record / lerobot-teleoperate avec xlerobot :
#    il est absent de la liste blanche, vous n'obtiendrez qu'un invalid choice. XLeRobot passe par les scripts examples/.
```

Voir en détail [xlerobot/](../xlerobot/01-Operation.md).

### B · Un bras SO-101 unique / LeKiwi (ligne de commande `lerobot-*`)

```bash
# Trouver les périphériques
lerobot-find-port
lerobot-find-cameras opencv

# Écrire l'ID des servos neufs (nécessaire uniquement pour un bras neuf)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# Calibration
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# Téléopération (clavier, sans bras maître)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# Enregistrer un jeu de données
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# Vérification par rejeu
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<votre-utilisateur>/<nom-du-dataset> --dataset.episode=0

# Déployer la politique entraînée sur robot réel (⚠️ pas lerobot-eval, qui sert à la simulation)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<votre-utilisateur>/<nom-du-modèle> --strategy.type=base
```

Voir en détail [lerobot/](../lerobot/01-Operation.md).

### Référence rapide des touches

| Partie | Touches | Action |
|---|---|---|
| Châssis | `i` `k` `j` `l` | Avant / arrière / gauche / droite |
| Châssis | `u` `o` `n` `m` | Pivoter à gauche / à droite / accélérer / ralentir |
| Châssis | `b` | Quitter |
| Bras gauche | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Bras gauche | `r/f` `t/g` `c` `y` | wrist / pince / retour à zéro / parcours rectangulaire |
| Bras gauche | `<` `>` `,` `.` | servos de la tête 1 / 2 |
| Bras droit | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Bras droit | `/` `*` `+` `-` `0` | wrist / pince / retour à zéro |
| Bras droit | `Y` (**majuscule**) | Parcours rectangulaire |
| Autres | `?` | Retour à zéro de la tête |

Explications complètes en [xlerobot/](../xlerobot/01-Operation.md), section 4.

---

## Annexe : pourquoi ce tutoriel présente les choses ainsi

| Décision | Raison |
|---|---|
| Python 3.12 obligatoire | lerobot 0.6.2 utilise la syntaxe PEP 695 (`type X = ...`, `class Foo[T]:`) ; avec 3.10/3.11, même la compilation échoue |
| Miroir de registre obligatoire en Chine continentale | La connexion directe à Docker Hub expire ; constaté en pratique : `context deadline exceeded` |
| HF_ENDPOINT obligatoire | `huggingface.co` est totalement inaccessible depuis la Chine continentale ; `hf-mirror.com` fonctionne |
| CDI plutôt que `--runtime nvidia` sur Jetson | Dans l'environnement cgroup v2 de JetPack 6/7, `--runtime nvidia` n'injecte pas les nœuds de périphériques |
| Pas d'installation de la bibliothèque de cinématique placo | Elle n'a pas de wheel cp312/aarch64 ; XLeRobot utilise sa propre IK analytique et n'en dépend pas |

---

## Liens utiles

- [Projet XLeRobot](https://github.com/Vector-Wangel/XLeRobot)
- [Documentation officielle LeRobot](https://huggingface.co/docs/lerobot)
- [Utilisation et limites de Docker Hub](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Retour au début :** [deployment/01-Overview](../deployment/01-Overview.md)
> **L'autre chemin :** [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
