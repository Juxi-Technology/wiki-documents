---
title: Robótica en JetPack 7.2 — qué funciona hoy
sidebar_label: Robótica (estado actual)
slug: /tutorials/robotics
description: >-
  Una página de estado honesta sobre el desarrollo de robótica en el kit de
  desarrollo AGX Orin con JetPack 7.2 — disponibilidad de ROS 2 e Isaac ROS,
  pilas de aprendizaje robótico y qué verificar antes de comprometerse.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Robótica en JetPack 7.2 — qué funciona hoy

JetPack 7.2 llevó Orin a una nueva generación de plataforma (Ubuntu 24.04,
kernel 6.8, CUDA 13). En robótica, el panorama es mixto: las piezas centrales
(ROS 2, Isaac ROS) ya están en su sitio en esta plataforma, mientras que partes
de la pila circundante todavía se están asentando — así que esta página es
deliberadamente una página de estado, no un tutorial. Consúltela antes de
comprometerse con una arquitectura.

## Tabla de estado (consultado el 2026-09-24; fila de Isaac ROS reconsultada el 2026-09-26)

| Lo que necesita | Estado en JetPack 7.2 / AGX Orin | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | Ubuntu 24.04 es la plataforma objetivo de ROS 2 **Jazzy**; instálelo siguiendo la [documentación de instalación de ROS 2](https://docs.ros.org/en/jazzy/Installation.html). ROS 2 basado en Docker también es una opción. |
| **Isaac ROS** (paquetes ROS 2 acelerados por hardware) | ✅ **Compatible desde Isaac ROS 4.6.0** (2026-08-18) | Publicado para JetPack 7.2 en Jetson Orin, con una guía oficial de configuración para AGX Orin. Su verdadera decisión es la distribución de ROS 2: **4.6.x en Jazzy** frente a **5.0 en Lyrical** — consulte [Isaac ROS en JetPack 7.2](#isaac-ros-en-jetpack-7-2). |
| **Modelos LLM / VLM / VLA locales** | ✅ Funciona | TensorRT Edge-LLM admite oficialmente Orin en JP7.2, incluidos los ejemplos de **Visión-Lenguaje-Acción** — consulte [Inferencia LLM local](/es/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines de video multicámara** | ✅ Funciona | DeepStream 9.1 viene incluido con JP7.2 — consulte [Análisis de video con DeepStream](/es/tutorials/jetson-agx-orin/deepstream). |
| **Comportamientos agénticos / orquestación** | ✅ Funciona | NemoClaw + habilidades de agente de Jetson — consulte [IA agéntica](/es/tutorials/jetson-agx-orin/agentic-ai). |
| **Pilas de aprendizaje robótico (frameworks de Python estilo LeRobot)** | ⚠️ Verifique antes de comprometerse | Estas pilas dependen en gran medida de Python; Ubuntu 24.04 pasó a Python 3.12 y algunas dependencias pueden quedarse rezagadas. Pruebe su pila concreta en JP7.2 antes de diseñar en torno a ella, y tenga en cuenta que **no lo hemos verificado en hardware**. |
| **GR00T (modelos fundacionales humanoides)** | ⚠️ Consulte las fuentes oficiales | Siga el repositorio oficial de Isaac GR00T de NVIDIA y sus anuncios para conocer el soporte de plataforma. Una guía paso a paso publicada por un socio informa de un despliegue de TensorRT con pesos completos en AGX Orin + JP7.2 *(de terceros, no verificado por nosotros)*. |
| **Placas portadoras personalizadas / trabajo de BSP** | ✅ Herramientas nuevas | Las **habilidades de agente de personalización de Jetson Linux** de JetPack 7.2 automatizan las tareas de puesta en marcha del BSP — consulte los [repositorios de habilidades de agente](https://github.com/jetson-bsp-skills). |

## Isaac ROS en JetPack 7.2

La era del «próximamente» ha terminado. La versión **4.6.0** de Isaac ROS
(2026-08-18) añadió compatibilidad con **Jetson Orin** y **JetPack 7.2**, y la
tabla de plataformas compatibles empareja *Jetson Orin* con *JetPack 7.2*
(SSD NVMe de 128+ GB). Para esta combinación, NVIDIA publica una guía paso a
paso dedicada de inicio rápido y configuración de Docker para la
**Jetson AGX Orin** — este kit es un objetivo de primera clase, no una
ocurrencia tardía.

La decisión que realmente importa es qué **distribución de ROS 2** adopta:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Publicación | 2026-08-18 | 2026-09-21 |
| Distribución de ROS 2 | **Jazzy** — la versión estándar de Ubuntu 24.04 | **Lyrical Luth** — NVIDIA compila por su cuenta los paquetes de ROS 2 para Noble y los sirve desde el CDN de su buildfarm |
| Paquetes NITROS | Presentes | **Eliminados** y reconstruidos de forma nativa sobre `rosidl::Buffer`; el código que llama directamente a las API o los tipos de NITROS necesita una migración a nivel de código fuente |
| Emparejamiento con Isaac Sim | 6.0 (5.0/5.1 todavía compatibles como legado) | 6.0 |

- Si empieza de cero y quiere la ruta convencional: **4.6.x en Jazzy** le
  mantiene en la versión estándar de ROS 2. **5.0** es hacia donde se dirige
  NVIDIA y trae el ecosistema Lyrical — lea la guía de migración de NITROS a
  `rosidl::Buffer` enlazada desde las [notas de la versión 5.0.0](https://nvidia-isaac-ros.github.io/releases/index.html)
  antes de actualizar el código de sus nodos existentes.
- **Restricciones conocidas en Orin** con estas versiones: las cámaras
  RealSense funcionan **solo en modo Docker**; con `isaac_ros_stereo_image_proc`,
  seleccionar `backend:=JETSON` en AGX Orin con entrada RGB8/BGR8 puede abortar
  el nodo con un error de VPI — mantenga el valor predeterminado `backend:=CUDA`;
  el Teleop del paquete Debian necesita `ISAAC_TELEOP_CLOUDXR_EXP=0` en Orin; y
  el preprocesamiento de `isaac_ros_dnn_image_encoder` de 5.0 es más lento que
  el de 4.6 en AGX Orin — si ese nodo es un punto caliente en su grafo,
  prefiera 4.6.
- **OpenCV:** JetPack 7.2 incluye OpenCV **4.8.0**, mientras que Isaac ROS
  espera **4.6.0**. Elimine los paquetes del sistema
  (`sudo apt-get remove -y libopencv* opencv*`) y los paquetes de Isaac ROS
  instalarán su versión fijada.

### En qué discrepan las propias páginas de NVIDIA

La [página de descargas de JetPack](https://developer.nvidia.com/embedded/jetpack/downloads)
de NVIDIA sigue mostrando Isaac ROS como **«próximamente»** para esta versión,
mientras que las notas de la versión de Isaac ROS afirman que hay soporte desde
la versión 4.6.0. Las dos páginas no se han conciliado — Isaac ROS se publica
con independencia de JetPack, y la tabla de componentes de la página de JetPack
refleja lo que se distribuye *con* JetPack. Los repositorios apt a los que
apuntan los documentos de Isaac ROS son la prueba fehaciente de la combinación
compatible: `…/isaac-ros/release-4.6 noble-jetpack` — *noble* para Ubuntu
24.04, *jetpack* para la compilación de JetPack. Cuando ambas discrepen, trate
las [notas de la versión de Isaac ROS](https://nvidia-isaac-ros.github.io/releases/index.html)
como la fuente operativa, y verifique en su propia instalación antes de diseñar
en torno a cualquiera de las dos.

## Recomendación

- **Proyectos nuevos sin dependencia de robótica:** construya sobre JetPack 7.2 —
  obtendrá compatibilidad con Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLM
  en el dispositivo y las herramientas de agentes.
- **Proyectos que usan Isaac ROS:** JetPack 7.2 vuelve a ser un objetivo
  compatible. Elija deliberadamente entre 4.6.x (Jazzy) y 5.0 (Lyrical), y
  presupueste el cambio de OpenCV y el soporte de RealSense solo en modo
  Docker. Si está a mitad de proyecto en JetPack 6.x con una pila validada, no
  hay ninguna migración forzada — migre cuando tenga decidida su versión de
  Isaac ROS (nuestra
  [guía de migración](/es/tutorials/jetson-agx-orin/jetpack-6-to-7) cubre el trabajo de
  reconstrucción).
- **Un kit, muchos módulos:** recuerde que su kit de desarrollo puede emular los
  demás módulos Jetson Orin mediante un nuevo flasheo — resulta útil para validar
  una carga de trabajo de robótica en toda la gama de módulos antes de decidirse
  por un componente de producción
  ([Descripción general del producto](/es/tutorials/jetson-agx-orin/overview)).

## Fuentes

- [Notas de la versión de Isaac ROS — 4.6.0 (2026-08-18) y 5.0.0 (2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html) (consultado el 2026-09-26)
- [Isaac ROS 4.6 — Getting Started: plataformas compatibles, guía paso a paso de Jetson AGX Orin, instalación por apt](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (consultado el 2026-09-26)
- [Isaac ROS 5.0 — Getting Started: plataformas compatibles, CDN de la buildfarm de Lyrical](https://nvidia-isaac-ros.github.io/getting_started/index.html) (consultado el 2026-09-26)
- [Página de descargas de JetPack 7.2.1 — lista de componentes](https://developer.nvidia.com/embedded/jetpack/downloads) — todavía conserva la fila obsoleta de Isaac ROS «próximamente» (consultado el 2026-09-26)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulación de módulos; consultado el 2026-09-24)
- [Documentación de instalación de ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Estado: revisado el 2026-10-11. La disponibilidad del
ecosistema cambia rápidamente — vuelva a consultar las páginas de NVIDIA
enlazadas antes de basarse en esta tabla. Aún no verificada en hardware físico
por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
