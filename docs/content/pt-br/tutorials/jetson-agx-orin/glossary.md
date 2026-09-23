---
title: Glossário
sidebar_label: Glossário
slug: /appendix/glossary
description: >-
  Termos-chave do kit de desenvolvedor Jetson AGX Orin — do versionamento do
  JetPack e do L4T à gravação, à pilha de IA e à terminologia de energia.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Glossário

Os termos sobre os quais os clientes mais perguntam, agrupados por tema. Os
números de versão refletem a versão atual (**JetPack 7.2.1 / L4T 39.2.1**,
verificados em 2026-09-24).

## Plataforma e hardware

| Termo | Significado |
|---|---|
| **Jetson AGX Orin** | A família de módulos de IA de borda da NVIDIA; este kit de desenvolvedor traz o módulo de **64GB**. |
| **Módulo** | A placa pequena com o SoC, a memória e a eMMC que faz o processamento. |
| **Placa portadora** | A placa maior com todas as portas e conectores; o módulo se encaixa nela (conector de 699 pinos, J3). |
| **Kit de Desenvolvedor** | Módulo + placa portadora de referência + módulo Wi-Fi + fonte de alimentação — a plataforma de prototipagem. Produtos de produção usam módulos em placas portadoras personalizadas ou de parceiros. |
| **SoC** | System-on-chip (sistema em um chip): CPU, GPU e aceleradores integrados em um único chip (a NVIDIA chama a linha de "Tegra"). |
| **TOPS** | Trilhões de operações por segundo — uma medida da capacidade de processamento de IA (a família AGX Orin chega a 275 TOPS). |
| **Tensor Core** | Núcleos de GPU especializados na matemática de matrizes por trás das redes neurais. |
| **eMMC** | Armazenamento flash embarcado no módulo; o armazenamento de sistema padrão. |
| **NVMe** | SSD rápido sobre PCIe, instalado no slot M.2 M-Key (J1); pode hospedar o sistema. |
| **M.2 (M-Key / E-Key)** | Tipos de slot: **M-Key** = SSD NVMe, **E-Key** = módulo Wi-Fi. |
| **CSI / GMSL** | Interfaces de câmera (CSI no conector de câmera J509; GMSL para câmeras de nível automotivo). |
| **DisplayPort (DP)** | A **única** saída de display do kit; suporta MST (até 2 monitores) e DSC. |

## Software e versões

| Termo | Significado |
|---|---|
| **JetPack** | O pacote de SDK da NVIDIA para Jetson — SO, drivers, pilha CUDA e bibliotecas. **Atual: 7.2.1.** |
| **Jetson Linux (L4T)** | O board support package por baixo do JetPack: bootloader, kernel, drivers e o sistema de arquivos raiz do Ubuntu. **Atual: r39.2.1.** |
| **BSP** | "Board support package" (pacote de suporte de placa) — tudo o que é necessário para inicializar e executar a placa. |
| **Sistema de arquivos raiz (rootfs)** | A parte do SO no espaço do usuário (aqui: Ubuntu 24.04). |
| **oem-config** | O assistente de configuração da primeira inicialização (idioma, conta de usuário, rede). |
| **UEFI** | O firmware/menu de inicialização do kit; use o gerenciador de inicialização dele para escolher um dispositivo de inicialização. |
| **QSPI** | Flash pequena que guarda o firmware dos primeiros estágios de inicialização. Durante a instalação via ISO, pode aparecer um aviso de "**atualização de cápsula QSPI**" — pressione `Y` (obrigatório). |
| **Modo Force Recovery** | Modo de inicialização especial para gravar a partir de um PC host. Para entrar: mantenha pressionado o botão central Force Recovery enquanto conecta a fonte de alimentação. |
| **Jetson ISO** | A imagem de instalação em pen drive USB; o caminho de atualização recomendado pela NVIDIA (não exige PC host). |
| **SDK Manager** | A ferramenta com GUI da NVIDIA (PC host) para gravar o BSP e instalar os componentes do JetPack. |
| **Linux_for_Tegra / flash.sh** | As ferramentas de gravação baseadas em scripts, para uso avançado/de produto. |
| **OTA** | Over-the-air update (atualização remota) — atualizações remotas de software/segurança para dispositivos em campo. |
| **Árvore de dispositivos (device tree)** | A estrutura de dados que informa ao kernel qual hardware está conectado; árvores de dispositivos personalizadas precisam ser recompiladas para cada versão do L4T. |

**Correspondência de versões** (a tabela mais útil de memorizar):

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (atual) | **39.2.1** | **24.04** | **6.8** | **13.2.1** |
| 6.x (geração anterior) | 36.x | 22.04 | 5.15 | 12.x |

Verifique sempre o que um sistema específico realmente executa: `cat /etc/nv_tegra_release`.

## Pilha de IA

| Termo | Significado |
|---|---|
| **CUDA** | O conjunto de ferramentas de computação com GPU da NVIDIA (13.2.1 nesta versão). |
| **cuDNN** | Biblioteca de primitivas otimizadas de aprendizado profundo (9.20.0). |
| **TensorRT** | Otimizador e runtime de inferência (10.16.2). |
| **Motor TensorRT** | Um arquivo de modelo compilado, específico de hardware/versão. Os motores **não** sobrevivem a atualizações de versão — recompile-os. |
| **DeepStream** | SDK para análise de vídeo com múltiplos fluxos (9.1). |
| **VPI** | Vision Programming Interface — processamento de imagens acelerado por hardware (4.1.3). |
| **Holoscan** | Framework de streaming de IA para processamento de sensores em tempo real (3.9.0). |
| **NGC** | O catálogo de contêineres e modelos pré-treinados da NVIDIA (catalog.ngc.nvidia.com). |
| **Contêiner** | Ambiente de execução isolado e empacotado (Docker); a forma padrão de distribuir software de IA no Jetson. |

## Energia e monitoramento

| Termo | Significado |
|---|---|
| **nvpmodel** | Ferramenta para alternar entre modos de energia. Execute `sudo nvpmodel -q` para ver os modos do seu sistema. |
| **MAXN** | Modo de energia de "desempenho máximo" (sem limite de potência). |
| **jetson_clocks** | Fixa os clocks no máximo — para benchmarks, não para uso padrão contínuo. |
| **tegrastats** | Monitor ao vivo integrado do uso de CPU/GPU/memória. |

## A era do JetPack 7

| Termo | Significado |
|---|---|
| **NemoClaw** | O framework de IA agêntica da NVIDIA para Jetson; instalável com um único comando desde o JetPack 7.2. |
| **Habilidades de agente do Jetson** | Fluxos de trabalho de agente reutilizáveis que a NVIDIA publica para tarefas no dispositivo e no BSP. |
| **Yocto / OpenEmbedded (OE4T)** | O sistema de compilação para imagens Linux de produção personalizadas e reproduzíveis — com suporte oficial desde 7.2. |
| **SBSA** | Server Base System Architecture — o modelo de servidor Arm com o qual a linha Jetson **Thor** se alinha (não este kit). |
| **MIG** | Multi-Instance GPU — particionar uma GPU em instâncias isoladas (Jetson Thor, prévia técnica). |

## Fontes

- [JetPack SDK Downloads — component versions](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado em 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (consultado em 2026-09-24)

*Status: rascunho, pendente de revisão por cheny. Definições compiladas a partir
da documentação da NVIDIA e do uso padrão do setor; os números de versão foram
verificados na data indicada.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
