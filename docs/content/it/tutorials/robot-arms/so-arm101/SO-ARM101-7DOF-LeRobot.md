---
title: SO-ARM101 Conversione a 7-DOF e utilizzo con LeRobot
description: "Conversione del braccio SO-ARM101 da 6 a 7 gradi di libertà: nuovi giunti e ID dei servomotori, modifiche al codice LeRobot, calibrazione e note d'uso."
---

# SO-ARM101 Conversione a 7-DOF e utilizzo con LeRobot

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

Questo tutorial è rivolto a chi, dopo aver **convertito il SO-ARM101 da 6 servomotori a 7 servomotori**, vuole percorrere l'intero flusso con LeRobot (calibrazione → registrazione → addestramento → deployment). Il codice della versione modificata è copiato e adattato dai sorgenti ufficiali di LeRobot per la **SO-ARM101 a 7 gradi di libertà** (7 servomotori STS3215).

**Differenze principali rispetto alla SO-101 ufficiale (6 servomotori):**

| ID servomotore | Nome del giunto | SO-101 ufficiale (6-DOF) | Descrizione |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Rotazione orizzontale della spalla |
| 2 | `shoulder_lift` | shoulder_lift | Sollevamento della spalla |
| 3 | `elbow_flex` | elbow_flex | Flessione del gomito |
| 4 | `wrist_flex` | wrist_flex | Flessione del polso (piegamento su/giù) |
| 5 | `wrist_yaw` | —(nuovo) | Imbardata del polso (rotazione destra/sinistra di circa 90°), **il servomotore aggiunto in questa modifica** (inserito tra gli ex 4 e 5) |
| 6 | `wrist_roll` | wrist_roll(ID 5→6) | Rollio del polso; era il motore di rollio n. 5, il pezzo stampato non è cambiato e il nome resta invariato |
| 7 | `gripper` | gripper(ID 6→7) | Pinza; l'ID originale era 6, dopo la modifica passa a 7 |

> ⚠️ Attenzione: **i dati, i file di calibrazione e i modelli già addestrati della versione a 6 servomotori sono incompatibili con la conversione a 7-DOF**: occorre rifare tutto da capo seguendo questo tutorial.

## Ordine dei dati dei giunti

Dopo la registrazione, l'ordine delle dimensioni dei giunti di `action` / `observation.state` nei file Parquet è:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Modifiche meccaniche al montaggio

Tra l'ex n. 4 (`wrist_flex`) e l'ex n. 5 (`wrist_roll`) si inseriscono il nuovo servomotore `wrist_yaw` e un pezzo stampato; i motori successivi scalano tutti di una posizione: l'ex motore di rollio n. 5 → posizione 6, la pinza → posizione 7 (i pezzi stampati di questi due motori preesistenti non sono cambiati).

## Modifiche principali al codice

1. **Definizione dei motori portata a 7**: aggiunto `wrist_yaw(5)` (rotazione destra/sinistra); il motore `wrist_roll` originale passa a **ID 6** (sempre rollio, nome invariato); la pinza da `gripper(6)` → `gripper(7)`. La pinza usa ancora `RANGE_0_100` (apertura 0~100), gli altri giunti usano `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **La calibrazione non prevede più il "giunto a giro completo"**: il codice originale codificava `wrist_roll` come giunto a giro completo (0~4095); dopo la conversione a 7-DOF le imbardata/rollio del polso hanno entrambe finecorsa meccanici e non possono compiere un giro completo, quindi in calibrazione si usa `record_ranges_of_motion()` per registrare l'escursione reale di **tutti** i giunti.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Usare il repository modificato o sostituire i file manualmente

Se si è partiti da un clone del repository ufficiale, occorre sostituire/modificare i seguenti file.

### Opzione A: usare direttamente il repository modificato (consigliato)

Usare direttamente il repository già adattato a 7-DOF, senza alcuna modifica manuale.

### Opzione B: sostituzione manuale dopo il git clone del lerobot ufficiale

Copiare dal repository modificato **3 file** nel clone ufficiale:

| File del repository modificato (origine) | Sovrascrivere in (destinazione) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | file omonimo del clone ufficiale |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | file omonimo del clone ufficiale |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | file omonimo del clone ufficiale (**solo correzione di commenti**, la funzionalità non è influenzata, si può non sostituire) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Premessa: il clone ufficiale deve avere la stessa struttura della baseline del repository modificato (versione lerobot 2026-08). Se le versioni sono molto diverse, **non sovrascrivere i file interi**: applicare invece le due modifiche manuali descritte sotto.

### Modifiche manuali in caso di versioni non allineate (solo due punti)

**① Dizionario dei motori** (uno in `so_follower.py` e uno in `so_leader.py`, contenuto identico) — sostituire

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

con

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # Nuovo servomotore, rotazione sinistra/destra
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # Ex motore di rollio n. 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Logica di calibrazione** (`calibrate()` in ciascuno dei due file) — rimuovere il caso speciale del "giunto a giro completo", sostituendo

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

con una sola riga che registra l'escursione reale di tutti i giunti:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

Motivi e rischi della modifica nella sezione successiva "Note sulla calibrazione".

## Note sulla calibrazione

- **Niente più "giunto a giro completo"**: il codice ufficiale originale codificava `wrist_roll` (rollio attorno all'asse dell'avambraccio) come giunto in grado di compiere un giro completo (0~4095). Dopo la conversione a 7-DOF, i giunti del polso n. 5/6 (`wrist_yaw` / `wrist_roll`) hanno entrambi finecorsa meccanici e non possono compiere un giro completo.
- **Rischio**: mantenendo la codifica ufficiale del giro completo, il codice invierebbe comandi di giunto ad angoli fisicamente irraggiungibili, con rischio di danni; per questo in calibrazione si registrano manualmente min/max reali per ogni motore (corrisponde alla modifica ② sopra).
- **I file di calibrazione della versione a 6 servomotori sono incompatibili con la 7-DOF**: dopo la conversione occorre ricalibrare da capo.
- Per il flusso di calibrazione e uso con due bracci (doppio follower) vedere il [SO-ARM101 Tutorial bi-braccio (doppio follower)](./SO-ARM101-Bi-Arm-Tutorial.md).

## Nota sul bi-braccio (bi_so_follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) si limitano a incapsulare il braccio singolo aggiungendo il prefisso `left_`/`right_`, **senza definizioni di motori**. Una volta modificati i file del braccio singolo come sopra, i comandi bi-braccio (`--robot.type=bi_so_follower`) sono automaticamente a 7-DOF. Per il flusso bi-braccio completo (calibrazione, teleoperazione, registrazione del dataset, addestramento, deployment) vedere il [SO-ARM101 Tutorial bi-braccio (doppio follower)](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
