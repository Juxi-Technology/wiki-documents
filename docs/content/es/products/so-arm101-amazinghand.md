---
title: "Brazo robótico SO-ARM101 y AmazingHand con mano diestra de código abierto"
category: robot
description: "El SO-ARM101 y AmazingHand es una plataforma completa de IA encarnada de código abierto que combina el brazo robótico de 6 ejes SO-ARM101 con la mano…"
keywords: ["Brazo robótico SO-ARM101 y AmazingHand con mano diestra de código abierto", "SO-ARM101", "AmazingHand", "LeRobot", "SCS0009", "STS3215"]
---

# Brazo robótico SO-ARM101 y AmazingHand con mano diestra de código abierto

## Descripción general del producto

El SO-ARM101 y AmazingHand es una plataforma completa de IA encarnada de código abierto que combina el brazo robótico de 6 ejes SO-ARM101 con la mano diestra de cuatro dedos y 8 grados de libertad AmazingHand. La pinza paralela de serie se sustituye por una mano de cuatro dedos accionada por un único servo del brazo líder, que logra un agarre y una extensión sincronizados de los cuatro dedos mediante un mecanismo sencillo, fiable y montado en fábrica. Basada en el ecosistema LeRobot de Hugging Face, admite teleoperación líder-seguidor, recogida de datos con doble vista y aprendizaje por imitación de extremo a extremo con ACT, SmolVLA, Pi0, Pi0.5 y GR00T N1.5: el punto de partida más sencillo para pasar de una pinza a una mano diestra.

**SO-ARM101**es un brazo robótico de 6 ejes de código abierto profundamente optimizado a partir del SO-ARM100. El nuevo trazado de cables y el nuevo emparejamiento de motores y engranajes eliminan el problema de rotura de cables en las articulaciones y ya no limitan su rango de movimiento, además de admitir el seguimiento líder-seguidor en tiempo real y una compatibilidad total con el kit de herramientas LeRobot de Hugging Face.

**AmazingHand**es un kit de desarrollo de mano robótica de 8 grados de libertad, de código abierto, bajo coste y totalmente imprimible en 3D. Sus servos van alojados por completo dentro del cuerpo de la mano con un diseño interno sin cables, y cada dedo se acciona mediante dos articulaciones, lo que combina destreza con una colaboración natural entre dedos.

## Ventajas principales

### Mano diestra de cuatro dedos con 8 grados de libertad

AmazingHand incorpora cuatro dedos (pulgar, índice, corazón y anular), dos falanges articuladas por dedo y 8 grados de libertad en total. Un mecanismo de articulación paralela permite que los dedos trabajen juntos para lograr un agarre más natural, mientras que todos los servos van dentro del cuerpo de la mano, sin cables externos, para una construcción compacta y limpia.

### Un solo servo con articulación acciona los cuatro dedos

El servo n.º 6 (STS3215) del brazo líder acciona los ocho servos de bus SCS0009 de la mano mediante un mapeo de recorrido, de modo que un solo movimiento produce un agarre sincronizado de los cuatro dedos (puño cerrado) o su extensión (palma abierta). Mecánica sencilla, control fiable y sin programación compleja en el lado de la mano.

### Aprendizaje por imitación de extremo a extremo con ACT, SmolVLA, Pi0, Pi0.5 y GR00T N1.5

Ejecuta la teleoperación líder-seguidor para grabar datos de demostración y, después, entrena una política de aprendizaje por imitación en una sola pasada. Un conjunto de datos pequeño basta para que el brazo seguidor complete tareas de agarre predefinidas de forma autónoma, y todo el ciclo puede cerrarse sin escribir código desde cero.

### Recogida de datos con doble vista

Una cámara cenital montada en soporte cubre toda el área de trabajo desde arriba para establecer la posición espacial y la orientación de los objetos objetivo, mientras que una cámara lateral sobre soporte de sobremesa transmite el contexto del área de trabajo en tiempo real. Juntas mantienen la manipulación precisa, responden con rapidez a los cambios de la escena y evitan derivas o bloqueos.

### Montado en fábrica, listo para usar nada más sacarlo de la caja

Cada unidad se envía montada, cableada y calibrada: basta con conectar la alimentación y el USB y la plataforma queda lista para la teleoperación y la recogida de datos. Las opciones de cámara incluyen un módulo de enfoque automático de 86° a 30 FPS y un módulo de enfoque fijo gran angular de 100° a 60 FPS, ambos USB, sin controladores y plug-and-play.

### Integración total con Hugging Face LeRobot

Reutiliza directamente los modelos preentrenados, los conjuntos de datos y las bibliotecas de algoritmos de LeRobot, comparte código y experiencia con una comunidad global de desarrolladores, y entra en la IA encarnada sin tener que reconstruir la cadena de herramientas.

## Descripción general del hardware

### Versiones disponibles (elige según tus necesidades de efector final):

| Versión | Efector final | Control de la mano | Adecuada para |
|---|---|---|---|
| Versión Pro | Pinza flexible de TPU | Control independiente por servo | Usuarios que necesitan la pinza estándar de dos dedos del SO-ARM101 |
| Versión mano diestra | Mano diestra de cuatro dedos AmazingHand | Servo n.º 6 del brazo líder con mapeo de recorrido para accionar 8 servos de bus al unísono | Usuarios que exploran el agarre diestro y el aprendizaje por imitación de extremo a extremo |

**Método de agarre:**la Versión Pro utiliza pinzado de dos dedos, mientras que la Versión mano diestra emplea agarre y extensión de cuatro dedos. El control independiente de cada dedo no está disponible en la versión actual y figura en la hoja de ruta de desarrollo.

### Dispositivos compatibles:

Controladores Raspberry Pi / D-Robotics RDK / serie NVIDIA Jetson, además de PC con Windows y Linux por puerto serie USB. Totalmente compatible con los proyectos de código abierto LeRobot SO-ARM101 y AmazingHand, y admite la mayoría de los servos de bus serie del mercado.

### Configuración sencilla en 3 pasos:

- Conecta la placa controladora de servos a tu controlador Raspberry Pi, RDK o Jetson con el cable suministrado y, a continuación, alimenta el brazo líder (DC5521 5V6A) y el brazo seguidor (DC5521 12V5A).
- Enciende y conecta por puerto serie USB. El brazo y la mano se envían montados, cableados y calibrados: no hace falta ningún montaje mecánico ni configurar los ID de los servos.
- Sigue los tutoriales de LeRobot incluidos para teleoperar el brazo seguidor, recoger conjuntos de datos con doble vista y entrenar tu política de aprendizaje por imitación.

## Especificaciones técnicas

### Mano diestra (AmazingHand)

| Apertura de los dedos | 195 mm ~ 101 mm |
|---|---|
| Grados de libertad | 8 grados de libertad (accionados por 8 servos de bus) |
| Capacidad de carga por dedo | 0,2 kg (máximo 0,5 kg con los cuatro dedos en agarre completo) |
| Número de dedos | 4 (pulgar, índice, corazón y anular) |
| Falanges por dedo | 2 |
| Peso de la mano | 0,416 kg |
| Rango de flexión de los dedos | Primera falange 0~86°, segunda falange 0~80° |
| Ángulo de giro lateral de los dedos | Pulgar 20°, los otros tres dedos -20°~20° |
| Tensión de alimentación | 6 V DC |
| Método de control | Accionada por el servo n.º 6 del brazo líder: agarre y extensión sincronizados de los cuatro dedos |
| Potencia | Máxima 48 W, nominal 4,8 W |

### Brazo robótico (SO-ARM101)

| Material del producto | Bambu PLA+ |
|---|---|
| Dimensiones del producto | Brazo líder: 111 x 239 x 525 mm
Brazo seguidor: 111 x 173 x 532 mm |
| Peso del producto | Brazo líder: aprox. 680 g
Brazo seguidor: aprox. 690 g |
| Placa controladora de servos | Adaptador de servos de bus JUXI |
| Cámara | Cámara HD de 2 MP con enfoque automático a 30 FPS (1080P)
Cámara HD de 2 MP con enfoque fijo a 60 FPS (1080P) |
| Alimentación | DC5521 5V6A (brazo líder) / DC5521 12V5A (brazo seguidor) |
| Sistema operativo | Windows / Linux |
| Interfaz de control | Comunicación serie USB |
| Lenguaje de programación | Python |

### Configuración de servos

| Posición | Modelo de servo | Relación de engranajes | Cantidad |
|---|---|---|---|
| Brazo líder — articulación n.º 2 (7,4 V) | STS3215-C001 | 1:345 | 1 |
| Brazo líder — articulaciones n.º 1 y n.º 3 (7,4 V) | STS3215-C044 | 1:191 | 2 |
| Brazo líder — articulaciones n.º 4 y n.º 5 y pinza/mano n.º 6 (7,4 V) | STS3215-C046 | 1:147 | 3 |
| Brazo seguidor — todas las articulaciones, Versión Pro (12 V) | STS3215-C018 | 1:345 | 6 |
| Brazo seguidor — articulaciones del brazo, Versión mano diestra (12 V) | STS3215-C018 | 1:345 | 5 |
| Mano diestra AmazingHand (6 V) | SCS0009-C001 | — | 8 |

### Servo de bus SCS0009 (mano diestra)

| Modelo de servo | Feetech SCS0009-C001 (servo de bus serie de un eje de 2,3 kg) |
|---|---|
| Velocidad de rotación | 0,07 s/60° (143 RPM) @6V |
| Par de bloqueo | 2,3 kg·cm @6V |
| Precisión del servo | 0,293° (300/1024) |
| Sensor y rango | Sensor de potenciómetro, 300° controlables, compatible tanto con el modo servo de control de ángulo como con el modo de rotación continua |
| Protección | Protección de tensión, protección contra bloqueo y protección de sobretemperatura |
| Lectura de datos | Compatible: retroalimentación de temperatura, velocidad, tensión y posición |
| Disposición | Dos servos SCS0009 por dedo, lo que ofrece una respuesta rápida y coordinada y un movimiento fluido de los dedos |

### Servo de bus STS3215 (brazo robótico)

| Parámetro | STS3215-C001 | STS3215-C018 |
|---|---|---|
| Velocidad de rotación | 0,192 s/60° (52 RPM) @7,4 V | 0,222 s/60° (45 RPM) @12 V |
| Par de bloqueo | 19,5 kg·cm @7,4 V | 30 kg·cm @12 V |
| Precisión del servo | 0,088° | 0,088° |
| Sensor y rango | Codificador magnético de alta precisión de 12 bits, 360° controlables | Codificador magnético de alta precisión de 12 bits, 360° controlables |
| Protección | Protección de tensión, protección contra bloqueo y protección de sobretemperatura | Protección de tensión, protección contra bloqueo y protección de sobretemperatura |
| Lectura de datos | Compatible: retroalimentación de ángulo, temperatura, tensión y posición | Compatible: retroalimentación de ángulo, temperatura, tensión y posición |

El STS3215 integra dos motores de codificador magnético de alta calidad con una respuesta coordinada de nivel de milisegundos y varios modos de funcionamiento, lo que mantiene cada movimiento del brazo fluido y preciso.

### Adaptador de servos de bus JUXI (placa controladora)

| Entrada de alimentación | 7~12 V |
|---|---|
| Conector de alimentación | DC5521 |
| Interfaz de servo | Interfaz de servo de bus PH2.0 |
| Interfaz de comunicación | USB Type-C |
| Distancia entre orificios de montaje | 37,00 x 28,00 mm |
| Diámetro de los orificios de montaje | 2,5 mm |
| Dimensiones del producto | 42,00 x 33,00 mm |
| Peso del producto | 15 g |

La placa presenta un diseño compacto plug-and-play con un módulo de protección y regulación de tensión TVS para evitar averías por alta tensión. Un solo cable la conecta a controladores Raspberry Pi, D-Robotics RDK o NVIDIA Jetson para el control de motores en tiempo real y la retroalimentación de datos del codificador. Admite el brazo LeRobot SO-ARM101, la mano diestra AmazingHand y la mayoría de los servos de bus serie del mercado.

### Módulo de cámara (opcional)

| Resolución | 1080P, 2 MP |
|---|---|
| Opciones disponibles | Cámara de 86° con enfoque automático a 30 FPS / cámara de 100° gran angular con enfoque fijo a 60 FPS |
| Interfaz | USB, sin controladores y plug-and-play |
| Opciones de montaje | Kit de montaje de cámara lateral o cenital |

### Aplicaciones

- **Investigación universitaria**— laboratorios de enseñanza y proyectos de investigación en robótica, inteligencia artificial y automatización, en particular agarre diestro y aprendizaje por imitación.
- **Desarrolladores y makers**— desarrollo de algoritmos, validación de prototipos, desarrollo secundario de la mano diestra y competiciones de robótica.
- **Instituciones educativas**— un recurso didáctico ideal para cursos avanzados de programación de IA y visión robótica.
- **Aficionados**— construye un robot de sobremesa que ponga en práctica técnicas reales de IA y agarre con una mano similar a la humana.

## Código abierto y ecosistema

Este producto se basa en el proyecto de código abierto LeRobot SO-ARM101 y en el proyecto AmazingHand. La plataforma SO-ARM101 y AmazingHand conecta directamente con la comunidad de Hugging Face: los modelos preentrenados, los conjuntos de datos y las bibliotecas de algoritmos de LeRobot pueden reutilizarse directamente, y el código y la experiencia pueden compartirse con desarrolladores de todo el mundo, lo que reduce la barrera técnica para entrar en la IA encarnada.

- El código fuente se publica bajo la licencia Apache 2.0.
- Los archivos de diseño mecánico se publican bajo la licencia CC BY 4.0.

## Opciones de paquete

| Paquete | AmazingHand (montada) | SO-ARM101 Versión Pro | Kit SO-ARM101 mano diestra | Kit mano diestra (doble cámara) |
|---|---|---|---|---|
| Piezas impresas en 3D | ✓ | ✓ | ✓ | ✓ |
| Mano diestra AmazingHand | ✓ | — | ✓ | ✓ |
| Cámara de escena | — | — | — | ✓ |
| Recogida de datos con doble vista | — | — | — | ✓ |
| Teleoperación líder-seguidor | — | ✓ | ✓ | ✓ |
| Aprendizaje por imitación de extremo a extremo | ✓ | ✓ | ✓ | ✓ |

## Lista de piezas

### Kit SO-ARM101 mano diestra:

- 1× brazo líder (montado) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× brazo seguidor (montado) — 5× STS3215-C018 (12 V, 1:345)
- 1× mano diestra de cuatro dedos AmazingHand (montada) — 8× servos de bus SCS0009-C001 (6 V)
- 2× adaptador de servos de bus JUXI (placa controladora de servos)
- 1× cable de alimentación DC5521 5V6A (brazo líder)
- 1× cable de alimentación DC5521 12V5A (brazo seguidor)
- 2× cable USB Type-C
- 4× clip de fijación
- 1× concentrador USB

### Kit SO-ARM101 mano diestra (doble cámara):

Todo lo incluido en el Kit SO-ARM101 mano diestra, más:

- 1× kit de montaje de cámara cenital con módulo de cámara 1080P de 2 MP
- 1× kit de cámara lateral con soporte de sobremesa y módulo de cámara 1080P de 2 MP

### SO-ARM101 Pro (pinza de TPU):

- 1× brazo líder (montado) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× brazo seguidor (montado) con pinza flexible de TPU — 6× STS3215-C018 (12 V, 1:345)
- 2× adaptador de servos de bus JUXI (placa controladora de servos)
- 1× cable de alimentación DC5521 5V6A (brazo líder)
- 1× cable de alimentación DC5521 12V5A (brazo seguidor)
- 2× cable USB Type-C
- 4× clip de fijación
- 1× concentrador USB

### AmazingHand (mano derecha):

- 1× mano diestra de cuatro dedos AmazingHand, totalmente montada, con 8× servos de bus SCS0009-C001 (6 V)
- 1× adaptador de servos de bus JUXI (placa controladora de servos)
- 1× cable de interconexión


## Tutoriales

- [Tutorial SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montaje SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guía de selección de brazos robóticos](/es/tutorials/robot-arms/select-guide)
- [Introducción a la IA corporizada (LeRobot)](/es/topics/embodied-ai-intro)
- [Control de interfaz AmazingHand](/es/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Ejemplo oficial AmazingHand](/es/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [Depuración TTL AmazingHand](/es/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)


## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
