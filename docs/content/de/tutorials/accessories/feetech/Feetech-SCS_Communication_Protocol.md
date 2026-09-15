---
title: "SCS-Kommunikationsprotokoll"
description: "Der Kommunikationspegel nutzt TTL für Hochgeschwindigkeitskommunikation und RS485 mit starker Störfestigkeit; die Kommunikation erfolgt asynchron-duplex, Senden und Empfangen werden asynchron verarbeitet."
---

# SCS-Kommunikationsprotokoll

> **[Im Shop kaufen](https://www.juxitech.com/de/products/feetech-scs0009-serial-bus-servo)**


# 1 Protokollübersicht

  Der Kommunikationspegel nutzt TTL für Hochgeschwindigkeitskommunikation und RS485 mit starker Störfestigkeit; die Kommunikation erfolgt asynchron-duplex, Senden und Empfangen werden asynchron verarbeitet.

  Controller und Servo kommunizieren im Frage-Antwort-Modus: Der Controller sendet einen Befehlsrahmen, der Servo antwortet mit einem Antwortrahmen.

  In einem Bus-Netzwerk dürfen mehrere Servos angeschlossen sein, daher hat jeder Servo eine im Netzwerk eindeutige ID-Nummer. Der vom Controller gesendete Steuerbefehl enthält die ID-Information; nur der Servo mit passender ID-Nummer kann den Befehl vollständig empfangen und eine Antwort senden.

Die Kommunikation erfolgt seriell-asynchron: Ein Rahmen besteht aus 1 Startbit, 8 Datenbits und 1 Stoppbit ohne Paritätsbit, insgesamt 10 Bits.

  Wenn einige Parameter der Speichertabelle zwei Bytes verwenden, hängt die Byte-Reihenfolge vom Servomodell ab: Potentiometer-Servos im Big-Endian-Format (hohes Byte zuerst, niederes Byte danach), Magnetencoder-Servos im Little-Endian-Format (niederes Byte zuerst, hohes Byte danach). Da sich die Funktionen der Servos leicht unterscheiden, beachten Sie bei der Steuerung die Speichertabelle des jeweiligen Modells.

# 2 Befehlsrahmen

- Kopf: Zweimal hintereinander 0xFF empfangen bedeutet, dass ein Datenpaket angekommen ist.
ID-Nummer: Jeder Servo hat eine ID-Nummer. Bereich 0–253, hexadezimal 0x00–0xFD.

- Broadcast-ID: ID-Nummer 254 ist die Broadcast-ID. Sendet der Controller ID 254 (0xFE), empfangen alle Servos den Befehl; außer bei PING antworten die Servos nicht (mit mehreren Servos am Bus darf die Broadcast-PING-Anweisung nicht verwendet werden).

- Datenlänge: entspricht der Anzahl der zu sendenden Parameter N plus 2, also „N+2“.

- Befehl: Funktionscode des Datenpakets, siehe 1.3 Befehlstypen.

- Parameter: zusätzliche Steuerinformationen zum Befehl; maximal 2 Bytes für einen Speicherwert. Byte-Reihenfolge siehe Speichertabelle des Servicehandbuchs (je nach Modell unterschiedlich).

- Prüfsumme: Berechnung der Prüfsumme (Check Sum):
Check Sum = ~ (ID + Length + Instruction + Parameter1 + … Parameter N) Übersteigt die Summe in Klammern 255, wird das niederwertigste Byte genommen. „~“ bedeutet Bit-Invertierung.

# 3 Antwortrahmen

Der Antwortrahmen enthält den aktuellen Servo-Status ERROR. Ist der Servo nicht in Ordnung, wird dies über dieses Byte sichtbar (Bedeutung der Zustände siehe Speichertabelle im Handbuch). Ist ERROR 0, liegt kein Fehler vor.

# 4 Befehlstypen

## 4.1 Statusabfrage PING

- Funktion: Arbeitsstatus des Servos lesen

- Länge: 0x02

- Befehl: 0x01

- Parameter: keine

- Wird PING mit der Broadcast-Adresse gesendet, antwortet der Servo ebenfalls.

Beispiel 1: Arbeitsstatus des Servos mit ID 1 lesen.

Befehlsrahmen: FF FF 01 02 01 FB (hexadezimal senden)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 02
Befehl: 01
Prüfsumme: FB
```

Antwortrahmen:  FF FF 01 02 00 FC (hexadezimale Anzeige)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 02
Status: 00
Prüfsumme: FC
```

## 4.2 Lesebefehl READ DATA

- Funktion: Daten aus der Speichertabelle des Servos lesen

- Länge: 0x04

- Befehl: 0x02

- Parameter 1: Startadresse des Leseblocks

- Parameter 2: Länge der zu lesenden Daten

Beispiel 2: Aktuelle Position des Servos mit ID 1 lesen (niederes Byte zuerst, hohes Byte danach). Die Adresse des Positionsparameters in der Speichertabelle ist 0X38, zwei aufeinanderfolgende Bytes.

Befehlsrahmen: FF FF 01 04 02 38 02 BE (hexadezimal senden)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 04
Befehl: 02
Parameter: 38 02 (Adresse aktuelle Position, Lesedatenlänge)
Prüfsumme: BE
```

Antwortrahmen: FF FF 01 04 00 18 05 DD (hexadezimale Anzeige)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 04
Status: 00
Parameter: 18 05
Prüfsumme: DD
```

Die gelesenen zwei Bytes (Little-Endian): niederes Byte L 0x18, hohes Byte H 0x05. Zusammen als 16-Bit-Wert 0X0518, dezimal beträgt die aktuelle Position 1304.

## 4.3 Schreibbefehl WRITE DATA

- Funktion: Daten in die Speichertabelle des Servos schreiben

- Länge: N+2 (N = Parameterlänge)

- Befehl: 0x03

- Parameter 1: Startadresse des Schreibblocks

- Parameter 2: erstes zu schreibendes Datum

- Parameter 3: zweites zu schreibendes Datum
…

- Parameter N: n-tes zu schreibendes Datum, N=n+1

Beispiel 3: Mit der Broadcast-ID (0xFE) die ID eines beliebigen Servos auf 1 setzen. Die Adresse für die ID-Nummer in der Speichertabelle ist 5.

Befehlsrahmen: FF FF FE 04 03 05 01 F4 (hexadezimal senden)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 04
Befehl: 03
Parameter: 05 01 (ID-Adresse, neuer ID-Wert)
Prüfsumme: F4
```

Da mit der Broadcast-ID gesendet wurde, kommt keine Datenantwort. Die EPROM-Speichertabelle hat außerdem einen Schutzsperrschalter; vor dem Ändern der ID muss dieser ausgeschaltet (0) werden, sonst wird die ID beim Stromausfall nicht gespeichert. Details siehe Speichertabelle oder Handbuch des jeweiligen Servomodells.

Beispiel 4: Servo ID1 mit 1000 Schritten pro Sekunde auf Position 2048 drehen. Die Startadresse der Zielposition ist 0x2A, daher werden ab Adresse 0x2A sechs Bytes geschrieben.

- Positionsdaten 0x0800 (2048)

- Reservierte Daten 0x0000 (0)

- Geschwindigkeitsdaten 0x03E8 (1000)

Befehlsrahmen: FF FF 01 09 03 2A 00 08 00 00 E8 03 D5 (hexadezimal senden)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 09
Befehl: 03
Parameter:
2A (Startadresse)
00 08 (Position)
00 00 (reserviert)
E8 03 (Geschwindigkeit)
Prüfsumme: D5
```

Antwortrahmen: FF FF 01 02 00 FC (hexadezimale Anzeige)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 02
Status: 00
Prüfsumme: FC
```

Der zurückgegebene Status 0 bedeutet: Der Servo hat den Befehl fehlerfrei empfangen und mit der Ausführung begonnen. Da die gesendete Paket-ID keine Broadcast-ID (0xFE) ist, sendet der Servo nach dem Empfang ein Statuspaket zurück.

## 4.4 Asynchroner Schreibbefehl REG WRITE

REG WRITE ähnelt WRITE DATA, nur der Ausführungszeitpunkt ist anders. Beim Empfang eines REG-WRITE-Rahmens werden die Daten im Puffer gespeichert und das Asynchron-Schreib-Flag-Register auf 1 gesetzt. Mit dem ACTION-Befehl wird der gespeicherte Befehl schließlich ausgeführt.

- Länge: N+2 (N = Parameterlänge)

- Befehl: 0x04

- Parameter 1: Startadresse des Schreibbereichs

- Parameter 2: erstes zu schreibendes Datum

- Parameter 3: zweites zu schreibendes Datum

- Parameter N: n-tes zu schreibendes Datum, N=n+1

Beispiel 5: Servos ID1 bis ID10 mit 1000 Schritten pro Sekunde auf Position 2048 drehen.

```Plain Text
ID 1: Asynchroner Schreibrahmen: FF FF 01 09 04 2A 00 08 00 00 E8 03 D4
ID 1: Antwortrahmen: FF FF 01 02 00 FC
ID 2: Asynchroner Schreibrahmen: FF FF 02 09 04 2A 00 08 00 00 E8 03 D3
ID 2: Antwortrahmen: FF FF 02 02 00 FB
ID 3: Asynchroner Schreibrahmen: FF FF 03 09 04 2A 00 08 00 00 E8 03 D2
ID 3: Antwortrahmen: FF FF 03 02 00 FA
ID 4: Asynchroner Schreibrahmen: FF FF 04 09 04 2A 00 08 00 00 E8 03 D1
ID 4: Antwortrahmen: FF FF 04 02 00 F9
ID 5: Asynchroner Schreibrahmen: FF FF 05 09 04 2A 00 08 00 00 E8 03 D0
ID 5: Antwortrahmen: FF FF 05 02 00 F8
ID 6: Asynchroner Schreibrahmen: FF FF 06 09 04 2A 00 08 00 00 E8 03 CF
ID 6: Antwortrahmen: FF FF 06 02 00 F7
ID 7: Asynchroner Schreibrahmen: FF FF 07 09 04 2A 00 08 00 00 E8 03 CE
ID 7: Antwortrahmen: FF FF 07 02 00 F6
ID 8: Asynchroner Schreibrahmen: FF FF 08 09 04 2A 00 08 00 00 E8 03 CD
ID 8: Antwortrahmen: FF FF 08 02 00 F5
ID 9: Asynchroner Schreibrahmen: FF FF 09 09 04 2A 00 08 00 00 E8 03 CC
ID 9: Antwortrahmen: FF FF 09 02 00 F4
ID10: Asynchroner Schreibrahmen: FF FF 0A 09 04 2A 00 08 00 00 E8 03 CB
ID10: Antwortrahmen: FF FF 0A 02 00 F3
```

## 4.5 Asynchronen Schreibbefehl ausführen ACTION

- Funktion: REG-WRITE-Befehl auslösen

- Länge: 0x02

- Befehl: 0x05

- Parameter: keine

1. ACTION ist sehr nützlich, wenn mehrere Servos gleichzeitig gesteuert werden.

2. Bei mehreren Servos bewirkt ACTION, dass der erste und der letzte Servo ihre Aktionen gleichzeitig ausführen, ohne Verzögerung dazwischen.

3. Da ACTION mit der Broadcast-ID (0xFE) gesendet wird, kommt keine Datenrahmen-Antwort zurück.

Beispiel 6: Nach dem asynchronen Schreibbefehl für Servos ID1 bis ID10 (1000 Schritte/s auf Position 2048) muss der asynchrone Schreibbefehl ausgeführt werden.

```Plain Text
Befehlsrahmen: FF FF FE 02 05 FA
Antwortrahmen: keine
```

## 4.6 Synchroner Schreibbefehl SYNC WRITE

- Funktion: mehrere Servos gleichzeitig steuern.

- ID: 0xFE

- Länge: (L+1)*n+4 (L: Datenlänge pro Servo, n: Anzahl der Servos)

- Befehl: 0x83

- Parameter 1: Startadresse der zu schreibenden Daten

- Parameter 2: Länge der zu schreibenden Daten (L)

- Parameter 3: ID des ersten Servos

- Parameter 4: erstes Datum für Servo 1

- Parameter 5: zweites Datum für Servo 1
…

- Parameter L+3: L-tes Datum für Servo 1

- Parameter L+4: ID des zweiten Servos

- Parameter L+5: erstes Datum für Servo 2

- Parameter L+6: zweites Datum für Servo 2
…

- Parameter 2L+4: L-tes Datum für Servo 2
…

Im Unterschied zu REG WRITE+ACTION ist der SYNC WRITE zeitnäher: Ein einziger Befehl kann die Steuertabellen mehrerer Servos auf einmal ändern, während REG WRITE+ACTION schrittweise arbeitet. Dennoch müssen bei SYNC WRITE Datenlänge und Startadresse identisch sein.

Beispiel 7: Für 4 Servos (ID1–ID4) ab Startadresse 0x2A Position 0x0800, Zeit 0X0000 und Geschwindigkeit 0x03E8 schreiben (niederes Byte zuerst, hohes Byte danach).

Befehlsrahmen: FF FF FE 20 83 2A 06 01 00 08 00 00 E8 03 02 00 08 00 00 E8 03 03 00 08 00 00 E8 03 04 00 08 00 00 E8 03 58 (hexadezimal senden)

```Plain Text
Kopf: FF FF
ID: FE
Effektive Datenlänge: 20
Befehl: 83
Parameter:
2A 06 (Startadresse, Datenlänge)
01 00 08 00 00 E8 03 (Befehl Servo ID1)
02 00 08 00 00 E8 03 (Befehl Servo ID2)
03 00 08 00 00 E8 03 (Befehl Servo ID3)
04 00 08 00 00 E8 03 (Befehl Servo ID4)
Prüfsumme: 58
```

## 4.7 Synchroner Lesebefehl SYNC READ

- Funktion: mehrere Servos gleichzeitig abfragen.

- ID: 0xFE

- Länge: n+4 (n = Anzahl der Servos)

- Befehl: 0x82

- Parameter 1: Startadresse der zu lesenden Daten

- Parameter 2: Länge der zu lesenden Daten

- Parameter 3: ID des ersten Servos

- Parameter 4: ID des zweiten Servos
…

- Parameter N: ID des n-ten Servos, N=n+2

Ein SYNC-READ-Befehl fragt die Steuertabellen mehrerer Servos auf einmal ab; die IDs werden im Befehl angegeben, und die Servos antworten in der Reihenfolge der IDs im Befehlsrahmen. Bei SYNC READ müssen Datenlänge und Startadresse aller Abfragen identisch sein (dieser Befehl ist nur bei einigen Serienbus-Servos verfügbar).

Beispiel 8: Für 2 Servos (ID1–ID2) aktuelle Position, Geschwindigkeit, Last, Spannung und Temperatur abfragen (Startadresse 0x38, insgesamt 8 Word-Daten, niederes Byte zuerst, hohes Byte danach).

Befehlsrahmen: FF FF FE 06 82 38 08 01 02 36

```Plain Text
Kopf: FF FF
ID: FE
Länge: 06
Befehl: 82
Parameter:
38 08 (Datenstartadresse, Datenlänge)
01 02 (ID01, ID02)
Prüfsumme: 36
```

Antwortrahmen:

```Plain Text
Servo ID01: FF FF 01 0A 00 00 08 00 00 00 00 79 1E 55
Servo ID02: FF FF 02 0A 00 FF 07 00 00 00 00 77 23 53
```

Der Antwortrahmen lässt sich gemäß Lesebefehl dekodieren

## 4.8 Status-Reset-Befehl RESET

- Funktion: Servo-Status zurücksetzen (Servo-Umdrehungen zurücksetzen)

- Länge: 0x02

- Befehl: 0x0A

- Parameter: keine

Beispiel 9: Servo zurücksetzen, ID 01.

```Plain Text
Befehlsrahmen: FF FF 01 02 0A F2 (hexadezimal senden)
Antwortrahmen: FF FF 01 02 00 FC (hexadezimale Anzeige)
```

## 4.9 Positions-Kalibrierungsbefehl

- Funktion: aktuelle Position auf den festgelegten Wert neu kalibrieren

- Länge: 0x02 oder 0x04

- Befehl: 0x0B

- Parameter: keine oder festgelegter Wert

Hinweis: Ohne Parameter wird die aktuelle Position auf die Mittelstellung kalibriert. Der Kalibrierungsbefehl wird nur von einigen Modellen unterstützt – siehe Tabelle unten.

Beispiel 10: Aktuelle Position auf Mittelstellung neu kalibrieren.

```Plain Text
Befehlsrahmen: FF FF 01 02 0B F1 (hexadezimal senden)
Antwortrahmen: FF FF 01 02 00 FC (hexadezimale Anzeige)
```

Beispiel 11: Aktuelle Position auf 1024 neu kalibrieren.

Befehlsrahmen: FF FF 01 04 0B 00 04 EB (hexadezimal senden)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 04
Befehl: 0B
Sollwert: 00 04 (1024)
Prüfsumme: EB
```

Antwortrahmen: FF FF 01 02 00 FC (hexadezimale Anzeige)

```Plain Text
Kopf: FF FF
ID: 01
Länge: 02
Status: 00
Prüfsumme: FC
```

## 4.10 Parameter-Wiederherstellungsbefehl

- Funktion: alle Servo-Parameter außer der ID-Nummer wiederherstellen

- Länge: 0x02

- Befehl: 0x06

- Parameter: keine

Beispiel 11: Servo-Parameter wiederherstellen.

```Plain Text
Befehlsrahmen: FF FF 01 02 06 F6 (hexadezimal senden)
Antwortrahmen: FF FF 01 02 00 FC (hexadezimale Anzeige)
```

Hinweis: Vor dem Wiederherstellen der Parameter die EPROM-Parameter entsperren

## 4.11 Parameter-Backup-Befehl

- Funktion: Parameter sichern (für die Parameter-Wiederherstellung)

- Länge: 0x02

- Befehl: 0x09

- Parameter: keine

Beispiel 12: Servo-Parameter sichern.

```Plain Text
Befehlsrahmen: FF FF 01 02 09 F3 (hexadezimal senden)
Antwortrahmen: FF FF 01 02 00 FC (hexadezimale Anzeige)
```

Hinweis: Vor dem Sichern der Parameter die EPROM-Parameter entsperren

## 4.12 Neustart-Befehl

- Funktion: Neustart-Befehl (Servo neu starten)

- Länge: 0x02

- Befehl: 0x08

- Parameter: keine

Beispiel 13: Servo neu starten.

```Plain Text
Befehlsrahmen: FF FF 01 02 08 F4 (hexadezimal senden)
Antwortrahmen: keine (Neustart dauert ca. 800 ms)
```

Hinweis: Vor dem Neustart des Servos den Drehmomentschalter ausschalten
