---
title: "07 · Perguntas frequentes e avisos"
description: "P1: Comuta a imagem do monitor?"
---

# 07 · Perguntas frequentes e avisos

> [← Voltar à visão geral](/pt-pt/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL
> As perguntas específicas de cada módulo estão nas respetivas páginas (Bluetooth → 03; série TTL → 04).

## Perguntas frequentes

**P1: Comuta a imagem do monitor?**
Não. Este produto comuta teclado/rato e dispositivos USB. Cada computador utiliza o seu próprio monitor; para um host sem monitor, utilize a solução com placa de captura (ver [06](/pt-pt/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**P2: É necessário instalar controladores?**
Não — sem controladores (Windows / macOS / Linux / sistemas operativos nacionais chineses).

**P3: Posso ligar um disco externo?**
Este produto é USB 2.0; para armazenamento de alta velocidade e placas de captura, ligue diretamente ao computador. Pen drives, teclado/rato, impressoras e dongles não têm problema.

**P4: O telemóvel não liga por Bluetooth / aparece um pedido de PIN?**
Não utilize o «emparelhamento» Bluetooth do sistema; instale a app **BleUart** e ligue dentro da app (ver [03](/pt-pt/tutorials/accessories/kvm-switch/03-Bluetooth)).

**P5: Telemóvel e computador podem ligar por Bluetooth ao mesmo tempo?**
Não — apenas um dispositivo host de cada vez. A **porta série** (USB) do PC não é afetada e pode ser utilizada simultaneamente.

**P6: Os dispositivos USB desligam-se por um instante ao comutar?**
Normal: os dispositivos «migram» entre os computadores com a comutação e o outro computador reconhece-os novamente (alguns demoram alguns segundos).

**P7: Pode ser utilizado apenas como HUB?**
Sim — com apenas um computador ligado, é um HUB USB de 3 portas (ver [02](/pt-pt/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**P8: Suporta ratos gaming?**
Teclado/rato funcionam em USB 2.0 HID padrão — imperceptível em escritório e depuração; utilize com cautela periféricos gaming de elevada taxa de polling.

## Avisos

- O nível da porta TTL é **3,3 V** — nunca aplique níveis de sinal de 5 V; `3V3/5V` são pinos de **saída** — nunca injete alimentação neles;
- A largura de banda do USB 2.0 é limitada; escolha os dispositivos conforme as recomendações do [02](/pt-pt/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three);
- Não desmonte nem volte a soldar o dispositivo; é sensível a eletricidade estática — descarregue antes de o tocar;
- As funções e interfaces do produto estão sujeitas à unidade física; se este tutorial for atualizado, prevalece a versão mais recente.

## Histórico de versões

| Versão | Data | Descrição |
|---|---|---|
| v1.0 | 2026-10-14 | Versão inicial, dividida por módulos funcionais (comutação/HUB/Bluetooth/TTL/10 pinos/placa de captura/FAQ) |

<RelatedProducts slugs="kvm-switch" />
