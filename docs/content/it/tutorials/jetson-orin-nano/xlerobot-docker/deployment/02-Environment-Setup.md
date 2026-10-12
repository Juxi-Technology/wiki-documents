---
title: 02 · Preparazione dell'ambiente
---

# 02 · Preparazione dell'ambiente

> **Precedente**: [01-Overview](01-Overview.md)
> **Successivo**: [03-Deployment](03-Deployment.md)

Installare Docker, configurare la rete per la Cina continentale e collegare l'hardware. **Se questa parte non è completata, la successiva non funzionerà.**

---

## 1. Installare Docker

Se è già installato può saltare questo passo; prima verifichi:

```bash
docker --version
```

Se non è installato:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**Dopo l'esecuzione dell'ultimo comando deve riconnettersi** (uscire e rientrare, oppure riavviare), altrimenti il comando `docker` segnala
un errore di autorizzazione. Per verificare:

```bash
docker run --rm hello-world
```

---

## 2. Configurare l'acceleratore di mirror per la Cina continentale ⚠️ obbligatorio per gli utenti in Cina continentale

**Una connessione diretta a Docker Hub dalla Cina continentale va in timeout**: senza un acceleratore non si scarica nessuna immagine.

Modifichi `/etc/docker/daemon.json` (se non esiste, lo crei):

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Riavvii Docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Verifichi che abbia effetto:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Molti indirizzi di mirror che circolano online non funzionano più (USTC, NetEase e `dockerproxy.com`
> hanno chiuso il servizio): non copi da articoli vecchi. I tre qui sopra risultano verificati e funzionanti a settembre 2026.

---

## 3. Preparare l'hardware

### 3.1 Cablaggio del robot

1. Collegare al computer i servo del braccio robotico SO-101 tramite la scheda adattatore USB
2. Collegare la telecamera alla porta USB (se si usa RealSense, usare una porta USB 3.0)

### 3.2 Autorizzazioni della porta seriale ⚠️ importante

Se non si configurano, **il container non vede i dispositivi**:

```bash
sudo usermod -aG dialout $USER
```

**Anche in questo caso bisogna riconnettersi perché abbia effetto.**

### 3.3 Verificare che i dispositivi siano riconosciuti

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # porta seriale dei servo
ls /dev/video*                   # telecamera
```

Se i nodi dei dispositivi sono visibili, significa che il sistema li ha riconosciuti.

---

## 4. Configurare il mirror di Hugging Face ⚠️ obbligatorio per gli utenti in Cina continentale

**`huggingface.co` è completamente irraggiungibile dalla Cina continentale**, e per caricare i modelli preaddestrati è indispensabile.

All'avvio del container aggiunga questa variabile d'ambiente:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

Lo script `scripts/run.sh` lo configura già di default. Se si lavora completamente offline, aggiunga anche `-e HF_HUB_OFFLINE=1`.

---

## Lista di controllo

Prima di passare alla parte successiva, verifichi che tutti questi punti siano soddisfatti:

```bash
docker --version                       # Docker installato
docker info | grep -A4 "Registry Mirrors"   # acceleratore attivo
groups | grep dialout                  # autorizzazioni della porta seriale configurate (dopo la riconnessione)
ls /dev/ttyACM*                        # dispositivo riconosciuto
```

---

> **Successivo**: [03-Deployment](03-Deployment.md) — Scaricare l'immagine e avviare il container
