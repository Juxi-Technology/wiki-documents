---
title: Início rápido — Do desempacotamento a um sistema JetPack 7.2.1 funcional
sidebar_label: Início rápido
slug: /getting-started/quick-start
description: >-
  Configuração inicial do kit de desenvolvedor NVIDIA Jetson Orin Nano Super
  (8GB): a verificação do firmware, a gravação da ISO do Jetson 7.2.1 em um pen
  drive USB e a instalação do JetPack 7.2.1 (L4T r39.2.1) em um cartão microSD
  ou SSD NVMe.
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

Esta página leva o seu kit de desenvolvedor NVIDIA Jetson Orin Nano Super (8 GB) da caixa até um sistema **JetPack 7.2.1** funcional (Jetson Linux / L4T r39.2.1). O caminho abaixo segue o fluxo de primeira configuração recomendado pela NVIDIA: o método **Jetson ISO**, instalado a partir de um pen drive USB. Não é necessário um PC host com Ubuntu.

**O caminho em três etapas:**

1. **Passe pela barreira de firmware.** Um firmware de fábrica mais antigo precisa ser atualizado antes de o JetPack 7.2 poder ser instalado (Etapa 1).
2. **Crie o USB de instalação.** Baixe a Jetson ISO e grave-a em um pen drive USB com o Balena Etcher (Etapas 2–3).
3. **Instale e configure.** Instale em um cartão microSD ou em um SSD NVMe, conclua a configuração inicial do Ubuntu e adicione os componentes do JetPack (Etapas 4–7).

> **Importante**
> A partir do JetPack 7.2, a NVIDIA não publica mais imagens de cartão microSD
> para este kit. **Não há imagem de cartão SD para gravar.** A mídia de
> instalação é um pen drive USB. O cartão microSD (ou SSD NVMe) é apenas o
> **destino da instalação**. Tutoriais mais antigos que começam com "grave a
> imagem em um cartão microSD" não se aplicam mais.

## O que vem na caixa

- O módulo Jetson Orin Nano 8 GB com dissipador de calor, montado na placa portadora de referência
- Uma fonte de alimentação de 19 V
- Um controlador de interface de rede sem fio 802.11ac/ab/gn (instalado no slot M.2 Key-E)
- Um cartão de início rápido e suporte

**Nenhum meio de armazenamento está incluído.** A caixa não traz cartão microSD nem SSD NVMe, e o módulo não tem armazenamento eMMC integrado. Todo o armazenamento vem do cartão ou da unidade que você instalar.

## O que você precisa fornecer

- **Armazenamento — uma das opções:**
  - Um **cartão microSD de 64 GB UHS-1 ou maior** (recomendado). Ele vai no slot da **parte inferior do módulo**. Insira-o antes de inicializar o instalador.
  - Um **SSD NVMe** para um dos slots M.2 Key-M da placa portadora. Opcional, mas recomendado para mais capacidade e melhor desempenho de armazenamento.
- Um **pen drive USB de 16 GB ou maior** — ele será o instalador.
- Um **laptop ou PC** (Windows, Mac ou Linux) com pelo menos **25 GB livres** — para baixar a ISO e gravar o pen drive USB.
- Um **monitor DisplayPort**, além de teclado e mouse USB. O DisplayPort é a única saída de vídeo deste kit; saída HDMI e DisplayPort sobre USB-C não são suportados. Um adaptador ativo DisplayPort para HDMI funciona com um monitor HDMI.
- Sem monitor: um **cabo serial USB para TTL** para um console serial sem monitor (veja a Etapa 1).

![Cartão microSD](/images/jetson-orin-nano/microsd_64gb.png)
*Opção de armazenamento de destino 1: um cartão microSD de 64 GB UHS-1.*

![SSD NVMe](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*Opção de armazenamento de destino 2: um SSD NVMe no slot M.2 Key-M.*

> **Nota da Juxi:** O pacote da loja Juxi para este kit inclui ainda um cartão
> microSD de 64 GB e um módulo Wi-Fi M.2. O cartão vem **sem imagem pré-gravada**
> (em branco), então siga o procedimento da ISO desta página para instalar o
> sistema nele.

## Etapa 1 — Verifique a barreira de firmware

As instalações do JetPack 7.2 e posteriores **exigem firmware UEFI/QSPI da geração JetPack 6.x** no kit de desenvolvedor. Se o seu kit ainda tiver o firmware de fábrica mais antigo, conclua primeiro o **caminho de atualização do JetPack 6.x**.

Com um monitor conectado:

1. Conecte o monitor DisplayPort e um teclado USB. Conecte a fonte de alimentação de 19 V — o kit liga automaticamente, e um LED verde ao lado do conector USB-C acende.
2. **Pressione `Esc` repetidamente depois que a tela de inicialização da NVIDIA aparecer.** Isso abre o menu de configuração da UEFI.
3. Verifique a linha da **versão de firmware** perto do topo da tela:

| Versão de firmware | O que fazer |
|---|---|
| 36.x ou mais recente | Continue para a Etapa 2 |
| Mais antigo que 36.0 | Conclua primeiro o caminho de atualização do JetPack 6.x (veja abaixo) |

![Menu da UEFI mostrando a versão de firmware](/images/jetson-orin-nano/firmware-version-check.png)
*A versão de firmware aparece perto do topo do menu de configuração da UEFI.*

Alternativa sem monitor: conecte um cabo serial USB para TTL ao header de botões (fio TX do adaptador no pino 3 / RXD, fio RX do adaptador no pino 4 / TXD, fio de terra do adaptador no pino 7 / GND), abra um console serial no seu PC e pressione `Esc` no console enquanto as opções de pré-inicialização estiverem visíveis.

![Cabo serial USB para TTL no header de botões](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*Rota sem monitor: um cabo serial USB para TTL conectado ao header de botões.*

### Se o firmware for antigo demais

O **caminho de atualização do JetPack 6.x** atualiza o firmware. Em resumo (passos completos em [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)):

1. Inicialize a **imagem ponte do JetPack 5.1.3** (nome do arquivo `JP513-orin-nano-sd-card-image_b29.zip`) a partir de um cartão microSD.
2. Um serviço em segundo plano agenda uma atualização do bootloader (verifique com `sudo systemctl status nv-l4t-bootloader-config`).
3. Reinicie. A atualização de firmware é executada durante essa inicialização (verifique com `sudo nvbootctrl dump-slots-info`).
4. Instale o atualizador de QSPI: `sudo apt update`, depois `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater` e reinicie.
5. Desligue, remova o cartão ponte, insira o seu armazenamento de destino e continue na Etapa 2.

Este caminho exige um cartão microSD e um leitor de cartões. Sem isso, a alternativa é o SDK Manager em um host Ubuntu (veja [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)). Mais um caso: se o firmware vier do BSP 36.2 (JetPack 5.0 DP), a atualização de cápsula dentro do instalador não o suporta — leve o kit para qualquer versão posterior antes de executar a instalação da ISO do JetPack 7.2.1.

Se você inicializar o instalador mesmo assim e a tela permanecer preta ou cair em um shell UEFI, provavelmente o firmware está antigo demais. Não repita a inicialização várias vezes. Desligue o kit, conclua o caminho de atualização e tente de novo.

![Shell interativo da UEFI](/images/jetson-orin-nano/uefi_interactive_shell.png)
*Um shell UEFI (ou uma tela preta) em vez do instalador geralmente significa que o firmware está antigo demais para a versão do JetPack de destino.*

## Etapa 2 — Baixe a Jetson ISO

Baixe a ISO do instalador do JetPack 7.2.1 (rótulo: **Jetson ISO (r39.2.1)**) na
[página de downloads do JetPack](https://developer.nvidia.com/embedded/jetpack/downloads), ou use este link direto:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

Os nomes de arquivo da ISO seguem o padrão `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` (nesta versão: `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). As páginas de download da NVIDIA não listam o tamanho nem os checksums do arquivo ISO.

## Etapa 3 — Grave a ISO em um pen drive USB

1. Instale o **Balena Etcher** a partir de <https://etcher.balena.io/#download-etcher> (Windows, Mac ou Linux).
2. Insira o pen drive USB no seu PC.
3. No Etcher, selecione o arquivo ISO, selecione a unidade USB e inicie a gravação.

![Gravando a Jetson ISO em um pen drive USB com o Balena Etcher](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Gravando a Jetson ISO no pen drive USB com o Balena Etcher.*

> **Atenção**
> **Não grave a ISO em um cartão microSD.** A partir do JetPack 7.2, imagens de
> cartão SD não são mais suportadas. Grave a ISO em um pen drive USB e use-o
> para instalar o Jetson Linux no seu cartão microSD ou SSD NVMe.

Copiar o arquivo ISO para o pen drive com um gerenciador de arquivos não funciona — ele precisa ser gravado como imagem de disco. O pen drive pronto é apenas um instalador; ele não inicializa em uma área de trabalho utilizável.

## Etapa 4 — Inicialize o instalador e instale

1. Desligue o kit e instale o **armazenamento de destino**:
   - cartão microSD: insira-o no slot da **parte inferior do módulo**.
   - SSD NVMe: instale-o no slot M.2 Key-M da placa portadora.
   Instale o armazenamento de destino antes de inicializar o instalador.
2. Insira o pen drive USB de instalação. Conecte o monitor, o teclado e o mouse e, em seguida, conecte a fonte de alimentação. Conecte a unidade de instalação **diretamente** ao kit, e não através de um hub: a NVIDIA documenta um hub USB 3.0 (modelo UH400) que quebra a instalação da ISO e um adaptador USB para Ethernet (TRENDnet TU2-ET100) que pode fazer a gravação falhar. Veja a **[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**.
3. **Pressione `Esc` quando a tela de inicialização com o logo da NVIDIA aparecer.** Selecione **Boot Manager**, selecione o seu disco USB e pressione Enter para inicializar a partir dele. A NVIDIA recomenda selecionar o disco USB explicitamente, para que você saiba que o instalador correto está em execução.
4. **Quando o aviso de atualização de cápsula QSPI aparecer, pressione `Y` em até 30 segundos.** Este é o passo mais comumente esquecido. O aviso é fácil de perder em tempo real. Se ele expirar e a instalação continuar sem a atualização, a instalação falha mais adiante — reinicie a instalação e pressione `Y` quando o aviso aparecer. A atualização de cápsula é executada em **duas passagens**, e o kit pode reiniciar entre elas ou depois delas. Isso é esperado; espere as duas passagens terminarem. Kits cujo firmware QSPI atual é r38.2.0/r38.2.1 precisam confirmar a atualização de firmware uma segunda vez após a conclusão da primeira passagem (problema 6480645 das notas de versão do r39.2.1) — pressione `Y` novamente se for solicitado.
5. No **menu GRUB de instalação do BSP do Jetson**, selecione **Install Jetson ISO r39.2.1**. Selecione o dispositivo de armazenamento de destino (o cartão microSD ou o SSD NVMe) e confirme. **A instalação apaga o dispositivo selecionado** — verifique a seleção antes de confirmar.
6. Aguarde a conclusão da instalação. As instruções da NVIDIA dizem que um texto branco rola na tela por vários minutos; reinicie quando solicitado. Relatos da comunidade sobre o tempo de instalação variam muito — de cerca de 15 minutos a bem mais (não confirmado, relatos do fórum).
7. **Remova o pen drive USB** para que o kit inicialize o novo sistema a partir do armazenamento de destino, e não novamente pelo instalador.

Funcionários da NVIDIA nos fóruns também recomendam manter um display conectado durante a instalação da ISO.

## Etapa 5 — Primeira inicialização e configuração inicial do Ubuntu

Depois que o instalador reinicia, o kit inicia a configuração inicial do Ubuntu (`oem-config`):

1. Leia e aceite o EULA do software NVIDIA Jetson.
2. Selecione o idioma do sistema, o layout do teclado e o fuso horário.
3. Conecte-se a uma rede.
4. Crie um nome de usuário, uma senha e um nome de computador.
5. Faça login na área de trabalho do Ubuntu.

## Etapa 6 — Instale os componentes do JetPack

A ISO instala o sistema base (Jetson Linux). CUDA, cuDNN, TensorRT e o restante da pilha do JetPack são adicionados depois da primeira inicialização. Na área de trabalho do kit, abra um terminal e execute:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

Reinicie após a instalação, se for solicitado.

Verifique o resultado:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` deve reportar uma versão R39 com revisão 2.1. Veja [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system) para o checklist completo.

## Etapa 7 — Verifique o modo de energia

O modo de energia padrão costuma ser **25W**. Para o desempenho máximo, clique no modo de energia atual na barra superior da área de trabalho do Ubuntu, selecione **Power Mode** e escolha **MAXN SUPER**; na linha de comando, `sudo /usr/sbin/nvpmodel -q` mostra o modo atual. As instalações via ISO do JetPack 7.2.1 usam a configuração de gravação do Modo Super por padrão, então 25W e MAXN SUPER devem estar disponíveis — se eles estiverem ausentes, veja a [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

![Selecionando MAXN SUPER no menu de modo de energia](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*Selecione Power Mode → MAXN SUPER para o desempenho máximo.*

## Solução de problemas — respostas rápidas

| Sintoma | Primeira coisa a verificar |
|---|---|
| O kit não liga | A fonte de 19 V precisa estar conectada ao conector DC. O kit liga automaticamente; o LED verde ao lado do conector USB-C deve acender. |
| O instalador USB não inicializa | Selecione o disco USB explicitamente no Gerenciador de Inicialização UEFI (`Esc` na tela de inicialização). Verifique se o firmware é 36.x ou mais recente. |
| Tela preta ou shell UEFI em vez do instalador | O firmware pode estar antigo demais. Conclua primeiro o caminho de atualização do JetPack 6.x. |
| O instalador pula a configuração de idioma/rede/nome de usuário; a primeira inicialização trava em uma tela preta | O aviso da cápsula QSPI foi perdido. Reinicie a instalação e pressione `Y` em até 30 segundos. |
| O instalador não mostra o armazenamento de destino | microSD: verifique se está totalmente inserido no slot da parte inferior do módulo. NVMe: reencaixe a unidade e reinicie o instalador. |
| Apenas modos de energia 7W/15W; 25W e MAXN SUPER estão ausentes | Veja a [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting). |

## Fontes

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação oficial da NVIDIA nas datas indicadas; ainda não verificado em hardware físico pela Juxi Technology.*

**Créditos das imagens:** As imagens desta página são do *Jetson Orin Nano Developer Kit User Guide* oficial da NVIDIA (baixado em 2026-09-26) e permanecem © NVIDIA Corporation. Elas são reproduzidas aqui para ilustrar o fluxo de configuração oficial.

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é publicada pela Juxi Technology e não é uma publicação da NVIDIA.
