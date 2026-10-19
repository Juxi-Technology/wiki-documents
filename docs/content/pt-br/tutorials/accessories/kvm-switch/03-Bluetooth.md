---
title: "03 · Bluetooth"
description: "O dispositivo tem um módulo Bluetooth integrado (o lado sem fio do mesmo canal serial da porta TTL de 6 pinos): ao conectar uma placa de desenvolvimento ou s…"
---

# 03 · Bluetooth

> [← Voltar à visão geral](/pt-br/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL

## Para que serve o Bluetooth

O dispositivo tem um módulo Bluetooth integrado (**o lado sem fio do mesmo canal serial da porta TTL de 6 pinos**): ao conectar uma placa de desenvolvimento ou sensor à porta TTL, seus dados são emitidos não apenas na porta serial do PC, mas **também simultaneamente via Bluetooth**; conecte um celular e você poderá enviar e receber dados sem fio.

> Para a fiação, consulte [04 - Porta serial TTL](/pt-br/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). A conexão Bluetooth e a transferência de dados **não são afetadas pela alternância de computador** (o enlace permanece ativo qualquer que seja o computador selecionado).

## Como funciona (leia primeiro)

⚠️ **O Bluetooth não é um «controle remoto»** — é um **cabo serial sem fio**: transporta os dados seriais entre o «dispositivo conectado ao conector de 6 pinos» e o seu «celular/computador». **Sem dispositivo externo conectado, uma conexão Bluetooth não mostra nenhum dado — isso é normal.**

```
【Dispositivo externo】   【Este produto】           【Você】
 Placa/sensor ──6 pinos──> passagem serial ──┬─ com fio → serial do PC (USB-BLE-SERIAL CH9143)
 (gera/recebe dados)                        └─ sem fio → Bluetooth do celular/PC (app BleUart)
```

**Exemplo 1: visualizar dados de atitude de uma IMU sem fio**

1. Conecte TX/RX/GND/5V do módulo IMU ao conector de 6 pinos (cruzado, com alimentação — ver 04); a IMU começa a transmitir;
2. Mantenha o botão de alternância pressionado por cerca de 3 segundos para entrar no modo Bluetooth (o LED acende);
3. Conecte o app BleUart do celular a `CH9143BLE2U`;
4. Os quadros de dados aparecem imediatamente no celular (cerca de 80 quadros por segundo de dados de atitude no nosso teste);
5. Ao mesmo tempo, uma ferramenta serial no PC aberta em `USB-BLE-SERIAL CH9143` mostra exatamente os mesmos dados.

**Exemplo 2: depuração sem fio de Raspberry Pi / Jetson**

1. Conecte Pin8(TXD)/Pin10(RXD)/GND do Raspberry Pi ao conector de 6 pinos (cruzado);
2. Ligue o Raspberry Pi; o log de inicialização é emitido pela porta serial;
3. Conecte o app BleUart do celular para **ver o log de inicialização sem fio**;
4. O que você digita no app é enviado pelo TXD do conector de 6 pinos ao Raspberry Pi — o celular se torna um **console serial sem fio** (login, envio de comandos).

## Passos de conexão do celular (4 passos)

1. **Mantenha o botão de alternância pressionado por cerca de 3 segundos** até o LED acender — modo Bluetooth (nome anunciado: `CH9143BLE2U`);
2. Instale no celular o app oficial da WCH **«BleUart»** (pesquise na loja de aplicativos; gratuito);
3. Abra o app → toque em «Conectar Bluetooth» → selecione **CH9143BLE2U** na lista;
4. Conexão bem-sucedida (**sem senha**) — envie e receba dados.

(Ilustração: material do tutorial 04 – Toque longo para entrar no modo Bluetooth)

## ⚠️ Avisos importantes

- **Não use o «emparelhamento» Bluetooth das configurações do sistema do celular**: ele pedirá um PIN e nenhum PIN funcionará — conecte sempre dispositivos BLE diretamente pelo **app BleUart**;
- O módulo Bluetooth **só pode ser conectado a um dispositivo host por vez** (enquanto um celular está conectado, um computador não consegue conectar via Bluetooth, e vice-versa). A **porta serial** (USB) do PC não é afetada e pode ser usada simultaneamente.

## Solução de problemas

| Problema | Solução |
|---|---|
| CH9143BLE2U não encontrado | Mantenha o botão pressionado novamente até o LED acender; verifique se está a menos de 10 m |
| Pede PIN / não conecta | Cancele o emparelhamento do sistema e use o app BleUart |
| O app não conecta | Pode estar ocupado por outro dispositivo (ex.: computador) — desconecte a outra conexão primeiro |
| Conectado mas sem dados | O Bluetooth transporta os dados seriais do conector de 6 pinos — verifique primeiro se o dispositivo externo está conectado à porta TTL (ver 04) |

<RelatedProducts slugs="kvm-switch" />
