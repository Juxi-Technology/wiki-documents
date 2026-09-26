---
title: IA agentique — NemoClaw sur l'Orin Nano 8 GB
sidebar_label: IA agentique (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Installer et exécuter NVIDIA NemoClaw, la pile d'agents toujours actifs, sur
  le kit de développement Jetson Orin Nano Super 8 GB — installation
  officielle, attentes honnêtes pour 8 GB et notes de sécurité.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# IA agentique — NemoClaw sur l'Orin Nano 8 GB

Votre kit peut exécuter NVIDIA NemoClaw, un agent autonome toujours actif,
installé avec une seule commande. Cette page couvre ce qu'est NemoClaw,
l'installation officielle, les compétences d'agent qui l'entourent, des
attentes honnêtes pour 8 GB et les décisions de sécurité qu'il impose.

## Ce qu'est NemoClaw

NVIDIA décrit NemoClaw comme « une collection de blueprints open source pour
construire des agents autonomes » — des systèmes d'IA toujours actifs qui
raisonnent, planifient et agissent dans des flux de travail réels. Il regroupe
des harnais d'agents (OpenClaw, Hermes, LangChain Deep Agents) avec des
composants NVIDIA Agent Toolkit : modèles Nemotron, NeMo et contrôles de
politiques d'exécution OpenShell.

OpenShell est la couche de sécurité : « le runtime sécurisé à l'intérieur qui
impose ce à quoi l'agent peut accéder : fichiers, réseaux, identifiants et
outils. »

NemoClaw est un logiciel alpha — NVIDIA le qualifie d'« Early preview » (depuis
le 2026-03-16). Page produit : <https://www.nvidia.com/en-us/ai/nemoclaw> ·
hub Build-a-Claw : <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Installation — la commande unique officielle

Sur le kit, exécutez l'installateur de NVIDIA :

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Cela installe le harnais par défaut, **OpenClaw**. Deux autres sont
sélectionnables avec une variable d'environnement :

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

Sur ce kit, l'installateur détecte automatiquement Jetson (Orin et Thor) et
applique d'abord la configuration d'hôte JetPack ; sur L4T 39.x il charge le
module `br_netfilter` uniquement s'il manque (sans lui, le sandbox échoue à la
résolution DNS et l'onboarding reste bloqué sur « Setting up OpenClaw inside
sandbox »). Si vous sélectionnez Ollama, l'installateur l'installe aussi : « Le
script installe aussi ollama (si ollama est sélectionné) pour que vous n'ayez
pas à l'installer manuellement au préalable » (personnel NVIDIA). Le site de
NVIDIA documente cet appareil : « Install OpenClaw on Your NVIDIA Jetson Orin
Nano » — « un assistant personnel d'IA entièrement local sur Jetson … aucun
besoin d'API cloud ».

> **Important** — la matrice de prise en charge des plateformes de NemoClaw
> (v1.1, 2026-09-04) n'a pas de ligne Jetson ; ses plateformes testées sont
> Linux (Ubuntu 24.04) et DGX OS Spark. La prise en charge de l'Orin Nano est
> réelle en pratique — l'installateur détecte la carte et NVIDIA documente le
> flux — mais elle n'est pas publiée comme formellement prise en charge,
> attendez-vous donc à des aspérités.

Exigences qui comptent ici (de la page des prérequis NemoClaw de NVIDIA) :

| Exigence | Min / recommandé | Sur ce kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB au total — au plancher |
| Disque libre | 20 GB | Pas de stockage intégré ; utilisez microSD ou NVMe ([Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | À installer séparément |
| Runtime de conteneurs | Docker Engine / Desktop / Colima | Correctif de socket : `sudo usermod -aG docker $USER`, puis `newgrp docker` |

## Après l'installation — première session

Le personnel NVIDIA renvoie au [tutoriel Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (guide fournisseur) pour le flux Orin :

1. `curl -fsSL https://ollama.com/install.sh | sh` — ou sautez cette étape ;
   l'installateur NemoClaw peut aussi installer Ollama.
2. Récupérez un modèle de classe 4B avec appel d'outils (tool-calling), comme
   Nemotron3 Nano 4B (l'exemple `nemotron-3-nano:30b` du guide cible des
   appareils plus grands).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Onboarding : sélectionnez Ollama comme source de modèle, et choisissez le
   niveau de politique de sandbox le plus strict qui fonctionne.
5. `source ~/.bashrc`, puis `nemoclaw my-assistant connect` ; démarrez l'agent
   avec `openclaw tui`.

## Compétences d'agent

NVIDIA fournit aussi des **compétences d'agent (agent skills)** — des flux de
travail empaquetés au format ouvert Agent Skills qui étendent les assistants de
codage IA (Claude Code, Cursor, Codex) avec de l'automatisation spécifique à
l'appareil. Deux domaines sont documentés pour cette ère :

- **IA physique (robotique).** Isaac ROS fournit un catalogue de compétences
  d'agent — selon NVIDIA, des tâches telles que l'activation du conteneur de
  développement Isaac ROS et le démarrage de la pile cloud Mission Control. Le
  catalogue est à <https://github.com/nvidia/skills> (catégorie « Physical
  AI »), installé avec `npx` (Node.js ne fait pas partie de l'environnement
  Isaac ROS standard). Isaac ROS 5.0 ajoute une CLI `isaac-ros-activate` et une
  compétence en accès anticipé `migrate-node-to-rosidl-buffer`. Voir
  [Robotique](/fr/tutorials/jetson-orin-nano/robotics).
- **Pipelines vidéo.** Les notes de version de L4T r39.2.1 listent
  « Agent skills for video pipelines » parmi les nouveautés.

Une lacune assumée : les sources de cette page documentent les compétences
d'agent NVIDIA pour Isaac ROS (IA physique) et pour les pipelines vidéo ;
aucune ne documente un catalogue de compétences spécifique à NemoClaw.

## Attentes réalistes pour 8 GB

Un agent toujours actif, un modèle local et le bureau Ubuntu ne tiennent pas
tous confortablement en même temps sur ce kit. Le budget documenté :

- **La mémoire utilisable est d'environ 7,6 GB, pas 8 GB.** NVIDIA : « sur les
  8 GB de DRAM physique, environ 7,6 GB sont utilisables après les réservations
  du micrologiciel et du noyau. »
- **8 GB est le plancher de NemoClaw, pas une zone de confort.** Les prérequis
  listent 8 GB comme minimum et 16 GB comme recommandé : « Sur les machines
  disposant de moins de 8 GB de RAM, cette utilisation combinée peut déclencher
  le tueur OOM. Si vous ne pouvez pas ajouter de mémoire, configurez au moins
  8 GB de swap pour contourner le problème au prix de performances plus
  lentes. » La mémoire de ce kit est fixe — planifiez le fichier de swap
  ([Efficacité mémoire](/fr/tutorials/jetson-orin-nano/memory-efficiency)). Le
  push de l'image sandbox d'environ 2,4 GB a déjà déclenché un OOM sur un Orin
  Nano 8 GB.
- **L'agent et le bureau prennent de la mémoire avant le chargement du
  modèle.** Un guide communautaire sur les forums de NVIDIA estime le runtime
  OpenClaw à jusqu'à ~1 GB ; désactiver le bureau graphique libère jusqu'à
  ~865 MB (chiffre de NVIDIA), et une mesure communautaire situe GNOME à plus
  de 600 MB.
- **L'échec dû à un modèle surdimensionné est documenté dans un rapport
  communautaire sur les forums de NVIDIA.** Ollama sur une carte 8 GB n'a pas
  réussi à charger un modèle de 7,4 GB et un modèle de 16 GB :
  `cudaMalloc failed: out of memory ... failed to allocate buffer for kv
  cache`. La taille de fichier seule n'est pas le test décisif — le cache KV
  doit tenir dans les mêmes 8 GB.

Ce qui tient, selon les sources : les valeurs par défaut Ollama validées par
NVIDIA (`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) sont dimensionnées
pour des machines plus grandes ; le guide Jetson AI Lab dit de commencer par un
modèle de classe 4B avec appel d'outils — « Cela peut fonctionner, mais
attendez-vous à des performances plus faibles que les modèles de classe 30B » ;
et le blog mémoire de NVIDIA situe l'enveloppe 4 bits optimisée à des LLM
jusqu'à ~10B et des VLM jusqu'à ~4B de paramètres — un plafond pour une
configuration dédiée, pas un budget qui contient aussi un bureau et un agent.

NVIDIA ne publie pas de chiffres de tokens par seconde pour Ollama sur cet
appareil ; traitez les affirmations de vitesse externes avec prudence (voir
[Inférence LLM locale](/fr/tutorials/jetson-orin-nano/local-llm)).

> **Remarque de Juxi :** pour une configuration toujours active viable ici,
> prévoyez le mode headless, un modèle quantifié de classe 4B et un stockage
> NVMe pour l'exigence de 20 GB et le fichier de swap. Cela correspond à ce que
> les sources étayent ; tout ce qui est plus grand n'est pas vérifié.

## Ollama et notes d'agent — confirmées par le personnel NVIDIA

Le personnel NVIDIA a débogué le flux Orin Nano + JetPack 7.2 + Ollama sur ses
forums développeurs, et a revérifié Ollama sous JetPack 7.2.1 en
septembre 2026.

- **Vérifiez d'abord le GPU.** `ollama ps` doit afficher `100% GPU` dans la
  colonne PROCESSOR ; s'il affiche CPU, l'agent sera très lent.
- **Échec documenté (juin 2026).** Avec NemoClaw + Ollama sur un Orin Nano
  fraîchement flashé en JetPack 7.2, `openclaw tui` s'ouvrait mais ne répondait
  jamais (« Autocompaction could not recover this turn »). NVIDIA l'a
  reproduit : Ollama avait sauté la découverte du GPU (repli CPU), et la
  fenêtre de contexte du sandbox n'était que de 4096 jetons. Le correctif du
  personnel a écrit ces lignes dans
  `/etc/systemd/system/ollama.service.d/override.conf` :

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  puis `sudo systemctl daemon-reload && sudo systemctl restart ollama` ; à
  l'intérieur du sandbox (`nemoclaw my-assistant connect`), `contextWindow` a
  été porté à 32768 dans `.openclaw/openclaw.json` et le hash de configuration
  rafraîchi. Le rapporteur a confirmé qu'Ollama tournait alors sur le GPU.
- **État actuel : ce contournement ne devrait pas être nécessaire.** Personnel,
  mi-2026 : « le problème est corrigé dans la dernière version d'ollama. Le
  contournement (override.conf) n'est plus nécessaire. » Sur JetPack 7.2.1,
  l'installateur amont fonctionne et `ollama ps` signale 100 % GPU ; la ligne
  « WARNING: Unsupported JetPack version detected » est inoffensive. Testez
  d'abord l'installation standard.
- **Si Ollama retombe encore sur le CPU :** mettez d'abord Ollama à jour. Un
  utilisateur du forum a corrigé un repli persistant en supprimant le
  répertoire obsolète `/usr/local/lib/ollama/cuda_v12` (suppression confirmée
  par le personnel). Gardez override.conf comme recours de dernier ressort —
  c'est ce que NVIDIA a utilisé avec succès sur ce kit exact.

## Sécurité pour les agents toujours actifs

Un agent toujours actif est un programme doté d'identifiants et d'un accès aux
outils qui continue de fonctionner pendant que vous ne regardez pas. Sur un
appareil qui contient vos données, c'est un risque réel : un agent avec accès
aux outils et au shell ici peut lire, modifier ou envoyer tout ce qu'il peut
atteindre.

**Utilisez la couche de politiques.** NVIDIA décrit OpenShell comme « le
runtime sécurisé à l'intérieur qui impose ce à quoi l'agent peut accéder :
fichiers, réseaux, identifiants et outils ». Pendant l'onboarding, choisissez
le niveau de politique de sandbox le plus strict qui fait encore le travail (le
tutoriel Jetson AI Lab conseille le niveau le plus strict).

**Identifiants.** Donnez à l'agent des identifiants à portée limitée et
révocables — des clés et comptes dédiés, jamais vos comptes personnels. Tout ce
que l'agent peut lire, il peut le copier ; tout ce qu'il peut utiliser, il peut
être amené à l'utiliser. Les intégrations de messagerie agissent avec votre
identité : la page Orin Nano de NVIDIA montre un exemple OpenClaw + WhatsApp,
alors utilisez un compte ou un numéro dédié.

**Exposition réseau.** Gardez les services locaux sur localhost — la
configuration du personnel NVIDIA pour Ollama ici le lie à `127.0.0.1`
(`OLLAMA_HOST=127.0.0.1:11434`). N'exposez pas les tableaux de bord d'agents,
les API de contrôle ou les serveurs de modèles à l'internet ouvert ; pour
l'accès distant, utilisez un tunnel ou un VPN que vous contrôlez. L'installation
nécessite Docker (Engine/Desktop/Colima, selon les exigences ci-dessus) plus un
cluster de conteneurs sandbox (la passerelle OpenShell exécute k3s en interne)
et un accès sudo.

**Habitudes d'exploitation.** Commencez sous supervision — regardez ce que fait
l'agent avant de le laisser sans surveillance. Ne lui donnez pas d'accès que
vous ne pouvez pas révoquer ou annuler, et gardez des sauvegardes ainsi qu'un
chemin de récupération (voir [Flashage et mises à
jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)). NemoClaw est un
logiciel alpha (« Early preview ») ; traitez le sandbox comme une couche parmi
d'autres, pas comme la seule.

> **Attention** — comme cette pile s'exécute localement (« aucun besoin d'API
> cloud »), la frontière de sécurité est votre appareil, votre réseau et vos
> identifiants. Passez les trois en revue avant de laisser un agent tourner.

## Sources

- [NVIDIA NemoClaw product page](https://www.nvidia.com/en-us/ai/nemoclaw) (vérifié le 2026-09-26) — définition, harnais, commandes d'installation, OpenShell.
- [NVIDIA Build-a-Claw resource hub](https://www.nvidia.com/en-us/ai/build-a-claw/) (vérifié le 2026-09-26) — section d'installation Orin Nano.
- [NemoClaw — Prerequisites](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) et [Platform support](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (vérifié le 2026-09-26)
- [NemoClaw — Troubleshooting (configuration d'hôte Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (vérifié le 2026-09-26)
- [NVIDIA Developer Forums — NemoClaw on Jetson Orin Super with JetPack 7.2 (correctif du personnel NVIDIA)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (vérifié le 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson (vérifié par le personnel)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) et [JetPack 7.2 GPU acceleration](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (vérifié le 2026-09-26)
- [NVIDIA Technical Blog — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (vérifié le 2026-09-26)
- [NVIDIA Developer Forums — AI models that run on Orin Nano Super 8GB (guide communautaire)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (vérifié le 2026-09-26)
- [Jetson AI Lab — NemoClaw tutorial (guide fournisseur)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (vérifié le 2026-09-26)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) et [Release notes](https://nvidia-isaac-ros.github.io/releases/index.html) (vérifié le 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (vérifié le 2026-09-26) — l'élément « Agent skills for video pipelines » des nouveautés.

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle NVIDIA, des posts des forums développeurs NVIDIA et le
guide fournisseur Jetson AI Lab, aux dates indiquées ; pas encore vérifié sur
matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
