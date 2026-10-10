---
title: Executar LLMs localmente — TensorRT Edge-LLM no JetPack 7.2
sidebar_label: Inferência local de LLM
slug: /tutorials/local-llm
description: >-
  Execute grandes modelos de linguagem e multimodais localmente no Kit de
  Desenvolvimento AGX Orin com o NVIDIA TensorRT Edge-LLM — modelos suportados,
  restrições do Orin, fluxo de trabalho e desempenho esperado.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# Executar LLMs localmente — TensorRT Edge-LLM no JetPack 7.2

O seu AGX Orin de 64GB pode executar grandes modelos de linguagem localmente —
sem nuvem, sem rede. A via otimizada da NVIDIA para isso é o **TensorRT
Edge-LLM**, que **suporta oficialmente o Jetson Orin no JetPack 7.2**. Esta
página serve de orientação: o que o seu kit pode e não pode fazer, a forma do
fluxo de trabalho e o desempenho que pode esperar. O passo a passo autoritativo
está na documentação da NVIDIA (com ligações ao longo da página).

## Leia isto primeiro — três factos específicos do Orin

1. **O Orin executa apenas motores FP16, INT8 e INT4. FP8 e FP4 não são
   suportados no Orin** (são capacidades da classe Thor). A matriz de
   compatibilidade da NVIDIA afirma-o explicitamente — planeie as suas escolhas
   de quantização em conformidade.
2. **Os motores são compilados no dispositivo** para o caminho de implementação
   do Orin (não por compilação cruzada a partir de um PC).
3. **O JetPack 7.2 é a pilha suportada** — CUDA 13.2 com o TensorRT da
   plataforma (10.16.2 nesta versão). O wheel aarch64 destina-se ao Jetson Orin
   (SM87) com Python 3.10–3.12.

*(Fonte: Matriz de compatibilidade oficial do TensorRT Edge-LLM, consultada em 2026-09-24.)*

## O que o TensorRT Edge-LLM abrange

Segundo a documentação da NVIDIA, o Edge-LLM proporciona inferência otimizada
para **modelos de texto, visão, áudio, fala e ação** em plataformas de edge:

| Capacidade | Exemplos na documentação |
|---|---|
| Geração de texto | Famílias de LLM, incluindo Qwen, Gemma, Nemotron |
| Multimodal (VLM) | Exemplo Phi-4 Multimodal |
| Reconhecimento de fala (ASR) | Fluxo de trabalho de exemplo dedicado |
| Geração de fala (TTS) | Fluxo de trabalho de exemplo dedicado |
| Visão-Linguagem-Ação | Exemplos VLA (robótica) |
| Omni (I/O de áudio + visão + fala) | Fluxo de trabalho de exemplo dedicado |

Destaques de funcionalidades: quantização (INT8/INT4 no Orin), descodificação
especulativa (EAGLE3, DFlash e outros), **reutilização de KV-cache**,
**redução de vocabulário**, **poda de tokens visuais DART** para VLMs, saída
em streaming e suporte para LoRA.

## O fluxo de trabalho (conforme documentado)

O TensorRT Edge-LLM tem dois caminhos de Início Rápido documentados:

1. **ONNX + runtime C++** — exportar/quantizar checkpoints (normalmente num
   host x86), transferir para o dispositivo, compilar motores no dispositivo e
   executar o runtime C++.
2. **Servidor Python de uma linha** — o caminho mais rápido para um endpoint de
   serviço.

Comece aqui: **[Início Rápido do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Para além do Início Rápido:

- [Opções de instalação →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (runtime C++ a partir do código-fonte, fluxo de trabalho de exportação/quantização, wheel local experimental)
- [Modelos suportados →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Guia de quantização →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [Reutilização de KV cache →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Poda DART →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Dica da Juxi:** as ferramentas de exportação/quantização funcionam melhor
> num host Linux x86 (de acordo com as linhas de developer x86 da
> documentação); a **compilação do motor e a inferência são executadas no seu
> kit**. Reserve espaço em disco para os checkpoints dos modelos — vários GB
> por modelo é o típico.

## Serviço: endpoint compatível com OpenAI (e Claude Code)

A documentação inclui uma **API e um servidor Python experimentais** que
expõem uma interface de chat compatível com OpenAI — com exemplos documentados
para clientes ao estilo OpenAI e até um **exemplo de integração "Anthropic e
Claude Code"** (que aponta o Claude Code para o seu endpoint alojado no
Jetson).

- [API e servidor Python experimentais →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Desempenho esperado (AGX Orin 64GB)

A NVIDIA publicou estes valores de tokens/seg para o JetPack 7.2 no módulo de
64GB (junho de 2026; consulte o blogue de origem para o contexto e a
metodologia completos):

| Modelo | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

Os seus números vão variar com o modelo, a quantização, o comprimento do
contexto e o modo de energia. Trate estes valores como a referência publicada
pelo fornecedor, não como uma garantia.

## Alternativas mais simples

Se o fluxo de trabalho de exportação/compilação do Edge-LLM for mais do que
aquilo de que precisa neste momento, o [Jetson AI Lab](https://www.jetson-ai-lab.com)
da NVIDIA publica tutoriais práticos para outros runtimes (llama.cpp, vLLM e
mais) — verifique as notas de versão do JetPack antes de seguir tutoriais mais
antigos.

## Resolução de problemas

- **A primeira execução é lenta:** a compilação do motor pode demorar vários
  minutos no primeiro arranque; as execuções seguintes reutilizam o motor (o
  mesmo comportamento aplica-se ao DeepStream — consulte [o nosso tutorial de DeepStream](/pt-pt/tutorials/jetson-agx-orin/deepstream)).
- **Instruções FP8/FP4 não funcionam:** é esperado — o Orin só suporta motores
  FP16/INT8/INT4.
- **Versões erradas:** confirme primeiro o JetPack 7.2.1 — [Verifique o seu sistema](/pt-pt/tutorials/jetson-agx-orin/verify-your-system).

## Fontes

- [TensorRT Edge-LLM — Matriz de compatibilidade oficial](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (consultada em 2026-09-24)
- [Página inicial da documentação do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, consultada em 2026-09-24)
- [Blogue técnico da NVIDIA — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (valores de desempenho; consultados em 2026-09-24)

*Estado: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registadas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
