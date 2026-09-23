---
title: Interfaces e Layout de Hardware
sidebar_label: Interfaces & Layout de Hardware
slug: /product/interfaces
description: >-
  Layout rotulado e referência de conectores para o Kit de Desenvolvedor
  NVIDIA Jetson AGX Orin — botões, portas, conectores da placa portadora,
  opções de display e armazenamento, o header de 40 pinos e o header de
  automação.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# Interfaces e Layout de Hardware

Há dois sistemas de referência para o kit de desenvolvedor: as **etiquetas
numeradas (0–12) nas vistas laterais**, usadas pelo guia oficial da NVIDIA e por
esta página, e os **números dos conectores da placa portadora (números J)**
impressos na PCB. Mantenha os dois à mão — o restante dos nossos guias faz
referência a eles.

## Vistas laterais — peças rotuladas

![Kit de desenvolvedor, ângulo do botão e da entrada DC](/images/jetson-agx-orin/jaodk_labeled_01.png)
![Kit de desenvolvedor, ângulo da tampa PCIe e do header de 40 pinos](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | Peça | Observações |
|---|---|---|
| 0 | LED branco | Indicador de energia |
| 1 | Botão Power | |
| 2 | Botão Force Recovery | Usado para os modos de recuperação / gravação |
| 3 | Botão Reset | |
| 4 | Porta USB Type-C | Somente DFP (conecte periféricos) |
| 5 | Conector de alimentação DC | Conector barrel — consulte J41 para a especificação |
| 6 | Porta Ethernet | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | Saída DisplayPort | **A única interface de display do kit** |
| 9 | Porta USB micro-B | Para depuração |
| 10 | Porta USB Type-C | Gravação e dados (UFP e DFP) |
| 11 | Conector de 40 pinos | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## Placa portadora — conectores

| Marca | Conector | Especificação / observações |
|---|---|---|
| DS2 | LED branco | |
| S1 / S2 / S3 | Botões Power / Reset / Force Recovery | |
| J24 | USB Type-C (acima do conector DC) | Somente DFP, USB 3.2 Gen 2 — **é aqui que a fonte de alimentação USB-C incluída se conecta** |
| J41 | Conector de alimentação DC | 5,5 mm OD, 2,5 mm ID, positivo no centro |
| J17 | Ethernet | Até 10GBASE-T |
| J33 | USB Type-A ×2 (ao lado da Ethernet) | USB 3.2 Gen 2 |
| J18 | Saída DisplayPort | Suporta MST |
| J26 | USB micro-B | UART de depuração |
| J40 | USB Type-C (ao lado do header de 40 pinos) | UFP e DFP — **a porta usada para conectar a um computador host para o SDK Manager** |
| J30 | Conector de 40 pinos | O pino 1 é marcado com um triângulo branco na PCB |
| J42 | Header de automação | Power-on automático, wake-on-LAN, gatilho de throttling (pinos abaixo) |
| J13 | Conector de bateria de backup do RTC | |
| J509 | Conector de câmera | |
| J502 | Conector de depuração JTAG | |
| J505 | Slot M.2 E-Key | Normalmente abriga o módulo Wi-Fi |
| J511 | Header de áudio HD | |
| J1 | Slot M.2 M-Key | Para um SSD NVMe |
| J10 | Slot de cartão microSD | UHS-1 |
| J3 | Conector do módulo Jetson | 699 pinos |
| J6 | Conector PCIe x16 | PCIe 4.0 ×8 eletricamente |
| J9 | Conector da ventoinha | 4 pinos, passo de 1,25 mm |

> **As três coisas que as pessoas perguntam primeiro:**
> - **Display:** o DisplayPort (J18) é a *única* saída de display — não há
>   porta HDMI nem DisplayPort sobre USB-C. Para um monitor HDMI, use um
>   adaptador ou cabo ativo DP→HDMI.
> - **Energia:** a fonte de alimentação USB-C incluída conecta na **J24** (a
>   porta USB-C acima do conector DC). Uma entrada separada de conector barrel
>   (J41) está disponível se você fornecer sua própria fonte de alimentação.
> - **Conexão com o computador host:** para o SDK Manager ou um console serial,
>   use a **J40** (a porta USB-C ao lado do header de 40 pinos) — não a J24.

## Saída DisplayPort

- Suporta DP SST, DP MST (até 2 displays externos) e DP DSC
- Resolução máxima: 8K@30 / 4K@120 (com ou sem DSC)
- Formatos de saída: RGB 8/10 bpc, YUV444 8/10 bpc

## Opções de armazenamento

- **Padrão:** memória flash eMMC no módulo
- **Opcional:** SSD NVMe (M.2 M-Key, J1) · cartão microSD (J10, UHS-1) · unidade USB

O instalador ISO do Jetson pode instalar o sistema no eMMC ou no NVMe; o SDK
Manager pode gravar o BSP L4T base em qualquer uma das mídias de armazenamento
compatíveis.

## Header de 40 pinos (J30)

![Pinagem do header de 40 pinos](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*Pinagem do header de 40 pinos — da Carrier Board Specification da NVIDIA.*

![Marcação do pino 1 no header de 40 pinos](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*O pino 1 é marcado com um triângulo branco na PCB.*

## Header de automação (J42)

Usado para fiação de produção e automação:

- Pino 1, 12: GND
- Pino 2, 3, 4: entradas, mesma função dos botões Recovery, Reset e Power
- Pino 5–6: aberto = power-on automático desativado; em curto = power-on automático ativado
- Pino 7: saída CVB_STBY — indica se o módulo está em suspensão
- Pino 8: entrada SYSTEM_OC — aciona o throttling do Tegra
- Pino 9–10: aberto = wake/boot-on-LAN a partir do estado desligado desativado; em curto = ativado
- Pino 11: JTAG_TRST — reset de teste de JTAG

## Fontes

- [Hardware Layout — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-23)
- Para detalhes da placa portadora, consulte a *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* (linkada na [página de downloads](https://developer.nvidia.com/embedded/downloads) da NVIDIA)

*Status: rascunho, aguardando revisão por cheny. As etapas e os valores acima
baseiam-se na documentação oficial da NVIDIA na data indicada; ainda não
verificados em hardware físico pela Juxi Technology.*

**Créditos das imagens:** os diagramas de layout e as imagens de pinagem são dos
documentos oficiais da NVIDIA *Jetson AGX Orin Developer Kit User Guide* e
*Carrier Board Specification* (baixados em 2026-09-23) e permanecem © NVIDIA
Corporation.

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
