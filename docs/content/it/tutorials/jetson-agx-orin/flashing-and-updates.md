---
title: Flashing e aggiornamenti — Opzioni di installazione del BSP
sidebar_label: Flashing e aggiornamenti
slug: /getting-started/flashing-and-updates
description: >-
  I tre metodi ufficiali per installare o aggiornare il BSP sul kit di sviluppo
  Jetson AGX Orin — Jetson ISO (consigliato), NVIDIA SDK Manager e lo script di
  flashing Linux_for_Tegra — più come entrare in modalità Force Recovery.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Flashing e aggiornamenti — Opzioni di installazione del BSP

NVIDIA supporta tre metodi ufficiali per installare o aggiornare il BSP sul kit
di sviluppo. Scegliere in base alla situazione:

| | 💾 Avviare con eMMC | 🛠️ SDK Manager | 📜 Script di flashing |
|---|---|---|---|
| In breve | Avviare dalla eMMC preflashata, aggiornare con Jetson ISO | Strumento grafico su un PC host; esegue il flashing del BSP e può installare i pacchetti JetPack | Script `flash.sh` su un PC host |
| PC host Ubuntu | **Non richiesto** | Richiesto | Richiesto |
| Tempo tipico | Primo avvio immediato; aggiornamento ISO ~15 min | ~30 min per il flashing | Dipende dalla configurazione |
| A chi è rivolta | Tutti (impostazione predefinita consigliata) | Chiunque abbia un PC Ubuntu; necessario per il flashing su NVMe/microSD/USB o quando il kit non ha accesso a internet | Sviluppatori di prodotto, utenti avanzati |

> **Nota di Juxi:** la versione attuale è **JetPack 7.2.1 (L4T r39.2.1)**. Se il
> kit è nuovo, iniziare da **[Avvio rapido](/it/tutorials/jetson-agx-orin/quick-start)** — descrive
> dall'inizio alla fine il percorso consigliato.

## Opzione 1 — Avviare con eMMC, aggiornare con Jetson ISO (consigliata)

Il kit di sviluppo viene fornito con un BSP L4T preflashato sulla eMMC e si
avvia sul desktop Ubuntu fin da subito. Il percorso di aggiornamento consigliato
è la **Jetson ISO** — una chiavetta USB avviabile che aggiorna il kit **senza
PC host Ubuntu**.

**Prerequisito:** il BSP installato deve essere **L4T r35.5 o successivo**
(verificare con `cat /etc/nv_tegra_release`). I kit più vecchi richiedono prima
un metodo tramite PC host (opzione 2 o 3 sotto).

La procedura completa passo per passo (creazione della chiavetta USB con Balena
Etcher, avvio UEFI, richiesta della capsula QSPI, menu GRUB, selezione
dell'archiviazione, primo avvio) si trova in
**[Avvio rapido → Passo 2](/it/tutorials/jetson-agx-orin/quick-start)**.

Punti salienti dalla documentazione NVIDIA:

- Nel menu GRUB si sceglie la destinazione dell'installazione: **eMMC** o **NVMe** (consigliato se è stato installato un SSD).
- Se richiesto, confermare l'**aggiornamento della capsula QSPI** con `Y` — è necessario per la compatibilità e viene eseguito due volte. Saltarlo causa problemi di installazione (compare anche nelle note di rilascio di L4T come problema noto 6266271).
- La reinstallazione su un sistema che esegue già JetPack 7.2.1 è supportata — seguire con attenzione le istruzioni ufficiali.

## Opzione 2 — NVIDIA SDK Manager (PC host)

Scegliere SDK Manager quando si desidera:

- eseguire il flashing del BSP L4T di base su un **supporto di archiviazione diverso** dalla eMMC (SSD NVMe, unità USB o scheda microSD), oppure
- eseguire il flashing di un kit che **non può essere collegato direttamente a internet**.

**Requisiti del PC host** (secondo la documentazione di NVIDIA SDK Manager):
Ubuntu Desktop **20.04 o 22.04** su x86_64, 8 GB di memoria di sistema, 25 GB di
spazio libero su disco e un'**iscrizione al NVIDIA Developer Program** (gratuita)
per scaricare lo strumento e accedere. Nota: le note di rilascio di L4T 39.2
indicano come distribuzione Linux host per il flashing Ubuntu **24.04 e 22.04** —
consultare la pagina dei requisiti di sistema di NVIDIA SDK Manager per l'elenco
aggiornato, poiché questo aspetto cambia spesso.

**Installazione e accesso:**

1. Scaricare il pacchetto `.deb` di SDK Manager da NVIDIA e installarlo:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Avviarlo con `sdkmanager`, fare clic sulla scheda **NVIDIA DEVELOPER** e accedere.

**Preparazione dell'hardware e modalità Force Recovery:**

1. Collegare il kit al PC host con il cavo USB-A↔USB-C in dotazione, inserito nella **porta USB-C accanto al connettore a 40 pin** (contrassegnata come porta 10 / J40).
2. Mentre si **tiene premuto il pulsante centrale Force Recovery** (pulsante 2, tra Power e Reset), inserire l'alimentatore USB-C nella porta USB-C sopra il connettore DC. Il kit si accende in **modalità Force Recovery**.
3. Sull'host, SDK Manager dovrebbe rilevare il kit. *(In caso contrario, vedere [Risoluzione dei problemi](/it/tutorials/jetson-agx-orin/troubleshooting).)*

**Passaggi di flashing in SDK Manager** (riepilogo — seguire le istruzioni sullo schermo):

1. **Passo 01:** selezionare **Jetson** come categoria di prodotto, deselezionare "Host Machine", selezionare il modulo **Jetson AGX Orin** e continuare.
2. **Passo 02:** per un BSP di base, selezionare solo **Jetson OS** (deselezionare "Jetson SDK Components"). Accettare la licenza.
3. **Passo 03:** inserire la propria password di sudo; attendere il completamento del download. Nella finestra di dialogo di flashing scegliere **"Manual Setup – Jetson AGX Orin"**, ignorare la configurazione OEM, selezionare lo **Storage Device** di destinazione del flashing e fare clic su **Flash**.
4. Al termine del flashing, il kit si riavvia con il nuovo BSP. Completare l'`oem-config` di Ubuntu, quindi installare i componenti JetPack (vedere [Avvio rapido → Passo 3](/it/tutorials/jetson-agx-orin/quick-start)).

## Opzione 3 — Script di flashing Linux_for_Tegra

Per utenti avanzati e sviluppatori di prodotto: gli script `flash.sh` (o initrd
flash) del pacchetto Jetson Linux eseguono il flashing di un dispositivo Jetson
da un PC host. Consultare la sezione **Flashing Support** della
[Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Dati su host e toolchain dalle note di rilascio di L4T 39.2: distribuzione Linux
host per il flashing — Ubuntu 24.04 / 22.04; toolchain di compilazione
incrociata — GCC 13.2; tag di rilascio del codice sorgente — `jetson_39.2_GA`.

## Modalità Force Recovery — come accedervi

Stessa procedura di cui sopra; per eseguirla non è necessario alcun host:

1. Con il kit spento e il cavo dati USB-C collegato a un host (se necessario),
2. **tenere premuto il pulsante centrale Force Recovery**, quindi collegare l'alimentatore USB-C — il kit si avvia in modalità Force Recovery.

Per uscire dalla modalità di recupero, spegnere e riaccendere il kit oppure
riavviarlo. Sull'host, la modalità di recupero in genere è visibile come
dispositivo USB NVIDIA (`lsusb`).

## Dopo il flashing

Verificare il risultato: **[Verifica del sistema](/it/tutorials/jetson-agx-orin/verify-your-system)** — controlli
di versione per L4T, CUDA e l'intero stack di componenti JetPack.

## Fonti

- [BSP Installation — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (verificato il 2026-09-23)
- [Quick Start — stessa guida](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificato il 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione
ufficiale NVIDIA alla data indicata; non ancora verificato su hardware fisico da
Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
