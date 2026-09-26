---
title: Robotik unter JetPack 7.2 — Was auf dem Orin Nano funktioniert
sidebar_label: Robotik (Stand der Dinge)
slug: /tutorials/robotics
description: >-
  Eine ehrliche Statusseite zur Robotik auf dem Jetson Orin Nano Super
  Developer Kit (8GB) unter JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac Sim,
  LeRobot-artige Stacks und was Sie noch nicht einplanen sollten.
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

# Robotik unter JetPack 7.2 — Was auf dem Orin Nano funktioniert

JetPack 7.2 hat dieses Kit auf eine neue Plattformgeneration gehoben: Ubuntu
24.04, CUDA 13 und die 8-GB-Speicherdecke, die jeden KI-Workload prägt. Das
Robotik-Ökosystem holt zu diesem Schritt noch auf. Manche Teile funktionieren
heute. Manche nicht. Manche lassen sich noch von keiner offiziellen Seite
verifizieren.

Diese Seite ist eine Statusseite, kein Tutorial. Alles hier ist ausschließlich
anhand von Dokumenten verifiziert — Juxi hat diese Stacks nicht auf Hardware
getestet. Prüfen Sie das Datum jeder Robotik-Seite, die Sie lesen: Mehrere
Teile dieses Ökosystems haben sich im August und September 2026 geändert. Im
Diagramm unten läuft der große Block rechts auf dem Kit; Isaac Sim und Isaac
Lab sitzen im Omniverse-Block links, der ein separater Host ist.

![NVIDIA-Jetson-Software-Stack, mit den DGX- und Omniverse-Hosts auf der linken Seite](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Statustabelle (geprüft am 2026-09-26)

| Was Sie brauchen | Status unter JetPack 7.2.1 / Orin Nano (8GB) | Hinweise |
|---|---|---|
| **ROS 2 (Kern)** | ✅ Funktioniert | JetPack installiert keine ROS-Distribution und setzt keine voraus. ROS 2 **Jazzy** hat offizielle Ubuntu-24.04-arm64-Pakete. Eine Forum-Antwort eines NVIDIA-Mitarbeiters (2026-09-07) nennt Jazzy „die empfohlene ROS-Distribution für JetPack 7.2.1“. Forum-Antworten sind keine offizielle Dokumentation. Installationsschritte unten. |
| **Isaac ROS** (hardwarebeschleunigtes ROS 2) | ⚠️ Ausgeliefert im August 2026 — mit echten Lücken | Die Release Notes zu Isaac ROS 4.6.0: „Added support for Jetson Orin“ und „Added support for JetPack 7.2“. Orin Nano Super 8GB erscheint in NVIDIAs offizieller Benchmark-Tabelle. Doch die Walkthroughs haben keinen Orin-Nano-Abschnitt, die Support-Tabelle erwartet eine NVMe-SSD, und NVIDIAs JetPack-Seite sagt weiterhin „Coming soon“. Details unten. |
| **Isaac Sim / Isaac Lab** (Simulation) | ⛔ Läuft nicht auf diesem Kit | Erfordert einen x86_64-Host mit RTX-GPU (Minimum GeForce RTX 4080, 16 GB VRAM, 32 GB RAM). GPUs ohne RT-Cores werden nicht unterstützt. aarch64-Builds existieren nur für DGX Spark. In Simulations-Workflows läuft der Simulator auf der x86_64-Maschine, nicht auf dem Jetson. |
| **GR00T (humanoide Foundation-Modelle)** | ⛔ Nicht auf diesem Kit | Das Post-Training von GR00T 1.7 benötigt eine GPU mit mindestens 48 GB VRAM. NVIDIAs Referenz-Workflow nutzt einen Jetson AGX Thor als Edge-Computer für den echten Roboter. Derselbe Workflow konvertiert Demonstrationsdaten in das LeRobot-Format — die Software-Richtung passt, aber die Rechenleistung liegt nicht hier. |
| **LeRobot-artige Python-Stacks** (SO-ARM101, LeKiwi, Vision Kit) | ⚠️ Benötigt Verifikation | Die Python-Versionsuntergrenze ist erfüllt (Ubuntu 24.04 liefert Python 3.12.3; LeRobot erfordert 3.12 oder neuer). Aber Upstream hat keinen offiziellen JetPack-7.2-Weg, und die dokumentierte Jetson-Route wird für JetPack 6.2 von der Community gepflegt. Testen Sie Ihren konkreten Stack, bevor Sie sich festlegen. |
| **DeepStream** | — In dieser Überprüfung nicht verifiziert | Wird auf einer eigenen Seite behandelt — siehe [DeepStream-Videoanalyse](/de/tutorials/jetson-orin-nano/deepstream). Diese Robotik-Überprüfung hat die DeepStream-Support-Matrix nicht erneut geprüft. |
| **TensorRT Edge-LLM** | — In dieser Überprüfung nicht verifiziert | Wird auf einer eigenen Seite behandelt — siehe [Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm). Für die Robotik vor allem über VLA-artige Modelle relevant. |
| **NemoClaw (agentischer Stack)** | ⚠️ Funktioniert, De-facto-Unterstützung | Der Installer erkennt Jetson automatisch (Orin und Thor), und NVIDIAs Website bewirbt „Install OpenClaw on Your NVIDIA Jetson Orin Nano™“. Aber die offizielle Plattformmatrix hat keine Jetson-Zeile, und das Projekt ist Alpha / „Early preview“. 8 GB ist der angegebene RAM-Mindestwert (16 GB empfohlen), mit einem dokumentierten Out-of-Memory-Risiko. Siehe [Agentische KI](/de/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS auf JetPack 7.2 — was die offiziellen Seiten heute sagen

**Die NVIDIA-Seiten widersprechen sich gegenseitig.** Die Downloadseite zu
JetPack 7.2.1 führt weiterhin „NVIDIA Isaac™ ROS — Coming soon“ auf. Die
Projektseiten von Isaac ROS sagen, dass die Unterstützung ausgeliefert ist.
Für Isaac ROS selbst sind die Projektseiten die spezifischere Quelle, und sie
sind neuer:

- **Isaac ROS 4.6.0 (2026-08-18)** — Release Notes: „Added support for Jetson
  Orin“ und „Added support for JetPack 7.2“. Erstes 4.x-Release mit dieser
  Kombination.
- **Unterstützte Plattformen:** „Die in dieser Tabelle definierten Plattformen
  sind die einzigen Hardware- und Software-Kombinationen, die Isaac ROS testet
  und offiziell unterstützt.“ Die Jetson-Zeile: „Jetson Thor (T5000 und T4000)
  und Jetson Orin“, JetPack 7.2, Speicher „128+ GB NVMe SSD“. Die Tabelle sagt
  „Jetson Orin“ (die Familie), nicht „Orin Nano“.
- **Benchmarks:** Die Performance-Tabelle hat eine eigene Spalte „Orin Nano
  Super 8GB“ mit echten Einträgen — zum Beispiel AprilTag Node bei 720p,
  104 FPS, und Mobile-SAM-Graph bei 720p, 4,80 FPS. Dies sind NVIDIAs
  veröffentlichte Werte für dieses Gerät, keine Juxi-Messungen. Schwerere
  Workloads zeigen einen Strich („–“): FoundationPose, Grounding DINO und
  vollständiges SAM sind nicht als lauffähig aufgeführt.
- **Isaac ROS 5.0.0 (2026-09-21)** wechselte zu ROS 2 Lyrical Luth. Das
  öffentliche ROS-2-apt-Repository bietet keine ROS-2-Lyrical-Pakete für
  Ubuntu 24.04; NVIDIA veröffentlicht sie auf seinem eigenen Isaac-ROS-
  Buildfarm-CDN. Isaac ROS 4.6 bleibt bei ROS 2 Jazzy. Wählen Sie 4.6 für den
  gängigen Jazzy-Stack.

**Lücken, die Sie vor einer Festlegung kennen sollten:**

- **Kein Orin-Nano-Setup-Abschnitt.** Die Jetson-Walkthroughs decken nur
  Jetson AGX Thor und Jetson AGX Orin ab; der einzige für Orin Nano relevante
  Link ist der Leitfaden zu den Leistungseinstellungen.
- **Eine NVMe-SSD wird erwartet.** Die Speicher-Spalte sagt „128+ GB NVMe
  SSD“. Dieses Kit wird ganz ohne Speicher ausgeliefert, ein reines
  microSD-Setup liegt also außerhalb der genannten Erwartung (siehe
  [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)).
- **Versionsversatz.** Die Setup-Seiten zu 4.6 bitten Sie, „R39 (release),
  REVISION: 2.0“ (L4T r39.2.0) aus `cat /etc/nv_tegra_release` zu bestätigen;
  dieses Kit liefert JetPack 7.2.1 = L4T r39.2.1. Validieren Sie in Docker,
  bevor Sie einen Produktionsroboter migrieren.
- **Kameras und OpenCV.** Intel-RealSense-Kameras werden „nur im Docker-Modus
  unterstützt. Virtual-Environment- und Bare-Metal-Modi werden nicht
  unterstützt.“ JetPack 7.2 installiert außerdem OpenCV 4.8.0, während Isaac
  ROS mit 4.6.0 getestet wird — die Lösung steht in den Installationsschritten
  unten.
- **Eine Regression in 5.0.** In Isaac ROS 5.0 kann der DNN-Bildencoder einen
  geringeren Durchsatz haben als in 4.6. Wenn dieser Node wichtig ist, ziehen
  Sie 4.6 in Betracht.

> **Wichtig**: Wenn Isaac ROS auf Ihrem kritischen Pfad liegt, wägen Sie den
> Zeitpunkt ab. Die Unterstützung unter JetPack 7.2 ist real, aber neu (August
> 2026), und die Orin-Nano-Dokumentation ist dünn. Dieses Kit war bereits in
> der JetPack-6.2-Ära ein unterstütztes Isaac-ROS-Ziel (Isaac ROS 3.2 Update 1,
> Januar 2025). Ein Team, das die am längsten etablierte Kombination braucht
> und Erst-Release-Turbulenzen nicht verkraftet, hat gute Gründe, bei einem
> Setup der JetPack-6.2-Ära zu bleiben. Alle anderen: Wechseln Sie auf 7.2.1,
> aber validieren Sie Ihre konkrete Pipeline in Docker auf diesem Kit, bevor
> Sie sich festlegen.

## Simulation und Training — eine andere Maschine

Isaac Sim 6.0 kann auf diesem Kit nicht laufen. Veröffentlichte
Mindestanforderungen für den Linux-x86_64-Weg: GeForce RTX 4080, 16 GB VRAM,
32 GB RAM, 50 GB SSD. „GPUs ohne RT-Cores (A100, H100) werden nicht
unterstützt.“ Der aarch64-Build „wird derzeit nur auf dem DGX-Spark-System
unterstützt.“ In Isaac-ROS-Simulations-Workflows „läuft Isaac Sim auf einer
x86_64-Maschine, die Sensordaten und Weltinformationen bereitstellt“ — das
Jetson ist das Deployment-Ziel.

Bei den anspruchsvollsten Robotik-Lern-Workloads ist die Aufteilung dieselbe:
Das Post-Training von GR00T 1.7 benötigt mindestens 48 GB VRAM, und NVIDIAs
Referenz-Workflow nutzt einen Jetson AGX Thor als Edge-Computer für den echten
Roboter. Die Regel: Simulieren und trainieren Sie auf einem PC, deployen und
inferieren Sie auf dem Kit. Wenn Isaac Sim Ihr Grund war, einen Orin Nano in
Betracht zu ziehen, ist er die falsche Maschine für diese Aufgabe.

## LeRobot und Python-Robotik-Stacks — die Kompatibilitätsfrage

1. **Die Python-Versionsfrage hat eine klare Antwort: 3.12 ist in Ordnung.**
   Das System-Python von Ubuntu 24.04 ist 3.12.3, und LeRobot (0.6.2) erfordert
   Python 3.12 oder neuer. Das Upgrade blockiert LeRobot nicht aus
   Python-Versionsgründen.
2. **Aber Upstream hat keinen JetPack-7.2-Weg.** LeRobots offizielle
   Installationsseite stellt fest, dass es auf Jetson standardmäßig keine
   GPU-beschleunigte Videodekodierung gibt (die Bibliothek fällt auf pyav
   zurück), dass aarch64-torchcodec-Wheels PyTorch 2.11 oder neuer benötigen
   und dass sein Jetson-Docker-Build auf **JetPack 6.2** abzielt und von der
   Community gepflegt wird. Keine offizielle Aussage besagt, dass aktuelles
   LeRobot fertige aarch64-CUDA-Wheels für CUDA 13 von JetPack 7.2 hat.
3. **Also: „benötigt Verifikation“ — nicht „unterstützt“, nicht „kaputt“.**
   Bevor Sie auf diesem Kit um LeRobot herum planen, testen Sie Ihren konkreten
   Stack: Installieren Sie ihn, führen Sie eine kleine Policy aus und
   bestätigen Sie, dass die Inferenz die GPU nutzt.

> **Juxi-Hinweis:** Unsere Roboterkits (SO-ARM101, LeKiwi, Vision Kit)
> basieren auf LeRobot. Auf diesem Kit unter JetPack 7.2.1 existiert noch kein
> getesteter Weg — weder von Upstream noch von Juxi. JetPack 6.2 ist die
> Referenzplattform für die von der Community gepflegte Route. Klären Sie mit
> dem Juxi-Support (siehe
> [Downloads](/de/tutorials/jetson-orin-nano/downloads)), bevor Sie einen
> Projektzeitplan für LeRobot auf diesem Kit festlegen.

## Was heute läuft

### ROS 2 Jazzy — das Fundament

JetPack enthält ROS nicht. Der funktionierende Weg ist die offizielle
ROS-2-Jazzy-deb-Installation für Ubuntu 24.04 (arm64), zusammengefasst aus der
ROS-2-Dokumentation:

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

### Isaac ROS 4.6 — wenn Sie beschleunigte Wahrnehmung brauchen

Installieren Sie aus NVIDIAs apt-Repository (die offizielle Seite listet die
genauen Keyring-Befehle): Repository
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, Kanal
`noble-jetpack`; China-Spiegel `isaac.download.nvidia.cn`. Dann:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Entfernen Sie das vorinstallierte OpenCV 4.8.0 einmalig (siehe die
Lückenliste oben); Isaac ROS installiert dann automatisch sein gepinntes
OpenCV 4.6.0:

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA empfiehlt Docker: „Docker ist die empfohlene Option für die meisten
Nutzer. Es bietet die höchste Isolierung von Ihrem Host-System.“ Das entspricht
auch der Anforderung für RealSense-Kameras (nur Docker).

### NemoClaw und der agentische Stack

Der Installer erkennt NVIDIA-Jetson-Geräte automatisch (Orin und Thor) und
wendet die JetPack-spezifische Host-Konfiguration an. Zwei Einschränkungen:
Das Projekt ist Alpha („Early preview“), und seine offizielle Plattformmatrix
hat keine Jetson-Zeile — die Unterstützung ist also de facto, keine offizielle
Zusage. 8 GB ist der angegebene RAM-Mindestwert (16 GB empfohlen), mit einem
dokumentierten Out-of-Memory-Risiko rund um das etwa 2,4 GB große
Sandbox-Image. Siehe [Agentische KI](/de/tutorials/jetson-orin-nano/agentic-ai).

## Empfehlung

- **Nur ROS 2:** Setzen Sie heute auf JetPack 7.2.1 mit ROS 2 Jazzy. Das
  funktioniert.
- **Isaac ROS im kritischen Pfad:** Seit August 2026 unterstützt, aber neu,
  mit dünner Orin-Nano-Dokumentation. Validieren Sie in Docker; planen Sie
  eine NVMe ein. Wenn Sie die am längsten etablierte Kombination brauchen,
  bleibt ein Setup der JetPack-6.2-Ära vertretbar — die Kosten des Neuaufbaus
  in beide Richtungen zeigt der
  [Migrationsleitfaden](/de/tutorials/jetson-orin-nano/jetpack-6-to-7).
- **Braucht Simulation oder Training:** Planen Sie einen separaten RTX-PC
  (Isaac Sim) und ein Gerät der Thor-Klasse für GR00T-Arbeiten ein. Dieses Kit
  kann beides nicht leisten.
- **Basiert auf LeRobot:** Benötigt Verifikation. Erst testen; JetPack 6.2 ist
  die Referenz für die dokumentierte Route.
- **Kaufen Sie dieses Kit nicht für:** Isaac Sim, GR00T-Post-Training oder
  Echtzeit-Workloads der Klasse vollständiges SAM, Grounding DINO oder
  FoundationPose — die letzten drei sind in NVIDIAs Benchmark-Tabelle für
  dieses Gerät nicht als lauffähig aufgeführt.

## Weiterhin unklar

- **micro-ROS:** Keine offizielle Jetson-spezifische Seite gefunden (zwei
  offizielle micro.ros.org-URLs liefern heute 404). Behandeln Sie die
  Kombination als unverifiziert.
- **ROS-Distribution nach Isaac ROS 5.0:** Die Forum-Antwort, die Jazzy
  empfiehlt, ist älter als 5.0 (2026-09-21); keine Aussage nach 5.0 gefunden.
- **LeRobot auf JetPack 7.2:** Keine offizielle Aussage; prüfen Sie die
  Verfügbarkeit von PyTorch-aarch64-Wheels für CUDA 13, bevor Sie sich
  festlegen.
- **Reine microSD-Setups mit Isaac ROS:** Die Support-Tabelle sagt NVMe, aber
  das wird für Orin Nano nicht ausdrücklich wiederholt.
- **„Jetson Orin“ vs. „Orin Nano“:** Die Plattformtabelle verwendet den
  Familiennamen; „Orin Nano Super 8GB“ erscheint nur in der Benchmark-Tabelle.
  Nicht geklärt, ob NVIDIA diese als getrennte Support-Zusagen behandelt.
- **DeepStream und TensorRT Edge-LLM:** In dieser Robotik-Überprüfung nicht
  erneut verifiziert — siehe deren eigene Seiten.

## Quellen

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (unterstützte Plattformen, Docker, ROS 2 Lyrical; geprüft am 2026-09-26)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (Jazzy-Paarung, apt-Installation, OpenCV-Hinweis; geprüft am 2026-09-26)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim auf x86_64; geprüft am 2026-09-26)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (Notizen zu 4.6.0 und 5.0.0; RealSense- und DNN-Encoder-Einschränkungen; geprüft am 2026-09-26)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (Benchmark-Spalte Orin Nano Super 8GB; geprüft am 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (ROS-2-Lyrical-Pakete für Ubuntu 24.04; geprüft am 2026-09-26)
- [Isaac Sim 6.0 installation requirements](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (geprüft am 2026-09-26)
- [GR00T End-to-End-Workflow — Voraussetzungen](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (geprüft am 2026-09-26)
- [NVIDIA Developer Forum — „Is ROS2 Jazzy the correct version…“ (Mitarbeiter-Antwort; Forum, keine offizielle Doku)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (geprüft am 2026-09-26)
- [ROS 2 Jazzy installation — deb packages (Upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (geprüft am 2026-09-26)
- [ROS 2 Jazzy installation — apt repositories (Upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (geprüft am 2026-09-26)
- [LeRobot installation guide (Upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (geprüft am 2026-09-26)
- [LeRobot pyproject.toml (Upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (Python- und torchcodec-Pins; geprüft am 2026-09-26)
- [Ubuntu Noble — python3-Paket](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; geprüft am 2026-09-26)
- [NemoClaw — Voraussetzungen](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (geprüft am 2026-09-26)
- [NemoClaw — Plattform-Support-Matrix](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (Alpha-Stadium; keine Jetson-Zeile; geprüft am 2026-09-26)
- [NemoClaw — Installer-Fehlerbehebung (Jetson-Auto-Erkennung)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (geprüft am 2026-09-26)
- [NVIDIA — Build a Claw („Install OpenClaw on Your NVIDIA Jetson Orin Nano™“)](https://www.nvidia.com/en-us/ai/build-a-claw/) (geprüft am 2026-09-26)
- [JetPack 7.2.1 Downloadseite (Komponentenmatrix führt Isaac ROS als „Coming soon“)](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)

*Status: Entwurf, Überprüfung durch cheny steht aus. Die Verfügbarkeit im
Ökosystem ändert sich schnell — prüfen Sie die verlinkten NVIDIA- und
Upstream-Seiten erneut, bevor Sie sich auf diese Tabelle verlassen. Noch nicht
auf physischer Hardware durch Juxi Technology verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
