---
title: Efficienza della memoria — Carichi di lavoro più grandi su 64GB
sidebar_label: Efficienza della memoria
slug: /tutorials/memory-efficiency
description: >-
  Le leve documentate per ridurre l'uso di memoria sul kit di sviluppo AGX
  Orin — competenze agente a livello di piattaforma, ottimizzazioni a livello
  di modello in TensorRT Edge-LLM e come misurare i risultati.
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

# Efficienza della memoria — Carichi di lavoro più grandi su 64GB

Sui dispositivi edge, di norma è la memoria — non la potenza di calcolo — a
limitare quali modelli si possono eseguire. JetPack 7.2 è arrivato con
l'efficienza della memoria come tema principale, e ci sono tre livelli
documentati di ottimizzazione: la **piattaforma**, il **modello** e la
**misurazione**. Questa pagina mappa le leve disponibili; ciascuna rimanda
alla fonte autorevole.

## Leva 1 — Livello piattaforma (competenze agente di NVIDIA)

Le **competenze agente di ottimizzazione della memoria** di JetPack 7.2
guidano un agente IA nell'audit e nella riduzione del consumo di memoria su
tutto lo stack, secondo NVIDIA:

- **Aree riservate del bootloader (carveout)** — recuperare la memoria
  riservata prima dell'avvio di Linux
- **Riservazioni di memoria del kernel** — regolare quanto il kernel trattiene
- **Overhead dello spazio utente** — individuare e rimuovere processi e
  servizi ridondanti

L'obiettivo dichiarato da NVIDIA: far rientrare carichi di lavoro più
impegnativi in meno memoria (è così che lo stesso hardware diventa via via
più utile nel corso delle release software). Inizi da qui:

- [Competenze lato dispositivo Jetson](https://github.com/jetson-device-skills) · [Competenze BSP Jetson](https://github.com/jetson-bsp-skills)
- Contesto: [il blog di NVIDIA sull'efficienza della memoria in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Attenzione:** le modifiche alle aree riservate e alle riservazioni di
> memoria toccano il comportamento di avvio. Apporti le modifiche una alla
> volta, mantenga una via di ripristino (vedere
> [Flashing e aggiornamenti](/it/tutorials/jetson-agx-orin/flashing-and-updates)) e
> verifichi di nuovo prima di passare alla produzione.

## Leva 2 — Livello modello (funzionalità di TensorRT Edge-LLM)

Per i carichi di lavoro LLM/VLM, i maggiori consumatori di memoria sono i
pesi e la cache KV. TensorRT Edge-LLM documenta queste leve (Jetson Orin
esegue engine FP16/INT8/INT4 — vedere [Inferenza LLM locale](/it/tutorials/jetson-agx-orin/local-llm)):

| Leva | Cosa fa | Documentazione |
|---|---|---|
| **Quantizzazione** (INT8/INT4 su Orin) | Pesi più piccoli, meno larghezza di banda | [Guida alla quantizzazione](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Riduzione del vocabolario** | Riduce il vocabolario di output / le tabelle di embedding | [Ridurre il vocabolario](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **Riutilizzo della cache KV** | Riutilizza la cache tra richieste correlate invece di ricalcolarla | [Riutilizzo della cache KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **Pruning dei token visivi DART** | Taglia i token immagine ridondanti per i VLM | [Pruning DART](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(La cache KV FP8 esiste nella documentazione ma è orientata a Thor; Orin è
limitato a engine FP16/INT8/INT4 secondo la matrice di supporto ufficiale.)*

## Leva 3 — Misurare, non indovinare

- **Vista di sistema:** `tegrastats` (incluso in Jetson Linux) per CPU/GPU/memoria in tempo reale — vedere [Verificare il sistema](/it/tutorials/jetson-agx-orin/verify-your-system).
- **Vista del modello:** TensorRT Edge-LLM include una [progettazione e strumenti per il monitoraggio della memoria](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html) e pubblica [benchmark prestazionali per ogni release](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Metodo:** registri una baseline (memoria usata a riposo e sotto carico), modifichi **una** leva, misuri di nuovo. I numeri pronti per la pubblicazione devono sempre derivare dal suo carico di lavoro.

## Cosa significa in pratica

- Il modulo da 64GB esegue già modelli della classe 30B (vedere i dati
  pubblicati in [Inferenza LLM locale](/it/tutorials/jetson-agx-orin/local-llm)); l'ottimizzazione della
  memoria è ciò che permette di aggiungere *altro* sopra — pipeline
  multi-modello, contesti più lunghi, agenti sempre attivi ([IA agentica](/it/tutorials/jetson-agx-orin/agentic-ai)), pipeline
  video accanto all'inferenza ([DeepStream](/it/tutorials/jetson-agx-orin/deepstream)).
- Se il suo carico di lavoro oggi rientra ma a malapena, inizi dalla Leva 2
  (livello modello) — è la meno rischiosa e la meglio documentata. Usi la
  Leva 1 quando deve spremere la piattaforma stessa.

## Fonti

- [Blog tecnico NVIDIA — efficienza della memoria e competenze agente in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (verificato il 2026-09-24)
- [Documentazione di TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (funzionalità e matrice di supporto; verificato il 2026-09-24)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
