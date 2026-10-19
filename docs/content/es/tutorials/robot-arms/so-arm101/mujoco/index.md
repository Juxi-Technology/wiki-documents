---
title: "SO-ARM101 × MuJoCo tutorial completo (índice)"
---

# SO-ARM101 × MuJoCo tutorial completo (índice)


> Este tutorial documenta y reproduce el **flujo de trabajo completo de simulación + robot real** del SO-ARM101: desde la preparación del entorno, la verificación del modelo y la calibración del robot real,
> hasta la teleoperación por teclado/brazo líder, la grabación y la reproducción de datos. Todos los comandos se validaron en sesiones reales de robot + simulación el 2026-10-15.
>
> Dirigido a: usuarios del kit Juxi SO-ARM101 e ingenieros internos. No se requiere conocimiento previo de MuJoCo ni de LeRobot.

## Mapa del flujo completo (dos vías, un conjunto de componentes compartidos)

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| Cap. | Contenido | Qué obtendrás |
| --- | --- | --- |
| [01 Preparación del entorno](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | Entorno uv, extras de dependencias, consideraciones para Windows | Un entorno listo para ejecutar |
| [02 Verificación del modelo de simulación](/es/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | Carga/comparación/renderizado con accionamiento de tres modelos MJCF | Confianza en el modelo y en el comportamiento de la simulación |
| [03 Conexión del robot real y calibración](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | Identificación del puerto serie, comprobación inicial de solo lectura, calibración del brazo seguidor/líder | Dos brazos reconocidos por el software |
| [04 Teleoperación por teclado](/es/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | Control por teclado del robot real/simulado, ajuste de velocidad, límite de velocidad de seguridad | La forma más rápida de control manual |
| [05 Gemelo digital del brazo líder](/es/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | El brazo líder físico acciona el brazo seguidor simulado, ajuste fino del punto cero | Demostración de gemelo digital y captura de datos |
| [06 Grabación y reproducción de datos](/es/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | Grabación en robot real/simulación, control de episodios, reproducción, script de inspección | Un dataset entrenable |
| [07 Preguntas frecuentes y experiencias](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | Todos los problemas encontrados en este flujo y sus soluciones | Manual de resolución de problemas |
| [08 Hoja de ruta](/es/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | Cámaras, escenas con objetos, generación automática de datos, entrenamiento | Planes para los siguientes pasos |
| [09 Tutorial de uso completo](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | De arrancar el brazo a grabar, inspeccionar, ver los vídeos, entrenar y desplegar en simulación, todo seguido; incluye una alternativa con entorno conda | De cero a un dataset válido y de ahí a la política en acción |

**Orden recomendado para la primera vez**: 01 (entorno) → 03 (solo si se conecta el robot real) → sigue el flujo principal del [09 Tutorial de uso completo](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
(grabación → inspección → ver vídeos → entrenamiento → despliegue); 02 y 04–08 son manuales de referencia, consúltalos según necesites.
Todos los comandos del 09 se pueden copiar y ejecutar directamente, sin volver a otras secciones a mitad para instalar el entorno.

## Tres convenciones que hay que recordar

1. **Sistema de unidades** (alineado en las tres partes): las cinco articulaciones del cuerpo usan **−100 a 100** (proporción de recorrido, 0 = punto medio del recorrido); la pinza usa
   **0 a 100** (0 = cerrada). El robot real (`use_degrees=false`), la simulación y el brazo líder siguen todos esta convención; los datasets grabados tienen la misma estructura que datasets oficiales de robot real
   como `lerobot/svla_so101_pickplace` (vector de 6 dimensiones + nombres de articulación).
2. **Correspondencia de roles**: el objeto controlado (robot real o simulación) siempre se configura con `--robot.*`; el dispositivo de control (teclado/brazo líder) siempre con `--teleop.*`.
3. **Prefijo de comandos en esta máquina**: en esta máquina de desarrollo, todos los comandos `uv` requieren configurar primero el directorio de caché (el motivo está en [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)):

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## Entorno validado

| Elemento | Versión |
| --- | --- |
| Sistema | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2 (este repositorio, `.venv` aislado del proyecto, no afecta a conda) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0 (versión CPU) |
| Hardware | Brazo líder SO-ARM101 (COM124) + brazo seguidor (COM172), chip de puerto serie CH343 |

<RelatedProducts slugs="so-arm101" />
