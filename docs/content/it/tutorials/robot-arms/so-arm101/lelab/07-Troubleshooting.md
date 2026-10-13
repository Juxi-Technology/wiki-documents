---
title: "7 · Risoluzione dei problemi"
description: "Risoluzione dei problemi di LeLab per sintomo: conflitti di porta, problemi USB e seriali, errori di calibrazione e registrazione, e cosa controllare."
---

# 7 · Risoluzione dei problemi

> **Precedente:** [06 Addestrare ed eseguire l'inferenza](06-Train-and-Inference.md)

Raggruppati per sintomo.

## La pagina non si apre, o una porta è occupata

Le porte **8000** e **8080** sono di LeLab. Un processo rimasto attivo è la causa abituale — uno che hai chiuso chiudendo il terminale invece che con `Ctrl+C`.

```bash
lelab --stop
```

Libera entrambe le porte. Per controllare prima di avviare:

```bash
curl http://localhost:8000/health
```

Una risposta JSON significa che qualcosa è in esecuzione sulla 8000.

## In modalità `--dev` la pagina è vuota o dà 404

Vite serve l'interfaccia su **:8080**; l'API gira su **:8000**. Naviga su `:8080`. La porta 8000 in `--dev` ti dà un'API senza interfaccia.

## Le braccia non compaiono

Controlla che le porte siano visibili al tuo utente. Su Linux, un gruppo mancante fa sembrare che il braccio non ci sia:

```bash
ls /dev/ttyACM*
groups | grep dialout
```

Se manca `dialout`:

```bash
sudo usermod -aG dialout $USER
```

Poi **esegui il logout e rientra** — il gruppo viene letto al login, quindi un nuovo terminale non basta.

### Viene trovato un solo braccio

Usa **due porte USB separate**, non un hub; entrambe le braccia si enumerano come lo stesso tipo di dispositivo e un hub condiviso può presentarle in modo inaffidabile. Per identificare una porta, scollega un braccio e osserva quale voce dell'elenco scompare.

## Devo ricalibrare ogni volta

I file di calibrazione stanno sotto `~/.cache/huggingface/lerobot/` — cioè sotto `~/.cache/`. Gli strumenti di pulizia della cache e i riavvii dei container li rimuovono.

- Fai il backup di `~/.cache/huggingface/lerobot/calibration/` in un posto durevole.
- In un container, monta quella directory come volume.

### Un braccio calibrato si comporta in modo strano senza chiedere di essere ricalibrato

Controlla che il **profilo** selezionato appartenga a quel braccio fisico. I profili sono legati ai punti zero di un braccio; scambiare i bracci significa ricalibrare.

## Un'immagine della telecamera è capovolta o di lato

Imposta la **Rotation** della telecamera nella [scheda Calibration](03-Calibration.md): 0°, 90°, 180° o 270° in senso orario. Una telecamera al polso capovolta è 180°.

**90° e 270° scambiano le dimensioni di uscita** — una cattura 640 × 480 diventa 480 × 640.

## La policy addestrata non fa nulla di utile

In ordine — le prime due sono molto più comuni di un addestramento andato male:

1. **Rotazione della telecamera.** Conferma che l'inferenza usi la rotazione usata al momento della registrazione. 0° e 180° hanno dimensioni dell'immagine identiche, quindi nulla ti avvisa.
2. **Associazione della telecamera.** Se la telecamera chiamata `wrist` durante la registrazione ora è una telecamera fisica diversa, la policy vede l'immagine sbagliata.
3. **Posizione di partenza e descrizione dell'attività.** L'inferenza deve partire dalla disposizione da cui sono partite le dimostrazioni.
4. **Checkpoint.** Prova uno precedente.

## Usare un telefono come telecamera

I browser concedono l'accesso alla telecamera (`getUserMedia`) solo su **HTTPS**, tranne su `localhost`, quindi un telefono che si connette via LAN viene rifiutato.

Guida alla configurazione: [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). I certificati sono autofirmati, quindi il browser mostra un avviso da accettare.

L'installazione predefinita **non** parte con HTTPS; le telecamere del telefono richiedono l'avvio manuale con i flag dei certificati descritti lì.

## Impossibile aprire un dataset — "not downloaded yet"

LeRobot scrive l'indice del dataset quando una registrazione **termina correttamente**. Una sessione terminata a metà episodio può lasciare una directory che sembra completa ma non lo è. I dati dell'episodio di solito sono ancora su disco; manca l'indice. Riregistra la sessione e fermala con il pulsante di stop.

## L'addestramento dice che manca un pacchetto

Alcuni tipi di policy e funzionalità opzionali di addestramento richiedono dipendenze che non sono installate per impostazione predefinita. La scheda Training propone di installarle quando ne selezioni una; attendi che l'installazione in background termini prima di avviare il job. Il log di addestramento nomina il pacchetto se preferisci installarlo a mano.

## Non appare alcuna notifica di aggiornamento

Per scelta: il controllo vale solo per le installazioni fatte da git. Un'**installazione modificabile** (`pip install -e .`) è una copia di lavoro e non viene controllata. Aggiornale con `git pull`.

## Ancora bloccato

Raccogli la **console del browser** e il **terminale che esegue `lelab`** — il server registra la richiesta fallita. La maggior parte di questi errori è a un passo di distanza dall'ultima cosa che hai modificato.

---

> **Torna all'inizio:** [01 Panoramica](01-Overview.md) · [Indice del tutorial](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
