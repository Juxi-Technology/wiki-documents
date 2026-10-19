---
title: "03 · Conexión del robot real y calibración"
description: "Al conectar la placa controladora con chip CH343 aparece un puerto COM; el número cambia al conectar/desconectar o al cambiar de puerto USB, así que confírma…"
---

# 03 · Conexión del robot real y calibración

> Requisito previo: completar [01 Preparación del entorno](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment) (el extra `feetech` proporciona la comunicación serie).
> Puertos de ejemplo en este capítulo: brazo seguidor `COM172`, brazo líder `COM124` (valores medidos en el brazo líder activo de esta máquina). **El número puede cambiar cada vez que se conecta o desconecta;
> usa siempre el puerto real obtenido en el primer paso**; en los comandos siguientes solo hay que sustituir el número por el tuyo.

## Identificación del puerto serie

Al conectar la placa controladora con chip CH343 aparece un puerto COM; el número cambia al conectar/desconectar o al cambiar de puerto USB, así que confírmalo antes de cada conexión:

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

La línea de la salida que contiene `CH343` (o un dispositivo serie USB similar) es la placa controladora; anota su número `COM`.

## Paso 1: comprobación inicial de solo lectura (cableado/alimentación/revisión de servos)

**Sin escribir nada**, primero haz ping a los seis servos uno por uno y luego lee voltaje y temperatura (el estado de torque se conserva tal cual):

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` es el número obtenido en el primer paso; rellena el puerto del brazo que quieras comprobar (el mismo script sirve tanto para el brazo seguidor como para el líder).

La salida normal tiene este aspecto: seis líneas de articulaciones, temperatura 20–30 °C, torque 0 (brazo libre). **El voltaje depende del modo de alimentación**: con el brazo seguidor conectado a una fuente externa son unos 11V; con el brazo líder alimentado solo por la placa controladora, unos 5V; que se puedan leer los seis servos completos indica que el cableado es correcto. Si falta alguno o el modelo no coincide, se produce un error directamente.

## Paso 2: calibración

La calibración escribe en la EEPROM de los servos el "rango de recorrido de cada articulación + referencia de posición media" y lo guarda en un archivo local; **hay que calibrar una vez el brazo seguidor y otra el brazo líder**.
Los archivos de calibración de ambos brazos se guardan por separado y no se afectan entre sí:

| Dispositivo | Comando | Ubicación del archivo de calibración |
| --- | --- | --- |
| Brazo seguidor | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| Brazo líder | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

Significado de cada parámetro del comando:

| Parámetro | Descripción |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | Rol del objeto a calibrar: brazo seguidor / brazo líder (no inviertas los roles; los archivos de calibración se guardan en directorios separados por rol) |
| `--robot.port` / `--teleop.port` | Número de puerto serie obtenido en el primer paso |
| `--robot.id` / `--teleop.id` | Nombre que le das a este brazo (en este ejemplo `juxi_so101` / `juxi_leader`); **la teleoperación y la grabación posteriores deben usar el mismo id**, o se volverá a pedir la calibración |

El `id` puede ser cualquier nombre, pero la calibración de cada brazo es independiente y no se sobrescribe.

### Pasos físicos (el terminal imprime un esquema)

1. **Coloca el brazo en la pose media y pulsa Enter**: la base apoyada plana en el borde de la mesa, el brazo superior vertical hacia arriba, el antebrazo horizontal hacia delante, el giro del hombro y la muñeca centrados (la "pinza" del brazo líder es un mango/gatillo). La posición de ese instante se registra como la "referencia media" de ese brazo.
2. Después de pulsar Enter, **recorre lentamente todo el rango de movimiento de cada articulación, una por una** (`wrist_roll` no hay que barrerla; se trata automáticamente como vuelta completa) y pulsa Enter de nuevo para guardar.

Notas:

- Durante la calibración del brazo seguidor el torque es 0 (el brazo está blando); muévelo con la mano. El brazo líder no tiene torque de por sí.
- El proceso de calibración escribe en la EEPROM de los servos (forma parte de la calibración, es normal).
- Resultados de calibración medidos en esta sesión (como referencia): el recorrido de las articulaciones del brazo seguidor es de unas 1474–2688 cuentas y la rotación de muñeca (`wrist_roll`) de 4095 cuentas;
  el del brazo líder, unas 2208–2681 cuentas. Es normal que el recorrido sea claramente asimétrico (la causa y la compensación están en
  [05 Ajuste fino del punto cero](/es/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)).

<RelatedProducts slugs="so-arm101" />
