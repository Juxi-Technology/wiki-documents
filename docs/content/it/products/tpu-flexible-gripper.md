---
title: Pinza flessibile in TPU SO-ARM101
category: robot
description: Pinza flessibile TPU SO-ARM101 di Juxi Technology — presa sicura di oggetti irregolari/fragili, fotocamera sul braccio, zoom 30FPS o fissa 60FPS
keywords: [pinza, tpu, flessibile, so-arm101, presa]
---

# Pinza flessibile in TPU SO-ARM101

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-tpu-flexible-gripper)**

## Panoramica

Questa pinza flessibile TPU SO-ARM101 è progettata per il braccio XLerobot e supporta il supporto/kit fotocamera SO-ARM101. Il **TPU morbido** afferra oggetti irregolari e fragili senza danneggiarli. Con fotocamera opzionale (zoom 30FPS / fissa 60FPS) per sviluppo di presa e visione guidata.

**Caratteristiche principali**:

- Montaggio diretto sul braccio XLerobot, senza modifiche
- TPU morbido: flessibile, resistente all'abrasione, antiscivolo
- Compatibile supporto/kit fotocamera SO-ARM101 (presa guidata)
- Fissaggio a viti, plug-and-play, senza cablaggi complessi

## Specifiche

| Categoria | Specifica |
|------|------|
| Braccio compatibile | SO-ARM101 (serie XLerobot) |
| Materiale | TPU morbido (flessibile, resistente, antiscivolo) |
| Azionamento | Servo |
| Fotocamera opzionale | Zoom 30FPS / fissa 60FPS |
| Montaggio | Viti dirette, plug-and-play |

## Contenuto del kit

| Kit | Contenuto |
|------|------|
| **Pinza base** | 1× pinza flessibile TPU |
| **Kit fotocamera zoom** | Pinza + fotocamera zoom autofocus 30FPS |
| **Kit fotocamera fissa** | Pinza + fotocamera fissa 60FPS |

## Avvio rapido

1. Allineare i fori delle viti con l'end-effector del braccio
2. Fissaggio a viti (nessuna modifica al cablaggio)
3. Aggiungere il supporto fotocamera SO-ARM101 per la visione guidata

### Presa guidata dalla visione

Con fotocamera sul braccio e LeRobot:

```bash
# 录制视觉抓取数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```
## FAQ

**D: Perché afferra anche oggetti irregolari/fragili?**
Il TPU morbido si adatta alla forma dell'oggetto e distribuisce la forza — nessun danno.

**D: Quale fotocamera?**
Zoom 30FPS: messa a fuoco flessibile; fissa 60FPS: alta cadenza.

**D: Quali piattaforme?**
Serie SO-ARM101 / XLerobot, compatibile con ACT, Smolvla, Pi0, ecc.

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
