---
title: Tutorial di esecuzione dell'esempio ufficiale della mano robotica
description: "Scaricare l'archivio di codice allegato a questo tutorial per la demo, oppure clonare il repository open source ufficiale https://github.com/pollen-robotics/AmazingHand.git ; il codice ufficiale può contenere errori."
---

# Tutorial di esecuzione dell'esempio ufficiale della mano robotica

> **[Acquista nel negozio](https://www.juxitech.com/it/products/amazinghand)**


## 1. Download del codice

Scaricare l'archivio di codice allegato a questo tutorial per la demo, oppure clonare il repository open source ufficiale https://github.com/pollen-robotics/AmazingHand.git ; il codice ufficiale può contenere errori.

Archivio codice Windows
[AmazingHand-main.zip]

Archivio codice Linux
[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Installazione dell'ambiente

Installare Rust, uv e dora-rs in base al sistema

**1. Installare Rust:** https://www.rust-lang.org/tools/install
Windows: impostare le variabili d'ambiente Rust (importante!) vedi https://zhuanlan.zhihu.com/p/1933164131969659101
Linux: impostare le variabili d'ambiente:



![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)



La prima installazione può richiedere l'installer di Visual Studio

**Configurare il mirror Cargo**

Nella cartella `.cargo`, creare `config.toml` e configurare il mirror Tsinghua `crates.io-index`. Cargo scaricherà i crate tramite il mirror Tsinghua.

```Bash
[source.crates-io]
replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. Installare uv:** https://docs.astral.sh/uv/getting-started/installation/
Su Windows, aprire PowerShell, incollare ed eseguire il comando
**Linux: impostare le variabili d'ambiente:**



**3. Installare dora-rs:** vedi https://dora-rs.ai/docs/guides/Installation/installing
Linux: impostare le variabili d'ambiente:



## 3. Cablaggio

Alimentazione di almeno 5V/3A. Collegare la scheda driver servo esterna e connetterla al PC via USB



## 4. Demo d'esempio

### **1. Trovare il numero di porta della scheda driver**

- Windows di solito COM11 – porta dal Gestione dispositivi o dal software host Feetech



- Ubuntu/Linux di solito /dev/ttyACM0
Verificare la porta da riga di comando:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)


Se nella VM `ls /dev/ttyUSB* /dev/ttyACM*` non trova nulla, controllare in basso a destra della VM se la mano è collegata al PC. Se sì, scollegarla e collegarla alla VM

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)



### **2. Modificare il numero di porta nel codice**

①Aprire `main.rs` in AmazingHand-main\Demo\AHControl\src con un editor di testo e sostituirlo con la porta trovata (Windows COM*, Ubuntu/Linux di solito /dev/ttyACM*)



②Trovare il file di istanza corrispondente
**Mano destra** …\Demo\dataflow_tracking_real_right.yml
**Mano sinistra** …\Demo\dataflow_tracking_real_left.yml
**Due mani** …\Demo\dataflow_tracking_real_2hands.yml
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)


Aprire in editor di testo e sostituire con la porta trovata (Windows COM*, Ubuntu/Linux di solito /dev/ttyACM*)







### **3. Deploy del codice**

- Aprire la cartella Demo



- Windows: digitare `Powershell` nella directory e premere Invio



- Avviare il processo demone (ogni volta):
Linux: aprire direttamente nella console, avviare il demone (ogni volta):
```Plain Text
dora up
```

- Poi nella console, eseguire da questa directory (basta una volta durante la configurazione!! Rieseguire sovrascrive l'ambiente virtuale!!) Creare l'ambiente virtuale:
```Plain Text
uv venv --python 3.12
```

- Attivare l'ambiente virtuale (ogni volta) in base al sistema:
```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```



Assicurarsi che l'ambiente virtuale sia attivato nella console!

- Sincronizzare le dipendenze, entrare in AHControl
```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Poi `cd ..` e Invio per tornare a Demo! Entrare in AHSimulation
```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Poi `cd ..` e Invio per tornare a Demo! Entrare in HandTracking
```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Risultato

- Aprire la cartella Demo! Digitare `Powershell` e Invio, avviare il demone (ogni volta):
```Plain Text
dora up
```

- Attivare l'ambiente virtuale (ogni volta) in base al sistema:
Windows:
```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux:
```Plain Text
source .venv/bin/activate
```

### Ambiente di simulazione

- Eseguire la demo di tracking della mano via webcam solo in simulazione:
```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(solo una volta)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```





### Esecuzione su hardware reale (tracking della mano)

- Eseguire la demo con hardware reale:
    #### Mano destra
    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(solo una volta)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Mano sinistra
    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(solo una volta)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Due mani (entrambe su una sola scheda driver!)


![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)


    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(solo una volta)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)





### Esempio semplice: controllare gli angoli delle dita in simulazione

- Eseguire un semplice esempio per controllare gli angoli delle dita in simulazione:
    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(solo una volta)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```





Descrizione
- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) contiene un nodo dora-rs per pilotare i motori e utility per configurarli.
- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) contiene un nodo dora-rs che simula il movimento della mano e calcola la cinematica inversa.
- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) contiene un nodo dora-rs che traccia la mano via webcam e la usa come target di controllo AH!.

## Note

### 1. Problema di versione mediapipe

`pyproject.toml` configura mediapipe>=0.10.14; se il pacchetto installato non ha il sottomodulo `solutions`, probabilmente è un'incompatibilità di mediapipe con Python 3.12 (le versioni recenti hanno problemi con Python 3.12) o file corrotti.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilità di versione Dora, formato messaggi (v0.7.0 vs v0.8.0)



Soluzione: ①Nella directory utente, sotto .cargo/registry/src/github.xxxxxxxx/, eliminare solo i pacchetti interessati!
**`dora-message-0.7.0`** (cruciale! vecchia cartella formato messaggi, da eliminare)
`dora-core-0.4.1`
`dora-node-api-0.4.1`
`dora-arrow-convert-0.4.1`
`dora-metrics-0.4.1`
`dora-tracing-0.4.1`
`const-random-macro-0.1.16` (libreria ausiliaria di Dora, da eliminare con la vecchia versione)

②Aprire Demo/AHControl, modificare in Cargo.toml: dora-node-api="0.5.0" dora-message="0.8.0"
③Nella console, entrare in AHControl e rieseguire `cargo build --release`
④Ricompilare secondo [«Esecuzione su hardware reale»](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg?node-id=1759567650651511609&from=from_node_link)
Adattare le versioni in base all'errore – es. se serve dora-message 0.6.0: dora-node-api="0.4.0" dora-message="0.6.0"
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)






### 3. Libreria openCV mancante



In HandTracking:
```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Attivare il permesso fotocamera (PC)







### 5. Usare la fotocamera nella VM 22.04

Vedi https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Installare la fotocamera desktop

#### Installazione del supporto del kit camera ambientale

1. Fissare prima la staffa dell'angolo di regolazione fine



2. Kit camera ambientale laterale



## Eseguire il tracking della mano direttamente in una VM 22.04

Scaricare questi quattro file, metterli nella stessa directory in inglese e aprire il file .ovf direttamente con il software di VM
Password ubuntu
[ubuntu22.04_amazinghand.ovf]
[ubuntu22.04_amazinghand-disk1.vmdk]
[ubuntu22.04_amazinghand.mf]
[ubuntu22.04_amazinghand-file1.iso]

**1. Aprire la console nella directory Demo:**
```Plain Text
dora up
```

**Attivare l'ambiente virtuale:**
```Plain Text
source .venv/bin/activate
```

**2. Permesso fotocamera della VM**
Per la fotocamera in VM 22.04: https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Verificare la porta della scheda driver:**
```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)


```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modificare la porta nel codice**
①Aprire `main.rs` in AmazingHand-main\Demo\AHControl\src, sostituire con la porta trovata (Windows COM*, Ubuntu/Linux di solito /dev/ttyACM*)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)



②Trovare il file di istanza
**Mano destra** …\Demo\dataflow_tracking_real_right.yml
**Mano sinistra** …\Demo\dataflow_tracking_real_left.yml
**Due mani** …\Demo\dataflow_tracking_real_2hands.yml

Aprire in editor di testo, sostituire con la porta trovata (Windows COM*, Ubuntu/Linux di solito /dev/ttyACM*)







**5. Avviare il tracking della mano destra**
```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
