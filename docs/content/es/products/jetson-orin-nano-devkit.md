---
title: Kit de desarrollo Jetson Orin Nano Super (8GB)
category: compute-vision
description: Kit de desarrollo NVIDIA Jetson Orin Nano Super (8GB) — hasta 67 INT8 TOPS de IA en el borde, 8 GB de memoria unificada, opciones de almacenamiento microSD y NVMe, con documentación completa de JetPack 7.2.1 de Juxi Technology.
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Kit de desarrollo Jetson Orin Nano Super (8GB)

> **[Comprar en la tienda](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## Descripción general

El kit de desarrollo NVIDIA® Jetson Orin Nano™ Super es el kit de desarrollo
compacto de la familia Jetson Orin — una pequeña computadora de IA para crear
proyectos de visión por computador, robótica e IA generativa en el borde. Juxi
Technology vende el kit oficial de NVIDIA en su caja original, con una serie de
documentación completa para la base de software JetPack 7.2.1 / L4T r39.2.1.

Puntos destacados:

- **Hasta 67 INT8 TOPS** de rendimiento de IA (dispersos; 33 densos) y hasta **1.7x de mejora en IA generativa** frente al kit original *(NVIDIA)*
- **8 GB de memoria LPDDR5 de 128 bits a 102 GB/s** *(NVIDIA)* — memoria unificada compartida por la CPU, la GPU y todas las aplicaciones; 8 GB es el techo absoluto para cualquier carga de trabajo
- **GPU de arquitectura NVIDIA Ampere de 1024 núcleos con 32 Tensor Cores** y una CPU Arm Cortex-A78AE de 6 núcleos de hasta 1.7 GHz *(NVIDIA)*
- **«Super» es una actualización de software, no silicio nuevo** — los Orin Nano Developer Kit existentes obtienen las frecuencias más altas de GPU, memoria y CPU al actualizar JetPack *(NVIDIA)*
- **Potencia configurable de 7 W a 25 W** *(NVIDIA)* — el modo de alimentación predeterminado es 25 W
- **Sin eMMC y sin almacenamiento de NVIDIA** — la ranura microSD está en la **parte inferior del módulo**, además de dos ranuras M.2 Key-M para SSD NVMe *(NVIDIA)*; el paquete de la tienda de Juxi añade una tarjeta microSD de 64 GB
- **Software actual: JetPack 7.2.1** (Jetson Linux / L4T r39.2.1) *(NVIDIA)* — se instala con el método de la Jetson ISO desde una unidad USB; no se necesita ningún PC host con Ubuntu
- **Caja original oficial, vendida por Juxi Technology** — el paquete añade un adaptador de alimentación de 19 V, un cable de alimentación, una tarjeta microSD de 64 GB y el módulo Wi-Fi M.2

**Casos de uso**: LLM locales pequeños e IA generativa, análisis de video con
DeepStream, robótica y desarrollo con ROS 2, educación y prototipado.

## Especificaciones

| Categoría | Especificación |
|---|---|
| Kit | NVIDIA Jetson Orin Nano Super Developer Kit — módulo P3767 + placa portadora P3768; número de pieza del kit completo: P3766 *(NVIDIA)* |
| Rendimiento de IA | Hasta 67 INT8 TOPS (dispersos) / 33 INT8 TOPS (densos); hasta 1.7x de mejora en IA generativa frente al kit original *(NVIDIA)* |
| GPU | Arquitectura NVIDIA Ampere, 1024 núcleos CUDA + 32 Tensor Cores; hasta 1,020 MHz *(NVIDIA)* |
| CPU | Arm Cortex-A78AE v8.2 de 6 núcleos y 64 bits; hasta 1.7 GHz; caché L2 de 1.5 MB + L3 de 4 MB *(NVIDIA)* |
| Memoria | LPDDR5 de 128 bits y 8 GB, 102 GB/s *(NVIDIA)* — compartida entre la CPU, la GPU y las aplicaciones |
| Almacenamiento | Sin eMMC. Ranura para tarjeta microSD en la parte inferior del módulo (almacenamiento principal) + 2x ranuras M.2 Key-M para NVMe: 2280 (PCIe 3.0 x4) y 2230 (PCIe 3.0 x2) *(NVIDIA)* |
| Video | Decodificación de hasta 1x 4K60 (H.265), 2x 4K30, 5x 1080p60 u 11x 1080p30; codificación 1080p30 usando 1-2 núcleos de CPU (sin codificador de hardware dedicado) *(NVIDIA)* |
| Salida de video | 1x DisplayPort 1.2 (+MST) — la única salida de video; el puerto USB-C no emite señal de video *(NVIDIA)*. Ficha de la tienda: «DP 1.2, hasta 4K@60Hz» — las páginas consultadas de NVIDIA no indican una resolución máxima de pantalla |
| Redes | 1x Gigabit Ethernet (RJ45) *(NVIDIA)*; módulo inalámbrico M.2 Key-E incluido, descrito por NVIDIA como «controlador de interfaz de red inalámbrica 802.11ac/ab/gn» *(NVIDIA)*. Ficha de la tienda: Wi-Fi 5 de doble banda 2.4/5 GHz + Bluetooth 5.0 (las páginas de NVIDIA no indican una versión de Bluetooth — trate Bluetooth 5.0 como no verificado) |
| E/S | 4x USB 3.2 Type-A (10 Gbps, en dos conectores de doble pila), 1x USB-C (solo datos; modos Host, Device y USB Recovery), conector de 40 pines (UART, SPI, I2S, I2C, GPIO), conector de botones de 12 pines, conector de ventilador de 4 pines, conector de alimentación DC (5.5 mm x 2.5 mm) *(NVIDIA)* |
| Cámara | 2x conectores MIPI CSI (22 posiciones, paso de 0.5 mm, contacto inferior): CAM0 1x2 carriles; CAM1 1x2 o 1x4 carriles *(NVIDIA)* |
| Potencia | Configurable 7 W – 25 W *(NVIDIA)*. Modo predeterminado: 25 W. MAXN SUPER es experimental y solo está disponible cuando el kit está flasheado con la configuración `jetson-orin-nano-devkit-super` o `jetson-orin-nano-devkit-super-maxn` *(NVIDIA)* |
| Dimensiones | Hoja de datos de NVIDIA: 103 x 90.5 x 34.77 mm; tabla de especificaciones de la familia de NVIDIA: 100 x 79 x 21 mm (en ambas definiciones: la altura incluye los pies, la placa portadora, el módulo y la solución térmica). NVIDIA no ha conciliado las dos cifras; la ficha de la tienda indica 100 x 79 x 21 mm |
| Software | Versión actual: JetPack 7.2.1, que incluye Jetson Linux (L4T) r39.2.1, instalada con el método de la Jetson ISO *(NVIDIA)* |
| En la caja (paquete de la tienda de Juxi) | NVIDIA Jetson Orin Nano Super Developer Kit x1 (caja original oficial); adaptador de alimentación de 19 V x1; cable de alimentación Type B (US, JP, CA, PH) x1; tarjeta microSD de 64 GB x1; módulo Wi-Fi M.2 x1 |
| En la caja (NVIDIA) | Kit de desarrollo (módulo Orin Nano 8GB con disipador de calor + placa portadora de referencia), fuente de alimentación de 19 V, controlador de interfaz de red inalámbrica 802.11ac/ab/gn, guía de inicio rápido *(NVIDIA)*. Sin almacenamiento extraíble: «Jetson Orin Nano Developer Kit no incluye almacenamiento extraíble en la caja» *(NVIDIA)* |
| Garantía | 1 año, solo para uso de desarrollo (ficha de la tienda) |

*Especificaciones completas: consulte la hoja de datos oficial de NVIDIA del kit
(enlazada desde nvidia.com).*

> **Nota de Juxi:** Cuando la ficha de la tienda y las cifras oficiales de
> NVIDIA difieren, esta página usa la cifra de NVIDIA e indica la diferencia.
> Elementos que la tienda lista y que las páginas de NVIDIA no confirman:
> Bluetooth 5.0 y salida de video 4K@60Hz. La tarjeta microSD de 64 GB incluida
> llega **sin imagen preinstalada** (en blanco); NVIDIA recomienda una tarjeta
> UHS-1 de 64 GB o mayor. Prevea una instalación completa de JetPack — véase
> Primeros pasos más abajo.

## Primeros pasos

1. **Compruebe primero la versión del firmware.** JetPack 7.2.1 requiere
   firmware UEFI/QSPI de la generación de JetPack 6.x (versión posterior a
   36.0). Si su kit trae un firmware de fábrica más antiguo, complete primero
   la ruta de actualización de JetPack 6.x antes de instalar — véase [Flasheo
   y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).
2. **Reúna lo que debe aportar**: un PC o portátil (Windows, macOS o Linux)
   con al menos 25 GB de espacio libre; una unidad flash USB de 16 GB o más; y
   un monitor DisplayPort con teclado y ratón USB, o un cable serie USB-TTL
   para una configuración headless.
3. **Elija su almacenamiento**: la tarjeta microSD de 64 GB incluida (insértela
   en la ranura de la parte inferior del módulo antes de arrancar) o su propio
   SSD NVMe en una ranura M.2 Key-M.
4. **Escriba el instalador**: descargue la Jetson ISO de JetPack 7.2.1 y
   escríbala en la unidad flash USB. No escriba nunca la ISO en una tarjeta
   microSD — a partir de JetPack 7.2, las imágenes de tarjeta SD ya no son
   compatibles.
5. **Instale**: arranque el kit desde la unidad flash USB y seleccione el
   almacenamiento de destino. Confirme el aviso de la cápsula QSPI con **Y en un
   plazo de 30 segundos** — NVIDIA lo señala como el paso que más se omite.
6. **Primer arranque**: complete la configuración inicial de Ubuntu y luego
   instale los componentes de JetPack.
7. Guía completa: **[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)**

## Documentación (serie Jetson Orin Nano)

- [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start) · [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates) · [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)
- [Descripción general del producto](/es/tutorials/jetson-orin-nano/overview) · [Interfaces y disposición del hardware](/es/tutorials/jetson-orin-nano/interfaces) · [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting) · [Preguntas frecuentes](/es/tutorials/jetson-orin-nano/faq)
- [Descargas](/es/tutorials/jetson-orin-nano/downloads) · [Migración desde JetPack 6.x](/es/tutorials/jetson-orin-nano/jetpack-6-to-7) · [Glosario](/es/tutorials/jetson-orin-nano/glossary) · [Registro de cambios](/es/tutorials/jetson-orin-nano/changelog)
- [Inferencia de LLM local](/es/tutorials/jetson-orin-nano/local-llm) · [Eficiencia de memoria](/es/tutorials/jetson-orin-nano/memory-efficiency) · [Análisis de video con DeepStream](/es/tutorials/jetson-orin-nano/deepstream) · [Robótica — Estado de la cuestión](/es/tutorials/jetson-orin-nano/robotics) · [IA agéntica (NemoClaw)](/es/tutorials/jetson-orin-nano/agentic-ai)

## Accesorios recomendados

Explore el [catálogo de Juxi Technology](https://wiki.juxitech.com/products/) —
cámaras (IMX219 CSI, USB con autofoco, RealSense de profundidad), el [Jetson
Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator) (listado
en la tienda para Orin NX / Orin Nano SUPER), brazos robóticos, sensores y
mucho más.

## Soporte

- 📧 Soporte técnico: support@juxitech.com
- 🌐 Sitio web: [www.juxitech.com](https://www.juxitech.com)
- 💬 Informar de problemas en la documentación: [GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## Fuentes

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (consultado el 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (consultado el 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (consultado el 2026-09-26)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (consultado el 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (consultado el 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, enlazado desde nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (consultado el 2026-09-26)
- [Juxi Technology store product page](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA en las fechas indicadas; aún no verificado en hardware físico
por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
