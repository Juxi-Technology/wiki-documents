---
title: "Distribuzione ed esecuzione in un clic su Linux（Ubuntu）"
description: "Distribuzione in un clic del tracciamento dei gesti AmazingHand su Ubuntu: eseguire gli script nel terminale e controllare la mano simulata o reale con gesti."
---

# Distribuzione ed esecuzione in un clic su Linux（Ubuntu）

AmazingHand-main.zip

Questo tutorial si basa sulla Demo ufficiale di AmazingHand (mano abile Pollen Robotics); gli script di distribuzione in un clic sono già pronti.
È sufficiente eseguirli in ordine numerico. **Tutti gli script si trovano nella cartella ****`Demo/Linux(Ubuntu)一键部署脚本/`**** e vanno eseguiti nel terminale con ****`./nome_script`****。**

---

## Preparazione hardware

> I file del modello possono essere consultati o scaricati autonomamente su [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclusi URDF)。
> 
> 

---

## Ottenere il permesso di esecuzione degli script (importante)

**Dopo aver copiato gli script da Windows / da un archivio su Linux, il permesso di esecuzione (****`+x`****) viene perso**; eseguendoli direttamente si verifica l'errore
`Permission denied`. **Prima del primo utilizzo è necessario eseguire:**

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
chmod +x *.sh
```

Successivamente ogni script potrà essere eseguito con `./nome_script`. È anche possibile unire i due passaggi in uno:

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本" && chmod +x *.sh && ./1-安装环境.sh
```

> Suggerimento: quando si copia `AmazingHand-main` su Linux, il modo più affidabile per preservare i permessi è usare **tar**:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main` (creare l'archivio su Windows/Linux ed estrarlo sul lato Linux),
> oppure, dopo l'estrazione, eseguire una volta sola `chmod +x *.sh`。
> 
> 

---

## Installazione dell'ambiente (script 1)

Nel terminale, entrare nella cartella degli script ed eseguire (assicurandosi di aver eseguito il `chmod +x` del passaggio 2 sopra):

```Bash
cd "Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
./1-安装环境.sh
```

Viene eseguito automaticamente:

1. **Installazione di Rust** (rustup + toolchain stable)

2. **Configurazione del mirror cargo di Tsinghua** (`~/.cargo/config.toml`) per accelerare il download dei crate

3. **Installazione di uv** (gestore di pacchetti Python)

4. **Installazione di dora-cli 0.5.0** (`cargo install`; la prima compilazione richiede circa 10~20 minuti, attendere con pazienza)

5. **Installazione del pacchetto pip dora-rs** (opzionale)

> **Importante**: al termine dello script **chiudere e riaprire il terminale** per rendere effettive le variabili d'ambiente. Se il numero di versione risulta vuoto, aggiungere il seguente percorso a `~/.bashrc`:
> 
> export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
> 
> 

### Alternativa con installazione manuale (quando gli script non sono disponibili)

- **Rust**:

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **uv**:

```Bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- **dora-cli**:

```Bash
cargo install dora-cli --version 0.5.0
```

### Configurazione del mirror cargo di Tsinghua (~/.cargo/config.toml)

```Bash
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> Usare l'**indice sparse** (come sopra) e non il mirror del repository git: con il metodo git al primo utilizzo occorre scaricare circa 1 GB di indice, con il rischio di bloccarsi su `Updating 'tuna' index`。
> 
> 

---

## Metodo di cablaggio

- La scheda driver dei servomotori si collega al computer via USB, **con alimentatore esterno 5V4A**

- Visualizzare il numero di porta:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

- Di norma è `/dev/ttyACM0`

---

## Configurazione della porta seriale (script 2)

**Eseguire ****`./2-配置串口.sh`**:

1. Compare l'avviso "collegare la scheda driver dei servomotori al computer" → premere Invio per avviare il rilevamento

2. Vengono elencate automaticamente le porte seriali rilevate (`/dev/ttyACM*` / `/dev/ttyUSB*`)

3. Con una sola porta premere Invio per confermare; con più porte inserire il numero

4. Vengono scritti automaticamente `--serialport` nei 3 dataflow yml e la porta predefinita in `AHControl/src/main.rs`

5. **Configurazione automatica dei permessi della porta seriale**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

6. Si consiglia di aggiungere l'utente corrente al gruppo dialout (per evitare di inserire la password ogni volta; è necessario disconnettersi e riconnettersi):

```Bash
sudo usermod -aG dialout $USER
```

> Se nella macchina virtuale `ls /dev/ttyUSB* /dev/ttyACM*` non restituisce risultati, collegare il dispositivo USB alla macchina virtuale nelle impostazioni della stessa。
> 
> 

---

## Distribuzione del codice (script 3)

**Eseguire ****`./3-部署代码.sh`**; viene eseguito automaticamente:

1. Avvio del daemon dora (`dora up`)

2. Creazione dell'ambiente virtuale Python 3.12 (`uv venv --python 3.12`)

3. Attivazione dell'ambiente virtuale

4. Compilazione del nodo Rust AHControl (`cargo build --release`, circa 10 minuti la prima volta)

5. Sincronizzazione delle dipendenze di AHSimulation e HandTracking (`uv sync`)

6. Installazione forzata di mediapipe==0.10.14 (problema noto del tutorial, soluzione di riserva)

> La distribuzione deve essere eseguita una sola volta. Le esecuzioni successive chiederanno se ricreare l'ambiente virtuale。
> 
> 

---

## Esecuzione del codice (script 4)

**Eseguire ****`./4-运行代码.sh`**; compare il menu interattivo:

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- Selezionare **1**: ambiente di simulazione, i gesti ripresi dalla telecamera azionano due mani simulate

- Selezionare **2**: si entra nel sottomenu, scegliere mano destra / mano sinistra / due mani

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

Dopo la selezione vengono eseguiti automaticamente `dora build` + `dora run`. Si apre la finestra della telecamera; eseguire i gesti davanti alla telecamera e la mano abile li seguirà in tempo reale. **Ctrl+C per arrestare**; al termine del flusso di dati premere Invio per tornare al menu principale, dove è possibile scegliere un'altra modalità oppure uscire con `q`。

> Il desktop Linux richiede i permessi per la telecamera (ad es. Impostazioni privacy di Ubuntu → Fotocamera) e occorre verificare che la telecamera non sia occupata da altre applicazioni.
> Se nella macchina virtuale la telecamera non si apre, vedere 9.6 Permessi della telecamera / La macchina virtuale non riesce ad aprire la telecamera.
> 
> 

---

## Pulizia del progetto (script 0)

**Eseguire ****`./0-清理项目.sh`**; dopo aver confermato con `Y`, viene eseguita automaticamente la pulizia:

1. Arresto del daemon dora

2. Eliminazione dei 3 ambienti virtuali (`.venv`)

3. Eliminazione degli artefatti di compilazione Rust (`Demo/target`)

4. Eliminazione di `__pycache__`, dei backup `.bak`, dei log e di `Demo/out` (directory dei log di dora)

5. **Ripristino della porta predefinita** (`--serialport /dev/ttyACM0`), per rimuovere i residui della porta seriale locale

> Dopo la pulizia è possibile copiare l'intera cartella `AmazingHand-main` ad altri, pulita e senza residui. Su una nuova macchina è sufficiente eseguire nell'ordine 1 → 2 → 3 → 4。
> 
> 

---

## Domande frequenti e avvertenze

### 9.1 `Permission denied` (gli script non hanno il permesso di esecuzione)

- Sintomo: eseguendo `./1-安装环境.sh` si ottiene `bash: ./1-安装环境.sh: Permission denied`

- Causa: dopo la copia degli script da Windows / da un archivio su Linux si **perde il bit di esecuzione**

- Soluzione: aggiungere il permesso di esecuzione a tutti gli script

```Bash
chmod +x *.sh
```

- Poi eseguire con `./nome_script` (non usare `bash nome_script`, altrimenti viene saltato l'avviso interattivo del passaggio 2 di questo tutorial)

### 9.2 cargo si blocca su `Updating 'tuna' index`

- Causa: la configurazione del mirror usa il **metodo con repository git** (`.../git/crates.io-index.git`); al primo utilizzo occorre scaricare oltre 1 GB di indice

- Soluzione: modificare `~/.cargo/config.toml` con l'**indice sparse** (vedere la sezione 3.2), oppure rieseguire direttamente `1-安装环境.sh`

### 9.3 mediapipe: sottomodulo solutions mancante / installazione danneggiata

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Deve essere eseguito con l'ambiente virtuale attivo (nella directory `Demo`)

- `3-部署代码.sh` esegue già automaticamente questo passaggio come soluzione di riserva

### 9.4 Versione di dora incompatibile (message v0.8.0 vs v0.7.0)

- Sintomo: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: la versione di dora-cli non corrisponde a dora-node-api. **È necessario uniformare alla 0.5.0**

    - Verifica: `dora --version` dovrebbe restituire `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - `1-安装环境.sh` ora esegue il **rilevamento automatico della versione**: se non è la 0.5.0, la rimuove e la reinstallazione viene forzata

**Se nel sistema rimane una versione precedente di dora (ad es. 0.4.1), rimuoverla manualmente prima di reinstallare:**

```Bash
# 1. Individuare dove si trova la versione precedente di dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Eliminare la versione precedente trovata (eliminare in base al percorso reale, possono essere più di una)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Forzare l'installazione di 0.5.0 (installare in ~/.cargo/bin)
cargo install dora-cli --version 0.5.0 --force

# 4. Verificare la versione (dovrebbe mostrare dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Se `dora --version` mostra ancora la versione precedente, significa che in altre posizioni del PATH si nasconde una vecchia versione di dora; individuarle ed eliminarle una per una con `which dora` e assicurarsi che `~/.cargo/bin` sia tra le prime posizioni del PATH.
> 
> 

### 9.5 Nessun permesso per la porta seriale (Permission denied)

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

- A ogni ricollegamento i permessi potrebbero essere reimpostati

- Soluzione definitiva: `sudo usermod -aG dialout $USER`, quindi disconnettersi e riconnettersi

### 9.6 Permessi della telecamera / La macchina virtuale non riesce ad aprire la telecamera

**Host reale**:

- Ubuntu: Impostazioni → Privacy → Fotocamera → Consenti l'accesso alle applicazioni

- Verificare che la telecamera non sia occupata da altre applicazioni (app Fotocamera, Zoom, ecc.)

**La macchina virtuale (VMware) non riesce ad aprire la telecamera**:

Sintomo: `open VIDEOIO(V4L2:/dev/video0): can't open camera by index` oppure `select() timeout`,
mentre `ls /dev/video0` esiste e `v4l2-ctl` riesce a catturare frame, ma OpenCV `cap.read()` restituisce sempre `ret = False`。

Diagnosi e soluzione (in ordine):

1. **Inoltrare la telecamera nella macchina virtuale**: Menu → Macchina virtuale → Dispositivi rimovibili → Telecamera → Connetti

2. **Cambiare la versione del controller USB (soluzione comune per VMware, la più efficace)**:

    - Macchina virtuale → Impostazioni → **Controller USB** → commutare `USB 2.0` / `USB 3.1`

    - Dopo il cambio **riavviare la macchina virtuale** e riprovare

3. Verificare che il dispositivo esista:

```Plain Text
ls -l /dev/video0
sudo usermod -aG video $USER   # Aggiungi al gruppo video, logout e nuovo login
```

4. Usare v4l2 per verificare se la telecamera riesce effettivamente a produrre frame (se produce frame = driver corretto, il problema è la compatibilità con OpenCV):

```Bash
v4l2-ctl --device=/dev/video0 --set-fmt-video=width=640,height=480,pixelformat=MJPG --stream-mmap --stream-count=1 --stream-to=/tmp/frame.jpg
ls -l /tmp/frame.jpg   # Decine~centinaia di KB = flusso attivo
```

### 9.7 Il numero di porta cambia ogni volta

- Dopo aver ricollegato l'USB il numero del dispositivo può cambiare; rieseguire `2-配置串口.sh`

### 9.8 openCV mancante

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(eseguire nella directory `HandTracking`, dopo aver attivato l'ambiente virtuale)

---

## Descrizione della struttura del codice

### Directory Demo

### Corrispondenza tra i vari dataflow

### Principio del flusso di dati

```Plain Text
Telecamera → HandTracking (riconoscimento dei gesti con MediaPipe)
              ↓ Coordinate dei keypoint della mano
         AHSimulation (simulazione MuJoCo + cinematica inversa)
              ↓ Angoli target delle articolazioni
         AHControl (porta seriale → scheda driver per servomotori → mano robotica)
```

### Posizione della configurazione delle porte

- Riga `args:` dei tre `dataflow_tracking_real_*.yml`: `--serialport /dev/ttyACMx`

- `default_value = "/dev/ttyACM0"` in `AHControl/src/main.rs` (valore predefinito del parametro della porta seriale)

- `AHControl/config/*.toml`: modello dei servomotori, ID, scostamenti (di norma non è necessario modificarli)

