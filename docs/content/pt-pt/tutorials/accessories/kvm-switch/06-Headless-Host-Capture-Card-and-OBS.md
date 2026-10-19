---
title: "06 · Host sem monitor (placa de captura + OBS)"
description: "Dar teclado e rato a uma «placa de desenvolvimento / placa-mãe sem monitor» — sem precisar de lhe fornecer um monitor próprio: o vídeo passa por uma placa de…"
---

# 06 · Host sem monitor (placa de captura + OBS)

> [← Voltar à visão geral](/pt-pt/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

Dar teclado e rato a uma «placa de desenvolvimento / placa-mãe sem monitor» — **sem precisar de lhe fornecer um monitor próprio**: o vídeo passa por uma placa de captura até ao computador, e o teclado/rato passam pelo comutador KVM.

## Como funciona

```
Placa de desenvolvimento (sem monitor) ──vídeo──→ placa de captura ──USB──→ o seu computador (imagem numa janela do OBS)
Placa de desenvolvimento (sem monitor) ──teclado/rato──→ ←── comutador KVM ──→ o seu computador (mesmo teclado/rato)
```

## Passos

**① Ligar o vídeo** (leve a saída de vídeo do host a uma **placa de captura HDMI 4K**, cujo lado USB vai para o seu computador):

| Saída do host | Cablagem |
|---|---|
| HDMI | Cabo HDMI → placa de captura |
| Micro HDMI (Raspberry Pi, etc.) | Adaptador Micro-HDMI → cabo HDMI → placa de captura |
| DP | Adaptador DP-HDMI → cabo HDMI → placa de captura |

**② Ligar teclado/rato**: ligue o teclado/rato (ou recetor sem fios) à porta USB-A deste produto e prima o botão para **comutá-los para a placa de desenvolvimento**;

**③ Ver e operar**: no computador, adicione um «dispositivo de captura de vídeo» no **OBS** ou **PotPlayer** — veja o ecrã da placa e escreva no teclado.

(Ilustração: material do tutorial 06 – Placa + placa de captura em utilização, 07 – cablagem da placa de captura, 08 – guia do OBS, 09 – guia do PotPlayer)

## Dicas

- Ligue a placa de captura **diretamente ao computador** (não através das portas USB do KVM) para garantir uma imagem estável;
- Após comutar o teclado/rato, a placa deixa de responder aos mesmos — um toque no botão traz os de volta.

<RelatedProducts slugs="kvm-switch" />
