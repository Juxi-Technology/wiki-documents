---
title: Eficiencia de memoria — ejecutar cargas de trabajo más grandes en 64GB
sidebar_label: Eficiencia de memoria
slug: /tutorials/memory-efficiency
description: >-
  Las palancas documentadas para reducir el uso de memoria en el kit de
  desarrollo AGX Orin — habilidades de agente a nivel de plataforma,
  optimizaciones a nivel de modelo en TensorRT Edge-LLM y cómo medir los
  resultados.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# Eficiencia de memoria — ejecutar cargas de trabajo más grandes en 64GB

En los dispositivos de borde, la memoria — no la capacidad de cómputo — suele
ser lo que limita los modelos que puede ejecutar. JetPack 7.2 se lanzó con la
eficiencia de memoria como tema principal, y hay tres capas documentadas de
optimización: la **plataforma**, el **modelo** y la **medición**. Esta página
traza el mapa de las palancas; cada una enlaza con su fuente autorizada.

## Palanca 1 — Nivel de plataforma (habilidades de agente de NVIDIA)

Las **habilidades de agente de optimización de memoria** de JetPack 7.2 guían
a un agente de IA en la auditoría y la reducción del consumo de memoria en toda
la pila, según NVIDIA:

- **Carveouts de memoria del bootloader** — recupere la memoria reservada antes
  de que Linux arranque
- **Reservas de memoria del kernel** — ajuste lo que el kernel retiene
- **Sobrecarga del espacio de usuario** — encuentre y elimine procesos y
  servicios redundantes

El objetivo que declara NVIDIA: que quepan cargas de trabajo más capaces en una
huella de memoria más reducida (así es como el mismo hardware resulta cada vez
más útil a lo largo de las versiones de software). Comience aquí:

- [Habilidades del lado del dispositivo Jetson](https://github.com/jetson-device-skills) · [Habilidades BSP de Jetson](https://github.com/jetson-bsp-skills)
- Contexto: [blog de NVIDIA sobre la eficiencia de memoria en JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Precaución:** los cambios de carveouts y reservas afectan el comportamiento
> de arranque. Haga los cambios de uno en uno, conserve una ruta de recuperación
> (consulte
> [Flasheo y actualizaciones](/es/tutorials/jetson-agx-orin/flashing-and-updates)) y
> vuelva a validar antes de pasar a producción.

## Palanca 2 — Nivel de modelo (funciones de TensorRT Edge-LLM)

Para las cargas de trabajo de LLM/VLM, los mayores consumidores de memoria son
los pesos y la caché KV. TensorRT Edge-LLM documenta estas palancas (Jetson Orin
ejecuta motores FP16/INT8/INT4 — consulte
[Inferencia LLM local](/es/tutorials/jetson-agx-orin/local-llm)):

| Palanca | Qué hace | Documentación |
|---|---|---|
| **Cuantización** (INT8/INT4 en Orin) | Pesos más pequeños, menos ancho de banda | [Guía de cuantización](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Reducción del vocabulario** | Reduce el vocabulario de salida / las tablas de embedding | [Reducir el vocabulario](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **Reutilización de la caché KV** | Reutiliza la caché entre solicitudes relacionadas en lugar de recalcular | [Reutilización de la caché KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **Poda de tokens visuales DART** | Recorta los tokens de imagen redundantes para los VLM | [Poda DART](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(La caché KV FP8 existe en la documentación, pero está orientada a Thor; Orin
se limita a los motores FP16/INT8/INT4 según la matriz de compatibilidad
oficial.)*

## Palanca 3 — Mida, no adivine

- **Vista del sistema:** `tegrastats` (integrado en Jetson Linux) para CPU, GPU
  y memoria en tiempo real — consulte
  [Verifique su sistema](/es/tutorials/jetson-agx-orin/verify-your-system).
- **Vista del modelo:** TensorRT Edge-LLM incluye un
  [diseño y herramientas de monitorización de memoria](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html)
  y publica
  [benchmarks de rendimiento por versión](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Método:** registre una línea base (memoria usada en reposo y bajo carga),
  cambie **una** palanca y vuelva a medir. Las cifras listas para publicar deben
  proceder siempre de su propia carga de trabajo.

## Qué significa esto en la práctica

- El módulo de 64GB ya ejecuta modelos de la clase 30B (consulte las cifras
  publicadas en [Inferencia LLM local](/es/tutorials/jetson-agx-orin/local-llm)); la optimización de memoria es lo que le permite añadir *más* por encima — pipelines multimodelo, contextos más largos, agentes siempre activos ([IA agéntica](/es/tutorials/jetson-agx-orin/agentic-ai)), pipelines de video junto con la inferencia ([DeepStream](/es/tutorials/jetson-agx-orin/deepstream)).
- Si su carga de trabajo cabe hoy pero apenas, comience por la Palanca 2 (nivel
  de modelo) — es la de menor riesgo y la mejor documentada. Use la Palanca 1
  cuando necesite exprimir la propia plataforma.

## Fuentes

- [Blog técnico de NVIDIA — eficiencia de memoria y habilidades de agente en JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (verificado el 2026-09-24)
- [Documentación de TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (funciones y matriz de compatibilidad; verificado el 2026-09-24)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
