---
title: Información del producto
---

# Información del producto

> **[Comprar en la tienda](https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Descripción general del producto

LeKiwi se desarrolla bajo el liderazgo de SIGRobotics-UIUC (el grupo de interés en robótica de la Universidad de Illinois en Urbana-Champaign). Proporciona una plataforma robótica de código abierto, de bajo coste y altamente flexible, que impulsa la difusión de la tecnología robótica en la educación, la investigación y la automatización industrial. Su diseño de hardware (archivos de impresión 3D), su pila de software (compatible con el framework LeRobot) y sus tutoriales son de código abierto, y admite extensiones definidas por el usuario.

LeKiwi consta de una plataforma móvil y un brazo líder-seguidor. El brazo líder-seguidor utiliza piezas impresas en 3D como estructura y 6 servos Feetech de 12 V como articulaciones de accionamiento. El brazo líder se apoya en una plataforma fija, utiliza una placa controladora de servos y se conecta a un ordenador mediante USB-C. El brazo seguidor está montado en la plataforma móvil, que es impulsada por 3 servos Feetech de 12 V; utiliza una placa controladora de servos y se controla a través de USB-C conectado a una Raspberry Pi.

LeKiwi integra profundamente LeRobot (el framework de código abierto de Hugging Face para el aprendizaje automático en robótica) y admite aprendizaje por imitación, recopilación de datos y entrenamiento de políticas. Está implementado sobre PyTorch e incluye modelos preentrenados, conjuntos de datos y un entorno de simulación, y es compatible con conocidos conjuntos de datos de código abierto como Stanford ALOHA. Utiliza el framework DORA (un motor de flujo de datos distribuido) para lograr una comunicación de baja latencia entre hardware y algoritmo (el rendimiento en Python es 17 veces más rápido que ROS2) y admite la recarga en caliente, de modo que el código se puede ajustar en tiempo real sin reiniciar.

LeKiwi es muy adecuado para la educación y la investigación de nivel inicial: docencia introductoria de robótica, con tutoriales de extremo a extremo que abarcan desde el montaje y la programación hasta el despliegue de políticas de IA; validación de investigación: admite investigación en aprendizaje por imitación (por ejemplo, entrenar un robot a partir de vídeos de operación humana grabados con VR), con el caso del robot polinizador Ready2, que aprende tareas como doblar ropa e insertar llaves tras tan solo 2 horas de entrenamiento con 50 vídeos de 15 segundos; prototipado industrial: validación de bajo coste de soluciones de automatización (como manipulación de materiales y montaje de precisión).
