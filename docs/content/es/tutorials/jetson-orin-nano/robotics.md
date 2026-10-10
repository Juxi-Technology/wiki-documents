---
title: Robótica en JetPack 7.2 — qué funciona en el Orin Nano
sidebar_label: Robótica (estado actual)
slug: /tutorials/robotics
description: >-
  Una página de estado honesta sobre la robótica en el kit de desarrollo
  Jetson Orin Nano Super (8GB) con JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac
  Sim, pilas estilo LeRobot y aquello con lo que aún conviene no planificar.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# Robótica en JetPack 7.2 — qué funciona en el Orin Nano

JetPack 7.2 llevó este kit a una nueva generación de plataforma: Ubuntu 24.04,
CUDA 13 y el techo de memoria de 8 GB que condiciona toda carga de trabajo de
IA. El ecosistema de robótica todavía se está poniendo al día con ese cambio.
Hay piezas que funcionan hoy. Otras no. Y otras no pueden verificarse aún
desde ninguna página oficial.

Esta página es una página de estado, no un tutorial. Todo lo que figura aquí
está verificado solo documentalmente — Juxi no ha probado estas pilas en
hardware. Compruebe la fecha de cualquier página de robótica que lea: varias
partes de este ecosistema cambiaron en agosto y septiembre de 2026. En el
diagrama siguiente, el bloque grande de la derecha se ejecuta en el kit; Isaac
Sim e Isaac Lab están en el bloque de Omniverse de la izquierda, que es un
host aparte.

![Pila de software de NVIDIA Jetson, con los hosts DGX y Omniverse a la izquierda](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Tabla de estado (consultado el 2026-09-26)

| Qué necesita | Estado en JetPack 7.2.1 / Orin Nano (8GB) | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | JetPack no instala ni requiere ninguna distribución de ROS. ROS 2 **Jazzy** tiene paquetes arm64 oficiales para Ubuntu 24.04. Una respuesta de un empleado de NVIDIA en el foro (2026-09-07) llama a Jazzy «la distribución de ROS recomendada para JetPack 7.2.1». Las respuestas del foro no son documentación oficial. Pasos de instalación más abajo. |
| **Isaac ROS** (ROS 2 acelerado por hardware) | ⚠️ Lanzado en agosto de 2026 — con carencias reales | Notas de la versión 4.6.0 de Isaac ROS: «Se añadió compatibilidad con Jetson Orin» y «Se añadió compatibilidad con JetPack 7.2». El Orin Nano Super 8GB aparece en la tabla oficial de benchmarks de NVIDIA. Pero los recorridos paso a paso no tienen sección para el Orin Nano, la tabla de compatibilidad espera un SSD NVMe y la página de JetPack de NVIDIA sigue diciendo «próximamente». Detalles más abajo. |
| **Isaac Sim / Isaac Lab** (simulación) | ⛔ No se ejecuta en este kit | Necesita un host x86_64 con una GPU RTX (mínimo GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM). Las GPU sin núcleos RT no son compatibles. Las compilaciones aarch64 existen solo para DGX Spark. En los flujos de trabajo de simulación, el simulador se ejecuta en la máquina x86_64, no en el Jetson. |
| **GR00T (modelos fundacionales humanoides)** | ⛔ No en este kit | El post-entrenamiento de GR00T 1.7 necesita una GPU con al menos 48 GB de VRAM. El flujo de trabajo de referencia de NVIDIA usa un Jetson AGX Thor como ordenador perimetral del robot real. Ese mismo flujo convierte datos de demostración al formato LeRobot — la dirección del software encaja, pero el cómputo no vive aquí. |
| **Pilas de Python estilo LeRobot** (SO-ARM101, LeKiwi, vision kit) | ⚠️ Necesita verificación | El mínimo de versión de Python se cumple (Ubuntu 24.04 incluye Python 3.12.3; LeRobot requiere 3.12 o posterior). Pero el proyecto upstream no tiene una ruta oficial para JetPack 7.2, y la ruta documentada para Jetson es mantenida por la comunidad para JetPack 6.2. Pruebe su pila exacta antes de comprometerse. |
| **DeepStream** | — No verificado en esta revisión | Cubierto en su propia página — consulte [Análisis de video con DeepStream](/es/tutorials/jetson-orin-nano/deepstream). Esta revisión de robótica no volvió a comprobar la matriz de compatibilidad de DeepStream. |
| **TensorRT Edge-LLM** | — No verificado en esta revisión | Cubierto en su propia página — consulte [Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm). Relevante para la robótica sobre todo por los modelos estilo VLA. |
| **NemoClaw (pila agéntica)** | ⚠️ Funciona, compatibilidad de facto | El instalador detecta automáticamente dispositivos Jetson (Orin y Thor), y el sitio de NVIDIA promociona «Instale OpenClaw en su NVIDIA Jetson Orin Nano™». Pero la matriz oficial de plataformas no tiene fila para Jetson, y el proyecto es alpha / «vista previa temprana». Los 8 GB son el mínimo de RAM declarado (16 GB recomendados), con un riesgo de falta de memoria documentado. Consulte [IA agéntica](/es/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS en JetPack 7.2 — qué dicen hoy las páginas oficiales

**Las páginas de NVIDIA se contradicen entre sí.** La página de descargas de
JetPack 7.2.1 sigue listando «NVIDIA Isaac™ ROS — Próximamente». Las páginas
del proyecto Isaac ROS dicen que la compatibilidad ya se ha publicado. Para
Isaac ROS en sí, las páginas del proyecto son la fuente más específica, y son
más recientes:

- **Isaac ROS 4.6.0 (2026-08-18)** — notas de la versión: «Se añadió
  compatibilidad con Jetson Orin» y «Se añadió compatibilidad con JetPack
  7.2». Primera versión de la serie 4.x con esa combinación.
- **Plataformas compatibles:** «Las plataformas definidas en esta tabla son
  las únicas combinaciones de hardware y software que Isaac ROS prueba y
  admite oficialmente». La fila de Jetson: «Jetson Thor (T5000 y T4000) y
  Jetson Orin», JetPack 7.2, almacenamiento «128+ GB NVMe SSD». La tabla dice
  «Jetson Orin» (la familia), no «Orin Nano».
- **Benchmarks:** la tabla de rendimiento tiene una columna dedicada «Orin
  Nano Super 8GB» con entradas reales — por ejemplo, AprilTag Node a 720p,
  104 fps, y el grafo Mobile SAM a 720p, 4.80 fps. Son cifras publicadas por
  NVIDIA para este dispositivo, no mediciones de Juxi. Las cargas más pesadas
  muestran un guion («–»): FoundationPose, Grounding DINO y el SAM completo no
  figuran como ejecutables.
- **Isaac ROS 5.0.0 (2026-09-21)** pasó a ROS 2 Lyrical Luth. El repositorio
  apt público de ROS 2 no proporciona paquetes de ROS 2 Lyrical para Ubuntu
  24.04; NVIDIA los publica en su propio CDN de la Buildfarm de Isaac ROS.
  Isaac ROS 4.6 se mantiene en ROS 2 Jazzy. Elija 4.6 para la pila Jazzy
  estándar.

**Carencias que debe conocer antes de comprometerse:**

- **Sin sección de configuración para el Orin Nano.** Los recorridos de Jetson
  cubren solo Jetson AGX Thor y Jetson AGX Orin; el único enlace relevante
  para el Orin Nano es la guía de ajustes de alimentación.
- **Se espera un SSD NVMe.** La columna de almacenamiento dice «128+ GB NVMe
  SSD». Este kit no incluye almacenamiento alguno, así que una configuración
  solo con microSD queda fuera de lo declarado (consulte [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)).
- **Desfase de versiones.** Las páginas de configuración de la 4.6 piden
  confirmar «R39 (release), REVISION: 2.0» (L4T r39.2.0) con
  `cat /etc/nv_tegra_release`; este kit se entrega con JetPack 7.2.1 = L4T
  r39.2.1. Valide en Docker antes de migrar un robot en producción.
- **Cámaras y OpenCV.** Las cámaras Intel RealSense «solo son compatibles en
  modo Docker. Los modos de entorno virtual y bare metal no son compatibles».
  JetPack 7.2 además instala OpenCV 4.8.0, mientras que Isaac ROS está probado
  con 4.6.0 — la solución está en los pasos de instalación de más abajo.
- **Una regresión en la 5.0.** En Isaac ROS 5.0, el codificador de imagen DNN
  puede tener menos rendimiento que en la 4.6. Si ese nodo le importa,
  considere la 4.6.

> **Importante**: si Isaac ROS está en su ruta crítica, sopese el momento.
> La compatibilidad con JetPack 7.2 es real pero nueva (agosto de 2026), y la
> documentación del Orin Nano es escasa. Este kit ya era un objetivo compatible
> de Isaac ROS en la era JetPack 6.2 (Isaac ROS 3.2 Update 1, enero de 2025).
> Un equipo que necesite la combinación más consolidada y no pueda absorber
> los vaivenes de las primeras versiones tiene argumentos para quedarse en una
> configuración de la era JetPack 6.2. Todos los demás: pase a 7.2.1, pero
> valide su pipeline exacto en Docker sobre este kit antes de comprometerse.

## Simulación y entrenamiento — otra máquina

Isaac Sim 6.0 no puede ejecutarse en este kit. Mínimos publicados para la ruta
Linux x86_64: GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM, 50 GB de SSD.
«Las GPU sin núcleos RT (A100, H100) no son compatibles». La compilación
aarch64 «actualmente solo es compatible en sistemas DGX Spark». En los flujos
de simulación de Isaac ROS, «Isaac Sim se ejecuta en una máquina x86_64 que
proporciona datos de sensores e información del mundo» — el Jetson es el
objetivo de despliegue.

En el extremo pesado del aprendizaje robótico la división es la misma: el
post-entrenamiento de GR00T 1.7 necesita al menos 48 GB de VRAM, y el flujo de
trabajo de referencia de NVIDIA usa un Jetson AGX Thor como ordenador
perimetral del robot real. La regla: simule y entrene en un PC, despliegue y
ejecute inferencia en el kit. Si Isaac Sim era su motivo para considerar un
Orin Nano, es la máquina equivocada para ese trabajo.

## LeRobot y las pilas de robótica en Python — la cuestión de compatibilidad

1. **La cuestión de la versión de Python tiene una respuesta clara: la 3.12
   sirve.** El Python del sistema en Ubuntu 24.04 es 3.12.3, y LeRobot (0.6.2)
   requiere Python 3.12 o posterior. La actualización no bloquea LeRobot por
   motivos de versión de Python.
2. **Pero el proyecto upstream no tiene ruta para JetPack 7.2.** La página
   oficial de instalación de LeRobot indica que en Jetson no hay
   decodificación de video acelerada por GPU de forma predeterminada (la
   biblioteca recurre a pyav), que las wheels aarch64 de torchcodec necesitan
   PyTorch 2.11 o posterior, y que su compilación Docker para Jetson apunta a
   **JetPack 6.2** y es mantenida por la comunidad. Ninguna declaración
   oficial dice que el LeRobot actual tenga wheels CUDA aarch64 listas para
   CUDA 13 de JetPack 7.2.
3. **Así que: «necesita verificación» — ni «compatible» ni «roto».** Antes de
   diseñar en torno a LeRobot sobre este kit, pruebe su pila exacta:
   instálela, ejecute una política pequeña y confirme que la inferencia usa la
   GPU.

> **Nota de Juxi:** nuestros kits de robot (SO-ARM101, LeKiwi, vision kit) se
> basan en LeRobot. En este kit con JetPack 7.2.1, todavía no existe una ruta
> probada ni desde el proyecto upstream ni desde Juxi. JetPack 6.2 es la
> plataforma de referencia para la ruta mantenida por la comunidad. Consulte
> con el soporte de Juxi (véase
> [Descargas](/es/tutorials/jetson-orin-nano/downloads)) antes de comprometer un calendario de
> proyecto con LeRobot en este kit.

## Qué funciona hoy

### ROS 2 Jazzy — la base

JetPack no incluye ROS. La ruta que funciona es la instalación oficial de
ROS 2 Jazzy por paquetes deb para Ubuntu 24.04 (arm64), resumida de la
documentación de ROS 2:

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — cuando necesita percepción acelerada

Instale desde el repositorio apt de NVIDIA (la página oficial lista los
comandos exactos del keyring): repositorio
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, canal
`noble-jetpack`; espejo para China `isaac.download.nvidia.cn`. Después:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Elimine una vez el OpenCV 4.8.0 preinstalado (véase la lista de carencias
anterior); Isaac ROS instalará después automáticamente su OpenCV 4.6.0
fijado:

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA recomienda Docker: «Docker es la opción recomendada para la mayoría de
los usuarios. Proporciona el mayor nivel de aislamiento respecto a su sistema
host». Esto también encaja con el requisito de las cámaras RealSense (solo
Docker).

### NemoClaw y la pila agéntica

El instalador detecta automáticamente dispositivos NVIDIA Jetson (Orin y Thor)
y aplica la configuración de host específica de JetPack. Dos advertencias: el
proyecto es alpha («vista previa temprana»), y su matriz oficial de plataformas
no tiene fila para Jetson, así que la compatibilidad es de facto, no una
afirmación oficial. Los 8 GB son el mínimo de RAM declarado (16 GB
recomendados), con un riesgo de falta de memoria documentado en torno a la
imagen de sandbox de unos 2.4 GB. Consulte [IA agéntica](/es/tutorials/jetson-orin-nano/agentic-ai).

## Recomendación

- **Solo ROS 2:** construya hoy sobre JetPack 7.2.1 con ROS 2 Jazzy. Esto
  funciona.
- **Isaac ROS en su ruta crítica:** compatible desde agosto de 2026, pero
  nuevo y con documentación escasa para el Orin Nano. Valide en Docker;
  planifique un NVMe. Si necesita la combinación más consolidada, una
  configuración de la era JetPack 6.2 sigue siendo defendible — consulte la
  [guía de migración](/es/tutorials/jetson-orin-nano/jetpack-6-to-7) para conocer los costes de
  reconstrucción en ambos casos.
- **Necesita simulación o entrenamiento:** presupueste un PC RTX aparte (Isaac
  Sim) y un dispositivo de la clase Thor para el trabajo de la clase GR00T.
  Este kit no puede hacer ninguna de las dos cosas.
- **Basado en LeRobot:** necesita verificación. Pruebe primero; JetPack 6.2 es
  la referencia de la ruta documentada.
- **No compre este kit para:** Isaac Sim, el post-entrenamiento de GR00T o
  cargas en tiempo real de la clase SAM completo / Grounding DINO /
  FoundationPose — las tres últimas no figuran como ejecutables en la tabla de
  benchmarks de NVIDIA para este dispositivo.

## Aún sin aclarar

- **micro-ROS:** no se encontró ninguna página oficial específica para Jetson
  (dos URL oficiales de micro.ros.org devuelven 404 hoy). Considere la
  combinación como no verificada.
- **Distribución de ROS después de Isaac ROS 5.0:** la respuesta del foro que
  recomienda Jazzy es anterior a la 5.0 (2026-09-21); no se encontró ninguna
  declaración posterior a la 5.0.
- **LeRobot en JetPack 7.2:** sin declaración oficial; compruebe la
  disponibilidad de wheels aarch64 de PyTorch para CUDA 13 antes de
  comprometerse.
- **Configuraciones solo con microSD con Isaac ROS:** la tabla de
  compatibilidad dice NVMe, pero esto no se reitera específicamente para el
  Orin Nano.
- **«Jetson Orin» frente a «Orin Nano»:** la tabla de plataformas usa el
  nombre de la familia; «Orin Nano Super 8GB» aparece solo en la tabla de
  benchmarks. No está resuelto si NVIDIA trata ambas como afirmaciones de
  compatibilidad distintas.
- **DeepStream y TensorRT Edge-LLM:** no se volvieron a verificar en esta
  revisión de robótica — consulte sus propias páginas.

## Fuentes

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (plataformas compatibles, Docker, ROS 2 Lyrical; consultado el 2026-09-26)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (emparejamiento con Jazzy, instalación por apt, nota sobre OpenCV; consultado el 2026-09-26)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim en x86_64; consultado el 2026-09-26)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (notas de 4.6.0 y 5.0.0; limitaciones de RealSense y del codificador DNN; consultado el 2026-09-26)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (columna de benchmarks Orin Nano Super 8GB; consultado el 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (paquetes de ROS 2 Lyrical para Ubuntu 24.04; consultado el 2026-09-26)
- [Requisitos de instalación de Isaac Sim 6.0](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (consultado el 2026-09-26)
- [Flujo de trabajo integral de GR00T — requisitos previos](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (consultado el 2026-09-26)
- [Foro de desarrolladores de NVIDIA — «Is ROS2 Jazzy the correct version...» (respuesta de un empleado; foro, no documentación oficial)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (consultado el 2026-09-26)
- [Instalación de ROS 2 Jazzy — paquetes deb (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (consultado el 2026-09-26)
- [Instalación de ROS 2 Jazzy — repositorios apt (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (consultado el 2026-09-26)
- [Guía de instalación de LeRobot (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (consultado el 2026-09-26)
- [pyproject.toml de LeRobot (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (fijaciones de Python y torchcodec; consultado el 2026-09-26)
- [Ubuntu Noble — paquete python3](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; consultado el 2026-09-26)
- [NemoClaw — requisitos previos](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (consultado el 2026-09-26)
- [NemoClaw — matriz de compatibilidad de plataformas](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (fase alpha; sin fila para Jetson; consultado el 2026-09-26)
- [NemoClaw — solución de problemas del instalador (detección automática de Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (consultado el 2026-09-26)
- [NVIDIA — Build a Claw («Install OpenClaw on Your NVIDIA Jetson Orin Nano™»)](https://www.nvidia.com/en-us/ai/build-a-claw/) (consultado el 2026-09-26)
- [Página de descargas de JetPack 7.2.1 (la matriz de componentes lista Isaac ROS como «Coming soon»)](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. La disponibilidad del
ecosistema cambia rápidamente — vuelva a consultar las páginas de NVIDIA y
upstream enlazadas antes de basarse en esta tabla. Aún no verificada en
hardware físico por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
