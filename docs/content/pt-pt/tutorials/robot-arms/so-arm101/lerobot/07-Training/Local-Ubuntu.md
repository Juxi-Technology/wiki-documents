---
title: "Etapa 7: Treino local em Ubuntu"
description: "Treino local do modelo LeRobot em Ubuntu, usando o conjunto de dados recolhido, com os requisitos de placa gráfica NVIDIA e o comando de treino."
---

# Etapa 7: Treino local em Ubuntu

Este artigo aplica-se à situação em que o seu próprio computador já tem uma placa gráfica NVIDIA, sem necessidade de GPU na nuvem.

## Antes de executar

- **Ambiente**: basta instalar conforme [Primeiro passo: instalar o ambiente do Lerobot](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu); no treino na própria máquina não é preciso enviar o dataset para outro local
- **Dataset**: o exemplo abaixo usa o dataset de apanhar laranjas `lerobot_my_dataset_a` recolhido no primeiro artigo da etapa 6; o caminho foi escrito como caminho absoluto, substitua pelo seu próprio nome de utilizador
- **Treinar no Mac**: substitua o `/home/<你的用户名>/` do comando por `/Users/<你的用户名>/`
- **Diretório de saída**: se o `--output_dir` já existir, é apresentado diretamente um `FileExistsError`; mude para um novo nome de diretório, ou acrescente `--resume=true` para continuar o treino

## Documentação de referência

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Atenção

``Antes dele só pode haver um espaço, e depois dele não pode haver espaço

Quando o dataset está local, `--dataset.streaming` tem de ser `false`, porque não é necessária leitura em streaming

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
