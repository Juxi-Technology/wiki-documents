---
title: Robotica su JetPack 7.2 — cosa funziona oggi
sidebar_label: Robotica (situazione attuale)
slug: /tutorials/robotics
description: >-
  Una pagina di stato onesta per lo sviluppo robotico sul kit di sviluppo AGX
  Orin con JetPack 7.2 — ROS 2, disponibilità di Isaac ROS, stack di robot
  learning e cosa verificare prima di impegnarsi.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Robotica su JetPack 7.2 — cosa funziona oggi

JetPack 7.2 ha portato Orin a una nuova generazione di piattaforma (Ubuntu 24.04,
kernel 6.8, CUDA 13). La robotica presenta un quadro misto: i componenti
principali (ROS 2, Isaac ROS) sono ormai presenti su questa piattaforma, mentre
alcune parti dello stack circostante si stanno ancora assestando — per questo la
pagina è volutamente una pagina di stato, non un tutorial. Consultarla prima di
impegnarsi su un'architettura.

## Tabella di stato (verificato il 2026-09-24; riga Isaac ROS riverificata il 2026-09-26)

| Cosa serve | Stato su JetPack 7.2 / AGX Orin | Note |
|---|---|---|
| **ROS 2 (core)** | ✅ Funziona | Ubuntu 24.04 è la piattaforma di riferimento per ROS 2 **Jazzy**; installare seguendo la [documentazione di installazione di ROS 2](https://docs.ros.org/en/jazzy/Installation.html). Anche ROS 2 basato su Docker è un'opzione. |
| **Isaac ROS** (pacchetti ROS 2 accelerati via hardware) | ✅ **Supportato a partire da Isaac ROS 4.6.0** (2026-08-18) | Rilasciato per JetPack 7.2 su Jetson Orin, con un walkthrough ufficiale di configurazione per AGX Orin. La vera decisione riguarda la distribuzione ROS 2: **4.6.x su Jazzy** vs **5.0 su Lyrical** — vedere [Isaac ROS su JetPack 7.2](#isaac-ros-su-jetpack-7-2). |
| **Modelli LLM / VLM / VLA locali** | ✅ Funziona | TensorRT Edge-LLM supporta ufficialmente Orin su JP7.2, compresi gli esempi **Vision-Language-Action** — vedere [Inferenza LLM locale](/it/tutorials/jetson-agx-orin/local-llm). |
| **Pipeline video multi-camera** | ✅ Funziona | DeepStream 9.1 è incluso in JP7.2 — vedere [DeepStream Video Analytics](/it/tutorials/jetson-agx-orin/deepstream). |
| **Comportamenti agentici / orchestrazione** | ✅ Funziona | NemoClaw + agent skills per Jetson — vedere [IA agentica](/it/tutorials/jetson-agx-orin/agentic-ai). |
| **Stack di robot learning (framework Python in stile LeRobot)** | ⚠️ Verificare prima di impegnarsi | Questi stack fanno ampio uso di Python; Ubuntu 24.04 è passato a Python 3.12 e alcune dipendenze potrebbero essere in ritardo. Provare il proprio stack specifico su JP7.2 prima di progettare su di esso — e tenere presente che **non lo abbiamo verificato su hardware**. |
| **GR00T (modelli fondazionali per umanoidi)** | ⚠️ Consultare le fonti ufficiali | Seguire il repository ufficiale Isaac GR00T di NVIDIA e gli annunci per il supporto alla piattaforma. Una guida pubblicata da un partner riporta un deployment TensorRT a pesi completi su AGX Orin + JP7.2 *(di terze parti, non verificato da noi)*. |
| **Carrier board personalizzate / attività sul BSP** | ✅ Nuovi strumenti | Le **agent skills di personalizzazione di Jetson Linux** di JetPack 7.2 automatizzano le attività di bring-up del BSP — vedere i [repository delle agent skills](https://github.com/jetson-bsp-skills). |

## Isaac ROS su JetPack 7.2

L'era dell'«in arrivo» è finita. Il rilascio **4.6.0** di Isaac ROS
(2026-08-18) ha aggiunto il supporto per **Jetson Orin** e **JetPack 7.2**, e
la tabella delle piattaforme supportate abbina *Jetson Orin* a *JetPack 7.2*
(SSD NVMe da 128+ GB). NVIDIA pubblica per questa combinazione un walkthrough
dedicato di avvio rapido e configurazione Docker per il **Jetson AGX Orin** —
questo kit è un target di prima classe, non un ripiego.

La decisione che conta davvero è quale **distribuzione ROS 2** adottare:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Rilasciato | 2026-08-18 | 2026-09-21 |
| Distribuzione ROS 2 | **Jazzy** — il rilascio standard di Ubuntu 24.04 | **Lyrical Luth** — NVIDIA compila da sé i pacchetti ROS 2 Noble e li pubblica sul proprio CDN buildfarm |
| Pacchetti NITROS | Presenti | **Rimossi** e ricostruiti nativamente su `rosidl::Buffer`; il codice che chiama direttamente API o tipi NITROS richiede una migrazione a livello di sorgente |
| Abbinamento con Isaac Sim | 6.0 (5.0/5.1 ancora supportati come legacy) | 6.0 |

- Se parte da zero e vuole seguire il percorso mainstream: **4.6.x su Jazzy**
  mantiene il progetto sul rilascio standard di ROS 2. **5.0** è la direzione
  in cui va NVIDIA e porta con sé l'ecosistema Lyrical — legga la guida alla
  migrazione da NITROS a `rosidl::Buffer` linkata nelle
  [note di rilascio della 5.0.0](https://nvidia-isaac-ros.github.io/releases/index.html)
  prima di aggiornare il codice dei nodi esistente.
- **Limitazioni note su Orin** a queste versioni: le fotocamere RealSense
  funzionano **solo in modalità Docker**; con `isaac_ros_stereo_image_proc`,
  selezionando `backend:=JETSON` su AGX Orin con input RGB8/BGR8 il nodo può
  abortire con un errore VPI — mantenga il valore predefinito
  `backend:=CUDA`; Teleop dal pacchetto Debian richiede
  `ISAAC_TELEOP_CLOUDXR_EXP=0` su Orin; e nella 5.0 la preelaborazione di
  `isaac_ros_dnn_image_encoder` è più lenta rispetto alla 4.6 su AGX Orin —
  se quel nodo è critico nel suo grafo, preferisca la 4.6.
- **OpenCV:** JetPack 7.2 include OpenCV **4.8.0**, mentre Isaac ROS prevede la
  **4.6.0**. Rimuova i pacchetti di sistema
  (`sudo apt-get remove -y libopencv* opencv*`) e i pacchetti Isaac ROS
  installeranno la loro versione bloccata.

### Su cosa non concordano le pagine di NVIDIA

La [pagina dei download di JetPack](https://developer.nvidia.com/embedded/jetpack/downloads)
di NVIDIA elenca ancora Isaac ROS come **«in arrivo»** per questo rilascio,
mentre le note di rilascio di Isaac ROS dichiarano il supporto a partire dalla
4.6.0. Le due pagine non sono state riconciliate — Isaac ROS viene rilasciato
indipendentemente da JetPack, e la tabella dei componenti della pagina JetPack
tiene traccia di ciò che viene distribuito *con* JetPack. I repository apt a
cui rimanda la documentazione di Isaac ROS sono la prova concreta della
combinazione supportata: `…/isaac-ros/release-4.6 noble-jetpack` — *noble* per
Ubuntu 24.04, *jetpack* per la build JetPack. Quando le due fonti non
concordano, consideri le
[note di rilascio di Isaac ROS](https://nvidia-isaac-ros.github.io/releases/index.html)
come fonte operativa, e verifichi sulla propria configurazione prima di
progettare su una delle due.

## Raccomandazione

- **Nuovi progetti senza dipendenze dalla robotica:** costruire su JetPack 7.2 — si
  ottengono il supporto a Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLM sul
  dispositivo e gli strumenti per gli agenti.
- **Progetti che usano Isaac ROS:** JetPack 7.2 è di nuovo un target supportato.
  Scelga deliberatamente tra 4.6.x (Jazzy) e 5.0 (Lyrical), e metta in conto la
  sostituzione di OpenCV e il supporto RealSense solo in modalità Docker. Se il
  suo progetto è a metà su JetPack 6.x con uno stack convalidato, non c'è alcuna
  marcia forzata — migri quando avrà definito la scelta della versione di
  Isaac ROS (la nostra
  [guida alla migrazione](/it/tutorials/jetson-agx-orin/jetpack-6-to-7) copre il lavoro di ricostruzione).
- **Un kit, molti moduli:** ricordare che il kit di sviluppo può emulare gli altri
  moduli Jetson Orin rieseguendo il flashing — utile per validare un carico di
  lavoro robotico su tutta la gamma di moduli prima di scegliere il componente
  per la produzione ([Panoramica del prodotto](/it/tutorials/jetson-agx-orin/overview)).

## Fonti

- [Isaac ROS — Releases: note di rilascio di 4.6.0 (2026-08-18) e 5.0.0 (2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html) (verificato il 2026-09-26)
- [Isaac ROS 4.6 — Getting Started: piattaforme supportate, walkthrough per Jetson AGX Orin, installazione via apt](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (verificato il 2026-09-26)
- [Isaac ROS 5.0 — Getting Started: piattaforme supportate, CDN della buildfarm Lyrical](https://nvidia-isaac-ros.github.io/getting_started/index.html) (verificato il 2026-09-26)
- [Pagina dei download di JetPack 7.2.1 — elenco dei componenti](https://developer.nvidia.com/embedded/jetpack/downloads) — riporta ancora la riga obsoleta «in arrivo» di Isaac ROS (verificato il 2026-09-26)
- [Guida utente del kit di sviluppo Jetson AGX Orin — Introduzione](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulazione dei moduli; verificato il 2026-09-24)
- [Documentazione di installazione di ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Stato: bozza, in attesa di revisione da parte di cheny. La disponibilità
dell'ecosistema cambia rapidamente — ricontrollare le pagine NVIDIA collegate
prima di fare affidamento su questa tabella. Non ancora verificato su hardware
fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
