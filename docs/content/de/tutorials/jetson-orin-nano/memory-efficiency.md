---
title: Speichereffizienz — Modelle in 8 GB ausführen
sidebar_label: Speichereffizienz
slug: /tutorials/memory-efficiency
description: >-
  Die dokumentierten Hebel, um LLM-, VLM- und Vision-Workloads in die 8 GB
  Unified Memory des Jetson Orin Nano Super Developer Kit zu bringen —
  Plattform, Modell und Messung.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# Speichereffizienz — Modelle in 8 GB ausführen

Auf dem Orin Nano Super Kit sind die 8 GB Unified Memory eine harte Grenze für
alles: das Betriebssystem, den Desktop, die Dienste und das Modell selbst. Die
dokumentierten Hebel kommen in drei Ebenen — **Plattform**, **Modell** und
**Messung** —, und diese Seite vermerkt, wo eine Technik nur für ein größeres
Modul dokumentiert ist.

## Das 8-GB-Budget in klaren Zahlen

- Nach Firmware- und Kernel-Reservierungen sind **rund 7,6 GB der 8 GB nutzbar**
  — das Budget, das NVIDIAs Speichereffizienz-Blog für alle seine
  „verfügbarer Speicher“-Angaben verwendet.
- CPU-Speicher und GPU-Speicher (CUDA, Multimedia-Puffer) stammen aus dem
  **selben physischen Pool**; das Reduzieren des einen hilft dem anderen.
- Die Vorzeige-Demo des Blogs — eine VLM-Pipeline mit 2B Parametern — läuft bei
  **4,5 / 7,6 GB (~60 %)**.

## Hebel 1 — Plattformebene: was das Betriebssystem und die Dienste belegen

Die folgenden Einsparungen stammen aus NVIDIAs Speichereffizienz-Blog.

| Hebel | Dokumentierte Einsparung | Wie |
|---|---|---|
| Grafischen Desktop deaktivieren (Headless) | Bis zu 865 MB | `sudo systemctl set-default multi-user.target` |
| Netzwerk- und Journaling-Dienste deaktivieren | Bis zu 32 MB | `sudo systemctl disable <service-name>` |
| Display- und Kamera-Carveouts | Etwa 100 MB insgesamt | BSP-Device-Tree-Anpassung, dann neu flashen |
| SWIOTLB-Reservierung | Etwa 4 MB | Kernel-Argument `swiotlb=2048`, nur wenn DMA-Probleme auftreten |
| DeepStream-artige Pipeline | Bis zu 412 MB | Container zu Bare Metal (70 MB); Python zu C++ (84 MB); Tiler/OSD deaktivieren und FakeSink verwenden (258 MB) — siehe [DeepStream](/de/tutorials/jetson-orin-nano/deepstream) |
| Wahl des Inferenz-Frameworks | Vermeiden Sie >2,7 GB Overhead | Schlanke Runtimes (C++-Runtime, llama.cpp); ein schwereres Framework kann allein bei der Initialisierung über 2,7 GB hinzufügen |

> **Juxi-Hinweis:** Carveout-Anpassungen sind BSP-Quellcodeänderungen: Sie
> erfordern ein erneutes Flashen und sparen wenig. Ändern Sie jeweils nur eine
> Sache und behalten Sie ein funktionierendes Flash-Abbild — siehe
> [Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates).

**Swap ist keine Einsparung, sondern ein Überdruckventil.** Das
RAM-Optimierungs-Tutorial des Anbieters ersetzt ZRAM durch eine **16 GB große
Swap-Datei auf NVMe** (`sudo systemctl disable nvzramconfig` zuerst); NVIDIAs
8-GB-Demo ging von rund **2 GB Swap-Nutzung zu Spitzenzeiten** aus.

### Nach dem Stoppen eines Servers den Cache freigeben

Die Speichernutzung kann hoch bleiben, nachdem Sie einen vLLM- oder
SGLang-Server oder einen Docker-Container gestoppt haben (bekanntes Problem
5661165 in L4T r39.2.1). NVIDIAs Befehl:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

Dieselbe Abhilfe gilt, wenn einem Edge-LLM-Engine-Build der Speicher ausgeht:
`sudo sysctl -w vm.drop_caches=3` plus kleinere Build-Limits (Anbieter-Tutorial).

### Leistungsmodi ändern Taktraten, nicht die Kapazität

| Leistungsmodus | Modus-ID | CPU-Max.-Takt | GPU-Max.-Takt | Speicher-Max.-Takt |
|---|---|---|---|---|
| 15W | 0 | 1497,6 MHz | 612 MHz | 2133 MHz |
| 25W (Standard) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

Die obigen Takt-Maxima stammen aus NVIDIAs Tabellen zu Leistungsaufnahme und
Performance für r39.2. Leistungsmodi ändern die Taktfrequenzen, nicht die
Speichergröße — ein Modell, das nicht passt, passt auch in einem schnelleren
Modus nicht. Umschalten mit `sudo nvpmodel -q` (auflisten) und
`sudo nvpmodel -m <mode_id>`; MAXN_SUPER erfordert die Super-Flash-Konfiguration
und ist experimentell (laut diesen Tabellen). Wenn 25W oder MAXN SUPER fehlt,
siehe [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

> **Achtung:** Eine übermäßig große CUDA-Speicherallokation kann **das Gerät
> neu starten** (bekanntes Problem 5699079 in L4T r39.2.1). Die Empfehlung in
> denselben Release Notes: Stellen Sie sicher, dass CUDA und andere Anwendungen
> nicht mehr Speicher anfordern, als physisch verfügbar ist, und starten Sie
> CUDA-Prozesse mit höheren OOM-Scores, damit Systemprozesse nicht beendet
> werden.

## Hebel 2 — Modellebene: was das Modell und sein Cache belegen

### Quantisierung ist der größte einzelne Hebel

Orin führt **nur FP16-, INT8- und INT4-Engines aus**; FP8 und FP4 laufen nicht
auf Orin (Thor-/Blackwell-Klasse). Verwenden Sie für TensorRT Edge-LLM
**INT4 AWQ- oder INT4 GPTQ**-Checkpoints, vermeiden Sie INT8 GPTQ und wählen
Sie niemals FP8-, MXFP8-, FP4- oder NVFP4-Checkpoints. Siehe
[Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm).

NVIDIA-eigene Zahlen: Qwen3 8B von FP16 auf W4A16 holt rund **10 GB** zurück;
Qwen3 4B von BF16 auf INT4 holt rund **5,6 GB** zurück. NVIDIAs Diagramm für
den 4B-Fall trägt die Beschriftung „Jetson Orin NX 16 GB“ — ein größeres Modul;
betrachten Sie die Zahlen daher als Referenz, nicht als Zusage für 8 GB.

Mit 4-Bit-Quantisierung und einer effizienten Runtime liegt NVIDIAs
dokumentierter Rahmen für dieses Budget bei **LLMs bis ~10B Parameter und VLMs
bis ~4B Parameter**.

### Was NVIDIA tatsächlich auf 8 GB benchmarkt

TensorRT Edge-LLM veröffentlicht Orin-Nano-8-GB-Zeilen für Modelle von 0,6B bis
2B Parametern (Qwen3- und Qwen3.5-Familien); **2B ist das größte Modell, das
NVIDIA auf diesem Modul benchmarkt**. Ein 4B-INT4-AWQ-Walkthrough existiert als
Anbieter-Tutorial (rund 2 GB Gewichte), aber es sind keine offiziellen
4B-Zahlen veröffentlicht.

### Speicherbedarf beim Engine-Build (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (dense) oder `--externalize-weights
  int4_ffn int4_moe` (MoE) reduziert den Speicherbedarf beim Engine-Build auf
  Orin-Geräten mit wenig Systemspeicher.
- Auf Orin Nano abgestimmte Limits aus dem Anbieter-Tutorial:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  Wenn dem Build weiterhin der Speicher ausgeht, geben Sie zuerst Systemspeicher
  frei und reduzieren Sie weiter, zum Beispiel
  `--maxInputLen 256 --maxKVCacheCapacity 512`.
  Engines werden auf dem Gerät gebaut und sind nicht zwischen Modulen
  übertragbar.

### KV-Cache: Dimensionierung und Wiederverwendung

Der KV-Cache wächst mit Kontextlänge, Batch-Größe und Parallelität; er ist
Teil des Speicherbudgets, kein Nachgedanke.

- Build-Limits begrenzen ihn: `--maxInputLen` und `--maxKVCacheCapacity`; die
  Orin-Nano-Benchmark-Builds verwendeten maxInputLen 2048 und
  maxKVCacheCapacity 2200, Batch 1.
- Die **KV-Cache-Wiederverwendung** ist eine dokumentierte Runtime-Fähigkeit von
  Edge-LLM: ein prozesslokaler, inhaltsadressierter Cache für wiederholte
  Eingabe-Präfixe, sodass Prefill-Zustand aus Dokumenten, vorherigen Turns,
  generierten Fortsetzungen und wiederholten Bild-Präfixen wiederverwendet
  statt neu berechnet wird.
- Eine Modelldatei, die passt, kann trotzdem scheitern: Ein Community-Bericht
  zeigt 7,4 GB und 16 GB große GGUF-Dateien, die auf einem 8-GB-Board mit einem
  KV-Cache-Allokationsfehler scheitern — rechnen Sie KV-Cache und
  Runtime-Overhead hinzu, wenn Sie prüfen, ob es passt.
- **Vokabularreduktion** (die Generierung wird auf eine aufgabenbezogene
  Token-Teilmenge beschränkt) und **Visual-Token-Pruning (DART)** (duplizierte
  Bild-Tokens werden vor dem Prefill verworfen) sind dokumentierte
  Edge-LLM-Funktionsseiten. Der visuelle Engine-Build kennt zusätzlich
  Bild-Token-Limits: `--minImageTokens`, `--maxImageTokens`,
  `--maxImageTokensPerImage`.

> **Wichtig:** Der FP8-KV-Cache — die Einsparung von ~50 % KV-Cache-Speicher —
> erfordert SM89 oder neuer (Ada Lovelace und höher). Orin ist SM87, daher ist
> er **auf diesem Kit nicht verfügbar**. Verwenden Sie FP16-KV-Cache.

### Ein Vorher/Nachher von NVIDIA selbst

NVIDIAs 8-GB-Fallstudie (Speichereffizienz-Blog, Tabelle 7): Headless-Modus
statt des vollen GNOME-Desktops (1,8 GB → 1,1 GB) plus ein 4-Bit-GGUF-VLM
(Q4_K_M, 6,6 GB → 2,2 GB). Die Pipeline lief zuvor nicht auf dem Orin Nano
8 GB (allein das VLM belegte 87 % des RAM) und läuft jetzt bei
**4,5 / 7,6 GB (~60 %)** — über 5,1 GB gespart. Die Spalte „Vorher“ bezieht
sich auf **Orin NX 16 GB**: Dieselben Optimierungen verlagerten den Workload
auf das 8-GB-Kit.

## Hebel 3 — Messebene: sehen, wohin der Speicher fließt

| Werkzeug | Zeigt | Hinweis |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, Speicher, Temperatur, Leistungsaufnahme | Das Dev-Kit-Benutzerhandbuch: nvidia-smi ist auf Jetson nicht das primäre Überwachungswerkzeug |
| `nvidia-smi dmon` | GPU-Auslastung | Laut Release-Notes-Eintrag 5406663; die GPU-Auslastung in der Jetson Power GUI „wird noch bewertet“ |
| `free -h` | Die Betriebssystem-Sicht auf den Speicher | Sagt Ihnen nicht, was ein GPU-Workload allozieren kann |
| procrank | Physischer Speicher pro Prozess (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| nvmap clients | Prozesse, die GPU-/Multimedia-Puffer halten | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### „Freier Speicher“ ist nicht das Budget

`free -h` zeigt die offene Systemsicht; GPU-Allokationen stammen aus demselben
Pool, werden aber getrennt verbucht. In einem Community-Bericht über ein
8-GB-Board schlug `cudaMalloc` für den KV-Cache fehl, während `free -h` noch
5,7 GiB als „frei“ anzeigte [Einstufung B, Community-Bericht]. Beurteilen Sie den Fit
am Budget von ~7,6 GB, nicht an „frei“.

### Vorgehen

1. Bestätigen Sie zuerst die Plattform-Grundlagen —
   [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system).
2. Zeichnen Sie eine Baseline auf: Speicher im Leerlauf, dann unter Last
   (`tegrastats`).
3. Ändern Sie einen Hebel, messen Sie erneut. Wenn sich nichts bewegt hat,
   nehmen Sie die Änderung zurück.

## Wo Sie beginnen sollten

Nach der dokumentierten Größe des Erfolgs:

1. **Runtime und Quantisierung** — die größte Ebene in NVIDIAs Zusammenfassung
   (etwa 5–10 GB für Inferenz-Frameworks und Modellquantisierung, laut
   Tabelle 5 des Blogs).
2. **Headless** — bis zu ~865 MB, ein einziger Befehl.
3. **Pipeline-Tuning** — bis zu ~412 MB (DeepStream-artig).
4. **Swap auf NVMe** — Druckentlastung, keine Einsparung.
5. **Carveouts und SWIOTLB** — etwa 100 MB und 4 MB, plus erneutes Flashen.
   Zuletzt.

Wenn ein Modell immer noch nicht passt, ist das Modell das Problem, nicht die
Einstellungen: Gehen Sie kleiner, quantisieren Sie stärker, kürzen Sie den
Kontext oder reduzieren Sie den Batch — siehe
[Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm) und die
[FAQ](/de/tutorials/jetson-orin-nano/faq).

## Quellen

- [NVIDIA Technical Blog — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (7,6-GB-Budget, Desktop 865 MB, Netzwerk/Journaling 32 MB, Carveouts, SWIOTLB, Pipeline-Einsparungen, Quantisierungs- und Vorher/Nachher-Tabellen, procrank-Installationsschritte und nvmap-Clients; geprüft am 2026-09-26)
- TensorRT Edge-LLM-Doku: [Unterstützte Modelle](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8-KV-Cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Leistungs-Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start Guide](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · Funktionsseiten: [KV-Cache-Wiederverwendung](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Vokabularreduktion](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [Visual-Token-Pruning (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (geprüft am 2026-09-26)
- Jetson-Linux-Doku: [Release Notes zu r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (bekannte Probleme 5661165, 5699079, 5406663) · [Power and Performance, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Dev Kit How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (geprüft am 2026-09-26)
- Jetson AI Lab: [TensorRT-Edge-LLM-Tutorial](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [RAM-Optimierung](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (Orin-Nano-Build-Limits; NVMe-Swap; geprüft am 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (Community: free -h vs. cudaMalloc; Einstufung B; geprüft am 2026-09-26)

*Status: geprüft am 2026-10-11. Basiert auf der
offiziellen NVIDIA-Dokumentation zum angegebenen Datum; noch nicht von Juxi
Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
