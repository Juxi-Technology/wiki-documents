---
title: Brazo robótico SO-ARM101 de 7 ejes
category: robot
description: "Brazo robótico open source SO-ARM101 de 7 ejes de Juxi Technology — rotación de muñeca de 90°, servos de bus de 12V y 30kg.cm, integración profunda con LeRobot, ensamblado de fábrica con una serie de tutoriales completa"
keywords: [so-arm101, 7-dof, 7 ejes, brazo robótico, leRobot, teleoperación, aprendizaje por imitación]
---

# Brazo robótico SO-ARM101 de 7 ejes

> **[Comprar en la tienda](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Descripción general

El SO-ARM101 es un brazo robótico open source profundamente optimizado a partir del SO-ARM100. El trazado de cables revisado y el emparejamiento de motor y engranaje eliminan el problema de rotura de los cables de las articulaciones, y las mejoras de rendimiento permiten el seguimiento líder-seguidor en tiempo real. **Esta es la versión de 7 ejes**: añade un servo de rotación (guiñada) de muñeca sobre el modelo de 6 ejes, lo que otorga a la muñeca mucha más libertad de postura, más puntos alcanzables y agarre de precisión desde múltiples ángulos.

Se adapta al kit **LeRobot** de Hugging Face y se conecta directamente a modelos de PyTorch y conjuntos de datos compartidos, por lo que el aprendizaje por imitación y el aprendizaje por refuerzo son fáciles de llevar a la práctica. Incluye un tutorial de montaje completo y un kit DIY: estudiantes, investigadores y creadores pueden trabajar con robótica inteligente para aprender, investigar y crear.

**De un vistazo**: 7 ejes con rotación de muñeca de 90° · servos de alto par de 12V a 30kg.cm · pinza flexible de TPU opcional · recolección de datos con doble vista · inferencia a bordo en NVIDIA Jetson y D-Robotics RDK · ensamblado de fábrica y listo para usar · compatible con el entrenamiento de modelos ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5.

## Ventajas clave

### 7 grados de libertad con rotación de muñeca de 90°

La versión de 7 ejes añade un servo de rotación (guiñada) izquierda/derecha de la muñeca al diseño de 6 ejes, de modo que la muñeca puede acercarse al objetivo desde muchos más ángulos y alcanzar más puntos en el espacio de trabajo. Esa libertad adicional es lo que hace posible el agarre fino desde múltiples ángulos.

### Teleoperación líder-seguidor y aprendizaje por imitación

El brazo integra el framework de IA de Hugging Face. Con la teleoperación del brazo líder se graban los movimientos de demostración; después, un único entrenamiento permite obtener un modelo de aprendizaje por imitación y desplegar la política optimizada. Puede asumir tareas complejas y adaptarse a su entorno, cerrando el ciclo de automatización de principio a fin.

### Cobertura global con doble vista

La cámara montada en el brazo captura a corta distancia la posición espacial, el ángulo y la textura superficial del objetivo, lo que da lugar a una recolección de datos de mayor fidelidad, mientras que una cámara de escena con soporte de escritorio lee el entorno de trabajo en tiempo real. En conjunto, mantienen la operación precisa, responden con rapidez a los cambios y evitan derivas o bloqueos.

### Servos de bus 12V de alto par 30kg.cm

El brazo seguidor está unificado en 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) para garantizar un par de agarre suficiente bajo carga multieje, mientras que el brazo líder se mantiene en 7.4V para equilibrar la sensación de manejo y el coste. Un codificador magnético de 12 bits ofrece una precisión de 0.088° en cada eje.

### Soporte de entrenamiento multimodelo

Las políticas ACT, SmolVLA, Pi0, Pi0.5 y GR00T N1.5 pueden entrenarse y desplegarse en el mismo hardware, y es posible reutilizar directamente modelos preentrenados como `lerobot/smolvla_base`, `lerobot/pi0_base`, `lerobot/pi05_base` y `lerobot/xvla-widowx` del hub de modelos de LeRobot.

### Inferencia a bordo en NVIDIA y D-Robotics RDK

Basta con conectar un solo cable a un controlador Raspberry Pi, D-Robotics RDK o NVIDIA Jetson para ejecutar la inferencia en el propio brazo, con control de motores en tiempo real y retroalimentación del codificador.

### Ensamblado de fábrica y listo para usar

Cada unidad se entrega ensamblada, cableada y calibrada: basta con conectar la alimentación y el USB y la plataforma queda lista para la teleoperación y la recolección de datos.

### Pinza flexible actualizable

La pinza flexible es una mejora de la pinza rígida estándar, impresa en 3D con un material TPU flexible. Utiliza un diseño hueco con nervios de refuerzo internos y funciona con un principio de pinza de tipo aleta: se adapta a la forma del objeto que agarra y reduce la fuerza de contacto aplicada sobre él; es ideal para objetos blandos o fácilmente dañables (fruta, cristalería, huevos, procesado de alimentos) que una pinza rígida convencional no puede manipular con seguridad.

## Especificaciones

| Categoría | Especificación |
|----------|------|
| Tipo | Brazo robótico de teleoperación líder-seguidor |
| DOF | 7 (añade un eje de rotación / guiñada de muñeca respecto al modelo de 6 ejes) |
| Servos del brazo seguidor | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Servos del brazo líder | 7 × STS3215 de 7.4V — versión con amortiguación: 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147); versión sin amortiguación: 7 × C066 |
| Codificador | Codificador magnético de 12 bits (precisión de 0.088°) |
| Alimentación | Brazo líder 5V6A / Brazo seguidor 12V5A |
| Host | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Ecosistema | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Pinza | PLA rígida (estándar) o TPU flexible (mejora) |
| Ensamblaje | Ensamblado, cableado y calibrado de fábrica |

*Las disposiciones de servos y las configuraciones de paquete disponibles se detallan en la página de la tienda.*

## Tutoriales

- **[Curso completo del SO-ARM101 de 7 ejes](/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — configuración del entorno, sustitución de archivos para 7 ejes, calibración, teleoperación, recolección de datos, entrenamiento e inferencia, paso a paso
- [Sustitución de archivos para 7 ejes (adaptar un clon oficial de lerobot)](/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [Tutorial del SO-ARM101 (6 ejes)](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guía de selección de brazos robóticos](/tutorials/robot-arms/select-guide)
- [Introducción a la IA corporizada (LeRobot)](/topics/embodied-ai-intro)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
