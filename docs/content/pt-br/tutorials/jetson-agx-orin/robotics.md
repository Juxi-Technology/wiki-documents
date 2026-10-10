---
title: Robótica no JetPack 7.2 — o que funciona hoje
sidebar_label: Robótica (situação atual)
slug: /tutorials/robotics
description: >-
  Uma página de status honesta para o desenvolvimento de robótica no kit de
  desenvolvedor AGX Orin com o JetPack 7.2 — ROS 2, disponibilidade do Isaac
  ROS, stacks de aprendizado de robô e o que verificar antes de se
  comprometer.
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

O JetPack 7.2 levou o Orin a uma nova geração de plataforma (Ubuntu 24.04,
kernel 6.8, CUDA 13). O quadro da robótica é misto: os componentes centrais
(ROS 2, Isaac ROS) agora já estão no lugar nesta plataforma, enquanto partes
do stack ao redor ainda estão se acomodando — por isso esta página é
deliberadamente uma página de status, não um tutorial. Consulte-a antes de se
comprometer com uma arquitetura.

## Tabela de status (verificada em 2026-09-24; linha do Isaac ROS reverificada em 2026-09-26)

| O que você precisa | Status no JetPack 7.2 / AGX Orin | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | O Ubuntu 24.04 é a plataforma-alvo do ROS 2 **Jazzy**; instale conforme a [documentação de instalação do ROS 2](https://docs.ros.org/en/jazzy/Installation.html). O ROS 2 baseado em Docker também é uma opção. |
| **Isaac ROS** (pacotes ROS 2 acelerados por hardware) | ✅ **Compatível desde o Isaac ROS 4.6.0** (2026-08-18) | Lançado para o JetPack 7.2 no Jetson Orin, com um passo a passo oficial de configuração do AGX Orin. Sua decisão real é a distribuição do ROS 2: **4.6.x no Jazzy** vs **5.0 no Lyrical** — consulte [Isaac ROS no JetPack 7.2](#isaac-ros-no-jetpack-7-2). |
| **Modelos LLM / VLM / VLA locais** | ✅ Funciona | O TensorRT Edge-LLM oferece suporte oficial ao Orin no JP7.2, incluindo exemplos de **Vision-Language-Action** — consulte [Inferência de LLM local](/pt-br/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines de vídeo multicâmera** | ✅ Funciona | O DeepStream 9.1 acompanha o JP7.2 — consulte [Análise de vídeo com DeepStream](/pt-br/tutorials/jetson-agx-orin/deepstream). |
| **Comportamentos agênticos / orquestração** | ✅ Funciona | NemoClaw + habilidades de agente do Jetson — consulte [IA agêntica](/pt-br/tutorials/jetson-agx-orin/agentic-ai). |
| **Stacks de aprendizado de robô (frameworks Python no estilo LeRobot)** | ⚠️ Verifique antes de se comprometer | Esses stacks são fortemente baseados em Python; o Ubuntu 24.04 passou para o Python 3.12 e algumas dependências podem ficar para trás. Teste o seu stack específico no JP7.2 antes de projetar em cima dele — e observe que **não verificamos isso em hardware**. |
| **GR00T (modelos de fundação para humanoides)** | ⚠️ Consulte as fontes oficiais | Acompanhe o repositório oficial do Isaac GR00T da NVIDIA e os anúncios de suporte à plataforma. Um passo a passo publicado por um parceiro relata uma implantação TensorRT de pesos completos no AGX Orin + JP7.2 *(terceiros, não verificado por nós)*. |
| **Placas portadoras personalizadas / trabalho de BSP** | ✅ Novas ferramentas | As **habilidades de agente de personalização do Jetson Linux** do JetPack 7.2 automatizam tarefas de bring-up de BSP — consulte os [repositórios de habilidades de agente](https://github.com/jetson-bsp-skills). |

## Isaac ROS no JetPack 7.2

A era do "em breve" acabou. A versão **4.6.0** do Isaac ROS (2026-08-18)
adicionou suporte a **Jetson Orin** e **JetPack 7.2**, e a tabela de
plataformas compatíveis combina *Jetson Orin* com *JetPack 7.2* (SSD NVMe de
128+ GB). A NVIDIA publica um guia de início rápido e um passo a passo de
configuração do Docker dedicados ao **Jetson AGX Orin** para essa combinação —
este kit é um alvo de primeira classe, não uma reflexão tardia.

A decisão que realmente importa é qual **distribuição do ROS 2** você adota:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Lançado | 2026-08-18 | 2026-09-21 |
| Distribuição do ROS 2 | **Jazzy** — a versão padrão do Ubuntu 24.04 | **Lyrical Luth** — a NVIDIA compila os pacotes ROS 2 Noble por conta própria e os serve a partir do CDN da sua buildfarm |
| Pacotes NITROS | Presentes | **Removidos** e reconstruídos nativamente sobre `rosidl::Buffer`; código que chama APIs ou tipos do NITROS diretamente precisa de uma migração em nível de código-fonte |
| Compatibilidade com o Isaac Sim | 6.0 (5.0/5.1 ainda com suporte legado) | 6.0 |

- Se você está começando do zero e quer o caminho convencional: **4.6.x no
  Jazzy** mantém você na versão padrão do ROS 2. O **5.0** é para onde a NVIDIA
  está indo e traz o ecossistema Lyrical — leia as orientações de migração de
  NITROS para `rosidl::Buffer` linkadas nas
  [notas de versão do 5.0.0](https://nvidia-isaac-ros.github.io/releases/index.html)
  antes de atualizar código de nós existente.
- **Restrições conhecidas no Orin** nessas versões: câmeras RealSense funcionam
  **apenas no modo Docker**; com `isaac_ros_stereo_image_proc`, selecionar
  `backend:=JETSON` no AGX Orin com entrada RGB8/BGR8 pode abortar o nó com um
  erro de VPI — mantenha o padrão `backend:=CUDA`; o Teleop do pacote Debian
  precisa de `ISAAC_TELEOP_CLOUDXR_EXP=0` no Orin; e o pré-processamento do
  `isaac_ros_dnn_image_encoder` do 5.0 é mais lento que o do 4.6 no AGX Orin —
  se esse nó for crítico no seu grafo, prefira o 4.6.
- **OpenCV:** o JetPack 7.2 traz o OpenCV **4.8.0**, enquanto o Isaac ROS espera
  o **4.6.0**. Remova os pacotes do sistema
  (`sudo apt-get remove -y libopencv* opencv*`) e os pacotes do Isaac ROS
  instalam a versão fixada.

### Onde as próprias páginas da NVIDIA divergem

A [página de downloads do JetPack](https://developer.nvidia.com/embedded/jetpack/downloads)
da NVIDIA ainda lista o Isaac ROS como **"em breve"** para esta versão,
enquanto as notas de versão do Isaac ROS afirmam suporte desde o 4.6.0. As
duas páginas não foram reconciliadas — o Isaac ROS é lançado independentemente
do JetPack, e a tabela de componentes da página do JetPack acompanha o que é
distribuído *com* o JetPack. Os repositórios apt que a documentação do Isaac
ROS indica são a evidência concreta da combinação compatível:
`…/isaac-ros/release-4.6 noble-jetpack` — *noble* para o Ubuntu 24.04,
*jetpack* para a compilação do JetPack. Quando as duas divergirem, trate as
[notas de versão do Isaac ROS](https://nvidia-isaac-ros.github.io/releases/index.html)
como a fonte decisiva, e verifique na sua própria configuração antes de
projetar com base em uma ou outra.

## Recomendação

- **Novos projetos sem dependência de robótica:** construa sobre o JetPack 7.2 —
  você ganha suporte ao Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLMs no
  dispositivo e as ferramentas de agente.
- **Projetos que usam o Isaac ROS:** o JetPack 7.2 é novamente um alvo
  compatível. Escolha deliberadamente entre 4.6.x (Jazzy) e 5.0 (Lyrical), e
  conte com a troca do OpenCV e com o suporte a câmeras RealSense somente no
  modo Docker. Se você está no meio de um projeto no JetPack 6.x com um stack
  validado, não há migração forçada — migre quando a escolha da versão do
  Isaac ROS estiver definida (nosso
  [guia de migração](/pt-br/tutorials/jetson-agx-orin/jetpack-6-to-7) cobre o
  trabalho de reconstrução).
- **Um kit, vários módulos:** lembre-se de que seu kit de desenvolvedor pode
  emular os outros módulos Jetson Orin por meio de uma nova gravação — útil para
  validar uma carga de trabalho de robô em toda a linha de módulos antes de
  escolher o componente de produção
  ([Visão geral do produto](/pt-br/tutorials/jetson-agx-orin/overview)).

## Fontes

- [Isaac ROS — releases: notas de versão 4.6.0 (2026-08-18) e 5.0.0 (2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html) (verificado em 2026-09-26)
- [Isaac ROS 4.6 — Getting Started: plataformas compatíveis, passo a passo do Jetson AGX Orin, instalação via apt](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (verificado em 2026-09-26)
- [Isaac ROS 5.0 — Getting Started: plataformas compatíveis, CDN da buildfarm do Lyrical](https://nvidia-isaac-ros.github.io/getting_started/index.html) (verificado em 2026-09-26)
- [Página de downloads do JetPack 7.2.1 — lista de componentes](https://developer.nvidia.com/embedded/jetpack/downloads) — ainda traz a linha desatualizada "em breve" do Isaac ROS (verificado em 2026-09-26)
- [Guia do usuário do kit de desenvolvedor Jetson AGX Orin — Introdução](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulação de módulos; verificado em 2026-09-24)
- [Documentação de instalação do ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Status: revisado em 2026-10-11. A disponibilidade do
ecossistema muda rapidamente — verifique novamente as páginas da NVIDIA
vinculadas antes de confiar nesta tabela. Ainda não verificado em hardware
físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação oficial da NVIDIA.
