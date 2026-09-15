---
title: "AGNSS-unterstützte Positionierung"
description: "In dieser Lektion lernen wir hauptsächlich, mit dem Raspberry Pi, dem GPS-Modul und einem agnss-Server das Le…"
---

# AGNSS-unterstützte Positionierung

**1. Lernziel**

In dieser Lektion lernen wir hauptsächlich, mit dem Raspberry Pi, dem GPS-Modul und einem agnss-Server das Lesen und Analysieren von Positionsinformationen bei schwachem Signal zu realisieren.

**2. Erläuterung zu AGNSS**

2.1. **Warum AGNSS verwendet wird**

• Zu den Bedingungen für die Positionierung eines autonomen GNSS-Empfängers gehören:

- Erfassen und Verfolgen der Satellitensignale, Analyse der Zeit

- Abrufen der Navigationsnachricht vom Satelliten

• In einer Umgebung mit starkem Signal kann ein autonomer GNSS-Empfänger innerhalb von etwa 30 Sekunden einen Kaltstart durchführen und sich positionieren; in einer Umgebung mit schwachem Signal hingegen ist die Satellitenerfassung eines Empfängers ohne externe Unterstützung sehr langsam, und es ist schwierig, die Navigationsnachricht vom Satelliten abzurufen. Daher dauert es sehr lange, bis eine Positionierung möglich ist, oder eine Positionierung ist gar nicht möglich.

• AGNSS kann dem Empfänger die für die Positionierung erforderlichen Hilfsinformationen bereitstellen, wie etwa Navigationsnachricht, grobe Position und Zeit. Unabhängig davon, ob die Umgebung ein starkes oder ein schwaches Signal aufweist, können diese Informationen die Zeit bis zur ersten Positionierung erheblich verkürzen.

2.2. **AGNSS-Lösung**

• Der AGNSS-Server bezieht AGNSS-Hilfsinformationen aus mehreren GNSS-Datenquellen und verwaltet sie. Der Server überwacht ständig eingehende AGNSS-Anfragen von Clients und beantwortet sie (Benutzername und Passwort erforderlich).

• Der Benutzer bezieht die Hilfsinformationen über das TCP/IP-Protokoll vom AGNSS-Server; die erhaltenen Hilfsinformationen können direkt an den GNSS-Empfänger übertragen werden.

• Der Benutzer kann auch seinen eigenen Proxyserver einrichten.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/1.png) 

2.3. **AGNSS-Ablauf**

• Mit dem AGNSS-Server verbinden

–Die Adresse des Servers ist 121.41.40.95 (Domainname: www.gnss-aide.com)

–Die Portnummer ist 2621

• AGNSS-Anfrage senden

–Anfragestring: (die Felder Benutzername und Passwort sind Pflichtfelder)

–user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• AGNSS-Hilfsinformationen abrufen

• Die AGNSS-Hilfsinformationen an den Empfänger senden

2.4. **AGNSS-Anfrageparameter**

• Der Client sendet eine Anfrage an den AGNSS-Server; das Format des Anfragestrings ist wie folgt

–Der Anfragestring ist eine Kombination mehrerer key=value;-Gruppen, z. B.: key=value;key=value;

• Beispiel: user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• Die konkreten Definitionen von key und value sind in der folgenden Tabelle aufgeführt

| Schlüsselwort(Key) | Wert(value) | Optionalität | Bemerkung                                                         |
| ----------- | ----------- | ------ | ------------------------------------------------------------ |
| **user**    | Zeichenkette      | Erforderlich   | Benutzername. Es wird dringend empfohlen, als Benutzernamen eine gültige E-Mail-Adresse zu verwenden; wichtige Wartungsinformationen des AGNSS-Servers werden an diese E-Mail-Adresse gesendet. |
| **pwd**     | Zeichenkette      | Erforderlich   | Benutzerpasswort                                                     |
| **gnss**    | Zeichenkette      | Optional   | Eine durch Kommas getrennte GNSS-Liste; derzeit wird GPS unterstützt. Gültige Werte sind: gps,bds,glo „gnss=gps;“ bedeutet, dass GPS-Hilfsinformationen angefordert werden; gnss=gps,bds;“ bedeutet, dass GPS- und BDS-Hilfsinformationen angefordert werden; |
| **cmd**     | Zeichenkette      | Optional   | full: alle Informationen, einschließlich Ephemeride, geschätzter Zeit und Position; eph: nur Ephemerideinformationen; aid: Hilfsinformationen wie Zeit und Position. Wird dieses Feld nicht ausgefüllt, ist der Standardwert full |
| **lat**     | Zahlenwert        | Optional   | Geschätzter Wert für den Breitengrad der Benutzerposition. Einheit des Breitengrads: Grad. Wertebereich: -90~90 Grad. Von den beiden Positionshilfeformaten – dem Längen-/Breiten-/Höhenformat und dem ECEF-Format – ist eines auszuwählen. Ein gültiges Längen-/Breiten-/Höhen-Positionshilfeformat ist „lat=30;lon=120.3;alt=100;“; alle drei Felder müssen vollständig sein. |
| **lon**     | Zahlenwert        | Optional   | Geschätzter Wert für den Längengrad der Benutzerposition. Einheit des Längengrads: Grad. Wertebereich: -180~180 Grad. |
| **alt**     | Zahlenwert        | Optional   | Geschätzter Wert für die Höhe der Benutzerposition. Einheit: Meter.                              |
| **x**       | Zahlenwert        | Optional   | Geschätzter Wert für die Benutzerposition (X, Y, Z im ECEF-Koordinatensystem). Einheit: Meter. Ein gültiges ECEF-Positionshilfeformat ist „x=30000;y=1111120.3;z=3345100;“; alle drei Felder müssen vollständig sein. |
| **y**       | Zahlenwert        | Optional   | Geschätzter Wert für die Benutzerposition (X, Y, Z im ECEF-Koordinatensystem). Einheit: Meter.           |
| **z**       | Zahlenwert        | Optional   | Geschätzter Wert für die Benutzerposition (X, Y, Z im ECEF-Koordinatensystem). Einheit: Meter.           |
| **pacc**    | Zahlenwert        | Optional   | Genauigkeit der Benutzerposition. Einheit: Meter.                                 |

2.5. **Vom Server zurückgegebene Informationen**

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/2.png) 

• Beispiel der vom AGNSS-Server zurückgegebenen Daten: Datenkopf + Inhalt der Hilfsdaten

• Die Binärdaten sind die vom GNSS-Empfänger benötigten Hilfsdaten; diese Binärdaten enthalten jeweils eine eigene Datenprüfung. Das Format der Binärdaten finden Sie in der Empfängerprotokollspezifikation von Zhongke Micro.

• Wenn auch der Datenkopf an den GNSS-Empfänger gesendet wird, hat dies keine Auswirkungen auf den GNSS-Empfänger.

2.6. **AGNSS-Leistungsvergleich**

• Im Vergleich zu gewöhnlichen eigenständigen GNSS-Empfängern weisen AGNSS-Empfänger eine deutliche Verbesserung der TTFF-Leistung auf, insbesondere unter Bedingungen mit schwachem Signal.

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/3.jpg) 

2.7. **Hinweise**

• Die grobe Positionshilfe muss der Client auf andere Weise beziehen, zum Beispiel

–GSM/GPRS/3G-Kommunikationsmodule; diese Module können die aktuelle grobe Position jeweils über die CELL ID ermitteln

–Auch andere Funkmodule wie WiFi können eine grobe Positionierung durchführen

• Die Genauigkeit der groben Position muss innerhalb von 15km liegen; eine fehlerhafte Positionshilfe beeinträchtigt die Leistung des Empfängers

• Wenn keine grobe Position ermittelt werden kann, lassen Sie die Positionsfelder (lat,lon,alt,x,y,z) im AGNSS-Anfragestring weg; der Empfänger wählt dann automatisch eine gültige Position aus der historischen Positionierung

• Es ist nicht notwendig, die vom GNSS-Empfänger selbst ausgegebene Position als grobe Position zu verwenden

2.8. **Wann AGNSS benötigt wird**

• Es ist nicht notwendig, bei jedem Einschalten Daten vom Server herunterzuladen, was Datenvolumen spart

–Die Chips von Zhongke Micro verfügen über batteriegepuffertes SRAM sowie einen permanenten Backup-FLASH, die beide die empfangenen Ephemeridedaten usw. automatisch speichern können

–Während des normalen Betriebs lädt der Chip kontinuierlich die neuesten Ephemeridedaten vom Satelliten herunter

• Durch Abfragen des Empfängerstatus wird entschieden, ob AGNSS-Daten vom Server heruntergeladen werden müssen

–Der Empfänger kann einen Navigationsnachricht-Statussatz ausgeben (standardmäßig nicht, nur bei entsprechender Konfiguration)

2.9. **Vorstellung des Navigationsnachricht-Statussatzes**

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/4.png) 

![Abb. 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/5.png) 

• Dieser Satz gibt die aktuelle interne Zeit des Empfängers + den Navigationsnachricht-Status aus.

• Mit dem Befehl $PCAS03,,,,,,,,,,,1*1F kann der Navigationsnachricht-Statussatz einmal pro Sekunde ausgegeben werden

• Mit dem Befehl $PCAS03,,,,,,,,,,,0*1E kann die Ausgabe des Navigationsnachricht-Statussatzes gestoppt werden

• Hinweis: Jeder Satz muss mit \r\n enden (0x0D,0x0A), und der Satz enthält 11 Kommas

• Wenn das Zeitflag gültig ist (nicht 0) und die Anzahl der gültigen Ephemeriden groß ist (größer als 8), müssen keine AGNSS-Ephemeriden heruntergeladen werden.

 

**3. Vorbereitung**

**3.1. Verkabelung**

Das GPS-Modul verwendet UART- oder USB-Kommunikation; hier wird die USB-Kommunikation als Beispiel verwendet.

![Abb. 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/6.png)

Verbinden Sie den Raspberry Pi und das GPS-Modul mit einem Type-C-Kabel, führen Sie den Befehl ls /dev | grep 'ttyUSB' aus; Sie können sehen, dass das GPS-Modul als USB0 erkannt wird.

![Abb. 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/7.png) 

**3.2. Beantragung des Baidu Maps ak**

Siehe Dokument [Anleitung zur Beantragung der Baidu Maps API]()

 

**4. Programm**

Das Programm dieser Lektion finden Sie unter: GPS-agnss.py

USB initialisieren:

![Abb. 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/8.jpg) 

An der Stelle ak muss in den Unterlagen der selbst beantragte ak-Wert eingetragen werden; anschließend können Sie über Baidu Maps die aktuellen groben Längen- und Breitengradinformationen erhalten

![Abb. 9](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/9.jpg) 

Hier werden die von Baidu Maps erhaltenen groben Längen- und Breitengradinformationen an den Server gesendet. Das von uns verwendete Login-Konto ist das offizielle Konto von Juxi; nach Abschluss des Abrufs wird das gesamte Paket an das Modul gesendet

![Abb. 10](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/10.jpg) 

![Abb. 11](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/11.jpg) 

Funktion zum Abrufen und Analysieren der Positionsinformationen; in der folgenden Abbildung werden aus den Positionsinformationen die mit GNGGA beginnenden Positionsinformationen herausgefiltert und anschließend die Daten analysiert und in den jeweiligen globalen Variablen gespeichert.

![Abb. 12](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/12.jpg) 

![Abb. 13](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/13.jpg) 

Auf dieselbe Weise werden die Kursinformationen von GNVTG abgerufen und analysiert.

![Abb. 14](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/14.jpg) 

Die analysierten Daten werden in einer Schleife ausgegeben

![Abb. 15](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/15.jpg) 

**5.Programm ausführen**

Geben Sie im Terminal sudo python2 GPS-agnss.py ein, um das Programm auszuführen.

**6.Versuchsergebnis**

**Beachten Sie, dass der Raspberry Pi bei der unterstützten Positionierung mit dem Internet verbunden sein muss.**

Nach dem Einschalten des Moduls bei schwachem Signal beginnt die USB-Initialisierung. Bei erfolgreicher Initialisierung wird „GPS Serial Opened! Baudrate=9600“ angezeigt, andernfalls „GPS Serial Open Failed!“. Bei einem Fehler müssen die Verkabelung oder der USB-Port überprüft werden.

Danach wird „GPS Agnss start“ angezeigt, und die Hilfspositionsinformationen beginnen, an den Server gesendet zu werden; nach Abschluss des Sendens wird „GPS Agnss success“ angezeigt

Wenn innerhalb eines gewissen Zeitraums nach dem Senden noch kein GPS-Signal empfangen wurde, wird „GPS no found“ angezeigt und die von Baidu Maps gelesenen groben Längen- und Breitengradinformationen werden ausgegeben.

![Abb. 16](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/16.jpg) 

Nachdem nach einiger Zeit ein GPS erkannt wurde, werden Position und Kursinformationen in einer Schleife ausgegeben.

![Abb. 17](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/17.jpg) 

Drücken Sie Ctrl+C, um das Lesen der Informationen zu beenden.

![Abb. 18](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/18.jpg)

<RelatedProducts slugs="gps-beidou-module" />
