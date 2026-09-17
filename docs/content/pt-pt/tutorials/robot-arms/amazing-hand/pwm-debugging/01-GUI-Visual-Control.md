---
title: "01-Controlo visual por GUI"
description: "Controlo visual por GUI da mão AmazingHand: ligar o ESP32-S3 por porta série, executar gestos com botões e controlar os 8 servos PWM com cursores."
---

# 01-Controlo visual por GUI

Comandos de gestos visuais — Tutorial de utilização

Este diretório disponibiliza uma **ferramenta de controlo pelo computador host**: depois de ligar o ESP32, utilize o computador para clicar em botões ou escrever comandos e fazer a mão hábil executar gestos.

> Aplicável a: ESP32-S3 + 8 canais de servomotores PWM (acionamento diferencial). Para a gravação do firmware, consulte as instruções em `..\03_firmware_docs`.

## 1. Duas formas de utilização

|Modo|Requisito|Indicado para|
|---|---|---|
|**Programa empacotado**(recomendado)|Clique duas vezes em `AmazingHand控制台.exe`|Sem necessidade de instalar Python, utilize imediatamente|
|**Execução pelo código-fonte**|Python 3.12 de 64 bits|Necessário para rastreamento de gestos ou personalização|

## 2. Modo 1: duplo clique no exe

1. Clique duas vezes em `AmazingHand控制台.exe`.

2. **Selecione a porta série**: na lista pendente superior, selecione a porta COM do ESP32 (verifique no gestor de dispositivos).

3. Clique em **«Ligar»**: a luz de estado fica verde e o registo mostra "ligado".

4. Clique nos botões de gesto: **pedra / tesoura / papel / joia / OK / pinça / apontar / abrir / punho fechado**; a mão hábil executa.

5. **Mão esquerda/direita**: marque «direita»/«esquerda» para alternar (a direção espelhada do polegar é diferente).

6. **Acionamento direto dos servomotores**: arraste os 8 controlos deslizantes para controlar em tempo real o ângulo de cada servomotor (0-180°).

7. **Controlo diferencial dos dedos**: duas barras de progresso por dedo——

    - **Curvar◀▶Esticar**: curva ou estica o dedo (intervalo -70 ~ +70).

    - **Oscilar à direita◀▶Oscilar à esquerda**: oscila o dedo para os lados (intervalo 60 ~ 120, 90 = neutro).

8. **Repetir / Parar**: repete o último gesto / interrompe imediatamente.

## 3. Modo 2: execução pelo código-fonte

### Instalar as dependências

Requer **Python 3.12 de 64 bits** (o mediapipe só suporta 64 bits).

```Bash
# 1. Instalar dependências básicas
pip install -r requirements.txt

# 2. Instalar dependências de rastreio (quando precisar de rastreio de gestos, cria automaticamente o ambiente virtual)
setup_tracking.bat
```

### Executar

```Bash
# Iniciar com o ambiente de rastreio (inclui mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> Ou diretamente `python hand_gui.py`(qualquer Python com pyserial).

### Rastreamento de gestos integrado na GUI

A GUI já inclui um painel de **rastreamento de gestos** (a câmara acompanha os movimentos da mão):

1. Depois de ligar a porta série, desloque-se até ao painel «rastreamento de gestos (câmara MediaPipe)».

2. Selecione o número da câmara (predefinição 0) e clique em **«iniciar rastreamento»**.

3. Coloque a mão no enquadramento da câmara; a mão hábil acompanha curvando/esticando.

> O rastreamento exige que o `setup_tracking.bat` tenha instalado o mediapipe. O exe que dispensa instalação não inclui a função de rastreamento.

## 4. Teste por linha de comandos (serial_test.py)

```Bash
# Teste de ligação (confirmar primeiro que liga)
python serial_test.py COM3 nop

# Gesto
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# Acionamento direto de servo único
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# Centralizar tudo
python serial_test.py COM3 mid

# Definir mão esquerda/direita
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# Varredura de frequência/autoteste
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

## 5. Perguntas frequentes

|Sintoma|Solução|
|---|---|
|O servomotor não se move|Verifique a alimentação (fonte independente de 5V 3A), a porta COM e a cablagem|
|O exe fecha abruptamente|Execute pelo código-fonte (a versão empacotada pode ter dependências em falta)|
|A câmara não mostra imagem|Permita o acesso à câmara (Definições → Privacidade → Câmara)|
|O tipo de mão ficou invertido|Marque a mão esquerda/direita oposta|

> Para o protocolo completo e a descrição dos comandos, consulte `..\03_firmware_docs\用户手册.md`.

