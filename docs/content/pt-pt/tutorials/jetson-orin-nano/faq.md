---
title: Perguntas frequentes (FAQ)
sidebar_label: FAQ
slug: /support/faq
description: >-
  Perguntas frequentes sobre o NVIDIA Jetson Orin Nano Super Developer Kit
  (8GB) — armazenamento, primeira configuração, firmware, modos de alimentação,
  cargas de trabalho de IA e suporte.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Perguntas frequentes (FAQ)

## Antes de começar

**O que vem na caixa?**
O Jetson Orin Nano Developer Kit, uma fonte de alimentação de 19 V e um cartão
de início rápido e suporte. **Não há armazenamento na caixa da NVIDIA**: o
cartão microSD ou o SSD NVMe, a unidade flash USB para o instalador e o monitor
e o teclado são fornecidos por si — embora o pacote da loja Juxi para este kit
acrescente um cartão microSD de 64 GB (de acordo com a listagem da loja). Consulte
o [Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start).

**Preciso de comprar armazenamento?**
Sim — a menos que tenha comprado o pacote da loja Juxi, que já inclui um cartão
microSD de 64 GB; esse cartão cobre o requisito de armazenamento de destino,
pelo que só precisa de comprar um SSD NVMe se quiser mais capacidade. (O cartão
incluído vem em branco, não pré-gravado — instala o sistema nele com a Jetson
ISO.) A NVIDIA indica:
"O Jetson Orin Nano Developer Kit não inclui armazenamento removível na caixa,
pelo que deve escolher um cartão microSD ou um SSD NVMe antes de iniciar a
configuração." Compre um cartão microSD de 64GB UHS-1 ou superior (a
recomendação da NVIDIA) se recebeu a caixa simples da NVIDIA, ou um SSD NVMe
PCIe para uma das ranhuras M.2 Key-M da placa portadora. O kit não tem eMMC: o
seu cartão ou SSD torna-se o armazenamento principal do sistema. Consulte o
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start) e
[Interfaces e layout do hardware](/pt-pt/tutorials/jetson-orin-nano/interfaces).

**Ainda posso gravar uma imagem de cartão SD, como nas versões anteriores do
JetPack?**
Não. A partir do JetPack 7.2, as imagens de cartão SD deixaram de ser
suportadas. Instrução da NVIDIA: "Não grave a Jetson ISO num cartão microSD —
escreva-a numa unidade flash USB e utilize-a para instalar o Jetson Linux no seu
cartão microSD ou SSD NVMe." O cartão microSD continua a ser um destino de
instalação válido; apenas deixou de ser o meio onde escreve a imagem. A unidade
USB com a ISO é um instalador, não uma "live USB" — não executa um ambiente de
trabalho, apenas instala o sistema. Consulte
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates) e
[Migração do JetPack 6.x para o JetPack 7.2.1](/pt-pt/tutorials/jetson-orin-nano/jetpack-6-to-7).

**De que preciso exatamente antes de começar?**
Precisa de:

- O kit e a fonte de alimentação de 19 V incluída.
- Um portátil ou PC (Windows, Mac ou Linux) com pelo menos 25GB de espaço livre.
- Uma unidade flash USB de 16GB ou mais, para conter a imagem do instalador.
- Armazenamento de destino: um cartão microSD (recomenda-se 64GB UHS-1 ou
  superior) e/ou um SSD NVMe — o pacote da loja Juxi já inclui o cartão microSD
  de 64 GB.
- Um monitor DisplayPort e um teclado e rato USB, ou um cabo série USB-para-TTL
  para uma configuração sem monitor.

O guia da NVIDIA utiliza o Balena Etcher para gravar a ISO na unidade USB —
copiar o ficheiro para a unidade não é suficiente. Passo a passo:
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start).

**Preciso de um PC com Ubuntu?**
Não, não para o percurso recomendado. A instalação por Jetson ISO é executada
no próprio kit; o seu PC apenas grava a ISO numa unidade flash USB, e Windows,
Mac e Linux servem perfeitamente para isso. Um PC anfitrião Ubuntu x86_64 só é
necessário para os métodos alternativos — o SDK Manager ou o script de gravação
— por exemplo, quando quer regravar um kit com a configuração Super. Nota: a
página do SDK Manager documenta anfitriões Ubuntu 20.04 / 22.04 x86_64, mas
funcionários da NVIDIA também relatam ter gravado com êxito a partir do Windows.
Consulte
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates).

**Onde fica a ranhura do microSD?**
Fica na face inferior do módulo Jetson Orin Nano, não na lateral da placa
portadora. Insira o cartão antes de arrancar com o instalador ISO; o instalador
só oferece armazenamento que já esteja instalado. Para trocar o cartão mais
tarde: desligue, substitua pelo novo cartão e volte a executar o instalador ISO
do JetPack 7.2.1 com ele inserido — o JetPack 7.2 e posteriores não têm imagem
de cartão para gravar. Consulte
[Interfaces e layout do hardware](/pt-pt/tutorials/jetson-orin-nano/interfaces) e o
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start).

## Configuração

**O meu kit é novo — porque é que o guia diz para atualizar primeiro o firmware?**
As instalações do JetPack 7.2 e posteriores exigem firmware UEFI/QSPI da geração
JetPack 6.x no kit — versão 36.x ou mais recente. Os kits expedidos com firmware
de fábrica mais antigo têm de concluir o "JetPack 6.x Update Path" da NVIDIA
antes de a ISO do JetPack 7.2.1 poder arrancar. Para verificar a versão: ligue o
kit com um monitor ligado e prima Esc repetidamente no ecrã de arranque; o menu
UEFI mostra a versão do firmware perto do topo. Se indicar 36.x ou mais recente,
continue; se for anterior a 36.0, faça primeiro o percurso de atualização.
Consulte o [Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start),
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates) e o
[Glossário](/pt-pt/tutorials/jetson-orin-nano/glossary) para termos como QSPI e
atualização de cápsula.

**Quanto tempo demora a configuração?**
A NVIDIA não publica um tempo total de configuração. As instruções oficiais
indicam que pode ver texto branco a desfilar no ecrã durante vários minutos e
que deve esperar que o instalador termine e reinicie quando solicitado. Os
relatos de utilizadores variam entre cerca de 15 minutos e cerca de duas horas
para uma instalação num cartão microSD (relatos de utilizadores, não
confirmado), e o primeiro arranque acrescenta depois os ecrãs de configuração do
Ubuntu (idioma, rede, nome de utilizador). Consulte o
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start).

**E se o instalador saltar os ecrãs de nome de utilizador/palavra-passe?**
Isto corresponde a um problema conhecido: o pedido da cápsula QSPI expirou. O
instalador pede-lhe para confirmar uma atualização de firmware (QSPI) e espera
apenas 30 segundos — se o pedido for perdido, os passos seguintes podem falhar
e os ecrãs de idioma, rede e nome de utilizador podem nunca aparecer; o
arranque seguinte pode então parar num ecrã preto com um cursor. A correção do
guia oficial: reinicie a instalação e prima Y quando o pedido da cápsula
aparecer. Alguns utilizadores também limparam partições deixadas para trás
antes de tentar de novo, ou instalaram com o SDK Manager (relatos de
utilizadores; funcionários da NVIDIA reconheceram o tópico). Consulte a
[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

> **Importante** Quando o instalador apresenta o pedido de atualização de
> cápsula QSPI, prima **Y** no prazo de 30 segundos. A NVIDIA chama-lhe o
> "passo mais frequentemente esquecido".

**Como obtenho uma consola série?**
Ligue um cabo série USB-para-TTL ao Button Header: o pino RXD 3 liga ao fio TX
do adaptador, o pino TXD 4 liga ao fio RX do adaptador e o pino GND 7 liga ao
fio de terra do adaptador. Em seguida, abra uma consola série no seu PC, ligue o
kit e prima Esc durante o ecrã de pré-arranque para entrar na UEFI / no gestor
de arranque — pode concluir toda a instalação por ISO desta forma. Uma lacuna
honesta: as páginas da NVIDIA dizem "abra uma consola série no seu PC", mas não
indicam uma velocidade de transmissão nem um programa de terminal. Quando o kit
está ligado a um PC por USB-C em modo de dispositivo, também apresenta um "USB
Serial device for serial terminal access". Consulte
[Interfaces e layout do hardware](/pt-pt/tutorials/jetson-orin-nano/interfaces) e a
[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

## Alimentação e desempenho

**Porque é que não existe a opção 25W / MAXN SUPER?**
O seu kit foi gravado com a configuração de arranque não-Super, pelo que só
aparecem os modos 7W e 15W. Trata-se do problema documentado 6279443 da ISO do
JetPack 7.2: as instalações por ISO mantinham o perfil anterior à atualização em
vez de mudarem para "Super". O JetPack 7.2.1 corrige isto para novas
instalações — a ISO "passa agora a gravar o Jetson Orin Nano Developer Kit com a
configuração de gravação do modo Super por predefinição"; a NVIDIA não indica se
uma reinstalação com a 7.2.1 converte um kit instalado com a ISO 7.2.0.
Verifique `/etc/nv_boot_control.conf`: uma configuração Super apresenta o
sufixo `-super`. Para corrigir uma instalação 7.2 existente, regrave com a
configuração Super a partir de um anfitrião Ubuntu (SDK Manager ou o script de
gravação); o menu de modos de alimentação passa então a oferecer 15W, 25W
(predefinido) e MAXN SUPER. Consulte
[Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system), a
[Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting) e
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates).

> **Nota da Juxi:** Existe uma correção no local da comunidade (editar
> `/etc/nv_boot_control.conf`, reconfigurar o carregador de arranque, remover
> `/etc/nvpmodel.conf`, reiniciar). Vários utilizadores relatam êxito, mas a
> NVIDIA não a subscreveu e um utilizador relatou um ciclo de arranque.

## Cargas de trabalho de IA

**Que modelo de que dimensão consegue correr com 8 GB?**
Os 8GB de LPDDR5 são memória unificada, partilhada pela CPU, pela GPU e pelo
sistema operativo — cerca de 7.6GB ficam utilizáveis após as reservas do
firmware e do kernel. A orientação publicada pela NVIDIA: com quantização de
4 bits e runtimes eficientes em memória, consegue acomodar LLMs até cerca de
10B parâmetros e VLMs até cerca de 4B parâmetros. Os benchmarks oficiais do
TensorRT Edge-LLM para o Orin Nano 8GB abrangem modelos até 2B, e essa é a
maior classe de modelos que a NVIDIA avalia neste kit. Um modelo pode falhar ao
carregar mesmo quando o ficheiro parece caber, porque a cache KV também precisa
de memória; GGUFs de 7.4GB e 16GB falharam ao carregar num kit de 8GB (relatos
de utilizadores). Consulte
[LLMs locais em 8 GB](/pt-pt/tutorials/jetson-orin-nano/local-llm) e
[Eficiência de memória](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency).

## Suporte e assistência

**Qual é o percurso de assistência?**
Comece pela [página oficial de resolução de
problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)
da NVIDIA, que abrange os cinco problemas de configuração comuns: a ISO não
arranca, sem saída de vídeo, o instalador não mostra o armazenamento de destino,
é necessária uma atualização de firmware e um erro de permissões do Docker.
Para questões sobre a plataforma, utilize o Fórum de Desenvolvedores NVIDIA
Jetson, indicado na página oficial [Additional
Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html);
pesquise antes de publicar e inclua a saída de
`cat /etc/nv_tegra_release`. Contactos da Juxi Technology:

- Suporte técnico: **support@juxitech.com**
- Encomendas, garantia e RMA: **support@juxitech.com** (inclua o número da encomenda)
- Vendas e orçamentos: **sales@juxitech.com**
- Questões sobre produtos (seleção, compatibilidade): **pe@juxitech.com**

Downloads e ligações de referência oficiais:
[Downloads](/pt-pt/tutorials/jetson-orin-nano/downloads).

> **Nota da Juxi:** Algumas respostas do fórum identificadas como de
> funcionários da NVIDIA são respostas de IA geradas automaticamente (começam
> com "This is an automated AI response"). Trate-as como não fidedignas e
> prefira a documentação oficial.

## Fontes

- Jetson Orin Nano Developer Kit User Guide — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- Notas de versão do Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (verificado em 2026-09-26)
- Fóruns de desenvolvedores da NVIDIA — [tópico sobre o bloqueio no arranque / configuração de nome de utilizador ignorada](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [tópico sobre 25W / MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (verificado em 2026-09-26)
- [Listagem da loja da Juxi Technology — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
