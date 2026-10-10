---
title: Pipelines de análise de vídeo — DeepStream 9.1
sidebar_label: Análise de vídeo com DeepStream
slug: /tutorials/deepstream
description: >-
  Execute o NVIDIA DeepStream 9.1 no kit de desenvolvedor Jetson Orin Nano
  Super (8GB) — correspondência de versões, instalação, limites de
  descodificação, memória e saída RTSP sem monitor.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# Pipelines de análise de vídeo — DeepStream 9.1

O DeepStream é o SDK da NVIDIA para criar pipelines acelerados de análise de
vídeo inteligente (IVA), e o DeepStream 9.1 é a versão que é executada no
Jetson Orin com o JetPack 7.2. Esta página aborda a correspondência de versões,
as vias de instalação, os limites de descodificação, o que esperar da primeira
execução, a saída RTSP sem monitor e notas de memória para o kit de
desenvolvedor Orin Nano Super de 8 GB.

## 1. Correspondência de versões

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2** (imagem Docker `deepstream:9.1`), conforme
listado na tabela *Platform and OS Compatibility* do
[Guia de instalação do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html).

O DeepStream 8.0 e o 9.0 listavam **apenas o AGX Thor**; o 9.1 é a primeira
versão 9.x cuja linha inclui o Jetson Orin ("AGX Thor, Jetson Orin") — a linha
refere **"Jetson Orin"** como grupo; linhas anteriores (DS 6.3 a DS 7.1)
nomeavam explicitamente "Orin nano". Não foi encontrada nenhuma nota de versão
do 9.1 que confirme especificamente o Orin Nano — considere o suporte como
implícito na designação do grupo (ainda não confirmado). Kit de base: JetPack
7.2.1 / L4T r39.2.1.

## 2. O que este kit consegue descodificar

O descodificador
[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
utiliza o motor de hardware NVDEC e suporta **H.264, H.265, AV1, JPEG e
MJPEG**. Capacidades publicadas do módulo Orin Nano:

| Capacidade | Especificação |
|---|---|
| Descodificação de vídeo (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Codificação de vídeo | Sem codificador de hardware — «1080p30 suportado por 1-2 núcleos de CPU» |
| DLA · PVA | Nenhum |

A inferência é executada no plugin
[Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
sobre motores TensorRT: modelos FP16, FP32 e INT8 (FP16 e INT8 dependem da
plataforma); o INT8 requer um ficheiro de calibração. A opção `enable-dla` do
plugin não tem motor de destino neste módulo — a página de produto do Orin
Nano lista "DL Accelerator: -" e "Vision Accelerator: -".

**A 8 GB:** os fotogramas descodificados, os motores e a memória da aplicação
partilham um único conjunto, sem DLA para onde descarregar trabalho. O exemplo
de "30 fluxos" abaixo descodifica 30 fluxos 1080p; a capacidade de
descodificação publicada deste módulo é 11x 1080p30 (H.265), pelo que deve
planear menos fluxos ou menor resolução. Também **não existe codificador de
vídeo por hardware** — a saída codificada (por exemplo, streaming RTSP) é
executada na CPU.

## 3. Instalação — Docker primeiro

O guia da NVIDIA afirma: «Recomendado para novos utilizadores: utilize o
Método 4 (contentor Docker) para a configuração mais rápida e sem
dependências.» Os quatro métodos para Jetson:

| Método | O que é |
|---|---|
| 1 — SDK Manager | Selecione **DeepStreamSDK** em "Additional SDKs" juntamente com os componentes do JetPack 7.2 GA. |
| 2 — pacote tar | `deepstream_sdk_v9.1.0_jetson.tbz2`, um recurso de lançamento no GitHub. |
| 3 — pacote Debian | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (recomendado) | Contentores Jetson no NGC (`nvcr.io`). |

Os contentores Jetson são
`nvcr.io/nvidia/deepstream:9.1-samples-multiarch` (aplicações de referência,
modelos e configurações de exemplo) e
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (mais bibliotecas de
desenvolvimento e backends Triton). Pré-requisitos: `docker-ce`, o NVIDIA
Container Toolkit, uma conta NGC e `docker login nvcr.io` (nome de utilizador
`$oauthtoken`, palavra-passe = a sua chave de API NGC).

> **Importante**: a NVIDIA afirma: «Os contentores Docker para Jetson
> destinam-se apenas à implementação. Não suportam o desenvolvimento de
> software DeepStream dentro de um contentor.» Compile as aplicações
> nativamente no kit e adicione os seus binários à sua própria imagem.

No Docker, execute em vez disso o `user_additional_install.sh` (ver a nota
sobre EOS abaixo). A mensagem "Failed to detect NVIDIA driver version" do
contentor Triton é inofensiva.

> **Dica da Juxi:** para uma instalação mínima do sistema anfitrião, selecione
> apenas "Jetson OS" no SDK Manager e depois execute `sudo apt install
> docker.io`, `sudo apt install nvidia-container`, `sudo apt install
> nvidia-l4t-gstreamer` e `sudo service docker restart`.

## 4. Aumentar as frequências — com um modo de alimentação específico do kit

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Citado do início rápido: «Para os módulos Jetson Orin Nano, utilize
sudo nvpmodel -m 2 em vez de -m 0 para ativar o modo MAXN SUPER. Para
todos os outros módulos Jetson Orin (incluindo o Orin NX), utilize -m 0.»
Execute estes comandos antes de executar aplicações DeepStream. Num kit de
8 GB configurado como Super, os modos de alimentação são **15W (modo 0)**,
**25W (modo 1, predefinido)** e **MAXN_SUPER (modo 2)**; o MAXN_SUPER existe
apenas em unidades gravadas com a configuração Super.

> **Atenção**: se faltarem os modos 25W / MAXN SUPER, ou se `nvpmodel -m 2`
> indicar um modo de alimentação inválido, a unidade não foi gravada com a
> configuração Super. Consulte [Resolução de
> problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

## 5. Primeira execução — os motores TensorRT são compilados na primeira utilização

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Citado do início rápido: para um modelo sem ficheiro de motor existente, «pode
demorar até alguns minutos (dependendo da plataforma e do modelo) para gerar o
ficheiro e iniciar a aplicação. Para execuções posteriores, estes ficheiros de
motor gerados podem ser reutilizados para um carregamento mais rápido». As
métricas de FPS desfilam no terminal. O «(~30 FPS para esta configuração)» do
início rápido é o valor genérico da documentação — **não é uma medição do Orin
Nano**. Se a aplicação não conseguir criar elementos Gst, limpe a cache e
tente novamente: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`.
Outras configurações de exemplo abrangem câmaras USB e CSI e rastreamento com
inferência secundária.

## 6. Funcionamento sem monitor com saída RTSP

O início rápido documenta como executar sem ecrã: as configurações
predefinidas utilizam o renderizador `nveglglessink` baseado em EGL (`type=2`
nos grupos `[sink]`), que requer um servidor X em execução. Em vez disso,
acrescente um grupo de sink de saída RTSP — o grupo `[sink2]` em
`source30_1080p_dec_infer-resnet_tiled_display.txt` é o exemplo — e defina
`enable=0` para o grupo de sink EGL. A saída RTSP codificada é executada na
CPU (Secção 2: sem codificador de hardware).

> **Nota da Juxi:** com fluxos RTSP, a aplicação pode ficar presa a chegar ao
> EOS (um problema do `rtpjitterbuffer`). Em bare metal, execute o
> `update_rtpmanager.sh` em `/opt/nvidia/deepstream/deepstream/` uma vez,
> depois de instalar os pacotes de dependências do início rápido. No Docker,
> execute em vez disso o `user_additional_install.sh`.

## 7. Planeamento de memória para 8 GB

O blogue da NVIDIA sobre eficiência de memória afirma: «No módulo Jetson Orin
Nano 8 GB, dos 8 GB de DRAM física, cerca de 7.6 GB são utilizáveis após as
reservas do firmware e do kernel.» A CPU e a GPU partilham este conjunto.
Alavancas documentadas para pipelines ao estilo do DeepStream:

| Alavanca | Memória que pode ser recuperada |
|---|---|
| Executar em bare metal em vez de um contentor | Até 70 MB |
| Passar de aplicações Python para C++ | Até 84 MB |
| Desativar o Tiler/OSD e usar FakeSink | Até 258 MB |
| **Total** | **412 MB** |

Desativar o Tiler/OSD e usar o FakeSink «remove etapas de visualização
necessárias para a apresentação, mas desnecessárias em implementações sem
monitor ou de produção. Isto poupa memória, reduz a carga da GPU e melhora o
débito.» Isto combina com o percurso RTSP sem monitor acima; desativar o
ambiente de trabalho gráfico pode libertar até 865 MB. Para o manual completo
dos 8 GB, consulte [Eficiência de memória para
8 GB](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency).

## O que a NVIDIA não publica para este kit

A página oficial de desempenho do DeepStream 9.1 para Jetson abrange apenas
duas plataformas: **Jetson AGX Thor** e **Jetson AGX Orin**. Não são
publicados números de FPS para o Orin Nano; não leia as linhas do AGX Orin
como desempenho do Orin Nano. Para dimensionar, comece pela capacidade de
descodificação (Secção 2) e reduza o número de fluxos e a resolução até o
pipeline caber.

Para o dado publicado mais próximo, os [benchmarks Jetson da
Ultralytics](https://docs.ultralytics.com/guides/nvidia-jetson/) indicam o
YOLO26n no Orin Nano Super a ~4.57 ms/imagem (~219 FPS) com um motor TensorRT
FP16 e ~3.80 ms/imagem (~263 FPS) com INT8, a 640 de entrada — **dados do
fornecedor, medidos em software da era JetPack 6.1, não na pilha 7.2.1 deste
kit**; o tempo de inferência exclui o pré/pós-processamento. Segundo a mesma
fonte, apenas os formatos de exportação PyTorch, TorchScript e TensorRT
utilizam a GPU — os outros formatos de exportação são executados na CPU.

## Resolução de problemas e leitura adicional

- Problemas ao nível do sistema (modos de alimentação, armazenamento, ecrã):
  [Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting) ·
  [Eficiência de memória para
  8 GB](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency).
- Modelos fora do DeepStream: [Inferência local de
  LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm) ·
  referência oficial de desempenho:
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Fontes

- [Guia de instalação do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificado em 2026-09-26)
- [Guia de início rápido do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (verificado em 2026-09-26)
- [Contentores Docker do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (verificado em 2026-09-26)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (verificado em 2026-09-26)
- [Gst-nvvideo4linux2 (descodificador de hardware)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (verificado em 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (verificado em 2026-09-26)
- [Módulos Jetson Orin — especificações de descodificação, codificação e aceleradores](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (blogue de desenvolvedores)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Guia de desenvolvedores do Jetson Linux r39.2 — Energia e desempenho](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [Ultralytics — guia NVIDIA Jetson (benchmarks do fornecedor)](https://docs.ultralytics.com/guides/nvidia-jetson/) (verificado em 2026-09-26)

*Estado: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
