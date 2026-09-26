---
title: Gravação e atualizações — Opções de instalação do BSP
sidebar_label: Gravação e atualizações
slug: /getting-started/flashing-and-updates
description: >-
  As três formas oficiais de instalar ou atualizar o BSP no kit de
  desenvolvedor Jetson Orin Nano Super — Jetson ISO (recomendada), NVIDIA SDK
  Manager e o script de gravação Linux_for_Tegra — mais a decisão de
  armazenamento, o percurso de atualização de firmware do JetPack 6.x para
  kits mais antigos e o modo Force Recovery.
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

A NVIDIA suporta três formas oficiais de instalar ou atualizar o BSP (Jetson
Linux) no kit de desenvolvedor Jetson Orin Nano Super. Dois factos de hardware
condicionam todas elas: **não há armazenamento na caixa** (nem eMMC, nem
cartão microSD, nem SSD), e o JetPack 7.2 **removeu as imagens de cartão SD**
— a ISO unificada numa pen USB substitui-as, enquanto o próprio cartão
microSD continua a ser um destino de instalação válido.

| | Jetson ISO (recomendada) | NVIDIA SDK Manager | Script de gravação Linux_for_Tegra |
|---|---|---|---|
| Resumo | Arranque o kit a partir de um instalador USB criado em qualquer PC; escolha o armazenamento de destino no kit | Ferramenta gráfica num PC anfitrião; grava o BSP no armazenamento escolhido através de USB-C | Ferramentas de gravação de linha de comandos num PC anfitrião; controlo direto do destino |
| PC anfitrião Ubuntu | Não é necessário | Necessário (x86_64) | Necessário (x86_64) |
| Tempo típico | Não publicado; o instalador mostra saída «durante vários minutos» | Não publicado; o anfitrião descarrega primeiro o BSP e o sistema de ficheiros raiz | Depende da configuração |
| Para quem | Configuração inicial de um kit novo; a maioria dos utilizadores | Utilizadores com um PC Ubuntu; a via preferida da NVIDIA para gravar diretamente num SSD NVMe; utilizada também para atualizações de firmware | Utilizadores avançados e desenvolvedores de produto |

A NVIDIA não publica tempos de instalação; os relatos de fóruns vão de cerca
de 15 minutos a duas horas (não confirmado).

> **Nota da Juxi:** a versão atual é o **JetPack 7.2.1 (L4T r39.2.1)**. Num kit
> novo, comece pelo **[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)** — ele percorre o
> caminho recomendado do ISO de ponta a ponta. Volte aqui para comparar
> percursos, escolher o armazenamento ou atualizar um kit mais antigo.

## Opção 1 — Jetson ISO (recomendada)

A Jetson ISO é o caminho inicial recomendado pela NVIDIA e a única via que não
precisa de um PC anfitrião com Ubuntu: grave um único ficheiro ISO numa pen USB
em qualquer computador, arranque o kit a partir da pen e instale no
armazenamento que preparou. Prepare estes itens:

- **Armazenamento de destino** (o kit não tem nenhum; ver a secção de armazenamento abaixo): um **cartão microSD de 64 GB UHS-1 ou superior (recomendado)**, inserido na ranhura na **parte inferior do módulo** antes de arrancar com o instalador, ou um **SSD NVMe** (opcional; recomendado para mais capacidade e melhor desempenho de armazenamento).
- **Uma unidade flash USB de 16 GB ou superior** — esta passa a ser o instalador.
- **Um portátil ou PC (Windows, Mac ou Linux) com pelo menos 25 GB livres**, para gravar a ISO.
- **Um monitor DisplayPort e um teclado USB** (ou um cabo série USB-para-TTL para configuração sem monitor; o HDMI não é suportado), mais a fonte de alimentação de 19 V incluída.

Dois cuidados decidem o sucesso: o firmware tem de ser da geração JetPack 6.x —
se o ecrã ficar preto ou aparecer uma shell UEFI, execute primeiro o percurso de
atualização do JetPack 6.x abaixo — e, no pedido da cápsula QSPI, prima `Y` nos
30 segundos seguintes; um pedido cujo tempo expira faz a instalação falhar mais
tarde, pelo que deve reiniciar a instalação e premir `Y`.

> **Importante** — grave a ISO na **unidade flash USB, não num cartão microSD**
> («Não grave a ISO do Jetson num cartão microSD»). A instalação também
> **apaga o armazenamento de destino selecionado**; confirme qual o dispositivo
> que selecionou antes de começar.

O procedimento completo, passo a passo — descarregamento da ISO, Balena Etcher,
Gestor de Arranque UEFI, menu GRUB, seleção do armazenamento, configuração
inicial do Ubuntu no primeiro arranque — está no
**[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)**. A unidade USB do instalador
**não é uma «Live USB»** (apenas instala), pelo que deve retirá-la após a
instalação, quando for pedido.

## Opção 2 — NVIDIA SDK Manager (PC anfitrião)

O SDK Manager é a via com PC anfitrião: grava o BSP através de USB-C e também
pode atualizar o firmware do kit (ver a secção do percurso de atualização
abaixo).

**Requisitos do PC anfitrião** (segundo a página BSP Setup do kit): um **PC
x86 com Ubuntu 22.04 ou Ubuntu 20.04**; **acesso à internet e uma conta
gratuita do NVIDIA Developer Program**; um **cabo USB** para a porta USB-C do
kit, mais «um pino de jumper ou um clipe de papel de metal»; e um ecrã ou um
cabo série USB-para-TTL para o kit.

> **Nota da Juxi:** as fontes da NVIDIA divergem aqui. A página de configuração
> do kit indica Ubuntu 22.04 ou 20.04; as notas de versão do L4T r39.2.1
> indicam «Ubuntu 24.04 e 22.04» como a distribuição do anfitrião para
> gravação. Confirme os requisitos do NVIDIA SDK Manager antes de preparar um
> PC anfitrião.

**Instale o SDK Manager no anfitrião.** A página de configuração da NVIDIA
apresenta os comandos exatos para Ubuntu 22.04 e 20.04; inicie-o com
`sdkmanager` e inicie sessão com as suas credenciais do NVIDIA Developer
(abre-se uma janela do navegador; pode aparecer autenticação de dois fatores).

**Grave o BSP** (resumo; siga as instruções apresentadas no ecrã). O SDK
Manager grava através de USB, pelo que deve primeiro colocar o kit em Modo
Force Recovery (ver abaixo):

1. Selecione **Jetson Orin Nano [8GB developer kit version]** e clique em **OK**; desmarque **Host Machine** para que fique apenas o destino Jetson selecionado; clique em **Continue**; no passo seguinte, mantenha apenas **Jetson Linux** selecionado; aceite a licença e introduza a palavra-passe de sudo do anfitrião.
2. No pedido de gravação (o SDK Manager descarrega primeiro os pacotes): selecione **Runtime for OEM Configuration**; selecione **NVMe** ou **SD Card** como armazenamento; clique em **Flash**.
3. Quando a gravação terminar, remova o jumper do conector J14, desligue e volte a ligar o kit e conclua a configuração inicial do Ubuntu (oem-config).

> **Nota da Juxi — o SKU do módulo:** este kit contém o módulo **P3767-0005**,
> que a NVIDIA documenta como «Jetson Orin Nano 8GB (P3767-0005, só para
> desenvolvimento)». O módulo Orin Nano 8GB comercial é o **P3767-0003** — um SKU separado,
> que não faz parte deste kit. Utilize a entrada de destino que a NVIDIA indica
> para este kit: **Jetson Orin Nano [8GB developer kit version]**.

## Opção 3 — Script de gravação Linux_for_Tegra

Para utilizadores avançados e desenvolvedores de produto: gravação por linha de
comandos com o Jetson Linux Driver Package. Da página de configuração da
NVIDIA: descarregue o Driver Package e o sistema de ficheiros raiz de exemplo
para a sua versão do JetPack; extraia o Driver Package num anfitrião Ubuntu
x86_64; extraia o sistema de ficheiros raiz de exemplo para
`Linux_for_Tegra/rootfs` e execute `apply_binaries.sh` a partir de
`Linux_for_Tegra`; coloque o kit em Modo Force Recovery (abaixo); e execute o
comando de gravação adequado ao destino Jetson Orin Nano Developer Kit. Os
nomes de destino e os comandos detalhados estão no Jetson Linux Developer
Guide.

- Os nomes de destino do kit são `jetson-orin-nano-devkit` e `jetson-orin-nano-devkit-super`; a NVIDIA assinala que a configuração Super tem «um orçamento de potência mais elevado e passos de frequência de relógio alargados».
- O exemplo do Developer Guide para este kit — NVMe com a configuração Super: `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal` (a opção `--erase-all` apaga os dados no armazenamento de destino).
- Das notas de versão do L4T r39.2.1: anfitrião de gravação — Ubuntu 24.04 / 22.04; toolchain — GCC 13.2; etiqueta do código-fonte — `jetson_39.2.1_GA`. Da página de Downloads do JetPack: pacote BSP — `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## Escolher o armazenamento de destino: microSD vs SSD NVMe

O instalador só oferece armazenamento que esteja **já ligado** quando arranca.
Decida primeiro, instale o armazenamento e só depois inicie o instalador.

| | Cartão microSD | SSD NVMe |
|---|---|---|
| Especificação | 64 GB UHS-1 ou superior, recomendado | Uma unidade NVMe PCIe numa ranhura M.2 Key-M |
| Onde entra | Ranhura na **parte inferior do módulo** | Ranhura M.2 Key-M 2280 (PCIe 3.0 x4) ou 2230 (PCIe 3.0 x2) |
| Porquê escolher | O armazenamento predefinido do módulo; a opção mais simples e de menor custo | Mais capacidade e melhor desempenho de armazenamento; recomendado para modelos de IA, contentores, conjuntos de dados e ficheiros de projeto |

**O microSD continua a ser um destino de instalação válido.** O JetPack 7.2
removeu o *ficheiro de imagem* de cartão SD — não o *destino* microSD: com o
fluxo ISO, arranque com o instalador USB com o cartão inserido e selecione-o
(o SDK Manager também pode gravar um cartão microSD a partir do anfitrião). A
ranhura microSD situa-se na **parte inferior do módulo**. Qualquer via de
instalação **apaga o armazenamento de destino selecionado**, pelo que não deve
selecionar uma unidade com dados de que precisa. Se o instalador não apresentar
a sua unidade NVMe, ver a
**[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**; para conselhos de
compra, ver as **[FAQ](/pt-pt/tutorials/jetson-orin-nano/faq)**.

## Kits mais antigos: o percurso de atualização do JetPack 6.x

**Quando é necessário:** o JetPack 7.2 e posteriores exigem firmware
UEFI/QSPI da geração JetPack 6.x. A regra da NVIDIA: firmware **36.x ou mais
recente** — o kit está pronto; **anterior a 36.0** — conclua primeiro este
percurso (verifique a versão no menu UEFI; passos no
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)). Há duas vias oficiais: o
**fluxo-ponte com microSD** (abaixo) precisa de um cartão microSD mas não de um
PC anfitrião com Ubuntu; o **SDK Manager** (Opção 2) precisa de um PC anfitrião
com Ubuntu e é a alternativa que a NVIDIA indica para a atualização de
firmware/QSPI.

O fluxo-ponte, na ordem documentada pela NVIDIA:

1. Grave a **imagem-ponte do JetPack 5.1.3** (`JP513-orin-nano-sd-card-image_b29.zip` — utilize a imagem atualizada) num cartão microSD, arranque o kit a partir dele, conclua a configuração inicial do Ubuntu e ligue o kit à internet.
2. Um serviço em segundo plano agenda então uma atualização do carregador de arranque (pode aparecer uma notificação no ambiente de trabalho). Confirme com `sudo systemctl status nv-l4t-bootloader-config` — «Uma execução de agendamento concluída mostra o serviço como inativo, com um estado de saída bem-sucedido.»

   ![Notificação de atualização do carregador de arranque no ambiente de trabalho Jetson Linux](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. Reinicie; a atualização de firmware é executada durante o arranque. Verifique depois o estado com `sudo nvbootctrl dump-slots-info` — a saída de exemplo da NVIDIA nesta fase é «Current version: 35.5.0».

   ![Progresso da atualização de firmware a partir do firmware JetPack 6.x](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. Instale o atualizador QSPI: `sudo apt update`, depois `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`; reinicie e deixe a atualização concluir.
5. O firmware está agora pronto para a geração JetPack 6.x e o cartão 5.1.3 já não é o meio de arranque de destino. Desligue e execute a instalação do JetPack 7.2.1 a partir do instalador USB (ver o [Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)).

Notas adicionais: passar pelo JetPack 6.2.x pode agendar **outra** atualização
de firmware UEFI após o primeiro arranque — reinicie novamente quando for
pedido. Segundo as notas de versão do r39.2.1 (problema conhecido 6379600), a
atualização de cápsula durante uma instalação por ISO não suporta unidades da
versão **BSP 36.2 / JetPack 5.0 DP** — atualize primeiro essas unidades para
uma versão posterior.

## Modo Force Recovery — como entrar

O Modo Force Recovery (RCM) é o estado de que um PC anfitrião precisa para
gravar. A NVIDIA documenta três formas:

1. **A partir de um terminal num sistema em execução:** `sudo reboot --force forced-recovery`.
2. **Kit desligado:** ligue o pino 9 e o pino 10 do conector de botões (a página de configuração chama-lhe conector J14) e, em seguida, ligue a fonte DC para ligar.
3. **Kit já ligado:** ligue os pinos 9 e 10 e, em seguida, ligue temporariamente os pinos 7 e 8 para reiniciar o sistema.

Depois de entrar em RCM, remova o(s) jumper(s) assim que o anfitrião detetar o
dispositivo. A **porta USB-C** transporta a ligação de gravação (funciona em
modo de recuperação USB) e, no anfitrião, o `lsusb` deve mostrar um dispositivo
USB da NVIDIA antes de começar a gravar.

## Reinstalar e atualizar

**Atualize os componentes do JetPack no kit em execução** com
`sudo apt update` e depois `sudo apt install nvidia-jetpack` — ver o
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start).

**Reinstale o BSP (JetPack igual ou mais recente).** Execute novamente qualquer
uma das três vias; o fluxo ISO é a opção no próprio dispositivo. A advertência
da NVIDIA para reinstalações por ISO: «Se está a reinstalar o JetPack 7.2.1 com
a ISO num sistema já instalado, siga com atenção as instruções do Getting
Started Guide.» A reinstalação **apaga o armazenamento de destino** (faça
primeiro uma cópia de segurança) e, se aparecer o pedido da cápsula QSPI, prima
`Y` nos 30 segundos seguintes. Retire o instalador USB no final, para que o kit
arranque o novo sistema.

**Modo Super após uma reinstalação.** A ISO 7.2.1 «grava o Jetson Orin Nano
Developer Kit com a configuração de gravação do Modo Super por predefinição».
Na versão 7.2 anterior, um kit atualizado por ISO mantinha o perfil anterior e
podia ficar sem os modos 25 W / MAXN SUPER (problema conhecido 6279443 do
r39.2; a orientação da NVIDIA era gravar a partir de um anfitrião Linux ou com
o SDK Manager). A NVIDIA não documentou se voltar a executar a ISO 7.2.1
converte uma instalação não-Super existente em Super. Se faltarem ao seu kit os
modos 25 W / MAXN SUPER, ver a
**[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting)**.

**Mudar entre versões principais do JetPack.** Para a lista de alterações e as
notas de reversão do JetPack 6.x → 7.2.1, ver
**[Migrar do JetPack 6.x](/pt-pt/tutorials/jetson-orin-nano/jetpack-6-to-7)**. Depois de qualquer
instalação ou atualização, verifique o resultado:
**[Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system)**.

## Fontes

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (verificado em 2026-09-26)
- [Quick Start — o mesmo guia](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (verificado em 2026-09-26)
- [JetPack 6.x Update Path — o mesmo guia](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (verificado em 2026-09-26)
- [How-To — o mesmo guia](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (verificado em 2026-09-26)
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [SDK Manager — instruções de instalação com monitor ligado](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA nas datas indicadas; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
