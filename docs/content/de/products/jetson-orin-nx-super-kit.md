---
title: Jetson Orin NX Super Developer Kit
category: compute-vision
description: NVIDIA Jetson Orin NX SUPER Developer Kit — 117/157 TOPS Edge-AI-Plattform, vorinstalliert Ubuntu 22.04 und 256GB NVMe-SSD
keywords: [jetson, orin nx, edge ai, leRobot, robotik]
---

# Jetson Orin NX Super Developer Kit

> **[Im Shop kaufen](https://www.juxitech.com/de/products/nvidia-jetson-orin-nx-super-developer-kit)**

## Produktübersicht

Das NVIDIA Jetson Orin NX SUPER Developer Kit ist eine High-Performance-Edge-AI-Plattform für Robotik-Entwickler, GenAI-Forscher und Embedded-Ingenieure. Mit dem Jetson Orin NX SUPER Modul liefert es bis zu **117 TOPS (8GB) / 157 TOPS (16GB)** — 234× / 314× schneller als das ursprüngliche Jetson Nano.

Sofort einsatzbereit, ohne zusätzlichen Speicher oder Systeminstallation:

- **Ubuntu 22.04** vorinstalliert
- **256GB NVMe PCIe 3.0 x4 SSD** vorkonfiguriert (Lesen bis 2800MB/s)
- 2.4G/5G Dualband-WiFi 5 + Bluetooth 5.0 (4dBi-Antenne)
- PWM-Kugellagerlüfter (50.000 Stunden Lebensdauer)
- Acrylgehäuse mit Kamerahalterungs-Bohrungen

**Anwendungsfälle**: LLM-Edge-Bereitstellung, fortgeschrittene Computer Vision, LeRobot SO-ARM-Entwicklung.

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Kernmodul | NVIDIA Jetson Orin NX SUPER |
| AI-Leistung | 117 TOPS (8GB) / 157 TOPS (16GB) |
| CPU | 6-Kern NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere, 1792 CUDA-Kerne + 56 Tensor-Kerne + 2 NVDLA-Engines |
| Speicher | 8GB / 16GB LPDDR5 (102.4 GB/s) |
| Storage | 256GB NVMe PCIe 3.0 x4 SSD (Lesen bis 2800MB/s) |
| Funk | 2.4G/5G Dualband-WiFi 5 + Bluetooth 5.0, 4dBi-Dualantenne |
| Kühlung | PWM-Kugellagerlüfter (50.000 h) + Aluminiumkühler |
| Display | DP 1.4, bis 4K@60Hz (H.265) |
| Schnittstellen | 4× USB 3.2, DP 4K60Hz, 40-Pin-GPIO-Header |
| System | Ubuntu 22.04 vorinstalliert |

## Hardware-Anschluss

### Schnellstart

1. Netzteil (19V 40W) anschließen
2. DP-zu-HDMI-Kabel an Monitor
3. Tastatur/Maus (USB 3.2) anschließen
4. In das vorinstallierte Ubuntu 22.04 booten

### Kamera-Montage

Das Acrylgehäuse hat vorbereitete Bohrungen für Kamera-Mounts (CSI / USB, Dual-Kamera).

## Software-Konfiguration

### PyTorch-GPU prüfen

```python
import torch
print(torch.cuda.is_available())  # sollte True ausgeben
```

### LeRobot installieren (SO-ARM100/101)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### Referenzen

- [PyTorch-Kompatibilität auf Jetson Orin](/de/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [SO-ARM101-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

## Kit-Varianten

| Kit-Typ | Zusatzkomponenten | Anwendungsfälle |
|---------|---------|---------|
| **Standard-Kit** | Mainboard + Acrylgehäuse + 256GB SSD + WiFi/BT + Antenne + 19V-40W-Netzteil + DP-HDMI-Kabel + Type-C-Kabel + Schraubendreher | Allgemeine High-Performance-AI-Entwicklung |
| **OLED-Display-Kit** | + 0.91-Zoll-OLED-Statusdisplay | Echtzeit-Systemressourcen |
| **USB-Audio-Kit** | + USB-Soundkarte (Lautsprecher + Mikrofon, Rauschunterdrückung/Echokompensation) | Sprachinteraktion, LLM-Sprachassistent |
| **IMX219-Kamera-Kit** | + IMX219-CSI-Kamera (77° FOV, 8MP) + Aluminium-Verstellhalterung | Native CSI-Vision |
| **Autofokus-Kamera-Kit** | + 86°-Autofokus-USB-Kamera (1080P) + Aluminium-Verstellhalterung | Allgemeine Vision, Roboterarme |
| **SO-ARM100/101-Robotik-Kit** | + USB-3.0-HUB + Autofokus-Kamera + Spezialhalterung | Roboterarm-Visionsentwicklung |

## Versionsauswahl

| Version | AI-Leistung | Empfohlene Szenarien |
|------|---------|---------|
| **8GB** | 117 TOPS | Fortgeschrittene AI-Entwicklung, mittlere Robotik-Projekte, LLM-Edge |
| **16GB** | 157 TOPS | High-Performance-Embodied-AI, große Modelle am Edge, komplexe Vision |

## Häufige Fragen

**F: Wie viel schneller als Standard Orin NX?**
1.7× (SUPER-Optimierung).

**F: Muss ich das System selbst installieren?**
Nein. Ubuntu 22.04 und 256GB SSD sind vorinstalliert — nur einschalten.

**F: Unterstützt es SO-ARM101?**
Vollständig kompatibel. Inklusive speziellem Robotik-Vision-Kit (Kamera + Halterung), nahtlos im LeRobot-Ökosystem.

**F: Wie laut ist die Kühlung?**
PWM-Kugellagerlüfter, stabil bei 40W Volllast, leise, Lebensdauer 50.000 Stunden (10× haltbarer als Hydrauliklüfter).

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
