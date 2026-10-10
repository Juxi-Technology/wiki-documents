---
title: Registro de alterações
sidebar_label: Registro de alterações
slug: /appendix/changelog
description: >-
  Atualizações deste conjunto de documentação e o histórico de versões do
  JetPack para o Kit de Desenvolvedor Jetson AGX Orin.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: source for the CUDA 13.2.2 / VPI 4.1.4 correction
review_owner: cheny
---

# Registro de alterações

## Atualizações da documentação

| Data | Alteração |
|---|---|
| 2026-09-26 | **Corrigidas duas versões de componentes para o JetPack 7.2.1: CUDA 13.2.1 → 13.2.2 e VPI 4.1.3 → 4.1.4.** Ambas tinham sido tiradas da página de downloads do JetPack da NVIDIA, cuja tabela resumo ainda traz valores do JetPack **7.2**; as versões foram verificadas pela cadeia de dependências do `nvidia-jetpack` 7.2.1 no repositório apt do Jetson da NVIDIA. Atualizados **Verifique seu sistema** (nota sobre a origem da tabela), o **Glossário**, a **FAQ**, o **guia de migração JetPack 6.x → 7.2** e a página do produto. Também foi adicionada uma ressalva de que "esta tabela está defasada" onde essa página é citada como fonte de versões de componentes (**Downloads**, **Glossário**, **DeepStream**, **guia de migração**). |
| 2026-09-26 | **Corrigido o status do Isaac ROS no JetPack 7.2.** O Isaac ROS 4.6.0 (2026-08-18) adicionou suporte ao Jetson Orin + JetPack 7.2, substituindo o status "em breve" antes tomado da página de downloads do JetPack (que ainda o exibe). Atualizados **Robótica** (nova versão e orientação sobre a distribuição do ROS 2), **Verifique seu sistema**, o **guia de migração JetPack 6.x → 7.2** e a **FAQ**. |
| 2026-09-24 | Adicionados o **Glossário** e este **Registro de alterações**. Adicionadas as informações de contato da Juxi Technology (suporte técnico, vendas, dúvidas sobre produtos) à FAQ, à Solução de problemas e aos Downloads; link para o catálogo de produtos Juxi para acessórios. |
| 2026-09-23 | Conjunto inicial de documentação publicado como rascunho: Início rápido, Gravação e atualizações, Verifique seu sistema, Visão geral do produto, Interfaces e layout de hardware, FAQ, Solução de problemas, Downloads e o guia de migração JetPack 6.x → 7.2. Todas as páginas escritas com base na documentação oficial da NVIDIA. |

## Versões do JetPack para este kit

| JetPack | Jetson Linux (L4T) | Data | Observações |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Atual.** Correções e atualizações de segurança; emulação T3000; habilidades de agente para pipelines de vídeo. |
| 7.2 | 39.2.0 | 2026-06 | Primeira versão que traz a família Jetson Orin para o JetPack 7 (Ubuntu 24.04, kernel 6.8, CUDA 13). |
| 6.x | 36.x | 2024–2025 | Geração anterior (Ubuntu 22.04, kernel 5.15, CUDA 12) — consulte os arquivos se você ainda estiver nela, e o nosso [guia de migração](/pt-br/tutorials/jetson-agx-orin/jetpack-6-to-7). |

Históricos completos: [Arquivo do JetPack](https://developer.nvidia.com/embedded/jetpack-archive) · [Arquivo do Jetson Linux](https://developer.nvidia.com/embedded/jetson-linux-archive)

Para atualizar seu kit, consulte **[Gravação e atualizações](/pt-br/tutorials/jetson-agx-orin/flashing-and-updates)**;
para verificar o que está em execução, consulte **[Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system)**.

## Fontes

- [Downloads do SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-24)
- [Notas de versão do Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-24)

*Status: revisado em 2026-10-11.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
