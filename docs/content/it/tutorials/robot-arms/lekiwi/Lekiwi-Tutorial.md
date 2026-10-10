---
title: Tutorial d'uso del robot mobile Lekiwi
description: "Guida completa al robot mobile Lekiwi basato su LeRobot: setup, configurazione motori, teleoperazione, raccolta dati, training e valutazione"
---

# Tutorial d'uso del robot mobile Lekiwi

> **[Acquista nel negozio](https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

Il braccio leader nero utilizza un alimentatore da 5V 6A, mentre il braccio follower bianco utilizza un alimentatore da 12V 5A.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

Il codice in questo repository tutorial è mantenuto alla versione stabile e testata di LeRobot precedente al 1° ottobre 2026. Da allora Hugging Face ha eseguito un aggiornamento molto consistente di LeRobot, aggiungendo moltissime nuove funzionalità. Se si desidera provare il tutorial più recente, seguire la [documentazione ufficiale](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) è un progetto di auto robotica completamente open source avviato da [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Include file dettagliati per la stampa 3D e istruzioni operative, ed è progettato per essere compatibile con il framework di apprendimento per imitazione [LeRobot](https://github.com/huggingface/lerobot/tree/main). Supporta il braccio robotico SO101, consentendo un flusso di lavoro completo di apprendimento per imitazione.

[*Nel CAD online Fusion360*](https://a360.co/4k1P8yO)* è possibile visualizzare la posizione esatta dei componenti.*

[File URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Anteprima URDF online https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## Caratteristiche principali

1. **Open source e a basso costo**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) offre una soluzione di auto robotica open source e a basso costo.
2. **Integrazione con LeRobot**: progettato per l'integrazione con la [piattaforma LeRobot](https://github.com/huggingface/lerobot).
3. **Ricche risorse di apprendimento**: risorse di apprendimento open source complete, tra cui guide di assemblaggio e di calibrazione e tutorial per test, raccolta dati, addestramento e distribuzione, che aiutano gli utenti a iniziare rapidamente e a sviluppare applicazioni robotiche.
4. **Compatibile con Nvidia**: può essere utilizzato con il reComputer Mini J4012 Orin NX 16 GB.
5. **Applicazioni multi-scenario**: adatto a istruzione, ricerca scientifica, produzione automatizzata e robotica, aiutando gli utenti a ottenere un funzionamento robotico efficiente e preciso in una varietà di compiti complessi.

JUXI è responsabile unicamente della qualità dell'hardware stesso. Questo tutorial viene aggiornato rigorosamente in linea con la documentazione ufficiale. Se si incontrano problemi di software o di dipendenze dell'ambiente che non si riescono davvero a risolvere, si prega di segnalarli prontamente alla [piattaforma LeRobot](https://github.com/huggingface/lerobot) o al [canale Discord di LeRobot](https://discord.gg/8TnwDdjFGU).

**Nota**
- Tutti i servo nel telaio del Lekiwi richiedono un'alimentazione a 12V. Per gli utenti con un braccio robotico da 5V, forniamo un modulo convertitore step-down da 12V a 5V. Si noti che sarà necessario modificare il cablaggio autonomamente.
- Alimentatore da 12V – è possibile selezionare questa opzione al momento dell'ordine, se necessario. Se si dispone già di un alimentatore da 12V, è sufficiente convertire il connettore di uscita di alimentazione in una spina DC 5521.
- Controller Raspberry Pi e telecamere – devono essere acquistati separatamente tramite la pagina dell'ordine.

## Distinta base (BOM)


## Ambiente di sistema iniziale

**Per Ubuntu x86:**

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Per Jetson Orin:**

- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**Per Raspberry Pi:**

- Raspberry Pi 5, 4G\~16G

### Configurazione di SSH

Dopo aver configurato il Raspberry Pi, è opportuno abilitare e configurare [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell), così da potersi collegare al Raspberry Pi dal proprio laptop senza collegare allo Pi uno schermo, una tastiera e un mouse. Qui è disponibile un ottimo tutorial. (link) È possibile accedere al Raspberry Pi tramite il prompt dei comandi (cmd) oppure, se si utilizza VSCode, si può usare [questa](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) estensione.

## Guida alla stampa 3D

### Componenti

Forniamo file STL stampabili per i seguenti componenti stampati in 3D. Questi componenti possono essere stampati su stampanti FDM di fascia consumer utilizzando filamento PLA generico. Li abbiamo testati su una stampante Bambu Lab P1S. Per ogni componente, ci limitiamo a caricarlo in Bambu Studio, lasciamo che lo ruoti e lo disponga automaticamente, abilitiamo gli eventuali supporti consigliati e stampiamo.


### Impostazioni di stampa

I file STL forniti possono essere stampati direttamente su molte stampanti FDM. Di seguito sono riportate le impostazioni testate e consigliate; anche altre impostazioni possono funzionare.

- Materiale: PLA+
- Diametro dell'ugello e precisione: diametro ugello 0.2mm, altezza layer 0.2mm
- Densità di riempimento: 15%
- Velocità di stampa: 150 mm/s
- Se necessario, caricare il G-code (file slicato) sulla stampante e avviare la stampa

## A. Installazione di LeRobot sul Raspberry Pi

Sul Raspberry Pi:

### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Riavviare la shell

Copiare e incollare il comando seguente nella shell: `source ~/.bashrc`, oppure per gli utenti Mac: `source ~/.bash_profile` o `source ~/.zshrc` (se si usa zshell).

### 3. Creare e attivare un nuovo ambiente Conda per LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Quindi attivare l'ambiente Conda (è necessario farlo ogni volta che si apre una shell per usare LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonare LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installare ffmpeg nell'ambiente:

Quando si utilizza `miniconda`, installare `ffmpeg` nel proprio ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Di solito viene installato ffmpeg 7.X compilato con l'encoder libsvtav1 per la propria piattaforma. Se libsvtav1 non è supportato (è possibile verificare gli encoder supportati con `ffmpeg -encoders`), si può:
[Per tutte le piattaforme] Installare esplicitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Solo Linux] Installare le dipendenze di compilazione di ffmpeg e compilare ffmpeg dal sorgente con supporto a libsvtav1, assicurandosi che l'eseguibile ffmpeg in uso sia quello corretto, cosa che si può verificare con `which ffmpeg`.
Se si verifica l'errore riportato di seguito, anche i comandi sopra riportati possono risolverlo.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. Installare LeRobot con la dipendenza per i motori feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Impostare il tempo di connessione

Individuare config_lekiwi.py nella directory `lerobot\src\lerobot\robots\lekiwi`.

 connection_time_s: int = 7200 # i.e. 2 hours

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. Installazione di LeRobot su un laptop

Se si è già installato LeRobot sul proprio laptop, è possibile saltare questo passaggio; in caso contrario, seguire gli **stessi passaggi** che abbiamo usato sul Raspberry Pi.

> [!Tip] Utilizzeremo spesso il prompt dei comandi (cmd). Se non si ha familiarità con cmd, o se si desidera rivedere l'uso della riga di comando, si può fare riferimento a questo: [Corso introduttivo sulla riga di comando](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

Sul proprio computer:

### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

Oppure fare clic su questo link per scaricare direttamente il programma di installazione

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## Modifica delle sorgenti dei pacchetti di conda

```Shell
# Per prima cosa cancellare la configurazione delle sorgenti esistente (per evitare conflitti)
conda config --remove-key channels

# Sostituire le sorgenti predefinite di conda e le comuni sorgenti di terze parti con il mirror di Tsinghua
# Aggiungere le sorgenti dei pacchetti predefinite (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Aggiungere le comuni sorgenti di terze parti
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Mostrare la sorgente di download, così l'installazione dei pacchetti visualizza l'URL di download specifico
conda config --set show_channel_urls yes

# Cancellare la cache dell'indice affinché le nuove sorgenti abbiano effetto
conda clean -i

# Mostrare la configurazione corrente (per verificare che le sorgenti siano state aggiunte correttamente)
conda config --show-sources
```

### 2. Riavviare la shell

Copiare e incollare il comando seguente nella shell: `source ~/.bashrc`, oppure per gli utenti Mac: `source ~/.bash_profile` o `source ~/.zshrc` (se si usa zshell).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. Creare e attivare un nuovo ambiente Conda per LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Quindi attivare l'ambiente Conda (è necessario farlo ogni volta che si apre una shell per usare LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonare LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installare ffmpeg nell'ambiente:

Quando si utilizza `miniconda`, installare `ffmpeg` nel proprio ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Di solito viene installato ffmpeg 7.X compilato con l'encoder libsvtav1 per la propria piattaforma. Se libsvtav1 non è supportato (è possibile verificare gli encoder supportati con `ffmpeg -encoders`), si può:
[Per tutte le piattaforme] Installare esplicitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Solo Linux] Installare le dipendenze di compilazione di ffmpeg e compilare ffmpeg dal sorgente con supporto a libsvtav1, assicurandosi che l'eseguibile ffmpeg in uso sia quello corretto, cosa che si può verificare con `which ffmpeg`.
Se si verifica l'errore riportato di seguito, anche i comandi sopra riportati possono risolverlo.

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. Installare LeRobot con la dipendenza per i motori feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. Configurazione dei motori

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1. Individuare la porta USB associata al braccio robotico**

Per individuare la porta corretta per un singolo motore, eseguire due volte il seguente script di utilità:

```Bash
lerobot-find-port
```

Esempio di output (ad esempio, `/dev/tty.usbmodem575E0031751` su Mac, o eventualmente `/dev/ttyACM0` su Linux):

Esempio di output (ad esempio, `/dev/tty.usbmodem575E0032081` su Mac, o eventualmente `/dev/ttyACM1` su Linux):

Risoluzione dei problemi: su Linux, potrebbe essere necessario concedere l'accesso alla porta USB con i seguenti comandi:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurare i motori (saltare questo passaggio per un'unità già assemblata)**

Collegare un motore del telaio alla volta ed eseguire il seguente script. Per prima cosa inizializza i servo del braccio robotico (ID 6..1), poi inizializza i servo del telaio, impostando i loro ID su (ID 9..7). Se il braccio robotico è già stato calibrato, è possibile continuare a premere Invio per sovrascrivere e saltare:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- incollare qui la porta individuata nel passaggio precedente
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3. Configurare il mirror cinese di Hugging Face

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Aggiungere in fondo al file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Output
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Aggiungere in fondo al file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Output
# https://hf-mirror.com
```

#### ① Creare un token

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ② Registrare il token

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ Associare il token

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ Creare un repository di dataset

**Annotare l'Owner e il nome del dataset, ovvero <hf_username> e <dateset_repo_id>, che serviranno in seguito**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. Aggiornare la configurazione!!!

I file di configurazione sul LeKiwi LeRobot e sul laptop devono rimanere coerenti. Innanzitutto, dobbiamo individuare l'**indirizzo IP** del Raspberry Pi che pilota il braccio mobile. È lo stesso indirizzo IP utilizzato per SSH. Dobbiamo inoltre individuare la **porta USB** della scheda driver del servo del braccio leader sul laptop e la **porta della scheda driver del servo sul LeKiwi**. È possibile individuare queste porte con il seguente script.

Su Linux, potrebbe essere necessario concedere l'accesso alla porta USB eseguendo i seguenti comandi:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Importante: ora che si dispone della porta del braccio leader e dell'indirizzo IP del braccio del Lekiwi, aggiornare l'**ip** nella configurazione di rete, la **port** nella configurazione del braccio leader e **port, remote_ip** nella configurazione del LeKiwi.

Modificare questi quattro file nella directory example\lekiwi

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① Modificare teleoperate.py

remote_ip: l'indirizzo IP del Raspberry Pi

port: il numero di porta quando il braccio leader è collegato al computer o a Linux

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② Modificare record.py

HF_REPO_ID: [nome utente e nome del dataset di Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip: l'indirizzo IP del Raspberry Pi

port: il numero di porta quando il braccio leader è collegato al computer o a Linux

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ Modificare replay.py

remote_ip: l'indirizzo IP del Raspberry Pi

<hf_username>/<dataset_repo_id>, ovvero il [nome utente e nome del dataset di Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. Calibrazione

Ora dobbiamo calibrare il braccio leader e il braccio follower. I servo delle ruote omnidirezionali non necessitano di calibrazione.

### Calibrazione del braccio follower (montato sulla base del Lekiwi)

Eseguire il seguente comando sul proprio computer per calibrare il braccio leader. Nota: le immagini mostrate qui sono esempi per il modello SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # change to the port you found
    --teleop.id=my_awesome_leader_arm
```

Ora eseguire il seguente comando sul Raspberry Pi per calibrare il braccio follower sul LeKiwi. Ignorare la sua posizione attuale sul tavolo: una calibrazione corretta va eseguita con il braccio montato sul telaio del Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Abbiamo standardizzato il metodo di calibrazione per la maggior parte dei robot. Innanzitutto, dobbiamo muovere il robot in modo che ogni articolazione si trovi al **centro della propria corsa**, quindi premere il pulsante. In secondo luogo, muoviamo tutte le articolazioni attraverso la loro **intera corsa** una volta. È possibile trovare un video dello stesso processo di calibrazione per l'SO101 [qui](https://huggingface.co/docs/lerobot/en/so101#calibration-video) `Enter`.

## E. Teleoperazione

Aprire un nuovo Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Se si utilizza un Mac, potrebbe essere necessario concedere a «Terminale» l'autorizzazione ad accedere alla tastiera per la teleoperazione. Andare in «Preferenze di Sistema» > «Sicurezza e privacy» > «Monitoraggio input» e selezionare la casella «Terminale».

Per teleoperare, accedere al Raspberry Pi tramite SSH, eseguire il seguente comando per attivare l'ambiente `conda activate lerobot`, quindi eseguire il seguente script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

Successivamente, sul proprio laptop, eseguire anch'esso il seguente comando per attivare l'ambiente `conda activate lerobot`, quindi eseguire il seguente script:

```Bash
python examples/lekiwi/teleoperate.py
```

Lo schermo del proprio laptop dovrebbe mostrare qualcosa di simile: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Ora è possibile muovere il braccio di controllo e usare i tasti (W, A, S, D) della tastiera per guidare il robot avanti, a sinistra, indietro e a destra. Usare i tasti (Z, X) per far girare il robot a sinistra o a destra. Usare i tasti (R, F) per aumentare o diminuire la velocità del robot. Ci sono tre modalità di velocità; vedere la tabella seguente:



Se si utilizza una tastiera diversa, è possibile modificare l'associazione dei tasti per ciascun comando in [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Risoluzione dei problemi di comunicazione

In caso di problemi di connessione con il robot mobile SO101, seguire i passaggi riportati di seguito per diagnosticare e risolvere il problema.

### 1. Verificare la configurazione dell'indirizzo IP

Assicurarsi che nel file di configurazione sia impostato l'indirizzo IP corretto del Raspberry Pi. Per verificare l'indirizzo IP del Raspberry Pi, eseguire il seguente comando (nella riga di comando del Pi):

```Bash
hostname -I
```

### 2. Verificare se il laptop/PC riesce a raggiungere il Pi

Provare a eseguire il ping del Raspberry Pi dal laptop:

```Bash
ping <your_pi_ip_address>
```

Se il ping non riesce:

- Assicurarsi che il Pi sia acceso e collegato alla stessa rete.
- Verificare se SSH è abilitato sul Pi.

### 3. Provare una connessione SSH

Se non è possibile accedere al Pi tramite SSH, la connessione potrebbe non essere corretta. Utilizzare il seguente comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Ad esempio `ssh pi@192.168.0.106`

Se si riceve un errore di connessione:

- Assicurarsi che SSH sia abilitato sul Pi; è possibile eseguire il seguente comando:

```Bash
sudo raspi-config
```

- Quindi navigare fino a: **Interfacing Options -> SSH** e abilitarlo.

### 4. Coerenza dei file di configurazione!!!

Assicurarsi che i file di configurazione sul laptop/PC e sul Raspberry Pi siano esattamente identici.

## F. Registrazione di un dataset

Una volta acquisita familiarità con la teleoperazione, è possibile utilizzare il LeKiwi per registrare il primo dataset.

Per avviare il programma sul LeKiwi, collegarsi al Raspberry Pi tramite SSH ed eseguire i seguenti comandi per attivare l'ambiente e avviare lo script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Se si desidera utilizzare Hugging Face Hub per caricare i dataset e non si è mai effettuato l'accesso in precedenza, assicurarsi di accedere con un token con permessi di scrittura, che è possibile generare in [Hugging Face settings](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Memorizzare il nome del repository Hugging Face in una variabile per eseguire il seguente comando:

```Bash
hf auth whoami
```

Quindi eseguire il seguente comando sul proprio laptop per registrare 2 episodi e caricare il dataset su Hub:

```Bash
python examples/lekiwi/record.py
```

## G. Visualizzazione di un dataset

Se è stato caricato il dataset, è possibile [visualizzarlo online](https://huggingface.co/spaces/lerobot/visualize_dataset); copiare e incollare l'ID del repository prodotto dal seguente comando:

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se non è stato caricato il dataset, è possibile visualizzarlo anche localmente (lo strumento di visualizzazione si apre in una finestra del browser all'indirizzo `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### Visualizzare un dataset (opzionale, vale la pena provare)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se è stato caricato il dataset, è possibile visualizzarlo anche localmente con il seguente comando:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Se non è stato caricato il dataset, è possibile visualizzarlo anche localmente con il seguente comando:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Qui, `juxi` è un nome `repo_id` personalizzato impostato durante la raccolta dati.



#### Suggerimenti per la raccolta dati

Una volta acquisita familiarità con la registrazione dei dati, è possibile creare dataset più grandi per l'addestramento. Un buon compito iniziale consiste nel raccogliere oggetti da posizioni diverse e collocarli in un contenitore. Consigliamo di registrare almeno 50 episodi, 10 per posizione. Mantenere fissa la posizione della telecamera e mantenere costante il movimento di presa per tutta la registrazione. Inoltre, assicurarsi che gli oggetti manipolati siano ben visibili nell'inquadratura della telecamera. Una semplice regola empirica: si dovrebbe essere in grado di completare il compito semplicemente osservando il flusso della telecamera.

Nelle sezioni seguenti addestrerai la tua rete neurale. Una volta ottenute prestazioni di presa affidabili, puoi iniziare a introdurre maggiore variabilità nella raccolta dei dati, ad esempio aggiungendo posizioni di presa, utilizzando tecniche di presa diverse e cambiando le posizioni delle telecamere.

Evita di aggiungere troppa variabilità troppo rapidamente, poiché potrebbe compromettere i risultati.

Se desideri approfondire questo importante argomento, consulta il nostro [post del blog su cosa rende buono un dataset.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Risoluzione dei problemi:

Su Linux, se durante la registrazione dati i tasti freccia sinistra/destra e il tasto Esc non funzionano, assicurarsi che la variabile d'ambiente `$DISPLAY` sia impostata. Vedere i [limiti di pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. Riproduzione di un episodio

Ora prova a riprodurre il primo episodio sul tuo robot:

```Bash
python examples/lekiwi/replay.py
```

Congratulazioni 🎉 — il tuo robot è pronto a imparare i compiti da solo. Segui la sezione di addestramento di questo tutorial per iniziare ad addestrarlo: [Introduzione ai robot del mondo reale](https://huggingface.co/docs/lerobot/il_robots)

## I. Valutazione della tua policy

Assicurati di modificare remote_ip, port, HF_MODEL_ID

### Modificare evaluate.py

HF_MODEL_ID="<hf_username>/<model_repo_id>" modificalo con il nome del dataset caricato su Hugging Face dopo l'addestramento (se è stato caricato su Hugging Face) oppure con la directory locale in cui il modello è stato esportato dopo l'addestramento

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" modificalo con il nome utente creato e il nome del dataset eval_

remote_ip: l'indirizzo IP del Raspberry Pi

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

Quindi esegui il seguente comando:

```Bash
python examples/lekiwi/evaluate.py
```

1. Il nome del dataset inizia con `eval` per riflettere il fatto che si sta eseguendo l'inferenza (ad es. `${HF_USER}/eval_act_lekiwi_test`).
2. Se durante la valutazione si incontra `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, eliminare prima la cartella il cui nome inizia con `eval_` ed eseguire di nuovo il programma.



Per l'addestramento in simulazione, vedere

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Assistenza 🙋‍

Per problemi hardware, contattare il servizio clienti. Per domande sull'utilizzo, unirsi a Discord.

[Piattaforma LeRobot](https://github.com/huggingface/lerobot)

[Canale Discord di LeRobot](https://discord.gg/8TnwDdjFGU)

##   
  
Installazione di Miniconda su Mac

## Concessione delle autorizzazioni

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Installare Miniconda

https://www.anaconda.com/download

## Modifica della sorgente dei pacchetti di pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Modifica della sorgente dei pacchetti di conda

```Shell
# Cancellare la configurazione .condarc esistente (opzionale, per evitare conflitti)
echo "" > ~/.condarc

# Scrivere la configurazione del mirror di Tsinghua
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# Cancellare la cache per applicare la configurazione
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

