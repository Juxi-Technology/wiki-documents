---
title: "5 · Grabar un dataset"
description: "Grabar un conjunto de datos en LeLab: define el repo_id, la descripción de la tarea, el número de episodios y las cámaras en la página Recording, y captura las demostraciones como LeRobotDataset."
---

# 5 · Grabar un dataset

> **Anterior:** [04 Teleoperación](04-Teleoperation.md)
> **Siguiente:** [06 Entrenar y ejecutar la inferencia](06-Train-and-Inference.md)

Un dataset es una colección de **episodios**, cada uno una única demostración de la tarea de principio a fin. Grabar es teleoperación más un control de grabación.

## Configuración

Abre la pestaña **Recording** y rellena:

| Campo | Qué poner |
|---|---|
| **Nombre del dataset** (`repo_id`) | `your-name/task-name`, por ejemplo `juxi/pick-up-the-cube`. La parte `name/` debe ser tu nombre de usuario de Hugging Face si piensas subirlo |
| **Descripción de la tarea** | Una frase, por ejemplo `pick up the cube and drop it in the box`. Es el texto sobre el que se condiciona la política |
| **Episodios** | Cuántas demostraciones — ver más abajo |
| **Cámaras** | Qué cámaras configuradas incluir, y con qué resolución y frecuencia de fotogramas |

### Cuántos episodios

**30 a 50** para una tarea sencilla de recoger y colocar. Una tarea muy repetitiva necesita menos; una tarea con mucha variación necesita más.

La consistencia importa más que la cantidad: la misma posición inicial, el mismo encuadre de cámara y la misma descripción de tarea en cada episodio. Cincuenta demostraciones casi idénticas superan a cien variadas. Varía solo aquello frente a lo que quieres que la política sea robusta — si cada episodio empieza con el cubo en el mismo sitio, la política aprende ese sitio.

## Durante la grabación

| Tecla | Acción |
|---|---|
| `SPACE` o `→` | Termina el episodio actual, inicia el siguiente |
| `DEL` o `←` | Descarta el episodio recién grabado y hazlo de nuevo |

La pestaña muestra un contador de episodios y un contador de sesión.

Termina el episodio cuando la tarea está completa — no después de que el brazo haya vuelto al inicio. Volver es cosa del siguiente episodio.

Repite un episodio cuando hayas manejado mal el brazo, hayas tirado el objeto fuera de sitio, o no hayas completado la tarea. La política aprende de todo lo que hay en el dataset, incluidos los errores.

## Detener

Detén la sesión cuando tengas suficientes episodios. **La grabación se finaliza cuando detienes** — ahí es cuando se escribe el índice del dataset. Una sesión matada a mitad de episodio puede dejar un dataset que se lee como incompleto.

## Dónde van los datos

Por defecto bajo `~/.cache/huggingface/lerobot/`, con la clave del `repo_id` que elegiste. No se sube nada hasta que lo empujas desde la pestaña **Upload**.

## Comprobar la grabación

Abre la pestaña **Datasets** y selecciona el dataset. Puedes recorrer los episodios fotograma a fotograma, una cámara a la vez, con un trazo de movimiento articular.

Hazlo antes de entrenar. Detecta lo que es invisible mientras sostienes el brazo:

- Una cámara girada incorrectamente — los fotogramas están de lado
- Un episodio con un tramo de tiempo muerto al principio
- Una cámara de muñeca que se salió del encuadre a mitad

Una regrabación cuesta minutos; descubrirlo después del entrenamiento cuesta la ejecución de entrenamiento.

---

> **Siguiente:** [06 Entrenar y ejecutar la inferencia](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
