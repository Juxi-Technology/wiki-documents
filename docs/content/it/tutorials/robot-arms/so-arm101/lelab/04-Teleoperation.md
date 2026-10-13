---
title: "4 · Teleoperazione"
description: "Teleoperare con LeLab: muovi il braccio leader e il follower lo segue mostrando in tempo reale le posizioni dei giunti; è anche il modo più rapido per verificare la calibrazione."
---

# 4 · Teleoperazione

> **Precedente:** [03 Collegamento e calibrazione](03-Calibration.md)
> **Successivo:** [05 Registrare un dataset](05-Record-Dataset.md)

Muovi il braccio leader a mano; il follower copia il movimento. Così registri le dimostrazioni, ed è il modo più rapido per verificare la calibrazione.

## Avvio

1. Apri la scheda **Teleoperation**.
2. Conferma porte e profilo di calibrazione — LeLab li ricorda dalla calibrazione.
3. Avvia la teleoperazione.
4. Muovi il braccio leader.

La scheda trasmette le posizioni dei giunti mentre è in esecuzione. Premi stop quando hai finito.

**Stop è ciò che mette in posizione il follower.** Chiudere la scheda o terminare il processo lascia il braccio dov'è.

## Cosa controllare

| Controllo | Perché |
|---|---|
| Il follower segue in modo fluido, senza ritardo o tremolio | Un inseguimento approssimativo diventa dati di addestramento inutilizzabili |
| L'escursione del follower corrisponde a quella del leader | Fermarsi prima o toccare un limite significa che un giunto è mal calibrato — torna alla [pagina 3](03-Calibration.md) |
| Entrambe le braccia si muovono nella stessa direzione | Un follower invertito significa che un giunto è stato calibrato nella direzione sbagliata |
| Niente va in collisione agli estremi | Muoviti su tutta l'escursione che prevedi di usare |

Se il movimento è sbagliato ma non rotto — offset, un giunto invertito, escursione ridotta — ricalibra invece di compensare. Un braccio mal calibrato produce un dataset che addestra la policy a fare la cosa sbagliata.

## Telecamere

Se le telecamere sono configurate, la vista di teleoperazione ne mostra le anteprime.

- Telecamera al polso: mostra la pinza e ciò che sta per afferrare?
- Telecamera fissa: mostra l'intera area di lavoro?
- Una delle due immagini è di lato o capovolta? Sistema la **rotazione** nella [scheda di calibrazione](03-Calibration.md) prima di registrare.

I fotogrammi registrati durante la teleoperazione sono l'unica cosa che la policy vede.

---

> **Successivo:** [05 Registrare un dataset](05-Record-Dataset.md)

<RelatedProducts slugs="so-arm101" />
