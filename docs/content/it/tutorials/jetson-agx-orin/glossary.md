---
title: Glossario
sidebar_label: Glossario
slug: /appendix/glossary
description: >-
  I termini chiave per il Jetson AGX Orin Developer Kit — dalla numerazione
  delle versioni di JetPack e L4T al flashing, allo stack di IA e alla
  terminologia dell'alimentazione.
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

# Glossario

I termini che i clienti chiedono più spesso, raggruppati per argomento. I
numeri di versione si riferiscono al rilascio attuale (**JetPack 7.2.1 / L4T
39.2.1**, verificato il 2026-09-24).

## Piattaforma e hardware

| Termine | Significato |
|---|---|
| **Jetson AGX Orin** | La famiglia di moduli per l'IA edge di NVIDIA; questo kit di sviluppo monta il modulo da **64GB**. |
| **Modulo** | La scheda piccola con SoC, memoria ed eMMC che svolge l'elaborazione. |
| **Scheda carrier** | La scheda più grande con tutte le porte e i connettori; il modulo si inserisce su di essa (connettore a 699 pin, J3). |
| **Developer Kit** | Modulo + scheda carrier di riferimento + modulo Wi-Fi + alimentatore — la piattaforma di prototipazione. I prodotti di serie utilizzano moduli su schede carrier personalizzate o di partner. |
| **SoC** | System-on-chip: CPU, GPU e acceleratori integrati in un unico chip (NVIDIA chiama la linea "Tegra"). |
| **TOPS** | Mille miliardi di operazioni al secondo — una misura della capacità di elaborazione per l'IA (la famiglia AGX Orin arriva fino a 275 TOPS). |
| **Tensor Core** | Core GPU specializzati per i calcoli matriciali alla base delle reti neurali. |
| **eMMC** | Memoria flash embedded sul modulo; l'archiviazione di sistema predefinita. |
| **NVMe** | SSD veloce su PCIe, installato nello slot M.2 M-Key (J1); può ospitare il sistema. |
| **M.2 (M-Key / E-Key)** | Tipi di slot: **M-Key** = SSD NVMe, **E-Key** = modulo Wi-Fi. |
| **CSI / GMSL** | Interfacce per fotocamere (CSI sul connettore per fotocamera J509; GMSL per fotocamere di livello automobilistico). |
| **DisplayPort (DP)** | L'**unica** uscita display del kit; supporta MST (fino a 2 display) e DSC. |

## Software e versioni

| Termine | Significato |
|---|---|
| **JetPack** | Il bundle SDK di NVIDIA per Jetson — sistema operativo, driver, stack CUDA e librerie. **Attuale: 7.2.1.** |
| **Jetson Linux (L4T)** | Il board support package alla base di JetPack: bootloader, kernel, driver e il root filesystem Ubuntu. **Attuale: r39.2.1.** |
| **BSP** | "Board support package" — tutto ciò che serve per avviare e far funzionare la scheda. |
| **Root filesystem (rootfs)** | La parte user-space del sistema operativo (qui: Ubuntu 24.04). |
| **oem-config** | La procedura guidata di configurazione al primo avvio (lingua, account utente, rete). |
| **UEFI** | Il menu firmware/avvio del kit; usi il suo boot manager per scegliere il dispositivo di avvio. |
| **QSPI** | Piccola memoria flash che contiene il firmware di avvio iniziale. Durante l'installazione da ISO può comparire una richiesta "**QSPI capsule update**" — prema `Y` (obbligatorio). |
| **Modalità Force Recovery** | Modalità di avvio speciale per il flashing da un PC host. Per attivarla: tenga premuto il pulsante centrale Force Recovery mentre si collega l'alimentazione. |
| **Jetson ISO** | L'immagine di installazione per chiavetta USB; il percorso di aggiornamento consigliato da NVIDIA (non serve un PC host). |
| **SDK Manager** | Lo strumento con interfaccia grafica di NVIDIA (su PC host) per eseguire il flashing del BSP e installare i componenti JetPack. |
| **Linux_for_Tegra / flash.sh** | Gli strumenti di flashing basati su script, per uso avanzato/di prodotto. |
| **OTA** | Aggiornamento over-the-air — aggiornamenti software/di sicurezza da remoto per dispositivi già distribuiti. |
| **Device tree** | La struttura dati che indica al kernel quale hardware è collegato; i device tree personalizzati vanno ricostruiti per ogni versione di L4T. |

**Mappatura delle versioni** (la tabella più utile da imparare a memoria):

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (attuale) | **39.2.1** | **24.04** | **6.8** | **13.2.1** |
| 6.x (generazione precedente) | 36.x | 22.04 | 5.15 | 12.x |

Verifichi sempre cosa esegue effettivamente un sistema specifico:
`cat /etc/nv_tegra_release`.

## Stack di IA

| Termine | Significato |
|---|---|
| **CUDA** | Il toolkit di computing GPU di NVIDIA (13.2.1 in questo rilascio). |
| **cuDNN** | Libreria di primitive ottimizzate per il deep learning (9.20.0). |
| **TensorRT** | Ottimizzatore e runtime di inferenza (10.16.2). |
| **TensorRT engine** | Un file modello compilato, specifico per hardware/versione. Gli engine **non** sopravvivono agli aggiornamenti di versione — li ricostruisca. |
| **DeepStream** | SDK per l'analisi video multi-stream (9.1). |
| **VPI** | Vision Programming Interface — elaborazione delle immagini accelerata via hardware (4.1.3). |
| **Holoscan** | Framework di IA in streaming per l'elaborazione dei sensori in tempo reale (3.9.0). |
| **NGC** | Il catalogo NVIDIA di container e modelli preaddestrati (catalog.ngc.nvidia.com). |
| **Container** | Runtime isolato e pacchettizzato (Docker); il modo standard per distribuire software di IA su Jetson. |

## Alimentazione e monitoraggio

| Termine | Significato |
|---|---|
| **nvpmodel** | Strumento per cambiare le modalità di alimentazione. Esegua `sudo nvpmodel -q` per vedere le modalità sul suo sistema. |
| **MAXN** | Modalità di alimentazione "massime prestazioni" (senza limite di potenza). |
| **jetson_clocks** | Fissa i clock al massimo — per i benchmark, non per l'uso continuativo predefinito. |
| **tegrastats** | Monitor live integrato per l'utilizzo di CPU/GPU/memoria. |

## L'era di JetPack 7

| Termine | Significato |
|---|---|
| **NemoClaw** | Il framework di IA agentica di NVIDIA per Jetson; installabile con un solo comando da JetPack 7.2. |
| **Competenze agente Jetson** | Flussi di lavoro agente riutilizzabili che NVIDIA pubblica per attività lato dispositivo e sul BSP. |
| **Yocto / OpenEmbedded (OE4T)** | Il sistema di build per immagini Linux di produzione personalizzate e riproducibili — supportato ufficialmente da 7.2. |
| **SBSA** | Server Base System Architecture — il modello server Arm a cui si allinea la linea Jetson **Thor** (non questo kit). |
| **MIG** | Multi-Instance GPU — la partizione di una GPU in istanze isolate (Jetson Thor, anteprima tecnica). |

## Fonti

- [JetPack SDK Downloads — versioni dei componenti](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (verificato il 2026-09-24)

*Stato: bozza, in attesa di revisione da parte di cheny. Definizioni compilate
dalla documentazione NVIDIA e dall'uso standard del settore; i numeri di
versione sono stati verificati alla data indicata.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
