---
title: "Arduino: Positionsausgabe"
description: "Arduino UNO und GPS-Modul: Positionsinformationen über UART auslesen und im seriellen Monitor ausgeben, mit Vorbereitung und Beispielcode."
---

# Arduino: Positionsausgabe

**1. Lernziel**

In dieser Lektion lernen wir hauptsächlich, mit Arduino und dem GPS-Modul die Funktion zum Auslesen der Positionsinformationen zu realisieren.

**2. Vorbereitung**

Das GPS-Modul verwendet UART- und USB-Kommunikation. Hier wird der UART-Anschluss des Arduino UNO zum Lesen der Informationen verwendet. Verbinden Sie TX des Moduls mit dem Pin D0 der Arduino-UNO-Platine. VCC und GND werden jeweils mit 5V und GND verbunden.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/1.png)

**3.** **Programm**

Initialisieren der seriellen Schnittstelle.

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/2.jpg) 

Ausgeben der empfangenen Daten.


**4. Programm kompilieren und herunterladen**

4.1 Wir müssen die Datei mit der Arduino-IDE-Software öffnen, dann in der Menüleiste auf „√“ klicken, um das Programm zu kompilieren, und warten, bis unten links der Text „Kompilierung erfolgreich“ erscheint.

 ![Abb. 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/3.jpg)

4.2 In der Menüleiste der Arduino-IDE müssen wir 【Werkzeuge】---【Port】--- den soeben im Geräte-Manager angezeigten Port auswählen, wie in der folgenden Abbildung gezeigt.

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/4.jpg) 

4.3 Nach der Auswahl klicken Sie in der Menüleiste auf „→“, um den Code auf die UNO-Platine hochzuladen. Wenn unten links der Text „Hochladen abgeschlossen“ erscheint, wurde das Programm erfolgreich auf die UNO-Platine hochgeladen, wie in der folgenden Abbildung gezeigt.

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/5.jpg) 

 

**5. Versuchsergebnis**

Nach dem Einschalten benötigt das Modul etwa 32s zum Starten. Danach blinkt die serielle Statusanzeige-LED am Modul kontinuierlich, und es können normal Daten empfangen werden.

Nachdem das Programm heruntergeladen und ausgeführt wurde, öffnen Sie das serielle Monitorfenster und die serielle Software, stellen Sie die Baudrate auf 9600 ein; die serielle Schnittstelle gibt die aktuellen Positionsinformationen in einer Schleife aus. Diese Informationen sind unverarbeitete Rohdaten; die konkreten Inhalte jeder Information können Sie in   CASIC多模卫星导航接收机协议规范.pdf  nachschlagen.

![Abb. 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/6.jpg) 

Beachten Sie, dass sich die Modulantenne im Freien befinden muss, da sonst möglicherweise kein GPS-Signal gefunden werden kann.

<RelatedProducts slugs="gps-beidou-module" />
