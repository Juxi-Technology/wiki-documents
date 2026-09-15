---
title: "51 MCU: análise GPS"
description: "Análise GPS com o microcontrolador 51 (STC89C52RC) e o módulo GPS e BeiDou ATGM336H-5N — ler os dados pela UART e imprimir as informações de posição."
---

# 51 MCU: análise GPS

**1. Objetivos de aprendizagem**

Nesta lição, vamos aprender principalmente a usar o microcontrolador 51 do modelo STC89C52RC e o módulo GPS para implementar a função de análise de informações de posição.

**2. Preparação prévia**

O módulo GPS utiliza comunicação UART e USB; aqui usamos a porta UART do C51 para ler as informações, conectando o TX do módulo ao pino P3.0 da placa 51. O VCC e o GND são conectados a 5V e GND, respectivamente.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Programa**

Inicializar a porta serial e o array de dados

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Ler e analisar os dados recebidos.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Imprimir os dados recebidos através da porta serial.

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Fenómeno do experimento**

Após o módulo ser energizado, ele leva cerca de 32s para iniciar; depois disso, a luz de status da porta serial no módulo continuará piscando, momento em que os dados podem ser recebidos normalmente.

Após baixar o programa, execute-o, abra o software de porta serial e defina a taxa de transmissão como 9600; a porta serial imprimirá ciclicamente as informações de posição atuais.

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Atenção: a antena do módulo precisa estar em ambiente externo, caso contrário pode não conseguir buscar o sinal de GPS.

<RelatedProducts slugs="gps-beidou-module" />
