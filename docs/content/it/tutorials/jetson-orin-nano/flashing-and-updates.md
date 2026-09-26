---
title: Flashing e aggiornamenti — Opzioni di installazione del BSP
sidebar_label: Flashing e aggiornamenti
slug: /getting-started/flashing-and-updates
description: >-
  I tre metodi ufficiali per installare o aggiornare il BSP sul kit di sviluppo
  Jetson Orin Nano Super — Jetson ISO (consigliato), NVIDIA SDK Manager e lo
  script di flashing Linux_for_Tegra — più la scelta dell'archiviazione, il
  percorso di aggiornamento firmware JetPack 6.x per i kit più vecchi e la
  Modalità Force Recovery.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# Flashing e aggiornamenti — Opzioni di installazione del BSP

NVIDIA supporta tre metodi ufficiali per installare o aggiornare il BSP (Jetson Linux) sul kit
di sviluppo Jetson Orin Nano Super. Due fatti hardware li condizionano tutti: **nella confezione
non c'è archiviazione** (né eMMC, né scheda microSD, né SSD), e JetPack 7.2 **ha rimosso le
immagini per scheda SD** — la ISO unificata su chiavetta USB le sostituisce, mentre la scheda
microSD resta una valida destinazione di installazione.

| | Jetson ISO (consigliato) | NVIDIA SDK Manager | Script di flashing Linux_for_Tegra |
|---|---|---|---|
| In breve | Avvii il kit da un installer USB creato su un PC qualsiasi; scegli la destinazione di archiviazione sul kit | Strumento grafico su un PC host; esegue il flashing del BSP sulla destinazione scelta via USB-C | Strumenti di flashing a riga di comando su un PC host; controllo diretto della destinazione |
| PC host Ubuntu | Non richiesto | Richiesto (x86_64) | Richiesto (x86_64) |
| Tempo tipico | Non pubblicato; l'installer mostra output "per diversi minuti" | Non pubblicato; il PC host scarica prima il BSP e il root file system | Dipende dalla configurazione |
| A chi è rivolto | Prima configurazione su un kit nuovo; la maggior parte degli utenti | Utenti con un PC Ubuntu; il percorso preferito da NVIDIA per il flashing diretto su un SSD NVMe; usato anche per gli aggiornamenti firmware | Utenti avanzati e sviluppatori di prodotto |

NVIDIA non pubblica tempi di installazione; le segnalazioni sul forum vanno da circa 15 minuti a due ore
(non confermato).

> **Nota di Juxi:** la release attuale è **JetPack 7.2.1 (L4T r39.2.1)**. Su un kit nuovo, inizi
> da **[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)** — descrive dall'inizio alla fine il percorso ISO
> consigliato. Torni qui per confrontare i percorsi, scegliere l'archiviazione o aggiornare un kit più vecchio.

## Opzione 1 — Jetson ISO (consigliato)

La Jetson ISO è il percorso consigliato da NVIDIA per la prima configurazione e l'unico che non
richiede un PC host Ubuntu: scriva un unico file ISO su una chiavetta USB da un computer qualsiasi, avvii
il kit dalla chiavetta e installi sull'archiviazione che ha preparato. Procuri questi elementi:

- **Destinazione di archiviazione** (il kit non ne ha; vedere la sezione sull'archiviazione sotto): una **scheda microSD, 64 GB
  UHS-1 o superiore (consigliata)**, inserita nello slot sul **lato inferiore del modulo**
  prima di avviare l'installer, oppure un **SSD NVMe** (facoltativo; consigliato per maggiore capacità e
  prestazioni di archiviazione migliori).
- **Una chiavetta USB, 16 GB o superiore** — diventerà il supporto di installazione.
- **Un laptop o PC (Windows, Mac o Linux) con almeno 25 GB liberi**, per scrivere la ISO.
- **Un monitor DisplayPort e una tastiera USB** (o un cavo seriale USB-TTL per la configurazione headless;
  HDMI non è supportato), più l'alimentatore da 19 V in dotazione.

Due avvertenze decidono il successo: il firmware deve essere della generazione JetPack 6.x — se lo schermo resta
nero o compare una shell UEFI, esegua prima il percorso di aggiornamento JetPack 6.x qui sotto — e alla richiesta della capsula
QSPI prema `Y` entro 30 secondi; una richiesta scaduta fa fallire l'installazione più tardi, quindi
riavvii l'installazione e prema `Y`.

> **Importante** — scriva la ISO sulla **chiavetta USB, non su una scheda microSD** ("Non flashare la Jetson ISO
> su una scheda microSD"). L'installazione inoltre **cancella la destinazione di archiviazione selezionata**;
> confermi quale dispositivo ha selezionato prima di iniziare.

La procedura completa passo per passo — download della ISO, Balena Etcher, UEFI Boot Manager, menu GRUB,
selezione dell'archiviazione, configurazione di Ubuntu al primo avvio — è in **[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)**. La
chiavetta di installazione **non è una "Live USB"** (esegue solo l'installazione), quindi la rimuova dopo l'installazione quando
richiesto.

## Opzione 2 — NVIDIA SDK Manager (PC host)

SDK Manager è il percorso con PC host: esegue il flashing del BSP via USB-C e può anche aggiornare il firmware del kit
(vedere la sezione sul percorso di aggiornamento sotto).

**Requisiti del PC host** (secondo la pagina BSP Setup del kit): un **PC x86 con Ubuntu 22.04 o
Ubuntu 20.04**; **accesso a Internet e un account gratuito NVIDIA Developer Program**; un **cavo USB**
per la porta USB-C del kit più "un jumper o una graffetta metallica"; e un display o un cavo seriale USB-TTL
per il kit.

> **Nota di Juxi:** le fonti di NVIDIA non concordano. La pagina di configurazione del kit elenca Ubuntu 22.04 o 20.04;
> le note di rilascio di L4T r39.2.1 elencano "Ubuntu 24.04 e 22.04" come distribuzione host per
> il flashing. Controlli i requisiti di SDK Manager di NVIDIA prima di preparare un PC host.

**Installi SDK Manager sul PC host.** La pagina di configurazione di NVIDIA fornisce i comandi esatti per Ubuntu
22.04 e 20.04; lo avvii con `sdkmanager`, poi acceda con le Sue credenziali NVIDIA Developer
(si apre una finestra del browser; può comparire l'autenticazione a due fattori).

**Esegua il flashing del BSP** (riepilogo; segua le istruzioni a schermo). SDK Manager esegue il flashing via USB, quindi
metta prima il kit in Modalità Force Recovery (vedere sotto):

1. Selezioni **Jetson Orin Nano [8GB developer kit version]** e clicchi **OK**; deselezioni **Host
   Machine** così resta selezionato solo il target Jetson; clicchi **Continue**; al passo successivo tenga selezionato solo **Jetson
   Linux**; accetti la licenza e inserisca la password sudo del PC host.
2. Alla richiesta di flashing (SDK Manager scarica prima i pacchetti): selezioni **Runtime for OEM
   Configuration**; selezioni **NVMe** o **SD Card** come archiviazione; clicchi **Flash**.
3. Al termine del flashing, rimuova il jumper dall'header J14, spenga e riaccenda il kit, e
   completi la configurazione iniziale di Ubuntu (oem-config).

> **Nota di Juxi — lo SKU del modulo:** questo kit contiene il modulo **P3767-0005**, che NVIDIA
> documenta come "Jetson Orin Nano 8GB (P3767-0005, for development only)". Il modulo Orin Nano 8GB
> commerciale è **P3767-0003** — uno SKU separato, non parte di questo kit. Usi la voce di destinazione
> che NVIDIA indica per questo kit: **Jetson Orin Nano [8GB developer kit version]**.

## Opzione 3 — Script di flashing Linux_for_Tegra

Per utenti avanzati e sviluppatori di prodotto: flashing a riga di comando con il Driver Package di Jetson Linux.
Dalla pagina di configurazione di NVIDIA: scarichi il Driver Package e il root file system di esempio
per la Sua release JetPack; estragga il Driver Package su un host Ubuntu x86_64; estragga il
root file system di esempio in `Linux_for_Tegra/rootfs` ed esegua `apply_binaries.sh` da
`Linux_for_Tegra`; metta il kit in Modalità Force Recovery (sotto); poi esegua il comando di flashing
appropriato per il target Jetson Orin Nano Developer Kit. I nomi dei target e i comandi
dettagliati sono nella Jetson Linux Developer Guide.

- I nomi dei target del kit sono `jetson-orin-nano-devkit` e `jetson-orin-nano-devkit-super`;
  NVIDIA nota che la configurazione Super ha "un budget di potenza più alto e passi di frequenza
  estesi".
- L'esempio della Developer Guide per questo kit — NVMe con la configurazione Super:
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`
  (l'opzione `--erase-all` cancella i dati sulla destinazione di archiviazione).
- Dalle note di rilascio di L4T r39.2.1: host di flashing — Ubuntu 24.04 / 22.04; toolchain —
  GCC 13.2; tag sorgente — `jetson_39.2.1_GA`. Dalla pagina JetPack Downloads: pacchetto BSP —
  `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## Scegliere la destinazione di archiviazione: microSD o SSD NVMe

L'installer propone solo l'archiviazione **già collegata** al momento dell'avvio. Decida prima,
installi l'archiviazione, poi avvii l'installer.

| | Scheda microSD | SSD NVMe |
|---|---|---|
| Specifiche | 64 GB UHS-1 o superiore, consigliata | Un'unità NVMe PCIe in uno slot M.2 Key-M |
| Dove va | Slot sul **lato inferiore del modulo** | Slot M.2 Key-M 2280 (PCIe 3.0 x4) o slot 2230 (PCIe 3.0 x2) |
| Perché sceglierla | L'archiviazione predefinita del modulo; l'opzione più semplice ed economica | Più capacità e prestazioni di archiviazione migliori; consigliato per modelli di IA, container, dataset e file di progetto |

**microSD è ancora una valida destinazione di installazione.** JetPack 7.2 ha rimosso il *file immagine* per
scheda SD — non la *destinazione* microSD: con il flusso ISO, avvii l'installer USB con la scheda inserita e
la selezioni (anche SDK Manager può eseguire il flashing di una scheda microSD dal PC host). Lo slot microSD si trova sul
**lato inferiore del modulo**. Ogni percorso di installazione **cancella la destinazione di archiviazione selezionata**,
quindi non selezioni un'unità con dati che le servono. Se l'installer non propone la Sua unità NVMe, vedere la
**[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**; per consigli sull'acquisto, vedere le
**[FAQ](/it/tutorials/jetson-orin-nano/faq)**.

## Kit più vecchi: il percorso di aggiornamento JetPack 6.x

**Quando serve:** JetPack 7.2 e successivi richiedono firmware UEFI/QSPI della generazione JetPack 6.x.
La regola di NVIDIA: firmware **36.x o successivo** — il kit è pronto; **più vecchio di 36.0** — completi prima
questo percorso (controlli la versione al menu UEFI; passi in [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)). Due
percorsi ufficiali: il **flusso ponte con microSD** (sotto) richiede una scheda microSD ma nessun PC host Ubuntu;
**SDK Manager** (Opzione 2) richiede un PC host Ubuntu ed è l'alternativa indicata da NVIDIA per
l'aggiornamento firmware/QSPI.

Il flusso ponte, nell'ordine documentato da NVIDIA:

1. Scriva l'**immagine ponte JetPack 5.1.3** (`JP513-orin-nano-sd-card-image_b29.zip` — usi l'immagine
   aggiornata) su una scheda microSD, avvii il kit da essa, completi la configurazione iniziale di Ubuntu
   e colleghi il kit a Internet.
2. Un servizio in background pianifica poi un aggiornamento del bootloader (può comparire una notifica sul desktop).
   Confermi con `sudo systemctl status nv-l4t-bootloader-config` — "Una esecuzione di pianificazione completata
   mostra il servizio come inattivo con stato di uscita riuscito."

   ![Notifica di aggiornamento del bootloader sul desktop Jetson Linux](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. Riavvii; l'aggiornamento del firmware viene eseguito durante l'avvio. Controlli lo stato in seguito con
   `sudo nvbootctrl dump-slots-info` — l'output di esempio di NVIDIA a questo stadio è "Current
   version: 35.5.0".

   ![Avanzamento dell'aggiornamento firmware dal firmware JetPack 6.x](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. Installi l'updater QSPI: `sudo apt update`, poi
   `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`; riavvii e lasci completare l'aggiornamento.
5. Il firmware è ora pronto per la generazione JetPack 6.x, e la scheda 5.1.3 non è più il
   supporto di avvio di destinazione. Spenga il kit, poi esegua l'installazione di JetPack 7.2.1 dall'installer USB (vedere
   [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)).

Note aggiuntive: passando per JetPack 6.2.x può essere pianificato **un altro** aggiornamento firmware UEFI
dopo il primo avvio — riavvii di nuovo quando richiesto. Dalle note di rilascio di r39.2.1 (problema noto
6379600), l'aggiornamento della capsula durante un'installazione da ISO non supporta le unità della release **BSP 36.2 /
JetPack 5.0 DP** — aggiorni prima quelle unità a una release successiva.

## Modalità Force Recovery — come entrarvi

La Modalità Force Recovery (RCM) è lo stato che serve a un PC host per il flashing. NVIDIA documenta tre
modi:

1. **Da un terminale su un sistema in esecuzione:** `sudo reboot --force forced-recovery`.
2. **Kit spento:** colleghi il pin 9 e il pin 10 dell'header dei pulsanti (la pagina di configurazione lo chiama
   header J14), poi inserisca l'alimentazione DC per accendere.
3. **Kit già acceso:** colleghi i pin 9 e 10, poi colleghi temporaneamente i pin 7 e 8 per
   resettare il sistema.

Dopo essere entrati in RCM, rimuova il jumper (o i jumper) quando il PC host rileva il dispositivo. La **porta USB-C**
veicola la connessione di flashing (funziona come modalità USB Recovery) e, sul PC host, `lsusb`
deve mostrare un dispositivo USB NVIDIA prima di iniziare il flashing.

## Reinstallazione e aggiornamento

**Aggiorni i componenti JetPack sul kit in esecuzione** con `sudo apt update`, poi
`sudo apt install nvidia-jetpack` — vedere [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start).

**Reinstalli il BSP (stessa release JetPack o successiva).** Esegua di nuovo uno qualsiasi dei tre percorsi; il flusso ISO
è l'opzione on-device. L'avvertenza di NVIDIA per le reinstallazioni da ISO: "Se reinstalli JetPack
7.2.1 usando la ISO su un sistema già installato, segui attentamente le istruzioni della
Getting Started Guide." La reinstallazione **cancella la destinazione di archiviazione** (faccia prima un backup), e se
compare la richiesta della capsula QSPI, prema `Y` entro 30 secondi. Rimuova l'installer USB quando ha finito, così
il kit avvia il nuovo sistema.

**Modalità Super dopo una reinstallazione.** La ISO 7.2.1 "esegue il flashing del Jetson Orin Nano Developer Kit
con la configurazione di flashing Modalità Super per impostazione predefinita". Nella release 7.2 precedente, un kit aggiornato
via ISO manteneva il suo profilo precedente e poteva ritrovarsi senza le modalità 25 W / MAXN SUPER (problema noto
6279443 di r39.2; l'indicazione di NVIDIA era di eseguire il flashing da un host Linux o con SDK Manager). NVIDIA non ha
documentato se rieseguire la ISO 7.2.1 converta un'installazione non-Super esistente a Super. Se
al Suo kit mancano le modalità 25 W / MAXN SUPER, vedere la
**[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**.

**Passare tra versioni principali di JetPack.** Per l'elenco delle modifiche da JetPack 6.x a 7.2.1 e le note sul rollback,
vedere **[JetPack 6.x → 7.2.1](/it/tutorials/jetson-orin-nano/jetpack-6-to-7)**. Dopo qualsiasi installazione o
aggiornamento, verifichi il risultato: **[Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system)**.

## Fonti

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (verificato il 2026-09-26)
- [Quick Start — same guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-26)
- [JetPack 6.x Update Path — same guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificato il 2026-09-26)
- [How-To — same guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificato il 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificato il 2026-09-26)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (verificato il 2026-09-26)
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- [SDK Manager — monitor-attached installation instructions](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (verificato il 2026-09-26)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione ufficiale NVIDIA alle date
indicate; non ancora verificato su hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata da Juxi
Technology e non è una pubblicazione NVIDIA.
