---
title: Introducción a la inteligencia incorporada (LeRobot)
description: Inteligencia incorporada – framework LeRobot, flujo completo de recolección/entrenamiento/evaluación SO-ARM101, elección ACT/política de difusión/SmolVLA
keywords: [lerobot, inteligencia incorporada, aprendizaje por imitación, act, so-arm101, aprendizaje robótico]
---

# Introducción a la inteligencia incorporada (LeRobot)

> Para desarrolladores que hacen «aprendizaje robótico» por primera vez. Con HuggingFace LeRobot + el brazo robótico JUXI SO-ARM101: recorrido completo de **recolección → entrenamiento → evaluación**.

## 1. ¿Qué es la inteligencia incorporada?

La inteligencia incorporada (Embodied AI) permite a un agente interactuar con el mundo físico a través de los sensores del cuerpo. El aprendizaje por imitación robótica es una línea principal: demostraciones teleoperadas → recolección de datos → entrenamiento del modelo de política → el robot reproduce las acciones.

**Por qué es importante**: la programación tradicional no cubre tareas complejas (atornillar, doblar ropa); el aprendizaje por imitación solo necesita «demo + entrenamiento».

## 2. Configuración de hardware

| Componente | Recomendación | Descripción |
|------|------|------|
| Brazo robótico | SO-ARM101 (leader + follower) | Teleoperación bimanual, 6 DOF |
| Computación | Jetson Orin NX Super / host 4090 | entrenamiento con gran potencia, inferencia en Jetson |
| Visión | RealSense / cámara USB | captura del entorno en teleoperación |

- [Tutorial de uso de SO-ARM101](/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Kit Jetson Orin NX Super](/es/products/jetson-orin-nx-super-kit)

## 3. Instalación del entorno

```bash
# Clonar (fork estable de JUXI)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM usa servos Feetech
# Usuarios de Jetson: comprobar primero PyTorch
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. Recolección de datos (teleoperación)

```bash
# Calibrar el brazo (primera vez)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
# Recolectar datos
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**Consejos de recolección**:

- ≥50 episodios por tarea, variar posiciones/técnicas
- Cámara fija, objeto visible de forma coherente
- Estilo de demostración consistente (mismo demostrador)

## 5. Entrenamiento

```bash
# Política ACT (recomendada para empezar)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**Elección de política**:

| Política | Ventajas | Uso |
|------|------|------|
| ACT | estable incluso con pocos datos, accesible | tareas únicas, pocos datos |
| Política de difusión | movimientos multimodales complejos | manipulación fina |
| SmolVLA / modelos de base | generalización zero/few-shot | múltiples tareas |

## 6. Evaluación

```bash
# Reproducir el dataset (comprobar calidad)
lerobot-dataset-viz --repo-id juxi/pick_cube
# Evaluar la política
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| Métrica | Descripción |
|---------|------|
| Tasa de éxito | proporción de tareas completadas |
| Suavidad de trayectoria | si los movimientos tiemblan |
| Generalización | éxito también con otros objetos/posiciones |

## 7. Preguntas frecuentes

**Q: ¿El entrenamiento es lento?**
Cantidad de datos, steps y potencia son proporcionales. Empezar con 50 episodios / 100k steps, validar el flujo y luego escalar.

**Q: ¿La política solo hace una acción?**
El entrenamiento de una sola tarea necesita un dataset de tarea; los modelos de base GR00T/Pi0 se pueden ajustar a multitarea con pocos datos.

**Q: ¿Los movimientos tiemblan tras entrenar?**
Comprobar la calidad de los datos (demos estables), añadir filtro de suavizado, reducir la frecuencia de control.

**Q: ¿Falta de memoria/VRAM?**
Reducir batch_size, resolución de imagen; en Jetson usar la versión de 16 GB.

---

## Enlaces relacionados

- [Guía de selección de brazos robóticos](/es/tutorials/robot-arms/select-guide)
- [Introducción al despliegue de IA en el borde](/es/topics/edge-ai-intro)
- [Pinza flexible de TPU SO-ARM101](/es/products/tpu-flexible-gripper)
- [Kit de visión robótica SO-ARM101](/es/products/robot-vision-kit)

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
