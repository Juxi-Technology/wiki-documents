---
title: "Étape 7 : Téléverser le modèle (facultatif)"
description: "Téléversez le modèle entraîné sur HuggingFace, automatiquement pendant l'entraînement ou manuellement après, avec gestion des checkpoints intermédiaires."
---

# Étape 7 : Téléverser le modèle (facultatif)

> Cette étape est facultative. Une fois l'entraînement terminé, le modèle est stocké sur votre ordinateur ou sur votre instance cloud GPU, et vous pouvez l'utiliser directement pour l'inférence sans aucun problème. Ce n'est que lorsque vous devez **sauvegarder le modèle, changer de machine pour l'inférence, ou partager le modèle avec quelqu'un d'autre** que vous avez besoin de le téléverser sur HuggingFace.

## Espaces réservés dans les commandes

Cet article reprend la notation avec espaces réservés des chapitres précédents ; remplacez-les par vos propres informations, et lors du remplacement, **supprimez aussi les chevrons** :

- `<nom-utilisateur>` : le nom de votre compte HuggingFace
- `<nom-utilisateur>` : le nom d'utilisateur système de votre ordinateur ; vous pouvez le consulter en saisissant `whoami` dans le terminal

## Méthode 1 : téléversement automatique pendant l'entraînement

Ajoutez deux lignes de paramètres à la commande d'entraînement, et le modèle sera automatiquement téléversé à la fin de l'entraînement :

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<nom-utilisateur>/shake_act_a \
```

**Ces deux lignes doivent apparaître par paire ; si vous n'écrivez que `push_to_hub=true`, une erreur sera signalée.** `repo_id` correspond au nom du dépôt que vous donnez à ce modèle, de la forme `nom_de_compte/nom_du_modèle` ; si le dépôt n'existe pas, LeRobot le créera automatiquement.

Par exemple, la commande complète pour ACT devient :

```Shell
lerobot-train \
  --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=true \
  --policy.repo_id=<nom-utilisateur>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

Selon les explications de la section précédente, une fois cette version de l'entraînement terminée, le modèle apparaîtra à l'adresse `https://huggingface.co/<nom-utilisateur>/shake_act_a`.

### Téléverser aussi les checkpoints intermédiaires

Pendant l'entraînement, un checkpoint est enregistré tous les `save_freq` (20000 steps par défaut). Si vous souhaitez téléverser aussi ces checkpoints intermédiaires (par exemple si l'entraînement est très long et que vous voulez pouvoir récupérer le modèle intermédiaire à tout moment), ajoutez cette ligne :

```Shell
  --policy.save_checkpoint_to_hub=true \
```

Lors du téléversement, chaque checkpoint est étiqueté avec un tag portant le même nom que le nombre de steps (par exemple `010000`) ; plus tard, en spécifiant ce tag lors du chargement du modèle, vous obtiendrez la version correspondant à ce nombre de steps. Voir « Charger le modèle téléversé » ci-dessous pour les détails.

### Quelques paramètres facultatifs

À ajouter selon vos besoins :

| Paramètre | Description |
|---|---|
| `--policy.private=true` | Le dépôt est défini comme privé, les autres ne peuvent pas le voir |
| `--policy.tags=act,so101` | Ajoute des tags au modèle pour faciliter la recherche |
| `--policy.license=mit` | Spécifie la licence open source |

## Méthode 2 : téléversement manuel après l'entraînement

C'est la méthode la plus courante : pendant l'entraînement, écrivez comme d'habitude `--policy.push_to_hub=false`, puis, une fois l'entraînement terminé et les résultats jugés satisfaisants, téléversez manuellement le modèle.

### 1. Connexion

Si vous avez déjà associé un Token, vous pouvez passer cette étape ; sinon, voir [Créer un compte Hugging Face (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

```Shell
hf auth login
hf auth whoami
```

### 2. Téléversement

Supposons que le répertoire de sortie de l'entraînement ACT soit `~/output_lerobot_train/shake/act/` :

```Shell
export HF_USER=<nom-utilisateur>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

Le dépôt du modèle n'a pas besoin d'être créé au préalable ; `hf upload` en créera automatiquement un s'il constate que le dépôt n'existe pas.

### 3. Téléverser le checkpoint d'un nombre de steps donné

Si vous voulez téléverser uniquement un checkpoint intermédiaire plutôt que le dernier :

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Téléverser depuis la page web

Si le modèle n'est pas volumineux et que vous ne voulez pas taper de commandes, vous pouvez aussi opérer directement sur la page web de HuggingFace : créez un nouveau dépôt Model, puis faites glisser les fichiers du répertoire `pretrained_model` dedans.

## Charger le modèle téléversé

Une fois le modèle téléversé, il suffit de pointer `--policy.path` vers celui-ci lors du déploiement ; nul besoin de le télécharger d'abord en local :

```Shell
  --policy.path=<nom-utilisateur>/shake_act_a \
```

C'est plus pratique que de pointer vers un chemin local : en changeant d'ordinateur, ou si quelqu'un d'autre connaît votre nom de compte, il peut l'utiliser directement. Notez que pour récupérer un modèle depuis HuggingFace, il faut pouvoir se connecter à ses serveurs ; dans un environnement réseau en Chine, il est recommandé de configurer d'abord le miroir en suivant [Créer un compte Hugging Face (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

Si vous avez téléversé plusieurs checkpoints et souhaitez préciser lequel utiliser, ajoutez le numéro de version :

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` correspond au nombre de steps du checkpoint que vous avez téléversé.

## Remarques

- Le nom du dépôt du modèle (`repo_id`) n'a aucun rapport avec `--output_dir` et `--job_name` de la commande d'entraînement ; ils sont indépendants, choisissez simplement un nom facile à reconnaître
- Dans le tutoriel, toutes les commandes d'entraînement indiquent `--policy.push_to_hub=false` ; si vous voulez utiliser le téléversement automatique, remplacez cette ligne par `true` et ajoutez `--policy.repo_id`, les deux étant indispensables

<RelatedProducts slugs="so-arm101" />
