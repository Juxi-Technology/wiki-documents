---
title: Agentic AI — NemoClaw auf dem 8-GB-Orin-Nano
sidebar_label: Agentic AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  NVIDIA NemoClaw, den Always-on-Agent-Stack, auf dem 8-GB-Jetson Orin Nano
  Super Developer Kit installieren und betreiben — offizielle Installation,
  ehrliche 8-GB-Erwartungen und Sicherheitshinweise.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Agentic AI — NemoClaw auf dem 8-GB-Orin-Nano

Ihr Kit kann NVIDIA NemoClaw ausführen — einen Always-on-Agenten für autonome
Aufgaben, installiert mit einem einzigen Befehl. Diese Seite behandelt, was
NemoClaw ist, die offizielle Installation, die Agent-Skills darum herum,
ehrliche Erwartungen an 8 GB und die Sicherheitsentscheidungen, die es
erfordert.

## Was NemoClaw ist

NVIDIA beschreibt NemoClaw als „eine Sammlung offener Blueprints für den Bau
autonomer Agenten“ — Always-on-KI-Systeme, die über reale Workflows hinweg
schlussfolgern, planen und handeln. Es bündelt Agent-Harnesses (OpenClaw,
Hermes, LangChain Deep Agents) mit Komponenten des NVIDIA Agent Toolkit:
Nemotron-Modelle, NeMo und die Laufzeit-Richtlinien von OpenShell.

OpenShell ist die Sicherheitsschicht: „die sichere Runtime darin, die
durchsetzt, worauf der Agent zugreifen kann: Dateien, Netzwerke, Anmeldedaten
und Tools.“

NemoClaw ist Alpha-Software — NVIDIA bezeichnet es als „Early preview“ (seit
2026-03-16). Produktseite: <https://www.nvidia.com/en-us/ai/nemoclaw> ·
Build-a-Claw-Hub: <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Installation — der offizielle einzelne Befehl

Führen Sie auf dem Kit NVIDIAs Installer aus:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Damit wird das Standard-Harness **OpenClaw** installiert. Zwei weitere sind
über eine Umgebungsvariable wählbar:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

Auf diesem Kit erkennt der Installer Jetson automatisch (Orin und Thor) und
wendet zuerst die JetPack-Host-Konfiguration an; unter L4T 39.x lädt er das
Modul `br_netfilter` nur, wenn es fehlt (ohne es scheitert die DNS-Auflösung
der Sandbox und das Onboarding hängt bei „Setting up OpenClaw inside
sandbox“). Wenn Sie Ollama auswählen, installiert der Installer es ebenfalls:
„Das Skript installiert außerdem ollama (falls ollama ausgewählt ist), sodass
Sie es nicht vorher manuell installieren müssen“ (NVIDIA-Mitarbeiter).
NVIDIAs Website dokumentiert dieses Gerät: „Install OpenClaw on Your NVIDIA
Jetson Orin Nano“ — „ein vollständig lokaler KI-Personal-Assistent auf dem
Jetson … keine Cloud-APIs nötig.“

> **Wichtig** — NemoClaws Plattform-Support-Matrix (v1.1, 2026-09-04) hat
> keine Jetson-Zeile; ihre getesteten Plattformen sind Linux (Ubuntu 24.04)
> und DGX OS Spark. Die Orin-Nano-Unterstützung ist in der Praxis real — der
> Installer erkennt das Board und NVIDIA dokumentiert den Ablauf —, aber sie
> ist nicht als formell unterstützt veröffentlicht, rechnen Sie also mit
> Ecken und Kanten.

Anforderungen, die hier zählen (von NVIDIAs NemoClaw-Voraussetzungsseite):

| Anforderung | Minimum / Empfohlen | Auf diesem Kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB gesamt — an der Untergrenze |
| Freier Speicherplatz | 20 GB | Kein integrierter Speicher; microSD oder NVMe verwenden ([Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | Separat installieren |
| Container-Runtime | Docker Engine / Desktop / Colima | Socket-Fix: `sudo usermod -aG docker $USER`, dann `newgrp docker` |

## Nach der Installation — die erste Sitzung

NVIDIA-Mitarbeiter verweisen für den Orin-Ablauf auf den
[Jetson-AI-Lab-Walkthrough](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)
(Anbieter-Leitfaden):

1. `curl -fsSL https://ollama.com/install.sh | sh` — oder überspringen; der
   NemoClaw-Installer kann Ollama ebenfalls installieren.
2. Laden Sie ein Tool-Calling-Modell der 4B-Klasse, etwa Nemotron3 Nano 4B
   (das Beispiel `nemotron-3-nano:30b` des Leitfadens zielt auf größere
   Geräte).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Onboarding: Wählen Sie Ollama als Modellquelle und die strengste
   Sandbox-Richtlinienstufe, die noch funktioniert.
5. `source ~/.bashrc`, dann `nemoclaw my-assistant connect`; starten Sie den
   Agenten mit `openclaw tui`.

## Agent-Skills

NVIDIA liefert außerdem **Agent-Skills** — paketierte Workflows im offenen
Agent-Skills-Format, die KI-Coding-Assistenten (Claude Code, Cursor, Codex) um
gerätespezifische Automatisierung erweitern. Zwei Domänen sind für diese Ära
dokumentiert:

- **Physical AI (Robotik).** Isaac ROS liefert einen Katalog von Agent-Skills
  — laut NVIDIA Aufgaben wie das Aktivieren des Isaac-ROS-Entwicklungscontainers
  und das Hochfahren des Mission-Control-Cloud-Stacks. Der Katalog liegt unter
  <https://github.com/nvidia/skills> (die Kategorie „Physical AI“), installiert
  mit `npx` (Node.js ist nicht Teil der Standard-Isaac-ROS-Umgebung). Isaac ROS
  5.0 ergänzt eine `isaac-ros-activate`-CLI und einen Early-Access-Skill
  `migrate-node-to-rosidl-buffer`. Siehe
  [Robotik](/de/tutorials/jetson-orin-nano/robotics).
- **Video-Pipelines.** Die Release Notes zu L4T r39.2.1 führen „Agent skills
  for video pipelines“ unter den What's-New-Einträgen auf.

Eine ehrliche Lücke: Die Quellen dieser Seite dokumentieren NVIDIAs
Agent-Skills für Isaac ROS (Physical AI) und für Video-Pipelines; keine davon
dokumentiert einen NemoClaw-spezifischen Skill-Katalog.

## Realistische Erwartungen für 8 GB

Ein Always-on-Agent, ein lokales Modell und der Ubuntu-Desktop passen nicht
alle gleichzeitig komfortabel auf dieses Kit. Das dokumentierte Budget:

- **Nutzbarer Speicher: ~7,6 GB, nicht 8 GB.** NVIDIA: „Von den 8 GB physischem
  DRAM sind nach Firmware- und Kernel-Reservierungen rund 7,6 GB nutzbar.“
- **8 GB ist die Untergrenze von NemoClaw, kein Komfortbereich.** Die
  Voraussetzungen nennen 8 GB als Minimum und 16 GB als empfohlen: „Auf
  Maschinen mit weniger als 8 GB RAM kann diese kombinierte Nutzung den
  OOM-Killer auslösen. Wenn Sie keinen Speicher hinzufügen können,
  konfigurieren Sie mindestens 8 GB Swap, um das Problem auf Kosten
  langsamerer Leistung zu umgehen.“ Der Speicher dieses Kits ist fest — planen
  Sie die Swap-Datei ein ([Speichereffizienz](/de/tutorials/jetson-orin-nano/memory-efficiency)).
  Das Hochladen des ~2,4 GB großen Sandbox-Images hat auf einem 8-GB-Orin-Nano
  bereits OOM ausgelöst.
- **Agent und Desktop belegen Speicher, bevor das Modell lädt.** Ein
  Community-Leitfaden in NVIDIAs Foren beziffert die OpenClaw-Runtime auf bis
  zu ~1 GB; das Deaktivieren des grafischen Desktops gibt bis zu ~865 MB frei
  (NVIDIAs Zahl), und eine Community-Messung veranschlagt GNOME mit über
  600 MB.
- **Das Scheitern an übergroßen Modellen ist in einem Community-Bericht in
  NVIDIAs Foren dokumentiert.** Ollama scheiterte auf einem 8-GB-Board beim
  Laden eines 7,4 GB großen und eines 16 GB großen Modells:
  `cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache`.
  Die Dateigröße allein ist nicht der Fit-Test — der KV-Cache muss in dieselben
  8 GB passen.

Was passt, laut den Quellen: NVIDIAs validierte Ollama-Standardwerte
(`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) sind für größere
Maschinen dimensioniert; der Jetson-AI-Lab-Leitfaden rät, mit einem
Tool-Calling-Modell der 4B-Klasse zu beginnen — „Es kann funktionieren, aber
rechnen Sie mit schwächerer Leistung als bei den Modellen der 30B-Klasse“;
und NVIDIAs Speicher-Blog setzt den optimierten 4-Bit-Rahmen bei LLMs bis ~10B
und VLMs bis ~4B Parameter an — eine Obergrenze für ein dediziertes Setup,
kein Budget, das auch noch Desktop und Agent trägt.

NVIDIA veröffentlicht keine Token/s-Zahlen für Ollama auf diesem Gerät;
behandeln Sie externe Geschwindigkeitsangaben mit Vorsicht (siehe
[Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm)).

> **Juxi-Hinweis:** Planen Sie für ein tragbares Always-on-Setup hier den
> Headless-Modus, ein quantisiertes Modell der 4B-Klasse und NVMe-Speicher für
> die 20-GB-Anforderung und die Swap-Datei ein. Das entspricht dem, was die
> Quellen stützen; alles Größere ist unverifiziert.

## Ollama- und Agent-Hinweise — von NVIDIA-Mitarbeitern bestätigt

NVIDIA-Mitarbeiter haben den Ablauf Orin Nano + JetPack 7.2 + Ollama in den
Entwicklerforen debuggt und Ollama im September 2026 erneut auf JetPack 7.2.1
verifiziert.

- **Prüfen Sie zuerst die GPU.** `ollama ps` sollte in der Spalte PROCESSOR
  `100% GPU` anzeigen; wenn dort CPU steht, wird der Agent sehr langsam sein.
- **Dokumentierter Fehlerfall (Juni 2026).** Mit NemoClaw + Ollama auf einem
  frisch geflashten JetPack-7.2-Orin-Nano öffnete sich `openclaw tui`,
  antwortete aber nie („Autocompaction could not recover this turn“). NVIDIA
  reproduzierte es: Ollama hatte die GPU-Erkennung übersprungen
  (CPU-Fallback), und das Kontextfenster der Sandbox umfasste nur 4096 Token.
  Der Fix der Mitarbeiter schrieb diese Zeilen in
  `/etc/systemd/system/ollama.service.d/override.conf`:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  dann `sudo systemctl daemon-reload && sudo systemctl restart ollama`;
  innerhalb der Sandbox (`nemoclaw my-assistant connect`) wurde `contextWindow`
  in `.openclaw/openclaw.json` auf 32768 erhöht und der Konfigurations-Hash
  aktualisiert. Der Melder bestätigte, dass Ollama danach auf der GPU lief.
- **Aktueller Stand: Dieser Workaround sollte nicht nötig sein.** Mitarbeiter,
  Mitte 2026: „Das Problem ist im neuesten Ollama-Release behoben. Der
  Workaround (override.conf) ist nicht mehr erforderlich.“ Auf JetPack 7.2.1
  funktioniert der Upstream-Installer und `ollama ps` meldet 100% GPU; die
  Zeile „WARNING: Unsupported JetPack version detected“ ist harmlos. Testen
  Sie zuerst die Standardinstallation.
- **Wenn Ollama weiterhin auf CPU zurückfällt:** Aktualisieren Sie zuerst
  Ollama. Ein Foren-Nutzer behob einen hartnäckigen Fallback, indem er das
  veraltete Verzeichnis `/usr/local/lib/ollama/cuda_v12` löschte (von
  Mitarbeitern bestätigte Entfernung). Behalten Sie override.conf als letzte
  Rückfalloption — NVIDIA hat damit auf genau diesem Kit erfolgreich
  gearbeitet.

## Sicherheit für Always-on-Agenten

Ein Always-on-Agent ist ein Programm mit Anmeldedaten und Tool-Zugriff, das
weiterarbeitet, während Sie nicht hinsehen. Auf einem Gerät, das Ihre Daten
enthält, ist das ein echtes Risiko: Ein Agent mit Tool- und Shell-Zugriff kann
hier alles lesen, ändern oder senden, was er erreichen kann.

**Nutzen Sie die Richtlinienschicht.** NVIDIA beschreibt OpenShell als „die
sichere Runtime darin, die durchsetzt, worauf der Agent zugreifen kann:
Dateien, Netzwerke, Anmeldedaten und Tools.“ Wählen Sie beim Onboarding die
strengste Sandbox-Richtlinienstufe, die die Aufgabe noch erfüllt (der
Jetson-AI-Lab-Walkthrough rät zur strengsten Stufe).

**Anmeldedaten.** Geben Sie dem Agenten begrenzte, widerrufbare Anmeldedaten —
dedizierte Schlüssel und Konten, niemals Ihre persönlichen. Alles, was der
Agent lesen kann, kann er kopieren; alles, was er nutzen kann, kann ihm
untergeschoben werden. Messaging-Integrationen handeln mit Ihrer Identität:
NVIDIAs Orin-Nano-Seite zeigt ein OpenClaw-+-WhatsApp-Beispiel — verwenden Sie
also ein dediziertes Konto oder eine dedizierte Nummer.

**Netzwerkexponierung.** Halten Sie lokale Dienste auf localhost — NVIDIAs
Mitarbeiter-Konfiguration für Ollama bindet es hier an `127.0.0.1`
(`OLLAMA_HOST=127.0.0.1:11434`). Setzen Sie Agent-Dashboards, Steuerungs-APIs
oder Modellserver nicht dem offenen Internet aus; nutzen Sie für den
Fernzugriff einen Tunnel oder VPN, den Sie kontrollieren. Die Installation
benötigt Docker (Engine/Desktop/Colima, laut den obigen Anforderungen) plus
einen sandboxten Container-Cluster (das OpenShell-Gateway betreibt intern
k3s) und sudo-Zugriff.

**Betriebsgewohnheiten.** Starten Sie unter Aufsicht — beobachten Sie, was der
Agent tut, bevor Sie ihn unbeaufsichtigt lassen. Geben Sie ihm keinen Zugriff,
den Sie nicht widerrufen oder rückgängig machen können, und halten Sie Backups
plus einen Wiederherstellungspfad bereit (siehe
[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)).
NemoClaw ist Alpha-Software („Early preview“); behandeln Sie die Sandbox als
eine Schicht unter mehreren, nicht als die einzige.

> **Achtung** — da dieser Stack lokal läuft („keine Cloud-APIs nötig“), sind
> die Sicherheitsgrenzen Ihr Gerät, Ihr Netzwerk und Ihre Anmeldedaten. Prüfen
> Sie alle drei, bevor Sie einen Agenten laufen lassen.

## Quellen

- [NVIDIA NemoClaw Produktseite](https://www.nvidia.com/en-us/ai/nemoclaw) (geprüft am 2026-09-26) — Definition, Harnesses, Installationsbefehle, OpenShell.
- [NVIDIA Build-a-Claw-Ressourcen-Hub](https://www.nvidia.com/en-us/ai/build-a-claw/) (geprüft am 2026-09-26) — Orin-Nano-Installationsabschnitt.
- [NemoClaw — Voraussetzungen](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) und [Plattform-Support](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (geprüft am 2026-09-26)
- [NemoClaw — Fehlerbehebung (Jetson-Host-Konfiguration)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — NemoClaw on Jetson Orin Super with JetPack 7.2 (Fix von NVIDIA-Mitarbeitern)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson (von Mitarbeitern verifiziert)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) und [JetPack 7.2 GPU acceleration](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (geprüft am 2026-09-26)
- [NVIDIA Technical Blog — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — AI models that run on Orin Nano Super 8GB (Community-Leitfaden)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (geprüft am 2026-09-26)
- [Jetson AI Lab — NemoClaw-Tutorial (Anbieter-Leitfaden)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (geprüft am 2026-09-26)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) und [Release Notes](https://nvidia-isaac-ros.github.io/releases/index.html) (geprüft am 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (geprüft am 2026-09-26) — der What's-New-Eintrag „Agent skills for video pipelines“.

*Status: geprüft am 2026-10-11. Basiert auf NVIDIAs
offizieller Dokumentation, Beiträgen in den NVIDIA-Entwicklerforen und dem
Anbieter-Leitfaden von Jetson AI Lab, zum angegebenen Datum; noch nicht auf
physischer Hardware durch Juxi Technology verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
