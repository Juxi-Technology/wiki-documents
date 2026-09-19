---
title: Lekiwi-Mobilitätsroboter – Bedienungstutorial
description: "Kompletter Leitfaden für den LeRobot-basierten Lekiwi-Mobilitätsroboter: Einrichtung, Motorkonfiguration, Teleoperation, Datenerfassung, Training und Evaluation"
---

# Lekiwi-Mobilitätsroboter – Bedienungstutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

Der schwarze Leader-Arm verwendet ein 5V-6A-Netzteil, der weiße Follower-Arm ein 12V-5A-Netzteil

lerobot-Lekiwi.zip

Die Codebasis dieses Tutorial-Repositorys wird auf der vor dem 1. März 2026 getesteten stabilen Version von LeRobot gehalten. Hugging Face hat LeRobot inzwischen sehr umfangreich erweitert und eine große Anzahl neuer Funktionen hinzugefügt. Für das neueste Tutorial folgen Sie bitte [der offiziellen Dokumentation](https://huggingface.co/docs/lerobot/lekiwi).

[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) ist ein vollständig quelloffenes Roboterkarren-Projekt, das von [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC) initiiert wurde. Es enthält detaillierte 3D-Druckdateien und Betriebsanleitungen und ist dafür ausgelegt, mit dem [LeRobot](https://github.com/huggingface/lerobot/tree/main)-Framework für Imitation Learning kompatibel zu sein. Es unterstützt den SO101-Roboterarm und ermöglicht damit einen vollständigen Imitation-Learning-Prozess.

[*Präzise Bauteilpositionen können im Fusion360-Online-CAD visualisiert werden*](https://a360.co/4k1P8yO)*.*

[URDF-Datei](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Online-URDF-Vorschau https://urdf.d-robotics.cc/

![image – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

### Hauptmerkmale

1. **Open Source und kostengünstig**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) bietet eine quelloffene, günstige Roboterkarren-Lösung.
2. **LeRobot-Integration**: Entwickelt für die Integration in die [LeRobot-Plattform](https://github.com/huggingface/lerobot).
3. **Umfangreiche Lernressourcen**: Vollständige Open-Source-Ressourcen mit Montage- und Kalibrierungsanleitung sowie Tutorials zu Test, Datenerfassung, Training und Deployment – für einen schnellen Einstieg in die Roboterentwicklung.
4. **Nvidia-kompatibel**: Kombinierbar mit dem reComputer Mini J4012 Orin NX 16 GB.
5. **Vielseitige Einsatzbereiche**: Für Bildung, Forschung, automatisierte Produktion und Robotik geeignet – effiziente, präzise Roboteroperationen für komplexe Aufgaben.

JUXI ist nur für die Qualität der Hardware selbst verantwortlich. Die Tutorials werden streng nach der offiziellen Dokumentation aktualisiert. Sollten Sie auf Software- oder Umgebungsabhängigkeitsprobleme stoßen, die Sie wirklich nicht lösen können, melden Sie diese bitte umgehend der [LeRobot-Plattform](https://github.com/huggingface/lerobot) oder dem [LeRobot-Discord-Kanal](https://discord.gg/8TnwDdjFGU).

**Achtung**

- Alle Servos im Lekiwi-Chassis benötigen 12 V. Für Anwender mit 5-V-Roboterarm liefern wir einen 12-V-zu-5-V-Abwärtswandler. Schaltungsanpassungen müssen Sie selbst vornehmen.
- 12-V-Netzteil – bei Bedarf beim Checkout auswählbar. Wer bereits ein 12-V-Netzteil besitzt, muss nur den Ausgang auf einen 5521-DC-Stecker umrüsten.
- Raspberry-Pi-Controller und Kamera – separat über die Bestellschnittstelle zu kaufen.

### Stückliste (BOM)

### Anfangssystemumgebung

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

- Raspberry Pi 5, 4G–16G

#### SSH einrichten

Nach der Einrichtung des Raspberry Pi sollten Sie [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol) aktivieren und konfigurieren, um sich vom Laptop anzumelden, ohne Bildschirm, Tastatur und Maus anzuschließen. [Hier](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh) finden Sie ein gutes Tutorial. Sie können sich über die Eingabeaufforderung (cmd) anmelden oder – bei VSCode – [diese](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) Erweiterung nutzen.

### 3D-Druck-Leitfaden

#### Bauteile

Wir stellen druckbare STL-Dateien für die folgenden 3D-Druckteile bereit. Die Teile lassen sich mit gängigem PLA-Filament auf Consumer-FDM-Druckern drucken. Getestet auf einem Bambu Lab P1S. Für alle Komponenten einfach in bambuslicer laden, automatisch drehen/anordnen lassen und empfohlene Stützen aktivieren.

#### Druckparameter

Die STL-Dateien lassen sich auf vielen FDM-Druckern direkt drucken. Folgende Einstellungen wurden getestet und empfohlen; andere können ebenfalls funktionieren.

- Material: PLA+

- Düsendurchmesser und Präzision: 0,2 mm Düse, Schichthöhe 0,2 mm

- Füllungsdichte: 15 %

- Druckgeschwindigkeit: 150 mm/s

- Bei Bedarf G-Code (Slicerdatei) auf den Drucker laden und drucken

## LeRobot installieren

Auf Ihrem Raspberry Pi:

#### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

#### 2. Shell neu starten

In Ihrer Shell einfügen: `source ~/.bashrc` bzw. für Mac: `source ~/.bash_profile` oder `source ~/.zshrc` (bei zshell)

#### 3. Neue Conda-Umgebung für LeRobot erstellen und aktivieren

```Python
conda create -y -n lerobot python=3.10
```

Dann Conda-Umgebung aktivieren (bei jeder Shell-Nutzung von LeRobot nötig!):

```Bash
conda activate lerobot
```

#### 4. LeRobot klonen:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

#### 5. ffmpeg in der Umgebung installieren:

Bei `miniconda` in der Umgebung `ffmpeg` installieren:

```PowerShell
conda install ffmpeg -c conda-forge
```

Dies installiert in der Regel ffmpeg 7.X, kompiliert mit dem libsvtav1-Encoder. Falls libsvtav1 nicht unterstützt wird (prüfbar mit `ffmpeg -encoders`):

【Alle Plattformen】ffmpeg 7.X explizit installieren:

`conda install ffmpeg=7.1.1 -c conda-forge`

【Nur Linux】Build-Abhängigkeiten von ffmpeg installieren und ffmpeg mit libsvtav1 aus dem Quellcode kompilieren; mit `which ffmpeg` sicherstellen, dass die richtige ausführbare Datei verwendet wird.

Bei folgendem Fehler hilft der obige Befehl ebenfalls.

![5. ffmpeg in der Umgebung installieren: – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### 6. LeRobot mit feetech-Motor-Abhängigkeiten installieren:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

#### 7. Verbindungszeit einstellen

Unter dem Verzeichnis `lerobot\src\lerobot\robots\lekiwi` die Datei config_lekiwi.py finden

connection_time_s: int = 7200 # 也就是2小时

![7. Verbindungszeit einstellen – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



### C. LeRobot auf dem Laptop installieren

Wenn LeRobot bereits auf dem Laptop installiert ist, diesen Schritt überspringen; andernfalls die **gleichen Schritte** wie auf dem Raspberry Pi ausführen.

> [!Tip] Wir nutzen häufig die Eingabeaufforderung (cmd). Bei Unerfahrenheit: [Crash-Kurs Kommandozeile](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line).
> 

Auf Ihrem Rechner:

#### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

#### 2. Shell neu starten

In Ihrer Shell einfügen: `source ~/.bashrc` bzw. für Mac: `source ~/.bash_profile` oder `source ~/.zshrc` (bei zshell)

![2. Shell neu starten – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### 3. Conda-Umgebung für LeRobot erstellen und aktivieren

```Bash
conda create -y -n lerobot python=3.10
```

Dann Conda-Umgebung aktivieren (bei jeder Nutzung von LeRobot nötig!):

```Bash
conda activate lerobot
```

#### 4. LeRobot klonen:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

#### 5. ffmpeg in der Umgebung installieren:

Bei `miniconda` in der Umgebung `ffmpeg` installieren:

```PowerShell
conda install ffmpeg -c conda-forge
```

Dies installiert in der Regel ffmpeg 7.X mit libsvtav1-Encoder. Falls nicht unterstützt (mit `ffmpeg -encoders` prüfbar):

【Alle Plattformen】ffmpeg 7.X explizit:

`conda install ffmpeg=7.1.1 -c conda-forge`

【Nur Linux】ffmpeg-Build-Abhängigkeiten installieren und ffmpeg mit libsvtav1 aus dem Quellcode kompilieren; mit `which ffmpeg` prüfen.

Bei folgendem Fehler hilft der obige Befehl ebenfalls.

![5. ffmpeg in der Umgebung installieren: – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### 6. LeRobot mit feetech-Motor-Abhängigkeiten installieren:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## Motoren konfigurieren

![6. LeRobot mit feetech-Motor-Abhängigkeiten installieren: – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![6. LeRobot mit feetech-Motor-Abhängigkeiten installieren: – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

#### **1. Den mit dem Roboterarm verbundenen USB-Port finden**

Um den richtigen Port für einen einzelnen Motor zu finden, das folgende Utility-Skript zweimal ausführen:

```Bash
lerobot-find-port
```

Beispielausgabe (z. B. `/dev/tty.usbmodem575E0031751` auf dem Mac oder `/dev/ttyACM0` unter Linux):

Beispielausgabe (z. B. `/dev/tty.usbmodem575E0032081` auf dem Mac oder `/dev/ttyACM1` unter Linux):

Fehlerbehebung: Unter Linux ggf. USB-Portzugriff mit folgenden Befehlen gewähren:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

#### **2. Motoren konfigurieren (beim fertigen Produkt überspringbar)**

Jeden Motor des Chassis nacheinander einstecken und das folgende Skript ausführen – es initialisiert zuerst die Servos des Roboterarms (ID 6..1), dann die Chassis-Servos und setzt deren IDs (ID 9..7). Bei bereits kalibriertem Arm kann man mit Enter durchgehend überschreiben und überspringen:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![2. Motoren konfigurieren beim fertigen Produkt überspringbar – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

#### 3. Inländisches HuggingFace-Mirroring einrichten

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Am Ende der Datei hinzufügen
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Ausgabe
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

# Ausgabe
# https://hf-mirror.com
```

##### ①Token erstellen

https://huggingface.co/settings/tokens

![①Token erstellen – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![①Token erstellen – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![①Token erstellen – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

##### ②Token notieren

Zum Beispiel meiner:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

##### ③Token binden

```Shell
hf auth login

hf auth whoami
```

![③Token binden – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

##### ④Dataset-Repository erstellen

**Notieren Sie sich Owner und Namen des Datensatzes – das sind die später benötigten \<hf_username\> und \<dateset_repo_id\>**

![④Dataset-Repository erstellen – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![④Dataset-Repository erstellen – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![④Dataset-Repository erstellen – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

#### 4. Die Konfiguration aktualisieren!!!

Die Konfigurationsdateien auf dem LeKiwi-LeRobot und dem Laptop sollten übereinstimmen. Zuerst müssen wir die **IP-Adresse** des Raspberry Pi für den mobilen Roboterarm finden. Dies ist dieselbe IP-Adresse, die auch für SSH verwendet wird. Außerdem müssen wir den **USB-Port** der Leader-Arm-Servo-Treiberplatine am Laptop und den **Port der Servo-Treiberplatine am LeKiwi** finden. Diese Ports lassen sich mit dem folgenden Skript ermitteln.

Unter Linux kann es nötig sein, den USB-Portzugriff mit dem folgenden Befehl zu gewähren:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Wichtiger Hinweis: Nachdem Sie die Portnummer der Leader-Arm und die IP-Adresse des Lekiwi-Roboterarms ermittelt haben, aktualisieren Sie bitte **ip** in der Netzwerkkonfiguration, **port** in der Leader-Arm-Konfiguration sowie **port, remote_ip** in der LeKiwi-Konfiguration.

Diese vier Dateien im Verzeichnis example\lekiwi ändern

![4. Die Konfiguration aktualisieren!!! – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

##### ①teleoperate.py ändern

remote_ip: IP-Adresse des Raspberry Pi

port: Portnummer, wenn der Leader-Arm mit einem Computer oder Linux verbunden ist

![①teleoperate.py ändern – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

##### ②record.py ändern

HF_REPO_ID: [Benutzername und Datensatzname auf Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip: IP-Adresse des Raspberry Pi

port: Portnummer, wenn der Leader-Arm mit einem Computer oder Linux verbunden ist

![②record.py ändern – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

##### ③replay.py ändern

remote_ip: IP-Adresse des Raspberry Pi

\<hf_username\>/\<dataset_repo_id\>, also [der Hugging-Face-Benutzername und der Datensatzname](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![③replay.py ändern – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### Kalibrierung

Jetzt müssen wir den Leader-Arm und den Follower-Arm kalibrieren. Die Servos der Omnidirektionalräder müssen nicht kalibriert werden.

#### Follower-Arm kalibrieren (montiert am Lekiwi-Chassis)

Führen Sie auf Ihrem Computer den folgenden Befehl aus, um den Leader-Arm zu kalibrieren. Hinweis: Das hier gezeigte Bild ist ein Beispiel für das Modell SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #Auf die gefundene Portnummer ändern
    --teleop.id=my_awesome_leader_arm
```

Führen Sie nun auf Ihrem Raspberry Pi den folgenden Befehl aus, um den Follower-Arm am LeKiwi zu kalibrieren. Ignorieren Sie seine aktuelle Position auf dem Tisch – die normale Kalibrierung sollte erfolgen, wenn er am Lekiwi-Chassis montiert ist.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Wir haben die Kalibrierungsmethoden für die meisten Roboter vereinheitlicht. Zuerst müssen wir den Roboter in eine Position bewegen, in der sich jedes Gelenk an seinem ** Mittelpunkt des Bewegungsbereichs befindet**, und dann die Taste drücken. Zweitens bewegen wir alle Gelenke durch ihren **. Ein Video des gleichen Kalibrierungsvorgangs für SO101 finden Sie als Referenz [hier](https://huggingface.co/docs/lerobot/en/so101#calibration-video)` Enter `.

## F. Fernbedienung

Öffnen Sie eine neue Anaconda-Eingabeaufforderung

![Follower-Arm kalibrieren montiert am Lekiwi-Chassis – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Wenn Sie einen Mac verwenden, müssen Sie dem Programm „Terminal" möglicherweise den Tastaturzugriff für Fernbedienungen erlauben. Gehen Sie zu „Systemeinstellungen" \> „Sicherheit &amp; Datenschutz" \> „Eingabeüberwachung" und aktivieren Sie das Kontrollkästchen „Terminal".
> 

Für Fernbedienungen per SSH beim Raspberry Pi anmelden, den folgenden Befehl ausführen, um die Umgebung zu aktivieren: `conda activate lerobot`, und dann das folgende Skript starten:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Follower-Arm kalibrieren montiert am Lekiwi-Chassis – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

Als Nächstes auf dem Laptop ebenfalls den folgenden Befehl ausführen, um die Umgebung zu aktivieren: `conda activate lerobot`, und dann das folgende Skript starten:

```Bash
python examples/lekiwi/teleoperate.py
```

Der Laptop-Bildschirm sollte eine Oberfläche ähnlich der folgenden anzeigen: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Jetzt können Sie den Steuerarm bewegen und mit den Tasten (W, A, S, D) der Tastatur den Roboter vorwärts, nach links drehen, rückwärts und nach rechts drehen. Mit den Tasten (Z, X) den Roboter links bzw. rechts drehen. Mit den Tasten (R, F) die Geschwindigkeit des mobilen Roboters erhöhen oder verringern. Insgesamt gibt es drei Geschwindigkeitsmodi – siehe folgende Tabelle:

Bei einer anderen Tastatur können Sie die Tastenbelegung für jeden Befehl in [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) ändern.

### Fehlerbehebung Kommunikation

Bei Verbindungsproblemen mit dem Mobilitätsroboter SO101 wie folgt vorgehen.

#### 1. IP-Adresskonfiguration prüfen

Sicherstellen, dass die richtige Raspberry-Pi-IP im Konfigurationsfile steht. IP abfragen (in der Pi-Konsole):

```Bash
hostname -I
```

#### 2. Prüfen, ob der Laptop/PC den Pi erreicht

Vom Laptop aus pingen:

```Bash
ping <your_pi_ip_address>
```

Bei Fehlschlag:

- Läuft der Pi und ist im selben Netzwerk?

- Ist SSH auf dem Pi aktiviert?

#### 3. SSH-Verbindung versuchen

Kein SSH-Login möglich → Verbindung evtl. nicht korrekt. Befehl:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

z. B. `ssh pi@192.168.0.106`

Bei Verbindungsfehler:

- SSH auf dem Pi aktivieren:

```Bash
sudo raspi-config
```

- Dann navigieren: **Interfacing Options -\> SSH** aktivieren.

#### 4. Konfigurationsdateien müssen übereinstimmen!!!

Sicherstellen, dass die Konfigurationsdateien auf Laptop/PC und Raspberry Pi exakt identisch sind.

## G. Datensatz aufzeichnen

Nachdem Sie sich mit der Fernbedienung vertraut gemacht haben, können Sie mit LeKiwi Ihren ersten Datensatz aufzeichnen.

Zum Starten des Programms auf LeKiwi per SSH mit dem Raspberry Pi verbinden und die folgenden Befehle ausführen, um die Umgebung zu aktivieren und das Skript zu starten:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Möchten Sie die Funktion des Hugging-Face-Hubs zum Hochladen eines Datensatzes nutzen und haben sich zuvor nicht angemeldet, melden Sie sich bitte mit einem Token mit Schreibrechten an; dieses kann in den [Hugging-Face-Einstellungen](https://huggingface.co/settings/tokens) erzeugt werden:

```Bash
hf auth login
```

Speichern Sie den Namen Ihres Hugging-Face-Repositorys in einer Variablen, um den folgenden Befehl auszuführen:

```Bash
hf auth whoami
```

Führen Sie dann auf Ihrem Laptop den folgenden Befehl aus, um 2 Runden aufzuzeichnen und den Datensatz in den Hub hochzuladen:

```Bash
python examples/lekiwi/record.py
```

## H. Datensatz visualisieren

Aufgeladene Datensätze können [online visualisiert](https://huggingface.co/spaces/lerobot/visualize_dataset) werden – die mit dem folgenden Befehl erzeugte Repository-ID kopieren und einfügen:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Ohne Upload auch lokal (Browser unter `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

#### Datensatz visualisieren (überspringbar, optional)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Bei Upload auch lokal:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Ohne Upload auch lokal:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Hierbei ist `juxi` der bei der Datenerfassung verwendete eigene `repo_id`.

##### Tipps zur Datenerfassung

Nach der Eingewöhnung größere Datensätze fürs Training erstellen. Gute Einstiegsaufgabe: Objekte an verschiedenen Positionen greifen und in einen Behälter legen. Mindestens 50 Episoden, 10 pro Position. Kameraposition fixieren, konsistente Greifbewegung beibehalten. Das Objekt muss im Kamerabild klar sichtbar sein; Faustregel: Die Aufgabe sollte nur anhand des Kamerabilds lösbar sein.

Im nächsten Kapitel trainieren Sie das neuronale Netz. Nach zuverlässiger Greifleistung kann mehr Variation eingeführt werden (mehr Greifpositionen, andere Techniken, Kameraposition ändern).

Nicht zu schnell zu viel Variation – das kann die Ergebnisse beeinträchtigen.

Mehr zu diesem Thema: [Blogartikel über gute Datensätze](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

##### Fehlerbehebung:

Unter Linux kommt es bei der Datenerfassung vor, dass die Pfeiltasten links/rechts und die Esc-Taste nicht funktionieren. Stellen Sie in diesem Fall sicher, dass die Umgebungsvariable `$DISPLAY` gesetzt ist. Siehe [Einschränkungen von pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## I. Eine Runde abspielen

Versuchen Sie nun, die erste Runde auf Ihrem Roboter abzuspielen:

```Bash
python examples/lekiwi/replay.py
```

Herzlichen Glückwunsch 🎉, Ihr Roboter ist bereit für autonome Lernaufgaben. Folgen Sie dem Trainingsteil dieses Tutorials, um mit dem Training zu beginnen: [Einführung in reale Roboter](https://huggingface.co/docs/lerobot/il_robots)

### K. Strategie bewerten

Achten Sie darauf, remote_ip, port und HF_MODEL_ID zu ändern

##### evaluate.py ändern

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" sollte auf den Namen des nach dem Training auf Hugging Face hochgeladenen Datensatzes (sofern hochgeladen) bzw. auf das Verzeichnis geändert werden, in das das Modell nach dem Training lokal exportiert wurde

HF_DATASET_ID = "\< hf_username \>/\< eval_dataset_id \>" – Benutzernamen und Namen des von Ihnen erstellten eval-Datensatzes ändern

remote_ip: IP-Adresse des Raspberry Pi

![evaluate.py ändern – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

Dann den folgenden Befehl ausführen:

```Bash
python examples/lekiwi/evaluate.py
```

1. Der Name des Datensatzes beginnt mit `eval`, um anzuzeigen, dass Sie eine Inferenz ausführen (z. B. `${HF_USER}/eval_act_lekiwi_test`).

2. Tritt in der Auswertungsphase ` File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx' ` auf, löschen Sie bitte zuerst den Ordner, der mit eval_ beginnt, und führen Sie das Programm erneut aus.

Simulationstraining siehe

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim

### Hilfe 🙋

Bei Hardware-Problemen wenden Sie sich bitte an den Kundendienst. Bei Anwendungsproblemen treten Sie bitte dem Discord bei.

[LeRobot-Plattform](https://github.com/huggingface/lerobot)

[LeRobot-Discord-Kanal](https://discord.gg/8TnwDdjFGU)

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />
