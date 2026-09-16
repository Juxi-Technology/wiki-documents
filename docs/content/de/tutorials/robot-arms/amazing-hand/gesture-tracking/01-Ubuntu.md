---
title: "Linux（Ubuntu）Ein-Klick-Deployment und -Ausführung"
description: "Dieses Tutorial basiert auf dem offiziellen Demo von AmazingHand （Fingerhand von Pollen Robotics）, die Ein-Kl…"
---

# Linux（Ubuntu）Ein-Klick-Deployment und -Ausführung

[AmazingHand-main.zip]

Dieses Tutorial basiert auf dem offiziellen Demo von AmazingHand （Fingerhand von Pollen Robotics）, die Ein-Klick-Deployment-Skripte sind bereits vorbereitet.
Führen Sie alles einfach in der Reihenfolge der Nummerierung aus. **Alle Skripte befinden sich im Ordner **`Demo/Linux(Ubuntu)一键部署脚本/`** und werden im Terminal mit **`./Skriptname`** ausgeführt.**

---

## Hardware-Vorbereitung

> Die Modelldateien können Sie auf [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) ansehen oder selbst herunterladen （inkl. URDF）.
> 
> 

---

## Ausführungsrechte für die Skripte erteilen （wichtig）

**Nach dem Kopieren der Skripte von Windows / aus einem Archiv nach Linux geht das Ausführungsrecht （**`+x`**） verloren**, bei direkter Ausführung wird
`Permission denied` gemeldet. **Vor der ersten Verwendung müssen Sie zuerst ausführen:**

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
chmod +x *.sh
```

Danach kann jedes Skript mit `./Skriptname` ausgeführt werden. Beides lässt sich auch zusammenfassen:

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本" && chmod +x *.sh && ./1-安装环境.sh
```

> Tipp: Beim Kopieren von `AmazingHand-main` nach Linux ist die Beibehaltung der Rechte mit **tar** am sichersten:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main` （auf einer beliebigen Seite — Windows/Linux — packen, auf der Linux-Seite entpacken）,
> oder nach dem Entpacken einmal einheitlich `chmod +x *.sh` ausführen.
> 
> 

---

## Umgebungsinstallation （Skript 1）

Im Terminal in das Skriptverzeichnis wechseln und ausführen （vergewissern Sie sich, dass der obenstehende Schritt 2 `chmod +x` bereits ausgeführt wurde）:

```Bash
cd "Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
./1-安装环境.sh
```

Automatisch wird Folgendes ausgeführt:

1. **Rust installieren** （rustup + stable-Toolchain）

2. **Cargo-Tsinghua-Spiegelquelle konfigurieren** （`~/.cargo/config.toml`）, beschleunigt den Download von Crates

3. **uv installieren** （Python-Paketmanager）

4. **dora-cli 0.5.0 installieren** （`cargo install`, erste Kompilierung ca. 10~20 Minuten, geduldig warten）

5. **dora-rs pip-Paket installieren** （optional）

> **Wichtig**: Nach Ende des Skripts **das Terminal schließen und neu öffnen**, damit die Umgebungsvariablen wirksam werden. Wenn die Versionsnummer leer angezeigt wird, den folgenden Pfad zu `~/.bashrc` hinzufügen:
> 
> export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
> 
> 

### Manuelle Installationsalternative （wenn das Skript nicht verfügbar ist）

- **Rust**:

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **uv**:

```Bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- **dora-cli**:

```Bash
cargo install dora-cli --version 0.5.0
```

### Cargo-Tsinghua-Spiegeleinstellung （~/.cargo/config.toml）

```Bash
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> Verwenden Sie den **sparse-Tsinghua-Index （dünnbesetzter Index）** （wie oben）, nicht einen git-Repository-Spiegel——die git-Methode lädt beim ersten Mal etwa 1GB Index herunter und bleibt leicht bei `Updating 'tuna' index` hängen.
> 
> 

---

## Verkabelung

- Servo-Treiberplatine per USB mit dem Computer verbinden, **externe 5V4A-Stromversorgung**

- Portnummer anzeigen:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

- In der Regel `/dev/ttyACM0`

---

## Seriellen Port konfigurieren （Skript 2）

**Ausführen von **`./2-配置串口.sh`**：**

1. Aufforderung „Bitte die Servo-Treiberplatine mit dem Computer verbinden" → Enter drücken, um die Erkennung zu starten

2. Listet die erkannten seriellen Ports automatisch auf （`/dev/ttyACM*` / `/dev/ttyUSB*`）

3. Bei einem einzelnen Port mit Enter bestätigen, bei mehreren Ports die Nummer eingeben

4. Schreibt automatisch den `--serialport` in die 3 dataflow-yml-Dateien und den Standardport in `AHControl/src/main.rs`

5. **Konfiguriert automatisch die Rechte für den seriellen Port**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

6. Es wird empfohlen, den aktuellen Benutzer zur Gruppe dialout hinzuzufügen （vermeidet die Passworteingabe bei jedem Mal, Ab- und Anmelden erforderlich）:

```Bash
sudo usermod -aG dialout $USER
```

> Wenn `ls /dev/ttyUSB* /dev/ttyACM*` in einer virtuellen Maschine kein Ergebnis liefert, verbinden Sie das USB-Gerät in den Einstellungen der virtuellen Maschine mit dieser.
> 
> 

---

## Code-Deployment （Skript 3）

**Ausführen von **`./3-部署代码.sh`**, automatisch wird Folgendes ausgeführt:**

1. dora-Daemon starten （`dora up`）

2. Virtuelle Python-3.12-Umgebung erstellen （`uv venv --python 3.12`）

3. Virtuelle Umgebung aktivieren

4. AHControl-Rust-Knoten kompilieren （`cargo build --release`, beim ersten Mal ca. 10 Minuten）

5. AHSimulation- und HandTracking-Abhängigkeiten synchronisieren （`uv sync`）

6. mediapipe==0.10.14 zwangsweise installieren （bekannte Falle des Tutorials, Absicherung）

> Das Deployment muss nur einmal ausgeführt werden. Bei späterer erneuter Ausführung wird gefragt, ob die virtuelle Umgebung neu erstellt werden soll.
> 
> 

---

## Code ausführen （Skript 4）

**Ausführen von **`./4-运行代码.sh`**, es erscheint ein interaktives Menü:**

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- **1** wählen: Simulationsumgebung, Kameragesten steuern zwei simulierte Hände

- **2** wählen: ins Untermenü wechseln und rechte Hand / linke Hand / beide Hände wählen

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

Nach der Auswahl wird automatisch `dora build` + `dora run` ausgeführt. Ein Kamerafenster öffnet sich; machen Sie Gesten vor der Kamera, die Fingerhand folgt in Echtzeit. **Ctrl+C zum Stoppen**, nach Ende des Datenstroms Enter drücken, um zum Hauptmenü zurückzukehren; Sie können dann einen anderen Modus wählen oder mit `q` beenden.

> Der Linux-Desktop benötigt Kameraberechtigungen （z. B. Ubuntu-Datenschutzeinstellungen → Kamera）; vergewissern Sie sich außerdem, dass die Kamera nicht von anderen Anwendungen belegt ist.
> Wenn sich die Kamera in einer virtuellen Maschine nicht öffnen lässt, siehe  9.6 Kameraberechtigung / Kamera lässt sich in der virtuellen Maschine nicht öffnen.
> 
> 

---

## Projektbereinigung （Skript 0）

**Ausführen von **`./0-清理项目.sh`**, nach Eingabe von `Y` zur Bestätigung wird automatisch bereinigt:**

1. dora-Daemon stoppen

2. 3 virtuelle Umgebungen löschen （`.venv`）

3. Rust-Kompilierungsartefakte löschen （`Demo/target`）

4. `__pycache__`, `.bak`-Sicherungen, Logs und `Demo/out` löschen （dora-Logverzeichnis）

5. **Standardport wiederherstellen** （`--serialport /dev/ttyACM0`）, lokale Reste des seriellen Ports entfernen

> Nach der Bereinigung können Sie den gesamten Ordner `AmazingHand-main` an andere weitergeben, sauber und ohne Reste. Auf einem neuen Rechner einfach in der Reihenfolge 1 → 2 → 3 → 4 ausführen.
> 
> 

---

## Häufige Fragen und Hinweise

### 9.1 `Permission denied` （Skript hat keine Ausführungsrechte）

- Symptom: Bei Ausführung von `./1-安装环境.sh` wird `bash: ./1-安装环境.sh: Permission denied` gemeldet

- Ursache: Nach dem Kopieren der Skripte von Windows / aus einem Archiv nach Linux geht **das Ausführungsbit verloren**

- Lösung: Allen Skripten Ausführungsrechte erteilen

```Bash
chmod +x *.sh
```

- Dann mit `./Skriptname` ausführen （nicht mit `bash 脚本名`, das umgeht die interaktive Aufforderung aus Schritt 2 dieses Tutorials）

### 9.2 cargo bleibt bei `Updating 'tuna' index` hängen

- Ursache: Die Spiegelkonfiguration verwendet **die git-Repository-Methode** （`.../git/crates.io-index.git`）, beim ersten Mal werden 1GB+ Index heruntergeladen

- Lösung: `~/.cargo/config.toml` auf **sparse dünnbesetzten Index** ändern （siehe Abschnitt 3.2）, oder direkt `1-安装环境.sh` erneut ausführen

### 9.3 mediapipe fehlt das solutions-Untermodul / Installation beschädigt

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Muss bei aktivierter virtueller Umgebung ausgeführt werden （im `Demo`-Verzeichnis）

- `3-部署代码.sh` führt diesen Schritt bereits automatisch als Absicherung aus

### 9.4 dora-Version inkompatibel （message v0.8.0 vs v0.7.0）

- Symptom: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Ursache: Die dora-cli-Version passt nicht zu dora-node-api. **Muss einheitlich 0.5.0 sein**

    - Prüfen: `dora --version` sollte `dora-cli 0.5.0`, `dora-message: 0.8.0` ausgeben

    - `1-安装环境.sh` erkennt die Version jetzt **automatisch**: Ist sie nicht 0.5.0, wird bereinigt und zwangsweise neu installiert

**Falls im System eine alte dora-Version verbleibt （z. B. 0.4.1）, zuerst manuell bereinigen und dann neu installieren:**

```Bash
# 1. Ermitteln, wo die alte dora-Version liegt
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Gefundene alte Version löschen (nach tatsächlichem Pfad, evtl. mehrere)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Installation von 0.5.0 erzwingen (nach ~/.cargo/bin)
cargo install dora-cli --version 0.5.0 --force

# 4. Version überprüfen (sollte dora-cli 0.5.0 / dora-message: 0.8.0 ausgeben)
dora --version
```

> Wenn `dora --version` weiterhin eine alte Version anzeigt, verbirgt sich an einer anderen Stelle im PATH noch eine alte dora-Version; spüren Sie sie mit `which dora` einzeln auf und löschen Sie sie, und stellen Sie sicher, dass `~/.cargo/bin` im PATH weiter vorne steht.
> 
> 

### 9.5 Keine Rechte für den seriellen Port （Permission denied）

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

- Bei jedem erneuten An- und Abstecken können die Rechte zurückgesetzt werden

- Grundlegende Lösung: `sudo usermod -aG dialout $USER`, ab- und wieder anmelden

### 9.6 Kameraberechtigung / Kamera lässt sich in der virtuellen Maschine nicht öffnen

**Echter Host**:

- Ubuntu: Einstellungen → Datenschutz → Kamera → Zugriff für Anwendungen erlauben

- Vergewissern Sie sich, dass die Kamera nicht von anderen Anwendungen （Kamera-App, Zoom usw.） belegt ist

**Kamera lässt sich in der virtuellen Maschine （VMware） nicht öffnen**:

Symptom: `open VIDEOIO(V4L2:/dev/video0): can't open camera by index` oder `select() timeout`,
während `ls /dev/video0` existiert und `v4l2-ctl` Frames erfassen kann, aber OpenCV `cap.read()` immer `ret = False` liefert.

Fehlersuche und Lösung （in dieser Reihenfolge）:

1. **Kamera in die virtuelle Maschine weiterleiten**: Menü → Virtuelle Maschine → Wechselmedien → Kamera → Verbinden

2. **USB-Controller-Version umschalten （häufige VMware-Lösung, am effektivsten）**:

    - Virtuelle Maschine → Einstellungen → **USB-Controller** → `USB 2.0` / `USB 3.1` umschalten

    - Nach dem Umschalten **die virtuelle Maschine neu starten** und erneut versuchen

3. Prüfen, ob das Gerät existiert:

```Plain Text
ls -l /dev/video0
sudo usermod -aG video $USER   # 加入 video 组，注销重登
```

4. Mit v4l2 prüfen, ob die Kamera wirklich Frames liefert （Frame vorhanden = Treiber in Ordnung, Problem liegt bei der OpenCV-Kompatibilität）:

```Bash
v4l2-ctl --device=/dev/video0 --set-fmt-video=width=640,height=480,pixelformat=MJPG --stream-mmap --stream-count=1 --stream-to=/tmp/frame.jpg
ls -l /tmp/frame.jpg   # 有几十~几百KB = 流通
```

### 9.7 Portnummer ändert sich jedes Mal

- Nach dem erneuten An- und Abstecken des USB kann sich die Gerätenummer ändern; `2-配置串口.sh` erneut ausführen

### 9.8 openCV fehlt

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（im `HandTracking`-Verzeichnis, nach Aktivierung der virtuellen Umgebung ausführen）

---

## Beschreibung der Code-Struktur

### Demo-Verzeichnis

### Zuordnung der einzelnen dataflow-Dateien

### Prinzip des Datenflusses

```Plain Text
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Position der Portkonfiguration

- Die `args:`-Zeile der drei `dataflow_tracking_real_*.yml`: `--serialport /dev/ttyACMx`

- `default_value = "/dev/ttyACM0"` in `AHControl/src/main.rs` （Standardwert des Seriell-Port-Parameters）

- `AHControl/config/*.toml`: Servo-Modell, ID, Offset （muss in der Regel nicht geändert werden）

