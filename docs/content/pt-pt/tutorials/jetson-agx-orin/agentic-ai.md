---
title: IA agêntica — NemoClaw no JetPack 7.2
sidebar_label: IA agêntica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Implemente o NVIDIA NemoClaw no Kit de Desenvolvedor AGX Orin — instalação
  com um único comando, competências de agente para Jetson e notas práticas
  para agentes sempre ativos.
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

O JetPack 7.2 torna o seu kit **pronto para IA agêntica**: o NVIDIA NemoClaw
instala-se com um único comando, e as competências de agente da NVIDIA
automatizam grande parte do trabalho de plataforma que antes era manual.

## O que é o NemoClaw

Segundo a NVIDIA: o NemoClaw é uma coleção aberta de stack/blueprints para
construir **agentes autónomos** — sistemas de IA sempre ativos que raciocinam,
planeiam e agem. Acrescenta controlos de privacidade e segurança (através dos
controlos de política em tempo de execução do **OpenShell**) ao ecossistema de
agentes OpenClaw e reúne componentes NVIDIA como os modelos Nemotron e o NeMo.
O JetPack 7.2 vem **pré-configurado com as dependências necessárias**, pelo que
não é preciso configurar o ambiente manualmente no seu kit.

- Página do produto NemoClaw: <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw no GitHub: <https://github.com/NemoClaw> · exemplos da comunidade: <https://github.com/nemoclaw-community>

## Instalação (um único comando, oficial)

No kit (JetPack 7.2+), execute:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Nota de segurança — leia antes de executar:** isto instala um framework de
> agentes sempre ativos. Verifique aquilo a que o agente tem permissão de
> aceder e que credenciais pode utilizar *antes* de o ativar; prefira tokens
> com âmbito limitado e revogáveis, e use os controlos de política do
> OpenShell. Não deixe um agente sem supervisão com um acesso que não possa
> revogar.

## Após a instalação — para onde ir a seguir

A NVIDIA mantém um **centro de recursos Build-a-Claw** com orientações de
instalação, testes na nuvem e recursos de aprendizagem: <https://www.nvidia.com/en-us/ai/build-a-claw>

Também útil:

- Curso do NVIDIA Deep Learning Institute: *Securing Agents With NemoClaw and OpenShell* (ver o centro de recursos)
- Discord de Programadores da NVIDIA — canal `#nemoclaw`
- Guias de terceiros (por exemplo, [o guia NemoClaw da Seeed Studio](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), escrito para um braço robótico Jetson Thor) documentam fluxos pós-instalação como `nemoclaw onboard` — encare-os como orientação da comunidade e siga o centro de recursos da NVIDIA para o fluxo oficial.

## Competências de agente para Jetson — automatizar o trabalho de plataforma

O JetPack 7.2 inclui **competências de agente**: fluxos de trabalho repetíveis
e executáveis por agentes para o desenvolvimento em Jetson. Três categorias,
segundo a NVIDIA:

| Categoria de competências | O que automatiza |
|---|---|
| **Personalização do Jetson Linux** | Compilar/personalizar uma BSP para placas portadoras personalizadas — configuração de I/O, clocks, controlo da ventoinha, perfis de energia |
| **Otimização de memória** | Auditar regiões de memória reservadas pelo bootloader, reservas do kernel e memória do espaço de utilizador, para acomodar cargas de trabalho mais exigentes em menos memória |
| **Benchmarking de modelos** | Encontrar a configuração ótima do modelo e os diagnósticos para o seu dispositivo |

Mais competências de agente no ecossistema:

- [Competências do lado do dispositivo Jetson](https://github.com/jetson-device-skills) · [Competências de BSP do Jetson](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — construção de pipelines de visão assistida por agente (ver [o nosso tutorial de DeepStream](/pt-pt/tutorials/jetson-agx-orin/deepstream))
- [Competências do blueprint Metropolis VSS](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — fluxos de trabalho de pesquisa e sumarização de vídeo

## Notas práticas para o kit AGX Orin

- **Os agentes sempre ativos precisam de computação dedicada** — é
  precisamente por isso que se executam num kit e não num portátil que
  suspende; planeie a alimentação e a dissipação térmica em conformidade (ver
  as notas sobre os modos de energia em
  [Resolução de problemas](/pt-pt/tutorials/jetson-agx-orin/troubleshooting)).
- **A escolha do modelo é importante para a memória** — os modelos locais no
  Orin funcionam bem dentro dos 64GB, mas os agentes sempre ativos acumulam
  contexto. Consulte [Eficiência de memória](/pt-pt/tutorials/jetson-agx-orin/memory-efficiency)
  para os ajustes possíveis, e
  [Inferência de LLM local](/pt-pt/tutorials/jetson-agx-orin/local-llm) para o desempenho dos modelos no dispositivo.
- **Esta área evolui rapidamente.** Encare os comandos acima como o caminho
  oficial atual; consulte o centro de recursos para atualizações antes de
  automatizar implementações com scripts.

## Fontes

- [Blogue técnico da NVIDIA — IA agêntica no JetPack 7.2 (comando de instalação, competências de agente, funcionalidades da versão)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (consultado em 2026-09-24)
- [Página do produto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (consultado em 2026-09-24)
- [Página de downloads do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado em 2026-09-24)

*Estado: revisado em 2026-10-11. Baseado na documentação oficial
da NVIDIA à data indicada; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registadas da NVIDIA Corporation. Esta página é publicada
pela Juxi Technology e não é uma publicação da NVIDIA.
