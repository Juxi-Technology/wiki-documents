---
title: "Tutorial de Montagem do Robô Móvel Lekiwi"
description: "Tutorial de montagem do robô móvel Lekiwi: módulos de rodas, placas base e superior, instalação da câmara frontal ou no braço e ligação da alimentação."
---

# Tutorial de Montagem do Robô Móvel Lekiwi

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*No CAD online do Fusion360*](https://a360.co/4k1P8yO)* pode visualizar as posições exatas dos componentes.*

[Ficheiro URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Pré-visualização online do URDF https://urdf.d-robotics.cc/

## 1. Montagem dos módulos de roda (3 por robot)

1. Utilize 12 parafusos auto-roscantes **M2x6** para fixar o motor de acionamento ao suporte do motor. (Incluídos na caixa do servo.)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. Utilize 12 parafusos de máquina **M3x16** e 12 **porcas M3** para fixar os servos à placa de base com os suportes do motor de acionamento.

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. Remova os parafusos de máquina e as porcas das rodas omnidirecionais de 82mm.

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. Utilize parafusos m3\*6 para fixar o suporte do servo ao servo.

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. Instale 4 porcas de bloqueio no acoplamento. Primeiro, utilize 4 parafusos m3\*6 para fixar o acoplamento ao suporte do servo.

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. Utilize parafusos de máquina m3\*25 e porcas de bloqueio para fixar as rodas omnidirecionais de 82mm ao acoplamento.



Depois de as três rodas estarem instaladas na placa de base:

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. Montagem da placa de base

1. Insira 2 porcas M3 nos furos da placa controladora de servos e do suporte da bateria. Utilize 4 parafusos sextavados M3x12 para fixar ambos à placa de base.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. Utilize 2 parafusos sextavados M3\*12 e 2 porcas M3 para instalar a placa controladora de servos e ligá-la aos 3 servos.

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

Ligações dos cabos da fonte de alimentação portátil

- A **entrada de alimentação** liga-se diretamente à fonte de alimentação

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- A interface **USB-C** fornece alimentação de 5V à Raspberry Pi
- Se utilizar um **braço robótico de 12V**, alimente a **placa do motor de servo** diretamente com o **distribuidor de alimentação DC**

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

Os cabos podem ser ligados como mostra a figura abaixo:

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. Montagem da placa superior

1. Coloque a Raspberry Pi 5 no fundo da caixa da Raspberry Pi e, em seguida, encaixe a tampa da caixa.

2. Utilize dois parafusos sextavados M3x16 e duas porcas M3 para fixar a Raspberry Pi à placa de base superior, e utilize quatro parafusos de máquina M4x25 e quatro porcas M4 para instalar a base do braço robótico SO-101.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. Passe o cabo USB-C para USB-A da placa controladora de servos, o cabo de alimentação USB-C de 5V e os cabos dos servos pelos furos da placa superior.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. Utilize 8 parafusos de máquina m3x16 e 4 porcas m3 para instalar a placa superior nos suportes do motor.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. Instalação das câmaras

*Nota: o suporte que concebemos é feito à medida da câmara que selecionámos. Módulos de câmara diferentes podem exigir modificações.*

## (Opção 1) Instalação da câmara frontal

①Utilize 4 parafusos espaçadores m2\*5\*5 para fixar o módulo da câmara

②Utilize 2 parafusos de máquina m3\*12 e 2 porcas m3 para instalar o suporte da câmara frontal na placa de base

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (Opção 2) Instalação da câmara montada no braço

Utilize 4 parafusos espaçadores m2\*5\*5 para fixar o módulo da câmara

Este suporte é compatível com câmaras com espaçamento entre furos de 24\*25mm ou 28\*28mm

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. Ligação da alimentação e cablagem

Ligue o adaptador de ficha cilíndrica DC à **placa controladora de servos**;

Ligue o conector USB-C de 5V à **Raspberry Pi 5** para alimentar a eletrónica;

Os cabos de dados USB da placa controladora de servos e das câmaras podem ser ligados diretamente à Raspberry Pi.

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
