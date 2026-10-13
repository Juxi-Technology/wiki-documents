---
title: "2 · Installazione e avvio"
description: "Installare e avviare LeLab: installazione con un comando uv o dai sorgenti — entrambe installano anche LeRobot; l'interfaccia web si apre su localhost:8000."
---

# 2 · Installazione e avvio

> **Precedente:** [01 Panoramica](01-Overview.md)
> **Successivo:** [03 Collegamento e calibrazione](03-Calibration.md)

Entrambi i metodi installano anche LeRobot — LeLab ne ha bisogno.

---

## Metodo A · Comando unico

Richiede [uv](https://docs.astral.sh/uv/). Installa in un ambiente isolato:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

Il browser si apre su `http://localhost:8000/`.

## Metodo B · Dai sorgenti

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` compila il front end React e lo impacchetta nel pacchetto Python, quindi un solo processo serve sia l'API sia l'interfaccia. La prima installazione richiede qualche minuto.

Se la build non trova Node.js, installa **Node.js 22** e riprova. Node serve solo al momento dell'installazione e in modalità sviluppo — non per eseguire LeLab in seguito.

> **Vuoi invece il codice a monte?** Questo repository è una copia. L'originale, mantenuto dal team LeRobot di Hugging Face, è <https://github.com/huggingface/leLab>. Tutto ciò che è descritto in queste pagine vale anche per esso, senza modifiche.

---

## Avvio

```bash
lelab
```

Serve l'interfaccia su **<http://localhost:8000/>** e apre il browser.

| Flag | Cosa fa |
|---|---|
| `lelab` | Modalità produzione. Un processo serve l'API e l'interfaccia compilata su `:8000` |
| `lelab --dev` | Hot-reload Vite su `:8080` più uvicorn `--reload` su `:8000`. Richiede Node.js 22 |
| `lelab --rebuild` | Ricompila il front end dai sorgenti locali, poi avvia in modalità produzione |
| `lelab --no-open` | Avvia senza aprire il browser |
| `lelab --stop` | Ferma un LeLab in esecuzione e libera le porte 8000 e 8080 |

Ferma con `Ctrl+C`, oppure da un altro terminale:

```bash
lelab --stop
```

Usa `--stop` quando la pagina smette di caricarsi: un processo rimasto attivo che occupa la porta 8000 o 8080 è la causa abituale.

---

## Verifica che funzioni

Apri <http://localhost:8000/>. La pagina iniziale ha le schede **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training** e **Inference**.

Dal terminale:

```bash
curl http://localhost:8000/health
```

Restituisce uno stato JSON.

---

## Modalità sviluppo

```bash
lelab --dev
```

Vite su `:8080`, l'API con auto-reload su `:8000`. Le modifiche sotto `frontend/src/` aggiornano la pagina senza riavvio; le modifiche sotto `lelab/` ricaricano il server.

**In modalità `--dev` naviga su `:8080`, non su `:8000`.** La porta 8000 ti dà l'API senza interfaccia.

---

## Aggiornamento

LeLab controlla se il branch da cui è stato installato ha nuove commit e propone un aggiornamento nell'interfaccia. Per aggiornare manualmente:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

Le installazioni modificabili (`pip install -e .`) sono escluse dal controllo. Aggiornale con `git pull`.

---

> **Successivo:** [03 Collegamento e calibrazione](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
