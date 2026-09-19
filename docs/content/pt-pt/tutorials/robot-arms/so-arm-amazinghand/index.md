---
title: "Tutorial de utilização do SO-ARM101 + AmazingHand"
description: "Visão geral do tutorial SO-ARM101 com a mão AmazingHand: configuração do ambiente, calibração, teleoperação, recolha de dados, treino e implementação."
---


# Tutorial de utilização do SO-ARM101 + AmazingHand

Este tutorial aborda o fluxo completo de teleoperação, recolha de dados e treino para reproduzir o **braço seguidor SO-ARM101 + mão dextra AmazingHand**, com base no LeRobot (versão personalizada do repositório oficial).

O tutorial está organizado por **etapas**, cada etapa num diretório próprio, com os documentos divididos por sistema operativo em `win.md` (Windows) e `linux.md` (Linux). Escolha o documento correspondente ao seu sistema operativo.

---

## Visão geral de hardware e software

|Dispositivo|Porta série (exemplo, a substituir)|Modelo do servo|Descrição|
|---|---|---|---|
|Braço líder (Leader)|`COM54` / `/dev/ttyACM1`|Modelos mistos<br>`sts3125-C001、sts3215-C044、sts3215-C046`|Entrada da teleoperação, mantém a garra n.º 6|
|Braço seguidor (Follower)|`COM58` / `/dev/ttyACM0`|`sts3215-C018` (n.º 1-5)|Lado de execução, remove a garra n.º 6|
|Mão dextra AmazingHand|`COM11` / `/dev/ttyACM2`|`scs0009` (8 unidades, ID 1-8)|Extremidade do braço seguidor, porta série independente|

> **⚠️ O nome da porta série varia de máquina para máquina**: a tabela acima é apenas um exemplo. O número COM/caminho do dispositivo é diferente em cada computador; utilize o `lerobot-find-port` para confirmar os valores reais da sua máquina e substituir todos os parâmetros de exemplo nos comandos.

> Os três dispositivos devem ter **porta série própria e alimentação independente**. O SCS0009 (protocolo 1) e o STS3215 (protocolo 0) não são compatíveis no mesmo barramento.

---

## Estrutura de diretórios do tutorial

```Plaintext
tutorials/
├── README.md                          # Este ficheiro (visão geral)
├── 01-environment/                    # Etapa 1: Configuração do ambiente
│   ├── win.md                         #   Configuração do ambiente no Windows
│   └── linux.md                       #   Configuração do ambiente no Linux
├── 02-calibration/                    # Etapa 2: Calibração
│   ├── win.md
│   └── linux.md
├── 03-teleoperation/                  # Etapa 3: Teleoperação
│   ├── win.md
│   └── linux.md
├── 04-data-collection/                # Etapa 4: Recolha de dados
│   ├── win.md
│   └── linux.md
├── 05-training/                       # Etapa 5: Treino do modelo
│   ├── win.md
│   └── linux.md
└── 06-deployment/                     # Etapa 6: Implementação e avaliação
    ├── win.md
    └── linux.md
```

---

## Percurso de leitura recomendado

|Passo|Etapa|Linux|Windows|
|---|---|---|---|
|1|Configuração do ambiente|[01-environment/linux.md](./01-Environment-Setup-Linux.md)|[01-environment/win.md](./01-Environment-Setup-Windows.md)|
|2|Calibração|[02-calibration/linux.md](./02-Hand-Arm-Calibration-Linux.md)|[02-calibration/win.md](./02-Hand-Arm-Calibration-Windows.md)|
|3|Teleoperação|[03-teleoperation/linux.md](./03-Teleoperation-Linux.md)|[03-teleoperation/win.md](./03-Teleoperation-Windows.md)|
|4|Recolha de dados|[04-data-collection/linux.md](./04-Data-Collection-Linux.md)|[04-data-collection/win.md](./04-Data-Collection-Windows.md)|
|5|Treino do modelo|[05-training/linux.md](./05-Model-Training-Linux.md)|[05-training/win.md](./05-Model-Training-Windows.md)|
|6|Implementação e avaliação|[06-deployment/linux.md](./06-Model-Deployment-Linux.md)|[06-deployment/win.md](./06-Model-Deployment-Windows.md)|

---

## Resumo das principais diferenças por etapa

|Aspeto|Linux|Windows|
|---|---|---|
|Ambiente Python|Miniforge + o mesmo comando|Miniconda + `conda create -n lerobot python=3.12`|
|Nome da porta série|`/dev/ttyACM0/1/2` (exemplo)|`COM54` / `COM58` / `COM11` (exemplo)|
|Permissões da porta série|Requer `sudo chmod 666 /dev/ttyACM*` ou regras udev|Nenhuma configuração especial necessária|
|Chamada de comandos|Após ativar o conda, `lerobot-xxx`|Após ativar o conda, `lerobot-xxx`|
|Treino com CUDA|Suporte oficial, resolução fluida|Necessário instalar o torch CUDA manualmente|

---

## Observações gerais

1. **Execute primeiro a Etapa 1 e só depois avance para as etapas seguintes** — o ambiente é o pré-requisito de todos os comandos posteriores.

2. **Cada computador deve ser recalibrado**: em especial os ângulos da mão (`lerobot-calibrate-amazing-hand`); os ângulos no config são o padrão genérico oficial do AmazingHand, servindo apenas de reserva; quando `hand_angles.json` existe, os valores medidos na máquina local são carregados com prioridade.

3. **Local do ficheiro de calibração**: `~/.cache/huggingface/lerobot/calibration/`; ao trocar de máquina, é necessário migrar ou recalibrar.

4. **Na primeira teleoperação, verifique sempre a direção**: garra aberta ↔ mão aberta, pinçada ↔ mão fechada.

5. Os ficheiros `win.md` / `linux.md` de cada etapa contêm **notas específicas daquela plataforma**; leia na íntegra.

---

## Ponto de entrada para resolução de problemas

Os documentos das etapas incluem a tabela de resolução de problemas de cada plataforma. Problemas comuns:

- conda não inicializado/comando não encontrado

- Permissões insuficientes na porta série (Linux)

- Mapeamento de direção da mão/braço incorreto

- Ângulos da mão não calibrados, causando abertura/fecho anormais

Consulte os documentos de cada etapa.

## Links relacionados

- [Tutorial de utilização da mão dextra AmazingHand](https://juxitech.feishu.cn/wiki/PR1JwkQxaiDAn1k85e2cZIi5nTf)
- [Tutorial do braço robótico SO-ARM101](https://juxitech.feishu.cn/wiki/NOWXw9NOJiDTs2kRr7RcdIrKnvg)

<RelatedProducts slugs="so-arm101,amazinghand" />
