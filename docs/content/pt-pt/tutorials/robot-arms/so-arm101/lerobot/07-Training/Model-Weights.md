---
title: "Etapa 7: Obter o ficheiro de pesos do modelo"
description: "Como empacotar e descarregar para o computador local o ficheiro de pesos do modelo treinado na GPU na nuvem."
---

# Etapa 7: Obter o ficheiro de pesos do modelo

Depois de treinar na GPU na nuvem, pode empacotar o modelo e descarregá-lo para o local:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

A cada 20K steps, o ficheiro de pesos do modelo é guardado uma vez

Clique com o botão direito para descarregar o pacote comprimido `ckpt.zip` e descomprima-o no seu computador local

> Se o modelo ainda tiver de ser enviado a outras pessoas, ou se pretender usar outro computador para a inferência, enviá-lo diretamente para o Hugging Face será mais simples do que empacotar e descarregar; consulte [Enviar o modelo para o HuggingFace (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)。

## Aperto de mão

```Shell
# Modelo guardado no número de passos de treino especificado
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# O modelo mais recente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
