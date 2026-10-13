---
title: "1 · Panoramica"
description: "LeLab riunisce il flusso di lavoro LeRobot — calibrare, teleoperare, registrare, addestrare, riprodurre — in un'unica finestra del browser: funzioni, requisiti e posizione dei file."
---

# 1 · Panoramica

> **Successivo:** [02 Installazione e avvio](02-Install.md)

LeLab è un'app web che riunisce il flusso di lavoro di LeRobot — calibra, teleopera, registra, addestra, riproduci — in un'unica finestra del browser.

## Cosa puoi fare

| Pagina | Cosa fa |
|---|---|
| **Calibration** (Calibrazione) | Calibrazione guidata di entrambe le braccia |
| **Teleoperation** (Teleoperazione) | Muovi il braccio leader; il follower lo segue, con streaming dei giunti in tempo reale |
| **Recording** (Registrazione) | Registra episodi in un LeRobotDataset, con le telecamere |
| **Datasets** (Dataset) | Sfoglia gli episodi su disco, fotogramma per fotogramma, con una traccia del movimento dei giunti |
| **Training** (Addestramento) | Avvia un job di addestramento LeRobot e osserva i log |
| **Inference** (Inferenza) | Esegue una policy addestrata sul braccio follower |
| **Upload** (Caricamento) | Carica il tuo dataset sull'Hugging Face Hub |

## LeLab e LeRobot

LeRobot è la libreria — driver dei robot, formato dei dataset, codice di addestramento. LeLab è un server FastAPI che la richiama, più un front end React che comunica con quel server tramite HTTP e WebSocket.

- Tutto ciò che LeLab non espone resta comunque raggiungibile dalla riga di comando `lerobot-*`.
- LeLab non include LeRobot. Installare LeLab installa LeRobot.

## Requisiti

| | |
|---|---|
| Robot | **Braccia SO-101 leader + follower** — l'unica configurazione supportata |
| Computer | Linux, macOS o Windows |
| Python | **3.12 o superiore** |
| Node.js | 22 — solo per `lelab --dev` |
| USB | Due porte libere, una per braccio |

Calibrazione, teleoperazione e registrazione girano su un portatile. L'addestramento è il passo pesante, e LeLab può eseguirlo sull'Hugging Face Hub — vedi [pagina 6](06-Train-and-Inference.md).

## Dove finiscono i file

Sotto `~/.cache/huggingface/lerobot/`:

| Percorso | Contenuto |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | File di calibrazione del leader |
| `calibration/robots/so101_follower/*.json` | File di calibrazione del follower |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Ultime porte seriali usate |
| `saved_configs/*.txt` | Ultimo profilo di calibrazione selezionato |

I dataset vanno dove li mette LeRobot — per impostazione predefinita lo stesso albero.

Svuotare quella cache, o reinstallare, significa ricalibrare entrambe le braccia. Vedi [Risoluzione dei problemi](07-Troubleshooting.md).

## Terminologia

LeRobot nomina le braccia per ruolo; l'API di LeLab usa un secondo insieme di nomi per le stesse due braccia:

| Tu dici | LeRobot / LeLab dicono |
|---|---|
| Il braccio che muovi a mano | **leader** · **teleop** |
| Il braccio che segue | **follower** · **robot** |

---

> **Successivo:** [02 Installazione e avvio](02-Install.md)

<RelatedProducts slugs="so-arm101" />
