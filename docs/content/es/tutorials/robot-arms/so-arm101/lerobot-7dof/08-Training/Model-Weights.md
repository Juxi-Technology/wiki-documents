---
title: "Obtener el archivo de pesos del modelo"
description: "Empaqueta el modelo entrenado en la GPU en la nube, descarga el archivo de pesos a tu ordenador local y descomprímelo para usarlo en la inferencia."
---

# Obtener el archivo de pesos del modelo



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Cada 20K steps se guarda un archivo de pesos del modelo



Haz clic derecho para descargar el archivo `ckpt.zip` y descomprímelo en tu ordenador local










## Apretón de manos

```Shell
# Modelo guardado en el número de pasos de entrenamiento indicado
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# El modelo más reciente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



