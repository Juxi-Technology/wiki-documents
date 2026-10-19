---
title: "02 · Validierung des Simulationsmodells (MJCF laden und ansteuern)"
description: "Die drei öffentlichen MJCF-Modelle des SO-ARM101 sind in diesem Projekt alle als funktionsfähig verifiziert:"
---

# 02 · Validierung des Simulationsmodells (MJCF laden und ansteuern)

> Voraussetzung: [01 Umgebung einrichten](/de/tutorials/robot-arms/so-arm101/mujoco/01-Environment) abgeschlossen. Dieses Kapitel ist reine Simulationsvalidierung; Hardware muss nicht angeschlossen werden.

## Modellquellen

Die drei öffentlichen MJCF-Modelle des SO-ARM101 sind in diesem Projekt alle als funktionsfähig verifiziert:

| Kurzname | Datei | Quelle |
| --- | --- | --- |
| Offiziell – neue Kalibrierung | `SO101/so101_new_calib.xml` | Offizielles Repository TheRobotStudio/SO-ARM100 (die Vergleichsvalidierung dieses Tutorials stammt von dort; dieses Repository enthält das Original-Zip nicht) |
| Offiziell – alte Kalibrierung | `SO101/so101_old_calib.xml` | Dasselbe Repository (nicht im Zip enthalten, muss heruntergeladen werden) |
| ROS2-Beschreibungspaket | `so_arm101_description/mjcf/so_arm101.xml` | Tutorial-Anhang dieses Repositories `SO-ARM101_ROS2.zip` |

Hinweis: Der Zip-Extraktionsablauf wird von einer früheren Version von `so101_assets.py` bereitgestellt und bleibt nachvollziehbar erhalten; seit dem 2026-10-16 wurde der Simulationsroboter auf
**das SO-ARM100-Modell aus mujoco_menagerie** umgestellt (vendored unter `assets/menagerie_so_arm100/`; Gründe und Kernpunkte der Migration siehe Designhinweise in [07](/de/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Ansteuerungs- und Rendering-Validierung

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| Parameter | Beschreibung |
| --- | --- |
| `--model` | Pfad zum MJCF-Modell. Direkt aus dem Repository nutzbar ist `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (die drei historischen Modelle aus der Tabelle oben müssen für eine erneute Prüfung zuerst aus dem jeweiligen Repository der Spalte „Quelle“ beschafft und der Pfad entsprechend ersetzt werden) |
| `--out-dir` | Ausgabeverzeichnis: Validierungsvideo, Standbilder und die Textdatei mit der Strukturzusammenfassung werden hier abgelegt (Standard `out`) |
| `--tag` | Präfix der Ausgabedateinamen, standardmäßig der Modell-Dateiname |
| `--settle` / `--fps` / `--width` / `--height` | Stabilisierungsdauer pro Pose (Sekunden), Videobildrate, Rendering-Auflösung; Standard 25 fps, 960×720, normalerweise nicht zu ändern |

Das Skript gibt eine Strukturzusammenfassung aus (Gelenke/Aktoren/Verstärkungen/Bereiche) und rendert ein Validierungsvideo aus „sechs Gelenke nacheinander durchfahren + koordinierte Sinuskurve“ sowie Standbilder.
Beispiele der Strukturzusammenfassung siehe `reports/` (im Repository enthalten); die Vergleichsvideos (`media/`) sind zu groß und werden nicht mit dem Repository ausgeliefert – mit dem obigen Befehl lassen sie sich jederzeit neu erzeugen.

## Wesentliche Unterschiede der drei Modelle (gemessen)

| Element | Offiziell – neue Kalibrierung | Offiziell – alte Kalibrierung | ROS2-Beschreibungspaket |
| --- | --- | --- | --- |
| Nullpunkt-Semantik | **Stellwegmitte** des Gelenks | horizontal **vollständig gestreckte** Position | Mitte des Stellwegs |
| Gelenknamen | `shoulder_pan` | wie links | `shoulder_pan_joint` (Suffix) |
| Positionsverstärkung | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Greifereinheit | Bogenmaß, Hinge | Bogenmaß, Hinge | **0–1 normalisiert** |
| Selbstkollisionsausschluss | keiner | keiner | vorhanden (6 Paare) |

**Gemessener Tracking-Fehler**: Neue Kalibrierung und Beschreibungspaket halten im Stillstand eine Abweichung von 0,0005 rad, die alte Kalibrierung 0,03 rad (Absinken um ca. 1,7°, kp um Faktor 56 schwächer).
Wird dieselbe Policy in der Simulation mit einem anderen Modell evaluiert, ergeben sich andere Dynamiken – darauf achten, welche Version aufgezeichnet wurde.

## Modellverhalten, das man sich merken muss

1. **Positive Richtung von `shoulder_lift` zeigt nach unten**: Beim Ansteuern wird „Absenken“ mit positivem Winkel verwendet; bei Teleoperations-Mapping oder Datenumrechnung zuerst das Vorzeichen prüfen.
2. **Bodenkontakt blockiert**: Am unteren Anschlag berührt die Fingerspitze den Boden und wird gestoppt (das Skript hat einen eingebauten 8-cm-Bodenabstandsschutz, der die Amplitude automatisch begrenzt).
3. Die offiziellen Modelle haben keine Kamera und kein Keyframe; die Variante mit Kamera `so101_new_calib_camera.xml` existiert und kann später für visuelle Daten genutzt werden.

<RelatedProducts slugs="so-arm101" />
