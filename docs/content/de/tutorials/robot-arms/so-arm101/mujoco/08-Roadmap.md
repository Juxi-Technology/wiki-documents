---
title: "08 · Weiterer Fahrplan"
description: "Erledigt:"
---

# 08 · Weiterer Fahrplan

## Abgeschlossen (in diesem Repository direkt ausführbar)

| Fähigkeit | Status |
| --- | --- |
| Laden/Ansteuern/Rendering-Validierung der Simulationsmodelle (3 MJCF) | ✅ |
| Tastatur-Teleoperation (Simulation / realer Roboter) | ✅ am realen Gerät verifiziert |
| Digitaler Zwilling des Leader-Arms (physischer Arm → Simulationsarm, inkl. Nullpunkt-Feintuning) | ✅ am realen Gerät verifiziert |
| Datenaufzeichnung (real / Simulation) + Episodensteuerung + Inspektionsskript | ✅ am realen Gerät verifiziert |
| Datenwiedergabe (real / Simulation, offizieller Mechanismus) | ✅ am realen Gerät verifiziert |
| Automatisierter Smoke-Test (ohne Hardware `smoke_test.py`) | ✅ 26 Punkte bestanden |
| Visuelles Dual-Kamera-Dataset `so101_sim_vision` (5 Episoden / 10610 Frames / 353,8 s) | ✅ |
| Training (ACT) und Simulations-Policy-Deployment (`lerobot-train` / `lerobot-rollout`) | ✅ Smoke-Test gemessen (siehe [09](/de/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)) |

## Nächste Schritte (nach Wert sortiert)

### Phase 2 · Kamera in die Szene (in Arbeit)

**Erledigt**:
- Halterung (STEP→STL) und Kamera (Platzhalterkörper nach HBVCAM-F2170HD-V22-Datenblatt 25×30×5,2 mm) in die Simulation eingebaut,
  Pose mit `adjust_mount.py` / `adjust_camera.py` am realen Gerät abgeglichen;
- `<camera>`-Element eingebunden (`sim_cam`, fovy Startwert 49°), **die visuelle Simulations-Aufzeichnungskette ist durchgängig**:
  `--robot.image_camera=sim_cam` erzeugt ein Video-Dataset `observation.images.wrist` (Smoke-Test [5] vollständig bestanden).

**Update 2026-10-16**: Kameraausrichtung/fovy zufriedenstellend eingestellt (`adjust_camera.py` mit neuem **Live-View-Echtzeitfenster**,
Fortsetzen nach Unterbrechung, automatisches Wiederöffnen bei versehentlichem Schließen; außerdem der Bug behoben, dass die MuJoCo-Kamerablickrichtung = **−Z des Elements** ist und dadurch „Objektivrichtung und Bildrichtung
entgegengesetzt“ waren, Details in [07](/de/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)). Mit dem neu kalibrierten Leader wurde das visuelle Dataset final aufgezeichnet (mit Wrist-Video, Folgefehler ≤2 Einheiten) ✅;
alte Versuchsaufzeichnungen wurden am 2026-10-16 bereinigt, finales Dataset einheitlich `so101_sim_vision` (zwei Kameras).
**Am selben Tag wurde der Simulationsroboter auf das SO-ARM100-Modell aus mujoco_menagerie migriert** (2026-10-16): Der Greifer des ursprünglichen Tutorial-Modells kann nicht greifen,
der Greifer des neuen Modells basiert auf der CAD-Kollision des realen Roboters, im Test hält er einen 34-mm-Würfel stabil; Aufzeichnung/Teleoperation/Dual-Kamera/Arbeitsbereich-Kette bleiben vollständig erhalten,
eine Überprüfung per Teleoperation am realen Roboter steht noch aus (insbesondere das Vorzeichen der wrist_roll-Richtung).
**Offen**: Nach Anschluss der realen HBVCAM einen Feinabgleich „Aufnahme am realen Roboter vs. Simulationsrendering“ vornehmen;
optional den Kamera-Platzhalter durch ein STL des Kameragehäuses ersetzen. Die kameraseitige Konfiguration am realen Roboter (`--robot.cameras` OpenCV) folgt später ebenfalls.

### Phase 3 · Szene und Skalierung (in Arbeit)

- ✅ Arbeitsbereich in der Szene (2026-10-16): Unterlegplatte + dreifarbige Würfel (34 mm, greifbar) + Aufbewahrungsbox + feste Draufsicht-Kamera `top_cam`
  (definiert in `so101_assets.add_workspace`, Werkzeug zur Rendering- und Nutzenprüfung `preview_workspace.py`); **die Aufzeichnungskette mit zwei Kameras (wrist+top)
  ist durchgängig** (`--robot.top_camera=top_cam`);
- **Automatische Datengenerierung**: Skript-Policies/RL laufen nachts im Batchbetrieb in der Simulation (ohne Mensch im Regelkreis); hier liegt die Quelle der „um ein Vielfaches höheren Effizienz“;
- Visuelle Domänen-Randomisierung (Textur/Beleuchtung/Kamerawackeln) als Vorbereitung auf sim2real.

### Phase 4 · Training und Deployment

- ✅ **Trainings-/Deployment-Kette gemessen** (2026-10-16): `lerobot-train` (ACT, CPU-12-Schritte-Smoke – ca. 2 s/Schritt, Loss fällt normal,
  Checkpoint wird wie erwartet gespeichert) und `lerobot-rollout --strategy.type=base` (führt die Policy 20 s lang tatsächlich in der Simulation aus,
  schickt den Arm automatisch in die Ausgangspose zurück und beendet) sind durchgängig; vollständige Befehle, Kernpunkte und Methode zur Fortsetzung in [09](/de/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) Abschnitt 7/8,
  das Tutorial enthält den Demo-Checkpoint `outputs/train/smoke_act`, mit dem die Deployment-Kette direkt getestet werden kann;
- Das eigentliche Training auf einem **Rechner mit GPU** (ACT / SmolVLA; dieser reine CPU-Rechner eignet sich nur zur Verifikation der Kette mit kleinen Schrittzahlen);
  Dataset kopieren oder in ein privates HF-Repository pushen;
- Deployment am realen Roboter ebenfalls über `lerobot-rollout` (`--robot.*` durch `so101_follower`-Konfiguration ersetzen).

### Langfristig · sim2real

Simulationsdaten + wenige reale Daten gemischt trainieren → kostenlose Evaluation am realen Roboter (in der Simulation lässt sich die Erfolgsrate einer Policy reproduzierbar bewerten).
Hinweis: Reine Simulationsdaten direkt auf den realen Roboter zu bringen (Zero-Shot-Transfer) ist der schwierigste Weg; zuerst „kurze Schleife“ (reale Daten trainieren → real deployen),
dann schrittweise Simulation ergänzen.

## Ein-Satz-Positionierung

Für Teams mit vorhandenem physischem Arm: Simulation = **Entwicklungssandbox + Demomaterial + Datenverstärker**;
für potenzielle Kunden: Simulation = **Erlebniswerkzeug, mit dem der gesamte Ablauf schon vor dem Kauf durchlaufen werden kann**.

<RelatedProducts slugs="so-arm101" />
