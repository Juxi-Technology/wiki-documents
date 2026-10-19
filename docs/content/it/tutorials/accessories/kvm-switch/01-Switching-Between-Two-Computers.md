---
title: "01 · Commutazione tra due computer (pulsante e telecomando IR)"
description: "Una tastiera e un mouse (e le periferiche collegate alle porte USB-A) commutano tra due computer; ne è collegato uno solo alla volta."
---

# 01 · Commutazione tra due computer (pulsante e telecomando IR)

> [← Torna alla panoramica](/it/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Prodotto applicabile: JUXI Technology KVM&HUB&TTL

Una tastiera e un mouse (e le periferiche collegate alle porte USB-A) commutano tra **due computer**; ne è collegato uno solo alla volta.

## Come commutare

### ① Pulsante
Premi il **pulsante di commutazione** al centro del dispositivo per scambiare PC1 ⇄ PC2. Il **LED PC1/PC2** del lato corrispondente si accende e indica il computer collegato.

### ② Telecomando a infrarossi
Punta il **telecomando a infrarossi** verso il ricevitore IR (angolo in alto a sinistra) e premi il tasto di commutazione.
(La presenza del telecomando dipende dal pacchetto acquistato.)

(Illustrazione: risorsa del tutorial 05 – Commutazione tramite pulsante e infrarossi)

## Due modalità d'uso

| Modalità | Cablaggio | Note |
|---|---|---|
| Entrambi i computer con monitor | Ognuno sul proprio monitor | Tastiera/mouse pronti dopo la commutazione (vedi Avvio rapido in 00) |
| Un computer senza monitor (scheda di sviluppo, ecc.) | L'altro con monitor + soluzione scheda di acquisizione | Vedi [06 - Host senza monitor (scheda di acquisizione + OBS)](/it/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Comportamento normale durante la commutazione

- Le periferiche sulle porte USB-A scompaiono temporaneamente dal computer «attuale» e compaiono sull'altro (dongle/stampanti possono richiedere qualche secondo per la nuova enumerazione);
- **Il canale Bluetooth wireless non è influenzato dalla commutazione** (la connessione resta attiva). La porta seriale del PC si disconnette brevemente durante la commutazione e si ripristina automaticamente al ritorno (vedi [03](/it/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/it/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Risoluzione dei problemi

**Nessuna reazione alla pressione?** Controlla il LED PC1/PC2 per il canale attuale; assicurati che il computer di destinazione sia collegato via Type-C e acceso; premi di nuovo per tornare al computer originale.

<RelatedProducts slugs="kvm-switch" />
