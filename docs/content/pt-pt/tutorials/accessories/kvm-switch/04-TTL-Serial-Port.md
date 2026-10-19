---
title: "04 · Porta série TTL (série sem fios)"
description: "A porta TTL de 6 pinos é uma porta de passagem série: ligue uma placa de desenvolvimento, sensor, etc."
---

# 04 · Porta série TTL (série sem fios)

> [← Voltar à visão geral](/pt-pt/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

## O que é

A porta TTL de 6 pinos é uma **porta de passagem série**: ligue uma placa de desenvolvimento, sensor, etc. e os seus dados série são emitidos «simultaneamente» em dois locais (bidirecional):

```
                ┌─→ Porta série do PC (USB; reconhecida pelo sistema como "USB-BLE-SERIAL CH9143")
Dispositivo externo → 6 pinos ┤
                └─→ Bluetooth sem fios (app BleUart do telemóvel, ver 03)
```

**Referência medida**: com um sensor IMU ligado, a porta série do PC e o Bluetooth receberam simultaneamente e de forma estável cerca de 1650 bytes/segundo.

## Pinagem e cablagem

Da esquerda para a direita: `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Pino | Descrição | Cablagem |
|---|---|---|
| GND | Terra | Ligar ao GND do dispositivo externo (**obrigatório**) |
| RXD | Receção local | Ligar ao **TXD** do dispositivo externo (cruzado) |
| TXD | Transmissão local | Ligar ao **RXD** do dispositivo externo (cruzado) |
| TNOW | Indicador de direção de transmissão | **Deixar sem ligação** |
| 3V3 | Saída de alimentação 3,3 V | Pode alimentar periféricos de baixo consumo (alternativa ao 5V) |
| 5V | Saída de alimentação 5 V | Pode alimentar periféricos de baixo consumo (alternativa ao 3V3) |

**Pontos essenciais**: TX/RX devem ser **cruzados**; nível lógico **3,3 V**; os pinos de alimentação são **saídas** — nunca injete alimentação neles; alimente apenas módulos de baixo consumo.

(Ilustração: material do tutorial 12 – Exemplo de cablagem TTL)

## Utilização no computador

1. Ligue este produto ao computador via Type-C (PC1 ou PC2, indiferente);
2. O sistema reconhece automaticamente a porta série **`USB-BLE-SERIAL CH9143`** (sem controladores no Windows 10/11);
3. Abra com qualquer ferramenta série; parâmetros: **115200, 8N1**;
4. Os dados do dispositivo externo chegam em tempo real (também pode enviar dados para ele).

## Ligação a placas de desenvolvimento (Raspberry Pi / Jetson)

Nível 3,3 V, ligação direta possível (cablagem cruzada, GND ligado):

| Este produto | Raspberry Pi | Jetson (série Orin, 40 pinos) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | Qualquer GND (ex.: Pin9) | Qualquer GND (ex.: Pin9) |

> No Raspberry Pi, ative a porta série no `raspi-config`; no Jetson, ative primeiro a UART de 40 pinos.
> Cenário típico: série da placa → KVM → escrever comandos no PC e ver os registos, enquanto o telemóvel também os vê por Bluetooth (depuração sem fios).

(Ilustração: material do tutorial 10 – Pinagem do Jetson, 11 – Pinagem do Raspberry Pi)

## Resolução de problemas: sem dados série?

Verifique por ordem:
1. O TX/RX do dispositivo externo está **cruzado** e o GND ligado?
2. A velocidade de transmissão do dispositivo externo é **115200**?
3. O dispositivo externo está alimentado (pode utilizar os pinos 5V/3V3 deste produto)?
4. A porta série do PC está ocupada por outro programa? Ao comutar o dispositivo para o outro computador, a porta desaparece brevemente (normal).

<RelatedProducts slugs="kvm-switch" />
