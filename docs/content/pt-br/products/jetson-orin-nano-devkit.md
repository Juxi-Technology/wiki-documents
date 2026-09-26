---
title: Kit de Desenvolvedor Jetson Orin Nano Super (8GB)
category: compute-vision
description: Kit de desenvolvedor NVIDIA Jetson Orin Nano Super (8GB) — IA de borda de até 67 INT8 TOPS, memória unificada de 8 GB, opções de armazenamento microSD e NVMe, com documentação completa do JetPack 7.2.1 da Juxi Technology.
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Kit de Desenvolvedor Jetson Orin Nano Super (8GB)

> **[Comprar na loja](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## Visão geral

O Kit de Desenvolvedor NVIDIA® Jetson Orin Nano™ Super é o kit de
desenvolvedor compacto da família Jetson Orin — um pequeno computador de IA
para construir projetos de visão computacional, robótica e IA generativa na
borda. A Juxi Technology vende o kit oficial da NVIDIA em sua caixa original,
com uma série completa de documentação para a base de software JetPack 7.2.1 /
L4T r39.2.1.

Destaques:

- **Até 67 INT8 TOPS** de desempenho de IA (esparso; 33 denso) e até **1,7x de melhoria em IA generativa** em relação ao kit original *(NVIDIA)*
- **Memória LPDDR5 de 8 GB, 128 bits, a 102 GB/s** *(NVIDIA)* — memória unificada compartilhada pela CPU, GPU e todas as aplicações; 8 GB é o teto absoluto para qualquer carga de trabalho
- **GPU de arquitetura NVIDIA Ampere com 1024 núcleos e 32 Tensor Cores** e CPU Arm Cortex-A78AE de 6 núcleos a até 1,7 GHz *(NVIDIA)*
- **O "Super" é uma atualização de software, não um novo silício** — os kits de desenvolvedor Orin Nano existentes ganham os clocks mais altos de GPU, memória e CPU com a atualização do JetPack *(NVIDIA)*
- **Potência configurável de 7 W a 25 W** *(NVIDIA)* — o modo de energia padrão é 25 W
- **Sem eMMC e sem armazenamento incluído pela NVIDIA** — o slot microSD fica na **parte inferior do módulo**, além de dois slots M.2 Key-M para SSDs NVMe *(NVIDIA)*; o pacote da Juxi adiciona um cartão microSD de 64 GB
- **Software atual: JetPack 7.2.1** (Jetson Linux / L4T r39.2.1) *(NVIDIA)* — instalado com o método Jetson ISO a partir de um pen drive; não é necessário um PC host com Ubuntu separado
- **Caixa original oficial, vendida pela Juxi Technology** — o pacote adiciona um adaptador de energia de 19 V, um cabo de força, um cartão microSD de 64 GB e o módulo Wi-Fi M.2

**Casos de uso**: LLMs locais pequenos e IA generativa, análise de vídeo com
DeepStream, robótica e desenvolvimento com ROS 2, educação e prototipagem.

## Especificações

| Categoria | Especificação |
|---|---|
| Kit | NVIDIA Jetson Orin Nano Super Developer Kit — módulo P3767 + placa portadora P3768; número de peça do kit completo P3766 *(NVIDIA)* |
| Desempenho de IA | Até 67 INT8 TOPS (esparso) / 33 INT8 TOPS (denso); até 1,7x de melhoria em IA generativa em relação ao kit original *(NVIDIA)* |
| GPU | Arquitetura NVIDIA Ampere, 1024 núcleos CUDA + 32 Tensor Cores; até 1.020 MHz *(NVIDIA)* |
| CPU | Arm Cortex-A78AE v8.2 de 6 núcleos, 64 bits; até 1,7 GHz; cache de 1,5 MB L2 + 4 MB L3 *(NVIDIA)* |
| Memória | LPDDR5 de 8 GB, 128 bits, 102 GB/s *(NVIDIA)* — compartilhada entre CPU, GPU e aplicações |
| Armazenamento | Sem eMMC. Slot para cartão microSD na parte inferior do módulo (armazenamento principal) + 2x slots M.2 Key-M NVMe: 2280 (PCIe 3.0 x4) e 2230 (PCIe 3.0 x2) *(NVIDIA)* |
| Vídeo | Decodificação de até 1x 4K60 (H.265), 2x 4K30, 5x 1080p60 ou 11x 1080p30; codificação em 1080p30 usando 1-2 núcleos de CPU (sem codificador de hardware dedicado) *(NVIDIA)* |
| Display | 1x DisplayPort 1.2 (+MST) — a única saída de vídeo; a porta USB-C não emite sinal de vídeo *(NVIDIA)*. Listagem da loja: "DP 1.2, até 4K@60Hz" — as páginas consultadas da NVIDIA não informam uma resolução máxima de display |
| Rede | 1x Ethernet Gigabit (RJ45) *(NVIDIA)*; módulo sem fio M.2 Key-E incluído, descrito pela NVIDIA como "controlador de interface de rede sem fio 802.11ac/ab/gn" *(NVIDIA)*. Listagem da loja: Wi-Fi 5 dual-band 2.4/5 GHz + Bluetooth 5.0 (as páginas da NVIDIA não informam uma versão de Bluetooth — trate o Bluetooth 5.0 como não verificado) |
| I/O | 4x USB 3.2 Type-A (10 Gbps, em dois conectores duplos empilhados), 1x USB-C (somente dados; modos Host, Device e USB Recovery), header de 40 pinos (UART, SPI, I2S, I2C, GPIO), header de botões de 12 pinos, header de ventoinha de 4 pinos, conector de alimentação DC (5,5 mm x 2,5 mm) *(NVIDIA)* |
| Câmera | 2x conectores MIPI CSI (22 posições, passo de 0,5 mm, contato inferior): CAM0 1x2 lanes; CAM1 1x2 ou 1x4 lanes *(NVIDIA)* |
| Alimentação | Configurável de 7 W a 25 W *(NVIDIA)*. Modo padrão: 25 W. O MAXN SUPER é experimental e está disponível apenas quando o kit é gravado com a configuração `jetson-orin-nano-devkit-super` ou `jetson-orin-nano-devkit-super-maxn` *(NVIDIA)* |
| Dimensões | Folha de dados da NVIDIA: 103 x 90,5 x 34,77 mm; tabela de especificações da família NVIDIA: 100 x 79 x 21 mm (em ambas as definições, a altura inclui os pés, a placa portadora, o módulo e a solução térmica). A NVIDIA não conciliou os dois valores; a loja lista 100 x 79 x 21 mm |
| Software | Versão atual: JetPack 7.2.1, incluindo o Jetson Linux (L4T) r39.2.1, instalado com o método Jetson ISO *(NVIDIA)* |
| Na caixa (pacote da loja Juxi) | NVIDIA Jetson Orin Nano Super Developer Kit x1 (caixa original oficial); adaptador de energia de 19 V x1; cabo de força Type B (EUA, JP, CA, PH) x1; cartão microSD de 64 GB x1; módulo Wi-Fi M.2 x1 |
| Na caixa (NVIDIA) | Kit de desenvolvedor (módulo Orin Nano 8GB com dissipador de calor + placa portadora de referência), fonte de alimentação de 19 V, controlador de interface de rede sem fio 802.11ac/ab/gn, Guia de Início Rápido *(NVIDIA)*. Sem armazenamento removível: "O Jetson Orin Nano Developer Kit não inclui armazenamento removível na caixa" *(NVIDIA)* |
| Garantia | 1 ano, apenas para uso em desenvolvimento (listagem da loja) |

*Especificações completas: consulte a folha de dados oficial da NVIDIA para o
kit (com link em nvidia.com).*

> **Nota da Juxi:** Onde a listagem da loja e os números oficiais da NVIDIA
> divergem, esta página usa o valor da NVIDIA e registra a diferença. Itens
> que a loja lista e que as páginas da NVIDIA não confirmam: Bluetooth 5.0 e
> saída de vídeo 4K@60Hz. O cartão microSD de 64 GB incluído chega **sem
> imagem pré-gravada** (em branco); a NVIDIA recomenda um cartão UHS-1 de
> 64 GB ou maior. Planeje uma instalação completa do JetPack — veja Primeiros
> passos abaixo.

## Primeiros passos

1. **Verifique primeiro a versão de firmware.** O JetPack 7.2.1 exige firmware
   UEFI/QSPI Jetson da geração JetPack 6.x (versão mais recente que 36.0). Se o
   seu kit tem firmware de fábrica mais antigo, siga o caminho de atualização
   do JetPack 6.x antes de instalar — veja
   [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).
2. **Reúna o que você precisa fornecer**: um PC ou laptop (Windows, macOS ou
   Linux) com pelo menos 25 GB de espaço livre; um pen drive USB de 16 GB ou
   maior; e um monitor DisplayPort com teclado e mouse USB, ou um cabo serial
   USB-TTL para configuração sem monitor.
3. **Escolha o seu armazenamento**: o cartão microSD de 64 GB incluído (insira-o
   no slot na parte inferior do módulo antes de inicializar) ou o seu próprio
   SSD NVMe em um slot M.2 Key-M.
4. **Grave o instalador**: baixe a Jetson ISO do JetPack 7.2.1 e grave-a no pen
   drive USB. Nunca grave a ISO em um cartão microSD — imagens de cartão SD não
   são suportadas a partir do JetPack 7.2.
5. **Instale**: inicialize o kit pelo pen drive USB e selecione o armazenamento
   de destino. Confirme o aviso da cápsula de firmware com **Y em até 30
   segundos** — a NVIDIA aponta esta como a etapa mais comumente esquecida.
6. **Primeira inicialização**: conclua a configuração inicial do Ubuntu e
   depois instale os componentes do JetPack.
7. Passo a passo completo: **[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)**

## Documentação (série Jetson Orin Nano)

- [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start) · [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates) · [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system)
- [Visão geral do produto](/pt-br/tutorials/jetson-orin-nano/overview) · [Interfaces & Layout de Hardware](/pt-br/tutorials/jetson-orin-nano/interfaces) · [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting) · [FAQ](/pt-br/tutorials/jetson-orin-nano/faq)
- [Downloads](/pt-br/tutorials/jetson-orin-nano/downloads) · [Migrar do JetPack 6.x](/pt-br/tutorials/jetson-orin-nano/jetpack-6-to-7) · [Glossário](/pt-br/tutorials/jetson-orin-nano/glossary) · [Registro de alterações](/pt-br/tutorials/jetson-orin-nano/changelog)
- [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm) · [Eficiência de memória](/pt-br/tutorials/jetson-orin-nano/memory-efficiency) · [Análise de vídeo com DeepStream](/pt-br/tutorials/jetson-orin-nano/deepstream) · [Robótica (situação atual)](/pt-br/tutorials/jetson-orin-nano/robotics) · [IA agêntica (NemoClaw)](/pt-br/tutorials/jetson-orin-nano/agentic-ai)

## Acessórios recomendados

Explore o [catálogo da Juxi Technology](https://wiki.juxitech.com/products/) —
câmeras (IMX219 CSI, foco automático USB, profundidade RealSense), o
[Jetson Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator)
(listado na loja para Orin NX / Orin Nano SUPER), braços robóticos, sensores e
muito mais.

## Suporte

- 📧 Suporte técnico: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 Reportar problemas na documentação: [GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## Fontes

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (verificado em 2026-09-26)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (verificado em 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (verificado em 2026-09-26)
- [Juxi Technology store product page](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA nas datas indicadas; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
