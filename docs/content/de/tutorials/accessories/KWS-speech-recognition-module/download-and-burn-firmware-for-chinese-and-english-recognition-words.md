---
title: "Firmware für Wake-Wörter herunterladen und flashen"
description: "Das Modul ist ab Werk mit der Spracherkennungs-Firmware geflasht; die Werks-Firmware liegt auch in den Anhängen vor. Wenn die Firmware neu erstellt werden muss, folgen Sie diesen Schritten."
---

# Firmware für Wake-Wörter herunterladen und flashen

> **[Im Shop kaufen](https://www.juxitech.com/de/products/ai-voice-recognition-module)**


> Das Modul ist ab Werk mit der Spracherkennungs-Firmware geflasht; die Werks-Firmware liegt auch in den Anhängen vor. Wenn die Firmware neu erstellt werden muss, folgen Sie diesen Schritten.
>

## [Chipintelli-Sprach-KI-Plattform](https://aiplatform.chipintelli.com/home/index.html) aufrufen

#### Konto auf der Chipintelli-Website registrieren

#### Im oberen Menü „平台功能" (Plattformfunktionen) anklicken, „产品固件及SDK深度开发" (Firmware & SDK-Entwicklung) wählen

![Im oberen Menü „平台功能" Plattformfunktionen anklicken, „产品固件及SDK深度开发" Firmware & SDK-Entwicklung wählen – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### „离线语音识别大模型应用" (Offline-Spracherkennungs-Großmodell) anklicken

![Im oberen Menü „平台功能" Plattformfunktionen anklicken, „产品固件及SDK深度开发" Firmware & SDK-Entwicklung wählen – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### „语音识别固件及SDK开发" (Spracherkennungs-Firmware & SDK-Entwicklung) anklicken

![„语音识别固件及SDK开发" Spracherkennungs-Firmware & SDK-Entwicklung anklicken – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### Neues Projekt erstellen

![„语音识别固件及SDK开发" Spracherkennungs-Firmware & SDK-Entwicklung anklicken – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### Produktinformationen ausfüllen

1. **Produktname:** nach eigener Namensregel

2. **Anwendungsschema:** „单麦语音识别" (Einzelmikrofon-Spracherkennung) wählen

3. **Produkttyp:** „通用-&gt;智能中控" (Allgemein – Smart-Zentrale)

4. **Chip-Modell:** Cl1302

5. **SDK-Name:** Cl13XX_SDK_ASR_Offline

6. **SDK-Version:** 1.12.16

7. **Beschreibung:** nach eigener Beschreibungsregel

![Produktinformationen ausfüllen – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### Firmware-Informationen wählen

> Hier kann Chinesisch oder Englisch gewählt werden
>

1. **Versionsname:** nach eigener Versionsregel

2. **Sprachtyp:** nach Bedarf wählen

3. **Akustiktyp wählen:**

    1. **Chinesisch wählen:** VO0681_中文_ASR_通用_0.9M

    2. **Englisch wählen:** VO0916_英文_ASR_通用_1.1M

4. **Modulboard wählen:** CI-D02GS02S

![Produktinformationen ausfüllen – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### Firmware-Konfiguration

![Firmware-Konfiguration – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### Wake-Wort-Firmware herunterladen

1. Hochladen – die Wake-Wort-Tabelle der entsprechenden Sprache wählen

2. „立即提交" (Sofort absenden) anklicken

3. Ein paar Minuten warten, dann lässt sich die Firmware herunterladen

4. Hier liegen zwei 命令詞播報詞協議列表 (Befehlswort-Ansageprotokollliste) bei; bei Bedarf anhand dieser Tabelle anpassen

    命令詞播報詞協議列表V3_中文模板.xlsx

    命令詞播報詞協議列表V3_英文模板.xlsx

![Firmware-Konfiguration – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![Firmware-Konfiguration – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## Firmware auf das Sprachmodul flashen

#### Komprimiertes Paket der Flash-Software herunterladen

Sprachmodul-Firmware-Flash-Software.7z

1. Entpacken und Software öffnen

> Firmware „CI1302" wählen, „固件升级" (Firmware-Upgrade) anklicken
>

![Komprimiertes Paket der Flash-Software herunterladen – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. Soundkarte an den PC anschließen, Geräte-Manager öffnen

![Komprimiertes Paket der Flash-Software herunterladen – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![Komprimiertes Paket der Flash-Software herunterladen – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. Zur Flash-Software-Seite wechseln

> Tastenposition der Soundkarte
>
> ![Komprimiertes Paket der Flash-Software herunterladen – 4](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
>

![Komprimiertes Paket der Flash-Software herunterladen – 5](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### Nach dem Abschluss zu den anderen Tutorials auf der linken Seite wechseln

#### Hier liegen vorbereitete Firmware-Dateien, die direkt geflasht werden können

CI1302_中文_单麦_V00681_UART0_115200_2M.bin

CI1302_英文_单麦_V00916_UART0_115200_2M.bin




## Hinweise

1. CH341-Treiber installieren (als Administrator)

https://www.wch.cn/downloads/CH341SER_EXE.html

Wird im Geräte-Manager ein unbekanntes Gerät usb single serial oder usb serial erkannt, zuerst per Rechtsklick deinstallieren und dann den Treiber installieren!
