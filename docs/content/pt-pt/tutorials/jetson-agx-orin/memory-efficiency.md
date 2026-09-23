---
title: Eficiência de memória — Executar cargas de trabalho maiores em 64GB
sidebar_label: Eficiência de memória
slug: /tutorials/memory-efficiency
description: >-
  As alavancas documentadas para reduzir o uso de memória no Kit de
  Desenvolvimento AGX Orin — competências de agente ao nível da plataforma,
  otimizações ao nível do modelo no TensorRT Edge-LLM e como medir os
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

# Eficiência de memória — Executar cargas de trabalho maiores em 64GB

Nos dispositivos de borda, a memória — e não o poder de computação — é
normalmente o que limita os modelos que consegue executar. O JetPack 7.2 chegou
com a eficiência de memória como tema central, e há três camadas de otimização
documentadas: a **plataforma**, o **modelo** e a **medição**. Esta página mapeia
as alavancas; cada uma remete para a fonte autoritativa.

## Alavanca 1 — Nível da plataforma (competências de agente da NVIDIA)

As **competências de agente de otimização de memória** do JetPack 7.2 orientam
um agente de IA na auditoria e redução do consumo de memória em toda a pilha,
segundo a NVIDIA:

- **Reservas de memória do bootloader (carveouts)** — recuperar memória reservada antes de o Linux arrancar
- **Reservas de memória do kernel** — ajustar o que o kernel retém
- **Sobrecarga do espaço de utilizador** — encontrar e remover processos e serviços redundantes

O objetivo definido pela NVIDIA: encaixar cargas de trabalho com mais
capacidades em pegadas de memória mais pequenas (é assim que o mesmo hardware
se torna cada vez mais útil ao longo das versões de software). Comece por aqui:

- [Competências do lado do dispositivo Jetson](https://github.com/jetson-device-skills) · [Competências de BSP do Jetson](https://github.com/jetson-bsp-skills)
- Contexto: [blogue da NVIDIA sobre eficiência de memória no JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Atenção:** as alterações a carveouts e reservas afetam o comportamento de
> arranque. Faça as alterações uma de cada vez, mantenha um caminho de
> recuperação (consulte
> [Gravação e atualizações](/pt-pt/tutorials/jetson-agx-orin/flashing-and-updates)) e
> volte a validar antes de avançar para produção.

## Alavanca 2 — Nível do modelo (funcionalidades do TensorRT Edge-LLM)

Para cargas de trabalho LLM/VLM, os maiores consumidores de memória são os
pesos e a KV cache. O TensorRT Edge-LLM documenta estas alavancas (o Jetson
Orin executa motores FP16/INT8/INT4 — consulte [Inferência de LLM
local](/pt-pt/tutorials/jetson-agx-orin/local-llm)):

| Alavanca | O que faz | Documentação |
|---|---|---|
| **Quantização** (INT8/INT4 no Orin) | Pesos mais pequenos, menos largura de banda | [Guia de quantização](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Redução de vocabulário** | Encolhe o vocabulário de saída / as tabelas de embedding | [Reduzir o vocabulário](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **Reutilização da KV cache** | Reutiliza a cache entre pedidos relacionados em vez de recalcular | [Reutilização da KV cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **Poda de tokens visuais DART** | Corta tokens de imagem redundantes para VLMs | [Poda DART](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(A KV cache FP8 existe na documentação, mas é orientada ao Thor; o Orin está
limitado a motores FP16/INT8/INT4 segundo a matriz de suporte oficial.)*

## Alavanca 3 — Medir, não adivinhar

- **Vista do sistema:** `tegrastats` (incluído no Jetson Linux) para CPU/GPU/memória em tempo real — consulte [Verificar o sistema](/pt-pt/tutorials/jetson-agx-orin/verify-your-system).
- **Vista do modelo:** o TensorRT Edge-LLM inclui um [design e ferramentas de monitorização de memória](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html) e publica [benchmarks de desempenho por versão](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Método:** registe uma linha de base (memória utilizada em repouso e sob carga), altere **uma** alavanca e meça novamente. Os números prontos a publicar devem vir sempre da sua própria carga de trabalho.

## O que isto significa na prática

- O módulo de 64GB já executa modelos da classe dos 30B (ver números publicados
  em [Inferência de LLM local](/pt-pt/tutorials/jetson-agx-orin/local-llm)); a otimização de memória é o que lhe permite
  acrescentar *mais* por cima — pipelines com vários modelos, contextos mais
  longos, agentes sempre ativos ([IA agêntica](/pt-pt/tutorials/jetson-agx-orin/agentic-ai)), pipelines de vídeo em paralelo com a inferência
  ([DeepStream](/pt-pt/tutorials/jetson-agx-orin/deepstream)).
- Se a sua carga de trabalho já cabe hoje, mas por pouco, comece pela Alavanca 2
  (nível do modelo) — é a de menor risco e a melhor documentada. Use a Alavanca 1
  quando precisar de espremer a própria plataforma.

## Fontes

- [Blogue técnico da NVIDIA — eficiência de memória e competências de agente no JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (verificado em 2026-09-24)
- [Documentação do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (funcionalidades e matriz de suporte; verificado em 2026-09-24)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
