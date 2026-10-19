---
title: "04 · Teleoperazione da tastiera"
description: "Usa la tastiera per muovere \"a impulsi\" i giunti e controllare manualmente il braccio reale o simulato: è il modo di controllo più rapido quando non hai il b…"
---

# 04 · Teleoperazione da tastiera

Usa la tastiera per muovere "a impulsi" i giunti e controllare manualmente il braccio reale o simulato: è il modo di controllo più rapido quando non hai il braccio leader, nonché uno dei metodi per registrare dati dimostrativi.

> Prerequisito: per la parte in simulazione basta completare [01](/it/tutorials/robot-arms/so-arm101/mujoco/01-Environment); per la parte sul robot reale serve anche completare [03](/it/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration).
> `COM172`/`juxi_so101` nei comandi sono esempi: verifica la porta con il capitolo 03 e sostituiscila; per `id` usa il nome scelto durante la calibrazione.

## Comandi

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 真机从动臂
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=5 \
    --teleop.type=so101_keyboard --teleop.rate=150

# 仿真从动臂（MuJoCo 窗口自动打开）
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --teleop.rate=150
```

(`teleoperate.py` usa già per default `--robot.type=so101_mujoco --teleop.type=so101_keyboard`.)

## Tasti (attivi finché premuti, ascolto globale: indipendentemente dalla finestra in primo piano)

| Tasto | Azione | Tasto | Azione |
| --- | --- | --- | --- |
| `w` / `s` | shoulder_lift su / giù | `a` / `z` | shoulder_pan sinistra / destra |
| `e` / `d` | elbow_flex estensione / flessione | `t` / `g` | wrist_flex + / − |
| `y` / `h` | wrist_roll + / − | `u` / `j` | gripper apri / chiudi |

I tasti sono stati scelti **evitando intenzionalmente i tasti di controllo della registrazione** (`n/r/q`, frecce, `Esc`), così teleoperazione e registrazione possono funzionare contemporaneamente.

## Parametri principali

| Parametro | Funzione | Valore consigliato |
| --- | --- | --- |
| `--teleop.rate` | Velocità del target mentre si tiene premuto un tasto (unità/secondo) | Il default 60 è piuttosto lento; sul robot reale **150** è più adeguato |
| `--robot.max_relative_target` | Quanto al massimo può muoversi un giunto per ciclo di controllo (limite di velocità di sicurezza) | Robot reale **5** (teleoperazione a 60Hz) / **10** (registrazione a 30Hz) |
| `--robot.use_degrees=false` | Usa il sistema proporzionale alla corsa (da −100 a 100) invece dei gradi | **Da aggiungere sempre sul robot reale**, altrimenti le unità non corrispondono (la simulazione è già allineata per default) |

## Comportamento

- **Non digitare durante la teleoperazione**: l'ascolto della tastiera è **globale e non consuma i tasti**: premere i tasti mappati in qualsiasi finestra del computer
  (`w a s z e d t g y h u j`, incluse le lettere digitate in una chat) aziona contemporaneamente il braccio. Con la modalità braccio leader questo problema non esiste.
- **Alla connessione il braccio si muove**: il follower reale prima attiva la coppia (diventa rigido), poi si sposta verso la "posa centrale" (il target prima che si prema un tasto);
  il braccio simulato converge direttamente verso la posa centrale. Lascia spazio intorno al braccio.
- **Uscita**: `Ctrl-C` su quel terminale (oppure `Esc`: l'ascolto della tastiera si disconnette e il programma termina in modo pulito). Dopo l'uscita il robot reale **perde la coppia e diventa floscio**:
  sostienilo con una mano; è un comportamento normale.
- **Le serie di WARNING `clamped to be safe` nel log di avvio** sono l'output normale del limitatore di velocità durante l'inseguimento; si fermano automaticamente una volta raggiunta la posizione.

<RelatedProducts slugs="so-arm101" />
