---
title: Interfacce e layout hardware
sidebar_label: Interfacce e layout hardware
slug: /product/interfaces
description: >-
  Layout etichettato e riferimento dei connettori per il kit di sviluppo
  NVIDIA Jetson AGX Orin — pulsanti, porte, connettori della scheda carrier,
  opzioni di display e archiviazione, il connettore a 40 pin e il connettore
  di automazione.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# Interfacce e layout hardware

Per il kit di sviluppo esistono due sistemi di riferimento: le **etichette
numerate (0–12) sulle viste laterali**, usate dalla guida ufficiale NVIDIA e da
questa pagina, e i **numeri dei connettori della scheda carrier (numeri J)**
stampati sul PCB. Tenere entrambi a portata di mano — il resto delle nostre
guide vi fa riferimento.

## Viste laterali — parti etichettate

![Kit di sviluppo, vista con pulsanti e ingresso DC](/images/jetson-agx-orin/jaodk_labeled_01.png)
![Kit di sviluppo, vista con coperchio PCIe e connettore a 40 pin](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | Parte | Note |
|---|---|---|
| 0 | LED bianco | Indicatore di alimentazione |
| 1 | Pulsante Power | |
| 2 | Pulsante Force Recovery | Usato per le modalità recovery / flash |
| 3 | Pulsante Reset | |
| 4 | Porta USB Type-C | Solo DFP (per collegare periferiche) |
| 5 | Connettore di alimentazione DC | Connettore barrel — per le specifiche vedere J41 |
| 6 | Porta Ethernet | |
| 7 | Porte USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | Uscita DisplayPort | **L'unica interfaccia display del kit** |
| 9 | Porta USB micro-B | Per il debug |
| 10 | Porta USB Type-C | Flash e dati (UFP e DFP) |
| 11 | Connettore a 40 pin | |
| 12 | Porte USB Type-A ×2 | USB 3.2 Gen 1 |

## Scheda carrier — connettori

| Marcatura | Connettore | Specifiche / note |
|---|---|---|
| DS2 | LED bianco | |
| S1 / S2 / S3 | Pulsanti Power / Reset / Force Recovery | |
| J24 | USB Type-C (sopra il connettore DC) | Solo DFP, USB 3.2 Gen 2 — **qui si collega l'alimentatore USB-C in dotazione** |
| J41 | Connettore di alimentazione DC | Diametro esterno 5.5 mm, diametro interno 2.5 mm, polo centrale positivo |
| J17 | Ethernet | Fino a 10GBASE-T |
| J33 | USB Type-A ×2 (accanto alla porta Ethernet) | USB 3.2 Gen 2 |
| J18 | Uscita DisplayPort | Supporta MST |
| J26 | USB micro-B | UART di debug |
| J40 | USB Type-C (accanto al connettore a 40 pin) | UFP e DFP — **la porta usata per collegarsi a un PC host per SDK Manager** |
| J30 | Connettore a 40 pin | Il pin 1 è contrassegnato da un triangolo bianco sul PCB |
| J42 | Connettore di automazione | Accensione automatica, wake-on-LAN, trigger di throttling (pin riportati di seguito) |
| J13 | Connettore per batteria tampone RTC | |
| J509 | Connettore fotocamera | |
| J502 | Connettore di debug JTAG | |
| J505 | Slot M.2 E-Key | Normalmente ospita il modulo Wi-Fi |
| J511 | Connettore HD Audio | |
| J1 | Slot M.2 M-Key | Per un SSD NVMe |
| J10 | Slot per scheda microSD | UHS-1 |
| J3 | Connettore del modulo Jetson | 699 pin |
| J6 | Connettore PCIe x16 | PCIe 4.0 ×8 elettrico |
| J9 | Connettore ventola | 4 pin, passo 1.25 mm |

> **Le tre cose che le persone chiedono per prime:**
> - **Display:** DisplayPort (J18) è l'*unica* uscita display — non c'è alcuna
>   porta HDMI né DisplayPort-over-USB-C. Per un monitor HDMI, usare un
>   adattatore o un cavo attivo DP→HDMI.
> - **Alimentazione:** l'alimentatore USB-C in dotazione si collega a **J24**
>   (la porta USB-C sopra il connettore DC). È disponibile anche un ingresso
>   separato con connettore barrel (J41) se si usa un alimentatore proprio.
> - **Collegamento al PC host:** per SDK Manager o una console seriale, usare
>   **J40** (la porta USB-C accanto al connettore a 40 pin) — non J24.

## Uscita DisplayPort

- Supporta DP SST, DP MST (fino a 2 display esterni) e DP DSC
- Risoluzione massima: 8K@30 / 4K@120 (con o senza DSC)
- Formati di uscita: RGB 8/10 bpc, YUV444 8/10 bpc

## Opzioni di archiviazione

- **Predefinito:** memoria flash eMMC sul modulo
- **Opzionale:** SSD NVMe (M.2 M-Key, J1) · scheda microSD (J10, UHS-1) · unità USB

Il programma di installazione di Jetson ISO può installare il sistema su eMMC o
NVMe; SDK Manager può eseguire il flashing del BSP L4T di base su uno qualsiasi
dei supporti di archiviazione supportati.

## Connettore a 40 pin (J30)

![Pinout del connettore a 40 pin](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*Pinout del connettore a 40 pin — dalla Carrier Board Specification di NVIDIA.*

![Marcatura del pin 1 sul connettore a 40 pin](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*Il pin 1 è contrassegnato da un triangolo bianco sul PCB.*

## Connettore di automazione (J42)

Utilizzato per il cablaggio di produzione e automazione:

- Pin 1, 12: GND
- Pin 2, 3, 4: ingressi, stessa funzione dei pulsanti Recovery, Reset e Power
- Pin 5–6: aperto = accensione automatica disabilitata; chiuso = accensione automatica abilitata
- Pin 7: uscita CVB_STBY — indica se il modulo è in stato di sospensione
- Pin 8: ingresso SYSTEM_OC — attiva il throttling di Tegra
- Pin 9–10: aperto = wake/boot-on-LAN da spento disabilitato; chiuso = abilitato
- Pin 11: JTAG_TRST — reset di test JTAG

## Fonti

- [Hardware Layout — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (verificato il 2026-09-23)
- Per i dettagli sulla scheda carrier, vedere la *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* (link dalla [pagina dei download](https://developer.nvidia.com/embedded/downloads) di NVIDIA)

*Stato: bozza, in attesa di revisione da parte di cheny. I passaggi e i valori
sopra riportati si basano sulla documentazione ufficiale NVIDIA alla data
indicata; non ancora verificati su hardware fisico da Juxi Technology.*

**Crediti immagini:** i diagrammi di layout e le immagini dei pinout provengono
dalle pubblicazioni ufficiali NVIDIA *Jetson AGX Orin Developer Kit User Guide*
e *Carrier Board Specification* (scaricate il 2026-09-23) e restano © NVIDIA
Corporation.

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
