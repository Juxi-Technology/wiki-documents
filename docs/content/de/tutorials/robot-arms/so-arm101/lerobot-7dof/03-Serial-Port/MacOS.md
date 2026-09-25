---
title: "Mac-Computer"
description: "Zeigt unter macOS, wie Sie die Ports beider Arme anzeigen, Zugriffsrechte vergeben und verstehen, warum zwei Ports dasselbe Gerät meinen."
---

# Mac\-Computer

## Port anzeigen

```Shell
ls /dev/tty.*
```

Das Ergebnis sieht ähnlich aus wie unten; Sie können einen der beiden Ports verwenden

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## Port\-Berechtigungen erteilen

Allen Benutzern Lese\- und Schreibzugriff auf diese seriellen Geräte geben

```Shell
chmod 666 /dev/tty.*
```

## Meinen Port notieren

Folgearm:

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

Führungsarm:

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## Warum gibt es unter Mac zwei Ports?

Die von uns verwendete Servo\-Steuerplatine wird im Mac\-System **gleichzeitig als zwei verschiedene Typen von seriellen Treibern erkannt**, daher werden zwei Ports angezeigt:

- Einer ist der standardmäßige universelle serielle Treiber des Systems (`/dev/tty.usbmodemxxxx`)

- Der andere ist der spezielle serielle Treiber, den der Chiphersteller bereitstellt (hier entspricht „wch" dem CH340/CH341\-Chip von Nanjing Qinheng) (`/dev/tty.wchusbserialxxxx`)

Das ist ein normales Phänomen, **die beiden Ports entsprechen tatsächlich demselben Hardware\-Gerät**; Sie können einen beliebigen davon zur Kommunikation verwenden (wählen Sie zum Beispiel in der Software zur Steuerung des Roboterarms einfach einen der Ports aus).

Falls bei einem späteren Vorgang ein Port einen Fehler meldet, können Sie es mit dem anderen Port versuchen.





