---
title: "Comando de treinamento-ACT (recomendado para começar)"
description: "Comando de treinamento do algoritmo ACT no LeRobot: entenda por que ele é recomendado para iniciantes e veja a descrição de cada parâmetro da linha de comando."
---

# Comando de treinamento\-ACT (recomendado para começar)

## Documentação de referência

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act\.mdx

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

## Por que começar pelo algoritmo ACT

O ACT é o primeiro modelo mais recomendado para treinar no LeRobot; suas vantagens são as seguintes:

- O modelo é muito leve, com apenas oitenta milhões de parâmetros treináveis

- A convergência do treinamento é muito rápida, e a inferência também é rápida

- Em uma única GPU, uma hora de treinamento já mostra resultados

- O pacote compactado do modelo ACT tem cerca de 200MB, muito fácil de armazenar e transportar

- Coletar 30 episódios de dados no conjunto de dados já é basicamente suficiente

- Pode ser implantado para inferência em um computador Ubuntu, Mac, Windows e até em um Raspberry Pi

- O resultado da inferência no robô real é bastante bom, suficiente para tarefas simples como pegar objetos, apertar mãos e colocar canetas

- O algoritmo ACT já vem no ambiente básico da biblioteca LeRobot, sem necessidade de instalar outras bibliotecas

## Linha de comando

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## Descrição da linha de comando

Antes do caractere de quebra de linha `\` só pode haver um espaço, e depois dele não pode haver espaço

Os itens em vermelho são parâmetros que devem ser verificados ou modificados antes de cada execução

|Parâmetro da linha de comando|Descrição|
|---|---|
|\-\-dataset\.repo\_id|O Repo\_ID do conjunto de dados no HuggingFace|
|\-\-dataset\.root|Caminho local do conjunto de dados|
|\-\-dataset\.revision|Versão do conjunto de dados, especificada no momento de enviar o conjunto de dados para o HuggingFace|
|\-\-dataset\.streaming|Define se a leitura é em streaming. Quando o conjunto de dados está local, deve ser `false`, pois não é necessária leitura em streaming|
|\-\-dataset\.split|O padrão é `train`, ou seja, usar todos os dados como conjunto de treinamento|
|\-\-policy\.type|O algoritmo a ser treinado, como act, smolvla, diffusion, pi0, wallx|
|\-\-output\_dir|Diretório onde a saída do treinamento é salva|
|\-\-job\_name|O nome desta tarefa de treinamento|
|\-\-policy\.device|Dispositivo de computação|
|\-\-wandb\.enable|Ativa a visualização do wandb|
|\-\-wandb\.project|Nome do projeto no wandb|
|\-\-policy\.push\_to\_hub|Envia o modelo treinado para a nuvem do HuggingFace|
|\-\-steps|Número de passos de treinamento|
|\-\-batch\_size|Quantidade de dados de entrada por passo; se a VRAM não for suficiente, deve ser reduzida|
|||

## Processo de treinamento

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

O pacote compactado do modelo tem cerca de 300MB

