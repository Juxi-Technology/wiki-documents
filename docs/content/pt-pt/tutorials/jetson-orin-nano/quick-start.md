---
title: Início rápido — Da caixa a um sistema JetPack 7.2.1 funcional
sidebar_label: Início rápido
slug: /getting-started/quick-start
description: >-
  Configuração inicial do NVIDIA Jetson Orin Nano Super Developer Kit (8GB):
  verificação do firmware, gravação da ISO do Jetson 7.2.1 numa unidade flash
  USB e instalação do JetPack 7.2.1 (L4T r39.2.1) num cartão microSD ou num
  SSD NVMe.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Início rápido

Esta página leva o seu NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) da
caixa até um sistema **JetPack 7.2.1** funcional (Jetson Linux / L4T r39.2.1).
Segue o percurso de configuração inicial recomendado pela NVIDIA: o método
**Jetson ISO**, instalado a partir de uma unidade flash USB. Não é necessário
um PC anfitrião com Ubuntu.

**O percurso em três fases:**

1. **Cumpra o requisito de firmware.** O firmware de fábrica mais antigo tem de ser atualizado antes de o JetPack 7.2 poder ser instalado (Etapa 1).
2. **Crie a unidade USB de instalação.** Descarregue a ISO do Jetson e grave-a numa unidade flash USB com o Balena Etcher (Etapas 2–3).
3. **Instale e configure.** Instale num cartão microSD ou num SSD NVMe, conclua a configuração inicial do Ubuntu e adicione depois os componentes do JetPack (Etapas 4–7).

> **Importante**
> A partir do JetPack 7.2, a NVIDIA deixou de publicar imagens de cartão
> microSD para este kit. **Não há qualquer imagem de cartão SD para gravar**.
> O suporte de instalação é uma pen USB. O cartão microSD (ou o SSD NVMe) é
> apenas o **destino da instalação**. Tutoriais mais antigos que começam por
> «gravar a imagem num cartão microSD» já não se aplicam.

## O que vem na caixa

- O módulo Jetson Orin Nano 8 GB com dissipador, montado na placa portadora de referência
- Uma fonte de alimentação de 19 V
- Um controlador de interface de rede sem fios 802.11ac/ab/gn (instalado na ranhura M.2 Key-E)
- Um cartão de início rápido e de suporte

**Não é incluído qualquer meio de armazenamento.** A caixa não traz cartão
microSD nem SSD NVMe, e o módulo não tem armazenamento eMMC integrado. Todo o
armazenamento vem do cartão ou da unidade que instalar.

## O que tem de fornecer

- **Armazenamento — um dos seguintes:**
  - Um **cartão microSD de 64 GB UHS-1 ou superior** (recomendado). Entra na ranhura na **parte inferior do módulo**. Insira-o antes de arrancar com o instalador.
  - Um **SSD NVMe** para uma das ranhuras M.2 Key-M da placa portadora. Opcional, mas recomendado para mais capacidade e melhor desempenho de armazenamento.
- Uma **unidade flash USB de 16 GB ou superior** — esta passa a ser o instalador.
- Um **portátil ou PC** (Windows, Mac ou Linux) com pelo menos **25 GB livres** — para descarregar a ISO e gravar a unidade flash USB.
- Um **monitor DisplayPort**, mais um teclado e um rato USB. O DisplayPort é a única saída de ecrã deste kit; a saída HDMI e o DisplayPort sobre USB-C não são suportados. Um adaptador ativo DisplayPort-para-HDMI funciona com um monitor HDMI.
- Sem monitor: um **cabo série USB-para-TTL** para uma consola série sem monitor (ver a Etapa 1).

![Cartão microSD](/images/jetson-orin-nano/microsd_64gb.png)
*Opção de armazenamento de destino 1: um cartão microSD UHS-1 de 64 GB.*

![SSD NVMe](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*Opção de armazenamento de destino 2: um SSD NVMe na ranhura M.2 Key-M.*

> **Nota da Juxi:** o pacote da loja Juxi para este kit inclui adicionalmente um
> cartão microSD de 64 GB e um módulo Wi-Fi M.2. O cartão é expedido **sem
> imagem pré-gravada** (em branco), pelo que deve seguir o procedimento ISO
> desta página para instalar o sistema nele.

## Etapa 1 — Verificar o requisito de firmware

As instalações do JetPack 7.2 e posteriores **exigem firmware UEFI/QSPI da
geração JetPack 6.x** no kit de desenvolvedor. Se o seu kit ainda tiver
firmware de fábrica mais antigo, conclua primeiro o **percurso de atualização
do JetPack 6.x**.

Com um monitor ligado:

1. Ligue o monitor DisplayPort e um teclado USB. Ligue a fonte de alimentação de 19 V — o kit liga-se automaticamente e o LED verde junto ao conector USB-C acende.
2. **Prima `Esc` repetidamente depois de aparecer o ecrã de arranque da NVIDIA.** Isto abre o menu de configuração UEFI.
3. Verifique a linha da **versão de firmware** perto do topo do ecrã:

| Versão de firmware | O que fazer |
|---|---|
| 36.x ou mais recente | Continue para a Etapa 2 |
| Anterior a 36.0 | Conclua primeiro o percurso de atualização do JetPack 6.x (ver abaixo) |

![Menu UEFI com a versão de firmware](/images/jetson-orin-nano/firmware-version-check.png)
*A versão de firmware é apresentada perto do topo do menu de configuração UEFI.*

Alternativa sem monitor: ligue um cabo série USB-para-TTL ao conector de
botões (fio TX do adaptador no pino 3 / RXD, fio RX do adaptador no pino 4 /
TXD, fio de terra do adaptador no pino 7 / GND), abra uma consola série no seu
PC e prima `Esc` na consola enquanto as opções de pré-arranque são
apresentadas.

![Cabo série USB-para-TTL no conector de botões](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*Percurso sem monitor: um cabo série USB-para-TTL ligado ao conector de botões.*

### Se o firmware for demasiado antigo

O **percurso de atualização do JetPack 6.x** traz o firmware para a versão
necessária. Em resumo (passos completos em
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)):

1. Arranque com a **imagem-ponte do JetPack 5.1.3** (nome do ficheiro `JP513-orin-nano-sd-card-image_b29.zip`) a partir de um cartão microSD.
2. Um serviço em segundo plano agenda uma atualização do carregador de arranque (confirme com `sudo systemctl status nv-l4t-bootloader-config`).
3. Reinicie. A atualização de firmware é executada durante este arranque (confirme com `sudo nvbootctrl dump-slots-info`).
4. Instale o atualizador QSPI: `sudo apt update`, depois `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater` e reinicie.
5. Desligue, remova o cartão-ponte, insira o seu armazenamento de destino e continue para a Etapa 2.

Este percurso precisa de um cartão microSD e de um leitor de cartões. Sem isso,
a alternativa é o SDK Manager num PC anfitrião com Ubuntu (ver
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)).
Há ainda um caso: se o firmware vier do BSP 36.2 (JetPack 5.0 DP), a atualização
de cápsula dentro do instalador não o suporta — leve o kit a qualquer versão
posterior antes de executar a instalação por ISO do JetPack 7.2.1.

Se arrancar com o instalador mesmo assim e o ecrã ficar preto ou aparecer uma
shell UEFI, o firmware é provavelmente demasiado antigo. Não repita o arranque
vezes sem conta. Desligue, conclua o percurso de atualização e tente novamente.

![Shell interativa UEFI](/images/jetson-orin-nano/uefi_interactive_shell.png)
*Uma shell UEFI (ou um ecrã preto) em vez do instalador significa normalmente que o firmware é demasiado antigo para a versão do JetPack de destino.*

## Etapa 2 — Descarregar a Jetson ISO

Descarregue a ISO do instalador do JetPack 7.2.1 (etiqueta: **Jetson ISO
(r39.2.1)**) da
[página de descarregamentos do JetPack](https://developer.nvidia.com/embedded/jetpack/downloads),
ou utilize esta ligação direta:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

Os nomes dos ficheiros ISO seguem o padrão
`jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` (para esta versão:
`jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). As páginas de
descarregamento da NVIDIA não indicam o tamanho do ficheiro ISO nem somas de
verificação.

## Etapa 3 — Gravar a ISO numa unidade flash USB

1. Instale o **Balena Etcher** a partir de <https://etcher.balena.io/#download-etcher> (Windows, Mac ou Linux).
2. Insira a unidade flash USB no seu PC.
3. No Etcher, selecione o ficheiro ISO, selecione a unidade USB e inicie a gravação.

![Gravação da Jetson ISO numa unidade flash USB com o Balena Etcher](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*A gravar a Jetson ISO na unidade flash USB com o Balena Etcher.*

> **Atenção**
> **Não grave a ISO num cartão microSD.** A partir do JetPack 7.2, as imagens
> de cartão SD deixaram de ser suportadas. Grave a ISO numa unidade flash USB
> e utilize-a para instalar o Jetson Linux no seu cartão microSD ou SSD NVMe.

Copiar o ficheiro ISO para a pen com um gestor de ficheiros não funciona — tem
de ser gravado como imagem de disco. A pen final é apenas um instalador; não
arranca para um ambiente de trabalho utilizável.

## Etapa 4 — Arrancar o instalador e instalar

1. Desligue o kit e instale o **armazenamento de destino**:
   - cartão microSD: insira-o na ranhura na **parte inferior do módulo**.
   - SSD NVMe: instale-o na ranhura M.2 Key-M da placa portadora.
   Instale o armazenamento de destino antes de arrancar com o instalador.
2. Insira a unidade flash USB do instalador. Ligue o monitor, o teclado e o rato e, em seguida, ligue a fonte de alimentação. Ligue a unidade do instalador **diretamente** ao kit, e não através de um hub: a NVIDIA documenta um hub USB 3.0 (modelo UH400) que quebra a instalação por ISO e um adaptador USB-para-Ethernet (TRENDnet TU2-ET100) que pode fazer falhar a gravação. Ver a **[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**.
3. **Prima `Esc` quando aparecer o ecrã de arranque com o logótipo da NVIDIA.** Selecione **Boot Manager**, selecione o seu disco USB e prima Enter para arrancar a partir dele. A NVIDIA recomenda selecionar explicitamente o disco USB, para que saiba que está a executar o instalador correto.
4. **Quando aparecer o pedido de atualização da cápsula QSPI, prima `Y` nos 30 segundos seguintes.** Este é o passo mais frequentemente esquecido. É fácil não dar pelo pedido em tempo real. Se o tempo esgotar e a instalação continuar sem a atualização, a instalação falha mais tarde — reinicie a instalação e prima `Y` quando o pedido aparecer. A atualização de cápsula é executada em **duas passagens**, e o kit pode reiniciar entre elas ou depois. Isto é normal; aguarde que ambas as passagens terminem. Os kits cujo firmware QSPI atual é r38.2.0/r38.2.1 têm de confirmar a atualização de firmware uma segunda vez depois de a primeira passagem terminar (problema 6480645 das notas de versão do r39.2.1) — prima `Y` novamente se for pedido.
5. No **menu GRUB de instalação do BSP do Jetson**, selecione **Install Jetson ISO r39.2.1**. Selecione o dispositivo de armazenamento de destino (o cartão microSD ou o SSD NVMe) e confirme. **A instalação apaga o dispositivo selecionado** — verifique a seleção antes de confirmar.
6. Aguarde que a instalação termine. As instruções da NVIDIA indicam que aparece texto branco a desfilar no ecrã durante vários minutos; reinicie quando for pedido. Os relatos da comunidade sobre o tempo de instalação variam muito — de cerca de 15 minutos a bastante mais (não confirmado, relatos de fóruns).
7. **Retire a unidade flash USB** para que o kit arranque o novo sistema a partir do armazenamento de destino e não novamente a partir do instalador.

Os funcionários da NVIDIA nos fóruns também recomendam manter um ecrã ligado
durante a instalação por ISO.

## Etapa 5 — Primeiro arranque e configuração inicial do Ubuntu

Depois de o instalador reiniciar, o kit inicia a configuração inicial do Ubuntu
(`oem-config`):

1. Leia e aceite o EULA do software NVIDIA Jetson.
2. Selecione o idioma do sistema, o layout do teclado e o fuso horário.
3. Ligue-se a uma rede.
4. Crie um nome de utilizador, uma palavra-passe e um nome do computador.
5. Inicie sessão no ambiente de trabalho Ubuntu.

## Etapa 6 — Instalar os componentes do JetPack

A ISO instala o sistema base (Jetson Linux). O CUDA, o cuDNN, o TensorRT e o
resto da pilha do JetPack são adicionados após o primeiro arranque. No ambiente
de trabalho do kit, abra um terminal e execute:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

Reinicie depois da instalação, caso seja pedido.

Verifique o resultado:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

O `/etc/nv_tegra_release` deve indicar uma versão R39 com revisão 2.1. Consulte
[Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system)
para a lista de verificação completa.

## Etapa 7 — Verificar o modo de alimentação

O modo de alimentação predefinido é tipicamente **25W**. Para o máximo
desempenho, clique no modo de alimentação atual na barra superior do ambiente
de trabalho Ubuntu, selecione **Power Mode** e escolha **MAXN SUPER**; na linha
de comandos, `sudo /usr/sbin/nvpmodel -q` mostra o modo atual. As instalações
por ISO do JetPack 7.2.1 usam por predefinição a configuração de gravação do
Modo Super, pelo que 25W e MAXN SUPER devem estar disponíveis — se faltarem,
ver a [Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

![Seleção de MAXN SUPER no menu do modo de alimentação](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*Selecione Power Mode → MAXN SUPER para o máximo desempenho.*

## Resolução de problemas — verificações rápidas

| Sintoma | Primeira coisa a verificar |
|---|---|
| O kit não liga | A fonte de alimentação de 19 V tem de estar ligada à tomada DC. O kit liga-se automaticamente; o LED verde junto ao conector USB-C deve acender. |
| O instalador USB não arranca | Selecione explicitamente o disco USB no Gestor de Arranque UEFI (`Esc` no ecrã de arranque). Verifique se o firmware é 36.x ou mais recente. |
| Ecrã preto ou shell UEFI em vez do instalador | O firmware pode ser demasiado antigo. Conclua primeiro o percurso de atualização do JetPack 6.x. |
| O instalador ignora a configuração de idioma/rede/nome de utilizador; o primeiro arranque bloqueia num ecrã preto | O pedido da cápsula QSPI foi esquecido. Reinicie a instalação e prima `Y` nos 30 segundos seguintes. |
| O instalador não mostra o armazenamento de destino | microSD: verifique se está totalmente inserido na ranhura na parte inferior do módulo. NVMe: volte a encaixar a unidade e reinicie o instalador. |
| Apenas modos de alimentação de 7W/15W; 25W e MAXN SUPER em falta | Ver a [Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting). |

## Fontes

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA nas datas indicadas; ainda não verificado em hardware físico
pela Juxi Technology.*

**Créditos das imagens:** As imagens desta página provêm do *Jetson Orin Nano
Developer Kit User Guide* oficial da NVIDIA (descarregado em 2026-09-26) e
continuam a ser © NVIDIA Corporation. São reproduzidas aqui para ilustrar o
fluxo de configuração oficial.

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
