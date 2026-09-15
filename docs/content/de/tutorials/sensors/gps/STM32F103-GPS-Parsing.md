---
title: "GPS-Analyse und -Ausgabe"
description: "In dieser Lektion lernen wir hauptsächlich, mit STM32F103C8T6 und dem GPS-Modul die Funktion zur Analyse und …"
---

# GPS-Analyse und -Ausgabe

**1. Lernziel**

In dieser Lektion lernen wir hauptsächlich, mit STM32F103C8T6 und dem GPS-Modul die Funktion zur Analyse und Ausgabe der Positionsinformationen zu realisieren.

**2. Vorbereitung**

Das GPS-Modul verwendet UART- und USB-Kommunikation. Hier wird der UART-Anschluss des STM32 zum Lesen der Informationen verwendet. Verbinden Sie TXD des Moduls mit dem Pin PA10 der STM32F103C8T6-Platine. VCC und GND werden jeweils mit 5V und GND des STM32F103C8T6 verbunden; GND und RXD des TTL-Moduls werden jeweils mit GND und PA9 des STM32 verbunden.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/1.png)

**3.** **Programm**

Die Baudrate des Moduls beträgt 9600.

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/2.jpg) 

Lesen und Analysieren der empfangenen Daten.

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/3.jpg) 

Umwandeln der Einheit der Längen- und Breitengradinformationen in Grad

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/4.jpg) 

Ausgeben der empfangenen Daten über die serielle Schnittstelle.

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/5.jpg) 

Hinweis: Tatsächlich stehen die Koordinatenwerte der GPS/BeiDou-Positionierung nicht einfach in einem 100-fachen Verhältnis, sondern es ist eine Umrechnung von Grad/Minuten/Sekunden erforderlich. Für die erhaltenen GPS/BeiDou-Koordinatenwerte, z. B. nördliche Breite 2429.53531, östliche Länge 11810.78036, ist folgende Berechnung durchzuführen: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267. Zudem kann es bei verschiedenen Mikrocontrollern aufgrund von Problemen mit der Genauigkeit der Datenumrechnung zu gewissen Abweichungen kommen.

**4. Versuchsergebnis**

Nach dem Einschalten benötigt das Modul etwa 32s zum Starten. Danach blinkt die serielle Statusanzeige-LED am Modul kontinuierlich, und es können normal Daten empfangen werden.

Nachdem das Programm heruntergeladen und ausgeführt wurde, öffnen Sie die serielle Software, stellen Sie die Baudrate auf 9600 ein; die serielle Schnittstelle gibt die aktuellen Positionsinformationen in einer Schleife aus.

![Abb. 6](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/6.jpg) 

Beachten Sie, dass sich die Modulantenne im Freien befinden muss, da sonst möglicherweise kein GPS-Signal gefunden werden kann.

<RelatedProducts slugs="gps-beidou-module" />
