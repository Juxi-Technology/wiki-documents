---
title: Migrazione da JetPack 6.x a JetPack 7.2
sidebar_label: Migrare da JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Cosa cambia tra JetPack 6.x e JetPack 7.2.1 sul kit di sviluppo Jetson AGX
  Orin, cosa deve essere ricompilato e un ordine di migrazione consigliato.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Migrazione da JetPack 6.x a JetPack 7.2

Questa pagina è rivolta agli utenti che utilizzano già JetPack 6.x sul kit di
sviluppo AGX Orin. Kit nuovi: iniziare invece da
[Avvio rapido](/it/tutorials/jetson-agx-orin/quick-start).

## Cosa cambia

| Livello | Periodo JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (la 6.2 usava 36.4.x) | **39.2.1** |
| Sistema operativo / file system di root | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel Linux | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (periodo 6.x) | **10.16.2** |

> I valori della colonna JetPack 6.x sono indicativi (periodo JetPack 6.2).
> Prima di pianificare, verifichi le **sue** versioni attuali esatte con
> `cat /etc/nv_tegra_release` e consulti l'[Archivio JetPack](https://developer.nvidia.com/embedded/jetpack-archive)
> di NVIDIA per i dettagli di ogni release.

## Novità per Orin nella linea 7.2

Dalle note di rilascio di Jetson Linux 39.2:

- La **famiglia Jetson Orin entra nella linea software JetPack 7** (stessa generazione di Thor).
- **Installazione ISO unificata** — un percorso di installazione da chiavetta USB, senza PC host.
- Installazione di **NemoClaw** con un solo comando per i flussi di lavoro di IA agentica.
- **Ricette Yocto/OpenEmbedded** ufficiali (OE4T) per immagini di produzione personalizzate.
- Stack fotocamera: **SIPL API v2.0** (GMSL e CoE) — si noti che questa release presenta **modifiche ABI**: i driver UDDF compilati per JetPack 7.1 devono essere ricompilati con gli header di JetPack 7.2.
- *(AGX Orin 32GB Super Mode / MAXN_SUPER è specifico del modello da 32GB e non si applica al kit da 64GB. Le modifiche SBSA e MIG riguardano Jetson Thor.)*

## Cosa non può essere trasferito — pianificare la ricompilazione

- **Moduli kernel out-of-tree** — il kernel è passato alla versione 6.8; i moduli devono essere ricompilati con i nuovi header.
- **Driver delle fotocamere e personalizzazioni del device tree** — da ricompilare per la 39.2; SIPL 2.0 introduce inoltre modifiche ABI per i driver UDDF.
- **Engine TensorRT** — gli engine serializzati sono legati alla versione di TensorRT; ricostruirli con TensorRT 10.16.2 sul target.
- **Binari CUDA** — da ricompilare con CUDA 13; non si aspetti che i binari 12.x vengano riutilizzati.
- **Container** — passare a immagini compatibili con JetPack 7 (ad es. container NGC aggiornati).
- **Ambienti Python e servizi di sistema** — da ricreare per Ubuntu 24.04 (nomi dei pacchetti, repository e versioni dell'interprete sono cambiati).

## Ordine di migrazione consigliato

1. **Confermi che il suo stack software sia supportato** sulla 7.2.1 *prima* di cancellare qualsiasi cosa — verifichi ogni componente da cui dipende rispetto alla [lista dei componenti di JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) di NVIDIA. Tale pagina può rimanere indietro per gli SDK rilasciati in modo indipendente: indica ancora Isaac ROS come "in arrivo", sebbene Isaac ROS 4.6.0 abbia aggiunto il supporto per Jetson Orin + JetPack 7.2 (vedere [Robotica su JetPack 7.2](/it/tutorials/jetson-agx-orin/robotics)).
2. **Esegua un backup:** dati delle applicazioni, file di calibrazione dei sensori, volumi dei container, sorgenti del device tree, script di build di TensorRT/modelli ONNX.
3. **Esegua il flashing di JetPack 7.2.1** ([Flashing e aggiornamenti](/it/tutorials/jetson-agx-orin/flashing-and-updates)) e verifichi: avvio, archiviazione, rete e che il Force Recovery funzioni ancora.
4. **Ripristini le periferiche:** Wi-Fi, fotocamere, driver CAN o fieldbus — ricompilati per il kernel 6.8.
5. **Ricompili** applicazioni CUDA, plugin TensorRT ed engine TensorRT **sul target**.
6. **Verifichi la sua applicazione dapprima nella modalità di alimentazione originale**; solo in seguito provi le altre modalità di prestazioni.
7. **Registri le baseline:** utilizzo della memoria, temperature, consumo energetico, latenza, throughput — prima di passare alla produzione.

## Rollback

- Prima di cancellare, conservi una **copia verificata come funzionante** del suo sistema attuale (un'immagine di riserva per NVMe/eMMC o, come minimo, i dati del passo 2).
- L'installer ISO può installare qualsiasi versione L4T per cui dispone del supporto di installazione — conservi la chiavetta USB del vecchio installer se dovesse servire tornare indietro.
- Per le flotte: pianifichi un rilascio graduale e preferisca soluzioni con un percorso di ripristino indipendente (USB di ripristino + immagine di backup) rispetto agli aggiornamenti in-place.

## Fonti

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, problemi noti (verificato il 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-23) — ⚠️ la sua tabella dei componenti è in ritardo su alcune righe; per le versioni effettivamente installate da un sistema 7.2.1, vedere [Verificare il sistema](/it/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — fonte secondaria; utilizzata solo per l'organizzazione degli argomenti di migrazione (verificato il 2026-09-23)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione
ufficiale NVIDIA alla data indicata; non ancora verificato su hardware fisico da
Juxi Technology. L'elenco delle ricompilazioni descrive le conseguenze standard
della piattaforma (variazioni di versione di kernel/TensorRT/CUDA) — da validare
rispetto al proprio stack.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
