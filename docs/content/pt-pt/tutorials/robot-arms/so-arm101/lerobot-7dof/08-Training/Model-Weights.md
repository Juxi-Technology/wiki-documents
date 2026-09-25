---
title: "Obter o ficheiro de pesos do modelo"
description: "Como empacotar e descarregar para o computador local o ficheiro de pesos do modelo treinado na GPU na nuvem."
---

# Obter o ficheiro de pesos do modelo



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

A cada 20K steps, o ficheiro de pesos do modelo é guardado uma vez



Clique com o botão direito para descarregar o pacote comprimido `ckpt.zip` e descomprima-o no seu computador local











## Aperto de mão

```Shell
# Modelo guardado no número de passos de treino especificado
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# O modelo mais recente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```


