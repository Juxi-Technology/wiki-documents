---
title: Robotica su JetPack 7.2 — cosa funziona sull'Orin Nano
sidebar_label: Robotica (situazione attuale)
slug: /tutorials/robotics
description: >-
  Una pagina di stato onesta per la robotica sul kit di sviluppo Jetson Orin
  Nano Super (8GB) con JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac Sim, stack in
  stile LeRobot e cosa evitare di pianificare per ora.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# Robotica su JetPack 7.2 — cosa funziona sull'Orin Nano

JetPack 7.2 ha portato questo kit a una nuova generazione di piattaforma: Ubuntu
24.04, CUDA 13 e il tetto di 8 GB di memoria che modella ogni carico di lavoro
di IA. L'ecosistema della robotica sta ancora recuperando quel salto. Alcuni
pezzi funzionano oggi. Altri no. Altri ancora non sono verificabili da nessuna
pagina ufficiale.

Questa pagina è una pagina di stato, non un tutorial. Tutto ciò che è qui è
verificato solo su documenti — Juxi non ha testato questi stack su hardware.
Controlli la data di ogni pagina di robotica che legge: diverse parti di questo
ecosistema sono cambiate in agosto e settembre 2026. Nel diagramma sotto, il
grande blocco a destra gira sul kit; Isaac Sim e Isaac Lab stanno nel blocco
Omniverse a sinistra, che è un host separato.

![Stack software NVIDIA Jetson, con gli host DGX e Omniverse a sinistra](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Tabella di stato (verificato il 2026-09-26)

| Cosa serve | Stato su JetPack 7.2.1 / Orin Nano (8GB) | Note |
|---|---|---|
| **ROS 2 (core)** | ✅ Funziona | JetPack non installa né richiede alcuna distribuzione ROS. ROS 2 **Jazzy** ha pacchetti arm64 ufficiali per Ubuntu 24.04. Una risposta di un dipendente NVIDIA sul forum (2026-09-07) definisce Jazzy "la distribuzione ROS consigliata per JetPack 7.2.1". Le risposte sul forum non sono documentazione ufficiale. Passaggi di installazione più sotto. |
| **Isaac ROS** (ROS 2 accelerato via hardware) | ⚠️ Rilasciato ad agosto 2026 — con lacune reali | Note di rilascio di Isaac ROS 4.6.0: "Aggiunto il supporto per Jetson Orin" e "Aggiunto il supporto per JetPack 7.2". Orin Nano Super 8GB compare nella tabella di benchmark ufficiale di NVIDIA. Ma i walkthrough non hanno una sezione Orin Nano, la tabella di supporto presuppone un SSD NVMe e la pagina JetPack di NVIDIA dice ancora "in arrivo". Dettagli più sotto. |
| **Isaac Sim / Isaac Lab** (simulazione) | ⛔ Non gira su questo kit | Richiede un host x86_64 con una GPU RTX (minimo GeForce RTX 4080, 16 GB di VRAM, 32 GB di RAM). Le GPU senza RT core non sono supportate. Le build aarch64 esistono solo per DGX Spark. Nei flussi di lavoro di simulazione il simulatore gira sulla macchina x86_64, non sul Jetson. |
| **GR00T (modelli fondazionali per umanoidi)** | ⛔ Non su questo kit | Il post-training di GR00T 1.7 richiede una GPU con almeno 48 GB di VRAM. Il flusso di riferimento di NVIDIA usa un Jetson AGX Thor come computer edge per il robot reale. Lo stesso flusso converte i dati di dimostrazione in formato LeRobot — la direzione software è giusta, ma la potenza di calcolo non vive qui. |
| **Stack Python in stile LeRobot** (SO-ARM101, LeKiwi, vision kit) | ⚠️ Da verificare | Il requisito minimo di versione Python è soddisfatto (Ubuntu 24.04 include Python 3.12.3; LeRobot richiede la 3.12 o successiva). Ma a monte non esiste un percorso ufficiale per JetPack 7.2, e il percorso documentato per Jetson è mantenuto dalla community per JetPack 6.2. Provi il suo stack esatto prima di impegnarsi. |
| **DeepStream** | — Non verificato in questa revisione | Trattato nella sua pagina — vedere [Analisi video DeepStream](/it/tutorials/jetson-orin-nano/deepstream). Questa revisione sulla robotica non ha riverificato la matrice di supporto di DeepStream. |
| **TensorRT Edge-LLM** | — Non verificato in questa revisione | Trattato nella sua pagina — vedere [Inferenza LLM locale](/it/tutorials/jetson-orin-nano/local-llm). Rilevante per la robotica soprattutto attraverso i modelli in stile VLA. |
| **NemoClaw (stack agentico)** | ⚠️ Funziona, supporto di fatto | L'installer rileva automaticamente Jetson (Orin e Thor), e il sito di NVIDIA pubblicizza "Install OpenClaw on Your NVIDIA Jetson Orin Nano™". Ma la matrice ufficiale delle piattaforme non ha una riga Jetson, e il progetto è alpha / "Early preview". Gli 8 GB sono la RAM minima dichiarata (16 GB consigliati) con un rischio documentato di esaurimento memoria. Vedere [IA agentica](/it/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS su JetPack 7.2 — cosa dicono oggi le pagine ufficiali

**Le pagine di NVIDIA sono in disaccordo tra loro.** La pagina dei download di
JetPack 7.2.1 elenca ancora "NVIDIA Isaac™ ROS — In arrivo". Le pagine del
progetto Isaac ROS dicono che il supporto è stato rilasciato. Per Isaac ROS
stesso, le pagine del progetto sono la fonte più specifica, e sono più recenti:

- **Isaac ROS 4.6.0 (2026-08-18)** — note di rilascio: "Aggiunto il supporto per
  Jetson Orin" e "Aggiunto il supporto per JetPack 7.2". Prima release 4.x con
  quella combinazione.
- **Piattaforme supportate:** "Le piattaforme definite in questa tabella sono le
  uniche combinazioni hardware e software che Isaac ROS testa e supporta
  ufficialmente." La riga Jetson: "Jetson Thor (T5000 e T4000) e Jetson Orin",
  JetPack 7.2, archiviazione "128+ GB NVMe SSD". La tabella dice "Jetson Orin"
  (la famiglia), non "Orin Nano".
- **Benchmark:** la tabella delle prestazioni ha una colonna dedicata "Orin Nano
  Super 8GB" con voci reali — ad esempio il nodo AprilTag a 720p, 104 fps, e il
  grafo Mobile SAM a 720p, 4,80 fps. Sono cifre pubblicate da NVIDIA per questo
  dispositivo, non misurazioni di Juxi. I carichi di lavoro più pesanti mostrano
  un trattino ("–"): FoundationPose, Grounding DINO e il SAM completo non sono
  elencati come eseguibili.
- **Isaac ROS 5.0.0 (2026-09-21)** è passato a ROS 2 Lyrical Luth. Il
  repository apt pubblico di ROS 2 non fornisce pacchetti ROS 2 Lyrical per
  Ubuntu 24.04; NVIDIA li pubblica sul proprio CDN di Isaac ROS Buildfarm. Isaac
  ROS 4.6 resta su ROS 2 Jazzy. Scelga la 4.6 per lo stack Jazzy mainstream.

**Lacune da conoscere prima di impegnarsi:**

- **Nessuna sezione di configurazione per Orin Nano.** I walkthrough per Jetson
  coprono solo Jetson AGX Thor e Jetson AGX Orin; l'unico link rilevante per
  Orin Nano è la guida alle impostazioni di alimentazione.
- **Si presuppone un SSD NVMe.** La colonna dell'archiviazione dice "128+ GB
  NVMe SSD". Questo kit non include alcuna archiviazione, quindi una
  configurazione con sola microSD resta fuori dall'aspettativa dichiarata
  (vedere [Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start)).
- **Disallineamento di versioni.** Le pagine di configurazione della 4.6
  chiedono di confermare "R39 (release), REVISION: 2.0" (L4T r39.2.0) da
  `cat /etc/nv_tegra_release`; questo kit arriva con JetPack 7.2.1 = L4T
  r39.2.1. Validi in Docker prima di migrare un robot di produzione.
- **Fotocamere e OpenCV.** Le fotocamere Intel RealSense sono "supportate solo
  in modalità Docker. Le modalità Virtual Environment e Bare Metal non sono
  supportate." JetPack 7.2 installa inoltre OpenCV 4.8.0, mentre Isaac ROS è
  testato con la 4.6.0 — la correzione è nei passaggi di installazione più sotto.
- **Una regressione della 5.0.** In Isaac ROS 5.0, il DNN image encoder può
  avere un throughput inferiore rispetto alla 4.6. Se quel nodo è importante per
  lei, consideri la 4.6.

> **Importante**: se Isaac ROS è sul suo percorso critico, valuti i tempi. Il
> supporto su JetPack 7.2 è reale ma nuovo (agosto 2026), e la documentazione
> per Orin Nano è scarna. Questo kit era già un target Isaac ROS supportato
> nell'era JetPack 6.2 (Isaac ROS 3.2 Update 1, gennaio 2025). Un team che ha
> bisogno della combinazione più consolidata, e non può assorbire il
> travaglio di una prima release, ha un caso difendibile per restare su una
> configurazione dell'era JetPack 6.2. Tutti gli altri: passino alla 7.2.1, ma
> validino la loro pipeline esatta in Docker su questo kit prima di impegnarsi.

## Simulazione e addestramento — un'altra macchina

Isaac Sim 6.0 non può girare su questo kit. Minimi pubblicati per il percorso
Linux x86_64: GeForce RTX 4080, 16 GB di VRAM, 32 GB di RAM, 50 GB di SSD. "Le
GPU senza RT Core (A100, H100) non sono supportate." La build aarch64 "è
attualmente supportata solo su sistema DGX Spark". Nei flussi di lavoro di
simulazione di Isaac ROS, "Isaac Sim gira su una macchina x86_64 che fornisce
dati dei sensori e informazioni sul mondo" — il Jetson è il target di
deployment.

All'estremità pesante del robot learning la divisione è la stessa: il
post-training di GR00T 1.7 richiede almeno 48 GB di VRAM, e il flusso di
riferimento di NVIDIA usa un Jetson AGX Thor come computer edge per il robot
reale. La regola: simuli e addestri su un PC, faccia il deployment e l'inferenza
sul kit. Se Isaac Sim era la sua ragione per considerare un Orin Nano, è la
macchina sbagliata per quel lavoro.

## LeRobot e gli stack robotici Python — la questione della compatibilità

1. **La questione della versione Python ha una risposta chiara: la 3.12 va
   bene.** Il Python di sistema di Ubuntu 24.04 è la 3.12.3, e LeRobot (0.6.2)
   richiede Python 3.12 o successivo. L'aggiornamento non blocca LeRobot per
   ragioni di versione Python.
2. **Ma a monte non esiste un percorso per JetPack 7.2.** La pagina di
   installazione ufficiale di LeRobot dichiara che su Jetson non c'è decodifica
   video accelerata dalla GPU per impostazione predefinita (la libreria ricade
   su pyav), che le wheel torchcodec per aarch64 richiedono PyTorch 2.11 o
   successivo, e che la sua build Docker per Jetson è destinata a **JetPack
   6.2** ed è mantenuta dalla community. Nessuna dichiarazione ufficiale dice
   che il LeRobot attuale abbia wheel CUDA aarch64 pronte per CUDA 13 di
   JetPack 7.2.
3. **Quindi: "da verificare" — non "supportato", non "rotto".** Prima di
   progettare attorno a LeRobot su questo kit, provi il suo stack esatto:
   lo installi, esegua una piccola policy e confermi che l'inferenza usi la GPU.

> **Nota di Juxi:** i nostri kit robotici (SO-ARM101, LeKiwi, vision kit) sono
> costruiti su LeRobot. Su questo kit con JetPack 7.2.1, non esiste ancora un
> percorso testato né a monte né da Juxi. JetPack 6.2 è la piattaforma di
> riferimento per il percorso mantenuto dalla community. Si confronti con il
> supporto Juxi (vedere [Download](/it/tutorials/jetson-orin-nano/downloads))
> prima di impegnare un programma di progetto su LeRobot con questo kit.

## Cosa funziona oggi

### ROS 2 Jazzy — le fondamenta

JetPack non include ROS. Il percorso funzionante è l'installazione deb ufficiale
di ROS 2 Jazzy per Ubuntu 24.04 (arm64), sintetizzata dalla documentazione di
ROS 2:

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — quando serve percezione accelerata

Installi dal repository apt di NVIDIA (la pagina ufficiale elenca i comandi
esatti del keyring): repository
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, canale
`noble-jetpack`; mirror per la Cina `isaac.download.nvidia.cn`. Poi:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Rimuova una volta l'OpenCV 4.8.0 preinstallato (vedere l'elenco delle lacune
sopra); Isaac ROS installa poi automaticamente la sua OpenCV 4.6.0 bloccata:

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA consiglia Docker: "Docker è l'opzione consigliata per la maggior parte
degli utenti. Offre il massimo livello di isolamento dal sistema host." Questo
corrisponde anche al requisito delle fotocamere RealSense (solo Docker).

### NemoClaw e lo stack agentico

L'installer rileva automaticamente i dispositivi NVIDIA Jetson (Orin e Thor) e
applica la configurazione host specifica per JetPack. Due avvertenze: il
progetto è alpha ("Early preview"), e la sua matrice ufficiale delle piattaforme
non ha una riga Jetson, quindi il supporto è di fatto, non una dichiarazione
ufficiale. Gli 8 GB sono la RAM minima dichiarata (16 GB consigliati), con un
rischio documentato di esaurimento memoria intorno all'immagine sandbox di circa
2,4 GB. Vedere [IA agentica](/it/tutorials/jetson-orin-nano/agentic-ai).

## Raccomandazione

- **Solo ROS 2:** costruisca su JetPack 7.2.1 con ROS 2 Jazzy oggi. Funziona.
- **Isaac ROS sul percorso critico:** supportato da agosto 2026, ma nuovo, con
  documentazione scarna per Orin Nano. Validi in Docker; pianifichi un NVMe. Se
  le serve la combinazione più consolidata, una configurazione dell'era JetPack
  6.2 resta difendibile — vedere la [guida alla
  migrazione](/it/tutorials/jetson-orin-nano/jetpack-6-to-7) per i costi di
  ricostruzione in entrambi i casi.
- **Serve simulazione o addestramento:** preveda un PC RTX separato (Isaac Sim)
  e un dispositivo di classe Thor per lavori di classe GR00T. Questo kit non
  può fare né l'uno né l'altro.
- **Costruito su LeRobot:** da verificare. Testi prima; JetPack 6.2 è il
  riferimento per il percorso documentato.
- **Non compri questo kit per:** Isaac Sim, post-training di GR00T o carichi di
  lavoro in tempo reale di classe SAM completo / Grounding DINO /
  FoundationPose — gli ultimi tre non sono elencati come eseguibili nella
  tabella di benchmark di NVIDIA per questo dispositivo.

## Ancora poco chiaro

- **micro-ROS:** non è stata trovata alcuna pagina ufficiale specifica per
  Jetson (due URL ufficiali di micro.ros.org restituiscono 404 oggi). Consideri
  l'abbinamento non verificato.
- **Distribuzione ROS dopo Isaac ROS 5.0:** la risposta del forum che consiglia
  Jazzy precede la 5.0 (2026-09-21); non è stata trovata alcuna dichiarazione
  successiva alla 5.0.
- **LeRobot su JetPack 7.2:** nessuna dichiarazione ufficiale; verifichi la
  disponibilità di wheel PyTorch aarch64 per CUDA 13 prima di impegnarsi.
- **Configurazioni con sola microSD e Isaac ROS:** la tabella di supporto dice
  NVMe, ma questo non è ribadito specificamente per Orin Nano.
- **"Jetson Orin" contro "Orin Nano":** la tabella delle piattaforme usa il nome
  della famiglia; "Orin Nano Super 8GB" compare solo nella tabella dei
  benchmark. Non è chiarito se NVIDIA tratti queste come dichiarazioni di
  supporto separate.
- **DeepStream e TensorRT Edge-LLM:** non riverificati in questa revisione
  sulla robotica — vedere le loro pagine.

## Fonti

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (piattaforme supportate, Docker, ROS 2 Lyrical; verificato il 2026-09-26)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (abbinamento Jazzy, installazione apt, nota OpenCV; verificato il 2026-09-26)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim su x86_64; verificato il 2026-09-26)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (note 4.6.0 e 5.0.0; limitazioni RealSense e DNN encoder; verificato il 2026-09-26)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (colonna di benchmark Orin Nano Super 8GB; verificato il 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (pacchetti ROS 2 Lyrical per Ubuntu 24.04; verificato il 2026-09-26)
- [Requisiti di installazione di Isaac Sim 6.0](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (verificato il 2026-09-26)
- [Flusso end-to-end GR00T — prerequisiti](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (verificato il 2026-09-26)
- [Forum per sviluppatori NVIDIA — "Is ROS2 Jazzy the correct version..." (risposta di un dipendente; forum, non documentazione ufficiale)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (verificato il 2026-09-26)
- [Installazione di ROS 2 Jazzy — pacchetti deb (a monte)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (verificato il 2026-09-26)
- [Installazione di ROS 2 Jazzy — repository apt (a monte)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (verificato il 2026-09-26)
- [Guida all'installazione di LeRobot (a monte)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (verificato il 2026-09-26)
- [LeRobot pyproject.toml (a monte)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (pin di Python e torchcodec; verificato il 2026-09-26)
- [Ubuntu Noble — pacchetto python3](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; verificato il 2026-09-26)
- [NemoClaw — prerequisiti](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (verificato il 2026-09-26)
- [NemoClaw — matrice di supporto delle piattaforme](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (stadio alpha; nessuna riga Jetson; verificato il 2026-09-26)
- [NemoClaw — risoluzione dei problemi dell'installer (rilevamento automatico Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (verificato il 2026-09-26)
- [NVIDIA — Build a Claw ("Install OpenClaw on Your NVIDIA Jetson Orin Nano™")](https://www.nvidia.com/en-us/ai/build-a-claw/) (verificato il 2026-09-26)
- [Pagina dei download di JetPack 7.2.1 (la matrice dei componenti elenca Isaac ROS come "in arrivo")](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)

*Stato: rivisto il 2026-10-11. La disponibilità
dell'ecosistema cambia rapidamente — ricontrolli le pagine NVIDIA e a monte
collegate prima di fare affidamento su questa tabella. Non ancora verificato su
hardware fisico da Juxi Technology.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
