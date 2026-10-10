---
title: Verifique o seu sistema — Checklist de versão, Modo Super e alimentação
sidebar_label: Verificar o sistema
slug: /getting-started/verify-your-system
description: >-
  Confirme que o seu kit de desenvolvedor Jetson Orin Nano Super executa o
  JetPack 7.2.1 com a pilha completa de componentes, a configuração de placa
  do Modo Super e os modos de alimentação corretos.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Verifique o seu sistema

Depois do primeiro arranque do seu sistema JetPack 7.2.1, percorra esta lista
de verificação. Ela confirma a **versão do L4T**, os **componentes do JetPack
instalados**, a **configuração de placa do Modo Super** e os **modos de
alimentação**. Se o sistema ainda não estiver configurado, comece pelo
**[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)**.

## Etapa 1 — Verificar a versão do L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Um sistema com **JetPack 7.2.1** apresenta **R39** com **REVISION: 2.1**:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Nota da Juxi:** a NVIDIA não publica uma saída de exemplo para este
> ficheiro. O bloco acima é uma saída do r39.2.1 observada pela comunidade num
> dispositivo Orin; os seus valores de `GCID` e `DATE` serão diferentes. O que
> importa é `REVISION: 2.1`.

Se a saída mostrar uma versão mais antiga (por exemplo R36, do JetPack 6.x), o
seu sistema não está a executar o JetPack 7.2.1 — ver a
**[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)** e a
**[Migração do JetPack 6.x para o JetPack 7.2.1](/pt-pt/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Etapa 2 — Verificar os componentes e versões do JetPack

Os componentes do JetPack, como o CUDA, o cuDNN e o TensorRT, são instalados
como pacotes Debian. O comando oficial de listagem da NVIDIA é:

```bash
apt list --installed | grep nvidia-jetpack
```

O metapacote `nvidia-jetpack` tem de aparecer na saída. Para verificar
pontualmente um componente, consulte diretamente o `dpkg` — por exemplo, o
cuDNN com `dpkg -l | grep cudnn`. Se o metapacote estiver em falta, execute
`sudo apt update` e depois `sudo apt install nvidia-jetpack`, e reinicie se for
pedido.

A tabela abaixo lista as versões oficiais dos componentes da NVIDIA para o
**JetPack 7.2.1 / Jetson Linux 39.2.1** (verificadas em 2026-09-26 na página de
descarregamentos do JetPack):

| Componente | Versão |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Sistema operativo | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (visão computacional) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (com imagem ISO) |
| Isaac ROS | **Lançado** — o Isaac ROS 4.6.0 (agosto de 2026) adicionou suporte para o Jetson Orin e para o JetPack 7.2; a tabela de componentes da NVIDIA ainda diz «brevemente» |

> **Nota da Juxi:** a página do 7.2.1 da NVIDIA apresenta uma única matriz para
> toda a linha JetPack 7 (Thor e Orin juntos), não por plataforma. O `dpkg` pode
> mostrar versões com um sufixo de compilação — compare o número da versão, não
> a cadeia completa. A tabela da NVIDIA não lista versões de OpenCV, DLA ou
> Python, pelo que esta página também não.

> **Sobre a versão do VPI:** a página de descarregamentos da NVIDIA ainda não
> foi totalmente atualizada para o 7.2.1 — a sua linha do VPI ainda apresenta o
> valor do JetPack 7.2 (4.1.3). O JetPack 7.2.1 inclui, na verdade, o
> **VPI 4.1.4**, confirmado a partir do próprio repositório de pacotes da
> NVIDIA: o `nvidia-jetpack-runtime (= 7.2.1-b49)` depende do
> `nvidia-vpi (= 7.2.1-b49)`, que fixa o `libnvvpi4 (= 4.1.4)`. Tanto o 4.1.3
> como o 4.1.4 existem no conjunto de pacotes, pelo que só a fixação da
> dependência é decisiva. (verificado em 2026-09-26)

## Etapa 3 — Instalar o jtop e ler a atividade do sistema (opcional)

O `jtop` faz parte do **jetson-stats**, um projeto da comunidade — não é um
produto da NVIDIA. A NVIDIA não o documenta para esta versão e a
compatibilidade com o L4T r39 não está verificada pela NVIDIA.

Instale-o seguindo as instruções da comunidade na
[página do projeto jetson-stats](https://pypi.org/project/jetson-stats/).

Execute depois o `jtop` — um monitor de sistema interativo e visualizador de
processos. Vigie os 8 GB partilhados de memória unificada antes de iniciar uma
carga de trabalho de IA pesada. Uma alternativa oficial é `sudo tegrastats`
(atividade em direto de CPU, GPU, memória, temperatura e potência; `Ctrl`+`C`
para parar). A página How-To da NVIDIA recomenda o `tegrastats` em vez do
`nvidia-smi` para monitorização no Jetson.

## Etapa 4 — Verificar a configuração de placa do Modo Super (TNSPEC)

As instalações por ISO do JetPack 7.2.1 gravam por predefinição a configuração
do **Modo Super**. Confirme-a no dispositivo:

```bash
cat /etc/nv_boot_control.conf
```

Num kit configurado como Super, a linha `TNSPEC` tem o sufixo `-super`.
Colaboradores da NVIDIA publicaram este exemplo:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

Num kit não-Super, a mesma linha termina sem `-super` — por exemplo, segundo o
relato de um utilizador de um sistema afetado:
`TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Nota da Juxi:** os caracteres no meio da cadeia TNSPEC variam consoante a
> unidade e o estado do firmware. O que importa é o sufixo `-super` no final da
> linha TNSPEC.

Problema **6480645** das notas de versão: depois de uma instalação por ISO, a
variável UEFI `TegraPlatformSpec` pode não refletir com exatidão a
especificação da placa. A NVIDIA indica que se deve ler a entrada `TNSPEC` em
`/etc/nv_boot_control.conf` para obter a informação correta da placa.

## Etapa 5 — Verificar os modos de alimentação

O modo de alimentação predefinido é tipicamente **25W**. A partir do ambiente
de trabalho: clique no modo de alimentação na barra superior do Ubuntu,
selecione **Power Mode** e escolha **MAXN SUPER**. A partir da linha de
comandos, mostre o modo ativo e o respetivo ID:

```bash
sudo /usr/sbin/nvpmodel -q
```

Para mudar de modo, utilize o ID mostrado pela consulta
(`sudo /usr/sbin/nvpmodel -m <mode_id>`). Como distinguir uma configuração
Super de uma não-Super:

| | Configuração Super | Configuração não-Super |
|---|---|---|
| Modos disponíveis | 15W, 25W, **MAXN SUPER** | Apenas 7W, 15W |
| IDs dos modos (observados pela comunidade) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; predefinido 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | seleciona MAXN SUPER | falha: `NVPM ERROR: request for bad power mode 2` |

> **Sugestão da Juxi:** os IDs dos modos provêm de um relato da comunidade
> sobre os ficheiros de perfil num sistema 7.2; o menu de alimentação do
> ambiente de trabalho lista diretamente os modos disponíveis. Depois de a GPU
> ter sido utilizada, uma alteração do modo de alimentação pode pedir um
> reinício — os funcionários da NVIDIA dizem que esse pedido é normal.

## Se só aparecerem 7W e 15W

Este é um problema conhecido do JetPack 7.2, corrigido de raiz no 7.2.1.

- No **JetPack 7.2 (L4T 39.2)**, o problema conhecido **6279443** indica que as unidades atualizadas através do instalador ISO «não passarão a assumir o modo "Super" por predefinição»; a orientação da NVIDIA era gravar o destino com um anfitrião Linux ou o SDK Manager.
- O **JetPack 7.2.1** altera isto: «a ISO agora grava o Jetson Orin Nano Developer Kit com a configuração de gravação do Modo Super por predefinição». O problema 6279443 não consta da lista de problemas conhecidos do 7.2.1, e funcionários da NVIDIA afirmaram: «Isto será corrigido no jp7.2.1».

Uma instalação nova por ISO do 7.2.1 deve mostrar 25W e MAXN SUPER. Se o seu
kit não mostrar:

1. Para um sistema instalado com a ISO 7.2, regrave com a configuração Super a partir de um anfitrião Linux ou com o SDK Manager — ver **[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. A NVIDIA não indica se uma reinstalação por ISO do 7.2.1 converte uma placa que foi instalada com a ISO 7.2. Se os modos Super continuarem em falta, utilize as opções de regravação da **[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**.

A mesma questão está indexada nas **[FAQ](/pt-pt/tutorials/jetson-orin-nano/faq)**.

## O que um sistema correto deve mostrar

| Verificação | Comando | O que um sistema correto mostra |
|---|---|---|
| Versão do L4T | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| Pacotes do JetPack | `apt list --installed \| grep nvidia-jetpack` | Pacotes do JetPack instalados, incluindo o metapacote `nvidia-jetpack` |
| Verificação pontual do cuDNN | `dpkg -l \| grep cudnn` | Versão 9.20.0 |
| Configuração da placa | `cat /etc/nv_boot_control.conf` | A linha `TNSPEC` termina em `jetson-orin-nano-devkit-super-` |
| Modos de alimentação | `sudo /usr/sbin/nvpmodel -q` | O modo ativo é 25W por predefinição; 15W, 25W e MAXN SUPER são selecionáveis |

## Se algo ainda estiver errado

Componentes em falta: execute novamente os dois comandos da Etapa 2. Para
problemas de configuração Super ou de modos de alimentação, ver
**[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)** e a
**[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**. Antes de pedir
ajuda, recolha a saída de `cat /etc/nv_tegra_release` e de
`cat /etc/nv_boot_control.conf` — os funcionários da NVIDIA pedem este estado
(mais `sudo /usr/sbin/nvpmodel -q --verbose`) antes de qualquer solução
alternativa com ficheiros de configuração. Apoio da Juxi:
**support@juxitech.com**, com o número da sua encomenda.

## Fontes

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (verificado em 2026-09-26)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-26)
- [Fórum NVIDIA — 25W e MAXN SUPER não aparecem no JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [problemas contínuos de modos de alimentação](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Modo Super não desbloqueia](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (verificado em 2026-09-26; inclui respostas de funcionários da NVIDIA)
- [jetson-stats (jtop) no PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (verificado em 2026-09-26; fontes da comunidade para a instalação do jtop)

*Estado: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA e em fontes dos fóruns da NVIDIA nas datas indicadas; ainda
não verificado em hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
