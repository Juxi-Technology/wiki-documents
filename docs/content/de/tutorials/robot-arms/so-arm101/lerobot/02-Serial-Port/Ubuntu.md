---
title: "Schritt 2: Ports der seriellen Geräte anzeigen (Ubuntu)"
description: "Zeigt unter Ubuntu, wie Sie die Ports der seriellen Geräte anzeigen, Folgearm und Führungsarm zuordnen und die nötigen Zugriffsrechte setzen."
---

# Schritt 2: Ports der seriellen Geräte anzeigen (Ubuntu)

## Methode 1: Direkte Anzeige über die Linux-Kommandozeile

### Ports der seriellen Geräte anzeigen

```Shell
ls /dev/ttyACM*
```

### USB-Anschluss von Computer und Roboterarm verbinden

Zuerst den Follower-Folgearm anschließen, dann den Leader-Führungsarm

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

## Methode 2: Offizielles Lerobot-Tool

```Shell
lerobot-find-port
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

## Meinen Port notieren

`/dev/ttyACM0` ist die Portnummer des seriellen Geräts für den Follower-Folgearm

`/dev/ttyACM1` ist die Portnummer des seriellen Geräts für den Leader-Führungsarm

## Port Berechtigungen erteilen

Allen Benutzern Lese- und Schreibzugriff auf diese seriellen Geräte geben

```Shell
sudo chmod 666 /dev/ttyACM*
```

<RelatedProducts slugs="so-arm101" />
