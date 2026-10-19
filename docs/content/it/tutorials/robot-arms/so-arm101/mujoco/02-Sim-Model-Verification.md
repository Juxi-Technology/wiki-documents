---
title: "02 · Verifica del modello di simulazione (caricamento e azionamento MJCF)"
description: "I tre modelli MJCF pubblici del SO-ARM101 sono stati tutti verificati come utilizzabili in questo progetto:"
---

# 02 · Verifica del modello di simulazione (caricamento e azionamento MJCF)

> Prerequisito: completare [01 Preparazione dell'ambiente](/it/tutorials/robot-arms/so-arm101/mujoco/01-Environment). Questo capitolo è interamente verifica in simulazione, non richiede il collegamento dell'hardware.

## Origine dei modelli

I tre modelli MJCF pubblici del SO-ARM101 sono stati tutti verificati come utilizzabili in questo progetto:

| Abbreviazione | File | Origine |
| --- | --- | --- |
| Ufficiale-nuova calibrazione | `SO101/so101_new_calib.xml` | Repository ufficiale TheRobotStudio/SO-ARM100 (le verifiche comparative di questo tutorial sono tratte da lì; questo repository non include lo zip originale) |
| Ufficiale-vecchia calibrazione | `SO101/so101_old_calib.xml` | Stesso repository (non presente nello zip, da scaricare) |
| Pacchetto descrittivo ROS2 | `so_arm101_description/mjcf/so_arm101.xml` | Allegato `SO-ARM101_ROS2.zip` del tutorial in questo repository |

Nota: la procedura di estrazione dello zip era fornita dalla prima versione di `so101_assets.py` ed è conservata per consultazione; dal 2026-10-16 il robot simulato è migrato al
**modello SO-ARM100 di mujoco_menagerie** (vendored in `assets/menagerie_so_arm100/`; motivi e punti chiave della migrazione nella nota di progettazione in [07](/it/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Verifica di azionamento e rendering

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| Parametro | Descrizione |
| --- | --- |
| `--model` | Percorso del modello MJCF. Quello incluso nel repository e utilizzabile subito è `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (per riesaminare i tre modelli storici della tabella precedente, scaricali prima dal repository corrispondente nella colonna "Origine" e sostituisci il percorso) |
| `--out-dir` | Directory dei prodotti: video di verifica, fotogrammi statici e riepilogo strutturale txt vengono scritti qui (default `out`) |
| `--tag` | Prefisso dei nomi dei file prodotti; per default viene usato il nome del file del modello |
| `--settle` / `--fps` / `--width` / `--height` | Durata di stabilizzazione per ogni posa (secondi), frame rate del video, risoluzione di rendering; default 25 fps, 960×720, di solito non serve modificarli |

Lo script stampa un riepilogo strutturale (giunti/attuatori/guadagni/intervalli), renderizza un video di verifica "spazzata sequenziale dei sei giunti + seno coordinato" e fotogrammi statici.
Un esempio di riepilogo strutturale è in `reports/` (fornito con il repository); i video di confronto (`media/`) sono di grandi dimensioni e non vengono distribuiti con il repository: possono essere rigenerati in qualsiasi momento con il comando qui sopra.

## Differenze chiave tra i tre modelli (misurate)

| Voce | Ufficiale-nuova calibrazione | Ufficiale-vecchia calibrazione | Pacchetto descrittivo ROS2 |
| --- | --- | --- | --- |
| Semantica dello zero | **punto intermedio della corsa** del giunto | posizione orizzontale di **estensione completa** | punto intermedio della corsa |
| Nomi dei giunti | `shoulder_pan` | idem | `shoulder_pan_joint` (suffisso) |
| Guadagno di posizione | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Unità del gripper | hinge in radianti | hinge in radianti | **normalizzato 0–1** |
| Esclusione delle autocolisioni | no | no | sì (6 coppie) |

**Errore di inseguimento misurato**: la nuova calibrazione e il pacchetto descrittivo hanno un errore di mantenimento da fermo di 0.0005 rad, la vecchia calibrazione 0.03 rad (cedimento di circa 1.7°, kp più debole di 56 volte).
Valutando la stessa policy in simulazione, cambiando modello si ottengono dinamiche diverse: annota sempre quale modello è stato usato.

## Comportamenti del modello da ricordare

1. **La direzione positiva di `shoulder_lift` punta verso il basso**: nella coppia di azionamento il "movimento verso il basso" usa angoli positivi; verifica sempre il segno prima di creare mappature di teleoperazione o conversioni di dati.
2. **Toccare il suolo blocca il movimento**: al limite del movimento verso il basso la punta delle dita tocca il terreno e viene fermata (lo script include una protezione di 8cm dal suolo che riduce automaticamente l'ampiezza).
3. Il modello ufficiale non ha telecamera né keyframe; esiste la variante con telecamera `so101_new_calib_camera.xml`, utilizzabile in seguito per registrare dati visivi.

<RelatedProducts slugs="so-arm101" />
