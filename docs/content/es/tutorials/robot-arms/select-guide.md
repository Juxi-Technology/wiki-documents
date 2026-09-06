---
title: Guía de selección de brazos robóticos
description: Comparativa SO-ARM101 vs AmazingHand vs Lekiwi
keywords: [selección, brazo robótico, comparativa]
---

# Guía de selección de brazos robóticos

Juxi Technology ofrece varios brazos robóticos para diferentes escenarios de aplicación. Esta guía te ayuda a comparar y elegir el modelo adecuado.

> Nota: consulta la documentación oficial de cada producto para conocer las especificaciones detalladas. Esta tabla es solo una referencia de selección.

## Comparativa de los tres brazos robóticos

| Característica | SO-ARM101 | AmazingHand | Lekiwi |
|----------------|-----------|-------------|--------|
| **Tipo** | Robot de teleoperación de doble brazo | Mano hábil | Brazo docente low-cost |
| **DOF** | 6 DOF por brazo | 5 dedos, multiarticulado | 6 DOF |
| **Control** | Ecosistema LeRobot / API Python | Bus serie TTL | Control de servos |
| **Plataforma host** | PC (Linux) / Jetson | Placa controladora | PC / MCU |
| **Casos de uso** | Aprendizaje por imitación con IA, investigación en teleoperación | Prehensión, replicación de gestos | Educación, aprendizaje para principiantes |
| **Open source** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | Docs oficiales |
| **Ideal para** | Investigadores, desarrolladores de IA | Investigadores en manipulación | Estudiantes, makers |

## ¿Cómo elegir?

### 🎓 Estudiantes / principiantes → Lekiwi

- Estructura simple, bajo coste — ideal para enseñanza en el aula y para empezar
- Control intuitivo de servos

### 🤖 Investigación en prehensión y manipulación → AmazingHand

- Mano hábil de 4 dedos para investigación de estrategias de prehensión y control de gestos
- Control por bus serie TTL, compatible con controladores principales

### 🧠 Aprendizaje por imitación con IA / teleoperación → SO-ARM101

- Diseño de doble brazo con teleoperación líder-seguidor
- Integración profunda con el ecosistema LeRobot, ideal para aprendizaje por imitación
- Soporte de Jetson para flujos de trabajo de IA sin interrupciones

## Combinaciones recomendadas

| Necesidad | Configuración recomendada |
|------|-------------------|
| Investigación en teleoperación con IA | SO-ARM101 + AmazingHand (manipulación hábil) |
| Laboratorio docente | Varias unidades Lekiwi |
| Sistema robótico completo | SO-ARM101 + módulo IMU + accesorios de visión |

## Tutoriales relacionados

- [Tutorial SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Control de interfaz AmazingHand](/es/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Tutorial Lekiwi](/es/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## Soporte

- 📧 Correo electrónico: support@juxitech.com
- 🌐 Sitio web oficial: [www.juxitech.com](https://www.juxitech.com)
