---
title: "Benutzerdefinierte Protokolleinträge erstellen"
description: "Das Modul wird ab Werk bereits mit der Firmware für die Spracherkennungsfunktion geflasht; im Datenpaket ist …"
---

# Benutzerdefinierte Protokolleinträge erstellen

## 1. Erstellen der Sprachchip-Firmware

## 1.1 Hinweise

Das Modul wird ab Werk bereits mit der Firmware für die Spracherkennungsfunktion geflasht; im Datenpaket ist die Werk-Firmware ebenfalls enthalten. Wenn Sie die Firmware neu erstellen möchten, können Sie gemäß den folgenden Schritten vorgehen.

## 1.2 Firmware erstellen

Öffnen Sie zunächst den Link „[启英泰伦语音AI平台](https://aiplatform.chipintelli.com/)“, um die offizielle Website für die Firmware-Erstellung aufzurufen. Klicken Sie dann in der Menüleiste auf „功能开发“ und danach unter der Spalte Produktentwicklung auf „离线语音识别大模型应用“.

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

Zu diesem Zeitpunkt werden Sie aufgefordert, sich anzumelden. Registrieren Sie dazu mit Ihren eigenen Daten ein Plattformkonto; für dieses Tutorial wurde bereits im Voraus ein Konto registriert. Klicken Sie nach der Anmeldung erneut auf „语音识别固件及SDK开发“.

![Abb. 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

Nachdem die Seite gewechselt hat, klicken Sie links auf „Neues Projekt“ und erstellen Sie gemäß der folgenden Abbildung ein Produkt. Produktname und Beschreibung können Sie frei festlegen; die übrigen Angaben wählen Sie entsprechend den rot umrahmten Inhalten. Als Produkttyp wählen Sie „通用->智能中控“. Klicken Sie anschließend auf „Erstellen“.

![Abb. 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

Als Nächstes müssen Sie die Basisinformationen des Projekts ausfüllen. Da wir Chinesisch erkennen möchten, wählen Sie als Sprachtyp „中文“; wenn Englisch erkannt werden soll, können Sie dies entsprechend ändern. Die übrigen Angaben wählen Sie gemäß der folgenden Abbildung. Klicken Sie zum Abschluss auf „继续“.

![Abb. 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

Anschließend muss die Firmware konfiguriert werden. Wir erläutern hier nur die Teile, die geändert werden müssen: Schalten Sie die Echounterdrückung der Algorithmusparameter ein.

![Abb. 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

Bei den Hardwareparametern müssen Sie als Quarzoszillator-Quelle „内部 RC“ auswählen.

![Abb. 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

Konfigurieren Sie in der Konfiguration der Debug-Schnittstelle das UART0-Pegel als Open-Drain-Funktion mit Unterstützung für einen externen 5V-Pull-up.

![Abb. 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

Nehmen Sie Änderungen an der Konfiguration der Kommunikationsschnittstelle vor: Stellen Sie die Baudrate auf 115200 ein und konfigurieren Sie das UART1-Pegel als Open-Drain-Funktion mit Unterstützung für einen externen 5V-Pull-up. Klicken Sie nach Abschluss der Konfiguration auf „继续“, um zum nächsten Schritt zu gelangen.

![Abb. 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

Nun gelangen Sie zur Funktion zum Bearbeiten der Befehlswörter. Zuerst müssen Sie die abzuspielende Stimme auswählen; hier wählen wir „小蝶-清新女声 Ver.3“.

![Abb. 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

Als Nächstes laden wir den Anhang mit den Befehlswörtern hoch. Suchen Sie die Tabelle „命令词播报词协议列表V1_中文“ im selben Verzeichnis wie dieses Dokument und ziehen Sie sie direkt zum Hochladen in die Webseite.

![Abb. 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

Nach dem Hochladen der Datei sehen Sie die Befehlswortdaten in der Tabelle darunter.

![Abb. 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

Aktivieren Sie die Selbstlernfunktion und wählen Sie „Festgelegtes Lernen“. Das System erzeugt dann automatisch 4 Selbstlernanweisungen; diese ändern wir hier nicht.

![Abb. 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

Nach dem Absenden dauert es einige Minuten, bis die Firmware-Erstellung abgeschlossen ist. Klicken Sie danach auf Firmware herunterladen, um die erstellte Firmware zu erhalten.

![Abb. 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

Die Schritte zum Flashen der Firmware finden Sie unter „[Flashen der Modul-Firmware](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)“.

## 2. Funktionale Einträge ändern

Öffnen Sie die Datei 命令词播报词协议列表V1_中文 im Anhang.

![Abb. 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

Suchen Sie die funktionalen Einträge in der Tabelle, also die ersten 10 Einträge. Beachten Sie, dass diese ersten 10 funktionalen Einträge feste Einträge sind: Sie können keine neuen hinzufügen, sondern nur vorhandene ändern.

![Abb. 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

Als Beispiel ändern wir hier die Ansagephrase des Weckworts: Die ursprüngliche Ansage „在的“ nach dem Erkennen von „你好，小犀“ ändern wir in die Ansage „我在“.

![Abb. 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

Speichern Sie nach der Änderung und importieren Sie die Tabelle anschließend gemäß den Schritten in „1.2 Firmware erstellen“ in die Webseite. Wenn Sie bereits einmal eine Firmware erstellt haben, können Sie in dem früheren Projekt auf die Schaltfläche „继承“ klicken; dadurch entfallen die Schritte der Parameterkonfiguration.

![Abb. 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

Nachdem die Firmware neu erstellt wurde, müssen Sie sie noch auf das Sprachinteraktionsmodul flashen. So können Sie funktionale Einträge ändern.

## 3. Neue Befehlswörter hinzufügen

Öffnen Sie die Datei 命令词播报词协议列表V1_中文 im Anhang.

![Abb. 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

Fügen Sie am Ende der Tabelle einen neuen Befehlswort-Eintrag hinzu; hier nehmen wir als Beispiel das Hinzufügen des Befehlsworts „打扫房间“.

![Abb. 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

Hier müssen Sie als Funktionstyp „命令词“ auswählen und den Ansagemodus auf „主“ setzen; nur so wird nach dem Erkennen von „打扫房间“ aktiv „好的“ angesagt.

![Abb. 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

Sehen wir uns nun das Sendeprotokoll an. Das 1. und das 2. Byte der Daten sind der Datenrahmenkopf und müssen nicht geändert werden. Wenn wir als Funktionstyp „命令词“ gewählt haben, muss das 3. Byte gemäß dem Sendeprotokoll „00“ sein; dies dient dazu, zu unterscheiden, ob die Anweisung ein „命令词“ oder eine „播报语“ ist.

![Abb. 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

Das 4. Byte der Daten ist dann die Daten-ID des Befehlsworts. Dies ist ein Hexadezimalwert: Da die ID des vorherigen Befehlsworts „8B“ ist, müssen wir dieses Byte auf „8C“ setzen. In besonderen Fällen kann die Daten-ID auch gleich sein, zum Beispiel wenn die zurückgegebenen Ergebnisse der beiden folgenden Befehlswörter identisch sind.

![Abb. 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

Das 5. Byte im Protokoll ist fest auf „EE“ gesetzt und muss ebenfalls nicht geändert werden. In der Tabelle müssen Sende- und Empfangsprotokoll übereinstimmen.

![Abb. 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

Speichern Sie nach der Änderung und importieren Sie die Tabelle anschließend gemäß den Schritten in „1.2 Firmware erstellen“ in die Webseite. Wenn Sie bereits einmal eine Firmware erstellt haben, können Sie in dem früheren Projekt auf die Schaltfläche „继承“ klicken; dadurch entfallen die Schritte der Parameterkonfiguration

![Abb. 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

Nachdem die Firmware neu erstellt wurde, müssen Sie sie noch auf das Sprachinteraktionsmodul flashen. So können Sie neue Befehlswörter hinzufügen.

## 4. Neue Ansagephrasen hinzufügen

Öffnen Sie die Datei 命令词播报词协议列表V1_中文 im Anhang.

![Abb. 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

Fügen Sie am Ende der Tabelle einen neuen Befehlswort-Eintrag hinzu; hier nehmen wir als Beispiel das Hinzufügen der Ansagephrase „现在是晚上“.

![Abb. 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

Hier müssen Sie als Funktionstyp „播报语“ auswählen und den Ansagemodus auf „被“ setzen.

![Abb. 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

Sehen wir uns nun das Sendeprotokoll an. Das 1. und das 2. Byte der Daten sind der Datenrahmenkopf und müssen nicht geändert werden. Wenn wir als Funktionstyp „播报语“ gewählt haben, muss das 3. Byte gemäß dem Sendeprotokoll „FF“ sein; dies dient dazu, die Anweisung als „播报语“ zu kennzeichnen.

![Abb. 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

Das 4. Byte der Daten ist dann die Daten-ID des Befehlsworts. Dies ist ein Hexadezimalwert: Da die ID der vorherigen Ansagephrase „8B“ ist, müssen wir dieses Byte auf „8C“ setzen.

Das 5. Byte im Protokoll ist fest auf „EE“ gesetzt und muss ebenfalls nicht geändert werden. In der Tabelle müssen Sende- und Empfangsprotokoll übereinstimmen.

![Abb. 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

Speichern Sie nach der Änderung und importieren Sie die Tabelle anschließend gemäß den Schritten in „1.2 Firmware erstellen“ in die Webseite. Wenn Sie bereits einmal eine Firmware erstellt haben, können Sie in dem früheren Projekt auf die Schaltfläche „继承“ klicken; dadurch entfallen die Schritte der Parameterkonfiguration.

![Abb. 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

Nachdem die Firmware neu erstellt wurde, müssen Sie sie noch auf das Sprachinteraktionsmodul flashen. So können Sie neue Befehlswörter hinzufügen.

<RelatedProducts slugs="ai-voice-module" />
