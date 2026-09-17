---
title: Kit de Visão Robótica SO-ARM101
category: robot
description: "Kit de visão SO-ARM101: suportes de pulso, lateral e superior, câmera fixa 60FPS ou zoom com foco automático 30FPS, compatível com ACT, Smolvla, Pi0 e GR00T."
keywords: [suporte de câmera, kit de visão, so-arm101, visão robótica]
---

# Kit de Visão Robótica SO-ARM101

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-wrist-camera-mount)**

## Visão Geral

Um acessório de câmera dedicado para braços robóticos com duas opções de câmera: **fixa 60FPS** e **zoom com foco automático 30FPS**. Suporta as plataformas SO-ARM101, LeKiwi e XLerobot, compatível com os frameworks de treinamento de IA incorporada **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5**.

**Principais recursos**:

- Três posições de montagem: **pulso / lateral / superior**
- Câmera dupla: fixa 60FPS (captura de movimento rápido) / zoom com foco automático 30FPS (visão flexível)
- Encaixe perfeito com o SO-ARM101, sem modificações
- Almofadas de aderência antideslizantes inclusas

---

## Especificações

| Categoria | Especificação |
|----------|------|
| Plataformas Compatíveis | SO-ARM101, LeKiwi, XLerobot, plataformas com furo M3 |
| Posições de Montagem | Pulso / Lateral / Superior |
| Opções de Câmera | Fixa 60FPS / zoom com foco automático 30FPS |
| Compatibilidade de Frameworks | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## Comparação de Câmeras

| Câmera | Caso de Uso |
|--------|----------|
| **Fixa 60FPS** | Alta taxa de quadros, imagem estável, captura de movimento rápido |
| **Zoom com foco automático 30FPS** | Distância focal flexível, visão de distância variável |

---

## Início Rápido

### 1. Escolha a Posição de Montagem

- **Pulso**: ponto de vista da preensão (recomendado para manipulação)
- **Lateral**: visão global do ambiente
- **Superior**: de cima para baixo para coleta de dados

### 2. Instalação

Monte a câmera no suporte, conecte via USB ao host (Jetson/Raspberry Pi).

### 3. Integração com Frameworks

```bash
# Find camera
python -m lerobot.find_cameras

# Record with vision
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```

---

## FAQ

**P: Qual câmera escolher?**

**R:** Fixa 60FPS para captura de movimento rápido (ex.: preensão); zoom com foco automático 30FPS para visão de distância variável.

**P: Quais frameworks de treinamento?**

**R:** ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 — cobertura completa dos frameworks de IA incorporada mainstream.

**P: E outros braços?**

**R:** SO-ARM101, LeKiwi, XLerobot e outras plataformas compatíveis com furo M3.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
