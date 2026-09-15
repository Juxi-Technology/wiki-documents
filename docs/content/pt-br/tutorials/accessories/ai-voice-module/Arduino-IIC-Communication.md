---
title: "Arduino: Comunicação IIC"
description: "1. Abra o arquivo IICVoice.ino"
---

# Arduino: Comunicação IIC

## 📁 Estrutura de arquivos

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 主程序
├── bsp_iic.hpp         # 头文件（地址和函数声明）
├── bsp_iic.cpp         # 实现文件
└── README.md            # 本教程
```

---

## 🔌 Conexão de hardware

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 Compilação e upload

### Primeiro passo: abrir o Arduino IDE

1. Abra o arquivo `IIC_Voice.ino`

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

`IIC Voice Module Initialized`

Diga a palavra de ativação e a palavra de comando ao módulo e o ID correspondente será exibido:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Mapeamento de registradores

---

## 📚 Descrição da interface BSP

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**Função**: inicializa o barramento I2C

**Exemplo**:

```Plain Text
void setup() {
  IIC_Init();
}
```

---

### IIC_ReadCommand()

```Plain Text
int IIC_ReadCommand(void);
```

**Função**: lê o ID do comando reconhecido pelo módulo de voz

**Valor de retorno**:

- `0` - nenhum comando reconhecido

- `1~254` - ID do comando

- `-1` - erro de comunicação

**Exemplo**:

```Plain Text
int id = IIC_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### IIC_SetPassiveVoice()

```Plain Text
void IIC_SetPassiveVoice(uint8_t voiceID);
```

**Função**: define a voz de reprodução passiva

**Parâmetros**:

- `0x00` - tipo de frase de reprodução passiva

**Exemplo**:

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**Função**: define a voz de reprodução das palavras de função

**Parâmetros**:

- `0x00` - tipo de frase de reprodução de palavras de função

**Exemplo**:

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**Função**: define a voz de reprodução das palavras de comando

**Parâmetros**:

- `0x00` - tipo de frase de reprodução de palavras de comando

**Exemplo**:

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Descrição da lógica do programa principal

```JavaScript
void setup() {
  Serial.begin(115200);
  IIC_Init();

  Serial.println("IIC Voice Module Initialized");

  IIC_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = IIC_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        IIC_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        IIC_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
      }
    }
  } else {
    Serial.println("IIC Read Error");
    delay(1000);
  }

  delay(50);
}
```

---

## 🔍 Solução de problemas

### Q1: A porta serial mostra apenas "IIC Read Error"

**Possíveis causas:**

1. Cabeamento incorreto ou não conectado

2. Módulo sem alimentação

3. Endereço I2C incorreto

**Solução:**

- Verifique se SDA/SCL estão invertidos

- Verifique se o GND está aterrado em comum

- Verifique se a alimentação de 5V está normal

- Use um programa de varredura I2C para confirmar o endereço do dispositivo

---

### Q2: Nenhuma saída

**Possíveis causas:**

1. Taxa de transmissão da porta serial incorreta

2. O módulo não foi ativado

**Solução:**

- Confirme se a taxa de transmissão da porta serial é 115200

- Primeiro diga a palavra de ativação, depois a palavra de comando

---

### Q3: Saída de "ID: 255" ou "ID: 0"

**Observação:** isso é normal

- `0` = nenhum comando reconhecido

- `255` = nenhum novo dado

Esses valores já são filtrados no código, por isso normalmente não são exibidos. Se você vir essa saída, significa que o código não está em vigor.

---

## 💡 Vantagens da arquitetura BSP

### Camadas de código bem definidas

- **bsp_iic.hpp** - contém apenas as declarações, não a implementação

- **bsp_iic.cpp** - detalhes concretos da implementação

- **IIC_Voice.ino** - trata apenas da lógica de negócio

### Fácil de portar

Se você trocar para outra plataforma (como STM32 ou ESP32), basta modificar a implementação de `bsp_iic.cpp`; o programa principal não precisa ser alterado.

### Fácil de manter

As alterações no código relacionado ao I2C ficam apenas em `bsp_iic.cpp`; uma única alteração vale em todos os lugares.

---

## 🚀 Exemplos de funções estendidas

### Exemplo 1: acionar diferentes reproduções conforme o comando

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Exemplo 2: controlar o LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

### Exemplo 3: controlar o motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
