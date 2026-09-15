---
title: "Hinweise vor der Verwendung des GPS-Moduls"
description: "(1) Nachdem Sie den Arbeitsbereich eingerichtet haben, kopieren Sie den Inhalt des Ordners gpssrc in das src-…"
---

# Hinweise vor der Verwendung des GPS-Moduls

#### 1. Hinweise zur Kompilierung des GPS-Moduls

(1) Nachdem Sie den Arbeitsbereich eingerichtet haben, kopieren Sie den Inhalt des Ordners gps_src in das src-Verzeichnis des Arbeitsbereichs und kompilieren Sie anschließend mit colcon build; wenn keine Fehler auftreten, war die Kompilierung erfolgreich;

Führen Sie im Verzeichnis ~/gps_ros2 aus

```
colcon build
```

Führen Sie im Verzeichnis ~/gps_ros2 aus 

```
source install/setup.bash
```

(2) Beschreibung des Inhalts der Funktionspakete:

- nmea_navsat_driver: Funktionen wie das Starten des GPS-Moduls, das Auslesen der GPS-Moduldaten und das Zeichnen der GPS-Daten;
- nmea_msgs: Enthält einige msg-Dateien für GPS-Nachrichten
- imu_gps_localization: Funktion zur Fusion von IMU- und GPS-Daten
- gps_goal: Konvertiert Längen- und Breitengraddaten in Navigationsdaten für das Nav2-Ziel

#### 2. Binden des GPS-Ports

Das GPS-Modul wird über eine serielle Schnittstelle mit dem Computer oder der Hauptsteuerung verbunden. Daher müssen wir den Port für das GPS fest binden, damit das GPS-Modul nicht aufgrund von Problemen mit der Portnummer vom Computer oder der Hauptsteuerung nicht erkannt werden kann.

(1) Sehen Sie sich die verbundenen USB-Geräte an und suchen Sie das GPS-Modul; geben Sie im Terminal **lsusb** ein, um die Geräte-ID der GPS-Verbindung zu suchen. Wie in der folgenden Abbildung gezeigt, ist dies die Geräteerkennungs-ID des GPS-Moduls,

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

(2) Nachdem Sie die Geräte-ID kennen, erstellen Sie als Nächstes die rules-Datei, um den Port zu binden; geben Sie im Terminal ein,

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

Kopieren Sie den folgenden Inhalt hinein,

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

Speichern Sie, beenden Sie dann und geben Sie ihm Ausführungsrechte; geben Sie im Terminal ein,

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

(3) Ziehen Sie das GPS-Modul ab und stecken Sie es wieder ein; geben Sie im Terminal ll /dev/myserial ein, um zu prüfen, ob die Bindung erfolgreich war. Wenn die folgende Anzeige erscheint, war die Bindung erfolgreich,

```
ll /dev/myserial
```

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
