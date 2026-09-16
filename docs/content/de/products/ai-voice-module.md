---
title: AI-Sprachinteraktionsmodul
category: accessory
description: Juxi Technology AI-Sprachinteraktionsmodul (CI1302) — 110+ Offline-Sprachbefehle, 99 % Erkennungsrate im Umkreis von 5 m, benutzerdefinierte chinesische/englische Befehlswörter, serielle/IIC-Kommunikation, für Arduino/Jetson/RDK/Raspberry Pi/PC
keywords: [ai sprache, sprachinteraktionsmodul, ci1302, offline-spracherkennung, weckwort, befehlswörter, seriell, iic, ros1, ros2]
---

# AI-Sprachinteraktionsmodul

> **[Auf Taobao kaufen](https://item.taobao.com/item.htm?id=1055967142978)**

## Produktübersicht

Das AI-Sprachinteraktionsmodul basiert auf dem Hochleistungs-Sprachchip **CI1302** von Chipintelli mit neuronalem Netzwerk und integriertem BNPU V3 Gehirn-Neuronalnetz-Prozessor; es unterstützt Offline-Fernfeld-Spracherkennung. Ein onboard **STC8H-Coprozessor** wandelt die Spracherkennungsergebnisse automatisch in Daten der seriellen Schnittstelle oder von IIC um und vereinfacht so die Kommunikation mit externen Hauptsteuergeräten. Die gesamte Erkennung erfolgt lokal im Modul, ohne Netzwerkverbindung.

**Kernfunktionen**:

- 100% Offline-Spracherkennung, keine Netzwerkverbindung erforderlich (Datenschutz + geringe Latenz)
- **110+ Sprachbefehle** ab Werk voreingestellt; benutzerdefinierte chinesische und englische Befehlswörter möglich (bis zu ca. 120 Einträge)
- Weckwort „你好，小犀“; automatischer Ruhemodus nach 15 Sekunden ohne Befehl, erneutes Aufwecken genügt
- Integrierter hochwertiger Lautsprecher und leistungsstarkes Mikrofon, Rauschunterdrückung und Echounterdrückung; Erkennungsrate bis zu 99 % im Umkreis von 5 Metern
- Onboard STC8H-Coprozessor — Erkennungsergebnisse werden als Daten der seriellen Schnittstelle / von IIC ausgegeben
- Zwei Ansagemodi: aktive Ansage und passive Ansage
- ROS1- / ROS2-SDK sowie Kommunikations-Tutorials für Arduino / Jetson / RDK / Raspberry Pi / PC

---

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Sprachchip | Chipintelli CI1302 (BNPU V3 Neuronalnetz-Prozessor, Systemtakt bis zu 220MHz) |
| Speicher | 640KB SRAM + 2MB Flash |
| Sprachbefehle | 110+ voreingestellt; benutzerdefinierte chinesische/englische Befehlswörter, bis zu ca. 120 Einträge |
| Aufweckmodus | Weckwort „你好，小犀“ (änderbar) |
| Erkennungsdistanz | Bis 5 m (ruhige Umgebung, Erkennungsrate bis zu 99 %) |
| Audio | Integrierter hochwertiger Lautsprecher + leistungsstarkes Mikrofon (Rauschunterdrückung + Echounterdrückung) |
| Schnittstellen | Serielle Schnittstelle / IIC / Type-C (Onboard STC8H-Coprozessor) |
| Stromversorgung | 5V (Type-C) |
| Unterstützte Plattformen | Arduino, Jetson, RDK, Raspberry Pi, PC (STM32 / ESP32 / MSPM0 und weitere MCUs) |
| Software | ROS1- / ROS2-SDK, Firmware-Flashtool, Web-Tool für benutzerdefinierte Einträge |

---

## Schnellstart

Die Firmware mit Spracherkennungsfunktion ist ab Werk bereits geflasht — ohne Flashen können Sie das Modul sofort ausprobieren:

1. Das Modul über ein Type-C-Datenkabel mit Strom versorgen (5V)
2. Das Weckwort „你好，小犀“ sprechen — sobald das Modul mit „我在“ antwortet, können Befehle gegeben werden (z. B. „Wagen vorwärts“)
3. Wird innerhalb von 15 Sekunden kein Befehlswort erkannt, sagt das Modul „我去休息了“ an und wechselt in den Ruhemodus; zum erneuten Verwenden einfach das Weckwort wieder sprechen

Wenn Sie weitere Erkennungseinträge hinzufügen möchten, ändern Sie die Befehlswörter über das Web-Tool, erzeugen eine neue Firmware und schreiben diese mit der PC-Software in das Modul; siehe [Flashen der Modul-Firmware](/de/tutorials/accessories/ai-voice-module/Firmware-Flashing) und [Benutzerdefinierte Protokolleinträge erstellen](/de/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Komplette Tutorials

- [Schnellstart — Auspacken, Aufwecken und Ansagen](/de/tutorials/accessories/ai-voice-module/Quick-Start)
- [Produktinformationen — Produktmerkmale, Funktionsprinzip, Hinweise und Hardwareschnittstellen](/de/tutorials/accessories/ai-voice-module/Product-Info)
- [Flashen der Modul-Firmware](/de/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Weckwort und Befehlswörter ändern](/de/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Benutzerdefinierte Protokolleinträge erstellen](/de/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [ROS1-Sprachinteraktion](/de/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [ROS2-Sprachinteraktion](/de/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Serielles Protokoll](/de/tutorials/accessories/ai-voice-module/Serial-Protocol) / [IIC-Protokoll](/de/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [PC-Kommunikation](/de/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [Serielle Kommunikation](/de/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [IIC-Kommunikation](/de/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [Serielle Kommunikation](/de/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [IIC-Kommunikation](/de/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [Serielle Kommunikation](/de/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [IIC-Kommunikation](/de/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [Serielle Kommunikation](/de/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [IIC-Kommunikation](/de/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Anwendungsfälle

- Sprachinteraktion und Befehlskontrolle für Roboter (z. B. „Wagen vorwärts“, „Stopp“)
- Sprachsteuerung im Smart Home (Beleuchtung, Haushaltsgeräte)
- Sprachprodukte für Bildung und Spielzeug
- Sprachsteuerung für Industrieanlagen
- Verschiedene DIY-Sprachinteraktionsprojekte

---

## Häufige Fragen

**F: Ist eine Netzwerkverbindung erforderlich?**

Nein. Der CI1302 ist ein Offline-Sprachchip — die Erkennung erfolgt lokal im Modul, eine Netzwerkverbindung ist nicht nötig.

**F: Funktioniert das Modul direkt ab Werk?**

Ja. Die Firmware mit Spracherkennungsfunktion ist ab Werk geflasht — nach der Stromversorgung über Type-C können Sie sofort das Weckwort sprechen. Nur beim Hinzufügen benutzerdefinierter Einträge muss die Firmware erneut geflasht werden.

**F: Werden englische Befehle unterstützt?**

Ja. Chinesische und englische Befehlswörter können benutzerdefiniert angelegt werden; ändern Sie sie über das Web-Tool, erzeugen Sie die Firmware und flashen Sie diese.

**F: Wie kommuniziert das Modul mit der Hauptsteuerung?**

Der onboard STC8H-Coprozessor wandelt die Spracherkennungsergebnisse automatisch in Daten der seriellen Schnittstelle oder von IIC um; Kommunikations-Tutorials für Arduino, Jetson, RDK, Raspberry Pi und PC sowie ROS1- / ROS2-SDK sind verfügbar.

**F: Wie groß ist die Erkennungsdistanz?**

In ruhiger Umgebung bis zu 99 % Erkennungsrate im Umkreis von 5 Metern; laute Umgebungen beeinträchtigen die Erkennung.

---

## Hinweise

- Mit einer Spannung von 5V versorgen; eine Spannung über 5V beschädigt das Modul
- Die Einsatzumgebung sollte ruhig sein; eine laute Umgebung beeinträchtigt die Erkennungsleistung
- Beim Sprechen von Befehlswörtern sollte die Stimme laut sein und das Sprechtempo nicht zu hoch; halten Sie idealerweise einen Abstand von höchstens 5 Metern zum Modul ein

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
