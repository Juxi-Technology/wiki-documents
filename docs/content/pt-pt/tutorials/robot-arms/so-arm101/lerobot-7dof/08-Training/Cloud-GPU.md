---
title: "Ambiente de treino em GPU na nuvem"
description: "Configuração do ambiente de treino na plataforma de GPU na nuvem Featurize, com o envio do conjunto de dados e a ligação ao wandb."
---

# Ambiente de treino em GPU na nuvem

## Desativar o proxy de rede do seu computador

Caso contrário, pode não conseguir abrir a linha de comando do Jupyter

## Iniciar sessão na plataforma de GPU na nuvem Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Junte-se ao grupo de utilizadores e diga ao apoio ao cliente que é fã de Tongji Zihao para receber um vale de desconto

## Abrir uma instância de GPU na nuvem

## Instalar e configurar o ambiente

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## Iniciar sessão no wandb

```Shell
wandb login
Copie e cole a chave API e prima Enter
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montar o dataset

```Shell
Copie o comando de descarregamento da instância, algo como:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

O dataset aparece no diretório `~`

## Alterar a frequência de guardar os pesos (opcional)

Abra `lerobot/src/lerobot/configs/train.py`

Altere save\_freq, de 20\_000 para 5\_000

Assim é possível obter o ficheiro de pesos do modelo mais cedo no treino


