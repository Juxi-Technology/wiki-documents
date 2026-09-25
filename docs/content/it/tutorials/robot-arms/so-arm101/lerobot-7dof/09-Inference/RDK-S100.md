---
title: "Inferenza su D-Robotics RDK S100"
description: "Deployment end-to-end della policy ACT del SO-ARM101 a 7DOF su D-Robotics RDK S100: esportazione ONNX, quantizzazione ed esecuzione sulla scheda."
---

# Inferenza su D-Robotics RDK S100

Per il flusso di implementazione concreto puoi fare riferimento a questo link [Documentazione completa del flusso LeRobot ACT Policy](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## Deployment end-to-end del modello ACT su RDK S100/S100P

Questa sezione ti guiderà attraverso l'intero ciclo di deployment del modello ACT sull'hardware della serie D-Robotics RDK S100. L'intero processo si divide in tre fasi principali: **esportazione del modello**, **quantizzazione e compilazione** e **esecuzione sulla scheda**.

**Nota preliminare:**

- **Macchina di sviluppo \(Host\):** utilizzata per eseguire i passaggi 1 e 2; di solito è la macchina su cui hai addestrato il modello (deve avere buone prestazioni e Docker installato).

- **Lato scheda \(Edge\):** D-Robotics RDK S100/S100P, utilizzato per eseguire il passaggio 3.

- **Toolchain:** questo documento si basa sul repository `rdk_LeRobot_tools`; per i dettagli vedi [l'indirizzo del repository GitHub](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Nota importante sulla compatibilità delle versioni \(da leggere assolutamente\):** il flusso di esportazione ONNX dell'attuale versione di `rdk_LeRobot_tools` è perfettamente compatibile con la versione **LeRobot datasets v2\.1**. Poiché la versione più recente v3\.0 presenta modifiche alla struttura dei dati, **si consiglia vivamente** di passare il repository principale originale `lerobot` a uno specifico commit compatibile con la v2\.1 prima di eseguire le operazioni di questo capitolo, per garantire che il flusso di esportazione proceda senza intoppi. 

*Commit ID consigliato:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Fase 1: Esportazione del modello in formato ONNX 💻 \(sulla macchina di sviluppo\)

Innanzitutto, dobbiamo esportare il modello ** PyTorch addestrato ** nel formato intermedio (ONNX).



#### **1\. Scaricare il repository della toolchain** 

Entra nella tua directory di lavoro `lerobot` e clona la toolchain dedicata a RDK:

```Bash
cd lerobot

# 1. Passa a una versione stabile compatibile con i datasets v2.1
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Scarica la toolchain dedicata a D-Robotics RDK
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Configurare i parametri di esportazione** 

Modifica il file `rdk_LeRobot_tools/bpu_export_config.yaml` e adatta la configurazione ai tuoi percorsi effettivi:

```YAML
dataset:
  root: "data/so101_pick_place" # Il percorso assoluto o relativo del tuo dataset
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # Il percorso dei pesi originali del modello PyTorch
type: "nash-e" # Architettura hardware di destinazione: RDK S100 corrisponde a nash-e / S100P corrisponde a nash-m
```



#### 3\. Eseguire lo script di esportazione

```Bash
# Esporta ONNX (macchina di sviluppo)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Segnale di successo**: nella directory corrente viene creata la cartella `bpu_export_output`, che contiene lo script `build_all.sh` e i dati di calibrazione per la quantizzazione necessari in seguito.



### Fase 2: Compilazione del modello BPU 🐳 \(nell'ambiente Docker della macchina di sviluppo\)

La quantizzazione e la compilazione dei modelli BPU di D-Robotics richiedono l'ambiente OpenExplorer \(OE\). Consigliamo di usare Docker per isolare l'ambiente.



#### **1\.** **Preparare l'ambiente Docker e l'immagine** 

Assicurati che sulla macchina di sviluppo sia installato Docker ([guida ufficiale all'installazione](https://docs.docker.com/engine/install/)). Scarica l'immagine CPU consigliata e caricala:

```Bash
# Carica l'archivio dell'immagine offline scaricata
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Avviare il container di compilazione**

**Consiglio per evitare problemi**: la compilazione del modello richiede una memoria condivisa piuttosto grande. Assicurati di aggiungere il parametro `--shm-size=15g`, altrimenti è molto probabile che si verifichino errori di memoria IPC.

Monta la directory di lavoro della macchina di sviluppo (che contiene la cartella appena esportata) all'interno del container:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Nota: sostituisci `<docker-image-name>` con il nome effettivo dell'immagine che vedi con `sudo docker images`.\)



#### **3\.** **Eseguire la compilazione all'interno del container** 

Dopo essere entrato nel container, esegui lo script di compilazione rapida:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Verificare gli artefatti di compilazione** 

Al termine della compilazione, sotto `bpu_export_output` viene creata la cartella `bpu_output/`. Questa contiene tutti i file principali necessari per l'esecuzione sulla scheda RDK: 

- Fai clic per visualizzare la struttura della directory `bpu_output/`

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(file del modello quantizzato\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(file del modello quantizzato\)

    - `action_mean.npy` e altri parametri di normalizzazione del dataset

    - `camera1_mean.npy` e altri parametri statistici della telecamera

---

### Fase 3: Deployment e inferenza sulla scheda 🤖 \(da eseguire sull'RDK S100\)

**Controllo dei prerequisiti:**

1. Sul lato scheda RDK è già stato configurato l'ambiente di esecuzione `D-Robotics/lerobot` ed è stato installato `hbm_runtime`.

2. L'intera cartella `bpu_output/` generata nel passaggio precedente è già stata copiata per intero sulla scheda RDK tramite `scp`, chiavetta USB o altri metodi.

3. È già stata completata la configurazione di base della teleoperazione, assicurandosi che la porta seriale del braccio robotico, la porta USB della telecamera e i file di calibrazione siano configurati correttamente.



#### **1\.** **Eseguire l'inferenza accelerata con BPU**

Nel terminale della scheda RDK, entra nella directory della toolchain e avvia lo script di controllo:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Risoluzione dei problemi comuni \(Troubleshooting\)

Se durante il deployment reale incontri problemi, controlla il seguente elenco:

- **Il braccio robotico non si muove?**

    - Controlla il montaggio del dispositivo: digita `ls /dev/ttyACM*` nel terminale e verifica che il numero di porta seriale del braccio robotico sia corretto.

    - Controlla i permessi: prova a eseguire lo script di inferenza con `sudo`, oppure aggiungi l'utente corrente al gruppo `dialout`.

- **Errore nello streaming della telecamera / immagine anomala / il braccio robotico trema sul posto?**

    - Verifica se l'indice della telecamera (Camera Index) è cambiato a causa dell'hot-plug e controlla che la configurazione dei parametri della telecamera nel codice corrisponda ai dispositivi `/dev/video*` effettivi.

- **Durante la copia dalla macchina di sviluppo dei file generati dal container compare "permessi insufficienti"?**

    - I file creati nella directory montata da Docker appartengono per impostazione predefinita a root; sulla macchina di sviluppo esegui `sudo chown -R $USER:$USER bpu_export_output` per risolvere.

