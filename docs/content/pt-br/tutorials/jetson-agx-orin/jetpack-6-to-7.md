---
title: Migrando do JetPack 6.x para o JetPack 7.2
sidebar_label: Migrar do JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  O que muda entre o JetPack 6.x e o JetPack 7.2.1 no kit de desenvolvedor
  Jetson AGX Orin, o que precisa ser recompilado e uma ordem de migração
  recomendada.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Migrando do JetPack 6.x para o JetPack 7.2

Esta página é para usuários existentes do JetPack 6.x no kit de desenvolvedor
AGX Orin. Kits novos: em vez disso, comece pelo
[Início Rápido](/pt-br/tutorials/jetson-agx-orin/quick-start).

## O que muda

| Camada | Era do JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (o 6.2 usava 36.4.x) | **39.2.1** |
| SO / sistema de arquivos raiz | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel do Linux | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (era 6.x) | **10.16.2** |

> Os valores da coluna JetPack 6.x são ilustrativos (era do JetPack 6.2). Confira
> **suas** versões atuais exatas com `cat /etc/nv_tegra_release` antes de
> planejar, e consulte o [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive)
> da NVIDIA para detalhes de cada versão.

## Novidades para o Orin na linha 7.2

Das notas de versão do Jetson Linux 39.2:

- A **família Jetson Orin entra na linha de software JetPack 7** (mesma geração do Thor).
- **Instalação unificada via ISO** — um caminho de instalação por pen drive, sem necessidade de PC host.
- Instalação do **NemoClaw** com um único comando para fluxos de trabalho de IA agêntica.
- **Receitas oficiais do Yocto/OpenEmbedded** (OE4T) para imagens de produção personalizadas.
- Pilha de câmeras: **SIPL API v2.0** (GMSL e CoE) — observe que esta versão tem **mudanças de ABI**: drivers UDDF compilados para o JetPack 7.1 precisam ser recompilados com os cabeçalhos do JetPack 7.2.
- *(O Super Mode / MAXN_SUPER do AGX Orin 32GB é específico do modelo de 32GB e não se aplica ao kit de 64GB. As mudanças de SBSA e MIG se referem ao Jetson Thor.)*

## O que não pode ser reaproveitado — planeje recompilar

- **Módulos de kernel fora da árvore** — o kernel passou para o 6.8; os módulos precisam ser recompilados com os novos cabeçalhos.
- **Drivers de câmera e personalizações de device tree** — recompile para o 39.2; o SIPL 2.0 também traz mudanças de ABI para drivers UDDF.
- **Engines do TensorRT** — os engines serializados estão vinculados à versão do TensorRT; recompile com o TensorRT 10.16.2 no destino.
- **Binários CUDA** — recompile com o CUDA 13; não espere reaproveitar binários 12.x.
- **Contêineres** — passe para imagens compatíveis com o JetPack 7 (por exemplo, contêineres NGC atualizados).
- **Ambientes Python e serviços de sistema** — recrie para o Ubuntu 24.04 (nomes de pacotes, repositórios e versões de interpretador mudaram).

## Ordem de migração recomendada

1. **Confirme que sua pilha de software tem suporte** no 7.2.1 *antes* de apagar qualquer coisa — verifique cada componente do qual você depende na [lista de componentes do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) da NVIDIA. Essa página pode ficar desatualizada para SDKs lançados de forma independente: ela ainda lista o Isaac ROS como "em breve", embora o Isaac ROS 4.6.0 tenha adicionado suporte ao Jetson Orin + JetPack 7.2 (consulte [Robótica no JetPack 7.2](/pt-br/tutorials/jetson-agx-orin/robotics)).
2. **Faça backup:** dados de aplicação, arquivos de calibração de sensores, volumes de contêineres, códigos-fonte de device tree, scripts de compilação do TensorRT/modelos ONNX.
3. **Grave o JetPack 7.2.1** ([Gravação e atualizações](/pt-br/tutorials/jetson-agx-orin/flashing-and-updates)) e valide: inicialização, armazenamento, rede e se o Force Recovery ainda funciona.
4. **Restaure os periféricos:** Wi-Fi, câmeras, CAN ou drivers de fieldbus — recompilados para o kernel 6.8.
5. **Recompile** aplicações CUDA, plugins do TensorRT e engines do TensorRT **no destino**.
6. **Valide sua aplicação primeiro no modo de energia original**; só depois teste outros modos de desempenho.
7. **Registre os valores de referência:** uso de memória, temperaturas, consumo de energia, latência, throughput — antes de ir para produção.

## Reversão

- Antes de apagar, mantenha uma **cópia íntegra e funcional** do seu sistema atual (uma imagem reserva de NVMe/eMMC ou, no mínimo, os dados do passo 2).
- O instalador ISO consegue instalar qualquer versão do L4T para a qual você tenha a mídia — guarde o pen drive do instalador mais antigo caso você venha a precisar voltar.
- Para frotas: faça a implantação em etapas e prefira projetos com um caminho de recuperação independente (USB de recuperação + imagem de backup) a atualizações no local.

## Fontes

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, problemas conhecidos (verificado em 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23) — ⚠️ a tabela de componentes dela está desatualizada em algumas linhas; para as versões que um sistema 7.2.1 realmente instala, consulte [Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — fonte secundária; usada apenas para organizar os temas de migração (verificado em 2026-09-23)

*Status: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico pela
Juxi Technology. A lista de recompilação descreve consequências padrão da
plataforma (mudanças de versão de kernel/TensorRT/CUDA) — valide com a sua
própria pilha.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação oficial da NVIDIA.
