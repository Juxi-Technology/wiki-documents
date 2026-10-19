---
title: "07 · Preguntas frecuentes y experiencias"
description: "Problemas realmente encontrados en este flujo, para consulta rápida por síntoma."
---

# 07 · Preguntas frecuentes y experiencias

Problemas realmente encontrados en este flujo, para consulta rápida por síntoma.

## Entorno

| Síntoma | Causa y solución |
| --- | --- |
| `uv sync` muestra `failed to persist temporary file ... os error 17（跨盘）` | Caso especial de Windows en esta máquina: el directorio de caché de uv cruza discos. Antepón `export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'` a todos los comandos uv |
| La consola muestra decenas de líneas de fallo al cargar `libtorchcodec_core*.dll` | Advertencia ruidosa: al fallar torchcodec se recurre automáticamente a **pyav**. Medido (smoke [5]): pyav **codifica y decodifica correctamente datasets de vídeo**; ni los datasets de estado ni los de vídeo se ven afectados |
| `python` abre Microsoft Store | Usa la Python gestionada por uv; no uses la versión de Store |
| `lerobot-train` informa `accelerate is required but not installed` | Faltó el extra `training` en la instalación inicial; añade `--extra training` al comando `uv sync` de [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment) y vuelve a intentarlo (la instalación única del 01 ya lo incluye; si sigues el 01 no ocurre) |

## Teleoperación

| Síntoma | Causa y solución |
| --- | --- |
| El control por teclado "va muy lento" | `--teleop.rate` vale 60 unidades/s por defecto, demasiado conservador; con **150** la sensación es normal (recorrido completo en unos 1.3s) |
| El log de arranque se llena de WARNING `clamped to be safe` | Salida normal del limitador de velocidad mientras alcanza el objetivo; se detiene al llegar |
| Con el brazo líder centrado, el brazo simulado se desvía unos grados | Desviación fija causada por la asimetría del rango de calibración; usa el ajuste automático de `so101_leader_trim` ([05](/es/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)) |
| El brazo se mueve de repente al conectar | Es el comportamiento diseñado: en el robot real aplica torque y se mueve hacia el punto medio/pose del brazo líder; deja espacio alrededor |
| Tras salir con Ctrl-C el brazo se vuelve blando y cae | Normal: al desconectar se desactiva el torque; sujétalo con la mano |
| Escribir durante la teleoperación/grabación acciona el brazo | La escucha de teclado es **global y no consume las pulsaciones**: pulsar teclas mapeadas (incluidas letras de entrada) en cualquier ventana entra en la cola de teclas. No escribas durante la teleoperación/grabación en modo teclado; el modo brazo líder no tiene este problema |

## Grabación

| Síntoma | Causa y solución |
| --- | --- |
| Tras salir con `q`, las letras pulsadas durante la sesión "se vuelcan de golpe en la línea de comandos" | Eco acumulado del búfer de entrada de la consola de Windows; el lanzador ya incorpora la limpieza `drain_pending_keys()` (solo ocurre en sesiones antiguas) |
| El action span de un episodio es todo 0 | Grabación vacía (nadie se movió): muévete un poco antes de grabar o borra el episodio después |
| Error grande durante el primer segundo del episodio | Segmento de convergencia: al empezar a grabar el brazo seguidor aún está en la pose inicial y el líder ya está en otro sitio; coloca el brazo líder cerca del punto medio de antemano para evitarlo |
| Tras configurar `--dataset.root` como directorio padre, el dataset "desaparece" | **root es el propio directorio del dataset**; usa un root nuevo para cada grabación |
| Diferencia entre `Esc` y `q` | `q` solo detiene la grabación; `Esc` además desconecta la teleoperación por teclado. Ambos cierran limpiamente (ya corregido), pero acostúmbrate a `q` |
| Al guardar, `ValueError: You must add one or several frames...` y el proceso termina con el error | Se pulsó `→`/`n` de más en el **intervalo** entre episodios (lo más común: el guardado + la codificación de vídeo dual se detiene decenas de segundos, la consola parece colgada y se pulsa varias veces por impulso); el flag queda retenido y se consume al inicio del episodio siguiente → **episodio vacío de 0 fotogramas**; upstream falla al guardar un episodio vacío (borde conocido de lerobot). **Los episodios ya guardados no se ven afectados y los datos están intactos**; reabre la sesión y continúa grabando. **Protección añadida** (2026-10-16): `record.py` limpia al inicio de cada episodio los flags `→`/`←` retenidos del intervalo (las teclas durante la grabación siguen funcionando); antes de guardar imprime el aviso `saving the episode + encoding videos now...`; prueba de regresión `smoke_test.py` [7] |
| En el instante de empezar a grabar, `KeyError: 'wrist'` (datasets con imagen) | El primer fotograma de la cámara aún no se había renderizado cuando el bucle de grabación leyó la observación; **corregido** (2026-10-16): ahora el `connect()` del plugin del robot espera a que el primer fotograma esté listo antes de continuar |
| Un script con vídeo falla con `BrokenProcessPool` / `Invalid argument: '<stdin>'` | La codificación de vídeo usa un **pool de multiprocesos** y los procesos hijos reimportan el módulo de entrada mediante la ruta de archivo; ejecutar el script de grabación con `python - <<EOF` (stdin) hace que falle. Guarda el script como un archivo `.py` real y ejecútalo (el punto de entrada real `record.py` no se ve afectado) |
| Al guardar un episodio, `SvtMalloc[fatal]: allocate memory failed ... av.error.MemoryError: [Errno 12] ... 'avcodec_open2(libsvtav1)'` y toda la sesión termina | El codificador predeterminado upstream **libsvtav1** falla en una asignación grande de memoria de una vez cuando se abren simultáneamente las dos codificaciones de las dos cámaras (wrist+top) (más probable con la simulación y las ventanas de vista previa ocupando memoria; medido el 2026-10-16). **Corregido**: `record.py` inyecta por defecto `--dataset.rgb_encoder.vcodec=h264` (la codificación dual h264 concurrente está validada; pasar vcodec explícitamente lo sobrescribe). Los episodios ya guardados están intactos; la caída puede dejar `tmp*/` y parquet huérfanos en el directorio del dataset (límpialo como en run2) |
| La imagen se atasca durante la grabación (sobre todo tras pulsar `→`), pero la operación en realidad no tiene latencia | Lo que se atasca es la **ventana de guardado/codificación**: los procesos de codificación usan toda la CPU por defecto (dos vídeos concurrentes), mientras el hilo de simulación sigue renderizando 5 imágenes (más notorio con gráfica integrada). El bucle de control no se ve afectado: fíjate en las cifras de cadence (medido: 29.97Hz en todo el recorrido, 0 ticks fuera de presupuesto). **Mitigado** (2026-10-16): `record.py` usa por defecto `--dataset.encoder_threads=2` (máximo 2 hilos por codificación); las ventanas de vista previa de las cámaras bajan a 15Hz (`--robot.preview_fps`). Cuanto más corto es el episodio, mayor es la proporción de la ventana de guardado y más se nota el atasco; para eliminar del todo la pausa puede usarse `--dataset.streaming_encoding=true` (codificación durante la grabación, recomendado upstream, pendiente de medición) |
| Al guardar un episodio el codificador informa **fallo de asignación de memoria** y toda la sesión termina (el `SvtMalloc` de svtav1, el `malloc ... failed` de x264 y los errores de `avcodec_open2` entran en esta categoría) | La memoria comprometida (commit) del sistema en esta máquina lleva mucho tiempo cerca del límite (medido el 2026-10-16: **105.9GB / 119.7GB**, con 29 días de funcionamiento continuo). Cada guardado lanza 2 procesos de codificación (cada uno carga torch/av, con un pico de commit grande); iniciarlos de forma concurrente justo en el límite hace que todo falle. **Mitigado**: `record.py` ahora añade a la codificación un **reintento automático único tras fallo** (un fallo transitorio ya no pierde el episodio), y también se ha silenciado el spam de logs durante el guardado (`av.logging.set_libav_level` + barra de progreso de HF). **Solución de raíz = reiniciar la máquina** (limpiar el commit acumulado/fugas del kernel; los procesos de usuario solo ocupan 27GB, el resto está en el kernel/drivers y no se puede matar); autodiagnóstico: `Get-Counter '\Memory\Committed Bytes'` vs `'\Memory\Commit Limit'` |

## Hardware

| Síntoma | Causa y solución |
| --- | --- |
| El número de COM es distinto al de la última vez | El número de puerto serie cambia al conectar/desconectar o cambiar de puerto; enumera los puertos antes de cada conexión ([03](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)) |
| La comprobación de solo lectura indica que falta un servo | Problema de cableado/alimentación; revisa primero la placa controladora y el orden de los cables, no te apresures a calibrar |
| La dirección de `shoulder_lift` es contraria a la intuición (simulación) | La dirección positiva de ese modelo apunta hacia abajo; verifica el signo antes de mapear ([02](/es/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification)) |

## Notas de diseño (por qué se hace así)

- **MuJoCo reescribe los datos de vértices de la malla**: tras cargar un `<mesh>`, `mjModel.mesh_vert` almacena los vértices en el **sistema de coordenadas propio de la malla**
  (el origen se recoloca en el centro de masa de los vértices y los ejes se reordenan), ya no son las coordenadas originales del archivo; usarlo directamente para calcular la caja delimitadora o encajar dimensiones de CAD da
  resultados erróneos (la visualización no se ve afectada). Para obtener la geometría real del CAD, parsea el archivo original (como se hace en `preview_mount.py` /
  `step_to_stl.py`). Ya nos pasó una vez: las dimensiones reales del soporte son 54.3 × 35.0 × 75.0 mm.
- **La dirección de visión de la cámara de MuJoCo es el −Z de su sistema de coordenadas**: el elemento `<camera>` no mira hacia su propio +Z (la dirección en la que sobresale la lente). La primera versión
  del módulo de cámara construyó la lente en +Z y el elemento con orientación identity → la imagen miraba en realidad "hacia atrás" desde el reverso de la PCB, con **la dirección de la lente y la de la imagen
  exactamente invertidas** (la raíz de que "la dirección de giro no coincidiera con la imagen" al ajustar parámetros; localizado el 2026-10-16 con una prueba de renderizado comparando placas roja/azul).
  Corrección: el elemento de cámara gira 180° alrededor de Y (`view.quat = RPY(0,180,0)`, de forma unificada en preview_mount / adjust_camera / el plugin del robot);
  `adjust_camera.py` añade una ventana de imagen en tiempo real "sim_cam live view", para ajustar la lente viendo el resultado al instante.
- **La pinza de los MJCF del tutorial oficial es una pinza "tipo pico de ave" de contacto puntual**: las dos puntas de los dientes cierran hasta un contacto puntual de ~2.3 mm y casi no tienen superficie de agarre utilizable.
  Experimentos de física del sistema (2026-10-16, cientos de configuraciones) concluyen: colocado el cubo en cualquier posición cerca de la boca de los dientes, es empujado/cuñado fuera durante el barrido de cierre de unos 100°, sin poder levantarlo (también con cubos de 16–34 mm; el recorrido mecánico y el par son normales). **Está prohibido corregirlo con "piezas de colisión" añadidas**: se probó a añadir placas dentadas a las dos pinzas (mejoraba notablemente el agarre), pero era geometría inexistente en el robot real; las políticas entrenadas dependerían de ella y causarían distorsión sim2real, así que se retiró. La solución correcta es **sustituir las pinzas del modelo oficial por la geometría de pinza del robot real** (por ejemplo la SO-ARM101 de menagerie o una reconstrucción del CAD propio), manteniendo los parámetros físicos coherentes con el robot real.
- **Los parámetros de contacto predeterminados oficiales son demasiado "blandos" y provocan penetración física**: la constante de tiempo `solref` es 20 ms por defecto; los contactos rápidos/finos
  (un cubo cayendo sobre una cara fina de la pinza, el barrido de cierre) se atraviesan mutuamente "antes de que dé tiempo a generar fuerza"; el síntoma es que "el cubo atraviesa la cara de la pinza y cae".
  Corrección (2026-10-16): endurecer los parámetros de contacto; `harden_mesh_contacts` endurece tras compilar el `solref` de todos los cuerpos de colisión de malla
  al mismo valor que las caras dentadas de menagerie (0.01 s), y aplica el mismo tratamiento al contacto de los cubos. Es una corrección pura de fidelidad física, sin añadir geometría.
- **El robot simulado se ha migrado al modelo SO-ARM100 de mujoco_menagerie** (2026-10-16): el MJCF del zip del tutorial original era
  una pieza de demostración cinemática y su pinza no podía agarrar; el modelo de menagerie se basa en el CAD del robot real: la pinza tiene superficies de colisión dentadas dedicadas y parámetros de contacto duros,
  y se verificó que en las cuatro posiciones de diente (de superficial a profunda) puede detener, agarrar y levantar un cubo de 34mm. Puntos clave de la migración: el modelo está vendorizado en
  `assets/menagerie_so_arm100/` (Apache-2.0, con LICENSE); el mapeo de articulaciones y los signos de unidades están en `MODEL_JOINT`
  (contrastado articulación por articulación con las mediciones de movimiento en coordenadas globales del modelo antiguo; el signo de wrist_roll queda pendiente de revisión con teleoperación en el robot real); la Base del modelo gira +90° alrededor de Z para que su
  frente de trabajo mire hacia +x; el soporte se reengancha al lateral de Fixed_Jaw (servo n.º 6) (primero localizado por búsqueda analítica; el 2026-10-16 el usuario lo ajustó manualmente
  hasta la versión final con `adjust_mount.py --model menagerie` comparando fotos del robot real: `[0.1, -0.7, 24.7]mm`, `RPY [0.34, -27.20, 89.51]°`). El modelo y las herramientas del tutorial antiguo se conservan sin tocar, para comparar cuando se quiera.
- **Por qué usar el entorno de proyecto de uv y no conda**: `.venv` está en el mismo directorio que el proyecto, las versiones quedan bloqueadas por `uv.lock` y borrar el directorio lo libera todo,
  y está completamente aislado del entorno conda de la máquina; `uv run` nunca instala nada en el conda activado. El entorno conda `lerobot` de esta máquina
  apunta a **otra copia del repositorio** (`lerobot-main`); ambos no se interfieren.
- **Por qué todos los plugins están en `examples/so101_mujoco/`**: se integran mediante el mecanismo oficial de registro (`register_subclass`),
  **sin modificar el código fuente de lerobot**; para actualizar upstream solo hay que volver a sincronizar.

<RelatedProducts slugs="so-arm101" />
