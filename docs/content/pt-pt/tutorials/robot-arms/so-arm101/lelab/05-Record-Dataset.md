---
title: "5 · Gravar um conjunto de dados"
description: "Grave um conjunto de dados no LeLab: defina o repo_id, a descrição da tarefa, o número de episódios e as câmaras na página Recording e capture as demonstrações como um LeRobotDataset."
---

# 5 · Gravar um conjunto de dados

> **Anterior:** [04 Teleoperação](04-Teleoperation.md)
> **Seguinte:** [06 Treinar e executar inferência](06-Train-and-Inference.md)

Um conjunto de dados é uma coleção de **episódios**, cada um uma única demonstração da tarefa do início ao fim. A gravação é teleoperação mais um controlo de gravação.

## Configuração

Abra o separador **Recording** e preencha:

| Campo | O que preencher |
|---|---|
| **Nome do conjunto de dados** (`repo_id`) | `your-name/task-name`, por exemplo `juxi/pick-up-the-cube`. A parte `name/` tem de ser o seu nome de utilizador na Hugging Face se pretender enviá-lo |
| **Descrição da tarefa** | Uma frase, por exemplo `pick up the cube and drop it in the box`. É o texto sobre o qual a política é condicionada |
| **Episódios** | Quantas demonstrações — ver abaixo |
| **Câmaras** | Que câmaras configuradas incluir e com que resolução e taxa de fotogramas |

### Quantos episódios

**30 a 50** para uma simples tarefa de pegar e colocar. Uma tarefa muito repetitiva precisa de menos; uma tarefa com muita variação precisa de mais.

A consistência importa mais do que a quantidade: a mesma posição inicial, o mesmo enquadramento da câmara e a mesma descrição da tarefa em cada episódio. Cinquenta demonstrações quase idênticas valem mais do que cem variadas. Varie apenas aquilo a que quer que a política seja robusta — se todos os episódios começarem com o cubo no mesmo sítio, a política aprende esse sítio.

## Durante a gravação

| Tecla | Ação |
|---|---|
| `SPACE` ou `→` | Termina o episódio atual e inicia o seguinte |
| `DEL` ou `←` | Descarta o episódio acabado de gravar e repete-o |

O separador mostra um contador de episódios e um contador de sessões.

Termine o episódio quando a tarefa estiver concluída — não depois de o braço regressar ao início. O regresso é assunto do episódio seguinte.

Repita um episódio quando falhou o braço, deslocou o objeto do sítio ou não concluiu a tarefa. A política aprende com tudo o que está no conjunto de dados, incluindo os erros.

## Parar

Pare a sessão quando tiver episódios suficientes. **A gravação é finalizada quando para** — é nesse momento que o índice do conjunto de dados é escrito. Uma sessão terminada a meio de um episódio pode deixar um conjunto de dados que se lê como incompleto.

## Onde ficam os dados

Por predefinição, em `~/.cache/huggingface/lerobot/`, associado ao `repo_id` que escolheu. Nada é enviado até o enviar a partir do separador **Upload**.

## Verificar a gravação

Abra o separador **Datasets** e selecione o conjunto de dados. Pode percorrer os episódios fotograma a fotograma, uma câmara de cada vez, com um traçado do movimento das articulações.

Faça isto antes do treino. Deteta o que é invisível enquanto segura o braço:

- Uma câmara com a rotação errada — os fotogramas estão de lado
- Um episódio com um troço de tempo morto no início
- Uma câmara de punho que saiu do enquadramento a meio

Uma nova gravação custa minutos; descobri-lo depois do treino custa a execução do treino.

---

> **Seguinte:** [06 Treinar e executar inferência](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
