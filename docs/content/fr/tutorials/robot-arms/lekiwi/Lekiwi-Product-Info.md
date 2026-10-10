---
title: Informations produit
---

# Informations produit

> **[Acheter en boutique](https://www.juxitech.com/fr/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Présentation du produit

LeKiwi est développé sous la direction de SIGRobotics-UIUC (le groupe d'intérêt pour la robotique de l'Université de l'Illinois à Urbana-Champaign). Il fournit une plateforme robotique open source à faible coût et très flexible, qui favorise la diffusion de la technologie robotique dans l'éducation, la recherche et l'automatisation industrielle. Sa conception matérielle (fichiers d'impression 3D), sa pile logicielle (compatible avec le framework LeRobot) et ses tutoriels sont tous open source, et il prend en charge les extensions définies par l'utilisateur.

LeKiwi se compose d'une plateforme mobile et d'un bras meneur-suiveur. Le bras meneur-suiveur utilise des pièces imprimées en 3D comme structure et 6 servos Feetech 12V comme articulations motrices. Le bras meneur repose sur une plateforme fixe, utilise une carte de commande de servo et se connecte à un ordinateur via USB-C. Le bras suiveur est monté sur la plateforme mobile, qui est entraînée par 3 servos Feetech 12V ; il utilise une carte de commande de servo et est contrôlé via USB-C connecté à un Raspberry Pi.

LeKiwi intègre étroitement LeRobot (le framework d'apprentissage automatique pour robots open source de Hugging Face), prenant en charge l'apprentissage par imitation, la collecte de données et l'entraînement de politiques. Il est implémenté sur PyTorch et comprend des modèles préentraînés, des datasets et un environnement de simulation, et il est compatible avec des datasets open source bien connus tels que Stanford ALOHA. Il utilise le framework DORA (un moteur de flux de données distribué) pour obtenir une communication matériel-algorithme à faible latence (les performances de Python sont 17 fois plus rapides que ROS2) et prend en charge le rechargement à chaud, de sorte que le code peut être ajusté en temps réel sans redémarrage.

LeKiwi est particulièrement adapté à l'éducation et à la recherche débutante : enseignement d'introduction à la robotique, avec des tutoriels de bout en bout couvrant tout, du montage et de la programmation au déploiement de politiques d'IA ; validation de recherche : il prend en charge la recherche sur l'apprentissage par imitation (par exemple, entraîner un robot à partir de vidéos d'opérations humaines enregistrées via VR), avec le cas du robot pollen Ready2 apprenant des tâches telles que plier des vêtements et insérer des clés après seulement 2 heures d'entraînement sur 50 vidéos de 15 secondes ; prototypage industriel : validation à faible coût de solutions d'automatisation (comme la manutention de matériaux et l'assemblage de précision).
