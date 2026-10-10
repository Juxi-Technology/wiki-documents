---
title: Avvio rapido — Dall'unboxing a un sistema JetPack 7.2.1 funzionante
sidebar_label: Avvio rapido
slug: /getting-started/quick-start
description: >-
  Guida passo passo per il NVIDIA Jetson AGX Orin Developer Kit (64GB): primo
  avvio, aggiornamento del BSP a JetPack 7.2.1 (L4T r39.2.1) con il metodo
  Jetson ISO e installazione dei componenti JetPack.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# Avvio rapido

Questa pagina accompagna il Suo kit di sviluppo Jetson AGX Orin (64GB) dalla
confezione a un sistema **JetPack 7.2.1** completamente aggiornato. Il percorso
seguente segue il flusso di configurazione attuale consigliato da NVIDIA; ogni
passaggio è stato verificato rispetto alla documentazione ufficiale del kit di
sviluppo NVIDIA alla data indicata in fondo a questa pagina.

**Il percorso in tre passaggi:**

1. **Avvii il kit appena tolto dalla confezione** e completi la configurazione iniziale di Ubuntu (`oem-config`).
2. **Aggiorni il BSP** a L4T r39.2.1 (JetPack 7.2.1) con il metodo **Jetson ISO** — una chiavetta USB avviabile, senza PC host Ubuntu.
3. **Installi i componenti JetPack** (CUDA, cuDNN, TensorRT, ...) con un solo comando `apt`.

> **Perché un aggiornamento ISO da USB invece di SDK Manager?**
> NVIDIA consiglia ora il metodo Jetson ISO per il kit di sviluppo: aggiorna
> la scheda direttamente da una chiavetta USB e **non** richiede una macchina
> host Ubuntu separata. SDK Manager resta disponibile come alternativa (vedere
> il Passo 3b).

## Cosa serve

Nella confezione:

- Modulo Jetson AGX Orin e scheda carrier di riferimento
- Modulo Wi-Fi
- Alimentatore USB Type-C
- Cavo da USB Type-C a USB Type-A

Da procurarsi:

- Un monitor con ingresso DisplayPort e un cavo DisplayPort, più tastiera e mouse USB — **oppure** un secondo computer (Windows/Mac/Linux) se preferisce una configurazione headless
- Connessione a Internet (cavo Ethernet o Wi-Fi configurato durante la configurazione)
- Una chiavetta USB abbastanza grande per l'immagine ISO (verifichi la dimensione indicata sulla pagina di download quando ci arriva) — necessaria per l'aggiornamento ISO del Passo 2
- Un PC per scrivere la chiavetta USB di installazione (Balena Etcher funziona su Windows/Mac/Linux)

## Passo 1 — Primo avvio e configurazione iniziale di Ubuntu

Il Suo kit di sviluppo viene fornito con un'immagine BSP L4T pre-flashata su
eMMC e si avvia nel desktop Ubuntu appena tolto dalla confezione. Le unità
spedite di recente possono montare una versione L4T **più vecchia** (ad esempio
r35.x / JetPack 5.x); il Passo 2 porta qualsiasi unità alla release attuale.

Con un display collegato:

1. Colleghi un monitor DisplayPort, una tastiera e un mouse USB e (facoltativamente) un cavo Ethernet.
2. Colleghi l'alimentatore in dotazione alla **porta USB Type-C sopra il jack DC**. Il kit si accende automaticamente — il LED bianco vicino al pulsante di accensione si illumina. In caso contrario, prema il pulsante di accensione.
3. Entro circa un minuto compare la schermata di Ubuntu. Il primo avvio guida attraverso `oem-config`: accettazione della EULA del software NVIDIA, scelta di lingua/tastiera/fuso orario, creazione dell'account utente e configurazione della rete.
4. Dopo che `oem-config` è terminato, il kit si riavvia nel desktop Ubuntu.

![Desktop Ubuntu dopo la configurazione iniziale](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

La configurazione headless è possibile anche da un altro computer — vedere la
guida Quick Start di NVIDIA (link in fondo) per il cablaggio esatto.

> **Suggerimento Juxi:** Se prevede di usare il sistema da un SSD NVMe, tenga
> presente il Passo 2 — l'installer ISO può installare direttamente
> sull'unità NVMe.

## Passo 2 — Aggiornare il BSP con la Jetson ISO (consigliato)

**Prerequisito:** il BSP installato deve essere **L4T r35.5 o versione successiva**
perché il metodo ISO funzioni. Verifichi prima:

```bash
cat /etc/nv_tegra_release
```

Un sistema JetPack 7.2.1 riporta `# R39 (release), REVISION: 2.1`. Se l'output
mostra una release più vecchia, aggiorni prima a L4T r35.5 o versione successiva
(vedere le *Avvertenze* di seguito).

1. **Scarichi la Jetson ISO** per JetPack 7.2.1 / L4T r39.2.1:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **Crei la chiavetta USB di installazione.** Scriva l'ISO su una chiavetta USB con
   [Balena Etcher](https://etcher.balena.io) ("Flash from file" → selezioni la ISO
   → selezioni la chiavetta USB).
   > **Non** copi semplicemente il file ISO sull'unità con un file manager —
   > deve essere scritto come immagine disco, altrimenti non si avvierà.
3. **Inserisca la chiavetta USB** nel kit di sviluppo e lo accenda. Se non si
   avvia automaticamente dall'USB, apra l'UEFI Boot Manager durante l'avvio
   e selezioni la chiavetta USB.
4. **Avvii e installi:**
   - Se compare la richiesta di confermare un **aggiornamento capsule QSPI**, prema `Y`. Questo aggiornamento firmware viene eseguito *prima* dell'installazione ISO e viene eseguito **due volte**. Non lo salti — è necessario per la compatibilità. Se perde la richiesta, riavvii l'installazione e lo confermi quando viene richiesto.
   - Nel menu GRUB, selezioni **Install Jetson ISO r39.2.1** e prema Invio.
   - Scelga il target di archiviazione con i tasti freccia: **eMMC** (archiviazione interna predefinita) o **NVMe** (consigliato se ha installato un SSD).
   - L'installazione richiede circa 15 minuti, con l'output di testo che scorre sullo schermo.
5. **Rimuova la chiavetta USB** dopo che l'installazione è completata e il sistema si è riavviato — altrimenti il kit potrebbe avviarsi di nuovo dalla chiavetta invece che dal nuovo sistema.
6. Il sistema aggiornato avvia il suo `oem-config` di primo avvio — completi di nuovo la configurazione di Ubuntu per creare l'account utente per la nuova installazione.

### Cosa vedrà (in ordine)

![Scrittura dell'ISO su una chiavetta USB con Balena Etcher](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Scrittura della Jetson ISO su una chiavetta USB con Balena Etcher.*

![UEFI Boot Manager con la chiavetta USB selezionata](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*Se il kit non si avvia automaticamente dalla chiavetta USB, la selezioni nell'UEFI Boot Manager.*

![Richiesta di conferma dell'aggiornamento capsule QSPI](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*La richiesta di aggiornamento capsule QSPI — prema `Y`. È necessaria per la compatibilità e viene eseguita due volte.*

![Menu GRUB della Jetson ISO](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*Selezioni "Install Jetson ISO r39.2.1".*

![Opzioni del target di archiviazione nel menu GRUB](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*Scelga eMMC o NVMe come target di installazione.*

![Schermata di avanzamento dell'installer](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*L'installer viene eseguito per circa 15 minuti.*

![Schermata di benvenuto di oem-config dopo l'aggiornamento](/images/jetson-agx-orin/oem-config_welcome.png)
*Dopo l'aggiornamento, `oem-config` viene eseguito di nuovo per configurare il nuovo sistema.*

### Avvertenze e problemi noti

- **Unità più vecchie (< L4T r35.5):** il percorso Jetson ISO richiede un BSP installato r35.5 o versione successiva. Per portare prima un kit più vecchio alla versione richiesta, usi uno dei metodi con PC host (SDK Manager o lo script `flash.sh`) — vedere [Flash e aggiornamenti](/it/tutorials/jetson-agx-orin/flashing-and-updates).
- **Non ha visto la richiesta QSPI?** Riavvii l'installazione ISO e prema `Y`.
- **Schermo nero durante l'installazione:** alcuni switch KVM gestiscono male l'uscita video dell'AGX Orin durante l'installazione ISO. Colleghi il monitor direttamente al kit di sviluppo e riprovi.

## Passo 3 — Installare i componenti JetPack

### 3a. Tramite `apt` (il più semplice — nessun PC host necessario)

Sul desktop del kit, apra un terminale (`Ctrl`+`Alt`+`T`) ed esegua:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

Questo installa CUDA, cuDNN, TensorRT e il resto dello stack JetPack. Preveda
**circa un'ora** a seconda della velocità di connessione.

Verifichi il risultato: `cat /etc/nv_tegra_release` deve riportare R39 / REVISION 2.1,
e il toolkit CUDA diventa disponibile (`nvcc --version`). Vedere
[Verifica del sistema](/it/tutorials/jetson-agx-orin/verify-your-system) per la checklist completa.

### 3b. Tramite SDK Manager (alternativa)

SDK Manager installa i componenti JetPack da un PC host via USB:

1. Con il kit acceso, lo colleghi al PC host utilizzando il cavo USB da Type-C a Type-A in dotazione, inserito nella **porta USB Type-C accanto al connettore a 40 pin** del kit.
2. In SDK Manager scelga il target Jetson AGX Orin e selezioni **Jetson SDK Components** (invece di flashare di nuovo "Jetson OS"), poi segua i passaggi mostrati a schermo (connessione USB, indirizzo `192.168.55.1`).

Le istruzioni complete per SDK Manager sono mantenute da NVIDIA (vedere i link
sotto) e saranno trattate in dettaglio nella nostra guida Flash e aggiornamenti.

## Risoluzione rapida dei problemi

| Sintomo | Prima cosa da controllare |
|---|---|
| Il kit non si accende | Alimentatore collegato alla porta USB-C **sopra il jack DC**; prema il pulsante di accensione |
| Nessuna uscita video | Cavo DisplayPort (per i monitor HDMI usare un adattatore attivo DP→HDMI); provi ad avviare senza la chiavetta USB ISO inserita |
| L'installer ISO non si avvia | Chiavetta scritta con Etcher (non copiata come file); selezioni la chiavetta USB nell'UEFI Boot Manager |
| Compare la richiesta QSPI | Prema `Y` — obbligatorio; l'aggiornamento viene eseguito due volte |
| Lo schermo diventa nero durante l'installazione | Interferenza di uno switch KVM — colleghi il monitor direttamente |

## Fonti e verifica

Questa pagina è stata scritta e verificata da Juxi Technology rispetto alla
documentazione ufficiale di NVIDIA:

- [Guida utente del kit di sviluppo Jetson AGX Orin — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificata il 2026-09-23)
- [Guida utente del kit di sviluppo Jetson AGX Orin — Configurazione dell'SDK JetPack](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (verificata il 2026-09-23)
- [Installazione del BSP (SDK Manager / script flash)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*Stato: rivisto il 2026-10-11. I passaggi non sono ancora stati verificati su hardware fisico da
Juxi Technology; si basano sulla documentazione ufficiale di NVIDIA alle date
indicate sopra.*

**Crediti delle immagini:** Tutti gli screenshot di questa pagina provengono
dalla *Jetson AGX Orin Developer Kit User Guide* ufficiale di NVIDIA (scaricata
il 2026-09-23) e restano © NVIDIA Corporation. Sono riprodotti qui per
illustrare il flusso di configurazione ufficiale.

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa guida è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
