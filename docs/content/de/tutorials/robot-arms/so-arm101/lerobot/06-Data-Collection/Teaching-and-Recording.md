---
title: "Schritt 6: Datensatz durch Demonstration erfassen"
description: "Erklärt das Erfassen eines Datensatzes durch Demonstration mit einer oder zwei Kameras, die Tastensteuerung während der Aufnahme und die Speicherordner."
---

# Schritt 6: Datensatz durch Demonstration erfassen

## Platzhalter in den Befehlen — bitte zuerst durch Ihre eigenen Informationen ersetzen

Das Tutorial beschreibt allgemeine Vorgehensweisen, deshalb werden ab diesem Schritt in den Befehlen zwei Platzhalter verwendet, die Informationen repräsentieren, die nur Sie haben. Bitte ersetzen Sie sie gemäß den folgenden Erläuterungen und entfernen Sie dabei **auch die spitzen Klammern**：

| Platzhalter | Was er repräsentiert | Wie ersetzen |
|---|---|---|
| `<Benutzername>` | Der Systembenutzername Ihres Computers, also der Name des Home-Verzeichnisses | Geben Sie im Terminal `whoami` ein, um ihn zu sehen |
| `<Benutzername>` | Ihr HuggingFace-Kontoname | Nach dem Anmelden bei HuggingFace sehen Sie den Kontonamen neben dem Avatar oben rechts |

Ein Beispiel. Angenommen, die Ausgabe von `whoami` im Terminal ist `zhangsan` und Ihr HuggingFace-Kontoname ist ebenfalls `zhangsan`, dann

- `/Users/<Benutzername>/.cache/huggingface/lerobot/<Benutzername>/` sollte dann als `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/` geschrieben werden
- `<Benutzername>/lerobot_my_dataset_a` sollte dann als `zhangsan/lerobot_my_dataset_a` geschrieben werden

> Die beiden Platzhalter in allen nachfolgenden Befehlen werden ebenfalls auf dieselbe Weise ersetzt.

> **Achtung**：Der erste Befehl unten ist `sudo rm -rf` und dient zum Löschen von Verzeichnissen. Vergewissern Sie sich unbedingt, dass der Pfad durch Ihren eigenen ersetzt wurde, bevor Sie die Eingabetaste drücken.

## Vorhandenen gleichnamigen Datensatz löschen (falls vorhanden)

```Shell
sudo rm -rf /Users/<Benutzername>/.cache/huggingface/lerobot/<Benutzername>/lerobot_my_dataset_a
```

## Eine Kamera, Datensatz erfassen-Mac-Computer

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<Benutzername>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Zwei Kameras, Datensatz erfassen-Mac-Computer

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<Benutzername>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Bei der Erfassung

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

Bedienung über die Pfeiltasten der Tastatur：
→ (Pfeil rechts) Bricht das aktuelle episode vorzeitig ab; weiter zum nächsten episode.
← (Pfeil links) Verwirft das aktuelle episode; nimmt neu auf.
ESC: sofortiger Stopp, Videos werden kodiert und der Datensatz wird hochgeladen.

## Erfassung abgeschlossen, Speicherverzeichnis des Datensatzes

```Shell
/Users/<Benutzername>/.cache/huggingface/lerobot/<Benutzername>/lerobot_my_dataset_a
```

## Handschlag

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<Benutzername>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

Nach Abschluss der Erfassung wird der Handschlag-Datensatz gespeichert unter：

```Shell
/Users/<Benutzername>/.cache/huggingface/lerobot/<Benutzername>/lerobot_my_dataset_shake_hands
```

## Zu den beiden Datensätzen im Tutorial

In diesem Artikel werden zwei Aufgaben demonstriert, die jeweils unterschiedlichen Zwecken dienen：

- **Orangen greifen `lerobot_my_dataset_a`**：entspricht den beiden Erfassungsbefehlen „Eine Kamera“ und „Zwei Kameras“ weiter oben und ist auch das Beispiel, das im Artikel [Lokales Training unter Ubuntu](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu) verwendet wird
- **Handschlag `lerobot_my_dataset_shake_hands`**：entspricht dem Befehl „Handschlag“ weiter oben. Vom Training in Schritt 7 bis zum Deployment in Schritt 8 verwendet das Tutorial durchgängig dieses Beispiel, deshalb sehen Sie, dass im Trainingsbefehl sowohl `--dataset.repo_id` als auch `--dataset.root` darauf verweisen

Das heißt, **der Handschlag-Datensatz ist das durchgängige Beispiel für die zweite Hälfte des Tutorials**; erfassen Sie ihn entsprechend. Die Parameter `--dataset.num_episodes=30`, `--dataset.episode_time_s=12` und weitere im Befehl können Sie an Ihre eigene Aufgabe anpassen.

## Einige Punkte, die bei der Erfassung zu beachten sind

- Der Führungsarm darf nicht im Bild erscheinen, sonst lernt das Modell den Führungsarm als Merkmal mit; Einzelheiten siehe [Hinweise zum Erfassen von Datensätzen](/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- Stellen Sie das Objekt nach jeder Erfassungsrunde wieder an den Startpunkt zurück, und halten Sie die Bewegungen möglichst konsistent; die Konsistenz des Datensatzes ist wichtiger als die Menge
- **Die Kameraparameter (Auflösung, fps, Seitenverhältnis) bei der Erfassung und bei der Inferenz müssen vollständig identisch sein**. Die Auflösung wird in die Metadaten des Datensatzes geschrieben und beim Training und bei der Inferenz geprüft; bei Abweichungen gibt es direkt einen Fehler. Selbst ohne Fehler bedeutet eine unterschiedliche Auflösung ein anderes Sichtfeld (Aufnahmebereich), und die Welt, die das Modell sieht, passt nicht zu der bei Ihrer Demonstration. In diesem Tutorial wird einheitlich `1280×720@30` verwendet; wenn Sie einen anderen Wert möchten, müssen die drei Befehle für Erfassung, Teleoperation und Deployment gemeinsam geändert werden
- Beim vorzeitigen Beenden sollten Sie nicht in der reset-Phase stehen bleiben, sonst schlägt das Speichern dieser Runde fehl, weil kein einziger Frame vorhanden ist (bereits erfasste Daten sind nicht betroffen)
- Wenn Sie nach einem vorzeitigen Beenden weiter erfassen möchten, verwenden Sie `--resume=true`, und `--dataset.root` sowie `--dataset.repo_id` müssen mit dem ersten Mal vollständig identisch sein

## Nach Abschluss der Erfassung

Die Daten werden standardmäßig unter `~/.cache/huggingface/lerobot/<Benutzername>/` gespeichert. Als Nächstes：

1. Wenn Sie den Datensatz in der Cloud sichern möchten, siehe [Datensatz auf HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. Wenn Sie mit dem Training beginnen möchten, lesen Sie weiter bei [Schritt 7：Modell trainieren](/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); dort wird zuerst gezeigt, wie Sie die Daten auf die Cloud-GPU-Plattform hochladen und die Umgebung einrichten

<RelatedProducts slugs="so-arm101" />
