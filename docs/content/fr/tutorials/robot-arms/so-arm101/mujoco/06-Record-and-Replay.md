---
title: "06 · Enregistrement et relecture de données"
---

# 06 · Enregistrement et relecture de données

> Prérequis : environnement selon [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment) ; pour enregistrer sur le robot réel, terminez aussi [03](/fr/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration).
> Les ports des commandes (bras suiveur `COM172` / bras meneur `COM124`) sont des exemples ; remplacez-les par ceux relevés au chapitre 03 ; pour `id`, utilisez le nom choisi lors de la calibration.
> Pour le parcours séquentiel complet « démarrage du bras → visionnage des vidéos → entraînement et déploiement », consultez directement [09 Tutoriel d'utilisation complet](/fr/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) ;
> ce chapitre est un manuel de référence pour les paramètres et les mécanismes.

## Modèle de commande d'enregistrement

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 录真机（主动臂 → 真机从动臂）
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/real_run1 \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="pick up the cube" \
    --dataset.video=false --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true

# 录仿真（主动臂 → 仿真从动臂）
#   把 --robot.* 换成: --robot.type=so101_mujoco
# 录仿真（键盘控制）
#   把 --teleop.* 换成: --teleop.type=so101_keyboard --teleop.rate=150
```

## Points clés des paramètres (les pièges à éviter)

| Paramètre | Description |
| --- | --- |
| `--dataset.root` | **root est le répertoire du jeu de données lui-même** (pas un répertoire parent concaténé avec repo_id) ; utilisez un nouveau répertoire à chaque enregistrement |
| `--dataset.repo_id` | en enregistrement local, ce n'est qu'un identifiant ; un vrai `用户名/名字` ne sera nécessaire que pour pousser vers le Hub |
| `--dataset.num_episodes` | nombre d'épisodes à enregistrer dans cette session ; la session se termine automatiquement une fois ce nombre atteint (`q` en cours de route sauvegarde aussi la partie déjà enregistrée) |
| `--dataset.single_task` | chaîne de description de la tâche, écrite dans le champ task de chaque frame ; **le `--task` utilisé à l'entraînement et au déploiement doit correspondre** |
| `--dataset.no_stamp=true` | pas de suffixe d'horodatage, le répertoire et le nom restent stables ; pour réenregistrer sous le même nom, supprimez d'abord l'ancien répertoire |
| `--dataset.episode_time_s` | **limite supérieure** d'un épisode (garde-fou) ; en fonctionnement normal, appuyez sur `→` pour terminer plus tôt |
| `--dataset.reset_time_s` | temps de remise en place non enregistré entre les épisodes ; pendant cette phase, le bras meneur pilote toujours le bras suiveur en temps réel. **Lors d'un enregistrement en simulation, les cubes sont automatiquement téléportés à leur position initiale au début de cette phase** (voir ci-dessous) |
| `--dataset.video` | à activer uniquement si des données caméra sont nécessaires (obligatoire à true pour un jeu de données visuel ; le repli sur pyav a été vérifié comme fonctionnel) |
| `--dataset.rgb_encoder.vcodec` | codec vidéo. **Sur cette machine, l'enregistrement avec deux caméras utilise `h264`** : `record.py` l'injecte par défaut (avec le codec upstream par défaut libsvtav1, l'ouverture simultanée de deux encodages échoue à allouer la mémoire et fait planter toute la session — voir [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) ; si vous le passez explicitement, il n'est plus injecté |
| `--dataset.encoder_threads` | nombre de threads d'encodage. **`record.py` injecte 2 par défaut** : saturer tous les cœurs par défaut rend l'image de simulation nettement saccadée pendant la sauvegarde (voir [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) ; en limitant chaque encodage à 2 threads, la simulation reste fluide pendant la sauvegarde ; si vous le passez explicitement, il n'est plus injecté |
| `--dataset.push_to_hub` | sur cette machine, l'accès direct à HF nécessite un proxy ; gardez false pour l'instant et poussez manuellement après l'enregistrement |

## Touches de contrôle des épisodes (globales, actives pendant tout l'enregistrement)

| Touche | Rôle |
| --- | --- |
| `→` ou `n` | terminer l'épisode en cours (**sauvegarder**) |
| `←` ou `r` | abandonner l'épisode en cours et **réenregistrer sur place** (à utiliser si un épisode ne convient pas, sans redémarrer la session) |
| `q` | terminer toute la session et sauvegarder le jeu de données (**recommandé**) |
| `Esc` | identique à `q` (déconnecte aussi la téléopération au clavier ; la sortie propre a été vérifiée, mais privilégiez `q`) |

**Conseil d'utilisation** : avant de lancer l'enregistrement, placez le bras meneur près de la pose médiane (pour éviter que le segment de convergence où le bras simulé/réel « se précipite » au premier instant soit enregistré) ;
après le début de l'enregistrement, restez immobile une seconde avant de commencer les mouvements.

## Réinitialisation automatique de la scène lors d'un enregistrement en simulation

Lors d'un enregistrement sur le robot réel, la phase « Reset the environment » vous demande de replacer manuellement les cubes. En simulation, le lanceur d'enregistrement (`record.py`)
**téléporte automatiquement les trois cubes à leur position initiale** au début de cette phase (en remettant aussi leur vitesse à zéro) ; ainsi, après avoir appuyé sur `→` à la fin de chaque épisode,
il vous suffit de ramener le bras meneur à sa pose de départ, les cubes se remettent en place automatiquement et l'épisode suivant démarre dans la scène initiale fixe.
Le bras suiveur réel n'a pas ce comportement (placement manuel comme d'habitude) ; `teleoperate.py`/`replay.py` ne sont pas concernés.

## Inspection après enregistrement

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Affiche pour chaque épisode le nombre de frames, la durée, l'amplitude des actions des six articulations et l'erreur de suivi :

- **un épisode avec action span = 0** est un enregistrement vide (personne n'a bougé) : supprimez-le et réenregistrez ;
- **un |action−obs| important au début** correspond au segment de convergence (normal) ; au milieu et à la fin, il est généralement <10 unités.

## Enregistrer des données « avec images » en simulation (caméra wrist)

Le robot simulé permet d'enregistrer la caméra du poignet de la scène (`sim_cam`) comme observation d'image dans le jeu de données :

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

Points clés : `--robot.image_camera=sim_cam` (nom de la caméra) + `--dataset.video=true` (les images passent par l'encodage vidéo, le repli sur pyav a été vérifié).
La caractéristique `observation.images.wrist` (480×640×3) apparaît dans le jeu de données. La résolution et la fréquence d'images se règlent avec
`--robot.image_width/--robot.image_height/--robot.image_fps`.
Lorsque la fenêtre est ouverte (`onscreen=true`, par défaut), en plus de la vue principale, **une fenêtre d'aperçu en temps réel est ouverte pour chaque caméra**
(wrist / vue de dessus, avec une étiquette dans le coin supérieur gauche) ; pendant l'enregistrement, vous pouvez vérifier directement que les deux flux sont corrects. Si vous n'en avez pas besoin, ajoutez
`--robot.preview_cameras=false`. Les fenêtres d'aperçu se rafraîchissent par défaut à **15 Hz** (`--robot.preview_fps` réglable) —
ce sont des affichages d'état et elles n'ont pas besoin de suivre les 50 Hz de la fenêtre principale, ce qui réduit fortement la charge de rendu avec 3 fenêtres à l'écran.

**Scène et caméra de dessus** (depuis le 2026-10-16) : la scène de simulation intègre un espace de travail — plaque de base, cubes de trois couleurs (34 mm), bac de rangement (voir `so101_assets.add_workspace`,
la disposition peut être ajustée visuellement avec `preview_workspace.py`) ; elle comporte aussi une caméra de dessus fixe `top_cam` (le haut de l'image = direction opposée au bras).
Ajoutez `--robot.top_camera=top_cam` pour enregistrer la vue de dessus dans `observation.images.top` (enregistrement simultané de deux caméras) ; pour ne garder que la caméra du poignet, retirez ce paramètre.
L'encodage vidéo en fin d'épisode traite les deux flux en même temps ; un temps d'attente un peu plus long est normal.

## Relecture

```bash
# 仿真空回放（窗口里看轨迹重演）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0

# 真机回放（同款机制，注意周围环境与录制时一致）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/juxi_teleop_run1 --dataset.episode=0
```

> Le point d'entrée officiel `lerobot-replay` ne charge pas les plugins de ce projet ; l'utiliser directement provoque `invalid choice: 'so101_mujoco'` —
> c'est pourquoi on passe systématiquement par le lanceur `replay.py`.

## Format et emplacement du jeu de données

Le jeu de données est au format LeRobotDataset v3 : `action` et `observation.state` sont tous deux des vecteurs à 6 dimensions
(`shoulder_pan.pos … gripper.pos`), identiques aux jeux de données réels officiels et directement utilisables pour un entraînement mixte.

```
examples/so101_mujoco/outputs/datasets/
└── juxi_teleop_run1/   真机键盘遥操（1 回合 / 2430 帧 / 81s）✅ 保留的真机数据
```

> Nettoyage du 2026-10-16 : les anciens enregistrements de simulation (`sim_run2`, `sim_vision_demo`, `sim_vision_run1/2/3`)
> ont tous été supprimés. **Le jeu de données officiel `so101_sim_vision` (deux caméras / 5 épisodes / 10610 frames / 353,8 s / h264)
> a été enregistré le soir même ✅** ; les vidéos par épisode et par caméra sont exportées dans `outputs/videos/so101_sim_vision/`,
> et les planches d'aperçu des deux caméras dans `outputs/renders/sim_vision_epN_dual.png`.

## Relevé des tests de cette session (2026-10-15)

| Session | Contenu | Résultat |
| --- | --- | --- |
| Réel run1 | enregistrement réel par téléopération au clavier | 1 épisode de 81 s, amplitude des six articulations de 75–140 unités, stable à 30 Hz |
| Relecture réelle | rejeu du même épisode | 2430 frames reproduites intégralement, aucune anomalie |
| Simulation run2 | enregistrement en simulation par téléopération au bras meneur | 5 épisodes, 157 s, erreur de suivi <12 unités pour ep1–4 |
| Relecture simulation ep1 | rejeu dans la fenêtre | trajectoire conforme aux manipulations (confirmé) |

## Tests complémentaires (2026-10-16)

| Session | Contenu | Résultat |
| --- | --- | --- |
| Nouveau bras meneur (COM124) | nouvelle calibration (nouveau bras/nouveaux servomoteurs) | ✅ calibration réussie ; la compensation de zéro de `so101_leader_trim` s'adapte automatiquement à la nouvelle calibration |
| Visuel run1 | enregistrement en simulation par téléopération au bras meneur (avec images) | 2 épisodes / 3177 frames / 106 s @ 29,97 Hz ; erreur de suivi ≤2 unités sur toute la durée (seule la première frame présente une convergence de 0,5 s) ; vidéo `observation.images.wrist` intégrée au jeu de données et validée par décodage ✅ |
| Visuel run2 | reprise d'enregistrement avec deux caméras (`--resume`) | ep0 (2776 frames / 92,6 s) intact ; lors de la sauvegarde de ep1, l'encodeur libsvtav1 a provoqué une erreur OOM et fait planter toute la session → passage de l'encodeur à h264 (injecté par défaut par `record.py`) et test de bout en bout réussi (2 épisodes × deux flux encodés) ; les résidus ont été nettoyés, le réenregistrement officiel s'est poursuivi en run3 |
| Visuel run3 | enregistrement officiel avec deux caméras (h264) | 1re session : ep0 (185,2 s / 5554 frames) + ep1 (72,8 s / 2186 frames) intégrés intacts, inspection réussie ; pendant la pause d'encodage entre les sessions, des appuis répétés sur `→` ont déclenché un plantage sur épisode vide (mécanisme et protection dans [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) → poursuite de l'enregistrement des épisodes restants lors d'une session suivante (plan de 5 épisodes) |
| Premier essai d'enregistrement officiel (so101_sim_vision) | deux caméras (h264 + 2 threads + fenêtres d'aperçu à 15 Hz) | lors de la sauvegarde de ep0 (82,3 s / 2469 frames), l'encodeur a échoué à allouer la mémoire et toute la session a planté (commit système presque saturé, voir [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) → ajout d'un **retry automatique en cas d'échec d'encodage** et de la **mise en sourdine de la console** (tous deux vérifiés, 26 tests de fumée réussis) ; réenregistrement officiel après redémarrage de la machine |
| Enregistrement officiel (so101_sim_vision) ✅ | téléopération au bras meneur avec deux caméras, 5 épisodes | **5/5 épisodes intégrés** : 61,5 / 53,4 / 101,1 / 62,4 / 75,4 s, soit 10610 frames @29,97 Hz, 0 tick hors budget, aucun plantage ; actions valides sur les six axes et la pince pendant toute la durée ; vérification par décodage des deux flux vidéo réussie |

<RelatedProducts slugs="so-arm101" />
