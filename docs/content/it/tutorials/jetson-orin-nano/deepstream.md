---
title: Pipeline di analisi video — DeepStream 9.1
sidebar_label: Analisi video DeepStream
slug: /tutorials/deepstream
description: >-
  Eseguire NVIDIA DeepStream 9.1 sul kit di sviluppo Jetson Orin Nano Super
  (8GB) — abbinamento delle versioni, installazione, limiti di decodifica,
  memoria e output RTSP headless.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# Pipeline di analisi video — DeepStream 9.1

DeepStream è l'SDK di NVIDIA per la costruzione di pipeline accelerate di
analisi video intelligente (IVA), e DeepStream 9.1 è la release che gira su
Jetson Orin con JetPack 7.2. Questa pagina copre l'abbinamento delle versioni,
i percorsi di installazione, i limiti di decodifica, cosa aspettarsi alla prima
esecuzione, l'output RTSP headless e le note sulla memoria per il kit di
sviluppo Orin Nano Super da 8 GB.

## 1. Abbinamento delle versioni

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT 10.16.1.7
↔ GStreamer 1.24.2** (immagine Docker `deepstream:9.1`), come elencato nella
tabella *Platform and OS Compatibility* della [DeepStream Installation
Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html).

DeepStream 8.0 e 9.0 elencavano **solo AGX Thor**; la 9.1 è la prima release
9.x la cui riga include Jetson Orin ("AGX Thor, Jetson Orin") — la riga dice
**"Jetson Orin"** come gruppo; le righe precedenti (da DS 6.3 a DS 7.1)
nominavano "Orin nano" esplicitamente. Non è stata trovata alcuna nota di
rilascio 9.1 che confermi specificamente Orin Nano — consideri il supporto
implicito dall'etichetta di gruppo (non ancora confermato). Kit di riferimento:
JetPack 7.2.1 / L4T r39.2.1.

## 2. Cosa può decodificare questo kit

Il decoder
[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
usa il motore hardware NVDEC e supporta **H.264, H.265, AV1, JPEG e MJPEG**.
Capacità pubblicate del modulo Orin Nano:

| Capacità | Specifica |
|---|---|
| Decodifica video (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Codifica video | Nessun encoder hardware — "1080p30 supportato da 1-2 core CPU" |
| DLA · PVA | Nessuno |

L'inferenza gira nel plugin
[Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
su engine TensorRT: modelli FP16, FP32 e INT8 (FP16 e INT8 dipendono dalla
piattaforma); INT8 richiede un file di calibrazione. L'opzione `enable-dla` del
plugin non ha un engine a cui puntare su questo modulo — la pagina prodotto di
Orin Nano elenca "DL Accelerator: -" e "Vision Accelerator: -".

**Con 8 GB:** frame decodificati, engine e memoria dell'applicazione condividono
un unico pool, senza DLA su cui scaricare lavoro. Il campione "30 flussi" qui
sotto decodifica 30 flussi 1080p; la capacità di decodifica pubblicata di questo
modulo è 11x 1080p30 (H.265), quindi pianifichi meno flussi o una risoluzione
inferiore. Inoltre **non c'è alcun encoder video hardware** — l'output
codificato (ad esempio lo streaming RTSP) gira sulla CPU.

## 3. Installazione — prima Docker

La guida di NVIDIA dice: "Consigliato ai nuovi utenti: usare il Metodo 4
(container Docker) per la configurazione più rapida e senza dipendenze." I
quattro metodi per Jetson:

| Metodo | Di che cosa si tratta |
|---|---|
| 1 — SDK Manager | Selezionare **DeepStreamSDK** sotto "Additional SDKs" insieme ai componenti di JetPack 7.2 GA. |
| 2 — pacchetto tar | `deepstream_sdk_v9.1.0_jetson.tbz2`, un asset di release su GitHub. |
| 3 — pacchetto Debian | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (consigliato) | Container Jetson su NGC (`nvcr.io`). |

I container Jetson sono `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`
(applicazioni di riferimento, modelli e configurazioni di esempio) e
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (più le librerie devel e i
backend Triton). Prerequisiti: `docker-ce`, l'NVIDIA Container Toolkit, un
account NGC e `docker login nvcr.io` (nome utente `$oauthtoken`, password = la
sua chiave API NGC).

> **Importante**: NVIDIA dichiara: "I container Docker per Jetson sono solo per
> il deployment. Non supportano lo sviluppo software DeepStream all'interno di
> un container." Costruisca le applicazioni in modo nativo sul kit e aggiunga i
> suoi binari alla sua immagine.

In Docker, esegua invece `user_additional_install.sh` (vedere la nota su EOS
sotto). Il messaggio "Failed to detect NVIDIA driver version" del container
Triton è innocuo.

> **Nota di Juxi:** per un'installazione minima dell'host, selezioni solo
> "Jetson OS" in SDK Manager, poi esegua `sudo apt install docker.io`,
> `sudo apt install nvidia-container`, `sudo apt install nvidia-l4t-gstreamer`
> e `sudo service docker restart`.

## 4. Massimizzare i clock — con una modalità di alimentazione specifica del kit

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Citato dal quickstart: "Per i moduli Jetson Orin Nano, usi sudo nvpmodel -m 2
invece di -m 0 per abilitare la modalità MAXN SUPER. Per tutti gli altri moduli
Jetson Orin (incluso Orin NX), usi -m 0." Esegua questi comandi prima di
avviare le applicazioni DeepStream. Su un kit da 8 GB configurato in modalità
Super, le modalità di alimentazione sono **15W (modalità 0)**, **25W (modalità
1, predefinita)** e **MAXN_SUPER (modalità 2)**; MAXN_SUPER esiste solo sulle
unità con flashing Super.

> **Attenzione**: se mancano 25W / MAXN SUPER, o `nvpmodel -m 2` segnala una
> modalità di alimentazione non valida, l'unità non è stata flashata con la
> configurazione Super. Vedere la
> [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

## 5. Prima esecuzione — gli engine TensorRT si costruiscono al primo utilizzo

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Citato dal quickstart: per un modello senza un file di engine già esistente,
"può richiedere fino a qualche minuto (a seconda della piattaforma e del
modello) per la generazione del file e l'avvio dell'applicazione. Per le
esecuzioni successive, questi file di engine generati possono essere
riutilizzati per un caricamento più rapido." Le metriche FPS scorrono nel
terminale. Il "(~30 FPS per questa configurazione)" del quickstart è la cifra
generica della documentazione — **non è una misurazione dell'Orin Nano**. Se
l'applicazione non riesce a creare gli elementi Gst, svuoti la cache e riprovi:
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. Altre configurazioni di
esempio coprono le fotocamere USB e CSI e il tracciamento con inferenza
secondaria.

## 6. Funzionamento headless con output RTSP

Il quickstart documenta come eseguire senza display: le configurazioni
predefinite usano il renderer EGL `nveglglessink` (`type=2` nei gruppi
`[sink]`), che richiede un server X in esecuzione. Aggiunga invece un gruppo
sink di output RTSP — il gruppo `[sink2]` in
`source30_1080p_dec_infer-resnet_tiled_display.txt` è l'esempio — e imposti
`enable=0` per il gruppo sink EGL. L'output RTSP codificato gira sulla CPU
(Sezione 2: nessun encoder hardware).

> **Nota di Juxi:** con i flussi RTSP, l'applicazione può bloccarsi nel
> raggiungere l'EOS (un problema di `rtpjitterbuffer`). Su bare metal, esegua
> `update_rtpmanager.sh` in `/opt/nvidia/deepstream/deepstream/` una volta, dopo
> aver installato i pacchetti prerequisiti del Quickstart. In Docker, esegua
> invece `user_additional_install.sh`.

## 7. Pianificazione della memoria per 8 GB

Il blog di NVIDIA sull'efficienza della memoria dichiara: "Modulo Jetson Orin
Nano 8 GB, degli 8 GB di DRAM fisica, circa 7,6 GB sono utilizzabili dopo le
riservazioni di firmware e kernel." CPU e GPU condividono questo pool. Leve
documentate per le pipeline in stile DeepStream:

| Leva | Memoria che può essere recuperata |
|---|---|
| Eseguire in bare metal invece che in un container | Fino a 70 MB |
| Passare da applicazioni Python ad applicazioni C++ | Fino a 84 MB |
| Disattivare Tiler/OSD e usare FakeSink | Fino a 258 MB |
| **Totale** | **412 MB** |

Disattivare Tiler/OSD e usare FakeSink "rimuove le fasi di visualizzazione
necessarie per la visualizzazione ma non necessarie nei deployment headless o di
produzione. Questo risparmia memoria, riduce il carico della GPU e migliora il
throughput." Si abbina al percorso RTSP headless qui sopra; disattivare il
desktop grafico può liberare fino a 865 MB. Per il manuale completo sugli 8 GB,
vedere [Efficienza della memoria su 8
GB](/it/tutorials/jetson-orin-nano/memory-efficiency).

## Cosa NVIDIA non pubblica per questo kit

La pagina ufficiale delle prestazioni di DeepStream 9.1 per Jetson copre solo
due piattaforme: **Jetson AGX Thor** e **Jetson AGX Orin**. Non sono pubblicate
cifre FPS per Orin Nano; non legga le righe di AGX Orin come prestazioni di Orin
Nano. Per il dimensionamento, parta dalla capacità di decodifica (Sezione 2),
poi riduca il numero di flussi e la risoluzione finché la pipeline entra.

Per il dato pubblicato più vicino, i [benchmark Jetson di
Ultralytics](https://docs.ultralytics.com/guides/nvidia-jetson/) riportano
YOLO26n sull'Orin Nano Super a ~4,57 ms/immagine (~219 FPS) con un engine
TensorRT FP16 e ~3,80 ms/immagine (~263 FPS) con INT8, a input 640 — **dati del
fornitore, misurati su software dell'era JetPack 6.1, non sullo stack 7.2.1 di
questo kit**; il tempo di inferenza esclude pre/post-processing. Secondo la
stessa fonte, solo i formati di export PyTorch, TorchScript e TensorRT usano la
GPU — gli altri formati di export girano sulla CPU.

## Risoluzione dei problemi e approfondimenti

- Problemi a livello di sistema (modalità di alimentazione, archiviazione,
  display): [Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting) ·
  [Efficienza della memoria su 8 GB](/it/tutorials/jetson-orin-nano/memory-efficiency).
- Modelli fuori da DeepStream: [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm) ·
  riferimento ufficiale sulle prestazioni:
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Fonti

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificato il 2026-09-26)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (verificato il 2026-09-26)
- [DeepStream Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (verificato il 2026-09-26)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (verificato il 2026-09-26)
- [Gst-nvvideo4linux2 (decoder hardware)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (verificato il 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (verificato il 2026-09-26)
- [Moduli Jetson Orin — specifiche di decodifica, codifica e acceleratori](https://developer.nvidia.com/embedded/jetson-orin) (verificato il 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (blog per sviluppatori)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificato il 2026-09-26)
- [Jetson Linux r39.2 Developer Guide — Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificato il 2026-09-26)
- [Ultralytics — guida NVIDIA Jetson (benchmark del fornitore)](https://docs.ultralytics.com/guides/nvidia-jetson/) (verificato il 2026-09-26)

*Stato: bozza, in attesa di revisione da parte di cheny. Basato sulla
documentazione ufficiale NVIDIA alla data indicata; non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
