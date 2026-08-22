---
title: Tutorial d'uso del robot mobile Lekiwi
description: "Guida completa al robot mobile Lekiwi basato su LeRobot: setup, configurazione motori, teleoperazione, raccolta dati, training e valutazione"
---

# Tutorial d'uso del robot mobile Lekiwi

> [!Nota] Questo tutorial segue la documentazione ufficiale LeRobot. Per problemi software o di dipendenze irrisolvibili, segnala alla [piattaforma LeRobot](https://github.com/huggingface/lerobot) o al [canale Discord LeRobot](https://discord.gg/8TnwDdjFGU).

## Caratteristiche principali

1. **Open source ed economico**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) offre una soluzione di robot mobile open source a basso costo.
2. **Integrazione LeRobot**: progettato per l'integrazione con la [piattaforma LeRobot](https://github.com/huggingface/lerobot).
3. **Risorse di apprendimento complete**: guide di assemblaggio e calibrazione, tutorial su test, raccolta dati, training e deploy per iniziare rapidamente.
4. **Compatibile Nvidia**: utilizzabile con reComputer Mini J4012 Orin NX 16 GB.
5. **Molteplici scenari**: istruzione, ricerca, produzione automatizzata e robotica – operazioni robotiche efficienti e precise.

JUXI è responsabile solo della qualità dell'hardware. I tutorial seguono rigorosamente la documentazione ufficiale.

**Nota**
- Tutti i servo nel telaio Lekiwi richiedono alimentazione 12 V. Per bracci a 5 V forniamo un modulo step-down 12 V→5 V; le modifiche al circuito sono a vostro carico.
- Alimentazione 12 V – opzione disponibile al checkout. Con una fonte 12 V già in possesso, basta convertire l'uscita in una presa DC 5521.
- Controller Raspberry Pi e fotocamera – da acquistare separatamente tramite l'interfaccia di ordine.

## Distinta materiali (BOM)



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
- Raspberry Pi 5, 4G~16G

### Configurare SSH

Dopo la configurazione del Raspberry Pi, abilitare e configurare [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol) per accedere dal laptop senza schermo, tastiera e mouse. C'è un buon [tutorial](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh) qui. Puoi accedere dal prompt dei comandi (cmd) o, con VSCode, tramite [questa](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) estensione.

## Guida alla stampa 3D

### Parti

Forniamo file STL stampabili per le seguenti parti. Si stampano su una stampante FDM consumer con filamento PLA standard. Testate su una Bambu Lab P1S: basta caricarle in bambuslicer, lasciare ruotare/disporre automaticamente e attivare i supporti consigliati.

### Parametri di stampa

Gli STL si stampano direttamente su molte FDM. Impostazioni testate e consigliate (altre possono funzionare):

- Materiale: PLA+
- Diametro ugello e precisione: ugello 0,2 mm, altezza strato 0,2 mm
- Densità di riempimento: 15 %
- Velocità di stampa: 150 mm/s
- Se necessario, caricare il G-code (file slicato) e stampare

# Installare LeRobot

Sul tuo Raspberry Pi:

### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Riavviare la Shell

Incollare nella Shell: `source ~/.bashrc` o per Mac: `source ~/.bash_profile` o `source ~/.zshrc` (se usi zshell)

### 3. Creare e attivare un nuovo ambiente Conda per LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Poi attivare l'ambiente Conda (ogni volta che apri una Shell per usare LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonare LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installare ffmpeg nel tuo ambiente:

Con `miniconda`, installare `ffmpeg` nell'ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Questo installa di solito ffmpeg 7.X compilato con l'encoder libsvtav1. Se libsvtav1 non è supportato (verificabile con `ffmpeg -encoders`):

【Tutte le piattaforme】installare esplicitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Solo Linux】installare le dipendenze di build di ffmpeg e compilarlo dai sorgenti con libsvtav1; verificare con `which ffmpeg` che si usi l'eseguibile corretto.

Se incontri l'errore seguente, i comandi sopra lo risolvono.



### 6. Installare LeRobot con le dipendenze motori feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. Impostare il tempo di connessione

In `lerobot\src\lerobot\robots\lekiwi`, trovare config_lekiwi.py
connection_time_s: int = 7200 # cioè 2 ore



## C. Installare LeRobot sul laptop

Se LeRobot è già installato sul laptop, salta questo passo; altrimenti segui gli **stessi passi** del Raspberry Pi.

> [!Suggerimento] Useremo spesso il prompt dei comandi (cmd). Se non lo conosci: [corso rapido di riga di comando](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line).

Sul tuo computer:

### 1. [Installare Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. Riavviare la Shell

Incollare: `source ~/.bashrc` o per Mac: `source ~/.bash_profile` o `source ~/.zshrc` (se usi zshell)



### 3. Creare e attivare un ambiente Conda per LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Poi attivare l'ambiente (ogni volta che usi LeRobot):

```Bash
conda activate lerobot
```

### 4. Clonare LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Installare ffmpeg:

Con `miniconda`, installare `ffmpeg`:

```PowerShell
conda install ffmpeg -c conda-forge
```

Questo installa di solito ffmpeg 7.X con libsvtav1. Se non supportato (`ffmpeg -encoders`):

【Tutte le piattaforme】installare esplicitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Solo Linux】installare le dipendenze di build e compilare ffmpeg con libsvtav1; verificare con `which ffmpeg`.

Se incontri l'errore seguente, i comandi sopra lo risolvono.



### 6. Installare LeRobot con le dipendenze feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# Configurare i motori





### **1. Trovare la porta USB associata al braccio robotico**

Per la porta corretta di un motore, esegui due volte questo script di utilità:

```Bash
lerobot-find-port
```

Esempio di output (ad es. `/dev/tty.usbmodem575E0031751` su Mac, o `/dev/ttyACM0` su Linux):

Esempio di output (ad es. `/dev/tty.usbmodem575E0032081` su Mac, o `/dev/ttyACM1` su Linux):

Troubleshooting: su Linux, potrebbe servire concedere l'accesso alla porta USB:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurare i motori (saltabile sul prodotto finito)**

Inserisci ogni motore del telaio uno alla volta ed esegui questo script: prima inizializza i servo del braccio (ID 6..1), poi i servo del telaio impostandone gli ID (ID 9..7). Se il braccio è già calibrato, puoi premere Invio di continuo per sovrascrivere e saltare:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```



### 3. Configurare il mirror HuggingFace

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

#### ①Creare il token

https://huggingface.co/settings/tokens







#### ②Annotare il token

Per esempio, il mio:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③Collegare il token

```Shell
hf auth login
hf auth whoami
```



## Teleoperazione

Collegati al Raspberry Pi via SSH, attiva l'ambiente e avvia lo script host:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```



Poi, sul laptop, attiva `conda activate lerobot` e avvia:

```Bash
python examples/lekiwi/teleoperate.py
```

Lo schermo del laptop deve mostrare: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Ora puoi muovere il braccio di controllo e usare (W, A, S, D) per avanzare, girare a sinistra, indietreggiare, girare a destra. (Z, X) per girare a sinistra/destra. (R, F) per aumentare/ridurre la velocità. Ci sono tre modalità di velocità – vedi tabella:

Con un'altra tastiera, cambia i tasti in [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Troubleshooting comunicazione

Se hai problemi a connettere il robot mobile SO101, segui questi passi.

### 1. Verificare la configurazione dell'indirizzo IP

Assicurati che nell'file di config ci sia l'IP corretto del Raspberry Pi. Per verificarlo (nella console del Pi):

```Bash
hostname *-I*
```

### 2. Verificare che il laptop/PC raggiunga il Pi

Ping dal laptop:

```Bash
ping <your_pi_ip_address>
```

Se il ping fallisce:
- Il Pi è acceso e sulla stessa rete?
- SSH è abilitato sul Pi?

### 3. Provare la connessione SSH

Se il login SSH fallisce: connessione forse non corretta. Comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

ad es. `ssh pi@192.168.0.106`

Se c'è un errore di connessione:
- Abilita SSH sul Pi:

```Bash
sudo raspi-config
```

- Poi naviga: **Interfacing Options -\> SSH** e abilitalo.

### 4. Coerenza dei file di configurazione!!!

Assicurati che i file di configurazione su laptop/PC e Raspberry Pi siano identici.

# G. Registrare un dataset

Dopo la familiarità con la teleoperazione, registra il tuo primo dataset con LeKiwi.

Per avviare, collegati al Raspberry Pi via SSH, attiva l'ambiente e avvia lo script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Per caricare sul Hub, se non hai già effettuato il login, accedi con un token in scrittura (generabile su [Hugging Face Settings](https://huggingface.co/settings/tokens)):

```Shell
hf auth login
hf auth whoami
```

Salva il nome del repository Hugging Face in una variabile:

```Bash
hostname *-I*
```

Poi sul laptop, registra 2 episodi e carica il dataset sul hub:

```Bash
python examples/lekiwi/record.py
```

# H. Visualizzare il dataset

Un dataset caricato si visualizza [online](https://huggingface.co/spaces/lerobot/visualize_dataset) – copia l'ID del repository generato:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Senza upload, anche in locale (browser su `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### Visualizzare un dataset (saltabile, opzionale)

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Con upload, anche in locale:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Senza upload, anche in locale:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Qui, `juxi` è il `repo_id` personalizzato in fase di raccolta.

#### Consigli di raccolta

Dopo la familiarità, crea dataset più grandi. Buon compito iniziale: afferrare oggetti in posizioni diverse e metterli in un contenitore. Almeno 50 episodi, 10 per posizione. Fotocamera fissa, gesto di presa coerente. L'oggetto deve essere chiaramente visibile; criterio semplice: il compito deve poter essere completato guardando solo l'immagine della fotocamera.

Nel prossimo capitolo allenerai la rete neurale. Dopo prestazioni di presa affidabili, introduci più variazione (più posizioni, tecniche diverse, cambio fotocamera).

Evita troppa variazione troppo in fretta: può influire sui risultati.

Per approfondire: [post del blog sui buoni dataset](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

#### Troubleshooting:
