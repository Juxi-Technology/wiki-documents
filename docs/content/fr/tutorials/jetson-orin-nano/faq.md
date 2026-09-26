---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Questions fréquentes sur le NVIDIA Jetson Orin Nano Super Developer Kit
  (8GB) — stockage, première configuration, micrologiciel, modes
  d'alimentation, charges de travail d'IA et assistance.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# FAQ

## Avant de commencer

**Que contient la boîte ?**
Le Jetson Orin Nano Developer Kit, un bloc d'alimentation 19 V, ainsi qu'une
carte de démarrage rapide et d'assistance. **Il n'y a pas de stockage dans la
boîte NVIDIA** : vous fournissez la carte microSD ou le SSD NVMe, la clé USB
pour l'installateur, ainsi que l'écran et le clavier — le pack de la boutique
Juxi pour ce kit ajoute toutefois une carte microSD de 64 GB (selon la fiche
produit). Voir [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start).

**Dois-je acheter un stockage ?**
Oui — sauf si vous avez acheté le pack de la boutique Juxi, qui inclut déjà une
carte microSD de 64 GB ; celle-ci couvre le besoin de stockage cible, donc
n'achetez un SSD NVMe que si vous voulez plus de capacité. (La carte incluse
est livrée vierge, sans image préinstallée — vous y installez le système avec
la Jetson ISO.) NVIDIA précise : « Le Jetson Orin Nano Developer Kit n'inclut
pas de stockage amovible dans la boîte ; choisissez donc une carte microSD ou
un SSD NVMe avant de commencer la configuration. » Achetez une carte microSD
de 64GB UHS-1 ou plus (recommandation de NVIDIA) si vous avez reçu la boîte
NVIDIA nue, ou un SSD NVMe PCIe pour l'un des logements M.2 Key-M de la carte
porteuse. Le kit n'a pas d'eMMC : votre carte ou votre SSD devient le stockage
principal du système. Voir [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start) et
[Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces).

**Puis-je encore flasher une image de carte SD, comme sur les versions JetPack précédentes ?**
Non. À partir de JetPack 7.2, les images de carte SD ne sont plus prises en
charge. Consigne de NVIDIA : « Ne flashez pas la Jetson ISO sur une carte
microSD — écrivez-la sur une clé USB, puis utilisez-la pour installer Jetson
Linux sur votre carte microSD ou votre SSD NVMe. » La carte microSD reste une
cible d'installation valide ; elle n'est simplement plus le support sur lequel
vous écrivez l'image. La clé USB ISO est un installateur, pas un système
live — elle ne peut pas exécuter un bureau ; elle ne sert qu'à installer le
système. Voir
[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates) et
[Migration de JetPack 6 vers 7](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7).

**De quoi ai-je exactement besoin avant de commencer ?**
Il vous faut :

- Le kit et son bloc d'alimentation 19 V inclus.
- Un ordinateur portable ou de bureau (Windows, Mac ou Linux) avec au moins
  25GB d'espace libre.
- Une clé USB de 16GB ou plus, pour contenir l'image d'installation.
- Le stockage cible : une carte microSD (64GB UHS-1 ou plus recommandé) et/ou
  un SSD NVMe — le pack de la boutique Juxi inclut déjà la carte microSD de
  64 GB.
- Un écran DisplayPort et un clavier et une souris USB, ou un câble série USB
  vers TTL pour une configuration headless (sans écran).

Le guide de NVIDIA utilise Balena Etcher pour écrire l'ISO sur la clé USB —
copier le fichier sur la clé ne suffit pas. Pas à pas :
[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start).

**Ai-je besoin d'un PC Ubuntu ?**
Non, pas pour la méthode recommandée. L'installation par Jetson ISO s'exécute
sur le kit lui-même ; votre PC ne fait qu'écrire l'ISO sur une clé USB, et
Windows, Mac et Linux conviennent tous pour cela. Un PC hôte Ubuntu x86_64
n'est nécessaire que pour les méthodes alternatives — SDK Manager ou le script
de flashage — par exemple lorsque vous voulez reflasher un kit avec la
configuration Super. Remarque : la page de SDK Manager documente des hôtes
Ubuntu 20.04 / 22.04 x86_64, tandis que des membres du personnel NVIDIA
rapportent aussi avoir flashé avec succès depuis Windows. Voir
[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).

**Où se trouve le logement microSD ?**
Il se trouve sous le module Jetson Orin Nano, et non sur le bord de la carte
porteuse. Insérez la carte avant de démarrer l'installateur ISO ;
l'installateur ne propose que les stockages déjà installés. Pour changer de
carte plus tard : éteignez le kit, remplacez la carte, puis relancez
l'installateur ISO JetPack 7.2.1 avec la nouvelle carte insérée — JetPack 7.2
et versions ultérieures n'ont plus d'image de carte à écrire. Voir
[Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces) et
[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start).

## Configuration

**Mon kit est neuf — pourquoi le guide dit-il de mettre d'abord à jour le micrologiciel ?**
Les installations JetPack 7.2 et ultérieures exigent un micrologiciel
UEFI/QSPI de génération JetPack 6.x sur le kit — version 36.x ou plus récente.
Les kits livrés avec un micrologiciel d'usine plus ancien doivent d'abord
suivre le « JetPack 6.x Update Path » de NVIDIA avant que l'ISO JetPack 7.2.1
puisse démarrer. Pour vérifier la version : allumez le kit avec un écran
connecté et appuyez sur Esc à plusieurs reprises à l'écran de démarrage ; le menu
UEFI affiche la version du micrologiciel près du haut. S'il affiche 36.x ou
plus récent, continuez ; s'il est antérieur à 36.0, faites d'abord le parcours
de mise à jour. Voir
[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start),
[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates) et le
[Glossaire](/fr/tutorials/jetson-orin-nano/glossary) pour des termes comme QSPI et mise à jour de capsule.

**Combien de temps prend la configuration ?**
NVIDIA ne publie pas de durée totale de configuration. Les instructions
officielles indiquent que du texte blanc peut défiler à l'écran pendant
plusieurs minutes, et qu'il faut attendre que l'installateur se termine et
redémarrer lorsqu'il vous y invite. Les retours d'utilisateurs vont d'environ
15 minutes à environ deux heures pour une installation sur carte microSD
(retours d'utilisateurs, non confirmés), et le premier démarrage ajoute
ensuite les écrans de configuration d'Ubuntu (langue, réseau, nom
d'utilisateur). Voir
[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start).

**Que faire si l'installateur saute les écrans de nom d'utilisateur / mot de passe ?**
Cela correspond à un signalement connu : l'invite de capsule QSPI a expiré.
L'installateur vous demande de confirmer une mise à jour du micrologiciel
(QSPI) et n'attend que 30 secondes — si l'invite est manquée, les étapes
suivantes peuvent échouer, et les écrans de langue, de réseau et de nom
d'utilisateur peuvent ne jamais apparaître ; le démarrage suivant peut alors
s'arrêter sur un écran noir avec un curseur. La solution du guide officiel :
relancez l'installation et appuyez sur Y lorsque l'invite de capsule apparaît.
Certains utilisateurs ont aussi nettoyé les partitions résiduelles avant de
réessayer, ou installé avec SDK Manager à la place (retours d'utilisateurs ;
le personnel NVIDIA a reconnu le fil). Voir
[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

> **Important :** Lorsque l'installateur affiche l'invite de mise à jour de
> capsule QSPI, appuyez sur **Y** dans les 30 secondes. NVIDIA la qualifie
> d'« étape la plus souvent manquée ».

**Comment obtenir une console série ?**
Connectez un câble série USB vers TTL au connecteur des boutons : la broche RXD 3 se
connecte au fil TX de l'adaptateur, la broche TXD 4 au fil RX de l'adaptateur,
et la broche GND 7 au fil de masse de l'adaptateur. Ensuite, ouvrez une
console série sur votre PC, allumez le kit et appuyez sur Esc pendant l'écran
de pré-démarrage pour entrer dans l'UEFI / le gestionnaire de démarrage — vous
pouvez effectuer toute l'installation ISO de cette façon. Une lacune assumée :
les pages de NVIDIA disent « ouvrez une console série sur votre PC » mais
n'indiquent ni débit en bauds ni programme de terminal. Lorsque le kit est
connecté à un PC en USB-C en mode périphérique, il présente aussi un
« USB Serial device for serial terminal access ». Voir
[Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces) et
[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting).

## Alimentation et performances

**Pourquoi n'y a-t-il pas d'option 25W / MAXN SUPER ?**
Votre kit a été flashé avec la configuration de démarrage non-Super ; seuls
les modes 7W et 15W apparaissent. Il s'agit du problème documenté 6279443 de
l'ISO JetPack 7.2 : les installations par ISO conservaient le profil d'avant
la mise à jour au lieu de passer à « Super ». JetPack 7.2.1 corrige cela pour
les nouvelles installations — l'ISO « flashe désormais le Jetson Orin Nano
Developer Kit avec la configuration de flashage Super Mode par défaut » ;
NVIDIA ne précise pas si une réinstallation 7.2.1 convertit un kit installé
par ISO 7.2.0. Vérifiez `/etc/nv_boot_control.conf` : une configuration Super
affiche un suffixe `-super`. Pour corriger une installation 7.2 existante,
reflashez avec la configuration Super depuis un hôte Ubuntu (SDK Manager ou le
script de flashage) ; le menu Power Mode propose alors 15W, 25W (par défaut)
et MAXN SUPER. Voir
[Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system),
[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting) et
[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates).

> **Remarque de Juxi :** il existe un correctif communautaire sur place (modifier
> `/etc/nv_boot_control.conf`, reconfigurer le bootloader, supprimer
> `/etc/nvpmodel.conf`, redémarrer). Plusieurs utilisateurs rapportent un
> succès, mais NVIDIA ne l'a pas approuvé et un utilisateur a signalé une
> boucle de démarrage.

## Charges de travail d'IA

**Quelle taille de modèle peut-on exécuter avec 8 GB ?**
Les 8GB de LPDDR5 sont de la mémoire unifiée, partagée par le CPU, le GPU et
le système d'exploitation — environ 7,6 GB sont utilisables après les
réservations du micrologiciel et du noyau. Recommandation publiée de NVIDIA :
avec une quantification 4 bits et des environnements d'exécution économes en
mémoire, vous pouvez faire tenir des LLM jusqu'à environ 10B de paramètres et
des VLM jusqu'à environ 4B de paramètres. Les benchmarks officiels de
TensorRT Edge-LLM pour l'Orin Nano 8GB couvrent des modèles jusqu'à 2B, et
c'est la plus grande classe de modèles que NVIDIA évalue sur ce kit. Un modèle
peut échouer à se charger même si le fichier semble tenir, car le cache KV a
lui aussi besoin de mémoire ; des GGUF de 7,4 GB et de 16 GB ont échoué à se
charger sur un kit 8GB (retours d'utilisateurs). Voir
[LLM locaux sur 8 GB](/fr/tutorials/jetson-orin-nano/local-llm) et
[Efficacité mémoire](/fr/tutorials/jetson-orin-nano/memory-efficiency).

## Assistance et service

**Quel est le parcours d'assistance ?**
Commencez par la [page de dépannage](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)
officielle de NVIDIA, qui couvre les cinq problèmes de configuration courants :
l'ISO ne démarre pas, aucune sortie d'affichage, l'installateur n'affiche pas
le stockage cible, une mise à jour du micrologiciel est nécessaire, et une
erreur de permission Docker. Pour les questions sur la plateforme, utilisez
les forums de développeurs NVIDIA Jetson, listés sur la page officielle
[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) ;
faites une recherche avant de publier, et incluez la sortie de
`cat /etc/nv_tegra_release`. Contacts Juxi Technology :

- Assistance technique : **support@juxitech.com**
- Commandes, garantie et RMA : **support@juxitech.com** (incluez le numéro de commande)
- Ventes et devis : **sales@juxitech.com**
- Questions produits (sélection, compatibilité) : **pe@juxitech.com**

Téléchargements officiels et liens de référence : [Téléchargements](/fr/tutorials/jetson-orin-nano/downloads).

> **Remarque de Juxi :** certaines réponses de forum étiquetées comme provenant du
> personnel NVIDIA sont des réponses d'IA générées automatiquement (elles
> commencent par « This is an automated AI response »). Considérez-les comme
> non faisant autorité et privilégiez la documentation officielle.

## Sources

- Jetson Orin Nano Developer Kit User Guide — [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Dépannage](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Disposition matérielle](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (vérifié le 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- Notes de version Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (vérifié le 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (vérifié le 2026-09-26)
- [Benchmarks de performances TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (vérifié le 2026-09-26)
- Forums de développeurs NVIDIA — [fil sur le blocage au démarrage / l'installation qui saute le nom d'utilisateur](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [fil sur 25W / MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (vérifié le 2026-09-26)
- [Fiche produit Juxi Technology — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de relecture par cheny.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
