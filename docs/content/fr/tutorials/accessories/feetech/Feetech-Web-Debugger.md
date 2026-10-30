---
title: "Débogage Web des servos à bus Feetech (SCS0009 / STS3215 / HD1910)"
description: "Débogage Web des servos à bus Feetech : connexion via Web Serial dans le navigateur, prise en charge du scan, de la lecture/écriture des paramètres, du contrôle de position, de la modification du débit, du rétablissement d'usine et de la sauvegarde xdat pour SCS0009 / STS3215 / HD1910."
---

# Débogage Web des servos à bus Feetech (SCS0009 / STS3215 / HD1910)

> **Outil de bureau :** [Tutoriel d'utilisation de l'outil de débogage du servo SCS0009](./SCS0009-Debug-Tool.md) ｜ [Tutoriel de débogage STS3215 & SCS0009](./Feetech-STS3215&SCS0009-Tutorial.md)

Version Web de l'outil de débogage des servos à bus Feetech : le navigateur ouvre directement le port série USB via **Web Serial** pour communiquer avec les servos, et permet d'effectuer la connexion série, le scan des servos, l'identification du modèle, la lecture/écriture des paramètres, le contrôle de position avec suivi en temps réel, la modification du débit, le rétablissement des paramètres d'usine ainsi que la sauvegarde et la restauration des paramètres xdat.

Page purement statique, **sans installation de logiciel ni d'environnement Python** : ouvrez l'adresse et utilisez-la directement. Elle prend actuellement en charge les trois modèles **SCS0009**, **STS3215** et **HD1910**.

## 1. Ouvrir la page Web

Adresse en ligne :

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

Le même site propose également un tutoriel complet pour la version Web (bascule chinois/anglais) :

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Configuration requise :

- **Chrome ou Edge 89+** (Firefox et Safari ne prennent pas en charge Web Serial)
- La page doit être ouverte via **https ou localhost**
- Un pilote USB-vers-TTL doit être installé (CH340, CH343, CP2102, etc.)


## 2. Connexion au port série

1. Dans la zone « 🔌 Connexion série », sélectionner le **débit**, 1000000 (1M) par défaut.
1. Cliquer sur « **Connecter le port série** » et sélectionner, dans la boîte de dialogue système du navigateur, le port USB correspondant au servo.
1. Une fois la connexion établie, l'état en haut à droite devient « 🟢 Connecté ».


Débits disponibles : 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Scan des servos et identification du modèle

1. Après la connexion, cliquer sur « 🔍 **Scanner les servos** ». La page scanne les ID 1–254 et **affiche les servos dès qu'ils sont trouvés**, sans attendre la fin du scan complet.
1. Pendant le scan, le bouton devient le rouge « ⏹ **Arrêter le scan** » ; un nouveau clic interrompt le scan et les servos déjà trouvés sont conservés.
1. Cliquer sur la puce du servo (ou sur la liste déroulante au-dessus) pour sélectionner le servo cible.


Le modèle est déterminé automatiquement à partir des **deux octets aux adresses 3 / 4** (numéro de version principal et secondaire du servo) :

| Modèle | Octets d'identification (principal / secondaire) | Plage de position | Ordre des octets |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | big-endian |
| STS3215 | 9 / 3 | 0–4095 | little-endian |
| HD1910 | 10 / 31 | 0–4095 | little-endian |

Le résultat de l'identification est affiché sur la puce du servo, par exemple **ID1 (SCS0009 · SCS)** ; le tableau des paramètres et la plage de position changent automatiquement avec le servo sélectionné. Les modèles absents de la table d'identification sont affichés comme « Modèle inconnu » ; les deux octets réellement lus sont imprimés dans le journal, afin de pouvoir nous les transmettre pour compléter la table.

## 4. Tableau des paramètres

Le tableau des paramètres présente tous les registres du servo sélectionné en cinq colonnes — **adresse, registre, valeur, zone mémoire, lecture/écriture** — ; la zone mémoire est divisée en EPROM, SRAM et DEFAULT et colorée selon la zone.

> **Seules les lignes dont la colonne « lecture/écriture » est marquée comme accessible en écriture peuvent être sélectionnées et écrites** ; les registres en lecture seule et la zone DEFAULT ne réagissent pas aux clics et n'entrent pas dans la ligne d'écriture, ce qui évite d'écrire par erreur dans une zone en lecture seule.

## 5. Lecture et écriture des paramètres

**Lire les paramètres** : après avoir sélectionné le servo cible via la puce du servo, la page **lit automatiquement tous les paramètres du servo** et les inscrit dans le tableau des paramètres, tout en positionnant le curseur du contrôle de position sur sa position réelle actuelle. Il est aussi possible de cliquer à tout moment sur « 📖 Lire les paramètres » pour actualiser manuellement.

**Écrire des paramètres** :

1. **Sélectionner une ligne** dans le tableau des paramètres (seules les lignes accessibles en écriture sont sélectionnables).
1. En bas, « Adresse d'écriture 0x » et « Longueur » sont remplis automatiquement.
1. Saisir la nouvelle valeur dans le champ « Valeur » et cliquer sur « ✏️ **Écrire** ».
1. Lors de l'écriture dans l'EEPROM, la page effectue automatiquement **déverrouiller → écrire → verrouiller** ; le résultat est présenté dans une fenêtre superposée avec la cause de l'échec éventuel.


> Avant de modifier des paramètres comme l'ID, le débit ou les limites d'angle, enregistrez d'abord une sauvegarde xdat via « Enregistrer le servo actuel », afin de pouvoir restaurer facilement en cas d'erreur.

## 6. Contrôle de position

1. Après avoir sélectionné le servo, dans la zone « 🎯 Contrôle de position », faites glisser le curseur **position cible** ou saisissez directement la valeur dans le champ numérique. La plage dépend du modèle : **0–1023 pour le SCS0009**, **0–4095 pour le STS3215 / HD1910** ; le curseur et le champ numérique sont liés dans les deux sens.
1. Régler la **vitesse** (valeur brute du registre ; la signification de l'unité diffère selon la série).
1. Cliquer sur « ▶ **Déplacer** » pour exécuter ; la page interroge le drapeau MOVING et, à la fin du mouvement, invite à couper le couple.


**Suivi en temps réel** : après avoir coché « Suivi en temps réel », le servo suit le curseur en temps réel. À la coche, une seconde confirmation est d'abord demandée et le couple du servo est activé automatiquement ; l'envoi est limité pour ne pas saturer le bus. Le changement de servo, un nouveau scan ou une déconnexion désactivent automatiquement ce mode et rappellent de couper le couple.

Contrôle du couple :

| Bouton | Action |
|---|---|
| ⚡ Couple activé | Activer le couple du servo actuel |
| ⏹ Couple coupé | Couper le couple du servo actuel |
| ⏹ Couper tous les couples | Libérer d'un clic tous les servos du bus |

> **Si la connexion est interrompue pendant un mouvement, coupez immédiatement le couple après la reconnexion.**

## 7. Lecture de l'état

Cliquer sur « 📊 Lire l'état » : la barre d'état en dessous affiche la position actuelle, la vitesse, la charge, la tension, la température, le courant et les drapeaux de fonctionnement.

## 8. Modification du débit

1. Dans la zone « 🔧 Débit / Rétablissement d'usine », sélectionner le **nouveau débit**.
1. Cliquer sur « 🔧 **Modifier le débit** ».
1. Après l'écriture, la page **rouvre le port série au nouveau débit et relit pour vérifier** ; en cas d'échec, elle **revient automatiquement** à l'ancien débit pour éviter que le servo ne devienne injoignable.


## 9. Rétablissement des paramètres d'usine

Cliquer sur « 🔄 **Rétablir les paramètres d'usine** » ; une **seconde confirmation** est requise avant l'exécution. La commande de rétablissement diffère selon la série ; la page la choisit automatiquement selon le modèle identifié :

| Modèle | Commande de rétablissement | Après l'exécution |
|---|---|---|
| SCS0009 | 0x0A rétablissement d'usine | L'ID revient à 1, le débit revient à 1M |
| STS3215 / HD1910 | 0x06 rétablissement des paramètres | L'ID reste inchangé, les autres paramètres reviennent aux valeurs par défaut |

> Le rétablissement d'usine est **irréversible** ; il est conseillé d'enregistrer d'abord une sauvegarde xdat.

## 10. Sauvegarde et restauration des paramètres xdat

La zone « 📁 Paramètres xdat (sauvegarde EEPROM uniquement) » propose trois opérations :

| Bouton | Action |
|---|---|
| 💾 Enregistrer le servo actuel | Lire tous les paramètres du servo et les télécharger dans un fichier .xdat |
| 📂 Ouvrir un xdat | Charger un fichier .xdat local et prévisualiser son contenu |
| 📤 Restaurer les paramètres sur le servo | Réécrire les paramètres xdat chargés dans l'EEPROM du servo actuel |

Le nom du fichier enregistré contient **le modèle et l'ID**, par exemple **SCS0009_ID1.xdat**, **HD1910_ID6.xdat**, afin d'éviter que le même ID de modèles différents ne s'écrase mutuellement.

Le format du fichier est « en-tête de 2 octets + zone de données de 49 octets » ; l'adresse de registre A est stockée à l'offset A+2 ; les valeurs multi-octets sont stockées selon l'ordre des octets du modèle (big-endian pour SCS, little-endian pour STS / HD1910).

> Pour éviter de mélanger les paramètres, la page vérifie que le fichier et le servo actuel appartiennent à la même famille d'ordre des octets ; **en cas de discordance, la réécriture est interdite**. Lors de la restauration, seuls les paramètres EEPROM accessibles en écriture sont écrits, le modèle et les zones en lecture seule sont ignorés ; la zone de données ne couvre que les adresses 0–48. Avant de restaurer, vérifiez que l'ID du servo sélectionné est correct.

## 11. Journal

Le « 📜 Journal » en bas de page enregistre en temps réel chaque opération et le résultat retourné ; il peut être vidé via « Effacer ».

L'interface prend en charge **la bascule chinois/anglais** — le bouton « EN / English » en haut à droite change instantanément la langue de l'interface et du journal ; les entrées historiques sont également actualisées, sans reconnexion.

## 12. Consignes de sécurité

- ⚠️ Un seul programme peut occuper le port série à la fois. Pendant l'utilisation de cette page, fermez le logiciel hôte de bureau, le terminal série et les autres programmes.
- ⚠️ Si le câble est débranché pendant un mouvement, le servo peut continuer d'exécuter l'action — après la reconnexion, **coupez d'abord le couple**.
- ⚠️ Effectuez toujours le câblage et les branchements hors tension.
- ⚠️ Avant de quitter la page, cliquez sur « ⏹ Couper tous les couples » pour libérer tous les servos d'un clic.


## 13. Questions fréquentes

**Q1 : La page indique que Web Serial n'est pas pris en charge ou la connexion est impossible.**
Utilisez Chrome / Edge 89+ et accédez via https ou localhost. Firefox et Safari n'implémentent pas Web Serial.

**Q2 : La connexion échoue avec le message « impossible d'ouvrir le port série ».**
Vérifiez que le port n'est pas occupé par un autre programme (logiciel hôte de bureau, terminal série, Arduino IDE, etc.) et que le pilote USB-vers-TTL est installé.

**Q3 : Aucun servo n'est détecté.**
Vérifiez que le câblage est correct, que le servo est alimenté et que le débit correspond à celui du servo. Si le débit du servo a été modifié, essayez d'abord les autres valeurs ; en cas de conflit d'ID sur le bus, deux servos répondent simultanément — connectez d'abord un seul servo pour identifier le problème.

**Q4 : Certaines lignes du tableau des paramètres ne réagissent pas aux clics.**
C'est voulu : seules les lignes dont la colonne « lecture/écriture » est marquée comme accessible en écriture peuvent être sélectionnées pour l'écriture ; les registres en lecture seule et la zone DEFAULT ne sont pas accessibles en écriture.

**Q5 : Que faire si la modification du débit échoue ?**
La page revient automatiquement à l'ancien débit et indique la cause de l'échec ; vérifiez le câblage puis réessayez.

**Q6 : Que faire si le servo affiche « Modèle inconnu » ?**
Cela signifie que les deux octets aux adresses 3 / 4 du servo ne figurent pas dans la table d'identification. Seuls les SCS0009, STS3215 et HD1910 sont actuellement pris en charge ; consultez les valeurs « version principale / version secondaire » dans le journal et transmettez-les-nous pour compléter la table.

**Q7 : Le comportement n'a pas changé après une mise à jour de la page.**
Le navigateur met les scripts en cache ; effectuez un rafraîchissement forcé (Windows : Ctrl+Shift+R ; macOS : Cmd+Shift+R).
