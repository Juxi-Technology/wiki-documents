---
title: "Tutorial de uso do SO-ARM101 + AmazingHand"
description: "Tutorial do SO-ARM101 + AmazingHand da Juxi Technology — configuração, calibração, teleoperação, coleta de dados, treinamento e implantação no LeRobot."
---


# Tutorial de uso do SO-ARM101 + AmazingHand

Este tutorial aborda o fluxo completo de teleoperação, coleta de dados e treinamento para reproduzir o **braço seguidor SO-ARM101 + mão dextra AmazingHand**, com base no LeRobot (versão personalizada do repositório oficial).

O tutorial é organizado por **etapas**, cada etapa em um diretório próprio, com os documentos divididos por sistema operacional em Windows e Linux. Escolha o documento correspondente ao seu sistema operacional para leitura.

---

## Visão geral de hardware e software

|Dispositivo|Porta serial (exemplo, substituir)|Modelo do servo|Descrição|
|---|---|---|---|
|Braço líder (Leader)|`COM54` / `/dev/ttyACM1`|Modelos mistos<br>`sts3125-C001、sts3215-C044、sts3215-C046`|Entrada da teleoperação, mantém a garra nº 6|
|Braço seguidor (Follower)|`COM58` / `/dev/ttyACM0`|`sts3215-C018` (nº 1-5)|Lado de execução, remove a garra nº 6|
|Mão dextra AmazingHand|`COM11` / `/dev/ttyACM2`|`scs0009` (8 unidades, ID 1-8)|Extremidade do braço seguidor, porta serial independente|

> **⚠️ O nome da porta serial varia conforme a máquina**: a tabela acima é apenas um exemplo. O número COM/caminho do dispositivo é diferente em cada computador; use `lerobot-find-port` para confirmar os valores reais da sua máquina e substituir todos os parâmetros de exemplo nos comandos.

> Os três dispositivos devem ter **porta serial própria e alimentação independente**. O SCS0009 (protocolo 1) e o STS3215 (protocolo 0) não são compatíveis no mesmo barramento.

---

## Estrutura de diretórios do tutorial

```Plaintext
tutorials/robot-arms/so-arm-amazinghand/
├── index.md
├── Linux
│   ├── 01-Environment-Setup-Linux.md
│   ├── 02-Hand-Arm-Calibration-Linux.md
│   ├── 03-Teleoperation-Linux.md
│   ├── 04-Data-Collection-Linux.md
│   ├── 05-Model-Training-Linux.md
│   └── 06-Model-Deployment-Linux.md
└── Windows
    ├── 01-Environment-Setup-Windows.md
    ├── 02-Hand-Arm-Calibration-Windows.md
    ├── 03-Teleoperation-Windows.md
    ├── 04-Data-Collection-Windows.md
    ├── 05-Model-Training-Windows.md
    └── 06-Model-Deployment-Windows.md
```

---

## Caminho de leitura recomendado

|Passo|Etapa|Linux|Windows|
|---|---|---|---|
|1|Configuração do ambiente|[01-Environment-Setup-Linux.md](./01-Environment-Setup-Linux.md)|[01-Environment-Setup-Windows.md](./01-Environment-Setup-Windows.md)|
|2|Calibração|[02-Hand-Arm-Calibration-Linux.md](./02-Hand-Arm-Calibration-Linux.md)|[02-Hand-Arm-Calibration-Windows.md](./02-Hand-Arm-Calibration-Windows.md)|
|3|Teleoperação|[03-Teleoperation-Linux.md](./03-Teleoperation-Linux.md)|[03-Teleoperation-Windows.md](./03-Teleoperation-Windows.md)|
|4|Coleta de dados|[04-Data-Collection-Linux.md](./04-Data-Collection-Linux.md)|[04-Data-Collection-Windows.md](./04-Data-Collection-Windows.md)|
|5|Treinamento do modelo|[05-Model-Training-Linux.md](./05-Model-Training-Linux.md)|[05-Model-Training-Windows.md](./05-Model-Training-Windows.md)|
|6|Implantação e avaliação|[06-Model-Deployment-Linux.md](./06-Model-Deployment-Linux.md)|[06-Model-Deployment-Windows.md](./06-Model-Deployment-Windows.md)|

---

## Resumo das principais diferenças por etapa

|Aspeto|Linux|Windows|
|---|---|---|
|Ambiente Python|Miniforge + o mesmo comando|Miniconda + `conda create -n lerobot python=3.12`|
|Nome da porta serial|`/dev/ttyACM0/1/2` (exemplo)|`COM54` / `COM58` / `COM11` (exemplo)|
|Permissões da porta serial|Requer `sudo chmod 666 /dev/ttyACM*` ou regras udev|Nenhuma configuração especial necessária|
|Chamada de comandos|Após ativar o conda, `lerobot-xxx`|Após ativar o conda, `lerobot-xxx`|
|Treinamento com CUDA|Suporte oficial, resolução fluida|Necessário instalar o torch CUDA manualmente|

---

## Observações gerais

1. **Execute a Etapa 1 primeiro, depois avance para as etapas seguintes** — o ambiente é o pré-requisito de todos os comandos posteriores.

2. **Cada computador deve ser recalibrado**: em especial os ângulos da mão (`lerobot-calibrate-amazing-hand`); os ângulos no config são o padrão genérico oficial do AmazingHand, servindo apenas de reserva; quando `hand_angles.json` existe, os valores medidos na máquina local são carregados com prioridade.

3. **Local do arquivo de calibração**: `~/.cache/huggingface/lerobot/calibration/`; ao trocar de máquina, é necessário migrar ou recalibrar.

4. **Na primeira teleoperação, verifique sempre a direção**: garra aberta ↔ mão aberta, pinçada ↔ mão fechada.

5. Os arquivos Windows / Linux de cada etapa contêm **notas específicas daquela plataforma**; leia na íntegra.

---

## Ponto de entrada para resolução de problemas

Os documentos das etapas incluem a tabela de resolução de problemas de cada plataforma. Problemas comuns:

- conda não inicializado/comando não encontrado

- Permissões insuficientes na porta serial (Linux)

- Mapeamento de direção da mão/braço incorreto

- Ângulos da mão não calibrados, causando abertura/fechamento anormais

Consulte os documentos de cada etapa.

## Links relacionados

- [Tutorial de uso da mão dextra AmazingHand](https://juxitech.feishu.cn/wiki/PR1JwkQxaiDAn1k85e2cZIi5nTf)
- [Tutorial do braço robótico SO-ARM101](https://juxitech.feishu.cn/wiki/NOWXw9NOJiDTs2kRr7RcdIrKnvg)

<RelatedProducts slugs="so-arm101,amazinghand" />
