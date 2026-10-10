---
title: Downloads e ligações oficiais
sidebar_label: Downloads
slug: /downloads
description: >-
  Um índice verificado das transferências e da documentação oficiais da NVIDIA
  para o Jetson Orin Nano Super Developer Kit (8GB) no JetPack 7.2.1 /
  L4T r39.2.1, além de recursos de parceiros e dos pontos de entrada da Juxi
  Technology.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Downloads e ligações oficiais

Esta página é um índice das transferências e da documentação oficiais da NVIDIA
para o **Jetson Orin Nano Super Developer Kit (8GB)** no **JetPack 7.2.1 /
Jetson Linux (L4T) r39.2.1**, além de alguns recursos de parceiros e dos pontos
de entrada da Juxi Technology. Todas as ligações foram verificadas em
**2026-09-26**.

Dois factos específicos do Orin Nano são importantes antes de transferir seja o
que for:

- **Sem imagem de cartão SD.** A partir do JetPack 7.2, o kit é instalado a
  partir da Jetson ISO gravada numa unidade flash USB. Não há imagem de cartão
  SD, e a ISO não deve ser gravada num cartão microSD.
- **Requisito de firmware.** O JetPack 7.2.1 exige firmware UEFI/QSPI da
  geração JetPack 6.x no kit. Se o seu kit ainda tiver firmware de fábrica mais
  antigo, conclua primeiro o JetPack 6.x Update Path.

> **Sugestão da Juxi:** O fluxo completo de configuração está no [Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start). As opções de gravação e atualização são comparadas em [Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates).

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — a página principal do JetPack: notas de versão, a tabela oficial de versões dos componentes e todas as ligações de transferência do JetPack 7.2.1.

> ⚠️ **Não confie nessa tabela de componentes linha a linha.** A NVIDIA não a
> atualizou totalmente para o 7.2.1: a linha do CUDA foi atualizada, mas as
> duas linhas ao lado não — o VPI ainda apresenta o valor do JetPack 7.2
> (**4.1.3, quando o 7.2.1 inclui, na verdade, o 4.1.4**) e a linha do Isaac ROS
> ainda diz «brevemente», embora o Isaac ROS suporte o Orin no JetPack 7.2
> desde o seu lançamento de agosto de 2026. Para as versões dos componentes,
> considere o repositório de pacotes da NVIDIA a fonte autoritativa: o
> metapacote fixa cada componente através da sua cadeia de dependências —
> [Packages do r39.2 arm64](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages),
> onde `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` →
> `libnvvpi4 (= 4.1.4)` (verificado em 2026-09-26). As versões dos componentes
> também estão listadas em [Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system).
- [Jetson ISO para o r39.2.1 (transferência direta)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — a imagem de instalação do JetPack 7.2.1; a página Início rápido do kit referencia-a como "Direct Download Link: Jetson ISO (r39.2.1)". Grave-a numa unidade flash USB de 16 GB ou mais. Não é publicado nenhum checksum junto da transferência.
- [NVIDIA SDK Manager documentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — instale e utilize a ferramenta de PC anfitrião para gravar o kit, atualizar o firmware e instalar componentes do JetPack (é necessária uma conta do NVIDIA Developer Program); o fluxo do kit está em [BSP Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) — versões anteriores do JetPack, incluindo o JetPack 7.2 (a primeira versão 7.x que suporta a família Orin) e a linha JetPack 6.x.

## Documentação

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — a referência principal para este kit.
  - [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — as novidades do JetPack 7.2.1, a declaração de GA e a lista de problemas conhecidos.
- [Jetson Linux r39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — notas de versão do JetPack 7.2.
- [Jetson Linux Developer Guide (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — destinos de gravação, configuração de partições e as tabelas de alimentação e desempenho da plataforma.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — a lista da própria NVIDIA com mais recursos para este kit (JetPack SDK, Developer Guide, documentação do SDK Manager, Jetson Download Center, Jetson AI Lab, fóruns de desenvolvedores, Jetson Ecosystem).
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) — o índice de transferências da NVIDIA para Jetson; o guia do kit aponta para aqui para a Carrier Board Specification e a lista de componentes suportados. Algumas partes exigem início de sessão na NVIDIA.

## Frameworks de IA e tutoriais

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — a pilha de inferência de LLMs no dispositivo da NVIDIA para Jetson. O Orin é um destino oficialmente suportado, apenas com FP16, INT8 e INT4 ([matriz de suporte](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [modelos suportados](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — análise de vídeo no Jetson; o DeepStream 9.1 é a versão que suporta a família Orin no JetPack 7.2 ([Quickstart](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Contentores Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — um centro gerido por parceiros com tutoriais práticos para executar modelos de IA no Jetson, incluindo um [passo a passo do TensorRT Edge-LLM para o Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [SBSA wheel index (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — índice alojado por um parceiro com wheels Python aarch64 para o JetPack 7.2 / CUDA 13.2; funcionários da NVIDIA apontam para este índice para as wheels Python desta versão.

## Juxi Technology

- **Wiki:** [wiki.juxitech.com](https://wiki.juxitech.com/) — esta série de documentação; o [catálogo de produtos](https://wiki.juxitech.com/products/) lista câmaras, sensores e acessórios para kits Jetson.
- **Loja:** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — a listagem da loja Juxi para este kit (SKU JX00110).
- **Contactos:** suporte técnico — support@juxitech.com · vendas — sales@juxitech.com · questões sobre produtos — pe@juxitech.com.

## Fontes

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) e [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) — ⚠️ a tabela de componentes está desatualizada linha a linha; ver o aviso acima (verificado em 2026-09-26)
- [Repositório de pacotes da NVIDIA — índice Packages do r39.2 arm64](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — a fonte autoritativa para as versões dos componentes, através das fixações de dependência nos metapacotes (verificado em 2026-09-26)
- Notas de versão do Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-26)
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (verificado em 2026-09-26)
- [NVIDIA SDK Manager documentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (verificado em 2026-09-26)
- [TensorRT Edge-LLM documentation](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA wheel index](https://pypi.jetson-ai-lab.io/sbsa/cu130) (verificado em 2026-09-26)
- [Página de produto da loja da Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) e [wiki](https://wiki.juxitech.com/) (verificado em 2026-09-26)

*Estado: revisado em 2026-10-11.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
