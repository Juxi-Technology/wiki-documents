---
title: Fehlerbehebung und Schnellreferenz
---

# Fehlerbehebung und Schnellreferenz

> **Gehört zu**: [troubleshooting/](01-Troubleshooting.md)
> **Siehe auch**: [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Häufige Probleme

### Die serielle Schnittstelle des Roboters ist im Container nicht sichtbar

```bash
# Auf dem Hostsystem prüfen, ob das Gerät vorhanden ist
ls /dev/ttyACM*
# Prüfen, ob der Benutzer in der Gruppe dialout ist
groups | grep dialout
```

Falls Sie nicht in der Gruppe sind: `sudo usermod -aG dialout $USER` ausführen und danach **erneut anmelden**.

### Image-Download bleibt hängen / Timeout

Der Registry-Mirror ist nicht eingerichtet. Siehe [02-Environment-Setup](../deployment/02-Environment-Setup.md) Abschnitt 2.

### Modelldownload schlägt fehl / keine Verbindung zu Hugging Face

`-e HF_ENDPOINT=https://hf-mirror.com` konfigurieren.
Siehe [02-Environment-Setup](../deployment/02-Environment-Setup.md) Abschnitt 4.

### Das rerun-Visualisierungsfenster stürzt ab

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Es fehlen X11-Bibliotheken. **Der Roboter selbst ist nicht betroffen**, nur das Fenster fehlt.
Den Installationsbefehl und die Hinweise finden Sie in [xlerobot/](../xlerobot/01-Operation.md) Abschnitt 1 –
entscheidend ist, dass `docker exec` **unbedingt mit `-u root` ausgeführt wird**.

### `torch.cuda.is_available()` ist im Container False

Die GPU ist zwingend erforderlich, daher ist das immer ein Konfigurationsproblem – prüfen Sie beides:

- Sie haben den Container mit `--device nvidia.com/gpu=all` gestartet – **nicht mit `--runtime nvidia`**,
  das die Geräteknoten nicht einfügt
- Die CDI-Spezifikation existiert auf dem Hostsystem (`/etc/cdi/nvidia.yaml`) – siehe
  [03-Deployment §4](../deployment/03-Deployment.md)

### Der Container startet nicht und meldet einen CDI-Fehler

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

Ein automatischer Aktualisierungsdienst auf dem Hostsystem hat eine Spezifikation erzeugt, die das nicht vorhandene Gerät `card0` referenziert. Behebung:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(Dieses Problem tritt bei jedem Neustart erneut auf.)

### Die Kalibrierung muss jedes Mal erneut durchgeführt werden

Die Kalibrierungsdateien liegen im Container und verschwinden mit ihm, sobald er gelöscht wird. Binden Sie beim Start das Cache-Verzeichnis ein:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` erledigt das bereits.

### Der Kalibrierungsbefehl meldet `invalid choice: 'xlerobot'`

Das ist kein Fehler, sondern so gewollt. Das Kommandozeilen-Werkzeug `lerobot-calibrate` unterstützt XLeRobot nicht;
die Kalibrierung wird automatisch in den Beispielskripten ausgelöst. Siehe [xlerobot/](../xlerobot/01-Operation.md) Abschnitte 0 und 3.

### Bei Datensatz-Operationen erscheint eine Flut von torchcodec-Fehlermeldungen

Wenn Sie eine **selbst installierte** Umgebung statt des Images verwenden, sehen Sie möglicherweise
`libnvrtc.so.13: cannot open shared object file`. Ursache: torchcodec lässt sich in einer reinen CPU-
Umgebung nicht laden, lerobot weicht automatisch auf pyav aus, die Funktionalität ist nicht beeinträchtigt.
Im Image wurde torchcodec entfernt, daher tritt diese Meldung dort nicht auf.

### Der `import` zweier Roboter-Varianten im Container schlägt fehl

```
Cannot register ... as xlerobot because ... is already registered
```

Tritt nur **zwischen dem einen Paar `xlerobot` und `xlerobot_mecanum`** auf – beide registrieren sich im Quellcode
als `"xlerobot"` (die Konfiguration der mecanum-Variante wurde kopiert, der Registrierungsname blieb unverändert);
das ist ein Bug im XLeRobot-Upstream.

**Alle anderen Kombinationen kollidieren nicht**: Alle Roboter des Original-LeRobot + XLeRobot können **im selben Prozess koexistieren**
(gemessen: 8 Typen wurden gleichzeitig erfolgreich registriert), `xlerobot_2wheels` kollidiert ebenfalls nicht.

Ein Roboter verwendet nur eine Variante, daher ist der praktische Einsatz nicht beeinträchtigt. Wenn Sie wirklich beide
gleichzeitig nutzen müssen (zum Beispiel für ein Vergleichsskript), führen Sie getrennte Prozesse aus.

---

## Probleme mit den Original-`lerobot-*`-Befehlen

### `lerobot-record` meldet einen Kamera-Fehler / die aufgezeichneten Daten enthalten keine Bilder

Die Kamera muss über `--robot.cameras` als **verschachteltes Dictionary** übergeben werden, nicht als eigener Parameter auf oberster Ebene:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Beachten Sie: Es heißt `index_or_path` (nicht `index`); `front` ist der Name der Kamera, mehrere Kameras sind möglich.
Ein vollständiges Beispiel finden Sie in [lerobot/](../lerobot/01-Operation.md) Abschnitt 6.

### `lerobot-eval` funktioniert auf echter Hardware nicht

`lerobot-eval` ist für **Simulations-Benchmarks** gedacht (`--env.type=aloha/pusht/libero/metaworld...`),
**nicht für das Deployment auf echter Hardware**.

Zum Ausführen einer trainierten Policy auf echter Hardware verwenden Sie **`lerobot-rollout`**:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> --strategy.type=base
```

### Unklar, ob `examples/` oder `lerobot-*` verwendet werden soll

| Ihre Hardware | Was verwenden |
|---|---|
| Kompletter XLeRobot (beide Arme + Fahrgestell) | `examples/`-Skripte → [xlerobot/](../xlerobot/01-Operation.md) |
| Einzelner SO-101 / SO-100 Arm, LeKiwi | `lerobot-*`-Kommandozeile → [lerobot/](../lerobot/01-Operation.md) |

Das Kriterium ist einfach: Auf der Roboter-Whitelist von `lerobot-*` steht **kein `xlerobot`** (die vollständige Liste finden Sie in
[lerobot/](../lerobot/01-Operation.md) Abschnitt 11).

### `--robot.type` angegeben, aber es kommt `invalid choice`

Vergleichen Sie mit der vollständigen Liste in [lerobot/](../lerobot/01-Operation.md) Abschnitt 11 –
nur die 14 Original-Typen sind möglich. `xlerobot` ist nicht dabei; dafür verwenden Sie die `examples/`-Skripte.

---

## Schnellreferenz

### Allgemein (beide Wege)

```bash
# Image herunterladen
docker pull chenyang310/xlerobot:jetson

# Starten
bash scripts/run.sh jetson

# Im Container – Ersteinrichtung
lerobot-find-port                     # Serielle Schnittstelle suchen (interaktiv, Servokabel nach Aufforderung abziehen und wieder anstecken)

# Die beiden für rerun benötigten X11-Bibliotheken installieren (zweites Terminal öffnen, -u root darf nicht fehlen)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# Training (beide Wege nutzen ihn gemeinsam: robot.type ist nicht nötig)
lerobot-train --policy.type=act --dataset.repo_id=<username>/<dataset-name>

# Selbsttest
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot (beide Arme + Fahrgestell)

```bash
# Teleoperation: ein Terminal genügt, beim ersten Mal startet automatisch die geführte Kalibrierung
python examples/4_xlerobot_teleop_keyboard.py

# Zweirad-Fahrgestell-Version
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ Verwenden Sie lerobot-calibrate / lerobot-record / lerobot-teleoperate nicht mit xlerobot –
#    es steht nicht auf der Whitelist, es kommt nur invalid choice. XLeRobot läuft über die examples/-Skripte.
```

Details siehe [xlerobot/](../xlerobot/01-Operation.md).

### B · Einzelner SO-101 / LeKiwi (`lerobot-*`-Kommandozeile)

```bash
# Geräte suchen
lerobot-find-port
lerobot-find-cameras opencv

# Neuen Servos IDs schreiben (nur bei frisch zusammengebauten Armen nötig)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# Kalibrierung
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# Teleoperation (Tastatur, kein Leader-Arm nötig)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# Datensatz aufzeichnen
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<username>/<dataset-name> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# Wiedergabe zur Kontrolle
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<username>/<dataset-name> --dataset.episode=0

# Trainierte Policy auf echter Hardware ausführen (⚠️ nicht lerobot-eval, das ist für die Simulation)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<username>/<model-name> --strategy.type=base
```

Details siehe [lerobot/](../lerobot/01-Operation.md).

### Tasten-Kurzübersicht

| Bereich | Tasten | Funktion |
|---|---|---|
| Fahrgestell | `i` `k` `j` `l` | vor / zurück / links / rechts |
| Fahrgestell | `u` `o` `n` `m` | links drehen / rechts drehen / schneller / langsamer |
| Fahrgestell | `b` | Beenden |
| Linker Arm | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Linker Arm | `r/f` `t/g` `c` `y` | wrist / Greifer / Nullstellung / Rechteckbahn |
| Linker Arm | `<` `>` `,` `.` | Kopfservo 1 / 2 |
| Rechter Arm | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Rechter Arm | `/` `*` `+` `-` `0` | wrist / Greifer / Nullstellung |
| Rechter Arm | `Y` (**Großbuchstabe**) | Rechteckbahn |
| Sonstiges | `?` | Kopf auf Nullstellung |

Die vollständige Beschreibung finden Sie in [xlerobot/](../xlerobot/01-Operation.md) Abschnitt 4.

---

## Anhang: Warum die Dinge in diesem Tutorial so sind, wie sie sind

| Entscheidung | Grund |
|---|---|
| Python 3.12 ist zwingend erforderlich | lerobot 0.6.2 verwendet PEP-695-Syntax (`type X = ...`, `class Foo[T]:`); mit 3.10/3.11 lässt sich das nicht einmal kompilieren |
| In Festlandchina ist ein Registry-Mirror zwingend erforderlich | Direktverbindungen zu Docker Hub laufen in einen Timeout – gemessen: `context deadline exceeded` |
| HF_ENDPOINT muss konfiguriert werden | `huggingface.co` ist aus Festlandchina nicht erreichbar, `hf-mirror.com` funktioniert |
| Unter Jetson CDI statt `--runtime nvidia` | In der cgroup-v2-Umgebung von JetPack 6/7 fügt `--runtime nvidia` keine Geräteknoten ein |
| Die Kinematik-Bibliothek placo wird nicht installiert | Sie bietet keine Wheels für cp312/aarch64; XLeRobot verwendet die mitgelieferte analytische IK und ist nicht darauf angewiesen |

---

## Weiterführende Links

- [XLeRobot-Projekt](https://github.com/Vector-Wangel/XLeRobot)
- [Offizielle LeRobot-Dokumentation](https://huggingface.co/docs/lerobot)
- [Docker Hub: Nutzung und Limits](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Zurück zum Anfang**: [01-Overview](../deployment/01-Overview.md)
> **Der andere Weg**: [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
