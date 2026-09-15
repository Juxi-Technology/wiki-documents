---
title: "Arduino: análise de posição"
description: "Nesta lição, vamos aprender principalmente a utilizar o arduino e o módulo GPS para implementar a função de a…"
---

# Arduino: análise de posição

**1. Objetivos de aprendizagem**

Nesta lição, vamos aprender principalmente a utilizar o arduino e o módulo GPS para implementar a função de analisar e imprimir informações de posição.

**2. Preparação prévia**

O módulo GPS utiliza comunicação UART e USB; aqui utilizamos a porta UART do arduino UNO para ler as informações, ligando o TX do módulo ao pino D0 da placa arduino UNO. O VCC e o GND são ligados a 5V e GND, respetivamente.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/1.png)

**3.** **Programa**

Inicializar a porta série.

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/2.jpg) 

Ler os dados da porta série.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/3.jpg) 

Analisar os dados da porta série.

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/4.jpg) 

Imprimir as informações de posição após a análise.

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/5.jpg) 

**4. Compilar e carregar o programa**

4.1 Temos de utilizar o software Arduino IDE para abrir o ficheiro, depois clicar no “√” na barra de menus para compilar o programa e aguardar até aparecer “Compilação bem-sucedida” no canto inferior esquerdo.

 ![Imagem 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/6.jpg)

4.2 Na barra de menus do Arduino IDE, temos de selecionar 【Ferramentas】---【Porta】---selecionar o número da porta que acabou de aparecer no Gestor de Dispositivos, como mostra a figura abaixo.

![Imagem 7](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/7.jpg) 

4.3 Depois de concluir a seleção, clique em “→” na barra de menus para carregar o código para a placa UNO. Quando aparecer “Carregamento concluído” no canto inferior esquerdo, significa que o programa foi carregado com sucesso para a placa UNO, como mostra a figura abaixo.

![Imagem 8](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/8.jpg) 

 

**5. Fenómeno da experiência**

Após o módulo ser alimentado, são necessários cerca de 32s para arrancar; depois disso, a luz de estado da porta série no módulo continuará a piscar, momento em que os dados podem ser recebidos normalmente.

Depois de descarregar o programa, execute-o, abra a janela de monitor série, abra o software de porta série e defina a velocidade de transmissão como 9600; a porta série imprimirá ciclicamente as informações de posição em tempo real já analisadas.

![Imagem 9](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/9.jpg) 

Atenção: a antena do módulo tem de estar no exterior, caso contrário poderá não conseguir procurar o sinal de GPS.

<RelatedProducts slugs="gps-beidou-module" />
