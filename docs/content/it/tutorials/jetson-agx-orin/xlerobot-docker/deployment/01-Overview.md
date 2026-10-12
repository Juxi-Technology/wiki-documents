---
title: 01 · Panoramica
---

# 01 · Panoramica

> **Precedente**: nessuna, questa è la prima parte
> **Successivo**: [02-Environment-Setup](02-Environment-Setup.md)

Questa parte chiarisce tutto: **qual è il flusso di lavoro completo di XLeRobot, quale hardware serve e se la sua macchina lo supporta.**

---

## Flusso di lavoro

Il flusso completo di XLeRobot si articola in quattro passi:

```
① Calibrare il robot  →  ② Teleoperare per raccogliere i dati  →  ③ Addestrare il modello  →  ④ Distribuire il modello per l'esecuzione autonoma
   calibrate        record              train           eval / rollout
```

L'immagine Docker include già tutto l'**ambiente software** necessario per questi quattro passi: Python, PyTorch,
LeRobot, il codice robotico di XLeRobot e i driver per servi e telecamere. Non deve più combattere con i
conflitti di versione.

**Quello che deve preparare da sé** è soltanto: un robot (o, per iniziare, far funzionare il software), un computer e un cavo USB.

---

## Supporto hardware

| Piattaforma | Supporto |
|---|---|
| **Serie Jetson Orin** (JetPack 7.2) | ✅ **piattaforma ufficialmente supportata al momento**, con accelerazione GPU |
| Jetson Nano (2019, versione originale) | ❌ non supportato —— potenza di calcolo troppo bassa, vedere sotto |
| Raspberry Pi / Ubuntu normale / PC x86 | ⏳ **non ancora supportati**, vedere sotto |
| Windows / macOS | ❌ non supportati (il passthrough di porte seriali e telecamere funziona bene solo su Linux) |

> 💡 **Al momento questa immagine è destinata solo a dispositivi Jetson Orin.**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: richiede **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). Anche l'AGX Orin 64GB è pienamente supportato solo con la 7.2.
> - **Jetson Nano (2019, versione originale)**: ❌ non funzionerà mai. È di architettura Maxwell (compute 5.3),
>   e CUDA 13 ha rimosso del tutto il supporto a Maxwell; torch richiede come minimo sm_80.
> - **Raspberry Pi / PC x86**: l'immagine è progettata per supportarli (la versione CPU generica si basa su `python:3.12-slim`,
>   immagine di base che è pubblicata ufficialmente in versione amd64 e in versione arm64),
>   ma **la versione CPU attualmente distribuita non è ancora multi-architettura**:
>   scaricandola si potrebbe ottenere solo amd64 o solo arm64. Si aprirà quando sarà stata fatta la build multi-architettura.
>
> Si consigliano almeno 4 GB di RAM. Anche i 3,4 GB del Jetson Orin Nano bastano per la teleoperazione,
> ma l'addestramento diventa faticoso.

### Requisiti di sistema

- Ubuntu 20.04 / 22.04 / 24.04, oppure Debian 12+
- Raspberry Pi: serve un sistema a 64 bit (`uname -m` deve mostrare `aarch64`)
- Kernel con supporto alle porte seriali USB (in genere è già presente)

### Verificare l'architettura

```bash
uname -m
```

- `aarch64` → Raspberry Pi, Jetson (usare l'immagine arm64)
- `x86_64` → PC normali (usare l'immagine amd64)

---

## I passi da leggere

| # | Cartella | Contenuto | Quando leggerlo |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (proprio qui) | **Scaricare ed eseguire l'immagine** | Primo utilizzo: leggere in ordine `01` → `02` → `03` |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Comandi di esecuzione dell'XLeRobot completo** | Quando si ha l'XLeRobot completo (due bracci + base) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Comandi di esecuzione del LeRobot originale** | Quando si ha solo un braccio SO-101 / SO-100 singolo o un LeKiwi |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Problemi comuni e riferimento rapido | Quando qualcosa non funziona |

> ⚠️ **La seconda e la terza cartella sono alternative** —— dipende dal suo hardware:
> - **XLeRobot completo** (due bracci + base) → vada in `xlerobot/`
> - **Braccio SO-101 / SO-100 singolo**, **LeKiwi** → vada in `lerobot/`
>
> L'immagine è un unico ambiente: si può passare da un percorso all'altro in qualsiasi momento, senza reinstallare nulla.

---

## Il percorso più breve (se si vuole solo provare)

**Sul Jetson (JetPack 7.2)**: pochi comandi per vedere subito il robot in movimento; i dettagli si leggono dopo:

```bash
# 1. Installare Docker (saltare se già installato)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. Aprire il canale GPU per il container (specifico di Jetson, va fatto una sola volta)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Scaricare l'immagine (circa 3,6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Avviare il container
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Eseguire la teleoperazione nel container (al primo avvio parte la procedura guidata di calibrazione)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ Il percorso rapido salta due cose che **prima o poi** dovrà comunque fare; se qualcosa si blocca, torni alla sezione corrispondente:
> - **L'acceleratore di mirror per la Cina continentale** (il passo 3 può bloccarsi) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` non si può omettere** (questo hook ha un bug su
>   JetPack 7.2 e impedisce l'avvio del container) → [03-Deployment §4](03-Deployment.md)
>
> Il passo 5 qui sopra esegue l'esempio dell'**XLeRobot completo**. Se ha solo un braccio SO-101 singolo,
> usi la riga di comando `lerobot-*`: vedere [lerobot/](../lerobot/01-Operation.md).

---

> **Successivo**: [02-Environment-Setup](02-Environment-Setup.md) — Installare Docker, configurare l'acceleratore per la Cina continentale, collegare l'hardware
