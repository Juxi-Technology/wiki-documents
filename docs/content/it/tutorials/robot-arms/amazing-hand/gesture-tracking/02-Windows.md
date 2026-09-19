---
title: "Distribuzione ed esecuzione in un clic su Windows"
description: "Distribuzione in un clic del tracciamento dei gesti AmazingHand su Windows: doppio clic sugli script, poi controllare la mano simulata o reale con i gesti."
---

# Distribuzione ed esecuzione in un clic su Windows

**AmazingHand-main.zip**（AmazingHand-main.zip, supera il limite di dimensione per file del sito — richiedilo a support@juxitech.com）

Questo tutorial si basa sulla Demo ufficiale di AmazingHand (mano abile Pollen Robotics); gli script di distribuzione in un clic sono già pronti.
È sufficiente eseguirli in ordine numerico. **Tutti gli script si trovano nella cartella ****`Demo\Windows一键部署脚本\`**** e si avviano facendo doppio clic。**

---

## Preparazione hardware

> I file del modello possono essere consultati o scaricati autonomamente su [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclusi URDF)。
> 
> 

---

## Installazione dell'ambiente (script 1)

**Fare doppio clic su ****`1-安装环境.bat`**; viene eseguito automaticamente:

1. **Verifica degli strumenti di build MSVC** (cl.exe)——necessari per la compilazione di Rust. Se assenti, viene richiesta l'installazione di
Visual Studio 2022 Build Tools; selezionare "Sviluppo di applicazioni desktop con C++"; al termine dell'installazione riaprire il terminale。

2. **Installazione di Rust** (rustup + toolchain stable-msvc)

3. **Configurazione del mirror cargo di Tsinghua** (`C:\Users\<nome-utente>\.cargo\config.toml`) per accelerare il download dei crate

4. **Installazione di uv** (gestore di pacchetti Python)

5. **Installazione di dora-cli 0.5.0** (`cargo install`; la prima compilazione richiede circa 10~20 minuti, attendere con pazienza)

6. **Installazione del pacchetto pip dora-rs** (opzionale, verrà installato nell'ambiente virtuale)

> **Importante**: al termine dello script **chiudere e riaprire il terminale** per rendere effettive le variabili d'ambiente. L'installazione potrebbe essere lenta a causa della rete; attendere con pazienza e non chiudere a metà processo。
> 
> 

### Alternativa con installazione manuale (quando gli script non sono disponibili)

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - Su Windows usare rustup-init.exe e selezionare la toolchain MSVC predefinita

    - Variabili d'ambiente: aggiungere `%USERPROFILE%.cargo\bin` al PATH

- **uv**: in PowerShell eseguire `irm ``https://astral.sh/uv/install.ps1`` | iex`

    - Variabili d'ambiente: aggiungere `%USERPROFILE%.local\bin` al PATH

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

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

> Usare l'**indice sparse** (come sopra) e non il mirror del repository git——con il metodo git al primo utilizzo occorre scaricare circa 1 GB di indice, con il rischio di bloccarsi su `Updating 'tuna' index`。
> 
> 

---

## Metodo di cablaggio

- La scheda driver dei servomotori si collega al computer via USB, **con alimentatore esterno 5V4A**

- Sul lato computer individuare il numero di porta: **Gestione dispositivi → Porte (COM e LPT)**, ad es. `COM11`

---

## Configurazione della porta seriale (script 2)

**Fare doppio clic su ****`2-配置串口.bat`** (la logica effettiva è in `2-配置串口.ps1`):

1. Compare l'avviso "collegare la scheda driver dei servomotori al computer" → premere Invio per avviare il rilevamento

2. Vengono elencate automaticamente le porte COM rilevate (con il nome del dispositivo)

3. Con una sola porta premere Invio per confermare; con più porte inserire il numero

4. Vengono scritti automaticamente `--serialport` nei 3 dataflow yml e la porta predefinita in `AHControl\src\main.rs`

5. Il file originale viene automaticamente salvato come backup `.bak`

> Se si ricollega l'USB, il numero di porta può cambiare; è necessario rieseguire questo script。
> 
> 

---

## Distribuzione del codice (script 3)

**Fare doppio clic su ****`3-部署代码.bat`**; viene eseguito automaticamente:

1. Avvio del daemon dora (`dora up`)

2. Creazione dell'ambiente virtuale Python 3.12 (`uv venv --python 3.12`)

3. Attivazione dell'ambiente virtuale

4. Compilazione del nodo Rust AHControl (`cargo build --release`, circa 10 minuti la prima volta)

5. Sincronizzazione delle dipendenze di AHSimulation e HandTracking (`uv sync`)

6. Installazione forzata di mediapipe==0.10.14

> La distribuzione deve essere eseguita una sola volta. Le esecuzioni successive chiederanno se ricreare l'ambiente virtuale。
> 
> 

---

## Esecuzione del codice (script 4)

**Fare doppio clic su ****`4-运行代码.bat`**; compare il menu interattivo:

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

> Alla prima esecuzione Windows potrebbe bloccare l'accesso alla telecamera; è sufficiente cliccare su "Consenti"。
> 
> 

---

## Pulizia del progetto (script 0)

**Fare doppio clic su ****`0-清理项目.bat`**; dopo aver confermato con `Y`, viene eseguita automaticamente la pulizia:

1. Arresto del daemon dora

2. Eliminazione dei 3 ambienti virtuali (`.venv`)

3. Eliminazione degli artefatti di compilazione Rust (`Demo\target`)

4. Eliminazione di `pycache`, dei backup `.bak`, dei log e di `Demo\out` (directory dei log di dora)

5. **Ripristino della porta predefinita** (`--serialport /dev/ttyACM0`), per rimuovere i residui della porta seriale locale

> Dopo la pulizia è possibile copiare l'intera cartella `AmazingHand-main` ad altri, pulita e senza residui. Su una nuova macchina è sufficiente eseguire nell'ordine 1 → 2 → 3 → 4。
> 
> 

---

## Domande frequenti e avvertenze

### 8.1 cargo si blocca su `Updating 'tuna' index`

- Causa: la configurazione del mirror usa il **metodo con repository git** (`.../git/crates.io-index.git`); al primo utilizzo occorre scaricare oltre 1 GB di indice

- Soluzione: modificare `C:\Users\<nome-utente>\.cargo\config.toml` con l'**indice sparse** (vedere la sezione 2.2), oppure rieseguire direttamente `1-安装环境.bat`

### 8.2 mediapipe: sottomodulo solutions mancante / installazione danneggiata

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Deve essere eseguito con l'ambiente virtuale attivo (nella directory `Demo`)

- `3-部署代码.bat` esegue già automaticamente questo passaggio come soluzione di riserva

### 8.3 Versione di dora incompatibile (message v0.8.0 vs v0.7.0)

- Sintomo: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: la versione di dora-cli non corrisponde a dora-node-api. **È necessario uniformare alla 0.5.0**

    - Verifica: `dora --version` dovrebbe restituire `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - Correzione: `cargo install dora-cli --version 0.5.0 --force`

    - Se nel PATH sono presenti più versioni di dora (ad es. una versione precedente in `C:\Users\xxx\.dora\bin`), assicurarsi che `.cargo\bin` venga prima, oppure eliminare la versione precedente

### 8.4 Caricamento del modello MuJoCo / mediapipe non riuscito (percorso con caratteri cinesi)

- Sintomo: `ParseXML: Error opening file '...\scene.xml'` oppure `Can't find file: ....tflite`

- Causa: il loader C++ di MuJoCo 3.x / mediapipe su Windows **non riesce ad aprire percorsi assoluti contenenti caratteri cinesi** (ad es. `D:\Claude工作区...`)

- Questo progetto include già correzioni integrate:

    - `AHSimulation\AHSimulation\mj_mink_*.py` cambia la directory di lavoro prima di caricare il modello

    - `HandTracking\mediapipe_patch.py` aggira il problema usando il percorso breve 8.3 + un percorso relativo

- Non eliminare questo codice di correzione

### 8.5 Permessi della telecamera

- Alla prima esecuzione, nella finestra che compare scegliere "Consenti"

- Impostazioni → Privacy → Fotocamera → Consenti l'accesso alle app desktop

### 8.6 Il numero di porta cambia ogni volta

- Dopo aver ricollegato l'USB il numero COM può cambiare; rieseguire `2-配置串口.bat`

### 8.7 openCV mancante

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(eseguire nella directory `HandTracking`, dopo aver attivato l'ambiente virtuale)

---

## Descrizione della struttura del codice

### Directory Demo

### Corrispondenza tra i vari dataflow

### Principio del flusso di dati

```Bash
Telecamera → HandTracking (riconoscimento dei gesti con MediaPipe)
              ↓ Coordinate dei keypoint della mano
         AHSimulation (simulazione MuJoCo + cinematica inversa)
              ↓ Angoli target delle articolazioni
         AHControl (porta seriale → scheda driver per servomotori → mano robotica)
```

### Posizione della configurazione delle porte

- Riga `args:` dei tre `dataflow_tracking_real_*.yml`: `--serialport COMxx`

- `default_value = "COMxx"` in `AHControl\src\main.rs` (valore predefinito del parametro della porta seriale)

- `AHControl\config\*.toml`: modello dei servomotori, ID, scostamenti (di norma non è necessario modificarli)

