---
title: Verifique o seu sistema — Checklist de versão e componentes
sidebar_label: Verificar o sistema
slug: /getting-started/verify-your-system
description: >-
  Confirme que o seu kit de desenvolvimento Jetson AGX Orin executa o JetPack
  7.2.1 com o conjunto completo de componentes — comandos de versão e a lista
  de componentes esperada.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: still lists Isaac ROS as "coming soon"; see the note under Step 3
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# Verifique o seu sistema

Depois de configurar ou atualizar o seu kit, confirme duas coisas: a **versão do
BSP** e o **conjunto de componentes do JetPack instalado**. Ambas as verificações
levam menos de um minuto.

## Etapa 1 — Verificar a versão do L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Um sistema com **JetPack 7.2.1** apresenta:

```
# R39 (release), REVISION: 2.1, ...
```

Se a saída mostrar uma versão mais antiga (por exemplo, R35), atualize primeiro
o BSP — consulte **[Gravação e atualizações](/pt-pt/tutorials/jetson-agx-orin/flashing-and-updates)**.

## Etapa 2 — Verificar os componentes do JetPack

Os componentes do JetPack (CUDA, cuDNN, TensorRT, ...) são instalados como
pacotes Debian. Verifique se o metapacote está presente:

```bash
dpkg -l | grep -i nvidia-jetpack
```

E confirme que o CUDA Toolkit está disponível:

```bash
nvcc --version
```

Saída esperada para esta versão: **CUDA 13.2**. Se o `nvcc` estiver em falta ou
o metapacote estiver ausente, instale os componentes com:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(Isto demora cerca de uma hora, dependendo da velocidade da ligação — consulte
[Início rápido → Etapa 3](/pt-pt/tutorials/jetson-agx-orin/quick-start).)

## Etapa 3 — Versões esperadas para o JetPack 7.2.1

A tabela abaixo lista o que o **JetPack 7.2.1 / Jetson Linux 39.2.1** instala
efetivamente, verificado em 2026-09-26 através da cadeia de dependências do
`nvidia-jetpack` 7.2.1 no [repositório apt do Jetson da NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages):

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
| Isaac ROS | *“brevemente” na página do JetPack* — lançado em separado; ver a nota abaixo |

> **Nota da Juxi:** o `dpkg` pode mostrar versões de pacotes com sufixos de
> compilação ou revisão (por exemplo, `13.2.2-1`, ou `7.2.1-b49` para pacotes
> L4T); isso é normal — compare o número da versão, não o sufixo.
>
> **Onde a página de transferências do JetPack está desatualizada (verificado
> em 2026-09-26):** a tabela-resumo dessa página ainda mostra CUDA **13.2.1** e
> VPI **4.1.3** — esses são os valores do JetPack **7.2**. O `nvidia-jetpack`
> 7.2.1 instala CUDA **13.2.2** (compilação 13.2.86) e VPI **4.1.4**. O
> repositório apt acima é a fonte que prevalece.
>
> **Isaac ROS (reverificado em 2026-09-26):** a página de transferências do
> JetPack ainda mostra “brevemente”, mas o Isaac ROS suporta o Jetson Orin +
> JetPack 7.2 desde a versão **4.6.0** (2026-08-18). O Isaac ROS é lançado
> independentemente do JetPack, pelo que as suas próprias notas de versão são a
> fonte de referência. Utilizadores de robótica: leiam
> [Robótica no JetPack 7.2](/pt-pt/tutorials/jetson-agx-orin/robotics) antes de
> planear trabalho que dependa dele.

## Opcional — uma vista rápida da atividade do sistema

O `tegrastats` (incluído no Jetson Linux) mostra o uso de CPU/GPU/memória em
tempo real:

```bash
tegrastats
```

Prima `Ctrl`+`C` para parar.

## Se algo estiver em falta

1. Execute novamente `sudo apt update && sudo apt install nvidia-jetpack`.
2. Certifique-se de que o `apt dist-upgrade` + reinício do fluxo de configuração foram concluídos (consulte [Início rápido → Etapa 3](/pt-pt/tutorials/jetson-agx-orin/quick-start)).
3. Verifique o espaço em disco (`df -h`) e a conectividade com a Internet.
4. Continua com problemas? Consulte a **[Resolução de problemas](/pt-pt/tutorials/jetson-agx-orin/troubleshooting)**.

## Fontes

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (verificado em 2026-09-23)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-23)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
