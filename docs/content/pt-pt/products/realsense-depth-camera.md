---
title: Câmara de Profundidade 3D RealSense
category: compute-vision
description: Câmara de profundidade 3D RealSense da Juxi Technology — modelos D435i/D405/D405CB, percepção de profundidade de alta precisão para XLeRobot e SO-ARM101
keywords: [realsense, câmara de profundidade, visão 3d, percepção de profundidade, visão robótica]
---

# Câmara de Profundidade 3D RealSense

> **[Comprar na loja](https://www.juxitech.com/products/3d-realsense-depth-camera)**

## Visão Geral

A Câmara de Profundidade 3D RealSense é um dispositivo de percepção visual de alto desempenho disponível nos modelos **D435i, D405 e D405CB**. Suporta análise facial, realidade aumentada, rastreamento de objetos, escaneamento 3D e é especialmente otimizada para desenvolvimento de inteligência incorporada.

**Principais recursos**:

- Três modelos cobrindo necessidades de curto a longo alcance e precisão
- Saída de profundidade, RGB e infravermelho de alta precisão (o D435i também fornece dados de IMU)
- Otimizada para IA incorporada: navegação autônoma, reconhecimento de objetos, manipulação
- Adaptação opcional para plataformas robóticas **XLeRobot** e **SO-ARM101**, plug-and-play

---

## Comparação de Modelos

| Modelo | Alcance | Ideal Para |
|-------|-------|----------|
| **D435i** | Médio a longo alcance | Navegação de robôs móveis, reconstrução 3D do ambiente |
| **D405** | Curto alcance, alta precisão | Preensão de braços robóticos, reconhecimento de objetos de perto |
| **D405CB** | Curto alcance (D405 aprimorado) | Ambientes complexos/pouca luz, precisão maior |

## Especificações

| Categoria | Especificação |
|----------|------|
| Modelos | D435i / D405 / D405CB |
| Funções Centrais | Análise facial, RA, rastreamento de objetos, escaneamento 3D, percepção de IA incorporada |
| Plataformas Compatíveis | XLeRobot / SO-ARM101 (opcional) |
| Saída | Profundidade, RGB, IR, IMU (D435i) |
| Casos de Uso | Robótica, pesquisa em IA, reconstrução 3D, inspeção industrial, AR/VR, IA incorporada |

---

## Início Rápido

### 1. Instalar o Driver

```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```

### 2. Verificar o Dispositivo

```bash
rs-enumerate-devices
```

Você deve ver sua câmara RealSense e seu modelo.

### 3. Exemplo Básico

```python
import pyrealsense2 as rs
import numpy as np
import cv2

pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

pipeline.start(config)

try:
    while True:
        frames = pipeline.wait_for_frames()
        depth = frames.get_depth_frame()
        color = frames.get_color_frame()
        if not depth or not color:
            continue
        depth_image = np.asanyarray(depth.get_data())
        color_image = np.asanyarray(color.get_data())
        cv2.imshow('Color', color_image)
        cv2.imshow('Depth', depth_image * 80)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```

### 4. Integração LeRobot

Para projetos SO-ARM101 / XLeRobot:

```bash
# Find camera ID
python -m lerobot.find_cameras realsense

# Enable RealSense during teleoperation
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```

---

## Aplicações

| Cenário | Descrição |
|----------|-------------|
| **Análise Facial** | Reconhecimento, expressão, análise de atributos |
| **Realidade Aumentada** | Sobreposição, localização espacial, registo 3D |
| **Rastreamento de Objetos** | Detecção, rastreamento, contagem |
| **Escaneamento 3D** | Reconstrução de modelos, medição de volume, verificação de dimensões |
| **IA Incorporada** | Percepção do ambiente, desvio de obstáculos, manipulação |

---

## FAQ

**P: Como escolher um modelo?**

**R:**

- Navegação de robôs móveis / reconstrução → D435i (médio alcance, com IMU)
- Preensão de braços robóticos / curta distância → D405 (compacto, alta precisão)
- Pouca luz / ambientes complexos → D405CB (D405 aprimorado)

**P: Suporta Jetson?**

**R:** Sim. O pyrealsense2 instala diretamente no Jetson e é compatível com o fluxo de trabalho LeRobot do SO-ARM101.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
