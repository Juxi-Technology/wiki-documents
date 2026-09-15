---
title: "Introdução à Inteligência Incorporada (LeRobot)"
description: Introdução à IA incorporada — framework LeRobot, recolha/treino/avaliação do SO-ARM101, seleção de ACT/Diffusion/SmolVLA
keywords: [lerobot, ia incorporada, aprendizagem por imitação, act, so-arm101]
---

# Introdução à Inteligência Incorporada (LeRobot)

> Para desenvolvedores a fazer robot learning pela primeira vez. Usando HuggingFace LeRobot + SO-ARM101 da Juxi Technology como exemplo: pipeline completo de **recolher → treinar → avaliar**.

## 1. O que é IA Incorporada?

IA incorporada permite que agentes interajam com o mundo físico por meio de sensores corporais. O aprendizagem por imitação é um caminho central: demonstrações por teleoperação humana → recolha de dados → treino de políticas → o robô reproduz as ações.

**Por que importa**: a programação tradicional não cobre manipulações complexas (aparafusar, dobrar roupas), mas o aprendizagem por imitação só precisa de "demonstrar + treinar".

## 2. Configuração de Hardware

| Componente | Recomendado | Observações |
|-----------|-------------|-------|
| Braço robótico | SO-ARM101 (líder + seguidor) | Teleoperação de braço duplo, 6 DOF |
| Computação | Jetson Orin NX Super / host 4090 | Treine em computação potente, infira no Jetson |
| Visão | RealSense / câmara USB | Captura do ambiente durante a teleoperação |

- [Tutorial SO-ARM101](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson Orin NX Super Dev Kit](/pt-pt/products/jetson-orin-nx-super-kit)

## 3. Configuração do Ambiente

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM uses feetech servos

# Jetson users: verify PyTorch first
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. Coleta de Dados (Teleoperação)

```bash
# Calibrate (first time)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm

# Record data
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**Dicas de recolha**:

- ≥50 episódios por tarefa, varie posições/técnicas
- Mantenha as câmaras fixas e os objetos visíveis
- Estilo de demonstração consistente (mesmo demonstrador)

## 5. Treinamento

```bash
# ACT policy (beginner-friendly)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**Seleção de políticas**:

| Política | Pontos Fortes | Ideal Para |
|--------|-----------|----------|
| **ACT** | Estável, eficiente em dados | Ponto de entrada, manipulação fina |
| **Diffusion** | Ações multimodais robustas | Tarefas precisas de alta frequência |
| **Pi0 / GR00T** | Forte generalização | Multi-tarefa, multi-objeto |

## 6. Avaliação

```bash
# Replay dataset (data quality check)
lerobot-dataset-viz --repo-id juxi/pick_cube

# Evaluate policy
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| Métrica | Descrição |
|--------|-------------|
| Taxa de sucesso | Proporção de tarefas concluídas |
| Suavidade da trajetória | Nível de tremor |
| Generalização | Funciona com objetos/posições diferentes? |

## 7. FAQ

**P: Treinamento lento?**

**R:** Tamanho dos dados, passos e computação crescem juntos; comece com 50 episódios / 100k passos para validar o pipeline.

**P: A política só faz uma ação?**

**R:** Treinamento de tarefa única precisa de datasets multi-tarefa; os modelos base GR00T/Pi0 podem ser ajustados com poucos dados para multi-tarefa.

**P: Ações instáveis após o treino?**

**R:** Verifique a qualidade dos dados (demonstrações estáveis), adicione suavização, reduza a frequência de controle.

**P: Sem memória?**

**R:** Reduza o batch_size, diminua a resolução da imagem, use o modelo Jetson de 16GB.

---

## Links Relacionados

- [Guia de Seleção de Braços Robóticos](/pt-pt/tutorials/robot-arms/select-guide)
- [Introdução à Implantação de IA de Borda](/pt-pt/topics/edge-ai-intro)
- [Garra Flexível TPU SO-ARM101](/pt-pt/products/tpu-flexible-gripper)
- [Kit de Visão Robótica SO-ARM101](/pt-pt/products/robot-vision-kit)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
