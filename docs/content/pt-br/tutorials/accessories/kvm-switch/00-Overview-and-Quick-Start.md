---
title: "Switch KVM · Visão geral do tutorial"
description: "Switch USB de teclado/mouse com 2 entradas e 3 saídas: um teclado e um mouse (e periféricos) alternam entre dois computadores com um toque no botão; HUB USB …"
---

# Switch KVM · Visão geral do tutorial

> Produto aplicável: switch de teclado/mouse para dois computadores **KVM&HUB&TTL** da JUXI Technology (USB 2.0)
> Versão v1.0 (2026-10-14) | O tutorial é dividido por módulos funcionais — consulte apenas o que precisar

---

## Buscar por módulo

| O que quero fazer | Ler |
|---|---|
| Primeiro colocar o dispositivo em funcionamento | Esta página → «Início rápido» |
| Alternar teclado/mouse e periféricos entre dois computadores | [01 - Alternância entre dois computadores (botão e controle IR)](/pt-br/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| Usar como HUB USB (um para três) | [02 - Função HUB (um para três)](/pt-br/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Conectar pelo Bluetooth do celular, enviar/receber dados** | [03 - Bluetooth](/pt-br/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **Ligar a porta serial TTL de 6 pinos, ver dados no PC** | [04 - Porta serial TTL (serial sem fio)](/pt-br/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **Conhecer o conector de expansão de 10 pinos** | [05 - Conector de expansão de 10 pinos](/pt-br/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Controlar uma placa de desenvolvimento/host sem monitor | [06 - Host sem monitor (placa de captura + OBS)](/pt-br/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| Perguntas frequentes e avisos | [07 - Perguntas frequentes e avisos](/pt-br/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## O produto em uma frase

**Switch USB de teclado/mouse com 2 entradas e 3 saídas**: um teclado e um mouse (e periféricos) alternam entre dois computadores com um toque no botão; HUB USB de 3 portas integrado; além disso, uma **função serial sem fio** — conecte a porta serial de uma placa de desenvolvimento ou sensor ao conector de 6 pinos e os dados são transmitidos simultaneamente à porta serial do PC e ao celular via Bluetooth.

## Interfaces em resumo

| Local | Nome | Descrição |
|---|---|---|
| Lado esquerdo / direito | Portas PC1 / PC2 (Type-C) | Conectam os dois computadores |
| Parte inferior | USB-A × 3 | Teclado/mouse, pen drive, impressora etc. — alternados em conjunto |
| Parte superior | Porta de alimentação (Type-C) | Alimentação auxiliar (quando a alimentação do host é insuficiente) |
| Centro | Botão de alternância | Toque curto = alternar; toque longo = modo Bluetooth |
| Superior esquerdo | Receptor infravermelho | Funciona com o controle remoto IR |
| Inferior direito | Porta serial TTL (6 pinos) | Função serial sem fio (ver 04) |
| Inferior direito | Conector de 10 pinos | Interface de expansão (ver 05) |
| Superior direito | Módulo Bluetooth (integrado) | Função serial sem fio (ver 03) |

**LEDs indicadores**: PC1/PC2 (canal atual) | Alimentação | UART serial (pisca durante a transmissão) | Bluetooth (acende após toque longo)

## Início rápido (5 minutos)

1. Computador A → cabo Type-C → porta **PC1**; computador B → porta **PC2** (também funciona com apenas um computador — nesse caso é simplesmente um HUB USB);
2. Conecte o teclado/mouse (ou receptor sem fio) a qualquer porta **USB-A**;
3. Pressione o botão de alternância e confira pelo **LED PC1/PC2** a qual computador você está conectado;
4. Se a alimentação do host for insuficiente, conecte também alimentação Type-C à **porta de alimentação**.

(Ilustração: material do tutorial 01 – Distribuição das funções)

## Dois avisos importantes

- Este produto **não alterna vídeo**: cada computador usa seu próprio monitor. Para um host sem monitor, use a solução com placa de captura (ver 06);
- Este produto é **USB 2.0**: perfeitamente adequado para teclado/mouse, impressoras, pen drives e dongles; para armazenamento de alta velocidade, conecte diretamente ao computador.

---

*(Para detalhes de cada módulo funcional, clique na entrada correspondente da tabela «Buscar por módulo».)*

<RelatedProducts slugs="kvm-switch" />
