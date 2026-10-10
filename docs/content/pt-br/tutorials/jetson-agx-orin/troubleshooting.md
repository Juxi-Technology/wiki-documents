---
title: Solução de problemas
sidebar_label: Solução de problemas
slug: /support/troubleshooting
description: >-
  Solução de problemas orientada por sintomas para o kit de desenvolvedor
  Jetson AGX Orin — inicialização e display, energia, gravação e problemas
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

# Solução de problemas

Os problemas estão agrupados por sintoma — encontre o seu e siga as verificações
na ordem. Tudo aqui é baseado na documentação oficial da NVIDIA (fontes no
final). Para o que não estiver coberto, veja *Obter ajuda* no final.

## O kit não liga

1. A fonte de alimentação USB-C incluída deve ser conectada à **porta USB-C acima do conector DC** (J24) — não à porta ao lado do conector de 40 pinos.
2. O kit liga automaticamente quando a energia é conectada; se isso não acontecer, pressione o **botão de energia**.
3. Se você usar sua própria fonte pelo conector barrel (J41): 5,5 mm OD, 2,5 mm ID, **positivo no centro**.

## Sem saída de vídeo / tela permanece preta

- **O DisplayPort é a única saída de vídeo.** Não há porta HDMI nem DisplayPort sobre USB-C. Para um monitor HDMI, use um adaptador ou cabo DP→HDMI **ativo**.
- A primeira inicialização pode levar **até um minuto** até a imagem aparecer.
- Se você usa um **switch KVM**, conecte o monitor diretamente ao kit — dispositivos KVM são uma fonte conhecida de problemas de tela preta tanto na inicialização normal quanto na instalação da ISO (a NVIDIA lista isso no guia de configuração).
- Vai inicializar com uma configuração de energia problemática? Veja *O sistema trava ao reiniciar com um display conectado* abaixo — tente inicializar **sem** o display conectado e reconecte-o após a inicialização.

## Após a instalação da ISO, o kit inicializa o sistema antigo

Remova o pen drive de instalação após a instalação. Se o pen drive permanecer
conectado, o kit pode inicializar a partir dele novamente em vez do sistema
recém-instalado. (Orientação oficial.)

## Gravação — problemas com a Jetson ISO

- **O kit não inicializa pelo pen drive:** abra o **Gerenciador de Inicialização UEFI** durante a inicialização e selecione a unidade USB.
- **Aparece um aviso de firmware QSPI:** pressione **`Y`**. Esta atualização de cápsula é necessária para compatibilidade e é executada duas vezes. Se você perder o aviso ou não tiver certeza de que ela foi concluída, **reinicie a instalação** e confirme-a. Pular esta etapa causa problemas de instalação (problema conhecido 6266271 das notas de versão da NVIDIA).
- **Meu kit é mais antigo que o L4T r35.5:** o caminho da ISO exige um BSP instalado r35.5 ou mais recente. Use os métodos com PC host (SDK Manager ou `flash.sh`) para atualizar primeiro para r35.5+ — veja [Gravação e atualizações](/pt-br/tutorials/jetson-agx-orin/flashing-and-updates).

## Gravação — problemas com o SDK Manager

- **Dispositivo não detectado:** verifique, na ordem —
  1. Cabo conectado à **porta USB-C ao lado do conector de 40 pinos** (porta 10 / J40), e não à porta de alimentação;
  2. O kit entrou em **modo Force Recovery**: mantenha pressionado o **botão central Force Recovery** enquanto insere o plugue de alimentação;
  3. O host atende aos requisitos: Ubuntu Desktop 20.04/22.04 (x86_64), 8 GB de memória do sistema, 25 GB de espaço livre em disco, conta do NVIDIA Developer Program conectada. (As notas de versão do L4T 39.2 listam as distribuições de host 24.04/22.04 para gravação — consulte a página de requisitos de sistema do SDK Manager para a lista atual.)
- **Quero gravar em NVMe / microSD / unidade USB:** o instalador da ISO cobre eMMC e NVMe; outros destinos exigem o SDK Manager ou o script de gravação (PC host).

## O sistema trava ao reiniciar com um display conectado (AGX Orin 64GB, modo 15W)

Problema conhecido **6236259** das notas de versão da NVIDIA: em plataformas
AGX Orin, reduzir a frequência do EMC abaixo do máximo (o que acontece em modos
de baixo consumo, como 15W) durante a inicialização do systemd pode travar o
sistema ao reiniciar — especialmente com um display conectado. Solução
alternativa segundo a NVIDIA:

1. Antes de reiniciar, mude para o modo de energia **MAXN** (restaura o EMC para Fmax).
2. Depois que o sistema reiniciar, aplique o modo de energia desejado.
3. Se o sistema foi reiniciado no modo problemático: desconecte o display, inicialize e reconecte o display após a inicialização.

## Rede e wireless (notas pós-gravação)

- **Não consigo conectar a 6 GHz / WPA3 logo após a gravação:** redefina o dispositivo e tente novamente (listado como corrigido no L4T 39.2.0; a observação sobre a redefinição ainda se aplica a unidades gravadas com imagens mais antigas).
- **Alguns pontos de acesso Wi-Fi não aparecem nas varreduras (ambientes congestionados):** aumente o buffer de varredura — `wpa_cli set bss_max_count 500` (da seção de problemas corrigidos das notas de versão).

## Problemas conhecidos além desta página

Antes de fazer uma depuração profunda, consulte a seção **Problemas conhecidos**
das notas de versão atuais — ela cobre itens de sistema em geral, câmera,
multimídia, gráficos, conectividade, display e pilha de computação:

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Obter ajuda

- **[Fóruns de desenvolvedores NVIDIA Jetson](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — comunidade oficial; pesquise antes de postar e inclua a saída de `cat /etc/nv_tegra_release`.
- **Suporte da Juxi Technology** — **support@juxitech.com** para suporte técnico e para assuntos de pedido, garantia e RMA. Para agilizar, inclua o número do seu pedido e a saída de `cat /etc/nv_tegra_release`. (Vendas: sales@juxitech.com · Dúvidas sobre produtos: pe@juxitech.com)

## Fontes

- [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit User Guide (verificado em 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificado em 2026-09-23)

*Status: revisado em 2026-10-11. O comportamento específico de
hardware relatado por clientes pode variar; atualize esta página conforme os
relatos de campo chegarem.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
