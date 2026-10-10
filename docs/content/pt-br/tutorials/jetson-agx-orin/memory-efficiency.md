---
title: Eficiência de memória — Executando cargas de trabalho maiores em 64GB
sidebar_label: Eficiência de memória
slug: /tutorials/memory-efficiency
description: >-
  As alavancas documentadas para reduzir o uso de memória no kit de
  desenvolvedor AGX Orin — habilidades de agente no nível da plataforma,
  otimizações no nível do modelo no TensorRT Edge-LLM e como medir os
  resultados.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# Eficiência de memória — Executando cargas de trabalho maiores em 64GB

Em dispositivos de borda, é a memória — não a computação — que normalmente
limita quais modelos você consegue executar. O JetPack 7.2 chegou com a
eficiência de memória como tema de destaque, e há três camadas documentadas de
otimização: a **plataforma**, o **modelo** e a **medição**. Esta página mapeia
as alavancas; cada uma aponta para a fonte oficial.

## Alavanca 1 — Nível da plataforma (habilidades de agente da NVIDIA)

As **habilidades de agente de otimização de memória** do JetPack 7.2 guiam um
agente de IA pela auditoria e redução do consumo de memória em toda a pilha,
segundo a NVIDIA:

- **Regiões reservadas de memória do bootloader (carveouts)** — recupere a memória reservada antes de o Linux iniciar
- **Reservas de memória do kernel** — ajuste o que o kernel retém
- **Sobrecarga do espaço de usuário** — encontre e remova processos e serviços redundantes

O objetivo declarado pela NVIDIA: encaixar cargas de trabalho mais capazes em
menos memória (é assim que o mesmo hardware continua ficando mais útil ao longo
das versões de software). Comece por aqui:

- [Habilidades do lado do dispositivo Jetson](https://github.com/jetson-device-skills) · [Habilidades de BSP do Jetson](https://github.com/jetson-bsp-skills)
- Contexto: [blog de eficiência de memória do JetPack 7.2 da NVIDIA](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Atenção:** alterações em carveouts e reservas afetam o comportamento de
> inicialização. Faça as alterações uma de cada vez, mantenha um caminho de
> recuperação (consulte [Gravação e atualizações](/pt-br/tutorials/jetson-agx-orin/flashing-and-updates))
> e valide novamente antes de ir para produção.

## Alavanca 2 — Nível do modelo (recursos do TensorRT Edge-LLM)

Para cargas de trabalho de LLM/VLM, os maiores consumidores de memória são os
pesos e o cache KV. O TensorRT Edge-LLM documenta estas alavancas (o Jetson Orin
executa engines FP16/INT8/INT4 — consulte [Inferência de LLM local](/pt-br/tutorials/jetson-agx-orin/local-llm)):

| Alavanca | O que faz | Documentação |
|---|---|---|
| **Quantização** (INT8/INT4 no Orin) | Pesos menores, menos largura de banda | [Guia de quantização](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Redução de vocabulário** | Encolhe o vocabulário de saída / as tabelas de embeddings | [Reduzir vocabulário](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **Reutilização de cache KV** | Reutiliza o cache entre solicitações relacionadas em vez de recalcular | [Reutilização de cache KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **Poda de tokens visuais DART** | Corta tokens de imagem redundantes para VLMs | [Poda DART](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(O cache KV em FP8 existe na documentação, mas é voltado ao Thor; o Orin é
limitado a engines FP16/INT8/INT4 conforme a matriz de compatibilidade
oficial.)*

## Alavanca 3 — Meça, não adivinhe

- **Visão do sistema:** `tegrastats` (integrado ao Jetson Linux) para CPU/GPU/memória em tempo real — consulte [Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system).
- **Visão do modelo:** o TensorRT Edge-LLM inclui um [projeto e ferramentas de monitoramento de memória](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html) e publica [benchmarks de desempenho por versão](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Método:** registre uma linha de base (memória usada em repouso e sob carga), mude **uma** alavanca, meça de novo. Números prontos para publicação devem sempre vir da sua própria carga de trabalho.

## O que isso significa na prática

- O módulo de 64GB já executa modelos da classe de 30B (veja os números
  publicados em [Inferência de LLM local](/pt-br/tutorials/jetson-agx-orin/local-llm)); a otimização de
  memória é o que permite adicionar *mais* em cima — pipelines com múltiplos
  modelos, contextos mais longos, agentes sempre ativos ([IA agêntica](/pt-br/tutorials/jetson-agx-orin/agentic-ai)), pipelines
  de vídeo em paralelo com a inferência ([DeepStream](/pt-br/tutorials/jetson-agx-orin/deepstream)).
- Se a sua carga de trabalho cabe hoje, mas por pouco, comece pela Alavanca 2
  (nível do modelo) — é a de menor risco e melhor documentada. Use a Alavanca 1
  quando você precisar espremer a própria plataforma.

## Fontes

- [Blog técnico da NVIDIA — eficiência de memória e habilidades de agente no JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (consultado em 2026-09-24)
- [Documentação do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (recursos e matriz de compatibilidade; consultado em 2026-09-24)

*Status: revisado em 2026-10-11. Baseado na documentação oficial
da NVIDIA na data indicada; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
