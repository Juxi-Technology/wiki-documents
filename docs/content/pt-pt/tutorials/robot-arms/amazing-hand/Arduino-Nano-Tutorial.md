---
title: "Tutorial de utilização do Arduino Nano"
description: "Executar o «02 programa de demonstração» do AmazingHand com um Arduino Nano (328P) e a placa de acionamento dos servos: ligação, instalação de bibliotecas, compilação, upload e resultado da execução."
---

# Tutorial de utilização do Arduino Nano

## Método de ligação (placa de acionamento dos servos + placa Nano)

**Preste atenção à posição dos pinos da placa Nano (ou seja, a placa de desenvolvimento 328P)!**

![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

A seguir, descreve-se o processo de depuração com o microcontrolador. O próprio microcontrolador executa continuamente o programa de demonstração em loop; basta desconectar o cabo de dados para o interromper.

## Executar o «02 programa de demonstração»

1. Instale o Arduino IDE por conta própria.

2. Consoante seja **mão esquerda ou mão direita**, abra o ficheiro `.ino` correspondente.

   ![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Antes de compilar e enviar o programa Arduino para a placa Nano, instale a **biblioteca FTServo** e a **biblioteca SCServo** no Gestor de Bibliotecas.

   ![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Selecione o tipo de placa «**Arduino Nano**».

   ![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. Compile e faça o upload.

> **Atenção:** neste momento, o computador está ligado apenas à placa Nano; a placa Nano não deve estar ligada à placa de acionamento dos servos (ou seja, não deve estar ligada à mão hábil).

Após o upload ser bem-sucedido, ligue a placa Nano à placa de acionamento dos servos com três cabos jumper, e os servos à placa de acionamento dos servos; consulte o [método de ligação durante a depuração da placa MEGA328P Nano](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

A mão hábil executa continuamente o «02 programa de demonstração» em loop; o resultado da execução é o seguinte:

![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
