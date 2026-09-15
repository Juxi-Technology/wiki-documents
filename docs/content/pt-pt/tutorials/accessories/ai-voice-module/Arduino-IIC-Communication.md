---
title: "Comunicação IIC"
description: "1. Abra o ficheiro IICVoice.ino"
---

# Comunicação IIC

## 📁 Estrutura de ficheiros

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 主程序
├── bsp_iic.hpp         # 头文件（地址和函数声明）
├── bsp_iic.cpp         # 实现文件
└── README.md            # 本教程
```

---

## 🔌 Ligação do hardware

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 Compilação e carregamento

### Primeiro passo: abrir o Arduino IDE

1. Abra o ficheiro `IIC_Voice.ino`

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

`IIC Voice Module Initialized`

Diga a palavra de ativação e as palavras de comando ao módulo; será apresentado o ID correspondente:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Mapa de registos

---

## 📚 Descrição da interface BSP

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**Função**: inicializar o bus I2C

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

**Função**: ler o ID do comando reconhecido pelo módulo de voz

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

**Função**: definir a voz de reprodução passiva

**Parâmetro**:

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

**Função**: definir a voz de reprodução de palavras de função

**Parâmetro**:

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

**Função**: definir a voz de reprodução de palavras de comando

**Parâmetro**:

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

## 🔍 Resolução de problemas

### Q1: A porta série só mostra "IIC Read Error"

**Possíveis causas:**

1. Cablagem incorreta, sem ligação

2. O módulo não está alimentado

3. Endereço I2C incorreto

**Soluções:**

- Verifique se o SDA/SCL estão trocados

- Verifique se o GND está ligado à mesma terra

- Verifique se a alimentação de 5V está normal

- Use um programa de análise I2C para confirmar o endereço do dispositivo

---

### Q2: Não há nenhuma saída

**Possíveis causas:**

1. Débito em bauds da porta série incorreto

2. O módulo não está ativado

**Soluções:**

- Confirme que o débito em bauds da porta série é 115200

- Diga primeiro a palavra de ativação e só depois as palavras de comando

---

### Q3: É apresentado "ID: 255" ou "ID: 0"

**Nota:** isto é normal

- `0` = nenhum comando reconhecido

- `255` = sem dados novos

Estes valores já são filtrados no código e, normalmente, não são apresentados. Se vir esta saída, significa que o código não está a ter efeito.

---

## 💡 Vantagens da arquitetura BSP

### Camadas de código bem definidas

- **bsp_iic.hpp** - apenas as declarações, sem a implementação

- **bsp_iic.cpp** - os detalhes concretos da implementação

- **IIC_Voice.ino** - apenas a lógica de negócio

### Fácil de migrar

Se mudar para outra plataforma (como STM32 ou ESP32), basta modificar a implementação de `bsp_iic.cpp`; o programa principal não precisa de ser alterado.

### Fácil de manter

As alterações ao código relacionado com o I2C são feitas apenas em `bsp_iic.cpp`; alterar uma vez, com efeito em todo o lado.

---

## 🚀 Exemplos de funcionalidades adicionais

### Exemplo 1: acionar reproduções diferentes com base em comandos diferentes

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Exemplo 2: controlar um LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

### Exemplo 3: controlar um motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

