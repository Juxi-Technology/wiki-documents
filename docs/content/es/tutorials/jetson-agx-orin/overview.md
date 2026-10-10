---
title: Descripción general del producto — Kit de desarrollo Jetson AGX Orin
sidebar_label: Descripción general del producto
slug: /product/overview
description: >-
  Qué es el kit de desarrollo NVIDIA Jetson AGX Orin (64GB), para qué se
  utiliza y qué lugar ocupa en la gama Jetson Orin.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# Descripción general del producto

![Jetson AGX Orin Developer Kit](/images/jetson-agx-orin/jaodk_1024px.png)

El kit de desarrollo NVIDIA® Jetson AGX Orin™ es el kit de desarrollo insignia
de la familia Jetson Orin: un ordenador de IA compacto para desarrollar y
prototipar aplicaciones de robótica, visión por computador e IA generativa en
el borde. Esta guía abarca el kit de desarrollo de **64GB**.

## Datos clave (verificados con la documentación de NVIDIA)

- El kit de desarrollo comparte **una misma arquitectura SoC con todos los
  módulos Jetson Orin**, por lo que puede **emular el rendimiento y la potencia**
  de los módulos AGX Orin, Orin NX u Orin Nano mediante un nuevo flasheo. De
  fábrica viene configurado para la **serie Jetson AGX Orin**. *(Developer Kit
  User Guide)*
- NVIDIA cifra el rendimiento de IA de la familia de módulos AGX Orin en
  **hasta 275 TOPS**, con una potencia configurable entre **15W y 60W**.
  *(página de producto de NVIDIA)*
- La GPU del módulo de 64GB es una **GPU de arquitectura NVIDIA Ampere de 2048
  núcleos con 64 Tensor Cores**. *(página de producto de NVIDIA, tabla
  comparativa)*
- La placa portadora de referencia incluida expone interfaces estándar —
  DisplayPort, Ethernet 10GBASE-T, USB 3.2, M.2 (NVMe y Wi-Fi), conector de 40
  pines, PCIe, conector de cámara y más. Consulte **[Interfaces y disposición del hardware](/es/tutorials/jetson-agx-orin/interfaces)**.

## Para qué sirve el kit de desarrollo

- **Desarrollo y prototipado** — el kit es la plataforma de referencia para las
  aplicaciones que acabarán ejecutándose en módulos Jetson Orin en producción.
- **Exploración de rendimiento y potencia** — como emula los demás módulos
  Orin, un solo kit le permite probar cargas de trabajo en toda la gama de
  módulos antes de decidirse por un componente de producción.
- **Cargas de trabajo de IA perimetral** — visión por computador, robótica e IA
  generativa local (consulte nuestra sección de tutoriales a medida que crezca).

> **Nota de Juxi:** Los productos de producción se construyen sobre *módulos*
> Jetson Orin (versiones de 64GB / 32GB / Industrial) montados en su propia
> placa portadora o en la de un socio. El kit de desarrollo es el vehículo de
> desarrollo, no el componente de producción.

## Contenido de la caja

Módulo Jetson AGX Orin y placa portadora de referencia, módulo Wi-Fi, fuente de
alimentación USB Type-C y un cable USB Type-C a USB Type-A. Para saber qué debe
proporcionar usted mismo, consulte **[Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start)**.

## Próximos pasos

- **[Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start)** — de la caja a un sistema JetPack 7.2.1 funcional
- **[Interfaces y disposición del hardware](/es/tutorials/jetson-agx-orin/interfaces)** — todos los puertos y conectores
- **[Descargas](/es/tutorials/jetson-agx-orin/downloads)** — imágenes oficiales, herramientas y enlaces de documentación *(página en preparación)*

## Fuentes

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (consultado el 2026-09-23)
- [Página de producto NVIDIA Jetson Orin](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (consultado el 2026-09-23)

*Estado: revisado el 2026-10-11. Se añadirá una tabla
completa de especificaciones del módulo a partir de la hoja de datos oficial de
NVIDIA; hasta entonces, tome la página de producto de NVIDIA como la fuente
autorizada de las especificaciones.*

**Créditos de la imagen:** Imagen del producto procedente de la *Jetson AGX
Orin Developer Kit User Guide* oficial de NVIDIA (descargada el 2026-09-23),
© NVIDIA Corporation.

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
