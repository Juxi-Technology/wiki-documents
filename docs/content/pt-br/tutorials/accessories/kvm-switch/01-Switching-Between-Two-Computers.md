---
title: "01 · Alternância entre dois computadores (botão e controle IR)"
description: "Um teclado e um mouse (e os periféricos conectados às portas USB-A) alternam entre dois computadores; apenas um fica conectado por vez."
---

# 01 · Alternância entre dois computadores (botão e controle IR)

> [← Voltar à visão geral](/pt-br/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

Um teclado e um mouse (e os periféricos conectados às portas USB-A) alternam entre **dois computadores**; apenas um fica conectado por vez.

## Como alternar

### ① Botão
Pressione o **botão de alternância** no centro do dispositivo para trocar PC1 ⇄ PC2. O **LED PC1/PC2** do lado correspondente acende, indicando o computador conectado.

### ② Controle remoto infravermelho
Aponte o **controle remoto infravermelho** para o receptor IR (canto superior esquerdo) e pressione a tecla de alternância.
(A inclusão do controle depende do pacote adquirido.)

(Ilustração: material do tutorial 05 – Alternância por botão e infravermelho)

## Duas formas de uso

| Forma | Conexão | Observações |
|---|---|---|
| Ambos os computadores com monitor | Cada um no próprio monitor | Teclado/mouse prontos após alternar (ver Início rápido em 00) |
| Um computador sem monitor (placa de desenvolvimento etc.) | O outro com monitor + solução de placa de captura | Ver [06 - Host sem monitor (placa de captura + OBS)](/pt-br/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Comportamento normal durante a alternância

- Os dispositivos nas portas USB-A desaparecem temporariamente do computador «atual» e aparecem no outro (dongles/impressoras podem levar alguns segundos para serem reconhecidos novamente);
- **O canal Bluetooth sem fio não é afetado pela alternância** (a conexão permanece). A porta serial do PC desconecta brevemente durante a alternância e se recupera automaticamente ao voltar (ver [03](/pt-br/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/pt-br/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Solução de problemas

**Não responde ao pressionar?** Verifique o LED PC1/PC2 para saber o canal atual; confirme que o computador de destino está conectado via Type-C e ligado; pressione novamente para voltar ao computador original.

<RelatedProducts slugs="kvm-switch" />
