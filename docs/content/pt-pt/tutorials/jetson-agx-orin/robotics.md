---
title: Robótica no JetPack 7.2 — o que funciona hoje
sidebar_label: Robótica (ponto de situação)
slug: /tutorials/robotics
description: >-
  Uma página de estado honesta para o desenvolvimento de robótica no kit de
  desenvolvimento AGX Orin com o JetPack 7.2 — ROS 2, disponibilidade do Isaac
  ROS, stacks de robot learning e o que usar enquanto o ecossistema recupera o
  atraso.
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

O JetPack 7.2 colocou o Orin numa nova geração de plataforma (Ubuntu 24.04, kernel 6.8,
CUDA 13). A robótica é a única área em que o *ecossistema* ainda está a recuperar o
atraso em relação à plataforma — por isso esta página é deliberadamente uma página de
estado, e não um tutorial. Consulte-a antes de se comprometer com uma arquitetura.

## Tabela de estado (verificada em 2026-09-24)

| O que precisa | Estado no JetPack 7.2 / AGX Orin | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | O Ubuntu 24.04 é a plataforma alvo do ROS 2 **Jazzy**; instale de acordo com a [documentação de instalação do ROS 2](https://docs.ros.org/en/jazzy/Installation.html). O ROS 2 baseado em Docker também é uma opção. |
| **Isaac ROS** (pacotes ROS 2 acelerados por hardware) | ⛔ **Ainda não — a NVIDIA indica-o como “brevemente” para o JetPack 7** | Esta é a maior lacuna. Se o Isaac ROS está hoje no seu caminho crítico, mantenha-se no **JetPack 6.x** e fique atento à [página de transferências](https://developer.nvidia.com/embedded/jetpack/downloads) da NVIDIA para saber quando é lançado. |
| **Modelos LLM / VLM / VLA locais** | ✅ Funciona | O TensorRT Edge-LLM suporta oficialmente o Orin no JP7.2, incluindo exemplos de **Vision-Language-Action** — consulte [Inferência de LLM local](/pt-pt/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines de vídeo com várias câmaras** | ✅ Funciona | O DeepStream 9.1 acompanha o JP7.2 — consulte [Análise de vídeo com DeepStream](/pt-pt/tutorials/jetson-agx-orin/deepstream). |
| **Comportamentos agênticos / orquestração** | ✅ Funciona | NemoClaw + competências de agente do Jetson — consulte [IA agêntica](/pt-pt/tutorials/jetson-agx-orin/agentic-ai). |
| **Stacks de robot learning (frameworks Python ao estilo do LeRobot)** | ⚠️ Verifique antes de avançar | Estes stacks são fortemente dependentes de Python; o Ubuntu 24.04 passou para o Python 3.12 e algumas dependências podem ficar para trás. Teste o seu stack específico no JP7.2 antes de o tomar como base — e note que **não o verificámos em hardware**. |
| **GR00T (modelos fundacionais humanoides)** | ⚠️ Consulte as fontes oficiais | Para saber que plataformas são suportadas, siga o repositório oficial Isaac GR00T da NVIDIA e os respetivos anúncios. Um guia passo a passo publicado por um parceiro relata uma implementação TensorRT com os pesos completos no AGX Orin + JP7.2 *(de terceiros, não verificado por nós)*. |
| **Placas portadoras personalizadas / trabalho de BSP** | ✅ Novas ferramentas | As **competências de agente de personalização do Jetson Linux** do JetPack 7.2 automatizam tarefas de bring-up do BSP — consulte os [repositórios de competências de agente](https://github.com/jetson-bsp-skills). |

## Recomendação

- **Novos projetos sem dependência do Isaac ROS:** construa sobre o JetPack 7.2 — tem
  suporte para Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLMs no dispositivo e as
  ferramentas de agente.
- **Projetos que hoje dependem do Isaac ROS:** por agora, planeie com o JetPack 6.x;
  considere o JP7.x o seu objetivo de migração quando o Isaac ROS for lançado para esta
  versão (o nosso [guia de migração](/pt-pt/tutorials/jetson-agx-orin/jetpack-6-to-7) cobre o
  trabalho de reconstrução quando esse dia chegar).
- **Um kit, vários módulos:** lembre-se de que o seu kit de desenvolvimento pode emular
  os outros módulos Jetson Orin por regravação — útil para validar uma carga de trabalho
  de robótica em toda a gama de módulos antes de escolher o componente de produção
  ([Visão geral do produto](/pt-pt/tutorials/jetson-agx-orin/overview)).

## Fontes

- [Página de transferências do JetPack 7.2.1 — Isaac ROS “brevemente” para o JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulação de módulos; verificado em 2026-09-24)
- [Documentação de instalação do ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Estado: rascunho, pendente de revisão por cheny. A disponibilidade do ecossistema muda
rapidamente — volte a verificar as páginas da NVIDIA indicadas antes de confiar nesta
tabela. Ainda não verificado em hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é publicada
pela Juxi Technology e não é uma publicação da NVIDIA.
