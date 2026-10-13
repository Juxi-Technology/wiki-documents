---
title: "6 · Addestrare ed eseguire l'inferenza"
description: "Addestrare ed eseguire l'inferenza con LeLab: scegli dataset e tipo di policy (ACT per primo), addestra in locale o come job cloud su Hugging Face, poi esegui l'inferenza sul braccio follower."
---

# 6 · Addestrare ed eseguire l'inferenza

> **Precedente:** [05 Registrare un dataset](05-Record-Dataset.md)
> **Successivo:** [07 Risoluzione dei problemi](07-Troubleshooting.md)

L'addestramento trasforma il dataset in una **policy** — un modello che mappa le immagini delle telecamere alle posizioni dei giunti. L'inferenza esegue quella policy sul braccio follower.

## Addestramento

Apri la scheda **Training** e scegli:

| Scelta | Note |
|---|---|
| **Dataset** | Un dataset locale, o uno dall'Hub |
| **Tipo di policy** | **ACT** è la prima scelta abituale per un braccio singolo. Sono disponibili anche Diffusion Policy, SmolVLA e la famiglia π₀ |
| **Dove eseguire** | Questa macchina, o un job cloud di Hugging Face |
| **Durata dell'addestramento** | Numero di passi. Osserva la loss invece di presumere che di più sia meglio |

La scheda trasmette il log di addestramento e mostra i checkpoint mentre vengono scritti.

### Locale o cloud

| | Locale | Job cloud Hugging Face |
|---|---|---|
| Requisiti | Una GPU su questa macchina | Un account Hugging Face con accesso |
| Velocità | Dipende dalla tua GPU | Macchina fissa, scelta per ogni job |
| Ideale per | Dataset piccoli, sperimentare | Esecuzioni più lunghe |

L'opzione cloud è il motivo per cui un portatile basta per il resto del flusso di lavoro: registra in locale, addestra in remoto.

### Extra delle policy

Alcuni tipi di policy richiedono dipendenze che LeLab non installa per impostazione predefinita. Selezionandone uno ti viene proposto di installarle — accetta e attendi che l'installazione in background termini prima di avviare il job. Lo stesso meccanismo copre gli extra opzionali di addestramento.

## Checkpoint

L'addestramento scrive i checkpoint periodicamente, non solo alla fine, quindi un'esecuzione interrotta lascia comunque un modello utilizzabile. Ogni nome di checkpoint porta il suo numero di passo. Prova uno precedente se la loss ha iniziato a salire.

## Inferenza

Apri la scheda **Inference**:

1. Conferma che entrambe le braccia siano collegate e calibrate.
2. Seleziona la **policy** — un checkpoint locale, o un modello dall'Hub.
3. Conferma le **telecamere** e la loro **rotazione**.
4. Avvia l'inferenza, e libera l'area di lavoro.

### Rotazione e associazione delle telecamere

**Usa la stessa rotazione della registrazione.** È la causa più comune per cui una policy ben addestrata non fa nulla di utile sul robot reale, e nulla ti avvisa: 0° e 180° producono dimensioni dell'immagine identiche.

Lo stesso vale per l'**associazione** delle telecamere. Se la telecamera chiamata `wrist` durante la registrazione ora è una telecamera fisica diversa, la policy vede l'immagine sbagliata.

Se tutto questo è corretto e il braccio continua a fallire, guarda di nuovo il dataset — vedi [pagina 5](05-Record-Dataset.md).

### Intervenire

Ferma l'inferenza prima di allungare la mano verso il braccio. Una correzione fatta a mano non è segnale di addestramento a meno che tu non registri un nuovo episodio e riaddestri.

## Replay

Il replay riesegue un episodio registrato sul braccio follower. Riproduce le posizioni dei giunti registrate, quindi sembra corretto anche se la policy è scarsa — verifica l'hardware e il dataset, non la policy. Usa l'inferenza per vedere cosa fa la policy.

---

> **Successivo:** [07 Risoluzione dei problemi](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
