---
title: Comandi LeRobot originali
---

# Comandi LeRobot originali

> **Appartiene a**: [lerobot/](01-Operation.md) — braccio SO-101 / SO-100 singolo, LeKiwi
> **Prerequisito**: leggere prima [deployment/](../deployment/01-Overview.md) ed entrare nel container
> **L'altro percorso**: [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot completo)
> **Successivo**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Con la riga di comando `lerobot-*` si opera su **un braccio SO-101 / SO-100 singolo** oppure sul **LeKiwi**.

> ⚠️ Per usare l'**XLeRobot completo** torni a [xlerobot/](../xlerobot/01-Operation.md).
> Questi strumenti a riga di comando **non supportano `xlerobot`**: il motivo è nella sezione 0 qui sotto.

---

## 0. In quali casi si segue questo percorso

| Il suo hardware | Quale percorso | Perché |
|---|---|---|
| **Braccio SO-101 / SO-100 singolo** | ✅ **questa parte** (CLI `lerobot-*`) | gli strumenti originali lo supportano direttamente |
| **LeKiwi** | ✅ **questa parte** (CLI `lerobot-*`) | gli strumenti originali lo supportano direttamente |
| **XLeRobot completo** (due bracci + base) | ❌ vada alla [04](../xlerobot/01-Operation.md) | nella whitelist della CLI non c'è `xlerobot` |

**Perché due percorsi separati**: strumenti a riga di comando come `lerobot-calibrate` hanno nel codice sorgente un
elenco fisso di robot da importare (14 robot originali, elenco completo nella sezione 11), **in cui `xlerobot` non compare**. Se lo si passa comunque, l'errore è:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

Al contrario, gli script in `examples/` sono scritti per l'XLeRobot completo e non servono per un braccio singolo.

**I due percorsi condividono lo stesso ambiente**: il pacchetto installato nell'immagine si chiama `lerobot`, e XLeRobot si limita ad aggiungere tre pacchetti di codice nella directory `robots/`. Quindi **si può passare da un percorso all'altro in qualsiasi momento, senza reinstallare nulla**, e nello stesso processo si possono importare entrambi.

---

## 1. Flusso completo

```
Preparazione  Calibrazione  Utilizzo                 Addestramento   Distribuzione
────────────  ────────────  ────────                 ─────────────   ─────────────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

Ogni passo corrisponde a un comando: qui sotto li vediamo uno per uno.

---

## 2. Preparazione: trovare porte seriali e telecamere

```bash
lerobot-find-port          # interattivo: seguendo le istruzioni si scollega e ricollega il cavo dei servo; stampa il nome della porta seriale
lerobot-find-cameras opencv   # prova le telecamere una per una e salva degli screenshot
```

`lerobot-find-cameras` salva gli screenshot in `outputs/captured_images/`: se si vede l'immagine, la telecamera è
utilizzabile. **Testato e funzionante** (riconosce `/dev/video0` e acquisisce correttamente).

> Entrambi i comandi sono **interattivi**: aggiungendo direttamente `--help` si ottiene un errore EOF, ed è normale.

---

## 3. Primo utilizzo di servi nuovi: scrittura degli ID

I servi nuovi escono tutti dalla fabbrica con ID 1: bisogna cambiarli uno per uno (da 1 a 6) per poterli collegare in cascata sullo stesso bus:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

Il comando chiede di collegare un solo servo e premere Invio; modificato uno, si collega il successivo.

> Serve solo per un braccio appena assemblato o dopo aver cambiato i servi. Se il braccio comunica già correttamente, si salta questo passo.

---

## 4. Calibrazione

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **Nessun file di calibrazione** → si avvia la procedura guidata: prima si porta il braccio a metà corsa e si preme Invio, poi si fa percorrere a ogni giunto l'intera corsa
- **File di calibrazione già presente** → chiede se ripristinare la calibrazione oppure ricalibrare

Il file di calibrazione si trova in `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**All'avvio del container viene montato `-v ~/.cache/huggingface`** (vedere [03-Deployment](../deployment/03-Deployment.md)),
quindi riaprendo il container non si perde.

Nel caso di un braccio follower con il braccio leader, calibrare **entrambi, uno per uno**:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Teleoperazione

### Muovere il follower con il leader (modalità leader-follower)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### Non ha un braccio leader? Si usa la tastiera

Tra i valori di `--teleop.type` c'è `keyboard`, che non richiede un secondo hardware:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

Si può anche usare `--teleop.type=gamepad` per collegare un gamepad Xbox (richiede `pip install "lerobot[gamepad]"`).

### Con la telecamera per vedere le immagini

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> Anche per la visualizzazione con rerun bisogna prima installare le due librerie X11; vedere
> la sezione 1 di [xlerobot/](../xlerobot/01-Operation.md).

---

## 6. Raccogliere dati di dimostrazione

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<tuo-utente>/<nome-mio-primo-dataset> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**Descrizione dei parametri:**

| Parametro | Funzione |
|---|---|
| `--robot.cameras` | configurazione delle telecamere, con **sintassi a dizionario annidato**: `nome: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | l'ID del dataset su Hugging Face (si può registrare in locale e caricarlo sull'Hub in un secondo momento) |
| `--dataset.num_episodes` | quanti episodi registrare |
| `--dataset.single_task` | descrizione del task, utilizzata durante l'addestramento |
| `--dataset.root` | si aggiunge se lo si vuole salvare in un'altra directory; per impostazione predefinita è nella directory di cache |

**Tasti durante la registrazione** (il terminale li mostra a schermo):

| Tasto | Azione |
|---|---|
| `→` (freccia destra) | termina in anticipo l'episodio corrente e passa alla fase di reset |
| `←` (freccia sinistra) | scarta l'episodio corrente e lo registra di nuovo |
| `Esc` | interrompe l'intera registrazione |

Al termine, il dataset è già utilizzabile in locale. Per caricarlo sull'Hub:

```bash
--dataset.push_to_hub=true
```

(ricordarsi di aver avviato il container con `-e HF_ENDPOINT=https://hf-mirror.com`.)

---

## 7. Verifica con la riproduzione

Dopo la registrazione conviene rivederla con la riproduzione per controllare che i dati siano corretti, prima di addestrare:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<tuo-utente>/<nome-mio-primo-dataset> \
  --dataset.episode=0
```

---

## 8. Addestramento

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<tuo-utente>/<nome-mio-primo-dataset>
```

> `lerobot-train` **non richiede `robot.type`** (usa solo dataset e tipo di policy),
> quindi questo comando è **condiviso** con il percorso XLeRobot: anche i dati XLeRobot registrati si addestrano così.
>
> L'addestramento richiede molta potenza di calcolo. Su CPU si possono eseguire solo addestramenti su scala minima; per un uso pratico serve la GPU di un Jetson.

Policy selezionabili (`--policy.type`): `act` (la più usata), `diffusion`, `smolvla`,
`pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet` ecc.

---

## 9. Distribuzione sul robot reale: eseguire una policy addestrata

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tuo-utente>/<nome-modello> \
  --strategy.type=base
```

| Parametro | Descrizione |
|---|---|
| `--policy.path` | il modello addestrato (ID sull'Hub oppure percorso locale) |
| `--strategy.type` | `base` è la più usata; esistono anche `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync` (predefinita) oppure `rtc` |

> ⚠️ **Non usi `lerobot-eval` sul robot reale**: è pensato per i **benchmark di simulazione**
> (`--env.type=aloha/pusht/libero/metaworld...`), non per la distribuzione su robot reale. Sul robot reale
> si usa `lerobot-rollout`.

---

## 10. Tabella completa degli strumenti a riga di comando

| Comando | Funzione | Richiede `robot.type`? |
|---|---|---|
| `lerobot-find-port` | trova la porta seriale | no |
| `lerobot-find-cameras` | trova le telecamere | no |
| `lerobot-setup-motors` | scrive gli ID sui servi nuovi | sì |
| `lerobot-calibrate` | calibrazione | sì |
| `lerobot-teleoperate` | teleoperazione | sì |
| `lerobot-record` | registra un dataset | sì |
| `lerobot-replay` | riproduce i dati | sì |
| `lerobot-train` | addestra una policy | **no** (condiviso con XLeRobot) |
| `lerobot-rollout` | distribuzione di una policy sul **robot reale** | sì |
| `lerobot-eval` | valutazione su **benchmark di simulazione** | no (usa `--env.type`) |
| `lerobot-edit-dataset` | modifica un dataset | no |
| `lerobot-dataset-viz` | visualizzazione dei dataset | no |
| `lerobot-info` | stampa informazioni su ambiente e versioni | no |

---

## 11. Tipi di robot supportati dalla CLI (elenco completo)

Questi sono tutti i tipi che la riga di comando `lerobot-*` **riconosce realmente** (letti dalla whitelist nel codice
sorgente). **`xlerobot` non c'è**: è proprio il motivo dei due percorsi.

**Robot (`--robot.type`) — 14 tipi:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Teleoperatori (`--teleop.type`) — tra gli altri:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> L'elenco completo è quello mostrato da `--help` nella sua immagine: versioni diverse possono aggiungere o togliere voci.

---

## 12. Un esempio completo (da zero a robot funzionante)

```bash
# 1. trovare i dispositivi
lerobot-find-port                          # annotare il nome della porta seriale; qui sotto si usa /dev/ttyACM0
lerobot-find-cameras opencv                # annotare la telecamera; qui sotto si usa /dev/video0

# 2. scrivere gli ID sui servi nuovi (serve solo per un braccio appena assemblato)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. calibrazione
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. provare a muoverlo con la tastiera
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. registrare 10 episodi
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<tuo-utente>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. addestramento
lerobot-train --policy.type=act --dataset.repo_id=<tuo-utente>/my-first-dataset

# 7. far muovere il braccio da solo
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tuo-utente>/my-first-dataset --strategy.type=base
```

---

## Verifiche effettuate

I comandi di questa parte sono stati **eseguiti realmente** nell'immagine `chenyang310/xlerobot:jetson` con JetPack 7.2:

| Voce | Risultato |
|---|---|
| Parsing dei parametri dei 14 `--robot.type` originali | ✅ superato |
| Parsing dei parametri di `--teleop.type` (incluso `keyboard`) | ✅ superato |
| `lerobot-calibrate`, catena completa | ✅ arriva fino all'apertura della porta seriale e poi si ferma (all'epoca i servi non erano collegati) |
| `lerobot-teleoperate --teleop.type=keyboard`, catena completa | ✅ come sopra |
| `lerobot-find-cameras opencv` | ✅ **hardware reale**: riconosce `/dev/video0` e acquisisce correttamente le immagini |
| Parsing della sintassi a dizionario annidato di `--robot.cameras` | ✅ superato |
| Coesistenza di robot originali e XLeRobot **nello stesso processo** | ✅ 8 tipi registrati contemporaneamente con successo |

Non c'era un braccio collegato, quindi **la verifica a livello di movimento non è ancora stata fatta**. Dopo aver
collegato il SO-101, esegua la sezione 12: se qualche passo non funziona, me lo segnali.

---

> **Successivo**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Da consultare quando qualcosa non funziona
