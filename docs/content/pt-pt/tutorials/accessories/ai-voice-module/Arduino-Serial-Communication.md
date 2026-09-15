---
title: "Comunicação de porta série"
description: "1. Abra o ficheiro UARTVoice.ino"
---

# Comunicação de porta série

## 📁 Estrutura de ficheiros

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 Ligação do hardware

### Ligar ao módulo de voz

> 💡 **Nota:** o RX e o TX têm de ser ligados de forma cruzada!
> 
> 

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Compilação e carregamento

### Primeiro passo: abrir o Arduino IDE

1. Abra o ficheiro `UART_Voice.ino`

2. Selecione o modelo da sua placa de desenvolvimento (por exemplo, Arduino Uno)

3. Selecione a porta série correspondente

### Segundo passo: compilar e carregar

1. Clique no botão ✔️ para compilar

2. Clique no botão ➡️ para carregar para a placa de desenvolvimento

---

## 📡 Teste da porta série

### Abrir o monitor de porta série no Arduino IDE

- Débito em bauds: **115200**

- Carácter de fim de linha: **Nenhum**

### Saída esperada

Após ligar a alimentação, deverá ver:

```Plain Text
UART Voice Module Initialized
```

Diga a palavra de ativação e as palavras de comando ao módulo; será apresentado o ID correspondente:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Formato da trama de protocolo

**Exemplo:** leitura do ID do comando = 10

```Plain Text
FE EF 00 0A EE
```

**Exemplo:** envio de uma reprodução de palavra de comando

```Plain Text
FE EF D3 00 EE
```

---

## 📚 Descrição da interface BSP

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Função**: inicializar a porta série (débito em bauds 115200)

**Exemplo**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Função**: ler o ID do comando reconhecido pelo módulo de voz

**Valor de retorno**:

- `0` - nenhum comando reconhecido

- `1~254` - ID do comando

- `-1` - sem dados novos

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

**Função**: definir a voz de reprodução passiva

**Parâmetro**:

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

**Função**: definir a voz de reprodução de palavras de função

**Parâmetro**:

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

**Função**: definir a voz de reprodução de palavras de comando

**Parâmetro**:

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

## 🔍 Resolução de problemas

### Q1: Não há nenhuma saída

**Possíveis causas:**

1. RX/TX estão trocados

2. O GND não está ligado à mesma terra

3. O módulo não está alimentado

4. Débito em bauds incorreto

**Soluções:**

- Confirme que o D10 está ligado ao TX do módulo e o D11 ao RX do módulo (ligação cruzada)

- Confirme a ligação do GND

- Confirme que a alimentação de 5V está normal

- Confirme que o débito em bauds da porta série é 115200

---

### Q2: A porta série só mostra caracteres sem sentido

**Possíveis causas:**

1. Débito em bauds incompatível

2. O módulo não arranca corretamente

**Soluções:**

- Confirme que o débito em bauds do monitor de porta série é 115200

- Prima uma vez a tecla de reposição do módulo

---

### Q3: É apresentado "ID: 255" ou "ID: 0"

**Nota:** isto é normal

- `0` = nenhum comando reconhecido

- `255` = sem dados novos

Estes valores já são filtrados no código e, normalmente, não são apresentados. Se vir esta saída, significa que o código não está a ter efeito.

---

## 💡 Vantagens da arquitetura BSP

### Camadas de código bem definidas

- **bsp_uart.hpp** - apenas as declarações, sem a implementação

- **bsp_uart.cpp** - os detalhes concretos da implementação

- **UART_Voice.ino** - apenas a lógica de negócio

### Fácil de migrar

Se mudar para outra plataforma (como STM32 ou ESP32), basta modificar a implementação de `bsp_uart.cpp`; o programa principal não precisa de ser alterado.

### Fácil de manter

As alterações ao código relacionado com o UART são feitas apenas em `bsp_uart.cpp`; alterar uma vez, com efeito em todo o lado.

---

## 🚀 Exemplos de funcionalidades adicionais

### Exemplo 1: acionar reproduções diferentes com base em comandos diferentes

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Exemplo 2: controlar um LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### Exemplo 3: controlar um motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
