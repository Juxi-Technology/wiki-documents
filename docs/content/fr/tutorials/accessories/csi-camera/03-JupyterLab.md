---
title: "03、Utilisation de Jupyter Lab"
description: "Installez Jupyter Lab avec la commande suivante : si le téléchargement de Jupyter Lab est lent, vous pouvez u…"
---

# 03、Utilisation de Jupyter Lab

## 1、Installer Jupyter Lab

### 1.1、Jupyter Lab

Installez Jupyter Lab avec la commande suivante : si le téléchargement de Jupyter Lab est lent, vous pouvez utiliser une source spécifiée pour l'installation.

```Plain Text
sudo apt update
sudo apt install python3-pip -y
sudo pip3 install --upgrade pip
```

```Plain Text
sudo pip3 install jupyterlab
# Source Tsinghua : pip3 install jupyterlab -i https://pypi.tuna.tsinghua.edu.cn/simple
# Source Alibaba Cloud : sudo pip3 install jupyterlab -i https://mirrors.aliyun.com/pypi/simple/
```

![Image 1](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/1.png)

![Image 2](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/2.png)

![Image 3](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/3.png)

![Image 4](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/4.png)

### 1.2、Node.js

Installez la dernière version de Node.js avec la commande suivante :

```Plain Text
sudo apt install curl -y
sudo curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y
```

![Image 5](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/5.png)

Vérifier la version :

```Plain Text
node -v && npm -v
```

![Image 6](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/6.png)

## 2、Démarrer Jupyter Lab

Avant de démarrer Jupyter Lab, vous devez définir le navigateur par défaut du système, sinon des messages apparaissent au démarrage dans le terminal.

### 2.1、Définir le navigateur par défaut

Ouvrez le navigateur Chromium du système et sélectionnez le réglage du navigateur par défaut :

![Image 7](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/7.png)

![Image 8](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/8.png)

### 2.2、Démarrer Jupyter Lab

```Plain Text
jupyter lab
# Démarrage sans navigateur : jupyter lab --no-browser
# Démarrage en tant qu'administrateur : sudo jupyter lab --allow-root
```

![Image 9](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/9.png)

![Image 10](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/10.png)

### 2.3、Accès depuis la machine hôte

La machine hôte désigne l'accès via le système de la carte Jetson ; accédez-y directement via [http://localhost:8888/](http://localhost:8888/) :

`http://localhost:8888/`

![Image 11](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/11.png)

## 3、Configurer Jupyter Lab

Configurez pour Jupyter Lab l'accès au réseau local, le mot de passe d'accès, le démarrage automatique et d'autres opérations.

### 3.1、Accès au réseau local

Configurez que les appareils du même réseau local peuvent saisir IP:8888 dans le navigateur pour y accéder !

**Remarque : l'accès via le réseau local d'un réseau universitaire est généralement impossible ; vous pouvez tester en changeant d'ordinateur portable ou de partage de connexion de téléphone.**

Par exemple, l'IP de la carte est 192.168.0.105 ; via un navigateur du même réseau local, vous pouvez saisir 192.168.0.105:8888 pour accéder à Jupyter Lab de la carte.

#### 3.1.1、Créer un fichier de configuration

```Plain Text
sudo jupyter lab --generate-config
```

Emplacement du fichier de configuration généré automatiquement : Writing default config to: /root/.jupyter/jupyter_lab_config.py

#### 3.1.2、Modifier le fichier de configuration

```Plain Text
sudo gedit /root/.jupyter/jupyter_lab_config.py
```

Contenu à modifier : après la modification, cliquez sur Enregistrer et fermez le fichier.

Vérifiez s'il y a un caractère \# devant le code pour garantir la prise en compte de la configuration.

```Plain Text
# Autoriser les requêtes de toute origine à accéder au serveur Jupyter Lab
c.ServerApp.allow_origin = '*'
# 0.0.0.0 signifie lier toutes les interfaces réseau disponibles et permettre l'accès depuis n'importe quelle adresse
c.ServerApp.ip = '0.0.0.0'
# Autoriser le démarrage du serveur Jupyter Lab en tant qu'utilisateur root
c.ServerApp.allow_root = True
# Modifier le port par défaut pour éviter les conflits
c.ServerApp.port = 8888
```

![Image 12](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/12.png)

### 3.2、Configurer le mot de passe d'accès

Saisissez dans le terminal la commande de définition du mot de passe ; la saisie est requise deux fois, et le mot de passe saisi ne s'affiche pas\!

```Plain Text
sudo jupyter lab password
```

Emplacement du fichier de configuration généré automatiquement : [JupyterPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_server_config.json

![Image 13](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/13.png)

### 3.3、Service de démarrage automatique

#### 3.3.1、Modifier le fichier de service

```Plain Text
sudo gedit /etc/systemd/system/jupyterlab.service
```

Contenu à ajouter : après l'ajout, cliquez sur Enregistrer et fermez le fichier.

```Plain Text
[Unit]
Description=jupyterlab
After=network.target
[Service]
Type=simple
ExecStart=/usr/local/bin/jupyter-lab
config=/root/.jupyter/jupyter_lab_config.py --no-browser
User=root
Group=root
WorkingDirectory=/home/jetson/
Restart=always
RestartSec=10
[Install]
WantedBy=multi-user.target
```

root : le nom d'utilisateur du système

ExecStart : la commande de démarrage de Jupyter lab, remplacez-la par le chemin d'installation de JupyterLab

config : remplacez-le par le chemin du fichier de configuration de JupyterLab

WorkingDirectory : le répertoire de travail ouvert au démarrage de Jupyter-lab, modifiable librement (il est recommandé de le remplacer par le répertoire utilisateur)

`Afficher le chemin d'installation de Jupyter-lab : which jupyter-lab`

`Chemin du fichier de configuration : reportez-vous au chemin du fichier de configuration généré ci-dessus`

![Image 14](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/14.png)

#### 3.3.2、Configurer le service de démarrage automatique

##### Service de démarrage automatique

```Plain Text
sudo systemctl enable jupyterlab
# Désactiver le démarrage automatique : systemctl disable jupyterlab
```

##### **Démarrer le service**

```Plain Text
sudo systemctl start jupyterlab
# Arrêter le service : sudo systemctl stop jupyterlab
```

##### **Afficher l'état du service**

```Plain Text
systemctl status jupyterlab
```

![Image 15](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/15.png)

##### Vérifier le démarrage automatique

Après avoir redémarré le système, selon l'IP du système, accédez à l'IP de la carte:8888 depuis un appareil du même réseau local.

> Lors de la première connexion, vous devez saisir le mot de passe ; le mot de passe correspond aux informations définies aux étapes précédentes.
> 
> Au moment de la capture d'écran, l'IP de la carte est 192.168.0.105, donc les appareils du même réseau local peuvent accéder à 192.168.0.105:8888.
> 
> 

![Image 16](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/16.png)

## 4、Utiliser Jupyter Lab

### 4.1、Noyau

Il est recommandé, à chaque exécution du programme ou en cas d'anomalie du programme, de redémarrer le noyau et de supprimer les sorties de toutes les cellules :

![Image 17](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/17.png)

### 4.2、Exécuter le programme

Ouvrez via Jupyter Lab le fichier de programme à exécuter, puis exécutez le programme en lançant les cellules de haut en bas :

#### 4.2.1、En cours d'exécution

L'affichage de [\*] en haut à gauche de la cellule indique qu'elle est en cours d'exécution :

![Image 18](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/18.png)

#### 4.2.2、Exécution terminée

L'affichage de [nombre] en haut à gauche de la cellule indique le nombre d'exécutions : par exemple [1] → le programme a exécuté le code de cette cellule lors du premier lancement

![Image 19](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/19.png)



