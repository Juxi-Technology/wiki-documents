---
title: Hardware e preparação do ambiente
---

# Hardware e preparação do ambiente

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

Este capítulo descreve em detalhe o processo completo de montagem do hardware, das ligações e da configuração do ambiente.

---

## Lista de hardware

Antes de começar a utilizar o produto, confirme que tem todos os seguintes componentes:

|Componente|Modelo/Especificações|Quantidade|
|---|---|---|
|Servos|SCS009|2|
|Suporte do gimbal|Estrutura de gimbal 2-DOF|1|
|Placa de acionamento dos servos|Placa de acionamento com chip CH343|1|
|Câmara USB|Resolução não inferior a 640x480|1|
|Fonte de alimentação dos servos|Intervalo de tensão 4V-7.4V, recomendado 6V|1|
|Cabo de dados de porta série|Liga a placa de acionamento ao computador|1|


---

## Descrição dos parâmetros dos servos


|Parâmetro|Servo n.º 1 (rotação esquerda/direita)|Servo n.º 2 (inclinação cima/baixo)|
|---|---|---|
|Intervalo de posição|220-802|220-511|
|Posição central|511|511|
|Mínimo|220 corresponde à posição mais à esquerda|220 corresponde à posição mais acima|
|Máximo|802 corresponde à posição mais à direita|511 corresponde à posição central|


---

## Ligações de hardware

### Passo 1: Instalar os servos e o suporte do gimbal

1. Monte o servo n.º 1 (utilizado para a rotação esquerda/direita) na posição indicada do suporte inferior do gimbal e aperte os parafusos para garantir a fixação
2. Monte o servo n.º 2 (utilizado para a inclinação cima/baixo) no suporte superior do gimbal e fixe-o da mesma forma
3. Instale a estrutura de fixação da câmara conforme as instruções

### Passo 2: Conectar os servos à placa de acionamento

1. Ligue os cabos de dados dos dois servos às interfaces de servo da placa de acionamento
2. Tenha em atenção a ordem de ligação dos cabos dos servos; as cores são geralmente vermelho (alimentação), preto (terra) e branco/amarelo (sinal)
3. Confirme que os servos estão ligados ao ID correspondente: ID de servo 1 para esquerda/direita, ID de servo 2 para cima/baixo

### Passo 3: Conectar a alimentação e a porta série

1. Ligue a fonte de alimentação dos servos à interface de alimentação da placa de acionamento
2. Utilize o cabo de dados de porta série para ligar a placa de acionamento à interface USB do computador
3. Ligue a câmara ao computador

---

## Requisitos de sistema e ambiente

### Sistemas operativos suportados

- Windows 10/11
- Distribuições Linux (por exemplo, Ubuntu 20.04 ou superior)

### Versão do Python

Python 3.8 ou superior

---

## Instalação de controladores e dependências

### Instalar o controlador da porta série

#### Windows

1. Visite o site oficial do fabricante do chip CH343 e descarregue o programa de instalação do controlador para a versão correspondente do Windows
Instalação do controlador CH343 (instalar como administrador)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> Se o dispositivo for reconhecido no Gestor de Dispositivos como um dispositivo desconhecido «usb single serial» ou «usb serial», clique com o botão direito e desinstale-o primeiro; só depois instale o controlador!

1. Execute o programa de instalação e siga as instruções para concluir a instalação do controlador
2. Ligue a placa de acionamento dos servos ao computador; o dispositivo de porta série deverá ficar visível no Gestor de Dispositivos

#### Linux

A maioria das distribuições Linux já inclui o controlador de porta série CH343, pelo que não é necessária instalação adicional. Se tiver problemas, tente:
1. Verifique se o kernel já carregou o controlador: `lsmod | grep ch343`
2. Se não estiver carregado, experimente voltar a ligar e desligar o dispositivo ou reiniciar

### Instalar as dependências do Python

Execute no diretório raiz do projeto:

```python
pip install -r requirements.txt
```

As principais dependências do projeto incluem:
- opencv-python: captura e processamento de imagens
- numpy: biblioteca de cálculo numérico
- pyserial: biblioteca de comunicação de porta série

---

## Verificar as ligações de hardware

Antes de iniciar o programa principal, podemos verificar as ligações de hardware com as ferramentas disponibilizadas.

### Localizar as câmaras disponíveis

Execute o seguinte comando para listar as câmaras disponíveis:

```python
python examples/list_cameras.py
```

O programa deteta e lista todas as câmaras disponíveis; registe o índice da câmara que precisa de utilizar.

### Localizar as portas série disponíveis

Execute o seguinte comando para listar as portas série disponíveis:

```python
python examples/list_ports.py
```

Registe o nome do dispositivo de porta série que utiliza.

### Diagnóstico de hardware

Se precisar de verificar todo o hardware de forma abrangente, pode executar a ferramenta de diagnóstico:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

O programa de diagnóstico testa sequencialmente a câmara, a porta série e o gimbal.

---

## Avisos de segurança

Durante a utilização, tenha em atenção os seguintes avisos de segurança:
1. A alimentação dos servos deve estar dentro do intervalo especificado (4V-7.4V), para evitar danos nos servos
2. Evite manter os servos nas posições limite durante longos períodos, para prolongar a vida útil
3. Antes de cortar a alimentação, recomenda-se recentrar o gimbal, para reduzir a carga no próximo arranque
