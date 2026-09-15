---
title: "51 MCU: análise GPS"
description: "Nesta lição, vamos aprender principalmente a utilizar o microcontrolador 51 do modelo STC89C52RC e o módulo G…"
---

# 51 MCU: análise GPS

**1. Objetivos de aprendizagem**

Nesta lição, vamos aprender principalmente a utilizar o microcontrolador 51 do modelo STC89C52RC e o módulo GPS para implementar a função de análise de informações de posição.

**2. Preparação prévia**

O módulo GPS utiliza comunicação UART e USB; aqui utilizamos a porta UART do C51 para ler as informações, ligando o TX do módulo ao pino P3.0 da placa 51. O VCC e o GND são ligados a 5V e GND, respetivamente.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Programa**

Inicializar a porta série e a matriz de dados

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Ler e analisar os dados recebidos.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Imprimir os dados recebidos através da porta série.

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Fenómeno da experiência**

Após o módulo ser alimentado, são necessários cerca de 32s para arrancar; depois disso, a luz de estado da porta série no módulo continuará a piscar, momento em que os dados podem ser recebidos normalmente.

Depois de descarregar o programa, execute-o, abra o software de porta série e defina a velocidade de transmissão como 9600; a porta série imprimirá ciclicamente as informações de posição atuais.

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Atenção: a antena do módulo tem de estar no exterior, caso contrário poderá não conseguir procurar o sinal de GPS.

<RelatedProducts slugs="gps-beidou-module" />
