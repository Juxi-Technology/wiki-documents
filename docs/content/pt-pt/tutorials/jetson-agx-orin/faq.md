---
title: Perguntas frequentes (FAQ)
sidebar_label: FAQ
slug: /support/faq
description: >-
  Perguntas frequentes sobre o kit de desenvolvimento NVIDIA Jetson AGX Orin
  (64GB) — conteúdo da caixa, configuração, ecrã e alimentação, software e
  suporte.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Perguntas frequentes (FAQ)

## Configuração

**O que vem na caixa?**
Módulo Jetson AGX Orin e placa carrier de referência, módulo Wi-Fi, fonte de
alimentação USB Type-C e um cabo USB Type-C para USB Type-A. O monitor
(DisplayPort), o teclado/rato e, opcionalmente, um cabo Ethernet são fornecidos
por si — consulte o [Início rápido](/pt-pt/tutorials/jetson-agx-orin/quick-start).

**O kit vem com sistema operativo?**
Sim — o eMMC vem pré-gravado e o kit arranca diretamente para o ambiente de
trabalho Ubuntu. As unidades podem vir com uma versão L4T mais antiga; o
caminho de atualização recomendado é a ISO do Jetson (sem necessidade de PC
anfitrião). Consulte o [Início rápido](/pt-pt/tutorials/jetson-agx-orin/quick-start).

**Preciso de um PC separado para o configurar?**
Não, não para o caminho recomendado — a ISO do Jetson instala-se a partir de
uma pen USB. Um PC anfitrião (Ubuntu) só é necessário para os métodos de
instalação alternativos (SDK Manager / script de gravação) ou para a
configuração inicial sem ecrã. Consulte
[Gravação e atualizações](/pt-pt/tutorials/jetson-agx-orin/flashing-and-updates).

**Qual é a versão de software atual?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2). Verifique o que o seu kit executa com
[Verificar o sistema](/pt-pt/tutorials/jetson-agx-orin/verify-your-system).

## Ecrã e alimentação

**Posso ligar o meu monitor HDMI?**
Só através de um adaptador ou cabo DisplayPort→HDMI **ativo** — o kit tem
apenas uma saída DisplayPort (sem porta HDMI, sem DP sobre USB-C). O MST é
suportado para até dois ecrãs. Detalhes: [Interfaces e layout do hardware](/pt-pt/tutorials/jetson-agx-orin/interfaces).

**Como alimentar o kit?**
Utilize a fonte de alimentação USB-C incluída, na porta USB-C acima da tomada
DC (J24). Se fornecer a sua própria alimentação através da tomada tipo barril
(J41): 5,5 mm OD, 2,5 mm ID, positivo ao centro.

## Utilização do kit

**Este kit de desenvolvimento pode emular outros módulos Jetson?**
Sim. O kit de desenvolvimento partilha a arquitetura de SoC com todos os
módulos Jetson Orin e pode ser regravado para emular o desempenho e as
características de potência do AGX Orin, Orin NX ou Orin Nano. Vem configurado
de fábrica para a série AGX Orin.

**É este o módulo que utilizaria num produto de produção?**
Não. Os produtos de produção são construídos sobre **módulos** Jetson Orin
(64 GB / 32 GB / Industrial), numa placa carrier sua ou de um parceiro. O kit
de desenvolvimento é o veículo de desenvolvimento e prototipagem.

**Pode executar grandes modelos de linguagem / IA agêntica?**
Sim — é um dos casos de uso centrais da plataforma Orin. Com o JetPack 7.2, o
NVIDIA NemoClaw pode ser instalado com um único comando nos kits de
desenvolvimento, para orquestração de modelos locais e na nuvem, e o
[Jetson AI Lab](https://www.jetson-ai-lab.com) publica tutoriais práticos.

**Para robótica: o Isaac ROS está disponível no JetPack 7.2?**
Sim — o Isaac ROS suporta o Jetson Orin no JetPack 7.2 desde a versão
**4.6.0** (2026-08-18), com um guia de configuração passo a passo
oficial para o AGX Orin. Note que a página de transferências do JetPack da
NVIDIA ainda mostra "brevemente": o Isaac ROS é lançado independentemente do
JetPack, pelo que as suas próprias notas de versão são a fonte de referência.
Para a versão e a escolha da distribuição do ROS 2 (4.6.x = Jazzy,
5.0 = Lyrical) e as restrições conhecidas, consulte
[Robótica no JetPack 7.2](/pt-pt/tutorials/jetson-agx-orin/robotics).

## Suporte e assistência

**Onde posso obter assistência técnica?**
- Questões sobre a plataforma: [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — pesquise primeiro; inclua o resultado de `cat /etc/nv_tegra_release`.
- Suporte técnico da Juxi Technology: **support@juxitech.com**
- Encomendas, garantia e RMA: **support@juxitech.com** (para agilizar, inclua o número da sua encomenda)
- Vendas e orçamentos: **sales@juxitech.com**
- Questões sobre produtos (seleção, compatibilidade): **pe@juxitech.com**

**Onde posso adquirir acessórios (armazenamento NVMe, câmaras, alimentação)?**
Consulte o catálogo de produtos da Juxi Technology em **<https://wiki.juxitech.com/products/>** —
inclui acessórios relevantes para Jetson, como a
[câmara CSI IMX219](https://wiki.juxitech.com/products/imx219-csi-camera)
(feita para NVIDIA Jetson), câmaras USB com foco automático e
[câmaras de profundidade RealSense](https://wiki.juxitech.com/products/realsense-depth-camera).
Para aconselhamento, contacte sales@juxitech.com.

## Fontes

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23)

*Estado: revisado em 2026-10-11.*

---

NVIDIA® e Jetson™ são marcas registadas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
