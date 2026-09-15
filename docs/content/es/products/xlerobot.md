---
title: Robot móvil de dos brazos XLeRobot
category: robot
description: Robot móvil de dos brazos XLeRobot de Juxi Technology — dos brazos seguidores SO-ARM101 + chasis de ruedas omnidireccionales + torre de cámara, dos placas controladoras de servomotor con alimentación de 12V, ecosistema LeRobot, disponible en kit ensamblado o kit de piezas
keywords: [xlerobot, robot de dos brazos, robot móvil, inteligencia corporizada, lerobot, so-arm101, chasis de ruedas omnidireccionales]
---

# Robot móvil de dos brazos XLeRobot

## Descripción general

XLeRobot es una plataforma de robot móvil de dos brazos: un chasis rodante de ruedas omnidireccionales (ruedas locas) sirve como base móvil y, a través de una torre de cámara, sostiene dos brazos robóticos seguidores SO-ARM101; junto con dos placas controladoras de servomotor, un host Raspberry Pi/Jetson y una fuente de alimentación portátil PD, forma un robot open source capaz de manipular en movimiento, orientado a la investigación en inteligencia corporizada, las tareas domésticas y el desarrollo del ecosistema LeRobot.

**Características clave**:

- Manipulación con dos brazos + chasis móvil omnidireccional; puede desplazarse para agarrar diversos objetos domésticos
- Basado en brazos robóticos SO-ARM101 con servomotores de bus Feetech STS3215-C018
- Torre de cámara + cámara de muñeca, con soporte para recolección de datos y aprendizaje por imitación
- Dos placas controladoras de servomotor que accionan de forma independiente los brazos y el chasis, con alimentación de 12V
- Ecosistema de software LeRobot completo: configuración del entorno, recolección de datos, entrenamiento e inferencia
- Disponible en kit ensamblado y kit de piezas; el kit de piezas incluye una lista de accesorios completa
- Compatible con la base Lekiwi (si ya dispone de una Lekiwi, puede reutilizar directamente la base con ruedas)

---

## Especificaciones

| Categoría | Especificación |
|------|------|
| Brazos | 2 × brazos seguidores SO-ARM101 (servomotores de bus Feetech STS3215-C018, ID 1-6) |
| Chasis | Chasis rodante de ruedas omnidireccionales con 3 servomotores STS3215-C018 (ID 7/8/9) |
| Torre de cámara | Base de la torre de cámara + 2 servomotores STS3215-C018 (ID 7/8) + cámara |
| Accionamiento | 2 × placas controladoras de servomotor (cables de datos USB-C a USB-A para el host; cables de alimentación PD a DC 12V 3A) |
| Alimentación | Fuente de alimentación portátil PD, versión de 12V (máx. 100W por puerto, probada como suficiente para el funcionamiento) |
| Host | Raspberry Pi (no incluida) / Jetson |
| Cableado | 2 × cables prolongadores de servomotor de 90CM (del chasis rodante y la torre de cámara a las placas controladoras de servomotor) |
| Peso total | Aprox. 12kg (completamente ensamblado) |
| Software | Ecosistema LeRobot; configuración de servomotores con Bambot (Windows / macOS / Linux) |

---

## Inicio rápido

### 1. Preparar el entorno de LeRobot

Elija el tutorial de configuración del entorno según su sistema operativo (macOS / Ubuntu / Windows) e instale LeRobot y sus dependencias.

### 2. Mover los archivos de XLeRobot

Copie los archivos de XLeRobot en el directorio correspondiente para completar la preparación del software.

### 3. Montar el robot

- **Kit ensamblado**: monte directamente el chasis rodante, la base de la torre de cámara, los dos brazos y el cableado siguiendo la lista de accesorios
- **Kit de piezas**: configure primero los servomotores (use [Bambot](https://bambot.org/feetech.js) para escanear y renombrar los ID) y, a continuación, monte en orden el carrito, la base con ruedas, las bases de los brazos robóticos y el cableado; por último, coloque la batería

Con el kit de piezas, se recomienda conectar los cables de alimentación al final; mantenga la alimentación desconectada mientras conecta o desconecta otros cables para proteger las placas controladoras de servomotor.

---

## Tutoriales completos

- [Resumen de los tutoriales de XLeRobot](/es/tutorials/robot-arms/xlerobot/)
- [Configuración (macOS)](/es/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Configuración (Ubuntu)](/es/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Configuración (Windows)](/es/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [Mover los archivos de XLeRobot](/es/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Montaje del kit ensamblado](/es/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Montaje del kit de piezas](/es/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Casos de uso

- Investigación en inteligencia corporizada y aprendizaje por imitación (tareas domésticas, agarre de objetos)
- Desarrollo de algoritmos de manipulación móvil con dos brazos (ecosistema LeRobot)
- Enseñanza y competiciones de robótica
- Validación de prototipos de robots de servicio doméstico

---

## Preguntas frecuentes

**P: ¿Cuál es la diferencia entre el kit ensamblado y el kit de piezas?**

**A:** El kit ensamblado es un conjunto montado según la lista de accesorios; el kit de piezas requiere montaje propio y configurar primero los ID de los servomotores con la herramienta Bambot (brazos 1-6, chasis 7/8/9, torre de cámara 7/8).

**P: ¿Qué otras piezas hay que conseguir por separado?**

**A:** La fuente de alimentación portátil, la Raspberry Pi y el cable de alimentación PD 5V5A para la Raspberry Pi deben comprarse aparte (así se indica en el tutorial).

**P: ¿Cómo se configuran los ID de los servomotores?**

**A:** Conecte el servomotor y la placa controladora de servomotor al ordenador y, a continuación, escanee y cambie el nombre de los ID de los servomotores en la [página de configuración de servomotores de Bambot](https://bambot.org/feetech.js); el repositorio de código oficial de LeRobot aún no admite la configuración de servomotores distintos de los de los brazos robóticos, por lo que se utiliza Bambot en su lugar.

**P: ¿Se puede mover el robot empujándolo una vez montado?**

**A:** No. Una vez completamente ensamblado, no empuje el XLeRobot como si fuera un carrito, ya que podría dañar los engranajes de los servomotores; cuando necesite moverlo manualmente, levante el robot (aprox. 12kg).

---

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
