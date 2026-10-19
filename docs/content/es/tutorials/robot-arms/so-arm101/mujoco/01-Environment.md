---
title: "01 · Preparación del entorno"
description: "Operación de una sola vez."
---

# 01 · Preparación del entorno

Operación de una sola vez. Este repositorio usa **uv para gestionar un `.venv` aislado dentro del proyecto**: `uv run` solo utiliza el entorno de ese directorio y no toca tu conda (este diseño es intencionado, ver [07 Preguntas frecuentes](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Instalación

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

Para qué sirve cada uno de los cuatro extras:

| extra | Qué aporta | Quién lo necesita |
| --- | --- | --- |
| `core_scripts` | Puntos de entrada oficiales record / teleoperate / calibrate / replay + dependencias de dataset + visualización | Todos |
| `feetech` | `scservo_sdk` (protocolo serie de los servos STS3215) | Operaciones con el robot real |
| `pynput-dep` | Escucha global de teclado | Teleoperación por teclado, teclas de control de episodios durante la grabación |
| `training` | `accelerate` / `wandb`, etc. | Entrenamiento con `lerobot-train`, despliegue de políticas (`lerobot-rollout`) |

Cuando lo necesites, superpón MuJoCo temporalmente (no entra en el archivo de bloqueo; se carga bajo demanda):

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

Cómo interpretar las tres partes: `uv run` ejecuta el comando con el `.venv` de este repositorio; `--frozen` usa estrictamente las versiones bloqueadas en `uv.lock` sin volver a resolver dependencias; `--with mujoco` superpone temporalmente el paquete MuJoCo **solo para este comando**: el siguiente comando sin ese flag no lo tendrá en el entorno, por eso los comandos de simulación de 02–09 llevan este prefijo.

Después de completar este capítulo, todos los comandos de 02–09 se pueden ejecutar directamente: el extra `training` (necesario para entrenamiento/despliegue) ya está incluido en el `uv sync` anterior; en adelante **no hace falta instalar ninguna dependencia adicional**.

¿**Prefieres usar un entorno conda**? Entonces los comandos ya no necesitan el prefijo `uv run`: los tres comandos para crear el entorno y los puntos a tener en cuenta están en [09 Tutorial de uso completo · Apéndice A](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial).

## Verificación

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## Problemas comunes

- **`uv sync` muestra `failed to persist temporary file ... os error 17`**: caso especial de esta máquina por el directorio de caché de uv entre discos; basta con usar el prefijo `UV_CACHE_DIR` de arriba; detalles en [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).
- **No uses la versión de Python de Microsoft Store**: elige la Python 3.12 gestionada automáticamente por uv.
- La primera vez, `uv run --with mujoco` descarga un wheel de mujoco de unos 5.6MB; después se usa la caché.

<RelatedProducts slugs="so-arm101" />
