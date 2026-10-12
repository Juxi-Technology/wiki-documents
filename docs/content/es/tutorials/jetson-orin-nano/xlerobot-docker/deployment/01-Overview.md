---
title: 01 · Resumen
---

# 01 · Resumen

> **Anterior:** No hay ninguna, esta es la primera página
> **Siguiente:** [02-Environment-Setup](02-Environment-Setup.md)

Esta página explica con claridad: **cuál es el flujo de trabajo completo de
XLeRobot, qué hardware hace falta y si su máquina lo soporta.**

---

## Flujo de trabajo

El flujo completo de XLeRobot tiene cuatro pasos:

```
① Calibrar el robot  →  ② Teleoperar y grabar datos  →  ③ Entrenar el modelo  →  ④ Desplegar el modelo
   calibrate               record                          train                    eval / rollout
```

La imagen de Docker ya trae instalado todo el **entorno de software** que
necesitan estos cuatro pasos: Python, PyTorch, LeRobot, el código del robot
XLeRobot y los controladores de servos y cámaras. Usted ya no tiene que
pelearse con conflictos de versiones.

**Lo único que debe preparar usted mismo** es: un robot (o poner primero en
marcha el software), un ordenador y un cable USB.

---

## Compatibilidad de hardware

| Plataforma | Soporte |
|---|---|
| **Serie Jetson Orin** (JetPack 7.2) | ✅ **La plataforma con soporte oficial actual**, con aceleración por GPU |
| Jetson Nano (2019, original) | ❌ No compatible: capacidad de cómputo demasiado baja; véase más abajo |
| Raspberry Pi / Ubuntu normal / PC x86 | ⏳ **Aún no compatible**; véase más abajo |
| Windows / macOS | ❌ No compatible (el paso del puerto serie y de la cámara solo funciona bien en Linux) |

> 💡 **Actualmente esta imagen está destinada únicamente a dispositivos Jetson Orin.**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: requieren **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). El AGX Orin de 64 GB también necesita 7.2 para
>   tener soporte completo.
> - **Jetson Nano (2019, original)**: ❌ nunca funcionará. Es de arquitectura
>   Maxwell (capacidad de cómputo 5.3), y CUDA 13 ha eliminado por completo
>   el soporte de Maxwell; además, torch exige como mínimo sm_80.
> - **Raspberry Pi / PC x86**: la imagen está diseñada para soportarlos (la
>   versión CPU genérica se basa en `python:3.12-slim`, una imagen base que
>   tiene versiones oficiales para amd64 y arm64), pero **la versión CPU
>   publicada actualmente aún no es multiarquitectura**: al descargarla
>   podría obtener solo amd64 o solo arm64. Se abrirá cuando se haga la
>   compilación multiarquitectura.
>
> Se recomiendan 4 GB de memoria o más. Los 3,4 GB de la Jetson Orin Nano
> también pueden con la teleoperación, pero el entrenamiento se le hará
> cuesta arriba.

### Requisitos del sistema

- Ubuntu 20.04 / 22.04 / 24.04, o Debian 12+
- Raspberry Pi: se requiere un sistema de 64 bits (`uname -m` debe mostrar `aarch64`)
- El kernel debe soportar puertos serie USB (lo habitual)

### Compruebe su arquitectura

```bash
uname -m
```

- `aarch64` → Raspberry Pi, Jetson (use la imagen arm64)
- `x86_64` → ordenador normal (use la imagen amd64)

---

## Los pasos que debe leer

| # | Carpeta | Contenido | Cuándo leerlo |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (esta misma carpeta) | **Descargar la imagen y ejecutarla** | Primera vez; lea `01` → `02` → `03` en orden |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Instrucciones para el XLeRobot completo** | Cuando tenga el robot completo (dos brazos + chasis) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Instrucciones para el LeRobot original** | Cuando solo tenga un brazo SO-101 / SO-100 o un LeKiwi |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Preguntas frecuentes y referencia rápida | Cuando algo vaya mal |

> ⚠️ **Las carpetas 2 y 3 son alternativas entre sí** — elija según su hardware:
> - **XLeRobot completo** (dos brazos + chasis) → vaya a `xlerobot/`
> - **Un solo brazo SO-101 / SO-100**, **LeKiwi** → vaya a `lerobot/`
>
> La imagen es el mismo entorno; puede cambiar de una ruta a otra en
> cualquier momento, sin reinstalar nada.

---

## Camino más corto (solo quiere ponerlo en marcha primero)

**En la Jetson (JetPack 7.2)**, unos pocos comandos para ver moverse al
robot cuanto antes y leer después los detalles:

```bash
# 1. Instalar Docker (omitir si ya está instalado)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. Dar acceso a la GPU al contenedor (específico de Jetson; solo hace falta una vez)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Descargar la imagen (unos 3,6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Iniciar el contenedor
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Ejecutar la teleoperación en el contenedor (la primera vez entra automáticamente en la calibración guiada)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ La ruta rápida se salta dos cosas que **tarde o temprano habrá que
> hacer**; si se atasca, vuelva al capítulo correspondiente:
> - **El acelerador de espejos para China continental** (el paso 3 puede quedarse atascado) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` no se puede omitir** (este hook tiene un bug en JetPack 7.2 y hace que el contenedor no arranque)
>   → [03-Deployment §4](03-Deployment.md)
>
> El paso 5 anterior ejecuta el ejemplo del **XLeRobot completo**. Si solo
> tiene un brazo SO-101, use la línea de comandos `lerobot-*`; véase
> [lerobot/](../lerobot/01-Operation.md).

---

> **Siguiente:** [02-Environment-Setup](02-Environment-Setup.md) — Instalar Docker, configurar el acelerador para China continental y conectar el hardware
