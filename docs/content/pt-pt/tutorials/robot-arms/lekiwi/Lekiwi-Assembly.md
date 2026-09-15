---
title: "Tutorial de Montagem do Robô Móvel Lekiwi"
description: "As posições precisas dos componentes podem ser visualizadas no CAD online Fusion360."
---

# Tutorial de Montagem do Robô Móvel Lekiwi

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*As posições precisas dos componentes podem ser visualizadas no CAD online Fusion360*](https://a360.co/4k1P8yO)*.*

[Ficheiro URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Visualização online do URDF https://urdf.d-robotics.cc/

## 1. Monte o módulo de rodas (3 por robô)

1. Fixe o motor de tração ao suporte do motor a usar 12 parafusos autorroscantes **M2x6**. (Acompanham a caixa de servos)

![imagem – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![imagem – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)

2. Fixe o suporte do motor de tração à placa base com 12 **parafusos de máquina M3x16 e 12**.

![imagem – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)

3. Remova os parafusos de máquina e as porcas da roda omnidirecional de 82 mm

![imagem – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)

4. Use parafusos m3\*6 para fixar a roda de direção ao servo

![imagem – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)

5. Instale 4 porcas de trava no acoplamento e use 4 parafusos M3\*6 para fixar o acoplamento à roda de direção.

![imagem – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![imagem – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)

6. Use parafusos de máquina M3\*25 e porcas de trava para fixar a roda omnidirecional de 82 mm ao acoplamento



Depois que as três rodas forem instaladas na placa base: 

![imagem – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![imagem – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![imagem – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)

## 2. Montagem da placa base

1. Insira as porcas M3 nos furos da placa de acionamento de servos e do suporte da bateria. Fixe ambos à placa base com 4 parafusos de máquina M3x12.

![imagem – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)

![imagem – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)

2. Instale a placa de acionamento de servos a usar quatro pilares de cobre M2.5\*6.5 e quatro parafusos M2.5\*8, e conecte-a aos 3 servos.

![imagem – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)

Conexão do cabo de energia do robô móvel

- **Entrada de energia** conectada diretamente à fonte de alimentação 

![imagem – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)

![imagem – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)

- A interface **USB-C** fornece energia de 5V ao Raspberry Pi

- Se você usar um **braço robótico de 12V**, use diretamente o **distribuidor de energia CC** para alimentar a **placa do motor servo**. 

![imagem – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)

![imagem – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)

O cabo pode ser conectado como mostra a figura abaixo: 

![imagem – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)

## 3. Montagem da placa superior

1. Coloque o Raspberry Pi 5 na parte inferior do gabinete do Raspberry Pi e encaixe a tampa do gabinete.

2. Fixe o Raspberry Pi à placa base superior com dois parafusos de máquina M3x12 e duas porcas de trava M3, e instale a base do braço robótico SO-101 com quatro parafusos de máquina M4x25 e quatro porcas de trava M4. Você pode usar tanto a nossa base SO-101 melhorada quanto a base original, pois a placa base já tem os furos de montagem para os dois tipos de base.

![imagem – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)

## 4.

1. Passe o cabo USB-C para USB-A da placa de acionamento de servos, o cabo de alimentação USB-C de 5V e o cabo do servo SO0-101 pelos furos das placas superior e inferior.

![imagem – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)

2. Instale as placas superior e inferior no suporte do motor com 6 parafusos de máquina M3x12 e 6 porcas de trava M3.

![imagem – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)

3. Conecte as placas superior e inferior com 6 pilares de cobre M3\*50 e 6 parafusos de máquina M3\*



## 5. Instale a câmara

*Observação: o suporte que projetamos é específico para a câmara que selecionamos. Podem ser necessárias modificações para módulos de câmara diferentes.*

### (Opção 1) Instalar a câmara de visão frontal 

Instale o suporte da câmara de visão frontal na placa base com 3 parafusos de máquina M3\*12 e 3 porcas M3 



Fixe o módulo da câmara com 4 parafusos com arruela m2\*5\*5 



### (Opção 2) Instalar uma câmara montada no braço 



Fixe o módulo da câmara com 4 parafusos com arruela m2\*5\*5 

## 6. Conecte a alimentação



Insira o adaptador com ficha cilíndrico CC na placa de acionamento de servos e conecte o conector USB-C de 5V ao Raspberry Pi 5 para alimentar os dispositivos eletrônicos. Os cabos de dados USB da placa de acionamento de servos e da câmara podem ser conectados diretamente ao Raspberry Pi.

![Opção 2 Instalar uma câmara montada no braço – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)



