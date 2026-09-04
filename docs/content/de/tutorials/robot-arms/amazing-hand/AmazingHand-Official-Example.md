---
title: Tutorial zum offiziellen Beispiel der Roboterhand
description: "Laden Sie das Code-Archiv dieses Tutorials für die Demo herunter oder klonen Sie das offizielle Open-Source-Repository https://github.com/pollen-robotics/AmazingHand.git ; der offizielle Code kann Fehler enthalten."
---

# Tutorial zum offiziellen Beispiel der Roboterhand

> **[Im Shop kaufen](https://www.juxitech.com/de/products/amazinghand)**

## 1. Code herunterladen

Laden Sie das Code-Archiv dieses Tutorials für die Demo herunter oder klonen Sie das offizielle Open-Source-Repository https://github.com/pollen-robotics/AmazingHand.git ; der offizielle Code kann Fehler enthalten.

[Tutorial zum offiziellen Beispiel der Roboterhand](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Windows-Codearchiv

[AmazingHand-main.zip]

Linux-Codearchiv

[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Umgebung installieren

Je nach System Rust, uv und dora-rs installieren

**1. Rust installieren:** [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

Referenz zum Einrichten der Rust-Umgebungsvariablen unter Windows (wichtig!) https://zhuanlan.zhihu.com/p/1958936613276087180

Linux: Umgebungsvariablen einrichten:

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Bei der Erstinstallation kann der Visual Studio Installer nötig sein

**Cargo-Mirror konfigurieren**

Im `.cargo`-Ordner die Datei `config.toml` anlegen und den Tsinghua-`crates.io-index`-Mirror eintragen. Cargo lädt Crate dann über den Tsinghua-Mirror.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. uv installieren:** [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

Unter Windows PowerShell öffnen, den Befehl einfügen und ausführen

**Linux: Umgebungsvariablen einrichten:**

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3. dora-rs installieren:** Download und Installation siehe [https://dora-rs.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing)

Linux: Umgebungsvariablen einrichten:

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3. Verkabelung

Netzteil mindestens 5V/3A. Die externe Servo-Treiberplatine anschließen und per USB mit dem PC verbinden

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4. Beispiel-Demo

### **1. Portnummer der Servo-Treiberplatine ermitteln**

- Windows meist COM11 – Portnummer über Geräte-Manager oder Feetech-Host-Software finden

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- Ubuntu/Linux meist /dev/ttyACM0

Port per Befehlszeile prüfen:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

Findet die VM `ls /dev/ttyUSB* /dev/ttyACM*` nichts, prüfen Sie unten rechts in der VM, ob die Roboterhand mit dem PC verbunden ist. Falls ja, trennen und mit der VM verbinden

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2. Portnummer im Code ändern**

①Die Datei `main.rs` unter AmazingHand-main\Demo\AHControl\src mit einem Texteditor öffnen und auf die eigene Portnummer setzen (Windows COM*, Ubuntu/Linux meist /dev/ttyACM*)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

②Die passende Instanzdatei finden

**Rechte Hand** dataflow_tracking_real_right.yml unter AmazingHand-main\Demo suchen

**Linke Hand** dataflow_tracking_real_left.yml unter AmazingHand-main\Demo suchen

**Beide Hände** dataflow_tracking_real_2hands.yml unter AmazingHand-main\Demo suchen

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

Im Texteditor öffnen und auf die eigene Portnummer setzen (Windows COM*, Ubuntu/Linux meist /dev/ttyACM*)

### **3. Code bereitstellen**

- Demo-Ordner öffnen

- Windows: im Verzeichnis `Powershell` eingeben und Enter

- Daemon-Prozess starten (jedes Mal):

Für Linux-Systeme direkt in der Konsole öffnen und den Daemon-Prozess starten (jedes Mal):

```Plain Text
dora up
```

- Dann in der Konsole aus diesem Verzeichnis ausführen (reicht, wenn bei der Umgebungseinrichtung einmal gemacht!! Erneutes Ausführen überschreibt die virtuelle Umgebung!!) Virtuelle Umgebung erstellen:

```Plain Text
uv venv --python 3.12
```

- Virtuelle Umgebung aktivieren (jedes Mal) – je nach System den folgenden Befehl ausführen:

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

Sicherstellen, dass die virtuelle Umgebung in der Konsole aktiviert ist!

- Abhängigkeiten synchronisieren, in den AHControl-Ordner wechseln

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Danach `cd ..` eingeben und mit Enter zurück zum Demo-Verzeichnis! In den AHSimulation-Ordner wechseln

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Danach `cd ..` eingeben und mit Enter zurück zum Demo-Verzeichnis! In den HandTracking-Ordner wechseln

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Ergebnis

- Demo-Ordner öffnen! Im Verzeichnis `Powershell` eingeben und Enter, Daemon starten (jedes Mal):

```Plain Text
dora up
```

- Virtuelle Umgebung aktivieren (jedes Mal) – je nach System:

Windows:

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux:

```Plain Text
source .venv/bin/activate
```

### Simulationsumgebung

- Handtracking-Demo der Webcam nur in der Simulationsumgebung:

```Plain Text
dora build dataflow_tracking_simu.yml --uv   *#(Execute only once)*
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### Auf echter Hardware (Hand-Tracking)

- Handtracking-Demo der Webcam mit echter Hardware:

    #### Rechte Hand

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Linke Hand

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Beide Hände (beide an einer Servo-Treiberplatine!)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### Einfaches Beispiel: Fingerwinkel in der Simulation steuern

- Einfaches Beispiel zur Steuerung der Fingerwinkel in der Simulation:

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

Beschreibung

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) enthält einen dora-rs-Node zur Motorsteuerung sowie Hilfswerkzeuge für die Motorkonfiguration.
- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) enthält einen dora-rs-Node, der Handbewegungen simuliert und inverse Kinematik liefert.
- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) enthält einen dora-rs-Node, der die Hand über die Webcam verfolgt und als Ziel für die AH!-Steuerung nutzt.

## Hinweise

### 1. mediapipe-Versionsproblem

In `pyproject.toml` ist mediapipe>=0.10.14 konfiguriert; fehlt dem installierten Paket das `solutions`-Submodul, liegt es meist an der Inkompatibilität mit Python 3.12 (höhere mediapipe-Versionen haben Probleme mit Python 3.12) oder an beschädigten Paketdateien.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Dora-Versionskonflikt, Nachrichtenformat (v0.7.0 vs v0.8.0)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Lösung: ①Im Benutzerverzeichnis unter .cargo/registry/src/github.xxxxxxxx/ nur die betroffenen Abhängigkeitspakete löschen!

**`dora-message-0.7.0`** (entscheidend! alter Nachrichtenformat-Ordner, unbedingt löschen)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16` (Hilfsbibliothek von Dora, mit alter Version löschen)

②Demo/AHControl öffnen, in Cargo.toml dora-node-api="0.5.0" dora-message="0.8.0" ändern

③In der Konsole nach AHControl wechseln und `cargo build --release` erneut ausführen

④Entsprechend [„Auf echter Hardware ausführen"](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug) erneut bauen

Versionen je nach Fehlermeldung anpassen – z. B. bei dora-message 0.6.0: dora-node-api="0.4.0" dora-message="0.6.0"

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3. Fehlende openCV-Abhängigkeit

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

Im HandTracking-Verzeichnis den folgenden Befehl eingeben:

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Kameraberechtigung aktivieren (PC)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5. Kamera in VM 22.04 nutzen

Siehe https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Desktop-Kamera montieren

#### Montage des Umgebungskamera-Kits

1. Zuerst den Winkel-Feinjustierungsbügel fixieren

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2. Seitliches Umgebungskamera-Kit

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

## Hand-Tracking direkt in VM 22.04 ausführen

Diese vier Dateien herunterladen, in denselben englischen Ordner legen und die .ovf-Datei mit der VM-Software direkt öffnen

Passwort ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1. Konsole im Demo-Verzeichnis öffnen:**

```Plain Text
dora up
```

**Und die virtuelle Umgebung aktivieren:**

```Plain Text
source .venv/bin/activate
```

**2. Kameraberechtigung der VM**

Für die Kamera in VM 22.04: https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Port der Servo-Treiberplatine per Befehlszeile prüfen:**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Portnummer im Code ändern**

①`main.rs` unter AmazingHand-main\Demo\AHControl\src öffnen, im Textmodus öffnen und auf die eigene Portnummer setzen (Windows COM*, Ubuntu/Linux meist /dev/ttyACM*)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

②Passende Instanzdatei finden

**Rechte Hand** dataflow_tracking_real_right.yml unter AmazingHand-main\Demo suchen

**Linke Hand** dataflow_tracking_real_left.yml unter AmazingHand-main\Demo suchen

**Beide Hände** dataflow_tracking_real_2hands.yml unter AmazingHand-main\Demo suchen

Im Texteditor öffnen und auf die eigene Portnummer setzen (Windows COM*, Ubuntu/Linux meist /dev/ttyACM*)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5. Hand-Tracking der rechten Hand starten**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
