---
title: "Tutoriel de demande de l'API Baidu Maps"
description: "1. Méthode d'inscription"
---

# Tutoriel de demande de l'API Baidu Maps

**1.** **Méthode d'inscription**

Accédez à la plateforme ouverte Baidu Maps : https://lbsyun.baidu.com/

Faites défiler jusqu'en bas de la page

Cliquez sur S'inscrire maintenant

![Image 1](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/18.jpg) 

Il est recommandé de choisir de devenir développeur individuel (car la demande est utilisable le jour même)

Suivez simplement les indications étape par étape

![Image 2](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/19.jpg) 

**2. Obtenir l'ak**

Nous utilisons la localisation IP ordinaire du service web ; la documentation peut être consultée sur le lien ci-dessous.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Cliquez sur Console, sélectionnez Mes applications, puis sélectionnez Créer une application.

![Image 3](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/20.jpg) 

Le nom de l'application est libre ; pour le type d'application, choisissez Côté serveur, activez le service et saisissez 0.0.0.0/0 dans la liste blanche.

![Image 4](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/21.jpg) 

Cliquez sur Soumettre pour générer une application.

![Image 5](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/22.jpg) 

Copiez la valeur ak de notre application

![Image 6](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/23.jpg) 

Collez-la dans le programme, enregistrez, et vous pourrez lire les informations de position via Baidu Maps.

![Image 7](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/24.jpg)

<RelatedProducts slugs="gps-beidou-module" />
