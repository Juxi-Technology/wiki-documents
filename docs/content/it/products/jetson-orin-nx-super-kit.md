---
title: Kit di sviluppo Jetson Orin NX Super
category: compute-vision
description: Kit di sviluppo NVIDIA Jetson Orin NX SUPER — piattaforma AI edge 117/157 TOPS, Ubuntu 22.04 e SSD NVMe 256GB preinstallati
keywords: [jetson, orin nx, edge ai, leRobot, robotica]
---

# Kit di sviluppo Jetson Orin NX Super

> **[Acquista nel negozio](https://www.juxitech.com/it/products/nvidia-jetson-orin-nx-super-developer-kit)**

## Panoramica

Il kit di sviluppo NVIDIA Jetson Orin NX SUPER è una piattaforma AI edge ad alte prestazioni per sviluppatori robotici, ricercatori di IA generativa e ingegneri embedded. Con il modulo Jetson Orin NX SUPER offre fino a **117 TOPS (8GB) / 157 TOPS (16GB)** — 234× / 314× più veloce del Jetson Nano originale.

Pronto all'uso, senza acquistare storage né installare il sistema:

- **Ubuntu 22.04** preinstallato
- **SSD NVMe PCIe 3.0 x4 256GB** preconfigurato (lettura fino a 2800MB/s)
- WiFi 5 dual-band 2.4G/5G + Bluetooth 5.0 (antenna 4dBi)
- Ventola a cuscinetti PWM (50 000 ore)
- Custodia acrilica con fori per supporto fotocamera

**Casi d'uso**: deployment LLM edge, computer vision avanzata, sviluppo robotico LeRobot SO-ARM.

## Specifiche

| Categoria | Specifica |
|------|------|
| Modulo | NVIDIA Jetson Orin NX SUPER |
| AI | 117 TOPS (8GB) / 157 TOPS (16GB) |
| CPU | 6 core NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere, 1792 core CUDA + 56 core Tensor + 2 motori NVDLA |
| Memoria | 8GB / 16GB LPDDR5 (102.4 GB/s) |
| Storage | 256GB NVMe PCIe 3.0 x4 SSD (lettura fino a 2800MB/s) |
| Wireless | WiFi 5 dual-band + Bluetooth 5.0, doppia antenna 4dBi |
| Raffreddamento | Ventola PWM (50 000 h) + dissipatore in alluminio |
| Uscita video | DP 1.4, fino a 4K@60Hz (H.265) |
| Interfacce | 4× USB 3.2, DP 4K60Hz, header GPIO 40 pin |
| Sistema | Ubuntu 22.04 preinstallato |

## Collegamento hardware

### Avvio rapido

1. Collegare l'adattatore (19V 40W)
2. Cavo DP-HDMI al monitor
3. Tastiera/mouse (USB 3.2)
4. Avviare in Ubuntu 22.04 preinstallato

### Montaggio fotocamera

La custodia acrilica ha fori per supporti fotocamera (CSI / USB, doppia fotocamera).

## Configurazione software

### Verificare PyTorch GPU

```python
import torch
print(torch.cuda.is_available())  # deve stampare True
```

### Installare LeRobot (SO-ARM100/101)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### Riferimenti

- [Compatibilità PyTorch su Jetson Orin](/it/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [Tutorial SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

## Varianti del kit

| Kit | Componenti aggiuntivi | Casi d'uso |
|---------|---------|---------|
| **Kit standard** | Scheda + custodia acrilica + SSD 256GB + WiFi/BT + antenna + alimentatore 19V 40W + cavo DP-HDMI + cavo Type-C + cacciavite | Sviluppo AI generale |
| **Kit display OLED** | + display OLED 0.91" | Monitoraggio risorse |
| **Kit audio USB** | + scheda audio USB (altoparlante + microfono, riduzione rumore/eco) | Interazione vocale, assistente LLM |
| **Kit fotocamera IMX219** | + fotocamera CSI IMX219 (77° FOV, 8MP) + supporto in alluminio regolabile | Visione CSI nativa |
| **Kit fotocamera autofocus** | + fotocamera USB autofocus 86° (1080P) + supporto in alluminio | Visione generale, bracci robotici |
| **Kit robotico SO-ARM100/101** | + HUB USB 3.0 + fotocamera autofocus + supporto dedicato | Visione per braccio robotico |

## Selezione versione

| Versione | AI | Scenari consigliati |
|------|---------|---------|
| **8GB** | 117 TOPS | Sviluppo AI avanzato, progetti robotici medi, LLM edge |
| **16GB** | 157 TOPS | IA incarnata ad alte prestazioni, modelli grandi al edge, visione complessa |

## FAQ

**D: Più veloce di un Orin NX standard?**
1.7× (ottimizzazione SUPER).

**D: Devo installare il sistema?**
No. Ubuntu 22.04 e SSD 256GB preinstallati — basta accendere.

**D: Compatibile con SO-ARM101?**
Completamente. Kit visione robotica dedicato (fotocamera + supporto), integrazione perfetta con LeRobot.

**D: Rumore del raffreddamento?**
Ventola PWM a cuscinetti: stabile a 40W, silenziosa, 50 000 ore (10× più duratura di una idraulica).

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
