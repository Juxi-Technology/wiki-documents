---
title: "6 · Treinar e executar inferência"
description: "Treine e execute inferência com o LeLab: escolha o dataset e o tipo de policy (ACT primeiro), treine localmente ou como job na nuvem do Hugging Face e depois rode no braço seguidor."
---

# 6 · Treinar e executar inferência

> **Anterior:** [05 Gravar um dataset](05-Record-Dataset.md)
> **Próximo:** [07 Solução de problemas](07-Troubleshooting.md)

O treinamento transforma o dataset em uma **policy** — um modelo que mapeia imagens de câmera para posições de juntas. A inferência executa essa policy no braço follower.

## Treinar

Abra a aba **Training** e escolha:

| Escolha | Observações |
|---|---|
| **Dataset** | Um dataset local, ou um do Hub |
| **Tipo de policy** | **ACT** costuma ser a primeira escolha para um único braço. Diffusion Policy, SmolVLA e a família π₀ também estão disponíveis |
| **Onde executar** | Esta máquina, ou um job na nuvem da Hugging Face |
| **Duração do treinamento** | Número de passos. Acompanhe a loss em vez de presumir que mais é melhor |

A aba transmite o log de treinamento e mostra os checkpoints conforme são gravados.

### Local ou nuvem

| | Local | Job na nuvem da Hugging Face |
|---|---|---|
| Precisa | De uma GPU nesta máquina | De uma conta da Hugging Face com acesso |
| Velocidade | Depende da sua GPU | Máquina fixa, escolhida por job |
| Melhor para | Datasets pequenos, experimentação | Execuções mais longas |

A opção de nuvem é o motivo pelo qual um notebook basta para o resto do fluxo de trabalho: gravar localmente, treinar remotamente.

### Extras de policy

Alguns tipos de policy precisam de dependências que o LeLab não instala por padrão. Selecionar um deles pede que você as instale — aceite e espere a instalação em segundo plano terminar antes de iniciar o job. O mesmo mecanismo cobre extras opcionais de treinamento.

## Checkpoints

O treinamento grava checkpoints periodicamente, não só no fim, então uma execução interrompida ainda deixa um modelo utilizável. O nome de cada checkpoint carrega o número do passo. Experimente um mais antigo se a loss começou a subir.

## Inferência

Abra a aba **Inference**:

1. Confirme que os dois braços estão conectados e calibrados.
2. Selecione a **policy** — um checkpoint local, ou um modelo do Hub.
3. Confirme as **câmeras** e sua **rotação**.
4. Inicie a inferência e limpe a área de trabalho.

### Rotação e associação da câmera

**Use a mesma rotação da gravação.** Este é o motivo mais comum de uma policy bem treinada não fazer nada de útil no robô real, e nada avisa: 0° e 180° produzem dimensões de imagem idênticas.

O mesmo vale para a **associação** da câmera. Se a câmera chamada `wrist` durante a gravação agora é uma câmera física diferente, a policy vê a imagem errada.

Se tudo isso estiver certo e o braço ainda falhar, olhe o dataset de novo — veja a [página 5](05-Record-Dataset.md).

### Intervenções

Pare a inferência antes de estender a mão para o braço. Uma correção que você faz na mão não é sinal de treinamento, a menos que você grave um novo episódio e retreine.

## Replay

O replay reexecuta um episódio gravado no braço follower. Ele reproduz as posições de junta gravadas, então parece correto mesmo se a policy for ruim — ele verifica o hardware e o dataset, não a policy. Use a inferência para ver o que a policy faz.

---

> **Próximo:** [07 Solução de problemas](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
