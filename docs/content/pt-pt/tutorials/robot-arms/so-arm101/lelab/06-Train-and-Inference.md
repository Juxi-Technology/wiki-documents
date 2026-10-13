---
title: "6 · Treinar e executar inferência"
description: "Treine e execute inferência com o LeLab: escolha o conjunto de dados e o tipo de policy (ACT primeiro), treine localmente ou como tarefa na nuvem do Hugging Face e depois execute no braço seguidor."
---

# 6 · Treinar e executar inferência

> **Anterior:** [05 Gravar um conjunto de dados](05-Record-Dataset.md)
> **Seguinte:** [07 Resolução de problemas](07-Troubleshooting.md)

O treino transforma o conjunto de dados numa **política** — um modelo que mapeia imagens de câmara para posições das articulações. A inferência executa essa política no braço follower.

## Treinar

Abra o separador **Training** e escolha:

| Opção | Notas |
|---|---|
| **Conjunto de dados** | Um conjunto de dados local, ou um do Hub |
| **Tipo de política** | O **ACT** é normalmente a primeira escolha para um único braço. Também estão disponíveis o Diffusion Policy, o SmolVLA e a família π₀ |
| **Onde executar** | Nesta máquina, ou numa tarefa na nuvem do Hugging Face |
| **Duração do treino** | Número de passos. Acompanhe a perda em vez de presumir que mais é melhor |

O separador transmite o registo de treino e mostra os checkpoints à medida que são escritos.

### Local ou na nuvem

| | Local | Tarefa na nuvem do Hugging Face |
|---|---|---|
| Requer | Uma GPU nesta máquina | Uma conta Hugging Face com acesso |
| Velocidade | Depende da sua GPU | Máquina fixa, escolhida por tarefa |
| Ideal para | Conjuntos de dados pequenos, experimentação | Execuções mais longas |

A opção na nuvem é o motivo pelo qual um portátil basta para o resto do fluxo de trabalho: gravar localmente, treinar remotamente.

### Extras das políticas

Alguns tipos de política precisam de dependências que o LeLab não instala por predefinição. Selecionar um deles pede-lhe para as instalar — aceite e aguarde que a instalação em segundo plano termine antes de iniciar a tarefa. O mesmo mecanismo abrange os extras opcionais de treino.

## Checkpoints

O treino escreve checkpoints periodicamente, não apenas no fim, por isso uma execução interrompida deixa na mesma um modelo utilizável. O nome de cada checkpoint inclui o número do passo. Experimente um anterior se a perda começou a subir.

## Inferência

Abra o separador **Inference**:

1. Confirme que ambos os braços estão ligados e calibrados.
2. Selecione a **política** — um checkpoint local, ou um modelo do Hub.
3. Confirme as **câmaras** e a respetiva **rotação**.
4. Inicie a inferência e liberte o espaço de trabalho.

### Rotação e associação das câmaras

**Utilize a mesma rotação que durante a gravação.** É a razão mais comum para uma política bem treinada não fazer nada de útil no robô real, e nada o avisa: 0° e 180° produzem dimensões de imagem idênticas.

O mesmo se aplica à **associação** das câmaras. Se a câmara chamada `wrist` durante a gravação for agora uma câmara física diferente, a política vê a imagem errada.

Se tudo isto estiver correto e o braço continuar a falhar, veja o conjunto de dados novamente — ver [página 5](05-Record-Dataset.md).

### Intervir

Pare a inferência antes de se aproximar do braço. Uma correção feita à mão não é sinal de treino, a menos que grave um novo episódio e treine de novo.

## Reprodução

A reprodução volta a executar um episódio gravado no braço follower. Reproduz as posições das articulações gravadas, por isso parece correto mesmo que a política seja má — verifica o hardware e o conjunto de dados, não a política. Utilize a inferência para ver o que a política faz.

---

> **Seguinte:** [07 Resolução de problemas](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
