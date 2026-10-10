---
title: Início rápido — Do desempacotamento a um sistema JetPack 7.2.1 funcional
sidebar_label: Início rápido
slug: /getting-started/quick-start
description: >-
  Passo a passo do kit de desenvolvimento NVIDIA Jetson AGX Orin (64GB):
  primeira inicialização, atualização do BSP para JetPack 7.2.1 (L4T r39.2.1)
  com o método Jetson ISO e instalação dos componentes do JetPack.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# Início rápido

Esta página leva o seu kit de desenvolvimento Jetson AGX Orin (64GB) da caixa
até um sistema **JetPack 7.2.1** totalmente atualizado. O caminho abaixo segue o
fluxo de configuração atual recomendado pela NVIDIA; cada etapa foi verificada
com a documentação oficial do kit de desenvolvimento da NVIDIA na data listada
no final desta página.

**O caminho em três etapas:**

1. **Inicialize direto da caixa** e conclua a configuração inicial do Ubuntu (`oem-config`).
2. **Atualize o BSP** para L4T r39.2.1 (JetPack 7.2.1) usando o método **Jetson ISO** — um pen drive inicializável, sem necessidade de PC host com Ubuntu.
3. **Instale os componentes do JetPack** (CUDA, cuDNN, TensorRT, ...) com um único comando `apt`.

> **Por que atualizar com a ISO em USB em vez do SDK Manager?**
> A NVIDIA agora recomenda o método Jetson ISO para o kit de desenvolvimento: ele
> atualiza a placa diretamente a partir de um pen drive e **não** exige uma
> máquina host com Ubuntu separada. O SDK Manager continua disponível como
> alternativa (veja a Etapa 3b).

## O que você precisa

Na caixa:

- Módulo Jetson AGX Orin e placa portadora de referência
- Módulo Wi-Fi
- Fonte de alimentação USB Type-C
- Cabo USB Type-C para USB Type-A

Você fornece:

- Um monitor com entrada DisplayPort e um cabo DisplayPort, além de teclado e mouse USB — **ou** um segundo computador (Windows/Mac/Linux), se você preferir uma configuração sem monitor
- Conexão com a internet (cabo Ethernet ou Wi-Fi configurado durante a configuração inicial)
- Um pen drive com capacidade suficiente para a imagem ISO (confira o tamanho mostrado na página de download quando chegar lá) — necessário para a atualização via ISO na Etapa 2
- Um PC para gravar o USB de instalação (o Balena Etcher roda em Windows/Mac/Linux)

## Etapa 1 — Primeira inicialização e configuração inicial do Ubuntu

Seu kit de desenvolvimento vem com uma imagem BSP L4T pré-gravada na eMMC e
inicializa na área de trabalho do Ubuntu direto da caixa. Unidades recém-enviadas
podem trazer uma versão **mais antiga** do L4T (por exemplo, r35.x / JetPack 5.x);
a Etapa 2 leva qualquer unidade para a versão atual.

Com um monitor conectado:

1. Conecte um monitor DisplayPort, teclado e mouse USB e (opcionalmente) um cabo Ethernet.
2. Conecte a fonte de alimentação incluída à **porta USB Type-C acima do conector DC**. O kit liga automaticamente — o LED branco perto do botão de energia acende. Se não ligar, pressione o botão de energia.
3. Em cerca de um minuto, a tela do Ubuntu aparece. A primeira inicialização guia você pelo `oem-config`: aceitar o EULA do software da NVIDIA, escolher idioma/teclado/fuso horário, criar sua conta de usuário e configurar a rede.
4. Depois que o `oem-config` termina, o kit reinicia na área de trabalho do Ubuntu.

![Área de trabalho do Ubuntu após a configuração inicial](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

A configuração sem monitor também é possível a partir de outro computador —
consulte o Guia de Início Rápido da NVIDIA (link no final da página) para saber
as conexões exatas.

> **Dica da Juxi:** Se você pretende rodar o sistema a partir de um NVMe SSD,
> tenha isso em mente na Etapa 2 — o instalador ISO pode instalar diretamente na
> unidade NVMe.

## Etapa 2 — Atualizar o BSP com a Jetson ISO (recomendado)

**Pré-requisito:** o BSP instalado precisa ser **L4T r35.5 ou mais recente** para
que o método ISO funcione. Verifique primeiro:

```bash
cat /etc/nv_tegra_release
```

Um sistema JetPack 7.2.1 reporta `# R39 (release), REVISION: 2.1`. Se a saída
mostrar uma versão mais antiga, atualize primeiro para L4T r35.5 ou mais recente
(veja *Ressalvas* abaixo).

1. **Baixe a Jetson ISO** para JetPack 7.2.1 / L4T r39.2.1:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **Crie o USB de instalação.** Grave a ISO em um pen drive com o
   [Balena Etcher](https://etcher.balena.io) ("Flash from file" → selecione a ISO
   → selecione o pen drive).
   > **Não** simplesmente copie o arquivo ISO para o pen drive com um gerenciador
   > de arquivos — ele precisa ser gravado como imagem de disco, caso contrário
   > não inicializará.
3. **Insira o pen drive** no kit de desenvolvimento e ligue-o. Se ele não
   inicializar pelo USB automaticamente, abra o gerenciador de inicialização UEFI
   durante o boot e selecione o pen drive.
4. **Inicialize e instale:**
   - Se aparecer uma solicitação para confirmar uma **atualização de cápsula
     QSPI**, pressione `Y`. Essa atualização de firmware é executada *antes* da
     instalação da ISO e é executada **duas vezes**. Não a ignore — ela é
     necessária para a compatibilidade. Se você perder o prompt, reinicie a
     instalação e confirme quando ele aparecer.
   - No menu do GRUB, selecione **Install Jetson ISO r39.2.1** e pressione Enter.
   - Escolha o destino de armazenamento com as teclas de seta: **eMMC**
     (armazenamento interno padrão) ou **NVMe** (recomendado se você instalou um
     SSD).
   - A instalação leva cerca de 15 minutos, com a saída de texto rolando na tela.
5. **Remova o pen drive** depois que a instalação terminar e o sistema
   reiniciar — caso contrário, o kit pode inicializar novamente pelo pen drive
   em vez do novo sistema.
6. O sistema atualizado inicia o `oem-config` da primeira inicialização — conclua
   a configuração do Ubuntu novamente para criar a conta de usuário da nova
   instalação.

### O que você verá (em ordem)

![Gravando a ISO em um pen drive com o Balena Etcher](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Gravando a Jetson ISO em um pen drive com o Balena Etcher.*

![Gerenciador de Inicialização UEFI com o pen drive selecionado](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*Se o kit não inicializar pelo pen drive automaticamente, selecione-o no Gerenciador de Inicialização UEFI.*

![Prompt de confirmação da atualização de cápsula QSPI](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*O prompt da atualização de cápsula QSPI — pressione `Y`. Ela é necessária para a compatibilidade e é executada duas vezes.*

![Menu GRUB da Jetson ISO](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*Selecione "Install Jetson ISO r39.2.1".*

![Opções de destino de armazenamento no menu GRUB](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*Escolha eMMC ou NVMe como destino da instalação.*

![Tela de progresso do instalador](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*O instalador roda cerca de 15 minutos.*

![Tela de boas-vindas do oem-config após a atualização](/images/jetson-agx-orin/oem-config_welcome.png)
*Após a atualização, o `oem-config` roda novamente para configurar o novo sistema.*

### Ressalvas e problemas conhecidos

- **Unidades mais antigas (< L4T r35.5):** o caminho da Jetson ISO exige um BSP
  instalado r35.5 ou mais recente. Para atualizar primeiro um kit mais antigo,
  use um dos métodos com PC host (SDK Manager ou o script `flash.sh`) — veja
  [Gravação e Atualizações](/pt-br/tutorials/jetson-agx-orin/flashing-and-updates).
- **Perdeu o prompt da cápsula QSPI?** Reinicie a instalação da ISO e pressione `Y`.
- **Tela preta durante a instalação:** alguns switches KVM lidam mal com a saída
  de vídeo do AGX Orin durante a instalação da ISO. Conecte o monitor diretamente
  ao kit de desenvolvimento e tente novamente.

## Etapa 3 — Instalar os componentes do JetPack

### 3a. Via `apt` (mais simples — não precisa de PC host)

Na área de trabalho do kit, abra um terminal (`Ctrl`+`Alt`+`T`) e execute:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

Isso instala o CUDA, o cuDNN, o TensorRT e o restante da pilha do JetPack.
Espere que leve **cerca de uma hora**, dependendo da velocidade da conexão.

Verifique o resultado: `cat /etc/nv_tegra_release` deve reportar R39 / REVISION 2.1,
e o kit de ferramentas CUDA fica disponível (`nvcc --version`). Veja
[Verificar Seu Sistema](/pt-br/tutorials/jetson-agx-orin/verify-your-system) para o checklist completo.

### 3b. Via SDK Manager (alternativa)

O SDK Manager instala os componentes do JetPack a partir de um PC host via USB:

1. Com o kit ligado, conecte-o ao PC host usando o cabo USB Type-C para Type-A
   incluído, conectado à **porta USB Type-C ao lado do conector de 40 pinos** do
   kit.
2. No SDK Manager, escolha o alvo Jetson AGX Orin e selecione **Jetson SDK
   Components** (em vez de gravar o "Jetson OS" novamente), depois siga as
   etapas na tela (conexão USB, endereço `192.168.55.1`).

As instruções completas do SDK Manager são mantidas pela NVIDIA (veja os links
abaixo) e serão abordadas em detalhes no nosso guia de Gravação.

## Solução de problemas — respostas rápidas

| Sintoma | Primeira coisa a verificar |
|---|---|
| O kit não liga | Fonte de alimentação conectada na porta USB-C **acima do conector DC**; pressione o botão de energia |
| Sem saída de vídeo | Cabo DisplayPort (use um adaptador ativo DP→HDMI para monitores HDMI); tente inicializar sem o USB da ISO inserido |
| O instalador da ISO não inicia | USB gravado com o Etcher (não copiado como arquivo); selecione o USB no gerenciador de inicialização UEFI |
| Prompt da QSPI apareceu | Pressione `Y` — obrigatório; a atualização é executada duas vezes |
| Tela fica preta no meio da instalação | Interferência do switch KVM — conecte o monitor diretamente |

## Fontes e verificação

Esta página foi escrita e verificada pela Juxi Technology com base na
documentação oficial da NVIDIA:

- [Jetson AGX Orin Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-23)
- [Jetson AGX Orin Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (verificado em 2026-09-23)
- [BSP Installation (SDK Manager / flash script)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*Status: revisado em 2026-10-11. As etapas ainda não foram verificadas em hardware físico pela
Juxi Technology; elas se baseiam na documentação oficial da NVIDIA nas datas
acima.*

**Créditos das imagens:** Todas as capturas de tela desta página são do
*Jetson AGX Orin Developer Kit User Guide* oficial da NVIDIA (baixado em 2026-09-23)
e permanecem © NVIDIA Corporation. Elas são reproduzidas aqui para ilustrar o
fluxo de configuração oficial.

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Este guia é
publicado pela Juxi Technology e não é uma publicação da NVIDIA.
