---
title: Robótica en JetPack 7.2 — qué funciona hoy
sidebar_label: Robótica (estado actual)
slug: /tutorials/robotics
description: >-
  Una página de estado honesta sobre el desarrollo de robótica en el kit de
  desarrollo AGX Orin con JetPack 7.2 — disponibilidad de ROS 2 e Isaac ROS,
  pilas de aprendizaje robótico y qué usar mientras el ecosistema se pone al
  día.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Robótica en JetPack 7.2 — qué funciona hoy

JetPack 7.2 llevó Orin a una nueva generación de plataforma (Ubuntu 24.04,
kernel 6.8, CUDA 13). La robótica es el único ámbito donde el *ecosistema*
todavía se está poniendo al día con la plataforma, así que esta página es
deliberadamente una página de estado, no un tutorial. Consúltela antes de
comprometerse con una arquitectura.

## Tabla de estado (consultado el 2026-09-24)

| Lo que necesita | Estado en JetPack 7.2 / AGX Orin | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | Ubuntu 24.04 es la plataforma objetivo de ROS 2 **Jazzy**; instálelo siguiendo la [documentación de instalación de ROS 2](https://docs.ros.org/en/jazzy/Installation.html). ROS 2 basado en Docker también es una opción. |
| **Isaac ROS** (paquetes ROS 2 acelerados por hardware) | ⛔ **Aún no — NVIDIA lo marca como «próximamente» para JetPack 7** | Esta es la mayor carencia. Si Isaac ROS está hoy en su ruta crítica, manténgase en **JetPack 6.x** y vigile la [página de descargas](https://developer.nvidia.com/embedded/jetpack/downloads) de NVIDIA para saber cuándo se publica. |
| **Modelos LLM / VLM / VLA locales** | ✅ Funciona | TensorRT Edge-LLM admite oficialmente Orin en JP7.2, incluidos los ejemplos de **Visión-Lenguaje-Acción** — consulte [Inferencia LLM local](/es/tutorials/jetson-agx-orin/local-llm). |
| **Pipelines de video multicámara** | ✅ Funciona | DeepStream 9.1 viene incluido con JP7.2 — consulte [Análisis de video con DeepStream](/es/tutorials/jetson-agx-orin/deepstream). |
| **Comportamientos agénticos / orquestación** | ✅ Funciona | NemoClaw + habilidades de agente de Jetson — consulte [IA agéntica](/es/tutorials/jetson-agx-orin/agentic-ai). |
| **Pilas de aprendizaje robótico (frameworks de Python estilo LeRobot)** | ⚠️ Verifique antes de comprometerse | Estas pilas dependen en gran medida de Python; Ubuntu 24.04 pasó a Python 3.12 y algunas dependencias pueden quedarse rezagadas. Pruebe su pila concreta en JP7.2 antes de diseñar en torno a ella, y tenga en cuenta que **no lo hemos verificado en hardware**. |
| **GR00T (modelos fundacionales humanoides)** | ⚠️ Consulte las fuentes oficiales | Siga el repositorio oficial de Isaac GR00T de NVIDIA y sus anuncios para conocer el soporte de plataforma. Una guía paso a paso publicada por un socio informa de un despliegue de TensorRT con pesos completos en AGX Orin + JP7.2 *(de terceros, no verificado por nosotros)*. |
| **Placas portadoras personalizadas / trabajo de BSP** | ✅ Herramientas nuevas | Las **habilidades de agente de personalización de Jetson Linux** de JetPack 7.2 automatizan las tareas de puesta en marcha del BSP — consulte los [repositorios de habilidades de agente](https://github.com/jetson-bsp-skills). |

## Recomendación

- **Proyectos nuevos sin dependencia de Isaac ROS:** construya sobre JetPack 7.2 —
  obtendrá compatibilidad con Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLM
  en el dispositivo y las herramientas de agentes.
- **Proyectos que hoy dependen de Isaac ROS:** planifique con JetPack 6.x por
  ahora; considere JP7.x su objetivo de migración una vez que Isaac ROS se
  publique para él (cuando llegue ese día, nuestra
  [guía de migración](/es/tutorials/jetson-agx-orin/jetpack-6-to-7) cubre el trabajo de
  reconstrucción).
- **Un kit, muchos módulos:** recuerde que su kit de desarrollo puede emular los
  demás módulos Jetson Orin mediante un nuevo flasheo — resulta útil para validar
  una carga de trabajo de robótica en toda la gama de módulos antes de decidirse
  por un componente de producción
  ([Descripción general del producto](/es/tutorials/jetson-agx-orin/overview)).

## Fuentes

- [Página de descargas de JetPack 7.2.1 — Isaac ROS «próximamente» para JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (emulación de módulos; consultado el 2026-09-24)
- [Documentación de instalación de ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html)

*Estado: borrador, pendiente de revisión por cheny. La disponibilidad del
ecosistema cambia rápidamente — vuelva a consultar las páginas de NVIDIA
enlazadas antes de basarse en esta tabla. Aún no verificada en hardware físico
por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
