---
title: Visão geral do produto — Kit de Desenvolvedor Jetson Orin Nano Super
sidebar_label: Visão geral do produto
slug: /product/overview
description: >-
  O que é o kit de desenvolvedor NVIDIA Jetson Orin Nano Super (8GB), para que
  serve e qual é o seu lugar na família Jetson Orin.
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
visão computacional, robótica e IA generativa local na borda. Executa o JetPack
7.2.1 (Jetson Linux / L4T r39.2.1), a versão atual para este kit.

## Factos principais (verificados na documentação da NVIDIA)

- «Super» é uma configuração de software, não hardware novo: o mesmo módulo
  (P3767) e a mesma placa portadora (P3768) do anterior «Jetson Orin Nano
  Developer Kit», renomeado na atualização Super. *(Guia do Utilizador do Kit
  de Desenvolvedor; anúncio NVIDIA Super Boost)*
- Números de destaque do kit: até **67 TOPS INT8**, até **102 GB/s** de
  largura de banda de memória, potência de **7W a 25W** e uma melhoria de
  **1,7x em IA generativa** face à geração anterior. *(Guia do Utilizador do
  Kit de Desenvolvedor — Introdução)*
- GPU Ampere com **1024 núcleos CUDA e 32 Tensor Cores**; CPU **Arm
  Cortex-A78AE de 6 núcleos** de 64 bits até 1,7 GHz; **8GB LPDDR5 de 128
  bits**. *(Folha de dados; página de especificações do Jetson Orin)*
- Armazenamento: uma **ranhura para cartão microSD na parte inferior do
  módulo** e suporte para **NVMe externo**; sem eMMC e sem armazenamento na
  caixa. *(Folha de dados; Início rápido)*
- Executa o JetPack **7.2.1** (L4T **r39.2.1**; Ubuntu 24.04, kernel 6.8, CUDA
  13.2.2, TensorRT 10.16.2) através do método Jetson ISO a partir de uma
  unidade flash USB. Intervalo suportado: JetPack 6.x ou 7.2/7.2.1 (7.0/7.1 não
  suportavam o Orin). *(Início rápido; descarregamentos do JetPack; arquivo do
  JetPack)*
- Placa portadora: DisplayPort, Ethernet Gigabit, quatro portas USB 3.2
  Type-A, USB-C, dois conectores MIPI CSI, três ranhuras M.2, conector de 40
  pinos. Ver **[Interfaces e layout do hardware](/pt-pt/tutorials/jetson-orin-nano/interfaces)**. *(Guia do
  Utilizador do Kit de Desenvolvedor — Layout do hardware)*

## O que significa «Super»

O aumento de desempenho Super é proporcionado por um modo de alimentação de
software que eleva os relógios da GPU, da memória e da CPU no mesmo hardware, e
a NVIDIA afirma que os kits existentes obtêm-no atualizando o JetPack: «Os
atuais utilizadores do Jetson Orin Nano Developer Kit podem obter o aumento de
desempenho "Super" com uma atualização de software.» *(Guia do Utilizador do
Kit de Desenvolvedor; anúncio NVIDIA Super Boost)*

A tabela abaixo compara o kit original com a configuração Super. *(anúncio
NVIDIA Super Boost)*

| Item | Kit de Desenvolvedor Orin Nano original | Configuração Super |
|---|---|---|
| Relógio da GPU | 635 MHz | 1020 MHz |
| Relógio da CPU | 1,5 GHz | 1,7 GHz |
| Largura de banda de memória | 68 GB/s | 102 GB/s |
| Desempenho de IA (INT8 esparso) | 40 TOPS | 67 TOPS |
| Cálculo FP16 | 10 TFLOPs | 17 TFLOPs |
| Modos de alimentação | 7W, 15W | 7W, 15W, 25W |
| Preço (no lançamento do Super, dez. 2024) | 499 $ | 249 $ |

*Num número, os próprios materiais da NVIDIA divergem: o anúncio do Super
descreve a largura de banda de memória anterior como «65 GB/s», enquanto as
tabelas de especificações dos módulos da NVIDIA indicam 68 GB/s para a
configuração original de 8 GB. A tabela acima utiliza o valor da especificação;
ambos se referem ao mesmo hardware pré-Super.*

Para os preços atuais, ver a
[página do produto na loja Juxi](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
(SKU JX00110).

A partir do JetPack 7.2.1, a ISO do Jetson grava o kit com a configuração Super
por predefinição *(página de descarregamentos do JetPack)*. As unidades
instaladas pela primeira vez com a ISO do JetPack 7.2 podem manter um perfil
não-Super; se faltar o 25W ou o MAXN SUPER, ver a
**[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**.

Na tabela de modos de alimentação do L4T r39.2, a configuração Super lista 15W
(modo 0), 25W (modo 1, predefinido) e MAXN SUPER (modo 2, experimental; apenas
em kits gravados com a configuração Super). O MAXN SUPER coloca a CPU até 1,7
GHz, a GPU até 1020 MHz e o controlador de memória a 3199 MHz. Leia o modo com
`sudo /usr/sbin/nvpmodel -q`; defina-o com
`sudo /usr/sbin/nvpmodel -m <mode_id>`. As páginas do kit da NVIDIA indicam «7W
a 25W»; a tabela do r39.2 lista os três modos acima — verifique a sua unidade em
**[Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system)**. *(página Power and
Performance do L4T r39.2)*

## Especificações do módulo

| Item | Especificação |
|---|---|
| Desempenho de IA | Até 67 TOPS INT8 esparsos (33 densos) na configuração Super |
| GPU | Arquitetura NVIDIA Ampere, 1024 núcleos CUDA, 32 Tensor Cores, até 1020 MHz |
| CPU | Arm Cortex-A78AE v8.2 de 6 núcleos (64 bits), 1,5MB L2 + 4MB L3, até 1,7 GHz |
| Memória | 8GB LPDDR5 de 128 bits, 102 GB/s |
| Armazenamento | Ranhura para cartão microSD na parte inferior do módulo; suporte para SSD NVMe externo |
| Descodificação de vídeo | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Codificação de vídeo | 1080p30 com 1–2 núcleos de CPU (sem hardware de codificação dedicado) |
| Aceleradores de IA | Sem DLA e sem PVA — a inferência é executada nos Tensor Cores da GPU |
| Fator de forma do módulo | SO-DIMM de 260 pinos, 69,6 mm x 45 mm |

*Fontes: folha de dados do Jetson Orin Nano Super Developer Kit (dezembro
2024); página de especificações do NVIDIA Jetson Orin; página Power and
Performance do L4T r39.2.*

## Números de peça

| Número de peça | O que designa |
|---|---|
| P3766 | O kit completo Jetson Orin Nano Developer Kit |
| P3767 | O System on Module (SOM) |
| P3768 | A placa portadora de referência |
| P3767-0005 | SKU do módulo no kit de desenvolvedor (Jetson Orin Nano 8GB, «só para desenvolvimento») |

Esta série de documentação cobre **apenas o kit de desenvolvimento de 8GB**. O módulo Orin Nano 8GB comercial é outra referência (**P3767-0003**) e um alvo separado nas ferramentas de flashing — ver a nota sobre o SKU do módulo em [Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates).

## Onde se situa na família Orin

- **Jetson Orin Nano 8GB — este kit.** O ponto de entrada da família Orin: 67 TOPS INT8, 8GB de memória unificada, 7W a 25W.
- **Jetson Orin NX.** A mesma placa portadora pode alimentar, testar e desenvolver com módulos Orin NX (requerem dissipador e ventoinha próprios; um módulo novo de fábrica tem de ser gravado a partir de um anfitrião Ubuntu com o SDK Manager). *(Guia do Utilizador do Kit de Desenvolvedor — How-To)*
- **Jetson AGX Orin — o nível de topo.** O módulo AGX Orin 32GB atinge 241 TOPS em Modo Super *(destaques de lançamento do JetPack 7.2)*. Ver a [série Jetson AGX Orin](/pt-pt/tutorials/jetson-agx-orin/quick-start) da Juxi.

A principal restrição a planear é os **8GB de memória unificada**; sem DLA nem
PVA, as cargas de trabalho de IA correm apenas na GPU — ver
**[Eficiência de memória](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency)** e
**[Inferência local de LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm)**.

## Para que serve o kit de desenvolvedor

- **Prototipagem para produção.** O JetPack 7.2.1 serve toda a família Orin, pelo que o trabalho feito no kit é transferível para os módulos Orin usados em produtos. *(página de descarregamentos do JetPack)*
- **Visão computacional.** Dois conectores de câmara MIPI CSI; o DeepStream SDK 9.1 consta da matriz de componentes do JetPack 7.2.1 — ver **[Análise de vídeo com DeepStream](/pt-pt/tutorials/jetson-orin-nano/deepstream)**.
- **IA generativa local.** A alegação de destaque é uma melhoria de 1,7x em IA generativa; o teto de 8GB condiciona o que cabe — ver **[Inferência local de LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm)**.
- **Robótica.** Os funcionários da NVIDIA recomendam o ROS 2 Jazzy para o JetPack 7.2.1 — ver **[Robótica (ponto de situação)](/pt-pt/tutorials/jetson-orin-nano/robotics)**.

> **Nota da Juxi:** os produtos de produção são construídos sobre *módulos*
> Jetson Orin — Orin Nano 8GB ou um Orin NX — numa placa portadora
> personalizada. O kit de desenvolvedor é o veículo de desenvolvimento, não a
> peça de produção.

## Conteúdo da caixa

A caixa contém o kit de desenvolvedor (módulo Orin Nano 8GB com dissipador, na
placa portadora de referência), uma fonte de alimentação de 19 V, o cartão sem
fios 802.11ac/ab/gn incluído e um cartão de início rápido e de suporte. A NVIDIA
afirma que o kit «não inclui armazenamento removível na caixa». *(Folha de
dados; Início rápido)*

Tem de fornecer:

- **Armazenamento** — um cartão microSD (64GB, UHS-1 ou superior) ou um SSD NVMe. A ranhura microSD fica na **parte inferior do módulo**; insira-o antes de ligar. O pacote da loja Juxi já inclui um cartão microSD de 64 GB, pelo que só precisa de comprar armazenamento se recebeu a caixa NVIDIA simples ou se preferir um SSD NVMe.
- **Uma unidade USB de instalação** — 16GB ou superior. Grave a ISO do JetPack nesta unidade USB, e não num cartão microSD: as imagens de cartão SD foram removidas no JetPack 7.2.
- **Um computador anfitrião** com 25GB ou mais de espaço livre, um monitor DisplayPort e teclado/rato USB para a configuração do ambiente de trabalho. *(Início rápido; Supported Hardware)*

> **Importante** — o firmware de fábrica muito antigo tem de ser atualizado
> primeiro: o JetPack 7.2.1 exige firmware UEFI/QSPI da geração JetPack 6.x. Ver
> o **[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)** e a
> **[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Próximos passos

- **[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)** — da caixa a um sistema JetPack 7.2.1 funcional
- **[Interfaces e layout do hardware](/pt-pt/tutorials/jetson-orin-nano/interfaces)** — todas as portas, ranhuras e conectores
- **[Downloads](/pt-pt/tutorials/jetson-orin-nano/downloads)** — imagens oficiais, ferramentas e ligações de documentação

## Fontes

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (verificado em 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (verificado em 2026-09-26)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (ligado como o anúncio do modo de alimentação Super)
- [Página de especificações dos módulos Jetson Orin e do kit de desenvolvedor da NVIDIA](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Arquivo do JetPack](https://developer.nvidia.com/embedded/jetpack-archive) (verificado em 2026-09-26)
- [Developer Guide do L4T r39.2 — Séries Jetson Orin NX e Orin Nano: adaptação de módulos e bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificado em 2026-09-26)
- [Developer Guide do L4T r39.2 — Plataforma, potência e desempenho](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [Developer Guide do L4T r38.2.1 — Configuração de partições (SKUs de módulo)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, ligada a partir de nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificado em 2026-09-26)
- [Página do produto na loja da Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA nas datas indicadas; ainda não verificado em hardware físico
pela Juxi Technology.*

**Créditos das imagens:** imagem do produto proveniente do *Jetson Orin Nano
Developer Kit User Guide* oficial da NVIDIA (descarregado em 2026-09-26),
© NVIDIA Corporation.

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
