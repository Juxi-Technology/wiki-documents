---
title: "01 · Preparazione dell'ambiente"
description: "Operazione da fare una sola volta."
---

# 01 · Preparazione dell'ambiente

Operazione da fare una sola volta. Questo repository usa **uv per gestire un `.venv` isolato all'interno del progetto**: `uv run` utilizza solo l'ambiente presente in questa directory e
non tocca il tuo conda (questa scelta è intenzionale, vedi [07 Problemi comuni](/it/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Installazione

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

Scopo dei quattro extra:

| extra | Cosa fornisce | A chi serve |
| --- | --- | --- |
| `core_scripts` | Punti di ingresso ufficiali record / teleoperate / calibrate / replay + dataset + dipendenze di visualizzazione | Tutti |
| `feetech` | `scservo_sdk` (protocollo seriale dei servo STS3215) | Operazioni sul robot reale |
| `pynput-dep` | Ascolto globale della tastiera | Teleoperazione da tastiera, tasti di controllo degli episodi in registrazione |
| `training` | `accelerate` / `wandb` ecc. | Addestramento con `lerobot-train`, deployment della policy (`lerobot-rollout`) |

Quando serve, MuJoCo viene aggiunto temporaneamente (non entra nel file di lock, viene caricato su richiesta):

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

Come leggere le tre parti: `uv run` esegue i comandi con il `.venv` di questo repository; `--frozen` usa rigorosamente le versioni già bloccate
secondo `uv.lock`, senza risolvere di nuovo le dipendenze; `--with mujoco` aggiunge temporaneamente il pacchetto MuJoCo **solo per questo comando**: il comando successivo senza
questo flag non lo avrà nell'ambiente, per questo i comandi di simulazione dal 02 al 09 lo includono tutti.

Dopo aver completato questo capitolo, tutti i comandi del 02–09 sono eseguibili direttamente: l'extra `training` (necessario per addestramento/deployment) è già incluso nel
`uv sync` qui sopra, quindi in seguito **non serve installare altre dipendenze**.

**Vuoi passare a un ambiente conda**? In quel caso i comandi non richiedono più il prefisso `uv run`: i tre comandi per creare l'ambiente e le avvertenze sono in
[09 Tutorial d'uso completo · Appendice A](/it/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial).

## Verifica

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## Problemi comuni

- **`uv sync` segnala `failed to persist temporary file ... os error 17`**: caso particolare della directory di cache uv su un altro disco
  di questa macchina; usa il prefisso `UV_CACHE_DIR` qui sopra, dettagli in [07](/it/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).
- **Non usare il Python del Microsoft Store**: scegli il Python 3.12 gestito automaticamente da uv.
- Il primo `uv run --with mujoco` scarica il wheel di mujoco (circa 5.6MB), poi usa la cache.

<RelatedProducts slugs="so-arm101" />
