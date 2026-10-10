---
title: Verifique seu sistema — checklist de versão, Modo Super e energia
sidebar_label: Verifique seu sistema
slug: /getting-started/verify-your-system
description: >-
  Confirme se o seu kit de desenvolvedor NVIDIA Jetson Orin Nano Super executa
  o JetPack 7.2.1 com a pilha completa de componentes, a configuração de placa
  do Modo Super e os modos de energia corretos.
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

# Verifique seu sistema

Depois da primeira inicialização do seu sistema JetPack 7.2.1, execute este checklist. Ele
confirma a **versão do L4T**, os **componentes do JetPack instalados**, a **configuração de
placa do Modo Super** e os **modos de energia**. Se o sistema ainda não estiver configurado,
comece pelo **[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)**.

## Etapa 1 — Verifique a versão do L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Um sistema com **JetPack 7.2.1** reporta **R39** com **REVISION: 2.1**:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Nota da Juxi:** a NVIDIA não publica uma saída de exemplo para este arquivo. O bloco acima é
> uma saída do r39.2.1 observada pela comunidade em um dispositivo Orin; seus valores de `GCID`
> e `DATE` serão diferentes. O que importa é `REVISION: 2.1`.

Se a saída mostrar uma versão mais antiga (por exemplo, R36 do JetPack 6.x), o seu sistema não
está executando o JetPack 7.2.1 — veja **[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**
e a **[Migração do JetPack 6.x para 7.2.1](/pt-br/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Etapa 2 — Verifique os componentes e as versões do JetPack

Componentes do JetPack como CUDA, cuDNN e TensorRT são instalados como pacotes Debian. O comando
oficial de listagem da NVIDIA é:

```bash
apt list --installed | grep nvidia-jetpack
```

O metapacote `nvidia-jetpack` deve aparecer na saída. Para conferir um componente pontualmente,
consulte o `dpkg` diretamente — por exemplo, o cuDNN com `dpkg -l | grep cudnn`. Se o metapacote
estiver ausente, execute `sudo apt update` e depois `sudo apt install nvidia-jetpack`, e reinicie
se for solicitado.

A tabela abaixo lista as versões oficiais de componentes da NVIDIA para o **JetPack 7.2.1 /
Jetson Linux 39.2.1** (verificadas em 2026-09-26 na página de download do JetPack):

| Componente | Versão |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Sistema operacional | Ubuntu 24.04 (L4T) |
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
| Isaac ROS | **Lançado** — o Isaac ROS 4.6.0 (agosto de 2026) adicionou suporte ao Jetson Orin e ao JetPack 7.2; a tabela de componentes da NVIDIA ainda diz "em breve" |

> **Nota da Juxi:** a página do 7.2.1 da NVIDIA lista uma única matriz para toda a linha
> JetPack 7 (Thor e Orin juntos), não por plataforma. O `dpkg` pode mostrar versões com um
> sufixo de compilação — compare o número da versão, não a string completa. A tabela da NVIDIA
> não lista versões de OpenCV, DLA ou Python, então esta página também não.

> **Sobre a versão do VPI:** a página de download da NVIDIA não foi totalmente atualizada
> para o 7.2.1 — a linha do VPI ainda traz o valor do JetPack 7.2 (4.1.3). O JetPack 7.2.1
> na verdade traz o **VPI 4.1.4**, confirmado no próprio repositório de pacotes da NVIDIA:
> `nvidia-jetpack-runtime (= 7.2.1-b49)` depende de `nvidia-vpi (= 7.2.1-b49)`, que fixa
> `libnvvpi4 (= 4.1.4)`. Tanto o 4.1.3 quanto o 4.1.4 existem no pool de pacotes, então
> apenas a dependência fixada é decisiva. (verificado em 2026-09-26)

## Etapa 3 — Instale o jtop e leia a atividade do sistema (opcional)

O `jtop` faz parte do **jetson-stats**, um projeto da comunidade — não um produto da NVIDIA. A
NVIDIA não o documenta para esta versão, e a compatibilidade com o L4T r39 não é verificada pela
NVIDIA.

Instale-o usando as instruções da comunidade na
[página do projeto jetson-stats](https://pypi.org/project/jetson-stats/).

Depois execute `jtop` — um monitor de sistema e visualizador de processos interativo. Acompanhe
os 8 GB compartilhados de memória unificada antes de iniciar uma carga de trabalho grande de IA.
Uma alternativa oficial é `sudo tegrastats` (atividade ao vivo de CPU, GPU, memória, temperatura
e energia; `Ctrl`+`C` o encerra). A página How-To da NVIDIA recomenda o `tegrastats` em vez do
`nvidia-smi` para monitoramento no Jetson.

## Etapa 4 — Verifique a configuração de placa do Modo Super (TNSPEC)

As instalações via ISO do JetPack 7.2.1 gravam a configuração do **Modo Super** por padrão.
Confirme-a no dispositivo:

```bash
cat /etc/nv_boot_control.conf
```

Em um kit configurado como Super, a linha `TNSPEC` traz um sufixo `-super`. Funcionários da
NVIDIA publicaram este exemplo:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

Em um kit não-Super, a mesma linha termina sem `-super` — por exemplo, de um relato de usuário
de um sistema afetado: `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Nota da Juxi:** Os caracteres no meio da string TNSPEC variam conforme a unidade e o estado
> do firmware. O que importa é o sufixo `-super` no final da linha TNSPEC.

Problema **6480645** das notas de versão: após uma instalação via ISO, a variável UEFI
`TegraPlatformSpec` pode não refletir com precisão a especificação da placa. A NVIDIA orienta
ler a entrada `TNSPEC` em `/etc/nv_boot_control.conf` para obter as informações corretas da
placa.

## Etapa 5 — Verifique os modos de energia

O modo de energia padrão costuma ser **25W**. Na área de trabalho: clique no modo de energia na
barra superior do Ubuntu, selecione **Power Mode** e escolha **MAXN SUPER**. Na linha de comando,
exiba o modo ativo e o ID do modo:

```bash
sudo /usr/sbin/nvpmodel -q
```

Para trocar de modo, use o ID mostrado pela consulta (`sudo /usr/sbin/nvpmodel -m <mode_id>`).
Como distinguir Super de não-Super:

| | Configuração Super | Configuração não-Super |
|---|---|---|
| Modos disponíveis | 15W, 25W, **MAXN SUPER** | Apenas 7W, 15W |
| IDs de modo (observados pela comunidade) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; padrão 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | seleciona o MAXN SUPER | falha: `NVPM ERROR: request for bad power mode 2` |

> **Dica da Juxi:** Os IDs de modo vêm de um relato da comunidade sobre os arquivos de perfil
> em um sistema 7.2; o menu de energia da área de trabalho lista os modos disponíveis
> diretamente. Depois que a GPU tiver sido usada, uma troca de modo de energia pode pedir uma
> reinicialização — funcionários da NVIDIA dizem que esse aviso é esperado.

## Se aparecerem apenas 7W e 15W

Este é um problema conhecido do JetPack 7.2, corrigido por projeto no 7.2.1.

- No **JetPack 7.2 (L4T 39.2)**, o problema conhecido **6279443** diz que unidades atualizadas
  pelo instalador ISO "não usarão o modo 'Super' por padrão"; a orientação da NVIDIA era gravar
  o destino com um host Linux ou o SDK Manager.
- O **JetPack 7.2.1** muda isso: "a ISO agora grava o Jetson Orin Nano Developer Kit com a
  configuração de gravação do Modo Super por padrão". O problema 6279443 não está na lista de
  problemas conhecidos do 7.2.1, e funcionários da NVIDIA declararam: "Isso seria corrigido no
  jp7.2.1".

Uma instalação limpa do 7.2.1 via ISO deve mostrar 25W e MAXN SUPER. Se o seu kit não mostrar:

1. Para um sistema instalado com a ISO do 7.2, regrave com a configuração Super a partir de um
   host Linux ou do SDK Manager — veja **[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. A NVIDIA não afirma se uma reinstalação via ISO do 7.2.1 converte uma placa que foi instalada
   com a ISO do 7.2. Se os modos Super ainda estiverem ausentes, use as opções de regravação em
   **[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**.

A mesma pergunta está indexada nas **[Perguntas frequentes](/pt-br/tutorials/jetson-orin-nano/faq)**.

## O que um sistema correto mostra

| Verificação | Comando | O que um sistema correto mostra |
|---|---|---|
| Versão do L4T | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| Pacotes do JetPack | `apt list --installed \| grep nvidia-jetpack` | Pacotes do JetPack instalados, incluindo o metapacote `nvidia-jetpack` |
| Conferência do cuDNN | `dpkg -l \| grep cudnn` | Versão 9.20.0 |
| Configuração da placa | `cat /etc/nv_boot_control.conf` | A linha `TNSPEC` termina com `jetson-orin-nano-devkit-super-` |
| Modos de energia | `sudo /usr/sbin/nvpmodel -q` | O modo ativo é 25W por padrão; 15W, 25W e MAXN SUPER são selecionáveis |

## Se algo ainda estiver errado

Componentes ausentes: execute novamente os dois comandos da Etapa 2. Para problemas de
configuração Super ou de modos de energia, veja **[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)**
e **[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**.
Antes de pedir ajuda, colete `cat /etc/nv_tegra_release` e `cat /etc/nv_boot_control.conf` —
funcionários da NVIDIA pedem esse estado (além de `sudo /usr/sbin/nvpmodel -q --verbose`) antes
de qualquer solução alternativa de arquivo de configuração. Suporte da Juxi:
**support@juxitech.com** com o número do seu pedido.

## Fontes

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (verificado em 2026-09-26)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-26)
- [Fórum da NVIDIA — 25W e MAXN SUPER não aparecem no JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [problemas de modo de energia continuam](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode não desbloqueia](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (verificado em 2026-09-26; inclui respostas de funcionários da NVIDIA)
- [jetson-stats (jtop) no PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (verificado em 2026-09-26; fontes da comunidade para a instalação do jtop)

*Status: revisado em 2026-10-11. Baseado na documentação oficial da NVIDIA e
em fontes do fórum da NVIDIA nas datas indicadas; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é publicada
pela Juxi Technology e não é uma publicação da NVIDIA.
