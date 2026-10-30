---

title: "Tutoriel d'utilisation de la main dextre AmazingHand"

description: "Tutoriel complet de la main dextre open source AmazingHand : documentation produit, kit caméra d'environnement, reconnaissance de gestes sur le web, suivi de gestes MuJoCo, contrôle d'interface, Arduino Nano, débogage TTL et PWM."

---



# Tutoriel d'utilisation de la main dextre AmazingHand



AmazingHand est un projet open source de main humanoïde coûtant moins de 250 dollars, destiné aux passionnés de robotique, aux chercheurs et aux développeurs.



## Présentation du projet



- **Conception mécanique** : 8 degrés de liberté, 4 doigts, 2 articulations couplées par doigt ; les doigts sont entraînés par un mécanisme parallèle, sans câbles externes, tous les actionneurs étant intégrés à la main ; pièces imprimées en 3D, poids d'environ 400 g, coût inférieur à 200 euros.

- **Solution de contrôle** : pilotage Python via le bus série (prise en charge de matériels comme Waveshare) ; au choix, deux solutions Arduino + Feetech TTL Linker ; exemples de code Python et Arduino fournis ; prise en charge des retours tels que l'activation/désactivation du couple des servos, la détection de position et la surveillance de température.

- **Ressources complètes** : nomenclature BOM complète, fichiers CAO et documentation en ligne Onshape, tutoriels d'assemblage et scripts de calibration, exemples de démonstration de base et avancés, prise en charge de la cinématique inverse/directe.

- **Points forts du projet** : s'adapte aux poignets de robots comme Reachy2 ; conception ouverte, portée par la communauté ; les développements prévus incluent la perception tactile, des articulations élastiques, des longueurs de doigts variables et une version à 5 doigts.



## Sommaire des tutoriels



| Contenu | Description |
|---|---|
| [Documentation produit](./product-info.md) | Paramètres du produit, BOM, structure et téléchargements |
| [Installation du kit caméra d'environnement](./Camera-Kit-Installation.md) | Étapes de montage du support du kit caméra |
| [Reconnaissance de gestes sur le web](./AmazingHand-Web-Control.md) | Contrôle web en ligne et déploiement local |
| [Suivi de gestes (simulation MuJoCo)](./gesture-tracking/02-Windows.md) | Déploiement et exécution en un clic sous Windows / Linux / Mac |
| [Tutoriel de contrôle d'interface](./AmazingHand-Interface-Control.md) | Contrôle via GUI Python / ligne de commande, calibration des deux mains et protocole |
| [Tutoriel Arduino Nano](./Arduino-Nano-Tutorial.md) | Câblage de la carte Nano, installation des bibliothèques et programme de démonstration |
| [Débogage des servos série TTL – assemblage](./AmazingHand-TTL-Debugging.md) | Assemblage et débogage des servos série TTL |
| [Débogage des servos PWM](./pwm-debugging/01-GUI-Visual-Control.md) | Visualisation GUI, suivi de gestes et manuel d'utilisation |



## Téléchargements



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — déploiement en un clic du suivi de gestes (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — outil de calibration des servos Feetech SCS0009

- [Dépôt officiel AmazingHand](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — Paquet de livraison PWM（GUI / suivi des gestes / firmware / documentation）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Paquet de déploiement local
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Outil de débogage servo


### Toutes les pages

- [Documentation produit AmazingHand](./product-info.md)
- [Installation du kit caméra d'environnement](./Camera-Kit-Installation.md)
- [Contrôle web AmazingHand](./AmazingHand-Web-Control.md)
- [Déploiement et exécution en un clic sous Windows](./gesture-tracking/02-Windows.md)
- [Déploiement et exécution en un clic sous Linux (Ubuntu)](./gesture-tracking/01-Ubuntu.md)
- [Déploiement et exécution en un clic sous Mac](./gesture-tracking/03-macOS.md)
- [Tutoriel d'exécution de l'exemple officiel de la main robotique](./AmazingHand-Official-Example.md)
- [Tutoriel de contrôle d'interface](./AmazingHand-Interface-Control.md)
- [Tutoriel Arduino Nano](./Arduino-Nano-Tutorial.md)
- [Tutoriel de débogage de la main robotique (servo TTL)](./AmazingHand-TTL-Debugging.md)
- [01-Contrôle visuel par GUI](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutoriel de suivi de gestes](./pwm-debugging/02-Gesture-Tracking.md)
- [03-Version servomoteurs PWM - Manuel d'utilisation](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Version servomoteurs série - Notice d'utilisation](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Tutoriel complet](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

