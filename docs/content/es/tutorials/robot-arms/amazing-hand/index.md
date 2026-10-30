---

title: "Tutorial de uso de la mano diestra AmazingHand"

description: "Tutorial completo de la mano diestra open source AmazingHand: información del producto, kit de cámara, reconocimiento de gestos en la web, seguimiento de gestos con MuJoCo, control de interfaz, Arduino Nano y depuración TTL y PWM."

---



# Tutorial de uso de la mano diestra AmazingHand



AmazingHand es un proyecto open source de mano humanoide con un coste inferior a 250 dólares, dirigido a aficionados a la robótica, investigadores y desarrolladores.



## Introducción al proyecto



- **Diseño mecánico**: 8 grados de libertad, 4 dedos, 2 articulaciones por dedo con movimiento conjunto; los dedos se accionan mediante mecanismos paralelos, sin cables externos, con todos los actuadores integrados en la mano; piezas de impresión 3D, con un peso de unos 400 g y un coste inferior a 200 euros.

- **Esquema de control**: control por bus serie en Python (compatible con hardware como Waveshare); doble opción Arduino + Feetech TTL Linker; se ofrecen ejemplos de código en Python y Arduino; admite realimentación como activación/desactivación del par del servo, sensor de posición y monitorización de temperatura.

- **Recursos completos**: lista de materiales (BOM) completa, archivos CAD y documentación en línea de Onshape, tutorial de montaje y scripts de calibración, ejemplos de demostración básicos y avanzados, con soporte de cinemática inversa/directa.

- **Aspectos destacados del proyecto**: compatible con muñecas de robots como Reachy2; diseño abierto e impulsado por la comunidad; la planificación futura incluye sensor táctil, articulaciones elásticas, longitudes de dedo variables y una solución de 5 dedos.



## Índice de tutoriales



| Contenido | Descripción |
|---|---|
| [Información del producto](./product-info.md) | Parámetros del producto, BOM, estructura y descargas de material |
| [Instalación del kit de cámara ambiental](./Camera-Kit-Installation.md) | Pasos de montaje del soporte del kit de cámara |
| [Web: reconocimiento de gestos](./AmazingHand-Web-Control.md) | Control web en línea y despliegue local |
| [Seguimiento de gestos (simulación MuJoCo)](./gesture-tracking/02-Windows.md) | Despliegue y ejecución en un clic en Windows / Linux / Mac |
| [Tutorial de control de interfaz](./AmazingHand-Interface-Control.md) | Control por GUI de Python / línea de comandos, calibración de mano izquierda y derecha y protocolo |
| [Tutorial de uso de Arduino Nano](./Arduino-Nano-Tutorial.md) | Cableado de la placa Nano, instalación de bibliotecas y programa de demostración |
| [Depuración y montaje de servos serie TTL](./AmazingHand-TTL-Debugging.md) | Montaje y depuración de servomotores serie TTL |
| [Depuración de servos PWM](./pwm-debugging/01-GUI-Visual-Control.md) | GUI visual, seguimiento de gestos y manual de uso |



## Descarga de recursos



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — despliegue en un clic del seguimiento de gestos (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — herramienta de calibración de servos Feetech SCS0009

- [Repositorio oficial de AmazingHand](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — Paquete de entrega PWM（GUI / seguimiento de gestos / firmware / documentación）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Paquete de despliegue local
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Herramienta de depuración de servos


### Todas las páginas

- [Material de producto de la mano diestra AmazingHand](./product-info.md)
- [Instalación del kit de cámara ambiental](./Camera-Kit-Installation.md)
- [Control web de AmazingHand](./AmazingHand-Web-Control.md)
- [Despliegue y ejecución en Windows en un clic](./gesture-tracking/02-Windows.md)
- [Despliegue y ejecución en Linux (Ubuntu) en un clic](./gesture-tracking/01-Ubuntu.md)
- [Despliegue y ejecución en Mac en un clic](./gesture-tracking/03-macOS.md)
- [Tutorial de ejecución del ejemplo oficial de la mano robótica](./AmazingHand-Official-Example.md)
- [Tutorial de control de interfaz](./AmazingHand-Interface-Control.md)
- [Tutorial de uso de Arduino Nano](./Arduino-Nano-Tutorial.md)
- [Tutorial de depuración de la mano hábil (servo TTL)](./AmazingHand-TTL-Debugging.md)
- [01-Control visual por GUI](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial de seguimiento de gestos](./pwm-debugging/02-Gesture-Tracking.md)
- [03-Versión con servos PWM - Manual de uso](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versión con servos de puerto serie - Instrucciones de uso](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Tutorial completo](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

