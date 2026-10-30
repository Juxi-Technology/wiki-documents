---
title: "Tutorial de utilização com Raspberry Pi"
description: "Ligue o módulo de frequência cardíaca e SpO2 MAX30102 ao Raspberry Pi via I2C ou UART, incluindo configuração do ambiente, código de exemplo, API e perguntas frequentes."
---

# Tutorial de utilização com Raspberry Pi

## Introdução ao projeto

JUXI_HeartRate_SPO2 é um módulo sensor de frequência cardíaca e SpO2 baseado no chip MAX30102, com algoritmo integrado que emite diretamente os valores de frequência cardíaca e saturação de oxigénio no sangue.

**Principais funções:**

- Medição da saturação de oxigénio no sangue (SpO2)
- Medição da frequência cardíaca (batimentos/minuto)
- Medição da temperatura da placa
- Suporte a dois modos de comunicação: UART e I2C

---

## Preparação de hardware

| Materiais necessários | Descrição |
|---|---|
| Raspberry Pi (2/3/4/Zero, qualquer um) | Recomenda-se Raspberry Pi 3B+ ou 4B |
| Sensor JUXI_HeartRate_SPO2 | Módulo sensor de frequência cardíaca e SpO2 |
| Vários cabos jumper | 4 cabos jumper fêmea-fêmea |
| Fonte de alimentação | Fonte específica para Raspberry Pi |

---

## Ligação de hardware

### Opção 1: comunicação I2C (recomendada)

A ligação da comunicação I2C é simples e é a recomendada.

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/01.png)

| Pino do sensor | Pino físico do Raspberry Pi | Numeração BCM | Descrição |
|---|---|---|---|
| VCC | 1 ou 17 | - | Alimentação 3.3V (também pode ligar a 5V) |
| GND | 6 ou 9 ou 14 | - | Terra |
| SDA | 3 | GPIO2 | Linha de dados I2C |
| SCL | 5 | GPIO3 | Linha de clock I2C |

**Importante:** coloque a chave seletora do sensor na posição **IIC**!

### Opção 2: comunicação série UART

A comunicação UART requer ligação cruzada.

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/02.png)

| Pino do sensor | Pino físico do Raspberry Pi | Numeração BCM | Descrição |
|---|---|---|---|
| VCC | 2 ou 4 | - | Alimentação 5V (também pode ligar a 3.3V) |
| GND | 6 ou 9 ou 14 | - | Terra |
| RX | 8 | GPIO14 | RX do sensor liga ao TX do Raspberry Pi |
| TX | 10 | GPIO15 | TX do sensor liga ao RX do Raspberry Pi |

**Importante:** coloque a chave seletora do sensor na posição **UART**!

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/03.png)

---

## Configuração do ambiente

### 1. Ativar o I2C (necessário no modo I2C)

```bash
sudo raspi-config
```

Selecione `Interface Options` → `I2C` → escolha `Yes` para ativar

Reinicie o Raspberry Pi:

```bash
sudo reboot
```

### 2. Ativar a porta série (necessário no modo UART)

```bash
sudo raspi-config
```

Selecione `Interface Options` → `Serial`

- Primeira pergunta: "Would you like a login shell to be accessible over serial?" → selecione `No`
- Segunda pergunta: "Would you like the serial port hardware to be enabled?" → selecione `Yes`

Reinicie o Raspberry Pi:

```bash
sudo reboot
```

### 3. Instalar as bibliotecas de dependência

```bash
# 更新软件源
sudo apt-get update

# 安装 I2C 工具和 smbus2 库（I2C 模式必须使用 smbus2）
sudo apt-get install -y i2c-tools python3-smbus2

# 安装 pyserial（串口支持）
sudo pip3 install pyserial
```

> **Atenção:** no modo I2C é obrigatório instalar o `smbus2`; não utilize a versão antiga `python-smbus`.
A biblioteca utiliza internamente `smbus2.i2c_msg` para implementar transações I2C independentes em duas etapas (primeiro escreve o endereço do registo e envia STOP,
depois inicia uma nova transação de leitura para ler vários bytes consecutivos), para corresponder aos requisitos de temporização I2C do chip sensor.

### 4. Verificar a ligação I2C (modo I2C)

Depois de concluir a ligação, execute o seguinte comando para detetar dispositivos I2C:

```bash
i2cdetect -y 1
```

Se aparecer o endereço `0x57`, a ligação do sensor foi bem-sucedida.

---

## Utilização do código de exemplo

[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Estrutura dos ficheiros

```bash
python/raspberry/
├── JUXI_HeartRate_SPO2.py      # 主库文件
└── examples/
    ├── i2c_example.py          # I2C 模式示例
    └── uart_example.py         # UART 模式示例
```

### Executar o exemplo no modo I2C

```bash
cd python/raspberry/examples
```

```bash
sudo python3 i2c_example.py
```

### Executar o exemplo no modo UART

```bash
cd python/raspberry/examples
```

```bash
sudo python3 uart_example.py
```

**Atenção:** é necessário `sudo` para utilizar a porta série de hardware.

### Resultados da execução

Se tudo estiver normal, verá uma saída semelhante a esta:

```bash
==================================================
JUXI 心率血氧传感器 - I2C 模式
==================================================

正在初始化 I2C 总线 1，地址 0x57...
传感器初始化成功！

开始数据采集...
传感器 LED 已亮起！

请将手指放在传感器上...

血氧饱和度: 98 %
心率: 72 次/分钟
板载温度: 25.5 ℃
...
```

Pressione `Ctrl+C` para parar o programa.

---

## Referência da API

### Classe: JUXI_HeartRate_SPO2_i2c

Classe do sensor para comunicação I2C.

**Construtor**

`JUXI_HeartRate_SPO2_i2c(bus_number=1, i2c_address=0x57)`

Parâmetros:

- `bus_number`: número do barramento I2C; no Raspberry Pi normalmente é 1
- `i2c_address`: endereço I2C do sensor; predefinido 0x57

**Métodos**

| Método | Descrição | Valor de retorno |
|---|---|---|
| begin() | Inicializa o sensor e deteta a ligação | bool (True em caso de sucesso) |
| sensor_start_collect() | Inicia a recolha de dados (o sensor acende) | Nenhum |
| sensor_end_collect() | Para a recolha de dados (o sensor apaga) | Nenhum |
| get_heartbeat_SPO2() | Lê os dados de frequência cardíaca e SpO2 | Nenhum (o resultado fica armazenado nos atributos do objeto) |
| get_temperature_c() | Lê a temperatura da placa | float (graus Celsius) |
| close() | Fecha a ligação I2C | Nenhum |

**Atributos**

| Atributo | Descrição |
|---|---|
| SPO2 | Saturação de oxigénio no sangue (%), valor inválido é -1 |
| heartbeat | Frequência cardíaca (batimentos/minuto), valor inválido é -1 |

---

### Classe: JUXI_HeartRate_SPO2_uart

Classe do sensor para comunicação série UART.

**Construtor**

`JUXI_HeartRate_SPO2_uart(port='/dev/serial0', baudrate=9600)`

Parâmetros:

- `port`: caminho do dispositivo série; no Raspberry Pi o predefinido é `/dev/serial0`
- `baudrate`: débito em bauds; predefinido 9600

**Métodos**

Iguais aos de `JUXI_HeartRate_SPO2_i2c`.

---

## Perguntas frequentes

### P1: o que fazer se a inicialização do sensor falhar?

**R:** Verifique de acordo com os seguintes passos:

1. **Verifique a cablagem**
  - Modo I2C: confirme que SDA está em GPIO2 e SCL em GPIO3
  - Modo UART: confirme que RX-TX estão ligados de forma cruzada

1. **Verifique a chave seletora do sensor**
  - Modo I2C: a chave deve estar na posição IIC
  - Modo UART: a chave deve estar na posição UART

1. **Verifique a alimentação**
  - Confirme que VCC está ligado a 3.3V ou 5V
  - Confirme que GND está ligado

1. **Verifique as configurações do sistema**
  - Modo I2C: confirme que o I2C está ativado
  - Modo UART: confirme que a porta série está ativada

1. **Utilize o comando de deteção**

```bash
# I2C 模式
i2cdetect -y 1

# UART 模式
ls /dev/serial*
```

### P2: o que fazer se os dados continuarem a apresentar -1?

**R:**

1. Confirme se o dedo está corretamente colocado sobre o sensor, cobrindo completamente os dois LEDs
1. Aguarde alguns segundos para os dados estabilizarem (normalmente são necessários 10-30 segundos)
1. Verifique se `sensor_start_collect()` foi chamado para iniciar a recolha
1. Confirme se o LED indicador do sensor está aceso

### P3: o que fazer se os dados estiverem imprecisos?

**R:**

1. Certifique-se de que o dedo cobre completamente a área ótica do sensor
1. Mantenha o dedo imóvel, sem se mover
1. Aguarde mais de 30 segundos para os dados estabilizarem
1. Faça várias medições e calcule a média
1. Evite luz forte a incidir diretamente sobre o sensor

### P4: é possível utilizar I2C e UART ao mesmo tempo?

**R:** Não; só é possível escolher um modo de comunicação de cada vez.

### P5: é necessário executar com sudo?

**R:**

- Modo I2C: recomenda-se utilizar sudo para evitar problemas de permissão
- Modo UART: é obrigatório utilizar sudo, caso contrário não é possível aceder à porta série

---

## Precauções

### Técnicas de medição

1. **Coloque o dedo corretamente**
  - Apoie o dedo levemente sobre o sensor, cobrindo os dois LEDs
  - Não pressione com força, para não afetar a circulação sanguínea
  - Mantenha o dedo estável, sem se mover

1. **Aguarde a estabilização dos dados**
  - No início da medição, os valores podem ficar instáveis
  - Recomenda-se aguardar 10-30 segundos, até os dados estabilizarem, antes de ler
  - O sensor atualiza os dados a cada 4 segundos

1. **Requisitos de ambiente**
  - Evite luz forte a incidir diretamente sobre o sensor
  - Mantenha a temperatura ambiente adequada
  - Mantenha o ambiente tranquilo durante a medição

### Interpretação dos dados

| Faixa de SpO2 | Descrição |
|---|---|
| 95% - 100% | Normal |
| 90% - 94% | Hipóxia ligeira |
| < 90% | Hipóxia; recomenda-se procurar assistência médica |

| Faixa de frequência cardíaca | Descrição |
|---|---|
| 60 - 100 batimentos/min | Faixa normal em adultos |
| < 60 batimentos/min | Bradicardia |
| > 100 batimentos/min | Taquicardia |

### Avisos de segurança

- Este sensor serve apenas como referência e não substitui equipamentos médicos profissionais
- Em caso de problemas de saúde, consulte um médico imediatamente
- Os resultados das medições são apenas de referência e não servem como base para diagnóstico
