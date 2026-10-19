---
title: "01 · Préparation de l'environnement"
description: "Opération unique."
---

# 01 · Préparation de l'environnement

Opération unique. Ce dépôt utilise **uv pour gérer un `.venv` isolé dans le projet** — `uv run` n'utilise que l'environnement de ce répertoire
et ne touche pas à votre conda (ce choix est délibéré, voir [07 Problèmes fréquents](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Installation

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

Utilité des quatre extras :

| extra | Ce qu'il fournit | Qui en a besoin |
| --- | --- | --- |
| `core_scripts` | points d'entrée officiels record / teleoperate / calibrate / replay + dépendances pour les jeux de données et la visualisation | tout le monde |
| `feetech` | `scservo_sdk` (protocole série des servomoteurs STS3215) | opérations sur le robot réel |
| `pynput-dep` | écoute clavier globale | téléopération au clavier, touches de contrôle des épisodes pendant l'enregistrement |
| `training` | `accelerate` / `wandb`, etc. | entraînement avec `lerobot-train`, déploiement de politique (`lerobot-rollout`) |

Ajoutez MuJoCo ponctuellement lorsque nécessaire (il ne fait pas partie du fichier de verrouillage et est chargé à la demande) :

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

Comment lire ces trois éléments : `uv run` exécute la commande avec le `.venv` de ce dépôt ; `--frozen` utilise strictement les versions verrouillées par `uv.lock`, sans réanalyser les dépendances ; `--with mujoco` ajoute temporairement le paquet MuJoCo **pour cette commande uniquement** — la commande suivante sans ce préfixe ne l'aura pas dans l'environnement, c'est pourquoi toutes les commandes de simulation des chapitres 02–09 portent ce préfixe.

Une fois ce chapitre terminé, toutes les commandes des chapitres 02–09 peuvent être exécutées directement : l'extra `training` (nécessaire à l'entraînement et au déploiement) est déjà inclus dans le `uv sync` ci-dessus ; par la suite, **aucune dépendance supplémentaire ne doit être installée**.

**Vous préférez utiliser un environnement conda** ? Les commandes n'ont alors plus besoin du préfixe `uv run` — les trois commandes de création de l'environnement et les points d'attention sont décrits dans
[09 Tutoriel d'utilisation complet · Annexe A](/fr/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial).

## Vérification

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## Problèmes fréquents

- **`uv sync` affiche `failed to persist temporary file ... os error 17`** : particularité de cette machine liée au répertoire de cache uv situé sur un autre disque ; utilisez le préfixe `UV_CACHE_DIR` ci-dessus, détails dans [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).
- **N'utilisez pas la version Microsoft Store de Python** : choisissez simplement Python 3.12 géré automatiquement par uv.
- Le premier `uv run --with mujoco` télécharge une wheel mujoco d'environ 5,6 Mo ; les suivants utilisent le cache.

<RelatedProducts slugs="so-arm101" />
