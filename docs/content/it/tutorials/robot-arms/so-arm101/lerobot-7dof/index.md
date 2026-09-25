---
title: "SO-ARM101 Braccio robotico 7 assi · Tutorial"
description: "Prima di iniziare il corso a 7DOF: verifica della mappatura tra servomotori e giunti, cosa cambia rispetto al braccio a 6 servomotori e come sostituire i file."
---

# SO\-ARM101 Braccio robotico 7 assi · Tutorial

# SO\-ARM101 7\-DOF · Preparativi prima dell'esecuzione

> Questa guida è rivolta a chi, dopo aver **convertito il SO\-ARM101 da 6 servomotori a 7 servomotori**, vuole percorrere l'intero flusso con LeRobot (calibrazione → registrazione → addestramento → deployment).
> Codice di riferimento: questo repository (`lerobot-7dof`), un fork del lerobot ufficiale in cui sono state modificate solo le configurazioni dei motori SO.
> 
> 

---

## 0\. Prima di tutto, verifica il tuo braccio robotico

7 servomotori (tutti STS3215), corrispondenza tra ID servomotore e giunto:

|**ID servomotore**|**Nome del giunto**|**Descrizione**|
|---|---|---|
|1|`shoulder_pan`|Rotazione orizzontale della spalla|
|2|`shoulder_lift`|Sollevamento della spalla|
|3|`elbow_flex`|Flessione del gomito|
|4|`wrist_flex`|Flessione del polso (piegamento su/giù)|
|5|`wrist_yaw`|Imbardata del polso (rotazione destra/sinistra di circa 90°) · **il servomotore aggiunto in questa modifica** (inserito tra gli ex 4 e 5)|
|6|`wrist_roll`|Rollio del polso · era il motore di rollio n. 5, ID 5→6, pezzo stampato invariato, nome invariato|
|7|`gripper`|Pinza · ID originale = 6, dopo la modifica passa a 7|

Ordine dei dati dei giunti (l'ordine delle dimensioni dei giunti di `action` / `observation.state` nei file Parquet dopo la registrazione):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Attenzione: **i dati, i file di calibrazione e i modelli già addestrati della versione a 6 servomotori sono incompatibili con questo repository**, occorre rifare tutto da capo seguendo la procedura riportata sotto.

---

## 1\. Se hai clonato il repository ufficiale, quali file sostituire/modificare

### Opzione A: usare direttamente il codice di questo repository (consigliato)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opzione B: sostituzione manuale dopo il git clone del lerobot ufficiale

Da questo repository copiare **3 file** nel clone ufficiale:

|File di questo repository (origine)|Sovrascrivere in (destinazione)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|file omonimo del clone ufficiale|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|file omonimo del clone ufficiale|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|file omonimo del clone ufficiale (**solo correzione di commenti**, la funzionalità non è influenzata, si può non sostituire)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <clone ufficiale>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clone ufficiale>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Premessa: il tuo clone ufficiale deve avere la stessa struttura della baseline di questo repository (versione lerobot 2026\-08). Se le versioni sono molto diverse, **non sovrascrivere i file interi**, applica invece le due "modifiche manuali" descritte sotto.
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

`bi_so_follower / bi_so_leader (src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/) si limitano a incapsulare il braccio singolo aggiungendo il prefisso left_/right_,`**`senza definizioni di motori`**`. Basta che`**`i file del braccio singolo qui sopra`**` siano stati modificati correttamente, e i comandi bi-braccio (--robot.type=bi_so_follower) sono automaticamente a 7-DOF.`

## 1. Ambiente LeRobot

- [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Sostituire i file (adattamento a 7DOF)

- [Sostituire i file (adattamento a 7DOF)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Porte seriali

- [Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Calibrazione

- [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Teleoperazione

- [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Con telecamera

- [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Raccolta dataset

- [Rivedere e riprodurre il dataset](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Note sulla raccolta del dataset](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Registrare un account Hugging Face (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Caricare il dataset su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Raccolta del dataset tramite insegnamento-Stretta di mano 200](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Raccolta del dataset tramite insegnamento](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Addestramento

- [Configurazione dell'ambiente di addestramento su GPU cloud](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Comando di addestramento-ACT (consigliato per iniziare)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Comando di addestramento-Diffusion](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Comando di addestramento-pi0.5](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Comando di addestramento-pi0 (risultati migliori)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Comando di addestramento-pi0fast](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Comando di addestramento-smolvla (consigliato per progredire)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Caricare il modello su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Algoritmi di apprendimento per imitazione supportati da LeRobot](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Addestramento su Ubuntu locale](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Ottenere il file dei pesi del modello](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Suggerimenti sui parametri di addestramento](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [Curve di addestramento in tempo reale con wandb](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Deployment

- [Descrizione dei comandi](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Comando di inferenza-ACT](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Comando di inferenza-Diffusion](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Comando di inferenza-pi0.5](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Comando di inferenza-pi0](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Comando di inferenza-smolvla](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Bug comuni e soluzioni](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [Inferenza su NVIDIA DGX Spark](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [Inferenza su D-Robotics RDK S100](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
