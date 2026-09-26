---
title: Dépannage
sidebar_label: Dépannage
slug: /support/troubleshooting
description: >-
  Dépannage guidé par les symptômes pour le NVIDIA Jetson Orin Nano Super Developer Kit (8GB) — pièges d'installation, modes d'alimentation, stockage NVMe, accélération GPU et problèmes connus, avec des niveaux de source clairs.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# Dépannage

Trouvez votre symptôme dans l'index ci-dessous, puis lisez la section
correspondante. Niveaux : **A** = documentation officielle NVIDIA ; **B** =
forum des développeurs NVIDIA (personnel ou communauté). Les éléments issus
uniquement de la communauté sont marqués *non confirmé*. Juxi n'a pas d'unité
en main pour cette série — cette page n'est vérifiée que sur documentation,
pas testée sur matériel.

## Commencez par le guide de dépannage officiel de NVIDIA

Premier réflexe de NVIDIA pour ce kit : le [guide de dépannage](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html). Il couvre exactement cinq problèmes de configuration : (1) la Jetson ISO ne démarre pas, (2) aucune sortie d'affichage, (3) l'installateur n'affiche pas le stockage cible, (4) une mise à jour du micrologiciel est nécessaire, (5) une erreur de permission Docker. Pages officielles associées : la page [Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) ne contient actuellement aucune solution de contournement (elle renvoie au JetPack 6.x Update Path), et la page [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) liste les canaux d'escalade de NVIDIA. (niveau A)

## Index des symptômes

| Symptôme | Section |
| --- | --- |
| L'installateur saute les écrans langue/réseau/utilisateur, puis le système se bloque sur un écran noir avec un curseur ; aucun mot de passe ne fonctionne | Invite de capsule QSPI manquée |
| L'installation semblait correcte mais échoue plus tard | Invite de capsule QSPI manquée |
| L'installation ou le flashage échoue avec un hub ou un dongle USB connecté | Périphériques USB |
| Seuls 7W et 15W dans le menu d'alimentation ; `nvpmodel -m 2` renvoie une erreur | 25W / MAXN SUPER absents |
| GPU figé à 624,75 MHz même en MAXN SUPER | GPU figé à 624,75 MHz |
| Le changement de mode d'alimentation demande un redémarrage ; le redémarrage peut se bloquer sur un écran noir | Changements de mode d'alimentation et redémarrage à écran noir |
| L'installateur ne propose pas le disque NVMe ; l'installation se bloque après 100 % | Problèmes de stockage NVMe |
| Le NVMe n'est pas visible à l'étape UEFI | Problèmes de stockage NVMe |
| L'installation s'interrompt à « Step 9/13 Updating boot firmware » | Incompatibilité de nom de carte à l'étape 9/13 |
| `jetson-io.py` échoue sur une unité Super flashée par ISO | Incompatibilité DTB de Jetson-IO |
| Ollama s'exécute sur le CPU ; avertissement « Unsupported JetPack version » | Ollama et accélération GPU |
| Besoin des wheels Python pour JetPack 7.2 | Wheels Python |
| Le Wi-Fi ne voit pas le réseau ; routeurs 6 GHz MBSSID non pris en charge | Le Wi-Fi ne voit pas le réseau |
| Aucune sortie d'affichage ; l'installateur ne démarre pas | Guide de dépannage officiel (ci-dessus) |
| Erreur de permission du socket Docker | Erreur de permission Docker |
| Besoin des journaux de démarrage sans écran | Console série |

## Invite de capsule QSPI manquée (le piège d'installation le plus courant)

Pendant l'installation par ISO, le kit vous demande de confirmer une mise à
jour de capsule du micrologiciel QSPI. NVIDIA la qualifie d'« étape la plus
souvent manquée » : l'invite n'attend que 30 secondes. **Appuyez sur Y.**

- Si elle expire, « l'installation échoue plus tard ». La consigne de NVIDIA
  est de relancer l'installation et d'appuyer sur Y. (niveau A ; [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) section 5.1 ; problème 6266271 des notes de version, dans [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) et [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) : « Sauter cette étape cause des problèmes d'installation à cause de l'incompatibilité des nouvelles images ISO avec les anciennes images QSPI. »)
- La mise à jour se déroule en deux passes, et le kit peut redémarrer entre
  les deux. C'est normal. NVIDIA recommande aussi de sélectionner
  explicitement la clé USB d'installation dans le gestionnaire de démarrage
  UEFI plutôt que de compter sur l'auto-démarrage. (niveau A, [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) ; le personnel a confirmé que le guide a été mis à jour avec la solution de contournement d'un utilisateur — niveau B, [fil 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Signature de la panne (niveau B, signalement d'utilisateur et
  reconnaissance du personnel, [fil 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)) :
  l'installateur saute les écrans de langue, de réseau et de nom
  d'utilisateur, saute à « Finished installation and reboot », puis le
  système se bloque sur un écran noir ou gris avec un curseur. Aucun
  identifiant par défaut ne fonctionne (nvidia/nvidia, ubuntu/ubuntu,
  root/vide). Cause : l'invite de capsule n'a jamais été confirmée. Après
  avoir appuyé sur Y, les écrans de configuration sont apparus et
  l'installation s'est terminée. D'autres utilisateurs du même fil ont
  résolu le problème en flashant avec SDK Manager. (niveau B)
- Si le kit n'atteint jamais l'installateur (écran noir, ou retombée dans un
  shell UEFI), le micrologiciel QSPI est probablement trop ancien : JetPack
  7.2/7.2.1 exige un micrologiciel UEFI/QSPI de génération JetPack 6.x. Voir
  [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates) et
  [Migration de JetPack 6 vers 7](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7). (niveau A, [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## L'installation ou le flashage échoue avec certains périphériques USB

Problèmes officiels **5424568** et **5460707** (présents dans les notes
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) et [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)) :
l'installation par ISO échoue lorsque la clé USB d'installation est branchée
sur un hub **« USB3.0 4-port Portable Hub Model UH400 »** — « les autres clés
ou hubs USB fonctionnent comme prévu » — et le flashage échoue parfois
lorsqu'un dongle USB-vers-Ethernet **TRENDnet TU2-ET100** est connecté.
Utilisez une autre clé/un autre hub ou un port USB direct, et retirez le
dongle, avant de réessayer. (niveau A)

## 25W et MAXN SUPER sont absents

Symptômes : seuls 7W et 15W apparaissent, ou `nvpmodel -m 2` renvoie une
erreur de mode d'alimentation. Cause — problème connu officiel **6279443**
([notes r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)) :
les unités mises à jour par ISO « ne basculeront pas par défaut en mode
“Super” après la mise à jour. Pour utiliser le mode “Super”, vous devez
flasher la cible depuis un hôte Linux ou avec SDKM. » (niveau A)

Signature de la panne — le suffixe `-super` est absent dans `/etc/nv_boot_control.conf`.
Personnel NVIDIA : « Lorsque le Super Mode est activé, la configuration doit
inclure le suffixe -super … Actuellement, l'image ISO ne peut pas faire
passer un appareil du mode non-Super au Super Mode. Veuillez utiliser un hôte
x86 pour reflasher l'appareil avec la configuration Super Mode. » (niveau B,
[fil 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

Corrigé par conception dans 7.2.1 — personnel : « Ce sera corrigé dans
jp7.2.1 » ; les [notes r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) indiquent que « l'ISO flashe désormais le Jetson Orin Nano Developer Kit avec la configuration de flashage Super Mode par défaut », et le problème 6279443 est absent de la liste des problèmes connus. (niveau A)

Options de correction :

1. Reflashez depuis un hôte Linux, ou avec SDK Manager. (niveau A, problème 6279443, [notes r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. Flashage QSPI seul proposé par le personnel — ne flashe que le bootloader QSPI, sans image système (niveau B, [fil 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)). La première commande est celle du personnel ; la seconde ajoute la cible Super et les contournements EEPROM qui ont fonctionné pour l'auteur du signalement :

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. Correctif communautaire sur place — *non confirmé*, non approuvé par
   NVIDIA (niveau B, [fil 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [fil 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)). Le personnel NVIDIA
   a demandé aux utilisateurs de capturer l'état **avant** de modifier ce
   fichier (`cat /etc/nv_tegra_release`, `cat /etc/nv_boot_control.conf`,
   `sudo /usr/sbin/nvpmodel -q --verbose`) — le modifier « supprimerait
   l'état défaillant que nous devons inspecter ». Séquence rapportée :
   `sudo -i` ; `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf` ;
   `dpkg-reconfigure nvidia-l4t-bootloader` ; `rm /etc/nvpmodel.conf` ;
   `reboot` ; puis `sudo nvpmodel -m 2 --verbose --force`. Plusieurs
   utilisateurs ont confirmé que 25W et MAXN SUPER apparaissaient ensuite ;
   un utilisateur sur une installation par carte SD a obtenu une boucle de
   démarrage et a réinstallé.

Contexte : sur une installation 7.2 non-Super,
`/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER) existe,
mais `/etc/nvpmodel.conf` pointe vers le fichier non-Super avec seulement 15W
et 7W. (niveau B, communauté, [fil 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)). Commandes de vérification des modes d'alimentation : [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system).

## GPU figé à 624,75 MHz

Même avec MAXN_SUPER actif, le GPU peut rester figé à 624 750 000 Hz
(`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000) ; flasher uniquement la
capsule Super n'a pas aidé dans le cas signalé — le micrologiciel Super
n'était pas appliqué. Personnel : flashez avec SDK Manager, ou manuellement
depuis un hôte Ubuntu ; corrigé selon eux dans 7.2.1. (niveau B, [fil 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)) Note de la communauté : il n'y a pas de `nvpmodel_p3767_0005.conf` dans L4T 39.2 ; le module P3767-0005 utilise la configuration 0003 (non confirmé par le personnel). (niveau B, communauté, même fil que ci-dessus)

## Changements de mode d'alimentation et redémarrage à écran noir

- L'invite de redémarrage après un changement de mode d'alimentation est
  normale une fois le GPU utilisé (« golden image context »). (niveau B,
  personnel, [fil 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Si le redémarrage se bloque sur un écran noir, cela correspond au problème
  **6236259** ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) ; listé comme corrigé dans [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)) :
  abaisser l'EMC sous Fmax pendant l'initialisation de systemd peut faire
  planter le système au redémarrage, surtout avec un écran connecté.
  (niveau A)
- Solution de contournement : redémarrez avec l'écran déconnecté, puis
  rebranchez-le après le démarrage — un utilisateur a confirmé que cela a
  réglé les problèmes de mode d'alimentation. (niveau B, personnel et
  utilisateur, [fil 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Atténuation de NVIDIA : passez en MAXN (restaure l'EMC à Fmax) avant de
  redémarrer ; si vous êtes déjà dans le mode problématique, démarrez une
  fois sans écran. (niveau A, problème 6236259, [notes r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## Problèmes de stockage NVMe

**L'installateur ne propose pas le disque / l'étape de partitionnement échoue** — *non confirmé* : l'installateur pourrait ne pas prendre en charge les disques NVMe formatés en secteurs 4K ; il lui faut du 512n/512e. Vérifiez avec `nvme id-ns -H /dev/nvme0n1` ; changez avec `nvme format --lbaf=ID /dev/nvme0n1` — **destructif** ; le message ne traite pas de la préservation des données. NVIDIA n'a pas confirmé cela officiellement. (niveau B, non confirmé, [fil 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**Le démarrage se bloque après une installation qui semblait réussie** — *non confirmé* : plusieurs signalements d'écran noir ou de curseur clignotant après que l'installateur a atteint 100 %. Un utilisateur ne l'a résolu que par un flashage direct en mode recovery ; un autre l'a attribué au problème des secteurs 4K ci-dessus. Aucune cause racine confirmée. (niveau B, non confirmé, [fil 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe non détecté à l'étape UEFI (r39.2)** — un disque sur PCIe C7 était invisible à l'étape de démarrage UEFI alors qu'il fonctionnait en R36.4 ; l'auteur du signalement l'a résolu en restaurant les configurations par défaut et en reflashant. Personnel NVIDIA : « pour le NV devkit, tout est déjà correctement configuré dans le BSP par défaut. Plus vous essayez de configurer d'éléments, plus vous risquez de casser quelque chose. » (niveau B, [fil 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)). Remarque : les images de carte SD ont disparu à partir de JetPack 7.2 — écrivez l'ISO sur une clé USB, puis installez sur microSD ou NVMe. (niveau A, [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## L'installation s'interrompt à « Step 9/13 Updating boot firmware » (incompatibilité de nom de carte)

*Non confirmé.* L'installation peut s'interrompre avec :

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Cause : `/etc/nv_boot_control.conf` contient un COMPATIBLE_SPEC obsolète que
la liste de cartes du paquet du bootloader ne reconnaît pas ; l'étape
oem-config/création d'utilisateur ne s'exécute alors jamais — le mécanisme de
« nom d'utilisateur / mot de passe sautés » dans ce cas. Reproduction sur un
système r39.2 démarré :
`sudo apt-get install --reinstall nvidia-l4t-bootloader`. NVIDIA n'a pas
confirmé ce point. Reproduit aussi sur un Orin NX 16GB et par un tiers le
2026-09-18 (subiquity `command_34 … returned non-zero exit status 100`) ; une
variante a été signalée pour SDK Manager 7.2.x échouant à « l'étape 9 ».
(niveau B, non confirmé, [fil 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Solution de contournement communautaire, *non confirmée* : faites un chroot
dans `/target`, étendez la branche board-glob de `select_3767_payload` dans
`/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, puis
`rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`,
exécutez `dpkg --configure -a`, et `apt-mark hold nvidia-l4t-bootloader`.
NVIDIA n'a pas publié de correctif pour cette panne ; la solution
communautaire ci-dessus reste non confirmée. (niveau B)

## Incompatibilité DTB de Jetson-IO sur les unités Super flashées par ISO

Problème officiel **6236205** (présent dans [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) et [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)) :
`jetson-io.py` échoue sur les unités Orin Nano Super flashées avec l'ISO.
Solution de contournement officielle : trouvez le DTB correspondant sous
`/boot` avec une boucle `fdtget` comparant `/compatible` et `/model` ;
copiez-le dans `/boot/dtb/` sous le nom `kernel_<name>.dtb` ; puis relancez
`sudo /opt/nvidia/jetson-io/jetson-io.py`. Les unités flashées par d'autres
méthodes ne sont pas concernées. (niveau A)

## Ollama et accélération GPU

Historique : les premières versions d'Ollama sous JetPack 7.2 retombaient sur
le CPU parce que les bibliothèques CUDA précompilées d'Ollama n'incluaient
pas sm_87 (capacité de calcul 8.7 d'Orin). Le personnel a cité le journal
« skipping CUDA device — compute capability not in compiled architectures …
device=Orin cc=870 » et déclaré : « C'est un problème connu … Nous travaillons
directement avec l'équipe Ollama pour ajouter la prise en charge native de
JP 7.2. » (niveau B, personnel, [fil 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

État actuel : la dernière version d'Ollama en amont fonctionne. Le personnel
l'a vérifié sous JetPack 7.2.1 (2026-09-21) : installez avec
`curl -fsSL https://ollama.com/install.sh | sh`, lancez un modèle, puis
vérifiez `ollama ps` — il doit afficher `100% GPU`. La ligne
« WARNING: Unsupported JetPack version detected » est un message inoffensif ;
l'ancienne solution de contournement `override.conf` « n'est plus
nécessaire ». (niveau B, personnel, [fil 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Correctif pour build obsolète : si
`find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` affiche à la
fois les arborescences `cuda_v12` et `cuda_v13`, supprimez l'ancienne —
`sudo rm -rf /usr/local/lib/ollama/cuda_v12`. Le journal affichait alors
« load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so …
compute capability 8.7 ». (niveau B, personnel et utilisateur, [fil 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Note 8 GB : les modèles plus gros peuvent encore échouer avec
`cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`,
même quand `free -h` affiche de la mémoire libre — la mémoire GPU est
partagée. Utilisez des modèles plus petits ou quantifiés. (niveau B,
communauté, [fil 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)). Plus : [LLM locaux sur 8 GB](/fr/tutorials/jetson-orin-nano/local-llm).

## Wheels Python pour JetPack 7.2

Réponse du personnel pour JP 7.2 / CUDA 13.2 : utilisez
`https://pypi.jetson-ai-lab.io/sbsa/cu130`. (niveau B, personnel, [fil 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)). Réserve : lors de la vérification de la racine de l'index (2026-09-26), il listait `jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130` et `sbsa/dev` — aucune entrée `jp7` visible ; des fils de la communauté citent aussi `https://pypi.jetson-ai-lab.io/jp7/cu132`, non visible dans cette liste. (niveau C). Personnel : « Rétrogradation : oui, vous pouvez reflasher vers JP 6.2.2 via SDK Manager si nécessaire. » (niveau B)

## Le Wi-Fi ne voit pas le réseau

Problèmes connus officiels du Wi-Fi (dans les [notes r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)) :
**les routeurs Wi-Fi 6 GHz utilisant MBSSID ne sont pas pris en charge**
(problème **5226667**), et **le scan Wi-Fi peut manquer des points d'accès
dans les environnements chargés** — exécutez `wpa_cli set bss_max_count 500`
comme solution de contournement de tampon (problème **5426982**). (niveau A)

## Console série (débogage headless)

Câblage (niveau A, [Démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)) : câble série USB vers TTL sur le connecteur des boutons — broche RXD 3 vers le fil TX de l'adaptateur, broche TXD 4 vers le fil RX de l'adaptateur, broche GND 7 vers le fil de masse de l'adaptateur. Ensuite, « ouvrez une console série sur votre PC ». Appuyez sur **Esc** à plusieurs reprises pendant le démarrage pour entrer dans l'UEFI. Pour une installation ISO headless, appuyez sur Esc aux options de pré-démarrage, choisissez **Boot Manager** et sélectionnez le disque USB.

- Les pages de NVIDIA n'indiquent ni débit en bauds ni programme de
  terminal — seulement « ouvrez une console série sur votre PC ». (voir
  *Ce que nous n'avons pas pu confirmer*)
- Sans écran DisplayPort ni Debug UART, une installation ISO headless n'est
  pas pratique — personnel : « Il vous faudrait soit la sortie d'affichage
  DP, soit le Debug UART … donc si vous n'avez ni l'un ni l'autre, c'est
  pratiquement impossible. » (niveau B, personnel, [fil 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Dans les installations ISO headless, la console UEFI est `/dev/ttyACM1`,
  inondée de sortie jusqu'à ce que le QSPI soit mis à jour vers GA (38.2) ;
  non observé avec un écran connecté ([problème 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)). (niveau A)
- Après avoir rebranché le câble de débogage, minicom peut devenir
  inaccessible — redémarrez minicom ([problème 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf), dans les deux versions). (niveau A)

## Erreur de permission Docker

Correctif officiel (niveau A, [guide de dépannage](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — redémarrez le terminal si le changement de groupe ne prend pas effet :

```
sudo usermod -aG docker $USER
newgrp docker
```

## Obtenir de l'aide

- **NVIDIA Jetson Developer Forums** (forums.developer.nvidia.com) —
  communauté officielle, listée sur la page Additional Docs de NVIDIA.
  Cherchez d'abord, puis publiez avec la sortie de
  `cat /etc/nv_tegra_release` ; pour les problèmes d'alimentation ou de
  micrologiciel, incluez aussi `/etc/nv_boot_control.conf` et
  `sudo /usr/sbin/nvpmodel -q --verbose`. (niveau A pour le référencement)
- **Attention :** certaines réponses marquées « NVIDIA-STAFF » sont des
  réponses d'IA générées automatiquement — elles commencent par un marqueur
  tel que « — 🤖 This is an automated AI response. I'm here to help, but
  please verify important details! — » ou « *** Please note that this reply
  is generated by LLM automatically *** ». Considérez-les comme non faisant
  autorité. (niveau B, [fil 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [fil 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com pour l'assistance technique,
  ainsi que pour les questions de commande, de garantie et de RMA (incluez
  votre numéro de commande). Ventes : sales@juxitech.com · Questions
  produits : pe@juxitech.com.

## Toujours ouvert en amont

Les notes de version de NVIDIA listent un problème ouvert pour ce kit qui
peut provoquer une réinitialisation inattendue : **des abandons DCE pendant
la suspension/reprise SC7 déclenchant une réinitialisation par watchdog**
(problème 6235055, ouvert dans r39.2 et r39.2.1). Si vous ne mettez jamais le
kit en veille, cela ne vous concerne pas ; sinon, suivez-le en amont plutôt
que de chercher un correctif de configuration. (niveau A, [notes de version r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## Ce que nous n'avons pas pu confirmer

Questions ouvertes dans nos sources :

- Le débit en bauds et le programme de terminal de la console série — NVIDIA
  dit seulement « ouvrez une console série sur votre PC ».
- Si l'incompatibilité de nom de carte (`command_34`, sortie 100) est
  corrigée dans r39.2.1 ; aucune réponse de NVIDIA dans les fils ; dernière
  reproduction communautaire le 2026-09-18.
- Si une installation par ISO 7.2.1 restaure les modes Super sur une unité
  flashée à l'origine avec l'ISO 7.2 — les notes disent seulement que 7.2.1
  flashe la configuration Super par défaut.
- Si la limitation des NVMe à secteurs 4K est réelle et officiellement
  documentée — signalement communautaire uniquement, absent des notes de
  version et du guide utilisateur.
- Aucune procédure officielle pour re-marquer un COMPATIBLE_SPEC/TNSPEC
  obsolète ; une question posée à NVIDIA sur le forum est restée sans
  réponse.
- Quel index de wheels est canonique pour JP 7.2 : `/sbsa/cu130` (personnel)
  ou `/jp7/cu132` (citation de la communauté).
- Les exigences d'hôte de flashage se contredisent selon les sources
  officielles : les notes de version disent « Ubuntu 24.04 et 22.04 » (sans
  architecture) ; la page BSP indique x86_64 pour SDK Manager ; des
  utilisateurs rapportent aussi que le SDK Manager Windows flashe 7.2.1 avec
  succès.
- Si la modification communautaire de `nv_boot_control.conf` est sûre —
  NVIDIA n'a ni approuvé ni corrigé la voie sur place.
- Si `sudo nvpmodel -m 2` peut persister entre les redémarrages sur une
  installation non-Super (les retours de la communauté disent non).
- Signalements de corruption EXT4/NVMe (journal recovery failed, I/O tag
  timeout, « Attempting recovery boot ») — non résolus ; le fil a été fermé
  sans réponse.
- Ollama via compilation depuis les sources ou conteneurs — aucune des deux
  voies ne fait autorité ; seul le dernier installateur en amont a la
  confirmation du personnel NVIDIA sous 7.2.1.
- L'allégation de build « 7.2.1-b49 vs b184 » et les « Agent Skills »
  manquants — non vérifiés, probablement une confusion ; le What's New de
  r39.2.1 liste bien « Agent skills for video pipelines ».

## Sources

- Guide utilisateur du kit de développement NVIDIA Jetson Orin Nano : [guide de dépannage](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [démarrage rapide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [disposition matérielle](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — vérifié le 2026-09-26
- Notes de version : [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — vérifié le 2026-09-26
- Fils du forum des développeurs NVIDIA (vérifié le 2026-09-26) : [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Statut : brouillon, en attente de révision par cheny. Les éléments marqués
comme non confirmés proviennent de signalements du forum communautaire et
peuvent évoluer. Cette page n'est vérifiée que sur documentation — Juxi n'a
pas testé ce kit sur matériel.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et n'est pas une publication de NVIDIA.
