---
title: "Paso 7: Obtener los pesos del modelo"
description: "Empaqueta el modelo entrenado en la GPU en la nube, descarga el archivo de pesos a tu ordenador local y descomprímelo para usarlo en la inferencia."
---

# Paso 7: Obtener los pesos del modelo

Una vez terminado el entrenamiento en la GPU en la nube, puedes empaquetar el modelo y descargarlo a tu equipo local:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Cada 20K steps se guarda un archivo de pesos del modelo

Haz clic derecho para descargar el archivo `ckpt.zip` y descomprímelo en tu ordenador local

> Si además vas a pasar el modelo a otra persona, o piensas usar otro ordenador para la inferencia, subirlo directamente a Hugging Face es más cómodo que empaquetarlo y descargarlo; consulta [Subir el modelo a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload).

## Dar la mano

```Shell
# Modelo guardado en el número de pasos de entrenamiento indicado
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# El modelo más reciente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
