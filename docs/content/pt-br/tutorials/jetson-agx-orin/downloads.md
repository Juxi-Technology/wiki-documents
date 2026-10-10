---
title: Downloads e links oficiais
sidebar_label: Downloads
slug: /downloads
description: >-
  Links diretos para os recursos oficiais do JetPack 7.2.1 / Jetson Linux 39.2.1
  para o kit de desenvolvedor Jetson AGX Orin — imagens, ferramentas,
  documentação e recursos da comunidade.
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: component table lags on some rows (VPI/PVA still show 7.2 values) — see the caveat in the body
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: authoritative source for installed component versions
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
review_owner: cheny
---

# Downloads e links oficiais

Tudo nesta página aponta para **recursos oficiais da NVIDIA** e foi verificado
em **2026-09-23** (uma ressalva sobre as versões dos componentes foi adicionada
em 2026-09-26). Para atualizações, considere os dois primeiros links como os
pontos de partida canônicos.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [Downloads e notas de versão do JetPack SDK](https://developer.nvidia.com/embedded/jetpack/downloads) — **hub canônico** para informações de lançamento e downloads. ⚠️ **A tabela de componentes dessa página está desatualizada linha a linha**: em 2026-09-26, ela ainda traz valores do JetPack **7.2** para VPI e PVA, e a linha do Isaac ROS ainda diz "em breve" (lançado desde o 4.6.0). Para as versões que um sistema JetPack 7.2.1 realmente instala, use o [repositório apt do Jetson da NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — consulte [Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system).
- [Imagem ISO do JetPack (r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — a imagem de instalação via USB usada no nosso [Início rápido](/pt-br/tutorials/jetson-agx-orin/quick-start)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — ferramenta de gravação no PC host
- [Imagens Yocto para o Jetson AGX Orin](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — receitas e imagens oficiais do Yocto/OpenEmbedded
- [Arquivo do JetPack](https://developer.nvidia.com/embedded/jetpack-archive) · [Arquivo do Jetson Linux](https://developer.nvidia.com/embedded/jetson-linux-archive) — versões anteriores

## Documentação

- [Guia do usuário do kit de desenvolvedor Jetson AGX Orin](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — a referência principal para este kit
  - [Início rápido](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [Instalação do BSP](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Configuração do JetPack SDK](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [Layout do hardware](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Notas de versão do Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — o que há de novo e **problemas conhecidos**
- [Guia do desenvolvedor do Jetson Linux](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — suporte à gravação, segurança, desenvolvimento de câmera, OTA
- [Referência da API do Jetson Linux](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [Guia de desenvolvimento de câmera](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- Especificação da placa portadora: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — listada na [página de downloads](https://developer.nvidia.com/embedded/downloads) da NVIDIA

## Ferramentas e contas

- [Balena Etcher](https://etcher.balena.io) — grava a ISO do Jetson em um pen drive (Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — associação (gratuita) necessária para baixar o SDK Manager
- [Fóruns de desenvolvedores NVIDIA Jetson](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — suporte oficial da comunidade

## Aprendizado e IA agêntica (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — tutoriais práticos para executar modelos de IA no Jetson
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — IA agêntica no Jetson; instalação com um único comando desde o JetPack 7.2
- [Habilidades do lado do dispositivo Jetson](https://github.com/jetson-device-skills) · [Habilidades de BSP do Jetson](https://github.com/jetson-bsp-skills) — habilidades de agente reutilizáveis da NVIDIA

## Juxi Technology

- **Catálogo de produtos e acessórios:** <https://wiki.juxitech.com/products/> — complementos para o seu kit (câmeras, braços robóticos, sensores e muito mais), com especificações e links de compra
- **Contatos:** suporte técnico — support@juxitech.com · vendas — sales@juxitech.com · dúvidas sobre produtos — pe@juxitech.com
- Scripts de introdução e código de exemplo da Juxi serão adicionados aqui conforme forem disponibilizados.

## Fontes

- [Downloads e notas de versão do JetPack SDK](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23; ressalva sobre a tabela de componentes em 2026-09-26)
- [Repositório apt do Jetson da NVIDIA — índice Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — autoritativo para as versões dos componentes instalados (verificado em 2026-09-26)

*Status: revisado em 2026-10-11.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação oficial da NVIDIA.
