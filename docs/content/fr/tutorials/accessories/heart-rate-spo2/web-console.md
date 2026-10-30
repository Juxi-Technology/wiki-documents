---
title: "Console Web – Guide d'utilisation"
description: "Connecter et surveiller le module de fréquence cardiaque et SpO2 MAX30102 avec la version navigateur du logiciel hôte (Web Serial), sans installation."
---

# Console Web – Guide d'utilisation

Ce tutoriel explique comment utiliser la version navigateur du logiciel hôte pour connecter et surveiller le module de fréquence cardiaque et SpO2. La version Web accède directement au port série via Web Serial ; elle ne nécessite l'installation ni de Python ni d'un `.exe` et fonctionne sous Windows, macOS et Linux.

**Adresse en ligne :** [https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> La version Web et le logiciel hôte de bureau utilisent le même protocole Modbus RTU (adresse esclave `0x20`, 9600 bauds) ; les valeurs lues sont parfaitement identiques.

## 1. Prérequis

- Version bureau de **Chrome, Edge ou Opera** (prise en charge de Web Serial requise)
- Safari, Firefox et les navigateurs mobiles n'implémentent pas Web Serial et ne peuvent pas se connecter au port série
- Pilote USB-TTL (CH340, CP2102, FT232, etc.)
- La page nécessite une connexion Internet pour se charger
- Le navigateur n'autorise qu'un seul appareil série à la fois pour la page

## 2. Câblage matériel

| Module de fréquence cardiaque et SpO2 | USB-TTL |
|---|---|
| **VCC** | **5 V** (ne pas brancher sur 3,3 V) |
| **GND** | **GND** |
| **TX** | **RX** (connexion croisée) |
| **RX** | **TX** (connexion croisée) |

⚠️ TX et RX doivent être croisés. Une fois le câblage terminé, branchez l'adaptateur USB-TTL sur l'ordinateur.

## 3. Connecter l'appareil

1. Ouvrez l'adresse en ligne ci-dessus dans la version bureau de Chrome / Edge / Opera.
1. Laissez le débit à **9600**, comme sur le module.
1. Cliquez sur « **Connecter le port série** » et sélectionnez, dans la fenêtre du navigateur, le périphérique USB-série correspondant au module.
1. L'état « **Connecté, prêt à acquérir** » indique que la connexion a réussi ; l'appareil sélectionné s'affiche à côté du bouton.

> Les paramètres série sont fixes : 8 bits de données, 1 bit d'arrêt, sans parité, sans contrôle de flux. Ils sont configurés automatiquement par la page, aucune configuration manuelle n'est nécessaire.

## 4. Démarrer l'acquisition et la surveillance

1. Cliquez sur « **Démarrer l'acquisition** » — la LED du module s'allume et l'état passe à « Acquisition démarrée, LED allumée ».
1. Placez le doigt sur le capteur en couvrant entièrement la zone optique ; un contact léger suffit, n'appuyez pas fort.
1. Cliquez sur « **Démarrer la surveillance** » — l'état passe à « Surveillance en cours… » et les données en temps réel commencent à se rafraîchir.

## 5. Présentation de l'interface

### Données en temps réel

| Indicateur | Unité | Description |
|---|---|---|
| Saturation en oxygène (SPO2) | % | Saturation en oxygène du sang |
| Fréquence cardiaque | battements/min | Fréquence du pouls |
| Température | °C | Température de la carte du module, pas la température corporelle |

**Filtrage** : activé par défaut. Les valeurs sont lissées par une médiane sur 5 points, et les valeurs aberrantes hors plage raisonnable sont éliminées (fréquence cardiaque 35–220, SpO2 70–100 %, température 0–60 °C). Le nombre de valeurs éliminées s'affiche sous la zone de données, par exemple « N valeurs aberrantes éliminées ». Décochez la case pour afficher les valeurs brutes non traitées.

**Messages d'état** : Non connecté / En attente de sélection de l'appareil… / Connecté, prêt à acquérir / Acquisition démarrée, LED allumée / Acquisition arrêtée, LED éteinte / Surveillance en cours… / Surveillance arrêtée / Appareil déconnecté / Le navigateur actuel ne prend pas en charge Web Serial.

### Changement de langue

Le bouton **EN / 中文** en haut à droite permet de changer la langue de l'interface. Le débit et l'état du filtrage sont mémorisés par le navigateur et conservés à la prochaine ouverture.

### Onglet « Documentation »

L'onglet « **Documentation** » en haut intègre les tutoriels de ce produit en 11 langues ; la langue peut être changée directement dans la page.

## 6. Arrêter et déconnecter

Ordre recommandé :

1. Cliquez sur « Arrêter la surveillance »
1. Cliquez sur « Arrêter l'acquisition » — la LED s'éteint
1. Cliquez sur « Déconnecter »

## 7. Interprétation des données

| Donnée | Plage normale | Description |
|---|---|---|
| Saturation SpO2 | 95% – 100% | en dessous de 90 %, consultez un médecin |
| Fréquence cardiaque | 60 – 100 battements/min | plage au repos chez l'adulte |
| Température | 25 – 35 °C | température du capteur embarqué, pas la température corporelle |

Juste après la connexion ou si le doigt est mal placé, l'affichage de `-1` est normal.

## 8. Différences avec le logiciel hôte de bureau

| Critère | Version Web | Logiciel hôte de bureau |
|---|---|---|
| Installation | aucune installation | `.exe` ou script Python requis |
| Environnement | navigateur | Windows |
| Communication | Web Serial | port série du système |
| Utilisation hors ligne | non prise en charge, la page nécessite Internet | prise en charge |
| Protocole et valeurs | identiques | identiques |

## 9. Questions fréquentes

**Q1 : Le message « Le navigateur actuel ne prend pas en charge Web Serial » apparaît.**

Utilisez la version bureau de Chrome, Edge ou Opera. Safari, Firefox et les navigateurs mobiles n'implémentent pas Web Serial.

**Q2 : Après avoir cliqué sur « Connecter le port série », aucun appareil n'apparaît dans la fenêtre.**

Vérifiez que le pilote USB-TTL est installé et que le câble de données prend en charge le transfert de données ; essayez un autre port USB ou rebranchez l'appareil.

**Q3 : La connexion échoue.**

Vérifiez que le port série n'est pas occupé par un autre programme (assistant série, Arduino IDE, etc.) et que l'appareil est bien alimenté.

**Q4 : Après avoir cliqué sur « Démarrer l'acquisition », la LED ne s'allume pas.**

Vérifiez que VCC est branché sur 5 V et non sur 3,3 V, et que TX/RX sont bien croisés.

**Q5 : Les données affichent toujours -1.**

Vérifiez que « Démarrer l'acquisition » a bien été cliqué, que le doigt couvre entièrement la zone optique du capteur et reste stable quelques secondes.

**Q6 : L'appareil a été débranché.**

La page affiche « Appareil déconnecté » ; rebranchez-le puis cliquez de nouveau sur « Connecter le port série ».

## 10. Précautions

1. Branchez d'abord le capteur, puis l'USB.
1. Le capteur doit être alimenté en 5 V ; le 3,3 V peut ne pas fonctionner correctement.
1. Pendant la mesure, couvrez entièrement la zone optique avec le doigt, sans appuyer fort.
1. Évitez la lumière directe et intense sur le capteur.
1. Le navigateur n'autorise qu'un seul appareil série à la fois ; plusieurs appareils doivent être connectés séparément.
