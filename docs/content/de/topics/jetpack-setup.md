---
title: JetPack-Flashing und Systemkonfiguration
description: "NVIDIA-Jetson-JetPack-Flashing-Guide – SDK Manager und offizielle Images, Fehlerbehebung, Grundkonfiguration"
keywords: [jetson, jetpack, flashing, systemkonfiguration, nvidia]
---

# JetPack-Flashing und Systemkonfiguration

> Für Entwickler, die zum ersten Mal mit der NVIDIA-Jetson-Plattform arbeiten. JUXI-Jetson-Kits werden mit Ubuntu 22.04 ausgeliefert. Dieses Dokument dient der Referenz bei Neuinstallation oder JetPack-Wechsel.

## 1. Was ist JetPack?

JetPack ist das SDK-Paket von NVIDIA für die Jetson-Plattform, bestehend aus:

- Ubuntu-Systemimage
- CUDA / cuDNN / TensorRT
- Multimedia-API (L4T)

**Versionszuordnung** (üblich):

| Jetson-Board | Empfohlenes JetPack | System |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |

> Das JUXI-[Jetson-Orin-NX-Super-Kit](/de/products/jetson-orin-nx-super-kit) wird mit Ubuntu 22.04 (JetPack 6.x) geliefert.

## 2. Flash-Methoden

### Methode 1: Offizielles Image (Ubuntu-Boot)

Geeignet für bestehende Ubuntu-Hosts oder USB-Boot:

```bash
# 1. Treiberpaket (Driver Package) für das Board von NVIDIA herunterladen
# 2. Entpacken und in Linux_for_Tegra wechseln
cd Linux_for_Tegra
sudo ./apply_binaries.sh
# 3. Jetson in den Recovery-Modus versetzen (REC-Taste gedrückt einschalten)
# 4. Flashen
sudo ./flash.sh <board-name> mmcblk0p1
```

### Methode 2: SDK Manager (für Einsteiger empfohlen)

1. [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) installieren
2. Jetson am PC anschließen (Recovery-Modus)
3. Board-Modell → JetPack-Version wählen → Komponenten anhaken (CUDA/TensorRT am besten alle)
4. Auf Flashing + Erststart warten

> ⚠️ Das Flashen dauert 20–60 Minuten. **Kabel nicht ziehen und Strom nicht abschalten.**

## 3. Fehlerbehebung beim Flashen

| Symptom | Prüfung |
|------|------|
| Recovery-Modus nicht erreichbar | REC-Taste gedrückt einschalten, mit `lsusb` prüfen, ob das NVIDIA-Gerät erkannt wird |
| Abbruch mitten im Flashen | **Datenkabel** wechseln (erst Kabelproblem ausschließen); Energiesparmodus des PCs aus; erneut flashen |
| Schwarzer Bildschirm nach dem Flashen | Display-Anschluss prüfen (Orin nutzt DP); erneut in den Recovery-Modus und neu flashen |
| Versionskonflikt-Meldung | Board-Modell und JetPack-Version abgleichen (Beschriftung auf der Platine) |

## 4. Grundkonfiguration des Systems

### 4.1 Netzwerk und Quellen

```bash
# Auf lokalen Mirror umstellen (optional, beschleunigt apt)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 GPU-Umgebung prüfen

```bash
# JetPack/CUDA prüfen
cat /etc/nv_tegra_release
nvcc --version
# PyTorch-GPU verifizieren
python3 -c "import torch; print(torch.cuda.is_available())"
```

> Ist PyTorch nicht verfügbar, siehe [PyTorch-Inkompatibilität auf Jetson Orin](/de/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

### 4.3 64G-Speichermodus aktivieren (Orin)

```bash
sudo nvpmodel -m 0          # Höchstleistungsmodus
sudo jetson_clocks          # Frequenzgrenzen freischalten
```

### 4.4 Root-Partition erweitern

Nach dem Flashen kann die Root-Partition nur einen Teil von SD/eMMC nutzen:

```bash
sudo systemctl enable --now nvresize             # automatische Erweiterung
# oder manuell:
sudo resize2fs /dev/nvme0n1p1                    # je nach tatsächlichem Gerät
```

## 5. Häufige Fragen

**F: Kein WLAN nach dem Flashen?**
Orin-Core-Boards benötigen ein externes M.2-WLAN-Modul; prüfen Sie die Dualband-Antennen.

**F: Wie in den Recovery-Modus?**
Strom aus → REC- (oder BOOT-) Taste gedrückt Strom/Type-C anschließen → `lsusb` zeigt `NVIDIA Corp.` = Erfolg.

**F: Wie viel Speicher wird benötigt?**
≥128 GB SSD empfohlen (SD-Karten sind beim Schreiben der Flaschenhals). 256 GB ist Standard beim Kit.

---

## Verwandte Links

- [Jetson-Orin-NX-Super-Kit](/de/products/jetson-orin-nx-super-kit)
- [Einstieg in Edge-KI-Deployment](/de/topics/edge-ai-intro)
- [ROS-Einführungstutorial](/de/tutorials/ros-intro)

## Technischer Support

- 📧 E-Mail:support@juxitech.com
- 🌐 Offizielle Website:[www.juxitech.com](https://www.juxitech.com)
