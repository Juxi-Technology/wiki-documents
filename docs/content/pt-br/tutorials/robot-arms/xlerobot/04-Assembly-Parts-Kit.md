---
title: "⚒️Montagem do kit"
description: "Se você preferir pular a diversão de apertar parafusos, você também pode comprar o kit pré-montado do braço s…"
---

# ⚒️Montagem do kit

![Imagem 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.png)

Dica

Se você preferir pular a diversão de apertar parafusos, você também pode comprar o [kit pré-montado](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039) do braço seguidor SO101 compatível com o Xlerobot.



## 🦾 Braço robótico SO101

![Imagem 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.png)

> Se você já tem 2 braços robóticos SO101 montados e com os servos configurados, pule esta parte.
> 
> 

- Monte 2 braços robóticos SO101 seguindo as [instruções de montagem passo a passo do SO101](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g), fazendo 2 braços seguidores idênticos, equipados com 2 conjuntos de servos (anteriormente todos com ID de 1-6) para as 2 placas de driver de servo.

- Adicione a câmera de pulso seguindo este [guia de instalação](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc).

- Se você tiver uma almofada antiderrapante, pode colá-la na garra.

## 一、Configurar os servos

||Quantidade|id do servo|Uso|
|---|---|---|---|
|Servo Feetech STS3215-C018|3|7、8、9|Carrinho do chassi com rodas omnidirecionais|
|Servo Feetech STS3215-C018|2|7、8|Kit do membro superior - torre de câmeras|
|Cabo de extensão de servo 90CM|2||Conectar o carrinho do chassi e a torre de câmeras à placa de driver de servo|

![Imagem 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.png)

> Como o repositório de código oficial do lerobot atualmente não oferece suporte à configuração de servos além dos braços robóticos, usamos o [Bambot](https://bambot.org/) em seu lugar (funciona no Windows e no Mac; no Linux, é preciso executar antes sudo chmod 666 /dev/ttyACM0).
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- Conecte os servos que deseja configurar (um a um) à placa de driver de servo e conecte a placa de driver de servo diretamente ao seu computador.

- Acesse a [página de configuração de servos do Bambot](https://bambot.org/feetech.js), estabeleça a conexão e faça a varredura dos seus servos. 

![Imagem 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- Renomeie os IDs dos servos conforme as instruções abaixo. 

![Imagem 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- Além do braço robótico SO101, você também precisa configurar dois conjuntos de servos para as 2 placas de driver de servo:

    - Um conjunto para a **torre de câmeras** (id dos servos: 7, 8)

    - O outro conjunto para o **carrinho do chassi com rodas omnidirecionais** (id dos servos: 7, 8, 9).

- Dica: escreva os números nos servos com um marcador e diferencie os servos de placas diferentes (como L1-L8 e R1-R9).

## 🛒 Carrinho de transporte

- Caso você tenha jogado o manual fora por engano, [aqui está uma cópia](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf).

![Imagem 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑‍🦼‍➡ Base com rodas

> Se você já tem uma base Lekiwi, remova a bateria, o suporte dos servos etc. Na placa inferior, basta instalar 3 servos com rodas (mantenha a fiação).
> 
> 

![Imagem 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**Observação**

Não escolha a placa errada; cada placa tem uma ordem específica.

- Conforme a figura acima, instale as rodas omnidirecionais na placa.

    - Os IDs de servo específicos devem ser instalados de acordo.

- Observe que os conectores das rodas omnidirecionais precisam de 3 parafusos M4.

- Faça o cabeamento normal dos servos conforme o [tutorial](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly); depois, não conecte os cabos dos servos à placa de driver de servo, mas use o **cabo de extensão de servo de 90CM** para conectar à placa de driver de servo.

![Imagem 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- Conforme a figura acima, instale a placa superior.

- Deixe o **cabo de extensão de servo de 90CM** pendurado e, por enquanto, não o puxe para fora pelos furos da placa superior.

![Imagem 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.png)

- Conforme a figura acima, instale 3 conectores (espaçadores) na placa superior.

Dica

Coloque a base Lekiwi com os conectores sob o carrinho de transporte e veja se ela exerce pressão suficiente sobre o carrinho, de modo que as quatro rodas do carrinho ainda toquem o chão. Se não conseguir, tente modificar o modelo 3D do conector ajustando levemente a escala do eixo z diretamente no software de fatiamento (mantendo inalteradas as escalas dos eixos x e y) e imprima-o novamente.

![Imagem 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

Dica

Vire o carrinho de transporte para fazer a montagem a seguir.

- Agora instale a base Lekiwi com os conectores na parte inferior do carrinho de transporte, com a placa mais fina do outro lado.

- Consulte a figura e encontre a direção de montagem necessária de acordo com o índice dos servos.

Observação

Esta nova versão de hardware é compatível com a grade metálica do carrinho de transporte, e todos os 12 parafusos M3 devem encaixar facilmente.

![Imagem 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.png)

- Em seguida, passe os cabos previamente estendidos por baixo do carrinho de transporte e faça a fiação para cima.

## 🦾 Base do braço robótico

### Montagem da base superior

14 parafusos sextavados M3\*12

4 parafusos sextavados M3\*16

![Imagem 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- A montagem é mais fácil com a base virada.

### Montagem da cabeça

①Primeiro, conecte o cabo de extensão de servo de 90CM (listrado de preto e branco) e o cabo de servo (listrado de branco, vermelho e preto) ao servo nº 7.



②Use quatro parafusos com arruela M2\*6 para fixar a câmera

![Imagem 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- Ao instalar o disco do servo, observe que o furo central do disco não deve ser parafusado.

- Isso deve ser igual aos dois primeiros passos da [montagem do braço robótico SO101](https://huggingface.co/docs/lerobot/so101#joint-1).

## 🧵 Cabeamento

Importante

Antes de prender a base superior ao carrinho de transporte, conclua todo o cabeamento e a organização dos cabos da base superior, e coloque o Raspberry Pi na sua carcaça.

![Imagem 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- Conecte o cabo de extensão de servo de 90CM vindo da **base Lekiwi** ao **braço robótico SO101 esquerdo** (isso faz com que a base e o braço robótico formem um Lekiwi).

- Conecte 2 cabos de dados **USB-C para USB-A ** das 2 **placas de driver de servo** ao **Raspberry Pi** (restam 2 conectores USB-A para as câmeras) ou à placa Jetson.

- Conecte todos os 3 **cabos de energia**: 2 **cabos USB-C para DC(12V) das 2 placas de driver de servo** e 1 **cabo USB-C para USB-C** do **Raspberry Pi**, à interface de carregamento rápido PD da fonte de alimentação. Cada interface fornece até 100W de potência quando carregadas simultaneamente, o que, após testes, é suficiente para suportar o funcionamento da versão de 12V.

### 🔋 Posicionar a bateria 🛒

- Coloque-a em qualquer posição da camada intermediária ou inferior do carrinho de transporte para manter o centro de gravidade baixo. A bateria tem base antiderrapante e não desliza facilmente durante a operação normal.

- Por segurança, mantenha-a na posição vertical.

- Caso você também tenha jogado o manual da bateria fora por engano, [aqui está uma cópia](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf).

Importante

Para proteger as placas de driver de servo, certifique-se de conectar os cabos de energia por último. Desconecte sempre os cabos de energia ao conectar ou desconectar outros cabos.

## 📸 Montagem final

### Colocar a base no carrinho de transporte

Importante

Antes de prender a base superior ao carrinho de transporte, conclua todo o cabeamento e a organização dos cabos da base superior, e coloque o Raspberry Pi na sua carcaça.

![Imagem 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.png)

- Ao encaixar a borda do carrinho de transporte no engate da carcaça, tenha cuidado para não danificar a carcaça.

- Para facilitar os testes, os braços robóticos SO101 são presos diretamente ao carrinho de transporte. Posicione a [base do braço robótico](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl) nos dois cantos da camada superior do carrinho de transporte e fixe-a com **grampos de fixação tipo F**.

- Se você tiver carretéis de papel para filamento da bambulab, não se esqueça de colocá-los dentro para proporcionar um apoio estrutural estável.

![Imagem 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.png)

Após concluir esses passos, o XLeRobot deverá estar fisicamente bem montado e pronto para fazer algumas tarefas domésticas.

![Imagem 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.png)

![Imagem 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.png)

Importante

Depois que o XLeRobot estiver totalmente montado, não o empurre por aí como se fosse um carrinho de transporte, pois isso pode danificar as engrenagens dos servos. Em vez disso, quando precisar movê-lo manualmente, levante o robô (~12kg).



