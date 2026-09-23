---
title: Migração do JetPack 6.x para o JetPack 7.2
sidebar_label: Migrar do JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  O que muda entre o JetPack 6.x e o JetPack 7.2.1 no kit de desenvolvimento
  Jetson AGX Orin, o que tem de ser recompilado e uma ordem de migração
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
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
review_owner: cheny
---

# Migração do JetPack 6.x para o JetPack 7.2

Esta página destina-se aos utilizadores existentes do JetPack 6.x no kit de
desenvolvimento AGX Orin. Kits novos: comece antes pelo
[Início rápido](/pt-pt/tutorials/jetson-agx-orin/quick-start).

## O que muda

| Camada | Era do JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (a versão 6.2 usava a 36.4.x) | **39.2.1** |
| SO / sistema de ficheiros raiz | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel Linux | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.1** |
| TensorRT | 10.x (era 6.x) | **10.16.2** |

> Os valores da coluna do JetPack 6.x são ilustrativos (era do JetPack 6.2).
> Confirme as **suas** versões atuais exatas com `cat /etc/nv_tegra_release`
> antes de planear, e consulte o [Arquivo JetPack](https://developer.nvidia.com/embedded/jetpack-archive)
> da NVIDIA para obter detalhes de cada versão.

## Novidades para o Orin na linha 7.2

Das notas de lançamento do Jetson Linux 39.2:

- A **família Jetson Orin junta-se à linha de software JetPack 7** (a mesma
  geração do Thor).
- **Instalação ISO unificada** — um método de instalação por pen USB, sem
  necessidade de PC anfitrião.
- Instalação do **NemoClaw** com um único comando para fluxos de trabalho de
  IA agêntica.
- **Receitas Yocto/OpenEmbedded** oficiais (OE4T) para imagens de produção
  personalizadas.
- Pilha de câmaras: **SIPL API v2.0** (GMSL e CoE) — note que esta versão tem
  **alterações de ABI**: os drivers UDDF compilados para o JetPack 7.1 têm de
  ser recompilados com os cabeçalhos do JetPack 7.2.
- *(O Super Mode / MAXN_SUPER do AGX Orin 32GB é específico da versão de 32GB
  e não se aplica ao kit de 64GB. As alterações de SBSA e MIG dizem respeito
  ao Jetson Thor.)*

## O que não pode ser transferido — planeie recompilar

- **Módulos de kernel fora da árvore (out-of-tree)** — o kernel passou para a
  versão 6.8; os módulos têm de ser recompilados com os novos cabeçalhos.
- **Drivers de câmara e personalizações da árvore de dispositivos (device
  tree)** — recompile para a versão 39.2; o SIPL 2.0 traz também alterações de
  ABI para os drivers UDDF.
- **Motores TensorRT** — os motores serializados estão ligados à versão do
  TensorRT; recompile com o TensorRT 10.16.2 no dispositivo de destino.
- **Binários CUDA** — recompile com o CUDA 13; não conte com a portabilidade
  dos binários 12.x.
- **Contentores** — mude para imagens compatíveis com o JetPack 7 (por
  exemplo, contentores NGC atualizados).
- **Ambientes Python e serviços de sistema** — recrie para o Ubuntu 24.04 (os
  nomes de pacotes, os repositórios e as versões dos interpretadores mudaram).

## Ordem de migração recomendada

1. **Confirme que a sua pilha de software é suportada** na 7.2.1 *antes* de
   apagar seja o que for — verifique cada componente de que depende na
   [lista de componentes do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads)
   da NVIDIA (por exemplo, o Isaac ROS está listado como “brevemente” para
   esta versão).
2. **Faça uma cópia de segurança:** dados das aplicações, ficheiros de
   calibração dos sensores, volumes dos contentores, fontes da árvore de
   dispositivos, scripts de compilação do TensorRT/modelos ONNX.
3. **Grave o JetPack 7.2.1** ([Gravação e atualizações](/pt-pt/tutorials/jetson-agx-orin/flashing-and-updates))
   e valide: arranque, armazenamento, rede e se o Force Recovery continua a
   funcionar.
4. **Restaure os periféricos:** Wi-Fi, câmaras, CAN ou drivers de fieldbus —
   recompilados para o kernel 6.8.
5. **Recompile** as aplicações CUDA, os plugins do TensorRT e os motores
   TensorRT **no dispositivo de destino**.
6. **Valide primeiro a aplicação no modo de energia original**; só depois
   experimente outros modos de desempenho.
7. **Registe as linhas de base:** utilização de memória, temperaturas,
   consumo de energia, latência, débito — antes de passar a produção.

## Reversão

- Antes de apagar, guarde uma **cópia de referência funcional** do seu sistema
  atual (uma imagem NVMe/eMMC de reserva ou, no mínimo, os dados do passo 2).
- O instalador ISO pode instalar qualquer versão do L4T para a qual tenha o
  suporte de instalação — guarde a pen USB do instalador antigo se puder
  precisar de voltar atrás.
- Para frotas: implemente por fases e prefira arquiteturas com um caminho de
  recuperação independente (USB de recuperação + imagem de cópia de segurança)
  em vez de atualizações no local.

## Fontes

- [Notas de lançamento do Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, problemas conhecidos (verificado em 2026-09-23)
- [Transferências do JetPack SDK — lista de componentes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — fonte secundária; utilizada para organizar os tópicos da migração (verificado em 2026-09-23)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology. A lista de recompilação descreve consequências padrão da
plataforma (alterações de versão do kernel/TensorRT/CUDA) — valide em função
da sua própria pilha.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
