---
title: "04-Versão de servomotor série-Instruções de utilização"
description: "SCS0009 Versão oficial de servomotor de barramento — Instruções de utilização"
---

# 04-Versão de servomotor série-Instruções de utilização

SCS0009 Versão oficial de servomotor de barramento — Instruções de utilização

> **Se adquiriu a versão com servomotor PWM (ESP32-S3 + 8 canais PWM), ignore este diretório**,
basta utilizar `..\01_gui_control` ou `..\02_hand_tracking`.

Este diretório descreve o suporte ao **SCS0009 de barramento original oficial** do AmazingHand.

## Estado atual

O `..\02_hand_tracking\Demo` deste delivery_package suporta simultaneamente os dois backends de servomotor, com troca transparente por configuração:

|Versão|Tipo de servomotor|Débito|Ficheiro de configuração|
|---|---|---|---|
|**PWM**(entrega principal deste pacote)|PWM com acionamento direto do ESP32-S3|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009**(original oficial)|Servomotor de barramento oficial|1,000,000|`{l,r}_hand.toml`|

- **Versão PWM**: no menu, selecione `3 - PWM 舵机(ESP32 直驱)`, utilize o tutorial deste pacote.

- **Versão SCS0009**: no menu, selecione `2 - 真实硬件(SCS0009 总线舵机)`.

## Como utilizar a versão SCS0009

1. Hardware: servomotor de barramento oficial + adaptador série (débito 1M).

2. Implementação: `Demo\Windows_Scripts_CN\3-部署代码.bat`(ou o script correspondente no Linux).

3. Execução: 4-运行代码.bat → selecione `2 - 真实硬件(SCS0009 总线舵机)` → escolha o tipo de mão.

4. Para instruções detalhadas, consulte `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
e `Demo\Windows_Scripts_CN\Windows使用教程.md`(tutorial oficial).

## Observações

- O SCS0009 requer a configuração de id oficial dos servomotores (já incorporada em `{l,r}_hand.toml); a versão PWM não envolve isso.

- Os dois tipos de servomotor **só podem ser ligados um de cada vez**; basta trocar o hardware + a opção do menu.

- Este pacote tem a versão PWM como principal entregável; para o SCS0009, o tutorial oficial tem como referência o Demo oficial.

