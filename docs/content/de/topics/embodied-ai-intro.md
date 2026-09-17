---
title: Einstieg in die verkörperte Intelligenz (LeRobot)
description: "Einstieg in verkörperte Intelligenz – LeRobot-Framework, SO-ARM101-Datenerfassung/Training/Evaluation komplett, ACT-/Diffusionspolitik-/SmolVLA-Auswahl"
keywords: [lerobot, verkörperte Intelligenz, Imitationslernen, act, so-arm101, Robotik-Lernen]
---

# Einstieg in die verkörperte Intelligenz (LeRobot)

> Für Entwickler, die zum ersten Mal „Robotik-Lernen" betreiben. Am Beispiel HuggingFace LeRobot + JUXI SO-ARM101: kompletter Durchlauf von **Datenerfassung → Training → Evaluation**.

## 1. Was ist verkörperte Intelligenz?

Verkörperte Intelligenz (Embodied AI) lässt Agenten über Körpersensoren mit der physischen Welt interagieren. Robotisches Imitationslernen ist eine Hauptlinie: menschliche Teleop-Demos → Datenerfassung → Politikmodell trainieren → Roboter reproduziert die Aktionen.

**Warum wichtig**: Klassische Programmierung deckt komplexe Aufgaben (Schrauben, Kleider falten) nicht ab – Imitationslernen braucht nur „Demo + Training".

## 2. Hardware-Setup

| Komponente | Empfehlung | Beschreibung |
|------|------|------|
| Roboterarm | SO-ARM101 (leader + follower) | Dualarm-Teleoperation, 6 DOF |
| Rechenplattform | Jetson Orin NX Super / 4090-Host | Training braucht viel Rechenleistung, Inferenz auf Jetson |
| Vision | RealSense / USB-Kamera | Umgebungserfassung bei Teleoperation |

- [SO-ARM101-Bedienungstutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson-Orin-NX-Super-Kit](/de/products/jetson-orin-nx-super-kit)

## 3. Umgebung installieren

```bash
# Klonen (stabile JUXI-Fork)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM verwendet Feetech-Servos
# Jetson-Nutzer: zuerst PyTorch-Verfügbarkeit prüfen
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. Datenerfassung (Teleoperation)

```bash
# Roboterarm kalibrieren (einmalig)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
# Daten aufnehmen
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**Aufnahme-Tipps**:

- ≥50 Episoden pro Aufgabe, Positionen/Techniken variieren
- Kamera fixieren, Objekt durchgehend sichtbar halten
- Konsistenter Demonstrationsstil (gleicher Demonstrierender)

## 5. Training

```bash
# ACT-Politik (Einsteiger-Empfehlung)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**Politik-Auswahl**:

| Politik | Vorteile | Einsatz |
|------|------|------|
| ACT | stabil auch bei kleinen Datenmengen, einsteigerfreundlich | Einzelaufgaben, wenig Daten |
| Diffusionspolitik | komplexe multimodale Bewegungen | feine Manipulation |
| SmolVLA / Basismodelle | Zero-/Few-Shot-Generalisierung | Mehrfachaufgaben |

## 6. Evaluation

```bash
# Datensatz abspielen (Datenqualität prüfen)
lerobot-dataset-viz --repo-id juxi/pick_cube
# Politik evaluieren
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| Metrik | Beschreibung |
|---------|------|
| Erfolgsquote | Anteil abgeschlossener Aufgaben |
| Trajektorien-Glätte | ob die Bewegung zittert |
| Generalisierung | Erfolg auch bei anderen Objekten/Positionen |

## 7. Häufige Fragen

**F: Training ist langsam?**
Datenmenge, Steps und Rechenleistung sind proportional. Mit 50 Episoden / 100k Steps starten, Ablauf prüfen, dann skalieren.

**F: Politik kann nur eine Aktion?**
Einzelaufgaben-Training braucht einen Aufgabendatensatz; GR00T/Pi0-Basismodelle können mit wenig Daten auf mehrere Aufgaben feinjustiert werden.

**F: Zittern nach dem Training?**
Datenqualität prüfen (stabile Demos), Glättungsfilter hinzufügen, Steuerfrequenz senken.

**F: Nicht genug RAM/VRAM?**
batch_size verringern, Bildauflösung senken, auf Jetson die 16-GB-Version nutzen.

---

## Verwandte Links

- [Roboterarm-Auswahlhilfe](/de/tutorials/robot-arms/select-guide)
- [Einstieg in Edge-KI-Deployment](/de/topics/edge-ai-intro)
- [SO-ARM101 TPU-Flex-Greifer](/de/products/tpu-flexible-gripper)
- [SO-ARM101-Robotervisions-Kit](/de/products/robot-vision-kit)

## Technischer Support

- 📧 E-Mail:support@juxitech.com
- 🌐 Offizielle Website:[www.juxitech.com](https://www.juxitech.com)
