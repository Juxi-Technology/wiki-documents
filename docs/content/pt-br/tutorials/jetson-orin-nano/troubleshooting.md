---
title: Solução de problemas
sidebar_label: Solução de problemas
slug: /support/troubleshooting
description: >-
  Solução de problemas orientada por sintomas para o kit de desenvolvedor NVIDIA Jetson Orin Nano Super (8GB) — armadilhas de instalação, modos de energia, armazenamento NVMe, aceleração por GPU e problemas conhecidos, com graus de fonte claros.
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

# Solução de problemas

Encontre o seu sintoma no índice abaixo e depois leia a seção correspondente. Graus: **A** = documentação oficial da NVIDIA; **B** = fórum de desenvolvedores da NVIDIA (relatos de funcionários ou da comunidade). Itens apenas da comunidade estão marcados como *não confirmados*. A Juxi não tem uma unidade em mãos para esta série — esta página é apenas verificada em documentação, não testada em hardware.

## Comece pelo Guia de Solução de Problemas oficial da NVIDIA

Primeiro recurso da NVIDIA para este kit: o [Guia de Solução de Problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html). Ele cobre exatamente cinco problemas de configuração: (1) a Jetson ISO não inicializa, (2) sem saída de vídeo, (3) o instalador não mostra o armazenamento de destino, (4) atualização de firmware necessária, (5) erro de permissão do docker. Páginas oficiais relacionadas: a página [Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) não contém soluções alternativas no momento (ela remete ao caminho de atualização do JetPack 6.x), e a página [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) lista os canais de escalonamento da NVIDIA. (grau A)

## Índice de sintomas

| Sintoma | Seção |
| --- | --- |
| O instalador pula as telas de idioma/rede/usuário e o sistema trava em uma tela preta com um cursor; nenhuma senha funciona | Prompt da cápsula QSPI ignorado |
| A instalação parecia bem, mas falha depois | Prompt da cápsula QSPI ignorado |
| A instalação ou a gravação falha com um hub ou dongle USB conectado | Periféricos USB |
| Apenas 7W e 15W no menu de energia; erro em `nvpmodel -m 2` | 25W / MAXN SUPER ausentes |
| GPU fixada em 624,75 MHz mesmo em MAXN SUPER | GPU fixada em 624,75 MHz |
| A mudança de modo de energia pede reinicialização; a reinicialização pode travar com uma tela preta | Mudanças de modo de energia e a reinicialização com tela preta |
| O instalador não oferece a unidade NVMe; a instalação trava após 100% | Problemas com armazenamento NVMe |
| O NVMe não é visível na etapa da UEFI | Problemas com armazenamento NVMe |
| A instalação aborta em "Step 9/13 Updating boot firmware" | Incompatibilidade do nome da placa no Step 9/13 |
| `jetson-io.py` falha em uma unidade Super gravada com a ISO | Incompatibilidade de DTB do Jetson-IO |
| O Ollama roda na CPU; aviso "Unsupported JetPack version" | Ollama e aceleração por GPU |
| Precisa de wheels Python para o JetPack 7.2 | Wheels Python |
| O Wi-Fi não encontra a rede; roteadores 6 GHz com MBSSID não suportados | O Wi-Fi não encontra a rede |
| Sem saída de vídeo; o instalador não inicializa | Guia de Solução de Problemas oficial (acima) |
| Erro de permissão do socket do Docker | Erro de permissão do Docker |
| Precisa de logs de inicialização sem um display | Console serial |

## Prompt da cápsula QSPI ignorado (a armadilha de instalação mais comum)

Durante a instalação da ISO, o kit pede que você confirme uma atualização de cápsula de firmware QSPI. A NVIDIA chama isso de "o passo mais comumente esquecido": o aviso espera apenas 30 segundos. **Pressione Y.**

- Se ele expirar, "a instalação falha depois". A instrução da NVIDIA é reiniciar a instalação e pressionar Y. (grau A; [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) seção 5.1; problema 6266271 das notas de versão, no [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) e no [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf): "Pular esta etapa causa problemas de instalação devido à incompatibilidade de novas imagens ISO com imagens QSPI antigas.")
- A atualização é executada em duas passagens, e o kit pode reiniciar entre elas. Isso é esperado. A NVIDIA também recomenda selecionar o pen drive USB do instalador explicitamente no Gerenciador de Inicialização UEFI em vez de depender da inicialização automática. (grau A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html); funcionários confirmaram que o guia foi atualizado com a solução alternativa de um usuário — grau B, [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Assinatura da falha (grau B, relato de usuário mais reconhecimento de funcionário, [tópico 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)): o instalador pula as telas de idioma, rede e nome de usuário, salta para "Finished installation and reboot", e o sistema trava em uma tela preta ou cinza com um cursor. Nenhuma credencial padrão funciona (nvidia/nvidia, ubuntu/ubuntu, root/vazio). Causa: o aviso da cápsula nunca foi confirmado. Depois de pressionar Y, as telas de configuração apareceram e a instalação foi concluída. Outros usuários no mesmo tópico resolveram gravando com o SDK Manager. (grau B)
- Se o kit nunca chega ao instalador (tela preta, ou ele cai em um shell UEFI), o firmware QSPI provavelmente é antigo demais: o JetPack 7.2/7.2.1 exige firmware UEFI/QSPI da geração JetPack 6.x. Veja [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates) e [Migração do JetPack 6.x para o 7.2.1](/pt-br/tutorials/jetson-orin-nano/jetpack-6-to-7). (grau A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## A instalação ou a gravação falha com certos periféricos USB

Problemas oficiais **5424568** e **5460707** (presentes nas notas do [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) e do [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): a instalação da ISO falha quando o pen drive do instalador está conectado a um hub **"USB3.0 4-port Portable Hub Model UH400"** — "outros pen drives ou hubs funcionam como esperado" — e a gravação às vezes falha quando um dongle USB-para-Ethernet **TRENDnet TU2-ET100** está conectado. Use outro pen drive/hub ou uma porta USB direta, e remova o dongle, antes de tentar novamente. (grau A)

## 25W e MAXN SUPER ausentes

Sintomas: apenas 7W e 15W aparecem, ou `nvpmodel -m 2` retorna um erro de modo de energia inválido. Causa — problema conhecido oficial **6279443** (notas do [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)): unidades atualizadas via ISO "não usarão o modo 'Super' por padrão após a atualização. Para usar o modo 'Super', você deve gravar o destino usando um host Linux ou o SDKM." (grau A)

Assinatura — o sufixo `-super` está ausente em `/etc/nv_boot_control.conf`. Funcionário: "Quando o Super Mode está habilitado, a configuração deve incluir o sufixo -super … Atualmente, a imagem ISO não consegue atualizar um dispositivo do modo não-Super para o Super Mode. Use um host x86 para regravar o dispositivo com a configuração do Super Mode." (grau B, [tópico 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

Corrigido por projeto no 7.2.1 — funcionário: "Isso seria corrigido no jp7.2.1"; as [notas do r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) dizem "A ISO agora grava o Jetson Orin Nano Developer Kit com a configuração de gravação do Modo Super por padrão", e o problema 6279443 está ausente da lista de problemas conhecidos. (grau A)

Opções de correção:

1. Regrave a partir de um host Linux, ou com o SDK Manager. (grau A, problema 6279443, [notas do r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. Gravação apenas de QSPI por funcionário — grava apenas o bootloader QSPI, sem imagem de sistema (grau B, [tópico 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)). O primeiro comando é o comando do funcionário; o segundo adiciona o alvo Super do relator, que teve sucesso, e as substituições de EEPROM:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. Correção local da comunidade — *não confirmada*, não endossada pela NVIDIA (grau B, [tópico 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [tópico 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)). Funcionários da NVIDIA pediram que os usuários capturassem o estado **antes** de editar esse arquivo (`cat /etc/nv_tegra_release`, `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) — editar "removeria o estado de falha que precisamos inspecionar". Sequência relatada: `sudo -i`; `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`; `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`; `reboot`; depois `sudo nvpmodel -m 2 --verbose --force`. Vários usuários confirmaram que os modos 25W e MAXN SUPER apareceram depois; um usuário com instalação em cartão SD entrou em loop de inicialização e reinstalou.

Contexto: em uma instalação 7.2 não-Super, `/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER) existe, mas `/etc/nvpmodel.conf` aponta para o arquivo não-Super, com apenas 15W e 7W. (grau B, comunidade, [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)). Comandos de verificação do modo de energia: [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system).

## GPU fixada em 624,75 MHz

Mesmo com o MAXN_SUPER ativo, a GPU pode permanecer fixada em 624.750.000 Hz (`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000); gravar apenas a cápsula Super não ajudou no caso relatado — o firmware Super não foi aplicado. Funcionário: grave com o SDK Manager, ou faça a gravação manual a partir de um host Ubuntu; disse estar corrigido no 7.2.1. (grau B, [tópico 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)) Nota da comunidade: não existe `nvpmodel_p3767_0005.conf` no L4T 39.2; o módulo P3767-0005 usa a configuração 0003 (funcionários não confirmaram). (grau B, comunidade, mesmo tópico acima)

## Mudanças de modo de energia e a reinicialização com tela preta

- O aviso de reinicialização após uma mudança de modo de energia é esperado depois que a GPU tiver sido usada ("contexto de golden image"). (grau B, funcionário, [tópico 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Se a reinicialização travar com uma tela preta, isso corresponde ao problema **6236259** ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf); listado como Corrigido no [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): reduzir o EMC abaixo de Fmax durante a inicialização do systemd pode travar o sistema na reinicialização, especialmente com um display conectado. (grau A)
- Solução alternativa: reinicie com o monitor desconectado e reconecte-o após a inicialização — um usuário confirmou que isso resolveu os problemas de modo de energia. (grau B, funcionário mais usuário, [tópico 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Mitigação da NVIDIA: mude para MAXN (restaura o EMC para Fmax) antes de reiniciar; se já estiver no modo problemático, inicialize uma vez sem o display. (grau A, problema 6236259, [notas do r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## Problemas com armazenamento NVMe

**O instalador não oferece a unidade / a etapa de particionamento falha** — *não confirmado*: o instalador pode não suportar unidades NVMe formatadas com setores de 4K; ele precisa de 512n/512e. Verifique com `nvme id-ns -H /dev/nvme0n1`; mude com `nvme format --lbaf=ID /dev/nvme0n1` — **destrutivo**; a postagem não discute preservação de dados. A NVIDIA não confirmou isso oficialmente. (grau B, não confirmado, [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**A inicialização trava após uma instalação aparentemente bem-sucedida** — *não confirmado*: vários relatos de tela preta ou cursor piscando após o instalador chegar a 100%. Um usuário só resolveu com gravação direta em modo de recuperação; outro rastreou o problema até a questão dos setores de 4K acima. Nenhuma causa raiz confirmada. (grau B, não confirmado, [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe não detectado na etapa da UEFI (r39.2)** — uma unidade em PCIe C7 estava invisível na etapa de inicialização da UEFI embora funcionasse no R36.4; o relator resolveu restaurando as configurações padrão e regravando. Funcionário: "para o NV devkit, tudo já vem configurado corretamente no BSP padrão. Quanto mais itens você tenta configurar, maior a chance de fazer algo não funcionar." (grau B, [tópico 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)). Nota: as imagens de cartão SD deixaram de existir a partir do JetPack 7.2 — grave a ISO em um pen drive USB e instale no microSD ou NVMe. (grau A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## O instalador aborta em "Step 9/13 Updating boot firmware" (incompatibilidade do nome da placa)

*Não confirmado.* A instalação pode abortar com:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Causa: `/etc/nv_boot_control.conf` carrega um COMPATIBLE_SPEC obsoleto que a lista de placas do pacote do bootloader não reconhece; a etapa de oem-config/criação de usuário então nunca roda — o mecanismo de "nome de usuário/senha pulados" neste caso. Reprodução em um sistema r39.2 inicializado: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. A NVIDIA não confirmou isso. Também reproduzido em um Orin NX 16GB e por um terceiro em 2026-09-18 (`command_34 … returned non-zero exit status 100` do subiquity); uma variante foi relatada para o SDK Manager 7.2.x falhando no "Step 9". (grau B, não confirmado, [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Solução alternativa da comunidade, *não confirmada*: entre em chroot em `/target`, estenda o ramo board-glob em `select_3767_payload` dentro de `/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, depois `rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`, execute `dpkg --configure -a` e `apt-mark hold nvidia-l4t-bootloader`. A NVIDIA não publicou uma correção para essa falha; a solução alternativa da comunidade acima permanece não confirmada. (grau B)

## Incompatibilidade de DTB do Jetson-IO em unidades Super gravadas com a ISO

Problema oficial **6236205** (presente no [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) e no [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): `jetson-io.py` falha em unidades Orin Nano Super gravadas com a ISO. Solução alternativa oficial: encontre o DTB correspondente em `/boot` com um loop `fdtget` comparando `/compatible` e `/model`; copie-o para `/boot/dtb/` como `kernel_<name>.dtb`; depois execute novamente `sudo /opt/nvidia/jetson-io/jetson-io.py`. Unidades gravadas por outros métodos não são afetadas. (grau A)

## Ollama e aceleração por GPU

Histórico: builds iniciais do Ollama no JetPack 7.2 caíam para a CPU porque as bibliotecas CUDA pré-compiladas do Ollama não tinham sm_87 (capacidade de computação 8.7 do Orin). Funcionário citou o log "skipping CUDA device — compute capability not in compiled architectures … device=Orin cc=870" e disse: "Este é um problema conhecido … Estamos trabalhando diretamente com a equipe do Ollama para adicionar suporte nativo ao JP 7.2." (grau B, funcionário, [tópico 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Status atual: o Ollama upstream mais recente funciona. Funcionário verificou no JetPack 7.2.1 (2026-09-21): instale com `curl -fsSL https://ollama.com/install.sh | sh`, execute um modelo e depois verifique `ollama ps` — ele deve mostrar `100% GPU`. A linha "WARNING: Unsupported JetPack version detected" é uma mensagem inofensiva; a antiga solução alternativa do `override.conf` "não é mais necessária". (grau B, funcionário, [tópico 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Correção para builds obsoletos: se `find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` mostrar as duas árvores `cuda_v12` e `cuda_v13`, apague a antiga — `sudo rm -rf /usr/local/lib/ollama/cuda_v12`. O log então mostrou "load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7". (grau B, funcionário mais usuário, [tópico 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Nota sobre 8 GB: modelos maiores ainda podem falhar com `cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`, mesmo quando `free -h` mostra memória livre — a memória da GPU é compartilhada. Use modelos menores ou quantizados. (grau B, comunidade, [tópico 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)). Mais: [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm).

## Wheels Python para o JetPack 7.2

Resposta de funcionário para o JP 7.2 / CUDA 13.2: use `https://pypi.jetson-ai-lab.io/sbsa/cu130`. (grau B, funcionário, [tópico 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)). Ressalva: quando a raiz do índice foi verificada (2026-09-26), ela listava `jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130` e `sbsa/dev` — nenhuma entrada `jp7` visível; tópicos da comunidade também citam `https://pypi.jetson-ai-lab.io/jp7/cu132`, não visível nessa listagem. (grau C). Funcionário: "Downgrade: Sim, você pode regravar o JP 6.2.2 via SDK Manager se necessário." (grau B)

## O Wi-Fi não encontra a rede

Problemas oficiais conhecidos de Wi-Fi (nas [notas do r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): **roteadores Wi-Fi 6 GHz que usam MBSSID não são suportados** (problema **5226667**), e **a varredura de Wi-Fi pode não encontrar APs em ambientes congestionados** — execute `wpa_cli set bss_max_count 500` como solução alternativa de buffer (problema **5426982**). (grau A)

## Console serial (depuração headless)

Fiação (grau A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)): cabo serial USB-para-TTL no header de botões — pino RXD 3 no fio TX do adaptador, pino TXD 4 no fio RX do adaptador, pino GND 7 no fio terra do adaptador. Depois, "Abra um console serial no seu PC". Pressione **Esc** repetidamente durante a inicialização para entrar na UEFI. Para uma instalação da ISO sem monitor, pressione Esc nas opções de pré-inicialização, escolha **Boot Manager** e selecione o disco USB.

- As páginas da NVIDIA não informam taxa de transmissão nem programa de terminal — apenas "Abra um console serial no seu PC". (veja *O que não conseguimos confirmar*)
- Sem um display DisplayPort ou a Debug UART, uma instalação da ISO sem monitor não é prática — funcionário: "Você precisaria usar a saída de vídeo DP ou a Debug UART … então, se você não tem nenhuma das duas, é praticamente impossível." (grau B, funcionário, [tópico 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Em instalações da ISO sem monitor, o console da UEFI é `/dev/ttyACM1`, inundado de saída até o QSPI ser atualizado para GA (38.2); não observado com um display conectado ([problema 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)). (grau A)
- Após reconectar o cabo de depuração, o minicom pode ficar inacessível — reinicie o minicom ([problema 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf), nas duas versões). (grau A)

## Erro de permissão do Docker

Correção oficial (grau A, [Guia de Solução de Problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — reinicie o terminal se a mudança de grupo não fizer efeito:

```
sudo usermod -aG docker $USER
newgrp docker
```

## Obter ajuda

- **Fóruns de Desenvolvedores NVIDIA Jetson** (forums.developer.nvidia.com) — comunidade oficial, listada na página Additional Docs da NVIDIA. Pesquise primeiro e depois poste com a saída do seu `cat /etc/nv_tegra_release`; para problemas de energia ou firmware, inclua também `/etc/nv_boot_control.conf` e `sudo /usr/sbin/nvpmodel -q --verbose`. (grau A para a listagem)
- **Cuidado:** algumas respostas marcadas como "NVIDIA-STAFF" são respostas de LLM geradas automaticamente — elas começam com um marcador como "— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —" ou "*** Please note that this reply is generated by LLM automatically ***". Trate-as como não autoritativas. (grau B, [tópico 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [tópico 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com para suporte técnico, e para assuntos de pedido, garantia e RMA (inclua o número do pedido). Vendas: sales@juxitech.com · Dúvidas sobre produtos: pe@juxitech.com.

## Ainda em aberto no upstream

As notas de versão da NVIDIA listam um problema em aberto para este kit que pode causar uma reinicialização inesperada: **abortos do DCE durante o suspend/resume do SC7, disparando um reset do watchdog** (problema 6235055, em aberto tanto no r39.2 quanto no r39.2.1). Se você nunca suspende o kit, isso não o afeta; se suspende, acompanhe no upstream em vez de procurar uma correção de configuração. (grau A, [notas de versão do r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## O que não conseguimos confirmar

Perguntas em aberto nas nossas fontes:

- A taxa de transmissão e o programa de terminal do console serial — a NVIDIA diz apenas "Abra um console serial no seu PC".
- Se a incompatibilidade do nome da placa (`command_34` exit 100) foi corrigida no r39.2.1; nenhuma resposta da NVIDIA nos tópicos; última reprodução da comunidade em 2026-09-18.
- Se uma instalação da ISO 7.2.1 restaura os modos Super em uma unidade originalmente gravada com a ISO 7.2 — as notas dizem apenas que a 7.2.1 grava a configuração Super por padrão.
- Se a limitação de NVMe com setores de 4K é real e documentada oficialmente — apenas relato da comunidade, não está nas notas de versão nem no guia do usuário.
- Nenhum procedimento oficial para re-carimbar um COMPATIBLE_SPEC/TNSPEC obsoleto; uma pergunta de fórum à NVIDIA ficou sem resposta.
- Qual índice de wheels é canônico para o JP 7.2: `/sbsa/cu130` (funcionário) ou `/jp7/cu132` (citação da comunidade).
- Os requisitos do host de gravação entram em conflito entre as fontes oficiais: as notas de versão dizem "Ubuntu 24.04 e 22.04" (sem arquitetura); a página do BSP diz x86_64 para o SDK Manager; usuários também relatam que o SDK Manager do Windows gravou a 7.2.1 com sucesso.
- Se a edição do `nv_boot_control.conf` da comunidade é segura — a NVIDIA não endossou nem corrigiu o caminho local.
- Se `sudo nvpmodel -m 2` consegue persistir entre reinicializações em uma instalação não-Super (relatos da comunidade dizem que não).
- Relatos de corrupção EXT4/NVMe (falha na recuperação do journal, timeout de tag de I/O, "Attempting recovery boot") — não resolvidos; o tópico foi fechado sem resposta.
- Ollama via compilação a partir do código-fonte ou contêineres — nenhuma das rotas é autoritativa; apenas o instalador upstream mais recente tem confirmação de funcionários da NVIDIA no 7.2.1.
- A alegação de build "7.2.1-b49 vs b184" e as "Agent Skills" ausentes — não verificado, plausivelmente confundido; o What's New do r39.2.1 lista "Agent skills for video pipelines".

## Fontes

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — verificado em 2026-09-26
- Notas de versão: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — verificado em 2026-09-26
- Tópicos do fórum de desenvolvedores da NVIDIA (verificado em 2026-09-26): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Status: rascunho, pendente de revisão por cheny. Itens marcados como não confirmados vêm de relatos da comunidade em fóruns e podem mudar. Esta página é apenas verificada em documentação — a Juxi não testou este kit em hardware.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
