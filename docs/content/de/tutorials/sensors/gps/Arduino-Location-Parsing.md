---
title: "Analyse der GPS-Positionsinformationen"
description: "In dieser Lektion lernen wir hauptsächlich, mit Arduino und dem GPS-Modul die Funktion zum Analysieren und Au…"
---

# Analyse der GPS-Positionsinformationen

**1. Lernziel**

In dieser Lektion lernen wir hauptsächlich, mit Arduino und dem GPS-Modul die Funktion zum Analysieren und Ausgeben der Positionsinformationen zu realisieren.

**2. Vorbereitung**

Das GPS-Modul verwendet UART- und USB-Kommunikation. Hier wird der UART-Anschluss des Arduino UNO zum Lesen der Informationen verwendet. Verbinden Sie TX des Moduls mit dem Pin D0 der Arduino-UNO-Platine. VCC und GND werden jeweils mit 5V und GND verbunden.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/1.png)

**3.** **Programm**

Initialisieren der seriellen Schnittstelle.

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/2.jpg) 

Lesen der seriellen Daten.

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/3.jpg) 

Analysieren der seriellen Daten.

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/4.jpg) 

Ausgeben der analysierten Positionsinformationen.

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/5.jpg) 

**4. Programm kompilieren und herunterladen**

4.1 Wir müssen die Datei mit der Arduino-IDE-Software öffnen, dann in der Menüleiste auf „√“ klicken, um das Programm zu kompilieren, und warten, bis unten links der Text „Kompilierung erfolgreich“ erscheint.

 ![Abb. 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/6.jpg)

4.2 In der Menüleiste der Arduino-IDE müssen wir 【Werkzeuge】---【Port】--- den soeben im Geräte-Manager angezeigten Port auswählen, wie in der folgenden Abbildung gezeigt.

![Abb. 7](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/7.jpg) 

4.3 Nach der Auswahl klicken Sie in der Menüleiste auf „→“, um den Code auf die UNO-Platine hochzuladen. Wenn unten links der Text „Hochladen abgeschlossen“ erscheint, wurde das Programm erfolgreich auf die UNO-Platine hochgeladen, wie in der folgenden Abbildung gezeigt.

![Abb. 8](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/8.jpg) 

 

**5. Versuchsergebnis**

Nach dem Einschalten benötigt das Modul etwa 32s zum Starten. Danach blinkt die serielle Statusanzeige-LED am Modul kontinuierlich, und es können normal Daten empfangen werden.

Nachdem das Programm heruntergeladen und ausgeführt wurde, öffnen Sie das serielle Monitorfenster und die serielle Software, stellen Sie die Baudrate auf 9600 ein; die serielle Schnittstelle gibt die analysierten Echtzeit-Positionsinformationen in einer Schleife aus.

![Abb. 9](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/9.jpg) 

Beachten Sie, dass sich die Modulantenne im Freien befinden muss, da sonst möglicherweise kein GPS-Signal gefunden werden kann.

<RelatedProducts slugs="gps-beidou-module" />
