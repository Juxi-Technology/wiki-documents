---
title: "Control de simulación en ROS2"
description: "Control de simulación del SO-ARM101 en ROS 2: descripción del robot, controlador de hardware, simulación en Gazebo y planificación de movimiento con MoveIt 2."
---

# Control de simulación en ROS2

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

Espacio de trabajo completo de ROS 2 para el brazo robótico de seis grados de libertad SO-ARM101, que abarca la descripción del robot, el controlador de hardware integrado, la simulación en Gazebo y la planificación de movimiento con MoveIt 2.

El SO-ARM101 es el brazo esclavo de código abierto de segunda generación diseñado conjuntamente por [TheRobotStudio](https://www.therobotstudio.com/) y la comunidad [LeRobot](https://huggingface.co/lerobot); utiliza seis servos STS3215, una placa de control de servos y piezas de PLA+ impresas en 3D.

**Nota: ****el brazo robótico necesita la calibración de la posición central; realízala cuando todas las articulaciones estén en la posición intermedia de su rango de giro**

## Estructura de paquetes

Plataforma objetivo: **ROS 2 Humble / Jazzy**.

---

## Preparación del entorno ROS2

Antes de compilar este proyecto, asegúrate de que el sistema tenga instalados ROS 2 y los componentes relacionados.

### Requisitos del sistema

- Ubuntu 22.04 (recomendado) o 24.04

- Al menos 4 GB de memoria

- El modo de hardware real requiere un puerto serie USB

### 0.1  Instalar ROS 2 Humble

```Bash
# Configurar el locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Añadir la fuente de software de ROS 2
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Instalar ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  Instalar las herramientas de compilación y las dependencias

```Bash
# Herramienta de compilación colcon
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  Configurar las variables de entorno

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  Configurar los permisos del puerto serie (necesario para el hardware real)

**Configuración permanente (recomendada)**:

```Bash
sudo usermod -a -G dialout $USER
# Surte efecto tras cerrar sesión y volver a iniciarla
```

**Configuración temporal (debe volver a ejecutarse tras cada reinicio)**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

## Instalar el entorno del espacio de trabajo

```Markdown
# Paso 1  Crear el espacio de trabajo
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# Paso 2  Copiar el código fuente
cp -r /path/to/SO-ARM101_ROS2 ./

# Paso 3  Instalar las dependencias del sistema
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# Paso 4  Compilar todos los paquetes
colcon build --symlink-install

# Paso 5  Cargar el entorno  ← debe ejecutarse en cada terminal nuevo
source install/setup.bash
```

**Nota sobre el hardware real** — el paquete `so_arm_hardware` ya está integrado. No es necesario instalar controladores adicionales;
se comunica directamente con los servos STS3215 a través del puerto serie mediante el protocolo SCS.

## Verificación visual

Empezar por aquí es lo más sencillo: no se necesita controlador ni hardware.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz mostrará el modelo completo del robot; arrastra los controles deslizantes para verificar si el movimiento de cada articulación es correcto.

---

## Prueba de los controladores (hardware virtual / modo Mock)

Todavía no se necesita un robot real; todo se ejecuta en memoria.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

Cuando aparezcan los siguientes registros, significa que está listo:

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**Nota**: el modo de simulación solo inicia dos controladores (`joint_state_broadcaster` y
`joint_trajectory_controller`). Se ha eliminado `gripper_controller`, y la pinza
es controlada de forma unificada por `joint_trajectory_controller` junto con las 6 articulaciones.

### Funciones de los controladores

## Planificación de movimiento con MoveIt (hardware Mock)

**Solo se necesita un terminal** — MoveIt inicia automáticamente la pila de controladores en su interior.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

Una vez abierta la ventana de RViz:

1. En el panel **MotionPlanning**, **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. Haz clic sucesivamente en **Plan** y **Execute**

Posturas predefinidas disponibles: `open`, `zero`, `extended`, `rest`.

### 4.1  Descripción detallada de la interfaz de MoveIt

Tras iniciar RViz, en el lado izquierdo se muestra el panel **MotionPlanning**, que incluye las siguientes pestañas principales:

#### Pestaña Planning

#### Parámetros de planificación

> **Recomendación para la primera prueba**: establece Velocity y Acceleration en 0.3 para reducir la velocidad de movimiento y garantizar la seguridad.
> 
> 

#### Pestaña Scene Objects

- Añadir obstáculos (Box / Sphere / Cylinder) para la detección de colisiones

- Importar / exportar escenas

- MoveIt planifica evitando automáticamente los obstáculos

#### Pestaña Stored States

- Guardar las posturas habituales del brazo robótico

- Posturas predeterminadas: `open`, `zero`, `extended`, `rest`

### 4.2  Flujo de operación básico

#### Método A: arrastre interactivo (recomendado)

1. En la vista 3D, localiza el **marcador interactivo** del extremo del brazo robótico (flechas y anillos de colores)

2. Arrastra las flechas para trasladar la posición del extremo y arrastra los anillos para rotar la orientación

3. El sistema resuelve automáticamente la cinemática inversa (IK) y actualiza en tiempo real los ángulos de las articulaciones

4. Haz clic en **Plan** para ver la trayectoria planificada (en naranja)

5. Tras confirmarlo, haz clic en **Execute** para ejecutar

> Si hay tirones al arrastrar, se recomienda partir primero de la postura predefinida `rest` y después arrastrar.
> 
> 

#### Método B: posturas predefinidas

1. Menú desplegable **Query Goal State** → selecciona `open` / `extended` / `rest`, etc.

2. Haz clic en **Update**

3. Haz clic en **Plan**

4. Haz clic en **Execute**

#### Método C: establecer manualmente los ángulos de las articulaciones

1. **Query Goal State** → pestaña **Joints**

2. Arrastra los controles deslizantes de cada articulación para establecer el ángulo objetivo

3. Referencia del rango de las articulaciones:

1. Haz clic en **Update**

2. Haz clic en **Plan**

3. Haz clic en **Execute**

#### Método D: objetivo válido aleatorio

Haz clic en el botón **Random Valid** para generar automáticamente una postura aleatoria alcanzable y, a continuación, Plan → Execute.

### 4.3  Precauciones de seguridad

1. **Reducir la velocidad en el primer uso**: establece Velocity / Acceleration en 0.1–0.3

2. **Parada de emergencia**: pulsa Ctrl+C en cualquier momento para terminar el programa, o desconecta la alimentación

3. **Límites de las articulaciones**: MoveIt no planificará fuera del rango de `joint_limits.yaml`, pero hay que asegurarse de que la configuración sea correcta

4. **Hardware real**: antes de ejecutar, asegúrate de que haya suficiente espacio alrededor del brazo robótico

### Resumen de la configuración de MoveIt

---

## Simulación en Gazebo

La simulación en Gazebo requiere **ejecutar 4 terminales a la vez**. Sigue el orden estrictamente.

### 5.1  Iniciar la simulación en Gazebo  (terminal 1)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Espera a que aparezca la ventana de Gazebo; el robot permanecerá brevemente en el aire y luego caerá al suelo.

### 5.2  Cargar el controlador de trayectoria  (terminal 2)

Gazebo solo activa `forward_position_controller` de forma predeterminada, por lo que hay que cambiar manualmente a
`joint_trajectory_controller`:

```Markdown
#  Terminal 2
source ~/so101_ws/install/setup.bash

# Paso A — Desactivar forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# Paso B — Cargar y activar joint_trajectory_controller con el spawner
ros2 run controller_manager spawner joint_trajectory_controller

# Paso C — Verificar
ros2 control list_controllers
```

Salida esperada:

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ ¡No uses primero `ros2 control load_controller`! Dejará el controlador en
el estado `unconfigured`, lo que impedirá que el spawner lo active. Si ya lo has ejecutado, primero
`unload_controller` y vuelve a empezar.

### 5.3  Iniciar move_group  (terminal 3)

```Bash
#  Terminal 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  Iniciar RViz  (terminal 4)

```Bash
#  Terminal 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

Cuando RViz esté listo:

1. **Planning Group → manipulator**

2. **Goal State → open** (o `extended`, `rest`)

3. Haz clic sucesivamente en **Plan** y **Execute**

Las articulaciones del brazo en Gazebo seguirán el movimiento.

**Nota**: debido a la limitación de la ganancia PID de la versión Humble de `gz_ros2_control`,
es posible que la pinza no se abra físicamente en Gazebo (los registros de ejecución seguirán mostrando éxito).
Los modos Mock y de hardware real no tienen este problema.

### 5.5  Modo sin interfaz gráfica (sin GUI)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  Solución de problemas: cuando la carga falla repetidamente

Si el spawner informa repetidamente de `Failed to activate controller`, ejecuta los siguientes pasos para reiniciar por completo:

```Bash
# 1. Descargar el controlador que se ha bloqueado
ros2 control unload_controller joint_trajectory_controller

# 2. Desactivar forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. Volver a ejecutar el spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## Hardware real

Requisito previo: el brazo robótico SO-ARM101 ya está montado y la placa de control de servos está conectada al ordenador mediante USB.

### 6.1  Iniciar los controladores (se puede omitir)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

El plugin `so_arm_hardware` realiza automáticamente lo siguiente:

1. Abrir el puerto serie

2. Escanear los ID de los 6 servos (1–6)

3. Verificar que todos los servos responden

4. Activar el par y leer la posición actual

Cuando los controladores estén listos, abre otros dos terminales para iniciar MoveIt:

```Bash
#  Terminal 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  Terminal 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt (inicio con un solo clic)

> El siguiente comando **sustituye** al apartado 6.1 (no los ejecutes a la vez; detén los comandos de 6.1) —— `demo.launch.py` ya incluye internamente la pila de controladores.
> 
> 

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  Solución de problemas del puerto serie

### 6.4  La visualización en RViz no coincide con la postura real

Si la postura del brazo robótico en RViz no coincide con la del hardware real (por ejemplo, desviación de articulaciones o falsos positivos de colisión):

1. Confirma que los servos han completado la calibración de la posición central

2. Ajusta el `position_offset` de cada articulación en `so_arm101.ros2_control.xacro`

3. Fórmula de conversión: `nuevo offset = offset actual + (rad mostrados actualmente / 0.00153398)`

4. Tras modificarlo, vuelve a compilar el paquete `so_arm101_description`

---

## Preguntas frecuentes

### Q1: Al compilar aparece "package not found"

**R**: Asegúrate de que todas las dependencias del sistema estén instaladas correctamente y de haber hecho source del entorno ROS 2:

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2: Al iniciar se muestra "Permission denied" al acceder al puerto serie

**R**: Comprueba los permisos del puerto serie:

```Bash
# Solución temporal
sudo chmod 666 /dev/ttyACM0

# Solución permanente (surte efecto tras cerrar sesión)
sudo usermod -a -G dialout $USER
```

### Q3: La planificación de MoveIt falla con el mensaje "Motion planning start tree could not be initialized"

**R**: Normalmente hay dos causas:

1. **Articulación fuera de los límites** — comprueba la salida de `FixStartStateBounds` en los registros. La tolerancia actual es
0.3 rad; si el exceso está dentro de este rango, se aceptará. De lo contrario, hay que ajustar `start_state_max_bounds_error`
o comprobar el desplazamiento de los servos.

2. **Colisión en el estado inicial** — comprueba la salida de `FixStartStateCollision` en los registros. Si aparece
"Unable to find a valid state nearby", significa que la postura actual presenta una autocolisión.
Es posible que el brazo robótico esté en una postura plegada (por ejemplo, que el gripper toque el shoulder) o que el desplazamiento sea incorrecto.
Ajusta `position_offset` y vuelve a intentarlo.

### Q4: El brazo robótico no se mueve tras Execute

**R**: Comprueba el estado de los controladores:

```Bash
ros2 control list_controllers
```

Asegúrate de que `joint_trajectory_controller` esté en estado `active`. Si no lo está, vuelve a ejecutar el spawn:

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5: RViz tarda en iniciarse o se queda colgado

**R**: Es normal. Al iniciarse, MoveIt carga el modelo URDF, el plugin de detección de colisiones,
los solucionadores cinemáticos, etc.; el primer inicio tarda unos 10 segundos.

### Q6: La trayectoria planificada no es fluida o presenta vibraciones

**R**: Prueba los siguientes métodos:

- Cambia a otro planificador (en RViz, selecciona `RRTConnect` en el menú desplegable Planner)

- Aumenta Planning Time a 10 segundos

- Confirma que el objetivo está dentro del espacio de trabajo (usando la prueba `Random Valid`)

### Q7: La pinza no se mueve en Gazebo

**R**: Esta es una limitación de la ganancia PID codificada de forma fija en la versión Humble de `gz_ros2_control`
(fijada en 0.1) y no se puede sobrescribir mediante parámetros URDF. En los registros, Execute muestra éxito,
pero la pinza no se abre en la simulación física de Gazebo. Los modos Mock y de hardware real no tienen este problema.

## Anexo: referencia rápida de los parámetros de inicio

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## Estructura de directorios

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Python 工具库
├── so_arm101_description/          # URDF · 控制器 · 网格 · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · 规划器 · 启动文件
├── so_arm_gz/                      # Gazebo 仿真启动
├── so_arm_hardware/                # 内置 SCS 串口驱动（C++）
└── Simulation/                     # 原始 CAD URDF（参考保留）
```

<RelatedProducts slugs="so-arm101" />
