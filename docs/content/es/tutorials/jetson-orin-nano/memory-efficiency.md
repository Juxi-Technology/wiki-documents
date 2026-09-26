---
title: Eficiencia de memoria — ejecutar modelos en 8 GB
sidebar_label: Eficiencia de memoria
slug: /tutorials/memory-efficiency
description: >-
  Las palancas documentadas para que las cargas de trabajo de LLM, VLM y
  visión quepan en los 8 GB de memoria unificada del kit de desarrollo Jetson
  Orin Nano Super — plataforma, modelo y medición.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# Eficiencia de memoria — ejecutar modelos en 8 GB

En el kit Orin Nano Super, los 8 GB de memoria unificada son un límite
absoluto para todo: el SO, el escritorio, los servicios y el propio modelo.
Las palancas documentadas se organizan en tres capas — **plataforma**,
**modelo** y **medición** — y esta página señala dónde una técnica está
documentada solo para un módulo mayor.

## El presupuesto de 8 GB en cifras claras

- Aproximadamente **7.6 GB de los 8 GB son utilizables** tras las reservas del
  firmware y del kernel — el presupuesto que usa el blog de eficiencia de
  memoria de NVIDIA para todas sus cifras de «memoria disponible».
- La memoria de CPU y la memoria de GPU (CUDA, búferes multimedia) provienen
  del **mismo pool físico**; reducir una ayuda a la otra.
- La demo insignia del blog — un pipeline de VLM de 2B parámetros — se ejecuta
  con **4.5 / 7.6 GB (~60%)**.

## Palanca 1 — Capa de plataforma: lo que ocupan el SO y los servicios

Los ahorros siguientes proceden del blog de eficiencia de memoria de NVIDIA.

| Palanca | Ahorro documentado | Cómo |
|---|---|---|
| Desactivar el escritorio gráfico (headless) | Hasta 865 MB | `sudo systemctl set-default multi-user.target` |
| Desactivar servicios de red y de journaling | Hasta 32 MB | `sudo systemctl disable <service-name>` |
| Carveouts de pantalla y cámara | Unos 100 MB en total | Edición del árbol de dispositivos del BSP y reflasheo |
| Reserva de SWIOTLB | Unos 4 MB | Argumento del kernel `swiotlb=2048`, solo si aparecen problemas de DMA |
| Pipeline estilo DeepStream | Hasta 412 MB | De contenedor a bare metal (70 MB); de Python a C++ (84 MB); desactivar Tiler/OSD y usar FakeSink (258 MB) — consulte [DeepStream](/es/tutorials/jetson-orin-nano/deepstream) |
| Elección del framework de inferencia | Evite más de 2.7 GB de sobrecarga | Entornos de ejecución ligeros (entorno de ejecución de C++, llama.cpp); un framework más pesado puede añadir más de 2.7 GB solo en la inicialización |

> **Nota de Juxi:** las ediciones de carveout son cambios en el código fuente
> del BSP: requieren reflashear y ahorran poco. Cambie una cosa a la vez y
> conserve una imagen de flasheo funcional — consulte [Flasheo y
> actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).

**El swap no es un ahorro, sino una válvula de alivio.** El tutorial de
optimización de RAM del proveedor sustituye ZRAM por un **archivo de swap de
16 GB en NVMe** (`sudo systemctl disable nvzramconfig` primero); la demo de
8 GB de NVIDIA asumió unos **2 GB de swap usados en el pico**.

### Después de detener un servidor, libere la caché

El uso de memoria puede mantenerse alto después de detener un servidor vLLM o
SGLang, o un contenedor Docker (problema conocido 5661165 de L4T r39.2.1). El
comando de NVIDIA:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

La misma solución se aplica cuando una compilación de motores Edge-LLM se
queda sin memoria: `sudo sysctl -w vm.drop_caches=3` y límites de compilación
más pequeños (tutorial del proveedor).

### Los modos de alimentación cambian las frecuencias, no la capacidad

| Modo de alimentación | ID de modo | Frecuencia máxima de CPU | Frecuencia máxima de GPU | Frecuencia máxima de memoria |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W (predeterminado) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

Los máximos de frecuencia anteriores proceden de las tablas de alimentación y
rendimiento de la r39.2 de NVIDIA. Los modos de alimentación cambian las
frecuencias de reloj, no el tamaño de la memoria — un modelo que no cabe no
cabrá en un modo más rápido. Cambie con `sudo nvpmodel -q` (listar) y
`sudo nvpmodel -m <mode_id>`; MAXN_SUPER necesita la configuración de flasheo
Super y es experimental (según esas tablas). Si falta 25W o MAXN SUPER,
consulte [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

> **Atención:** una asignación de memoria CUDA excesivamente grande puede
> **reiniciar el dispositivo** (problema conocido 5699079 de L4T r39.2.1). La
> orientación de esas mismas notas de la versión: asegúrese de que CUDA y
> otras aplicaciones no soliciten más memoria de la físicamente disponible, y
> lance los procesos de CUDA con puntuaciones OOM más altas para que no se
> eliminen procesos del sistema.

## Palanca 2 — Capa de modelo: lo que ocupan el modelo y su caché

### La cuantización es la palanca más importante

Orin solo ejecuta **motores FP16, INT8 e INT4**; FP8 y FP4 no se ejecutan en
Orin (clase Thor/Blackwell). Para TensorRT Edge-LLM, use checkpoints **INT4
AWQ o INT4 GPTQ**, evite INT8 GPTQ y no elija nunca checkpoints FP8, MXFP8,
FP4 ni NVFP4. Consulte [Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm).

Cifras del fabricante: Qwen3 8B de FP16 a W4A16 recupera unos **10 GB**;
Qwen3 4B de BF16 a INT4 recupera unos **5.6 GB**. El gráfico de NVIDIA para
el caso de 4B está titulado «Jetson Orin NX 16 GB» — un módulo mayor, así que
tome las cifras como referencia, no como una promesa para 8 GB.

Con cuantización de 4 bits y un entorno de ejecución eficiente, el margen
documentado por NVIDIA para este presupuesto es **LLM de hasta ~10B parámetros
y VLM de hasta ~4B parámetros**.

### Qué mide realmente NVIDIA en 8 GB

TensorRT Edge-LLM publica filas de Orin Nano 8 GB para modelos de 0.6B a 2B
parámetros (familias Qwen3 y Qwen3.5); **2B es el modelo más grande que NVIDIA
mide en este módulo**. Existe un recorrido de 4B INT4 AWQ como tutorial del
proveedor (unos 2 GB de pesos), pero no se publican cifras oficiales de 4B.

### Memoria de compilación de motores (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (densos) o `--externalize-weights
  int4_ffn int4_moe` (MoE) reduce la memoria de compilación de motores en
  dispositivos Orin con menos memoria de sistema.
- Límites ajustados al Orin Nano según el tutorial del proveedor:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  Si la compilación sigue quedándose sin memoria, libere primero memoria del
  sistema y redúzcalos aún más, por ejemplo `--maxInputLen 256
  --maxKVCacheCapacity 512`. Los motores se compilan en el dispositivo y no
  son portables entre módulos.

### Caché KV: dimensionamiento y reutilización

La caché KV crece con la longitud del contexto, el tamaño de batch y la
concurrencia; forma parte del presupuesto de memoria, no es una consideración
de última hora.

- Los límites de compilación lo acotan: `--maxInputLen` y
  `--maxKVCacheCapacity`; las compilaciones de benchmark del Orin Nano usaron
  maxInputLen 2048 y maxKVCacheCapacity 2200, batch 1.
- La **reutilización de la caché KV** es una capacidad documentada del
  entorno de ejecución de Edge-LLM: una caché local al proceso y direccionada
  por contenido para prefijos de entrada repetidos, de modo que el estado de
  prefill de documentos, turnos anteriores, continuaciones generadas y
  prefijos de imagen repetidos se reutiliza en lugar de recalcularse.
- Un archivo de modelo que cabe puede fallar igualmente: un informe de la
  comunidad muestra archivos GGUF de 7.4 GB y 16 GB fallando con un error de
  asignación de caché KV en una placa de 8 GB — sume la caché KV y la
  sobrecarga del entorno de ejecución al comprobar si algo cabe.
- La **reducción de vocabulario** (generación restringida a un subconjunto de
  tokens específico de la tarea) y la **poda de tokens visuales (DART)** (los
  tokens visuales duplicados se descartan antes del prefill) son páginas de
  características documentadas de Edge-LLM. La compilación del motor visual
  también acepta límites de tokens de imagen: `--minImageTokens`,
  `--maxImageTokens`, `--maxImageTokensPerImage`.

> **Importante:** la caché KV FP8 — el ahorro de memoria de caché KV de ~50%
> — requiere SM89 o superior (Ada Lovelace y posteriores). Orin es SM87, así
> que **no está disponible en este kit**. Use caché KV FP16.

### Un antes/después del fabricante

El caso práctico de 8 GB de NVIDIA (blog de eficiencia de memoria, tabla 7):
modo headless en lugar del escritorio GNOME completo (1.8 GB → 1.1 GB) más un
VLM GGUF de 4 bits (Q4_K_M, 6.6 GB → 2.2 GB). El pipeline no se ejecutaba en
Orin Nano 8 GB antes (solo el VLM usaba el 87% de la RAM) y ahora se ejecuta
con **4.5 / 7.6 GB (~60%)** — más de 5.1 GB ahorrados. La columna del «antes»
es de **Orin NX 16 GB**: las mismas optimizaciones trasladaron la carga al kit
de 8 GB.

## Palanca 3 — Capa de medición: vea adónde va la memoria

| Herramienta | Qué muestra | Nota |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, memoria, temperatura, potencia | La guía del usuario del kit de desarrollo: nvidia-smi no es la herramienta principal de monitorización en Jetson |
| `nvidia-smi dmon` | Uso de la GPU | Según la nota de la versión 5406663; el uso de GPU en la Jetson Power GUI «sigue en evaluación» |
| `free -h` | La vista de la memoria del SO | No indica qué puede asignar una carga de trabajo de GPU |
| procrank | Memoria física por proceso (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| clientes nvmap | Procesos que retienen búferes de GPU/multimedia | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### La «memoria libre» no es el presupuesto

`free -h` muestra la vista abierta del sistema; las asignaciones de GPU
provienen del mismo pool con una contabilidad aparte. En un informe de la
comunidad sobre una placa de 8 GB, `cudaMalloc` falló para la caché KV
mientras `free -h` aún mostraba 5.7 GiB «libres» [grado B, informe de la
comunidad]. Juzgue si algo cabe contra el presupuesto de ~7.6 GB, no contra
la cifra de «libre».

### Método

1. Confirme primero lo básico de la plataforma — [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system).
2. Registre una línea base: memoria en reposo y después bajo carga (`tegrastats`).
3. Cambie una palanca y mida de nuevo. Si nada se movió, revierta.

## Por dónde empezar

Según el tamaño documentado del ahorro:

1. **Entorno de ejecución y cuantización** — la capa más grande en el resumen
   de NVIDIA (unos 5–10 GB por los frameworks de inferencia y la cuantización
   de modelos, según la tabla 5 del blog).
2. **Headless** — hasta ~865 MB, un solo comando.
3. **Ajuste de pipelines** — hasta ~412 MB (estilo DeepStream).
4. **Swap en NVMe** — alivio de presión, no un ahorro.
5. **Carveouts y SWIOTLB** — unos 100 MB y 4 MB, y un reflasheo. Último.

Si un modelo sigue sin caber, el problema es el modelo, no los ajustes: use
uno más pequeño, cuantice más, acorte el contexto o reduzca el batch — consulte
[Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm) y las [Preguntas frecuentes](/es/tutorials/jetson-orin-nano/faq).

## Fuentes

- [Blog técnico de NVIDIA — Maximizar la eficiencia de memoria para ejecutar modelos más grandes en NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (presupuesto de 7.6 GB, escritorio 865 MB, red/journaling 32 MB, carveouts, SWIOTLB, ahorros de pipeline, tablas de cuantización y de antes/después, pasos de instalación de procrank y clientes nvmap; consultado el 2026-09-26)
- Documentación de TensorRT Edge-LLM: [Modelos compatibles](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [Caché KV FP8](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Benchmarks de rendimiento](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Guía de inicio rápido](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · páginas de características: [reutilización de la caché KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [reducción de vocabulario](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [poda de tokens visuales (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (consultado el 2026-09-26)
- Documentación de Jetson Linux: [notas de la versión r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (problemas 5661165, 5699079, 5406663) · [Alimentación y rendimiento, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Guía práctica del kit de desarrollo](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (consultado el 2026-09-26)
- Jetson AI Lab: [tutorial de TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [optimización de RAM](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (límites de compilación para Orin Nano; swap en NVMe; consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — Ollama en Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (comunidad: free -h frente a cudaMalloc; grado B; consultado el 2026-09-26)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
