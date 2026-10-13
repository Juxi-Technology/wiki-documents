---
title: 03 · Distribuzione
---

# 03 · Distribuzione

> **Precedente**: [02-Environment-Setup](02-Environment-Setup.md)
> **Ora scegli uno dei due percorsi**: [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot completo)
> oppure [lerobot/](../lerobot/01-Operation.md) (braccio singolo / LeKiwi)

Portare l'immagine sulla propria macchina e avviare il container. Al termine di questa parte si troverà in una shell con tutto l'ambiente già installato.

---

## 1. Ottenere l'immagine

Esiste esattamente una sola immagine:

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| Architettura | `arm64` |
| Funziona su | Jetson + JetPack 7.2 |
| Download | circa 3,6 GB (più grande una volta decompressa —— lasci 20 GB liberi) |
| Contiene | teleoperazione, calibrazione, registrazione dei dati, addestramento e inferenza, **accelerati dalla GPU** |

Verifichi che sia arrivata:

```bash
docker images | grep xlerobot
```

Dovrebbe vedere `chenyang310/xlerobot` con il tag `jetson`.

> **Cina continentale**: questo pull funziona così com'è —— non serve alcun acceleratore di mirror. Se è lento, vedere
> [02-Environment-Setup](02-Environment-Setup.md), sezione 2.

### Costruire l'immagine da sé (maintainer)

Adatto a chi ha bisogno di modifiche o vuole usare il codice sorgente più recente.

```bash
git clone <URL di questo repository> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

Gli script di build hanno già configurato i mirror per la Cina continentale (PyPI di Aliyun, repository Ubuntu di Aliyun):
**non serve alcuna configurazione aggiuntiva per fare la build sulla rete della Cina continentale**.

> La prima build scarica circa 2 GB di dipendenze: su una rete lenta può richiedere una o due ore.
> Con `scripts/sync.sh` e la cache `wheels/` sulla scheda si possono riutilizzare i pacchetti già scaricati.

---

## 2. Cosa contiene l'immagine

Una sola immagine, tutto incluso:

- **Teleoperazione e calibrazione** —— guidare il robot a mano e salvarne la calibrazione
- **Registrazione e riproduzione dei dati**
- **Addestramento** —— ACT, Diffusion Policy, SmolVLA, π₀, π₀.₅, Wall-OSS
- **Inferenza** —— eseguire una policy addestrata sul robot, **accelerata dalla GPU**

---

## 3. Avviare il container

### 3.1 Avvio tramite script (consigliato)

Se ha clonato il repository:

```bash
bash scripts/run.sh jetson
```

Lo script configura già tutto questo:

- **GPU** —— `--device nvidia.com/gpu=all` (CDI)
- **Passthrough dei dispositivi** —— porta seriale, telecamera, USB
- **Rete** —— `--network host`, necessario per la teleoperazione VR e il controllo web
- **Mount del codice sorgente** —— modificare il codice non richiede di ricostruire l'immagine
- **Mount delle cache** —— i file di calibrazione e i modelli scaricati vengono conservati

### 3.2 Avvio manuale

Se non si usa lo script, il comando minimo funzionante:

```bash
docker run -it --rm \
  --name xlerobot \
  --device nvidia.com/gpu=all \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson
```

**A cosa serve ogni parametro:**

| Parametro | Perché è necessario |
|---|---|
| `--device nvidia.com/gpu=all` | **dà la GPU al container** (via CDI). Senza questo parametro non c'è alcuna GPU |
| `--privileged` + `-v /dev:/dev` | passthrough di porta seriale (servo SO-101), telecamera e USB |
| `--network host` | comunicazione tra i due processi host/client (ZMQ) e controllo VR |
| `-v ~/.cache/huggingface` | **file di calibrazione** e cache dei modelli. Senza questo mount bisogna ricalibrare a ogni riapertura del container |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | da usare quando serve la visualizzazione (finestra rerun) |
| `-e HF_ENDPOINT` | `huggingface.co` è completamente irraggiungibile dalla Cina continentale: bisogna passare da un mirror |

> Il `/home/jetson` nel percorso di mount è la directory utente **all'interno dell'immagine** —— fissarlo
> direttamente è corretto, perché l'utente di quell'immagine si chiama `jetson`.

Una volta entrati si apre una bash, con directory di lavoro `/opt/xlerobot`.

---

## 4. Parametri GPU —— il metodo CDI

L'immagine **deve** ricevere la GPU tramite CDI —— **`--runtime nvidia` non può essere usato**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Prima del primo utilizzo occorre generare la specifica CDI sull'**host**:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Problema già incontrato**: su JetPack 7.2 l'hook
> `enable-cuda-compat` di `nvidia-container-toolkit 1.19.1` va in crash
> (`slice bounds out of range`), e il container non riesce nemmeno ad avviarsi.
> Basta disattivarlo aggiungendo un parametro:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> Quando la versione CUDA del container coincide con quella dell'host, questo hook non serve.

### Verificare che la GPU sia utilizzabile

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Specifico per piattaforma

### Serie Jetson Orin —— ✅ Attualmente supportata

| Modello | Richiede | Note |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | la scheda che abbiamo testato di persona (anche con 3,4 GB di RAM la teleoperazione gira) |
| **Orin NX** | JetPack **7.2** | come sopra |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **non supportano** l'AGX Orin 64GB: serve la 7.2 |

**L'unico requisito obbligatorio è la versione di JetPack**: il torch nell'immagine è compilato con CUDA 13.0,
e CUDA 13.x richiede driver **≥ 580**.

| JetPack | L4T | CUDA | Driver | Utilizzabile? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ driver troppo vecchio |
| **7.2** | 39.2 | 13.2 | serie 595 | ✅ |

Per verificare la propria versione:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Il passaggio da JetPack 6.x a 7.x **non si può fare con `apt upgrade` / OTA** (l'OTA funziona solo
> all'interno della stessa major release L4T): serve un reflash completo della scheda.

### Jetson Nano (2019, originale) —— ❌ Mai supportato

Tre motivi indipendenti, e sono tutti vicoli ciechi:

1. **CUDA 13 ha rimosso del tutto l'architettura Maxwell**. Il driver R580 è l'ultimo ramo a supportare
   Maxwell / Pascal / Volta, e CUDA 13 richiede proprio la 580+. Il Jetson Nano al massimo
   arriva a JetPack 4.6.6 / CUDA 10.2.
2. **Compute 5.3 è sotto il minimo supportato da torch**. Le architetture per cui è compilato
   il torch di questa immagine sono `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` —— il minimo è sm_80,
   mentre il Jetson Nano è sm_53: non ha kernel nativi, e nemmeno la compilazione JIT del PTX arriva fin lì.
3. **La piattaforma è EOL** (JetPack 4 non è più mantenuto da novembre 2024).

### Qualsiasi altra piattaforma —— ❌ Non supportata

Raspberry Pi, i normali PC x86, Windows e macOS **non possono eseguire questa immagine**. È compilata contro lo
stack CUDA di JetPack 7.2 ed è distribuita esclusivamente in `arm64`, quindi non esiste alcuna edizione CPU su cui
ripiegare. Usi una scheda Jetson Orin.

> Verifichi quello che ha: `uname -m` deve mostrare `aarch64`, e `cat /etc/nv_tegra_release`
> deve riportare **R39**.

---

## Dopo essere entrati nel container

Esegua prima un'autoverifica:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Output previsto:

```
torch 2.11.0+cu130
lerobot 0.6.2
```

> ⚠️ **`xlerobot` e `xlerobot_mecanum` non possono stare nello stesso processo**: nel codice sorgente
> entrambi si registrano come `"xlerobot"` (bug di XLeRobot a monte), e si ottiene
> `Cannot register ... as xlerobot because ... already registered`.
>
> Tutte le altre combinazioni sono compatibili: **i robot di LeRobot originale e XLeRobot possono coesistere
> nello stesso processo** (verificato: 8 tipi registrati contemporaneamente con successo), e nemmeno `xlerobot_2wheels` entra in conflitto.
> Un robot usa una sola variante, quindi nell'uso normale non ci sono conseguenze.

---

> **Ora scegli uno dei due percorsi**: [xlerobot/](../xlerobot/01-Operation.md) XLeRobot completo ·
> [lerobot/](../lerobot/01-Operation.md) braccio singolo / LeKiwi
