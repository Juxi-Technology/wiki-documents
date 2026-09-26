---
title: Registo de alterações
sidebar_label: Registo de alterações
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

# Registo de alterações

## Atualizações da documentação

| Data | Alteração |
|---|---|
| 2026-09-26 | Conjunto inicial de documentação publicado como rascunho: Início rápido, Gravação e atualizações, Verificar o sistema, Visão geral do produto, Interfaces e layout do hardware, FAQ, Resolução de problemas, Downloads, o guia de migração do JetPack 6.x → 7.2, cinco tutoriais (LLMs locais, Eficiência de memória, DeepStream, Robótica, IA agêntica), Glossário e este Registo de alterações. Escrito com base na documentação oficial da NVIDIA para o JetPack 7.2.1; ainda não verificado em hardware físico. |

## Versões do JetPack para este kit

| JetPack | Jetson Linux (L4T) | Data | Notas |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Atual.** A ISO passa agora a gravar o Orin Nano Developer Kit com a configuração do modo Super por predefinição, o que resolve o problema da r39.2 em que as unidades atualizadas por ISO ficavam no perfil de alimentação anterior. |
| 7.2 | 39.2.0 | 2026-06 | Primeira versão do JetPack 7 para a família Orin (Ubuntu 24.04, kernel 6.8, CUDA 13.x). Problema conhecido nesta versão: as unidades atualizadas através da Jetson ISO não assumiam o modo Super por predefinição — consulte a [Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | Linha JetPack 6 para este kit (Ubuntu 22.04). Foi aqui que o modo de alimentação "Super" foi introduzido — o mesmo hardware, com frequências de CPU/GPU/memória mais altas e o modo de 25 W. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Versões anteriores do JetPack 6. |
| 5.1.3 | 35.x | 2023–2024 | A linha de firmware mais antiga ainda referenciada hoje: o JetPack 6.x Update Path usa uma imagem-ponte 5.1.3 para levar kits muito antigos ao firmware da geração JetPack 6.x antes de o JetPack 7 poder ser instalado. |

Histórico completo: [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

Para atualizar o seu kit, consulte **[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)**;
para verificar o que está a executar, consulte **[Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system)**.

## Fontes

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)
- [NVIDIA JetPack 6.2 announcement — Super mode for Jetson Orin Nano](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (incluído como o anúncio do fabricante do modo de alimentação Super)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação oficial
da NVIDIA nas datas indicadas; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
