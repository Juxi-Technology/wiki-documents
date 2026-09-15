---
title: "Produktinformationen"
description: "CI1302 ist ein intelligenter Sprachchip der neuen Generation mit hoher Leistung und neuronalem Netzwerk, der …"
---

# Produktinformationen

## 1.Einführung in das Sprachinteraktionsmodul

CI1302 ist ein intelligenter Sprachchip der neuen Generation mit hoher Leistung und neuronalem Netzwerk, der von Chipintelli entwickelt wurde. Er integriert den von Chipintelli selbst entwickelten Gehirn-Neuronalnetz-Prozessor BNPU V3 und einen CPU-Kern, der Systemtakt kann bis zu 220MHz erreichen, es sind bis zu 640KByte SRAM integriert, außerdem eine PMU-Stromversorgungseinheit und ein RC-Oszillator sowie ein zweikanaliger Hochleistungs-Audio-Codec mit niedrigem Stromverbrauch und mehrere Peripheriesteuerschnittstellen wie UART, IIC, IIS, PWM, GPIO und PDM. Der Chip benötigt nur wenige Peripheriebauteile wie Widerstände und Kondensatoren, um Hardwareschaltungen für verschiedene intelligente Sprachprodukte zu realisieren, und bietet ein äußerst gutes Preis-Leistungs-Verhältnis.

Er verwendet die BNPU-Technologie der dritten Hardwaregeneration und unterstützt neuronale Netzwerke wie DNN\\TDNN\\RNN\\CNN sowie parallele Vektoroperationen, wodurch Funktionen wie Spracherkennung, Stimmabdruckerkennung, Selbstlernen von Befehlswörtern, Sprachdetektion und Rauschunterdrückung durch Deep Learning realisiert werden können. Diese Chiplösung unterstützt außerdem viele Sprachen weltweit wie Chinesisch, Englisch und Japanisch und kann breit in Produktbereichen wie Haushaltsgeräten, Beleuchtung, Spielzeug, tragbaren Geräten, Industrie und Automobil eingesetzt werden, um Sprachinteraktion und -steuerung sowie verschiedene intelligente Sprachlösungen zu realisieren.

Der CI1302-Chip verfügt über einen Gehirn-Neuronalnetz-Prozessorkern (BNPU), unterstützt beschleunigte Offline-NN-Berechnungen und Hardwarebeschleunigung für die Sprachsignalverarbeitung usw.; der CPU-Takt kann bis zu 220MHz erreichen, es kann eine Offline-Fernfeld-Spracherkennung durchgeführt werden, es sind 2MB FLASH-Speicher integriert, und es können 300 Befehlswörter unterstützt werden.

## 2.Produktmerkmale

- Über 110+ Sprachbefehle voreingestellt, Unterstützung benutzerdefinierter chinesischer und englischer Befehlswörter.

Über die von uns bereitgestellte Webseite können Sie die Befehlswörter ändern, eine neue Firmware-Datei erzeugen und die Firmware mit der PC-Software in das Modul schreiben; anschließend kann das Modul die neuen Befehle erkennen. Mit 2M integriertem Speicher können bis zu etwa 120 Befehlswörter geschrieben werden.

- Integrierter hochwertiger Lautsprecher und leistungsstarkes Mikrofon.

Es integriert fortschrittliche Algorithmen und Schaltungs-Rauschunterdrückungstechnik, kann Umgebungs- und Hintergrundgeräusche wirksam herausfiltern und erreicht im Umkreis von 5 Metern eine Erkennungsrate von bis zu 99 %, wodurch natürliche Konversation und Echounterdrückung ermöglicht werden. Es liefert eine klare Klangausgabe und gibt Sprachdetails präzise wieder.

- Integrierter Coprozessor sowie IIC-/serielle Schnittstellen/Type-C-Schnittstellen.

Es integriert einen STC8H-Chip, der Sprachdaten automatisch in das Format der seriellen Schnittstelle oder von IIC umwandeln kann, wodurch der Kommunikationsprozess mit externen Host-Controllern vereinfacht wird. Verschiedene Anschlusskabel werden kostenlos bereitgestellt; Sie können das Modul an MCU-Entwicklungsboards und eingebettete Host-Controller anschließen, um zu kommunizieren und eigene DIY-Projekte zu erstellen.

- Anleitungen zur Verwendung mit verschiedenen Entwicklungsboards werden bereitgestellt

Es werden Informationen zu Entwicklungsboards bereitgestellt, z. B. STM32, ESP32, MSPM0, Raspberry Pi, die Jetson-Entwicklungsboardserie, RDK usw. Außerdem werden SDK-Dateien für ROS1- und ROS2-Systeme bereitgestellt.

## 3.Funktionsprinzip

Das Modul verwendet den Aufweckmodus per Kommandowort: Der Benutzer muss das eingestellte Weckwort aussprechen, um das Sprachinteraktionsmodul zunächst zu aktivieren; nach der Aktivierung kann die Spracherkennung erfolgen. Das Standard-Weckwort der Werks-Firmware ist „你好，小犀“. Wenn nach 15 Sekunden keine Sprache erkannt wird, wechselt das Modul in den Ruhezustand und muss bei erneuter Verwendung wieder aufgeweckt werden.

Wenn der CI1302-Chip den entsprechenden Spracheintrag erkennt, sendet er ihn über die serielle Schnittstelle bzw. die IIC-Schnittstelle aus und gibt eine Ansage zurück; der IIC-Chip speichert den empfangenen Sprachbefehl und sendet ihn über das IIC-Slave-Protokoll aus.

Das Modul unterstützt das Ändern des Weckworts, das Ändern von Befehlswörtern und benutzerdefinierte Einträge. In den Anleitungen „[Weckwort und Befehlswörter ändern](https://juxitech.feishu.cn/wiki/Po6bw8OtLiDNonklg7ZcBbGknyc)“ und „[Benutzerdefinierte Protokolleinträge erstellen](https://juxitech.feishu.cn/wiki/CIHLwo8qNiVBtKkhuTtcZIeNnAb)“ erfahren Sie, wie Sie dabei vorgehen.

## 4.Hinweise

1、Mit einer Spannung von 5V versorgen; eine Spannung über 5V beschädigt das Modul

2、Die Einsatzumgebung sollte ruhig sein; eine laute Umgebung beeinträchtigt die Erkennungsleistung

3、Beim Sprechen eines Eintrags sollte die Stimme laut sein und das Sprechtempo nicht zu hoch; es wird empfohlen, einen Abstand von höchstens 5 Metern zum Modul einzuhalten

## 5.Beschreibung der Hardwareschnittstelle

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Product-Info/1.png)

<RelatedProducts slugs="ai-voice-module" />
