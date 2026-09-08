---
title: Tutorial de depuração do AmazingHand (servo serial TTL)
description: "Primeiro, baixe o pacote compactado \"Amazing Debugging.zip\". Após a descompactação, você pode usar o documento \"Processo de depuração da mão hábil com programa Arduino (servo TTL)\" para definir o ID do servo, calibrar, calibrar o ponto médio e executar o programa de demonstração, ou consultar o código oficial open source"
---

# Tutorial de depuração do AmazingHand (servo serial TTL)

> **[Comprar na loja](https://www.juxitech.com/products/amazinghand)**


Primeiro, baixe o pacote compactado "[Amazing Debugging.zip](https://juxitech.feishu.cn/wiki/I4K0w3W0Ri7u7EkY1qfcVoGon6e)". Após a descompactação, você pode usar o documento "Processo de depuração da mão hábil com programa Arduino (servo TTL)" para definir o ID do servo, calibrar, calibrar o ponto médio e executar o programa de demonstração, ou consultar o [código oficial open source](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Sem desmontar o produto pronto** (as definições de ID de fábrica dos servos, a calibração e a calibração da posição neutra já foram ajustadas), você pode ir direto para o **[Ponto 6 "Executar '02 Demo Program'"](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcn2d0kH1XOXx1SlxvsF1x5df)** e o Ponto 7 **[Rastreamento de mão](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcnjsmqox3aQVF6pVKanOCRng)**.

![imagem – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. Método de cabeamento para depuração da mão hábil

Uma forma é usar um computador para executar softwares de host, como Python; por exemplo, o software de host de servos Feite ou a execução de código Python 

Outra é usar microcontroladores como o MEGA328P, ou placas de desenvolvimento adquiridas separadamente ou controladores principais, etc.

O método de cabeamento é o seguinte: 

(1) Método de cabeamento durante a depuração com Python (conecte apenas a placa de acionamento de servos): 

![1. Método de cabeamento para depuração da mão hábil – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Método de cabeamento durante a depuração com a placa de desenvolvimento MEGA328P (placa de acionamento de servos + placa de desenvolvimento 328P):

**Observe bem as posições dos pinos da placa de desenvolvimento MEGA328P! **

![1. Método de cabeamento para depuração da mão hábil – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Método de cabeamento para depuração da mão hábil – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Método de cabeamento para depuração da mão hábil – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Método de cabeamento para depuração da mão hábil – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

A seguir, descrevemos o processo de depuração a usar um microcontrolador. O próprio microcontrolador executará o programa de demonstração em loop contínuo, e ele pode ser interrompido simplesmente desconectando o cabo de dados. 

## 2. Definir o ID do servo

Uma mão hábil usa um total de 8 servos; os IDs da mão direita devem ser definidos de 1 a 8 e os da mão esquerda de 11 a 18 

Calibração do ponto médio — padrão do produto pronto: mão direita [451,571,451,571,451,571,451,571], mão esquerda [571,451,571,451,571,451,571,451] 

1. Cabeamento: conecte o motor servo **individual** à placa de acionamento de servos, em sequência.

![2. Definir o ID do servo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Use o software de host FD1.9.8.2 fornecido pelo fabricante do servo para a configuração

[FD.rar]

![2. Definir o ID do servo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Definir o ID do servo – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Definir o ID do servo – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3. **Fixar a palheta do servo**

1. Envie para a placa de desenvolvimento o programa "usado na instalação da palheta branca do servo"

Função deste programa: posicionar a engrenagem do servo motor em uma posição aproximadamente central; todos os ângulos de movimento posteriores são baseados nessa posição central.

(1) Instale o software Arduino por conta própria e consulte o [tutorial de instalação](https://blog.csdn.net/weixin_35509395/article/details/156188274) de acordo com o seu sistema. Para compilar e baixar o programa Arduino, você precisa instalar antes as bibliotecas FTServo e SCServo no Gerenciador de Bibliotecas.

![3.Fixar a palheta do servo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Seleção do tipo de placa de desenvolvimento: selecione "Arduino Nano" 

![3.Fixar a palheta do servo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Depure os servos 1 e 2

(1) Edição: altere as posições a seguir de acordo com o ID do servo a ser depurado. Por exemplo, se você quiser depurar o dedo indicador, defina os IDs como 1 e 2.

![3.Fixar a palheta do servo – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Envie o programa para a placa de desenvolvimento 

(3) Cabeamento: conecte a placa de desenvolvimento à placa de acionamento de servos, **servos nº 1 e 2** — você ouvirá as engrenagens dos servos girar um determinado ângulo e depois parar.

![3.Fixar a palheta do servo – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Instale a palheta do servo na engrenagem, mantendo a posição o mais paralela possível.

![3.Fixar a palheta do servo – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. Depure os servos 3 e 4

(1) **Desconecte o cabeamento entre a placa de desenvolvimento 328P e a placa de acionamento de servos (caso contrário, não será possível enviar o programa)**

(2) Edição: defina os IDs como 3 e 4

![3.Fixar a palheta do servo – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Envie o programa para a placa de desenvolvimento 

(4) Conexão: conecte a placa de desenvolvimento à placa de acionamento de servos, **servos 3 e 4** — você ouvirá a engrenagem do servo girar um determinado ângulo e parar.

(5) Instale a palheta do servo na engrenagem, mantendo a posição o mais paralela possível

4. Depure os servos 5 e 6

Os passos são os mesmos acima 

5. Depure os servos 7 e 8

Os passos são os mesmos acima 

## 4. **Ajuste fino dos valores intermediários**

1. Envie para a placa de desenvolvimento o programa "01 — Usado no ajuste fino do valor MiddlePos"

2. Quando o dedo estiver na posição fechada, interrompa imediatamente o programa (basta desconectar o cabo de dados) e verifique se a palheta do servo está alinhada corretamente (como mostra a figura abaixo). Se não estiver alinhada, ajuste os valores de MiddlePos_1 e MiddlePos_2 no programa até alinhar. Registre esses valores (8 valores correspondentes aos 8 servos), que serão usados no programa final.

![4.Ajuste fino dos valores intermediários – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4.Ajuste fino dos valores intermediários – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5. **Execute o programa de teste**

1. Preencha o array a seguir com os valores de MiddlePos_1 e MiddlePos_2 salvos acima e, em seguida, baixe o programa.

![5.Execute o programa de teste – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6. **Execute "02 Demo Program"**

(1) Instale o software Arduino por conta própria, a seguir o [tutorial de instalação de acordo com o seu sistema](https://blog.csdn.net/weixin_35509395/article/details/156188274)

(2) No diretório ` Dexterous Hand Debugging \00 TTL Serial Servo \ Arduino Program (MEGA328P Development Board) \02 Demo Program `, abra o ficheiro .ino correspondente, conforme seja a mão esquerda ou a mão direita 

![6.Execute "02 Demo Program" – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Para enviar o programa Arduino à placa de desenvolvimento, você precisa instalar as bibliotecas FTServo e SCServo no Gerenciador de Bibliotecas

![6.Execute "02 Demo Program" – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Selecione o tipo de placa de desenvolvimento: escolha "Arduino Nano"

![6.Execute "02 Demo Program" – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(5) Compile e envie

Observe que, neste momento, o computador está conectado apenas à placa de desenvolvimento, e a placa de desenvolvimento não está conectada à placa de acionamento de servos (ou seja, não está conectada à mão hábil) por enquanto.

Após o envio bem-sucedido, conecte a placa de desenvolvimento à placa de acionamento de servos por meio de três jumpers e conecte o servo à placa de acionamento de servos, a seguir o método de cabeamento em [Depuração com a placa de desenvolvimento MEGA328P](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcniHLi7JvMCniati2Mrgr6ne)

A mão hábil executará em loop contínuo o **"02 Demo Program"**

Os resultados da execução são os seguintes 

![6.Execute "02 Demo Program" – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. Rastreamento de mão](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)



