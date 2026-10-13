---
title: Risoluzione dei problemi e riferimento rapido
---

# Risoluzione dei problemi e riferimento rapido

> **Appartiene a**: [troubleshooting/](01-Troubleshooting.md)
> **Vedi anche**: [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Problemi frequenti

### Nel container non si vede la porta seriale del robot

```bash
# sull'host: verificare che il dispositivo esista
ls /dev/ttyACM*
# verificare che l'utente sia nel gruppo dialout
groups | grep dialout
```

Se l'utente non è nel gruppo, eseguire `sudo usermod -aG dialout $USER` e poi **riconnettersi**.

### Il download dell'immagine si blocca / va in timeout

L'acceleratore di mirror non è configurato. Vedere la sezione 2 di [02-Environment-Setup](../deployment/02-Environment-Setup.md).

### Il download dei modelli fallisce / non si riesce a raggiungere huggingface

Configurare `-e HF_ENDPOINT=https://hf-mirror.com`.
Vedere la sezione 4 di [02-Environment-Setup](../deployment/02-Environment-Setup.md).

### La finestra di visualizzazione di rerun va in crash

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Mancano le librerie X11. **Il robot in sé non ne risente**, semplicemente non si vede la finestra.
Il comando per installarle e le avvertenze sono nella sezione 1 di [xlerobot/](../xlerobot/01-Operation.md) ——
il punto chiave è che `docker exec` **deve includere `-u root`**.

### Nel container `torch.cuda.is_available()` restituisce False

La GPU è obbligatoria, quindi si tratta sempre di un problema di configurazione —— verifichi entrambe le cose:

- Ha avviato il container con `--device nvidia.com/gpu=all` —— **non con `--runtime nvidia`**,
  che non inietta i nodi dei dispositivi
- La specifica CDI esiste sull'host (`/etc/cdi/nvidia.yaml`) —— vedere
  [03-Deployment §4](../deployment/03-Deployment.md)

### Il container non parte, con un errore CDI

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

Il servizio di aggiornamento automatico sull'host ha generato una specifica che fa riferimento a un `card0` inesistente. Per risolvere:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(Questo problema si ripresenta a ogni riavvio.)

### La calibrazione va rifatta ogni volta

I file di calibrazione si trovano nel container e spariscono quando lo si elimina. All'avvio montare la directory di cache:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

Lo script `scripts/run.sh` lo fa già.

### Il comando di calibrazione segnala `invalid choice: 'xlerobot'`

Non è un guasto: è così per progettazione. Lo strumento a riga di comando `lerobot-calibrate` non supporta XLeRobot;
la calibrazione si attiva automaticamente negli script di esempio. Vedere le sezioni 0 e 3 di [xlerobot/](../xlerobot/01-Operation.md).

### Durante le operazioni sui dataset compare una lunga serie di errori torchcodec

Se si usa un ambiente **installato da sé** invece dell'immagine, si può vedere
`libnvrtc.so.13: cannot open shared object file`. Dipende dal fatto che torchcodec non riesce a caricarsi
in un ambiente puramente CPU; lerobot ripiega automaticamente su pyav e la funzionalità non ne risente.
Nell'immagine è già stato rimosso, quindi questo errore non compare.

### L'`import` di due varianti del robot nel container dà errore

```
Cannot register ... as xlerobot because ... is already registered
```

Succede solo tra la coppia **`xlerobot` e `xlerobot_mecanum`**: nel codice sorgente entrambi si registrano
come `"xlerobot"` (la config della versione mecanum è una copia, e il nome di registrazione non è stato cambiato).
È un bug di XLeRobot a monte.

**Tutte le altre combinazioni sono compatibili**: tutti i robot di LeRobot originale + XLeRobot possono
**coesistere nello stesso processo** (verificato: 8 tipi registrati contemporaneamente con successo),
e nemmeno `xlerobot_2wheels` entra in conflitto.

Un robot usa una sola variante, quindi nell'uso reale non ci sono conseguenze. Se serve davvero usarle insieme
(ad esempio per uno script di confronto), si eseguono in processi separati.

---

## Problemi con i comandi `lerobot-*` originali

### `lerobot-record` segnala errori sulla telecamera / i dati registrati non contengono immagini

Le telecamere si passano tramite `--robot.cameras` come **dizionario annidato**, non con parametri di primo livello separati:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Attenzione: è `index_or_path` (non `index`); `front` è il nome della telecamera e se ne possono definire più di una.
Per l'esempio completo vedere la sezione 6 di [lerobot/](../lerobot/01-Operation.md).

### `lerobot-eval` non funziona sul robot reale

`lerobot-eval` è pensato per i **benchmark di simulazione** (`--env.type=aloha/pusht/libero/metaworld...`),
**non è uno strumento di distribuzione su robot reale**.

Sul robot reale, per eseguire una policy addestrata bisogna usare **`lerobot-rollout`**:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tuo-utente>/<nome-modello> --strategy.type=base
```

### Non si capisce se usare `examples/` o `lerobot-*`

| Il suo hardware | Cosa usare |
|---|---|
| XLeRobot completo (due bracci + base) | script in `examples/` → [xlerobot/](../xlerobot/01-Operation.md) |
| Braccio SO-101 / SO-100 singolo, LeKiwi | riga di comando `lerobot-*` → [lerobot/](../lerobot/01-Operation.md) |

Il criterio è semplice: nella whitelist dei robot di `lerobot-*` **non c'è `xlerobot`** (elenco completo
nella sezione 11 di [lerobot/](../lerobot/01-Operation.md)).

### Si passa `--robot.type` ma dà `invalid choice`

Confronti con l'elenco completo della sezione 11 di [lerobot/](../lerobot/01-Operation.md):
funzionano solo i 14 tipi originali. `xlerobot` non è tra questi; per quello servono gli script in `examples/`.

---

## Riferimento rapido

### Generale (entrambi i percorsi)

```bash
# scaricare l'immagine
docker pull chenyang310/xlerobot:jetson

# avvio
bash scripts/run.sh jetson

# dopo essere entrati nel container — prima configurazione
lerobot-find-port                     # trovare la porta seriale (interattivo: seguire le istruzioni per scollegare e ricollegare il cavo dei servo)

# installare le due librerie X11 richieste da rerun (in un altro terminale; -u root non si può omettere)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# addestramento (condiviso tra i due percorsi: non richiede robot.type)
lerobot-train --policy.type=act --dataset.repo_id=<tuo-utente>/<nome-dataset>

# autoverifica
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot completo (due bracci + base)

```bash
# teleoperazione: basta un solo terminale; al primo avvio parte la procedura guidata di calibrazione
python examples/4_xlerobot_teleop_keyboard.py

# versione con base a due ruote
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ Non usare lerobot-calibrate / lerobot-record / lerobot-teleoperate con xlerobot:
#    non è nella whitelist e danno solo "invalid choice". XLeRobot usa gli script in examples/.
```

Per i dettagli vedere [xlerobot/](../xlerobot/01-Operation.md).

### B · Braccio SO-101 singolo / LeKiwi (CLI `lerobot-*`)

```bash
# trovare i dispositivi
lerobot-find-port
lerobot-find-cameras opencv

# scrivere gli ID sui servi nuovi (serve solo per un braccio appena assemblato)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# calibrazione
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# teleoperazione (tastiera, senza braccio leader)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# registrare un dataset
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<tuo-utente>/<nome-dataset> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# verifica con la riproduzione
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<tuo-utente>/<nome-dataset> --dataset.episode=0

# distribuzione sul robot reale di una policy addestrata (⚠️ non lerobot-eval, che è per la simulazione)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tuo-utente>/<nome-modello> --strategy.type=base
```

Per i dettagli vedere [lerobot/](../lerobot/01-Operation.md).

### Riferimento rapido dei tasti

| Parte | Tasti | Azione |
|---|---|---|
| Base | `i` `k` `j` `l` | avanti / indietro / sinistra / destra |
| Base | `u` `o` `n` `m` | svolta a sinistra / svolta a destra / accelera / decelera |
| Base | `b` | esce |
| Braccio sinistro | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Braccio sinistro | `r/f` `t/g` `c` `y` | wrist / pinza / ritorno a zero / traiettoria rettangolare |
| Braccio sinistro | `<` `>` `,` `.` | servo della testa 1 / 2 |
| Braccio destro | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Braccio destro | `/` `*` `+` `-` `0` | wrist / pinza / ritorno a zero |
| Braccio destro | `Y` (**maiuscola**) | traiettoria rettangolare |
| Altro | `?` | ripristino a zero della testa |

Per la descrizione completa, vedere la sezione 4 di [xlerobot/](../xlerobot/01-Operation.md).

---

## Appendice: perché in questo tutorial le cose stanno così

| Scelta | Motivo |
|---|---|
| Python 3.12 è indispensabile | lerobot 0.6.2 usa la sintassi PEP 695 (`type X = ...`, `class Foo[T]:`): con 3.10/3.11 non compila nemmeno |
| In Cina continentale serve un acceleratore di mirror | la connessione diretta a Docker Hub va in timeout: verificato, `context deadline exceeded` |
| HF_ENDPOINT è obbligatorio | `huggingface.co` è completamente irraggiungibile dalla Cina continentale, mentre `hf-mirror.com` è raggiungibile |
| Su Jetson si usa CDI e non `--runtime nvidia` | negli ambienti cgroup v2 di JetPack 6/7, `--runtime nvidia` non inietta i nodi dei dispositivi |
| La libreria di cinematica placo non viene installata | non ha wheel cp312/aarch64; XLeRobot usa la propria IK analitica e non ne ha bisogno |

---

## Link correlati

- [Progetto XLeRobot](https://github.com/Vector-Wangel/XLeRobot)
- [Documentazione ufficiale di LeRobot](https://huggingface.co/docs/lerobot)
- [Utilizzo e limiti di Docker Hub](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Torna all'inizio**: [deployment/01-Overview](../deployment/01-Overview.md)
> **L'altro percorso**: [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
