---
title: "Guia de Montagem do Braço Robótico Lerobot"
description: "Guia de montagem do braço robótico LeRobot SO-ARM101: definir os IDs dos servos no Windows ou Linux, instalar as palhetas e seguir a montagem."
---

# Guia de Montagem do Braço Robótico Lerobot

Atenção: se o braço robótico já está montado, pule este tutorial

## Peças impressas em 3D do braço seguidor

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## Peças impressas em 3D do braço líder

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

O braço líder e o braço seguidor são muito semelhantes; apenas a extremidade é diferente

O braço líder tem punho e gatilho, o braço seguidor tem garra

## Remover os suportes residuais das peças impressas em 3D

Verifique cada furo, orifício, ranhura e grelha, especialmente os cinco furos semelhantes ao “cinco de círculos” do mahjong

Este passo é muito importante, caso contrário não será possível apertar os parafusos mais adiante

## Distinção entre os quatro tipos de servo

|Modelo grande|Modelo pequeno|Tensão (V)|Relação de redução|Articulação do braço robótico|Quantidade|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|Braço líder 2|1|
||C044|7.4|1:191|Braço líder 1, 3|2|
||C046|7.4|1:147|Braço líder 4, 5, 6|3|
||C047|12|1:345|Todas as articulações do braço seguidor|6|

> A relação de redução é a proporção “velocidade do motor : velocidade do eixo de saída do servo”; por exemplo, 1:345 significa que o motor precisa girar 345 voltas para que o eixo de saída do servo gire 1 volta.
> 
> Uma relação de redução grande amplifica o torque através do conjunto de engrenagens, por isso consegue mover cargas mais pesadas (como o braço seguidor)
> 
> Mas, ao mesmo tempo, a velocidade de rotação do eixo de saída será menor (porque foi “reduzida”)
> 
> Se arrastar a articulação, será mais penoso
> 
> 

A seguir estão os modelos e as relações de redução de todos os servos deste projeto; os sublinhados são suas numerações

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## Distinção entre os dois adaptadores de alimentação de tensões diferentes

Adaptador de alimentação de 5V 6A 30W: alimenta os servos de 7.4V (braço líder), cor preta

Adaptador de alimentação de 12V 5A 60W: alimenta os servos de 12V (braço seguidor), cor branca

## Descarregar a ferramenta de depuração de servos Feetech

### Computador Windows

https://gitee.com/ftservo/fddebug

Descarregue [`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z), descomprima e execute o programa exe dentro dele

### Computador Ubuntu e computador Mac (o pacote compactado inclui o tutorial)

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**Versão Pro: o braço líder usa adaptador de alimentação de 5V6A e o braço seguidor usa adaptador de alimentação de 12V5A**

A configuração do ID do servo, a calibração do ângulo do servo e a montagem devem ser feitas com antecedência; consulte o [tutorial de montagem oficial](https://huggingface.co/docs/lerobot/so101)

## Primeiro passo: definir o ID do servo e instalar o disco do servo (exceto o servo nº 5)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Abra a ferramenta de depuração host da Feetech, selecione o número da porta COM, com baud rate de um milhão, e clique em “打开”

2. Clique em “搜索”; depois que “STS3215” aparecer, clique em “停止” e clique em “STS3215”

3. Selecione “调试” na parte superior: pode arrastar o controlo deslizante para fazer o servo girar, ou clicar em “扫描” para fazer o servo mover-se alternadamente. Confirme que o servo funciona normalmente

4. Selecione “编程” na parte superior

5. Clique em “中位校准” e defina a posição do eixo de rotação do servo neste momento como a posição central (0-4095)

6. Clique em “ID”, defina no canto inferior direito o número de ID correspondente ao servo e clique em “保存”. Observe que o número é composto apenas por algarismos arábicos, sem letras.

7. Desligue o cabo que liga o servo à placa de controlo

8. Ligue o cabo do servo ao servo

O servo nº 1 recebe dois cabos; os outros servos recebem apenas um cabo por enquanto

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

Lembrando novamente: certifique-se de que o ID da articulação do servo e a relação de engrenagens correspondam estritamente aos do **SO-ARM101**.

Cada motor no barramento tem um ID único. Motores novos geralmente trazem um ID predefinido `1`. Para garantir a comunicação normal entre o motor e o controlador, primeiro precisamos de definir um ID único para cada motor. Além disso, a velocidade de transmissão de dados no barramento é determinada pelo baud rate. Para que possam comunicar entre si, o controlador e todos os motores precisam de ser configurados com o mesmo baud rate; o baud rate dos servos deste braço robótico é 100000.

Para isso, primeiro precisamos de ligar o controlador a cada motor separadamente, a fim de proceder à configuração. Como gravaremos esses parâmetros na área não volátil da memória interna do motor (EEPROM), basta fazer a operação uma única vez.

Se for reaproveitar motores de outro robô, talvez também precise de executar este passo, pois o ID e o baud rate podem não corresponder.

O vídeo abaixo mostra a sequência de passos para definir o ID dos motores.

### Sistema Windows

[Software host de servo Feetech.zip](/downloads/飞特舵机上位机.zip)

Use o software host de servo Feetech para definir o ID do servo e calibrar a posição central; a definição de ID vai de 1 a 6!

**Configuração de ID dos servos do braço robótico - sistema Windows.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Sistema Linux/ubuntu e computador Mac

Se precisar do software host de servo Feetech, consulte a [ferramenta de depuração de servos Feetech](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb) acima

Primeiro conclua a implementação do ambiente seguindo a página [instalação do ambiente oficial do Lerobot](https://huggingface.co/docs/lerobot/installation)

Lembre-se de ativar o ambiente virtual e entrar no diretório src/lerobot correspondente

conda activate lerobot

cd lerobot/src/lerobot

1、Encontre a porta USB correspondente ao braço robótico Para encontrar a porta correta de cada braço robótico, execute o script utilitário duas vezes::

```Plain Text
lerobot-find-port
```

Saída de exemplo ao identificar a porta do braço robótico Leader (por exemplo, `/dev/tty.usbmodem575E0031751` no Mac, ou possivelmente `/dev/ttyACM0` no Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Saída de exemplo ao identificar a porta do braço robótico Follower (por exemplo, `/dev/tty.usbmodem575E0032081`, ou possivelmente `/dev/ttyACM1` no Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Lembre-se de desligar o conetor USB, caso contrário a interface não será detetada.

2、Use um cabo de dados USB para ligar o computador à placa de acionamento de servos do braço seguidor e ligue a alimentação. Em seguida, execute o comando abaixo. Altere `--robot.port=/dev/ttyACM0` no comando para a porta encontrada. Se a porta encontrada for /dev/ttyACM1, altere para `--robot.port=/dev/ttyACM1`

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Verá a saída abaixo.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Siga as instruções e ligue o servo da garra. Certifique-se de que é o único servo ligado à placa de acionamento de servos e que esse servo ainda não está ligado a nenhum outro servo. Após premir a tecla **[Enter]**, o script definirá automaticamente o ID e o baud rate desse servo; a definição de ID vai de 6 a 1!

Depois, deverá ver a seguinte informação:

```Python
'gripper' motor id set to 6
```

Em seguida, a próxima saída é:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Atenção **Siga as instruções e repita a operação acima para cada servo.

Assim como nos servos anteriores, certifique-se de que é o único servo ligado à placa de acionamento e que o próprio servo não está ligado a nenhum outro servo.

Antes de premir **Enter** a cada vez, verifique sempre as ligações dos cabos. Por exemplo, ao manusear a placa, o cabo de alimentação pode soltar-se.

Quando concluir todos os passos, o script terminará automaticamente e os servos estarão prontos para uso. Agora pode ligar os conetores de 3 pinos de cada servo em sequência e ligar o cabo do primeiro servo (o servo “shoulder pan” de ID 1) à placa de acionamento. Agora a placa de acionamento pode ser instalada na base do braço robótico.

Repita os mesmos passos para o braço líder.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**Configuração de ID dos servos do braço robótico - sistema Linux.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## Segundo passo: montagem

- Os passos de montagem do braço seguidor são basicamente os mesmos do braço líder. A única diferença é que, após o passo 12, a forma de instalar o atuador final (garra e punho) é diferente.

**Tutorial de montagem do braço robótico SO-ARM101.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

Instalação da placa de acionamento de servos: instale primeiro os 4 espaçadores de latão e depois fixe a placa de acionamento com quatro parafusos M2.5*8

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**Versão Pro: o braço líder preto usa adaptador de alimentação de 5V6A e o braço seguidor branco usa adaptador de alimentação de 12V5A**

## Configuração do ID do servo e calibração da posição central pela página web

https://bambot.org/feetech.js?lang=zh

1、Introduza 0 ou 1 de acordo com o modelo do servo e clique em “连接”

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2、Varra os servos com ID 1~6; pode confirmar o servo com o ID correspondente através do FOUND no resultado da varredura. Por exemplo, na imagem, o servo de ID 1 foi encontrado pela varredura

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3、Configuração de ID e calibração da posição central

①No ID atual do servo, insira o ID do servo que foi encontrado pela varredura

②Em “ID管理”, introduza o número e clique em “更改ID” para definir o ID

③Calibração da posição central (a posição central do servo STS3215 é 2047 e a do servo SCS0009 é 511)

Servo STS: introduza 2047 em “位置控制” e clique em “Set”

Servo SCS: introduza 511 em “位置控制” e clique em “Set”

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
