---
title: "03 · Bluetooth"
description: "O dispositivo tem um módulo Bluetooth integrado (o lado sem fios do mesmo canal série da porta TTL de 6 pinos): ao ligar uma placa de desenvolvimento ou sens…"
---

# 03 · Bluetooth

> [← Voltar à visão geral](/pt-pt/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

## Para que serve o Bluetooth

O dispositivo tem um módulo Bluetooth integrado (**o lado sem fios do mesmo canal série da porta TTL de 6 pinos**): ao ligar uma placa de desenvolvimento ou sensor à porta TTL, os seus dados são emitidos não apenas na porta série do PC, mas **também simultaneamente por Bluetooth**; ligue um telemóvel e poderá enviar e receber dados sem fios.

> Para a cablagem, consulte [04 - Porta série TTL](/pt-pt/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). A ligação Bluetooth e a transferência de dados **não são afetadas pela comutação de computador** (a ligação mantém-se seja qual for o computador selecionado).

## Como funciona (leia primeiro)

⚠️ **O Bluetooth não é um «comando remoto»** — é um **cabo série sem fios**: transporta os dados série entre o «dispositivo ligado ao conector de 6 pinos» e o seu «telemóvel/computador». **Sem dispositivo externo ligado, uma ligação Bluetooth não mostra nenhum dado — isso é normal.**

```
【Dispositivo externo】   【Este produto】           【Você】
 Placa/sensor ──6 pinos──> passagem série ──┬─ com fios → série do PC (USB-BLE-SERIAL CH9143)
 (gera/recebe dados)                       └─ sem fios → Bluetooth do telemóvel/PC (app BleUart)
```

**Exemplo 1: ver dados de atitude de uma IMU sem fios**

1. Ligue TX/RX/GND/5V do módulo IMU ao conector de 6 pinos (cruzado, com alimentação — ver 04); a IMU começa a transmitir;
2. Mantenha o botão de comutação premido durante cerca de 3 segundos para entrar no modo Bluetooth (o LED acende);
3. Ligue a app BleUart do telemóvel a `CH9143BLE2U`;
4. Os fotogramas de dados aparecem imediatamente no telemóvel (cerca de 80 fotogramas por segundo de dados de atitude no nosso teste);
5. Ao mesmo tempo, uma ferramenta série no PC aberta em `USB-BLE-SERIAL CH9143` mostra exatamente os mesmos dados.

**Exemplo 2: depuração sem fios de Raspberry Pi / Jetson**

1. Ligue Pin8(TXD)/Pin10(RXD)/GND do Raspberry Pi ao conector de 6 pinos (cruzado);
2. Ligue o Raspberry Pi; o registo de arranque é emitido pela porta série;
3. Ligue a app BleUart do telemóvel para **ver o registo de arranque sem fios**;
4. O que escrever na app é enviado pelo TXD do conector de 6 pinos para o Raspberry Pi — o telemóvel torna-se uma **consola série sem fios** (iniciar sessão, enviar comandos).

## Passos de ligação do telemóvel (4 passos)

1. **Mantenha o botão de comutação premido durante cerca de 3 segundos** até o LED acender — modo Bluetooth (nome anunciado: `CH9143BLE2U`);
2. Instale no telemóvel a app oficial da WCH **«BleUart»** (pesquise na loja de aplicações; gratuita);
3. Abra a app → toque em «Ligar Bluetooth» → selecione **CH9143BLE2U** na lista;
4. Ligação bem-sucedida (**sem palavra-passe**) — envie e receba dados.

(Ilustração: material do tutorial 04 – Toque longo para entrar no modo Bluetooth)

## ⚠️ Avisos importantes

- **Não utilize o «emparelhamento» Bluetooth das definições do sistema do telemóvel**: será pedido um PIN e nenhum PIN funcionará — ligue sempre dispositivos BLE diretamente pela **app BleUart**;
- O módulo Bluetooth **só pode ser ligado a um dispositivo host de cada vez** (enquanto um telemóvel está ligado, um computador não consegue ligar por Bluetooth, e vice-versa). A **porta série** (USB) do PC não é afetada e pode ser utilizada simultaneamente.

## Resolução de problemas

| Problema | Solução |
|---|---|
| CH9143BLE2U não encontrado | Mantenha o botão premido novamente até o LED acender; verifique se está a menos de 10 m |
| Pede PIN / não liga | Cancele o emparelhamento do sistema e utilize a app BleUart |
| A app não liga | Pode estar ocupado por outro dispositivo (ex.: computador) — desligue primeiro a outra ligação |
| Ligado mas sem dados | O Bluetooth transporta os dados série do conector de 6 pinos — verifique primeiro se o dispositivo externo está ligado à porta TTL (ver 04) |

<RelatedProducts slugs="kvm-switch" />
