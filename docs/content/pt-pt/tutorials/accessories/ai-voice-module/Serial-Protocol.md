---
title: "Protocolo de porta série"
description: "Abra o ficheiro lista de protocolos de palavras de comando / palavras de reprodução V1中文 nos anexos; consegue…"
---

# Protocolo de porta série

Abra o ficheiro lista de protocolos de palavras de comando / palavras de reprodução V1_中文 nos anexos; consegue ver o protocolo de envio e o protocolo de receção,

## 1. Análise de entradas funcionais

De acordo com o ficheiro, é possível ver os protocolos de envio e de receção de 10 entradas funcionais,

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

Podemos distinguir as entradas funcionais analisando o terceiro byte do protocolo

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Entre eles, o primeiro e o segundo bytes (EF EF) representam o cabeçalho da trama, o terceiro byte representa o ID da palavra de função, o quarto byte representa o ID da palavra de comando e o quinto byte (EE) representa o fim da trama

## 2. Entradas de palavra de comando

Um exemplo de entrada de palavra de comando é apresentado abaixo; o quarto byte da palavra de comando representa o ID

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Exemplo:

Por exemplo, se dissermos 小车停止 ao módulo, o módulo envia os cinco bytes FE EF 00 01 EE através da porta série; podemos obter este conjunto de dados através da função de serviço de porta série do controlador anfitrião e, em seguida, analisar o quarto byte para obter ID:01, e nessa altura sabemos que se trata de 小车停止.

## 3. Entradas de frase de reprodução

As entradas de frase de reprodução não são reproduzidas ativamente; é necessário que o controlador anfitrião envie um comando através da porta série para que a reprodução ocorra (as frases de reprodução das entradas de palavra de comando também podem ser reproduzidas).

![Imagem 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Entre eles, o primeiro e o segundo bytes (FE EF) representam o cabeçalho da trama, o terceiro byte representa a função de reprodução FF, o quarto byte representa o ID do conteúdo a reproduzir e o quinto byte (EE) representa o fim da trama

Exemplo:

Quando precisamos de reproduzir “初始化完成”, o controlador anfitrião tem de enviar FE EF FF 67 EE ao módulo de interação por voz através da porta série; depois de o envio estar concluído, o módulo de interação por voz pode reproduzir “初始化完成”

![Imagem 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

<RelatedProducts slugs="ai-voice-module" />
