---
title: "07 · Preguntas frecuentes y precauciones"
description: "P1: ¿Puede conmutar la imagen del monitor?"
---

# 07 · Preguntas frecuentes y precauciones

> [← Volver a la descripción general](/es/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Producto aplicable: JUXI Technology KVM&HUB&TTL
> Las preguntas específicas de cada módulo están en su página correspondiente (Bluetooth → 03; serie TTL → 04).

## Preguntas frecuentes

**P1: ¿Puede conmutar la imagen del monitor?**
No. Este producto conmuta teclado/ratón y dispositivos USB. Cada ordenador usa su propio monitor; para un equipo sin monitor utilice la solución con tarjeta capturadora (ver [06](/es/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**P2: ¿Hay que instalar controladores?**
No — funciona sin controladores (Windows / macOS / Linux / sistemas operativos nacionales chinos).

**P3: ¿Puedo conectar un disco duro portátil?**
Este producto es USB 2.0; para almacenamiento rápido y tarjetas capturadoras, conecte directamente al ordenador. Memorias USB, teclado/ratón, impresoras y dongles no tienen problema.

**P4: El móvil no conecta por Bluetooth / aparece solicitud de PIN?**
No use el «emparejamiento» Bluetooth del sistema; instale la app **BleUart** y conecte desde dentro de la app (ver [03](/es/tutorials/accessories/kvm-switch/03-Bluetooth)).

**P5: ¿Pueden conectarse a la vez un móvil y un ordenador por Bluetooth?**
No — solo se admite un dispositivo anfitrión a la vez. El **puerto serie** (USB) del PC no se ve afectado y puede usarse simultáneamente.

**P6: ¿Los dispositivos USB se desconectan un momento al cambiar?**
Es normal: los dispositivos «se mueven» entre los ordenadores con el cambio y el otro ordenador los vuelve a detectar (algunos tardan unos segundos).

**P7: ¿Puede usarse solo como HUB?**
Sí — con un solo ordenador conectado es un HUB USB de 3 puertos (ver [02](/es/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**P8: ¿Admite ratones gaming?**
Teclado/ratón funcionan sobre USB 2.0 HID estándar — imperceptible en ofimática y depuración; use con precaución periféricos gaming de alta frecuencia de sondeo.

## Precauciones

- El nivel del puerto TTL es **3,3 V** — no inyecte niveles de señal de 5 V; `3V3/5V` son pines de **salida** — nunca inyecte alimentación por ellos;
- El ancho de banda de USB 2.0 es limitado; elija los dispositivos según las recomendaciones de [02](/es/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three);
- No desmonte ni vuelva a soldar el dispositivo; es sensible a la electricidad estática — descárguese antes de tocarlo;
- Las funciones e interfaces del producto están sujetas a la unidad física; si este tutorial se actualiza, prevalece la versión más reciente.

## Historial de versiones

| Versión | Fecha | Descripción |
|---|---|---|
| v1.0 | 2026-10-14 | Versión inicial, dividida por módulos funcionales (cambio/HUB/Bluetooth/TTL/10 pines/tarjeta capturadora/FAQ) |

<RelatedProducts slugs="kvm-switch" />
