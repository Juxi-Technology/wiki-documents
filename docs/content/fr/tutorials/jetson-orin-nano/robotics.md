---
title: Robotique sous JetPack 7.2 — ce qui fonctionne sur l'Orin Nano
sidebar_label: Robotique (état des lieux)
slug: /tutorials/robotics
description: >-
  Une page d'état honnête pour la robotique sur le kit de développement Jetson
  Orin Nano Super (8GB) sous JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac Sim, les
  piles de type LeRobot, et ce qu'il faut éviter de planifier pour l'instant.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# Robotique sous JetPack 7.2 — ce qui fonctionne sur l'Orin Nano

JetPack 7.2 a fait passer ce kit à une nouvelle génération de plateforme :
Ubuntu 24.04, CUDA 13, et le plafond de mémoire de 8 GB qui façonne chaque
charge de travail d'IA. L'écosystème robotique est encore en train de s'adapter
à ce virage. Certains éléments fonctionnent aujourd'hui. D'autres non. D'autres
ne peuvent encore être vérifiés depuis aucune page officielle.

Cette page est une page d'état, pas un tutoriel. Tout ici est vérifié sur
documents uniquement — Juxi n'a pas testé ces piles sur matériel. Vérifiez la
date de toute page robotique que vous lisez : plusieurs parties de cet
écosystème ont changé en août et septembre 2026. Dans le diagramme ci-dessous,
le grand bloc de droite s'exécute sur le kit ; Isaac Sim et Isaac Lab se
trouvent dans le bloc Omniverse à gauche, qui est un hôte séparé.

![Pile logicielle NVIDIA Jetson, avec les hôtes DGX et Omniverse à gauche](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Tableau d'état (vérifié le 2026-09-26)

| Ce dont vous avez besoin | Statut sous JetPack 7.2.1 / Orin Nano (8 GB) | Remarques |
|---|---|---|
| **ROS 2 (cœur)** | ✅ Fonctionne | JetPack n'installe ni n'exige aucune distribution ROS. ROS 2 **Jazzy** dispose de paquets officiels Ubuntu 24.04 arm64. Une réponse sur le forum d'un employé NVIDIA (2026-09-07) qualifie Jazzy de « distribution ROS recommandée pour JetPack 7.2.1 ». Les réponses de forum ne sont pas de la documentation officielle. Étapes d'installation ci-dessous. |
| **Isaac ROS** (ROS 2 accéléré par le matériel) | ⚠️ Livré en août 2026 — avec de vraies lacunes | Notes de version d'Isaac ROS 4.6.0 : « ajout de la prise en charge de Jetson Orin » et « ajout de la prise en charge de JetPack 7.2 ». L'Orin Nano Super 8GB apparaît dans le tableau de benchmarks officiel de NVIDIA. Mais les tutoriels pas-à-pas n'ont pas de section Orin Nano, le tableau de prise en charge attend un SSD NVMe, et la page JetPack de NVIDIA dit encore « Coming soon ». Détails ci-dessous. |
| **Isaac Sim / Isaac Lab** (simulation) | ⛔ Ne s'exécute pas sur ce kit | Nécessite un hôte x86_64 avec un GPU RTX (minimum GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM). Les GPU sans cœurs RT ne sont pas pris en charge. Les builds aarch64 n'existent que pour DGX Spark. Dans les flux de simulation, le simulateur s'exécute sur la machine x86_64, pas sur le Jetson. |
| **GR00T (modèles de fondation humanoïdes)** | ⛔ Pas sur ce kit | Le post-entraînement de GR00T 1.7 nécessite un GPU avec au moins 48 GB de VRAM. Le flux de référence de NVIDIA utilise un Jetson AGX Thor comme ordinateur périphérique pour le robot réel. Le même flux convertit les données de démonstration au format LeRobot — la direction logicielle correspond, mais le calcul ne vit pas ici. |
| **Piles Python de type LeRobot** (SO-ARM101, LeKiwi, kit vision) | ⚠️ Nécessite vérification | Le plancher de version Python est atteint (Ubuntu 24.04 fournit Python 3.12.3 ; LeRobot exige 3.12 ou plus récent). Mais l'amont n'a pas de parcours officiel JetPack 7.2, et la voie Jetson documentée est maintenue par la communauté pour JetPack 6.2. Testez votre pile exacte avant de vous engager. |
| **DeepStream** | — Non vérifié dans cette revue | Couvert par sa propre page — voir [Analyse vidéo DeepStream](/fr/tutorials/jetson-orin-nano/deepstream). Cette revue robotique n'a pas revérifié la matrice de prise en charge de DeepStream. |
| **TensorRT Edge-LLM** | — Non vérifié dans cette revue | Couvert par sa propre page — voir [Inférence LLM locale](/fr/tutorials/jetson-orin-nano/local-llm). Pertinent pour la robotique principalement via les modèles de style VLA. |
| **NemoClaw (pile agentique)** | ⚠️ Fonctionne, prise en charge de facto | L'installateur détecte automatiquement Jetson (Orin et Thor), et le site de NVIDIA fait la promotion de « Install OpenClaw on Your NVIDIA Jetson Orin Nano™ ». Mais la matrice de plateformes officielle n'a pas de ligne Jetson, et le projet est en alpha / « Early preview ». 8 GB est la RAM minimale annoncée (16 GB recommandés) avec un risque documenté de manque de mémoire. Voir [IA agentique](/fr/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS sous JetPack 7.2 — ce que disent les pages officielles aujourd'hui

**Les pages de NVIDIA se contredisent.** La page de téléchargement de
JetPack 7.2.1 liste encore « NVIDIA Isaac™ ROS — Coming soon ». Les pages du
projet Isaac ROS disent que la prise en charge est livrée. Pour Isaac ROS
lui-même, les pages du projet sont la source la plus spécifique, et elles sont
plus récentes :

- **Isaac ROS 4.6.0 (2026-08-18)** — notes de version : « ajout de la prise en
  charge de Jetson Orin » et « ajout de la prise en charge de JetPack 7.2 ».
  Première version 4.x avec cette combinaison.
- **Plateformes prises en charge :** « les plateformes définies dans ce
  tableau sont les seules combinaisons matérielles et logicielles qu'Isaac ROS
  teste et prend officiellement en charge. » La ligne Jetson :
  « Jetson Thor (T5000 et T4000) et Jetson Orin », JetPack 7.2, stockage
  « SSD NVMe de 128 GB ou plus ». Le tableau indique « Jetson Orin » (la famille),
  pas « Orin Nano ».
- **Benchmarks :** le tableau de performances a une colonne dédiée
  « Orin Nano Super 8GB » avec de vraies entrées — par exemple AprilTag Node à
  720p, 104 fps, et le graphe Mobile SAM à 720p, 4,80 fps. Ce sont les chiffres
  publiés par NVIDIA pour cet appareil, pas des mesures Juxi. Les charges plus
  lourdes affichent un tiret (« – ») : FoundationPose, Grounding DINO et SAM
  complet ne sont pas listés comme exécutables.
- **Isaac ROS 5.0.0 (2026-09-21)** est passé à ROS 2 Lyrical Luth. Le dépôt
  apt public de ROS 2 ne fournit pas de paquets ROS 2 Lyrical pour
  Ubuntu 24.04 ; NVIDIA les publie sur son propre CDN Isaac ROS Buildfarm.
  Isaac ROS 4.6 reste sur ROS 2 Jazzy. Choisissez 4.6 pour la pile Jazzy
  grand public.

**Lacunes à connaître avant de vous engager :**

- **Pas de section de configuration Orin Nano.** Les tutoriels pas-à-pas
  Jetson ne couvrent que Jetson AGX Thor et Jetson AGX Orin ; le seul lien
  pertinent pour l'Orin Nano est le guide des réglages d'alimentation.
- **Un SSD NVMe est attendu.** La colonne stockage indique
  « 128+ GB NVMe SSD ». Ce kit est livré sans aucun stockage, donc une
  configuration microSD seule sort de l'attente annoncée (voir
  [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)).
- **Décalage de versions.** Les pages de configuration 4.6 vous demandent de
  confirmer « R39 (release), REVISION: 2.0 » (L4T r39.2.0) depuis
  `cat /etc/nv_tegra_release` ; ce kit est livré avec JetPack 7.2.1 = L4T
  r39.2.1. Validez dans Docker avant de migrer un robot de production.
- **Caméras et OpenCV.** Les caméras Intel RealSense sont « prises en charge
  uniquement en mode Docker. Les modes Virtual Environment et Bare Metal ne
  sont pas pris en charge. » JetPack 7.2 installe aussi OpenCV 4.8.0 alors
  qu'Isaac ROS est testé avec 4.6.0 — le correctif est dans les étapes
  d'installation ci-dessous.
- **Une régression de la 5.0.** Dans Isaac ROS 5.0, l'encodeur d'images DNN
  peut avoir un débit inférieur à celui de la 4.6. Si ce nœud compte pour
  vous, envisagez la 4.6.

> **Important** : si Isaac ROS est sur votre chemin critique, pesez le
> calendrier. La prise en charge sous JetPack 7.2 est réelle mais jeune (août
> 2026), et la documentation Orin Nano est mince. Ce kit était déjà une cible
> Isaac ROS prise en charge à l'ère JetPack 6.2 (Isaac ROS 3.2 Update 1,
> janvier 2025). Une équipe qui a besoin de la combinaison la plus établie, et
> qui ne peut pas absorber les perturbations d'une première version, a un
> argument défendable pour rester sur une configuration de l'ère JetPack 6.2.
> Tous les autres : passez à 7.2.1, mais validez votre pipeline exact dans
> Docker sur ce kit avant de vous engager.

## Simulation et entraînement — une autre machine

Isaac Sim 6.0 ne peut pas s'exécuter sur ce kit. Minimums publiés pour le
parcours Linux x86_64 : GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM, 50 GB de
SSD. « Les GPU sans cœurs RT (A100, H100) ne sont pas pris en charge. » Le
build aarch64 « n'est actuellement pris en charge que sur les systèmes DGX
Spark ». Dans les flux de simulation Isaac ROS, « Isaac Sim s'exécute sur une
machine x86_64 qui fournit les données de capteurs et les informations de
monde » — le Jetson est la cible de déploiement.

À l'extrémité lourde de l'apprentissage robotique, la répartition est la même :
le post-entraînement de GR00T 1.7 nécessite au moins 48 GB de VRAM, et le flux
de référence de NVIDIA utilise un Jetson AGX Thor comme ordinateur périphérique
du robot réel. La règle : simulez et entraînez sur un PC, déployez et exécutez
l'inférence sur le kit. Si Isaac Sim était votre raison d'envisager un Orin
Nano, c'est la mauvaise machine pour ce travail.

## LeRobot et les piles robotiques Python — la question de compatibilité

1. **La question de la version Python a une réponse claire : la 3.12
   convient.** Le Python système d'Ubuntu 24.04 est 3.12.3, et LeRobot (0.6.2)
   exige Python 3.12 ou plus récent. La mise à niveau ne bloque pas LeRobot
   pour des raisons de version Python.
2. **Mais l'amont n'a pas de parcours JetPack 7.2.** La page d'installation
   officielle de LeRobot indique que sur Jetson, il n'y a pas de décodage vidéo
   accéléré par GPU par défaut (la bibliothèque retombe sur pyav), que les
   wheels torchcodec aarch64 nécessitent PyTorch 2.11 ou plus récent, et que
   son build Docker Jetson cible **JetPack 6.2** et est maintenu par la
   communauté. Aucune déclaration officielle ne dit que LeRobot actuel dispose
   de wheels CUDA aarch64 prêtes pour le CUDA 13 de JetPack 7.2.
3. **Donc : « à vérifier » — ni « pris en charge », ni « cassé ».** Avant de
   concevoir autour de LeRobot sur ce kit, testez votre pile exacte :
   installez-la, exécutez une petite politique, et confirmez que l'inférence
   utilise le GPU.

> **Remarque de Juxi :** nos kits robotiques (SO-ARM101, LeKiwi, kit vision)
> sont construits sur LeRobot. Sur ce kit sous JetPack 7.2.1, aucun parcours
> testé n'existe encore, ni en amont ni chez Juxi. JetPack 6.2 est la plateforme
> de référence pour la voie maintenue par la communauté. Consultez le support
> Juxi (voir [Téléchargements](/fr/tutorials/jetson-orin-nano/downloads)) avant
> d'engager un calendrier de projet sur LeRobot avec ce kit.

## Ce qui fonctionne aujourd'hui

### ROS 2 Jazzy — la fondation

JetPack n'inclut pas ROS. Le parcours qui fonctionne est l'installation deb
officielle de ROS 2 Jazzy pour Ubuntu 24.04 (arm64), résumée depuis la
documentation ROS 2 :

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — quand vous avez besoin de perception accélérée

Installez depuis le dépôt apt de NVIDIA (la page officielle liste les commandes
exactes de keyring) : dépôt
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, canal
`noble-jetpack` ; miroir Chine `isaac.download.nvidia.cn`. Ensuite :

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Retirez une fois l'OpenCV 4.8.0 préinstallé (voir la liste des lacunes
ci-dessus) ; Isaac ROS installe alors automatiquement son OpenCV 4.6.0
épinglé :

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA recommande Docker : « Docker est l'option recommandée pour la plupart
des utilisateurs. Elle offre le niveau d'isolation le plus élevé vis-à-vis de
votre système hôte. » Cela correspond aussi à l'exigence des caméras RealSense
(Docker uniquement).

### NemoClaw et la pile agentique

L'installateur détecte automatiquement les appareils NVIDIA Jetson (Orin et
Thor) et applique la configuration d'hôte spécifique à JetPack. Deux mises en
garde : le projet est en alpha (« Early preview »), et sa matrice de
plateformes officielle n'a pas de ligne Jetson, donc la prise en charge est de
facto, pas une revendication officielle. 8 GB est la RAM minimale annoncée
(16 GB recommandés), avec un risque documenté de manque de mémoire autour de
l'image sandbox d'environ 2,4 GB. Voir [IA
agentique](/fr/tutorials/jetson-orin-nano/agentic-ai).

## Recommandation

- **ROS 2 uniquement :** construisez sous JetPack 7.2.1 avec ROS 2 Jazzy dès
  aujourd'hui. Cela fonctionne.
- **Isaac ROS critique :** pris en charge depuis août 2026, mais nouveau, avec
  une documentation Orin Nano mince. Validez dans Docker ; prévoyez un NVMe.
  Si vous avez besoin de la combinaison la plus établie, une configuration de
  l'ère JetPack 6.2 reste défendable — voir le [guide de
  migration](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7) pour les coûts de
  reconstruction dans un cas comme dans l'autre.
- **Besoin de simulation ou d'entraînement :** prévoyez un PC RTX séparé (Isaac
  Sim) et un appareil de classe Thor pour le travail de classe GR00T. Ce kit ne
  peut faire ni l'un ni l'autre.
- **Construit sur LeRobot :** nécessite vérification. Testez d'abord ;
  JetPack 6.2 est la référence pour le parcours documenté.
- **N'achetez pas ce kit pour :** Isaac Sim, le post-entraînement GR00T, ou des
  charges en temps réel de classe SAM complet / Grounding DINO / FoundationPose
  — les trois derniers ne sont pas listés comme exécutables dans le tableau de
  benchmarks de NVIDIA pour cet appareil.

## Points encore flous

- **micro-ROS :** aucune page officielle spécifique à Jetson trouvée (deux URL
  officielles de micro.ros.org renvoient 404 aujourd'hui). Considérez
  l'association comme non vérifiée.
- **Distribution ROS après Isaac ROS 5.0 :** la réponse de forum recommandant
  Jazzy est antérieure à la 5.0 (2026-09-21) ; aucune déclaration post-5.0
  trouvée.
- **LeRobot sous JetPack 7.2 :** aucune déclaration officielle ; vérifiez la
  disponibilité des wheels PyTorch aarch64 pour CUDA 13 avant de vous engager.
- **Configurations microSD uniquement avec Isaac ROS :** le tableau de prise en
  charge indique NVMe, mais ce n'est pas répété spécifiquement pour l'Orin Nano.
- **« Jetson Orin » vs « Orin Nano » :** le tableau de plateformes utilise le nom
  de famille ; « Orin Nano Super 8GB » n'apparaît que dans le tableau de
  benchmarks. Non résolu : NVIDIA traite-t-il ces éléments comme des
  revendications de prise en charge distinctes ?
- **DeepStream et TensorRT Edge-LLM :** non revérifiés dans cette revue
  robotique — voir leurs propres pages.

## Sources

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (plateformes prises en charge, Docker, ROS 2 Lyrical ; vérifié le 2026-09-26)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (appariement Jazzy, installation apt, note OpenCV ; vérifié le 2026-09-26)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim sur x86_64 ; vérifié le 2026-09-26)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (notes 4.6.0 et 5.0.0 ; limites RealSense et de l'encodeur DNN ; vérifié le 2026-09-26)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (colonne de benchmarks Orin Nano Super 8GB ; vérifié le 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (paquets ROS 2 Lyrical pour Ubuntu 24.04 ; vérifié le 2026-09-26)
- [Isaac Sim 6.0 installation requirements](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (vérifié le 2026-09-26)
- [GR00T end-to-end workflow — prerequisites](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (vérifié le 2026-09-26)
- [NVIDIA developer forum — « Is ROS2 Jazzy the correct version... » (réponse d'un employé ; forum, pas documentation officielle)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (vérifié le 2026-09-26)
- [ROS 2 Jazzy installation — deb packages (amont)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (vérifié le 2026-09-26)
- [ROS 2 Jazzy installation — apt repositories (amont)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (vérifié le 2026-09-26)
- [LeRobot installation guide (amont)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (vérifié le 2026-09-26)
- [LeRobot pyproject.toml (amont)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (épinglages Python et torchcodec ; vérifié le 2026-09-26)
- [Ubuntu Noble — python3 package](https://packages.ubuntu.com/noble/python3) (Python 3.12.3 ; vérifié le 2026-09-26)
- [NemoClaw — prerequisites](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (vérifié le 2026-09-26)
- [NemoClaw — platform support matrix](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (stade alpha ; pas de ligne Jetson ; vérifié le 2026-09-26)
- [NemoClaw — installer troubleshooting (détection automatique de Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (vérifié le 2026-09-26)
- [NVIDIA — Build a Claw (« Install OpenClaw on Your NVIDIA Jetson Orin Nano™ »)](https://www.nvidia.com/en-us/ai/build-a-claw/) (vérifié le 2026-09-26)
- [Page de téléchargement de JetPack 7.2.1 (la matrice des composants liste Isaac ROS comme « Coming soon »)](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)

*Statut : relu le 2026-10-11. La disponibilité dans
l'écosystème évolue rapidement — recontrôlez les pages NVIDIA et amont liées
avant de vous fier à ce tableau. Pas encore vérifié sur matériel physique par
Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
