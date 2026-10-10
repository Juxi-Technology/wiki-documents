---
title: Glossário
sidebar_label: Glossário
slug: /appendix/glossary
description: >-
  Termos-chave do kit de desenvolvedor NVIDIA Jetson Orin Nano Super (8 GB) —
  do versionamento do JetPack e do L4T à gravação, aos modos de energia e à
  pilha de IA.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Glossário

Os termos que um novo usuário de Jetson encontra primeiro, em ordem alfabética.
Os números de versão refletem a versão atual deste kit (**JetPack 7.2.1 / L4T
r39.2.1**, verificados em 2026-09-26).

## Termos

| Termo | Significado |
|---|---|
| **BSP** | Board support package (pacote de suporte de placa): a camada de software que inicializa a placa — bootloader, kernel, drivers e o sistema de arquivos raiz. No JetPack, o BSP é o Jetson Linux (L4T). Durante uma instalação da Jetson ISO, o instalador grava o BSP no dispositivo de armazenamento que você selecionar. |
| **capsule update** | Uma atualização do firmware de inicialização QSPI. Durante uma instalação da Jetson ISO em um kit com firmware QSPI mais antigo, o instalador pede que você execute uma atualização de cápsula: pressione `Y` em até 30 segundos, ou a instalação falha depois. A atualização é executada em duas passagens, e o kit pode reiniciar entre elas — isso é esperado. |
| **carveout** | Uma região de memória que o firmware de inicialização reserva para um bloco de hardware específico, como o pipeline de display ou de câmera. O sistema operacional não pode usá-la. No Orin Nano essas reservas são documentadas, e você pode reduzi-las editando o BSP e regravando o kit (veja [Eficiência de memória](/pt-br/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | A plataforma de computação paralela e o kit de ferramentas da NVIDIA para executar código na GPU. O JetPack 7.2.1 traz o CUDA 13.2.2. A capacidade de computação da GPU do Orin é 8.7 (`sm_87`); binários de GPU que não incluem `sm_87` caem para execução na CPU (veja [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | A biblioteca da NVIDIA de primitivas otimizadas de aprendizado profundo, como convolução e funções de ativação. Frameworks de aprendizado profundo e o TensorRT a usam para as suas operações centrais. O JetPack 7.2.1 traz o cuDNN 9.20.0. |
| **DeepStream** | O SDK da NVIDIA para análise de vídeo com múltiplos fluxos: ele decodifica vídeo, executa inferência, rastreia objetos e gera resultados. O DeepStream 9.1 suporta a família Jetson Orin no JetPack 7.2. A NVIDIA recomenda o contêiner Docker como o caminho de instalação mais rápido para novos usuários (veja [Análise de vídeo com DeepStream](/pt-br/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator: um motor de inferência de função fixa integrado a alguns módulos Jetson. O módulo Orin Nano não tem DLA, então a inferência neste kit roda na GPU. |
| **Edge-LLM** | TensorRT Edge-LLM: o runtime no dispositivo da NVIDIA para grandes modelos de linguagem (LLMs) e modelos de visão-linguagem (VLMs). No Orin ele suporta apenas engines FP16, INT8 e INT4 — engines FP8 e FP4 não rodam — e as engines são compiladas no próprio dispositivo (veja [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Armazenamento flash embarcado usado como disco do sistema em alguns módulos Jetson. O kit de desenvolvedor vem sem armazenamento: forneça um cartão microSD ou um SSD NVMe antes de começar (veja [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)). |
| **Modo Force Recovery** | Um modo de inicialização especial usado para gravar o kit a partir de um PC host. Entre nele a partir do sistema em execução com `sudo reboot --force forced-recovery`, ou com o kit desligado, curto-circuitando os pinos 9 e 10 do header de botões e depois conectando a energia. Nesse modo, a porta USB-C carrega a conexão de gravação para o PC host. |
| **JetPack** | O pacote de SDK da NVIDIA para Jetson: o sistema operacional, os drivers, a pilha CUDA e as bibliotecas. A versão atual para este kit é o JetPack 7.2.1, que inclui o Jetson Linux (L4T) r39.2.1. |
| **Jetson 6.x Update Path** | O procedimento de ponte de firmware para kits cujo firmware UEFI/QSPI de fábrica é mais antigo que 36.0. Ele inicializa uma imagem de ponte microSD do JetPack 5.1.3 e agenda uma atualização do bootloader (firmware); depois disso, o kit pode inicializar o JetPack 6.x ou a Jetson ISO do JetPack 7.2.1. Kits com firmware mais antigo precisam concluir esse caminho antes de uma instalação da ISO (veja [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | A imagem de instalador USB unificada para o JetPack 7.2 e posteriores. Grave-a em um pen drive USB com uma ferramenta como o Balena Etcher — não a grave em um cartão microSD — e observe que ela é somente instalação, não um USB "live". Durante a instalação, você seleciona o destino: o cartão microSD ou o SSD NVMe. |
| **L4T** | Jetson Linux: o board support package por baixo do JetPack — o bootloader UEFI, o kernel, os drivers e o sistema de arquivos raiz do Ubuntu. Para o JetPack 7.2.1 ele é o r39.2.1, com kernel Linux 6.8 e sistema de arquivos raiz do Ubuntu 24.04. |
| **MAXN SUPER** | O modo de energia mais alto do kit (modo 2): CPU 1.728 MHz, GPU 1.020 MHz, memória 3.199 MHz. É um modo experimental e existe apenas quando o kit foi gravado com a configuração Super. Selecione-o no menu Power Mode da área de trabalho, ou execute `sudo /usr/sbin/nvpmodel -m 2`. |
| **microSD (UHS-1)** | O formato de cartão usado como armazenamento de sistema padrão do kit. UHS-1 é uma classe de velocidade de SD; a NVIDIA recomenda um cartão microSD UHS-1 de 64 GB ou maior. O slot fica na parte inferior do módulo, então insira o cartão antes de inicializar o instalador. |
| **nv_boot_control.conf / TNSPEC** | O arquivo no dispositivo `/etc/nv_boot_control.conf`, que registra a configuração da placa como uma string TNSPEC. Funcionários da NVIDIA observam que uma configuração Super mostra um sufixo `-super`, por exemplo `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; se o sufixo estiver ausente, os modos de energia mais altos não estão disponíveis. Após uma instalação da ISO, a NVIDIA aponta para essa entrada TNSPEC como a referência para a informação correta da placa. |
| **NVMe** | Um SSD no barramento PCIe, instalado em um dos slots M.2 Key-M da placa portadora: de tamanho 2280 (PCIe 3.0 x4) ou 2230 (PCIe 3.0 x2). Um SSD NVMe pode hospedar o sistema e é recomendado quando você precisa de mais capacidade e melhor desempenho de armazenamento. |
| **nvpmodel** | A ferramenta de modos de energia do kit. Execute `sudo /usr/sbin/nvpmodel -q` para listar os modos disponíveis no seu sistema, e `sudo /usr/sbin/nvpmodel -m <mode_id>` para trocar de modo. Os mesmos modos estão no menu Power Mode da área de trabalho. |
| **oem-config** | O assistente de configuração da primeira inicialização: contrato de licença, idioma e teclado, rede e o nome de usuário e senha iniciais. Ele roda uma vez, após a primeira inicialização do sistema instalado. |
| **QSPI** | A pequena memória flash NOR do kit que armazena o firmware de inicialização UEFI. O JetPack 7.2 e posteriores exigem firmware QSPI da geração JetPack 6.x (mais recente que a versão 36.0); com firmware mais antigo, o instalador pode falhar ou o kit pode inicializar em uma tela preta. Veja [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | A ferramenta de PC host da NVIDIA para gravar o BSP e instalar componentes do JetPack via USB. O host documentado é um PC x86 executando Ubuntu. É a alternativa ao método Jetson ISO no dispositivo. |
| **SO-DIMM** | O formato de conector do módulo: um SO-DIMM de 260 pinos, 69,6 mm x 45 mm. O módulo se encaixa no soquete SO-DIMM da placa portadora, e o mesmo soquete também aceita um módulo Jetson Orin NX. |
| **Super Mode** | A configuração de software de energia e clocks da NVIDIA para o Orin Nano — não é hardware diferente. Kits existentes ganham o "Super" com uma atualização de software do JetPack, e neste kit os modos de energia mais altos aparecem apenas quando ele foi gravado com a configuração Super. |
| **TensorRT** | O otimizador e runtime de inferência da NVIDIA. Ele compila um modelo treinado em uma engine TensorRT — um arquivo específico do dispositivo, criado para a GPU de destino — e executa essa engine de forma eficiente. O JetPack 7.2.1 traz o TensorRT 10.16.2. |
| **TOPS** | Trilhão (tera) de operações por segundo, a unidade comum para a vazão de IA. Este kit é avaliado em até 67 TOPS INT8 esparsos (33 INT8 densos). A NVIDIA publica classificações esparsa e densa para o mesmo módulo. |
| **UEFI** | O firmware de inicialização do kit e o seu menu de configuração. Pressione Esc enquanto a tela de inicialização da NVIDIA é exibida para entrar na configuração; no menu, o Gerenciador de Inicialização é onde você seleciona o pen drive USB do instalador como dispositivo de inicialização. A versão de firmware é exibida ali, e o JetPack 7.2 e posteriores precisam de uma versão mais recente que a 36.0. |
| **unified memory** | A memória unificada: o único pool de 8 GB de LPDDR5 compartilhado pela CPU e pela GPU — o kit não tem memória de vídeo separada. Cerca de 7.6 GB fica utilizável após reservas de firmware e kernel, e o sistema operacional, os seus modelos e os seus caches KV usam todos esse único pool. Veja [Eficiência de memória](/pt-br/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface: a biblioteca da NVIDIA para processamento de imagens acelerado por hardware no Jetson. O JetPack 7.2.1 traz o VPI 4.1.4. |

## Mapa de versões

A correspondência de versões mais útil de memorizar:

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (atual) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (última versão do JetPack 6) | r36.5.2 | 22.04 | 5.15 | 12.6 |

Para verificar o que um sistema específico realmente executa: `cat /etc/nv_tegra_release`
(veja [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system)).

## Fontes

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ a sua tabela de componentes está desatualizada linha a linha (as linhas do VPI e do PVA ainda trazem valores do JetPack 7.2); use o [repositório de pacotes da NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) para as versões dos componentes, em vez dela (verificado em 2026-09-26)
- [Notas de versão do Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (verificado em 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificado em 2026-09-26)
- [Fórum da NVIDIA — "25W e MAXN_SUPER não aparecem no JetPack 7.2" (resposta de funcionário da NVIDIA)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (verificado em 2026-09-26)

*Status: revisado em 2026-10-11. Definições compiladas a partir
da documentação da NVIDIA e do uso padrão do setor; os números de versão foram
verificados nas datas indicadas. Não verificado em hardware físico pela Juxi
Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
