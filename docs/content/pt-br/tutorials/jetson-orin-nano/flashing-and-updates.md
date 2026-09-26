---
title: Gravação e atualizações — Opções de instalação do BSP
sidebar_label: Gravação e atualizações
slug: /getting-started/flashing-and-updates
description: >-
  As três formas oficiais de instalar ou atualizar o BSP no kit de
  desenvolvedor NVIDIA Jetson Orin Nano Super — Jetson ISO (recomendada),
  NVIDIA SDK Manager e o script de gravação Linux_for_Tegra — além da decisão
  de armazenamento, do caminho de atualização de firmware JetPack 6.x para
  kits mais antigos e do modo Force Recovery.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# Gravação e atualizações — Opções de instalação do BSP

A NVIDIA oferece três formas oficiais de instalar ou atualizar o BSP (Jetson Linux) no kit de
desenvolvedor NVIDIA Jetson Orin Nano Super. Dois fatos de hardware moldam todas elas: **não há
armazenamento na caixa** (nem eMMC, nem cartão microSD, nem SSD), e o JetPack 7.2 **removeu as
imagens de cartão SD** — a ISO unificada em um pen drive USB as substitui, enquanto o cartão
microSD em si continua sendo um destino de instalação válido.

| | Jetson ISO (recomendada) | NVIDIA SDK Manager | Script de gravação Linux_for_Tegra |
|---|---|---|---|
| Resumo | Inicie o kit a partir de um USB de instalação criado em qualquer PC; escolha o armazenamento de destino no kit | Ferramenta com GUI em um PC host; grava o BSP no armazenamento escolhido via USB-C | Ferramentas de gravação de linha de comando em um PC host; controle direto do destino |
| PC host com Ubuntu | Não necessário | Necessário (x86_64) | Necessário (x86_64) |
| Tempo típico | Não publicado; o instalador mostra saída "por vários minutos" | Não publicado; o host baixa primeiro o BSP e o sistema de arquivos raiz | Depende da sua configuração |
| Para quem é | Configuração inicial em um kit novo; a maioria dos usuários | Usuários com um PC Ubuntu; a rota preferida da NVIDIA para gravar diretamente em um SSD NVMe; também usada para atualizações de firmware | Usuários avançados e desenvolvedores de produto |

A NVIDIA não publica tempos de instalação; relatos do fórum variam de cerca de 15 minutos a duas
horas (não confirmado).

> **Nota da Juxi:** a versão atual é o **JetPack 7.2.1 (L4T r39.2.1)**. Em um kit novo, comece
> pelo **[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)** — ele percorre o caminho
> recomendado da ISO de ponta a ponta. Volte aqui para comparar rotas, escolher o
> armazenamento ou atualizar um kit mais antigo.

## Opção 1 — Jetson ISO (recomendada)

A Jetson ISO é o caminho de primeira configuração recomendado pela NVIDIA e a única rota que não
precisa de um PC host com Ubuntu: grave um único arquivo ISO em um pen drive em qualquer
computador, inicialize o kit pelo pen drive e instale no armazenamento que você preparou. Prepare
estes itens:

- **Armazenamento de destino** (o kit não tem nenhum; veja a seção de armazenamento abaixo): um
  **cartão microSD de 64 GB UHS-1 ou maior (recomendado)**, inserido no slot da **parte inferior
  do módulo** antes de inicializar o instalador, ou um **SSD NVMe** (opcional; recomendado para
  mais capacidade e melhor desempenho de armazenamento).
- **Um pen drive USB de 16 GB ou maior** — ele será o instalador.
- **Um laptop ou PC (Windows, Mac ou Linux) com pelo menos 25 GB livres**, para gravar a ISO.
- **Um monitor DisplayPort e teclado USB** (ou um cabo serial USB para TTL para configuração sem
  monitor; HDMI não é suportado), além da fonte de alimentação de 19 V incluída.

Dois cuidados decidem o sucesso: o firmware precisa ser da geração JetPack 6.x — se a tela ficar
preta ou um shell UEFI aparecer, execute primeiro o caminho de atualização do JetPack 6.x abaixo
— e, no aviso da cápsula QSPI, pressione `Y` em até 30 segundos; um aviso que expira faz a
instalação falhar mais adiante, então reinicie a instalação e pressione `Y`.

> **Importante** — grave a ISO no **pen drive USB, não em um cartão microSD** ("Não grave a
> Jetson ISO em um cartão microSD"). A instalação também **apaga o armazenamento de destino
> selecionado**; confirme qual dispositivo você selecionou antes de começar.

O procedimento completo passo a passo — download da ISO, Balena Etcher, Gerenciador de
Inicialização UEFI, o menu do GRUB, seleção do armazenamento, configuração inicial do Ubuntu na
primeira inicialização — está no **[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)**.
O USB de instalação **não é um "Live USB"** (ele apenas instala), então remova-o após a
instalação quando solicitado.

## Opção 2 — NVIDIA SDK Manager (PC host)

O SDK Manager é a rota com PC host: ele grava o BSP via USB-C e também pode atualizar o firmware
do kit (veja a seção do caminho de atualização abaixo).

**Requisitos do PC host** (conforme a página de configuração do BSP do kit): um **PC x86
executando Ubuntu 22.04 ou Ubuntu 20.04**; **acesso à internet e uma conta gratuita do NVIDIA
Developer Program**; um **cabo USB** para a porta USB-C do kit, além de "um jumper ou um clipe de
papel metálico"; e um display ou cabo serial USB para TTL para o kit.

> **Nota da Juxi:** as fontes da NVIDIA divergem aqui. A página de configuração do kit lista
> Ubuntu 22.04 ou 20.04; as notas de versão do L4T r39.2.1 listam "Ubuntu 24.04 e 22.04" como a
> distribuição do host para gravação. Verifique os requisitos do SDK Manager da NVIDIA antes de
> preparar um PC host.

**Instale o SDK Manager no host.** A página de configuração da NVIDIA traz os comandos exatos
para Ubuntu 22.04 e 20.04; inicie-o com `sdkmanager` e faça login com suas credenciais do NVIDIA
Developer (uma janela do navegador abre; a autenticação de dois fatores pode aparecer).

**Grave o BSP** (resumo; siga as instruções na tela). O SDK Manager grava via USB, então coloque
o kit em modo Force Recovery primeiro (veja abaixo):

1. Selecione **Jetson Orin Nano [8GB developer kit version]** e clique em **OK**; desmarque
   **Host Machine** para que apenas o alvo Jetson permaneça selecionado; clique em **Continue**;
   na próxima etapa, mantenha apenas **Jetson Linux** selecionado; aceite a licença e digite a
   senha do sudo do host.
2. No prompt de gravação (o SDK Manager baixa os pacotes primeiro): selecione **Runtime for OEM
   Configuration**; selecione **NVMe** ou **SD Card** como armazenamento; clique em **Flash**.
3. Quando a gravação terminar, remova o jumper do header J14, desligue e ligue o kit e conclua a
   configuração inicial do Ubuntu (oem-config).

> **Nota da Juxi — o SKU do módulo:** este kit contém o módulo **P3767-0005**, que a NVIDIA
> documenta como "Jetson Orin Nano 8GB (P3767-0005, for development only)". O módulo Orin Nano
> 8GB comercial é o **P3767-0003** — um SKU separado, que não faz parte deste kit. Use a entrada
> de destino que a NVIDIA nomeia para este kit: **Jetson Orin Nano [8GB developer kit version]**.

## Opção 3 — Script de gravação Linux_for_Tegra

Para usuários avançados e desenvolvedores de produto: gravação por linha de comando com o
Jetson Linux Driver Package. Da página de configuração da NVIDIA: baixe o Driver Package e o
sistema de arquivos raiz de exemplo da sua versão do JetPack; extraia o Driver Package em um host
Ubuntu x86_64; extraia o sistema de arquivos raiz de exemplo em `Linux_for_Tegra/rootfs` e
execute `apply_binaries.sh` a partir de `Linux_for_Tegra`; coloque o kit em modo Force Recovery
(abaixo); e então execute o comando de gravação apropriado para o alvo Jetson Orin Nano
Developer Kit. Os nomes de destino e os comandos detalhados estão no Jetson Linux Developer
Guide.

- Os nomes de destino do kit são `jetson-orin-nano-devkit` e `jetson-orin-nano-devkit-super`;
  a NVIDIA observa que a configuração Super tem "um orçamento de energia maior e passos de
  frequência de clock estendidos".
- O exemplo do Developer Guide para este kit — NVMe com a configuração Super:
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`
  (a opção `--erase-all` apaga os dados no armazenamento de destino).
- Das notas de versão do L4T r39.2.1: host de gravação — Ubuntu 24.04 / 22.04; toolchain —
  GCC 13.2; tag do código-fonte — `jetson_39.2.1_GA`. Da página de downloads do JetPack:
  pacote BSP — `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## Escolha do armazenamento de destino: microSD vs SSD NVMe

O instalador só oferece armazenamento que já esteja **conectado** quando ele inicializa. Decida
primeiro, instale o armazenamento e só então inicie o instalador.

| | Cartão microSD | SSD NVMe |
|---|---|---|
| Especificação | 64 GB UHS-1 ou maior, recomendado | Uma unidade NVMe PCIe em um slot M.2 Key-M |
| Onde fica | Slot na **parte inferior do módulo** | Slot M.2 Key-M 2280 (PCIe 3.0 x4) ou slot 2230 (PCIe 3.0 x2) |
| Por que escolher | O armazenamento padrão do módulo; a opção mais simples e de menor custo | Mais capacidade e melhor desempenho de armazenamento; recomendado para modelos de IA, contêineres, datasets e arquivos de projeto |

**O microSD ainda é um destino de instalação válido.** O JetPack 7.2 removeu o *arquivo de
imagem* de cartão SD — não o *destino* microSD: com o fluxo da ISO, inicialize o instalador USB
com o cartão inserido e selecione-o (o SDK Manager também pode gravar um cartão microSD a partir
do host). O slot de microSD fica na **parte inferior do módulo**. Toda rota de instalação
**apaga o armazenamento de destino selecionado**, então não selecione uma unidade que contenha
dados de que você precisa. Se o instalador não oferecer a sua unidade NVMe, veja a
**[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**; para dicas de
compra, veja as **[Perguntas frequentes](/pt-br/tutorials/jetson-orin-nano/faq)**.

## Kits mais antigos: o caminho de atualização do JetPack 6.x

**Quando isso é necessário:** o JetPack 7.2 e posteriores exigem firmware UEFI/QSPI da geração
JetPack 6.x. A regra da NVIDIA: firmware **36.x ou mais recente** — o kit está pronto; **mais
antigo que 36.0** — conclua este caminho primeiro (verifique a versão no menu da UEFI; passos no
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)). Duas rotas oficiais: o
**fluxo ponte com microSD** (abaixo) precisa de um cartão microSD, mas não de um PC host com
Ubuntu; o **SDK Manager** (Opção 2) precisa de um PC host com Ubuntu e é a alternativa nomeada
pela NVIDIA para a atualização de firmware/QSPI.

O fluxo ponte, na ordem documentada pela NVIDIA:

1. Grave a **imagem ponte do JetPack 5.1.3** (`JP513-orin-nano-sd-card-image_b29.zip` — use a
   imagem atualizada) em um cartão microSD, inicialize o kit a partir dele, conclua a
   configuração inicial do Ubuntu e conecte o kit à internet.
2. Um serviço em segundo plano então agenda uma atualização do bootloader (uma notificação na
   área de trabalho pode aparecer). Confirme com `sudo systemctl status nv-l4t-bootloader-config`
   — "Uma execução de agendamento concluída mostra o serviço como inativo com status de saída
   bem-sucedido".

   ![Notificação de atualização do bootloader na área de trabalho do Jetson Linux](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. Reinicie; a atualização de firmware é executada durante a inicialização. Verifique o estado
   depois com `sudo nvbootctrl dump-slots-info` — a saída de exemplo da NVIDIA nesse estágio é
   "Current version: 35.5.0".

   ![Progresso da atualização de firmware a partir do firmware do JetPack 6.x](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. Instale o atualizador de QSPI: `sudo apt update`, depois
   `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`; reinicie e deixe a atualização
   concluir.
5. O firmware agora está pronto para a geração JetPack 6.x, e o cartão 5.1.3 não é mais a mídia
   de inicialização de destino. Desligue o kit e execute a instalação do JetPack 7.2.1 a partir
   do USB de instalação (veja o [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)).

Notas adicionais: passar pelo JetPack 6.2.x pode agendar **outra** atualização de firmware UEFI
após a primeira inicialização — reinicie novamente quando solicitado. Das notas de versão do
r39.2.1 (problema conhecido 6379600), a atualização de cápsula durante uma instalação via ISO
não suporta unidades da versão **BSP 36.2 / JetPack 5.0 DP** — atualize essas unidades para uma
versão posterior primeiro.

## Modo Force Recovery — como entrar

O modo Force Recovery (RCM) é o estado de que um PC host precisa para gravar. A NVIDIA documenta
três formas:

1. **De um terminal em um sistema em execução:** `sudo reboot --force forced-recovery`.
2. **Kit desligado:** conecte o pino 9 e o pino 10 do header de botões (a página de configuração
   o chama de header J14) e, em seguida, conecte a fonte DC para ligar.
3. **Kit já ligado:** conecte os pinos 9 e 10 e, em seguida, conecte temporariamente os pinos 7
   e 8 para reiniciar o sistema.

Depois de entrar no RCM, remova o(s) jumper(s) assim que o host detectar o dispositivo. A
**porta USB-C** transporta a conexão de gravação (ela opera como modo USB Recovery), e, no host,
o `lsusb` deve mostrar um dispositivo USB da NVIDIA antes de você iniciar a gravação.

## Reinstalação e atualização

**Atualize os componentes do JetPack no kit em execução** com `sudo apt update` e depois
`sudo apt install nvidia-jetpack` — veja o [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start).

**Reinstale o BSP (JetPack igual ou mais recente).** Execute qualquer uma das três rotas
novamente; o fluxo da ISO é a opção feita no próprio dispositivo. O alerta da NVIDIA para
reinstalações via ISO: "Se você estiver reinstalando o JetPack 7.2.1 usando a ISO em um sistema
já instalado, siga com atenção as instruções do Getting Started Guide." A reinstalação **apaga o
armazenamento de destino** (faça backup primeiro) e, se o aviso da cápsula QSPI aparecer,
pressione `Y` em até 30 segundos. Remova o USB de instalação ao terminar, para que o kit
inicialize o novo sistema.

**Modo Super após uma reinstalação.** A ISO do 7.2.1 "grava o Jetson Orin Nano Developer Kit com
a configuração de gravação do Modo Super por padrão". Na versão anterior, a 7.2, um kit
atualizado via ISO mantinha o perfil anterior e podia ficar sem os modos 25 W / MAXN SUPER
(problema conhecido 6279443 do r39.2; a orientação da NVIDIA era gravar a partir de um host
Linux ou do SDK Manager). A NVIDIA não documentou se executar novamente a ISO do 7.2.1 converte
uma instalação não-Super existente em Super. Se faltarem os modos 25 W / MAXN SUPER no seu kit,
veja a **[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting)**.

**Mudança entre versões principais do JetPack.** Para a lista de mudanças e as notas de rollback
do JetPack 6.x → 7.2.1, veja **[JetPack 6.x → 7.2.1](/pt-br/tutorials/jetson-orin-nano/jetpack-6-to-7)**.
Depois de qualquer instalação ou atualização, verifique o resultado:
**[Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system)**.

## Fontes

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (verificado em 2026-09-26)
- [Quick Start — mesmo guia](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [JetPack 6.x Update Path — mesmo guia](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [How-To — mesmo guia](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (verificado em 2026-09-26)
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [SDK Manager — instruções de instalação com monitor conectado](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação oficial da NVIDIA nas
datas indicadas; ainda não verificado em hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é publicada pela Juxi
Technology e não é uma publicação da NVIDIA.
