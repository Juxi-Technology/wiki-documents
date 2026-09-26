---
title: Preguntas frecuentes (FAQ)
sidebar_label: Preguntas frecuentes
slug: /support/faq
description: >-
  Preguntas frecuentes sobre el kit de desarrollo NVIDIA Jetson Orin Nano Super
  (8GB) — almacenamiento, configuración inicial, firmware, modos de
  alimentación, cargas de trabajo de IA y soporte.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Preguntas frecuentes (FAQ)

## Antes de empezar

**¿Qué incluye la caja?**
El kit de desarrollo Jetson Orin Nano, una fuente de alimentación de 19 V y una
tarjeta de inicio rápido y soporte. **La caja de NVIDIA no incluye
almacenamiento**: usted aporta la tarjeta microSD o el SSD NVMe, la unidad USB
para el instalador, y el monitor y el teclado — aunque el paquete de la tienda
de Juxi para este kit añade una tarjeta microSD de 64 GB (según la ficha de la
tienda). Consulte [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start).

**¿Tengo que comprar almacenamiento?**
Sí — a menos que haya comprado el paquete de la tienda de Juxi, que ya incluye
una tarjeta microSD de 64 GB; cubre el requisito de almacenamiento de destino,
así que compre un SSD NVMe solo si quiere más capacidad. (La tarjeta incluida
se entrega en blanco, sin imagen preinstalada — usted instala el sistema en
ella con la Jetson ISO.) NVIDIA afirma:
«El kit de desarrollo Jetson Orin Nano no incluye almacenamiento extraíble en
la caja, así que elija una tarjeta microSD o un SSD NVMe antes de comenzar la
configuración.» Compre una tarjeta microSD de 64GB UHS-1 o superior (la
recomendación de NVIDIA) si recibió la caja básica de NVIDIA, o un SSD NVMe
PCIe para una de las ranuras M.2 Key-M de la placa portadora. El kit no tiene
eMMC: su tarjeta o SSD se convierte en el almacenamiento principal del sistema.
Consulte [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start) e
[Interfaces y disposición del hardware](/es/tutorials/jetson-orin-nano/interfaces).

**¿Aún puedo flashear una imagen de tarjeta SD, como en versiones anteriores de JetPack?**
No. A partir de JetPack 7.2, las imágenes de tarjeta SD ya no son compatibles.
La instrucción de NVIDIA: «No flashee la Jetson ISO a una tarjeta microSD —
escríbala en una unidad flash USB y úsela para instalar Jetson Linux en su
tarjeta microSD o SSD NVMe.» La tarjeta microSD sigue siendo un destino de
instalación válido; simplemente ya no es el medio en el que se escribe la
imagen. La unidad USB con la ISO es un instalador, no un USB en vivo — no
puede ejecutar un escritorio, solo instala el sistema. Consulte
[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates) y
[Migración de JetPack 6.x a JetPack 7.2.1](/es/tutorials/jetson-orin-nano/jetpack-6-to-7).

**¿Qué necesito exactamente antes de empezar?**
Necesita:

- El kit y su fuente de alimentación de 19 V incluida.
- Un portátil o PC (Windows, Mac o Linux) con al menos 25GB de espacio libre.
- Una unidad flash USB de 16GB o más para contener la imagen del instalador.
- Almacenamiento de destino: una tarjeta microSD (se recomienda 64GB UHS-1 o
  más) y/o un SSD NVMe — el paquete de la tienda de Juxi ya incluye la tarjeta
  microSD de 64 GB.
- Un monitor DisplayPort y un teclado y un ratón USB, o un cable serie USB a
  TTL para una configuración headless.

La guía de NVIDIA usa Balena Etcher para escribir la ISO en la unidad USB —
copiar el archivo a la unidad no basta. Paso a paso:
[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start).

**¿Necesito un PC con Ubuntu?**
No, no para la ruta recomendada. La instalación con la Jetson ISO se ejecuta en
el propio kit; su PC solo escribe la ISO en una unidad flash USB, y Windows,
Mac y Linux sirven para eso. Solo se necesita un PC host Ubuntu x86_64 para los
métodos alternativos — SDK Manager o el script de flasheo —, por ejemplo cuando
quiere volver a flashear un kit con la configuración Super. Nota: la página de
SDK Manager documenta hosts Ubuntu 20.04 / 22.04 x86_64, mientras que el
personal de NVIDIA también informa de flasheos correctos desde Windows.
Consulte [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).

**¿Dónde está la ranura microSD?**
Está en la parte inferior del módulo Jetson Orin Nano, no en el borde de la
placa portadora. Inserte la tarjeta antes de arrancar el instalador ISO; el
instalador solo ofrece almacenamiento que ya esté instalado. Para cambiar la
tarjeta más adelante: apague, inserte la nueva tarjeta y vuelva a ejecutar el
instalador ISO de JetPack 7.2.1 con ella insertada — JetPack 7.2 y posteriores
no tienen imagen de tarjeta que escribir. Consulte
[Interfaces y disposición del hardware](/es/tutorials/jetson-orin-nano/interfaces) e
[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start).

## Configuración

**Mi kit es nuevo — ¿por qué la guía dice que actualice primero el firmware?**
Las instalaciones de JetPack 7.2 y posteriores requieren firmware UEFI/QSPI de
la generación de JetPack 6.x en el kit — versión 36.x o más reciente. Los kits
que se enviaron con firmware de fábrica más antiguo deben completar la «ruta de
actualización de JetPack 6.x» de NVIDIA antes de que la ISO de JetPack 7.2.1
pueda arrancar. Para comprobar la versión: encienda con un monitor conectado y
pulse Esc repetidamente en la pantalla de arranque; el menú UEFI muestra la
versión de firmware cerca de la parte superior. Si muestra 36.x o más reciente,
continúe; si es anterior a 36.0, haga primero la ruta de actualización. Consulte
[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start),
[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates) y el
[Glosario](/es/tutorials/jetson-orin-nano/glossary) para términos como QSPI y
actualización de cápsula.

**¿Cuánto tarda la configuración?**
NVIDIA no publica un tiempo total de configuración. Las instrucciones oficiales
dicen que puede ver texto blanco desplazándose por la pantalla durante varios
minutos, y que debe esperar a que el instalador termine y reinicie cuando se le
indique. Los informes de usuarios van de unos 15 minutos a unas dos horas para
una instalación en tarjeta microSD (informes de usuarios, sin confirmar), y el
primer arranque añade después las pantallas de configuración de Ubuntu
(idioma, red, nombre de usuario). Consulte
[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start).

**¿Y si el instalador omite las pantallas de usuario y contraseña?**
Esto coincide con un informe conocido: el aviso de la cápsula QSPI caducó. El
instalador le pide confirmar una actualización de firmware (QSPI) y espera solo
30 segundos — si se pierde el aviso, los pasos posteriores pueden fallar, y las
pantallas de idioma, red y nombre de usuario pueden no aparecer nunca; el
siguiente arranque puede entonces detenerse en una pantalla negra con un
cursor. La solución de la guía oficial: reinicie la instalación y pulse Y
cuando aparezca el aviso de la cápsula. Algunos usuarios también limpiaron
particiones sobrantes antes de reintentar, o instalaron con SDK Manager en su
lugar (informes de usuarios; el personal de NVIDIA reconoció el hilo). Consulte
[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

> **Importante** Cuando el instalador muestra el aviso de actualización de la
> cápsula QSPI, pulse **Y** en un plazo de 30 segundos. NVIDIA lo llama
> «el paso que más se omite».

**¿Cómo obtengo una consola serie?**
Conecte un cable serie USB a TTL a la cabecera de botones (Button Header): el
pin 3 (RXD) se conecta al cable TX del adaptador, el pin 4 (TXD) al cable RX
del adaptador, y el pin 7 (GND) al cable de tierra del adaptador. Después abra
una consola serie en su PC, encienda y pulse Esc durante la pantalla de
prearranque para entrar en UEFI / Boot Manager — puede completar toda la
instalación ISO de esta forma. Una laguna honesta: las páginas de NVIDIA dicen
«abra una consola serie en su PC», pero no indican ninguna velocidad en
baudios ni programa de terminal. Cuando el kit se conecta a un PC por USB-C en
modo dispositivo, también presenta un «USB Serial device for serial terminal
access». Consulte
[Interfaces y disposición del hardware](/es/tutorials/jetson-orin-nano/interfaces) y
[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

## Alimentación y rendimiento

**¿Por qué no hay opción de 25W / MAXN SUPER?**
Su kit se flasheó con la configuración de arranque no Super, así que solo
aparecen los modos de 7W y 15W. Fue el problema documentado 6279443 de la ISO
de JetPack 7.2: las instalaciones por ISO conservaban el perfil previo a la
actualización en lugar de cambiar a «Super». JetPack 7.2.1 lo corrige para las
instalaciones nuevas — la ISO «ahora flashea el Jetson Orin Nano Developer Kit
con la configuración de flasheo de modo Super de forma predeterminada»; NVIDIA
no dice si una reinstalación de 7.2.1 convierte un kit con ISO 7.2.0. Compruebe
`/etc/nv_boot_control.conf`: una configuración Super muestra un sufijo
`-super`. Para corregir una instalación 7.2 existente, reflashee con la
configuración Super desde un host Ubuntu (SDK Manager o el script de flasheo);
el menú Power Mode ofrece entonces 15W, 25W (predeterminado) y MAXN SUPER.
Consulte [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system),
[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting) y
[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).

> **Nota de Juxi:** Existe una solución comunitaria en el propio equipo (editar
> `/etc/nv_boot_control.conf`, reconfigurar el gestor de arranque, eliminar
> `/etc/nvpmodel.conf`, reiniciar). Varios usuarios informan de éxito, pero
> NVIDIA no la ha respaldado y un usuario informó de un bucle de arranque.

## Cargas de trabajo de IA

**¿Qué tamaño de modelo puede ejecutar 8 GB?**
Los 8GB de LPDDR5 son memoria unificada, compartida por la CPU, la GPU y el
sistema operativo — unos 7.6GB son utilizables tras las reservas del firmware y
el kernel. La guía publicada por NVIDIA: con cuantización de 4 bits y runtimes
eficientes en memoria, caben LLM de hasta unos 10B de parámetros y VLM de
hasta unos 4B de parámetros. Los benchmarks oficiales de TensorRT Edge-LLM para
Orin Nano 8GB cubren modelos de hasta 2B, y esa es la mayor clase de modelo que
NVIDIA mide en este kit. Un modelo puede fallar al cargar aunque el archivo
parezca caber, porque la caché KV también necesita memoria; GGUF de 7.4GB y
16GB han fallado al cargar en un kit de 8GB (informes de usuarios). Consulte
[Inferencia LLM local en 8 GB](/es/tutorials/jetson-orin-nano/local-llm) y
[Eficiencia de memoria](/es/tutorials/jetson-orin-nano/memory-efficiency).

## Soporte y servicio

**¿Cuál es la vía de soporte?**
Empiece por la [página oficial de solución de problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)
de NVIDIA, que cubre los cinco problemas de configuración comunes: la ISO no
arranca, no hay salida de pantalla, el instalador no muestra el almacenamiento
de destino, se necesita una actualización de firmware y un error de permisos de
Docker. Para preguntas sobre la plataforma, use los foros de desarrolladores de
NVIDIA Jetson, listados en la página oficial [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html);
busque antes de publicar e incluya la salida de
`cat /etc/nv_tegra_release`. Contactos de Juxi Technology:

- Soporte técnico: **support@juxitech.com**
- Pedidos, garantía y RMA: **support@juxitech.com** (incluya el número de pedido)
- Ventas y presupuestos: **sales@juxitech.com**
- Preguntas sobre productos (selección, compatibilidad): **pe@juxitech.com**

Descargas y enlaces de referencia oficiales: [Descargas](/es/tutorials/jetson-orin-nano/downloads).

> **Nota de Juxi:** Algunas respuestas del foro etiquetadas como personal de
> NVIDIA son respuestas de IA generadas automáticamente (comienzan con
> «This is an automated AI response»). Trátelas como no autoritativas y dé
> prioridad a la documentación oficial.

## Fuentes

- Guía del usuario del Jetson Orin Nano Developer Kit — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (consultado el 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- Notas de la versión de Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (consultado el 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (consultado el 2026-09-26)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (consultado el 2026-09-26)
- Foros de desarrolladores de NVIDIA — [hilo sobre el cuelgue de arranque / configuración de usuario omitida](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [hilo sobre 25W / MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (consultado el 2026-09-26)
- [Juxi Technology store listing — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (consultado el 2026-09-26)

*Estado: borrador, pendiente de revisión por cheny.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
