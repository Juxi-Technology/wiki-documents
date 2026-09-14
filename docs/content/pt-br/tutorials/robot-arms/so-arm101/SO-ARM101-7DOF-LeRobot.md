---
title: Tutorial de conversão do SO-ARM101 para 7-DOF e uso com LeRobot
description: "Após converter o SO-ARM101 de 6 servos para 7 graus de liberdade (novo wrist_yaw): correspondência dos IDs dos servos, alterações e substituições no código, cuidados com a calibração e como usar no LeRobot."
---

# Tutorial de conversão do SO-ARM101 para 7-DOF e uso com LeRobot

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

Este tutorial é destinado a quem **converteu o SO-ARM101 de 6 servos para 7 servos** e deseja executar o fluxo completo no LeRobot (calibração → gravação → treinamento → implantação). O código da versão convertida é baseado no código-fonte oficial do LeRobot, copiado e adaptado para o **braço robótico SO-ARM101 de 7 graus de liberdade** (7 servos STS3215).

**Principais diferenças em relação ao SO-101 oficial (6 servos):**

| ID do servo | Nome da articulação | SO-101 oficial (6-DOF) | Descrição |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Rotação horizontal do ombro |
| 2 | `shoulder_lift` | shoulder_lift | Elevação do ombro |
| 3 | `elbow_flex` | elbow_flex | Flexão do cotovelo |
| 4 | `wrist_flex` | wrist_flex | Inclinação do punho (flexão para cima/baixo) |
| 5 | `wrist_yaw` | —(novo) | Guinada do punho (rotação esquerda/direita de cerca de 90°), **servo adicionado nesta conversão** (inserido entre os antigos nº 4 e nº 5) |
| 6 | `wrist_roll` | wrist_roll (ID 5→6) | Rolagem do punho, antigo motor de rolagem nº 5, peça impressa inalterada e nome mantido |
| 7 | `gripper` | gripper (ID 6→7) | Garra, ID original = 6, renumerado para 7 após a alteração |

> ⚠️ Atenção: **os dados, arquivos de calibração e modelos já treinados da versão de 6 servos são incompatíveis com a conversão para 7-DOF**; é necessário refazer tudo seguindo este tutorial.

## Ordem dos dados das articulações

Após a gravação, a ordem das dimensões das articulações em `action` / `observation.state` no Parquet é:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Mudanças na montagem mecânica

Insira o novo servo `wrist_yaw` e uma peça impressa entre os antigos nº 4 (`wrist_flex`) e nº 5 (`wrist_roll`); os motores seguintes deslocam-se uma posição: o antigo motor de rolagem nº 5 → posição 6, e a garra → posição 7 (as peças impressas desses dois motores antigos não mudam).

## Principais alterações no código

1. **Definição de motores alterada para 7**: novo `wrist_yaw(5)` (rotação esquerda/direita); o motor `wrist_roll` original passa para o **ID 6** (continua sendo rolagem, nome inalterado); garra `gripper(6)` → `gripper(7)`. A garra continua usando `RANGE_0_100` (abertura de 0~100) e as demais articulações usam `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **A calibração não define mais uma "articulação de volta completa"**: o código original fixava `wrist_roll` como articulação de volta completa (0~4095); após a conversão para 7-DOF, a guinada e a rolagem do punho têm limite mecânico e não dão volta completa, então a calibração passa a usar `record_ranges_of_motion()` para registrar a faixa real de movimento de **todas** as articulações.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Usar o repositório convertido ou substituir os arquivos manualmente

Se você clonou o repositório de código oficial, precisa substituir/modificar os arquivos a seguir.

### Opção A: usar diretamente o repositório convertido (recomendado)

Use diretamente o repositório de código já adaptado para 7-DOF, sem nenhuma modificação manual.

### Opção B: substituir manualmente após o git clone do lerobot oficial

Copie do repositório convertido sobre os **3 arquivos** do clone oficial:

| Arquivo do repositório convertido (origem) | Substitui (destino) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | Arquivo de mesmo nome no clone oficial |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | Arquivo de mesmo nome no clone oficial |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | Arquivo de mesmo nome no clone oficial (**apenas correção de comentário**, não afeta o funcionamento, pode não substituir) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <clone oficial>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <clone oficial>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Pré-requisito: o seu clone oficial deve ter a mesma estrutura da base do repositório convertido (versão lerobot 2026-08). Se a diferença de versão for grande, **não sobrescreva o arquivo inteiro**; faça apenas as duas alterações manuais descritas abaixo.

### Modificação manual quando as versões forem diferentes (apenas dois pontos)

**① Dicionário de motores** (um em `so_follower.py` e outro em `so_leader.py`, com o mesmo conteúdo) — troque o original

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

por

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # novo servo, rotação esquerda/direita
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # antigo motor de rolagem nº 5, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Lógica de calibração** (no `calibrate()` de cada arquivo) — remova o caso especial de "articulação de volta completa" e troque

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

por uma única linha, registrando a faixa real de todas as articulações:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

O motivo da alteração e os riscos estão na seção "Cuidados com a calibração" abaixo.

## Cuidados com a calibração

- **Não existe mais "articulação de volta completa"**: o código oficial original fixava `wrist_roll` (rolagem em torno do eixo do antebraço) como articulação capaz de girar em volta completa (0~4095), com a faixa total codificada. Após a conversão para 7-DOF, as articulações nº 5/6 do punho (`wrist_yaw` / `wrist_roll`) têm limite mecânico e não dão volta completa.
- **Aviso de risco**: se mantiver o valor fixo de volta completa do código oficial, o código enviará comandos de articulação para ângulos que a mecânica não alcança, com risco de danos; por isso, na calibração, cada motor passa a ter min/max reais registrados manualmente (corresponde à alteração ② acima).
- **Os arquivos de calibração da versão de 6 servos são incompatíveis com o 7-DOF**; após a conversão, é obrigatório recalibrar.
- O fluxo de calibração e uso com dois braços (dois seguidores) está em [Tutorial de dois braços (dois seguidores) do SO-ARM101](./SO-ARM101-Bi-Arm-Tutorial.md).

## Notas sobre dois braços (bi_so_follower)

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) apenas encapsulam o braço único adicionando os prefixos `left_`/`right_`, **sem conter definição de motores**. Basta corrigir os arquivos de braço único acima para que os comandos de dois braços (`--robot.type=bi_so_follower`) já sejam 7-DOF automaticamente. O fluxo completo de dois braços (calibração, teleoperação, gravação de dataset, treinamento, implantação) está em [Tutorial de dois braços (dois seguidores) do SO-ARM101](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
