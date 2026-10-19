---
title: "04 · Teleoperación por teclado"
description: "Controla manualmente con el teclado el brazo real o simulado \"moviendo\" sus articulaciones: es la forma de control más rápida cuando no se dispone del brazo …"
---

# 04 · Teleoperación por teclado

Controla manualmente con el teclado el brazo real o simulado "moviendo" sus articulaciones: es la forma de control más rápida cuando no se dispone del brazo líder y también uno de los medios para grabar datos de demostración.

> Requisito previo: para la parte de simulación basta con completar [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment); para la parte de robot real también hay que completar [03](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration).
> `COM172`/`juxi_so101` en los comandos son ejemplos: comprueba el puerto según el capítulo 03 y sustitúyelo; usa como `id` el nombre que elegiste al calibrar.

## Comandos

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 真机从动臂
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=5 \
    --teleop.type=so101_keyboard --teleop.rate=150

# 仿真从动臂（MuJoCo 窗口自动打开）
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --teleop.rate=150
```

(`teleoperate.py` ya usa por defecto `--robot.type=so101_mujoco --teleop.type=so101_keyboard`.)

## Teclas (actúan mientras se mantienen pulsadas; escucha global: da igual qué ventana tenga el foco)

| Tecla | Acción | Tecla | Acción |
| --- | --- | --- | --- |
| `w` / `s` | shoulder_lift arriba / abajo | `a` / `z` | shoulder_pan izquierda / derecha |
| `e` / `d` | elbow_flex extender / flexionar | `t` / `g` | wrist_flex + / − |
| `y` / `h` | wrist_roll + / − | `u` / `j` | pinza abrir / cerrar |

Las teclas se eligieron **evitando deliberadamente las teclas de control de grabación** (`n/r/q`, flechas, `Esc`), de modo que la teleoperación y la grabación pueden ejecutarse a la vez.

## Parámetros clave

| Parámetro | Función | Valor recomendado |
| --- | --- | --- |
| `--teleop.rate` | Velocidad objetivo mientras se mantiene pulsada una tecla (unidades/segundo) | El valor por defecto, 60, es lento; en el robot real **150** resulta adecuado |
| `--robot.max_relative_target` | Cuántas unidades como máximo puede moverse una articulación por ciclo de control (límite de velocidad de seguridad) | Robot real **5** (teleoperación a 60 Hz) / **10** (grabación a 30 Hz) |
| `--robot.use_degrees=false` | Usar proporción de recorrido (−100 a 100) en lugar de grados | **Obligatorio en el robot real**; de lo contrario las unidades no coinciden (la simulación ya es coherente por defecto) |

## Comportamiento

- **No escribas durante la teleoperación**: la escucha de teclado es **global y no consume las pulsaciones**; pulsar en cualquier ventana del ordenador una tecla mapeada
  (`w a s z e d t g y h u j`, incluidos los caracteres de entrada en un chat) también acciona el brazo. Con el modo de brazo líder este problema no existe.
- **El brazo se mueve en el instante de conexión**: el brazo seguidor real primero recibe torque (se vuelve rígido) y luego se mueve hacia la "pose media" (el objetivo antes de pulsar teclas);
  el brazo simulado converge directamente hacia la pose media. Deja espacio alrededor.
- **Salir**: `Ctrl-C` en ese terminal (o pulsar `Esc`; la escucha de teclado se desconecta y el programa sale limpiamente). Tras salir, el robot real **pierde el torque y se vuelve blando**;
  sujétalo con la mano; es un comportamiento normal.
- **Las ráfagas de WARNING `clamped to be safe` en el log de arranque** son la salida normal del limitador de velocidad mientras "alcanza" el objetivo; se detienen automáticamente al llegar.

<RelatedProducts slugs="so-arm101" />
