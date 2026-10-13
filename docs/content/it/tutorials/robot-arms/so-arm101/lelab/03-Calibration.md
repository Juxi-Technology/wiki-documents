---
title: "3 · Collegamento e calibrazione"
description: "Collegare e calibrare entrambi i bracci in LeLab: note sul cablaggio USB, permessi seriali su Linux e calibrazione guidata che registra punto zero e corsa di ogni giunto."
---

# 3 · Collegamento e calibrazione

> **Precedente:** [02 Installazione e avvio](02-Install.md)
> **Successivo:** [04 Teleoperazione](04-Teleoperation.md)

La calibrazione registra il punto zero e l'escursione di ogni giunto. Fallo una volta per braccio; rifallo dopo lo smontaggio o se il file di calibrazione va perso.

## Prima di iniziare

- Entrambe le braccia montate, servo con i loro ID assegnati.
- Entrambe le braccia alimentate.
- Un cavo USB per braccio, in **due porte USB separate** — un hub condiviso a volte le enumera in modo inaffidabile.

### Linux: permessi della seriale

```bash
sudo usermod -aG dialout $USER
```

Poi **esegui il logout e rientra**. Senza questo, LeLab trova il braccio ma ogni lettura fallisce con un errore di permessi. Windows e macOS non richiedono nulla.

## Quale braccio è quale

| Braccio | Nome LeRobot | LeLab lo chiama |
|---|---|---|
| Quello che muovi a mano | `so101_leader` | **teleop** |
| Quello che segue | `so101_follower` | **robot** |

Calibra prima il leader. Scambiare i due è la causa abituale di un braccio appena calibrato che si comporta in modo strano.

## Il flusso

Apri la scheda **Calibration** e procedi con un braccio alla volta:

1. **Scegli il dispositivo** — leader (teleop) o follower (robot).
2. **Scegli la porta seriale.** LeLab elenca i dispositivi seriali USB che rileva. Per distinguerli, scollega un braccio e guarda quale voce scompare. La scelta viene ricordata.
3. **Scegli un profilo di calibrazione** — uno esistente o uno nuovo. Il profilo contiene le posizioni zero salvate; se questo braccio è già stato calibrato, riusa il suo profilo.
4. **Segui i passaggi guidati.** LeLab percorre ogni giunto a turno; porta il giunto nella posizione richiesta e conferma. Nessun prompt da tastiera.
5. **Ripeti per l'altro braccio** — con il suo profilo e la sua porta.

> Ogni profilo appartiene a un braccio fisico. Scambiare i due bracci significa ricalibrare.

## Telecamere

Le telecamere si configurano nella stessa scheda. Il nome di ogni telecamera (`front`, `wrist`, …) è la chiave che vede la policy, quindi usa nomi che riconoscerai in un log di addestramento.

Le telecamere si possono montare prima o dopo la calibrazione; la calibrazione non dipende da esse. Mantieni stabile l'associazione — scambiare quale telecamera fisica si chiama `wrist` tra registrazione e inferenza fa comportare una policy addestrata in modo insensato.

### Rotazione

Se una telecamera è montata capovolta o di lato, imposta la sua **Rotation**: 0°, 90°, 180° o 270° in senso orario. Una telecamera al polso capovolta è 180°.

La rotazione viene salvata per telecamera e applicata all'anteprima di configurazione, all'anteprima di teleoperazione, ai fotogrammi registrati e all'inferenza. I profili senza impostazione di rotazione sono trattati come 0°.

- **90° e 270° scambiano le dimensioni di uscita.** Una cattura 640 × 480 diventa 480 × 640.
- **Le dimensioni delle immagini di un checkpoint non rivelano l'orientamento.** 0° e 180° producono dimensioni identiche ma immagini opposte. Prima dell'inferenza, imposta la rotazione usata durante la registrazione — vedi [pagina 6](06-Train-and-Inference.md).

## Cosa viene salvato

| File | Contenuto |
|---|---|
| `~/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/*.json` | Profili del leader |
| `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/*.json` | Profili del follower |
| `~/.cache/huggingface/lerobot/ports/leader_port.txt` | Porta seriale del leader |
| `~/.cache/huggingface/lerobot/ports/follower_port.txt` | Porta seriale del follower |

Questi file stanno sotto `~/.cache/`, quindi gli strumenti di pulizia della cache possono eliminarli. Se un braccio calibrato chiede di essere ricalibrato, controlla qui — vedi [Risoluzione dei problemi](07-Troubleshooting.md).

---

> **Successivo:** [04 Teleoperazione](04-Teleoperation.md)

<RelatedProducts slugs="so-arm101" />
