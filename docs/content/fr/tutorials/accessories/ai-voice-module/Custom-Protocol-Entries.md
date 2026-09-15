---
title: "Création d'entrées de protocole personnalisées"
description: "Le module est déjà flashé en usine avec le micrologiciel de reconnaissance vocale, et le micrologiciel d'usin…"
---

# Création d'entrées de protocole personnalisées

## 1. Création du micrologiciel de la puce vocale

## 1.1 Précautions

Le module est déjà flashé en usine avec le micrologiciel de reconnaissance vocale, et le micrologiciel d'usine est également fourni dans l'archive de ressources. Si vous devez recréer le micrologiciel, vous pouvez suivre les étapes ci-dessous pour le créer.

## 1.2 Création du micrologiciel

Vous devez d'abord ouvrir le lien “[Plateforme AI vocale Chipintelli](https://aiplatform.chipintelli.com/)” pour accéder au site web de création de micrologiciel.  Cliquez sur “Développement de fonctions” dans la barre de menu, puis sur “Application de grand modèle de reconnaissance vocale hors ligne” sous la colonne de développement de produits.

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

À ce moment-là, une demande de connexion s'affiche. Vous devez créer un compte sur la plateforme avec vos propres informations ; le compte utilisé dans ce tutoriel a été créé à l'avance. Après vous être connecté, cliquez à nouveau sur “Développement du micrologiciel de reconnaissance vocale et du SDK”.

![Image 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

Après le changement de page, cliquez sur Nouveau projet à gauche et créez un produit comme indiqué dans la figure ci-dessous. Le nom et la description du produit peuvent tous deux être personnalisés ; les autres informations doivent être sélectionnées conformément au contenu encadré en rouge, et le type de produit doit être sélectionné comme “Général->Contrôle central intelligent”. Lorsque c'est terminé, cliquez sur Créer.

![Image 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

Ensuite, vous devez renseigner les informations de base du projet. Nous devons reconnaître le chinois, nous sélectionnons donc “Chinois” comme type de langue ; si vous devez reconnaître l'anglais, vous pouvez également le modifier en conséquence. Pour les autres informations, sélectionnez simplement comme indiqué dans la figure ci-dessous, puis cliquez sur Continuer.

![Image 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

Vous devez ensuite configurer le micrologiciel ; nous n'expliquons ici que les parties à modifier. Activez l'annulation d'écho dans les paramètres de l'algorithme.

![Image 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

Dans les paramètres matériels, la source d'oscillateur à quartz doit être sélectionnée comme “RC interne”.

![Image 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

Dans la configuration du port série d'impression, configurez le niveau UART0 en collecteur ouvert, avec prise en charge d'un pull-up externe de 5V.

![Image 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

Modifiez la configuration du port série de communication : réglez le débit en bauds sur 115200 et configurez le niveau UART1 en collecteur ouvert, avec prise en charge d'un pull-up externe de 5V. Une fois la configuration terminée, cliquez sur “Continuer” pour passer à l'étape suivante.

![Image 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

Nous passons maintenant à la fonction d'édition des mots de commande. Vous devez d'abord choisir le timbre de diffusion ; nous sélectionnons ici “小蝶-清新女声 Ver.3”.

![Image 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

Nous téléversons ensuite la pièce jointe des mots de commande. Trouvez le tableau “命令词播报词协议列表V1_中文” dans le même chemin que ce document, et glissez-le directement dans la page web pour le téléverser.

![Image 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

Après avoir téléversé le fichier, vous pouvez voir les données de nos mots de commande dans le tableau ci-dessous.

![Image 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

Activez la fonction d'auto-apprentissage et sélectionnez l'apprentissage spécifié ; le système génère alors automatiquement 4 instructions d'auto-apprentissage, que nous ne modifions pas ici.

![Image 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

Après la soumission, attendez quelques minutes pour que la création du micrologiciel soit terminée ; une fois terminée, cliquez sur Télécharger le micrologiciel pour obtenir le micrologiciel créé.

![Image 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

Pour les étapes de flashage du micrologiciel, consultez « [Flashage du micrologiciel du module](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe) ».

## 2. Modifier les entrées fonctionnelles

Ouvrez le fichier 命令词播报词协议列表V1_中文 dans les pièces jointes.

![Image 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

Trouvez les entrées fonctionnelles dans le tableau, c'est-à-dire les 10 premiers éléments. Notez que ces 10 premières entrées fonctionnelles sont toutes des entrées fixes ; elles ne peuvent pas être ajoutées, seulement modifiées.

![Image 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

Nous prenons ici comme exemple la modification de la phrase de diffusion du mot de réveil : remplacez la diffusion de “在的” après reconnaissance de “你好，小犀” par la diffusion de “我在”.

![Image 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

Après avoir terminé les modifications, enregistrez. Suivez ensuite les étapes de “1.2 Création du micrologiciel” pour importer le tableau dans le site web. Si vous avez déjà créé un micrologiciel une fois, vous pouvez cliquer sur le bouton “Hériter” du projet précédent, ce qui permet d'éviter les étapes de configuration des paramètres.

![Image 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

Après avoir recréé le micrologiciel, vous devez également le flasher dans le module d'interaction vocale ; vous pourrez ainsi modifier les entrées fonctionnelles.

## 3. Ajouter de nouvelles entrées de mots de commande

Ouvrez le fichier 命令词播报词协议列表V1_中文 dans les pièces jointes.

![Image 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

En bas du tableau, ajoutez une nouvelle entrée de mot de commande ; nous prenons ici comme exemple l'ajout d'un mot de commande “打扫房间”.

![Image 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

Vous devez ici sélectionner “命令词” comme type de fonction, et définir le mode de diffusion sur “主”, afin qu'après avoir reconnu “打扫房间”, le module diffuse activement “好的”.

![Image 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

Voyons maintenant le protocole d'envoi. Les 1re et 2e positions des données constituent l'en-tête de trame et ne doivent pas être modifiées. Lorsque nous sélectionnons le type de fonction comme mot de commande, alors selon le protocole d'envoi, la 3e position des données doit obligatoirement être “00” ; cela permet de distinguer si l'instruction est un “命令词” ou une “播报语”.

![Image 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

La 4e position des données est l'ID de données du mot de commande ; il s'agit d'une donnée hexadécimale. Comme l'ID du mot de commande précédent est “8B”, nous devons définir cette position sur “8C”. Dans des cas particuliers, les ID de données peuvent également être identiques, par exemple lorsque les résultats renvoyés par les deux mots de commande ci-dessous sont identiques.

![Image 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

La 5e position du protocole est fixée à “EE” et ne doit pas non plus être modifiée. Dans le tableau, le protocole d'envoi et le protocole de réception doivent être cohérents.

![Image 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

Après avoir terminé les modifications, enregistrez. Suivez ensuite les étapes de “1.2 Création du micrologiciel” pour importer le tableau dans le site web. Si vous avez déjà créé un micrologiciel une fois, vous pouvez cliquer sur le bouton “Hériter” du projet précédent, ce qui permet d'éviter les étapes de configuration des paramètres

![Image 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

Après avoir recréé le micrologiciel, vous devez également le flasher dans le module d'interaction vocale ; vous pourrez ainsi ajouter de nouvelles entrées de mots de commande.

## 4. Ajouter une nouvelle phrase de diffusion

Ouvrez le fichier 命令词播报词协议列表V1_中文 dans les pièces jointes.

![Image 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

En bas du tableau, ajoutez une nouvelle entrée de mot de commande ; nous prenons ici comme exemple l'ajout d'une phrase de diffusion “现在是晚上”.

![Image 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

Vous devez ici sélectionner “播报语” comme type de fonction, et définir le mode de diffusion sur “被”.

![Image 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

Voyons maintenant le protocole d'envoi. Les 1re et 2e positions des données constituent l'en-tête de trame et ne doivent pas être modifiées. Lorsque nous sélectionnons le type de fonction comme phrase de diffusion, alors selon le protocole d'envoi, la 3e position des données doit obligatoirement être “FF” ; cela permet de distinguer que l'instruction est une “播报语”.

![Image 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

La 4e position des données est l'ID de données du mot de commande ; il s'agit d'une donnée hexadécimale. Comme l'ID de la phrase de diffusion précédente est “8B”, nous devons définir cette position sur “8C”.

La 5e position du protocole est fixée à “EE” et ne doit pas non plus être modifiée. Dans le tableau, le protocole d'envoi et le protocole de réception doivent être cohérents.

![Image 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

Après avoir terminé les modifications, enregistrez. Suivez ensuite les étapes de “1.2 Création du micrologiciel” pour importer le tableau dans le site web. Si vous avez déjà créé un micrologiciel une fois, vous pouvez cliquer sur le bouton “Hériter” du projet précédent, ce qui permet d'éviter les étapes de configuration des paramètres.

![Image 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

Après avoir recréé le micrologiciel, vous devez également le flasher dans le module d'interaction vocale ; vous pourrez ainsi ajouter de nouvelles entrées de mots de commande.

<RelatedProducts slugs="ai-voice-module" />
