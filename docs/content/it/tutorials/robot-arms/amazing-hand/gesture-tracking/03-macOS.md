---
title: "Distribuzione ed esecuzione in un clic su Mac"
description: "Questo tutorial si basa sulla Demo ufficiale di AmazingHand (mano abile Pollen Robotics); gli script di distr…"
---

# Distribuzione ed esecuzione in un clic su Mac

[AmazingHand-main.zip]

Questo tutorial si basa sulla Demo ufficiale di AmazingHand (mano abile Pollen Robotics); gli script di distribuzione in un clic sono già pronti. È sufficiente eseguirli in ordine numerico. **Tutti gli script si trovano nella cartella Demo/Mac一键部署脚本/ e vanno eseguiti nel terminale con ./nome_script。**

---

## Preparazione hardware

|Hardware|Requisiti|
|---|---|
|Corpo della mano abile|Mano destra / mano sinistra / due mani|
|Scheda driver dei servomotori|Esterna, collegata al computer via USB|
|Alimentazione|**Almeno 5V 4A** (l'alimentazione USB è insufficiente, è obbligatorio un alimentatore esterno)|
|Telecamera|Telecamera integrata del Mac o telecamera USB|

> I file del modello possono essere consultati o scaricati su [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclusi URDF)。
> 
> 

---

## Ottenere il permesso di esecuzione degli script (importante)

**Dopo aver copiato gli script da Windows / da un archivio su Mac, il permesso di esecuzione (****`+x`****) viene perso; eseguendoli direttamente si verifica l'errore
****`Permission denied`****. Prima del primo utilizzo è necessario eseguire:**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

Successivamente ogni script potrà essere eseguito con `./nome_script`。

> Suggerimento: quando si copia `AmazingHand-main` su Mac, il modo più affidabile per preservare i permessi è usare **tar**:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, oppure, dopo l'estrazione, eseguire una volta sola `chmod +x *.sh`。
> 
> 

---

## Installazione dell'ambiente (script 1)

Nel terminale, entrare nella cartella degli script ed eseguire (assicurandosi di aver eseguito il `chmod +x` del passaggio 2 sopra):

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

Viene eseguito automaticamente:

1. **Verifica degli strumenti da riga di comando di Xcode** (necessari per la compilazione di Rust). Se assenti, viene mostrato l'avviso `xcode-select --install`

2. **Installazione di Rust** (rustup + toolchain stable)

3. **Configurazione del mirror cargo di Tsinghua** (`~/.cargo/config.toml`) per accelerare il download dei crate

4. **Installazione di uv** (gestore di pacchetti Python)

5. **Installazione di dora-cli 0.5.0** (`cargo install`; la prima compilazione richiede circa 10~20 minuti, attendere con pazienza). Rimozione automatica delle versioni precedenti di dora

6. **Installazione del pacchetto pip dora-rs** (opzionale)

> **Importante**: al termine dello script **chiudere e riaprire il terminale** per rendere effettive le variabili d'ambiente. Se il numero di versione risulta vuoto, aggiungere il seguente percorso a `~/.zshrc`:
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### Alternativa con installazione manuale (quando gli script non sono disponibili)

- **Strumenti da riga di comando di Xcode**: `xcode-select --install`

- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**: `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Mirror cargo di Tsinghua (~/.cargo/config.toml)

```Plain Text
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> Usare l'**indice sparse** (come sopra) e non il mirror del repository git——con il metodo git al primo utilizzo occorre scaricare circa 1 GB di indice, con il rischio di bloccarsi su `Updating 'tuna' index`。
> 
> 

---

## Metodo di cablaggio

- La scheda driver dei servomotori si collega al computer via USB, **con alimentatore esterno 5V4A**

- Il nome del dispositivo seriale USB su macOS è **/dev/tty.usbmodem\*** oppure **/dev/cu.usbmodem\*** (non `/dev/ttyACM*` come su Linux)

- Visualizzare la porta:

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## Configurazione della porta seriale (script 2)

**Eseguire ****`./2-配置串口.sh`**:

1. Compare l'avviso "collegare la scheda driver dei servomotori al computer" → premere Invio per avviare il rilevamento

2. Vengono elencate automaticamente le porte seriali rilevate (`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`)

3. Con una sola porta premere Invio per confermare; con più porte inserire il numero

4. Vengono scritti automaticamente `--serialport` nei 3 dataflow yml e la porta predefinita in `AHControl/src/main.rs`

5. La porta seriale USB di macOS è di norma leggibile/scrivibile dall'utente; se compare un avviso di mancanza di permessi, eseguire manualmente:

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

Oppure andare in **Impostazioni di Sistema → Privacy e sicurezza → Monitoraggio input** e consentire l'accesso al terminale。

> Se si utilizza una macchina virtuale, collegare il dispositivo USB alla macchina virtuale。
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

Dopo la selezione vengono eseguiti automaticamente `dora build` + `dora run`. Si apre la finestra della telecamera; eseguire i gesti davanti alla telecamera e la mano abile li seguirà in tempo reale. **Ctrl+C per arrestare**; al termine del flusso di dati premere Invio per tornare al menu principale, dove è possibile scegliere un'altra modalità oppure uscire con q。

> **Alla prima esecuzione macOS chiederà l'autorizzazione per la telecamera**: Impostazioni di Sistema → Privacy e sicurezza → Fotocamera, consentire al terminale di usare la telecamera。
> 
> 

---

## Pulizia del progetto (script 0)

**Eseguire ****`./0-清理项目.sh`**; dopo aver confermato con Y, viene eseguita automaticamente la pulizia:

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

- Causa: dopo la copia degli script da Windows / da un archivio su Mac si **perde il bit di esecuzione**

- Soluzione:

```Plain Text
chmod +x *.sh
```

### 9.2 cargo si blocca su `Updating 'tuna' index`

- Causa: la configurazione del mirror usa il **metodo con repository git** (`.../git/crates.io-index.git`); al primo utilizzo occorre scaricare oltre 1 GB di indice

- Soluzione: modificare `~/.cargo/config.toml` con l'**indice sparse** (vedere la sezione 3.2), oppure rieseguire direttamente `1-安装环境.sh`

### 9.3 mediapipe: sottomodulo solutions mancante / installazione danneggiata

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- Deve essere eseguito con l'ambiente virtuale attivo (nella directory Demo)

- `3-部署代码.sh` esegue già automaticamente questo passaggio come soluzione di riserva

### 9.4 Versione di dora incompatibile (message v0.8.0 vs v0.7.0)

- Sintomo: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: la versione di dora-cli non corrisponde a dora-node-api. **È necessario uniformare alla 0.5.0**

    - Verifica: `dora --version` dovrebbe restituire `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - `1-安装环境.sh` rileva automaticamente le versioni precedenti e forza la reinstallazione

**Se nel sistema rimane una versione precedente di dora (ad es. 0.4.1), rimuoverla prima manualmente:**

```Bash
# 1. Individuare la versione precedente di dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Eliminare la versione precedente trovata (in base al percorso reale)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Forzare l'installazione di 0.5.0
cargo install dora-cli --version 0.5.0 --force

# 4. Verificare la versione (dovrebbe mostrare dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Se `dora --version` mostra ancora la versione precedente, significa che nel PATH c'è ancora una vecchia dora; individuarle ed eliminarle una per una con which dora。
> 
> 

### 9.5 Nessun permesso per la porta seriale

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- Oppure **Impostazioni di Sistema → Privacy e sicurezza → Monitoraggio input** → consentire il terminale

- Se si usa un dispositivo `tty.*` e non è leggibile, passare al dispositivo `cu.*` corrispondente (i dispositivi cu sono porte di sola lettura, più adatte al controllo diretto)

### 9.6 Permessi della telecamera

- **Alla prima esecuzione, nella finestra che compare scegliere "Consenti"**, oppure andare in **Impostazioni di Sistema → Privacy e sicurezza → Fotocamera** e consentire al terminale di usare la telecamera

- Verificare che la telecamera non sia occupata da altre applicazioni (FaceTime, software per riunioni)

### 9.7 Il numero di porta cambia ogni volta

- Dopo aver ricollegato l'USB il nome del dispositivo può cambiare; rieseguire `2-配置串口.sh`

### 9.8 openCV mancante

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(eseguire nella directory `HandTracking`, dopo aver attivato l'ambiente virtuale)

### 9.9 Compilazione più lenta su Apple Silicon / Prima esecuzione bloccata da Gatekeeper

- Su Apple Silicon la prima compilazione delle dipendenze di dora tramite `cargo build` è più lenta e ciò è normale; attendere con pazienza

- Se compare l'avviso "impossibile verificare lo sviluppatore": Impostazioni di Sistema → Privacy e sicurezza → Apri comunque

---

## Descrizione della struttura del codice

### Directory Demo

|Cartella/File|Descrizione|
|---|---|
|AHControl|Nodo Rust, controlla i motori dei servomotori. src/main.rs è il punto di ingresso|
|AHSimulation|Nodo Python, simulazione MuJoCo + cinematica inversa (mink)|
|HandTracking|Nodo Python, tracciamento della mano con MediaPipe|
|dataflow_\*.yml|Definizione del flusso di dati dora (grafo delle connessioni tra nodi)|
|Mac一键部署脚本|Questa serie di script in un clic|

### Corrispondenza tra i vari dataflow

|File|Uso|
|---|---|
|dataflow_tracking_simu.yml|Ambiente di simulazione, gesti dalla telecamera → due mani simulate|
|dataflow_tracking_real_right.yml|Mano destra su hardware reale|
|dataflow_tracking_real_left.yml|Mano sinistra su hardware reale|
|dataflow_tracking_real_2hands.yml|Due mani su hardware reale (collegate alla stessa scheda driver)|

### Principio del flusso di dati

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Posizione della configurazione delle porte

- Riga `args:` dei tre `dataflow_tracking_real_*.yml`: `--serialport /dev/cu.usbmodem...`

- `default_value` in `AHControl/src/main.rs` (valore predefinito del parametro della porta seriale)

- `AHControl/config/*.toml`: modello dei servomotori, ID, scostamenti (di norma non è necessario modificarli)



