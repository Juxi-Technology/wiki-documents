---
title: "Tutorial de Montagem do Robô Móvel Lekiwi"
description: "As posições precisas dos componentes podem ser visualizadas no CAD online Fusion360."
---

# Tutorial de Montagem do Robô Móvel Lekiwi

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*No CAD online do Fusion360*](https://a360.co/4k1P8yO)* você pode visualizar as posições exatas dos componentes.*

[Arquivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Pré-visualização online do URDF https://urdf.d-robotics.cc/

## 1. Montagem dos módulos de roda (3 por robô)

1. Use 12 parafusos auto-atarraxantes **M2x6** para fixar o motor de acionamento ao suporte do motor. (Incluídos na caixa do servo.)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. Use 12 parafusos de máquina **M3x16** e 12 **porcas M3** para fixar os servos à placa de base usando os suportes do motor de acionamento.

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. Remova os parafusos de máquina e as porcas das rodas omnidirecionais de 82mm.

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. Use parafusos m3\*6 para fixar o suporte do servo ao servo.

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. Instale 4 porcas de travamento no acoplamento. Primeiro, use 4 parafusos m3\*6 para fixar o acoplamento ao suporte do servo.

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. Use parafusos de máquina m3\*25 e porcas de travamento para prender as rodas omnidirecionais de 82mm ao acoplamento.



Depois que as três rodas estiverem instaladas na placa de base:

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. Montagem da placa de base

1. Insira 2 porcas M3 nos furos da placa controladora de servos e do suporte da bateria. Use 4 parafusos sextavados M3x12 para fixar ambos à placa de base.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. Use 2 parafusos sextavados M3\*12 e 2 porcas M3 para instalar a placa controladora de servos e conectá-la aos 3 servos.

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

Conexões dos cabos da fonte de alimentação portátil

- A **entrada de alimentação** conecta-se diretamente à fonte de alimentação

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- A interface **USB-C** fornece alimentação de 5V à Raspberry Pi
- Se você usar um **braço robótico de 12V**, alimente a **placa do motor de servo** diretamente com o **distribuidor de alimentação DC**

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

Os cabos podem ser conectados conforme mostrado na figura abaixo:

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. Montagem da placa superior

1. Coloque a Raspberry Pi 5 na parte inferior da caixa da Raspberry Pi e, em seguida, encaixe a parte superior da caixa.

2. Use dois parafusos sextavados M3x16 e duas porcas M3 para fixar a Raspberry Pi à placa de base superior, e use quatro parafusos de máquina M4x25 e quatro porcas M4 para instalar a base do braço robótico SO-101.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. Passe o cabo USB-C para USB-A da placa controladora de servos, o cabo de alimentação USB-C de 5V e os cabos dos servos pelos furos da placa superior.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. Use 8 parafusos de máquina m3x16 e 4 porcas m3 para instalar a placa superior nos suportes do motor.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. Instalação das câmeras

*Observação: o suporte que projetamos é feito sob medida para a câmera que selecionamos. Módulos de câmera diferentes podem exigir modificações.*

## (Opção 1) Instalação da câmera frontal

①Use 4 parafusos espaçadores m2\*5\*5 para fixar o módulo da câmera

②Use 2 parafusos de máquina m3\*12 e 2 porcas m3 para instalar o suporte da câmera frontal na placa de base

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (Opção 2) Instalação da câmera montada no braço

Use 4 parafusos espaçadores m2\*5\*5 para fixar o módulo da câmera

Este suporte é compatível com câmeras com espaçamento entre furos de 24\*25mm ou 28\*28mm

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. Conexão da alimentação e cabeamento

Conecte o adaptador de plugue cilíndrico DC à **placa controladora de servos**;

Conecte o conector USB-C de 5V à **Raspberry Pi 5** para alimentar a eletrônica;

Os cabos de dados USB da placa controladora de servos e das câmeras podem ser conectados diretamente à Raspberry Pi.

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
