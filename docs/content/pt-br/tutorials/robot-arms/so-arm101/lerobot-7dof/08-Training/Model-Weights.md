---
title: "Obter o arquivo de pesos do modelo"
description: "Empacote e baixe o arquivo de pesos do modelo treinado na GPU na nuvem, entenda a frequência de salvamento dos checkpoints e veja o exemplo do aperto de mão."
---

# Obter o arquivo de pesos do modelo



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

A cada 20K steps, o arquivo de pesos do modelo é salvo uma vez



Clique com o botão direito para baixar o pacote compactado `ckpt.zip` e descompacte-o no seu computador local















## Aperto de mão

```Shell
# Modelo salvo no número de passos de treinamento especificado
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# O modelo mais recente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



