---
title: "IIC-Protokoll"
description: "Hinweis: Die Stromversorgung des Host-Geräts und des Sprachinteraktionsmoduls kann unterschiedlich sein, aber…"
---

# IIC-Protokoll

Hinweis: Die Stromversorgung des Host-Geräts und des Sprachinteraktionsmoduls kann unterschiedlich sein, aber beim Anschließen muss eine gemeinsame Masse vorhanden sein, um einen stabilen Kommunikationspegel zu gewährleisten

## 1. Das Sprachinteraktionsmodul als Slave

Empfangen und Auswerten der vom Host gesendeten Signale:

Warten Sie auf den IIC-Signalinterrupt. Wenn über IIC Daten empfangen werden, rufen Sie anhand der empfangenen IIC-Registeradressinformationen die entsprechende Funktion auf.

Datenverarbeitung und Rückmeldung:

Wenn das Sprachinteraktionsmodul einen Befehl zum Lesen eines Registers empfängt, ruft es die entsprechende Sendefunktion auf und sendet die erkannten Daten an das Host-Gerät.

## 2. IIC-Geräteadresse und Registerfunktionen

Die Geräteadresse des IIC-Slaves des Sprachinteraktionsmoduls ist 0x2A.

## 3. Befehlswörter abrufen.

Öffnen Sie die Datei 命令词播报词协议列表V1_中文 im Anhang. Sie sehen, dass das Kommunikationsprotokoll mit 0xFE, 0xED beginnt und mit 0xEE endet; die 2 Bytes dazwischen sind der Funktionstyp bzw. die ID-Nummer.

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

Wenn das Sprachinteraktionsmodul das Befehlswort „停车“ erkennt, antwortet es mit „好的，已停止“. Die Hauptsteuerung kann im Register für das Erkennungsergebnis (0xDA) das Ein-Byte-Datum 0x02 auslesen; dieses Datum stimmt mit dem 4. Byte im Sendeprotokoll von „停车“ überein.

![Abb. 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4. Einträge für Ansagephrasen

Einträge für Ansagephrasen werden nicht von selbst angesagt; sie werden erst angesagt, wenn die Hauptsteuerung sie über IIC setzt (auch die Ansagephrasen von Befehlswort-Einträgen können angesagt werden).

Wenn die Hauptsteuerung über IIC ein 1 Byte an die Ansageregisteradresse (0xD1) schreibt, das die ID-Nummer des Befehlsworts enthält, sagt das Sprachansagemodul den entsprechenden Satz an; 0xFF ist eine normale Ansagephrase.

![Abb. 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

Zum Beispiel:

Wenn der Benutzer „这是红色“ abspielen möchte, muss die Hauptsteuerung über IIC „0x5F“ in das Ansageregister (0xD1) schreiben; das Sprachinteraktionsmodul sagt dann „这是红色“ an.

![Abb. 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5. Einträge für Ansagefunktionswörter

Funktionswort-Einträge können angesagt werden, wenn ein Befehlswort erkannt wird, oder durch Schreiben bestimmter Bytes über IIC.

Wenn die Hauptsteuerung über IIC ein 1 Byte an die Ansageregisteradresse (0xD2) schreibt, das die ID-Nummer des Befehlsworts enthält, sagt das Sprachansagemodul den entsprechenden Satz an; 0xFF ist eine normale Ansagephrase.

![Abb. 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

Zum Beispiel:

Wenn der Benutzer „这是红色“ abspielen möchte, muss die Hauptsteuerung über IIC „0x01“ in das Ansageregister (0xD2) schreiben; das Sprachinteraktionsmodul sagt dann „欢迎使用小犀“ an.

![Abb. 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5. Einträge für Ansagebefehlswörter

Befehlswort-Einträge können angesagt werden, wenn ein Befehlswort erkannt wird, oder durch Schreiben bestimmter Bytes über IIC.

Wenn die Hauptsteuerung über IIC ein 1 Byte an die Ansageregisteradresse (0xD3) schreibt, das die ID-Nummer des Befehlsworts enthält, sagt das Sprachansagemodul den entsprechenden Satz an; 0xFF ist eine normale Ansagephrase.

![Abb. 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

Zum Beispiel:

Wenn der Benutzer „好的，正在前进“ abspielen möchte, muss die Hauptsteuerung über IIC „0x04“ in das Ansageregister (0xD3) schreiben; das Sprachinteraktionsmodul sagt dann „好的，正在前进“ an.

![Abb. 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)



