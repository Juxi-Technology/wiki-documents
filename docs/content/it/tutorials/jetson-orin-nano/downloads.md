---
title: Download e link ufficiali
sidebar_label: Download
slug: /downloads
description: >-
  Un indice verificato dei download e della documentazione ufficiali NVIDIA per
  il Jetson Orin Nano Super Developer Kit (8GB) su JetPack 7.2.1 / L4T r39.2.1,
  più risorse dei partner e i punti di accesso Juxi Technology.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Download e link ufficiali

Questa pagina è un indice dei download e della documentazione ufficiali NVIDIA
per il **Jetson Orin Nano Super Developer Kit (8GB)** su **JetPack 7.2.1 /
Jetson Linux (L4T) r39.2.1**, più alcune risorse dei partner e i punti di
accesso Juxi Technology. Tutti i link sono stati verificati il **2026-09-26**.

Due fatti specifici dell'Orin Nano contano prima di scaricare qualsiasi cosa:

- **Nessuna immagine per scheda SD.** A partire da JetPack 7.2, il kit si
  installa dalla Jetson ISO scritta su una chiavetta USB. Non esiste alcuna
  immagine per scheda SD e la ISO non deve essere scritta su una scheda
  microSD.
- **Requisito firmware.** JetPack 7.2.1 richiede sul kit un firmware UEFI/QSPI
  della generazione JetPack 6.x. Se il suo kit ha ancora il firmware di
  fabbrica più vecchio, completi prima il JetPack 6.x Update Path.

> **Suggerimento Juxi:** Il flusso di configurazione completo è in [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start). Le opzioni di flashing e aggiornamento sono confrontate in [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — la pagina principale di JetPack: note di rilascio, la tabella ufficiale delle versioni dei componenti e tutti i link di download di JetPack 7.2.1.

> ⚠️ **Non si fidi di quella tabella dei componenti riga per riga.** NVIDIA non l'ha aggiornata completamente per la 7.2.1: la riga di CUDA è stata aggiornata, ma le due righe accanto no — VPI mostra ancora il valore di JetPack 7.2 (**4.1.3, mentre la 7.2.1 include in realtà 4.1.4**) e la riga di Isaac ROS dice ancora "in arrivo", anche se Isaac ROS supporta Orin su JetPack 7.2 dal suo rilascio di agosto 2026. Per le versioni dei componenti, consideri il repository dei pacchetti di NVIDIA come fonte autorevole: il metapacchetto fissa ogni componente attraverso la sua catena di dipendenze — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), dove `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (verificato il 2026-09-26). Le versioni dei componenti sono elencate anche in [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system).
- [Jetson ISO per r39.2.1 (download diretto)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — l'immagine dell'installer per JetPack 7.2.1; la pagina Quick Start del kit la collega come "Direct Download Link: Jetson ISO (r39.2.1)". La scriva su una chiavetta USB da 16 GB o più. Nessun checksum è pubblicato insieme al download.
- [NVIDIA SDK Manager documentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — installi e usi lo strumento per PC host per flashare il kit, aggiornare il firmware e installare i componenti JetPack (è richiesto un account NVIDIA Developer Program); il flusso del kit è in [BSP Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) — release JetPack precedenti, tra cui JetPack 7.2 (la prima release 7.x che supporta la famiglia Orin) e la linea JetPack 6.x.

## Documentazione

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — il riferimento principale per questo kit.
  - [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — le novità di JetPack 7.2.1, la dichiarazione di GA e l'elenco dei problemi noti.
- [Jetson Linux r39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — note di rilascio di JetPack 7.2.
- [Jetson Linux Developer Guide (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — target di flashing, configurazione delle partizioni e le tabelle di alimentazione e prestazioni della piattaforma.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — l'elenco di NVIDIA delle ulteriori risorse per questo kit (JetPack SDK, Developer Guide, documentazione di SDK Manager, Jetson Download Center, Jetson AI Lab, forum per sviluppatori, Jetson Ecosystem).
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) — l'indice di download di NVIDIA per Jetson; la guida del kit rimanda qui per la Carrier Board Specification e l'elenco dei componenti supportati. Alcune parti richiedono un login NVIDIA.

## Framework e tutorial di IA

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — lo stack di inferenza LLM on-device di NVIDIA per Jetson. Orin è un target ufficialmente supportato solo con FP16, INT8 e INT4 ([support matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [supported models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — analisi video su Jetson; DeepStream 9.1 è la release che supporta la famiglia Orin su JetPack 7.2 ([Quickstart](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — un hub gestito da partner con tutorial pratici per eseguire modelli di IA su Jetson, tra cui un [walkthrough di TensorRT Edge-LLM per Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [SBSA wheel index (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — indice ospitato da partner di wheel Python aarch64 per JetPack 7.2 / CUDA 13.2; il personale NVIDIA indica questo indice per le wheel Python della release.

## Juxi Technology

- **Wiki:** [wiki.juxitech.com](https://wiki.juxitech.com/) — questa serie di documentazione; il [catalogo prodotti](https://wiki.juxitech.com/products/) elenca fotocamere, sensori e accessori per i kit Jetson.
- **Store:** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — la scheda dello store Juxi per questo kit (SKU JX00110).
- **Contatti:** supporto tecnico — support@juxitech.com · vendite — sales@juxitech.com · domande sui prodotti — pe@juxitech.com.

## Fonti

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (verificato il 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) e [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (verificato il 2026-09-26) — ⚠️ la sua tabella dei componenti è disallineata riga per riga; per le versioni dei componenti usi invece il [repository dei pacchetti di NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (vedere l'avvertenza sopra)
- [Repository dei pacchetti di NVIDIA — indice Packages r39.2 arm64](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — fonte autorevole per le versioni dei componenti, tramite i vincoli di dipendenza nei metapacchetti (verificato il 2026-09-26)
- Note di rilascio di Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificato il 2026-09-26)
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (verificato il 2026-09-26)
- [NVIDIA SDK Manager documentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (verificato il 2026-09-26)
- [TensorRT Edge-LLM documentation](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA wheel index](https://pypi.jetson-ai-lab.io/sbsa/cu130) (verificato il 2026-09-26)
- [Juxi Technology store product page](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) e [wiki](https://wiki.juxitech.com/) (verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
