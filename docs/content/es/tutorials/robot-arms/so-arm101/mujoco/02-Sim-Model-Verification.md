---
title: "02 · Verificación del modelo de simulación (carga y accionamiento de MJCF)"
description: "Tres modelos MJCF públicos del SO-ARM101; en este proyecto se ha verificado que los tres son utilizables:"
---

# 02 · Verificación del modelo de simulación (carga y accionamiento de MJCF)

> Requisito previo: completar [01 Preparación del entorno](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment). Todo este capítulo es verificación en simulación; no hace falta conectar hardware.

## Origen de los modelos

Tres modelos MJCF públicos del SO-ARM101; en este proyecto se ha verificado que los tres son utilizables:

| Abreviatura | Archivo | Origen |
| --- | --- | --- |
| Oficial-calibración nueva | `SO101/so101_new_calib.xml` | Repositorio oficial TheRobotStudio/SO-ARM100 (la verificación comparativa de este tutorial se tomó de ahí; este repositorio no incluye el zip original) |
| Oficial-calibración antigua | `SO101/so101_old_calib.xml` | Mismo repositorio (no está en el zip, hay que descargarlo) |
| Paquete de descripción ROS2 | `so_arm101_description/mjcf/so_arm101.xml` | Adjunto del tutorial en este repositorio `SO-ARM101_ROS2.zip` |

Nota: el flujo de extracción del zip lo proporcionaba la versión temprana de `so101_assets.py` y se conserva para consulta; desde el 2026-10-16 el robot simulado se ha migrado al **modelo SO-ARM100 de mujoco_menagerie** (vendored en `assets/menagerie_so_arm100/`; los motivos y puntos clave de la migración están en las notas de diseño de [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Verificación de accionamiento y renderizado

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| Parámetro | Descripción |
| --- | --- |
| `--model` | Ruta del modelo MJCF. El que viene incluido y se puede usar directamente es `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (si necesitas volver a verificar los tres modelos históricos de la tabla anterior, obténlos primero de los repositorios correspondientes a la columna "Origen" y cambia la ruta) |
| `--out-dir` | Directorio de salida: aquí se escriben el vídeo de verificación, las imágenes fijas y el txt con el resumen estructural (por defecto `out`) |
| `--tag` | Prefijo de los nombres de archivo de salida; por defecto, el nombre del archivo del modelo |
| `--settle` / `--fps` / `--width` / `--height` | Tiempo de estabilización de cada pose (segundos), tasa de fotogramas del vídeo y resolución de renderizado; por defecto 25 fps y 960×720, normalmente no hace falta cambiarlos |

El script genera un resumen estructural (articulaciones/actuadores/ganancias/rangos), renderiza un vídeo de verificación con un "barrido de las seis articulaciones una por una + sinusoide coordinada" y fotogramas fijos. Hay ejemplos de resumen estructural en `reports/` (incluidos en el repositorio); los vídeos de comparación (`media/`) ocupan mucho y no se distribuyen con el repositorio; con el comando anterior puedes regenerarlos cuando quieras.

## Diferencias clave entre los tres modelos (medidas)

| Elemento | Oficial-calibración nueva | Oficial-calibración antigua | Paquete de descripción ROS2 |
| --- | --- | --- | --- |
| Semántica del cero | **Punto medio del recorrido** de la articulación | Posición horizontal de **extensión completa** | Punto medio del recorrido |
| Nombres de articulación | `shoulder_pan` | Igual que a la izquierda | `shoulder_pan_joint` (con sufijo) |
| Ganancia de posición | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Unidades de la pinza | bisagra en radianes | bisagra en radianes | **normalizada 0–1** |
| Exclusión de autocolisión | No | No | Sí (6 pares) |

**Error de seguimiento medido**: la calibración nueva y el paquete de descripción mantienen un error en reposo de 0.0005 rad; la calibración antigua, 0.03 rad (caída de unos 1.7°, kp 56 veces más débil). Al evaluar la misma política en simulación, cambiar de modelo produce dinámicas distintas; anota cuál se usó.

## Comportamientos del modelo que hay que recordar

1. **La dirección positiva de `shoulder_lift` apunta hacia abajo**: en el torque de accionamiento, "bajar" usa ángulos positivos; verifica el signo antes de hacer mapeos de teleoperación o conversiones de datos.
2. **Tocar el suelo bloquea**: en el límite de descenso, la punta de los dedos toca el suelo y se detiene (el script incorpora una protección de 8cm sobre el suelo que recorta el recorrido automáticamente).
3. Los modelos oficiales no tienen cámara ni keyframe; existe una variante con cámara, `so101_new_calib_camera.xml`, que puede usarse más adelante para grabar datos visuales.

<RelatedProducts slugs="so-arm101" />
