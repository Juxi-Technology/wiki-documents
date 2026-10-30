---
title: "Calibration des servos STS3215 de la série So-ARM – version Web"
description: "Version Web de la calibration des servos STS3215 du SO-ARM101 : connexion des bras leader et follower via Web Serial dans le navigateur, calibration médiane et de course, téléopération, débogueur FT et export des fichiers de calibration."
---

# Calibration des servos STS3215 de la série So-ARM – version Web

> **Outil de bureau :** [Tutoriel d'utilisation de l'outil de calibration des servos de la série SoARM](./SO-ARM101-Servo-Calibration-Tool.md)

**Version Web** de l'outil de calibration des servos du SO-ARM101 : toute l'interface s'exécute dans le navigateur et se connecte directement au port série via Web Serial, **sans installation de Python**.

Adresse en ligne :

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ Cet outil ne prend en charge que les **servos Feetech (série STS3215)**.

## 1. Préparation

- **Navigateur** : Chrome ou Edge 89+ (Firefox / Safari ne prennent pas en charge Web Serial)
- Ouvrir en **HTTPS ou localhost** ; GitHub Pages le satisfait déjà
- **Adaptateur USB-série** + servo Feetech STS3215, **débit 1 M par défaut** (`1000000`)


## 2. Connexion du bras robotique

1. Dans la barre supérieure à gauche, sélectionner le « **débit de connexion** », `1000000` par défaut. **Si le débit du servo a été modifié, sélectionnez d'abord le bon débit avant de vous connecter**.
1. Cliquer sur « **Connecter le port série** » du « bras leader » ou du « bras follower », puis sélectionner le port COM correspondant dans la fenêtre du navigateur.
1. Une fois la connexion établie, les servos sont scannés automatiquement (ID 1–6).


> Les deux bras peuvent être connectés séparément et commandés indépendamment. Si aucun servo n'est détecté, vérifiez d'abord que le débit de connexion correspond à celui des servos, puis que le port série n'est pas occupé par un autre programme.

## 3. Mode démonstration (sans matériel)

Cocher « **Mode démonstration (sans matériel)** » dans la barre supérieure avant de connecter : un jeu de données simulées de 6 servos est utilisé, ce qui permet de parcourir toute l'interface.

> Les données du mode démonstration sont simulées et **aucun matériel réel n'est commandé**.

## 4. Trois pages de fonctions

### 🦾 Calibration des servos

Affiche en temps réel la position, la tension, la température et l'état du couple de chaque servo ; propose les opérations « calibration médiane », « test du point médian », « désactivation du couple » et « effacement des limites » pour un servo individuel, ainsi que l'accès à la calibration du bras complet.

### 🎚️ Contrôle individuel des servos

Une ligne par servo : **ID / Pos / curseur / L (cible)**.

- **Pos et curseur sont liés dans les deux sens** : en faisant glisser le curseur, Pos suit et la commande est envoyée au relâchement ; en saisissant une valeur dans Pos, elle est envoyée immédiatement.


### 🔬 Débogueur FT

Connexion série, scan des servos, lecture de tous les registres, lecture/écriture d'un registre individuel, contrôle de position, modification du débit, rétablissement d'usine, sauvegarde et restauration des paramètres xdat.

## 5. Procédure de calibration complète (recommandée)

1. Sur la page « Calibration des servos », cliquer sur « **Calibration médiane du bras leader** » pour ouvrir l'assistant.
1. Cliquer sur « **Démarrer l'enregistrement du point médian** » (le bouton devient orange) → placer le bras robotique en position médiane standard → cliquer sur « **Terminer l'enregistrement du point médian** ».
1. Cliquer sur « **Enregistrer la plage de mouvement** » (le bouton devient vert) → faire parcourir à chaque articulation toute sa course (**la pince aussi**) → cliquer à nouveau pour arrêter.
1. Une fois les 6 articulations terminées, le **fichier de calibration est enregistré automatiquement** ; répéter l'opération pour le bras follower.
1. Une fois les deux bras calibrés, cliquer sur « **🎮 Téléopération** » dans la barre supérieure pour piloter le bras follower avec le bras leader.


## 6. Où placer les fichiers de calibration

Le navigateur ne peut télécharger les fichiers que dans le dossier « Téléchargements ». Après l'enregistrement, l'assistant affiche le chemin cible ; **veuillez le déplacer manuellement** :

| Bras | Chemin cible |
|---|---|
| Bras leader | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Bras follower | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

Sous Windows, `~` correspond à `%USERPROFILE%` ; le chemin complet ressemble à `%USERPROFILE%.cache\huggingface\lerobot\calibration...`.

## 7. Téléopération

Une fois les deux bras calibrés et connectés, cliquer sur « **🎮 Téléopération** » dans la barre supérieure pour entraîner le bras follower avec les angles du bras leader. Cliquer à nouveau sur « ⏹ Arrêter la téléopération » pour terminer.

> Avant la téléopération, assurez-vous que la zone autour des deux bras est sûre — **une fois le couple activé, le servo ne peut pas être bougé à la main**. La téléopération nécessite deux ports série connectés.

## 8. Débogueur FT en détail

### Lecture et écriture des registres

- Cliquer sur « **Lire tous les paramètres** » pour lire tous les registres du servo sélectionné ; les résultats sont inscrits dans le tableau des paramètres.
- **Cliquer sur une ligne du tableau des paramètres renseigne l'adresse et la longueur ci-dessus ; saisissez ensuite la « valeur » et cliquez sur « Écrire »**.
- Les lignes grises (zone DEFAULT) **ne peuvent être ni lues ni écrites**, afin d'éviter d'écrire par erreur dans des zones en lecture seule.


### Contrôle de position

Après avoir sélectionné le servo, définir la position cible avec le curseur ou une valeur numérique, puis cliquer sur « Déplacer ». Si le couple n'est pas activé, il est d'abord demandé s'il faut l'activer.

### Modification du débit

Après avoir sélectionné le nouveau débit, cliquer sur « Appliquer » ; après l'écriture, la connexion est coupée puis une reconnexion avec le nouveau débit est tentée ; en cas d'échec, la cause est indiquée dans le journal.

### Rétablissement des paramètres d'usine

Remet l'ID à 1 et le débit à 1M, **de façon irréversible** ; une seconde confirmation est requise avant l'exécution.

### Sauvegarde et restauration des paramètres xdat

| Bouton | Action |
|---|---|
| 💾 Enregistrer le servo actuel au format xdat | Lire tous les paramètres et télécharger un fichier `.xdat` |
| 📂 Ouvrir un xdat | Charger un fichier `.xdat` local |
| 📤 Restaurer les paramètres sur le servo | Réécrire les paramètres xdat dans l'EEPROM du servo actuel |

> La restauration écrase des réglages tels que l'ID, le débit et les limites ; avant l'exécution, vérifiez que le servo sélectionné est le bon. L'EEPROM a une durée de vie d'écriture limitée, ne l'écrivez pas trop fréquemment.

## 9. Points d'attention

1. **La page doit rester au premier plan** : le navigateur limite les onglets en arrière-plan ; la téléopération et l'actualisation en temps réel ralentissent, voire s'arrêtent.
1. **La course d'une même articulation doit être parcourue de façon identique sur les deux bras**, sinon l'amplitude des mouvements ne correspondra pas lors de la téléopération.
1. **La pince n'est pas une articulation à rotation continue, mais sa course doit aussi être enregistrée**, sinon la plage retombe sur les valeurs par défaut 0–4095.
1. Dans le débogueur FT, **les lignes grises (zone DEFAULT) ne peuvent être ni lues ni écrites** ; l'EEPROM a une durée de vie d'écriture limitée, ne l'écrivez pas trop fréquemment.
1. **Avant la téléopération, assurez-vous que la zone autour des deux bras est sûre** ; une fois le couple activé, le servo ne peut pas être bougé à la main.
1. Un seul programme peut occuper le port série à la fois — pendant l'utilisation de cette page, fermez la version bureau ou les autres logiciels hôtes.


## 10. Questions fréquentes

**Q1 : Impossible de se connecter / aucun servo détecté.**
Vérifiez d'abord que le débit de connexion correspond à celui des servos, puis que le port série n'est pas occupé par un autre programme.

**Q2 : Pos ne se rafraîchit pas.**
Vérifiez que le servo est en ligne ; recliquez sur « Connecter le port série » ou rechargez la page.

**Q3 : Échec de l'écriture.**
Consultez la cause précise dans le journal ; vérifiez que l'adresse et la longueur proviennent d'une ligne du tableau des paramètres.

**Q4 : Le navigateur actuel ne prend pas en charge Web Serial.**
Utilisez Chrome / Edge 89+ et ouvrez la page via HTTPS ou localhost.

**Q5 : LeRobot ne trouve pas le fichier de calibration enregistré.**
Le navigateur ne télécharge que dans le dossier « Téléchargements » ; déplacez le fichier manuellement vers le chemin indiqué à la section 6.
