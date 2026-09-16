---
title: SO-ARM101 Tutorial bi-braccio (doppio follower)
description: "Presentazione del flusso completo del sistema SO-ARM101 bi-braccio (doppio follower): cablaggio hardware e calibrazione, teleoperazione bi-braccio."
---

# SO-ARM101 Tutorial bi-braccio (doppio follower)

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

Questa guida presenta il flusso completo per addestrare un sistema robotico SO-ARM bi-braccio con LeRobot: collegamento hardware, calibrazione dei due bracci, teleoperazione bi-braccio, registrazione e gestione del dataset, addestramento della policy ACT e deployment sul robot reale. Seguendo questa guida potrai raccogliere dati di dimostrazione con due bracci leader e due bracci follower, addestrare una policy di imitation learning ed eseguirla sui bracci reali.

Per prima cosa, collegare i cavi come segue:

| Ruolo | Porta |
| --- | --- |
| Follower sinistro | `/dev/ttyACM0` |
| Follower destro | `/dev/ttyACM1` |
| Leader sinistro | `/dev/ttyACM2` |
| Leader destro | `/dev/ttyACM3` |

Il tipo dei bracci follower è `so101_follower`, quello dei bracci leader è `so101_leader` (in LeRobot `so100_leader` e `so101_leader` condividono la stessa implementazione).

## Preparazione preliminare

### Installazione delle dipendenze

Per l'installazione dell'ambiente fare riferimento al [Tutorial braccio robotico LeRobot](./SO-ARM101-Tutorial.md).

### Permessi USB

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Calibrazione (passo fondamentale)

### 1.1 Calibrare il follower sinistro

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 Calibrare il follower destro

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 Calibrare il leader sinistro

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 Calibrare il leader destro

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

Al termine della calibrazione, i file vengono salvati in:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Nota sui nomi delle directory: `so101_follower` e `so100_follower`, `so101_leader` e `so100_leader` condividono la stessa implementazione, quindi le directory sono unificate in `so_follower` / `so_leader`; il braccio leader è un teleoperator, perciò i file di calibrazione stanno sotto `teleoperators/` e non sotto `robots/`.

### (Opzionale) se in precedenza si era già calibrato con altri ID

Se in precedenza si usavano ad esempio `my_awesome_follower_arm1`, `my_awesome_follower_arm2` ecc., si possono copiare i file di calibrazione:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. Teleoperazione bi-braccio

### 2.1 Senza fotocamere

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 Con fotocamere

È possibile usare `lerobot-find-cameras opencv` per visualizzare gli indici delle fotocamere e aggiungere o rimuovere fotocamere a piacere.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### Avvertenze di sicurezza

- Fare attenzione all'ambiente circostante per evitare collisioni dei bracci follower.

## 3. Registrazione del dataset

### 3.1 Salvataggio in locale (senza upload sull'Hub)

Aggiungere `--dataset.root` (i dati vengono scritti in quella directory) e `--dataset.push_to_hub=false`, più `--dataset.no_stamp=true` per mantenere stabile il nome del dataset (altrimenti al `repo_id` viene aggiunto automaticamente un timestamp e le successive riprese/riproduzioni/addestramenti non lo trovano più).

> Nota: si consiglia di includere `/` nel `repo_id` (nella forma `nomeutente/nome_dataset`); un dataset locale non viene realmente caricato.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> La codifica video predefinita è già `libsvtav1`, non serve specificarla; per personalizzarla usare parametri annidati come `--dataset.rgb_encoder.vcodec=h264`.

I dati vengono salvati in `./datasets/bi_so101_task/`, con questa struttura:

```text
├── meta/
│   ├── info.json         # 数据集信息(fps、特征形状等)
│   ├── episodes/         # 每集的元数据(chunk-000/...)
│   ├── stats.json        # 各特征归一化统计
│   └── tasks.parquet     # 任务文本 → task_index
├── data/                 # 每帧特征数据(chunk-*.parquet)
└── videos/               # 每个摄像头一个子目录(chunk-*.mp4)
```

### 3.2 Upload su Hugging Face Hub

Se si desidera l'upload automatico, mantenere `HF_USER` e togliere `root` e `push_to_hub=false` (l'upload è il comportamento predefinito). Mantenere porte e indici delle fotocamere coerenti con la tabella dei collegamenti:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> Il nome del repository Hub dopo l'upload sarà `${HF_USER}/bi_so101_task`, coerente con il `repo_id` usato più sotto in 4.2 per l'addestramento dal Hub. La copia locale viene salvata prima in `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`.

### 3.3 Continuare la registrazione (ripresa da interruzione)

Se la registrazione viene interrotta accidentalmente (ad esempio uscendo con il tasto destro durante la fase di reset), o se si vuole completare la raccolta in più sessioni, si può usare `--resume` per continuare ad aggiungere episodi allo stesso dataset.

**Attenzione**:

- È obbligatorio `--resume=true`, altrimenti `LeRobotDataset.create()` genera un errore perché la directory esiste già.
- Nel comando di ripresa, `--dataset.root` e `--dataset.repo_id` devono essere identici alla prima registrazione (3.1) (`resume` richiede obbligatoriamente un `root` esplicito).
- `--dataset.num_episodes` indica **quanti episodi registrare in questa sessione**, non l'obiettivo totale. Ad esempio, con 15 episodi già registrati e l'obiettivo di 50, scrivere `35`.
- All'uscita, preferire uscire durante la registrazione di un episodio o subito dopo la sua conclusione naturale, evitando di uscire nella fase "Reset the environment" (che causa il fallimento del salvataggio di un episodio vuoto).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 Riproduzione ed eliminazione degli episodi

#### Riprodurre un episodio specifico

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` è un indice 0-based: `24` indica il 25° episodio.

#### Eliminare un episodio specifico

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

Dopo l'eliminazione il dataset viene riscritto sul posto e i dati originali vengono salvati come backup in `./datasets/bi_so101_task_old/`. Una volta verificato che il nuovo dataset sia corretto, il backup può essere eliminato manualmente:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Eliminare l'intero dataset

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. Addestramento ACT

### 4.1 Addestramento da un dataset locale

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` punta alla directory del dataset registrato in 3.1 (il `repo_id` deve essere coerente con quello della registrazione). Se la directory `--output_dir` esiste già, viene generato direttamente un `FileExistsError`: usare una nuova directory di output oppure aggiungere `--resume=true` per riprendere l'addestramento.

### 4.2 Addestramento da Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> Sopra sono stati usati i parametri predefiniti di ACT (`chunk_size=100`, `dim_model=512` ecc.).

> Il `repo_id` deve essere coerente con il nome del repository dell'upload in 3.2 (in 3.2 è già stato aggiunto `--dataset.no_stamp=true`, quindi il nome del repository è fisso: `${HF_USER}/bi_so101_task`). In addestramento non serve `--dataset.root`: il download dal Hub è automatico.

## 5. Deployment sul robot reale

> Attenzione: `lerobot-record` serve solo a raccogliere dati di dimostrazione. Per il deployment di una policy addestrata usare `lerobot-rollout`: nella versione attuale `lerobot-record` non accetta più `--policy.path` e rifiuta i nomi di dataset con prefisso `eval_`.

### 5.1 Valutazione sul campo (senza registrare dati)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` è il numero di secondi di esecuzione; `0` significa senza limite di tempo.
- Per intervenire o fermare a metà, aggiungere `--interactive=true` e usare i comandi `/stop`, `/reset` ecc. nel terminale.

### 5.2 Valutazione con registrazione dei dati (in locale)

Usare la strategia `episodic` (si comporta come il vecchio `lerobot-record`: registra per episodio con fase di reset):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> Il nome del dataset di deployment deve iniziare con `rollout_` (convenzione obbligatoria della versione attuale). Per la registrazione in locale si consiglia di aggiungere `--dataset.root` e `--dataset.no_stamp=true`, per evitare che al nome della directory venga aggiunto un timestamp.

### 5.3 Upload dei dati di valutazione su Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. Domande frequenti

| Problema | Causa | Soluzione |
| --- | --- | --- |
| La teleoperazione chiede di ricalibrare | `bi_so_follower` non trova i file di calibrazione con suffisso `_left` / `_right` | Ricalibrare con ID con suffisso `_left` / `_right`, oppure copiare i file di calibrazione esistenti |
| Il braccio leader non si trascina | La coppia del leader non è disattivata | Ricalibrare o controllare i motori |
| Alla ripresa della raccolta segnala che la directory esiste già | Manca `--resume=true` | Aggiungere `--resume=true` al comando `lerobot-record` |
| Con `--resume=true` un errore richiede `root` | La ripresa richiede di specificare esplicitamente la directory del dataset | Aggiungere `--dataset.root=./datasets/bi_so101_task` al comando di ripresa, coerente con la prima registrazione |
| Al nome della directory del dataset viene aggiunto un timestamp e riproduzione/addestramento non lo trovano | Alla registrazione non è stato impostato `no_stamp`, quindi al `repo_id` è stato aggiunto automaticamente un timestamp | Aggiungere `--dataset.no_stamp=true` in registrazione/ripresa |
| `--dataset.vcodec=...` segnala che il parametro non esiste | Parametro di una versione precedente; nella versione attuale i parametri di codifica video sono annidati | Usare `--dataset.rgb_encoder.vcodec=h264` (il valore predefinito è già `libsvtav1`) |
| In deployment `lerobot-record` segnala errori `--policy.path` / `eval_` | La versione attuale di `lerobot-record` non include più la capacità di deployment delle policy | Per il deployment usare `lerobot-rollout --strategy.type=episodic`, con nome del dataset che inizia con `rollout_` |
| I bracci sinistro e destro sono invertiti | Configurazione delle porte errata | Scambiare `left_arm_config.port` e `right_arm_config.port` |
| In addestramento il dataset non viene trovato | Al dataset locale non è stato specificato `root` | Aggiungere `--dataset.root=./datasets/xxx` in addestramento |
| Il dataset viene caricato automaticamente | Non è stato impostato `push_to_hub=false` | Aggiungere `--dataset.push_to_hub=false` in registrazione |
| All'uscita compare `You must add one or several frames before calling add_episode` | Si è usciti nella fase di reset e l'episodio corrente non ha frame | Non influisce sui dati già registrati; usare `--resume=true` per continuare la raccolta |

<RelatedProducts slugs="so-arm101" />
