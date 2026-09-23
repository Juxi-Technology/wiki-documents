---
title: Flashing JetPack e configurazione di sistema
description: "Guida al flashing JetPack per NVIDIA Jetson – SDK Manager e immagini ufficiali, risoluzione problemi, configurazione di base"
keywords: [jetson, jetpack, flashing, configurazione di sistema, nvidia]
---

# Flashing JetPack e configurazione di sistema

> 📌 Sta utilizzando il kit di sviluppo ufficiale Jetson AGX Orin (JetPack 7.2)? Veda la serie dedicata: [Avvio rapido](/it/tutorials/jetson-agx-orin/quick-start).

> Per sviluppatori che affrontano per la prima volta la piattaforma NVIDIA Jetson. I kit Jetson JUXI sono preinstallati con Ubuntu 22.04. Questo documento serve come riferimento per reinstallare il sistema o cambiare JetPack.

## 1. Cos'è JetPack?

JetPack è il pacchetto SDK di NVIDIA per la piattaforma Jetson, che comprende:

- Immagine del sistema Ubuntu
- CUDA / cuDNN / TensorRT
- API multimediali (L4T)

**Corrispondenza versioni** (comune):

| Scheda Jetson | JetPack consigliato | Sistema |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |

> Il [kit Jetson Orin NX Super](/it/products/jetson-orin-nx-super-kit) JUXI è preinstallato con Ubuntu 22.04 (ecosistema JetPack 6.x).

## 2. Metodi di flashing

### Metodo 1: Immagine ufficiale (boot Ubuntu)

Adatto a host Ubuntu esistenti o avvio da USB:

```bash
# 1. Scaricare il Driver Package ufficiale NVIDIA per la scheda
# 2. Estrarre ed entrare in Linux_for_Tegra
cd Linux_for_Tegra
sudo ./apply_binaries.sh
# 3. Mettere il Jetson in modalità Recovery (tenere REC e accendere)
# 4. Flashatre
sudo ./flash.sh <board-name> mmcblk0p1
```

### Metodo 2: SDK Manager (consigliato ai principianti)

1. Installare [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. Collegare il Jetson al PC (modalità Recovery)
3. Selezionare modello → versione JetPack → spuntare i componenti (meglio tutto CUDA/TensorRT)
4. Attendere il flashing e il primo avvio

> ⚠️ Il flashing dura 20–60 minuti. **Non scollegare il cavo né spegnere l'alimentazione.**

## 3. Risoluzione dei problemi di flashing

| Sintomo | Verifica |
|------|------|
| Impossibile entrare in Recovery | Tenere REC e accendere; verificare con `lsusb` che il dispositivo NVIDIA sia rilevato |
| Errore a metà flashing | Cambiare **cavo dati** (escludere prima il cavo); disattivare il risparmio energetico del PC; ri-flashatre |
| Schermo nero dopo il flashing | Controllare il connettore video (Orin usa DP); rientrare in Recovery e ri-flashatre |
| Messaggio di versione non corrispondente | Verificare la corrispondenza scheda/versione JetPack (serigrafia sulla scheda) |

## 4. Configurazione di base del sistema

### 4.1 Rete e sorgenti

```bash
# Passare a un mirror locale (opzionale, accelera apt)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 Verificare l'ambiente GPU

```bash
# Vedere JetPack/CUDA
cat /etc/nv_tegra_release
nvcc --version
# Verificare PyTorch GPU
python3 -c "import torch; print(torch.cuda.is_available())"
```

> Se PyTorch non è disponibile, vedi [Incompatibilità PyTorch su Jetson Orin](/it/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

### 4.3 Attivare la modalità memoria 64G (Orin)

```bash
sudo nvpmodel -m 0          # modalità massime prestazioni
sudo jetson_clocks          # sblocca il limite di frequenza
```

### 4.4 Espandere la partizione root

Dopo il flashing la partizione root può usare solo parte della SD/eMMC:

```bash
sudo systemctl enable --now nvresize             # espansione automatica
# o manualmente:
sudo resize2fs /dev/nvme0n1p1                    # in base al dispositivo reale
```

## 5. Domande frequenti

**D: Niente WiFi dopo il flashing?**
Le board core Orin richiedono un modulo WiFi M.2 esterno; controllare le antenne dual-band.

**D: Come si entra in modalità Recovery?**
Spegnere → tenere REC (o BOOT) e collegare alimentazione/Type-C → se `lsusb` mostra `NVIDIA Corp.` = successo.

**D: Quanto storage serve?**
Consigliati ≥128 GB SSD (le SD sono un collo di bottiglia in scrittura). 256 GB è la configurazione standard del kit.

---

## Link correlati

- [Kit Jetson Orin NX Super](/it/products/jetson-orin-nx-super-kit)
- [Introduzione al deploy AI edge](/it/topics/edge-ai-intro)
- [Tutorial di introduzione a ROS](/it/tutorials/ros-intro)

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
