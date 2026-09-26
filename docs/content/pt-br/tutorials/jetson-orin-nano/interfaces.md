---
title: Interfaces e Layout de Hardware
sidebar_label: Interfaces & Layout de Hardware
slug: /product/interfaces
description: >-
  Layout rotulado e referência de conectores do kit de desenvolvedor NVIDIA
  Jetson Orin Nano Super — todas as portas, slots, headers e controles, o slot
  de microSD na parte inferior, conectores de câmera, energia e o console
  serial.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# Interfaces e Layout de Hardware

O kit é composto por duas placas: o **módulo Jetson Orin Nano** (P3767) na
**placa portadora de referência** (P3768); o kit completo é o P3766. Esta página
cobre os conectores e controles, usando as marcas oficiais da NVIDIA (1–12).

## Layout numerado — peças rotuladas

![Layout numerado do kit de desenvolvedor](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*O layout numerado oficial — as marcas 1–12 da NVIDIA.*

| # | Peça | Observações |
|---|---|---|
| 1 | Slot de cartão microSD | Na **parte inferior do módulo** — veja abaixo |
| 2 | Header de expansão de 40 pinos | UART, SPI, I2S, I2C, GPIO |
| 3 | LED indicador de energia | Verde; acende quando o kit está ligado |
| 4 | Porta USB-C | Modos host, device e USB recovery; sem saída de vídeo |
| 5 | Porta Ethernet Gigabit | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps; dois conectores duplos empilhados |
| 7 | Saída DisplayPort | **A única saída de vídeo do kit** |
| 8 | Conector de alimentação DC | Conector barrel de 5,5 mm × 2,5 mm |
| 9 | Conectores de câmera MIPI CSI ×2 | 22 pinos, passo de 0,5 mm |
| 10 | Slot M.2 Key-M (2280) | PCIe 3.0 ×4 — para um SSD NVMe |
| 11 | Slot M.2 Key-M (2230) | PCIe 3.0 ×2 — para um SSD NVMe |
| 12 | Slot M.2 Key-E (2230) | Ocupado pelo módulo sem fio incluído |

> **Três coisas para saber primeiro:**
> - **Armazenamento:** sem eMMC e **sem armazenamento na caixa**. Adicione um cartão microSD ou um SSD NVMe.
> - **Slot de microSD:** na **parte inferior do módulo** — veja abaixo.
> - **Display:** o DisplayPort é a *única* saída de vídeo — sem HDMI, sem vídeo via USB-C.

## Slot de microSD — parte inferior do módulo

![O slot de microSD na parte inferior do módulo](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*O cartão é inserido na **parte inferior do módulo** — imagem da NVIDIA, com um detalhe ampliado.*

> **Atenção:** o slot de microSD (marca 1) fica na **parte inferior do
> módulo**, e não na placa portadora. É o detalhe físico que mais passa
> despercebido neste kit. Insira o cartão antes de inicializar o instalador.

- O kit inicializa pelo cartão microSD quando há um cartão instalado; recomenda-se 64 GB UHS-1 ou maior.
- Se o instalador não mostrar o cartão, a orientação de solução de problemas
  da NVIDIA é confirmar se o cartão está totalmente inserido no slot do módulo.
- O JetPack 7.2 e posteriores não têm imagens de cartão SD. Para mudar o que está
  instalado, use um caminho de instalação suportado — veja
  **[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Opções de armazenamento

- **microSD** (parte inferior do módulo, marca 1) — o armazenamento principal do módulo.
- **SSD NVMe** — tamanho 2280 ou 2230 nos slots M.2 Key-M (marcas 10 e 11, abaixo).
- **Unidade USB** — em USB-C ou Type-A; a ordem de inicialização é definida no Gerenciador de Inicialização UEFI.

Veja o **[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)** para saber o que comprar e o fluxo da primeira inicialização.

## USB

| Porta | Velocidade | Modos | Observações |
|---|---|---|---|
| USB 3.2 Type-A ×4 (marca 6) | USB 3.2 Gen 2, 10 Gbps | Somente host | Dois conectores duplos empilhados; VBUS limitado a 3 A por conjunto |
| USB-C (marca 4) | USB 3.2 Type-C | Host, Device, USB Recovery | Somente dados — esta porta não emite vídeo |

No **modo Device**, a porta USB-C apresenta o kit a um PC host como:

- um dispositivo de armazenamento em massa com o arquivo **L4T-README**;
- um dispositivo serial USB;
- um link Ethernet USB (RNDIS) — o Jetson fica em **192.168.55.1**.

## Saída DisplayPort

- Apenas uma saída (marca 7): **DisplayPort 1.2 com MST**. Não há porta HDMI,
  e a porta USB-C não transporta vídeo.
- Para um monitor HDMI, use um adaptador DisplayPort para HDMI.
- Se não houver saída de vídeo, conecte o monitor diretamente — sem switch KVM
  nem cadeia de adaptadores.

## Ethernet

- 1× Ethernet Gigabit (RJ45), marca 5. O kit não tem porta 10 GbE.

## Slots M.2

| Marca | Slot | Tamanho | Elétrica | Aceita |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | SSD NVMe |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | SSD NVMe |
| 12 | M.2 Key-E | 2230 | — | O módulo sem fio incluído (ocupado) |

### Módulo sem fio

- O slot Key-E vem **ocupado de fábrica**. A NVIDIA descreve o cartão apenas como um
  "controlador de interface de rede sem fio 802.11ac/ab/gn" — sem o nome do chip.
- Relatos da comunidade (não confirmados) identificam o cartão de fábrica como um **Realtek
  RTL8822CE** (módulo AzureWave, PCI ID 10ec:c822). Esta é uma informação da
  comunidade, não uma declaração da NVIDIA.
- Os modelos de NVMe e módulos Key-E oficialmente suportados estão na lista "Jetson
  supported components information" do Jetson Download Center, e não em
  uma página pública. Verifique uma peça lá antes de comprar.
- Se o cartão não enxergar a sua rede — por exemplo, um roteador de 6 GHz usando
  MBSSID — veja **[Solução de problemas → Wi-Fi não enxerga a rede](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**.

## Conectores de câmera CSI

- Dois conectores (marca 9): 22 posições, passo de 0,5 mm, flex de contato inferior.
- **CAM0:** CSI 1×2 lane. **CAM1:** CSI 1×2 lane ou 1×4 lane.
- Uma câmera de 15 pinos (por exemplo, o Raspberry Pi Camera Module v2) precisa de um cabo de 15 para 22 pinos.

## Header de expansão de 40 pinos (marca 2)

- Interfaces GPIO e periféricas: UART, SPI, I2S, I2C, GPIO.
- Para atribuições de pinos, níveis de tensão e limites elétricos, a NVIDIA remete
  à *Jetson Orin Nano Developer Kit Carrier Board Specification* (Jetson
  Download Center). Esse documento não estava acessível para esta página.

## Header de botões (12 pinos)

O header de botões concentra as funções de console serial, reset e force recovery.

| Pinos | Função |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | Console serial (UART) |
| 9 + 10 | Modo Force Recovery — coloque os pinos em curto e ligue |
| 7 + 8 | Reset — coloque os pinos em curto com o sistema ligado |
| jumper | Define o comportamento de ligação automática |

### Console serial

- Conecte um adaptador serial USB-TTL: TX do adaptador no pino 3 (RXD), RX no pino 4 (TXD), GND no pino 7.
- Este é o recurso alternativo sem monitor. Veja a **[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**
  para saber como capturar os logs de inicialização.

### Force Recovery e reset

- **Modo Force Recovery:** conecte os pinos 9 e 10 e ligue o kit.
- **Reset:** com o kit ligado, coloque os pinos 7 e 8 em curto.
- O modo Force Recovery é usado nos fluxos de gravação — veja **[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Energia

- **Conector de alimentação DC (marca 8):** conector barrel de 5,5 mm × 2,5 mm; use a fonte de
  19 V incluída.
- **Ligação automática:** por padrão, o kit liga assim que a energia DC é
  conectada. Um jumper no header de botões altera esse comportamento.
- **LED de energia (marca 3):** um LED verde ao lado do conector USB-C acende quando
  o kit está ligado.
- As páginas verificadas da NVIDIA não informam a corrente nominal da fonte incluída nem
  a polaridade do conector. Para uma fonte de terceiros, confirme ambos com o seu fornecedor.

## Conector da ventoinha

- A placa portadora tem um header de ventoinha de 4 pinos.
- O módulo vem com um dissipador de calor; as imagens oficiais mostram a ventoinha integrada
  à cobertura do dissipador. O header é para soluções térmicas de substituição.
- As páginas verificadas da NVIDIA não informam a faixa de temperatura de operação nem os
  limites de Tj do módulo — eles estão no Jetson Orin Nano Series Data Sheet e
  no Orin NX/Orin Nano Thermal Design Guide, ambos no Download Center com acesso
  por login.

## Dimensões

- **Módulo:** 69,6 mm × 45 mm, conector SO-DIMM de 260 pinos.
- **Kit:** duas medidas oficiais divergem — a folha de dados (dezembro de 2024) diz
  **103 mm × 90,5 mm × 34,77 mm**; a tabela de família de produtos da NVIDIA diz
  **100 mm × 79 mm × 21 mm**. Ambas definem a altura incluindo pés, placa
  portadora, módulo e solução térmica.
- A NVIDIA não publicou uma conciliação. Uma explicação de revendedor (kit sobre
  a base vs. placa portadora nua) é **não verificada**.

> **Nota da Juxi:** confirme as dimensões na folha de dados atual da NVIDIA antes de projetar um gabinete.

## Fontes

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (verificado em 2026-09-26)
- [Folha de dados do Jetson Orin Nano Super Developer Kit (PDF, dezembro de 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificado em 2026-09-26)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificado em 2026-09-26)
- [Família de produtos Jetson Orin — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — "Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)", tópico da comunidade](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação oficial da NVIDIA nas
datas indicadas; ainda não verificado em hardware físico pela Juxi Technology.*

**Créditos das imagens:** as imagens de layout são do *Jetson Orin Nano
Developer Kit User Guide* oficial da NVIDIA (baixado em 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é publicada
pela Juxi Technology e não é uma publicação da NVIDIA.
