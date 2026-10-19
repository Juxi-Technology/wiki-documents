---
title: "01 · Comutação entre dois computadores (botão e comando IR)"
description: "Um teclado e um rato (e os periféricos ligados às portas USB-A) comutam entre dois computadores; apenas um está ligado de cada vez."
---

# 01 · Comutação entre dois computadores (botão e comando IR)

> [← Voltar à visão geral](/pt-pt/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

Um teclado e um rato (e os periféricos ligados às portas USB-A) comutam entre **dois computadores**; apenas um está ligado de cada vez.

## Como comutar

### ① Botão
Prima o **botão de comutação** no centro do dispositivo para trocar PC1 ⇄ PC2. O **LED PC1/PC2** do lado correspondente acende, indicando o computador ligado.

### ② Comando remoto de infravermelhos
Aponte o **comando remoto de infravermelhos** ao recetor IR (canto superior esquerdo) e prima a tecla de comutação.
(A inclusão do comando depende do pacote adquirido.)

(Ilustração: material do tutorial 05 – Comutação por botão e infravermelhos)

## Duas formas de utilização

| Forma | Ligação | Observações |
|---|---|---|
| Ambos os computadores com monitor | Cada um no seu monitor | Teclado/rato prontos após comutar (ver Início rápido em 00) |
| Um computador sem monitor (placa de desenvolvimento, etc.) | O outro com monitor + solução de placa de captura | Ver [06 - Host sem monitor (placa de captura + OBS)](/pt-pt/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Comportamento normal durante a comutação

- Os dispositivos nas portas USB-A desaparecem temporariamente do computador «atual» e aparecem no outro (dongles/impressoras podem demorar alguns segundos a ser reconhecidos novamente);
- **O canal Bluetooth sem fios não é afetado pela comutação** (a ligação mantém-se). A porta série do PC desliga-se brevemente durante a comutação e recupera automaticamente ao voltar (ver [03](/pt-pt/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/pt-pt/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Resolução de problemas

**Não responde ao premir?** Verifique o LED PC1/PC2 para saber o canal atual; confirme que o computador de destino está ligado por Type-C e aceso; prima novamente para voltar ao computador original.

<RelatedProducts slugs="kvm-switch" />
