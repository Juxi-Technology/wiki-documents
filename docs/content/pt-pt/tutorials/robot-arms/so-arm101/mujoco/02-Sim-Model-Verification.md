---
title: "02 · Verificação do modelo de simulação (carregamento e acionamento MJCF)"
description: "Os três modelos MJCF públicos do SO-ARM101 foram todos validados como utilizáveis neste projeto:"
---

# 02 · Verificação do modelo de simulação (carregamento e acionamento MJCF)

> Pré-requisito: concluir [01 Preparação do ambiente](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/01-Environment). Este capítulo é inteiramente de verificação em simulação; não é necessário ligar hardware.

## Origem dos modelos

Os três modelos MJCF públicos do SO-ARM101 foram todos validados como utilizáveis neste projeto:

| Abreviatura | Ficheiro | Origem |
| --- | --- | --- |
| Oficial - nova calibração | `SO101/so101_new_calib.xml` | Repositório oficial TheRobotStudio/SO-ARM100 (a verificação comparativa deste tutorial foi feita a partir daí; este repositório não inclui o zip original) |
| Oficial - calibração antiga | `SO101/so101_old_calib.xml` | Mesmo repositório (não está no zip, é necessário transferir) |
| Pacote de descrição ROS2 | `so_arm101_description/mjcf/so_arm101.xml` | Anexo do tutorial deste repositório `SO-ARM101_ROS2.zip` |

Nota: o processo de extração do zip era fornecido pela versão inicial de `so101_assets.py` e mantém-se disponível para consulta; desde 2026-10-16, o robô simulado foi migrado para o
**modelo SO-ARM100 do mujoco_menagerie** (vendored em `assets/menagerie_so_arm100/`; razões e pontos essenciais da migração nas notas de conceção em [07](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Verificação de acionamento e renderização

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| Parâmetro | Descrição |
| --- | --- |
| `--model` | Caminho do modelo MJCF. O que o repositório inclui e pode ser executado diretamente é `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (para reverificar os três modelos históricos da tabela acima, obtenha-os primeiro no repositório correspondente da coluna «Origem» e substitua o caminho) |
| `--out-dir` | Diretório de artefactos: o vídeo de verificação, as imagens estáticas e o txt com o resumo estrutural são todos escritos aqui (predefinição `out`) |
| `--tag` | Prefixo dos nomes dos ficheiros de artefactos; por omissão usa o nome do ficheiro do modelo |
| `--settle` / `--fps` / `--width` / `--height` | Duração de estabilização de cada pose (segundos), taxa de frames do vídeo, resolução de renderização; predefinições 25 fps, 960×720, normalmente não é preciso alterar |

O script produz um resumo estrutural (articulações/atuadores/ganhos/intervalos) e renderiza um vídeo de verificação «varrimento sequencial das seis articulações + senoide coordenada» e imagens estáticas.
Há exemplos de resumos estruturais em `reports/` (fornecidos com o repositório); os vídeos de referência (`media/`) são volumosos e não são distribuídos com o repositório — podem ser regenerados a qualquer momento com o comando acima.

## Principais diferenças entre os três modelos (medidas)

| Item | Oficial - nova calibração | Oficial - calibração antiga | Pacote de descrição ROS2 |
| --- | --- | --- | --- |
| Semântica do zero | **ponto médio do curso** da articulação | posição de **extensão total** horizontal | ponto médio do curso |
| Nome da articulação | `shoulder_pan` | idem | `shoulder_pan_joint` (sufixo) |
| Ganho de posição | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Unidades da pinça | hinge em radianos | hinge em radianos | **normalizado 0–1** |
| Exclusão de autocolisão | não | não | sim (6 pares) |

**Erro de seguimento medido**: a nova calibração e o pacote de descrição mantêm um erro de 0,0005 rad em repouso; a calibração antiga, 0,03 rad (queda de cerca de 1,7°, kp 56 vezes mais fraco).
Ao avaliar a mesma política em simulação, mudar de modelo produz dinâmicas diferentes; registe qual deles foi usado.

## Comportamentos do modelo a memorizar

1. **A direção positiva de `shoulder_lift` aponta para baixo**: no binário de acionamento, o «movimento descendente» usa ângulos positivos; verifique o sinal antes de fazer mapeamentos de teleoperação ou conversões de dados.
2. **Tocar no chão bloqueia**: no limite do movimento descendente, a ponta do efetuador toca no solo e é travada (o script inclui uma proteção de 8 cm acima do solo que recorta automaticamente a amplitude).
3. O modelo oficial não tem câmara nem keyframe; existe a variante com câmara `so101_new_calib_camera.xml`, que poderá ser usada mais tarde para gravar dados visuais.

<RelatedProducts slugs="so-arm101" />
