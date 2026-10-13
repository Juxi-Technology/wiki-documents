---
title: "7 · Solución de problemas"
description: "Solución de problemas de LeLab por síntoma: conflictos de puertos, problemas de USB y serie, fallos de calibración y grabación, y qué revisar a continuación."
---

# 7 · Solución de problemas

> **Anterior:** [06 Entrenar y ejecutar la inferencia](06-Train-and-Inference.md)

Agrupados por síntoma.

## La página no abre, o un puerto está en uso

Los puertos **8000** y **8080** son de LeLab. Un proceso obsoleto suele ser la causa — uno que cerraste al cerrar la terminal en lugar de con `Ctrl+C`.

```bash
lelab --stop
```

Libera ambos puertos. Para comprobarlo antes de arrancar:

```bash
curl http://localhost:8000/health
```

Una respuesta JSON significa que algo se está ejecutando en el 8000.

## En modo `--dev` la página aparece en blanco o da 404

Vite sirve la interfaz en **:8080**; la API se ejecuta en **:8000**. Navega por `:8080`. El puerto 8000 en `--dev` te da una API sin interfaz.

## Los brazos no aparecen

Comprueba que los puertos son visibles para tu usuario. En Linux, un grupo que falta da la impresión de que el brazo no está:

```bash
ls /dev/ttyACM*
groups | grep dialout
```

Si falta `dialout`:

```bash
sudo usermod -aG dialout $USER
```

Luego **cierra sesión y vuelve a entrar** — el grupo se lee al iniciar sesión, así que una terminal nueva no basta.

### Solo se encuentra un brazo

Usa **dos puertos USB separados**, no un concentrador; ambos brazos se enumeran como el mismo tipo de dispositivo y un concentrador compartido puede presentarlos de forma poco fiable. Para identificar un puerto, desconecta un brazo y observa qué entrada de la lista desaparece.

## Tengo que recalibrar cada vez

Los archivos de calibración viven bajo `~/.cache/huggingface/lerobot/` — es decir, bajo `~/.cache/`. Las herramientas de limpieza de caché y los reinicios de contenedores se los llevan.

- Haz una copia de seguridad de `~/.cache/huggingface/lerobot/calibration/` en un lugar duradero.
- En un contenedor, monta ese directorio como volumen.

### Un brazo calibrado se comporta de forma extraña sin pedir que lo recalibres

Comprueba que el **perfil** seleccionado pertenece a ese brazo físico. Los perfiles están ligados a los puntos cero de un brazo; intercambiar los brazos significa recalibrar.

## Una imagen de cámara está boca abajo o de lado

Define la **Rotation** de la cámara en la [pestaña Calibration](03-Calibration.md): 0°, 90°, 180° o 270° en sentido horario. Una cámara de muñeca boca abajo es 180°.

**90° y 270° intercambian las dimensiones de salida** — una captura de 640 × 480 pasa a ser 480 × 640.

## La política entrenada no hace nada útil

En orden — las dos primeras son mucho más comunes que un entrenamiento malo:

1. **Rotación de la cámara.** Confirma que la inferencia usa la rotación empleada al grabar. 0° y 180° tienen dimensiones de imagen idénticas, así que nada te avisa.
2. **Asignación de cámaras.** Si la cámara llamada `wrist` durante la grabación es ahora una cámara física diferente, la política ve la imagen equivocada.
3. **Posición inicial y descripción de la tarea.** La inferencia debe empezar desde la disposición con la que empezaron las demostraciones.
4. **Checkpoints.** Prueba uno anterior.

## Usar un teléfono como cámara

Los navegadores conceden acceso a la cámara (`getUserMedia`) solo por **HTTPS**, salvo en `localhost`, así que un teléfono que se conecta por la LAN es rechazado.

Guía de configuración: [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). Los certificados son autofirmados, así que el navegador muestra un aviso que hay que aceptar.

La instalación por defecto **no** arranca con HTTPS; las cámaras de teléfono necesitan el arranque manual con los indicadores de certificado descritos ahí.

## Un dataset no se puede abrir — "aún no descargado"

LeRobot escribe el índice del dataset cuando una grabación **termina correctamente**. Una sesión matada a mitad de episodio puede dejar un directorio que parece completo pero no lo está. Los datos del episodio normalmente siguen en disco; lo que falta es el índice. Vuelve a grabar la sesión y deténla con el botón de detener.

## El entrenamiento dice que falta un paquete

Algunos tipos de política y funciones opcionales de entrenamiento necesitan dependencias que no se instalan por defecto. La pestaña Training ofrece instalarlas cuando seleccionas uno; espera a que termine la instalación en segundo plano antes de iniciar el trabajo. El registro de entrenamiento nombra el paquete si prefieres instalarlo a mano.

## No aparece ninguna notificación de actualización

Es intencionado: la comprobación solo se aplica a las instalaciones hechas desde git. Una **instalación editable** (`pip install -e .`) es una copia de trabajo y no se comprueba. Actualízalas con `git pull`.

## Sigo atascado

Recoge la **consola del navegador** y la **terminal que ejecuta `lelab`** — el servidor registra la petición que falló. La mayoría de estos fallos están a un paso de lo último que cambiaste.

---

> **Volver al principio:** [01 Descripción general](01-Overview.md) · [Índice del tutorial](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
