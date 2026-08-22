---
title: Introduzione all'intelligenza incarnata (LeRobot)
description: Intelligenza incarnata – framework LeRobot, flusso completo raccolta/training/valutazione SO-ARM101, scelta ACT/policy di diffusione/SmolVLA
keywords: [lerobot, intelligenza incarnata, apprendimento per imitazione, act, so-arm101, apprendimento robotico]
---

# Introduzione all'intelligenza incarnata (LeRobot)

> Per sviluppatori che affrontano per la prima volta l'«apprendimento robotico». Con HuggingFace LeRobot + il braccio robotico JUXI SO-ARM101: percorso completo **raccolta → training → valutazione**.

## 1. Cos'è l'intelligenza incarnata?

L'intelligenza incarnata (Embodied AI) permette a un agente di interagire col mondo fisico tramite i sensori del corpo. L'apprendimento robotico per imitazione ne è una linea principale: dimostrazioni teleoperate → raccolta dati → training del modello di policy → il robot riproduce le azioni.

**Perché è importante**: la programmazione classica non copre compiti complessi (avvitare, piegare vestiti); l'apprendimento per imitazione richiede solo «demo + training».

## 2. Configurazione hardware

| Componente | Raccomandazione | Descrizione |
|------|------|------|
| Braccio robotico | SO-ARM101 (leader + follower) | Teleoperazione bimanuale, 6 DOF |
| Calcolo | Jetson Orin NX Super / host 4090 | training ad alta potenza, inferenza su Jetson |
| Visione | RealSense / fotocamera USB | cattura dell'ambiente in teleoperazione |

- [Tutorial d'uso SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Kit Jetson Orin NX Super](/it/products/jetson-orin-nx-super-kit)

## 3. Installazione dell'ambiente

```bash
# Clonare (fork stabile JUXI)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM usa servo Feetech
# Utenti Jetson: verificare prima PyTorch
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. Raccolta dati (teleoperazione)

```bash
# Calibrare il braccio (prima volta)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
# Raccogliere i dati
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**Consigli di raccolta**:

- ≥50 episodi per task, variare posizioni/tecniche
- Fotocamera fissa, oggetto visibile in modo coerente
- Stile di dimostrazione costante (stesso dimostratore)

## 5. Training

```bash
# Policy ACT (consigliata per iniziare)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**Scelta della policy**:

| Policy | Vantaggi | Uso |
|------|------|------|
| ACT | stabile anche con pochi dati, accessibile | task singoli, pochi dati |
| Policy di diffusione | movimenti multimodali complessi | manipolazione fine |
| SmolVLA / modelli foundation | generalizzazione zero/few-shot | multi-task |

## 6. Valutazione

```bash
# Riprodurre il dataset (verificare la qualità)
lerobot-dataset-viz --repo-id juxi/pick_cube
# Valutare la policy
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| Metrica | Descrizione |
|---------|------|
| Tasso di successo | proporzione di task completati |
| Fluidità della traiettoria | se il movimento vibra |
| Generalizzazione | successo anche con altri oggetti/posizioni |

## 7. Domande frequenti

**D: Il training è lento?**
Quantità di dati, steps e potenza sono proporzionali. Iniziare con 50 episodi / 100k steps, validare il flusso, poi scalare.

**D: La policy fa una sola azione?**
Il training su singolo task richiede un dataset di task; i modelli foundation GR00T/Pi0 possono essere fine-tunati multi-task con pochi dati.

**D: I movimenti vibrano dopo il training?**
Controllare la qualità dei dati (demo stabili), aggiungere un filtro di smoothing, ridurre la frequenza di controllo.

**D: Memoria/VRAM insufficiente?**
Ridurre batch_size, risoluzione immagini; su Jetson usare la versione 16 GB.

---

## Link correlati

- [Guida alla scelta dei bracci robotici](/it/tutorials/robot-arms/select-guide)
- [Introduzione al deploy AI edge](/it/topics/edge-ai-intro)
- [Pinza flessibile TPU SO-ARM101](/it/products/tpu-flexible-gripper)
- [Kit visione robotica SO-ARM101](/it/products/robot-vision-kit)

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
