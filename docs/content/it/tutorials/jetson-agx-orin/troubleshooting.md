---
title: Risoluzione dei problemi
sidebar_label: Risoluzione dei problemi
slug: /support/troubleshooting
description: >-
  Risoluzione dei problemi guidata dai sintomi per il kit di sviluppo
  Jetson AGX Orin — avvio e display, alimentazione, flashing e problemi noti,
  basata sulla documentazione ufficiale NVIDIA.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Risoluzione dei problemi

I problemi sono raggruppati per sintomo — individui il suo, quindi segua i
controlli nell'ordine indicato. Tutto ciò che è riportato qui si basa sulla
documentazione ufficiale NVIDIA (fonti in fondo). Per quanto non trattato,
vedere *Come ottenere assistenza* alla fine.

## Il kit non si accende

1. L'alimentatore USB-C in dotazione deve essere collegato alla **porta USB-C sopra il connettore DC** (J24) — non alla porta accanto al connettore a 40 pin.
2. Il kit si accende automaticamente quando viene collegata l'alimentazione; in caso contrario, prema il **pulsante Power**.
3. Se utilizza un alimentatore proprio tramite il connettore barrel (J41): diametro esterno 5.5 mm, diametro interno 2.5 mm, **polo centrale positivo**.

## Nessuna uscita display / lo schermo resta nero

- **DisplayPort è l'unica uscita display.** Non c'è alcuna porta HDMI né DisplayPort-over-USB-C. Per un monitor HDMI, utilizzi un adattatore o un cavo DP→HDMI **attivo**.
- Il primo avvio può richiedere **fino a un minuto** prima che compaia qualcosa sullo schermo.
- Se utilizza uno **switch KVM**, colleghi il monitor direttamente al kit — i dispositivi KVM sono una fonte nota di problemi di schermo nero sia durante il normale avvio sia durante l'installazione da ISO (NVIDIA lo segnala nella guida di configurazione).
- Avvio con una configurazione di alimentazione problematica? Vedere *Il sistema si blocca al riavvio con un display collegato* più sotto — provi ad avviare **senza** il display collegato, poi lo ricolleghi dopo l'avvio.

## Dopo l'installazione da ISO, il kit avvia il vecchio sistema

Rimuova la chiavetta USB di installazione dopo l'installazione. Se la chiavetta
resta inserita, il kit può avviarsi di nuovo da essa invece che dal sistema
appena installato. (Indicazione ufficiale.)

## Flashing — problemi con Jetson ISO

- **Il kit non si avvia dalla chiavetta USB:** apra il **gestore di avvio UEFI** durante l'avvio e selezioni l'unità USB.
- **Compare un prompt del firmware QSPI:** prema **`Y`**. Questo aggiornamento della capsula è necessario per la compatibilità e viene eseguito due volte. Se non vede il prompt o non è sicuro che sia stato completato, **riavvii l'installazione** e lo confermi. Saltare questo passaggio causa problemi di installazione (problema noto 6266271 delle note di rilascio NVIDIA).
- **Il mio kit è più vecchio di L4T r35.5:** il percorso ISO richiede un BSP installato r35.5 o successivo. Usi prima i metodi da PC host (SDK Manager o `flash.sh`) per aggiornare a r35.5+ — vedere [Flashing e aggiornamenti](/it/tutorials/jetson-agx-orin/flashing-and-updates).

## Flashing — problemi con SDK Manager

- **Dispositivo non rilevato:** controlli, nell'ordine —
  1. Cavo collegato alla **porta USB-C accanto al connettore a 40 pin** (porta 10 / J40), non alla porta di alimentazione;
  2. Il kit è entrato in **modalità Force Recovery**: tenga premuto il **pulsante centrale Force Recovery** mentre inserisce la spina di alimentazione;
  3. L'host soddisfa i requisiti: Ubuntu Desktop 20.04/22.04 (x86_64), 8 GB di memoria di sistema, 25 GB di disco libero, account NVIDIA Developer Program con login effettuato. (Le note di rilascio di L4T 39.2 elencano le distribuzioni host 24.04/22.04 per il flashing — consulti la pagina dei requisiti di sistema di SDK Manager per l'elenco aggiornato.)
- **Voglio eseguire il flashing su NVMe / microSD / unità USB:** l'installer ISO copre eMMC e NVMe; gli altri supporti richiedono SDK Manager o lo script di flashing (PC host).

## Il sistema si blocca al riavvio con un display collegato (AGX Orin 64GB, modalità 15W)

Problema noto **6236259** delle note di rilascio NVIDIA: sulle piattaforme AGX
Orin, abbassare la frequenza EMC sotto il massimo (cosa che avviene nelle
modalità a basso consumo come 15W) durante l'inizializzazione di systemd può
mandare in crash il sistema al riavvio — soprattutto con un display collegato.
Soluzione temporanea secondo NVIDIA:

1. Prima di riavviare, selezioni la modalità di alimentazione **MAXN** (riporta EMC alla frequenza Fmax).
2. Dopo il riavvio del sistema, applichi la modalità di alimentazione desiderata.
3. Se è stato riavviato mentre si trovava nella modalità problematica: scolleghi il display, avvii il sistema e ricolleghi il display dopo l'inizializzazione.

## Rete e wireless (note post-flashing)

- **Impossibile connettersi a 6 GHz / WPA3 subito dopo il flashing:** esegua un reset del dispositivo e riprovi (indicato come risolto in L4T 39.2.0; la nota sul reset vale ancora per le unità con immagini più vecchie).
- **Alcuni access point Wi-Fi mancano nelle scansioni (ambienti affollati):** aumenti il buffer di scansione — `wpa_cli set bss_max_count 500` (dalla sezione dei problemi risolti delle note di rilascio).

## Problemi noti oltre questa pagina

Prima di eseguire un debug approfondito, controlli la sezione **problemi noti**
delle note di rilascio attuali — copre voci generali di sistema, camera,
multimedia, grafica, connettività, display e stack di calcolo:

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Come ottenere assistenza

- **[NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — community ufficiale; cerchi prima di pubblicare e includa l'output di `cat /etc/nv_tegra_release`.
- **Supporto Juxi Technology** — **support@juxitech.com** per l'assistenza tecnica e per questioni relative a ordini, garanzia e RMA. Per accelerare la gestione, includa il numero d'ordine e l'output di `cat /etc/nv_tegra_release`. (Vendite: sales@juxitech.com · Domande sui prodotti: pe@juxitech.com)

## Fonti

- [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit User Guide (verificato il 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificato il 2026-09-23)

*Stato: bozza, in attesa di revisione da parte di cheny. Il comportamento
specifico dell'hardware segnalato dai clienti può variare; aggiornare questa
pagina man mano che arrivano le segnalazioni dal campo.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
