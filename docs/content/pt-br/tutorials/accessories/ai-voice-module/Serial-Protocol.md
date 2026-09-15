---
title: "Protocolo da porta serial"
description: "Abra o arquivo 命令词播报词协议列表V1中文 nos anexos; você verá o protocolo de envio e o protocolo de recebimento,"
---

# Protocolo da porta serial

Abra o arquivo 命令词播报词协议列表V1_中文 nos anexos; você verá o protocolo de envio e o protocolo de recebimento,

## 1.Análise das entradas funcionais

Conforme o arquivo, é possível ver os protocolos de envio e recebimento das 10 entradas funcionais,

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

As entradas funcionais podem ser distinguidas pela análise do terceiro byte do protocolo

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Neles, o primeiro e o segundo bytes (EF EF) representam o cabeçalho do quadro, o terceiro byte representa o ID da palavra de função, o quarto byte representa o ID da palavra de comando e o quinto byte (EE) representa o final do quadro

## 2.Entradas de palavras de comando

Veja abaixo um exemplo de entrada de palavra de comando; o quarto byte da palavra de comando representa o ID

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Exemplo:

Por exemplo, se dissermos 小车停止 ao módulo, o módulo enviará cinco bytes pela porta serial: FE EF 00 01 EE. Podemos obter esse conjunto de dados pela função de serviço da porta serial do controlador host e, em seguida, ao analisar o quarto byte, obtemos ID:01, e assim sabemos que agora é 小车停止.

## 3.Entradas de frases de reprodução

As entradas de frases de reprodução não são reproduzidas ativamente; é preciso que o controlador host envie o comando pela porta serial para que a reprodução ocorra (a frase de reprodução de uma entrada de palavra de comando também pode ser reproduzida).

![Imagem 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Neles, o primeiro e o segundo bytes (FE EF) representam o cabeçalho do quadro, o terceiro byte representa a função de reprodução FF, o quarto byte representa o ID do conteúdo a ser reproduzido e o quinto byte (EE) representa o final do quadro

Exemplo:

Quando precisamos reproduzir “初始化完成”, o controlador host deve enviar FE EF FF 67 EE pela porta serial ao módulo de interação por voz; após o envio, o módulo de interação por voz reproduz “初始化完成”

![Imagem 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

