---
title: Downloads e links oficiais
sidebar_label: Downloads
slug: /downloads
description: >-
  Um índice verificado dos downloads e da documentação oficiais da NVIDIA para o
  kit de desenvolvedor Jetson Orin Nano Super (8GB) no JetPack 7.2.1 / L4T r39.2.1,
  além de recursos de parceiros e dos pontos de entrada da Juxi Technology.
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

# Downloads e links oficiais

Esta página é um índice dos downloads e da documentação oficiais da NVIDIA para
o **kit de desenvolvedor Jetson Orin Nano Super (8GB)** no **JetPack 7.2.1 /
Jetson Linux (L4T) r39.2.1**, além de alguns recursos de parceiros e dos pontos
de entrada da Juxi Technology. Todos os links foram verificados em **2026-09-26**.

Dois fatos específicos do Orin Nano importam antes de você baixar qualquer coisa:

- **Sem imagem de cartão SD.** A partir do JetPack 7.2, o kit é instalado a partir da
  Jetson ISO gravada em um pen drive USB. Não há imagem de cartão SD, e a
  ISO não deve ser gravada em um cartão microSD.
- **Barreira de firmware.** O JetPack 7.2.1 exige firmware UEFI/QSPI da geração
  JetPack 6.x no kit. Se o seu kit ainda tem o firmware de fábrica mais antigo, conclua
  primeiro o caminho de atualização do JetPack 6.x.

> **Dica da Juxi:** O fluxo de configuração completo está no [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start). As opções de gravação e atualização são comparadas em [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — a página principal do JetPack: notas de versão, a tabela oficial de versões dos componentes e todos os links de download do JetPack 7.2.1.

> ⚠️ **Não confie nessa tabela de componentes linha a linha.** A NVIDIA não a atualizou totalmente para o 7.2.1: a linha do CUDA foi atualizada, mas as duas linhas ao lado não — o VPI ainda mostra o valor do JetPack 7.2 (**4.1.3, enquanto o 7.2.1 na verdade traz o 4.1.4**) e a linha do Isaac ROS ainda diz "em breve", embora o Isaac ROS ofereça suporte ao Orin no JetPack 7.2 desde o seu lançamento em agosto de 2026. Para as versões dos componentes, trate o repositório de pacotes da NVIDIA como a fonte autoritativa: o metapacote fixa cada componente por meio de sua cadeia de dependências — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), onde `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (verificado em 2026-09-26). As versões dos componentes também estão listadas em [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system).
- [Jetson ISO do r39.2.1 (download direto)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — a imagem do instalador do JetPack 7.2.1; a página Início rápido do kit a linka como "Direct Download Link: Jetson ISO (r39.2.1)". Grave-a em um pen drive USB de 16 GB ou mais. Nenhum checksum é publicado junto com o download.
- [Documentação do NVIDIA SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — instale e use a ferramenta de PC host para gravar o kit, atualizar o firmware e instalar componentes do JetPack (é necessária uma conta do NVIDIA Developer Program); o fluxo deste kit está em [Configuração do BSP](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [Arquivo do JetPack](https://developer.nvidia.com/embedded/jetpack-archive) — versões anteriores do JetPack, incluindo o JetPack 7.2 (a primeira versão 7.x que suporta a família Orin) e a linha JetPack 6.x.

## Documentação

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — a referência principal para este kit.
  - [Início rápido](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Layout do hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Notas de versão do Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — o que há de novo no JetPack 7.2.1, a declaração de GA e a lista de problemas conhecidos.
- [Notas de versão do Jetson Linux r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — notas de versão do JetPack 7.2.
- [Guia do desenvolvedor do Jetson Linux (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — alvos de gravação, configuração de partições e as tabelas de energia e desempenho da plataforma.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — a própria lista da NVIDIA de recursos adicionais para este kit (JetPack SDK, Developer Guide, documentação do SDK Manager, Jetson Download Center, Jetson AI Lab, fóruns de desenvolvedores, Jetson Ecosystem).
- [Central de Downloads do Jetson](https://developer.nvidia.com/embedded/downloads) — o índice de downloads da NVIDIA para Jetson; o guia do kit aponta para cá para a Carrier Board Specification e a lista de componentes suportados. Partes dele exigem login da NVIDIA.

## Frameworks de IA e tutoriais

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — a pilha de inferência de LLM no dispositivo da NVIDIA para Jetson. O Orin é um alvo oficialmente suportado, apenas com FP16, INT8 e INT4 ([matriz de suporte](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [modelos suportados](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [Guia de instalação do DeepStream 9.1](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — análise de vídeo no Jetson; o DeepStream 9.1 é a versão que suporta a família Orin no JetPack 7.2 ([Guia de início rápido](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Contêineres Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — um hub mantido por parceiros com tutoriais práticos para executar modelos de IA no Jetson, incluindo um [tutorial do TensorRT Edge-LLM para o Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [Índice de wheels SBSA (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — índice hospedado por parceiro com wheels Python aarch64 para JetPack 7.2 / CUDA 13.2; funcionários da NVIDIA apontam para este índice como a fonte dos wheels Python da versão.

## Juxi Technology

- **Wiki:** [wiki.juxitech.com](https://wiki.juxitech.com/) — esta série de documentação; o [catálogo de produtos](https://wiki.juxitech.com/products/) lista câmeras, sensores e acessórios para kits Jetson.
- **Loja:** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — a listagem da loja Juxi para este kit (SKU JX00110).
- **Contatos:** suporte técnico — support@juxitech.com · vendas — sales@juxitech.com · dúvidas sobre produtos — pe@juxitech.com.

## Fontes

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Início rápido](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) e [Arquivo do JetPack](https://developer.nvidia.com/embedded/jetpack-archive) (verificado em 2026-09-26) — ⚠️ a tabela de componentes está desatualizada linha a linha; use o [repositório de pacotes da NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) para as versões dos componentes
- [Repositório de pacotes da NVIDIA — índice r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — autoritativo para as versões dos componentes, por meio das dependências fixadas nos metapacotes (verificado em 2026-09-26)
- Notas de versão do Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-26)
- [Guia do desenvolvedor do Jetson Linux](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (verificado em 2026-09-26)
- [Documentação do NVIDIA SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (verificado em 2026-09-26)
- [Documentação do TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [Guia de instalação do DeepStream 9.1](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [Índice de wheels SBSA](https://pypi.jetson-ai-lab.io/sbsa/cu130) (verificado em 2026-09-26)
- [Página do produto na loja Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) e [wiki](https://wiki.juxitech.com/) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
