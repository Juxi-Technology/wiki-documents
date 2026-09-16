---
title: Tutorial d'uso del robot mobile Lekiwi
description: "Guida completa al robot mobile Lekiwi basato su LeRobot: setup, configurazione motori, teleoperazione, raccolta dati, training e valutazione"
---

# Tutorial d'uso del robot mobile Lekiwi

> **[Acquista nel negozio](https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


Il braccio leader nero usa un alimentatore 5V 6A, mentre il braccio follower bianco usa un alimentatore 12V 5A

lerobot-Lekiwi.zip

Il codice nel repository di questo tutorial è mantenuto alla versione stabile di LeRobot testata prima del 1 marzo 2026. Attualmente HuggingFace ha aggiornato LeRobot in modo molto sostanziale, aggiungendo un gran numero di nuove funzionalità. Se vuoi provare il tutorial più recente, segui [la documentazione ufficiale per il funzionamento](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) è un progetto di robot car completamente open source avviato da [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Include file dettagliati per la stampa 3D e guide operative, ed è progettato per essere compatibile con il framework di apprendimento per imitazione [LeRobot](https://github.com/huggingface/lerobot/tree/main). Supporta il braccio robotico SO101, consentendo così un processo completo di apprendimento per imitazione.

[*Le posizioni precise dei componenti possono essere visualizzate nel CAD online di Fusion360*](https://a360.co/4k1P8yO)*.*

[File URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Anteprima URDF online: https://urdf.d-robotics.cc/

![image – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

### Caratteristiche principali

1. **Open source e a basso costo**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) offre una soluzione di robot car open source e a basso costo.

2. **Integrazione con LeRobot**: progettato specificamente per l'integrazione con la [piattaforma LeRobot](https://github.com/huggingface/lerobot).

3. **Risorse di apprendimento abbondanti**: fornisce risorse di apprendimento open source complete, incluse guide di assemblaggio e calibrazione, oltre a tutorial su test, raccolta dati, training e deployment, per aiutare gli utenti a iniziare rapidamente e sviluppare applicazioni robotiche.

4. **Compatibile con Nvidia**: può essere usato in combinazione con reComputer Mini J4012 Orin NX 16 GB.

5. **Applicazioni multi-scenario**: adatto a istruzione, ricerca scientifica, produzione automatizzata e robotica, aiutando gli utenti a ottenere operazioni robotiche efficienti e precise in vari compiti complessi.

JUXI è responsabile solo della qualità dell'hardware stesso. I tutorial vengono aggiornati rigorosamente in base alla documentazione ufficiale. Se incontri problemi software o di dipendenze dell'ambiente che non riesci davvero a risolvere, segnalali prontamente alla [piattaforma LeRobot](https://github.com/huggingface/lerobot) o al [canale Discord LeRobot](https://discord.gg/8TnwDdjFGU).

**Attenzione**

- Tutti i servo nel telaio Lekiwi richiedono un'alimentazione a 12 V. Per gli utenti che usano un braccio robotico a 5 V forniamo un modulo di conversione step-down 12 V→5 V. Nota che dovrai modificare il circuito a tua cura.

- Alimentazione 12 V – se ti serve, puoi selezionare questa opzione al checkout. Se hai già un'alimentazione a 12 V, basta convertire l'interfaccia di uscita in una spina DC 5521.

- Controller Raspberry Pi e fotocamera – vanno acquistati separatamente tramite l'interfaccia di ordine.

### Distinta materiali (BOM)

### Ambiente di sistema iniziale

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

- Raspberry Pi 5 4G~16G

#### Configurare SSH

Dopo la configurazione del Raspberry Pi, dovresti abilitare e configurare [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol), così da poter accedere al Raspberry Pi dal tuo laptop senza collegare schermo, tastiera e mouse. Puoi [trovare un ottimo tutorial qui](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Puoi accedere al Raspberry Pi tramite il prompt dei comandi (cmd) oppure, se usi VSCode, puoi usare [questa](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) estensione.

### Guida alla stampa 3D

#### Parti

Forniamo file STL stampabili per le seguenti parti stampate in 3D. Queste parti possono essere stampate su stampanti FDM consumer usando filamenti PLA generici. Le abbiamo testate su una stampante Bambu Lab P1S. Per tutti i componenti le abbiamo semplicemente caricate in bambuslicer, lasciate ruotare e disporre automaticamente, attivato i supporti consigliati e poi stampate.

#### Parametri di stampa

I file STL forniti possono essere stampati direttamente su molte stampanti FDM. Le seguenti sono le impostazioni testate e consigliate; altre impostazioni potrebbero funzionare ugualmente.

- Materiale: PLA+

- Diametro e precisione dell'ugello: ugello da 0,2 mm, altezza dello strato 0,2 mm

- Densità di riempimento: 15%

- Velocità di stampa: 150 mm/s

- Se necessario, carica il G-code (file slicato) sulla stampante e stampa

## Installare LeRobot

Sul tuo Raspberry Pi:

#### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

#### 2. Riavviare la Shell

Copia e incolla il seguente comando nella tua Shell: `source ~/.bashrc` oppure per gli utenti Mac: `source ~/.bash_profile` o `source ~/.zshrc` (se usi zshell)

#### 3. Creare e attivare un nuovo ambiente Conda per LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Poi attiva il tuo ambiente Conda (devi farlo ogni volta che apri la Shell per usare LeRobot!):

```Bash
conda activate lerobot
```

#### 4. Clonare LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

#### 5. Installare ffmpeg nel tuo ambiente:

Quando usi `miniconda`, installa `ffmpeg` nel tuo ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Questo di solito installa ffmpeg 7.X compilato con l'encoder libsvtav1 per la tua piattaforma. Se libsvtav1 non è supportato (puoi controllare gli encoder supportati con `ffmpeg -encoders`), puoi:

【Per tutte le piattaforme】installare esplicitamente ffmpeg 7.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

【Solo Linux】installare le dipendenze di build di ffmpeg e compilare ffmpeg dai sorgenti con il supporto di libsvtav1, assicurandoti che l'eseguibile ffmpeg usato sia quello corretto, verificabile con `which ffmpeg`.

Se incontri il seguente errore, puoi usare il comando sopra per risolverlo.

![5. Installare ffmpeg nel tuo ambiente: – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### 6. Installare LeRobot con le dipendenze dei motori feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

#### 7. Impostare il tempo di connessione

Trovare config_lekiwi.py nella cartella `lerobot\src\lerobot\robots\lekiwi`

connection_time_s: int = 7200 # 也就是2小时

![7. Impostare il tempo di connessione – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



### C. Installare LeRobot sul laptop

Se LeRobot è già installato sul tuo laptop, puoi saltare questo passaggio; altrimenti segui gli **stessi passaggi** che abbiamo fatto sul Raspberry Pi.

> [!Tip] Useremo spesso il prompt dei comandi (cmd). Se non hai familiarità con l'uso di cmd o vuoi ripassare l'uso della riga di comando, puoi fare riferimento a questo: [Corso accelerato di riga di comando](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 
> 

Sul tuo computer:

#### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

#### 2. Riavviare la Shell

Copia e incolla il seguente comando nella tua shell: `source ~/.bashrc` oppure per gli utenti Mac: `source ~/.bash_profile` o `source ~/.zshrc` (se usi zshell)

![2. Riavviare la Shell – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### 3. Creare e attivare un nuovo ambiente Conda per LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Poi attiva il tuo ambiente Conda (devi farlo ogni volta che apri la Shell per usare LeRobot!):

```Bash
conda activate lerobot
```

#### 4. Clonare LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

#### 5. Installare ffmpeg nel tuo ambiente:

Quando usi `miniconda`, installa `ffmpeg` nel tuo ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Questo di solito installa ffmpeg 7.X compilato con l'encoder libsvtav1 per la tua piattaforma. Se libsvtav1 non è supportato (puoi controllare gli encoder supportati con `ffmpeg -encoders`), puoi:

【Per tutte le piattaforme】installare esplicitamente ffmpeg 7.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

【Solo Linux】installare le dipendenze di build di ffmpeg e compilare ffmpeg dai sorgenti con il supporto di libsvtav1, assicurandoti che l'eseguibile ffmpeg usato sia quello corretto, verificabile con `which ffmpeg`.

Se incontri il seguente errore, puoi usare il comando sopra per risolverlo.

![5. Installare ffmpeg nel tuo ambiente: – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### 6. Installare LeRobot con le dipendenze dei motori feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## Configurare i motori

![6. Installare LeRobot con le dipendenze dei motori feetech: – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![6. Installare LeRobot con le dipendenze dei motori feetech: – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

#### **1. Trovare la porta USB associata al braccio robotico**

Per trovare la porta corretta di un singolo motore, esegui due volte il seguente script di utilità:

```Bash
lerobot-find-port
```

Esempio di output (ad es. `/dev/tty.usbmodem575E0031751` su Mac, o `/dev/ttyACM0` su Linux):

Esempio di output (ad es. `/dev/tty.usbmodem575E0032081` su Mac, o `/dev/ttyACM1` su Linux):

Troubleshooting: su Linux, potresti dover concedere l'accesso alla porta USB con il seguente comando:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

#### **2. Configurare il tuo motore (i prodotti finiti possono saltare questo passaggio)**

Inserisci ogni motore del tuo telaio in sequenza ed esegui il seguente script. Prima inizializzerà i servo del braccio robotico (ID 6..1), poi inizializzerà i servo del telaio impostando i loro ID su (ID 9..7). Se hai già calibrato il braccio robotico, puoi premere Invio di continuo per sovrascrivere e saltare:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![2. Configurare il tuo motore i prodotti finiti possono saltare questo passaggio – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

#### 3. Configurare il mirror nazionale di HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 输出
# https://hf-mirror.com
```

##### ①Creare il token

https://huggingface.co/settings/tokens

![①Creare il token – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![①Creare il token – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![①Creare il token – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

##### ②Annotare il token

Per esempio, il mio è:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

##### ③Collegare il token

```Shell
hf auth login

hf auth whoami
```

![③Collegare il token – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

##### ④Creare il repository del dataset

**Annota il proprietario (Owner) e il nome del dataset, che sono gli \<hf_username\> e \<dateset_repo_id\> necessari più avanti**

![④Creare il repository del dataset – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![④Creare il repository del dataset – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![④Creare il repository del dataset – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

#### 4. Aggiornare la configurazione!!!

I file di configurazione su LeKiwi LeRobot e sul laptop devono essere coerenti. Prima di tutto, dobbiamo trovare l'**indirizzo IP** del Raspberry Pi per il robot mobile. È lo stesso indirizzo IP usato per SSH. Dobbiamo anche trovare la **porta USB** della scheda driver servo del braccio leader sul laptop e la **porta della scheda driver servo su LeKiwi**. Queste porte si trovano tramite il seguente script.

Su Linux, potresti dover concedere l'accesso alla porta USB eseguendo il seguente comando:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Nota importante: ora che hai ottenuto il numero di porta del braccio leader e l'indirizzo IP del robot Lekiwi, aggiorna **ip** nella configurazione di rete, aggiorna **port** nella configurazione del braccio leader e aggiorna **port, remote_ip** nella configurazione di LeKiwi.

Modifica questi quattro file nella directory example\lekiwi

![4. Aggiornare la configurazione!!! – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

##### ①Modificare teleoperate.py

remote_ip: indirizzo IP del Raspberry Pi

port: numero di porta quando il braccio leader è collegato a un computer o a Linux

![①Modificare teleoperate.py – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

##### ②Modificare record.py

HF_REPO_ID: [nome utente e nome del dataset su Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip: indirizzo IP del Raspberry Pi

port: numero di porta quando il braccio leader è collegato a un computer o a Linux

![②Modificare record.py – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

##### ③Modificare replay.py

remote_ip: indirizzo IP del Raspberry Pi

\<hf_username\>/\<dataset_repo_id\>, cioè [il nome utente Hugging Face e il nome del dataset](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![③Modificare replay.py – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### Calibrazione

Ora dobbiamo calibrare il braccio leader e il braccio follower. Il servo della ruota omnidirezionale non necessita di calibrazione.

#### Calibrare il braccio follower (montato sulla base Lekiwi)

Esegui il seguente comando sul tuo computer per calibrare il braccio leader. Nota: l'immagine mostrata qui è un esempio per il modello SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

Ora esegui il seguente comando sul tuo Raspberry Pi per calibrare il braccio slave su LeKiwi. Ignora la sua posizione attuale sul tavolo: la calibrazione normale va eseguita quando è installato sul telaio Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Abbiamo unificato i metodi di calibrazione per la maggior parte dei robot. Per prima cosa, porta il robot in una posizione in cui ogni giunto si trovi al suo **punto medio dell'intervallo di movimento**, poi premi il pulsante. In secondo luogo, muovi tutti i giunti attraverso l'intero **intervallo di movimento**. Puoi [trovare qui](https://huggingface.co/docs/lerobot/en/so101#calibration-video) un video dello stesso processo di calibrazione per SO101 come riferimento.

## F. Teleoperazione

Apri un nuovo Anaconda Prompt

![Calibrare il braccio follower montato sulla base Lekiwi – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Se usi un Mac, potresti dover concedere al "Terminale" il permesso di accesso alla tastiera per le operazioni remote. Vai su "Preferenze di Sistema" \> "Sicurezza e Privacy" \> "Monitoraggio Input", e poi spunta la casella "Terminale".
> 
> 

Per eseguire le operazioni remote, accedi al tuo Raspberry Pi via SSH ed esegui il seguente comando per attivare l'ambiente `conda activate lerobot`, poi esegui il seguente script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Calibrare il braccio follower montato sulla base Lekiwi – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

Poi, sul tuo laptop, esegui anche il seguente comando per attivare l'ambiente `conda activate lerobot`, e quindi esegui il seguente script:

```Bash
python examples/lekiwi/teleoperate.py
```

Lo schermo del tuo laptop dovrebbe mostrare un'interfaccia simile a questa: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Ora puoi muovere il braccio di controllo e usare i tasti (W, A, S, D) della tastiera per far avanzare il robot, girare a sinistra, indietreggiare e girare a destra. Usa i tasti (Z, X) per far girare il robot a sinistra o a destra. Usa i tasti (R, F) per aumentare o diminuire la velocità del robot mobile. In totale ci sono tre modalità di velocità; fai riferimento alla tabella seguente:

Se usi una tastiera diversa, puoi modificare le impostazioni dei tasti per ogni comando in [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

### Troubleshooting dei problemi di comunicazione

Se riscontri problemi nel collegamento al robot mobile SO101, segui i passaggi seguenti per diagnosticare e risolvere il problema.

#### 1. Verificare la configurazione dell'indirizzo IP

Assicurati che nel file di configurazione sia impostato l'indirizzo IP corretto del Raspberry Pi. Per verificare l'indirizzo IP del Raspberry Pi, esegui il seguente comando (nella riga di comando del Pi):

```Bash
hostname -I
```

#### 2. Verificare se il laptop/PC può raggiungere il Pi

Prova a fare ping del Raspberry Pi dal laptop:

```Bash
ping <your_pi_ip_address>
```

Se il ping fallisce:

- Assicurati che il Pi sia acceso e connesso alla stessa rete.

- Controlla se SSH è abilitato sul Pi.

#### 3. Provare la connessione SSH

Se non riesci ad accedere al Pi via SSH, potrebbe essere dovuto a una connessione errata. Usa il seguente comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Per esempio ` ssh pi@192.168.0.106 `

Se si verifica un errore di connessione:

- Per assicurarti che SSH sia abilitato sul Pi, puoi eseguire il seguente comando:

```Bash
sudo raspi-config
```

- Poi vai su: **Interfacing Options -\> SSH** e abilitalo.

#### 4. Coerenza dei file di configurazione!!!

Assicurati che i file di configurazione sul laptop/PC e sul Raspberry Pi siano esattamente identici.

## G. Registrare un dataset

Dopo aver preso familiarità con la teleoperazione, puoi usare LeKiwi per registrare il tuo primo dataset.

Per avviare il programma su LeKiwi, connettiti al tuo Raspberry Pi via SSH ed esegui i seguenti comandi per attivare l'ambiente e avviare lo script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Se vuoi usare la funzione hub di Hugging Face per caricare un dataset e non hai ancora effettuato l'accesso, assicurati di accedere con un token che abbia i permessi di scrittura, generabile dalle [impostazioni di Hugging Face](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Salva il nome del tuo repository Hugging Face in una variabile per eseguire il seguente comando:

```Bash
hf auth whoami
```

Poi esegui il seguente comando sul tuo laptop per registrare 2 episodi e caricare il dataset sull'hub:

```Bash
python examples/lekiwi/record.py
```

## H. Visualizzare il dataset

Se hai caricato un dataset, puoi [visualizzare il tuo dataset online](https://huggingface.co/spaces/lerobot/visualize_dataset) e copiare e incollare l'ID del repository generato dal seguente comando:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Se non hai caricato un dataset, puoi anche eseguire la visualizzazione in locale (la finestra del browser apre lo strumento di visualizzazione su `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

#### Visualizzare un dataset (opzionale, si può provare)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se hai caricato un dataset, puoi anche visualizzarlo in locale con il seguente comando:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Se non hai caricato un dataset, puoi anche visualizzarlo in locale con il seguente comando:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Qui, ` juxi ` è il nome personalizzato di ` repo_id ` durante la raccolta dati.



##### Consigli di raccolta

Quando hai familiarità con la registrazione dati, puoi creare dataset più grandi per il training. Un buon compito iniziale è afferrare oggetti da posizioni diverse e metterli in contenitori. Consigliamo di registrare almeno 50 episodi, con 10 episodi per ogni posizione. Mantieni fissa la posizione della fotocamera e azioni di presa coerenti durante tutta la registrazione. Inoltre, assicurati che gli oggetti che manipoli siano chiaramente visibili nel frame della fotocamera. Un criterio semplice è che dovresti riuscire a completare questo compito guardando solo il feed della fotocamera.

Nei capitoli seguenti allenerai la tua rete neurale. Dopo aver ottenuto prestazioni di presa affidabili, puoi iniziare a introdurre più variazioni durante il processo di acquisizione dati, come aumentare le posizioni di presa, adottare tecniche di presa diverse e cambiare la posizione della fotocamera.

Evita di aggiungere troppe modifiche troppo in fretta, perché potrebbero influire sui tuoi risultati.

Se vuoi approfondire questo importante argomento, dai un'occhiata al nostro post sul blog [su cosa rende un ottimo dataset](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

##### Troubleshooting:

Nei sistemi Linux, se durante l'acquisizione dati i tasti freccia sinistra/destra e il tasto Esc non funzionano, assicurati che la variabile d'ambiente `$DISPLAY` sia impostata. Vedi [i limiti di pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## I. Riprodurre un episodio

Ora prova a riprodurre il primo episodio sul tuo robot:

```Bash
python examples/lekiwi/replay.py
```

Congratulazioni 🎉, il tuo robot è pronto per i compiti di apprendimento autonomo. Segui la sezione di training di questo tutorial per iniziare ad allenarlo: [Introduzione ai robot del mondo reale](https://huggingface.co/docs/lerobot/il_robots)

### K. Valutare la tua strategia

Assicurati di modificare remote_ip, port e HF_MODEL_ID

##### Modificare evaluate.py

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" va modificato con il nome del dataset caricato su Hugging Face dopo il training (se caricato su Hugging Face) o con la directory in cui il modello è stato esportato localmente dopo il training

HF_DATASET_ID = "\< hf_username \>/\< eval_dataset_id \>" Cambia il nome utente e il nome del dataset eval_ che hai creato

remote_ip: indirizzo IP del Raspberry Pi

![Modificare evaluate.py – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

Poi esegui il seguente comando:

```Bash
python examples/lekiwi/evaluate.py
```

1. Il nome del dataset inizia con `eval` per indicare che stai eseguendo l'inferenza (ad es. `${HF_USER}/eval_act_lekiwi_test`).

2. Se durante la fase di valutazione compare ` File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx' `, elimina prima la ` cartella che inizia con eval_ ` e poi esegui di nuovo il programma.



Per il training in simulazione puoi fare riferimento a

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



### Aiuto 🙋

Per problemi hardware, contatta l'assistenza clienti. Per problemi di utilizzo, unisciti a Discord.

[LeRobot Platform](https://github.com/huggingface/lerobot)

[LeRobot Discord Channel](https://discord.gg/8TnwDdjFGU)

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />
