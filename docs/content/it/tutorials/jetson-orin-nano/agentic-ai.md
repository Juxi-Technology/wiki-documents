---
title: IA agentica — NemoClaw sull'Orin Nano da 8 GB
sidebar_label: IA agentica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Installare ed eseguire NVIDIA NemoClaw, lo stack di agenti sempre attivi, sul
  kit di sviluppo Jetson Orin Nano Super da 8 GB — installazione ufficiale,
  aspettative oneste sugli 8 GB e note di sicurezza.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# IA agentica — NemoClaw sull'Orin Nano da 8 GB

Il suo kit può eseguire NVIDIA NemoClaw, un agente autonomo sempre attivo,
installato con un solo comando. Questa pagina copre che cos'è NemoClaw,
l'installazione ufficiale, le competenze per agenti che lo circondano, aspettative
oneste sugli 8 GB e le decisioni di sicurezza che richiede.

## Che cos'è NemoClaw

NVIDIA descrive NemoClaw come "una raccolta di blueprint aperti per costruire
agenti autonomi" — sistemi di IA sempre attivi che ragionano, pianificano e
agiscono in flussi di lavoro reali. Raggruppa harness di agenti (OpenClaw,
Hermes, LangChain Deep Agents) con componenti di NVIDIA Agent Toolkit: modelli
Nemotron, NeMo e i controlli di policy a runtime di OpenShell.

OpenShell è il livello di sicurezza: "il runtime sicuro al suo interno che
impone a cosa l'agente può accedere: file, reti, credenziali e strumenti."

NemoClaw è software alpha — NVIDIA lo etichetta "Early preview" (dal
2026-03-16). Pagina prodotto: <https://www.nvidia.com/en-us/ai/nemoclaw> · hub
Build-a-Claw: <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Installazione — il comando singolo ufficiale

Sul kit, esegua l'installer di NVIDIA:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Questo installa l'harness predefinito, **OpenClaw**. Altri due sono
selezionabili con una variabile d'ambiente:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

Su questo kit, l'installer rileva automaticamente Jetson (Orin e Thor) e applica
prima la configurazione host di JetPack; su L4T 39.x carica il modulo
`br_netfilter` solo se manca (senza di esso, la sandbox fallisce la risoluzione
DNS e l'onboarding si blocca su "Setting up OpenClaw inside sandbox"). Se
seleziona Ollama, l'installer lo installa anch'esso: "Lo script installa anche
ollama (se ollama è selezionato), così non deve installarlo manualmente prima"
(personale NVIDIA). Il sito di NVIDIA documenta questo dispositivo: "Install
OpenClaw on Your NVIDIA Jetson Orin Nano" — "un assistente personale di IA
completamente locale su Jetson … nessuna API cloud necessaria."

> **Importante** — la matrice di supporto delle piattaforme di NemoClaw (v1.1,
> 2026-09-04) non ha una riga Jetson; le sue piattaforme testate sono Linux
> (Ubuntu 24.04) e DGX OS Spark. Il supporto a Orin Nano è reale in pratica —
> l'installer rileva la scheda e NVIDIA documenta il flusso — ma non è
> pubblicato come formalmente supportato, quindi si aspetti qualche spigolo.

Requisiti che contano qui (dalla pagina dei prerequisiti di NemoClaw di NVIDIA):

| Requisito | Min / consigliato | Su questo kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB totali — al limite minimo |
| Disco libero | 20 GB | Nessuna archiviazione integrata; usi microSD o NVMe ([Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | Da installare separatamente |
| Runtime per container | Docker Engine / Desktop / Colima | Correzione del socket: `sudo usermod -aG docker $USER`, poi `newgrp docker` |

## Dopo l'installazione — la prima sessione

Il personale NVIDIA rimanda al [walkthrough di Jetson AI
Lab](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (guida del fornitore)
per il flusso su Orin:

1. `curl -fsSL https://ollama.com/install.sh | sh` — oppure lo salti; anche l'installer di NemoClaw può installare Ollama.
2. Scarichi un modello di classe 4B con tool calling, come Nemotron3 Nano 4B (l'esempio `nemotron-3-nano:30b` della guida è destinato a dispositivi più grandi).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Onboarding: selezioni Ollama come sorgente del modello e scelga il livello di policy sandbox più stretto che funziona.
5. `source ~/.bashrc`, poi `nemoclaw my-assistant connect`; avvii l'agente con `openclaw tui`.

## Competenze agente

NVIDIA distribuisce anche le **competenze per agenti** — flussi di lavoro
pacchettizzati nel formato aperto Agent Skills che estendono gli assistenti IA per il
coding (Claude Code, Cursor, Codex) con automazione specifica del
dispositivo. Due domini sono documentati per quest'era:

- **IA fisica (robotica).** Isaac ROS distribuisce un catalogo di competenze
  per agenti — secondo NVIDIA, attività come l'attivazione del container di sviluppo
  Isaac ROS e l'avvio dello stack cloud Mission Control. Il catalogo è su
  <https://github.com/nvidia/skills> (la categoria "Physical AI"), installato
  con `npx` (Node.js non fa parte dell'ambiente standard di Isaac ROS). Isaac
  ROS 5.0 aggiunge una CLI `isaac-ros-activate` e una competenza in anteprima
  `migrate-node-to-rosidl-buffer`. Vedere
  [Robotica](/it/tutorials/jetson-orin-nano/robotics).
- **Pipeline video.** Le note di rilascio di L4T r39.2.1 elencano "Agent
  skills for video pipelines" tra le novità della versione.

Una lacuna onesta: le fonti di questa pagina documentano competenze per agenti
NVIDIA per Isaac ROS (IA fisica) e per le pipeline video; nessuna documenta un
catalogo di competenze specifico per NemoClaw.

## Aspettative realistiche per 8 GB

Un agente sempre attivo, un modello locale e il desktop Ubuntu non stanno tutti
comodamente su questo kit allo stesso tempo. Il budget documentato:

- **La memoria utilizzabile è di ~7,6 GB, non 8 GB.** NVIDIA: "degli 8 GB di
  DRAM fisica, circa 7,6 GB sono utilizzabili dopo le riservazioni di firmware e
  kernel."
- **8 GB è il minimo di NemoClaw, non una zona di comfort.** I prerequisiti
  elencano 8 GB come minimo e 16 GB come consigliati: "Su macchine con meno di
  8 GB di RAM, questo uso combinato può attivare l'OOM killer. Se non può
  aggiungere memoria, configuri almeno 8 GB di swap per aggirare il problema, al
  costo di prestazioni più lente." La memoria di questo kit è fissa — pianifichi
  il file di swap ([Efficienza della
  memoria](/it/tutorials/jetson-orin-nano/memory-efficiency)). Il push
  dell'immagine sandbox da ~2,4 GB ha già attivato l'OOM su un Orin Nano da
  8 GB.
- **L'agente e il desktop occupano memoria prima che si carichi il modello.**
  Una guida della community sui forum di NVIDIA stima il runtime di OpenClaw
  fino a ~1 GB; disattivare il desktop grafico libera fino a ~865 MB (cifra di
  NVIDIA), e una misurazione della community stima GNOME a oltre 600 MB.
- **Il fallimento da modello sovradimensionato è documentato in una segnalazione
  della community sui forum di NVIDIA.** Ollama su una scheda da 8 GB non è
  riuscito a caricare un modello da 7,4 GB e uno da 16 GB: `cudaMalloc failed:
  out of memory ... failed to allocate buffer for kv cache`. La sola dimensione
  del file non è il test di compatibilità — la cache KV deve entrare negli
  stessi 8 GB.

Cosa entra, secondo le fonti: i valori predefiniti di Ollama validati da NVIDIA
(`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) sono dimensionati per
macchine più grandi; la guida di Jetson AI Lab dice di partire con un modello di
classe 4B con tool calling — "Può funzionare, ma si aspetti prestazioni più
deboli rispetto ai modelli di classe 30B"; e il blog sulla memoria di NVIDIA
colloca il perimetro tarato a 4 bit a LLM fino a ~10B e VLM fino a ~4B
parametri — un tetto per una configurazione dedicata, non un budget che regge
anche desktop e agente.

NVIDIA non pubblica cifre di token al secondo per Ollama su questo dispositivo;
tratti con cautela le stime di velocità esterne (vedere [Inferenza LLM
locale](/it/tutorials/jetson-orin-nano/local-llm)).

> **Nota di Juxi:** per una configurazione sempre attiva che funzioni qui,
> pianifichi la modalità headless, un modello quantizzato di classe 4B e
> archiviazione NVMe per il requisito di 20 GB e il file di swap. Questo
> corrisponde a ciò che le fonti supportano; qualsiasi cosa di più grande è non
> verificata.

## Note su Ollama e agenti — confermate dal personale NVIDIA

Il personale NVIDIA ha fatto debug del flusso Orin Nano + JetPack 7.2 + Ollama
sui suoi forum per sviluppatori, e ha riverificato Ollama su JetPack 7.2.1 a
settembre 2026.

- **Controlli prima la GPU.** `ollama ps` dovrebbe mostrare `100% GPU` nella
  colonna PROCESSOR; se mostra CPU, l'agente sarà molto lento.
- **Fallimento documentato (giugno 2026).** Con NemoClaw + Ollama su un Orin Nano
  JetPack 7.2 appena flashato, `openclaw tui` si apriva ma non rispondeva mai
  ("Autocompaction could not recover this turn"). NVIDIA l'ha riprodotto: Ollama
  aveva saltato il rilevamento della GPU (fallback sulla CPU) e la finestra di
  contesto della sandbox era di soli 4096 token. La correzione del personale ha
  scritto queste righe in `/etc/systemd/system/ollama.service.d/override.conf`:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  poi `sudo systemctl daemon-reload && sudo systemctl restart ollama`; dentro la
  sandbox (`nemoclaw my-assistant connect`), `contextWindow` è stato portato a
  32768 in `.openclaw/openclaw.json` e l'hash della configurazione aggiornato.
  Chi ha segnalato ha confermato che Ollama girava poi sulla GPU.
- **Stato attuale: questa soluzione non dovrebbe servire.** Personale NVIDIA,
  metà 2026: "il problema è risolto nell'ultima release di ollama. Il workaround
  (override.conf) non è più necessario." Su JetPack 7.2.1 l'installer a monte
  funziona e `ollama ps` riporta 100% GPU; la riga "WARNING: Unsupported JetPack
  version detected" è innocua. Provi prima l'installazione standard.
- **Se Ollama ricade ancora sulla CPU:** aggiorni prima Ollama. Un utente del
  forum ha risolto un fallback persistente eliminando la directory obsoleta
  `/usr/local/lib/ollama/cuda_v12` (rimozione confermata dal personale). Tenga
  override.conf come ripiego di ultima istanza — è ciò che NVIDIA ha usato con
  successo su questo esatto kit.

## Sicurezza per agenti sempre attivi

Un agente sempre attivo è un programma con credenziali e accesso agli strumenti
che continua a lavorare mentre lei non guarda. Su un dispositivo che contiene i
suoi dati, è un rischio reale: un agente con accesso a strumenti e shell qui può
leggere, modificare o inviare tutto ciò che riesce a raggiungere.

**Usi il livello di policy.** NVIDIA descrive OpenShell come "il runtime sicuro al
suo interno che impone a cosa l'agente può accedere: file, reti, credenziali e
strumenti." Durante l'onboarding, scelga il livello di policy sandbox più stretto
che svolge comunque il lavoro (il walkthrough di Jetson AI Lab consiglia il
livello più stretto).

**Credenziali.** Dia all'agente credenziali con ambito limitato e revocabili —
chiavi e account dedicati, mai i suoi personali. Tutto ciò che l'agente può
leggere, può copiarlo; tutto ciò che può usare, può essere indotto a usarlo. Le
integrazioni di messaggistica agiscono con la sua identità: la pagina Orin Nano
di NVIDIA mostra un esempio OpenClaw + WhatsApp, quindi usi un account o un
numero dedicato.

**Esposizione di rete.** Tenga i servizi locali su localhost — la configurazione
del personale NVIDIA per Ollama qui lo lega a `127.0.0.1`
(`OLLAMA_HOST=127.0.0.1:11434`). Non esponga dashboard di agenti, API di
controllo o server di modelli all'internet aperto; per l'accesso remoto, usi un
tunnel o una VPN che controlla. L'installazione richiede Docker
(Engine/Desktop/Colima, secondo i requisiti sopra) più un cluster di container
in sandbox (il gateway OpenShell esegue k3s internamente) e accesso sudo.

**Abitudini operative.** Inizi sotto supervisione — osservi cosa fa l'agente
prima di lasciarlo incustodito. Non gli dia accesso che non può revocare o
annullare, e mantenga backup più una via di ripristino (vedere [Flashing e
aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)). NemoClaw è
software alpha ("Early preview"); tratti la sandbox come uno strato tra diversi,
non l'unico.

> **Attenzione** — poiché questo stack gira in locale ("nessuna API cloud
> necessaria"), il confine di sicurezza è il suo dispositivo, la sua rete e le
> sue credenziali. Le esamini tutte e tre prima di lasciare un agente in
> esecuzione.

## Fonti

- [Pagina prodotto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (verificato il 2026-09-26) — definizione, harness, comandi di installazione, OpenShell.
- [Hub di risorse NVIDIA Build-a-Claw](https://www.nvidia.com/en-us/ai/build-a-claw/) (verificato il 2026-09-26) — sezione di installazione per Orin Nano.
- [NemoClaw — Prerequisiti](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) e [Supporto delle piattaforme](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (verificato il 2026-09-26)
- [NemoClaw — Risoluzione dei problemi (configurazione host Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — NemoClaw su Jetson Orin Super con JetPack 7.2 (correzione del personale NVIDIA)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — Ollama su Jetson (verificato dal personale)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) e [accelerazione GPU su JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (verificato il 2026-09-26)
- [Blog tecnico NVIDIA — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — modelli IA che girano su Orin Nano Super 8GB (guida della community)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (verificato il 2026-09-26)
- [Jetson AI Lab — tutorial su NemoClaw (guida del fornitore)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (verificato il 2026-09-26)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) e [note di rilascio](https://nvidia-isaac-ros.github.io/releases/index.html) (verificato il 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificato il 2026-09-26) — la voce "Agent skills for video pipelines" tra le novità.

*Stato: rivisto il 2026-10-11. Basato sulla
documentazione ufficiale di NVIDIA, su post dei forum per sviluppatori NVIDIA e
sulla guida del fornitore Jetson AI Lab, alle date indicate; non ancora
verificato su hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
