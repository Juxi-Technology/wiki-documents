---
title: "Tutorial do braço robótico SO-ARM101 de 7 eixos"
description: "Antes do curso de 7 eixos: confirme a correspondência entre servos e articulações, o que muda face ao braço de 6 servos e como substituir os ficheiros."
---

# Tutorial do braço robótico SO\-ARM101 de 7 eixos

# SO\-ARM101 7\-DOF · Preparação antes da utilização

> Este documento destina-se a quem converteu o **SO\-ARM101 de 6 servos para 7 servos** e quer percorrer o fluxo completo no LeRobot (calibração → gravação → treino → implantação).
> Código correspondente: este repositório (`lerobot-7dof`), um fork do lerobot oficial que apenas altera as configurações dos motores do SO.
> 
> 

---

## 0\. Confirme primeiro o seu braço robótico

7 servos (todos STS3215), correspondência entre o ID do servo e a articulação:

|**ID do servo**|**Nome da articulação**|**Descrição**|
|---|---|---|
|1|`shoulder_pan`|Rotação horizontal do ombro|
|2|`shoulder_lift`|Elevação do ombro|
|3|`elbow_flex`|Flexão do cotovelo|
|4|`wrist_flex`|Inclinação do pulso (flexão para cima/baixo)|
|5|`wrist_yaw`|Desvio do pulso (rotação esquerda/direita de cerca de 90°) · **o servo novo desta modificação** (inserido entre os antigos n.º 4 e n.º 5)|
|6|`wrist_roll`|Rotação do pulso · o antigo motor de rotação n.º 5, ID 5→6, peça impressa não alterada, nome inalterado|
|7|`gripper`|Garra · era ID=6 e passou a 7 depois da alteração|

Ordem dos dados das articulações (ordem das dimensões das articulações em `action` / `observation.state` nos Parquet gravados):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Atenção: **os dados, os ficheiros de calibração e os modelos já treinados da versão de 6 servos são incompatíveis com este repositório**; é obrigatório refazer tudo de acordo com as instruções abaixo.

---

## 1\. Se clonou o repositório de código oficial, que ficheiros é necessário substituir/alterar

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: substituir manualmente após o git clone do lerobot oficial

Copie deste repositório por cima dos **3 ficheiros** do clone oficial:

|Ficheiro deste repositório (origem)|Substituir em (destino)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|Ficheiro com o mesmo nome no clone oficial|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|Ficheiro com o mesmo nome no clone oficial|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|Ficheiro com o mesmo nome no clone oficial (**apenas correção de comentários**, não afeta a funcionalidade, pode não substituir)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <clone_oficial>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clone_oficial>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Requisito: o seu clone oficial tem de ter uma estrutura idêntica à linha de base deste repositório (versão do lerobot de 2026\-08). Se a diferença de versões for grande, **não substitua o ficheiro inteiro**; faça apenas as duas alterações manuais indicadas abaixo.
> 
> 

### Alterações manuais quando as versões não coincidem (apenas dois pontos)

**① Dicionário de motores** (um em `so_follower.py` e outro em `so_leader.py`, com o mesmo conteúdo) — altere o original

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

para

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # servo novo, rotação esquerda/direita
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # antigo motor de rotação n.º 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Lógica de calibração** (o `calibrate()` de cada um dos dois ficheiros) — remova o caso especial da «articulação de volta completa»: substitua

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

por uma única linha, passando a registar o intervalo real de todas as articulações:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Porquê: a versão original tratava o `wrist_roll` (rotação em torno do eixo do antebraço) como uma articulação capaz de dar uma volta completa (0\~4095), com o intervalo completo fixado no código. Após a modificação 7\-DOF, as articulações do pulso n.º 5/6 (yaw / roll) **têm ambas limites mecânicos e não dão a volta completa**; fixar a volta completa faz com que o código envie comandos de articulação para ângulos que a mecânica não alcança, com risco de danos. Agora, na calibração, regista-se manualmente o min/max real de cada motor.
> 
> 

### Nota sobre o braço duplo

`bi_so_follower / bi_so_leader (src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/) apenas embrulham o braço único numa camada com os prefixos left_/right_,`**`sem definições de motores`**`. Desde que `**`os ficheiros do braço único acima`**` estejam alterados, os comandos de braço duplo (--robot.type=bi_so_follower) passam automaticamente a 7-DOF.`

## 1. Ambiente LeRobot

- [Computador Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Computador Windows](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Computador Mac](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Etapa 2: Substituir ficheiros (adaptação a 7DOF)

- [Etapa 2: Substituir ficheiros (adaptação a 7DOF)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Portas série

- [Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Computador Windows](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Computador Mac](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Calibração

- [Computador Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Computador Windows](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Computador Mac](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Teleoperação

- [Computador Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Computador Windows](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Computador Mac](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Teleop. c/ câmara

- [Computador Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Computador Windows](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Computador Mac](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Recolha de dados

- [Rever e reproduzir o conjunto de dados](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Notas sobre a recolha de conjuntos de dados](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Registar uma conta Hugging Face (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Carregar dados para o HuggingFace (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Recolha de conjuntos de dados por ensino-Aperto de mão 200](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Recolha de conjuntos de dados por ensino](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Treino de modelos

- [Ambiente de treino em GPU na nuvem](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Comando de treino-ACT (recomendado para começar)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Comando de treino-Diffusion](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Comando de treino-pi0.5](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Comando de treino-pi0 (melhor desempenho)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Comando de treino-pi0fast](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Comando de treino-smolvla (recomendado para avançados)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Enviar o modelo para o HuggingFace (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Algoritmos de aprendizagem por imitação suportados pelo LeRobot](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Treino local em Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Obter o ficheiro de pesos do modelo](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Sugestões de parâmetros de treino](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [Visualizar as curvas de treino em tempo real com o wandb](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Implantação

- [Descrição da linha de comando](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Comando de inferência-ACT](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Comando de inferência-Diffusion](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Comando de inferência-pi0.5](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Comando de inferência-pi0](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Comando de inferência-smolvla](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Bugs comuns e soluções](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [Inferência no NVIDIA DGX Spark](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [Inferência no D-Robotics RDK S100](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
