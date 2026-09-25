---
title: "Configuração do ambiente de treinamento em GPU na nuvem"
description: "Configure o ambiente de treinamento na GPU na nuvem: ative a instância, instale o LeRobot, envie o conjunto de dados e escolha o algoritmo de treinamento."
---

# Configuração do ambiente de treinamento em GPU na nuvem

## Desative o proxy de rede do seu computador

Caso contrário, talvez não seja possível abrir a linha de comando do Jupyter

## Fazer login na plataforma de GPU na nuvem Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Entre no grupo de usuários e diga ao atendimento que você é fã do Zihao Xiong, da Tongji, para receber um cupom de crédito

## Ativar uma instância de GPU na nuvem

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

## Fazer login no wandb

```Shell
wandb login
Copie e cole a API Key, pressione Enter
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montar o conjunto de dados

```Shell
Copie o comando de download da instância, algo como:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

O conjunto de dados aparece no diretório `~`

## Alterar a frequência de salvamento dos pesos (opcional)

Abra `lerobot/src/lerobot/configs/train.py`

Altere save\_freq de 20\_000 para 5\_000

Assim é possível obter o arquivo de pesos do modelo mais cedo no treinamento



