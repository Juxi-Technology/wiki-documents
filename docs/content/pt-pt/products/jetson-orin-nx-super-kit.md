---
title: Kit de Desenvolvedor Jetson Orin NX Super
category: compute-vision
description: Kit de desenvolvedor NVIDIA Jetson Orin NX SUPER da Juxi Technology — plataforma de IA de borda 117/157 TOPS, Ubuntu 22.04 pré-instalado e SSD NVMe de 256GB
keywords: [jetson, orin nx, ia de borda, computação de borda, leRobot, robótica]
---

# Kit de Desenvolvedor Jetson Orin NX Super

> **[Comprar na loja](https://www.juxitech.com/products/nvidia-jetson-orin-nx-super-developer-kit)**

## Visão Geral

O Kit de Desenvolvedor NVIDIA Jetson Orin NX SUPER é uma plataforma de computação de IA de borda de alto desempenho, construída para desenvolvedores avançados de robótica, pesquisadores de IA generativa e engenheiros de sistemas embarcados. Alimentado pelo módulo Jetson Orin NX SUPER, entrega até **117 TOPS (8GB) / 157 TOPS (16GB)** de desempenho de IA — 234x / 314x mais rápido que o Jetson Nano original.

Pronto para uso imediato:

- **Ubuntu 22.04** pré-instalado
- **SSD NVMe PCIe 3.0 x4 de 256GB** (leitura de até 2800MB/s)
- WiFi 5 dual-band 2.4G/5G + Bluetooth 5.0 (antenas de alto ganho de 4dBi)
- Ventoinha PWM com rolamento de esferas (vida útil de 50.000 horas)
- Carcaça acrílica com furos para montagem de câmaras

**Casos de uso**: implantação de LLMs na borda, visão computacional avançada, desenvolvimento robótico LeRobot SO-ARM.

---

## Especificações

| Categoria | Especificação |
|----------|------|
| Módulo central | NVIDIA Jetson Orin NX SUPER |
| Desempenho de IA | 117 TOPS (8GB) / 157 TOPS (16GB) |
| CPU | NVIDIA Carmel ARMv8.2 de 6 núcleos @ 2.0GHz |
| GPU | NVIDIA Ampere, 1792 núcleos CUDA + 56 núcleos Tensor + 2 engines NVDLA |
| Memória | LPDDR5 de 8GB / 16GB (102,4 GB/s) |
| Armazenamento | SSD NVMe PCIe 3.0 x4 de 256GB (leitura de até 2800MB/s) |
| Sem fio | WiFi 5 dual-band 2.4G/5G + BT 5.0, 2 antenas de 4dBi |
| Resfriamento | Ventoinha PWM com rolamento de esferas (50.000 h) + dissipador de alumínio |
| Display | DP 1.4, até 4K@60Hz (H.265) |
| I/O | 4× USB 3.2, DP 4K60Hz, header GPIO de 40 pinos |
| SO | Ubuntu 22.04 pré-instalado |

## Primeiros Passos

### Início Rápido

1. Conecte o adaptador de energia (19V 40W)
2. Conecte um monitor via cabo DP-para-HDMI
3. Conecte teclado e mouse (USB 3.2)
4. Inicialize no Ubuntu 22.04 pré-instalado

### Montagem de Câmaras

A carcaça acrílica possui furos para montagem de câmaras, suportando câmaras duplas (CSI / USB).

---

## Configuração de Software

### Verificar a GPU PyTorch

```python
import torch
print(torch.cuda.is_available())  # should print True
```

### Instalar o LeRobot (para SO-ARM100/101)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### Referências

- [Problemas de Compatibilidade PyTorch no Jetson Orin](/pt-pt/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [Tutorial SO-ARM101](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

---

## Variantes do Kit

| Tipo de Kit | Acessórios Inclusos | Caso de Uso |
|----------|-----------------|----------|
| **Padrão** | Placa + carcaça + SSD 256GB + WiFi/BT + antenas + fonte 19V 40W + cabo DP-para-HDMI + Type-C + chave de fenda | Desenvolvimento geral de IA de alto desempenho |
| **Kit Display OLED** | + Display de status OLED de 0,91" | Monitoramento do sistema em tempo real |
| **Kit Áudio USB** | + Placa de som USB (alto-falante + microfone, cancelamento de ruído/eco) | Interação por voz, assistente de voz com LLM |
| **Kit Câmara IMX219** | + Câmara CSI IMX219 (FOV 77°, 8MP) + suporte ajustável | Visão CSI nativa |
| **Kit Câmara com Foco Automático** | + Câmara USB com foco automático de 86° (1080P) + suporte ajustável | Visão geral, braço robótico |
| **Kit Robótico SO-ARM100/101** | + HUB USB 3.0 + câmara com foco automático + suportes dedicados | Visão para braço robótico |

## Comparação de Versões

| Versão | Desempenho de IA | Recomendado Para |
|---------|---------------|-----------------|
| **8GB** | 117 TOPS | Desenvolvimento avançado de IA, robótica intermediária, implantação de LLMs na borda |
| **16GB** | 157 TOPS | IA incorporada de alto desempenho, inferência de modelos grandes na borda, visão complexa |

---

## FAQ

**P: Quanto mais rápido que o Orin NX padrão?**

**R:** 1,7x mais rápido (otimização SUPER).

**P: Preciso instalar o SO eu mesmo?**

**R:** Não. Ubuntu 22.04 e SSD de 256GB vêm pré-configurados — ligue e desenvolva.

**P: Ele suporta o SO-ARM101?**

**R:** Totalmente compatível, com kits de visão robótica dedicados (câmara + suportes) e integração perfeita com LeRobot.

**P: A ventoinha é barulhenta?**

**R:** A ventoinha PWM com rolamento de esferas é estável e silenciosa mesmo em carga total de 40W, com vida útil de 50.000 horas (10x mais durável que ventoinhas hidráulicas).

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
