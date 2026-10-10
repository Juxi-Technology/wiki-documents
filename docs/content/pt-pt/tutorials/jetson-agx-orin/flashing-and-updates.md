---
title: Gravação e atualizações — Opções de instalação do BSP
sidebar_label: Gravação e atualizações
slug: /getting-started/flashing-and-updates
description: >-
  As três formas oficiais de instalar ou atualizar o BSP no kit de
  desenvolvimento Jetson AGX Orin — Jetson ISO (recomendada), NVIDIA SDK
  Manager e o script de gravação Linux_for_Tegra — além de como entrar no
  modo Force Recovery.
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

A NVIDIA suporta três formas oficiais de instalar ou atualizar o BSP no
kit de desenvolvimento. Escolha consoante a situação:

| | 💾 Começar com o eMMC | 🛠️ SDK Manager | 📜 Script de gravação |
|---|---|---|---|
| Resumo | Arrancar com o eMMC pré-gravado e atualizar com o Jetson ISO | Ferramenta GUI num PC host; grava o BSP e pode instalar pacotes JetPack | Script `flash.sh` num PC host |
| PC host Ubuntu | **Não é necessário** | Necessário | Necessário |
| Tempo típico | Primeiro arranque imediato; a atualização por ISO demora ~15 min | ~30 min para gravar | Depende da configuração |
| Para quem | Todos (opção predefinida recomendada) | Qualquer pessoa com um PC Ubuntu; necessário para gravar em NVMe/microSD/USB ou quando o kit não tem internet | Desenvolvedores de produto, utilizadores avançados |

> **Nota da Juxi:** a versão atual é o **JetPack 7.2.1 (L4T r39.2.1)**. Se o seu
> kit for novo, comece pelo **[Início rápido](/pt-pt/tutorials/jetson-agx-orin/quick-start)** — ele percorre o
> caminho recomendado de ponta a ponta.

## Opção 1 — Começar com o eMMC e atualizar com o Jetson ISO (recomendado)

O seu kit de desenvolvimento vem com um BSP L4T pré-gravado no eMMC e, de
fábrica, arranca para o ambiente de trabalho Ubuntu. O caminho de atualização
recomendado é o **Jetson ISO** — uma pen USB de arranque que atualiza o kit
**sem precisar de um PC host com Ubuntu**.

**Pré-requisito:** o BSP instalado tem de ser **L4T r35.5 ou mais recente**
(verifique com `cat /etc/nv_tegra_release`). Kits mais antigos precisam
primeiro de um método com PC host (Opção 2 ou 3 abaixo).

O procedimento completo, passo a passo (criação da pen USB com o Balena
Etcher, arranque UEFI, o pedido da cápsula QSPI, menu GRUB, seleção do
armazenamento, primeiro arranque), está em
**[Início rápido → Etapa 2](/pt-pt/tutorials/jetson-agx-orin/quick-start)**.

Destaques da documentação da NVIDIA:

- No menu GRUB escolhe o destino da instalação: **eMMC** ou **NVMe** (recomendado se instalou um SSD).
- Se lhe for pedido, confirme a **atualização da cápsula QSPI** com `Y` — é necessária para a compatibilidade e é executada duas vezes. Ignorá-la causa problemas de instalação (este ponto também figura nas notas de versão do L4T como o problema conhecido 6266271).
- Reinstalar num sistema que já executa o JetPack 7.2.1 é suportado — siga as instruções oficiais com atenção.

## Opção 2 — NVIDIA SDK Manager (PC host)

Escolha o SDK Manager quando quiser:

- gravar o BSP L4T base num **meio de armazenamento diferente** do eMMC (SSD NVMe, pen USB ou cartão microSD), ou
- gravar um kit que **não possa ter uma ligação direta à internet**.

**Requisitos do PC host** (segundo a documentação do NVIDIA SDK Manager):
Ubuntu Desktop **20.04 ou 22.04** em x86_64, 8 GB de memória do sistema,
25 GB de espaço livre em disco e uma **adesão ao NVIDIA Developer Program**
(gratuita) para descarregar a ferramenta e iniciar sessão. Nota: as notas de
versão do L4T 39.2 indicam como distribuição Linux do host para gravação o
Ubuntu **24.04 e 22.04** — consulte a página de requisitos de sistema do
NVIDIA SDK Manager para a lista atual, pois esta área muda com frequência.

**Instalar e iniciar sessão:**

1. Descarregue o pacote `.deb` do SDK Manager a partir da NVIDIA e instale-o:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Inicie-o com `sdkmanager`, clique no separador **NVIDIA DEVELOPER** e inicie sessão.

**Configuração do hardware e modo Force Recovery:**

1. Ligue o kit ao PC host com o cabo USB-A↔USB-C fornecido, ligado à **porta USB-C junto ao header de 40 pinos** (etiquetada como porta 10 / J40).
2. Mantendo premido o **botão central de Force Recovery** (botão 2, entre Power e Reset), introduza a fonte de alimentação USB-C na porta USB-C acima do conector DC. O kit liga-se em **modo Force Recovery**.
3. No host, o SDK Manager deve detetar o kit. *(Caso contrário, consulte [Resolução de problemas](/pt-pt/tutorials/jetson-agx-orin/troubleshooting).)*

**Passos de gravação no SDK Manager** (resumo — siga as instruções no ecrã):

1. **Etapa 01:** selecione **Jetson** como categoria de produto, desmarque "Host Machine", selecione o módulo **Jetson AGX Orin** e continue.
2. **Etapa 02:** para um BSP base, selecione apenas **Jetson OS** (desmarque "Jetson SDK Components"). Aceite a licença.
3. **Etapa 03:** introduza a sua palavra-passe de sudo; aguarde a transferência. Na caixa de diálogo de gravação, escolha **"Manual Setup – Jetson AGX Orin"**, ignore a configuração OEM, selecione o **Storage Device** de destino e clique em **Flash**.
4. Quando a gravação terminar, o kit reinicia no novo BSP. Conclua o `oem-config` do Ubuntu e depois instale os componentes do JetPack (veja [Início rápido → Etapa 3](/pt-pt/tutorials/jetson-agx-orin/quick-start)).

## Opção 3 — Script de gravação Linux_for_Tegra

Para utilizadores avançados e desenvolvedores de produto: os scripts `flash.sh`
(ou de gravação via initrd) do pacote Jetson Linux gravam um dispositivo Jetson
a partir de um PC host. Consulte a secção **Flashing Support** do
[Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Factos sobre o host e a toolchain das notas de versão do L4T 39.2: distribuição
Linux do host para gravação — Ubuntu 24.04 / 22.04; toolchain de compilação
cruzada — GCC 13.2; tag de lançamento do código-fonte — `jetson_39.2_GA`.

## Modo Force Recovery — como entrar

O mesmo procedimento acima; não é necessário um host para o executar:

1. Com o kit desligado e o cabo de dados USB-C ligado a um host (se precisar de um),
2. **Mantenha premido o botão central de Force Recovery** e, em seguida, ligue a fonte de alimentação USB-C — o kit arranca em modo Force Recovery.

Para sair do modo de recuperação, desligue e volte a ligar o kit ou reinicie-o.
No host, o modo de recuperação é habitualmente visível como um dispositivo USB
da NVIDIA (`lsusb`).

## Após a gravação

Verifique o resultado: **[Verifique o seu sistema](/pt-pt/tutorials/jetson-agx-orin/verify-your-system)** — verificações
de versão do L4T, do CUDA e de toda a pilha de componentes do JetPack.

## Fontes

- [BSP Installation — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (verificado em 2026-09-23)
- [Quick Start — o mesmo guia](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Estado: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
