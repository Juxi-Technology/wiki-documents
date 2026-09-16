---
title: "Guia de Montagem do Braço Robótico Lerobot"
description: "O braço ativo da versão Pro usa um adaptador de energia de 5V6A, enquanto o braço passivo usa um adaptador de energia de 12V5A"
---

# Guia de Montagem do Braço Robótico Lerobot

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**


![imagem – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**O braço ativo da versão Pro usa um adaptador de energia 5V6A, enquanto o braço passivo usa um adaptador de energia 12V5A **

A definição dos IDs dos servos, a calibração dos ângulos dos servos e a montagem devem ser concluídas antecipadamente; você pode consultar o [tutorial oficial de montagem](https://huggingface.co/docs/lerobot/so101)

## Passo 1: Definir o ID do servo e instalar a palheta do servo (exceto o servo nº 5) 

![imagem – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

Mais uma vez, certifique-se de que o ID da articulação do servo e a relação de transmissão correspondam estritamente aos do **SO-ARM101**.

Cada motor do barramento tem um ID exclusivo. Motores novos geralmente vêm com o ID padrão `1`. Para garantir a comunicação normal entre o motor e o controlador, primeiro precisamos definir um ID exclusivo para cada motor. Além disso, a velocidade de transmissão de dados no barramento é determinada pela taxa de baud. Para que consigam se comunicar, o controlador e todos os motores precisam ser configurados com a mesma taxa de baud; a taxa de baud dos servos deste braço robótico é 100000. 

Para isso, primeiro precisamos conectar o controlador a cada motor separadamente para a configuração. Como esses parâmetros serão gravados na área não volátil da memória interna do motor (EEPROM), apenas uma operação é necessária.

Se você planeja reutilizar motores de outros robôs, talvez também precise executar este passo, pois o ID e a taxa de baud podem não corresponder. 

O vídeo a seguir mostra os passos sequenciais para definir o ID do motor. 

### Sistema Windows

飞特舵机上位机.zip

Use o software de controle de servos Feite para definir o ID dos servos e calibrar o ponto médio; os IDs variam de 1 a 6! 

机械臂舵机设置ID-Windows系统.mp4

### Sistema Linux/Ubuntu

Para o software de host FTServo, consulte  https://gitee.com/ftservo/FTServo_Linux

Siga primeiro o [Tutorial do braço manipulado LeRobot](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) até **C. Controle do braço**, em **Autorização de porta** — **Execute o script para encontrar a porta**

Conecte a placa de acionamento de servos do braço escravo ao computador com um cabo de dados USB e ligue a energia. Em seguida, execute o comando a seguir. Altere --robot.port=/dev/ttyACM0 no comando para o número de porta encontrado. Se a porta encontrada for /dev/ttyACM1, altere para --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Você verá a seguinte saída.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Conecte o servo da garra conforme as instruções. Certifique-se de que seja o único servo conectado à placa de acionamento de servos e que esse servo não esteja conectado a nenhum outro servo. Depois de pressionar a tecla **[Enter]**, o script definirá automaticamente o ID e a taxa de baud desse servo, com IDs de 6 a 1!

Depois disso, você deve ver a seguinte mensagem: 

```Python
'gripper' motor id set to 6
```

Em seguida, a saída do próximo item é:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Observação:** repita as operações acima para cada servo, a seguir as instruções.

Como no servo anterior, certifique-se de que seja o único servo conectado à placa de acionamento e que o próprio servo não esteja conectado a nenhum outro servo. 

Antes de cada pressionamento da tecla **Enter**, verifique suas conexões de cabo. Por exemplo, ao operar a placa, o cabo de energia pode se desconectar.

Depois de concluir todos os passos, o script termina automaticamente e os servos estarão prontos para uso. Agora você pode conectar o conector de 3 pinos de cada servo em sequência e conectar o cabo do primeiro servo (o servo "shoulder pan", com ID 1) à placa de acionamento. Agora a placa de acionamento pode ser instalada na base do braço robótico. 

Repita os mesmos passos para o braço ativo. 

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

机械臂舵机设置ID-Linux系统.mp4

## Passo 2: Montagem

- Os passos de montagem do braço seguidor são basicamente os mesmos do braço ativo. A única diferença é que, após o passo 12, o método de instalação do efetuador final (garra e alça) é diferente. 

SO-ARM101机械臂组装教程.mp4

Instalação da placa de acionamento de servos: primeiro instale 4 pilares de cobre e, em seguida, fixe a placa com quatro parafusos M2.5\*8

![Sistema Linux/Ubuntu – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Sistema Linux/Ubuntu – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Sistema Linux/Ubuntu – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**O braço ativo preto da versão Pro usa um adaptador de energia 5V6A, enquanto o braço passivo branco usa um adaptador de energia 12V5A **

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
