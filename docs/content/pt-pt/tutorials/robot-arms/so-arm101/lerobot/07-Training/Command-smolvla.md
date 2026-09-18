---
title: "Etapa 7: Comando de treino smolvla"
description: "Linha de comando de treino com o modelo smolvla, com ajuste fino a partir de um modelo pré-treinado ou treino a partir do zero."
---

# Etapa 7: Comando de treino smolvla

## Antes de executar

- **Ambiente**: primeiro abra a instância e envie o dataset conforme [Configuração do ambiente de treino em GPU na nuvem](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); note que o smolvla exige dependências adicionais, ver "Instalar o ambiente" abaixo
- **Dataset**: o `--dataset.root=~/lerobot_my_dataset_shake_hands` do comando aponta para o dataset de aperto de mão recolhido na etapa 6. Se estiver a treinar uma tarefa própria, substitua pelo nome do seu próprio dataset
- **Duas formas de treino**: o ajuste fino com base num modelo pré-treinado costuma dar melhores resultados e convergir mais depressa; já o treino do zero não exige descarregar os pesos pré-treinados, escolha conforme a necessidade
- **Durante o treino pode acompanhar as curvas no wandb a qualquer momento**; consulte [Visualizar as curvas de treino em tempo real com o wandb](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentação de referência

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Instalar o ambiente

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Ajuste fino com base num modelo pré-treinado (recomendado)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<utilizador>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Treino do zero

```Shell
lerobot-train \
  --dataset.repo_id=<utilizador>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Descarregar o modelo

O pacote comprimido do modelo smolvla tem cerca de 1 GB

<RelatedProducts slugs="so-arm101" />
