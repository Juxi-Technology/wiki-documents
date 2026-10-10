---
title: Avvio rapido — Dall'unboxing a un sistema JetPack 7.2.1 funzionante
sidebar_label: Avvio rapido
slug: /getting-started/quick-start
description: >-
  Configurazione iniziale per il NVIDIA Jetson Orin Nano Super Developer Kit
  (8GB): la verifica del firmware, la scrittura della Jetson ISO 7.2.1 su una
  chiavetta USB e l'installazione di JetPack 7.2.1 (L4T r39.2.1) su scheda
  microSD o SSD NVMe.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Avvio rapido

Questa pagina accompagna il Suo NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) dalla confezione a un sistema **JetPack 7.2.1** funzionante (Jetson Linux / L4T r39.2.1). Segue il percorso consigliato da NVIDIA per la prima configurazione: il metodo **Jetson ISO**, installato da una chiavetta USB. Non serve alcun PC host Ubuntu.

**Il percorso in tre fasi:**

1. **Superi il requisito del firmware.** Il firmware di fabbrica più vecchio deve essere aggiornato prima di poter installare JetPack 7.2 (Passo 1).
2. **Crei la chiavetta USB di installazione.** Scarichi la Jetson ISO e la scriva su una chiavetta USB con Balena Etcher (Passi 2–3).
3. **Installi e configuri.** Installi su una scheda microSD o su un SSD NVMe, completi la configurazione iniziale di Ubuntu, poi aggiunga i componenti JetPack (Passi 4–7).

> **Importante**
> A partire da JetPack 7.2, NVIDIA non pubblica più immagini per scheda microSD
> per questo kit. **Non c'è alcuna immagine SD da flashare.** Il supporto di
> installazione è una chiavetta USB. La scheda microSD (o l'SSD NVMe) è solo la
> **destinazione di installazione**. I tutorial più vecchi che iniziano con
> "scrivere l'immagine su una scheda microSD" non valgono più.

## Cosa c'è nella confezione

- Il modulo Jetson Orin Nano 8 GB con dissipatore di calore, montato sulla scheda carrier di riferimento
- Un alimentatore da 19 V
- Un controllore di interfaccia di rete wireless 802.11ac/ab/gn (installato nello slot M.2 Key-E)
- Una scheda di avvio rapido e assistenza

**Nessun supporto di archiviazione è incluso.** La confezione non contiene schede microSD né SSD NVMe, e il modulo non ha memoria eMMC integrata. Tutta l'archiviazione proviene dalla scheda o dall'unità che si installa.

## Cosa deve procurarsi

- **Archiviazione — una delle seguenti opzioni:**
  - Una **scheda microSD, 64 GB UHS-1 o superiore** (consigliata). Va inserita nello slot sul **lato inferiore del modulo**. La inserisca prima di avviare l'installer.
  - Un **SSD NVMe** per uno degli slot M.2 Key-M sulla scheda carrier. Facoltativo, ma consigliato per maggiore capacità e prestazioni di archiviazione migliori.
- Una **chiavetta USB, 16 GB o superiore** — diventerà il supporto di installazione.
- Un **laptop o PC** (Windows, Mac o Linux) con almeno **25 GB liberi** — per scaricare la ISO e scrivere la chiavetta USB.
- Un **monitor DisplayPort**, più tastiera e mouse USB. DisplayPort è l'unica uscita display di questo kit; l'uscita HDMI e il DisplayPort su USB-C non sono supportati. Un adattatore attivo DisplayPort-HDMI funziona con un monitor HDMI.
- Senza monitor: un **cavo seriale USB-TTL** per una console seriale headless (vedere il Passo 1).

![Scheda microSD](/images/jetson-orin-nano/microsd_64gb.png)
*Opzione di archiviazione 1: una scheda microSD UHS-1 da 64 GB.*

![SSD NVMe](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*Opzione di archiviazione 2: un SSD NVMe nello slot M.2 Key-M.*

> **Nota di Juxi:** il bundle dello store Juxi per questo kit include in più una
> scheda microSD da 64 GB e un modulo Wi-Fi M.2. La scheda viene spedita **senza
> immagine preinstallata** (vuota), quindi segua la procedura ISO di questa
> pagina per installarvi il sistema.

## Passo 1 — Verificare il requisito del firmware

Le installazioni da JetPack 7.2 in poi **richiedono firmware UEFI/QSPI della generazione JetPack 6.x** sul kit di sviluppo. Se il Suo kit ha ancora il firmware di fabbrica più vecchio, completi prima il **percorso di aggiornamento JetPack 6.x**.

Con un monitor collegato:

1. Colleghi il monitor DisplayPort e una tastiera USB. Colleghi l'alimentatore da 19 V — il kit si accende automaticamente e un LED verde accanto al connettore USB-C si illumina.
2. **Prema ripetutamente `Esc` dopo la comparsa della schermata di avvio NVIDIA.** Si apre il menu di configurazione UEFI.
3. Controlli la riga della **versione del firmware** vicino alla parte superiore dello schermo:

| Versione del firmware | Cosa fare |
|---|---|
| 36.x o successiva | Proseguire con il Passo 2 |
| Più vecchia di 36.0 | Completare prima il percorso di aggiornamento JetPack 6.x (vedere sotto) |

![Menu UEFI con la versione del firmware](/images/jetson-orin-nano/firmware-version-check.png)
*La versione del firmware è mostrata vicino alla parte superiore del menu di configurazione UEFI.*

Alternativa headless: colleghi un cavo seriale USB-TTL al connettore dei pulsanti (adattatore TX su pin 3 / RXD, RX su pin 4 / TXD, massa su pin 7 / GND), apra una console seriale sul PC e prema `Esc` nella console mentre sono mostrate le opzioni di pre-avvio.

![Cavo seriale USB-TTL sul connettore dei pulsanti](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*Percorso headless: un cavo seriale USB-TTL collegato al connettore dei pulsanti.*

### Se il firmware è troppo vecchio

Il **percorso di aggiornamento JetPack 6.x** porta avanti il firmware. In breve (passi completi in [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)):

1. Avvii l'**immagine ponte JetPack 5.1.3** (nome file `JP513-orin-nano-sd-card-image_b29.zip`) da una scheda microSD.
2. Un servizio in background pianifica un aggiornamento del bootloader (verifichi con `sudo systemctl status nv-l4t-bootloader-config`).
3. Riavvii. L'aggiornamento del firmware viene eseguito durante questo avvio (verifichi con `sudo nvbootctrl dump-slots-info`).
4. Installi l'updater QSPI: `sudo apt update`, poi `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`, quindi riavvii.
5. Spenga il kit, rimuova la scheda ponte, inserisca la destinazione di archiviazione e prosegua con il Passo 2.

Questo percorso richiede una scheda microSD e un lettore di schede. Senza questi, l'alternativa è SDK Manager su un host Ubuntu (vedere [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)). Un altro caso: se il firmware proviene dal BSP 36.2 (JetPack 5.0 DP), l'aggiornamento della capsula nell'installer non lo supporta — porti il kit a una release successiva prima di eseguire l'installazione ISO di JetPack 7.2.1.

Se avvia comunque l'installer e lo schermo resta nero o compare una shell UEFI, il firmware è probabilmente troppo vecchio. Non ritenti l'avvio più volte. Spenga il kit, completi il percorso di aggiornamento e riprovi.

![Shell interattiva UEFI](/images/jetson-orin-nano/uefi_interactive_shell.png)
*Una shell UEFI (o uno schermo nero) al posto dell'installer di solito significa che il firmware è troppo vecchio per la release JetPack di destinazione.*

## Passo 2 — Scaricare la Jetson ISO

Scarichi la ISO di installazione di JetPack 7.2.1 (etichetta: **Jetson ISO (r39.2.1)**) dalla
[pagina di download di JetPack](https://developer.nvidia.com/embedded/jetpack/downloads), oppure usi questo link diretto:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

I nomi dei file ISO seguono lo schema `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` (per questa release: `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). Le pagine di download di NVIDIA non elencano la dimensione del file ISO né i checksum.

## Passo 3 — Scrivere la ISO su una chiavetta USB

1. Installi **Balena Etcher** da <https://etcher.balena.io/#download-etcher> (Windows, Mac o Linux).
2. Inserisca la chiavetta USB nel PC.
3. In Etcher, selezioni il file ISO, selezioni l'unità USB e avvii la scrittura.

![Scrittura della Jetson ISO su una chiavetta USB con Balena Etcher](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Scrittura della Jetson ISO sulla chiavetta USB con Balena Etcher.*

> **Attenzione**
> **Non scriva la ISO su una scheda microSD.** A partire da JetPack 7.2
> le immagini per scheda SD non sono più supportate. Scriva la ISO su una
> chiavetta USB, poi la usi per installare Jetson Linux sulla Sua scheda
> microSD o sul Suo SSD NVMe.

Copiare il file ISO sulla chiavetta con un file manager non funziona — deve essere scritto come immagine disco. La chiavetta risultante è solo un programma di installazione; non può avviarsi in un desktop utilizzabile.

## Passo 4 — Avviare l'installer e installare

1. Spenga il kit, poi installi la **destinazione di archiviazione**:
   - scheda microSD: la inserisca nello slot sul **lato inferiore del modulo**.
   - SSD NVMe: lo installi nello slot M.2 Key-M sulla scheda carrier.
   Installi la destinazione di archiviazione prima di avviare l'installer.
2. Inserisca la chiavetta USB di installazione. Colleghi monitor, tastiera e mouse, poi colleghi l'alimentatore. Colleghi la chiavetta di installazione **direttamente** al kit, non attraverso un hub: NVIDIA documenta un hub USB 3.0 (modello UH400) che compromette l'installazione da ISO e un adattatore USB-Ethernet (TRENDnet TU2-ET100) che può far fallire il flashing. Vedere la **[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**.
3. **Prema `Esc` quando compare la schermata di avvio con il logo NVIDIA.** Selezioni **Boot Manager**, selezioni l'unità USB e prema Invio per avviare da essa. NVIDIA consiglia di selezionare esplicitamente l'unità USB, così da essere certi che sia in esecuzione l'installer corretto.
4. **Quando compare la richiesta di aggiornamento della capsula QSPI, prema `Y` entro 30 secondi.** È il passo saltato più spesso. La richiesta è facile da perdere in tempo reale. Se scade il tempo e l'installazione prosegue senza l'aggiornamento, l'installazione fallisce più tardi — riavvii l'installazione e prema `Y` quando compare la richiesta. L'aggiornamento della capsula viene eseguito in **due passaggi**, e il kit può riavviarsi tra l'uno e l'altro o dopo di essi. È previsto; attenda che entrambi i passaggi finiscano. I kit il cui firmware QSPI attuale è r38.2.0/r38.2.1 devono confermare l'aggiornamento del firmware una seconda volta dopo il completamento del primo passaggio (problema 6480645 delle note di rilascio di r39.2.1) — prema di nuovo `Y` se richiesto.
5. Nel **menu GRUB di installazione del BSP Jetson**, selezioni **Install Jetson ISO r39.2.1**. Selezioni il dispositivo di archiviazione di destinazione (la scheda microSD o l'SSD NVMe) e confermi. **L'installazione cancella il dispositivo selezionato** — controlli la selezione prima di confermare.
6. Attenda il completamento dell'installazione. Le istruzioni di NVIDIA dicono che testo bianco scorre sullo schermo per diversi minuti; riavvii quando richiesto. Le segnalazioni della community sui tempi di installazione variano molto — da circa 15 minuti a molto di più (non confermato, segnalazioni dal forum).
7. **Rimuova la chiavetta USB** così il kit avvia il nuovo sistema dalla destinazione di archiviazione e non di nuovo l'installer.

Il personale NVIDIA sul forum raccomanda anche di tenere un display collegato durante l'installazione da ISO.

## Passo 5 — Primo avvio e configurazione iniziale di Ubuntu

Dopo il riavvio dell'installer, il kit avvia la configurazione iniziale di Ubuntu (`oem-config`):

1. Esamini e accetti la EULA del software NVIDIA Jetson.
2. Selezioni la lingua di sistema, il layout di tastiera e il fuso orario.
3. Si connetta a una rete.
4. Crei nome utente, password e nome del computer.
5. Acceda al desktop Ubuntu.

## Passo 6 — Installare i componenti JetPack

La ISO installa il sistema di base (Jetson Linux). CUDA, cuDNN, TensorRT e il resto dello stack JetPack vengono aggiunti dopo il primo avvio. Sul desktop del kit, apra un terminale ed esegua:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

Riavvii dopo l'installazione se richiesto.

Verifichi il risultato:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` deve riportare una release R39 con revisione 2.1. Vedere [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system) per la checklist completa.

## Passo 7 — Controllare la modalità di alimentazione

La modalità di alimentazione predefinita è tipicamente **25W**. Per le massime prestazioni, clicchi sulla modalità di alimentazione corrente nella barra superiore del desktop Ubuntu, selezioni **Power Mode** e scelga **MAXN SUPER**; dalla riga di comando, `sudo /usr/sbin/nvpmodel -q` mostra la modalità corrente. Le installazioni ISO di JetPack 7.2.1 usano per impostazione predefinita la configurazione di flashing Modalità Super, quindi 25W e MAXN SUPER dovrebbero essere disponibili — se mancano, vedere la [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

![Selezione di MAXN SUPER nel menu delle modalità di alimentazione](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*Selezioni Power Mode → MAXN SUPER per le massime prestazioni.*

## Risoluzione rapida dei problemi

| Sintomo | Prima cosa da controllare |
|---|---|
| Il kit non si accende | L'alimentatore da 19 V deve essere collegato al jack DC. Il kit si accende automaticamente; il LED verde accanto al connettore USB-C deve illuminarsi. |
| L'installer USB non si avvia | Selezioni esplicitamente l'unità USB nel UEFI Boot Manager (`Esc` alla schermata di avvio). Verifichi che il firmware sia 36.x o successivo. |
| Schermo nero o shell UEFI al posto dell'installer | Il firmware potrebbe essere troppo vecchio. Completi prima il percorso di aggiornamento JetPack 6.x. |
| L'installer salta la configurazione di lingua/rete/nome utente; il primo avvio si blocca su uno schermo nero | La richiesta della capsula QSPI è stata persa. Riavvii l'installazione e prema `Y` entro 30 secondi. |
| L'installer non mostra la destinazione di archiviazione | microSD: verifichi che sia inserita a fondo nello slot sul lato inferiore del modulo. NVMe: reinstalli l'unità e riavvii l'installer. |
| Solo modalità di alimentazione 7W/15W; mancano 25W e MAXN SUPER | Vedere la [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting). |

## Fonti

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificato il 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11. Basato sulla documentazione ufficiale NVIDIA alle date indicate; non ancora verificato su hardware fisico da Juxi Technology.*

**Crediti delle immagini:** le immagini di questa pagina provengono dalla *Jetson Orin Nano Developer Kit User Guide* ufficiale di NVIDIA (scaricata il 2026-09-26) e restano © NVIDIA Corporation. Sono riprodotte qui per illustrare il flusso di configurazione ufficiale.

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata da Juxi Technology e non è una pubblicazione NVIDIA.
