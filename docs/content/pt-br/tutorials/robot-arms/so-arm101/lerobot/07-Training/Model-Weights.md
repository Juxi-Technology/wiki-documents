---
title: "Etapa 7: Obter o arquivo de pesos do modelo"
description: "Empacote e baixe o arquivo de pesos do modelo treinado na GPU na nuvem, entenda a frequência de salvamento dos checkpoints e veja o exemplo do aperto de mão."
---

# Etapa 7: Obter o arquivo de pesos do modelo

Após o treinamento na GPU na nuvem, você pode empacotar o modelo e baixá-lo para o local:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

A cada 20K steps, o arquivo de pesos do modelo é salvo uma vez

Clique com o botão direito para baixar o pacote compactado `ckpt.zip` e descompacte-o no seu computador local

> Se o modelo ainda precisar ser passado para outras pessoas, ou se você pretende usar outro computador para a inferência, enviá-lo diretamente para o Hugging Face é mais prático do que empacotar e baixar; consulte [Enviar o modelo para o HuggingFace (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)。

## Aperto de mão

```Shell
# Modelo salvo no número de passos de treinamento especificado
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# O modelo mais recente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
