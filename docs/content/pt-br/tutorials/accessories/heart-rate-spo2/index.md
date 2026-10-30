---
title: "Tutorial de uso do módulo sensor de frequência cardíaca e SpO2 MAX30102"
description: "Tutorial completo do módulo sensor de frequência cardíaca e SpO2 MAX30102: informações do produto, interface web, Arduino, Raspberry Pi e aplicativo de host para PC."
---

# Tutorial de uso do módulo sensor de frequência cardíaca e SpO2 MAX30102

Este tutorial apresenta o modo de utilização do módulo sensor de frequência cardíaca e SpO2 MAX30102 da Juxi Technology. O módulo utiliza o chip dedicado MAX30102 da Maxim para detecção de frequência cardíaca e SpO2, com algoritmo de frequência cardíaca e SpO2 desenvolvido internamente, e pode emitir diretamente a frequência cardíaca, a saturação de oxigênio no sangue e a temperatura da placa, com suporte aos modos de comunicação I2C e UART.

## Índice dos tutoriais

| Conteúdo | Descrição |
|---|---|
| [Informações do produto](./product-info.md) | Visão geral do produto, princípio de detecção, especificações técnicas, definição dos pinos e cenários típicos de aplicação |
| [Tutorial de uso da interface web](./web-console.md) | Conexão direta via Web Serial no navegador, sem necessidade de instalar software |
| [Tutorial de uso com Arduino](./arduino.md) | Fiação, instalação da biblioteca, código de exemplo, API e perguntas frequentes |
| [Tutorial de uso com Raspberry Pi](./raspberry-pi.md) | Fiação I2C / UART, configuração do ambiente, código de exemplo e API |
| [PC · Execução em Python](./pc/python.md) | USB para TTL + script Python para leitura dos dados |
| [Aplicativo de host para PC](./pc/upper-computer.md) | Aplicativo gráfico de host: configuração da porta serial, coleta e monitoramento em tempo real |

## Início rápido

1. Leia primeiro as [Informações do produto](./product-info.md) e confirme a alimentação (3.3–5V) e a definição dos pinos;
2. Se quiser apenas ver os dados rapidamente: use o [Tutorial de uso da interface web](./web-console.md) e basta abrir a página no Chrome / Edge;
3. Para conectar a um microcontrolador: consulte o [Tutorial de uso com Arduino](./arduino.md);
4. Para conectar a um Raspberry Pi: consulte o [Tutorial de uso com Raspberry Pi](./raspberry-pi.md);
5. Para conectar ao computador: consulte [PC · Execução em Python](./pc/python.md) ou o [Aplicativo de host para PC](./pc/upper-computer.md).

> Este produto é um módulo eletrônico de detecção de nível consumidor e não é um dispositivo médico profissional; os dados de medição servem apenas como referência de saúde cotidiana.

<RelatedProducts slugs="heart-rate-spo2" />
