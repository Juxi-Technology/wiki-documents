---
title: "Inferenz mit dem D-Robotics RDK S100"
description: "Führen Sie die Inferenz für den 7-DOF-SO-ARM101 auf dem D-Robotics RDK S100 aus – vom ONNX-Export über die Quantisierung bis zur Ausführung auf dem Board."
---

# Inferenz mit dem D\-Robotics RDK S100

Den konkreten Ablauf finden Sie unter diesem Link: [LeRobot ACT Policy – Dokumentation zum gesamten Ablauf](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## End\-to\-End\-Deployment des ACT\-Modells auf dem RDK S100/S100P

Dieser Abschnitt führt Sie durch den kompletten Deployment\-Zyklus des ACT\-Modells auf der D\-Robotics\-Hardware der RDK S100\-Serie. Der gesamte Ablauf gliedert sich in drei Kernphasen: **Modellexport**, **Quantisierung und Kompilierung** und **Ausführung auf dem Board**.

**Vorabhinweise:**

- **Entwicklungsrechner \(Host\):** Wird für Schritt 1 und Schritt 2 verwendet, in der Regel Ihr Trainingsrechner (mit guter Leistung und installiertem Docker).

- **Board\-Seite \(Edge\):** D\-Robotics RDK S100/S100P, wird für Schritt 3 verwendet.

- **Toolchain:** Dieser Artikel basiert auf dem Repository `rdk_LeRobot_tools`; Details finden Sie unter [GitHub\-Repository\-Adresse](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Wichtiger Hinweis zur Versionskompatibilität \(Pflichtlektüre\):** Der ONNX\-Exportablauf der aktuellen Version von `rdk_LeRobot_tools` ist vollständig kompatibel mit **LeRobot datasets v2\.1**. Da in der neuesten Version v3\.0 die Datenstruktur geändert wurde, wird **dringend empfohlen**, das ursprüngliche `lerobot`\-Hauptrepository vor den Arbeiten in diesem Kapitel auf einen bestimmten, mit v2\.1 kompatiblen Commit umzuschalten, damit der Exportablauf reibungslos funktioniert.

*Empfohlene Commit\-ID:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Phase 1: Modellexport im ONNX\-Format 💻 \(auf dem Entwicklungsrechner\)

Zunächst müssen wir das** mit PyTorch trainierte **Modell in ein Zwischenformat (ONNX) exportieren.



#### **1\. Toolchain\-Repository klonen**

Wechseln Sie in Ihr Arbeitsverzeichnis `lerobot` und klonen Sie die RDK\-spezifische Toolchain:

```Bash
cd lerobot

# 1. Auf die stabile, mit v2.1 datasets kompatible Version umschalten
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Die D-Robotics RDK-spezifische Toolchain klonen
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Exportparameter konfigurieren**

Bearbeiten Sie die Datei `rdk_LeRobot_tools/bpu_export_config.yaml` und passen Sie die Konfiguration an Ihre tatsächlichen Pfade an:

```YAML
dataset:
  root: "data/so101_pick_place" # Absoluter oder relativer Pfad Ihres Datensatzes
  act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # Pfad zu den ursprünglichen PyTorch-Modellgewichten
type: "nash-e" # Ziel-Hardwarearchitektur, RDK S100 entspricht nash-e / S100P entspricht nash-m
```



#### 3\. Exportskript ausführen

```Bash
# ONNX exportieren (Entwicklungsrechner)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Erfolgsanzeichen**: Im aktuellen Verzeichnis wird der Ordner `bpu_export_output` erzeugt, der das später benötigte Skript `build_all.sh` und die Quantisierungskalibrierungsdaten enthält.



### Phase 2: BPU\-Modell kompilieren 🐳 \(in der Docker\-Umgebung des Entwicklungsrechners\)

Die Quantisierung und Kompilierung von BPU\-Modellen von D\-Robotics erfordert eine OpenExplorer\-Umgebung \(OE\). Wir empfehlen, die Umgebung mit Docker zu isolieren.



#### **1\.** **Docker\-Umgebung und Image vorbereiten**

Stellen Sie sicher, dass Docker auf dem Entwicklungsrechner installiert ist ([offizielle Installationsanleitung](https://docs.docker.com/engine/install/)). Laden Sie das empfohlene CPU\-Image herunter und importieren Sie es:

```Bash
# Das heruntergeladene Offline-Image-Archiv laden
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Kompilier\-Container starten**

**Hinweis zur Fehlervermeidung**: Das Kompilieren des Modells benötigt relativ viel Shared Memory. Fügen Sie unbedingt den Parameter `--shm-size=15g` hinzu, sonst kommt es sehr leicht zu IPC\-Speicherfehlern.

Binden Sie das Arbeitsverzeichnis des Entwicklungsrechners (mit dem gerade exportierten Ordner) in den Container ein:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Hinweis: Ersetzen Sie `<docker-image-name>` durch den tatsächlichen Image\-Namen, den Sie mit `sudo docker images` sehen.\)



#### **3\.** **Kompilierung im Container ausführen**

Führen Sie nach dem Betreten des Containers das Ein\-Klick\-Kompilierungsskript aus:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Kompilierungsergebnisse prüfen**

Nach Abschluss der Kompilierung wird unter `bpu_export_output` der Ordner `bpu_output/` erzeugt. Er enthält alle Kerndateien, die für die Ausführung auf dem RDK\-Board benötigt werden:

- Klicken Sie, um die Verzeichnisstruktur von `bpu_output/` anzuzeigen

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(quantisierte Modelldatei\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(quantisierte Modelldatei\)

    - `action_mean.npy` und weitere Normalisierungsparameter des Datensatzes

    - `camera1_mean.npy` und weitere Kamerastatistik\-Parameter

---

### Phase 3: Deployment und Inferenz auf dem Board 🤖 \(auf dem RDK S100\)

**Prüfung der Voraussetzungen:**

1. Auf dem RDK\-Board ist die Laufzeitumgebung `D-Robotics/lerobot` eingerichtet und `hbm_runtime` installiert.

2. Der gesamte im vorherigen Schritt erzeugte Ordner `bpu_output/` wurde vollständig per `scp`, USB\-Stick o. Ä. auf das RDK\-Board kopiert.

3. Die grundlegende Teleoperations\-Konfiguration ist abgeschlossen; stellen Sie sicher, dass serielle Schnittstelle des Roboterarms, USB\-Anschluss der Kamera und Kalibrierdateien korrekt konfiguriert sind.



#### **1\.** **BPU\-beschleunigte Inferenz ausführen**

Wechseln Sie im Terminal des RDK\-Boards in das Toolchain\-Verzeichnis und starten Sie das Steuerskript:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Fehlerbehebung \(Troubleshooting\)

Wenn beim tatsächlichen Deployment Probleme auftreten, prüfen Sie sie anhand der folgenden Liste:

- **Der Roboterarm bewegt sich nicht?**

    - Prüfen Sie die Geräteeinbindung: Geben Sie im Terminal `ls /dev/ttyACM*` ein und bestätigen Sie, ob die dem Roboterarm entsprechende Portnummer korrekt ist.

    - Prüfen Sie die Berechtigungen: Versuchen Sie, das Inferenzskript mit `sudo` auszuführen, oder fügen Sie den aktuellen Benutzer zur Gruppe `dialout` hinzu.

- **Fehler beim Kamerastream / abnormales Bild / Roboterarm zittert auf der Stelle?**

    - Vergewissern Sie sich, ob sich die Kamera\-Indexnummer (Camera Index) durch Hot\-Plugging verschoben hat, und prüfen Sie, ob die Kameraparameter im Code mit den tatsächlichen `/dev/video*` übereinstimmen.

- **Beim Kopieren der vom Container erzeugten Dateien auf dem Entwicklungsrechner erscheint „Keine ausreichenden Berechtigungen"?**

    - Dateien, die in eingebundenen Docker\-Verzeichnissen entstehen, gehören standardmäßig root; führen Sie auf dem Entwicklungsrechner `sudo chown -R $USER:$USER bpu_export_output` aus, um das zu beheben.

