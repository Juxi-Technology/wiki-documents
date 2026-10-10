---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Perguntas frequentes sobre o kit de desenvolvedor NVIDIA Jetson AGX Orin
  (64GB) — o que vem na caixa, configuração, tela e energia, software e suporte.
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

# FAQ

## Configuração

**O que vem na caixa?**
Módulo Jetson AGX Orin e placa portadora de referência, módulo Wi-Fi, fonte de
alimentação USB Type-C e um cabo USB Type-C para USB Type-A. Você fornece o
monitor (DisplayPort), teclado/mouse e, opcionalmente, um cabo Ethernet — consulte o
[Início rápido](/pt-br/tutorials/jetson-agx-orin/quick-start).

**O kit vem com sistema operacional?**
Sim — a eMMC já vem pré-gravada e o kit inicializa direto na área de trabalho do
Ubuntu. As unidades podem vir com uma versão mais antiga do L4T; o caminho de
atualização recomendado é a Jetson ISO (não requer PC host). Consulte o
[Início rápido](/pt-br/tutorials/jetson-agx-orin/quick-start).

**Preciso de um PC separado para configurá-lo?**
Não, não para o caminho recomendado — a Jetson ISO é instalada a partir de um
pen drive. Um PC host (Ubuntu) só é necessário para os métodos de instalação
alternativos (SDK Manager / script de gravação) ou para a configuração inicial
sem monitor. Consulte [Gravação e atualizações](/pt-br/tutorials/jetson-agx-orin/flashing-and-updates).

**Qual é a versão de software atual?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2). Confira o que o seu kit executa com
[Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system).

## Tela e energia

**Posso conectar meu monitor HDMI?**
Somente por meio de um adaptador ou cabo DisplayPort→HDMI **ativo** — o kit tem
apenas saída DisplayPort (sem porta HDMI, sem DP-over-USB-C). Há suporte a MST
para até dois monitores. Detalhes: [Interfaces e Layout de Hardware](/pt-br/tutorials/jetson-agx-orin/interfaces).

**Como forneço energia ao kit?**
Use a fonte de alimentação USB-C incluída na porta USB-C acima do conector DC (J24).
Se você fornecer sua própria energia pelo conector barrel (J41): 5,5 mm OD,
2,5 mm ID, positivo no centro.

## Usando o kit

**Este kit de desenvolvedor pode emular outros módulos Jetson?**
Sim. O kit de desenvolvedor compartilha a arquitetura do SoC com todos os módulos
Jetson Orin e pode ser regravado para emular as características de desempenho e
energia do AGX Orin, Orin NX ou Orin Nano. Ele é enviado configurado para a
série AGX Orin.

**Este é o módulo que eu usaria em um produto de produção?**
Não. Produtos de produção são construídos sobre **módulos** Jetson Orin
(64 GB / 32 GB / Industrial) na sua própria placa portadora ou na de um parceiro.
O kit de desenvolvedor é o veículo de desenvolvimento e prototipagem.

**Ele pode executar grandes modelos de linguagem / IA agêntica?**
Sim — esse é um caso de uso central da plataforma Orin. Com o JetPack 7.2, o NVIDIA
NemoClaw pode ser instalado com um único comando nos kits de desenvolvedor para
orquestração de modelos locais e na nuvem, e o [Jetson AI Lab](https://www.jetson-ai-lab.com)
publica tutoriais práticos.

**Para robótica: o Isaac ROS está disponível no JetPack 7.2?**
Sim — o Isaac ROS oferece suporte ao Jetson Orin no JetPack 7.2 desde a versão
**4.6.0** (2026-08-18), com um walkthrough oficial de configuração para o AGX
Orin. Observe que a página de downloads do JetPack da NVIDIA ainda mostra
"em breve": o Isaac ROS é lançado independentemente do JetPack, portanto suas
próprias notas de versão são a fonte que prevalece. Para a versão e a escolha
da distribuição ROS 2 (4.6.x = Jazzy, 5.0 = Lyrical) e as restrições conhecidas,
consulte [Robótica (situação atual)](/pt-br/tutorials/jetson-agx-orin/robotics).

## Suporte e serviço

**Onde posso obter ajuda técnica?**
- Dúvidas sobre a plataforma: [Fóruns de Desenvolvedores Jetson da NVIDIA](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — pesquise primeiro; inclua a saída do seu `cat /etc/nv_tegra_release`.
- Suporte técnico da Juxi Technology: **support@juxitech.com**
- Pedidos, garantia e RMA: **support@juxitech.com** (para agilizar, inclua o número do seu pedido)
- Vendas e orçamentos: **sales@juxitech.com**
- Dúvidas sobre produtos (seleção, compatibilidade): **pe@juxitech.com**

**Onde posso obter acessórios (armazenamento NVMe, câmeras, energia)?**
Explore o catálogo de produtos da Juxi Technology em **<https://wiki.juxitech.com/products/>** —
ele inclui acessórios relevantes para Jetson, como a
[câmera CSI IMX219](https://wiki.juxitech.com/products/imx219-csi-camera)
(feita para NVIDIA Jetson), câmeras USB com foco automático e
[câmeras de profundidade RealSense](https://wiki.juxitech.com/products/realsense-depth-camera).
Para orientação, entre em contato com sales@juxitech.com.

## Fontes

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23)

*Status: revisado em 2026-10-11.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
