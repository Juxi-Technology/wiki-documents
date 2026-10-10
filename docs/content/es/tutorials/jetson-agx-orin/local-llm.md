---
title: Ejecutar LLM localmente — TensorRT Edge-LLM en JetPack 7.2
sidebar_label: Inferencia LLM local
slug: /tutorials/local-llm
description: >-
  Ejecute grandes modelos de lenguaje y multimodales localmente en el kit de
  desarrollo AGX Orin con NVIDIA TensorRT Edge-LLM — modelos compatibles,
  restricciones de Orin, flujo de trabajo y rendimiento esperado.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# Ejecutar LLM localmente — TensorRT Edge-LLM en JetPack 7.2

Su AGX Orin de 64GB puede ejecutar grandes modelos de lenguaje localmente — sin
nube y sin red. La ruta optimizada de NVIDIA para ello es **TensorRT Edge-LLM**,
que **admite oficialmente Jetson Orin en JetPack 7.2**. Esta página le sirve de
orientación: qué puede y qué no puede hacer su kit, la forma del flujo de
trabajo y el rendimiento que puede esperar. La guía paso a paso autorizada se
encuentra en la documentación de NVIDIA (con enlaces a lo largo de la página).

## Lea esto primero — tres hechos específicos de Orin

1. **Orin solo ejecuta motores FP16, INT8 e INT4. FP8 y FP4 no son compatibles
   con Orin** (son capacidades de la clase Thor). La matriz de compatibilidad de
   NVIDIA lo indica explícitamente — planifique en consecuencia sus decisiones
   de cuantización.
2. **Los motores se compilan en el dispositivo** para la ruta de despliegue de
   Orin (no se compilan de forma cruzada desde un PC).
3. **JetPack 7.2 es la pila compatible** — CUDA 13.2 con el TensorRT de la
   plataforma (10.16.2 en esta versión). El wheel aarch64 está destinado a
   Jetson Orin (SM87) con Python 3.10–3.12.

*(Fuente: matriz de compatibilidad oficial de TensorRT Edge-LLM, consultada el 2026-09-24.)*

## Qué cubre TensorRT Edge-LLM

Según la documentación de NVIDIA, Edge-LLM ofrece inferencia optimizada para
**modelos de texto, visión, audio, voz y acción** en plataformas perimetrales:

| Capacidad | Ejemplos en la documentación |
|---|---|
| Generación de texto | Familias de LLM como Qwen, Gemma, Nemotron |
| Multimodal (VLM) | Ejemplo de Phi-4 Multimodal |
| Reconocimiento de voz (ASR) | Flujo de trabajo de ejemplo dedicado |
| Generación de voz (TTS) | Flujo de trabajo de ejemplo dedicado |
| Visión-Lenguaje-Acción | Ejemplos de VLA (robótica) |
| Omni (E/S de audio + visión + voz) | Flujo de trabajo de ejemplo dedicado |

Características destacadas: cuantización (INT8/INT4 en Orin), decodificación
especulativa (EAGLE3, DFlash y otras), **reutilización de la caché KV**,
**reducción de vocabulario**, **poda de tokens visuales DART** para VLM, salida
en streaming y compatibilidad con LoRA.

## El flujo de trabajo (según la documentación)

TensorRT Edge-LLM tiene dos rutas de inicio rápido documentadas:

1. **ONNX + entorno de ejecución de C++** — exporte y cuantice los checkpoints (normalmente en un host x86), transfiéralos al dispositivo, compile los motores en el dispositivo y ejecute el entorno de ejecución de C++.
2. **Servidor Python en una línea** — la ruta más rápida hacia un endpoint de servicio.

Empiece aquí: **[Inicio rápido de TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Más allá del inicio rápido:

- [Opciones de instalación →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (entorno de ejecución de C++ desde el código fuente, flujo de trabajo de exportación/cuantización, wheel local experimental)
- [Modelos compatibles →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Guía de cuantización →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [Reutilización de la caché KV →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Poda DART →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Consejo de Juxi:** las herramientas de exportación/cuantización funcionan
> mejor en un host Linux x86 (según las filas de desarrollador x86 de la
> documentación); la **compilación de motores y la inferencia se ejecutan en su
> kit**. Reserve espacio en disco para los checkpoints de los modelos — lo
> habitual son varios GB por modelo.

## Servicio: endpoint compatible con OpenAI (y Claude Code)

La documentación incluye una **API de Python y un servidor experimentales** que
exponen una interfaz de chat compatible con OpenAI — con ejemplos documentados
para clientes de estilo OpenAI e incluso un **ejemplo de integración con
«Anthropic y Claude Code»** (que apunta Claude Code a su endpoint alojado en el
Jetson).

- [API y servidor de Python experimentales →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Rendimiento esperado (AGX Orin 64GB)

NVIDIA publicó estas cifras de tokens/s para JetPack 7.2 en el módulo de 64GB
(junio de 2026; consulte el blog de origen para ver el contexto completo y la
metodología):

| Modelo | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

Sus cifras variarán según el modelo, la cuantización, la longitud del contexto
y el modo de alimentación. Considere estas cifras como la referencia publicada
por el fabricante, no como una garantía.

## Alternativas más sencillas

Si el flujo de trabajo de exportación/compilación de Edge-LLM es más de lo que
necesita ahora mismo, [Jetson AI Lab](https://www.jetson-ai-lab.com) de NVIDIA
publica tutoriales prácticos para otros entornos de ejecución (llama.cpp, vLLM
y más) — consulte sus notas sobre versiones de JetPack antes de seguir
tutoriales más antiguos.

## Solución de problemas

- **La primera ejecución es lenta:** la compilación de motores puede tardar varios minutos en el primer inicio; las ejecuciones posteriores reutilizan el motor (el mismo comportamiento se aplica a DeepStream — consulte [nuestro tutorial de DeepStream](/es/tutorials/jetson-agx-orin/deepstream)).
- **Las instrucciones FP8/FP4 no funcionan:** es lo esperado — Orin solo admite motores FP16/INT8/INT4.
- **Versiones incorrectas:** confirme primero JetPack 7.2.1 — [Verifique su sistema](/es/tutorials/jetson-agx-orin/verify-your-system).

## Fuentes

- [TensorRT Edge-LLM — Matriz de compatibilidad oficial](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (consultada el 2026-09-24)
- [Página de inicio de la documentación de TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, consultada el 2026-09-24)
- [Blog técnico de NVIDIA — Despliegue IA preparada para agentes en el borde con eficiencia de memoria en JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (cifras de rendimiento; consultado el 2026-09-24)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
