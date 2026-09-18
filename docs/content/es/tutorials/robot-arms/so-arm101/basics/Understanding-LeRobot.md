---
title: "Conocer LeRobot y la inteligencia encarnada"
description: "Introducción a la inteligencia encarnada y a LeRobot: qué es, qué robots se pueden desarrollar, el aprendizaje por imitación VLA y la configuración necesaria."
---

# Conocer LeRobot y la inteligencia encarnada

## ¿Qué es la inteligencia encarnada?

Inteligencia con cuerpo. Conecta la IA a diversos entes de hardware, por ejemplo:

Perros robot cuadrúpedos, robots humanoides bípedos, robots con ruedas y patas, drones, vehículos autónomos

## ¿Qué es LeRobot?

LeRobot es el `marco de software de robots de inteligencia encarnada` de código abierto de HuggingFace

Dirección de Github: https://github.com/huggingface/lerobot

Implementación de bajo umbral: **recopilación de datos, entrenamiento de algoritmos y despliegue de inferencia** de aprendizaje por refuerzo y **aprendizaje por imitación (VLA)**, de los cuales el más importante es el **aprendizaje por imitación (VLA)**

- ¿Qué robots se pueden desarrollar con LeRobot?

Desde el brazo robótico SO-ARM 101 de nivel de miles de yuanes, el carrito LeKiwi, hasta el brazo robótico piper de Songling, el brazo robótico StarAI de Huaxinjing, la mano diestra Hope-JR de decenas de miles de yuanes, hasta el robot humanoide Unitree G1 de cientos de miles de yuanes. LeRobot se ha convertido en el estándar de la industria de la inteligencia encarnada para la recopilación de datos y el entrenamiento de algoritmos.

También puedes adaptar tu propio robot al marco de LeRobot.

- Conjuntos de datos y modelos de LeRobot

LeRobot define su propio formato de conjunto de datos de aprendizaje por imitación; puedes ver, usar, descargar y entrenar todos los conjuntos de datos y modelos públicos de HuggingFace, y también puedes subir tus propios conjuntos de datos a HuggingFace

## ¿Qué es el brazo robótico SO-ARM 101?

Este tutorial toma como ejemplo el brazo robótico SO-ARM 101, que utiliza piezas estructurales impresas en 3D y servomotores Feetech, con un costo muy bajo.

Este es un cuerpo de inteligencia encarnada que incluso un estudiante pobre puede pagar, y también es uno de los cuerpos recomendados oficialmente por LeRobot.

El brazo robótico incluye dos brazos: el brazo líder (Leader) y el brazo seguidor (Follower). Cada brazo contiene 6 grados de libertad (5 grados de libertad de articulación + 1 grado de libertad de pinza).

## ¿Qué configuración de computadora necesito?

Una computadora portátil Windows común puede completar todas las operaciones previas al entrenamiento

Una computadora Mac común puede completar todas las operaciones

Una computadora Ubuntu con tarjeta gráfica NVIDIA puede completar todas las operaciones

En este tutorial, se utiliza la [plataforma de GPU en la nube](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) para entrenar modelos, por lo que no se necesita una configuración muy alta en tu propia computadora

## ¿Qué es el **aprendizaje por imitación y VLA**?

El humano arrastra el robot para enseñar y recopilar el conjunto de datos, formando así un conjunto de datos. Luego se usa este conjunto de datos para entrenar el algoritmo de aprendizaje por imitación y, finalmente, se despliega en el robot, haciendo que el robot imite de forma autónoma las acciones humanas y generalice al entorno real. Sin teleoperación ni control remoto.

Por ejemplo, en el video anterior, el humano arrastra el brazo robótico SO-ARM para agarrar cangrejos de río, mojarlos en la salsa y echarlos a la olla con aceite, logrando finalmente que el brazo robótico complete esta acción de forma autónoma. Incluso si aparece un nuevo cangrejo de río, puede reaccionar y completar la acción en cualquier momento.

El aprendizaje por imitación también tiene un nombre de vanguardia y de moda: VLA (modelo grande de visión-lenguaje-acción). Este es también el campo de investigación de la inteligencia encarnada que ahora se desarrolla más rápido, con la inversión más candente, la competencia más intensa entre China y Estados Unidos, el ecosistema de código abierto más próspero, una gran atención mediática y en el que innumerables estudiantes de máster y doctorado compiten por entrar.

El algoritmo principal al que LeRobot está adaptado es el aprendizaje por imitación. Por ejemplo, ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS, etc.

El aprendizaje por imitación en el tutorial es solo VLA.

<RelatedProducts slugs="so-arm101" />
