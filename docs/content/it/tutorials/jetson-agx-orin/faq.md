---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Domande frequenti sul NVIDIA Jetson AGX Orin Developer Kit (64GB) —
  contenuto della confezione, configurazione, display e alimentazione,
  software e supporto.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
review_owner: cheny
---

# FAQ

## Configurazione

**Che cosa c'è nella confezione?**
Modulo Jetson AGX Orin e scheda carrier di riferimento, modulo Wi-Fi,
alimentatore USB Type-C e un cavo da USB Type-C a USB Type-A. Il monitor
(DisplayPort), la tastiera/il mouse e, facoltativamente, un cavo Ethernet sono a
suo carico — vedere
[Avvio rapido](/it/tutorials/jetson-agx-orin/quick-start).

**Il kit viene fornito con un sistema operativo?**
Sì — la eMMC è preflashata e il kit si avvia direttamente sul desktop Ubuntu.
Le unità possono essere fornite con una versione L4T più vecchia; il percorso di
aggiornamento consigliato è la Jetson ISO (nessun PC host richiesto). Vedere
[Avvio rapido](/it/tutorials/jetson-agx-orin/quick-start).

**Serve un PC separato per la configurazione?**
No, non per il percorso consigliato — la Jetson ISO si installa da una chiavetta
USB. Un PC host (Ubuntu) è necessario solo per i metodi di installazione
alternativi (SDK Manager / script di flashing) o per la configurazione iniziale
headless. Vedere
[Flashing e aggiornamenti](/it/tutorials/jetson-agx-orin/flashing-and-updates).

**Qual è la versione software attuale?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.1,
TensorRT 10.16.2). Controlli la versione in esecuzione sul suo kit con
[Verificare il sistema](/it/tutorials/jetson-agx-orin/verify-your-system).

## Display e alimentazione

**Posso collegare il mio monitor HDMI?**
Solo tramite un adattatore o cavo DisplayPort→HDMI **attivo** — il kit ha solo
un'uscita DisplayPort (nessuna porta HDMI, nessun DP-over-USB-C). MST è
supportato per un massimo di due display. Dettagli:
[Interfacce e layout hardware](/it/tutorials/jetson-agx-orin/interfaces).

**Come si alimenta il kit?**
Usi l'alimentatore USB-C in dotazione nella porta USB-C sopra il connettore DC
(J24). Se si alimenta tramite il jack a barilotto (J41): 5,5 mm di diametro
esterno, 2,5 mm di diametro interno, polo centrale positivo.

## Utilizzo del kit

**Questo kit di sviluppo può emulare altri moduli Jetson?**
Sì. Il kit di sviluppo condivide l'architettura SoC con tutti i moduli
Jetson Orin e può essere riflashato per emulare le prestazioni e le
caratteristiche di alimentazione di AGX Orin, Orin NX o Orin Nano. Viene
fornito configurato per la serie AGX Orin.

**È questo il modulo che userei in un prodotto di serie?**
No. I prodotti di serie si basano sui **moduli** Jetson Orin (64 GB / 32 GB /
Industrial) su una scheda carrier propria o di un partner. Il kit di sviluppo è
il veicolo di sviluppo e prototipazione.

**Può eseguire grandi modelli linguistici / IA agentica?**
Sì — è un caso d'uso centrale della piattaforma Orin. Con JetPack 7.2, NVIDIA
NemoClaw è installabile con un solo comando sui kit di sviluppo per
l'orchestrazione di modelli locali e cloud, e il
[Jetson AI Lab](https://www.jetson-ai-lab.com) pubblica tutorial pratici.

**Per la robotica: Isaac ROS è disponibile su JetPack 7.2?**
Non ancora. La pagina di download di JetPack 7.2.1 di NVIDIA elenca Isaac ROS
come **"in arrivo"** per questa release. Consulti quella pagina prima di
pianificare lavori che ne dipendono.

## Supporto e assistenza

**Dove posso ottenere assistenza tecnica?**
- Domande sulla piattaforma: [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — cerchi prima nel forum; includa l'output di `cat /etc/nv_tegra_release`.
- Supporto tecnico di Juxi Technology: **support@juxitech.com**
- Ordini, garanzia e RMA: **support@juxitech.com** (per accelerare, includa il numero d'ordine)
- Vendite e preventivi: **sales@juxitech.com**
- Domande sui prodotti (selezione, compatibilità): **pe@juxitech.com**

**Dove posso trovare accessori (archiviazione NVMe, fotocamere, alimentazione)?**
Sfogli il catalogo prodotti di Juxi Technology su
**<https://wiki.juxitech.com/products/>** — include accessori rilevanti per
Jetson come la
[fotocamera CSI IMX219](https://wiki.juxitech.com/products/imx219-csi-camera)
(progettata per NVIDIA Jetson), le fotocamere USB con autofocus e le
[fotocamere di profondità RealSense](https://wiki.juxitech.com/products/realsense-depth-camera).
Per un consiglio, scriva a sales@juxitech.com.

## Fonti

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-23)

*Stato: bozza, in attesa di revisione da parte di cheny.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
