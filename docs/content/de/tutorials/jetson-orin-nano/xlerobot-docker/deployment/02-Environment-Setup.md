---
title: 02 · Umgebung einrichten
---

# 02 · Umgebung einrichten

> **Zurück:** [01-Overview](01-Overview.md)
> **Weiter:** [03-Deployment](03-Deployment.md)

Docker installieren, die Mirror für Festlandchina einrichten, die Hardware anschließen. **Ohne diesen Teil läuft der nächste nicht.**

---

## 1. Docker installieren

Falls bereits installiert, können Sie diesen Abschnitt überspringen – prüfen Sie zunächst:

```bash
docker --version
```

Falls nicht installiert:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**Nach dem letzten Befehl müssen Sie sich erneut anmelden** (abmelden und wieder anmelden oder neu starten), sonst meldet der
Befehl `docker` einen Berechtigungsfehler. Zum Überprüfen:

```bash
docker run --rm hello-world
```

---

## 2. Registry-Mirror einrichten ⚠️ In Festlandchina zwingend erforderlich

**Eine Direktverbindung zu Docker Hub läuft aus Festlandchina in einen Timeout** – ohne Registry-Mirror lässt sich kein Image herunterladen.

Bearbeiten Sie `/etc/docker/daemon.json` (legen Sie die Datei an, falls sie nicht existiert):

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Docker neu starten:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Überprüfen, ob die Änderung wirksam ist:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Viele im Netz kursierende Mirror-Adressen sind bereits tot (die Mirrors von USTC und
> NetEase sowie `dockerproxy.com` haben den Dienst eingestellt) – übernehmen Sie sie nicht aus alten Artikeln.
> Die drei oben genannten waren im September 2026 nachweislich nutzbar.

---

## 3. Hardware vorbereiten

### 3.1 Roboter verkabeln

1. Verbinden Sie die Servos des SO-101-Roboterarms über die USB-Adapterplatine mit dem Computer
2. Kamera an USB anschließen (bei einer RealSense an einen USB-3.0-Anschluss)

### 3.2 Berechtigungen für die serielle Schnittstelle ⚠️ Wichtig

Ohne diese Konfiguration **sind die Geräte im Container nicht sichtbar**:

```bash
sudo usermod -aG dialout $USER
```

**Auch hier müssen Sie sich erneut anmelden, damit die Änderung wirksam wird.**

### 3.3 Prüfen, ob die Geräte erkannt werden

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # Serielle Schnittstelle der Servos
ls /dev/video*                   # Kamera
```

Sobald Sie die Geräteknoten sehen, hat das System die Geräte erkannt.

---

## 4. Hugging-Face-Mirror einrichten ⚠️ In Festlandchina zwingend erforderlich

**`huggingface.co` ist aus Festlandchina nicht erreichbar**, wird zum Laden der vortrainierten Modelle aber zwingend benötigt.

Fügen Sie beim Starten des Containers diese Umgebungsvariable hinzu:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

In `scripts/run.sh` ist das bereits standardmäßig eingerichtet. Für den reinen Offline-Betrieb zusätzlich `-e HF_HUB_OFFLINE=1` ergänzen.

---

## Checkliste

Bevor Sie zum nächsten Teil übergehen, vergewissern Sie sich, dass alle folgenden Punkte erfüllt sind:

```bash
docker --version                       # Docker installiert
docker info | grep -A4 "Registry Mirrors"   # Registry-Mirror aktiv
groups | grep dialout                  # Rechte für die serielle Schnittstelle eingerichtet (nach erneuter Anmeldung)
ls /dev/ttyACM*                        # Gerät erkannt
```

---

> **Weiter:** [03-Deployment](03-Deployment.md) – Image herunterladen, Container starten
