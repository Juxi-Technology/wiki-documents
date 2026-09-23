---
title: IA agentica — NemoClaw su JetPack 7.2
sidebar_label: IA agentica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Distribuisca NVIDIA NemoClaw sul kit di sviluppo AGX Orin — installazione con
  un solo comando, competenze agente Jetson e note pratiche per agenti sempre
  attivi.
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

# IA agentica — NemoClaw su JetPack 7.2

JetPack 7.2 rende il suo kit **pronto per l'IA agentica**: NVIDIA NemoClaw si
installa con un solo comando e le competenze agente di NVIDIA automatizzano
gran parte del lavoro di piattaforma che prima richiedeva intervento manuale.

## Che cos'è NemoClaw

Secondo NVIDIA: NemoClaw è una raccolta di stack e blueprint open source per
costruire **agenti autonomi** — sistemi di IA sempre attivi che ragionano,
pianificano e agiscono. Aggiunge controlli di privacy e sicurezza (tramite i
controlli di policy a runtime di **OpenShell**) all'ecosistema di agenti
OpenClaw e impacchetta componenti NVIDIA come i modelli Nemotron e NeMo.
JetPack 7.2 arriva **preconfigurato con le dipendenze richieste**, quindi sul
suo kit non serve alcuna configurazione manuale dell'ambiente.

- Pagina prodotto NemoClaw: <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw su GitHub: <https://github.com/NemoClaw> · esempi della comunità: <https://github.com/nemoclaw-community>

## Installazione (un solo comando, ufficiale)

Sul kit (JetPack 7.2+), esegua:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Nota di sicurezza — da leggere prima di eseguire:** questo installa un
> framework di agenti sempre attivi. Verifichi a cosa l'agente è autorizzato ad
> accedere e quali credenziali può usare *prima* di attivarlo, preferisca token
> con ambito limitato e revocabili e utilizzi i controlli di policy di
> OpenShell. Non lasci un agente incustodito con un accesso che non può
> revocare.

## Dopo l'installazione — i prossimi passi

NVIDIA mantiene un **Build-a-Claw Resource Hub** con indicazioni per
l'installazione, prove nel cloud e risorse di apprendimento:
<https://www.nvidia.com/en-us/ai/build-a-claw>

Altre risorse utili:

- Corso del NVIDIA Deep Learning Institute: *Securing Agents With NemoClaw and OpenShell* (vedere l'hub di risorse)
- Discord di NVIDIA Developer — canale `#nemoclaw`
- Guide passo passo di terze parti (ad esempio [la guida a NemoClaw di Seeed Studio](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), scritta per un braccio robotico Jetson Thor) documentano i flussi successivi all'installazione come `nemoclaw onboard` — le consideri indicazioni della comunità e segua l'hub di NVIDIA per il flusso autorevole.

## Competenze agente Jetson — automatizzare il lavoro di piattaforma

JetPack 7.2 include le **competenze agente**: flussi di lavoro ripetibili ed
eseguibili da un agente per lo sviluppo su Jetson. Tre categorie secondo
NVIDIA:

| Categoria di competenza | Che cosa automatizza |
|---|---|
| **Personalizzazione di Jetson Linux** | Creazione/personalizzazione di un BSP per schede carrier personalizzate — configurazione I/O, clock, controllo della ventola, profili di alimentazione |
| **Ottimizzazione della memoria** | Audit delle aree riservate del bootloader, delle riservazioni del kernel e della memoria dello spazio utente per far rientrare carichi di lavoro più impegnativi in meno memoria |
| **Benchmark dei modelli** | Ricerca della configurazione ottimale del modello e diagnostica per il suo dispositivo |

Altre competenze agente nell'ecosistema:

- [Competenze lato dispositivo Jetson](https://github.com/jetson-device-skills) · [Competenze BSP Jetson](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — creazione di pipeline di visione assistita da agente (vedere [il nostro tutorial su DeepStream](/it/tutorials/jetson-agx-orin/deepstream))
- [Competenze del blueprint Metropolis VSS](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — flussi di lavoro per la ricerca e il riepilogo video

## Note pratiche per il kit AGX Orin

- **Gli agenti sempre attivi richiedono capacità di calcolo dedicata** — è
  proprio questo il motivo per cui li si esegue su un kit anziché su un
  portatile che va in sospensione; pianifichi di conseguenza l'alimentazione e
  la dissipazione termica (vedere le note sulle modalità di alimentazione in
  [Risoluzione dei problemi](/it/tutorials/jetson-agx-orin/troubleshooting)).
- **La scelta del modello conta per la memoria** — i modelli locali su Orin
  rientrano ampiamente nei 64GB, ma gli agenti sempre attivi accumulano
  contesto. Vedere [Efficienza della memoria](/it/tutorials/jetson-agx-orin/memory-efficiency)
  per le leve disponibili e [Inferenza LLM locale](/it/tutorials/jetson-agx-orin/local-llm)
  per le prestazioni dei modelli on-device.
- **Questo campo si evolve rapidamente.** Consideri i comandi riportati sopra
  come il percorso ufficiale attuale; consulti l'hub di risorse per gli
  aggiornamenti prima di scrivere script di deployment.

## Fonti

- [Blog tecnico NVIDIA — IA agentica in JetPack 7.2 (comando di installazione, competenze agente, novità della versione)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (verificato il 2026-09-24)
- [Pagina prodotto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (verificato il 2026-09-24)
- [Pagina di download di JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-24)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
