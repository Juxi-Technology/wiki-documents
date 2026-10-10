---
title: Downloads e ligações oficiais
sidebar_label: Downloads
slug: /downloads
description: >-
  Ligações diretas para os recursos oficiais do JetPack 7.2.1 / Jetson Linux
  39.2.1 para o kit de desenvolvimento Jetson AGX Orin — imagens, ferramentas,
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

# Downloads e ligações oficiais

Tudo nesta página remete para **recursos oficiais da NVIDIA** e foi verificado
em **2026-09-23** (foi acrescentado um aviso sobre as versões dos componentes em
2026-09-26). Para atualizações, considere as duas primeiras ligações como os
pontos de partida canónicos.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) — **hub canónico** para informações de versão e downloads. ⚠️ **A sua tabela de componentes está desatualizada linha a linha**: em 2026-09-26 ainda apresenta valores do JetPack **7.2** para o VPI e o PVA, e a sua linha do Isaac ROS ainda diz “brevemente” (lançado desde a 4.6.0). Para as versões que um sistema JetPack 7.2.1 realmente instala, use [o repositório de pacotes da NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — consulte [Verificar o sistema](/pt-pt/tutorials/jetson-agx-orin/verify-your-system).
- [Imagem ISO do JetPack (r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — a imagem de instalação USB utilizada no nosso [Início rápido](/pt-pt/tutorials/jetson-agx-orin/quick-start)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — ferramenta de gravação a partir do PC anfitrião
- [Imagens Yocto para o Jetson AGX Orin](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — receitas e imagens oficiais Yocto/OpenEmbedded
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive) — versões mais antigas

## Documentação

- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — a referência principal para este kit
  - [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — novidades e **problemas conhecidos**
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — suporte de gravação, segurança, desenvolvimento de câmaras, OTA
- [Jetson Linux API Reference](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [Camera Development Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- Especificação da placa portadora: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — listada na [página de downloads](https://developer.nvidia.com/embedded/downloads) da NVIDIA

## Ferramentas e contas

- [Balena Etcher](https://etcher.balena.io) — grava a ISO do Jetson numa pen USB (Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — adesão (gratuita) necessária para descarregar o SDK Manager
- [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — suporte oficial da comunidade

## Aprendizagem e IA agêntica (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — tutoriais práticos para executar modelos de IA no Jetson
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — IA agêntica no Jetson; instalação com um único comando suportada desde o JetPack 7.2
- [Jetson Device-side Skills](https://github.com/jetson-device-skills) · [Jetson BSP Skills](https://github.com/jetson-bsp-skills) — competências de agente reutilizáveis da NVIDIA

## Juxi Technology

- **Catálogo de produtos e acessórios:** <https://wiki.juxitech.com/products/> — complementos para o seu kit (câmaras, braços robóticos, sensores e muito mais), com especificações e ligações de compra
- **Contactos:** suporte técnico — support@juxitech.com · vendas — sales@juxitech.com · questões de produto — pe@juxitech.com
- Os scripts de introdução e o código de exemplo da Juxi serão adicionados aqui assim que estiverem disponíveis.

## Fontes

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23; aviso sobre a tabela de componentes em 2026-09-26)
- [Repositório de pacotes da NVIDIA — índice Packages do r39.2 arm64](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — fonte autoritativa para as versões dos componentes instalados (verificado em 2026-09-26)

*Estado: revisado em 2026-10-11.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
