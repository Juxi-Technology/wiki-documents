---
title: Kit visione braccio robotico SO-ARM101
category: robot
description: "Kit visione SO-ARM101 di Juxi Technology — montaggio polso/laterale/dall'alto, fotocamera 60FPS fissa o 30FPS autofocus zoom, compatibile ACT/Smolvla/Pi0/GR00T"
keywords: [kit visione, supporto fotocamera, so-arm101, visione robotica]
---

# Kit visione braccio robotico SO-ARM101

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-wrist-camera-mount)**

## Panoramica

Il kit visione SO-ARM101 è un accessorio per fotocamere progettato per bracci robotici, con due opzioni: **60FPS a fuoco fisso** e **30FPS autofocus zoom**. Compatibile con SO-ARM101, LeKiwi e XLerobot, e con i framework di IA incarnata **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5**.

**Caratteristiche principali**:

- Tre posizioni di montaggio: **polso / laterale / dall'alto**
- Doppia fotocamera: 60FPS fissa (movimento rapido) / 30FPS autofocus zoom (visione flessibile)
- Adatta al SO-ARM101 senza modifiche
- Cuscinetti antiscivolo inclusi

## Specifiche

| Categoria | Specifica |
|------|------|
| Piattaforme | SO-ARM101, LeKiwi, XLerobot, compatibili fori M3 |
| Montaggio | Polso / laterale / dall'alto |
| Fotocamera | 60FPS fissa / 30FPS autofocus zoom |
| Framework | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## Confronto fotocamere

| Fotocamera | Uso |
|------|---------|
| **60FPS fissa** | Alta cadenza, immagine stabile, movimento rapido, distanza fissa |
| **30FPS autofocus zoom** | Messa a fuoco flessibile, distanza variabile |

## Avvio rapido

### 1. Scegliere la posizione

- **Polso**: prospettiva di presa (consigliata)
- **Laterale**: prospettiva globale
- **Dall'alto**: prospettiva scrivania (ideale per la raccolta dati)

### 2. Montaggio

Fissare il modulo fotocamera al supporto e collegare via USB all'host (Jetson/Raspberry Pi).

### 3. Integrazione framework

Esempio di raccolta dati LeRobot:

```bash
# Trova le telecamere
python -m lerobot.find_cameras

# Raccolta di dati con visione
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```
## FAQ

**D: Quale fotocamera scegliere?**
Movimento rapido (presa): 60FPS fissa; distanza variabile: 30FPS autofocus zoom.

**D: Quali framework supporta?**
ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 — i principali framework di IA incarnata.

**D: Altri bracci robotici?**
SO-ARM101, LeKiwi, XLerobot e piattaforme compatibili M3.

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
