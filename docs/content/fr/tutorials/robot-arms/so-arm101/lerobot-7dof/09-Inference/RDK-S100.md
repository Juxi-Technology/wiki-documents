---
title: "Inférence sur D-Robotics RDK S100"
description: "Déployez l'inférence du SO-ARM101 7-DOF sur le contrôleur D-Robotics RDK S100, en suivant le flux LeRobot ACT Policy du fabricant."
---

# Inférence sur D-Robotics RDK S100

Le processus d'implémentation détaillé est disponible via ce lien [Documentation complète du flux LeRobot ACT Policy](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## Déploiement de bout en bout du modèle ACT sur RDK S100/S100P

Cette section vous guide à travers la boucle complète de déploiement du modèle ACT sur le matériel de la série RDK S100 de D-Robotics. L'ensemble du processus se divise en trois phases clés : **export du modèle**, **compilation et quantification** et **exécution sur la carte**.

**Prérequis :**

- **Machine de développement \(Host\) :** sert à exécuter les étapes 1 et 2 ; il s'agit généralement de votre machine d'entraînement de modèles (elle doit être assez performante et avoir Docker installé).

- **Carte \(Edge\) :** D-Robotics RDK S100/S100P, utilisée pour l'étape 3.

- **Chaîne d'outils :** ce document s'appuie sur le dépôt `rdk_LeRobot_tools` ; pour plus de détails, voir [adresse du dépôt GitHub](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Avertissement important sur la compatibilité des versions \(à lire\) :** le flux d'export ONNX de la version actuelle de `rdk_LeRobot_tools` est parfaitement compatible avec la version **LeRobot datasets v2\.1**. Comme la dernière version v3\.0 a modifié la structure des données, il est **fortement recommandé**, avant d'effectuer les opérations de cette section, de basculer le dépôt principal `lerobot` d'origine sur le commit spécifique compatible avec v2\.1, afin de garantir un flux d'export fluide. 

*Commit ID recommandé :* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Phase 1 : export du modèle au format ONNX 💻 \(à effectuer sur la machine de développement\)

Tout d'abord, nous devons exporter le **modèle entraîné avec PyTorch** vers un format intermédiaire (ONNX).



#### **1\. Récupérer le dépôt de la chaîne d'outils** 

Placez-vous dans votre répertoire de travail `lerobot` et clonez la chaîne d'outils dédiée à RDK :

```Bash
cd lerobot

# 1. Passer à la version stable compatible avec les datasets v2.1
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Récupérer la chaîne d'outils dédiée au robot D-Robotics RDK
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Configurer les paramètres d'export** 

Éditez le fichier `rdk_LeRobot_tools/bpu_export_config.yaml` et adaptez la configuration à vos chemins réels :

```YAML
dataset:
  root: "data/so101_pick_place" # chemin absolu ou relatif de votre dataset
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # chemin des poids du modèle PyTorch d'origine
type: "nash-e" # architecture matérielle cible : RDK S100 correspond à nash-e / S100P correspond à nash-m
```



#### 3\. Exécuter le script d'export

```Bash
# Exporter l'ONNX (machine de développement)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Signe de réussite :** un dossier `bpu_export_output` est généré dans le répertoire courant ; il contient le script `build_all.sh` et les données de calibration de quantification nécessaires par la suite.



### Phase 2 : compilation du modèle BPU 🐳 \(à effectuer dans l'environnement Docker de la machine de développement\)

La quantification et la compilation du modèle BPU de D-Robotics dépendent de l'environnement OpenExplorer \(OE\). Nous recommandons d'utiliser Docker pour isoler l'environnement.



#### **1\.** **Préparer l'environnement Docker et l'image** 

Assurez-vous que Docker est installé sur la machine de développement ([guide d'installation officiel](https://docs.docker.com/engine/install/)). Téléchargez l'image CPU recommandée et chargez-la :

```Bash
# Charger l'archive d'image hors ligne téléchargée
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Démarrer le conteneur de compilation**

**Conseil pour éviter les pièges :** la compilation du modèle nécessite une mémoire partagée assez grande. Ajoutez impérativement le paramètre `--shm-size=15g`, sinon des erreurs de mémoire IPC surviennent très facilement.

Montez le répertoire de travail de la machine de développement (contenant le dossier que vous venez d'exporter) dans le conteneur :

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Remarque : remplacez `<docker-image-name>` par le nom réel de l'image affiché par `sudo docker images`.\)



#### **3\.** **Exécuter la compilation dans le conteneur** 

Une fois à l'intérieur du conteneur, exécutez le script de compilation en une commande :

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Vérifier les artefacts de compilation** 

Une fois la compilation terminée, un dossier `bpu_output/` est généré sous `bpu_export_output`. Il contient tous les fichiers essentiels nécessaires à l'exécution sur la carte RDK : 

- Cliquez pour voir la structure du répertoire `bpu_output/`

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(fichier de modèle quantifié\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(fichier de modèle quantifié\)

    - `action_mean.npy` et d'autres paramètres de normalisation du dataset

    - `camera1_mean.npy` et d'autres paramètres statistiques de caméra

---

### Phase 3 : déploiement et inférence sur la carte 🤖 \(à effectuer sur le RDK S100\)

**Vérification des prérequis :**

1. L'environnement d'exécution `D-Robotics/lerobot` est déjà configuré sur la carte RDK, et `hbm_runtime` est installé.

2. Le dossier complet `bpu_output/` généré à l'étape précédente a été copié sur la carte RDK via `scp`, une clé USB, etc.

3. La configuration de base de la téléopération est terminée : vérifiez que le port série du bras, le port USB de la caméra et les fichiers de calibration sont correctement configurés.



#### **1\.** **Lancer l'inférence accélérée par BPU**

Dans le terminal de la carte RDK, placez-vous dans le répertoire de la chaîne d'outils et lancez le script de contrôle :

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Résolution des problèmes courants \(Troubleshooting\)

En cas de problème lors du déploiement, vérifiez la liste suivante :

- **Le bras ne bouge pas ?**

    - Vérifiez le montage des périphériques : saisissez `ls /dev/ttyACM*` dans le terminal et confirmez que le numéro de port correspondant au bras est correct.

    - Vérifiez les permissions : essayez d'exécuter le script d'inférence avec `sudo`, ou ajoutez l'utilisateur actuel au groupe `dialout`.

- **Erreur de flux caméra / image anormale / le bras tremble sur place ?**

    - Vérifiez si l'index de la caméra (Camera Index) a dérivé à cause d'un branchement à chaud, et si la configuration des paramètres de caméra dans le code correspond bien aux `/dev/video*` réels.

- **La machine de développement affiche « permissions insuffisantes » lors de la copie des fichiers générés par le conteneur ?**

    - Les fichiers créés dans un répertoire monté par Docker appartiennent par défaut à root ; exécutez `sudo chown -R $USER:$USER bpu_export_output` sur la machine de développement pour corriger cela.

