---
title: Lekiwi-Mobilitätsroboter – Bedienungstutorial
description: "Kompletter Leitfaden für den LeRobot-basierten Lekiwi-Mobilitätsroboter: Einrichtung, Motorkonfiguration, Teleoperation, Datenerfassung, Training und Evaluation"
---

# Lekiwi-Mobilitätsroboter – Bedienungstutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

Der schwarze Leader-Arm verwendet ein 5-V-6-A-Netzteil, der weiße Follower-Arm ein 12-V-5-A-Netzteil.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

Der Code in diesem Tutorial-Repository entspricht der getesteten, stabilen LeRobot-Version von vor dem 1. Oktober 2026. Hugging Face hat seitdem ein sehr umfangreiches Upgrade von LeRobot durchgeführt und dabei sehr viele neue Funktionen hinzugefügt. Wenn Sie das neueste Tutorial ausprobieren möchten, folgen Sie der [offiziellen Dokumentation](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) ist ein vollständig quelloffenes Roboterauto-Projekt, das von [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC) ins Leben gerufen wurde. Es enthält detaillierte 3D-Druckdateien und Betriebsanleitungen und ist für die Kompatibilität mit dem Imitationslern-Framework [LeRobot](https://github.com/huggingface/lerobot/tree/main) ausgelegt. Es unterstützt den Roboterarm SO101 und ermöglicht einen vollständigen Imitationslern-Workflow.

[*Im Fusion360 Online-CAD*](https://a360.co/4k1P8yO)* können Sie die exakten Positionen der Bauteile einsehen.*

[URDF-Datei](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Online-URDF-Vorschau https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## Hauptmerkmale

1. **Open Source und kostengünstig**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) bietet eine quelloffene, kostengünstige Roboterauto-Lösung.
2. **LeRobot-Integration**: Für die Integration mit der [LeRobot-Plattform](https://github.com/huggingface/lerobot) ausgelegt.
3. **Umfangreiche Lernressourcen**: Umfassende quelloffene Lernressourcen, darunter Montage- und Kalibrierungsanleitungen sowie Tutorials für Tests, Datenerfassung, Training und Deployment, die Anwendern einen schnellen Einstieg ermöglichen und beim Aufbau von Roboteranwendungen helfen.
4. **Nvidia-kompatibel**: Kann mit dem reComputer Mini J4012 Orin NX 16 GB verwendet werden.
5. **Anwendungen in verschiedenen Szenarien**: Geeignet für Bildung, wissenschaftliche Forschung, automatisierte Produktion und Robotik und hilft Anwendern, in einer Vielzahl komplexer Aufgaben einen effizienten, präzisen Roboterbetrieb zu erreichen.

JUXI ist ausschließlich für die Qualität der Hardware selbst verantwortlich. Dieses Tutorial wird strikt in Übereinstimmung mit der offiziellen Dokumentation aktualisiert. Sollten Sie auf Software- oder Umgebungsabhängigkeitsprobleme stoßen, die Sie wirklich nicht lösen können, melden Sie diese bitte umgehend an die [LeRobot-Plattform](https://github.com/huggingface/lerobot) oder den [LeRobot-Discord-Kanal](https://discord.gg/8TnwDdjFGU).

**Hinweis**
- Alle Servos im Lekiwi-Chassis benötigen eine 12-V-Stromversorgung. Für Anwender mit einem 5-V-Roboterarm stellen wir ein 12-V-auf-5-V-Spannungsreglermodul bereit. Beachten Sie, dass Sie die Verkabelung selbst anpassen müssen.
- 12-V-Netzteil – diese Option können Sie bei Bedarf beim Bezahlvorgang auswählen. Wenn Sie bereits ein 12-V-Netzteil besitzen, müssen Sie nur dessen Ausgangsstecker auf einen 5521-DC-Stecker umrüsten.
- Raspberry-Pi-Controller und Kameras – diese müssen über die Bestellseite separat erworben werden.

## Stückliste (BOM)


## Anfängliche Systemumgebung

**Für Ubuntu x86:**

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Für Jetson Orin:**

- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**Für Raspberry Pi:**

- Raspberry Pi 5, 4G\~16G

### SSH einrichten

Nachdem Sie den Raspberry Pi eingerichtet haben, sollten Sie [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell) aktivieren und konfigurieren, damit Sie sich vom Laptop aus am Raspberry Pi anmelden können, ohne einen Bildschirm, eine Tastatur und eine Maus an den Pi anzuschließen. Ein gutes Tutorial finden Sie [hier](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Sie können sich über die Eingabeaufforderung (cmd) am Raspberry Pi anmelden, oder, wenn Sie VSCode verwenden, die [folgende](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) Erweiterung nutzen.

## 3D-Druck-Anleitung

### Teile

Für die folgenden 3D-gedruckten Teile stellen wir druckbare STL-Dateien bereit. Diese Teile lassen sich auf FDM-Druckern für den Endverbraucherbereich mit Allzweck-PLA-Filament drucken. Wir haben sie auf einem Bambu Lab P1S getestet. Für jede Komponente laden wir sie einfach in Bambu Studio, lassen sie automatisch drehen und anordnen, aktivieren etwaige empfohlene Stützen und drucken.


### Druckeinstellungen

Die bereitgestellten STL-Dateien lassen sich auf vielen FDM-Druckern direkt drucken. Nachfolgend die getesteten und empfohlenen Einstellungen; andere Einstellungen können ebenfalls funktionieren.

- Material: PLA+
- Düsendurchmesser und Präzision: 0,2 mm Düsendurchmesser, 0,2 mm Schichthöhe
- Fülldichte: 15 %
- Druckgeschwindigkeit: 150 mm/s
- Bei Bedarf den G-Code (geslicte Datei) auf den Drucker hochladen und drucken

## A. LeRobot auf dem Raspberry Pi installieren

Auf Ihrem Raspberry Pi:

### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Die Shell neu starten

Kopieren Sie den folgenden Befehl in Ihre Shell und fügen Sie ihn ein: `source ~/.bashrc`, oder für Mac-Nutzer: `source ~/.bash_profile` oder `source ~/.zshrc` (wenn Sie zshell verwenden).

### 3. Eine neue Conda-Umgebung für LeRobot erstellen und aktivieren

```Python
conda create -y -n lerobot python=3.10
```

Aktivieren Sie dann Ihre Conda-Umgebung (dies müssen Sie jedes Mal tun, wenn Sie eine Shell öffnen, um LeRobot zu verwenden!):

```Bash
conda activate lerobot
```

### 4. LeRobot klonen:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. ffmpeg in Ihrer Umgebung installieren:

Wenn Sie `miniconda` verwenden, installieren Sie `ffmpeg` in Ihrer Umgebung:

```PowerShell
conda install ffmpeg -c conda-forge
```

Damit wird üblicherweise ffmpeg 7.X installiert, das mit dem libsvtav1-Encoder für Ihre Plattform gebaut wurde. Wird libsvtav1 nicht unterstützt (die unterstützten Encoder können Sie mit `ffmpeg -encoders` prüfen), können Sie:
[Für alle Plattformen] ffmpeg 7.X explizit installieren:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Nur Linux] die Build-Abhängigkeiten von ffmpeg installieren und ffmpeg mit libsvtav1-Unterstützung aus dem Quellcode kompilieren und sicherstellen, dass die verwendete ffmpeg-Executable die richtige ist, was Sie mit `which ffmpeg` bestätigen können.
Wenn der folgende Fehler auftritt, können die obigen Befehle ihn ebenfalls beheben.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. LeRobot mit der feetech-Motorabhängigkeit installieren:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Die Verbindungszeit festlegen

Suchen Sie config_lekiwi.py im Verzeichnis `lerobot\src\lerobot\robots\lekiwi`.

 connection_time_s: int = 7200 # d. h. 2 Stunden

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. LeRobot auf einem Laptop installieren

Wenn Sie LeRobot bereits auf Ihrem Laptop installiert haben, können Sie diesen Schritt überspringen; andernfalls folgen Sie den **gleichen Schritten** wie auf dem Raspberry Pi.

> [!Tip] Wir werden die Eingabeaufforderung (cmd) häufig verwenden. Wenn Sie mit cmd nicht vertraut sind oder die Verwendung der Kommandozeile auffrischen möchten, können Sie sich Folgendes ansehen: [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

Auf Ihrem Computer:

### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

Oder klicken Sie auf diesen Link, um das Installationsprogramm direkt herunterzuladen

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## Die Paketquellen von conda ändern

```Shell
# Zuerst die vorhandene Quellenkonfiguration löschen (um Konflikte zu vermeiden)
conda config --remove-key channels

# Die Standardquellen von conda und gängige Drittquellen durch den Tsinghua-Mirror ersetzen
# Die Standard-Paketquellen hinzufügen (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Gängige Drittquellen hinzufügen
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Die Download-Quelle anzeigen, damit bei der Paketinstallation die konkrete Download-URL angezeigt wird
conda config --set show_channel_urls yes

# Den Index-Cache leeren, damit die neuen Quellen wirksam werden
conda clean -i

# Die aktuelle Konfiguration anzeigen (um zu prüfen, ob die Quellen erfolgreich hinzugefügt wurden)
conda config --show-sources
```

### 2. Die Shell neu starten

Kopieren Sie den folgenden Befehl in Ihre Shell und fügen Sie ihn ein: `source ~/.bashrc`, oder für Mac-Nutzer: `source ~/.bash_profile` oder `source ~/.zshrc` (wenn Sie zshell verwenden).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. Eine neue Conda-Umgebung für LeRobot erstellen und aktivieren

```Bash
conda create -y -n lerobot python=3.10
```

Aktivieren Sie dann Ihre Conda-Umgebung (dies müssen Sie jedes Mal tun, wenn Sie eine Shell öffnen, um LeRobot zu verwenden!):

```Bash
conda activate lerobot
```

### 4. LeRobot klonen:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. ffmpeg in Ihrer Umgebung installieren:

Wenn Sie `miniconda` verwenden, installieren Sie `ffmpeg` in Ihrer Umgebung:

```PowerShell
conda install ffmpeg -c conda-forge
```

Damit wird üblicherweise ffmpeg 7.X installiert, das mit dem libsvtav1-Encoder für Ihre Plattform gebaut wurde. Wird libsvtav1 nicht unterstützt (die unterstützten Encoder können Sie mit `ffmpeg -encoders` prüfen), können Sie:
[Für alle Plattformen] ffmpeg 7.X explizit installieren:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Nur Linux] die Build-Abhängigkeiten von ffmpeg installieren und ffmpeg mit libsvtav1-Unterstützung aus dem Quellcode kompilieren und sicherstellen, dass die verwendete ffmpeg-Executable die richtige ist, was Sie mit `which ffmpeg` bestätigen können.
Wenn der folgende Fehler auftritt, können die obigen Befehle ihn ebenfalls beheben.

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. LeRobot mit der feetech-Motorabhängigkeit installieren:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. Konfigurieren der Motoren

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1. Den zum Roboterarm gehörenden USB-Anschluss finden**

Um den richtigen Anschluss für einen einzelnen Motor zu finden, führen Sie das folgende Hilfsskript zweimal aus:

```Bash
lerobot-find-port
```

Beispielausgabe (zum Beispiel `/dev/tty.usbmodem575E0031751` unter Mac oder möglicherweise `/dev/ttyACM0` unter Linux):

Beispielausgabe (zum Beispiel `/dev/tty.usbmodem575E0032081` unter Mac oder möglicherweise `/dev/ttyACM1` unter Linux):

Fehlerbehebung: Unter Linux müssen Sie möglicherweise den Zugriff auf den USB-Anschluss mit den folgenden Befehlen erteilen:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Konfigurieren Sie Ihre Motoren (diesen Schritt bei einer fertig montierten Einheit überspringen)**

Schließen Sie die Motoren Ihres Chassis einen nach dem anderen an und führen Sie das folgende Skript aus. Es initialisiert zuerst die Servos des Roboterarms (ID 6..1) und danach die Servos des Chassis, wobei deren IDs auf (ID 9..7) gesetzt werden. Wenn Sie den Roboterarm bereits kalibriert haben, können Sie einfach weiter die Eingabetaste drücken, um zu überschreiben und zu überspringen:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- hier den im vorherigen Schritt gefundenen Anschluss einfügen
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3. Den China-Mirror von Hugging Face einrichten

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Am Ende der Datei hinzufügen
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Output
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Am Ende der Datei hinzufügen
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Output
# https://hf-mirror.com
```

#### ① Ein Token erstellen

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ② Das Token notieren

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ Das Token binden

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ Ein Dataset-Repo erstellen

**Notieren Sie den Owner- und den Dataset-Namen, d. h. <hf_username> und <dateset_repo_id>, die Sie später benötigen**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. Die Konfiguration aktualisieren!!!

Die Konfigurationsdateien auf dem LeKiwi LeRobot und auf dem Laptop müssen übereinstimmen. Zuerst müssen wir die **IP-Adresse** des Raspberry Pi ermitteln, der den mobilen Arm steuert. Dies ist dieselbe IP-Adresse, die für SSH verwendet wird. Außerdem müssen wir den **USB-Anschluss** der Servotreiberplatine des Leader-Arms am Laptop und den **Anschluss der Servotreiberplatine am LeKiwi** ermitteln. Diese Anschlüsse können Sie mit dem folgenden Skript finden.

Unter Linux müssen Sie möglicherweise den Zugriff auf den USB-Anschluss mit den folgenden Befehlen erteilen:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Wichtig: Nachdem Sie nun den Anschluss des Leader-Arms und die IP-Adresse des Arms des Lekiwi haben, aktualisieren Sie die **ip** in der Netzwerkkonfiguration, den **port** in der Konfiguration des Leader-Arms und den **port, remote_ip** in der LeKiwi-Konfiguration.

Ändern Sie diese vier Dateien im Verzeichnis example\lekiwi

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① teleoperate.py ändern

remote_ip: die IP-Adresse des Raspberry Pi

port: die Portnummer, wenn der Leader-Arm mit dem Computer oder Linux verbunden ist

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② record.py ändern

HF_REPO_ID: [Hugging-Face-Benutzername und Dataset-Name](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip: die IP-Adresse des Raspberry Pi

port: die Portnummer, wenn der Leader-Arm mit dem Computer oder Linux verbunden ist

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ replay.py ändern

remote_ip: die IP-Adresse des Raspberry Pi

<hf_username>/<dataset_repo_id>, d. h. der [Hugging-Face-Benutzername und Dataset-Name](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. Kalibrierung

Nun müssen wir den Leader-Arm und den Follower-Arm kalibrieren. Die Servos der Omni-Räder müssen nicht kalibriert werden.

### Kalibrieren des Follower-Arms (auf der Lekiwi-Basis montiert)

Führen Sie den folgenden Befehl auf Ihrem Computer aus, um den Leader-Arm zu kalibrieren. Hinweis: Die hier gezeigten Abbildungen sind Beispiele für das Modell SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # hier den gefundenen Anschluss eintragen
    --teleop.id=my_awesome_leader_arm
```

Führen Sie nun den folgenden Befehl auf Ihrem Raspberry Pi aus, um den Follower-Arm am LeKiwi zu kalibrieren. Ignorieren Sie dessen aktuelle Position auf dem Tisch — die ordnungsgemäße Kalibrierung sollte erfolgen, während er am Lekiwi-Chassis montiert ist.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Wir haben die Kalibrierungsmethode für die meisten Roboter vereinheitlicht. Zuerst müssen wir den Roboter so bewegen, dass sich jedes Gelenk in der **Mitte seines Bewegungsbereichs** befindet, und dann die Taste drücken. Danach bewegen wir alle Gelenke einmal durch ihren **gesamten Bewegungsbereich**. Ein Video desselben Kalibrierungsvorgangs für den SO101 finden Sie [hier](https://huggingface.co/docs/lerobot/en/so101#calibration-video) `Enter`.

## E. Teleoperation

Öffnen Sie eine neue Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Wenn Sie einen Mac verwenden, müssen Sie möglicherweise „Terminal“ die Berechtigung erteilen, für die Teleoperation auf die Tastatur zuzugreifen. Gehen Sie zu „System Preferences“ > „Security & Privacy“ > „Input Monitoring“ und aktivieren Sie das Kontrollkästchen „Terminal“.

Melden Sie sich für die Teleoperation über SSH an Ihrem Raspberry Pi an, führen Sie den folgenden Befehl aus, um die Umgebung zu aktivieren: `conda activate lerobot`, und führen Sie dann das folgende Skript aus:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

Führen Sie als Nächstes auch auf Ihrem Laptop den folgenden Befehl aus, um die Umgebung zu aktivieren: `conda activate lerobot`, und führen Sie dann das folgende Skript aus:

```Bash
python examples/lekiwi/teleoperate.py
```

Auf dem Bildschirm Ihres Laptops sollte etwa Folgendes erscheinen: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Nun können Sie den Steuerarm bewegen und mit den Tasten (W, A, S, D) auf der Tastatur den Roboter vorwärts, nach links, rückwärts und nach rechts fahren. Mit den Tasten (Z, X) drehen Sie den Roboter nach links oder rechts. Mit den Tasten (R, F) erhöhen oder verringern Sie die Geschwindigkeit des Roboters. Es gibt drei Geschwindigkeitsmodi; siehe die folgende Tabelle:



Wenn Sie eine andere Tastatur verwenden, können Sie die Tastenbelegung für jeden Befehl in [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) ändern.

## Fehlerbehebung bei der Kommunikation

Wenn Sie Probleme beim Verbinden des mobilen Roboters SO101 haben, befolgen Sie die folgenden Schritte, um das Problem zu diagnostizieren und zu beheben.

### 1. Die IP-Adresskonfiguration prüfen

Stellen Sie sicher, dass in der Konfigurationsdatei die richtige IP-Adresse des Raspberry Pi eingetragen ist. Um die IP-Adresse des Raspberry Pi zu prüfen, führen Sie den folgenden Befehl aus (in der Kommandozeile des Pi):

```Bash
hostname -I
```

### 2. Prüfen, ob der Laptop/PC den Pi erreichen kann

Versuchen Sie, den Raspberry Pi vom Laptop aus anzupingen:

```Bash
ping <your_pi_ip_address>
```

Wenn der Ping fehlschlägt:

- Stellen Sie sicher, dass der Pi eingeschaltet und mit demselben Netzwerk verbunden ist.
- Prüfen Sie, ob SSH auf dem Pi aktiviert ist.

### 3. Eine SSH-Verbindung versuchen

Wenn Sie sich nicht über SSH am Pi anmelden können, ist die Verbindung möglicherweise nicht korrekt. Verwenden Sie den folgenden Befehl:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Zum Beispiel `ssh pi@192.168.0.106`

Wenn Sie einen Verbindungsfehler erhalten:

- Stellen Sie sicher, dass SSH auf dem Pi aktiviert ist; Sie können den folgenden Befehl ausführen:

```Bash
sudo raspi-config
```

- Navigieren Sie dann zu: **Interfacing Options -> SSH** und aktivieren Sie es.

### 4. Konsistenz der Konfigurationsdateien!!!

Stellen Sie sicher, dass die Konfigurationsdateien auf dem Laptop/PC und dem Raspberry Pi exakt identisch sind.

## F. Aufzeichnen eines Datasets

Sobald Sie mit der Teleoperation vertraut sind, können Sie mit dem LeKiwi Ihr erstes Dataset aufzeichnen.

Um das Programm auf dem LeKiwi zu starten, verbinden Sie sich über SSH mit Ihrem Raspberry Pi und führen Sie die folgenden Befehle aus, um die Umgebung zu aktivieren und das Skript zu starten:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Wenn Sie den Hugging Face Hub zum Hochladen von Datasets verwenden möchten und sich noch nie angemeldet haben, melden Sie sich unbedingt mit einem Token mit Schreibzugriff an, das Sie in den [Hugging Face settings](https://huggingface.co/settings/tokens) erzeugen können:

```Bash
hf auth login
```

Speichern Sie den Namen Ihres Hugging-Face-Repositorys in einer Variablen, um den folgenden Befehl auszuführen:

```Bash
hf auth whoami
```

Führen Sie dann den folgenden Befehl auf Ihrem Laptop aus, um 2 Episoden aufzuzeichnen und das Dataset in den Hub hochzuladen:

```Bash
python examples/lekiwi/record.py
```

## G. Visualisieren eines Datasets

Wenn Sie das Dataset hochgeladen haben, können Sie [Ihr Dataset online visualisieren](https://huggingface.co/spaces/lerobot/visualize_dataset); kopieren Sie die von dem folgenden Befehl erzeugte Repository-ID und fügen Sie sie ein:

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Wenn Sie das Dataset nicht hochgeladen haben, können Sie es auch lokal visualisieren (das Visualisierungswerkzeug öffnet sich in einem Browserfenster unter `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### Ein Dataset visualisieren (optional, einen Versuch wert)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Wenn Sie das Dataset hochgeladen haben, können Sie es auch lokal mit dem folgenden Befehl visualisieren:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Wenn Sie das Dataset nicht hochgeladen haben, können Sie es auch lokal mit dem folgenden Befehl visualisieren:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Hierbei ist `juxi` ein benutzerdefinierter `repo_id`-Name, der bei der Datenerfassung festgelegt wurde.



#### Tipps zur Datenerfassung

Sobald Sie mit der Datenaufzeichnung vertraut sind, können Sie größere Datasets für das Training erstellen. Eine gute Einstiegsaufgabe ist, Objekte aus verschiedenen Positionen aufzunehmen und in einen Behälter zu legen. Wir empfehlen, mindestens 50 Episoden aufzuzeichnen, 10 pro Position. Halten Sie die Kameraposition fest und die Greifbewegung während der gesamten Aufzeichnung gleichbleibend. Achten Sie außerdem darauf, dass die Objekte, die Sie manipulieren, im Kamerabild deutlich sichtbar sind. Eine einfache Faustregel: Sie sollten die Aufgabe allein anhand des Kamerabilds ausführen können.

In den folgenden Abschnitten trainieren Sie Ihr neuronales Netz. Sobald Sie eine zuverlässige Greifleistung erreichen, können Sie beginnen, mehr Variation in die Datenerfassung einzubringen, etwa zusätzliche Greifpositionen, unterschiedliche Greiftechniken und wechselnde Kamerapositionen.

Vermeiden Sie es, zu schnell zu viel Variation hinzuzufügen, da dies Ihre Ergebnisse verschlechtern kann.

Wenn Sie tiefer in dieses wichtige Thema einsteigen möchten, lesen Sie unseren [Blogbeitrag dazu, was ein gutes Dataset ausmacht.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Fehlerbehebung:

Wenn unter Linux die Pfeiltasten links/rechts und die Esc-Taste während der Datenaufzeichnung nicht funktionieren, stellen Sie sicher, dass die Umgebungsvariable `$DISPLAY` gesetzt ist. Siehe [die Einschränkungen von pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. Wiedergeben einer Episode

Versuchen Sie nun, die erste Episode auf Ihrem Roboter wiederzugeben:

```Bash
python examples/lekiwi/replay.py
```

Herzlichen Glückwunsch 🎉 — Ihr Roboter ist bereit, Aufgaben eigenständig zu erlernen. Folgen Sie dem Trainingsabschnitt dieses Tutorials, um mit dem Training zu beginnen: [Getting started with real-world robots](https://huggingface.co/docs/lerobot/il_robots)

## I. Bewerten Ihrer Policy

Ändern Sie unbedingt remote_ip, port, HF_MODEL_ID

### evaluate.py ändern

HF_MODEL_ID="<hf_username>/<model_repo_id>" ändern Sie dies auf den Namen des nach dem Training zu Hugging Face hochgeladenen Datasets (falls Sie es zu Hugging Face hochgeladen haben) oder auf das lokale Verzeichnis, in das das Modell nach dem Training exportiert wurde

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" ändern Sie dies auf den von Ihnen erstellten Benutzernamen und den Namen des eval_-Datasets

remote_ip: die IP-Adresse des Raspberry Pi

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

Führen Sie dann den folgenden Befehl aus:

```Bash
python examples/lekiwi/evaluate.py
```

1. Der Dataset-Name beginnt mit `eval`, um anzuzeigen, dass Sie eine Inferenz ausführen (z. B. `${HF_USER}/eval_act_lekiwi_test`).
2. Wenn bei der Bewertung `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'` auftritt, löschen Sie zuerst den Ordner, dessen Name mit `eval_` beginnt, und führen Sie das Programm erneut aus.



Für Simulationstraining siehe

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Hilfe 🙋

Bei Hardwareproblemen wenden Sie sich an den Kundendienst. Bei Fragen zur Nutzung treten Sie dem Discord bei.

[LeRobot-Plattform](https://github.com/huggingface/lerobot)

[LeRobot-Discord-Kanal](https://discord.gg/8TnwDdjFGU)

##   
  
Miniconda auf einem Mac installieren

## Berechtigungen erteilen

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Miniconda installieren

https://www.anaconda.com/download

## Die Paketquelle von pip ändern

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Die Paketquelle von conda ändern

```Shell
# Die vorhandene .condarc-Konfiguration löschen (optional, um Konflikte zu vermeiden)
echo "" > ~/.condarc

# Die Tsinghua-Mirror-Konfiguration schreiben
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# Den Cache leeren, um die Konfiguration anzuwenden
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

