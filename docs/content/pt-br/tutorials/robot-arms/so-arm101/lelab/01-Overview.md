---
title: "1 · Visão geral"
description: "O LeLab reúne o fluxo de trabalho do LeRobot — calibrar, teleoperar, gravar, treinar, reproduzir — em uma única janela do navegador: o que faz, requisitos e onde ficam os arquivos."
---

# 1 · Visão geral

> **Próximo:** [02 Instalar e executar](02-Install.md)

O LeLab é um aplicativo web que reúne o fluxo de trabalho do LeRobot — calibrar, teleoperar, gravar, treinar, reproduzir — em uma única janela do navegador.

## O que você pode fazer

| Página | O que faz |
|---|---|
| **Calibration (Calibração)** | Calibração guiada dos dois braços |
| **Teleoperation (Teleoperação)** | Mova o braço leader; o follower o espelha, com transmissão das juntas ao vivo |
| **Recording (Gravação)** | Capture episódios em um LeRobotDataset, com câmeras |
| **Datasets (Conjuntos de dados)** | Navegue pelos episódios no disco, quadro a quadro, com um traço do movimento das juntas |
| **Training (Treinamento)** | Inicie um job de treinamento do LeRobot e acompanhe os logs |
| **Inference (Inferência)** | Execute uma policy treinada no braço follower |
| **Upload (Envio)** | Envie seu dataset para o Hugging Face Hub |

## LeLab e LeRobot

O LeRobot é a biblioteca — drivers de robô, formato de dataset, código de treinamento. O LeLab é um servidor FastAPI que a chama, além de um front end React que se comunica com esse servidor por HTTP e WebSocket.

- Tudo o que o LeLab não expõe continua acessível pela linha de comando `lerobot-*`.
- O LeLab não inclui o LeRobot. Instalar o LeLab instala o LeRobot.

## Requisitos

| | |
|---|---|
| Robô | **Braços SO-101 leader + follower** — a única configuração suportada |
| Computador | Linux, macOS ou Windows |
| Python | **3.12 ou mais recente** |
| Node.js | 22 — apenas para `lelab --dev` |
| USB | Duas portas livres, uma por braço |

Calibração, teleoperação e gravação rodam em um notebook. O treinamento é a etapa pesada, e o LeLab pode executá-lo no Hugging Face Hub — veja a [página 6](06-Train-and-Inference.md).

## Onde os arquivos ficam

Em `~/.cache/huggingface/lerobot/`:

| Caminho | Conteúdo |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | Arquivos de calibração do leader |
| `calibration/robots/so101_follower/*.json` | Arquivos de calibração do follower |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Últimas portas seriais usadas |
| `saved_configs/*.txt` | Último perfil de calibração selecionado |

Os datasets ficam onde o LeRobot os coloca — por padrão, na mesma árvore.

Limpar esse cache, ou reinstalar, significa recalibrar os dois braços. Veja [Solução de problemas](07-Troubleshooting.md).

## Vocabulário

O LeRobot nomeia os braços por função; a API do LeLab usa um segundo conjunto de nomes para os mesmos dois braços:

| Você diz | LeRobot / LeLab dizem |
|---|---|
| O braço que você move com a mão | **leader** · **teleop** |
| O braço que acompanha | **follower** · **robot** |

---

> **Próximo:** [02 Instalar e executar](02-Install.md)

<RelatedProducts slugs="so-arm101" />
