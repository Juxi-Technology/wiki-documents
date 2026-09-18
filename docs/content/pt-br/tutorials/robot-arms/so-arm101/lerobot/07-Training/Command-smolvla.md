---
title: "Etapa 7: Comando de treinamento — SmolVLA"
description: "Comando de treinamento do algoritmo SmolVLA: escolha entre o ajuste fino a partir de um modelo pré-treinado e o treinamento do zero, e veja o tamanho do pacote."
---

# Etapa 7: Comando de treinamento — SmolVLA

## Antes de executar

- **Ambiente**: primeiro ative a instância e envie o dataset conforme [Configuração do ambiente de treinamento em GPU na nuvem](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); observe que o smolvla exige dependências adicionais, veja "Instalar o ambiente" abaixo
- **Dataset**: o `--dataset.root=~/lerobot_my_dataset_shake_hands` do comando aponta para o dataset de aperto de mão coletado na etapa 6. Se você estiver treinando uma tarefa própria, substitua pelo nome do seu próprio dataset
- **Duas formas de treinamento**: o ajuste fino a partir de um modelo pré-treinado costuma dar melhores resultados e convergir mais rápido; já o treinamento do zero não exige baixar os pesos pré-treinados — escolha conforme a necessidade
- **Durante o treinamento, você pode acompanhar as curvas no wandb a qualquer momento**; consulte [Visualizar as curvas de treinamento em tempo real com o wandb](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentação de referência

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Instalar o ambiente

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Ajuste fino a partir de um modelo pré-treinado (recomendado)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

## Treinamento do zero

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

## Baixar o modelo

O pacote compactado do modelo smolvla tem cerca de 1 GB

<RelatedProducts slugs="so-arm101" />
