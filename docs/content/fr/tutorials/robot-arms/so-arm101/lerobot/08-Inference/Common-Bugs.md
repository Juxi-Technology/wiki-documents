---
title: "Étape 8 : Bugs courants et solutions"
description: "Résolvez les pannes fréquentes au déploiement : échec d'acquisition ou déconnexion de la caméra, et erreurs de communication avec les servomoteurs."
---

# Étape 8 : Bugs courants et solutions

## Échec d'acquisition de la caméra

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Vérifiez si le câblage de la caméra du poignet est desserré, en particulier le câblage du côté proche de la caméra, qui est très sujet aux mauvais contacts

## Déconnexion de la caméra

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Redémarrez la ligne de commande

## Problème de communication avec les servomoteurs 1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Solution : dans le code de `lerobot/src/lerobot/motors/motors_bus.py`, remplacez tous les `num_retry` par 99, en particulier ceux correspondant à la ligne de l'erreur

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Problème de communication avec les servomoteurs 2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Solution : recalibrer le bras robotisé

<RelatedProducts slugs="so-arm101" />
