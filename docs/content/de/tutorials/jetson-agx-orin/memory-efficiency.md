---
title: Speichereffizienz — größere Workloads auf 64GB ausführen
sidebar_label: Speichereffizienz
slug: /tutorials/memory-efficiency
description: >-
  Die dokumentierten Hebel zur Reduzierung des Speicherverbrauchs auf dem
  AGX Orin Developer Kit — Agent-Skills auf Plattformebene, Optimierungen auf
  Modellebene in TensorRT Edge-LLM und wie Sie die Ergebnisse messen.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# Speichereffizienz — größere Workloads auf 64GB ausführen

Auf Edge-Geräten ist in der Regel der Speicher — nicht die Rechenleistung — der
limitierende Faktor dafür, welche Modelle Sie ausführen können. JetPack 7.2
wurde mit Speichereffizienz als Schwerpunktthema veröffentlicht, und es gibt
drei dokumentierte Optimierungsebenen: die **Plattform**, das **Modell** und
die **Messung**. Diese Seite zeigt die Hebel auf; jeder verlinkt die
maßgebliche Quelle.

## Hebel 1 — Plattformebene (NVIDIA Agent-Skills)

Die **Agent-Skills zur Speicheroptimierung** von JetPack 7.2 führen einen
KI-Agenten durch die Analyse und Reduzierung des Speicherverbrauchs über den
gesamten Stack hinweg — laut NVIDIA:

- **Bootloader-Speicher-Carveouts** — Speicher zurückgewinnen, der vor dem
  Start von Linux reserviert wurde
- **Kernel-Speicherreservierungen** — justieren, was der Kernel zurückhält
- **User-Space-Overhead** — redundante Prozesse und Dienste finden und
  entfernen

Das von NVIDIA formulierte Ziel: leistungsfähigere Workloads in kleinere
Speicher-Footprints zu bringen (so wird dieselbe Hardware über die
Softwareversionen hinweg immer nützlicher). Beginnen Sie hier:

- [Jetson-Geräte-Skills](https://github.com/jetson-device-skills) · [Jetson-BSP-Skills](https://github.com/jetson-bsp-skills)
- Kontext: [NVIDIAs Blog zur Speichereffizienz in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Achtung:** Änderungen an Carveouts und Reservierungen berühren das
> Boot-Verhalten. Nehmen Sie die Änderungen einzeln vor, halten Sie einen
> Wiederherstellungspfad bereit (siehe
> [Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates)), und
> validieren Sie erneut, bevor Sie in den Produktivbetrieb wechseln.

## Hebel 2 — Modellebene (Funktionen von TensorRT Edge-LLM)

Bei LLM-/VLM-Workloads sind die Gewichte und der KV-Cache die größten
Speicherverbraucher. TensorRT Edge-LLM dokumentiert diese Hebel (Jetson Orin
führt FP16-/INT8-/INT4-Engines aus — siehe
[Lokale LLM-Inferenz](/de/tutorials/jetson-agx-orin/local-llm)):

| Hebel | Was es bewirkt | Doku |
|---|---|---|
| **Quantisierung** (INT8/INT4 auf Orin) | Kleinere Gewichte, weniger Bandbreite | [Quantisierungsleitfaden](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Vokabularreduktion** | Verkleinert das Ausgabevokabular / die Embedding-Tabellen | [Vokabular reduzieren](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **KV-Cache-Wiederverwendung** | Verwendet den Cache über verwandte Anfragen hinweg erneut, statt ihn neu zu berechnen | [KV-Cache-Wiederverwendung](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **DART-Visual-Token-Pruning** | Entfernt redundante Bild-Tokens für VLMs | [DART-Pruning](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(Ein FP8-KV-Cache findet sich in der Doku, ist aber auf die Thor-Klasse
ausgerichtet; Orin ist laut der offiziellen Support-Matrix auf
FP16-/INT8-/INT4-Engines beschränkt.)*

## Hebel 3 — Messen statt raten

- **Systemansicht:** `tegrastats` (in Jetson Linux enthalten) für Live-Werte zu
  CPU/GPU/Speicher — siehe [System überprüfen](/de/tutorials/jetson-agx-orin/verify-your-system).
- **Modellansicht:** TensorRT Edge-LLM enthält ein [Design und Tools zur Speicherüberwachung](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html) und veröffentlicht [Leistungs-Benchmarks pro Release](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Vorgehen:** Zeichnen Sie eine Baseline auf (Speicherverbrauch im Leerlauf
  und unter Last), ändern Sie **einen** Hebel, messen Sie erneut.
  Veröffentlichungsreife Zahlen sollten immer aus Ihrem eigenen Workload
  stammen.

## Was das in der Praxis bedeutet

- Das 64GB-Modul führt bereits Modelle der 30B-Klasse aus (siehe die
  veröffentlichten Werte in [Lokale LLM-Inferenz](/de/tutorials/jetson-agx-orin/local-llm)); erst die Speicheroptimierung
  ermöglicht es Ihnen, obendrauf *mehr* zu betreiben — Multi-Modell-Pipelines,
  längere Kontexte, Always-on-Agenten ([Agentische KI](/de/tutorials/jetson-agx-orin/agentic-ai)),
  Video-Pipelines parallel zur Inferenz ([DeepStream](/de/tutorials/jetson-agx-orin/deepstream)).
- Wenn Ihr Workload heute passt, aber nur knapp, beginnen Sie mit Hebel 2
  (Modellebene) — er birgt das geringste Risiko und ist am besten
  dokumentiert. Nutzen Sie Hebel 1, wenn Sie die Plattform selbst ausreizen
  müssen.

## Quellen

- [NVIDIA Technical Blog — Speichereffizienz & Agent-Skills in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (geprüft am 2026-09-24)
- [TensorRT Edge-LLM — Dokumentation](https://nvidia.github.io/TensorRT-Edge-LLM/) (Funktionen und Support-Matrix; geprüft am 2026-09-24)

*Status: Entwurf, Überprüfung durch cheny ausstehend. Basiert auf der
offiziellen NVIDIA-Dokumentation zum angegebenen Datum; noch nicht von Juxi
Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
