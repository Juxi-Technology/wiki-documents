---
title: Migração do JetPack 6.x para o JetPack 7.2.1
sidebar_label: Migrar do JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  O que muda entre o JetPack 6.x e o JetPack 7.2.1 no Jetson Orin Nano Super
  Developer Kit (8GB): o pré-requisito de firmware, a armadilha do modo Super,
  a lista de verificação da migração e a reversão.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Migração do JetPack 6.x para o JetPack 7.2.1

Esta página destina-se aos proprietários de um kit de desenvolvedor Jetson
Orin Nano (Super) que estão a migrar do JetPack 6.x para o JetPack 7.2.1. Kits
novos: comece antes pelo
[Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start).

O JetPack 7.2.1 é um salto grande: conte com uma regravação completa, um
pré-requisito de firmware e algumas recompilações de software.

## O que muda

| Camada | Era do JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| SO / sistema de ficheiros raiz | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel Linux | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Nota da Juxi:** A coluna 6.x usa o JetPack 6.2.3, a última versão de
> produção do JetPack 6. Confirme as suas próprias versões com
> `cat /etc/nv_tegra_release`. O valor do VPI no 7.2.1 é retirado do
> repositório de pacotes da NVIDIA e não da respetiva página de
> descarregamentos, que ainda apresenta o valor do JetPack 7.2 — ver a nota em
> [Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system).

- **Fim das imagens de cartão SD.** "A partir do JetPack 7.2, as imagens de
  cartão SD deixaram de ser suportadas." O instalador é uma única ISO para uma
  unidade USB; um cartão microSD continua a ser um destino de instalação
  válido.
- **Um pré-requisito de firmware.** As instalações do JetPack 7.2 e posteriores
  exigem firmware UEFI/QSPI Jetson da geração JetPack 6.x; os kits com firmware
  de fábrica mais antigo têm de concluir primeiro o percurso de atualização do
  JetPack 6.x. O JetPack 7.0 e o 7.1 não listam hardware Orin, pelo que a 7.2 é
  a primeira versão 7.x para a família.
- **Um fluxo de instalação diferente.** A ISO instala a partir de uma unidade
  USB para microSD ou NVMe no dispositivo. É apenas para instalação, não é uma
  "live USB".

## Não atualize ainda se...

- **O seu robô depende do Isaac ROS.** A matriz de componentes da 7.2.1 lista o
  Isaac ROS como "Coming soon", mas funcionários da NVIDIA afirmam que o Isaac
  ROS 4.6 suporta o JetPack 7.2 — as fontes divergem. Consulte
  [Robótica](/pt-pt/tutorials/jetson-orin-nano/robotics).
- **O seu código de câmara está fixado à API SIPL mais antiga.** A SIPL API
  v2.0.0 no Jetson Linux 39.2.1 traz "alterações disruptivas que afetam a API,
  a ABI, o esquema JSON, a disposição dos pacotes e o carregamento de
  controladores". Um relato da comunidade (não confirmado pela NVIDIA) diz que
  a configuração de câmara NITO é agora a predefinição e que o modo legado
  `NVCAMERA_NITO_PATH=CONFIG` já não funciona.
- **Não consegue revalidar a sua pilha.** As wheels do CUDA 13, os pacotes
  Python e as bibliotecas de terceiros têm de existir para o Ubuntu 24.04 e o
  CUDA 13.2. As páginas da 7.2.1 da NVIDIA não listam versões de Python nem de
  OpenCV; para as wheels do CUDA 13.2, os funcionários da NVIDIA apontam para o
  índice SBSA do Jetson AI Lab — consulte
  [LLMs locais](/pt-pt/tutorials/jetson-orin-nano/local-llm).

## O que não pode ser transferido — planeie recompilar

- **Motores TensorRT.** O TensorRT passa de 10.3.0 para 10.16.2. Os motores
  serializados estão ligados à versão do TensorRT. Recompile no destino.
- **Binários CUDA.** O CUDA passa de 12.6 para 13.2.2, um salto importante. Não
  conte com a portabilidade dos binários 12.x; recompile com o novo conjunto de
  ferramentas.
- **Módulos de kernel fora da árvore (out-of-tree).** O kernel passa de 5.15
  para 6.8. Recompile os módulos com os novos cabeçalhos do kernel.
- **Controladores de câmara e árvore de dispositivos.** Aplicam-se as
  alterações de API e ABI da SIPL 2.0 (ver acima).
- **Contentores.** As imagens criadas para o JetPack 6 / L4T r36 ficam na pilha
  antiga; a ISO inclui o NVIDIA Container Toolkit 1.19. Funcionários da NVIDIA
  afirmam que o Orin Nano pode agora executar contentores "arm64-SBSA"
  mainstream.
- **Ambientes Python.** O Ubuntu 24.04 usa um Python mais recente do que o
  22.04. Recrie os ambientes virtuais; verifique `python3 --version`.

## Lista de verificação da migração

1. **Faça primeiro uma cópia de segurança.** A instalação apaga o armazenamento
   de destino que selecionar. Copie do kit: dados das aplicações, ficheiros de
   configuração, calibração das câmaras, volumes dos contentores, scripts de
   compilação do TensorRT e modelos ONNX, e fontes personalizadas de
   controladores ou da árvore de dispositivos. Registe as versões com
   `cat /etc/nv_tegra_release` e `apt list --installed | grep nvidia-jetpack`.
2. **Passe o requisito de firmware.** Ligue o kit, prima Esc repetidamente no
   ecrã de arranque da NVIDIA e leia a versão do firmware no menu UEFI. O
   firmware 36.x ou mais recente está pronto para a 7.2.1. Se for anterior a
   36.0, conclua primeiro o "JetPack 6.x Update Path": arranque com a imagem de
   cartão SD atualizada do JetPack 5.1.3
   (`JP513-orin-nano-sd-card-image_b29.zip`) como ponte, deixe-a agendar a
   atualização do carregador de arranque, reinicie, instale o atualizador QSPI
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`) e reinicie
   novamente. Conte com vários reinícios; o JetPack 6.2.x pode agendar mais uma
   atualização após o primeiro arranque. As unidades com BSP 36.2 / JetPack 5.0
   DP têm de atualizar primeiro para uma versão posterior. Verifique o
   agendamento com `sudo systemctl status nv-l4t-bootloader-config`, e o
   firmware com `sudo nvbootctrl dump-slots-info`.
3. **Crie a unidade USB do instalador.** Grave a Jetson ISO r39.2.1 numa
   unidade flash USB (16 GB ou mais) com o Balena Etcher. Não grave a ISO num
   cartão microSD. Instale o armazenamento de destino (microSD ou NVMe) antes
   de arrancar — o instalador só oferece dispositivos instalados.
4. **Instale o JetPack 7.2.1.** Arranque através do gestor de arranque UEFI:
   prima Esc no ecrã de arranque, selecione Boot Manager e selecione o disco
   USB (a NVIDIA recomenda esta seleção explícita).

   > **Importante** — Prima **Y** no pedido de atualização de cápsula QSPI no
   > prazo de 30 segundos ("o passo mais frequentemente esquecido"). Se
   > expirar, a instalação falha mais tarde. A atualização de cápsula é
   > executada em duas passagens e pode reiniciar o kit — isso é esperado.

   No menu GRUB, selecione Install Jetson ISO r39.2.1, selecione o
   armazenamento de destino e confirme (a instalação apaga o armazenamento que
   selecionar). Remova a unidade USB após a instalação, quando solicitado, e
   conclua a configuração inicial do Ubuntu (licença, idioma, rede, utilizador)
   e execute `sudo apt update` e `sudo apt install nvidia-jetpack`.
5. **Confirme o perfil Super.** `sudo /usr/sbin/nvpmodel -q` lista os modos de
   alimentação; no ambiente de trabalho, utilize a barra superior: Power Mode,
   MAXN SUPER. Com o modo Super ativado, `cat /etc/nv_boot_control.conf` mostra
   um sufixo `-super` na linha TNSPEC. Se estiverem em falta, leia a secção
   seguinte.
6. **Revalide as suas cargas de trabalho.** Recompile os motores TensorRT e as
   aplicações CUDA no destino. Recrie os ambientes Python, atualize os
   contentores e volte a testar as câmaras. Execute as verificações de
   [Verificar o sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system) —
   na r39.2.1, `cat /etc/nv_tegra_release` deve mostrar R39, revisão 2.1.

## A armadilha do modo Super (corrigida na 7.2.1)

Numa instalação por ISO 7.2.0, a unidade mantinha a configuração de placa
existente: os modos de alimentação 25W e MAXN SUPER estavam em falta e
`sudo nvpmodel -m 2` falhava com "bad power mode 2". A NVIDIA documentou isto
nas notas de versão da r39.2 como o problema 6279443: "As unidades não passam a
assumir o modo 'Super' por predefinição após a atualização. Para usar o modo
'Super', tem de gravar o destino com um anfitrião Linux ou o SDKM." Funcionários
da NVIDIA chamaram-lhe mais tarde um erro da ISO, corrigido na 7.2.1.

O JetPack 7.2.1 grava a configuração Super por predefinição: "a ISO passa agora
a gravar o Jetson Orin Nano Developer Kit com a configuração de gravação do modo
Super por predefinição". O problema 6279443 não consta da lista de problemas
conhecidos da r39.2.1.

Restam duas ressalvas:

- **Selecione o destino certo ao gravar a partir de um anfitrião.** No SDK
  Manager, o destino é "Jetson Orin Nano [8GB developer kit version]". Com o
  script de gravação, use o destino `jetson-orin-nano-devkit-super`, não o
  destino simples, para ativar os modos Super. Exemplo (Developer Guide, NVMe):
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **Reinstalar a 7.2.1 sobre um sistema existente.** NVIDIA: "Se está a
  reinstalar o JetPack 7.2.1 com a ISO num sistema já instalado, siga
  cuidadosamente as instruções do Getting Started Guide." A NVIDIA não indica
  se uma reinstalação da 7.2.1 repõe o modo Super numa unidade que uma ISO
  7.2.0 deixou em não-Super; o percurso documentado é uma gravação a partir do
  anfitrião com a configuração Super. As correções no local da comunidade
  (editar `/etc/nv_boot_control.conf`) não são subscritas pela NVIDIA; um
  utilizador relatou um ciclo de arranque. Consulte a
  [Resolução de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

## Reversão

Funcionários da NVIDIA afirmam: "Reversão: Sim, pode voltar a gravar o JP 6.2.2
através do SDK Manager, se necessário." Um utilizador confirmou a ida e volta
(regravar para a 6.2.2 e depois voltar a atualizar para a 7.2). O custo, dito
com honestidade:

- **Sem reversão no local.** É uma regravação completa a partir de um anfitrião
  Ubuntu x86 (as páginas oficiais listam anfitriões Ubuntu; funcionários da
  NVIDIA também relatam que o SDK Manager no Windows funciona).
- **O armazenamento de destino é apagado.** A sua cópia de segurança é a única
  cópia.
- **Nada mais é garantido.** A NVIDIA não publica qualquer procedimento de
  reversão e nenhum documento afirma que os suportes de arranque do JetPack 6.x
  funcionam garantidamente com o firmware QSPI da r39.2.x. Trate uma reversão
  como uma reinstalação da pilha antiga, mais o mesmo trabalho de recompilação.

Se apenas faltarem os modos de alimentação Super, a correção mais estreita é
uma regravação a partir do anfitrião com a configuração Super — isso mantém a
linha 7.x. Consulte
[Gravação e atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates).

## Fontes

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — matriz de componentes, remoção das imagens de cartão SD, modo Super por predefinição, aviso sobre reinstalação (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — fluxo de instalação por ISO, requisito de firmware, pedido de cápsula, MAXN SUPER (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — ponte de firmware, verificações de versão (verificado em 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — estado GA, alterações disruptivas da SIPL 2.0 (verificado em 2026-09-26)
- [Jetson Linux 39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — problema 6279443, a armadilha do modo Super (verificado em 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — versões de base do JetPack 6.x (verificado em 2026-09-26)
- Fórum de desenvolvedores da NVIDIA — [JetPack 7.2 GPU acceleration issue](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — funcionários da NVIDIA: percurso de reversão e índice de wheels do CUDA 13.2 (verificado em 2026-09-26)
- Fórum de desenvolvedores da NVIDIA — [25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — funcionários e utilizadores da NVIDIA: verificação do TNSPEC `-super`, regravação a partir do anfitrião (verificado em 2026-09-26)

*Estado: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA e em declarações do fórum de desenvolvedores na data
indicada; ainda não verificado em hardware físico pela Juxi Technology. A lista
de recompilação descreve consequências padrão da plataforma — valide em função
da sua própria pilha.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
