---
title: "09 · Tutoriel d'utilisation complet (démarrage du bras → jeu de données → visionnage des vidéos → entraînement → déploiement)"
---

# 09 · Tutoriel d'utilisation complet (démarrage du bras → jeu de données → visionnage des vidéos → entraînement → déploiement)

> Manuel opérationnel de bout en bout : suivez-le une fois pour passer de « brancher le bras meneur » à « la politique entraînée travaille toute seule dans la simulation ».
> Exécutez ce document dans l'ordre des chapitres — toutes les dépendances (y compris l'extra `training` pour l'entraînement) sont installées en une seule fois dans [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment),
> sans rien avoir à ajouter en cours de route.
> Prérequis : environnement installé selon [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment), bras meneur calibré selon [03](/fr/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)
> (sur cette machine : `juxi_leader` / COM124). Tous les pièges liés à l'enregistrement sont regroupés dans [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

## 0 · Préparation unique

```bash
# 本机所有 uv 命令都要先设（跨盘缓存特例，见 07）
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
```

Branchez le bras meneur et vérifiez le port série (**il peut changer à chaque branchement**) :

```bash
uv run --frozen python -c "from serial.tools import list_ports; print([p.device for p in list_ports.comports()])"
```

Prévoyez de la place sur le bureau : l'enregistrement ouvre **3 fenêtres** (vue principale + `wrist camera - live` + `top camera - live`).

## 1 · Échauffement en téléopération (recommandé)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

Bougez le bras meneur pour vérifier que le bras simulé suit ; avant de quitter (Ctrl-C), placez le bras meneur **près de la pose médiane**, pour éviter un grand segment de convergence au début de l'enregistrement.

## 2 · Enregistrement (commande principale)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="put the cube in the box" \
    --dataset.video=true --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true
```

Points clés (pour les autres paramètres, voir le tableau des paramètres de [06](/fr/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay)) :

| Élément | Description |
| --- | --- |
| `--dataset.root` | **root est le répertoire du jeu de données lui-même** ; utilisez un nouveau répertoire à chaque session (un répertoire existant du même nom empêche le démarrage) |
| Valeurs par défaut injectées automatiquement | encodage vidéo `h264`, threads d'encodage `2` — `record.py` affiche deux lignes d'avertissement au démarrage ; passer explicitement `--dataset.rgb_encoder.vcodec=...` / `--dataset.encoder_threads=...` permet de les remplacer (raison dans 07) |
| Fenêtres d'aperçu | activées par défaut (15 Hz, désactivables avec `--robot.preview_cameras=false` ; réglables avec `--robot.preview_fps`) |
| `--dataset.video=true` | images des deux caméras intégrées au jeu de données (`observation.images.wrist / top`) ; pour ne garder que la caméra du poignet, retirez `top_camera` |

## 3 · Opérations pendant l'enregistrement

| Touche | Rôle |
| --- | --- |
| `→` ou `n` | terminer l'épisode en cours et sauvegarder |
| `←` ou `r` | abandonner l'épisode en cours et réenregistrer sur place |
| `q` | terminer la session et sauvegarder le jeu de données |

- Après la fin d'un épisode, **les cubes se remettent automatiquement en place** ; il vous suffit de ramener le bras meneur à sa pose de départ ; attendez de voir `Recording episode N` avant de commencer les mouvements de l'épisode suivant.
- Pendant la phase de sauvegarde (quelques dizaines de secondes), la console affiche `[record.py] reset done; saving the episode + encoding videos now` —
  pendant ce temps, **les appuis sur les touches sont ignorés en toute sécurité** (une erreur d'appui n'abîme aucun épisode) ; attendez l'apparition de la ligne `Recording episode` suivante pour agir.
- En cas d'échec d'encodage, un **filet de sécurité par retry automatique** est prévu (message `video encode failed ... retrying once` puis nouvelle tentative automatique après 3 secondes) ; les épisodes déjà sauvegardés ne sont jamais perdus.

## 4 · Inspection

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Comment lire la sortie :

- **les épisodes dont l'action span est entièrement à 0 ou dont la pince est à 0** sont des enregistrements vides/invalides : supprimez-les et réenregistrez ;
- **un `max |act-obs|` élevé au début de chaque épisode** correspond au segment de convergence, c'est normal ; au milieu et à la fin, il doit être inférieur à environ 10 unités.

## 5 · Visionnage des vidéos

```bash
uv run --frozen python examples/so101_mujoco/export_videos.py \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Artefacts :

- `examples/so101_mujoco/outputs/videos/so101_sim_vision/epN_top.mp4`, `epN_wrist.mp4` — **une vidéo lisible par double-clic par épisode et par caméra** ;
- `examples/so101_mujoco/outputs/renders/so101_sim_vision_epN_dual.png` — une planche par épisode (rangée du haut : vue de dessus, rangée du bas : poignet, 6 frames échantillonnées uniformément), pour un contrôle visuel rapide (`--no-strips` permet de l'ignorer).

Le jeu de données contient aussi les vidéos packagées d'origine (plusieurs épisodes concaténés dans l'ordre dans un même fichier) :
`outputs/datasets/so101_sim_vision/videos/observation.images.{top,wrist}/chunk-000/file-000.mp4`.

## 6 · Relecture (facultatif)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0
```

## 7 · Entraînement

```bash
uv run --frozen lerobot-train \
    --policy.type=act \
    --policy.push_to_hub=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --output_dir=examples/so101_mujoco/outputs/train/act_so101_sim_vision \
    --steps=100000 --batch_size=8 --save_freq=20000 --log_freq=200 \
    --num_workers=4 --wandb.enable=false --policy.device=cpu
```

| Point clé | Description |
| --- | --- |
| `--policy.type` | type de politique, **commencez par `act`** (le mieux adapté à cette taille de données et à cette tâche) ; `ls src/lerobot/policies/` permet de voir les autres choix (diffusion / smolvla / pi0, etc.) |
| `--policy.push_to_hub=false` | **obligatoire** — par défaut, il veut pousser vers HuggingFace Hub et, sans `repo_id` configuré, il s'arrête avec une erreur ; pour pousser, remplacez par `--policy.repo_id=你的用户名/模型名` (nécessite d'abord `hf auth login`) |
| `--policy.device=cpu` | `cpu` car cette machine n'a pas de GPU dédié ; sur une machine avec carte NVIDIA, supprimez ce paramètre (cuda est utilisé automatiquement) |
| Artefacts | le répertoire d'entraînement contient `checkpoints/last/pretrained_model/` (le plus récent, **c'est vers lui que pointe le déploiement**) et des instantanés historiques nommés d'après le pas de sauvegarde (par exemple `checkpoints/000012/`) ; le `train_config.json` utilisé pour reprendre l'entraînement se trouve dans `pretrained_model/` |
| Reprise | après une interruption, ajoutez à la commande d'origine : `--resume=true --config_path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model/train_config.json` (le chemin se trouve sous le `--output_dir` de la commande précédente) |

**Vitesse attendue sur cette machine** : environ **2 secondes/pas** en CPU pur (batch 2, deux caméras en 480p ; smoke de 12 pas mesuré : loss passant de 70 à 22, évolution normale).
Cette machine convient donc à la validation de la chaîne sur peu de pas — le `outputs/train/smoke_act` fourni avec le tutoriel est le produit de 12 pas ;
**pour l'entraînement officiel, préférez une machine avec GPU** (ACT demande typiquement de l'ordre de 100 000 pas, la commande est identique).

> Note sur les dépendances : l'extra `training` nécessaire à l'entraînement (accelerate, etc.) est inclus dans l'installation unique de [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment) ;
> ce chapitre ne nécessite aucune étape d'installation supplémentaire.

## 8 · Déploiement (faire travailler la politique seule dans la simulation)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/rollout.py \
    --policy.path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model \
    --strategy.type=base \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --task="put the cube in the box" --duration=30
```

| Point clé | Description |
| --- | --- |
| Paramètres caméra | `--robot.image_camera/--robot.top_camera` **doivent être identiques à ceux utilisés lors de l'enregistrement du jeu de données** (sim_cam + top_cam), sinon la politique ne reçoit pas les images sur lesquelles elle a été entraînée |
| `--task` | identique au `--dataset.single_task` utilisé lors de l'enregistrement |
| `--duration` | durée en secondes après laquelle la session se termine automatiquement (avant la fin, le bras est renvoyé à sa pose initiale puis déconnecté) ; `Ctrl-C` permet aussi d'arrêter en cours de route |
| Pour tester d'abord la chaîne | utilisez le modèle de démonstration fourni avec le tutoriel : `--policy.path=examples/so101_mujoco/outputs/train/smoke_act/checkpoints/last/pretrained_model` (entraîné 12 pas, mouvements quasi aléatoires, uniquement pour valider la chaîne) |
| Déploiement en CPU pur | l'inférence de la politique présente occasionnellement des pics de 0,5 s, avec le message `Control loop is running slower ... than the target FPS` — cela fonctionne en simulation mais avec des à-coups ; pas de problème sur GPU (smoke de 20 s exécuté intégralement, fin normale) |
| Déploiement sur robot réel | remplacez `--robot.*` par le robot réel : `--robot.type=so101_follower --robot.port=COMxx --robot.id=juxi_so101 --robot.use_degrees=false` (prévoyez de l'espace sur le bureau) |
| Autres modes | `--strategy.type=sentry / highlight / dagger / episodic` : enregistrement pendant l'exécution / sauvegarde par touche depuis un tampon circulaire / correction humaine dans la boucle / enregistrement par épisodes, voir `lerobot-rollout --help` |

## Annexe A · Passer à un environnement conda (facultatif)

Ce dépôt utilise par défaut **un `.venv` isolé dans le projet, géré par uv** (voir [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment)) ; les commandes d'exécution doivent porter le préfixe
`uv run --frozen --with mujoco`. Si vous préférez conda, la méthode consiste à **remplacer l'étape de « création de l'environnement » par les trois commandes ci-dessous**,
puis à **retirer le préfixe uv de toutes les commandes** (`python examples/...` s'exécute directement), et `UV_CACHE_DIR` n'est plus nécessaire non plus
(c'est une particularité du cache uv sur un autre disque, sans rapport avec conda) :

```bash
# 一次性：在仓库根目录建好环境（python 版本对齐 01 的 3.12）
conda create -n lerobot-sim python=3.12 -y
conda activate lerobot-sim
pip install -e .            # 安装本仓库 lerobot 及其依赖（含 torch，Windows 上 pip 默认就是 CPU 版）
pip install "mujoco==3.16"  # uv 路线用 --with mujoco 临时提供，conda 路线装成常驻依赖
```

Ensuite, l'enregistrement devient par exemple :

```bash
python examples/so101_mujoco/record.py --robot.image_camera=sim_cam ...
```

Deux points d'attention :

1. **Alignement des versions** : `pip install -e .` laisse pip résoudre les versions lui-même, ce qui ne correspond pas forcément exactement à `uv.lock` ;
   pour obtenir une combinaison identique au caractère près à l'environnement actuellement testé, installez dans l'environnement conda avec uv selon le fichier de verrouillage :

   ```bash
   uv pip sync uv.lock --python "$(conda run -n lerobot-sim python -c 'import sys; print(sys.executable)')"
   pip install "mujoco==3.16"
   ```

2. Le cache de calibration du bras meneur se trouve dans `~/.cache/huggingface/lerobot/calibration/`, indépendamment de l'environnement utilisé ; changer d'environnement n'exige pas de recalibrer.

## Annexe B · Aide-mémoire des pièges fréquents

| Symptôme | En bref |
| --- | --- |
| Impossible d'ouvrir le port série | listez d'abord les ports, le numéro a peut-être changé (étape 0) |
| La console reste silencieuse quelques dizaines de secondes lors de la sauvegarde | l'encodage est en cours, c'est normal ; dès que le message `saving the episode...` apparaît, n'appuyez plus sur les touches |
| L'image saccade occasionnellement pendant l'enregistrement | concurrence pour les ressources d'encodage pendant la fenêtre de sauvegarde ; la boucle de contrôle n'est pas affectée (fiez-vous aux chiffres de cadence), détails dans 07 |
| Un plantage : peut-on récupérer ? | les épisodes déjà sauvegardés ne sont jamais perdus ; reprenez avec `record.py --resume=true ... --dataset.num_episodes=N` |
| `lerobot-train` affiche `'repo_id' argument missing` | il veut pousser vers le Hub par défaut : ajoutez `--policy.push_to_hub=false` (pour pousser, configurez `--policy.repo_id` et lancez d'abord `hf auth login`) |
| Au déploiement, la politique ne bouge pas ou bouge n'importe comment | vérifiez d'abord que `--robot.image_camera/--robot.top_camera` et `--task` correspondent à l'enregistrement ; vérifiez ensuite si l'entraînement n'a porté que sur très peu de pas |

Tous les pièges et solutions (mémoire saturée, OOM d'encodage, épisodes vides, etc.) dans [07 · Problèmes fréquents](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

<RelatedProducts slugs="so-arm101" />
