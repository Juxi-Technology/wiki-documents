---
title: Interfaces e layout do hardware
sidebar_label: Interfaces e layout do hardware
slug: /product/interfaces
description: >-
  Referência de layout etiquetado e de conectores do kit de desenvolvedor
  NVIDIA Jetson Orin Nano Super — todas as portas, ranhuras, conectores e
  controlos, a ranhura microSD na parte inferior, os conectores de câmara, a
  alimentação e a consola série.
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

# Interfaces e layout do hardware

O kit é composto por duas placas: o **módulo Jetson Orin Nano** (P3767) na
**placa portadora de referência** (P3768); o kit completo é o P3766. Esta
página cobre os conectores e controlos, seguindo as etiquetas numeradas
oficiais da NVIDIA (1–12).

## Vista numerada — componentes identificados

![Vista numerada do kit de desenvolvedor](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*A vista numerada oficial — etiquetas 1–12 da NVIDIA.*

| # | Componente | Notas |
|---|---|---|
| 1 | Ranhura para cartão microSD | Na **parte inferior do módulo** — ver abaixo |
| 2 | Conector de expansão de 40 pinos | UART, SPI, I2S, I2C, GPIO |
| 3 | LED indicador de alimentação | Verde; acende quando o kit está ligado |
| 4 | Porta USB-C | Modos host, dispositivo e recuperação USB; sem saída de vídeo |
| 5 | Porta Ethernet Gigabit | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps; dois conectores duplos empilhados |
| 7 | Saída DisplayPort | **A única saída de ecrã do kit** |
| 8 | Tomada de alimentação DC | Conector tipo barril de 5,5 mm × 2,5 mm |
| 9 | Conectores de câmara MIPI CSI ×2 | 22 pinos, passo de 0,5 mm |
| 10 | Ranhura M.2 Key-M (2280) | PCIe 3.0 ×4 — para um SSD NVMe |
| 11 | Ranhura M.2 Key-M (2230) | PCIe 3.0 ×2 — para um SSD NVMe |
| 12 | Ranhura M.2 Key-E (2230) | Ocupada pelo módulo sem fios incluído |

> **Três coisas a saber antes de mais:**
> - **Armazenamento:** sem eMMC e **sem armazenamento na caixa**. Adicione um cartão microSD ou um SSD NVMe.
> - **Ranhura microSD:** na **parte inferior do módulo** — ver abaixo.
> - **Ecrã:** o DisplayPort é a *única* saída de ecrã — sem HDMI, sem vídeo sobre USB-C.

## Ranhura microSD — parte inferior do módulo

![A ranhura microSD na parte inferior do módulo](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*O cartão insere-se na **parte inferior do módulo** — imagem da NVIDIA, com um destaque ampliado.*

> **Atenção:** a ranhura microSD (etiqueta 1) fica na **parte inferior do
> módulo**, não na placa portadora. É o detalhe físico que mais vezes passa
> despercebido neste kit. Insira o cartão antes de arrancar com o instalador.

- O kit arranca a partir do cartão microSD quando um está presente; recomenda-se 64 GB UHS-1 ou superior.
- Se o instalador não mostrar o cartão, a orientação de resolução de problemas da NVIDIA é confirmar que o cartão está totalmente inserido na ranhura do módulo.
- O JetPack 7.2 e posteriores não têm imagens de cartão SD. Para alterar o que está instalado, utilize um percurso de instalação suportado — ver **[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Opções de armazenamento

- **microSD** (parte inferior do módulo, etiqueta 1) — o armazenamento principal do módulo.
- **SSD NVMe** — tamanho 2280 ou 2230 nas ranhuras M.2 Key-M (etiquetas 10 e 11, abaixo).
- **Unidade USB** — em USB-C ou Type-A; a ordem de arranque define-se no Gestor de Arranque UEFI.

Ver o **[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)** para saber o que comprar e o
fluxo do primeiro arranque.

## USB

| Porta | Velocidade | Modos | Notas |
|---|---|---|---|
| USB 3.2 Type-A ×4 (etiqueta 6) | USB 3.2 Gen 2, 10 Gbps | Apenas host | Dois conectores duplos empilhados; VBUS limitado a 3 A por conjunto |
| USB-C (etiqueta 4) | USB 3.2 Type-C | Host, dispositivo, recuperação USB | Apenas dados — esta porta não emite vídeo |

No **modo dispositivo**, a porta USB-C apresenta o kit a um PC anfitrião como:

- um dispositivo de armazenamento em massa com o ficheiro **L4T-README**;
- um dispositivo série USB;
- uma ligação Ethernet USB (RNDIS) — o Jetson está em **192.168.55.1**.

## Saída DisplayPort

- Apenas uma saída (etiqueta 7): **DisplayPort 1.2 com MST**. Não existe porta HDMI e a porta USB-C não transporta vídeo.
- Para um monitor HDMI, utilize um adaptador DisplayPort-para-HDMI.
- Se não houver saída de ecrã, ligue o monitor diretamente — sem chaveador KVM nem cadeia de adaptadores.

## Ethernet

- 1× Ethernet Gigabit (RJ45), etiqueta 5. O kit não tem porta 10 GbE.

## Ranhuras M.2

| Etiqueta | Ranhura | Tamanho | Elétrico | Aceita |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | SSD NVMe |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | SSD NVMe |
| 12 | M.2 Key-E | 2230 | — | O módulo sem fios incluído (ranhura ocupada) |

### Módulo sem fios

- A ranhura Key-E é expedida **ocupada**. A NVIDIA descreve o cartão apenas como um «controlador de interface de rede sem fios 802.11ac/ab/gn» — sem indicar o nome do chip.
- Relatos da comunidade (não confirmados) identificam o cartão de origem como um **Realtek RTL8822CE** (módulo AzureWave, ID PCI 10ec:c822). São informações da comunidade, não uma declaração da NVIDIA.
- Os modelos de NVMe e os módulos Key-E oficialmente suportados constam da lista «Jetson supported components information» do Centro de Descarregamentos Jetson, e não numa página pública. Verifique um componente nessa lista antes de o comprar.
- Se o cartão não conseguir ver a sua rede — por exemplo, um router de 6 GHz com MBSSID — ver **[Resolução de problemas → O Wi-Fi não encontra a rede](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**.

## Conectores de câmara CSI

- Dois conectores (etiqueta 9): 22 posições, passo de 0,5 mm, flexível com contacto inferior.
- **CAM0:** CSI 1×2 lanes. **CAM1:** CSI 1×2 lanes ou 1×4 lanes.
- Uma câmara de 15 pinos (por exemplo, a Raspberry Pi Camera Module v2) precisa de um cabo de 15 para 22 pinos.

## Conector de expansão de 40 pinos (etiqueta 2)

- GPIO e interfaces de periféricos: UART, SPI, I2S, I2C, GPIO.
- Para atribuições de pinos, níveis de tensão e limites elétricos, a NVIDIA remete para a *Jetson Orin Nano Developer Kit Carrier Board Specification* (Centro de Descarregamentos Jetson). Esse documento não estava acessível para esta página.

## Conector de botões (12 pinos)

O conector de botões suporta as funções de consola série, reset e force
recovery.

| Pinos | Função |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | Consola série (UART) |
| 9 + 10 | Modo Force Recovery — ligue os pinos em curto e ligue a alimentação |
| 7 + 8 | Reset — ligue os pinos em curto com o sistema ligado |
| jumper | Define o comportamento de ligação automática |

### Consola série

- Ligue um adaptador série USB-TTL: TX do adaptador no pino 3 (RXD), RX no pino 4 (TXD), GND no pino 7.
- Esta é a alternativa sem monitor. Ver a **[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)** para saber como capturar os registos de arranque.

### Force Recovery e reset

- **Modo Force Recovery:** ligue os pinos 9 e 10 e ligue o kit.
- **Reset:** com o kit ligado, ligue os pinos 7 e 8 em curto.
- O Modo Force Recovery é utilizado nos fluxos de gravação — ver **[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Alimentação

- **Tomada de alimentação DC (etiqueta 8):** conector tipo barril de 5,5 mm × 2,5 mm; utilize a fonte de 19 V incluída.
- **Ligação automática:** por predefinição, o kit liga-se assim que a alimentação DC é ligada. Um jumper no conector de botões altera este comportamento.
- **LED de alimentação (etiqueta 3):** um LED verde junto ao conector USB-C acende quando o kit está ligado.
- As páginas verificadas da NVIDIA não indicam a corrente nominal da fonte incluída nem a polaridade da tomada. Para uma fonte de terceiros, confirme ambos com o seu fornecedor.

## Conector da ventoinha

- A placa portadora tem um conector de ventoinha de 4 pinos.
- O módulo é expedido com um dissipador; as imagens oficiais mostram a ventoinha integrada na cobertura do dissipador. O conector destina-se a soluções térmicas de substituição.
- As páginas verificadas da NVIDIA não indicam o intervalo de temperatura de funcionamento nem os limites de Tj do módulo — esses dados estão na *Jetson Orin Nano Series Data Sheet* e no *Orin NX/Orin Nano Thermal Design Guide*, ambos no Centro de Descarregamentos, com início de sessão obrigatório.

## Dimensões

- **Módulo:** 69,6 mm × 45 mm, conector SO-DIMM de 260 pinos.
- **Kit:** duas referências oficiais divergem — a folha de dados (dez. 2024) indica **103 mm × 90,5 mm × 34,77 mm**; a tabela de família de produtos da NVIDIA indica **100 mm × 79 mm × 21 mm**. Ambas definem a altura como incluindo os pés, a placa portadora, o módulo e a solução térmica.
- A NVIDIA não publicou qualquer reconciliação. Uma explicação de um revendedor (kit na base vs. placa portadora nua) está **não verificada**.

> **Nota da Juxi:** confirme as dimensões na folha de dados atual da NVIDIA antes de projetar um invólucro.

## Fontes

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, dez. 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificado em 2026-09-26)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificado em 2026-09-26)
- [Família de produtos Jetson Orin — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [NVIDIA Developer Forums — «Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)», tópico da comunidade](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA nas datas indicadas; ainda não verificado em hardware físico
pela Juxi Technology.*

**Créditos das imagens:** as imagens de layout provêm do *Jetson Orin Nano
Developer Kit User Guide* oficial da NVIDIA (descarregado em 2026-09-26),
© NVIDIA Corporation.

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
