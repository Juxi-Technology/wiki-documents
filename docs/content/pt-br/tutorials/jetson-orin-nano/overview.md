---
title: Visão geral do produto — Kit de Desenvolvedor Jetson Orin Nano Super
sidebar_label: Visão geral do produto
slug: /product/overview
description: >-
  O que é o kit de desenvolvedor NVIDIA Jetson Orin Nano Super (8GB), para que
  ele serve e qual é o seu lugar na família Jetson Orin.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Visão geral do produto

![Kit de Desenvolvedor Jetson Orin Nano Super](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

O Kit de Desenvolvedor NVIDIA® Jetson Orin Nano™ Super é o kit de entrada da
família Jetson Orin: um pequeno computador de IA para prototipar aplicações de
visão computacional, robótica e IA generativa local na borda. Ele executa o
JetPack 7.2.1 (Jetson Linux / L4T r39.2.1), a versão atual para este kit.

## Fatos principais (verificados na documentação da NVIDIA)

- "Super" é uma configuração de software, não hardware novo: o mesmo módulo
  (P3767) e a mesma placa portadora (P3768) do "Jetson Orin Nano Developer
  Kit" anterior, renomeado na atualização Super. *(Developer Kit User Guide; anúncio
  Super Boost da NVIDIA)*
- Números de destaque do kit: até **67 INT8 TOPS**, até **102 GB/s** de largura
  de banda de memória, potência de **7W a 25W** e uma melhoria de **1,7x em IA
  generativa** em relação à geração anterior. *(Developer Kit User Guide — Introduction)*
- GPU Ampere com **1024 núcleos CUDA e 32 Tensor Cores**; CPU **Arm
  Cortex-A78AE de 6 núcleos** de 64 bits a até 1,7 GHz; **8GB LPDDR5 de 128 bits**. *(Folha de
  dados; página de especificações do Jetson Orin)*
- Armazenamento: um **slot de cartão microSD na parte inferior do módulo** mais
  suporte a **NVMe externo**; sem eMMC e sem armazenamento na caixa. *(Folha de dados;
  Início rápido)*
- Executa o JetPack **7.2.1** (L4T **r39.2.1**; Ubuntu 24.04, kernel 6.8, CUDA
  13.2.2, TensorRT 10.16.2) pelo método Jetson ISO a partir de um pen drive USB.
  Faixa suportada: JetPack 6.x ou 7.2/7.2.1 (as versões 7.0/7.1 não suportavam Orin).
  *(Início rápido; downloads do JetPack; arquivo do JetPack)*
- Placa portadora: DisplayPort, Ethernet Gigabit, quatro portas USB 3.2 Type-A,
  USB-C, dois conectores MIPI CSI, três slots M.2, header de 40 pinos. Veja
  **[Interfaces e Layout de Hardware](/pt-br/tutorials/jetson-orin-nano/interfaces)**. *(Developer Kit User
  Guide — Hardware Layout)*

## O que significa "Super"

O ganho de desempenho Super é entregue por um modo de energia de software que
eleva os clocks da GPU, da memória e da CPU no mesmo hardware, e a NVIDIA diz
que kits existentes o obtêm atualizando o JetPack: "Usuários existentes do
Jetson Orin Nano Developer Kit podem obter o ganho de desempenho 'Super' com uma
atualização de software." *(Developer Kit User Guide; anúncio Super Boost da NVIDIA)*

A tabela abaixo compara o kit original com a configuração Super.
*(anúncio Super Boost da NVIDIA)*

| Item | Kit original Orin Nano Developer Kit | Configuração Super |
|---|---|---|
| Clock da GPU | 635 MHz | 1020 MHz |
| Clock da CPU | 1,5 GHz | 1,7 GHz |
| Largura de banda de memória | 68 GB/s | 102 GB/s |
| Desempenho de IA (INT8 esparso) | 40 TOPS | 67 TOPS |
| Computação FP16 | 10 TFLOPs | 17 TFLOPs |
| Modos de energia | 7W, 15W | 7W, 15W, 25W |
| Preço (no lançamento do Super, dezembro de 2024) | $499 | $249 |

*Em um número, os próprios materiais da NVIDIA divergem: o anúncio do Super
descreve a largura de banda de memória anterior como "65 GB/s", enquanto as
tabelas de especificação do módulo da NVIDIA listam 68 GB/s para a configuração
original de 8 GB. A tabela acima usa o valor da especificação; ambos se referem
ao mesmo hardware pré-Super.*

Para os preços atuais, veja a [listagem deste kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
na loja Juxi (SKU JX00110).

A partir do JetPack 7.2.1, a Jetson ISO grava o kit com a configuração Super por
padrão *(página de downloads do JetPack)*. Unidades instaladas inicialmente com
a ISO do JetPack 7.2 podem manter um perfil não-Super; se faltar 25W ou MAXN
SUPER, veja a **[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**.

Na tabela de modos de energia do L4T r39.2, a configuração Super lista 15W (modo 0),
25W (modo 1, padrão) e MAXN SUPER (modo 2, experimental; apenas em kits gravados
com a configuração Super). O MAXN SUPER leva a CPU a até 1,7 GHz, a GPU a até
1020 MHz e o controlador de memória a 3199 MHz. Leia o modo
com `sudo /usr/sbin/nvpmodel -q`; defina-o com
`sudo /usr/sbin/nvpmodel -m <mode_id>`. As páginas do kit da NVIDIA citam "7W a 25W";
a tabela do r39.2 lista os três modos acima — verifique a sua unidade em **[Verifique
seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system)**. *(página Platform Power
and Performance do L4T r39.2)*

## Especificações do módulo

| Item | Especificação |
|---|---|
| Desempenho de IA | Até 67 TOPS INT8 esparsos (33 densos) na configuração Super |
| GPU | Arquitetura NVIDIA Ampere, 1024 núcleos CUDA, 32 Tensor Cores, até 1020 MHz |
| CPU | Arm Cortex-A78AE v8.2 de 6 núcleos (64 bits), 1,5MB L2 + 4MB L3, até 1,7 GHz |
| Memória | 8GB LPDDR5 de 128 bits, 102 GB/s |
| Armazenamento | Slot de cartão microSD na parte inferior do módulo; suporte a SSD NVMe externo |
| Decodificação de vídeo | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Codificação de vídeo | 1080p30 usando 1–2 núcleos de CPU (sem hardware codificador dedicado) |
| Aceleradores de IA | Sem DLA e sem PVA — a inferência roda nos Tensor Cores da GPU |
| Fator de forma do módulo | SO-DIMM de 260 pinos, 69,6 mm x 45 mm |

*Fontes: folha de dados do Jetson Orin Nano Super Developer Kit (dezembro de 2024);
página de especificações NVIDIA Jetson Orin; página Platform Power and Performance do L4T r39.2.*

## Números de peça

| Número de peça | O que designa |
|---|---|
| P3766 | O kit completo Jetson Orin Nano Developer Kit |
| P3767 | O System on Module (SOM) |
| P3768 | A placa portadora de referência |
| P3767-0005 | SKU do módulo no kit de desenvolvedor (Jetson Orin Nano 8GB, "for development only") |

Esta série de documentação cobre **apenas o kit de desenvolvimento de 8GB**. O módulo Orin Nano 8GB comercial é outro part number (**P3767-0003**) e um alvo separado nas ferramentas de gravação — consulte a nota sobre o SKU do módulo em [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).

## Onde ele se posiciona na família Orin

- **Jetson Orin Nano 8GB — este kit.** O ponto de entrada da família Orin:
  67 INT8 TOPS, 8GB de memória unificada, 7W a 25W.
- **Jetson Orin NX.** A mesma placa portadora pode alimentar, testar e desenvolver com módulos Orin
  NX (é necessário dissipador de calor e ventoinha próprios; um módulo novo de fábrica precisa ser
  gravado a partir de um host Ubuntu com o SDK Manager). *(Developer Kit User Guide —
  How-To)*
- **Jetson AGX Orin — a categoria carro-chefe.** O módulo AGX Orin 32GB alcança
  241 TOPS no Modo Super *(destaques da versão JetPack 7.2)*. Veja a
  [série Jetson AGX Orin](/pt-br/tutorials/jetson-agx-orin/quick-start) da Juxi.

A principal restrição a considerar é a **memória unificada de 8GB**; sem DLA
nem PVA, as cargas de trabalho de IA rodam apenas na GPU — veja **[Eficiência de
memória](/pt-br/tutorials/jetson-orin-nano/memory-efficiency)** e **[Inferência de LLM
local](/pt-br/tutorials/jetson-orin-nano/local-llm)**.

## Para que serve o kit de desenvolvedor

- **Prototipagem para produção.** O JetPack 7.2.1 atende toda a família Orin,
  então o trabalho feito no kit é aproveitado nos módulos Orin usados em produtos. *(página de
  downloads do JetPack)*
- **Visão computacional.** Dois conectores de câmera MIPI CSI; o DeepStream SDK 9.1 está
  na matriz de componentes do JetPack 7.2.1 — veja
  **[DeepStream](/pt-br/tutorials/jetson-orin-nano/deepstream)**.
- **IA generativa local.** A alegação de destaque é uma melhoria de 1,7x em IA
  generativa; o teto de 8GB define o que cabe — veja
  **[Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm)**.
- **Robótica.** Funcionários da NVIDIA recomendam o ROS 2 Jazzy para o JetPack 7.2.1 — veja
  **[Robótica](/pt-br/tutorials/jetson-orin-nano/robotics)**.

> **Nota da Juxi:** Produtos de produção são construídos sobre módulos Jetson Orin — o
> Orin Nano 8GB ou um Orin NX — em uma placa portadora personalizada. O
> kit de desenvolvedor é o veículo de desenvolvimento, não o componente de produção.

## Na caixa

A caixa contém o kit de desenvolvedor (módulo Orin Nano 8GB com dissipador de calor, na
placa portadora de referência), uma fonte de alimentação de 19 V, o cartão sem fio
802.11ac/ab/gn incluído e um cartão de início rápido e suporte. A NVIDIA afirma que o kit
"não inclui armazenamento removível na caixa". *(Folha de dados; Início rápido)*

Você precisa fornecer:

- **Armazenamento** — um cartão microSD (64GB, UHS-1 ou maior) ou um SSD NVMe. O
  slot do microSD fica na **parte inferior do módulo**; insira antes de ligar.
  O pacote da loja Juxi já inclui um cartão microSD de 64 GB, então compre armazenamento
  apenas se você recebeu a caixa NVIDIA pura ou se preferir um SSD NVMe.
- **Um pen drive USB de instalação** — 16GB ou maior. Grave a ISO do JetPack neste
  pen drive, não em um cartão microSD: as imagens de cartão SD foram removidas no JetPack
  7.2.
- **Um computador host** com 25GB ou mais de espaço livre, um monitor DisplayPort e
  teclado/mouse USB para a configuração na área de trabalho. *(Início rápido; Supported Hardware)*

> **Importante** Firmware de fábrica muito antigo precisa ser atualizado primeiro — o JetPack
> 7.2.1 exige firmware UEFI/QSPI da geração JetPack 6.x. Veja o **[Início
> rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)** e **[Gravação e
> atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Próximos passos

- **[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)** — da caixa a um
  sistema JetPack 7.2.1 funcional
- **[Interfaces e Layout de Hardware](/pt-br/tutorials/jetson-orin-nano/interfaces)** — todas as portas, slots e
  conectores
- **[Downloads](/pt-br/tutorials/jetson-orin-nano/downloads)** — imagens oficiais, ferramentas e links de documentação

## Fontes

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (verificado em 2026-09-26)
- [NVIDIA Super Boost: o Jetson Orin Nano Developer Kit ganha um Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (verificado em 2026-09-26)
- [NVIDIA JetPack 6.2 traz o Super Mode para os módulos Jetson Orin Nano e Jetson Orin NX](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (linkado como o anúncio do modo de energia Super)
- [Página de especificações do módulo e do kit NVIDIA Jetson Orin](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (verificado em 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificado em 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [L4T r38.2.1 Developer Guide — Partition Configuration (SKUs de módulo)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (verificado em 2026-09-26)
- [Folha de dados do Jetson Orin Nano Super Developer Kit (PDF, linkada em nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificado em 2026-09-26)
- [Listagem do kit na loja da Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificado em 2026-09-26)

*Status: revisado em 2026-10-11. Baseado na documentação oficial da NVIDIA nas
datas indicadas; ainda não verificado em hardware físico pela Juxi Technology.*

**Créditos das imagens:** Imagem do produto proveniente do *Jetson Orin Nano
Developer Kit User Guide* oficial da NVIDIA (baixado em 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é publicada
pela Juxi Technology e não é uma publicação da NVIDIA.
