---
title: "Chapitre 4 : Détection de visage"
description: "Tutoriel ESP32-NanoCam chapitre 4 : utiliser le modèle de détection de visage ESP-DL MobileNet, tracer le cadre du visage et 5 points clés à l'image."
---

# Chapitre 4 : Détection de visage

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

**Objectif de ce chapitre** : faire détecter les visages à l'image par le NanoCam, tracer le cadre du visage et les points clés, puis lire les coordonnées pour un contrôle externe.

## Principe

La détection de visage utilise la bibliothèque d'apprentissage profond ESP-DL, basée sur le modèle de détection léger MobileNet. En entrée une image 320x240 RGB565, en sortie une liste de boîtes englobantes de visages (position + taille + score de confiance). L'inférence s'exécute sur l'ESP32-S3, sans connexion réseau.

### Format des résultats de détection

- Coordonnées : coin supérieur gauche (x,y) + largeur et hauteur (w,h)

- Score de confiance : nombre flottant entre 0 et 1

- Plusieurs visages : plusieurs cadres sont renvoyés

## Étapes

### 4.1 Changer de mode

```Plain
ai_mode:2
```

> Pour la liste complète des commandes, voir le [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md).

### 4.2 Observer le résultat

Ouvrir `http://<IP>` dans le navigateur pour voir le cadre de détection de visage.

### 4.3 Récupérer les coordonnées

Format de sortie du port série :

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- Première ligne : `[index] (x, y, w, h)` — coordonnées du cadre du visage

- Deuxième ligne : 5 points clés — œil gauche, œil droit, nez, commissure gauche, commissure droite

## Code

### Arduino : lire les coordonnées et piloter un servomoteur

```C++
// Analyser le format $face:x,y,w,h#
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Lecture en Python

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## Résultat

Un visage apparaît devant la caméra → un cadre vert est tracé à l'image → les coordonnées sont envoyées sur le port série.

Chapitre suivant : [Chapitre 5 : Détection de visage de chat](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
