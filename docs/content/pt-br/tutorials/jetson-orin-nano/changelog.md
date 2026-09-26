---
title: Registro de alterações
sidebar_label: Registro de alterações
slug: /appendix/changelog
description: >-
  Atualizações deste conjunto de documentação e o histórico de versões do
  JetPack para o kit de desenvolvedor NVIDIA Jetson Orin Nano Super.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Registro de alterações

## Atualizações da documentação

| Data | Alteração |
|---|---|
| 2026-09-26 | Conjunto de documentação inicial publicado como rascunho: Início rápido, Gravação e atualizações, Verifique seu sistema, Visão geral do produto, Interfaces e Layout de Hardware, FAQ, Solução de problemas, Downloads, o guia de migração JetPack 6.x → 7.2, cinco tutoriais (Inferência de LLM local, Eficiência de memória, DeepStream, Robótica, IA agêntica), Glossário e este Registro de alterações. Escrito com base na documentação oficial da NVIDIA para o JetPack 7.2.1; ainda não verificado em hardware físico. |

## Versões do JetPack para este kit

| JetPack | Jetson Linux (L4T) | Data | Observações |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Atual.** A ISO agora grava o kit de desenvolvedor Orin Nano com a configuração do Modo Super por padrão, o que resolve o problema do r39.2 em que unidades atualizadas via ISO permaneciam no perfil de energia anterior. |
| 7.2 | 39.2.0 | 2026-06 | Primeira versão do JetPack 7 para a família Orin (Ubuntu 24.04, kernel 6.8, CUDA 13.x). Problema conhecido nesta versão: unidades atualizadas via Jetson ISO não passavam para o Modo Super por padrão — veja [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | A linha JetPack 6 deste kit (Ubuntu 22.04). Foi onde o modo de energia "Super" foi introduzido — o mesmo hardware, com clocks de CPU/GPU/memória mais altos e o modo de 25 W. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Versões anteriores do JetPack 6. |
| 5.1.3 | 35.x | 2023–2024 | Linha de firmware mais antiga ainda referenciada hoje: o caminho de atualização do JetPack 6.x usa uma imagem de ponte 5.1.3 para levar kits muito antigos ao firmware da geração JetPack 6.x antes de o JetPack 7 poder ser instalado. |

Históricos completos: [Arquivo do JetPack](https://developer.nvidia.com/embedded/jetpack-archive) · [Arquivo do Jetson Linux](https://developer.nvidia.com/embedded/jetson-linux-archive)

Para atualizar o seu kit, consulte **[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**;
para verificar o que está em execução, consulte **[Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system)**.

## Fontes

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Notas de versão do Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)
- [NVIDIA JetPack 6.2 traz o Super Mode para os módulos Jetson Orin Nano e Jetson Orin NX](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (linkado como o anúncio do modo de energia Super)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação oficial
da NVIDIA nas datas indicadas; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
