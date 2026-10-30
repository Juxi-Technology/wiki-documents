---
title: "Produktinformationen"
description: "Produktübersicht, Messprinzip, technische Daten, Pinbelegung und typische Anwendungsszenarien des MAX30102-Herzfrequenz- und SpO2-Sensormoduls."
---

# Produktinformationen

## 1. Produktübersicht

Das Herzfrequenz- und SpO2-Sensormodul Gravity: MAX30102 ist mit dem hochpräzisen Original-MAX30102-Chip von Maxim für die Herzfrequenz- und SpO2-Messung bestückt und enthält zusätzlich einen Mikrocontroller mit integriertem, selbst entwickeltem Herzfrequenz-/SpO2-Algorithmus. Das Host-Gerät muss keine komplexen Berechnungen programmieren; das Modul gibt standardisierte Messwerte für Herzfrequenz und Blutsauerstoffsättigung direkt aus.

Das Modul erfasst die physiologischen Rohdaten mittels PPG-Photoplethysmografie; der bordseitige Mikrocontroller übernimmt automatisch den gesamten Ablauf aus Signalfilterung, Datenberechnung und Wertkalibrierung und überträgt die Messergebnisse schließlich über die beiden gängigen Kommunikationsschnittstellen I2C und UART nach außen. Dadurch werden der Hardware-Anpassungsaufwand für Entwickler und die Ressourcenbelastung des Host-MCU erheblich reduziert – auch Einsteiger können Projekte schnell umsetzen. Darüber hinaus gehört eine spezielle PC-Hostsoftware zum Lieferumfang: Die Daten lassen sich direkt am Computer auslesen und Herzfrequenz sowie SpO2 in Echtzeit visualisieren – bequem und effizient beim Debuggen.

## 2. Messprinzip

Das Modul nutzt die **Photoplethysmografie (PPG)** zur nicht invasiven Messung physiologischer Werte: Die Arterien des menschlichen Körpers pulsieren mit dem Herzschlag und erzeugen regelmäßige Dilatations- und Kontraktionsänderungen, wodurch das Blutvolumen in den Gefäßen periodisch schwankt; die Änderung des Blutvolumens beeinflusst direkt die Lichtdurchlässigkeit des Gewebes an der Fingerspitze. Das Modul sendet Licht einer bestimmten Wellenlänge aus, erfasst das reflektierte Lichtsignal und bildet die dynamische Änderung der Lichtdurchlässigkeit ab; zusammen mit dem integrierten Algorithmus werden daraus präzise die aktuelle Pulsfrequenz und Blutsauerstoffsättigung berechnet.

## 3. Hinweise zur Verwendung

1. **Anpressdruck beeinflusst die Messgenauigkeit**: Ungleichmäßiger oder sich ständig ändernder Druck der Fingerspitze auf den Sensor stört das optische Signal und führt zu Abweichungen der Herzfrequenz- und SpO2-Werte. Halten Sie den Finger während der Messung ruhig und den Anpressdruck konstant.
1. **Hinweis zum Auflegen**: Die Messstelle dieses Moduls ist ausschließlich die Fingerspitze; der Messkopf hat keine vorgegebene Orientierung, das Auflegen ist unkompliziert.
1. **Erklärung: kein Medizinprodukt**: Dieses Produkt ist ein elektronisches Messmodul der Consumer-Klasse und kein medizinisches Fachgerät. Die Messdaten dienen nur als allgemeine Gesundheitsreferenz und dürfen nicht für klinische Diagnosen, Krankheitsüberwachung oder medizinische Hilfsbehandlungen verwendet werden.

- Die Fingerbeere auf den Sensor legen und mit dem mitgelieferten Band fixieren.

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/product-info/01.png)

## 4. Technische Daten

- Versorgungsspannung: 3,3-5 V
- Betriebsstrom: <15 mA
- Kommunikation: I2C/UART
- I2C-Adresse: 0x57
- Serielle Baudrate: 9600
- Betriebstemperaturbereich: -40 °C~85 °C
- Produktabmessungen: 25,5*32 mm

**Pinbelegung (Siebdruck):**

| Nr. | Siebdruck | Funktionsbeschreibung |
|---|---|---|
| 1 | D/T | I2C-Datenleitung/TX |
| 2 | C/T | I2C-Taktleitung/RX |
| 3 | GND | Versorgungsminus |
| 4 | VCC | Versorgungsplus |

## 5. Typische Anwendungsszenarien

- Entwicklungsprojekte zur Herzfrequenz- und SpO2-Überwachung für smarte Wearables
- DIY-Bau einfacher Heim-Herzfrequenz- und SpO2-Messgeräte
- Systeme zur langfristigen, kontinuierlichen Überwachung physiologischer Körperwerte
- Maker-Open-Source-Hardware und physiologische Messprojekte in der Elektronikausbildung an Hochschulen
