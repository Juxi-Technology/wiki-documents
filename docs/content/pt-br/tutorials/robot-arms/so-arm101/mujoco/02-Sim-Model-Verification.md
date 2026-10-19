---
title: "02 · Verificação do modelo de simulação (carregamento e acionamento MJCF)"
description: "Os três modelos MJCF públicos do SO-ARM101 foram todos verificados e são utilizáveis neste projeto:"
---

# 02 · Verificação do modelo de simulação (carregamento e acionamento MJCF)

> Pré-requisito: concluir o [01 Preparação do ambiente](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment). Este capítulo é inteiramente de verificação em simulação; não é necessário conectar hardware.

## Origem dos modelos

Os três modelos MJCF públicos do SO-ARM101 foram todos verificados e são utilizáveis neste projeto:

| Abreviação | Arquivo | Origem |
| --- | --- | --- |
| Oficial - nova calibração | `SO101/so101_new_calib.xml` | Repositório oficial TheRobotStudio/SO-ARM100 (a verificação comparativa deste tutorial foi feita a partir dele; este repositório não inclui o zip original) |
| Oficial - calibração antiga | `SO101/so101_old_calib.xml` | Mesmo repositório (não está no zip; é preciso baixar) |
| Pacote de descrição ROS2 | `so_arm101_description/mjcf/so_arm101.xml` | Anexo do tutorial deste repositório `SO-ARM101_ROS2.zip` |

Nota: o fluxo de extração do zip era fornecido pela versão inicial de `so101_assets.py` e permanece disponível para consulta; desde 2026-10-16, o robô simulado foi migrado para
o **modelo SO-ARM100 do mujoco_menagerie** (vendored em `assets/menagerie_so_arm100/`; os motivos e pontos principais da migração estão nas notas de design do [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

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
| `--model` | Caminho do modelo MJCF. O que vem pronto no repositório e pode ser usado diretamente é `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (para reverificar os três modelos históricos da tabela acima, obtenha-os primeiro no repositório correspondente da coluna "Origem" e então troque o caminho) |
| `--out-dir` | Diretório de artefatos: o vídeo de verificação, os quadros estáticos e o txt de resumo estrutural são gravados aqui (padrão `out`) |
| `--tag` | Prefixo dos nomes dos arquivos de saída; por padrão, o nome do arquivo do modelo |
| `--settle` / `--fps` / `--width` / `--height` | Tempo de estabilização por pose (segundos), taxa de quadros do vídeo e resolução de renderização; padrão 25 fps, 960×720, geralmente não é preciso alterar |

O script gera um resumo estrutural (juntas/atuadores/ganhos/faixas), renderiza um vídeo de verificação com "varredura junta a junta das seis juntas + senoide coordenada" e quadros estáticos.
Um exemplo de resumo estrutural está em `reports/` (fornecido com o repositório); os vídeos de referência (`media/`) são grandes e não são distribuídos com o repositório — podem ser regenerados a qualquer momento com o comando acima.

## Principais diferenças entre os três modelos (medidas)

| Item | Oficial - nova calibração | Oficial - calibração antiga | Pacote de descrição ROS2 |
| --- | --- | --- | --- |
| Semântica do zero | junta no **meio do curso** | pose de **extensão total** horizontal | meio do curso |
| Nome da junta | `shoulder_pan` | O mesmo que à esquerda | `shoulder_pan_joint` (sufixo) |
| Ganho de posição | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Unidade da garra | radianos hinge | radianos hinge | **normalizada 0–1** |
| Exclusão de autocolisão | Nenhuma | Nenhuma | Sim (6 pares) |

**Erro de acompanhamento medido**: a nova calibração e o pacote de descrição têm erro de manutenção estática de 0,0005 rad; a calibração antiga, 0,03 rad (queda de cerca de 1,7°, kp 56 vezes mais fraco).
Ao avaliar a mesma política na simulação, trocar o modelo produz dinâmicas diferentes; anote qual deles foi usado.

## Comportamentos do modelo que é preciso lembrar

1. **A direção positiva de `shoulder_lift` aponta para baixo**: no torque de acionamento, o "balanço para baixo" usa ângulo positivo; verifique o sinal antes de fazer mapeamento de teleoperação ou conversão de dados.
2. **Tocar o chão bloqueia o movimento**: no limite do balanço para baixo, a ponta do dedo toca o solo e é bloqueada (o script tem uma proteção embutida de 8 cm acima do solo que reduz automaticamente a amplitude).
3. O modelo oficial não tem câmera nem keyframe; existe a variante com câmera `so101_new_calib_camera.xml`, que pode ser usada futuramente para gravar dados visuais.

<RelatedProducts slugs="so-arm101" />
