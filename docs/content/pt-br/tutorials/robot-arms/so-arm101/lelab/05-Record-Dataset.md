---
title: "5 · Gravar um dataset"
description: "Grave um dataset no LeLab: defina o repo_id, a descrição da tarefa, o número de episódios e as câmeras na página Recording e capture as demonstrações como um LeRobotDataset."
---

# 5 · Gravar um dataset

> **Anterior:** [04 Teleoperação](04-Teleoperation.md)
> **Próximo:** [06 Treinar e executar inferência](06-Train-and-Inference.md)

Um dataset é uma coleção de **episódios**, cada um sendo uma única demonstração da tarefa do início ao fim. Gravar é teleoperação mais um controle de gravação.

## Configuração

Abra a aba **Recording** e preencha:

| Campo | O que colocar |
|---|---|
| **Nome do dataset** (`repo_id`) | `your-name/task-name`, por exemplo `juxi/pick-up-the-cube`. A parte `name/` deve ser seu nome de usuário da Hugging Face se você pretende enviar |
| **Descrição da tarefa** | Uma frase, por exemplo `pick up the cube and drop it in the box`. É o texto no qual a policy é condicionada |
| **Episódios** | Quantas demonstrações — veja abaixo |
| **Câmeras** | Quais câmeras configuradas incluir, e em que resolução e taxa de quadros |

### Quantos episódios

**30 a 50** para um simples pegar e colocar. Uma tarefa muito repetitiva precisa de menos; uma tarefa com muita variação precisa de mais.

A consistência importa mais que a quantidade: a mesma posição inicial, o mesmo enquadramento de câmera e a mesma descrição de tarefa em todos os episódios. Cinquenta demonstrações quase idênticas vencem cem variadas. Varie apenas aquilo contra o que você quer que a policy seja robusta — se todo episódio começa com o cubo no mesmo lugar, a policy aprende esse lugar.

## Durante a gravação

| Tecla | Ação |
|---|---|
| `SPACE` ou `→` | Encerra o episódio atual, inicia o próximo |
| `DEL` ou `←` | Descarta o episódio recém-gravado e o refaz |

A aba mostra um contador de episódios e um contador de sessões.

Encerre o episódio quando a tarefa estiver completa — não depois que o braço voltar ao início. Voltar é assunto do próximo episódio.

Refaça um episódio quando você errar o braço, esbarrar no objeto e tirá-lo do lugar, ou não completar a tarefa. A policy aprende com tudo o que está no dataset, inclusive os erros.

## Parando

Pare a sessão quando tiver episódios suficientes. **A gravação é finalizada quando você para** — é aí que o índice do dataset é escrito. Uma sessão encerrada no meio de um episódio pode deixar um dataset que parece incompleto.

## Para onde vão os dados

Por padrão, em `~/.cache/huggingface/lerobot/`, usando o `repo_id` que você escolheu. Nada é enviado até você fazer o push pela aba **Upload**.

## Verifique a gravação

Abra a aba **Datasets** e selecione o dataset. Você pode percorrer os episódios quadro a quadro, uma câmera de cada vez, com um traço do movimento das juntas.

Faça isso antes de treinar. Ele detecta o que é invisível enquanto você segura o braço:

- Uma câmera rotacionada errado — os quadros ficam de lado
- Um episódio com um trecho de tempo morto no início
- Uma câmera de pulso que saiu do enquadramento no meio do caminho

Regravar custa minutos; descobrir isso depois do treinamento custa a execução do treinamento.

---

> **Próximo:** [06 Treinar e executar inferência](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
