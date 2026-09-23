---
title: Início rápido — Da caixa a um sistema JetPack 7.2.1 funcional
sidebar_label: Início rápido
slug: /getting-started/quick-start
description: >-
  Guia detalhado do kit de desenvolvedor NVIDIA Jetson AGX Orin (64GB): primeiro
  arranque, atualização do BSP para JetPack 7.2.1 (L4T r39.2.1) com o método
  Jetson ISO e instalação dos componentes do JetPack.
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

Esta página leva o seu kit de desenvolvedor Jetson AGX Orin (64GB) da caixa até
um sistema **JetPack 7.2.1** totalmente atualizado. O percurso abaixo segue o
fluxo de configuração atual recomendado pela NVIDIA; cada etapa foi verificada
com a documentação oficial do kit de desenvolvedor da NVIDIA na data indicada no
final desta página.

**O percurso em três etapas:**

1. **Arrancar diretamente da caixa** e concluir a configuração inicial do Ubuntu (`oem-config`).
2. **Atualizar o BSP** para L4T r39.2.1 (JetPack 7.2.1) através do método **Jetson ISO** — uma unidade flash USB de arranque, sem necessidade de PC anfitrião com Ubuntu.
3. **Instalar os componentes do JetPack** (CUDA, cuDNN, TensorRT, ...) com um único comando `apt`.

> **Porquê uma atualização por ISO em USB em vez do SDK Manager?**
> A NVIDIA recomenda agora o método Jetson ISO para o kit de desenvolvedor:
> atualiza a placa diretamente a partir de uma unidade flash USB e **não** exige
> uma máquina anfitriã separada com Ubuntu. O SDK Manager continua disponível
> como alternativa (ver a Etapa 3b).

## O que precisa

Na caixa:

- Módulo Jetson AGX Orin e placa portadora de referência
- Módulo Wi-Fi
- Fonte de alimentação USB Type-C
- Cabo USB Type-C para USB Type-A

Fornecido por si:

- Um monitor com entrada DisplayPort e um cabo DisplayPort, além de teclado e rato USB — **ou** um segundo computador (Windows/Mac/Linux), caso prefira uma configuração sem monitor
- Ligação à internet (cabo Ethernet ou Wi-Fi configurado durante a configuração inicial)
- Uma unidade flash USB com capacidade suficiente para a imagem ISO (verifique o tamanho indicado na página de descarregamento quando lá chegar) — necessária para a atualização por ISO na Etapa 2
- Um PC para gravar a unidade USB de instalação (o Balena Etcher funciona em Windows/Mac/Linux)

## Etapa 1 — Primeiro arranque e configuração inicial do Ubuntu

O seu kit de desenvolvedor vem com uma imagem BSP L4T pré-gravada na eMMC e
arranca para o ambiente de trabalho Ubuntu logo de origem. Unidades expedidas
recentemente podem trazer uma versão L4T **mais antiga** (por exemplo, r35.x /
JetPack 5.x); a Etapa 2 leva qualquer unidade à versão atual.

Com um monitor ligado:

1. Ligue um monitor DisplayPort, um teclado e um rato USB e (opcionalmente) um cabo Ethernet.
2. Ligue a fonte de alimentação incluída à **porta USB Type-C acima do conector DC**. O kit liga-se automaticamente — o LED branco junto ao botão de alimentação acende. Caso contrário, prima o botão de alimentação.
3. Ao fim de cerca de um minuto, aparece o ecrã do Ubuntu. O primeiro arranque guia-o ao longo do `oem-config`: aceitar o EULA do software da NVIDIA, escolher idioma/teclado/fuso horário, criar a sua conta de utilizador e configurar a rede.
4. Depois de o `oem-config` terminar, o kit reinicia para o ambiente de trabalho Ubuntu.

![Ambiente de trabalho Ubuntu após a configuração inicial](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

A configuração sem monitor também é possível a partir de outro computador —
consulte o Quick Start Guide da NVIDIA (ligação no final da página) para saber o
esquema de ligações exato.

> **Sugestão da Juxi:** Se planeia executar o sistema a partir de um SSD NVMe,
> tenha isso em conta na Etapa 2 — o instalador ISO pode instalar diretamente na
> unidade NVMe.

## Etapa 2 — Atualizar o BSP com a Jetson ISO (recomendado)

**Pré-requisito:** o BSP instalado tem de ser **L4T r35.5 ou mais recente** para
o método ISO funcionar. Verifique primeiro:

```bash
cat /etc/nv_tegra_release
```

Um sistema JetPack 7.2.1 indica `# R39 (release), REVISION: 2.1`. Se a saída
mostrar uma versão mais antiga, atualize primeiro para L4T r35.5 ou mais
recente (ver *Ressalvas* abaixo).

1. **Descarregue a Jetson ISO** para JetPack 7.2.1 / L4T r39.2.1:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **Crie a unidade USB de instalação.** Grave a ISO numa unidade flash USB com
   o [Balena Etcher](https://etcher.balena.io) ("Flash from file" → selecionar a
   ISO → selecionar a unidade USB).
   > **Não** basta copiar o ficheiro ISO para a unidade com um gestor de
   > ficheiros — tem de ser gravado como imagem de disco, caso contrário não
   > arranca.
3. **Insira a unidade USB** no kit de desenvolvedor e ligue-o. Se não arrancar
   automaticamente a partir da USB, abra o gestor de arranque UEFI durante o
   arranque e selecione a unidade USB.
4. **Arrancar e instalar:**
   - Se lhe for pedido para confirmar uma **atualização de cápsula QSPI**, prima `Y`. Esta atualização de firmware é executada *antes* da instalação da ISO e é executada **duas vezes**. Não a ignore — é necessária para a compatibilidade. Se deixar passar o pedido, reinicie a instalação e confirme quando este aparecer.
   - No menu GRUB, selecione **Install Jetson ISO r39.2.1** e prima Enter.
   - Escolha o destino de armazenamento com as teclas de seta: **eMMC** (armazenamento interno predefinido) ou **NVMe** (recomendado se instalou um SSD).
   - A instalação demora cerca de 15 minutos, com texto a desfilar no ecrã.
5. **Retire a unidade USB** depois de a instalação terminar e o sistema
   reiniciar — caso contrário, o kit pode voltar a arrancar a partir da unidade
   em vez do novo sistema.
6. O sistema atualizado inicia o `oem-config` do primeiro arranque — conclua
   novamente a configuração do Ubuntu para criar a conta de utilizador da nova
   instalação.

### O que vai ver (por ordem)

![Gravação da ISO numa unidade USB com o Balena Etcher](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*A gravar a Jetson ISO numa unidade flash USB com o Balena Etcher.*

![Gestor de arranque UEFI com a unidade USB selecionada](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*Se o kit não arrancar automaticamente a partir da unidade USB, selecione-a no gestor de arranque UEFI.*

![Pedido de confirmação da atualização de cápsula QSPI](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*O pedido de atualização de cápsula QSPI — prima `Y`. É necessária para a compatibilidade e é executada duas vezes.*

![Menu GRUB da Jetson ISO](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*Selecione "Install Jetson ISO r39.2.1".*

![Opções de destino de armazenamento no menu GRUB](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*Escolha eMMC ou NVMe como destino da instalação.*

![Ecrã de progresso do instalador](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*O instalador é executado durante cerca de 15 minutos.*

![Ecrã de boas-vindas do oem-config após a atualização](/images/jetson-agx-orin/oem-config_welcome.png)
*Após a atualização, o `oem-config` é novamente executado para configurar o novo sistema.*

### Ressalvas e problemas conhecidos

- **Unidades mais antigas (< L4T r35.5):** o método Jetson ISO requer um BSP
  instalado r35.5 ou mais recente. Para atualizar primeiro um kit mais antigo,
  use um dos métodos com PC anfitrião (SDK Manager ou o script `flash.sh`) —
  ver [Gravação e atualizações](/pt-pt/tutorials/jetson-agx-orin/flashing-and-updates).
- **Deixou passar o pedido da cápsula QSPI?** Reinicie a instalação da ISO e
  prima `Y`.
- **Ecrã preto durante a instalação:** alguns chaveadores KVM processam mal a
  saída de vídeo do AGX Orin durante a instalação da ISO. Ligue o monitor
  diretamente ao kit de desenvolvedor e tente novamente.

## Etapa 3 — Instalar os componentes do JetPack

### 3a. Via `apt` (o mais simples — não requer PC anfitrião)

No ambiente de trabalho do kit, abra um terminal (`Ctrl`+`Alt`+`T`) e execute:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

Isto instala o CUDA, o cuDNN, o TensorRT e o resto da pilha do JetPack. Conte
com **cerca de uma hora**, dependendo da velocidade da ligação.

Verifique o resultado: `cat /etc/nv_tegra_release` deve indicar R39 / REVISION
2.1, e o toolkit CUDA fica disponível (`nvcc --version`). Consulte
[Verificar o sistema](/pt-pt/tutorials/jetson-agx-orin/verify-your-system) para a lista
de verificação completa.

### 3b. Via SDK Manager (alternativa)

O SDK Manager instala os componentes do JetPack a partir de um PC anfitrião
através de USB:

1. Com o kit ligado, ligue-o ao PC anfitrião com o cabo USB Type-C para USB
   Type-A fornecido com o kit, ligado à **porta USB Type-C ao lado do conector
   de 40 pinos** do kit.
2. No SDK Manager, escolha o destino Jetson AGX Orin e selecione **Jetson SDK
   Components** (em vez de gravar novamente o "Jetson OS"), e depois siga os
   passos apresentados no ecrã (ligação USB, endereço `192.168.55.1`).

As instruções completas do SDK Manager são mantidas pela NVIDIA (ver ligações
abaixo) e serão abordadas em detalhe no nosso guia de gravação.

## Resolução de problemas — verificações rápidas

| Sintoma | Primeira coisa a verificar |
|---|---|
| O kit não liga | Fonte de alimentação ligada à porta USB-C **acima do conector DC**; prima o botão de alimentação |
| Sem saída de vídeo | Cabo DisplayPort (use um adaptador ativo DP→HDMI para monitores HDMI); tente arrancar sem a unidade USB da ISO inserida |
| O instalador da ISO não inicia | USB gravada com o Etcher (não copiada como ficheiro); selecione a unidade USB no gestor de arranque UEFI |
| Apareceu o pedido QSPI | Prima `Y` — obrigatório; a atualização é executada duas vezes |
| Ecrã fica preto a meio da instalação | Interferência do chaveador KVM — ligue o monitor diretamente |

## Fontes e verificação

Esta página foi escrita e verificada pela Juxi Technology com base na
documentação oficial da NVIDIA:

- [Jetson AGX Orin Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-23)
- [Jetson AGX Orin Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (verificado em 2026-09-23)
- [BSP Installation (SDK Manager / flash script)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*Estado: rascunho. As etapas ainda não foram verificadas em hardware físico pela
Juxi Technology; baseiam-se na documentação oficial da NVIDIA nas datas acima
indicadas.*

**Créditos das imagens:** Todas as capturas de ecrã desta página são do
*Jetson AGX Orin Developer Kit User Guide* oficial da NVIDIA (descarregado em
2026-09-23) e permanecem © NVIDIA Corporation. São reproduzidas aqui para
ilustrar o fluxo de configuração oficial.

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Este guia é
publicado pela Juxi Technology e não é uma publicação da NVIDIA.
