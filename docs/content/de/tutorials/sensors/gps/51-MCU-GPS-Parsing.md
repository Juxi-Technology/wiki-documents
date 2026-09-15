---
title: "51-MCU: GPS-Auswertung"
description: "GPS-Auswertung mit dem 51-Mikrocontroller STC89C52RC: UART-Anschluss sowie Analysieren und Ausgeben der Positionsdaten des GPS-Moduls."
---

# 51-MCU: GPS-Auswertung

**1. Lernziel**

In dieser Lektion lernen wir hauptsächlich, mit einem 51-Mikrocontroller des Typs STC89C52RC und dem GPS-Modul die Funktion zur Analyse der Positionsinformationen zu realisieren.

**2. Vorbereitung**

Das GPS-Modul verwendet UART- und USB-Kommunikation. Hier wird der UART-Anschluss des C51 zum Lesen der Informationen verwendet. Verbinden Sie TX des Moduls mit dem Pin P3.0 der 51-Platine. VCC und GND werden jeweils mit 5V und GND verbunden.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Programm**

Initialisieren der seriellen Schnittstelle und des Datenarrays

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Lesen und Analysieren der empfangenen Daten.

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Ausgeben der empfangenen Daten über die serielle Schnittstelle.

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Versuchsergebnis**

Nach dem Einschalten benötigt das Modul etwa 32s zum Starten. Danach blinkt die serielle Statusanzeige-LED am Modul kontinuierlich, und es können normal Daten empfangen werden.

Nachdem das Programm heruntergeladen und ausgeführt wurde, öffnen Sie die serielle Software, stellen Sie die Baudrate auf 9600 ein; die serielle Schnittstelle gibt die aktuellen Positionsinformationen in einer Schleife aus.

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Beachten Sie, dass sich die Modulantenne im Freien befinden muss, da sonst möglicherweise kein GPS-Signal gefunden werden kann.

<RelatedProducts slugs="gps-beidou-module" />
