---
title: "Schnellstart"
description: "Schnellstart für das AI-Sprachinteraktionsmodul: Geräte anschließen und ohne Flashen erste Spracherkennung und Ansagen mit der Werk-Firmware testen."
---

# Schnellstart

Ab Werk ist bereits die Firmware mit Spracherkennungsfunktion geflasht, sodass Sie ohne Flashen schnell erste Erfahrungen sammeln können. Wenn Sie weitere Erkennungseinträge hinzufügen, andere Firmware neu flashen oder Einträge selbst definieren möchten, sehen Sie im Tutorial „3. Benutzerdefinierte Protokolleinträge erstellen“ nach, wie Sie Einträge selbst definieren.

## 1. Vorbereitung vor der Verwendung

1. Ein Type-C-Datenkabel  

2. Das Sprachinteraktionsmodul

## 2. Geräteanschluss

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Quick-Start/1.png)

## 3. Umsetzung von Spracherkennung und Ansage

Nachdem Sie das Sprachinteraktionsmodul über Type-C mit Strom versorgt haben, können Sie das Modul mit dem Weckwort „你好，小犀“ aufwecken. Ein erfolgreich aufgewecktes Modul antwortet mit „我在“, was bedeutet, dass es aktuell Sprache erkennen kann. Wird innerhalb von 15 Sekunden kein Befehlswort erkannt, wechselt das Modul in den Ruhemodus und sagt gleichzeitig „我去休息了“ an. Wenn Sie das Modul erneut aufwecken möchten, sprechen Sie einfach das Weckwort erneut.

Die Werk-Firmware enthält bereits Befehlswörter und Ansagephrasen; die Protokollliste finden Sie in den bereitgestellten Anhängen. Die folgende Abbildung zeigt einen Auszug aus der Liste der Befehlswort-Ansagephrasen-Protokolle. Anhand des Funktionstyps können Sie erkennen, welche Funktion ein Befehlswort repräsentiert. Die anzusagenden Ansagephrasen sind passive Ansagephrasen; sie werden erst ausgelöst, wenn über die serielle Schnittstelle des Computers oder über einen anderen Mikrocontroller bzw. ein anderes Hauptsteuergerät der entsprechende Befehl an das Sprachinteraktionsmodul gesendet wird. Einzelheiten zeigt die folgende Abbildung.

Funktionswörter:

Befehlswörter:

Ansagewörter:

Es gibt zwei Ansagemodi: einen aktiven und eine passive Ansage

Aktive Ansage: Wenn wir gemäß der Tabelle ein Befehlswort sprechen, sagt das Modul den entsprechenden Satz aktiv an. Nach dem Aufwecken sagen wir „小车前进“; sobald das Modul dies erkennt, sagt es aktiv „好的，正在前进“ an. 

Passive Ansage: Die entsprechende Ansage erfolgt erst, wenn ein Befehl aus der Protokolltabelle über die serielle Schnittstelle an das Sprachmodul gesendet wird. Alternativ können Sie gemäß dem IIC-Protokoll durch Schreiben der entsprechenden Ansagedaten in das Register für die passive Ansage die Ansage auslösen. Einzelheiten finden Sie unter „Multi-Master-Kommunikation“.

<RelatedProducts slugs="ai-voice-module" />
