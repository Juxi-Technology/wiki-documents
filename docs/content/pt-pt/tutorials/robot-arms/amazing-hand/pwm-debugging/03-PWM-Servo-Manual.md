---
title: "03-Versão com servomotor PWM-Manual de utilização"
description: "Este firmware é executado na placa de desenvolvimento ESP32-S3 e, através de sinais PWM, controla 8 servomoto…"
---

# 03-Versão com servomotor PWM-Manual de utilização

## Índice

1. Visão geral

2. Ligação do hardware

3. Compilação e gravação do firmware

4. Protocolo de comunicação série

5. Referência de comandos

6. Tutorial de utilização do computador host

7. Rastreamento de gestos

8. Ajuste fino dos parâmetros de gestos

9. Perguntas frequentes

---

## 1. Visão geral

Este firmware é executado na placa de desenvolvimento **ESP32-S3** e, através de sinais PWM, controla 8 servomotores que acionam a mão hábil para executar gestos. O computador host (PC/Raspberry Pi/outro MCU) envia instruções em quadros binários pela porta série USB; o ESP32 interpreta-as, executa o gesto correspondente e devolve uma resposta.

O projeto disponibiliza duas implementações de firmware:

|Firmware|Diretório|Características|
|---|---|---|
|**Versão ESP-IDF** (recomendada)|`esp-idf/AmazingHand_Serial/`|Estrutura de projeto componentizada, duas tarefas FreeRTOS, pronta para produção|

> Os dois firmwares partilham o **mesmo protocolo série** e o **mesmo conjunto de comandos**; os parâmetros de gestos podem ser consultados entre si.

### Gestos suportados (11 comandos de gesto)

|Gesto|Comando|Descrição|
|---|---|---|
|Pedra|0x01|Pedra-papel-tesoura: todos os dedos fechados|
|Tesoura|0x02|Pedra-papel-tesoura: indicador + médio estendidos em forma de V|
|Papel|0x03|Pedra-papel-tesoura: todos os dedos abertos|
|Joia|0x04|Polegar levantado, os restantes fechados|
|Provocação 1|0x05|Agitar o indicador ("não, não, não")|
|Provocação 2|0x06|Anelar estendido e oscilando (substitui o dedo mindinho)|
|Abrir|0x07|Todos os dedos abertos|
|Punho fechado|0x08|Todos os dedos fechados|
|OK|0x09|Gesto de OK|
|Pinça|0x0A|Gesto de pinça|
|Apontar|0x0C|Indicador estendido fazendo o gesto de "apontar"|
|Acionamento direto|0xF0|Controlo direto do ângulo dos 8 servomotores|
|Definir mão esquerda/direita|0xF1|Alterna o modo mão esquerda/mão direita|
|Repetir|0xFE|Repete a execução do último gesto|
|Parar|0xFF|Interrompe imediatamente o gesto atual|
|NOP|0x00|Teste de ligação|

> Nota: o comando 0x0B foi desativado (o antigo "polegar para baixo" era idêntico ao gesto "joia" e foi removido).

---

## 2. Ligação do hardware

### Hardware aplicável

|Item|Modelo|
|---|---|
|Controlador principal|Placa de desenvolvimento **ESP32-S3** (Youxin YX-ESP32-S3 ou equivalente)|
|Servomotores|8 servomotores analógicos PWM (SG90 ou equivalente)|
|Placa adaptadora|Placa adaptadora para servomotores PWM|

A placa de desenvolvimento ESP32-S3 tem duas interfaces Type-C:

- **USB Serial/JTAG integrado**: liga-se diretamente ao controlador USB integrado do chip ESP32-S3

- **FT232 externo**: comunicação através do chip conversor série FT232

> Ambas as interfaces podem ser usadas para comunicação série; escolha qualquer uma. No computador host, selecione o nome do dispositivo série correspondente.

### Servomotor → placa adaptadora

Insira as fichas 3P dos 8 servomotores nos pinos 1-8 da placa adaptadora, conforme o número de ID.

### Placa adaptadora → ESP32-S3

|Placa adaptadora|GPIO do ESP32-S3|Descrição|
|---|---|---|
|PWM1|**4**|Junta 1 do indicador|
|PWM2|**5**|Junta 2 do indicador|
|PWM3|**6**|Junta 1 do médio|
|PWM4|**7**|Junta 2 do médio|
|PWM5|**15**|Junta 1 do anelar|
|PWM6|**16**|Junta 2 do anelar|
|PWM7|**17**|Junta 1 do polegar|
|PWM8|**18**|Junta 2 do polegar|
|5V|5V|Alimentação (extraída da placa adaptadora)|
|GND|GND|**É obrigatório ter terra comum; ligue pelo menos um fio**|

> A mão esquerda e a direita usam o mesmo mapeamento de GPIO. Ao mudar para o modo "mão esquerda", o firmware inverte o sentido de movimento do polegar dentro dos gestos; os pinos não mudam.

### Alimentação

A placa adaptadora tem dois grupos de portas de alimentação 5V/GND:

- Um grupo sai do cabo Type-C e liga-se a um adaptador de fonte de **5V 3A**

- O outro grupo alimenta o pino **5V** do ESP32-S3 (a placa de desenvolvimento já não precisa de ser alimentada pela Type-C)

---

## 3. Compilação e gravação do firmware

### 3.1 Versão ESP-IDF (recomendada)

> **Aviso: requisito de caminho**: a compilação com ESP-IDF não suporta caminhos em chinês. Certifique-se de que o caminho onde o projeto se encontra é totalmente em inglês (incluindo a pasta do utilizador e os diretórios superiores).

#### Estrutura do projeto

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # 顶层工程配置
├── sdkconfig.defaults          # 默认 Kconfig 配置
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # FreeRTOS 双任务 + 初始化（胶水层）
└── components/
    ├── hand_servo/             # 舵机驱动（LEDC PWM + 校准数据）
    ├── hand_gestures/          # 手势参数宏 + 手势函数 + 左右手控制
    └── hand_protocol/          # 串口帧解析 + 命令分发
```

#### Ambiente de compilação

- ESP-IDF **v6.0.1**

- Chip de destino: **ESP32-S3**

- Variáveis de ambiente do `idf.py` já configuradas

#### Compilação e gravação

```Bash
cd esp-idf/AmazingHand_Serial

# 1. Definir o chip de destino (na primeira vez ou ao trocar de chip)
idf.py set-target esp32s3

# 2. Compilar
idf.py build

# 3. Gravação (Windows: usar a porta COM, como COM3)
idf.py -p COM3 flash

# 4. Monitorização série (opcional, velocidade de transmissão 115200)
idf.py -p COM3 monitor
```

> Depois de alterar qualquer código-fonte em `components/` ou `main/`, basta repetir `idf.py build && idf.py -p COM3 flash`.

### 3.3 Calibração (opcional, recomendada na primeira utilização)

A posição central e a largura de impulso dos servomotores devem ser calibradas conforme o mecanismo real. Existem duas formas:

- **Versão ESP-IDF**: edite `middle_pos[8]`(linha 40) e `min_pw/mid_pw/max_pw[8]`(linhas 45-47) em `components/hand_servo/hand_servo.c`

Após a calibração, é necessário recompilar e gravar novamente.

---

## 4. Protocolo de comunicação série

### 4.1 Camada física

|Parâmetro|Valor|
|---|---|
|Interface|USB Serial (UART0)|
|Débito|**115200**|
|Bits de dados|8|
|Bit de paridade|Nenhum (None)|
|Bits de stop|1|
|Controlo de fluxo|Nenhum|

### 4.2 Formato do quadro

#### Host → ESP32 (quadro de comando)

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 帧头      命令ID    数据长度      数据负载         校验和
```

- **Cabeçalho de quadro**: fixo em `0xAA`, marca o início de um quadro

- **CMD_ID**: número do comando (ver Referência de comandos)

- **DATA_LEN**: número de bytes da carga de dados (0-8; quadros com mais de 8 são inválidos)

- **DATA**: carga de dados, cujo comprimento é determinado por DATA_LEN

- **CHECKSUM**: `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]`(verificação XOR)

> Se DATA_LEN = 0, então CHECKSUM = CMD_ID.

#### ESP32 → host (quadro de resposta)

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 帧头      命令ID    状态码    校验和
```

- **Cabeçalho de quadro**: fixo em `0xBB`

- **CMD_ID**: número original do comando

- **STATUS**: código de estado (ver a tabela abaixo)

- **CHECKSUM**: `CMD_ID ^ STATUS`

#### Códigos de estado

|STATUS|Significado|Descrição|
|---|---|---|
|0x00|OK|Comando aceite, início da execução|
|0x01|Comando inválido|CMD_ID não está na tabela de comandos|
|0x02|Erro de parâmetro|Comprimento ou conteúdo dos dados incorreto|
|0x03|Ocupado|Gesto em execução; novas ordens não são aceites temporariamente|
|0x10|Concluído|Execução do gesto terminada|

### 4.3 Sequência de comunicação

```Plaintext
主机                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  发送"石头"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (执行手势中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手势执行完毕
 │                              │
 │──── [AA 02 00 02] ────────→│  发送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 Parar gesto & tempo limite de quadro

- Enviar `[AA FF 00 FF]` pode interromper a qualquer momento o gesto em execução

- Se o ESP32 não receber um quadro completo em 200ms, descarta-o automaticamente (evita perda permanente de sincronismo por perda de bytes)

- Quadros com soma de verificação incompatível são descartados silenciosamente; o computador host deve implementar reenvio por tempo limite

### 4.5 Modo mão esquerda/direita

Modo predefinido: mão direita. Envie `[AA F1 01 02 F2]` para mudar para a mão esquerda e `[AA F1 01 01 F1]` para voltar à mão direita. A mão esquerda/direita afeta o sentido de movimento do polegar (gestos que envolvem o polegar, como pedra/tesoura/joia/OK/pinça).

---

## 5. Referência de comandos

### 5.1 Comandos de gesto (0x01-0x0A, 0x0C)

Estes comandos não precisam de carga de dados (DATA_LEN=0); o ESP32 executa imediatamente o gesto correspondente ao recebê-los.

|Comando|Quadro HEX|Resposta|Descrição|
|---|---|---|---|
|Pedra|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|Todos os dedos fechados|
|Tesoura|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|Indicador + médio estendidos|
|Papel|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|Todos os dedos abertos|
|Joia|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|Polegar levantado|
|Provocação 1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|Agitar o indicador (aprox. 2.5s)|
|Provocação 2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|Anelar oscilando (aprox. 2.5s)|
|Abrir|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|Todos os dedos abertos|
|Punho fechado|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|Todos os dedos fechados|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|Gesto de OK|
|Pinça|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|Gesto de pinça|
|Apontar|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|Indicador estendido fazendo o gesto de "apontar"|

### 5.2 Comando de acionamento direto (0xF0)

Controla diretamente o ângulo dos 8 servomotores; os 8 bytes de dados correspondem aos servomotores 1-8, e cada byte tem valor de 0-180.

**Exemplo: centralizar todos os servomotores (90°)**

```Plaintext
发送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 个 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 帧头
```

Soma de verificação = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> O XOR de 8 valores 0x5A iguais, dois a dois, resulta em 0x00; no final, `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**Exemplo: indicador aberto(servomotor 1 = 170°, servomotor 2 = 10°), os restantes centrados(90°)**

```Plaintext
发送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 Definir mão esquerda/direita (0xF1)

1 byte de dados: `0x01` = mão direita, `0x02` = mão esquerda.

```Plaintext
设右手: AA F1 01 01 F1
设左手: AA F1 01 02 F2
```

### 5.4 Comandos de controlo

|Comando|Quadro HEX|Descrição|
|---|---|---|
|NOP|`AA 00 00 00`|Teste de ligação, devolve imediatamente `BB 00 00 00`|
|Repetir|`AA FE 00 FE`|Repete a execução do último gesto|
|Parar|`AA FF 00 FF`|Interrompe imediatamente o gesto atual|

### 5.5 Consulta rápida de respostas

Ao receber um comando inválido (usando o comando inexistente 0xFC como exemplo):

```Plaintext
发送: AA FC 00 FC
响应: BB FC 01 FD    （STATUS=0x01 无效命令）
```

> Verificação da soma: `FC ^ 00 = FC`, resposta `FC ^ 01 = FD`

---

## 6. Tutorial de utilização do computador host

O diretório raiz do projeto disponibiliza duas ferramentas de host:

|Ferramenta|Ficheiro|Tipo|Utilização|
|---|---|---|---|
|**Interface gráfica**|`hand_gui.py` / exe empacotado|Visual|Fazer gestos com botões, acionamento direto por controlos deslizantes, registo|
|**Teste por linha de comandos**|`serial_test.py`|Por instruções|Enviar gestos/servomotor único/varredura, testes automatizados|

> Ambos dependem apenas do `pyserial`. Instalação: `pip install -r requirements.txt`

### 6.1 GUI visual (recomendada)

#### Modo A: executar o exe empacotado (para o cliente)

1. Obtenha o `AmazingHand控制台.exe`(ou o diretório após extração)

2. **Clique duas vezes no exe** para executar diretamente, sem precisar de instalar Python

3. Siga os passos abaixo para ligar e utilizar

#### Modo B: executar a partir do código-fonte

```Bash
# 1. Instalar dependências
pip install -r requirements.txt

# 2. Executar
python hand_gui.py
```

#### Passos de utilização da GUI

1. **Selecione a porta série**: no menu pendente superior, selecione a porta COM correspondente ao ESP32 (veja no gestor de dispositivos do Windows)

2. **Clique em "Ligar"**: a luz de estado fica verde, a área de registo mostra "ligado" e envia automaticamente um teste de ligação NOP

3. **Comandos de gesto**: clique nos botões «pedra», «tesoura», «papel», «joia», «OK»… e a mão mecânica executa o gesto correspondente

4. **Mão esquerda/direita**: marque «direita»/«esquerda» para alternar a direção espelhada do polegar

5. **Acionamento direto dos servomotores**: arraste os 8 controlos deslizantes para controlar em tempo real o ângulo de cada servomotor (0-180°)

6. **Controlo diferencial dos dedos** (recomendado): duas barras de progresso por dedo — **curvar/esticar** controla os dois servomotores do dedo em diferencial inverso (curvar/estender),e **oscilar à direita/à esquerda** controla a oscilação no mesmo sentido. Os dois graus de liberdade são independentes e acionados em sincronia

7. **Repetir / Parar**: repete o último gesto / interrompe imediatamente o gesto atual

8. **Registo de comunicação**: a parte inferior mostra em tempo real os quadros enviados e recebidos e o estado das respostas

### Descrição do controlo diferencial dos dedos

Cada dedo é **acionado em diferencial por dois servomotores**, com dois graus de liberdade ortogonais:

|Barra de progresso|Função|Efeito mecânico|
|---|---|---|
|**Curvar◀▶Esticar**|Os dois servomotores rodam em sentidos opostos (diferencial)|O dedo curva ou estica|
|**Oscilar à direita◀▶Oscilar à esquerda**|Os dois servomotores rodam no mesmo sentido|O dedo oscila para os lados|

- Intervalo do controlo deslizante **curvar/esticar**: -70 ~ +70 (0 = neutro, +70 = totalmente esticado, -70 = totalmente curvado)

- Intervalo do controlo deslizante **oscilação lateral**: 60 ~ 120 (90 = neutro, 60 = oscilar à direita, 120 = oscilar à esquerda)

- Ângulo do servomotor = `oscilação ± curvatura`; os dois servomotores são atualizados de forma **sincronizada** e o comando de acionamento direto é enviado

> Exemplo (indicador GPIO4/5): arrastar o controlo de curvatura para +70 e manter a oscilação em 90 → servomotor 4 = 160°, servomotor 5 = 20°(totalmente esticado); arrastar a curvatura para -70 → servomotor 4 = 20°, servomotor 5 = 160°(totalmente curvado).

### 6.2 Teste por instruções (serial_test.py)

#### Utilização por linha de comandos

```Bash
# Ver a ajuda
python serial_test.py

# Teste de ligação
python serial_test.py COM3 nop

# Enviar gesto
python serial_test.py COM3 rock        # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# Acionamento direto de servo único
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# Centralizar tudo
python serial_test.py COM3 mid

# Definir mão esquerda/direita
python serial_test.py COM3 hand L       # 左手
python serial_test.py COM3 hand R       # 右手

# Varredura de frequência / autoteste
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

#### Modo interativo

```Bash
python serial_test.py COM3
```

Entra no REPL; escreva diretamente os comandos abreviados (por exemplo `servo 3 180`, `rock`, `mid`, `quit`).

### 6.3 Teste manual com ferramenta série (opcional)

**CoolTerm** (macOS/Windows/Linux):

1. Abra o CoolTerm, `Options` → defina o débito em 115200, 8N1

2. `Connection` → `Send String` → selecione `Hex`

3. Introduza `AA 01 00 01` → enviar → a mão mecânica executa "pedra"

4. Observe a área de resposta a mostrar `BB 01 00 01 ... BB 01 10 11`

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Script de controlo em Python (desenvolvimento personalizado)

```Python
#!/usr/bin/env python3
"""灵巧手串口控制 - Python 上位机示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # 修改为实际端口
BAUD_RATE   = 115200

# Definição de comandos (igual ao conjunto de comandos do firmware)
CMD = {
    "nop":       0x00,
    "rock":      0x01,
    "scissors":  0x02,
    "paper":     0x03,
    "thumbs_up": 0x04,
    "taunt1":    0x05,
    "taunt2":    0x06,
    "open":      0x07,
    "close":     0x08,
    "ok":        0x09,
    "pinch":     0x0A,
    "index":     0x0C,
    "direct":    0xF0,
    "set_side":  0xF1,
    "repeat":    0xFE,
    "stop":      0xFF,
}

def calc_checksum(cmd_id, data=b""):
    """计算 XOR 校验和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """发送命令帧，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"发送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """读取一个响应帧 [0xBB CMD STATUS CKSUM]"""
    ser.timeout = timeout
    while True:
        b = ser.read(1)
        if not b:
            return None
        if b[0] == 0xBB:
            buf = ser.read(3)
            if len(buf) == 3:
                expected = buf[0] ^ buf[1]
                if expected == buf[2]:
                    return bytes([0xBB]) + buf
    return None

def set_side(ser, side):
    """设置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驱 8 路舵机: angles 为 8 个 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== Exemplo de utilização =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # 等待 ESP32 复位完成

# 1. Teste de ligação
    print("=== NOP 链路测试 ===")
    send_command(ser, CMD["nop"])

# 2. Jogo do pedra-papel-tesoura
    print("\n=== 猜拳: 石头 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. Gesto de polegar para cima
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. Parar o teste
    print("\n=== 停止测试 ===")
    send_command(ser, CMD["taunt1"])  # 开始摇食指
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # 立即停止

# 5. Modo de acionamento direto: centralizar tudo
    print("\n=== 直驱: 归中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. Rastreamento de gestos

Utiliza a **câmara para reconhecer a palma da mão em tempo real** e aciona a curvatura/extensão e a oscilação lateral dos dedos da mão hábil. Baseado no algoritmo de rastreamento de mãos do AmazingHand oficial (21 pontos-chave do MediaPipe + rotação em coordenadas de mundo 3D).

### 7.1 Princípio

- A câmara aponta para a palma da mão → o MediaPipe reconhece 21 pontos-chave da mão

- Constrói um sistema de coordenadas local da mão e calcula os vetores 3D das pontas dos 4 dedos

- Vetores das pontas dos dedos → parâmetros diferenciais (flex, base) de cada dedo → reutiliza o protocolo de acionamento direto para enviar aos servomotores

### 7.2 Requisitos de ambiente

O rastreamento de gestos depende de **Python de 64 bits + mediapipe 0.10.14** (API solutions antiga; só ela consegue trabalhar com coordenadas de mundo 3D):

|Dependência|Versão|
|---|---|
|Python|3.12 de 64 bits|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **Atenção**: o ambiente predefinido atual é Python de 32 bits e não permite instalar o mediapipe. É necessário instalar separadamente o Python 3.12 de 64 bits (instale na unidade D, por exemplo em `D:\Python312-64`, coexistindo totalmente com o de 32 bits existente, sem conflito).

### 7.3 Implementação com um clique

1. Instale o Python 3.12 de 64 bits (descarregue o instalador de 64 bits em [python.org](https://www.python.org/downloads/) e instale em `D:\Python312-64`)

2. Clique duas vezes em **`setup_tracking.bat`** no diretório raiz do projeto

    - Localiza automaticamente o Python de 64 bits

    - Cria o ambiente virtual `tracking_env`

    - Instala o mediapipe 0.10.14 e outras dependências

    - Valida a instalação

### 7.4 Passos de utilização

1. Inicie a GUI com o ambiente de rastreamento:

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. Ligue a porta série (selecione a porta COM correspondente ao ESP32)

3. No painel "rastreamento de gestos", selecione o número da câmara (predefinição 0)

4. Clique em **"iniciar rastreamento"** → a imagem da câmara aparece no painel

5. Aponte a palma da mão para a câmara:

    - **Curvar/esticar os dedos** → o dedo correspondente da mão hábil curva/estica

    - **Virar a palma para a esquerda/direita** → os dedos da mão hábil oscilam para os lados

6. Clique em **"parar rastreamento"** para terminar

> Se nenhuma mão for detetada, o painel mostra "nenhuma mão detetada"; após a deteção, mostra "mão detetada: Right/Left".

### 7.5 Calibração de parâmetros

Os coeficientes de mapeamento estão no fim de `hand_tracking.py`(`FLEX_SCALE` / `BASE_SCALE`):

```Python
FLEX_SCALE = 80.0    # 指尖 z 分量 → 弯曲/伸直 (flex)
BASE_SCALE = 30.0    # 指尖 x 分量 → 左右摆动 (base)
```

Se a amplitude de curvatura/extensão for insuficiente ou o sentido estiver invertido, ajuste `FLEX_SCALE`; se a amplitude de oscilação lateral for insuficiente ou estiver invertida, ajuste `BASE_SCALE`(o sinal positivo/negativo ajusta o sentido).

---

## 8. Ajuste fino dos parâmetros de gestos

### 8.1 Localização dos parâmetros

O deslocamento angular de cada gesto é definido com a macro `#define`; **não é necessário alterar o código lógico**, apenas os valores.

- **Versão ESP-IDF**: secção "parâmetros de gestos (ajustáveis pelo utilizador)" no topo de `components/hand_gestures/hand_gestures.c`

### 8.2 Significado dos parâmetros

```C
// Exemplo: gesto de pedra
#define ROCK_IDX_OFF1    70    // Deslocamento da junta 1 do indicador
#define ROCK_IDX_OFF2   -70    // Deslocamento da junta 2 do indicador
```

- **Valor positivo = curvar e fechar**, **valor negativo = estender e abrir**

- Cada dedo tem 2 deslocamentos, relativos a `middle_pos`(predefinição 90°)

- Estrutura diferencial: a diferença entre os deslocamentos dos dois servomotores = extensão/contração; a componente de mesmo sentido = desvio lateral

### 8.3 Passos de ajuste dos parâmetros

1. Localize a macro `#define` do gesto correspondente

2. Modifique o valor (aumentar → amplitude maior; diminuir → amplitude menor)

3. Recompile e grave novamente e teste o efeito com o computador host

4. Ajuste repetidamente até o movimento ficar natural

---

## 9. Perguntas frequentes

### Q1: O computador host não consegue ligar-se à porta série?

1. Confirme que o ESP32 está ligado ao computador por Type-C

2. Verifique se o número da porta COM no gestor de dispositivos é igual ao selecionado na GUI

3. Confirme o débito de 115200

4. Feche outros softwares que estejam a usar a porta série

### Q2: Enviei um comando e não houve reação?

1. Envie primeiro `AA 00 00 00`(NOP); deve receber `BB 00 00 00`

2. Confirme que o firmware foi gravado e que o chip de destino é o ESP32-S3

3. Verifique a cablagem (se o GND está em comum)

### Q3: A amplitude do gesto está errada ou o sentido está invertido?

Vá ao ajuste fino dos parâmetros de gestos (ver secção 7) e ajuste a macro correspondente.

### Q4: Que gestos o modo mão esquerda/direita afeta?

Gestos que **envolvem o polegar**, como pedra/tesoura/joia/OK/pinça; após alternar a mão esquerda/direita, o sentido do polegar é espelhado.

### Q5: Os dedos ficam presos e não estendem?

Todos os gestos de contração executam automaticamente "primeiro abrir toda a mão e depois fechar", para evitar que os dedos fiquem bloqueados pelo gesto anterior. Se ainda ficarem presos, verifique a montagem mecânica ou reduza a amplitude de contração.

