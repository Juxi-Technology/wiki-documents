---
title: "4 · Teleoperación"
description: "Teleoperar con LeLab: mueve el brazo líder y el seguidor lo imita mostrando las posiciones de las articulaciones en vivo; también es la forma más rápida de verificar la calibración."
---

# 4 · Teleoperación

> **Anterior:** [03 Conectar y calibrar](03-Calibration.md)
> **Siguiente:** [05 Grabar un dataset](05-Record-Dataset.md)

Mueves el brazo leader a mano; el follower copia el movimiento. Así es como grabas demostraciones, y la forma más rápida de confirmar la calibración.

## Ejecutarlo

1. Abre la pestaña **Teleoperation**.
2. Confirma los puertos y el perfil de calibración — LeLab los recuerda de la calibración.
3. Inicia la teleoperación.
4. Mueve el brazo leader.

La pestaña transmite las posiciones articulares mientras se ejecuta. Pulsa detener cuando termines.

**Detener es lo que aparca el follower.** Cerrar la pestaña o matar el proceso deja el brazo donde está.

## Qué comprobar

| Comprobación | Por qué |
|---|---|
| El follower sigue con suavidad, sin retraso ni vibración | Un seguimiento tosco se convierte en datos de entrenamiento inutilizables |
| El rango del follower coincide con el del leader | Quedarse corto o tocar un límite significa que una articulación está mal calibrada — vuelve a la [página 3](03-Calibration.md) |
| Ambos brazos se mueven en la misma dirección | Un follower invertido significa que una articulación se calibró en la dirección equivocada |
| Nada choca en los extremos | Recorre todo el rango que piensas usar |

Si el movimiento es incorrecto pero no está roto — desfase, una articulación invertida, recorrido corto — recalibra en lugar de compensar. Un brazo mal calibrado produce un dataset que entrena a la política para hacer lo incorrecto.

## Cámaras

Si hay cámaras configuradas, la vista de teleoperación muestra sus vistas previas.

- Cámara de muñeca: ¿muestra la pinza y lo que está a punto de agarrar?
- Cámara fija: ¿muestra todo el espacio de trabajo?
- ¿Alguna imagen está de lado o boca abajo? Corrige la **rotation** en la [pestaña de calibración](03-Calibration.md) antes de grabar.

Los fotogramas grabados durante la teleoperación son lo único que la política llega a ver.

---

> **Siguiente:** [05 Grabar un dataset](05-Record-Dataset.md)

<RelatedProducts slugs="so-arm101" />
