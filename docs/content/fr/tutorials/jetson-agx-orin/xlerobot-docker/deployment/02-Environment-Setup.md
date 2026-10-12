---
title: 02 · Préparation de l'environnement
---

# 02 · Préparation de l'environnement

> **Précédent :** [01-Overview](01-Overview.md)
> **Suivant :** [03-Deployment](03-Deployment.md)

Installez Docker, configurez les miroirs pour la Chine continentale et branchez le matériel. **Sans cette page, la suivante ne fonctionnera pas.**

---

## 1. Installer Docker

Si Docker est déjà installé, vous pouvez passer cette étape ; vérifiez d'abord :

```bash
docker --version
```

Sinon :

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**Après la dernière commande, vous devez vous reconnecter** (déconnexion puis reconnexion, ou redémarrage), sinon la commande `docker` renverra une
erreur d'autorisation. Pour vérifier :

```bash
docker run --rm hello-world
```

---

## 2. Configurer le miroir de registre ⚠️ indispensable en Chine continentale

**Depuis la Chine continentale, la connexion directe à Docker Hub expire** : sans miroir configuré, aucune image ne peut être téléchargée.

Modifiez `/etc/docker/daemon.json` (créez-le s'il n'existe pas) :

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Redémarrez Docker :

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Vérifiez que le changement est pris en compte :

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Beaucoup d'adresses de miroirs qui circulent en ligne ne fonctionnent plus (USTC, NetEase et
> `dockerproxy.com` ont cessé leur service) — ne recopiez pas de vieux articles. Les trois adresses
> ci-dessus ont été testées et fonctionnent en septembre 2026.

---

## 3. Préparer le matériel

### 3.1 Câblage du robot

1. Reliez les servos du bras SO-101 à l'ordinateur via la carte d'adaptation USB
2. Branchez la caméra en USB (avec une RealSense, utilisez un port USB 3.0)

### 3.2 Autorisations du port série ⚠️ Important

Sans cette configuration, **le conteneur ne verra pas les périphériques** :

```bash
sudo usermod -aG dialout $USER
```

**Là encore, une reconnexion est nécessaire pour que cela prenne effet.**

### 3.3 Vérifier que les périphériques sont détectés

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # port série des servos
ls /dev/video*                   # caméra
```

Si les nœuds de périphériques s'affichent, le système les a bien reconnus.

---

## 4. Configurer le miroir Hugging Face ⚠️ indispensable en Chine continentale

**`huggingface.co` est totalement inaccessible depuis la Chine continentale**, alors qu'il est indispensable pour charger les modèles pré-entraînés.

Ajoutez cette variable d'environnement au démarrage du conteneur :

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh` l'a déjà configurée par défaut. En mode totalement hors ligne, ajoutez aussi `-e HF_HUB_OFFLINE=1`.

---

## Liste de vérification

Avant de passer à la page suivante, assurez-vous que tout ce qui suit est validé :

```bash
docker --version                       # Docker est installé
docker info | grep -A4 "Registry Mirrors"   # le miroir est actif
groups | grep dialout                  # autorisations du port série configurées (après reconnexion)
ls /dev/ttyACM*                        # périphérique détecté
```

---

> **Suivant :** [03-Deployment](03-Deployment.md) — télécharger l'image, démarrer le conteneur
