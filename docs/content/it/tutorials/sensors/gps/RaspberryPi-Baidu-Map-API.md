---
title: "Raspberry Pi: API Baidu Maps"
description: "1. Metodo di registrazione"
---

# Raspberry Pi: API Baidu Maps

**1.** **Metodo di registrazione**

Accedere alla piattaforma aperta di 百度地图 https://lbsyun.baidu.com/

Scorrere fino in fondo alla pagina

Fare clic su Registrati subito

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/19.jpg) 

Si consiglia di scegliere di diventare sviluppatore individuale (perché la richiesta è utilizzabile lo stesso giorno)

Seguire le indicazioni e completare passo dopo passo

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/20.jpg) 

**2. Ottenere la ak**

Utilizziamo la localizzazione IP normale del servizio web; la documentazione è consultabile al link seguente.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Fare clic su Console, selezionare Le mie applicazioni, selezionare Crea applicazione.

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/21.jpg) 

Il nome dell'applicazione può essere qualsiasi; selezionare Server come tipo di applicazione, abilitare il servizio e inserire 0.0.0.0/0 nella whitelist.

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/22.jpg) 

Fare clic su Invia per generare un'applicazione.

![Immagine 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/23.jpg) 

Copiare il valore di ak della nostra applicazione

![Immagine 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/24.jpg) 

Incollarlo nel programma e salvarlo; sarà così possibile leggere le informazioni di posizione tramite 百度地图.

![Immagine 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/25.jpg)

<RelatedProducts slugs="gps-beidou-module" />
