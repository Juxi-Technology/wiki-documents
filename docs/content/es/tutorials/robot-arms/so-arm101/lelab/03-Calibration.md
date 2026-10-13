---
title: "3 · Conectar y calibrar"
description: "Conectar y calibrar ambos brazos en LeLab: notas de cableado USB, permisos serie en Linux y la calibración guiada que registra el punto cero y el rango de cada articulación."
---

# 3 · Conectar y calibrar

> **Anterior:** [02 Instalar y ejecutar](02-Install.md)
> **Siguiente:** [04 Teleoperación](04-Teleoperation.md)

La calibración registra el punto cero y el rango de recorrido de cada articulación. Hazlo una vez por brazo; repítelo tras un desmontaje o si se pierde el archivo de calibración.

## Antes de empezar

- Ambos brazos montados, con sus servos ya con sus IDs asignados.
- Ambos brazos alimentados.
- Un cable USB por brazo, en **dos puertos USB separados** — un concentrador compartido a veces los enumera de forma poco fiable.

### Linux: permisos serie

```bash
sudo usermod -aG dialout $USER
```

Luego **cierra sesión y vuelve a entrar**. Sin esto, LeLab encuentra el brazo pero cada lectura falla con un error de permisos. Windows y macOS no necesitan nada.

## Qué brazo es cuál

| Brazo | Nombre en LeRobot | LeLab lo llama |
|---|---|---|
| El que mueves a mano | `so101_leader` | **teleop** |
| El que sigue | `so101_follower` | **robot** |

Calibra el leader primero. Confundir los dos es la causa habitual de que un brazo recién calibrado se comporte de forma extraña.

## El flujo

Abre la pestaña **Calibration** y trabaja con un brazo a la vez:

1. **Elige el dispositivo** — leader (teleop) o follower (robot).
2. **Elige el puerto serie.** LeLab lista los dispositivos serie USB que detecta. Para distinguirlos, desconecta un brazo y observa qué entrada desaparece. La elección se recuerda.
3. **Elige un perfil de calibración** — uno existente o uno nuevo. El perfil guarda las posiciones cero guardadas; si este brazo ya se calibró antes, reutiliza su perfil.
4. **Sigue los pasos guiados.** LeLab recorre cada articulación por turno; mueve la articulación a la posición que te pide y confirma. Sin indicaciones de teclado.
5. **Repite para el otro brazo** — con su propio perfil y puerto.

> Cada perfil pertenece a un brazo físico. Intercambiar los dos brazos significa recalibrar.

## Cámaras

Las cámaras se configuran en la misma pestaña. El nombre de cada cámara (`front`, `wrist`, …) es la clave que ve la política, así que usa nombres que reconozcas en un registro de entrenamiento.

Las cámaras pueden montarse antes o después de la calibración; la calibración no depende de ellas. Mantén la asignación estable — cambiar qué cámara física se llama `wrist` entre la grabación y la inferencia hace que una política entrenada se comporte de forma absurda.

### Rotación

Si una cámara está montada boca abajo o de lado, define su **Rotation**: 0°, 90°, 180° o 270° en sentido horario. Una cámara de muñeca boca abajo es 180°.

La rotación se guarda por cámara y se aplica a la vista previa de configuración, la vista previa de teleoperación, los fotogramas grabados y la inferencia. Los perfiles sin ajuste de rotación se tratan como 0°.

- **90° y 270° intercambian las dimensiones de salida.** Una captura de 640 × 480 pasa a ser 480 × 640.
- **Las dimensiones de imagen del checkpoint no revelan la orientación.** 0° y 180° producen dimensiones idénticas pero imágenes opuestas. Antes de la inferencia, define la rotación usada al grabar — consulta la [página 6](06-Train-and-Inference.md).

## Qué se guarda

| Archivo | Contenido |
|---|---|
| `~/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/*.json` | Perfiles del leader |
| `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/*.json` | Perfiles del follower |
| `~/.cache/huggingface/lerobot/ports/leader_port.txt` | Puerto serie del leader |
| `~/.cache/huggingface/lerobot/ports/follower_port.txt` | Puerto serie del follower |

Estos viven bajo `~/.cache/`, así que las herramientas de limpieza de caché pueden borrarlos. Si un brazo calibrado pide que lo calibres de nuevo, mira aquí — consulta [Solución de problemas](07-Troubleshooting.md).

---

> **Siguiente:** [04 Teleoperación](04-Teleoperation.md)

<RelatedProducts slugs="so-arm101" />
