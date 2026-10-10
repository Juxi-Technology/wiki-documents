---
title: Información del producto
---

# Información del producto

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

Proyecto de control del cardán de cámara 2-DOF, compatible con seguimiento automático de color, rostros y códigos QR.

---

## 📋 Características

- 🎮 Control manual del cardán por teclado
- 🎯 Seguimiento automático de objetos por color
- 👤 Seguimiento facial automático
- 📱 Seguimiento automático de códigos QR
- 🔒 Mecanismo de bloqueo de objetivo
- 🚀 Inicio rápido (con backend DSHOW)

---

## 🛠 Configuración de hardware

- **Modelo de servo**: SCS009
- **Asignación de servos**:
  - Servo n.º 1: control de rotación izquierda-derecha
  - Servo n.º 2: control de inclinación arriba-abajo
- **Método de comunicación**: placa controladora de bus serie
- **Chip de la placa controladora**: CH343
- **Velocidad en baudios**: 1 Mbps por defecto

### Parámetros del servo


|Parámetro|Servo n.º 1 (izquierda-derecha)|Servo n.º 2 (arriba-abajo)|
|---|---|---|
|Rango|220-802|220-511|
|Posición central|511|511|
|Descripción|220 = izquierda, 802 = derecha|220 = arriba, 511 = posición central|


---

## 📁 Estructura del proyecto

```python
2-DOF-Camera-Gimbal/
├── docs/            # Documentación y tutoriales
│   └── tutorials/  # Archivos de tutoriales
├── examples/        # Programas de ejemplo
│   ├── auto_tracking_demo.py  # Demostración completa de seguimiento
│   ├── basic_usage.py        # Ejemplo de uso básico
│   ├── keyboard_control.py    # Ejemplo de control por teclado
│   └── diagnostic.py         # Herramienta de diagnóstico
├── src/            # Código fuente
│   ├── detectors/  # Detectores de objetivos
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # Controlador de seguimiento
│   │   └── tracking_controller.py
│   └── sc_servo.py  # Biblioteca de comunicación del servo
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Inicio rápido

### Instalar las dependencias

```python
pip install -r requirements.txt
```

### Buscar dispositivos disponibles

**Buscar cámaras disponibles**

```python
python examples/list_cameras.py
```

**Buscar puertos serie disponibles**

```python
python examples/list_ports.py
```

### Ejecutar la demostración

Configura mediante argumentos de línea de comandos:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Descripción de los parámetros**
- `--camera` o `-c`: índice de la cámara (predeterminado 0)
- `--port` o `-p`: dispositivo de puerto serie (predeterminado COM3)
- `--color` o `-C`: color predeterminado (predeterminado red)

---

## 🎮 Instrucciones de uso

### Atajos de teclado


|Tecla|Función|
|---|---|
|1|Cambiar al modo de seguimiento facial|
|2|Cambiar al modo de seguimiento de color|
|C|Conectar el cardán|
|R|Centrar el cardán|
|T|Bloquear/iniciar el seguimiento del objetivo|
|S|Detener el seguimiento|
|X|Modo de color: rojo|
|Y|Modo de color: verde|
|Z|Modo de color: azul|
|Q|Salir del programa|


### Flujo de uso del seguimiento automático

1. Pulsa `C` para conectar el cardán
2. Selecciona el modo (pulsa `1` o `2`)
3. Coloca el objeto objetivo en el centro de la imagen
4. Pulsa `T` para bloquear el objetivo
5. Mueve el objetivo y el cardán lo seguirá automáticamente

---

## 📚 Documentación y tutoriales

Para ver los tutoriales detallados, consulta el directorio docs/tutorials/:
- 01-快速开始指南.md - Inicio rápido de uso
- 02-硬件与环境准备.md - Lista de hardware y preparación del entorno
- 03-基础使用.md - Control por teclado y uso básico
- 04-高级功能与追踪.md - Funciones avanzadas y seguimiento en detalle
- 05-故障排除.md - Problemas frecuentes y soluciones

---

## 🔧 Notas técnicas

### Parámetros de control del seguimiento

Se pueden ajustar en `src/trackers/tracking_controller.py`:

|Parámetro|Valor predeterminado|Descripción|
|---|---|---|
|kp_pan|0.08|Ganancia proporcional del seguimiento izquierda-derecha|
|kp_tilt|0.12|Ganancia proporcional del seguimiento arriba-abajo|
|dead_zone|30|Zona muerta (píxeles); dentro de este rango no se mueve|
|min_move_interval|0.15|Intervalo mínimo de movimiento (segundos)|


### Mecanismo de bloqueo de objetivo

Tras el bloqueo, el sistema selecciona el objetivo según las siguientes condiciones:
- Mayor cercanía al punto de bloqueo (peso 70%)
- Tamaño más similar al del momento del bloqueo (peso 30%)

---

## 📖 Especificaciones del servo

- **Modelo**: SCS009
- **Voltaje de funcionamiento**: 4-7,4 V (6 V típico)
- **Par de bloqueo**: 2,3 kg·cm a 6 V
- **Protocolo**: puerto serie asíncrono semidúplex (TTL)
