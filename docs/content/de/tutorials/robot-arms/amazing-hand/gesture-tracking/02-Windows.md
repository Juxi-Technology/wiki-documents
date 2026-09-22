---
title: "Windows Ein-Klick-Deployment und -Ausführung"
description: "AmazingHand Gesten-Tracking per Ein-Klick-Deployment unter Windows: Skripte per Doppelklick starten, dann Simulation oder echte Hand per Kamerageste steuern."
---

# Windows Ein-Klick-Deployment und -Ausführung

**AmazingHand-main.zip**（AmazingHand-main.zip, größer als das Dateigrößenlimit der Site — auf Anfrage bei support@juxitech.com）

Dieses Tutorial basiert auf dem offiziellen Demo von AmazingHand （Fingerhand von Pollen Robotics）, die Ein-Klick-Deployment-Skripte sind bereits vorbereitet.
Führen Sie alles einfach in der Reihenfolge der Nummerierung aus. **Alle Skripte befinden sich im Ordner **`Demo\Windows一键部署脚本\`** und werden direkt per Doppelklick ausgeführt.**

---

## Hardware-Vorbereitung

> Die Modelldateien können Sie auf [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) ansehen oder selbst herunterladen （inkl. URDF）.
> 
> 

---

## Umgebungsinstallation （Skript 1）

**Doppelklick auf **`1-安装环境.bat`**, automatisch wird Folgendes ausgeführt:**

1. **MSVC-Build-Tools prüfen** （cl.exe）——für die Rust-Kompilierung erforderlich. Bei Fehlen wird die Installation von
Visual Studio 2022 Build Tools empfohlen; „Desktopentwicklung mit C++" ankreuzen, nach der Installation das Terminal neu öffnen.

2. **Rust installieren** （rustup + stable-msvc-Toolchain）

3. **Cargo-Tsinghua-Spiegelquelle konfigurieren** （`C:\Users\<Benutzername>\.cargo\config.toml`）, beschleunigt den Download von Crates

4. **uv installieren** （Python-Paketmanager）

5. **dora-cli 0.5.0 installieren** （`cargo install`, erste Kompilierung ca. 10~20 Minuten, geduldig warten）

6. **dora-rs pip-Paket installieren** （optional, wird in die virtuelle Umgebung installiert）

> **Wichtig**: Nach Ende des Skripts **das Terminal schließen und neu öffnen**, damit die Umgebungsvariablen wirksam werden. Der Installationsvorgang kann aufgrund des Netzwerks langsam sein; bitte geduldig warten und nicht vorzeitig abbrechen.
> 
> 

### Manuelle Installationsalternative （wenn das Skript nicht verfügbar ist）

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - Für Windows rustup-init.exe verwenden, die Standard-MSVC-Toolchain wählen

    - Umgebungsvariable: `%USERPROFILE%\.cargo\bin` zum PATH hinzufügen

- **uv**: In PowerShell `irm ``https://astral.sh/uv/install.ps1`` | iex` ausführen

    - Umgebungsvariable: `%USERPROFILE%\.local\bin` zum PATH hinzufügen

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

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

- Portnummer auf der Computerseite ermitteln: **Geräte-Manager → Anschlüsse (COM und LPT)**, z. B. `COM11`

---

## Seriellen Port konfigurieren （Skript 2）

**Doppelklick auf **`2-配置串口.bat`** （die eigentliche Logik liegt in `2-配置串口.ps1`）:**

1. Aufforderung „Bitte die Servo-Treiberplatine mit dem Computer verbinden" → Enter drücken, um die Erkennung zu starten

2. Listet die erkannten COM-Ports automatisch auf （mit Gerätenamen）

3. Bei einem einzelnen Port mit Enter bestätigen, bei mehreren Ports die Nummer eingeben

4. Schreibt automatisch den `--serialport` in die 3 dataflow-yml-Dateien und den Standardport in `AHControl\src\main.rs`

5. Die Originaldatei wird automatisch als `.bak` gesichert

> Wenn Sie den USB erneut an- und abstecken, kann sich die Portnummer ändern; dieses Skript muss dann erneut ausgeführt werden.
> 
> 

---

## Code-Deployment （Skript 3）

**Doppelklick auf **`3-部署代码.bat`**, automatisch wird Folgendes ausgeführt:**

1. dora-Daemon starten （`dora up`）

2. Virtuelle Python-3.12-Umgebung erstellen （`uv venv --python 3.12`）

3. Virtuelle Umgebung aktivieren

4. AHControl-Rust-Knoten kompilieren （`cargo build --release`, beim ersten Mal ca. 10 Minuten）

5. AHSimulation- und HandTracking-Abhängigkeiten synchronisieren （`uv sync`）

6. mediapipe==0.10.14 zwangsweise installieren

> Das Deployment muss nur einmal ausgeführt werden. Bei späterer erneuter Ausführung wird gefragt, ob die virtuelle Umgebung neu erstellt werden soll.
> 
> 

---

## Code ausführen （Skript 4）

**Doppelklick auf **`4-运行代码.bat`**, es erscheint ein interaktives Menü:**

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

> Beim ersten Ausführen blockiert Windows möglicherweise die Kameraberechtigung; klicken Sie einfach auf „Erlauben".
> 
> 

---

## Projektbereinigung （Skript 0）

**Doppelklick auf **`0-清理项目.bat`**, nach Eingabe von `Y` zur Bestätigung wird automatisch bereinigt:**

1. dora-Daemon stoppen

2. 3 virtuelle Umgebungen löschen （`.venv`）

3. Rust-Kompilierungsartefakte löschen （`Demo\target`）

4. `pycache`, `.bak`-Sicherungen, Logs und `Demo\out` löschen （dora-Logverzeichnis）

5. **Standardport wiederherstellen** （`--serialport /dev/ttyACM0`）, lokale Reste des seriellen Ports entfernen

> Nach der Bereinigung können Sie den gesamten Ordner `AmazingHand-main` an andere weitergeben, sauber und ohne Reste. Auf einem neuen Rechner einfach in der Reihenfolge 1 → 2 → 3 → 4 ausführen.
> 
> 

---

## Häufige Fragen und Hinweise

### 8.1 cargo bleibt bei `Updating 'tuna' index` hängen

- Ursache: Die Spiegelkonfiguration verwendet **die git-Repository-Methode** （`.../git/crates.io-index.git`）, beim ersten Mal werden 1GB+ Index heruntergeladen

- Lösung: `C:\Users\<Benutzername>\.cargo\config.toml` auf **sparse dünnbesetzten Index** ändern （siehe Abschnitt 2.2）, oder direkt `1-安装环境.bat` erneut ausführen

### 8.2 mediapipe fehlt das solutions-Untermodul / Installation beschädigt

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Muss bei aktivierter virtueller Umgebung ausgeführt werden （im `Demo`-Verzeichnis）

- `3-部署代码.bat` führt diesen Schritt bereits automatisch als Absicherung aus

### 8.3 dora-Version inkompatibel （message v0.8.0 vs v0.7.0）

- Symptom: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Ursache: Die dora-cli-Version passt nicht zu dora-node-api. **Muss einheitlich 0.5.0 sein**

    - Prüfen: `dora --version` sollte `dora-cli 0.5.0`, `dora-message: 0.8.0` ausgeben

    - Behebung: `cargo install dora-cli --version 0.5.0 --force`

    - Falls im PATH mehrere dora vorhanden sind （z. B. eine alte Version in `C:\Users\xxx\.dora\bin`）, stellen Sie sicher, dass `.cargo\bin` weiter vorne steht, oder löschen Sie die alten Versionen

### 8.4 MuJoCo / mediapipe kann das Modell nicht laden （chinesischer Pfad）

- Symptom: `ParseXML: Error opening file '...\scene.xml'` oder `Can't find file: ....tflite`

- Ursache: Der C++-Lader von MuJoCo 3.x / mediapipe kann unter Windows **absolute Pfade mit chinesischen Zeichen nicht öffnen** （z. B. `D:\Claude工作区...`）

- Dieses Projekt enthält bereits integrierte Korrekturen:

    - `AHSimulation\AHSimulation\mj_mink_*.py` wechselt vor dem Laden des Modells das Arbeitsverzeichnis

    - `HandTracking\mediapipe_patch.py` umgeht das Problem mit dem 8.3-Kurznamen + relativem Pfad

- Diese Korrekturcodes nicht löschen

### 8.5 Kameraberechtigung

- Beim ersten Start im Dialog „Erlauben" wählen

- Einstellungen → Datenschutz → Kamera → Zugriff für Desktop-Apps erlauben

### 8.6 Portnummer ändert sich jedes Mal

- Nach dem erneuten An- und Abstecken des USB kann sich die COM-Nummer ändern; `2-配置串口.bat` erneut ausführen

### 8.7 openCV fehlt

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（im `HandTracking`-Verzeichnis, nach Aktivierung der virtuellen Umgebung ausführen）

---

## Beschreibung der Code-Struktur

### Demo-Verzeichnis

### Zuordnung der einzelnen dataflow-Dateien

### Prinzip des Datenflusses

```Bash
Kamera → HandTracking (MediaPipe erkennt Gesten)
              ↓ Hand-Landmarken-Koordinaten
         AHSimulation (MuJoCo-Simulation + inverse Kinematik)
              ↓ Gelenk-Zielwinkel
         AHControl (serieller Port → Servo-Treiberplatine → Fingerhand)
```

### Position der Portkonfiguration

- Die `args:`-Zeile der drei `dataflow_tracking_real_*.yml`: `--serialport COMxx`

- `default_value = "COMxx"` in `AHControl\src\main.rs` （Standardwert des Seriell-Port-Parameters）

- `AHControl\config\*.toml`: Servo-Modell, ID, Offset （muss in der Regel nicht geändert werden）

