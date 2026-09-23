---
title: Verificare il sistema — versioni e checklist dei componenti
sidebar_label: Verificare il sistema
slug: /getting-started/verify-your-system
description: >-
  Confermi che il suo kit di sviluppo Jetson AGX Orin esegue JetPack 7.2.1 con
  lo stack completo dei componenti — comandi per la verifica della versione e
  l'elenco dei componenti previsti.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
review_owner: cheny
---

# Verificare il sistema

Dopo aver configurato o aggiornato il suo kit, confermi due cose: la
**versione del BSP** e lo **stack dei componenti JetPack installato**. Entrambi
i controlli richiedono meno di un minuto.

## Passo 1 — Verificare la versione L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Un sistema con **JetPack 7.2.1** restituisce:

```
# R39 (release), REVISION: 2.1, ...
```

Se l'output mostra una release più vecchia (ad esempio R35), aggiorni prima il
BSP — vedere **[Flashing e aggiornamenti](/it/tutorials/jetson-agx-orin/flashing-and-updates)**.

## Passo 2 — Verificare i componenti JetPack

I componenti JetPack (CUDA, cuDNN, TensorRT, ...) sono installati come pacchetti
Debian. Verifichi che il metapacchetto sia presente:

```bash
dpkg -l | grep -i nvidia-jetpack
```

E confermi che il toolkit CUDA sia disponibile:

```bash
nvcc --version
```

Output previsto per questa release: **CUDA 13.2**. Se `nvcc` è assente o il
metapacchetto non è installato, installi i componenti con:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(Richiede circa un'ora a seconda della velocità di connessione — vedere
[Avvio rapido → Passo 3](/it/tutorials/jetson-agx-orin/quick-start).)

## Passo 3 — Versioni previste per JetPack 7.2.1

La tabella seguente è l'elenco ufficiale dei componenti NVIDIA per
**JetPack 7.2.1 / Jetson Linux 39.2.1** (verificato il 2026-09-23 sulla pagina
di download di JetPack di NVIDIA):

| Componente | Versione |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Sistema operativo | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.1 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (computer vision) | 4.1.3 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (con immagine ISO) |
| Isaac ROS | **Non ancora disponibile per JetPack 7** ("in arrivo" secondo NVIDIA) |

> **Nota di Juxi:** `dpkg` può mostrare le versioni dei pacchetti con suffissi
> di build (ad esempio `13.2.1-b48`); è normale — faccia riferimento al numero
> di versione, non al suffisso. Utenti di robotica: controllino la riga Isaac
> ROS prima di pianificare lavori che ne dipendono.

## Facoltativo — una rapida occhiata all'attività del sistema

`tegrastats` (incluso in Jetson Linux) stampa in tempo reale l'utilizzo di
CPU/GPU/memoria:

```bash
tegrastats
```

Prema `Ctrl`+`C` per interromperlo.

## Se manca qualcosa

1. Esegua di nuovo `sudo apt update && sudo apt install nvidia-jetpack`.
2. Si assicuri che l'`apt dist-upgrade` + riavvio del flusso di configurazione siano completati (vedere [Avvio rapido → Passo 3](/it/tutorials/jetson-agx-orin/quick-start)).
3. Controlli lo spazio su disco (`df -h`) e la connettività Internet.
4. Il problema persiste? Consulti **[Risoluzione dei problemi](/it/tutorials/jetson-agx-orin/troubleshooting)**.

## Fonti

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (verificato il 2026-09-23)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-23)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
