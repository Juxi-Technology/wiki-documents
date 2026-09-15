---
title: "Jetson: Baidu-Maps-API"
description: "Jetson Orin: Baidu-Maps-API für das GPS-Modul einrichten, Registrierung und API-Schlüssel abrufen und Positionen auf der Karte darstellen."
---

# Jetson: Baidu-Maps-API

**1.** **Registrierungsmethode**

Rufen Sie die Baidu Maps Open Platform auf: https://lbsyun.baidu.com/

Scrollen Sie ans Ende der Seite

Klicken Sie auf „Jetzt registrieren“

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/18.jpg) 

Es wird empfohlen, sich als Einzelentwickler zu registrieren (da die Nutzung noch am selben Tag der Beantragung möglich ist)

Folgen Sie einfach Schritt für Schritt den Hinweisen

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/19.jpg) 

**2. ak abrufen**

Wir verwenden die normale IP-Positionierung des Web-Dienstes; die Dokumentation finden Sie unter dem folgenden Link.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Klicken Sie auf Konsole, wählen Sie Meine Anwendungen und dann Anwendung erstellen.

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/20.jpg) 

Der Anwendungsname ist beliebig; wählen Sie als Anwendungstyp Serverseitig, aktivieren Sie den Dienst und geben Sie als Whitelist 0.0.0.0/0 ein.

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/21.jpg) 

Klicken Sie auf Senden, um eine Anwendung zu erstellen.

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/22.jpg) 

Kopieren Sie den ak-Wert unserer Anwendung

![Abb. 6](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/23.jpg) 

Fügen Sie ihn in das Programm ein und speichern Sie; anschließend können Sie die Positionsinformationen über Baidu Maps auslesen.

![Abb. 7](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/24.jpg)

<RelatedProducts slugs="gps-beidou-module" />
