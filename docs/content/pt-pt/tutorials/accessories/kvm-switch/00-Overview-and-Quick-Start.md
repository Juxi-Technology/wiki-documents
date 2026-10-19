---
title: "Comutador KVM · Visão geral do tutorial"
description: "Comutador USB de teclado/rato com 2 entradas e 3 saídas: um teclado e um rato (e periféricos) comutam entre dois computadores com um toque no botão; HUB USB …"
---

# Comutador KVM · Visão geral do tutorial

> Produto aplicável: comutador de teclado/rato para dois computadores **KVM&HUB&TTL** da JUXI Technology (USB 2.0)
> Versão v1.0 (2026-10-14) | O tutorial está dividido por módulos funcionais — consulte apenas o que precisar

---

## Procurar por módulo

| O que quero fazer | Ler |
|---|---|
| Primeiro colocar o dispositivo a funcionar | Esta página → «Início rápido» |
| Comutar teclado/rato e periféricos entre dois computadores | [01 - Comutação entre dois computadores (botão e comando IR)](/pt-pt/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| Utilizar como HUB USB (um para três) | [02 - Função HUB (um para três)](/pt-pt/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Ligar por Bluetooth do telemóvel, enviar/receber dados** | [03 - Bluetooth](/pt-pt/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **Ligar a porta série TTL de 6 pinos, ver dados no PC** | [04 - Porta série TTL (série sem fios)](/pt-pt/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **Conhecer o conector de expansão de 10 pinos** | [05 - Conector de expansão de 10 pinos](/pt-pt/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Controlar uma placa de desenvolvimento/host sem monitor | [06 - Host sem monitor (placa de captura + OBS)](/pt-pt/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| Perguntas frequentes e avisos | [07 - Perguntas frequentes e avisos](/pt-pt/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## O produto numa frase

**Comutador USB de teclado/rato com 2 entradas e 3 saídas**: um teclado e um rato (e periféricos) comutam entre dois computadores com um toque no botão; HUB USB de 3 portas integrado; além disso, uma **função série sem fios** — ligue a porta série de uma placa de desenvolvimento ou sensor ao conector de 6 pinos e os dados são transmitidos simultaneamente para a porta série do PC e para o telemóvel por Bluetooth.

## Interfaces em resumo

| Local | Nome | Descrição |
|---|---|---|
| Lado esquerdo / direito | Portas PC1 / PC2 (Type-C) | Ligam os dois computadores |
| Parte inferior | USB-A × 3 | Teclado/rato, pen drive, impressora, etc. — comutados em conjunto |
| Parte superior | Porta de alimentação (Type-C) | Alimentação auxiliar (quando a alimentação do host é insuficiente) |
| Centro | Botão de comutação | Toque curto = comutar; toque longo = modo Bluetooth |
| Canto superior esquerdo | Recetor de infravermelhos | Funciona com o comando IR |
| Canto inferior direito | Porta série TTL (6 pinos) | Função série sem fios (ver 04) |
| Canto inferior direito | Conector de 10 pinos | Interface de expansão (ver 05) |
| Canto superior direito | Módulo Bluetooth (integrado) | Função série sem fios (ver 03) |

**LEDs indicadores**: PC1/PC2 (canal atual) | Alimentação | UART série (pisca durante a transmissão) | Bluetooth (acende após toque longo)

## Início rápido (5 minutos)

1. Computador A → cabo Type-C → porta **PC1**; computador B → porta **PC2** (também funciona com apenas um computador — nesse caso é simplesmente um HUB USB);
2. Ligue o teclado/rato (ou recetor sem fios) a qualquer porta **USB-A**;
3. Prima o botão de comutação e confirme pelo **LED PC1/PC2** a que computador está ligado;
4. Se a alimentação do host for insuficiente, ligue também a alimentação Type-C à **porta de alimentação**.

(Ilustração: material do tutorial 01 – Distribuição das funções)

## Dois avisos importantes

- Este produto **não comuta vídeo**: cada computador utiliza o seu próprio monitor. Para um host sem monitor, utilize a solução com placa de captura (ver 06);
- Este produto é **USB 2.0**: perfeitamente adequado para teclado/rato, impressoras, pen drives e dongles; para armazenamento de alta velocidade, ligue diretamente ao computador.

---

*(Para detalhes de cada módulo funcional, clique na entrada correspondente da tabela «Procurar por módulo».)*

<RelatedProducts slugs="kvm-switch" />
