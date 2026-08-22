---
title: Placa driver de servo de bus JUXI
description: "Placa driver de servo de bus JUXI – controla hasta 253 servos en un bus, voltaje amplio de 7 a 12,6 V, Type-C plug-and-play, diseñada para LeRobot SO-ARM"
keywords: [driver de servo, servo de bus, LeRobot, SO-ARM]
---

# Placa driver de servo de bus JUXI

> **[Comprar en la tienda](https://www.juxitech.com/es/products/bus-servo-driver-board)**

## Descripción del producto

**Características principales**:

- Controla hasta **253** servos de bus serie en un solo bus
- Entrada de voltaje amplio de **7 a 12,6 V**, alimentación integrada (conector DC 5521)
- Retroalimentación en tiempo real: posición, velocidad, par, modo de operación
- **Type-C plug-and-play**, compatible con Raspberry Pi/Jetson/RDK/PC
- Orificios de montaje precisos, instalación directa en SO-ARM100/101 en 2 minutos
- Circuito de protección TVS (protección contra sobrevoltaje y sobrecorriente)

## Especificaciones del producto

| Categoría | Especificación |
|------|------|
| Voltaje de entrada | DC 7 V – 12,6 V |
| Interfaces | USB Type-C / UART |
| Soporte de servos | hasta 253 servos de bus serie |
| Retroalimentación de datos | Posición, velocidad, par, modo de operación |
| Tamaño de la placa | 42,00 × 33,00 mm |
| Distancia de orificios | 37,00 × 28,00 mm (coincide con SO-ARM) |
| Servos compatibles | la mayoría de los servos de bus serie del mercado |
| Hosts compatibles | Raspberry Pi, NVIDIA Jetson (Nano/Orin/Xavier), RDK, PC (Win/macOS/Linux), Orange Pi |

## Inicio rápido

```bash
# Ejemplo de arranque SO-ARM101
python3 examples/arm_boot.py --port /dev/ttyACM0
```

## Tutoriales relacionados

- [Kit de desarrollo SO-ARM101](/es/products/so-arm101)
- [Servo de bus Feetech (SCS0009 / STS3215)](/es/products/feetech-servo)

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
