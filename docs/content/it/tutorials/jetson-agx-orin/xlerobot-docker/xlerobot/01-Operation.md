---
title: Comandi XLeRobot
---

# Comandi XLeRobot

> **Appartiene a**: [xlerobot/](01-Operation.md) — XLeRobot completo (due bracci + base)
> **Prerequisito**: leggere prima [deployment/](../deployment/01-Overview.md) ed entrare nel container
> **L'altro percorso**: [lerobot/](../lerobot/01-Operation.md) (braccio SO-101 singolo / LeKiwi)
> **Successivo**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **Questa parte riguarda solo l'esecuzione dell'XLeRobot completo** (due bracci + base).

Per usare la riga di comando `lerobot-*` con un **braccio SO-101 singolo** o con il **LeKiwi**, vada a
[lerobot/](../lerobot/01-Operation.md) —— i due percorsi non sono uguali.

Contenuti di questa parte: calibrazione, teleoperazione, tabella dei tasti, registrazione dei dati, addestramento, inferenza.

---

## 0. Prima scegliere il percorso ⚠️

Nell'immagine ci sono **due progetti**, con modalità di esecuzione diverse. **Guardi prima questa tabella per stabilire quale percorso seguire:**

| Il suo hardware | Quale percorso | Punto d'ingresso |
|---|---|---|
| **XLeRobot completo** (due bracci + base) | ✅ **questa parte** | gli script di esempio in `examples/` |
| **Braccio SO-101 / SO-100 singolo** | ➡️ [lerobot/](../lerobot/01-Operation.md) | riga di comando `lerobot-*` |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | riga di comando `lerobot-*` |

**Perché due percorsi separati**: gli strumenti a riga di comando `lerobot-calibrate`, `lerobot-record`, `lerobot-teleoperate`
**riconoscono solo i tipi di robot che importano esplicitamente** (14 robot originali, **`xlerobot` non c'è**).
Se lo si passa comunque, l'errore è:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**Il punto d'ingresso per XLeRobot sono gli script di esempio in `examples/`** (importano direttamente `XLerobot`).

I due percorsi **condividono lo stesso ambiente** —— si può passare dall'uno all'altro in qualsiasi momento, senza reinstallare nulla.

> Nei file di esempio è descritto l'uso a due processi host/client, ma **quella parte è commentata**:
> in pratica si usa la **modalità diretta** —— basta un solo terminale e non serve avviare un host a parte.

---

## 1. Prima di eseguire la teleoperazione per la prima volta: installare due librerie X11 ⚠️

Nell'immagine mancano due librerie X11: **se non si installano, la finestra di visualizzazione di rerun va in crash**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**Il robot in sé non ne risente** (la teleoperazione funziona regolarmente e i tasti rispondono): semplicemente non si vede la finestra di visualizzazione,
e in più il canale dati di rerun si intasa, riempiendo il terminale di WARN e rallentando la teleoperazione.

**In un altro terminale**, installarle nel container:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root` non si può omettere** —— l'immagine viene eseguita di default con l'utente `jetson`, e anche
`docker exec` entra con questa identità, mentre per installare i pacchetti apt servono i privilegi di root. Senza questo parametro si ottiene:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

E inoltre **i pacchetti non si installano, in silenzio**: rerun continuerà a crashare, ed è facile concludere erroneamente che «installarli non sia servito».

Dopo l'installazione **riavvii lo script di teleoperazione** (uscire con `Ctrl+C` e rilanciare).

> ⚠️ Questa modifica **vale solo per questa esecuzione** —— il container usa `--rm`, quindi sparisce all'uscita,
> e le librerie vanno reinstallate ogni volta che si riapre il container.

---

## 2. Trovare la porta seriale

```bash
lerobot-find-port
```

Il comando chiede di scollegare e ricollegare il cavo dei servo, poi stampa il nome della porta seriale (ad esempio `/dev/ttyACM0`).

> Questo comando è **interattivo**: lanciando direttamente `--help` si ottiene un errore EOF, ed è normale.

**XLeRobot usa due porte seriali** (corrispondenti a `port1` e `port2` nella configurazione):

| Parametro | Valore predefinito | A cosa è collegato |
|---|---|---|
| `port1` | `/dev/ttyACM0` | i due bracci SO-101 + la telecamera della testa |
| `port2` | `/dev/ttyACM1` | i servo della base (ruote) |

Bisogna trovarle entrambe. I valori predefiniti sono `/dev/ttyACM0` e `/dev/ttyACM1`; **se in realtà sono diversi,
ogni comando successivo dovrà specificarli con `--robot.port1=` / `--robot.port2=`** (vedere la sezione 6).

---

## 3. Calibrazione: si attiva automaticamente quando si eseguono gli esempi, nessun comando separato

⚠️ **Non usi `lerobot-calibrate --robot.type=xlerobot`**. Quello strumento a riga di comando riconosce solo
una serie di robot importati esplicitamente (so100/so101/lekiwi ecc.); la configurazione di XLeRobot **non è nell'elenco**
e dà l'errore `invalid choice: 'xlerobot'`.

La calibrazione di XLeRobot è **integrata in `XLerobot.connect()`**: si avvia automaticamente eseguendo un qualsiasi esempio:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Cosa succede:**

- **Nessun file di calibrazione** → si avvia la procedura guidata:
  1. chiede di portare i servo del braccio sinistro e della testa a metà della loro corsa, poi di premere Invio
  2. poi chiede di far percorrere a ogni giunto l'intera corsa, e di premere Invio per terminare
  3. stessa cosa per il braccio destro e per la base
- **File di calibrazione già presente** → chiede: premere Invio per ripristinare la calibrazione, oppure digitare `c` per ricalibrare

I file di calibrazione si trovano in:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**Questa directory deve essere montata sull'host**, altrimenti bisogna ricalibrare a ogni riapertura del container:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> Se vuole calibrare solo un singolo braccio SO-101 (non l'intero XLeRobot), può usare il comando originale:
> il tipo `so101_follower` è nella whitelist della CLI:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Alcuni esempi (ad esempio `examples/0_so100_keyboard_joint_control.py`) usano
> **coefficienti di calibrazione scritti a mano nel codice**, invece della procedura descritta sopra.
> Quale si applichi dipende dalla variante del suo robot e dall'esempio usato ——
> dia prima un'occhiata ai commenti all'inizio del file dell'esempio.

---

## 4. Teleoperazione

**Basta un solo terminale** (gli esempi usano la modalità diretta, non serve avviare un host a parte):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Al primo avvio entra automaticamente nella procedura guidata di calibrazione** (non serve eseguire un comando di calibrazione separato):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → porti i servo del braccio sinistro e della testa a metà corsa, **prema Invio**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → faccia percorrere a ogni giunto l'intera corsa, dall'inizio alla fine, **prema Invio** per terminare
3. stessa cosa per il braccio destro e per la base

Quando esiste già un file di calibrazione, chiederà: premere Invio per ripristinarla, oppure digitare `c` per ricalibrare.

### Mappatura dei tasti

**Base**

| Tasto | Azione |
|---|---|
| `i` / `k` | avanti / indietro |
| `j` / `l` | spostamento a sinistra / a destra |
| `u` / `o` | svolta a sinistra / svolta a destra |
| `n` / `m` | accelera / decelera (tre livelli) |
| `b` | esce dal programma |

**Braccio sinistro**

| Tasto | Giunto |
|---|---|
| `q` / `e` | shoulder_pan (rotazione della base) ± |
| `w` / `s` | x (avanti/indietro) ± |
| `a` / `d` | y (sinistra/destra) ± |
| `z` / `x` | pitch (inclinazione) ± |
| `r` / `f` | wrist_roll (rotazione del polso) ± |
| `t` / `g` | gripper (pinza) apre / chiude |
| `c` | ritorno a zero |
| `y` | esecuzione di una traiettoria rettangolare (per demo/test) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Braccio destro**

| Tasto | Giunto |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (avanti/indietro) ± |
| `4` / `6` | y (sinistra/destra) ± |
| `1` / `3` | pitch (inclinazione) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper apre / chiude |
| `0` | ritorno a zero |
| `Y` (**maiuscola**) | esecuzione della traiettoria rettangolare |

**Altro**: `?` → riporta a zero i servo della testa

> I due bracci sono **speculari**: il sinistro usa la zona alfabetica (`q/e`, `w/a/s/d`), il destro il tastierino numerico
> (`7/9`, `4/6`, `8/2`, `1/3`). Anche il tasto `reset` è diverso —— `c` per il braccio sinistro, `0` per quello destro.
> Attenzione: il tasto della traiettoria rettangolare è `y` minuscola per il braccio sinistro e `Y` **maiuscola** per quello destro.

### Altri esempi

| Esempio | Descrizione | Serve installare qualcosa in più? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | versione con base a due ruote | no (vanno comunque installate prima le due librerie) |
| `5_xlerobot_teleop_xbox.py` | gamepad Xbox | sì: `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | manca il modulo `joyconrobotics`: non utilizzabile |
| `8_xlerobot_teleop_vr.py` | VR | serve montare in più la directory XLeVR |

---

## 5. Raccogliere dati di dimostrazione

⚠️ `lerobot-record --robot.type=xlerobot` **non è utilizzabile** (stesso motivo della sezione 0).

XLeRobot ha solo il percorso di registrazione VR, che si basa sul modulo `XLeVR`, assente nell'immagine.

**Se serve, bisogna scrivere uno script da sé**, usando l'API LeRobotDataset (la libreria è nell'immagine):

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<tuo-utente>/<nome-dataset>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# nel ciclo di teleoperazione:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # obbligatorio, altrimenti i metadati non vengono scritti su disco
```

Si può prendere come riferimento `examples/8_vr_teleop_with_dataset_recording.py` nell'immagine,
sostituendo la parte VR con la teleoperazione da tastiera.

**Si ricordi di aggiungere `-e HF_ENDPOINT=https://hf-mirror.com`**, altrimenti il push del dataset sull'Hub fallisce.

> Un'insidia da conoscere quando si scrivono i dataset: dopo `save_episode()` **bisogna sempre chiamare `ds.finalize()`**,
> altrimenti i metadati degli episodi non vengono scritti su disco e in seguito non si riescono più a rileggere (errore
> `Provided directory does not contain any parquet file`).

---

## 6. Se le porte seriali non sono ACM0/ACM1

Gli esempi **non usano argparse**: le porte seriali prendono i valori predefiniti di `XLerobotConfig()`:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Per specificarle in modo esplicito:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Dopo la modifica, rilanciare direttamente (il codice sorgente è montato: le modifiche ai file sull'host hanno effetto immediato).

---

## 7. Distribuire un modello addestrato

La policy ACT **non richiede dipendenze aggiuntive** ed è utilizzabile subito nell'immagine:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<tuo-utente>/<nome-modello>")
policy.eval()

# ciclo di inferenza dopo aver collegato il robot
# action = policy.select_action(batch)
```

Policy già preinstallate nell'immagine:

| Policy | Dipendenze | Note |
|---|---|---|
| **ACT** | nessuna | la più usata, verificata e funzionante |
| **Diffusion** | `diffusers` | richiede l'immagine completa |
| SmolVLA / pi0 / groot | transformers | **non preinstallate**: pacchetti molto grandi e inutilizzabili su CPU |

> Nello stesso processo **non si possono importare contemporaneamente due varianti del robot** —— `xlerobot_mecanum`
> registra la propria configurazione come `"xlerobot"`, entrando in conflitto di nome con la versione base, e si ottiene
> `Cannot register ... already registered`. Un robot usa una sola variante:
> eseguendole in processi separati non c'è alcun problema.

---

## 8. Addestramento

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<tuo-utente>/<nome-mio-dataset>
```

> `lerobot-train` **non richiede `robot.type`** (usa solo dataset e tipo di policy),
> quindi questo comando funziona e non ricade nella limitazione della sezione 0.
>
> L'addestramento richiede molta potenza di calcolo. Su CPU si possono eseguire solo addestramenti su scala minima; per un uso pratico serve la GPU di un Jetson.

---

> **Successivo**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Da consultare quando qualcosa non funziona
> **L'altro percorso**: [lerobot/](../lerobot/01-Operation.md) (con la riga di comando `lerobot-*` per un braccio singolo / LeKiwi)
