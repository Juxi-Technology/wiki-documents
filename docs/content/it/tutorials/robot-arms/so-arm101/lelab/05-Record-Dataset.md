---
title: "5 · Registrare un dataset"
description: "Registrare un dataset in LeLab: imposta repo_id, descrizione del compito, numero di episodi e telecamere nella pagina Recording, poi acquisisci le dimostrazioni come LeRobotDataset."
---

# 5 · Registrare un dataset

> **Precedente:** [04 Teleoperazione](04-Teleoperation.md)
> **Successivo:** [06 Addestrare ed eseguire l'inferenza](06-Train-and-Inference.md)

Un dataset è una raccolta di **episodi**, ognuno una singola dimostrazione dell'attività dall'inizio alla fine. Registrare è teleoperazione più un controllo di registrazione.

## Configurazione

Apri la scheda **Recording** e compila:

| Campo | Cosa inserire |
|---|---|
| **Nome del dataset** (`repo_id`) | `your-name/task-name`, es. `juxi/pick-up-the-cube`. La parte `name/` deve essere il tuo nome utente Hugging Face se prevedi di caricarlo |
| **Descrizione dell'attività** | Una frase, es. `pick up the cube and drop it in the box`. È il testo su cui la policy è condizionata |
| **Episodes** | Quante dimostrazioni — vedi sotto |
| **Telecamere** | Quali telecamere configurate includere, e a quale risoluzione e frame rate |

### Quanti episodi

**Da 30 a 50** per un semplice pick-and-place. Un'attività molto ripetitiva ne richiede meno; un'attività con molta variabilità ne richiede di più.

La coerenza conta più della quantità: la stessa posizione di partenza, la stessa inquadratura della telecamera e la stessa descrizione dell'attività in ogni episodio. Cinquanta dimostrazioni quasi identiche battono cento dimostrazioni varie. Varia solo ciò a cui vuoi che la policy sia robusta — se ogni episodio inizia con il cubo nello stesso punto, la policy impara quel punto.

## Durante la registrazione

| Tasto | Azione |
|---|---|
| `SPACE` o `→` | Termina l'episodio corrente, inizia il successivo |
| `DEL` o `←` | Scarta l'episodio appena registrato e rifallo |

La scheda mostra un contatore di episodi e un contatore di sessione.

Termina l'episodio quando l'attività è completata — non dopo che il braccio è tornato alla partenza. Il ritorno è compito dell'episodio successivo.

Rifai un episodio quando hai sbagliato con il braccio, hai spostato l'oggetto, o non hai completato l'attività. La policy impara da tutto ciò che c'è nel dataset, compresi gli errori.

## Arresto

Ferma la sessione una volta che hai abbastanza episodi. **La registrazione viene finalizzata quando ferma** — è lì che viene scritto l'indice del dataset. Una sessione terminata a metà episodio può lasciare un dataset che risulta incompleto.

## Dove finiscono i dati

Per impostazione predefinita sotto `~/.cache/huggingface/lerobot/`, con chiave il `repo_id` che hai scelto. Nulla viene caricato finché non lo carichi dalla scheda **Upload**.

## Controlla la registrazione

Apri la scheda **Datasets** e seleziona il dataset. Puoi scorrere gli episodi fotogramma per fotogramma, una telecamera alla volta, con una traccia del movimento dei giunti.

Fallo prima dell'addestramento. Cattura ciò che è invisibile mentre tieni il braccio:

- Una telecamera ruotata male — i fotogrammi sono di lato
- Un episodio con un tratto di tempo morto all'inizio
- Una telecamera al polso che è uscita dall'inquadratura a metà

Riregistrare costa qualche minuto; scoprirlo dopo l'addestramento costa l'intera sessione di addestramento.

---

> **Successivo:** [06 Addestrare ed eseguire l'inferenza](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
