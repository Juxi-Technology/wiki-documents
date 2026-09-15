---
title: "Jetson: GPS-Auswertung"
description: "Jetson Orin und GPS-Modul: Positionsinformationen auslesen und auswerten mit Beispielcode und Hinweisen für die eigene Anwendung."
---

# Jetson: GPS-Auswertung

**1. Lernziel**

In dieser Lektion lernen wir hauptsächlich, mit Jetson Orin und dem GPS-Modul Positionsinformationen zu lesen und zu analysieren.

**2. Vorbereitung**

Das GPS-Modul verwendet UART- oder USB-Kommunikation; hier wird die USB-Kommunikation als Beispiel verwendet.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/1.png)

Verbinden Sie Jetson Orin und das GPS-Modul mit einem Type-C-Kabel, führen Sie den Befehl ls /dev | grep 'ttyUSB' aus; Sie können sehen, dass das GPS-Modul als USB0 erkannt wird.

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/2.jpg) 

**3****. Programm**

Das Programm dieser Lektion finden Sie unter: GPS.py

USB initialisieren:

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/3.jpg) 

Funktion zum Abrufen und Analysieren der Positionsinformationen; in der folgenden Abbildung werden aus den Positionsinformationen die mit GNGGA beginnenden Positionsinformationen herausgefiltert und anschließend die Daten analysiert und in den jeweiligen globalen Variablen gespeichert.

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/4.jpg) 

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/5.jpg) 

Auf dieselbe Weise werden die Kursinformationen von GNVTG abgerufen und analysiert.

![Abb. 6](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/6.jpg) 

Die analysierten Daten werden in einer Schleife ausgegeben

![Abb. 7](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/7.jpg) 

**4. Programm ausführen**

Geben Sie im Terminal sudo python3 GPS.py ein, um das Programm auszuführen.

**5.Versuchsergebnis**

Nach dem Einschalten benötigt das Modul etwa 32s zum Starten. Danach blinkt die serielle Statusanzeige-LED am Modul kontinuierlich, und es können normal Daten empfangen werden.

Nach dem Start des Programms beginnt die USB-Initialisierung. Bei erfolgreicher Initialisierung wird „GPS Serial Opened! Baudrate=9600“ angezeigt, andernfalls „GPS Serial Open Failed!“. Bei einem Fehler müssen die Verkabelung oder der USB-Port überprüft werden; anschließend werden Position und Kursinformationen in einer Schleife ausgegeben.

![Abb. 8](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/8.jpg) 

Drücken Sie Ctrl+C, um das Lesen der Informationen zu beenden.

![Abb. 9](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/9.jpg) 

Beachten Sie, dass sich die Modulantenne im Freien befinden muss, da sonst möglicherweise kein GPS-Signal gefunden werden kann; wenn kein Signal gefunden wird, wird „GPS no found“ ausgegeben.

<RelatedProducts slugs="gps-beidou-module" />
