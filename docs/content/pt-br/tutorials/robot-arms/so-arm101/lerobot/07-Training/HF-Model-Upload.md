---
title: "Etapa 7: Enviar o modelo ao Hugging Face (opcional)"
description: "Envie o modelo treinado para o Hugging Face, de forma automática durante o treinamento ou manual depois da conclusão, e veja como carregá-lo na inferência."
---

# Etapa 7: Enviar o modelo ao Hugging Face (opcional)

> Esta etapa é opcional. Depois do treinamento, o modelo fica no seu computador ou na instância de GPU na nuvem, e você pode usá-lo diretamente para inferência sem problema algum. Só é preciso enviá-lo para o HuggingFace quando você precisar **fazer backup do modelo, usar outra máquina para inferência ou compartilhar o modelo com outras pessoas**.

## Placeholders nos comandos

Este artigo mantém a mesma convenção de placeholders dos capítulos anteriores. Substitua pelas suas próprias informações e, ao substituir, **remova também os sinais de menor e maior**:

- `<用户名>`: o nome da sua conta do HuggingFace
- `<你的用户名>`: o nome de usuário do sistema no seu computador; digite `whoami` no terminal para consultá-lo

## Método 1: envio automático durante o treinamento

Adicione duas linhas de parâmetros ao comando de treinamento e, ao final do treinamento, o modelo será enviado automaticamente:

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
```

**Estas duas linhas devem aparecer em par. Escrever apenas `push_to_hub=true` gera erro.** O `repo_id` é o nome do repositório que você dá a este modelo, no formato `nome da conta/nome do modelo`. Se o repositório não existir, o LeRobot o criará automaticamente.

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

Conforme explicado na seção anterior, ao terminar esta versão do treinamento, o modelo aparecerá em `https://huggingface.co/<用户名>/shake_act_a`.

### Enviar também os checkpoints intermediários

Durante o treinamento, um checkpoint é salvo a cada `save_freq` (padrão: 20000 passos). Se você quiser enviar também esses checkpoints intermediários (por exemplo, quando o treinamento demora muito e você quer poder usar o modelo intermediário a qualquer momento), adicione esta linha:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

No envio, cada checkpoint recebe uma tag com o mesmo nome do número de passos (por exemplo `010000`). Ao carregar o modelo depois, basta especificar essa tag para obter a versão com o número de passos correspondente. Veja mais detalhes em "Carregar o modelo enviado" abaixo.

### Alguns parâmetros opcionais

Adicione conforme a necessidade:

| Parâmetro | Descrição |
|---|---|
| `--policy.private=true` | Define o repositório como privado, invisível para os outros |
| `--policy.tags=act,so101` | Adiciona tags ao modelo, para facilitar a busca |
| `--policy.license=mit` | Especifica a licença de código aberto |

## Método 2: envio manual após o treinamento

Esta é a prática mais comum: durante o treinamento, escreva normalmente `--policy.push_to_hub=false` e, depois que o treinamento terminar e você confirmar que o resultado é satisfatório, envie o modelo manualmente.

### 1. Login

Se você já vinculou um Token, pode pular esta etapa; se nunca vinculou, consulte [Registrar uma conta no Hugging Face (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)。

```Shell
hf auth login
hf auth whoami
```

### 2. Envio

Suponha que o diretório de saída do treinamento do ACT seja `~/output_lerobot_train/shake/act/`:

```Shell
export HF_USER=<用户名>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

Não é preciso criar o repositório do modelo antes; ao perceber que ele não existe, o `hf upload` o cria automaticamente.

### 3. Enviar o checkpoint de um número de passos específico

Se quiser enviar apenas um checkpoint intermediário, em vez do último:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Enviar pela página web

Se o modelo não for grande e você não quiser digitar comandos, também pode fazer isso diretamente na página web do HuggingFace: crie um repositório Model e arraste para dentro os arquivos do diretório `pretrained_model`.

## Carregar o modelo enviado

Depois que o modelo for enviado, basta apontar o `--policy.path` para ele na hora da implantação; não é preciso baixá-lo para o local antes:

```Shell
  --policy.path=<用户名>/shake_act_a \
```

Isso é mais prático do que apontar para um caminho local: basta trocar de computador, ou outra pessoa ter o nome da sua conta, para usá-lo diretamente. Observe que baixar o modelo do HuggingFace exige conexão com os servidores dele; em ambientes de rede como o da China continental, recomenda-se primeiro configurar o espelho conforme [Registrar uma conta no Hugging Face (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)。

Se você enviou vários checkpoints e quiser especificar qual usar, adicione o número da versão:

```Shell
  --policy.pretrained_revision=005000 \
```

O `005000` é o número de passos daquele checkpoint que você enviou.

## Observações

- O nome do repositório do modelo (`repo_id`) não tem relação com o `--output_dir` e o `--job_name` do comando de treinamento; eles são independentes, então basta escolher um nome fácil de reconhecer
- Todos os comandos de treinamento do tutorial usam `--policy.push_to_hub=false`; se quiser usar o envio automático, mude esta linha para `true` e adicione `--policy.repo_id`, pois nenhum dos dois pode faltar

<RelatedProducts slugs="so-arm101" />
