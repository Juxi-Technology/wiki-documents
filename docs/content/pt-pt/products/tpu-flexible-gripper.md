---
title: Garra Flexível TPU SO-ARM101
category: robot
description: Garra flexível TPU SO-ARM101 da Juxi Technology — TPU macio agarra com segurança itens irregulares/frágeis, compatível com câmara do braço, opções zoom 30FPS ou fixa 60FPS
keywords: [garra, tpu, flexível, so-arm101, preensão]
---

# Garra Flexível TPU SO-ARM101

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-tpu-flexible-gripper)**

## Visão Geral

Projetada para braços robóticos XLerobot, esta garra flexível TPU SO-ARM101 suporta a montagem do kit/suporte de câmara do braço SO-ARM101. O material **TPU macio** agarra com segurança itens irregulares e frágeis sem danificá-los; configurações de câmara opcionais (zoom 30FPS / fixa 60FPS) atendem ao desenvolvimento de preensão e aplicações guiadas por visão.

**Principais recursos**:

- Instalação direta em braços XLerobot, sem necessidade de modificações
- TPU macio: flexível, resistente ao desgaste, antiderrapante — seguro para itens frágeis
- Compatível com o kit/suporte de câmara do braço SO-ARM101 (preensão guiada por visão)
- Montagem direta por parafusos, plug and play

---

## Especificações

| Categoria | Especificação |
|----------|------|
| Braços Compatíveis | SO-ARM101 (série XLerobot) |
| Material | TPU macio (poliuretano termoplástico) |
| Acionamento | Acionado por servo |
| Opções de Câmara | Zoom 30FPS / Fixa 60FPS |
| Montagem | Direta por parafusos, plug and play |

## Conteúdo do Kit

| Kit | Conteúdo |
|-----|----------|
| **Garra Base** | 1× garra flexível TPU |
| **Kit com Câmara Zoom** | Garra + câmara zoom 30FPS |
| **Kit com Câmara Fixa** | Garra + câmara fixa 60FPS |

---

## Início Rápido

1. Alinhe os furos de parafuso da garra com o efetuador do braço
2. Aparafuse diretamente (sem alterar fiação)
3. Adicione o suporte de câmara do braço para tarefas guiadas por visão

### Preensão por Visão com LeRobot

```bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```

---

## FAQ

**P: Por que consegue agarrar itens irregulares/frágeis?**

**R:** O TPU flexível se adapta às formas do objeto com força uniforme, evitando danos.

**P: Como escolher a câmara?**

**R:**

- Zoom 30FPS: distância focal flexível para visão de distância variável
- Fixa 60FPS: alta taxa de quadros para captura de movimento rápido

**P: Quais plataformas?**

**R:** Braços SO-ARM101 / XLerobot, compatíveis com os frameworks LeRobot ACT, Smolvla, Pi0.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
