---
title: Panoramica del prodotto — Kit di sviluppo Jetson Orin Nano Super
sidebar_label: Panoramica del prodotto
slug: /product/overview
description: >-
  Che cos'è il NVIDIA Jetson Orin Nano Super Developer Kit (8GB), a cosa serve
  e quale posto occupa nella famiglia Jetson Orin.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Panoramica del prodotto

![Kit di sviluppo Jetson Orin Nano Super](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

Il NVIDIA® Jetson Orin Nano™ Super Developer Kit è il kit entry level della
famiglia Jetson Orin: un piccolo computer per l'IA dedicato alla prototipazione di applicazioni di
computer vision, robotica e IA generativa locale in ambito edge. Esegue JetPack
7.2.1 (Jetson Linux / L4T r39.2.1), la release attuale per questo kit.

## Dati chiave (verificati sulla documentazione NVIDIA)

- "Super" è una configurazione software, non nuovo hardware: lo stesso modulo
  (P3767) e la stessa scheda carrier (P3768) del precedente "Jetson Orin Nano Developer
  Kit", rinominati con l'aggiornamento Super. *(Developer Kit User Guide; annuncio NVIDIA Super
  Boost)*
- Numeri di punta del kit: fino a **67 INT8 TOPS**, fino a **102 GB/s** di banda
  di memoria, potenza da **7W a 25W** e un miglioramento del **1.7x sull'IA generativa** rispetto
  alla generazione precedente. *(Developer Kit User Guide — Introduction)*
- GPU Ampere con **1.024 CUDA core e 32 Tensor Core**; CPU **Arm
  Cortex-A78AE a 6 core** a 64 bit fino a 1.7 GHz; **8GB LPDDR5 a 128 bit**. *(Datasheet;
  pagina specifiche Jetson Orin)*
- Archiviazione: uno **slot per scheda microSD sul lato inferiore del modulo** più
  il supporto per **NVMe esterno**; nessuna eMMC e nessuna archiviazione nella confezione. *(Datasheet;
  Quick Start)*
- Esegue JetPack **7.2.1** (L4T **r39.2.1**; Ubuntu 24.04, kernel 6.8, CUDA
  13.2.2, TensorRT 10.16.2) tramite il metodo Jetson ISO da una chiavetta USB.
  Intervallo supportato: JetPack 6.x o 7.2/7.2.1 (7.0/7.1 non supportavano Orin).
  *(Quick Start; download JetPack; archivio JetPack)*
- Scheda carrier: DisplayPort, Ethernet Gigabit, quattro porte USB 3.2 Type-A,
  USB-C, due connettori MIPI CSI, tre slot M.2, connettore a 40 pin. Vedere
  **[Interfacce e layout hardware](/it/tutorials/jetson-orin-nano/interfaces)**. *(Developer Kit User
  Guide — Hardware Layout)*

## Cosa significa "Super"

Il boost di prestazioni Super è fornito da una modalità di alimentazione software che
alza i clock di GPU, memoria e CPU sullo stesso hardware, e NVIDIA afferma che
i kit esistenti lo ottengono aggiornando JetPack: "Gli utenti esistenti del Jetson Orin Nano
Developer Kit possono ottenere il boost di prestazioni 'Super' con un aggiornamento
software." *(Developer Kit User Guide; annuncio NVIDIA Super Boost)*

La tabella seguente confronta il kit originale con la configurazione Super.
*(annuncio NVIDIA Super Boost)*

| Voce | Kit originale Orin Nano Developer Kit | Configurazione Super |
|---|---|---|
| Clock GPU | 635 MHz | 1.020 MHz |
| Clock CPU | 1.5 GHz | 1.7 GHz |
| Banda di memoria | 68 GB/s | 102 GB/s |
| Prestazioni IA (INT8 sparse) | 40 TOPS | 67 TOPS |
| Compute FP16 | 10 TFLOPs | 17 TFLOPs |
| Modalità di alimentazione | 7W, 15W | 7W, 15W, 25W |
| Prezzo (al lancio della Super, dicembre 2024) | $499 | $249 |

*Su un numero, i materiali di NVIDIA non concordano: l'annuncio della Super descrive
la banda di memoria precedente come "65 GB/s", mentre le tabelle di specifica dei moduli
NVIDIA elencano 68 GB/s per la configurazione originale da 8 GB. La tabella sopra usa
il valore di specifica; entrambi si riferiscono allo stesso hardware pre-Super.*

Per i prezzi attuali, vedere la
[scheda dello store Juxi per questo kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
(SKU JX00110).

A partire da JetPack 7.2.1, la Jetson ISO esegue il flashing del kit con la configurazione Super
per impostazione predefinita *(pagina di download di JetPack)*. Le unità installate inizialmente
con la ISO di JetPack 7.2 possono mantenere un profilo non-Super; se 25W o MAXN SUPER
mancano, vedere la **[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**.

Nella tabella delle modalità di alimentazione di L4T r39.2, la configurazione Super elenca 15W (modalità 0),
25W (modalità 1, predefinita) e MAXN SUPER (modalità 2, sperimentale; solo sui kit
con flashing della configurazione Super). MAXN SUPER porta la CPU fino a 1.7 GHz,
la GPU fino a 1.020 MHz e il controllore di memoria a 3.199 MHz. Legga la modalità
con `sudo /usr/sbin/nvpmodel -q`; la imposti con
`sudo /usr/sbin/nvpmodel -m <mode_id>`. Le pagine del kit NVIDIA citano "7W to 25W";
la tabella di r39.2 elenca le tre modalità sopra — controlli la Sua unità in **[Verificare
il sistema](/it/tutorials/jetson-orin-nano/verify-your-system)**. *(pagina Power
and Performance di L4T r39.2)*

## Specifiche del modulo

| Voce | Specifica |
|---|---|
| Prestazioni IA | Fino a 67 TOPS INT8 sparse (33 dense) nella configurazione Super |
| GPU | Architettura NVIDIA Ampere, 1.024 CUDA core, 32 Tensor Core, fino a 1.020 MHz |
| CPU | Arm Cortex-A78AE v8.2 a 6 core (64 bit), 1.5MB L2 + 4MB L3, fino a 1.7 GHz |
| Memoria | 8GB LPDDR5 a 128 bit, 102 GB/s |
| Archiviazione | Slot per scheda microSD sul lato inferiore del modulo; supporto per SSD NVMe esterno |
| Decodifica video | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Codifica video | 1080p30 usando 1–2 core CPU (nessun hardware di codifica dedicato) |
| Acceleratori IA | Nessuna DLA e nessuna PVA — l'inferenza gira sui Tensor Core della GPU |
| Fattore di forma del modulo | SO-DIMM a 260 pin, 69.6 mm x 45 mm |

*Fonti: Jetson Orin Nano Super Developer Kit Datasheet (dicembre 2024);
pagina specifiche NVIDIA Jetson Orin; pagina Power and Performance di L4T r39.2.*

## Numeri di parte

| Numero di parte | Cosa designa |
|---|---|
| P3766 | Il kit Jetson Orin Nano Developer Kit completo |
| P3767 | Il System on Module (SOM) |
| P3768 | La scheda carrier di riferimento |
| P3767-0005 | SKU del modulo nel kit di sviluppo (Jetson Orin Nano 8GB, "for development only") |

Questa serie di documentazione copre **solo il kit di sviluppo da 8GB**. Il modulo Orin Nano 8GB commerciale è un altro codice prodotto (**P3767-0003**) ed è un target separato negli strumenti di flashing — vedere la nota sullo SKU del modulo in [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).

## Dove si colloca nella famiglia Orin

- **Jetson Orin Nano 8GB — questo kit.** Il punto di ingresso della famiglia Orin:
  67 INT8 TOPS, 8GB di memoria unificata, da 7W a 25W.
- **Jetson Orin NX.** La stessa scheda carrier può alimentare, testare e sviluppare con i moduli Orin
  NX (richiedono dissipatore e ventola propri; un modulo nuovo di fabbrica deve essere
  flashato da un host Ubuntu con SDK Manager). *(Developer Kit User Guide —
  How-To)*
- **Jetson AGX Orin — il livello di punta.** Il modulo AGX Orin 32GB raggiunge
  241 TOPS in Modalità Super *(punti salienti della release JetPack 7.2)*. Vedere la
  [serie Jetson AGX Orin](/it/tutorials/jetson-agx-orin/quick-start) di Juxi.

Il vincolo principale da pianificare sono gli **8GB di memoria unificata**; senza DLA
né PVA, i carichi di lavoro di IA girano solo sulla GPU — vedere **[Efficienza della
memoria](/it/tutorials/jetson-orin-nano/memory-efficiency)** e **[LLM locale](/it/tutorials/jetson-orin-nano/local-llm)**.

## A cosa serve il kit di sviluppo

- **Prototipazione per la produzione.** JetPack 7.2.1 serve l'intera famiglia Orin,
  quindi il lavoro sul kit si trasferisce ai moduli Orin usati nei prodotti. *(pagina di download
  di JetPack)*
- **Computer vision.** Due connettori fotocamera MIPI CSI; il DeepStream SDK 9.1 è
  nella matrice dei componenti di JetPack 7.2.1 — vedere
  **[DeepStream](/it/tutorials/jetson-orin-nano/deepstream)**.
- **IA generativa locale.** La promessa di punta è un miglioramento di 1.7x sull'IA generativa;
  il tetto di 8GB determina cosa entra — vedere
  **[LLM locale](/it/tutorials/jetson-orin-nano/local-llm)**.
- **Robotica.** Il personale NVIDIA raccomanda ROS 2 Jazzy per JetPack 7.2.1 — vedere
  **[Robotica](/it/tutorials/jetson-orin-nano/robotics)**.

> **Nota di Juxi:** i prodotti di produzione si basano su moduli Jetson Orin — l'Orin
> Nano 8GB oppure un Orin NX — su una scheda carrier personalizzata. Il
> kit di sviluppo è il veicolo di sviluppo, non il componente di produzione.

## Contenuto della confezione

La confezione contiene il kit di sviluppo (modulo Orin Nano 8GB con dissipatore, sulla
scheda carrier di riferimento), un alimentatore da 19 V, la scheda wireless
802.11ac/ab/gn in dotazione e una scheda di avvio rapido e assistenza. NVIDIA dichiara che il kit "non
include archiviazione rimovibile nella confezione". *(Datasheet; Quick Start)*

Deve procurarsi:

- **Archiviazione** — una scheda microSD (64GB, UHS-1 o superiore) o un SSD NVMe. Lo
  slot microSD è sul **lato inferiore del modulo**; la inserisca prima dell'accensione.
  Il bundle dello store Juxi include già una scheda microSD da 64 GB, quindi acquisti archiviazione
  solo se ha ricevuto la confezione NVIDIA senza il bundle Juxi o se preferisce invece un SSD NVMe.
- **Una chiavetta USB di installazione** — 16GB o superiore. Scriva la ISO JetPack su questa
  chiavetta USB, non su una scheda microSD: le immagini per scheda SD sono state rimosse in JetPack
  7.2.
- **Un computer host** con 25GB o più di spazio libero, un monitor DisplayPort e
  tastiera/mouse USB per la configurazione desktop. *(Quick Start; Supported Hardware)*

> **Importante** Il firmware di fabbrica molto vecchio deve essere aggiornato prima — JetPack
> 7.2.1 richiede firmware UEFI/QSPI della generazione JetPack 6.x. Vedere **[Avvio
> rapido](/it/tutorials/jetson-orin-nano/quick-start)** e **[Flashing e
> aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Prossimi passi

- **[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)** — dalla confezione a un
  sistema JetPack 7.2.1 funzionante
- **[Interfacce e layout hardware](/it/tutorials/jetson-orin-nano/interfaces)** — ogni porta, slot e
  connettore
- **[Download](/it/tutorials/jetson-orin-nano/downloads)** — immagini ufficiali, strumenti e link alla documentazione

## Fonti

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (verificato il 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (verificato il 2026-09-26)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (collegato come l'annuncio della modalità di alimentazione Super)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (verificato il 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (verificato il 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificato il 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificato il 2026-09-26)
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificato il 2026-09-26)
- [Juxi Technology store listing for this kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificato il 2026-09-26)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione
ufficiale NVIDIA alle date indicate; non ancora verificato su hardware fisico da
Juxi Technology.*

**Crediti immagine:** Immagine del prodotto tratta dalla *Jetson Orin Nano
Developer Kit User Guide* ufficiale NVIDIA (scaricata il 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
