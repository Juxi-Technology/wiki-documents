---
title: "06 · Host senza monitor (scheda di acquisizione + OBS)"
description: "Dare tastiera e mouse a una «scheda di sviluppo / scheda madre senza monitor» — senza doverle fornire un monitor dedicato: il video passa attraverso una sche…"
---

# 06 · Host senza monitor (scheda di acquisizione + OBS)

> [← Torna alla panoramica](/it/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Prodotto applicabile: JUXI Technology KVM&HUB&TTL

Dare tastiera e mouse a una «scheda di sviluppo / scheda madre senza monitor» — **senza doverle fornire un monitor dedicato**: il video passa attraverso una scheda di acquisizione verso il computer, tastiera e mouse passano attraverso lo switch KVM.

## Come funziona

```
Scheda di sviluppo (senza monitor) ──video──→ scheda di acquisizione ──USB──→ il tuo computer (immagine in una finestra OBS)
Scheda di sviluppo (senza monitor) ──tastiera/mouse──→ ←── switch KVM ──→ il tuo computer (stessa tastiera/mouse)
```

## Procedura

**① Collegare il video** (porta l'uscita video dell'host a una **scheda di acquisizione HDMI 4K**, il cui lato USB va al tuo computer):

| Uscita dell'host | Cablaggio |
|---|---|
| HDMI | Cavo HDMI → scheda di acquisizione |
| Micro HDMI (Raspberry Pi, ecc.) | Adattatore Micro-HDMI → cavo HDMI → scheda di acquisizione |
| DP | Adattatore DP-HDMI → cavo HDMI → scheda di acquisizione |

**② Collegare tastiera/mouse**: collega tastiera/mouse (o ricevitore wireless) alla porta USB-A di questo prodotto, poi premi il pulsante per **commutarli sulla scheda di sviluppo**;

**③ Vedere e operare**: sul computer aggiungi un «dispositivo di acquisizione video» in **OBS** o **PotPlayer** — guarda lo schermo della scheda e digita sulla tastiera.

(Illustrazione: risorsa del tutorial 06 – Scheda + scheda di acquisizione in azione, 07 – cablaggio della scheda di acquisizione, 08 – guida OBS, 09 – guida PotPlayer)

## Suggerimenti

- Collega la scheda di acquisizione **direttamente al computer** (non attraverso le porte USB del KVM) per un'immagine stabile;
- Dopo aver commutato tastiera/mouse, la scheda non risponde più ad essi — una pressione del pulsante li riporta indietro.

<RelatedProducts slugs="kvm-switch" />
