---
title: Ejecutar LLM localmente — TensorRT Edge-LLM en el Orin Nano de 8 GB
sidebar_label: Inferencia LLM local
slug: /tutorials/local-llm
description: >-
  Ejecutar grandes modelos de lenguaje localmente en el Jetson Orin Nano de
  8 GB — compatibilidad con TensorRT Edge-LLM, límites de precisión, qué cabe
  y cifras oficiales.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# Ejecutar LLM localmente — TensorRT Edge-LLM en el Orin Nano de 8 GB

Su NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) puede ejecutar modelos
de lenguaje localmente. La ruta optimizada de NVIDIA para ello es **TensorRT
Edge-LLM**, que **admite oficialmente Jetson Orin en la línea JetPack 7.2**.
Esta página cubre qué cabe en 8 GB y qué entornos de ejecución funcionan hoy;
las instrucciones están en la documentación de NVIDIA, enlazada más abajo.

## Lea esto primero — cuatro restricciones de este kit

1. **Orin solo ejecuta motores FP16, INT8 e INT4. Los motores FP8 y FP4 no se
   ejecutan en este dispositivo** — son capacidades de la clase Thor/Blackwell
   («Jetson Orin no ejecuta motores de modelo FP8 ni FP4» — matriz de
   compatibilidad).
2. **Los motores se compilan en el dispositivo** mediante el entorno de
   ejecución de C++. La exportación y la cuantización de ONNX se ejecutan en un
   host Linux x86-64 — no en Orin. Los motores están ligados exactamente al SM:
   uno compilado para Thor (SM110) no se cargará en Orin Nano (sm_87).
3. **JetPack 7.2.1 (L4T r39.2.1) es la pila compatible** — CUDA 13.2.2,
   TensorRT 10.16.2. Edge-LLM usa este TensorRT de plataforma que viene con
   JetPack.
4. **Los 8 GB de memoria unificada se comparten con el SO y el escritorio.**
   Unos 7.6 GB son utilizables. El tamaño del modelo — no los TOPS — es la
   restricción determinante, y la caché KV también debe caber en esa misma
   memoria.

> **Importante:** elija checkpoints **INT4 AWQ** o **INT4 GPTQ** para este
> kit. No seleccione checkpoints FP8, MXFP8, FP4 ni NVFP4. INT8 GPTQ no es
> compatible.

## Qué cubre TensorRT Edge-LLM

TensorRT Edge-LLM es el entorno de ejecución oficial de NVIDIA para LLM y VLM
en plataformas perimetrales. La matriz de compatibilidad marca Jetson Orin
como «oficial» para JetPack 7.2, con motores compilados en el dispositivo y
precisión FP16, INT8, INT4.

- **Cobertura de modelos:** entre los checkpoints compatibles hay Llama 3.2
  1B/3B, Llama 3.1 8B, Qwen2.5 (0.5B–14B), Qwen3 (0.6B–8B) y VLM como
  Qwen2.5-VL 3B/7B e InternVL3/3.5 (1B–14B) — checkpoints densos de menos de
  30B parámetros. No es una matriz de verificación: «no todos los checkpoints
  de la lista se han verificado por completo en todas las plataformas y
  precisiones compatibles».
- **El flag de compilación para 8 GB:** para compilaciones de motores INT4 en
  Orin Nano, pase `--externalize-weights int4_ffn` (densos) o
  `--externalize-weights int4_ffn int4_moe` (MoE) para reducir la memoria de
  compilación de motores.
- **Espacio en disco:** reserve ~20–50 GB por flujo de trabajo de modelo para
  archivos ONNX y motores; este kit no tiene almacenamiento integrado
  ([Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)).
- **Dos rutas de inicio rápido:** una ruta de C++ (exportar/cuantizar en un
  host, compilar motores en el dispositivo, ejecutar) y una ruta de servidor —
  `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B` (descarga el checkpoint en el
  primer inicio).

> **Consejo de Juxi:** los pasos autorizados son los de NVIDIA — [Inicio
> rápido](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Instalación](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Modelos compatibles](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> La página de instalación de la 0.10.1 indica: «las wheels no se publican ni
> son la ruta de instalación predeterminada en la 0.10.1».

## Qué cabe realmente en 8 GB

- **Hasta 2B parámetros es lo que NVIDIA ha medido en este módulo.** La fila
  más grande de Orin Nano (8GB) en la página de benchmarks de Edge-LLM es
  Qwen3.5-2B con 4,692 MB: «2B es el modelo más grande que NVIDIA ha medido en
  Orin Nano 8 GB».
- **Un tutorial del proveedor ejecuta un modelo de 4B.** El tutorial de Jetson
  AI Lab informa de que Qwen3-4B-Instruct INT4 AWQ (~2 GB de pesos) cabe
  «dentro de la memoria unificada de 8 GB del Orin Nano»; InternVL3 1B/2B
  también caben con INT4 AWQ, mientras que las variantes mayores apuntan a AGX
  Orin o Thor. (Contenido del proveedor.)
- **Un margen práctico según el blog de memoria de NVIDIA: LLM de hasta ~10B y
  VLM de hasta ~4B parámetros** con cuantización de 4 bits y entornos de
  ejecución eficientes — para configuraciones ajustadas.
- **El tamaño de archivo no es la prueba definitiva — la caché KV también debe
  caber.** Informes de la comunidad muestran modelos GGUF de la clase 12B/26B
  (gemma4:12b con 7.4 GB, gemma4:26b con 16 GB) fallando en Ollama en la placa
  de 8 GB: `cudaMalloc failed: out of memory ... failed to allocate buffer for
  kv cache`. (Sin confirmar.)

## Cifras de rendimiento oficiales para este kit

NVIDIA publica tablas de benchmarks para **Jetson Orin Nano (8GB)** — v0.10.0,
JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Resultados de ejecución en MTBench
(LLM) y COCO (VLM), con la memoria GPU máxima:

| Modelo | Tipo | Rendimiento | Memoria GPU máxima |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77.0 tok/s | 1,917 MB |
| Qwen3-1.7B | LLM | 36.5 tok/s | 2,992 MB |
| Qwen3-VL-2B | VLM | 36.1 tok/s | 4,486 MB |
| Qwen3.5-0.8B | LLM | 59.1 tok/s | 2,127 MB |
| Qwen3.5-0.8B | VLM | 59.0 tok/s | 2,760 MB |
| Qwen3.5-2B | LLM | 29.6 tok/s | 3,642 MB |
| Qwen3.5-2B | VLM | 29.6 tok/s | 4,692 MB |

Las filas de Orin usan batch 1 y pesos INT4 externalizados; límites de
compilación: maxInputLen 2048, maxKVCacheCapacity 2200. «El rendimiento en
producción puede variar según el ajuste a nivel de sistema (modo de
alimentación, configuración de memoria, gestión térmica)».

> **Importante:** las tablas de tokens por segundo publicadas por NVIDIA para
> el **AGX Orin 64 GB** **no** se aplican a este kit — otro módulo, otro ancho
> de banda de memoria, otro margen de potencia. No estime cifras del Orin Nano
> a partir del AGX Orin. No hay cifras del fabricante para las rutas de Ollama
> o llama.cpp en este kit.

## Otros entornos de ejecución en este kit

### Ollama

Estado actual, verificado por personal de NVIDIA en los foros de
desarrolladores para JetPack 7.2.1 (septiembre de 2026): el instalador
estándar funciona — `curl -fsSL https://ollama.com/install.sh | sh` — y
`ollama ps` debería informar de `100% GPU`. La advertencia "Unsupported
JetPack version detected" es inofensiva.

Las compilaciones más antiguas recurrían a la CPU porque sus bibliotecas CUDA
precompiladas carecían de sm_87, la compute capability de Orin; informes de
la comunidad señalan que Ollama 0.30.11 añadió «CC 87 para CUDA v13», y el
personal de NVIDIA confirmó la corrección. Aún quedan algunos informes de
problemas de la comunidad (agosto–septiembre de 2026) — compruebe `ollama ps`
en su unidad; la compilación desde el código fuente con CUDA v13 sigue siendo
la alternativa.

### Wheels de Python para JetPack 7.2

Los paquetes de Python con CUDA (PyTorch y otros) para JetPack 7.2 / CUDA
13.2 provienen del índice SBSA de Jetson AI Lab, que cita el personal de
NVIDIA:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Úselo como índice de pip (`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
Sirve wheels aarch64 como torch 2.11.0, torchvision 0.25.0 y vllm 0.20.0+cu130.
No existe un índice `jp7/*`; el índice de la era JetPack 6 es `jp6/cu126`.
CUDA 13.2 unifica Orin en el toolkit SBSA de Arm (controlador R595+).

### jetson-containers y Jetson AI Lab (ruta alternativa)

[jetson-containers](https://github.com/dusty-nv/jetson-containers) es
compatible con JetPack 6.2 (CUDA 12.6) y JetPack 7 (CUDA 13.x). Existen
imágenes precompiladas `-jetson-orin` para las principales rutas de servicio,
incluidas `ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` y
`ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

Advertencias para 8 GB del material del proveedor: el ejemplo de vLLM usa
`--shm-size=16g` (no es una recomendación de tamaño para este kit), y la
configuración recomendada traslada la raíz de datos de Docker a NVMe y añade
un archivo de swap de 16 GB (desactive ZRAM primero).

## Ajustes para 8 GB

Cuando un modelo no cabe: libere memoria de plataforma (el modo headless
recupera hasta ~865 MB), cuantice a 4 bits y dimensione la caché KV y el
contexto deliberadamente — consulte [Eficiencia de memoria para 8 GB](/es/tutorials/jetson-orin-nano/memory-efficiency).

## Solución de problemas

- **Sin memoria al cargar** — `cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache` significa que el modelo más la caché KV
  superan los 8 GB de memoria unificada. Use un modelo más pequeño o más
  cuantizado, o acorte el contexto; para compilaciones de motores Edge-LLM,
  añada `--externalize-weights int4_ffn` y reduzca `--maxInputLen` /
  `--maxKVCacheCapacity`.
- **Fallback a CPU de Ollama, o la advertencia "Unsupported JetPack version
  detected"** — actualice Ollama primero (las compilaciones antiguas carecían
  de sm_87); la advertencia es inofensiva en 7.2.1 según el personal de
  NVIDIA. Confírmelo con `ollama ps` (`100% GPU`).
- **Problemas de versión o configuración** — consulte [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)
  y [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

## Fuentes

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Matriz de compatibilidad](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Modelos compatibles](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Instalación](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Inicio rápido](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Benchmarks de rendimiento](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (consultado el 2026-09-26)
- [Página de descargas de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- [Blog de NVIDIA — Maximizar la eficiencia de memoria para ejecutar modelos más grandes en NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — Ollama en Jetson (verificado por personal de NVIDIA en JetPack 7.2.1)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — problema de aceleración GPU en JetPack 7.2 (índice de wheels, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — modelos de IA que funcionan en Jetson Orin Nano Super 8GB (comunidad)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (consultado el 2026-09-26)
- [Jetson AI Lab — tutorial de TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (consultado el 2026-09-26)
- [Jetson AI Lab — texto completo de la documentación (tabla de imágenes de contenedor)](https://www.jetson-ai-lab.com/llms-full.txt) (consultado el 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (consultado el 2026-09-26)
- [Índice PyPI de Jetson AI Lab — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
