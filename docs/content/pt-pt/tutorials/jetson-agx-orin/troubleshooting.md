---
title: Resolução de problemas
sidebar_label: Resolução de problemas
slug: /support/troubleshooting
description: >-
  Resolução de problemas orientada por sintomas para o kit de desenvolvedor
  Jetson AGX Orin — arranque e ecrã, alimentação, gravação e problemas
  conhecidos, com base na documentação oficial da NVIDIA.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Resolução de problemas

Os problemas estão agrupados por sintoma — encontre o seu e siga as verificações
pela ordem indicada. Tudo aqui tem por base a documentação oficial da NVIDIA
(fontes no final). Para o que não estiver coberto, consulte *Obter ajuda* no
final.

## O kit não liga

1. A fonte de alimentação USB-C incluída tem de ser ligada à **porta USB-C acima da tomada DC** (J24) — não à porta ao lado do conector de 40 pinos.
2. O kit liga-se automaticamente quando a alimentação é ligada; se não ligar, prima o **botão de alimentação**.
3. Se utilizar a sua própria fonte de alimentação através da entrada tipo barril (J41): 5.5 mm OD, 2.5 mm ID, **centro positivo**.

## Sem saída de vídeo / o ecrã fica preto

- **O DisplayPort é a única saída de vídeo.** Não existe porta HDMI nem DisplayPort sobre USB-C. Para um monitor HDMI, utilize um adaptador ou cabo DP→HDMI **ativo**.
- O primeiro arranque pode demorar **até um minuto** até a imagem aparecer no ecrã.
- Se utiliza um **chaveador KVM**, ligue o monitor diretamente ao kit — os dispositivos KVM são uma fonte conhecida de problemas de ecrã preto tanto durante o arranque normal como durante a instalação por ISO (a NVIDIA indica-o no guia de configuração).
- Vai arrancar com uma configuração de alimentação problemática? Consulte *O sistema bloqueia ao reiniciar com um ecrã ligado* abaixo — experimente arrancar **sem** o ecrã ligado e volte a ligá-lo depois do arranque.

## Após a instalação por ISO, o kit arranca o sistema antigo

Remova a unidade USB de instalação após a instalação. Se a unidade permanecer
inserida, o kit pode voltar a arrancar a partir dela em vez do sistema acabado
de instalar. (Indicação oficial.)

## Gravação — problemas com o Jetson ISO

- **O kit não arranca a partir da unidade USB:** abra o **gestor de arranque UEFI** durante o arranque e selecione a unidade USB.
- **Aparece um pedido de firmware QSPI:** prima **`Y`**. Esta atualização de cápsula é necessária para a compatibilidade e é executada duas vezes. Se deixar passar o pedido ou não tiver a certeza de que foi concluído, **reinicie a instalação** e confirme-o. Ignorar este passo provoca problemas de instalação (problema conhecido 6266271 das notas de versão da NVIDIA).
- **O meu kit é mais antigo do que o L4T r35.5:** o percurso do ISO requer um BSP instalado r35.5 ou mais recente. Utilize primeiro os métodos com PC host (SDK Manager ou `flash.sh`) para atualizar para r35.5+ — consulte [Gravação e atualizações](/pt-pt/tutorials/jetson-agx-orin/flashing-and-updates).

## Gravação — problemas com o SDK Manager

- **Dispositivo não detetado:** verifique, por ordem —
  1. O cabo ligado à **porta USB-C ao lado do conector de 40 pinos** (porta 10 / J40), não à porta de alimentação;
  2. O kit entrou em **modo Force Recovery**: mantenha premido o **botão central de Force Recovery** enquanto introduz a ficha de alimentação;
  3. O host cumpre os requisitos: Ubuntu Desktop 20.04/22.04 (x86_64), 8 GB de RAM, 25 GB de disco livre e sessão iniciada numa conta do NVIDIA Developer Program. (As notas de versão do L4T 39.2 indicam as distribuições de host 24.04/22.04 para gravação — consulte a página de requisitos de sistema do SDK Manager para a lista atual.)
- **Quero gravar para NVMe / microSD / unidade USB:** o instalador ISO abrange eMMC e NVMe; os outros destinos requerem o SDK Manager ou o script de gravação (PC host).

## O sistema bloqueia ao reiniciar com um ecrã ligado (AGX Orin 64GB, modo 15W)

Problema conhecido **6236259** das notas de versão da NVIDIA: nas plataformas
AGX Orin, baixar a frequência da EMC abaixo do máximo (o que acontece nos modos
de baixo consumo, como 15W) durante a inicialização do systemd pode bloquear o
sistema ao reiniciar — especialmente com um ecrã ligado. Solução alternativa
segundo a NVIDIA:

1. Antes de reiniciar, mude para o modo de alimentação **MAXN** (repõe a EMC em Fmax).
2. Depois de o sistema reiniciar, aplique o modo de alimentação pretendido.
3. Se o reiniciou enquanto estava no modo problemático: desligue o ecrã, arranque e volte a ligar o ecrã após a inicialização.

## Rede e ligação sem fios (notas pós-gravação)

- **Não consegue ligar-se a 6 GHz / WPA3 logo após a gravação:** reinicialize o dispositivo e tente novamente (indicado como corrigido no L4T 39.2.0; a nota sobre a reinicialização continua a aplicar-se a unidades gravadas com imagens mais antigas).
- **Alguns pontos de acesso Wi-Fi em falta nos varrimentos (ambientes congestionados):** aumente o buffer de varrimento — `wpa_cli set bss_max_count 500` (da secção de problemas corrigidos das notas de versão).

## Problemas conhecidos para além desta página

Antes de uma depuração aprofundada, consulte a secção **Problemas conhecidos**
das notas de versão atuais — abrange itens gerais de sistema, câmara,
multimédia, gráficos, conectividade, ecrã e pilha de computação:

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Obter ajuda

- **[Fórum de Desenvolvedores NVIDIA Jetson](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — comunidade oficial; pesquise antes de publicar e inclua a saída de `cat /etc/nv_tegra_release`.
- **Apoio da Juxi Technology** — **support@juxitech.com** para apoio técnico e para questões de encomenda, garantia e RMA. Para agilizar, inclua o seu número de encomenda e a saída de `cat /etc/nv_tegra_release`. (Vendas: sales@juxitech.com · Questões sobre produtos: pe@juxitech.com)

## Fontes

- [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit User Guide (verificado em 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-23)

*Estado: rascunho, pendente de revisão por cheny. O comportamento específico do
hardware relatado pelos clientes pode variar; atualize esta página à medida que
chegarem relatórios de campo.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
