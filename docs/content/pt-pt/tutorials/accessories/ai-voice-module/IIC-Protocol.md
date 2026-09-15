---
title: "Protocolo IIC"
description: "Nota: o dispositivo anfitrião e o módulo de interação por voz podem ter fontes de alimentação diferentes, mas…"
---

# Protocolo IIC

Nota: o dispositivo anfitrião e o módulo de interação por voz podem ter fontes de alimentação diferentes, mas, ao ligá-los, é obrigatório que partilhem a mesma terra, para se obter um nível de comunicação estável

## 1. O módulo de interação por voz como escravo

Receber e analisar o sinal enviado pelo anfitrião:

Aguardar a interrupção do sinal IIC; se forem recebidos dados no IIC, chamar a função correspondente de acordo com a informação de endereço de registo recebida via IIC.

Processamento dos dados e feedback:

Quando o módulo de interação por voz recebe um comando de leitura de registo, tem de chamar a função de envio correspondente para enviar os dados reconhecidos ao dispositivo anfitrião.

## 2. Endereço do dispositivo IIC e funções dos registos

O endereço do dispositivo escravo IIC do módulo de interação por voz é 0x2A.

## 3. Obter entradas de palavras de comando.

Abra o ficheiro lista de protocolos de palavras de comando / palavras de reprodução V1_中文 nos anexos; consegue ver que o protocolo de comunicação começa por 0xFE, 0xED e termina em 0xEE, com 2 bytes no meio que são, respetivamente, o tipo de função e o número de ID.

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

Quando o módulo de interação por voz reconhece a palavra de comando “停车”, responde “好的，已停止”; o controlador anfitrião pode ler um byte de dados, 0x02, no registo de resultado do reconhecimento (0xDA); esses dados são iguais ao 4.º byte do protocolo de envio de “停车”.

![Imagem 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4. Entradas de frase de reprodução

As entradas de frase de reprodução não são reproduzidas ativamente; é necessário que o controlador anfitrião as defina via IIC para que a reprodução ocorra (as frases de reprodução das entradas de palavra de comando também podem ser reproduzidas).

O controlador anfitrião escreve, via IIC, um byte no endereço do registo de reprodução (0xD1); esse byte é o número de ID da palavra de comando, e o módulo de reprodução de voz reproduz a frase correspondente; 0xFF é a frase de reprodução comum.

![Imagem 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

Por exemplo:

Quando o utilizador precisa de reproduzir “这是红色”, o controlador anfitrião tem de escrever “0x5F” no registo de reprodução (0xD1) via IIC, e o módulo de interação por voz reproduz “这是红色”.

![Imagem 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5. Entradas de reprodução de palavras de função

As entradas de palavras de função podem ser reproduzidas quando é reconhecida uma palavra de comando, ou também podem ser reproduzidas escrevendo um byte específico via IIC.

O controlador anfitrião escreve, via IIC, um byte no endereço do registo de reprodução (0xD2); esse byte é o número de ID da palavra de comando, e o módulo de reprodução de voz reproduz a frase correspondente; 0xFF é a frase de reprodução comum.

![Imagem 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

Por exemplo:

Quando o utilizador precisa de reproduzir “这是红色”, o controlador anfitrião tem de escrever “0x01” no registo de reprodução (0xD2) via IIC, e o módulo de interação por voz reproduz “欢迎使用小犀”.

![Imagem 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5. Entradas de reprodução de palavras de comando

As entradas de palavras de comando podem ser reproduzidas quando é reconhecida uma palavra de comando, ou também podem ser reproduzidas escrevendo um byte específico via IIC.

O controlador anfitrião escreve, via IIC, um byte no endereço do registo de reprodução (0xD3); esse byte é o número de ID da palavra de comando, e o módulo de reprodução de voz reproduz a frase correspondente; 0xFF é a frase de reprodução comum.

![Imagem 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

Por exemplo:

Quando o utilizador precisa de reproduzir “好的，正在前进”, o controlador anfitrião tem de escrever “0x04” no registo de reprodução (0xD3) via IIC, e o módulo de interação por voz reproduz “好的，正在前进”.

![Imagem 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)



