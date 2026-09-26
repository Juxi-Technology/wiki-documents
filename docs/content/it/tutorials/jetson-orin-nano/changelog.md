---
title: Registro delle modifiche
sidebar_label: Registro delle modifiche
slug: /appendix/changelog
description: >-
  Aggiornamenti a questo set di documentazione e la cronologia delle versioni
  di JetPack per il NVIDIA Jetson Orin Nano Super Developer Kit.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Registro delle modifiche

## Aggiornamenti della documentazione

| Data | Modifica |
|---|---|
| 2026-09-26 | Set di documentazione iniziale pubblicato come bozza: Avvio rapido, Flashing e aggiornamenti, Verificare il sistema, Panoramica del prodotto, Interfacce e layout hardware, FAQ, Risoluzione dei problemi, Download, la guida alla migrazione da JetPack 6.x → 7.2, cinque tutorial (Inferenza LLM locale, Efficienza della memoria, DeepStream, Robotica, IA agentica), Glossario e questo Registro delle modifiche. Redatto sulla base della documentazione ufficiale di NVIDIA per JetPack 7.2.1; non ancora verificato su hardware fisico. |

## Versioni di JetPack per questo kit

| JetPack | Jetson Linux (L4T) | Data | Note |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Attuale.** La ISO ora esegue il flashing dell'Orin Nano Developer Kit con la configurazione Modalità Super per impostazione predefinita, il che risolve il problema della r39.2 in cui le unità aggiornate via ISO restavano sul profilo di alimentazione precedente. |
| 7.2 | 39.2.0 | 2026-06 | Prima release JetPack 7 per la famiglia Orin (Ubuntu 24.04, kernel 6.8, CUDA 13.x). Problema noto in questa release: le unità aggiornate tramite la Jetson ISO non passavano alla modalità Super per impostazione predefinita — vedere [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | La linea JetPack 6 per questo kit (Ubuntu 22.04). È qui che è stata introdotta la modalità di alimentazione "Super" — lo stesso hardware, con clock CPU/GPU/memoria più alti e la modalità 25 W. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Release JetPack 6 precedenti. |
| 5.1.3 | 35.x | 2023–2024 | La più vecchia linea di firmware ancora citata oggi: il JetPack 6.x Update Path usa un'immagine ponte 5.1.3 per portare i kit molto vecchi al firmware della generazione JetPack 6.x prima che JetPack 7 possa essere installato. |

Cronologie complete: [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

Per aggiornare il suo kit, consulti **[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)**;
per verificare cosa sta eseguendo, consulti **[Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system)**.

## Fonti

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificato il 2026-09-26)
- [NVIDIA JetPack 6.2 announcement — Super mode for Jetson Orin Nano](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (collegato come annuncio del produttore della modalità di alimentazione Super)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla
documentazione ufficiale di NVIDIA alle date indicate; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
