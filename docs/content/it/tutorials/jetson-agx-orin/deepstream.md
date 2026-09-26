---
title: Analisi video multi-stream — DeepStream 9.1
sidebar_label: Analisi video DeepStream
slug: /tutorials/deepstream
description: >-
  Installare DeepStream 9.1 sul kit di sviluppo AGX Orin ed eseguire
  l'applicazione di riferimento per l'analisi video — con le opzioni di
  installazione ufficiali, le configurazioni di esempio e le note specifiche
  per JP7.2.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# Analisi video multi-stream — DeepStream 9.1

DeepStream è il framework di NVIDIA per la creazione di pipeline accelerate di
analisi video intelligente (IVA), e **DeepStream 9.1 viene distribuito con
JetPack 7.2** su Jetson Orin. Questo tutorial segue la documentazione ufficiale
di installazione e avvio rapido di NVIDIA; ogni comando riportato di seguito è
tratto da (o riassunto direttamente da) quelle pagine.

**Abbinamento delle versioni:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔
CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(secondo la
tabella di compatibilità di NVIDIA)*.

## 1. Installazione

NVIDIA offre quattro metodi di installazione su Jetson; la nota ufficiale
raccomanda **Docker per i nuovi utenti** (il più rapido, senza dipendenze):

- **Metodo 4 — Docker (raccomandato per i nuovi utenti):** usare i container NGC DeepStream — vedere [Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Metodo 1 — SDK Manager:** selezionare **DeepStreamSDK** in "Additional SDKs" insieme ai componenti di JetPack 7.2 GA.
- **Metodo 2 — pacchetto tar:** scaricare `deepstream_sdk_v9.1.0_jetson.tbz2` (da [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)), quindi:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Metodo 3 — pacchetto Debian:** installare `deepstream-9.1_9.1.0-1_arm64.deb` con `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Pacchetti prerequisiti** (elenco ufficiale delle dipendenze per
l'installazione nativa):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Nota di Juxi:** se si incontra il problema RTSP documentato (applicazioni
> bloccate su EOS con flussi RTSP), eseguire lo script `update_rtpmanager.sh` in
> `/opt/nvidia/deepstream/deepstream/` dopo aver installato i pacchetti sopra.

## 2. Massimizzare le frequenze di clock (prima di eseguire qualsiasi cosa)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA segnala un'eccezione: **Jetson Orin Nano** usa `-m 2` per MAXN SUPER;
tutti gli altri moduli Orin (incluso AGX Orin) usano `-m 0`. Eseguire questi
comandi prima di avviare le applicazioni DeepStream.

## 3. Eseguire l'applicazione di riferimento

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Cosa aspettarsi (secondo NVIDIA): una visualizzazione a mosaico di 30 flussi
1080p simulati con inferenza ResNet, e le metriche di prestazioni — **~30 FPS
per questa configurazione** — stampate nel terminale. Fare clic su un riquadro
per ingrandirlo; fare clic con il pulsante destro per tornare alla vista a
mosaico.

File di configurazione utili da esplorare (tutti in quella directory):

| Config | Caso d'uso |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | Benchmark a 30 flussi |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Tracciamento + inferenza secondaria |
| `source1_usb_dec_infer_resnet.txt` | **Fotocamera USB singola** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | Configurazioni con **fotocamera CSI** (il supporto dei driver dipende dalla fotocamera) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Esempio di demux |

Note dalla guida di avvio rapido ufficiale:

- **La prima esecuzione con un nuovo modello richiede alcuni minuti** mentre
  viene generato il motore TensorRT; le esecuzioni successive lo riutilizzano.
- Se gli elementi GStreamer non si inizializzano, svuotare la cache:
  `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Funzionamento headless (senza monitor):** il sink EGL predefinito richiede
  un display. Le configurazioni supportano invece un **sink di output RTSP**
  (vedere il gruppo `[sink2]` nella configurazione a 30 flussi) — trasmettere i
  risultati a un'altra macchina.
- Tutte le applicazioni di esempio precompilate si trovano in
  `/opt/nvidia/deepstream/deepstream-9.1/samples/` — ognuna ha un README.

## 4. Le novità di DeepStream 9.1 su JetPack 7.2

- **Pipeline assistite da agenti:** NVIDIA documenta un *DeepStream Coding
  Agent* (supporto ad agenti IA per la creazione di pipeline) —
  [documentazione](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM nella pipeline:** le applicazioni di riferimento includono un
  **deepstream-vllm-plugin** per combinare le pipeline video con il ragionamento
  dei grandi modelli — vedere [la
  documentazione](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html).
  Per l'inferenza di modelli on-device al di fuori di DeepStream, vedere
  [Inferenza LLM locale](/it/tutorials/jetson-agx-orin/local-llm).
- **Triton sul dispositivo:** per eseguire Triton Inference Server in modo
  nativo (senza Docker), eseguire `sudo ./triton_backend_setup.sh` nella
  directory dei campioni (installa Triton 2.68.0 per Jetson).

## Risoluzione dei problemi e approfondimenti

- [DeepStream Troubleshooting & FAQ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Ottimizzazione delle prestazioni](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — necessaria quando si va oltre le configurazioni di riferimento
- [Configurazioni di esempio spiegate](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- Problemi a livello di sistema (display, alimentazione, archiviazione): vedere [Risoluzione dei problemi](/it/tutorials/jetson-agx-orin/troubleshooting)

## Fonti

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificato il 2026-09-24)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (verificato il 2026-09-24)
- [Pagina dei download di JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-24) — ⚠️ la sua tabella dei componenti è in ritardo su alcune righe; per le versioni effettivamente installate vedere [Download](/it/tutorials/jetson-agx-orin/downloads)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
