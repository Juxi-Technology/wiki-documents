---
title: "Tutorial completo SO-ARM101 × MuJoCo (índice)"
---

# Tutorial completo SO-ARM101 × MuJoCo (índice)


> Este tutorial documenta e reproduz o **fluxo de trabalho completo de simulação + robô real** do SO-ARM101: da preparação do ambiente e verificação do modelo à calibração no robô real,
> passando pela teleoperação por teclado/braço líder e pela gravação e reprodução de dados. Todos os comandos foram validados em sessões de robô real + simulação em 2026-10-15.
>
> Público-alvo: usuários do kit Juxi SO-ARM101 e engenheiros internos. Não é necessário conhecimento prévio de MuJoCo ou LeRobot.

## Mapa do fluxo completo (duas trilhas, um conjunto compartilhado de componentes)

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| Cap. | Conteúdo | O que você obtém |
| --- | --- | --- |
| [01 Preparação do ambiente](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | Ambiente uv, extras de dependências, observações para Windows | Um ambiente executável |
| [02 Verificação do modelo de simulação](/pt-br/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | Carregamento/comparação/renderização de acionamento dos três modelos MJCF | Confiança no modelo e no comportamento da simulação |
| [03 Conexão com o robô real e calibração](/pt-br/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | Identificação da porta serial, verificação inicial somente leitura, calibração do braço seguidor/líder | Dois braços reconhecidos pelo software |
| [04 Teleoperação por teclado](/pt-br/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | Controle do robô real/simulação pelo teclado, ajuste de taxa, limitação segura de velocidade | A forma mais rápida de controle manual |
| [05 Gêmeo digital do braço líder](/pt-br/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | Braço líder físico acionando o braço seguidor simulado, ajuste fino do ponto zero | Demonstração de gêmeo digital e coleta de dados |
| [06 Gravação e reprodução de dados](/pt-br/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | Gravar no robô real/gravar na simulação/controle de episódios/reprodução/script de inspeção | Um conjunto de dados treinável |
| [07 Perguntas frequentes e experiências](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | Todas as armadilhas enfrentadas neste fluxo e suas soluções | Manual de solução de problemas |
| [08 Roteiro futuro](/pt-br/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | Câmeras, cenas com objetos, geração automática de dados, treinamento | Planos para os próximos passos |
| [09 Tutorial de uso completo](/pt-br/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | Iniciar o braço → gravar → inspecionar → assistir aos vídeos → treinar → implantar na simulação, tudo em um só fluxo; inclui alternativa com ambiente conda | Do zero a um conjunto de dados qualificado, e depois à política em ação |

**Ordem sugerida para o primeiro uso**: 01 (ambiente) → 03 (necessário apenas ao conectar o robô real) → siga a linha principal do [09 Tutorial de uso completo](/pt-br/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
(gravação → inspeção → assistir aos vídeos → treinamento → implantação); 02 e 04–08 são manuais de referência, consulte conforme necessário.
Todos os comandos do 09 podem ser copiados e executados diretamente, sem voltar a outros capítulos no meio do caminho para instalar dependências.

## Três convenções que você precisa lembrar

1. **Sistema de unidades** (alinhamento entre as três partes): as cinco juntas do corpo usam **de −100 a 100** (proporção do curso, 0 = meio do curso), e a garra usa
   **de 0 a 100** (0 = fechada). O robô real (`use_degrees=false`), a simulação e o braço líder seguem todos essa convenção; os conjuntos de dados gravados têm a mesma estrutura dos
   conjuntos de dados reais oficiais, como `lerobot/svla_so101_pickplace` (vetor de 6 dimensões + nomes das juntas).
2. **Correspondência de papéis**: o objeto controlado (robô real ou simulação) sempre usa `--robot.*`; o dispositivo de controle (teclado/braço líder) sempre usa `--teleop.*`.
3. **Prefixo de comando nesta máquina**: nesta máquina de desenvolvimento, todos os comandos `uv` exigem que o diretório de cache seja definido antes (motivo em [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)):

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## Ambiente testado

| Item | Versão |
| --- | --- |
| Sistema | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2 (este repositório, isolado no `.venv` do projeto, sem afetar o conda) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0 (versão CPU) |
| Hardware | SO-ARM101 braço líder (COM124) + seguidor (COM172), chip serial CH343 |

<RelatedProducts slugs="so-arm101" />
