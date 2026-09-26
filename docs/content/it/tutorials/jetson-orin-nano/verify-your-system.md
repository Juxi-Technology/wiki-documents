---
title: Verificare il sistema — versione, Modalità Super e checklist dell'alimentazione
sidebar_label: Verificare il sistema
slug: /getting-started/verify-your-system
description: >-
  Verifichi che il Suo NVIDIA Jetson Orin Nano Super Developer Kit esegua
  JetPack 7.2.1 con lo stack completo dei componenti, la configurazione della
  scheda Modalità Super e le modalità di alimentazione corrette.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Verificare il sistema

Dopo il primo avvio del Suo sistema JetPack 7.2.1, esegua questa checklist. Conferma la
**release L4T**, i **componenti JetPack installati**, la **configurazione della scheda Modalità Super**
e le **modalità di alimentazione**. Se il sistema non è ancora configurato, inizi dall'**[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)**.

## Passo 1 — Controllare la release L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Un sistema con **JetPack 7.2.1** riporta **R39** con **REVISION: 2.1**:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Nota di Juxi:** NVIDIA non pubblica un output di esempio per questo file. Il blocco sopra è
> un output r39.2.1 osservato dalla community su un dispositivo Orin; i Suoi valori `GCID` e `DATE`
> saranno diversi. La parte che conta è `REVISION: 2.1`.

Se l'output mostra una release più vecchia (ad esempio R36 da JetPack 6.x), il Suo sistema non
esegue JetPack 7.2.1 — vedere **[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)** e la
**[Migrazione da JetPack 6.x a JetPack 7.2.1](/it/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Passo 2 — Controllare i componenti JetPack e le versioni

I componenti JetPack come CUDA, cuDNN e TensorRT sono installati come pacchetti Debian.
Il comando ufficiale di NVIDIA per l'elenco è:

```bash
apt list --installed | grep nvidia-jetpack
```

Il metapacchetto `nvidia-jetpack` deve comparire nell'output. Per un controllo rapido di un componente,
interroghi `dpkg` direttamente — ad esempio cuDNN con `dpkg -l | grep cudnn`. Se il metapacchetto
manca, esegua `sudo apt update` poi `sudo apt install nvidia-jetpack`, e riavvii se richiesto.

La tabella seguente elenca le versioni ufficiali dei componenti NVIDIA per **JetPack 7.2.1 / Jetson
Linux 39.2.1** (verificate il 2026-09-26 sulla pagina di download di JetPack):

| Componente | Versione |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Sistema operativo | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (computer vision) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (con immagine ISO) |
| Isaac ROS | **Rilasciato** — Isaac ROS 4.6.0 (agosto 2026) ha aggiunto il supporto per Jetson Orin e JetPack 7.2; la tabella dei componenti di NVIDIA dice ancora "in arrivo" |

> **Nota di Juxi:** la pagina 7.2.1 di NVIDIA elenca un'unica matrice per tutta la linea JetPack 7 (Thor e
> Orin insieme), non per piattaforma. `dpkg` può mostrare versioni con un suffisso di build — confronti
> il numero di versione, non la stringa completa. La tabella di NVIDIA non elenca le versioni di OpenCV, DLA o Python,
> quindi nemmeno questa pagina lo fa.

> **Sulla versione di VPI:** la pagina di download di NVIDIA non è stata aggiornata completamente per la 7.2.1 — la sua
> riga VPI riporta ancora il valore di JetPack 7.2 (4.1.3). JetPack 7.2.1 include in realtà **VPI 4.1.4**, confermato
> dal repository dei pacchetti di NVIDIA: `nvidia-jetpack-runtime (= 7.2.1-b49)` dipende da `nvidia-vpi (= 7.2.1-b49)`,
> che fissa `libnvvpi4 (= 4.1.4)`. Nel pool dei pacchetti esistono sia 4.1.3 sia 4.1.4, quindi solo il vincolo di
> dipendenza è decisivo. (verificato il 2026-09-26)

## Passo 3 — Installare jtop e leggere l'attività del sistema (facoltativo)

`jtop` fa parte di **jetson-stats**, un progetto della community — non un prodotto NVIDIA. NVIDIA
non lo documenta per questa release, e la compatibilità con L4T r39 non è verificata da NVIDIA.

Lo installi usando le istruzioni della community sulla
[pagina del progetto jetson-stats](https://pypi.org/project/jetson-stats/).

Poi esegua `jtop` — un monitor di sistema e visualizzatore di processi interattivo. Osservi gli 8 GB condivisi di
memoria unificata prima di avviare un carico di lavoro di IA importante. Un'alternativa ufficiale è `sudo tegrastats`
(attività in tempo reale di CPU, GPU, memoria, temperatura e potenza; `Ctrl`+`C` lo interrompe). La pagina
How-To di NVIDIA consiglia `tegrastats` invece di `nvidia-smi` per il monitoraggio su Jetson.

## Passo 4 — Controllare la configurazione della scheda Modalità Super (TNSPEC)

Le installazioni ISO di JetPack 7.2.1 eseguono il flashing della configurazione **Modalità Super** per impostazione predefinita. Lo confermi sul dispositivo:

```bash
cat /etc/nv_boot_control.conf
```

Su un kit configurato Super, la riga `TNSPEC` porta un suffisso `-super`. Il personale NVIDIA ha pubblicato
questo esempio:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

Su un kit non-Super, la stessa riga termina senza `-super` — ad esempio, dalla segnalazione di un utente
di un sistema interessato: `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Nota di Juxi:** i caratteri al centro della stringa TNSPEC variano da unità a unità e in base allo stato del firmware.
> Ciò che conta è il suffisso `-super` alla fine della riga TNSPEC.

Problema delle note di rilascio **6480645**: dopo un'installazione da ISO, la variabile UEFI `TegraPlatformSpec`
può non riflettere accuratamente la specifica della scheda. NVIDIA indica di leggere la voce `TNSPEC`
in `/etc/nv_boot_control.conf` per le informazioni corrette sulla scheda.

## Passo 5 — Controllare le modalità di alimentazione

La modalità di alimentazione predefinita è tipicamente **25W**. Dal desktop: clicchi sulla modalità di alimentazione nella
barra superiore di Ubuntu, selezioni **Power Mode** e scelga **MAXN SUPER**. Dalla riga di comando,
stampi la modalità attiva e il suo ID:

```bash
sudo /usr/sbin/nvpmodel -q
```

Per cambiare modalità, usi l'ID mostrato dalla query (`sudo /usr/sbin/nvpmodel -m <mode_id>`).
Come distinguere Super da non-Super:

| | Configurazione Super | Configurazione non-Super |
|---|---|---|
| Modalità disponibili | 15W, 25W, **MAXN SUPER** | Solo 7W, 15W |
| ID modalità (osservati dalla community) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; predefinita 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | seleziona MAXN SUPER | fallisce: `NVPM ERROR: request for bad power mode 2` |

> **Suggerimento Juxi:** gli ID delle modalità provengono da una segnalazione della community sui file di profilo di un sistema
> 7.2; il menu di alimentazione del desktop elenca direttamente le modalità disponibili. Dopo che la GPU è stata
> usata, un cambio di modalità di alimentazione può richiedere un riavvio — il personale NVIDIA dice che la richiesta è prevista.

## Se compaiono solo 7W e 15W

Questo è un problema noto di JetPack 7.2, risolto per progettazione nella 7.2.1.

- Su **JetPack 7.2 (L4T 39.2)**, il problema noto **6279443** dice che le unità aggiornate tramite l'installer ISO
  "non useranno la modalità 'Super' come predefinita"; l'indicazione di NVIDIA era di eseguire il flashing del target
  con un host Linux o SDK Manager.
- **JetPack 7.2.1** cambia questo: "La ISO ora esegue il flashing del Jetson Orin Nano Developer Kit con
  la configurazione di flashing Modalità Super per impostazione predefinita." Il problema 6279443 non è nell'elenco dei
  problemi noti della 7.2.1, e il personale NVIDIA ha dichiarato: "Questo sarà risolto in jp7.2.1."

Una nuova installazione da ISO 7.2.1 dovrebbe mostrare 25W e MAXN SUPER. Se il Suo kit non lo fa:

1. Per un sistema installato con la ISO 7.2, riesegua il flashing con la configurazione Super da un
   host Linux o con SDK Manager — vedere **[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. NVIDIA non dichiara se una reinstallazione da ISO 7.2.1 converta una scheda installata
   con la ISO 7.2. Se le modalità Super mancano ancora, usi le opzioni di ri-flashing in
   **[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**.

La stessa domanda è indicizzata nelle **[FAQ](/it/tutorials/jetson-orin-nano/faq)**.

## Cosa deve mostrare un sistema corretto

| Controllo | Comando | Cosa mostra un sistema corretto |
|---|---|---|
| Release L4T | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| Pacchetti JetPack | `apt list --installed \| grep nvidia-jetpack` | Pacchetti JetPack installati, incluso il metapacchetto `nvidia-jetpack` |
| Controllo rapido cuDNN | `dpkg -l \| grep cudnn` | Versione 9.20.0 |
| Configurazione della scheda | `cat /etc/nv_boot_control.conf` | La riga `TNSPEC` termina con `jetson-orin-nano-devkit-super-` |
| Modalità di alimentazione | `sudo /usr/sbin/nvpmodel -q` | La modalità attiva è 25W per impostazione predefinita; 15W, 25W e MAXN SUPER sono selezionabili |

## Se qualcosa non va ancora

Componenti mancanti: riesegua i due comandi del Passo 2. Per problemi di configurazione Super o di modalità di alimentazione,
vedere **[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)** e la **[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**.
Prima di chiedere assistenza, raccolga `cat /etc/nv_tegra_release` e `cat /etc/nv_boot_control.conf`
— il personale NVIDIA richiede questo stato (più `sudo /usr/sbin/nvpmodel -q --verbose`) prima di qualsiasi
soluzione alternativa sui file di configurazione. Supporto Juxi: **support@juxitech.com** con il Suo numero d'ordine.

## Fonti

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (verificato il 2026-09-26)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificato il 2026-09-26)
- [NVIDIA forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [continuing power-mode issues](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode not unlocking](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (verificato il 2026-09-26; include le risposte del personale NVIDIA)
- [jetson-stats (jtop) su PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (verificato il 2026-09-26; fonti della community per l'installazione di jtop)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione ufficiale NVIDIA e su fonti del
forum NVIDIA alle date indicate; non ancora verificato su hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
