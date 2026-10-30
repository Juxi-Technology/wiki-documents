---
title: "Arduino-Nano-Tutorial"
description: "AmazingHand-„02 Demo-Programm“ mit Arduino Nano (328P) und Servo-Treiberplatine ausführen: Verdrahtung, Bibliotheksinstallation, Kompilieren, Hochladen und Ergebnis."
---

# Arduino-Nano-Tutorial

## Verdrahtung (Servo-Treiberplatine + Nano-Board)

**Auf die Pinpositionen des Nano-Boards (also des 328P-Entwicklungsboards) achten!**

![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

Im Folgenden wird der Debug-Ablauf mit dem Mikrocontroller beschrieben. Der Mikrocontroller führt das Demo-Programm fortlaufend in einer Schleife aus; zum Stoppen genügt es, das Datenkabel zu trennen.

## „02 Demo-Programm“ ausführen

1. Arduino IDE selbst installieren.

2. Je nach **linker oder rechter Hand** die passende `.ino`-Datei öffnen.

   ![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Bevor das Arduino-Programm kompiliert und auf das Nano-Board hochgeladen wird, im Bibliotheksmanager die **FTServo-Bibliothek** und die **SCServo-Bibliothek** installieren.

   ![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Als Boardtyp „**Arduino Nano**“ auswählen.

   ![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. Kompilieren und hochladen.

> **Hinweis:** Der Rechner ist zu diesem Zeitpunkt nur mit dem Nano-Board verbunden; das Nano-Board wird noch nicht an die Servo-Treiberplatine angeschlossen (also nicht mit der Dexterous Hand verbunden).

Nach erfolgreichem Hochladen das Nano-Board mit drei Jumper-Kabeln an die Servo-Treiberplatine anschließen und die Servos an die Servo-Treiberplatine; siehe [Verdrahtung beim Debuggen des MEGA328P-Nano-Boards](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

Die Dexterous Hand führt das „02 Demo-Programm“ fortlaufend in einer Schleife aus; das Ergebnis sieht wie folgt aus:

![Abbildung](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
