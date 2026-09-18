---
title: "Etapa 7: Ambiente de treino em GPU na nuvem"
description: "Configuração do ambiente de treino na plataforma de GPU na nuvem Featurize, com o envio do conjunto de dados e a ligação ao wandb."
---

# Etapa 7: Ambiente de treino em GPU na nuvem

## Antes do treino, leia primeiro isto

O dataset já foi recolhido na etapa 6; a seguir vem o treino do modelo. Esta etapa inclui três coisas, e este artigo trata das duas primeiras:

1. **Preparar o ambiente de treino**: abrir uma instância na plataforma de GPU na nuvem e instalar o LeRobot, o ffmpeg, o wandb, etc. (este artigo)
2. **Enviar o dataset para a GPU na nuvem**: os dados recolhidos na etapa 6 ainda estão no seu computador (secção "Montar o dataset" deste artigo)
3. **Executar o comando de treino**: como escolher o algoritmo e ajustar os parâmetros, ver os artigos seguintes

## O dataset usado no tutorial

Nos comandos de treino e inferência, o dataset usado é o **dataset da tarefa de aperto de mão `lerobot_my_dataset_shake_hands`** (o terceiro artigo da etapa 6 é precisamente o que o demonstra), e o caminho local é `~/lerobot_my_dataset_shake_hands`. Antes de executar o comando de treino, confirme que este diretório existe realmente e que o nome é exatamente igual.

Se o que quer treinar for uma tarefa recolhida por si, basta substituir todos os `lerobot_my_dataset_shake_hands` do comando pelo nome do seu próprio dataset.

## Como escolher o algoritmo de treino

| Algoritmo | Documentação | Características |
|---|---|---|
| ACT | [Linha de comando de treino-ACT](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | Recomendado para iniciantes, modelo pequeno e treino rápido; numa única GPU, uma hora já mostra resultados |
| SmolVLA | [Linha de comando de treino-smolvla](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | Recomendado para progressão, pode ser afinado com base num modelo pré-treinado |
| pi0 | [Linha de comando de treino-pi0](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | O melhor resultado, mas com elevado consumo de VRAM e treino lento |
| pi0.5 | [Linha de comando de treino-pi0.5](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | Versão melhorada do pi0 |
| pi0fast | [Linha de comando de treino-pi0fast](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | Inferência mais rápida |

Recomenda-se começar por executar o ACT de ponta a ponta para percorrer o fluxo completo e, depois de se familiarizar, mudar para outros algoritmos.

## Depois do treino

- Para enviar o modelo treinado para o Hugging Face (backup, mudar de máquina, partilhar com outras pessoas), consulte [Enviar o modelo para o HuggingFace (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- Para descarregar o modelo para o seu computador local, consulte [Obter o ficheiro de pesos do modelo](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## Treino na própria máquina

Se o seu computador já tiver uma placa gráfica NVIDIA, também pode dispensar a GPU na nuvem e treinar diretamente na própria máquina; consulte [Treino local em Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu).

## Desativar o proxy de rede do seu computador

Caso contrário, pode não conseguir abrir a linha de comando do Jupyter

## Iniciar sessão na plataforma de GPU na nuvem Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## Abrir uma instância de GPU na nuvem

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> Clique em "JupyterLab" em baixo; no canto superior esquerdo existe um botão de carregamento, onde pode carregar código e datasets
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

# Se não for enviar para o Huggingface e não precisar do wandb, não é necessário instalar
```

> Se na instalação do modelo faltar o training, é necessário instalar adicionalmente
> 
> `pip install -e ".[training]"`
> 
> 

## Iniciar sessão no wandb

```Shell
wandb login
复制粘贴API Key，回车
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montar o dataset

Primeiro passo: comprima o dataset recolhido na etapa 6 num zip e carregue-o para o "conjunto de dados" da plataforma de GPU na nuvem (no canto superior esquerdo do JupyterLab existe um botão de carregamento). Depois de a plataforma terminar o processamento, irá fornecer-lhe um comando de download.

Segundo passo: na linha de comando da instância, execute este comando de download e descomprima:

```Shell
复制实例下载命令，类似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

O dataset aparece no diretório `~`.

Depois de descomprimir, pode usar `ls ~` para confirmar; o nome do diretório tem de ser exatamente igual ao `--dataset.root` do comando de treino (tanto este artigo como os seguintes usam `~/lerobot_my_dataset_shake_hands`). Se a descompressão criar um nível extra de diretório com o mesmo nome, por exemplo `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`, mova o conteúdo do nível interno para o externo, ou aponte diretamente o `--dataset.root` para o nível real.

## Alterar a frequência de guardar os pesos (opcional)

Abra `lerobot/src/lerobot/configs/train.py`

Altere save_freq, de 20_000 para 5_000

Assim é possível obter o ficheiro de pesos do modelo mais cedo no treino

<RelatedProducts slugs="so-arm101" />
