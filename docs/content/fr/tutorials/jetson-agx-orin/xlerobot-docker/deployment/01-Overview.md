---
title: 01 · Aperçu
---

# 01 · Aperçu

> **Précédent :** aucun, c'est la première page
> **Suivant :** [02-Environment-Setup](02-Environment-Setup.md)

Cette page explique clairement : **en quoi consiste le workflow complet d'XLeRobot, quel matériel est nécessaire, et si votre machine est compatible.**

---

## Workflow

Le processus complet d'XLeRobot se déroule en quatre étapes :

```
① Calibrer le robot  →  ② Téléopérer et collecter les données  →  ③ Entraîner le modèle  →  ④ Déployer en autonomie
   calibrate              record                                    train                     eval / rollout
```

L'image Docker embarque **tout l'environnement logiciel** nécessaire à ces quatre étapes — Python, PyTorch,
LeRobot, le code robot d'XLeRobot, les pilotes de servos et de caméras. Vous n'avez plus à vous battre
avec les conflits de versions.

**Ce que vous devez préparer de votre côté** : uniquement un robot (ou commencer par faire tourner le logiciel),
un ordinateur et un câble USB.

---

## Prise en charge matérielle

| Plateforme | Prise en charge |
|---|---|
| **Série Jetson Orin** (JetPack 7.2) | ✅ **La seule plateforme prise en charge**, avec accélération GPU |
| Tout le reste | ❌ Non pris en charge |

> ⚠️ **Cette image est conçue uniquement pour Jetson + JetPack 7.2.** Raspberry Pi, les PC x86 ordinaires,
> Windows, macOS et les cartes Jetson qui ne sont pas de la gamme Orin ne peuvent pas l'utiliser.
>
> - **Jetson Orin Nano / Orin NX / AGX Orin** : nécessite **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). L'AGX Orin 64 GB n'est lui aussi pleinement pris en charge qu'à partir de 7.2.
> - **Jetson Nano (2019, version d'origine)** : ❌ impossible, définitivement. C'est une architecture Maxwell (compute 5.3),
>   or CUDA 13 a entièrement supprimé la prise en charge de Maxwell, et torch exige au minimum sm_80.
>
> Un minimum de 4 GB de mémoire est recommandé. Les 3,4 GB du Jetson Orin Nano suffisent pour la téléopération,
> mais l'entraînement sera laborieux.

### Configuration système requise

- **JetPack 7.2** (L4T r39 / Ubuntu 24.04)
- Architecture : `arm64`
- Noyau prenant en charge les ports série USB (présent sur la quasi-totalité des systèmes)

### Vérifier votre version de JetPack

```bash
cat /etc/nv_tegra_release
```

Si vous voyez **R39**, tout va bien. Pour tout le reste — mettez d'abord JetPack à jour ; l'image est conçue pour cela.

---

## Les dossiers à lire

| # | Dossier | Contenu | Quand le lire |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (c'est ici) | **Télécharger l'image, faire tourner l'image** | Première utilisation : à lire dans l'ordre `01` → `02` → `03` |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Commandes de l'XLeRobot complet** | Quand vous avez l'XLeRobot complet (deux bras + châssis) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Commandes du LeRobot d'origine** | Quand vous n'avez qu'un bras SO-101 / SO-100 unique ou un LeKiwi |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Problèmes fréquents et aide-mémoire | En cas de problème |

> ⚠️ **Choisissez l'un ou l'autre des dossiers 2 et 3**, selon votre matériel :
> - **XLeRobot complet** (deux bras + châssis) → allez dans `xlerobot/`
> - **Un bras SO-101 / SO-100 unique**, **LeKiwi** → allez dans `lerobot/`
>
> L'image est un environnement unique — vous pouvez passer d'un chemin à l'autre à tout moment, sans rien réinstaller.

---

## Le chemin le plus court (pour un premier essai)

**Sur un Jetson (JetPack 7.2)**, quelques commandes pour voir le robot bouger, puis revenez lire les détails :

```bash
# 1. Installer Docker (à ignorer si déjà installé)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. Ouvrir l'accès GPU pour le conteneur (spécifique à Jetson, à faire une seule fois)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Télécharger l'image (environ 3,6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Démarrer le conteneur
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Lancer la téléopération dans le conteneur (la calibration guidée démarre automatiquement au premier lancement)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ Ce raccourci saute deux choses qu'il faudra faire **tôt ou tard** ; si vous êtes bloqué, revenez au chapitre correspondant :
> - **Le miroir de registre pour la Chine continentale** (l'étape 3 peut se bloquer) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` ne peut pas être omis** (ce hook a un bug sous
>   JetPack 7.2 et empêche le conteneur de démarrer) → [03-Deployment §4](03-Deployment.md)
>
> L'étape 5 ci-dessus exécute l'exemple de **l'XLeRobot complet**. Si vous n'avez qu'un seul bras SO-101,
> utilisez plutôt la ligne de commande `lerobot-*` — voir [lerobot/](../lerobot/01-Operation.md).

---

> **Suivant :** [02-Environment-Setup](02-Environment-Setup.md) — installer Docker, configurer le miroir (Chine continentale), brancher le matériel
