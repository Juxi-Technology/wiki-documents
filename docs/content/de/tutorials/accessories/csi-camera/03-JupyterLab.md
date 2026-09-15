---
title: "03、Jupyter Lab verwenden"
description: "Installieren Sie Jupyter Lab mit dem folgenden Befehl: Wenn der Download von Jupyter Lab langsam ist, können …"
---

# 03、Jupyter Lab verwenden

## 1、Jupyter Lab installieren

### 1.1、Jupyter Lab

Installieren Sie Jupyter Lab mit dem folgenden Befehl: Wenn der Download von Jupyter Lab langsam ist, können Sie eine angegebene Quelle für die Installation verwenden.

```Plain Text
sudo apt update
sudo apt install python3-pip -y
sudo pip3 install --upgrade pip
```

```Plain Text
sudo pip3 install jupyterlab
# Tsinghua-Quelle: pip3 install jupyterlab -i https://pypi.tuna.tsinghua.edu.cn/simple
# Alibaba-Cloud-Quelle: sudo pip3 install jupyterlab -i https://mirrors.aliyun.com/pypi/simple/
```

![Abb. 1](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/1.png)

![Abb. 2](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/2.png)

![Abb. 3](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/3.png)

![Abb. 4](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/4.png)

### 1.2、Node.js

Installieren Sie die neueste Version von Node.js mit dem folgenden Befehl:

```Plain Text
sudo apt install curl -y
sudo curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y
```

![Abb. 5](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/5.png)

Version überprüfen:

```Plain Text
node -v && npm -v
```

![Abb. 6](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/6.png)

## 2、Jupyter Lab starten

Vor dem Start von Jupyter Lab müssen Sie den Standardbrowser des Systems festlegen, andernfalls erscheinen beim Start im Terminal einige Hinweise.

### 2.1、Standardbrowser festlegen

Öffnen Sie den Chromium-Browser des Systems und wählen Sie die Einstellung des Standardbrowsers:

![Abb. 7](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/7.png)

![Abb. 8](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/8.png)

### 2.2、Jupyter Lab starten

```Plain Text
jupyter lab
# Start ohne Browser: jupyter lab --no-browser
# Start als Administrator: sudo jupyter lab --allow-root
```

![Abb. 9](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/9.png)

![Abb. 10](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/10.png)

### 2.3、Zugriff vom Host-Rechner

Der Host-Rechner bezeichnet den Zugriff über das Jetson-Platinensystem; greifen Sie direkt über [http://localhost:8888/](http://localhost:8888/) zu:

`http://localhost:8888/`

![Abb. 11](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/11.png)

## 3、Jupyter Lab konfigurieren

Konfigurieren Sie für Jupyter Lab den Zugriff im lokalen Netzwerk, das Zugriffspasswort, den Autostart und weitere Vorgänge.

### 3.1、Zugriff im lokalen Netzwerk

Konfigurieren Sie, dass Geräte im selben lokalen Netzwerk im Browser IP:8888 eingeben können, um zuzugreifen!

**Hinweis: Der Zugriff über das lokale Netzwerk eines Campusnetzwerks ist in der Regel nicht möglich; testen Sie stattdessen mit einem Laptop- oder Smartphone-Hotspot.**

Zum Beispiel ist die IP der Platine 192.168.0.105; über einen Browser im selben lokalen Netzwerk können Sie 192.168.0.105:8888 eingeben, um auf Jupyter Lab der Platine zuzugreifen.

#### 3.1.1、Konfigurationsdatei erstellen

```Plain Text
sudo jupyter lab --generate-config
```

Speicherort der automatisch erstellten Konfigurationsdatei: Writing default config to: /root/.jupyter/jupyter_lab_config.py

#### 3.1.2、Konfigurationsdatei bearbeiten

```Plain Text
sudo gedit /root/.jupyter/jupyter_lab_config.py
```

Zu ändernder Inhalt: Klicken Sie nach der Änderung auf Speichern und schließen Sie die Datei.

Achten Sie darauf, ob vor dem Code ein \#-Zeichen steht, damit die Konfiguration wirksam wird.

```Plain Text
# Erlaubt Anfragen von beliebigen Quellen den Zugriff auf den Jupyter Lab-Server
c.ServerApp.allow_origin = '*'
# 0.0.0.0 bedeutet, alle verfügbaren Netzwerkschnittstellen zu binden und den Zugriff von jeder Adresse zu erlauben
c.ServerApp.ip = '0.0.0.0'
# Erlaubt den Start des Jupyter Lab-Servers als root-Benutzer
c.ServerApp.allow_root = True
# Den Standardport ändern, um Konflikte zu vermeiden
c.ServerApp.port = 8888
```

![Abb. 12](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/12.png)

### 3.2、Zugriffspasswort konfigurieren

Geben Sie im Terminal den Befehl zum Festlegen des Passworts ein; die Eingabe muss zweimal erfolgen, und das eingegebene Passwort wird nicht angezeigt\!

```Plain Text
sudo jupyter lab password
```

Speicherort der automatisch erstellten Konfigurationsdatei: [JupyterPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_server_config.json

![Abb. 13](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/13.png)

### 3.3、Autostart-Dienst

#### 3.3.1、Dienstdatei bearbeiten

```Plain Text
sudo gedit /etc/systemd/system/jupyterlab.service
```

Hinzuzufügender Inhalt: Klicken Sie nach dem Hinzufügen auf Speichern und schließen Sie die Datei.

```Plain Text
[Unit]
Description=jupyterlab
After=network.target
[Service]
Type=simple
ExecStart=/usr/local/bin/jupyter-lab
config=/root/.jupyter/jupyter_lab_config.py --no-browser
User=root
Group=root
WorkingDirectory=/home/jetson/
Restart=always
RestartSec=10
[Install]
WantedBy=multi-user.target
```

root: der Benutzername des Systems

ExecStart: der Befehl zum Starten von Jupyter lab, ändern Sie ihn in den Installationspfad von JupyterLab

config: ändern Sie ihn in den Pfad der JupyterLab-Konfigurationsdatei

WorkingDirectory: das Arbeitsverzeichnis, das beim Start von Jupyter-lab geöffnet wird; kann frei geändert werden (empfohlen: in das Benutzerverzeichnis ändern)

`Jupyter-lab-Installationspfad anzeigen: which jupyter-lab`

`Pfad der Konfigurationsdatei: siehe den oben beim Erstellen der Konfigurationsdatei angegebenen Pfad`

![Abb. 14](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/14.png)

#### 3.3.2、Autostart-Dienst einrichten

##### Autostart-Dienst

```Plain Text
sudo systemctl enable jupyterlab
# Autostart deaktivieren: systemctl disable jupyterlab
```

##### **Dienst starten**

```Plain Text
sudo systemctl start jupyterlab
# Dienst stoppen: sudo systemctl stop jupyterlab
```

##### **Dienststatus anzeigen**

```Plain Text
systemctl status jupyterlab
```

![Abb. 15](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/15.png)

##### Autostart beim Booten überprüfen

Greifen Sie nach dem Neustart des Systems anhand der System-IP mit einem Gerät im selben lokalen Netzwerk über Platinen-IP:8888 zu.

> Beim ersten Zugriff müssen Sie das Passwort eingeben; das Passwort entspricht den in den vorherigen Schritten festgelegten Informationen.
> 
> Zum Zeitpunkt des Screenshots ist die IP der Platine 192.168.0.105, daher können Geräte im selben lokalen Netzwerk über 192.168.0.105:8888 zugreifen.
> 
> 

![Abb. 16](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/16.png)

## 4、Jupyter Lab verwenden

### 4.1、Kernel

Es wird empfohlen, bei jeder Programmausführung oder bei Programmfehlern den Kernel neu zu starten und alle Zellenausgaben zu löschen:

![Abb. 17](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/17.png)

### 4.2、Programm ausführen

Öffnen Sie die auszuführende Programmdatei über Jupyter Lab; führen Sie das Programm aus, indem Sie die Zellen von oben nach unten nacheinander ausführen:

#### 4.2.1、Wird ausgeführt

Zeigt die Zelle oben links [\*] an, bedeutet dies, dass sie gerade ausgeführt wird:

![Abb. 18](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/18.png)

#### 4.2.2、Ausführung abgeschlossen

Zeigt die Zelle oben links [Zahl] an, gibt dies die Reihenfolge der Ausführung an: zum Beispiel [1] → das Programm hat den Code dieser Zelle beim ersten Lauf ausgeführt

![Abb. 19](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/19.png)



