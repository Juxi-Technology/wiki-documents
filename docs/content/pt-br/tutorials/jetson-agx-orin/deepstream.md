---
title: Análise de Vídeo com Múltiplos Fluxos — DeepStream 9.1
sidebar_label: Análise de vídeo com DeepStream
slug: /tutorials/deepstream
description: >-
  Instale o DeepStream 9.1 no Kit de Desenvolvedor AGX Orin e execute o
  aplicativo de referência de análise de vídeo — com as opções oficiais de
  instalação, as configurações de exemplo e as notas específicas do JP7.2.
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

# Análise de Vídeo com Múltiplos Fluxos — DeepStream 9.1

O DeepStream é o framework da NVIDIA para construir pipelines acelerados de
análise de vídeo inteligente (IVA), e o **DeepStream 9.1 vem com o JetPack 7.2**
no Jetson Orin. Este tutorial segue a documentação oficial de instalação e de
início rápido da NVIDIA; todos os comandos abaixo são retirados dessas páginas
(ou resumidos diretamente delas).

**Pareamento de versões:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA
13.2 ↔ TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(conforme a tabela
de compatibilidade da NVIDIA)*.

## 1. Instalação

A NVIDIA oferece quatro métodos de instalação no Jetson; a nota oficial
recomenda **Docker para novos usuários** (o mais rápido, sem dependências):

- **Método 4 — Docker (recomendado para novos usuários):** use os contêineres NGC DeepStream — consulte [Contêineres Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Método 1 — SDK Manager:** selecione **DeepStreamSDK** em "Additional SDKs" junto com os componentes do JetPack 7.2 GA.
- **Método 2 — pacote tar:** baixe `deepstream_sdk_v9.1.0_jetson.tbz2` (de [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)) e, em seguida:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Método 3 — pacote Debian:** instale `deepstream-9.1_9.1.0-1_arm64.deb` com `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Pacotes de pré-requisitos** (lista oficial de dependências para a instalação
nativa):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Nota da Juxi:** se você encontrar o problema de RTSP documentado
> (aplicativos travados em EOS com fluxos RTSP), execute o script
> `update_rtpmanager.sh` em `/opt/nvidia/deepstream/deepstream/` após instalar
> os pacotes acima.

## 2. Aumente os clocks (antes de executar qualquer coisa)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

A NVIDIA observa uma exceção: o **Jetson Orin Nano** usa `-m 2` para MAXN SUPER;
todos os outros módulos Orin (incluindo AGX Orin) usam `-m 0`. Execute esses
comandos antes de executar os aplicativos do DeepStream.

## 3. Execute o aplicativo de referência

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

O que esperar (conforme a NVIDIA): uma exibição em mosaico de 30 fluxos de
1080p simulados com inferência ResNet, e métricas de desempenho — **~30 FPS
para esta configuração** — impressas no terminal. Clique em um bloco para
ampliar; clique com o botão direito para voltar à exibição em mosaico.

Arquivos de configuração úteis para explorar (todos nesse diretório):

| Configuração | Caso de uso |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | Teste de desempenho com 30 fluxos |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Rastreamento + inferência secundária |
| `source1_usb_dec_infer_resnet.txt` | **Uma única câmera USB** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | Configurações com **câmera CSI** (o suporte do driver depende da sua câmera) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Exemplo de demux |

Notas do início rápido oficial:

- **A primeira execução com um novo modelo leva alguns minutos**, enquanto o motor TensorRT é gerado; as execuções posteriores o reutilizam.
- Se os elementos do GStreamer falharem ao inicializar, limpe o cache: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Operação headless (sem monitor):** o sink EGL padrão precisa de um monitor. As configurações suportam, em vez disso, um **sink de saída RTSP** (consulte o grupo `[sink2]` na configuração de 30 fluxos) — transmita os resultados para outra máquina.
- Todos os aplicativos de exemplo pré-compilados ficam em `/opt/nvidia/deepstream/deepstream-9.1/samples/` — cada um tem um README.

## 4. Novidades em torno do DeepStream 9.1 no JetPack 7.2

- **Pipelines assistidos por agentes:** a NVIDIA documenta um *DeepStream Coding Agent* (suporte a agentes de IA para construir pipelines) — [documentação](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM no pipeline:** os aplicativos de referência incluem um **deepstream-vllm-plugin** para combinar pipelines de vídeo com raciocínio de grandes modelos — consulte [a documentação](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html). Para inferência de modelos no próprio dispositivo fora do DeepStream, consulte [Inferência de LLM local](/pt-br/tutorials/jetson-agx-orin/local-llm).
- **Triton no dispositivo:** para executar o Triton Inference Server nativamente (sem Docker), execute `sudo ./triton_backend_setup.sh` no diretório de exemplos (instala o Triton 2.68.0 para Jetson).

## Solução de problemas e leitura adicional

- [Solução de problemas e FAQ do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Ajuste de desempenho](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — necessário quando você for além das configurações de referência
- [Configurações de exemplo explicadas](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- Problemas no nível do sistema (tela, energia, armazenamento): consulte [Solução de problemas](/pt-br/tutorials/jetson-agx-orin/troubleshooting)

## Fontes

- [Guia de instalação do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificado em 2026-09-24)
- [Guia de início rápido do DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (verificado em 2026-09-24)
- [Página de downloads do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-24) — ⚠️ sua tabela de componentes está defasada em algumas linhas; para as versões realmente instaladas, consulte [Downloads](/pt-br/tutorials/jetson-agx-orin/downloads)

*Status: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
