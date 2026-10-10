---
title: Eseguire LLM in locale — TensorRT Edge-LLM sull'Orin Nano da 8 GB
sidebar_label: Inferenza LLM locale
slug: /tutorials/local-llm
description: >-
  Eseguire modelli linguistici di grandi dimensioni in locale sul Jetson Orin
  Nano da 8 GB — supporto TensorRT Edge-LLM, limiti di precisione, cosa entra
  in memoria e cifre ufficiali.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# Eseguire LLM in locale — TensorRT Edge-LLM sull'Orin Nano da 8 GB

Il suo kit di sviluppo Jetson Orin Nano Super (8 GB) può eseguire modelli
linguistici in locale. Il percorso ottimizzato di NVIDIA per farlo è **TensorRT
Edge-LLM**, che **supporta ufficialmente Jetson Orin sulla linea JetPack 7.2**.
Questa pagina copre cosa entra negli 8 GB e quali runtime funzionano oggi; le
istruzioni si trovano nella documentazione di NVIDIA, linkata di seguito.

## Da leggere prima — quattro vincoli per questo kit

1. **Orin esegue solo engine FP16, INT8 e INT4. Gli engine FP8 e FP4 non
   funzionano su questo dispositivo** — sono capacità della classe
   Thor/Blackwell ("Jetson Orin non esegue engine FP8 o FP4" — matrice di
   supporto).
2. **Gli engine vengono costruiti sul dispositivo** dal runtime C++. L'export
   ONNX e la quantizzazione vengono eseguiti su un host Linux x86-64 — non su
   Orin. Gli engine sono esatti per SM: uno costruito su Thor (SM110) non si
   carica su Orin Nano (sm_87).
3. **JetPack 7.2.1 (L4T r39.2.1) è lo stack supportato** — CUDA 13.2.2,
   TensorRT 10.16.2. Edge-LLM usa il TensorRT di piattaforma fornito da
   JetPack.
4. **Gli 8 GB di memoria unificata sono condivisi con il sistema operativo e
   il desktop.** Circa 7,6 GB sono utilizzabili. La dimensione del modello —
   non i TOPS — è il vincolo determinante, e la cache KV deve entrare nella
   stessa memoria.

> **Importante:** scelga checkpoint **INT4 AWQ** o **INT4 GPTQ** per questo
> kit. Non selezioni checkpoint FP8, MXFP8, FP4 o NVFP4. INT8 GPTQ non è
> supportato.

## Cosa copre TensorRT Edge-LLM

TensorRT Edge-LLM è il runtime ufficiale di NVIDIA per LLM e VLM su piattaforme
edge. La matrice di supporto elenca Jetson Orin come "Official" per JetPack
7.2, con engine costruiti sul dispositivo e precisione FP16, INT8, INT4.

- **Copertura dei modelli:** i checkpoint supportati includono Llama 3.2 1B/3B,
  Llama 3.1 8B, Qwen2.5 (0.5B–14B), Qwen3 (0.6B–8B) e VLM come Qwen2.5-VL
  3B/7B e InternVL3/3.5 (1B–14B) — checkpoint densi sotto i 30B parametri.
  Non è una matrice di verifica: "non ogni checkpoint elencato è
  stato verificato completamente su ogni piattaforma e precisione supportate."
- **Il flag per gli 8 GB:** per le build di engine INT4 su Orin Nano, passi
  `--externalize-weights int4_ffn` (dense) o `--externalize-weights
  int4_ffn int4_moe` (MoE) per ridurre la memoria di costruzione dell'engine.
- **Spazio su disco:** preveda ~20–50 GB per ogni flusso di lavoro di modello
  per i file ONNX e gli engine; questo kit non ha archiviazione integrata
  ([Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)).
- **Due percorsi Quick Start:** un percorso C++ (export e quantizzazione su un
  host, costruzione degli engine sul dispositivo, esecuzione) e un percorso
  server — `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B` (scarica il checkpoint
  al primo avvio).

> **Nota di Juxi:** i passaggi autorevoli sono quelli di NVIDIA — [Quick
> Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> La pagina di installazione della 0.10.1 dichiara: "I wheel non sono
> pubblicati, né sono il percorso di installazione predefinito nella 0.10.1."

## Cosa entra davvero in 8 GB

- **Fino a 2B parametri è quanto NVIDIA ha misurato su questo
  modulo.** La riga più grande della pagina dei benchmark di Edge-LLM per
  Orin Nano (8GB) è Qwen3.5-2B a 4.692 MB: "2B è il modello più grande che
  NVIDIA ha misurato su Orin Nano 8 GB."
- **Un walkthrough di un fornitore esegue un modello da 4B.** Il tutorial di
  Jetson AI Lab riporta Qwen3-4B-Instruct INT4 AWQ (~2 GB di pesi) che entra
  "entro gli 8 GB di memoria unificata dell'Orin Nano"; anche InternVL3 1B/2B
  entra con INT4 AWQ, mentre le varianti più grandi sono destinate ad AGX Orin
  o Thor. (Contenuto del fornitore.)
- **Un perimetro pratico dal blog sulla memoria di NVIDIA: LLM fino a ~10B e
  VLM fino a ~4B parametri** con quantizzazione a 4 bit e runtime efficienti —
  per configurazioni tarate.
- **La dimensione del file non è il test di compatibilità — anche la cache KV
  deve entrarci.** Segnalazioni della community mostrano modelli GGUF di
  classe 12B/26B (gemma4:12b a 7,4 GB, gemma4:26b a 16 GB) che falliscono in
  Ollama sulla scheda da 8 GB: `cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache`. (Non confermato.)

## Valori di prestazione ufficiali per questo kit

NVIDIA pubblica tabelle di benchmark per **Jetson Orin Nano (8GB)** — v0.10.0,
JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Risultati a runtime su MTBench (LLM)
e COCO (VLM), con memoria GPU di picco:

| Modello | Tipo | Throughput | Memoria GPU di picco |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77,0 tok/s | 1.917 MB |
| Qwen3-1.7B | LLM | 36,5 tok/s | 2.992 MB |
| Qwen3-VL-2B | VLM | 36,1 tok/s | 4.486 MB |
| Qwen3.5-0.8B | LLM | 59,1 tok/s | 2.127 MB |
| Qwen3.5-0.8B | VLM | 59,0 tok/s | 2.760 MB |
| Qwen3.5-2B | LLM | 29,6 tok/s | 3.642 MB |
| Qwen3.5-2B | VLM | 29,6 tok/s | 4.692 MB |

Le righe Orin usano batch 1 e pesi INT4 esternalizzati; limiti di build:
maxInputLen 2048, maxKVCacheCapacity 2200. "Le prestazioni in produzione possono
variare con la taratura a livello di sistema (modalità di alimentazione,
configurazione della memoria, gestione termica)."

> **Importante:** le tabelle di token al secondo pubblicate da NVIDIA per
> l'**AGX Orin 64 GB** **non** si applicano a questo kit — modulo, larghezza
> di banda della memoria e budget di potenza diversi. Non stimi i numeri
> dell'Orin Nano a partire dall'AGX Orin. Non esistono cifre di prima parte
> per i percorsi Ollama o llama.cpp su questo kit.

## Altri runtime su questo kit

### Ollama

Stato attuale, verificato dal personale NVIDIA sui forum per sviluppatori per
JetPack 7.2.1 (settembre 2026): l'installer standard funziona —
`curl -fsSL https://ollama.com/install.sh | sh` — e `ollama ps` dovrebbe
riportare `100% GPU`. L'avviso "Unsupported JetPack version detected" è
innocuo.

Le build più vecchie ricadevano sulla CPU perché le loro librerie CUDA
precompilate non avevano sm_87, la compute capability di Orin; segnalazioni
della community indicano Ollama 0.30.11 che aggiunge "CC 87 for CUDA v13", e
il personale NVIDIA ha confermato la correzione. Restano alcune segnalazioni
di problemi dalla community (agosto–settembre 2026) — controlli `ollama ps`
sulla sua unità; la build dai sorgenti per CUDA v13 resta il ripiego.

### Wheel Python per JetPack 7.2

I pacchetti Python abilitati a CUDA (PyTorch e altri) per JetPack 7.2 / CUDA
13.2 provengono dall'indice SBSA di Jetson AI Lab, che il personale NVIDIA
cita:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Lo usi come indice pip (`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
Serve wheel aarch64 come torch 2.11.0, torchvision 0.25.0 e vllm 0.20.0+cu130.
Non esiste un indice `jp7/*`; l'indice dell'era JetPack 6 è `jp6/cu126`. CUDA
13.2 unifica Orin sul toolkit Arm SBSA (driver R595+).

### jetson-containers e Jetson AI Lab (percorso alternativo)

[jetson-containers](https://github.com/dusty-nv/jetson-containers) supporta
JetPack 6.2 (CUDA 12.6) e JetPack 7 (CUDA 13.x). Esistono immagini
precompilate `-jetson-orin` per i principali percorsi di serving, tra cui
`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` e
`ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

Avvertenze per gli 8 GB dal materiale del fornitore: l'esempio vLLM usa
`--shm-size=16g` (non è una raccomandazione di dimensione per questo kit), e
la configurazione consigliata sposta la root dei dati di Docker su NVMe e
aggiunge un file di swap da 16 GB (disabiliti prima lo ZRAM).

## Ottimizzazione per 8 GB

Quando un modello non entra: liberi memoria di piattaforma (la modalità
headless recupera fino a ~865 MB), quantizzi a 4 bit e dimensioni
deliberatamente la cache KV e il contesto — vedere [Efficienza della memoria
per 8 GB](/it/tutorials/jetson-orin-nano/memory-efficiency).

## Risoluzione dei problemi

- **Memoria esaurita al caricamento** — `cudaMalloc failed: out of memory ...
  failed to allocate buffer for kv cache` significa che il modello più la
  cache KV superano gli 8 GB di memoria unificata. Usi un modello più piccolo
  o più quantizzato, oppure accorci il contesto; per le build di engine
  Edge-LLM, aggiunga `--externalize-weights int4_ffn` e riduca
  `--maxInputLen` / `--maxKVCacheCapacity`.
- **Fallback su CPU di Ollama o avviso "Unsupported JetPack version detected"**
  — aggiorni prima Ollama (alle build più vecchie mancava sm_87); secondo il
  personale NVIDIA l'avviso è innocuo su 7.2.1. Confermi con `ollama ps`
  (`100% GPU`).
- **Problemi di versione o configurazione** — vedere [Verificare il
  sistema](/it/tutorials/jetson-orin-nano/verify-your-system) e la
  [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

## Fonti

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Matrice di supporto](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Modelli supportati](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Installazione](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Benchmark delle prestazioni](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (verificato il 2026-09-26)
- [Pagina di download di JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- [Blog tecnico NVIDIA — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — Ollama su Jetson (verificato dal personale su JetPack 7.2.1)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — problema di accelerazione GPU su JetPack 7.2 (indice wheel, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — modelli IA che girano su Jetson Orin Nano Super 8GB (community)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (verificato il 2026-09-26)
- [Jetson AI Lab — tutorial su TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (verificato il 2026-09-26)
- [Jetson AI Lab — testo completo della documentazione (tabella delle immagini container)](https://www.jetson-ai-lab.com/llms-full.txt) (verificato il 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (verificato il 2026-09-26)
- [Indice PyPI di Jetson AI Lab — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
