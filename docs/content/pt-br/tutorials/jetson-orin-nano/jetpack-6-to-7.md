---
title: Migrando do JetPack 6.x para o JetPack 7.2.1
sidebar_label: Migrar do JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  O que muda entre o JetPack 6.x e o JetPack 7.2.1 no kit de desenvolvedor Jetson
  Orin Nano Super (8GB): o pré-requisito de firmware, a armadilha do Modo Super,
  o checklist de migração e a reversão.
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

# Migrando do JetPack 6.x para o JetPack 7.2.1

Esta página é para proprietários de um kit de desenvolvedor Jetson Orin Nano
(Super) que estão passando do JetPack 6.x para o JetPack 7.2.1. Kits novos:
comece pelo [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start).

O JetPack 7.2.1 é um salto grande: planeje uma regravação completa, um
pré-requisito de firmware e algumas recompilações de software.

## O que muda

| Camada | Era do JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| SO / sistema de arquivos raiz | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel do Linux | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Nota da Juxi:** A coluna 6.x usa o JetPack 6.2.3, a última versão de produção
> do JetPack 6. Verifique as suas próprias versões com `cat /etc/nv_tegra_release`.
> O valor do VPI da 7.2.1 vem do repositório de pacotes da NVIDIA, e não da sua
> página de download, que ainda mostra o valor do JetPack 7.2 — veja a nota em
> [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system).

- **Não há mais imagens de cartão SD.** "A partir do JetPack 7.2, imagens de cartão
  SD não são mais suportadas." O instalador é uma única ISO para um pen drive USB;
  um cartão microSD continua sendo um destino de instalação válido.
- **Um pré-requisito de firmware.** Instalações do JetPack 7.2 e posteriores exigem
  firmware UEFI/QSPI Jetson da geração JetPack 6.x; kits com firmware de fábrica
  mais antigo precisam concluir primeiro o caminho de atualização do JetPack 6.x.
  O JetPack 7.0 e o
  7.1 não listam nenhum hardware Orin, então o 7.2 é a primeira versão 7.x para a família.
- **Um fluxo de instalação diferente.** A ISO instala de um pen drive USB para microSD
  ou NVMe no dispositivo. Ela é somente instalação, não um "live USB".

## Não atualize ainda se...

- **O seu robô depende do Isaac ROS.** A matriz de componentes da 7.2.1 lista
  o Isaac ROS como "em breve", mas funcionários da NVIDIA afirmam que o Isaac ROS 4.6 suporta
  o JetPack 7.2 — as fontes discordam. Veja [Robótica](/pt-br/tutorials/jetson-orin-nano/robotics).
- **O seu código de câmera está fixado na API SIPL antiga.** A SIPL API v2.0.0 no
  Jetson Linux 39.2.1 traz "mudanças disruptivas que afetam API, ABI, esquema JSON,
  layout de pacotes e carregamento de drivers". Um relato da comunidade (não
  confirmado pela NVIDIA) diz que a configuração de câmera NITO agora é o padrão
  e que o modo legado `NVCAMERA_NITO_PATH=CONFIG` não funciona mais.
- **Você não consegue revalidar a sua pilha.** Wheels CUDA 13, pacotes Python
  e bibliotecas de terceiros precisam existir para Ubuntu 24.04 e CUDA 13.2.
  As páginas da 7.2.1 da NVIDIA não listam versões de Python nem de OpenCV; para wheels
  do CUDA 13.2, funcionários da NVIDIA apontam para o índice SBSA do Jetson AI Lab — veja
  [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm).

## O que não pode ser reaproveitado — planeje recompilar

- **Engines do TensorRT.** O TensorRT passa de 10.3.0 para 10.16.2. Engines
  serializados estão vinculados à versão do TensorRT. Recompile no destino.
- **Binários CUDA.** O CUDA passa de 12.6 para 13.2.2, um salto importante. Não
  espere que binários CUDA 12.x sejam reaproveitados; recompile com o novo kit de ferramentas.
- **Módulos de kernel fora da árvore.** O kernel passa de 5.15 para 6.8.
  Recompile os módulos com os novos cabeçalhos do kernel.
- **Drivers de câmera e device tree.** Aplicam-se as mudanças de API e ABI do SIPL 2.0
  (veja acima).
- **Contêineres.** Imagens criadas para o JetPack 6 / L4T r36 ficam na pilha
  antiga; a ISO traz o NVIDIA Container Toolkit 1.19. Funcionários da NVIDIA afirmam que
  o Orin Nano agora consegue rodar contêineres Arm64 "arm64-SBSA" convencionais.
- **Ambientes Python.** O Ubuntu 24.04 usa um Python mais novo que o 22.04.
  Recrie os ambientes virtuais; verifique `python3 --version`.

## Checklist de migração

1. **Faça backup primeiro.** A instalação apaga o armazenamento de destino que você
   selecionar. Copie para fora do kit: dados de aplicação, arquivos de
   configuração, calibração de câmera, volumes de contêineres, scripts de compilação do
   TensorRT e modelos ONNX, e fontes de drivers ou device tree personalizados. Registre as versões com
   `cat /etc/nv_tegra_release` e `apt list --installed | grep nvidia-jetpack`.
2. **Passe pela barreira de firmware.** Ligue o kit, pressione Esc repetidamente no
   splash da NVIDIA e leia a versão de firmware no menu UEFI. Firmware 36.x ou
   mais recente está pronto para a 7.2.1. Se for mais antigo que 36.0, conclua primeiro o
   caminho de atualização do JetPack 6.x: inicialize a imagem de cartão SD do JetPack 5.1.3
   atualizada (`JP513-orin-nano-sd-card-image_b29.zip`) como ponte, deixe-a agendar
   a atualização do bootloader, reinicie, instale o atualizador de QSPI
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`) e reinicie
   de novo. Espere várias reinicializações; o JetPack 6.2.x pode agendar mais uma
   atualização após a primeira inicialização. Unidades em BSP 36.2 / JetPack 5.0 DP precisam
   primeiro atualizar para uma versão posterior. Verifique o
   agendamento com `sudo systemctl status nv-l4t-bootloader-config` e o firmware com
   `sudo nvbootctrl dump-slots-info`.
3. **Crie o pen drive do instalador.** Grave a Jetson ISO do r39.2.1 em um pen
   drive USB (16 GB ou maior) com o Balena Etcher. Não grave a ISO
   em um cartão microSD. Instale o armazenamento de destino (microSD ou NVMe) antes de
   inicializar — o instalador só oferece dispositivos instalados.
4. **Instale o JetPack 7.2.1.** Inicialize pelo Gerenciador de Inicialização UEFI: pressione Esc no
   splash, selecione Boot Manager, selecione o disco USB (a NVIDIA recomenda
   essa seleção explícita).

   > **Importante** — Pressione **Y** no aviso de atualização de cápsula QSPI em até
   > 30 segundos ("o passo mais comumente esquecido"). Se ele expirar, a
   > instalação falha depois. A atualização de cápsula é executada em duas passagens e pode
   > reiniciar o kit — isso é esperado.

   No menu do GRUB, selecione Install Jetson ISO r39.2.1, escolha o armazenamento de destino
   e confirme (a instalação apaga o armazenamento que você selecionar). Remova
   o pen drive USB após a instalação quando solicitado, depois conclua a configuração inicial
   do Ubuntu (licença, idioma, rede, usuário) e execute `sudo apt update`
   e `sudo apt install nvidia-jetpack`.
5. **Confirme o perfil Super.** `sudo /usr/sbin/nvpmodel -q` lista os
   modos de energia; na área de trabalho, use a barra superior: Power Mode, MAXN SUPER.
   Com o Super Mode habilitado, `cat /etc/nv_boot_control.conf` mostra um sufixo `-super`
   na linha TNSPEC. Se eles estiverem ausentes, leia a próxima seção.
6. **Revalide as suas cargas de trabalho.** Recompile engines do TensorRT e aplicações
   CUDA no destino. Recrie ambientes Python, atualize
   contêineres, teste as câmeras novamente. Execute as verificações de
   [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system) — para o
   r39.2.1, `cat /etc/nv_tegra_release` deve mostrar R39, revision 2.1.

## A armadilha do Modo Super (corrigida no 7.2.1)

Em uma instalação da ISO 7.2.0, a unidade manteve a configuração de placa existente: os
modos de energia 25W e MAXN SUPER estavam ausentes, e `sudo nvpmodel -m 2`
falhava com "bad power mode 2". A NVIDIA documentou isso nas notas de versão do r39.2
como o problema 6279443: "Unidades não usarão o modo 'Super' por padrão após a
atualização. Para usar o modo 'Super', você deve gravar o destino usando um host Linux
ou o SDKM." Funcionários da NVIDIA depois o chamaram de bug da ISO, corrigido na 7.2.1.

O JetPack 7.2.1 grava a configuração Super por padrão: "A ISO agora grava
o Jetson Orin Nano Developer Kit com a configuração de gravação do Modo Super
por padrão." O problema 6279443 não está na lista de problemas conhecidos do r39.2.1.

Restam duas ressalvas:

- **Selecione o alvo certo ao gravar a partir de um host.** No SDK Manager,
  o alvo é "Jetson Orin Nano [8GB developer kit version]". Com o
  script de gravação, use o alvo `jetson-orin-nano-devkit-super`, e não o
  alvo simples, para habilitar os modos Super. Exemplo (Developer Guide, NVMe):
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **Reinstalar a 7.2.1 sobre um sistema existente.** NVIDIA: "Se você estiver
  reinstalando o JetPack 7.2.1 usando a ISO em um sistema já instalado,
  siga atentamente as instruções do Getting Started Guide."
  A NVIDIA não afirma se uma reinstalação 7.2.1 restaura o Super Mode em uma
  unidade que uma ISO 7.2.0 deixou em não-Super; a rota documentada é uma gravação
  a partir do host com a configuração Super. Correções locais da comunidade (editar
  `/etc/nv_boot_control.conf`) não são endossadas pela NVIDIA; um usuário
  relatou um loop de inicialização. Veja [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

## Reversão

Funcionários da NVIDIA afirmam: "Downgrade: Sim, você pode regravar o JP 6.2.2 via
SDK Manager se necessário." Um usuário confirmou o ciclo completo (regravar para 6.2.2,
e depois atualizar de novo para 7.2). O custo, dito com honestidade:

- **Não há downgrade local.** É uma regravação completa a partir de um host Ubuntu x86
  (as páginas oficiais listam hosts Ubuntu; funcionários da NVIDIA também relatam que o
  SDK Manager do Windows funciona).
- **O armazenamento de destino é apagado.** O seu backup é a única cópia.
- **Nada mais é garantido.** A NVIDIA não publica nenhum procedimento de downgrade,
  e nenhum documento afirma que a mídia de inicialização do JetPack 6.x funciona
  garantidamente com o firmware QSPI do r39.2.x. Trate um downgrade como uma reinstalação
  da pilha antiga, mais o mesmo trabalho de recompilação.

Se apenas os modos de energia Super estiverem ausentes, a correção mais estreita é uma
regravação a partir do host com a configuração Super — isso mantém a linha 7.x. Veja
[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).

## Fontes

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — matriz de componentes, remoção do cartão SD, padrão do Modo Super, aviso sobre reinstalação (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — fluxo de instalação da ISO, barreira de firmware, aviso da cápsula, MAXN SUPER (verificado em 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — ponte de firmware, verificações de versão (verificado em 2026-09-26)
- [Notas de versão do Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — status GA, mudanças disruptivas do SIPL 2.0 (verificado em 2026-09-26)
- [Notas de versão do Jetson Linux 39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — problema 6279443, a armadilha do Modo Super (verificado em 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — versões de referência do JetPack 6.x (verificado em 2026-09-26)
- [Fórum de desenvolvedores da NVIDIA — problema de aceleração por GPU no JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — funcionários da NVIDIA: caminho de downgrade e índice de wheels do CUDA 13.2 (verificado em 2026-09-26)
- [Fórum de desenvolvedores da NVIDIA — 25W e MAXN SUPER não aparecem no JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — funcionários e usuários da NVIDIA: verificação do TNSPEC com `-super`, regravação a partir do host (verificado em 2026-09-26)

*Status: revisado em 2026-10-11. Baseado na documentação oficial
da NVIDIA e em declarações do fórum de desenvolvedores na data indicada; ainda não
verificado em hardware físico pela Juxi Technology. A lista de recompilação descreve
consequências padrão da plataforma — valide com a sua própria pilha.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
