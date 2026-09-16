---
title: "Download e Gravação de Firmware de Palavras de Ativação"
description: "O módulo já vem gravado de fábrica com o firmware de reconhecimento de voz, e o firmware de fábrica também é fornecido nos materiais anexo"
---

# Download e Gravação de Firmware de Palavras de Ativação

> **[Comprar na loja](https://www.juxitech.com/products/ai-voice-recognition-module)**


> O módulo já vem gravado de fábrica com o firmware de reconhecimento de voz, e o firmware de fábrica também é fornecido nos materiais anexos. Se você precisar recriar o firmware, pode seguir os passos abaixo para gerá-lo. 
> 
> 

## Entrar na [Plataforma de IA de voz Qiying Tairen](https://aiplatform.chipintelli.com/home/index.html)

#### Cadastrar uma conta no site oficial da Qiying Tailun

#### Clique no menu superior "Plataforma de Funcionalidades" e selecione "Desenvolvimento aprofundado de firmware de produto e SDK"

![Clique no menu superior "Plataforma de Funcionalidades" e selecione "Desenvolvimento aprofundado de firmware de produto e SDK" – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### Clique em "Aplicação de modelo de grande porte de reconhecimento de voz offline"

![Clique no menu superior "Plataforma de Funcionalidades" e selecione "Desenvolvimento aprofundado de firmware de produto e SDK" – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### Clique em "Desenvolvimento de firmware de reconhecimento de voz e SDK"

![Clique em "Desenvolvimento de firmware de reconhecimento de voz e SDK" – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### Novo projeto

![Clique em "Desenvolvimento de firmware de reconhecimento de voz e SDK" – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### Preenchimento das informações do produto

1. **Nome do produto:** siga suas próprias regras de nomenclatura

2. **Solução da aplicação:** selecione "Reconhecimento de voz com microfone único"

3. **Tipo de produto:** "Geral -\> Controle central inteligente"

4. **Modelo do chip:** Cl1302

5. **Nome do SDK:** Cl13XX_SDK_ASR_Offline

6. **Versão do SDK:** 1.12.16

7. **Descrição:** siga suas próprias regras de descrição

![Preenchimento das informações do produto – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### Seleção das informações do firmware

> Aqui você pode escolher chinês ou inglês
> 
> 

1. **Nome da versão:** siga suas próprias regras de versionamento

2. **Tipo de idioma:** selecione de acordo com sua necessidade

3. **Selecionar o tipo acústico:**

    1. **Seleção em chinês:** VO0681_Chinese_ASR_General_0.9M

    2. **Seleção em inglês:** VO0916_English_ASR_General_1.1M

4. **Seleção da placa do módulo:** CI-D02GS02S

![Preenchimento das informações do produto – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### Configuração do firmware

![Configuração do firmware – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### Descarregar o firmware de palavras de ativação

1. Enviar - Selecione a tabela de palavras de ativação do idioma correspondente

2. Clique em "Enviar agora"

3. Aguarde alguns minutos para o download do firmware

4. Duas listas de protocolos de palavras de comando e transmissão são fornecidas aqui. Quem precisar pode fazer alterações de acordo com esta tabela. 

    命令词播报词协议列表V3_中文模板.xlsx

    命令词播报词协议列表V3_英文模板.xlsx

![Configuração do firmware – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![Configuração do firmware – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## Gravação do firmware do módulo de voz

#### Descarregar o pacote compactado do software de gravação do módulo de voz

语音模块固件烧录软件.7z

1. Abra o software após a descompactação

> Selecione "CI1302" para o firmware e clique em "Atualização de firmware" 
> 
> 

![Descarregar o pacote compactado do software de gravação do módulo de voz – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. Conecte a placa de som ao computador e abra o Gerenciador de Dispositivos

![Descarregar o pacote compactado do software de gravação do módulo de voz – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![Descarregar o pacote compactado do software de gravação do módulo de voz – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. Vá para a página do software de gravação de firmware

> Posição do botão da placa de som
> 
> ![Descarregar o pacote compactado do software de gravação do módulo de voz – 4](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
> 
> 

![Descarregar o pacote compactado do software de gravação do módulo de voz – 5](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### Após a conclusão, você pode ir para os outros tutoriais correspondentes à esquerda

#### Aqui estão os materiais de firmware preparados, que podem ser gravados diretamente

CI1302_中文_单麦_V00681_UART0_115200_2M.bin

CI1302_英文_单麦_V00916_UART0_115200_2M.bin





## Precauções

1. Instalação do driver CH341 (instalar como administrador)

https://www.wch.cn/downloads/CH341SER_EXE.html

Se o dispositivo for reconhecido como dispositivo desconhecido, como "USB Single Serial" ou "USB Serial", no Gerenciador de Dispositivos, clique com o botão direito para desinstalar primeiro e depois instale o driver! 



