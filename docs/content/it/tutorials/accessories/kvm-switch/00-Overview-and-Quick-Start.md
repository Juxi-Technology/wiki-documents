---
title: "Switch KVM · Panoramica del tutorial"
description: "Commutatore USB tastiera/mouse 2 ingressi / 3 uscite: una tastiera e un mouse (e le periferiche) passano da un computer all'altro con una sola pressione; HUB…"
---

# Switch KVM · Panoramica del tutorial

> Prodotto applicabile: commutatore tastiera/mouse per due computer **KVM&HUB&TTL** di JUXI Technology (USB 2.0)
> Versione v1.0 (2026-10-14) | Il tutorial è suddiviso per moduli funzionali — consulta solo ciò che ti serve

---

## Cerca per modulo

| Cosa voglio fare | Leggi |
|---|---|
| Prima mettere in funzione il dispositivo | Questa pagina → «Avvio rapido» |
| Commutare tastiera/mouse e periferiche tra due computer | [01 - Commutazione tra due computer (pulsante e telecomando IR)](/it/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| Usarlo come HUB USB (uno a tre) | [02 - Funzione HUB (uno a tre)](/it/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Collegarmi via Bluetooth dal telefono, inviare/ricevere dati** | [03 - Bluetooth](/it/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **Cablaggio della porta seriale TTL a 6 pin, dati sul PC** | [04 - Porta seriale TTL (seriale wireless)](/it/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **Conoscere il connettore di espansione a 10 pin** | [05 - Connettore di espansione a 10 pin](/it/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Controllare una scheda di sviluppo / un host senza monitor | [06 - Host senza monitor (scheda di acquisizione + OBS)](/it/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| Domande frequenti e precauzioni | [07 - Domande frequenti e precauzioni](/it/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## Il prodotto in una frase

**Commutatore USB tastiera/mouse 2 ingressi / 3 uscite**: una tastiera e un mouse (e le periferiche) passano da un computer all'altro con una sola pressione; HUB USB a 3 porte integrato; inoltre una **funzione seriale wireless**: collega la porta seriale di una scheda di sviluppo o di un sensore al connettore a 6 pin e i dati vengono trasmessi contemporaneamente alla porta seriale del PC e al telefono via Bluetooth.

## Interfacce a colpo d'occhio

| Posizione | Nome | Descrizione |
|---|---|---|
| Lato sinistro / destro | Porte PC1 / PC2 (Type-C) | Collegano i due computer |
| Lato inferiore | USB-A × 3 | Tastiera/mouse, chiavetta USB, stampante, ecc. — commutati in blocco |
| Lato superiore | Porta di alimentazione (Type-C) | Alimentazione ausiliaria (se l'host non eroga abbastanza corrente) |
| Centro | Pulsante di commutazione | Pressione breve = commutazione; pressione lunga = modalità Bluetooth |
| In alto a sinistra | Ricevitore a infrarossi | Funziona con il telecomando IR |
| In basso a destra | Porta seriale TTL (6 pin) | Funzione seriale wireless (vedi 04) |
| In basso a destra | Connettore a 10 pin | Interfaccia di espansione (vedi 05) |
| In alto a destra | Modulo Bluetooth (integrato) | Funzione seriale wireless (vedi 03) |

**LED di stato**: PC1/PC2 (canale attuale) | Alimentazione | UART seriale (lampeggia durante la trasmissione) | Bluetooth (si accende dopo una pressione lunga)

## Avvio rapido (5 minuti)

1. Computer A → cavo Type-C → porta **PC1**; computer B → porta **PC2** (va bene anche un solo computer — in tal caso è semplicemente un HUB USB);
2. Collega tastiera/mouse (o ricevitore wireless) a una qualsiasi porta **USB-A**;
3. Premi il pulsante di commutazione e controlla il **LED PC1/PC2** per verificare a quale computer sei collegato;
4. Se l'alimentazione dell'host è insufficiente, collega anche l'alimentazione Type-C alla **porta di alimentazione**.

(Illustrazione: risorsa del tutorial 01 – Disposizione delle funzioni)

## Due avvisi importanti

- Questo prodotto **non commuta il video**: ogni computer usa il proprio monitor. Per un host senza monitor, usa la soluzione con scheda di acquisizione (vedi 06);
- Questo prodotto è **USB 2.0**: più che sufficiente per tastiera/mouse, stampanti, chiavette USB e dongle; per memorie ad alta velocità collega direttamente al computer.

---

*(Per i dettagli di ciascun modulo funzionale, clicca la voce corrispondente nella tabella «Cerca per modulo».)*

<RelatedProducts slugs="kvm-switch" />
