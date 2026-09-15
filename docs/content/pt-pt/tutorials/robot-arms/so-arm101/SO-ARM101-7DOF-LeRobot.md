---
title: Tutorial de modificação do SO-ARM101 para 7-DOF e utilização com o LeRobot
description: "Converta o SO-ARM101 para 7 graus de liberdade: IDs dos servos, alterações de código, calibração e utilização com o LeRobot."
---

# Tutorial de modificação do SO-ARM101 para 7-DOF e utilização com o LeRobot

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

Este tutorial destina-se a quem converteu o **SO-ARM101 de 6 servos para 7 servos** e quer percorrer o fluxo completo no LeRobot (calibração → recolha → treino → implantação). O código da versão modificada foi copiado e adaptado a partir do código-fonte oficial do LeRobot, compatível com o **braço robótico SO-ARM101 de 7 graus de liberdade** (7 servos STS3215).

**Principais diferenças em relação ao SO-101 oficial (6 servos):**

| ID do servo | Nome da articulação | SO-101 oficial (6-DOF) | Descrição |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Rotação horizontal do ombro |
| 2 | `shoulder_lift` | shoulder_lift | Elevação do ombro |
| 3 | `elbow_flex` | elbow_flex | Flexão do cotovelo |
| 4 | `wrist_flex` | wrist_flex | Inclinação do pulso (flexão para cima/baixo) |
| 5 | `wrist_yaw` | — (novo) | Desvio do pulso (rotação esquerda/direita de cerca de 90°), **o servo novo desta modificação** (inserido entre os antigos n.º 4 e n.º 5) |
| 6 | `wrist_roll` | wrist_roll (ID 5→6) | Rotação do pulso; era o antigo motor de rotação n.º 5, cuja peça impressa não foi alterada e mantém o nome |
| 7 | `gripper` | gripper (ID 6→7) | Garra; era ID=6 e passou a 7 com a alteração |

> ⚠️ Atenção: **os dados, os ficheiros de calibração e os modelos já treinados da versão de 6 servos são incompatíveis com a modificação 7-DOF**; é obrigatório refazer tudo de acordo com este tutorial.

## Ordem dos dados das articulações

Nos Parquet gravados, a ordem das dimensões das articulações em `action` / `observation.state` é:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Alterações na montagem mecânica

Insira o novo servo `wrist_yaw` e uma peça impressa entre o antigo n.º 4 (`wrist_flex`) e o n.º 5 (`wrist_roll`); os motores seguintes recuam uma posição: o antigo motor de rotação n.º 5 → posição 6, a garra → posição 7 (as peças impressas destes dois motores antigos não foram alteradas).

## Alterações no código principal

1. **Definição dos motores passa a 7**: novo `wrist_yaw(5)` (rotação esquerda/direita); o motor `wrist_roll` passa para **ID 6** (continua a ser rotação, nome inalterado); a garra `gripper(6)` → `gripper(7)`. A garra continua a usar `RANGE_0_100` (abertura 0~100), as restantes articulações usam `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **A calibração já não define «articulação de volta completa»**: o código original fixava `wrist_roll` como articulação de volta completa (0~4095); após a modificação 7-DOF, o yaw/roll do pulso têm ambos limites mecânicos e não dão a volta completa, pelo que a calibração passou a usar `record_ranges_of_motion()` para registar o intervalo real de movimento de **todas** as articulações.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Utilizar o repositório modificado ou substituir ficheiros manualmente

Se clonou o repositório de código oficial, é necessário substituir/modificar os seguintes ficheiros.

### Opção A: usar diretamente o repositório modificado (recomendado)

Use diretamente o repositório de código já adaptado para 7-DOF, sem necessidade de qualquer alteração manual.

### Opção B: substituir manualmente após o git clone do lerobot oficial

Copie do repositório modificado por cima dos **3 ficheiros** do clone oficial:

| Ficheiro do repositório modificado (origem) | Substituir em (destino) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | Ficheiro com o mesmo nome no clone oficial |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | Ficheiro com o mesmo nome no clone oficial |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | Ficheiro com o mesmo nome no clone oficial (**apenas correção de comentários**, não afeta a funcionalidade, pode não substituir) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <clone_oficial>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clone_oficial>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Requisito: o seu clone oficial tem de ter uma estrutura idêntica à linha de base do repositório modificado (versão do lerobot de 2026-08). Se a diferença de versões for grande, **não substitua o ficheiro inteiro**; faça apenas as duas alterações manuais indicadas abaixo.

### Alterações manuais quando as versões não coincidem (apenas dois pontos)

**① Dicionário de motores** (um em `so_follower.py` e outro em `so_leader.py`, com o mesmo conteúdo) — altere o original

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

para

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # servo novo, rotação esquerda/direita
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # antigo motor de rotação n.º 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Lógica de calibração** (o `calibrate()` de cada um dos dois ficheiros) — remova o caso especial da «articulação de volta completa» e substitua

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

por uma única linha, passando a registar o intervalo real de todas as articulações:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

O motivo e os riscos da alteração estão na secção seguinte, «Cuidados na calibração».

## Cuidados na calibração

- **Já não existe «articulação de volta completa»**: o código oficial original tratava `wrist_roll` (rotação em torno do eixo do antebraço) como uma articulação capaz de dar uma volta completa (0~4095), com o intervalo completo fixado no código. Após a modificação 7-DOF, as articulações do pulso n.º 5/6 (`wrist_yaw` / `wrist_roll`) têm ambas limites mecânicos e não dão a volta completa.
- **Nota de risco**: se mantiver o intervalo completo fixado do código oficial, o código envia comandos de articulação para ângulos que a mecânica não alcança, com risco de danos; por isso, na calibração passou a registar-se manualmente o min/max real de cada motor (correspondente à alteração ② acima).
- **Os ficheiros de calibração da versão de 6 servos são incompatíveis com o 7-DOF**; após a modificação é obrigatório recalibrar.
- O fluxo de calibração e utilização do braço duplo (dois braços seguidores) está em [Tutorial do braço duplo SO-ARM101 (dois braços seguidores)](./SO-ARM101-Bi-Arm-Tutorial.md).

## Nota sobre o braço duplo (bi_so_follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) apenas embrulham o braço único numa camada com prefixos `left_`/`right_`, **sem definições de motores próprias**. Desde que os ficheiros do braço único acima estejam alterados, os comandos de braço duplo (`--robot.type=bi_so_follower`) passam automaticamente a 7-DOF. O fluxo completo do braço duplo (calibração, teleoperação, recolha de datasets, treino, implantação) está em [Tutorial do braço duplo SO-ARM101 (dois braços seguidores)](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
