---
title: "Etapa 7: Comando de treino pi0"
description: "Linha de comando de treino com o modelo pi0, que dá os melhores resultados, com os requisitos de memória da GPU e o exemplo completo."
---

# Etapa 7: Comando de treino pi0

## Antes de executar

- **Ambiente**: primeiro abra a instância e envie o dataset conforme [Configuração do ambiente de treino em GPU na nuvem](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU), depois volte a este artigo e execute as secções "Instalar o ambiente" e "Linha de comando"
- **Dataset**: o `--dataset.root=~/lerobot_my_dataset_shake_hands` do comando aponta para o dataset de aperto de mão recolhido na etapa 6. Se estiver a treinar uma tarefa própria, substitua pelo nome do seu próprio dataset
- **Diretório de saída**: se o `--output_dir` já existir, elimine-o primeiro com o `sudo rm -rf` acima, ou mude para um novo nome
- **Durante o treino pode acompanhar as curvas no wandb a qualquer momento**; consulte [Visualizar as curvas de treino em tempo real com o wandb](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentação de referência

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## Instância de GPU na nuvem recomendada

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## Instalar o ambiente

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Linha de comando

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

Só passados 20 minutos de execução da linha de comando é que o treino começa efetivamente

O pacote comprimido do modelo tem cerca de 5 GB, e 7 GB depois de descomprimido

<RelatedProducts slugs="so-arm101" />
