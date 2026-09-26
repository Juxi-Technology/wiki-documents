---
title: Flasheo de JetPack y configuración del sistema
description: "Guía de flasheo de JetPack para NVIDIA Jetson – SDK Manager e imágenes oficiales, solución de problemas, configuración básica"
keywords: [jetson, jetpack, flasheo, configuración del sistema, nvidia]
---

# Flasheo de JetPack y configuración del sistema

> 📌 ¿Utiliza el kit de desarrollo oficial Jetson AGX Orin (JetPack 7.2)? Consulte la serie dedicada: [Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start).

> 📌 ¿Utiliza el kit de desarrollo oficial Jetson Orin Nano Super (JetPack 7.2.1)? Consulte la serie dedicada: [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start).

> Para desarrolladores que se inician en la plataforma NVIDIA Jetson. Los kits Jetson de JUXI vienen con Ubuntu 22.04 preinstalado. Este documento sirve de referencia para reinstalar el sistema o cambiar la versión de JetPack.

## 1. ¿Qué es JetPack?

JetPack es el paquete SDK de NVIDIA para la plataforma Jetson, que incluye:

- Imagen del sistema Ubuntu
- CUDA / cuDNN / TensorRT
- API multimedia (L4T)

**Correspondencia de versiones** (habitual):

| Placa Jetson | JetPack recomendado | Sistema |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |
| Orin Nano Super (kit oficial de NVIDIA) | JetPack 7.2.1 | Ubuntu 24.04 |

> El [kit Jetson Orin NX Super](/es/products/jetson-orin-nx-super-kit) de JUXI viene con Ubuntu 22.04 (ecosistema JetPack 6.x).

> El [NVIDIA Jetson Orin Nano Super Developer Kit](/es/products/jetson-orin-nano-devkit) — el kit oficial de NVIDIA, vendido por Juxi — llega **sin almacenamiento y sin sistema preinstalado** (la tarjeta microSD incluida está en blanco). Instale JetPack 7.2.1 con el método de la Jetson ISO: consulte la [serie Jetson Orin Nano](/es/tutorials/jetson-orin-nano/quick-start).

## 2. Métodos de flasheo

### Método 1: Imagen oficial (arranque Ubuntu)

Adecuado para hosts Ubuntu existentes o arranque por USB:

```bash
# 1. Descargar el Driver Package oficial de NVIDIA para la placa
# 2. Extraer y entrar en Linux_for_Tegra
cd Linux_for_Tegra
sudo ./apply_binaries.sh
# 3. Poner el Jetson en modo Recovery (mantener REC y encender)
# 4. Flashear
sudo ./flash.sh <board-name> mmcblk0p1
```

### Método 2: SDK Manager (recomendado para principiantes)

1. Instalar [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. Conectar el Jetson al PC (modo Recovery)
3. Seleccionar modelo de placa → versión de JetPack → marcar componentes (mejor todo CUDA/TensorRT)
4. Esperar el flasheo y el primer arranque

> ⚠️ El flasheo tarda 20-60 minutos. **No desconecte el cable ni corte la alimentación.**

## 3. Solución de problemas del flasheo

| Síntoma | Comprobación |
|------|------|
| No entra en modo Recovery | Mantener REC al encender; comprobar con `lsusb` que se detecta el dispositivo NVIDIA |
| Falla a mitad del flasheo | Cambiar de **cable de datos** (descartar primero el cable); desactivar el ahorro de energía del PC; reflashear |
| Pantalla negra tras flashear | Comprobar el conector de pantalla (Orin usa DP); volver al modo Recovery y reflashear |
| Aviso de versión no coincidente | Comprobar la correspondencia placa/versión JetPack (serigrafía en la placa) |

## 4. Configuración básica del sistema

### 4.1 Red y fuentes

```bash
# Cambiar a un espejo local (opcional, acelera apt)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 Comprobar el entorno GPU

```bash
# Ver JetPack/CUDA
cat /etc/nv_tegra_release
nvcc --version
# Verificar PyTorch GPU
python3 -c "import torch; print(torch.cuda.is_available())"
```

> Si PyTorch no está disponible, vea [Incompatibilidad de PyTorch en Jetson Orin](/es/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

### 4.3 Activar el modo de memoria 64G (Orin)

```bash
sudo nvpmodel -m 0          # modo de máximo rendimiento
sudo jetson_clocks          # desbloquear el límite de frecuencia
```

### 4.4 Ampliar la partición raíz

Tras el flasheo, la partición raíz puede ocupar solo parte de la SD/eMMC:

```bash
sudo systemctl enable --now nvresize             # ampliación automática
# o manual:
sudo resize2fs /dev/nvme0n1p1                    # según el dispositivo real
```

## 5. Preguntas frecuentes

**Q: ¿Sin WiFi tras el flasheo?**

**A:** Las placas core Orin requieren un módulo WiFi M.2 externo; revise las antenas de doble banda.

**Q: ¿Cómo entrar en modo Recovery?**

**A:** Apagar → mantener REC (o BOOT) y conectar alimentación/Type-C → si `lsusb` muestra `NVIDIA Corp.` = éxito.

**Q: ¿Cuánto almacenamiento se necesita?**

**A:** Se recomiendan ≥128 GB SSD (las SD son un cuello de botella de escritura). 256 GB es la configuración estándar del kit.

---

## Enlaces relacionados

- [Kit Jetson Orin NX Super](/es/products/jetson-orin-nx-super-kit)
- [Introducción al despliegue de IA en el borde](/es/topics/edge-ai-intro)
- [Tutorial de introducción a ROS](/es/tutorials/ros-intro)

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
