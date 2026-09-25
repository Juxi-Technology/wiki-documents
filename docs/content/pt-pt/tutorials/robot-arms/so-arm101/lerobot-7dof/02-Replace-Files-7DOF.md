---
title: "Etapa 2: Substituir ficheiros (adaptação a 7DOF)"
description: "Que ficheiros substituir ou alterar para converter um clone oficial do lerobot na versão de 7 eixos, e as duas alterações manuais se as versões diferirem."
---

# Etapa 2: Substituir ficheiros (adaptação a 7DOF)

## 1\. Se clonou o repositório de código oficial, que ficheiros é necessário substituir/alterar

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: substituir manualmente após o git clone do lerobot oficial

Copie deste repositório por cima dos **3 ficheiros** do clone oficial:

|Ficheiro deste repositório (origem)|Substituir em (destino)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|Ficheiro com o mesmo nome no clone oficial|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|Ficheiro com o mesmo nome no clone oficial|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Requisito: o seu clone oficial tem de ter uma estrutura idêntica à linha de base deste repositório (versão do lerobot de 2026\-09).
> 
> Se a diferença de versões for grande, **não substitua o ficheiro inteiro**; faça apenas as duas alterações manuais indicadas abaixo.
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

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) apenas embrulham o braço único numa camada com os prefixos `left_`/`right_`, **sem definições de motores**. Desde que **os ficheiros do braço único acima** estejam alterados, os comandos de braço duplo (`--robot.type=bi_so_follower`) passam automaticamente a 7\-DOF.

