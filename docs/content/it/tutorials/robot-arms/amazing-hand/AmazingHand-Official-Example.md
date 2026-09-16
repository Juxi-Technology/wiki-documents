---
title: Tutorial di esecuzione dell'esempio ufficiale della mano robotica
description: "Esempio ufficiale della mano robotica AmazingHand: scaricare il codice di Pollen Robotics, installare Rust e seguire le istruzioni per Windows e Linux."
---

# Tutorial di esecuzione dell'esempio ufficiale della mano robotica

> **[Acquista nel negozio](https://www.juxitech.com/it/products/amazinghand)**


## 1. Download del codice

Si consiglia di scaricare l'archivio compresso del codice allegato a questo tutorial per la dimostrazione della demo, oppure di clonare il repository del codice open source ufficiale https://github.com/pollen-robotics/AmazingHand.git . Nota che il codice open source ufficiale può contenere errori o omissioni.

[Tutorial di esecuzione dell'esempio ufficiale AmazingHand](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Archivio compresso del codice per Windows

AmazingHand-main.zip

Archivio compresso del codice per Linux

AmazingHand-main.zip

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Installazione dell'ambiente

Installa Rust, uv e dora-rs secondo la procedura di autoinstallazione del sistema

**1. Installare Rust:** [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

Riferimento per la configurazione delle variabili d'ambiente di Rust su Windows (importante!) https://zhuanlan.zhihu.com/p/1958936613276087180

Impostazioni delle variabili d'ambiente per Linux:

![2. Installazione dell'ambiente – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![2. Installazione dell'ambiente – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Per la prima installazione potrebbe essere richiesto l'installer di Visual Studio

**Configurare la sorgente mirror di Cargo**

Nella cartella `.cargo`, crea il file di configurazione `config.toml` e configura il mirror Tsinghua `crates.io-index`, così Cargo userà la sorgente mirror dell'Università Tsinghua per scaricare i crate.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. Installare uv:** [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![2. Installazione dell'ambiente – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

Sul lato Windows, apri il terminale PowerShell, copia e poi inserisci questo comando per installare

**Impostazioni delle variabili d'ambiente per Linux:**

![2. Installazione dell'ambiente – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3. Installare dora-rs:** per il download e l'installazione fai riferimento a [https://dora-rs.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing)

Impostazioni delle variabili d'ambiente per Linux:

![2. Installazione dell'ambiente – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3. Cablaggio

L'alimentazione richiede almeno 5V3A, è collegata esternamente a una scheda driver servo e si connette al computer via USB

![3. Cablaggio – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4. Demo d'esempio

### **1. Controllare il numero di porta della scheda driver servo**

- Su Windows di solito è COM11; il numero di porta della scheda driver servo si trova tramite il Gestione dispositivi o il software host dei servo Feetech

![1. Controllare il numero di porta della scheda driver servo – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- I sistemi Ubuntu e Linux di solito usano /dev/ttyACM0

Controlla il numero di porta della scheda driver servo dalla riga di comando:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

Se il comando "ls /dev/ttyUSB\* /dev/ttyACM\*" non trova la directory nella macchina virtuale, controlla se la mano robotica è collegata al computer nell'angolo in basso a destra della macchina virtuale. In tal caso, scegli di scollegarla e collegala alla macchina virtuale.

![1. Controllare il numero di porta della scheda driver servo – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2. Modificare il numero di porta nel codice**

① Individua il file di codice main.rs nella directory AmazingHand-main\Demo\AHControl\src, aprilo con un editor di testo e modificalo con il numero di porta trovato sul tuo host (COM\* per Windows, di solito /dev/ttyACM\* per i sistemi Ubuntu e Linux)

![2. Modificare il numero di porta nel codice – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

② Individua il file dell'esempio corrispondente

**Mano destra** trova dataflow_tracking_real_right.yml nella directory AmazingHand-main\Demo

**Mano sinistra** trova dataflow_tracking_real_left.yml nella directory AmazingHand-main\Demo

**Doppia mano robotica** trova dataflow_tracking_real_2hands.yml nella directory AmazingHand-main\Demo

Aprilo in formato testo e modificalo con il numero di porta trovato sul tuo host (COM\* per Windows, di solito /dev/ttyACM\* per i sistemi Ubuntu e Linux)

![2. Modificare il numero di porta nel codice – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![2. Modificare il numero di porta nel codice – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![2. Modificare il numero di porta nel codice – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

### **3. Deploy del codice**

- Apri la cartella Demo

Sul sistema Windows, nella directory digita Powershell e premi Invio per aprirlo, poi avvia il processo demone (ogni volta):

Per i sistemi Linux, aprilo direttamente dalla console e avvia il processo demone (ogni volta):

```Plain Text
dora up
```

- Poi esegui da questa directory nella console (durante la configurazione dell'ambiente puoi eseguirlo una sola volta!! Rieseguirlo sovrascriverà l'ambiente virtuale!!) Crea un ambiente virtuale:

```Plain Text
uv venv --python 3.12
```

- Attiva l'ambiente virtuale (ogni volta) inserendo ed eseguendo quanto segue in base al sistema:

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![3. Deploy del codice – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

Assicurati che la console abbia attivato l'ambiente virtuale!

- Esegui la sincronizzazione delle dipendenze ed entra nella cartella AHControl

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Poi inserisci ` cd.. ` e premi Invio per tornare alla directory Demo! Entra nella cartella AHSimulation

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Poi inserisci `cd..` e premi Invio per tornare alla directory Demo! Entra nella cartella HandTracking

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Risultato

- Apri la cartella Demo! Nella directory digita Powershell e premi Invio per aprirlo, poi avvia il processo demone (ogni volta):

```Plain Text
dora up
```

- Attiva l'ambiente virtuale (ogni volta). Inserisci ed esegui in base al sistema:

Comando per attivare l'ambiente virtuale sulla piattaforma Windows:

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Comando per attivare l'ambiente virtuale sulla piattaforma Linux:

```Plain Text
source .venv/bin/activate
```

### Ambiente di simulazione

- Esegui la demo di tracking della mano via webcam solo nell'ambiente di simulazione:

```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(Execute only once)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![Ambiente di simulazione – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![Ambiente di simulazione – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### Esecuzione su hardware reale (tracking della mano)

- Esegui la demo di tracking della mano via webcam usando l'hardware reale:

    #### Mano destra

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Mano sinistra

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Doppia mano robotica (nota che entrambe sono collegate a una scheda driver servo)

![Esecuzione su hardware reale tracking della mano – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![Esecuzione su hardware reale tracking della mano – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![Esecuzione su hardware reale tracking della mano – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### Esempio semplice per controllare l'angolo delle dita simulate

- Esegui un semplice esempio per controllare l'angolo delle dita in simulazione:

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(Execute only once)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![Esempio semplice per controllare l'angolo delle dita simulate – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![Esempio semplice per controllare l'angolo delle dita simulate – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

Descrizione

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) include un nodo dora-rs per controllare il motore, oltre ad alcune utility per configurare il motore.

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) include un nodo dora-rs per simulare il movimento della mano e ottenere la cinematica inversa.

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) include un nodo dora-rs che traccia le mani da una webcam e le usa come target per controllare AH!



## Precauzioni

### 1. Problema di versione di mediapipe

In pyproject.toml è configurato mediapipe>=0.10.14, ma il pacchetto mediapipe installato non include il sottomodulo solutions. Molto probabilmente la versione di mediapipe è incompatibile con Python 3.12 (le versioni più recenti di mediapipe hanno problemi con il supporto di Python 3.12), oppure i file del pacchetto sono stati danneggiati durante l'installazione.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilità di versione di Dora, formato dei messaggi (v0.7.0 vs v0.8.0)

![2. Incompatibilità di versione di Dora, formato dei messaggi v0.7.0 vs v0.8.0 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Risposta: ① Per prima cosa, sotto la directory .cargo/registry/src/github.xxxxxxxx/ nella directory utente dell'unità C, elimina solo il pacchetto di dipendenza corrispondente!

**`dora-message-0.7.0`** (fondamentale! Questa è la cartella del vecchio formato dei messaggi e deve essere eliminata)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16` (libreria ausiliaria dipendente da Dora, da eliminare insieme alla vecchia versione)

② Apri la cartella Demo/AHControl e modifica in Cargo.toml dora-node-api="0.5.0" e dora-message="0.8.0"

③ Nella console, vai alla directory AHControl ed esegui di nuovo cargo build --release

④ Rifai quanto descritto nella sezione «[esecuzione su hardware reale](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug)» per ricompilare

Modifica la versione corrispondente in base all'errore effettivamente segnalato. Per esempio, se dora-message richiede la versione 0.6.0, cambialo in dora-node-api="0.4.0" dora-message="0.6.0".

![2. Incompatibilità di versione di Dora, formato dei messaggi v0.7.0 vs v0.8.0 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![2. Incompatibilità di versione di Dora, formato dei messaggi v0.7.0 vs v0.8.0 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3. Libreria openCV mancante

![3. Libreria openCV mancante – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

Nella directory HandTracking inserisci il seguente comando

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Permesso fotocamera abilitato (computer)

![4. Permesso fotocamera abilitato computer – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![4. Permesso fotocamera abilitato computer – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![4. Permesso fotocamera abilitato computer – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5. La macchina virtuale 22.04 usa la fotocamera

Riferimento: https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Installazione della fotocamera desktop

#### Passaggi di installazione della staffa del kit fotocamera ambientale

1. Per prima cosa, fissa la staffa dell'angolo di regolazione fine

![Passaggi di installazione della staffa del kit fotocamera ambientale – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2. Kit fotocamera ambientale vista laterale

![Passaggi di installazione della staffa del kit fotocamera ambientale – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

## La macchina virtuale 22.04 esegue direttamente il tracking della mano

Scarica questi quattro file e mettili nella stessa directory con nome in inglese, poi usa il software della macchina virtuale per aprire direttamente il file .ovf e accedere al sistema

Password ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1. Apri la console nella directory Demo:**

```Plain Text
dora up
```

**E attiva l'ambiente virtuale:**

```Plain Text
source .venv/bin/activate
```

**2. Permesso fotocamera nella macchina virtuale**

Riferimento per far usare la fotocamera alla VM 22.04: https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Controlla la porta della scheda driver servo dalla riga di comando:**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modifica il numero di porta nel file di codice**

① Individua il file di codice main.rs nella directory AmazingHand-main\Demo\AHControl\src, aprilo in modalità testo e modificalo con il numero di porta trovato sul tuo host (COM\* per Windows, di solito /dev/ttyACM\* per i sistemi Ubuntu e Linux)

![La macchina virtuale 22.04 esegue direttamente il tracking della mano – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

② Individua il file dell'esempio corrispondente

**Mano destra** trova dataflow_tracking_real_right.yml nella directory AmazingHand-main\Demo

**Mano sinistra** trova dataflow_tracking_real_left.yml nella directory AmazingHand-main\Demo

**Doppia mano robotica** trova dataflow_tracking_real_2hands.yml nella directory AmazingHand-main\Demo

Aprilo in formato testo e modificalo con il numero di porta trovato sul tuo host (COM\* per Windows, di solito /dev/ttyACM\* per i sistemi Ubuntu e Linux)

![La macchina virtuale 22.04 esegue direttamente il tracking della mano – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![La macchina virtuale 22.04 esegue direttamente il tracking della mano – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![La macchina virtuale 22.04 esegue direttamente il tracking della mano – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5. Avvia il tracking della mano destra**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```

<RelatedProducts slugs="amazinghand,servo-driver-board" />

---

## File del modello

Il modello può essere consultato o scaricato su [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclusi mano destra e file URDF), ad esempio se servono file del modello in altri formati

Right_Hand.step

Il [modello MuJoCo](https://github.com/pollen-robotics/AmazingHand/tree/main/Demo/AHSimulation/AHSimulation) della mano abile

![Immagine 20](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)
