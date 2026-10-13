---
title: "2 · Installation und Start"
description: "LeLab installieren und starten: Ein-Zeilen-Installation mit uv oder aus dem Quellcode – beides installiert LeRobot mit; die Web-Oberfläche öffnet unter localhost:8000."
---

# 2 · Installation und Start

> **Zurück:** [01 Überblick](01-Overview.md)
> **Weiter:** [03 Verbinden und kalibrieren](03-Calibration.md)

Beide Methoden installieren LeRobot mit — LeLab benötigt es.

---

## Weg A · Ein Einzeiler

Benötigt [uv](https://docs.astral.sh/uv/). Installiert in eine isolierte Umgebung:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

Ein Browser öffnet sich unter `http://localhost:8000/`.

## Weg B · Aus dem Quellcode

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` baut das React-Frontend und bündelt es in das Python-Paket, sodass ein einziger Prozess sowohl API als auch UI bereitstellt. Die erste Installation dauert einige Minuten.

Wenn der Build Node.js nicht findet, installieren Sie **Node.js 22** und versuchen es erneut. Node wird nur zur Installationszeit und im Entwicklungsmodus benötigt — nicht, um LeLab danach auszuführen.

> **Möchten Sie stattdessen den Upstream-Code?** Dieses Repository ist eine Kopie. Das Original, das vom LeRobot-Team bei Hugging Face gepflegt wird, ist <https://github.com/huggingface/leLab>. Alles auf diesen Seiten gilt dafür unverändert.

---

## Starten

```bash
lelab
```

Stellt die UI unter **<http://localhost:8000/>** bereit und öffnet den Browser.

| Flag | Wirkung |
|---|---|
| `lelab` | Produktionsmodus. Ein Prozess stellt die API und die gebaute UI auf `:8000` bereit |
| `lelab --dev` | Vite-Hot-Reload auf `:8080` plus uvicorn `--reload` auf `:8000`. Benötigt Node.js 22 |
| `lelab --rebuild` | Baut das Frontend aus lokalen Quellen neu und startet dann im Produktionsmodus |
| `lelab --no-open` | Startet, ohne einen Browser zu öffnen |
| `lelab --stop` | Stoppt ein laufendes LeLab und gibt die Ports 8000 und 8080 frei |

Beenden mit `Ctrl+C` oder aus einem anderen Terminal:

```bash
lelab --stop
```

Verwenden Sie `--stop`, wenn die Seite nicht mehr lädt: Ein veralteter Prozess, der Port 8000 oder 8080 belegt, ist die übliche Ursache.

---

## Prüfen, ob es funktioniert

Öffnen Sie <http://localhost:8000/>. Die Startseite hat Tabs für **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training** und **Inference**.

Im Terminal:

```bash
curl http://localhost:8000/health
```

Gibt einen JSON-Status zurück.

---

## Entwicklungsmodus

```bash
lelab --dev
```

Vite auf `:8080`, die API mit Auto-Reload auf `:8000`. Änderungen unter `frontend/src/` aktualisieren die Seite ohne Neustart; Änderungen unter `lelab/` laden den Server neu.

**Im `--dev`-Modus rufen Sie `:8080` auf, nicht `:8000`.** Port 8000 liefert Ihnen die API ohne UI.

---

## Aktualisieren

LeLab prüft, ob sich der Branch, aus dem installiert wurde, verändert hat, und bietet in der UI ein Update an. Manuell aktualisieren:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

Editierbare Installationen (`pip install -e .`) sind von der Prüfung ausgenommen. Aktualisieren Sie diese mit `git pull`.

---

> **Weiter:** [03 Verbinden und kalibrieren](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
