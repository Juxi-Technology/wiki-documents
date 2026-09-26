---
title: Resolução de problemas
sidebar_label: Resolução de problemas
slug: /support/troubleshooting
description: >-
  Resolução de problemas orientada por sintomas para o NVIDIA Jetson Orin Nano Super Developer Kit (8GB) — armadilhas de instalação, modos de alimentação, armazenamento NVMe, aceleração por GPU e problemas conhecidos, com graus de fonte claros.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# Resolução de problemas

Encontre o seu sintoma no índice abaixo e leia a secção correspondente. Graus:
**A** = documentação oficial da NVIDIA; **B** = fórum de desenvolvedores da
NVIDIA (relatos de funcionários ou da comunidade). Os itens apenas da
comunidade estão marcados como *não confirmado*. A Juxi não tem nenhuma unidade
desta série em mãos — esta página baseia-se apenas na documentação, não foi
testada em hardware.

## Comece pelo guia oficial de resolução de problemas da NVIDIA

O primeiro ponto de paragem da NVIDIA para este kit: o
[Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html).
Abrange exatamente cinco problemas de configuração: (1) a Jetson ISO não
arranca, (2) sem saída de vídeo, (3) o instalador não mostra o armazenamento de
destino, (4) é necessária uma atualização de firmware, (5) erro de permissões do
docker. Páginas oficiais relacionadas: a página
[Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html)
não contém atualmente soluções alternativas (remete para o JetPack 6.x Update
Path), e a página
[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
indica os canais de escalonamento da NVIDIA. (grau A)

## Índice de sintomas

| Sintoma | Secção |
| --- | --- |
| O instalador salta os ecrãs de idioma/rede/utilizador e o sistema bloqueia num ecrã preto com um cursor; nenhuma palavra-passe funciona | Pedido de cápsula QSPI esquecido |
| A instalação parecia bem, mas falha mais tarde | Pedido de cápsula QSPI esquecido |
| A instalação ou a gravação falha com um hub ou adaptador USB ligado | Periféricos USB |
| Apenas 7W e 15W no menu de alimentação; `nvpmodel -m 2` dá erro | Faltam os modos 25W / MAXN SUPER |
| GPU fixa a 624,75 MHz mesmo em MAXN SUPER | GPU presa a 624,75 MHz |
| A mudança de modo de alimentação pede um reinício; o reinício pode bloquear com um ecrã preto | Alterações de modo de alimentação e o reinício com ecrã preto |
| O instalador não oferece a unidade NVMe; a instalação bloqueia após 100% | Problemas com armazenamento NVMe |
| O NVMe não é visível na fase UEFI | Problemas com armazenamento NVMe |
| A instalação aborta em "Step 9/13 Updating boot firmware" | Incompatibilidade do nome da placa no Step 9/13 |
| `jetson-io.py` falha numa unidade Super gravada por ISO | Incompatibilidade de DTB do Jetson-IO |
| O Ollama corre na CPU; aviso "Unsupported JetPack version" | Ollama e aceleração por GPU |
| Precisa de Python wheels para o JetPack 7.2 | Python wheels |
| O Wi-Fi não vê a rede; routers 6 GHz com MBSSID não são suportados | O Wi-Fi não encontra a rede |
| Sem saída de vídeo; o instalador não arranca | Guia oficial de resolução de problemas (acima) |
| Erro de permissões do socket do Docker | Erro de permissões do Docker |
| Precisa de registos de arranque sem um monitor | Consola série |

## Pedido de cápsula QSPI esquecido (a armadilha de instalação mais comum)

Durante a instalação por ISO, o kit pede-lhe para confirmar uma atualização de
cápsula do firmware QSPI. A NVIDIA chama-lhe "o passo mais frequentemente
esquecido": o pedido espera apenas 30 segundos. **Prima Y.**

- Se expirar, "a instalação falha mais tarde". A instrução da NVIDIA é reiniciar
  a instalação e premir Y. (grau A;
  [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)
  secção 5.1; problema 6266271 das notas de versão, na
  [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
  e na
  [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf):
  "Ignorar este passo causa problemas de instalação devido à incompatibilidade
  das novas imagens ISO com imagens QSPI mais antigas.")
- A atualização é executada em duas passagens e o kit pode reiniciar entre
  elas. Isso é esperado. A NVIDIA também recomenda selecionar explicitamente o
  instalador USB no gestor de arranque UEFI em vez de confiar no arranque
  automático. (grau A,
  [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html);
  funcionários confirmaram que o guia foi atualizado com uma solução alternativa
  de um utilizador — grau B,
  [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Assinatura da falha (grau B, relato de utilizador mais reconhecimento por
  funcionários,
  [tópico 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)):
  o instalador salta os ecrãs de idioma, rede e nome de utilizador, avança para
  "Finished installation and reboot" e o sistema fica depois bloqueado num ecrã
  preto ou cinzento com um cursor. Nenhuma credencial predefinida funciona
  (nvidia/nvidia, ubuntu/ubuntu, root/empty). Causa: o pedido da cápsula nunca
  foi confirmado. Depois de premir Y, os ecrãs de configuração apareceram e a
  instalação concluiu-se. Outros utilizadores no mesmo tópico resolveram-no
  gravando com o SDK Manager. (grau B)
- Se o kit nunca chega ao instalador (ecrã preto, ou cai numa shell UEFI), o
  firmware QSPI é provavelmente demasiado antigo: o JetPack 7.2/7.2.1 exige
  firmware UEFI/QSPI da geração JetPack 6.x. Consulte
  [Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates) e
  [Migração do JetPack 6.x](/pt-pt/tutorials/jetson-orin-nano/jetpack-6-to-7).
  (grau A,
  [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## A instalação ou a gravação falha com certos periféricos USB

Problemas oficiais **5424568** e **5460707** (presentes nas notas da
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
e da
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
a instalação por ISO falha quando a unidade USB do instalador está ligada a um
hub **"USB3.0 4-port Portable Hub Model UH400"** — "Outras unidades USB ou hubs
funcionam como esperado" — e a gravação falha por vezes quando está ligado um
adaptador USB-para-Ethernet **TRENDnet TU2-ET100**. Utilize outra unidade/hub ou
uma porta USB direta e remova o adaptador antes de tentar de novo. (grau A)

## Faltam os modos 25W e MAXN SUPER

Sintomas: só aparecem 7W e 15W, ou `nvpmodel -m 2` devolve um erro de modo de
alimentação inválido. Causa — problema conhecido oficial **6279443** (notas da
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)):
as unidades atualizadas por ISO "não passam a assumir o modo 'Super' por
predefinição após a atualização. Para usar o modo 'Super', tem de gravar o
destino com um anfitrião Linux ou o SDKM." (grau A)

Assinatura — falta o sufixo `-super` em `/etc/nv_boot_control.conf`.
Funcionários: "Quando o modo Super está ativado, a configuração deve incluir o
sufixo -super … Atualmente, a imagem ISO não consegue atualizar um dispositivo
do modo não-Super para o modo Super. Utilize um anfitrião x86 para regravar o
dispositivo com a configuração do modo Super." (grau B,
[tópico 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

Corrigido por conceção na 7.2.1 — funcionários: "Isto será corrigido na
jp7.2.1"; as notas da
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)
dizem "a ISO passa agora a gravar o Jetson Orin Nano Developer Kit com a
configuração de gravação do modo Super por predefinição", e o problema 6279443
está ausente da lista de problemas conhecidos. (grau A)

Opções de correção:

1. Regrave a partir de um anfitrião Linux ou com o SDK Manager. (grau A,
   problema 6279443, notas da
   [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. Gravação só do QSPI indicada por funcionários — grava apenas o carregador de
   arranque QSPI, sem imagem de sistema (grau B,
   [tópico 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)).
   O primeiro comando é o comando dos funcionários; o segundo acrescenta o
   destino Super e as substituições de EEPROM com que o autor do relato teve
   êxito:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. Correção no local da comunidade — *não confirmada*, não subscrita pela
   NVIDIA (grau B,
   [tópico 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627),
   [tópico 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)).
   Funcionários da NVIDIA pediram aos utilizadores que registassem o estado
   **antes** de editar esse ficheiro (`cat /etc/nv_tegra_release`,
   `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) —
   editá-lo "removeria o estado de falha de que precisamos para inspecionar".
   Sequência relatada: `sudo -i`;
   `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`;
   `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`;
   `reboot`; depois `sudo nvpmodel -m 2 --verbose --force`. Vários utilizadores
   confirmaram que 25W e MAXN SUPER passaram a aparecer; um utilizador com uma
   instalação num cartão SD entrou num ciclo de arranque e reinstalou.

Contexto: numa instalação 7.2 não-Super,
`/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER) existe,
mas `/etc/nvpmodel.conf` aponta para o ficheiro não-Super, com apenas 15W e 7W.
(grau B, comunidade,
[tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)).
Comandos de verificação dos modos de alimentação:
[Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system).

## GPU presa a 624,75 MHz

Mesmo com o MAXN_SUPER ativo, a GPU pode ficar fixa a 624750000 Hz
(`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000); gravar apenas a cápsula
Super não ajudou no caso relatado — o firmware Super não foi aplicado.
Funcionários: gravar com o SDK Manager, ou gravação manual a partir de um
anfitrião Ubuntu; disseram estar corrigido na 7.2.1. (grau B,
[tópico 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003))
Nota da comunidade: não existe `nvpmodel_p3767_0005.conf` no L4T 39.2; o módulo
P3767-0005 usa a configuração 0003 (os funcionários não confirmaram). (grau B,
comunidade, mesmo tópico acima)

## Alterações de modo de alimentação e o reinício com ecrã preto

- O pedido de reinício após uma mudança de modo de alimentação é esperado assim
  que a GPU tiver sido utilizada ("golden image context"). (grau B,
  funcionários,
  [tópico 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Se o reinício bloquear com um ecrã preto, corresponde ao problema **6236259**
  ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf);
  listado como corrigido na
  [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
  baixar a frequência da EMC abaixo de Fmax durante a inicialização do systemd
  pode bloquear o sistema no reinício, especialmente com um ecrã ligado.
  (grau A)
- Solução alternativa: reiniciar com o monitor desligado e voltar a ligá-lo
  após o arranque — um utilizador confirmou que isto resolveu os problemas de
  modo de alimentação. (grau B, funcionários e utilizador,
  [tópico 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Mitigação da NVIDIA: mudar para MAXN (repõe a EMC em Fmax) antes de
  reiniciar; se já estiver no modo problemático, arrancar uma vez sem o ecrã.
  (grau A, problema 6236259, notas da
  [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## Problemas com armazenamento NVMe

**O instalador não oferece a unidade / o passo de particionamento falha** —
*não confirmado*: o instalador pode não suportar unidades NVMe formatadas com
setores de 4K; precisa de 512n/512e. Verifique com
`nvme id-ns -H /dev/nvme0n1`; altere com
`nvme format --lbaf=ID /dev/nvme0n1` — **destrutivo**; a publicação não aborda
a preservação de dados. A NVIDIA não confirmou isto oficialmente. (grau B, não
confirmado,
[tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**O arranque bloqueia após uma instalação aparentemente bem-sucedida** — *não
confirmado*: vários relatos de um ecrã preto ou cursor intermitente depois de o
instalador chegar aos 100%. Um utilizador só o resolveu com uma gravação direta
em modo de recuperação; outro atribuiu-o ao problema dos setores de 4K acima.
Sem causa-raiz confirmada. (grau B, não confirmado,
[tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe não detetado na fase UEFI (r39.2)** — uma unidade em PCIe C7 estava
invisível na fase de arranque UEFI, embora funcionasse na R36.4; o autor do
relato resolveu-o restaurando as configurações predefinidas e regravando.
Funcionários: "para o NV devkit, está tudo já configurado corretamente no BSP
predefinido. Quanto mais itens tentar configurar, maior a probabilidade de algo
deixar de funcionar." (grau B,
[tópico 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)).
Nota: as imagens de cartão SD desapareceram a partir do JetPack 7.2 — escreva a
ISO numa unidade USB e instale depois no cartão microSD ou NVMe. (grau A,
[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## O instalador aborta em "Step 9/13 Updating boot firmware" (incompatibilidade do nome da placa)

*Não confirmado.* A instalação pode abortar com:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Causa: `/etc/nv_boot_control.conf` contém um COMPATIBLE_SPEC desatualizado que
não corresponde à lista de placas do pacote do carregador de arranque; o passo
de oem-config/criação de utilizador nunca é executado — o mecanismo de "nome de
utilizador/palavra-passe ignorados" neste caso. Reprodução num sistema r39.2 já
arrancado: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. A NVIDIA
não confirmou isto. Também foi reproduzido num Orin NX 16GB e por terceiros em
2026-09-18 (subiquity `command_34 … returned non-zero exit status 100`); uma
variante foi relatada para o SDK Manager 7.2.x a falhar no "Step 9". (grau B,
não confirmado,
[tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Solução alternativa da comunidade, *não confirmada*: fazer chroot para
`/target`, ampliar o ramo board-glob em `select_3767_payload` dentro de
`/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, depois
`rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`,
executar `dpkg --configure -a` e `apt-mark hold nvidia-l4t-bootloader`. A NVIDIA
não publicou uma correção para esta falha; a solução alternativa da comunidade
acima continua por confirmar. (grau B)

## Incompatibilidade de DTB do Jetson-IO em unidades Super gravadas por ISO

Problema oficial **6236205** (presente na
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
e na
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
`jetson-io.py` falha em unidades Orin Nano Super gravadas com a ISO. Solução
alternativa oficial: encontrar o DTB correspondente em `/boot` com um ciclo
`fdtget` que compara `/compatible` e `/model`; copiá-lo para `/boot/dtb/` como
`kernel_<name>.dtb`; e voltar a executar
`sudo /opt/nvidia/jetson-io/jetson-io.py`. As unidades gravadas por outros
métodos não são afetadas. (grau A)

## Ollama e aceleração por GPU

Histórico: as primeiras compilações do Ollama no JetPack 7.2 recorriam à CPU
porque as bibliotecas CUDA pré-compiladas do Ollama não incluíam sm_87
(capacidade de computação 8.7 do Orin). Funcionários citaram o registo
"skipping CUDA device — compute capability not in compiled architectures …
device=Orin cc=870" e disseram: "Isto é um problema conhecido … Estamos a
trabalhar diretamente com a equipa do Ollama para adicionar suporte nativo ao JP
7.2." (grau B, funcionários,
[tópico 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Estado atual: a versão mais recente do Ollama a montante funciona. Funcionários
verificaram no JetPack 7.2.1 (2026-09-21): instale com
`curl -fsSL https://ollama.com/install.sh | sh`, execute um modelo e verifique
`ollama ps` — deve mostrar `100% GPU`. A linha "WARNING: Unsupported JetPack
version detected" é uma mensagem inofensiva; a antiga solução alternativa com
`override.conf` "já não é necessária". (grau B, funcionários,
[tópico 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Correção de compilações obsoletas: se
`find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` mostrar as
árvores `cuda_v12` e `cuda_v13`, elimine a antiga —
`sudo rm -rf /usr/local/lib/ollama/cuda_v12`. O registo passou então a mostrar
"load_backend: loaded CUDA backend from
/usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7".
(grau B, funcionários e utilizador,
[tópico 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Nota sobre os 8 GB: modelos maiores podem continuar a falhar com
`cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`,
mesmo quando `free -h` mostra memória livre — a memória da GPU é partilhada.
Utilize modelos mais pequenos ou quantizados. (grau B, comunidade,
[tópico 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)).
Mais: [LLMs locais em 8 GB](/pt-pt/tutorials/jetson-orin-nano/local-llm).

## Python wheels para o JetPack 7.2

Resposta dos funcionários para o JP 7.2 / CUDA 13.2: utilize
`https://pypi.jetson-ai-lab.io/sbsa/cu130`. (grau B, funcionários,
[tópico 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)).
Ressalva: quando a raiz do índice foi verificada (2026-09-26), listava
`jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130` e `sbsa/dev` — nenhuma
entrada `jp7` visível; tópicos da comunidade também citam
`https://pypi.jetson-ai-lab.io/jp7/cu132`, não visível nessa listagem. (grau C).
Funcionários: "Reversão: Sim, pode voltar a gravar o JP 6.2.2 através do SDK
Manager, se necessário." (grau B)

## O Wi-Fi não encontra a rede

Problemas conhecidos oficiais do Wi-Fi (nas notas da
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
**os routers Wi-Fi 6 GHz com MBSSID não são suportados** (problema **5226667**)
e **a pesquisa Wi-Fi pode falhar APs em ambientes congestionados** — execute
`wpa_cli set bss_max_count 500` como solução alternativa para o buffer
(problema **5426982**). (grau A)

## Consola série (depuração sem monitor)

Ligação (grau A,
[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)):
cabo série USB-para-TTL no Button Header — pino RXD 3 para o fio TX do
adaptador, pino TXD 4 para o fio RX do adaptador, pino GND 7 para o fio de terra
do adaptador. Depois "abra uma consola série no seu PC". Prima **Esc**
repetidamente durante o arranque para entrar na UEFI. Para uma instalação por
ISO sem monitor, prima Esc nas opções de pré-arranque, escolha **Boot Manager**
e selecione o disco USB.

- As páginas da NVIDIA não indicam velocidade de transmissão nem programa de
  terminal — apenas "abra uma consola série no seu PC". (ver *O que não
  conseguimos confirmar*)
- Sem um monitor DisplayPort ou uma Debug UART, uma instalação por ISO sem
  monitor não é prática — funcionários: "Precisa de usar a saída de vídeo DP ou
  a Debug UART … por isso, se não tiver nenhuma delas, é praticamente
  impossível." (grau B, funcionários,
  [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Em instalações por ISO sem monitor, a consola da UEFI é `/dev/ttyACM1`,
  inundada de saída até o QSPI ser atualizado para GA (38.2); não se observa com
  um ecrã ligado
  ([problema 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)).
  (grau A)
- Após voltar a inserir o cabo de depuração, o minicom pode ficar inacessível —
  reinicie o minicom
  ([problema 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf),
  em ambas as versões). (grau A)

## Erro de permissões do Docker

Correção oficial (grau A,
[Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html))
— reinicie o terminal se a alteração de grupo não produzir efeito:

```
sudo usermod -aG docker $USER
newgrp docker
```

## Obter ajuda

- **Fórum de Desenvolvedores NVIDIA Jetson** (forums.developer.nvidia.com) —
  comunidade oficial, indicada na página Additional Docs da NVIDIA. Pesquise
  primeiro e publique depois com a saída de `cat /etc/nv_tegra_release`; para
  problemas de alimentação ou firmware, inclua também
  `/etc/nv_boot_control.conf` e `sudo /usr/sbin/nvpmodel -q --verbose`.
  (grau A para a listagem)
- **Atenção:** algumas respostas marcadas como "NVIDIA-STAFF" são respostas de
  LLM geradas automaticamente — começam com um marcador como "— 🤖 This is an
  automated AI response. I'm here to help, but please verify important
  details! —" ou "*** Please note that this reply is generated by LLM
  automatically ***". Trate-as como não fidedignas. (grau B,
  [tópico 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627),
  [tópico 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com para apoio técnico e para questões
  de encomenda, garantia e RMA (inclua o número da sua encomenda). Vendas:
  sales@juxitech.com · Questões sobre produtos: pe@juxitech.com.

## Ainda em aberto a montante

As notas de versão da NVIDIA listam um problema em aberto para este kit que
pode causar um reinício inesperado: **abortos da DCE durante a suspensão/retoma
SC7 que desencadeiam um reinício pelo watchdog** (problema 6235055, em aberto
tanto na r39.2 como na r39.2.1). Se nunca suspender o kit, isto não o afeta; se
suspender, acompanhe-o a montante em vez de procurar uma correção de
configuração. (grau A,
[notas de versão da r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## O que não conseguimos confirmar

Questões em aberto nas nossas fontes:

- A velocidade de transmissão e o programa de terminal da consola série — a
  NVIDIA diz apenas "abra uma consola série no seu PC".
- Se a incompatibilidade do nome da placa (`command_34` exit 100) está
  corrigida na r39.2.1; sem resposta da NVIDIA nos tópicos; última reprodução
  da comunidade em 2026-09-18.
- Se uma instalação por ISO 7.2.1 repõe os modos Super numa unidade
  originalmente gravada com a ISO 7.2 — as notas dizem apenas que a 7.2.1 grava
  a configuração Super por predefinição.
- Se a limitação de NVMe com setores de 4K é real e está oficialmente
  documentada — apenas um relato da comunidade, não consta das notas de versão
  nem do guia do utilizador.
- Não existe procedimento oficial para reetiquetar um COMPATIBLE_SPEC/TNSPEC
  desatualizado; uma pergunta no fórum à NVIDIA ficou sem resposta.
- Qual é o índice de wheels canónico para o JP 7.2: `/sbsa/cu130` (funcionários)
  ou `/jp7/cu132` (citação da comunidade).
- Os requisitos do anfitrião de gravação divergem entre fontes oficiais: as
  notas de versão dizem "Ubuntu 24.04 and 22.04" (sem arquitetura); a página do
  BSP diz x86_64 para o SDK Manager; utilizadores também relatam ter gravado a
  7.2.1 com êxito através do SDK Manager no Windows.
- Se a edição comunitária de `nv_boot_control.conf` é segura — a NVIDIA não
  subscreveu nem corrigiu o percurso no local.
- Se `sudo nvpmodel -m 2` persiste entre reinícios numa instalação não-Super
  (os relatos da comunidade dizem que não).
- Relatos de corrupção EXT4/NVMe (recuperação do journal falhada, timeout da
  etiqueta de I/O, "Attempting recovery boot") — por resolver; o tópico foi
  fechado sem resposta.
- Ollama através de compilação a partir do código-fonte ou contentores —
  nenhum dos percursos é autoritativo; só o instalador mais recente a montante
  tem confirmação de funcionários da NVIDIA na 7.2.1.
- A alegação de compilação "7.2.1-b49 vs b184" e as "Agent Skills" em falta —
  não verificado, provavelmente uma confusão; a secção What's New da r39.2.1
  lista efetivamente "Agent skills for video pipelines".

## Fontes

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — verificado em 2026-09-26
- Notas de versão: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — verificado em 2026-09-26
- Tópicos do fórum de desenvolvedores da NVIDIA (verificado em 2026-09-26): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Estado: rascunho, pendente de revisão por cheny. Os itens marcados como não
confirmados provêm de relatos do fórum da comunidade e podem mudar. Esta página
baseia-se apenas na documentação — a Juxi não testou este kit em hardware.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
