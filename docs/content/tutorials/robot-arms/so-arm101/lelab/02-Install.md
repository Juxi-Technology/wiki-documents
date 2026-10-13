---
title: "2 · Install and run"
description: "Install and run LeLab: one-line uv install or from source — both install LeRobot with it; the web UI opens at localhost:8000."
---

# 2 · Install and run

> **Previous:** [01 Overview](01-Overview.md)
> **Next:** [03 Connect and calibrate](03-Calibration.md)

Both methods install LeRobot as well — LeLab needs it.

---

## Way A · One-liner

Needs [uv](https://docs.astral.sh/uv/). Installs into an isolated environment:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

A browser opens at `http://localhost:8000/`.

## Way B · From source

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` builds the React front end and bundles it into the Python package, so one process serves both API and UI. The first install takes a few minutes.

If the build cannot find Node.js, install **Node.js 22** and retry. Node is needed at install time and in development mode only — not to run LeLab afterwards.

> **Want the upstream code instead?** This repository is a copy. The original, maintained by the LeRobot team at Hugging Face, is <https://github.com/huggingface/leLab>. Everything on these pages applies to it unchanged.

---

## Starting it

```bash
lelab
```

Serves the UI at **<http://localhost:8000/>** and opens the browser.

| Flag | What it does |
|---|---|
| `lelab` | Production mode. One process serves the API and the built UI on `:8000` |
| `lelab --dev` | Vite hot-reload on `:8080` plus uvicorn `--reload` on `:8000`. Needs Node.js 22 |
| `lelab --rebuild` | Rebuild the front end from local sources, then start in production mode |
| `lelab --no-open` | Start without opening a browser |
| `lelab --stop` | Stop a running LeLab and free ports 8000 and 8080 |

Stop with `Ctrl+C`, or from another terminal:

```bash
lelab --stop
```

Use `--stop` when the page stops loading: a stale process holding port 8000 or 8080 is the usual cause.

---

## Check it worked

Open <http://localhost:8000/>. The landing page has tabs for **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training** and **Inference**.

From the terminal:

```bash
curl http://localhost:8000/health
```

Returns a JSON status.

---

## Development mode

```bash
lelab --dev
```

Vite on `:8080`, the API with auto-reload on `:8000`. Edits under `frontend/src/` update the page without a restart; edits under `lelab/` reload the server.

**In `--dev` mode browse `:8080`, not `:8000`.** Port 8000 gives you the API with no UI.

---

## Updating

LeLab checks whether the branch it was installed from has moved and offers an update in the UI. To update by hand:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

Editable installs (`pip install -e .`) are excluded from the check. Update those with `git pull`.

---

> **Next:** [03 Connect and calibrate](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
