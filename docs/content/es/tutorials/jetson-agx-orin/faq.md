---
title: Preguntas frecuentes (FAQ)
sidebar_label: Preguntas frecuentes
slug: /support/faq
description: >-
  Preguntas frecuentes sobre el kit de desarrollo NVIDIA Jetson AGX Orin
  (64GB) — contenido de la caja, configuración, pantalla y alimentación,
  software y soporte.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Preguntas frecuentes (FAQ)

## Configuración

**¿Qué incluye la caja?**
Módulo Jetson AGX Orin y placa portadora de referencia, módulo Wi-Fi, fuente de
alimentación USB Type-C y un cable USB Type-C a USB Type-A. El monitor
(DisplayPort), el teclado y el ratón los aporta usted, y el cable Ethernet es
opcional; consulte
[Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start).

**¿El kit viene con sistema operativo?**
Sí: la eMMC viene flasheada de fábrica y el kit arranca directamente en el
escritorio de Ubuntu. Es posible que algunas unidades se envíen con una versión
L4T más antigua; la ruta de actualización recomendada es la Jetson ISO (no
requiere PC host). Consulte
[Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start).

**¿Necesito un ordenador aparte para configurarlo?**
No, no para la ruta recomendada: la Jetson ISO se instala desde una memoria
USB. Solo se necesita un PC host (Ubuntu) para los métodos de instalación
alternativos (SDK Manager / script de flasheo) o para la primera configuración
headless. Consulte
[Flasheo y actualizaciones](/es/tutorials/jetson-agx-orin/flashing-and-updates).

**¿Qué versión de software es la actual?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2). Compruebe qué ejecuta su kit con
[Verificación del sistema](/es/tutorials/jetson-agx-orin/verify-your-system).

## Pantalla y alimentación

**¿Puedo conectar mi monitor HDMI?**
Solo mediante un adaptador o cable **activo** DisplayPort→HDMI: el kit solo
tiene salida DisplayPort (no hay puerto HDMI ni DisplayPort sobre USB-C). Se
admite MST para hasta dos pantallas. Detalles:
[Interfaces y disposición del hardware](/es/tutorials/jetson-agx-orin/interfaces).

**¿Cómo se alimenta el kit?**
Utilice la fuente de alimentación USB-C incluida en el puerto USB-C situado
encima del conector DC (J24). Si usa su propia fuente a través del conector de
barril (J41): 5.5 mm OD, 2.5 mm ID, centro positivo.

## Uso del kit

**¿Este kit de desarrollo puede emular otros módulos Jetson?**
Sí. El kit de desarrollo comparte una misma arquitectura SoC con todos los
módulos Jetson Orin, por lo que puede emular el rendimiento y la potencia de
AGX Orin, Orin NX u Orin Nano mediante un nuevo flasheo. De fábrica viene
configurado para la serie AGX Orin.

**¿Es este el módulo que usaría en un producto de producción?**
No. Los productos de producción se construyen sobre **módulos** Jetson Orin
(64 GB / 32 GB / Industrial), montados en su propia placa portadora o en la de
un socio. El kit de desarrollo es el vehículo de desarrollo y prototipado.

**¿Puede ejecutar modelos de lenguaje grandes / IA agéntica?**
Sí: es uno de los casos de uso principales de la plataforma Orin. Con JetPack
7.2, NVIDIA NemoClaw se puede instalar con un solo comando en los kits de
desarrollo para la orquestación de modelos locales y en la nube, y
[Jetson AI Lab](https://www.jetson-ai-lab.com) publica tutoriales prácticos.

**Para robótica: ¿Isaac ROS está disponible en JetPack 7.2?**
Sí: Isaac ROS admite Jetson Orin en JetPack 7.2 desde la versión **4.6.0**
(2026-08-18), con una guía oficial de configuración para AGX Orin. Tenga en
cuenta que la página de descargas de JetPack de NVIDIA sigue mostrando
«próximamente»: Isaac ROS se publica independientemente de JetPack, por lo
que sus propias notas de la versión son la fuente de referencia. Para la
versión y la elección de la distribución de ROS 2 (4.6.x = Jazzy,
5.0 = Lyrical) y las restricciones conocidas, consulte
[Robótica en JetPack 7.2](/es/tutorials/jetson-agx-orin/robotics).

## Soporte y servicio

**¿Dónde puedo obtener ayuda técnica?**
- Preguntas sobre la plataforma: [Foros de desarrolladores de NVIDIA Jetson](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — busque primero; incluya la salida de `cat /etc/nv_tegra_release`.
- Soporte técnico de Juxi Technology: **support@juxitech.com**
- Pedidos, garantía y RMA: **support@juxitech.com** (para agilizar la gestión, incluya su número de pedido)
- Ventas y presupuestos: **sales@juxitech.com**
- Preguntas sobre productos (selección, compatibilidad): **pe@juxitech.com**

**¿Dónde puedo conseguir accesorios (almacenamiento NVMe, cámaras, alimentación)?**
Explore el catálogo de productos de Juxi Technology en **<https://wiki.juxitech.com/products/>**:
incluye accesorios relevantes para Jetson, como la
[cámara CSI IMX219](https://wiki.juxitech.com/products/imx219-csi-camera)
(diseñada para NVIDIA Jetson), cámaras USB con enfoque automático y
[cámaras de profundidad RealSense](https://wiki.juxitech.com/products/realsense-depth-camera).
Para recibir asesoramiento, escriba a sales@juxitech.com.

## Fuentes

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-23)

*Estado: borrador, pendiente de revisión por cheny.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
