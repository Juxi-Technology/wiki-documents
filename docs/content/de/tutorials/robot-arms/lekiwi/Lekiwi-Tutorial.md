---
title: Lekiwi-Mobilitätsroboter – Bedienungstutorial
description: "Kompletter Leitfaden für den LeRobot-basierten Lekiwi-Mobilitätsroboter: Einrichtung, Motorkonfiguration, Teleoperation, Datenerfassung, Training und Evaluation"
---

# Lekiwi-Mobilitätsroboter – Bedienungstutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


> [!Hinweis] Dieses Tutorial basiert auf der offiziellen LeRobot-Dokumentation. Bei unlösbaren Software- oder Umgebungsproblemen wenden Sie sich an die [LeRobot-Plattform](https://github.com/huggingface/lerobot) oder den [LeRobot-Discord-Kanal](https://discord.gg/8TnwDdjFGU).

## Hauptmerkmale

1. **Open Source und kostengünstig**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) bietet eine quelloffene, günstige Roboterkarren-Lösung.
2. **LeRobot-Integration**: Entwickelt für die Integration in die [LeRobot-Plattform](https://github.com/huggingface/lerobot).
3. **Umfangreiche Lernressourcen**: Vollständige Open-Source-Ressourcen mit Montage- und Kalibrierungsanleitung sowie Tutorials zu Test, Datenerfassung, Training und Deployment – für einen schnellen Einstieg in die Roboterentwicklung.
4. **Nvidia-kompatibel**: Kombinierbar mit dem reComputer Mini J4012 Orin NX 16 GB.
5. **Vielseitige Einsatzbereiche**: Für Bildung, Forschung, automatisierte Produktion und Robotik geeignet – effiziente, präzise Roboteroperationen für komplexe Aufgaben.

JUXI ist nur für die Qualität der Hardware verantwortlich. Die Tutorials folgen streng der offiziellen Dokumentation.

**Achtung**
- Alle Servos im Lekiwi-Chassis benötigen 12 V. Für Anwender mit 5-V-Roboterarm liefern wir einen 12-V-zu-5-V-Abwärtswandler. Schaltungsanpassungen müssen Sie selbst vornehmen.
- 12-V-Netzteil – bei Bedarf beim Checkout auswählbar. Wer bereits ein 12-V-Netzteil besitzt, muss nur den Ausgang auf einen 5521-DC-Stecker umrüsten.
- Raspberry-Pi-Controller und Kamera – separat über die Bestellschnittstelle zu kaufen.

## Stückliste (BOM)



## Anfangssystemumgebung

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

### SSH einrichten

Nach der Einrichtung des Raspberry Pi sollten Sie [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol) aktivieren und konfigurieren, um sich vom Laptop anzumelden, ohne Bildschirm, Tastatur und Maus anzuschließen. [Hier](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh) finden Sie ein gutes Tutorial. Sie können sich über die Eingabeaufforderung (cmd) anmelden oder – bei VSCode – [diese](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) Erweiterung nutzen.

## 3D-Druck-Leitfaden

### Bauteile

Wir stellen druckbare STL-Dateien für die folgenden 3D-Druckteile bereit. Die Teile lassen sich mit gängigem PLA-Filament auf Consumer-FDM-Druckern drucken. Getestet auf einem Bambu Lab P1S. Für alle Komponenten einfach in bambuslicer laden, automatisch drehen/anordnen lassen und empfohlene Stützen aktivieren.

### Druckparameter

Die STL-Dateien lassen sich auf vielen FDM-Druckern direkt drucken. Folgende Einstellungen wurden getestet und empfohlen; andere können ebenfalls funktionieren.

- Material: PLA+
- Düsendurchmesser und Präzision: 0,2 mm Düse, Schichthöhe 0,2 mm
- Füllungsdichte: 15 %
- Druckgeschwindigkeit: 150 mm/s
- Bei Bedarf G-Code (Slicerdatei) auf den Drucker laden und drucken

# LeRobot installieren

Auf Ihrem Raspberry Pi:

### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Shell neu starten

In Ihrer Shell einfügen: `source ~/.bashrc` bzw. für Mac: `source ~/.bash_profile` oder `source ~/.zshrc` (bei zshell)

### 3. Neue Conda-Umgebung für LeRobot erstellen und aktivieren

```Python
conda create -y -n lerobot python=3.10
```

Dann Conda-Umgebung aktivieren (bei jeder Shell-Nutzung von LeRobot nötig!):

```Bash
conda activate lerobot
```

### 4. LeRobot klonen:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. ffmpeg in der Umgebung installieren:

Bei `miniconda` in der Umgebung `ffmpeg` installieren:

```PowerShell
conda install ffmpeg -c conda-forge
```

Dies installiert in der Regel ffmpeg 7.X, kompiliert mit dem libsvtav1-Encoder. Falls libsvtav1 nicht unterstützt wird (prüfbar mit `ffmpeg -encoders`):

【Alle Plattformen】ffmpeg 7.X explizit installieren:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Nur Linux】Build-Abhängigkeiten von ffmpeg installieren und ffmpeg mit libsvtav1 aus dem Quellcode kompilieren; mit `which ffmpeg` sicherstellen, dass die richtige ausführbare Datei verwendet wird.

Bei folgendem Fehler hilft der obige Befehl ebenfalls.



### 6. LeRobot mit feetech-Motor-Abhängigkeiten installieren:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. Verbindungszeit einstellen

Unter `lerobot\src\lerobot\robots\lekiwi` die Datei config_lekiwi.py finden
connection_time_s: int = 7200 # also 2 Stunden



## C. LeRobot auf dem Laptop installieren

Wenn LeRobot bereits auf dem Laptop installiert ist, diesen Schritt überspringen; andernfalls die **gleichen Schritte** wie auf dem Raspberry Pi ausführen.

> [!Tipp] Wir nutzen häufig die Eingabeaufforderung (cmd). Bei Unerfahrenheit: [Crash-Kurs Kommandozeile](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line).

Auf Ihrem Rechner:

### 1. [Miniconda installieren](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. Shell neu starten

In Ihrer Shell einfügen: `source ~/.bashrc` bzw. für Mac: `source ~/.bash_profile` oder `source ~/.zshrc` (bei zshell)



### 3. Conda-Umgebung für LeRobot erstellen und aktivieren

```Python
conda create -y -n lerobot python=3.10
```

Dann Conda-Umgebung aktivieren (bei jeder Nutzung von LeRobot nötig!):

```Bash
conda activate lerobot
```

### 4. LeRobot klonen:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. ffmpeg in der Umgebung installieren:

Bei `miniconda` in der Umgebung `ffmpeg` installieren:

```PowerShell
conda install ffmpeg -c conda-forge
```

Dies installiert in der Regel ffmpeg 7.X mit libsvtav1-Encoder. Falls nicht unterstützt (mit `ffmpeg -encoders` prüfbar):

【Alle Plattformen】ffmpeg 7.X explizit:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Nur Linux】ffmpeg-Build-Abhängigkeiten installieren und ffmpeg mit libsvtav1 aus dem Quellcode kompilieren; mit `which ffmpeg` prüfen.

Bei folgendem Fehler hilft der obige Befehl ebenfalls.



### 6. LeRobot mit feetech-Motor-Abhängigkeiten installieren:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# Motoren konfigurieren





### **1. Mit dem Roboterarm verbundenen USB-Port finden**

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

### **2. Motoren konfigurieren (beim fertigen Produkt überspringbar)**

Jeden Motor des Chassis nacheinander einstecken und das folgende Skript ausführen – es initialisiert zuerst die Servos des Roboterarms (ID 6..1), dann die Chassis-Servos und setzt deren IDs (ID 9..7). Bei bereits kalibriertem Arm kann man mit Enter durchgehend überschreiben und überspringen:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```



### 3. HuggingFace-Mirror einrichten

- Ubuntu

```Shell
sudo nano ~/.bashrc
# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT
# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc
# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc
# 输出
# https://hf-mirror.com
```

#### ①Token erstellen

https://huggingface.co/settings/tokens







#### ②Token notieren

Zum Beispiel meiner:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③Token binden

```Shell
hf auth login
hf auth whoami
```



## Teleoperation

Per SSH mit dem Raspberry Pi verbinden, Umgebung aktivieren und Host-Skript starten:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```



Dann auch auf dem Laptop `conda activate lerobot` ausführen und das folgende Skript starten:

```Bash
python examples/lekiwi/teleoperate.py
```

Der Laptop-Bildschirm sollte Folgendes zeigen: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Jetzt können Sie den Steuerarm bewegen und mit (W, A, S, D) vorwärts, links, rückwärts, rechts steuern. Mit (Z, X) links/rechts drehen. Mit (R, F) die Geschwindigkeit erhöhen oder verringern. Es gibt drei Geschwindigkeitsmodi – siehe Tabelle:

Bei anderer Tastatur die Tastenbelegung in [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) ändern.

## Fehlerbehebung Kommunikation

Bei Verbindungsproblemen mit dem Mobilitätsroboter SO101 wie folgt vorgehen.

### 1. IP-Adresskonfiguration prüfen

Sicherstellen, dass die richtige Raspberry-Pi-IP im Konfigurationsfile steht. IP abfragen (in der Pi-Konsole):

```Bash
hostname *-I*
```

### 2. Prüfen, ob der Laptop/PC den Pi erreicht

Vom Laptop aus pingen:

```Bash
ping <your_pi_ip_address>
```

Bei Fehlschlag:
- Läuft der Pi und ist im selben Netzwerk?
- Ist SSH auf dem Pi aktiviert?

### 3. SSH-Verbindung versuchen

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

### 4. Konfigurationsdateien müssen übereinstimmen!!!

Sicherstellen, dass die Konfigurationsdateien auf Laptop/PC und Raspberry Pi exakt identisch sind.

# G. Datensatz aufzeichnen

Nach der Eingewöhnung mit dem ersten Datensatz beginnen.

Zum Start auf dem LeKiwi per SSH mit dem Raspberry Pi verbinden, Umgebung aktivieren und Skript starten:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Für den Upload über den Hugging-Face-Hub gegebenenfalls mit Schreibrechte-Token anmelden (Erstellung unter [Hugging Face Settings](https://huggingface.co/settings/tokens)):

```Shell
hf auth login
hf auth whoami
```

Den Hub-Repository-Namen in einer Variablen speichern:

```Bash
hostname *-I*
```

Dann auf dem Laptop 2 Episoden aufzeichnen und in den Hub hochladen:

```Bash
python examples/lekiwi/record.py
```

# H. Datensatz visualisieren

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

### Datensatz visualisieren (überspringbar, optional)

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
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

#### Tipps zur Datenerfassung

Nach der Eingewöhnung größere Datensätze fürs Training erstellen. Gute Einstiegsaufgabe: Objekte an verschiedenen Positionen greifen und in einen Behälter legen. Mindestens 50 Episoden, 10 pro Position. Kameraposition fixieren, konsistente Greifbewegung beibehalten. Das Objekt muss im Kamerabild klar sichtbar sein; Faustregel: Die Aufgabe sollte nur anhand des Kamerabilds lösbar sein.

Im nächsten Kapitel trainieren Sie das neuronale Netz. Nach zuverlässiger Greifleistung kann mehr Variation eingeführt werden (mehr Greifpositionen, andere Techniken, Kameraposition ändern).

Nicht zu schnell zu viel Variation – das kann die Ergebnisse beeinträchtigen.

Mehr zu diesem Thema: [Blogartikel über gute Datensätze](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

#### Fehlerbehebung:
