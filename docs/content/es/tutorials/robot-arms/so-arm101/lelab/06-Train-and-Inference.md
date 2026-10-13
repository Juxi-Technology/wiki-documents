---
title: "6 · Entrenar y ejecutar la inferencia"
description: "Entrenar y ejecutar la inferencia con LeLab: elige el conjunto de datos y el tipo de política (ACT primero), entrena en local o como trabajo en la nube de Hugging Face y despliega en el brazo seguidor."
---

# 6 · Entrenar y ejecutar la inferencia

> **Anterior:** [05 Grabar un dataset](05-Record-Dataset.md)
> **Siguiente:** [07 Solución de problemas](07-Troubleshooting.md)

El entrenamiento convierte el dataset en una **política** — un modelo que asigna imágenes de cámara a posiciones articulares. La inferencia ejecuta esa política en el brazo follower.

## Entrenar

Abre la pestaña **Training** y elige:

| Elección | Notas |
|---|---|
| **Dataset** | Un dataset local, o uno del Hub |
| **Tipo de política** | **ACT** suele ser la primera opción para un solo brazo. Diffusion Policy, SmolVLA y la familia π₀ también están disponibles |
| **Dónde ejecutar** | Esta máquina, o un trabajo en la nube de Hugging Face |
| **Duración del entrenamiento** | Número de pasos. Vigila la pérdida en lugar de suponer que más es mejor |

La pestaña transmite el registro de entrenamiento y muestra los checkpoints a medida que se escriben.

### Local o en la nube

| | Local | Trabajo en la nube de Hugging Face |
|---|---|---|
| Necesita | Una GPU en esta máquina | Una cuenta de Hugging Face con acceso |
| Velocidad | Depende de tu GPU | Máquina fija, elegida por trabajo |
| Ideal para | Datasets pequeños, experimentar | Ejecuciones largas |

La opción en la nube es la razón por la que un portátil basta para el resto del flujo de trabajo: graba en local, entrena en remoto.

### Extras de las políticas

Algunos tipos de política necesitan dependencias que LeLab no instala por defecto. Seleccionar uno te pide que las instales — acepta y espera a que termine la instalación en segundo plano antes de iniciar el trabajo. El mismo mecanismo cubre los extras opcionales de entrenamiento.

## Checkpoints

El entrenamiento escribe checkpoints periódicamente, no solo al final, de modo que una ejecución interrumpida aún deja un modelo utilizable. El nombre de cada checkpoint lleva su número de paso. Prueba uno anterior si la pérdida empezó a subir.

## Inferencia

Abre la pestaña **Inference**:

1. Confirma que ambos brazos están conectados y calibrados.
2. Selecciona la **política** — un checkpoint local, o un modelo del Hub.
3. Confirma las **cámaras** y su **rotation**.
4. Inicia la inferencia y despeja el espacio de trabajo.

### Rotación y asignación de cámaras

**Usa la misma rotación que durante la grabación.** Es la razón más común de que una política bien entrenada no haga nada útil en el robot real, y nada te avisa: 0° y 180° producen dimensiones de imagen idénticas.

Lo mismo se aplica a la **asignación** de las cámaras. Si la cámara llamada `wrist` durante la grabación es ahora una cámara física diferente, la política ve la imagen equivocada.

Si todo eso es correcto y el brazo sigue fallando, vuelve a mirar el dataset — consulta la [página 5](05-Record-Dataset.md).

### Intervenir

Detén la inferencia antes de echar mano al brazo. Una corrección que haces a mano no es señal de entrenamiento a menos que grabes un nuevo episodio y vuelvas a entrenar.

## Reproducción

La reproducción vuelve a ejecutar un episodio grabado en el brazo follower. Reproduce las posiciones articulares grabadas, así que se ve correcto aunque la política sea mala — comprueba el hardware y el dataset, no la política. Usa la inferencia para ver qué hace la política.

---

> **Siguiente:** [07 Solución de problemas](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
