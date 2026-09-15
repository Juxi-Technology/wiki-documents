---
title: "STM32F103: saída de análise GPS"
description: "Nesta lição, vamos aprender principalmente a usar o STM32F103C8T6 e o módulo GPS para implementar a função de…"
---

# STM32F103: saída de análise GPS

**1. Objetivos de aprendizagem**

Nesta lição, vamos aprender principalmente a usar o STM32F103C8T6 e o módulo GPS para implementar a função de análise e saída de informações de posição.

**2. Preparação prévia**

O módulo GPS utiliza comunicação UART e USB; aqui usamos a porta UART do STM32 para ler as informações, conectando o TXD do módulo ao pino PA10 da placa STM32F103C8T6. O VCC e o GND são conectados a 5V e GND do STM32F103C8T6, respectivamente; o GND e o RXD do módulo TTL são conectados ao GND e ao PA9 do STM32, respectivamente.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/1.png)

**3.** **Programa**

A taxa de transmissão do módulo é 9600.

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/2.jpg) 

Ler e analisar os dados recebidos.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/3.jpg) 

Converter a unidade das informações de latitude e longitude em graus

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/4.jpg) 

Imprimir os dados recebidos através da porta serial.

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/5.jpg) 

Atenção: na verdade, o valor do sistema de coordenadas do posicionamento GPS/BeiDou não é uma simples relação de 100 vezes, mas requer uma conversão de graus, minutos e segundos. Assim, os valores de coordenadas GPS/BeiDou que obtemos, como latitude norte 2429.53531 e longitude leste 11810.78036, precisam do seguinte cálculo: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267. Além disso, diferentes microcontroladores podem apresentar certo erro devido a problemas de precisão na conversão de dados.

**4. Fenómeno do experimento**

Após o módulo ser energizado, ele leva cerca de 32s para iniciar; depois disso, a luz de status da porta serial no módulo continuará piscando, momento em que os dados podem ser recebidos normalmente.

Após baixar o programa, execute-o, abra o software de porta serial e defina a taxa de transmissão como 9600; a porta serial imprimirá ciclicamente as informações de posição atuais.

![Imagem 6](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/6.jpg) 

Atenção: a antena do módulo precisa estar em ambiente externo, caso contrário pode não conseguir buscar o sinal de GPS.

<RelatedProducts slugs="gps-beidou-module" />
