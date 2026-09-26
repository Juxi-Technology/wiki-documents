---
title: Glossário
sidebar_label: Glossário
slug: /appendix/glossary
description: >-
  Termos essenciais do Kit de Desenvolvedor Jetson AGX Orin — do versionamento
  do JetPack e do L4T à gravação, à pilha de IA e à terminologia de
  alimentação.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — component versions per the apt repository below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# Glossário

Os termos sobre os quais os clientes mais perguntam, agrupados por tema. Os
números de versão refletem a versão atual (**JetPack 7.2.1 / L4T 39.2.1**;
versões dos componentes reverificadas em 2026-09-26).

## Plataforma e hardware

| Termo | Significado |
|---|---|
| **Jetson AGX Orin** | A família de módulos de IA de borda da NVIDIA; este kit de desenvolvedor integra o módulo de **64GB**. |
| **Módulo** | A pequena placa com o SoC, a memória e a eMMC que faz o processamento. |
| **Placa portadora** | A placa maior, com todas as portas e conectores; o módulo encaixa nela (conector de 699 pinos, J3). |
| **Kit de Desenvolvedor** | Módulo + placa portadora de referência + módulo Wi-Fi + fonte de alimentação — a plataforma de prototipagem. Os produtos de produção utilizam módulos em placas portadoras personalizadas ou de parceiros. |
| **SoC** | System-on-chip: CPU, GPU e aceleradores integrados num único chip (a NVIDIA designa esta linha por «Tegra»). |
| **TOPS** | Bilião de operações por segundo — uma medida do débito de IA (a família AGX Orin chega aos 275 TOPS). |
| **Tensor Core** | Núcleos da GPU especializados na matemática matricial subjacente às redes neuronais. |
| **eMMC** | Armazenamento flash integrado no módulo; o armazenamento de sistema predefinido. |
| **NVMe** | SSD rápido sobre PCIe, instalado na ranhura M.2 M-Key (J1); pode alojar o sistema. |
| **M.2 (M-Key / E-Key)** | Tipos de ranhura: **M-Key** = SSD NVMe, **E-Key** = módulo Wi-Fi. |
| **CSI / GMSL** | Interfaces de câmara (CSI no conector de câmara J509; GMSL para câmaras de nível automóvel). |
| **DisplayPort (DP)** | A **única** saída de ecrã do kit; suporta MST (até 2 ecrãs) e DSC. |

## Software e versões

| Termo | Significado |
|---|---|
| **JetPack** | O pacote de SDK da NVIDIA para Jetson — sistema operativo, controladores, pilha CUDA e bibliotecas. **Atual: 7.2.1.** |
| **Jetson Linux (L4T)** | O pacote de suporte de placa subjacente ao JetPack: carregador de arranque, kernel, controladores e o sistema de ficheiros raiz do Ubuntu. **Atual: r39.2.1.** |
| **BSP** | «Board support package» — tudo o que é necessário para arrancar e executar a placa. |
| **Sistema de ficheiros raiz (rootfs)** | A parte do sistema operativo em espaço de utilizador (aqui: Ubuntu 24.04). |
| **oem-config** | O assistente de configuração do primeiro arranque (idioma, conta de utilizador, rede). |
| **UEFI** | O firmware/menu de arranque do kit; utilize o respetivo gestor de arranque para escolher o dispositivo de arranque. |
| **QSPI** | Flash de pequena dimensão que contém o firmware de arranque inicial. Durante a instalação via ISO, pode aparecer um pedido de **atualização de cápsula QSPI** — prima `Y` (obrigatório). |
| **Modo Force Recovery** | Modo de arranque especial para gravar a partir de um PC anfitrião. Para entrar: mantenha premido o botão Force Recovery central enquanto liga a alimentação. |
| **Jetson ISO** | A imagem de instalação em pen USB; o caminho de atualização recomendado pela NVIDIA (não é necessário PC anfitrião). |
| **SDK Manager** | A ferramenta gráfica da NVIDIA (PC anfitrião) para gravar o BSP e instalar os componentes do JetPack. |
| **Linux_for_Tegra / flash.sh** | As ferramentas de gravação baseadas em scripts, para utilização avançada/de produção. |
| **OTA** | Over-the-air update — atualizações remotas de software/segurança para dispositivos implementados. |
| **Device tree** | A estrutura de dados que indica ao kernel que hardware está ligado; as árvores de dispositivos personalizadas têm de ser recompiladas para cada versão do L4T. |

**Mapeamento de versões** (a tabela mais útil de memorizar):

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (atual) | **39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.x (geração anterior) | 36.x | 22.04 | 5.15 | 12.x |

Confirme sempre o que um sistema específico executa de facto: `cat /etc/nv_tegra_release`.

## Pilha de IA

| Termo | Significado |
|---|---|
| **CUDA** | O conjunto de ferramentas de computação em GPU da NVIDIA (13.2.2 nesta versão). |
| **cuDNN** | Biblioteca de primitivas otimizadas de aprendizagem profunda (9.20.0). |
| **TensorRT** | Otimizador e ambiente de execução de inferência (10.16.2). |
| **TensorRT engine** | Um ficheiro de modelo compilado, específico do hardware e da versão. Os engines **não** sobrevivem a atualizações de versão — recompile-os. |
| **DeepStream** | SDK para análise de vídeo em múltiplos fluxos (9.1). |
| **VPI** | Vision Programming Interface — processamento de imagem acelerado por hardware (4.1.4). |
| **Holoscan** | Framework de IA em streaming para processamento de sensores em tempo real (3.9.0). |
| **NGC** | O catálogo de contentores e modelos pré-treinados da NVIDIA (catalog.ngc.nvidia.com). |
| **Contentor** | Ambiente de execução isolado e empacotado (Docker); a forma padrão de distribuir software de IA no Jetson. |

## Alimentação e monitorização

| Termo | Significado |
|---|---|
| **nvpmodel** | Ferramenta para alternar entre modos de alimentação. Execute `sudo nvpmodel -q` para ver os modos do seu sistema. |
| **MAXN** | Modo de alimentação de «desempenho máximo» (sem limite de potência). |
| **jetson_clocks** | Fixa as frequências no máximo — para benchmarks, não para utilização contínua predefinida. |
| **tegrastats** | Monitor integrado em tempo real do uso de CPU/GPU/memória. |

## Era JetPack 7

| Termo | Significado |
|---|---|
| **NemoClaw** | Framework de IA agêntica da NVIDIA para Jetson; instalável com um único comando desde o JetPack 7.2. |
| **Jetson agent skills** | Fluxos de trabalho de agentes reutilizáveis que a NVIDIA publica para tarefas do lado do dispositivo e do BSP. |
| **Yocto / OpenEmbedded (OE4T)** | O sistema de compilação de imagens Linux de produção personalizadas e reprodutíveis — com suporte oficial desde a versão 7.2. |
| **SBSA** | Server Base System Architecture — o modelo de servidor Arm com que a linha Jetson **Thor** se alinha (não este kit). |
| **MIG** | Multi-Instance GPU — particionar uma GPU em instâncias isoladas (Jetson Thor, pré-visualização técnica). |

## Fontes

- [Repositório apt da NVIDIA para Jetson — versões efetivas dos componentes](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (verificado em 2026-09-26) — através da cadeia de dependências do `nvidia-jetpack` 7.2.1; a tabela de resumo da [página de transferências do JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) está desatualizada (ainda apresenta CUDA 13.2.1 / VPI 4.1.3)
- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (verificado em 2026-09-24)

*Estado: rascunho, pendente de revisão por cheny. Definições compiladas a partir
da documentação da NVIDIA e do uso padrão da indústria; os números de versão
foram verificados na data indicada.*

---

NVIDIA® e Jetson™ são marcas registadas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
