---
title: Glossario
sidebar_label: Glossario
slug: /appendix/glossary
description: >-
  I termini chiave per il NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) —
  dalla numerazione delle versioni di JetPack e L4T al flashing, alle modalità
  di alimentazione e allo stack di IA.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Glossario

I termini che un nuovo utente Jetson incontra per primi, in ordine alfabetico.
I numeri di versione si riferiscono al rilascio attuale per questo kit
(**JetPack 7.2.1 / L4T r39.2.1**, verificato il 2026-09-26).

## Termini

| Termine | Significato |
|---|---|
| **BSP** | Board support package: lo strato software che avvia la scheda — bootloader, kernel, driver e il root filesystem. In JetPack il BSP è Jetson Linux (L4T). Durante un'installazione da Jetson ISO, l'installer scrive il BSP sul dispositivo di archiviazione selezionato. |
| **capsule update** | Un aggiornamento del firmware di avvio QSPI. Durante un'installazione da Jetson ISO su un kit con firmware QSPI più vecchio, l'installer chiede di eseguire un aggiornamento della capsula: prema `Y` entro 30 secondi, altrimenti l'installazione fallisce più tardi. L'aggiornamento viene eseguito in due passaggi e il kit può riavviarsi tra l'uno e l'altro — è previsto. |
| **carveout** | Una regione di memoria che il firmware di avvio riserva a un blocco hardware specifico, come la pipeline di display o fotocamera. Il sistema operativo non può usarla. Su Orin Nano queste riserve sono documentate e si possono ridurre modificando il BSP e riflashando il kit (vedere [Efficienza della memoria](/it/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | La piattaforma e il toolkit di computing parallelo di NVIDIA per eseguire codice sulla GPU. JetPack 7.2.1 include CUDA 13.2.2. La compute capability della GPU di Orin è 8.7 (`sm_87`); i binari GPU che non includono `sm_87` ripiegano sull'esecuzione su CPU (vedere [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | La libreria di primitive di deep learning ottimizzate di NVIDIA, come convoluzione e funzioni di attivazione. I framework di deep learning e TensorRT la usano per le loro operazioni principali. JetPack 7.2.1 include cuDNN 9.20.0. |
| **DeepStream** | L'SDK di NVIDIA per l'analisi video multi-stream: decodifica il video, esegue l'inferenza, traccia gli oggetti e produce i risultati. DeepStream 9.1 supporta la famiglia Jetson Orin su JetPack 7.2. NVIDIA raccomanda il container Docker come percorso di installazione più rapido per i nuovi utenti (vedere [Analisi video DeepStream](/it/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator: un motore di inferenza a funzione fissa integrato in alcuni moduli Jetson. Il modulo Orin Nano non ha DLA, quindi su questo kit l'inferenza viene eseguita sulla GPU. |
| **Edge-LLM** | TensorRT Edge-LLM: il runtime on-device di NVIDIA per modelli linguistici di grandi dimensioni (LLM) e modelli visione-linguaggio (VLM). Su Orin supporta solo engine FP16, INT8 e INT4 — gli engine FP8 e FP4 non vengono eseguiti — e gli engine vengono costruiti sul dispositivo stesso (vedere [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Memoria flash embedded usata come disco di sistema su alcuni moduli Jetson. Il kit di sviluppo non include archiviazione: si procuri una scheda microSD o un SSD NVMe prima di iniziare (vedere [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)). |
| **Modalità Force Recovery** | Una modalità di avvio speciale usata per flashare il kit da un PC host. La si attiva dal sistema in esecuzione con `sudo reboot --force forced-recovery`, oppure a kit spento cortocircuitando i pin 9 e 10 del connettore dei pulsanti e collegando poi l'alimentazione. In questa modalità la porta USB-C veicola la connessione di flashing verso il PC host. |
| **JetPack** | Il bundle SDK di NVIDIA per Jetson: sistema operativo, driver, stack CUDA e librerie. Il rilascio attuale per questo kit è JetPack 7.2.1, che include Jetson Linux (L4T) r39.2.1. |
| **Jetson 6.x Update Path** | La procedura ponte per il firmware dei kit il cui firmware UEFI/QSPI di fabbrica è precedente alla 36.0. Avvia un'immagine ponte microSD di JetPack 5.1.3 e pianifica un aggiornamento del bootloader (firmware); dopo di che il kit può avviare JetPack 6.x o la Jetson ISO di JetPack 7.2.1. I kit con firmware più vecchio devono completare questo percorso prima di un'installazione da ISO (vedere [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | L'immagine unificata di installazione USB per JetPack 7.2 e successivi. La scriva su una chiavetta USB con uno strumento come Balena Etcher — non la scriva su una scheda microSD — e noti che è solo per l'installazione, non una live USB. Durante l'installazione si seleziona il target: la scheda microSD o l'SSD NVMe. |
| **L4T** | Jetson Linux: il board support package sotto JetPack — il bootloader UEFI, il kernel, i driver e il root filesystem Ubuntu. Per JetPack 7.2.1 è r39.2.1, con kernel Linux 6.8 e root filesystem Ubuntu 24.04. |
| **MAXN SUPER** | La modalità di alimentazione massima del kit (modalità 2): CPU 1.728 MHz, GPU 1.020 MHz, memoria 3.199 MHz. È una modalità sperimentale ed esiste solo se il kit è stato flashato con la configurazione Super. La selezioni nel menu Power Mode del desktop, oppure esegua `sudo /usr/sbin/nvpmodel -m 2`. |
| **microSD (UHS-1)** | Il formato di scheda usato come archiviazione di sistema predefinita del kit. UHS-1 è una classe di velocità SD; NVIDIA raccomanda una scheda microSD UHS-1 da 64 GB o più. Lo slot è sul lato inferiore del modulo, quindi inserisca la scheda prima di avviare l'installer. |
| **nv_boot_control.conf / TNSPEC** | Il file sul dispositivo `/etc/nv_boot_control.conf`, che registra la configurazione della scheda come stringa TNSPEC. Il personale NVIDIA nota che una configurazione Super mostra un suffisso `-super`, per esempio `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; se il suffisso manca, le modalità di alimentazione superiori non sono disponibili. Dopo un'installazione da ISO, NVIDIA indica questa voce TNSPEC come riferimento per le informazioni corrette sulla scheda. |
| **NVMe** | Un SSD sul bus PCIe, installato in uno degli slot M.2 Key-M della scheda carrier: formato 2280 (PCIe 3.0 x4) o 2230 (PCIe 3.0 x2). Un SSD NVMe può ospitare il sistema ed è raccomandato quando servono più capacità e prestazioni di archiviazione migliori. |
| **nvpmodel** | Lo strumento per le modalità di alimentazione del kit. Esegua `sudo /usr/sbin/nvpmodel -q` per elencare le modalità disponibili sul suo sistema e `sudo /usr/sbin/nvpmodel -m <mode_id>` per cambiare modalità. Le stesse modalità sono nel menu Power Mode del desktop. |
| **oem-config** | La procedura guidata di configurazione al primo avvio: accordo di licenza, lingua e tastiera, rete, e nome utente e password iniziali. Viene eseguita una volta, dopo il primo avvio del sistema installato. |
| **QSPI** | La piccola memoria flash NOR del kit che contiene il firmware di avvio UEFI. JetPack 7.2 e successivi richiedono firmware QSPI della generazione JetPack 6.x (più recente della versione 36.0); con firmware più vecchio l'installer può fallire o il kit può avviarsi su uno schermo nero. Vedere [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | Lo strumento per PC host di NVIDIA per flashare il BSP e installare i componenti JetPack via USB. L'host documentato è un PC x86 con Ubuntu. È l'alternativa al metodo Jetson ISO sul dispositivo. |
| **SO-DIMM** | Il formato del connettore del modulo: un SO-DIMM a 260 pin, 69,6 mm x 45 mm. Il modulo si inserisce nello zoccolo SO-DIMM della scheda carrier, e lo stesso zoccolo accetta anche un modulo Jetson Orin NX. |
| **Super Mode** | La configurazione software di alimentazione e clock di NVIDIA per l'Orin Nano — non hardware diverso. I kit esistenti ottengono il boost "Super" con un aggiornamento software JetPack, e su questo kit le modalità di alimentazione superiori compaiono solo se il kit è stato flashato con la configurazione Super. |
| **TensorRT** | L'ottimizzatore e runtime di inferenza di NVIDIA. Compila un modello addestrato in un engine TensorRT — un file specifico per dispositivo, costruito per la GPU di destinazione — ed esegue quell'engine in modo efficiente. JetPack 7.2.1 include TensorRT 10.16.2. |
| **TOPS** | Mille miliardi (tera) di operazioni al secondo, l'unità comune per il throughput di IA. Questo kit è valutato fino a 67 TOPS INT8 sparse (33 INT8 dense). NVIDIA pubblica sia un valore sparse sia uno dense per lo stesso modulo. |
| **UEFI** | Il firmware di avvio del kit e il suo menu di configurazione. Prema Esc mentre è mostrata la schermata di avvio NVIDIA per entrare nella configurazione; nel menu, Boot Manager è dove si seleziona la chiavetta USB dell'installer come dispositivo di avvio. La versione del firmware è visualizzata lì, e JetPack 7.2 e successivi richiedono una versione più recente della 36.0. |
| **unified memory** | L'unico pool di memoria LPDDR5 da 8 GB condiviso da CPU e GPU — il kit non ha memoria video separata. Circa 7,6 GB sono utilizzabili dopo le riserve di firmware e kernel, e il sistema operativo, i suoi modelli e le loro cache KV attingono tutti da questo unico pool. Vedere [Efficienza della memoria](/it/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface: la libreria di NVIDIA per l'elaborazione delle immagini accelerata via hardware su Jetson. JetPack 7.2.1 include VPI 4.1.4. |

## Mappa delle versioni

La mappatura delle versioni più utile da ricordare:

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (attuale) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (ultima release JetPack 6) | r36.5.2 | 22.04 | 5.15 | 12.6 |

Per verificare cosa esegue effettivamente un sistema specifico:
`cat /etc/nv_tegra_release`
(vedere [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system)).

## Fonti

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificato il 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ la sua tabella dei componenti è disallineata riga per riga (le righe VPI e PVA riportano ancora i valori di JetPack 7.2); per le versioni dei componenti usi invece il [repository dei pacchetti di NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (verificato il 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificato il 2026-09-26)
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (verificato il 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificato il 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificato il 2026-09-26)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (verificato il 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificato il 2026-09-26)
- [NVIDIA forum — "25W and MAXN_SUPER not seen in JetPack 7.2" (risposta del personale NVIDIA)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11. Definizioni compilate
dalla documentazione NVIDIA e dall'uso standard del settore; i numeri di
versione sono stati verificati alle date indicate. Non verificato su hardware
fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
