---
title: IA agéntica — NemoClaw en el Orin Nano de 8 GB
sidebar_label: IA agéntica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Instale y ejecute NVIDIA NemoClaw, la pila de agentes siempre activos, en
  el kit de desarrollo Jetson Orin Nano Super de 8 GB — instalación oficial,
  expectativas honestas para 8 GB y notas de seguridad.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# IA agéntica — NemoClaw en el Orin Nano de 8 GB

Su kit puede ejecutar NVIDIA NemoClaw, un agente autónomo siempre activo,
instalado con un solo comando. Esta página cubre qué es NemoClaw, la
instalación oficial, las habilidades de agente que lo rodean, expectativas
honestas para 8 GB y las decisiones de seguridad que exige.

## Qué es NemoClaw

NVIDIA describe NemoClaw como «una colección de blueprints abiertos para
construir agentes autónomos» — sistemas de IA siempre activos que razonan,
planifican y actúan en flujos de trabajo del mundo real. Empaqueta harnesses
de agentes (OpenClaw, Hermes, LangChain Deep Agents) con componentes del
NVIDIA Agent Toolkit: modelos Nemotron, NeMo y los controles de políticas en
tiempo de ejecución de OpenShell.

OpenShell es la capa de seguridad: «el entorno de ejecución seguro en su
interior que impone a qué puede acceder el agente: archivos, redes,
credenciales y herramientas».

NemoClaw es software alpha — NVIDIA lo etiqueta como «vista previa temprana»
(desde el 2026-03-16). Página del producto: <https://www.nvidia.com/en-us/ai/nemoclaw> · Centro Build-a-Claw: <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Instalación — el comando único oficial

En el kit, ejecute el instalador de NVIDIA:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Esto instala el harness predeterminado, **OpenClaw**. Otros dos pueden
seleccionarse con una variable de entorno:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

En este kit, el instalador detecta automáticamente Jetson (Orin y Thor) y
aplica primero la configuración de host de JetPack; en L4T 39.x carga el
módulo `br_netfilter` solo si falta (sin él, el sandbox falla la resolución
DNS y la incorporación se queda colgada en "Setting up OpenClaw inside
sandbox"). Si selecciona Ollama, el instalador también lo instala: «El script
también instala ollama (si se selecciona ollama), así que no necesita
instalarlo manualmente primero» (personal de NVIDIA). El sitio de NVIDIA
documenta este dispositivo: «Instale OpenClaw en su NVIDIA Jetson Orin Nano»
— «un asistente personal de IA totalmente local en Jetson … sin necesidad de
API en la nube».

> **Importante** — la matriz de compatibilidad de plataformas de NemoClaw
> (v1.1, 2026-09-04) no tiene fila para Jetson; sus plataformas probadas son
> Linux (Ubuntu 24.04) y DGX OS Spark. La compatibilidad con el Orin Nano es
> real en la práctica — el instalador detecta la placa y NVIDIA documenta el
> flujo — pero no está publicada como compatibilidad formal, así que espere
> asperezas.

Requisitos que importan aquí (de la página de requisitos previos de NemoClaw
de NVIDIA):

| Requisito | Mínimo / recomendado | En este kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB en total — en el mínimo |
| Disco libre | 20 GB | Sin almacenamiento integrado; use microSD o NVMe ([Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | Instalar por separado |
| Entorno de ejecución de contenedores | Docker Engine / Desktop / Colima | Corrección del socket: `sudo usermod -aG docker $USER` y después `newgrp docker` |

## Después de la instalación — primera sesión

El personal de NVIDIA remite al [recorrido de Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (guía del proveedor) para el flujo del Orin:

1. `curl -fsSL https://ollama.com/install.sh | sh` — o sáltelo; el instalador de NemoClaw también puede instalar Ollama.
2. Descargue un modelo de llamada a herramientas de la clase 4B, como Nemotron3 Nano 4B (el ejemplo `nemotron-3-nano:30b` de la guía apunta a dispositivos mayores).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Incorpore: seleccione Ollama como fuente del modelo y elija el nivel de política de sandbox más estricto que funcione.
5. `source ~/.bashrc` y después `nemoclaw my-assistant connect`; inicie el agente con `openclaw tui`.

## Habilidades de agente

NVIDIA también distribuye **habilidades de agente** (agent skills) — flujos
de trabajo empaquetados en el formato abierto Agent Skills que amplían
asistentes de programación con IA (Claude Code, Cursor, Codex) con
automatización específica del dispositivo. Hay dos dominios documentados para
esta era:

- **IA física (robótica).** Isaac ROS distribuye un catálogo de habilidades de
  agente — según NVIDIA, tareas como activar el contenedor de desarrollo de
  Isaac ROS y levantar la pila en la nube Mission Control. El catálogo está en
  <https://github.com/nvidia/skills> (la categoría «Physical AI»), y se instala
  con `npx` (Node.js no forma parte del entorno estándar de Isaac ROS). Isaac
  ROS 5.0 añade una CLI `isaac-ros-activate` y una habilidad de acceso
  anticipado `migrate-node-to-rosidl-buffer`. Consulte [Robótica](/es/tutorials/jetson-orin-nano/robotics).
- **Pipelines de video.** Las notas de la versión de L4T r39.2.1 incluyen
  «habilidades de agente para pipelines de video» entre las novedades.

Una carencia honesta: las fuentes de esta página documentan habilidades de
agente de NVIDIA para Isaac ROS (IA física) y para pipelines de video; ninguna
documenta un catálogo de habilidades específico de NemoClaw.

## Expectativas realistas para 8 GB

Un agente siempre activo, un modelo local y el escritorio de Ubuntu no caben
cómodamente en este kit al mismo tiempo. El presupuesto documentado:

- **La memoria utilizable es de ~7.6 GB, no 8 GB.** NVIDIA: «de los 8 GB de
  DRAM física, unos 7.6 GB son utilizables tras las reservas del firmware y
  del kernel».
- **Los 8 GB son el mínimo de NemoClaw, no una zona de confort.** Los
  requisitos previos indican 8 GB como mínimo y 16 GB como recomendado: «En
  máquinas con menos de 8 GB de RAM, este uso combinado puede activar el OOM
  killer. Si no puede añadir memoria, configure al menos 8 GB de swap para
  sortear el problema a costa de un rendimiento más lento». La memoria de este
  kit es fija — planifique el archivo de swap ([Eficiencia de memoria](/es/tutorials/jetson-orin-nano/memory-efficiency)).
  El push de la imagen de sandbox de ~2.4 GB ya ha activado el OOM en un Orin
  Nano de 8 GB.
- **El agente y el escritorio consumen memoria antes de que cargue el
  modelo.** Una guía de la comunidad en los foros de NVIDIA sitúa el entorno
  de ejecución de OpenClaw en hasta ~1 GB; desactivar el escritorio gráfico
  libera hasta ~865 MB (cifra de NVIDIA), y una medición de la comunidad sitúa
  GNOME por encima de 600 MB.
- **El fallo por modelo sobredimensionado está documentado en un informe de
  la comunidad en los foros de NVIDIA.** Ollama en una placa de 8 GB no pudo
  cargar un modelo de 7.4 GB ni otro de 16 GB: `cudaMalloc failed: out of
  memory ... failed to allocate buffer for kv cache`. El tamaño de archivo por
  sí solo no es la prueba — la caché KV debe caber en esos mismos 8 GB.

Qué cabe, según las fuentes: los valores predeterminados validados de Ollama
de NVIDIA (`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) están
dimensionados para máquinas mayores; la guía de Jetson AI Lab dice que se
empiece con un modelo de llamada a herramientas de la clase 4B — «Puede
funcionar, pero espere un rendimiento inferior al de los modelos de la clase
30B»; y el blog de memoria de NVIDIA sitúa el margen ajustado de 4 bits en
LLM de hasta ~10B y VLM de hasta ~4B parámetros — un techo para una
configuración dedicada, no un presupuesto que además sostenga un escritorio y
un agente.

NVIDIA no publica cifras de tokens por segundo para Ollama en este
dispositivo; trate con cautela las afirmaciones de velocidad externas (consulte
[Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm)).

> **Nota de Juxi:** para una configuración siempre activa viable aquí,
> planifique el modo headless, un modelo cuantizado de la clase 4B y
> almacenamiento NVMe para el requisito de 20 GB y el archivo de swap. Eso es
> lo que respaldan las fuentes; cualquier cosa mayor no está verificada.

## Notas sobre Ollama y agentes — confirmadas por personal de NVIDIA

El personal de NVIDIA depuró el flujo Orin Nano + JetPack 7.2 + Ollama en sus
foros de desarrolladores y volvió a verificar Ollama en JetPack 7.2.1 en
septiembre de 2026.

- **Compruebe primero la GPU.** `ollama ps` debería mostrar `100% GPU` en la
  columna PROCESSOR; si muestra CPU, el agente irá muy lento.
- **Fallo documentado (junio de 2026).** Con NemoClaw + Ollama en un Orin Nano
  recién flasheado con JetPack 7.2, `openclaw tui` se abría pero nunca
  respondía ("Autocompaction could not recover this turn"). NVIDIA lo
  reprodujo: Ollama se había saltado el descubrimiento de GPU (fallback a
  CPU), y la ventana de contexto del sandbox era de solo 4096 tokens. La
  corrección del personal escribió estas líneas en
  `/etc/systemd/system/ollama.service.d/override.conf`:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  y después `sudo systemctl daemon-reload && sudo systemctl restart ollama`;
  dentro del sandbox (`nemoclaw my-assistant connect`), se elevó
  `contextWindow` a 32768 en `.openclaw/openclaw.json` y se refrescó el hash
  de configuración. El autor del informe confirmó que Ollama pasó entonces a
  ejecutarse en la GPU.
- **Estado actual: esta solución alternativa no debería ser necesaria.** El
  personal de NVIDIA, a mediados de 2026: «el problema está corregido en la
  última versión de ollama. La solución alternativa (override.conf) ya no es
  necesaria». En JetPack 7.2.1 el instalador upstream funciona y `ollama ps`
  informa de 100% GPU; la línea "WARNING: Unsupported JetPack version
  detected" es inofensiva. Pruebe primero la instalación estándar.
- **Si Ollama sigue recurriendo a la CPU:** actualice Ollama primero. Un
  usuario del foro solucionó un fallback persistente eliminando el directorio
  obsoleto `/usr/local/lib/ollama/cuda_v12` (eliminación confirmada por el
  personal). Conserve override.conf como último recurso — es lo que NVIDIA usó
  con éxito en este mismo kit.

## Seguridad para agentes siempre activos

Un agente siempre activo es un programa con credenciales y acceso a
herramientas que sigue trabajando mientras usted no mira. En un dispositivo
que guarda sus datos, eso es un riesgo real: un agente con acceso a
herramientas y al shell aquí puede leer, cambiar o enviar cualquier cosa que
esté a su alcance.

**Use la capa de políticas.** NVIDIA describe OpenShell como «el entorno de
ejecución seguro en su interior que impone a qué puede acceder el agente:
archivos, redes, credenciales y herramientas». Durante la incorporación, elija
el nivel de política de sandbox más estricto que siga haciendo el trabajo (el
recorrido de Jetson AI Lab aconseja el nivel más estricto).

**Credenciales.** Dé al agente credenciales con alcance limitado y revocables
— claves y cuentas dedicadas, nunca las personales. Todo lo que el agente
pueda leer, lo puede copiar; todo lo que pueda usar, se le puede inducir a
usarlo. Las integraciones de mensajería actúan con su identidad: la página del
Orin Nano de NVIDIA muestra un ejemplo de OpenClaw + WhatsApp, así que use una
cuenta o un número dedicados.

**Exposición de red.** Mantenga los servicios locales en localhost — la
configuración del personal de NVIDIA para Ollama aquí lo enlaza a `127.0.0.1`
(`OLLAMA_HOST=127.0.0.1:11434`). No exponga paneles de agente, API de control
ni servidores de modelos a internet abierto; para acceso remoto, use un túnel
o una VPN que controle. La instalación necesita Docker (Engine/Desktop/Colima,
según los requisitos anteriores), además de un clúster de contenedores en
sandbox (la puerta de enlace de OpenShell ejecuta k3s internamente) y acceso
sudo.

**Hábitos de operación.** Empiece con supervisión — observe lo que hace el
agente antes de dejarlo desatendido. No le dé acceso que no pueda revocar o
deshacer, y mantenga copias de seguridad y una ruta de recuperación (consulte
[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)). NemoClaw es
software alpha («vista previa temprana»); trate el sandbox como una capa entre
varias, no como la única.

> **Atención** — como esta pila se ejecuta localmente («sin necesidad de API
> en la nube»), el límite de seguridad es su dispositivo, su red y sus
> credenciales. Revise los tres antes de dejar un agente en ejecución.

## Fuentes

- [Página del producto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (consultado el 2026-09-26) — definición, harnesses, comandos de instalación, OpenShell.
- [Centro de recursos Build-a-Claw de NVIDIA](https://www.nvidia.com/en-us/ai/build-a-claw/) (consultado el 2026-09-26) — sección de instalación para el Orin Nano.
- [NemoClaw — requisitos previos](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) y [compatibilidad de plataformas](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (consultado el 2026-09-26)
- [NemoClaw — solución de problemas (configuración del host Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — NemoClaw en Jetson Orin Super con JetPack 7.2 (corrección del personal de NVIDIA)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — Ollama en Jetson (verificado por personal de NVIDIA)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) y [aceleración GPU en JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (consultado el 2026-09-26)
- [Blog técnico de NVIDIA — Maximizar la eficiencia de memoria en NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — modelos de IA que funcionan en Orin Nano Super 8GB (guía de la comunidad)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (consultado el 2026-09-26)
- [Jetson AI Lab — tutorial de NemoClaw (guía del proveedor)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (consultado el 2026-09-26)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) y [notas de la versión](https://nvidia-isaac-ros.github.io/releases/index.html) (consultado el 2026-09-26)
- [Notas de la versión de Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (consultado el 2026-09-26) — la novedad «habilidades de agente para pipelines de video».

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA, publicaciones del foro de desarrolladores de NVIDIA y la
guía del proveedor de Jetson AI Lab, en las fechas indicadas; aún no
verificado en hardware físico por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
