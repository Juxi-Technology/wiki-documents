---
title: "PC · Execução em Python"
description: "Leia dados de frequência cardíaca e SpO2 do MAX30102 no Windows via USB para TTL e script Python, incluindo driver, porta COM, passos de execução e registradores Modbus."
---

# PC · Execução em Python

## Índice

1. Preparação de hardware
1. Ligação de hardware
1. Configuração do ambiente de software
1. Executar o programa de exemplo
1. Perguntas frequentes

---

## Preparação de hardware

### Materiais necessários

| Material | Descrição |
|---|---|
| Sensor JUXI_HeartRate_SPO2 | Módulo de frequência cardíaca e SpO2 |
| Módulo USB para TTL | CH340 / CP2102 / FT232 etc. |
| Cabos jumper | 4 (fêmea-fêmea) |
| Computador Windows | Win7/Win10/Win11 |

---

## Ligação de hardware

### Modo de ligação

| Pino do sensor | Pino do módulo USB para TTL | Descrição |
|---|---|---|
| VCC | 3.3V ou 5V | Polo positivo da alimentação |
| GND | GND | Polo negativo da alimentação |
| TX | RX | Sensor envia → módulo recebe |
| RX | TX | Sensor recebe → módulo envia |

![Diagrama](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **Aviso importante**:

1. Chave seletora do módulo na posição UART!!!
1. **TX e RX devem ser ligados de forma cruzada!**
1. O sensor suporta 3.3V e 5V; não ligue a tensão errada
1. Ligue todos os cabos primeiro e só depois insira o USB no computador

### Diagrama de ligação

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## Configuração do ambiente de software

### Instalar o driver

Instale o driver correspondente de acordo com o modelo do chip USB para TTL:

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

Depois de instalar, insira o módulo USB para TTL.

### Verificar a porta COM

#### Método 1: Gerenciador de Dispositivos

1. Pressione `Win + X` e selecione "Gerenciador de Dispositivos"
1. Expanda "Portas (COM e LPT)"
1. Veja o número da porta COM correspondente ao seu USB para TTL (por exemplo, COM3)

#### Método 2: detecção automática pelo programa

Ao executar o programa de exemplo, todas as portas seriais disponíveis são listadas automaticamente.

### Instalar as dependências do Python

Abra o Prompt de Comando (CMD) ou o PowerShell e execute:

```bash
pip install pyserial
```

---

## Executar o programa de exemplo

Baixe e descompacte o arquivo [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Localização dos arquivos

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### Passos de execução

1. **Confirme se a ligação de hardware está correta**
  - VCC → 3.3V/5V
  - GND → GND
  - TX → RX (cruzado)
  - RX → TX (cruzado)

1. **Insira o USB no computador**
1. **Execute o programa**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **Siga as instruções apresentadas**
  - O programa lista todas as portas seriais disponíveis
  - Insira o número da sua porta COM (por exemplo, COM3)
  - O programa detecta automaticamente o sensor e inicia a medição

### Saída esperada

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

Pressione `Ctrl + C` para parar o programa.

---

## Descrição das funções do programa

### API principal

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## Perguntas frequentes

### P1: o que fazer se a porta COM não for encontrada?

**R:**

1. Verifique se o USB para TTL está bem inserido
1. Reinstale o driver
1. Tente outra porta USB
1. Verifique no Gerenciador de Dispositivos se há algum "Dispositivo desconhecido"

### P2: o que fazer se a inicialização do sensor falhar?

**R:**

1. Verifique a fiação:
  - VCC e GND estão ligados corretamente?
  - **TX e RX estão ligados de forma cruzada?** (problema mais comum)

1. Confirme que a taxa de transmissão é 9600
1. Verifique se o módulo USB para TTL funciona corretamente
1. Desconecte e reconecte o USB

### P3: o que fazer se os dados continuarem mostrando -1?

**R:**

1. Confirme se o dedo está corretamente colocado sobre o sensor (cobrindo completamente a área do LED)
1. Mantenha o dedo estável, sem se mover
1. Aguarde alguns segundos para os dados estabilizarem
1. Verifique se o LED do sensor está aceso

### P4: o LED não acende, mas a comunicação funciona?

**R:**

- Pode ser um problema de hardware do LED, mas o sensor funciona normalmente
- Se os dados estiverem normais, pode ignorar o problema do LED não acender

### P5: o que fazer se a porta serial estiver ocupada?

**R:**

1. Feche outros softwares de porta serial (assistente de porta serial, Arduino IDE etc.)
1. Verifique se há outro programa Python em execução
1. Desconecte e reconecte o USB

### P6: o que fazer se os dados estiverem imprecisos?

**R:**

1. Certifique-se de que o dedo cobre completamente a área óptica do sensor
1. Mantenha o ambiente tranquilo durante a medição; não fale nem se mova
1. Aguarde mais de 30 segundos para os dados estabilizarem
1. Faça várias medições e calcule a média

---

## Especificações técnicas

| Parâmetro | Especificação |
|---|---|
| Modo de comunicação | UART (nível TTL) |
| Taxa de transmissão | 9600 bps (padrão) |
| Formato de dados | 8N1 (8 bits de dados, sem paridade, 1 bit de parada) |
| Tensão de alimentação | 3.3V / 5V |
| Faixa de medição de SpO2 | 35% - 100% |
| Faixa de medição de frequência cardíaca | 30 - 250 BPM |
| Endereço do dispositivo Modbus | 0x20 |

---

## Descrição dos registradores Modbus

| Endereço do registrador | Função | Descrição |
|---|---|---|
| 0x02 | ID do dispositivo | Leitura: retorna 0x0020 |
| 0x06-0x09 | Dados de frequência cardíaca e SpO2 | Leitura: SpO2 + frequência cardíaca |
| 0x0A | Temperatura | Leitura: temperatura da placa |
| 0x10 | Controle de coleta | Escrita: 0x0001=iniciar, 0x0002=parar |
