---
title: "Paso 2: Ver el puerto del dispositivo serie (macOS)"
description: "Lista los puertos serie del brazo en macOS, otorga permisos de lectura y escritura y entiende por qué se muestran dos puertos para un mismo dispositivo."
---

# Paso 2: Ver el puerto del dispositivo serie (macOS)

## Ver los puertos

```Shell
ls /dev/tty.*
```

El resultado es similar a la imagen siguiente; puedes usar cualquiera de los dos puertos

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## Otorgar permisos al puerto

Permitir que todos los usuarios tengan permiso de lectura y escritura en estos dispositivos de puerto serie

```Shell
chmod 666 /dev/tty.*
```

## Registrar mis puertos

Brazo seguidor:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Brazo líder:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## ¿Por qué hay dos puertos en Mac?

La placa de control de servomotores que usamos es **reconocida simultáneamente como dos tipos diferentes de controlador de puerto serie** en el sistema Mac, por lo que se muestran dos puertos:

- Uno es el controlador de puerto serie genérico predeterminado del sistema (`/dev/tty.usbmodemxxxx`)

- El otro es el controlador de puerto serie dedicado proporcionado por el fabricante del chip (por ejemplo, aquí "wch" corresponde al chip CH340/CH341 de Nanjing Qinheng) (`/dev/tty.wchusbserialxxxx`)

Esto es un fenómeno normal; **los dos puertos en realidad corresponden al mismo dispositivo de hardware**, y puedes elegir cualquiera de ellos para conectarte y comunicarte (por ejemplo, basta con seleccionar uno de los puertos en el software que controla el brazo robótico).

Si más adelante se produce un error al operar con un puerto, puedes probar a cambiar al otro puerto.

<RelatedProducts slugs="so-arm101" />
