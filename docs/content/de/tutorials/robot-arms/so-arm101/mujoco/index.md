---
title: "SO-ARM101 × MuJoCo – Tutorial für den kompletten Workflow (Index)"
---

# SO-ARM101 × MuJoCo – Tutorial für den kompletten Workflow (Index)


> Dieses Tutorial dokumentiert und reproduziert den **kompletten Workflow aus Simulation + realem Roboter** des SO-ARM101: von der Einrichtung der Umgebung über die Modellvalidierung und die Kalibrierung am realen Gerät
> bis zur Tastatur-/Leader-Teleoperation sowie Datenaufzeichnung und -wiedergabe. Alle Befehle wurden am 2026-10-15 in einer Sitzung mit realem Roboter + Simulation verifiziert.
>
> Zielgruppe: Nutzer des Juxi SO-ARM101-Kits und interne Ingenieure. Vorkenntnisse zu MuJoCo oder LeRobot sind nicht erforderlich.

## Workflow-Karte (zwei Spuren, ein gemeinsamer Komponentensatz)

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

| Kapitel | Inhalt | Ergebnis |
| --- | --- | --- |
| [01 Umgebung einrichten](/de/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | uv-Umgebung, Dependency-Extras, Windows-Hinweise | Lauffähige Umgebung |
| [02 Validierung des Simulationsmodells](/de/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | Laden/Vergleich/Rendering der drei MJCF-Modelle | Gewissheit über Modell und Simulationsverhalten |
| [03 Verbindung zum realen Roboter und Kalibrierung](/de/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | Serielle Schnittstelle erkennen, schreibgeschützte Erstprüfung, Kalibrierung von Follower/Leader | Zwei von der Software erkannte Arme |
| [04 Tastatur-Teleoperation](/de/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | Realen Roboter/Simulation per Tastatur steuern, Raten-Tuning, sichere Geschwindigkeitsbegrenzung | Schnellste manuelle Steuerungsmethode |
| [05 Digitaler Zwilling des Leader-Arms](/de/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | Physischer Leader-Arm steuert simulierten Follower, Nullpunkt-Feintuning | Digital-Twin-Demo und Datenerfassung |
| [06 Datenaufzeichnung und -wiedergabe](/de/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | Real/Simulation aufzeichnen, Episodensteuerung, Wiedergabe, Inspektionsskript | Trainierbares Dataset |
| [07 Häufige Probleme und Erfahrungen](/de/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | Alle in diesem Workflow aufgetretenen Fallstricke und Lösungen | Handbuch zur Fehlerbehebung |
| [08 Weiterer Fahrplan](/de/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | Kamera, Objektszenen, automatische Datengenerierung, Training | Nächste Schritte |
| [09 Vollständiges Nutzungstutorial](/de/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | Arm starten → Aufzeichnen → Prüfen → Videos ansehen → Training → Simulations-Deployment in einem Durchgang; inkl. conda-Umgebungsalternative | Von null zum brauchbaren Dataset und dann zur Policy im Einsatz |

**Empfohlene Reihenfolge für den Einstieg**: 01 (Umgebung) → 03 (nur bei Anschluss des realen Roboters erforderlich) → dem Hauptpfad in [09 Vollständiges Nutzungstutorial](/de/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
folgen (Aufzeichnen → Prüfen → Videos ansehen → Training → Deployment); 02 und 04–08 sind Referenzhandbücher und können bei Bedarf nachgeschlagen werden.
Jeder Befehl in 09 kann direkt kopiert und ausgeführt werden; ein zwischenzeitliches Nachinstallieren in anderen Kapiteln ist nicht nötig.

## Drei Konventionen, die man sich merken muss

1. **Einheitensystem** (drei Parteien abgestimmt): Die fünf Körpergelenke verwenden **−100 bis 100** (Weganteil, 0 = Mitte des Stellwegs), der Greifer
   **0 bis 100** (0 = geschlossen). Realer Roboter (`use_degrees=false`), Simulation und Leader-Arm sind alle auf diese Konvention abgestimmt; die aufgezeichneten Datasets sind strukturell identisch mit offiziellen realen Datasets wie
   `lerobot/svla_so101_pickplace` (6-dimensionaler Vektor + Gelenknamen).
2. **Rollenentsprechung**: Das gesteuerte Objekt (realer Roboter oder Simulation) wird immer mit `--robot.*` konfiguriert; das Steuergerät (Tastatur/Leader-Arm) immer mit `--teleop.*`.
3. **Befehlspräfix auf diesem Rechner**: Alle `uv`-Befehle auf dieser Entwicklungsmaschine benötigen zuerst ein Cache-Verzeichnis (Grund siehe [07](/de/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)):

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## Gemessene Umgebung

| Element | Version |
| --- | --- |
| System | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2 (dieses Repository, isolierte projektinterne `.venv`, beeinflusst conda nicht) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0 (CPU-Version) |
| Hardware | SO-ARM101 Leader (COM124) + Follower (COM172), CH343-Seriellchip |

<RelatedProducts slugs="so-arm101" />
