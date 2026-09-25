---
title: "Tutorial do braço robótico SO-ARM101 de 7 eixos"
description: "Antes de começar: confirme o mapeamento de servos e articulações, veja o que muda em relação ao braço de 6 servos e escolha como substituir os arquivos."
---

# Tutorial do braço robótico SO\-ARM101 de 7 eixos

# SO\-ARM101 7\-DOF · Preparação antes de executar

> Este documento é destinado a quem converteu o **SO\-ARM101 de 6 servos para 7 servos** e deseja executar o fluxo completo no LeRobot (calibração → gravação → treinamento → implantação).
> Código correspondente: este repositório (`lerobot-7dof`), que é um fork do lerobot oficial, com alterações apenas na configuração dos motores relacionados ao SO.
> 
> 

---

## 0\. Confirme primeiro o seu braço robótico

7 servos (todos STS3215), relação entre o ID do servo e a articulação:

|**ID do servo**|**Nome da articulação**|**Descrição**|
|---|---|---|
|1|`shoulder_pan`|Rotação horizontal do ombro|
|2|`shoulder_lift`|Elevação do ombro|
|3|`elbow_flex`|Flexão do cotovelo|
|4|`wrist_flex`|Inclinação do punho (flexão para cima/baixo)|
|5|`wrist_yaw`|Guinada do punho (rotação esquerda/direita de cerca de 90°) · **servo adicionado nesta conversão** (inserido entre os antigos nº 4 e nº 5)|
|6|`wrist_roll`|Rolagem do punho · antigo motor de rolagem nº 5, ID 5→6, peça impressa inalterada e nome mantido|
|7|`gripper`|Garra · ID original = 6, renumerado para 7 após a alteração|

Ordem dos dados das articulações (ordem das dimensões das articulações em `action` / `observation.state` no Parquet após a gravação):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Atenção: **os dados, os arquivos de calibração e os modelos já treinados da versão de 6 servos são incompatíveis com este repositório**, sendo necessário refazer tudo conforme descrito abaixo.

---

## 1\. Se você clonou o repositório de código oficial, quais arquivos precisam ser substituídos/modificados

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: substituir manualmente após o git clone do lerobot oficial

Copie deste repositório sobre os **3 arquivos** do clone oficial:

|Arquivo deste repositório (origem)|Substitui (destino)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|Arquivo de mesmo nome no clone oficial|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|Arquivo de mesmo nome no clone oficial|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|Arquivo de mesmo nome no clone oficial (**apenas correção de comentário**, não afeta o funcionamento, pode não substituir)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <clone oficial>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clone oficial>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Pré-requisito: o seu clone oficial tem a mesma estrutura da base deste repositório (versão lerobot 2026\-08). Se a diferença de versão for grande, **não sobrescreva o arquivo inteiro**; faça apenas as duas alterações manuais descritas abaixo.
> 
> 

### Modificação manual quando as versões forem diferentes (apenas dois pontos)

**① Dicionário de motores** (um em `so_follower.py` e outro em `so_leader.py`, com o mesmo conteúdo) — troque o original

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

por

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # novo servo, rotação esquerda/direita
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # antigo motor de rolagem nº 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Lógica de calibração** (no `calibrate()` de cada arquivo) — remova o caso especial de "articulação de volta completa": troque

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

por uma única linha, registrando a faixa real de todas as articulações:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Por quê: a versão original fixava `wrist_roll` (rolagem em torno do eixo do antebraço) como articulação capaz de girar em volta completa (0\~4095), codificando a faixa total. Após a conversão para 7\-DOF, as articulações nº 5/6 do punho (yaw / roll) **têm limite mecânico e não dão volta completa**; fixar a volta completa faria o código enviar comandos de articulação para ângulos que a mecânica não alcança, com risco de danos. Agora, na calibração, cada motor tem min/max reais registrados manualmente.
> 
> 

### Notas sobre dois braços seguidores

`bi_so_follower / bi_so_leader (src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/) apenas encapsulam o braço único adicionando os prefixos left_/right_, `**`sem conter definição de motores`**`. Basta corrigir `**`os arquivos de braço único acima`**` para que os comandos de dois braços (--robot.type=bi_so_follower) já sejam 7-DOF automaticamente.`

## 1. Ambiente LeRobot

- [Computador Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Computador Windows](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Computador MAC](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Etapa 2: Substituir arquivos (adaptação para 7DOF)

- [Etapa 2: Substituir arquivos (adaptação para 7DOF)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Porta serial

- [Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Computador Windows](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Computador MAC](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Calibração

- [Computador Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Computador Windows](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Computador Mac](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Teleoperação

- [Computador Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Computador Windows](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Computador Mac](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Teleop. e câmera

- [Computador Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Computador Windows](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Computador Mac](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Coleta de dados

- [Revisar e reproduzir o conjunto de dados](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Observações sobre a coleta de dados](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Registrar conta no Hugging Face (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Enviar o conjunto de dados para o HuggingFace (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Coleta de dados por demonstração-Aperto de mão 200](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Coleta de dados por demonstração](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Treinamento

- [Configuração do ambiente de treinamento em GPU na nuvem](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Comando de treinamento-ACT (recomendado para começar)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Comando de treinamento-Diffusion](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Comando de treinamento-pi0.5](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Comando de treinamento-pi0 (melhor desempenho)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Comando de treinamento-pi0fast](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Comando de treinamento-smolvla (recomendado para avançar)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Enviar o modelo para o HuggingFace (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Algoritmos de aprendizado por imitação suportados pelo LeRobot](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Treinamento local no Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Obter o arquivo de pesos do modelo](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Sugestões de parâmetros de treinamento](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [Curvas de treinamento em tempo real no wandb](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Inferência

- [Descrição da linha de comando](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Comando de inferência-ACT](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Comando de inferência-Diffusion](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Comando de inferência-pi0.5](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Comando de inferência-pi0](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Comando de inferência-smolvla](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Bugs comuns e soluções](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [Inferência no NVIDIA DGX Spark](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [Inferência no D-Robotics RDK S100](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
