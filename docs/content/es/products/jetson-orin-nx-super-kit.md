---
title: Kit de desarrollo Jetson Orin NX Super
category: compute-vision
description: Kit de desarrollo NVIDIA Jetson Orin NX SUPER — plataforma de IA perimetral 117/157 TOPS, Ubuntu 22.04 y SSD NVMe 256GB preinstalados
keywords: [jetson, orin nx, edge ai, leRobot, robótica]
---

# Kit de desarrollo Jetson Orin NX Super

> **[Comprar en la tienda](https://www.juxitech.com/es/products/nvidia-jetson-orin-nx-super-developer-kit)**

## Descripción general

El kit de desarrollo NVIDIA Jetson Orin NX SUPER es una plataforma de IA perimetral de alto rendimiento para desarrolladores robóticos, investigadores de IA generativa e ingenieros embebidos. Con el módulo Jetson Orin NX SUPER ofrece hasta **117 TOPS (8GB) / 157 TOPS (16GB)** — 234× / 314× más rápido que el Jetson Nano original.

Listo para usar, sin comprar almacenamiento ni instalar el sistema:

- **Ubuntu 22.04** preinstalado
- **SSD NVMe PCIe 3.0 x4 de 256GB** preconfigurado (lectura hasta 2800MB/s)
- WiFi 5 de doble banda 2.4G/5G + Bluetooth 5.0 (antena 4dBi)
- Ventilador con rodamiento de bolas PWM (50 000 horas)
- Carcasa acrílica con perforaciones para soporte de cámara

**Casos de uso**: implementación de LLM en el borde, visión por computador avanzada, desarrollo robótico LeRobot SO-ARM.

## Especificaciones

| Categoría | Especificación |
|------|------|
| Módulo | NVIDIA Jetson Orin NX SUPER |
| IA | 117 TOPS (8GB) / 157 TOPS (16GB) |
| CPU | 6 núcleos NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere, 1792 núcleos CUDA + 56 núcleos Tensor + 2 motores NVDLA |
| Memoria | 8GB / 16GB LPDDR5 (102.4 GB/s) |
| Almacenamiento | 256GB NVMe PCIe 3.0 x4 SSD (lectura hasta 2800MB/s) |
| Inalámbrico | WiFi 5 doble banda + Bluetooth 5.0, antena dual 4dBi |
| Refrigeración | Ventilador PWM (50 000 h) + disipador de aluminio |
| Salida de video | DP 1.4, hasta 4K@60Hz (H.265) |
| Interfaces | 4× USB 3.2, DP 4K60Hz, cabezal GPIO de 40 pines |
| Sistema | Ubuntu 22.04 preinstalado |

## Conexión de hardware

### Inicio rápido

1. Conectar el adaptador (19V 40W)
2. Cable DP a HDMI al monitor
3. Teclado/ratón (USB 3.2)
4. Arrancar en Ubuntu 22.04 preinstalado

### Montaje de cámara

La carcasa acrílica tiene perforaciones para soportes (CSI / USB, doble cámara).

## Configuración de software

### Verificar PyTorch GPU

```python
import torch
print(torch.cuda.is_available())  # debe imprimir True
```

### Instalar LeRobot (SO-ARM100/101)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### Referencias

- [Compatibilidad de PyTorch en Jetson Orin](/es/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [Tutorial SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

## Variantes del kit

| Kit | Componentes adicionales | Casos de uso |
|---------|---------|---------|
| **Kit estándar** | Placa + carcasa acrílica + SSD 256GB + WiFi/BT + antena + fuente 19V 40W + cable DP-HDMI + cable Type-C + destornillador | Desarrollo IA general |
| **Kit pantalla OLED** | + pantalla OLED 0.91" | Monitorización de recursos |
| **Kit audio USB** | + tarjeta de sonido USB (altavoz + micrófono, reducción de ruido/eco) | Interacción por voz, asistente LLM |
| **Kit cámara IMX219** | + cámara CSI IMX219 (77° FOV, 8MP) + soporte de aluminio ajustable | Visión CSI nativa |
| **Kit cámara autofoco** | + cámara USB autofoco 86° (1080P) + soporte de aluminio | Visión general, brazos robóticos |
| **Kit robótico SO-ARM100/101** | + HUB USB 3.0 + cámara autofoco + soporte dedicado | Visión para brazo robótico |

## Selección de versión

| Versión | IA | Escenarios recomendados |
|------|---------|---------|
| **8GB** | 117 TOPS | Desarrollo IA avanzado, proyectos robóticos medios, LLM en borde |
| **16GB** | 157 TOPS | IA corporizada de alto rendimiento, modelos grandes en el borde, visión compleja |

## Preguntas frecuentes

**P: ¿Más rápido que un Orin NX estándar?**
1.7× (optimización SUPER).

**P: ¿Hay que instalar el sistema?**
No. Ubuntu 22.04 y SSD 256GB preinstalados — solo encender.

**P: ¿Compatible con SO-ARM101?**
Totalmente. Kit de visión robótica dedicado (cámara + soporte), integración perfecta con LeRobot.

**P: ¿Ruido de la refrigeración?**
Ventilador PWM con rodamiento de bolas: estable a 40W, silencioso, 50 000 horas (10× más duradero que uno hidráulico).

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
