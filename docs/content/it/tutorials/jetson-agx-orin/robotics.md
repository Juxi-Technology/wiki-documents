---
title: Robotica su JetPack 7.2 — cosa funziona oggi
sidebar_label: Robotica (situazione attuale)
slug: /tutorials/robotics
description: >-
  Una pagina di stato onesta per lo sviluppo robotico sul kit di sviluppo AGX
  Orin con JetPack 7.2 — ROS 2, disponibilità di Isaac ROS, stack di robot
  learning e cosa usare mentre l'ecosistema si allinea.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Robotica su JetPack 7.2 — cosa funziona oggi

JetPack 7.2 ha portato Orin a una nuova generazione di piattaforma (Ubuntu 24.04,
kernel 6.8, CUDA 13). La robotica è l'unico ambito in cui l'*ecosistema* deve
ancora allinearsi alla piattaforma — per questo la pagina è volutamente una
pagina di stato, non un tutorial. Consultarla prima di impegnarsi su
un'architettura.

## Tabella di stato (verificato il 2026-09-24)

| Cosa serve | Stato su JetPack 7.2 / AGX Orin | Note |
|---|---|---|
| **ROS 2 (core)** | ✅ Funziona | Ubuntu 24.04 è la piattaforma di riferimento per ROS 2 **Jazzy**; installare seguendo la [documentazione di installazione di ROS 2](https://docs.ros.org/en/jazzy/Installation.html). Anche ROS 2 basato su Docker è un'opzione. |
| **Isaac ROS** (pacchetti ROS 2 accelerati via hardware) | ⛔ **Non ancora — NVIDIA lo indica come «in arrivo» per JetPack 7** | Questa è la lacuna più grande. Se oggi Isaac ROS è sul percorso critico del progetto, restare su **JetPack 6.x** e tenere d'occhio la [pagina dei download](https://developer.nvidia.com/embedded/jetpack/downloads) di NVIDIA per il rilascio. |
| **Modelli LLM / VLM / VLA locali** | ✅ Funziona | TensorRT Edge-LLM supporta ufficialmente Orin su JP7.2, compresi gli esempi **Vision-Language-Action** — vedere [Inferenza LLM locale](/it/tutorials/jetson-agx-orin/local-llm). |
| **Pipeline video multi-camera** | ✅ Funziona | DeepStream 9.1 è incluso in JP7.2 — vedere [DeepStream Video Analytics](/it/tutorials/jetson-agx-orin/deepstream). |
| **Comportamenti agentici / orchestrazione** | ✅ Funziona | NemoClaw + agent skills per Jetson — vedere [IA agentica](/it/tutorials/jetson-agx-orin/agentic-ai). |
| **Stack di robot learning (framework Python in stile LeRobot)** | ⚠️ Verificare prima di impegnarsi | Questi stack fanno ampio uso di Python; Ubuntu 24.04 è passato a Python 3.12 e alcune dipendenze potrebbero essere in ritardo. Provare il proprio stack specifico su JP7.2 prima di progettare su di esso — e tenere presente che **non lo abbiamo verificato su hardware**. |
| **GR00T (modelli fondazionali per umanoidi)** | ⚠️ Consultare le fonti ufficiali | Seguire il repository ufficiale Isaac GR00T di NVIDIA e gli annunci per il supporto alla piattaforma. Una guida pubblicata da un partner riporta un deployment TensorRT a pesi completi su AGX Orin + JP7.2 *(di terze parti, non verificato da noi)*. |
| **Carrier board personalizzate / attività sul BSP** | ✅ Nuovi strumenti | Le **agent skills di personalizzazione di Jetson Linux** di JetPack 7.2 automatizzano le attività di bring-up del BSP — vedere i [repository delle agent skills](https://github.com/jetson-bsp-skills). |

## Raccomandazione

- **Nuovi progetti senza dipendenze da Isaac ROS:** costruire su JetPack 7.2 — si
  ottengono il supporto a Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLM sul
  dispositivo e gli strumenti per gli agenti.
- **Progetti che oggi dipendono da Isaac ROS:** per ora pianificare su JetPack 6.x;
  considerare JP7.x come obiettivo di migrazione quando Isaac ROS sarà rilasciato
  per questa versione (la nostra
  [guida alla migrazione](/it/tutorials/jetson-agx-orin/jetpack-6-to-7) copre il lavoro di ricostruzione
  quando arriverà quel giorno).
- **Un kit, molti moduli:** ricordare che il kit di sviluppo può emulare gli altri
  moduli Jetson Orin rieseguendo il flashing — utile per validare un carico di
  lavoro robotico su tutta la gamma di moduli prima di scegliere il componente
  per la produzione ([Panoramica del prodotto](/it/tutorials/jetson-agx-orin/overview)).

## Fonti

- [Pagina dei download di JetPack 7.2.1 — Isaac ROS «in arrivo» per JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-24)
- [Guida utente del kit di sviluppo Jetson AGX Orin — Introduzione](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulazione dei moduli; verificato il 2026-09-24)
- [Documentazione di installazione di ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Stato: bozza, in attesa di revisione da parte di cheny. La disponibilità
dell'ecosistema cambia rapidamente — ricontrollare le pagine NVIDIA collegate
prima di fare affidamento su questa tabella. Non ancora verificato su hardware
fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
