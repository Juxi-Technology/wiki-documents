---
title: Download e flashing firmware cinese/inglese
description: "Il modulo viene di fabbrica con il firmware di riconoscimento vocale, fornito anche negli allegati. Se è necessario ricreare il firmware, seguire i passaggi seguenti."
---

# Download e flashing firmware cinese/inglese

> **[Acquista nel negozio](https://www.juxitech.com/it/products/ai-voice-recognition-module)**


> Il modulo viene di fabbrica con il firmware di riconoscimento vocale, fornito anche negli allegati. Se è necessario ricreare il firmware, seguire i passaggi seguenti.
>

## Accedere alla [piattaforma IA vocale Chipintelli](https://aiplatform.chipintelli.com/home/index.html)

#### Registrare un account sul sito ufficiale Chipintelli

#### Cliccare su « 平台功能 » nel menu in alto, scegliere « 产品固件及SDK深度开发 »

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### Cliccare su « 离线语音识别大模型应用 »

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### Cliccare su « 语音识别固件及SDK开发 »

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### Creare un nuovo progetto

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### Compilare le informazioni del prodotto

1. **Nome prodotto:** secondo le proprie regole di denominazione

2. **Schema applicativo:** scegliere « 单麦语音识别 » (riconoscimento vocale a singolo microfono)

3. **Tipo di prodotto:** « 通用-&gt;智能中控 » (generale – centralina intelligente)

4. **Modello chip:** Cl1302

5. **Nome SDK:** Cl13XX_SDK_ASR_Offline

6. **Versione SDK:** 1.12.16

7. **Descrizione:** secondo le proprie regole

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### Scegliere le informazioni del firmware

> Qui si può scegliere cinese o inglese
>

1. **Nome versione:** secondo le proprie regole

2. **Tipo di lingua:** in base alle proprie esigenze

3. **Scegliere il tipo acustico:**

    1. **Cinese:** VO0681_中文_ASR_通用_0.9M

    2. **Inglese:** VO0916_英文_ASR_通用_1.1M

4. **Scegliere la scheda modulo:** CI-D02GS02S

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### Configurazione del firmware

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### Scaricare il firmware delle parole di attivazione

1. Caricare – scegliere la tabella delle parole di attivazione nella lingua corrispondente

2. Cliccare su « 立即提交 » (invia subito)

3. Attendere qualche minuto e scaricare il firmware

4. Qui sono forniti due 命令詞播報詞協議列表 (elenco dei protocolli di annuncio); modificarli in base a questa tabella se necessario

    [命令詞播報詞協議列表V3_中文模板.xlsx]

    [命令詞播報詞協議列表V3_英文模板.xlsx]

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## Flashing del firmware del modulo vocale

#### Scaricare l'archivio del software di flashing

[Software di flashing firmware modulo vocale.7z]

1. Estrarre e aprire il software

> Scegliere « CI1302 » come firmware, cliccare su « 固件升级 » (aggiornamento firmware)
>

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. Collegare la scheda audio al PC, aprire il gestore dispositivi

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. Passare alla pagina del software di flashing

> Posizione del pulsante della scheda audio
>
> ![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
>

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### Dopo il flashing, passare agli altri tutorial a sinistra

#### Qui sono forniti file di firmware pronti da flashati direttamente

[CI1302_中文_单麦_V00681_UART0_115200_2M.bin]

[CI1302_英文_单麦_V00916_UART0_115200_2M.bin]




## Note

1. Installare il driver CH341 (come amministratore)

https://www.wch.cn/downloads/CH341SER_EXE.html

Se nel gestore dispositivi compare un dispositivo sconosciuto usb single serial o usb serial, disinstallarlo prima (tasto destro) e poi installare il driver!
