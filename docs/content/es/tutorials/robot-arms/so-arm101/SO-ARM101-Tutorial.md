---
title: Tutorial del brazo robótico LeRobot
description: "Este tutorial está actualizado al 15 de diciembre. Puede seguir la documentación oficial más reciente. Ver enlaces. SO-ARM101 y SO-ARM100 son compatibles en el código ejecutado."
---

# Tutorial del brazo robótico LeRobot

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**


Este tutorial está actualizado al 15 de diciembre. Puede seguir la [documentación oficial más reciente](https://github.com/huggingface/lerobot/tree/main). Tutorial detallado: [este enlace](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c). Para archivos URDF: [este enlace](https://github.com/TheRobotStudio/SO-ARM100). Versión antigua del 15 de septiembre: [este enlace](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink). SO-ARM101 y SO-ARM100 son compatibles en el código ejecutado.

## A. Notas del tutorial

**Versión Pro: brazo activo negro con adaptador de 5V/6A, brazo esclavo blanco con adaptador de 12V/5A.**

El montaje de servos y el calibrado de ángulos deben hacerse de antemano: ver [tutorial de ensamblaje oficial](https://huggingface.co/docs/lerobot/so101); este tutorial no los cubre.

Tutorial de ensamblaje: [Ensamblaje del brazo LeRobot](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)

Si los servos no están configurados o el brazo sin ensamblar, siga este [README](https://github.com/TheRobotStudio/SO-ARM100): lista de materiales, enlaces de compra, impresión 3D y consejos para principiantes.

Empecemos instalando el entorno de LeRobot.

## B. Preparación del entorno

Para Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

Para Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

### Instalar el entorno LeRobot

#### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

Según su versión de CUDA, debe instalar pytorch y torchvision.

1. Para Jetson:

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

O para X86 Ubuntu 22.04:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. Crear y activar un nuevo entorno conda para lerobot en el directorio deseado (crear, p. ej., lerobot):

> No cree ni importe el proyecto lerobot dentro de ~/miniconda3

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. Activar después el entorno `conda` (¡cada vez que abra un terminal con lerobot!):

```PowerShell
conda activate lerobot
```

#### 4. Clonar LeRobot:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Opcional: seguir la última versión: https://github.com/huggingface/lerobot.git
Nota: los comandos de la última versión pueden diferir.

#### 5. Instalar ffmpeg en su entorno:

Con `miniconda`, instalar `ffmpeg`:

```PowerShell
conda install ffmpeg -c conda-forge
```

Esto normalmente instala ffmpeg 7.X compilado con el codificador libsvtav1. Si libsvtav1 no está soportado (comprobable con `ffmpeg -encoders`):

【Todas las plataformas】instalar explícitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`

Sin dependencias gráficas (gdk-pixbuf, librsvg), usar:
`conda install ffmpeg=7.1.1 -c conda-forge --no-deps`

【Solo Linux】instalar dependencias de compilación y compilar ffmpeg con libsvtav1; verificar con `which ffmpeg`.

Si encuentra el error siguiente, los comandos anteriores también lo resuelven.
![5. Instalar ffmpeg en su entorno: – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)




#### 6. Entrar en lerobot e instalar LeRobot con dependencias feetech:

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

Para dispositivos Jetson Jetpack 6.0+ (instalar antes Pytorch-gpu y Torchvision según [este tutorial](https://pytorch.org/get-started/locally/)):

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7. Comprobar Pytorch y Torchvision

Como pip desinstala los Pytorch/Torchvision existentes e instala las versiones CPU, hay que verificar en Python:

```Plain Text
import torch
print(torch.cuda.is_available())
```

Si es False, reinstalar según el [tutorial oficial](https://pytorch.org/).

[Incompatibilidad de Pytorch en Jetson Orin](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. Instalar el SDK de la cámara de profundidad Intel RealSense (si la hay)

Bajo `lerobot/src/lerobot/`, instalar pyrealsense2:

```Plain Text
pip install pyrealsense2
```

## C. Control del brazo robótico

### Autorización de puerto

Conectar la alimentación: brazo activo negro con adaptador 5V/6A, brazo esclavo blanco con 12V/5A; conectar la placa driver a la CPU mediante el cable de datos.

Primero, entrar en `lerobot/src/lerobot/`:

```Plain Text
cd ~/lerobot/src/lerobot/
```

Luego activar el entorno `conda` (¡cada vez!):

```PowerShell
conda activate lerobot
```

#### 1. Ejecutar el script de búsqueda de puerto

Para encontrar el puerto USB correcto de cada brazo, ejecutar dos veces el script de utilidad:

```Plain Text
lerobot-find-port
```

#### 2. Ejemplo de salida

Reconociendo el puerto del brazo Leader (p. ej. `/dev/tty.usbmodem575E0031751` en Mac o `/dev/ttyACM0` en Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Reconociendo el puerto del brazo Follower (p. ej. `/dev/tty.usbmodem575E0032081` o `/dev/ttyACM1` en Linux):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Recuerde desconectar el conector USB; de lo contrario no se detectará la interfaz.

#### 3. Solución de problemas

En Linux, conceder acceso al puerto USB:

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### Calibrar el brazo robótico

Conecte la alimentación y el cable de datos y calibre para que Leader y Follower coincidan en la misma posición física. Este calibrado es crucial para que una red entrenada en un SO-10x funcione en otro. Si recalibra, elimine por completo los archivos bajo `~/.cache/huggingface/lerobot/calibration/robots` o `~/.cache/huggingface/lerobot/calibration/teleoperators`; de lo contrario, error. Los datos se guardan en json en ese directorio.

#### 1. Calibrado manual del brazo Follower

Conectar los 6 servos mediante conectores de 3 pines, conectar los servos del chasis a la placa driver y ejecutar el comando o ejemplo de API:

En PC (Linux) y Jetson: el `primer` puerto USB es `ttyACM0`, el `segundo` `ttyACM1`.

Antes de ejecutar, verificar el mapeo Leader/Follower.

#### 2. Autorización de interfaz

Primero autorizar la interfaz:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. Luego calibrar el brazo Follower

Ejecutar el comando Python:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

Primero, situar el robot con todas las articulaciones en el centro de su rango de movimiento y mantenerlo inmóvil. Tras pulsar Enter, mover cada articulación por todo su rango. El archivo registra los valores central, máximo y mínimo en el json bajo `~/.cache/huggingface/lerobot/calibration/robots` o `~/.cache/huggingface/lerobot/calibration/teleoperators`.
![3. Luego calibrar el brazo Follower – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)



![3. Luego calibrar el brazo Follower – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)




#### **4. Calibrar el brazo Leader**

Igual que arriba – ejecutar:

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

[Vídeo de calibración central.mp4]

### Teleoperación

#### **1. Teleoperación simple

¡Ya puede teleoperar! Ejecutar este script simple (sin cámara):

El **ID asociado al robot se usa para guardar el archivo de calibración. Para teleoperar, grabar y evaluar con la misma configuración, use el mismo **.

Primero autorizar el puerto serie:

```Bash
sudo chmod 666 /dev/ttyACM*
```

Ejecutar la teleoperación:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

El comando hace automáticamente:
1. Identificar archivos de calibración faltantes e iniciar el calibrado.
2. Conectar el robot y el dispositivo de teleoperación.

#### 2. Teleoperación con visor de cámara

Para instanciar una cámara se necesita un identificador; puede cambiar al reiniciar o reconectar (según el sistema).

Buscar el **índice de la cámara**:

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

El terminal muestra la información.
![2. Teleoperación con visor de cámara – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)




Las imágenes están en `~/lerobot/outputs/captured_images`.

En **macOS** con Intel RealSense puede aparecer **"Error finding RealSense cameras: failed to set power state"** – resolver ejecutando con `sudo`. RealSense en macOS es inestable.

Para mostrar la cámara durante la teleoperación:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` son imágenes comprimidas; se puede probar mayor resolución. `YUYV` también es posible pero reduce resolución/FPS y hace que el brazo tartamudee. Actualmente `MJPG` admite `3` cámaras a `1920*1080` y `30FPS`; no recomendado: 2 cámaras en el mismo HUB USB.

Añadir cámaras con `--robot.cameras`; `index_or_path` sigue el último dígito del ID de `python -m lerobot.find_cameras opencv`.

Ejemplo con cámara adicional:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

Para la cámara de profundidad RealSense, ejecutar primero `python -m lerobot.find_cameras realsense`, sustituir `serial_number_or_name: "323622271780"` por su ID y activar `use_depth: true`:

![2. Teleoperación con visor de cámara – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. Recolección de datos

### Registrar un dataset

- Para guardar localmente, ejecutar directamente:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

`dateset.repo_id` y `dataset.single_task` son personalizables. Con `push_to_hub=false`, se crea `juxi/test` bajo `~/.cache/huggingface/lerobot`. [Con RealSense, adaptar el comando](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- Para subir al Hub, conectarse con un token de escritura (creación en [Hugging Face Settings](https://huggingface.co/settings/tokens)):

```Bash
hf auth login
```

Guardar el nombre del repositorio en una variable:

```Bash
hf auth whoami
```

Registrar 5 episodios y subir:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

Salida del tipo:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**Explicación de parámetros**
- episode_time_s: duración de recolección por episodio.
- reset_time_s: tiempo de preparación entre episodios.
- num_episodes: número de grupos de datos.
- push_to_hub: si se sube al Hub de HuggingFace.

|Tecla|Acción|
|---|---|
|Flecha derecha →|terminar/reiniciar el episodio actual; pasar al siguiente.|
|Flecha izquierda ←|cancelar el episodio actual; regrabar.|

### Visualizar un dataset

Con upload: [visualización en línea](https://huggingface.co/spaces/lerobot/visualize_dataset) – copiar el ID de repositorio generado:

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/so101_test \
  --local-files-only 1
```

Sin upload, también local:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test
```

`juxi` es el `repo_id` personalizado en la recolección.
![Visualizar un dataset – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)


### Reproducir un episodio (opcional)

Reproducir un episodio del dataset:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
  --dataset.repo_id=${HF_USER}/so101_test \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.num_episodes=1 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.push_to_hub=true \
  --replay=true
```

## E. Entrenamiento y evaluación del dataset

### ACT

Tutorial oficial [ACT](https://huggingface.co/docs/lerobot/training#act)

**Entrenamiento**

```Bash
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000
```

**Para datasets locales: **`repo_id`** debe coincidir con la recolección; añadir **`--policy.push_to_hub=false`**.**

```Python
lerobot-train \
  *--dataset.repo_id*=juxi/test \
  *--policy.type*=act \
  *--output_dir*=outputs/train/act_so101_test \
  *--job_name*=act_so101_test \
  *--policy.device*=cuda \
  *--wandb.enable*=false \
  *--policy.push_to_hub*=false\
  *--steps*=300000
```

Explicación
- **Dataset**: mediante `--dataset.repo_id=${HF_USER}/so101_test`.
- **Pasos**: `--steps=300000`; por defecto 800000 – ajustar según dificultad observando la loss.
- **Política**: `policy.type=act`; también [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla] (cargado de `configuration_act.py`). Importante: se adapta automáticamente a motores, acciones y número de cámaras del robot (guardados en el dataset).
- **Dispositivo**: `policy.device=cuda` para Nvidia; `policy.device=mps` para Apple Silicon.
- **Visualización**: `wandb.enable=true` con [Weights and Biases](https://docs.wandb.ai/quickstart); opcional, pero requiere `wandb login`.

Si aparece el error:
![ACT – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)




Ejecutar:

```Bash
pip install datasets==2.19
```

El entrenamiento puede durar horas. Los pesos están en `outputs/train/act_so101_test/checkpoints`.

Para reanudar desde un checkpoint:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**Evaluación**

Usar la función `record` de [`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) con la política como entrada – p. ej. 10 episodios de evaluación:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `--policy.path` apunta a los pesos (p. ej. `outputs/train/act_so101_test/checkpoints/last/pretrained_model`); también vale un repositorio de modelo (p. ej. `$\{HF_USER\}/act_so101_test`).
2. Si `dataset.repo_id` empieza por `eval_`, el video y los datos se graban aparte en la carpeta `eval_` (p. ej. `juxi/eval_test123`).
3. Ante `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, eliminar primero la carpeta `eval_`.
4. Ante `mean is infinity. ...`, las claves de `--robot.cameras` (front, side ...) deben coincidir exactamente con la recolección.

### Smolvla

Tutorial oficial [SmolVLA](https://huggingface.co/docs/lerobot/smolvla)

```Bash
pip install -e ".[smolvla]"
```

**Entrenamiento**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**Evaluación**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

Tutorial oficial [Pi0](https://huggingface.co/docs/lerobot/pi0)

```Bash
pip install -e ".[pi]"
```

**Entrenamiento**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false
```

**Evaluación**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

Tutorial oficial [Pi0.5](https://huggingface.co/docs/lerobot/pi05)

Entrenamiento como Pi0, tipo de política `pi0.5`.

### GR00T N1.5

Tutorial oficial [GR00T](https://huggingface.co/docs/lerobot/gr00t)

Entrenamiento como Pi0, tipo de política `gr00t`.

## F. Entrenamiento en servidor cloud, despliegue y exportación de modelo

#### **1. Hacer clic en «Mercado de cómputo», elegir GPU – a ser posible multicorazón**
![1. Hacer clic en «Mercado de cómputo», elegir GPU – a ser posible multicorazón – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)


#### **2. Elegir «Pago por uso», imagen base «Miniconda/conda3/3.8(ubuntu20.04)/11.8», luego «Crear ahora»**
![2. Elegir «Pago por uso», imagen base «Miniconda/conda3/3.8ubuntu20.04/11.8», luego «Crear ahora» – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)


#### **3. Clic en «JupyterLab» para entrar en la interfaz y abrir un terminal**
![3. Clic en «JupyterLab» para entrar en la interfaz y abrir un terminal – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)


#### **4. Inicializar el entorno conda**
![4. Inicializar el entorno conda – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)


#### **5. Cerrar este terminal y abrir uno nuevo**

Ver https://www.autodl.com/docs/network_turbo/

```Plain Text
source /etc/network_turbo
```
![5. Cerrar este terminal y abrir uno nuevo – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)




#### **6. Crear el entorno lerobot**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

Alternativa: https://github.com/huggingface/lerobot.git – los comandos de la última versión pueden diferir.

```PowerShell
conda install ffmpeg -c conda-forge
```
![6. Crear el entorno lerobot – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)


#### **7. Entrar en lerobot bajo src, instalar LeRobot con feetech:**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8. Importar el dataset al servidor cloud**

Dos casos: **dataset ya subido a la base de Huggingface en la recolección** o no.

**① Ya subido: acceso mediante la clave de Huggingface**



```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```
![8. Importar el dataset al servidor cloud – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)




```Plain Text
export HYDRA_FULL_ERROR=1
```

**② Subir dataset local con FileZilla:** ver https://www.autodl.com/docs/filezilla/

Instalación más simple en Linux:

```Python
sudo apt install filezilla
```

```Python
filezilla
```

Abrir FileZilla, «Archivo» → «Gestor de sitios», «Nuevo sitio», protocolo «SFTP»
![8. Importar el dataset al servidor cloud – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)



![8. Importar el dataset al servidor cloud – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)




Volver a AutoDL: copiar la «orden de conexión», pegar la información y pulsar «Conectar»
![8. Importar el dataset al servidor cloud – 4](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)



![8. Importar el dataset al servidor cloud – 5](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)



![8. Importar el dataset al servidor cloud – 6](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)



![8. Importar el dataset al servidor cloud – 7](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)



![8. Importar el dataset al servidor cloud – 8](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)




Crear la carpeta `data` en el directorio lerobot del servidor
![8. Importar el dataset al servidor cloud – 9](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)




Arrastrar la carpeta del dataset a la derecha y esperar la transferencia
![8. Importar el dataset al servidor cloud – 10](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)




#### 9. Entrenamiento del dataset

Ver [E. Entrenamiento y evaluación del dataset] de este tutorial; ejecutar el comando de entrenamiento

#### 10. Exportación del modelo

Tras el entrenamiento, exportar el modelo desde el directorio train
![10. Exportación del modelo – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)




## G. Preguntas frecuentes

Con este tutorial, clonar el repositorio recomendado https://github.com/JuxiTechnology/lerobot.git

El repositorio recomendado es la versión estable validada; el repositorio oficial de Lerobot se actualiza en tiempo real y puede causar problemas imprevistos (versiones de dataset distintas, comandos distintos).

- [Con RealSense, adaptar los comandos](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- En Jetson: sin número/duración de episodios, interrumpir con ctrl+z desconecta brazo y cámara; tras reconectar, todos los puertos cambian.

Añadir los parámetros de episodios y duración al comando de evaluación, p. ej.:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- Al calibrar IDs de servos:

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

Comprobar bien el cable de comunicación con el servo y la tensión de alimentación.

- Ante:

```Bash
Could not connect on port "/dev/ttyACM0"
```

Si `ls /dev/ttyACM*` muestra ACM0 pero no conecta: permiso de puerto olvidado – `sudo chmod 666 /dev/ttyACM*`.

- Ante:

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```

Instalar ffmpeg 7.1.1: `conda install ffmpeg=7.1.1 -c conda-forge`.
![G. Preguntas frecuentes – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)




- Ante:

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

Comprobar que el brazo del puerto indicado recibe alimentación y que ningún cable de servo bus esté flojo; el LED apagado señala el cable flojo del servo anterior.

- Al calibrar:

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

Apagar y encender el brazo y recalibrar; útil también con ángulos MAX de decenas de miles. Si no, recalibrar el servo (calibración central + escritura de ID).

- En la evaluación:

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

Eliminar la carpeta `eval_` y relanzar.

- En la evaluación:

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

Las claves (front, side ...) de `--robot.cameras` deben coincidir exactamente con la recolección.

## Encontrar el servo en Windows (software host de depuración Feetech)

Para la depuración, cualquier PC Windows puede programar, depurar o probar el servo mediante USB. Para ello, descargue el [software Feetech](https://www.feetechrc.com/software.html). Para sistemas Ubuntu puede usarse la [herramienta FT_SCServo_Debug_Qt](https://github.com/Kotakku/FT_SCServo_Debug_Qt).

[fddebug-master.zip]

Seleccionar el número de puerto, establecer la velocidad en baudios en 1000000, abrirlo y hacer clic en "Search"

![Encontrar el servo en Windows software host de depuración Feetech – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)

## Control por simulación ROS2 (se puede implementar de forma independiente)

https://github.com/holmsslk/so-arm-moveit-hardware

## Configurar el ID del servo y la calibración mediana en la web

https://bambot.org/feetech.js?lang=zh

1. Introducir 0 o 1 según el modelo del servo y hacer clic en "Connect".

![Configurar el ID del servo y la calibración mediana en la web – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2. Escanear los servos con IDs 1 a 6; el ID correspondiente se confirma mediante FOUND en los resultados del escaneo. Ejemplo: el servo ID 1 de la imagen ya fue escaneado.

![Configurar el ID del servo y la calibración mediana en la web – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3. Configuración de ID y calibración mediana

① El campo de ID actual corresponde al ID del servo escaneado

② Introducir un número en "Gestión de ID" y hacer clic en "Change ID" para configurar el ID

③ Calibración mediana (el valor mediano del servo STS3215 es 2047 y el del SCS0009 es 511)

Servo STS: introducir 2047 en "Position Control" y hacer clic en "Set"

Servo SCS: introducir 511 en "Position Control" y hacer clic en "Set".

![Configurar el ID del servo y la calibración mediana en la web – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)
