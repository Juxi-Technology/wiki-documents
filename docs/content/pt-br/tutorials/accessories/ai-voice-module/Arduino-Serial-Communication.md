---
title: "Comunicação por porta serial"
description: "1. Abra o arquivo UARTVoice.ino"
---

# Comunicação por porta serial

## 📁 Estrutura de arquivos

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 Conexão de hardware

### Conectar ao módulo de voz

> 💡 **Atenção:** RX e TX precisam ser conectados em cruzamento!
> 
> 

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Compilação e upload

### Primeiro passo: abrir o Arduino IDE

1. Abra o arquivo `UART_Voice.ino`

2. Selecione o modelo da sua placa de desenvolvimento (como o Arduino Uno)

3. Selecione a porta serial correspondente

### Segundo passo: compilar e enviar

1. Clique no botão ✔️ para compilar

2. Clique no botão ➡️ para enviar à placa de desenvolvimento

---

## 📡 Teste da porta serial

### Abrir o monitor serial no Arduino IDE

- Taxa de transmissão: **115200**

- Caractere de fim de linha: **Nenhum**

### Saída esperada

Após energizar, você deve ver:

```Plain Text
UART Voice Module Initialized
```

Diga a palavra de ativação e a palavra de comando ao módulo e o ID correspondente será exibido:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Formato do quadro do protocolo

**Exemplo:** ID de comando lido = 10

```Plain Text
FE EF 00 0A EE
```

**Exemplo:** enviar reprodução de palavra de comando

```Plain Text
FE EF D3 00 EE
```

---

## 📚 Descrição da interface BSP

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Função**: inicializa a porta serial (taxa de transmissão 115200)

**Exemplo**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Função**: lê o ID do comando reconhecido pelo módulo de voz

**Valor de retorno**:

- `0` - nenhum comando reconhecido

- `1~254` - ID do comando

- `-1` - nenhum novo dado

**Exemplo**:

```Plain Text
int id = UART_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### UART_SetPassiveVoice()

```Plain Text
void UART_SetPassiveVoice(uint8_t voiceID);
```

**Função**: define a voz de reprodução passiva

**Parâmetros**:

- `0x00` - tipo de frase de reprodução passiva

**Exemplo**:

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**Função**: define a voz de reprodução das palavras de função

**Parâmetros**:

- `0x00` - tipo de frase de reprodução de palavras de função

**Exemplo**:

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**Função**: define a voz de reprodução das palavras de comando

**Parâmetros**:

- `0x00` - tipo de frase de reprodução de palavras de comando

**Exemplo**:

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Descrição da lógica do programa principal

```JavaScript
void setup() {
  Serial.begin(115200);
  UART_Init();

  Serial.println("UART Voice Module Initialized");

  UART_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = UART_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        UART_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        UART_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
      }
    }
  }

  delay(50);
}
```

---

## 🔍 Solução de problemas

### Q1: Nenhuma saída

**Possíveis causas:**

1. RX/TX invertidos

2. GND não aterrado em comum

3. Módulo sem alimentação

4. Taxa de transmissão incorreta

**Solução:**

- Confirme que D10 está conectado ao TX do módulo e D11 ao RX do módulo (conexão cruzada)

- Confirme a conexão do GND

- Confirme se a alimentação de 5V está normal

- Confirme se a taxa de transmissão da porta serial é 115200

---

### Q2: A porta serial mostra apenas caracteres ilegíveis

**Possíveis causas:**

1. Taxa de transmissão incompatível

2. Energização anormal do módulo

**Solução:**

- Confirme se a taxa de transmissão do monitor serial é 115200

- Pressione o botão de reset do módulo

---

### Q3: Saída de "ID: 255" ou "ID: 0"

**Observação:** isso é normal

- `0` = nenhum comando reconhecido

- `255` = nenhum novo dado

Esses valores já são filtrados no código, por isso normalmente não são exibidos. Se você vir essa saída, significa que o código não está em vigor.

---

## 💡 Vantagens da arquitetura BSP

### Camadas de código bem definidas

- **bsp_uart.hpp** - contém apenas as declarações, não a implementação

- **bsp_uart.cpp** - detalhes concretos da implementação

- **UART_Voice.ino** - trata apenas da lógica de negócio

### Fácil de portar

Se você trocar para outra plataforma (como STM32 ou ESP32), basta modificar a implementação de `bsp_uart.cpp`; o programa principal não precisa ser alterado.

### Fácil de manter

As alterações no código relacionado ao UART ficam apenas em `bsp_uart.cpp`; uma única alteração vale em todos os lugares.

---

## 🚀 Exemplos de funções estendidas

### Exemplo 1: acionar diferentes reproduções conforme o comando

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Exemplo 2: controlar o LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### Exemplo 3: controlar o motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
