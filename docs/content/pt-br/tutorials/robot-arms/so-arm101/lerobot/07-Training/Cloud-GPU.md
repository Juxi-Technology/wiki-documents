---
title: "Etapa 7: Configuração do ambiente de GPU na nuvem"
description: "Configure o ambiente de treinamento na GPU na nuvem: ative a instância, instale o LeRobot, envie o conjunto de dados e escolha o algoritmo de treinamento."
---

# Etapa 7: Configuração do ambiente de GPU na nuvem

## Antes de treinar, leia aqui primeiro

O dataset já foi coletado na etapa 6; agora vem o treinamento do modelo. Esta etapa envolve três coisas, e este artigo cobre as duas primeiras:

1. **Preparar o ambiente de treinamento**: ativar uma instância na plataforma de GPU na nuvem e instalar o LeRobot, o ffmpeg, o wandb etc. (este artigo)
2. **Enviar o dataset para a GPU na nuvem**: os dados coletados na etapa 6 ainda estão no seu computador (seção "Montar o dataset" deste artigo)
3. **Executar o comando de treinamento**: como escolher o algoritmo e ajustar os parâmetros, veja abaixo nos diversos artigos

## O dataset usado no tutorial

Nos comandos de treinamento e inferência, o dataset usado é o **da tarefa de aperto de mão `lerobot_my_dataset_shake_hands`** (o terceiro artigo da etapa 6 é justamente a demonstração dele), e o caminho local é `~/lerobot_my_dataset_shake_hands`. Antes de executar o comando de treinamento, confirme que este diretório realmente existe e que o nome é exatamente igual.

Se você quiser treinar uma tarefa coletada por você mesmo, basta substituir todos os `lerobot_my_dataset_shake_hands` do comando pelo nome do seu próprio dataset.

## Como escolher o algoritmo de treinamento

| Algoritmo | Documentação | Características |
|---|---|---|
| ACT | [Linha de comando de treinamento-ACT](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | Recomendado para iniciantes; modelo pequeno e treinamento rápido, com resultados visíveis em uma hora em uma única GPU |
| SmolVLA | [Linha de comando de treinamento-smolvla](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | Recomendado para avançar; permite ajuste fino a partir de um modelo pré-treinado |
| pi0 | [Linha de comando de treinamento-pi0](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | Melhor resultado, mas com alto consumo de VRAM e treinamento lento |
| pi0.5 | [Linha de comando de treinamento-pi0.5](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | Versão aprimorada do pi0 |
| pi0fast | [Linha de comando de treinamento-pi0fast](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | Inferência mais rápida |

Recomenda-se primeiro percorrer todo o fluxo completo com o ACT e, depois de se familiarizar, trocar para outros algoritmos.

## Depois do treinamento

- Para enviar o modelo treinado ao Hugging Face (backup, trocar de máquina, compartilhar com outras pessoas), consulte [Enviar o modelo para o HuggingFace (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- Para baixar o modelo de volta para o seu computador, consulte [Obter o arquivo de pesos do modelo](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## Treinamento na máquina local

Se o seu computador já tiver uma placa de vídeo NVIDIA, você também pode dispensar a GPU na nuvem e treinar diretamente na máquina local; consulte [Treinamento local no Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu).

## Desative o proxy de rede do seu computador

Caso contrário, talvez não seja possível abrir a linha de comando do Jupyter

## Fazer login na plataforma de GPU na nuvem Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## Ativar uma instância de GPU na nuvem

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> Clique em "JupyterLab" abaixo; há um botão de upload no canto superior esquerdo, onde você pode enviar códigos e datasets
> 
> 

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

# Se você não for enviar para o Huggingface e não precisar do wandb, não é necessário instalar
```

> Se durante a instalação do modelo faltar o training, é preciso instalar adicionalmente
> 
> `pip install -e ".[training]"`
> 
> 

## Fazer login no wandb

```Shell
wandb login
Copie e cole a API Key, pressione Enter
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montar o dataset

Primeiro passo: compacte o dataset coletado na etapa 6 em um zip e envie-o para o "conjunto de dados" da plataforma de GPU na nuvem (há um botão de upload no canto superior esquerdo do JupyterLab). Depois que a plataforma terminar o processamento, ela fornecerá um comando de download.

Segundo passo: na linha de comando da instância, execute este comando de download e descompacte:

```Shell
Copie o comando de download da instância, algo como:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

O dataset aparece no diretório `~`.

Após descompactar, use `ls ~` para confirmar; o nome do diretório deve ser exatamente igual ao `--dataset.root` do comando de treinamento (tanto este artigo quanto os seguintes usam `~/lerobot_my_dataset_shake_hands`). Se a descompactação criar um diretório extra com o mesmo nome, como `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`, mova o conteúdo do diretório interno para o externo, ou aponte o `--dataset.root` diretamente para o nível real.

## Alterar a frequência de salvamento dos pesos (opcional)

Abra `lerobot/src/lerobot/configs/train.py`

Altere save_freq de 20_000 para 5_000

Assim é possível obter o arquivo de pesos do modelo mais cedo no treinamento

<RelatedProducts slugs="so-arm101" />
