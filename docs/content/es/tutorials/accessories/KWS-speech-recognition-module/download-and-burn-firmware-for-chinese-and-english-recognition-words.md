---
title: Descarga y grabación de firmware chino/inglés
description: "El módulo viene de fábrica con el firmware de reconocimiento de voz; también se proporciona en los adjuntos. Si necesita recrear el firmware, siga los pasos siguientes."
---

# Descarga y grabación de firmware chino/inglés

> **[Comprar en la tienda](https://www.juxitech.com/es/products/ai-voice-recognition-module)**


> El módulo viene de fábrica con el firmware de reconocimiento de voz; también se proporciona en los adjuntos. Si necesita recrear el firmware, siga los pasos siguientes.
>

## Entrar en la [plataforma de IA de voz Chipintelli](https://aiplatform.chipintelli.com/home/index.html)

#### Registrar una cuenta en el sitio oficial de Chipintelli

#### Hacer clic en « 平台功能 » del menú superior, seleccionar « 产品固件及SDK深度开发 »

![Hacer clic en « 平台功能 » del menú superior, seleccionar « 产品固件及SDK深度开发 » – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### Hacer clic en « 离线语音识别大模型应用 »

![Hacer clic en « 平台功能 » del menú superior, seleccionar « 产品固件及SDK深度开发 » – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### Hacer clic en « 语音识别固件及SDK开发 »

![Hacer clic en « 语音识别固件及SDK开发 » – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### Crear un nuevo proyecto

![Hacer clic en « 语音识别固件及SDK开发 » – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### Rellenar la información del producto

1. **Nombre del producto:** según sus propias reglas de nombres

2. **Esquema de aplicación:** seleccionar « 单麦语音识别 » (reconocimiento de voz de un solo micrófono)

3. **Tipo de producto:** « 通用-&gt;智能中控 » (general – controlador inteligente)

4. **Modelo de chip:** Cl1302

5. **Nombre del SDK:** Cl13XX_SDK_ASR_Offline

6. **Versión del SDK:** 1.12.16

7. **Descripción:** según sus propias reglas

![Rellenar la información del producto – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### Seleccionar la información del firmware

> Aquí puede elegir chino o inglés
>

1. **Nombre de versión:** según sus propias reglas

2. **Tipo de idioma:** según su necesidad

3. **Seleccionar el tipo acústico:**

    1. **Chino:** VO0681_中文_ASR_通用_0.9M

    2. **Inglés:** VO0916_英文_ASR_通用_1.1M

4. **Seleccionar la placa del módulo:** CI-D02GS02S

![Rellenar la información del producto – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### Configuración del firmware

![Configuración del firmware – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### Descargar el firmware de palabras de activación

1. Subir – seleccionar la tabla de palabras de activación del idioma correspondiente

2. Hacer clic en « 立即提交 » (enviar de inmediato)

3. Esperar unos minutos y descargar el firmware

4. Aquí se proporcionan dos 命令詞播報詞協議列表 (lista de protocolos de anuncio); modifíquelos según esta tabla si lo necesita

    [命令詞播報詞協議列表V3_中文模板.xlsx]

    [命令詞播報詞協議列表V3_英文模板.xlsx]

![Configuración del firmware – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![Configuración del firmware – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## Grabar el firmware del módulo de voz

#### Descargar el paquete comprimido del software de grabación

[Software de grabación de firmware del módulo de voz.7z]

1. Descomprimir y abrir el software

> Seleccionar « CI1302 » como firmware, hacer clic en « 固件升级 » (actualización de firmware)
>

![Descargar el paquete comprimido del software de grabación – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. Conectar la tarjeta de sonido al PC, abrir el administrador de dispositivos

![Descargar el paquete comprimido del software de grabación – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![Descargar el paquete comprimido del software de grabación – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. Pasar a la página del software de grabación

> Posición del botón de la tarjeta de sonido
>
> ![Descargar el paquete comprimido del software de grabación – 4](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
>

![Descargar el paquete comprimido del software de grabación – 5](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### Tras terminar, pasar a los otros tutoriales de la izquierda

#### Aquí se proporcionan archivos de firmware listos para grabar

[CI1302_中文_单麦_V00681_UART0_115200_2M.bin]

[CI1302_英文_单麦_V00916_UART0_115200_2M.bin]




## Notas

1. Instalar el controlador CH341 (como administrador)

https://www.wch.cn/downloads/CH341SER_EXE.html

Si en el administrador de dispositivos aparece un dispositivo desconocido usb single serial o usb serial, desinstálelo primero (clic derecho) y luego instale el controlador.
