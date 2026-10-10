---
title: Gravação e atualizações — Opções de instalação do BSP
sidebar_label: Gravação e atualizações
slug: /getting-started/flashing-and-updates
description: >-
  As três formas oficiais de instalar ou atualizar o BSP no kit de
  desenvolvedor Jetson AGX Orin — Jetson ISO (recomendada), NVIDIA SDK Manager
  e o script de gravação Linux_for_Tegra — além de como entrar no modo
  Force Recovery.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Gravação e atualizações — Opções de instalação do BSP

A NVIDIA oferece três formas oficiais de instalar ou atualizar o BSP no kit de
desenvolvedor. Escolha conforme a sua situação:

| | 💾 Começar com o eMMC | 🛠️ SDK Manager | 📜 Script de gravação |
|---|---|---|---|
| Resumo | Iniciar pelo eMMC pré-gravado e atualizar com o Jetson ISO | Ferramenta com GUI em um PC host; grava o BSP e pode instalar os pacotes do JetPack | Script `flash.sh` em um PC host |
| PC host com Ubuntu | **Não necessário** | Necessário | Necessário |
| Tempo típico | Primeira inicialização imediata; a atualização via ISO leva ~15 min | ~30 min para gravar | Depende da configuração |
| Para quem é | Todos (padrão recomendado) | Qualquer pessoa com um PC Ubuntu; necessário para gravar em NVMe/microSD/USB ou quando o kit não tem internet | Desenvolvedores de produto, usuários avançados |

> **Nota da Juxi:** a versão atual é o **JetPack 7.2.1 (L4T r39.2.1)**. Se o seu
> kit for novo, comece pelo **[Início Rápido](/pt-br/tutorials/jetson-agx-orin/quick-start)** — ele percorre o
> caminho recomendado de ponta a ponta.

## Opção 1 — Começar com o eMMC e atualizar com o Jetson ISO (recomendada)

Seu kit de desenvolvedor vem com um BSP L4T pré-gravado no eMMC e inicia no
desktop Ubuntu pronto para uso. O caminho de atualização recomendado é o **Jetson ISO**
— um pen drive USB inicializável que atualiza o kit **sem um PC host com Ubuntu**.

**Pré-requisito:** o BSP instalado precisa ser **L4T r35.5 ou mais recente** (verifique com
`cat /etc/nv_tegra_release`). Kits mais antigos exigem primeiro um método com PC host (Opção 2
ou 3 abaixo).

O procedimento completo, passo a passo (criação do USB com o Balena Etcher, inicialização UEFI,
o aviso do capsule QSPI, menu do GRUB, seleção do armazenamento, primeira inicialização), está em
**[Início Rápido → Etapa 2](/pt-br/tutorials/jetson-agx-orin/quick-start)**.

Destaques da documentação da NVIDIA:

- No menu do GRUB você escolhe o destino da instalação: **eMMC** ou **NVMe** (recomendado se você instalou um SSD).
- Se for solicitado, confirme a **atualização do capsule QSPI** com `Y` — ela é necessária para compatibilidade e é executada duas vezes. Ignorá-la causa problemas na instalação (isso também consta nas notas de versão do L4T como problema conhecido 6266271).
- Reinstalar em um sistema que já executa o JetPack 7.2.1 é suportado — siga as instruções oficiais com atenção.

## Opção 2 — NVIDIA SDK Manager (PC host)

Escolha o SDK Manager quando você quiser:

- gravar o BSP L4T base em um **meio de armazenamento diferente** do eMMC (SSD NVMe, unidade USB ou cartão microSD), ou
- gravar um kit que **não pode receber uma conexão direta com a internet**.

**Requisitos do PC host** (conforme a documentação do SDK Manager da NVIDIA): Ubuntu
Desktop **20.04 ou 22.04** em x86_64, 8 GB de memória do sistema, 25 GB de espaço livre em
disco e uma **associação ao NVIDIA Developer Program** (gratuita) para baixar a
ferramenta e fazer login. Observação: as notas de versão do L4T 39.2 listam a distribuição
Linux do host para gravação como Ubuntu **24.04 e 22.04** — consulte a página de
requisitos de sistema do SDK Manager da NVIDIA para ver a lista atual, pois essa área muda.

**Instalar e fazer login:**

1. Baixe o pacote `.deb` do SDK Manager no site da NVIDIA e instale-o:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Inicie com `sdkmanager`, clique na aba **NVIDIA DEVELOPER** e faça login.

**Configuração de hardware e modo Force Recovery:**

1. Conecte o kit ao PC host com o cabo USB-A↔USB-C fornecido, plugado na **porta USB-C ao lado do conector de 40 pinos** (rotulada como porta 10 / J40).
2. Enquanto **mantém pressionado o botão central Force Recovery** (botão 2, entre Power e Reset), insira a fonte de alimentação USB-C na porta USB-C acima do conector DC. O kit liga em **modo Force Recovery**.
3. No host, o SDK Manager deve detectar o kit. *(Caso contrário, consulte [Solução de problemas](/pt-br/tutorials/jetson-agx-orin/troubleshooting).)*

**Etapas de gravação no SDK Manager** (resumo — siga as instruções na tela):

1. **Etapa 01:** selecione **Jetson** como categoria de produto, desmarque "Host Machine", selecione o módulo **Jetson AGX Orin** e continue.
2. **Etapa 02:** para um BSP base, selecione apenas **Jetson OS** (desmarque "Jetson SDK Components"). Aceite a licença.
3. **Etapa 03:** digite sua senha do sudo; aguarde o download. Na janela de gravação, escolha **"Manual Setup – Jetson AGX Orin"**, ignore a configuração OEM, selecione o **Storage Device** de destino e clique em **Flash**.
4. Quando a gravação terminar, o kit reinicia com o novo BSP. Conclua o `oem-config` do Ubuntu e depois instale os componentes do JetPack (veja [Início Rápido → Etapa 3](/pt-br/tutorials/jetson-agx-orin/quick-start)).

## Opção 3 — Script de gravação Linux_for_Tegra

Para usuários avançados e desenvolvedores de produto: os scripts `flash.sh` (ou initrd flash)
do pacote Jetson Linux gravam um dispositivo Jetson a partir de um PC host.
Veja a seção **Flashing Support** do [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Fatos sobre host e toolchain das notas de versão do L4T 39.2: distribuição Linux
do host para gravação — Ubuntu 24.04 / 22.04; toolchain de compilação
cruzada — GCC 13.2; tag da versão do código-fonte — `jetson_39.2_GA`.

## Modo Force Recovery — como entrar

O mesmo procedimento acima, sem precisar de host para executá-lo:

1. Com o kit desligado e o cabo de dados USB-C conectado a um host (se você precisar de um),
2. **Mantenha pressionado o botão central Force Recovery** e, em seguida, conecte a fonte de alimentação USB-C — o kit inicia em modo Force Recovery.

Para sair do modo de recuperação, desligue e ligue o kit novamente ou reinicie-o. No host, o modo
de recuperação normalmente aparece como um dispositivo USB da NVIDIA (`lsusb`).

## Após a gravação

Verifique o resultado: **[Verifique seu sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system)** — verificações
de versão do L4T, do CUDA e de toda a pilha de componentes do JetPack.

## Fontes

- [BSP Installation — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (verificado em 2026-09-23)
- [Quick Start — mesmo guia](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Status: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico pela
Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação oficial da NVIDIA.
