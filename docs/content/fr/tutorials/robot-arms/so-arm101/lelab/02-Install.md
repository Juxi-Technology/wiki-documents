---
title: "2 · Installer et lancer"
description: "Installer et lancer LeLab : installation en une ligne avec uv ou depuis les sources — les deux installent LeRobot ; l'interface web s'ouvre sur localhost:8000."
---

# 2 · Installer et lancer

> **Précédent :** [01 Vue d'ensemble](01-Overview.md)
> **Suivant :** [03 Connexion et calibration](03-Calibration.md)

Les deux méthodes installent aussi LeRobot — LeLab en a besoin.

---

## Méthode A · Une ligne

Nécessite [uv](https://docs.astral.sh/uv/). Installe dans un environnement isolé :

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

Un navigateur s'ouvre à l'adresse `http://localhost:8000/`.

## Méthode B · Depuis les sources

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` construit le front end React et l'embarque dans le paquet Python, si bien qu'un seul processus sert à la fois l'API et l'interface. La première installation prend quelques minutes.

Si la construction ne trouve pas Node.js, installez **Node.js 22** et réessayez. Node n'est nécessaire qu'au moment de l'installation et en mode développement — pas pour exécuter LeLab ensuite.

> **Vous préférez le code amont ?** Ce dépôt est une copie. L'original, maintenu par l'équipe LeRobot chez Hugging Face, est <https://github.com/huggingface/leLab>. Tout ce qui figure dans ces pages s'y applique sans changement.

---

## Le lancer

```bash
lelab
```

Sert l'interface à l'adresse **<http://localhost:8000/>** et ouvre le navigateur.

| Option | Ce qu'elle fait |
|---|---|
| `lelab` | Mode production. Un seul processus sert l'API et l'interface compilée sur `:8000` |
| `lelab --dev` | Rechargement à chaud Vite sur `:8080` plus uvicorn `--reload` sur `:8000`. Nécessite Node.js 22 |
| `lelab --rebuild` | Reconstruit le front end depuis les sources locales, puis démarre en mode production |
| `lelab --no-open` | Démarre sans ouvrir de navigateur |
| `lelab --stop` | Arrête un LeLab en cours et libère les ports 8000 et 8080 |

Arrêtez avec `Ctrl+C`, ou depuis un autre terminal :

```bash
lelab --stop
```

Utilisez `--stop` quand la page cesse de se charger : un processus résiduel qui occupe le port 8000 ou 8080 en est la cause habituelle.

---

## Vérifier que ça marche

Ouvrez <http://localhost:8000/>. La page d'accueil comporte des onglets **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training** et **Inference**.

Depuis le terminal :

```bash
curl http://localhost:8000/health
```

Renvoie un statut JSON.

---

## Mode développement

```bash
lelab --dev
```

Vite sur `:8080`, l'API avec rechargement automatique sur `:8000`. Les modifications sous `frontend/src/` mettent à jour la page sans redémarrage ; celles sous `lelab/` rechargent le serveur.

**En mode `--dev`, naviguez sur `:8080`, pas sur `:8000`.** Le port 8000 vous donne l'API sans interface.

---

## Mise à jour

LeLab vérifie si la branche depuis laquelle il a été installé a évolué et propose une mise à jour dans l'interface. Pour mettre à jour à la main :

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

Les installations modifiables (`pip install -e .`) sont exclues de la vérification. Mettez-les à jour avec `git pull`.

---

> **Suivant :** [03 Connexion et calibration](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
