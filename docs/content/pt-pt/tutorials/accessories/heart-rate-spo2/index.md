---
title: "Tutorial de utilização do módulo sensor de frequência cardíaca e SpO2 MAX30102"
description: "Tutorial completo do módulo sensor de frequência cardíaca e SpO2 MAX30102: informações do produto, interface web, Arduino, Raspberry Pi e aplicação de host para PC."
---

# Tutorial de utilização do módulo sensor de frequência cardíaca e SpO2 MAX30102

Este tutorial apresenta o modo de utilização do módulo sensor de frequência cardíaca e SpO2 MAX30102 da Juxi Technology. O módulo utiliza o chip dedicado MAX30102 da Maxim para deteção de frequência cardíaca e SpO2, com algoritmo de frequência cardíaca e SpO2 desenvolvido internamente, e pode emitir diretamente a frequência cardíaca, a saturação de oxigénio no sangue e a temperatura da placa, com suporte aos modos de comunicação I2C e UART.

## Índice dos tutoriais

| Conteúdo | Descrição |
|---|---|
| [Informações do produto](./product-info.md) | Visão geral do produto, princípio de deteção, especificações técnicas, definição dos pinos e cenários típicos de aplicação |
| [Tutorial de utilização da interface web](./web-console.md) | Ligação direta via Web Serial no navegador, sem necessidade de instalar software |
| [Tutorial de utilização com Arduino](./arduino.md) | Ligações, instalação da biblioteca, código de exemplo, API e perguntas frequentes |
| [Tutorial de utilização com Raspberry Pi](./raspberry-pi.md) | Ligação I2C / UART, configuração do ambiente, código de exemplo e API |
| [PC · Execução em Python](./pc/python.md) | USB para TTL + script Python para leitura dos dados |
| [Aplicação de host para PC](./pc/upper-computer.md) | Aplicação gráfica de host: configuração da porta série, recolha e monitorização em tempo real |

## Início rápido

1. Leia primeiro as [Informações do produto](./product-info.md) e confirme a alimentação (3.3–5V) e a definição dos pinos;
2. Se quiser apenas ver os dados rapidamente: utilize o [Tutorial de utilização da interface web](./web-console.md) e basta abrir a página no Chrome / Edge;
3. Para ligar a um microcontrolador: consulte o [Tutorial de utilização com Arduino](./arduino.md);
4. Para ligar a um Raspberry Pi: consulte o [Tutorial de utilização com Raspberry Pi](./raspberry-pi.md);
5. Para ligar ao computador: consulte [PC · Execução em Python](./pc/python.md) ou a [Aplicação de host para PC](./pc/upper-computer.md).

> Este produto é um módulo eletrónico de deteção de nível consumidor e não é um dispositivo médico profissional; os dados de medição servem apenas como referência de saúde diária.

<RelatedProducts slugs="heart-rate-spo2" />
