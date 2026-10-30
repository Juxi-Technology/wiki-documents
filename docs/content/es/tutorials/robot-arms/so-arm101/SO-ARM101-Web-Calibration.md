---
title: "Calibración de servos STS3215 de la serie So-ARM - versión web"
description: "Versión web de la calibración de servos STS3215 del So-ARM101: conexión de los brazos líder y seguidor mediante Web Serial del navegador, calibración central y de recorrido, teleoperación, depurador FT y exportación de archivos de calibración."
---

# Calibración de servos STS3215 de la serie So-ARM - versión web

> **Herramienta de escritorio:** [Tutorial de uso de la herramienta de calibración de servos de la serie SoARM](./SO-ARM101-Servo-Calibration-Tool.md)

La **versión web** de la herramienta de calibración de servos del So-ARM101: toda la interfaz se ejecuta en el navegador y se conecta directamente al puerto serie mediante Web Serial, **sin necesidad de instalar Python**.

Dirección en línea:

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ Esta herramienta solo admite **servos Feetech (serie STS3215)**.

## 1. Preparación antes del uso

- **Navegador**: Chrome o Edge 89+ (Firefox / Safari no admiten Web Serial)
- Ábrala en **HTTPS o localhost**; GitHub Pages ya cumple este requisito
- **Adaptador USB a serie** + servos Feetech STS3215, **tasa de baudios predeterminada de 1 M** (`1000000`)


## 2. Conexión del brazo robótico

1. En la parte izquierda de la barra superior, seleccione la «**tasa de baudios de conexión**»; el valor predeterminado es `1000000`. **Si se ha modificado la tasa de baudios del servo, selecciónela correctamente antes de conectar**.
1. Haga clic en «**Conectar puerto serie**» del «brazo líder» o del «brazo seguidor» y seleccione el puerto COM correspondiente en la ventana emergente del navegador.
1. Tras una conexión correcta, se escanean automáticamente los servos (ID 1–6).


> Los dos brazos se pueden conectar por separado y operar de forma independiente. Si no se detectan servos al escanear, compruebe primero si la tasa de baudios de conexión coincide con la del servo y luego confirme que el puerto serie no está ocupado por otro programa.

## 3. Modo de demostración (sin hardware)

Marque «**Modo de demostración (sin hardware)**» en la barra superior y luego conéctese; se usará un conjunto de datos simulados de 6 servos para explorar toda la interfaz.

> Los datos del modo de demostración son simulados y **no accionan hardware real**.

## 4. Tres páginas de funciones

### 🦾 Calibración de servos

Muestra en tiempo real la posición, el voltaje, la temperatura y el estado del par de cada servo; ofrece las operaciones «calibración central», «prueba central», «desactivar motores» y «borrar límites» para un servo individual, así como la entrada a la calibración de todo el brazo.

### 🎚️ Control de un solo servo

Cada servo ocupa una fila: **ID / Pos / deslizador / L (objetivo)**.

- **Pos y deslizador están vinculados en ambos sentidos**: al arrastrar el deslizador, Pos lo sigue y el comando se envía al soltar; si se introduce un valor en Pos, se envía de inmediato.


### 🔬 Depurador FT

Conexión serie, escaneo de servos, lectura de todos los registros, lectura/escritura de un registro individual, control de posición, modificación de la tasa de baudios, restauración de fábrica, copia de seguridad y restauración de parámetros xdat.

## 5. Flujo completo de calibración (recomendado)

1. En la página «Calibración de servos», haga clic en «**Calibración central del brazo líder**» para abrir el asistente.
1. Haga clic en «**Iniciar registro de la posición central**» (el botón se vuelve naranja) → coloque el brazo robótico en la posición central estándar → haga clic en «**Finalizar registro de la posición central**».
1. Haga clic en «**Registrar el recorrido de movimiento**» (el botón se vuelve verde) → gire cada articulación de principio a fin (**la pinza también debe girarse**) → haga clic de nuevo para detener.
1. Cuando terminen las 6 articulaciones, **el archivo de calibración se guarda automáticamente**; repita el proceso para el brazo seguidor.
1. Con ambos brazos calibrados, haga clic en «**🎮 Teleoperación**» en la barra superior para mover el brazo seguidor con el brazo líder.


## 6. Dónde se coloca el archivo de calibración

El navegador solo puede descargar archivos al directorio «Descargas». Tras guardar, el asistente muestra la ruta de destino; **muévalo manualmente a esa ubicación**:

| Parte | Ruta de destino |
|---|---|
| Brazo líder | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Brazo seguidor | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

En Windows, `~` es `%USERPROFILE%`; la ruta completa tiene la forma `%USERPROFILE%.cache\huggingface\lerobot\calibration...`.

## 7. Teleoperación

Con ambos brazos calibrados y conectados, haga clic en «**🎮 Teleoperación**» en la barra superior para mover el brazo seguidor con los ángulos del brazo líder. Haga clic de nuevo en «⏹ Detener teleoperación» para finalizar.

> Antes de la teleoperación, confirme que el entorno de ambos brazos es seguro: **con el par activado, los servos no se pueden mover con la mano**. La teleoperación requiere dos puertos serie conectados.

## 8. Detalles del depurador FT

### Lectura y escritura de registros

- Haga clic en «**Leer todos los parámetros**» para leer todos los registros del servo seleccionado; el resultado se rellena en la tabla de parámetros.
- **Al hacer clic en una fila de la tabla de parámetros se rellenan la dirección y la longitud superiores; luego introduzca el «valor» y haga clic en «escribir**».
- Las filas grises (área DEFAULT) **no se pueden leer ni escribir**, lo que evita escribir por error en áreas de solo lectura.


### Control de posición

Tras seleccionar el servo, establezca la posición objetivo con el deslizador o un valor numérico y haga clic en «Mover» para ejecutar. Si el par no está activado, primero se preguntará si desea activarlo.

### Modificación de la tasa de baudios

Tras seleccionar la nueva tasa de baudios, haga clic en «Aplicar»; una vez escrita, la conexión se cierra y se intenta reconectar con la nueva tasa de baudios; si falla, el registro indicará el motivo.

### Restauración de los valores de fábrica

Devuelve el ID a 1 y la tasa de baudios a 1M, **y es irreversible**; la ejecución requiere una segunda confirmación.

### Copia de seguridad y restauración de parámetros xdat

| Botón | Función |
|---|---|
| 💾 Guardar el servo actual como xdat | Lee todos los parámetros y descarga un archivo `.xdat` |
| 📂 Abrir xdat | Carga un archivo `.xdat` local |
| 📤 Restaurar parámetros en el servo | Escribe los parámetros xdat en la EEPROM del servo actual |

> La restauración sobrescribe ajustes como el ID, la tasa de baudios y los límites; antes de ejecutarla, confirme que el servo seleccionado es el correcto. La EEPROM tiene una vida útil de escritura; no la escriba con frecuencia.

## 9. Notas

1. **La página debe permanecer en primer plano**: el navegador limita las pestañas en segundo plano, y la teleoperación y la actualización en tiempo real se ralentizan o incluso se detienen.
1. **El recorrido de una misma articulación debe escanearse de forma coherente en ambos brazos**; de lo contrario, la amplitud de movimiento no coincidirá durante la teleoperación.
1. **La pinza no es una articulación de rotación continua y también debe recorrerse**; de lo contrario, el rango quedará en el valor predeterminado 0–4095.
1. En el depurador FT, **las filas grises (área DEFAULT) no se pueden leer ni escribir**; la EEPROM tiene una vida útil de escritura, no la escriba con frecuencia.
1. **Antes de la teleoperación, confirme que el entorno de ambos brazos es seguro**; con el par activado, los servos no se pueden mover con la mano.
1. Solo un programa puede ocupar el puerto serie a la vez; mientras use esta página, cierre la versión de escritorio u otras herramientas de control.


## 10. Preguntas frecuentes

**P1: No se puede conectar / no se detectan servos al escanear.**
Compruebe primero si la tasa de baudios de conexión coincide con la del servo y luego confirme que el puerto serie no está ocupado por otro programa.

**P2: Pos no se actualiza.**
Confirme que el servo está en línea; vuelva a hacer clic en «Conectar puerto serie» o actualice la página.

**P3: Falla la escritura.**
Consulte el motivo concreto en el registro; confirme que la dirección y la longitud provienen de una fila de la tabla de parámetros.

**P4: Aparece un aviso de que el navegador actual no admite Web Serial.**
Use Chrome / Edge 89+ y abra la página mediante HTTPS o localhost.

**P5: LeRobot no encuentra el archivo de calibración tras guardarlo.**
El navegador solo descarga al directorio «Descargas»; debe moverlo manualmente a las rutas indicadas en la sección 6.
