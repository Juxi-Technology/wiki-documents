---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Perguntas frequentes sobre o kit de desenvolvedor NVIDIA Jetson Orin Nano
  Super (8GB) — armazenamento, configuração inicial, firmware, modos de
  energia, cargas de trabalho de IA e suporte.
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

# FAQ

## Antes de começar

**O que vem na caixa?**
O kit de desenvolvedor Jetson Orin Nano, uma fonte de alimentação de 19 V e um
cartão de início rápido e suporte. **Não há armazenamento na caixa da NVIDIA**:
você fornece o cartão microSD ou o SSD NVMe, o pen drive USB para o instalador,
e o monitor e o teclado — mas o pacote da loja Juxi para este kit adiciona um
cartão microSD de 64 GB (conforme a listagem da loja). Veja o
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start).

**Preciso comprar armazenamento?**
Sim — a menos que você tenha comprado o pacote da loja Juxi, que já inclui um
cartão microSD de 64 GB; ele cobre o
requisito de armazenamento de destino, então compre um SSD NVMe apenas se quiser
mais capacidade. (O cartão incluído vem em branco, sem imagem pré-gravada — você
instala o sistema nele com a Jetson ISO.) A NVIDIA afirma:
"O kit de desenvolvedor Jetson Orin Nano não inclui armazenamento removível na
caixa, então escolha um cartão microSD ou um SSD NVMe antes de começar a
configuração." Compre um cartão microSD de 64GB UHS-1 ou maior (recomendação da
NVIDIA) se você recebeu apenas a caixa da NVIDIA, ou um SSD NVMe PCIe para um
dos slots M.2 Key-M da placa portadora. O kit não tem eMMC: o seu cartão ou SSD
se torna o armazenamento principal do sistema. Veja o
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start) e
[Interfaces e Layout de Hardware](/pt-br/tutorials/jetson-orin-nano/interfaces).

**Ainda posso gravar uma imagem de cartão SD, como nas versões anteriores do JetPack?**
Não. A partir do JetPack 7.2, imagens de cartão SD não são mais suportadas. Instrução
da NVIDIA: "Não grave a Jetson ISO em um cartão microSD — grave-a em um pen
drive USB e use-o para instalar o Jetson Linux no seu cartão microSD ou SSD
NVMe." O cartão microSD ainda é um destino de
instalação válido; ele apenas deixou de ser o meio no qual você grava a imagem.
O pen drive USB da ISO é um instalador, não um USB live — ele não executa uma
área de trabalho, apenas instala o sistema. Veja
[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates) e
[Migração do JetPack 6.x para o 7.2.1](/pt-br/tutorials/jetson-orin-nano/jetpack-6-to-7).

**O que exatamente eu preciso antes de começar?**
Você precisa de:

- O kit e a fonte de alimentação de 19 V incluída.
- Um laptop ou PC (Windows, Mac ou Linux) com pelo menos 25GB de espaço livre.
- Um pen drive USB de 16GB ou maior para conter a imagem do instalador.
- Armazenamento de destino: um cartão microSD (recomendado 64GB UHS-1 ou maior) e/ou um
  SSD NVMe — o pacote da loja Juxi já inclui o cartão microSD de 64 GB.
- Um monitor DisplayPort e teclado e mouse USB, ou um cabo serial USB-para-TTL
  para uma configuração sem monitor (headless).

O guia da NVIDIA usa o Balena Etcher para gravar a ISO no pen drive — copiar
o arquivo para o pen drive não é suficiente. Passo a passo:
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start).

**Preciso de um PC com Ubuntu?**
Não, não para o caminho recomendado. A instalação da Jetson ISO roda no próprio
kit; o seu PC apenas grava a ISO em um pen drive USB, e Windows, Mac e
Linux funcionam para isso. Um PC host Ubuntu x86_64 só é necessário para os
métodos alternativos — SDK Manager ou o script de gravação —, por exemplo quando você
quer regravar um kit com a configuração Super. Observação: a página do SDK Manager
documenta hosts Ubuntu 20.04 / 22.04 x86_64, enquanto funcionários da NVIDIA também relatam
gravações bem-sucedidas a partir do Windows. Veja
[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).

**Onde fica o slot do microSD?**
Ele fica na parte inferior do módulo Jetson Orin Nano, e não na borda da placa
portadora. Insira o cartão antes de inicializar o instalador da ISO; o instalador só
oferece armazenamento já instalado. Para trocar o cartão depois: desligue o kit,
coloque o novo cartão e execute novamente o instalador da ISO do JetPack 7.2.1 com ele
inserido — o JetPack 7.2 e posteriores não têm imagem de cartão para gravar. Veja
[Interfaces e Layout de Hardware](/pt-br/tutorials/jetson-orin-nano/interfaces) e
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start).

## Configuração

**Meu kit é novo — por que o guia diz para atualizar o firmware primeiro?**
As instalações do JetPack 7.2 e posteriores exigem firmware UEFI/QSPI da geração
JetPack 6.x no kit — versão 36.x ou mais recente. Kits que saíram de fábrica com
firmware mais antigo precisam concluir o "caminho de atualização do JetPack 6.x"
da NVIDIA antes que a ISO do JetPack 7.2.1 possa inicializar. Para verificar a
versão: ligue o kit com um monitor conectado e pressione Esc repetidamente na
tela de inicialização; o menu UEFI mostra a versão de firmware perto do topo. Se
mostrar 36.x ou mais recente, continue; se for mais antiga que 36.0, faça o
caminho de atualização primeiro. Veja
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start),
[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates) e o
[Glossário](/pt-br/tutorials/jetson-orin-nano/glossary) para termos como QSPI e atualização de cápsula.

**Quanto tempo leva a configuração?**
A NVIDIA não publica um tempo total de configuração. As instruções oficiais dizem que você
pode ver texto branco rolando na tela por vários minutos, e que deve
esperar o instalador concluir e reiniciar quando solicitado. Relatos de usuários variam
de cerca de 15 minutos a cerca de duas horas para uma instalação em cartão microSD (relatos
de usuários, não confirmados), e a primeira inicialização ainda adiciona as telas de
configuração do Ubuntu (idioma, rede, nome de usuário). Veja
[Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start).

**E se o instalador pular as telas de nome de usuário/senha?**
Isso corresponde a um relato conhecido: o aviso da cápsula QSPI expirou. O instalador
pede que você confirme uma atualização de firmware (QSPI) e espera apenas 30 segundos — se o
aviso for perdido, as etapas seguintes podem falhar, e as telas de idioma, rede e
nome de usuário podem nunca aparecer; a inicialização seguinte pode então parar em uma tela
preta com um cursor. A correção do guia oficial: reinicie a instalação
e pressione Y quando o aviso da cápsula aparecer. Alguns usuários também limparam
partições remanescentes antes de tentar de novo, ou instalaram com o SDK Manager (relatos
de usuários; funcionários da NVIDIA reconheceram o tópico). Veja
[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

> **Importante** Quando o instalador mostrar o aviso de atualização de cápsula QSPI, pressione
> **Y** em até 30 segundos. A NVIDIA chama isso de "o passo mais comumente esquecido".

**Como obtenho um console serial?**
Conecte um cabo serial USB-para-TTL ao header de botões: o pino RXD 3 conecta-se ao
fio TX do adaptador, o pino TXD 4 conecta-se ao fio RX do adaptador, e o pino GND
7 conecta-se ao fio terra do adaptador. Depois, abra um console serial no seu PC,
ligue o kit e pressione Esc durante a tela de pré-inicialização para entrar na UEFI / Boot
Manager — você consegue concluir toda a instalação da ISO dessa forma. Uma lacuna honesta:
as páginas da NVIDIA dizem "abra um console serial no seu PC", mas não informam uma taxa
de transmissão nem um programa de terminal. Quando o kit está conectado a um PC via USB-C em
modo dispositivo, ele também apresenta um "USB Serial device for serial terminal access".
Veja [Interfaces e Layout de Hardware](/pt-br/tutorials/jetson-orin-nano/interfaces) e
[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

## Energia e desempenho

**Por que não existe a opção de 25W / MAXN SUPER?**
Seu kit foi gravado com a configuração de inicialização não-Super, então apenas os modos
7W e 15W aparecem. Este foi o problema documentado 6279443 da ISO do JetPack 7.2: instalações
via ISO mantinham o perfil anterior em vez de mudar para "Super". O JetPack 7.2.1
corrige isso para novas instalações — a ISO "agora grava o Jetson Orin Nano
Developer Kit com a configuração de gravação do Modo Super por padrão"; a NVIDIA
não diz se uma reinstalação 7.2.1 converte um kit que recebeu a ISO 7.2.0. Verifique
o arquivo `/etc/nv_boot_control.conf`: uma configuração Super mostra um sufixo `-super`. Para
corrigir uma instalação 7.2 existente, regrave com a configuração Super a partir de um
host Ubuntu (SDK Manager ou o script de gravação); o menu Power Mode passa então a oferecer
15W, 25W (padrão) e MAXN SUPER. Veja
[Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system),
[Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting) e
[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).

> **Nota da Juxi:** Existe uma correção local da comunidade (editar
> `/etc/nv_boot_control.conf`, reconfigurar o bootloader, remover
> `/etc/nvpmodel.conf`, reiniciar). Vários usuários relatam sucesso, mas a NVIDIA
> não a endossou e um usuário relatou um loop de inicialização.

## Cargas de trabalho de IA

**Qual o tamanho de modelo que 8 GB consegue rodar?**
Os 8GB de LPDDR5 são memória unificada, compartilhada pela CPU, pela GPU e pelo
sistema operacional — cerca de 7.6GB fica utilizável após reservas de firmware e kernel.
A orientação publicada pela NVIDIA: com quantização de 4 bits e
runtimes eficientes em memória, você consegue rodar LLMs de até cerca de 10B parâmetros e
VLMs de até cerca de 4B parâmetros. Os benchmarks oficiais do TensorRT Edge-LLM para o
Orin Nano 8GB cobrem modelos de até 2B, e essa é a maior classe de modelo que a NVIDIA
testa neste kit. Um modelo pode falhar ao carregar mesmo quando o arquivo parece
caber, porque o cache KV também precisa de memória; GGUFs de
7.4GB e 16GB falharam ao carregar em um kit de 8GB (relatos de usuários). Veja
[Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm) e
[Eficiência de memória](/pt-br/tutorials/jetson-orin-nano/memory-efficiency).

## Suporte e serviço

**Qual é o caminho de suporte?**
Comece pela [página oficial de Solução de Problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)
da NVIDIA, que cobre os cinco problemas comuns de configuração: a ISO não inicializa, sem
saída de vídeo, o instalador não mostra o armazenamento de destino, é necessária uma atualização
de firmware, e um erro de permissão do Docker. Para perguntas sobre a plataforma, use os
fóruns de desenvolvedores NVIDIA Jetson, listados na página oficial [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html);
pesquise antes de postar e inclua a saída de
`cat /etc/nv_tegra_release`. Contatos da Juxi Technology:

- Suporte técnico: **support@juxitech.com**
- Pedidos, garantia e RMA: **support@juxitech.com** (inclua o número do pedido)
- Vendas e orçamentos: **sales@juxitech.com**
- Dúvidas sobre produtos (seleção, compatibilidade): **pe@juxitech.com**

Downloads e links de referência oficiais: [Downloads](/pt-br/tutorials/jetson-orin-nano/downloads).

> **Nota da Juxi:** Algumas respostas de fórum rotuladas como funcionários da NVIDIA são
> respostas de IA geradas automaticamente (elas começam com "This is an automated AI response").
> Trate-as como não autoritativas e prefira a documentação oficial.

## Fontes

- Jetson Orin Nano Developer Kit User Guide — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificado em 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- Notas de versão do Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (verificado em 2026-09-26)
- Fóruns de desenvolvedores da NVIDIA — [tópico sobre travamento na inicialização / telas de nome de usuário puladas](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [tópico sobre 25W / MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (verificado em 2026-09-26)
- [Listagem da loja Juxi Technology — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
