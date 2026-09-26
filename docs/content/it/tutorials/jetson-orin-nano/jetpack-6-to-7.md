---
title: Migrazione da JetPack 6.x a JetPack 7.2.1
sidebar_label: Migrare da JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Cosa cambia tra JetPack 6.x e JetPack 7.2.1 sul Jetson Orin Nano
  Super Developer Kit (8GB): il prerequisito firmware, la trappola della
  modalità Super, la checklist di migrazione e il rollback.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Migrazione da JetPack 6.x a JetPack 7.2.1

Questa pagina è rivolta ai proprietari di un kit di sviluppo Jetson Orin Nano
(Super) che passano da JetPack 6.x a JetPack 7.2.1. Kit nuovi: iniziare invece
da [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start).

JetPack 7.2.1 è un salto importante: pianifichi un flash completo, un
prerequisito firmware e alcune ricompilazioni software.

## Cosa cambia

| Livello | Periodo JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| Sistema operativo / file system di root | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel Linux | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Nota di Juxi:** La colonna 6.x usa JetPack 6.2.3, l'ultima release di
> produzione di JetPack 6. Verifichi le sue versioni attuali con `cat /etc/nv_tegra_release`.
> Il valore VPI della 7.2.1 è tratto dal repository dei pacchetti di NVIDIA anziché
> dalla sua pagina di download, che mostra ancora il valore di JetPack 7.2 — vedere
> la nota in [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system).

- **Niente più immagini per scheda SD.** "A partire da JetPack 7.2, le immagini
  per scheda SD non sono più supportate". L'installer è un'unica ISO per
  chiavetta USB; una scheda microSD resta un target di installazione valido.
- **Un prerequisito firmware.** Le installazioni JetPack 7.2 e successive
  richiedono firmware UEFI/QSPI Jetson della generazione JetPack 6.x; i kit con
  firmware di fabbrica più vecchio devono completare prima il percorso di aggiornamento di
  JetPack 6.x. JetPack 7.0 e 7.1 non elencano hardware Orin, quindi 7.2 è la
  prima release 7.x per la famiglia.
- **Un flusso di installazione diverso.** La ISO installa da una chiavetta USB
  su microSD o NVMe del dispositivo. È solo per l'installazione, non una "live
  USB".

## Non aggiornare ancora se...

- **Il suo robot dipende da Isaac ROS.** La matrice dei componenti di 7.2.1
  elenca Isaac ROS come "Coming soon", ma il personale NVIDIA afferma che
  Isaac ROS 4.6 supporta JetPack 7.2 — le fonti sono in disaccordo. Vedere
  [Robotica](/it/tutorials/jetson-orin-nano/robotics).
- **Il suo codice per fotocamera è vincolato alla vecchia API SIPL.** L'API
  SIPL v2.0.0 in Jetson Linux 39.2.1 introduce "breaking changes che
  interessano API, ABI, schema JSON, layout dei pacchetti e caricamento dei
  driver". Una segnalazione della community (non confermata da NVIDIA) dice che
  la configurazione NITO per fotocamera è ora quella predefinita e la modalità
  legacy `NVCAMERA_NITO_PATH=CONFIG` non funziona più.
- **Non può rivalidare il suo stack.** Le wheel CUDA 13, i pacchetti Python e
  le librerie di terze parti devono esistere per Ubuntu 24.04 e CUDA 13.2. Le
  pagine NVIDIA di 7.2.1 non elencano versioni di Python o OpenCV; per le wheel
  CUDA 13.2 il personale NVIDIA indica l'indice SBSA di Jetson AI Lab — vedere
  [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm).

## Cosa non può essere trasferito — pianificare la ricompilazione

- **Engine TensorRT.** TensorRT passa da 10.3.0 a 10.16.2. Gli engine
  serializzati sono legati alla versione di TensorRT. Li ricostruisca sul
  target.
- **Binari CUDA.** CUDA passa da 12.6 a 13.2.2, un salto importante. Non si
  aspetti che i binari CUDA 12.x vengano riutilizzati; ricompili con il nuovo
  toolkit.
- **Moduli kernel out-of-tree.** Il kernel passa da 5.15 a 6.8.
  Ricompili i moduli con i nuovi header del kernel.
- **Driver delle fotocamere e device tree.** Si applicano le modifiche API e
  ABI di SIPL 2.0 (vedere sopra).
- **Container.** Le immagini costruite per JetPack 6 / L4T r36 restano sullo
  stack vecchio; la ISO include NVIDIA Container Toolkit 1.19. Il personale
  NVIDIA afferma che Orin Nano può ora eseguire i container Arm64 mainstream
  "arm64-SBSA".
- **Ambienti Python.** Ubuntu 24.04 usa un Python più recente della 22.04.
  Ricrei gli ambienti virtuali; controlli `python3 --version`.

## Checklist di migrazione

1. **Prima esegua un backup.** L'installazione cancella l'archiviazione di
   destinazione selezionata. Copi fuori dal kit: dati delle applicazioni, file
   di configurazione, calibrazione delle fotocamere, volumi dei container,
   script di build TensorRT e modelli ONNX, e sorgenti di driver o device tree
   personalizzati. Registri le versioni con
   `cat /etc/nv_tegra_release` e `apt list --installed | grep nvidia-jetpack`.
2. **Superi il requisito firmware.** Accenda il kit, prema ripetutamente Esc
   alla schermata di avvio NVIDIA e legga la versione del firmware nel menu
   UEFI. Un firmware 36.x o successivo è pronto per la 7.2.1. Se è precedente
   alla 36.0, completi prima il "JetPack 6.x Update Path": avvii come ponte
   l'immagine aggiornata per scheda SD di JetPack 5.1.3
   (`JP513-orin-nano-sd-card-image_b29.zip`), lasci che pianifichi
   l'aggiornamento del bootloader, riavvii, installi l'updater QSPI
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`), riavvii di
   nuovo. Preveda diversi riavvii; JetPack 6.2.x può pianificare un ulteriore
   aggiornamento dopo il primo avvio. Le unità su BSP 36.2 / JetPack 5.0 DP
   devono prima passare a una release successiva. Controlli la pianificazione
   con `sudo systemctl status nv-l4t-bootloader-config` e il firmware con
   `sudo nvbootctrl dump-slots-info`.
3. **Crei la chiavetta USB di installazione.** Scriva la Jetson ISO r39.2.1 su
   una chiavetta USB (da 16 GB o più) con Balena Etcher. Non scriva la ISO su
   una scheda microSD. Installi l'archiviazione di destinazione (microSD o
   NVMe) prima di avviare — l'installer offre solo i dispositivi già
   installati.
4. **Installi JetPack 7.2.1.** Si avvii tramite l'UEFI Boot Manager: prema Esc
   alla schermata di avvio, selezioni Boot Manager, selezioni il disco USB
   (NVIDIA raccomanda questa selezione esplicita).

   > **Importante** — Prema **Y** alla richiesta di aggiornamento della capsula QSPI
   > entro 30 secondi ("il passaggio più comunemente mancato"). Se scade,
   > l'installazione fallisce più tardi. L'aggiornamento della capsula viene eseguito
   > in due passaggi e può riavviare il kit — è previsto.

   Al menu GRUB selezioni Install Jetson ISO r39.2.1, selezioni l'archiviazione
   di destinazione e confermi (l'installazione cancella l'archiviazione
   selezionata). Rimuova la chiavetta USB al termine dell'installazione quando
   richiesto, poi completi la configurazione iniziale di Ubuntu (licenza,
   lingua, rete, utente) ed esegua `sudo apt update` e
   `sudo apt install nvidia-jetpack`.
5. **Confermi il profilo Super.** `sudo /usr/sbin/nvpmodel -q` elenca le
   modalità di alimentazione; sul desktop usi la barra superiore: Power Mode,
   MAXN SUPER. Con la modalità Super abilitata, `cat /etc/nv_boot_control.conf`
   mostra un suffisso `-super` nella riga TNSPEC. Se mancano, legga la sezione
   successiva.
6. **Rivalidi i suoi carichi di lavoro.** Ricostruisca gli engine TensorRT e le
   applicazioni CUDA sul target. Ricrei gli ambienti Python, aggiorni i
   container, ritesti le fotocamere. Esegua i controlli di
   [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system) — per
   r39.2.1, `cat /etc/nv_tegra_release` deve mostrare R39, revision 2.1.

## La trappola della modalità Super (corretta in 7.2.1)

Su un'installazione da ISO 7.2.0, l'unità manteneva la configurazione di scheda
esistente: mancavano le modalità 25W e MAXN SUPER e `sudo nvpmodel -m 2`
falliva con "bad power mode 2". NVIDIA l'ha documentato nelle note di rilascio
r39.2 come problema 6279443: "Le unità non passeranno alla modalità 'Super'
dopo l'aggiornamento. Per usare la modalità 'Super', è necessario flashare il
target usando un host Linux o SDKM". Il personale NVIDIA l'ha poi definito un
bug della ISO, corretto in 7.2.1.

JetPack 7.2.1 esegue il flashing della configurazione Super per impostazione predefinita: "la
ISO ora esegue il flashing del Jetson Orin Nano Developer Kit con la configurazione di
flashing Modalità Super per impostazione predefinita". Il problema 6279443 non è
nell'elenco dei problemi noti di r39.2.1.

Restano due avvertenze:

- **Selezioni il target giusto quando flasha da un host.** In SDK Manager il
  target è "Jetson Orin Nano [8GB developer kit version]". Con lo script di
  flashing usi il target `jetson-orin-nano-devkit-super`, non quello semplice,
  per abilitare le modalità Super. Esempio (Developer Guide, NVMe):
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **Reinstallare 7.2.1 su un sistema esistente.** NVIDIA: "Se reinstalla
  JetPack 7.2.1 da ISO su un sistema già installato, segua attentamente le
  istruzioni della Getting Started Guide". NVIDIA non dichiara se una
  reinstallazione 7.2.1 ripristini la modalità Super su un'unità lasciata in
  non-Super da una ISO 7.2.0; il percorso documentato è un flash da host con la
  configurazione Super. Le correzioni in-place della community (modifica di
  `/etc/nv_boot_control.conf`) non sono approvate da NVIDIA; un utente ha
  segnalato un boot loop. Vedere [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

## Rollback

Il personale NVIDIA dichiara: "Downgrade: sì, se necessario può tornare a
JP 6.2.2 tramite SDK Manager". Un utente ha confermato il percorso completo
(riflash a 6.2.2, poi nuovo aggiornamento a 7.2). Il costo, dichiarato
onestamente:

- **Nessun downgrade in-place.** È un flash completo da un host Ubuntu x86 (le
  pagine ufficiali elencano host Ubuntu; il personale NVIDIA segnala anche che
  Windows SDK Manager funziona).
- **L'archiviazione di destinazione viene cancellata.** Il suo backup è l'unica
  copia.
- **Nulla di più è garantito.** NVIDIA non pubblica alcuna procedura di
  downgrade e nessun documento afferma che i supporti di avvio JetPack 6.x
  funzionino garantito con il firmware QSPI r39.2.x. Consideri un downgrade
  come una reinstallazione del vecchio stack, con lo stesso lavoro di
  ricompilazione.

Se mancano solo le modalità di alimentazione Super, la correzione più mirata è
un flash da host con la configurazione Super — mantiene la 7.x. Vedere
[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).

## Fonti

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — matrice dei componenti, rimozione delle immagini SD, Modalità Super predefinita, avvertenza sulla reinstallazione (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — flusso di installazione ISO, requisito firmware, richiesta della capsula, MAXN SUPER (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — ponte firmware, controlli di versione (verificato il 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — stato GA, breaking changes di SIPL 2.0 (verificato il 2026-09-26)
- [Jetson Linux 39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — problema 6279443, la trappola della modalità Super (verificato il 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — versioni di base di JetPack 6.x (verificato il 2026-09-26)
- [NVIDIA developer forum — JetPack 7.2 GPU acceleration issue](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — personale NVIDIA: percorso di downgrade e indice wheel CUDA 13.2 (verificato il 2026-09-26)
- [NVIDIA developer forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — personale NVIDIA e utenti: verifica del TNSPEC `-super`, flash da host (verificato il 2026-09-26)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione
ufficiale di NVIDIA e su dichiarazioni del forum degli sviluppatori alle date
indicate; non ancora verificato su hardware fisico da Juxi Technology. L'elenco
delle ricompilazioni descrive le conseguenze standard della piattaforma — da
validare rispetto al proprio stack.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
