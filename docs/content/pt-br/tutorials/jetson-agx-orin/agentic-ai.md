---
title: IA agêntica — NemoClaw no JetPack 7.2
sidebar_label: IA agêntica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Implante o NVIDIA NemoClaw no kit de desenvolvedor AGX Orin — instalação com
  um único comando, habilidades de agente do Jetson e notas práticas para
  agentes sempre ativos.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# IA agêntica — NemoClaw no JetPack 7.2

O JetPack 7.2 deixa o seu kit **pronto para IA agêntica**: o NVIDIA NemoClaw é
instalado com um único comando, e as habilidades de agente da NVIDIA automatizam
grande parte do trabalho de plataforma que antes era manual.

## O que é o NemoClaw

Segundo a NVIDIA: o NemoClaw é uma coleção aberta de stack/blueprints para
construir **agentes autônomos** — sistemas de IA sempre ativos que raciocinam,
planejam e agem. Ele adiciona controles de privacidade e segurança (por meio dos
controles de política em tempo de execução do **OpenShell**) ao ecossistema de
agentes OpenClaw, e empacota componentes NVIDIA como os modelos Nemotron e o
NeMo. O JetPack 7.2 vem **pré-configurado com as dependências necessárias**, então
não é preciso configurar o ambiente manualmente no seu kit.

- Página do produto NemoClaw: <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw no GitHub: <https://github.com/NemoClaw> · exemplos da comunidade: <https://github.com/nemoclaw-community>

## Instalação (um único comando, oficial)

No kit (JetPack 7.2+), execute:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Nota de segurança — leia antes de executar:** isto instala um framework de
> agentes sempre ativos. Revise o que o agente pode acessar e quais credenciais
> ele pode usar *antes* de habilitá-lo, prefira tokens com escopo limitado e
> revogáveis, e use os controles de política do OpenShell. Não deixe um agente
> sem supervisão com um acesso que você não consiga revogar.

## Após a instalação — para onde ir em seguida

A NVIDIA mantém um **Build-a-Claw Resource Hub** com orientações de instalação,
testes na nuvem e recursos de aprendizado: <https://www.nvidia.com/en-us/ai/build-a-claw>

Também é útil:

- Curso do NVIDIA Deep Learning Institute: *Securing Agents With NemoClaw and OpenShell* (veja o centro de recursos)
- Discord do NVIDIA Developer — canal `#nemoclaw`
- Guias de terceiros (p. ex., o [guia de NemoClaw da Seeed Studio](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), escrito para um braço robótico Jetson Thor) documentam fluxos pós-instalação como `nemoclaw onboard` — trate-os como orientação da comunidade e siga o centro de recursos da NVIDIA para o fluxo de referência.

## Habilidades de agente do Jetson — automatize o trabalho de plataforma

O JetPack 7.2 inclui **habilidades de agente** (agent skills): fluxos de
trabalho repetíveis e executáveis por agentes para o desenvolvimento em Jetson.
Três categorias segundo a NVIDIA:

| Categoria de habilidade | O que automatiza |
|---|---|
| **Personalização do Jetson Linux** | Criar/personalizar um BSP para placas portadoras personalizadas — configuração de E/S, clocks, controle de ventoinha, perfis de energia |
| **Otimização de memória** | Auditar regiões reservadas do bootloader, reservas do kernel e memória de espaço de usuário para encaixar cargas de trabalho mais capazes em menos memória |
| **Benchmarking de modelos** | Encontrar a configuração ideal do modelo e diagnósticos para o seu dispositivo |

Mais habilidades de agente no ecossistema:

- [Habilidades do lado do dispositivo Jetson](https://github.com/jetson-device-skills) · [Habilidades de BSP do Jetson](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — construção de pipelines de visão assistida por agente (veja [nosso tutorial de DeepStream](/pt-br/tutorials/jetson-agx-orin/deepstream))
- [Habilidades do blueprint Metropolis VSS](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — fluxos de trabalho de busca e sumarização de vídeo

## Notas práticas para o kit AGX Orin

- **Agentes sempre ativos precisam de computação dedicada** — é justamente por
  isso que rodam em um kit, e não em um notebook que suspende; planeje a energia
  e a refrigeração de acordo (veja as notas sobre modos de energia em
  [Solução de problemas](/pt-br/tutorials/jetson-agx-orin/troubleshooting)).
- **A escolha do modelo importa para a memória** — modelos locais no Orin rodam
  bem dentro dos 64GB, mas agentes sempre ativos acumulam contexto. Veja
  [Eficiência de memória](/pt-br/tutorials/jetson-agx-orin/memory-efficiency) para conhecer os ajustes, e
  [Inferência de LLM local](/pt-br/tutorials/jetson-agx-orin/local-llm) para o desempenho de modelos no dispositivo.
- **Esta área avança rápido.** Trate os comandos acima como o caminho oficial
  atual; confira o centro de recursos em busca de atualizações antes de
  automatizar implantações por script.

## Fontes

- [Blog técnico da NVIDIA — IA agêntica no JetPack 7.2 (comando de instalação, habilidades de agente, recursos da versão)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (consultado em 2026-09-24)
- [Página do produto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (consultado em 2026-09-24)
- [Página de downloads do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado em 2026-09-24)

*Status: revisado em 2026-10-11. Baseado na documentação oficial
da NVIDIA na data indicada; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
