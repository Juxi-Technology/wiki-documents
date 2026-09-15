---
title: "Serielles Protokoll"
description: "Öffnen Sie die Datei 命令词播报词协议列表V1中文 im Anhang; Sie sehen das Sendeprotokoll und das Empfangsprotokoll,"
---

# Serielles Protokoll

Öffnen Sie die Datei 命令词播报词协议列表V1_中文 im Anhang; Sie sehen das Sendeprotokoll und das Empfangsprotokoll,

## 1. Analyse der funktionalen Einträge

In der Datei sehen Sie die Sende- und Empfangsprotokolle von 10 funktionalen Einträgen,

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

Die funktionalen Einträge können wir durch Auswerten des dritten Bytes des Protokolls unterscheiden

![Abb. 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Dabei geben das 1. und 2. Byte (EF EF) den Rahmenkopf an, das 3. Byte die ID des Funktionsworts, das 4. Byte die ID des Befehlsworts und das 5. Byte (EE) das Rahmenende

## 2. Befehlswort-Einträge

Ein Beispiel für einen Befehlswort-Eintrag ist unten dargestellt; das 4. Byte im Befehlswort gibt die ID an

![Abb. 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Beispiel:

Wenn wir zum Beispiel zum Modul „小车停止“ sagen, sendet das Modul über die serielle Schnittstelle fünf Bytes: FE EF 00 01 EE. Wir können diese Daten über die serielle Dienstfunktion der Hauptsteuerung abrufen und dann durch Auswerten des 4. Bytes die ID:01 erhalten. Zu diesem Zeitpunkt wissen wir, dass es sich um „小车停止“ handelt.

## 3. Einträge für Ansagephrasen

Einträge für Ansagephrasen werden nicht von selbst angesagt; eine Ansage erfolgt erst, wenn die Hauptsteuerung über die serielle Schnittstelle einen Befehl sendet (auch die Ansagephrasen von Befehlswort-Einträgen können angesagt werden).

![Abb. 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Dabei geben das 1. und 2. Byte (FE EF) den Rahmenkopf an, das 3. Byte die Ansagefunktion FF, das 4. Byte die ID des anzusagenden Inhalts und das 5. Byte (EE) das Rahmenende

Beispiel:

Wenn wir „初始化完成“ ansagen möchten, muss die Hauptsteuerung über die serielle Schnittstelle FE EF FF 67 EE an das Sprachinteraktionsmodul senden. Nach dem Senden kann das Sprachinteraktionsmodul „初始化完成“ ansagen

![Abb. 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

