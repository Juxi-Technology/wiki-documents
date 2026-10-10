---
title: Efficienza della memoria — Eseguire modelli in 8 GB
sidebar_label: Efficienza della memoria
slug: /tutorials/memory-efficiency
description: >-
  Le leve documentate per far entrare carichi di lavoro LLM, VLM e di visione
  negli 8 GB di memoria unificata del kit di sviluppo Jetson Orin Nano Super —
  piattaforma, modello e misurazione.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# Efficienza della memoria — Eseguire modelli in 8 GB

Sul kit Orin Nano Super, gli 8 GB di memoria unificata sono un limite rigido per
tutto: il sistema operativo, il desktop, i servizi e il modello stesso. Le leve
documentate si distribuiscono su tre livelli — **piattaforma**, **modello** e
**misurazione** — e questa pagina segnala dove una tecnica è documentata solo
per un modulo più grande.

## Il budget di 8 GB in numeri concreti

- Circa **7,6 GB degli 8 GB sono utilizzabili** dopo le riservazioni di firmware e
  kernel — il budget che il blog di NVIDIA sull'efficienza della memoria usa per
  tutte le sue cifre di "memoria disponibile".
- La memoria della CPU e la memoria della GPU (CUDA, buffer multimediali)
  provengono dallo **stesso pool fisico**; ridurne una aiuta l'altra.
- La demo di punta del blog — una pipeline VLM da 2B parametri — gira
  a **4,5 / 7,6 GB (~60%)**.

## Leva 1 — Livello piattaforma: quanto occupano il sistema operativo e i servizi

I risparmi seguenti provengono dal blog di NVIDIA sull'efficienza della memoria.

| Leva | Risparmio documentato | Come |
|---|---|---|
| Disattivare il desktop grafico (headless) | Fino a 865 MB | `sudo systemctl set-default multi-user.target` |
| Disattivare i servizi di rete e di journaling | Fino a 32 MB | `sudo systemctl disable <service-name>` |
| Carveout di display e fotocamera | Circa 100 MB in totale | Modifica al device tree del BSP, poi nuovo flashing |
| Riservazione SWIOTLB | Circa 4 MB | Argomento del kernel `swiotlb=2048`, solo se compaiono problemi DMA |
| Pipeline in stile DeepStream | Fino a 412 MB | Da container a bare metal (70 MB); da Python a C++ (84 MB); disattivare Tiler/OSD e usare FakeSink (258 MB) — vedere [DeepStream](/it/tutorials/jetson-orin-nano/deepstream) |
| Scelta del framework di inferenza | Eviti oltre 2,7 GB di overhead | Runtime snelli (runtime C++, llama.cpp); un framework più pesante può aggiungere oltre 2,7 GB già solo all'inizializzazione |

> **Nota di Juxi:** le modifiche ai carveout sono modifiche al sorgente del BSP:
> richiedono un nuovo flashing e fanno risparmiare poco. Cambi una cosa alla
> volta e conservi un'immagine di flashing funzionante — vedere [Flashing e
> aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).

**Lo swap non è un risparmio, ma una valvola di sfogo.** Il tutorial del
fornitore sull'ottimizzazione della RAM sostituisce lo ZRAM con un **file di swap
da 16 GB su NVMe** (`sudo systemctl disable nvzramconfig` prima); la demo da
8 GB di NVIDIA presupponeva circa **2 GB di swap usati al picco**.

### Dopo aver fermato un server, liberare la cache

L'uso della memoria può restare alto dopo aver fermato un server vLLM o SGLang, o
un container Docker (problema noto 5661165 di L4T r39.2.1). Il comando di NVIDIA:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

La stessa correzione si applica quando una build di engine Edge-LLM esaurisce la
memoria: `sudo sysctl -w vm.drop_caches=3` più limiti di build più bassi
(tutorial del fornitore).

### Le modalità di alimentazione cambiano i clock, non la capacità

| Modalità di alimentazione | ID modalità | Clock massimo CPU | Clock massimo GPU | Clock massimo memoria |
|---|---|---|---|---|
| 15W | 0 | 1.497,6 MHz | 612 MHz | 2.133 MHz |
| 25W (predefinita) | 1 | 1.344 MHz | 918 MHz | 3.199 MHz |
| MAXN_SUPER | 2 | 1.728 MHz | 1.020 MHz | 3.199 MHz |

I clock massimi sopra riportati provengono dalle tabelle Power and Performance di
NVIDIA per la r39.2. Le modalità di alimentazione cambiano le frequenze di clock,
non la dimensione della memoria — un modello che non entra non entrerà in una
modalità più veloce. Si cambia con `sudo nvpmodel -q` (elenco) e
`sudo nvpmodel -m <mode_id>`; MAXN_SUPER richiede la configurazione di flashing
Super ed è sperimentale (secondo quelle tabelle). Se mancano 25W o MAXN SUPER,
vedere la [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

> **Attenzione:** un'allocazione di memoria CUDA eccessivamente grande può
> **riavviare il dispositivo** (problema noto 5699079 di L4T r39.2.1). Le
> indicazioni nella stessa release notano: si assicuri che CUDA e le altre
> applicazioni non richiedano più memoria di quella fisicamente disponibile, e
> avvii i processi CUDA con punteggi OOM più alti, così che i processi di
> sistema non vengano terminati.

## Leva 2 — Livello modello: quanto occupano il modello e la sua cache

### La quantizzazione è la leva singola più importante

Orin esegue **solo engine FP16, INT8 e INT4**; FP8 e FP4 non girano su Orin
(classe Thor/Blackwell). Per TensorRT Edge-LLM, usi checkpoint **INT4 AWQ o
INT4 GPTQ**, eviti INT8 GPTQ e non scelga mai checkpoint FP8, MXFP8, FP4 o
NVFP4. Vedere [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm).

Cifre di prima parte: Qwen3 8B da FP16 a W4A16 recupera circa **10 GB**; Qwen3
4B da BF16 a INT4 recupera circa **5,6 GB**. Il grafico di NVIDIA per il caso 4B
è didascalato "Jetson Orin NX 16 GB" — un modulo più grande, quindi tratti le
cifre come riferimento, non come promessa per gli 8 GB.

Con quantizzazione a 4 bit e un runtime efficiente, il perimetro documentato da
NVIDIA per questo budget è **LLM fino a ~10B parametri e VLM fino a ~4B
parametri**.

### Cosa benchmarka davvero NVIDIA su 8 GB

TensorRT Edge-LLM pubblica righe Orin Nano 8 GB per modelli da 0.6B a 2B
parametri (famiglie Qwen3 e Qwen3.5); **2B è il modello più grande che NVIDIA
benchmarka su questo modulo**. Esiste un walkthrough di 4B INT4 AWQ come tutorial
del fornitore (circa 2 GB di pesi), ma non sono pubblicati numeri ufficiali per
i 4B.

### Memoria per la costruzione degli engine (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (dense) o `--externalize-weights
  int4_ffn int4_moe` (MoE) riduce la memoria di costruzione degli engine sui
  dispositivi Orin con meno memoria di sistema.
- Limiti tarati per Orin Nano dal tutorial del fornitore:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  Se la build esaurisce ancora la memoria, liberi prima la memoria di sistema e
  riduca ulteriormente, ad esempio `--maxInputLen 256 --maxKVCacheCapacity 512`.
  Gli engine si costruiscono sul dispositivo e non sono portabili tra moduli.

### Cache KV: dimensionamento e riutilizzo

La cache KV cresce con la lunghezza del contesto, la dimensione del batch e la
concorrenza; fa parte del budget di memoria, non è un dettaglio accessorio.

- I limiti di build la delimitano: `--maxInputLen` e `--maxKVCacheCapacity`; le
  build di benchmark per Orin Nano usavano maxInputLen 2048 e
  maxKVCacheCapacity 2200, batch 1.
- **Il riutilizzo della cache KV** è una capacità documentata del runtime
  Edge-LLM: una cache locale al processo e indirizzata per contenuto, per
  prefissi di input ripetuti, così lo stato di prefill da documenti, turni
  precedenti, continuazioni generate e prefissi immagine ripetuti viene
  riutilizzato invece che ricalcolato.
- Un file di modello che entra può comunque fallire: una segnalazione della
  community mostra file GGUF da 7,4 GB e 16 GB che falliscono con un errore di
  allocazione della cache KV su una scheda da 8 GB — aggiunga la cache KV e
  l'overhead di runtime quando verifica la compatibilità.
- La **riduzione del vocabolario** (generazione limitata a un sottoinsieme di
  token specifico per l'attività) e la **potatura dei token visivi (DART)**
  (token visivi duplicati eliminati prima del prefill) sono pagine di
  funzionalità documentate di Edge-LLM. La build dell'engine visivo accetta
  anche limiti sui token immagine: `--minImageTokens`, `--maxImageTokens`,
  `--maxImageTokensPerImage`.

> **Importante:** la cache KV FP8 — il risparmio di memoria della cache KV di
> circa il 50% — richiede SM89 o successivo (Ada Lovelace e oltre). Orin è
> SM87, quindi **non è disponibile su questo kit**. Usi la cache KV FP16.

### Un prima/dopo di prima parte

Il caso di studio da 8 GB di NVIDIA (blog sull'efficienza della memoria, Tabella
7): modalità headless invece del desktop GNOME completo (1,8 GB → 1,1 GB) più un
VLM GGUF a 4 bit (Q4_K_M, 6,6 GB → 2,2 GB). La pipeline non girava su Orin Nano
8 GB prima (il solo VLM usava l'87% della RAM) e ora gira a **4,5 / 7,6 GB
(~60%)** — oltre 5,1 GB risparmiati. La colonna "prima" è su **Orin NX 16 GB**:
le stesse ottimizzazioni hanno spostato il carico di lavoro sul kit da 8 GB.

## Leva 3 — Livello di misurazione: vedere dove va la memoria

| Strumento | Mostra | Nota |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, memoria, temperatura, alimentazione | La guida utente del kit di sviluppo: nvidia-smi non è lo strumento di monitoraggio principale su Jetson |
| `nvidia-smi dmon` | Utilizzo della GPU | Secondo la nota di rilascio 5406663; l'utilizzo della GPU nella Jetson Power GUI è "ancora in valutazione" |
| `free -h` | La vista del sistema operativo sulla memoria | Non dice quanto può allocare un carico di lavoro GPU |
| procrank | Memoria fisica per processo (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| client nvmap | Processi che detengono buffer GPU/multimediali | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### "Memoria libera" non è il budget

`free -h` mostra la vista aperta del sistema; le allocazioni della GPU provengono
dallo stesso pool con una contabilità separata. In una segnalazione della
community su una scheda da 8 GB, `cudaMalloc` è fallita per la cache KV mentre
`free -h` mostrava ancora 5,7 GiB "liberi" [grado B, segnalazione della
community]. Giudichi la compatibilità rispetto al budget di ~7,6 GB, non
rispetto a "libera".

### Metodo

1. Confermi prima le basi della piattaforma — [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system).
2. Registri una baseline: memoria a riposo, poi sotto carico (`tegrastats`).
3. Cambi una leva, misuri di nuovo. Se nulla si è mosso, torni indietro.

## Da dove iniziare

In base alla dimensione documentata del guadagno:

1. **Runtime e quantizzazione** — il livello più grande nel riepilogo di NVIDIA (circa 5–10 GB per framework di inferenza e quantizzazione dei modelli, secondo la Tabella 5 del blog).
2. **Headless** — fino a ~865 MB, un solo comando.
3. **Taratura della pipeline** — fino a ~412 MB (in stile DeepStream).
4. **Swap su NVMe** — sollievo di pressione, non un risparmio.
5. **Carveout e SWIOTLB** — circa 100 MB e 4 MB, più un nuovo flashing. Per ultimi.

Se un modello ancora non entra, il problema è il modello, non le impostazioni:
passi a uno più piccolo, quantizzi di più, accorci il contesto o riduca il batch
— vedere [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm) e le
[FAQ](/it/tutorials/jetson-orin-nano/faq).

## Fonti

- [Blog tecnico NVIDIA — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (budget di 7,6 GB, desktop 865 MB, rete/journaling 32 MB, carveout, SWIOTLB, risparmi della pipeline, tabelle di quantizzazione e prima/dopo, passaggi di installazione di procrank e client nvmap; verificato il 2026-09-26)
- Documentazione TensorRT Edge-LLM: [Modelli supportati](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [Cache KV FP8](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Benchmark delle prestazioni](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Guida Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · pagine delle funzionalità: [Riutilizzo della cache KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Riduzione del vocabolario](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [Potatura dei token visivi (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (verificato il 2026-09-26)
- Documentazione Jetson Linux: [Note di rilascio r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (problemi 5661165, 5699079, 5406663) · [Power and Performance, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Dev Kit How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificato il 2026-09-26)
- Jetson AI Lab: [tutorial su TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [ottimizzazione della RAM](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (limiti di build per Orin Nano; swap su NVMe; verificato il 2026-09-26)
- [NVIDIA Developer Forums — Ollama su Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (community: free -h rispetto a cudaMalloc; grado B; verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
