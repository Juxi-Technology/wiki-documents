---
title: LLMs lokal ausführen — TensorRT Edge-LLM auf JetPack 7.2
sidebar_label: Lokale LLM-Inferenz
slug: /tutorials/local-llm
description: >-
  Große Sprach- und multimodale Modelle lokal auf dem AGX Orin Developer Kit
  mit NVIDIA TensorRT Edge-LLM ausführen — unterstützte Modelle,
  Orin-Einschränkungen, Workflow und erwartete Leistung.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# LLMs lokal ausführen — TensorRT Edge-LLM auf JetPack 7.2

Ihr AGX Orin 64GB kann große Sprachmodelle lokal ausführen — ohne Cloud, ohne Netzwerk. Der optimierte Weg von NVIDIA dafür ist **TensorRT Edge-LLM**, und es **unterstützt Jetson Orin offiziell auf JetPack 7.2**. Diese Seite verschafft Ihnen den Überblick: was Ihr Kit kann und was nicht, die Form des Workflows und welche Leistung Sie erwarten können. Die maßgebliche Schritt-für-Schritt-Anleitung finden Sie in der Dokumentation von NVIDIA (durchgängig verlinkt).

## Zuerst lesen — drei Orin-spezifische Fakten

1. **Orin führt nur FP16-, INT8- und INT4-Engines aus. FP8 und FP4 werden auf Orin nicht unterstützt** (sie sind Fähigkeiten der Thor-Klasse). Die Support-Matrix von NVIDIA sagt dies ausdrücklich — planen Sie Ihre Quantisierungsentscheidungen entsprechend.
2. **Engines werden auf dem Gerät gebaut** für den Orin-Deployment-Pfad (nicht von einem PC aus cross-kompiliert).
3. **JetPack 7.2 ist der unterstützte Stack** — CUDA 13.2 mit dem TensorRT der Plattform (10.16.2 in dieser Version). Das aarch64-Wheel richtet sich an Jetson Orin (SM87) mit Python 3.10–3.12.

*(Quelle: TensorRT Edge-LLM Official Support Matrix, geprüft am 2026-09-24.)*

## Was TensorRT Edge-LLM abdeckt

Laut der Dokumentation von NVIDIA bietet Edge-LLM optimierte Inferenz für **Text-, Vision-, Audio-, Sprach- und Aktionsmodelle** auf Edge-Plattformen:

| Fähigkeit | Beispiele in der Doku |
|---|---|
| Textgenerierung | LLM-Familien, darunter Qwen, Gemma, Nemotron |
| Multimodal (VLM) | Phi-4-Multimodal-Beispiel |
| Spracherkennung (ASR) | Eigener Beispiel-Workflow |
| Sprachgenerierung (TTS) | Eigener Beispiel-Workflow |
| Vision-Language-Action | VLA-Beispiele (Robotik) |
| Omni (Audio + Vision + Sprache I/O) | Eigener Beispiel-Workflow |

Funktionshighlights: Quantisierung (INT8/INT4 auf Orin), spekulatives Decoding (EAGLE3, DFlash und weitere), **KV-Cache-Wiederverwendung**, **Vokabularreduktion**, **DART-Visual-Token-Pruning** für VLMs, Streaming-Ausgabe und LoRA-Unterstützung.

## Der Workflow (wie dokumentiert)

TensorRT Edge-LLM hat zwei dokumentierte Quick-Start-Pfade:

1. **ONNX + C++-Runtime** — Checkpoints exportieren/quantisieren (üblicherweise auf einem x86-Host), auf das Gerät übertragen, Engines auf dem Gerät bauen, die C++-Runtime ausführen.
2. **Einzeiliger Python-Server** — der schnellere Weg zu einem Serving-Endpunkt.

Beginnen Sie hier: **[TensorRT Edge-LLM Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Über den Quick Start hinaus:

- [Installationsoptionen →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (C++-Runtime aus dem Quellcode, Export-/Quantisierungs-Workflow, experimentelles lokales Wheel)
- [Unterstützte Modelle →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Quantisierungsleitfaden →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [KV-Cache-Wiederverwendung →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [DART-Pruning →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Juxi-Tipp:** Die Export-/Quantisierungstools laufen am besten auf einem x86-Linux-Host (laut den x86-Entwicklerzeilen der Doku); der **Engine-Build und die Inferenz laufen auf Ihrem Kit**. Planen Sie Speicherplatz für Modell-Checkpoints ein — mehrere GB pro Modell sind typisch.

## Serving: OpenAI-kompatibler Endpunkt (und Claude Code)

Die Doku enthält eine **experimentelle Python-API und einen Server**, die eine OpenAI-kompatible Chat-Schnittstelle bereitstellen — mit dokumentierten Beispielen für OpenAI-Clients und sogar einem **Integrationsbeispiel „Anthropic und Claude Code"** (mit dem Sie Claude Code auf Ihren auf dem Jetson gehosteten Endpunkt richten).

- [Experimentelle Python-API und Server →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Erwartete Leistung (AGX Orin 64GB)

NVIDIA hat diese Token/s-Werte für JetPack 7.2 auf dem 64GB-Modul veröffentlicht (Juni 2026; vollständiger Kontext und Methodik im Quell-Blog):

| Modell | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 Tok/s |
| Qwen 3.5 4B | ~28 Tok/s |
| Qwen 3.5 9B | ~17 Tok/s |
| Qwen 3.6 27B | ~7 Tok/s |
| Gemma 4 E4B | ~32 Tok/s |

Ihre Werte werden je nach Modell, Quantisierung, Kontextlänge und Leistungsmodus abweichen. Betrachten Sie diese als die veröffentlichte Referenz des Herstellers, nicht als Garantie.

## Einfachere Alternativen

Wenn der Export-/Build-Workflow von Edge-LLM für Ihren aktuellen Bedarf zu aufwendig ist, veröffentlicht NVIDIAs [Jetson AI Lab](https://www.jetson-ai-lab.com) praktische Tutorials für andere Runtimes (llama.cpp, vLLM und mehr) — prüfen Sie dessen JetPack-Versionshinweise, bevor Sie älteren Tutorials folgen.

## Fehlerbehebung

- **Erster Lauf ist langsam:** Engine-Builds können beim ersten Start mehrere Minuten dauern; spätere Läufe verwenden die Engine wieder (gleiches Verhalten bei DeepStream — siehe [unser DeepStream-Tutorial](/de/tutorials/jetson-agx-orin/deepstream)).
- **FP8-/FP4-Anweisungen funktionieren nicht:** erwartet — Orin unterstützt nur FP16-/INT8-/INT4-Engines.
- **Falsche Versionen:** Bestätigen Sie zuerst JetPack 7.2.1 — [Überprüfen Sie Ihr System](/de/tutorials/jetson-agx-orin/verify-your-system).

## Quellen

- [TensorRT Edge-LLM — Official Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (geprüft am 2026-09-24)
- [TensorRT Edge-LLM — Dokumentations-Startseite](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, geprüft am 2026-09-24)
- [NVIDIA Technical Blog — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (Leistungswerte; geprüft am 2026-09-24)

*Status: geprüft am 2026-10-11. Basiert auf der offiziellen Dokumentation von NVIDIA zum angegebenen Datum; noch nicht von Juxi Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
