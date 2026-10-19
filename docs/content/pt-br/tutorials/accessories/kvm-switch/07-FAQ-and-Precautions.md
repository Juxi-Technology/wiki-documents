---
title: "07 · Perguntas frequentes e avisos"
description: "P1: Ele alterna a imagem do monitor?"
---

# 07 · Perguntas frequentes e avisos

> [← Voltar à visão geral](/pt-br/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produto aplicável: JUXI Technology KVM&HUB&TTL
> As perguntas específicas de cada módulo estão em suas próprias páginas (Bluetooth → 03; serial TTL → 04).

## Perguntas frequentes

**P1: Ele alterna a imagem do monitor?**
Não. Este produto alterna teclado/mouse e dispositivos USB. Cada computador usa seu próprio monitor; para um host sem monitor, use a solução com placa de captura (ver [06](/pt-br/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**P2: Preciso instalar drivers?**
Não — sem driver (Windows / macOS / Linux / sistemas operacionais nacionais chineses).

**P3: Posso conectar um HD externo?**
Este produto é USB 2.0; para armazenamento de alta velocidade e placas de captura, conecte diretamente ao computador. Pen drives, teclado/mouse, impressoras e dongles não têm problema.

**P4: O celular não conecta via Bluetooth / aparece pedido de PIN?**
Não use o «emparelhamento» Bluetooth do sistema; instale o app **BleUart** e conecte dentro do app (ver [03](/pt-br/tutorials/accessories/kvm-switch/03-Bluetooth)).

**P5: Celular e computador podem conectar via Bluetooth ao mesmo tempo?**
Não — apenas um dispositivo host por vez. A **porta serial** (USB) do PC não é afetada e pode ser usada simultaneamente.

**P6: Os dispositivos USB desconectam por um instante ao alternar?**
Normal: os dispositivos «migram» entre os computadores com a alternância e o outro computador os reconhece novamente (alguns levam alguns segundos).

**P7: Pode ser usado apenas como HUB?**
Sim — com apenas um computador conectado, é um HUB USB de 3 portas (ver [02](/pt-br/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**P8: Suporta mouses gamer?**
Teclado/mouse funcionam em USB 2.0 HID padrão — imperceptível em uso de escritório e depuração; use com cautela periféricos gamer de alta taxa de sondagem.

## Avisos

- O nível da porta TTL é **3,3 V** — nunca aplique níveis de sinal de 5 V; `3V3/5V` são pinos de **saída** — nunca injete alimentação neles;
- A largura de banda do USB 2.0 é limitada; escolha os dispositivos conforme as recomendações do [02](/pt-br/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three);
- Não desmonte nem ressolde o dispositivo; ele é sensível a eletricidade estática — descarregue-se antes de tocá-lo;
- Funções e interfaces do produto estão sujeitas à unidade física; se este tutorial for atualizado, prevalece a versão mais recente.

## Histórico de versões

| Versão | Data | Descrição |
|---|---|---|
| v1.0 | 2026-10-14 | Versão inicial, dividida por módulos funcionais (alternância/HUB/Bluetooth/TTL/10 pinos/placa de captura/FAQ) |

<RelatedProducts slugs="kvm-switch" />
