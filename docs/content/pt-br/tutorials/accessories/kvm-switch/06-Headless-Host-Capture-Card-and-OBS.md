---
title: "06 · Host sem monitor (placa de captura + OBS)"
description: "Dar teclado e mouse a uma «placa de desenvolvimento / placa-mãe sem monitor» — sem precisar fornecer um monitor próprio: o vídeo passa por uma placa de captu…"
---

# 06 · Host sem monitor (placa de captura + OBS)

> [← Voltar à visão geral](/pt-br/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

Dar teclado e mouse a uma «placa de desenvolvimento / placa-mãe sem monitor» — **sem precisar fornecer um monitor próprio**: o vídeo passa por uma placa de captura até o computador, e o teclado/mouse passam pelo switch KVM.

## Como funciona

```
Placa de desenvolvimento (sem monitor) ──vídeo──→ placa de captura ──USB──→ seu computador (imagem em uma janela do OBS)
Placa de desenvolvimento (sem monitor) ──teclado/mouse──→ ←── switch KVM ──→ seu computador (mesmo teclado/mouse)
```

## Passos

**① Conectar o vídeo** (leve a saída de vídeo do host a uma **placa de captura HDMI 4K**, cujo lado USB vai para o seu computador):

| Saída do host | Fiação |
|---|---|
| HDMI | Cabo HDMI → placa de captura |
| Micro HDMI (Raspberry Pi etc.) | Adaptador Micro-HDMI → cabo HDMI → placa de captura |
| DP | Adaptador DP-HDMI → cabo HDMI → placa de captura |

**② Conectar teclado/mouse**: conecte o teclado/mouse (ou receptor sem fio) à porta USB-A deste produto e pressione o botão para **alterná-los para a placa de desenvolvimento**;

**③ Ver e operar**: no computador, adicione um «dispositivo de captura de vídeo» no **OBS** ou **PotPlayer** — assista à tela da placa e digite no teclado.

(Ilustração: material do tutorial 06 – Placa + placa de captura em uso, 07 – fiação da placa de captura, 08 – guia do OBS, 09 – guia do PotPlayer)

## Dicas

- Conecte a placa de captura **diretamente ao computador** (não através das portas USB do KVM) para garantir imagem estável;
- Após alternar o teclado/mouse, a placa deixa de responder a eles — um toque no botão os traz de volta.

<RelatedProducts slugs="kvm-switch" />
