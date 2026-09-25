---
title: "Inferencia en D-Robotics RDK S100"
description: "Ejecute la inferencia del SO-ARM101 de 7 ejes en el controlador D-Robotics RDK S100 siguiendo el flujo del fabricante para la política ACT de LeRobot."
---

# Inferencia en D-Robotics RDK S100

Para el flujo de implementación concreto puedes consultar este enlace[Documentación del flujo completo de LeRobot ACT Policy](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## Despliegue de extremo a extremo del modelo ACT en RDK S100/S100P

Esta sección te guiará para completar el ciclo completo de despliegue del modelo ACT en el hardware de la serie RDK S100 de D-Robotics. Todo el proceso se divide en tres fases principales: **exportación del modelo**, **compilación y cuantización** y **ejecución en la placa**.

**Notas previas:**

- **Máquina de desarrollo \(Host\):** se usa para ejecutar los pasos 1 y 2; normalmente es tu máquina de entrenamiento del modelo (necesita un rendimiento aceptable y tener Docker instalado).

- **Placa \(Edge\):** D-Robotics RDK S100/S100P, se usa para ejecutar el paso 3.

- **Cadena de herramientas:** este artículo depende del repositorio `rdk_LeRobot_tools`; para más detalles, consulta la [dirección del repositorio de GitHub](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Aviso importante de compatibilidad de versiones \(lectura obligatoria\):** el flujo de exportación ONNX de la versión actual de `rdk_LeRobot_tools` es totalmente compatible con la versión **LeRobot datasets v2\.1**. Como la última versión v3\.0 tiene cambios en la estructura de datos, **se recomienda encarecidamente** que, antes de realizar las operaciones de esta sección, cambies el repositorio principal `lerobot` original a un commit específico compatible con v2\.1, para garantizar que el flujo de exportación sea fluido. 

*Commit ID recomendado:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Fase 1: Exportación del modelo a formato ONNX 💻 \(en la máquina de desarrollo\)

En primer lugar, debemos exportar el **modelo entrenado con PyTorch** a un formato intermedio (ONNX).



#### **1\. Clonar el repositorio de la cadena de herramientas** 

Entra en tu directorio de trabajo `lerobot` y clona la cadena de herramientas exclusiva de RDK:

```Bash
cd lerobot

# 1. Cambiar a la versión estable compatible con v2.1 datasets
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Clonar la cadena de herramientas exclusiva de D-Robotics RDK
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Configurar los parámetros de exportación** 

Edita el archivo `rdk_LeRobot_tools/bpu_export_config.yaml` y modifica la configuración según tus rutas reales:

```YAML
dataset:
  root: "data/so101_pick_place" # La ruta absoluta o relativa de tu conjunto de datos
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # La ruta de los pesos del modelo PyTorch original
type: "nash-e" # Arquitectura de hardware de destino; RDK S100 corresponde a nash-e / S100P corresponde a nash-m
```



#### 3\. Ejecutar el script de exportación

```Bash
# Exportar ONNX (máquina de desarrollo)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Señal de éxito**: en el directorio actual se genera la carpeta `bpu_export_output`, que contiene el script `build_all.sh` y los datos de calibración de cuantización necesarios más adelante.



### Fase 2: Compilar el modelo BPU 🐳 \(en el entorno Docker de la máquina de desarrollo\)

La cuantización y compilación del modelo BPU de D-Robotics requiere un entorno OpenExplorer \(OE\). Recomendamos usar Docker para aislar el entorno.



#### **1\.** **Preparar el entorno Docker y la imagen** 

Asegúrate de que la máquina de desarrollo tiene Docker instalado ([guía de instalación oficial](https://docs.docker.com/engine/install/)). Descarga la imagen CPU recomendada y cárgala:

```Bash
# Cargar el paquete comprimido de la imagen offline descargada
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Iniciar el contenedor de compilación**

**Consejo para evitar problemas**: la compilación del modelo necesita bastante memoria compartida. Asegúrate de añadir el parámetro `--shm-size=15g`; de lo contrario es muy fácil que se produzca un error de memoria IPC.

Monta el directorio de trabajo de la máquina de desarrollo (que contiene la carpeta que acabas de exportar) dentro del contenedor:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Nota: sustituye `<docker-image-name>` por el nombre real de la imagen que veas con `sudo docker images`.\)



#### **3\.** **Ejecutar la compilación dentro del contenedor** 

Una vez dentro del contenedor, ejecuta el script de compilación con un solo comando:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Revisar los artefactos de compilación** 

Al terminar la compilación, se generará la carpeta `bpu_output/` dentro de `bpu_export_output`. Esta contiene todos los archivos principales necesarios para la ejecución en la placa RDK: 

- Haz clic para ver la estructura del directorio `bpu_output/`

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(archivo del modelo cuantizado\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(archivo del modelo cuantizado\)

    - `action_mean.npy` y otros parámetros de normalización del conjunto de datos

    - `camera1_mean.npy` y otros parámetros estadísticos de la cámara

---

### Fase 3: Despliegue e inferencia en la placa 🤖 \(en RDK S100\)

**Comprobación de requisitos previos:**

1. La placa RDK ya tiene configurado el entorno de ejecución `D-Robotics/lerobot` y ha instalado `hbm_runtime`.

2. Ya has copiado la carpeta `bpu_output/` completa generada en el paso anterior a la placa RDK mediante `scp`, una memoria USB u otro método.

3. Ya has completado la configuración básica de teleoperación, asegurándote de que el puerto serie del brazo robótico, el puerto USB de la cámara y los archivos de calibración estén bien configurados.



#### **1\.** **Ejecutar la inferencia acelerada por BPU**

En la terminal de la placa RDK, entra en el directorio de la cadena de herramientas y arranca el script de control:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Solución de problemas comunes \(Troubleshooting\)

Si encuentras problemas durante el despliegue real, revisa la siguiente lista:

- **¿El brazo robótico no se mueve?**

    - Comprueba el montaje del dispositivo: escribe `ls /dev/ttyACM*` en la terminal y confirma que el número de puerto serie del brazo robótico es correcto.

    - Comprueba los permisos: prueba a ejecutar el script de inferencia con `sudo`, o añade el usuario actual al grupo `dialout`.

- **¿Errores al capturar el flujo de la cámara / imagen anómala / el brazo robótico tiembla sin moverse?**

    - Comprueba si el índice de la cámara (Camera Index) ha cambiado por conexiones en caliente y verifica que la configuración de parámetros de la cámara en el código se corresponda con los `/dev/video*` reales.

- **¿Al copiar desde la máquina de desarrollo los archivos generados por el contenedor aparece "permiso denegado"?**

    - Los archivos generados en el directorio montado por Docker pertenecen a root por defecto; ejecuta `sudo chown -R $USER:$USER bpu_export_output` en la máquina de desarrollo para solucionarlo.

