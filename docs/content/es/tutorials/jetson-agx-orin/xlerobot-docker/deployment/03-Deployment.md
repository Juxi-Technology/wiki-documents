---
title: 03 · Despliegue
---

# 03 · Despliegue

> **Anterior:** [02-Environment-Setup](02-Environment-Setup.md)
> **Ahora elija uno de los dos caminos:** [xlerobot/](../xlerobot/01-Operation.md) (robot completo)
> o [lerobot/](../lerobot/01-Operation.md) (un brazo / LeKiwi)

Descargue la imagen a su equipo e inicie el contenedor. Al terminar esta
página, estará dentro de un shell con todo el entorno ya instalado.

---

## 1. Obtener la imagen

Solo hay una imagen:

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| Arquitectura | `arm64` |
| Se ejecuta en | Jetson + JetPack 7.2 |
| Descarga | Unos 3,6 GB (más al descomprimir; deje 20 GB libres) |
| Incluye | Teleoperación, calibración, grabación de datos, entrenamiento e inferencia, **con aceleración por GPU** |

Confirme que ha llegado:

```bash
docker images | grep xlerobot
```

Debería ver `chenyang310/xlerobot` con la etiqueta `jetson`.

> **China continental**: esta descarga funciona tal cual, sin necesidad de
> acelerador de espejos. Si va lenta, véase la sección 2 de
> [02-Environment-Setup](02-Environment-Setup.md).

### Compilarla usted mismo (mantenedores)

Para cuando necesite hacer cambios o quiera compilar desde el código fuente
más reciente.

```bash
git clone <URL-de-este-repositorio> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

Los scripts de compilación ya traen configurados los espejos de China
continental (PyPI de Aliyun, repositorios de Ubuntu de Aliyun), así que
**puede compilar en redes de China continental sin configuración adicional**.

> La primera compilación descarga unos 2 GB de dependencias; con una red
> lenta puede tardar una o dos horas.
> Con `scripts/sync.sh` y la caché `wheels/` de la placa puede reutilizar los
> paquetes ya descargados.

---

## 2. Qué incluye la imagen

Una sola imagen, con todo incluido:

- **Teleoperación y calibración** — mueva el robot a mano y guarde su calibración
- **Grabación y reproducción de datos**
- **Entrenamiento** — ACT, Diffusion Policy, SmolVLA, π₀, π₀.₅, Wall-OSS
- **Inferencia** — ejecute una política entrenada en el robot, **con aceleración por GPU**

---

## 3. Iniciar el contenedor

### 3.1 Iniciar con el script (recomendado)

Si clonó el repositorio:

```bash
bash scripts/run.sh jetson
```

El script ya configura todo esto:

- **GPU** — `--device nvidia.com/gpu=all` (CDI)
- **Acceso directo a los dispositivos** — puerto serie, cámara, USB
- **Red** — `--network host`, necesario para la teleoperación con VR y el control web
- **Montaje del código fuente** — para cambiar el código sin reconstruir la imagen
- **Montaje de la caché** — los archivos de calibración y las descargas de modelos se conservan

### 3.2 Inicio manual

Si no usa el script, el comando mínimo que funciona:

```bash
docker run -it --rm \
  --name xlerobot \
  --device nvidia.com/gpu=all \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson
```

**Qué hace cada parámetro:**

| Parámetro | Por qué se necesita |
|---|---|
| `--device nvidia.com/gpu=all` | **Da la GPU al contenedor** (mediante CDI). Sin esto no hay GPU en absoluto |
| `--privileged` + `-v /dev:/dev` | Acceso directo al puerto serie (servos SO-101), la cámara y el USB |
| `--network host` | Comunicación entre los dos procesos host/client (ZMQ) y control por VR |
| `-v ~/.cache/huggingface` | Los **archivos de calibración** y la caché de modelos. Sin este montaje, habrá que recalibrar cada vez que reinicie el contenedor |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | Para ejecutar la visualización (abrir la ventana de rerun) |
| `-e HF_ENDPOINT` | `huggingface.co` es completamente inalcanzable desde China continental; es obligatorio usar el espejo |

> El `/home/jetson` de la ruta de montaje es el directorio del usuario **dentro
> de la imagen**: fijarlo así es correcto, porque el usuario de esa imagen se
> llama `jetson`.

Al entrar encontrará un bash, con directorio de trabajo `/opt/xlerobot`.

---

## 4. Parámetros de GPU — el método CDI

La imagen **debe** recibir la GPU mediante CDI: **`--runtime nvidia` no se puede
usar**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Antes de usarla por primera vez hay que generar la especificación CDI en la
**máquina anfitriona**:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Escollo ya conocido**: en JetPack 7.2, el hook `enable-cuda-compat` de
> `nvidia-container-toolkit 1.19.1` se bloquea (`slice bounds out of range`)
> y el contenedor no llega ni a arrancar. Basta con añadir el parámetro que
> lo desactiva:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> Cuando la versión de CUDA del contenedor coincide con la de la máquina
> anfitriona, este hook no hace falta.

### Verificar que la GPU está disponible

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Específico por plataforma

### Serie Jetson Orin —— ✅ Compatible actualmente

| Modelo | Requisito | Notas |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | Nuestra placa de pruebas (los 3,4 GB de memoria también bastan para la teleoperación) |
| **Orin NX** | JetPack **7.2** | Igual que la anterior |
| **AGX Orin / AGX Orin 64 GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **no admiten** el AGX Orin de 64 GB; hace falta 7.2 |

**El único requisito obligatorio es la versión de JetPack**: el torch de la
imagen está compilado con CUDA 13.0, y CUDA 13.x exige un controlador **≥ 580**.

| JetPack | L4T | CUDA | Controlador | ¿Sirve? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ Controlador demasiado antiguo |
| **7.2** | 39.2 | 13.2 | serie 595 | ✅ |

Para consultar su versión:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Pasar de JetPack 6.x a 7.x **no se puede hacer con `apt upgrade` / OTA**
> (las OTA solo funcionan dentro de la misma versión mayor de L4T); hay que
> reflashear la placa entera.

### Jetson Nano (2019, original) —— ❌ Nunca compatible

Tres motivos independientes, todos sin salida:

1. **CUDA 13 ha eliminado por completo la arquitectura Maxwell**. El
   controlador R580 es la última rama que admite Maxwell / Pascal / Volta,
   y CUDA 13 necesita precisamente 580 o superior. La Jetson Nano se queda
   como máximo en JetPack 4.6.6 / CUDA 10.2.
2. **La capacidad de cómputo 5.3 está por debajo del mínimo que admite
   torch**. Las arquitecturas para las que está compilado el torch de esta
   imagen son `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` — el mínimo, sm_80 —
   y la Jetson Nano es sm_53: no tiene kernels nativos, y la compilación JIT
   de PTX tampoco llega a cubrirla.
3. **La plataforma está EOL** (el mantenimiento de JetPack 4 terminó en
   noviembre de 2024).

### Cualquier otra plataforma —— ❌ No compatible

Raspberry Pi, PC x86 normales, Windows y macOS **no pueden ejecutar esta
imagen**. Está compilada contra la pila CUDA de JetPack 7.2 y se distribuye
solo como `arm64`, así que no hay ninguna edición CPU a la que recurrir. Use
una placa Jetson Orin.

> Compruebe lo que tiene: `uname -m` debe mostrar `aarch64`, y
> `cat /etc/nv_tegra_release` debe indicar **R39**.

---

## Después de entrar al contenedor

Haga primero una autocomprobación:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Salida esperada:

```
torch 2.11.0+cu130
lerobot 0.6.2
```

> ⚠️ **`xlerobot` y `xlerobot_mecanum` no pueden convivir en el mismo
> proceso**: ambos se registran en el código fuente como `"xlerobot"` (un bug
> del propio XLeRobot), y dará
> `Cannot register ... as xlerobot because ... already registered`.
>
> Ninguna otra combinación tiene problema: **los robots del LeRobot original y
> XLeRobot pueden coexistir en el mismo proceso** (probado: 8 tipos
> registrados a la vez), y `xlerobot_2wheels` tampoco entra en conflicto.
> Un robot solo usa una variante, así que el uso normal no se ve afectado.

---

> **Ahora elija uno de los dos caminos:** [xlerobot/](../xlerobot/01-Operation.md) robot completo ·
> [lerobot/](../lerobot/01-Operation.md) un brazo / LeKiwi
