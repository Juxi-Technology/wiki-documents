---
title: "Mac Ein-Klick-Deployment und -Ausführung"
description: "AmazingHand Gesten-Tracking per Ein-Klick-Deployment unter Mac: Skripte im Terminal ausführen, Simulation oder echte Hand per Kamerageste steuern."
---

# Mac Ein-Klick-Deployment und -Ausführung

AmazingHand-main.zip

Dieses Tutorial basiert auf dem offiziellen Demo von AmazingHand （Fingerhand von Pollen Robotics）, die Ein-Klick-Deployment-Skripte sind bereits vorbereitet. Führen Sie alles einfach in der Reihenfolge der Nummerierung aus. **Alle Skripte befinden sich im Ordner Demo/Mac一键部署脚本/ und werden im Terminal mit ./Skriptname ausgeführt.**

---

## Hardware-Vorbereitung

|Hardware|Anforderung|
|---|---|
|Fingerhand selbst|rechte Hand / linke Hand / beide Hände|
|Servo-Treiberplatine|extern, USB mit dem Computer verbunden|
|Stromversorgung|**mindestens 5V 4A** （USB-Stromversorgung reicht nicht aus, externe Stromversorgung erforderlich）|
|Kamera|integrierte Mac-Kamera oder USB-Kamera|

> Die Modelldateien können Sie auf [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) ansehen oder herunterladen （inkl. URDF）.
> 
> 

---

## Ausführungsrechte für die Skripte erteilen （wichtig）

**Nach dem Kopieren der Skripte von Windows / aus einem Archiv auf den Mac geht das Ausführungsrecht （**`+x`**） verloren, bei direkter Ausführung wird
**`Permission denied`** gemeldet. Vor der ersten Verwendung müssen Sie zuerst ausführen:**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

Danach kann jedes Skript mit `./Skriptname` ausgeführt werden.

> Tipp: Beim Kopieren von `AmazingHand-main` auf den Mac ist die Beibehaltung der Rechte mit **tar** am sichersten:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, oder nach dem Entpacken einmal einheitlich `chmod +x *.sh` ausführen.
> 
> 

---

## Umgebungsinstallation （Skript 1）

Im Terminal in das Skriptverzeichnis wechseln und ausführen （vergewissern Sie sich, dass der obenstehende Schritt 2 `chmod +x` bereits ausgeführt wurde）:

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

Automatisch wird Folgendes ausgeführt:

1. **Xcode-Kommandozeilenwerkzeuge prüfen** （für die Rust-Kompilierung erforderlich）. Bei Fehlen wird `xcode-select --install` empfohlen

2. **Rust installieren** （rustup + stable-Toolchain）

3. **Cargo-Tsinghua-Spiegelquelle konfigurieren** （`~/.cargo/config.toml`）, beschleunigt den Download von Crates

4. **uv installieren** （Python-Paketmanager）

5. **dora-cli 0.5.0 installieren** （`cargo install`, erste Kompilierung ca. 10~20 Minuten, geduldig warten）. Alte dora-Versionen werden automatisch bereinigt

6. **dora-rs pip-Paket installieren** （optional）

> **Wichtig**: Nach Ende des Skripts **das Terminal schließen und neu öffnen**, damit die Umgebungsvariablen wirksam werden. Wenn die Versionsnummer leer angezeigt wird, den folgenden Pfad zu `~/.zshrc` hinzufügen:
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### Manuelle Installationsalternative （wenn das Skript nicht verfügbar ist）

- **Xcode-Kommandozeilenwerkzeuge**: `xcode-select --install`

- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**: `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Cargo-Tsinghua-Spiegel （~/.cargo/config.toml）

```Plain Text
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

- Der USB-Serienport-Gerätename von macOS ist **/dev/tty.usbmodem\*** oder **/dev/cu.usbmodem\*** （nicht `/dev/ttyACM*` unter Linux）

- Port anzeigen:

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## Seriellen Port konfigurieren （Skript 2）

**Ausführen von **`./2-配置串口.sh`**：**

1. Aufforderung „Bitte die Servo-Treiberplatine mit dem Computer verbinden" → Enter drücken, um die Erkennung zu starten

2. Listet die erkannten seriellen Ports automatisch auf （`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`）

3. Bei einem einzelnen Port mit Enter bestätigen, bei mehreren Ports die Nummer eingeben

4. Schreibt automatisch den `--serialport` in die 3 dataflow-yml-Dateien und den Standardport in `AHControl/src/main.rs`

5. Der USB-Serienport von macOS ist in der Regel für den Benutzer les- und schreibbar; bei Meldung fehlender Rechte manuell ausführen:

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

oder unter **Systemeinstellungen → Datenschutz & Sicherheit → Eingabemonitoring**, dem Terminal den Zugriff erlauben.

> Wenn Sie sich in einer virtuellen Maschine befinden, verbinden Sie das USB-Gerät mit der virtuellen Maschine.
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

Nach der Auswahl wird automatisch `dora build` + `dora run` ausgeführt. Ein Kamerafenster öffnet sich; machen Sie Gesten vor der Kamera, die Fingerhand folgt in Echtzeit. **Ctrl+C zum Stoppen**, nach Ende des Datenstroms Enter drücken, um zum Hauptmenü zurückzukehren; Sie können dann einen anderen Modus wählen oder mit q beenden.

> **Beim ersten Ausführen fragt macOS nach der Kameraberechtigung**: Systemeinstellungen → Datenschutz & Sicherheit → Kamera, dem Terminal die Nutzung der Kamera erlauben.
> 
> 

---

## Projektbereinigung （Skript 0）

**Ausführen von **`./0-清理项目.sh`**, nach Eingabe von Y zur Bestätigung wird automatisch bereinigt:**

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

- Ursache: Nach dem Kopieren der Skripte von Windows / aus einem Archiv auf den Mac geht **das Ausführungsbit verloren**

- Lösung:

```Plain Text
chmod +x *.sh
```

### 9.2 cargo bleibt bei `Updating 'tuna' index` hängen

- Ursache: Die Spiegelkonfiguration verwendet **die git-Repository-Methode** （`.../git/crates.io-index.git`）, beim ersten Mal werden 1GB+ Index heruntergeladen

- Lösung: `~/.cargo/config.toml` auf **sparse dünnbesetzten Index** ändern （siehe Abschnitt 3.2）, oder direkt `1-安装环境.sh` erneut ausführen

### 9.3 mediapipe fehlt das solutions-Untermodul / Installation beschädigt

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- Muss bei aktivierter virtueller Umgebung ausgeführt werden （im Demo-Verzeichnis）

- `3-部署代码.sh` führt diesen Schritt bereits automatisch als Absicherung aus

### 9.4 dora-Version inkompatibel （message v0.8.0 vs v0.7.0）

- Symptom: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Ursache: Die dora-cli-Version passt nicht zu dora-node-api. **Muss einheitlich 0.5.0 sein**

    - Prüfen: `dora --version` sollte `dora-cli 0.5.0`, `dora-message: 0.8.0` ausgeben

    - `1-安装环境.sh` erkennt alte Versionen automatisch und installiert zwangsweise neu

**Falls im System eine alte dora-Version verbleibt （z. B. 0.4.1）, zuerst manuell bereinigen:**

```Bash
# 1. Alte dora-Version lokalisieren
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Gefundene alte Version löschen (nach tatsächlichem Pfad)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Installation von 0.5.0 erzwingen
cargo install dora-cli --version 0.5.0 --force

# 4. Version überprüfen (sollte dora-cli 0.5.0 / dora-message: 0.8.0 ausgeben)
dora --version
```

> Wenn `dora --version` weiterhin eine alte Version anzeigt, gibt es im PATH noch andere alte dora-Versionen; spüren Sie sie mit which dora einzeln auf und löschen Sie sie.
> 
> 

### 9.5 Keine Rechte für den seriellen Port

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- oder unter **Systemeinstellungen → Datenschutz & Sicherheit → Eingabemonitoring** → Terminal erlauben

- Wenn ein `tty.*`-Gerät nicht gelesen werden kann, das entsprechende `cu.*`-Gerät verwenden （cu-Geräte sind reine Ausgabeports und besser für die direkte Steuerung geeignet）

### 9.6 Kameraberechtigung

- **Beim ersten Start im Dialog „Erlauben" wählen**, oder unter **Systemeinstellungen → Datenschutz & Sicherheit → Kamera** dem Terminal die Nutzung der Kamera erlauben

- Vergewissern Sie sich, dass die Kamera nicht von anderen Anwendungen （FaceTime, Konferenzsoftware） belegt ist

### 9.7 Portnummer ändert sich jedes Mal

- Nach dem erneuten An- und Abstecken des USB kann sich der Gerätename ändern; `2-配置串口.sh` erneut ausführen

### 9.8 openCV fehlt

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（im `HandTracking`-Verzeichnis, nach Aktivierung der virtuellen Umgebung ausführen）

### 9.9 Apple Silicon kompiliert langsamer / beim ersten Start von Gatekeeper blockiert

- Dass das erste `cargo build` auf Apple Silicon beim Kompilieren der dora-Abhängigkeiten langsamer ist, ist normal; geduldig warten

- Bei der Meldung „Entwickler kann nicht verifiziert werden": Systemeinstellungen → Datenschutz & Sicherheit → Trotzdem öffnen

---

## Beschreibung der Code-Struktur

### Demo-Verzeichnis

|Verzeichnis/Datei|Beschreibung|
|---|---|
|AHControl|Rust-Knoten, steuert die Servomotoren. src/main.rs ist der Einstiegspunkt|
|AHSimulation|Python-Knoten, MuJoCo-Simulation + inverse Kinematik （mink）|
|HandTracking|Python-Knoten, MediaPipe-Hand-Tracking|
|dataflow_\*.yml|dora-Datenflussdefinition （Knotenverbindungsdiagramm）|
|Mac一键部署脚本|die vorliegenden Ein-Klick-Skripte|

### Zuordnung der einzelnen dataflow-Dateien

|Datei|Zweck|
|---|---|
|dataflow_tracking_simu.yml|Simulationsumgebung, Kameragesten → simulierte beide Hände|
|dataflow_tracking_real_right.yml|reale rechte Hand|
|dataflow_tracking_real_left.yml|reale linke Hand|
|dataflow_tracking_real_2hands.yml|reale beide Hände （an dieselbe Treiberplatine angeschlossen）|

### Prinzip des Datenflusses

```Bash
Kamera → HandTracking (MediaPipe erkennt Gesten)
              ↓ Hand-Landmarken-Koordinaten
         AHSimulation (MuJoCo-Simulation + inverse Kinematik)
              ↓ Gelenk-Zielwinkel
         AHControl (serieller Port → Servo-Treiberplatine → Fingerhand)
```

### Position der Portkonfiguration

- Die `args:`-Zeile der drei `dataflow_tracking_real_*.yml`: `--serialport /dev/cu.usbmodem...`

- `default_value` in `AHControl/src/main.rs` （Standardwert des Seriell-Port-Parameters）

- `AHControl/config/*.toml`: Servo-Modell, ID, Offset （muss in der Regel nicht geändert werden）



