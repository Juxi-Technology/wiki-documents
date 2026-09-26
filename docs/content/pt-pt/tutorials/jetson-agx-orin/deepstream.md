---
title: Análise de vídeo com múltiplos fluxos — DeepStream 9.1
sidebar_label: Análise de vídeo com DeepStream
slug: /tutorials/deepstream
description: >-
  Instale o DeepStream 9.1 no kit de desenvolvimento AGX Orin e execute a
  aplicação de referência de análise de vídeo — com as opções oficiais de
  instalação, configurações de exemplo e notas específicas do JP7.2.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# Análise de vídeo com múltiplos fluxos — DeepStream 9.1

O DeepStream é o framework da NVIDIA para criar pipelines acelerados de
análise de vídeo inteligente (IVA), e o **DeepStream 9.1 é fornecido com o
JetPack 7.2** no Jetson Orin. Este tutorial segue a documentação oficial de
instalação e de início rápido da NVIDIA; todos os comandos abaixo são
retirados (ou resumidos diretamente) dessas páginas.

**Correspondência de versões:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔
CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(de acordo
com a tabela de compatibilidade da NVIDIA)*.

## 1. Instalação

A NVIDIA disponibiliza quatro métodos de instalação no Jetson; a nota oficial
recomenda **Docker para novos utilizadores** (o mais rápido, sem dependências):

- **Método 4 — Docker (recomendado para novos utilizadores):** utilize os contentores NGC do DeepStream — consulte [Contentores Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Método 1 — SDK Manager:** selecione **DeepStreamSDK** em "Additional SDKs" juntamente com os componentes do JetPack 7.2 GA.
- **Método 2 — pacote tar:** descarregue `deepstream_sdk_v9.1.0_jetson.tbz2` (de [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)), depois:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Método 3 — pacote Debian:** instale o `deepstream-9.1_9.1.0-1_arm64.deb` com `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Pacotes de pré-requisitos** (lista oficial de dependências para a instalação nativa):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Nota da Juxi:** se encontrar o problema de RTSP documentado (aplicações
> presas em EOS com fluxos RTSP), execute o script `update_rtpmanager.sh` em
> `/opt/nvidia/deepstream/deepstream/` depois de instalar os pacotes acima.

## 2. Aumentar as frequências dos relógios (antes de executar seja o que for)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

A NVIDIA assinala uma exceção: o **Jetson Orin Nano** usa `-m 2` para MAXN
SUPER; todos os outros módulos Orin (incluindo o AGX Orin) usam `-m 0`.
Execute estes comandos antes de executar aplicações DeepStream.

## 3. Executar a aplicação de referência

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

O que esperar (segundo a NVIDIA): uma visualização em mosaico de 30 fluxos
1080p simulados com inferência ResNet, e métricas de desempenho — **~30 FPS
para esta configuração** — impressas no terminal. Clique num mosaico para
ampliar; clique com o botão direito para voltar à vista em mosaico.

Ficheiros de configuração úteis para explorar (todos nesse diretório):

| Configuração | Caso de utilização |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | Teste de referência com 30 fluxos |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Rastreamento + inferência secundária |
| `source1_usb_dec_infer_resnet.txt` | **Câmara USB única** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | Configurações com **câmara CSI** (o suporte de drivers depende da sua câmara) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Exemplo de demux |

Notas do início rápido oficial:

- **A primeira execução com um novo modelo demora minutos**, enquanto o motor TensorRT é gerado; as execuções seguintes reutilizam-no.
- Se os elementos do GStreamer não conseguirem inicializar, limpe a cache: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Funcionamento sem monitor (headless):** o sink EGL predefinido precisa de um ecrã. Em vez disso, as configurações suportam um **sink de saída RTSP** (veja o grupo `[sink2]` na configuração de 30 fluxos) — transmita os resultados para outra máquina.
- Todas as aplicações de exemplo pré-compiladas encontram-se em `/opt/nvidia/deepstream/deepstream-9.1/samples/` — cada uma tem um README.

## 4. Novidades em torno do DeepStream 9.1 no JetPack 7.2

- **Pipelines assistidos por agentes:** a NVIDIA documenta um *DeepStream Coding Agent* (suporte de agentes de IA para criar pipelines) — [documentação](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM no pipeline:** as aplicações de referência incluem um **deepstream-vllm-plugin** para combinar pipelines de vídeo com raciocínio de modelos de grande dimensão — consulte [a documentação](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html). Para inferência de modelos no próprio dispositivo fora do DeepStream, consulte [Inferência LLM local](/pt-pt/tutorials/jetson-agx-orin/local-llm).
- **Triton no dispositivo:** para executar o Triton Inference Server nativamente (sem Docker), execute `sudo ./triton_backend_setup.sh` no diretório de exemplos (instala o Triton 2.68.0 para o Jetson).

## Resolução de problemas e leitura adicional

- [Resolução de problemas e FAQ do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Otimização de desempenho](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — necessária depois de ultrapassar as configurações de referência
- [Configurações de exemplo explicadas](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- Problemas ao nível do sistema (ecrã, energia, armazenamento): consulte [Resolução de problemas](/pt-pt/tutorials/jetson-agx-orin/troubleshooting)

## Fontes

- [Guia de instalação do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificado em 2026-09-24)
- [Guia de início rápido do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (verificado em 2026-09-24)
- [Página de transferências do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-24) — ⚠️ a sua tabela de componentes está desatualizada em algumas linhas; para as versões efetivamente instaladas, consulte [Downloads](/pt-pt/tutorials/jetson-agx-orin/downloads)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
