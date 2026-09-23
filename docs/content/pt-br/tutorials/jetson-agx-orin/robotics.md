---
title: Robótica no JetPack 7.2 — o que funciona hoje
sidebar_label: Robótica (situação atual)
slug: /tutorials/robotics
description: >-
  Uma página de status honesta para o desenvolvimento de robótica no kit de
  desenvolvedor AGX Orin com o JetPack 7.2 — ROS 2, disponibilidade do Isaac
  ROS, stacks de aprendizado de robô e o que usar enquanto o ecossistema corre
  atrás.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Robótica no JetPack 7.2 — o que funciona hoje

O JetPack 7.2 levou o Orin a uma nova geração de plataforma (Ubuntu 24.04,
kernel 6.8, CUDA 13). A robótica é a única área em que o *ecossistema* ainda
está correndo atrás da plataforma — por isso esta página é deliberadamente uma
página de status, não um tutorial. Consulte-a antes de se comprometer com uma
arquitetura.

## Tabela de status (verificada em 2026-09-24)

| O que você precisa | Status no JetPack 7.2 / AGX Orin | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | O Ubuntu 24.04 é a plataforma-alvo do ROS 2 **Jazzy**; instale conforme a [documentação de instalação do ROS 2](https://docs.ros.org/en/jazzy/Installation.html). O ROS 2 baseado em Docker também é uma opção. |
| **Isaac ROS** (pacotes ROS 2 acelerados por hardware) | ⛔ **Ainda não — a NVIDIA o lista como "em breve" para o JetPack 7** | Esta é a maior lacuna. Se o Isaac ROS está no seu caminho crítico hoje, fique no **JetPack 6.x** e acompanhe a [página de downloads](https://developer.nvidia.com/embedded/jetpack/downloads) da NVIDIA para saber do lançamento. |
| **Modelos LLM / VLM / VLA locais** | ✅ Funciona | O TensorRT Edge-LLM oferece suporte oficial ao Orin no JP7.2, incluindo exemplos de **Vision-Language-Action** — consulte [Inferência de LLM local](/pt-br/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines de vídeo multicâmera** | ✅ Funciona | O DeepStream 9.1 acompanha o JP7.2 — consulte [Análise de vídeo com DeepStream](/pt-br/tutorials/jetson-agx-orin/deepstream). |
| **Comportamentos agênticos / orquestração** | ✅ Funciona | NemoClaw + habilidades de agente do Jetson — consulte [IA agêntica](/pt-br/tutorials/jetson-agx-orin/agentic-ai). |
| **Stacks de aprendizado de robô (frameworks Python no estilo LeRobot)** | ⚠️ Verifique antes de se comprometer | Esses stacks são fortemente baseados em Python; o Ubuntu 24.04 passou para o Python 3.12 e algumas dependências podem ficar para trás. Teste o seu stack específico no JP7.2 antes de projetar em cima dele — e observe que **não verificamos isso em hardware**. |
| **GR00T (modelos de fundação para humanoides)** | ⚠️ Consulte as fontes oficiais | Acompanhe o repositório oficial do Isaac GR00T da NVIDIA e os anúncios de suporte à plataforma. Um passo a passo publicado por um parceiro relata uma implantação TensorRT de pesos completos no AGX Orin + JP7.2 *(terceiros, não verificado por nós)*. |
| **Placas portadoras personalizadas / trabalho de BSP** | ✅ Novas ferramentas | As **habilidades de agente de personalização do Jetson Linux** do JetPack 7.2 automatizam tarefas de bring-up de BSP — consulte os [repositórios de habilidades de agente](https://github.com/jetson-bsp-skills). |

## Recomendação

- **Novos projetos sem dependência do Isaac ROS:** construa sobre o JetPack 7.2 —
  você ganha suporte ao Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLMs no
  dispositivo e as ferramentas de agente.
- **Projetos que dependem do Isaac ROS hoje:** planeje o JetPack 6.x por
  enquanto; trate o JP7.x como seu alvo de migração quando o Isaac ROS for
  lançado para ele (nosso [guia de migração](/pt-br/tutorials/jetson-agx-orin/jetpack-6-to-7)
  cobre o trabalho de reconstrução quando esse dia chegar).
- **Um kit, vários módulos:** lembre-se de que seu kit de desenvolvedor pode
  emular os outros módulos Jetson Orin por meio de uma nova gravação — útil para
  validar uma carga de trabalho de robô em toda a linha de módulos antes de
  escolher o componente de produção
  ([Visão geral do produto](/pt-br/tutorials/jetson-agx-orin/overview)).

## Fontes

- [Página de downloads do JetPack 7.2.1 — Isaac ROS "em breve" para o JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-24)
- [Guia do usuário do kit de desenvolvedor Jetson AGX Orin — Introdução](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulação de módulos; verificado em 2026-09-24)
- [Documentação de instalação do ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Status: rascunho, pendente de revisão por cheny. A disponibilidade do
ecossistema muda rapidamente — verifique novamente as páginas da NVIDIA
vinculadas antes de confiar nesta tabela. Ainda não verificado em hardware
físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação oficial da NVIDIA.
