---
title: "Chapitre 5 : Détection de visage de chat"
description: "Tutoriel ESP32-NanoCam chapitre 5 : utiliser le modèle CatFaceDetectMN03 pour détecter les visages de chats."
---

# Chapitre 5 : Détection de visage de chat

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

**Objectif de ce chapitre** : faire détecter le visage des chats par le NanoCam et comprendre ses différences avec le modèle de détection de visage humaine.

## Principe

La détection de visage de chat utilise le modèle CatFaceDetectMN03, entraîné et optimisé pour les caractéristiques du visage félin (oreilles triangulaires / écart interoculaire large / museau). En entrée une image 320x240 RGB565, en sortie une liste de boîtes englobantes de visages de chats. Elle partage le même format de sortie `print_detection_result` que la détection de visage du [chapitre 4](./Ch04-Face-Detection.md).

### Différences entre les modèles de détection de visage de chat et humaine

|Critère|Détection de visage (ai_mode:2)|Détection de visage de chat (ai_mode:1)|
|---|---|---|
|Modèle|MSR01 + MNP01 en double cascade|CatFaceDetectMN03 en un seul étage|
|Points clés|10 (deux yeux / nez / commissures des lèvres)|Aucun (le modèle ne les fournit pas)|
|Seuil de confiance|MSR01=0.3, MNP01=0.4|0.4|
|Tracé du cadre de détection|Rectangle vert creux + 5 points clés|Rectangle vert creux (sans points clés)|

## Étapes

### 5.1 Changer de mode

```Plain
ai_mode:1
```

L'appareil redémarre automatiquement en mode détection de visage de chat

> Pour la liste complète des commandes, voir le [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md).

### 5.2 Observer le résultat

Placez un chat ou une photo de chat devant la caméra ; en ouvrant `http://<IP>` dans le navigateur, un cadre de détection vert s'affiche sur le visage du chat.

### 5.3 Sortie du port série

Lorsqu'un visage de chat est détecté, le port série affiche :

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
```

- Format : `[index] (x, y, w, h)` — coordonnées du coin supérieur gauche du cadre + largeur et hauteur

- Le modèle de visage de chat ne fournit pas de points clés (contrairement à la détection de visage humaine)

## Code

### Logique de détection principale

`components/modules/ai/who_cat_face_detection.cpp`:

```C++
CatFaceDetectMN03 detector(0.4F, 0.3F, 10, 0.3F);
std::list<dl::detect::result_t> &detect_results = detector.infer(
    (uint16_t *)frame->buf, {(int)frame->height, (int)frame->width, 3});

if (detect_results.size() > 0) {
    draw_detection_result((uint16_t *)frame->buf, frame->height, frame->width, detect_results);
    print_detection_result(detect_results);  // Sortie des coordonnées sur le port série
}
```

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

### Lecture du port série en Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
while True:
    line = ser.readline().decode().strip()
    if "detection_result" in line:
        print(line)
```

## Résultat

Le chat apparaît → un cadre vert est tracé à l'image → les coordonnées sont envoyées sur le port série. Elles peuvent être lues en Arduino/Python pour piloter un servomoteur et suivre le chat.

Chapitre suivant : [Chapitre 6 : Reconnaissance des couleurs](./Ch06-Color-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
