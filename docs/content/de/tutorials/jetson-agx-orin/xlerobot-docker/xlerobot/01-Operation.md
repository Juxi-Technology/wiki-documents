---
title: XLeRobot-Befehle
---

# XLeRobot-Befehle

> **Gehört zu**: [xlerobot/](01-Operation.md) – kompletter XLeRobot (beide Arme + Fahrgestell)
> **Voraussetzung**: Sie haben [deployment/](../deployment/01-Overview.md) vollständig gelesen und sind im Container
> **Der andere Weg**: [lerobot/](../lerobot/01-Operation.md) (einzelner SO-101-Arm / LeKiwi)
> **Weiter**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **Dieser Teil behandelt nur den Betrieb des kompletten XLeRobot** (beide Arme + Fahrgestell).

Um einen **einzelnen SO-101-Arm** oder einen **LeKiwi** über die `lerobot-*`-Kommandozeile zu bedienen, gehen Sie zu
[lerobot/](../lerobot/01-Operation.md) – die beiden Wege sind unterschiedlich.

Inhalt dieses Teils: Kalibrierung, Teleoperation, Tastenbelegung, Datenaufzeichnung, Training, Inferenz.

---

## 0. Zuerst den Weg wählen ⚠️

Das Image enthält **zwei Projekte**, die unterschiedlich bedient werden. **Sehen Sie zuerst in dieser Tabelle nach, welchen Weg Sie wählen**:

| Ihre Hardware | Weg | Einstieg |
|---|---|---|
| **Kompletter XLeRobot** (beide Arme + Fahrgestell) | ✅ **Dieser Teil** | Beispielskripte unter `examples/` |
| **Einzelner SO-101 / SO-100 Arm** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*`-Kommandozeile |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*`-Kommandozeile |

**Warum zwei Wege**: Die Kommandozeilen-Werkzeuge `lerobot-calibrate`, `lerobot-record`, `lerobot-teleoperate`
**kennen nur die Roboter-Typen, die sie explizit importieren** (14 Original-Roboter, **`xlerobot` ist nicht dabei**).
Erzwingt man die Angabe dennoch, erscheint:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**Der Einstieg bei XLeRobot sind die Beispielskripte unter `examples/`** (sie importieren `XLerobot` direkt).

Beide Wege **nutzen dieselbe Umgebung** – Sie können jederzeit wechseln, ohne irgendetwas neu zu installieren.

> Die Beispieldateien erwähnen zwar die Verwendung mit zwei Prozessen (host/client), doch **dieser Teil ist auskommentiert**;
> tatsächlich läuft der **Direktverbindungsmodus** – ein Terminal genügt, ein separater Host ist nicht nötig.

---

## 1. Vor der ersten Teleoperation: zwei X11-Bibliotheken installieren ⚠️

Im Image fehlen zwei X11-Bibliotheken; **ohne Installation stürzt das rerun-Visualisierungsfenster ab**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**Der Roboter selbst ist nicht betroffen** (Teleoperation läuft normal weiter, die Tasten reagieren), nur das Visualisierungsfenster
fehlt, und außerdem verstopft der Datenkanal von rerun mit WARN-Meldungen und bremst so die Teleoperation aus.

**Öffnen Sie ein zweites Terminal** und installieren Sie die Pakete im Container:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root` darf nicht fehlen** – das Image läuft standardmäßig als Benutzer `jetson`, und `docker exec` startet
standardmäßig unter derselben Identität; das Installieren von apt-Paketen erfordert jedoch Root-Rechte. Ohne diesen Parameter erscheint:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

Und die **Pakete werden stillschweigend gar nicht installiert**, rerun stürzt weiterhin ab, und man hält die Installation leicht fälschlich für wirkungslos.

Starten Sie anschließend **das Teleoperationsskript neu** (mit `Ctrl+C` beenden und erneut ausführen).

> ⚠️ Diese Änderung **gilt nur für die laufende Sitzung** – der Container läuft mit `--rm` und ist nach dem Beenden weg,
> daher muss bei jedem Neustart des Containers neu installiert werden.

---

## 2. Serielle Schnittstelle finden

```bash
lerobot-find-port
```

Das Tool fordert Sie auf, das Servokabel abzuziehen und wieder anzustecken, und gibt dann den Namen der seriellen Schnittstelle aus (zum Beispiel `/dev/ttyACM0`).

> Dieser Befehl ist **interaktiv**; ein direktes `--help` endet mit einem EOF-Fehler – das ist normal.

**XLeRobot verwendet zwei serielle Schnittstellen** (entsprechend `port1` und `port2` in der Konfiguration):

| Parameter | Standardwert | Angeschlossen |
|---|---|---|
| `port1` | `/dev/ttyACM0` | Beide SO-101-Arme + Kopfkamera |
| `port2` | `/dev/ttyACM1` | Servos des Fahrgestells (Räder) |

Beide müssen ermittelt werden. Die Standardwerte sind `/dev/ttyACM0` und `/dev/ttyACM1`; **weichen die tatsächlichen Ports davon ab,
müssen Sie sie bei jedem späteren Befehl über `--robot.port1=` / `--robot.port2=` angeben** (siehe Abschnitt 6).

---

## 3. Kalibrierung: wird beim Ausführen der Beispiele automatisch ausgelöst – kein separater Befehl nötig

⚠️ **Verwenden Sie nicht `lerobot-calibrate --robot.type=xlerobot`**. Dieses Kommandozeilen-Werkzeug kennt nur die
Roboter, die es explizit importiert (so100/so101/lekiwi usw.); die XLeRobot-Konfiguration **steht nicht auf dieser Liste**,
und es erscheint `invalid choice: 'xlerobot'`.

Die Kalibrierung von XLeRobot ist **in `XLerobot.connect()` integriert** und startet automatisch, sobald Sie ein beliebiges Beispiel ausführen:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Was dabei passiert:**

- **Keine Kalibrierungsdatei vorhanden** → die geführte Kalibrierung startet automatisch:
  1. Aufforderung: „Die Servos des linken Arms und des Kopfes in die Mitte ihres Bewegungsbereichs bringen und Enter drücken“
  2. Danach: „Jedes Gelenk nacheinander über den gesamten Bewegungsbereich führen; Enter beendet den Vorgang“
  3. Für den rechten Arm und das Fahrgestell gilt dasselbe
- **Kalibrierungsdatei vorhanden** → Sie werden gefragt: Enter zum Übernehmen der Kalibrierung oder `c` eingeben, um neu zu kalibrieren

Die Kalibrierungsdateien liegen unter:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**Dieses Verzeichnis muss ins Hostsystem eingebunden (gemountet) werden**, sonst ist nach jedem Neustart des Containers eine erneute Kalibrierung nötig:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> Wenn Sie nur einen einzelnen SO-101-Arm kalibrieren möchten (nicht den gesamten XLeRobot), können Sie den Original-Befehl verwenden;
> der Typ `so101_follower` steht auf der CLI-Whitelist:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Einige Beispiele (zum Beispiel `examples/0_so100_keyboard_joint_control.py`) verwenden
> **fest im Code hinterlegte Kalibrierungswerte** statt des oben beschriebenen Ablaufs. Welcher Weg gilt, hängt von Ihrer Roboter-
> Variante und dem verwendeten Beispiel ab – werfen Sie zunächst einen Blick in die Kommentare am Anfang der jeweiligen Beispieldatei.

---

## 4. Teleoperation

**Ein Terminal genügt** (die Beispiele laufen im Direktverbindungsmodus; ein separater Host ist nicht nötig):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Beim ersten Start beginnt automatisch die geführte Kalibrierung** (ein separater Kalibrierungsbefehl ist nicht nötig):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → Bringen Sie den linken Arm und die Kopfservos in die Mitte des Bewegungsbereichs und **drücken Sie Enter**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → Führen Sie jedes Gelenk nacheinander über den gesamten Bewegungsbereich; **Enter** beendet den Vorgang
3. Für den rechten Arm und das Fahrgestell gilt dasselbe

Sobald eine Kalibrierungsdatei vorhanden ist, werden Sie gefragt: Enter zum Übernehmen oder `c` eingeben, um neu zu kalibrieren.

### Tastenbelegung

**Fahrgestell**

| Taste | Funktion |
|---|---|
| `i` / `k` | Vorwärts / Rückwärts |
| `j` / `l` | Nach links / nach rechts |
| `u` / `o` | Nach links drehen / nach rechts drehen |
| `n` / `m` | Schneller / langsamer (drei Stufen) |
| `b` | Programm beenden |

**Linker Arm**

| Taste | Gelenk |
|---|---|
| `q` / `e` | shoulder_pan (Drehung der Basis) ± |
| `w` / `s` | x (vor/zurück) ± |
| `a` / `d` | y (links/rechts) ± |
| `z` / `x` | pitch (Neigung) ± |
| `r` / `f` | wrist_roll (Handgelenkrotation) ± |
| `t` / `g` | gripper (Greifer) öffnen / schließen |
| `c` | Nullposition anfahren |
| `y` | Rechteckbahn abfahren (für Demo/Test) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Rechter Arm**

| Taste | Gelenk |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (vor/zurück) ± |
| `4` / `6` | y (links/rechts) ± |
| `1` / `3` | pitch (Neigung) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper öffnen / schließen |
| `0` | Nullposition anfahren |
| `Y` (**Großbuchstabe**) | Rechteckbahn abfahren |

**Sonstiges**: `?` → Kopfservos auf Nullposition zurücksetzen

> Die Arme sind **spiegelbildlich** angeordnet: links die Buchstabentasten (`q/e`, `w/a/s/d`), rechts der Ziffernblock
> (`7/9`, `4/6`, `8/2`, `1/3`). Auch die Taste `reset` unterscheidet sich – linker Arm `c`, rechter Arm `0`.
> Beachten Sie: Die Rechteckbahn-Taste ist am linken Arm das kleine `y`, am rechten Arm das **große** `Y`.

### Weitere Beispiele

| Beispiel | Beschreibung | Zusätzliche Installation nötig? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | Zweirad-Fahrgestell-Variante | Nein (die beiden Bibliotheken sind ebenfalls zuerst zu installieren) |
| `5_xlerobot_teleop_xbox.py` | Xbox-Controller | `pip install "lerobot[gamepad]"` erforderlich |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | Das Modul `joyconrobotics` fehlt – nicht nutzbar |
| `8_xlerobot_teleop_vr.py` | VR | Das Verzeichnis XLeVR muss zusätzlich eingebunden werden |

---

## 5. Demonstrationsdaten aufzeichnen

⚠️ `lerobot-record --robot.type=xlerobot` **funktioniert nicht** (aus demselben Grund wie in Abschnitt 0).

XLeRobot bietet zum Aufzeichnen nur den Weg über VR, und der hängt vom Modul `XLeVR` ab, das nicht im Image enthalten ist.

**Wenn Sie es brauchen, müssen Sie selbst ein Skript schreiben** – mit der LeRobotDataset-API (die Bibliothek ist im Image enthalten):

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<benutzername>/<datensatzname>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# In der Teleoperations-Schleife:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # Muss aufgerufen werden, sonst werden die Metadaten nicht gespeichert
```

Orientieren Sie sich an `examples/8_vr_teleop_with_dataset_recording.py` im Image
und ersetzen Sie den VR-Teil durch die Tastatur-Teleoperation.

**Denken Sie an `-e HF_ENDPOINT=https://hf-mirror.com`**, sonst schlägt das Hochladen des Datensatzes auf den Hub fehl.

> Beim Schreiben von Datensätzen gibt es eine Stolperfalle: Nach `save_episode()` **muss unbedingt `ds.finalize()` aufgerufen werden**,
> sonst werden die Episode-Metadaten nicht auf die Festplatte geschrieben und lassen sich später nicht mehr einlesen (Fehlermeldung:
> `Provided directory does not contain any parquet file`).

---

## 6. Was tun, wenn die seriellen Schnittstellen nicht ACM0/ACM1 sind

Die Beispiele **verwenden kein argparse**; für die seriellen Schnittstellen gelten die Standardwerte von `XLerobotConfig()`:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Ändern Sie den Code so, dass die Ports explizit angegeben werden:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Führen Sie das Skript danach einfach erneut aus (der Quellcode ist eingebunden; Änderungen an Dateien auf dem Hostsystem wirken sofort).

---

## 7. Trainierte Modelle bereitstellen

Die ACT-Policy **benötigt keine zusätzlichen Abhängigkeiten** und lässt sich im Image direkt verwenden:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<benutzername>/<modellname>")
policy.eval()

# Nach dem Anschließen des Roboters: Inferenz in einer Schleife
# action = policy.select_action(batch)
```

Die im Image bereits vorinstallierten Policies:

| Policy | Abhängigkeit | Hinweis |
|---|---|---|
| **ACT** | keine | Am gebräuchlichsten, in der Praxis bewährt |
| **Diffusion** | `diffusers` | Erfordert das vollständige Image |
| SmolVLA / pi0 / groot | transformers | **Nicht vorinstalliert** – die Pakete sind sehr groß und laufen auf der CPU nicht |

> In einem Prozess **können nicht zwei Roboter-Varianten gleichzeitig importiert werden** – `xlerobot_mecanum`
> registriert seine Konfiguration als `"xlerobot"` und kollidiert damit mit der Basisvariante; es erscheint
> `Cannot register ... already registered`. Ein Roboter verwendet nur eine Variante –
> getrennte Prozesse sind kein Problem.

---

## 8. Training

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<benutzername>/<datensatzname>
```

> `lerobot-train` **benötigt kein `robot.type`** (es verarbeitet nur Datensatz und Policy-Typ),
> daher funktioniert dieser Befehl und unterliegt nicht der Einschränkung aus Abschnitt 0.
>
> Training ist sehr rechenintensiv. Auf der CPU sind nur sehr kleine Umfänge möglich; für den praktischen Einsatz ist die GPU des Jetson erforderlich.

---

> **Weiter**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md) – bei Problemen hier nachschlagen
> **Der andere Weg**: [lerobot/](../lerobot/01-Operation.md) (einzelnen Arm / LeKiwi mit der `lerobot-*`-Kommandozeile betreiben)
