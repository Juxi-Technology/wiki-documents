---
title: Download e link ufficiali
sidebar_label: Download
slug: /downloads
description: >-
  Link diretti alle risorse ufficiali JetPack 7.2.1 / Jetson Linux 39.2.1 per
  il kit di sviluppo Jetson AGX Orin — immagini, strumenti, documentazione e
  risorse della community.
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: component table lags on some rows (VPI/PVA still show 7.2 values) — see the caveat in the body
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: authoritative source for installed component versions
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
review_owner: cheny
---

# Download e link ufficiali

Tutti i link di questa pagina rimandano a **risorse ufficiali NVIDIA** e sono
stati verificati il **2026-09-23** (un avviso sulle versioni dei componenti è
stato aggiunto il 2026-09-26). Per gli aggiornamenti, consideri i primi due
link il punto di partenza di riferimento.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) — **hub di riferimento** per informazioni sulla release e i download. ⚠️ **La sua tabella dei componenti è in ritardo riga per riga**: al 2026-09-26 riporta ancora i valori di JetPack **7.2** per VPI e PVA, e la sua riga Isaac ROS dice ancora "in arrivo" (rilasciato a partire dalla 4.6.0). Per le versioni che un sistema JetPack 7.2.1 installa effettivamente, utilizzi il [repository apt di NVIDIA per Jetson](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — veda [Verificare il sistema](/it/tutorials/jetson-agx-orin/verify-your-system).
- [Immagine ISO JetPack (r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — l'immagine di installazione USB utilizzata nel nostro [Avvio rapido](/it/tutorials/jetson-agx-orin/quick-start)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — strumento di flashing da PC host
- [Immagini Yocto per Jetson AGX Orin](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — recipe e immagini ufficiali Yocto/OpenEmbedded
- [Archivio JetPack](https://developer.nvidia.com/embedded/jetpack-archive) · [Archivio Jetson Linux](https://developer.nvidia.com/embedded/jetson-linux-archive) — release precedenti

## Documentazione

- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — il riferimento principale per questo kit
  - [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — novità e **problemi noti**
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — supporto al flashing, sicurezza, sviluppo della fotocamera, OTA
- [Jetson Linux API Reference](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [Camera Development Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- Specifica della carrier board: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — elencata nella [pagina dei download](https://developer.nvidia.com/embedded/downloads) di NVIDIA

## Strumenti e account

- [Balena Etcher](https://etcher.balena.io) — scrive la Jetson ISO su una chiavetta USB (Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — iscrizione (gratuita) necessaria per scaricare SDK Manager
- [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — supporto ufficiale della community

## Apprendimento e IA agentica (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — tutorial pratici per eseguire modelli di IA su Jetson
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — IA agentica su Jetson; installazione con un solo comando supportata da JetPack 7.2
- [Competenze lato dispositivo Jetson](https://github.com/jetson-device-skills) · [Competenze BSP Jetson](https://github.com/jetson-bsp-skills) — competenze agente riutilizzabili di NVIDIA

## Juxi Technology

- **Catalogo prodotti e accessori:** <https://wiki.juxitech.com/products/> — componenti aggiuntivi per il suo kit (fotocamere, bracci robotici, sensori e altro), con specifiche e link per l'acquisto
- **Contatti:** supporto tecnico — support@juxitech.com · vendite — sales@juxitech.com · domande sui prodotti — pe@juxitech.com
- Gli script di avvio e il codice di esempio di Juxi verranno aggiunti qui non appena disponibili.

## Fonti

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-23; avviso sulla tabella dei componenti il 2026-09-26)
- [NVIDIA Jetson apt repository — indice Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — fonte autorevole per le versioni dei componenti installati (verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
