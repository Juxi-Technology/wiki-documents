---
title: Tutorial braccio robotico LeRobot
description: "Questo tutorial è aggiornato al 15 dicembre. Si può seguire la documentazione ufficiale più recente. Vedi link. SO-ARM101 e SO-ARM100 sono compatibili nel codice eseguito."
---

# Tutorial braccio robotico LeRobot

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**


Questo tutorial è aggiornato al 15 dicembre. Si può seguire la [documentazione ufficiale più recente](https://github.com/huggingface/lerobot/tree/main). Tutorial dettagliato: [questo link](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c). Per i file URDF: [questo link](https://github.com/TheRobotStudio/SO-ARM100). Vecchia versione del 15 settembre: [questo link](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink). SO-ARM101 e SO-ARM100 sono compatibili nel codice eseguito.

## A. Note del tutorial

**Versione Pro: braccio attivo nero con adattatore 5V/6A, braccio schiavo bianco con adattatore 12V/5A!**

Montaggio servo e calibrazione angoli vanno fatti prima: vedi [tutorial di assemblaggio ufficiale](https://huggingface.co/docs/lerobot/so101); questo tutorial non li tratta!

Tutorial di assemblaggio: [Assemblaggio braccio Lerobot](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

Se i servo non sono configurati o il braccio non assemblato, seguire prima questo [README](https://github.com/TheRobotStudio/SO-ARM100): distinta materiali, link di acquisto, istruzioni di stampa 3D e consigli per principianti.

Iniziamo con l'installazione dell'ambiente LeRobot.

## B. Preparazione dell'ambiente

Per Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

Per Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

### Installare l'ambiente LeRobot

#### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

In base alla versione CUDA vanno installati pytorch e torchvision.

1. Per Jetson:

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

Oppure per X86 Ubuntu 22.04:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. Creare e attivare un nuovo ambiente conda per lerobot nella directory desiderata (creare es. lerobot):

> Non creare/importare il progetto lerobot dentro ~/miniconda3

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. Poi attivare l'ambiente `conda` (ogni volta che apri un terminale con lerobot!):

```PowerShell
conda activate lerobot
```

#### 4. Clonare LeRobot:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

In alternativa seguire l'ultima versione: https://github.com/huggingface/lerobot.git
Nota: i comandi dell'ultima versione possono differire!

#### 5. Installare ffmpeg nell'ambiente:

Con `miniconda`, installare `ffmpeg`:

```PowerShell
conda install ffmpeg -c conda-forge
```

Questo installa di solito ffmpeg 7.X compilato con l'encoder libsvtav1. Se libsvtav1 non è supportato (verificabile con `ffmpeg -encoders`):

【Tutte le piattaforme】installare esplicitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`

Senza dipendenze grafiche (gdk-pixbuf, librsvg), usare:
`conda install ffmpeg=7.1.1 -c conda-forge --no-deps`

【Solo Linux】installare le dipendenze di build e compilare ffmpeg con libsvtav1; verificare con `which ffmpeg`.

Se incontri l'errore seguente, i comandi sopra lo risolvono.
![5. Installare ffmpeg nell'ambiente: – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)




#### 6. Entrare in lerobot e installare LeRobot con le dipendenze feetech:

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

Per dispositivi Jetson Jetpack 6.0+ (installare prima Pytorch-gpu e Torchvision secondo [questo tutorial](https://pytorch.org/get-started/locally/)):

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7. Verificare Pytorch e Torchvision

Poiché pip rimuove i Pytorch/Torchvision esistenti e installa le versioni CPU, va verificato in Python:

```Plain Text
import torch
print(torch.cuda.is_available())
```

Se False, reinstallare secondo il [tutorial ufficiale](https://pytorch.org/).

[Incompatibilità Pytorch su Jetson Orin](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. Installare l'SDK della fotocamera di profondità Intel RealSense (se presente)

Sotto `lerobot/src/lerobot/`, installare pyrealsense2:

```Plain Text
pip install pyrealsense2
```

## C. Controllo del braccio robotico

### Autorizzazione porta

Collegare l'alimentazione: braccio attivo nero con adattatore 5V/6A, braccio schiavo bianco con 12V/5A; collegare la scheda driver all'host tramite il cavo dati.

Prima, entrare in `lerobot/src/lerobot/`:

```Plain Text
cd ~/lerobot/src/lerobot/
```

Poi attivare l'ambiente `conda` (ogni volta!):

```PowerShell
conda activate lerobot
```

#### 1. Eseguire lo script di ricerca porta

Per trovare la porta USB corretta di ogni braccio, eseguire due volte lo script di utilità:

```Plain Text
lerobot-find-port
```

#### 2. Esempio di output

Riconoscendo la porta del braccio Leader (es. `/dev/tty.usbmodem575E0031751` su Mac o `/dev/ttyACM0` su Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Riconoscendo la porta del braccio Follower (es. `/dev/tty.usbmodem575E0032081` o `/dev/ttyACM1` su Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Ricordarsi di scollegare il connettore USB, altrimenti l'interfaccia non viene rilevata.

#### 3. Risoluzione problemi

Su Linux, concedere l'accesso alla porta USB:

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### Calibrare il braccio robotico

Collegare alimentazione e cavo dati e calibrare affinché Leader e Follower coincidano nella stessa posizione fisica. Questa calibrazione è fondamentale perché una rete addestrata su un SO-10x funzioni su un altro. In caso di ricalibrazione, eliminare completamente i file sotto `~/.cache/huggingface/lerobot/calibration/robots` o `~/.cache/huggingface/lerobot/calibration/teleoperators`, altrimenti errore. I dati sono salvati in json in quella directory.

#### 1. Calibrazione manuale del braccio Follower

Collegare i 6 servo tramite i connettori a 3 pin, collegare i servo del telaio alla scheda driver ed eseguire il comando o l'esempio API:

Su PC (Linux) e Jetson: la `prima` porta USB diventa `ttyACM0`, la `seconda` `ttyACM1`.

Prima di eseguire, verificare il mapping Leader/Follower.

#### 2. Autorizzazione interfaccia

Prima autorizzare l'interfaccia:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. Poi calibrare il braccio Follower

Eseguire il comando Python:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

Prima posizionare il robot con tutte le articolazioni al centro del range e tenerlo fermo. Dopo Invio, muovere ogni articolazione su tutto il range. Il file registra i valori centrale, max e min nel json sotto `~/.cache/huggingface/lerobot/calibration/robots` o `~/.cache/huggingface/lerobot/calibration/teleoperators`.
![3. Poi calibrare il braccio Follower – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)



![3. Poi calibrare il braccio Follower – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)




#### **4. Calibrare il braccio Leader**

Come sopra – eseguire:

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

[Video calibrazione centrale.mp4]

### Teleoperazione

#### **1. Teleoperazione semplice

Ora puoi teleoperare! Eseguire questo script semplice (senza fotocamera):

L'**ID associato al robot serve per salvare il file di calibrazione. Per teleoperare, registrare e valutare con la stessa configurazione, usare lo stesso **.

Prima autorizzare la porta seriale:

```Bash
sudo chmod 666 /dev/ttyACM*
```

Eseguire la teleoperazione:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

Il comando esegue automaticamente:
1. Identificare i file di calibrazione mancanti e avviare la calibrazione.
2. Collegare robot e dispositivo di teleoperazione.

#### 2. Teleoperazione con visualizzazione fotocamera

Per istanziare una fotocamera serve un identificatore; può cambiare al riavvio o alla ricollezione (in base all'OS).

Trovare l'**indice della fotocamera**:

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

Il terminale mostra le informazioni.
![2. Teleoperazione con visualizzazione fotocamera – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)




Le immagini sono in `~/lerobot/outputs/captured_images`.

Su **macOS** con Intel RealSense può comparire **"Error finding RealSense cameras: failed to set power state"** – risolvere eseguendo con `sudo`. RealSense su macOS è instabile.

Per mostrare la fotocamera durante la teleoperazione:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` sono immagini compresse; si può provare una risoluzione maggiore. Anche `YUYV` è possibile ma riduce risoluzione/FPS e fa sfarfallare il braccio. Attualmente `MJPG` supporta `3` fotocamere a `1920*1080` e `30FPS`; sconsigliato: 2 fotocamere sullo stesso HUB USB.

Aggiungere fotocamere con `--robot.cameras`; `index_or_path` segue l'ultima cifra dell'ID di `python -m lerobot.find_cameras opencv`.

Esempio con fotocamera aggiuntiva:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

Per la fotocamera di profondità RealSense, eseguire prima `python -m lerobot.find_cameras realsense`, sostituire `serial_number_or_name: "323622271780"` con il proprio ID e attivare `use_depth: true`:

![2. Teleoperazione con visualizzazione fotocamera – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. Raccolta dati

### Registrare un dataset

- Per salvare in locale, eseguire direttamente:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

`dateset.repo_id` e `dataset.single_task` sono personalizzabili. Con `push_to_hub=false`, viene creata la cartella `juxi/test` sotto `~/.cache/huggingface/lerobot`. [Con RealSense, adattare il comando](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- Per caricare sul Hub, accedere con un token in scrittura (creazione su [Hugging Face Settings](https://huggingface.co/settings/tokens)):

```Bash
hf auth login
```

Salvare il nome del repository in una variabile:

```Bash
hf auth whoami
```

Registrare 5 episodi e caricare:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

Output del tipo:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**Spiegazione parametri**
- episode_time_s: durata di raccolta per episodio.
- reset_time_s: tempo di preparazione tra episodi.
- num_episodes: numero di gruppi di dati.
- push_to_hub: se caricare sul Hub HuggingFace.

|Tasto|Azione|
|---|---|
|Freccia destra →|terminare/ripristinare l'episodio corrente; passare al successivo.|
|Freccia sinistra ←|annullare l'episodio corrente; registrare di nuovo.|

### Visualizzare un dataset

Con upload: [visualizzazione online](https://huggingface.co/spaces/lerobot/visualize_dataset) – copiare l'ID del repository generato:

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/so101_test \
  --local-files-only 1
```

Senza upload, anche in locale:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test
```

`juxi` è il `repo_id` personalizzato in fase di raccolta.
![Visualizzare un dataset – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)


### Riprodurre un episodio (opzionale)

Riprodurre un episodio del dataset:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
  --dataset.repo_id=${HF_USER}/so101_test \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.num_episodes=1 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.push_to_hub=true \
  --replay=true
```

## E. Training e valutazione del dataset

### ACT

Tutorial ufficiale [ACT](https://huggingface.co/docs/lerobot/training#act)

**Training**

```Bash
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000
```

**Per dataset locali: **`repo_id`** deve corrispondere alla raccolta; aggiungere **`--policy.push_to_hub=false`**.**

```Python
lerobot-train \
  *--dataset.repo_id*=juxi/test \
  *--policy.type*=act \
  *--output_dir*=outputs/train/act_so101_test \
  *--job_name*=act_so101_test \
  *--policy.device*=cuda \
  *--wandb.enable*=false \
  *--policy.push_to_hub*=false\
  *--steps*=300000
```

Spiegazione
- **Dataset**: tramite `--dataset.repo_id=${HF_USER}/so101_test`.
- **Passi**: `--steps=300000`; default 800000 – regolare in base alla difficoltà osservando la loss.
- **Policy**: `policy.type=act`; anche [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla] (caricata da `configuration_act.py`). Importante: si adatta automaticamente a motori, azioni e numero di fotocamere del robot (salvati nel dataset).
- **Dispositivo**: `policy.device=cuda` per Nvidia; `policy.device=mps` per Apple Silicon.
- **Visualizzazione**: `wandb.enable=true` con [Weights and Biases](https://docs.wandb.ai/quickstart); opzionale ma richiede `wandb login`.

Se compare l'errore:
![ACT – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)




Eseguire:

```Bash
pip install datasets==2.19
```

Il training può durare ore. I pesi sono in `outputs/train/act_so101_test/checkpoints`.

Per riprendere da un checkpoint:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**Valutazione**

Usare la funzione `record` di [`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) con la policy come input – es. 10 episodi di valutazione:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `--policy.path` punta ai pesi (es. `outputs/train/act_so101_test/checkpoints/last/pretrained_model`); è possibile anche un repository di modello (es. `$\{HF_USER\}/act_so101_test`).
2. Se `dataset.repo_id` inizia con `eval_`, video e dati vengono registrati separatamente nella cartella `eval_` (es. `juxi/eval_test123`).
3. A `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, eliminare prima la cartella `eval_`.
4. A `mean is infinity. ...`, le chiavi di `--robot.cameras` (front, side ...) devono corrispondere esattamente alla raccolta.

### Smolvla

Tutorial ufficiale [SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**Training**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**Valutazione**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

Tutorial ufficiale [Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**Training**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false
```

**Valutazione**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

Tutorial ufficiale [Pi0.5](https://huggingface.co/docs/lerobot/pi05)

```Bash
pip install -e ".[pi]"
```

**Training**

```Bash
lerobot-train \
    --dataset.repo_id=juxi/eval_test123 \
    --policy.type=pi05 \
    --output_dir=outputs/pi05_training \
    --job_name=pi05_training \
    --policy.pretrained_path=lerobot/pi05_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch_size=32
```

**Valutazione**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi05_training/checkpoints/last/pretrained_model
```

### GR00T N1.5

Tutorial ufficiale [GR00T](https://huggingface.co/docs/lerobot/gr00t)

Training come Pi0, tipo di policy `gr00t`.

## F. Training su server cloud, deploy ed export del modello

#### **1. Cliccare su «Mercato di calcolo», scegliere la GPU – possibilmente multi-core**
![1. Cliccare su «Mercato di calcolo», scegliere la GPU – possibilmente multi-core – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)


#### **2. Scegliere «Pagamento a consumo», immagine base «Miniconda/conda3/3.8(ubuntu20.04)/11.8», poi «Crea subito»**
![2. Scegliere «Pagamento a consumo», immagine base «Miniconda/conda3/3.8ubuntu20.04/11.8», poi «Crea subito» – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)


#### **3. Clic su «JupyterLab» per entrare nell'interfaccia e aprire un terminale**
![3. Clic su «JupyterLab» per entrare nell'interfaccia e aprire un terminale – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)


#### **4. Inizializzare l'ambiente conda**

```Plain Text
conda env list
```

```Plain Text
conda activate base
```

```Plain Text
conda init
```
![4. Inizializzare l'ambiente conda – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)


#### **5. Chiudere questo terminale e aprirne uno nuovo**

Vedi https://www.autodl.com/docs/network_turbo/

```Plain Text
source /etc/network_turbo
```
![5. Chiudere questo terminale e aprirne uno nuovo – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)




#### **6. Creare l'ambiente lerobot**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Alternativa: https://github.com/huggingface/lerobot.git – i comandi dell'ultima versione possono differire!

```PowerShell
conda install ffmpeg -c conda-forge
```
![6. Creare l'ambiente lerobot – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)


#### **7. Entrare in lerobot sotto src, installare LeRobot con feetech:**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8. Importare il dataset sul server cloud**

Due casi: **dataset già caricato nella base Huggingface in fase di raccolta** o no.

**① Già caricato: accesso tramite la chiave ottenuta da Huggingface**



```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```
![8. Importare il dataset sul server cloud – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)




```Plain Text
export HYDRA_FULL_ERROR=1
```

**② Caricare il dataset locale con FileZilla:** vedi https://www.autodl.com/docs/filezilla/

Installazione più semplice su Linux:

```Python
sudo apt install filezilla
```

```Python
filezilla
```

Aprire FileZilla, «File» → «Gestore siti», «Nuovo sito», protocollo «SFTP»
![8. Importare il dataset sul server cloud – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)



![8. Importare il dataset sul server cloud – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)




Tornare ad AutoDL: copiare il «comando di login», incollare le informazioni e cliccare «Connetti»
![8. Importare il dataset sul server cloud – 4](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)



![8. Importare il dataset sul server cloud – 5](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)



![8. Importare il dataset sul server cloud – 6](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)



![8. Importare il dataset sul server cloud – 7](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)



![8. Importare il dataset sul server cloud – 8](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)




Creare la cartella `data` nella directory lerobot del server
![8. Importare il dataset sul server cloud – 9](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)




Trascinare la cartella del dataset a destra e attendere il trasferimento
![8. Importare il dataset sul server cloud – 10](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)




#### 9. Training del dataset

Vedi [E. Training e valutazione del dataset] di questo tutorial; eseguire il comando di training

#### 10. Export del modello

Dopo il training, esportare il modello dalla directory train
![10. Export del modello – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)




## G. Domande frequenti

Con questo tutorial, clonare il repository consigliato https://github.com/Juxi-Technology/lerobot.git

Il repository consigliato è la versione stabile validata; il repository ufficiale Lerobot viene aggiornato in tempo reale e può causare problemi imprevisti (versioni di dataset diverse, comandi diversi).

- [Con RealSense, adattare i comandi](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- Su Jetson: senza numero/duraggio episodi, l'interruzione con ctrl+z disconnette braccio e fotocamera; dopo la riconnessione, tutte le porte cambiano.

Aggiungere i parametri di episodi e durata al comando di valutazione, es.:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- Alla calibrazione degli ID servo:

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

Controllare bene il cavo di comunicazione verso il servo e la tensione di alimentazione.

- A:

```Bash
Could not connect on port "/dev/ttyACM0"
```

Se `ls /dev/ttyACM*` mostra ACM0 ma non connette: permesso di porta dimenticato – `sudo chmod 666 /dev/ttyACM*`.

- A:

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

Installare ffmpeg 7.1.1: `conda install ffmpeg=7.1.1 -c conda-forge`.
![G. Domande frequenti – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)




- A:

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

Verificare che il braccio sulla porta indicata sia alimentato e che nessun cavo servo bus sia allentato; il LED spento segnala il cavo allentato del servo precedente.

- Alla calibrazione:

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

Spegnere e riaccendere il braccio e ricalibrare; utile anche con angoli MAX a decine di migliaia. Altrimenti ricalibrare il servo (calibrazione centrale + scrittura ID).

- Nella valutazione:

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

Eliminare la cartella `eval_` e rilanciare.

- Nella valutazione:

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

Le chiavi (front, side ...) di `--robot.cameras` devono corrispondere esattamente alla raccolta.

## Trovare il servo su Windows (software host di debug Feetech)

Per il debug, qualsiasi PC Windows può programmare, eseguire il debug o testare il servo via USB. A tal fine, scaricare il [software Feetech](https://www.feetechrc.com/software.html). Per i sistemi Ubuntu è possibile usare il [tool FT_SCServo_Debug_Qt](https://github.com/Kotakku/FT_SCServo_Debug_Qt).

[fddebug-master.zip]

Selezionare il numero di porta, impostare il baud rate su 1000000, aprirla e fare clic su "Search"

![Trovare il servo su Windows software host di debug Feetech – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)

## Controllo di simulazione ROS2 (implementabile in modo indipendente)

https://github.com/holmsslk/so-arm-moveit-hardware

## Impostare ID servo e calibrazione mediana sul web

https://bambot.org/feetech.js?lang=zh

1. Inserire 0 o 1 in base al modello di servo, quindi fare clic su "Connect".

![Impostare ID servo e calibrazione mediana sul web – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2. Scansionare i servo con ID da 1 a 6; l'ID corrispondente si conferma tramite FOUND nei risultati della scansione. Esempio: il servo ID 1 nell'immagine è stato scansionato.

![Impostare ID servo e calibrazione mediana sul web – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3. Impostazione ID e calibrazione mediana

① Il campo ID servo corrente richiede l'ID del servo scansionato

② Inserire un numero in "Gestione ID" e fare clic su "Change ID" per impostare l'ID

③ Calibrazione mediana (il valore mediano del servo STS3215 è 2047, quello del SCS0009 è 511)

Servo STS: inserire 2047 in "Position Control" e fare clic su "Set"

Servo SCS: inserire 511 in "Position Control" e fare clic su "Set".

![Impostare ID servo e calibrazione mediana sul web – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)

<RelatedProducts slugs="so-arm101,robot-vision-kit,tpu-flexible-gripper" />
