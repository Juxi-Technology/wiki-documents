---
title: Interfacce e layout hardware
sidebar_label: Interfacce e layout hardware
slug: /product/interfaces
description: >-
  Layout etichettato e riferimento dei connettori per il NVIDIA Jetson Orin
  Nano Super Developer Kit — ogni porta, slot, header e controllo, lo slot
  microSD sul lato inferiore, i connettori per fotocamera, l'alimentazione e la
  console seriale.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# Interfacce e layout hardware

Il kit è composto da due schede: il **modulo Jetson Orin Nano** (P3767) sulla
**scheda carrier di riferimento** (P3768); il kit completo è P3766. Questa pagina
descrive i connettori e i controlli, usando le marcature ufficiali NVIDIA (1–12).

## Layout numerato — parti etichettate

![Layout numerato del kit di sviluppo](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*Il layout numerato ufficiale — le marcature 1–12 di NVIDIA.*

| # | Parte | Note |
|---|---|---|
| 1 | Slot per scheda microSD | Sul **lato inferiore del modulo** — vedere sotto |
| 2 | Connettore di espansione a 40 pin | UART, SPI, I2S, I2C, GPIO |
| 3 | LED indicatore di alimentazione | Verde; si illumina quando il kit è alimentato |
| 4 | Porta USB-C | Modalità host, device e USB recovery; nessuna uscita video |
| 5 | Porta Ethernet Gigabit | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps; due connettori doppi impilati |
| 7 | Uscita DisplayPort | **L'unica uscita display del kit** |
| 8 | Jack di alimentazione DC | Connettore barrel 5.5 mm × 2.5 mm |
| 9 | Connettori fotocamera MIPI CSI ×2 | 22 pin, passo 0.5 mm |
| 10 | Slot M.2 Key-M (2280) | PCIe 3.0 ×4 — per un SSD NVMe |
| 11 | Slot M.2 Key-M (2230) | PCIe 3.0 ×2 — per un SSD NVMe |
| 12 | Slot M.2 Key-E (2230) | Popolato con il modulo wireless in dotazione |

> **Tre cose da sapere subito:**
> - **Archiviazione:** nessuna eMMC e **nessuna archiviazione nella confezione**. Aggiunga una scheda microSD o un SSD NVMe.
> - **Slot microSD:** sul **lato inferiore del modulo** — vedere sotto.
> - **Display:** DisplayPort è l'*unica* uscita display — niente HDMI, niente video su USB-C.

## Slot microSD — lato inferiore del modulo

![Lo slot microSD sul lato inferiore del modulo](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*La scheda si inserisce nel **lato inferiore del modulo** — immagine NVIDIA, con un riquadro ingrandito.*

> **Attenzione:** lo slot microSD (marcatura 1) è sul **lato inferiore del
> modulo**, non sulla scheda carrier. È il dettaglio fisico più spesso
> trascurato su questo kit. Inserisca la scheda prima di avviare l'installer.

- Il kit si avvia dalla scheda microSD quando questa è presente; consigliata 64 GB UHS-1 o superiore.
- Se l'installer non mostra la scheda, l'indicazione di risoluzione di NVIDIA
  è verificare che la scheda sia inserita a fondo nello slot del modulo.
- JetPack 7.2 e successivi non hanno immagini per scheda SD. Per cambiare ciò che è installato,
  usi un percorso di installazione supportato — vedere **[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Opzioni di archiviazione

- **microSD** (lato inferiore del modulo, marcatura 1) — l'archiviazione principale del modulo.
- **SSD NVMe** — formato 2280 o 2230 negli slot M.2 Key-M (marcature 10 e 11, sotto).
- **Unità USB** — su USB-C o Type-A; l'ordine di avvio si imposta nel UEFI Boot Manager.

Vedere l'**[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)** per cosa acquistare e per il flusso del primo avvio.

## USB

| Porta | Velocità | Modalità | Note |
|---|---|---|---|
| USB 3.2 Type-A ×4 (marcatura 6) | USB 3.2 Gen 2, 10 Gbps | Solo host | Due connettori doppi impilati; VBUS limitato a 3 A per coppia |
| USB-C (marcatura 4) | USB 3.2 Type-C | Host, Device, USB Recovery | Solo dati — questa porta non emette video |

In **modalità Device**, la porta USB-C presenta il kit a un PC host come:

- un dispositivo di archiviazione di massa con il file **L4T-README**;
- un dispositivo seriale USB;
- un collegamento Ethernet USB (RNDIS) — il Jetson è a **192.168.55.1**.

## Uscita DisplayPort

- Una sola uscita (marcatura 7): **DisplayPort 1.2 con MST**. Non c'è alcuna
  porta HDMI e la porta USB-C non trasporta video.
- Per un monitor HDMI, usi un adattatore DisplayPort-HDMI.
- Se non c'è uscita video, colleghi il monitor direttamente — niente switch KVM
  né catene di adattatori.

## Ethernet

- 1× Ethernet Gigabit (RJ45), marcatura 5. Il kit non ha porte 10 GbE.

## Slot M.2

| Marcatura | Slot | Formato | Elettrico | Accoglie |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | SSD NVMe |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | SSD NVMe |
| 12 | M.2 Key-E | 2230 | — | Il modulo wireless in dotazione (popolato) |

### Modulo wireless

- Lo slot Key-E viene spedito **popolato**. NVIDIA descrive la scheda solo come un
  "controllore di interfaccia di rete wireless 802.11ac/ab/gn" — nessun nome di chip.
- Segnalazioni della community (non confermate) identificano la scheda di serie come una **Realtek
  RTL8822CE** (modulo AzureWave, PCI ID 10ec:c822). Questa è informazione della
  community, non una dichiarazione di NVIDIA.
- I modelli NVMe e i moduli Key-E ufficialmente supportati sono nell'elenco "Jetson
  supported components information" del Jetson Download Center, non su
  una pagina pubblica. Verifichi lì un componente prima di acquistarlo.
- Se la scheda non vede la Sua rete — ad esempio un router a 6 GHz con
  MBSSID — vedere **[Risoluzione dei problemi → Wi-Fi non vede la rete](/it/tutorials/jetson-orin-nano/troubleshooting)**.

## Connettori fotocamera CSI

- Due connettori (marcatura 9): 22 posizioni, passo 0.5 mm, flex a contatto inferiore.
- **CAM0:** CSI 1×2 lane. **CAM1:** CSI 1×2 lane o 1×4 lane.
- Una fotocamera a 15 pin (ad esempio la Raspberry Pi Camera Module v2) richiede un cavo da 15 a 22 pin.

## Connettore di espansione a 40 pin (marcatura 2)

- Interfacce GPIO e periferiche: UART, SPI, I2S, I2C, GPIO.
- Per assegnazioni dei pin, livelli di tensione e limiti elettrici, NVIDIA rimanda
  alla *Jetson Orin Nano Developer Kit Carrier Board Specification* (Jetson
  Download Center). Quel documento non era accessibile per questa pagina.

## Connettore dei pulsanti (12 pin)

Il connettore dei pulsanti porta le funzioni di console seriale, reset e force recovery.

| Pin | Funzione |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | Console seriale (UART) |
| 9 + 10 | Modalità Force Recovery — cortocircuiti i pin, poi accenda |
| 7 + 8 | Reset — cortocircuiti i pin mentre il sistema è alimentato |
| jumper | Imposta il comportamento di accensione automatica |

### Console seriale

- Colleghi un adattatore seriale USB-TTL: TX dell'adattatore al pin 3 (RXD), RX al pin 4 (TXD), GND al pin 7.
- Questo è il fallback headless. Vedere la **[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting)**
  per come catturare i log di avvio.

### Force Recovery e reset

- **Modalità Force Recovery:** colleghi i pin 9 e 10, poi accenda il kit.
- **Reset:** mentre il kit è acceso, cortocircuiti i pin 7 e 8.
- La Modalità Force Recovery si usa per i flussi di flashing — vedere **[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Alimentazione

- **Jack di alimentazione DC (marcatura 8):** connettore barrel 5.5 mm × 2.5 mm; usi l'alimentatore
  da 19 V in dotazione.
- **Accensione automatica:** per impostazione predefinita, il kit si accende appena viene collegata
  l'alimentazione DC. Un jumper sul connettore dei pulsanti modifica questo comportamento.
- **LED di alimentazione (marcatura 3):** un LED verde accanto al connettore USB-C si illumina quando
  il kit è alimentato.
- Le pagine NVIDIA consultate non indicano la corrente nominale dell'alimentatore in dotazione né
  la polarità del jack. Per un alimentatore di terze parti, confermi entrambe con il fornitore.

## Connettore ventola

- La scheda carrier ha un header ventola a 4 pin.
- Il modulo viene spedito con un dissipatore di calore; le immagini ufficiali mostrano la ventola integrata
  nel guscio del dissipatore. L'header serve per soluzioni termiche sostitutive.
- Le pagine NVIDIA consultate non indicano l'intervallo di temperatura operativa del modulo
  né i limiti Tj — quelli sono nella Jetson Orin Nano Series Data Sheet e
  nella Orin NX/Orin Nano Thermal Design Guide, entrambe nel Download Center
  con accesso autenticato.

## Dimensioni

- **Modulo:** 69.6 mm × 45 mm, connettore SO-DIMM a 260 pin.
- **Kit:** due cifre ufficiali non concordano — la scheda tecnica (dicembre 2024) dice
  **103 mm × 90.5 mm × 34.77 mm**; la tabella della famiglia di prodotti NVIDIA dice
  **100 mm × 79 mm × 21 mm**. Entrambe definiscono l'altezza come comprensiva di piedini, scheda
  carrier, modulo e soluzione termica.
- NVIDIA non ha pubblicato una riconciliazione. Una spiegazione di un rivenditore (kit sulla
  sua base rispetto alla sola scheda carrier) è **non verificata**.

> **Nota di Juxi:** confermi le dimensioni sulla scheda tecnica attuale di NVIDIA prima di progettare un case.

## Fonti

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificato il 2026-09-26)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificato il 2026-09-26)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificato il 2026-09-26)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (verificato il 2026-09-26)
- [Jetson Orin Nano Super Developer Kit datasheet (PDF, Dec 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificato il 2026-09-26)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificato il 2026-09-26)
- [Jetson Orin product family — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (verificato il 2026-09-26)
- [NVIDIA Developer Forums — "Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)", community thread](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (verificato il 2026-09-26)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla documentazione ufficiale
NVIDIA alle date indicate; non ancora verificato su hardware fisico da
Juxi Technology.*

**Crediti immagine:** le immagini di layout provengono dalla *Jetson Orin
Nano Developer Kit User Guide* ufficiale di NVIDIA (scaricata il 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
