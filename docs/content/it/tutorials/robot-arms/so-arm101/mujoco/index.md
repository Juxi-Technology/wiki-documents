---
title: "SO-ARM101 × MuJoCo — Tutorial completo del flusso di lavoro (indice)"
---

# SO-ARM101 × MuJoCo — Tutorial completo del flusso di lavoro (indice)


> Questo tutorial documenta e riproduce il **flusso di lavoro completo simulazione + robot reale** del SO-ARM101: dalla configurazione dell'ambiente e verifica del modello alla calibrazione del robot reale,
> fino alla teleoperazione da tastiera/braccio leader e alla registrazione e riproduzione dei dati. Tutti i comandi sono stati verificati in sessioni reali + simulazione il 2026-10-15.
>
> Destinatari: utenti del kit Juxi SO-ARM101 e ingegneri interni. Non è richiesta alcuna conoscenza preliminare di MuJoCo o LeRobot.

## Mappa del flusso completo (due binari, componenti condivisi)

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| Cap. | Contenuto | Cosa otterrai |
| --- | --- | --- |
| [01 Preparazione dell'ambiente](/it/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | Ambiente uv, extra delle dipendenze, note per Windows | Un ambiente funzionante |
| [02 Verifica del modello di simulazione](/it/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | Caricamento/confronto/render di azionamento dei tre modelli MJCF | Certezza sul modello e sul comportamento della simulazione |
| [03 Connessione al robot reale e calibrazione](/it/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | Identificazione della porta seriale, controllo iniziale in sola lettura, calibrazione follower/leader | Due bracci riconosciuti dal software |
| [04 Teleoperazione da tastiera](/it/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | Controllo da tastiera di robot reale/simulazione, regolazione della velocità, limitazione di sicurezza della velocità | Il modo più rapido di controllo manuale |
| [05 Digital twin del braccio leader](/it/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | Braccio leader fisico che guida il follower simulato, micro-regolazione dello zero | Demo di digital twin e acquisizione dati |
| [06 Registrazione e riproduzione dei dati](/it/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | Registrazione su robot reale/simulazione, controllo degli episodi, replay, script di ispezione | Un dataset addestrabile |
| [07 Problemi comuni ed esperienze](/it/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | Tutti gli ostacoli incontrati in questo flusso di lavoro e le relative soluzioni | Un manuale di risoluzione dei problemi |
| [08 Roadmap](/it/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | Telecamere, scene con oggetti, generazione automatica dei dati, addestramento | I piani per i prossimi passi |
| [09 Tutorial d'uso completo](/it/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | Percorso completo: avvio del braccio → registrazione → ispezione → visione dei video → addestramento → deployment in simulazione; include l'alternativa con ambiente conda | Da zero a un dataset valido, fino alla policy in azione |

**Ordine consigliato per il primo utilizzo**: 01 (ambiente) → 03 (necessario solo quando si collega il robot reale) → seguire il percorso principale del [09 Tutorial d'uso completo](/it/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
(registrazione → ispezione → visione dei video → addestramento → deployment); 02 e 04–08 sono manuali di riferimento, da consultare all'occorrenza.
Ogni comando del capitolo 09 può essere copiato ed eseguito direttamente, senza dover tornare a metà strada in altri capitoli per installare altro.

## Tre convenzioni da ricordare

1. **Sistema di unità** (allineamento a tre vie): i cinque giunti del corpo usano **da −100 a 100** (proporzione della corsa, 0 = punto intermedio della corsa), il gripper usa
   **da 0 a 100** (0 = chiuso). Robot reale (`use_degrees=false`), simulazione e braccio leader sono tutti allineati a questa convenzione; i dataset registrati hanno la stessa struttura dei dataset reali ufficiali come
   `lerobot/svla_so101_pickplace` (vettore a 6 dimensioni + nomi dei giunti).
2. **Corrispondenza dei ruoli**: l'oggetto controllato (robot reale o simulazione) usa sempre `--robot.*`; il dispositivo di controllo (tastiera/braccio leader) usa sempre `--teleop.*`.
3. **Prefisso dei comandi su questa macchina**: su questa macchina di sviluppo tutti i comandi `uv` richiedono di impostare prima la directory di cache (motivo in [07](/it/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)):

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## Ambiente testato

| Voce | Versione |
| --- | --- |
| Sistema | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2 (questo repository, `.venv` isolato nel progetto, non influisce su conda) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0 (versione CPU) |
| Hardware | Braccio leader SO-ARM101 (COM124) + braccio follower (COM172), chip seriale CH343 |

<RelatedProducts slugs="so-arm101" />
