---
title: Protocolo de comunicación SCS de servos
description: "El nivel de comunicación utiliza TTL compatible con alta velocidad y RS485 con fuerte inmunidad a interferencias; la comunicación sigue siendo dúplex asíncrona, la transmisión y recepción se procesan de forma asíncrona."
---

# Protocolo de comunicación SCS de servos

> **[Comprar en la tienda](https://www.juxitech.com/es/products/feetech-scs0009-serial-bus-servo)**


# 1 Resumen del protocolo de comunicación

  El nivel de comunicación utiliza TTL compatible con alta velocidad y RS485 con fuerte inmunidad a interferencias; la comunicación sigue siendo dúplex asíncrona, la transmisión y recepción se procesan de forma asíncrona.

  El controlador y el servo se comunican en modo pregunta-respuesta: el controlador envía una trama de comando y el servo devuelve una trama de respuesta.

  Una red de control de bus puede contener varios servos, por lo que cada servo tiene un número de ID único dentro de la red. El comando enviado por el controlador incluye la información del ID; solo el servo cuyo ID coincida puede recibir completamente este comando y devolver una respuesta.

La comunicación es serie asíncrona: una trama consta de 1 bit de inicio, 8 bits de datos y 1 bit de parada, sin bit de paridad, 10 bits en total.

  Cuando algunos parámetros de la tabla de memoria usan dos bytes, el orden de los bytes depende del modelo del servo: los servos con potenciómetro usan formato big-endian (byte alto primero, byte bajo después), los servos con encoder magnético usan formato little-endian (byte bajo primero, byte alto después). Como cada servo tiene funciones ligeramente distintas, consulte la tabla de memoria del modelo específico para el control real.

# 2 Trama de comando

- Cabecera: recibir dos 0xFF consecutivos indica que ha llegado un paquete de datos.
Número de ID: cada servo tiene un ID. Rango 0 a 253, en hexadecimal 0x00 a 0xFD.

- ID de difusión: el ID 254 es el ID de difusión. Si el controlador envía el ID 254 (0xFE), todos los servos reciben el comando; salvo PING, los demás comandos no devuelven respuesta (con varios servos en el bus no se puede usar el comando PING de difusión).

- Longitud de datos: igual al número de parámetros N a enviar más 2, es decir «N+2».

- Comando: código de función del paquete de datos, ver 1.3 Tipos de comando.

- Parámetros: información de control adicional al comando; un parámetro puede representar un valor de memoria con un máximo de dos bytes. Orden de bytes: ver la tabla de control de memoria del manual del servo (difiere según el modelo).

- Suma de verificación: cálculo del Check Sum:
Check Sum = ~ (ID + Length + Instruction + Parameter1 + … Parameter N) Si la suma entre paréntesis supera 255, tomar solo el byte más bajo. «~» representa la inversión de bits.

# 3 Trama de respuesta

La trama de respuesta contiene el estado actual ERROR del servo. Si el estado de funcionamiento no es normal, se refleja en este byte (significado de cada estado: ver tabla de control de memoria del manual). Si ERROR es 0, el servo no tiene errores.

# 4 Tipos de comando

## 4.1 Comando de consulta de estado PING

- Función: leer el estado de funcionamiento del servo

- Longitud: 0x02

- Comando: 0x01

- Parámetros: ninguno

- PING usando la dirección de difusión también devuelve respuesta.

Ejemplo 1: leer el estado del servo con ID 1.

Trama de comando: FF FF 01 02 01 FB (enviar en hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 02
Comando: 01
Suma de verificación: FB
```

Trama de respuesta:  FF FF 01 02 00 FC (visualización hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 02
Estado: 00
Suma de verificación: FC
```

## 4.2 Comando de lectura READ DATA

- Función: leer datos de la tabla de control de memoria del servo

- Longitud: 0x04

- Comando: 0x02

- Parámetro 1: dirección inicial del segmento de lectura

- Parámetro 2: longitud de los datos a leer

Ejemplo 2: leer la posición actual del servo con ID 1 (byte bajo primero, byte alto después). La dirección del parámetro de posición es 0X38, dos bytes consecutivos.

Trama de comando: FF FF 01 04 02 38 02 BE (enviar en hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 04
Comando: 02
Parámetros: 38 02 (dirección posición actual, longitud de datos a leer)
Suma de verificación: BE
```

Trama de respuesta: FF FF 01 04 00 18 05 DD (visualización hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 04
Estado: 00
Parámetros: 18 05
Suma de verificación: DD
```

Los dos bytes leídos (estructura little-endian): byte bajo L 0x18, byte alto H 0x05. Los dos bytes forman el dato de 16 bits 0X0518, en decimal la posición actual es 1304.

## 4.3 Comando de escritura WRITE DATA

- Función: escribir datos en la tabla de control de memoria del servo

- Longitud: N+2 (N = longitud de parámetros)

- Comando: 0x03

- Parámetro 1: dirección inicial del segmento de escritura

- Parámetro 2: primer dato a escribir

- Parámetro 3: segundo dato a escribir
…

- Parámetro N: n-ésimo dato a escribir, N=n+1

Ejemplo 3: con el ID de difusión (0xFE), establecer el ID de un servo cualquiera a 1. En la tabla de memoria, la dirección para guardar el ID es 5.

Trama de comando: FF FF FE 04 03 05 01 F4 (enviar en hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 04
Comando: 03
Parámetros: 05 01 (dirección del ID, nuevo valor de ID)
Suma de verificación: F4
```

Como se envía con el ID de difusión, no habrá respuesta de datos. Además, la EPROM de la tabla de memoria tiene un interruptor de bloqueo de protección; hay que desactivarlo (0) antes de modificar el ID; de lo contrario, el ID del ejemplo no se guardará al cortar la alimentación. Consulte la tabla de memoria o el manual del modelo de servo específico.

Ejemplo 4: controlar el servo ID1 para girar a 1000 pasos por segundo hasta la posición 2048. La dirección inicial de la posición objetivo es 0x2A, por lo que se escriben seis bytes consecutivos a partir de 0x2A.

- Dato de posición 0x0800 (2048)

- Dato reservado 0x0000 (0)

- Dato de velocidad 0x03E8 (1000)

Trama de comando: FF FF 01 09 03 2A 00 08 00 00 E8 03 D5 (enviar en hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 09
Comando: 03
Parámetros:
2A (dirección inicial)
00 08 (posición)
00 00 (reservado)
E8 03 (velocidad)
Suma de verificación: D5
```

Trama de respuesta: FF FF 01 02 00 FC (visualización hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 02
Estado: 00
Suma de verificación: FC
```

El estado de funcionamiento devuelto es 0: el servo recibió el comando sin errores y comenzó a ejecutarlo. Como el ID del paquete enviado no es el de difusión (0xFE), el servo devuelve un paquete de estado tras recibir el comando.

## 4.4 Comando de escritura asíncrona REG WRITE

REG WRITE es similar a WRITE DATA, pero el momento de ejecución es distinto. Al recibir una trama REG WRITE, los datos se almacenan en un búfer y el registro de escritura asíncrona se pone a 1. Al recibir el comando ACTION, el comando almacenado se ejecuta finalmente.

- Longitud: N+2 (N = longitud de parámetros)

- Comando: 0x04

- Parámetro 1: dirección inicial de la zona de escritura

- Parámetro 2: primer dato a escribir

- Parámetro 3: segundo dato a escribir

- Parámetro N: n-ésimo dato a escribir, N=n+1

Ejemplo 5: controlar los servos ID1 a ID10 para girar a 1000 pasos/s hasta la posición 2048.

```Plain Text
ID 1: trama de escritura asíncrona: FF FF 01 09 04 2A 00 08 00 00 E8 03 D4
ID 1: trama de respuesta: FF FF 01 02 00 FC
ID 2: trama de escritura asíncrona: FF FF 02 09 04 2A 00 08 00 00 E8 03 D3
ID 2: trama de respuesta: FF FF 02 02 00 FB
ID 3: trama de escritura asíncrona: FF FF 03 09 04 2A 00 08 00 00 E8 03 D2
ID 3: trama de respuesta: FF FF 03 02 00 FA
ID 4: trama de escritura asíncrona: FF FF 04 09 04 2A 00 08 00 00 E8 03 D1
ID 4: trama de respuesta: FF FF 04 02 00 F9
ID 5: trama de escritura asíncrona: FF FF 05 09 04 2A 00 08 00 00 E8 03 D0
ID 5: trama de respuesta: FF FF 05 02 00 F8
ID 6: trama de escritura asíncrona: FF FF 06 09 04 2A 00 08 00 00 E8 03 CF
ID 6: trama de respuesta: FF FF 06 02 00 F7
ID 7: trama de escritura asíncrona: FF FF 07 09 04 2A 00 08 00 00 E8 03 CE
ID 7: trama de respuesta: FF FF 07 02 00 F6
ID 8: trama de escritura asíncrona: FF FF 08 09 04 2A 00 08 00 00 E8 03 CD
ID 8: trama de respuesta: FF FF 08 02 00 F5
ID 9: trama de escritura asíncrona: FF FF 09 09 04 2A 00 08 00 00 E8 03 CC
ID 9: trama de respuesta: FF FF 09 02 00 F4
ID10: trama de escritura asíncrona: FF FF 0A 09 04 2A 00 08 00 00 E8 03 CB
ID10: trama de respuesta: FF FF 0A 02 00 F3
```

## 4.5 Ejecutar la escritura asíncrona ACTION

- Función: disparar el comando REG WRITE

- Longitud: 0x02

- Comando: 0x05

- Parámetros: ninguno

1. ACTION es muy útil al controlar varios servos a la vez.

2. Al controlar varios servos, ACTION permite que el primero y el último servo ejecuten sus acciones simultáneamente, sin retardo intermedio.

3. Para enviar ACTION a varios servos se usa el ID de difusión (0xFE); por tanto, no se devuelve ninguna trama de datos.

Ejemplo 6: tras enviar la escritura asíncrona para los servos ID1 a ID10 (1000 pasos/s hacia la posición 2048), hay que ejecutar el comando de escritura asíncrona.

```Plain Text
Trama de comando: FF FF FE 02 05 FA
Trama de respuesta: ninguna
```

## 4.6 Comando de escritura síncrona SYNC WRITE

- Función: controlar varios servos simultáneamente.

- ID: 0xFE

- Longitud: (L+1)*n+4 (L: longitud de datos enviada a cada servo, n: número de servos)

- Comando: 0x83

- Parámetro 1: dirección inicial de los datos a escribir

- Parámetro 2: longitud de los datos a escribir (L)

- Parámetro 3: ID del primer servo

- Parámetro 4: primer dato del primer servo

- Parámetro 5: segundo dato del primer servo
…

- Parámetro L+3: L-ésimo dato del primer servo

- Parámetro L+4: ID del segundo servo

- Parámetro L+5: primer dato del segundo servo

- Parámetro L+6: segundo dato del segundo servo
…

- Parámetro 2L+4: L-ésimo dato del segundo servo
…

A diferencia de REG WRITE+ACTION, el tiempo real es mejor: un solo comando SYNC WRITE puede modificar las tablas de control de varios servos a la vez, mientras que REG WRITE+ACTION lo hace por pasos. Aun así, con SYNC WRITE la longitud de los datos escritos y la dirección inicial deben ser las mismas.

Ejemplo 7: escribir para 4 servos (ID1-ID4) en la dirección inicial 0x2A: posición 0x0800, tiempo 0X0000 y velocidad 0x03E8 (byte bajo primero, byte alto después).

Trama de comando: FF FF FE 20 83 2A 06 01 00 08 00 00 E8 03 02 00 08 00 00 E8 03 03 00 08 00 00 E8 03 04 00 08 00 00 E8 03 58 (enviar en hexadecimal)

```Plain Text
Cabecera: FF FF
ID: FE
Longitud de datos efectiva: 20
Comando: 83
Parámetros:
2A 06 (dirección inicial, longitud de datos)
01 00 08 00 00 E8 03 (comando servo ID1)
02 00 08 00 00 E8 03 (comando servo ID2)
03 00 08 00 00 E8 03 (comando servo ID3)
04 00 08 00 00 E8 03 (comando servo ID4)
Suma de verificación: 58
```

## 4.7 Comando de lectura síncrona SYNC READ

- Función: consultar varios servos simultáneamente.

- ID: 0xFE

- Longitud: n+4 (n = número de servos)

- Comando: 0x82

- Parámetro 1: dirección inicial de los datos a leer

- Parámetro 2: longitud de los datos a leer

- Parámetro 3: ID del primer servo

- Parámetro 4: ID del segundo servo
…

- Parámetro N: ID del n-ésimo servo, N=n+2

Un comando SYNC READ consulta a la vez las tablas de control de varios servos; en el comando se especifican los ID a consultar, y los servos responden en el orden de los ID del paquete. Con SYNC READ, la longitud y la dirección inicial de todos los datos consultados deben ser idénticas (comando disponible solo en algunos servos de bus serie).

Ejemplo 8: consultar para 2 servos (ID1-ID2) la posición, velocidad, carga, voltaje y temperatura actuales (dirección inicial 0x38, 8 palabras de datos en total, byte bajo primero, byte alto después).

Trama de comando: FF FF FE 06 82 38 08 01 02 36

```Plain Text
Cabecera: FF FF
ID: FE
Longitud: 06
Comando: 82
Parámetros:
38 08 (dirección inicial de datos, longitud de datos)
01 02 (ID01, ID02)
Suma de verificación: 36
```

Trama de respuesta:

```Plain Text
Servo ID01: FF FF 01 0A 00 00 08 00 00 00 00 79 1E 55
Servo ID02: FF FF 02 0A 00 FF 07 00 00 00 00 77 23 53
```

La trama de respuesta se puede decodificar según el comando de lectura

## 4.8 Comando de restablecimiento de estado RESET

- Función: restablecer el estado del servo (restablecer las vueltas del servo)

- Longitud: 0x02

- Comando: 0x0A

- Parámetros: ninguno

Ejemplo 9: restablecer el servo, ID 01.

```Plain Text
Trama de comando: FF FF 01 02 0A F2 (enviar en hexadecimal)
Trama de respuesta: FF FF 01 02 00 FC (visualización hexadecimal)
```

## 4.9 Comando de calibración de posición

- Función: recalibrar la posición actual al valor establecido

- Longitud: 0x02 o 0x04

- Comando: 0x0B

- Parámetros: ninguno o valor establecido

Nota: sin parámetros, la posición actual se calibra a la posición media. El comando de calibración solo es compatible con algunos modelos – ver la tabla siguiente.

Ejemplo 10: recalibrar la posición actual a la posición media.

```Plain Text
Trama de comando: FF FF 01 02 0B F1 (enviar en hexadecimal)
Trama de respuesta: FF FF 01 02 00 FC (visualización hexadecimal)
```

Ejemplo 11: recalibrar la posición actual a 1024.

Trama de comando: FF FF 01 04 0B 00 04 EB (enviar en hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 04
Comando: 0B
Valor establecido: 00 04 (1024)
Suma de verificación: EB
```

Trama de respuesta: FF FF 01 02 00 FC (visualización hexadecimal)

```Plain Text
Cabecera: FF FF
ID: 01
Longitud: 02
Estado: 00
Suma de verificación: FC
```

## 4.10 Comando de restauración de parámetros

- Función: restaurar los parámetros del servo excepto el ID

- Longitud: 0x02

- Comando: 0x06

- Parámetros: ninguno

Ejemplo 11: restaurar los parámetros del servo.

```Plain Text
Trama de comando: FF FF 01 02 06 F6 (enviar en hexadecimal)
Trama de respuesta: FF FF 01 02 00 FC (visualización hexadecimal)
```

Nota: desbloquear los parámetros EPROM antes de restaurar los parámetros del servo

## 4.11 Comando de respaldo de parámetros

- Función: respaldo de parámetros (para la restauración)

- Longitud: 0x02

- Comando: 0x09

- Parámetros: ninguno

Ejemplo 12: respaldar los parámetros del servo.

```Plain Text
Trama de comando: FF FF 01 02 09 F3 (enviar en hexadecimal)
Trama de respuesta: FF FF 01 02 00 FC (visualización hexadecimal)
```

Nota: desbloquear los parámetros EPROM antes de respaldar los parámetros del servo

## 4.12 Comando de reinicio

- Función: reiniciar el servo

- Longitud: 0x02

- Comando: 0x08

- Parámetros: ninguno

Ejemplo 13: reiniciar el servo.

```Plain Text
Trama de comando: FF FF 01 02 08 F4 (enviar en hexadecimal)
Trama de respuesta: ninguna (reinicio de unos 800 ms)
```

Nota: desactivar el interruptor de par antes de reiniciar el servo
