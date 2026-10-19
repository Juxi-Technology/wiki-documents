---
title: "04 · Porta serial TTL (serial sem fio)"
description: "A porta TTL de 6 pinos é uma porta de passagem serial: conecte uma placa de desenvolvimento, sensor etc."
---

# 04 · Porta serial TTL (serial sem fio)

> [← Voltar à visão geral](/pt-br/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

## O que é

A porta TTL de 6 pinos é uma **porta de passagem serial**: conecte uma placa de desenvolvimento, sensor etc. e seus dados seriais são emitidos «simultaneamente» em dois lugares (bidirecional):

```
                ┌─→ Porta serial do PC (USB; reconhecida pelo sistema como "USB-BLE-SERIAL CH9143")
Dispositivo externo → 6 pinos ┤
                └─→ Bluetooth sem fio (app BleUart do celular, ver 03)
```

**Referência medida**: com um sensor IMU conectado, a porta serial do PC e o Bluetooth receberam simultaneamente e de forma estável cerca de 1650 bytes/segundo.

## Pinagem e fiação

Da esquerda para a direita: `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Pino | Descrição | Fiação |
|---|---|---|
| GND | Terra | Ligar ao GND do dispositivo externo (**obrigatório**) |
| RXD | Recepção local | Ligar ao **TXD** do dispositivo externo (cruzado) |
| TXD | Transmissão local | Ligar ao **RXD** do dispositivo externo (cruzado) |
| TNOW | Indicador de direção de transmissão | **Deixar desconectado** |
| 3V3 | Saída de alimentação 3,3 V | Pode alimentar periféricos de baixo consumo (alternativa ao 5V) |
| 5V | Saída de alimentação 5 V | Pode alimentar periféricos de baixo consumo (alternativa ao 3V3) |

**Pontos-chave**: TX/RX devem ser **cruzados**; nível lógico **3,3 V**; os pinos de alimentação são **saídas** — nunca injete alimentação neles; alimente apenas módulos de baixo consumo.

(Ilustração: material do tutorial 12 – Exemplo de fiação TTL)

## Uso no computador

1. Conecte este produto ao computador via Type-C (PC1 ou PC2, tanto faz);
2. O sistema reconhece automaticamente a porta serial **`USB-BLE-SERIAL CH9143`** (sem driver no Windows 10/11);
3. Abra com qualquer ferramenta serial; parâmetros: **115200, 8N1**;
4. Os dados do dispositivo externo chegam em tempo real (também é possível enviar dados a ele).

## Conexão a placas de desenvolvimento (Raspberry Pi / Jetson)

Nível 3,3 V, conexão direta possível (fiação cruzada, GND conectado):

| Este produto | Raspberry Pi | Jetson (série Orin, 40 pinos) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | Qualquer GND (ex.: Pin9) | Qualquer GND (ex.: Pin9) |

> No Raspberry Pi, habilite a porta serial no `raspi-config`; no Jetson, habilite primeiro a UART de 40 pinos.
> Cenário típico: serial da placa → KVM → digitar comandos no PC e ver os logs, enquanto o celular também os vê via Bluetooth (depuração sem fio).

(Ilustração: material do tutorial 10 – Pinagem do Jetson, 11 – Pinagem do Raspberry Pi)

## Solução de problemas: sem dados seriais?

Verifique em ordem:
1. O TX/RX do dispositivo externo está **cruzado** e o GND conectado?
2. O baud rate do dispositivo externo é **115200**?
3. O dispositivo externo está alimentado (você pode usar os pinos 5V/3V3 deste produto)?
4. A porta serial do PC está ocupada por outro programa? Ao alternar o dispositivo para o outro computador, a porta desaparece brevemente (normal).

<RelatedProducts slugs="kvm-switch" />
