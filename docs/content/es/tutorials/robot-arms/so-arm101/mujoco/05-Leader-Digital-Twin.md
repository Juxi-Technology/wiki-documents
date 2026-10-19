---
title: "05 · Gemelo digital del brazo líder (el brazo físico acciona el brazo simulado)"
description: "Mueve con la mano el brazo líder físico para que el brazo seguidor simulado en la ventana de MuJoCo lo siga en espejo en tiempo real: la demostración de geme…"
---

# 05 · Gemelo digital del brazo líder (el brazo físico acciona el brazo simulado)

Mueve con la mano el **brazo líder físico** para que el **brazo seguidor simulado en la ventana de MuJoCo** lo siga en espejo en tiempo real: la demostración de gemelo digital
y la forma correcta de realizar captura de datos en simulación.

## Requisitos previos

El brazo líder está calibrado (ver [03](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)); el puerto de ejemplo es `COM124` (valor medido en el brazo líder activo de esta máquina;
el número puede cambiar cada vez que se conecta o desconecta, compruébalo según el capítulo 03 y sustitúyelo).

## Comando

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

- `--robot.type=so101_mujoco`: el objeto controlado es el brazo simulado; la ventana se abre automáticamente;
- `--teleop.*`: el dispositivo de control es el brazo líder físico (solo lectura, nunca aplica torque, riesgo cero para el brazo líder);
- `--teleop.use_degrees=false`: **Obligatorio**. Hace que las unidades que emite el brazo líder (proporción de recorrido) coincidan con las del brazo simulado.

Si cambias `--robot.type` por `so101_follower --robot.port=COM172 --robot.id=juxi_so101 --robot.max_relative_target=5`,
tienes el uso habitual del kit "brazo líder físico → brazo seguidor real"; la misma calibración del brazo líder sirve.

## Qué hacer si el punto cero está desviado: ajuste automático de centrado (`so101_leader_trim`)

**Síntoma**: el brazo líder se coloca en la "posición media visual", pero el brazo simulado se desvía unos grados.

**Principio**: el cero normalizado de lerobot es el **punto medio del rango registrado durante el barrido de calibración**, `(min+max)/2`; sin embargo, la "pose media" al pulsar Enter en la calibración se registra como el valor bruto 2048. Si el recorrido mecánico de una articulación es asimétrico, ambos "puntos medios" difieren siempre en una cantidad fija
(medido en el servo n.º 1: rango registrado 776–3457, punto medio 2116, diferencia de 68 cuentas respecto a 2048 ≈ **5.6°**).
**Esta desviación no se elimina recalibrando** (la asimetría del recorrido la determina la estructura mecánica); hay que compensarla por software.

**Solución**: el plugin `so101_leader_trim` calcula automáticamente a partir del archivo de calibración la compensación de cada articulación según la fórmula y la resta en tiempo real;
tras una recalibración se adapta solo, sin ajustes manuales de parámetros:

```
补偿ᵢ = (2048 − minᵢ) / (maxᵢ − minᵢ) × 200 − 100
```

Valores efectivos medidos en esta máquina (se imprimen en el log de arranque):

| Articulación | Compensación (unidades) |
| --- | --- |
| shoulder_pan | −5.11 |
| shoulder_lift | −0.92 |
| elbow_flex | +2.54 |
| wrist_flex | +0.69 |

El resto de articulaciones tiene una desviación <0.05 y no necesita compensación; la pinza (0 a 100) y el modo en grados no participan en el ajuste fino.

> Nota para desarrolladores: el `name` de este plugin debe seguir siendo `"so_leader"`; `name` es la clave del directorio donde se buscan los archivos de calibración,
> y un nombre de tipo personalizado haría que no se encontraran y se activara por error el proceso de recalibración.

<RelatedProducts slugs="so-arm101" />
