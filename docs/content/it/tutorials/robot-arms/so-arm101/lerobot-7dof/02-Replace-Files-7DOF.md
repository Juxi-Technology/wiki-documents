---
title: "Passo 2: Sostituire i file (adattamento a 7DOF)"
description: "Quali file sostituire o modificare per convertire il clone ufficiale di lerobot a 7DOF: Opzione A (codice del repository) o B (manuale), più due modifiche."
---

# Passo 2: Sostituire i file (adattamento a 7DOF)

## 1\. Se hai clonato il repository ufficiale, quali file sostituire/modificare

### Opzione A: usare direttamente il codice di questo repository (consigliato)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opzione B: sostituzione manuale dopo il git clone del lerobot ufficiale

Da questo repository copiare **3 file** nel clone ufficiale:

|File di questo repository (origine)|Sovrascrivere in (destinazione)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|file omonimo del clone ufficiale|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|file omonimo del clone ufficiale|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Premessa: il tuo clone ufficiale deve avere la stessa struttura della baseline di questo repository (versione lerobot 2026\-09).
> 
> Se le versioni sono molto diverse, **non sovrascrivere l'intero file**, applica invece le due "modifiche manuali" descritte sotto.
> 
> 

### Modifiche manuali in caso di versioni non allineate (solo due punti)

**① Dizionario dei motori** (uno in `so_follower.py` e uno in `so_leader.py`, contenuto identico) —— sostituire

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

con

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # Nuovo servomotore, rotazione sinistra/destra
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # Ex motore di rollio n. 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Logica di calibrazione** (`calibrate()` in ciascuno dei due file) —— rimuovere il caso speciale del "giunto a giro completo": sostituire

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

con una sola riga, che registra l'escursione reale di tutti i giunti:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Perché: la versione originale considerava `wrist_roll` (rollio attorno all'asse dell'avambraccio) come un giunto in grado di compiere un giro completo (0\~4095) e ne codificava l'intera escursione in modo fisso. Dopo la conversione a 7\-DOF, i giunti del polso n. 5/6 (yaw / roll) **hanno entrambi finecorsa meccanici e non possono compiere un giro completo**; impostare forzatamente il giro completo farebbe inviare al codice comandi di giunto ad angoli fisicamente irraggiungibili, con rischio di danni. Ora in calibrazione si registrano manualmente i min/max reali di ogni motore.
> 
> 

### Nota sul bi-braccio (doppio follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) si limitano a incapsulare il braccio singolo aggiungendo il prefisso `left_`/`right_`, **senza definizioni di motori**. Basta che **i file del braccio singolo qui sopra** siano stati modificati correttamente, e i comandi bi-braccio (`--robot.type=bi_so_follower`) sono automaticamente a 7\-DOF.

