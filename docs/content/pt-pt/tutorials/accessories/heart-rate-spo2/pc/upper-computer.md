---
title: "Aplicação de host para PC"
description: "Tutorial da aplicação gráfica de host para PC do módulo de frequência cardíaca e SpO2 MAX30102: configuração da porta série, recolha, monitorização, interpretação dos dados e perguntas frequentes."
---

# Aplicação de host para PC

## 📋 Descrição das funcionalidades

Este é um programa gráfico de host para monitorização de frequência cardíaca e SpO2, com as seguintes funcionalidades:

1. ✅ **Seleção da porta série** - varre automaticamente as portas série disponíveis
1. ✅ **Seleção do débito em bauds** - suporta 9600/19200/38400/57600/115200
1. ✅ **Ligar/desligar** - liga/desliga o módulo com um clique
1. ✅ **Iniciar/encerrar recolha** - controla o acendimento/apagamento do LED do sensor
1. ✅ **Iniciar/parar monitorização** - apresenta os dados em tempo real
1. ✅ **Apresentação de dados em tempo real** - SpO2, frequência cardíaca e temperatura

---

## 🔌 Ligação de hardware

| Módulo de frequência cardíaca e SpO2 | Módulo USB para TTL |
|---|---|
| VCC | 5V (importante! não ligue a 3.3V) |
| GND | GND |
| TX | RX (ligação cruzada) |
| RX | TX (ligação cruzada) |

![Diagrama](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-upper-computer/01.png)

⚠️ **Atenção: coloque a chave seletora do módulo em UART; TX e RX têm de ser ligados de forma cruzada!**

---

## 🚀 Executar o programa

### Método 1: executar diretamente o script Python

1. Instale a biblioteca de dependência:

```bash
pip install pyserial
```

1. Execute o programa:

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python HeartRateOximeter.py
```

---

## 📖 Passos de utilização

### Passo 1: ligar o hardware

1. Ligue o sensor e o USB para TTL conforme a tabela de ligação acima

```text
VCC->VCC
GND->GND
RX->TX
TX->RX
```

1. Insira o USB para TTL na porta USB do computador

### Passo 2: abrir o programa

Execute `HeartRateOximeter.exe`

### Passo 3: configurar a porta série

1. Selecione a porta série correta (por exemplo, COM3)
1. Selecione o débito em bauds **9600** (predefinido)
1. Clique no botão «Ligar»

### Passo 4: iniciar a recolha

1. Após a ligação bem-sucedida, clique em «Iniciar recolha»
1. ✅ O LED do sensor acenderá

### Passo 5: iniciar a monitorização

1. Coloque o dedo sobre o sensor
1. Clique em «Iniciar monitorização»
1. Veja os dados em tempo real

---

## 📊 Descrição da interface

```text
┌─────────────────────────────────────────┐
│           串口设置                       │
│  串口:  [COM3  ↓]  [刷新]               │
│  波特率:[9600  ↓]  [连接]               │
├─────────────────────────────────────────┤
│           模块控制                       │
│  [启动采集]  [开始监测]                 │
├─────────────────────────────────────────┤
│           实时数据                       │
│  血氧 (SPO2):       98 %                │
│  心率 (Heart Rate): 75 Times/min        │
│  温度 (Temperature): 36.6 °C            │
│  状态:  正在监测...                     │
├─────────────────────────────────────────┤
│           使用提示                       │
│  1. 接线：VCC->5V, GND->GND, RX->TX, TX->RX          │
│  2. 点击连接后再启动采集                               │
│  3. 启动采集后传感器LED会亮起                           │
└─────────────────────────────────────────┘
```
---

## 📋 Interpretação dos dados

| Dados | Faixa normal | Descrição |
|---|---|---|
| Oxigénio no sangue (SpO2) | 95% - 100% | Abaixo de 90%, recomenda-se procurar assistência médica |
| Frequência cardíaca | 60 - 100 Times/min | Faixa normal em adultos |
| Temperatura | 25 - 35 °C | Temperatura da placa do módulo, não é temperatura corporal |

**Atenção**: ao iniciar ou se o dedo não estiver bem colocado, os dados podem apresentar -1, o que é normal.

---

## ❓ Perguntas frequentes

### P1: o que fazer se a porta série não for encontrada?

**R:**

1. Verifique se o controlador USB para TTL está instalado corretamente
1. Desligue e volte a ligar o cabo USB
1. Clique no botão «Atualizar» para voltar a procurar

### P2: o que fazer se a ligação falhar?

**R:**

1. Confirme se a porta série selecionada está correta
1. Confirme se a porta série não está ocupada por outro programa (como assistente de porta série, Arduino IDE)
1. Verifique se o USB para TTL funciona corretamente

### P3: o LED não acende após clicar em iniciar recolha?

**R:**

1. Verifique se o VCC está ligado a 5V (e não a 3.3V)
1. Verifique se TX/RX estão ligados de forma cruzada
1. Confirme se o módulo sensor em si não está danificado

### P4: os dados continuam a apresentar -1?

**R:**

1. Confirme se «Iniciar recolha» já foi clicado
1. Coloque o dedo corretamente sobre o sensor, cobrindo completamente a área do LED
1. Mantenha o dedo estável e aguarde alguns segundos
1. Verifique se a cablagem está solta

### P5: o programa não responde?

**R:**

1. Clique primeiro em «Parar monitorização»
1. Depois clique em «Encerrar recolha»
1. Por fim clique em «Desligar»
1. Reinicie o programa

---

## ⚠️ Precauções

1. **Ordem de ligação**: ligue primeiro o sensor e depois insira o USB
1. **Ordem de desligamento**: pare primeiro a monitorização, depois encerre a recolha e, por fim, desligue
1. **Requisitos de alimentação**: o sensor tem de ser alimentado com 5V; 3.3V pode não funcionar corretamente
1. **Colocação do dedo**: durante a medição, o dedo deve cobrir completamente a área ótica, sem pressionar com força
1. **Requisitos de ambiente**: evite luz forte a incidir diretamente sobre o sensor

---

## 📞 Suporte técnico

Em caso de problemas, verifique:

1. Se a cablagem de hardware está correta (especialmente o cruzamento TX/RX)
1. Se a alimentação é 5V
1. Se o controlador USB para TTL está normal
1. Se a porta série está ocupada por outro programa
