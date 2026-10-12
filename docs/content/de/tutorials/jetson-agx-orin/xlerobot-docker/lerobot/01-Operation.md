---
title: Original-LeRobot-Befehle
---

# Original-LeRobot-Befehle

> **Gehört zu**: [lerobot/](01-Operation.md) – einzelner SO-101 / SO-100 Arm, LeKiwi
> **Voraussetzung**: Sie haben [deployment/](../deployment/01-Overview.md) vollständig gelesen und sind im Container
> **Der andere Weg**: [xlerobot/](../xlerobot/01-Operation.md) (kompletter XLeRobot)
> **Weiter**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Bedienen Sie einen **einzelnen SO-101 / SO-100 Arm** oder einen **LeKiwi** über die `lerobot-*`-Kommandozeile.

> ⚠️ Für den **kompletten XLeRobot** gehen Sie zurück zu [xlerobot/](../xlerobot/01-Operation.md).
> Diese Kommandozeilen-Werkzeuge **unterstützen kein `xlerobot`** – die Gründe stehen in Abschnitt 0.

---

## 0. Wann Sie diesen Weg wählen

| Ihre Hardware | Weg | Warum |
|---|---|---|
| **Einzelner SO-101 / SO-100 Arm** | ✅ **Dieser Teil** (`lerobot-*`-CLI) | Von den Original-Werkzeugen direkt unterstützt |
| **LeKiwi** | ✅ **Dieser Teil** (`lerobot-*`-CLI) | Von den Original-Werkzeugen direkt unterstützt |
| **Kompletter XLeRobot** (beide Arme + Fahrgestell) | ❌ Gehen Sie zu [04](../xlerobot/01-Operation.md) | `xlerobot` steht nicht auf der CLI-Whitelist |

**Warum zwei Wege**: Kommandozeilen-Werkzeuge wie `lerobot-calibrate` enthalten im Quellcode eine fest
verdrahtete Roboter-Importliste (14 Original-Roboter, vollständige Liste in Abschnitt 11), **`xlerobot` ist nicht dabei**.
Erzwingt man die Angabe dennoch, erscheint:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

Umgekehrt sind die Skripte unter `examples/` für den kompletten XLeRobot geschrieben und für einen einzelnen Arm nutzlos.

**Beide Wege nutzen dieselbe Umgebung** – das im Image installierte Paket heißt schlicht `lerobot`, XLeRobot fügt nur
drei zusätzliche Code-Dateien im Verzeichnis `robots/` hinzu. Daher **können Sie jederzeit wechseln, ohne irgendetwas
neu zu installieren**, und beide lassen sich im selben Prozess gemeinsam importieren.

---

## 1. Der komplette Ablauf

```
Vorbereitung   Kalibrierung   Nutzung                 Training      Deployment
────────────   ────────────   ──────                  ────          ────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

Pro Schritt ein Befehl – unten werden alle einzeln erklärt.

---

## 2. Vorbereitung: serielle Schnittstelle und Kamera finden

```bash
lerobot-find-port          # Interaktiv: Servokabel nach Aufforderung abziehen und wieder anstecken, dann wird der Name der Schnittstelle ausgegeben
lerobot-find-cameras opencv   # Kameras der Reihe nach testen und Screenshots aufnehmen
```

`lerobot-find-cameras` speichert die Screenshots unter `outputs/captured_images/`; sobald ein Bild erscheint,
ist die Kamera nutzbar. **In der Praxis bewährt** (erkennt `/dev/video0` und nimmt erfolgreich Bilder auf).

> Beide Befehle sind **interaktiv**; ein direktes `--help` endet mit einem EOF-Fehler – das ist normal.

---

## 3. Erste Verwendung neuer Servos: IDs schreiben

Fabrikneue Servos haben alle die Werks-ID 1 und müssen einzeln auf 1~6 geändert werden, damit sie am selben Bus betrieben werden können:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

Das Tool fordert Sie auf, „nur einen Servo anzuschließen und Enter zu drücken“; nach jeder Änderung schließen Sie den nächsten an.

> Nur bei frisch zusammengebauten oder ausgetauschten Servos nötig. Arme, die bereits normal kommunizieren, überspringen diesen Schritt.

---

## 4. Kalibrierung

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **Keine Kalibrierungsdatei vorhanden** → die geführte Kalibrierung startet: den Arm zuerst in die Mitte des Bewegungsbereichs bringen und Enter drücken, dann jedes Gelenk über den gesamten Bewegungsbereich führen
- **Kalibrierungsdatei vorhanden** → Sie werden gefragt, ob übernommen oder neu kalibriert werden soll

Die Kalibrierungsdatei liegt unter `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**Beim Start des Containers wird `-v ~/.cache/huggingface` eingebunden** (siehe [03-Deployment](../deployment/03-Deployment.md)),
daher geht sie beim Neustart des Containers nicht verloren.

Bei einem Leader-Follower-Armpaar werden Follower- und Leader-Arm **je einmal kalibriert**:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Teleoperation

### Den Follower-Arm mit dem Leader-Arm führen (Leader-Follower-Modus)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### Kein Leader-Arm? Verwenden Sie die Tastatur

In `--teleop.type` gibt es den Typ `keyboard` – eine zweite Hardware ist nicht nötig:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

Alternativ lässt sich über `--teleop.type=gamepad` ein Xbox-Controller anschließen (erfordert `pip install "lerobot[gamepad]"`).

### Mit Kamera und Bildanzeige

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> Für die rerun-Visualisierung müssen ebenfalls zuerst die beiden X11-Bibliotheken installiert werden, siehe
> [xlerobot/](../xlerobot/01-Operation.md) Abschnitt 1.

---

## 6. Demonstrationsdaten aufzeichnen

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<benutzername>/mein-erster-datensatz \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**Parameterbeschreibung:**

| Parameter | Zweck |
|---|---|
| `--robot.cameras` | Kamera-Konfiguration, **verschachtelte Dictionary-Syntax**, `Name: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | ID des Datensatzes auf Hugging Face (nach der lokalen Aufzeichnung kann er auch hochgeladen werden) |
| `--dataset.num_episodes` | Wie viele Episoden aufgezeichnet werden |
| `--dataset.single_task` | Aufgabenbeschreibung, wird beim Training verwendet |
| `--dataset.root` | Ergänzen Sie diesen Parameter, um in ein anderes Verzeichnis zu speichern; standardmäßig liegt der Datensatz im Cache-Verzeichnis |

**Tasten während der Aufzeichnung** (das Terminal zeigt sie an):

| Taste | Funktion |
|---|---|
| `→` (Pfeiltaste rechts) | Die aktuelle Episode vorzeitig beenden und in die Reset-Phase übergehen |
| `←` (Pfeiltaste links) | Die aktuelle Episode verwerfen und diese Aufnahme wiederholen |
| `Esc` | Die gesamte Aufzeichnung stoppen |

Nach der Aufzeichnung ist der Datensatz lokal sofort nutzbar. Zum Hochladen auf den Hub:

```bash
--dataset.push_to_hub=true
```

(Denken Sie daran, dass beim Start des Containers `-e HF_ENDPOINT=https://hf-mirror.com` gesetzt sein muss.)

---

## 7. Wiedergabe zur Kontrolle

Spielen Sie die Aufzeichnung zuerst einmal ab, um die Daten zu prüfen, bevor Sie trainieren:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<benutzername>/mein-erster-datensatz \
  --dataset.episode=0
```

---

## 8. Training

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<benutzername>/mein-erster-datensatz
```

> `lerobot-train` **benötigt kein `robot.type`** (es verarbeitet nur Datensatz und Policy-Typ),
> daher wird dieser Befehl mit dem XLeRobot-Weg **gemeinsam genutzt** – auch Ihre XLeRobot-Daten lassen sich so trainieren.
>
> Training ist sehr rechenintensiv. Auf der CPU sind nur sehr kleine Umfänge möglich; für den praktischen Einsatz ist die GPU des Jetson erforderlich.

Optionale Policies (`--policy.type`): `act` (am gebräuchlichsten), `diffusion`, `smolvla`,
`pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet` usw.

---

## 9. Deployment auf echter Hardware: eine trainierte Policy ausführen

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<benutzername>/<modellname> \
  --strategy.type=base
```

| Parameter | Beschreibung |
|---|---|
| `--policy.path` | Das trainierte Modell (ID auf dem Hub oder lokaler Pfad) |
| `--strategy.type` | `base` ist am gebräuchlichsten; außerdem gibt es `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync` (Standard) oder `rtc` |

> ⚠️ **Verwenden Sie `lerobot-eval` nicht für echte Hardware** – es ist für **Simulations-Benchmarks** gedacht
> (`--env.type=aloha/pusht/libero/metaworld...`), nicht für das Deployment auf echter Hardware. Auf echter Hardware
> verwenden Sie `lerobot-rollout`.

---

## 10. Gesamttabelle der Kommandozeilen-Werkzeuge

| Befehl | Zweck | `robot.type` nötig? |
|---|---|---|
| `lerobot-find-port` | Serielle Schnittstelle suchen | Nein |
| `lerobot-find-cameras` | Kamera suchen | Nein |
| `lerobot-setup-motors` | Neuen Servos IDs schreiben | Ja |
| `lerobot-calibrate` | Kalibrierung | Ja |
| `lerobot-teleoperate` | Teleoperation | Ja |
| `lerobot-record` | Datensatz aufzeichnen | Ja |
| `lerobot-replay` | Daten wiedergeben | Ja |
| `lerobot-train` | Policy trainieren | **Nein** (gemeinsam mit XLeRobot) |
| `lerobot-rollout` | Policy auf **echter Hardware** ausführen | Ja |
| `lerobot-eval` | **Simulations**-Benchmark-Evaluation | Nein (nutzt `--env.type`) |
| `lerobot-edit-dataset` | Datensatz bearbeiten | Nein |
| `lerobot-dataset-viz` | Datensatz visualisieren | Nein |
| `lerobot-info` | Umgebungs- und Versionsinformationen ausgeben | Nein |

---

## 11. Von der CLI unterstützte Roboter-Typen (vollständige Liste)

Dies sind alle Typen, die die `lerobot-*`-Kommandozeile **tatsächlich erkennt** (aus der Whitelist im Quellcode ausgelesen).
**`xlerobot` ist nicht dabei** – genau deshalb gibt es die beiden Wege.

**Roboter (`--robot.type`) – 14 Stück:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Teleoperatoren (`--teleop.type`) – unter anderem:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> Maßgeblich ist die vollständige Liste in der `--help`-Ausgabe Ihres eigenen Images; je nach Version kommen Einträge hinzu oder entfallen.

---

## 12. Ein vollständiges Beispiel (von null bis lauffähig)

```bash
# 1. Geräte suchen
lerobot-find-port                          # Serielle Schnittstelle notieren, unten wird /dev/ttyACM0 verwendet
lerobot-find-cameras opencv                # Kamera notieren, unten wird /dev/video0 verwendet

# 2. Neuen Servos IDs schreiben (nur bei frisch zusammengebauten Armen nötig)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. Kalibrierung
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. Mit der Tastatur testen, ob er sich bewegt
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. 10 Episoden aufzeichnen
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<benutzername>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. Training
lerobot-train --policy.type=act --dataset.repo_id=<benutzername>/my-first-dataset

# 7. Den Roboterarm autonom laufen lassen
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<benutzername>/my-first-dataset --strategy.type=base
```

---

## Verifikationsstand

Alle Befehle dieses Teils wurden im Image `chenyang310/xlerobot:jetson` unter JetPack 7.2 **tatsächlich ausgeführt**:

| Punkt | Ergebnis |
|---|---|
| Argument-Parsing der 14 Original-`--robot.type` | ✅ Bestanden |
| Argument-Parsing von `--teleop.type` (inkl. `keyboard`) | ✅ Bestanden |
| `lerobot-calibrate`, kompletter Durchlauf | ✅ Läuft bis zum Öffnen der seriellen Schnittstelle (damals war kein Servo angeschlossen) |
| `lerobot-teleoperate --teleop.type=keyboard`, kompletter Durchlauf | ✅ Wie oben |
| `lerobot-find-cameras opencv` | ✅ **Echte Hardware**: erkennt `/dev/video0` und nimmt erfolgreich Bilder auf |
| Parsing der verschachtelten `--robot.cameras`-Syntax | ✅ Bestanden |
| Original-Roboter und XLeRobot **im selben Prozess** | ✅ 8 Typen wurden gleichzeitig erfolgreich registriert |

Da kein Roboterarm angeschlossen war, **steht die Verifikation auf Aktionsebene noch aus**. Sobald Sie einen SO-101
angeschlossen haben, gehen Sie Abschnitt 12 einmal durch und sagen Sie uns, welcher Schritt nicht funktioniert.

---

> **Weiter**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md) – bei Problemen hier nachschlagen
