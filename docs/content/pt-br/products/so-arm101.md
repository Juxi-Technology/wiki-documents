---
title: Kit de Desenvolvimento SO-ARM101
category: robot
description: "Kit de desenvolvimento SO-ARM101 da Juxi Technology: braço duplo 6-DOF open source no ecossistema LeRobot, para teleoperação e aprendizado por imitação."
keywords: [so-arm101, braço robótico, leRobot, teleoperação, braço duplo]
---

# Kit de Desenvolvimento SO-ARM101

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

## Visão Geral

O SO-ARM101 é o kit de desenvolvimento robótico de braço duplo 6-DOF open source da Juxi Technology, profundamente integrado ao ecossistema **LeRobot**. Braço líder preto + braço seguidor branco, pronto para teleoperação, coleta de dados de aprendizado por imitação e treinamento de políticas.

**Principais recursos**:

- Braços duplos, 6 DOF cada, acionados por servos de barramento
- Integração profunda com LeRobot (HuggingFace) — políticas ACT/Diffusion/Pi0
- Suporte a Jetson / PC (Linux)
- Hardware totalmente open source (esquemáticos/CAD/firmware)

## Especificações

| Categoria | Especificação |
|----------|------|
| Tipo | Robô de teleoperação de braço duplo |
| DOF | 6 DOF por braço |
| Acionamento | Servos de barramento Feetech |
| Host | PC (Linux) / Jetson |
| Ecossistema | LeRobot, ROS 2, ROS 1 |
| Alimentação | Líder 5V6A / Seguidor 12V5A |
| Carga útil | 500g |
| Repetibilidade | ±0,1mm |
| Raio de trabalho | 520mm |
| Comunicação | USB-C |

## Início Rápido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutoriais

- [Tutorial SO-ARM101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montagem SO-ARM101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guia de Seleção de Braços Robóticos](/pt-br/tutorials/robot-arms/select-guide)
- [Introdução à IA Incorporada (LeRobot)](/pt-br/topics/embodied-ai-intro)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
