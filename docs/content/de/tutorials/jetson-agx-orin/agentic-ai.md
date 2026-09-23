---
title: Agentic AI — NemoClaw auf JetPack 7.2
sidebar_label: Agentic AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  NVIDIA NemoClaw auf dem AGX Orin Developer Kit bereitstellen — Installation
  mit einem einzigen Befehl, Jetson-Agent-Skills und praktische Hinweise für
  Always-on-Agenten.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# Agentic AI — NemoClaw auf JetPack 7.2

JetPack 7.2 macht Ihr Kit **agentic-ready**: NVIDIA NemoClaw lässt sich mit
einem einzigen Befehl installieren, und die Agent-Skills von NVIDIA
automatisieren einen Großteil der Plattformarbeit, die früher manuell
erledigt werden musste.

## Was NemoClaw ist

Laut NVIDIA ist NemoClaw eine offene Stack-/Blueprint-Sammlung für den Aufbau
**autonomer Agenten** — Always-on-KI-Systeme, die schlussfolgern, planen und
handeln. Sie ergänzt das OpenClaw-Agent-Ökosystem um Datenschutz- und
Sicherheitskontrollen (über die Laufzeit-Richtlinien von **OpenShell**) und
bündelt NVIDIA-Komponenten wie Nemotron-Modelle und NeMo. JetPack 7.2 ist
**bereits mit den erforderlichen Abhängigkeiten vorkonfiguriert**, sodass auf
Ihrem Kit keine manuelle Umgebungseinrichtung nötig ist.

- NemoClaw-Produktseite: <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw auf GitHub: <https://github.com/NemoClaw> · Community-Beispiele: <https://github.com/nemoclaw-community>

## Installation (ein einziger Befehl, offiziell)

Führen Sie auf dem Kit (JetPack 7.2+) aus:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Sicherheitshinweis — vor der Ausführung lesen:** Dies installiert ein
> Always-on-Agent-Framework. Prüfen Sie, worauf der Agent zugreifen darf und
> welche Anmeldedaten er verwenden kann, *bevor* Sie ihn aktivieren;
> bevorzugen Sie eingeschränkte/widerrufbare Tokens und nutzen Sie die
> Richtlinienkontrollen von OpenShell. Lassen Sie einen Agenten nicht
> unbeaufsichtigt mit Zugriffen laufen, die Sie nicht widerrufen können.

## Nach der Installation — wie es weitergeht

NVIDIA pflegt einen **Build-a-Claw Resource Hub** mit
Installationsanleitungen, Cloud-Testzugängen und Lernressourcen:
<https://www.nvidia.com/en-us/ai/build-a-claw>

Ebenfalls nützlich:

- Kurs des NVIDIA Deep Learning Institute: *Securing Agents With NemoClaw and OpenShell* (siehe den Resource Hub)
- NVIDIA Developer Discord — Kanal `#nemoclaw`
- Drittanbieter-Walkthroughs (z. B. [Seeed Studios NemoClaw-Leitfaden](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), geschrieben für einen Jetson-Thor-Roboterarm) dokumentieren Abläufe nach der Installation wie `nemoclaw onboard` — behandeln Sie diese als Community-Hinweise und folgen Sie für den verbindlichen Ablauf dem Hub von NVIDIA.

## Jetson-Agent-Skills — die Plattformarbeit automatisieren

JetPack 7.2 enthält **Agent-Skills**: wiederholbare, von Agenten ausführbare
Workflows für die Jetson-Entwicklung. Laut NVIDIA gibt es drei Kategorien:

| Skill-Kategorie | Was automatisiert wird |
|---|---|
| **Jetson-Linux-Anpassung** | Erstellen/Anpassen eines BSP für kundenspezifische Trägerplatinen — I/O-Konfiguration, Taktraten, Lüftersteuerung, Leistungsprofile |
| **Speicheroptimierung** | Überprüfen von Bootloader-Carveouts, Kernel-Reservierungen und User-Space-Speicher, um leistungsfähigere Workloads in weniger Speicher unterzubringen |
| **Modell-Benchmarking** | Die optimale Modellkonfiguration und Diagnosen für Ihr Gerät finden |

Weitere Agent-Skills im Ökosystem:

- [Jetson Device-Side-Skills](https://github.com/jetson-device-skills) · [Jetson BSP-Skills](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — agentengestützter Aufbau von Vision-Pipelines (siehe [unser DeepStream-Tutorial](/de/tutorials/jetson-agx-orin/deepstream))
- [Metropolis VSS Blueprint-Skills](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — Workflows für Videosuche und -zusammenfassung

## Praktische Hinweise für das AGX-Orin-Kit

- **Always-on-Agenten brauchen dedizierte Rechenleistung** — genau dafür
  betreibt man sie auf einem Kit statt auf einem Laptop, der in den
  Ruhezustand wechselt; planen Sie Stromversorgung und Kühlung entsprechend
  (siehe die Hinweise zu den Leistungsmodi in der
  [Fehlerbehebung](/de/tutorials/jetson-agx-orin/troubleshooting)).
- **Die Modellwahl ist entscheidend für den Speicher** — lokale Modelle laufen
  auf dem Orin problemlos innerhalb von 64GB, aber Always-on-Agenten sammeln
  Kontext an. Siehe [Speichereffizienz](/de/tutorials/jetson-agx-orin/memory-efficiency)
  für die Stellschrauben und
  [Lokale LLM-Inferenz](/de/tutorials/jetson-agx-orin/local-llm) für die
  Modellleistung auf dem Gerät.
- **Dieser Bereich entwickelt sich schnell.** Betrachten Sie die obigen
  Befehle als den aktuellen offiziellen Weg; prüfen Sie den Resource Hub auf
  Aktualisierungen, bevor Sie Bereitstellungen skripten.

## Quellen

- [NVIDIA Technical Blog — Agentic AI mit JetPack 7.2 (Installationsbefehl, Agent-Skills, Release-Funktionen)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (geprüft am 2026-09-24)
- [NVIDIA NemoClaw Produktseite](https://www.nvidia.com/en-us/ai/nemoclaw) (geprüft am 2026-09-24)
- [JetPack 7.2.1 Downloads-Seite](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-24)

*Status: Entwurf, Überprüfung durch cheny steht aus. Basiert auf NVIDIAs
offizieller Dokumentation zum angegebenen Datum; noch nicht auf physischer
Hardware durch Juxi Technology verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
