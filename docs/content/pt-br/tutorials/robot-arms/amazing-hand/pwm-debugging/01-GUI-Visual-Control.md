---
title: "01-Controle visual por GUI"
description: "Comandos de gestos visuais — Tutorial de uso"
---

# 01-Controle visual por GUI

Comandos de gestos visuais — Tutorial de uso

Este diretório fornece uma **ferramenta de controle pelo computador host**: depois de conectar o ESP32, use o computador para clicar em botões ou digitar comandos e fazer a mão hábil executar gestos.

> Aplicável a: ESP32-S3 + 8 canais de servomotores PWM (acionamento diferencial). Para a gravação do firmware, consulte as instruções em `..\03_firmware_docs`.

## 1. Duas formas de uso

|Modo|Requisito|Indicado para|
|---|---|---|
|**Programa empacotado**(recomendado)|Clique duas vezes em `AmazingHand控制台.exe`|Dispensa instalar Python, use imediatamente|
|**Execução pelo código-fonte**|Python 3.12 de 64 bits|Necessário para rastreamento de gestos ou personalização|

## 2. Modo 1: clique duplo no exe

1. Clique duas vezes em `AmazingHand控制台.exe`.

2. **Selecione a porta serial**: na lista suspensa superior, selecione a porta COM do ESP32 (verifique no gerenciador de dispositivos).

3. Clique em **«Conectar»**: a luz de status fica verde e o log mostra "conectado".

4. Clique nos botões de gesto: **pedra / tesoura / papel / joia / OK / pinça / apontar / abrir / punho fechado**; a mão hábil executa.

5. **Mão esquerda/direita**: marque «direita»/«esquerda» para alternar (a direção espelhada do polegar é diferente).

6. **Acionamento direto dos servomotores**: arraste os 8 controles deslizantes para controlar em tempo real o ângulo de cada servomotor (0-180°).

7. **Controle diferencial dos dedos**: duas barras de progresso por dedo——

    - **Curvar◀▶Esticar**: curva ou estica o dedo (faixa -70 ~ +70).

    - **Oscilar à direita◀▶Oscilar à esquerda**: oscila o dedo para os lados (faixa 60 ~ 120, 90 = neutro).

8. **Repetir / Parar**: repete o último gesto / interrompe imediatamente.

## 3. Modo 2: execução pelo código-fonte

### Instalar as dependências

Requer **Python 3.12 de 64 bits** (o mediapipe só suporta 64 bits).

```Bash
# 1. Instalar dependências básicas
pip install -r requirements.txt

# 2. Instalar dependências de rastreamento (quando precisar de rastreamento de gestos, cria automaticamente o ambiente virtual)
setup_tracking.bat
```

### Executar

```Bash
# Iniciar com o ambiente de rastreamento (inclui mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> Ou diretamente `python hand_gui.py`(qualquer Python com pyserial).

### Rastreamento de gestos integrado à GUI

A GUI já inclui um painel de **rastreamento de gestos** (a câmera acompanha os movimentos da mão):

1. Depois de conectar a porta serial, role até o painel «rastreamento de gestos (câmera MediaPipe)».

2. Selecione o número da câmera (padrão 0) e clique em **«iniciar rastreamento»**.

3. Coloque a mão no quadro da câmera; a mão hábil acompanha curvando/esticando.

> O rastreamento exige que o `setup_tracking.bat` tenha instalado o mediapipe. O exe que dispensa instalação não inclui a função de rastreamento.

## 4. Teste por linha de comando (serial_test.py)

```Bash
# Teste de link (confirmar primeiro que conecta)
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
|O servomotor não se move|Verifique a alimentação (fonte independente de 5V 3A), a porta COM e a fiação|
|O exe fecha de repente|Execute pelo código-fonte (a versão empacotada pode ter dependências ausentes)|
|A câmera não mostra imagem|Permita o acesso à câmera (Configurações → Privacidade → Câmera)|
|O tipo de mão ficou invertido|Marque a mão esquerda/direita oposta|

> Para o protocolo completo e a descrição dos comandos, consulte `..\03_firmware_docs\用户手册.md`.

