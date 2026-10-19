---
title: "04 · Porta seriale TTL (seriale wireless)"
description: "La porta TTL a 6 pin è una porta di passthrough seriale: collega una scheda di sviluppo, un sensore, ecc."
---

# 04 · Porta seriale TTL (seriale wireless)

> [← Torna alla panoramica](/it/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Prodotto applicabile: JUXI Technology KVM&HUB&TTL

## Che cos'è

La porta TTL a 6 pin è una **porta di passthrough seriale**: collega una scheda di sviluppo, un sensore, ecc. e i suoi dati seriali vengono emessi «contemporaneamente» da due punti (bidirezionale):

```
                ┌─→ Porta seriale del PC (USB; riconosciuta dal sistema come "USB-BLE-SERIAL CH9143")
Dispositivo esterno → 6 pin ┤
                └─→ Bluetooth wireless (app BleUart del telefono, vedi 03)
```

**Riferimento misurato**: con un sensore IMU collegato, la porta seriale del PC e il Bluetooth hanno ricevuto contemporaneamente e stabilmente circa 1650 byte/secondo.

## Piedinatura e cablaggio

Da sinistra a destra: `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Pin | Descrizione | Cablaggio |
|---|---|---|
| GND | Massa | Collegare al GND del dispositivo esterno (**obbligatorio**) |
| RXD | Ricezione locale | Collegare al **TXD** del dispositivo esterno (incrociato) |
| TXD | Trasmissione locale | Collegare al **RXD** del dispositivo esterno (incrociato) |
| TNOW | Indicatore di direzione di trasmissione | **Lasciare scollegato** |
| 3V3 | Uscita alimentazione 3,3 V | Può alimentare periferiche a basso consumo (alternativa a 5V) |
| 5V | Uscita alimentazione 5 V | Può alimentare periferiche a basso consumo (alternativa a 3V3) |

**Punti chiave**: TX/RX devono essere **incrociati**; livello logico **3,3 V**; i pin di alimentazione sono **uscite** — non alimentare mai a ritroso; alimenta solo moduli a basso consumo.

(Illustrazione: risorsa del tutorial 12 – Esempio di cablaggio TTL)

## Uso sul computer

1. Collega questo prodotto al computer via Type-C (PC1 o PC2, indifferente);
2. Il sistema riconosce automaticamente la porta seriale **`USB-BLE-SERIAL CH9143`** (senza driver su Windows 10/11);
3. Aprila con un qualsiasi strumento seriale; parametri: **115200, 8N1**;
4. I dati del dispositivo esterno arrivano in tempo reale (puoi anche inviargli dati).

## Collegamento alle schede di sviluppo (Raspberry Pi / Jetson)

Livello 3,3 V, collegamento diretto possibile (cablaggio incrociato, GND collegato):

| Questo prodotto | Raspberry Pi | Jetson (serie Orin, 40 pin) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | Qualsiasi GND (es. Pin9) | Qualsiasi GND (es. Pin9) |

> Sul Raspberry Pi abilita la seriale in `raspi-config`; sul Jetson abilita prima la UART a 40 pin.
> Scenario tipico: seriale della scheda → KVM → digitare comandi sul PC e vedere i log, mentre il telefono li vede anch'esso via Bluetooth (debug wireless).

(Illustrazione: risorsa del tutorial 10 – Piedinatura Jetson, 11 – Piedinatura Raspberry Pi)

## Risoluzione dei problemi: nessun dato seriale?

Controlla nell'ordine:
1. Il TX/RX del dispositivo esterno è **incrociato** e il GND è collegato?
2. Il baud rate del dispositivo esterno è **115200**?
3. Il dispositivo esterno è alimentato (puoi usare i pin 5V/3V3 di questo prodotto)?
4. La porta seriale del PC è occupata da un altro programma? Quando il dispositivo commuta sull'altro computer la porta scompare brevemente (normale).

<RelatedProducts slugs="kvm-switch" />
