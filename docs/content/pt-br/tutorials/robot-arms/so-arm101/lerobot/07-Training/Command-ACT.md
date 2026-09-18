---
title: "Etapa 7: Comando de treinamento — ACT"
description: "Comando de treinamento do algoritmo ACT no LeRobot: entenda por que ele é recomendado para iniciantes e veja a descrição de cada parâmetro da linha de comando."
---

# Etapa 7: Comando de treinamento — ACT

## Antes de executar

- **Ambiente**: primeiro é preciso instalar o ambiente e enviar o dataset para a GPU na nuvem conforme [Configuração do ambiente de treinamento em GPU na nuvem](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU). O ACT já vem com o ambiente básico do LeRobot, sem necessidade de instalação adicional
- **Dataset**: o `--dataset.root=~/lerobot_my_dataset_shake_hands` do comando aponta para o dataset de aperto de mão coletado na etapa 6. Se você estiver treinando uma tarefa própria, substitua pelo nome do seu próprio dataset
- **Diretório de saída**: se o `--output_dir` já existir, será exibido diretamente um `FileExistsError`; troque por um novo nome de diretório, ou adicione `--resume=true` para continuar o treinamento
- **Durante o treinamento, você pode acompanhar as curvas no wandb a qualquer momento**; consulte [Visualizar as curvas de treinamento em tempo real com o wandb](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentação de referência

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## Por que começar pelo algoritmo ACT

O ACT é o primeiro modelo mais recomendado para treinar no LeRobot; suas vantagens são as seguintes:

- O modelo é muito leve, com apenas oitenta milhões de parâmetros treináveis

- A convergência do treinamento é muito rápida, e a inferência também é rápida

- Em uma única GPU, uma hora de treinamento já mostra resultados

- O modelo ACT em si é pequeno, com um pacote compactado de cerca de 200MB, muito fácil de armazenar e transportar. O pacote compactado do modelo gerado pelo treinamento tem cerca de 300MB (veja no final deste artigo)

- Coletar 30 episódios de dados no dataset já é basicamente suficiente

- Pode ser implantado para inferência em um computador Ubuntu, Mac, Windows e até em um Raspberry Pi

- O resultado da inferência no robô real é bastante bom, suficiente para tarefas simples como pegar objetos, apertar mãos e colocar canetas

- O algoritmo ACT já vem no ambiente básico da biblioteca LeRobot, sem necessidade de instalar outras bibliotecas

## Linha de comando

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

Antes do caractere de quebra de linha `` só pode haver um espaço, e depois dele não pode haver espaço

|Parâmetro da linha de comando|Descrição|
|---|---|
|--dataset.repo_id|O Repo_ID do dataset no HuggingFace, no formato `nome de usuário/nome do dataset`|
|--dataset.root|Caminho local do dataset. Quando o dataset já foi baixado para o local, deve apontar para o diretório real|
|--dataset.revision|Versão do dataset, especificada no momento de enviar o dataset para o HuggingFace|
|--dataset.streaming|Define se a leitura é em streaming. Quando o dataset está local, defina como `false`, pois não é necessária leitura em streaming|
|--policy.type|O algoritmo a ser treinado, como act, smolvla, diffusion, pi0, pi05, pi0_fast, wall_x|
|--output_dir|Diretório onde a saída do treinamento é salva|
|--job_name|O nome desta tarefa de treinamento|
|--policy.device|Dispositivo de computação|
|--wandb.enable|Ativa a visualização do wandb|
|--wandb.project|Nome do projeto no wandb|
|--policy.push_to_hub|Envia o modelo treinado para a nuvem do HuggingFace|
|--steps|Número de passos de treinamento|
|--batch_size|Quantidade de dados de entrada por passo; se a VRAM não for suficiente, deve ser reduzida|

## Processo de treinamento

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

O pacote compactado do modelo tem cerca de 300MB

<RelatedProducts slugs="so-arm101" />
