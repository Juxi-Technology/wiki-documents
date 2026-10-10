---
title: Hardware e preparação do ambiente
---

# Hardware e preparação do ambiente

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**

Este capítulo detalha o processo completo de montagem do hardware, conexão e configuração do ambiente.

---

## Lista de hardware

Antes de começar a usar o produto, confirme que você dispõe dos seguintes componentes:

|Componente|Modelo/Especificações|Quantidade|
|---|---|---|
|Servo|SCS009|2|
|Suporte do gimbal|Estrutura do gimbal 2-DOF|1|
|Placa de driver dos servos|Placa de driver com chip CH343|1|
|Câmera USB|Resolução mínima de 640x480|1|
|Fonte de alimentação dos servos|Faixa de tensão 4-7,4 V, recomendado 6 V|1|
|Cabo de dados serial|Conecta a placa de driver ao computador|1|


---

## Descrição dos parâmetros dos servos


|Parâmetro|Servo 1 (rotação esquerda/direita)|Servo 2 (inclinação cima/baixo)|
|---|---|---|
|Faixa de posição|220-802|220-511|
|Posição central|511|511|
|Valor mínimo|220 corresponde à posição mais à esquerda|220 corresponde à posição mais acima|
|Valor máximo|802 corresponde à posição mais à direita|511 corresponde à posição central|


---

## Conexão do hardware

### Passo 1: Instalar os servos e o suporte do gimbal

1. Instale o servo 1 (para rotação esquerda/direita) na posição designada do suporte inferior do gimbal e aperte os parafusos para garantir firmeza
2. Instale o servo 2 (para inclinação cima/baixo) no suporte superior do gimbal e fixe-o da mesma forma
3. Instale a estrutura de fixação da câmera conforme as instruções

### Passo 2: Conectar os servos à placa de driver

1. Conecte os cabos de dados dos dois servos aos conectores de servo da placa de driver
2. Preste atenção à ordem de conexão dos fios do servo; as cores geralmente são vermelho (alimentação), preto (terra) e branco/amarelo (sinal)
3. Certifique-se de conectar cada servo ao ID correspondente: o servo com ID 1 para esquerda/direita e o servo com ID 2 para cima/baixo

### Passo 3: Conectar a alimentação e a porta serial

1. Conecte a fonte de alimentação dos servos ao conector de alimentação da placa de driver
2. Use o cabo de dados serial para conectar a placa de driver à porta USB do computador
3. Conecte a câmera ao computador

---

## Requisitos de sistema e ambiente

### Sistemas operacionais compatíveis

- Windows 10/11
- Distribuições Linux (como Ubuntu 20.04 ou superior)

### Versão do Python

Python 3.8 ou superior

---

## Instalação de drivers e dependências

### Instalar o driver da porta serial

#### Windows

1. Acesse o site oficial do fabricante do chip CH343 e baixe o instalador do driver para a versão correspondente do Windows
Instalação do driver CH343 (instalar como administrador)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> Se no Gerenciador de Dispositivos ele aparecer reconhecido como dispositivo desconhecido "usb single serial" ou "usb serial", clique com o botão direito para desinstalá-lo primeiro, e só então instale o driver!

1. Execute o instalador e siga as instruções para concluir a instalação do driver
2. Conecte a placa de driver dos servos ao computador; o dispositivo de porta serial deverá aparecer no Gerenciador de Dispositivos

#### Linux

A maioria das distribuições Linux já inclui o driver de porta serial CH343, sem necessidade de instalação adicional. Se tiver problemas, você pode tentar:
1. Verificar se o kernel carregou o driver `lsmod | grep ch343`
2. Se não estiver carregado, reconecte o dispositivo ou reinicie o sistema

### Instalar as dependências de Python

Execute no diretório raiz do projeto:

```python
pip install -r requirements.txt
```

As principais dependências do projeto incluem:
- opencv-python: captura e processamento de imagens
- numpy: biblioteca de cálculo numérico
- pyserial: biblioteca de comunicação serial

---

## Verificação da conexão do hardware

Antes de iniciar o programa principal, podemos usar ferramentas para verificar a conexão do hardware.

### Localizar as câmeras disponíveis

Execute o comando a seguir para listar as câmeras disponíveis:

```python
python examples/list_cameras.py
```

O programa detectará e listará todas as câmeras disponíveis; anote o índice da câmera que você precisa usar.

### Localizar as portas seriais disponíveis

Execute o comando a seguir para listar as portas seriais disponíveis:

```python
python examples/list_ports.py
```

Anote o nome do dispositivo de porta serial que você está usando.

### Diagnóstico do hardware

Se precisar fazer uma verificação completa de todo o hardware, execute a ferramenta de diagnóstico:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

O programa de diagnóstico testará sucessivamente a câmera, a porta serial e o gimbal.

---

## Avisos de segurança

Durante o uso, tome as seguintes precauções de segurança:
1. A alimentação dos servos deve estar dentro da faixa especificada (4-7,4 V) para evitar danos aos servos
2. Evite que os servos permaneçam por muito tempo nas posições extremas, para prolongar a vida útil
3. Antes de desligar a alimentação, recomenda-se centralizar o gimbal para reduzir a carga na próxima inicialização
