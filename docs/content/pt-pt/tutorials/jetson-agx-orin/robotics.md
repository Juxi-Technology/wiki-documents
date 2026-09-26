---
title: Robótica no JetPack 7.2 — o que funciona hoje
sidebar_label: Robótica (ponto de situação)
slug: /tutorials/robotics
description: >-
  Uma página de estado honesta para o desenvolvimento de robótica no kit de
  desenvolvimento AGX Orin com o JetPack 7.2 — ROS 2, disponibilidade do Isaac
  ROS, stacks de robot learning e o que verificar antes de se comprometer.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Robótica no JetPack 7.2 — o que funciona hoje

O JetPack 7.2 colocou o Orin numa nova geração de plataforma (Ubuntu 24.04, kernel 6.8,
CUDA 13). A robótica apresenta um quadro misto: os componentes centrais (ROS 2, Isaac
ROS) já estão presentes nesta plataforma, enquanto partes do stack em redor ainda estão
a assentar — por isso esta página é deliberadamente uma página de estado, e não um
tutorial. Consulte-a antes de se comprometer com uma arquitetura.

## Tabela de estado (verificada em 2026-09-24; linha do Isaac ROS reverificada em 2026-09-26)

| O que precisa | Estado no JetPack 7.2 / AGX Orin | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | O Ubuntu 24.04 é a plataforma alvo do ROS 2 **Jazzy**; instale de acordo com a [documentação de instalação do ROS 2](https://docs.ros.org/en/jazzy/Installation.html). O ROS 2 baseado em Docker também é uma opção. |
| **Isaac ROS** (pacotes ROS 2 acelerados por hardware) | ✅ **Suportado desde o Isaac ROS 4.6.0** (2026-08-18) | Lançado para o JetPack 7.2 no Jetson Orin, com um guia passo a passo oficial de configuração do AGX Orin. A sua verdadeira decisão é a distribuição do ROS 2: **4.6.x no Jazzy** vs **5.0 no Lyrical** — consulte [Isaac ROS no JetPack 7.2](#isaac-ros-no-jetpack-7-2). |
| **Modelos LLM / VLM / VLA locais** | ✅ Funciona | O TensorRT Edge-LLM suporta oficialmente o Orin no JP7.2, incluindo exemplos de **Vision-Language-Action** — consulte [Inferência de LLM local](/pt-pt/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines de vídeo com várias câmaras** | ✅ Funciona | O DeepStream 9.1 acompanha o JP7.2 — consulte [Análise de vídeo com DeepStream](/pt-pt/tutorials/jetson-agx-orin/deepstream). |
| **Comportamentos agênticos / orquestração** | ✅ Funciona | NemoClaw + competências de agente do Jetson — consulte [IA agêntica](/pt-pt/tutorials/jetson-agx-orin/agentic-ai). |
| **Stacks de robot learning (frameworks Python ao estilo do LeRobot)** | ⚠️ Verifique antes de avançar | Estes stacks são fortemente dependentes de Python; o Ubuntu 24.04 passou para o Python 3.12 e algumas dependências podem ficar para trás. Teste o seu stack específico no JP7.2 antes de o tomar como base — e note que **não o verificámos em hardware**. |
| **GR00T (modelos fundacionais humanoides)** | ⚠️ Consulte as fontes oficiais | Para saber que plataformas são suportadas, siga o repositório oficial Isaac GR00T da NVIDIA e os respetivos anúncios. Um guia passo a passo publicado por um parceiro relata uma implementação TensorRT com os pesos completos no AGX Orin + JP7.2 *(de terceiros, não verificado por nós)*. |
| **Placas portadoras personalizadas / trabalho de BSP** | ✅ Novas ferramentas | As **competências de agente de personalização do Jetson Linux** do JetPack 7.2 automatizam tarefas de bring-up do BSP — consulte os [repositórios de competências de agente](https://github.com/jetson-bsp-skills). |

## Isaac ROS no JetPack 7.2

A era do “brevemente” acabou. O lançamento **4.6.0** do Isaac ROS (2026-08-18)
acrescentou suporte para **Jetson Orin** e **JetPack 7.2**, e a tabela de
plataformas suportadas associa o *Jetson Orin* ao *JetPack 7.2* (SSD NVMe de
128+ GB). A NVIDIA publica um guia de início rápido e de configuração do Docker
dedicado ao **Jetson AGX Orin** para esta combinação — este kit é um alvo de
primeira classe, e não uma nota de rodapé.

A decisão que realmente importa é qual a **distribuição do ROS 2** a adotar:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Lançado | 2026-08-18 | 2026-09-21 |
| Distribuição do ROS 2 | **Jazzy** — a versão padrão do Ubuntu 24.04 | **Lyrical Luth** — a própria NVIDIA compila os pacotes ROS 2 Noble e serve-os a partir do CDN da sua buildfarm |
| Pacotes NITROS | Presentes | **Removidos** e reconstruídos nativamente sobre `rosidl::Buffer`; o código que chama APIs ou tipos NITROS diretamente precisa de uma migração ao nível do código-fonte |
| Emparelhamento com o Isaac Sim | 6.0 (5.0/5.1 ainda suportados como legado) | 6.0 |

- A começar do zero e a querer o caminho convencional: o **4.6.x no Jazzy**
  mantém-no na versão padrão do ROS 2. O **5.0** é o rumo que a NVIDIA segue e
  traz o ecossistema Lyrical — leia as orientações de migração de NITROS para
  `rosidl::Buffer` indicadas nas [notas de lançamento da 5.0.0](https://nvidia-isaac-ros.github.io/releases/index.html)
  antes de atualizar código de nós existente.
- **Limitações conhecidas no Orin** nestas versões: as câmaras RealSense
  funcionam **apenas em modo Docker**; com o `isaac_ros_stereo_image_proc`,
  selecionar `backend:=JETSON` no AGX Orin com entrada RGB8/BGR8 pode abortar
  o nó com um erro de VPI — mantenha o valor predefinido `backend:=CUDA`; o
  Teleop do pacote Debian precisa de `ISAAC_TELEOP_CLOUDXR_EXP=0` no Orin; e o
  pré-processamento do `isaac_ros_dnn_image_encoder` da 5.0 é mais lento do
  que o da 4.6 no AGX Orin — se esse nó for crítico no seu grafo, prefira a 4.6.
- **OpenCV:** o JetPack 7.2 inclui o OpenCV **4.8.0**, enquanto o Isaac ROS
  espera a **4.6.0**. Remova os pacotes do sistema
  (`sudo apt-get remove -y libopencv* opencv*`); os pacotes do Isaac ROS
  instalam então a sua versão fixada.

### Onde as próprias páginas da NVIDIA discordam

A [página de transferências do JetPack](https://developer.nvidia.com/embedded/jetpack/downloads)
da NVIDIA continua a indicar o Isaac ROS como **“brevemente”** para esta
versão, enquanto as notas de lançamento do Isaac ROS afirmam suporte desde a
4.6.0. As duas páginas não foram reconciliadas — o Isaac ROS é lançado
independentemente do JetPack, e a tabela de componentes da página do JetPack
regista o que é distribuído *com* o JetPack. Os repositórios apt indicados na
documentação do Isaac ROS são a prova concreta da combinação suportada:
`…/isaac-ros/release-4.6 noble-jetpack` — *noble* para o Ubuntu 24.04,
*jetpack* para a compilação do JetPack. Quando as duas discordarem, considere
as [notas de lançamento do Isaac ROS](https://nvidia-isaac-ros.github.io/releases/index.html)
como a fonte que prevalece, e verifique na sua própria configuração antes de
planear com base em qualquer uma delas.

## Recomendação

- **Novos projetos sem dependência de robótica:** construa sobre o JetPack 7.2 — tem
  suporte para Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLMs no dispositivo e as
  ferramentas de agente.
- **Projetos que usam o Isaac ROS:** o JetPack 7.2 é novamente um alvo suportado.
  Escolha deliberadamente entre a 4.6.x (Jazzy) e a 5.0 (Lyrical) e conte com a
  substituição do OpenCV e com o suporte das câmaras RealSense apenas em modo Docker.
  Se está a meio de um projeto no JetPack 6.x com um stack validado, não há uma
  migração forçada — migre quando a escolha da versão do Isaac ROS estiver decidida
  (o nosso [guia de migração](/pt-pt/tutorials/jetson-agx-orin/jetpack-6-to-7) cobre o
  trabalho de reconstrução).
- **Um kit, vários módulos:** lembre-se de que o seu kit de desenvolvimento pode emular
  os outros módulos Jetson Orin por regravação — útil para validar uma carga de trabalho
  de robótica em toda a gama de módulos antes de escolher o componente de produção
  ([Visão geral do produto](/pt-pt/tutorials/jetson-agx-orin/overview)).

## Fontes

- [Lançamentos do Isaac ROS — notas de lançamento da 4.6.0 (2026-08-18) e da 5.0.0 (2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html) (verificado em 2026-09-26)
- [Isaac ROS 4.6 — Getting Started: plataformas suportadas, guia passo a passo do Jetson AGX Orin, instalação via apt](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (verificado em 2026-09-26)
- [Isaac ROS 5.0 — Getting Started: plataformas suportadas, CDN da buildfarm do Lyrical](https://nvidia-isaac-ros.github.io/getting_started/index.html) (verificado em 2026-09-26)
- [Página de transferências do JetPack 7.2.1 — lista de componentes](https://developer.nvidia.com/embedded/jetpack/downloads) — ainda contém a linha desatualizada “brevemente” do Isaac ROS (verificado em 2026-09-26)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulação de módulos; verificado em 2026-09-24)
- [Documentação de instalação do ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Estado: rascunho, pendente de revisão por cheny. A disponibilidade do ecossistema muda
rapidamente — volte a verificar as páginas da NVIDIA indicadas antes de confiar nesta
tabela. Ainda não verificado em hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é publicada
pela Juxi Technology e não é uma publicação da NVIDIA.
