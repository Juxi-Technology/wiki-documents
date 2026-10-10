---
title: Eseguire LLM in locale — TensorRT Edge-LLM su JetPack 7.2
sidebar_label: Inferenza LLM locale
slug: /tutorials/local-llm
description: >-
  Eseguire modelli linguistici di grandi dimensioni e multimodali in locale sul
  kit di sviluppo AGX Orin con NVIDIA TensorRT Edge-LLM — modelli supportati,
  vincoli di Orin, flusso di lavoro e prestazioni attese.
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

# Eseguire LLM in locale — TensorRT Edge-LLM su JetPack 7.2

Il suo AGX Orin 64GB può eseguire modelli linguistici di grandi dimensioni in
locale — senza cloud, senza rete. Il percorso ottimizzato di NVIDIA per farlo è
**TensorRT Edge-LLM**, che **supporta ufficialmente Jetson Orin su JetPack 7.2**.
Questa pagina le serve da orientamento: cosa il suo kit può e non può fare, la
forma del flusso di lavoro e quali prestazioni aspettarsi. La guida passo passo
autorevole si trova nella documentazione NVIDIA (linkata in tutta la pagina).

## Leggere prima — tre fatti specifici di Orin

1. **Orin esegue solo engine FP16, INT8 e INT4. FP8 e FP4 non sono supportati
   su Orin** (sono capacità della classe Thor). La matrice di supporto di NVIDIA
   lo afferma esplicitamente — pianifichi di conseguenza le sue scelte di
   quantizzazione.
2. **Gli engine vengono costruiti sul dispositivo** per il percorso di
   deployment su Orin (non cross-compilati da un PC).
3. **JetPack 7.2 è lo stack supportato** — CUDA 13.2 con il TensorRT della
   piattaforma (10.16.2 in questa release). Il wheel aarch64 è destinato a
   Jetson Orin (SM87) con Python 3.10–3.12.

*(Fonte: matrice di supporto ufficiale di TensorRT Edge-LLM, verificata il 2026-09-24.)*

## Cosa copre TensorRT Edge-LLM

Secondo la documentazione NVIDIA, Edge-LLM offre inferenza ottimizzata per
**modelli di testo, visione, audio, voce e azione** su piattaforme edge:

| Capacità | Esempi nella documentazione |
|---|---|
| Generazione di testo | Famiglie LLM tra cui Qwen, Gemma, Nemotron |
| Multimodale (VLM) | Esempio Phi-4 Multimodal |
| Riconoscimento vocale (ASR) | Flusso di lavoro di esempio dedicato |
| Generazione vocale (TTS) | Flusso di lavoro di esempio dedicato |
| Vision-Language-Action | Esempi VLA (robotica) |
| Omni (I/O di audio, visione e voce) | Flusso di lavoro di esempio dedicato |

Funzionalità salienti: quantizzazione (INT8/INT4 su Orin), decodifica
speculativa (EAGLE3, DFlash e altri), **riuso della KV-cache**, **riduzione del
vocabolario**, **potatura dei token visivi DART** per i VLM, output in
streaming e supporto LoRA.

## Il flusso di lavoro (come documentato)

TensorRT Edge-LLM ha due percorsi Quick Start documentati:

1. **ONNX + runtime C++** — esportare e quantizzare i checkpoint (tipicamente su un host x86), trasferirli sul dispositivo, costruire gli engine sul dispositivo, eseguire il runtime C++.
2. **Server Python in una riga** — il percorso più rapido verso un endpoint di serving.

Inizi da qui: **[TensorRT Edge-LLM Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Oltre il Quick Start:

- [Opzioni di installazione →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (runtime C++ dai sorgenti, flusso di lavoro di export/quantizzazione, wheel locale sperimentale)
- [Modelli supportati →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Guida alla quantizzazione →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [Riuso della KV cache →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Potatura DART →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Nota di Juxi:** gli strumenti di export/quantizzazione funzionano meglio su
> un host Linux x86 (secondo le righe "x86 developer" della documentazione); la
> **costruzione degli engine e l'inferenza vengono eseguite sul suo kit**.
> Preveda spazio su disco per i checkpoint dei modelli — diversi GB per modello
> sono la norma.

## Serving: endpoint compatibile OpenAI (e Claude Code)

La documentazione include una **API Python e un server sperimentali** che
espongono un'interfaccia di chat compatibile OpenAI — con esempi documentati
per client in stile OpenAI e persino un **esempio di integrazione "Anthropic e
Claude Code"** (per indirizzare Claude Code verso l'endpoint ospitato sul suo
Jetson).

- [API Python e server sperimentali →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Prestazioni attese (AGX Orin 64GB)

NVIDIA ha pubblicato questi valori in token/s per JetPack 7.2 sul modulo da
64GB (giugno 2026; il blog di origine riporta contesto e metodologia completi):

| Modello | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

I suoi numeri varieranno in base a modello, quantizzazione, lunghezza del
contesto e modalità di alimentazione. Consideri questi valori come il
riferimento pubblicato dal produttore, non una garanzia.

## Alternative più semplici

Se il flusso di lavoro di export/build di Edge-LLM è più di quanto le serva al
momento, il [Jetson AI Lab](https://www.jetson-ai-lab.com) di NVIDIA pubblica
tutorial pratici per altri runtime (llama.cpp, vLLM e altri) — controlli le sue
note sulla versione di JetPack prima di seguire tutorial più vecchi.

## Risoluzione dei problemi

- **La prima esecuzione è lenta:** la costruzione degli engine può richiedere diversi minuti al primo avvio; le esecuzioni successive riutilizzano l'engine (lo stesso comportamento vale per DeepStream — vedere [il nostro tutorial su DeepStream](/it/tutorials/jetson-agx-orin/deepstream)).
- **Le istruzioni FP8/FP4 non funzionano:** è previsto — Orin supporta solo engine FP16/INT8/INT4.
- **Versioni errate:** confermi prima JetPack 7.2.1 — [Verificare il sistema](/it/tutorials/jetson-agx-orin/verify-your-system).

## Fonti

- [TensorRT Edge-LLM — Matrice di supporto ufficiale](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (verificata il 2026-09-24)
- [Pagina iniziale della documentazione di TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, verificata il 2026-09-24)
- [NVIDIA Technical Blog — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (valori di prestazione; verificato il 2026-09-24)

*Stato: rivisto il 2026-10-11. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
