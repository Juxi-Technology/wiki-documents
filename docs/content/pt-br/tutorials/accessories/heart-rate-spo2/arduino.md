---
title: "Tutorial de uso com Arduino"
description: "Use a biblioteca JUXI_HeartRate_SPO2 no Arduino para ler frequência cardíaca, SpO2 e temperatura da placa, incluindo fiação, código de exemplo, API e perguntas frequentes."
---

# Tutorial de uso com Arduino

## Introdução ao sensor

JUXI_HeartRate_SPO2 é um módulo sensor de frequência cardíaca e SpO2 baseado no chip MAX30102, com algoritmo integrado que emite diretamente os valores de frequência cardíaca e saturação de oxigênio no sangue.

**Principais funções:**

- Medição da saturação de oxigênio no sangue (SpO2)
- Medição da frequência cardíaca (batimentos/minuto)
- Medição da temperatura da placa
- Suporte ao modo de comunicação I2C

---

## Tutorial de uso com Arduino

### Preparação de hardware

| Materiais necessários |
|---|
| Placa de desenvolvimento Arduino (Uno/ESP32 etc.) |
| Sensor JUXI_HeartRate_SPO2 |
| Vários cabos jumper |
| Cabo USB (conecta o Arduino ao computador) |

### Instalação da biblioteca

1. Baixe o arquivo da biblioteca [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)
1. Descompacte o arquivo e copie-o para o diretório de bibliotecas do Arduino:
  - Windows: `C:\Users\<usuário>\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. Reinicie o Arduino IDE

### Envio do código de exemplo

> Atenção: ao enviar o código, conecte apenas o Arduino ao computador; não conecte o módulo de monitoramento de frequência cardíaca e SpO2 ao Arduino!

#### Opção 1: exemplo no modo UART

Comente o #define I2C_COMMUNICATION e envie o código para o Arduino.

```cpp
#include "JUXI_HeartRate_SPO2.h"

// I2C 地址
#define I2C_ADDRESS 0x57

// 创建传感器对象，I2C模式
JUXI_HeartRate_SPO2_I2C sensor(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);

  // 初始化传感器
  while (!sensor.begin()) {
    Serial.println("传感器初始化失败，请检查连接！");
    delay(1000);
  }
  Serial.println("传感器初始化成功！");

  // 启动数据采集
  sensor.sensorStartCollect();
}

void loop() {
  // 读取心率和血氧数据
  sensor.getHeartbeatSPO2();

  // 输出血氧饱和度
  Serial.print("血氧饱和度: ");
  Serial.print(sensor._sHeartbeatSPO2.SPO2);
  Serial.println(" %");

  // 输出心率
  Serial.print("心率: ");
  Serial.print(sensor._sHeartbeatSPO2.Heartbeat);
  Serial.println(" 次/分钟");

  // 读取并输出温度
  Serial.print("板载温度: ");
  Serial.print(sensor.getTemperature_C());
  Serial.println(" ℃");

  Serial.println("------------------------");

  // 传感器每4秒更新一次数据
  delay(4000);
}
```

##### Ligação de hardware

Comunicação I2C

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| Pino do sensor | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- Coloque a chave seletora do módulo de monitoramento de frequência cardíaca e SpO2 na posição IIC!!!
- Use um cabo de dados para conectar o Arduino ao computador

#### Resultado da execução:

1. Abra Arduino - Ferramentas - Monitor Serial

Defina a taxa de transmissão para 9600

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2. Abra o assistente de depuração de porta serial

[Assistente de depuração de porta serial uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

Selecione a porta serial

Defina a taxa de transmissão para `9600`

Bits de dados `8`, bit de parada `1`, paridade `NONE`, controle de fluxo `NONE`

Nas configurações de recepção e de envio, selecione `ASCII`

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### Descrição da API

| Função | Descrição |
|---|---|
| begin() | Inicializa o sensor; retorna true/false |
| getHeartbeatSPO2() | Lê os dados de frequência cardíaca e SpO2 e os armazena na estrutura _sHeartbeatSPO2 |
| getTemperature_C() | Lê a temperatura da placa (graus Celsius) |
| sensorStartCollect() | Inicia a coleta de dados (o sensor acende) |
| sensorEndCollect() | Para a coleta de dados (o sensor apaga) |

### Descrição dos dados

- **SPO2 (saturação de oxigênio no sangue)**: faixa normal 95% - 100%; o valor -1 indica inválido
- **Heartbeat (frequência cardíaca)**: faixa normal 60 - 100 batimentos/minuto; o valor -1 indica inválido
- **Causa dos valores inválidos**: dedo mal colocado ou dados ainda não estabilizados

---

## Precauções de uso

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
  - Evite luz forte incidindo diretamente sobre o sensor
  - Mantenha a temperatura ambiente adequada
  - Mantenha o ambiente tranquilo durante a medição

### Interpretação dos dados

| Faixa de SpO2 | Descrição |
|---|---|
| 95% - 100% | Normal |
| 90% - 94% | Hipóxia leve |
| < 90% | Hipóxia; recomenda-se procurar atendimento médico |

| Faixa de frequência cardíaca | Descrição |
|---|---|
| 60 - 100 batimentos/min | Faixa normal em adultos |
| < 60 batimentos/min | Bradicardia |
| > 100 batimentos/min | Taquicardia |

---

## Perguntas frequentes

### P1: o que fazer se a inicialização do sensor falhar?

**R:**

1. Verifique se a fiação está correta (SDA em GPIO2/A4, SCL em GPIO3/A5)
1. Confirme se a alimentação está normal (3.3V ou 5V)
1. Use o comando `i2cdetect -y 1` para detectar o dispositivo
1. Confirme se a chave seletora do sensor está na posição IIC

### P2: o que fazer se os dados continuarem mostrando -1?

**R:**

1. Confirme se o dedo está corretamente colocado sobre o sensor
1. Aguarde alguns segundos para os dados estabilizarem
1. Verifique se `sensorStartCollect()` foi chamado para iniciar a coleta
1. Confirme se o LED indicador do sensor está aceso

### P3: o que fazer se os dados estiverem imprecisos?

**R:**

1. Certifique-se de que o dedo cobre completamente a área óptica do sensor
1. Mantenha o dedo imóvel, sem se mover
1. Aguarde mais de 30 segundos para os dados estabilizarem
1. Faça várias medições e calcule a média

### P4: quais placas Arduino são suportadas pelo sensor?

**R:** Compatíveis:

- Arduino Uno/Mega
- ESP8266
- ESP32
- Outras placas de desenvolvimento compatíveis com o ambiente Arduino

---

## Localização dos arquivos de exemplo

### Exemplo para Arduino

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
