---
title: "Etapa 2: Substituir arquivos (adaptação para 7DOF)"
description: "Quais arquivos do clone oficial do lerobot substituir para a versão 7DOF (Opção A: código pronto; Opção B: manual) e os dois ajustes se as versões diferirem."
---

# Etapa 2: Substituir arquivos (adaptação para 7DOF)

## 1\. Se você clonou o repositório de código oficial, quais arquivos precisam ser substituídos/modificados

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: substituir manualmente após o git clone do lerobot oficial

Copie deste repositório sobre os **3 arquivos** do clone oficial:

|Arquivo deste repositório (origem)|Substitui (destino)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|Arquivo de mesmo nome no clone oficial|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|Arquivo de mesmo nome no clone oficial|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Pré-requisito: o seu clone oficial tem a mesma estrutura da base deste repositório (versão lerobot 2026\-09).
> 
> Se a diferença de versão for grande, **não sobrescreva o arquivo inteiro**; faça apenas as duas alterações manuais descritas abaixo.
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

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) apenas encapsulam o braço único adicionando os prefixos `left_`/`right_`, **sem conter definição de motores**. Basta corrigir **os arquivos de braço único acima** para que os comandos de dois braços (`--robot.type=bi_so_follower`) já sejam 7\-DOF automaticamente.

