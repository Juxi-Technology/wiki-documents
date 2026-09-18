---
title: "Etapa 7: Comando de treino pi0.5"
description: "Linha de comando de treino com o modelo pi0,5, versão melhorada do pi0, incluindo a preparação do ambiente extra necessário."
---

# Etapa 7: Comando de treino pi0.5

## Antes de executar

- **Ambiente**: primeiro abra a instância e envie o dataset conforme [Configuração do ambiente de treino em GPU na nuvem](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU), depois volte a este artigo e execute as secções "Instalar o ambiente" e "Linha de comando"
- **Dataset**: o `--dataset.root=~/lerobot_my_dataset_shake_hands` do comando aponta para o dataset de aperto de mão recolhido na etapa 6. Se estiver a treinar uma tarefa própria, substitua pelo nome do seu próprio dataset
- **Diretório de saída**: se o `--output_dir` já existir, elimine-o primeiro com o `sudo rm -rf` acima, ou mude para um novo nome
- **Durante o treino pode acompanhar as curvas no wandb a qualquer momento**; consulte [Visualizar as curvas de treino em tempo real com o wandb](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentação de referência

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

https://www.pi.website/blog/pi05

## Instância de GPU na nuvem recomendada

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/1.png)

## Instalar o ambiente

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## Linha de comando

- Eliminar os ficheiros da pasta de saída de um treino interrompido anteriormente

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- Treinar

```Shell
lerobot-train \
    --dataset.repo_id=<utilizador>/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi05 \
    --output_dir=~/output_lerobot_train/shake/pi05_A \
    --job_name=shake_pi05_A \
    --policy.pretrained_path=lerobot/pi05_base \
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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

Só passados 20 minutos de execução da linha de comando é que o treino começa efetivamente

O pacote comprimido do modelo tem cerca de 5 GB, e 7 GB depois de descomprimido

<RelatedProducts slugs="so-arm101" />
