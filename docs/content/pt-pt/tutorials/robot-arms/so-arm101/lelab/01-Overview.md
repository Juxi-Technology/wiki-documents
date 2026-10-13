---
title: "1 · Visão geral"
description: "O LeLab reúne o fluxo de trabalho do LeRobot — calibrar, teleoperar, gravar, treinar, reproduzir — numa única janela do navegador: o que faz, requisitos e onde ficam os ficheiros."
---

# 1 · Visão geral

> **Seguinte:** [02 Instalar e executar](02-Install.md)

O LeLab é uma aplicação web que reúne o fluxo de trabalho do LeRobot — calibrar, teleoperar, gravar, treinar, reproduzir — numa única janela do navegador.

## O que pode fazer

| Página | O que faz |
|---|---|
| **Calibration** | Calibração guiada de ambos os braços |
| **Teleoperation** | Mova o braço leader; o follower acompanha-o, com transmissão das posições das articulações em tempo real |
| **Recording** | Grave episódios num LeRobotDataset, com câmaras |
| **Datasets** | Percorra episódios no disco, fotograma a fotograma, com um traçado do movimento das articulações |
| **Training** | Inicie uma tarefa de treino do LeRobot e acompanhe os registos |
| **Inference** | Execute uma política treinada no braço follower |
| **Upload** | Envie o seu conjunto de dados para o Hugging Face Hub |

## LeLab e LeRobot

O LeRobot é a biblioteca — controladores dos robôs, formato dos dados, código de treino. O LeLab é um servidor FastAPI que a invoca, mais um front-end React que comunica com esse servidor por HTTP e WebSocket.

- Tudo o que o LeLab não expõe continua acessível pela linha de comandos `lerobot-*`.
- O LeLab não inclui o LeRobot. Instalar o LeLab instala o LeRobot.

## Requisitos

| | |
|---|---|
| Robô | **braços SO-101 leader + follower** — a única configuração suportada |
| Computador | Linux, macOS ou Windows |
| Python | **3.12 ou mais recente** |
| Node.js | 22 — apenas para `lelab --dev` |
| USB | Duas portas livres, uma por braço |

A calibração, a teleoperação e a gravação correm num portátil. O treino é a etapa pesada, e o LeLab pode executá-lo no Hugging Face Hub — ver [página 6](06-Train-and-Inference.md).

## Onde ficam os ficheiros

Em `~/.cache/huggingface/lerobot/`:

| Caminho | Conteúdo |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | Ficheiros de calibração do leader |
| `calibration/robots/so101_follower/*.json` | Ficheiros de calibração do follower |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Últimas portas série utilizadas |
| `saved_configs/*.txt` | Último perfil de calibração selecionado |

Os conjuntos de dados ficam onde o LeRobot os coloca — por predefinição, na mesma árvore.

Limpar essa cache, ou reinstalar, obriga a recalibrar ambos os braços. Ver [Resolução de problemas](07-Troubleshooting.md).

## Terminologia

O LeRobot nomeia os braços pela função; a API do LeLab usa um segundo conjunto de nomes para os mesmos dois braços:

| Designação comum | Designação no LeRobot / LeLab |
|---|---|
| O braço que move à mão | **leader** · **teleop** |
| O braço que segue | **follower** · **robot** |

---

> **Seguinte:** [02 Instalar e executar](02-Install.md)

<RelatedProducts slugs="so-arm101" />
