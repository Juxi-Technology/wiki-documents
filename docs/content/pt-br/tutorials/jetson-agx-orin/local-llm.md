---
title: Executar LLMs localmente — TensorRT Edge-LLM no JetPack 7.2
sidebar_label: Inferência de LLM local
slug: /tutorials/local-llm
description: >-
  Execute grandes modelos de linguagem e multimodais localmente no Kit de
  Desenvolvedor AGX Orin com o NVIDIA TensorRT Edge-LLM — modelos compatíveis,
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

Seu AGX Orin de 64GB pode executar grandes modelos de linguagem localmente — sem
nuvem, sem rede. O caminho otimizado da NVIDIA para isso é o **TensorRT
Edge-LLM**, e ele **oficialmente oferece suporte ao Jetson Orin no JetPack
7.2**. Esta página serve como orientação: o que o seu kit pode e não pode fazer,
o formato do fluxo de trabalho e o desempenho que você pode esperar. O passo a
passo oficial está na documentação da NVIDIA (com links ao longo da página).

## Leia isto primeiro — três fatos específicos do Orin

1. **O Orin executa somente engines FP16, INT8 e INT4. FP8 e FP4 não são
   compatíveis com o Orin** (são recursos da classe Thor). A matriz de
   compatibilidade da NVIDIA afirma isso explicitamente — planeje suas escolhas
   de quantização de acordo.
2. **Os engines são compilados no próprio dispositivo** para o caminho de
   implantação no Orin (não por compilação cruzada a partir de um PC).
3. **O JetPack 7.2 é a pilha com suporte** — CUDA 13.2 com o TensorRT da
   plataforma (10.16.2 nesta versão). O wheel aarch64 tem como alvo o Jetson
   Orin (SM87) com Python 3.10–3.12.

*(Fonte: matriz de compatibilidade oficial do TensorRT Edge-LLM, consultada em 2026-09-24.)*

## O que o TensorRT Edge-LLM abrange

De acordo com a documentação da NVIDIA, o Edge-LLM oferece inferência otimizada
para **modelos de texto, visão, áudio, fala e ação** em plataformas de borda:

| Recurso | Exemplos na documentação |
|---|---|
| Geração de texto | Famílias de LLM, incluindo Qwen, Gemma, Nemotron |
| Multimodal (VLM) | Exemplo do Phi-4 Multimodal |
| Reconhecimento de fala (ASR) | Fluxo de exemplo dedicado |
| Geração de fala (TTS) | Fluxo de exemplo dedicado |
| Visão-Linguagem-Ação | Exemplos de VLA (robótica) |
| Omni (E/S de áudio + visão + fala) | Fluxo de exemplo dedicado |

Destaques de recursos: quantização (INT8/INT4 no Orin), decodificação
especulativa (EAGLE3, DFlash e outras), **reutilização de cache KV**, **redução
de vocabulário**, **poda DART de tokens visuais** para VLMs, saída em streaming
e suporte a LoRA.

## O fluxo de trabalho (conforme documentado)

O TensorRT Edge-LLM tem dois caminhos de Quick Start documentados:

1. **ONNX + runtime C++** — exporte/quantize os checkpoints (normalmente em um host x86), transfira para o dispositivo, compile os engines no dispositivo, execute o runtime C++.
2. **Servidor Python em uma linha** — o caminho mais rápido para um endpoint de serviço.

Comece por aqui: **[Quick Start do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Além do Quick Start:

- [Opções de instalação →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (runtime C++ a partir do código-fonte, fluxo de exportação/quantização, wheel local experimental)
- [Modelos compatíveis →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Guia de quantização →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [Reutilização de cache KV →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Poda DART →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Dica da Juxi:** as ferramentas de exportação/quantização funcionam melhor em
> um host Linux x86 (conforme as linhas de desenvolvedor x86 da documentação); a
> **compilação dos engines e a inferência são executadas no seu kit**. Reserve
> espaço em disco para os checkpoints dos modelos — vários GB por modelo é o
> típico.

## Serviço: endpoint compatível com OpenAI (e Claude Code)

A documentação inclui uma **API Python e servidor experimentais** que expõem uma
interface de chat compatível com OpenAI — com exemplos documentados para
clientes no estilo OpenAI e até um **exemplo de integração "Anthropic e Claude
Code"** (apontando o Claude Code para o seu endpoint hospedado no Jetson).

- [API Python e servidor experimentais →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Desempenho esperado (AGX Orin 64GB)

A NVIDIA publicou estes números de tokens/s para o JetPack 7.2 no módulo de 64GB
(junho de 2026; consulte o blog da fonte para o contexto completo e a
metodologia):

| Modelo | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

Seus números vão variar conforme o modelo, a quantização, o comprimento do
contexto e o modo de energia. Trate-os como a referência publicada pelo
fabricante, não como uma garantia.

## Alternativas mais simples

Se o fluxo de trabalho de exportação/compilação do Edge-LLM for mais do que você
precisa no momento, o [Jetson AI Lab](https://www.jetson-ai-lab.com) da NVIDIA
publica tutoriais práticos para outros runtimes (llama.cpp, vLLM e outros) —
verifique as notas de versão do JetPack antes de seguir tutoriais mais antigos.

## Solução de problemas

- **A primeira execução é lenta:** a compilação dos engines pode levar vários minutos na primeira inicialização; as execuções seguintes reutilizam o engine (o mesmo comportamento se aplica ao DeepStream — consulte [nosso tutorial de DeepStream](/pt-br/tutorials/jetson-agx-orin/deepstream)).
- **Instruções FP8/FP4 não funcionam:** é o esperado — o Orin oferece suporte apenas a engines FP16/INT8/INT4.
- **Versões erradas:** confirme primeiro o JetPack 7.2.1 — [Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system).

## Fontes

- [TensorRT Edge-LLM — Matriz de compatibilidade oficial](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (consultada em 2026-09-24)
- [Página inicial da documentação do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, consultada em 2026-09-24)
- [Blog técnico da NVIDIA — Implantar IA pronta para agentes na borda com eficiência de memória no JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (números de desempenho; consultado em 2026-09-24)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
