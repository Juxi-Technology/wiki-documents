---
title: Interfaces e layout do hardware
sidebar_label: Interfaces e layout do hardware
slug: /product/interfaces
description: >-
  Referência de layout com etiquetas e de conectores do Kit de Desenvolvedor
  NVIDIA Jetson AGX Orin — botões, portas, conectores da placa portadora,
  opções de ecrã e armazenamento, o conector de 40 pinos e o conector de
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

# Interfaces e layout do hardware

Existem dois sistemas de referência para o kit de desenvolvedor: as **etiquetas
numeradas (0–12) das vistas laterais**, utilizadas pelo guia oficial da NVIDIA e
por esta página, e os **números dos conectores da placa portadora (números J)**
impressos na PCB. Tenha ambos à mão — os restantes guias referem-se a eles.

## Vistas laterais — componentes identificados

![Kit de desenvolvedor, ângulo do botão e da entrada DC](/images/jetson-agx-orin/jaodk_labeled_01.png)
![Kit de desenvolvedor, ângulo da tampa PCIe e do conector de 40 pinos](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | Componente | Notas |
|---|---|---|
| 0 | LED branco | Indicador de alimentação |
| 1 | Botão de alimentação | |
| 2 | Botão Force Recovery | Utilizado nos modos de recuperação / gravação |
| 3 | Botão de reset | |
| 4 | Porta USB Type-C | Apenas DFP (ligar periféricos) |
| 5 | Tomada de alimentação DC | Conector tipo barril — ver J41 para as especificações |
| 6 | Porta Ethernet | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | Saída DisplayPort | **A única interface de ecrã do kit** |
| 9 | Porta USB micro-B | Para depuração |
| 10 | Porta USB Type-C | Gravação e dados (UFP e DFP) |
| 11 | Conector de 40 pinos | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## Placa portadora — conectores

| Marca | Conector | Especificação / notas |
|---|---|---|
| DS2 | LED branco | |
| S1 / S2 / S3 | Botões de alimentação / reset / Force Recovery | |
| J24 | USB Type-C (acima da tomada DC) | Apenas DFP, USB 3.2 Gen 2 — **é aqui que se liga a fonte de alimentação USB-C incluída** |
| J41 | Tomada de alimentação DC | 5,5 mm OD, 2,5 mm ID, positivo ao centro |
| J17 | Ethernet | Até 10GBASE-T |
| J33 | USB Type-A ×2 (ao lado da Ethernet) | USB 3.2 Gen 2 |
| J18 | Saída DisplayPort | Suporta MST |
| J26 | USB micro-B | UART de depuração |
| J40 | USB Type-C (ao lado do conector de 40 pinos) | UFP e DFP — **a porta utilizada para ligar a um PC anfitrião para o SDK Manager** |
| J30 | Conector de 40 pinos | O pino 1 está marcado com um triângulo branco na PCB |
| J42 | Conector de automação | Arranque automático, wake-on-LAN, gatilho de throttling (pinos abaixo) |
| J13 | Conector da bateria de reserva do RTC | |
| J509 | Conector da câmara | |
| J502 | Conector de depuração JTAG | |
| J505 | Ranhura M.2 E-Key | Normalmente aloja o módulo Wi-Fi |
| J511 | Conector de áudio HD | |
| J1 | Ranhura M.2 M-Key | Para um SSD NVMe |
| J10 | Ranhura para cartão microSD | UHS-1 |
| J3 | Conector do módulo Jetson | 699 pinos |
| J6 | Conector PCIe x16 | PCIe 4.0 ×8 em termos elétricos |
| J9 | Conector da ventoinha | 4 pinos, passo de 1,25 mm |

> **As três coisas que as pessoas perguntam primeiro:**
> - **Ecrã:** o DisplayPort (J18) é a *única* saída de ecrã — não existe porta
>   HDMI nem DisplayPort sobre USB-C. Para um monitor HDMI, use um adaptador
>   ativo DP→HDMI ou um cabo.
> - **Alimentação:** a fonte de alimentação USB-C incluída liga-se à **J24** (a
>   porta USB-C acima da tomada DC). Está disponível uma entrada tipo barril
>   separada (J41) caso forneça a sua própria fonte de alimentação.
> - **Ligação ao PC anfitrião:** para o SDK Manager ou uma consola série, use a
>   **J40** (a porta USB-C ao lado do conector de 40 pinos) — não a J24.

## Saída DisplayPort

- Suporta DP SST, DP MST (até 2 ecrãs externos) e DP DSC
- Resolução máxima: 8K@30 / 4K@120 (com ou sem DSC)
- Formatos de saída: RGB 8/10 bpc, YUV444 8/10 bpc

## Opções de armazenamento

- **Predefinição:** memória flash eMMC no módulo
- **Opcional:** SSD NVMe (M.2 M-Key, J1) · cartão microSD (J10, UHS-1) · unidade USB

O instalador ISO do Jetson pode instalar o sistema na eMMC ou no NVMe; o SDK
Manager pode gravar o BSP L4T base em qualquer um dos suportes de armazenamento
suportados.

## Conector de 40 pinos (J30)

![Pinagem do conector de 40 pinos](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*Pinagem do conector de 40 pinos — da Carrier Board Specification da NVIDIA.*

![Marca do pino 1 no conector de 40 pinos](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*O pino 1 está marcado com um triângulo branco na PCB.*

## Conector de automação (J42)

Utilizado para cablagem de produção e automação:

- Pino 1, 12: GND
- Pino 2, 3, 4: entradas, com a mesma função dos botões Force Recovery, Reset e alimentação
- Pino 5–6: aberto = arranque automático desativado; em curto = arranque automático ativado
- Pino 7: saída CVB_STBY — indica se o módulo está em suspensão
- Pino 8: entrada SYSTEM_OC — aciona o throttling do Tegra
- Pino 9–10: aberto = wake-on-LAN/arranque por LAN a partir de desligado desativado; em curto = ativado
- Pino 11: JTAG_TRST — reset de teste JTAG

## Fontes

- [Hardware Layout — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-23)
- Para detalhes da placa portadora, consulte a *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* (com ligação a partir da [página de downloads](https://developer.nvidia.com/embedded/downloads) da NVIDIA)

*Estado: rascunho, pendente de revisão por cheny. Os passos e valores acima
baseiam-se na documentação oficial da NVIDIA à data indicada; ainda não
verificados em hardware físico pela Juxi Technology.*

**Créditos das imagens:** os diagramas de layout e as imagens de pinagem provêm
do *Jetson AGX Orin Developer Kit User Guide* e da *Carrier Board Specification*
oficiais da NVIDIA (descarregados em 2026-09-23) e continuam a ser © NVIDIA
Corporation.

---

NVIDIA® e Jetson™ são marcas registadas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
