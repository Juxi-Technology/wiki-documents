---
title: Servos de bus Feetech (SCS0009 / STS3215)
category: accessory
description: "Servos de bus serie Feetech de Juxi Technology — protocolo SCS, versiones con encoder magnético/potenciómetro, análisis de tablas de memoria, depuración FD"
keywords: [feetech, servo, scs, sts, bus serie]
---

# Servos de bus Feetech (SCS0009 / STS3215)

> **[Comprar en la tienda](https://www.juxitech.com/es/products/feetech-scs0009-serial-bus-servo)**

## Descripción general

Los servos de bus serie Feetech son el núcleo de accionamiento de brazos robóticos como el SO-ARM101. Compatibles con el **protocolo SCS**, conectan varios servos en un solo bus. Dos versiones (encoder magnético STS / potenciómetro SCSCL) con depuración por host FD en Windows.

**Características clave**:

- Comunicación por bus serie, múltiples servos en un bus
- Versiones encoder magnético (STS) / potenciómetro (SCSCL)
- Retorno en tiempo real de posición/velocidad/par
- Documentación completa de tablas de memoria
- Doble comunicación: TTL (rápida) / RS485 (antirruido)
- Hasta 254 servos por bus (ID 0-253, difusión ID 254)
- 1M baudios por defecto, 8 bits de datos, 1 bit de parada
- Protecciones sobrecalentamiento/sobretensión/sobrecorriente/sobrecarga
- Depuración con host FD (Windows)

## Especificaciones

| Categoría | Especificación |
|------|------|
| Protocolo | Bus serie SCS |
| Versiones | STS3215 (encoder magnético) / SCS0009 (potenciómetro) |
| Depuración | Host FD (Windows) |
| Velocidad | 1.000.000 (por defecto del host) |

## Inicio rápido

```bash
# 上位机调试(Windows):下载 feetechrc.com/software.html
# 选择端口,波特率 1000000,点击搜索
```
## Tutoriales

- [Tutorial de depuración Feetech STS3215 y SCS0009](/es/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [Protocolo de comunicación SCS](/es/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [Tabla de memoria del servo STS con encoder magnético](/es/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [Tabla de memoria del servo SCSCL con potenciómetro](/es/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
