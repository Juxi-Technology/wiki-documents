---
title: "Etapa 7: Treinamento local no Ubuntu"
description: "Treine o modelo na própria máquina Ubuntu com placa NVIDIA: ajuste os caminhos do conjunto de dados e execute o treinamento com o algoritmo ACT e o wandb."
---

# Etapa 7: Treinamento local no Ubuntu

Este artigo se aplica ao caso em que o seu próprio computador já tem uma placa de vídeo NVIDIA, sem precisar de GPU na nuvem.

## Antes de executar

- **Ambiente**: basta instalar conforme [Primeira etapa: instalar o ambiente do Lerobot](/pt-br/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu); para o treinamento na máquina local, não é preciso enviar o dataset para outro lugar
- **Dataset**: o exemplo abaixo usa o dataset de pegar laranjas `lerobot_my_dataset_a` coletado no primeiro artigo da etapa 6; o caminho foi escrito como caminho absoluto, então substitua pelo seu próprio nome de usuário
- **Treinar no Mac**: troque o `/home/<你的用户名>/` do comando por `/Users/<你的用户名>/`
- **Diretório de saída**: se o `--output_dir` já existir, será exibido diretamente um `FileExistsError`; troque por um novo nome de diretório, ou adicione `--resume=true` para continuar o treinamento

## Documentação de referência

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Atenção

``Antes dele só pode haver um espaço, e depois dele não pode haver espaço

Quando o dataset está local, `--dataset.streaming` deve ser `false`, pois não é necessária leitura em streaming

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
