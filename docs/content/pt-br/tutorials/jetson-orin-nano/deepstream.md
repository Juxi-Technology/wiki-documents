---
title: Pipelines de análise de vídeo — DeepStream 9.1
sidebar_label: Análise de vídeo com DeepStream
slug: /tutorials/deepstream
description: >-
  Execute o NVIDIA DeepStream 9.1 no Kit de Desenvolvedor Jetson Orin Nano
  Super (8GB) — pareamento de versões, instalação, limites de decodificação,
  memória e saída RTSP headless.
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

O DeepStream é o SDK da NVIDIA para construir pipelines acelerados de análise
de vídeo inteligente (IVA), e o DeepStream 9.1 é a versão que roda no Jetson
Orin com o JetPack 7.2. Esta página cobre o pareamento de versões, as rotas de
instalação, os limites de decodificação, as expectativas da primeira execução,
a saída RTSP headless e as notas de memória para o Kit de Desenvolvedor Jetson
Orin Nano Super de 8 GB.

## 1. Pareamento de versões

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2** (imagem Docker `deepstream:9.1`), conforme
listado na tabela *Platform and OS Compatibility* do
[Guia de instalação do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html).

O DeepStream 8.0 e o 9.0 listavam **apenas o AGX Thor**; o 9.1 é a primeira
versão 9.x cuja linha inclui o Jetson Orin ("AGX Thor, Jetson Orin") — a linha
diz **"Jetson Orin"** como grupo; linhas anteriores (DS 6.3 a DS 7.1) nomeavam
"Orin nano" explicitamente. Nenhuma nota de versão da 9.1 confirmando
especificamente o Orin Nano foi encontrada — trate o suporte como implícito
pelo rótulo do grupo (ainda não confirmado). Configuração de base: JetPack
7.2.1 / L4T r39.2.1.

## 2. O que este kit consegue decodificar

O decodificador
[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
usa o motor de hardware NVDEC e oferece suporte a **H.264, H.265, AV1, JPEG e
MJPEG**. Capacidades publicadas do módulo Orin Nano:

| Capacidade | Especificação |
|---|---|
| Decodificação de vídeo (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Codificação de vídeo | Sem codificador por hardware — "1080p30 suportado por 1-2 núcleos de CPU" |
| DLA · PVA | Nenhum |

A inferência roda no plugin
[Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
sobre engines do TensorRT: modelos FP16, FP32 e INT8 (FP16 e INT8 dependem da
plataforma); o INT8 precisa de um arquivo de calibração. A opção `enable-dla`
do plugin não tem engine de destino neste módulo — a página do produto Orin
Nano lista "DL Accelerator: -" e "Vision Accelerator: -".

**Com 8 GB:** os quadros decodificados, os engines e a memória da aplicação
compartilham um único pool, sem DLA para descarregar trabalho. O exemplo de
"30 fluxos" abaixo decodifica 30 fluxos 1080p; a capacidade de decodificação
publicada deste módulo é de 11x 1080p30 (H.265), então planeje menos fluxos ou
resolução menor. Também **não há codificador de vídeo por hardware** — a saída
codificada (por exemplo, streaming RTSP) roda na CPU.

## 3. Instalação — Docker primeiro

O guia da NVIDIA diz: "Recomendado para novos usuários: use o Método 4
(contêiner Docker) para a configuração mais rápida e sem dependências." Os
quatro métodos para Jetson:

| Método | O que é |
|---|---|
| 1 — SDK Manager | Selecione **DeepStreamSDK** em "Additional SDKs" junto com os componentes do JetPack 7.2 GA. |
| 2 — Pacote tar | `deepstream_sdk_v9.1.0_jetson.tbz2`, um artefato de release no GitHub. |
| 3 — Pacote Debian | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (recomendado) | Contêineres Jetson no NGC (`nvcr.io`). |

Os contêineres Jetson são o `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`
(aplicativos de referência, modelos e configurações de exemplo) e o
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (mais bibliotecas de
desenvolvimento e backends do Triton). Pré-requisitos: `docker-ce`, o NVIDIA
Container Toolkit, uma conta NGC e `docker login nvcr.io` (usuário
`$oauthtoken`, senha = sua chave de API do NGC).

> **Importante**: a NVIDIA afirma: "Os contêineres Docker para Jetson são
> apenas para implantação. Eles não oferecem suporte ao desenvolvimento de
> software DeepStream dentro de um contêiner." Compile as aplicações
> nativamente no kit e adicione os seus binários à sua própria imagem.

No Docker, execute `user_additional_install.sh` em vez disso (veja a nota
sobre EOS abaixo). A mensagem "Failed to detect NVIDIA driver version" do
contêiner Triton é inofensiva.

> **Dica da Juxi:** para uma instalação mínima no host, selecione apenas
> "Jetson OS" no SDK Manager e execute `sudo apt install docker.io`,
> `sudo apt install nvidia-container`, `sudo apt install nvidia-l4t-gstreamer`
> e `sudo service docker restart`.

## 4. Aumente os clocks — com um modo de energia específico do kit

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Citado do quickstart: "Para módulos Jetson Orin Nano, use sudo nvpmodel -m 2
em vez de -m 0 para habilitar o modo MAXN SUPER. Para todos os outros módulos
Jetson Orin (incluindo o Orin NX), use -m 0." Execute esses comandos antes de
executar os aplicativos do DeepStream. Em um kit de 8 GB configurado como
Super, os modos de energia são **15W (modo 0)**, **25W (modo 1, padrão)** e
**MAXN_SUPER (modo 2)**; o MAXN_SUPER existe apenas em unidades gravadas com a
configuração Super.

> **Atenção**: se 25W / MAXN SUPER estiver faltando, ou se `nvpmodel -m 2`
> reportar um modo de energia inválido, a unidade não foi gravada com a
> configuração Super. Veja [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

## 5. Primeira execução — os engines do TensorRT são compilados no primeiro uso

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Citado do quickstart: para um modelo sem arquivo de engine existente, "pode
levar até alguns minutos (dependendo da plataforma e do modelo) para a geração
do arquivo e o lançamento do aplicativo. Em execuções posteriores, esses
arquivos de engine gerados podem ser reutilizados para um carregamento mais
rápido." As métricas de FPS rolam no terminal. O "(~30 FPS para esta
configuração)" do quickstart é o número genérico da documentação — **não é uma
medição do Orin Nano**. Se o aplicativo não conseguir criar elementos Gst,
limpe o cache e tente novamente:
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. Outras configurações de
exemplo cobrem câmeras USB e CSI e rastreamento com inferência secundária.

## 6. Operação headless com saída RTSP

O quickstart documenta como rodar sem monitor: as configurações padrão usam o
renderizador `nveglglessink` baseado em EGL (`type=2` nos grupos `[sink]`),
que exige um servidor X em execução. Adicione, em vez disso, um grupo de sink
de saída RTSP — o grupo `[sink2]` em
`source30_1080p_dec_infer-resnet_tiled_display.txt` é o exemplo — e defina
`enable=0` para o grupo de sink EGL. A saída RTSP codificada roda na CPU
(Seção 2: sem codificador por hardware).

> **Nota da Juxi:** com fluxos RTSP, o aplicativo pode travar ao chegar ao EOS
> (um problema do `rtpjitterbuffer`). Em bare metal, execute
> `update_rtpmanager.sh` em `/opt/nvidia/deepstream/deepstream/` uma vez,
> depois de instalar os pacotes de dependência do Quickstart. No Docker,
> execute `user_additional_install.sh` em vez disso.

## 7. Planejamento de memória para 8 GB

O blog de eficiência de memória da NVIDIA afirma: "Módulo Jetson Orin Nano
8 GB: dos 8 GB de DRAM física, cerca de 7,6 GB são utilizáveis após as
reservas de firmware e kernel." CPU e GPU compartilham esse pool. Alavancas
documentadas para pipelines no estilo DeepStream:

| Alavanca | Memória que pode ser recuperada |
|---|---|
| Rodar em bare metal em vez de contêiner | Até 70 MB |
| Trocar aplicações Python por C++ | Até 84 MB |
| Desativar Tiler/OSD e usar FakeSink | Até 258 MB |
| **Total** | **412 MB** |

Desativar Tiler/OSD e usar FakeSink "remove etapas de exibição necessárias
para visualização, mas desnecessárias em implantações headless ou de produção.
Isso economiza memória, reduz a carga da GPU e melhora o throughput." Isso se
combina com o caminho RTSP headless acima; desativar o desktop gráfico pode
liberar até 865 MB. Para o manual completo de 8 GB, veja
[Eficiência de memória em 8 GB](/pt-br/tutorials/jetson-orin-nano/memory-efficiency).

## O que a NVIDIA não publica para este kit

A página oficial de desempenho do DeepStream 9.1 para Jetson cobre apenas duas
plataformas: **Jetson AGX Thor** e **Jetson AGX Orin**. Nenhum número de FPS
do Orin Nano é publicado; não leia as linhas do AGX Orin como desempenho do
Orin Nano. Para dimensionar, comece pela capacidade de decodificação
(Seção 2) e depois reduza a contagem de fluxos e a resolução até o pipeline
caber.

Para o dado publicado mais próximo, os
[benchmarks de Jetson da Ultralytics](https://docs.ultralytics.com/guides/nvidia-jetson/)
relatam o YOLO26n no Orin Nano Super a ~4,57 ms/imagem (~219 FPS) com um
engine TensorRT FP16 e ~3,80 ms/imagem (~263 FPS) com INT8, com entrada 640 —
**dados do fabricante, medidos em software da era JetPack 6.1, não na stack
7.2.1 deste kit**; o tempo de inferência exclui o pré/pós-processamento.
Segundo a mesma fonte, apenas os formatos de exportação PyTorch, TorchScript e
TensorRT usam a GPU — outros formatos de exportação rodam na CPU.

## Solução de problemas e leitura adicional

- Problemas em nível de sistema (modos de energia, armazenamento, display):
  [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting) ·
  [Eficiência de memória em 8 GB](/pt-br/tutorials/jetson-orin-nano/memory-efficiency).
- Modelos fora do DeepStream: [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm) ·
  referência oficial de desempenho:
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Fontes

- [Guia de instalação do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificado em 2026-09-26)
- [Guia de início rápido do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (verificado em 2026-09-26)
- [Contêineres Docker do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (verificado em 2026-09-26)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (verificado em 2026-09-26)
- [Gst-nvvideo4linux2 (decodificador de hardware)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (verificado em 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (verificado em 2026-09-26)
- [Módulos Jetson Orin — especificações de decodificação, codificação e aceleradores](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (blog de desenvolvedores)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Guia do desenvolvedor do Jetson Linux r39.2 — Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [Ultralytics — guia NVIDIA Jetson (benchmarks do fabricante)](https://docs.ultralytics.com/guides/nvidia-jetson/) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
