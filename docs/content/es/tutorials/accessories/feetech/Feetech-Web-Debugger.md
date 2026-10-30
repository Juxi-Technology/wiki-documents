---
title: "Depuración web de servos de bus Feetech (SCS0009 / STS3215 / HD1910)"
description: "Depuración web de servos de bus Feetech: conexión mediante Web Serial del navegador; compatible con escaneo, lectura/escritura de parámetros, control de posición, modificación de la tasa de baudios, restauración de fábrica y copia de seguridad xdat en SCS0009 / STS3215 / HD1910."
---

# Depuración web de servos de bus Feetech (SCS0009 / STS3215 / HD1910)

> **Herramienta de escritorio:** [Tutorial de uso de la herramienta de depuración del servo SCS0009](./SCS0009-Debug-Tool.md) ｜ [Tutorial de depuración STS3215 & SCS0009](./Feetech-STS3215&SCS0009-Tutorial.md)

Versión web de la herramienta de depuración de servos de bus Feetech: el navegador abre directamente el puerto serie USB mediante **Web Serial** para comunicarse con los servos, y permite realizar la conexión por puerto serie, el escaneo de servos, la identificación de modelos, la lectura/escritura de parámetros, el control de posición y el seguimiento en tiempo real, la modificación de la tasa de baudios, la restauración de fábrica, así como la copia de seguridad y restauración de parámetros xdat.

Página puramente estática, **sin necesidad de instalar ningún software ni un entorno de Python**; basta con abrir la URL. Actualmente es compatible con los tres modelos **SCS0009**, **STS3215** y **HD1910**.

## 1. Abrir la página web

Dirección en línea:

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

El mismo sitio incluye además un tutorial de uso web completo (con cambio entre chino e inglés):

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Requisitos del entorno:

- **Chrome o Edge 89+** (Firefox y Safari no admiten Web Serial)
- La página debe abrirse mediante **https o localhost**
- Es necesario instalar el controlador USB a TTL (CH340, CH343, CP2102, etc.)


## 2. Conexión del puerto serie

1. En el área «🔌 Conexión por puerto serie», seleccione la **tasa de baudios**; el valor predeterminado es 1000000 (1M).
1. Haga clic en «**Conectar puerto serie**» y seleccione, en el cuadro de diálogo del sistema que abre el navegador, el puerto USB correspondiente al servo.
1. Tras una conexión correcta, el estado de la esquina superior derecha cambia a «🟢 Conectado».


Tasas de baudios disponibles: 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Escaneo de servos e identificación de modelos

1. Tras conectar el puerto serie, haga clic en «🔍 **Escanear servos**». La página escanea los ID 1–254 y **muestra cada servo en cuanto lo encuentra**, sin esperar a que termine el escaneo completo.
1. Durante el escaneo, el botón cambia a «⏹ **Detener escaneo**» en rojo; haga clic de nuevo para interrumpirlo. Los servos ya encontrados se conservan.
1. Haga clic en el chip del servo (o en el desplegable superior) para seleccionar el servo de destino.


El modelo se determina automáticamente a partir de **los dos bytes de las direcciones 3 / 4** del servo (versión principal y versión secundaria):

| Modelo | Bytes de identificación (principal / secundaria) | Rango de posición | Orden de bytes |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | big-endian |
| STS3215 | 9 / 3 | 0–4095 | little-endian |
| HD1910 | 10 / 31 | 0–4095 | little-endian |

El resultado de la identificación se muestra en el chip del servo, por ejemplo **ID1 (SCS0009 · SCS)**; la tabla de parámetros y el rango de posición cambian automáticamente según el servo seleccionado. Los modelos que no aparecen en la tabla de identificación se muestran como «modelo desconocido», y en el registro se imprimen los dos bytes realmente leídos para facilitar su incorporación.

## 4. Tabla de parámetros

La tabla de parámetros muestra todos los registros del servo seleccionado en cinco columnas (**dirección, registro, valor, área de almacenamiento, lectura/escritura**); el área de almacenamiento se divide en EPROM, SRAM y DEFAULT, y se colorea según el área.

> **Solo se puede seleccionar y escribir la fila cuya columna «lectura/escritura» está marcada como escribible**; los registros de solo lectura y el área DEFAULT no se pueden seleccionar y no entran en la fila de escritura, lo que evita escribir por error en áreas de solo lectura.

## 5. Lectura y escritura de parámetros

**Leer parámetros**: tras hacer clic en el chip para seleccionar el servo de destino, la página **lee automáticamente todos los parámetros de ese servo** y los rellena en la tabla de parámetros; además, ajusta el deslizador de control de posición a su posición real actual. También puede hacer clic en «📖 Leer parámetros» en cualquier momento para actualizar manualmente.

**Escribir parámetros**:

1. **Seleccione una fila** en la tabla de parámetros (solo se pueden seleccionar las filas escribibles).
1. Los campos «dirección de escritura 0x» y «longitud» de la parte inferior se rellenan automáticamente.
1. Introduzca el nuevo valor en el campo «valor» y haga clic en «✏️ **Escribir**».
1. Al escribir en la EEPROM, la página **desbloquea → escribe → bloquea** automáticamente; el resultado se muestra en una capa flotante con el éxito o el motivo del fallo.


> Antes de modificar parámetros como el ID, la tasa de baudios o los límites de ángulo, use «Guardar servo actual» para hacer una copia de seguridad xdat; así podrá restaurarla si algo sale mal.

## 6. Control de posición

1. Tras seleccionar el servo, arrastre el deslizador de **posición objetivo** en el área «🎯 Control de posición», o introduzca el valor directamente en la casilla numérica. El rango varía según el modelo: **SCS0009 es 0–1023** y **STS3215 / HD1910 es 0–4095**; el deslizador y la casilla numérica están vinculados en ambos sentidos.
1. Ajuste la **velocidad** (valor original del registro; su unidad tiene significados distintos según la serie).
1. Haga clic en «▶ **Mover**» para ejecutar; la página sondea el indicador MOVING y, al terminar el movimiento, indica que se desactive el par.


**Seguimiento en tiempo real**: al marcar «seguimiento en tiempo real», el servo sigue en tiempo real al arrastrar el deslizador. Al marcarlo, primero se pide una segunda confirmación y se activa automáticamente el par de ese servo; el envío está limitado para no saturar el bus. Al cambiar de servo, volver a escanear o desconectar, se desactiva automáticamente y se recuerda desactivar el par.

Control del par:

| Botón | Función |
|---|---|
| ⚡ Activar par | Activa el par del servo actual |
| ⏹ Desactivar par | Desactiva el par del servo actual |
| ⏹ Desactivar todo el par | Libera de una vez todos los servos del bus |

> **Si se produce una desconexión repentina durante un movimiento, vuelva a conectar y desactive el par de inmediato.**

## 7. Lectura de estado

Haga clic en «📊 Leer estado»; la barra de estado inferior muestra la posición actual, la velocidad, la carga, el voltaje, la temperatura, la corriente y el indicador de funcionamiento.

## 8. Modificación de la tasa de baudios

1. En el área «🔧 Tasa de baudios / Restauración de fábrica», seleccione la **nueva tasa de baudios**.
1. Haga clic en «🔧 **Modificar tasa de baudios**».
1. Tras escribir, la página **vuelve a abrir el puerto serie a la nueva velocidad y lo verifica leyendo de nuevo**; si falla, **revierte automáticamente** a la tasa de baudios original para evitar que el servo quede inaccesible.


## 9. Restauración de fábrica

Haga clic en «🔄 **Restaurar de fábrica**»; la ejecución requiere **una segunda confirmación**. El comando de restauración varía según la serie, y la página lo selecciona automáticamente según el modelo identificado:

| Modelo | Comando de restauración | Después de ejecutar |
|---|---|---|
| SCS0009 | 0x0A restauración de fábrica | El ID vuelve a 1 y la tasa de baudios a 1M |
| STS3215 / HD1910 | 0x06 restauración de parámetros | El ID se mantiene y el resto de parámetros vuelven a los valores predeterminados |

> La restauración de fábrica **es irreversible**; se recomienda guardar un xdat antes de ejecutarla.

## 10. Copia de seguridad y restauración de parámetros xdat

El área «📁 Parámetros xdat (solo guarda EEPROM)» ofrece tres operaciones:

| Botón | Función |
|---|---|
| 💾 Guardar servo actual | Lee todos los parámetros de ese servo y los descarga como archivo .xdat |
| 📂 Abrir xdat | Carga un archivo .xdat local y muestra una vista previa del contenido |
| 📤 Restaurar parámetros en el servo | Escribe los parámetros xdat cargados en la EEPROM del servo actual |

El nombre del archivo guardado incluye **el modelo y el ID**, por ejemplo **SCS0009_ID1.xdat** o **HD1910_ID6.xdat**, para evitar que el mismo ID de modelos distintos se sobrescriba entre sí.

El formato del archivo es «cabecera de 2 bytes + área de datos de 49 bytes»; la dirección de registro A se almacena en el desplazamiento A+2, y los valores multibyte se guardan según el orden de bytes del modelo (SCS big-endian, STS / HD1910 little-endian).

> Para evitar escrituras incorrectas de parámetros, la página verifica si el archivo y el servo actual pertenecen a la misma familia de orden de bytes y **prohíbe la escritura si no coinciden**. Al restaurar solo se escriben los parámetros EEPROM escribibles, omitiendo el modelo y las áreas de solo lectura; el área de datos solo cubre las direcciones 0–48. Antes de restaurar, confirme que el ID del servo seleccionado es correcto.

## 11. Registro

El «📜 Registro» de la parte inferior de la página registra en tiempo real cada operación y el resultado devuelto; puede hacer clic en «Borrar» para limpiarlo.

La interfaz admite el **cambio entre chino e inglés**: el botón «EN / English» de la esquina superior derecha cambia al instante el idioma de la interfaz y del registro, y el historial también se actualiza, sin necesidad de volver a conectar.

## 12. Avisos de seguridad

- ⚠️ Solo un programa puede ocupar el puerto serie a la vez. Mientras use esta página, cierre otros programas como la herramienta de escritorio o el monitor de puerto serie.
- ⚠️ Si se desconecta el cable durante un movimiento, el servo puede seguir ejecutándolo; tras volver a conectar, **desactive primero el par**.
- ⚠️ Realice siempre el cableado y las conexiones con la alimentación desconectada.
- ⚠️ Antes de salir de la página, puede hacer clic en «⏹ Desactivar todo el par» para liberar todos los servos de una vez.


## 13. Preguntas frecuentes

**P1: La página indica que Web Serial no es compatible o no se puede conectar.**
Use Chrome / Edge 89+ y acceda mediante https o localhost. Firefox y Safari no implementan Web Serial.

**P2: La conexión falla y aparece un aviso de que no se puede abrir el puerto serie.**
Confirme que el puerto serie no está ocupado por otro programa (herramienta de escritorio, monitor de puerto serie, Arduino IDE, etc.) y que el controlador USB a TTL está instalado.

**P3: No se detectan servos al escanear.**
Confirme que el cableado es correcto, que el servo tiene alimentación y que la tasa de baudios coincide con la del servo. Si se ha modificado la tasa de baudios del servo, pruebe primero otras opciones; si hay un conflicto de ID en el bus, dos servos responderán a la vez: conecte uno solo para investigar.

**P4: Algunas filas de la tabla de parámetros no se pueden seleccionar.**
Es el comportamiento previsto: solo se pueden seleccionar y escribir las filas cuya columna «lectura/escritura» está marcada como escribible; los registros de solo lectura y el área DEFAULT no son escribibles.

**P5: ¿Qué hacer si falla la modificación de la tasa de baudios?**
La página revierte automáticamente a la tasa de baudios original e indica el motivo del fallo; revise el cableado y vuelva a intentarlo.

**P6: ¿Qué hacer si el servo muestra «modelo desconocido»?**
Significa que los dos bytes de las direcciones 3 / 4 de ese servo no están en la tabla de identificación. Actualmente solo son compatibles SCS0009, STS3215 y HD1910; puede consultar los valores de «versión principal / versión secundaria» del registro y comunicárnoslos para que los añadamos.

**P7: El comportamiento no cambia tras actualizar la página.**
El navegador almacena en caché los scripts; fuerce una recarga (Windows: Ctrl+Shift+R; macOS: Cmd+Shift+R).
