---
title: Glossário
sidebar_label: Glossário
slug: /appendix/glossary
description: >-
  Termos essenciais para o Kit de Desenvolvedor NVIDIA Jetson Orin Nano Super
  (8 GB) — do versionamento do JetPack e do L4T à gravação, aos modos de
  alimentação e à pilha de IA.
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

Os termos com que um novo utilizador do Jetson se depara primeiro, por ordem
alfabética. Os números de versão refletem a versão atual para este kit
(**JetPack 7.2.1 / L4T r39.2.1**, verificada em 2026-09-26).

## Termos

| Termo | Significado |
|---|---|
| **BSP** | «Board support package» (pacote de suporte de placa): a camada de software que arranca a placa — carregador de arranque, kernel, controladores e o sistema de ficheiros raiz. No JetPack, o BSP é o Jetson Linux (L4T). Durante uma instalação por Jetson ISO, o instalador escreve o BSP no dispositivo de armazenamento que selecionar. |
| **capsule update** | Uma atualização do firmware de arranque QSPI. Durante uma instalação por Jetson ISO num kit com firmware QSPI mais antigo, o instalador pede-lhe para executar uma atualização de cápsula: prima `Y` no prazo de 30 segundos, ou a instalação falha mais tarde. A atualização é executada em duas passagens e o kit pode reiniciar entre elas — isso é esperado. |
| **carveout** | Uma região de memória que o firmware de arranque reserva para um bloco de hardware específico, como o pipeline do ecrã ou da câmara. O sistema operativo não a pode utilizar. No Orin Nano, estas reservas estão documentadas e pode reduzi-las editando o BSP e regravando o kit (ver [memory-efficiency](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | A plataforma de computação paralela e o conjunto de ferramentas da NVIDIA para executar código na GPU. O JetPack 7.2.1 inclui o CUDA 13.2.2. A capacidade de computação da GPU do Orin é 8.7 (`sm_87`); os binários de GPU que não incluam `sm_87` recorrem à execução na CPU (ver [local-llm](/pt-pt/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | A biblioteca da NVIDIA de primitivas otimizadas de aprendizagem profunda, como convolução e funções de ativação. As frameworks de aprendizagem profunda e o TensorRT utilizam-na nas suas operações centrais. O JetPack 7.2.1 inclui o cuDNN 9.20.0. |
| **DeepStream** | O SDK da NVIDIA para análise de vídeo em múltiplos fluxos: descodifica vídeo, executa inferência, segue objetos e produz resultados. O DeepStream 9.1 suporta a família Jetson Orin no JetPack 7.2. A NVIDIA recomenda o contentor Docker como o caminho de instalação mais rápido para novos utilizadores (ver [deepstream](/pt-pt/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator: um motor de inferência de função fixa integrado em alguns módulos Jetson. O módulo Orin Nano não tem DLA, pelo que a inferência neste kit é executada na GPU. |
| **Edge-LLM** | TensorRT Edge-LLM: o runtime no dispositivo da NVIDIA para grandes modelos de linguagem (LLMs) e modelos de visão-linguagem (VLMs). No Orin, suporta apenas motores FP16, INT8 e INT4 — os motores FP8 e FP4 não são executados — e os motores são criados no próprio dispositivo (ver [local-llm](/pt-pt/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Armazenamento flash integrado, utilizado como disco de sistema em alguns módulos Jetson. O kit de desenvolvedor é fornecido sem armazenamento: forneça um cartão microSD ou um SSD NVMe antes de começar (ver [quick-start](/pt-pt/tutorials/jetson-orin-nano/quick-start)). |
| **Force Recovery mode** | Um modo de arranque especial utilizado para gravar o kit a partir de um PC anfitrião. Entre nele a partir do sistema em execução com `sudo reboot --force forced-recovery`, ou com o kit desligado, curto-circuitando os pinos 9 e 10 do Button Header e ligando depois a alimentação. Neste modo, a porta USB-C transporta a ligação de gravação para o PC anfitrião. |
| **JetPack** | O pacote de SDK da NVIDIA para Jetson: o sistema operativo, os controladores, a pilha CUDA e as bibliotecas. A versão atual para este kit é o JetPack 7.2.1, que inclui o Jetson Linux (L4T) r39.2.1. |
| **Jetson 6.x Update Path** | O procedimento de ponte de firmware para kits cujo firmware UEFI/QSPI de fábrica é anterior a 36.0. Arranca com uma imagem-ponte de microSD do JetPack 5.1.3 e agenda uma atualização do carregador de arranque (firmware); depois disso, o kit pode arrancar o JetPack 6.x ou a Jetson ISO do JetPack 7.2.1. Os kits com firmware mais antigo têm de concluir este percurso antes de uma instalação por ISO (ver [quick-start](/pt-pt/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | A imagem unificada de instalação por USB para o JetPack 7.2 e posteriores. Grave-a numa unidade flash USB com uma ferramenta como o Balena Etcher — não a grave num cartão microSD — e note que serve apenas para instalação, não é uma live USB. Durante a instalação, seleciona o destino: o cartão microSD ou o SSD NVMe. |
| **L4T** | Jetson Linux: o pacote de suporte de placa subjacente ao JetPack — o carregador de arranque UEFI, o kernel, os controladores e o sistema de ficheiros raiz do Ubuntu. Para o JetPack 7.2.1 é a r39.2.1, com kernel Linux 6.8 e um sistema de ficheiros raiz Ubuntu 24.04. |
| **MAXN SUPER** | O modo de alimentação máximo do kit (modo 2): CPU 1728 MHz, GPU 1020 MHz, memória 3199 MHz. É um modo experimental e só existe quando o kit foi gravado com a configuração Super. Selecione-o no menu de modos de alimentação do ambiente de trabalho, ou execute `sudo /usr/sbin/nvpmodel -m 2`. |
| **microSD (UHS-1)** | O formato de cartão utilizado como armazenamento de sistema predefinido do kit. UHS-1 é uma classe de velocidade SD; a NVIDIA recomenda um cartão microSD UHS-1 de 64 GB ou mais. A ranhura fica na face inferior do módulo, pelo que deve inserir o cartão antes de arrancar com o instalador. |
| **nv_boot_control.conf / TNSPEC** | O ficheiro no dispositivo `/etc/nv_boot_control.conf`, que regista a configuração da placa como uma cadeia TNSPEC. Funcionários da NVIDIA notam que uma configuração Super apresenta o sufixo `-super`, por exemplo `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; se o sufixo estiver em falta, os modos de alimentação superiores não estão disponíveis. Após uma instalação por ISO, a NVIDIA aponta para esta entrada TNSPEC como a referência para a informação correta da placa. |
| **NVMe** | Um SSD no barramento PCIe, instalado numa das ranhuras M.2 Key-M da placa portadora: tamanho 2280 (PCIe 3.0 x4) ou tamanho 2230 (PCIe 3.0 x2). Um SSD NVMe pode alojar o sistema e é recomendado quando precisa de mais capacidade e melhor desempenho de armazenamento. |
| **nvpmodel** | A ferramenta de modos de alimentação do kit. Execute `sudo /usr/sbin/nvpmodel -q` para listar os modos disponíveis no seu sistema, e `sudo /usr/sbin/nvpmodel -m <mode_id>` para mudar de modo. Os mesmos modos estão no menu de modos de alimentação do ambiente de trabalho. |
| **oem-config** | O assistente de configuração do primeiro arranque: contrato de licença, idioma e teclado, rede e o nome de utilizador e palavra-passe iniciais. É executado uma vez, após o primeiro arranque do sistema instalado. |
| **QSPI** | A pequena memória flash NOR do kit que armazena o firmware de arranque UEFI. O JetPack 7.2 e posteriores exigem firmware QSPI da geração JetPack 6.x (mais recente do que a versão 36.0); com firmware mais antigo, o instalador pode falhar ou o kit pode arrancar para um ecrã preto. Ver [flashing-and-updates](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | A ferramenta de PC anfitrião da NVIDIA para gravar o BSP e instalar componentes do JetPack por USB. O anfitrião documentado é um PC x86 com Ubuntu. É a alternativa ao método Jetson ISO no próprio dispositivo. |
| **SO-DIMM** | O formato de conector do módulo: um SO-DIMM de 260 pinos, 69,6 mm x 45 mm. O módulo encaixa na tomada SO-DIMM da placa portadora, e a mesma tomada também aceita um módulo Jetson Orin NX. |
| **Super Mode** | A configuração de software de alimentação e frequências da NVIDIA para o Orin Nano — não é hardware diferente. Os kits existentes obtêm o impulso "Super" com uma atualização de software do JetPack e, neste kit, os modos de alimentação superiores só aparecem quando foi gravado com a configuração Super. |
| **TensorRT** | O otimizador e o runtime de inferência da NVIDIA. Compila um modelo treinado num motor TensorRT — um ficheiro específico do dispositivo, criado para a GPU de destino — e executa esse motor de forma eficiente. O JetPack 7.2.1 inclui o TensorRT 10.16.2. |
| **TOPS** | Bilião (tera) de operações por segundo, a unidade habitual para o débito de IA. Este kit está classificado até 67 TOPS INT8 esparsos (33 densos INT8). A NVIDIA publica tanto uma classificação esparsa como uma densa para o mesmo módulo. |
| **UEFI** | O firmware de arranque do kit e o respetivo menu de configuração. Prima Esc enquanto o ecrã de arranque da NVIDIA está visível para entrar na configuração; no menu, é no Boot Manager que seleciona o instalador USB como dispositivo de arranque. A versão do firmware é apresentada aí, e o JetPack 7.2 e posteriores precisam de uma versão mais recente do que 36.0. |
| **unified memory** | O único conjunto de memória LPDDR5 de 8 GB partilhado pela CPU e pela GPU — o kit não tem memória de vídeo separada. Cerca de 7.6 GB ficam utilizáveis após as reservas do firmware e do kernel, e o sistema operativo, os seus modelos e as respetivas caches KV retiram todos deste único conjunto. Ver [memory-efficiency](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface: a biblioteca da NVIDIA para processamento de imagem acelerado por hardware no Jetson. O JetPack 7.2.1 inclui o VPI 4.1.4. |

## Mapa de versões

O mapeamento de versões mais útil de memorizar:

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (atual) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (última versão do JetPack 6) | r36.5.2 | 22.04 | 5.15 | 12.6 |

Para confirmar o que um sistema específico executa de facto: `cat /etc/nv_tegra_release`
(ver [verify-your-system](/pt-pt/tutorials/jetson-orin-nano/verify-your-system)).

## Fontes

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ a sua tabela de componentes está desatualizada linha a linha (as linhas do VPI e do PVA ainda apresentam valores do JetPack 7.2); use antes [o repositório de pacotes da NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) para as versões dos componentes (verificado em 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (verificado em 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (verificado em 2026-09-26)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (verificado em 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (verificado em 2026-09-26)
- [NVIDIA forum — "25W and MAXN_SUPER not seen in JetPack 7.2" (NVIDIA staff answer)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (verificado em 2026-09-26)

*Estado: revisado em 2026-10-11. Definições compiladas a partir
da documentação da NVIDIA e do uso padrão da indústria; os números de versão
foram verificados nas datas indicadas. Não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
