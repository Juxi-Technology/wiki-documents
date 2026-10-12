---
title: 03 · Déploiement
---

# 03 · Déploiement

> **Précédent :** [02-Environment-Setup](02-Environment-Setup.md)
> **Choisissez maintenant l'un des deux chemins :** [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot complet)
> ou [lerobot/](../lerobot/01-Operation.md) (bras unique / LeKiwi)

Téléchargez l'image en local et démarrez le conteneur. Une fois cette page terminée, vous serez dans un shell où tout l'environnement est déjà installé.

---

## 1. Récupérer l'image

### Méthode A : téléchargement direct (recommandé)

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

`cpu-slim` est la version allégée (environ 660 MB à télécharger) ; elle contient tout ce qu'il faut pour la téléopération, la calibration et l'enregistrement de données.

Pour la version complète (avec visualisation, entraînement et politique Diffusion) :

```bash
docker pull chenyang310/xlerobot:cpu
```

### Méthode B : construire soi-même

Pour les cas où vous devez faire des modifications, ou souhaitez utiliser les toutes dernières sources.

```bash
git clone <URL de ce dépôt> xlerobot-docker
cd xlerobot-docker

# Version CPU générique
bash scripts/build.sh cpu

# Version GPU Jetson (à exécuter sur le Jetson)
bash scripts/build.sh jetson
```

Le script de build est déjà configuré avec des miroirs adaptés à la Chine continentale (PyPI Alibaba Cloud, dépôts Ubuntu Alibaba Cloud) :
**la construction fonctionne sur un réseau en Chine continentale sans configuration supplémentaire**.

> La première construction télécharge environ 2 GB de dépendances ; sur un réseau lent, comptez une à deux heures.
> Avec `scripts/sync.sh` + le cache `wheels/` sur la carte, vous pouvez réutiliser les paquets déjà téléchargés.

---

## 2. Différences entre les versions

| Image | Taille | Contenu | Pour quel usage |
|---|---|---|---|
| `cpu-slim` | env. 660 MB | Téléopération, calibration, inférence de politique ACT | Pour faire tourner le robot uniquement |
| `cpu` | env. 1 GB | Ce qui précède + visualisation, enregistrement de données, entraînement, Diffusion | Pour le processus complet |
| `jetson` | env. 3,6 GB | Version CPU + **accélération CUDA** | Jetson, quand l'inférence GPU est nécessaire |

---

## 3. Démarrer le conteneur

### 3.1 Démarrage via le script (recommandé)

Si vous avez cloné le dépôt :

```bash
# Version générique
bash scripts/run.sh cpu

# Version Jetson (les paramètres GPU sont ajoutés automatiquement)
bash scripts/run.sh jetson
```

Le script configure déjà tout ce qui suit :

- **Passthrough des périphériques** — ports série, caméras, USB
- **Réseau** — `--network host`, nécessaire pour la téléopération VR et le contrôle web
- **Montage des sources** — modifiez le code sans reconstruire l'image
- **Montage du cache** — les fichiers de calibration et les modèles téléchargés sont conservés

### 3.2 Démarrage manuel

Si vous préférez ne pas utiliser le script, voici la commande minimale fonctionnelle :

```bash
docker run -it --rm \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:cpu-slim
```

**Le rôle de chaque paramètre :**

| Paramètre | Pourquoi c'est nécessaire |
|---|---|
| `--privileged` + `-v /dev:/dev` | Passthrough des ports série (servos SO-101), des caméras et de l'USB |
| `--network host` | Communication entre les deux processus host/client (ZMQ), et contrôle VR |
| `-v ~/.cache/huggingface` | **Fichiers de calibration** et cache des modèles. Sans ce montage, il faut recalibrer à chaque redémarrage du conteneur |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | Nécessaire pour lancer la visualisation (fenêtre rerun) |
| `-e HF_ENDPOINT` | `huggingface.co` est totalement inaccessible depuis la Chine continentale ; le miroir est obligatoire |

Une fois entré, vous arrivez dans un bash dont le répertoire de travail est `/opt/xlerobot`.

---

## 4. Paramètres GPU du Jetson ⚠️ différents des autres plateformes

La version Jetson **doit** utiliser CDI pour accéder au GPU, et **ne doit pas utiliser `--runtime nvidia`** :

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Avant la première utilisation, il faut générer la spécification CDI sur la **machine hôte** :

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Piège rencontré** : sur JetPack 7.2, le hook `enable-cuda-compat` de
> `nvidia-container-toolkit 1.19.1` plante (`slice bounds out of range`),
> ce qui empêche purement et simplement le conteneur de démarrer. Ajoutez le paramètre qui le désactive :
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> Ce hook n'est pas nécessaire lorsque la version de CUDA du conteneur est identique à celle de la machine hôte.

### Vérifier la disponibilité du GPU

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Spécificités par plateforme

### Série Jetson Orin —— ✅ Actuellement pris en charge

| Modèle | Requis | Remarques |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | La carte que nous avons testée en conditions réelles (les 3,4 GB de mémoire suffisent pour la téléopération) |
| **Orin NX** | JetPack **7.2** | Idem |
| **AGX Orin / AGX Orin 64 GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **ne prennent pas en charge** l'AGX Orin 64 GB ; il faut impérativement 7.2 |

**La seule exigence stricte est la version de JetPack** : le torch de l'image est compilé pour CUDA 13.0,
et CUDA 13.x exige un pilote **≥ 580**.

| JetPack | L4T | CUDA | Pilote | Utilisable ? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ Pilote trop ancien |
| **7.2** | 39.2 | 13.2 | série 595 | ✅ |

Pour connaître votre version :

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Passer de JetPack 6.x à 7.x **ne peut pas se faire via `apt upgrade` / OTA** (l'OTA ne fonctionne
> qu'au sein d'une même version majeure de L4T) : il faut reflasher entièrement la carte.

### Jetson Nano (2019, original) —— ❌ Jamais pris en charge

Trois raisons indépendantes, et aucune n'a d'issue :

1. **CUDA 13 a entièrement supprimé l'architecture Maxwell.** Le pilote R580 est la dernière branche à prendre
   en charge Maxwell / Pascal / Volta, et CUDA 13 exige justement 580+. Le Jetson Nano ne peut pas dépasser
   JetPack 4.6.6 / CUDA 10.2.
2. **Le compute 5.3 est inférieur au plancher accepté par torch.** Les architectures compilées dans le torch de
   cette image sont `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` — minimum sm_80 — alors que le Jetson Nano est en
   sm_53 : ni kernel natif, ni compilation JIT PTX à sa portée.
3. **Plateforme EOL** (JetPack 4 n'est plus maintenu depuis novembre 2024).

### Raspberry Pi / Ubuntu classique / PC x86 —— ⏳ Pas encore pris en charge

L'image est **conçue** pour les prendre en charge — la version CPU générique est basée sur `python:3.12-slim`,
une image de base publiée officiellement en versions amd64 et arm64.

Mais **la version CPU actuellement publiée n'est pas encore multi-architecture** (le script de build est un simple
`docker build`, qui ne produit que l'architecture de la machine de build). Résultat : selon le cas, le téléchargement
ne donnera que de l'amd64 ou que de l'arm64, et l'autre moitié des plateformes reste inutilisable.

Cette partie sera ouverte une fois le build multi-architecture en place (`docker buildx build --platform linux/amd64,linux/arm64`) ;
d'ici là, **n'utilisez l'image que sur Jetson Orin**.

> Pour vérifier si votre image est utilisable : <code v-pre>docker image inspect &lt;image&gt; --format '{{.Architecture}}'</code>,
> puis comparez avec `uname -m`.

---

## Après être entré dans le conteneur

Commencez par un autotest :

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Sortie attendue :

```
torch 2.11.0+cu130     ← version Jetson ; la version CPU affiche +cpu
lerobot 0.6.2
```

> ⚠️ **`xlerobot` et `xlerobot_mecanum` ne peuvent pas cohabiter dans le même processus** — les deux s'enregistrent sous `"xlerobot"`
> dans le code source (la config de mecanum a été copiée et son nom d'enregistrement n'a jamais été modifié). C'est un bug en amont d'XLeRobot,
> et l'erreur `Cannot register ... as xlerobot because ... already registered` s'affiche.
>
> Toutes les autres combinaisons fonctionnent : **les robots du LeRobot d'origine et XLeRobot peuvent coexister dans le même processus**
> (8 types enregistrés simultanément avec succès en test), et `xlerobot_2wheels` n'entre pas en conflit non plus.
> Un robot n'utilise jamais qu'une seule variante, donc l'usage normal n'est pas affecté.

---

> **Choisissez maintenant l'un des deux chemins :** [xlerobot/](../xlerobot/01-Operation.md) XLeRobot complet ·
> [lerobot/](../lerobot/01-Operation.md) bras unique / LeKiwi
