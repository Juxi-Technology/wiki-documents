---
title: "Modificar la palabra de activación y las palabras de comando"
description: "Modifica la palabra de activación y las palabras de comando del módulo de voz IA: precauciones, conexión del dispositivo y pasos de edición."
---

# Modificar la palabra de activación y las palabras de comando

## 1. Precauciones

Modifique la palabra de activación en un entorno silencioso; un entorno ruidoso afectará la precisión de reconocimiento del módulo de interacción por voz.

Al pronunciar una entrada, la voz debe ser fuerte y clara y la velocidad del habla no debe ser demasiado rápida; se recomienda mantenerse a menos de 5 metros del módulo.

## 2. Conexión del dispositivo

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit/1.png)

## 3. Modificar la palabra de activación

Diga “你好，小犀” al módulo de interacción por voz para activarlo; cuando el módulo responda “我在”, indica que se encuentra en estado reconocible.  A continuación, diga la entrada “学习唤醒词” al módulo de interacción por voz; cuando el módulo de interacción por voz responda “说出唤醒词”, habrá entrado en el estado de la función de aprendizaje de la palabra de activación.  Después, diga al módulo de interacción por voz la palabra de activación que desea configurar; la palabra de activación debe ser lo más breve posible; aquí tomamos como ejemplo configurar “你好，小犀”.  Cuando el módulo de interacción por voz la reconozca correctamente, reproducirá “学习成功”, lo que indica que la palabra de activación se modificó correctamente. En ese momento podemos usar la entrada “你好小犀” para activar el módulo.

Nota: la palabra de activación “你好，小犀” del firmware de fábrica es la palabra de activación básica y no se puede modificar ni eliminar por voz. Solo puede existir una palabra de activación modificada por voz a la vez, y coexiste con la palabra de activación básica.

## 4. Modificar las palabras de comando

El firmware de fábrica del módulo de interacción por voz incluye 8 palabras de comando que se pueden modificar por voz, como se muestra a continuación:

A continuación se muestra un ejemplo de uso:

Diga "你好，小犀" al módulo de interacción por voz para activarlo; cuando el módulo responda “我在”, indica que se encuentra en estado reconocible.  A continuación, diga la entrada “学习停车指令” al módulo de interacción por voz; cuando el módulo de interacción por voz responda “请说指令”, habrá entrado en el estado de la función de aprendizaje de palabras de comando.  Después, diga al módulo de interacción por voz la palabra de comando que desea configurar; la palabra de comando debe ser lo más breve posible; aquí tomamos como ejemplo configurar “前方停车”.  Cuando el módulo de interacción por voz la reconozca correctamente, reproducirá “学习成功”, lo que indica que la palabra de comando se modificó correctamente. En ese momento podemos usar la entrada “前方停车” para lograr el mismo efecto que la palabra de comando “停车”.  Si necesita eliminar la entrada ”前方停车“, basta con decir ”删除停车指令“; cuando responda ”删除成功”, la eliminación de la entrada habrá finalizado (aquí solo se eliminará “前方停车”, no ”停车“).

Nota: las palabras de comando del firmware de fábrica son palabras de comando básicas y no se pueden modificar ni eliminar por voz. Solo puede existir una palabra de comando modificada por voz a la vez, y coexiste con las palabras de comando básicas.

<RelatedProducts slugs="ai-voice-module" />
