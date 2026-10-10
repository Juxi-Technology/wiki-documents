---
title: Kit di sviluppo Jetson Orin Nano Super (8GB)
category: compute-vision
description: Kit di sviluppo NVIDIA Jetson Orin Nano Super (8GB) — fino a 67 INT8 TOPS di AI edge, 8 GB di memoria unificata, opzioni di archiviazione microSD e NVMe, con la documentazione completa di JetPack 7.2.1 di Juxi Technology.
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Kit di sviluppo Jetson Orin Nano Super (8GB)

> **[Acquista nel negozio](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## Panoramica

Il kit di sviluppo NVIDIA® Jetson Orin Nano™ Super è il kit di sviluppo compatto
della famiglia Jetson Orin — un piccolo computer AI per realizzare progetti di
visione artificiale, robotica e IA generativa per l'edge. Juxi Technology vende
il kit ufficiale NVIDIA nella sua confezione originale, con una serie completa
di documentazione per la baseline software JetPack 7.2.1 / L4T r39.2.1.

Caratteristiche principali:

- **Fino a 67 INT8 TOPS** di prestazioni AI (sparse; 33 dense) e fino a un **miglioramento di 1.7x sull'IA generativa** rispetto al kit originale *(NVIDIA)*
- **Memoria LPDDR5 da 8 GB a 128 bit a 102 GB/s** *(NVIDIA)* — memoria unificata condivisa da CPU, GPU e tutte le applicazioni; 8 GB è il tetto massimo per ogni carico di lavoro
- **GPU NVIDIA architettura Ampere a 1024 core con 32 Tensor Core** e una CPU Arm Cortex-A78AE a 6 core fino a 1.7 GHz *(NVIDIA)*
- **"Super" è un aggiornamento software, non un nuovo silicio** — i kit di sviluppo Orin Nano esistenti ottengono clock più alti di GPU, memoria e CPU aggiornando JetPack *(NVIDIA)*
- **Alimentazione configurabile da 7 W a 25 W** *(NVIDIA)* — la modalità di alimentazione predefinita è 25 W
- **Nessuna eMMC e nessuna archiviazione da NVIDIA** — lo slot microSD si trova sul **lato inferiore del modulo**, più due slot M.2 Key-M per SSD NVMe *(NVIDIA)*; il bundle Juxi aggiunge una scheda microSD da 64 GB
- **Software attuale: JetPack 7.2.1** (Jetson Linux / L4T r39.2.1) *(NVIDIA)* — installato con il metodo Jetson ISO da una chiavetta USB; non è richiesto un PC host Ubuntu separato
- **Confezione originale ufficiale, venduta da Juxi Technology** — il bundle aggiunge un alimentatore da 19 V, un cavo di alimentazione, una scheda microSD da 64 GB e il modulo Wi-Fi M.2

**Casi d'uso**: piccoli LLM locali e IA generativa, analisi video DeepStream,
robotica e sviluppo ROS 2, didattica e prototipazione.

## Specifiche

| Categoria | Specifica |
|---|---|
| Kit | NVIDIA Jetson Orin Nano Super Developer Kit — modulo P3767 + scheda carrier P3768; codice prodotto del kit completo P3766 *(NVIDIA)* |
| Prestazioni AI | Fino a 67 INT8 TOPS (sparse) / 33 INT8 TOPS (dense); fino a un miglioramento di 1.7x sull'IA generativa rispetto al kit originale *(NVIDIA)* |
| GPU | NVIDIA architettura Ampere, 1024 core CUDA + 32 Tensor Core; fino a 1.020 MHz *(NVIDIA)* |
| CPU | Arm Cortex-A78AE a 6 core v8.2 a 64 bit; fino a 1.7 GHz; cache L2 da 1.5 MB + L3 da 4 MB *(NVIDIA)* |
| Memoria | LPDDR5 da 8 GB a 128 bit, 102 GB/s *(NVIDIA)* — condivisa tra CPU, GPU e applicazioni |
| Archiviazione | Nessuna eMMC. Slot per scheda microSD sul lato inferiore del modulo (archiviazione principale) + 2 slot M.2 Key-M NVMe: 2280 (PCIe 3.0 x4) e 2230 (PCIe 3.0 x2) *(NVIDIA)* |
| Video | Decodifica fino a 1x 4K60 (H.265), 2x 4K30, 5x 1080p60 o 11x 1080p30; codifica 1080p30 usando 1-2 core CPU (nessun encoder hardware dedicato) *(NVIDIA)* |
| Display | 1x DisplayPort 1.2 (+MST) — l'unica uscita display; la porta USB-C non trasmette segnale display *(NVIDIA)*. Scheda del negozio: "DP 1.2, up to 4K@60Hz" — le pagine NVIDIA consultate non indicano una risoluzione massima del display |
| Rete | 1x Gigabit Ethernet (RJ45) *(NVIDIA)*; modulo wireless M.2 Key-E incluso, descritto da NVIDIA come "802.11ac/ab/gn wireless network interface controller" *(NVIDIA)*. Scheda del negozio: Wi-Fi 5 dual-band 2.4/5 GHz + Bluetooth 5.0 (le pagine NVIDIA non indicano una versione Bluetooth — considerare Bluetooth 5.0 come non verificato) |
| I/O | 4x USB 3.2 Type-A (10 Gbps, su due connettori doppi impilati), 1x USB-C (solo dati; modalità Host, Device e USB Recovery), header a 40 pin (UART, SPI, I2S, I2C, GPIO), header per pulsanti a 12 pin, header ventola a 4 pin, jack di alimentazione DC (5.5 mm x 2.5 mm) *(NVIDIA)* |
| Fotocamera | 2 connettori MIPI CSI (22 posizioni, passo 0.5 mm, contatto inferiore): CAM0 1x2 lane; CAM1 1x2 o 1x4 lane *(NVIDIA)* |
| Alimentazione | Configurabile da 7 W a 25 W *(NVIDIA)*. Modalità predefinita: 25 W. MAXN SUPER è sperimentale e disponibile solo quando il kit è flashato con la configurazione `jetson-orin-nano-devkit-super` o `jetson-orin-nano-devkit-super-maxn` *(NVIDIA)* |
| Dimensioni | Scheda tecnica NVIDIA: 103 x 90.5 x 34.77 mm; tabella delle specifiche della famiglia NVIDIA: 100 x 79 x 21 mm (in entrambe le definizioni: l'altezza comprende piedini, scheda carrier, modulo e soluzione termica). NVIDIA non ha riconciliato le due cifre; il negozio indica 100 x 79 x 21 mm |
| Software | Release attuale: JetPack 7.2.1, che include Jetson Linux (L4T) r39.2.1, installato con il metodo Jetson ISO *(NVIDIA)* |
| Nella confezione (bundle del negozio Juxi) | NVIDIA Jetson Orin Nano Super Developer Kit x1 (confezione originale ufficiale); alimentatore da 19 V x1; cavo di alimentazione Type B (US, JP, CA, PH) x1; scheda microSD da 64 GB x1; modulo Wi-Fi M.2 x1 |
| Nella confezione (NVIDIA) | Kit di sviluppo (modulo Orin Nano 8GB con dissipatore + scheda carrier di riferimento), alimentatore da 19 V, 802.11ac/ab/gn wireless network interface controller, Quick Start Guide *(NVIDIA)*. Nessuna archiviazione rimovibile: "Jetson Orin Nano Developer Kit non include archiviazione rimovibile nella confezione" *(NVIDIA)* |
| Garanzia | 1 anno, solo per uso di sviluppo (scheda del negozio) |

*Specifiche complete: consultare la scheda tecnica ufficiale NVIDIA del kit
(linkata da nvidia.com).*

> **Nota di Juxi:** Dove la scheda del negozio e i dati ufficiali NVIDIA
> differiscono, questa pagina usa il dato NVIDIA e segnala la differenza. Voci
> riportate dal negozio che le pagine NVIDIA non confermano: Bluetooth 5.0 e
> l'uscita display 4K@60Hz. La scheda microSD da 64 GB in dotazione arriva
> **senza immagine preinstallata** (vuota); NVIDIA consiglia una scheda UHS-1 da 64 GB o
> superiore. Preveda un'installazione completa di JetPack — vedere Per iniziare
> qui sotto.

## Per iniziare

1. **Controlli prima la versione del firmware.** JetPack 7.2.1 richiede il
   firmware Jetson UEFI/QSPI della generazione JetPack 6.x (versione più
   recente della 36.0). Se il Suo kit ha un firmware di fabbrica più vecchio,
   esegua il percorso di aggiornamento JetPack 6.x prima di installare —
   vedere [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).
2. **Procuri il necessario**: un PC o portatile (Windows, macOS o Linux) con
   almeno 25 GB di spazio libero; una chiavetta USB da 16 GB o più; e un
   monitor DisplayPort con tastiera e mouse USB, oppure un cavo seriale
   USB-TTL per la configurazione headless.
3. **Scelga l'archiviazione**: la scheda microSD da 64 GB in dotazione (la
   inserisca nello slot sul lato inferiore del modulo prima di avviare) oppure
   un Suo SSD NVMe in uno slot M.2 Key-M.
4. **Scriva l'installer**: scarichi la Jetson ISO di JetPack 7.2.1 e la scriva
   sulla chiavetta USB. Non scriva mai l'ISO su una scheda microSD — le
   immagini per scheda SD non sono supportate a partire da JetPack 7.2.
5. **Installi**: avvii il kit dalla chiavetta USB e selezioni l'archiviazione
   di destinazione. Confermi la richiesta della capsula firmware con **Y entro
   30 secondi** — NVIDIA la segnala come il passaggio più comunemente
   dimenticato.
6. **Primo avvio**: completi la configurazione iniziale di Ubuntu, poi
   installi i componenti JetPack.
7. Procedura completa: **[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)**

## Documentazione (serie Jetson Orin Nano)

- [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start) · [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates) · [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system)
- [Panoramica del prodotto](/it/tutorials/jetson-orin-nano/overview) · [Interfacce e layout hardware](/it/tutorials/jetson-orin-nano/interfaces) · [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting) · [FAQ](/it/tutorials/jetson-orin-nano/faq)
- [Download](/it/tutorials/jetson-orin-nano/downloads) · [Migrazione da JetPack 6.x](/it/tutorials/jetson-orin-nano/jetpack-6-to-7) · [Glossario](/it/tutorials/jetson-orin-nano/glossary) · [Registro delle modifiche](/it/tutorials/jetson-orin-nano/changelog)
- [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm) · [Efficienza della memoria](/it/tutorials/jetson-orin-nano/memory-efficiency) · [Analisi video DeepStream](/it/tutorials/jetson-orin-nano/deepstream) · [Robotica — situazione attuale](/it/tutorials/jetson-orin-nano/robotics) · [IA agentica (NemoClaw)](/it/tutorials/jetson-orin-nano/agentic-ai)

## Accessori consigliati

Sfogliare il [catalogo Juxi Technology](https://wiki.juxitech.com/products/) —
fotocamere (IMX219 CSI, autofocus USB, profondità RealSense), il
[Jetson Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator)
(elencato nel negozio per Orin NX / Orin Nano SUPER), bracci robotici, sensori
e altro ancora.

## Supporto

- 📧 Supporto tecnico: support@juxitech.com
- 🌐 Sito web: [www.juxitech.com](https://www.juxitech.com)
- 💬 Segnalare problemi di documentazione: [GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## Fonti

- [Guida utente del kit di sviluppo Jetson Orin Nano — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificata il 2026-09-26)
- [Guida utente del kit di sviluppo Jetson Orin Nano — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificata il 2026-09-26)
- [Guida utente del kit di sviluppo Jetson Orin Nano — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificata il 2026-09-26)
- [Guida utente del kit di sviluppo Jetson Orin Nano — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificata il 2026-09-26)
- [Guida utente del kit di sviluppo Jetson Orin Nano — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificata il 2026-09-26)
- [Guida per sviluppatori L4T r39.2 — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificata il 2026-09-26)
- [Guida per sviluppatori L4T r39.2 — Serie Jetson Orin NX e Orin Nano: adattamento del modulo e bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificata il 2026-09-26)
- [Pagina delle specifiche del modulo e del kit di sviluppo NVIDIA Jetson Orin](https://developer.nvidia.com/embedded/jetson-orin) (verificata il 2026-09-26)
- [NVIDIA Super Boost: il kit di sviluppo Jetson Orin Nano riceve un Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (verificata il 2026-09-26)
- [Scheda tecnica del kit di sviluppo Jetson Orin Nano Super (PDF, linkata da nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificata il 2026-09-26)
- [Pagina prodotto del negozio Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificata il 2026-09-26)

*Stato: rivisto il 2026-10-11. Basata sulla
documentazione ufficiale di NVIDIA alle date indicate; non ancora verificata su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
