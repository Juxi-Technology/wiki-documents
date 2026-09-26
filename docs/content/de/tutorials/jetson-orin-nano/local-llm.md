---
title: LLMs lokal ausführen — TensorRT Edge-LLM auf dem 8-GB-Orin-Nano
sidebar_label: Lokale LLM-Inferenz
slug: /tutorials/local-llm
description: >-
  Große Sprachmodelle lokal auf dem 8-GB-Jetson Orin Nano ausführen —
  TensorRT Edge-LLM-Unterstützung, Präzisionsgrenzen, was hineinpasst, und
  offizielle Werte.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# LLMs lokal ausführen — TensorRT Edge-LLM auf dem 8-GB-Orin-Nano

Ihr Jetson Orin Nano Super Developer Kit (8 GB) kann Sprachmodelle lokal
ausführen. Der optimierte Weg von NVIDIA dafür ist **TensorRT Edge-LLM**, das
**Jetson Orin auf der JetPack-7.2-Linie offiziell unterstützt**. Diese Seite
behandelt, was in 8 GB passt und welche Runtimes heute funktionieren; die
Anleitungen finden Sie in NVIDIAs Dokumentation (unten verlinkt).

## Zuerst lesen — vier Einschränkungen für dieses Kit

1. **Orin führt nur FP16-, INT8- und INT4-Engines aus. FP8- und FP4-Engines
   laufen auf diesem Gerät nicht** — sie sind Fähigkeiten der
   Thor-/Blackwell-Klasse („Jetson Orin führt keine FP8- oder FP4-Modell-Engines
   aus“ — Support-Matrix).
2. **Die Engines werden auf dem Gerät gebaut** (von der C++-Runtime). ONNX-Export
   und Quantisierung laufen auf einem x86-64-Linux-Host — nicht auf Orin.
   Engines sind SM-exakt: Eine auf Thor (SM110) gebaute Engine lädt nicht auf
   dem Orin Nano (sm_87).
3. **JetPack 7.2.1 (L4T r39.2.1) ist der unterstützte Stack** — CUDA 13.2.2,
   TensorRT 10.16.2. Edge-LLM nutzt das TensorRT dieser Plattform aus JetPack.
4. **Die 8 GB Unified Memory werden mit dem Betriebssystem und dem Desktop
   geteilt.** Rund 7,6 GB sind nutzbar. Die Modellgröße — nicht TOPS — ist die
   maßgebliche Einschränkung, und der KV-Cache muss in denselben Speicher passen.

> **Wichtig:** Wählen Sie für dieses Kit **INT4 AWQ**- oder **INT4
> GPTQ**-Checkpoints. Wählen Sie keine FP8-, MXFP8-, FP4- oder
> NVFP4-Checkpoints. INT8 GPTQ wird nicht unterstützt.

## Was TensorRT Edge-LLM abdeckt

TensorRT Edge-LLM ist NVIDIAs offizielle Runtime für LLMs und VLMs auf
Edge-Plattformen. Die Support-Matrix führt Jetson Orin für JetPack 7.2 als
„Official“ — mit Engines, die auf dem Gerät gebaut werden, und den Präzisionen
FP16, INT8 und INT4.

- **Modellabdeckung:** Zu den unterstützten Checkpoints gehören Llama 3.2 1B/3B,
  Llama 3.1 8B, Qwen2.5 (0.5B–14B), Qwen3 (0.6B–8B) sowie VLMs wie
  Qwen2.5-VL 3B/7B und InternVL3/3.5 (1B–14B) — dichte Checkpoints unter 30B
  Parametern. Es ist keine Verifikationsmatrix: „Nicht jeder aufgeführte
  Checkpoint wurde auf jeder unterstützten Plattform und Präzision vollständig
  verifiziert.“
- **Das 8-GB-Build-Flag:** Übergeben Sie für INT4-Engine-Builds auf dem Orin Nano
  `--externalize-weights int4_ffn` (dense) oder `--externalize-weights
  int4_ffn int4_moe` (MoE), um den Speicherbedarf beim Engine-Build zu
  reduzieren.
- **Speicherplatz:** Planen Sie rund 20–50 GB pro Modell-Workflow für
  ONNX-Dateien und Engines ein; dieses Kit hat keinen integrierten Speicher
  ([Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)).
- **Zwei Quick-Start-Wege:** ein C++-Weg (Export/Quantisierung auf einem Host,
  Engines auf dem Gerät bauen, ausführen) und ein Server-Weg —
  `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B` (lädt den Checkpoint beim ersten
  Start herunter).

> **Juxi-Tipp:** Die maßgeblichen Schritte stammen von NVIDIA —
> [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> Die Installationsseite zu 0.10.1 stellt fest: „Wheels werden in 0.10.1 weder
> veröffentlicht noch sind sie der Standard-Installationsweg.“

## Was tatsächlich in 8 GB passt

- **Bis zu 2B Parameter hat NVIDIA auf diesem Modul gebenchmarkt.** Die größte
  Orin-Nano-Zeile (8GB) auf der Edge-LLM-Benchmark-Seite ist Qwen3.5-2B mit
  4.692 MB: „2B ist das größte Modell, das NVIDIA auf dem Orin Nano 8 GB
  gebenchmarkt hat.“
- **Ein Anbieter-Walkthrough führt ein 4B-Modell aus.** Das
  Jetson-AI-Lab-Tutorial berichtet, dass Qwen3-4B-Instruct INT4 AWQ (~2 GB
  Gewichte) „innerhalb der 8 GB Unified Memory des Orin Nano“ passt;
  InternVL3 1B/2B passen ebenfalls mit INT4 AWQ, während größere Varianten auf
  AGX Orin oder Thor zielen. (Anbieter-Inhalt.)
- **Ein praktischer Rahmen aus NVIDIAs Speicher-Blog: LLMs bis ~10B und VLMs bis
  ~4B Parameter** mit 4-Bit-Quantisierung und effizienten Runtimes — für
  optimierte Setups.
- **Die Dateigröße ist nicht der Fit-Test — der KV-Cache muss ebenfalls
  passen.** Community-Berichte zeigen GGUF-Modelle der 12B-/26B-Klasse
  (gemma4:12b mit 7,4 GB, gemma4:26b mit 16 GB), die in Ollama auf dem
  8-GB-Board scheitern: `cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache`. (Unbestätigt.)

## Offizielle Leistungswerte für dieses Kit

NVIDIA veröffentlicht Benchmark-Tabellen für **Jetson Orin Nano (8GB)** —
v0.10.0, JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Laufzeitergebnisse auf
MTBench (LLMs) und COCO (VLMs), mit GPU-Spitzenspeicher:

| Modell | Typ | Durchsatz | GPU-Spitzenspeicher |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77,0 Tok/s | 1.917 MB |
| Qwen3-1.7B | LLM | 36,5 Tok/s | 2.992 MB |
| Qwen3-VL-2B | VLM | 36,1 Tok/s | 4.486 MB |
| Qwen3.5-0.8B | LLM | 59,1 Tok/s | 2.127 MB |
| Qwen3.5-0.8B | VLM | 59,0 Tok/s | 2.760 MB |
| Qwen3.5-2B | LLM | 29,6 Tok/s | 3.642 MB |
| Qwen3.5-2B | VLM | 29,6 Tok/s | 4.692 MB |

Die Orin-Zeilen verwenden Batch 1 und externalisierte INT4-Gewichte;
Build-Limits: maxInputLen 2048, maxKVCacheCapacity 2200. „Die
Produktionsleistung kann je nach System-Tuning variieren (Leistungsmodus,
Speicherkonfiguration, Wärmemanagement).“

> **Wichtig:** NVIDIAs veröffentlichte Token/s-Tabellen für den **AGX Orin
> 64 GB** gelten **nicht** für dieses Kit — anderes Modul, andere
> Speicherbandbreite, andere Leistungsaufnahme. Leiten Sie Orin-Nano-Werte
> nicht aus AGX-Orin-Werten ab. Für die Ollama- oder llama.cpp-Wege gibt es hier
> keine NVIDIA-eigenen Zahlen.

## Andere Runtimes auf diesem Kit

### Ollama

Aktueller Stand, von NVIDIA-Mitarbeitern in den Entwicklerforen für JetPack
7.2.1 verifiziert (September 2026): Der Standard-Installer funktioniert —
`curl -fsSL https://ollama.com/install.sh | sh` — und `ollama ps` sollte
`100% GPU` melden. Die Warnung „Unsupported JetPack version detected“ ist
harmlos.

Ältere Builds fielen auf die CPU zurück, weil ihre vorkompilierten CUDA-Bibliotheken
sm_87 nicht enthielten, die Compute-Capability von Orin; Community-Berichte
deuten auf Ollama 0.30.11 hin, das „CC 87 for CUDA v13“ ergänzt, und
NVIDIA-Mitarbeiter bestätigten den Fix. Einige Community-Störungsmeldungen
bestehen weiter (August–September 2026) — prüfen Sie `ollama ps` auf Ihrer
Einheit; der Quellcode-Build mit CUDA v13 bleibt der Rückfallweg.

### Python-Wheels für JetPack 7.2

CUDA-fähige Python-Pakete (PyTorch und andere) für JetPack 7.2 / CUDA 13.2
stammen aus dem SBSA-Index des Jetson AI Lab, den NVIDIA-Mitarbeiter nennen:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Verwenden Sie ihn als pip-Index (`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
Er liefert aarch64-Wheels wie torch 2.11.0, torchvision 0.25.0 und
vllm 0.20.0+cu130. Es gibt keinen `jp7/*`-Index; der Index der JetPack-6-Ära
ist `jp6/cu126`. CUDA 13.2 vereinheitlicht Orin auf das Arm-SBSA-Toolkit
(Treiber R595+).

### jetson-containers und Jetson AI Lab (alternativer Weg)

[jetson-containers](https://github.com/dusty-nv/jetson-containers) unterstützt
JetPack 6.2 (CUDA 12.6) und JetPack 7 (CUDA 13.x). Für die wichtigsten
Serving-Wege existieren vorgebaute `-jetson-orin`-Images, darunter
`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` und
`ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

8-GB-Warnhinweise aus dem Anbieter-Material: Das vLLM-Beispiel verwendet
`--shm-size=16g` (hier keine Größenempfehlung), und das empfohlene Setup
verlegt das Docker-Datenverzeichnis auf NVMe und ergänzt eine 16 GB große
Swap-Datei (ZRAM zuerst deaktivieren).

## Optimierung für 8 GB

Wenn ein Modell nicht passt: Geben Sie Plattformspeicher frei (der
Headless-Modus gewinnt bis zu ~865 MB zurück), quantisieren Sie auf 4 Bit und
dimensionieren Sie KV-Cache und Kontext bewusst — siehe
[Speichereffizienz für 8 GB](/de/tutorials/jetson-orin-nano/memory-efficiency).

## Fehlerbehebung

- **Speicher voll beim Laden** — `cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache` bedeutet, dass Modell plus KV-Cache die 8 GB
  Unified Memory überschreiten. Verwenden Sie ein kleineres oder stärker
  quantisiertes Modell oder kürzen Sie den Kontext; ergänzen Sie bei
  Edge-LLM-Engine-Builds `--externalize-weights int4_ffn` und reduzieren Sie
  `--maxInputLen` / `--maxKVCacheCapacity`.
- **Ollama-CPU-Fallback oder die Warnung „Unsupported JetPack version
  detected“** — aktualisieren Sie zuerst Ollama (ältere Builds enthielten sm_87
  nicht); laut NVIDIA-Mitarbeitern ist die Warnung auf 7.2.1 harmlos.
  Bestätigen Sie mit `ollama ps` (`100% GPU`).
- **Versions- oder Setup-Probleme** — siehe
  [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system) und
  [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

## Quellen

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Support-Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Unterstützte Modelle](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Leistungs-Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (geprüft am 2026-09-26)
- [JetPack 7.2.1 Downloadseite](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- [NVIDIA-Blog — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson (von Mitarbeitern auf JetPack 7.2.1 verifiziert)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — JetPack 7.2 GPU acceleration issue (Wheel-Index, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — AI models that run on Jetson Orin Nano Super 8GB (Community)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (geprüft am 2026-09-26)
- [Jetson AI Lab — TensorRT-Edge-LLM-Tutorial](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (geprüft am 2026-09-26)
- [Jetson AI Lab — vollständiger Dokumentationstext (Container-Image-Tabelle)](https://www.jetson-ai-lab.com/llms-full.txt) (geprüft am 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (geprüft am 2026-09-26)
- [Jetson AI Lab PyPI-Index — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (geprüft am 2026-09-26)

*Status: Entwurf, ausstehende Prüfung durch cheny. Basiert auf der offiziellen
Dokumentation von NVIDIA zum angegebenen Datum; noch nicht von Juxi Technology
auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
