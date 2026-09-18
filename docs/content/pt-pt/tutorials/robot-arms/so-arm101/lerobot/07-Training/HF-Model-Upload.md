---
title: "Etapa 7: Enviar o modelo para o HuggingFace (opcional)"
description: "Envio do modelo treinado para o HuggingFace, com o método automático durante o treino e o envio manual depois de confirmar o resultado."
---

# Etapa 7: Enviar o modelo para o HuggingFace (opcional)

> Esta etapa é opcional. Depois do treino, o modelo fica no seu computador ou na instância de GPU na nuvem, e pode ser usado diretamente para inferência sem qualquer problema. Só é preciso enviá-lo para o HuggingFace quando precisar de **fazer backup do modelo, usar outra máquina para inferência ou partilhar o modelo com outras pessoas**.

## Placeholders nos comandos

Este artigo mantém a mesma convenção de placeholders dos capítulos anteriores. Substitua pelas suas próprias informações e, ao substituir, **remova também os sinais de menor e maior**:

- `<用户名>`: o nome da sua conta do HuggingFace
- `<你的用户名>`: o nome de utilizador do sistema no seu computador; digite `whoami` no terminal para o consultar

## Método 1: envio automático durante o treino

Acrescente duas linhas de parâmetros ao comando de treino; no final do treino, o modelo será enviado automaticamente:

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
```

**Estas duas linhas têm de aparecer em par. Escrever apenas `push_to_hub=true` gera erro.** O `repo_id` é o nome do repositório que dá a este modelo, no formato `nome da conta/nome do modelo`; se o repositório não existir, o LeRobot irá criá-lo automaticamente.

Por exemplo, o comando completo do ACT fica assim:

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
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

De acordo com as explicações da secção anterior, ao terminar este treino, o modelo aparecerá em `https://huggingface.co/<用户名>/shake_act_a`.

### Enviar também os checkpoints intermédios

Durante o treino, é guardado um checkpoint a cada `save_freq` (predefinição: 20000 passos). Se quiser enviar também esses checkpoints intermédios (por exemplo, quando o treino demora muito e quer poder usar o modelo intermédio a qualquer momento), acrescente esta linha:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

No envio, cada checkpoint recebe uma tag com o mesmo nome do número de passos (por exemplo `010000`); ao carregar o modelo mais tarde, basta especificar essa tag para obter a versão com o número de passos correspondente. Consulte os detalhes em "Carregar o modelo enviado" abaixo.

### Alguns parâmetros opcionais

Acrescente conforme a necessidade:

| Parâmetro | Descrição |
|---|---|
| `--policy.private=true` | Define o repositório como privado, invisível para os outros |
| `--policy.tags=act,so101` | Acrescenta tags ao modelo, para facilitar a pesquisa |
| `--policy.license=mit` | Especifica a licença de código aberto |

## Método 2: envio manual após o treino

Esta é a prática mais comum: durante o treino, escreva normalmente `--policy.push_to_hub=false` e, depois de o treino terminar e confirmar que o resultado é satisfatório, envie o modelo manualmente.

### 1. Iniciar sessão

Se já vinculou um Token, pode saltar esta etapa; se nunca vinculou, consulte [Registar uma conta no Hugging Face (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)。

```Shell
hf auth login
hf auth whoami
```

### 2. Envio

Suponha que o diretório de saída do treino do ACT é `~/output_lerobot_train/shake/act/`:

```Shell
export HF_USER=<用户名>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

Não é preciso criar o repositório do modelo antecipadamente; ao detetar que ele não existe, o `hf upload` cria-o automaticamente.

### 3. Enviar o checkpoint de um número de passos específico

Se quiser enviar apenas um checkpoint intermédio, em vez do último:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Enviar pela página web

Se o modelo não for grande e não quiser escrever comandos, também pode fazer isto diretamente na página web do HuggingFace: crie um repositório Model e arraste para lá os ficheiros do diretório `pretrained_model`.

## Carregar o modelo enviado

Depois de o modelo ser enviado, na altura da implantação basta apontar o `--policy.path` para ele; não é preciso descarregá-lo primeiro para o local:

```Shell
  --policy.path=<用户名>/shake_act_a \
```

Isto é mais prático do que apontar para um caminho local: basta mudar de computador, ou outra pessoa ter o nome da sua conta, para o usar diretamente. Note que descarregar o modelo do HuggingFace exige conseguir ligar-se aos servidores dele; em ambientes de rede como o da China continental, recomenda-se configurar primeiro o espelho conforme [Registar uma conta no Hugging Face (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)。

Se enviou vários checkpoints e quiser especificar qual usar, acrescente o número da versão:

```Shell
  --policy.pretrained_revision=005000 \
```

O `005000` é o número de passos daquele checkpoint que enviou.

## Observações

- O nome do repositório do modelo (`repo_id`) não tem relação com o `--output_dir` e o `--job_name` do comando de treino; são independentes, bastando escolher um nome fácil de reconhecer
- Todos os comandos de treino do tutorial usam `--policy.push_to_hub=false`; se quiser usar o envio automático, mude esta linha para `true` e acrescente `--policy.repo_id`, pois nenhum dos dois pode faltar

<RelatedProducts slugs="so-arm101" />
