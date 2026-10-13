---
title: "1 · Descripción general"
description: "LeLab reúne el flujo de trabajo de LeRobot — calibrar, teleoperar, grabar, entrenar, reproducir — en una sola ventana del navegador: qué hace, requisitos y dónde se guardan los archivos."
---

# 1 · Descripción general

> **Siguiente:** [02 Instalar y ejecutar](02-Install.md)

LeLab es una aplicación web que reúne el flujo de trabajo de LeRobot — calibrar, teleoperar, grabar, entrenar, reproducir — en una sola ventana del navegador.

## Qué puedes hacer

| Página | Qué hace |
|---|---|
| **Calibration** (calibración) | Calibración guiada de ambos brazos |
| **Teleoperation** (teleoperación) | Mueves el brazo leader; el follower lo imita, con transmisión de posiciones articulares en vivo |
| **Recording** (grabación) | Captura episodios en un LeRobotDataset, con cámaras |
| **Datasets** | Explora los episodios en disco, fotograma a fotograma, con un trazo de movimiento articular |
| **Training** (entrenamiento) | Inicia un trabajo de entrenamiento de LeRobot y observa los registros |
| **Inference** (inferencia) | Ejecuta una política entrenada en el brazo follower |
| **Upload** (subida) | Sube tu dataset al Hugging Face Hub |

## LeLab y LeRobot

LeRobot es la biblioteca — controladores de robots, formato de dataset, código de entrenamiento. LeLab es un servidor FastAPI que la invoca, además de un front end de React que se comunica con ese servidor por HTTP y WebSocket.

- Todo lo que LeLab no expone sigue siendo accesible desde la línea de comandos `lerobot-*`.
- LeLab no incluye LeRobot. Instalar LeLab instala LeRobot.

## Requisitos

| | |
|---|---|
| Robot | **Brazos SO-101 leader + follower** — la única configuración compatible |
| Ordenador | Linux, macOS o Windows |
| Python | **3.12 o posterior** |
| Node.js | 22 — solo para `lelab --dev` |
| USB | Dos puertos libres, uno por brazo |

Calibrar, teleoperar y grabar funciona en un portátil. El entrenamiento es el paso pesado, y LeLab puede ejecutarlo en el Hugging Face Hub — consulta la [página 6](06-Train-and-Inference.md).

## Dónde se guardan los archivos

Bajo `~/.cache/huggingface/lerobot/`:

| Ruta | Contenido |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | Archivos de calibración del leader |
| `calibration/robots/so101_follower/*.json` | Archivos de calibración del follower |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Últimos puertos serie usados |
| `saved_configs/*.txt` | Último perfil de calibración seleccionado |

Los datasets van donde LeRobot los pone — por defecto, en el mismo árbol.

Borrar esa caché, o reinstalar, obliga a recalibrar ambos brazos. Consulta [Solución de problemas](07-Troubleshooting.md).

## Vocabulario

LeRobot nombra los brazos por su rol; la API de LeLab usa un segundo conjunto de nombres para los mismos dos brazos:

| Tú dices | LeRobot / LeLab dicen |
|---|---|
| El brazo que mueves a mano | **leader** · **teleop** |
| El brazo que sigue | **follower** · **robot** |

---

> **Siguiente:** [02 Instalar y ejecutar](02-Install.md)

<RelatedProducts slugs="so-arm101" />
