---
title: Kit de desarrollo SO-ARM101
category: robot
description: "Kit de robótica de doble brazo open source de Juxi Technology — brazos de 6 DOF, ecosistema LeRobot, teleoperación/aprendizaje por imitación"
keywords: [so-arm101, brazo robótico, leRobot, teleoperación, doble brazo]
---

# Kit de desarrollo SO-ARM101

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

## Descripción general

El SO-ARM101 es el kit de desarrollo robótico de doble brazo 6-DOF open source de Juxi Technology, profundamente integrado con el ecosistema **LeRobot**. Brazo líder negro + brazo seguidor blanco, listo para teleoperación, recolección de datos de aprendizaje por imitación y entrenamiento de políticas.

**Características clave**:

- Dos brazos, 6 DOF cada uno, servos de bus
- Integración profunda con LeRobot (HuggingFace) — políticas ACT/Diffusion/Pi0
- Soporte Jetson / PC (Linux)
- Hardware totalmente de código abierto (esquemas/CAD/firmware)

## 1. Diseño de hardware: modular de alto rendimiento, fácil de ensamblar y personalizable

- **Materiales estructurales**: la estructura principal combina piezas impresas en 3D con componentes de carga reforzados; el cableado y el diseño de las articulaciones están optimizados para evitar interferencias de movimiento, equilibrando ligereza y durabilidad. El usuario puede imprimir por su cuenta piezas de repuesto o de ampliación estructural.

- **Configuración de accionamiento**: el brazo esclavo incorpora **6 servos con codificador magnético de 12V y 30KG de alto par**; junto con la retroalimentación del codificador magnético de 360° y un algoritmo de control PID, ofrecen un movimiento fluido sin vibraciones, alta precisión de posicionamiento repetitivo, gran potencia y movimientos precisos. El brazo maestro utiliza **6 servos de 7.4V**, con distintas relaciones de reducción asignadas según la carga de cada articulación, lo que facilita la enseñanza por arrastre manual.

- **Sistema de visión**: admite un sistema de visión inteligente de doble cámara; la cámara del extremo captura los detalles de agarre a corta distancia y la cámara global cubre todo el entorno de trabajo. La fusión de los datos de ambas cámaras construye un modelo tridimensional, que proporciona un abundante soporte de datos para el aprendizaje por imitación.

- **Conexión de control**: incorpora una placa de control de servos que se conecta directamente a un ordenador o a una Raspberry Pi mediante el puerto USB-C; es plug-and-play, simplifica el proceso de conexión del hardware y permite montar rápidamente un entorno de control.

## 2. Ecosistema de software: integración profunda con LeRobot, desarrollo de IA sin barreras

- **Compatibilidad con el framework principal**: adaptado en profundidad al **framework ML de robótica de código abierto LeRobot** de Hugging Face, construido sobre PyTorch, con modelos preentrenados, conjuntos de datos de múltiples escenarios y entornos de simulación integrados; es compatible con conocidos conjuntos de datos de código abierto como Stanford ALOHA.

- **Comunicación de baja latencia**: utiliza el **motor de flujo de datos distribuido DORA**, que logra una interacción de baja latencia entre el hardware y los algoritmos. El rendimiento de ejecución de Python es 17 veces más rápido que ROS2 y admite la recarga en caliente del código, por lo que permite ajustar la política en tiempo real sin necesidad de reiniciar.

- **Código abierto de pila completa**: los archivos de impresión 3D del hardware, el código de control del software, los scripts de entrenamiento de IA y el conjunto completo de tutoriales son **totalmente de código abierto**; el usuario puede modificarlos libremente y desarrollar sobre ellos, ampliando funciones personalizadas con rapidez.

## 3. Escenarios de aplicación principales: de la iniciación a la implementación, adaptación a todo tipo de escenarios

1. **Iniciación a la educación robótica**: ofrece tutoriales de todo el proceso, desde el montaje del brazo robótico y la programación básica hasta el despliegue de políticas de IA, acompañados de una interfaz de operación visual y código de ejemplos; los usuarios sin conocimientos previos pueden dominar rápidamente el control robótico y las habilidades de aplicación de IA.

2. **Validación de algoritmos científicos**: centrado en la investigación del **aprendizaje por imitación y el aprendizaje por refuerzo**, admite grabar datos de operación humana mediante VR para entrenar al robot; caso típico: a partir de 50 vídeos de operación de 15 segundos, basta con 2 horas de entrenamiento para dominar tareas como doblar ropa, insertar una llave o clasificar materiales.

3. **Prototipos industriales ligeros**: valida soluciones de automatización a bajo costo; se adapta a escenarios como **manipulación de materiales, ensamblaje de precisión y clasificación de piezas**, y ofrece las funciones principales de un brazo robótico de nivel industrial a un costo de gama de miles de yuanes, lo que permite implementar rápidamente la validación de prototipos.

## Especificaciones

| Categoría | Especificación |
|------|------|
| Tipo | Robot de teleoperación de doble brazo |
| DOF | 6 DOF por brazo |
| Accionamiento | Servos de bus Feetech |
| Host | PC (Linux) / Jetson |
| Ecosistema | LeRobot, ROS 2, ROS 1 |
| Alimentación | Líder 5V6A / Seguidor 12V5A |
| Carga útil | 500g |
| Repetibilidad | ±0.1mm |
| Radio de trabajo | 520mm |
| Comunicación | USB-C |
| Material | Bambu Lab PLA+ |
| Dimensiones (líder / seguidor) | 111×239×525 mm / 111×173×532 mm |

![Plano acotado de los brazos líder y seguidor](../../../public/images/products/so-arm101/dimensions.jpg)

## Inicio rápido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutoriales

- [Tutorial SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montaje SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guía de selección de brazos robóticos](/es/tutorials/robot-arms/select-guide)
- [Introducción a la IA corporizada (LeRobot)](/es/topics/embodied-ai-intro)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
